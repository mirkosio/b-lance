// Riepilogo del Cassiere: i dati stanno DOPO il # del link, quindi il
// browser non li manda al server. Qui li leggiamo e calcoliamo tutto in
// locale: nessuna richiesta di rete, nessun dato salvato.
//
// Formato del payload: JSON -> gzip -> base64url (come lo genera l'app
// Android). I file vecchi, non compressi, restano leggibili.

(function () {
  'use strict';

  function el(id) {
    return document.getElementById(id);
  }

  function showError(message) {
    var text = el('cl-error-text');
    var box = el('cl-error');
    var content = el('cl-content');
    if (text) text.textContent = message;
    if (box) box.hidden = false;
    if (content) content.hidden = true;
    var title = el('cl-title');
    if (title) title.textContent = 'Riepilogo non leggibile';
  }

  // Decodifica base64url scritta a mano: `atob` accetta solo base64
  // standard e in alcuni ambienti (Node in CI) è più severo del browser.
  // Così il link si apre identico ovunque.
  var B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_';

  function base64ToBytes(value) {
    var clean = String(value).replace(/[=]+$/, '');
    var bytes = new Uint8Array(Math.floor((clean.length * 3) / 4));
    var bits = 0;
    var acc = 0;
    var index = 0;
    for (var i = 0; i < clean.length; i++) {
      var position = B64.indexOf(clean.charAt(i));
      if (position === -1) {
        // Carattere non valido: il link è corrotto.
        throw new Error('base64 non valido');
      }
      acc = (acc << 6) | position;
      bits += 6;
      if (bits >= 8) {
        bits -= 8;
        bytes[index++] = (acc >> bits) & 0xff;
      }
    }
    return bytes.subarray(0, index);
  }

  // Ritorna una Promise con il testo JSON.
  function readPayload(value) {
    var bytes = base64ToBytes(value);
    var isGzip = bytes.length > 2 && bytes[0] === 0x1f && bytes[1] === 0x8b;

    if (isGzip && typeof DecompressionStream === 'function') {
      try {
        var stream = new Blob([bytes]).stream().pipeThrough(
          new DecompressionStream('gzip')
        );
        return new Response(stream).text();
      } catch (e) {
        /* si riprova con il testo grezzo */
      }
    }
    return Promise.resolve(new TextDecoder().decode(bytes));
  }

  function asInt(value) {
    var n = Number(value);
    return Number.isFinite(n) ? Math.trunc(n) : 0;
  }

  function equalShares(amount, ids) {
    if (!ids.length) return [];
    var share = Math.floor(amount / ids.length);
    var rest = amount - share * ids.length;
    return ids.map(function (id, index) {
      return share + (index < rest ? 1 : 0);
    });
  }

  function build(data) {
    var members = Array.isArray(data.members) ? data.members : [];
    var expenses = Array.isArray(data.expenses) ? data.expenses : [];
    var payments = Array.isArray(data.payments) ? data.payments : [];

    if (!members.length || !expenses.length) {
      showError(
        'Il riepilogo non contiene persone o spese. Potrebbe essere stato troncato.'
      );
      return;
    }

    var names = {};
    var colors = {};
    members.forEach(function (member) {
      var id = asInt(member.id);
      names[id] = String(member.name || 'Senza nome').slice(0, 60);
      var color = String(member.color || '');
      colors[id] = /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : '#5F8D6E';
    });

    function idOf(value) {
      var id = asInt(value);
      return Object.prototype.hasOwnProperty.call(names, id) ? id : null;
    }

    var paid = {};
    var owed = {};

    function addPaid(id, amount) {
      if (id === null) return;
      paid[id] = (paid[id] || 0) + amount;
    }

    function addOwed(id, amount) {
      if (id === null) return;
      owed[id] = (owed[id] || 0) + amount;
    }

    var total = 0;

    expenses.forEach(function (expense) {
      var amount = asInt(expense.amount_minor);
      var paidBy = idOf(expense.paid_by_id);
      if (amount <= 0 || paidBy === null) return;

      total += amount;
      addPaid(paidBy, amount);

      var ids = (Array.isArray(expense.member_ids) ? expense.member_ids : [])
        .map(idOf)
        .filter(function (id) {
          return id !== null;
        });

      var items = Array.isArray(expense.items) ? expense.items : [];
      if (items.length) {
        // Spesa per articoli: ogni voce pesa solo su chi l'ha condivisa.
        items.forEach(function (item) {
          var itemAmount = asInt(item.amount_minor);
          if (itemAmount <= 0) return;
          var participants = (
            Array.isArray(item.member_ids) ? item.member_ids : []
          )
            .map(idOf)
            .filter(function (id) {
              return id !== null;
            });
          if (!participants.length) participants = ids;
          var shares = equalShares(itemAmount, participants);
          participants.forEach(function (id, index) {
            addOwed(id, shares[index]);
          });
        });
        return;
      }

      if (!ids.length) return;

      var mode = String(expense.split_mode || 'equal');

      if (mode === 'exact') {
        var exact = expense.exact_minor || {};
        var exactSum = ids.reduce(function (acc, id) {
          return acc + asInt(exact[id]);
        }, 0);
        if (exactSum === amount) {
          ids.forEach(function (id) {
            addOwed(id, asInt(exact[id]));
          });
          return;
        }
      } else if (mode === 'percent') {
        var percent = expense.percent_bp || {};
        var totalBp = ids.reduce(function (acc, id) {
          return acc + asInt(percent[id]);
        }, 0);
        if (totalBp > 0) {
          var assigned = 0;
          var sharesBp = ids.map(function (id) {
            var exactBp = amount * asInt(percent[id]);
            var value = Math.floor(exactBp / totalBp);
            assigned += value;
            return { id: id, value: value, remainder: exactBp % totalBp };
          });
          var left = amount - assigned;
          sharesBp
            .slice()
            .sort(function (a, b) {
              return b.remainder - a.remainder || a.id - b.id;
            })
            .forEach(function (entry, index) {
              if (index < left) entry.value += 1;
            });
          sharesBp.forEach(function (entry) {
            addOwed(entry.id, entry.value);
          });
          return;
        }
      }

      var equal = equalShares(amount, ids);
      ids.forEach(function (id, index) {
        addOwed(id, equal[index]);
      });
    });

    payments.forEach(function (payment) {
      var amount = asInt(payment.amount_minor);
      var from = idOf(payment.from_id);
      var to = idOf(payment.to_id);
      if (amount <= 0 || from === null || to === null) return;
      addPaid(from, amount);
      addOwed(to, amount);
    });

    var balances = Object.keys(names).map(function (key) {
      var id = Number(key);
      return { id: id, net: (paid[id] || 0) - (owed[id] || 0) };
    });

    var creditors = [];
    var debtors = [];
    balances.forEach(function (balance) {
      if (balance.net > 0) creditors.push({ id: balance.id, amount: balance.net });
      else if (balance.net < 0) debtors.push({ id: balance.id, amount: -balance.net });
    });
    creditors.sort(function (a, b) {
      return b.amount - a.amount;
    });
    debtors.sort(function (a, b) {
      return b.amount - a.amount;
    });

    var transfers = [];
    var ci = 0;
    var di = 0;
    while (ci < creditors.length && di < debtors.length) {
      var creditor = creditors[ci];
      var debtor = debtors[di];
      var amount = Math.min(creditor.amount, debtor.amount);
      transfers.push({ from: debtor.id, to: creditor.id, amount: amount });
      creditor.amount -= amount;
      debtor.amount -= amount;
      if (creditor.amount === 0) ci++;
      if (debtor.amount === 0) di++;
    }

    var currency = /^[A-Z]{3}$/.test(String(data.currency || ''))
      ? String(data.currency)
      : 'EUR';
    // Quante cifre decimali ha la valuta: 2 per l'euro, 0 per lo yen.
    var exponent = Number(data.exponent);
    if (!Number.isFinite(exponent) || exponent < 0 || exponent > 4) exponent = 2;
    exponent = Math.trunc(exponent);

    // Formattazione come nel backend e nell'app: punto per le migliaia,
    // virgola per i decimali. Intl "it-IT" non mette il punto sotto le
    // cinque cifre, quindi lo faccio a mano per essere coerente ovunque.
    function formatNumber(value) {
      var fixed = value.toFixed(exponent);
      var parts = fixed.split('.');
      var intPart = parts[0];
      var negative = intPart.charAt(0) === '-';
      if (negative) intPart = intPart.slice(1);
      var grouped = '';
      for (var i = 0; i < intPart.length; i++) {
        if (i > 0 && (intPart.length - i) % 3 === 0) grouped += '.';
        grouped += intPart.charAt(i);
      }
      if (negative) grouped = '-' + grouped;
      return exponent > 0 ? grouped + ',' + parts[1] : grouped;
    }

    function money(minor) {
      return formatNumber(minor / Math.pow(10, exponent)) + ' ' + currency;
    }

    el('cl-name').textContent = String(data.name || 'Gruppo').slice(0, 120);
    el('cl-currency').textContent = currency;
    el('cl-total').textContent = money(total);
    el('cl-count').textContent = String(members.length);
    el('cl-transfers').textContent = String(transfers.length);
    el('cl-subtitle').textContent =
      'Saldi e bonifici calcolati nel browser. Il server non ha ricevuto questi dati.';

    var balancesBox = el('cl-balances');
    balances.forEach(function (balance) {
      var row = document.createElement('div');
      row.className = 'balance-row';

      var person = document.createElement('div');
      person.className = 'person';
      var avatar = document.createElement('span');
      avatar.className = 'avatar';
      avatar.style.background = colors[balance.id];
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = names[balance.id].charAt(0).toUpperCase();
      var label = document.createElement('span');
      label.textContent = names[balance.id];
      person.appendChild(avatar);
      person.appendChild(label);

      var value = document.createElement('span');
      value.style.fontWeight = '700';
      if (balance.net > 0) {
        value.className = 'pos';
        value.textContent = '+' + money(balance.net);
      } else if (balance.net < 0) {
        value.className = 'neg';
        value.textContent = '-' + money(-balance.net);
      } else {
        value.textContent = money(0);
      }

      row.appendChild(person);
      row.appendChild(value);
      balancesBox.appendChild(row);
    });

    var transfersBox = el('cl-transfers-list');
    if (!transfers.length) {
      var empty = document.createElement('div');
      empty.className = 'empty';
      empty.textContent = 'Nessun debito in sospeso. Conto saldato.';
      transfersBox.appendChild(empty);
    } else {
      transfers.forEach(function (transfer) {
        var row = document.createElement('div');
        row.className = 'transfer';
        var from = document.createElement('span');
        from.textContent = names[transfer.from];
        var arrow = document.createElement('span');
        arrow.className = 'arrow';
        arrow.setAttribute('aria-hidden', 'true');
        arrow.textContent = '→';
        var to = document.createElement('span');
        to.textContent = names[transfer.to];
        var amount = document.createElement('span');
        amount.style.cssText = 'margin-left:auto;font-weight:700';
        amount.textContent = money(transfer.amount);
        row.appendChild(from);
        row.appendChild(arrow);
        row.appendChild(to);
        row.appendChild(amount);
        transfersBox.appendChild(row);
      });
      var note = document.createElement('p');
      note.className = 'muted small';
      note.style.margin = '10px 0 0';
      note.textContent =
        'Con questi ' +
        transfers.length +
        (transfers.length === 1
          ? ' bonifico il conto è saldato.'
          : ' bonifici il conto è saldato.');
      transfersBox.appendChild(note);
    }

    el('cl-error').hidden = true;
    el('cl-content').hidden = false;
  }

  function start() {
    var hash = location.hash || '';
    var payload = hash.indexOf('#c=') === 0 ? hash.slice(3) : '';
    if (!payload) {
      showError(
        'Il link non contiene il riepilogo. Aprilo di nuovo dal messaggio che hai ricevuto.'
      );
      return;
    }

    var raw = payload;
    if (raw.indexOf('%') !== -1) {
      try {
        raw = decodeURIComponent(raw);
      } catch (e) {
        raw = payload;
      }
    }

    readPayload(raw).then(
      function (text) {
        var data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          showError(
            'Il contenuto del riepilogo è rovinato o incompleto. Chiedi di inoltrarlo di nuovo.'
          );
          return;
        }
        build(data);
      },
      function () {
        showError(
          'Non sono riuscito a leggere il riepilogo. Il link potrebbe essere stato troncato: ' +
            'chiedi di inoltrarlo di nuovo per intero.'
        );
      }
    );
  }

  try {
    start();
  } catch (e) {
    if (window.console && console.error) console.error(e);
    showError(
      'Non sono riuscito a leggere il riepilogo. Il link potrebbe essere stato troncato: ' +
        'chiedi di inoltrarlo di nuovo per intero.'
    );
  }

  var printButton = el('cl-print');
  if (printButton) {
    printButton.addEventListener('click', function () {
      window.print();
    });
  }
})();
