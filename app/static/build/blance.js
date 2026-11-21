var Pd = { exports: {} }, zo = {};
var w1;
function Vb() {
  if (w1) return zo;
  w1 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function u(a, o, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), o.key !== void 0 && (h = "" + o.key), "key" in o) {
      c = {};
      for (var d in o)
        d !== "key" && (c[d] = o[d]);
    } else c = o;
    return o = c.ref, {
      $$typeof: f,
      type: a,
      key: h,
      ref: o !== void 0 ? o : null,
      props: c
    };
  }
  return zo.Fragment = l, zo.jsx = u, zo.jsxs = u, zo;
}
var A1;
function Gb() {
  return A1 || (A1 = 1, Pd.exports = Vb()), Pd.exports;
}
var ae = Gb(), $d = { exports: {} }, Zt = {};
var O1;
function jb() {
  if (O1) return Zt;
  O1 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), p = /* @__PURE__ */ Symbol.for("react.memo"), v = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), b = Symbol.iterator;
  function M(E) {
    return E === null || typeof E != "object" ? null : (E = b && E[b] || E["@@iterator"], typeof E == "function" ? E : null);
  }
  var T = {
    isMounted: function() {
      return !1;
    },
    enqueueForceUpdate: function() {
    },
    enqueueReplaceState: function() {
    },
    enqueueSetState: function() {
    }
  }, R = Object.assign, V = {};
  function X(E, w, J) {
    this.props = E, this.context = w, this.refs = V, this.updater = J || T;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(E, w) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, w, "setState");
  }, X.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function K() {
  }
  K.prototype = X.prototype;
  function Y(E, w, J) {
    this.props = E, this.context = w, this.refs = V, this.updater = J || T;
  }
  var Q = Y.prototype = new K();
  Q.constructor = Y, R(Q, X.prototype), Q.isPureReactComponent = !0;
  var k = Array.isArray;
  function D() {
  }
  var Z = { H: null, A: null, T: null, S: null }, $ = Object.prototype.hasOwnProperty;
  function G(E, w, J) {
    var L = J.ref;
    return {
      $$typeof: f,
      type: E,
      key: w,
      ref: L !== void 0 ? L : null,
      props: J
    };
  }
  function ut(E, w) {
    return G(E.type, w, E.props);
  }
  function lt(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function St(E) {
    var w = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(J) {
      return w[J];
    });
  }
  var Mt = /\/+/g;
  function et(E, w) {
    return typeof E == "object" && E !== null && E.key != null ? St("" + E.key) : w.toString(36);
  }
  function F(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(D, D) : (E.status = "pending", E.then(
          function(w) {
            E.status === "pending" && (E.status = "fulfilled", E.value = w);
          },
          function(w) {
            E.status === "pending" && (E.status = "rejected", E.reason = w);
          }
        )), E.status) {
          case "fulfilled":
            return E.value;
          case "rejected":
            throw E.reason;
        }
    }
    throw E;
  }
  function P(E, w, J, L, mt) {
    var ht = typeof E;
    (ht === "undefined" || ht === "boolean") && (E = null);
    var Rt = !1;
    if (E === null) Rt = !0;
    else
      switch (ht) {
        case "bigint":
        case "string":
        case "number":
          Rt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case f:
            case l:
              Rt = !0;
              break;
            case v:
              return Rt = E._init, P(
                Rt(E._payload),
                w,
                J,
                L,
                mt
              );
          }
      }
    if (Rt)
      return mt = mt(E), Rt = L === "" ? "." + et(E, 0) : L, k(mt) ? (J = "", Rt != null && (J = Rt.replace(Mt, "$&/") + "/"), P(mt, w, J, "", function(zt) {
        return zt;
      })) : mt != null && (lt(mt) && (mt = ut(
        mt,
        J + (mt.key == null || E && E.key === mt.key ? "" : ("" + mt.key).replace(
          Mt,
          "$&/"
        ) + "/") + Rt
      )), w.push(mt)), 1;
    Rt = 0;
    var ot = L === "" ? "." : L + ":";
    if (k(E))
      for (var gt = 0; gt < E.length; gt++)
        L = E[gt], ht = ot + et(L, gt), Rt += P(
          L,
          w,
          J,
          ht,
          mt
        );
    else if (gt = M(E), typeof gt == "function")
      for (E = gt.call(E), gt = 0; !(L = E.next()).done; )
        L = L.value, ht = ot + et(L, gt++), Rt += P(
          L,
          w,
          J,
          ht,
          mt
        );
    else if (ht === "object") {
      if (typeof E.then == "function")
        return P(
          F(E),
          w,
          J,
          L,
          mt
        );
      throw w = String(E), Error(
        "Objects are not valid as a React child (found: " + (w === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : w) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Rt;
  }
  function I(E, w, J) {
    if (E == null) return E;
    var L = [], mt = 0;
    return P(E, L, "", "", function(ht) {
      return w.call(J, ht, mt++);
    }), L;
  }
  function st(E) {
    if (E._status === -1) {
      var w = E._result, J = w();
      J.then(
        function(L) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = L, J.status === void 0 && (J.status = "fulfilled", J.value = L));
        },
        function(L) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = L, J.status === void 0 && (J.status = "rejected", J.reason = L));
        }
      ), E._status === -1 && (E._status = 0, E._result = J);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var A = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var w = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(w)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  };
  function Et(E) {
    var w = Z.T, J = {};
    J.types = w !== null ? w.types : null, Z.T = J;
    try {
      var L = E(), mt = Z.S;
      mt !== null && mt(J, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(D, A);
    } catch (ht) {
      A(ht);
    } finally {
      w !== null && J.types !== null && (w.types = J.types), Z.T = w;
    }
  }
  function z(E) {
    var w = Z.T;
    if (w !== null) {
      var J = w.types;
      J === null ? w.types = [E] : J.indexOf(E) === -1 && J.push(E);
    } else Et(z.bind(null, E));
  }
  var Nt = {
    map: I,
    forEach: function(E, w, J) {
      I(
        E,
        function() {
          w.apply(this, arguments);
        },
        J
      );
    },
    count: function(E) {
      var w = 0;
      return I(E, function() {
        w++;
      }), w;
    },
    toArray: function(E) {
      return I(E, function(w) {
        return w;
      }) || [];
    },
    only: function(E) {
      if (!lt(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return Zt.Activity = _, Zt.Children = Nt, Zt.Component = X, Zt.Fragment = u, Zt.Profiler = o, Zt.PureComponent = Y, Zt.StrictMode = a, Zt.Suspense = g, Zt.ViewTransition = S, Zt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Z, Zt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return Z.H.useMemoCache(E);
    }
  }, Zt.addTransitionType = z, Zt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, Zt.cacheSignal = function() {
    return null;
  }, Zt.cloneElement = function(E, w, J) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var L = R({}, E.props), mt = E.key;
    if (w != null)
      for (ht in w.key !== void 0 && (mt = "" + w.key), w)
        !$.call(w, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && w.ref === void 0 || (L[ht] = w[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) L.children = J;
    else if (1 < ht) {
      for (var Rt = Array(ht), ot = 0; ot < ht; ot++)
        Rt[ot] = arguments[ot + 2];
      L.children = Rt;
    }
    return G(E.type, mt, L);
  }, Zt.createContext = function(E) {
    return E = {
      $$typeof: h,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: c,
      _context: E
    }, E;
  }, Zt.createElement = function(E, w, J) {
    var L, mt = {}, ht = null;
    if (w != null)
      for (L in w.key !== void 0 && (ht = "" + w.key), w)
        $.call(w, L) && L !== "key" && L !== "__self" && L !== "__source" && (mt[L] = w[L]);
    var Rt = arguments.length - 2;
    if (Rt === 1) mt.children = J;
    else if (1 < Rt) {
      for (var ot = Array(Rt), gt = 0; gt < Rt; gt++)
        ot[gt] = arguments[gt + 2];
      mt.children = ot;
    }
    if (E && E.defaultProps)
      for (L in Rt = E.defaultProps, Rt)
        mt[L] === void 0 && (mt[L] = Rt[L]);
    return G(E, ht, mt);
  }, Zt.createRef = function() {
    return { current: null };
  }, Zt.forwardRef = function(E) {
    return { $$typeof: d, render: E };
  }, Zt.isValidElement = lt, Zt.lazy = function(E) {
    return {
      $$typeof: v,
      _payload: { _status: -1, _result: E },
      _init: st
    };
  }, Zt.memo = function(E, w) {
    return {
      $$typeof: p,
      type: E,
      compare: w === void 0 ? null : w
    };
  }, Zt.startTransition = Et, Zt.unstable_useCacheRefresh = function() {
    return Z.H.useCacheRefresh();
  }, Zt.use = function(E) {
    return Z.H.use(E);
  }, Zt.useActionState = function(E, w, J) {
    return Z.H.useActionState(E, w, J);
  }, Zt.useCallback = function(E, w) {
    return Z.H.useCallback(E, w);
  }, Zt.useContext = function(E) {
    return Z.H.useContext(E);
  }, Zt.useDebugValue = function() {
  }, Zt.useDeferredValue = function(E, w) {
    return Z.H.useDeferredValue(E, w);
  }, Zt.useEffect = function(E, w) {
    return Z.H.useEffect(E, w);
  }, Zt.useEffectEvent = function(E) {
    return Z.H.useEffectEvent(E);
  }, Zt.useId = function() {
    return Z.H.useId();
  }, Zt.useImperativeHandle = function(E, w, J) {
    return Z.H.useImperativeHandle(E, w, J);
  }, Zt.useInsertionEffect = function(E, w) {
    return Z.H.useInsertionEffect(E, w);
  }, Zt.useLayoutEffect = function(E, w) {
    return Z.H.useLayoutEffect(E, w);
  }, Zt.useMemo = function(E, w) {
    return Z.H.useMemo(E, w);
  }, Zt.useOptimistic = function(E, w) {
    return Z.H.useOptimistic(E, w);
  }, Zt.useReducer = function(E, w, J) {
    return Z.H.useReducer(E, w, J);
  }, Zt.useRef = function(E) {
    return Z.H.useRef(E);
  }, Zt.useState = function(E) {
    return Z.H.useState(E);
  }, Zt.useSyncExternalStore = function(E, w, J) {
    return Z.H.useSyncExternalStore(
      E,
      w,
      J
    );
  }, Zt.useTransition = function() {
    return Z.H.useTransition();
  }, Zt.version = "19.3.1", Zt;
}
var R1;
function G0() {
  return R1 || (R1 = 1, $d.exports = jb()), $d.exports;
}
var se = G0(), Wd = { exports: {} }, Co = {}, Id = { exports: {} }, t0 = {};
var z1;
function Qb() {
  return z1 || (z1 = 1, (function(f) {
    function l(F, P) {
      var I = F.length;
      F.push(P);
      t: for (; 0 < I; ) {
        var st = I - 1 >>> 1, A = F[st];
        if (0 < o(A, P))
          F[st] = P, F[I] = A, I = st;
        else break t;
      }
    }
    function u(F) {
      return F.length === 0 ? null : F[0];
    }
    function a(F) {
      if (F.length === 0) return null;
      var P = F[0], I = F.pop();
      if (I !== P) {
        F[0] = I;
        t: for (var st = 0, A = F.length, Et = A >>> 1; st < Et; ) {
          var z = 2 * (st + 1) - 1, Nt = F[z], E = z + 1, w = F[E];
          if (0 > o(Nt, I))
            E < A && 0 > o(w, Nt) ? (F[st] = w, F[E] = I, st = E) : (F[st] = Nt, F[z] = I, st = z);
          else if (E < A && 0 > o(w, I))
            F[st] = w, F[E] = I, st = E;
          else break t;
        }
      }
      return P;
    }
    function o(F, P) {
      var I = F.sortIndex - P.sortIndex;
      return I !== 0 ? I : F.id - P.id;
    }
    if (f.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var c = performance;
      f.unstable_now = function() {
        return c.now();
      };
    } else {
      var h = Date, d = h.now();
      f.unstable_now = function() {
        return h.now() - d;
      };
    }
    var g = [], p = [], v = 1, _ = null, S = 3, b = !1, M = !1, T = !1, R = !1, V = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, K = typeof setImmediate < "u" ? setImmediate : null;
    function Y(F) {
      for (var P = u(p); P !== null; ) {
        if (P.callback === null) a(p);
        else if (P.startTime <= F)
          a(p), P.sortIndex = P.expirationTime, l(g, P);
        else break;
        P = u(p);
      }
    }
    function Q(F) {
      if (T = !1, Y(F), !M)
        if (u(g) !== null)
          M = !0, k || (k = !0, lt());
        else {
          var P = u(p);
          P !== null && et(Q, P.startTime - F);
        }
    }
    var k = !1, D = -1, Z = 5, $ = -1;
    function G() {
      return R ? !0 : !(f.unstable_now() - $ < Z);
    }
    function ut() {
      if (R = !1, k) {
        var F = f.unstable_now();
        $ = F;
        var P = !0;
        try {
          t: {
            M = !1, T && (T = !1, X(D), D = -1), b = !0;
            var I = S;
            try {
              e: {
                for (Y(F), _ = u(g); _ !== null && !(_.expirationTime > F && G()); ) {
                  var st = _.callback;
                  if (typeof st == "function") {
                    _.callback = null, S = _.priorityLevel;
                    var A = st(
                      _.expirationTime <= F
                    );
                    if (F = f.unstable_now(), typeof A == "function") {
                      _.callback = A, Y(F), P = !0;
                      break e;
                    }
                    _ === u(g) && a(g), Y(F);
                  } else a(g);
                  _ = u(g);
                }
                if (_ !== null) P = !0;
                else {
                  var Et = u(p);
                  Et !== null && et(
                    Q,
                    Et.startTime - F
                  ), P = !1;
                }
              }
              break t;
            } finally {
              _ = null, S = I, b = !1;
            }
            P = void 0;
          }
        } finally {
          P ? lt() : k = !1;
        }
      }
    }
    var lt;
    if (typeof K == "function")
      lt = function() {
        K(ut);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), Mt = St.port2;
      St.port1.onmessage = ut, lt = function() {
        Mt.postMessage(null);
      };
    } else
      lt = function() {
        V(ut, 0);
      };
    function et(F, P) {
      D = V(function() {
        F(f.unstable_now());
      }, P);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, f.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Z = 0 < F ? Math.floor(1e3 / F) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, f.unstable_next = function(F) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var P = 3;
          break;
        default:
          P = S;
      }
      var I = S;
      S = P;
      try {
        return F();
      } finally {
        S = I;
      }
    }, f.unstable_requestPaint = function() {
      R = !0;
    }, f.unstable_runWithPriority = function(F, P) {
      switch (F) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          F = 3;
      }
      var I = S;
      S = F;
      try {
        return P();
      } finally {
        S = I;
      }
    }, f.unstable_scheduleCallback = function(F, P, I) {
      var st = f.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? st + I : st) : I = st, F) {
        case 1:
          var A = -1;
          break;
        case 2:
          A = 250;
          break;
        case 5:
          A = 1073741823;
          break;
        case 4:
          A = 1e4;
          break;
        default:
          A = 5e3;
      }
      return A = I + A, F = {
        id: v++,
        callback: P,
        priorityLevel: F,
        startTime: I,
        expirationTime: A,
        sortIndex: -1
      }, I > st ? (F.sortIndex = I, l(p, F), u(g) === null && F === u(p) && (T ? (X(D), D = -1) : T = !0, et(Q, I - st))) : (F.sortIndex = A, l(g, F), M || b || (M = !0, k || (k = !0, lt()))), F;
    }, f.unstable_shouldYield = G, f.unstable_wrapCallback = function(F) {
      var P = S;
      return function() {
        var I = S;
        S = P;
        try {
          return F.apply(this, arguments);
        } finally {
          S = I;
        }
      };
    };
  })(t0)), t0;
}
var C1;
function Zb() {
  return C1 || (C1 = 1, Id.exports = Qb()), Id.exports;
}
var e0 = { exports: {} }, Dn = {};
var D1;
function Kb() {
  if (D1) return Dn;
  D1 = 1;
  var f = G0();
  function l(v) {
    var _ = "https://react.dev/errors/" + v;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        _ += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + v + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var a = {
    d: {
      f: u,
      r: function() {
        throw Error(l(522));
      },
      D: u,
      C: u,
      L: u,
      m: u,
      X: u,
      S: u,
      M: u
    },
    p: 0,
    findDOMNode: null
  }, o = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function d(v, _, S) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : b === h ? h : "" + b,
      children: v,
      containerInfo: _,
      implementation: S
    };
  }
  var g = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function p(v, _) {
    if (v === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return Dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Dn.browser = function(v) {
    return { $$typeof: c, _reason: v };
  }, Dn.createPortal = function(v, _) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(l(299));
    return d(v, _, null, S);
  }, Dn.flushSync = function(v) {
    var _ = g.T, S = a.p;
    try {
      if (g.T = null, a.p = 2, v) return v();
    } finally {
      g.T = _, a.p = S, a.d.f();
    }
  }, Dn.preconnect = function(v, _) {
    typeof v == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, a.d.C(v, _));
  }, Dn.prefetchDNS = function(v) {
    typeof v == "string" && a.d.D(v);
  }, Dn.preinit = function(v, _) {
    if (typeof v == "string" && _ && typeof _.as == "string") {
      var S = _.as, b = p(S, _.crossOrigin), M = typeof _.integrity == "string" ? _.integrity : void 0, T = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      S === "style" ? a.d.S(
        v,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: b,
          integrity: M,
          fetchPriority: T
        }
      ) : S === "script" && a.d.X(v, {
        crossOrigin: b,
        integrity: M,
        fetchPriority: T,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, Dn.preinitModule = function(v, _) {
    if (typeof v == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var S = p(
            _.as,
            _.crossOrigin
          );
          a.d.M(v, {
            crossOrigin: S,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0,
            fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
          });
        }
      } else _ == null && a.d.M(v);
  }, Dn.preload = function(v, _) {
    if (typeof v == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var S = _.as, b = p(S, _.crossOrigin);
      a.d.L(v, S, {
        crossOrigin: b,
        integrity: typeof _.integrity == "string" ? _.integrity : void 0,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0,
        type: typeof _.type == "string" ? _.type : void 0,
        fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0,
        referrerPolicy: typeof _.referrerPolicy == "string" ? _.referrerPolicy : void 0,
        imageSrcSet: typeof _.imageSrcSet == "string" ? _.imageSrcSet : void 0,
        imageSizes: typeof _.imageSizes == "string" ? _.imageSizes : void 0,
        media: typeof _.media == "string" ? _.media : void 0
      });
    }
  }, Dn.preloadModule = function(v, _) {
    if (typeof v == "string")
      if (_) {
        var S = p(_.as, _.crossOrigin);
        a.d.m(v, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: S,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0,
          fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
        });
      } else a.d.m(v);
  }, Dn.requestFormReset = function(v) {
    a.d.r(v);
  }, Dn.unstable_batchedUpdates = function(v, _) {
    return v(_);
  }, Dn.useFormState = function(v, _, S) {
    return g.H.useFormState(v, _, S);
  }, Dn.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, Dn.version = "19.3.1", Dn;
}
var N1;
function z_() {
  if (N1) return e0.exports;
  N1 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (l) {
        console.error(l);
      }
  }
  return f(), e0.exports = Kb(), e0.exports;
}
var U1;
function Fb() {
  if (U1) return Co;
  U1 = 1;
  var f = Zb(), l = G0(), u = z_();
  function a(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function o(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function c(t) {
    for (var e = t, n = e; n && !n.alternate; )
      e = n, (e.flags & 4098) !== 0 && (t = e.return), n = e.return;
    for (; e.return; ) e = e.return;
    return e.tag === 3 ? t : null;
  }
  function h(t) {
    if (t.tag === 13) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function d(t) {
    if (t.tag === 31) {
      var e = t.memoizedState;
      if (e === null && (t = t.alternate, t !== null && (e = t.memoizedState)), e !== null) return e.dehydrated;
    }
    return null;
  }
  function g(t) {
    if (c(t) !== t)
      throw Error(a(188));
  }
  function p(t) {
    var e = t.alternate;
    if (!e) {
      if (e = c(t), e === null) throw Error(a(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var r = n.return;
      if (r === null) break;
      var s = r.alternate;
      if (s === null) {
        if (i = r.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (r.child === s.child) {
        for (s = r.child; s; ) {
          if (s === n) return g(r), t;
          if (s === i) return g(r), e;
          s = s.sibling;
        }
        throw Error(a(188));
      }
      if (n.return !== i.return) n = r, i = s;
      else {
        for (var m = !1, y = r.child; y; ) {
          if (y === n) {
            m = !0, n = r, i = s;
            break;
          }
          if (y === i) {
            m = !0, i = r, n = s;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = s.child; y; ) {
            if (y === n) {
              m = !0, n = s, i = r;
              break;
            }
            if (y === i) {
              m = !0, i = s, n = r;
              break;
            }
            y = y.sibling;
          }
          if (!m) throw Error(a(189));
        }
      }
      if (n.alternate !== i) throw Error(a(190));
    }
    if (n.tag !== 3) throw Error(a(188));
    return n.stateNode.current === n ? t : e;
  }
  function v(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = v(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function _(t, e, n, i, r, s) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, i, r, s) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && _(
        t.child,
        e,
        n,
        i,
        r,
        s
      ))
        return !0;
      t = t.sibling;
    }
    return !1;
  }
  function S(t) {
    for (t = t.return; t !== null; ) {
      if (t.tag === 3 || t.tag === 5 || t.tag === 27) return t;
      t = t.return;
    }
    return null;
  }
  function b(t) {
    var e = !1;
    for (t = t.return; t !== null && (t.tag === 4 && (e = !0), !(t.tag === 3 || t.tag === 5 || t.tag === 27)); )
      t = t.return;
    return e;
  }
  function M(t) {
    var e = [null, null], n = S(t);
    return n === null || T(
      e,
      t,
      n.child,
      { foundSelf: !1 }
    ), e;
  }
  function T(t, e, n, i) {
    for (; n !== null; ) {
      if (n === e) i.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (i.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && T(
        t,
        e,
        n.child,
        i
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function R(t) {
    switch (t.tag) {
      case 5:
      case 27:
      case 6:
        return t.stateNode;
      case 3:
        return t.stateNode.containerInfo;
      default:
        throw Error(a(559));
    }
  }
  var V = null, X = null;
  function K(t, e, n) {
    return t === n ? !0 : t === e ? (V = t, !0) : !1;
  }
  function Y(t, e, n) {
    return t === n ? (X = t, !1) : t === e ? (X !== null && (V = t), !0) : !1;
  }
  function Q(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function k(t, e, n) {
    for (var i = 0, r = t; r; r = n(r)) i++;
    r = 0;
    for (var s = e; s; s = n(s)) r++;
    for (; 0 < i - r; ) t = n(t), i--;
    for (; 0 < r - i; ) e = n(e), r--;
    for (; i--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var D = Object.assign, Z = /* @__PURE__ */ Symbol.for("react.element"), $ = /* @__PURE__ */ Symbol.for("react.transitional.element"), G = /* @__PURE__ */ Symbol.for("react.portal"), ut = /* @__PURE__ */ Symbol.for("react.fragment"), lt = /* @__PURE__ */ Symbol.for("react.strict_mode"), St = /* @__PURE__ */ Symbol.for("react.profiler"), Mt = /* @__PURE__ */ Symbol.for("react.consumer"), et = /* @__PURE__ */ Symbol.for("react.context"), F = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), st = /* @__PURE__ */ Symbol.for("react.memo"), A = /* @__PURE__ */ Symbol.for("react.lazy"), Et = /* @__PURE__ */ Symbol.for("react.activity"), z = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Nt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), E = /* @__PURE__ */ Symbol.for("react.view_transition"), w = /* @__PURE__ */ Symbol.for("react.recoverable"), J = Symbol.iterator;
  function L(t) {
    return t === null || typeof t != "object" ? null : (t = J && t[J] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var mt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ht(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === mt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case ut:
        return "Fragment";
      case St:
        return "Profiler";
      case lt:
        return "StrictMode";
      case P:
        return "Suspense";
      case I:
        return "SuspenseList";
      case Et:
        return "Activity";
      case E:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case G:
          return "Portal";
        case et:
          return t.displayName || "Context";
        case Mt:
          return (t._context.displayName || "Context") + ".Consumer";
        case F:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case st:
          return e = t.displayName || null, e !== null ? e : ht(t.type) || "Memo";
        case A:
          e = t._payload, t = t._init;
          try {
            return ht(t(e));
          } catch {
          }
      }
    return null;
  }
  var Rt = Array.isArray, ot = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, gt = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, zt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, vt = [], Ut = -1;
  function Yt(t) {
    return { current: t };
  }
  function B(t) {
    0 > Ut || (t.current = vt[Ut], vt[Ut] = null, Ut--);
  }
  function nt(t, e) {
    Ut++, vt[Ut] = t.current, t.current = e;
  }
  var pt = Yt(null), dt = Yt(null), bt = Yt(null), jt = Yt(null);
  function kt(t, e) {
    switch (nt(bt, e), nt(dt, t), nt(pt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Bv(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Bv(e), t = Hv(e, t);
        else
          switch (t) {
            case "svg":
              t = 1;
              break;
            case "math":
              t = 2;
              break;
            default:
              t = 0;
          }
    }
    B(pt), nt(pt, t);
  }
  function Ht() {
    B(pt), B(dt), B(bt);
  }
  function Ct(t) {
    var e = t.memoizedState;
    e !== null && (gr._currentValue = e.memoizedState, nt(jt, t)), e = pt.current;
    var n = Hv(e, t.type);
    e !== n && (nt(dt, t), nt(pt, n));
  }
  function ee(t) {
    dt.current === t && (B(pt), B(dt)), jt.current === t && (B(jt), gr._currentValue = zt);
  }
  var ue, Fe;
  function Re(t) {
    if (ue === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        ue = e && e[1] || "", Fe = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ue + t + Fe;
  }
  var _n = !1;
  function Vn(t, e) {
    if (!t || _n) return "";
    _n = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var tt = function() {
                throw Error();
              };
              if (Object.defineProperty(tt.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(tt, []);
                } catch (_t) {
                  var C = _t;
                }
                Reflect.construct(t, [], tt);
              } else {
                try {
                  tt.call();
                } catch (_t) {
                  C = _t;
                }
                tt = !1;
                try {
                  var q = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), tt = !0, new t();
                } finally {
                  tt && (q !== void 0 ? Object.defineProperty(t.prototype, "props", q) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (_t) {
                C = _t;
              }
              (tt = t()) && typeof tt.catch == "function" && tt.catch(function() {
              });
            }
          } catch (_t) {
            if (_t && C && typeof _t.stack == "string")
              return [_t.stack, C.stack];
          }
          return [null, null];
        }
      };
      i.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        i.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        i.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var s = i.DetermineComponentFrameRoot(), m = s[0], y = s[1];
      if (m && y) {
        var x = m.split(`
`), U = y.split(`
`);
        for (r = i = 0; i < x.length && !x[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; r < U.length && !U[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (i === x.length || r === U.length)
          for (i = x.length - 1, r = U.length - 1; 1 <= i && 0 <= r && x[i] !== U[r]; )
            r--;
        for (; 1 <= i && 0 <= r; i--, r--)
          if (x[i] !== U[r]) {
            if (i !== 1 || r !== 1)
              do
                if (i--, r--, 0 > r || x[i] !== U[r]) {
                  var j = `
` + x[i].replace(" at new ", " at ");
                  return t.displayName && j.includes("<anonymous>") && (j = j.replace("<anonymous>", t.displayName)), j;
                }
              while (1 <= i && 0 <= r);
            break;
          }
      }
    } finally {
      _n = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Re(n) : "";
  }
  function xe(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Re(t.type);
      case 16:
        return Re("Lazy");
      case 13:
        return t.child !== e && e !== null ? Re("Suspense Fallback") : Re("Suspense");
      case 19:
        return Re("SuspenseList");
      case 0:
      case 15:
        return Vn(t.type, !1);
      case 11:
        return Vn(t.type.render, !1);
      case 1:
        return Vn(t.type, !0);
      case 31:
        return Re("Activity");
      case 30:
        return Re("ViewTransition");
      default:
        return "";
    }
  }
  function Yi(t) {
    try {
      var e = "", n = null;
      do
        e += xe(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var He = Object.prototype.hasOwnProperty, Gn = f.unstable_scheduleCallback, tn = f.unstable_cancelCallback, ei = f.unstable_shouldYield, qi = f.unstable_requestPaint, qt = f.unstable_now, Xi = f.unstable_getCurrentPriorityLevel, dn = f.unstable_ImmediatePriority, wn = f.unstable_UserBlockingPriority, mn = f.unstable_NormalPriority, Vi = f.unstable_LowPriority, Gi = f.unstable_IdlePriority, ni = f.log, ct = f.unstable_setDisableYieldValue, at = null, rt = null;
  function Tt(t) {
    if (typeof ni == "function" && ct(t), rt && typeof rt.setStrictMode == "function")
      try {
        rt.setStrictMode(at, t);
      } catch {
      }
  }
  var it = Math.clz32 ? Math.clz32 : xt, ft = Math.log, yt = Math.LN2;
  function xt(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ft(t) / yt | 0) | 0;
  }
  var Lt = 256, At = 262144, Vt = 4194304;
  function ne(t) {
    var e = t & 42;
    if (e !== 0) return e;
    switch (t & -t) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
        return 64;
      case 128:
        return 128;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
        return t & -t;
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t & 3932160;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return t & 62914560;
      case 67108864:
        return 67108864;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 0;
      default:
        return t;
    }
  }
  function Xt(t, e, n) {
    var i = t.pendingLanes;
    if (i === 0) return 0;
    var r = 0, s = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var y = i & 134217727;
    return y !== 0 ? (i = y & ~s, i !== 0 ? r = ne(i) : (m &= y, m !== 0 ? r = ne(m) : n || (n = y & ~t, n !== 0 && (r = ne(n))))) : (y = i & ~s, y !== 0 ? r = ne(y) : m !== 0 ? r = ne(m) : n || (n = i & ~t, n !== 0 && (r = ne(n)))), r === 0 ? 0 : e !== 0 && e !== r && (e & s) === 0 && (s = r & -r, n = e & -e, s >= n || s === 32 && (n & 4194048) !== 0) ? e : r;
  }
  function Qt(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Kt(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - it(n), r = 1 << i;
        e |= t[i], n &= ~r;
      }
    return e;
  }
  function Me(t, e) {
    switch (t) {
      case 1:
      case 2:
      case 4:
      case 8:
      case 64:
        return e + 250;
      case 16:
      case 32:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        return -1;
      case 67108864:
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function he() {
    var t = Vt;
    return Vt <<= 1, (Vt & 62914560) === 0 && (Vt = 4194304), t;
  }
  function Le(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Ve(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function we(t, e, n, i, r, s) {
    var m = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var y = t.entanglements, x = t.expirationTimes, U = t.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var j = 31 - it(n), tt = 1 << j;
      y[j] = 0, x[j] = -1;
      var C = U[j];
      if (C !== null)
        for (U[j] = null, j = 0; j < C.length; j++) {
          var q = C[j];
          q !== null && (q.lane &= -536870913);
        }
      n &= ~tt;
    }
    i !== 0 && Ne(t, i, 0), s !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(m & ~e));
  }
  function Ne(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - it(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function me(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - it(n), r = 1 << i;
      r & e | t[i] & e && (t[i] |= e), n &= ~r;
    }
  }
  function vi(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : ml(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function ml(t) {
    switch (t) {
      case 2:
        t = 1;
        break;
      case 8:
        t = 4;
        break;
      case 32:
        t = 16;
        break;
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
        t = 128;
        break;
      case 268435456:
        t = 134217728;
        break;
      default:
        t = 0;
    }
    return t;
  }
  function Ge(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ue() {
    var t = gt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : y1(t.type));
  }
  function yn(t, e) {
    var n = gt.p;
    try {
      return gt.p = t, e();
    } finally {
      gt.p = n;
    }
  }
  var en = Math.random().toString(36).slice(2), Ye = "__reactFiber$" + en, Be = "__reactProps$" + en, Je = "__reactContainer$" + en, _i = "__reactEvents$" + en, al = "__reactListeners$" + en, ii = "__reactHandles$" + en, Xr = "__reactResources$" + en, ke = "__reactMarker$" + en, Pe = "__reactLoad$" + en;
  function jn(t) {
    delete t[Ye], delete t[Be], delete t[al], delete t[ii];
  }
  function Qn(t) {
    var e;
    if (e = t[Ye]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[Je] || n[Ye]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Iv(t); t !== null; ) {
            if (n = t[Ye]) return n;
            t = Iv(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ji(t) {
    if (t = t[Ye] || t[Je]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Qa(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(a(33));
  }
  function gl(t) {
    var e = t[Xr];
    return e || (e = t[Xr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function nn(t) {
    t[ke] = !0;
  }
  function pm(t) {
    t[Pe] = void 0;
  }
  var vm = /* @__PURE__ */ new Set(), _m = {};
  function Za(t, e) {
    Du(t, e), Du(t + "Capture", e);
  }
  function Du(t, e) {
    for (_m[t] = e, t = 0; t < e.length; t++)
      vm.add(e[t]);
  }
  var aS = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), ym = {}, Sm = {};
  function uS(t) {
    return He.call(Sm, t) ? !0 : He.call(ym, t) ? !1 : aS.test(t) ? Sm[t] = !0 : (ym[t] = !0, !1);
  }
  var de = !1;
  function bm() {
    var t = de;
    return de = !1, t;
  }
  function ps(t, e, n) {
    if (uS(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var i = e.toLowerCase().slice(0, 5);
            if (i !== "data-" && i !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function vs(t, e, n) {
    if (n === null) t.removeAttribute(e);
    else {
      switch (typeof n) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(e);
          return;
      }
      t.setAttribute(e, n);
    }
  }
  function Ul(t, e, n, i) {
    if (i === null) t.removeAttribute(n);
    else {
      switch (typeof i) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, i);
    }
  }
  function yi(t) {
    switch (typeof t) {
      case "bigint":
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return t;
      case "object":
        return t;
      default:
        return "";
    }
  }
  function Tm(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function rS(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var r = i.get, s = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          n = "" + m, s.call(this, m);
        }
      }), Object.defineProperty(t, e, {
        enumerable: i.enumerable
      }), {
        getValue: function() {
          return n;
        },
        setValue: function(m) {
          n = "" + m;
        },
        stopTracking: function() {
          t._valueTracker = null, delete t[e];
        }
      };
    }
  }
  function wf(t) {
    if (!t._valueTracker) {
      var e = Tm(t) ? "checked" : "value";
      t._valueTracker = rS(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Em(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = Tm(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  var oS = /[\n"\\]/g;
  function Qi(t) {
    return t.replace(
      oS,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Af(t, e, n, i, r, s, m, y) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + yi(e)) : t.value !== "" + yi(e) && (t.value = "" + yi(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? m === "number" && t.value == e ? Of(t, yi(t.value)) : Of(t, yi(e)) : n != null ? Of(t, yi(n)) : i != null && t.removeAttribute("value"), r == null && s != null && (t.defaultChecked = !!s), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + yi(y) : t.removeAttribute("name");
  }
  function xm(t, e, n, i, r, s, m, y) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.type = s), e != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || e != null)) {
        wf(t);
        return;
      }
      n = n != null ? "" + yi(n) : "", e = e != null ? "" + yi(e) : n, y || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? r, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = y ? t.checked : !!i, t.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), wf(t);
  }
  function Of(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Nu(t, e, n, i) {
    if (t = t.options, e) {
      e = {};
      for (var r = 0; r < n.length; r++)
        e["$" + n[r]] = !0;
      for (n = 0; n < t.length; n++)
        r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && i && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + yi(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          t[r].selected = !0, i && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Mm(t, e, n) {
    if (e != null && (e = "" + yi(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + yi(n) : "";
  }
  function wm(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(a(92));
        if (Rt(i)) {
          if (1 < i.length) throw Error(a(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = yi(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), wf(t);
  }
  function Uu(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var sS = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Am(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || sS.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Om(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(a(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "", de = !0);
      for (var r in e)
        i = e[r], e.hasOwnProperty(r) && n[r] !== i && (Am(t, r, i), de = !0);
    } else
      for (var s in e)
        e.hasOwnProperty(s) && Am(t, s, e[s]);
  }
  function Rf(t) {
    if (t.indexOf("-") === -1) return !1;
    switch (t) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var cS = /* @__PURE__ */ new Map([
    ["acceptCharset", "accept-charset"],
    ["htmlFor", "for"],
    ["httpEquiv", "http-equiv"],
    ["crossOrigin", "crossorigin"],
    ["accentHeight", "accent-height"],
    ["alignmentBaseline", "alignment-baseline"],
    ["arabicForm", "arabic-form"],
    ["baselineShift", "baseline-shift"],
    ["capHeight", "cap-height"],
    ["clipPath", "clip-path"],
    ["clipRule", "clip-rule"],
    ["colorInterpolation", "color-interpolation"],
    ["colorInterpolationFilters", "color-interpolation-filters"],
    ["colorProfile", "color-profile"],
    ["colorRendering", "color-rendering"],
    ["dominantBaseline", "dominant-baseline"],
    ["enableBackground", "enable-background"],
    ["fillOpacity", "fill-opacity"],
    ["fillRule", "fill-rule"],
    ["floodColor", "flood-color"],
    ["floodOpacity", "flood-opacity"],
    ["fontFamily", "font-family"],
    ["fontSize", "font-size"],
    ["fontSizeAdjust", "font-size-adjust"],
    ["fontStretch", "font-stretch"],
    ["fontStyle", "font-style"],
    ["fontVariant", "font-variant"],
    ["fontWeight", "font-weight"],
    ["glyphName", "glyph-name"],
    ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
    ["glyphOrientationVertical", "glyph-orientation-vertical"],
    ["horizAdvX", "horiz-adv-x"],
    ["horizOriginX", "horiz-origin-x"],
    ["imageRendering", "image-rendering"],
    ["letterSpacing", "letter-spacing"],
    ["lightingColor", "lighting-color"],
    ["markerEnd", "marker-end"],
    ["markerMid", "marker-mid"],
    ["markerStart", "marker-start"],
    ["maskType", "mask-type"],
    ["overlinePosition", "overline-position"],
    ["overlineThickness", "overline-thickness"],
    ["paintOrder", "paint-order"],
    ["panose-1", "panose-1"],
    ["pointerEvents", "pointer-events"],
    ["renderingIntent", "rendering-intent"],
    ["shapeRendering", "shape-rendering"],
    ["stopColor", "stop-color"],
    ["stopOpacity", "stop-opacity"],
    ["strikethroughPosition", "strikethrough-position"],
    ["strikethroughThickness", "strikethrough-thickness"],
    ["strokeDasharray", "stroke-dasharray"],
    ["strokeDashoffset", "stroke-dashoffset"],
    ["strokeLinecap", "stroke-linecap"],
    ["strokeLinejoin", "stroke-linejoin"],
    ["strokeMiterlimit", "stroke-miterlimit"],
    ["strokeOpacity", "stroke-opacity"],
    ["strokeWidth", "stroke-width"],
    ["textAnchor", "text-anchor"],
    ["textDecoration", "text-decoration"],
    ["textRendering", "text-rendering"],
    ["transformOrigin", "transform-origin"],
    ["underlinePosition", "underline-position"],
    ["underlineThickness", "underline-thickness"],
    ["unicodeBidi", "unicode-bidi"],
    ["unicodeRange", "unicode-range"],
    ["unitsPerEm", "units-per-em"],
    ["vAlphabetic", "v-alphabetic"],
    ["vHanging", "v-hanging"],
    ["vIdeographic", "v-ideographic"],
    ["vMathematical", "v-mathematical"],
    ["vectorEffect", "vector-effect"],
    ["vertAdvY", "vert-adv-y"],
    ["vertOriginX", "vert-origin-x"],
    ["vertOriginY", "vert-origin-y"],
    ["wordSpacing", "word-spacing"],
    ["writingMode", "writing-mode"],
    ["xmlnsXlink", "xmlns:xlink"],
    ["xHeight", "x-height"]
  ]), fS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function _s(t) {
    return fS.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function pl() {
  }
  var zf = null;
  function Cf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Bu = null, Hu = null;
  function Rm(t) {
    var e = ji(t);
    if (e && (t = e.stateNode)) {
      var n = t[Be] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Af(
            t,
            n.value,
            n.defaultValue,
            n.defaultValue,
            n.checked,
            n.defaultChecked,
            n.type,
            n.name
          ), e = n.name, n.type === "radio" && e != null) {
            for (n = t; n.parentNode; ) n = n.parentNode;
            for (n = n.querySelectorAll(
              'input[name="' + Qi(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var i = n[e];
              if (i !== t && i.form === t.form) {
                var r = i[Be] || null;
                if (!r) throw Error(a(90));
                Af(
                  i,
                  r.value,
                  r.defaultValue,
                  r.defaultValue,
                  r.checked,
                  r.defaultChecked,
                  r.type,
                  r.name
                );
              }
            }
            for (e = 0; e < n.length; e++)
              i = n[e], i.form === t.form && Em(i);
          }
          break t;
        case "textarea":
          Mm(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Nu(t, !!n.multiple, e, !1);
      }
    }
  }
  var Df = !1;
  function zm(t, e, n) {
    if (Df) return t(e, n);
    Df = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Df = !1, (Bu !== null || Hu !== null) && (_c(), Bu && (e = Bu, t = Hu, Hu = Bu = null, Rm(e), t)))
        for (e = 0; e < t.length; e++) Rm(t[e]);
    }
  }
  function Vr(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[Be] || null;
    if (i === null) return null;
    n = i[e];
    t: switch (e) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (i = !i.disabled) || (t = t.type, i = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !i;
        break t;
      default:
        t = !1;
    }
    if (t) return null;
    if (n && typeof n != "function")
      throw Error(
        a(231, e, typeof n)
      );
    return n;
  }
  var Bl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Nf = !1;
  if (Bl)
    try {
      var Gr = {};
      Object.defineProperty(Gr, "passive", {
        get: function() {
          Nf = !0;
        }
      }), window.addEventListener("test", Gr, Gr), window.removeEventListener("test", Gr, Gr);
    } catch {
      Nf = !1;
    }
  var ea = null, Uf = null, ys = null;
  function Cm() {
    if (ys) return ys;
    var t, e = Uf, n = e.length, i, r = "value" in ea ? ea.value : ea.textContent, s = r.length;
    for (t = 0; t < n && e[t] === r[t]; t++) ;
    var m = n - t;
    for (i = 1; i <= m && e[n - i] === r[s - i]; i++) ;
    return ys = r.slice(t, 1 < i ? 1 - i : void 0);
  }
  function Ss(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function bs() {
    return !0;
  }
  function Dm() {
    return !1;
  }
  function Zn(t) {
    function e(n, i, r, s, m) {
      this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = s, this.target = m, this.currentTarget = null;
      for (var y in t)
        t.hasOwnProperty(y) && (n = t[y], this[y] = n ? n(s) : s[y]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? bs : Dm, this.isPropagationStopped = Dm, this;
    }
    return D(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = bs);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = bs);
      },
      persist: function() {
      },
      isPersistent: bs
    }), e;
  }
  var na = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ts = Zn(na), jr = D({}, na, { view: 0, detail: 0 }), hS = Zn(jr), Bf, Hf, Qr, Es = D({}, jr, {
    screenX: 0,
    screenY: 0,
    clientX: 0,
    clientY: 0,
    pageX: 0,
    pageY: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    getModifierState: Yf,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Qr && (Qr && t.type === "mousemove" ? (Bf = t.screenX - Qr.screenX, Hf = t.screenY - Qr.screenY) : Hf = Bf = 0, Qr = t), Bf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Hf;
    }
  }), Nm = Zn(Es), dS = D({}, Es, { dataTransfer: 0 }), mS = Zn(dS), gS = D({}, jr, { relatedTarget: 0 }), Lf = Zn(gS), pS = D({}, na, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), vS = Zn(pS), _S = D({}, na, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), yS = Zn(_S), SS = D({}, na, { data: 0 }), Um = Zn(SS), bS = {
    Esc: "Escape",
    Spacebar: " ",
    Left: "ArrowLeft",
    Up: "ArrowUp",
    Right: "ArrowRight",
    Down: "ArrowDown",
    Del: "Delete",
    Win: "OS",
    Menu: "ContextMenu",
    Apps: "ContextMenu",
    Scroll: "ScrollLock",
    MozPrintableKey: "Unidentified"
  }, TS = {
    8: "Backspace",
    9: "Tab",
    12: "Clear",
    13: "Enter",
    16: "Shift",
    17: "Control",
    18: "Alt",
    19: "Pause",
    20: "CapsLock",
    27: "Escape",
    32: " ",
    33: "PageUp",
    34: "PageDown",
    35: "End",
    36: "Home",
    37: "ArrowLeft",
    38: "ArrowUp",
    39: "ArrowRight",
    40: "ArrowDown",
    45: "Insert",
    46: "Delete",
    112: "F1",
    113: "F2",
    114: "F3",
    115: "F4",
    116: "F5",
    117: "F6",
    118: "F7",
    119: "F8",
    120: "F9",
    121: "F10",
    122: "F11",
    123: "F12",
    144: "NumLock",
    145: "ScrollLock",
    224: "Meta"
  }, ES = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function xS(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = ES[t]) ? !!e[t] : !1;
  }
  function Yf() {
    return xS;
  }
  var MS = D({}, jr, {
    key: function(t) {
      if (t.key) {
        var e = bS[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = Ss(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? TS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Yf,
    charCode: function(t) {
      return t.type === "keypress" ? Ss(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? Ss(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), wS = Zn(MS), AS = D({}, Es, {
    pointerId: 0,
    width: 0,
    height: 0,
    pressure: 0,
    tangentialPressure: 0,
    tiltX: 0,
    tiltY: 0,
    twist: 0,
    pointerType: 0,
    isPrimary: 0
  }), Bm = Zn(AS), OS = D({}, na, { submitter: 0 }), RS = Zn(OS), zS = D({}, jr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yf
  }), CS = Zn(zS), DS = D({}, na, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), NS = Zn(DS), US = D({}, Es, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), BS = Zn(US), HS = D({}, na, {
    newState: 0,
    oldState: 0,
    source: 0
  }), LS = Zn(HS), YS = [9, 13, 27, 32], qf = Bl && "CompositionEvent" in window, Zr = null;
  Bl && "documentMode" in document && (Zr = document.documentMode);
  var qS = Bl && "TextEvent" in window && !Zr, Hm = Bl && (!qf || Zr && 8 < Zr && 11 >= Zr), Lm = " ", Ym = !1;
  function qm(t, e) {
    switch (t) {
      case "keyup":
        return YS.indexOf(e.keyCode) !== -1;
      case "keydown":
        return e.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Xm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Lu = !1;
  function XS(t, e) {
    switch (t) {
      case "compositionend":
        return Xm(e);
      case "keypress":
        return e.which !== 32 ? null : (Ym = !0, Lm);
      case "textInput":
        return t = e.data, t === Lm && Ym ? null : t;
      default:
        return null;
    }
  }
  function VS(t, e) {
    if (Lu)
      return t === "compositionend" || !qf && qm(t, e) ? (t = Cm(), ys = Uf = ea = null, Lu = !1, t) : null;
    switch (t) {
      case "paste":
        return null;
      case "keypress":
        if (!(e.ctrlKey || e.altKey || e.metaKey) || e.ctrlKey && e.altKey) {
          if (e.char && 1 < e.char.length)
            return e.char;
          if (e.which) return String.fromCharCode(e.which);
        }
        return null;
      case "compositionend":
        return Hm && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var GS = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0
  };
  function Vm(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!GS[t.type] : e === "textarea";
  }
  function Gm(t, e, n, i) {
    Bu ? Hu ? Hu.push(i) : Hu = [i] : Bu = i, e = xc(e, "onChange"), 0 < e.length && (n = new Ts(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var Kr = null, Fr = null;
  function jS(t) {
    Rv(t, 0);
  }
  function xs(t) {
    var e = Qa(t);
    if (Em(e)) return t;
  }
  function jm(t, e) {
    if (t === "change") return e;
  }
  var Qm = !1;
  if (Bl) {
    var Xf;
    if (Bl) {
      var Vf = "oninput" in document;
      if (!Vf) {
        var Zm = document.createElement("div");
        Zm.setAttribute("oninput", "return;"), Vf = typeof Zm.oninput == "function";
      }
      Xf = Vf;
    } else Xf = !1;
    Qm = Xf && (!document.documentMode || 9 < document.documentMode);
  }
  function Km() {
    Kr && (Kr.detachEvent("onpropertychange", Fm), Fr = Kr = null);
  }
  function Fm(t) {
    if (t.propertyName === "value" && xs(Fr)) {
      var e = [];
      Gm(
        e,
        Fr,
        t,
        Cf(t)
      ), zm(jS, e);
    }
  }
  function QS(t, e, n) {
    t === "focusin" ? (Km(), Kr = e, Fr = n, Kr.attachEvent("onpropertychange", Fm)) : t === "focusout" && Km();
  }
  function ZS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return xs(Fr);
  }
  function KS(t, e) {
    if (t === "click") return xs(e);
  }
  function FS(t, e) {
    if (t === "input" || t === "change")
      return xs(e);
  }
  function JS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Si = typeof Object.is == "function" ? Object.is : JS;
  function Jr(t, e) {
    if (Si(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var r = n[i];
      if (!He.call(e, r) || !Si(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  function Gf(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Jm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function km(t, e) {
    var n = Jm(t);
    t = 0;
    for (var i; n; ) {
      if (n.nodeType === 3) {
        if (i = t + n.textContent.length, t <= e && i >= e)
          return { node: n, offset: e - t };
        t = i;
      }
      t: {
        for (; n; ) {
          if (n.nextSibling) {
            n = n.nextSibling;
            break t;
          }
          n = n.parentNode;
        }
        n = void 0;
      }
      n = Jm(n);
    }
  }
  function Pm(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Pm(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function $m(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Gf(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Gf(t.document);
    }
    return e;
  }
  function jf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var kS = Bl && "documentMode" in document && 11 >= document.documentMode, Yu = null, Qf = null, kr = null, Zf = !1;
  function Wm(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Zf || Yu == null || Yu !== Gf(i) || (i = Yu, "selectionStart" in i && jf(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), kr && Jr(kr, i) || (kr = i, i = xc(Qf, "onSelect"), 0 < i.length && (e = new Ts(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = Yu)));
  }
  function Ka(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var qu = {
    animationend: Ka("Animation", "AnimationEnd"),
    animationiteration: Ka("Animation", "AnimationIteration"),
    animationstart: Ka("Animation", "AnimationStart"),
    transitionrun: Ka("Transition", "TransitionRun"),
    transitionstart: Ka("Transition", "TransitionStart"),
    transitioncancel: Ka("Transition", "TransitionCancel"),
    transitionend: Ka("Transition", "TransitionEnd")
  }, Kf = {}, Im = {};
  Bl && (Im = document.createElement("div").style, "AnimationEvent" in window || (delete qu.animationend.animation, delete qu.animationiteration.animation, delete qu.animationstart.animation), "TransitionEvent" in window || delete qu.transitionend.transition);
  function Fa(t) {
    if (Kf[t]) return Kf[t];
    if (!qu[t]) return t;
    var e = qu[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Im)
        return Kf[t] = e[n];
    return t;
  }
  var tg = Fa("animationend"), eg = Fa("animationiteration"), ng = Fa("animationstart"), PS = Fa("transitionrun"), $S = Fa("transitionstart"), WS = Fa("transitioncancel"), ig = Fa("transitionend"), lg = /* @__PURE__ */ new Map(), Ff = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ff.push("scrollEnd");
  function ul(t, e) {
    lg.set(t, e), Za(e, [t]);
  }
  var IS = 0;
  function Hl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = cl.identifierPrefix;
    var n = IS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function ag(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = ar;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var r = t[n[i]];
        if (r != null) {
          if (r === "none") return "none";
          e = e == null ? r : e + (" " + r);
        }
      }
    return e ?? t.default;
  }
  function Ll(t, e) {
    return t = ag(t), e = ag(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Ms = typeof reportError == "function" ? reportError : function(t) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var e = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof t == "object" && t !== null && typeof t.message == "string" ? String(t.message) : String(t),
        error: t
      });
      if (!window.dispatchEvent(e)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", t);
      return;
    }
    console.error(t);
  }, Zi = [], Xu = 0, Jf = 0;
  function ws() {
    for (var t = Xu, e = Jf = Xu = 0; e < t; ) {
      var n = Zi[e];
      Zi[e++] = null;
      var i = Zi[e];
      Zi[e++] = null;
      var r = Zi[e];
      Zi[e++] = null;
      var s = Zi[e];
      if (Zi[e++] = null, i !== null && r !== null) {
        var m = i.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), i.pending = r;
      }
      s !== 0 && ug(n, r, s);
    }
  }
  function As(t, e, n, i) {
    Zi[Xu++] = t, Zi[Xu++] = e, Zi[Xu++] = n, Zi[Xu++] = i, Jf |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function kf(t, e, n, i) {
    return As(t, e, n, i), Os(t);
  }
  function Ja(t, e) {
    return As(t, null, null, e), Os(t);
  }
  function ug(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var r = !1, s = t.return; s !== null; )
      s.childLanes |= n, i = s.alternate, i !== null && (i.childLanes |= n), s.tag === 22 && (t = s.stateNode, t === null || t._visibility & 1 || (r = !0)), t = s, s = s.return;
    return t.tag === 3 ? (s = t.stateNode, r && e !== null && (r = 31 - it(n), t = s.hiddenUpdates, i = t[r], i === null ? t[r] = [e] : i.push(e), e.lane = n | 536870912), s) : null;
  }
  function Os(t) {
    if (50 < _o)
      throw _o = 0, vc = null, Error(a(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Vu = {};
  function t2(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function li(t, e, n, i) {
    return new t2(t, e, n, i);
  }
  function Pf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Yl(t, e) {
    var n = t.alternate;
    return n === null ? (n = li(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function rg(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Rs(t, e, n, i, r, s) {
    var m = 0;
    if (i = t, typeof i == "function") Pf(i) && (m = 1);
    else if (typeof i == "string")
      m = Ob(
        t,
        n,
        pt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (i) {
        case Et:
          return t = li(31, n, e, r), t.elementType = Et, t.lanes = s, t;
        case ut:
          return ka(n.children, r, s, e);
        case lt:
          m = 8, r |= 24;
          break;
        case St:
          return t = li(12, n, e, r | 2), t.elementType = St, t.lanes = s, t;
        case P:
          return t = li(13, n, e, r), t.elementType = P, t.lanes = s, t;
        case I:
          return t = li(19, n, e, r), t.elementType = I, t.lanes = s, t;
        case z:
        case E:
          return t = r | 32, t = li(30, n, e, t), t.elementType = E, t.lanes = s, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case et:
                m = 10;
                break t;
              case Mt:
                m = 9;
                break t;
              case F:
                m = 11;
                break t;
              case st:
                m = 14;
                break t;
              case A:
                m = 16, i = null;
                break t;
            }
          m = 29, n = Error(
            a(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = li(m, n, e, r), e.elementType = t, e.type = i, e.lanes = s, e;
  }
  function ka(t, e, n, i) {
    return t = li(7, t, i, e), t.lanes = n, t;
  }
  function $f(t, e, n) {
    return t = li(6, t, null, e), t.lanes = n, t;
  }
  function og(t) {
    var e = li(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Wf(t, e, n) {
    return e = li(
      4,
      t.children !== null ? t.children : [],
      t.key,
      e
    ), e.lanes = n, e.stateNode = {
      containerInfo: t.containerInfo,
      pendingChildren: null,
      implementation: t.implementation
    }, e;
  }
  var sg = /* @__PURE__ */ new WeakMap();
  function Ki(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = sg.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Yi(e)
      }, sg.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Yi(e)
    };
  }
  var Gu = [], ju = 0, zs = null, Pr = 0, Fi = [], Ji = 0, ia = null, vl = 1, _l = "";
  function ql(t, e) {
    Gu[ju++] = Pr, Gu[ju++] = zs, zs = t, Pr = e;
  }
  function cg(t, e, n) {
    Fi[Ji++] = vl, Fi[Ji++] = _l, Fi[Ji++] = ia, ia = t;
    var i = vl;
    t = _l;
    var r = 32 - it(i) - 1;
    i &= ~(1 << r), n += 1;
    var s = 32 - it(e) + r;
    if (30 < s) {
      var m = r - r % 5;
      s = (i & (1 << m) - 1).toString(32), i >>= m, r -= m, vl = 1 << 32 - it(e) + r | n << r | i, _l = s + t;
    } else
      vl = 1 << s | n << r | i, _l = t;
  }
  function Cs(t) {
    t.return !== null && (ql(t, 1), cg(t, 1, 0));
  }
  function If(t) {
    for (; t === zs; )
      zs = Gu[--ju], Gu[ju] = null, Pr = Gu[--ju], Gu[ju] = null;
    for (; t === ia; )
      ia = Fi[--Ji], Fi[Ji] = null, _l = Fi[--Ji], Fi[Ji] = null, vl = Fi[--Ji], Fi[Ji] = null;
  }
  function fg(t, e) {
    Fi[Ji++] = vl, Fi[Ji++] = _l, Fi[Ji++] = ia, vl = e.id, _l = e.overflow, ia = t;
  }
  var Sn = null, ze = null, $t = !1, la = null, ki = !1, th = Error(a(519));
  function aa(t) {
    var e = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $r(Ki(e, t)), th;
  }
  function hg(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[Ye] = t, e[Be] = i, n) {
      case "dialog":
        le("cancel", e), le("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        le("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < So.length; n++)
          le(So[n], e);
        break;
      case "source":
        le("error", e);
        break;
      case "img":
      case "image":
      case "link":
        le("error", e), le("load", e);
        break;
      case "details":
        le("toggle", e);
        break;
      case "input":
        le("invalid", e), xm(
          e,
          i.value,
          i.defaultValue,
          i.checked,
          i.defaultChecked,
          i.type,
          i.name,
          !0
        );
        break;
      case "select":
        le("invalid", e);
        break;
      case "textarea":
        le("invalid", e), wm(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || Nv(e.textContent, n) ? (i.popover != null && (le("beforetoggle", e), le("toggle", e)), i.onScroll != null && le("scroll", e), i.onScrollEnd != null && le("scrollend", e), i.onClick != null && (e.onclick = pl), e = !0) : e = !1, e || aa(t, !0);
  }
  function Ds(t) {
    for (Sn = t.return; Sn; )
      switch (Sn.tag) {
        case 5:
        case 31:
        case 13:
          ki = !1;
          return;
        case 27:
        case 3:
          ki = !0;
          return;
        default:
          Sn = Sn.return;
      }
  }
  function Qu(t) {
    if (t !== Sn) return !1;
    if (!$t) return Ds(t), $t = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || zd(t.type, t.memoizedProps)), n = !n), n && ze && aa(t), Ds(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      ze = Wv(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      ze = Wv(t);
    } else
      e === 27 ? (e = ze, ba(t.type) ? (t = qd, qd = null, ze = t) : ze = e) : ze = Sn ? $i(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Pa() {
    ze = Sn = null, $t = !1;
  }
  function eh() {
    var t = la;
    return t !== null && (ri === null ? ri = t : ri.push.apply(
      ri,
      t
    ), la = null), t;
  }
  function $r(t) {
    la === null ? la = [t] : la.push(t);
  }
  var nh = Yt(null), $a = null, Xl = null;
  function ua(t, e, n) {
    nt(nh, e._currentValue), e._currentValue = n;
  }
  function Vl(t) {
    t._currentValue = nh.current, B(nh);
  }
  function Ns(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function ih(t, e, n, i) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var s = r.dependencies;
      if (s !== null) {
        var m = r.child;
        s = s.firstContext;
        t: for (; s !== null; ) {
          var y = s;
          s = r;
          for (var x = 0; x < e.length; x++)
            if (y.context === e[x]) {
              s.lanes |= n, y = s.alternate, y !== null && (y.lanes |= n), Ns(
                s.return,
                n,
                t
              ), i || (m = null);
              break t;
            }
          s = y.next;
        }
      } else if (r.tag === 18) {
        if (m = r.return, m === null) throw Error(a(341));
        m.lanes |= n, s = m.alternate, s !== null && (s.lanes |= n), Ns(m, n, t), m = null;
      } else
        r.tag === 13 && r.memoizedState !== null && r.memoizedState.dehydrated === null ? (r.lanes |= n, m = r.alternate, m !== null && (m.lanes |= n), Ns(
          r.return,
          n,
          t
        ), m = r.child, m = m !== null ? m.sibling : null) : m = r.child;
      if (m !== null) m.return = r;
      else
        for (m = r; m !== null; ) {
          if (m === t) {
            m = null;
            break;
          }
          if (r = m.sibling, r !== null) {
            r.return = m.return, m = r;
            break;
          }
          m = m.return;
        }
      r = m;
    }
  }
  function Wa(t, e, n, i) {
    t = null;
    for (var r = e, s = !1; r !== null; ) {
      if (!s) {
        if ((r.flags & 524288) !== 0) s = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var m = r.alternate;
        if (m === null) throw Error(a(387));
        if (m = m.memoizedProps, m !== null) {
          var y = r.type;
          Si(r.pendingProps.value, m.value) || (t !== null ? t.push(y) : t = [y]);
        }
      } else if (r === jt.current) {
        if (m = r.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(gr) : t = [gr]);
      }
      r = r.return;
    }
    return t !== null && ih(
      e,
      t,
      n,
      i
    ), e.flags |= 262144, t !== null;
  }
  function Us(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Si(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ia(t) {
    $a = t, Xl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function An(t) {
    return dg($a, t);
  }
  function Bs(t, e) {
    return $a === null && Ia(t), dg(t, e);
  }
  function dg(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Xl === null) {
      if (t === null) throw Error(a(308));
      Xl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Xl = Xl.next = e;
    return n;
  }
  var e2 = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, i) {
        t.push(i);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, n2 = f.unstable_scheduleCallback, i2 = f.unstable_NormalPriority, rn = {
    $$typeof: et,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function lh() {
    return {
      controller: new e2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wr(t) {
    t.refCount--, t.refCount === 0 && n2(i2, function() {
      t.controller.abort();
    });
  }
  function mg(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var i = e[t];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var Ir = null;
  function l2(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var to = null, ah = 0, tu = 0, Zu = null;
  function a2(t, e) {
    if (to === null) {
      var n = to = [];
      ah = 0, tu = bd(), Zu = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return ah++, e.then(gg, gg), e;
  }
  function gg() {
    if (--ah === 0 && (Ir = null, to !== null)) {
      Zu !== null && (Zu.status = "fulfilled");
      var t = to;
      to = null, tu = 0, Zu = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function u2(t, e) {
    var n = [], i = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        n.push(r);
      }
    };
    return t.then(
      function() {
        i.status = "fulfilled", i.value = e;
        for (var r = 0; r < n.length; r++) (0, n[r])(e);
      },
      function(r) {
        for (i.status = "rejected", i.reason = r, r = 0; r < n.length; r++)
          (0, n[r])(void 0);
      }
    ), i;
  }
  var pg = ot.S;
  ot.S = function(t, e) {
    if (ov = qt(), typeof e == "object" && e !== null && typeof e.then == "function" && a2(t, e), Ir !== null)
      for (var n = sr; n !== null; )
        mg(n, Ir), n = n.next;
    if (n = t.types, n !== null) {
      for (var i = sr; i !== null; )
        mg(i, n), i = i.next;
      if (tu !== 0) {
        i = Ir, i === null && (i = Ir = []);
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          i.indexOf(s) === -1 && i.push(s);
        }
      }
    }
    pg !== null && pg(t, e);
  };
  var eu = Yt(null);
  function uh() {
    var t = eu.current;
    return t !== null ? t : Ae.pooledCache;
  }
  function Hs(t, e) {
    e === null ? nt(eu, eu.current) : nt(eu, e.pool);
  }
  function vg() {
    var t = uh();
    return t === null ? null : { parent: rn._currentValue, pool: t };
  }
  var Ku = Error(a(460)), rh = Error(a(474)), Ls = Error(a(542)), Ys = { then: function() {
  } };
  function _g(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function yg(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(pl, pl), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, bg(t), t === void 0 && !("reason" in e) ? Error(a(600)) : t;
      default:
        if (typeof e.status == "string") e.then(pl, pl);
        else {
          if (t = Ae, t !== null && 100 < t.shellSuspendCounter)
            throw Error(a(482));
          t = e, t.status = "pending", t.then(
            function(i) {
              if (e.status === "pending") {
                var r = e;
                r.status = "fulfilled", r.value = i;
              }
            },
            function(i) {
              if (e.status === "pending") {
                var r = e;
                r.status = "rejected", r.reason = i;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, bg(t), t;
        }
        throw iu = e, Ku;
    }
  }
  function nu(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (iu = n, Ku) : n;
    }
  }
  var iu = null;
  function Sg() {
    if (iu === null) throw Error(a(459));
    var t = iu;
    return iu = null, t;
  }
  function bg(t) {
    if (t === Ku || t === Ls)
      throw Error(a(483));
  }
  var Fu = null, eo = 0;
  function qs(t) {
    var e = eo;
    return eo += 1, Fu === null && (Fu = []), yg(Fu, t, e);
  }
  function ra(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Xs(t, e) {
    throw e.$$typeof === Z ? Error(a(525)) : (t = Object.prototype.toString.call(e), Error(
      a(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Tg(t) {
    function e(N, O) {
      if (t) {
        var H = N.deletions;
        H === null ? (N.deletions = [O], N.flags |= 16) : H.push(O);
      }
    }
    function n(N, O) {
      if (!t) return null;
      for (; O !== null; )
        e(N, O), O = O.sibling;
      return null;
    }
    function i(N) {
      for (var O = /* @__PURE__ */ new Map(); N !== null; )
        N.key === null ? O.set(N.index, N) : O.set(N.key, N), N = N.sibling;
      return O;
    }
    function r(N, O) {
      return N = Yl(N, O), N.index = 0, N.sibling = null, N;
    }
    function s(N, O, H) {
      return N.index = H, t ? (H = N.alternate, H !== null ? (H = H.index, H < O ? (N.flags |= 2, O) : H) : (N.flags |= 134217730, O)) : (N.flags |= 1048576, O);
    }
    function m(N) {
      return t && N.alternate === null && (N.flags |= 134217730), N;
    }
    function y(N, O, H, W) {
      return O === null || O.tag !== 6 ? (O = $f(H, N.mode, W), O.return = N, O) : (O = r(O, H), O.return = N, O);
    }
    function x(N, O, H, W) {
      var wt = H.type;
      return wt === ut ? (N = j(
        N,
        O,
        H.props.children,
        W,
        H.key
      ), ra(N, H), N) : O !== null && (O.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === A && nu(wt) === O.type) ? (O = r(O, H.props), ra(O, H), O.return = N, O) : (O = Rs(
        H.type,
        H.key,
        H.props,
        null,
        N.mode,
        W
      ), ra(O, H), O.return = N, O);
    }
    function U(N, O, H, W) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== H.containerInfo || O.stateNode.implementation !== H.implementation ? (O = Wf(H, N.mode, W), O.return = N, O) : (O = r(O, H.children || []), O.return = N, O);
    }
    function j(N, O, H, W, wt) {
      return O === null || O.tag !== 7 ? (O = ka(
        H,
        N.mode,
        W,
        wt
      ), O.return = N, O) : (O = r(O, H), O.return = N, O);
    }
    function tt(N, O, H) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return O = $f(
          "" + O,
          N.mode,
          H
        ), O.return = N, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case $:
            return H = Rs(
              O.type,
              O.key,
              O.props,
              null,
              N.mode,
              H
            ), ra(H, O), H.return = N, H;
          case G:
            return O = Wf(
              O,
              N.mode,
              H
            ), O.return = N, O;
          case A:
            return O = nu(O), tt(N, O, H);
        }
        if (Rt(O) || L(O))
          return O = ka(
            O,
            N.mode,
            H,
            null
          ), O.return = N, O;
        if (typeof O.then == "function")
          return tt(N, qs(O), H);
        if (O.$$typeof === et)
          return tt(
            N,
            Bs(N, O),
            H
          );
        Xs(N, O);
      }
      return null;
    }
    function C(N, O, H, W) {
      var wt = O !== null ? O.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return wt !== null ? null : y(N, O, "" + H, W);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case $:
            return H.key === wt ? x(N, O, H, W) : null;
          case G:
            return H.key === wt ? U(N, O, H, W) : null;
          case A:
            return H = nu(H), C(N, O, H, W);
        }
        if (Rt(H) || L(H))
          return wt !== null ? null : j(N, O, H, W, null);
        if (typeof H.then == "function")
          return C(
            N,
            O,
            qs(H),
            W
          );
        if (H.$$typeof === et)
          return C(
            N,
            O,
            Bs(N, H),
            W
          );
        Xs(N, H);
      }
      return null;
    }
    function q(N, O, H, W, wt) {
      if (typeof W == "string" && W !== "" || typeof W == "number" || typeof W == "bigint")
        return N = N.get(H) || null, y(O, N, "" + W, wt);
      if (typeof W == "object" && W !== null) {
        switch (W.$$typeof) {
          case $:
            return N = N.get(
              W.key === null ? H : W.key
            ) || null, x(O, N, W, wt);
          case G:
            return N = N.get(
              W.key === null ? H : W.key
            ) || null, U(O, N, W, wt);
          case A:
            return W = nu(W), q(
              N,
              O,
              H,
              W,
              wt
            );
        }
        if (Rt(W) || L(W))
          return N = N.get(H) || null, j(O, N, W, wt, null);
        if (typeof W.then == "function")
          return q(
            N,
            O,
            H,
            qs(W),
            wt
          );
        if (W.$$typeof === et)
          return q(
            N,
            O,
            H,
            Bs(O, W),
            wt
          );
        Xs(O, W);
      }
      return null;
    }
    function _t(N, O, H, W) {
      for (var wt = null, oe = null, Bt = O, Gt = O = 0, cn = null; Bt !== null && Gt < H.length; Gt++) {
        Bt.index > Gt ? (cn = Bt, Bt = null) : cn = Bt.sibling;
        var fe = C(
          N,
          Bt,
          H[Gt],
          W
        );
        if (fe === null) {
          Bt === null && (Bt = cn);
          break;
        }
        t && Bt && fe.alternate === null && e(N, Bt), O = s(fe, O, Gt), oe === null ? wt = fe : oe.sibling = fe, oe = fe, Bt = cn;
      }
      if (Gt === H.length)
        return n(N, Bt), $t && ql(N, Gt), wt;
      if (Bt === null) {
        for (; Gt < H.length; Gt++)
          Bt = tt(N, H[Gt], W), Bt !== null && (O = s(
            Bt,
            O,
            Gt
          ), oe === null ? wt = Bt : oe.sibling = Bt, oe = Bt);
        return $t && ql(N, Gt), wt;
      }
      for (Bt = i(Bt); Gt < H.length; Gt++)
        cn = q(
          Bt,
          N,
          Gt,
          H[Gt],
          W
        ), cn !== null && (t && (fe = cn.alternate, fe !== null && Bt.delete(fe.key === null ? Gt : fe.key)), O = s(
          cn,
          O,
          Gt
        ), oe === null ? wt = cn : oe.sibling = cn, oe = cn);
      return t && Bt.forEach(function(wa) {
        return e(N, wa);
      }), $t && ql(N, Gt), wt;
    }
    function Dt(N, O, H, W) {
      if (H == null) throw Error(a(151));
      for (var wt = null, oe = null, Bt = O, Gt = O = 0, cn = null, fe = H.next(); Bt !== null && !fe.done; Gt++, fe = H.next()) {
        Bt.index > Gt ? (cn = Bt, Bt = null) : cn = Bt.sibling;
        var wa = C(N, Bt, fe.value, W);
        if (wa === null) {
          Bt === null && (Bt = cn);
          break;
        }
        t && Bt && wa.alternate === null && e(N, Bt), O = s(wa, O, Gt), oe === null ? wt = wa : oe.sibling = wa, oe = wa, Bt = cn;
      }
      if (fe.done)
        return n(N, Bt), $t && ql(N, Gt), wt;
      if (Bt === null) {
        for (; !fe.done; Gt++, fe = H.next())
          fe = tt(N, fe.value, W), fe !== null && (O = s(fe, O, Gt), oe === null ? wt = fe : oe.sibling = fe, oe = fe);
        return $t && ql(N, Gt), wt;
      }
      for (Bt = i(Bt); !fe.done; Gt++, fe = H.next())
        fe = q(Bt, N, Gt, fe.value, W), fe !== null && (t && (cn = fe.alternate, cn !== null && Bt.delete(
          cn.key === null ? Gt : cn.key
        )), O = s(fe, O, Gt), oe === null ? wt = fe : oe.sibling = fe, oe = fe);
      return t && Bt.forEach(function(Xb) {
        return e(N, Xb);
      }), $t && ql(N, Gt), wt;
    }
    function Jt(N, O, H, W) {
      if (typeof H == "object" && H !== null && H.type === ut && H.key === null && H.props.ref === void 0 && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case $:
            t: {
              for (var wt = H.key; O !== null; ) {
                if (O.key === wt) {
                  if (wt = H.type, wt === ut) {
                    if (O.tag === 7) {
                      n(
                        N,
                        O.sibling
                      ), W = r(
                        O,
                        H.props.children
                      ), ra(W, H), W.return = N, N = W;
                      break t;
                    }
                  } else if (O.elementType === wt || typeof wt == "object" && wt !== null && wt.$$typeof === A && nu(wt) === O.type) {
                    n(
                      N,
                      O.sibling
                    ), W = r(O, H.props), ra(W, H), W.return = N, N = W;
                    break t;
                  }
                  n(N, O);
                  break;
                } else e(N, O);
                O = O.sibling;
              }
              H.type === ut ? (W = ka(
                H.props.children,
                N.mode,
                W,
                H.key
              ), ra(W, H), W.return = N, N = W) : (W = Rs(
                H.type,
                H.key,
                H.props,
                null,
                N.mode,
                W
              ), ra(W, H), W.return = N, N = W);
            }
            return m(N);
          case G:
            t: {
              for (wt = H.key; O !== null; ) {
                if (O.key === wt)
                  if (O.tag === 4 && O.stateNode.containerInfo === H.containerInfo && O.stateNode.implementation === H.implementation) {
                    n(
                      N,
                      O.sibling
                    ), W = r(O, H.children || []), W.return = N, N = W;
                    break t;
                  } else {
                    n(N, O);
                    break;
                  }
                else e(N, O);
                O = O.sibling;
              }
              W = Wf(H, N.mode, W), W.return = N, N = W;
            }
            return m(N);
          case A:
            return H = nu(H), Jt(
              N,
              O,
              H,
              W
            );
        }
        if (Rt(H))
          return _t(
            N,
            O,
            H,
            W
          );
        if (L(H)) {
          if (wt = L(H), typeof wt != "function") throw Error(a(150));
          return H = wt.call(H), Dt(
            N,
            O,
            H,
            W
          );
        }
        if (typeof H.then == "function")
          return Jt(
            N,
            O,
            qs(H),
            W
          );
        if (H.$$typeof === et)
          return Jt(
            N,
            O,
            Bs(N, H),
            W
          );
        Xs(N, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, O !== null && O.tag === 6 ? (n(N, O.sibling), W = r(O, H), W.return = N, N = W) : (n(N, O), W = $f(H, N.mode, W), W.return = N, N = W), m(N)) : n(N, O);
    }
    return function(N, O, H, W) {
      try {
        eo = 0;
        var wt = Jt(
          N,
          O,
          H,
          W
        );
        return Fu = null, wt;
      } catch (Bt) {
        if (Bt === Ku || Bt === Ls) throw Bt;
        var oe = li(29, Bt, null, N.mode);
        return oe.lanes = W, oe.return = N, oe;
      }
    };
  }
  var lu = Tg(!0), Eg = Tg(!1), oa = !1;
  function oh(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function sh(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function sa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ca(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (ge & 2) !== 0) {
      var r = i.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), i.pending = e, e = Os(t), ug(t, null, n), e;
    }
    return As(t, i, e, n), Os(t);
  }
  function no(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, me(t, n);
    }
  }
  function ch(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var r = null, s = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          s === null ? r = s = m : s = s.next = m, n = n.next;
        } while (n !== null);
        s === null ? r = s = e : s = s.next = e;
      } else r = s = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: s,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var fh = !1;
  function io() {
    if (fh) {
      var t = Zu;
      if (t !== null) throw t;
    }
  }
  function lo(t, e, n, i) {
    fh = !1;
    var r = t.updateQueue;
    oa = !1;
    var s = r.firstBaseUpdate, m = r.lastBaseUpdate, y = r.shared.pending;
    if (y !== null) {
      r.shared.pending = null;
      var x = y, U = x.next;
      x.next = null, m === null ? s = U : m.next = U, m = x;
      var j = t.alternate;
      j !== null && (j = j.updateQueue, y = j.lastBaseUpdate, y !== m && (y === null ? j.firstBaseUpdate = U : y.next = U, j.lastBaseUpdate = x));
    }
    if (s !== null) {
      var tt = r.baseState;
      m = 0, j = U = x = null, y = s;
      do {
        var C = y.lane & -536870913, q = C !== y.lane;
        if (q ? (re & C) === C : (i & C) === C) {
          C !== 0 && C === tu && (fh = !0), j !== null && (j = j.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          t: {
            var _t = t, Dt = y;
            C = e;
            var Jt = n;
            switch (Dt.tag) {
              case 1:
                if (_t = Dt.payload, typeof _t == "function") {
                  tt = _t.call(Jt, tt, C);
                  break t;
                }
                tt = _t;
                break t;
              case 3:
                _t.flags = _t.flags & -65537 | 128;
              case 0:
                if (_t = Dt.payload, C = typeof _t == "function" ? _t.call(Jt, tt, C) : _t, C == null) break t;
                tt = D({}, tt, C);
                break t;
              case 2:
                oa = !0;
            }
          }
          C = y.callback, C !== null && (t.flags |= 64, q && (t.flags |= 8192), q = r.callbacks, q === null ? r.callbacks = [C] : q.push(C));
        } else
          q = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, j === null ? (U = j = q, x = tt) : j = j.next = q, m |= C;
        if (y = y.next, y === null) {
          if (y = r.shared.pending, y === null)
            break;
          q = y, y = q.next, q.next = null, r.lastBaseUpdate = q, r.shared.pending = null;
        }
      } while (!0);
      j === null && (x = tt), r.baseState = x, r.firstBaseUpdate = U, r.lastBaseUpdate = j, s === null && (r.shared.lanes = 0), va |= m, t.lanes = m, t.memoizedState = tt;
    }
  }
  function xg(t, e) {
    if (typeof t != "function")
      throw Error(a(191, t));
    t.call(e);
  }
  function Mg(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        xg(n[t], e);
  }
  var fa = Yt(null), Vs = Yt(0);
  function wg(t, e) {
    t = Kl, nt(Vs, t), nt(fa, e), Kl = t | e.baseLanes;
  }
  function hh() {
    nt(Vs, Kl), nt(fa, fa.current);
  }
  function dh() {
    Kl = Vs.current, B(fa), B(Vs);
  }
  var On = Yt(null), Bn = null;
  function ha(t) {
    var e = t.alternate;
    nt(Rn, Rn.current & 1), nt(On, t), Bn === null && (e === null || fa.current !== null || e.memoizedState !== null) && (Bn = t);
  }
  function mh(t) {
    nt(Rn, Rn.current), nt(On, t), Bn === null && (Bn = t);
  }
  function Ag(t) {
    t.tag === 22 ? (nt(Rn, Rn.current), nt(On, t), Bn === null && (Bn = t)) : da();
  }
  function da() {
    nt(Rn, Rn.current), nt(On, On.current);
  }
  function bi(t) {
    B(On), Bn === t && (Bn = null), B(Rn);
  }
  var Rn = Yt(0);
  function ao(t, e) {
    nt(On, On.current), nt(Rn, e);
  }
  function gh(t) {
    B(Rn), B(On), Bn === t && (Bn = null);
  }
  function Gs(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Ld(n) || Yd(n)))
          return e;
      } else if (e.tag === 19 && e.memoizedProps.revealOrder !== "independent") {
        if ((e.flags & 128) !== 0) return e;
      } else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) return null;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    return null;
  }
  var Gl = 0, Ft = null, Te = null, on = null, js = !1, Ju = !1, au = !1, Qs = 0, uo = 0, ku = null, r2 = 0;
  function $e() {
    throw Error(a(321));
  }
  function ph(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Si(t[n], e[n])) return !1;
    return !0;
  }
  function vh(t, e, n, i, r, s) {
    return Gl = s, Ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, ot.H = t === null || t.memoizedState === null ? cp : fp, au = !1, s = n(i, r), au = !1, Ju && (s = Rg(
      e,
      n,
      i,
      r
    )), Og(t), s;
  }
  function Og(t) {
    ot.H = $s;
    var e = Te !== null && Te.next !== null;
    if (Gl = 0, on = Te = Ft = null, js = !1, uo = 0, ku = null, e) throw Error(a(300));
    t === null || sn || (t = t.dependencies, t !== null && Us(t) && (sn = !0));
  }
  function Rg(t, e, n, i) {
    Ft = t;
    var r = 0;
    do {
      if (Ju && (ku = null), uo = 0, Ju = !1, 25 <= r) throw Error(a(301));
      if (r += 1, on = Te = null, t.updateQueue != null) {
        var s = t.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      ot.H = g2, s = e(n, i);
    } while (Ju);
    return s;
  }
  function o2() {
    var t = ot.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ro(e) : e, t = t.useState()[0], (Te !== null ? Te.memoizedState : null) !== t && (Ft.flags |= 1024), e;
  }
  function _h() {
    var t = Qs !== 0;
    return Qs = 0, t;
  }
  function yh(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Sh(t) {
    if (js) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      js = !1;
    }
    Gl = 0, on = Te = Ft = null, Ju = !1, uo = Qs = 0, ku = null;
  }
  function Kn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return on === null ? Ft.memoizedState = on = t : on = on.next = t, on;
  }
  function ln() {
    if (Te === null) {
      var t = Ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Te.next;
    var e = on === null ? Ft.memoizedState : on.next;
    if (e !== null)
      on = e, Te = t;
    else {
      if (t === null)
        throw Ft.alternate === null ? Error(a(467)) : Error(a(310));
      Te = t, t = {
        memoizedState: Te.memoizedState,
        baseState: Te.baseState,
        baseQueue: Te.baseQueue,
        queue: Te.queue,
        next: null
      }, on === null ? Ft.memoizedState = on = t : on = on.next = t;
    }
    return on;
  }
  function Zs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ro(t) {
    var e = uo;
    return uo += 1, ku === null && (ku = []), t = yg(ku, t, e), e = Ft, (on === null ? e.memoizedState : on.next) === null && (e = e.alternate, ot.H = e === null || e.memoizedState === null ? cp : fp), t;
  }
  function Ks(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ro(t);
      if (t.$$typeof === w) return;
      if (t.$$typeof === et) return An(t);
    }
    throw Error(a(438, String(t)));
  }
  function bh(t) {
    var e = null, n = Ft.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = Ft.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Zs(), Ft.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = Nt;
    return e.index++, n;
  }
  function jl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Fs(t) {
    var e = ln();
    return Th(e, Te, t);
  }
  function Th(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = n;
    var r = t.baseQueue, s = i.pending;
    if (s !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = s.next, s.next = m;
      }
      e.baseQueue = r = s, i.pending = null;
    }
    if (s = t.baseState, r === null) t.memoizedState = s;
    else {
      e = r.next;
      var y = m = null, x = null, U = e, j = !1;
      do {
        var tt = U.lane & -536870913;
        if (tt !== U.lane ? (re & tt) === tt : (Gl & tt) === tt) {
          var C = U.revertLane;
          if (C === 0)
            x !== null && (x = x.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }), tt === tu && (j = !0);
          else if ((Gl & C) === C) {
            U = U.next, C === tu && (j = !0);
            continue;
          } else
            tt = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, x === null ? (y = x = tt, m = s) : x = x.next = tt, Ft.lanes |= C, va |= C;
          tt = U.action, au && n(s, tt), s = U.hasEagerState ? U.eagerState : n(s, tt);
        } else
          C = {
            lane: tt,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, x === null ? (y = x = C, m = s) : x = x.next = C, Ft.lanes |= tt, va |= tt;
        U = U.next;
      } while (U !== null && U !== e);
      if (x === null ? m = s : x.next = y, !Si(s, t.memoizedState) && (sn = !0, j && (n = Zu, n !== null)))
        throw n;
      t.memoizedState = s, t.baseState = m, t.baseQueue = x, i.lastRenderedState = s;
    }
    return r === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function Eh(t) {
    var e = ln(), n = e.queue;
    if (n === null) throw Error(a(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, r = n.pending, s = e.memoizedState;
    if (r !== null) {
      n.pending = null;
      var m = r = r.next;
      do
        s = t(s, m.action), m = m.next;
      while (m !== r);
      Si(s, e.memoizedState) || (sn = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
    }
    return [s, i];
  }
  function zg(t, e, n) {
    var i = Ft, r = ln(), s = $t;
    if (s) {
      if (n === void 0) throw Error(a(407));
      n = n();
    } else n = e();
    var m = !Si(
      (Te || r).memoizedState,
      n
    );
    if (m && (r.memoizedState = n, sn = !0), r = r.queue, wh(Ng.bind(null, i, r, t), [
      t
    ]), t = r.getSnapshot !== e || m || on !== null && (on.memoizedState.tag & 1) !== 0, Pu(
      t ? 9 : 8,
      { destroy: void 0 },
      Dg.bind(null, i, r, n, e),
      null
    ), t) {
      if (i.flags |= 2048, Ae === null) throw Error(a(349));
      s || (Gl & 127) !== 0 || Cg(i, e, n);
    }
    return n;
  }
  function Cg(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Ft.updateQueue, e === null ? (e = Zs(), Ft.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Dg(t, e, n, i) {
    e.value = n, e.getSnapshot = i, Ug(e) && Bg(t);
  }
  function Ng(t, e, n) {
    return n(function() {
      Ug(e) && Bg(t);
    });
  }
  function Ug(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Si(t, n);
    } catch {
      return !0;
    }
  }
  function Bg(t) {
    var e = Ja(t, 2);
    e !== null && oi(e, t, 2);
  }
  function xh(t) {
    var e = Kn();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), au) {
        Tt(!0);
        try {
          n();
        } finally {
          Tt(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: jl,
      lastRenderedState: t
    }, e;
  }
  function Hg(t, e, n, i) {
    return t.baseState = n, Th(
      t,
      Te,
      typeof i == "function" ? i : jl
    );
  }
  function s2(t, e, n, i, r) {
    if (Ps(t)) throw Error(a(485));
    if (t = e.action, t !== null) {
      var s = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          s.listeners.push(m);
        }
      };
      ot.T !== null ? n(!0) : s.isTransition = !1, i(s), n = e.pending, n === null ? (s.next = e.pending = s, Lg(e, s)) : (s.next = n.next, e.pending = n.next = s);
    }
  }
  function Lg(t, e) {
    var n = e.action, i = e.payload, r = t.state;
    if (e.isTransition) {
      var s = ot.T, m = {};
      m.types = s !== null ? s.types : null, ot.T = m;
      try {
        var y = n(r, i), x = ot.S;
        x !== null && x(m, y), Yg(t, e, y);
      } catch (U) {
        Mh(t, e, U);
      } finally {
        s !== null && m.types !== null && (s.types = m.types), ot.T = s;
      }
    } else
      try {
        s = n(r, i), Yg(t, e, s);
      } catch (U) {
        Mh(t, e, U);
      }
  }
  function Yg(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        qg(t, e, i);
      },
      function(i) {
        return Mh(t, e, i);
      }
    ) : qg(t, e, n);
  }
  function qg(t, e, n) {
    e.status = "fulfilled", e.value = n, Xg(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Lg(t, n)));
  }
  function Mh(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, Xg(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function Xg(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Vg(t, e) {
    return e;
  }
  function Gg(t, e) {
    if ($t) {
      var n = Ae.formState;
      if (n !== null) {
        t: {
          var i = Ft;
          if ($t) {
            if (ze) {
              e: {
                for (var r = ze, s = ki; r.nodeType !== 8; ) {
                  if (!s) {
                    r = null;
                    break e;
                  }
                  if (r = $i(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                s = r.data, r = s === "F!" || s === "F" ? r : null;
              }
              if (r) {
                ze = $i(
                  r.nextSibling
                ), i = r.data === "F!";
                break t;
              }
            }
            aa(i);
          }
          i = !1;
        }
        i && (e = n[0]);
      }
    }
    return n = Kn(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Vg,
      lastRenderedState: e
    }, n.queue = i, n = rp.bind(
      null,
      Ft,
      i
    ), i.dispatch = n, i = xh(!1), s = Ch.bind(
      null,
      Ft,
      !1,
      i.queue
    ), i = Kn(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = r, n = s2.bind(
      null,
      Ft,
      r,
      s,
      n
    ), r.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function jg(t) {
    var e = ln();
    return Qg(e, Te, t);
  }
  function Qg(t, e, n) {
    if (e = Th(
      t,
      e,
      Vg
    )[0], t = Fs(jl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = ro(e);
      } catch (m) {
        throw m === Ku ? Ls : m;
      }
    else i = e;
    e = ln();
    var r = e.queue, s = r.dispatch;
    return n !== e.memoizedState && (Ft.flags |= 2048, Pu(
      9,
      { destroy: void 0 },
      c2.bind(null, r, n),
      null
    )), [i, s, t];
  }
  function c2(t, e) {
    t.action = e;
  }
  function Zg(t) {
    var e = ln(), n = Te;
    if (n !== null)
      return Qg(e, n, t);
    ln(), e = e.memoizedState, n = ln();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function Pu(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = Ft.updateQueue, e === null && (e = Zs(), Ft.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function Kg() {
    return ln().memoizedState;
  }
  function Js(t, e, n, i) {
    var r = Kn();
    Ft.flags |= t, r.memoizedState = Pu(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function ks(t, e, n, i) {
    var r = ln();
    i = i === void 0 ? null : i;
    var s = r.memoizedState.inst;
    Te !== null && i !== null && ph(i, Te.memoizedState.deps) ? r.memoizedState = Pu(e, s, n, i) : (Ft.flags |= t, r.memoizedState = Pu(
      1 | e,
      s,
      n,
      i
    ));
  }
  function Fg(t, e) {
    Js(8390656, 8, t, e);
  }
  function wh(t, e) {
    ks(2048, 8, t, e);
  }
  function f2(t) {
    Ft.flags |= 4;
    var e = Ft.updateQueue;
    if (e === null)
      e = Zs(), Ft.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function Jg(t) {
    var e = ln().memoizedState;
    return f2({ ref: e, nextImpl: t }), function() {
      if ((ge & 2) !== 0) throw Error(a(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function kg(t, e) {
    return ks(4, 2, t, e);
  }
  function Pg(t, e) {
    return ks(4, 4, t, e);
  }
  function $g(t, e) {
    if (typeof e == "function") {
      t = t();
      var n = e(t);
      return function() {
        typeof n == "function" ? n() : e(null);
      };
    }
    if (e != null)
      return t = t(), e.current = t, function() {
        e.current = null;
      };
  }
  function Wg(t, e, n) {
    n = n != null ? n.concat([t]) : null, ks(4, 4, $g.bind(null, e, t), n);
  }
  function Ah() {
  }
  function Ig(t, e) {
    var n = ln();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && ph(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function tp(t, e) {
    var n = ln();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && ph(e, i[1]))
      return i[0];
    if (i = t(), au) {
      Tt(!0);
      try {
        t();
      } finally {
        Tt(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function Oh(t, e, n) {
    return n === void 0 || (Gl & 1073741824) !== 0 && (re & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = cv(), Ft.lanes |= t, va |= t, n);
  }
  function ep(t, e, n, i) {
    return Si(n, e) ? n : fa.current !== null ? (t = Oh(t, n, i), Si(t, e) || (sn = !0), t) : (Gl & 106) === 0 || (Gl & 1073741824) !== 0 && (re & 261930) === 0 ? (sn = !0, t.memoizedState = n) : (t = cv(), Ft.lanes |= t, va |= t, e);
  }
  function np(t, e, n, i, r) {
    var s = gt.p;
    gt.p = s !== 0 && 8 > s ? s : 8;
    var m = ot.T, y = {};
    y.types = m !== null ? m.types : null, ot.T = y, Ch(t, !1, e, n);
    try {
      var x = r(), U = ot.S;
      if (U !== null && U(y, x), x !== null && typeof x == "object" && typeof x.then == "function") {
        var j = u2(
          x,
          i
        );
        oo(
          t,
          e,
          j,
          Mi(t)
        );
      } else
        oo(
          t,
          e,
          i,
          Mi(t)
        );
    } catch (tt) {
      oo(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: tt },
        Mi()
      );
    } finally {
      gt.p = s, m !== null && y.types !== null && (m.types = y.types), ot.T = m;
    }
  }
  function h2() {
  }
  function Rh(t, e, n, i) {
    if (t.tag !== 5) throw Error(a(476));
    var r = ip(t).queue;
    np(
      t,
      r,
      e,
      zt,
      n === null ? h2 : function() {
        return lp(t), n(i);
      }
    );
  }
  function ip(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: zt,
      baseState: zt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: zt
      },
      next: null
    };
    var n = {};
    return e.next = {
      memoizedState: n,
      baseState: n,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function lp(t) {
    var e = ip(t);
    e.next === null && (e = t.alternate.memoizedState), oo(
      t,
      e.next.queue,
      {},
      Mi()
    );
  }
  function zh() {
    return An(gr);
  }
  function ap() {
    return ln().memoizedState;
  }
  function up() {
    return ln().memoizedState;
  }
  function d2(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Mi();
          t = sa(n);
          var i = ca(e, t, n);
          i !== null && (oi(i, e, n), no(i, e, n)), e = { cache: lh() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function m2(t, e, n) {
    var i = Mi();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ps(t) ? op(e, n) : (n = kf(t, e, n, i), n !== null && (oi(n, t, i), sp(n, e, i)));
  }
  function rp(t, e, n) {
    var i = Mi();
    oo(t, e, n, i);
  }
  function oo(t, e, n, i) {
    var r = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ps(t)) op(e, r);
    else {
      var s = t.alternate;
      if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null))
        try {
          var m = e.lastRenderedState, y = s(m, n);
          if (r.hasEagerState = !0, r.eagerState = y, Si(y, m))
            return As(t, e, r, 0), Ae === null && ws(), !1;
        } catch {
        }
      if (n = kf(t, e, r, i), n !== null)
        return oi(n, t, i), sp(n, e, i), !0;
    }
    return !1;
  }
  function Ch(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: bd(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ps(t)) {
      if (e) throw Error(a(479));
    } else
      e = kf(
        t,
        n,
        i,
        2
      ), e !== null && oi(e, t, 2);
  }
  function Ps(t) {
    var e = t.alternate;
    return t === Ft || e !== null && e === Ft;
  }
  function op(t, e) {
    Ju = js = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function sp(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, me(t, n);
    }
  }
  var $s = {
    readContext: An,
    use: Ks,
    useCallback: $e,
    useContext: $e,
    useEffect: $e,
    useImperativeHandle: $e,
    useLayoutEffect: $e,
    useInsertionEffect: $e,
    useMemo: $e,
    useReducer: $e,
    useRef: $e,
    useState: $e,
    useDebugValue: $e,
    useDeferredValue: $e,
    useTransition: $e,
    useSyncExternalStore: $e,
    useId: $e,
    useHostTransitionStatus: $e,
    useFormState: $e,
    useActionState: $e,
    useOptimistic: $e,
    useMemoCache: $e,
    useCacheRefresh: $e,
    useEffectEvent: $e
  }, cp = {
    readContext: An,
    use: Ks,
    useCallback: function(t, e) {
      return Kn().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: An,
    useEffect: Fg,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Js(
        4194308,
        4,
        $g.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Js(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Js(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Kn();
      e = e === void 0 ? null : e;
      var i = t();
      if (au) {
        Tt(!0);
        try {
          t();
        } finally {
          Tt(!1);
        }
      }
      return n.memoizedState = [i, e], i;
    },
    useReducer: function(t, e, n) {
      var i = Kn();
      if (n !== void 0) {
        var r = n(e);
        if (au) {
          Tt(!0);
          try {
            n(e);
          } finally {
            Tt(!1);
          }
        }
      } else r = e;
      return i.memoizedState = i.baseState = r, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: r
      }, i.queue = t, t = t.dispatch = m2.bind(
        null,
        Ft,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = Kn();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = xh(t);
      var e = t.queue, n = rp.bind(null, Ft, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Ah,
    useDeferredValue: function(t, e) {
      var n = Kn();
      return Oh(n, t, e);
    },
    useTransition: function() {
      var t = xh(!1);
      return t = np.bind(
        null,
        Ft,
        t.queue,
        !0,
        !1
      ), Kn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = Ft, r = Kn();
      if ($t) {
        if (n === void 0)
          throw Error(a(407));
        n = n();
      } else {
        if (n = e(), Ae === null)
          throw Error(a(349));
        (re & 127) !== 0 || Cg(i, e, n);
      }
      r.memoizedState = n;
      var s = { value: n, getSnapshot: e };
      return r.queue = s, Fg(Ng.bind(null, i, s, t), [
        t
      ]), i.flags |= 2048, Pu(
        9,
        { destroy: void 0 },
        Dg.bind(
          null,
          i,
          s,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Kn(), e = Ae.identifierPrefix;
      if ($t) {
        var n = _l, i = vl;
        n = (i & ~(1 << 32 - it(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Qs++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = r2++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: zh,
    useFormState: Gg,
    useActionState: Gg,
    useOptimistic: function(t) {
      var e = Kn();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Ch.bind(
        null,
        Ft,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: bh,
    useCacheRefresh: function() {
      return Kn().memoizedState = d2.bind(
        null,
        Ft
      );
    },
    useEffectEvent: function(t) {
      var e = Kn(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((ge & 2) !== 0)
          throw Error(a(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, fp = {
    readContext: An,
    use: Ks,
    useCallback: Ig,
    useContext: An,
    useEffect: wh,
    useImperativeHandle: Wg,
    useInsertionEffect: kg,
    useLayoutEffect: Pg,
    useMemo: tp,
    useReducer: Fs,
    useRef: Kg,
    useState: function() {
      return Fs(jl);
    },
    useDebugValue: Ah,
    useDeferredValue: function(t, e) {
      var n = ln();
      return ep(
        n,
        Te.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Fs(jl)[0], e = ln().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: zg,
    useId: ap,
    useHostTransitionStatus: zh,
    useFormState: jg,
    useActionState: jg,
    useOptimistic: function(t, e) {
      var n = ln();
      return Hg(n, Te, t, e);
    },
    useMemoCache: bh,
    useCacheRefresh: up,
    useEffectEvent: Jg
  }, g2 = {
    readContext: An,
    use: Ks,
    useCallback: Ig,
    useContext: An,
    useEffect: wh,
    useImperativeHandle: Wg,
    useInsertionEffect: kg,
    useLayoutEffect: Pg,
    useMemo: tp,
    useReducer: Eh,
    useRef: Kg,
    useState: function() {
      return Eh(jl);
    },
    useDebugValue: Ah,
    useDeferredValue: function(t, e) {
      var n = ln();
      return Te === null ? Oh(n, t, e) : ep(
        n,
        Te.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Eh(jl)[0], e = ln().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: zg,
    useId: ap,
    useHostTransitionStatus: zh,
    useFormState: Zg,
    useActionState: Zg,
    useOptimistic: function(t, e) {
      var n = ln();
      return Te !== null ? Hg(n, Te, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: bh,
    useCacheRefresh: up,
    useEffectEvent: Jg
  };
  function Dh(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : D({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Nh = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = Mi(), r = sa(i);
      r.payload = e, n != null && (r.callback = n), e = ca(t, r, i), e !== null && (oi(e, t, i), no(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = Mi(), r = sa(i);
      r.tag = 1, r.payload = e, n != null && (r.callback = n), e = ca(t, r, i), e !== null && (oi(e, t, i), no(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Mi(), i = sa(n);
      i.tag = 2, e != null && (i.callback = e), e = ca(t, i, n), e !== null && (oi(e, t, n), no(e, t, n));
    }
  };
  function hp(t, e, n, i, r, s, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, s, m) : e.prototype && e.prototype.isPureReactComponent ? !Jr(n, i) || !Jr(r, s) : !0;
  }
  function dp(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && Nh.enqueueReplaceState(e, e.state, null);
  }
  function uu(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = D({}, n));
      for (var r in t)
        n[r] === void 0 && (n[r] = t[r]);
    }
    return n;
  }
  function mp(t) {
    Ms(t);
  }
  function gp(t) {
    console.error(t);
  }
  function pp(t) {
    Ms(t);
  }
  function Ws(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function vp(t, e, n) {
    try {
      var i = t.onCaughtError;
      i(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Uh(t, e, n) {
    return n = sa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Ws(t, e);
    }, n;
  }
  function _p(t) {
    return t = sa(t), t.tag = 3, t;
  }
  function yp(t, e, n, i) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var s = i.value;
      t.payload = function() {
        return r(s);
      }, t.callback = function() {
        vp(e, n, i);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      vp(e, n, i), typeof r != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var y = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function p2(t, e, n, i, r) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && Wa(
        e,
        n,
        r,
        !0
      ), n = On.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return Bn === null ? yc() : n.alternate === null && We === 0 && (We = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, i === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), _d(t, i, r)), !1;
          case 22:
            return n.flags |= 65536, i === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), _d(t, i, r)), !1;
        }
        throw Error(a(435, n.tag));
      }
      return _d(t, i, r), yc(), !1;
    }
    if ($t)
      return e = On.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, i !== th && (t = Error(a(422), { cause: i }), $r(Ki(t, n)))) : (i !== th && (e = Error(a(423), {
        cause: i
      }), $r(
        Ki(e, n)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, i = Ki(i, n), r = Uh(
        t.stateNode,
        i,
        r
      ), ch(t, r), We !== 4 && (We = 2)), !1;
    var s = Error(a(520), { cause: i });
    if (s = Ki(s, n), vo === null ? vo = [s] : vo.push(s), We !== 4 && (We = 2), e === null) return !0;
    i = Ki(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = r & -r, n.lanes |= t, t = Uh(n.stateNode, i, t), ch(n, t), !1;
        case 1:
          if (e = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (_a === null || !_a.has(s))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = _p(r), yp(
              r,
              t,
              n,
              i
            ), ch(n, r), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Bh = Error(a(461)), sn = !1;
  function gn(t, e, n, i) {
    e.child = t === null ? Eg(e, null, n, i) : lu(
      e,
      t.child,
      n,
      i
    );
  }
  function Sp(t, e, n, i, r) {
    n = n.render;
    var s = e.ref;
    if ("ref" in i) {
      var m = {};
      for (var y in i)
        y !== "ref" && (m[y] = i[y]);
    } else m = i;
    return Ia(e), i = vh(
      t,
      e,
      n,
      m,
      s,
      r
    ), y = _h(), t !== null && !sn ? (yh(t, e, r), Ql(t, e, r)) : ($t && y && Cs(e), e.flags |= 1, gn(t, e, i, r), e.child);
  }
  function bp(t, e, n, i, r) {
    if (t === null) {
      var s = n.type;
      return typeof s == "function" && !Pf(s) && s.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = s, Tp(
        t,
        e,
        s,
        i,
        r
      )) : (t = Rs(
        n.type,
        null,
        i,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (s = t.child, !jh(t, r)) {
      var m = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Jr, n(m, i) && t.ref === e.ref)
        return Ql(t, e, r);
    }
    return e.flags |= 1, t = Yl(s, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Tp(t, e, n, i, r) {
    if (t !== null) {
      var s = t.memoizedProps;
      if (Jr(s, i) && t.ref === e.ref)
        if (sn = !1, e.pendingProps = i = s, jh(t, r))
          (t.flags & 131072) !== 0 && (sn = !0);
        else
          return e.lanes = t.lanes, Ql(t, e, r);
    }
    return Hh(
      t,
      e,
      n,
      i,
      r
    );
  }
  function Ep(t, e, n, i) {
    var r = i.children, s = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, r = 0; i !== null; )
            r = r | i.lanes | i.childLanes, i = i.sibling;
          i = r & ~s;
        } else i = 0, e.child = null;
        return xp(
          t,
          e,
          s,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Hs(
          e,
          s !== null ? s.cachePool : null
        ), s !== null ? wg(e, s) : hh(), Ag(e);
      else
        return i = e.lanes = 536870912, xp(
          t,
          e,
          s !== null ? s.baseLanes | n : n,
          n,
          i
        );
    } else
      s !== null ? (Hs(e, s.cachePool), wg(e, s), da(), e.memoizedState = null) : (t !== null && Hs(e, null), hh(), da());
    return gn(t, e, r, n), e.child;
  }
  function so(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function xp(t, e, n, i, r) {
    var s = uh();
    return s = s === null ? null : { parent: rn._currentValue, pool: s }, e.memoizedState = {
      baseLanes: n,
      cachePool: s
    }, t !== null && Hs(e, null), hh(), Ag(e), t !== null && Wa(t, e, i, !0), e.childLanes = r, null;
  }
  function Is(t, e) {
    return e = tc(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Mp(t, e, n) {
    return lu(e, t.child, null, n), t = Is(e, e.pendingProps), t.flags |= 2, bi(e), e.memoizedState = null, t;
  }
  function v2(t, e, n) {
    var i = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if ($t) {
        if (i.mode === "hidden")
          return t = Is(e, i), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, so(null, t);
        if (mh(e), (t = ze) ? (t = $v(
          t,
          ki
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ia !== null ? { id: vl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = og(t), n.return = e, e.child = n, Sn = e, ze = null)) : t = null, t === null) throw aa(e);
        return e.lanes = 536870912, null;
      }
      return Is(e, i);
    }
    var s = t.memoizedState;
    if (s !== null) {
      var m = s.dehydrated;
      if (mh(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = Mp(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(a(558));
      else if (sn || Wa(t, e, n, !1), r = (n & t.childLanes) !== 0, sn || r) {
        if (fa.current === null) {
          if (i = Ae, i !== null && (m = vi(i, n), m !== 0 && m !== s.retryLane))
            throw s.retryLane = m, Ja(t, m), oi(i, t, m), Bh;
          yc();
        }
        e = Mp(
          t,
          e,
          n
        );
      } else
        t = s.treeContext, ze = $i(m.nextSibling), Sn = e, $t = !0, la = null, ki = !1, t !== null && fg(e, t), e = Is(e, i), e.flags |= 134221824;
      return e;
    }
    return t = Yl(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function $u(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(a(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Hh(t, e, n, i, r) {
    return Ia(e), n = vh(
      t,
      e,
      n,
      i,
      void 0,
      r
    ), i = _h(), t !== null && !sn ? (yh(t, e, r), Ql(t, e, r)) : ($t && i && Cs(e), e.flags |= 1, gn(t, e, n, r), e.child);
  }
  function wp(t, e, n, i, r, s) {
    return Ia(e), e.updateQueue = null, n = Rg(
      e,
      i,
      n,
      r
    ), Og(t), i = _h(), t !== null && !sn ? (yh(t, e, s), Ql(t, e, s)) : ($t && i && Cs(e), e.flags |= 1, gn(t, e, n, s), e.child);
  }
  function Ap(t, e, n, i, r) {
    if (Ia(e), e.stateNode === null) {
      var s = Vu, m = n.contextType;
      typeof m == "object" && m !== null && (s = An(m)), s = new n(i, s), e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Nh, e.stateNode = s, s._reactInternals = e, s = e.stateNode, s.props = i, s.state = e.memoizedState, s.refs = {}, oh(e), m = n.contextType, s.context = typeof m == "object" && m !== null ? An(m) : Vu, s.state = e.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (Dh(
        e,
        n,
        m,
        i
      ), s.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (m = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), m !== s.state && Nh.enqueueReplaceState(s, s.state, null), lo(e, i, s, r), io(), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      s = e.stateNode;
      var y = e.memoizedProps, x = uu(n, y);
      s.props = x;
      var U = s.context, j = n.contextType;
      m = Vu, typeof j == "object" && j !== null && (m = An(j));
      var tt = n.getDerivedStateFromProps;
      j = typeof tt == "function" || typeof s.getSnapshotBeforeUpdate == "function", y = e.pendingProps !== y, j || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (y || U !== m) && dp(
        e,
        s,
        i,
        m
      ), oa = !1;
      var C = e.memoizedState;
      s.state = C, lo(e, i, s, r), io(), U = e.memoizedState, y || C !== U || oa ? (typeof tt == "function" && (Dh(
        e,
        n,
        tt,
        i
      ), U = e.memoizedState), (x = oa || hp(
        e,
        n,
        x,
        i,
        C,
        U,
        m
      )) ? (j || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = U), s.props = i, s.state = U, s.context = m, i = x) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      s = e.stateNode, sh(t, e), m = e.memoizedProps, j = uu(n, m), s.props = j, tt = e.pendingProps, C = s.context, U = n.contextType, x = Vu, typeof U == "object" && U !== null && (x = An(U)), y = n.getDerivedStateFromProps, (U = typeof y == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m !== tt || C !== x) && dp(
        e,
        s,
        i,
        x
      ), oa = !1, C = e.memoizedState, s.state = C, lo(e, i, s, r), io();
      var q = e.memoizedState;
      m !== tt || C !== q || oa || t !== null && t.dependencies !== null && Us(t.dependencies) ? (typeof y == "function" && (Dh(
        e,
        n,
        y,
        i
      ), q = e.memoizedState), (j = oa || hp(
        e,
        n,
        j,
        i,
        C,
        q,
        x
      ) || t !== null && t.dependencies !== null && Us(t.dependencies)) ? (U || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, q, x), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        i,
        q,
        x
      )), typeof s.componentDidUpdate == "function" && (e.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = q), s.props = i, s.state = q, s.context = x, i = j) : (typeof s.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return s = i, $u(t, e), i = (e.flags & 128) !== 0, s || i ? (s = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : s.render(), e.flags |= 1, t !== null && i ? (e.child = lu(
      e,
      t.child,
      null,
      r
    ), e.child = lu(
      e,
      null,
      n,
      r
    )) : gn(t, e, n, r), e.memoizedState = s.state, t = e.child) : t = Ql(
      t,
      e,
      r
    ), t;
  }
  function Op(t, e, n, i) {
    return Pa(), e.flags |= 256, gn(t, e, n, i), e.child;
  }
  var Lh = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Yh(t) {
    return { baseLanes: t, cachePool: vg() };
  }
  function qh(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= xi), t;
  }
  function Rp(t, e, n) {
    var i = e.pendingProps, r = !1, s = (e.flags & 128) !== 0, m;
    if ((m = s) || (m = t !== null && t.memoizedState === null ? !1 : (Rn.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if ($t) {
        if (r ? ha(e) : da(), (t = ze) ? (t = $v(
          t,
          ki
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ia !== null ? { id: vl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = og(t), n.return = e, e.child = n, Sn = e, ze = null)) : t = null, t === null) throw aa(e);
        return Yd(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return s = i.children, i = i.fallback, r ? (da(), r = e.mode, s = tc(
        { mode: "hidden", children: s },
        r
      ), i = ka(
        i,
        r,
        n,
        null
      ), s.return = e, i.return = e, s.sibling = i, e.child = s, i = e.child, i.memoizedState = Yh(n), i.childLanes = qh(
        t,
        m,
        n
      ), e.memoizedState = Lh, so(null, i)) : (ha(e), Xh(e, s));
    }
    var y = t.memoizedState;
    if (y !== null) {
      var x = y.dehydrated;
      if (x !== null)
        return _2(
          t,
          e,
          s,
          m,
          i,
          x,
          y,
          n
        );
    }
    return r ? (da(), r = i.fallback, s = e.mode, y = t.child, x = y.sibling, i = Yl(y, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = y.subtreeFlags & 1206910976, x !== null ? r = Yl(x, r) : (r = ka(
      r,
      s,
      n,
      null
    ), r.flags |= 2), r.return = e, i.return = e, i.sibling = r, e.child = i, so(null, i), i = e.child, r = t.child.memoizedState, r === null ? r = Yh(n) : (s = r.cachePool, s !== null ? (y = rn._currentValue, s = s.parent !== y ? { parent: y, pool: y } : s) : s = vg(), r = {
      baseLanes: r.baseLanes | n,
      cachePool: s
    }), i.memoizedState = r, i.childLanes = qh(
      t,
      m,
      n
    ), e.memoizedState = Lh, so(t.child, i)) : (ha(e), n = t.child, t = n.sibling, n = Yl(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Xh(t, e) {
    return e = tc(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function tc(t, e) {
    return t = li(22, t, null, e), t.lanes = 0, t;
  }
  function ec(t, e, n) {
    return lu(e, t.child, null, n), t = Xh(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function _2(t, e, n, i, r, s, m, y) {
    if (n)
      return e.flags & 256 ? (ha(e), e.flags &= -257, ec(
        t,
        e,
        y
      )) : e.memoizedState !== null ? (da(), e.child = t.child, e.flags |= 128, null) : (da(), s = r.fallback, m = e.mode, r = tc(
        { mode: "visible", children: r.children },
        m
      ), s = ka(
        s,
        m,
        y,
        null
      ), s.flags |= 2, r.return = e, s.return = e, r.sibling = s, e.child = r, lu(e, t.child, null, y), r = e.child, r.memoizedState = Yh(y), r.childLanes = qh(
        t,
        i,
        y
      ), e.memoizedState = Lh, so(null, r));
    if (ha(e), Yd(s)) {
      if (i = s.nextSibling && s.nextSibling.dataset, i) var x = i.dgst;
      return i = x, i !== "" && (r = Error(a(419)), r.stack = "", r.digest = i, $r({ value: r, source: null, stack: null })), ec(
        t,
        e,
        y
      );
    }
    if (sn || Wa(t, e, y, !1), i = (y & t.childLanes) !== 0, sn || i) {
      if (fa.current !== null)
        return ec(
          t,
          e,
          y
        );
      if (i = Ae, i !== null && (r = vi(
        i,
        y
      ), r !== 0 && r !== m.retryLane))
        throw m.retryLane = r, Ja(t, r), oi(i, t, r), Bh;
      return Ld(s) || yc(), ec(
        t,
        e,
        y
      );
    }
    return Ld(s) ? (e.flags |= 192, e.child = t.child, null) : (t = m.treeContext, ze = $i(s.nextSibling), Sn = e, $t = !0, la = null, ki = !1, t !== null && fg(e, t), e = Xh(
      e,
      r.children
    ), e.flags |= 134221824, e);
  }
  function zp(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), Ns(t.return, e, n);
  }
  function Cp(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Gs(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function nc(t, e, n, i, r, s) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: r,
      treeForkCount: s
    } : (m.isBackwards = e, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = n, m.tailMode = r, m.treeForkCount = s);
  }
  function Vh(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Gh(t, e, n) {
    var i = e.pendingProps, r = i.revealOrder, s = i.tail;
    i = i.children;
    var m = Rn.current;
    if (e.flags & 128)
      return ao(e, m), null;
    var y = (m & 2) !== 0;
    if (y ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, ao(e, m), r === "backwards" && t !== null ? (Vh(t), gn(t, e, i, n), Vh(t)) : gn(t, e, i, n), i = $t ? Pr : 0, !y && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && zp(t, n, e);
        else if (t.tag === 19)
          zp(t, n, e);
        else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e) break t;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            break t;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
    switch (r) {
      case "backwards":
        n = Cp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null, Vh(e)), nc(
          e,
          !0,
          r,
          null,
          s,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, r = e.child, e.child = null; r !== null; ) {
          if (t = r.alternate, t !== null && Gs(t) === null) {
            e.child = r;
            break;
          }
          t = r.sibling, r.sibling = n, n = r, r = t;
        }
        nc(
          e,
          !0,
          n,
          null,
          s,
          i
        );
        break;
      case "together":
        nc(
          e,
          !1,
          null,
          null,
          void 0,
          i
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = Cp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), nc(
          e,
          !1,
          r,
          n,
          s,
          i
        );
    }
    return e.child;
  }
  function Dp(t, e, n) {
    var i = e.pendingProps;
    return ua(e, e.type, i.value), gn(t, e, i.children, n), e.child;
  }
  function Ql(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), va |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Wa(
          t,
          e,
          n,
          !1
        ), (n & e.childLanes) === 0)
          return null;
      } else return null;
    if (t !== null && e.child !== t.child)
      throw Error(a(153));
    if (e.child !== null) {
      for (t = e.child, n = Yl(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Yl(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function jh(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Us(t)));
  }
  function y2(t, e, n) {
    switch (e.tag) {
      case 3:
        kt(e, e.stateNode.containerInfo), ua(e, rn, t.memoizedState.cache), Pa();
        break;
      case 27:
      case 5:
        Ct(e);
        break;
      case 4:
        kt(e, e.stateNode.containerInfo);
        break;
      case 10:
        ua(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, mh(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return ha(e), e.flags |= 128, null;
          i = Wa(
            t,
            e,
            n,
            !1
          );
          var r = e.child.childLanes;
          return i || (n & r) !== 0 ? Rp(t, e, n) : (ha(e), t = Ql(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        ha(e);
        break;
      case 19:
        if (e.flags & 128)
          return Gh(
            t,
            e,
            n
          );
        if (r = (t.flags & 128) !== 0, i = (n & e.childLanes) !== 0, i || (Wa(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), r) {
          if (i)
            return Gh(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), ao(e, Rn.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, Ep(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ua(e, rn, t.memoizedState.cache);
    }
    return Ql(t, e, n);
  }
  function Np(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        sn = !0;
      else {
        if (!jh(t, n) && (e.flags & 128) === 0)
          return sn = !1, y2(
            t,
            e,
            n
          );
        sn = (t.flags & 131072) !== 0;
      }
    else
      sn = !1, $t && (e.flags & 1048576) !== 0 && cg(e, Pr, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = nu(e.elementType), e.type = t, typeof t == "function")
            Pf(t) ? (i = uu(t, i), e.tag = 1, e = Ap(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = Hh(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === F) {
                e.tag = 11, e = Sp(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (r === st) {
                e.tag = 14, e = bp(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (r === et) {
                e.tag = 10, e.type = t, e = Dp(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = ht(t) || t, Error(a(306, e, ""));
          }
        }
        return e;
      case 0:
        return Hh(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, r = uu(
          i,
          e.pendingProps
        ), Ap(
          t,
          e,
          i,
          r,
          n
        );
      case 3:
        t: {
          if (kt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(a(387));
          i = e.pendingProps;
          var s = e.memoizedState;
          r = s.element, sh(t, e), lo(e, i, null, n);
          var m = e.memoizedState;
          if (i = m.cache, ua(e, rn, i), i !== s.cache && ih(
            e,
            [rn],
            n,
            !0
          ), io(), i = m.element, s.isDehydrated)
            if (s = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
              e = Op(
                t,
                e,
                i,
                n
              );
              break t;
            } else if (i !== r) {
              r = Ki(
                Error(a(424)),
                e
              ), $r(r), e = Op(
                t,
                e,
                i,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, ze = $i(t.firstChild), Sn = e, $t = !0, la = null, ki = !0, n = Eg(
                e,
                null,
                i,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Pa(), i === r) {
              e = Ql(
                t,
                e,
                n
              );
              break t;
            }
            gn(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return $u(t, e), t === null ? (n = l1(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : $t || (e.stateNode = Lv(
          e.type,
          e.pendingProps,
          bt.current,
          e
        )) : e.memoizedState = l1(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Ct(e), t === null && $t && (i = e.stateNode = t1(
          e.type,
          e.pendingProps,
          bt.current
        ), Sn = e, ki = !0, r = ze, ba(e.type) ? (qd = r, ze = $i(i.firstChild)) : ze = r), gn(
          t,
          e,
          e.pendingProps.children,
          n
        ), $u(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && $t && ((r = i = ze) && (i = db(
          i,
          e.type,
          e.pendingProps,
          ki
        ), i !== null ? (e.stateNode = i, Sn = e, ze = $i(i.firstChild), ki = !1, r = !0) : r = !1), r || aa(e)), Ct(e), r = e.type, s = e.pendingProps, m = t !== null ? t.memoizedProps : null, i = s.children, zd(r, s) ? i = null : m !== null && zd(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = vh(
          t,
          e,
          o2,
          null,
          null,
          n
        ), gr._currentValue = r), $u(t, e), gn(t, e, i, n), e.child;
      case 6:
        return t === null && $t && ((t = n = ze) && (n = mb(
          n,
          e.pendingProps,
          ki
        ), n !== null ? (e.stateNode = n, Sn = e, ze = null, t = !0) : t = !1), t || aa(e)), null;
      case 13:
        return Rp(t, e, n);
      case 4:
        return kt(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = lu(
          e,
          null,
          i,
          n
        ) : gn(t, e, i, n), e.child;
      case 11:
        return Sp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return i = e.pendingProps, $u(t, e), gn(t, e, i, n), e.child;
      case 8:
        return gn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return gn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return Dp(t, e, n);
      case 9:
        return r = e.type._context, i = e.pendingProps.children, Ia(e), r = An(r), i = i(r), e.flags |= 1, gn(t, e, i, n), e.child;
      case 14:
        return bp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Tp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Gh(t, e, n);
      case 31:
        return v2(t, e, n);
      case 22:
        return Ep(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Ia(e), i = An(rn), t === null ? (r = uh(), r === null && (r = Ae, s = lh(), r.pooledCache = s, s.refCount++, s !== null && (r.pooledCacheLanes |= n), r = s), e.memoizedState = { parent: i, cache: r }, oh(e), ua(e, rn, r)) : ((t.lanes & n) !== 0 && (sh(t, e), lo(e, null, null, n), io()), r = t.memoizedState, s = e.memoizedState, r.parent !== i ? (r = { parent: i, cache: i }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), ua(e, rn, i)) : (i = s.cache, ua(e, rn, i), i !== r.cache && ih(
          e,
          [rn],
          n,
          !0
        ))), gn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 30:
        return e.stateNode === null && (e.stateNode = {
          autoName: null,
          paired: null,
          clones: null,
          ref: null
        }), i = e.pendingProps, i.name != null && i.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : $t && Cs(e), t !== null && t.memoizedProps.name !== i.name ? e.flags |= 4194816 : $u(t, e), gn(t, e, i.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(a(156, e.tag));
  }
  function Zl(t) {
    t.flags |= 4;
  }
  function Qh(t, e, n, i, r) {
    var s;
    if ((s = (t.mode & 32) !== 0) && (s = n === null ? o1(e, i) : o1(e, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), s) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (mv()) t.flags |= 8192;
        else
          throw iu = Ys, rh;
    } else t.flags &= -16777217;
  }
  function Up(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !s1(e))
      if (mv()) t.flags |= 8192;
      else
        throw iu = Ys, rh;
  }
  function ic(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? he() : 536870912, t.lanes |= e, nr |= e);
  }
  function co(t, e) {
    if (!$t)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, i = null; n !== null; )
            n.alternate !== null && (i = n), n = n.sibling;
          i === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : i.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Ce(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 1206910976, i |= r.flags & 1206910976, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function S2(t, e, n) {
    var i = e.pendingProps;
    switch (If(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ce(e), null;
      case 1:
        return Ce(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), Vl(rn), Ht(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Qu(e) ? Zl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, eh())), Ce(e), null;
      case 26:
        var r = e.type, s = e.memoizedState;
        return t === null ? (Zl(e), s !== null ? (Ce(e), Up(e, s)) : (Ce(e), Qh(
          e,
          r,
          null,
          i,
          n
        ))) : s ? s !== t.memoizedState ? (Zl(e), Ce(e), Up(e, s)) : (Ce(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && Zl(e), Ce(e), Qh(
          e,
          r,
          t,
          i,
          n
        )), null;
      case 27:
        if (ee(e), n = bt.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zl(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ce(e), e.subtreeFlags &= -33554433, null;
          }
          t = pt.current, Qu(e) ? hg(e) : (t = t1(r, i, n), e.stateNode = t, Zl(e));
        }
        return Ce(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (ee(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zl(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ce(e), e.subtreeFlags &= -33554433, null;
          }
          if (s = pt.current, Qu(e))
            hg(e);
          else {
            var m = To(
              bt.current
            );
            switch (s) {
              case 1:
                s = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  r
                );
                break;
              case 2:
                s = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  r
                );
                break;
              default:
                switch (r) {
                  case "svg":
                    s = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      r
                    );
                    break;
                  case "math":
                    s = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    s = m.createElement("div"), s.innerHTML = "<script><\/script>", s = s.removeChild(
                      s.firstChild
                    );
                    break;
                  case "select":
                    s = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? s.multiple = !0 : i.size && (s.size = i.size);
                    break;
                  default:
                    s = typeof i.is == "string" ? m.createElement(r, { is: i.is }) : m.createElement(r);
                }
            }
            s[Ye] = e, s[Be] = i;
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                s.appendChild(m.stateNode);
              else if (m.tag !== 4 && m.tag !== 27 && m.child !== null) {
                m.child.return = m, m = m.child;
                continue;
              }
              if (m === e) break t;
              for (; m.sibling === null; ) {
                if (m.return === null || m.return === e)
                  break t;
                m = m.return;
              }
              m.sibling.return = m.return, m = m.sibling;
            }
            e.stateNode = s;
            t: switch (Cn(s, r, i), r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                i = !!i.autoFocus;
                break t;
              case "img":
                i = !0;
                break t;
              default:
                i = !1;
            }
            i && Zl(e);
          }
        }
        return Ce(e), e.subtreeFlags &= -33554433, Qh(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== i && Zl(e);
        else {
          if (typeof i != "string" && e.stateNode === null)
            throw Error(a(166));
          if (t = bt.current, Qu(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, r = Sn, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  i = r.memoizedProps;
              }
            t[Ye] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || Nv(t.nodeValue, n)), t || aa(e, !0);
          } else
            t = To(t).createTextNode(
              i
            ), t[Ye] = e, e.stateNode = t;
        }
        return Ce(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = Qu(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(a(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(557));
              t[Ye] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ce(e), t = !1;
          } else
            n = eh(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (bi(e), e) : (bi(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Ce(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Qu(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(a(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(a(317));
              r[Ye] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ce(e), r = !1;
          } else
            r = eh(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (bi(e), e) : (bi(e), null);
        }
        return bi(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, r = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (r = i.alternate.memoizedState.cachePool.pool), s = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (s = i.memoizedState.cachePool.pool), s !== r && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), ic(e, e.updateQueue), Ce(e), null);
      case 4:
        return Ht(), t === null && Md(e.stateNode.containerInfo), e.flags |= 67108864, Ce(e), null;
      case 10:
        return Vl(e.type), Ce(e), null;
      case 19:
        if (gh(e), i = e.memoizedState, i === null) return Ce(e), null;
        if (r = (e.flags & 128) !== 0, s = i.rendering, s === null)
          if (r) co(i, !1);
          else {
            if (We !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (s = Gs(t), s !== null) {
                  for (e.flags |= 128, co(i, !1), t = s.updateQueue, e.updateQueue = t, ic(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    rg(n, t), n = n.sibling;
                  return ao(
                    e,
                    Rn.current & 1 | 2
                  ), $t && ql(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && qt() > gc && (e.flags |= 128, r = !0, co(i, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = Gs(s), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, ic(e, t), co(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !s.alternate && !$t)
                return Ce(e), null;
            } else
              2 * qt() - i.renderingStartTime > gc && n !== 536870912 && (e.flags |= 128, r = !0, co(i, !1), e.lanes = 4194304);
          i.isBackwards ? (s.sibling = e.child, e.child = s) : (t = i.last, t !== null ? t.sibling = s : e.child = s, i.last = s);
        }
        if (i.tail !== null) {
          t = i.tail;
          t: {
            for (n = t; n !== null; ) {
              if (n.alternate !== null) {
                n = !1;
                break t;
              }
              n = n.sibling;
            }
            n = !0;
          }
          return i.rendering = t, i.tail = t.sibling, i.renderingStartTime = qt(), t.sibling = null, s = Rn.current, s = r ? s & 1 | 2 : s & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || $t ? ao(e, s) : (n = s, nt(On, e), nt(Rn, n), Bn === null && (Bn = e)), $t && ql(e, i.treeForkCount), t;
        }
        return Ce(e), null;
      case 22:
      case 23:
        return bi(e), dh(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ce(e), n = e.updateQueue, n !== null && ic(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && B(eu), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Vl(rn), Ce(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Ce(e), null;
    }
    throw Error(a(156, e.tag));
  }
  function b2(t, e) {
    switch (If(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Vl(rn), Ht(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return ee(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (bi(e), e.alternate === null)
            throw Error(a(340));
          Pa();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (bi(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(a(340));
          Pa();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return gh(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ht(), null;
      case 10:
        return Vl(e.type), null;
      case 22:
      case 23:
        return bi(e), dh(), t !== null && B(eu), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Vl(rn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Bp(t, e) {
    switch (If(e), e.tag) {
      case 3:
        Vl(rn), Ht();
        break;
      case 26:
      case 27:
      case 5:
        ee(e);
        break;
      case 4:
        Ht();
        break;
      case 31:
        e.memoizedState !== null && bi(e);
        break;
      case 13:
        bi(e);
        break;
      case 19:
        gh(e);
        break;
      case 10:
        Vl(e.type);
        break;
      case 22:
      case 23:
        bi(e), dh(), t !== null && B(eu);
        break;
      case 24:
        Vl(rn);
    }
  }
  function fo(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var s = n.create, m = n.inst;
            i = s(), m.destroy = i;
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (y) {
      ye(e, e.return, y);
    }
  }
  function ma(t, e, n) {
    try {
      var i = e.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        i = s;
        do {
          if ((i.tag & t) === t) {
            var m = i.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, r = e;
              var x = n, U = y;
              try {
                U();
              } catch (j) {
                ye(
                  r,
                  x,
                  j
                );
              }
            }
          }
          i = i.next;
        } while (i !== s);
      }
    } catch (j) {
      ye(e, e.return, j);
    }
  }
  function Hp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Mg(e, n);
      } catch (i) {
        ye(t, t.return, i);
      }
    }
  }
  function Lp(t, e, n) {
    n.props = uu(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      ye(t, e, i);
    }
  }
  function yl(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var i = t.stateNode;
            break;
          case 30:
            var r = t.stateNode, s = Hl(t.memoizedProps, r);
            (r.ref === null || r.ref.name !== s) && (r.ref = Qv(s)), i = r.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var m = new wi(t);
              _(
                t.child,
                !1,
                fb,
                m,
                void 0,
                void 0
              ), t.stateNode = m;
            }
            i = t.stateNode;
            break;
          default:
            i = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(i) : n.current = i;
      }
    } catch (y) {
      ye(t, e, y);
    }
  }
  function zn(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (r) {
          ye(t, e, r);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          ye(t, e, r);
        }
      else n.current = null;
  }
  function lc(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        Pv(
          t.stateNode,
          e[n]
        );
  }
  function Yp(t) {
    for (var e = t.return; e !== null && (Kh(e) && Pv(t.stateNode, e.stateNode), !Zh(e)); )
      e = e.return;
  }
  function ho(t) {
    for (var e = t.return; e !== null && (Kh(e) && hb(t.stateNode, e.stateNode), !Zh(e)); )
      e = e.return;
  }
  function Zh(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Kh(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Fh(t) {
    var e = t.type, n = t.memoizedProps, i = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && i.focus();
          break t;
        case "img":
          n.src ? i.src = n.src : n.srcSet && (i.srcset = n.srcSet);
      }
    } catch (r) {
      ye(t, t.return, r);
    }
  }
  function Jh(t, e, n) {
    try {
      var i = t.stateNode;
      F2(i, t.type, n, e), i[Be] = e;
    } catch (r) {
      ye(t, t.return, r);
    }
  }
  function qp(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ba(t.type) || t.tag === 4;
  }
  function kh(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || qp(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ba(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ph(t, e, n, i) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(r, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(r), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = pl)), lc(t, i), de = !0;
    else if (r !== 4 && (r === 27 && (lc(t, i), i = null, ba(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Ph(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        Ph(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function ac(t, e, n, i) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? n.insertBefore(r, e) : n.appendChild(r), lc(t, i), de = !0;
    else if (r !== 4 && (r === 27 && (lc(t, i), i = null, ba(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (ac(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        ac(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function Xp(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      Cn(e, i, n), e[Ye] = t, e[Be] = n;
    } catch (s) {
      ye(t, t.return, s);
    }
  }
  var uc = !1, Ti = null;
  function Vp(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (uc = !0);
  }
  var Sl = null;
  function Gp() {
    var t = Sl;
    return Sl = null, t;
  }
  var ai = 0;
  function Wu(t, e, n, i, r) {
    return ai = 0, jp(
      t.child,
      e,
      n,
      i,
      r
    );
  }
  function jp(t, e, n, i, r) {
    for (var s = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (i !== null) {
          var y = Nd(m);
          i.push(y), y.view && (s = !0);
        } else
          s || Nd(m).view && (s = !0);
        uc = !0, Gv(
          m,
          ai === 0 ? e : e + "_" + ai,
          n
        ), ai++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && r || jp(
        t.child,
        e,
        n,
        i,
        r
      ) && (s = !0));
      t = t.sibling;
    }
    return s;
  }
  function bl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? jv(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || bl(
        t.child,
        e
      )), t = t.sibling;
  }
  function rc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (rc(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(a(544));
          var n = e.name;
          e = Ll(e.default, e.share), e !== "none" && (Wu(
            t,
            n,
            e,
            null,
            !1
          ) || bl(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function $h(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, i = t.memoizedProps, r = Hl(i, n), s = Ll(
        i.default,
        n.paired ? i.share : i.enter
      );
      s !== "none" ? Wu(t, r, s, null, !1) ? (rc(t), n.paired || e || ur(t, i.onEnter)) : bl(t.child, !1) : rc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        $h(t, e), t = t.sibling;
    else rc(t);
  }
  function Wh(t) {
    if (Ti !== null && Ti.size !== 0) {
      var e = Ti;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var r = e.get(i);
                if (r !== void 0) {
                  var s = Ll(
                    n.default,
                    n.share
                  );
                  if (s !== "none" && (Wu(
                    t,
                    i,
                    s,
                    null,
                    !1
                  ) ? (s = t.stateNode, r.paired = s, s.paired = r, ur(t, n.onShare)) : bl(t.child, !1)), e.delete(i), e.size === 0) break;
                }
              }
            }
            Wh(t);
          }
          t = t.sibling;
        }
    }
  }
  function Ih(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Hl(e, t.stateNode), i = Ti !== null ? Ti.get(n) : void 0, r = Ll(
        e.default,
        i !== void 0 ? e.share : e.exit
      );
      r !== "none" && (Wu(t, n, r, null, !1) ? i !== void 0 ? (r = t.stateNode, i.paired = r, r.paired = i, Ti.delete(n), ur(t, e.onShare)) : ur(t, e.onExit) : bl(t.child, !1)), Ti !== null && Wh(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ih(t), t = t.sibling;
    else
      Ti !== null && Wh(t);
  }
  function Qp(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Hl(e, t.stateNode);
        e = Ll(e.default, e.update), t.flags &= -5, e !== "none" && Wu(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Qp(t);
      t = t.sibling;
    }
  }
  function td(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, bl(t.child, !1));
          }
          td(t);
        }
        t = t.sibling;
      }
  }
  function oc(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, bl(t.child, !1), td(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        oc(t), t = t.sibling;
    else td(t);
  }
  function Zp(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? bl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Zp(t), t = t.sibling;
  }
  function ed(t, e, n, i, r, s, m) {
    for (var y = !1; e !== null; ) {
      if (e.tag === 5) {
        var x = e.stateNode;
        if (s !== null && ai < s.length) {
          var U = s[ai], j = Nd(x);
          (U.view || j.view) && (y = !0);
          var tt;
          if (tt = (t.flags & 4) === 0)
            if (j.clip) tt = !0;
            else {
              tt = U.rect;
              var C = j.rect;
              tt = tt.y !== C.y || tt.x !== C.x || tt.height !== C.height || tt.width !== C.width;
            }
          tt && (t.flags |= 4), j.abs ? j = !U.abs : (U = U.rect, j = j.rect, j = U.height !== j.height || U.width !== j.width), j && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Gv(
          x,
          ai === 0 ? n : n + "_" + ai,
          r
        ), y && (t.flags & 4) !== 0 || (Sl === null && (Sl = []), Sl.push(
          x,
          ai === 0 ? i : i + "_" + ai,
          e.memoizedProps
        )), ai++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && m ? t.flags |= e.flags & 32 : ed(
        t,
        e.child,
        n,
        i,
        r,
        s,
        m
      ) && (y = !0));
      e = e.sibling;
    }
    return y;
  }
  function Kp(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, i = t.stateNode, r = Hl(n, i), s = Ll(n.default, n.update), m;
        m = t.memoizedState, t.memoizedState = null, i = t;
        var y = t.child;
        ai = 0, r = ed(
          i,
          y,
          r,
          r,
          s,
          m,
          !1
        ), (t.flags & 4) !== 0 && r && ur(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Kp(t);
      t = t.sibling;
    }
  }
  var bn = !1, pe = !1, Tl = !1, nd = !1, Fp = typeof WeakSet == "function" ? WeakSet : Set, Tn = null, El = !1, mo = !1, sc = !1, id = !1;
  function T2(t, e, n) {
    if (t = t.containerInfo, Od = pr, t = $m(t), jf(t)) {
      if ("selectionStart" in t)
        var i = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          i = (i = t.ownerDocument) && i.defaultView || window;
          var r = i.getSelection && i.getSelection();
          if (r && r.rangeCount !== 0) {
            i = r.anchorNode;
            var s = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              i.nodeType, m.nodeType;
            } catch {
              i = null;
              break t;
            }
            var y = 0, x = -1, U = -1, j = 0, tt = 0, C = t, q = null;
            e: for (; ; ) {
              for (var _t; C !== i || s !== 0 && C.nodeType !== 3 || (x = y + s), C !== m || r !== 0 && C.nodeType !== 3 || (U = y + r), C.nodeType === 3 && (y += C.nodeValue.length), (_t = C.firstChild) !== null; )
                q = C, C = _t;
              for (; ; ) {
                if (C === t) break e;
                if (q === i && ++j === s && (x = y), q === m && ++tt === r && (U = y), (_t = C.nextSibling) !== null) break;
                C = q, q = C.parentNode;
              }
              C = _t;
            }
            i = x === -1 || U === -1 ? null : { start: x, end: U };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Rd = { focusedElem: t, selectionRange: i }, pr = !1, n = (n & 335544064) === n, Tn = e, e = n ? 9270 : 1024; Tn !== null; ) {
      if (t = Tn, n && (i = t.deletions, i !== null))
        for (s = 0; s < i.length; s++)
          n && Ih(i[s]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && Vp(t), cc(n);
      else {
        if (t.tag === 22) {
          if (i = t.alternate, t.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && Ih(i), cc(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && Vp(t), cc(n);
            continue;
          }
        }
        i = t.child, (t.subtreeFlags & e) !== 0 && i !== null ? (i.return = t, Tn = i) : (n && Qp(t), cc(n));
      }
    }
    Ti = null;
  }
  function cc(t) {
    for (; Tn !== null; ) {
      var e = Tn, n = t, i = e.alternate, r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((r & 1024) !== 0 && i !== null) {
            n = void 0, r = i.memoizedProps, i = i.memoizedState;
            var s = e.stateNode;
            try {
              var m = uu(
                e.type,
                r
              );
              n = s.getSnapshotBeforeUpdate(
                m,
                i
              ), s.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              ye(e, e.return, y);
            }
          }
          break;
        case 3:
          if ((r & 1024) !== 0) {
            if (i = e.stateNode.containerInfo, n = i.nodeType, n === 9)
              Hd(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Hd(i);
                  break;
                default:
                  i.textContent = "";
              }
          }
          break;
        case 5:
        case 26:
        case 27:
        case 6:
        case 4:
        case 17:
          break;
        case 30:
          n && i !== null && (n = Hl(
            i.memoizedProps,
            i.stateNode
          ), r = e.memoizedProps, r = Ll(r.default, r.update), r !== "none" && Wu(
            i,
            n,
            r,
            i.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((r & 1024) !== 0) throw Error(a(163));
      }
      if (i = e.sibling, i !== null) {
        i.return = e.return, Tn = i;
        break;
      }
      Tn = e.return;
    }
  }
  function Jp(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xl(t, n), i & 4 && fo(5, n);
        break;
      case 1:
        if (xl(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (m) {
              ye(n, n.return, m);
            }
          else {
            var r = uu(
              n.type,
              e.memoizedProps
            );
            e = e.memoizedState;
            try {
              t.componentDidUpdate(
                r,
                e,
                t.__reactInternalSnapshotBeforeUpdate
              );
            } catch (m) {
              ye(
                n,
                n.return,
                m
              );
            }
          }
        i & 64 && Hp(n), i & 512 && yl(n, n.return);
        break;
      case 3:
        if (xl(t, n), i & 64 && (t = n.updateQueue, t !== null)) {
          if (e = null, n.child !== null)
            switch (n.child.tag) {
              case 27:
              case 5:
                e = n.child.stateNode;
                break;
              case 1:
                e = n.child.stateNode;
            }
          try {
            Mg(t, e);
          } catch (m) {
            ye(n, n.return, m);
          }
        }
        break;
      case 27:
        e === null && i & 4 && Xp(n);
      case 26:
      case 5:
        xl(t, n), e === null && i & 4 && Fh(n), i & 512 && yl(n, n.return);
        break;
      case 12:
        xl(t, n);
        break;
      case 31:
        xl(t, n), i & 4 && Wp(t, n);
        break;
      case 13:
        xl(t, n), i & 4 && Ip(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = U2.bind(
          null,
          n
        ), gb(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || bn, !i) {
          var s = e !== null && e.memoizedState !== null || pe;
          e = bn, r = pe, bn = i, (pe = s) && !r ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), sl(
            t,
            n,
            i
          )) : xl(t, n), bn = e, pe = r;
        }
        break;
      case 30:
        xl(t, n), i & 512 && yl(n, n.return);
        break;
      case 7:
        i & 512 && yl(n, n.return);
      default:
        xl(t, n);
    }
  }
  function ld(t, e) {
    for (t = t.child; t !== null; )
      kp(t, e), t = t.sibling;
  }
  function kp(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var r = t.stateNode, s = t.memoizedProps.style, m = s != null && s.hasOwnProperty("display") ? s.display : null;
            r.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
          }
        } catch (x) {
          ye(t, t.return, x);
        }
        ad(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, de = !0;
        } catch (x) {
          ye(t, t.return, x);
        }
        break;
      case 18:
        try {
          var y = t.stateNode;
          e ? Vv(y, !0) : Vv(t.stateNode, !1);
        } catch (x) {
          ye(t, t.return, x);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && ld(t, e);
        break;
      default:
        ld(t, e);
    }
  }
  function ad(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, i = e;
          switch (n.tag) {
            case 4:
              kp(n, i);
              break t;
            case 22:
              n.memoizedState === null && ad(n, i);
              break t;
            default:
              ad(n, i);
          }
        }
        t = t.sibling;
      }
  }
  function Pp(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Pp(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && jn(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var qe = null, ui = !1;
  function rl(t, e, n) {
    for (n = n.child; n !== null; )
      $p(t, e, n), n = n.sibling;
  }
  function $p(t, e, n) {
    if (rt && typeof rt.onCommitFiberUnmount == "function")
      try {
        rt.onCommitFiberUnmount(at, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        pe || zn(n, e), rl(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !pe && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        pe || zn(n, e), ho(n);
        var i = qe, r = ui;
        ba(n.type) && (qe = n.stateNode, ui = !1), rl(
          t,
          e,
          n
        ), e1(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), qe = i, ui = r;
        break;
      case 5:
        pe || zn(n, e), ho(n);
      case 6:
        if (n.tag === 6 && ho(n), i = qe, r = ui, qe = null, rl(
          t,
          e,
          n
        ), qe = i, ui = r, qe !== null)
          if (ui)
            try {
              (qe.nodeType === 9 ? qe.body : qe.nodeName === "HTML" ? qe.ownerDocument.body : qe).removeChild(n.stateNode), de = !0;
            } catch (s) {
              ye(
                n,
                e,
                s
              );
            }
          else
            try {
              qe.removeChild(n.stateNode), de = !0;
            } catch (s) {
              ye(
                n,
                e,
                s
              );
            }
        break;
      case 18:
        qe !== null && (ui ? (t = qe, Xv(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), vr(t)) : Xv(qe, n.stateNode));
        break;
      case 4:
        i = qe, r = ui, qe = n.stateNode.containerInfo, ui = !0, rl(
          t,
          e,
          n
        ), qe = i, ui = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ma(2, n, e), pe || ma(4, n, e), rl(
          t,
          e,
          n
        );
        break;
      case 1:
        pe || (zn(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && Lp(
          n,
          e,
          i
        )), rl(
          t,
          e,
          n
        );
        break;
      case 21:
        rl(
          t,
          e,
          n
        );
        break;
      case 22:
        pe = (i = pe) || n.memoizedState !== null, rl(
          t,
          e,
          n
        ), pe = i;
        break;
      case 30:
        zn(n, e), rl(
          t,
          e,
          n
        );
        break;
      case 7:
        pe || zn(n, e), rl(
          t,
          e,
          n
        );
        break;
      default:
        rl(
          t,
          e,
          n
        );
    }
  }
  function Wp(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        vr(t);
      } catch (n) {
        ye(e, e.return, n);
      }
    }
  }
  function Ip(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        vr(t);
      } catch (n) {
        ye(e, e.return, n);
      }
  }
  function E2(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Fp()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Fp()), e;
      default:
        throw Error(a(435, t.tag));
    }
  }
  function fc(t, e) {
    var n = E2(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var r = B2.bind(null, t, i);
        i.then(r, r);
      }
    });
  }
  function Fn(t, e, n) {
    var i = e.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var s = i[r], m = t, y = e, x = y;
        t: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (ba(x.type)) {
                qe = x.stateNode, ui = !1;
                break t;
              }
              break;
            case 5:
              qe = x.stateNode, ui = !1;
              break t;
            case 3:
            case 4:
              qe = x.stateNode.containerInfo, ui = !0;
              break t;
          }
          x = x.return;
        }
        if (qe === null) throw Error(a(160));
        $p(m, y, s), qe = null, ui = !1, m = s.alternate, m !== null && (m.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        tv(e, t, n), e = e.sibling;
  }
  var ol = null;
  function tv(t, e, n) {
    var i = t.alternate, r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (r & 4 && (i = t.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var s = 0; s < i.length; s++) {
            var m = i[s];
            m.ref.impl = m.nextImpl;
          }
        Fn(e, t, n), Jn(t), r & 4 && (ma(3, t, t.return), fo(3, t), ma(5, t, t.return));
        break;
      case 1:
        Fn(e, t, n), Jn(t), r & 512 && (pe || i === null || zn(i, i.return)), r & 64 && bn && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (s = ol, Fn(e, t, n), Jn(t), r & 512 && (pe || i === null || zn(i, i.return)), r & 4)
          if (r = i !== null ? i.memoizedState : null, n = t.memoizedState, i === null)
            if (n === null)
              if (t.stateNode === null)
                if (bn)
                  t.stateNode = Lv(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, r = s.ownerDocument || s;
                    e: switch (e) {
                      case "title":
                        i = r.getElementsByTagName("title")[0], (!i || i[ke] || i[Ye] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = r.createElement(e), r.head.insertBefore(
                          i,
                          r.querySelector("head > title")
                        )), Cn(i, e, n), i[Ye] = t, nn(i), e = i;
                        break t;
                      case "link":
                        if (s = r1(
                          "link",
                          "href",
                          r
                        ).get(e + (n.href || ""))) {
                          for (m = 0; m < s.length; m++)
                            if (i = s[m], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              s.splice(m, 1);
                              break e;
                            }
                        }
                        i = r.createElement(e), Cn(i, e, n), r.head.appendChild(i);
                        break;
                      case "meta":
                        if (s = r1(
                          "meta",
                          "content",
                          r
                        ).get(e + (n.content || ""))) {
                          for (m = 0; m < s.length; m++)
                            if (i = s[m], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              s.splice(m, 1);
                              break e;
                            }
                        }
                        i = r.createElement(e), Cn(i, e, n), r.head.appendChild(i);
                        break;
                      default:
                        throw Error(a(468, e));
                    }
                    i[Ye] = t, nn(i), e = i;
                  }
                  t.stateNode = e;
                }
              else
                bn || jd(s, t.type, t.stateNode);
            else
              t.stateNode = u1(
                s,
                n,
                t.memoizedProps
              );
          else
            r !== n ? (r === null ? (e = i.stateNode, e === null || pe || e.parentNode.removeChild(e)) : r.count--, n === null ? bn || jd(s, t.type, t.stateNode) : u1(s, n, t.memoizedProps)) : n === null && t.stateNode !== null && Jh(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        Fn(e, t, n), Jn(t), r & 512 && (pe || i === null || zn(i, i.return)), i !== null && r & 4 && Jh(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (s = Tl, Tl = !1, Fn(e, t, n), Tl = s, Jn(t), r & 512 && (pe || i === null || zn(i, i.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            Uu(e, ""), de = !0;
          } catch (j) {
            ye(t, t.return, j);
          }
        }
        r & 4 && t.stateNode != null && (e = t.memoizedProps, Jh(
          t,
          e,
          i !== null ? i.memoizedProps : e
        )), r & 1024 && (nd = !0);
        break;
      case 6:
        if (Fn(e, t, n), Jn(t), r & 4) {
          if (t.stateNode === null)
            throw Error(a(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, de = !0;
          } catch (j) {
            ye(t, t.return, j);
          }
        }
        break;
      case 3:
        if (de = !1, wc = null, s = ol, ol = Eo(e.containerInfo), Fn(e, t, n), ol = s, Jn(t), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            vr(e.containerInfo);
          } catch (j) {
            ye(t, t.return, j);
          }
        nd && (nd = !1, ev(t)), de = !1;
        break;
      case 4:
        r = Tl, Tl = bn, i = bm(), s = ol, ol = Eo(
          t.stateNode.containerInfo
        ), Fn(e, t, n), Jn(t), ol = s, de && mo && (sc = !0), de = i, Tl = r;
        break;
      case 12:
        Fn(e, t, n), Jn(t);
        break;
      case 31:
        Fn(e, t, n), Jn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 13:
        Fn(e, t, n), Jn(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (mc = qt()), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 22:
        s = t.memoizedState !== null, m = i !== null && i.memoizedState !== null;
        var y = bn, x = pe, U = Tl;
        bn = y || s, Tl = U || s, pe = x || m, Fn(e, t, n), pe = x, Tl = U, bn = y, Jn(t), r & 8192 && (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, !s || i === null || m || bn || pe || (e = m || pe, n = bn, i = pe, bn = s || bn, pe = e, ga(t, 2), bn = n, pe = i), !s && Tl || ld(t, s)), r & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, fc(t, n))));
        break;
      case 19:
        Fn(e, t, n), Jn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 30:
        r & 512 && (pe || i === null || zn(i, i.return)), r = bm(), s = mo, m = (n & 335544064) === n, y = t.memoizedProps, mo = m && Ll(
          y.default,
          y.update
        ) !== "none", Fn(e, t, n), Jn(t), m && i !== null && de && (t.flags |= 4), mo = s, de = r;
        break;
      case 21:
        break;
      case 7:
        r & 512 && (pe || i === null || zn(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = t);
      default:
        Fn(e, t, n), Jn(t);
    }
  }
  function Jn(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (qp(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var r = t.return; r !== null; ) {
          if (Kh(r)) {
            var s = r.stateNode;
            i === null ? i = [s] : i.push(s);
          }
          if (Zh(r)) break;
          r = r.return;
        }
        var m = i;
        if (n == null) throw Error(a(160));
        switch (n.tag) {
          case 27:
            var y = n.stateNode, x = kh(t);
            ac(
              t,
              x,
              y,
              m
            );
            break;
          case 5:
            var U = n.stateNode;
            n.flags & 32 && (Uu(U, ""), n.flags &= -33);
            var j = kh(t);
            ac(
              t,
              j,
              U,
              m
            );
            break;
          case 3:
          case 4:
            var tt = n.stateNode.containerInfo, C = kh(t);
            Ph(
              t,
              C,
              tt,
              m
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (q) {
        ye(t, t.return, q);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function ev(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        ev(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, pr = !0, e.reset(), pr = !1), t = t.sibling;
      }
  }
  function Iu(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        nv(e, t), e = e.sibling;
    else Kp(e);
  }
  function nv(t, e) {
    var n = t.alternate;
    if (n === null) $h(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (id = El = !1, Gp(), Iu(e, t), !El && !sc) {
            if (t = Sl, t !== null)
              for (var i = 0; i < t.length; i += 3) {
                n = t[i];
                var r = t[i + 1];
                jv(n, t[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
                  { opacity: [0, 0], pointerEvents: ["none", "none"] },
                  {
                    duration: 0,
                    fill: "forwards",
                    pseudoElement: "::view-transition-group(" + r + ")"
                  }
                );
              }
            t = e.containerInfo, t = t.nodeType === 9 ? t.documentElement : t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "" && (t.style.viewTransitionName = "none", t.animate(
              { opacity: [0, 0], pointerEvents: ["none", "none"] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition-group(root)"
              }
            ), t.animate(
              { width: [0, 0], height: [0, 0] },
              {
                duration: 0,
                fill: "forwards",
                pseudoElement: "::view-transition"
              }
            )), id = !0;
          }
          Sl = null;
          break;
        case 5:
          Iu(e, t);
          break;
        case 4:
          i = El, El = !1, Iu(e, t), El && (sc = !0), El = i;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? $h(t, !1) : Iu(e, t));
          break;
        case 30:
          i = El, r = Gp(), El = !1, Iu(e, t), El && (t.flags |= 4);
          var s = t.memoizedProps, m = t.stateNode;
          e = Hl(s, m), m = Hl(n.memoizedProps, m);
          var y = Ll(s.default, s.update);
          y === "none" ? e = !1 : (s = n.memoizedState, n.memoizedState = null, n = t.child, ai = 0, e = ed(
            t,
            n,
            e,
            m,
            y,
            s,
            !0
          ), ai !== (s === null ? 0 : s.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ur(
            t,
            t.memoizedProps.onUpdate
          ), Sl = r) : r !== null && (r.push.apply(r, Sl), Sl = r), El = (t.flags & 32) !== 0 ? !0 : i;
          break;
        default:
          Iu(e, t);
      }
  }
  function xl(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Jp(t, e.alternate, e), e = e.sibling;
  }
  function ga(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, i = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ma(4, n, n.return), ga(
            n,
            i
          );
          break;
        case 1:
          zn(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Lp(
            n,
            n.return,
            r
          ), ga(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && e1(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          zn(n, n.return), n.tag !== 5 && n.tag !== 27 || ho(n), ga(
            n,
            i
          );
          break;
        case 6:
          ho(n);
          break;
        case 26:
          zn(n, n.return), r = n.stateNode, n.memoizedState !== null || r === null || pe || r.parentNode.removeChild(r), ga(
            n,
            i
          );
          break;
        case 22:
          n.memoizedState === null && ga(
            n,
            i
          );
          break;
        case 30:
          zn(n, n.return), ga(
            n,
            i
          );
          break;
        case 7:
          zn(n, n.return);
        default:
          ga(
            n,
            i
          );
      }
      t = t.sibling;
    }
  }
  function sl(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var i = e.alternate, r = t, s = e, m = s.flags, y = (n & 1) !== 0;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          sl(
            r,
            s,
            n
          ), fo(4, s);
          break;
        case 1:
          if (sl(
            r,
            s,
            n
          ), i = s, r = i.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (j) {
              ye(i, i.return, j);
            }
          if (i = s, r = i.updateQueue, r !== null) {
            var x = i.stateNode;
            try {
              var U = r.shared.hiddenCallbacks;
              if (U !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < U.length; r++)
                  xg(U[r], x);
            } catch (j) {
              ye(i, i.return, j);
            }
          }
          y && m & 64 && Hp(s), yl(s, s.return);
          break;
        case 27:
          (n & 2) !== 0 && Xp(s);
        case 5:
          s.tag !== 5 && s.tag !== 27 || Yp(s), sl(
            r,
            s,
            n
          ), y && i === null && m & 4 && Fh(s), yl(s, s.return);
          break;
        case 6:
          Yp(s);
          break;
        case 26:
          x = s.stateNode, s.memoizedState !== null || x === null || bn || jd(
            Eo(x.ownerDocument),
            s.type,
            x
          ), sl(
            r,
            s,
            n
          ), y && i === null && m & 4 && Fh(s), yl(s, s.return);
          break;
        case 12:
          sl(
            r,
            s,
            n
          );
          break;
        case 31:
          sl(
            r,
            s,
            n
          ), y && m & 4 && Wp(r, s);
          break;
        case 13:
          sl(
            r,
            s,
            n
          ), y && m & 4 && Ip(r, s);
          break;
        case 22:
          s.memoizedState === null && sl(
            r,
            s,
            n
          ), yl(s, s.return);
          break;
        case 30:
          sl(
            r,
            s,
            n
          ), yl(s, s.return);
          break;
        case 7:
          yl(s, s.return);
        default:
          sl(
            r,
            s,
            n
          );
      }
      e = e.sibling;
    }
  }
  function ud(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Wr(n));
  }
  function rd(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Wr(t));
  }
  function Pi(t, e, n, i) {
    var r = (n & 335544064) === n;
    if (e.subtreeFlags & (r ? 10262 : 10256))
      for (e = e.child; e !== null; )
        iv(
          t,
          e,
          n,
          i
        ), e = e.sibling;
    else r && Zp(e);
  }
  function iv(t, e, n, i) {
    var r = (n & 335544064) === n;
    r && e.alternate === null && e.return !== null && e.return.alternate !== null && oc(e);
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pi(
          t,
          e,
          n,
          i
        ), s & 2048 && fo(9, e);
        break;
      case 1:
        Pi(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        Pi(
          t,
          e,
          n,
          i
        ), r && id && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), s & 2048 && (s = null, e.alternate !== null && (s = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== s && (e.refCount++, s != null && Wr(s)));
        break;
      case 12:
        if (s & 2048) {
          Pi(
            t,
            e,
            n,
            i
          ), s = e.stateNode;
          try {
            var m = e.memoizedProps, y = m.id, x = m.onPostCommit;
            typeof x == "function" && x(
              y,
              e.alternate === null ? "mount" : "update",
              s.passiveEffectDuration,
              -0
            );
          } catch (U) {
            ye(e, e.return, U);
          }
        } else
          Pi(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        Pi(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        Pi(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        m = e.stateNode, y = e.alternate, e.memoizedState !== null ? (r && y !== null && y.memoizedState === null && oc(y), m._visibility & 2 ? Pi(
          t,
          e,
          n,
          i
        ) : go(
          t,
          e
        )) : (r && y !== null && y.memoizedState !== null && oc(e), m._visibility & 2 ? Pi(
          t,
          e,
          n,
          i
        ) : (m._visibility |= 2, tr(
          t,
          e,
          n,
          i,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), s & 2048 && ud(y, e);
        break;
      case 24:
        Pi(
          t,
          e,
          n,
          i
        ), s & 2048 && rd(e.alternate, e);
        break;
      case 30:
        r && (s = e.alternate, s !== null && (bl(s.child, !0), bl(e.child, !0))), Pi(
          t,
          e,
          n,
          i
        );
        break;
      default:
        Pi(
          t,
          e,
          n,
          i
        );
    }
  }
  function tr(t, e, n, i, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var s = t, m = e, y = n, x = i, U = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          tr(
            s,
            m,
            y,
            x,
            r
          ), fo(8, m);
          break;
        case 23:
          break;
        case 22:
          var j = m.stateNode;
          m.memoizedState !== null ? j._visibility & 2 ? tr(
            s,
            m,
            y,
            x,
            r
          ) : go(
            s,
            m
          ) : (j._visibility |= 2, tr(
            s,
            m,
            y,
            x,
            r
          )), r && U & 2048 && ud(
            m.alternate,
            m
          );
          break;
        case 24:
          tr(
            s,
            m,
            y,
            x,
            r
          ), r && U & 2048 && rd(m.alternate, m);
          break;
        default:
          tr(
            s,
            m,
            y,
            x,
            r
          );
      }
      e = e.sibling;
    }
  }
  function go(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, r = i.flags;
        switch (i.tag) {
          case 22:
            go(n, i), r & 2048 && ud(
              i.alternate,
              i
            );
            break;
          case 24:
            go(n, i), r & 2048 && rd(i.alternate, i);
            break;
          default:
            go(n, i);
        }
        e = e.sibling;
      }
  }
  var ru = 8192;
  function ou(t, e, n) {
    if (t.subtreeFlags & ru)
      for (t = t.child; t !== null; )
        lv(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function lv(t, e, n) {
    switch (t.tag) {
      case 26:
        ou(
          t,
          e,
          n
        ), t.flags & ru && (t.memoizedState !== null ? Rb(
          n,
          ol,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && f1(n, t)));
        break;
      case 5:
        ou(
          t,
          e,
          n
        ), t.flags & ru && (t = t.stateNode, (e & 335544128) === e && f1(n, t));
        break;
      case 3:
      case 4:
        var i = ol;
        ol = Eo(t.stateNode.containerInfo), ou(
          t,
          e,
          n
        ), ol = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = ru, ru = 16777216, ou(
          t,
          e,
          n
        ), ru = i) : ou(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & ru) !== 0 && (i = t.memoizedProps.name, i != null && i !== "auto")) {
          var r = t.stateNode;
          r.paired = null, Ti === null && (Ti = /* @__PURE__ */ new Map()), Ti.set(i, r);
        }
        ou(
          t,
          e,
          n
        );
        break;
      default:
        ou(
          t,
          e,
          n
        );
    }
  }
  function av(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function po(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          Tn = i, rv(
            i,
            t
          );
        }
      av(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        uv(t), t = t.sibling;
  }
  function uv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        po(t), t.flags & 2048 && ma(9, t, t.return);
        break;
      case 3:
        po(t);
        break;
      case 12:
        po(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, hc(t)) : po(t);
        break;
      default:
        po(t);
    }
  }
  function hc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          Tn = i, rv(
            i,
            t
          );
        }
      av(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, e, e.return), hc(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, hc(e));
          break;
        default:
          hc(e);
      }
      t = t.sibling;
    }
  }
  function rv(t, e) {
    for (; Tn !== null; ) {
      var n = Tn;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var i = n.memoizedState.cachePool.pool;
            i != null && i.refCount++;
          }
          break;
        case 24:
          Wr(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, Tn = i;
      else
        t: for (n = t; Tn !== null; ) {
          i = Tn;
          var r = i.sibling, s = i.return;
          if (Pp(i), i === n) {
            Tn = null;
            break t;
          }
          if (r !== null) {
            r.return = s, Tn = r;
            break t;
          }
          Tn = s;
        }
    }
  }
  var x2 = {
    getCacheForType: function(t) {
      var e = An(rn), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return An(rn).controller.signal;
    }
  }, M2 = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, Ae = null, ie = null, re = 0, _e = 0, Ei = null, pa = !1, er = !1, od = !1, Kl = 0, We = 0, va = 0, su = 0, dc = 0, xi = 0, nr = 0, vo = null, ri = null, sd = !1, mc = 0, ov = 0, gc = 1 / 0, pc = null, _a = null, je = 0, cl = null, cu = null, Ml = 0, cd = 0, fd = null, sv = null, ir = null, lr = null, ar = null, _o = 0, vc = null;
  function Mi() {
    return (ge & 2) !== 0 && re !== 0 ? re & -re : ot.T !== null ? bd() : Ue();
  }
  function cv() {
    if (xi === 0)
      if ((re & 536870912) === 0 || $t) {
        var t = At;
        At <<= 1, (At & 3932160) === 0 && (At = 262144), xi = t;
      } else xi = 536870912;
    return t = On.current, t !== null && (t.flags |= 32), xi;
  }
  function ur(t, e) {
    if (e != null) {
      var n = t.stateNode, i = n.ref;
      i === null && (i = n.ref = Qv(
        Hl(t.memoizedProps, n)
      )), lr === null && (lr = []), lr.push(e.bind(null, i));
    }
  }
  function oi(t, e, n) {
    (t === Ae && (_e === 2 || _e === 9) || t.cancelPendingCommit !== null) && (rr(t, 0), ya(
      t,
      re,
      xi,
      !1
    )), Ve(t, n), ((ge & 2) === 0 || t !== Ae) && (t === Ae && ((ge & 2) === 0 && (su |= n), We === 4 && ya(
      t,
      re,
      xi,
      !1
    )), wl(t));
  }
  function fv(t, e, n) {
    if ((ge & 6) !== 0) throw Error(a(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Qt(t, e), r = i ? O2(t, e) : dd(t, e, !0), s = i;
    do {
      if (r === 0) {
        er && !i && ya(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, s && !w2(n)) {
          r = dd(t, e, !1), s = !1;
          continue;
        }
        if (r === 2) {
          if (s = e, t.errorRecoveryDisabledLanes & s)
            var m = 0;
          else
            m = t.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            e = m;
            t: {
              var y = t;
              r = vo;
              var x = y.current.memoizedState.isDehydrated;
              if (x && (rr(y, m).flags |= 256), m = dd(
                y,
                m,
                !1
              ), m !== 2 && m !== 6) {
                if (od && !x) {
                  y.errorRecoveryDisabledLanes |= s, su |= s, r = 4;
                  break t;
                }
                s = ri, ri = r, s !== null && (ri === null ? ri = s : ri.push.apply(
                  ri,
                  s
                ));
              }
              r = m;
            }
            if (s = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          rr(t, 0), ya(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, s = r, s) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ya(
                i,
                e,
                xi,
                !pa
              );
              break t;
            case 2:
              ri = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((e & 62914560) === e && (r = mc + 300 - qt(), 10 < r)) {
            if (ya(
              i,
              e,
              xi,
              !pa
            ), Xt(i, 0, !0) !== 0) break t;
            Ml = e, i.timeoutHandle = Dd(
              hv.bind(
                null,
                i,
                n,
                ri,
                pc,
                sd,
                e,
                xi,
                su,
                nr,
                pa,
                s,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          hv(
            i,
            n,
            ri,
            pc,
            sd,
            e,
            xi,
            su,
            nr,
            pa,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    wl(t);
  }
  function hv(t, e, n, i, r, s, m, y, x, U, j, tt, C, q) {
    t.timeoutHandle = -1;
    var _t = e.subtreeFlags, Dt = (s & 335544064) === s;
    if (tt = null, (Dt || _t & 8192 || (_t & 16785408) === 16785408) && (tt = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: pl
    }, Ti = null, lv(
      e,
      s,
      tt
    ), Dt && (_t = tt, Dt = t.containerInfo, Dt = (Dt.nodeType === 9 ? Dt : Dt.ownerDocument).__reactViewTransition, Dt != null && (_t.count++, _t.waitingForViewTransition = !0, _t = wo.bind(_t), Dt.finished.then(_t, _t))), _t = (s & 62914560) === s ? mc - qt() : (s & 4194048) === s ? ov - qt() : 0, _t = zb(
      tt,
      _t
    ), _t !== null)) {
      Ml = s, t.cancelPendingCommit = _t(
        Sv.bind(
          null,
          t,
          e,
          s,
          n,
          i,
          r,
          m,
          y,
          x,
          U,
          j,
          tt,
          null,
          C,
          q
        )
      ), ya(t, s, m, !U);
      return;
    }
    Sv(
      t,
      e,
      s,
      n,
      i,
      r,
      m,
      y,
      x,
      U,
      j,
      tt
    );
  }
  function w2(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var r = n[i], s = r.getSnapshot;
          r = r.value;
          try {
            if (!Si(s(), r)) return !1;
          } catch {
            return !1;
          }
        }
      if (n = e.child, e.subtreeFlags & 16384 && n !== null)
        n.return = e, e = n;
      else {
        if (e === t) break;
        for (; e.sibling === null; ) {
          if (e.return === null || e.return === t) return !0;
          e = e.return;
        }
        e.sibling.return = e.return, e = e.sibling;
      }
    }
    return !0;
  }
  function ya(t, e, n, i) {
    e = Kt(t, e), e &= ~dc, e &= ~su, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var s = 31 - it(r), m = 1 << s;
      i[s] = -1, r &= ~m;
    }
    n !== 0 && Ne(t, n, e);
  }
  function _c() {
    return (ge & 6) === 0 ? (yo(0), !1) : !0;
  }
  function hd() {
    if (ie !== null) {
      if (_e === 0)
        var t = ie.return;
      else
        t = ie, Xl = $a = null, Sh(t), Fu = null, eo = 0, t = ie;
      for (; t !== null; )
        Bp(t.alternate, t), t = t.return;
      ie = null;
    }
  }
  function rr(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, P2(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Ml = 0, hd(), Ae = t, ie = n = Yl(t.current, null), re = e, _e = 0, Ei = null, pa = !1, er = Qt(t, e), od = !1, nr = xi = dc = su = va = We = 0, ri = vo = null, sd = !1, Kl = Kt(t, e), ws(), n;
  }
  function dv(t, e) {
    Ft = null, ot.H = $s, e === Ku || e === Ls ? (e = Sg(), _e = 3) : e === rh ? (e = Sg(), _e = 4) : _e = e === Bh ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Ei = e, ie === null && (We = 1, Ws(
      t,
      Ki(e, t.current)
    ));
  }
  function mv() {
    var t = On.current;
    return t === null ? !0 : (re & 4194048) === re ? Bn === null : (re & 62914560) === re || (re & 536870912) !== 0 ? t === Bn : !1;
  }
  function gv() {
    var t = ot.H;
    return ot.H = $s, t === null ? $s : t;
  }
  function pv() {
    var t = ot.A;
    return ot.A = x2, t;
  }
  function yc() {
    We = 4, pa || (re & 4194048) !== re && On.current !== null || (er = !0), (va & 134217727) === 0 && (su & 134217727) === 0 || Ae === null || ya(
      Ae,
      re,
      xi,
      !1
    );
  }
  function dd(t, e, n) {
    var i = ge;
    ge |= 2;
    var r = gv(), s = pv();
    (Ae !== t || re !== e) && (pc = null, rr(t, e)), e = !1;
    var m = We;
    t: do
      try {
        if (_e !== 0 && ie !== null) {
          var y = ie, x = Ei;
          switch (_e) {
            case 8:
              hd(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              On.current === null && (e = !0);
              var U = _e;
              if (_e = 0, Ei = null, or(t, y, x, U), n && er) {
                m = 0;
                break t;
              }
              break;
            default:
              U = _e, _e = 0, Ei = null, or(t, y, x, U);
          }
        }
        A2(), m = We;
        break;
      } catch (j) {
        dv(t, j);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Xl = $a = null, ge = i, ot.H = r, ot.A = s, ie === null && (Ae = null, re = 0, ws()), m;
  }
  function A2() {
    for (; ie !== null; ) vv(ie);
  }
  function O2(t, e) {
    var n = ge;
    ge |= 2;
    var i = gv(), r = pv();
    Ae !== t || re !== e ? (pc = null, gc = qt() + 500, rr(t, e)) : er = Qt(
      t,
      e
    );
    t: do
      try {
        if (_e !== 0 && ie !== null) {
          e = ie;
          var s = Ei;
          e: switch (_e) {
            case 1:
              _e = 0, Ei = null, or(t, e, s, 1);
              break;
            case 2:
            case 9:
              if (_g(s)) {
                _e = 0, Ei = null, _v(e);
                break;
              }
              e = function() {
                _e !== 2 && _e !== 9 || Ae !== t || (_e = 7), wl(t);
              }, s.then(e, e);
              break t;
            case 3:
              _e = 7;
              break t;
            case 4:
              _e = 5;
              break t;
            case 7:
              _g(s) ? (_e = 0, Ei = null, _v(e)) : (_e = 0, Ei = null, or(t, e, s, 7));
              break;
            case 5:
              var m = null;
              switch (ie.tag) {
                case 26:
                  m = ie.memoizedState;
                case 5:
                case 27:
                  var y = ie;
                  if (m ? s1(m) : y.stateNode.complete) {
                    _e = 0, Ei = null;
                    var x = y.sibling;
                    if (x !== null) ie = x;
                    else {
                      var U = y.return;
                      U !== null ? (ie = U, Sc(U)) : ie = null;
                    }
                    break e;
                  }
              }
              _e = 0, Ei = null, or(t, e, s, 5);
              break;
            case 6:
              _e = 0, Ei = null, or(t, e, s, 6);
              break;
            case 8:
              hd(), We = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        R2();
        break;
      } catch (j) {
        dv(t, j);
      }
    while (!0);
    return Xl = $a = null, ot.H = i, ot.A = r, ge = n, ie !== null ? 0 : (Ae = null, re = 0, ws(), We);
  }
  function R2() {
    for (; ie !== null && !ei(); )
      vv(ie);
  }
  function vv(t) {
    var e = Np(t.alternate, t, Kl);
    t.memoizedProps = t.pendingProps, e === null ? Sc(t) : ie = e;
  }
  function _v(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = wp(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          re
        );
        break;
      case 11:
        e = wp(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          re
        );
        break;
      case 5:
        Sh(e);
        var i = e;
        i === Sn && ($t ? (Ds(i), i.tag === 5 && i.stateNode != null && (ze = i.stateNode)) : (Ds(i), $t = !0));
      default:
        Bp(n, e), e = ie = rg(e, Kl), e = Np(n, e, Kl);
    }
    t.memoizedProps = t.pendingProps, e === null ? Sc(t) : ie = e;
  }
  function or(t, e, n, i) {
    Xl = $a = null, Sh(e), Fu = null, eo = 0;
    var r = e.return;
    try {
      if (p2(
        t,
        r,
        e,
        n,
        re
      )) {
        We = 1, Ws(
          t,
          Ki(n, t.current)
        ), ie = null;
        return;
      }
    } catch (s) {
      if (r !== null) throw ie = r, s;
      We = 1, Ws(
        t,
        Ki(n, t.current)
      ), ie = null;
      return;
    }
    e.flags & 32768 ? ($t || i === 1 ? t = !0 : er || (re & 536870912) !== 0 ? t = !1 : (pa = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = On.current, i !== null && i.tag === 13 && (i.flags |= 16384))), yv(e, t)) : Sc(e);
  }
  function Sc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        yv(
          e,
          pa
        );
        return;
      }
      t = e.return;
      var n = S2(
        e.alternate,
        e,
        Kl
      );
      if (n !== null) {
        ie = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        ie = e;
        return;
      }
      ie = e = t;
    } while (e !== null);
    We === 0 && (We = 5);
  }
  function yv(t, e) {
    do {
      var n = b2(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, ie = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        ie = t;
        return;
      }
      ie = t = n;
    } while (t !== null);
    We = 6, ie = null;
  }
  function Sv(t, e, n, i, r, s, m, y, x, U, j, tt) {
    t.cancelPendingCommit = null;
    do
      bc();
    while (je !== 0);
    if ((ge & 6) !== 0) throw Error(a(327));
    if (e !== null) {
      if (e === t.current) throw Error(a(177));
      t === Ae && (ie = Ae = null, re = 0), cu = e, cl = t, Ml = n, fd = r, sv = i, z2(
        t,
        e,
        n,
        m,
        y,
        x,
        tt
      );
    }
  }
  function z2(t, e, n, i, r, s, m) {
    var y = e.lanes | e.childLanes;
    if (cd = y, y |= Jf, we(
      t,
      n,
      y,
      i,
      r,
      s
    ), lr = null, (n & 335544064) === n ? (ar = l2(t), i = 10262) : (ar = null, i = 10256), (e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, H2(mn, function() {
      return vd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), uc = !1, i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
      i = ot.T, ot.T = null, r = gt.p, gt.p = 2, s = ge, ge |= 4;
      try {
        T2(t, e, n);
      } finally {
        ge = s, gt.p = r, ot.T = i;
      }
    }
    je = 1, uc ? ir = nb(
      m,
      t.containerInfo,
      ar,
      md,
      gd,
      D2,
      pd,
      vd,
      C2
    ) : (md(), gd(), pd());
  }
  function C2(t) {
    if (je !== 0) {
      var e = cl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function D2() {
    je === 3 && (je = 0, nv(cu, cl), je = 4);
  }
  function md() {
    if (je === 1) {
      je = 0;
      var t = cl, e = cu, n = Ml, i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        i = ot.T, ot.T = null;
        var r = gt.p;
        gt.p = 2;
        var s = ge;
        ge |= 4;
        try {
          mo = sc = !1, tv(e, t, n), n = Rd;
          var m = $m(t.containerInfo), y = n.focusedElem, x = n.selectionRange;
          if (m !== y && y && y.ownerDocument && Pm(
            y.ownerDocument.documentElement,
            y
          )) {
            if (x !== null && jf(y)) {
              var U = x.start, j = x.end;
              if (j === void 0 && (j = U), "selectionStart" in y)
                y.selectionStart = U, y.selectionEnd = Math.min(
                  j,
                  y.value.length
                );
              else {
                var tt = y.ownerDocument || document, C = tt && tt.defaultView || window;
                if (C.getSelection) {
                  var q = C.getSelection(), _t = y.textContent.length, Dt = Math.min(x.start, _t), Jt = x.end === void 0 ? Dt : Math.min(x.end, _t);
                  !q.extend && Dt > Jt && (m = Jt, Jt = Dt, Dt = m);
                  var N = km(
                    y,
                    Dt
                  ), O = km(
                    y,
                    Jt
                  );
                  if (N && O && (q.rangeCount !== 1 || q.anchorNode !== N.node || q.anchorOffset !== N.offset || q.focusNode !== O.node || q.focusOffset !== O.offset)) {
                    var H = tt.createRange();
                    H.setStart(N.node, N.offset), q.removeAllRanges(), Dt > Jt ? (q.addRange(H), q.extend(O.node, O.offset)) : (H.setEnd(O.node, O.offset), q.addRange(H));
                  }
                }
              }
            }
            for (tt = [], q = y; q = q.parentNode; )
              q.nodeType === 1 && tt.push({
                element: q,
                left: q.scrollLeft,
                top: q.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < tt.length; y++) {
              var W = tt[y];
              W.element.scrollLeft = W.left, W.element.scrollTop = W.top;
            }
          }
          pr = !!Od, Rd = Od = null;
        } finally {
          ge = s, gt.p = r, ot.T = i;
        }
      }
      t.current = e, je = 2;
    }
  }
  function gd() {
    if (je === 2) {
      je = 0;
      var t = cl, e = cu, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = ot.T, ot.T = null;
        var i = gt.p;
        gt.p = 2;
        var r = ge;
        ge |= 4;
        try {
          Jp(t, e.alternate, e);
        } finally {
          ge = r, gt.p = i, ot.T = n;
        }
      }
      je = 3;
    }
  }
  function pd() {
    if (je === 4 || je === 3) {
      je = 0;
      var t = ir;
      ir = null, qi();
      var e = cl, n = cu, i = Ml, r = sv, s = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? je = 5 : (je = 0, cu = cl = null, bv(e, e.pendingLanes)), s = e.pendingLanes, s === 0 && (_a = null), Ge(i), n = n.stateNode, rt && typeof rt.onCommitFiberRoot == "function")
        try {
          rt.onCommitFiberRoot(
            at,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = ot.T, s = gt.p, gt.p = 2, ot.T = null;
        try {
          for (var m = e.onRecoverableError, y = 0; y < r.length; y++) {
            var x = r[y];
            m(x.value, {
              componentStack: x.stack
            });
          }
        } finally {
          ot.T = n, gt.p = s;
        }
      }
      if (r = lr, m = ar, ar = null, r !== null && (lr = null, m === null && (m = []), t !== null))
        for (x = 0; x < r.length; x++)
          n = (0, r[x])(
            m
          ), n !== void 0 && t.finished.finally(n);
      (Ml & 3) !== 0 && bc(), wl(e), s = e.pendingLanes, (i & 261930) !== 0 && (s & 42) !== 0 ? e === vc ? _o++ : (_o = 0, vc = e) : (_o = 0, vc = null), yo(0);
    }
  }
  function bv(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Wr(e)));
  }
  function bc() {
    return ir !== null && (ir.skipTransition(), ir = null), md(), gd(), pd(), vd();
  }
  function vd() {
    if (je !== 5) return !1;
    var t = cl, e = cd;
    cd = 0;
    var n = Ge(Ml), i = ot.T, r = gt.p;
    try {
      gt.p = 32 > n ? 32 : n, ot.T = null, n = fd, fd = null;
      var s = cl, m = Ml;
      if (je = 0, cu = cl = null, Ml = 0, (ge & 6) !== 0) throw Error(a(331));
      var y = ge;
      if (ge |= 4, uv(s.current), iv(
        s,
        s.current,
        m,
        n
      ), ge = y, yo(0, !1), rt && typeof rt.onPostCommitFiberRoot == "function")
        try {
          rt.onPostCommitFiberRoot(at, s);
        } catch {
        }
      return !0;
    } finally {
      gt.p = r, ot.T = i, bv(t, e);
    }
  }
  function Tv(t, e, n) {
    e = Ki(n, e), e = Uh(t.stateNode, e, 2), t = ca(t, e, 2), t !== null && (Ve(t, 2), wl(t));
  }
  function ye(t, e, n) {
    if (t.tag === 3)
      Tv(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Tv(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (_a === null || !_a.has(i))) {
            t = Ki(n, t), n = _p(2), i = ca(e, n, 2), i !== null && (yp(
              n,
              i,
              e,
              t
            ), Ve(i, 2), wl(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function _d(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new M2();
      var r = /* @__PURE__ */ new Set();
      i.set(e, r);
    } else
      r = i.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(e, r));
    r.has(n) || (od = !0, r.add(n), t = N2.bind(null, t, e, n), e.then(t, t));
  }
  function N2(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Ae === t && (re & n) === n && ((We === 4 || We === 3 && (re & 62914560) === re && 300 > qt() - mc) && (ge & 2) === 0 ? rr(t, 0) : dc |= n, nr === re && (nr = 0)), wl(t);
  }
  function Ev(t, e) {
    e === 0 && (e = he()), t = Ja(t, e), t !== null && (Ve(t, e), wl(t));
  }
  function U2(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Ev(t, n);
  }
  function B2(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var i = t.stateNode, r = t.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case 19:
        i = t.stateNode;
        break;
      case 22:
        i = t.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    i !== null && i.delete(e), Ev(t, n);
  }
  function H2(t, e) {
    return Gn(t, e);
  }
  var sr = null, cr = null, yd = !1, Tc = !1, Sd = !1, Sa = 0;
  function wl(t) {
    t !== cr && t.next === null && (cr === null ? sr = cr = t : cr = cr.next = t), Tc = !0, yd || (yd = !0, Y2());
  }
  function yo(t, e) {
    if (!Sd && Tc) {
      Sd = !0;
      do
        for (var n = !1, i = sr; i !== null; ) {
          if (t !== 0) {
            var r = i.pendingLanes;
            if (r === 0) var s = 0;
            else {
              var m = i.suspendedLanes, y = i.pingedLanes;
              s = (1 << 31 - it(42 | t) + 1) - 1, s &= r & ~(m & ~y), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, Av(i, s));
          } else
            s = re, s = Xt(
              i,
              i === Ae ? s : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (s & 3) === 0 || Qt(i, s) || (n = !0, Av(i, s));
          i = i.next;
        }
      while (n);
      Sd = !1;
    }
  }
  function L2() {
    xv();
  }
  function xv() {
    Tc = yd = !1;
    var t = 0;
    Sa !== 0 && k2() && (t = Sa);
    for (var e = qt(), n = null, i = sr; i !== null; ) {
      var r = i.next, s = Mv(i, e);
      s === 0 ? (i.next = null, n === null ? sr = r : n.next = r, r === null && (cr = n)) : (n = i, (t !== 0 || (s & 3) !== 0) && (Tc = !0)), i = r;
    }
    je !== 0 && je !== 5 || yo(t), Sa !== 0 && (Sa = 0);
  }
  function Mv(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, r = t.expirationTimes, s = t.pendingLanes & -62914561; 0 < s; ) {
      var m = 31 - it(s), y = 1 << m, x = r[m];
      x === -1 ? ((y & n) === 0 || (y & i) !== 0) && (r[m] = Me(y, e)) : x <= e && (t.expiredLanes |= y), s &= ~y;
    }
    if (e = Ae, n = re, n = Xt(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (_e === 2 || _e === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && tn(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || Qt(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && tn(i), Ge(n)) {
        case 2:
        case 8:
          n = wn;
          break;
        case 32:
          n = mn;
          break;
        case 268435456:
          n = Gi;
          break;
        default:
          n = mn;
      }
      return i = wv.bind(null, t), n = Gn(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && tn(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function wv(t, e) {
    if (je !== 0 && je !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (bc() && t.callbackNode !== n)
      return null;
    var i = re;
    return i = Xt(
      t,
      t === Ae ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (fv(t, i, e), Mv(t, qt()), t.callbackNode != null && t.callbackNode === n ? wv.bind(null, t) : null);
  }
  function Av(t, e) {
    if (bc()) return null;
    fv(t, e, !0);
  }
  function Y2() {
    $2(function() {
      (ge & 6) !== 0 ? Gn(
        dn,
        L2
      ) : xv();
    });
  }
  function bd() {
    if (Sa === 0) {
      var t = tu;
      t === 0 && (t = Lt, Lt <<= 1, (Lt & 261888) === 0 && (Lt = 256)), Sa = t;
    }
    return Sa;
  }
  function Ov(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : _s(t);
  }
  function q2(t, e, n, i, r) {
    if (e === "submit" && n && n.stateNode === r) {
      var s = Ov(
        (r[Be] || null).action
      ), m = i.submitter;
      m && (e = (e = m[Be] || null) ? Ov(e.formAction) : m.getAttribute("formAction"), e !== null && (s = e, m = null));
      var y = new Ts(
        "action",
        "action",
        null,
        i,
        r
      );
      t.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (i.defaultPrevented) {
                if (Sa !== 0) {
                  var x = new FormData(r, m);
                  Rh(
                    n,
                    {
                      pending: !0,
                      data: x,
                      method: r.method,
                      action: s
                    },
                    null,
                    x
                  );
                }
              } else
                typeof s == "function" && (y.preventDefault(), x = new FormData(r, m), Rh(
                  n,
                  {
                    pending: !0,
                    data: x,
                    method: r.method,
                    action: s
                  },
                  s,
                  x
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var Td = 0; Td < Ff.length; Td++) {
    var Ed = Ff[Td], X2 = Ed.toLowerCase(), V2 = Ed[0].toUpperCase() + Ed.slice(1);
    ul(
      X2,
      "on" + V2
    );
  }
  ul(tg, "onAnimationEnd"), ul(eg, "onAnimationIteration"), ul(ng, "onAnimationStart"), ul("dblclick", "onDoubleClick"), ul("focusin", "onFocus"), ul("focusout", "onBlur"), ul(PS, "onTransitionRun"), ul($S, "onTransitionStart"), ul(WS, "onTransitionCancel"), ul(ig, "onTransitionEnd"), Du("onMouseEnter", ["mouseout", "mouseover"]), Du("onMouseLeave", ["mouseout", "mouseover"]), Du("onPointerEnter", ["pointerout", "pointerover"]), Du("onPointerLeave", ["pointerout", "pointerover"]), Za(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Za(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Za("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Za(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Za(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Za(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var So = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), G2 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(So)
  );
  function Rv(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], r = i.event;
      i = i.listeners;
      t: {
        var s = void 0;
        if (e)
          for (var m = i.length - 1; 0 <= m; m--) {
            var y = i[m], x = y.instance, U = y.currentTarget;
            if (y = y.listener, x !== s && r.isPropagationStopped())
              break t;
            s = y, r.currentTarget = U;
            try {
              s(r);
            } catch (j) {
              Ms(j);
            }
            r.currentTarget = null, s = x;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (y = i[m], x = y.instance, U = y.currentTarget, y = y.listener, x !== s && r.isPropagationStopped())
              break t;
            s = y, r.currentTarget = U;
            try {
              s(r);
            } catch (j) {
              Ms(j);
            }
            r.currentTarget = null, s = x;
          }
      }
    }
  }
  function le(t, e) {
    var n = e[_i];
    n === void 0 && (n = e[_i] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (zv(e, t, 2, !1), n.add(i));
  }
  function xd(t, e, n) {
    var i = 0;
    e && (i |= 4), zv(
      n,
      t,
      i,
      e
    );
  }
  var Ec = "_reactListening" + Math.random().toString(36).slice(2);
  function Md(t) {
    if (!t[Ec]) {
      t[Ec] = !0, vm.forEach(function(n) {
        n !== "selectionchange" && (G2.has(n) || xd(n, !1, t), xd(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ec] || (e[Ec] = !0, xd("selectionchange", !1, e));
    }
  }
  function zv(t, e, n, i) {
    switch (y1(e)) {
      case 2:
        var r = Ub;
        break;
      case 8:
        r = Bb;
        break;
      default:
        r = Zd;
    }
    n = r.bind(
      null,
      e,
      n,
      t
    ), r = void 0, !Nf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), i ? r !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, {
      passive: r
    }) : t.addEventListener(e, n, !1);
  }
  function wd(t, e, n, i, r) {
    var s = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var y = i.stateNode.containerInfo;
          if (y === r) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var x = m.tag;
              if ((x === 3 || x === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = Qn(y), m === null) return;
            if (x = m.tag, x === 5 || x === 6 || x === 26 || x === 27) {
              i = s = m;
              continue t;
            }
            y = y.parentNode;
          }
        }
        i = i.return;
      }
    zm(function() {
      var U = s, j = Cf(n), tt = [];
      t: {
        var C = lg.get(t);
        if (C !== void 0) {
          var q = Ts, _t = t;
          switch (t) {
            case "keypress":
              if (Ss(n) === 0) break t;
            case "keydown":
            case "keyup":
              q = wS;
              break;
            case "focusin":
              _t = "focus", q = Lf;
              break;
            case "focusout":
              _t = "blur", q = Lf;
              break;
            case "beforeblur":
            case "afterblur":
              q = Lf;
              break;
            case "click":
              if (n.button === 2) break t;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              q = Nm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              q = mS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              q = CS;
              break;
            case tg:
            case eg:
            case ng:
              q = vS;
              break;
            case ig:
              q = NS;
              break;
            case "scroll":
            case "scrollend":
              q = hS;
              break;
            case "wheel":
              q = BS;
              break;
            case "copy":
            case "cut":
            case "paste":
              q = yS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              q = Bm;
              break;
            case "submit":
              q = RS;
              break;
            case "toggle":
            case "beforetoggle":
              q = LS;
          }
          var Dt = (e & 4) !== 0, Jt = !Dt && (t === "scroll" || t === "scrollend"), N = Dt ? C !== null ? C + "Capture" : null : C;
          Dt = [];
          for (var O = U, H; O !== null; ) {
            var W = O;
            if (H = W.stateNode, W = W.tag, W !== 5 && W !== 26 && W !== 27 || H === null || N === null || (W = Vr(O, N), W != null && Dt.push(
              bo(O, W, H)
            )), Jt) break;
            O = O.return;
          }
          0 < Dt.length && (C = new q(
            C,
            _t,
            null,
            n,
            j
          ), tt.push({ event: C, listeners: Dt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (q = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout", q && n !== zf && (_t = n.relatedTarget || n.fromElement) && (Qn(_t) || _t[Je]))
            break t;
          (C || q) && (_t = j.window === j ? j : (q = j.ownerDocument) ? q.defaultView || q.parentWindow : window, C ? (q = n.relatedTarget || n.toElement, C = U, q = q ? Qn(q) : null, q !== null && (Jt = c(q), Dt = q.tag, q !== Jt || Dt !== 5 && Dt !== 27 && Dt !== 6) && (q = null)) : (C = null, q = U), C !== q && (Dt = Nm, W = "onMouseLeave", N = "onMouseEnter", O = "mouse", (t === "pointerout" || t === "pointerover") && (Dt = Bm, W = "onPointerLeave", N = "onPointerEnter", O = "pointer"), Jt = C == null ? _t : Qa(C), H = q == null ? _t : Qa(q), _t = new Dt(
            W,
            O + "leave",
            C,
            n,
            j
          ), _t.target = Jt, _t.relatedTarget = H, W = null, Qn(j) === U && (Dt = new Dt(
            N,
            O + "enter",
            q,
            n,
            j
          ), Dt.target = H, Dt.relatedTarget = Jt, W = Dt), Jt = W, Dt = C && q ? k(
            C,
            q,
            j2
          ) : null, C !== null && Cv(
            tt,
            _t,
            C,
            Dt,
            !1
          ), q !== null && Jt !== null && Cv(
            tt,
            Jt,
            q,
            Dt,
            !0
          )));
        }
        t: {
          if (C = U ? Qa(U) : window, q = C.nodeName && C.nodeName.toLowerCase(), q === "select" || q === "input" && C.type === "file")
            var wt = jm;
          else if (Vm(C))
            if (Qm)
              wt = FS;
            else {
              wt = ZS;
              var oe = QS;
            }
          else
            q = C.nodeName, !q || q.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? U && Rf(U.elementType) && (wt = jm) : wt = KS;
          if (wt && (wt = wt(t, U))) {
            Gm(
              tt,
              wt,
              n,
              j
            );
            break t;
          }
          oe && oe(t, C, U);
        }
        switch (oe = U ? Qa(U) : window, t) {
          case "focusin":
            (Vm(oe) || oe.contentEditable === "true") && (Yu = oe, Qf = U, kr = null);
            break;
          case "focusout":
            kr = Qf = Yu = null;
            break;
          case "mousedown":
            Zf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            Zf = !1, Wm(tt, n, j);
            break;
          case "selectionchange":
            if (kS) break;
          case "keydown":
          case "keyup":
            Wm(tt, n, j);
        }
        var Bt;
        if (qf)
          t: {
            switch (t) {
              case "compositionstart":
                var Gt = "onCompositionStart";
                break t;
              case "compositionend":
                Gt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Gt = "onCompositionUpdate";
                break t;
            }
            Gt = void 0;
          }
        else
          Lu ? qm(t, n) && (Gt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (Gt = "onCompositionStart");
        Gt && (Hm && n.locale !== "ko" && (Lu || Gt !== "onCompositionStart" ? Gt === "onCompositionEnd" && Lu && (Bt = Cm()) : (ea = j, Uf = "value" in ea ? ea.value : ea.textContent, Lu = !0)), oe = xc(U, Gt), 0 < oe.length && (Gt = new Um(
          Gt,
          t,
          null,
          n,
          j
        ), tt.push({ event: Gt, listeners: oe }), Bt ? Gt.data = Bt : (Bt = Xm(n), Bt !== null && (Gt.data = Bt)))), (Bt = qS ? XS(t, n) : VS(t, n)) && (Gt = xc(U, "onBeforeInput"), 0 < Gt.length && (oe = new Um(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          j
        ), tt.push({
          event: oe,
          listeners: Gt
        }), oe.data = Bt)), q2(
          tt,
          t,
          U,
          n,
          j
        );
      }
      Rv(tt, e);
    });
  }
  function bo(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function xc(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var r = t, s = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || s === null || (r = Vr(t, n), r != null && i.unshift(
        bo(t, r, s)
      ), r = Vr(t, e), r != null && i.push(
        bo(t, r, s)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function j2(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Cv(t, e, n, i, r) {
    for (var s = e._reactName, m = []; n !== null && n !== i; ) {
      var y = n, x = y.alternate, U = y.stateNode;
      if (y = y.tag, x !== null && x === i) break;
      y !== 5 && y !== 26 && y !== 27 || U === null || (x = U, r ? (U = Vr(n, s), U != null && m.unshift(
        bo(n, U, x)
      )) : r || (U = Vr(n, s), U != null && m.push(
        bo(n, U, x)
      ))), n = n.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var Q2 = /\r\n?/g, Z2 = /\u0000|\uFFFD/g;
  function Dv(t) {
    return (typeof t == "string" ? t : "" + t).replace(Q2, `
`).replace(Z2, "");
  }
  function Nv(t, e) {
    return e = Dv(e), Dv(t) === e;
  }
  function Se(t, e, n, i, r, s) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          e === "body" || e === "textarea" && i === "" || Uu(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          e !== "body" && Uu(t, "" + i);
        else return;
        break;
      case "className":
        vs(t, "class", i);
        break;
      case "tabIndex":
        vs(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        vs(t, n, i);
        break;
      case "style":
        Om(t, i, s);
        return;
      case "data":
        if (e !== "object") {
          vs(t, "data", i);
          break;
        }
      case "src":
      case "href":
        if (i === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (i == null || typeof i == "function" || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = _s(i), t.setAttribute(n, i);
        break;
      case "action":
      case "formAction":
        if (typeof i == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof s == "function" && (n === "formAction" ? (e !== "input" && Se(t, e, "name", r.name, r, null), Se(
            t,
            e,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Se(
            t,
            e,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Se(
            t,
            e,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Se(t, e, "encType", r.encType, r, null), Se(t, e, "method", r.method, r, null), Se(t, e, "target", r.target, r, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = _s(i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = pl);
        return;
      case "onScroll":
        i != null && le("scroll", t);
        return;
      case "onScrollEnd":
        i != null && le("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (n = i.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            s?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "muted":
        t.muted = i && typeof i != "function" && typeof i != "symbol";
        break;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "defaultValue":
      case "defaultChecked":
      case "innerHTML":
      case "ref":
        break;
      case "autoFocus":
        break;
      case "xlinkHref":
        if (i == null || typeof i == "function" || typeof i == "boolean" || typeof i == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = _s(i), t.setAttributeNS(
          "http://www.w3.org/1999/xlink",
          "xlink:href",
          n
        );
        break;
      case "contentEditable":
      case "spellCheck":
      case "draggable":
      case "value":
      case "autoReverse":
      case "externalResourcesRequired":
      case "focusable":
      case "preserveAlpha":
        i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "inert":
      case "allowFullScreen":
      case "async":
      case "autoPlay":
      case "controls":
      case "credentialless":
      case "default":
      case "defer":
      case "disabled":
      case "disablePictureInPicture":
      case "disableRemotePlayback":
      case "formNoValidate":
      case "hidden":
      case "loop":
      case "noModule":
      case "noValidate":
      case "open":
      case "playsInline":
      case "readOnly":
      case "required":
      case "reversed":
      case "scoped":
      case "seamless":
      case "itemScope":
        i && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        i === !0 ? t.setAttribute(n, "") : i !== !1 && i != null && typeof i != "function" && typeof i != "symbol" ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        i != null && typeof i != "function" && typeof i != "symbol" && !isNaN(i) && 1 <= i ? t.setAttribute(n, i) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        i == null || typeof i == "function" || typeof i == "symbol" || isNaN(i) ? t.removeAttribute(n) : t.setAttribute(n, i);
        break;
      case "popover":
        le("beforetoggle", t), le("toggle", t), ps(t, "popover", i);
        break;
      case "xlinkActuate":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          i
        );
        break;
      case "xlinkArcrole":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          i
        );
        break;
      case "xlinkRole":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          i
        );
        break;
      case "xlinkShow":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          i
        );
        break;
      case "xlinkTitle":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          i
        );
        break;
      case "xlinkType":
        Ul(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          i
        );
        break;
      case "xmlBase":
        Ul(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          i
        );
        break;
      case "xmlLang":
        Ul(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          i
        );
        break;
      case "xmlSpace":
        Ul(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          i
        );
        break;
      case "is":
        ps(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = cS.get(n) || n, ps(t, n, i);
        else return;
    }
    de = !0;
  }
  function Ad(t, e, n, i, r, s) {
    switch (n) {
      case "style":
        Om(t, i, s);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (n = i.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            s?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof i == "string") Uu(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          Uu(t, "" + i);
        else return;
        break;
      case "onScroll":
        i != null && le("scroll", t);
        return;
      case "onScrollEnd":
        i != null && le("scrollend", t);
        return;
      case "onClick":
        i != null && (t.onclick = pl);
        return;
      case "suppressContentEditableWarning":
      case "suppressHydrationWarning":
      case "innerHTML":
      case "ref":
        return;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!_m.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), s = n.slice(2, r ? n.length - 7 : void 0), e = t[Be] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(s, e, r), typeof i == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(s, i, r);
              break t;
            }
            de = !0, n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : ps(t, n, i);
          }
        return;
    }
    de = !0;
  }
  function Cn(t, e, n) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "img":
        le("error", t), le("load", t);
        var i = !1, r = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var m = n[s];
            if (m != null)
              switch (s) {
                case "src":
                  i = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, e));
                default:
                  Se(t, e, s, m, n, null);
              }
          }
        r && Se(t, e, "srcSet", n.srcSet, n, null), i && Se(t, e, "src", n.src, n, null);
        return;
      case "input":
        le("invalid", t);
        var y = s = m = r = null, x = null, U = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var j = n[i];
            if (j != null)
              switch (i) {
                case "name":
                  r = j;
                  break;
                case "type":
                  m = j;
                  break;
                case "checked":
                  x = j;
                  break;
                case "defaultChecked":
                  U = j;
                  break;
                case "value":
                  s = j;
                  break;
                case "defaultValue":
                  y = j;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (j != null)
                    throw Error(a(137, e));
                  break;
                default:
                  Se(t, e, i, j, n, null);
              }
          }
        xm(
          t,
          s,
          y,
          x,
          U,
          m,
          r,
          !1
        );
        return;
      case "select":
        le("invalid", t), i = m = s = null;
        for (r in n)
          if (n.hasOwnProperty(r) && (y = n[r], y != null))
            switch (r) {
              case "value":
                s = y;
                break;
              case "defaultValue":
                m = y;
                break;
              case "multiple":
                i = y;
              default:
                Se(t, e, r, y, n, null);
            }
        e = s, n = m, t.multiple = !!i, e != null ? Nu(t, !!i, e, !1) : n != null && Nu(t, !!i, n, !0);
        return;
      case "textarea":
        le("invalid", t), s = r = i = null;
        for (m in n)
          if (n.hasOwnProperty(m) && (y = n[m], y != null))
            switch (m) {
              case "value":
                i = y;
                break;
              case "defaultValue":
                r = y;
                break;
              case "children":
                s = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(a(91));
                break;
              default:
                Se(t, e, m, y, n, null);
            }
        wm(t, i, r, s);
        return;
      case "option":
        for (x in n)
          n.hasOwnProperty(x) && (i = n[x], i != null) && (x === "selected" ? t.selected = i && typeof i != "function" && typeof i != "symbol" : Se(t, e, x, i, n, null));
        return;
      case "dialog":
        le("beforetoggle", t), le("toggle", t), le("cancel", t), le("close", t);
        break;
      case "iframe":
      case "object":
        le("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < So.length; i++)
          le(So[i], t);
        break;
      case "image":
        le("error", t), le("load", t);
        break;
      case "details":
        le("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        le("error", t), le("load", t);
      case "area":
      case "base":
      case "br":
      case "col":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "track":
      case "wbr":
      case "menuitem":
        for (U in n)
          if (n.hasOwnProperty(U) && (i = n[U], i != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, e));
              default:
                Se(t, e, U, i, n, null);
            }
        return;
      default:
        if (Rf(e)) {
          for (j in n)
            n.hasOwnProperty(j) && (i = n[j], i !== void 0 && Ad(
              t,
              e,
              j,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (i = n[y], i != null && Se(t, e, y, i, n, null));
  }
  var K2 = {};
  function F2(t, e, n, i) {
    switch (e) {
      case "div":
      case "span":
      case "svg":
      case "path":
      case "a":
      case "g":
      case "p":
      case "li":
        break;
      case "input":
        var r = null, s = null, m = null, y = null, x = null, U = null, j = null;
        for (q in n) {
          var tt = n[q];
          if (n.hasOwnProperty(q) && tt != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = tt;
              default:
                i.hasOwnProperty(q) || Se(t, e, q, null, i, tt);
            }
        }
        for (var C in i) {
          var q = i[C];
          if (tt = n[C], i.hasOwnProperty(C) && (q != null || tt != null))
            switch (C) {
              case "type":
                q !== tt && (de = !0), s = q;
                break;
              case "name":
                q !== tt && (de = !0), r = q;
                break;
              case "checked":
                q !== tt && (de = !0), U = q;
                break;
              case "defaultChecked":
                q !== tt && (de = !0), j = q;
                break;
              case "value":
                q !== tt && (de = !0), m = q;
                break;
              case "defaultValue":
                q !== tt && (de = !0), y = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(a(137, e));
                break;
              default:
                q !== tt && Se(
                  t,
                  e,
                  C,
                  q,
                  i,
                  tt
                );
            }
        }
        Af(
          t,
          m,
          y,
          x,
          U,
          j,
          s,
          r
        );
        return;
      case "select":
        q = m = y = C = null;
        for (s in n)
          if (x = n[s], n.hasOwnProperty(s) && x != null)
            switch (s) {
              case "value":
                break;
              case "multiple":
                q = x;
              default:
                i.hasOwnProperty(s) || Se(
                  t,
                  e,
                  s,
                  null,
                  i,
                  x
                );
            }
        for (r in i)
          if (s = i[r], x = n[r], i.hasOwnProperty(r) && (s != null || x != null))
            switch (r) {
              case "value":
                s !== x && (de = !0), C = s;
                break;
              case "defaultValue":
                s !== x && (de = !0), y = s;
                break;
              case "multiple":
                s !== x && (de = !0), m = s;
              default:
                s !== x && Se(
                  t,
                  e,
                  r,
                  s,
                  i,
                  x
                );
            }
        e = y, n = m, i = q, C != null ? Nu(t, !!n, C, !1) : !!i != !!n && (e != null ? Nu(t, !!n, e, !0) : Nu(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        q = C = null;
        for (y in n)
          if (r = n[y], n.hasOwnProperty(y) && r != null && !i.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Se(t, e, y, null, i, r);
            }
        for (m in i)
          if (r = i[m], s = n[m], i.hasOwnProperty(m) && (r != null || s != null))
            switch (m) {
              case "value":
                r !== s && (de = !0), C = r;
                break;
              case "defaultValue":
                r !== s && (de = !0), q = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(a(91));
                break;
              default:
                r !== s && Se(t, e, m, r, i, s);
            }
        Mm(t, C, q);
        return;
      case "option":
        for (var _t in n)
          C = n[_t], n.hasOwnProperty(_t) && C != null && !i.hasOwnProperty(_t) && (_t === "selected" ? t.selected = !1 : Se(
            t,
            e,
            _t,
            null,
            i,
            C
          ));
        for (x in i)
          C = i[x], q = n[x], i.hasOwnProperty(x) && C !== q && (C != null || q != null) && (x === "selected" ? (C !== q && (de = !0), t.selected = C && typeof C != "function" && typeof C != "symbol") : Se(
            t,
            e,
            x,
            C,
            i,
            q
          ));
        return;
      case "img":
      case "link":
      case "area":
      case "base":
      case "br":
      case "col":
      case "embed":
      case "hr":
      case "keygen":
      case "meta":
      case "param":
      case "source":
      case "track":
      case "wbr":
      case "menuitem":
        for (var Dt in n)
          C = n[Dt], n.hasOwnProperty(Dt) && C != null && !i.hasOwnProperty(Dt) && Se(t, e, Dt, null, i, C);
        for (U in i)
          if (C = i[U], q = n[U], i.hasOwnProperty(U) && C !== q && (C != null || q != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(a(137, e));
                break;
              default:
                Se(
                  t,
                  e,
                  U,
                  C,
                  i,
                  q
                );
            }
        return;
      default:
        if (Rf(e)) {
          for (var Jt in n)
            C = n[Jt], n.hasOwnProperty(Jt) && C !== void 0 && !i.hasOwnProperty(Jt) && Ad(
              t,
              e,
              Jt,
              void 0,
              i,
              C
            );
          for (j in i)
            C = i[j], q = n[j], !i.hasOwnProperty(j) || C === q || C === void 0 && q === void 0 || Ad(
              t,
              e,
              j,
              C,
              i,
              q
            );
          return;
        }
    }
    for (var N in n)
      C = n[N], n.hasOwnProperty(N) && C != null && !i.hasOwnProperty(N) && Se(t, e, N, null, i, C);
    for (tt in i)
      C = i[tt], q = n[tt], !i.hasOwnProperty(tt) || C === q || C == null && q == null || Se(t, e, tt, C, i, q);
  }
  function Uv(t) {
    switch (t) {
      case "css":
      case "script":
      case "font":
      case "img":
      case "image":
      case "input":
      case "link":
        return !0;
      default:
        return !1;
    }
  }
  function J2() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var r = n[i], s = r.transferSize, m = r.initiatorType, y = r.duration;
        if (s && y && Uv(m)) {
          for (m = 0, y = r.responseEnd, i += 1; i < n.length; i++) {
            var x = n[i], U = x.startTime;
            if (U > y) break;
            var j = x.transferSize, tt = x.initiatorType;
            j && Uv(tt) && (x = x.responseEnd, m += j * (x < y ? 1 : (y - U) / (x - U)));
          }
          if (--i, e += 8 * (s + m) / (r.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Od = null, Rd = null;
  function To(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Bv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Hv(t, e) {
    if (t === 0)
      switch (e) {
        case "svg":
          return 1;
        case "math":
          return 2;
        default:
          return 0;
      }
    return t === 1 && e === "foreignObject" ? 0 : t;
  }
  function Lv(t, e, n, i) {
    return n = To(
      n
    ).createElement(t), n[Ye] = i, n[Be] = e, Cn(n, t, e), nn(n), n;
  }
  function zd(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Cd = null;
  function k2() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Cd ? !1 : (Cd = t, !0) : (Cd = null, !1);
  }
  var Dd = typeof setTimeout == "function" ? setTimeout : void 0, P2 = typeof clearTimeout == "function" ? clearTimeout : void 0, Yv = typeof Promise == "function" ? Promise : void 0, qv = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Dd, $2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yv < "u" ? function(t) {
    return Yv.resolve(null).then(t).catch(W2);
  } : Dd;
  function W2(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ba(t) {
    return t === "head";
  }
  function Xv(t, e) {
    var n = e, i = 0;
    do {
      var r = n.nextSibling;
      if (t.removeChild(n), r && r.nodeType === 8)
        if (n = r.data, n === "/$" || n === "/&") {
          if (i === 0) {
            t.removeChild(r), vr(e);
            return;
          }
          i--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          i++;
        else if (n === "html")
          Xd(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Xd(n);
          for (var s = n.firstChild; s; ) {
            var m = s.nextSibling, y = s.nodeName;
            s[ke] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = m;
          }
        } else
          n === "body" && Xd(t.ownerDocument.body);
      n = r;
    } while (n);
    vr(e);
  }
  function Vv(t, e) {
    var n = t;
    t = 0;
    do {
      var i = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), i && i.nodeType === 8)
        if (n = i.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = i;
    } while (n);
  }
  function Gv(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var i = 1;
      else
        for (var r = i = 0; r < e.length; r++) {
          var s = e[r];
          0 < s.width && 0 < s.height && i++;
        }
      i === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function jv(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function I2(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function Nd(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return I2(e, n, t);
  }
  function tb(t) {
    return t.documentElement.clientHeight;
  }
  function eb(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function nb(t, e, n, i, r, s, m, y, x) {
    var U = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var j = U.startViewTransition({
        update: function() {
          var C = U.defaultView, q = C.navigation && C.navigation.transition, _t = U.fonts.status;
          i();
          var Dt = [];
          if (_t === "loaded" && (tb(U), U.fonts.status === "loading" && Dt.push(U.fonts.ready)), _t = Dt.length, t !== null)
            for (var Jt = t.suspenseyImages, N = 0, O = 0; O < Jt.length; O++) {
              var H = Jt[O];
              if (!H.complete) {
                var W = H.getBoundingClientRect();
                if (0 < W.bottom && 0 < W.right && W.top < C.innerHeight && W.left < C.innerWidth) {
                  if (N += c1(H), N > Ac) {
                    Dt.length = _t;
                    break;
                  }
                  H = new Promise(
                    eb.bind(H)
                  ), Dt.push(H);
                }
              }
            }
          if (0 < Dt.length)
            return C = Promise.race([
              Promise.all(Dt),
              new Promise(function(wt) {
                return setTimeout(wt, 500);
              })
            ]).then(r, r), (q ? Promise.allSettled([q.finished, C]) : C).then(s, s);
          if (r(), q)
            return q.finished.then(
              s,
              s
            );
          s();
        },
        types: n
      });
      U.__reactViewTransition = j;
      var tt = [];
      return j.ready.then(
        function() {
          for (var C = U.documentElement.getAnimations({
            subtree: !0
          }), q = 0; q < C.length; q++) {
            var _t = C[q], Dt = _t.effect, Jt = Dt.pseudoElement;
            if (Jt != null && Jt.startsWith("::view-transition")) {
              tt.push(_t), _t = Dt.getKeyframes();
              for (var N = Jt = void 0, O = !0, H = 0; H < _t.length; H++) {
                var W = _t[H], wt = W.width;
                if (Jt === void 0) Jt = wt;
                else if (Jt !== wt) {
                  O = !1;
                  break;
                }
                if (wt = W.height, N === void 0) N = wt;
                else if (N !== wt) {
                  O = !1;
                  break;
                }
                delete W.width, delete W.height, W.transform === "none" && delete W.transform;
              }
              O && Jt !== void 0 && N !== void 0 && (Dt.setKeyframes(_t), O = getComputedStyle(
                Dt.target,
                Dt.pseudoElement
              ), O.width !== Jt || O.height !== N) && (O = _t[0], O.width = Jt, O.height = N, O = _t[_t.length - 1], O.width = Jt, O.height = N, Dt.setKeyframes(_t));
            }
          }
          m();
        },
        function(C) {
          U.__reactViewTransition === j && (U.__reactViewTransition = null);
          try {
            typeof C == "object" && C !== null && C.name === "InvalidStateError" && (C.message === "View transition was skipped because document visibility state is hidden." || C.message === "Skipping view transition because document visibility state has become hidden." || C.message === "Skipping view transition because viewport size changed." || C.message === "Transition was aborted because of invalid state") && (C = null), C !== null && x(C);
          } finally {
            i(), r(), m();
          }
        }
      ), j.finished.finally(function() {
        for (var C = 0; C < tt.length; C++)
          tt[C].cancel();
        U.__reactViewTransition === j && (U.__reactViewTransition = null), y();
      }), j;
    } catch {
      return i(), r(), m(), null;
    }
  }
  function fu(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  fu.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : D({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, fu.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), i = [], r = 0; r < n.length; r++) {
      var s = n[r].effect;
      s !== null && s.target === t && s.pseudoElement === e && i.push(n[r]);
    }
    return i;
  }, fu.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function Qv(t) {
    return {
      name: t,
      group: new fu("group", t),
      imagePair: new fu("image-pair", t),
      old: new fu("old", t),
      new: new fu("new", t)
    };
  }
  function wi(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  wi.prototype.addEventListener = function(t, e, n) {
    var i = null, r = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var s = this._eventListeners;
      if (Kv(s, t, e, n) === -1) {
        var m = this, y = e;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(x) {
          m.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, x) : e.handleEvent(x);
        }), i !== null && (r = m.removeEventListener.bind(
          m,
          t,
          e,
          n
        ), i.addEventListener("abort", r, { once: !0 }), r = i.removeEventListener.bind(i, "abort", r)), i = fr(n), s.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: r
        }), _(
          this._fragmentFiber.child,
          !1,
          ib,
          t,
          y,
          i
        );
      }
      this._eventListeners = s;
    }
  };
  function ib(t, e, n, i) {
    return R(t).addEventListener(
      e,
      n,
      i
    ), !1;
  }
  wi.prototype.removeEventListener = function(t, e, n) {
    var i = this._eventListeners;
    if (i !== null && (e = Kv(
      i,
      t,
      e,
      n
    ), e !== -1)) {
      var r = i[e];
      n = r.attachedListener;
      var s = r.cleanup;
      r = fr(r.optionsOrUseCapture), _(
        this._fragmentFiber.child,
        !1,
        lb,
        t,
        n,
        r
      ), i.splice(e, 1), s !== null && s();
    }
  };
  function lb(t, e, n, i) {
    return R(t).removeEventListener(
      e,
      n,
      i
    ), !1;
  }
  function fr(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Zv(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Kv(t, e, n, i) {
    if (t.length === 0) return -1;
    i = Zv(i);
    for (var r = 0; r < t.length; r++) {
      var s = t[r];
      if (s.type === e && s.listener === n && Zv(s.optionsOrUseCapture) === i)
        return r;
    }
    return -1;
  }
  wi.prototype.dispatchEvent = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = R(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var i = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          i.addEventListener(
            s.type,
            s.attachedListener,
            fr(s.optionsOrUseCapture)
          );
        }
      if (e.appendChild(i), t = i.dispatchEvent(t), n)
        for (r = 0; r < n.length; r++)
          s = n[r], i.removeEventListener(
            s.type,
            s.attachedListener,
            fr(s.optionsOrUseCapture)
          );
      return e.removeChild(i), t;
    }
    return e.dispatchEvent(t);
  }, wi.prototype.focus = function(t) {
    _(
      this._fragmentFiber.child,
      !0,
      Fv,
      t,
      void 0,
      void 0
    );
  };
  function Fv(t, e) {
    return t.tag === 6 ? !1 : (t = R(t), pb(t, e));
  }
  wi.prototype.focusLast = function(t) {
    var e = [];
    _(
      this._fragmentFiber.child,
      !0,
      Ud,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !Fv(e[n], t); n--) ;
  };
  function Ud(t, e) {
    return e.push(t), !1;
  }
  wi.prototype.blur = function() {
    var t = S(
      this._fragmentFiber
    );
    t !== null && (t = R(t), t = To(t).activeElement, t !== null && _(
      this._fragmentFiber.child,
      !1,
      ab,
      t,
      void 0,
      void 0
    ));
  };
  function ab(t, e) {
    return t.tag === 6 ? !1 : (t = R(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  wi.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), _(
      this._fragmentFiber.child,
      !1,
      ub,
      t,
      void 0,
      void 0
    );
  };
  function ub(t, e) {
    return t.tag === 6 || (t = R(t), e.observe(t)), !1;
  }
  wi.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), _(
        this._fragmentFiber.child,
        !1,
        rb,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < fl.length; n++) {
        var i = fl[n];
        i.fragmentInstance === this && i.observer === t ? t.unobserve(i.instance) : fl[e++] = i;
      }
      fl.length = e;
    }
  };
  function rb(t, e) {
    return t.tag === 6 || (t = R(t), e.unobserve(t)), !1;
  }
  var fl = [], Bd = !1;
  function ob(t, e, n) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Bd || (Bd = !0, vb(function() {
      Bd = !1;
      var i = fl;
      fl = [];
      for (var r = 0; r < i.length; r++) {
        var s = i[r];
        s.observer.unobserve(s.instance);
      }
    }));
  }
  wi.prototype.getClientRects = function() {
    var t = [];
    return _(
      this._fragmentFiber.child,
      !1,
      sb,
      t,
      void 0,
      void 0
    ), t;
  };
  function sb(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = R(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  wi.prototype.getRootNode = function(t) {
    var e = S(
      this._fragmentFiber
    );
    return e === null ? this : R(e).getRootNode(t);
  }, wi.prototype.compareDocumentPosition = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    _(
      this._fragmentFiber.child,
      !1,
      Ud,
      n,
      void 0,
      void 0
    );
    var i = R(e);
    if (n.length === 0) {
      if (n = i, b(this._fragmentFiber)) {
        t: {
          for (e = this._fragmentFiber.return; e !== null; ) {
            if (e.tag === 4) {
              e = e.stateNode.containerInfo;
              break t;
            }
            if (e.tag === 3 || e.tag === 5 || e.tag === 27)
              break;
            e = e.return;
          }
          e = null;
        }
        e != null && (n = e);
      }
      e = this._fragmentFiber;
      var r = i = n.compareDocumentPosition(t);
      return n === t ? r = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = M(e)[1], n === null ? r = Node.DOCUMENT_POSITION_PRECEDING : (t = R(n).compareDocumentPosition(
        t
      ), r = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), r |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = R(n[0]), r = R(n[n.length - 1]);
    var s = b(this._fragmentFiber) ? e.parentElement : i;
    if (s == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = s.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var m = e.compareDocumentPosition(t), y = r.compareDocumentPosition(t), x = m & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = i && s && m & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, e = i && e === t || s && r === t || x || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && e === t || !s && r === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : m, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || cb(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function cb(t, e, n, i, r) {
    var s = Qn(r);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!s)
        t: {
          for (; s !== null; ) {
            if (s.tag === 7 && (s === e || s.alternate === e)) {
              n = !0;
              break t;
            }
            s = s.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (s === null)
        return s = r.ownerDocument, r === s || r === s.documentElement || r === s.body;
      t: {
        for (s = e, e = S(e); s !== null; ) {
          if (!(s.tag !== 5 && s.tag !== 3 && s.tag !== 27 || s !== e && s.alternate !== e)) {
            s = !0;
            break t;
          }
          s = s.return;
        }
        s = !1;
      }
      return s;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!s) && !(e = s === n) && (e = k(
      n,
      s,
      Q
    ), e === null ? e = !1 : (_(
      e,
      !0,
      K,
      s,
      n
    ), s = V, V = null, e = s !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!s) && !(e = s === i) && (e = k(
      i,
      s,
      Q
    ), e === null ? e = !1 : (_(
      e,
      !0,
      Y,
      s,
      i
    ), s = V, X = V = null, e = s !== null)), e) : !1;
  }
  function Jv(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  wi.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(a(566));
    var e = [];
    _(
      this._fragmentFiber.child,
      !1,
      Ud,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var i = M(
        this._fragmentFiber
      );
      if (i = n ? i[1] || i[0] || S(this._fragmentFiber) : i[0] || i[1], i === null) return;
      if (i.tag === 6) {
        t = R(i), Jv(t, n);
        return;
      }
      if (i = R(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        i.scrollIntoView(t);
      }
    }
    for (i = n ? e.length - 1 : 0; i !== (n ? -1 : e.length); ) {
      var r = e[i];
      r.tag === 6 ? (r = R(r), Jv(r, n)) : R(r).scrollIntoView(t), i += n ? -1 : 1;
    }
  };
  function fb(t, e) {
    return t = R(t), kv(t, e), !1;
  }
  function kv(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Pv(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var r = n[i];
        t.addEventListener(
          r.type,
          r.attachedListener,
          fr(r.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      for (var m = 0, y = 0; y < fl.length; y++) {
        var x = fl[y];
        (x.fragmentInstance !== e || x.observer !== s || x.instance !== t) && (fl[m++] = x);
      }
      fl.length = m, s.observe(t);
    }), kv(t, e));
  }
  function hb(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var i = 0; i < n.length; i++) {
        var r = n[i];
        t.removeEventListener(
          r.type,
          r.attachedListener,
          fr(r.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      typeof s.rootMargin == "string" ? ob(
        e,
        s,
        t
      ) : s.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Hd(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Hd(n), jn(n);
          continue;
        case "SCRIPT":
        case "STYLE":
          continue;
        case "LINK":
          if (n.rel.toLowerCase() === "stylesheet") continue;
      }
      t.removeChild(n);
    }
  }
  function db(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var r = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[ke])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (s = t.getAttribute("rel"), s === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (s !== r.rel || t.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || t.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (s = t.getAttribute("src"), (s !== (r.src == null ? null : r.src) || t.getAttribute("type") !== (r.type == null ? null : r.type) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && s && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var s = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && t.getAttribute("name") === s)
          return t;
      } else return t;
      if (t = $i(t.nextSibling), t === null) break;
    }
    return null;
  }
  function mb(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = $i(t.nextSibling), t === null)) return null;
    return t;
  }
  function $v(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = $i(t.nextSibling), t === null)) return null;
    return t;
  }
  function Ld(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Yd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function gb(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var i = function() {
        e(), n.removeEventListener("DOMContentLoaded", i);
      };
      n.addEventListener("DOMContentLoaded", i), t._reactRetry = i;
    }
  }
  function $i(t) {
    for (; t != null; t = t.nextSibling) {
      var e = t.nodeType;
      if (e === 1 || e === 3) break;
      if (e === 8) {
        if (e = t.data, e === "$" || e === "$!" || e === "$?" || e === "$~" || e === "&" || e === "F!" || e === "F")
          break;
        if (e === "/$" || e === "/&") return null;
      }
    }
    return t;
  }
  var qd = null;
  function Wv(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return $i(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Iv(t) {
    t = t.previousSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
          if (e === 0) return t;
          e--;
        } else n !== "/$" && n !== "/&" || e++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function pb(t, e) {
    function n() {
      i = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var i = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return i;
  }
  function vb(t) {
    qv(function() {
      qv(function(e) {
        return t(e);
      });
    });
  }
  function t1(t, e, n) {
    switch (e = To(n), t) {
      case "html":
        if (t = e.documentElement, !t) throw Error(a(452));
        return t;
      case "head":
        if (t = e.head, !t) throw Error(a(453));
        return t;
      case "body":
        if (t = e.body, !t) throw Error(a(454));
        return t;
      default:
        throw Error(a(451));
    }
  }
  function e1(t, e, n) {
    for (var i in n) {
      var r = n[i];
      n.hasOwnProperty(i) && r != null && Se(t, e, i, null, K2, r);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === pl && (t.onclick = null), jn(t);
  }
  function Xd(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    jn(t);
  }
  var Wi = /* @__PURE__ */ new Map(), n1 = /* @__PURE__ */ new Set();
  function Eo(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Fl = gt.d;
  gt.d = {
    f: _b,
    r: yb,
    D: Sb,
    C: bb,
    L: Tb,
    m: Eb,
    X: Mb,
    S: xb,
    M: wb
  };
  function _b() {
    var t = Fl.f(), e = _c();
    return t || e;
  }
  function yb(t) {
    var e = ji(t);
    e !== null && e.tag === 5 && e.type === "form" ? lp(e) : Fl.r(t);
  }
  var hr = typeof document > "u" ? null : document;
  function i1(t, e, n) {
    var i = hr;
    if (i && typeof e == "string" && e) {
      var r = Qi(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), n1.has(r) || (n1.add(r), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(r) === null && (e = i.createElement("link"), Cn(e, "link", t), nn(e), i.head.appendChild(e)));
    }
  }
  function Sb(t) {
    Fl.D(t), i1("dns-prefetch", t, null);
  }
  function bb(t, e) {
    Fl.C(t, e), i1("preconnect", t, e);
  }
  function Tb(t, e, n) {
    Fl.L(t, e, n);
    var i = hr;
    if (i && t && e) {
      var r = 'link[rel="preload"][as="' + Qi(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + Qi(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + Qi(
        n.imageSizes
      ) + '"]')) : r += '[href="' + Qi(t) + '"]';
      var s = r;
      switch (e) {
        case "style":
          s = dr(t);
          break;
        case "script":
          s = mr(t);
      }
      if (!(Wi.has(s) || (t = D(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Wi.set(s, t), i.querySelector(r) !== null || e === "style" && i.querySelector(xo(s)) || e === "script" && i.querySelector(Mo(s))))) {
        var m = i.createElement("link");
        Cn(m, "link", t), e === "style" && (m[Pe] = !0, m.onload = m.onerror = function() {
          pm(m);
        }), nn(m), i.head.appendChild(m);
      }
    }
  }
  function Eb(t, e) {
    Fl.m(t, e);
    var n = hr;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + Qi(i) + '"][href="' + Qi(t) + '"]', s = r;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = mr(t);
      }
      if (!Wi.has(s) && (t = D({ rel: "modulepreload", href: t }, e), Wi.set(s, t), n.querySelector(r) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Mo(s)))
              return;
        }
        i = n.createElement("link"), Cn(i, "link", t), nn(i), n.head.appendChild(i);
      }
    }
  }
  function xb(t, e, n) {
    Fl.S(t, e, n);
    var i = hr;
    if (i && t) {
      var r = gl(i).hoistableStyles, s = dr(t);
      e = e || "default";
      var m = r.get(s);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = i.querySelector(
          xo(s)
        ))
          y.loading = 5;
        else {
          t = D(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Wi.get(s)) && Vd(t, n);
          var x = m = i.createElement("link");
          nn(x), Cn(x, "link", t), x._p = new Promise(function(U, j) {
            x.onload = U, x.onerror = j;
          }), x.addEventListener("load", function() {
            y.loading |= 1;
          }), x.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Mc(m, e, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: y
        }, r.set(s, m);
      }
    }
  }
  function Mb(t, e) {
    Fl.X(t, e);
    var n = hr;
    if (n && t) {
      var i = gl(n).hoistableScripts, r = mr(t), s = i.get(r);
      s || (s = n.querySelector(Mo(r)), s || (t = D({ src: t, async: !0 }, e), (e = Wi.get(r)) && Gd(t, e), s = n.createElement("script"), nn(s), Cn(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(r, s));
    }
  }
  function wb(t, e) {
    Fl.M(t, e);
    var n = hr;
    if (n && t) {
      var i = gl(n).hoistableScripts, r = mr(t), s = i.get(r);
      s || (s = n.querySelector(Mo(r)), s || (t = D({ src: t, async: !0, type: "module" }, e), (e = Wi.get(r)) && Gd(t, e), s = n.createElement("script"), nn(s), Cn(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, i.set(r, s));
    }
  }
  function l1(t, e, n, i) {
    var r = (r = bt.current) ? Eo(r) : null;
    if (!r) throw Error(a(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = dr(n.href), e = gl(
          r
        ).hoistableStyles, i = e.get(n), i || (i = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = dr(n.href);
          var s = gl(
            r
          ).hoistableStyles, m = s.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(t, m), (s = r.querySelector(
            xo(t)
          )) ? s._p || (m.instance = s, m.state.loading = 5) : (s = Wi.get(t), s || (s = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Wi.set(t, s)), Ab(
            r,
            t,
            s,
            m.state
          ))), e && i === null)
            throw Error(a(528, ""));
          return m;
        }
        if (e && i !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = mr(n), e = gl(
          r
        ).hoistableScripts, i = e.get(n), i || (i = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, i)), i) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, t));
    }
  }
  function dr(t) {
    return 'href="' + Qi(t) + '"';
  }
  function xo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function a1(t) {
    return D({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function Ab(t, e, n, i) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[Pe] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[Pe] = !0, e.onload = e.onerror = pm.bind(null, e), Cn(e, "link", n), nn(e), t.head.appendChild(e);
    i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function mr(t) {
    return '[src="' + Qi(t) + '"]';
  }
  function Mo(t) {
    return "script[async]" + t;
  }
  function u1(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + Qi(n.href) + '"]'
          );
          if (i)
            return e.instance = i, nn(i), i;
          var r = D({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), nn(i), Cn(i, "style", r), Mc(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          r = dr(n.href);
          var s = t.querySelector(
            xo(r)
          );
          if (s)
            return e.state.loading |= 4, e.instance = s, nn(s), s;
          i = a1(n), (r = Wi.get(r)) && Vd(i, r), s = (t.ownerDocument || t).createElement("link"), nn(s);
          var m = s;
          return m._p = new Promise(function(y, x) {
            m.onload = y, m.onerror = x;
          }), Cn(s, "link", i), e.state.loading |= 4, Mc(s, n.precedence, t), e.instance = s;
        case "script":
          return s = mr(n.src), (r = t.querySelector(
            Mo(s)
          )) ? (e.instance = r, nn(r), r) : (i = n, (r = Wi.get(s)) && (i = D({}, n), Gd(i, r)), t = t.ownerDocument || t, r = t.createElement("script"), nn(r), Cn(r, "link", i), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(a(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, Mc(i, n.precedence, t));
    return e.instance;
  }
  function Mc(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = i.length ? i[i.length - 1] : null, s = r, m = 0; m < i.length; m++) {
      var y = i[m];
      if (y.dataset.precedence === e) s = y;
      else if (s !== r) break;
    }
    s ? s.parentNode.insertBefore(t, s.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Vd(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Gd(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var wc = null;
  function r1(t, e, n) {
    if (wc === null) {
      var i = /* @__PURE__ */ new Map(), r = wc = /* @__PURE__ */ new Map();
      r.set(n, i);
    } else
      r = wc, i = r.get(n), i || (i = /* @__PURE__ */ new Map(), r.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), r = 0; r < n.length; r++) {
      var s = n[r];
      if (!(s[ke] || s[Ye] || t === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = s.getAttribute(e) || "";
        m = t + m;
        var y = i.get(m);
        y ? y.push(s) : i.set(m, [s]);
      }
    }
    return i;
  }
  function jd(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function Ob(t, e, n) {
    if (n === 1 || e.itemProp != null) return !1;
    switch (t) {
      case "meta":
      case "title":
        return !0;
      case "style":
        if (typeof e.precedence != "string" || typeof e.href != "string" || e.href === "")
          break;
        return !0;
      case "link":
        if (typeof e.rel != "string" || typeof e.href != "string" || e.href === "" || e.onLoad || e.onError)
          break;
        return e.rel === "stylesheet" ? (t = e.disabled, typeof e.precedence == "string" && t == null) : !0;
      case "script":
        if (e.async && typeof e.async != "function" && typeof e.async != "symbol" && !e.onLoad && !e.onError && e.src && typeof e.src == "string")
          return !0;
    }
    return !1;
  }
  function o1(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function s1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function c1(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function f1(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += c1(e), t.suspenseyImages.push(e)), t = Cb.bind(t), e.decode().then(t, t));
  }
  function Rb(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = dr(i.href), s = e.querySelector(
          xo(r)
        );
        if (s) {
          e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = wo.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = s, nn(s);
          return;
        }
        s = e.ownerDocument || e, i = a1(i), (r = Wi.get(r)) && Vd(i, r), s = s.createElement("link"), nn(s);
        var m = s;
        m._p = new Promise(function(y, x) {
          m.onload = y, m.onerror = x;
        }), Cn(s, "link", i), n.instance = s;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = wo.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Ac = 0;
  function zb(t, e) {
    return t.stylesheets && t.count === 0 && Rc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && Rc(t, t.stylesheets), t.unsuspend) {
          var s = t.unsuspend;
          t.unsuspend = null, s();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ac === 0 && (Ac = 62500 * J2());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Rc(t, t.stylesheets), t.unsuspend)) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        },
        (t.imgBytes > Ac ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(r);
      };
    } : null;
  }
  function h1(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Rc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function wo() {
    this.count--, h1(this);
  }
  function Cb() {
    this.imgCount--, h1(this);
  }
  var Oc = null;
  function Rc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Oc = /* @__PURE__ */ new Map(), e.forEach(Db, t), Oc = null, wo.call(t));
  }
  function Db(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Oc.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Oc.set(t, n);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < r.length; s++) {
          var m = r[s];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), i = m);
        }
        i && n.set(null, i);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), s = n.get(m) || i, s === i && n.set(null, r), n.set(m, r), this.count++, i = wo.bind(this), r.addEventListener("load", i), r.addEventListener("error", i), s ? s.parentNode.insertBefore(r, s.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
    }
  }
  var gr = {
    $$typeof: et,
    Provider: null,
    Consumer: null,
    _currentValue: zt,
    _currentValue2: zt,
    _threadCount: 0
  };
  function Nb(t, e, n, i, r, s, m, y, x) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Le(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Le(0), this.hiddenUpdates = Le(null), this.identifierPrefix = i, this.onUncaughtError = r, this.onCaughtError = s, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function d1(t, e, n, i, r, s, m, y, x, U, j, tt) {
    return t = new Nb(
      t,
      e,
      n,
      m,
      x,
      U,
      j,
      tt,
      y
    ), e = 1, s === !0 && (e |= 24), s = li(3, null, null, e), t.current = s, s.stateNode = t, e = lh(), e.refCount++, t.pooledCache = e, e.refCount++, s.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, oh(s), t;
  }
  function m1(t) {
    return t ? (t = Vu, t) : Vu;
  }
  function g1(t, e, n, i, r, s) {
    r = m1(r), i.context === null ? i.context = r : i.pendingContext = r, i = sa(e), i.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (i.callback = s), n = ca(t, i, e), n !== null && (oi(n, t, e), no(n, t, e));
  }
  function p1(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Qd(t, e) {
    p1(t, e), (t = t.alternate) && p1(t, e);
  }
  function v1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ja(t, 67108864);
      e !== null && oi(e, t, 67108864), Qd(t, 67108864);
    }
  }
  function _1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Mi();
      e = ml(e);
      var n = Ja(t, e);
      n !== null && oi(n, t, e), Qd(t, e);
    }
  }
  var pr = !0;
  function Ub(t, e, n, i) {
    var r = ot.T;
    ot.T = null;
    var s = gt.p;
    try {
      gt.p = 2, Zd(t, e, n, i);
    } finally {
      gt.p = s, ot.T = r;
    }
  }
  function Bb(t, e, n, i) {
    var r = ot.T;
    ot.T = null;
    var s = gt.p;
    try {
      gt.p = 8, Zd(t, e, n, i);
    } finally {
      gt.p = s, ot.T = r;
    }
  }
  function Zd(t, e, n, i) {
    if (pr) {
      var r = Kd(i);
      if (r === null)
        wd(
          t,
          e,
          i,
          zc,
          n
        ), S1(t, i);
      else if (Lb(
        r,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (S1(t, i), e & 4 && -1 < Hb.indexOf(t)) {
        for (; r !== null; ) {
          var s = ji(r);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var m = ne(s.pendingLanes);
                  if (m !== 0) {
                    var y = s;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var x = 1 << 31 - it(m);
                      y.entanglements[1] |= x, m &= ~x;
                    }
                    wl(s), (ge & 6) === 0 && (gc = qt() + 500, yo(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = Ja(s, 2), y !== null && oi(y, s, 2), _c(), Qd(s, 2);
            }
          if (s = Kd(i), s === null && wd(
            t,
            e,
            i,
            zc,
            n
          ), s === r) break;
          r = s;
        }
        r !== null && i.stopPropagation();
      } else
        wd(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function Kd(t) {
    return t = Cf(t), Fd(t);
  }
  var zc = null;
  function Fd(t) {
    if (zc = null, t = Qn(t), t !== null) {
      var e = c(t);
      if (e === null) t = null;
      else {
        var n = e.tag;
        if (n === 13) {
          if (t = h(e), t !== null) return t;
          t = null;
        } else if (n === 31) {
          if (t = d(e), t !== null) return t;
          t = null;
        } else if (n === 3) {
          if (e.stateNode.current.memoizedState.isDehydrated)
            return e.tag === 3 ? e.stateNode.containerInfo : null;
          t = null;
        } else e !== t && (t = null);
      }
    }
    return zc = t, null;
  }
  function y1(t) {
    switch (t) {
      case "beforetoggle":
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "seeked":
      case "submit":
      case "toggle":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "fullscreenerror":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 2;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "resize":
      case "scroll":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 8;
      case "message":
        switch (Xi()) {
          case dn:
            return 2;
          case wn:
            return 8;
          case mn:
          case Vi:
            return 32;
          case Gi:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jd = !1, Ta = null, Ea = null, xa = null, Ao = /* @__PURE__ */ new Map(), Oo = /* @__PURE__ */ new Map(), Ma = [], Hb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function S1(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        Ta = null;
        break;
      case "dragenter":
      case "dragleave":
        Ea = null;
        break;
      case "mouseover":
      case "mouseout":
        xa = null;
        break;
      case "pointerover":
      case "pointerout":
        Ao.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Oo.delete(e.pointerId);
    }
  }
  function Ro(t, e, n, i, r, s) {
    return t === null || t.nativeEvent !== s ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: s,
      targetContainers: [r]
    }, e !== null && (e = ji(e), e !== null && v1(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function Lb(t, e, n, i, r) {
    switch (e) {
      case "focusin":
        return Ta = Ro(
          Ta,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "dragenter":
        return Ea = Ro(
          Ea,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "mouseover":
        return xa = Ro(
          xa,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "pointerover":
        var s = r.pointerId;
        return Ao.set(
          s,
          Ro(
            Ao.get(s) || null,
            t,
            e,
            n,
            i,
            r
          )
        ), !0;
      case "gotpointercapture":
        return s = r.pointerId, Oo.set(
          s,
          Ro(
            Oo.get(s) || null,
            t,
            e,
            n,
            i,
            r
          )
        ), !0;
    }
    return !1;
  }
  function b1(t) {
    var e = Qn(t.target);
    if (e !== null) {
      var n = c(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, yn(t.priority, function() {
              _1(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = d(n), e !== null) {
            t.blockedOn = e, yn(t.priority, function() {
              _1(n);
            });
            return;
          }
        } else if (e === 3 && n.stateNode.current.memoizedState.isDehydrated) {
          t.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
          return;
        }
      }
    }
    t.blockedOn = null;
  }
  function Cc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Kd(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        zf = i, n.target.dispatchEvent(i), zf = null;
      } else
        return e = ji(n), e !== null && v1(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function T1(t, e, n) {
    Cc(t) && n.delete(e);
  }
  function Yb() {
    Jd = !1, Ta !== null && Cc(Ta) && (Ta = null), Ea !== null && Cc(Ea) && (Ea = null), xa !== null && Cc(xa) && (xa = null), Ao.forEach(T1), Oo.forEach(T1);
  }
  function Dc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Jd || (Jd = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Yb
    )));
  }
  var Nc = null;
  function E1(t) {
    Nc !== t && (Nc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Nc === t && (Nc = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], r = t[e + 2];
          if (typeof i != "function") {
            if (Fd(i || n) === null)
              continue;
            break;
          }
          var s = ji(n);
          s !== null && (t.splice(e, 3), e -= 3, Rh(
            s,
            {
              pending: !0,
              data: r,
              method: n.method,
              action: i
            },
            i,
            r
          ));
        }
      }
    ));
  }
  function vr(t) {
    function e(x) {
      return Dc(x, t);
    }
    Ta !== null && Dc(Ta, t), Ea !== null && Dc(Ea, t), xa !== null && Dc(xa, t), Ao.forEach(e), Oo.forEach(e);
    for (var n = 0; n < Ma.length; n++) {
      var i = Ma[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < Ma.length && (n = Ma[0], n.blockedOn === null); )
      b1(n), n.blockedOn === null && Ma.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var r = n[i], s = n[i + 1], m = r[Be] || null;
        if (typeof s == "function")
          m || E1(n);
        else if (m) {
          var y = null;
          if (s && s.hasAttribute("formAction")) {
            if (r = s, m = s[Be] || null)
              y = m.formAction;
            else if (Fd(r) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? n[i + 1] = y : (n.splice(i, 3), i -= 3), E1(n);
        }
      }
  }
  function x1() {
    function t(s) {
      s.canIntercept && s.info === "react-transition" && s.intercept({
        handler: function() {
          return new Promise(function(m) {
            return r = m;
          });
        },
        focusReset: "manual",
        scroll: "manual"
      });
    }
    function e() {
      r !== null && (r(), r = null), i || setTimeout(n, 20);
    }
    function n() {
      if (!i && !navigation.transition) {
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var i = !1, r = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        i = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), r !== null && (r(), r = null);
      };
    }
  }
  function kd(t) {
    this._internalRoot = t;
  }
  Uc.prototype.render = kd.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(a(409));
    var n = e.current, i = Mi();
    g1(n, i, t, e, null, null);
  }, Uc.prototype.unmount = kd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      g1(t.current, 2, null, t, null, null), _c(), e[Je] = null;
    }
  };
  function Uc(t) {
    this._internalRoot = t;
  }
  Uc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Ue();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Ma.length && e !== 0 && e < Ma[n].priority; n++) ;
      Ma.splice(n, 0, t), n === 0 && b1(t);
    }
  };
  var M1 = l.version;
  if (M1 !== "19.3.1")
    throw Error(
      a(
        527,
        M1,
        "19.3.1"
      )
    );
  gt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(a(188)) : (t = Object.keys(t).join(","), Error(a(268, t)));
    return t = p(e), t = t !== null ? v(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var qb = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ot,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bc.isDisabled && Bc.supportsFiber)
      try {
        at = Bc.inject(
          qb
        ), rt = Bc;
      } catch {
      }
  }
  return Co.createRoot = function(t, e) {
    if (!o(t)) throw Error(a(299));
    var n = !1, i = "", r = mp, s = gp, m = pp;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = d1(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      r,
      s,
      m,
      x1
    ), t[Je] = e.current, Md(t), new kd(e);
  }, Co.hydrateRoot = function(t, e, n) {
    if (!o(t)) throw Error(a(299));
    var i = !1, r = "", s = mp, m = gp, y = pp, x = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (x = n.formState)), e = d1(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      r,
      x,
      s,
      m,
      y,
      x1
    ), e.context = m1(null), n = e.current, i = Mi(), i = ml(i), r = sa(i), r.callback = null, ca(n, r, i), n = i, e.current.lanes = n, Ve(e, n), wl(e), t[Je] = e.current, Md(t), new Uc(e);
  }, Co.version = "19.3.1", Co;
}
var B1;
function Jb() {
  if (B1) return Wd.exports;
  B1 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (l) {
        console.error(l);
      }
  }
  return f(), Wd.exports = Fb(), Wd.exports;
}
var kb = Jb(), Pb = z_(), H1 = "1.3.27";
function C_(f, l, u) {
  return Math.max(f, Math.min(l, u));
}
function $b(f, l, u) {
  return (1 - u) * f + u * l;
}
function Wb(f, l, u, a) {
  return $b(f, l, 1 - Math.exp(-u * a));
}
function Ib(f, l) {
  return (f % l + l) % l;
}
var tT = class {
  isRunning = !1;
  value = 0;
  from = 0;
  to = 0;
  currentTime = 0;
  lerp;
  duration;
  easing;
  onUpdate;
  /**
  * Advance the animation by the given delta time
  *
  * @param deltaTime - The time in seconds to advance the animation
  */
  advance(f) {
    if (!this.isRunning) return;
    let l = !1;
    if (this.duration && this.easing) {
      this.currentTime += f;
      const u = C_(0, this.currentTime / this.duration, 1);
      l = u >= 1;
      const a = l ? 1 : this.easing(u);
      this.value = this.from + (this.to - this.from) * a;
    } else this.lerp ? (this.value = Wb(this.value, this.to, this.lerp * 60, f), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, l = !0)) : (this.value = this.to, l = !0);
    l && this.stop(), this.onUpdate?.(this.value, l);
  }
  /** Stop the animation */
  stop() {
    this.isRunning = !1;
  }
  /**
  * Set up the animation from a starting value to an ending value
  * with optional parameters for lerping, duration, easing, and onUpdate callback
  *
  * @param from - The starting value
  * @param to - The ending value
  * @param options - Options for the animation
  */
  fromTo(f, l, { lerp: u, duration: a, easing: o, onStart: c, onUpdate: h }) {
    this.from = this.value = f, this.to = l, this.lerp = u, this.duration = a, this.easing = o, this.currentTime = 0, this.isRunning = !0, c?.(), this.onUpdate = h;
  }
};
function eT(f, l) {
  let u;
  return function(...a) {
    clearTimeout(u), u = setTimeout(() => {
      u = void 0, f.apply(this, a);
    }, l);
  };
}
var nT = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(f, l, { autoResize: u = !0, debounce: a = 250 } = {}) {
    this.wrapper = f, this.content = l, u && (this.debouncedResize = eT(this.resize, a), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
  }
  destroy() {
    this.wrapperResizeObserver?.disconnect(), this.contentResizeObserver?.disconnect(), this.wrapper === window && this.debouncedResize && window.removeEventListener("resize", this.debouncedResize);
  }
  resize = () => {
    this.onWrapperResize(), this.onContentResize();
  };
  onWrapperResize = () => {
    this.wrapper instanceof Window ? (this.width = window.innerWidth, this.height = window.innerHeight) : (this.width = this.wrapper.clientWidth, this.height = this.wrapper.clientHeight);
  };
  onContentResize = () => {
    this.wrapper instanceof Window ? (this.scrollHeight = this.content.scrollHeight, this.scrollWidth = this.content.scrollWidth) : (this.scrollHeight = this.wrapper.scrollHeight, this.scrollWidth = this.wrapper.scrollWidth);
  };
  get limit() {
    return {
      x: this.scrollWidth - this.width,
      y: this.scrollHeight - this.height
    };
  }
}, D_ = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(f, ...l) {
    const u = this.events[f] || [];
    for (let a = 0, o = u.length; a < o; a++) u[a]?.(...l);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(f, l) {
    return this.events[f] ? this.events[f].push(l) : this.events[f] = [l], () => {
      this.events[f] = this.events[f]?.filter((u) => l !== u);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(f, l) {
    this.events[f] = this.events[f]?.filter((u) => l !== u);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const iT = 100 / 6, Aa = { passive: !1 };
function L1(f, l) {
  return f === 1 ? iT : f === 2 ? l : 1;
}
var lT = class {
  touchStart = {
    x: 0,
    y: 0
  };
  lastDelta = {
    x: 0,
    y: 0
  };
  window = {
    width: 0,
    height: 0
  };
  emitter = new D_();
  constructor(f, l = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = f, this.options = l, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, Aa), this.element.addEventListener("touchstart", this.onTouchStart, Aa), this.element.addEventListener("touchmove", this.onTouchMove, Aa), this.element.addEventListener("touchend", this.onTouchEnd, Aa);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(f, l) {
    return this.emitter.on(f, l);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, Aa), this.element.removeEventListener("touchstart", this.onTouchStart, Aa), this.element.removeEventListener("touchmove", this.onTouchMove, Aa), this.element.removeEventListener("touchend", this.onTouchEnd, Aa);
  }
  /**
  * Event handler for 'touchstart' event
  *
  * @param event Touch event
  */
  onTouchStart = (f) => {
    const { clientX: l, clientY: u } = f.targetTouches ? f.targetTouches[0] : f;
    this.touchStart.x = l, this.touchStart.y = u, this.lastDelta = {
      x: 0,
      y: 0
    }, this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event: f
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (f) => {
    const { clientX: l, clientY: u } = f.targetTouches ? f.targetTouches[0] : f, a = -(l - this.touchStart.x) * this.options.touchMultiplier, o = -(u - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = l, this.touchStart.y = u, this.lastDelta = {
      x: a,
      y: o
    }, this.emitter.emit("scroll", {
      deltaX: a,
      deltaY: o,
      event: f
    });
  };
  onTouchEnd = (f) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: f
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (f) => {
    let { deltaX: l, deltaY: u, deltaMode: a } = f;
    const o = L1(a, this.window.width), c = L1(a, this.window.height);
    l *= o, u *= c, l *= this.options.wheelMultiplier, u *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: l,
      deltaY: u,
      event: f
    });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const Y1 = (f) => Math.min(1, 1.001 - 2 ** (-10 * f));
var aT = class {
  _isScrolling = !1;
  _isStopped = !1;
  _isLocked = !1;
  _preventNextNativeScrollEvent = !1;
  _resetVelocityTimeout = null;
  _rafId = null;
  _isDraggingSelection = !1;
  reducedMotionMediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  /**
  * Whether or not the user is touching the screen
  */
  isTouching;
  /**
  * Whether or not the device is running iOS
  */
  isIos;
  /**
  * The time in ms since the lenis instance was created
  */
  time = 0;
  /**
  * User data that will be forwarded through the scroll event
  *
  * @example
  * lenis.scrollTo(100, {
  *   userData: {
  *     foo: 'bar'
  *   }
  * })
  */
  userData = {};
  /**
  * The last velocity of the scroll
  */
  lastVelocity = 0;
  /**
  * The current velocity of the scroll
  */
  velocity = 0;
  /**
  * The direction of the scroll
  */
  direction = 0;
  /**
  * The options passed to the lenis instance
  */
  options;
  /**
  * The target scroll value
  */
  targetScroll;
  /**
  * The animated scroll value
  */
  animatedScroll;
  animate = new tT();
  emitter = new D_();
  dimensions;
  virtualScroll;
  constructor({ wrapper: f = window, content: l = document.documentElement, eventsTarget: u = f, smoothWheel: a = !0, syncTouch: o = !1, syncTouchLerp: c = 0.075, touchInertiaExponent: h = 1.7, duration: d, easing: g, lerp: p = 0.1, infinite: v = !1, orientation: _ = "vertical", gestureOrientation: S = _ === "horizontal" ? "both" : "vertical", touchMultiplier: b = 1, wheelMultiplier: M = 1, autoResize: T = !0, prevent: R, virtualScroll: V, overscroll: X = !0, autoRaf: K = !1, anchors: Y = !1, autoToggle: Q = !1, allowNestedScroll: k = !1, __experimental__naiveDimensions: D = !1, naiveDimensions: Z = D, stopInertiaOnNavigate: $ = !1, respectReducedMotion: G = !0 } = {}) {
    window.lenisVersion = H1, window.lenis || (window.lenis = {}), window.lenis.version = H1, _ === "horizontal" && (window.lenis.horizontal = !0), o === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!f || f === document.documentElement) && (f = window), typeof d == "number" && typeof g != "function" ? g = Y1 : typeof g == "function" && typeof d != "number" && (d = 1), this.options = {
      wrapper: f,
      content: l,
      eventsTarget: u,
      smoothWheel: a,
      syncTouch: o,
      syncTouchLerp: c,
      touchInertiaExponent: h,
      duration: d,
      easing: g,
      lerp: p,
      infinite: v,
      gestureOrientation: S,
      orientation: _,
      touchMultiplier: b,
      wheelMultiplier: M,
      autoResize: T,
      prevent: R,
      virtualScroll: V,
      overscroll: X,
      autoRaf: K,
      anchors: Y,
      autoToggle: Q,
      allowNestedScroll: k,
      naiveDimensions: Z,
      stopInertiaOnNavigate: $,
      respectReducedMotion: G
    }, this.dimensions = new nT(f, l, { autoResize: T }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new lT(u, {
      touchMultiplier: b,
      wheelMultiplier: M
    }), this.virtualScroll.on("scroll", this.onVirtualScroll), this.options.autoToggle && (this.checkOverflow(), this.rootElement.addEventListener("transitionend", this.onTransitionEnd)), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  }
  /**
  * Destroy the lenis instance, remove all event listeners and clean up the class name
  */
  destroy() {
    this.emitter.destroy(), this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this.options.wrapper.removeEventListener("scroll", this.onNativeScroll), this.options.wrapper.removeEventListener("scrollend", this.onScrollEnd, { capture: !0 }), this.options.wrapper.removeEventListener("pointerdown", this.onPointerDown), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.removeEventListener("click", this.onClick), this.virtualScroll.destroy(), this.dimensions.destroy(), this.cleanUpClassName(), this._rafId && cancelAnimationFrame(this._rafId);
  }
  on(f, l) {
    return this.emitter.on(f, l);
  }
  off(f, l) {
    return this.emitter.off(f, l);
  }
  onScrollEnd = (f) => {
    f instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && f.stopPropagation();
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: { lenisScrollEnd: !0 }
    }));
  };
  get overflow() {
    const f = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[f];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  onTransitionEnd = (f) => {
    f.propertyName?.includes("overflow") && f.target === this.rootElement && this.checkOverflow();
  };
  setScroll(f) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: f,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: f,
      behavior: "instant"
    });
  }
  onClick = (f) => {
    const l = f.composedPath().filter((a) => a instanceof HTMLAnchorElement && a.href).map((a) => new URL(a.href)), u = new URL(window.location.href);
    if (this.options.anchors) {
      const a = l.find((o) => u.host === o.host && u.pathname === o.pathname && o.hash);
      if (a) {
        const o = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, c = decodeURIComponent(a.hash);
        this.scrollTo(c, o);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && l.some((a) => u.host === a.host && u.pathname !== a.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (f) => {
    f.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(f) {
    const l = window.getSelection();
    if (!l || l.isCollapsed || l.rangeCount === 0) return !1;
    const u = f.targetTouches[0] ?? f.changedTouches[0];
    if (!u) return !1;
    const a = l.getRangeAt(0).getClientRects();
    if (a.length === 0) return !1;
    const o = a[0], c = a[a.length - 1], h = 40, d = Math.hypot(u.clientX - o.left, u.clientY - o.top) <= h, g = Math.hypot(u.clientX - c.right, u.clientY - c.bottom) <= h;
    return d || g;
  }
  onVirtualScroll = (f) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(f) === !1) return;
    const { deltaX: l, deltaY: u, event: a } = f;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: l,
      deltaY: u,
      event: a
    }), a.ctrlKey || a.lenisStopPropagation) return;
    const o = a.type.includes("touch"), c = a.type.includes("wheel");
    if (o && this.isIos && (a.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(a)), this._isDraggingSelection)) {
      a.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = a.type === "touchstart" || a.type === "touchmove";
    const h = l === 0 && u === 0;
    if (this.options.syncTouch && o && a.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const d = this.options.gestureOrientation === "vertical" && u === 0 || this.options.gestureOrientation === "horizontal" && l === 0;
    if (h || d) return;
    let g = a.composedPath();
    g = g.slice(0, g.indexOf(this.rootElement));
    const p = this.options.prevent, v = Math.abs(l) >= Math.abs(u) ? "horizontal" : "vertical";
    if (g.find((M) => M instanceof HTMLElement && (typeof p == "function" && p?.(M) || M.hasAttribute?.("data-lenis-prevent") || v === "vertical" && M.hasAttribute?.("data-lenis-prevent-vertical") || v === "horizontal" && M.hasAttribute?.("data-lenis-prevent-horizontal") || o && M.hasAttribute?.("data-lenis-prevent-touch") || c && M.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(M, {
      deltaX: l,
      deltaY: u
    })))) return;
    if (this.isStopped || this.isLocked) {
      a.cancelable && a.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && o || this.options.smoothWheel && c)) {
      this.isScrolling = "native", this.animate.stop(), a.lenisStopPropagation = !0;
      return;
    }
    let _ = u;
    this.options.gestureOrientation === "both" ? _ = Math.abs(u) > Math.abs(l) ? u : l : this.options.gestureOrientation === "horizontal" && (_ = l), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && u > 0 || this.animatedScroll === this.limit && u < 0)) && (a.lenisStopPropagation = !0), a.cancelable && a.preventDefault();
    const S = o && this.options.syncTouch, b = o && a.type === "touchend";
    b && (_ = Math.sign(_) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + _, {
      programmatic: !1,
      ...S ? { lerp: b ? this.options.syncTouchLerp : 1 } : {
        lerp: this.options.lerp,
        duration: this.options.duration,
        easing: this.options.easing
      }
    });
  };
  /**
  * Force lenis to recalculate the dimensions
  */
  resize() {
    this.dimensions.resize(), this.animatedScroll = this.targetScroll = this.actualScroll, this.emit();
  }
  emit() {
    this.emitter.emit("scroll", this);
  }
  onNativeScroll = () => {
    if (this._resetVelocityTimeout !== null && (clearTimeout(this._resetVelocityTimeout), this._resetVelocityTimeout = null), this._preventNextNativeScrollEvent) {
      this._preventNextNativeScrollEvent = !1;
      return;
    }
    if (this.isScrolling === !1 || this.isScrolling === "native") {
      const f = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - f, this.direction = Math.sign(this.animatedScroll - f), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
        this.lastVelocity = this.velocity, this.velocity = 0, this.isScrolling = !1, this.emit();
      }, 400));
    }
  };
  reset() {
    this.isLocked = !1, this.isScrolling = !1, this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity = 0, this.animate.stop();
  }
  /**
  * Start lenis scroll after it has been stopped
  */
  start() {
    if (this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.removeProperty("overflow");
        return;
      }
      this.internalStart();
    }
  }
  internalStart() {
    this.isStopped && (this.reset(), this.isStopped = !1, this.emit());
  }
  /**
  * Stop lenis scroll
  */
  stop() {
    if (!this.isStopped) {
      if (this.options.autoToggle) {
        this.rootElement.style.setProperty("overflow", "clip");
        return;
      }
      this.internalStop();
    }
  }
  internalStop() {
    this.isStopped || (this.reset(), this.isStopped = !0, this.emit());
  }
  /**
  * RequestAnimationFrame for lenis
  *
  * @param time The time in ms from an external clock like `requestAnimationFrame` or Tempus
  */
  raf = (f) => {
    const l = f - (this.time || f);
    this.time = f, this.animate.advance(l * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
  };
  /**
  * Scroll to a target value
  *
  * @param target The target value to scroll to
  * @param options The options for the scroll
  *
  * @example
  * lenis.scrollTo(100, {
  *   offset: 100,
  *   duration: 1,
  *   easing: (t) => 1 - Math.cos((t * Math.PI) / 2),
  *   lerp: 0.1,
  *   onStart: () => {
  *     console.log('onStart')
  *   },
  *   onComplete: () => {
  *     console.log('onComplete')
  *   },
  * })
  */
  scrollTo(f, { offset: l = 0, immediate: u = !1, lock: a = !1, programmatic: o = !0, lerp: c = o ? this.options.lerp : void 0, duration: h = o ? this.options.duration : void 0, easing: d = o ? this.options.easing : void 0, onStart: g, onComplete: p, force: v = !1, userData: _ } = {}) {
    if (this.prefersReducedMotion && (o ? u = !0 : (c = 1, h = void 0, d = void 0)), (this.isStopped || this.isLocked) && !v) return;
    let S = f, b = l;
    if (typeof S == "string" && [
      "top",
      "left",
      "start",
      "#"
    ].includes(S)) S = 0;
    else if (typeof S == "string" && [
      "bottom",
      "right",
      "end"
    ].includes(S)) S = this.limit;
    else {
      let M = null;
      if (typeof S == "string" ? (M = S.startsWith("#") ? document.getElementById(S.slice(1)) : document.querySelector(S), M || (S === "#top" ? S = 0 : console.warn("Lenis: Target not found", S))) : S instanceof Element && (M = S), M) {
        if (this.options.wrapper !== window) {
          const Y = this.rootElement.getBoundingClientRect();
          b -= this.isHorizontal ? Y.left : Y.top;
        }
        const T = M.getBoundingClientRect(), R = getComputedStyle(M), V = this.isHorizontal ? Number.parseFloat(R.scrollMarginLeft) : Number.parseFloat(R.scrollMarginTop), X = getComputedStyle(this.rootElement), K = this.isHorizontal ? Number.parseFloat(X.scrollPaddingLeft) : Number.parseFloat(X.scrollPaddingTop);
        S = (this.isHorizontal ? T.left : T.top) + this.animatedScroll - (Number.isNaN(V) ? 0 : V) - (Number.isNaN(K) ? 0 : K);
      }
    }
    if (typeof S == "number") {
      if (S += b, this.options.infinite) {
        if (o) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const M = S - this.animatedScroll;
          M > this.limit / 2 ? S -= this.limit : M < -this.limit / 2 && (S += this.limit);
        }
      } else S = C_(0, S, this.limit);
      if (S === this.targetScroll) {
        g?.(this), p?.(this);
        return;
      }
      if (this.userData = _ ?? {}, u) {
        this.animatedScroll = this.targetScroll = S, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), p?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      o || (this.targetScroll = S), typeof h == "number" && typeof d != "function" ? d = Y1 : typeof d == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, S, {
        duration: h,
        easing: d,
        lerp: c,
        onStart: () => {
          a && (this.isLocked = !0), this.isScrolling = "smooth", g?.(this);
        },
        onUpdate: (M, T) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = M - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = M, this.setScroll(this.scroll), o && (this.targetScroll = M), T || this.emit(), T && (this.reset(), this.emit(), p?.(this), this.userData = {}, requestAnimationFrame(() => {
            this.dispatchScrollendEvent();
          }), this.preventNextNativeScrollEvent());
        }
      });
    }
  }
  preventNextNativeScrollEvent() {
    this._preventNextNativeScrollEvent = !0, requestAnimationFrame(() => {
      this._preventNextNativeScrollEvent = !1;
    });
  }
  hasNestedScroll(f, { deltaX: l, deltaY: u }) {
    const a = Date.now();
    f._lenis || (f._lenis = {});
    const o = f._lenis;
    let c, h, d, g, p, v, _, S, b, M;
    if (a - (o.time ?? 0) > 2e3) {
      o.time = Date.now();
      const k = window.getComputedStyle(f);
      if (o.computedStyle = k, c = [
        "auto",
        "overlay",
        "scroll"
      ].includes(k.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(k.overflowY), p = ["auto"].includes(k.overscrollBehaviorX), v = ["auto"].includes(k.overscrollBehaviorY), o.hasOverflowX = c, o.hasOverflowY = h, !(c || h)) return !1;
      _ = f.scrollWidth, S = f.scrollHeight, b = f.clientWidth, M = f.clientHeight, d = _ > b, g = S > M, o.isScrollableX = d, o.isScrollableY = g, o.scrollWidth = _, o.scrollHeight = S, o.clientWidth = b, o.clientHeight = M, o.hasOverscrollBehaviorX = p, o.hasOverscrollBehaviorY = v;
    } else
      d = o.isScrollableX, g = o.isScrollableY, c = o.hasOverflowX, h = o.hasOverflowY, _ = o.scrollWidth, S = o.scrollHeight, b = o.clientWidth, M = o.clientHeight, p = o.hasOverscrollBehaviorX, v = o.hasOverscrollBehaviorY;
    if (!(c && d || h && g)) return !1;
    const T = Math.abs(l) >= Math.abs(u) ? "horizontal" : "vertical";
    let R, V, X, K, Y, Q;
    if (T === "horizontal")
      R = Math.round(f.scrollLeft), V = _ - b, X = l, K = c, Y = d, Q = p;
    else if (T === "vertical")
      R = Math.round(f.scrollTop), V = S - M, X = u, K = h, Y = g, Q = v;
    else return !1;
    return !Q && (R >= V || R <= 0) ? !0 : (X > 0 ? R < V : R > 0) && K && Y;
  }
  /**
  * The root element on which lenis is instanced
  */
  get rootElement() {
    return this.options.wrapper === window ? document.documentElement : this.options.wrapper;
  }
  /**
  * The limit which is the maximum scroll value
  */
  get limit() {
    return this.options.naiveDimensions ? this.isHorizontal ? this.rootElement.scrollWidth - this.rootElement.clientWidth : this.rootElement.scrollHeight - this.rootElement.clientHeight : this.dimensions.limit[this.isHorizontal ? "x" : "y"];
  }
  /**
  * Whether or not the scroll is horizontal
  */
  get isHorizontal() {
    return this.options.orientation === "horizontal";
  }
  /**
  * The actual scroll value
  */
  get actualScroll() {
    const f = this.options.wrapper;
    return this.isHorizontal ? f.scrollX ?? f.scrollLeft : f.scrollY ?? f.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? Ib(this.animatedScroll, this.limit) : this.animatedScroll;
  }
  /**
  * The progress of the scroll relative to the limit
  */
  get progress() {
    return this.limit === 0 ? 1 : this.scroll / this.limit;
  }
  /**
  * Current scroll state
  */
  get isScrolling() {
    return this._isScrolling;
  }
  set isScrolling(f) {
    this._isScrolling !== f && (this._isScrolling = f, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(f) {
    this._isStopped !== f && (this._isStopped = f, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(f) {
    this._isLocked !== f && (this._isLocked = f, this.updateClassName());
  }
  /**
  * Check if lenis is smooth scrolling
  */
  get isSmooth() {
    return this.isScrolling === "smooth";
  }
  /**
  * Whether the user prefers reduced motion and lenis is honoring it (see `respectReducedMotion` option)
  */
  get prefersReducedMotion() {
    return this.options.respectReducedMotion && this.reducedMotionMediaQuery.matches;
  }
  /**
  * The class name applied to the wrapper element
  */
  get className() {
    let f = "lenis";
    return this.options.autoToggle && (f += " lenis-autoToggle"), this.isStopped && (f += " lenis-stopped"), this.isLocked && (f += " lenis-locked"), this.isScrolling && (f += " lenis-scrolling"), this.isScrolling === "smooth" && (f += " lenis-smooth"), f;
  }
  updateClassName() {
    this.cleanUpClassName(), this.className.split(" ").forEach((f) => {
      this.rootElement.classList.add(f);
    });
  }
  cleanUpClassName() {
    for (const f of Array.from(this.rootElement.classList)) (f === "lenis" || f.startsWith("lenis-")) && this.rootElement.classList.remove(f);
  }
};
function Jl(f) {
  if (f === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return f;
}
function N_(f, l) {
  f.prototype = Object.create(l.prototype), f.prototype.constructor = f, f.__proto__ = l;
}
var Bi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, ls = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, j0, Un, Xe, nl = 1e8, Ee = 1 / nl, y0 = Math.PI * 2, uT = y0 / 4, rT = 0, U_ = Math.sqrt, oT = Math.cos, sT = Math.sin, Mn = function(l) {
  return typeof l == "string";
}, Ie = function(l) {
  return typeof l == "function";
}, Il = function(l) {
  return typeof l == "number";
}, Q0 = function(l) {
  return typeof l > "u";
}, Nl = function(l) {
  return typeof l == "object";
}, hi = function(l) {
  return l !== !1;
}, Z0 = function() {
  return typeof window < "u";
}, Hc = function(l) {
  return Ie(l) || Mn(l);
}, B_ = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Xn = Array.isArray, cT = /random\([^)]+\)/g, fT = /,\s*/g, q1 = /(?:-?\.?\d|\.)+/gi, H_ = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, xr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, n0 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, L_ = /[+-]=-?[.\d]+/, hT = /[^,'"\[\]\s]+/gi, dT = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Ze, Al, S0, K0, Hi = {}, rf = {}, Y_, q_ = function(l) {
  return (rf = Ur(l, Hi)) && pi;
}, F0 = function(l, u) {
  return console.warn("Invalid property", l, "set to", u, "Missing plugin? gsap.registerPlugin()");
}, as = function(l, u) {
  return !u && console.warn(l);
}, X_ = function(l, u) {
  return l && (Hi[l] = u) && rf && (rf[l] = u) || Hi;
}, us = function() {
  return 0;
}, mT = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Pc = {
  suppressEvents: !0,
  kill: !1
}, gT = {
  suppressEvents: !0
}, J0 = {}, Ba = [], b0 = {}, V_, zi = {}, i0 = {}, X1 = 30, $c = [], k0 = "", P0 = function(l) {
  var u = l[0], a, o;
  if (Nl(u) || Ie(u) || (l = [l]), !(a = (u._gsap || {}).harness)) {
    for (o = $c.length; o-- && !$c[o].targetTest(u); )
      ;
    a = $c[o];
  }
  for (o = l.length; o--; )
    l[o] && (l[o]._gsap || (l[o]._gsap = new sy(l[o], a))) || l.splice(o, 1);
  return l;
}, Su = function(l) {
  return l._gsap || P0(il(l))[0]._gsap;
}, G_ = function(l, u, a) {
  return (a = l[u]) && Ie(a) ? l[u]() : Q0(a) && l.getAttribute && l.getAttribute(u) || a;
}, di = function(l, u) {
  return (l = l.split(",")).forEach(u) || l;
}, an = function(l) {
  return Math.round(l * 1e5) / 1e5 || 0;
}, Qe = function(l) {
  return Math.round(l * 1e7) / 1e7 || 0;
}, Ar = function(l, u) {
  var a = u.charAt(0), o = parseFloat(u.substr(2));
  return l = parseFloat(l), a === "+" ? l + o : a === "-" ? l - o : a === "*" ? l * o : l / o;
}, pT = function(l, u) {
  for (var a = u.length, o = 0; l.indexOf(u[o]) < 0 && ++o < a; )
    ;
  return o < a;
}, of = function() {
  var l = Ba.length, u = Ba.slice(0), a, o;
  for (b0 = {}, Ba.length = 0, a = 0; a < l; a++)
    o = u[a], o && o._lazy && (o.render(o._lazy[0], o._lazy[1], !0)._lazy = 0);
}, $0 = function(l) {
  return !!(l._initted || l._startAt || l.add);
}, j_ = function(l, u, a, o) {
  Ba.length && !Un && of(), l.render(u, a, !!(Un && u < 0 && $0(l))), Ba.length && !Un && of();
}, Q_ = function(l) {
  var u = parseFloat(l);
  return (u || u === 0) && (l + "").match(hT).length < 2 ? u : Mn(l) ? l.trim() : l;
}, Z_ = function(l) {
  return l;
}, Li = function(l, u) {
  for (var a in u)
    a in l || (l[a] = u[a]);
  return l;
}, vT = function(l) {
  return function(u, a) {
    for (var o in a)
      o in u || o === "duration" && l || o === "ease" || (u[o] = a[o]);
  };
}, Ur = function(l, u) {
  for (var a in u)
    l[a] = u[a];
  return l;
}, V1 = function f(l, u) {
  for (var a in u)
    a !== "__proto__" && a !== "constructor" && a !== "prototype" && (l[a] = Nl(u[a]) ? f(l[a] || (l[a] = {}), u[a]) : u[a]);
  return l;
}, sf = function(l, u) {
  var a = {}, o;
  for (o in l)
    o in u || (a[o] = l[o]);
  return a;
}, Ko = function(l) {
  var u = l.parent || Ze, a = l.keyframes ? vT(Xn(l.keyframes)) : Li;
  if (hi(l.inherit))
    for (; u; )
      a(l, u.vars.defaults), u = u.parent || u._dp;
  return l;
}, _T = function(l, u) {
  for (var a = l.length, o = a === u.length; o && a-- && l[a] === u[a]; )
    ;
  return a < 0;
}, K_ = function(l, u, a, o, c) {
  var h = l[o], d;
  if (c)
    for (d = u[c]; h && h[c] > d; )
      h = h._prev;
  return h ? (u._next = h._next, h._next = u) : (u._next = l[a], l[a] = u), u._next ? u._next._prev = u : l[o] = u, u._prev = h, u.parent = u._dp = l, u;
}, Tf = function(l, u, a, o) {
  a === void 0 && (a = "_first"), o === void 0 && (o = "_last");
  var c = u._prev, h = u._next;
  c ? c._next = h : l[a] === u && (l[a] = h), h ? h._prev = c : l[o] === u && (l[o] = c), u._next = u._prev = u.parent = null;
}, qa = function(l, u) {
  l.parent && (!u || l.parent.autoRemoveChildren) && l.parent.remove && l.parent.remove(l), l._act = 0;
}, bu = function(l, u) {
  if (l && (!u || u._end > l._dur || u._start < 0))
    for (var a = l; a; )
      a._dirty = 1, a = a.parent;
  return l;
}, yT = function(l) {
  for (var u = l.parent; u && u.parent; )
    u._dirty = 1, u.totalDuration(), u = u.parent;
  return l;
}, T0 = function(l, u, a, o) {
  return l._startAt && (Un ? l._startAt.revert(Pc) : l.vars.immediateRender && !l.vars.autoRevert || l._startAt.render(u, !0, o));
}, ST = function f(l) {
  return !l || l._ts && f(l.parent);
}, G1 = function(l) {
  return l._repeat ? Br(l._tTime, l = l.duration() + l._rDelay) * l : 0;
}, Br = function(l, u) {
  var a = Math.floor(l = Qe(l / u));
  return l && a === l ? a - 1 : a;
}, cf = function(l, u) {
  return (l - u._start) * u._ts + (u._ts >= 0 ? 0 : u._dirty ? u.totalDuration() : u._tDur);
}, Ef = function(l) {
  return l._end = Qe(l._start + (l._tDur / Math.abs(l._ts || l._rts || Ee) || 0));
}, xf = function(l, u) {
  var a = l._dp;
  return a && a.smoothChildTiming && l._ts && (l._start = Qe(a._time - (l._ts > 0 ? u / l._ts : ((l._dirty ? l.totalDuration() : l._tDur) - u) / -l._ts)), Ef(l), a._dirty || bu(a, l)), l;
}, F_ = function(l, u) {
  var a;
  if ((u._time || !u._dur && u._initted || u._start < l._time && (u._dur || !u.add)) && (a = cf(l.rawTime(), u), (!u._dur || gs(0, u.totalDuration(), a) - u._tTime > Ee) && u.render(a, !0)), bu(l, u)._dp && l._initted && l._time >= l._dur && l._ts) {
    if (l._dur < l.duration())
      for (a = l; a._dp; )
        a.rawTime() >= 0 && a.totalTime(a._tTime), a = a._dp;
    l._zTime = -Ee;
  }
}, Rl = function(l, u, a, o) {
  return u.parent && qa(u), u._start = Qe((Il(a) ? a : !a && ff(u) && (!l._last || l._last._start >= l._time) ? l._last ? l._last._start : l._time : a || l !== Ze ? Ii(l, a, u) : l._time) + u._delay), u._end = Qe(u._start + (u.totalDuration() / Math.abs(u.timeScale()) || 0)), K_(l, u, "_first", "_last", l._sort ? "_start" : 0), ff(u) || (l._recent = u), o || F_(l, u), l._ts < 0 && xf(l, l._tTime), l;
}, J_ = function(l, u) {
  return (Hi.ScrollTrigger || F0("scrollTrigger", u)) && Hi.ScrollTrigger.create(u, l);
}, k_ = function(l, u, a, o, c) {
  if (I0(l, u, c), !l._initted)
    return 1;
  if (!a && l._pt && !Un && (l._dur && l.vars.lazy !== !1 || !l._dur && l.vars.lazy) && V_ !== Di.frame)
    return Ba.push(l), l._lazy = [c, o], 1;
}, bT = function f(l) {
  var u = l.parent;
  return u && u._ts && u._initted && !u._lock && (u.rawTime() < 0 || f(u));
}, ff = function(l) {
  var u = l.data;
  return u === "isFromStart" || u === "isStart";
}, TT = function(l, u, a, o) {
  var c = l.ratio, h = u < 0 || !u && (!l._start && bT(l) && !(!l._initted && ff(l)) || (l._ts < 0 || l._dp._ts < 0) && !ff(l)) ? 0 : 1, d = l._rDelay, g = 0, p, v, _;
  if (d && l._repeat && (g = gs(0, l._tDur, u), v = Br(g, d), l._yoyo && v & 1 && (h = 1 - h), v !== Br(l._tTime, d) && (c = 1 - h, l.vars.repeatRefresh && l._initted && l.invalidate())), h !== c || Un || o || l._zTime === Ee || !u && l._zTime) {
    if (!l._initted && k_(l, u, o, a, g))
      return;
    for (_ = l._zTime, l._zTime = u || (a ? Ee : 0), a || (a = u && !_), l.ratio = h, l._from && (h = 1 - h), l._time = 0, l._tTime = g, p = l._pt; p; )
      p.r(h, p.d), p = p._next;
    u < 0 && T0(l, u, a, !0), l._onUpdate && !a && Ni(l, "onUpdate"), g && l._repeat && !a && l.parent && Ni(l, "onRepeat"), (u >= l._tDur || u < 0) && l.ratio === h && (h && qa(l, 1), !a && !Un && (Ni(l, h ? "onComplete" : "onReverseComplete", !0), l._prom && l._prom()));
  } else l._zTime || (l._zTime = u);
}, ET = function(l, u, a) {
  var o;
  if (a > u)
    for (o = l._first; o && o._start <= a; ) {
      if (o.data === "isPause" && o._start > u)
        return o;
      o = o._next;
    }
  else
    for (o = l._last; o && o._start >= a; ) {
      if (o.data === "isPause" && o._start < u)
        return o;
      o = o._prev;
    }
}, Hr = function(l, u, a, o) {
  var c = l._repeat, h = Qe(u) || 0, d = l._tTime / l._tDur;
  return d && !o && (l._time *= h / l._dur), l._dur = h, l._tDur = c ? c < 0 ? 1e10 : Qe(h * (c + 1) + l._rDelay * c) : h, d > 0 && !o && xf(l, l._tTime = l._tDur * d), l.parent && Ef(l), a || bu(l.parent, l), l;
}, j1 = function(l) {
  return l instanceof ci ? bu(l) : Hr(l, l._dur);
}, xT = {
  _start: 0,
  endTime: us,
  totalDuration: us
}, Ii = function f(l, u, a) {
  var o = l.labels, c = l._recent || xT, h = l.duration() >= nl ? c.endTime(!1) : l._dur, d, g, p;
  return Mn(u) && (isNaN(u) || u in o) ? (g = u.charAt(0), p = u.substr(-1) === "%", d = u.indexOf("="), g === "<" || g === ">" ? (d >= 0 && (u = u.replace(/=/, "")), (g === "<" ? c._start : c.endTime(c._repeat >= 0)) + (parseFloat(u.substr(1)) || 0) * (p ? (d < 0 ? c : a).totalDuration() / 100 : 1)) : d < 0 ? (u in o || (o[u] = h), o[u]) : (g = parseFloat(u.charAt(d - 1) + u.substr(d + 1)), p && a && (g = g / 100 * (Xn(a) ? a[0] : a).totalDuration()), d > 1 ? f(l, u.substr(0, d - 1), a) + g : h + g)) : u == null ? h : +u;
}, Fo = function(l, u, a) {
  var o = Il(u[1]), c = (o ? 2 : 1) + (l < 2 ? 0 : 1), h = u[c], d, g;
  if (o && (h.duration = u[1]), h.parent = a, l) {
    for (d = h, g = a; g && !("immediateRender" in d); )
      d = g.vars.defaults || {}, g = hi(g.vars.inherit) && g.parent;
    h.immediateRender = hi(d.immediateRender), l < 2 ? h.runBackwards = 1 : h.startAt = u[c - 1];
  }
  return new hn(u[0], h, u[c + 1]);
}, ja = function(l, u) {
  return l || l === 0 ? u(l) : u;
}, gs = function(l, u, a) {
  return a < l ? l : a > u ? u : a;
}, Yn = function(l, u) {
  return !Mn(l) || !(u = dT.exec(l)) ? "" : u[1];
}, MT = function(l, u, a) {
  return ja(a, function(o) {
    return gs(l, u, o);
  });
}, E0 = [].slice, P_ = function(l, u) {
  return l && Nl(l) && "length" in l && (!u && !l.length || l.length - 1 in l && Nl(l[0])) && !l.nodeType && l !== Al;
}, wT = function(l, u, a) {
  return a === void 0 && (a = []), l.forEach(function(o) {
    var c;
    return Mn(o) && !u || P_(o, 1) ? (c = a).push.apply(c, il(o)) : a.push(o);
  }) || a;
}, il = function(l, u, a) {
  return Xe && !u && Xe.selector ? Xe.selector(l) : Mn(l) && !a && (S0 || !Lr()) ? E0.call((u || K0).querySelectorAll(l), 0) : Xn(l) ? wT(l, a) : P_(l) ? E0.call(l, 0) : l ? [l] : [];
}, x0 = function(l) {
  return l = il(l)[0] || as("Invalid scope") || {}, function(u) {
    var a = l.current || l.nativeElement || l;
    return il(u, a.querySelectorAll ? a : a === l ? as("Invalid scope") || K0.createElement("div") : l);
  };
}, $_ = function(l) {
  return l.sort(function() {
    return 0.5 - Math.random();
  });
}, W_ = function(l) {
  if (Ie(l))
    return l;
  var u = Nl(l) ? l : {
    each: l
  }, a = Tu(u.ease), o = u.from || 0, c = parseFloat(u.base) || 0, h = {}, d = o > 0 && o < 1, g = isNaN(o) || d, p = u.axis, v = o, _ = o;
  return Mn(o) ? v = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[o] || 0 : !d && g && (v = o[0], _ = o[1]), function(S, b, M) {
    var T = (M || u).length, R = h[T], V, X, K, Y, Q, k, D, Z, $;
    if (!R) {
      if ($ = u.grid === "auto" ? 0 : (u.grid || [1, nl])[1], !$) {
        for (D = -nl; D < (D = M[$++].getBoundingClientRect().left) && $ < T; )
          ;
        $ < T && $--;
      }
      for (R = h[T] = [], V = g ? Math.min($, T) * v - 0.5 : o % $, X = $ === nl ? 0 : g ? T * _ / $ - 0.5 : o / $ | 0, D = 0, Z = nl, k = 0; k < T; k++)
        K = k % $ - V, Y = X - (k / $ | 0), R[k] = Q = p ? Math.abs(p === "y" ? Y : K) : U_(K * K + Y * Y), Q > D && (D = Q), Q < Z && (Z = Q);
      o === "random" && $_(R), R.max = D - Z, R.min = Z, R.v = T = (parseFloat(u.amount) || parseFloat(u.each) * ($ > T ? T - 1 : p ? p === "y" ? T / $ : $ : Math.max($, T / $)) || 0) * (o === "edges" ? -1 : 1), R.b = T < 0 ? c - T : c, R.u = Yn(u.amount || u.each) || 0, a = a && T < 0 ? qT(a) : a;
    }
    return T = (R[S] - R.min) / R.max || 0, Qe(R.b + (a ? a(T) : T) * R.v) + R.u;
  };
}, M0 = function(l) {
  var u = Math.pow(10, ((l + "").split(".")[1] || "").length);
  return function(a) {
    var o = Qe(Math.round(parseFloat(a) / l) * l * u);
    return (o - o % 1) / u + (Il(a) ? 0 : Yn(a));
  };
}, I_ = function(l, u) {
  var a = Xn(l), o, c;
  return !a && Nl(l) && (o = a = l.radius || nl, l.values ? (l = il(l.values), (c = !Il(l[0])) && (o *= o)) : l = M0(l.increment)), ja(u, a ? Ie(l) ? function(h) {
    return c = l(h), Math.abs(c - h) <= o ? c : h;
  } : function(h) {
    for (var d = parseFloat(c ? h.x : h), g = parseFloat(c ? h.y : 0), p = nl, v = 0, _ = l.length, S, b; _--; )
      c ? (S = l[_].x - d, b = l[_].y - g, S = S * S + b * b) : S = Math.abs(l[_] - d), S < p && (p = S, v = _);
    return v = !o || p <= o ? l[v] : h, c || v === h || Il(h) ? v : v + Yn(h);
  } : M0(l));
}, ty = function(l, u, a, o) {
  return ja(Xn(l) ? !u : a === !0 ? !!(a = 0) : !o, function() {
    return Xn(l) ? l[~~(Math.random() * l.length)] : (a = a || 1e-5) && (o = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) && Math.floor(Math.round((l - a / 2 + Math.random() * (u - l + a * 0.99)) / a) * a * o) / o;
  });
}, AT = function() {
  for (var l = arguments.length, u = new Array(l), a = 0; a < l; a++)
    u[a] = arguments[a];
  return function(o) {
    return u.reduce(function(c, h) {
      return h(c);
    }, o);
  };
}, OT = function(l, u) {
  return function(a) {
    return l(parseFloat(a)) + (u || Yn(a));
  };
}, RT = function(l, u, a) {
  return ny(l, u, 0, 1, a);
}, ey = function(l, u, a) {
  return ja(a, function(o) {
    return l[~~u(o)];
  });
}, zT = function f(l, u, a) {
  var o = u - l;
  return Xn(l) ? ey(l, f(0, l.length), u) : ja(a, function(c) {
    return (o + (c - l) % o) % o + l;
  });
}, CT = function f(l, u, a) {
  var o = u - l, c = o * 2;
  return Xn(l) ? ey(l, f(0, l.length - 1), u) : ja(a, function(h) {
    return h = (c + (h - l) % c) % c || 0, l + (h > o ? c - h : h);
  });
}, rs = function(l) {
  return l.replace(cT, function(u) {
    var a = u.indexOf("[") + 1, o = u.substring(a || 7, a ? u.indexOf("]") : u.length - 1).split(fT);
    return ty(a ? o : +o[0], a ? 0 : +o[1], +o[2] || 1e-5);
  });
}, ny = function(l, u, a, o, c) {
  var h = u - l, d = o - a;
  return ja(c, function(g) {
    return a + ((g - l) / h * d || 0);
  });
}, DT = function f(l, u, a, o) {
  var c = isNaN(l + u) ? 0 : function(b) {
    return (1 - b) * l + b * u;
  };
  if (!c) {
    var h = Mn(l), d = {}, g, p, v, _, S;
    if (a === !0 && (o = 1) && (a = null), h)
      l = {
        p: l
      }, u = {
        p: u
      };
    else if (Xn(l) && !Xn(u)) {
      for (v = [], _ = l.length, S = _ - 2, p = 1; p < _; p++)
        v.push(f(l[p - 1], l[p]));
      _--, c = function(M) {
        M *= _;
        var T = Math.min(S, ~~M);
        return v[T](M - T);
      }, a = u;
    } else o || (l = Ur(Xn(l) ? [] : {}, l));
    if (!v) {
      for (g in u)
        W0.call(d, l, g, "get", u[g]);
      c = function(M) {
        return nm(M, d) || (h ? l.p : l);
      };
    }
  }
  return ja(a, c);
}, Q1 = function(l, u, a) {
  var o = l.labels, c = nl, h, d, g;
  for (h in o)
    d = o[h] - u, d < 0 == !!a && d && c > (d = Math.abs(d)) && (g = h, c = d);
  return g;
}, Ni = function(l, u, a) {
  var o = l.vars, c = o[u], h = Xe, d = l._ctx, g, p, v;
  if (c)
    return g = o[u + "Params"], p = o.callbackScope || l, a && Ba.length && of(), d && (Xe = d), v = g ? c.apply(p, g) : c.call(p), Xe = h, v;
}, Lo = function(l) {
  return qa(l), l.scrollTrigger && l.scrollTrigger.kill(!!Un), l.progress() < 1 && Ni(l, "onInterrupt"), l;
}, Mr, iy = [], ly = function(l) {
  if (l)
    if (l = !l.name && l.default || l, Z0() || l.headless) {
      var u = l.name, a = Ie(l), o = u && !a && l.init ? function() {
        this._props = [];
      } : l, c = {
        init: us,
        render: nm,
        add: W0,
        kill: kT,
        modifier: JT,
        rawVars: 0
      }, h = {
        targetTest: 0,
        get: 0,
        getSetter: em,
        aliases: {},
        register: 0
      };
      if (Lr(), l !== o) {
        if (zi[u])
          return;
        Li(o, Li(sf(l, c), h)), Ur(o.prototype, Ur(c, sf(l, h))), zi[o.prop = u] = o, l.targetTest && ($c.push(o), J0[u] = 1), u = (u === "css" ? "CSS" : u.charAt(0).toUpperCase() + u.substr(1)) + "Plugin";
      }
      X_(u, o), l.register && l.register(pi, o, mi);
    } else
      iy.push(l);
}, Oe = 255, Yo = {
  aqua: [0, Oe, Oe],
  lime: [0, Oe, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Oe],
  navy: [0, 0, 128],
  white: [Oe, Oe, Oe],
  olive: [128, 128, 0],
  yellow: [Oe, Oe, 0],
  orange: [Oe, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Oe, 0, 0],
  pink: [Oe, 192, 203],
  cyan: [0, Oe, Oe],
  transparent: [Oe, Oe, Oe, 0]
}, l0 = function(l, u, a) {
  return l += l < 0 ? 1 : l > 1 ? -1 : 0, (l * 6 < 1 ? u + (a - u) * l * 6 : l < 0.5 ? a : l * 3 < 2 ? u + (a - u) * (2 / 3 - l) * 6 : u) * Oe + 0.5 | 0;
}, ay = function(l, u, a) {
  var o = l ? Il(l) ? [l >> 16, l >> 8 & Oe, l & Oe] : 0 : Yo.black, c, h, d, g, p, v, _, S, b, M;
  if (!o) {
    if (l.substr(-1) === "," && (l = l.substr(0, l.length - 1)), Yo[l])
      o = Yo[l];
    else if (l.charAt(0) === "#") {
      if (l.length < 6 && (c = l.charAt(1), h = l.charAt(2), d = l.charAt(3), l = "#" + c + c + h + h + d + d + (l.length === 5 ? l.charAt(4) + l.charAt(4) : "")), l.length === 9)
        return o = parseInt(l.substr(1, 6), 16), [o >> 16, o >> 8 & Oe, o & Oe, parseInt(l.substr(7), 16) / 255];
      l = parseInt(l.substr(1), 16), o = [l >> 16, l >> 8 & Oe, l & Oe];
    } else if (l.substr(0, 3) === "hsl") {
      if (o = M = l.match(q1), !u)
        g = +o[0] % 360 / 360, p = +o[1] / 100, v = +o[2] / 100, h = v <= 0.5 ? v * (p + 1) : v + p - v * p, c = v * 2 - h, o.length > 3 && (o[3] *= 1), o[0] = l0(g + 1 / 3, c, h), o[1] = l0(g, c, h), o[2] = l0(g - 1 / 3, c, h);
      else if (~l.indexOf("="))
        return o = l.match(H_), a && o.length < 4 && (o[3] = 1), o;
    } else
      o = l.match(q1) || Yo.transparent;
    o = o.map(Number);
  }
  return u && !M && (c = o[0] / Oe, h = o[1] / Oe, d = o[2] / Oe, _ = Math.max(c, h, d), S = Math.min(c, h, d), v = (_ + S) / 2, _ === S ? g = p = 0 : (b = _ - S, p = v > 0.5 ? b / (2 - _ - S) : b / (_ + S), g = _ === c ? (h - d) / b + (h < d ? 6 : 0) : _ === h ? (d - c) / b + 2 : (c - h) / b + 4, g *= 60), o[0] = ~~(g + 0.5), o[1] = ~~(p * 100 + 0.5), o[2] = ~~(v * 100 + 0.5)), a && o.length < 4 && (o[3] = 1), o;
}, uy = function(l) {
  var u = [], a = [], o = -1;
  return l.split(Ha).forEach(function(c) {
    var h = c.match(xr) || [];
    u.push.apply(u, h), a.push(o += h.length + 1);
  }), u.c = a, u;
}, Z1 = function(l, u, a) {
  var o = "", c = (l + o).match(Ha), h = u ? "hsla(" : "rgba(", d = 0, g, p, v, _;
  if (!c)
    return l;
  if (c = c.map(function(S) {
    return (S = ay(S, u, 1)) && h + (u ? S[0] + "," + S[1] + "%," + S[2] + "%," + S[3] : S.join(",")) + ")";
  }), a && (v = uy(l), g = a.c, g.join(o) !== v.c.join(o)))
    for (p = l.replace(Ha, "1").split(xr), _ = p.length - 1; d < _; d++)
      o += p[d] + (~g.indexOf(d) ? c.shift() || h + "0,0,0,0)" : (v.length ? v : c.length ? c : a).shift());
  if (!p)
    for (p = l.split(Ha), _ = p.length - 1; d < _; d++)
      o += p[d] + c[d];
  return o + p[_];
}, Ha = (function() {
  var f = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", l;
  for (l in Yo)
    f += "|" + l + "\\b";
  return new RegExp(f + ")", "gi");
})(), NT = /hsl[a]?\(/, ry = function(l) {
  var u = l.join(" "), a;
  if (Ha.lastIndex = 0, Ha.test(u))
    return a = NT.test(u), l[1] = Z1(l[1], a), l[0] = Z1(l[0], a, uy(l[1])), !0;
}, os, Di = (function() {
  var f = Date.now, l = 500, u = 33, a = f(), o = a, c = 1e3 / 240, h = c, d = [], g, p, v, _, S, b, M = function T(R) {
    var V = f() - o, X = R === !0, K, Y, Q, k;
    if ((V > l || V < 0) && (a += V - u), o += V, Q = o - a, K = Q - h, (K > 0 || X) && (k = ++_.frame, S = Q - _.time * 1e3, _.time = Q = Q / 1e3, h += K + (K >= c ? 0 : c - K), Y = 1), X || (g = p(T)), Y)
      for (b = 0; b < d.length; b++)
        d[b](Q, S, k, R);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      M(!0);
    },
    deltaRatio: function(R) {
      return S / (1e3 / (R || 60));
    },
    wake: function() {
      Y_ && (!S0 && Z0() && (Al = S0 = window, K0 = Al.document || {}, Hi.gsap = pi, (Al.gsapVersions || (Al.gsapVersions = [])).push(pi.version), q_(rf || Al.GreenSockGlobals || !Al.gsap && Al || {}), iy.forEach(ly)), v = typeof requestAnimationFrame < "u" && requestAnimationFrame, g && _.sleep(), p = v || function(R) {
        return setTimeout(R, h - _.time * 1e3 + 1 | 0);
      }, os = 1, M(2));
    },
    sleep: function() {
      (v ? cancelAnimationFrame : clearTimeout)(g), os = 0, p = us;
    },
    lagSmoothing: function(R, V) {
      l = R || 1 / 0, u = Math.min(V || 33, l);
    },
    fps: function(R) {
      c = 1e3 / (R || 240), h = _.time * 1e3 + c;
    },
    add: function(R, V, X) {
      var K = V ? function(Y, Q, k, D) {
        R(Y, Q, k, D), _.remove(K);
      } : R;
      return _.remove(R), d[X ? "unshift" : "push"](K), Lr(), K;
    },
    remove: function(R, V) {
      ~(V = d.indexOf(R)) && d.splice(V, 1) && b >= V && b--;
    },
    _listeners: d
  }, _;
})(), Lr = function() {
  return !os && Di.wake();
}, ce = {}, UT = /^[\d.\-M][\d.\-,\s]/, BT = /["']/g, HT = function(l) {
  for (var u = {}, a = l.substr(1, l.length - 3).split(":"), o = a[0], c = 1, h = a.length, d, g, p; c < h; c++)
    g = a[c], d = c !== h - 1 ? g.lastIndexOf(",") : g.length, p = g.substr(0, d), u[o] = isNaN(p) ? p.replace(BT, "").trim() : +p, o = g.substr(d + 1).trim();
  return u;
}, LT = function(l) {
  var u = l.indexOf("(") + 1, a = l.indexOf(")"), o = l.indexOf("(", u);
  return l.substring(u, ~o && o < a ? l.indexOf(")", a + 1) : a);
}, YT = function(l) {
  var u = (l + "").split("("), a = ce[u[0]];
  return a && u.length > 1 && a.config ? a.config.apply(null, ~l.indexOf("{") ? [HT(u[1])] : LT(l).split(",").map(Q_)) : ce._CE && UT.test(l) ? ce._CE("", l) : a;
}, qT = function(l) {
  return function(u) {
    return 1 - l(1 - u);
  };
}, Tu = function(l, u) {
  return l && (Ie(l) ? l : ce[l] || YT(l)) || u;
}, zu = function(l, u, a, o) {
  a === void 0 && (a = function(g) {
    return 1 - u(1 - g);
  }), o === void 0 && (o = function(g) {
    return g < 0.5 ? u(g * 2) / 2 : 1 - u((1 - g) * 2) / 2;
  });
  var c = {
    easeIn: u,
    easeOut: a,
    easeInOut: o
  }, h;
  return di(l, function(d) {
    ce[d] = Hi[d] = c, ce[h = d.toLowerCase()] = a;
    for (var g in c)
      ce[h + (g === "easeIn" ? ".in" : g === "easeOut" ? ".out" : ".inOut")] = ce[d + "." + g] = c[g];
  }), c;
}, oy = function(l) {
  return function(u) {
    return u < 0.5 ? (1 - l(1 - u * 2)) / 2 : 0.5 + l((u - 0.5) * 2) / 2;
  };
}, a0 = function f(l, u, a) {
  var o = u >= 1 ? u : 1, c = (a || (l ? 0.3 : 0.45)) / (u < 1 ? u : 1), h = c / y0 * (Math.asin(1 / o) || 0), d = function(v) {
    return v === 1 ? 1 : o * Math.pow(2, -10 * v) * sT((v - h) * c) + 1;
  }, g = l === "out" ? d : l === "in" ? function(p) {
    return 1 - d(1 - p);
  } : oy(d);
  return c = y0 / c, g.config = function(p, v) {
    return f(l, p, v);
  }, g;
}, u0 = function f(l, u) {
  u === void 0 && (u = 1.70158);
  var a = function(h) {
    return h ? --h * h * ((u + 1) * h + u) + 1 : 0;
  }, o = l === "out" ? a : l === "in" ? function(c) {
    return 1 - a(1 - c);
  } : oy(a);
  return o.config = function(c) {
    return f(l, c);
  }, o;
};
di("Linear,Quad,Cubic,Quart,Quint,Strong", function(f, l) {
  var u = l < 5 ? l + 1 : l;
  zu(f + ",Power" + (u - 1), l ? function(a) {
    return Math.pow(a, u);
  } : function(a) {
    return a;
  }, function(a) {
    return 1 - Math.pow(1 - a, u);
  }, function(a) {
    return a < 0.5 ? Math.pow(a * 2, u) / 2 : 1 - Math.pow((1 - a) * 2, u) / 2;
  });
});
ce.Linear.easeNone = ce.none = ce.Linear.easeIn;
zu("Elastic", a0("in"), a0("out"), a0());
(function(f, l) {
  var u = 1 / l, a = 2 * u, o = 2.5 * u, c = function(d) {
    return d < u ? f * d * d : d < a ? f * Math.pow(d - 1.5 / l, 2) + 0.75 : d < o ? f * (d -= 2.25 / l) * d + 0.9375 : f * Math.pow(d - 2.625 / l, 2) + 0.984375;
  };
  zu("Bounce", function(h) {
    return 1 - c(1 - h);
  }, c);
})(7.5625, 2.75);
zu("Expo", function(f) {
  return Math.pow(2, 10 * (f - 1)) * f + f * f * f * f * f * f * (1 - f);
});
zu("Circ", function(f) {
  return -(U_(1 - f * f) - 1);
});
zu("Sine", function(f) {
  return f === 1 ? 1 : -oT(f * uT) + 1;
});
zu("Back", u0("in"), u0("out"), u0());
ce.SteppedEase = ce.steps = Hi.SteppedEase = {
  config: function(l, u) {
    l === void 0 && (l = 1);
    var a = 1 / l, o = l + (u ? 0 : 1), c = u ? 1 : 0, h = 1 - Ee;
    return function(d) {
      return ((o * gs(0, h, d) | 0) + c) * a;
    };
  }
};
ls.ease = ce["quad.out"];
di("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(f) {
  return k0 += f + "," + f + "Params,";
});
var sy = function(l, u) {
  this.id = rT++, l._gsap = this, this.target = l, this.harness = u, this.get = u ? u.get : G_, this.set = u ? u.getSetter : em;
}, ss = /* @__PURE__ */ (function() {
  function f(u) {
    this.vars = u, this._delay = +u.delay || 0, (this._repeat = u.repeat === 1 / 0 ? -2 : u.repeat || 0) && (this._rDelay = u.repeatDelay || 0, this._yoyo = !!u.yoyo || !!u.yoyoEase), this._ts = 1, Hr(this, +u.duration, 1, 1), this.data = u.data, Xe && (this._ctx = Xe, Xe.data.push(this)), os || Di.wake();
  }
  var l = f.prototype;
  return l.delay = function(a) {
    return a || a === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + a - this._delay), this._delay = a, this) : this._delay;
  }, l.duration = function(a) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a) : this.totalDuration() && this._dur;
  }, l.totalDuration = function(a) {
    return arguments.length ? (this._dirty = 0, Hr(this, this._repeat < 0 ? a : (a - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, l.totalTime = function(a, o) {
    if (Lr(), !arguments.length)
      return this._tTime;
    var c = this._dp;
    if (c && c.smoothChildTiming && this._ts) {
      for (xf(this, a), !c._dp || c.parent || F_(c, this); c && c.parent; )
        c.parent._time !== c._start + (c._ts >= 0 ? c._tTime / c._ts : (c.totalDuration() - c._tTime) / -c._ts) && c.totalTime(c._tTime, !0), c = c.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && a < this._tDur || this._ts < 0 && a > 0 || !this._tDur && !a) && Rl(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== a || !this._dur && !o || this._initted && Math.abs(this._zTime) === Ee || !this._initted && this._dur && a || !a && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = a), j_(this, a, o)), this;
  }, l.time = function(a, o) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), a + G1(this)) % (this._dur + this._rDelay) || (a ? this._dur : 0), o) : this._time;
  }, l.totalProgress = function(a, o) {
    return arguments.length ? this.totalTime(this.totalDuration() * a, o) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, l.progress = function(a, o) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) + G1(this), o) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, l.iteration = function(a, o) {
    var c = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (a - 1) * c, o) : this._repeat ? Br(this._tTime, c) + 1 : 1;
  }, l.timeScale = function(a, o) {
    if (!arguments.length)
      return this._rts === -Ee ? 0 : this._rts;
    if (this._rts === a)
      return this;
    var c = this.parent && this._ts ? cf(this.parent._time, this) : this._tTime, h = this._rts < 0;
    this._rts = +a || 0, this._ts = this._ps || a === -Ee ? 0 : this._rts;
    var d = this.totalDuration();
    return (h !== this._rts < 0 || c > 0 && c < d) && this.totalTime(gs(-Math.abs(this._delay), d, c), o !== !1), Ef(this), yT(this);
  }, l.paused = function(a) {
    if (!arguments.length)
      return this._ps;
    if (this._ps !== a)
      if (this._ps = a, a)
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0;
      else {
        Lr(), this._ts = this._rts;
        var o = this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, c = this.progress() === 1 && Math.abs(this._zTime) !== Ee, h;
        if (c)
          for (this._tTime -= Ee, h = this._first; h; ) {
            if (!h._dur && h._zTime < 0 && h._ts && h._start <= o + Ee) {
              c = !1;
              break;
            }
            h = h._next;
          }
        this.totalTime(o, c);
      }
    return this;
  }, l.startTime = function(a) {
    if (arguments.length) {
      this._start = Qe(a);
      var o = this.parent || this._dp;
      return o && (o._sort || !this.parent) && Rl(o, this, this._start - this._delay), this;
    }
    return this._start;
  }, l.endTime = function(a) {
    return this._start + (hi(a) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, l.rawTime = function(a) {
    var o = this.parent || this._dp;
    return o ? a && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? cf(o.rawTime(a), this) : this._tTime : this._tTime;
  }, l.revert = function(a) {
    a === void 0 && (a = gT);
    var o = Un;
    return Un = a, $0(this) && (this.timeline && this.timeline.revert(a), this.totalTime(-0.01, a.suppressEvents)), this.data !== "nested" && a.kill !== !1 && this.kill(), Un = o, this;
  }, l.globalTime = function(a) {
    for (var o = this, c = arguments.length ? a : o.rawTime(); o; )
      c = o._start + c / (Math.abs(o._ts) || 1), o = o._dp;
    return !this.parent && this._sat ? this._sat.globalTime(a) : c;
  }, l.repeat = function(a) {
    return arguments.length ? (this._repeat = a === 1 / 0 ? -2 : a, j1(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, l.repeatDelay = function(a) {
    if (arguments.length) {
      var o = this._time;
      return this._rDelay = a, j1(this), o ? this.time(o) : this;
    }
    return this._rDelay;
  }, l.yoyo = function(a) {
    return arguments.length ? (this._yoyo = a, this) : this._yoyo;
  }, l.seek = function(a, o) {
    return this.totalTime(Ii(this, a), hi(o));
  }, l.restart = function(a, o) {
    return this.play().totalTime(a ? -this._delay : 0, hi(o)), this._dur || (this._zTime = -Ee), this;
  }, l.play = function(a, o) {
    return a != null && this.seek(a, o), this.reversed(!1).paused(!1);
  }, l.reverse = function(a, o) {
    return a != null && this.seek(a || this.totalDuration(), o), this.reversed(!0).paused(!1);
  }, l.pause = function(a, o) {
    return a != null && this.seek(a, o), this.paused(!0);
  }, l.resume = function() {
    return this.paused(!1);
  }, l.reversed = function(a) {
    return arguments.length ? (!!a !== this.reversed() && this.timeScale(-this._rts || (a ? -Ee : 0)), this) : this._rts < 0;
  }, l.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -Ee, this;
  }, l.isActive = function() {
    var a = this.parent || this._dp, o = this._start, c;
    return !!(!a || this._ts && this._initted && a.isActive() && (c = a.rawTime(!0)) >= o && c < this.endTime(!0) - Ee);
  }, l.eventCallback = function(a, o, c) {
    var h = this.vars;
    return arguments.length > 1 ? (o ? (h[a] = o, c && (h[a + "Params"] = c), a === "onUpdate" && (this._onUpdate = o)) : delete h[a], this) : h[a];
  }, l.then = function(a) {
    var o = this, c = o._prom;
    return new Promise(function(h) {
      var d = Ie(a) ? a : Z_, g = function() {
        var v = o.then;
        o.then = null, c && c(), Ie(d) && (d = d(o)) && (d.then || d === o) && (o.then = v), h(d), o.then = v;
      };
      o._initted && o.totalProgress() === 1 && o._ts >= 0 || !o._tTime && o._ts < 0 ? g() : o._prom = g;
    });
  }, l.kill = function() {
    Lo(this);
  }, f;
})();
Li(ss.prototype, {
  _time: 0,
  _start: 0,
  _end: 0,
  _tTime: 0,
  _tDur: 0,
  _dirty: 0,
  _repeat: 0,
  _yoyo: !1,
  parent: null,
  _initted: !1,
  _rDelay: 0,
  _ts: 1,
  _dp: 0,
  ratio: 0,
  _zTime: -Ee,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var ci = /* @__PURE__ */ (function(f) {
  N_(l, f);
  function l(a, o) {
    var c;
    return a === void 0 && (a = {}), c = f.call(this, a) || this, c.labels = {}, c.smoothChildTiming = !!a.smoothChildTiming, c.autoRemoveChildren = !!a.autoRemoveChildren, c._sort = hi(a.sortChildren), Ze && Rl(a.parent || Ze, Jl(c), o), a.reversed && c.reverse(), a.paused && c.paused(!0), a.scrollTrigger && J_(Jl(c), a.scrollTrigger), c;
  }
  var u = l.prototype;
  return u.to = function(o, c, h) {
    return Fo(0, arguments, this), this;
  }, u.from = function(o, c, h) {
    return Fo(1, arguments, this), this;
  }, u.fromTo = function(o, c, h, d) {
    return Fo(2, arguments, this), this;
  }, u.set = function(o, c, h) {
    return c.duration = 0, c.parent = this, Ko(c).repeatDelay || (c.repeat = 0), c.immediateRender = !!c.immediateRender, new hn(o, c, Ii(this, h), 1), this;
  }, u.call = function(o, c, h) {
    return Rl(this, hn.delayedCall(0, o, c), h);
  }, u.staggerTo = function(o, c, h, d, g, p, v) {
    return h.duration = c, h.stagger = h.stagger || d, h.onComplete = p, h.onCompleteParams = v, h.parent = this, new hn(o, h, Ii(this, g)), this;
  }, u.staggerFrom = function(o, c, h, d, g, p, v) {
    return h.runBackwards = 1, Ko(h).immediateRender = hi(h.immediateRender), this.staggerTo(o, c, h, d, g, p, v);
  }, u.staggerFromTo = function(o, c, h, d, g, p, v, _) {
    return d.startAt = h, Ko(d).immediateRender = hi(d.immediateRender), this.staggerTo(o, c, d, g, p, v, _);
  }, u.render = function(o, c, h) {
    var d = this._time, g = this._dirty ? this.totalDuration() : this._tDur, p = this._dur, v = o <= 0 ? 0 : Qe(o), _ = this._zTime < 0 != o < 0 && (this._initted || !p), S, b, M, T, R, V, X, K, Y, Q, k, D;
    if (this !== Ze && v > g && o >= 0 && (v = g), v !== this._tTime || h || _) {
      if (d !== this._time && p && (v += this._time - d, o += this._time - d), S = v, Y = this._start, K = this._ts, V = !K, _ && (p || (d = this._zTime), (o || !c) && (this._zTime = o)), this._repeat) {
        if (k = this._yoyo, R = p + this._rDelay, this._repeat < -1 && o < 0)
          return this.totalTime(R * 100 + o, c, h);
        if (S = Qe(v % R), v === g ? (T = this._repeat, S = p) : (Q = Qe(v / R), T = ~~Q, T && T === Q && (S = p, T--), S > p && (S = p)), Q = Br(this._tTime, R), !d && this._tTime && Q !== T && this._tTime - Q * R - this._dur <= 0 && (Q = T), k && T & 1 && (S = p - S, D = 1), T !== Q && !this._lock) {
          var Z = k && Q & 1, $ = Z === (k && T & 1);
          if (T < Q && (Z = !Z), d = Z ? 0 : v % p ? p : v, this._lock = 1, this.render(d || (D ? 0 : Qe(T * R)), c, !p)._lock = 0, this._tTime = v, !c && this.parent && Ni(this, "onRepeat"), this.vars.repeatRefresh && !D && (this.invalidate()._lock = 1, Q = T), d && d !== this._time || V !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (p = this._dur, g = this._tDur, $ && (this._lock = 2, d = Z ? p : -1e-4, this.render(d, !0), this.vars.repeatRefresh && !D && this.invalidate()), this._lock = 0, !this._ts && !V)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (X = ET(this, Qe(d), Qe(S)), X && (v -= S - (S = X._start))), this._tTime = v, this._time = S, this._act = !!K, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = o, d = 0), !d && v && p && !c && !Q && (Ni(this, "onStart"), this._tTime !== v))
        return this;
      if (S >= d && o >= 0)
        for (b = this._first; b; ) {
          if (M = b._next, (b._act || S >= b._start) && b._ts && X !== b) {
            if (b.parent !== this)
              return this.render(o, c, h);
            if (b.render(b._ts > 0 ? (S - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (S - b._start) * b._ts, c, h), S !== this._time || !this._ts && !V) {
              X = 0, M && (v += this._zTime = -Ee);
              break;
            }
          }
          b = M;
        }
      else {
        b = this._last;
        for (var G = o < 0 ? o : S; b; ) {
          if (M = b._prev, (b._act || G <= b._end) && b._ts && X !== b) {
            if (b.parent !== this)
              return this.render(o, c, h);
            if (b.render(b._ts > 0 ? (G - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (G - b._start) * b._ts, c, h || Un && $0(b)), S !== this._time || !this._ts && !V) {
              X = 0, M && (v += this._zTime = G ? -Ee : Ee);
              break;
            }
          }
          b = M;
        }
      }
      if (X && !c && (this.pause(), X.render(S >= d ? 0 : -Ee)._zTime = S >= d ? 1 : -1, this._ts))
        return this._start = Y, Ef(this), this.render(o, c, h);
      this._onUpdate && !c && Ni(this, "onUpdate", !0), (v === g && this._tTime >= this.totalDuration() || !v && d) && (Y === this._start || Math.abs(K) !== Math.abs(this._ts)) && (this._lock || ((o || !p) && (v === g && this._ts > 0 || !v && this._ts < 0) && qa(this, 1), !c && !(o < 0 && !d) && (v || d || !g) && (Ni(this, v === g && o >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(v < g && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, u.add = function(o, c) {
    var h = this;
    if (Il(c) || (c = Ii(this, c, o)), !(o instanceof ss)) {
      if (Xn(o))
        return o.forEach(function(d) {
          return h.add(d, c);
        }), this;
      if (Mn(o))
        return this.addLabel(o, c);
      if (Ie(o))
        o = hn.delayedCall(0, o);
      else
        return this;
    }
    return this !== o ? Rl(this, o, c) : this;
  }, u.getChildren = function(o, c, h, d) {
    o === void 0 && (o = !0), c === void 0 && (c = !0), h === void 0 && (h = !0), d === void 0 && (d = -nl);
    for (var g = [], p = this._first; p; )
      p._start >= d && (p instanceof hn ? c && g.push(p) : (h && g.push(p), o && g.push.apply(g, p.getChildren(!0, c, h)))), p = p._next;
    return g;
  }, u.getById = function(o) {
    for (var c = this.getChildren(1, 1, 1), h = c.length; h--; )
      if (c[h].vars.id === o)
        return c[h];
  }, u.remove = function(o) {
    return Mn(o) ? this.removeLabel(o) : Ie(o) ? this.killTweensOf(o) : (o.parent === this && Tf(this, o), o === this._recent && (this._recent = this._last), bu(this));
  }, u.totalTime = function(o, c) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Qe(Di.time - (this._ts > 0 ? o / this._ts : (this.totalDuration() - o) / -this._ts))), f.prototype.totalTime.call(this, o, c), this._forcing = 0, this) : this._tTime;
  }, u.addLabel = function(o, c) {
    return this.labels[o] = Ii(this, c), this;
  }, u.removeLabel = function(o) {
    return delete this.labels[o], this;
  }, u.addPause = function(o, c, h) {
    var d = hn.delayedCall(0, c || us, h);
    return d.data = "isPause", this._hasPause = 1, Rl(this, d, Ii(this, o));
  }, u.removePause = function(o) {
    var c = this._first;
    for (o = Ii(this, o); c; )
      c._start === o && c.data === "isPause" && qa(c), c = c._next;
  }, u.killTweensOf = function(o, c, h) {
    for (var d = this.getTweensOf(o, h), g = d.length; g--; )
      za !== d[g] && d[g].kill(o, c);
    return this;
  }, u.getTweensOf = function(o, c) {
    for (var h = [], d = il(o), g = this._first, p = Il(c), v; g; )
      g instanceof hn ? pT(g._targets, d) && (p ? (!za || g._initted && g._ts) && g.globalTime(0) <= c && g.globalTime(g.totalDuration()) > c : !c || g.isActive()) && h.push(g) : (v = g.getTweensOf(d, c)).length && h.push.apply(h, v), g = g._next;
    return h;
  }, u.tweenTo = function(o, c) {
    c = c || {};
    var h = this, d = Ii(h, o), g = c, p = g.startAt, v = g.onStart, _ = g.onStartParams, S = g.immediateRender, b, M = hn.to(h, Li({
      ease: c.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: d,
      overwrite: "auto",
      duration: c.duration || Math.abs((d - (p && "time" in p ? p.time : h._time)) / h.timeScale()) || Ee,
      onStart: function() {
        if (h.pause(), !b) {
          var R = c.duration || Math.abs((d - (p && "time" in p ? p.time : h._time)) / h.timeScale());
          M._dur !== R && Hr(M, R, 0, 1).render(M._time, !0, !0), b = 1;
        }
        v && v.apply(M, _ || []);
      }
    }, c));
    return S ? M.render(0) : M;
  }, u.tweenFromTo = function(o, c, h) {
    return this.tweenTo(c, Li({
      startAt: {
        time: Ii(this, o)
      }
    }, h));
  }, u.recent = function() {
    return this._recent;
  }, u.nextLabel = function(o) {
    return o === void 0 && (o = this._time), Q1(this, Ii(this, o));
  }, u.previousLabel = function(o) {
    return o === void 0 && (o = this._time), Q1(this, Ii(this, o), 1);
  }, u.currentLabel = function(o) {
    return arguments.length ? this.seek(o, !0) : this.previousLabel(this._time + Ee);
  }, u.shiftChildren = function(o, c, h) {
    h === void 0 && (h = 0);
    var d = this._first, g = this.labels, p;
    for (o = Qe(o); d; )
      d._start >= h && (d._start += o, d._end += o), d = d._next;
    if (c)
      for (p in g)
        g[p] >= h && (g[p] += o);
    return bu(this);
  }, u.invalidate = function(o) {
    var c = this._first;
    for (this._lock = 0; c; )
      c.invalidate(o), c = c._next;
    return f.prototype.invalidate.call(this, o);
  }, u.clear = function(o) {
    o === void 0 && (o = !0);
    for (var c = this._first, h; c; )
      h = c._next, this.remove(c), c = h;
    return this._dp && (this._time = this._tTime = this._pTime = 0), o && (this.labels = {}), bu(this);
  }, u.totalDuration = function(o) {
    var c = 0, h = this, d = h._last, g = nl, p, v, _;
    if (arguments.length)
      return h.timeScale((h._repeat < 0 ? h.duration() : h.totalDuration()) / (h.reversed() ? -o : o));
    if (h._dirty) {
      for (_ = h.parent; d; )
        p = d._prev, d._dirty && d.totalDuration(), v = d._start, v > g && h._sort && d._ts && !h._lock ? (h._lock = 1, Rl(h, d, v - d._delay, 1)._lock = 0) : g = v, v < 0 && d._ts && (c -= v, (!_ && !h._dp || _ && _.smoothChildTiming) && (h._start += Qe(v / h._ts), h._time -= v, h._tTime -= v), h.shiftChildren(-v, !1, -1 / 0), g = 0), d._end > c && d._ts && (c = d._end), d = p;
      Hr(h, h === Ze && h._time > c ? h._time : c, 1, 1), h._dirty = 0;
    }
    return h._tDur;
  }, l.updateRoot = function(o) {
    if (Ze._ts && (j_(Ze, cf(o, Ze)), V_ = Di.frame), Di.frame >= X1) {
      X1 += Bi.autoSleep || 120;
      var c = Ze._first;
      if ((!c || !c._ts) && Bi.autoSleep && Di._listeners.length < 2) {
        for (; c && !c._ts; )
          c = c._next;
        c || Di.sleep();
      }
    }
  }, l;
})(ss);
Li(ci.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var XT = function(l, u, a, o, c, h, d) {
  var g = new mi(this._pt, l, u, 0, 1, my, null, c), p = 0, v = 0, _, S, b, M, T, R, V, X;
  for (g.b = a, g.e = o, a += "", o += "", (V = ~o.indexOf("random(")) && (o = rs(o)), h && (X = [a, o], h(X, l, u), a = X[0], o = X[1]), S = a.match(n0) || []; _ = n0.exec(o); )
    M = _[0], T = o.substring(p, _.index), b ? b = (b + 1) % 5 : T.substr(-5) === "rgba(" && (b = 1), M !== S[v++] && (R = parseFloat(S[v - 1]) || 0, g._pt = {
      _next: g._pt,
      p: T || v === 1 ? T : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: R,
      c: M.charAt(1) === "=" ? Ar(R, M) - R : parseFloat(M) - R,
      m: b && b < 4 ? Math.round : 0
    }, p = n0.lastIndex);
  return g.c = p < o.length ? o.substring(p, o.length) : "", g.fp = d, (L_.test(o) || V) && (g.e = 0), this._pt = g, g;
}, W0 = function(l, u, a, o, c, h, d, g, p, v) {
  Ie(o) && (o = o(c || 0, l, h));
  var _ = l[u], S = a !== "get" ? a : Ie(_) ? p ? l[u.indexOf("set") || !Ie(l["get" + u.substr(3)]) ? u : "get" + u.substr(3)](p) : l[u]() : _, b = Ie(_) ? p ? ZT : hy : tm, M;
  if (Mn(o) && (~o.indexOf("random(") && (o = rs(o)), o.charAt(1) === "=" && (M = Ar(S, o) + (Yn(S) || 0), (M || M === 0) && (o = M))), !v || S !== o || w0)
    return !isNaN(S * o) && o !== "" ? (M = new mi(this._pt, l, u, +S || 0, o - (S || 0), typeof _ == "boolean" ? FT : dy, 0, b), p && (M.fp = p), d && M.modifier(d, this, l), this._pt = M) : (!_ && !(u in l) && F0(u, o), XT.call(this, l, u, S, o, b, g || Bi.stringFilter, p));
}, VT = function(l, u, a, o, c) {
  if (Ie(l) && (l = Jo(l, c, u, a, o)), !Nl(l) || l.style && l.nodeType || Xn(l) || B_(l))
    return Mn(l) ? Jo(l, c, u, a, o) : l;
  var h = {}, d;
  for (d in l)
    h[d] = Jo(l[d], c, u, a, o);
  return h;
}, cy = function(l, u, a, o, c, h) {
  var d, g, p, v;
  if (zi[l] && (d = new zi[l]()).init(c, d.rawVars ? u[l] : VT(u[l], o, c, h, a), a, o, h) !== !1 && (a._pt = g = new mi(a._pt, c, l, 0, 1, d.render, d, 0, d.priority), a !== Mr))
    for (p = a._ptLookup[a._targets.indexOf(c)], v = d._props.length; v--; )
      p[d._props[v]] = g;
  return d;
}, za, w0, I0 = function f(l, u, a) {
  var o = l.vars, c = o.ease, h = o.startAt, d = o.immediateRender, g = o.lazy, p = o.onUpdate, v = o.runBackwards, _ = o.yoyoEase, S = o.keyframes, b = o.autoRevert, M = l._dur, T = l._startAt, R = l._targets, V = l.parent, X = V && V.data === "nested" ? V.vars.targets : R, K = l._overwrite === "auto" && !j0, Y = l.timeline, Q = o.easeReverse || _, k, D, Z, $, G, ut, lt, St, Mt, et, F, P, I;
  if (Y && (!S || !c) && (c = "none"), l._ease = Tu(c, ls.ease), l._rEase = Q && (Tu(Q) || l._ease), l._from = !Y && !!o.runBackwards, l._from && (l.ratio = 1), !Y || S && !o.stagger) {
    if (St = R[0] ? Su(R[0]).harness : 0, P = St && o[St.prop], k = sf(o, J0), T && (T._zTime < 0 && T.progress(1), u < 0 && v && d && !b ? T.render(-1, !0) : T.revert(v && M ? Pc : mT), T._lazy = 0), h) {
      if (qa(l._startAt = hn.set(R, Li({
        data: "isStart",
        overwrite: !1,
        parent: V,
        immediateRender: !0,
        lazy: !T && hi(g),
        startAt: null,
        delay: 0,
        onUpdate: p && function() {
          return Ni(l, "onUpdate");
        },
        stagger: 0
      }, h))), l._startAt._dp = 0, l._startAt._sat = l, u < 0 && (Un || !d && !b) && l._startAt.revert(Pc), d && M && u <= 0 && a <= 0) {
        u && (l._zTime = u);
        return;
      }
    } else if (v && M && !T) {
      if (u && (d = !1), Z = Li({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: d && !T && hi(g),
        immediateRender: d,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: V
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, k), P && (Z[St.prop] = P), qa(l._startAt = hn.set(R, Z)), l._startAt._dp = 0, l._startAt._sat = l, u < 0 && (Un ? l._startAt.revert(Pc) : l._startAt.render(-1, !0)), l._zTime = u, !d)
        f(l._startAt, Ee, Ee);
      else if (!u)
        return;
    }
    for (l._pt = l._ptCache = 0, g = M && hi(g) || g && !M, D = 0; D < R.length; D++) {
      if (G = R[D], lt = G._gsap || P0(R)[D]._gsap, l._ptLookup[D] = et = {}, b0[lt.id] && Ba.length && of(), F = X === R ? D : X.indexOf(G), St && (Mt = new St()).init(G, P || k, l, F, X) !== !1 && (l._pt = $ = new mi(l._pt, G, Mt.name, 0, 1, Mt.render, Mt, 0, Mt.priority), Mt._props.forEach(function(st) {
        et[st] = $;
      }), Mt.priority && (ut = 1)), !St || P)
        for (Z in k)
          zi[Z] && (Mt = cy(Z, k, l, F, G, X)) ? Mt.priority && (ut = 1) : et[Z] = $ = W0.call(l, G, Z, "get", k[Z], F, X, 0, o.stringFilter);
      l._op && l._op[D] && l.kill(G, l._op[D]), K && l._pt && (za = l, Ze.killTweensOf(G, et, l.globalTime(u)), I = !l.parent, za = 0), l._pt && g && (b0[lt.id] = 1);
    }
    ut && gy(l), l._onInit && l._onInit(l);
  }
  l._onUpdate = p, l._initted = (!l._op || l._pt) && !I, S && u <= 0 && Y.render(nl, !0, !0);
}, GT = function(l, u, a, o, c, h, d, g) {
  var p = (l._pt && l._ptCache || (l._ptCache = {}))[u], v, _, S, b;
  if (!p)
    for (p = l._ptCache[u] = [], S = l._ptLookup, b = l._targets.length; b--; ) {
      if (v = S[b][u], v && v.d && v.d._pt)
        for (v = v.d._pt; v && v.p !== u && v.fp !== u; )
          v = v._next;
      if (!v)
        return w0 = 1, l.vars[u] = "+=0", I0(l, d), w0 = 0, g ? as(u + " not eligible for reset. Try splitting into individual properties") : 1;
      p.push(v);
    }
  for (b = p.length; b--; )
    _ = p[b], v = _._pt || _, v.s = (o || o === 0) && !c ? o : v.s + (o || 0) + h * v.c, v.c = a - v.s, _.e && (_.e = an(a) + Yn(_.e)), _.b && (_.b = v.s + Yn(_.b));
}, jT = function(l, u) {
  var a = l[0] ? Su(l[0]).harness : 0, o = a && a.aliases, c, h, d, g;
  if (!o)
    return u;
  c = Ur({}, u);
  for (h in o)
    if (h in c)
      for (g = o[h].split(","), d = g.length; d--; )
        c[g[d]] = c[h];
  return c;
}, QT = function(l, u, a, o) {
  var c = u.ease || o || "power1.inOut", h, d;
  if (Xn(u))
    d = a[l] || (a[l] = []), u.forEach(function(g, p) {
      return d.push({
        t: p / (u.length - 1) * 100,
        v: g,
        e: c
      });
    });
  else
    for (h in u)
      d = a[h] || (a[h] = []), h === "ease" || d.push({
        t: parseFloat(l),
        v: u[h],
        e: c
      });
}, Jo = function(l, u, a, o, c) {
  return Ie(l) ? l.call(u, a, o, c) : Mn(l) && ~l.indexOf("random(") ? rs(l) : l;
}, hf = k0 + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", fy = {};
di(hf + ",id,stagger,delay,duration,paused,scrollTrigger", function(f) {
  return fy[f] = 1;
});
hf = hf.split(",");
var hn = /* @__PURE__ */ (function(f) {
  N_(l, f);
  function l(a, o, c, h) {
    var d;
    typeof o == "number" && (c.duration = o, o = c, c = null), d = f.call(this, h ? o : Ko(o)) || this;
    var g = d.vars, p = g.duration, v = g.delay, _ = g.immediateRender, S = g.stagger, b = g.overwrite, M = g.keyframes, T = g.defaults, R = g.scrollTrigger, V = o.parent || Ze, X = (Xn(a) || B_(a) ? Il(a[0]) : "length" in o) ? [a] : il(a), K, Y, Q, k, D, Z, $, G;
    if (d._targets = X.length ? P0(X) : as("GSAP target " + a + " not found. https://gsap.com", !Bi.nullTargetWarn) || [], d._ptLookup = [], d._overwrite = b, M || S || Hc(p) || Hc(v)) {
      o = d.vars;
      var ut = o.easeReverse || o.yoyoEase;
      if (K = d.timeline = new ci({
        data: "nested",
        defaults: T || {},
        targets: V && V.data === "nested" ? V.vars.targets : X
      }), K.kill(), K.parent = K._dp = Jl(d), K._start = 0, S || Hc(p) || Hc(v)) {
        if (k = X.length, $ = S && W_(S), Nl(S))
          for (D in S)
            ~hf.indexOf(D) && (G || (G = {}), G[D] = S[D]);
        for (Y = 0; Y < k; Y++)
          Q = sf(o, fy), Q.stagger = 0, ut && (Q.easeReverse = ut), G && Ur(Q, G), Z = X[Y], Q.duration = +Jo(p, Jl(d), Y, Z, X), Q.delay = (+Jo(v, Jl(d), Y, Z, X) || 0) - d._delay, !S && k === 1 && Q.delay && (d._delay = v = Q.delay, d._start += v, Q.delay = 0), K.to(Z, Q, $ ? $(Y, Z, X) : 0), K._ease = ce.none;
        K.duration() ? p = v = 0 : d.timeline = 0;
      } else if (M) {
        Ko(Li(K.vars.defaults, {
          ease: "none"
        })), K._ease = Tu(M.ease || o.ease || "none");
        var lt = 0, St, Mt, et;
        if (Xn(M))
          M.forEach(function(F) {
            return K.to(X, F, ">");
          }), K.duration();
        else {
          Q = {};
          for (D in M)
            D === "ease" || D === "easeEach" || QT(D, M[D], Q, M.easeEach);
          for (D in Q)
            for (St = Q[D].sort(function(F, P) {
              return F.t - P.t;
            }), lt = 0, Y = 0; Y < St.length; Y++)
              Mt = St[Y], et = {
                ease: Mt.e,
                duration: (Mt.t - (Y ? St[Y - 1].t : 0)) / 100 * p
              }, et[D] = Mt.v, K.to(X, et, lt), lt += et.duration;
          K.duration() < p && K.to({}, {
            duration: p - K.duration()
          });
        }
      }
      p || d.duration(p = K.duration());
    } else
      d.timeline = 0;
    return b === !0 && !j0 && (za = Jl(d), Ze.killTweensOf(X), za = 0), Rl(V, Jl(d), c), o.reversed && d.reverse(), o.paused && d.paused(!0), (_ || !p && !M && d._start === Qe(V._time) && hi(_) && ST(Jl(d)) && V.data !== "nested") && (d._tTime = -Ee, d.render(Math.max(0, -v) || 0)), R && J_(Jl(d), R), d;
  }
  var u = l.prototype;
  return u.render = function(o, c, h) {
    var d = this._time, g = this._tDur, p = this._dur, v = o < 0, _ = o > g - Ee && !v ? g : o < Ee ? 0 : o, S, b, M, T, R, V, X, K;
    if (!p)
      TT(this, o, c, h);
    else if (_ !== this._tTime || !o || h || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== v || this._lazy) {
      if (S = _, K = this.timeline, this._repeat) {
        if (T = p + this._rDelay, this._repeat < -1 && v)
          return this.totalTime(T * 100 + o, c, h);
        if (S = Qe(_ % T), _ === g ? (M = this._repeat, S = p) : (R = Qe(_ / T), M = ~~R, M && M === R ? (S = p, M--) : S > p && (S = p)), V = this._yoyo && M & 1, V && (S = p - S), R = Br(this._tTime, T), S === d && !h && this._initted && M === R)
          return this._tTime = _, this;
        M !== R && this.vars.repeatRefresh && !V && !this._lock && S !== T && this._initted && (this._lock = h = 1, this.render(Qe(T * M), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (k_(this, v ? o : S, h, c, _))
          return this._tTime = 0, this;
        if (d !== this._time && !(h && this.vars.repeatRefresh && M !== R))
          return this;
        if (p !== this._dur)
          return this.render(o, c, h);
      }
      if (this._rEase) {
        var Y = S < d;
        if (Y !== this._inv) {
          var Q = Y ? d : p - d;
          this._inv = Y, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = d, this._invRecip = Q ? (Y ? -1 : 1) / Q : 0, this._invScale = Y ? -this.ratio : 1 - this.ratio, this._invEase = Y ? this._rEase : this._ease;
        }
        this.ratio = X = this._invRatio + this._invScale * this._invEase((S - this._invTime) * this._invRecip);
      } else
        this.ratio = X = this._ease(S / p);
      if (this._from && (this.ratio = X = 1 - X), this._tTime = _, this._time = S, !this._act && this._ts && (this._act = 1, this._lazy = 0), !d && _ && !c && !R && (Ni(this, "onStart"), this._tTime !== _))
        return this;
      for (b = this._pt; b; )
        b.r(X, b.d), b = b._next;
      K && K.render(o < 0 ? o : K._dur * K._ease(S / this._dur), c, h) || this._startAt && (this._zTime = o), this._onUpdate && !c && (v && T0(this, o, c, h), Ni(this, "onUpdate")), this._repeat && M !== R && this.vars.onRepeat && !c && this.parent && Ni(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (v && !this._onUpdate && T0(this, o, !0, !0), (o || !p) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && qa(this, 1), !c && !(v && !d) && (_ || d || V) && (Ni(this, _ === g ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < g && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, u.targets = function() {
    return this._targets;
  }, u.invalidate = function(o) {
    return (!o || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(o), f.prototype.invalidate.call(this, o);
  }, u.resetTo = function(o, c, h, d, g) {
    os || Di.wake(), this._ts || this.play();
    var p = Math.min(this._dur, (this._dp._time - this._start) * this._ts), v;
    return this._initted || I0(this, p), v = this._ease(p / this._dur), GT(this, o, c, h, d, v, p, g) ? this.resetTo(o, c, h, d, 1) : (xf(this, 0), this.parent || K_(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, u.kill = function(o, c) {
    if (c === void 0 && (c = "all"), !o && (!c || c === "all"))
      return this._lazy = this._pt = 0, this.parent ? Lo(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Un), this;
    if (this.timeline) {
      var h = this.timeline.totalDuration();
      return this.timeline.killTweensOf(o, c, za && za.vars.overwrite !== !0)._first || Lo(this), this.parent && h !== this.timeline.totalDuration() && Hr(this, this._dur * this.timeline._tDur / h, 0, 1), this;
    }
    var d = this._targets, g = o ? il(o) : d, p = this._ptLookup, v = this._pt, _, S, b, M, T, R, V;
    if ((!c || c === "all") && _T(d, g))
      return c === "all" && (this._pt = 0), Lo(this);
    for (_ = this._op = this._op || [], c !== "all" && (Mn(c) && (T = {}, di(c, function(X) {
      return T[X] = 1;
    }), c = T), c = jT(d, c)), V = d.length; V--; )
      if (~g.indexOf(d[V])) {
        S = p[V], c === "all" ? (_[V] = c, M = S, b = {}) : (b = _[V] = _[V] || {}, M = c);
        for (T in M)
          R = S && S[T], R && ((!("kill" in R.d) || R.d.kill(T) === !0) && Tf(this, R, "_pt"), delete S[T]), b !== "all" && (b[T] = 1);
      }
    return this._initted && !this._pt && v && Lo(this), this;
  }, l.to = function(o, c) {
    return new l(o, c, arguments[2]);
  }, l.from = function(o, c) {
    return Fo(1, arguments);
  }, l.delayedCall = function(o, c, h, d) {
    return new l(c, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: o,
      onComplete: c,
      onReverseComplete: c,
      onCompleteParams: h,
      onReverseCompleteParams: h,
      callbackScope: d
    });
  }, l.fromTo = function(o, c, h) {
    return Fo(2, arguments);
  }, l.set = function(o, c) {
    return c.duration = 0, c.repeatDelay || (c.repeat = 0), new l(o, c);
  }, l.killTweensOf = function(o, c, h) {
    return Ze.killTweensOf(o, c, h);
  }, l;
})(ss);
Li(hn.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
di("staggerTo,staggerFrom,staggerFromTo", function(f) {
  hn[f] = function() {
    var l = new ci(), u = E0.call(arguments, 0);
    return u.splice(f === "staggerFromTo" ? 5 : 4, 0, 0), l[f].apply(l, u);
  };
});
var tm = function(l, u, a) {
  return l[u] = a;
}, hy = function(l, u, a) {
  return l[u](a);
}, ZT = function(l, u, a, o) {
  return l[u](o.fp, a);
}, KT = function(l, u, a) {
  return l.setAttribute(u, a);
}, em = function(l, u) {
  return Ie(l[u]) ? hy : Q0(l[u]) && l.setAttribute ? KT : tm;
}, dy = function(l, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * l) * 1e6) / 1e6, u);
}, FT = function(l, u) {
  return u.set(u.t, u.p, !!(u.s + u.c * l), u);
}, my = function(l, u) {
  var a = u._pt, o = "";
  if (!l && u.b)
    o = u.b;
  else if (l === 1 && u.e)
    o = u.e;
  else {
    for (; a; )
      o = a.p + (a.m ? a.m(a.s + a.c * l) : Math.round((a.s + a.c * l) * 1e4) / 1e4) + o, a = a._next;
    o += u.c;
  }
  u.set(u.t, u.p, o, u);
}, nm = function(l, u) {
  for (var a = u._pt; a; )
    a.r(l, a.d), a = a._next;
}, JT = function(l, u, a, o) {
  for (var c = this._pt, h; c; )
    h = c._next, c.p === o && c.modifier(l, u, a), c = h;
}, kT = function(l) {
  for (var u = this._pt, a, o; u; )
    o = u._next, u.p === l && !u.op || u.op === l ? Tf(this, u, "_pt") : u.dep || (a = 1), u = o;
  return !a;
}, PT = function(l, u, a, o) {
  o.mSet(l, u, o.m.call(o.tween, a, o.mt), o);
}, gy = function(l) {
  for (var u = l._pt, a, o, c, h; u; ) {
    for (a = u._next, o = c; o && o.pr > u.pr; )
      o = o._next;
    (u._prev = o ? o._prev : h) ? u._prev._next = u : c = u, (u._next = o) ? o._prev = u : h = u, u = a;
  }
  l._pt = c;
}, mi = /* @__PURE__ */ (function() {
  function f(u, a, o, c, h, d, g, p, v) {
    this.t = a, this.s = c, this.c = h, this.p = o, this.r = d || dy, this.d = g || this, this.set = p || tm, this.pr = v || 0, this._next = u, u && (u._prev = this);
  }
  var l = f.prototype;
  return l.modifier = function(a, o, c) {
    this.mSet = this.mSet || this.set, this.set = PT, this.m = a, this.mt = c, this.tween = o;
  }, f;
})();
di(k0 + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(f) {
  return J0[f] = 1;
});
Hi.TweenMax = Hi.TweenLite = hn;
Hi.TimelineLite = Hi.TimelineMax = ci;
Ze = new ci({
  sortChildren: !1,
  defaults: ls,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Bi.stringFilter = ry;
var Eu = [], Wc = {}, $T = [], K1 = 0, WT = 0, r0 = function(l) {
  return (Wc[l] || $T).map(function(u) {
    return u();
  });
}, cs = function() {
  var l = Date.now(), u = [];
  l - K1 > 2 && (r0("matchMediaInit"), Eu.forEach(function(a) {
    var o = a.queries, c = a.conditions, h, d, g, p;
    for (d in o)
      h = Al.matchMedia(o[d]).matches, h && (g = 1), h !== c[d] && (c[d] = h, p = 1);
    p && (a.revert(), g && u.push(a));
  }), r0("matchMediaRevert"), u.forEach(function(a) {
    return a.onMatch(a, function(o) {
      return a.add(null, o);
    });
  }), K1 = l, r0("matchMedia"));
}, py = /* @__PURE__ */ (function() {
  function f(u, a) {
    this.selector = a && x0(a), this.data = [], this._r = [], this.isReverted = !1, this.id = WT++, u && this.add(u);
  }
  var l = f.prototype;
  return l.add = function(a, o, c) {
    Ie(a) && (c = o, o = a, a = Ie);
    var h = this, d = function() {
      var p = Xe, v = h.selector, _;
      return p && p !== h && p.data.push(h), c && (h.selector = x0(c)), Xe = h, _ = o.apply(h, arguments), Ie(_) && h._r.push(_), Xe = p, h.selector = v, h.isReverted = !1, _;
    };
    return h.last = d, a === Ie ? d(h, function(g) {
      return h.add(null, g);
    }) : a ? h[a] = d : d;
  }, l.ignore = function(a) {
    var o = Xe;
    Xe = null, a(this), Xe = o;
  }, l.getTweens = function() {
    var a = [];
    return this.data.forEach(function(o) {
      return o instanceof f ? a.push.apply(a, o.getTweens()) : o instanceof hn && !(o.parent && o.parent.data === "nested") && a.push(o);
    }), a;
  }, l.clear = function() {
    this._r.length = this.data.length = 0;
  }, l.kill = function(a, o) {
    var c = this;
    if (a ? (function() {
      for (var d = c.getTweens(), g = c.data.length, p; g--; )
        p = c.data[g], p.data === "isFlip" && (p.revert(), p.getChildren(!0, !0, !1).forEach(function(v) {
          return d.splice(d.indexOf(v), 1);
        }));
      for (d.map(function(v) {
        return {
          g: v._dur || v._delay || v._sat && !v._sat.vars.immediateRender ? v.globalTime(0) : -1 / 0,
          t: v
        };
      }).sort(function(v, _) {
        return _.g - v.g || -1 / 0;
      }).forEach(function(v) {
        return v.t.revert(a);
      }), g = c.data.length; g--; )
        p = c.data[g], p instanceof ci ? p.data !== "nested" && (p.scrollTrigger && p.scrollTrigger.revert(), p.kill()) : !(p instanceof hn) && p.revert && p.revert(a);
      c._r.forEach(function(v) {
        return v(a, c);
      }), c.isReverted = !0;
    })() : this.data.forEach(function(d) {
      return d.kill && d.kill();
    }), this.clear(), o) {
      for (var h = Eu.length; h--; )
        Eu[h].id === this.id && Eu.splice(h, 1);
      this._mqs && this._mqs.forEach(function(d) {
        return d.removeListener ? d.removeListener(cs) : d.removeEventListener("change", cs);
      }), this._mqs = null;
    }
  }, l.revert = function(a) {
    this.kill(a || {});
  }, f;
})(), IT = /* @__PURE__ */ (function() {
  function f(u) {
    this.contexts = [], this.scope = u, Xe && Xe.data.push(this);
  }
  var l = f.prototype;
  return l.add = function(a, o, c) {
    Nl(a) || (a = {
      matches: a
    });
    var h = new py(0, c || this.scope), d = h.conditions = {}, g, p, v;
    Xe && !h.selector && (h.selector = Xe.selector), this.contexts.push(h), o = h.add("onMatch", o), h.queries = a;
    for (p in a)
      p === "all" ? v = 1 : (g = Al.matchMedia(a[p]), g && (Eu.indexOf(h) < 0 && Eu.push(h), (d[p] = g.matches) && (v = 1), g.addListener ? g.addListener(cs) : g.addEventListener("change", cs), (h._mqs || (h._mqs = [])).push(g)));
    return v && o(h, function(_) {
      return h.add(null, _);
    }), this;
  }, l.revert = function(a) {
    this.kill(a || {});
  }, l.kill = function(a) {
    this.contexts.forEach(function(o) {
      return o.kill(a, !0);
    });
  }, f;
})(), df = {
  registerPlugin: function() {
    for (var l = arguments.length, u = new Array(l), a = 0; a < l; a++)
      u[a] = arguments[a];
    u.forEach(function(o) {
      return ly(o);
    });
  },
  timeline: function(l) {
    return new ci(l);
  },
  getTweensOf: function(l, u) {
    return Ze.getTweensOf(l, u);
  },
  getProperty: function(l, u, a, o) {
    Mn(l) && (l = il(l)[0]);
    var c = Su(l || {}).get, h = a ? Z_ : Q_;
    return a === "native" && (a = ""), l && (u ? h((zi[u] && zi[u].get || c)(l, u, a, o)) : function(d, g, p) {
      return h((zi[d] && zi[d].get || c)(l, d, g, p));
    });
  },
  quickSetter: function(l, u, a) {
    if (l = il(l), l.length > 1) {
      var o = l.map(function(v) {
        return pi.quickSetter(v, u, a);
      }), c = o.length;
      return function(v) {
        for (var _ = c; _--; )
          o[_](v);
      };
    }
    l = l[0] || {};
    var h = zi[u], d = Su(l), g = d.harness && (d.harness.aliases || {})[u] || u, p = h ? function(v) {
      var _ = new h();
      Mr._pt = 0, _.init(l, a ? v + a : v, Mr, 0, [l]), _.render(1, _), Mr._pt && nm(1, Mr);
    } : d.set(l, g);
    return h ? p : function(v) {
      return p(l, g, a ? v + a : v, d, 1);
    };
  },
  quickTo: function(l, u, a) {
    var o, c = pi.to(l, Li((o = {}, o[u] = "+=0.1", o.paused = !0, o.stagger = 0, o), a || {})), h = function(g, p, v) {
      return c.resetTo(u, g, p, v);
    };
    return h.tween = c, h;
  },
  isTweening: function(l) {
    return Ze.getTweensOf(l, !0).length > 0;
  },
  defaults: function(l) {
    return l && l.ease && (l.ease = Tu(l.ease, ls.ease)), V1(ls, l || {});
  },
  config: function(l) {
    return V1(Bi, l || {});
  },
  registerEffect: function(l) {
    var u = l.name, a = l.effect, o = l.plugins, c = l.defaults, h = l.extendTimeline;
    (o || "").split(",").forEach(function(d) {
      return d && !zi[d] && !Hi[d] && as(u + " effect requires " + d + " plugin.");
    }), i0[u] = function(d, g, p) {
      return a(il(d), Li(g || {}, c), p);
    }, h && (ci.prototype[u] = function(d, g, p) {
      return this.add(i0[u](d, Nl(g) ? g : (p = g) && {}, this), p);
    });
  },
  registerEase: function(l, u) {
    ce[l] = Tu(u);
  },
  parseEase: function(l, u) {
    return arguments.length ? Tu(l, u) : ce;
  },
  getById: function(l) {
    return Ze.getById(l);
  },
  exportRoot: function(l, u) {
    l === void 0 && (l = {});
    var a = new ci(l), o, c;
    for (a.smoothChildTiming = hi(l.smoothChildTiming), Ze.remove(a), a._dp = 0, a._time = a._tTime = Ze._time, o = Ze._first; o; )
      c = o._next, (u || !(!o._dur && o instanceof hn && o.vars.onComplete === o._targets[0])) && Rl(a, o, o._start - o._delay), o = c;
    return Rl(Ze, a, 0), a;
  },
  context: function(l, u) {
    return l ? new py(l, u) : Xe;
  },
  matchMedia: function(l) {
    return new IT(l);
  },
  matchMediaRefresh: function() {
    return Eu.forEach(function(l) {
      var u = l.conditions, a, o;
      for (o in u)
        u[o] && (u[o] = !1, a = 1);
      a && l.revert();
    }) || cs();
  },
  addEventListener: function(l, u) {
    var a = Wc[l] || (Wc[l] = []);
    ~a.indexOf(u) || a.push(u);
  },
  removeEventListener: function(l, u) {
    var a = Wc[l], o = a && a.indexOf(u);
    o >= 0 && a.splice(o, 1);
  },
  utils: {
    wrap: zT,
    wrapYoyo: CT,
    distribute: W_,
    random: ty,
    snap: I_,
    normalize: RT,
    getUnit: Yn,
    clamp: MT,
    splitColor: ay,
    toArray: il,
    selector: x0,
    mapRange: ny,
    pipe: AT,
    unitize: OT,
    interpolate: DT,
    shuffle: $_
  },
  install: q_,
  effects: i0,
  ticker: Di,
  updateRoot: ci.updateRoot,
  plugins: zi,
  globalTimeline: Ze,
  core: {
    PropTween: mi,
    globals: X_,
    Tween: hn,
    Timeline: ci,
    Animation: ss,
    getCache: Su,
    _removeLinkedListItem: Tf,
    reverting: function() {
      return Un;
    },
    context: function(l) {
      return l && Xe && (Xe.data.push(l), l._ctx = Xe), Xe;
    },
    suppressOverwrites: function(l) {
      return j0 = l;
    }
  }
};
di("to,from,fromTo,delayedCall,set,killTweensOf", function(f) {
  return df[f] = hn[f];
});
Di.add(ci.updateRoot);
Mr = df.to({}, {
  duration: 0
});
var tE = function(l, u) {
  for (var a = l._pt; a && a.p !== u && a.op !== u && a.fp !== u; )
    a = a._next;
  return a;
}, eE = function(l, u) {
  var a = l._targets, o, c, h;
  for (o in u)
    for (c = a.length; c--; )
      h = l._ptLookup[c][o], h && (h = h.d) && (h._pt && (h = tE(h, o)), h && h.modifier && h.modifier(u[o], l, a[c], o));
}, o0 = function(l, u) {
  return {
    name: l,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(o, c, h) {
      h._onInit = function(d) {
        var g, p;
        if (Mn(c) && (g = {}, di(c, function(v) {
          return g[v] = 1;
        }), c = g), u) {
          g = {};
          for (p in c)
            g[p] = u(c[p]);
          c = g;
        }
        eE(d, c);
      };
    }
  };
}, pi = df.registerPlugin({
  name: "attr",
  init: function(l, u, a, o, c) {
    var h, d, g;
    this.tween = a;
    for (h in u)
      g = l.getAttribute(h) || "", d = this.add(l, "setAttribute", (g || 0) + "", u[h], o, c, 0, 0, h), d.op = h, d.b = g, this._props.push(h);
  },
  render: function(l, u) {
    for (var a = u._pt; a; )
      Un ? a.set(a.t, a.p, a.b, a) : a.r(l, a.d), a = a._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(l, u) {
    for (var a = u.length; a--; )
      this.add(l, a, l[a] || 0, u[a], 0, 0, 0, 0, 0, 1);
  }
}, o0("roundProps", M0), o0("modifiers"), o0("snap", I_)) || df;
hn.version = ci.version = pi.version = "3.15.1";
Y_ = 1;
Z0() && Lr();
ce.Power0;
ce.Power1;
ce.Power2;
ce.Power3;
ce.Power4;
ce.Linear;
ce.Quad;
ce.Cubic;
ce.Quart;
ce.Quint;
ce.Strong;
ce.Elastic;
ce.Back;
ce.SteppedEase;
ce.Bounce;
ce.Sine;
ce.Expo;
ce.Circ;
var F1, Ca, Or, im, vu, J1, lm, nE = function() {
  return typeof window < "u";
}, ta = {}, mu = 180 / Math.PI, Rr = Math.PI / 180, _r = Math.atan2, k1 = 1e8, am = /([A-Z])/g, iE = /(left|right|width|margin|padding|x)/i, lE = /[\s,\(]\S/, zl = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, A0 = function(l, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u, u);
}, aE = function(l, u) {
  return u.set(u.t, u.p, l === 1 ? u.e : Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u, u);
}, uE = function(l, u) {
  return u.set(u.t, u.p, l ? Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u : u.b, u);
}, rE = function(l, u) {
  return u.set(u.t, u.p, l === 1 ? u.e : l ? Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u : u.b, u);
}, oE = function(l, u) {
  var a = u.s + u.c * l;
  u.set(u.t, u.p, ~~(a + (a < 0 ? -0.5 : 0.5)) + u.u, u);
}, vy = function(l, u) {
  return u.set(u.t, u.p, l ? u.e : u.b, u);
}, _y = function(l, u) {
  return u.set(u.t, u.p, l !== 1 ? u.b : u.e, u);
}, sE = function(l, u, a) {
  return l.style[u] = a;
}, cE = function(l, u, a) {
  return l.style.setProperty(u, a);
}, fE = function(l, u, a) {
  return l._gsap[u] = a;
}, hE = function(l, u, a) {
  return l._gsap.scaleX = l._gsap.scaleY = a;
}, dE = function(l, u, a, o, c) {
  var h = l._gsap;
  h.scaleX = h.scaleY = a, h.renderTransform(c, h);
}, mE = function(l, u, a, o, c) {
  var h = l._gsap;
  h[u] = a, h.renderTransform(c, h);
}, Ke = "transform", gi = Ke + "Origin", gE = function f(l, u) {
  var a = this, o = this.target, c = o.style, h = o._gsap;
  if (l in ta && c) {
    if (this.tfm = this.tfm || {}, l !== "transform")
      l = zl[l] || l, ~l.indexOf(",") ? l.split(",").forEach(function(d) {
        return a.tfm[d] = kl(o, d);
      }) : this.tfm[l] = h.x ? h[l] : kl(o, l), l === gi && (this.tfm.zOrigin = h.zOrigin);
    else
      return zl.transform.split(",").forEach(function(d) {
        return f.call(a, d, u);
      });
    if (this.props.indexOf(Ke) >= 0)
      return;
    h.svg && (this.svgo = o.getAttribute("data-svg-origin"), this.props.push(gi, u, "")), l = Ke;
  }
  (c || u) && this.props.push(l, u, c[l]);
}, yy = function(l) {
  l.translate && (l.removeProperty("translate"), l.removeProperty("scale"), l.removeProperty("rotate"));
}, pE = function() {
  var l = this.props, u = this.target, a = u.style, o = u._gsap, c, h;
  for (c = 0; c < l.length; c += 3)
    l[c + 1] ? l[c + 1] === 2 ? u[l[c]](l[c + 2]) : u[l[c]] = l[c + 2] : l[c + 2] ? a[l[c]] = l[c + 2] : a.removeProperty(l[c].substr(0, 2) === "--" ? l[c] : l[c].replace(am, "-$1").toLowerCase());
  if (this.tfm) {
    for (h in this.tfm)
      o[h] = this.tfm[h];
    o.svg && (o.renderTransform(), u.setAttribute("data-svg-origin", this.svgo || "")), c = lm(), (!c || !c.isStart) && !a[Ke] && (yy(a), o.zOrigin && a[gi] && (a[gi] += " " + o.zOrigin + "px", o.zOrigin = 0, o.renderTransform()), o.uncache = 1);
  }
}, Sy = function(l, u) {
  var a = {
    target: l,
    props: [],
    revert: pE,
    save: gE
  };
  return l._gsap || pi.core.getCache(l), u && l.style && l.nodeType && u.split(",").forEach(function(o) {
    return a.save(o);
  }), a;
}, by, O0 = function(l, u) {
  var a = Ca.createElementNS ? Ca.createElementNS((u || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), l) : Ca.createElement(l);
  return a && a.style ? a : Ca.createElement(l);
}, Ui = function f(l, u, a) {
  var o = getComputedStyle(l);
  return o[u] || o.getPropertyValue(u.replace(am, "-$1").toLowerCase()) || o.getPropertyValue(u) || !a && f(l, Yr(u) || u, 1) || "";
}, P1 = "O,Moz,ms,Ms,Webkit".split(","), Yr = function(l, u, a) {
  var o = u || vu, c = o.style, h = 5;
  if (l in c && !a)
    return l;
  for (l = l.charAt(0).toUpperCase() + l.substr(1); h-- && !(P1[h] + l in c); )
    ;
  return h < 0 ? null : (h === 3 ? "ms" : h >= 0 ? P1[h] : "") + l;
}, R0 = function() {
  nE() && window.document && (F1 = window, Ca = F1.document, Or = Ca.documentElement, vu = O0("div") || {
    style: {}
  }, O0("div"), Ke = Yr(Ke), gi = Ke + "Origin", vu.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", by = !!Yr("perspective"), lm = pi.core.reverting, im = 1);
}, $1 = function(l) {
  var u = l.ownerSVGElement, a = O0("svg", u && u.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), o = l.cloneNode(!0), c;
  o.style.display = "block", a.appendChild(o), Or.appendChild(a);
  try {
    c = o.getBBox();
  } catch {
  }
  return a.removeChild(o), Or.removeChild(a), c;
}, W1 = function(l, u) {
  for (var a = u.length; a--; )
    if (l.hasAttribute(u[a]))
      return l.getAttribute(u[a]);
}, Ty = function(l) {
  var u, a;
  try {
    u = l.getBBox();
  } catch {
    u = $1(l), a = 1;
  }
  return u && (u.width || u.height) || a || (u = $1(l)), u && !u.width && !u.x && !u.y ? {
    x: +W1(l, ["x", "cx", "x1"]) || 0,
    y: +W1(l, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : u;
}, Ey = function(l) {
  return !!(l.getCTM && (!l.parentNode || l.ownerSVGElement) && Ty(l));
}, Xa = function(l, u) {
  if (u) {
    var a = l.style, o;
    u in ta && u !== gi && (u = Ke), a.removeProperty ? (o = u.substr(0, 2), (o === "ms" || u.substr(0, 6) === "webkit") && (u = "-" + u), a.removeProperty(o === "--" ? u : u.replace(am, "-$1").toLowerCase())) : a.removeAttribute(u);
  }
}, Da = function(l, u, a, o, c, h) {
  var d = new mi(l._pt, u, a, 0, 1, h ? _y : vy);
  return l._pt = d, d.b = o, d.e = c, l._props.push(a), d;
}, I1 = {
  deg: 1,
  rad: 1,
  turn: 1
}, vE = {
  grid: 1,
  flex: 1
}, Va = function f(l, u, a, o) {
  var c = parseFloat(a) || 0, h = (a + "").trim().substr((c + "").length) || "px", d = vu.style, g = iE.test(u), p = l.tagName.toLowerCase() === "svg", v = (p ? "client" : "offset") + (g ? "Width" : "Height"), _ = 100, S = o === "px", b = o === "%", M, T, R, V;
  if (o === h || !c || I1[o] || I1[h])
    return c;
  if (h !== "px" && !S && (c = f(l, u, a, "px")), V = l.getCTM && Ey(l), (b || h === "%") && (ta[u] || ~u.indexOf("adius")))
    return M = V ? l.getBBox()[g ? "width" : "height"] : l[v], an(b ? c / M * _ : c / 100 * M);
  if (d[g ? "width" : "height"] = _ + (S ? h : o), T = o !== "rem" && ~u.indexOf("adius") || o === "em" && l.appendChild && !p ? l : l.parentNode, V && (T = (l.ownerSVGElement || {}).parentNode), (!T || T === Ca || !T.appendChild) && (T = Ca.body), R = T._gsap, R && b && R.width && g && R.time === Di.time && !R.uncache)
    return an(c / R.width * _);
  if (b && (u === "height" || u === "width")) {
    var X = l.style[u];
    l.style[u] = _ + o, M = l[v], X ? l.style[u] = X : Xa(l, u);
  } else
    (b || h === "%") && !vE[Ui(T, "display")] && (d.position = Ui(l, "position")), T === l && (d.position = "static"), T.appendChild(vu), M = vu[v], T.removeChild(vu), d.position = "absolute";
  return g && b && (R = Su(T), R.time = Di.time, R.width = T[v]), an(S ? M * c / _ : M && c ? _ / M * c : 0);
}, kl = function(l, u, a, o) {
  var c;
  return im || R0(), u in zl && u !== "transform" && (u = zl[u], ~u.indexOf(",") && (u = u.split(",")[0])), ta[u] && u !== "transform" ? (c = hs(l, o), c = u !== "transformOrigin" ? c[u] : c.svg ? c.origin : gf(Ui(l, gi)) + " " + c.zOrigin + "px") : (c = l.style[u], (!c || c === "auto" || o || ~(c + "").indexOf("calc(")) && (c = mf[u] && mf[u](l, u, a) || Ui(l, u) || G_(l, u) || (u === "opacity" ? 1 : 0))), a && !~(c + "").trim().indexOf(" ") ? Va(l, u, c, a) + a : c;
}, _E = function(l, u, a, o) {
  if (!a || a === "none") {
    var c = Yr(u, l, 1), h = c && Ui(l, c, 1);
    h && h !== a ? (u = c, a = h) : u === "borderColor" && (a = Ui(l, "borderTopColor"));
  }
  var d = new mi(this._pt, l.style, u, 0, 1, my), g = 0, p = 0, v, _, S, b, M, T, R, V, X, K, Y, Q;
  if (d.b = a, d.e = o, a += "", o += "", o.substring(0, 6) === "var(--" && (o = Ui(l, o.substring(4, o.indexOf(")")))), o === "auto" && (T = l.style[u], l.style[u] = o, o = Ui(l, u) || o, T ? l.style[u] = T : Xa(l, u)), v = [a, o], ry(v), a = v[0], o = v[1], S = a.match(xr) || [], Q = o.match(xr) || [], Q.length) {
    for (; _ = xr.exec(o); )
      R = _[0], X = o.substring(g, _.index), M ? M = (M + 1) % 5 : (X.substr(-5) === "rgba(" || X.substr(-5) === "hsla(") && (M = 1), R !== (T = S[p++] || "") && (b = parseFloat(T) || 0, Y = T.substr((b + "").length), R.charAt(1) === "=" && (R = Ar(b, R) + Y), V = parseFloat(R), K = R.substr((V + "").length), g = xr.lastIndex - K.length, K || (K = K || Bi.units[u] || Y, g === o.length && (o += K, d.e += K)), Y !== K && (b = Va(l, u, T, K) || 0), d._pt = {
        _next: d._pt,
        p: X || p === 1 ? X : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: b,
        c: V - b,
        m: M && M < 4 || u === "zIndex" ? Math.round : 0
      });
    d.c = g < o.length ? o.substring(g, o.length) : "";
  } else
    d.r = u === "display" && o === "none" ? _y : vy;
  return L_.test(o) && (d.e = 0), this._pt = d, d;
}, t_ = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, yE = function(l) {
  var u = l.split(" "), a = u[0], o = u[1] || "50%";
  return (a === "top" || a === "bottom" || o === "left" || o === "right") && (l = a, a = o, o = l), u[0] = t_[a] || a, u[1] = t_[o] || o, u.join(" ");
}, SE = function(l, u) {
  if (u.tween && u.tween._time === u.tween._dur) {
    var a = u.t, o = a.style, c = u.u, h = a._gsap, d, g, p;
    if (c === "all" || c === !0)
      o.cssText = "", g = 1;
    else
      for (c = c.split(","), p = c.length; --p > -1; )
        d = c[p], ta[d] && (g = 1, d = d === "transformOrigin" ? gi : Ke), Xa(a, d);
    g && (Xa(a, Ke), h && (h.svg && a.removeAttribute("transform"), o.scale = o.rotate = o.translate = "none", hs(a, 1), h.uncache = 1, yy(o)));
  }
}, mf = {
  clearProps: function(l, u, a, o, c) {
    if (c.data !== "isFromStart") {
      var h = l._pt = new mi(l._pt, u, a, 0, 0, SE);
      return h.u = o, h.pr = -10, h.tween = c, l._props.push(a), 1;
    }
  }
  /* className feature (about 0.4kb gzipped).
  , className(plugin, target, property, endValue, tween) {
  	let _renderClassName = (ratio, data) => {
  			data.css.render(ratio, data.css);
  			if (!ratio || ratio === 1) {
  				let inline = data.rmv,
  					target = data.t,
  					p;
  				target.setAttribute("class", ratio ? data.e : data.b);
  				for (p in inline) {
  					_removeProperty(target, p);
  				}
  			}
  		},
  		_getAllStyles = (target) => {
  			let styles = {},
  				computed = getComputedStyle(target),
  				p;
  			for (p in computed) {
  				if (isNaN(p) && p !== "cssText" && p !== "length") {
  					styles[p] = computed[p];
  				}
  			}
  			_setDefaults(styles, _parseTransform(target, 1));
  			return styles;
  		},
  		startClassList = target.getAttribute("class"),
  		style = target.style,
  		cssText = style.cssText,
  		cache = target._gsap,
  		classPT = cache.classPT,
  		inlineToRemoveAtEnd = {},
  		data = {t:target, plugin:plugin, rmv:inlineToRemoveAtEnd, b:startClassList, e:(endValue.charAt(1) !== "=") ? endValue : startClassList.replace(new RegExp("(?:\\s|^)" + endValue.substr(2) + "(?![\\w-])"), "") + ((endValue.charAt(0) === "+") ? " " + endValue.substr(2) : "")},
  		changingVars = {},
  		startVars = _getAllStyles(target),
  		transformRelated = /(transform|perspective)/i,
  		endVars, p;
  	if (classPT) {
  		classPT.r(1, classPT.d);
  		_removeLinkedListItem(classPT.d.plugin, classPT, "_pt");
  	}
  	target.setAttribute("class", data.e);
  	endVars = _getAllStyles(target, true);
  	target.setAttribute("class", startClassList);
  	for (p in endVars) {
  		if (endVars[p] !== startVars[p] && !transformRelated.test(p)) {
  			changingVars[p] = endVars[p];
  			if (!style[p] && style[p] !== "0") {
  				inlineToRemoveAtEnd[p] = 1;
  			}
  		}
  	}
  	cache.classPT = plugin._pt = new PropTween(plugin._pt, target, "className", 0, 0, _renderClassName, data, 0, -11);
  	if (style.cssText !== cssText) { //only apply if things change. Otherwise, in cases like a background-image that's pulled dynamically, it could cause a refresh. See https://gsap.com/forums/topic/20368-possible-gsap-bug-switching-classnames-in-chrome/.
  		style.cssText = cssText; //we recorded cssText before we swapped classes and ran _getAllStyles() because in cases when a className tween is overwritten, we remove all the related tweening properties from that class change (otherwise class-specific stuff can't override properties we've directly set on the target's style object due to specificity).
  	}
  	_parseTransform(target, true); //to clear the caching of transforms
  	data.css = new gsap.plugins.css();
  	data.css.init(target, changingVars, tween);
  	plugin._props.push(...data.css._props);
  	return 1;
  }
  */
}, fs = [1, 0, 0, 1, 0, 0], xy = {}, My = function(l) {
  return l === "matrix(1, 0, 0, 1, 0, 0)" || l === "none" || !l;
}, e_ = function(l) {
  var u = Ui(l, Ke);
  return My(u) ? fs : u.substr(7).match(H_).map(an);
}, um = function(l, u) {
  var a = l._gsap || Su(l), o = l.style, c = e_(l), h, d, g, p;
  return a.svg && l.getAttribute("transform") ? (g = l.transform.baseVal.consolidate().matrix, c = [g.a, g.b, g.c, g.d, g.e, g.f], c.join(",") === "1,0,0,1,0,0" ? fs : c) : (c === fs && !l.offsetParent && l !== Or && !a.svg && (g = o.display, o.display = "block", h = l.parentNode, (!h || !l.offsetParent && !l.getBoundingClientRect().width) && (p = 1, d = l.nextElementSibling, Or.appendChild(l)), c = e_(l), g ? o.display = g : Xa(l, "display"), p && (d ? h.insertBefore(l, d) : h ? h.appendChild(l) : Or.removeChild(l))), u && c.length > 6 ? [c[0], c[1], c[4], c[5], c[12], c[13]] : c);
}, z0 = function(l, u, a, o, c, h) {
  var d = l._gsap, g = c || um(l, !0), p = d.xOrigin || 0, v = d.yOrigin || 0, _ = d.xOffset || 0, S = d.yOffset || 0, b = g[0], M = g[1], T = g[2], R = g[3], V = g[4], X = g[5], K = u.split(" "), Y = parseFloat(K[0]) || 0, Q = parseFloat(K[1]) || 0, k, D, Z, $;
  a ? g !== fs && (D = b * R - M * T) && (Z = Y * (R / D) + Q * (-T / D) + (T * X - R * V) / D, $ = Y * (-M / D) + Q * (b / D) - (b * X - M * V) / D, Y = Z, Q = $) : (k = Ty(l), Y = k.x + (~K[0].indexOf("%") ? Y / 100 * k.width : Y), Q = k.y + (~(K[1] || K[0]).indexOf("%") ? Q / 100 * k.height : Q)), o || o !== !1 && d.smooth ? (V = Y - p, X = Q - v, d.xOffset = _ + (V * b + X * T) - V, d.yOffset = S + (V * M + X * R) - X) : d.xOffset = d.yOffset = 0, d.xOrigin = Y, d.yOrigin = Q, d.smooth = !!o, d.origin = u, d.originIsAbsolute = !!a, l.style[gi] = "0px 0px", h && (Da(h, d, "xOrigin", p, Y), Da(h, d, "yOrigin", v, Q), Da(h, d, "xOffset", _, d.xOffset), Da(h, d, "yOffset", S, d.yOffset)), l.setAttribute("data-svg-origin", Y + " " + Q);
}, hs = function(l, u) {
  var a = l._gsap || new sy(l);
  if ("x" in a && !u && !a.uncache)
    return a;
  var o = l.style, c = a.scaleX < 0, h = "px", d = "deg", g = getComputedStyle(l), p = Ui(l, gi) || "0", v, _, S, b, M, T, R, V, X, K, Y, Q, k, D, Z, $, G, ut, lt, St, Mt, et, F, P, I, st, A, Et, z, Nt, E, w;
  return v = _ = S = T = R = V = X = K = Y = 0, b = M = 1, a.svg = !!(l.getCTM && Ey(l)), g.translate && ((g.translate !== "none" || g.scale !== "none" || g.rotate !== "none") && (o[Ke] = (g.translate !== "none" ? "translate3d(" + (g.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (g.rotate !== "none" ? "rotate(" + g.rotate + ") " : "") + (g.scale !== "none" ? "scale(" + g.scale.split(" ").join(",") + ") " : "") + (g[Ke] !== "none" ? g[Ke] : "")), o.scale = o.rotate = o.translate = "none"), D = um(l, a.svg), a.svg && (a.uncache ? (I = l.getBBox(), p = a.xOrigin - I.x + "px " + (a.yOrigin - I.y) + "px", P = "") : P = !u && l.getAttribute("data-svg-origin"), z0(l, P || p, !!P || a.originIsAbsolute, a.smooth !== !1, D)), Q = a.xOrigin || 0, k = a.yOrigin || 0, D !== fs && (ut = D[0], lt = D[1], St = D[2], Mt = D[3], v = et = D[4], _ = F = D[5], D.length === 6 ? (b = Math.sqrt(ut * ut + lt * lt), M = Math.sqrt(Mt * Mt + St * St), T = ut || lt ? _r(lt, ut) * mu : 0, X = St || Mt ? _r(St, Mt) * mu + T : 0, X && (M *= Math.abs(Math.cos(X * Rr))), a.svg && (v -= Q - (Q * ut + k * St), _ -= k - (Q * lt + k * Mt))) : (w = D[6], Nt = D[7], A = D[8], Et = D[9], z = D[10], E = D[11], v = D[12], _ = D[13], S = D[14], Z = _r(w, z), R = Z * mu, Z && ($ = Math.cos(-Z), G = Math.sin(-Z), P = et * $ + A * G, I = F * $ + Et * G, st = w * $ + z * G, A = et * -G + A * $, Et = F * -G + Et * $, z = w * -G + z * $, E = Nt * -G + E * $, et = P, F = I, w = st), Z = _r(-St, z), V = Z * mu, Z && ($ = Math.cos(-Z), G = Math.sin(-Z), P = ut * $ - A * G, I = lt * $ - Et * G, st = St * $ - z * G, E = Mt * G + E * $, ut = P, lt = I, St = st), Z = _r(lt, ut), T = Z * mu, Z && ($ = Math.cos(Z), G = Math.sin(Z), P = ut * $ + lt * G, I = et * $ + F * G, lt = lt * $ - ut * G, F = F * $ - et * G, ut = P, et = I), R && Math.abs(R) + Math.abs(T) > 359.9 && (R = T = 0, V = 180 - V), b = an(Math.sqrt(ut * ut + lt * lt + St * St)), M = an(Math.sqrt(F * F + w * w)), Z = _r(et, F), X = Math.abs(Z) > 2e-4 ? Z * mu : 0, Y = E ? 1 / (E < 0 ? -E : E) : 0), a.svg && (P = l.getAttribute("transform"), a.forceCSS = l.setAttribute("transform", "") || !My(Ui(l, Ke)), P && l.setAttribute("transform", P))), Math.abs(X) > 90 && Math.abs(X) < 270 && (c ? (b *= -1, X += T <= 0 ? 180 : -180, T += T <= 0 ? 180 : -180) : (M *= -1, X += X <= 0 ? 180 : -180)), u = u || a.uncache, a.x = v - ((a.xPercent = v && (!u && a.xPercent || (Math.round(l.offsetWidth / 2) === Math.round(-v) ? -50 : 0))) ? l.offsetWidth * a.xPercent / 100 : 0) + h, a.y = _ - ((a.yPercent = _ && (!u && a.yPercent || (Math.round(l.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? l.offsetHeight * a.yPercent / 100 : 0) + h, a.z = S + h, a.scaleX = an(b), a.scaleY = an(M), a.rotation = an(T) + d, a.rotationX = an(R) + d, a.rotationY = an(V) + d, a.skewX = X + d, a.skewY = K + d, a.transformPerspective = Y + h, (a.zOrigin = parseFloat(p.split(" ")[2]) || !u && a.zOrigin || 0) && (o[gi] = gf(p)), a.xOffset = a.yOffset = 0, a.force3D = Bi.force3D, a.renderTransform = a.svg ? TE : by ? wy : bE, a.uncache = 0, a;
}, gf = function(l) {
  return (l = l.split(" "))[0] + " " + l[1];
}, s0 = function(l, u, a) {
  var o = Yn(u);
  return an(parseFloat(u) + parseFloat(Va(l, "x", a + "px", o))) + o;
}, bE = function(l, u) {
  u.z = "0px", u.rotationY = u.rotationX = "0deg", u.force3D = 0, wy(l, u);
}, hu = "0deg", Do = "0px", du = ") ", wy = function(l, u) {
  var a = u || this, o = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.z, p = a.rotation, v = a.rotationY, _ = a.rotationX, S = a.skewX, b = a.skewY, M = a.scaleX, T = a.scaleY, R = a.transformPerspective, V = a.force3D, X = a.target, K = a.zOrigin, Y = "", Q = V === "auto" && l && l !== 1 || V === !0;
  if (K && (_ !== hu || v !== hu)) {
    var k = parseFloat(v) * Rr, D = Math.sin(k), Z = Math.cos(k), $;
    k = parseFloat(_) * Rr, $ = Math.cos(k), h = s0(X, h, D * $ * -K), d = s0(X, d, -Math.sin(k) * -K), g = s0(X, g, Z * $ * -K + K);
  }
  R !== Do && (Y += "perspective(" + R + du), (o || c) && (Y += "translate(" + o + "%, " + c + "%) "), (Q || h !== Do || d !== Do || g !== Do) && (Y += g !== Do || Q ? "translate3d(" + h + ", " + d + ", " + g + ") " : "translate(" + h + ", " + d + du), p !== hu && (Y += "rotate(" + p + du), v !== hu && (Y += "rotateY(" + v + du), _ !== hu && (Y += "rotateX(" + _ + du), (S !== hu || b !== hu) && (Y += "skew(" + S + ", " + b + du), (M !== 1 || T !== 1) && (Y += "scale(" + M + ", " + T + du), X.style[Ke] = Y || "translate(0, 0)";
}, TE = function(l, u) {
  var a = u || this, o = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.rotation, p = a.skewX, v = a.skewY, _ = a.scaleX, S = a.scaleY, b = a.target, M = a.xOrigin, T = a.yOrigin, R = a.xOffset, V = a.yOffset, X = a.forceCSS, K = parseFloat(h), Y = parseFloat(d), Q, k, D, Z, $;
  g = parseFloat(g), p = parseFloat(p), v = parseFloat(v), v && (v = parseFloat(v), p += v, g += v), g || p ? (g *= Rr, p *= Rr, Q = Math.cos(g) * _, k = Math.sin(g) * _, D = Math.sin(g - p) * -S, Z = Math.cos(g - p) * S, p && (v *= Rr, $ = Math.tan(p - v), $ = Math.sqrt(1 + $ * $), D *= $, Z *= $, v && ($ = Math.tan(v), $ = Math.sqrt(1 + $ * $), Q *= $, k *= $)), Q = an(Q), k = an(k), D = an(D), Z = an(Z)) : (Q = _, Z = S, k = D = 0), (K && !~(h + "").indexOf("px") || Y && !~(d + "").indexOf("px")) && (K = Va(b, "x", h, "px"), Y = Va(b, "y", d, "px")), (M || T || R || V) && (K = an(K + M - (M * Q + T * D) + R), Y = an(Y + T - (M * k + T * Z) + V)), (o || c) && ($ = b.getBBox(), K = an(K + o / 100 * $.width), Y = an(Y + c / 100 * $.height)), $ = "matrix(" + Q + "," + k + "," + D + "," + Z + "," + K + "," + Y + ")", b.setAttribute("transform", $), X && (b.style[Ke] = $);
}, EE = function(l, u, a, o, c) {
  var h = 360, d = Mn(c), g = parseFloat(c) * (d && ~c.indexOf("rad") ? mu : 1), p = g - o, v = o + p + "deg", _, S;
  return d && (_ = c.split("_")[1], _ === "short" && (p %= h, p !== p % (h / 2) && (p += p < 0 ? h : -h)), _ === "cw" && p < 0 ? p = (p + h * k1) % h - ~~(p / h) * h : _ === "ccw" && p > 0 && (p = (p - h * k1) % h - ~~(p / h) * h)), l._pt = S = new mi(l._pt, u, a, o, p, aE), S.e = v, S.u = "deg", l._props.push(a), S;
}, n_ = function(l, u) {
  for (var a in u)
    l[a] = u[a];
  return l;
}, xE = function(l, u, a) {
  var o = n_({}, a._gsap), c = "perspective,force3D,transformOrigin,svgOrigin", h = a.style, d, g, p, v, _, S, b, M;
  o.svg ? (p = a.getAttribute("transform"), a.setAttribute("transform", ""), h[Ke] = u, d = hs(a, 1), Xa(a, Ke), a.setAttribute("transform", p)) : (p = getComputedStyle(a)[Ke], h[Ke] = u, d = hs(a, 1), h[Ke] = p);
  for (g in ta)
    p = o[g], v = d[g], p !== v && c.indexOf(g) < 0 && (b = Yn(p), M = Yn(v), _ = b !== M ? Va(a, g, p, M) : parseFloat(p), S = parseFloat(v), l._pt = new mi(l._pt, d, g, _, S - _, A0), l._pt.u = M || 0, l._props.push(g));
  n_(d, o);
};
di("padding,margin,Width,Radius", function(f, l) {
  var u = "Top", a = "Right", o = "Bottom", c = "Left", h = (l < 3 ? [u, a, o, c] : [u + c, u + a, o + a, o + c]).map(function(d) {
    return l < 2 ? f + d : "border" + d + f;
  });
  mf[l > 1 ? "border" + f : f] = function(d, g, p, v, _) {
    var S, b;
    if (arguments.length < 4)
      return S = h.map(function(M) {
        return kl(d, M, p);
      }), b = S.join(" "), b.split(S[0]).length === 5 ? S[0] : b;
    S = (v + "").split(" "), b = {}, h.forEach(function(M, T) {
      return b[M] = S[T] = S[T] || S[(T - 1) / 2 | 0];
    }), d.init(g, b, _);
  };
});
var Ay = {
  name: "css",
  register: R0,
  targetTest: function(l) {
    return l.style && l.nodeType;
  },
  init: function(l, u, a, o, c) {
    var h = this._props, d = l.style, g = a.vars.startAt, p, v, _, S, b, M, T, R, V, X, K, Y, Q, k, D, Z, $;
    im || R0(), this.styles = this.styles || Sy(l), Z = this.styles.props, this.tween = a;
    for (T in u)
      if (T !== "autoRound" && (v = u[T], !(zi[T] && cy(T, u, a, o, l, c)))) {
        if (b = typeof v, M = mf[T], b === "function" && (v = v.call(a, o, l, c), b = typeof v), b === "string" && ~v.indexOf("random(") && (v = rs(v)), M)
          M(this, l, T, v, a) && (D = 1);
        else if (T.substr(0, 2) === "--")
          p = (getComputedStyle(l).getPropertyValue(T) + "").trim(), v += "", Ha.lastIndex = 0, Ha.test(p) || (R = Yn(p), V = Yn(v), V ? R !== V && (p = Va(l, T, p, V) + V) : R && (v += R)), this.add(d, "setProperty", p, v, o, c, 0, 0, T), h.push(T), Z.push(T, 0, d[T]);
        else if (b !== "undefined") {
          if (g && T in g ? (p = typeof g[T] == "function" ? g[T].call(a, o, l, c) : g[T], Mn(p) && ~p.indexOf("random(") && (p = rs(p)), Yn(p + "") || p === "auto" || (p += Bi.units[T] || Yn(kl(l, T)) || ""), (p + "").charAt(1) === "=" && (p = kl(l, T))) : p = kl(l, T), S = parseFloat(p), X = b === "string" && v.charAt(1) === "=" && v.substr(0, 2), X && (v = v.substr(2)), _ = parseFloat(v), T in zl && (T === "autoAlpha" && (S === 1 && kl(l, "visibility") === "hidden" && _ && (S = 0), Z.push("visibility", 0, d.visibility), Da(this, d, "visibility", S ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), T !== "scale" && T !== "transform" && (T = zl[T], ~T.indexOf(",") && (T = T.split(",")[0]))), K = T in ta, K) {
            if (this.styles.save(T), $ = v, b === "string" && v.substring(0, 6) === "var(--") {
              if (v = Ui(l, v.substring(4, v.indexOf(")"))), v.substring(0, 5) === "calc(") {
                var G = l.style.perspective;
                l.style.perspective = v, v = Ui(l, "perspective"), G ? l.style.perspective = G : Xa(l, "perspective");
              }
              _ = parseFloat(v);
            }
            if (Y || (Q = l._gsap, Q.renderTransform && !u.parseTransform || hs(l, u.parseTransform), k = u.smoothOrigin !== !1 && Q.smooth, Y = this._pt = new mi(this._pt, d, Ke, 0, 1, Q.renderTransform, Q, 0, -1), Y.dep = 1), T === "scale")
              this._pt = new mi(this._pt, Q, "scaleY", Q.scaleY, (X ? Ar(Q.scaleY, X + _) : _) - Q.scaleY || 0, A0), this._pt.u = 0, h.push("scaleY", T), T += "X";
            else if (T === "transformOrigin") {
              Z.push(gi, 0, d[gi]), v = yE(v), Q.svg ? z0(l, v, 0, k, 0, this) : (V = parseFloat(v.split(" ")[2]) || 0, V !== Q.zOrigin && Da(this, Q, "zOrigin", Q.zOrigin, V), Da(this, d, T, gf(p), gf(v)));
              continue;
            } else if (T === "svgOrigin") {
              z0(l, v, 1, k, 0, this);
              continue;
            } else if (T in xy) {
              EE(this, Q, T, S, X ? Ar(S, X + v) : v);
              continue;
            } else if (T === "smoothOrigin") {
              Da(this, Q, "smooth", Q.smooth, v);
              continue;
            } else if (T === "force3D") {
              Q[T] = v;
              continue;
            } else if (T === "transform") {
              xE(this, v, l);
              continue;
            }
          } else T in d || (T = Yr(T) || T);
          if (K || (_ || _ === 0) && (S || S === 0) && !lE.test(v) && T in d)
            R = (p + "").substr((S + "").length), _ || (_ = 0), V = Yn(v) || (T in Bi.units ? Bi.units[T] : R), R !== V && (S = Va(l, T, p, V)), this._pt = new mi(this._pt, K ? Q : d, T, S, (X ? Ar(S, X + _) : _) - S, !K && (V === "px" || T === "zIndex") && u.autoRound !== !1 ? oE : A0), this._pt.u = V || 0, K && $ !== v ? (this._pt.b = p, this._pt.e = $, this._pt.r = rE) : R !== V && V !== "%" && (this._pt.b = p, this._pt.r = uE);
          else if (T in d)
            _E.call(this, l, T, p, X ? X + v : v);
          else if (T in l)
            this.add(l, T, p || l[T], X ? X + v : v, o, c);
          else if (T !== "parseTransform") {
            F0(T, v);
            continue;
          }
          K || (T in d ? Z.push(T, 0, d[T]) : typeof l[T] == "function" ? Z.push(T, 2, l[T]()) : Z.push(T, 1, p || l[T])), h.push(T);
        }
      }
    D && gy(this);
  },
  render: function(l, u) {
    if (u.tween._time || !lm())
      for (var a = u._pt; a; )
        a.r(l, a.d), a = a._next;
    else
      u.styles.revert();
  },
  get: kl,
  aliases: zl,
  getSetter: function(l, u, a) {
    var o = zl[u];
    return o && o.indexOf(",") < 0 && (u = o), u in ta && u !== gi && (l._gsap.x || kl(l, "x")) ? a && J1 === a ? u === "scale" ? hE : fE : (J1 = a || {}) && (u === "scale" ? dE : mE) : l.style && !Q0(l.style[u]) ? sE : ~u.indexOf("-") ? cE : em(l, u);
  },
  core: {
    _removeProperty: Xa,
    _getMatrix: um
  }
};
pi.utils.checkPrefix = Yr;
pi.core.getStyleSaver = Sy;
(function(f, l, u, a) {
  var o = di(f + "," + l + "," + u, function(c) {
    ta[c] = 1;
  });
  di(l, function(c) {
    Bi.units[c] = "deg", xy[c] = 1;
  }), zl[o[13]] = f + "," + l, di(a, function(c) {
    var h = c.split(":");
    zl[h[1]] = o[h[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
di("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(f) {
  Bi.units[f] = "px";
});
pi.registerPlugin(Ay);
var De = pi.registerPlugin(Ay) || pi;
De.core.Tween;
function ME(f, l) {
  for (var u = 0; u < l.length; u++) {
    var a = l[u];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(f, a.key, a);
  }
}
function wE(f, l, u) {
  return l && ME(f.prototype, l), f;
}
var Nn, Ic, fi, Na, Ua, zr, Oy, gu, Cr, Ry, $l, hl, zy, Cy = function() {
  return Nn || typeof window < "u" && (Nn = window.gsap) && Nn.registerPlugin && Nn;
}, Dy = 1, wr = [], te = [], Dl = [], ko = Date.now, C0 = function(l, u) {
  return u;
}, AE = function() {
  var l = Cr.core, u = l.bridge || {}, a = l._scrollers, o = l._proxies;
  a.push.apply(a, te), o.push.apply(o, Dl), te = a, Dl = o, C0 = function(h, d) {
    return u[h](d);
  };
}, La = function(l, u) {
  return ~Dl.indexOf(l) && Dl[Dl.indexOf(l) + 1][u];
}, Po = function(l) {
  return !!~Ry.indexOf(l);
}, Pn = function(l, u, a, o, c) {
  return l.addEventListener(u, a, {
    passive: o !== !1,
    capture: !!c
  });
}, kn = function(l, u, a, o) {
  return l.removeEventListener(u, a, !!o);
}, Lc = "scrollLeft", Yc = "scrollTop", D0 = function() {
  return $l && $l.isPressed || te.cache++;
}, pf = function(l, u) {
  var a = function o(c) {
    if (c || c === 0) {
      Dy && fi.history.scrollRestoration !== "manual" && (fi.history.scrollRestoration = "manual");
      var h = $l && $l.isPressed;
      c = o.v = Math.round(c) || ($l && $l.iOS ? 1 : 0), l(c), o.cacheID = te.cache, h && C0("ss", c);
    } else (u || te.cache !== o.cacheID || C0("ref")) && (o.cacheID = te.cache, o.v = l());
    return o.v + o.offset;
  };
  return a.offset = 0, l && a;
}, ti = {
  s: Lc,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: pf(function(f) {
    return arguments.length ? fi.scrollTo(f, vn.sc()) : fi.pageXOffset || Na[Lc] || Ua[Lc] || zr[Lc] || 0;
  })
}, vn = {
  s: Yc,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ti,
  sc: pf(function(f) {
    return arguments.length ? fi.scrollTo(ti.sc(), f) : fi.pageYOffset || Na[Yc] || Ua[Yc] || zr[Yc] || 0;
  })
}, si = function(l, u) {
  return (u && u._ctx && u._ctx.selector || Nn.utils.toArray)(l)[0] || (typeof l == "string" && Nn.config().nullTargetWarn !== !1 ? console.warn("Element not found:", l) : null);
}, OE = function(l, u) {
  for (var a = u.length; a--; )
    if (u[a] === l || u[a].contains(l))
      return !0;
  return !1;
}, Ga = function(l, u) {
  var a = u.s, o = u.sc;
  Po(l) && (l = Na.scrollingElement || Ua);
  var c = te.indexOf(l), h = o === vn.sc ? 1 : 2;
  !~c && (c = te.push(l) - 1), te[c + h] || Pn(l, "scroll", D0);
  var d = te[c + h], g = d || (te[c + h] = pf(La(l, a), !0) || (Po(l) ? o : pf(function(p) {
    return arguments.length ? l[a] = p : l[a];
  })));
  return g.target = l, d || (g.smooth = Nn.getProperty(l, "scrollBehavior") === "smooth"), g;
}, N0 = function(l, u, a) {
  var o = l, c = l, h = ko(), d = h, g = u || 50, p = Math.max(500, g * 3), v = function(M, T) {
    var R = ko();
    T || R - h > g ? (c = o, o = M, d = h, h = R) : a ? o += M : o = c + (M - c) / (R - d) * (h - d);
  }, _ = function() {
    c = o = a ? 0 : o, d = h = 0;
  }, S = function(M) {
    var T = d, R = c, V = ko();
    return (M || M === 0) && M !== o && v(M), h === d || V - d > p ? 0 : (o + (a ? R : -R)) / ((a ? V : h) - T) * 1e3;
  };
  return {
    update: v,
    reset: _,
    getVelocity: S
  };
}, No = function(l, u) {
  return u && !l._gsapAllow && l.cancelable !== !1 && l.preventDefault(), l.changedTouches ? l.changedTouches[0] : l;
}, i_ = function(l) {
  var u = Math.max.apply(Math, l), a = Math.min.apply(Math, l);
  return Math.abs(u) >= Math.abs(a) ? u : a;
}, Ny = function() {
  Cr = Nn.core.globals().ScrollTrigger, Cr && Cr.core && AE();
}, Uy = function(l) {
  return Nn = l || Cy(), !Ic && Nn && typeof document < "u" && document.body && (fi = window, Na = document, Ua = Na.documentElement, zr = Na.body, Ry = [fi, Na, Ua, zr], Nn.utils.clamp, zy = Nn.core.context || function() {
  }, gu = "onpointerenter" in zr ? "pointer" : "mouse", Oy = un.isTouch = fi.matchMedia && fi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in fi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, hl = un.eventTypes = ("ontouchstart" in Ua ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ua ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Dy = 0;
  }, 500), Ic = 1), Cr || Ny(), Ic;
};
ti.op = vn;
te.cache = 0;
var un = /* @__PURE__ */ (function() {
  function f(u) {
    this.init(u);
  }
  var l = f.prototype;
  return l.init = function(a) {
    Ic || Uy(Nn) || console.warn("Please gsap.registerPlugin(Observer)"), Cr || Ny();
    var o = a.tolerance, c = a.dragMinimum, h = a.type, d = a.target, g = a.lineHeight, p = a.debounce, v = a.preventDefault, _ = a.onStop, S = a.onStopDelay, b = a.ignore, M = a.wheelSpeed, T = a.event, R = a.onDragStart, V = a.onDragEnd, X = a.onDrag, K = a.onPress, Y = a.onRelease, Q = a.onRight, k = a.onLeft, D = a.onUp, Z = a.onDown, $ = a.onChangeX, G = a.onChangeY, ut = a.onChange, lt = a.onToggleX, St = a.onToggleY, Mt = a.onHover, et = a.onHoverEnd, F = a.onMove, P = a.ignoreCheck, I = a.isNormalizer, st = a.onGestureStart, A = a.onGestureEnd, Et = a.onWheel, z = a.onEnable, Nt = a.onDisable, E = a.onClick, w = a.scrollSpeed, J = a.capture, L = a.allowClicks, mt = a.lockAxis, ht = a.onLockAxis;
    this.target = d = si(d) || Ua, this.vars = a, b && (b = Nn.utils.toArray(b)), o = o || 1e-9, c = c || 0, M = M || 1, w = w || 1, h = h || "wheel,touch,pointer", p = p !== !1, g || (g = parseFloat(fi.getComputedStyle(zr).lineHeight) || 22);
    var Rt, ot, gt, zt, vt, Ut, Yt, B = this, nt = 0, pt = 0, dt = a.passive || !v && a.passive !== !1, bt = Ga(d, ti), jt = Ga(d, vn), kt = bt(), Ht = jt(), Ct = ~h.indexOf("touch") && !~h.indexOf("pointer") && hl[0] === "pointerdown", ee = Po(d), ue = d.ownerDocument || Na, Fe = [0, 0, 0], Re = [0, 0, 0], _n = 0, Vn = function() {
      return _n = ko();
    }, xe = function(rt, Tt) {
      return (B.event = rt) && b && OE(rt.target, b) || Tt && Ct && rt.pointerType !== "touch" || P && P(rt, Tt);
    }, Yi = function() {
      B._vx.reset(), B._vy.reset(), ot.pause(), _ && _(B);
    }, He = function() {
      var rt = B.deltaX = i_(Fe), Tt = B.deltaY = i_(Re), it = Math.abs(rt) >= o, ft = Math.abs(Tt) >= o;
      ut && (it || ft) && ut(B, rt, Tt, Fe, Re), it && (Q && B.deltaX > 0 && Q(B), k && B.deltaX < 0 && k(B), $ && $(B), lt && B.deltaX < 0 != nt < 0 && lt(B), nt = B.deltaX, Fe[0] = Fe[1] = Fe[2] = 0), ft && (Z && B.deltaY > 0 && Z(B), D && B.deltaY < 0 && D(B), G && G(B), St && B.deltaY < 0 != pt < 0 && St(B), pt = B.deltaY, Re[0] = Re[1] = Re[2] = 0), (zt || gt) && (F && F(B), gt && (R && gt === 1 && R(B), X && X(B), gt = 0), zt = !1), Ut && !(Ut = !1) && ht && ht(B), vt && (Et(B), vt = !1), Rt = 0;
    }, Gn = function(rt, Tt, it) {
      Fe[it] += rt, Re[it] += Tt, B._vx.update(rt), B._vy.update(Tt), p ? Rt || (Rt = requestAnimationFrame(He)) : He();
    }, tn = function(rt, Tt) {
      mt && !Yt && (B.axis = Yt = Math.abs(rt) > Math.abs(Tt) ? "x" : "y", Ut = !0), Yt !== "y" && (Fe[2] += rt, B._vx.update(rt, !0)), Yt !== "x" && (Re[2] += Tt, B._vy.update(Tt, !0)), p ? Rt || (Rt = requestAnimationFrame(He)) : He();
    }, ei = function(rt) {
      if (!xe(rt, 1)) {
        rt = No(rt, v);
        var Tt = rt.clientX, it = rt.clientY, ft = Tt - B.x, yt = it - B.y, xt = B.isDragging;
        B.x = Tt, B.y = it, (xt || (ft || yt) && (Math.abs(B.startX - Tt) >= c || Math.abs(B.startY - it) >= c)) && (gt || (gt = xt ? 2 : 1), xt || (B.isDragging = !0), tn(ft, yt));
      }
    }, qi = B.onPress = function(at) {
      xe(at, 1) || at && at.button || (B.axis = Yt = null, ot.pause(), B.isPressed = !0, at = No(at), nt = pt = 0, B.startX = B.x = at.clientX, B.startY = B.y = at.clientY, B._vx.reset(), B._vy.reset(), Pn(I ? d : ue, hl[1], ei, dt, !0), B.deltaX = B.deltaY = 0, K && K(B));
    }, qt = B.onRelease = function(at) {
      if (!xe(at, 1)) {
        kn(I ? d : ue, hl[1], ei, !0);
        var rt = !isNaN(B.y - B.startY), Tt = B.isDragging, it = Tt && (Math.abs(B.x - B.startX) > 3 || Math.abs(B.y - B.startY) > 3), ft = No(at);
        !it && rt && (B._vx.reset(), B._vy.reset(), v && L && Nn.delayedCall(0.08, function() {
          if (ko() - _n > 300 && !at.defaultPrevented) {
            if (at.target.click)
              at.target.click();
            else if (ue.createEvent) {
              var yt = ue.createEvent("MouseEvents");
              yt.initMouseEvent("click", !0, !0, fi, 1, ft.screenX, ft.screenY, ft.clientX, ft.clientY, !1, !1, !1, !1, 0, null), at.target.dispatchEvent(yt);
            }
          }
        })), B.isDragging = B.isGesturing = B.isPressed = !1, _ && Tt && !I && ot.restart(!0), gt && He(), V && Tt && V(B), Y && Y(B, it);
      }
    }, Xi = function(rt) {
      return rt.touches && rt.touches.length > 1 && (B.isGesturing = !0) && st(rt, B.isDragging);
    }, dn = function() {
      return (B.isGesturing = !1) || A(B);
    }, wn = function(rt) {
      if (!xe(rt)) {
        var Tt = bt(), it = jt();
        Gn((Tt - kt) * w, (it - Ht) * w, 1), kt = Tt, Ht = it, _ && ot.restart(!0);
      }
    }, mn = function(rt) {
      if (!xe(rt)) {
        rt = No(rt, v), Et && (vt = !0);
        var Tt = (rt.deltaMode === 1 ? g : rt.deltaMode === 2 ? fi.innerHeight : 1) * M;
        Gn(rt.deltaX * Tt, rt.deltaY * Tt, 0), _ && !I && ot.restart(!0);
      }
    }, Vi = function(rt) {
      if (!xe(rt)) {
        var Tt = rt.clientX, it = rt.clientY, ft = Tt - B.x, yt = it - B.y;
        B.x = Tt, B.y = it, zt = !0, _ && ot.restart(!0), (ft || yt) && tn(ft, yt);
      }
    }, Gi = function(rt) {
      B.event = rt, Mt(B);
    }, ni = function(rt) {
      B.event = rt, et(B);
    }, ct = function(rt) {
      return xe(rt) || No(rt, v) && E(B);
    };
    ot = B._dc = Nn.delayedCall(S || 0.25, Yi).pause(), B.deltaX = B.deltaY = 0, B._vx = N0(0, 50, !0), B._vy = N0(0, 50, !0), B.scrollX = bt, B.scrollY = jt, B.isDragging = B.isGesturing = B.isPressed = !1, zy(this), B.enable = function(at) {
      return B.isEnabled || (Pn(ee ? ue : d, "scroll", D0), h.indexOf("scroll") >= 0 && Pn(ee ? ue : d, "scroll", wn, dt, J), h.indexOf("wheel") >= 0 && Pn(d, "wheel", mn, dt, J), (h.indexOf("touch") >= 0 && Oy || h.indexOf("pointer") >= 0) && (Pn(d, hl[0], qi, dt, J), Pn(ue, hl[2], qt), Pn(ue, hl[3], qt), L && Pn(d, "click", Vn, !0, !0), E && Pn(d, "click", ct), st && Pn(ue, "gesturestart", Xi), A && Pn(ue, "gestureend", dn), Mt && Pn(d, gu + "enter", Gi), et && Pn(d, gu + "leave", ni), F && Pn(d, gu + "move", Vi)), B.isEnabled = !0, B.isDragging = B.isGesturing = B.isPressed = zt = gt = !1, B._vx.reset(), B._vy.reset(), kt = bt(), Ht = jt(), at && at.type && qi(at), z && z(B)), B;
    }, B.disable = function() {
      B.isEnabled && (wr.filter(function(at) {
        return at !== B && Po(at.target);
      }).length || kn(ee ? ue : d, "scroll", D0), B.isPressed && (B._vx.reset(), B._vy.reset(), kn(I ? d : ue, hl[1], ei, !0)), kn(ee ? ue : d, "scroll", wn, J), kn(d, "wheel", mn, J), kn(d, hl[0], qi, J), kn(ue, hl[2], qt), kn(ue, hl[3], qt), kn(d, "click", Vn, !0), kn(d, "click", ct), kn(ue, "gesturestart", Xi), kn(ue, "gestureend", dn), kn(d, gu + "enter", Gi), kn(d, gu + "leave", ni), kn(d, gu + "move", Vi), B.isEnabled = B.isPressed = B.isDragging = !1, Nt && Nt(B));
    }, B.kill = B.revert = function() {
      B.disable();
      var at = wr.indexOf(B);
      at >= 0 && wr.splice(at, 1), $l === B && ($l = 0);
    }, wr.push(B), I && Po(d) && ($l = B), B.enable(T);
  }, wE(f, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), f;
})();
un.version = "3.15.1";
un.create = function(f) {
  return new un(f);
};
un.register = Uy;
un.getAll = function() {
  return wr.slice();
};
un.getById = function(f) {
  return wr.filter(function(l) {
    return l.vars.id === f;
  })[0];
};
Cy() && Nn.registerPlugin(un);
var Ot, Tr, It, be, Ci, ve, rm, vf, ds, $o, qo, qc, Hn, Mf, U0, Wn, l_, a_, Er, By, c0, Hy, $n, B0, Ly, Yy, Oa, H0, om, Dr, sm, Ya, L0, f0, Xc = 1, Ln = Date.now, h0 = Ln(), ll = 0, Xo = 0, u_ = function(l, u, a) {
  var o = Ri(l) && (l.substr(0, 6) === "clamp(" || l.indexOf("max") > -1);
  return a["_" + u + "Clamp"] = o, o ? l.substr(6, l.length - 7) : l;
}, r_ = function(l, u) {
  return u && (!Ri(l) || l.substr(0, 6) !== "clamp(") ? "clamp(" + l + ")" : l;
}, RE = function f() {
  return Xo && requestAnimationFrame(f);
}, o_ = function() {
  return Mf = 1;
}, s_ = function() {
  return Mf = 0;
}, Ol = function(l) {
  return l;
}, Vo = function(l) {
  return Math.round(l * 1e5) / 1e5 || 0;
}, qy = function() {
  return typeof window < "u";
}, Xy = function() {
  return Ot || qy() && (Ot = window.gsap) && Ot.registerPlugin && Ot;
}, Au = function(l) {
  return !!~rm.indexOf(l);
}, Vy = function(l) {
  return (l === "Height" ? sm : It["inner" + l]) || Ci["client" + l] || ve["client" + l];
}, Gy = function(l) {
  return La(l, "getBoundingClientRect") || (Au(l) ? function() {
    return af.width = It.innerWidth, af.height = sm, af;
  } : function() {
    return Pl(l);
  });
}, zE = function(l, u, a) {
  var o = a.d, c = a.d2, h = a.a;
  return (h = La(l, "getBoundingClientRect")) ? function() {
    return h()[o];
  } : function() {
    return (u ? Vy(c) : l["client" + c]) || 0;
  };
}, CE = function(l, u) {
  return !u || ~Dl.indexOf(l) ? Gy(l) : function() {
    return af;
  };
}, Cl = function(l, u) {
  var a = u.s, o = u.d2, c = u.d, h = u.a;
  return Math.max(0, (a = "scroll" + o) && (h = La(l, a)) ? h() - Gy(l)()[c] : Au(l) ? (Ci[a] || ve[a]) - Vy(o) : l[a] - l["offset" + o]);
}, Vc = function(l, u) {
  for (var a = 0; a < Er.length; a += 3)
    (!u || ~u.indexOf(Er[a + 1])) && l(Er[a], Er[a + 1], Er[a + 2]);
}, Ri = function(l) {
  return typeof l == "string";
}, qn = function(l) {
  return typeof l == "function";
}, Go = function(l) {
  return typeof l == "number";
}, pu = function(l) {
  return typeof l == "object";
}, Uo = function(l, u, a) {
  return l && l.progress(u ? 0 : 1) && a && l.pause();
}, yr = function(l, u, a) {
  if (l.enabled) {
    var o = l._ctx ? l._ctx.add(function() {
      return u(l, a);
    }) : u(l, a);
    o && o.totalTime && (l.callbackAnimation = o);
  }
}, Sr = Math.abs, jy = "left", Qy = "top", cm = "right", fm = "bottom", xu = "width", Mu = "height", Wo = "Right", Io = "Left", ts = "Top", es = "Bottom", fn = "padding", tl = "margin", qr = "Width", hm = "Height", pn = "px", el = function(l) {
  return It.getComputedStyle(l.nodeType === Node.DOCUMENT_NODE ? l.scrollingElement : l);
}, DE = function(l) {
  var u = el(l).position;
  l.style.position = u === "absolute" || u === "fixed" ? u : "relative";
}, c_ = function(l, u) {
  for (var a in u)
    a in l || (l[a] = u[a]);
  return l;
}, Pl = function(l, u) {
  var a = u && el(l)[U0] !== "matrix(1, 0, 0, 1, 0, 0)" && Ot.to(l, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), o = l.getBoundingClientRect ? l.getBoundingClientRect() : l.scrollingElement.getBoundingClientRect();
  return a && a.progress(0).kill(), o;
}, _f = function(l, u) {
  var a = u.d2;
  return l["offset" + a] || l["client" + a] || 0;
}, Zy = function(l) {
  var u = [], a = l.labels, o = l.duration(), c;
  for (c in a)
    u.push(a[c] / o);
  return u;
}, NE = function(l) {
  return function(u) {
    return Ot.utils.snap(Zy(l), u);
  };
}, dm = function(l) {
  var u = Ot.utils.snap(l), a = Array.isArray(l) && l.slice(0).sort(function(o, c) {
    return o - c;
  });
  return a ? function(o, c, h) {
    h === void 0 && (h = 1e-3);
    var d;
    if (!c)
      return u(o);
    if (c > 0) {
      for (o -= h, d = 0; d < a.length; d++)
        if (a[d] >= o)
          return a[d];
      return a[d - 1];
    } else
      for (d = a.length, o += h; d--; )
        if (a[d] <= o)
          return a[d];
    return a[0];
  } : function(o, c, h) {
    h === void 0 && (h = 1e-3);
    var d = u(o);
    return !c || Math.abs(d - o) < h || d - o < 0 == c < 0 ? d : u(c < 0 ? o - l : o + l);
  };
}, UE = function(l) {
  return function(u, a) {
    return dm(Zy(l))(u, a.direction);
  };
}, Gc = function(l, u, a, o) {
  return a.split(",").forEach(function(c) {
    return l(u, c, o);
  });
}, xn = function(l, u, a, o, c) {
  return l.addEventListener(u, a, {
    passive: !o,
    capture: !!c
  });
}, En = function(l, u, a, o) {
  return l.removeEventListener(u, a, !!o);
}, jc = function(l, u, a) {
  a = a && a.wheelHandler, a && (l(u, "wheel", a), l(u, "touchmove", a));
}, f_ = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Qc = {
  toggleActions: "play",
  anticipatePin: 0
}, yf = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, tf = function(l, u) {
  if (Ri(l)) {
    var a = l.indexOf("="), o = ~a ? +(l.charAt(a - 1) + 1) * parseFloat(l.substr(a + 1)) : 0;
    ~a && (l.indexOf("%") > a && (o *= u / 100), l = l.substr(0, a - 1)), l = o + (l in yf ? yf[l] * u : ~l.indexOf("%") ? parseFloat(l) * u / 100 : parseFloat(l) || 0);
  }
  return l;
}, Zc = function(l, u, a, o, c, h, d, g) {
  var p = c.startColor, v = c.endColor, _ = c.fontSize, S = c.indent, b = c.fontWeight, M = be.createElement("div"), T = Au(a) || La(a, "pinType") === "fixed", R = l.indexOf("scroller") !== -1, V = T ? ve : a.tagName === "IFRAME" ? a.contentDocument.body : a, X = l.indexOf("start") !== -1, K = X ? p : v, Y = "border-color:" + K + ";font-size:" + _ + ";color:" + K + ";font-weight:" + b + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return Y += "position:" + ((R || g) && T ? "fixed;" : "absolute;"), (R || g || !T) && (Y += (o === vn ? cm : fm) + ":" + (h + parseFloat(S)) + "px;"), d && (Y += "box-sizing:border-box;text-align:left;width:" + d.offsetWidth + "px;"), M._isStart = X, M.setAttribute("class", "gsap-marker-" + l + (u ? " marker-" + u : "")), M.style.cssText = Y, M.innerText = u || u === 0 ? l + "-" + u : l, V.children[0] ? V.insertBefore(M, V.children[0]) : V.appendChild(M), M._offset = M["offset" + o.op.d2], ef(M, 0, o, X), M;
}, ef = function(l, u, a, o) {
  var c = {
    display: "block"
  }, h = a[o ? "os2" : "p2"], d = a[o ? "p2" : "os2"];
  l._isFlipped = o, c[a.a + "Percent"] = o ? -100 : 0, c[a.a] = o ? "1px" : 0, c["border" + h + qr] = 1, c["border" + d + qr] = 0, c[a.p] = u + "px", Ot.set(l, c);
}, Wt = [], Y0 = {}, ms, h_ = function() {
  return Ln() - ll > 34 && (ms || (ms = requestAnimationFrame(Wl)));
}, br = function() {
  (!$n || !$n.isPressed || $n.startX > ve.clientWidth) && (te.cache++, $n ? ms || (ms = requestAnimationFrame(Wl)) : Wl(), ll || Ru("scrollStart"), ll = Ln());
}, d0 = function() {
  Yy = It.innerWidth, Ly = It.innerHeight;
}, jo = function(l) {
  te.cache++, (l === !0 || !Hn && !Hy && !be.fullscreenElement && !be.webkitFullscreenElement && (!B0 || Yy !== It.innerWidth || Math.abs(It.innerHeight - Ly) > It.innerHeight * 0.25)) && vf.restart(!0);
}, Ou = {}, BE = [], Ky = function f() {
  return En(Pt, "scrollEnd", f) || _u(!0);
}, Ru = function(l) {
  return Ou[l] && Ou[l].map(function(u) {
    return u();
  }) || BE;
}, Oi = [], Fy = function(l) {
  for (var u = 0; u < Oi.length; u += 5)
    (!l || Oi[u + 4] && Oi[u + 4].query === l) && (Oi[u].style.cssText = Oi[u + 1], Oi[u].getBBox && Oi[u].setAttribute("transform", Oi[u + 2] || ""), Oi[u + 3].uncache = 1);
}, Jy = function() {
  te.cache++, te.forEach(function(l) {
    return qn(l) && (l.rec = l());
  });
}, mm = function(l, u) {
  var a;
  for (Wn = 0; Wn < Wt.length; Wn++)
    a = Wt[Wn], a && (!u || a._ctx === u) && (l ? a.kill(1) : a.revert(!0, !0));
  Ya = !0, u && Fy(u), u || Ru("revert");
}, ky = function(l, u) {
  te.cache++, (u || !In) && te.forEach(function(a) {
    return qn(a) && a.cacheID++ && (a.rec = 0);
  }), Ri(l) && (om = l, It.history.scrollRestoration !== l && (It.history.scrollRestoration = l));
}, In, wu = 0, d_, HE = function() {
  if (d_ !== wu) {
    var l = d_ = wu;
    requestAnimationFrame(function() {
      return l === wu && _u(!0);
    });
  }
}, Py = function() {
  ve.appendChild(Dr), sm = !$n && Dr.offsetHeight || It.innerHeight, ve.removeChild(Dr);
}, m_ = function(l) {
  return ds(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(u) {
    return u.style.display = l ? "none" : "block";
  });
}, _u = function(l, u) {
  if (Ci = be.documentElement, ve = be.body, rm = [It, be, Ci, ve], ll && !l && !Ya) {
    xn(Pt, "scrollEnd", Ky);
    return;
  }
  Py(), In = Pt.isRefreshing = !0, Ya || Jy();
  var a = Ru("refreshInit");
  By && Pt.sort(), u || mm(), te.forEach(function(o) {
    qn(o) && (o.smooth && (o.target.style.scrollBehavior = "auto"), o(0));
  }), Wt.slice(0).forEach(function(o) {
    return o.refresh();
  }), Ya = !1, Wt.forEach(function(o) {
    if (o._subPinOffset && o.pin) {
      var c = o.vars.horizontal ? "offsetWidth" : "offsetHeight", h = o.pin[c];
      o.revert(!0, 1), o.adjustPinSpacing(o.pin[c] - h), o.refresh();
    }
  }), L0 = 1, m_(!0), Wt.forEach(function(o) {
    var c = Cl(o.scroller, o._dir), h = o.vars.end === "max" || o._endClamp && o.end > c, d = o._startClamp && o.start >= c;
    (h || d) && o.setPositions(d ? c - 1 : o.start, h ? Math.max(d ? c : o.start + 1, c) : o.end, !0);
  }), m_(!1), L0 = 0, a.forEach(function(o) {
    return o && o.render && o.render(-1);
  }), te.forEach(function(o) {
    qn(o) && (o.smooth && requestAnimationFrame(function() {
      return o.target.style.scrollBehavior = "smooth";
    }), o.rec && o(o.rec));
  }), ky(om, 1), vf.pause(), wu++, In = 2, Wl(2), Wt.forEach(function(o) {
    return qn(o.vars.onRefresh) && o.vars.onRefresh(o);
  }), In = Pt.isRefreshing = !1, Ru("refresh");
}, q0 = 0, nf = 1, ns, Wl = function(l) {
  if (l === 2 || !In && !Ya) {
    Pt.isUpdating = !0, ns && ns.update(0);
    var u = Wt.length, a = Ln(), o = a - h0 >= 50, c = u && Wt[0].scroll();
    if (nf = q0 > c ? -1 : 1, In || (q0 = c), o && (ll && !Mf && a - ll > 200 && (ll = 0, Ru("scrollEnd")), qo = h0, h0 = a), nf < 0) {
      for (Wn = u; Wn-- > 0; )
        Wt[Wn] && Wt[Wn].update(0, o);
      nf = 1;
    } else
      for (Wn = 0; Wn < u; Wn++)
        Wt[Wn] && Wt[Wn].update(0, o);
    Pt.isUpdating = !1;
  }
  ms = 0;
}, X0 = [jy, Qy, fm, cm, tl + es, tl + Wo, tl + ts, tl + Io, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], lf = X0.concat([xu, Mu, "boxSizing", "max" + qr, "max" + hm, "position", tl, fn, fn + ts, fn + Wo, fn + es, fn + Io]), LE = function(l, u, a) {
  Nr(a);
  var o = l._gsap;
  if (o.spacerIsNative)
    Nr(o.spacerState);
  else if (l._gsap.swappedIn) {
    var c = u.parentNode;
    c && (c.insertBefore(l, u), c.removeChild(u));
  }
  l._gsap.swappedIn = !1;
}, m0 = function(l, u, a, o) {
  if (!l._gsap.swappedIn) {
    for (var c = X0.length, h = u.style, d = l.style, g; c--; )
      g = X0[c], h[g] = a[g];
    h.position = a.position === "absolute" ? "absolute" : "relative", a.display === "inline" && (h.display = "inline-block"), d[fm] = d[cm] = "auto", h.flexBasis = a.flexBasis || "auto", h.overflow = "visible", h.boxSizing = "border-box", h[xu] = _f(l, ti) + pn, h[Mu] = _f(l, vn) + pn, h[fn] = d[tl] = d[Qy] = d[jy] = "0", Nr(o), d[xu] = d["max" + qr] = a[xu], d[Mu] = d["max" + hm] = a[Mu], d[fn] = a[fn], l.parentNode !== u && (l.parentNode.insertBefore(u, l), u.appendChild(l)), l._gsap.swappedIn = !0;
  }
}, YE = /([A-Z])/g, Nr = function(l) {
  if (l) {
    var u = l.t.style, a = l.length, o = 0, c, h;
    for ((l.t._gsap || Ot.core.getCache(l.t)).uncache = 1; o < a; o += 2)
      h = l[o + 1], c = l[o], h ? u[c] = h : u[c] && u.removeProperty(c.replace(YE, "-$1").toLowerCase());
  }
}, Kc = function(l) {
  for (var u = lf.length, a = l.style, o = [], c = 0; c < u; c++)
    o.push(lf[c], a[lf[c]]);
  return o.t = l, o;
}, qE = function(l, u, a) {
  for (var o = [], c = l.length, h = a ? 8 : 0, d; h < c; h += 2)
    d = l[h], o.push(d, d in u ? u[d] : l[h + 1]);
  return o.t = l.t, o;
}, af = {
  left: 0,
  top: 0
}, g_ = function(l, u, a, o, c, h, d, g, p, v, _, S, b, M) {
  qn(l) && (l = l(g)), Ri(l) && l.substr(0, 3) === "max" && (l = S + (l.charAt(4) === "=" ? tf("0" + l.substr(3), a) : 0));
  var T = b ? b.time() : 0, R, V, X;
  if (b && b.seek(0), isNaN(l) || (l = +l), Go(l))
    b && (l = Ot.utils.mapRange(b.scrollTrigger.start, b.scrollTrigger.end, 0, S, l)), d && ef(d, a, o, !0);
  else {
    qn(u) && (u = u(g));
    var K = (l || "0").split(" "), Y, Q, k, D;
    X = si(u, g) || ve, Y = Pl(X) || {}, (!Y || !Y.left && !Y.top) && el(X).display === "none" && (D = X.style.display, X.style.display = "block", Y = Pl(X), D ? X.style.display = D : X.style.removeProperty("display")), Q = tf(K[0], Y[o.d]), k = tf(K[1] || "0", a), l = Y[o.p] - p[o.p] - v + Q + c - k, d && ef(d, k, o, a - k < 20 || d._isStart && k > 20), a -= a - k;
  }
  if (M && (g[M] = l || -1e-3, l < 0 && (l = 0)), h) {
    var Z = l + a, $ = h._isStart;
    R = "scroll" + o.d2, ef(h, Z, o, $ && Z > 20 || !$ && (_ ? Math.max(ve[R], Ci[R]) : h.parentNode[R]) <= Z + 1), _ && (p = Pl(d), _ && (h.style[o.op.p] = p[o.op.p] - o.op.m - h._offset + pn));
  }
  return b && X && (R = Pl(X), b.seek(S), V = Pl(X), b._caScrollDist = R[o.p] - V[o.p], l = l / b._caScrollDist * S), b && b.seek(T), b ? l : Math.round(l);
}, XE = /(webkit|moz|length|cssText|inset)/i, p_ = function(l, u, a, o) {
  if (l.parentNode !== u) {
    var c = l.style, h, d;
    if (u === ve) {
      l._stOrig = c.cssText, d = el(l);
      for (h in d)
        !+h && !XE.test(h) && d[h] && typeof c[h] == "string" && h !== "0" && (c[h] = d[h]);
      c.top = a, c.left = o;
    } else
      c.cssText = l._stOrig;
    Ot.core.getCache(l).uncache = 1, u.appendChild(l);
  }
}, $y = function(l, u, a) {
  var o = u, c = o;
  return function(h) {
    var d = Math.round(l());
    return d !== o && d !== c && Math.abs(d - o) > 3 && Math.abs(d - c) > 3 && (h = d, a && a()), c = o, o = Math.round(h), o;
  };
}, Fc = function(l, u, a) {
  var o = {};
  o[u.p] = "+=" + a, Ot.set(l, o);
}, v_ = function(l, u) {
  var a = Ga(l, u), o = "_scroll" + u.p2, c = function h(d, g, p, v, _) {
    var S = h.tween, b = g.onComplete, M = {};
    p = p || a();
    var T = $y(a, p, function() {
      S.kill(), h.tween = 0;
    });
    return _ = v && _ || 0, v = v || d - p, S && S.kill(), g[o] = d, g.inherit = !1, g.modifiers = M, M[o] = function() {
      return T(p + v * S.ratio + _ * S.ratio * S.ratio);
    }, g.onUpdate = function() {
      te.cache++, h.tween && Wl();
    }, g.onComplete = function() {
      h.tween = 0, b && b.call(S);
    }, S = h.tween = Ot.to(l, g), S;
  };
  return l[o] = a, a.wheelHandler = function() {
    return c.tween && c.tween.kill() && (c.tween = 0);
  }, xn(l, "wheel", a.wheelHandler), Pt.isTouch && xn(l, "touchmove", a.wheelHandler), c;
}, Pt = /* @__PURE__ */ (function() {
  function f(u, a) {
    Tr || f.register(Ot) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), H0(this), this.init(u, a);
  }
  var l = f.prototype;
  return l.init = function(a, o) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Xo) {
      this.update = this.refresh = this.kill = Ol;
      return;
    }
    a = c_(Ri(a) || Go(a) || a.nodeType ? {
      trigger: a
    } : a, Qc);
    var c = a, h = c.onUpdate, d = c.toggleClass, g = c.id, p = c.onToggle, v = c.onRefresh, _ = c.scrub, S = c.trigger, b = c.pin, M = c.pinSpacing, T = c.invalidateOnRefresh, R = c.anticipatePin, V = c.onScrubComplete, X = c.onSnapComplete, K = c.once, Y = c.snap, Q = c.pinReparent, k = c.pinSpacer, D = c.containerAnimation, Z = c.fastScrollEnd, $ = c.preventOverlaps, G = a.horizontal || a.containerAnimation && a.horizontal !== !1 ? ti : vn, ut = !_ && _ !== 0, lt = si(a.scroller || It), St = Ot.core.getCache(lt), Mt = Au(lt), et = ("pinType" in a ? a.pinType : La(lt, "pinType") || Mt && "fixed") === "fixed", F = [a.onEnter, a.onLeave, a.onEnterBack, a.onLeaveBack], P = ut && a.toggleActions.split(" "), I = "markers" in a ? a.markers : Qc.markers, st = Mt ? 0 : parseFloat(el(lt)["border" + G.p2 + qr]) || 0, A = this, Et = a.onRefreshInit && function() {
      return a.onRefreshInit(A);
    }, z = zE(lt, Mt, G), Nt = CE(lt, Mt), E = 0, w = 0, J = 0, L = Ga(lt, G), mt, ht, Rt, ot, gt, zt, vt, Ut, Yt, B, nt, pt, dt, bt, jt, kt, Ht, Ct, ee, ue, Fe, Re, _n, Vn, xe, Yi, He, Gn, tn, ei, qi, qt, Xi, dn, wn, mn, Vi, Gi, ni;
    if (A._startClamp = A._endClamp = !1, A._dir = G, R *= 45, A.scroller = lt, A.scroll = D ? D.time.bind(D) : L, ot = L(), Ya && L.rec == null && (L.rec = ot), A.vars = a, o = o || a.animation, "refreshPriority" in a && (By = 1, a.refreshPriority === -9999 && (ns = A)), St.tweenScroll = St.tweenScroll || {
      top: v_(lt, vn),
      left: v_(lt, ti)
    }, A.tweenTo = mt = St.tweenScroll[G.p], A.scrubDuration = function(it) {
      Xi = Go(it) && it, Xi ? qt ? qt.duration(it) : qt = Ot.to(o, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Xi,
        paused: !0,
        onComplete: function() {
          return V && V(A);
        }
      }) : (qt && qt.progress(1).kill(), qt = 0);
    }, o && (o.vars.lazy = !1, o._initted && !A.isReverted || o.vars.immediateRender !== !1 && a.immediateRender !== !1 && o.duration() && o.render(0, !0, !0), A.animation = o.pause(), o.scrollTrigger = A, A.scrubDuration(_), ei = 0, g || (g = o.vars.id)), Y && ((!pu(Y) || Y.push) && (Y = {
      snapTo: Y
    }), "scrollBehavior" in ve.style && Ot.set(Mt ? [ve, Ci] : lt, {
      scrollBehavior: "auto"
    }), te.forEach(function(it) {
      return qn(it) && it.target === (Mt ? be.scrollingElement || Ci : lt) && (it.smooth = !1);
    }), Rt = qn(Y.snapTo) ? Y.snapTo : Y.snapTo === "labels" ? NE(o) : Y.snapTo === "labelsDirectional" ? UE(o) : Y.directional !== !1 ? function(it, ft) {
      return dm(Y.snapTo)(it, Ln() - w < 500 ? 0 : ft.direction);
    } : Ot.utils.snap(Y.snapTo), dn = Y.duration || {
      min: 0.1,
      max: 2
    }, dn = pu(dn) ? $o(dn.min, dn.max) : $o(dn, dn), wn = Ot.delayedCall(Y.delay || Xi / 2 || 0.1, function() {
      var it = L(), ft = Ln() - w < 500, yt = mt.tween;
      if ((ft || Math.abs(A.getVelocity()) < 10) && !yt && !Mf && E !== it) {
        var xt = (it - zt) / bt, Lt = o && !ut ? o.totalProgress() : xt, At = ft ? 0 : (Lt - qi) / (Ln() - qo) * 1e3 || 0, Vt = Ot.utils.clamp(-xt, 1 - xt, Sr(At / 2) * At / 0.185), ne = xt + (Y.inertia === !1 ? 0 : Vt), Xt, Qt, Kt = Y, Me = Kt.onStart, he = Kt.onInterrupt, Le = Kt.onComplete;
        if (Xt = Rt(ne, A), Go(Xt) || (Xt = ne), Qt = Math.max(0, Math.round(zt + Xt * bt)), it <= vt && it >= zt && Qt !== it) {
          if (yt && !yt._initted && yt.data <= Sr(Qt - it))
            return;
          Y.inertia === !1 && (Vt = Xt - xt), mt(Qt, {
            duration: dn(Sr(Math.max(Sr(ne - Lt), Sr(Xt - Lt)) * 0.185 / At / 0.05 || 0)),
            ease: Y.ease || "power3",
            data: Sr(Qt - it),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return wn.restart(!0) && he && yr(A, he);
            },
            onComplete: function() {
              A.update(), E = L(), o && !ut && (qt ? qt.resetTo("totalProgress", Xt, o._tTime / o._tDur) : o.progress(Xt)), ei = qi = o && !ut ? o.totalProgress() : A.progress, X && X(A), Le && yr(A, Le);
            }
          }, it, Vt * bt, Qt - it - Vt * bt), Me && yr(A, Me, mt.tween);
        }
      } else A.isActive && E !== it && wn.restart(!0);
    }).pause()), g && (Y0[g] = A), S = A.trigger = si(S || b !== !0 && b), ni = S && S._gsap && S._gsap.stRevert, ni && (ni = ni(A)), b = b === !0 ? S : si(b), Ri(d) && (d = {
      targets: S,
      className: d
    }), b && (M === !1 || M === tl || (M = !M && b.parentNode && b.parentNode.style && el(b.parentNode).display === "flex" ? !1 : fn), A.pin = b, ht = Ot.core.getCache(b), ht.spacer ? jt = ht.pinState : (k && (k = si(k), k && !k.nodeType && (k = k.current || k.nativeElement), ht.spacerIsNative = !!k, k && (ht.spacerState = Kc(k))), ht.spacer = Ct = k || be.createElement("div"), Ct.classList.add("pin-spacer"), g && Ct.classList.add("pin-spacer-" + g), ht.pinState = jt = Kc(b)), a.force3D !== !1 && Ot.set(b, {
      force3D: !0
    }), A.spacer = Ct = ht.spacer, tn = el(b), Vn = tn[M + G.os2], ue = Ot.getProperty(b), Fe = Ot.quickSetter(b, G.a, pn), m0(b, Ct, tn), Ht = Kc(b)), I) {
      pt = pu(I) ? c_(I, f_) : f_, B = Zc("scroller-start", g, lt, G, pt, 0), nt = Zc("scroller-end", g, lt, G, pt, 0, B), ee = B["offset" + G.op.d2];
      var ct = si(La(lt, "content") || lt);
      Ut = this.markerStart = Zc("start", g, ct, G, pt, ee, 0, D), Yt = this.markerEnd = Zc("end", g, ct, G, pt, ee, 0, D), D && (Gi = Ot.quickSetter([Ut, Yt], G.a, pn)), !et && !(Dl.length && La(lt, "fixedMarkers") === !0) && (DE(Mt ? ve : lt), Ot.set([B, nt], {
        force3D: !0
      }), Yi = Ot.quickSetter(B, G.a, pn), Gn = Ot.quickSetter(nt, G.a, pn));
    }
    if (D) {
      var at = D.vars.onUpdate, rt = D.vars.onUpdateParams;
      D.eventCallback("onUpdate", function() {
        A.update(0, 0, 1), at && at.apply(D, rt || []);
      });
    }
    if (A.previous = function() {
      return Wt[Wt.indexOf(A) - 1];
    }, A.next = function() {
      return Wt[Wt.indexOf(A) + 1];
    }, A.revert = function(it, ft) {
      if (!ft)
        return A.kill(!0);
      var yt = it !== !1 || !A.enabled, xt = Hn;
      yt !== A.isReverted && (yt && (mn = Math.max(L(), A.scroll.rec || 0), J = A.progress, Vi = o && o.progress()), Ut && [Ut, Yt, B, nt].forEach(function(Lt) {
        return Lt.style.display = yt ? "none" : "block";
      }), yt && (Hn = A, A.update(yt)), b && (!Q || !A.isActive) && (yt ? LE(b, Ct, jt) : m0(b, Ct, el(b), xe)), yt || A.update(yt), Hn = xt, A.isReverted = yt);
    }, A.refresh = function(it, ft, yt, xt) {
      if (!((Hn || !A.enabled) && !ft)) {
        if (b && it && ll) {
          xn(f, "scrollEnd", Ky);
          return;
        }
        !In && Et && Et(A), Hn = A, mt.tween && !yt && (mt.tween.kill(), mt.tween = 0), qt && qt.pause(), T && o && (o.revert({
          kill: !1
        }).invalidate(), o.getChildren ? o.getChildren(!0, !0, !1).forEach(function(ii) {
          return ii.vars.immediateRender && ii.render(0, !0, !0);
        }) : o.vars.immediateRender && o.render(0, !0, !0)), A.isReverted || A.revert(!0, !0), A._subPinOffset = !1;
        var Lt = z(), At = Nt(), Vt = D ? D.duration() : Cl(lt, G), ne = bt <= 0.01 || !bt, Xt = 0, Qt = xt || 0, Kt = pu(yt) ? yt.end : a.end, Me = a.endTrigger || S, he = pu(yt) ? yt.start : a.start || (a.start === 0 || !S ? 0 : b ? "0 0" : "0 100%"), Le = A.pinnedContainer = a.pinnedContainer && si(a.pinnedContainer, A), Ve = S && Math.max(0, Wt.indexOf(A)) || 0, we = Ve, Ne, me, vi, ml, Ge, Ue, yn, en, Ye, Be, Je, _i, al;
        for (I && pu(yt) && (_i = Ot.getProperty(B, G.p), al = Ot.getProperty(nt, G.p)); we-- > 0; )
          Ue = Wt[we], Ue.end || Ue.refresh(0, 1) || (Hn = A), yn = Ue.pin, yn && (yn === S || yn === b || yn === Le) && !Ue.isReverted && (Be || (Be = []), Be.unshift(Ue), Ue.revert(!0, !0)), Ue !== Wt[we] && (Ve--, we--);
        for (qn(he) && (he = he(A)), he = u_(he, "start", A), zt = g_(he, S, Lt, G, L(), Ut, B, A, At, st, et, Vt, D, A._startClamp && "_startClamp") || (b ? -1e-3 : 0), qn(Kt) && (Kt = Kt(A)), Ri(Kt) && !Kt.indexOf("+=") && (~Kt.indexOf(" ") ? Kt = (Ri(he) ? he.split(" ")[0] : "") + Kt : (Xt = tf(Kt.substr(2), Lt), Kt = Ri(he) ? he : (D ? Ot.utils.mapRange(0, D.duration(), D.scrollTrigger.start, D.scrollTrigger.end, zt) : zt) + Xt, Me = S)), Kt = u_(Kt, "end", A), vt = Math.max(zt, g_(Kt || (Me ? "100% 0" : Vt), Me, Lt, G, L() + Xt, Yt, nt, A, At, st, et, Vt, D, A._endClamp && "_endClamp")) || -1e-3, Xt = 0, we = Ve; we--; )
          Ue = Wt[we] || {}, yn = Ue.pin, yn && Ue.start - Ue._pinPush <= zt && !D && Ue.end > 0 && (Ne = Ue.end - (A._startClamp ? Math.max(0, Ue.start) : Ue.start), (yn === S && Ue.start - Ue._pinPush < zt || yn === Le) && isNaN(he) && (Xt += Ne * (1 - Ue.progress)), yn === b && (Qt += Ne));
        if (zt += Xt, vt += Xt, A._startClamp && (A._startClamp += Xt), A._endClamp && !In && (A._endClamp = vt || -1e-3, vt = Math.min(vt, Cl(lt, G))), bt = vt - zt || (zt -= 0.01) && 1e-3, ne && (J = Ot.utils.clamp(0, 1, Ot.utils.normalize(zt, vt, mn))), A._pinPush = Qt, Ut && Xt && (Ne = {}, Ne[G.a] = "+=" + Xt, Le && (Ne[G.p] = "-=" + L()), Ot.set([Ut, Yt], Ne)), b && !(L0 && A.end >= Cl(lt, G)))
          Ne = el(b), ml = G === vn, vi = L(), Re = parseFloat(ue(G.a)) + Qt, !Vt && vt > 1 && (Je = (Mt ? be.scrollingElement || Ci : lt).style, Je = {
            style: Je,
            value: Je["overflow" + G.a.toUpperCase()]
          }, Mt && el(ve)["overflow" + G.a.toUpperCase()] !== "scroll" && (Je.style["overflow" + G.a.toUpperCase()] = "scroll")), m0(b, Ct, Ne), Ht = Kc(b), me = Pl(b, !0), en = et && Ga(lt, ml ? ti : vn)(), M ? (xe = [M + G.os2, bt + Qt + pn], xe.t = Ct, we = M === fn ? _f(b, G) + bt + Qt : 0, we && (xe.push(G.d, we + pn), Ct.style.flexBasis !== "auto" && (Ct.style.flexBasis = we + pn)), Nr(xe), Le && Wt.forEach(function(ii) {
            ii.pin === Le && ii.vars.pinSpacing !== !1 && (ii._subPinOffset = !0);
          }), et && L(mn)) : (we = _f(b, G), we && Ct.style.flexBasis !== "auto" && (Ct.style.flexBasis = we + pn)), et && (Ge = {
            top: me.top + (ml ? vi - zt : en) + pn,
            left: me.left + (ml ? en : vi - zt) + pn,
            boxSizing: "border-box",
            position: "fixed"
          }, Ge[xu] = Ge["max" + qr] = Math.ceil(me.width) + pn, Ge[Mu] = Ge["max" + hm] = Math.ceil(me.height) + pn, Ge[tl] = Ge[tl + ts] = Ge[tl + Wo] = Ge[tl + es] = Ge[tl + Io] = "0", Ge[fn] = Ne[fn], Ge[fn + ts] = Ne[fn + ts], Ge[fn + Wo] = Ne[fn + Wo], Ge[fn + es] = Ne[fn + es], Ge[fn + Io] = Ne[fn + Io], kt = qE(jt, Ge, Q), In && L(0)), o ? (Ye = o._initted, c0(1), o.render(o.duration(), !0, !0), _n = ue(G.a) - Re + bt + Qt, He = Math.abs(bt - _n) > 1, et && He && kt.splice(kt.length - 2, 2), o.render(0, !0, !0), Ye || o.invalidate(!0), o.parent || o.totalTime(o.totalTime()), c0(0)) : _n = bt, Je && (Je.value ? Je.style["overflow" + G.a.toUpperCase()] = Je.value : Je.style.removeProperty("overflow-" + G.a));
        else if (S && L() && !D)
          for (me = S.parentNode; me && me !== ve; )
            me._pinOffset && (zt -= me._pinOffset, vt -= me._pinOffset), me = me.parentNode;
        Be && Be.forEach(function(ii) {
          return ii.revert(!1, !0);
        }), A.start = zt, A.end = vt, ot = gt = In ? mn : L(), !D && !In && !Ya && (ot < mn && L(mn), A.scroll.rec = 0), A.revert(!1, !0), w = Ln(), wn && (E = -1, wn.restart(!0)), Hn = 0, o && ut && (o._initted || Vi) && o.progress() !== Vi && o.progress(Vi || 0, !0).render(o.time(), !0, !0), (ne || J !== A.progress || D || T || o && !o._initted) && (o && !ut && (o._initted || J || o.vars.immediateRender !== !1) && o.totalProgress(D && zt < -1e-3 && !J ? Ot.utils.normalize(zt, vt, 0) : J, !0), A.progress = ne || (ot - zt) / bt === J ? 0 : J), b && M && (Ct._pinOffset = Math.round(A.progress * _n)), qt && qt.invalidate(), isNaN(_i) || (_i -= Ot.getProperty(B, G.p), al -= Ot.getProperty(nt, G.p), Fc(B, G, _i), Fc(Ut, G, _i - (xt || 0)), Fc(nt, G, al), Fc(Yt, G, al - (xt || 0))), ne && !In && A.update(), v && !In && !dt && (dt = !0, v(A), dt = !1);
      }
    }, A.getVelocity = function() {
      return (L() - gt) / (Ln() - qo) * 1e3 || 0;
    }, A.endAnimation = function() {
      Uo(A.callbackAnimation), o && (qt ? qt.progress(1) : o.paused() ? ut || Uo(o, A.direction < 0, 1) : Uo(o, o.reversed()));
    }, A.labelToScroll = function(it) {
      return o && o.labels && (zt || A.refresh() || zt) + o.labels[it] / o.duration() * bt || 0;
    }, A.getTrailing = function(it) {
      var ft = Wt.indexOf(A), yt = A.direction > 0 ? Wt.slice(0, ft).reverse() : Wt.slice(ft + 1);
      return (Ri(it) ? yt.filter(function(xt) {
        return xt.vars.preventOverlaps === it;
      }) : yt).filter(function(xt) {
        return A.direction > 0 ? xt.end <= zt : xt.start >= vt;
      });
    }, A.update = function(it, ft, yt) {
      if (!(D && !yt && !it)) {
        var xt = In === !0 ? mn : A.scroll(), Lt = it ? 0 : (xt - zt) / bt, At = Lt < 0 ? 0 : Lt > 1 ? 1 : Lt || 0, Vt = A.progress, ne, Xt, Qt, Kt, Me, he, Le, Ve;
        if (ft && (gt = ot, ot = D ? L() : xt, Y && (qi = ei, ei = o && !ut ? o.totalProgress() : At)), R && b && !Hn && !Xc && ll && (!At && zt < xt + (xt - gt) / (Ln() - qo) * R ? At = 1e-4 : At === 1 && vt > xt + (xt - gt) / (Ln() - qo) * R && (At = 0.9999)), At !== Vt && A.enabled) {
          if (ne = A.isActive = !!At && At < 1, Xt = !!Vt && Vt < 1, he = ne !== Xt, Me = he || !!At != !!Vt, A.direction = At > Vt ? 1 : -1, A.progress = At, Me && !Hn && (Qt = At && !Vt ? 0 : At === 1 ? 1 : Vt === 1 ? 2 : 3, ut && (Kt = !he && P[Qt + 1] !== "none" && P[Qt + 1] || P[Qt], Ve = o && (Kt === "complete" || Kt === "reset" || Kt in o))), $ && (he || Ve) && (Ve || _ || !o) && (qn($) ? $(A) : A.getTrailing($).forEach(function(vi) {
            return vi.endAnimation();
          })), ut || (qt && !Hn && !Xc ? (qt._dp._time - qt._start !== qt._time && qt.render(qt._dp._time - qt._start), qt.resetTo ? qt.resetTo("totalProgress", At, o._tTime / o._tDur) : (qt.vars.totalProgress = At, qt.invalidate().restart())) : o && o.totalProgress(At, !!(Hn && (w || it)))), b) {
            if (it && M && (Ct.style[M + G.os2] = Vn), !et)
              Fe(Vo(Re + _n * At));
            else if (Me) {
              if (Le = !it && At > Vt && vt + 1 > xt && xt + 1 >= Cl(lt, G), Q)
                if (!it && (ne || Le)) {
                  var we = Pl(b, !0), Ne = xt - zt;
                  p_(b, ve, we.top + (G === vn ? Ne : 0) + pn, we.left + (G === vn ? 0 : Ne) + pn);
                } else
                  p_(b, Ct);
              Nr(ne || Le ? kt : Ht), He && At < 1 && ne || Fe(Re + (At === 1 && !Le ? _n : 0));
            }
          }
          Y && !mt.tween && !Hn && !Xc && wn.restart(!0), d && (he || K && At && (At < 1 || !f0)) && ds(d.targets).forEach(function(vi) {
            return vi.classList[ne || K ? "add" : "remove"](d.className);
          }), h && !ut && !it && h(A), Me && !Hn ? (ut && (Ve && (Kt === "complete" ? o.pause().totalProgress(1) : Kt === "reset" ? o.restart(!0).pause() : Kt === "restart" ? o.restart(!0) : o[Kt]()), h && h(A)), (he || !f0) && (p && he && yr(A, p), F[Qt] && yr(A, F[Qt]), K && (At === 1 ? A.kill(!1, 1) : F[Qt] = 0), he || (Qt = At === 1 ? 1 : 3, F[Qt] && yr(A, F[Qt]))), Z && !ne && Math.abs(A.getVelocity()) > (Go(Z) ? Z : 2500) && (Uo(A.callbackAnimation), qt ? qt.progress(1) : Uo(o, Kt === "reverse" ? 1 : !At, 1))) : ut && h && !Hn && h(A);
        }
        if (Gn) {
          var me = D ? xt / D.duration() * (D._caScrollDist || 0) : xt;
          Yi(me + (B._isFlipped ? 1 : 0)), Gn(me);
        }
        Gi && Gi(-xt / D.duration() * (D._caScrollDist || 0));
      }
    }, A.enable = function(it, ft) {
      A.enabled || (A.enabled = !0, xn(lt, "resize", jo), Mt || xn(lt, "scroll", br), Et && xn(f, "refreshInit", Et), it !== !1 && (A.progress = J = 0, ot = gt = E = L()), ft !== !1 && A.refresh());
    }, A.getTween = function(it) {
      return it && mt ? mt.tween : qt;
    }, A.setPositions = function(it, ft, yt, xt) {
      if (D) {
        var Lt = D.scrollTrigger, At = D.duration(), Vt = Lt.end - Lt.start;
        it = Lt.start + Vt * it / At, ft = Lt.start + Vt * ft / At;
      }
      A.refresh(!1, !1, {
        start: r_(it, yt && !!A._startClamp),
        end: r_(ft, yt && !!A._endClamp)
      }, xt), A.update();
    }, A.adjustPinSpacing = function(it) {
      if (xe && it) {
        var ft = xe.indexOf(G.d) + 1;
        xe[ft] = parseFloat(xe[ft]) + it + pn, xe[1] = parseFloat(xe[1]) + it + pn, Nr(xe);
      }
    }, A.disable = function(it, ft) {
      if (it !== !1 && A.revert(!0, !0), A.enabled && (A.enabled = A.isActive = !1, ft || qt && qt.pause(), mn = 0, ht && (ht.uncache = 1), Et && En(f, "refreshInit", Et), wn && (wn.pause(), mt.tween && mt.tween.kill() && (mt.tween = 0)), !Mt)) {
        for (var yt = Wt.length; yt--; )
          if (Wt[yt].scroller === lt && Wt[yt] !== A)
            return;
        En(lt, "resize", jo), Mt || En(lt, "scroll", br);
      }
    }, A.kill = function(it, ft) {
      A.disable(it, ft), qt && !ft && qt.kill(), g && delete Y0[g];
      var yt = Wt.indexOf(A);
      yt >= 0 && Wt.splice(yt, 1), yt === Wn && nf > 0 && Wn--, yt = 0, Wt.forEach(function(xt) {
        return xt.scroller === A.scroller && (yt = 1);
      }), yt || In || Ya || (A.scroll.rec = 0), o && (o.scrollTrigger = null, it && o.revert({
        kill: !1
      }), ft || o.kill()), Ut && [Ut, Yt, B, nt].forEach(function(xt) {
        return xt.parentNode && xt.parentNode.removeChild(xt);
      }), ns === A && (ns = 0), b && (ht && (ht.uncache = 1), yt = 0, Wt.forEach(function(xt) {
        return xt.pin === b && yt++;
      }), yt || (ht.spacer = 0)), a.onKill && a.onKill(A);
    }, Wt.push(A), A.enable(!1, !1), ni && ni(A), o && o.add && !bt) {
      var Tt = A.update;
      A.update = function() {
        A.update = Tt, te.cache++, zt || vt || A.refresh();
      }, Ot.delayedCall(0.01, A.update), bt = 0.01, zt = vt = 0;
    } else
      A.refresh();
    b && HE();
  }, f.register = function(a) {
    return Tr || (Ot = a || Xy(), qy() && window.document && f.enable(), Tr = Xo), Tr;
  }, f.defaults = function(a) {
    if (a)
      for (var o in a)
        Qc[o] = a[o];
    return Qc;
  }, f.disable = function(a, o) {
    Xo = 0, Wt.forEach(function(h) {
      return h[o ? "kill" : "disable"](a);
    }), En(It, "wheel", br), En(be, "scroll", br), clearInterval(qc), En(be, "touchcancel", Ol), En(ve, "touchstart", Ol), Gc(En, be, "pointerdown,touchstart,mousedown", o_), Gc(En, be, "pointerup,touchend,mouseup", s_), vf.kill(), Vc(En);
    for (var c = 0; c < te.length; c += 3)
      jc(En, te[c], te[c + 1]), jc(En, te[c], te[c + 2]);
  }, f.enable = function() {
    if (It = window, be = document, Ci = be.documentElement, ve = be.body, Ot) {
      if (ds = Ot.utils.toArray, $o = Ot.utils.clamp, H0 = Ot.core.context || Ol, c0 = Ot.core.suppressOverwrites || Ol, om = It.history.scrollRestoration || "auto", q0 = It.pageYOffset || 0, Ot.core.globals("ScrollTrigger", f), ve) {
        Xo = 1, Dr = document.createElement("div"), Dr.style.height = "100vh", Dr.style.position = "absolute", Py(), RE(), un.register(Ot), f.isTouch = un.isTouch, Oa = un.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), B0 = un.isTouch === 1, xn(It, "wheel", br), rm = [It, be, Ci, ve], Ot.matchMedia ? (f.matchMedia = function(v) {
          var _ = Ot.matchMedia(), S;
          for (S in v)
            _.add(S, v[S]);
          return _;
        }, Ot.addEventListener("matchMediaInit", function() {
          Jy(), mm();
        }), Ot.addEventListener("matchMediaRevert", function() {
          return Fy();
        }), Ot.addEventListener("matchMedia", function() {
          _u(0, 1), Ru("matchMedia");
        }), Ot.matchMedia().add("(orientation: portrait)", function() {
          return d0(), d0;
        })) : console.warn("Requires GSAP 3.11.0 or later"), d0(), xn(be, "scroll", br);
        var a = ve.hasAttribute("style"), o = ve.style, c = o.borderTopStyle, h = Ot.core.Animation.prototype, d, g;
        for (h.revert || Object.defineProperty(h, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), o.borderTopStyle = "solid", d = Pl(ve), vn.m = Math.round(d.top + vn.sc()) || 0, ti.m = Math.round(d.left + ti.sc()) || 0, c ? o.borderTopStyle = c : o.removeProperty("border-top-style"), a || (ve.setAttribute("style", ""), ve.removeAttribute("style")), qc = setInterval(h_, 250), Ot.delayedCall(0.5, function() {
          return Xc = 0;
        }), xn(be, "touchcancel", Ol), xn(ve, "touchstart", Ol), Gc(xn, be, "pointerdown,touchstart,mousedown", o_), Gc(xn, be, "pointerup,touchend,mouseup", s_), U0 = Ot.utils.checkPrefix("transform"), lf.push(U0), Tr = Ln(), vf = Ot.delayedCall(0.2, _u).pause(), Er = [be, "visibilitychange", function() {
          var v = It.innerWidth, _ = It.innerHeight;
          be.hidden ? (l_ = v, a_ = _) : (l_ !== v || a_ !== _) && jo();
        }, be, "DOMContentLoaded", _u, It, "load", _u, It, "resize", jo], Vc(xn), Wt.forEach(function(v) {
          return v.enable(0, 1);
        }), g = 0; g < te.length; g += 3)
          jc(En, te[g], te[g + 1]), jc(En, te[g], te[g + 2]);
      } else if (be) {
        var p = function v() {
          f.enable(), be.removeEventListener("DOMContentLoaded", v);
        };
        be.addEventListener("DOMContentLoaded", p);
      }
    }
  }, f.config = function(a) {
    "limitCallbacks" in a && (f0 = !!a.limitCallbacks);
    var o = a.syncInterval;
    o && clearInterval(qc) || (qc = o) && setInterval(h_, o), "ignoreMobileResize" in a && (B0 = f.isTouch === 1 && a.ignoreMobileResize), "autoRefreshEvents" in a && (Vc(En) || Vc(xn, a.autoRefreshEvents || "none"), Hy = (a.autoRefreshEvents + "").indexOf("resize") === -1);
  }, f.scrollerProxy = function(a, o) {
    var c = si(a), h = te.indexOf(c), d = Au(c);
    ~h && te.splice(h, d ? 6 : 2), o && (d ? Dl.unshift(It, o, ve, o, Ci, o) : Dl.unshift(c, o));
  }, f.clearMatchMedia = function(a) {
    Wt.forEach(function(o) {
      return o._ctx && o._ctx.query === a && o._ctx.kill(!0, !0);
    });
  }, f.isInViewport = function(a, o, c) {
    var h = (Ri(a) ? si(a) : a).getBoundingClientRect(), d = h[c ? xu : Mu] * o || 0;
    return c ? h.right - d > 0 && h.left + d < It.innerWidth : h.bottom - d > 0 && h.top + d < It.innerHeight;
  }, f.positionInViewport = function(a, o, c) {
    Ri(a) && (a = si(a));
    var h = a.getBoundingClientRect(), d = h[c ? xu : Mu], g = o == null ? d / 2 : o in yf ? yf[o] * d : ~o.indexOf("%") ? parseFloat(o) * d / 100 : parseFloat(o) || 0;
    return c ? (h.left + g) / It.innerWidth : (h.top + g) / It.innerHeight;
  }, f.killAll = function(a) {
    if (Wt.slice(0).forEach(function(c) {
      return c.vars.id !== "ScrollSmoother" && c.kill();
    }), a !== !0) {
      var o = Ou.killAll || [];
      Ou = {}, o.forEach(function(c) {
        return c();
      });
    }
  }, f;
})();
Pt.version = "3.15.1";
Pt.saveStyles = function(f) {
  return f ? ds(f).forEach(function(l) {
    if (l && l.style) {
      var u = Oi.indexOf(l);
      u >= 0 && Oi.splice(u, 5), Oi.push(l, l.style.cssText, l.getBBox && l.getAttribute("transform"), Ot.core.getCache(l), H0());
    }
  }) : Oi;
};
Pt.revert = function(f, l) {
  return mm(!f, l);
};
Pt.create = function(f, l) {
  return new Pt(f, l);
};
Pt.refresh = function(f) {
  return f ? jo(!0) : (Tr || Pt.register()) && _u(!0);
};
Pt.update = function(f) {
  return ++te.cache && Wl(f === !0 ? 2 : 0);
};
Pt.clearScrollMemory = ky;
Pt.maxScroll = function(f, l) {
  return Cl(f, l ? ti : vn);
};
Pt.getScrollFunc = function(f, l) {
  return Ga(si(f), l ? ti : vn);
};
Pt.getById = function(f) {
  return Y0[f];
};
Pt.getAll = function() {
  return Wt.filter(function(f) {
    return f.vars.id !== "ScrollSmoother";
  });
};
Pt.isScrolling = function() {
  return !!ll;
};
Pt.snapDirectional = dm;
Pt.addEventListener = function(f, l) {
  var u = Ou[f] || (Ou[f] = []);
  ~u.indexOf(l) || u.push(l);
};
Pt.removeEventListener = function(f, l) {
  var u = Ou[f], a = u && u.indexOf(l);
  a >= 0 && u.splice(a, 1);
};
Pt.batch = function(f, l) {
  var u = [], a = {}, o = l.interval || 0.016, c = l.batchMax || 1e9, h = function(p, v) {
    var _ = [], S = [], b = Ot.delayedCall(o, function() {
      v(_, S), _ = [], S = [];
    }).pause();
    return function(M) {
      _.length || b.restart(!0), _.push(M.trigger), S.push(M), c <= _.length && b.progress(1);
    };
  }, d;
  for (d in l)
    a[d] = d.substr(0, 2) === "on" && qn(l[d]) && d !== "onRefreshInit" ? h(d, l[d]) : l[d];
  return qn(c) && (c = c(), xn(Pt, "refresh", function() {
    return c = l.batchMax();
  })), ds(f).forEach(function(g) {
    var p = {};
    for (d in a)
      p[d] = a[d];
    p.trigger = g, u.push(Pt.create(p));
  }), u;
};
var __ = function(l, u, a, o) {
  return u > o ? l(o) : u < 0 && l(0), a > o ? (o - u) / (a - u) : a < 0 ? u / (u - a) : 1;
}, g0 = function f(l, u) {
  u === !0 ? l.style.removeProperty("touch-action") : l.style.touchAction = u === !0 ? "auto" : u ? "pan-" + u + (un.isTouch ? " pinch-zoom" : "") : "none", l === Ci && f(ve, u);
}, Jc = {
  auto: 1,
  scroll: 1
}, VE = function(l) {
  var u = l.event, a = l.target, o = l.axis, c = (u.changedTouches ? u.changedTouches[0] : u).target, h = c._gsap || Ot.core.getCache(c), d = Ln(), g;
  if (!h._isScrollT || d - h._isScrollT > 2e3) {
    for (; c && c !== ve && (c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth || !(Jc[(g = el(c)).overflowY] || Jc[g.overflowX])); )
      c = c.parentNode;
    h._isScroll = c && c !== a && !Au(c) && (Jc[(g = el(c)).overflowY] || Jc[g.overflowX]), h._isScrollT = d;
  }
  (h._isScroll || o === "x") && (u.stopPropagation(), u._gsapAllow = !0);
}, Wy = function(l, u, a, o) {
  return un.create({
    target: l,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: u,
    onWheel: o = o && VE,
    onPress: o,
    onDrag: o,
    onScroll: o,
    onEnable: function() {
      return a && xn(be, un.eventTypes[0], S_, !1, !0);
    },
    onDisable: function() {
      return En(be, un.eventTypes[0], S_, !0);
    }
  });
}, GE = /(input|label|select|textarea)/i, y_, S_ = function(l) {
  var u = GE.test(l.target.tagName);
  (u || y_) && (l._gsapAllow = !0, y_ = u);
}, jE = function(l) {
  pu(l) || (l = {}), l.preventDefault = l.isNormalizer = l.allowClicks = !0, l.type || (l.type = "wheel,touch"), l.debounce = !!l.debounce, l.id = l.id || "normalizer";
  var u = l, a = u.normalizeScrollX, o = u.momentum, c = u.allowNestedScroll, h = u.onRelease, d, g, p = si(l.target) || Ci, v = Ot.core.globals().ScrollSmoother, _ = v && v.get(), S = Oa && (l.content && si(l.content) || _ && l.content !== !1 && !_.smooth() && _.content()), b = Ga(p, vn), M = Ga(p, ti), T = 1, R = (un.isTouch && It.visualViewport ? It.visualViewport.scale * It.visualViewport.width : It.outerWidth) / It.innerWidth, V = 0, X = qn(o) ? function() {
    return o(d);
  } : function() {
    return o || 2.8;
  }, K, Y, Q = Wy(p, l.type, !0, c), k = function() {
    return Y = !1;
  }, D = Ol, Z = Ol, $ = function() {
    g = Cl(p, vn), Z = $o(Oa ? 1 : 0, g), a && (D = $o(0, Cl(p, ti))), K = wu;
  }, G = function() {
    S._gsap.y = Vo(parseFloat(S._gsap.y) + b.offset) + "px", S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(S._gsap.y) + ", 0, 1)", b.offset = b.cacheID = 0;
  }, ut = function() {
    if (Y) {
      requestAnimationFrame(k);
      var I = Vo(d.deltaY / 2), st = Z(b.v - I);
      if (S && st !== b.v + b.offset) {
        b.offset = st - b.v;
        var A = Vo((parseFloat(S && S._gsap.y) || 0) - b.offset);
        S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + A + ", 0, 1)", S._gsap.y = A + "px", b.cacheID = te.cache, Wl();
      }
      return !0;
    }
    b.offset && G(), Y = !0;
  }, lt, St, Mt, et, F = function() {
    $(), lt.isActive() && lt.vars.scrollY > g && (b() > g ? lt.progress(1) && b(g) : lt.resetTo("scrollY", g));
  };
  return S && Ot.set(S, {
    y: "+=0"
  }), l.ignoreCheck = function(P) {
    return Oa && P.type === "touchmove" && ut() || T > 1.05 && P.type !== "touchstart" || d.isGesturing || P.touches && P.touches.length > 1;
  }, l.onPress = function() {
    Y = !1;
    var P = T;
    T = Vo((It.visualViewport && It.visualViewport.scale || 1) / R), lt.pause(), P !== T && g0(p, T > 1.01 ? !0 : a ? !1 : "x"), St = M(), Mt = b(), $(), K = wu;
  }, l.onRelease = l.onGestureStart = function(P, I) {
    if (b.offset && G(), !I)
      et.restart(!0);
    else {
      te.cache++;
      var st = X(), A, Et;
      a && (A = M(), Et = A + st * 0.05 * -P.velocityX / 0.227, st *= __(M, A, Et, Cl(p, ti)), lt.vars.scrollX = D(Et)), A = b(), Et = A + st * 0.05 * -P.velocityY / 0.227, st *= __(b, A, Et, Cl(p, vn)), lt.vars.scrollY = Z(Et), lt.invalidate().duration(st).play(0.01), (Oa && lt.vars.scrollY >= g || A >= g - 1) && Ot.to({}, {
        onUpdate: F,
        duration: st
      });
    }
    h && h(P);
  }, l.onWheel = function() {
    lt._ts && lt.pause(), Ln() - V > 1e3 && (K = 0, V = Ln());
  }, l.onChange = function(P, I, st, A, Et) {
    if (wu !== K && $(), I && a && M(D(A[2] === I ? St + (P.startX - P.x) : M() + I - A[1])), st) {
      b.offset && G();
      var z = Et[2] === st, Nt = z ? Mt + P.startY - P.y : b() + st - Et[1], E = Z(Nt);
      z && Nt !== E && (Mt += E - Nt), b(E);
    }
    (st || I) && Wl();
  }, l.onEnable = function() {
    g0(p, a ? !1 : "x"), Pt.addEventListener("refresh", F), xn(It, "resize", F), b.smooth && (b.target.style.scrollBehavior = "auto", b.smooth = M.smooth = !1), Q.enable();
  }, l.onDisable = function() {
    g0(p, !0), En(It, "resize", F), Pt.removeEventListener("refresh", F), Q.kill();
  }, l.lockAxis = l.lockAxis !== !1, d = new un(l), d.iOS = Oa, Oa && !b() && b(1), Oa && Ot.ticker.add(Ol), et = d._dc, lt = Ot.to(d, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: a ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: $y(b, b(), function() {
        return lt.pause();
      })
    },
    onUpdate: Wl,
    onComplete: et.vars.onComplete
  }), d;
};
Pt.sort = function(f) {
  if (qn(f))
    return Wt.sort(f);
  var l = It.pageYOffset || 0;
  return Pt.getAll().forEach(function(u) {
    return u._sortY = u.trigger ? l + u.trigger.getBoundingClientRect().top : u.start + It.innerHeight;
  }), Wt.sort(f || function(u, a) {
    return (u.vars.refreshPriority || 0) * -1e6 + (u.vars.containerAnimation ? 1e6 : u._sortY) - ((a.vars.containerAnimation ? 1e6 : a._sortY) + (a.vars.refreshPriority || 0) * -1e6);
  });
};
Pt.observe = function(f) {
  return new un(f);
};
Pt.normalizeScroll = function(f) {
  if (typeof f > "u")
    return $n;
  if (f === !0 && $n)
    return $n.enable();
  if (f === !1) {
    $n && $n.kill(), $n = f;
    return;
  }
  var l = f instanceof un ? f : jE(f);
  return $n && $n.target === l.target && $n.kill(), Au(l.target) && ($n = l), l;
};
Pt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: N0,
  _inputObserver: Wy,
  _scrollers: te,
  _proxies: Dl,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ll || Ru("scrollStart"), ll = Ln();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Hn;
    }
  }
};
Xy() && Ot.registerPlugin(Pt);
const b_ = {
  dark: {
    surface: "#111111",
    border: "rgba(255, 255, 255, 0.08)",
    shadow: "0 24px 48px -24px rgba(0, 0, 0, 0.6)",
    light: "#ffffff",
    fill: 1,
    edge: 1
  },
  light: {
    surface: "#ffffff",
    border: "rgba(24, 24, 27, 0.1)",
    shadow: "0 1px 2px rgba(24, 24, 27, 0.04), 0 18px 40px -20px rgba(24, 24, 27, 0.16)",
    light: "#18181b",
    fill: 0.28,
    edge: 0.7
  }
}, QE = ["circle", "beam"], ZE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, Qo = (f, l, u) => Math.min(u, Math.max(l, f)), T_ = (f, l) => {
  const u = Qo(l, 0, 1), a = (1 - u) ** 1.5 * 0.85, o = (h, d) => `color-mix(in srgb, ${f} ${(h * 100).toFixed(2)}%, transparent) ${(d * 100).toFixed(2)}%`, c = [o(1, 0)];
  for (let h = 0; h <= 14; h++) {
    const d = a + (1 - a) * h / 14, g = (d - a) / (1 - a), p = 1 - g * g * (3 - 2 * g), v = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    c.push(o(p + (v - p) * u, d));
  }
  return c.join(", ");
}, KE = ({
  children: f,
  className: l = "",
  style: u,
  spotlightColor: a,
  intensity: o = 0.15,
  spotlightSize: c = 240,
  softness: h = 0.7,
  shape: d = "circle",
  borderGlow: g = 0.6,
  proximity: p = 80,
  smoothing: v = 0.3,
  ambient: _ = !1,
  flare: S = !0,
  grain: b = 0,
  theme: M = "dark",
  ...T
}) => {
  const R = se.useRef(null), V = se.useRef(null), X = se.useRef(null), K = se.useRef(null), Y = se.useRef(null), Q = b_[M] ?? b_.dark, k = a ?? Q.light, Z = {
    shape: QE.includes(d) ? d : "circle",
    fill: T_(k, h),
    edge: T_(k, 1),
    size: Math.max(20, c),
    intensity: Qo(o, 0, 1) * Q.fill,
    borderGlow: Qo(g, 0, 1) * Q.edge,
    proximity: Math.max(0, p),
    smoothing: Qo(v, 0, 1),
    ambient: _,
    flare: S,
    grain: Qo(b, 0, 1)
  }, $ = se.useRef(Z);
  return $.current = Z, se.useEffect(() => {
    Y.current?.();
  }), se.useEffect(() => {
    const G = R.current, ut = V.current, lt = X.current, St = K.current;
    if (!G || !ut || !lt || !St) return;
    const Mt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, et = { x: 0, y: 0, presence: 0, flare: 0, time: Math.random() * 60, pressed: !1, visible: !0 }, F = { x: 0, y: 0, active: !1 }, P = { light: "", edge: "", noise: "" };
    let I = null, st = 0, A = 0, Et = !0;
    const z = (vt, Ut, Yt, B, nt) => {
      if (vt.shape === "beam") {
        const pt = Math.max(Ut * 0.6, B + Ut * 0.55);
        return `radial-gradient(${(Ut * 0.55).toFixed(1)}px ${pt.toFixed(1)}px at ${Yt.toFixed(1)}px 0px, ${nt})`;
      }
      return `radial-gradient(circle ${Ut.toFixed(1)}px at ${Yt.toFixed(1)}px ${B.toFixed(1)}px, ${nt})`;
    }, Nt = (vt) => {
      const Ut = vt.size * (1 + 0.2 * et.flare), Yt = 1 + 0.7 * et.flare, B = z(vt, Ut, et.x, et.y, vt.fill), nt = z(vt, Ut * 0.6, et.x, vt.shape === "beam" ? 0 : et.y, vt.edge);
      B !== P.light && (P.light = B, ut.style.background = B), nt !== P.edge && (P.edge = nt, St.style.background = nt), ut.style.opacity = String(Math.min(1, et.presence * vt.intensity * Yt)), St.style.opacity = String(Math.min(1, et.presence * vt.borderGlow * Yt));
      const pt = vt.grain > 0 ? z(vt, Ut, et.x, et.y, "#000 0%, transparent 100%") : "none";
      pt !== P.noise && (P.noise = pt, lt.style.webkitMaskImage = pt, lt.style.maskImage = pt), lt.style.opacity = String(et.presence * vt.grain);
    }, E = (vt) => {
      if (st = 0, !Et) return;
      const Ut = $.current, Yt = Math.min(0.05, Math.max(1e-3, (vt - A) / 1e3));
      A = vt;
      const B = G.getBoundingClientRect();
      let nt = et.x, pt = et.y, dt = 0;
      if (I && G.contains(I)) {
        const ee = I.getBoundingClientRect();
        nt = ee.left + ee.width / 2 - B.left, pt = ee.top + ee.height / 2 - B.top, dt = 1;
      } else if (F.active) {
        nt = F.x - B.left, pt = F.y - B.top;
        const ee = Math.hypot(Math.max(0, -nt, nt - B.width), Math.max(0, -pt, pt - B.height));
        ee === 0 ? dt = 1 : Ut.proximity > 0 && (dt = Math.max(0, 1 - ee / Ut.proximity) ** 2);
      }
      if (dt < 0.6 && Ut.ambient && et.visible) {
        Mt || (et.time += Yt);
        const ee = 0.6 - dt;
        nt += (B.width * (0.5 + 0.34 * Math.sin(et.time * 0.43)) - nt) * (ee / 0.6), pt += (B.height * (0.5 + 0.3 * Math.sin(et.time * 0.61 + 1.3)) - pt) * (ee / 0.6), dt = 0.6;
      }
      et.presence < 0.02 && dt > 0 && !Ut.ambient && (et.x = nt, et.y = pt);
      const bt = Mt || Ut.smoothing === 0 ? 1 : 1 - Math.exp(-Yt / (0.015 + Ut.smoothing * 0.22));
      et.x += (nt - et.x) * bt, et.y += (pt - et.y) * bt;
      const jt = Mt ? 1 : 1 - Math.exp(-Yt / (dt > et.presence ? 0.1 : 0.32));
      et.presence += (dt - et.presence) * jt, Math.abs(dt - et.presence) < 2e-3 && (et.presence = dt);
      const kt = et.pressed && Ut.flare && !Mt ? 1 : 0;
      et.flare += (kt - et.flare) * (1 - Math.exp(-Yt / (kt ? 0.05 : 0.28))), Math.abs(kt - et.flare) < 2e-3 && (et.flare = kt), Nt(Ut), (!(!(Math.abs(nt - et.x) > 0.1 || Math.abs(pt - et.y) > 0.1) && et.presence === dt && et.flare === kt) || Ut.ambient && et.visible && !Mt) && (st = requestAnimationFrame(E));
    }, w = () => {
      st || !Et || (A = performance.now(), st = requestAnimationFrame(E));
    };
    Y.current = w;
    const J = (vt) => {
      F.x = vt.clientX, F.y = vt.clientY, F.active = !0, (et.presence > 0 || $.current.proximity > 0 || G.contains(vt.target)) && w();
    }, L = (vt) => {
      vt.relatedTarget || (F.active = !1, w());
    }, mt = (vt) => {
      F.x = vt.clientX, F.y = vt.clientY, F.active = !0, et.pressed = !0, w();
    }, ht = (vt) => {
      vt.pointerType !== "mouse" && (F.active = !1), !(!et.pressed && vt.pointerType === "mouse") && (et.pressed = !1, w());
    }, Rt = (vt) => {
      !(vt.target instanceof Element) || !vt.target.matches(":focus-visible") || (I = vt.target, w());
    }, ot = (vt) => {
      G.contains(vt.relatedTarget) || (I = null, w());
    }, gt = () => {
      (F.active || et.presence > 0) && w();
    }, zt = new IntersectionObserver((vt) => {
      et.visible = vt.some((Ut) => Ut.isIntersecting), et.visible && w();
    });
    return zt.observe(G), window.addEventListener("pointermove", J), window.addEventListener("pointerup", ht), window.addEventListener("pointercancel", ht), window.addEventListener("scroll", gt, { capture: !0, passive: !0 }), document.addEventListener("pointerout", L), G.addEventListener("pointerdown", mt), G.addEventListener("focusin", Rt), G.addEventListener("focusout", ot), w(), () => {
      Et = !1, cancelAnimationFrame(st), zt.disconnect(), window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", ht), window.removeEventListener("pointercancel", ht), window.removeEventListener("scroll", gt, { capture: !0 }), document.removeEventListener("pointerout", L), G.removeEventListener("pointerdown", mt), G.removeEventListener("focusin", Rt), G.removeEventListener("focusout", ot), Y.current = null;
    };
  }, []), /* @__PURE__ */ ae.jsxs(
    "div",
    {
      ref: R,
      className: `spotlight-card${l ? ` ${l}` : ""}`,
      style: {
        "--spotlight-card-surface": Q.surface,
        "--spotlight-card-border": Q.border,
        "--spotlight-card-shadow": Q.shadow,
        ...u
      },
      ...T,
      children: [
        /* @__PURE__ */ ae.jsx("span", { ref: V, className: "spotlight-card__light", "aria-hidden": "true" }),
        /* @__PURE__ */ ae.jsx("span", { ref: X, className: "spotlight-card__grain", style: { backgroundImage: ZE }, "aria-hidden": "true" }),
        f,
        /* @__PURE__ */ ae.jsx("span", { className: "spotlight-card__border", "aria-hidden": "true" }),
        /* @__PURE__ */ ae.jsx("span", { ref: K, className: "spotlight-card__edge", "aria-hidden": "true" })
      ]
    }
  );
}, p0 = { stiffness: 170, damping: 16, mass: 1 }, FE = (f, l, u) => {
  const a = Math.min(1, Math.max(0, (u - f) / (l - f)));
  return a * a * (3 - 2 * a);
}, uf = /* @__PURE__ */ new Set(), dl = { pointer: null, owner: null };
let Bo = null;
const Iy = (f, l) => {
  const u = l.x - (f.left + f.width / 2), a = l.y - (f.top + f.height / 2), o = Math.hypot(Math.max(0, Math.abs(u) - f.width / 2), Math.max(0, Math.abs(a) - f.height / 2));
  return { dx: u, dy: a, outside: o };
}, Zo = () => {
  let f = null, l = 1 / 0, u = 1 / 0;
  for (const o of uf) {
    const c = o.settings.current;
    let h = null;
    if (dl.pointer && !c.disabled && !o.reduce && (h = Iy(o.wrapper.getBoundingClientRect(), dl.pointer), h.outside > c.padding && (h = null)), !c.exclusive) {
      (h || o.active) && o.wake();
      continue;
    }
    if (!h) continue;
    const d = Math.hypot(h.dx, h.dy);
    (h.outside < l || h.outside === l && d < u) && (f = o, l = h.outside, u = d);
  }
  const a = dl.owner;
  dl.owner = f, a && a !== f && a.wake(), f && f.wake();
}, JE = () => {
  const f = (u) => {
    u.pointerType !== "touch" && (dl.pointer = { x: u.clientX, y: u.clientY }, Zo());
  }, l = () => {
    dl.pointer = null, Zo();
  };
  return window.addEventListener("pointermove", f, { passive: !0 }), window.addEventListener("scroll", Zo, { passive: !0, capture: !0 }), document.documentElement.addEventListener("pointerleave", l), window.addEventListener("blur", l), () => {
    window.removeEventListener("pointermove", f), window.removeEventListener("scroll", Zo, { capture: !0 }), document.documentElement.removeEventListener("pointerleave", l), window.removeEventListener("blur", l);
  };
}, gm = ({
  children: f,
  padding: l = 100,
  disabled: u = !1,
  magnetStrength: a = 2,
  maxOffset: o,
  exclusive: c = !0,
  axis: h = "both",
  tilt: d = 0,
  scale: g = 1,
  spring: p,
  onActiveChange: v,
  wrapperClassName: _ = "",
  innerClassName: S = "",
  style: b,
  ...M
}) => {
  const T = se.useRef(null), R = se.useRef(null), V = se.useRef(null), X = {
    padding: Math.max(0, l),
    disabled: u,
    strength: Math.max(0.1, a),
    maxOffset: o,
    exclusive: c,
    axis: h,
    tilt: d,
    scale: g,
    stiffness: Math.max(1, p?.stiffness ?? p0.stiffness),
    damping: Math.max(0, p?.damping ?? p0.damping),
    mass: Math.max(0.01, p?.mass ?? p0.mass),
    onActiveChange: v
  }, K = se.useRef(X);
  return K.current = X, se.useEffect(() => {
    const Y = T.current, Q = R.current;
    if (!Y || !Q) return;
    const k = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, D = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 }, Z = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 0 };
    let $ = !1, G = 0, ut = 0;
    const lt = (I, st) => {
      const A = K.current;
      let Et = !0;
      return Object.keys(D).forEach((z) => {
        const Nt = A.stiffness * (I[z] - D[z]) - A.damping * Z[z];
        Z[z] += Nt / A.mass * st, D[z] += Z[z] * st;
        const E = z === "scale" ? 1e-3 : 0.05;
        (Math.abs(I[z] - D[z]) > E || Math.abs(Z[z]) > E) && (Et = !1);
      }), Et;
    }, St = () => {
      const I = K.current, st = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
      if (I.disabled || k || !dl.pointer) return { target: st, engaged: !1 };
      if (I.exclusive && dl.owner !== P) return { target: st, engaged: !1 };
      const A = Y.getBoundingClientRect(), { dx: Et, dy: z, outside: Nt } = Iy(A, dl.pointer);
      if (Nt > I.padding) return { target: st, engaged: !1 };
      const E = I.padding > 0 ? 1 - FE(I.padding * 0.5, I.padding, Nt) : 1;
      let w = I.axis === "y" ? 0 : Et / I.strength * E, J = I.axis === "x" ? 0 : z / I.strength * E;
      if (I.maxOffset !== void 0 && I.maxOffset !== null) {
        const ht = Math.hypot(w, J);
        ht > I.maxOffset && (w *= I.maxOffset / ht, J *= I.maxOffset / ht);
      }
      const L = Math.max(-1, Math.min(1, Et / Math.max(A.width / 2, 1))), mt = Math.max(-1, Math.min(1, z / Math.max(A.height / 2, 1)));
      return st.x = w, st.y = J, st.tiltX = -mt * I.tilt * E, st.tiltY = L * I.tilt * E, st.scale = 1 + (I.scale - 1) * E, { target: st, engaged: !0 };
    }, Mt = () => {
      const { x: I, y: st, tiltX: A, tiltY: Et, scale: z } = D, Nt = Math.abs(A) > 0.01 || Math.abs(Et) > 0.01;
      Q.style.transform = `translate3d(${I.toFixed(2)}px, ${st.toFixed(2)}px, 0)${Nt ? ` perspective(800px) rotateX(${A.toFixed(2)}deg) rotateY(${Et.toFixed(2)}deg)` : ""}${Math.abs(z - 1) > 5e-4 ? ` scale(${z.toFixed(4)})` : ""}`;
    }, et = (I) => {
      G = 0;
      const st = ut ? Math.min((I - ut) / 1e3, 1 / 30) : 1 / 60;
      ut = I;
      const { target: A, engaged: Et } = St();
      Et !== $ && ($ = Et, P.active = Et, Et ? Y.setAttribute("data-magnet-active", "") : Y.removeAttribute("data-magnet-active"), K.current.onActiveChange?.(Et));
      const z = Math.ceil(st / (1 / 120));
      let Nt = !0;
      for (let E = 0; E < z; E++) Nt = lt(A, st / z);
      Nt && Object.keys(D).forEach((E) => {
        D[E] = A[E], Z[E] = 0;
      }), Mt(), Nt ? ut = 0 : G = requestAnimationFrame(et);
    };
    function F() {
      G || (G = requestAnimationFrame(et));
    }
    const P = { wrapper: Y, settings: K, reduce: k, wake: F, active: !1 };
    return uf.add(P), Bo || (Bo = JE()), V.current = () => {
      Zo(), F();
    }, () => {
      cancelAnimationFrame(G), V.current = null, uf.delete(P), dl.owner === P && (dl.owner = null), !uf.size && Bo && (Bo(), Bo = null);
    };
  }, []), se.useEffect(() => {
    V.current?.();
  }), /* @__PURE__ */ ae.jsx(
    "div",
    {
      ref: T,
      className: _,
      style: { position: "relative", display: "inline-block", ...b },
      ...M,
      children: /* @__PURE__ */ ae.jsx("div", { ref: R, className: S, style: { willChange: "transform" }, children: f })
    }
  );
}, kE = { circle: 0, square: 1, ring: 2, sparkle: 3 }, PE = { parallax: 0, repel: 1, attract: 2 }, $E = { none: 0, up: 1, down: 2, forward: 3 }, WE = 2e4, E_ = 900, x_ = 9e3, is = 4, Sf = 10, bf = 1 / Math.tan(7.5 * Math.PI / 180), tS = 0.1, yu = 100, IE = 1.8, v0 = 1.5, eS = 520, nS = 46, t3 = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec3 aPosition;
layout(location = 2) in vec4 aRandom;
layout(location = 3) in vec3 aColor;
uniform mat3 uRotation;
uniform vec3 uOffset;
uniform float uSpread;
uniform float uTime;
uniform float uCamera;
uniform float uAspect;
uniform vec2 uView;
uniform float uRatio;
uniform float uSize;
uniform float uRandomness;
uniform float uBlur;
uniform float uFocus;
uniform float uGlow;
uniform float uTwinkle;
uniform int uShape;
uniform int uDrift;
uniform float uTravel;
uniform vec4 uPointer;
uniform int uEffect;
uniform float uStrength;
uniform vec4 uBursts[${is}];
uniform int uBurstCount;
uniform float uReveal;
out vec2 vLocal;
out float vRadius;
out float vBlur;
out float vAlpha;
out float vHalo;
out float vSeed;
out vec3 vColor;

vec3 bob(vec4 r, float t) {
  return vec3(
    sin(t * r.z + 6.28 * r.w) * mix(0.1, 1.5, r.x),
    sin(t * r.y + 6.28 * r.x) * mix(0.1, 1.5, r.w),
    sin(t * r.w + 6.28 * r.y) * mix(0.1, 1.5, r.z)
  );
}

void main() {
  vec3 pos = aPosition * uSpread;
  pos.z *= ${Sf.toFixed(1)};
  vec3 wobble = bob(aRandom, uTime);
  vec3 world = uRotation * pos + uOffset + wobble;
  float edge = 1.0;
  if (uDrift == 1 || uDrift == 2) {
    float span = uSpread * 2.0 + 3.0;
    float k = mod(aRandom.w * span + uOffset.y + wobble.y + (uDrift == 1 ? uTravel : -uTravel), span);
    world.y = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.12, k) * smoothstep(span, span * 0.88, k);
  } else if (uDrift == 3) {
    float span = uSpread * ${Sf.toFixed(1)} * 2.0 + 3.0;
    float k = mod(aRandom.y * span + uOffset.z + wobble.z + uTravel, span);
    world.z = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.1, k);
  }
  vec3 view = world - vec3(0.0, 0.0, uCamera);
  float dist = length(view);
  float ahead = -view.z;
  if (ahead < ${tS.toFixed(2)} || ahead > ${yu.toFixed(1)}) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  edge *= smoothstep(1.0, 4.0, ahead);
  vec2 ndc = vec2(view.x * ${bf.toFixed(6)} / uAspect, view.y * ${bf.toFixed(6)}) / ahead;
  vec2 screen = (ndc * 0.5 + 0.5) * uView;

  vec2 shift = vec2(0.0);
  float flash = 0.0;
  if (uEffect != 0 && uPointer.z > 0.001) {
    vec2 delta = screen - uPointer.xy;
    float reach = length(delta);
    float falloff = exp(-dot(delta, delta) / (uPointer.w * uPointer.w));
    vec2 away = reach > 0.001 ? delta / reach : vec2(0.0);
    shift += (uEffect == 1 ? away * uPointer.w * 0.5 : -delta * 0.6) * falloff * uStrength * uPointer.z;
  }
  for (int i = 0; i < ${is}; i++) {
    if (i >= uBurstCount) break;
    vec4 burst = uBursts[i];
    vec2 delta = screen - burst.xy;
    float reach = length(delta);
    float wave = exp(-pow((reach - burst.z * ${eS.toFixed(1)}) / ${nS.toFixed(1)}, 2.0));
    vec2 away = reach > 0.001 ? delta / reach : vec2(0.0);
    float fade = (1.0 - burst.z) * (1.0 - burst.z) * burst.w;
    shift += away * wave * fade * 56.0 * smoothstep(0.0, 30.0, reach);
    flash += wave * fade;
  }
  screen += shift;

  float diameter = (uRandomness <= 0.0 ? uSize : uSize * (1.0 + uRandomness * (aRandom.x - 0.5)) / dist) * (1.0 + min(flash, 1.0) * 0.6);
  float device = diameter * uRatio;
  float radius = max(diameter, 1.0 / uRatio) * 0.5;
  float coverage = min(1.0, device * device);
  float blur = uBlur * max(uFocus - dist, 0.0) / max(dist, 1.0);
  float halo = uGlow > 0.0 ? radius * 2.5 + 2.0 : 0.0;
  float extent = radius * (uShape == 3 ? 1.6 : 1.0) + blur + halo + 1.5;

  float twinkle = 1.0 - uTwinkle * 0.6 * (0.5 + 0.5 * sin(uTime * (6.0 + aRandom.y * 14.0) + aRandom.w * 40.0));
  float far = smoothstep(${yu.toFixed(1)}, ${(yu * 0.9).toFixed(1)}, ahead);
  float focus = radius / (radius + blur);
  float reveal = clamp(uReveal * 1.6 - aRandom.z * 0.6, 0.0, 1.0);

  vLocal = aCorner * extent;
  vRadius = radius;
  vBlur = blur;
  vHalo = halo;
  vSeed = aRandom.y;
  vAlpha = min(1.0, coverage * twinkle * (1.0 + flash * 1.4)) * far * edge * max(focus, 0.35) * reveal * reveal;
  vColor = aColor;
  gl_Position = vec4((screen + aCorner * extent) / uView * 2.0 - 1.0, 0.0, 1.0);
}`, e3 = `#version 300 es
precision highp float;
precision highp int;
uniform int uShape;
uniform float uGlow;
uniform float uRatio;
uniform float uTime;
uniform float uSoft;
uniform float uShimmer;
uniform float uOpacity;
in vec2 vLocal;
in float vRadius;
in float vBlur;
in float vAlpha;
in float vHalo;
in float vSeed;
in vec3 vColor;
out vec4 outColor;

float ray(vec2 q, float aa) {
  float width = 0.14 * max(0.0, 1.0 - q.x);
  return (1.0 - smoothstep(width - aa, width + aa, q.y)) * step(q.x, 1.0);
}

void main() {
  float soft = vBlur + 0.7 / uRatio + vRadius * uSoft;
  float d = length(vLocal);
  float shape;
  if (uShape == 1) {
    float box = max(abs(vLocal.x), abs(vLocal.y));
    shape = 1.0 - smoothstep(vRadius * 0.86 - soft, vRadius * 0.86 + soft, box);
  } else if (uShape == 2) {
    float edge = max(vRadius * 0.22, 0.6 / uRatio);
    shape = 1.0 - smoothstep(edge - soft, edge + soft, abs(d - vRadius * 0.8));
  } else if (uShape == 3) {
    float reach = vRadius * 1.6;
    vec2 q = abs(vLocal) / max(reach, 0.0001);
    float aa = soft / max(reach, 0.0001);
    shape = max(max(ray(q, aa), ray(q.yx, aa)), 1.0 - smoothstep(vRadius * 0.32 - soft, vRadius * 0.32 + soft, d));
  } else {
    shape = 1.0 - smoothstep(vRadius - soft, vRadius + soft, d);
  }
  float halo = vHalo > 0.0 ? exp(-d / (vHalo * 0.35)) * uGlow * 0.4 : 0.0;
  float alpha = clamp(shape + halo * (1.0 - shape), 0.0, 1.0) * vAlpha * uOpacity * (1.0 - uSoft);
  if (alpha < 0.002) discard;
  vec2 uv = vLocal / max(vRadius * 2.0, 0.0001) + 0.5;
  vec3 color = clamp(vColor + uShimmer * 0.2 * sin(uv.yxx + uTime + vSeed * 6.28), 0.0, 1.0);
  outColor = vec4(color * alpha, alpha);
}`, n3 = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aCorner;
layout(location = 1) in vec4 aEnds;
layout(location = 2) in vec4 aTint;
uniform vec2 uView;
uniform float uRatio;
uniform float uWidth;
out float vAcross;
out float vHalf;
out vec4 vTint;

void main() {
  vec2 a = aEnds.xy;
  vec2 b = aEnds.zw;
  vec2 along = b - a;
  float span = max(length(along), 0.0001);
  vec2 normal = vec2(-along.y, along.x) / span;
  float reach = uWidth * 0.5 + 1.0 / uRatio;
  vec2 point = mix(a, b, aCorner.x * 0.5 + 0.5) + normal * aCorner.y * reach;
  vAcross = aCorner.y * reach;
  vHalf = uWidth * 0.5;
  vTint = aTint;
  gl_Position = vec4(point / uView * 2.0 - 1.0, 0.0, 1.0);
}`, i3 = `#version 300 es
precision highp float;
uniform float uRatio;
uniform float uOpacity;
in float vAcross;
in float vHalf;
in vec4 vTint;
out vec4 outColor;

void main() {
  float edge = 0.6 / uRatio;
  float cover = 1.0 - smoothstep(vHalf - edge, vHalf + edge, abs(vAcross));
  float alpha = cover * vTint.a * uOpacity;
  outColor = vec4(vTint.rgb * alpha, alpha);
}`, Ai = (f, l, u) => Math.min(u, Math.max(l, f)), M_ = (f, l, u) => {
  const a = f.createShader(l);
  return a ? (f.shaderSource(a, u), f.compileShader(a), f.getShaderParameter(a, f.COMPILE_STATUS) ? a : (f.deleteShader(a), null)) : null;
}, w_ = (f, l, u) => {
  const a = M_(f, f.VERTEX_SHADER, l), o = M_(f, f.FRAGMENT_SHADER, u), c = f.createProgram();
  if (!a || !o || !c) return null;
  if (f.attachShader(c, a), f.attachShader(c, o), f.linkProgram(c), f.deleteShader(a), f.deleteShader(o), !f.getProgramParameter(c, f.LINK_STATUS))
    return f.deleteProgram(c), null;
  const h = {}, d = f.getProgramParameter(c, f.ACTIVE_UNIFORMS);
  for (let g = 0; g < d; g++) {
    const p = f.getActiveUniform(c, g);
    p && (h[p.name.replace("[0]", "")] = f.getUniformLocation(c, p.name));
  }
  return { program: c, uniforms: h };
}, l3 = (f) => {
  let l = f >>> 0;
  return () => {
    l = l + 1831565813 >>> 0;
    let u = l;
    return u = Math.imul(u ^ u >>> 15, u | 1), u ^= u + Math.imul(u ^ u >>> 7, u | 61), ((u ^ u >>> 14) >>> 0) / 4294967296;
  };
}, a3 = (f) => 1 - Math.pow(1 - Ai(f, 0, 1), 3), A_ = (f, l) => (f % l + l) % l, u3 = ({
  particleCount: f = 200,
  particleSpread: l = 10,
  speed: u = 0.1,
  particleColors: a = ["#ffffff"],
  moveParticlesOnHover: o = !0,
  particleHoverFactor: c = 1,
  alphaParticles: h = !1,
  particleBaseSize: d = 100,
  sizeRandomness: g = 1,
  cameraDistance: p = 20,
  disableRotation: v = !1,
  pixelRatio: _,
  shape: S = "circle",
  glow: b = 0.5,
  twinkle: M = 0.3,
  depthOfField: T = 0,
  connections: R = !1,
  connectionDistance: V = 110,
  hoverEffect: X = "parallax",
  hoverRadius: K = 140,
  clickBurst: Y = !0,
  drift: Q = "none",
  driftSpeed: k = 1,
  variation: D = 0,
  intro: Z = !0,
  opacity: $ = 1,
  lightMode: G = !1,
  paused: ut = !1,
  className: lt = "",
  style: St
}) => {
  const Mt = se.useRef(null), et = se.useRef(null), F = se.useRef(null), P = (Array.isArray(a) ? a : [a]).filter(Boolean).map(String), I = {
    count: Ai(Math.round(f), 1, WE),
    spread: Math.max(0.1, l),
    speed: u,
    colors: P.length ? P : ["#ffffff"],
    mouse: o,
    hoverFactor: Math.max(0, c),
    soft: h,
    size: Math.max(0, d),
    randomness: Math.max(0, g),
    camera: Math.max(1, p),
    rotate: !v,
    dpr: _,
    shape: kE[S] ?? 0,
    glow: Math.max(0, b),
    twinkle: Ai(M, 0, 1),
    depthOfField: Math.max(0, T),
    connections: R,
    connectionDistance: Math.max(10, V),
    hoverEffect: PE[X] ?? 0,
    hoverRadius: Math.max(20, K),
    clickBurst: Y,
    drift: $E[Q] ?? 0,
    driftSpeed: k,
    variation: Math.max(0, Math.round(D)),
    intro: Z,
    opacity: Ai($, 0, 1),
    lightMode: G,
    paused: ut
  }, st = se.useRef(I);
  return st.current = I, se.useEffect(() => {
    const A = Mt.current, Et = et.current, z = Et?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!A || !Et || !z) return;
    const Nt = w_(z, t3, e3), E = w_(z, n3, i3);
    if (!Nt || !E) return;
    const w = z.createBuffer();
    z.bindBuffer(z.ARRAY_BUFFER, w), z.bufferData(z.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), z.STATIC_DRAW);
    const J = z.createBuffer(), L = z.createBuffer(), mt = z.createBuffer(), ht = z.createVertexArray();
    z.bindVertexArray(ht), z.bindBuffer(z.ARRAY_BUFFER, w), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0);
    const Rt = (ct, at, rt) => {
      z.bindBuffer(z.ARRAY_BUFFER, ct), z.enableVertexAttribArray(at), z.vertexAttribPointer(at, rt, z.FLOAT, !1, 0, 0), z.vertexAttribDivisor(at, 1);
    };
    Rt(J, 1, 3), Rt(L, 2, 4), Rt(mt, 3, 3);
    const ot = z.createBuffer(), gt = new Float32Array(x_ * 8), zt = z.createVertexArray();
    z.bindVertexArray(zt), z.bindBuffer(z.ARRAY_BUFFER, w), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferData(z.ARRAY_BUFFER, gt.byteLength, z.DYNAMIC_DRAW), z.enableVertexAttribArray(1), z.vertexAttribPointer(1, 4, z.FLOAT, !1, 32, 0), z.vertexAttribDivisor(1, 1), z.enableVertexAttribArray(2), z.vertexAttribPointer(2, 4, z.FLOAT, !1, 32, 16), z.vertexAttribDivisor(2, 1), z.bindVertexArray(null);
    const vt = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), Ut = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, Yt = /* @__PURE__ */ new Map(), B = (ct) => {
      if (Yt.has(ct)) return Yt.get(ct);
      let at = [1, 1, 1];
      if (vt) {
        vt.clearRect(0, 0, 1, 1), vt.fillStyle = "#ffffff", vt.fillStyle = ct, vt.fillRect(0, 0, 1, 1);
        const [rt, Tt, it] = vt.getImageData(0, 0, 1, 1).data;
        at = [rt / 255, Tt / 255, it / 255];
      }
      return Yt.set(ct, at), at;
    }, nt = (ct) => {
      const at = ct.map((it) => Math.pow(it, 2.2)), rt = 0.2126 * at[0] + 0.7152 * at[1] + 0.0722 * at[2], Tt = Math.min(1, 0.06 / Math.max(rt, 1e-4));
      return at.map((it) => Math.pow(it * Tt, 1 / 2.2));
    }, pt = { width: 1, height: 1, ratio: 1 }, dt = { x: 0, y: 0, sx: 0, sy: 0, nx: 0, ny: 0, inside: !1, active: 0 }, bt = {
      clock: 0,
      spin: 0,
      travel: 0,
      offsetX: 0,
      offsetY: 0,
      reveal: st.current.intro && !Ut ? 0 : 1
    }, jt = [], kt = new Float32Array(is * 4), Ht = {
      key: "",
      count: 0,
      positions: new Float32Array(0),
      randoms: new Float32Array(0),
      colors: new Float32Array(0)
    }, Ct = {
      x: new Float32Array(0),
      y: new Float32Array(0),
      ahead: new Float32Array(0),
      alpha: new Float32Array(0)
    };
    let ee = 0, ue = 0, Fe = !0;
    const Re = (ct) => {
      const at = `${ct.count}|${ct.variation}|${ct.colors.join(",")}|${ct.lightMode ? 1 : 0}`;
      if (at === Ht.key) return;
      Ht.key = at;
      const rt = l3(ct.variation * 7919 + 1), Tt = ct.count, it = new Float32Array(Tt * 3), ft = new Float32Array(Tt * 4), yt = new Float32Array(Tt * 3), xt = ct.colors.map((At) => ct.lightMode ? nt(B(At)) : B(At));
      for (let At = 0; At < Tt; At++) {
        let Vt, ne, Xt, Qt;
        do
          Vt = rt() * 2 - 1, ne = rt() * 2 - 1, Xt = rt() * 2 - 1, Qt = Vt * Vt + ne * ne + Xt * Xt;
        while (Qt > 1 || Qt === 0);
        const Kt = Math.cbrt(rt());
        it.set([Vt * Kt, ne * Kt, Xt * Kt], At * 3), ft.set([rt(), rt(), rt(), rt()], At * 4), yt.set(xt[Math.floor(rt() * xt.length)], At * 3);
      }
      Ht.count = Tt, Ht.positions = it, Ht.randoms = ft, Ht.colors = yt;
      const Lt = Math.min(Tt, E_);
      Ct.x = new Float32Array(Lt), Ct.y = new Float32Array(Lt), Ct.ahead = new Float32Array(Lt), Ct.alpha = new Float32Array(Lt), z.bindBuffer(z.ARRAY_BUFFER, J), z.bufferData(z.ARRAY_BUFFER, it, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, L), z.bufferData(z.ARRAY_BUFFER, ft, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, mt), z.bufferData(z.ARRAY_BUFFER, yt, z.STATIC_DRAW);
    }, _n = (ct) => {
      const at = bt.clock * 1e3, rt = ct.rotate ? Math.sin(at * 2e-4) * 0.1 : 0, Tt = ct.rotate ? Math.cos(at * 5e-4) * 0.15 : 0, it = ct.rotate ? bt.spin : 0, [ft, yt, xt, Lt, At, Vt] = [Math.sin(rt), Math.cos(rt), Math.sin(Tt), Math.cos(Tt), Math.sin(it), Math.cos(it)];
      return [
        Lt * Vt + xt * ft * At,
        yt * At,
        -xt * Vt + Lt * ft * At,
        -Lt * At + xt * ft * Vt,
        yt * Vt,
        xt * At + Lt * ft * Vt,
        xt * yt,
        -ft,
        Lt * yt
      ];
    }, Vn = () => [bt.offsetX, bt.offsetY, -(1 - a3(bt.reveal)) * 70], xe = (ct, at) => {
      const rt = Math.min(Ht.count, E_), [Tt, it, ft] = Vn(), yt = pt.width / pt.height, xt = bt.clock, Lt = ct.hoverRadius, At = ct.hoverEffect !== 0 ? dt.active : 0, Vt = ct.spread * 2 + 3, ne = ct.spread * Sf * 2 + 3;
      for (let Xt = 0; Xt < rt; Xt++) {
        const Qt = Ht.positions[Xt * 3] * ct.spread, Kt = Ht.positions[Xt * 3 + 1] * ct.spread, Me = Ht.positions[Xt * 3 + 2] * ct.spread * Sf, he = Ht.randoms[Xt * 4], Le = Ht.randoms[Xt * 4 + 1], Ve = Ht.randoms[Xt * 4 + 2], we = Ht.randoms[Xt * 4 + 3], Ne = Math.sin(xt * Ve + 6.28 * we) * (0.1 + 1.4 * he), me = Math.sin(xt * Le + 6.28 * he) * (0.1 + 1.4 * we), vi = Math.sin(xt * we + 6.28 * Le) * (0.1 + 1.4 * Ve), ml = at[0] * Qt + at[3] * Kt + at[6] * Me + Tt + Ne;
        let Ge = at[1] * Qt + at[4] * Kt + at[7] * Me + it + me, Ue = at[2] * Qt + at[5] * Kt + at[8] * Me + ft + vi, yn = 1;
        if (ct.drift === 1 || ct.drift === 2) {
          const ke = A_(we * Vt + it + me + (ct.drift === 1 ? bt.travel : -bt.travel), Vt);
          Ge = ke - Vt / 2;
          const Pe = Ai(ke / (Vt * 0.12), 0, 1), jn = Ai((Vt - ke) / (Vt * 0.12), 0, 1);
          yn = Pe * Pe * (3 - 2 * Pe) * jn * jn * (3 - 2 * jn);
        } else if (ct.drift === 3) {
          const ke = A_(Le * ne + ft + vi + bt.travel, ne);
          Ue = ke - ne / 2;
          const Pe = Ai(ke / (ne * 0.1), 0, 1);
          yn = Pe * Pe * (3 - 2 * Pe);
        }
        const en = ct.camera - Ue;
        if (en < tS || en > yu) {
          Ct.alpha[Xt] = 0;
          continue;
        }
        const Ye = Ai((en - 1) / 3, 0, 1);
        yn *= Ye * Ye * (3 - 2 * Ye);
        let Be = ml * bf / yt / en * 0.5 * pt.width + pt.width / 2, Je = Ge * bf / en * 0.5 * pt.height + pt.height / 2, _i = 0, al = 0;
        if (At > 1e-3) {
          const ke = Be - dt.sx, Pe = Je - dt.sy, jn = Math.hypot(ke, Pe), Qn = Math.exp(-(ke * ke + Pe * Pe) / (Lt * Lt)) * ct.hoverFactor * At;
          ct.hoverEffect === 1 && jn > 1e-3 ? (_i += ke / jn * Lt * 0.5 * Qn, al += Pe / jn * Lt * 0.5 * Qn) : ct.hoverEffect === 2 && (_i -= ke * 0.6 * Qn, al -= Pe * 0.6 * Qn);
        }
        for (const ke of jt) {
          const Pe = ke.age / v0, jn = Be - ke.x, Qn = Je - ke.y, ji = Math.hypot(jn, Qn);
          if (ji < 1e-3) continue;
          const Qa = Math.exp(-Math.pow((ji - Pe * eS) / nS, 2)), gl = Ai(ji / 30, 0, 1), nn = Qa * (1 - Pe) * (1 - Pe) * 56 * gl * gl * (3 - 2 * gl);
          _i += jn / ji * nn, al += Qn / ji * nn;
        }
        Be += _i, Je += al;
        const ii = Ai((yu - en) / (yu - yu * 0.9), 0, 1), Xr = Ai(bt.reveal * 1.6 - Ve * 0.6, 0, 1);
        Ct.x[Xt] = Be, Ct.y[Xt] = Je, Ct.ahead[Xt] = en, Ct.alpha[Xt] = ii * ii * (3 - 2 * ii) * yn * Xr * Xr;
      }
      return rt;
    }, Yi = (ct, at) => {
      const rt = xe(ct, at), Tt = ct.connectionDistance, it = Math.max(1, Math.ceil(pt.width / Tt) + 2), ft = /* @__PURE__ */ new Map();
      for (let Lt = 0; Lt < rt; Lt++) {
        if (Ct.alpha[Lt] < 0.02) continue;
        const At = (Math.floor(Ct.y[Lt] / Tt) + 1) * it + Math.floor(Ct.x[Lt] / Tt) + 1, Vt = ft.get(At);
        Vt ? Vt.push(Lt) : ft.set(At, [Lt]);
      }
      let yt = 0;
      const xt = Tt * Tt;
      for (const [Lt, At] of ft)
        for (const Vt of [0, 1, it - 1, it, it + 1]) {
          const ne = Vt === 0 ? At : ft.get(Lt + Vt);
          if (ne)
            for (let Xt = 0; Xt < At.length; Xt++) {
              const Qt = At[Xt];
              for (let Kt = Vt === 0 ? Xt + 1 : 0; Kt < ne.length; Kt++) {
                const Me = ne[Kt], he = Ct.x[Qt] - Ct.x[Me], Le = Ct.y[Qt] - Ct.y[Me], Ve = he * he + Le * Le;
                if (Ve > xt) continue;
                const we = Ai(1 - Math.abs(Ct.ahead[Qt] - Ct.ahead[Me]) / 18, 0, 1);
                if (we <= 0) continue;
                if (yt >= x_) return yt;
                const Ne = 1 - Math.sqrt(Ve) / Tt, me = yt * 8;
                gt[me] = Ct.x[Qt], gt[me + 1] = Ct.y[Qt], gt[me + 2] = Ct.x[Me], gt[me + 3] = Ct.y[Me], gt[me + 4] = (Ht.colors[Qt * 3] + Ht.colors[Me * 3]) / 2, gt[me + 5] = (Ht.colors[Qt * 3 + 1] + Ht.colors[Me * 3 + 1]) / 2, gt[me + 6] = (Ht.colors[Qt * 3 + 2] + Ht.colors[Me * 3 + 2]) / 2, gt[me + 7] = Ne * Ne * we * 0.7 * Math.min(Ct.alpha[Qt], Ct.alpha[Me]), yt++;
              }
            }
        }
      return yt;
    }, He = () => {
      const ct = st.current;
      Re(ct);
      const at = _n(ct), [rt, Tt, it] = Vn();
      if (z.viewport(0, 0, Et.width, Et.height), z.clearColor(0, 0, 0, 0), z.clear(z.COLOR_BUFFER_BIT), z.enable(z.BLEND), z.blendFunc(z.ONE, z.ONE_MINUS_SRC_ALPHA), ct.connections) {
        const xt = Yi(ct, at);
        xt && (z.useProgram(E.program), z.bindVertexArray(zt), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferSubData(z.ARRAY_BUFFER, 0, gt.subarray(0, xt * 8)), z.uniform2f(E.uniforms.uView, pt.width, pt.height), z.uniform1f(E.uniforms.uRatio, pt.ratio), z.uniform1f(E.uniforms.uWidth, 1), z.uniform1f(E.uniforms.uOpacity, ct.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, xt));
      }
      const ft = Nt.uniforms;
      let yt = 0;
      for (let xt = jt.length - 1; xt >= 0 && yt < is; xt--)
        kt.set([jt[xt].x, jt[xt].y, jt[xt].age / v0, 1], yt * 4), yt++;
      z.useProgram(Nt.program), z.bindVertexArray(ht), z.uniformMatrix3fv(ft.uRotation, !1, at), z.uniform3f(ft.uOffset, rt, Tt, it), z.uniform1f(ft.uSpread, ct.spread), z.uniform1f(ft.uTime, bt.clock), z.uniform1f(ft.uCamera, ct.camera), z.uniform1f(ft.uAspect, pt.width / pt.height), z.uniform2f(ft.uView, pt.width, pt.height), z.uniform1f(ft.uRatio, pt.ratio), z.uniform1f(ft.uSize, ct.size), z.uniform1f(ft.uRandomness, ct.randomness), z.uniform1f(ft.uBlur, ct.depthOfField * 14), z.uniform1f(ft.uFocus, ct.camera + 14), z.uniform1f(ft.uGlow, ct.lightMode ? ct.glow * 0.3 : ct.glow), z.uniform1f(ft.uTwinkle, ct.twinkle), z.uniform1i(ft.uShape, ct.shape), z.uniform1i(ft.uDrift, ct.drift), z.uniform1f(ft.uTravel, bt.travel), z.uniform4f(ft.uPointer, dt.sx, dt.sy, dt.active, ct.hoverRadius), z.uniform1i(ft.uEffect, ct.hoverEffect), z.uniform1f(ft.uStrength, ct.hoverFactor), z.uniform4fv(ft.uBursts, kt), z.uniform1i(ft.uBurstCount, yt), z.uniform1f(ft.uReveal, bt.reveal), z.uniform1f(ft.uSoft, ct.soft ? 0.2 : 0), z.uniform1f(ft.uShimmer, ct.lightMode ? 0 : 1), z.uniform1f(ft.uOpacity, ct.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, Ht.count), z.bindVertexArray(null);
    }, Gn = (ct) => {
      if (ee = 0, !Fe || document.hidden) return;
      const at = st.current, rt = ue ? Ai((ct - ue) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (ue = ct, at.paused) {
        bt.reveal = 1, He(), ue = 0;
        return;
      }
      const Tt = Ut ? 0 : 1, it = rt * at.speed * Tt;
      bt.clock += it, at.rotate && (bt.spin += it * 0.6), bt.travel += rt * at.driftSpeed * Tt * (at.drift === 3 ? 6 : 0.9);
      const ft = at.mouse && dt.inside && !Ut, yt = 1 - Math.exp(-rt / 0.35), xt = ft && at.hoverEffect === 0 ? at.hoverFactor : 0;
      bt.offsetX += (-dt.nx * xt - bt.offsetX) * yt, bt.offsetY += (-dt.ny * xt - bt.offsetY) * yt, dt.sx += (dt.x - dt.sx) * (1 - Math.exp(-rt / 0.06)), dt.sy += (dt.y - dt.sy) * (1 - Math.exp(-rt / 0.06)), dt.active += ((ft ? 1 : 0) - dt.active) * (1 - Math.exp(-rt / 0.2));
      for (let Lt = jt.length - 1; Lt >= 0; Lt--)
        jt[Lt].age += rt, jt[Lt].age >= v0 && jt.splice(Lt, 1);
      !at.intro || Ut ? bt.reveal = 1 : bt.reveal < 1 && (bt.reveal = Math.min(1, bt.reveal + rt / IE)), He(), ee = requestAnimationFrame(Gn);
    }, tn = () => {
      !ee && Fe && !document.hidden && (ee = requestAnimationFrame(Gn));
    }, ei = () => {
      const ct = st.current, at = Math.max(1, A.clientWidth), rt = Math.max(1, A.clientHeight), Tt = Math.min(ct.dpr || window.devicePixelRatio || 1, 2);
      pt.width = at, pt.height = rt, Et.width = Math.max(1, Math.round(at * Tt)), Et.height = Math.max(1, Math.round(rt * Tt)), pt.ratio = Et.width / at, He(), tn();
    }, qi = (ct) => {
      const at = A.getBoundingClientRect(), rt = ct.clientX - at.left, Tt = ct.clientY - at.top, it = dt.inside;
      dt.inside = rt >= 0 && Tt >= 0 && rt <= at.width && Tt <= at.height, dt.x = rt, dt.y = at.height - Tt, dt.nx = rt / Math.max(1, at.width) * 2 - 1, dt.ny = -(Tt / Math.max(1, at.height) * 2 - 1), dt.inside && !it && (dt.sx = dt.x, dt.sy = dt.y);
    }, qt = (ct) => {
      qi(ct), st.current.paused || tn();
    }, Xi = (ct) => {
      const at = st.current;
      qi(ct), !(!dt.inside || !at.clickBurst || at.paused || Ut) && (jt.push({ x: dt.x, y: dt.y, age: 0 }), jt.length > is && jt.shift(), tn());
    }, dn = (ct) => {
      ct.pointerType !== "mouse" && (dt.inside = !1);
    }, wn = () => {
      dt.inside = !1;
    }, mn = () => {
      ue = 0, tn();
    }, Vi = new ResizeObserver(ei);
    Vi.observe(A);
    const Gi = new IntersectionObserver((ct) => {
      Fe = ct.some((at) => at.isIntersecting), Fe && (ue = 0, tn());
    });
    Gi.observe(A), window.addEventListener("pointermove", qt, { passive: !0 }), window.addEventListener("pointerdown", Xi, { passive: !0 }), window.addEventListener("pointerup", dn, { passive: !0 }), window.addEventListener("pointercancel", dn, { passive: !0 }), document.documentElement.addEventListener("pointerleave", wn), document.addEventListener("visibilitychange", mn), ei();
    let ni = st.current.dpr;
    return F.current = () => {
      const ct = st.current;
      if (ct.dpr !== ni) {
        ni = ct.dpr, ei();
        return;
      }
      ee || He(), tn();
    }, () => {
      cancelAnimationFrame(ee), F.current = null, Vi.disconnect(), Gi.disconnect(), window.removeEventListener("pointermove", qt), window.removeEventListener("pointerdown", Xi), window.removeEventListener("pointerup", dn), window.removeEventListener("pointercancel", dn), document.documentElement.removeEventListener("pointerleave", wn), document.removeEventListener("visibilitychange", mn), z.deleteProgram(Nt.program), z.deleteProgram(E.program), [w, J, L, mt, ot].forEach((ct) => z.deleteBuffer(ct)), z.deleteVertexArray(ht), z.deleteVertexArray(zt), Et.isConnected || z.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), se.useEffect(() => {
    F.current?.();
  }), /* @__PURE__ */ ae.jsx("div", { ref: Mt, className: `particles-container${lt ? ` ${lt}` : ""}`, style: St, children: /* @__PURE__ */ ae.jsx("canvas", { ref: et, className: "particles-canvas", "aria-hidden": "true" }) });
}, V0 = 5, iS = 3, r3 = 2.4, o3 = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`, s3 = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[${V0}];
uniform int uStopCount;
uniform float uAmplitude;
uniform float uBlend;
uniform float uHeight;
uniform float uScale;
uniform float uGlow;
uniform float uBrightness;
uniform int uLayers;
uniform float uFlip;
uniform vec3 uPointer;
uniform float uReveal;
uniform float uOpacity;
uniform float uLightMode;
out vec4 outColor;

vec3 permute(vec3 x) {
  return mod(((x * 34.0) + 1.0) * x, 289.0);
}

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float smootherstep(float edge0, float edge1, float x) {
  float t = clamp((x - edge0) / (edge1 - edge0), 0.0, 1.0);
  return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);
}

vec3 oklabToLinear(vec3 c) {
  float l = c.x + 0.3963377774 * c.y + 0.2158037573 * c.z;
  float m = c.x - 0.1055613458 * c.y - 0.0638541728 * c.z;
  float s = c.x - 0.0894841775 * c.y - 1.2914855480 * c.z;
  l = l * l * l;
  m = m * m * m;
  s = s * s * s;
  return vec3(
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s
  );
}

vec3 toSrgb(vec3 c) {
  c = clamp(c, 0.0, 1.0);
  return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
}

vec3 ramp(float t) {
  float x = clamp(t, 0.0, 1.0) * float(uStopCount - 1);
  int i = int(min(floor(x), float(uStopCount - 2)));
  float f = x - float(i);
  f = f * f * (3.0 - 2.0 * f);
  vec3 lch = mix(uStops[i], uStops[i + 1], f);
  lch.x = mix(lch.x, min(lch.x, 0.7), uLightMode);
  return toSrgb(oklabToLinear(vec3(lch.x, lch.y * cos(lch.z), lch.y * sin(lch.z))));
}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  float y = 1.0 - frag.y / uResolution.y;
  y = mix(y, 1.0 - y, uFlip);
  float u = frag.x / uResolution.x;
  float X = (frag.x - uResolution.x * 0.5) / uResolution.y;
  float t = uTime;
  float reach = uPointer.z * exp(-pow((X - uPointer.x) / 0.38, 2.0));

  vec3 glow = vec3(0.0);
  float cover = 0.0;
  for (int k = 0; k < ${iS}; k++) {
    if (k >= uLayers) break;
    float layer = float(k);
    float seed = layer * 13.7;
    float pace = t * (1.0 - layer * 0.18);
    float warp = snoise(vec2(X * 0.45 * uScale + pace * 0.02 + seed, pace * 0.05 + seed));
    float wave = snoise(vec2(X * 0.75 * uScale + warp * 0.35 - pace * 0.03 + seed, pace * 0.07 - seed)) * 0.72
      + snoise(vec2(X * 1.6 * uScale + warp * 0.5 + pace * 0.04 - seed, pace * 0.1 + seed * 0.5)) * 0.28;
    float hem = uHeight + layer * 0.07 + wave * 0.15 * uAmplitude;
    hem += reach * 0.08 * (layer < 0.5 ? 1.0 : 0.4);
    hem = mix(-0.25, hem, uReveal);

    float soft = (0.04 + uBlend * 0.16) * (1.0 + layer * 0.9);
    float rise = hem - y;
    float low = -soft - uGlow * 0.14;
    float high = 0.26 + soft * 0.6;
    float body = pow(smootherstep(low, high, rise), 1.5 + uGlow * 0.6);
    float lobes = 0.86 + 0.14 * snoise(vec2(X * 0.9 * uScale - pace * 0.025 + seed, y * 0.3 + pace * 0.04));
    float alpha = body * lobes * (layer < 0.5 ? 1.0 : 0.32 / layer);
    alpha = clamp(alpha * (1.0 + reach * 0.25 * smootherstep(0.9, 0.0, abs(y - hem))), 0.0, 1.0);

    vec3 tint = ramp(u + 0.05 * sin(pace * 0.08 + layer * 2.3) + layer * 0.1 + max(rise, 0.0) * 0.05);
    glow = 1.0 - (1.0 - glow) * (1.0 - tint * alpha);
    cover = 1.0 - (1.0 - cover) * (1.0 - alpha);
  }

  float fade = smootherstep(0.0, 0.7, uReveal) * uOpacity;
  float strength = clamp(uBrightness, 0.0, 2.0);
  glow *= fade * min(strength, 1.0);
  cover *= fade * min(strength, 1.0);
  glow = 1.0 - pow(1.0 - glow, vec3(max(strength, 1.0)));
  float dither = (hash(frag) - 0.5) / 255.0;

  if (uLightMode > 0.5) {
    vec3 tint = cover > 0.0001 ? glow / cover : vec3(0.0);
    cover *= smootherstep(0.0, 0.25, cover);
    float alpha = cover * 0.7;
    outColor = vec4(tint * alpha + dither, clamp(alpha + dither, 0.0, 1.0));
    return;
  }
  outColor = vec4(glow + dither, clamp(cover + dither, 0.0, 1.0));
}`, Ho = (f, l, u) => Math.min(u, Math.max(l, f)), c3 = (f) => {
  const [l, u, a] = f.map((g) => g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)), o = Math.cbrt(0.4122214708 * l + 0.5363325363 * u + 0.0514459929 * a), c = Math.cbrt(0.2119034982 * l + 0.6806995451 * u + 0.1073969566 * a), h = Math.cbrt(0.0883024619 * l + 0.2817188376 * u + 0.6299787005 * a), d = [
    0.2104542553 * o + 0.793617785 * c - 0.0040720468 * h,
    1.9779984951 * o - 2.428592205 * c + 0.4505937099 * h,
    0.0259040371 * o + 0.7827717662 * c - 0.808675766 * h
  ];
  return [d[0], Math.hypot(d[1], d[2]), Math.atan2(d[2], d[1])];
}, f3 = (f) => {
  const l = f.findIndex((o) => o[1] > 0.02);
  let a = l === -1 ? 0 : f[l][2];
  return f.map((o) => {
    let c = o[1] > 0.02 ? o[2] : a;
    for (; c - a > Math.PI; ) c -= Math.PI * 2;
    for (; c - a < -Math.PI; ) c += Math.PI * 2;
    return a = c, [o[0], o[1], c];
  });
}, O_ = (f, l, u) => {
  const a = f.createShader(l);
  return a ? (f.shaderSource(a, u), f.compileShader(a), f.getShaderParameter(a, f.COMPILE_STATUS) ? a : (f.deleteShader(a), null)) : null;
}, h3 = (f) => {
  const l = O_(f, f.VERTEX_SHADER, o3), u = O_(f, f.FRAGMENT_SHADER, s3), a = f.createProgram();
  if (!l || !u || !a) return null;
  if (f.attachShader(a, l), f.attachShader(a, u), f.bindAttribLocation(a, 0, "aPosition"), f.linkProgram(a), f.deleteShader(l), f.deleteShader(u), !f.getProgramParameter(a, f.LINK_STATUS))
    return f.deleteProgram(a), null;
  const o = {}, c = f.getProgramParameter(a, f.ACTIVE_UNIFORMS);
  for (let h = 0; h < c; h++) {
    const d = f.getActiveUniform(a, h);
    d && (o[d.name.replace("[0]", "")] = f.getUniformLocation(a, d.name));
  }
  return { program: a, uniforms: o };
}, d3 = ({
  colorStops: f = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude: l = 1,
  blend: u = 0.5,
  speed: a = 1,
  time: o,
  height: c = 0.45,
  scale: h = 1,
  glow: d = 0.6,
  brightness: g = 1,
  layers: p = 1,
  direction: v = "top",
  mouseInteraction: _ = !0,
  intro: S = !0,
  opacity: b = 1,
  lightMode: M = !1,
  paused: T = !1,
  dpr: R,
  className: V = "",
  style: X
}) => {
  const K = se.useRef(null), Y = se.useRef(null), Q = se.useRef(null), k = (Array.isArray(f) ? f : []).filter(Boolean).map(String).slice(0, V0), D = {
    stops: k.length >= 2 ? k : k.length === 1 ? [k[0], k[0]] : ["#5227FF", "#7cff67"],
    amplitude: Math.max(0, l),
    blend: Ho(u, 0, 1),
    speed: a,
    time: o,
    height: Ho(c, 0, 1),
    scale: Math.max(0.1, h),
    glow: Math.max(0, d),
    brightness: Math.max(0, g),
    layers: Ho(Math.round(p), 1, iS),
    flip: v === "bottom" ? 1 : 0,
    mouseInteraction: _,
    intro: S,
    opacity: Ho(b, 0, 1),
    lightMode: M,
    paused: T,
    dpr: R
  }, Z = se.useRef(D);
  return Z.current = D, se.useEffect(() => {
    const $ = K.current, G = Y.current, ut = G?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!$ || !G || !ut) return;
    const lt = h3(ut);
    if (!lt) return;
    const St = lt.uniforms, Mt = ut.createBuffer(), et = ut.createVertexArray();
    ut.bindVertexArray(et), ut.bindBuffer(ut.ARRAY_BUFFER, Mt), ut.bufferData(ut.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ut.STATIC_DRAW), ut.enableVertexAttribArray(0), ut.vertexAttribPointer(0, 2, ut.FLOAT, !1, 0, 0);
    const F = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), P = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, I = /* @__PURE__ */ new Map(), st = (nt) => {
      if (I.has(nt)) return I.get(nt);
      let pt = [1, 1, 1];
      if (F) {
        F.clearRect(0, 0, 1, 1), F.fillStyle = "#ffffff", F.fillStyle = nt, F.fillRect(0, 0, 1, 1);
        const [dt, bt, jt] = F.getImageData(0, 0, 1, 1).data;
        pt = [dt / 255, bt / 255, jt / 255];
      }
      return I.set(nt, pt), pt;
    }, A = new Float32Array(V0 * 3), Et = { width: 1, height: 1 }, z = { x: 0, y: 0, inside: !1 }, Nt = {
      clock: 0,
      px: 0,
      py: 0.5,
      reach: 0,
      reveal: Z.current.intro && !P ? 0 : 1
    };
    let E = 0, w = 0, J = !0;
    const L = () => {
      const nt = Z.current;
      f3(nt.stops.map((dt) => c3(st(dt)))).forEach((dt, bt) => A.set(dt, bt * 3));
      const pt = Nt.reveal;
      ut.viewport(0, 0, G.width, G.height), ut.useProgram(lt.program), ut.bindVertexArray(et), ut.uniform2f(St.uResolution, G.width, G.height), ut.uniform1f(St.uTime, nt.time !== void 0 ? nt.time * nt.speed * 0.1 : Nt.clock), ut.uniform3fv(St.uStops, A), ut.uniform1i(St.uStopCount, nt.stops.length), ut.uniform1f(St.uAmplitude, nt.amplitude), ut.uniform1f(St.uBlend, nt.blend), ut.uniform1f(St.uHeight, nt.height), ut.uniform1f(St.uScale, nt.scale), ut.uniform1f(St.uGlow, nt.glow), ut.uniform1f(St.uBrightness, nt.brightness), ut.uniform1i(St.uLayers, nt.layers), ut.uniform1f(St.uFlip, nt.flip), ut.uniform3f(St.uPointer, Nt.px, Nt.py, Nt.reach), ut.uniform1f(St.uReveal, 1 - Math.pow(1 - pt, 3)), ut.uniform1f(St.uOpacity, nt.opacity), ut.uniform1f(St.uLightMode, nt.lightMode ? 1 : 0), ut.drawArrays(ut.TRIANGLES, 0, 3);
    }, mt = (nt) => {
      if (E = 0, !J || document.hidden) return;
      const pt = Z.current, dt = w ? Ho((nt - w) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (w = nt, pt.paused) {
        Nt.reveal = 1, L(), w = 0;
        return;
      }
      const bt = P ? 0 : 1;
      Nt.clock += dt * pt.speed * bt;
      const jt = pt.mouseInteraction && z.inside && !P, kt = 1 - Math.exp(-dt / 0.6);
      if (jt) {
        const Ht = (z.x - Et.width / 2) / Et.height, Ct = pt.flip ? 1 - z.y / Et.height : z.y / Et.height;
        Nt.px += (Ht - Nt.px) * kt, Nt.py += (Ct - Nt.py) * kt;
      }
      Nt.reach += ((jt ? 1 : 0) - Nt.reach) * (1 - Math.exp(-dt / (jt ? 0.9 : 1.4))), !pt.intro || P ? Nt.reveal = 1 : Nt.reveal < 1 && (Nt.reveal = Math.min(1, Nt.reveal + dt / r3)), L(), E = requestAnimationFrame(mt);
    }, ht = () => {
      !E && J && !document.hidden && (E = requestAnimationFrame(mt));
    }, Rt = () => {
      const nt = Z.current, pt = Math.max(1, $.clientWidth), dt = Math.max(1, $.clientHeight), bt = Math.min(nt.dpr || window.devicePixelRatio || 1, 2);
      Et.width = pt, Et.height = dt, G.width = Math.max(1, Math.round(pt * bt)), G.height = Math.max(1, Math.round(dt * bt)), L(), ht();
    }, ot = (nt) => {
      const pt = $.getBoundingClientRect();
      z.x = nt.clientX - pt.left, z.y = nt.clientY - pt.top;
      const dt = z.inside;
      if (z.inside = z.x >= 0 && z.y >= 0 && z.x <= pt.width && z.y <= pt.height, z.inside && !dt) {
        const bt = Z.current;
        Nt.px = (z.x - pt.width / 2) / Math.max(1, pt.height), Nt.py = bt.flip ? 1 - z.y / Math.max(1, pt.height) : z.y / Math.max(1, pt.height);
      }
      Z.current.paused || ht();
    }, gt = (nt) => {
      nt.pointerType !== "mouse" && (z.inside = !1);
    }, zt = () => {
      z.inside = !1;
    }, vt = () => {
      w = 0, ht();
    }, Ut = new ResizeObserver(Rt);
    Ut.observe($);
    const Yt = new IntersectionObserver((nt) => {
      J = nt.some((pt) => pt.isIntersecting), J && (w = 0, ht());
    });
    Yt.observe($), window.addEventListener("pointermove", ot, { passive: !0 }), window.addEventListener("pointerdown", ot, { passive: !0 }), window.addEventListener("pointerup", gt, { passive: !0 }), window.addEventListener("pointercancel", gt, { passive: !0 }), document.documentElement.addEventListener("pointerleave", zt), document.addEventListener("visibilitychange", vt), Rt();
    let B = Z.current.dpr;
    return Q.current = () => {
      const nt = Z.current;
      if (nt.dpr !== B) {
        B = nt.dpr, Rt();
        return;
      }
      E || L(), ht();
    }, () => {
      cancelAnimationFrame(E), Q.current = null, Ut.disconnect(), Yt.disconnect(), window.removeEventListener("pointermove", ot), window.removeEventListener("pointerdown", ot), window.removeEventListener("pointerup", gt), window.removeEventListener("pointercancel", gt), document.documentElement.removeEventListener("pointerleave", zt), document.removeEventListener("visibilitychange", vt), ut.deleteProgram(lt.program), ut.deleteBuffer(Mt), ut.deleteVertexArray(et), G.isConnected || ut.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), se.useEffect(() => {
    Q.current?.();
  }), /* @__PURE__ */ ae.jsx("div", { ref: K, className: `aurora-container${V ? ` ${V}` : ""}`, style: X, children: /* @__PURE__ */ ae.jsx("canvas", { ref: Y, className: "aurora-canvas", "aria-hidden": "true" }) });
}, kc = {
  linear: (f) => f,
  "ease-in": (f) => f * f,
  "ease-out": (f) => 1 - Math.pow(1 - f, 3),
  "ease-in-out": (f) => f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2,
  spring: (f) => 1 + 2.4 * Math.pow(f - 1, 3) + 1.4 * Math.pow(f - 1, 2)
}, m3 = ["line", "streak", "dot", "star"], g3 = 32, p3 = 500, R_ = 320, Ra = (f, l, u) => Math.min(u, Math.max(l, f)), v3 = (f, l, u) => {
  const a = Ra((u - f) / (l - f), 0, 1);
  return a * a * (3 - 2 * a);
}, _3 = (f) => {
  const l = (Array.isArray(f) ? f : [f]).filter(Boolean);
  return l.length ? l : ["#ffffff"];
}, y3 = (f, l, u, a, o) => {
  const c = a * 0.16;
  f.beginPath(), f.moveTo(l + Math.cos(o) * a, u + Math.sin(o) * a);
  for (let h = 1; h <= 4; h++) {
    const d = o + h * Math.PI / 2, g = d - Math.PI / 4;
    f.quadraticCurveTo(
      l + Math.cos(g) * c,
      u + Math.sin(g) * c,
      l + Math.cos(d) * a,
      u + Math.sin(d) * a
    );
  }
  f.closePath();
}, S3 = (f, l) => {
  f.fillStyle = l;
  const u = String(f.fillStyle), a = /^#([0-9a-f]{6})$/i.exec(u);
  if (a) {
    const c = parseInt(a[1], 16);
    return [c >> 16 & 255, c >> 8 & 255, c & 255];
  }
  const o = /^rgba?\(([^)]+)\)$/i.exec(u);
  return o ? o[1].split(",").slice(0, 3).map((c) => parseFloat(c)) : [0, 0, 0];
}, lS = se.forwardRef(
  ({
    sparkColor: f = "#fff",
    sparkSize: l = 14,
    sparkRadius: u = 30,
    sparkCount: a = 8,
    sparkWidth: o = 2,
    duration: c = 500,
    easing: h = "ease-out",
    extraScale: d = 1,
    shape: g = "line",
    randomness: p = 0.2,
    gravity: v = 0,
    spread: _ = 360,
    direction: S = 0,
    glow: b = 0,
    ring: M = !1,
    layer: T = "front",
    disabled: R = !1,
    className: V = "",
    style: X,
    children: K
  }, Y) => {
    const Q = se.useRef(null), k = se.useRef(null), D = se.useRef(null), Z = {
      colors: _3(f),
      size: Math.max(0, l),
      radius: Math.max(0, u) * Math.max(0, d),
      count: Ra(Math.round(a), 1, 64),
      width: Math.max(0.5, o),
      duration: Math.max(60, c),
      ease: kc[h] ?? kc["ease-out"],
      shape: m3.includes(g) ? g : "line",
      randomness: Ra(p, 0, 1),
      gravity: Math.max(0, v),
      spread: Ra(_, 0, 360),
      direction: S,
      glow: Ra(b, 0, 1),
      ring: M,
      disabled: R
    }, $ = se.useRef(Z);
    return $.current = Z, se.useEffect(() => {
      const G = Q.current, ut = k.current;
      if (!G || !ut) return;
      const lt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, St = [];
      let Mt = 0, et = { time: -1e9, x: 0, y: 0 };
      const F = (w, J) => 0.5 * w.gravity * p3 * J * J, P = (w, J, L, mt) => [
        w.x + Math.cos(J.angle) * L,
        w.y + Math.sin(J.angle) * L + F(w.settings, mt)
      ], I = (w, J, L, mt) => {
        const ht = J.settings, Rt = lt ? R_ : ht.duration * L.life, ot = mt / Rt;
        if (ot >= 1) return !1;
        const gt = lt ? 0.55 : ht.ease(Ra(ot, 0, 1)), zt = lt ? 0 : mt / 1e3, vt = ht.radius * L.reach * gt, Ut = ht.width * L.scale, Yt = lt ? 1 - ot : 1 - v3(ht.shape === "line" ? 0.55 : 0.7, 1, ot);
        if (Yt <= 0) return !0;
        if (w.strokeStyle = L.color, w.fillStyle = L.color, ht.shape === "line") {
          const jt = ht.size * L.scale * (lt ? 0.5 : Math.pow(1 - ot, 1.6)), [kt, Ht] = P(J, L, vt, zt), [Ct, ee] = P(J, L, vt + Math.max(0.01, jt), zt);
          return w.lineCap = "round", L.glow > 0 && (w.globalAlpha = Yt * 0.14 * L.glow, w.lineWidth = Ut * 4.5, w.beginPath(), w.moveTo(kt, Ht), w.lineTo(Ct, ee), w.stroke()), w.globalAlpha = Yt, w.lineWidth = Ut, w.beginPath(), w.moveTo(kt, Ht), w.lineTo(Ct, ee), w.stroke(), !0;
        }
        if (ht.shape === "streak") {
          const jt = lt ? 0 : Math.min(mt, 70 + ht.size * 4 * L.scale), kt = lt ? 0.4 : ht.ease(Ra((mt - jt) / Rt, 0, 1)), [Ht, Ct] = P(J, L, vt, zt), [ee, ue] = P(J, L, ht.radius * L.reach * kt, Math.max(0, zt - jt / 1e3)), Fe = Ht - ee, Re = Ct - ue, _n = Math.hypot(Fe, Re) || 1, Vn = -Re / _n * Ut * 0.5, xe = Fe / _n * Ut * 0.5, Yi = (He, Gn) => {
            const tn = w.createLinearGradient(ee, ue, Ht, Ct);
            tn.addColorStop(0, L.clear), tn.addColorStop(1, L.color), w.globalAlpha = Gn, w.fillStyle = tn, w.beginPath(), w.moveTo(ee, ue), w.lineTo(Ht + Vn * He, Ct + xe * He), w.lineTo(Ht - Vn * He, Ct - xe * He), w.closePath(), w.fill(), w.fillStyle = L.color, w.beginPath(), w.arc(Ht, Ct, Ut * 0.5 * He, 0, Math.PI * 2), w.fill();
          };
          return L.glow > 0 && Yi(3.2, Yt * 0.16 * L.glow), Yi(1, Yt), !0;
        }
        if (ht.shape === "dot") {
          const [jt, kt] = P(J, L, vt, zt), Ht = Ut * 1.25 * (1 - 0.5 * gt);
          return L.glow > 0 && (w.globalAlpha = Yt * 0.18 * L.glow, w.beginPath(), w.arc(jt, kt, Ht * 2.6, 0, Math.PI * 2), w.fill()), w.globalAlpha = Yt, w.beginPath(), w.arc(jt, kt, Ht, 0, Math.PI * 2), w.fill(), !0;
        }
        const [B, nt] = P(J, L, vt, zt), pt = lt ? 1 - ot : Math.pow(Math.sin(Math.PI * Ra(ot * 1.1, 0, 1)), 0.7), dt = ht.size * 0.6 * L.scale * pt, bt = L.angle + L.spin * ot * Math.PI * 0.5;
        return dt <= 0.05 || (L.glow > 0 && (w.globalAlpha = Yt * 0.2 * L.glow, w.beginPath(), w.arc(B, nt, dt * 1.1, 0, Math.PI * 2), w.fill()), w.globalAlpha = Yt, y3(w, B, nt, dt, bt), w.fill()), !0;
      }, st = (w, J, L) => {
        const mt = J.settings, ht = lt ? R_ : mt.duration * 0.8, Rt = L / ht;
        if (Rt >= 1) return !1;
        const ot = 2 + mt.radius * 0.6 * (lt ? 0.6 : kc["ease-out"](Rt));
        return w.globalAlpha = Math.pow(1 - Rt, 2) * 0.7, w.strokeStyle = J.sparks[0]?.color ?? mt.colors[0], w.lineWidth = Math.max(0.5, mt.width * (1 - Rt) * 0.9), w.beginPath(), w.arc(J.x, J.y, ot, 0, Math.PI * 2), w.stroke(), !0;
      }, A = (w) => {
        w.canvas.remove();
        const J = St.indexOf(w);
        J >= 0 && St.splice(J, 1);
      }, Et = (w) => {
        Mt = 0;
        for (const J of [...St]) {
          const L = w - J.start, mt = J.ctx;
          mt.setTransform(1, 0, 0, 1, 0, 0), mt.clearRect(0, 0, J.canvas.width, J.canvas.height), mt.setTransform(J.ratio, 0, 0, J.ratio, -J.left * J.ratio, -J.top * J.ratio);
          let ht = !1;
          J.settings.ring && st(mt, J, L) && (ht = !0);
          for (const Rt of J.sparks)
            I(mt, J, Rt, L) && (ht = !0);
          mt.globalAlpha = 1, ht || A(J);
        }
        St.length && (Mt = requestAnimationFrame(Et));
      }, z = (w, J) => {
        const L = $.current;
        if (L.disabled) return;
        const mt = G.getBoundingClientRect(), ht = Math.floor(Math.random() * L.colors.length), Rt = L.spread >= 359.5, ot = L.spread * Math.PI / 180, gt = (L.direction - 90) * Math.PI / 180, zt = Rt ? Math.PI * 2 / L.count : L.count > 1 ? ot / (L.count - 1) : 0, vt = Array.from({ length: L.count }, (jt, kt) => {
          const Ht = Rt ? gt + zt * kt : L.count > 1 ? gt - ot / 2 + zt * kt : gt, Ct = (Math.random() - 0.5) * L.randomness;
          return {
            angle: Ht + Ct * (zt || ot || 1) * 0.9,
            reach: 1 + (Math.random() - 0.5) * 0.7 * L.randomness,
            scale: 1 + (Math.random() - 0.5) * 0.8 * L.randomness,
            life: 1 + (Math.random() - 0.5) * 0.5 * L.randomness,
            spin: Math.random() - 0.5,
            color: L.colors[(kt + ht) % L.colors.length],
            clear: "",
            glow: 0
          };
        }), Ut = L.duration * (1 + 0.25 * L.randomness), Yt = F(L, Ut / 1e3), B = L.radius * (1 + 0.35 * L.randomness) * (L.ease === kc.spring ? 1.15 : 1) + L.size * (1 + 0.4 * L.randomness) + L.width * (L.glow > 0 ? 6 : 2) + 6, nt = {
          left: Math.max(w - B, 0),
          top: Math.max(J - B, 0),
          right: Math.min(w + B, window.innerWidth),
          bottom: Math.min(J + B + Yt, window.innerHeight)
        };
        if (nt.right - nt.left < 1 || nt.bottom - nt.top < 1) return;
        const pt = Math.min(window.devicePixelRatio || 1, 2), dt = document.createElement("canvas");
        dt.width = Math.ceil((nt.right - nt.left) * pt), dt.height = Math.ceil((nt.bottom - nt.top) * pt), Object.assign(dt.style, {
          position: "absolute",
          left: `${nt.left - mt.left}px`,
          top: `${nt.top - mt.top}px`,
          width: `${nt.right - nt.left}px`,
          height: `${nt.bottom - nt.top}px`,
          display: "block",
          pointerEvents: "none"
        }), dt.setAttribute("aria-hidden", "true"), ut.appendChild(dt);
        const bt = dt.getContext("2d");
        if (!bt) {
          dt.remove();
          return;
        }
        for (const jt of vt) {
          const [kt, Ht, Ct] = S3(bt, jt.color);
          jt.clear = `rgba(${kt}, ${Ht}, ${Ct}, 0)`, jt.glow = L.glow * (0.35 + 0.65 * ((0.2126 * kt + 0.7152 * Ht + 0.0722 * Ct) / 255));
        }
        for (St.push({
          x: w,
          y: J,
          start: performance.now(),
          sparks: vt,
          settings: { ...L },
          canvas: dt,
          ctx: bt,
          ratio: pt,
          left: nt.left,
          top: nt.top
        }); St.length > g3; ) A(St[0]);
        Mt || (Mt = requestAnimationFrame(Et));
      }, Nt = (w) => {
        w.pointerType !== "mouse" || w.button !== 0 || (et = { time: performance.now(), x: w.clientX, y: w.clientY }, z(w.clientX, w.clientY));
      }, E = (w) => {
        if ("pointerType" in w && w.pointerType === "mouse") return;
        if (w.detail === 0) {
          const mt = (w.target instanceof Element ? w.target : G).getBoundingClientRect();
          z(mt.left + mt.width / 2, mt.top + mt.height / 2);
          return;
        }
        performance.now() - et.time < 700 && Math.hypot(w.clientX - et.x, w.clientY - et.y) < 12 || z(w.clientX, w.clientY);
      };
      return G.addEventListener("pointerdown", Nt), G.addEventListener("click", E), D.current = {
        spark: (w, J) => {
          const L = G.getBoundingClientRect();
          z(L.left + (w ?? L.width / 2), L.top + (J ?? L.height / 2));
        }
      }, () => {
        cancelAnimationFrame(Mt), G.removeEventListener("pointerdown", Nt), G.removeEventListener("click", E);
        for (const w of [...St]) A(w);
        D.current = null;
      };
    }, []), se.useImperativeHandle(
      Y,
      () => ({
        spark: (G, ut) => D.current?.spark(G, ut)
      }),
      []
    ), /* @__PURE__ */ ae.jsxs(
      "div",
      {
        ref: Q,
        className: V,
        style: { position: "relative", width: "100%", height: "100%", isolation: "isolate", ...X },
        children: [
          K,
          /* @__PURE__ */ ae.jsx(
            "span",
            {
              ref: k,
              "aria-hidden": "true",
              style: {
                position: "absolute",
                inset: 0,
                zIndex: T === "back" ? -1 : 1,
                overflow: "visible",
                pointerEvents: "none"
              }
            }
          )
        ]
      }
    );
  }
);
lS.displayName = "ClickSpark";
De.registerPlugin(Pt);
const b3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Cu(f, l) {
  const u = document.getElementById(f);
  if (!u) return null;
  try {
    const a = kb.createRoot(u);
    return Pb.flushSync(() => a.render(l)), a;
  } catch (a) {
    return console.warn("b-lance: componente non montato", f, a), null;
  }
}
const T3 = [
  {
    icon: "i-globe",
    tag: "Valute",
    title: "125 valute, nessuna conversione forzata",
    text: "Ogni spesa resta nella sua unità. I saldi del gruppo usano la valuta che scegli tu, con il cambio che decide chi amministra.",
    wide: !0
  },
  {
    icon: "i-wallet",
    tag: "Pagamenti",
    title: "Anche a rate",
    text: "“Ha saldato 20 su 47,50”. Registri la parte e il resto resta visibile."
  },
  {
    icon: "i-swap",
    tag: "Giroconti",
    title: "Meno bonifici",
    text: "Ti diciamo chi paga chi con il numero più basso di trasferimenti possibile."
  },
  {
    icon: "i-calendar",
    tag: "Ricorrenze",
    title: "Affitto e bollette",
    text: "Imposta la cadenza e ritrovi la spesa pronta ogni mese."
  },
  {
    icon: "i-users",
    tag: "Persone",
    title: "Ruoli chiari",
    text: "Chi amministra, chi inserisce spese, chi legge soltanto. Si decide dal gruppo."
  },
  {
    icon: "i-check",
    tag: "Storico",
    title: "Le spese annullate restano",
    text: "Visibili in grigio e barrate: non contano più nei saldi, ma nessuno riscrive la storia del gruppo.",
    wide: !0
  }
];
function _0(f, l) {
  if (!f) return [];
  const u = f.textContent.trim(), a = document.createElement("span");
  a.className = "h-visual", a.setAttribute("aria-hidden", "true");
  const o = [];
  u.split(/(\s+)/).forEach((h) => {
    if (h) {
      if (/^\s+$/.test(h)) {
        a.appendChild(document.createTextNode(h));
        return;
      }
      if (l === "chars")
        [...h].forEach((d) => {
          const g = document.createElement("span");
          g.className = "h-char", g.textContent = d, a.appendChild(g), o.push(g);
        });
      else {
        const d = document.createElement("span");
        d.className = "h-word", d.textContent = h, a.appendChild(d), o.push(d);
      }
    }
  });
  const c = document.createElement("span");
  return c.className = "sr-only", c.textContent = u, f.textContent = "", f.append(a, c), o;
}
Cu(
  "rb-aurora",
  /* @__PURE__ */ ae.jsx(
    d3,
    {
      colorStops: ["#0d1512", "#3f6a52", "#9dc3aa"],
      amplitude: 1.15,
      blend: 0.62,
      speed: 0.45,
      height: 0.5,
      scale: 1.1,
      glow: 0.55,
      brightness: 0.85,
      layers: 2,
      direction: "top",
      intro: !0,
      opacity: 0.85,
      lightMode: !1
    }
  )
);
Cu(
  "rb-particles",
  /* @__PURE__ */ ae.jsx(
    u3,
    {
      particleCount: 70,
      particleSpread: 9,
      speed: 0.09,
      particleColors: ["#9dc3aa", "#5f8d6e"],
      particleBaseSize: 34,
      sizeRandomness: 0.7,
      cameraDistance: 24,
      moveParticlesOnHover: !1,
      alphaParticles: !0,
      glow: 0.2,
      twinkle: 0.25,
      opacity: 0.62
    }
  )
);
Cu(
  "rb-magnet-1",
  /* @__PURE__ */ ae.jsx(gm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsxs("a", { href: "/register", className: "s-btn", children: [
    /* @__PURE__ */ ae.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ae.jsx("use", { href: "#i-bolt" }) }),
    " Inizia gratis"
  ] }) })
);
Cu(
  "rb-magnet-2",
  /* @__PURE__ */ ae.jsx(gm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsx("a", { href: "/demo", className: "s-btn s-btn-ghost", children: "Prova la demo" }) })
);
Cu(
  "rb-magnet-3",
  /* @__PURE__ */ ae.jsx(gm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsxs("a", { className: "s-btn s-btn-light", href: "https://github.com/mirkosio/b-lance/releases/latest", children: [
    /* @__PURE__ */ ae.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ae.jsx("use", { href: "#i-bolt" }) }),
    " Scarica l'APK"
  ] }) })
);
Cu(
  "rb-features",
  /* @__PURE__ */ ae.jsx(ae.Fragment, { children: T3.map((f, l) => /* @__PURE__ */ ae.jsxs(
    KE,
    {
      className: `s-card${f.wide ? " s-card-wide" : ""}`,
      spotlightColor: "rgba(95, 141, 110, 0.2)",
      intensity: 0.9,
      spotlightSize: 300,
      theme: "light",
      flare: !1,
      grain: 0,
      children: [
        /* @__PURE__ */ ae.jsx("span", { className: "s-card-icon", children: /* @__PURE__ */ ae.jsx("svg", { width: "24", height: "24", "aria-hidden": "true", children: /* @__PURE__ */ ae.jsx("use", { href: `#${f.icon}` }) }) }),
        /* @__PURE__ */ ae.jsx("span", { className: "s-card-tag", children: f.tag }),
        /* @__PURE__ */ ae.jsx("h3", { children: f.title }),
        /* @__PURE__ */ ae.jsx("p", { children: f.text }),
        /* @__PURE__ */ ae.jsxs("span", { className: "s-card-index", "aria-hidden": "true", children: [
          "02.",
          l + 1
        ] })
      ]
    },
    f.title
  )) })
);
function E3() {
  const f = se.useRef(null);
  return se.useEffect(() => {
    const l = (u) => f.current?.spark(u.clientX, u.clientY);
    return document.addEventListener("pointerdown", l), () => document.removeEventListener("pointerdown", l);
  }, []), /* @__PURE__ */ ae.jsx(
    lS,
    {
      ref: f,
      className: "rb-spark",
      sparkColor: "#7fae90",
      sparkSize: 6,
      sparkRadius: 15,
      sparkCount: 4,
      duration: 340,
      easing: "ease-out",
      extraScale: 1
    }
  );
}
Cu("rb-spark", /* @__PURE__ */ ae.jsx(E3, {}));
if (!b3) {
  const f = new aT({ duration: 1.05, smoothWheel: !0, touchMultiplier: 1.3 });
  window.__blLenis = f, f.on("scroll", Pt.update), De.ticker.add((p) => f.raf(p * 1e3)), De.ticker.lagSmoothing(0);
  const l = _0(document.getElementById("rb-title"), "chars"), u = _0(document.getElementById("rb-accent"), "words");
  l.length && De.from(l, {
    yPercent: 112,
    opacity: 0,
    duration: 0.85,
    stagger: 0.026,
    ease: "power3.out",
    delay: 0.08
  }), u.length && De.from(u, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.32
  }), document.querySelectorAll('a[href^="#"]').forEach((p) => {
    p.addEventListener("click", (v) => {
      const _ = document.querySelector(p.getAttribute("href"));
      _ && (v.preventDefault(), f.scrollTo(_, { offset: -20 }));
    });
  });
  const a = document.getElementById("rb-tilt"), o = a?.querySelector(".s-receipt");
  if (a && o) {
    De.set(o, { transformPerspective: 900 });
    const p = De.quickTo(o, "rotationY", { duration: 0.5, ease: "power2.out" }), v = De.quickTo(o, "rotationX", { duration: 0.5, ease: "power2.out" });
    a.addEventListener("pointermove", (_) => {
      const S = a.getBoundingClientRect(), b = (_.clientX - S.left) / S.width - 0.5, M = (_.clientY - S.top) / S.height - 0.5;
      p(b * 9), v(M * -7);
    }), a.addEventListener("pointerleave", () => {
      p(0), v(0);
    }), De.to(o, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: ".s-cover", start: "top top", end: "bottom top", scrub: 0.6 }
    });
  }
  const c = (p, v = {}) => {
    const _ = p.filter(Boolean);
    _.length && De.from(_, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      ...v
    });
  };
  c([document.querySelector(".s-kicker"), document.querySelector(".s-lede"), document.querySelector(".s-cta"), document.querySelector(".s-note")], { delay: 0.15 }), c([...document.querySelectorAll(".s-fact")]), c([...document.querySelectorAll(".s-sec-head > *")], { scrollTrigger: { trigger: ".s-features", start: "top 78%", once: !0 } }), c([...document.querySelectorAll(".s-faq-item")], { scrollTrigger: { trigger: ".s-faq", start: "top 75%", once: !0 } }), c([...document.querySelectorAll(".s-final > .s-wrap > *")], { scrollTrigger: { trigger: ".s-final", start: "top 80%", once: !0 } }), Pt.batch(".s-bento .s-card", {
    start: "top 88%",
    once: !0,
    onEnter: (p) => De.from(p, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06
    })
  });
  const h = document.querySelector(".s-phone");
  h && (De.from(h, {
    opacity: 0,
    y: 60,
    rotate: 5,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".s-app", start: "top 70%", once: !0 }
  }), De.to(h, {
    y: -26,
    rotate: -1,
    ease: "none",
    scrollTrigger: { trigger: ".s-app", start: "top bottom", end: "bottom top", scrub: 0.7 }
  })), De.matchMedia().add("(min-width: 901px)", () => {
    const p = document.getElementById("rb-track"), v = document.querySelector(".s-steps");
    if (!p || !v) return;
    const _ = () => Math.max(0, p.scrollWidth - document.documentElement.clientWidth + 48), S = De.to(p, {
      x: () => -_(),
      ease: "none",
      scrollTrigger: {
        trigger: v,
        start: "top top",
        end: () => `+=${_()}`,
        pin: !0,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: !0
      }
    }), b = document.getElementById("rb-progress");
    return b && De.to(b, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: v,
        start: "top top",
        end: () => `+=${_()}`,
        scrub: !0
      }
    }), () => {
      S.scrollTrigger?.kill(), S.kill(), De.set(p, { x: 0 });
    };
  });
  const g = document.querySelector(".s-rail");
  if (g) {
    const p = [...g.querySelectorAll("a")], v = [".s-cover", ".s-app", ".s-final"].map((M) => document.querySelector(M)).filter(Boolean), _ = document.querySelector(".s-steps"), S = document.querySelector("footer"), b = () => {
      const M = window.innerHeight * 0.5, T = v.some((Q) => {
        const k = Q.getBoundingClientRect();
        return k.top <= M && k.bottom >= M;
      });
      g.classList.toggle("is-inverse", T);
      const R = _ && (_.closest(".pin-spacer") || _), V = R && R.getBoundingClientRect(), X = !!V && V.bottom > 0 && V.top < window.innerHeight, K = S && S.getBoundingClientRect(), Y = !!K && K.top < window.innerHeight;
      g.classList.toggle("is-hidden", X || Y), p.forEach((Q) => {
        const k = document.querySelector(Q.getAttribute("href"));
        if (!k) return;
        const D = k.getBoundingClientRect();
        Q.classList.toggle("is-current", D.top <= M && D.bottom > M);
      });
    };
    window.addEventListener("scroll", b, { passive: !0 }), window.addEventListener("resize", b), b();
  }
  if (document.body.classList.contains("site-v2") && !document.body.classList.contains("landing")) {
    const p = document.querySelector(
      ".info-hero-inner, .demo-hero-inner, .about-masthead-inner, .auth-aside-inner"
    );
    p && De.from([...p.children], {
      opacity: 0,
      y: 24,
      duration: 0.7,
      stagger: 0.07,
      ease: "power2.out"
    });
    const v = document.querySelector(".info-hero h1");
    if (v) {
      const b = _0(v, "words");
      b.length && De.from(b, {
        yPercent: 105,
        opacity: 0,
        duration: 0.85,
        stagger: 0.055,
        ease: "power3.out",
        delay: 0.12
      });
    }
    const _ = document.querySelector(".info-example-card");
    _ && De.from(_, {
      opacity: 0,
      y: 40,
      rotate: 2,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: ".info-example", start: "top 80%", once: !0 }
    }), De.utils.toArray(".info-faq .faq-item").forEach((b) => {
      De.from(b, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: b, start: "top 92%", once: !0 }
      });
    }), De.utils.toArray(".about-index .info-link-card").forEach((b, M) => {
      De.from(b, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        delay: M % 4 * 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: b, start: "top 93%", once: !0 }
      });
    });
    const S = document.querySelector(".demo-summary");
    S && De.from(S, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".demo-grid", start: "top 80%", once: !0 }
    }), document.querySelectorAll(".info-toc a").forEach((b) => {
      b.addEventListener("click", (M) => {
        const T = document.querySelector(b.getAttribute("href"));
        T && (M.preventDefault(), f.scrollTo(T, { offset: -90 }));
      });
    });
  }
}
window.addEventListener("load", () => Pt.refresh());
