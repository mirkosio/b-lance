var a0 = { exports: {} }, Cs = {};
var H_;
function hT() {
  if (H_) return Cs;
  H_ = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.fragment");
  function u(a, s, f) {
    var h = null;
    if (f !== void 0 && (h = "" + f), s.key !== void 0 && (h = "" + s.key), "key" in s) {
      f = {};
      for (var d in s)
        d !== "key" && (f[d] = s[d]);
    } else f = s;
    return s = f.ref, {
      $$typeof: c,
      type: a,
      key: h,
      ref: s !== void 0 ? s : null,
      props: f
    };
  }
  return Cs.Fragment = l, Cs.jsx = u, Cs.jsxs = u, Cs;
}
var L_;
function dT() {
  return L_ || (L_ = 1, a0.exports = hT()), a0.exports;
}
var ie = dT(), u0 = { exports: {} }, kt = {};
var Y_;
function mT() {
  if (Y_) return kt;
  Y_ = 1;
  var c = /* @__PURE__ */ Symbol.for("react.transitional.element"), l = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), f = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), b = Symbol.iterator;
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
  }, O = Object.assign, G = {};
  function q(E, A, W) {
    this.props = E, this.context = A, this.refs = G, this.updater = W || T;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(E, A) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, A, "setState");
  }, q.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function k() {
  }
  k.prototype = q.prototype;
  function L(E, A, W) {
    this.props = E, this.context = A, this.refs = G, this.updater = W || T;
  }
  var D = L.prototype = new k();
  D.constructor = L, O(D, q.prototype), D.isPureReactComponent = !0;
  var J = Array.isArray;
  function C() {
  }
  var F = { H: null, A: null, T: null, S: null }, Z = Object.prototype.hasOwnProperty;
  function Y(E, A, W) {
    var j = W.ref;
    return {
      $$typeof: c,
      type: E,
      key: A,
      ref: j !== void 0 ? j : null,
      props: W
    };
  }
  function vt(E, A) {
    return Y(E.type, A, E.props);
  }
  function $(E) {
    return typeof E == "object" && E !== null && E.$$typeof === c;
  }
  function yt(E) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(W) {
      return A[W];
    });
  }
  var gt = /\/+/g;
  function tt(E, A) {
    return typeof E == "object" && E !== null && E.key != null ? yt("" + E.key) : A.toString(36);
  }
  function V(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(C, C) : (E.status = "pending", E.then(
          function(A) {
            E.status === "pending" && (E.status = "fulfilled", E.value = A);
          },
          function(A) {
            E.status === "pending" && (E.status = "rejected", E.reason = A);
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
  function P(E, A, W, j, pt) {
    var dt = typeof E;
    (dt === "undefined" || dt === "boolean") && (E = null);
    var zt = !1;
    if (E === null) zt = !0;
    else
      switch (dt) {
        case "bigint":
        case "string":
        case "number":
          zt = !0;
          break;
        case "object":
          switch (E.$$typeof) {
            case c:
            case l:
              zt = !0;
              break;
            case p:
              return zt = E._init, P(
                zt(E._payload),
                A,
                W,
                j,
                pt
              );
          }
      }
    if (zt)
      return pt = pt(E), zt = j === "" ? "." + tt(E, 0) : j, J(pt) ? (W = "", zt != null && (W = zt.replace(gt, "$&/") + "/"), P(pt, A, W, "", function(wt) {
        return wt;
      })) : pt != null && ($(pt) && (pt = vt(
        pt,
        W + (pt.key == null || E && E.key === pt.key ? "" : ("" + pt.key).replace(
          gt,
          "$&/"
        ) + "/") + zt
      )), A.push(pt)), 1;
    zt = 0;
    var ot = j === "" ? "." : j + ":";
    if (J(E))
      for (var ct = 0; ct < E.length; ct++)
        j = E[ct], dt = ot + tt(j, ct), zt += P(
          j,
          A,
          W,
          dt,
          pt
        );
    else if (ct = M(E), typeof ct == "function")
      for (E = ct.call(E), ct = 0; !(j = E.next()).done; )
        j = j.value, dt = ot + tt(j, ct++), zt += P(
          j,
          A,
          W,
          dt,
          pt
        );
    else if (dt === "object") {
      if (typeof E.then == "function")
        return P(
          V(E),
          A,
          W,
          j,
          pt
        );
      throw A = String(E), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return zt;
  }
  function I(E, A, W) {
    if (E == null) return E;
    var j = [], pt = 0;
    return P(E, j, "", "", function(dt) {
      return A.call(W, dt, pt++);
    }), j;
  }
  function rt(E) {
    if (E._status === -1) {
      var A = E._result, W = A();
      W.then(
        function(j) {
          (E._status === 0 || E._status === -1) && (E._status = 1, E._result = j, W.status === void 0 && (W.status = "fulfilled", W.value = j));
        },
        function(j) {
          (E._status === 0 || E._status === -1) && (E._status = 2, E._result = j, W.status === void 0 && (W.status = "rejected", W.reason = j));
        }
      ), E._status === -1 && (E._status = 0, E._result = W);
    }
    if (E._status === 1) return E._result.default;
    throw E._result;
  }
  var x = typeof reportError == "function" ? reportError : function(E) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var A = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof E == "object" && E !== null && typeof E.message == "string" ? String(E.message) : String(E),
        error: E
      });
      if (!window.dispatchEvent(A)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", E);
      return;
    }
    console.error(E);
  };
  function ft(E) {
    var A = F.T, W = {};
    W.types = A !== null ? A.types : null, F.T = W;
    try {
      var j = E(), pt = F.S;
      pt !== null && pt(W, j), typeof j == "object" && j !== null && typeof j.then == "function" && j.then(C, x);
    } catch (dt) {
      x(dt);
    } finally {
      A !== null && W.types !== null && (A.types = W.types), F.T = A;
    }
  }
  function z(E) {
    var A = F.T;
    if (A !== null) {
      var W = A.types;
      W === null ? A.types = [E] : W.indexOf(E) === -1 && W.push(E);
    } else ft(z.bind(null, E));
  }
  var Ht = {
    map: I,
    forEach: function(E, A, W) {
      I(
        E,
        function() {
          A.apply(this, arguments);
        },
        W
      );
    },
    count: function(E) {
      var A = 0;
      return I(E, function() {
        A++;
      }), A;
    },
    toArray: function(E) {
      return I(E, function(A) {
        return A;
      }) || [];
    },
    only: function(E) {
      if (!$(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return kt.Activity = _, kt.Children = Ht, kt.Component = q, kt.Fragment = u, kt.Profiler = s, kt.PureComponent = L, kt.StrictMode = a, kt.Suspense = g, kt.ViewTransition = S, kt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = F, kt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return F.H.useMemoCache(E);
    }
  }, kt.addTransitionType = z, kt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, kt.cacheSignal = function() {
    return null;
  }, kt.cloneElement = function(E, A, W) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var j = O({}, E.props), pt = E.key;
    if (A != null)
      for (dt in A.key !== void 0 && (pt = "" + A.key), A)
        !Z.call(A, dt) || dt === "key" || dt === "__self" || dt === "__source" || dt === "ref" && A.ref === void 0 || (j[dt] = A[dt]);
    var dt = arguments.length - 2;
    if (dt === 1) j.children = W;
    else if (1 < dt) {
      for (var zt = Array(dt), ot = 0; ot < dt; ot++)
        zt[ot] = arguments[ot + 2];
      j.children = zt;
    }
    return Y(E.type, pt, j);
  }, kt.createContext = function(E) {
    return E = {
      $$typeof: h,
      _currentValue: E,
      _currentValue2: E,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, E.Provider = E, E.Consumer = {
      $$typeof: f,
      _context: E
    }, E;
  }, kt.createElement = function(E, A, W) {
    var j, pt = {}, dt = null;
    if (A != null)
      for (j in A.key !== void 0 && (dt = "" + A.key), A)
        Z.call(A, j) && j !== "key" && j !== "__self" && j !== "__source" && (pt[j] = A[j]);
    var zt = arguments.length - 2;
    if (zt === 1) pt.children = W;
    else if (1 < zt) {
      for (var ot = Array(zt), ct = 0; ct < zt; ct++)
        ot[ct] = arguments[ct + 2];
      pt.children = ot;
    }
    if (E && E.defaultProps)
      for (j in zt = E.defaultProps, zt)
        pt[j] === void 0 && (pt[j] = zt[j]);
    return Y(E, dt, pt);
  }, kt.createRef = function() {
    return { current: null };
  }, kt.forwardRef = function(E) {
    return { $$typeof: d, render: E };
  }, kt.isValidElement = $, kt.lazy = function(E) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: E },
      _init: rt
    };
  }, kt.memo = function(E, A) {
    return {
      $$typeof: v,
      type: E,
      compare: A === void 0 ? null : A
    };
  }, kt.startTransition = ft, kt.unstable_useCacheRefresh = function() {
    return F.H.useCacheRefresh();
  }, kt.use = function(E) {
    return F.H.use(E);
  }, kt.useActionState = function(E, A, W) {
    return F.H.useActionState(E, A, W);
  }, kt.useCallback = function(E, A) {
    return F.H.useCallback(E, A);
  }, kt.useContext = function(E) {
    return F.H.useContext(E);
  }, kt.useDebugValue = function() {
  }, kt.useDeferredValue = function(E, A) {
    return F.H.useDeferredValue(E, A);
  }, kt.useEffect = function(E, A) {
    return F.H.useEffect(E, A);
  }, kt.useEffectEvent = function(E) {
    return F.H.useEffectEvent(E);
  }, kt.useId = function() {
    return F.H.useId();
  }, kt.useImperativeHandle = function(E, A, W) {
    return F.H.useImperativeHandle(E, A, W);
  }, kt.useInsertionEffect = function(E, A) {
    return F.H.useInsertionEffect(E, A);
  }, kt.useLayoutEffect = function(E, A) {
    return F.H.useLayoutEffect(E, A);
  }, kt.useMemo = function(E, A) {
    return F.H.useMemo(E, A);
  }, kt.useOptimistic = function(E, A) {
    return F.H.useOptimistic(E, A);
  }, kt.useReducer = function(E, A, W) {
    return F.H.useReducer(E, A, W);
  }, kt.useRef = function(E) {
    return F.H.useRef(E);
  }, kt.useState = function(E) {
    return F.H.useState(E);
  }, kt.useSyncExternalStore = function(E, A, W) {
    return F.H.useSyncExternalStore(
      E,
      A,
      W
    );
  }, kt.useTransition = function() {
    return F.H.useTransition();
  }, kt.version = "19.3.1", kt;
}
var q_;
function W0() {
  return q_ || (q_ = 1, u0.exports = mT()), u0.exports;
}
var Kt = W0(), r0 = { exports: {} }, zs = {}, s0 = { exports: {} }, o0 = {};
var X_;
function gT() {
  return X_ || (X_ = 1, (function(c) {
    function l(V, P) {
      var I = V.length;
      V.push(P);
      t: for (; 0 < I; ) {
        var rt = I - 1 >>> 1, x = V[rt];
        if (0 < s(x, P))
          V[rt] = P, V[I] = x, I = rt;
        else break t;
      }
    }
    function u(V) {
      return V.length === 0 ? null : V[0];
    }
    function a(V) {
      if (V.length === 0) return null;
      var P = V[0], I = V.pop();
      if (I !== P) {
        V[0] = I;
        t: for (var rt = 0, x = V.length, ft = x >>> 1; rt < ft; ) {
          var z = 2 * (rt + 1) - 1, Ht = V[z], E = z + 1, A = V[E];
          if (0 > s(Ht, I))
            E < x && 0 > s(A, Ht) ? (V[rt] = A, V[E] = I, rt = E) : (V[rt] = Ht, V[z] = I, rt = z);
          else if (E < x && 0 > s(A, I))
            V[rt] = A, V[E] = I, rt = E;
          else break t;
        }
      }
      return P;
    }
    function s(V, P) {
      var I = V.sortIndex - P.sortIndex;
      return I !== 0 ? I : V.id - P.id;
    }
    if (c.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
      var f = performance;
      c.unstable_now = function() {
        return f.now();
      };
    } else {
      var h = Date, d = h.now();
      c.unstable_now = function() {
        return h.now() - d;
      };
    }
    var g = [], v = [], p = 1, _ = null, S = 3, b = !1, M = !1, T = !1, O = !1, G = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, k = typeof setImmediate < "u" ? setImmediate : null;
    function L(V) {
      for (var P = u(v); P !== null; ) {
        if (P.callback === null) a(v);
        else if (P.startTime <= V)
          a(v), P.sortIndex = P.expirationTime, l(g, P);
        else break;
        P = u(v);
      }
    }
    function D(V) {
      if (T = !1, L(V), !M)
        if (u(g) !== null)
          M = !0, J || (J = !0, $());
        else {
          var P = u(v);
          P !== null && tt(D, P.startTime - V);
        }
    }
    var J = !1, C = -1, F = 5, Z = -1;
    function Y() {
      return O ? !0 : !(c.unstable_now() - Z < F);
    }
    function vt() {
      if (O = !1, J) {
        var V = c.unstable_now();
        Z = V;
        var P = !0;
        try {
          t: {
            M = !1, T && (T = !1, q(C), C = -1), b = !0;
            var I = S;
            try {
              e: {
                for (L(V), _ = u(g); _ !== null && !(_.expirationTime > V && Y()); ) {
                  var rt = _.callback;
                  if (typeof rt == "function") {
                    _.callback = null, S = _.priorityLevel;
                    var x = rt(
                      _.expirationTime <= V
                    );
                    if (V = c.unstable_now(), typeof x == "function") {
                      _.callback = x, L(V), P = !0;
                      break e;
                    }
                    _ === u(g) && a(g), L(V);
                  } else a(g);
                  _ = u(g);
                }
                if (_ !== null) P = !0;
                else {
                  var ft = u(v);
                  ft !== null && tt(
                    D,
                    ft.startTime - V
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
          P ? $() : J = !1;
        }
      }
    }
    var $;
    if (typeof k == "function")
      $ = function() {
        k(vt);
      };
    else if (typeof MessageChannel < "u") {
      var yt = new MessageChannel(), gt = yt.port2;
      yt.port1.onmessage = vt, $ = function() {
        gt.postMessage(null);
      };
    } else
      $ = function() {
        G(vt, 0);
      };
    function tt(V, P) {
      C = G(function() {
        V(c.unstable_now());
      }, P);
    }
    c.unstable_IdlePriority = 5, c.unstable_ImmediatePriority = 1, c.unstable_LowPriority = 4, c.unstable_NormalPriority = 3, c.unstable_Profiling = null, c.unstable_UserBlockingPriority = 2, c.unstable_cancelCallback = function(V) {
      V.callback = null;
    }, c.unstable_forceFrameRate = function(V) {
      0 > V || 125 < V ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : F = 0 < V ? Math.floor(1e3 / V) : 5;
    }, c.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, c.unstable_next = function(V) {
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
        return V();
      } finally {
        S = I;
      }
    }, c.unstable_requestPaint = function() {
      O = !0;
    }, c.unstable_runWithPriority = function(V, P) {
      switch (V) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          V = 3;
      }
      var I = S;
      S = V;
      try {
        return P();
      } finally {
        S = I;
      }
    }, c.unstable_scheduleCallback = function(V, P, I) {
      var rt = c.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? rt + I : rt) : I = rt, V) {
        case 1:
          var x = -1;
          break;
        case 2:
          x = 250;
          break;
        case 5:
          x = 1073741823;
          break;
        case 4:
          x = 1e4;
          break;
        default:
          x = 5e3;
      }
      return x = I + x, V = {
        id: p++,
        callback: P,
        priorityLevel: V,
        startTime: I,
        expirationTime: x,
        sortIndex: -1
      }, I > rt ? (V.sortIndex = I, l(v, V), u(g) === null && V === u(v) && (T ? (q(C), C = -1) : T = !0, tt(D, I - rt))) : (V.sortIndex = x, l(g, V), M || b || (M = !0, J || (J = !0, $()))), V;
    }, c.unstable_shouldYield = Y, c.unstable_wrapCallback = function(V) {
      var P = S;
      return function() {
        var I = S;
        S = P;
        try {
          return V.apply(this, arguments);
        } finally {
          S = I;
        }
      };
    };
  })(o0)), o0;
}
var V_;
function pT() {
  return V_ || (V_ = 1, s0.exports = gT()), s0.exports;
}
var c0 = { exports: {} }, qn = {};
var G_;
function vT() {
  if (G_) return qn;
  G_ = 1;
  var c = W0();
  function l(p) {
    var _ = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      _ += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        _ += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + p + "; visit " + _ + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
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
  }, s = /* @__PURE__ */ Symbol.for("react.portal"), f = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function d(p, _, S) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: b == null ? null : b === h ? h : "" + b,
      children: p,
      containerInfo: _,
      implementation: S
    };
  }
  var g = c.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(p, _) {
    if (p === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return qn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, qn.browser = function(p) {
    return { $$typeof: f, _reason: p };
  }, qn.createPortal = function(p, _) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(l(299));
    return d(p, _, null, S);
  }, qn.flushSync = function(p) {
    var _ = g.T, S = a.p;
    try {
      if (g.T = null, a.p = 2, p) return p();
    } finally {
      g.T = _, a.p = S, a.d.f();
    }
  }, qn.preconnect = function(p, _) {
    typeof p == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, a.d.C(p, _));
  }, qn.prefetchDNS = function(p) {
    typeof p == "string" && a.d.D(p);
  }, qn.preinit = function(p, _) {
    if (typeof p == "string" && _ && typeof _.as == "string") {
      var S = _.as, b = v(S, _.crossOrigin), M = typeof _.integrity == "string" ? _.integrity : void 0, T = typeof _.fetchPriority == "string" ? _.fetchPriority : void 0;
      S === "style" ? a.d.S(
        p,
        typeof _.precedence == "string" ? _.precedence : void 0,
        {
          crossOrigin: b,
          integrity: M,
          fetchPriority: T
        }
      ) : S === "script" && a.d.X(p, {
        crossOrigin: b,
        integrity: M,
        fetchPriority: T,
        nonce: typeof _.nonce == "string" ? _.nonce : void 0
      });
    }
  }, qn.preinitModule = function(p, _) {
    if (typeof p == "string")
      if (typeof _ == "object" && _ !== null) {
        if (_.as == null || _.as === "script") {
          var S = v(
            _.as,
            _.crossOrigin
          );
          a.d.M(p, {
            crossOrigin: S,
            integrity: typeof _.integrity == "string" ? _.integrity : void 0,
            nonce: typeof _.nonce == "string" ? _.nonce : void 0,
            fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
          });
        }
      } else _ == null && a.d.M(p);
  }, qn.preload = function(p, _) {
    if (typeof p == "string" && typeof _ == "object" && _ !== null && typeof _.as == "string") {
      var S = _.as, b = v(S, _.crossOrigin);
      a.d.L(p, S, {
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
  }, qn.preloadModule = function(p, _) {
    if (typeof p == "string")
      if (_) {
        var S = v(_.as, _.crossOrigin);
        a.d.m(p, {
          as: typeof _.as == "string" && _.as !== "script" ? _.as : void 0,
          crossOrigin: S,
          integrity: typeof _.integrity == "string" ? _.integrity : void 0,
          nonce: typeof _.nonce == "string" ? _.nonce : void 0,
          fetchPriority: typeof _.fetchPriority == "string" ? _.fetchPriority : void 0
        });
      } else a.d.m(p);
  }, qn.requestFormReset = function(p) {
    a.d.r(p);
  }, qn.unstable_batchedUpdates = function(p, _) {
    return p(_);
  }, qn.useFormState = function(p, _, S) {
    return g.H.useFormState(p, _, S);
  }, qn.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, qn.version = "19.3.1", qn;
}
var j_;
function _T() {
  if (j_) return c0.exports;
  j_ = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (l) {
        console.error(l);
      }
  }
  return c(), c0.exports = vT(), c0.exports;
}
var Q_;
function yT() {
  if (Q_) return zs;
  Q_ = 1;
  var c = pT(), l = W0(), u = _T();
  function a(t) {
    var e = "https://react.dev/errors/" + t;
    if (1 < arguments.length) {
      e += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var n = 2; n < arguments.length; n++)
        e += "&args[]=" + encodeURIComponent(arguments[n]);
    }
    return "Minified React error #" + t + "; visit " + e + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function s(t) {
    return !(!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11);
  }
  function f(t) {
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
    if (f(t) !== t)
      throw Error(a(188));
  }
  function v(t) {
    var e = t.alternate;
    if (!e) {
      if (e = f(t), e === null) throw Error(a(188));
      return e !== t ? null : t;
    }
    for (var n = t, i = e; ; ) {
      var r = n.return;
      if (r === null) break;
      var o = r.alternate;
      if (o === null) {
        if (i = r.return, i !== null) {
          n = i;
          continue;
        }
        break;
      }
      if (r.child === o.child) {
        for (o = r.child; o; ) {
          if (o === n) return g(r), t;
          if (o === i) return g(r), e;
          o = o.sibling;
        }
        throw Error(a(188));
      }
      if (n.return !== i.return) n = r, i = o;
      else {
        for (var m = !1, y = r.child; y; ) {
          if (y === n) {
            m = !0, n = r, i = o;
            break;
          }
          if (y === i) {
            m = !0, i = r, n = o;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = o.child; y; ) {
            if (y === n) {
              m = !0, n = o, i = r;
              break;
            }
            if (y === i) {
              m = !0, i = o, n = r;
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
  function p(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t;
    for (t = t.child; t !== null; ) {
      if (e = p(t), e !== null) return e;
      t = t.sibling;
    }
    return null;
  }
  function _(t, e, n, i, r, o) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, i, r, o) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && _(
        t.child,
        e,
        n,
        i,
        r,
        o
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
  function O(t) {
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
  var G = null, q = null;
  function k(t, e, n) {
    return t === n ? !0 : t === e ? (G = t, !0) : !1;
  }
  function L(t, e, n) {
    return t === n ? (q = t, !1) : t === e ? (q !== null && (G = t), !0) : !1;
  }
  function D(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function J(t, e, n) {
    for (var i = 0, r = t; r; r = n(r)) i++;
    r = 0;
    for (var o = e; o; o = n(o)) r++;
    for (; 0 < i - r; ) t = n(t), i--;
    for (; 0 < r - i; ) e = n(e), r--;
    for (; i--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var C = Object.assign, F = /* @__PURE__ */ Symbol.for("react.element"), Z = /* @__PURE__ */ Symbol.for("react.transitional.element"), Y = /* @__PURE__ */ Symbol.for("react.portal"), vt = /* @__PURE__ */ Symbol.for("react.fragment"), $ = /* @__PURE__ */ Symbol.for("react.strict_mode"), yt = /* @__PURE__ */ Symbol.for("react.profiler"), gt = /* @__PURE__ */ Symbol.for("react.consumer"), tt = /* @__PURE__ */ Symbol.for("react.context"), V = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), rt = /* @__PURE__ */ Symbol.for("react.memo"), x = /* @__PURE__ */ Symbol.for("react.lazy"), ft = /* @__PURE__ */ Symbol.for("react.activity"), z = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Ht = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), E = /* @__PURE__ */ Symbol.for("react.view_transition"), A = /* @__PURE__ */ Symbol.for("react.recoverable"), W = Symbol.iterator;
  function j(t) {
    return t === null || typeof t != "object" ? null : (t = W && t[W] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var pt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function dt(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === pt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case vt:
        return "Fragment";
      case yt:
        return "Profiler";
      case $:
        return "StrictMode";
      case P:
        return "Suspense";
      case I:
        return "SuspenseList";
      case ft:
        return "Activity";
      case E:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Y:
          return "Portal";
        case tt:
          return t.displayName || "Context";
        case gt:
          return (t._context.displayName || "Context") + ".Consumer";
        case V:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case rt:
          return e = t.displayName || null, e !== null ? e : dt(t.type) || "Memo";
        case x:
          e = t._payload, t = t._init;
          try {
            return dt(t(e));
          } catch {
          }
      }
    return null;
  }
  var zt = Array.isArray, ot = l.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ct = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, wt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ut = [], St = -1;
  function xt(t) {
    return { current: t };
  }
  function N(t) {
    0 > St || (t.current = ut[St], ut[St] = null, St--);
  }
  function mt(t, e) {
    St++, ut[St] = t.current, t.current = e;
  }
  var Rt = xt(null), _t = xt(null), Mt = xt(null), Gt = xt(null);
  function Ft(t, e) {
    switch (mt(Mt, e), mt(_t, t), mt(Rt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Zv(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Zv(e), t = Kv(e, t);
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
    N(Rt), mt(Rt, t);
  }
  function Ut() {
    N(Rt), N(_t), N(Mt);
  }
  function At(t) {
    var e = t.memoizedState;
    e !== null && (gr._currentValue = e.memoizedState, mt(Gt, t)), e = Rt.current;
    var n = Kv(e, t.type);
    e !== n && (mt(_t, t), mt(Rt, n));
  }
  function Qt(t) {
    _t.current === t && (N(Rt), N(_t)), Gt.current === t && (N(Gt), gr._currentValue = wt);
  }
  var te, Xe;
  function ye(t) {
    if (te === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        te = e && e[1] || "", Xe = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + te + t + Xe;
  }
  var en = !1;
  function En(t, e) {
    if (!t || en) return "";
    en = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var i = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var nt = function() {
                throw Error();
              };
              if (Object.defineProperty(nt.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(nt, []);
                } catch (bt) {
                  var U = bt;
                }
                Reflect.construct(t, [], nt);
              } else {
                try {
                  nt.call();
                } catch (bt) {
                  U = bt;
                }
                nt = !1;
                try {
                  var Q = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), nt = !0, new t();
                } finally {
                  nt && (Q !== void 0 ? Object.defineProperty(t.prototype, "props", Q) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (bt) {
                U = bt;
              }
              (nt = t()) && typeof nt.catch == "function" && nt.catch(function() {
              });
            }
          } catch (bt) {
            if (bt && U && typeof bt.stack == "string")
              return [bt.stack, U.stack];
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
      var o = i.DetermineComponentFrameRoot(), m = o[0], y = o[1];
      if (m && y) {
        var w = m.split(`
`), H = y.split(`
`);
        for (r = i = 0; i < w.length && !w[i].includes("DetermineComponentFrameRoot"); )
          i++;
        for (; r < H.length && !H[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (i === w.length || r === H.length)
          for (i = w.length - 1, r = H.length - 1; 1 <= i && 0 <= r && w[i] !== H[r]; )
            r--;
        for (; 1 <= i && 0 <= r; i--, r--)
          if (w[i] !== H[r]) {
            if (i !== 1 || r !== 1)
              do
                if (i--, r--, 0 > r || w[i] !== H[r]) {
                  var K = `
` + w[i].replace(" at new ", " at ");
                  return t.displayName && K.includes("<anonymous>") && (K = K.replace("<anonymous>", t.displayName)), K;
                }
              while (1 <= i && 0 <= r);
            break;
          }
      }
    } finally {
      en = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? ye(n) : "";
  }
  function Se(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return ye(t.type);
      case 16:
        return ye("Lazy");
      case 13:
        return t.child !== e && e !== null ? ye("Suspense Fallback") : ye("Suspense");
      case 19:
        return ye("SuspenseList");
      case 0:
      case 15:
        return En(t.type, !1);
      case 11:
        return En(t.type.render, !1);
      case 1:
        return En(t.type, !0);
      case 31:
        return ye("Activity");
      case 30:
        return ye("ViewTransition");
      default:
        return "";
    }
  }
  function Gn(t) {
    try {
      var e = "", n = null;
      do
        e += Se(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (i) {
      return `
Error generating stack: ` + i.message + `
` + i.stack;
    }
  }
  var Re = Object.prototype.hasOwnProperty, xn = c.unstable_scheduleCallback, Ve = c.unstable_cancelCallback, Dn = c.unstable_shouldYield, Jn = c.unstable_requestPaint, Yt = c.unstable_now, Jt = c.unstable_getCurrentPriorityLevel, ee = c.unstable_ImmediatePriority, Ce = c.unstable_UserBlockingPriority, de = c.unstable_NormalPriority, Nn = c.unstable_LowPriority, Ke = c.unstable_IdlePriority, Fe = c.log, st = c.unstable_setDisableYieldValue, lt = null, at = null;
  function Tt(t) {
    if (typeof Fe == "function" && st(t), at && typeof at.setStrictMode == "function")
      try {
        at.setStrictMode(lt, t);
      } catch {
      }
  }
  var it = Math.clz32 ? Math.clz32 : Ot, ht = Math.log, Et = Math.LN2;
  function Ot(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ht(t) / Et | 0) | 0;
  }
  var qt = 256, Dt = 262144, Vt = 4194304;
  function re(t) {
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
    var r = 0, o = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var y = i & 134217727;
    return y !== 0 ? (i = y & ~o, i !== 0 ? r = re(i) : (m &= y, m !== 0 ? r = re(m) : n || (n = y & ~t, n !== 0 && (r = re(n))))) : (y = i & ~o, y !== 0 ? r = re(y) : m !== 0 ? r = re(m) : n || (n = i & ~t, n !== 0 && (r = re(n)))), r === 0 ? 0 : e !== 0 && e !== r && (e & o) === 0 && (o = r & -r, n = e & -e, o >= n || o === 32 && (n & 4194048) !== 0) ? e : r;
  }
  function Zt(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Pt(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var i = 31 - it(n), r = 1 << i;
        e |= t[i], n &= ~r;
      }
    return e;
  }
  function ze(t, e) {
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
  function ge() {
    var t = Vt;
    return Vt <<= 1, (Vt & 62914560) === 0 && (Vt = 4194304), t;
  }
  function Ge(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function ke(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function De(t, e, n, i, r, o) {
    var m = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var y = t.entanglements, w = t.expirationTimes, H = t.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var K = 31 - it(n), nt = 1 << K;
      y[K] = 0, w[K] = -1;
      var U = H[K];
      if (U !== null)
        for (H[K] = null, K = 0; K < U.length; K++) {
          var Q = U[K];
          Q !== null && (Q.lane &= -536870913);
        }
      n &= ~nt;
    }
    i !== 0 && Le(t, i, 0), o !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(m & ~e));
  }
  function Le(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var i = 31 - it(e);
    t.entangledLanes |= e, t.entanglements[i] = t.entanglements[i] | 1073741824 | n & 261930;
  }
  function ve(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var i = 31 - it(n), r = 1 << i;
      r & e | t[i] & e && (t[i] |= e), n &= ~r;
    }
  }
  function Ti(t, e) {
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
  function Je(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ye() {
    var t = ct.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : R_(t.type));
  }
  function Mn(t, e) {
    var n = ct.p;
    try {
      return ct.p = t, e();
    } finally {
      ct.p = n;
    }
  }
  var on = Math.random().toString(36).slice(2), je = "__reactFiber$" + on, qe = "__reactProps$" + on, nn = "__reactContainer$" + on, Ei = "__reactEvents$" + on, al = "__reactListeners$" + on, si = "__reactHandles$" + on, Vr = "__reactResources$" + on, ln = "__reactMarker$" + on, an = "__reactLoad$" + on;
  function $n(t) {
    delete t[je], delete t[qe], delete t[al], delete t[si];
  }
  function Pn(t) {
    var e;
    if (e = t[je]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[nn] || n[je]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = o_(t); t !== null; ) {
            if (n = t[je]) return n;
            t = o_(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function ji(t) {
    if (t = t[je] || t[nn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Za(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(a(33));
  }
  function gl(t) {
    var e = t[Vr];
    return e || (e = t[Vr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function cn(t) {
    t[ln] = !0;
  }
  function wm(t) {
    t[an] = void 0;
  }
  var Am = /* @__PURE__ */ new Set(), Om = {};
  function Ka(t, e) {
    Du(t, e), Du(t + "Capture", e);
  }
  function Du(t, e) {
    for (Om[t] = e, t = 0; t < e.length; t++)
      Am.add(e[t]);
  }
  var CS = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), Rm = {}, Cm = {};
  function zS(t) {
    return Re.call(Cm, t) ? !0 : Re.call(Rm, t) ? !1 : CS.test(t) ? Cm[t] = !0 : (Rm[t] = !0, !1);
  }
  var pe = !1;
  function zm() {
    var t = pe;
    return pe = !1, t;
  }
  function So(t, e, n) {
    if (zS(e))
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
  function bo(t, e, n) {
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
  function xi(t) {
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
  function Dm(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function DS(t, e, n) {
    var i = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof i < "u" && typeof i.get == "function" && typeof i.set == "function") {
      var r = i.get, o = i.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          n = "" + m, o.call(this, m);
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
  function Bf(t) {
    if (!t._valueTracker) {
      var e = Dm(t) ? "checked" : "value";
      t._valueTracker = DS(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Nm(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), i = "";
    return t && (i = Dm(t) ? t.checked ? "true" : "false" : t.value), t = i, t !== n ? (e.setValue(t), !0) : !1;
  }
  var NS = /[\n"\\]/g;
  function Qi(t) {
    return t.replace(
      NS,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function Hf(t, e, n, i, r, o, m, y) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + xi(e)) : t.value !== "" + xi(e) && (t.value = "" + xi(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? m === "number" && t.value == e ? Lf(t, xi(t.value)) : Lf(t, xi(e)) : n != null ? Lf(t, xi(n)) : i != null && t.removeAttribute("value"), r == null && o != null && (t.defaultChecked = !!o), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + xi(y) : t.removeAttribute("name");
  }
  function Um(t, e, n, i, r, o, m, y) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.type = o), e != null || n != null) {
      if (!(o !== "submit" && o !== "reset" || e != null)) {
        Bf(t);
        return;
      }
      n = n != null ? "" + xi(n) : "", e = e != null ? "" + xi(e) : n, y || e === t.value || (t.value = e), t.defaultValue = e;
    }
    i = i ?? r, i = typeof i != "function" && typeof i != "symbol" && !!i, t.checked = y ? t.checked : !!i, t.defaultChecked = !!i, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), Bf(t);
  }
  function Lf(t, e) {
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
      for (n = "" + xi(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          t[r].selected = !0, i && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function Bm(t, e, n) {
    if (e != null && (e = "" + xi(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + xi(n) : "";
  }
  function Hm(t, e, n, i) {
    if (e == null) {
      if (i != null) {
        if (n != null) throw Error(a(92));
        if (zt(i)) {
          if (1 < i.length) throw Error(a(93));
          i = i[0];
        }
        n = i;
      }
      n == null && (n = ""), e = n;
    }
    n = xi(e), t.defaultValue = n, i = t.textContent, i === n && i !== "" && i !== null && (t.value = i), Bf(t);
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
  var US = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function Lm(t, e, n) {
    var i = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? i ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : i ? t.setProperty(e, n) : typeof n != "number" || n === 0 || US.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Ym(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(a(62));
    if (t = t.style, n != null) {
      for (var i in n)
        !n.hasOwnProperty(i) || e != null && e.hasOwnProperty(i) || (i.indexOf("--") === 0 ? t.setProperty(i, "") : i === "float" ? t.cssFloat = "" : t[i] = "", pe = !0);
      for (var r in e)
        i = e[r], e.hasOwnProperty(r) && n[r] !== i && (Lm(t, r, i), pe = !0);
    } else
      for (var o in e)
        e.hasOwnProperty(o) && Lm(t, o, e[o]);
  }
  function Yf(t) {
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
  var BS = /* @__PURE__ */ new Map([
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
  ]), HS = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function To(t) {
    return HS.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function pl() {
  }
  var qf = null;
  function Xf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Bu = null, Hu = null;
  function qm(t) {
    var e = ji(t);
    if (e && (t = e.stateNode)) {
      var n = t[qe] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (Hf(
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
                var r = i[qe] || null;
                if (!r) throw Error(a(90));
                Hf(
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
              i = n[e], i.form === t.form && Nm(i);
          }
          break t;
        case "textarea":
          Bm(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Nu(t, !!n.multiple, e, !1);
      }
    }
  }
  var Vf = !1;
  function Xm(t, e, n) {
    if (Vf) return t(e, n);
    Vf = !0;
    try {
      var i = t(e);
      return i;
    } finally {
      if (Vf = !1, (Bu !== null || Hu !== null) && (Tc(), Bu && (e = Bu, t = Hu, Hu = Bu = null, qm(e), t)))
        for (e = 0; e < t.length; e++) qm(t[e]);
    }
  }
  function Gr(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var i = n[qe] || null;
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
  var Bl = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Gf = !1;
  if (Bl)
    try {
      var jr = {};
      Object.defineProperty(jr, "passive", {
        get: function() {
          Gf = !0;
        }
      }), window.addEventListener("test", jr, jr), window.removeEventListener("test", jr, jr);
    } catch {
      Gf = !1;
    }
  var ea = null, jf = null, Eo = null;
  function Vm() {
    if (Eo) return Eo;
    var t, e = jf, n = e.length, i, r = "value" in ea ? ea.value : ea.textContent, o = r.length;
    for (t = 0; t < n && e[t] === r[t]; t++) ;
    var m = n - t;
    for (i = 1; i <= m && e[n - i] === r[o - i]; i++) ;
    return Eo = r.slice(t, 1 < i ? 1 - i : void 0);
  }
  function xo(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function Mo() {
    return !0;
  }
  function Gm() {
    return !1;
  }
  function Wn(t) {
    function e(n, i, r, o, m) {
      this._reactName = n, this._targetInst = r, this.type = i, this.nativeEvent = o, this.target = m, this.currentTarget = null;
      for (var y in t)
        t.hasOwnProperty(y) && (n = t[y], this[y] = n ? n(o) : o[y]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? Mo : Gm, this.isPropagationStopped = Gm, this;
    }
    return C(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Mo);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Mo);
      },
      persist: function() {
      },
      isPersistent: Mo
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
  }, wo = Wn(na), Qr = C({}, na, { view: 0, detail: 0 }), LS = Wn(Qr), Qf, Zf, Zr, Ao = C({}, Qr, {
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
    getModifierState: Ff,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== Zr && (Zr && t.type === "mousemove" ? (Qf = t.screenX - Zr.screenX, Zf = t.screenY - Zr.screenY) : Zf = Qf = 0, Zr = t), Qf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Zf;
    }
  }), jm = Wn(Ao), YS = C({}, Ao, { dataTransfer: 0 }), qS = Wn(YS), XS = C({}, Qr, { relatedTarget: 0 }), Kf = Wn(XS), VS = C({}, na, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), GS = Wn(VS), jS = C({}, na, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), QS = Wn(jS), ZS = C({}, na, { data: 0 }), Qm = Wn(ZS), KS = {
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
  }, FS = {
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
  }, kS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function JS(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = kS[t]) ? !!e[t] : !1;
  }
  function Ff() {
    return JS;
  }
  var $S = C({}, Qr, {
    key: function(t) {
      if (t.key) {
        var e = KS[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = xo(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? FS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ff,
    charCode: function(t) {
      return t.type === "keypress" ? xo(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? xo(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), PS = Wn($S), WS = C({}, Ao, {
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
  }), Zm = Wn(WS), IS = C({}, na, { submitter: 0 }), tb = Wn(IS), eb = C({}, Qr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ff
  }), nb = Wn(eb), ib = C({}, na, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), lb = Wn(ib), ab = C({}, Ao, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), ub = Wn(ab), rb = C({}, na, {
    newState: 0,
    oldState: 0,
    source: 0
  }), sb = Wn(rb), ob = [9, 13, 27, 32], kf = Bl && "CompositionEvent" in window, Kr = null;
  Bl && "documentMode" in document && (Kr = document.documentMode);
  var cb = Bl && "TextEvent" in window && !Kr, Km = Bl && (!kf || Kr && 8 < Kr && 11 >= Kr), Fm = " ", km = !1;
  function Jm(t, e) {
    switch (t) {
      case "keyup":
        return ob.indexOf(e.keyCode) !== -1;
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
  function $m(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Lu = !1;
  function fb(t, e) {
    switch (t) {
      case "compositionend":
        return $m(e);
      case "keypress":
        return e.which !== 32 ? null : (km = !0, Fm);
      case "textInput":
        return t = e.data, t === Fm && km ? null : t;
      default:
        return null;
    }
  }
  function hb(t, e) {
    if (Lu)
      return t === "compositionend" || !kf && Jm(t, e) ? (t = Vm(), Eo = jf = ea = null, Lu = !1, t) : null;
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
        return Km && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var db = {
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
  function Pm(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!db[t.type] : e === "textarea";
  }
  function Wm(t, e, n, i) {
    Bu ? Hu ? Hu.push(i) : Hu = [i] : Bu = i, e = Oc(e, "onChange"), 0 < e.length && (n = new wo(
      "onChange",
      "change",
      null,
      n,
      i
    ), t.push({ event: n, listeners: e }));
  }
  var Fr = null, kr = null;
  function mb(t) {
    qv(t, 0);
  }
  function Oo(t) {
    var e = Za(t);
    if (Nm(e)) return t;
  }
  function Im(t, e) {
    if (t === "change") return e;
  }
  var tg = !1;
  if (Bl) {
    var Jf;
    if (Bl) {
      var $f = "oninput" in document;
      if (!$f) {
        var eg = document.createElement("div");
        eg.setAttribute("oninput", "return;"), $f = typeof eg.oninput == "function";
      }
      Jf = $f;
    } else Jf = !1;
    tg = Jf && (!document.documentMode || 9 < document.documentMode);
  }
  function ng() {
    Fr && (Fr.detachEvent("onpropertychange", ig), kr = Fr = null);
  }
  function ig(t) {
    if (t.propertyName === "value" && Oo(kr)) {
      var e = [];
      Wm(
        e,
        kr,
        t,
        Xf(t)
      ), Xm(mb, e);
    }
  }
  function gb(t, e, n) {
    t === "focusin" ? (ng(), Fr = e, kr = n, Fr.attachEvent("onpropertychange", ig)) : t === "focusout" && ng();
  }
  function pb(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return Oo(kr);
  }
  function vb(t, e) {
    if (t === "click") return Oo(e);
  }
  function _b(t, e) {
    if (t === "input" || t === "change")
      return Oo(e);
  }
  function yb(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var Mi = typeof Object.is == "function" ? Object.is : yb;
  function Jr(t, e) {
    if (Mi(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), i = Object.keys(e);
    if (n.length !== i.length) return !1;
    for (i = 0; i < n.length; i++) {
      var r = n[i];
      if (!Re.call(e, r) || !Mi(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  function Pf(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function lg(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function ag(t, e) {
    var n = lg(t);
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
      n = lg(n);
    }
  }
  function ug(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? ug(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function rg(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Pf(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Pf(t.document);
    }
    return e;
  }
  function Wf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var Sb = Bl && "documentMode" in document && 11 >= document.documentMode, Yu = null, If = null, $r = null, th = !1;
  function sg(t, e, n) {
    var i = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    th || Yu == null || Yu !== Pf(i) || (i = Yu, "selectionStart" in i && Wf(i) ? i = { start: i.selectionStart, end: i.selectionEnd } : (i = (i.ownerDocument && i.ownerDocument.defaultView || window).getSelection(), i = {
      anchorNode: i.anchorNode,
      anchorOffset: i.anchorOffset,
      focusNode: i.focusNode,
      focusOffset: i.focusOffset
    }), $r && Jr($r, i) || ($r = i, i = Oc(If, "onSelect"), 0 < i.length && (e = new wo(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: i }), e.target = Yu)));
  }
  function Fa(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var qu = {
    animationend: Fa("Animation", "AnimationEnd"),
    animationiteration: Fa("Animation", "AnimationIteration"),
    animationstart: Fa("Animation", "AnimationStart"),
    transitionrun: Fa("Transition", "TransitionRun"),
    transitionstart: Fa("Transition", "TransitionStart"),
    transitioncancel: Fa("Transition", "TransitionCancel"),
    transitionend: Fa("Transition", "TransitionEnd")
  }, eh = {}, og = {};
  Bl && (og = document.createElement("div").style, "AnimationEvent" in window || (delete qu.animationend.animation, delete qu.animationiteration.animation, delete qu.animationstart.animation), "TransitionEvent" in window || delete qu.transitionend.transition);
  function ka(t) {
    if (eh[t]) return eh[t];
    if (!qu[t]) return t;
    var e = qu[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in og)
        return eh[t] = e[n];
    return t;
  }
  var cg = ka("animationend"), fg = ka("animationiteration"), hg = ka("animationstart"), bb = ka("transitionrun"), Tb = ka("transitionstart"), Eb = ka("transitioncancel"), dg = ka("transitionend"), mg = /* @__PURE__ */ new Map(), nh = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  nh.push("scrollEnd");
  function ul(t, e) {
    mg.set(t, e), Ka(e, [t]);
  }
  var xb = 0;
  function Hl(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = cl.identifierPrefix;
    var n = xb++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function gg(t) {
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
    return t = gg(t), e = gg(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var Ro = typeof reportError == "function" ? reportError : function(t) {
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
  }, Zi = [], Xu = 0, ih = 0;
  function Co() {
    for (var t = Xu, e = ih = Xu = 0; e < t; ) {
      var n = Zi[e];
      Zi[e++] = null;
      var i = Zi[e];
      Zi[e++] = null;
      var r = Zi[e];
      Zi[e++] = null;
      var o = Zi[e];
      if (Zi[e++] = null, i !== null && r !== null) {
        var m = i.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), i.pending = r;
      }
      o !== 0 && pg(n, r, o);
    }
  }
  function zo(t, e, n, i) {
    Zi[Xu++] = t, Zi[Xu++] = e, Zi[Xu++] = n, Zi[Xu++] = i, ih |= i, t.lanes |= i, t = t.alternate, t !== null && (t.lanes |= i);
  }
  function lh(t, e, n, i) {
    return zo(t, e, n, i), Do(t);
  }
  function Ja(t, e) {
    return zo(t, null, null, e), Do(t);
  }
  function pg(t, e, n) {
    t.lanes |= n;
    var i = t.alternate;
    i !== null && (i.lanes |= n);
    for (var r = !1, o = t.return; o !== null; )
      o.childLanes |= n, i = o.alternate, i !== null && (i.childLanes |= n), o.tag === 22 && (t = o.stateNode, t === null || t._visibility & 1 || (r = !0)), t = o, o = o.return;
    return t.tag === 3 ? (o = t.stateNode, r && e !== null && (r = 31 - it(n), t = o.hiddenUpdates, i = t[r], i === null ? t[r] = [e] : i.push(e), e.lane = n | 536870912), o) : null;
  }
  function Do(t) {
    if (50 < _s)
      throw _s = 0, bc = null, Error(a(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Vu = {};
  function Mb(t, e, n, i) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = i, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function oi(t, e, n, i) {
    return new Mb(t, e, n, i);
  }
  function ah(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Yl(t, e) {
    var n = t.alternate;
    return n === null ? (n = oi(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function vg(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function No(t, e, n, i, r, o) {
    var m = 0;
    if (i = t, typeof i == "function") ah(i) && (m = 1);
    else if (typeof i == "string")
      m = I2(
        t,
        n,
        Rt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (i) {
        case ft:
          return t = oi(31, n, e, r), t.elementType = ft, t.lanes = o, t;
        case vt:
          return $a(n.children, r, o, e);
        case $:
          m = 8, r |= 24;
          break;
        case yt:
          return t = oi(12, n, e, r | 2), t.elementType = yt, t.lanes = o, t;
        case P:
          return t = oi(13, n, e, r), t.elementType = P, t.lanes = o, t;
        case I:
          return t = oi(19, n, e, r), t.elementType = I, t.lanes = o, t;
        case z:
        case E:
          return t = r | 32, t = oi(30, n, e, t), t.elementType = E, t.lanes = o, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof i == "object" && i !== null)
            switch (i.$$typeof) {
              case tt:
                m = 10;
                break t;
              case gt:
                m = 9;
                break t;
              case V:
                m = 11;
                break t;
              case rt:
                m = 14;
                break t;
              case x:
                m = 16, i = null;
                break t;
            }
          m = 29, n = Error(
            a(130, t === null ? "null" : typeof t, "")
          ), i = null;
      }
    return e = oi(m, n, e, r), e.elementType = t, e.type = i, e.lanes = o, e;
  }
  function $a(t, e, n, i) {
    return t = oi(7, t, i, e), t.lanes = n, t;
  }
  function uh(t, e, n) {
    return t = oi(6, t, null, e), t.lanes = n, t;
  }
  function _g(t) {
    var e = oi(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function rh(t, e, n) {
    return e = oi(
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
  var yg = /* @__PURE__ */ new WeakMap();
  function Ki(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = yg.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Gn(e)
      }, yg.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Gn(e)
    };
  }
  var Gu = [], ju = 0, Uo = null, Pr = 0, Fi = [], ki = 0, ia = null, vl = 1, _l = "";
  function ql(t, e) {
    Gu[ju++] = Pr, Gu[ju++] = Uo, Uo = t, Pr = e;
  }
  function Sg(t, e, n) {
    Fi[ki++] = vl, Fi[ki++] = _l, Fi[ki++] = ia, ia = t;
    var i = vl;
    t = _l;
    var r = 32 - it(i) - 1;
    i &= ~(1 << r), n += 1;
    var o = 32 - it(e) + r;
    if (30 < o) {
      var m = r - r % 5;
      o = (i & (1 << m) - 1).toString(32), i >>= m, r -= m, vl = 1 << 32 - it(e) + r | n << r | i, _l = o + t;
    } else
      vl = 1 << o | n << r | i, _l = t;
  }
  function Bo(t) {
    t.return !== null && (ql(t, 1), Sg(t, 1, 0));
  }
  function sh(t) {
    for (; t === Uo; )
      Uo = Gu[--ju], Gu[ju] = null, Pr = Gu[--ju], Gu[ju] = null;
    for (; t === ia; )
      ia = Fi[--ki], Fi[ki] = null, _l = Fi[--ki], Fi[ki] = null, vl = Fi[--ki], Fi[ki] = null;
  }
  function bg(t, e) {
    Fi[ki++] = vl, Fi[ki++] = _l, Fi[ki++] = ia, vl = e.id, _l = e.overflow, ia = t;
  }
  var wn = null, Be = null, ne = !1, la = null, Ji = !1, oh = Error(a(519));
  function aa(t) {
    var e = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Wr(Ki(e, t)), oh;
  }
  function Tg(t) {
    var e = t.stateNode, n = t.type, i = t.memoizedProps;
    switch (e[je] = t, e[qe] = i, n) {
      case "dialog":
        oe("cancel", e), oe("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        oe("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < Ss.length; n++)
          oe(Ss[n], e);
        break;
      case "source":
        oe("error", e);
        break;
      case "img":
      case "image":
      case "link":
        oe("error", e), oe("load", e);
        break;
      case "details":
        oe("toggle", e);
        break;
      case "input":
        oe("invalid", e), Um(
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
        oe("invalid", e);
        break;
      case "textarea":
        oe("invalid", e), Hm(e, i.value, i.defaultValue, i.children);
    }
    n = i.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || i.suppressHydrationWarning === !0 || jv(e.textContent, n) ? (i.popover != null && (oe("beforetoggle", e), oe("toggle", e)), i.onScroll != null && oe("scroll", e), i.onScrollEnd != null && oe("scrollend", e), i.onClick != null && (e.onclick = pl), e = !0) : e = !1, e || aa(t, !0);
  }
  function Ho(t) {
    for (wn = t.return; wn; )
      switch (wn.tag) {
        case 5:
        case 31:
        case 13:
          Ji = !1;
          return;
        case 27:
        case 3:
          Ji = !0;
          return;
        default:
          wn = wn.return;
      }
  }
  function Qu(t) {
    if (t !== wn) return !1;
    if (!ne) return Ho(t), ne = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || qd(t.type, t.memoizedProps)), n = !n), n && Be && aa(t), Ho(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      Be = s_(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      Be = s_(t);
    } else
      e === 27 ? (e = Be, ba(t.type) ? (t = kd, kd = null, Be = t) : Be = e) : Be = wn ? Pi(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Pa() {
    Be = wn = null, ne = !1;
  }
  function ch() {
    var t = la;
    return t !== null && (hi === null ? hi = t : hi.push.apply(
      hi,
      t
    ), la = null), t;
  }
  function Wr(t) {
    la === null ? la = [t] : la.push(t);
  }
  var fh = xt(null), Wa = null, Xl = null;
  function ua(t, e, n) {
    mt(fh, e._currentValue), e._currentValue = n;
  }
  function Vl(t) {
    t._currentValue = fh.current, N(fh);
  }
  function Lo(t, e, n) {
    for (; t !== null; ) {
      var i = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, i !== null && (i.childLanes |= e)) : i !== null && (i.childLanes & e) !== e && (i.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function hh(t, e, n, i) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var o = r.dependencies;
      if (o !== null) {
        var m = r.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var y = o;
          o = r;
          for (var w = 0; w < e.length; w++)
            if (y.context === e[w]) {
              o.lanes |= n, y = o.alternate, y !== null && (y.lanes |= n), Lo(
                o.return,
                n,
                t
              ), i || (m = null);
              break t;
            }
          o = y.next;
        }
      } else if (r.tag === 18) {
        if (m = r.return, m === null) throw Error(a(341));
        m.lanes |= n, o = m.alternate, o !== null && (o.lanes |= n), Lo(m, n, t), m = null;
      } else
        r.tag === 13 && r.memoizedState !== null && r.memoizedState.dehydrated === null ? (r.lanes |= n, m = r.alternate, m !== null && (m.lanes |= n), Lo(
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
  function Ia(t, e, n, i) {
    t = null;
    for (var r = e, o = !1; r !== null; ) {
      if (!o) {
        if ((r.flags & 524288) !== 0) o = !0;
        else if ((r.flags & 262144) !== 0) break;
      }
      if (r.tag === 10) {
        var m = r.alternate;
        if (m === null) throw Error(a(387));
        if (m = m.memoizedProps, m !== null) {
          var y = r.type;
          Mi(r.pendingProps.value, m.value) || (t !== null ? t.push(y) : t = [y]);
        }
      } else if (r === Gt.current) {
        if (m = r.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(gr) : t = [gr]);
      }
      r = r.return;
    }
    return t !== null && hh(
      e,
      t,
      n,
      i
    ), e.flags |= 262144, t !== null;
  }
  function Yo(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Mi(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function tu(t) {
    Wa = t, Xl = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function Un(t) {
    return Eg(Wa, t);
  }
  function qo(t, e) {
    return Wa === null && tu(t), Eg(t, e);
  }
  function Eg(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Xl === null) {
      if (t === null) throw Error(a(308));
      Xl = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Xl = Xl.next = e;
    return n;
  }
  var wb = typeof AbortController < "u" ? AbortController : function() {
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
  }, Ab = c.unstable_scheduleCallback, Ob = c.unstable_NormalPriority, mn = {
    $$typeof: tt,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function dh() {
    return {
      controller: new wb(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Ir(t) {
    t.refCount--, t.refCount === 0 && Ab(Ob, function() {
      t.controller.abort();
    });
  }
  function xg(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var i = e[t];
        n.indexOf(i) === -1 && n.push(i);
      }
    }
  }
  var ts = null;
  function Rb(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var es = null, mh = 0, eu = 0, Zu = null;
  function Cb(t, e) {
    if (es === null) {
      var n = es = [];
      mh = 0, eu = Cd(), Zu = {
        status: "pending",
        value: void 0,
        then: function(i) {
          n.push(i);
        }
      };
    }
    return mh++, e.then(Mg, Mg), e;
  }
  function Mg() {
    if (--mh === 0 && (ts = null, es !== null)) {
      Zu !== null && (Zu.status = "fulfilled");
      var t = es;
      es = null, eu = 0, Zu = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function zb(t, e) {
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
  var wg = ot.S;
  ot.S = function(t, e) {
    if (_v = Yt(), typeof e == "object" && e !== null && typeof e.then == "function" && Cb(t, e), ts !== null)
      for (var n = or; n !== null; )
        xg(n, ts), n = n.next;
    if (n = t.types, n !== null) {
      for (var i = or; i !== null; )
        xg(i, n), i = i.next;
      if (eu !== 0) {
        i = ts, i === null && (i = ts = []);
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          i.indexOf(o) === -1 && i.push(o);
        }
      }
    }
    wg !== null && wg(t, e);
  };
  var nu = xt(null);
  function gh() {
    var t = nu.current;
    return t !== null ? t : Ne.pooledCache;
  }
  function Xo(t, e) {
    e === null ? mt(nu, nu.current) : mt(nu, e.pool);
  }
  function Ag() {
    var t = gh();
    return t === null ? null : { parent: mn._currentValue, pool: t };
  }
  var Ku = Error(a(460)), ph = Error(a(474)), Vo = Error(a(542)), Go = { then: function() {
  } };
  function Og(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function Rg(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(pl, pl), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, zg(t), t === void 0 && !("reason" in e) ? Error(a(600)) : t;
      default:
        if (typeof e.status == "string") e.then(pl, pl);
        else {
          if (t = Ne, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, zg(t), t;
        }
        throw lu = e, Ku;
    }
  }
  function iu(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (lu = n, Ku) : n;
    }
  }
  var lu = null;
  function Cg() {
    if (lu === null) throw Error(a(459));
    var t = lu;
    return lu = null, t;
  }
  function zg(t) {
    if (t === Ku || t === Vo)
      throw Error(a(483));
  }
  var Fu = null, ns = 0;
  function jo(t) {
    var e = ns;
    return ns += 1, Fu === null && (Fu = []), Rg(Fu, t, e);
  }
  function ra(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Qo(t, e) {
    throw e.$$typeof === F ? Error(a(525)) : (t = Object.prototype.toString.call(e), Error(
      a(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function Dg(t) {
    function e(B, R) {
      if (t) {
        var X = B.deletions;
        X === null ? (B.deletions = [R], B.flags |= 16) : X.push(R);
      }
    }
    function n(B, R) {
      if (!t) return null;
      for (; R !== null; )
        e(B, R), R = R.sibling;
      return null;
    }
    function i(B) {
      for (var R = /* @__PURE__ */ new Map(); B !== null; )
        B.key === null ? R.set(B.index, B) : R.set(B.key, B), B = B.sibling;
      return R;
    }
    function r(B, R) {
      return B = Yl(B, R), B.index = 0, B.sibling = null, B;
    }
    function o(B, R, X) {
      return B.index = X, t ? (X = B.alternate, X !== null ? (X = X.index, X < R ? (B.flags |= 2, R) : X) : (B.flags |= 134217730, R)) : (B.flags |= 1048576, R);
    }
    function m(B) {
      return t && B.alternate === null && (B.flags |= 134217730), B;
    }
    function y(B, R, X, et) {
      return R === null || R.tag !== 6 ? (R = uh(X, B.mode, et), R.return = B, R) : (R = r(R, X), R.return = B, R);
    }
    function w(B, R, X, et) {
      var Ct = X.type;
      return Ct === vt ? (B = K(
        B,
        R,
        X.props.children,
        et,
        X.key
      ), ra(B, X), B) : R !== null && (R.elementType === Ct || typeof Ct == "object" && Ct !== null && Ct.$$typeof === x && iu(Ct) === R.type) ? (R = r(R, X.props), ra(R, X), R.return = B, R) : (R = No(
        X.type,
        X.key,
        X.props,
        null,
        B.mode,
        et
      ), ra(R, X), R.return = B, R);
    }
    function H(B, R, X, et) {
      return R === null || R.tag !== 4 || R.stateNode.containerInfo !== X.containerInfo || R.stateNode.implementation !== X.implementation ? (R = rh(X, B.mode, et), R.return = B, R) : (R = r(R, X.children || []), R.return = B, R);
    }
    function K(B, R, X, et, Ct) {
      return R === null || R.tag !== 7 ? (R = $a(
        X,
        B.mode,
        et,
        Ct
      ), R.return = B, R) : (R = r(R, X), R.return = B, R);
    }
    function nt(B, R, X) {
      if (typeof R == "string" && R !== "" || typeof R == "number" || typeof R == "bigint")
        return R = uh(
          "" + R,
          B.mode,
          X
        ), R.return = B, R;
      if (typeof R == "object" && R !== null) {
        switch (R.$$typeof) {
          case Z:
            return X = No(
              R.type,
              R.key,
              R.props,
              null,
              B.mode,
              X
            ), ra(X, R), X.return = B, X;
          case Y:
            return R = rh(
              R,
              B.mode,
              X
            ), R.return = B, R;
          case x:
            return R = iu(R), nt(B, R, X);
        }
        if (zt(R) || j(R))
          return R = $a(
            R,
            B.mode,
            X,
            null
          ), R.return = B, R;
        if (typeof R.then == "function")
          return nt(B, jo(R), X);
        if (R.$$typeof === tt)
          return nt(
            B,
            qo(B, R),
            X
          );
        Qo(B, R);
      }
      return null;
    }
    function U(B, R, X, et) {
      var Ct = R !== null ? R.key : null;
      if (typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint")
        return Ct !== null ? null : y(B, R, "" + X, et);
      if (typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case Z:
            return X.key === Ct ? w(B, R, X, et) : null;
          case Y:
            return X.key === Ct ? H(B, R, X, et) : null;
          case x:
            return X = iu(X), U(B, R, X, et);
        }
        if (zt(X) || j(X))
          return Ct !== null ? null : K(B, R, X, et, null);
        if (typeof X.then == "function")
          return U(
            B,
            R,
            jo(X),
            et
          );
        if (X.$$typeof === tt)
          return U(
            B,
            R,
            qo(B, X),
            et
          );
        Qo(B, X);
      }
      return null;
    }
    function Q(B, R, X, et, Ct) {
      if (typeof et == "string" && et !== "" || typeof et == "number" || typeof et == "bigint")
        return B = B.get(X) || null, y(R, B, "" + et, Ct);
      if (typeof et == "object" && et !== null) {
        switch (et.$$typeof) {
          case Z:
            return B = B.get(
              et.key === null ? X : et.key
            ) || null, w(R, B, et, Ct);
          case Y:
            return B = B.get(
              et.key === null ? X : et.key
            ) || null, H(R, B, et, Ct);
          case x:
            return et = iu(et), Q(
              B,
              R,
              X,
              et,
              Ct
            );
        }
        if (zt(et) || j(et))
          return B = B.get(X) || null, K(R, B, et, Ct, null);
        if (typeof et.then == "function")
          return Q(
            B,
            R,
            X,
            jo(et),
            Ct
          );
        if (et.$$typeof === tt)
          return Q(
            B,
            R,
            X,
            qo(R, et),
            Ct
          );
        Qo(R, et);
      }
      return null;
    }
    function bt(B, R, X, et) {
      for (var Ct = null, fe = null, Lt = R, jt = R = 0, vn = null; Lt !== null && jt < X.length; jt++) {
        Lt.index > jt ? (vn = Lt, Lt = null) : vn = Lt.sibling;
        var me = U(
          B,
          Lt,
          X[jt],
          et
        );
        if (me === null) {
          Lt === null && (Lt = vn);
          break;
        }
        t && Lt && me.alternate === null && e(B, Lt), R = o(me, R, jt), fe === null ? Ct = me : fe.sibling = me, fe = me, Lt = vn;
      }
      if (jt === X.length)
        return n(B, Lt), ne && ql(B, jt), Ct;
      if (Lt === null) {
        for (; jt < X.length; jt++)
          Lt = nt(B, X[jt], et), Lt !== null && (R = o(
            Lt,
            R,
            jt
          ), fe === null ? Ct = Lt : fe.sibling = Lt, fe = Lt);
        return ne && ql(B, jt), Ct;
      }
      for (Lt = i(Lt); jt < X.length; jt++)
        vn = Q(
          Lt,
          B,
          jt,
          X[jt],
          et
        ), vn !== null && (t && (me = vn.alternate, me !== null && Lt.delete(me.key === null ? jt : me.key)), R = o(
          vn,
          R,
          jt
        ), fe === null ? Ct = vn : fe.sibling = vn, fe = vn);
      return t && Lt.forEach(function(wa) {
        return e(B, wa);
      }), ne && ql(B, jt), Ct;
    }
    function Bt(B, R, X, et) {
      if (X == null) throw Error(a(151));
      for (var Ct = null, fe = null, Lt = R, jt = R = 0, vn = null, me = X.next(); Lt !== null && !me.done; jt++, me = X.next()) {
        Lt.index > jt ? (vn = Lt, Lt = null) : vn = Lt.sibling;
        var wa = U(B, Lt, me.value, et);
        if (wa === null) {
          Lt === null && (Lt = vn);
          break;
        }
        t && Lt && wa.alternate === null && e(B, Lt), R = o(wa, R, jt), fe === null ? Ct = wa : fe.sibling = wa, fe = wa, Lt = vn;
      }
      if (me.done)
        return n(B, Lt), ne && ql(B, jt), Ct;
      if (Lt === null) {
        for (; !me.done; jt++, me = X.next())
          me = nt(B, me.value, et), me !== null && (R = o(me, R, jt), fe === null ? Ct = me : fe.sibling = me, fe = me);
        return ne && ql(B, jt), Ct;
      }
      for (Lt = i(Lt); !me.done; jt++, me = X.next())
        me = Q(Lt, B, jt, me.value, et), me !== null && (t && (vn = me.alternate, vn !== null && Lt.delete(
          vn.key === null ? jt : vn.key
        )), R = o(me, R, jt), fe === null ? Ct = me : fe.sibling = me, fe = me);
      return t && Lt.forEach(function(fT) {
        return e(B, fT);
      }), ne && ql(B, jt), Ct;
    }
    function It(B, R, X, et) {
      if (typeof X == "object" && X !== null && X.type === vt && X.key === null && X.props.ref === void 0 && (X = X.props.children), typeof X == "object" && X !== null) {
        switch (X.$$typeof) {
          case Z:
            t: {
              for (var Ct = X.key; R !== null; ) {
                if (R.key === Ct) {
                  if (Ct = X.type, Ct === vt) {
                    if (R.tag === 7) {
                      n(
                        B,
                        R.sibling
                      ), et = r(
                        R,
                        X.props.children
                      ), ra(et, X), et.return = B, B = et;
                      break t;
                    }
                  } else if (R.elementType === Ct || typeof Ct == "object" && Ct !== null && Ct.$$typeof === x && iu(Ct) === R.type) {
                    n(
                      B,
                      R.sibling
                    ), et = r(R, X.props), ra(et, X), et.return = B, B = et;
                    break t;
                  }
                  n(B, R);
                  break;
                } else e(B, R);
                R = R.sibling;
              }
              X.type === vt ? (et = $a(
                X.props.children,
                B.mode,
                et,
                X.key
              ), ra(et, X), et.return = B, B = et) : (et = No(
                X.type,
                X.key,
                X.props,
                null,
                B.mode,
                et
              ), ra(et, X), et.return = B, B = et);
            }
            return m(B);
          case Y:
            t: {
              for (Ct = X.key; R !== null; ) {
                if (R.key === Ct)
                  if (R.tag === 4 && R.stateNode.containerInfo === X.containerInfo && R.stateNode.implementation === X.implementation) {
                    n(
                      B,
                      R.sibling
                    ), et = r(R, X.children || []), et.return = B, B = et;
                    break t;
                  } else {
                    n(B, R);
                    break;
                  }
                else e(B, R);
                R = R.sibling;
              }
              et = rh(X, B.mode, et), et.return = B, B = et;
            }
            return m(B);
          case x:
            return X = iu(X), It(
              B,
              R,
              X,
              et
            );
        }
        if (zt(X))
          return bt(
            B,
            R,
            X,
            et
          );
        if (j(X)) {
          if (Ct = j(X), typeof Ct != "function") throw Error(a(150));
          return X = Ct.call(X), Bt(
            B,
            R,
            X,
            et
          );
        }
        if (typeof X.then == "function")
          return It(
            B,
            R,
            jo(X),
            et
          );
        if (X.$$typeof === tt)
          return It(
            B,
            R,
            qo(B, X),
            et
          );
        Qo(B, X);
      }
      return typeof X == "string" && X !== "" || typeof X == "number" || typeof X == "bigint" ? (X = "" + X, R !== null && R.tag === 6 ? (n(B, R.sibling), et = r(R, X), et.return = B, B = et) : (n(B, R), et = uh(X, B.mode, et), et.return = B, B = et), m(B)) : n(B, R);
    }
    return function(B, R, X, et) {
      try {
        ns = 0;
        var Ct = It(
          B,
          R,
          X,
          et
        );
        return Fu = null, Ct;
      } catch (Lt) {
        if (Lt === Ku || Lt === Vo) throw Lt;
        var fe = oi(29, Lt, null, B.mode);
        return fe.lanes = et, fe.return = B, fe;
      }
    };
  }
  var au = Dg(!0), Ng = Dg(!1), sa = !1;
  function vh(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function _h(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function oa(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ca(t, e, n) {
    var i = t.updateQueue;
    if (i === null) return null;
    if (i = i.shared, (_e & 2) !== 0) {
      var r = i.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), i.pending = e, e = Do(t), pg(t, null, n), e;
    }
    return zo(t, i, e, n), Do(t);
  }
  function is(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, ve(t, n);
    }
  }
  function yh(t, e) {
    var n = t.updateQueue, i = t.alternate;
    if (i !== null && (i = i.updateQueue, n === i)) {
      var r = null, o = null;
      if (n = n.firstBaseUpdate, n !== null) {
        do {
          var m = {
            lane: n.lane,
            tag: n.tag,
            payload: n.payload,
            callback: null,
            next: null
          };
          o === null ? r = o = m : o = o.next = m, n = n.next;
        } while (n !== null);
        o === null ? r = o = e : o = o.next = e;
      } else r = o = e;
      n = {
        baseState: i.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: o,
        shared: i.shared,
        callbacks: i.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var Sh = !1;
  function ls() {
    if (Sh) {
      var t = Zu;
      if (t !== null) throw t;
    }
  }
  function as(t, e, n, i) {
    Sh = !1;
    var r = t.updateQueue;
    sa = !1;
    var o = r.firstBaseUpdate, m = r.lastBaseUpdate, y = r.shared.pending;
    if (y !== null) {
      r.shared.pending = null;
      var w = y, H = w.next;
      w.next = null, m === null ? o = H : m.next = H, m = w;
      var K = t.alternate;
      K !== null && (K = K.updateQueue, y = K.lastBaseUpdate, y !== m && (y === null ? K.firstBaseUpdate = H : y.next = H, K.lastBaseUpdate = w));
    }
    if (o !== null) {
      var nt = r.baseState;
      m = 0, K = H = w = null, y = o;
      do {
        var U = y.lane & -536870913, Q = U !== y.lane;
        if (Q ? (ce & U) === U : (i & U) === U) {
          U !== 0 && U === eu && (Sh = !0), K !== null && (K = K.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          t: {
            var bt = t, Bt = y;
            U = e;
            var It = n;
            switch (Bt.tag) {
              case 1:
                if (bt = Bt.payload, typeof bt == "function") {
                  nt = bt.call(It, nt, U);
                  break t;
                }
                nt = bt;
                break t;
              case 3:
                bt.flags = bt.flags & -65537 | 128;
              case 0:
                if (bt = Bt.payload, U = typeof bt == "function" ? bt.call(It, nt, U) : bt, U == null) break t;
                nt = C({}, nt, U);
                break t;
              case 2:
                sa = !0;
            }
          }
          U = y.callback, U !== null && (t.flags |= 64, Q && (t.flags |= 8192), Q = r.callbacks, Q === null ? r.callbacks = [U] : Q.push(U));
        } else
          Q = {
            lane: U,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, K === null ? (H = K = Q, w = nt) : K = K.next = Q, m |= U;
        if (y = y.next, y === null) {
          if (y = r.shared.pending, y === null)
            break;
          Q = y, y = Q.next, Q.next = null, r.lastBaseUpdate = Q, r.shared.pending = null;
        }
      } while (!0);
      K === null && (w = nt), r.baseState = w, r.firstBaseUpdate = H, r.lastBaseUpdate = K, o === null && (r.shared.lanes = 0), va |= m, t.lanes = m, t.memoizedState = nt;
    }
  }
  function Ug(t, e) {
    if (typeof t != "function")
      throw Error(a(191, t));
    t.call(e);
  }
  function Bg(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        Ug(n[t], e);
  }
  var fa = xt(null), Zo = xt(0);
  function Hg(t, e) {
    t = Kl, mt(Zo, t), mt(fa, e), Kl = t | e.baseLanes;
  }
  function bh() {
    mt(Zo, Kl), mt(fa, fa.current);
  }
  function Th() {
    Kl = Zo.current, N(fa), N(Zo);
  }
  var Bn = xt(null), jn = null;
  function ha(t) {
    var e = t.alternate;
    mt(Hn, Hn.current & 1), mt(Bn, t), jn === null && (e === null || fa.current !== null || e.memoizedState !== null) && (jn = t);
  }
  function Eh(t) {
    mt(Hn, Hn.current), mt(Bn, t), jn === null && (jn = t);
  }
  function Lg(t) {
    t.tag === 22 ? (mt(Hn, Hn.current), mt(Bn, t), jn === null && (jn = t)) : da();
  }
  function da() {
    mt(Hn, Hn.current), mt(Bn, Bn.current);
  }
  function wi(t) {
    N(Bn), jn === t && (jn = null), N(Hn);
  }
  var Hn = xt(0);
  function us(t, e) {
    mt(Bn, Bn.current), mt(Hn, e);
  }
  function xh(t) {
    N(Hn), N(Bn), jn === t && (jn = null);
  }
  function Ko(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Kd(n) || Fd(n)))
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
  var Gl = 0, Wt = null, Ae = null, gn = null, Fo = !1, ku = !1, uu = !1, ko = 0, rs = 0, Ju = null, Db = 0;
  function un() {
    throw Error(a(321));
  }
  function Mh(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Mi(t[n], e[n])) return !1;
    return !0;
  }
  function wh(t, e, n, i, r, o) {
    return Gl = o, Wt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, ot.H = t === null || t.memoizedState === null ? Sp : bp, uu = !1, o = n(i, r), uu = !1, ku && (o = qg(
      e,
      n,
      i,
      r
    )), Yg(t), o;
  }
  function Yg(t) {
    ot.H = ec;
    var e = Ae !== null && Ae.next !== null;
    if (Gl = 0, gn = Ae = Wt = null, Fo = !1, rs = 0, Ju = null, e) throw Error(a(300));
    t === null || pn || (t = t.dependencies, t !== null && Yo(t) && (pn = !0));
  }
  function qg(t, e, n, i) {
    Wt = t;
    var r = 0;
    do {
      if (ku && (Ju = null), rs = 0, ku = !1, 25 <= r) throw Error(a(301));
      if (r += 1, gn = Ae = null, t.updateQueue != null) {
        var o = t.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      ot.H = Xb, o = e(n, i);
    } while (ku);
    return o;
  }
  function Nb() {
    var t = ot.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ss(e) : e, t = t.useState()[0], (Ae !== null ? Ae.memoizedState : null) !== t && (Wt.flags |= 1024), e;
  }
  function Ah() {
    var t = ko !== 0;
    return ko = 0, t;
  }
  function Oh(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function Rh(t) {
    if (Fo) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      Fo = !1;
    }
    Gl = 0, gn = Ae = Wt = null, ku = !1, rs = ko = 0, Ju = null;
  }
  function In() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return gn === null ? Wt.memoizedState = gn = t : gn = gn.next = t, gn;
  }
  function fn() {
    if (Ae === null) {
      var t = Wt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Ae.next;
    var e = gn === null ? Wt.memoizedState : gn.next;
    if (e !== null)
      gn = e, Ae = t;
    else {
      if (t === null)
        throw Wt.alternate === null ? Error(a(467)) : Error(a(310));
      Ae = t, t = {
        memoizedState: Ae.memoizedState,
        baseState: Ae.baseState,
        baseQueue: Ae.baseQueue,
        queue: Ae.queue,
        next: null
      }, gn === null ? Wt.memoizedState = gn = t : gn = gn.next = t;
    }
    return gn;
  }
  function Jo() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ss(t) {
    var e = rs;
    return rs += 1, Ju === null && (Ju = []), t = Rg(Ju, t, e), e = Wt, (gn === null ? e.memoizedState : gn.next) === null && (e = e.alternate, ot.H = e === null || e.memoizedState === null ? Sp : bp), t;
  }
  function $o(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ss(t);
      if (t.$$typeof === A) return;
      if (t.$$typeof === tt) return Un(t);
    }
    throw Error(a(438, String(t)));
  }
  function Ch(t) {
    var e = null, n = Wt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var i = Wt.alternate;
      i !== null && (i = i.updateQueue, i !== null && (i = i.memoCache, i != null && (e = {
        data: i.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Jo(), Wt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), i = 0; i < t; i++)
        n[i] = Ht;
    return e.index++, n;
  }
  function jl(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Po(t) {
    var e = fn();
    return zh(e, Ae, t);
  }
  function zh(t, e, n) {
    var i = t.queue;
    if (i === null) throw Error(a(311));
    i.lastRenderedReducer = n;
    var r = t.baseQueue, o = i.pending;
    if (o !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = o.next, o.next = m;
      }
      e.baseQueue = r = o, i.pending = null;
    }
    if (o = t.baseState, r === null) t.memoizedState = o;
    else {
      e = r.next;
      var y = m = null, w = null, H = e, K = !1;
      do {
        var nt = H.lane & -536870913;
        if (nt !== H.lane ? (ce & nt) === nt : (Gl & nt) === nt) {
          var U = H.revertLane;
          if (U === 0)
            w !== null && (w = w.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }), nt === eu && (K = !0);
          else if ((Gl & U) === U) {
            H = H.next, U === eu && (K = !0);
            continue;
          } else
            nt = {
              lane: 0,
              revertLane: H.revertLane,
              gesture: null,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            }, w === null ? (y = w = nt, m = o) : w = w.next = nt, Wt.lanes |= U, va |= U;
          nt = H.action, uu && n(o, nt), o = H.hasEagerState ? H.eagerState : n(o, nt);
        } else
          U = {
            lane: nt,
            revertLane: H.revertLane,
            gesture: H.gesture,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          }, w === null ? (y = w = U, m = o) : w = w.next = U, Wt.lanes |= nt, va |= nt;
        H = H.next;
      } while (H !== null && H !== e);
      if (w === null ? m = o : w.next = y, !Mi(o, t.memoizedState) && (pn = !0, K && (n = Zu, n !== null)))
        throw n;
      t.memoizedState = o, t.baseState = m, t.baseQueue = w, i.lastRenderedState = o;
    }
    return r === null && (i.lanes = 0), [t.memoizedState, i.dispatch];
  }
  function Dh(t) {
    var e = fn(), n = e.queue;
    if (n === null) throw Error(a(311));
    n.lastRenderedReducer = t;
    var i = n.dispatch, r = n.pending, o = e.memoizedState;
    if (r !== null) {
      n.pending = null;
      var m = r = r.next;
      do
        o = t(o, m.action), m = m.next;
      while (m !== r);
      Mi(o, e.memoizedState) || (pn = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), n.lastRenderedState = o;
    }
    return [o, i];
  }
  function Xg(t, e, n) {
    var i = Wt, r = fn(), o = ne;
    if (o) {
      if (n === void 0) throw Error(a(407));
      n = n();
    } else n = e();
    var m = !Mi(
      (Ae || r).memoizedState,
      n
    );
    if (m && (r.memoizedState = n, pn = !0), r = r.queue, Bh(jg.bind(null, i, r, t), [
      t
    ]), t = r.getSnapshot !== e || m || gn !== null && (gn.memoizedState.tag & 1) !== 0, $u(
      t ? 9 : 8,
      { destroy: void 0 },
      Gg.bind(null, i, r, n, e),
      null
    ), t) {
      if (i.flags |= 2048, Ne === null) throw Error(a(349));
      o || (Gl & 127) !== 0 || Vg(i, e, n);
    }
    return n;
  }
  function Vg(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Wt.updateQueue, e === null ? (e = Jo(), Wt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Gg(t, e, n, i) {
    e.value = n, e.getSnapshot = i, Qg(e) && Zg(t);
  }
  function jg(t, e, n) {
    return n(function() {
      Qg(e) && Zg(t);
    });
  }
  function Qg(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Mi(t, n);
    } catch {
      return !0;
    }
  }
  function Zg(t) {
    var e = Ja(t, 2);
    e !== null && di(e, t, 2);
  }
  function Nh(t) {
    var e = In();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), uu) {
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
  function Kg(t, e, n, i) {
    return t.baseState = n, zh(
      t,
      Ae,
      typeof i == "function" ? i : jl
    );
  }
  function Ub(t, e, n, i, r) {
    if (tc(t)) throw Error(a(485));
    if (t = e.action, t !== null) {
      var o = {
        payload: r,
        action: t,
        next: null,
        isTransition: !0,
        status: "pending",
        value: null,
        reason: null,
        listeners: [],
        then: function(m) {
          o.listeners.push(m);
        }
      };
      ot.T !== null ? n(!0) : o.isTransition = !1, i(o), n = e.pending, n === null ? (o.next = e.pending = o, Fg(e, o)) : (o.next = n.next, e.pending = n.next = o);
    }
  }
  function Fg(t, e) {
    var n = e.action, i = e.payload, r = t.state;
    if (e.isTransition) {
      var o = ot.T, m = {};
      m.types = o !== null ? o.types : null, ot.T = m;
      try {
        var y = n(r, i), w = ot.S;
        w !== null && w(m, y), kg(t, e, y);
      } catch (H) {
        Uh(t, e, H);
      } finally {
        o !== null && m.types !== null && (o.types = m.types), ot.T = o;
      }
    } else
      try {
        o = n(r, i), kg(t, e, o);
      } catch (H) {
        Uh(t, e, H);
      }
  }
  function kg(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(i) {
        Jg(t, e, i);
      },
      function(i) {
        return Uh(t, e, i);
      }
    ) : Jg(t, e, n);
  }
  function Jg(t, e, n) {
    e.status = "fulfilled", e.value = n, $g(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Fg(t, n)));
  }
  function Uh(t, e, n) {
    var i = t.pending;
    if (t.pending = null, i !== null) {
      i = i.next;
      do
        e.status = "rejected", e.reason = n, $g(e), e = e.next;
      while (e !== i);
    }
    t.action = null;
  }
  function $g(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Pg(t, e) {
    return e;
  }
  function Wg(t, e) {
    if (ne) {
      var n = Ne.formState;
      if (n !== null) {
        t: {
          var i = Wt;
          if (ne) {
            if (Be) {
              e: {
                for (var r = Be, o = Ji; r.nodeType !== 8; ) {
                  if (!o) {
                    r = null;
                    break e;
                  }
                  if (r = Pi(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                o = r.data, r = o === "F!" || o === "F" ? r : null;
              }
              if (r) {
                Be = Pi(
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
    return n = In(), n.memoizedState = n.baseState = e, i = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Pg,
      lastRenderedState: e
    }, n.queue = i, n = vp.bind(
      null,
      Wt,
      i
    ), i.dispatch = n, i = Nh(!1), o = Xh.bind(
      null,
      Wt,
      !1,
      i.queue
    ), i = In(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, i.queue = r, n = Ub.bind(
      null,
      Wt,
      r,
      o,
      n
    ), r.dispatch = n, i.memoizedState = t, [e, n, !1];
  }
  function Ig(t) {
    var e = fn();
    return tp(e, Ae, t);
  }
  function tp(t, e, n) {
    if (e = zh(
      t,
      e,
      Pg
    )[0], t = Po(jl)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var i = ss(e);
      } catch (m) {
        throw m === Ku ? Vo : m;
      }
    else i = e;
    e = fn();
    var r = e.queue, o = r.dispatch;
    return n !== e.memoizedState && (Wt.flags |= 2048, $u(
      9,
      { destroy: void 0 },
      Bb.bind(null, r, n),
      null
    )), [i, o, t];
  }
  function Bb(t, e) {
    t.action = e;
  }
  function ep(t) {
    var e = fn(), n = Ae;
    if (n !== null)
      return tp(e, n, t);
    fn(), e = e.memoizedState, n = fn();
    var i = n.queue.dispatch;
    return n.memoizedState = t, [e, i, !1];
  }
  function $u(t, e, n, i) {
    return t = { tag: t, create: n, deps: i, inst: e, next: null }, e = Wt.updateQueue, e === null && (e = Jo(), Wt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (i = n.next, n.next = t, t.next = i, e.lastEffect = t), t;
  }
  function np() {
    return fn().memoizedState;
  }
  function Wo(t, e, n, i) {
    var r = In();
    Wt.flags |= t, r.memoizedState = $u(
      1 | e,
      { destroy: void 0 },
      n,
      i === void 0 ? null : i
    );
  }
  function Io(t, e, n, i) {
    var r = fn();
    i = i === void 0 ? null : i;
    var o = r.memoizedState.inst;
    Ae !== null && i !== null && Mh(i, Ae.memoizedState.deps) ? r.memoizedState = $u(e, o, n, i) : (Wt.flags |= t, r.memoizedState = $u(
      1 | e,
      o,
      n,
      i
    ));
  }
  function ip(t, e) {
    Wo(8390656, 8, t, e);
  }
  function Bh(t, e) {
    Io(2048, 8, t, e);
  }
  function Hb(t) {
    Wt.flags |= 4;
    var e = Wt.updateQueue;
    if (e === null)
      e = Jo(), Wt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function lp(t) {
    var e = fn().memoizedState;
    return Hb({ ref: e, nextImpl: t }), function() {
      if ((_e & 2) !== 0) throw Error(a(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function ap(t, e) {
    return Io(4, 2, t, e);
  }
  function up(t, e) {
    return Io(4, 4, t, e);
  }
  function rp(t, e) {
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
  function sp(t, e, n) {
    n = n != null ? n.concat([t]) : null, Io(4, 4, rp.bind(null, e, t), n);
  }
  function Hh() {
  }
  function op(t, e) {
    var n = fn();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    return e !== null && Mh(e, i[1]) ? i[0] : (n.memoizedState = [t, e], t);
  }
  function cp(t, e) {
    var n = fn();
    e = e === void 0 ? null : e;
    var i = n.memoizedState;
    if (e !== null && Mh(e, i[1]))
      return i[0];
    if (i = t(), uu) {
      Tt(!0);
      try {
        t();
      } finally {
        Tt(!1);
      }
    }
    return n.memoizedState = [i, e], i;
  }
  function Lh(t, e, n) {
    return n === void 0 || (Gl & 1073741824) !== 0 && (ce & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = Sv(), Wt.lanes |= t, va |= t, n);
  }
  function fp(t, e, n, i) {
    return Mi(n, e) ? n : fa.current !== null ? (t = Lh(t, n, i), Mi(t, e) || (pn = !0), t) : (Gl & 106) === 0 || (Gl & 1073741824) !== 0 && (ce & 261930) === 0 ? (pn = !0, t.memoizedState = n) : (t = Sv(), Wt.lanes |= t, va |= t, e);
  }
  function hp(t, e, n, i, r) {
    var o = ct.p;
    ct.p = o !== 0 && 8 > o ? o : 8;
    var m = ot.T, y = {};
    y.types = m !== null ? m.types : null, ot.T = y, Xh(t, !1, e, n);
    try {
      var w = r(), H = ot.S;
      if (H !== null && H(y, w), w !== null && typeof w == "object" && typeof w.then == "function") {
        var K = zb(
          w,
          i
        );
        os(
          t,
          e,
          K,
          Ci(t)
        );
      } else
        os(
          t,
          e,
          i,
          Ci(t)
        );
    } catch (nt) {
      os(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: nt },
        Ci()
      );
    } finally {
      ct.p = o, m !== null && y.types !== null && (m.types = y.types), ot.T = m;
    }
  }
  function Lb() {
  }
  function Yh(t, e, n, i) {
    if (t.tag !== 5) throw Error(a(476));
    var r = dp(t).queue;
    hp(
      t,
      r,
      e,
      wt,
      n === null ? Lb : function() {
        return mp(t), n(i);
      }
    );
  }
  function dp(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: wt,
      baseState: wt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: jl,
        lastRenderedState: wt
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
  function mp(t) {
    var e = dp(t);
    e.next === null && (e = t.alternate.memoizedState), os(
      t,
      e.next.queue,
      {},
      Ci()
    );
  }
  function qh() {
    return Un(gr);
  }
  function gp() {
    return fn().memoizedState;
  }
  function pp() {
    return fn().memoizedState;
  }
  function Yb(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Ci();
          t = oa(n);
          var i = ca(e, t, n);
          i !== null && (di(i, e, n), is(i, e, n)), e = { cache: dh() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function qb(t, e, n) {
    var i = Ci();
    n = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, tc(t) ? _p(e, n) : (n = lh(t, e, n, i), n !== null && (di(n, t, i), yp(n, e, i)));
  }
  function vp(t, e, n) {
    var i = Ci();
    os(t, e, n, i);
  }
  function os(t, e, n, i) {
    var r = {
      lane: i,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (tc(t)) _p(e, r);
    else {
      var o = t.alternate;
      if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
        try {
          var m = e.lastRenderedState, y = o(m, n);
          if (r.hasEagerState = !0, r.eagerState = y, Mi(y, m))
            return zo(t, e, r, 0), Ne === null && Co(), !1;
        } catch {
        }
      if (n = lh(t, e, r, i), n !== null)
        return di(n, t, i), yp(n, e, i), !0;
    }
    return !1;
  }
  function Xh(t, e, n, i) {
    if (i = {
      lane: 2,
      revertLane: Cd(),
      gesture: null,
      action: i,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, tc(t)) {
      if (e) throw Error(a(479));
    } else
      e = lh(
        t,
        n,
        i,
        2
      ), e !== null && di(e, t, 2);
  }
  function tc(t) {
    var e = t.alternate;
    return t === Wt || e !== null && e === Wt;
  }
  function _p(t, e) {
    ku = Fo = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function yp(t, e, n) {
    if ((n & 4194048) !== 0) {
      var i = e.lanes;
      i &= t.pendingLanes, n |= i, e.lanes = n, ve(t, n);
    }
  }
  var ec = {
    readContext: Un,
    use: $o,
    useCallback: un,
    useContext: un,
    useEffect: un,
    useImperativeHandle: un,
    useLayoutEffect: un,
    useInsertionEffect: un,
    useMemo: un,
    useReducer: un,
    useRef: un,
    useState: un,
    useDebugValue: un,
    useDeferredValue: un,
    useTransition: un,
    useSyncExternalStore: un,
    useId: un,
    useHostTransitionStatus: un,
    useFormState: un,
    useActionState: un,
    useOptimistic: un,
    useMemoCache: un,
    useCacheRefresh: un,
    useEffectEvent: un
  }, Sp = {
    readContext: Un,
    use: $o,
    useCallback: function(t, e) {
      return In().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: Un,
    useEffect: ip,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Wo(
        4194308,
        4,
        rp.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Wo(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Wo(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = In();
      e = e === void 0 ? null : e;
      var i = t();
      if (uu) {
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
      var i = In();
      if (n !== void 0) {
        var r = n(e);
        if (uu) {
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
      }, i.queue = t, t = t.dispatch = qb.bind(
        null,
        Wt,
        t
      ), [i.memoizedState, t];
    },
    useRef: function(t) {
      var e = In();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = Nh(t);
      var e = t.queue, n = vp.bind(null, Wt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: Hh,
    useDeferredValue: function(t, e) {
      var n = In();
      return Lh(n, t, e);
    },
    useTransition: function() {
      var t = Nh(!1);
      return t = hp.bind(
        null,
        Wt,
        t.queue,
        !0,
        !1
      ), In().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var i = Wt, r = In();
      if (ne) {
        if (n === void 0)
          throw Error(a(407));
        n = n();
      } else {
        if (n = e(), Ne === null)
          throw Error(a(349));
        (ce & 127) !== 0 || Vg(i, e, n);
      }
      r.memoizedState = n;
      var o = { value: n, getSnapshot: e };
      return r.queue = o, ip(jg.bind(null, i, o, t), [
        t
      ]), i.flags |= 2048, $u(
        9,
        { destroy: void 0 },
        Gg.bind(
          null,
          i,
          o,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = In(), e = Ne.identifierPrefix;
      if (ne) {
        var n = _l, i = vl;
        n = (i & ~(1 << 32 - it(i) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = ko++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = Db++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: qh,
    useFormState: Wg,
    useActionState: Wg,
    useOptimistic: function(t) {
      var e = In();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Xh.bind(
        null,
        Wt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: Ch,
    useCacheRefresh: function() {
      return In().memoizedState = Yb.bind(
        null,
        Wt
      );
    },
    useEffectEvent: function(t) {
      var e = In(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((_e & 2) !== 0)
          throw Error(a(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, bp = {
    readContext: Un,
    use: $o,
    useCallback: op,
    useContext: Un,
    useEffect: Bh,
    useImperativeHandle: sp,
    useInsertionEffect: ap,
    useLayoutEffect: up,
    useMemo: cp,
    useReducer: Po,
    useRef: np,
    useState: function() {
      return Po(jl);
    },
    useDebugValue: Hh,
    useDeferredValue: function(t, e) {
      var n = fn();
      return fp(
        n,
        Ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Po(jl)[0], e = fn().memoizedState;
      return [
        typeof t == "boolean" ? t : ss(t),
        e
      ];
    },
    useSyncExternalStore: Xg,
    useId: gp,
    useHostTransitionStatus: qh,
    useFormState: Ig,
    useActionState: Ig,
    useOptimistic: function(t, e) {
      var n = fn();
      return Kg(n, Ae, t, e);
    },
    useMemoCache: Ch,
    useCacheRefresh: pp,
    useEffectEvent: lp
  }, Xb = {
    readContext: Un,
    use: $o,
    useCallback: op,
    useContext: Un,
    useEffect: Bh,
    useImperativeHandle: sp,
    useInsertionEffect: ap,
    useLayoutEffect: up,
    useMemo: cp,
    useReducer: Dh,
    useRef: np,
    useState: function() {
      return Dh(jl);
    },
    useDebugValue: Hh,
    useDeferredValue: function(t, e) {
      var n = fn();
      return Ae === null ? Lh(n, t, e) : fp(
        n,
        Ae.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Dh(jl)[0], e = fn().memoizedState;
      return [
        typeof t == "boolean" ? t : ss(t),
        e
      ];
    },
    useSyncExternalStore: Xg,
    useId: gp,
    useHostTransitionStatus: qh,
    useFormState: ep,
    useActionState: ep,
    useOptimistic: function(t, e) {
      var n = fn();
      return Ae !== null ? Kg(n, Ae, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: Ch,
    useCacheRefresh: pp,
    useEffectEvent: lp
  };
  function Vh(t, e, n, i) {
    e = t.memoizedState, n = n(i, e), n = n == null ? e : C({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Gh = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var i = Ci(), r = oa(i);
      r.payload = e, n != null && (r.callback = n), e = ca(t, r, i), e !== null && (di(e, t, i), is(e, t, i));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var i = Ci(), r = oa(i);
      r.tag = 1, r.payload = e, n != null && (r.callback = n), e = ca(t, r, i), e !== null && (di(e, t, i), is(e, t, i));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Ci(), i = oa(n);
      i.tag = 2, e != null && (i.callback = e), e = ca(t, i, n), e !== null && (di(e, t, n), is(e, t, n));
    }
  };
  function Tp(t, e, n, i, r, o, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(i, o, m) : e.prototype && e.prototype.isPureReactComponent ? !Jr(n, i) || !Jr(r, o) : !0;
  }
  function Ep(t, e, n, i) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, i), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, i), e.state !== t && Gh.enqueueReplaceState(e, e.state, null);
  }
  function ru(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var i in e)
        i !== "ref" && (n[i] = e[i]);
    }
    if (t = t.defaultProps) {
      n === e && (n = C({}, n));
      for (var r in t)
        n[r] === void 0 && (n[r] = t[r]);
    }
    return n;
  }
  function xp(t) {
    Ro(t);
  }
  function Mp(t) {
    console.error(t);
  }
  function wp(t) {
    Ro(t);
  }
  function nc(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (i) {
      setTimeout(function() {
        throw i;
      });
    }
  }
  function Ap(t, e, n) {
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
  function jh(t, e, n) {
    return n = oa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      nc(t, e);
    }, n;
  }
  function Op(t) {
    return t = oa(t), t.tag = 3, t;
  }
  function Rp(t, e, n, i) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var o = i.value;
      t.payload = function() {
        return r(o);
      }, t.callback = function() {
        Ap(e, n, i);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      Ap(e, n, i), typeof r != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var y = i.stack;
      this.componentDidCatch(i.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function Vb(t, e, n, i, r) {
    if (n.flags |= 32768, i !== null && typeof i == "object" && typeof i.then == "function") {
      if (e = n.alternate, e !== null && Ia(
        e,
        n,
        r,
        !0
      ), n = Bn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return jn === null ? Ec() : n.alternate === null && rn === 0 && (rn = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, i === Go ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([i]) : e.add(i), Ad(t, i, r)), !1;
          case 22:
            return n.flags |= 65536, i === Go ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([i])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([i]) : n.add(i)), Ad(t, i, r)), !1;
        }
        throw Error(a(435, n.tag));
      }
      return Ad(t, i, r), Ec(), !1;
    }
    if (ne)
      return e = Bn.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, i !== oh && (t = Error(a(422), { cause: i }), Wr(Ki(t, n)))) : (i !== oh && (e = Error(a(423), {
        cause: i
      }), Wr(
        Ki(e, n)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, i = Ki(i, n), r = jh(
        t.stateNode,
        i,
        r
      ), yh(t, r), rn !== 4 && (rn = 2)), !1;
    var o = Error(a(520), { cause: i });
    if (o = Ki(o, n), vs === null ? vs = [o] : vs.push(o), rn !== 4 && (rn = 2), e === null) return !0;
    i = Ki(i, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = r & -r, n.lanes |= t, t = jh(n.stateNode, i, t), yh(n, t), !1;
        case 1:
          if (e = n.type, o = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (_a === null || !_a.has(o))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = Op(r), Rp(
              r,
              t,
              n,
              i
            ), yh(n, r), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var Qh = Error(a(461)), pn = !1;
  function Sn(t, e, n, i) {
    e.child = t === null ? Ng(e, null, n, i) : au(
      e,
      t.child,
      n,
      i
    );
  }
  function Cp(t, e, n, i, r) {
    n = n.render;
    var o = e.ref;
    if ("ref" in i) {
      var m = {};
      for (var y in i)
        y !== "ref" && (m[y] = i[y]);
    } else m = i;
    return tu(e), i = wh(
      t,
      e,
      n,
      m,
      o,
      r
    ), y = Ah(), t !== null && !pn ? (Oh(t, e, r), Ql(t, e, r)) : (ne && y && Bo(e), e.flags |= 1, Sn(t, e, i, r), e.child);
  }
  function zp(t, e, n, i, r) {
    if (t === null) {
      var o = n.type;
      return typeof o == "function" && !ah(o) && o.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = o, Dp(
        t,
        e,
        o,
        i,
        r
      )) : (t = No(
        n.type,
        null,
        i,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (o = t.child, !Wh(t, r)) {
      var m = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Jr, n(m, i) && t.ref === e.ref)
        return Ql(t, e, r);
    }
    return e.flags |= 1, t = Yl(o, i), t.ref = e.ref, t.return = e, e.child = t;
  }
  function Dp(t, e, n, i, r) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (Jr(o, i) && t.ref === e.ref)
        if (pn = !1, e.pendingProps = i = o, Wh(t, r))
          (t.flags & 131072) !== 0 && (pn = !0);
        else
          return e.lanes = t.lanes, Ql(t, e, r);
    }
    return Zh(
      t,
      e,
      n,
      i,
      r
    );
  }
  function Np(t, e, n, i) {
    var r = i.children, o = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), i.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | n : n, t !== null) {
          for (i = e.child = t.child, r = 0; i !== null; )
            r = r | i.lanes | i.childLanes, i = i.sibling;
          i = r & ~o;
        } else i = 0, e.child = null;
        return Up(
          t,
          e,
          o,
          n,
          i
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Xo(
          e,
          o !== null ? o.cachePool : null
        ), o !== null ? Hg(e, o) : bh(), Lg(e);
      else
        return i = e.lanes = 536870912, Up(
          t,
          e,
          o !== null ? o.baseLanes | n : n,
          n,
          i
        );
    } else
      o !== null ? (Xo(e, o.cachePool), Hg(e, o), da(), e.memoizedState = null) : (t !== null && Xo(e, null), bh(), da());
    return Sn(t, e, r, n), e.child;
  }
  function cs(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Up(t, e, n, i, r) {
    var o = gh();
    return o = o === null ? null : { parent: mn._currentValue, pool: o }, e.memoizedState = {
      baseLanes: n,
      cachePool: o
    }, t !== null && Xo(e, null), bh(), Lg(e), t !== null && Ia(t, e, i, !0), e.childLanes = r, null;
  }
  function ic(t, e) {
    return e = lc(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function Bp(t, e, n) {
    return au(e, t.child, null, n), t = ic(e, e.pendingProps), t.flags |= 2, wi(e), e.memoizedState = null, t;
  }
  function Gb(t, e, n) {
    var i = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (ne) {
        if (i.mode === "hidden")
          return t = ic(e, i), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, cs(null, t);
        if (Eh(e), (t = Be) ? (t = r_(
          t,
          Ji
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ia !== null ? { id: vl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = _g(t), n.return = e, e.child = n, wn = e, Be = null)) : t = null, t === null) throw aa(e);
        return e.lanes = 536870912, null;
      }
      return ic(e, i);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var m = o.dehydrated;
      if (Eh(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = Bp(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(a(558));
      else if (pn || Ia(t, e, n, !1), r = (n & t.childLanes) !== 0, pn || r) {
        if (fa.current === null) {
          if (i = Ne, i !== null && (m = Ti(i, n), m !== 0 && m !== o.retryLane))
            throw o.retryLane = m, Ja(t, m), di(i, t, m), Qh;
          Ec();
        }
        e = Bp(
          t,
          e,
          n
        );
      } else
        t = o.treeContext, Be = Pi(m.nextSibling), wn = e, ne = !0, la = null, Ji = !1, t !== null && bg(e, t), e = ic(e, i), e.flags |= 134221824;
      return e;
    }
    return t = Yl(t.child, {
      mode: i.mode,
      children: i.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Pu(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(a(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Zh(t, e, n, i, r) {
    return tu(e), n = wh(
      t,
      e,
      n,
      i,
      void 0,
      r
    ), i = Ah(), t !== null && !pn ? (Oh(t, e, r), Ql(t, e, r)) : (ne && i && Bo(e), e.flags |= 1, Sn(t, e, n, r), e.child);
  }
  function Hp(t, e, n, i, r, o) {
    return tu(e), e.updateQueue = null, n = qg(
      e,
      i,
      n,
      r
    ), Yg(t), i = Ah(), t !== null && !pn ? (Oh(t, e, o), Ql(t, e, o)) : (ne && i && Bo(e), e.flags |= 1, Sn(t, e, n, o), e.child);
  }
  function Lp(t, e, n, i, r) {
    if (tu(e), e.stateNode === null) {
      var o = Vu, m = n.contextType;
      typeof m == "object" && m !== null && (o = Un(m)), o = new n(i, o), e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = Gh, e.stateNode = o, o._reactInternals = e, o = e.stateNode, o.props = i, o.state = e.memoizedState, o.refs = {}, vh(e), m = n.contextType, o.context = typeof m == "object" && m !== null ? Un(m) : Vu, o.state = e.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (Vh(
        e,
        n,
        m,
        i
      ), o.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (m = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), m !== o.state && Gh.enqueueReplaceState(o, o.state, null), as(e, i, o, r), ls(), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308), i = !0;
    } else if (t === null) {
      o = e.stateNode;
      var y = e.memoizedProps, w = ru(n, y);
      o.props = w;
      var H = o.context, K = n.contextType;
      m = Vu, typeof K == "object" && K !== null && (m = Un(K));
      var nt = n.getDerivedStateFromProps;
      K = typeof nt == "function" || typeof o.getSnapshotBeforeUpdate == "function", y = e.pendingProps !== y, K || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (y || H !== m) && Ep(
        e,
        o,
        i,
        m
      ), sa = !1;
      var U = e.memoizedState;
      o.state = U, as(e, i, o, r), ls(), H = e.memoizedState, y || U !== H || sa ? (typeof nt == "function" && (Vh(
        e,
        n,
        nt,
        i
      ), H = e.memoizedState), (w = sa || Tp(
        e,
        n,
        w,
        i,
        U,
        H,
        m
      )) ? (K || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = i, e.memoizedState = H), o.props = i, o.state = H, o.context = m, i = w) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), i = !1);
    } else {
      o = e.stateNode, _h(t, e), m = e.memoizedProps, K = ru(n, m), o.props = K, nt = e.pendingProps, U = o.context, H = n.contextType, w = Vu, typeof H == "object" && H !== null && (w = Un(H)), y = n.getDerivedStateFromProps, (H = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (m !== nt || U !== w) && Ep(
        e,
        o,
        i,
        w
      ), sa = !1, U = e.memoizedState, o.state = U, as(e, i, o, r), ls();
      var Q = e.memoizedState;
      m !== nt || U !== Q || sa || t !== null && t.dependencies !== null && Yo(t.dependencies) ? (typeof y == "function" && (Vh(
        e,
        n,
        y,
        i
      ), Q = e.memoizedState), (K = sa || Tp(
        e,
        n,
        K,
        i,
        U,
        Q,
        w
      ) || t !== null && t.dependencies !== null && Yo(t.dependencies)) ? (H || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(i, Q, w), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        i,
        Q,
        w
      )), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || m === t.memoizedProps && U === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && U === t.memoizedState || (e.flags |= 1024), e.memoizedProps = i, e.memoizedState = Q), o.props = i, o.state = Q, o.context = w, i = K) : (typeof o.componentDidUpdate != "function" || m === t.memoizedProps && U === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && U === t.memoizedState || (e.flags |= 1024), i = !1);
    }
    return o = i, Pu(t, e), i = (e.flags & 128) !== 0, o || i ? (o = e.stateNode, n = i && typeof n.getDerivedStateFromError != "function" ? null : o.render(), e.flags |= 1, t !== null && i ? (e.child = au(
      e,
      t.child,
      null,
      r
    ), e.child = au(
      e,
      null,
      n,
      r
    )) : Sn(t, e, n, r), e.memoizedState = o.state, t = e.child) : t = Ql(
      t,
      e,
      r
    ), t;
  }
  function Yp(t, e, n, i) {
    return Pa(), e.flags |= 256, Sn(t, e, n, i), e.child;
  }
  var Kh = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Fh(t) {
    return { baseLanes: t, cachePool: Ag() };
  }
  function kh(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= Ri), t;
  }
  function qp(t, e, n) {
    var i = e.pendingProps, r = !1, o = (e.flags & 128) !== 0, m;
    if ((m = o) || (m = t !== null && t.memoizedState === null ? !1 : (Hn.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (ne) {
        if (r ? ha(e) : da(), (t = Be) ? (t = r_(
          t,
          Ji
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ia !== null ? { id: vl, overflow: _l } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = _g(t), n.return = e, e.child = n, wn = e, Be = null)) : t = null, t === null) throw aa(e);
        return Fd(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return o = i.children, i = i.fallback, r ? (da(), r = e.mode, o = lc(
        { mode: "hidden", children: o },
        r
      ), i = $a(
        i,
        r,
        n,
        null
      ), o.return = e, i.return = e, o.sibling = i, e.child = o, i = e.child, i.memoizedState = Fh(n), i.childLanes = kh(
        t,
        m,
        n
      ), e.memoizedState = Kh, cs(null, i)) : (ha(e), Jh(e, o));
    }
    var y = t.memoizedState;
    if (y !== null) {
      var w = y.dehydrated;
      if (w !== null)
        return jb(
          t,
          e,
          o,
          m,
          i,
          w,
          y,
          n
        );
    }
    return r ? (da(), r = i.fallback, o = e.mode, y = t.child, w = y.sibling, i = Yl(y, {
      mode: "hidden",
      children: i.children
    }), i.subtreeFlags = y.subtreeFlags & 1206910976, w !== null ? r = Yl(w, r) : (r = $a(
      r,
      o,
      n,
      null
    ), r.flags |= 2), r.return = e, i.return = e, i.sibling = r, e.child = i, cs(null, i), i = e.child, r = t.child.memoizedState, r === null ? r = Fh(n) : (o = r.cachePool, o !== null ? (y = mn._currentValue, o = o.parent !== y ? { parent: y, pool: y } : o) : o = Ag(), r = {
      baseLanes: r.baseLanes | n,
      cachePool: o
    }), i.memoizedState = r, i.childLanes = kh(
      t,
      m,
      n
    ), e.memoizedState = Kh, cs(t.child, i)) : (ha(e), n = t.child, t = n.sibling, n = Yl(n, {
      mode: "visible",
      children: i.children
    }), n.return = e, n.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Jh(t, e) {
    return e = lc(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function lc(t, e) {
    return t = oi(22, t, null, e), t.lanes = 0, t;
  }
  function ac(t, e, n) {
    return au(e, t.child, null, n), t = Jh(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function jb(t, e, n, i, r, o, m, y) {
    if (n)
      return e.flags & 256 ? (ha(e), e.flags &= -257, ac(
        t,
        e,
        y
      )) : e.memoizedState !== null ? (da(), e.child = t.child, e.flags |= 128, null) : (da(), o = r.fallback, m = e.mode, r = lc(
        { mode: "visible", children: r.children },
        m
      ), o = $a(
        o,
        m,
        y,
        null
      ), o.flags |= 2, r.return = e, o.return = e, r.sibling = o, e.child = r, au(e, t.child, null, y), r = e.child, r.memoizedState = Fh(y), r.childLanes = kh(
        t,
        i,
        y
      ), e.memoizedState = Kh, cs(null, r));
    if (ha(e), Fd(o)) {
      if (i = o.nextSibling && o.nextSibling.dataset, i) var w = i.dgst;
      return i = w, i !== "" && (r = Error(a(419)), r.stack = "", r.digest = i, Wr({ value: r, source: null, stack: null })), ac(
        t,
        e,
        y
      );
    }
    if (pn || Ia(t, e, y, !1), i = (y & t.childLanes) !== 0, pn || i) {
      if (fa.current !== null)
        return ac(
          t,
          e,
          y
        );
      if (i = Ne, i !== null && (r = Ti(
        i,
        y
      ), r !== 0 && r !== m.retryLane))
        throw m.retryLane = r, Ja(t, r), di(i, t, r), Qh;
      return Kd(o) || Ec(), ac(
        t,
        e,
        y
      );
    }
    return Kd(o) ? (e.flags |= 192, e.child = t.child, null) : (t = m.treeContext, Be = Pi(o.nextSibling), wn = e, ne = !0, la = null, Ji = !1, t !== null && bg(e, t), e = Jh(
      e,
      r.children
    ), e.flags |= 134221824, e);
  }
  function Xp(t, e, n) {
    t.lanes |= e;
    var i = t.alternate;
    i !== null && (i.lanes |= e), Lo(t.return, e, n);
  }
  function Vp(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Ko(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function uc(t, e, n, i, r, o) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: i,
      tail: n,
      tailMode: r,
      treeForkCount: o
    } : (m.isBackwards = e, m.rendering = null, m.renderingStartTime = 0, m.last = i, m.tail = n, m.tailMode = r, m.treeForkCount = o);
  }
  function $h(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Ph(t, e, n) {
    var i = e.pendingProps, r = i.revealOrder, o = i.tail;
    i = i.children;
    var m = Hn.current;
    if (e.flags & 128)
      return us(e, m), null;
    var y = (m & 2) !== 0;
    if (y ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, us(e, m), r === "backwards" && t !== null ? ($h(t), Sn(t, e, i, n), $h(t)) : Sn(t, e, i, n), i = ne ? Pr : 0, !y && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Xp(t, n, e);
        else if (t.tag === 19)
          Xp(t, n, e);
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
        n = Vp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null, $h(e)), uc(
          e,
          !0,
          r,
          null,
          o,
          i
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, r = e.child, e.child = null; r !== null; ) {
          if (t = r.alternate, t !== null && Ko(t) === null) {
            e.child = r;
            break;
          }
          t = r.sibling, r.sibling = n, n = r, r = t;
        }
        uc(
          e,
          !0,
          n,
          null,
          o,
          i
        );
        break;
      case "together":
        uc(
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
        n = Vp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), uc(
          e,
          !1,
          r,
          n,
          o,
          i
        );
    }
    return e.child;
  }
  function Gp(t, e, n) {
    var i = e.pendingProps;
    return ua(e, e.type, i.value), Sn(t, e, i.children, n), e.child;
  }
  function Ql(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), va |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Ia(
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
  function Wh(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Yo(t)));
  }
  function Qb(t, e, n) {
    switch (e.tag) {
      case 3:
        Ft(e, e.stateNode.containerInfo), ua(e, mn, t.memoizedState.cache), Pa();
        break;
      case 27:
      case 5:
        At(e);
        break;
      case 4:
        Ft(e, e.stateNode.containerInfo);
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
          return e.flags |= 128, Eh(e), null;
        break;
      case 13:
        var i = e.memoizedState;
        if (i !== null) {
          if (i.dehydrated !== null)
            return ha(e), e.flags |= 128, null;
          i = Ia(
            t,
            e,
            n,
            !1
          );
          var r = e.child.childLanes;
          return i || (n & r) !== 0 ? qp(t, e, n) : (ha(e), t = Ql(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        ha(e);
        break;
      case 19:
        if (e.flags & 128)
          return Ph(
            t,
            e,
            n
          );
        if (r = (t.flags & 128) !== 0, i = (n & e.childLanes) !== 0, i || (Ia(
          t,
          e,
          n,
          !1
        ), i = (n & e.childLanes) !== 0), r) {
          if (i)
            return Ph(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), us(e, Hn.current), i) break;
        return null;
      case 22:
        return e.lanes = 0, Np(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ua(e, mn, t.memoizedState.cache);
    }
    return Ql(t, e, n);
  }
  function jp(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        pn = !0;
      else {
        if (!Wh(t, n) && (e.flags & 128) === 0)
          return pn = !1, Qb(
            t,
            e,
            n
          );
        pn = (t.flags & 131072) !== 0;
      }
    else
      pn = !1, ne && (e.flags & 1048576) !== 0 && Sg(e, Pr, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var i = e.pendingProps;
          if (t = iu(e.elementType), e.type = t, typeof t == "function")
            ah(t) ? (i = ru(t, i), e.tag = 1, e = Lp(
              null,
              e,
              t,
              i,
              n
            )) : (e.tag = 0, e = Zh(
              null,
              e,
              t,
              i,
              n
            ));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === V) {
                e.tag = 11, e = Cp(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (r === rt) {
                e.tag = 14, e = zp(
                  null,
                  e,
                  t,
                  i,
                  n
                );
                break t;
              } else if (r === tt) {
                e.tag = 10, e.type = t, e = Gp(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = dt(t) || t, Error(a(306, e, ""));
          }
        }
        return e;
      case 0:
        return Zh(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return i = e.type, r = ru(
          i,
          e.pendingProps
        ), Lp(
          t,
          e,
          i,
          r,
          n
        );
      case 3:
        t: {
          if (Ft(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(a(387));
          i = e.pendingProps;
          var o = e.memoizedState;
          r = o.element, _h(t, e), as(e, i, null, n);
          var m = e.memoizedState;
          if (i = m.cache, ua(e, mn, i), i !== o.cache && hh(
            e,
            [mn],
            n,
            !0
          ), ls(), i = m.element, o.isDehydrated)
            if (o = {
              element: i,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
              e = Yp(
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
              ), Wr(r), e = Yp(
                t,
                e,
                i,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Be = Pi(t.firstChild), wn = e, ne = !0, la = null, Ji = !0, n = Ng(
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
            Sn(t, e, i, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Pu(t, e), t === null ? (n = m_(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : ne || (e.stateNode = Fv(
          e.type,
          e.pendingProps,
          Mt.current,
          e
        )) : e.memoizedState = m_(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return At(e), t === null && ne && (i = e.stateNode = c_(
          e.type,
          e.pendingProps,
          Mt.current
        ), wn = e, Ji = !0, r = Be, ba(e.type) ? (kd = r, Be = Pi(i.firstChild)) : Be = r), Sn(
          t,
          e,
          e.pendingProps.children,
          n
        ), Pu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && ne && ((r = i = Be) && (i = Y2(
          i,
          e.type,
          e.pendingProps,
          Ji
        ), i !== null ? (e.stateNode = i, wn = e, Be = Pi(i.firstChild), Ji = !1, r = !0) : r = !1), r || aa(e)), At(e), r = e.type, o = e.pendingProps, m = t !== null ? t.memoizedProps : null, i = o.children, qd(r, o) ? i = null : m !== null && qd(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = wh(
          t,
          e,
          Nb,
          null,
          null,
          n
        ), gr._currentValue = r), Pu(t, e), Sn(t, e, i, n), e.child;
      case 6:
        return t === null && ne && ((t = n = Be) && (n = q2(
          n,
          e.pendingProps,
          Ji
        ), n !== null ? (e.stateNode = n, wn = e, Be = null, t = !0) : t = !1), t || aa(e)), null;
      case 13:
        return qp(t, e, n);
      case 4:
        return Ft(
          e,
          e.stateNode.containerInfo
        ), i = e.pendingProps, t === null ? e.child = au(
          e,
          null,
          i,
          n
        ) : Sn(t, e, i, n), e.child;
      case 11:
        return Cp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return i = e.pendingProps, Pu(t, e), Sn(t, e, i, n), e.child;
      case 8:
        return Sn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return Sn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return Gp(t, e, n);
      case 9:
        return r = e.type._context, i = e.pendingProps.children, tu(e), r = Un(r), i = i(r), e.flags |= 1, Sn(t, e, i, n), e.child;
      case 14:
        return zp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return Dp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Ph(t, e, n);
      case 31:
        return Gb(t, e, n);
      case 22:
        return Np(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return tu(e), i = Un(mn), t === null ? (r = gh(), r === null && (r = Ne, o = dh(), r.pooledCache = o, o.refCount++, o !== null && (r.pooledCacheLanes |= n), r = o), e.memoizedState = { parent: i, cache: r }, vh(e), ua(e, mn, r)) : ((t.lanes & n) !== 0 && (_h(t, e), as(e, null, null, n), ls()), r = t.memoizedState, o = e.memoizedState, r.parent !== i ? (r = { parent: i, cache: i }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), ua(e, mn, i)) : (i = o.cache, ua(e, mn, i), i !== r.cache && hh(
          e,
          [mn],
          n,
          !0
        ))), Sn(
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
        }), i = e.pendingProps, i.name != null && i.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : ne && Bo(e), t !== null && t.memoizedProps.name !== i.name ? e.flags |= 4194816 : Pu(t, e), Sn(t, e, i.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(a(156, e.tag));
  }
  function Zl(t) {
    t.flags |= 4;
  }
  function Ih(t, e, n, i, r) {
    var o;
    if ((o = (t.mode & 32) !== 0) && (o = n === null ? __(e, i) : __(e, i) && (i.src !== n.src || i.srcSet !== n.srcSet)), o) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (xv()) t.flags |= 8192;
        else
          throw lu = Go, ph;
    } else t.flags &= -16777217;
  }
  function Qp(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !y_(e))
      if (xv()) t.flags |= 8192;
      else
        throw lu = Go, ph;
  }
  function rc(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? ge() : 536870912, t.lanes |= e, nr |= e);
  }
  function fs(t, e) {
    if (!ne)
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
  function He(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, i = 0;
    if (e)
      for (var r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, i |= r.subtreeFlags & 1206910976, i |= r.flags & 1206910976, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, i |= r.subtreeFlags, i |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= i, t.childLanes = n, e;
  }
  function Zb(t, e, n) {
    var i = e.pendingProps;
    switch (sh(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return He(e), null;
      case 1:
        return He(e), null;
      case 3:
        return n = e.stateNode, i = null, t !== null && (i = t.memoizedState.cache), e.memoizedState.cache !== i && (e.flags |= 2048), Vl(mn), Ut(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Qu(e) ? Zl(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, ch())), He(e), null;
      case 26:
        var r = e.type, o = e.memoizedState;
        return t === null ? (Zl(e), o !== null ? (He(e), Qp(e, o)) : (He(e), Ih(
          e,
          r,
          null,
          i,
          n
        ))) : o ? o !== t.memoizedState ? (Zl(e), He(e), Qp(e, o)) : (He(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== i && Zl(e), He(e), Ih(
          e,
          r,
          t,
          i,
          n
        )), null;
      case 27:
        if (Qt(e), n = Mt.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zl(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(a(166));
            return He(e), e.subtreeFlags &= -33554433, null;
          }
          t = Rt.current, Qu(e) ? Tg(e) : (t = c_(r, i, n), e.stateNode = t, Zl(e));
        }
        return He(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (Qt(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== i && Zl(e);
        else {
          if (!i) {
            if (e.stateNode === null)
              throw Error(a(166));
            return He(e), e.subtreeFlags &= -33554433, null;
          }
          if (o = Rt.current, Qu(e))
            Tg(e);
          else {
            var m = Ts(
              Mt.current
            );
            switch (o) {
              case 1:
                o = m.createElementNS(
                  "http://www.w3.org/2000/svg",
                  r
                );
                break;
              case 2:
                o = m.createElementNS(
                  "http://www.w3.org/1998/Math/MathML",
                  r
                );
                break;
              default:
                switch (r) {
                  case "svg":
                    o = m.createElementNS(
                      "http://www.w3.org/2000/svg",
                      r
                    );
                    break;
                  case "math":
                    o = m.createElementNS(
                      "http://www.w3.org/1998/Math/MathML",
                      r
                    );
                    break;
                  case "script":
                    o = m.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(
                      o.firstChild
                    );
                    break;
                  case "select":
                    o = typeof i.is == "string" ? m.createElement("select", {
                      is: i.is
                    }) : m.createElement("select"), i.multiple ? o.multiple = !0 : i.size && (o.size = i.size);
                    break;
                  default:
                    o = typeof i.is == "string" ? m.createElement(r, { is: i.is }) : m.createElement(r);
                }
            }
            o[je] = e, o[qe] = i;
            t: for (m = e.child; m !== null; ) {
              if (m.tag === 5 || m.tag === 6)
                o.appendChild(m.stateNode);
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
            e.stateNode = o;
            t: switch (Yn(o, r, i), r) {
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
        return He(e), e.subtreeFlags &= -33554433, Ih(
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
          if (t = Mt.current, Qu(e)) {
            if (t = e.stateNode, n = e.memoizedProps, i = null, r = wn, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  i = r.memoizedProps;
              }
            t[je] = e, t = !!(t.nodeValue === n || i !== null && i.suppressHydrationWarning === !0 || jv(t.nodeValue, n)), t || aa(e, !0);
          } else
            t = Ts(t).createTextNode(
              i
            ), t[je] = e, e.stateNode = t;
        }
        return He(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (i = Qu(e), n !== null) {
            if (t === null) {
              if (!i) throw Error(a(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(557));
              t[je] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            He(e), t = !1;
          } else
            n = ch(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (wi(e), e) : (wi(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(a(558));
        }
        return He(e), null;
      case 13:
        if (i = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Qu(e), i !== null && i.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(a(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(a(317));
              r[je] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            He(e), r = !1;
          } else
            r = ch(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (wi(e), e) : (wi(e), null);
        }
        return wi(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = i !== null, t = t !== null && t.memoizedState !== null, n && (i = e.child, r = null, i.alternate !== null && i.alternate.memoizedState !== null && i.alternate.memoizedState.cachePool !== null && (r = i.alternate.memoizedState.cachePool.pool), o = null, i.memoizedState !== null && i.memoizedState.cachePool !== null && (o = i.memoizedState.cachePool.pool), o !== r && (i.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), rc(e, e.updateQueue), He(e), null);
      case 4:
        return Ut(), t === null && Ud(e.stateNode.containerInfo), e.flags |= 67108864, He(e), null;
      case 10:
        return Vl(e.type), He(e), null;
      case 19:
        if (xh(e), i = e.memoizedState, i === null) return He(e), null;
        if (r = (e.flags & 128) !== 0, o = i.rendering, o === null)
          if (r) fs(i, !1);
          else {
            if (rn !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (o = Ko(t), o !== null) {
                  for (e.flags |= 128, fs(i, !1), t = o.updateQueue, e.updateQueue = t, rc(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    vg(n, t), n = n.sibling;
                  return us(
                    e,
                    Hn.current & 1 | 2
                  ), ne && ql(e, i.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            i.tail !== null && Yt() > yc && (e.flags |= 128, r = !0, fs(i, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = Ko(o), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, rc(e, t), fs(i, !0), i.tail === null && i.tailMode !== "collapsed" && i.tailMode !== "visible" && !o.alternate && !ne)
                return He(e), null;
            } else
              2 * Yt() - i.renderingStartTime > yc && n !== 536870912 && (e.flags |= 128, r = !0, fs(i, !1), e.lanes = 4194304);
          i.isBackwards ? (o.sibling = e.child, e.child = o) : (t = i.last, t !== null ? t.sibling = o : e.child = o, i.last = o);
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
          return i.rendering = t, i.tail = t.sibling, i.renderingStartTime = Yt(), t.sibling = null, o = Hn.current, o = r ? o & 1 | 2 : o & 1, i.tailMode === "visible" || i.tailMode === "collapsed" || !n || ne ? us(e, o) : (n = o, mt(Bn, e), mt(Hn, n), jn === null && (jn = e)), ne && ql(e, i.treeForkCount), t;
        }
        return He(e), null;
      case 22:
      case 23:
        return wi(e), Th(), i = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== i && (e.flags |= 8192) : i && (e.flags |= 8192), i ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (He(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : He(e), n = e.updateQueue, n !== null && rc(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), i = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (i = e.memoizedState.cachePool.pool), i !== n && (e.flags |= 2048), t !== null && N(nu), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Vl(mn), He(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, He(e), null;
    }
    throw Error(a(156, e.tag));
  }
  function Kb(t, e) {
    switch (sh(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Vl(mn), Ut(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return Qt(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (wi(e), e.alternate === null)
            throw Error(a(340));
          Pa();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (wi(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(a(340));
          Pa();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return xh(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return Ut(), null;
      case 10:
        return Vl(e.type), null;
      case 22:
      case 23:
        return wi(e), Th(), t !== null && N(nu), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Vl(mn), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Zp(t, e) {
    switch (sh(e), e.tag) {
      case 3:
        Vl(mn), Ut();
        break;
      case 26:
      case 27:
      case 5:
        Qt(e);
        break;
      case 4:
        Ut();
        break;
      case 31:
        e.memoizedState !== null && wi(e);
        break;
      case 13:
        wi(e);
        break;
      case 19:
        xh(e);
        break;
      case 10:
        Vl(e.type);
        break;
      case 22:
      case 23:
        wi(e), Th(), t !== null && N(nu);
        break;
      case 24:
        Vl(mn);
    }
  }
  function hs(t, e) {
    try {
      var n = e.updateQueue, i = n !== null ? n.lastEffect : null;
      if (i !== null) {
        var r = i.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            i = void 0;
            var o = n.create, m = n.inst;
            i = o(), m.destroy = i;
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (y) {
      xe(e, e.return, y);
    }
  }
  function ma(t, e, n) {
    try {
      var i = e.updateQueue, r = i !== null ? i.lastEffect : null;
      if (r !== null) {
        var o = r.next;
        i = o;
        do {
          if ((i.tag & t) === t) {
            var m = i.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, r = e;
              var w = n, H = y;
              try {
                H();
              } catch (K) {
                xe(
                  r,
                  w,
                  K
                );
              }
            }
          }
          i = i.next;
        } while (i !== o);
      }
    } catch (K) {
      xe(e, e.return, K);
    }
  }
  function Kp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        Bg(e, n);
      } catch (i) {
        xe(t, t.return, i);
      }
    }
  }
  function Fp(t, e, n) {
    n.props = ru(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (i) {
      xe(t, e, i);
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
            var r = t.stateNode, o = Hl(t.memoizedProps, r);
            (r.ref === null || r.ref.name !== o) && (r.ref = t_(o)), i = r.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var m = new zi(t);
              _(
                t.child,
                !1,
                H2,
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
      xe(t, e, y);
    }
  }
  function Ln(t, e) {
    var n = t.ref, i = t.refCleanup;
    if (n !== null)
      if (typeof i == "function")
        try {
          i();
        } catch (r) {
          xe(t, e, r);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          xe(t, e, r);
        }
      else n.current = null;
  }
  function sc(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        u_(
          t.stateNode,
          e[n]
        );
  }
  function kp(t) {
    for (var e = t.return; e !== null && (ed(e) && u_(t.stateNode, e.stateNode), !td(e)); )
      e = e.return;
  }
  function ds(t) {
    for (var e = t.return; e !== null && (ed(e) && L2(t.stateNode, e.stateNode), !td(e)); )
      e = e.return;
  }
  function td(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function ed(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function nd(t) {
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
      xe(t, t.return, r);
    }
  }
  function id(t, e, n) {
    try {
      var i = t.stateNode;
      _2(i, t.type, n, e), i[qe] = e;
    } catch (r) {
      xe(t, t.return, r);
    }
  }
  function Jp(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ba(t.type) || t.tag === 4;
  }
  function ld(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Jp(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ba(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function ad(t, e, n, i) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(r, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(r), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = pl)), sc(t, i), pe = !0;
    else if (r !== 4 && (r === 27 && (sc(t, i), i = null, ba(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (ad(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        ad(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function oc(t, e, n, i) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? n.insertBefore(r, e) : n.appendChild(r), sc(t, i), pe = !0;
    else if (r !== 4 && (r === 27 && (sc(t, i), i = null, ba(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (oc(
        t,
        e,
        n,
        i
      ), t = t.sibling; t !== null; )
        oc(
          t,
          e,
          n,
          i
        ), t = t.sibling;
  }
  function $p(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var i = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      Yn(e, i, n), e[je] = t, e[qe] = n;
    } catch (o) {
      xe(t, t.return, o);
    }
  }
  var cc = !1, Ai = null;
  function Pp(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (cc = !0);
  }
  var Sl = null;
  function Wp() {
    var t = Sl;
    return Sl = null, t;
  }
  var ci = 0;
  function Wu(t, e, n, i, r) {
    return ci = 0, Ip(
      t.child,
      e,
      n,
      i,
      r
    );
  }
  function Ip(t, e, n, i, r) {
    for (var o = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (i !== null) {
          var y = Gd(m);
          i.push(y), y.view && (o = !0);
        } else
          o || Gd(m).view && (o = !0);
        cc = !0, Wv(
          m,
          ci === 0 ? e : e + "_" + ci,
          n
        ), ci++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && r || Ip(
        t.child,
        e,
        n,
        i,
        r
      ) && (o = !0));
      t = t.sibling;
    }
    return o;
  }
  function bl(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Iv(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || bl(
        t.child,
        e
      )), t = t.sibling;
  }
  function fc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (fc(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
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
  function ud(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, i = t.memoizedProps, r = Hl(i, n), o = Ll(
        i.default,
        n.paired ? i.share : i.enter
      );
      o !== "none" ? Wu(t, r, o, null, !1) ? (fc(t), n.paired || e || ur(t, i.onEnter)) : bl(t.child, !1) : fc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ud(t, e), t = t.sibling;
    else fc(t);
  }
  function rd(t) {
    if (Ai !== null && Ai.size !== 0) {
      var e = Ai;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, i = n.name;
              if (i != null && i !== "auto") {
                var r = e.get(i);
                if (r !== void 0) {
                  var o = Ll(
                    n.default,
                    n.share
                  );
                  if (o !== "none" && (Wu(
                    t,
                    i,
                    o,
                    null,
                    !1
                  ) ? (o = t.stateNode, r.paired = o, o.paired = r, ur(t, n.onShare)) : bl(t.child, !1)), e.delete(i), e.size === 0) break;
                }
              }
            }
            rd(t);
          }
          t = t.sibling;
        }
    }
  }
  function sd(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Hl(e, t.stateNode), i = Ai !== null ? Ai.get(n) : void 0, r = Ll(
        e.default,
        i !== void 0 ? e.share : e.exit
      );
      r !== "none" && (Wu(t, n, r, null, !1) ? i !== void 0 ? (r = t.stateNode, i.paired = r, r.paired = i, Ai.delete(n), ur(t, e.onShare)) : ur(t, e.onExit) : bl(t.child, !1)), Ai !== null && rd(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        sd(t), t = t.sibling;
    else
      Ai !== null && rd(t);
  }
  function tv(t) {
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
        (t.subtreeFlags & 33554432) !== 0 && tv(t);
      t = t.sibling;
    }
  }
  function od(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, bl(t.child, !1));
          }
          od(t);
        }
        t = t.sibling;
      }
  }
  function hc(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, bl(t.child, !1), od(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        hc(t), t = t.sibling;
    else od(t);
  }
  function ev(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? bl(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && ev(t), t = t.sibling;
  }
  function cd(t, e, n, i, r, o, m) {
    for (var y = !1; e !== null; ) {
      if (e.tag === 5) {
        var w = e.stateNode;
        if (o !== null && ci < o.length) {
          var H = o[ci], K = Gd(w);
          (H.view || K.view) && (y = !0);
          var nt;
          if (nt = (t.flags & 4) === 0)
            if (K.clip) nt = !0;
            else {
              nt = H.rect;
              var U = K.rect;
              nt = nt.y !== U.y || nt.x !== U.x || nt.height !== U.height || nt.width !== U.width;
            }
          nt && (t.flags |= 4), K.abs ? K = !H.abs : (H = H.rect, K = K.rect, K = H.height !== K.height || H.width !== K.width), K && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Wv(
          w,
          ci === 0 ? n : n + "_" + ci,
          r
        ), y && (t.flags & 4) !== 0 || (Sl === null && (Sl = []), Sl.push(
          w,
          ci === 0 ? i : i + "_" + ci,
          e.memoizedProps
        )), ci++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && m ? t.flags |= e.flags & 32 : cd(
        t,
        e.child,
        n,
        i,
        r,
        o,
        m
      ) && (y = !0));
      e = e.sibling;
    }
    return y;
  }
  function nv(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, i = t.stateNode, r = Hl(n, i), o = Ll(n.default, n.update), m;
        m = t.memoizedState, t.memoizedState = null, i = t;
        var y = t.child;
        ci = 0, r = cd(
          i,
          y,
          r,
          r,
          o,
          m,
          !1
        ), (t.flags & 4) !== 0 && r && ur(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && nv(t);
      t = t.sibling;
    }
  }
  var An = !1, be = !1, Tl = !1, fd = !1, iv = typeof WeakSet == "function" ? WeakSet : Set, On = null, El = !1, ms = !1, dc = !1, hd = !1;
  function Fb(t, e, n) {
    if (t = t.containerInfo, Ld = pr, t = rg(t), Wf(t)) {
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
            var o = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              i.nodeType, m.nodeType;
            } catch {
              i = null;
              break t;
            }
            var y = 0, w = -1, H = -1, K = 0, nt = 0, U = t, Q = null;
            e: for (; ; ) {
              for (var bt; U !== i || o !== 0 && U.nodeType !== 3 || (w = y + o), U !== m || r !== 0 && U.nodeType !== 3 || (H = y + r), U.nodeType === 3 && (y += U.nodeValue.length), (bt = U.firstChild) !== null; )
                Q = U, U = bt;
              for (; ; ) {
                if (U === t) break e;
                if (Q === i && ++K === o && (w = y), Q === m && ++nt === r && (H = y), (bt = U.nextSibling) !== null) break;
                U = Q, Q = U.parentNode;
              }
              U = bt;
            }
            i = w === -1 || H === -1 ? null : { start: w, end: H };
          } else i = null;
        }
      i = i || { start: 0, end: 0 };
    } else i = null;
    for (Yd = { focusedElem: t, selectionRange: i }, pr = !1, n = (n & 335544064) === n, On = e, e = n ? 9270 : 1024; On !== null; ) {
      if (t = On, n && (i = t.deletions, i !== null))
        for (o = 0; o < i.length; o++)
          n && sd(i[o]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && Pp(t), mc(n);
      else {
        if (t.tag === 22) {
          if (i = t.alternate, t.memoizedState !== null) {
            i !== null && i.memoizedState === null && n && sd(i), mc(n);
            continue;
          } else if (i !== null && i.memoizedState !== null) {
            n && Pp(t), mc(n);
            continue;
          }
        }
        i = t.child, (t.subtreeFlags & e) !== 0 && i !== null ? (i.return = t, On = i) : (n && tv(t), mc(n));
      }
    }
    Ai = null;
  }
  function mc(t) {
    for (; On !== null; ) {
      var e = On, n = t, i = e.alternate, r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((r & 1024) !== 0 && i !== null) {
            n = void 0, r = i.memoizedProps, i = i.memoizedState;
            var o = e.stateNode;
            try {
              var m = ru(
                e.type,
                r
              );
              n = o.getSnapshotBeforeUpdate(
                m,
                i
              ), o.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              xe(e, e.return, y);
            }
          }
          break;
        case 3:
          if ((r & 1024) !== 0) {
            if (i = e.stateNode.containerInfo, n = i.nodeType, n === 9)
              Zd(i);
            else if (n === 1)
              switch (i.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Zd(i);
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
        i.return = e.return, On = i;
        break;
      }
      On = e.return;
    }
  }
  function lv(t, e, n) {
    var i = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xl(t, n), i & 4 && hs(5, n);
        break;
      case 1:
        if (xl(t, n), i & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (m) {
              xe(n, n.return, m);
            }
          else {
            var r = ru(
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
              xe(
                n,
                n.return,
                m
              );
            }
          }
        i & 64 && Kp(n), i & 512 && yl(n, n.return);
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
            Bg(t, e);
          } catch (m) {
            xe(n, n.return, m);
          }
        }
        break;
      case 27:
        e === null && i & 4 && $p(n);
      case 26:
      case 5:
        xl(t, n), e === null && i & 4 && nd(n), i & 512 && yl(n, n.return);
        break;
      case 12:
        xl(t, n);
        break;
      case 31:
        xl(t, n), i & 4 && sv(t, n);
        break;
      case 13:
        xl(t, n), i & 4 && ov(t, n), i & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = a2.bind(
          null,
          n
        ), X2(t, n))));
        break;
      case 22:
        if (i = n.memoizedState !== null || An, !i) {
          var o = e !== null && e.memoizedState !== null || be;
          e = An, r = be, An = i, (be = o) && !r ? (i = 2, (n.subtreeFlags & 8772) !== 0 && (i |= 1), ol(
            t,
            n,
            i
          )) : xl(t, n), An = e, be = r;
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
  function dd(t, e) {
    for (t = t.child; t !== null; )
      av(t, e), t = t.sibling;
  }
  function av(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var i = n.style;
            typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none";
          } else {
            var r = t.stateNode, o = t.memoizedProps.style, m = o != null && o.hasOwnProperty("display") ? o.display : null;
            r.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
          }
        } catch (w) {
          xe(t, t.return, w);
        }
        md(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, pe = !0;
        } catch (w) {
          xe(t, t.return, w);
        }
        break;
      case 18:
        try {
          var y = t.stateNode;
          e ? Pv(y, !0) : Pv(t.stateNode, !1);
        } catch (w) {
          xe(t, t.return, w);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && dd(t, e);
        break;
      default:
        dd(t, e);
    }
  }
  function md(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, i = e;
          switch (n.tag) {
            case 4:
              av(n, i);
              break t;
            case 22:
              n.memoizedState === null && md(n, i);
              break t;
            default:
              md(n, i);
          }
        }
        t = t.sibling;
      }
  }
  function uv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, uv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && $n(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Qe = null, fi = !1;
  function rl(t, e, n) {
    for (n = n.child; n !== null; )
      rv(t, e, n), n = n.sibling;
  }
  function rv(t, e, n) {
    if (at && typeof at.onCommitFiberUnmount == "function")
      try {
        at.onCommitFiberUnmount(lt, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        be || Ln(n, e), rl(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !be && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        be || Ln(n, e), ds(n);
        var i = Qe, r = fi;
        ba(n.type) && (Qe = n.stateNode, fi = !1), rl(
          t,
          e,
          n
        ), f_(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Qe = i, fi = r;
        break;
      case 5:
        be || Ln(n, e), ds(n);
      case 6:
        if (n.tag === 6 && ds(n), i = Qe, r = fi, Qe = null, rl(
          t,
          e,
          n
        ), Qe = i, fi = r, Qe !== null)
          if (fi)
            try {
              (Qe.nodeType === 9 ? Qe.body : Qe.nodeName === "HTML" ? Qe.ownerDocument.body : Qe).removeChild(n.stateNode), pe = !0;
            } catch (o) {
              xe(
                n,
                e,
                o
              );
            }
          else
            try {
              Qe.removeChild(n.stateNode), pe = !0;
            } catch (o) {
              xe(
                n,
                e,
                o
              );
            }
        break;
      case 18:
        Qe !== null && (fi ? (t = Qe, $v(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), vr(t)) : $v(Qe, n.stateNode));
        break;
      case 4:
        i = Qe, r = fi, Qe = n.stateNode.containerInfo, fi = !0, rl(
          t,
          e,
          n
        ), Qe = i, fi = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ma(2, n, e), be || ma(4, n, e), rl(
          t,
          e,
          n
        );
        break;
      case 1:
        be || (Ln(n, e), i = n.stateNode, typeof i.componentWillUnmount == "function" && Fp(
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
        be = (i = be) || n.memoizedState !== null, rl(
          t,
          e,
          n
        ), be = i;
        break;
      case 30:
        Ln(n, e), rl(
          t,
          e,
          n
        );
        break;
      case 7:
        be || Ln(n, e), rl(
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
  function sv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        vr(t);
      } catch (n) {
        xe(e, e.return, n);
      }
    }
  }
  function ov(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        vr(t);
      } catch (n) {
        xe(e, e.return, n);
      }
  }
  function kb(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new iv()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new iv()), e;
      default:
        throw Error(a(435, t.tag));
    }
  }
  function gc(t, e) {
    var n = kb(t);
    e.forEach(function(i) {
      if (!n.has(i)) {
        n.add(i);
        var r = u2.bind(null, t, i);
        i.then(r, r);
      }
    });
  }
  function ti(t, e, n) {
    var i = e.deletions;
    if (i !== null)
      for (var r = 0; r < i.length; r++) {
        var o = i[r], m = t, y = e, w = y;
        t: for (; w !== null; ) {
          switch (w.tag) {
            case 27:
              if (ba(w.type)) {
                Qe = w.stateNode, fi = !1;
                break t;
              }
              break;
            case 5:
              Qe = w.stateNode, fi = !1;
              break t;
            case 3:
            case 4:
              Qe = w.stateNode.containerInfo, fi = !0;
              break t;
          }
          w = w.return;
        }
        if (Qe === null) throw Error(a(160));
        rv(m, y, o), Qe = null, fi = !1, m = o.alternate, m !== null && (m.return = null), o.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        cv(e, t, n), e = e.sibling;
  }
  var sl = null;
  function cv(t, e, n) {
    var i = t.alternate, r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (r & 4 && (i = t.updateQueue, i = i !== null ? i.events : null, i !== null))
          for (var o = 0; o < i.length; o++) {
            var m = i[o];
            m.ref.impl = m.nextImpl;
          }
        ti(e, t, n), ei(t), r & 4 && (ma(3, t, t.return), hs(3, t), ma(5, t, t.return));
        break;
      case 1:
        ti(e, t, n), ei(t), r & 512 && (be || i === null || Ln(i, i.return)), r & 64 && An && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (o = sl, ti(e, t, n), ei(t), r & 512 && (be || i === null || Ln(i, i.return)), r & 4)
          if (r = i !== null ? i.memoizedState : null, n = t.memoizedState, i === null)
            if (n === null)
              if (t.stateNode === null)
                if (An)
                  t.stateNode = Fv(
                    t.type,
                    t.memoizedProps,
                    e.containerInfo,
                    t
                  );
                else {
                  t: {
                    e = t.type, n = t.memoizedProps, r = o.ownerDocument || o;
                    e: switch (e) {
                      case "title":
                        i = r.getElementsByTagName("title")[0], (!i || i[ln] || i[je] || i.namespaceURI === "http://www.w3.org/2000/svg" || i.hasAttribute("itemprop")) && (i = r.createElement(e), r.head.insertBefore(
                          i,
                          r.querySelector("head > title")
                        )), Yn(i, e, n), i[je] = t, cn(i), e = i;
                        break t;
                      case "link":
                        if (o = v_(
                          "link",
                          "href",
                          r
                        ).get(e + (n.href || ""))) {
                          for (m = 0; m < o.length; m++)
                            if (i = o[m], i.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && i.getAttribute("rel") === (n.rel == null ? null : n.rel) && i.getAttribute("title") === (n.title == null ? null : n.title) && i.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              o.splice(m, 1);
                              break e;
                            }
                        }
                        i = r.createElement(e), Yn(i, e, n), r.head.appendChild(i);
                        break;
                      case "meta":
                        if (o = v_(
                          "meta",
                          "content",
                          r
                        ).get(e + (n.content || ""))) {
                          for (m = 0; m < o.length; m++)
                            if (i = o[m], i.getAttribute("content") === (n.content == null ? null : "" + n.content) && i.getAttribute("name") === (n.name == null ? null : n.name) && i.getAttribute("property") === (n.property == null ? null : n.property) && i.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && i.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              o.splice(m, 1);
                              break e;
                            }
                        }
                        i = r.createElement(e), Yn(i, e, n), r.head.appendChild(i);
                        break;
                      default:
                        throw Error(a(468, e));
                    }
                    i[je] = t, cn(i), e = i;
                  }
                  t.stateNode = e;
                }
              else
                An || Wd(o, t.type, t.stateNode);
            else
              t.stateNode = p_(
                o,
                n,
                t.memoizedProps
              );
          else
            r !== n ? (r === null ? (e = i.stateNode, e === null || be || e.parentNode.removeChild(e)) : r.count--, n === null ? An || Wd(o, t.type, t.stateNode) : p_(o, n, t.memoizedProps)) : n === null && t.stateNode !== null && id(
              t,
              t.memoizedProps,
              i.memoizedProps
            );
        break;
      case 27:
        ti(e, t, n), ei(t), r & 512 && (be || i === null || Ln(i, i.return)), i !== null && r & 4 && id(
          t,
          t.memoizedProps,
          i.memoizedProps
        );
        break;
      case 5:
        if (o = Tl, Tl = !1, ti(e, t, n), Tl = o, ei(t), r & 512 && (be || i === null || Ln(i, i.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            Uu(e, ""), pe = !0;
          } catch (K) {
            xe(t, t.return, K);
          }
        }
        r & 4 && t.stateNode != null && (e = t.memoizedProps, id(
          t,
          e,
          i !== null ? i.memoizedProps : e
        )), r & 1024 && (fd = !0);
        break;
      case 6:
        if (ti(e, t, n), ei(t), r & 4) {
          if (t.stateNode === null)
            throw Error(a(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, pe = !0;
          } catch (K) {
            xe(t, t.return, K);
          }
        }
        break;
      case 3:
        if (pe = !1, Cc = null, o = sl, sl = Es(e.containerInfo), ti(e, t, n), sl = o, ei(t), r & 4 && i !== null && i.memoizedState.isDehydrated)
          try {
            vr(e.containerInfo);
          } catch (K) {
            xe(t, t.return, K);
          }
        fd && (fd = !1, fv(t)), pe = !1;
        break;
      case 4:
        r = Tl, Tl = An, i = zm(), o = sl, sl = Es(
          t.stateNode.containerInfo
        ), ti(e, t, n), ei(t), sl = o, pe && ms && (dc = !0), pe = i, Tl = r;
        break;
      case 12:
        ti(e, t, n), ei(t);
        break;
      case 31:
        ti(e, t, n), ei(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, gc(t, e)));
        break;
      case 13:
        ti(e, t, n), ei(t), t.child.flags & 8192 && t.memoizedState !== null != (i !== null && i.memoizedState !== null) && (_c = Yt()), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, gc(t, e)));
        break;
      case 22:
        o = t.memoizedState !== null, m = i !== null && i.memoizedState !== null;
        var y = An, w = be, H = Tl;
        An = y || o, Tl = H || o, be = w || m, ti(e, t, n), be = w, Tl = H, An = y, ei(t), r & 8192 && (e = t.stateNode, e._visibility = o ? e._visibility & -2 : e._visibility | 1, !o || i === null || m || An || be || (e = m || be, n = An, i = be, An = o || An, be = e, ga(t, 2), An = n, be = i), !o && Tl || dd(t, o)), r & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, gc(t, n))));
        break;
      case 19:
        ti(e, t, n), ei(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, gc(t, e)));
        break;
      case 30:
        r & 512 && (be || i === null || Ln(i, i.return)), r = zm(), o = ms, m = (n & 335544064) === n, y = t.memoizedProps, ms = m && Ll(
          y.default,
          y.update
        ) !== "none", ti(e, t, n), ei(t), m && i !== null && pe && (t.flags |= 4), ms = o, pe = r;
        break;
      case 21:
        break;
      case 7:
        r & 512 && (be || i === null || Ln(i, i.return)), i && i.stateNode !== null && (i.stateNode._fragmentFiber = t);
      default:
        ti(e, t, n), ei(t);
    }
  }
  function ei(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, i = t.return; i !== null; ) {
          if (Jp(i)) {
            n = i;
            break;
          }
          i = i.return;
        }
        i = null;
        for (var r = t.return; r !== null; ) {
          if (ed(r)) {
            var o = r.stateNode;
            i === null ? i = [o] : i.push(o);
          }
          if (td(r)) break;
          r = r.return;
        }
        var m = i;
        if (n == null) throw Error(a(160));
        switch (n.tag) {
          case 27:
            var y = n.stateNode, w = ld(t);
            oc(
              t,
              w,
              y,
              m
            );
            break;
          case 5:
            var H = n.stateNode;
            n.flags & 32 && (Uu(H, ""), n.flags &= -33);
            var K = ld(t);
            oc(
              t,
              K,
              H,
              m
            );
            break;
          case 3:
          case 4:
            var nt = n.stateNode.containerInfo, U = ld(t);
            ad(
              t,
              U,
              nt,
              m
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (Q) {
        xe(t, t.return, Q);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function fv(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        fv(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, pr = !0, e.reset(), pr = !1), t = t.sibling;
      }
  }
  function Iu(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        hv(e, t), e = e.sibling;
    else nv(e);
  }
  function hv(t, e) {
    var n = t.alternate;
    if (n === null) ud(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (hd = El = !1, Wp(), Iu(e, t), !El && !dc) {
            if (t = Sl, t !== null)
              for (var i = 0; i < t.length; i += 3) {
                n = t[i];
                var r = t[i + 1];
                Iv(n, t[i + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
            )), hd = !0;
          }
          Sl = null;
          break;
        case 5:
          Iu(e, t);
          break;
        case 4:
          i = El, El = !1, Iu(e, t), El && (dc = !0), El = i;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? ud(t, !1) : Iu(e, t));
          break;
        case 30:
          i = El, r = Wp(), El = !1, Iu(e, t), El && (t.flags |= 4);
          var o = t.memoizedProps, m = t.stateNode;
          e = Hl(o, m), m = Hl(n.memoizedProps, m);
          var y = Ll(o.default, o.update);
          y === "none" ? e = !1 : (o = n.memoizedState, n.memoizedState = null, n = t.child, ci = 0, e = cd(
            t,
            n,
            e,
            m,
            y,
            o,
            !0
          ), ci !== (o === null ? 0 : o.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ur(
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
        lv(t, e.alternate, e), e = e.sibling;
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
          Ln(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Fp(
            n,
            n.return,
            r
          ), ga(
            n,
            i
          );
          break;
        case 27:
          (i & 2) !== 0 && f_(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          Ln(n, n.return), n.tag !== 5 && n.tag !== 27 || ds(n), ga(
            n,
            i
          );
          break;
        case 6:
          ds(n);
          break;
        case 26:
          Ln(n, n.return), r = n.stateNode, n.memoizedState !== null || r === null || be || r.parentNode.removeChild(r), ga(
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
          Ln(n, n.return), ga(
            n,
            i
          );
          break;
        case 7:
          Ln(n, n.return);
        default:
          ga(
            n,
            i
          );
      }
      t = t.sibling;
    }
  }
  function ol(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var i = e.alternate, r = t, o = e, m = o.flags, y = (n & 1) !== 0;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          ol(
            r,
            o,
            n
          ), hs(4, o);
          break;
        case 1:
          if (ol(
            r,
            o,
            n
          ), i = o, r = i.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (K) {
              xe(i, i.return, K);
            }
          if (i = o, r = i.updateQueue, r !== null) {
            var w = i.stateNode;
            try {
              var H = r.shared.hiddenCallbacks;
              if (H !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < H.length; r++)
                  Ug(H[r], w);
            } catch (K) {
              xe(i, i.return, K);
            }
          }
          y && m & 64 && Kp(o), yl(o, o.return);
          break;
        case 27:
          (n & 2) !== 0 && $p(o);
        case 5:
          o.tag !== 5 && o.tag !== 27 || kp(o), ol(
            r,
            o,
            n
          ), y && i === null && m & 4 && nd(o), yl(o, o.return);
          break;
        case 6:
          kp(o);
          break;
        case 26:
          w = o.stateNode, o.memoizedState !== null || w === null || An || Wd(
            Es(w.ownerDocument),
            o.type,
            w
          ), ol(
            r,
            o,
            n
          ), y && i === null && m & 4 && nd(o), yl(o, o.return);
          break;
        case 12:
          ol(
            r,
            o,
            n
          );
          break;
        case 31:
          ol(
            r,
            o,
            n
          ), y && m & 4 && sv(r, o);
          break;
        case 13:
          ol(
            r,
            o,
            n
          ), y && m & 4 && ov(r, o);
          break;
        case 22:
          o.memoizedState === null && ol(
            r,
            o,
            n
          ), yl(o, o.return);
          break;
        case 30:
          ol(
            r,
            o,
            n
          ), yl(o, o.return);
          break;
        case 7:
          yl(o, o.return);
        default:
          ol(
            r,
            o,
            n
          );
      }
      e = e.sibling;
    }
  }
  function gd(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Ir(n));
  }
  function pd(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Ir(t));
  }
  function $i(t, e, n, i) {
    var r = (n & 335544064) === n;
    if (e.subtreeFlags & (r ? 10262 : 10256))
      for (e = e.child; e !== null; )
        dv(
          t,
          e,
          n,
          i
        ), e = e.sibling;
    else r && ev(e);
  }
  function dv(t, e, n, i) {
    var r = (n & 335544064) === n;
    r && e.alternate === null && e.return !== null && e.return.alternate !== null && hc(e);
    var o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        $i(
          t,
          e,
          n,
          i
        ), o & 2048 && hs(9, e);
        break;
      case 1:
        $i(
          t,
          e,
          n,
          i
        );
        break;
      case 3:
        $i(
          t,
          e,
          n,
          i
        ), r && hd && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), o & 2048 && (o = null, e.alternate !== null && (o = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== o && (e.refCount++, o != null && Ir(o)));
        break;
      case 12:
        if (o & 2048) {
          $i(
            t,
            e,
            n,
            i
          ), o = e.stateNode;
          try {
            var m = e.memoizedProps, y = m.id, w = m.onPostCommit;
            typeof w == "function" && w(
              y,
              e.alternate === null ? "mount" : "update",
              o.passiveEffectDuration,
              -0
            );
          } catch (H) {
            xe(e, e.return, H);
          }
        } else
          $i(
            t,
            e,
            n,
            i
          );
        break;
      case 31:
        $i(
          t,
          e,
          n,
          i
        );
        break;
      case 13:
        $i(
          t,
          e,
          n,
          i
        );
        break;
      case 23:
        break;
      case 22:
        m = e.stateNode, y = e.alternate, e.memoizedState !== null ? (r && y !== null && y.memoizedState === null && hc(y), m._visibility & 2 ? $i(
          t,
          e,
          n,
          i
        ) : gs(
          t,
          e
        )) : (r && y !== null && y.memoizedState !== null && hc(e), m._visibility & 2 ? $i(
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
        ))), o & 2048 && gd(y, e);
        break;
      case 24:
        $i(
          t,
          e,
          n,
          i
        ), o & 2048 && pd(e.alternate, e);
        break;
      case 30:
        r && (o = e.alternate, o !== null && (bl(o.child, !0), bl(e.child, !0))), $i(
          t,
          e,
          n,
          i
        );
        break;
      default:
        $i(
          t,
          e,
          n,
          i
        );
    }
  }
  function tr(t, e, n, i, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var o = t, m = e, y = n, w = i, H = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          tr(
            o,
            m,
            y,
            w,
            r
          ), hs(8, m);
          break;
        case 23:
          break;
        case 22:
          var K = m.stateNode;
          m.memoizedState !== null ? K._visibility & 2 ? tr(
            o,
            m,
            y,
            w,
            r
          ) : gs(
            o,
            m
          ) : (K._visibility |= 2, tr(
            o,
            m,
            y,
            w,
            r
          )), r && H & 2048 && gd(
            m.alternate,
            m
          );
          break;
        case 24:
          tr(
            o,
            m,
            y,
            w,
            r
          ), r && H & 2048 && pd(m.alternate, m);
          break;
        default:
          tr(
            o,
            m,
            y,
            w,
            r
          );
      }
      e = e.sibling;
    }
  }
  function gs(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, i = e, r = i.flags;
        switch (i.tag) {
          case 22:
            gs(n, i), r & 2048 && gd(
              i.alternate,
              i
            );
            break;
          case 24:
            gs(n, i), r & 2048 && pd(i.alternate, i);
            break;
          default:
            gs(n, i);
        }
        e = e.sibling;
      }
  }
  var su = 8192;
  function ou(t, e, n) {
    if (t.subtreeFlags & su)
      for (t = t.child; t !== null; )
        mv(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function mv(t, e, n) {
    switch (t.tag) {
      case 26:
        ou(
          t,
          e,
          n
        ), t.flags & su && (t.memoizedState !== null ? tT(
          n,
          sl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && b_(n, t)));
        break;
      case 5:
        ou(
          t,
          e,
          n
        ), t.flags & su && (t = t.stateNode, (e & 335544128) === e && b_(n, t));
        break;
      case 3:
      case 4:
        var i = sl;
        sl = Es(t.stateNode.containerInfo), ou(
          t,
          e,
          n
        ), sl = i;
        break;
      case 22:
        t.memoizedState === null && (i = t.alternate, i !== null && i.memoizedState !== null ? (i = su, su = 16777216, ou(
          t,
          e,
          n
        ), su = i) : ou(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & su) !== 0 && (i = t.memoizedProps.name, i != null && i !== "auto")) {
          var r = t.stateNode;
          r.paired = null, Ai === null && (Ai = /* @__PURE__ */ new Map()), Ai.set(i, r);
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
  function gv(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function ps(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          On = i, vv(
            i,
            t
          );
        }
      gv(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        pv(t), t = t.sibling;
  }
  function pv(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        ps(t), t.flags & 2048 && ma(9, t, t.return);
        break;
      case 3:
        ps(t);
        break;
      case 12:
        ps(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, pc(t)) : ps(t);
        break;
      default:
        ps(t);
    }
  }
  function pc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var i = e[n];
          On = i, vv(
            i,
            t
          );
        }
      gv(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, e, e.return), pc(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, pc(e));
          break;
        default:
          pc(e);
      }
      t = t.sibling;
    }
  }
  function vv(t, e) {
    for (; On !== null; ) {
      var n = On;
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
          Ir(n.memoizedState.cache);
      }
      if (i = n.child, i !== null) i.return = n, On = i;
      else
        t: for (n = t; On !== null; ) {
          i = On;
          var r = i.sibling, o = i.return;
          if (uv(i), i === n) {
            On = null;
            break t;
          }
          if (r !== null) {
            r.return = o, On = r;
            break t;
          }
          On = o;
        }
    }
  }
  var Jb = {
    getCacheForType: function(t) {
      var e = Un(mn), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return Un(mn).controller.signal;
    }
  }, $b = typeof WeakMap == "function" ? WeakMap : Map, _e = 0, Ne = null, se = null, ce = 0, Ee = 0, Oi = null, pa = !1, er = !1, vd = !1, Kl = 0, rn = 0, va = 0, cu = 0, vc = 0, Ri = 0, nr = 0, vs = null, hi = null, _d = !1, _c = 0, _v = 0, yc = 1 / 0, Sc = null, _a = null, $e = 0, cl = null, fu = null, Ml = 0, yd = 0, Sd = null, yv = null, ir = null, lr = null, ar = null, _s = 0, bc = null;
  function Ci() {
    return (_e & 2) !== 0 && ce !== 0 ? ce & -ce : ot.T !== null ? Cd() : Ye();
  }
  function Sv() {
    if (Ri === 0)
      if ((ce & 536870912) === 0 || ne) {
        var t = Dt;
        Dt <<= 1, (Dt & 3932160) === 0 && (Dt = 262144), Ri = t;
      } else Ri = 536870912;
    return t = Bn.current, t !== null && (t.flags |= 32), Ri;
  }
  function ur(t, e) {
    if (e != null) {
      var n = t.stateNode, i = n.ref;
      i === null && (i = n.ref = t_(
        Hl(t.memoizedProps, n)
      )), lr === null && (lr = []), lr.push(e.bind(null, i));
    }
  }
  function di(t, e, n) {
    (t === Ne && (Ee === 2 || Ee === 9) || t.cancelPendingCommit !== null) && (rr(t, 0), ya(
      t,
      ce,
      Ri,
      !1
    )), ke(t, n), ((_e & 2) === 0 || t !== Ne) && (t === Ne && ((_e & 2) === 0 && (cu |= n), rn === 4 && ya(
      t,
      ce,
      Ri,
      !1
    )), wl(t));
  }
  function bv(t, e, n) {
    if ((_e & 6) !== 0) throw Error(a(327));
    var i = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Zt(t, e), r = i ? Ib(t, e) : Td(t, e, !0), o = i;
    do {
      if (r === 0) {
        er && !i && ya(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, o && !Pb(n)) {
          r = Td(t, e, !1), o = !1;
          continue;
        }
        if (r === 2) {
          if (o = e, t.errorRecoveryDisabledLanes & o)
            var m = 0;
          else
            m = t.pendingLanes & -536870913, m = m !== 0 ? m : m & 536870912 ? 536870912 : 0;
          if (m !== 0) {
            e = m;
            t: {
              var y = t;
              r = vs;
              var w = y.current.memoizedState.isDehydrated;
              if (w && (rr(y, m).flags |= 256), m = Td(
                y,
                m,
                !1
              ), m !== 2 && m !== 6) {
                if (vd && !w) {
                  y.errorRecoveryDisabledLanes |= o, cu |= o, r = 4;
                  break t;
                }
                o = hi, hi = r, o !== null && (hi === null ? hi = o : hi.push.apply(
                  hi,
                  o
                ));
              }
              r = m;
            }
            if (o = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          rr(t, 0), ya(t, e, 0, !0);
          break;
        }
        t: {
          switch (i = t, o = r, o) {
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
                Ri,
                !pa
              );
              break t;
            case 2:
              hi = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((e & 62914560) === e && (r = _c + 300 - Yt(), 10 < r)) {
            if (ya(
              i,
              e,
              Ri,
              !pa
            ), Xt(i, 0, !0) !== 0) break t;
            Ml = e, i.timeoutHandle = Vd(
              Tv.bind(
                null,
                i,
                n,
                hi,
                Sc,
                _d,
                e,
                Ri,
                cu,
                nr,
                pa,
                o,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          Tv(
            i,
            n,
            hi,
            Sc,
            _d,
            e,
            Ri,
            cu,
            nr,
            pa,
            o,
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
  function Tv(t, e, n, i, r, o, m, y, w, H, K, nt, U, Q) {
    t.timeoutHandle = -1;
    var bt = e.subtreeFlags, Bt = (o & 335544064) === o;
    if (nt = null, (Bt || bt & 8192 || (bt & 16785408) === 16785408) && (nt = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: pl
    }, Ai = null, mv(
      e,
      o,
      nt
    ), Bt && (bt = nt, Bt = t.containerInfo, Bt = (Bt.nodeType === 9 ? Bt : Bt.ownerDocument).__reactViewTransition, Bt != null && (bt.count++, bt.waitingForViewTransition = !0, bt = ws.bind(bt), Bt.finished.then(bt, bt))), bt = (o & 62914560) === o ? _c - Yt() : (o & 4194048) === o ? _v - Yt() : 0, bt = eT(
      nt,
      bt
    ), bt !== null)) {
      Ml = o, t.cancelPendingCommit = bt(
        Cv.bind(
          null,
          t,
          e,
          o,
          n,
          i,
          r,
          m,
          y,
          w,
          H,
          K,
          nt,
          null,
          U,
          Q
        )
      ), ya(t, o, m, !H);
      return;
    }
    Cv(
      t,
      e,
      o,
      n,
      i,
      r,
      m,
      y,
      w,
      H,
      K,
      nt
    );
  }
  function Pb(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var i = 0; i < n.length; i++) {
          var r = n[i], o = r.getSnapshot;
          r = r.value;
          try {
            if (!Mi(o(), r)) return !1;
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
    e = Pt(t, e), e &= ~vc, e &= ~cu, t.suspendedLanes |= e, t.pingedLanes &= ~e, i && (t.warmLanes |= e), i = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var o = 31 - it(r), m = 1 << o;
      i[o] = -1, r &= ~m;
    }
    n !== 0 && Le(t, n, e);
  }
  function Tc() {
    return (_e & 6) === 0 ? (ys(0), !1) : !0;
  }
  function bd() {
    if (se !== null) {
      if (Ee === 0)
        var t = se.return;
      else
        t = se, Xl = Wa = null, Rh(t), Fu = null, ns = 0, t = se;
      for (; t !== null; )
        Zp(t.alternate, t), t = t.return;
      se = null;
    }
  }
  function rr(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, b2(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Ml = 0, bd(), Ne = t, se = n = Yl(t.current, null), ce = e, Ee = 0, Oi = null, pa = !1, er = Zt(t, e), vd = !1, nr = Ri = vc = cu = va = rn = 0, hi = vs = null, _d = !1, Kl = Pt(t, e), Co(), n;
  }
  function Ev(t, e) {
    Wt = null, ot.H = ec, e === Ku || e === Vo ? (e = Cg(), Ee = 3) : e === ph ? (e = Cg(), Ee = 4) : Ee = e === Qh ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, Oi = e, se === null && (rn = 1, nc(
      t,
      Ki(e, t.current)
    ));
  }
  function xv() {
    var t = Bn.current;
    return t === null ? !0 : (ce & 4194048) === ce ? jn === null : (ce & 62914560) === ce || (ce & 536870912) !== 0 ? t === jn : !1;
  }
  function Mv() {
    var t = ot.H;
    return ot.H = ec, t === null ? ec : t;
  }
  function wv() {
    var t = ot.A;
    return ot.A = Jb, t;
  }
  function Ec() {
    rn = 4, pa || (ce & 4194048) !== ce && Bn.current !== null || (er = !0), (va & 134217727) === 0 && (cu & 134217727) === 0 || Ne === null || ya(
      Ne,
      ce,
      Ri,
      !1
    );
  }
  function Td(t, e, n) {
    var i = _e;
    _e |= 2;
    var r = Mv(), o = wv();
    (Ne !== t || ce !== e) && (Sc = null, rr(t, e)), e = !1;
    var m = rn;
    t: do
      try {
        if (Ee !== 0 && se !== null) {
          var y = se, w = Oi;
          switch (Ee) {
            case 8:
              bd(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              Bn.current === null && (e = !0);
              var H = Ee;
              if (Ee = 0, Oi = null, sr(t, y, w, H), n && er) {
                m = 0;
                break t;
              }
              break;
            default:
              H = Ee, Ee = 0, Oi = null, sr(t, y, w, H);
          }
        }
        Wb(), m = rn;
        break;
      } catch (K) {
        Ev(t, K);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Xl = Wa = null, _e = i, ot.H = r, ot.A = o, se === null && (Ne = null, ce = 0, Co()), m;
  }
  function Wb() {
    for (; se !== null; ) Av(se);
  }
  function Ib(t, e) {
    var n = _e;
    _e |= 2;
    var i = Mv(), r = wv();
    Ne !== t || ce !== e ? (Sc = null, yc = Yt() + 500, rr(t, e)) : er = Zt(
      t,
      e
    );
    t: do
      try {
        if (Ee !== 0 && se !== null) {
          e = se;
          var o = Oi;
          e: switch (Ee) {
            case 1:
              Ee = 0, Oi = null, sr(t, e, o, 1);
              break;
            case 2:
            case 9:
              if (Og(o)) {
                Ee = 0, Oi = null, Ov(e);
                break;
              }
              e = function() {
                Ee !== 2 && Ee !== 9 || Ne !== t || (Ee = 7), wl(t);
              }, o.then(e, e);
              break t;
            case 3:
              Ee = 7;
              break t;
            case 4:
              Ee = 5;
              break t;
            case 7:
              Og(o) ? (Ee = 0, Oi = null, Ov(e)) : (Ee = 0, Oi = null, sr(t, e, o, 7));
              break;
            case 5:
              var m = null;
              switch (se.tag) {
                case 26:
                  m = se.memoizedState;
                case 5:
                case 27:
                  var y = se;
                  if (m ? y_(m) : y.stateNode.complete) {
                    Ee = 0, Oi = null;
                    var w = y.sibling;
                    if (w !== null) se = w;
                    else {
                      var H = y.return;
                      H !== null ? (se = H, xc(H)) : se = null;
                    }
                    break e;
                  }
              }
              Ee = 0, Oi = null, sr(t, e, o, 5);
              break;
            case 6:
              Ee = 0, Oi = null, sr(t, e, o, 6);
              break;
            case 8:
              bd(), rn = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        t2();
        break;
      } catch (K) {
        Ev(t, K);
      }
    while (!0);
    return Xl = Wa = null, ot.H = i, ot.A = r, _e = n, se !== null ? 0 : (Ne = null, ce = 0, Co(), rn);
  }
  function t2() {
    for (; se !== null && !Dn(); )
      Av(se);
  }
  function Av(t) {
    var e = jp(t.alternate, t, Kl);
    t.memoizedProps = t.pendingProps, e === null ? xc(t) : se = e;
  }
  function Ov(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Hp(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          ce
        );
        break;
      case 11:
        e = Hp(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          ce
        );
        break;
      case 5:
        Rh(e);
        var i = e;
        i === wn && (ne ? (Ho(i), i.tag === 5 && i.stateNode != null && (Be = i.stateNode)) : (Ho(i), ne = !0));
      default:
        Zp(n, e), e = se = vg(e, Kl), e = jp(n, e, Kl);
    }
    t.memoizedProps = t.pendingProps, e === null ? xc(t) : se = e;
  }
  function sr(t, e, n, i) {
    Xl = Wa = null, Rh(e), Fu = null, ns = 0;
    var r = e.return;
    try {
      if (Vb(
        t,
        r,
        e,
        n,
        ce
      )) {
        rn = 1, nc(
          t,
          Ki(n, t.current)
        ), se = null;
        return;
      }
    } catch (o) {
      if (r !== null) throw se = r, o;
      rn = 1, nc(
        t,
        Ki(n, t.current)
      ), se = null;
      return;
    }
    e.flags & 32768 ? (ne || i === 1 ? t = !0 : er || (ce & 536870912) !== 0 ? t = !1 : (pa = t = !0, (i === 2 || i === 9 || i === 3 || i === 6) && (i = Bn.current, i !== null && i.tag === 13 && (i.flags |= 16384))), Rv(e, t)) : xc(e);
  }
  function xc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        Rv(
          e,
          pa
        );
        return;
      }
      t = e.return;
      var n = Zb(
        e.alternate,
        e,
        Kl
      );
      if (n !== null) {
        se = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        se = e;
        return;
      }
      se = e = t;
    } while (e !== null);
    rn === 0 && (rn = 5);
  }
  function Rv(t, e) {
    do {
      var n = Kb(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, se = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        se = t;
        return;
      }
      se = t = n;
    } while (t !== null);
    rn = 6, se = null;
  }
  function Cv(t, e, n, i, r, o, m, y, w, H, K, nt) {
    t.cancelPendingCommit = null;
    do
      Mc();
    while ($e !== 0);
    if ((_e & 6) !== 0) throw Error(a(327));
    if (e !== null) {
      if (e === t.current) throw Error(a(177));
      t === Ne && (se = Ne = null, ce = 0), fu = e, cl = t, Ml = n, Sd = r, yv = i, e2(
        t,
        e,
        n,
        m,
        y,
        w,
        nt
      );
    }
  }
  function e2(t, e, n, i, r, o, m) {
    var y = e.lanes | e.childLanes;
    if (yd = y, y |= ih, De(
      t,
      n,
      y,
      i,
      r,
      o
    ), lr = null, (n & 335544064) === n ? (ar = Rb(t), i = 10262) : (ar = null, i = 10256), (e.subtreeFlags & i) !== 0 || (e.flags & i) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, r2(de, function() {
      return wd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), cc = !1, i = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || i) {
      i = ot.T, ot.T = null, r = ct.p, ct.p = 2, o = _e, _e |= 4;
      try {
        Fb(t, e, n);
      } finally {
        _e = o, ct.p = r, ot.T = i;
      }
    }
    $e = 1, cc ? ir = A2(
      m,
      t.containerInfo,
      ar,
      Ed,
      xd,
      i2,
      Md,
      wd,
      n2
    ) : (Ed(), xd(), Md());
  }
  function n2(t) {
    if ($e !== 0) {
      var e = cl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function i2() {
    $e === 3 && ($e = 0, hv(fu, cl), $e = 4);
  }
  function Ed() {
    if ($e === 1) {
      $e = 0;
      var t = cl, e = fu, n = Ml, i = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || i) {
        i = ot.T, ot.T = null;
        var r = ct.p;
        ct.p = 2;
        var o = _e;
        _e |= 4;
        try {
          ms = dc = !1, cv(e, t, n), n = Yd;
          var m = rg(t.containerInfo), y = n.focusedElem, w = n.selectionRange;
          if (m !== y && y && y.ownerDocument && ug(
            y.ownerDocument.documentElement,
            y
          )) {
            if (w !== null && Wf(y)) {
              var H = w.start, K = w.end;
              if (K === void 0 && (K = H), "selectionStart" in y)
                y.selectionStart = H, y.selectionEnd = Math.min(
                  K,
                  y.value.length
                );
              else {
                var nt = y.ownerDocument || document, U = nt && nt.defaultView || window;
                if (U.getSelection) {
                  var Q = U.getSelection(), bt = y.textContent.length, Bt = Math.min(w.start, bt), It = w.end === void 0 ? Bt : Math.min(w.end, bt);
                  !Q.extend && Bt > It && (m = It, It = Bt, Bt = m);
                  var B = ag(
                    y,
                    Bt
                  ), R = ag(
                    y,
                    It
                  );
                  if (B && R && (Q.rangeCount !== 1 || Q.anchorNode !== B.node || Q.anchorOffset !== B.offset || Q.focusNode !== R.node || Q.focusOffset !== R.offset)) {
                    var X = nt.createRange();
                    X.setStart(B.node, B.offset), Q.removeAllRanges(), Bt > It ? (Q.addRange(X), Q.extend(R.node, R.offset)) : (X.setEnd(R.node, R.offset), Q.addRange(X));
                  }
                }
              }
            }
            for (nt = [], Q = y; Q = Q.parentNode; )
              Q.nodeType === 1 && nt.push({
                element: Q,
                left: Q.scrollLeft,
                top: Q.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < nt.length; y++) {
              var et = nt[y];
              et.element.scrollLeft = et.left, et.element.scrollTop = et.top;
            }
          }
          pr = !!Ld, Yd = Ld = null;
        } finally {
          _e = o, ct.p = r, ot.T = i;
        }
      }
      t.current = e, $e = 2;
    }
  }
  function xd() {
    if ($e === 2) {
      $e = 0;
      var t = cl, e = fu, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = ot.T, ot.T = null;
        var i = ct.p;
        ct.p = 2;
        var r = _e;
        _e |= 4;
        try {
          lv(t, e.alternate, e);
        } finally {
          _e = r, ct.p = i, ot.T = n;
        }
      }
      $e = 3;
    }
  }
  function Md() {
    if ($e === 4 || $e === 3) {
      $e = 0;
      var t = ir;
      ir = null, Jn();
      var e = cl, n = fu, i = Ml, r = yv, o = (i & 335544064) === i ? 10262 : 10256;
      if ((n.subtreeFlags & o) !== 0 || (n.flags & o) !== 0 ? $e = 5 : ($e = 0, fu = cl = null, zv(e, e.pendingLanes)), o = e.pendingLanes, o === 0 && (_a = null), Je(i), n = n.stateNode, at && typeof at.onCommitFiberRoot == "function")
        try {
          at.onCommitFiberRoot(
            lt,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = ot.T, o = ct.p, ct.p = 2, ot.T = null;
        try {
          for (var m = e.onRecoverableError, y = 0; y < r.length; y++) {
            var w = r[y];
            m(w.value, {
              componentStack: w.stack
            });
          }
        } finally {
          ot.T = n, ct.p = o;
        }
      }
      if (r = lr, m = ar, ar = null, r !== null && (lr = null, m === null && (m = []), t !== null))
        for (w = 0; w < r.length; w++)
          n = (0, r[w])(
            m
          ), n !== void 0 && t.finished.finally(n);
      (Ml & 3) !== 0 && Mc(), wl(e), o = e.pendingLanes, (i & 261930) !== 0 && (o & 42) !== 0 ? e === bc ? _s++ : (_s = 0, bc = e) : (_s = 0, bc = null), ys(0);
    }
  }
  function zv(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Ir(e)));
  }
  function Mc() {
    return ir !== null && (ir.skipTransition(), ir = null), Ed(), xd(), Md(), wd();
  }
  function wd() {
    if ($e !== 5) return !1;
    var t = cl, e = yd;
    yd = 0;
    var n = Je(Ml), i = ot.T, r = ct.p;
    try {
      ct.p = 32 > n ? 32 : n, ot.T = null, n = Sd, Sd = null;
      var o = cl, m = Ml;
      if ($e = 0, fu = cl = null, Ml = 0, (_e & 6) !== 0) throw Error(a(331));
      var y = _e;
      if (_e |= 4, pv(o.current), dv(
        o,
        o.current,
        m,
        n
      ), _e = y, ys(0, !1), at && typeof at.onPostCommitFiberRoot == "function")
        try {
          at.onPostCommitFiberRoot(lt, o);
        } catch {
        }
      return !0;
    } finally {
      ct.p = r, ot.T = i, zv(t, e);
    }
  }
  function Dv(t, e, n) {
    e = Ki(n, e), e = jh(t.stateNode, e, 2), t = ca(t, e, 2), t !== null && (ke(t, 2), wl(t));
  }
  function xe(t, e, n) {
    if (t.tag === 3)
      Dv(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          Dv(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var i = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && (_a === null || !_a.has(i))) {
            t = Ki(n, t), n = Op(2), i = ca(e, n, 2), i !== null && (Rp(
              n,
              i,
              e,
              t
            ), ke(i, 2), wl(i));
            break;
          }
        }
        e = e.return;
      }
  }
  function Ad(t, e, n) {
    var i = t.pingCache;
    if (i === null) {
      i = t.pingCache = new $b();
      var r = /* @__PURE__ */ new Set();
      i.set(e, r);
    } else
      r = i.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), i.set(e, r));
    r.has(n) || (vd = !0, r.add(n), t = l2.bind(null, t, e, n), e.then(t, t));
  }
  function l2(t, e, n) {
    var i = t.pingCache;
    i !== null && i.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, Ne === t && (ce & n) === n && ((rn === 4 || rn === 3 && (ce & 62914560) === ce && 300 > Yt() - _c) && (_e & 2) === 0 ? rr(t, 0) : vc |= n, nr === ce && (nr = 0)), wl(t);
  }
  function Nv(t, e) {
    e === 0 && (e = ge()), t = Ja(t, e), t !== null && (ke(t, e), wl(t));
  }
  function a2(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Nv(t, n);
  }
  function u2(t, e) {
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
    i !== null && i.delete(e), Nv(t, n);
  }
  function r2(t, e) {
    return xn(t, e);
  }
  var or = null, cr = null, Od = !1, wc = !1, Rd = !1, Sa = 0;
  function wl(t) {
    t !== cr && t.next === null && (cr === null ? or = cr = t : cr = cr.next = t), wc = !0, Od || (Od = !0, o2());
  }
  function ys(t, e) {
    if (!Rd && wc) {
      Rd = !0;
      do
        for (var n = !1, i = or; i !== null; ) {
          if (t !== 0) {
            var r = i.pendingLanes;
            if (r === 0) var o = 0;
            else {
              var m = i.suspendedLanes, y = i.pingedLanes;
              o = (1 << 31 - it(42 | t) + 1) - 1, o &= r & ~(m & ~y), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (n = !0, Lv(i, o));
          } else
            o = ce, o = Xt(
              i,
              i === Ne ? o : 0,
              i.cancelPendingCommit !== null || i.timeoutHandle !== -1
            ), (o & 3) === 0 || Zt(i, o) || (n = !0, Lv(i, o));
          i = i.next;
        }
      while (n);
      Rd = !1;
    }
  }
  function s2() {
    Uv();
  }
  function Uv() {
    wc = Od = !1;
    var t = 0;
    Sa !== 0 && S2() && (t = Sa);
    for (var e = Yt(), n = null, i = or; i !== null; ) {
      var r = i.next, o = Bv(i, e);
      o === 0 ? (i.next = null, n === null ? or = r : n.next = r, r === null && (cr = n)) : (n = i, (t !== 0 || (o & 3) !== 0) && (wc = !0)), i = r;
    }
    $e !== 0 && $e !== 5 || ys(t), Sa !== 0 && (Sa = 0);
  }
  function Bv(t, e) {
    for (var n = t.suspendedLanes, i = t.pingedLanes, r = t.expirationTimes, o = t.pendingLanes & -62914561; 0 < o; ) {
      var m = 31 - it(o), y = 1 << m, w = r[m];
      w === -1 ? ((y & n) === 0 || (y & i) !== 0) && (r[m] = ze(y, e)) : w <= e && (t.expiredLanes |= y), o &= ~y;
    }
    if (e = Ne, n = ce, n = Xt(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i = t.callbackNode, n === 0 || t === e && (Ee === 2 || Ee === 9) || t.cancelPendingCommit !== null)
      return i !== null && i !== null && Ve(i), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || Zt(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (i !== null && Ve(i), Je(n)) {
        case 2:
        case 8:
          n = Ce;
          break;
        case 32:
          n = de;
          break;
        case 268435456:
          n = Ke;
          break;
        default:
          n = de;
      }
      return i = Hv.bind(null, t), n = xn(n, i), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return i !== null && i !== null && Ve(i), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Hv(t, e) {
    if ($e !== 0 && $e !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (Mc() && t.callbackNode !== n)
      return null;
    var i = ce;
    return i = Xt(
      t,
      t === Ne ? i : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), i === 0 ? null : (bv(t, i, e), Bv(t, Yt()), t.callbackNode != null && t.callbackNode === n ? Hv.bind(null, t) : null);
  }
  function Lv(t, e) {
    if (Mc()) return null;
    bv(t, e, !0);
  }
  function o2() {
    T2(function() {
      (_e & 6) !== 0 ? xn(
        ee,
        s2
      ) : Uv();
    });
  }
  function Cd() {
    if (Sa === 0) {
      var t = eu;
      t === 0 && (t = qt, qt <<= 1, (qt & 261888) === 0 && (qt = 256)), Sa = t;
    }
    return Sa;
  }
  function Yv(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : To(t);
  }
  function c2(t, e, n, i, r) {
    if (e === "submit" && n && n.stateNode === r) {
      var o = Yv(
        (r[qe] || null).action
      ), m = i.submitter;
      m && (e = (e = m[qe] || null) ? Yv(e.formAction) : m.getAttribute("formAction"), e !== null && (o = e, m = null));
      var y = new wo(
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
                  var w = new FormData(r, m);
                  Yh(
                    n,
                    {
                      pending: !0,
                      data: w,
                      method: r.method,
                      action: o
                    },
                    null,
                    w
                  );
                }
              } else
                typeof o == "function" && (y.preventDefault(), w = new FormData(r, m), Yh(
                  n,
                  {
                    pending: !0,
                    data: w,
                    method: r.method,
                    action: o
                  },
                  o,
                  w
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var zd = 0; zd < nh.length; zd++) {
    var Dd = nh[zd], f2 = Dd.toLowerCase(), h2 = Dd[0].toUpperCase() + Dd.slice(1);
    ul(
      f2,
      "on" + h2
    );
  }
  ul(cg, "onAnimationEnd"), ul(fg, "onAnimationIteration"), ul(hg, "onAnimationStart"), ul("dblclick", "onDoubleClick"), ul("focusin", "onFocus"), ul("focusout", "onBlur"), ul(bb, "onTransitionRun"), ul(Tb, "onTransitionStart"), ul(Eb, "onTransitionCancel"), ul(dg, "onTransitionEnd"), Du("onMouseEnter", ["mouseout", "mouseover"]), Du("onMouseLeave", ["mouseout", "mouseover"]), Du("onPointerEnter", ["pointerout", "pointerover"]), Du("onPointerLeave", ["pointerout", "pointerover"]), Ka(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ka(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ka("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ka(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ka(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ka(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var Ss = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), d2 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(Ss)
  );
  function qv(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var i = t[n], r = i.event;
      i = i.listeners;
      t: {
        var o = void 0;
        if (e)
          for (var m = i.length - 1; 0 <= m; m--) {
            var y = i[m], w = y.instance, H = y.currentTarget;
            if (y = y.listener, w !== o && r.isPropagationStopped())
              break t;
            o = y, r.currentTarget = H;
            try {
              o(r);
            } catch (K) {
              Ro(K);
            }
            r.currentTarget = null, o = w;
          }
        else
          for (m = 0; m < i.length; m++) {
            if (y = i[m], w = y.instance, H = y.currentTarget, y = y.listener, w !== o && r.isPropagationStopped())
              break t;
            o = y, r.currentTarget = H;
            try {
              o(r);
            } catch (K) {
              Ro(K);
            }
            r.currentTarget = null, o = w;
          }
      }
    }
  }
  function oe(t, e) {
    var n = e[Ei];
    n === void 0 && (n = e[Ei] = /* @__PURE__ */ new Set());
    var i = t + "__bubble";
    n.has(i) || (Xv(e, t, 2, !1), n.add(i));
  }
  function Nd(t, e, n) {
    var i = 0;
    e && (i |= 4), Xv(
      n,
      t,
      i,
      e
    );
  }
  var Ac = "_reactListening" + Math.random().toString(36).slice(2);
  function Ud(t) {
    if (!t[Ac]) {
      t[Ac] = !0, Am.forEach(function(n) {
        n !== "selectionchange" && (d2.has(n) || Nd(n, !1, t), Nd(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[Ac] || (e[Ac] = !0, Nd("selectionchange", !1, e));
    }
  }
  function Xv(t, e, n, i) {
    switch (R_(e)) {
      case 2:
        var r = aT;
        break;
      case 8:
        r = uT;
        break;
      default:
        r = t0;
    }
    n = r.bind(
      null,
      e,
      n,
      t
    ), r = void 0, !Gf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), i ? r !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, {
      passive: r
    }) : t.addEventListener(e, n, !1);
  }
  function Bd(t, e, n, i, r) {
    var o = i;
    if ((e & 1) === 0 && (e & 2) === 0 && i !== null)
      t: for (; ; ) {
        if (i === null) return;
        var m = i.tag;
        if (m === 3 || m === 4) {
          var y = i.stateNode.containerInfo;
          if (y === r) break;
          if (m === 4)
            for (m = i.return; m !== null; ) {
              var w = m.tag;
              if ((w === 3 || w === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = Pn(y), m === null) return;
            if (w = m.tag, w === 5 || w === 6 || w === 26 || w === 27) {
              i = o = m;
              continue t;
            }
            y = y.parentNode;
          }
        }
        i = i.return;
      }
    Xm(function() {
      var H = o, K = Xf(n), nt = [];
      t: {
        var U = mg.get(t);
        if (U !== void 0) {
          var Q = wo, bt = t;
          switch (t) {
            case "keypress":
              if (xo(n) === 0) break t;
            case "keydown":
            case "keyup":
              Q = PS;
              break;
            case "focusin":
              bt = "focus", Q = Kf;
              break;
            case "focusout":
              bt = "blur", Q = Kf;
              break;
            case "beforeblur":
            case "afterblur":
              Q = Kf;
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
              Q = jm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Q = qS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Q = nb;
              break;
            case cg:
            case fg:
            case hg:
              Q = GS;
              break;
            case dg:
              Q = lb;
              break;
            case "scroll":
            case "scrollend":
              Q = LS;
              break;
            case "wheel":
              Q = ub;
              break;
            case "copy":
            case "cut":
            case "paste":
              Q = QS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Q = Zm;
              break;
            case "submit":
              Q = tb;
              break;
            case "toggle":
            case "beforetoggle":
              Q = sb;
          }
          var Bt = (e & 4) !== 0, It = !Bt && (t === "scroll" || t === "scrollend"), B = Bt ? U !== null ? U + "Capture" : null : U;
          Bt = [];
          for (var R = H, X; R !== null; ) {
            var et = R;
            if (X = et.stateNode, et = et.tag, et !== 5 && et !== 26 && et !== 27 || X === null || B === null || (et = Gr(R, B), et != null && Bt.push(
              bs(R, et, X)
            )), It) break;
            R = R.return;
          }
          0 < Bt.length && (U = new Q(
            U,
            bt,
            null,
            n,
            K
          ), nt.push({ event: U, listeners: Bt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (Q = t === "mouseover" || t === "pointerover", U = t === "mouseout" || t === "pointerout", Q && n !== qf && (bt = n.relatedTarget || n.fromElement) && (Pn(bt) || bt[nn]))
            break t;
          (U || Q) && (bt = K.window === K ? K : (Q = K.ownerDocument) ? Q.defaultView || Q.parentWindow : window, U ? (Q = n.relatedTarget || n.toElement, U = H, Q = Q ? Pn(Q) : null, Q !== null && (It = f(Q), Bt = Q.tag, Q !== It || Bt !== 5 && Bt !== 27 && Bt !== 6) && (Q = null)) : (U = null, Q = H), U !== Q && (Bt = jm, et = "onMouseLeave", B = "onMouseEnter", R = "mouse", (t === "pointerout" || t === "pointerover") && (Bt = Zm, et = "onPointerLeave", B = "onPointerEnter", R = "pointer"), It = U == null ? bt : Za(U), X = Q == null ? bt : Za(Q), bt = new Bt(
            et,
            R + "leave",
            U,
            n,
            K
          ), bt.target = It, bt.relatedTarget = X, et = null, Pn(K) === H && (Bt = new Bt(
            B,
            R + "enter",
            Q,
            n,
            K
          ), Bt.target = X, Bt.relatedTarget = It, et = Bt), It = et, Bt = U && Q ? J(
            U,
            Q,
            m2
          ) : null, U !== null && Vv(
            nt,
            bt,
            U,
            Bt,
            !1
          ), Q !== null && It !== null && Vv(
            nt,
            It,
            Q,
            Bt,
            !0
          )));
        }
        t: {
          if (U = H ? Za(H) : window, Q = U.nodeName && U.nodeName.toLowerCase(), Q === "select" || Q === "input" && U.type === "file")
            var Ct = Im;
          else if (Pm(U))
            if (tg)
              Ct = _b;
            else {
              Ct = pb;
              var fe = gb;
            }
          else
            Q = U.nodeName, !Q || Q.toLowerCase() !== "input" || U.type !== "checkbox" && U.type !== "radio" ? H && Yf(H.elementType) && (Ct = Im) : Ct = vb;
          if (Ct && (Ct = Ct(t, H))) {
            Wm(
              nt,
              Ct,
              n,
              K
            );
            break t;
          }
          fe && fe(t, U, H);
        }
        switch (fe = H ? Za(H) : window, t) {
          case "focusin":
            (Pm(fe) || fe.contentEditable === "true") && (Yu = fe, If = H, $r = null);
            break;
          case "focusout":
            $r = If = Yu = null;
            break;
          case "mousedown":
            th = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            th = !1, sg(nt, n, K);
            break;
          case "selectionchange":
            if (Sb) break;
          case "keydown":
          case "keyup":
            sg(nt, n, K);
        }
        var Lt;
        if (kf)
          t: {
            switch (t) {
              case "compositionstart":
                var jt = "onCompositionStart";
                break t;
              case "compositionend":
                jt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                jt = "onCompositionUpdate";
                break t;
            }
            jt = void 0;
          }
        else
          Lu ? Jm(t, n) && (jt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (jt = "onCompositionStart");
        jt && (Km && n.locale !== "ko" && (Lu || jt !== "onCompositionStart" ? jt === "onCompositionEnd" && Lu && (Lt = Vm()) : (ea = K, jf = "value" in ea ? ea.value : ea.textContent, Lu = !0)), fe = Oc(H, jt), 0 < fe.length && (jt = new Qm(
          jt,
          t,
          null,
          n,
          K
        ), nt.push({ event: jt, listeners: fe }), Lt ? jt.data = Lt : (Lt = $m(n), Lt !== null && (jt.data = Lt)))), (Lt = cb ? fb(t, n) : hb(t, n)) && (jt = Oc(H, "onBeforeInput"), 0 < jt.length && (fe = new Qm(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          K
        ), nt.push({
          event: fe,
          listeners: jt
        }), fe.data = Lt)), c2(
          nt,
          t,
          H,
          n,
          K
        );
      }
      qv(nt, e);
    });
  }
  function bs(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Oc(t, e) {
    for (var n = e + "Capture", i = []; t !== null; ) {
      var r = t, o = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || o === null || (r = Gr(t, n), r != null && i.unshift(
        bs(t, r, o)
      ), r = Gr(t, e), r != null && i.push(
        bs(t, r, o)
      )), t.tag === 3) return i;
      t = t.return;
    }
    return [];
  }
  function m2(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function Vv(t, e, n, i, r) {
    for (var o = e._reactName, m = []; n !== null && n !== i; ) {
      var y = n, w = y.alternate, H = y.stateNode;
      if (y = y.tag, w !== null && w === i) break;
      y !== 5 && y !== 26 && y !== 27 || H === null || (w = H, r ? (H = Gr(n, o), H != null && m.unshift(
        bs(n, H, w)
      )) : r || (H = Gr(n, o), H != null && m.push(
        bs(n, H, w)
      ))), n = n.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var g2 = /\r\n?/g, p2 = /\u0000|\uFFFD/g;
  function Gv(t) {
    return (typeof t == "string" ? t : "" + t).replace(g2, `
`).replace(p2, "");
  }
  function jv(t, e) {
    return e = Gv(e), Gv(t) === e;
  }
  function Me(t, e, n, i, r, o) {
    switch (n) {
      case "children":
        if (typeof i == "string")
          e === "body" || e === "textarea" && i === "" || Uu(t, i);
        else if (typeof i == "number" || typeof i == "bigint")
          e !== "body" && Uu(t, "" + i);
        else return;
        break;
      case "className":
        bo(t, "class", i);
        break;
      case "tabIndex":
        bo(t, "tabindex", i);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        bo(t, n, i);
        break;
      case "style":
        Ym(t, i, o);
        return;
      case "data":
        if (e !== "object") {
          bo(t, "data", i);
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
        i = To(i), t.setAttribute(n, i);
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
          typeof o == "function" && (n === "formAction" ? (e !== "input" && Me(t, e, "name", r.name, r, null), Me(
            t,
            e,
            "formEncType",
            r.formEncType,
            r,
            null
          ), Me(
            t,
            e,
            "formMethod",
            r.formMethod,
            r,
            null
          ), Me(
            t,
            e,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (Me(t, e, "encType", r.encType, r, null), Me(t, e, "method", r.method, r, null), Me(t, e, "target", r.target, r, null)));
        if (i == null || typeof i == "symbol" || typeof i == "boolean") {
          t.removeAttribute(n);
          break;
        }
        i = To(i), t.setAttribute(n, i);
        break;
      case "onClick":
        i != null && (t.onclick = pl);
        return;
      case "onScroll":
        i != null && oe("scroll", t);
        return;
      case "onScrollEnd":
        i != null && oe("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (n = i.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            o?.__html !== n && (t.innerHTML = n);
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
        n = To(i), t.setAttributeNS(
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
        oe("beforetoggle", t), oe("toggle", t), So(t, "popover", i);
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
        So(t, "is", i);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = BS.get(n) || n, So(t, n, i);
        else return;
    }
    pe = !0;
  }
  function Hd(t, e, n, i, r, o) {
    switch (n) {
      case "style":
        Ym(t, i, o);
        return;
      case "dangerouslySetInnerHTML":
        if (i != null) {
          if (typeof i != "object" || !("__html" in i))
            throw Error(a(61));
          if (n = i.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            o?.__html !== n && (t.innerHTML = n);
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
        i != null && oe("scroll", t);
        return;
      case "onScrollEnd":
        i != null && oe("scrollend", t);
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
        if (!Om.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), o = n.slice(2, r ? n.length - 7 : void 0), e = t[qe] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(o, e, r), typeof i == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(o, i, r);
              break t;
            }
            pe = !0, n in t ? t[n] = i : i === !0 ? t.setAttribute(n, "") : So(t, n, i);
          }
        return;
    }
    pe = !0;
  }
  function Yn(t, e, n) {
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
        oe("error", t), oe("load", t);
        var i = !1, r = !1, o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var m = n[o];
            if (m != null)
              switch (o) {
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
                  Me(t, e, o, m, n, null);
              }
          }
        r && Me(t, e, "srcSet", n.srcSet, n, null), i && Me(t, e, "src", n.src, n, null);
        return;
      case "input":
        oe("invalid", t);
        var y = o = m = r = null, w = null, H = null;
        for (i in n)
          if (n.hasOwnProperty(i)) {
            var K = n[i];
            if (K != null)
              switch (i) {
                case "name":
                  r = K;
                  break;
                case "type":
                  m = K;
                  break;
                case "checked":
                  w = K;
                  break;
                case "defaultChecked":
                  H = K;
                  break;
                case "value":
                  o = K;
                  break;
                case "defaultValue":
                  y = K;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (K != null)
                    throw Error(a(137, e));
                  break;
                default:
                  Me(t, e, i, K, n, null);
              }
          }
        Um(
          t,
          o,
          y,
          w,
          H,
          m,
          r,
          !1
        );
        return;
      case "select":
        oe("invalid", t), i = m = o = null;
        for (r in n)
          if (n.hasOwnProperty(r) && (y = n[r], y != null))
            switch (r) {
              case "value":
                o = y;
                break;
              case "defaultValue":
                m = y;
                break;
              case "multiple":
                i = y;
              default:
                Me(t, e, r, y, n, null);
            }
        e = o, n = m, t.multiple = !!i, e != null ? Nu(t, !!i, e, !1) : n != null && Nu(t, !!i, n, !0);
        return;
      case "textarea":
        oe("invalid", t), o = r = i = null;
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
                o = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(a(91));
                break;
              default:
                Me(t, e, m, y, n, null);
            }
        Hm(t, i, r, o);
        return;
      case "option":
        for (w in n)
          n.hasOwnProperty(w) && (i = n[w], i != null) && (w === "selected" ? t.selected = i && typeof i != "function" && typeof i != "symbol" : Me(t, e, w, i, n, null));
        return;
      case "dialog":
        oe("beforetoggle", t), oe("toggle", t), oe("cancel", t), oe("close", t);
        break;
      case "iframe":
      case "object":
        oe("load", t);
        break;
      case "video":
      case "audio":
        for (i = 0; i < Ss.length; i++)
          oe(Ss[i], t);
        break;
      case "image":
        oe("error", t), oe("load", t);
        break;
      case "details":
        oe("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        oe("error", t), oe("load", t);
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
        for (H in n)
          if (n.hasOwnProperty(H) && (i = n[H], i != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, e));
              default:
                Me(t, e, H, i, n, null);
            }
        return;
      default:
        if (Yf(e)) {
          for (K in n)
            n.hasOwnProperty(K) && (i = n[K], i !== void 0 && Hd(
              t,
              e,
              K,
              i,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (i = n[y], i != null && Me(t, e, y, i, n, null));
  }
  var v2 = {};
  function _2(t, e, n, i) {
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
        var r = null, o = null, m = null, y = null, w = null, H = null, K = null;
        for (Q in n) {
          var nt = n[Q];
          if (n.hasOwnProperty(Q) && nt != null)
            switch (Q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                w = nt;
              default:
                i.hasOwnProperty(Q) || Me(t, e, Q, null, i, nt);
            }
        }
        for (var U in i) {
          var Q = i[U];
          if (nt = n[U], i.hasOwnProperty(U) && (Q != null || nt != null))
            switch (U) {
              case "type":
                Q !== nt && (pe = !0), o = Q;
                break;
              case "name":
                Q !== nt && (pe = !0), r = Q;
                break;
              case "checked":
                Q !== nt && (pe = !0), H = Q;
                break;
              case "defaultChecked":
                Q !== nt && (pe = !0), K = Q;
                break;
              case "value":
                Q !== nt && (pe = !0), m = Q;
                break;
              case "defaultValue":
                Q !== nt && (pe = !0), y = Q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Q != null)
                  throw Error(a(137, e));
                break;
              default:
                Q !== nt && Me(
                  t,
                  e,
                  U,
                  Q,
                  i,
                  nt
                );
            }
        }
        Hf(
          t,
          m,
          y,
          w,
          H,
          K,
          o,
          r
        );
        return;
      case "select":
        Q = m = y = U = null;
        for (o in n)
          if (w = n[o], n.hasOwnProperty(o) && w != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                Q = w;
              default:
                i.hasOwnProperty(o) || Me(
                  t,
                  e,
                  o,
                  null,
                  i,
                  w
                );
            }
        for (r in i)
          if (o = i[r], w = n[r], i.hasOwnProperty(r) && (o != null || w != null))
            switch (r) {
              case "value":
                o !== w && (pe = !0), U = o;
                break;
              case "defaultValue":
                o !== w && (pe = !0), y = o;
                break;
              case "multiple":
                o !== w && (pe = !0), m = o;
              default:
                o !== w && Me(
                  t,
                  e,
                  r,
                  o,
                  i,
                  w
                );
            }
        e = y, n = m, i = Q, U != null ? Nu(t, !!n, U, !1) : !!i != !!n && (e != null ? Nu(t, !!n, e, !0) : Nu(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        Q = U = null;
        for (y in n)
          if (r = n[y], n.hasOwnProperty(y) && r != null && !i.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Me(t, e, y, null, i, r);
            }
        for (m in i)
          if (r = i[m], o = n[m], i.hasOwnProperty(m) && (r != null || o != null))
            switch (m) {
              case "value":
                r !== o && (pe = !0), U = r;
                break;
              case "defaultValue":
                r !== o && (pe = !0), Q = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(a(91));
                break;
              default:
                r !== o && Me(t, e, m, r, i, o);
            }
        Bm(t, U, Q);
        return;
      case "option":
        for (var bt in n)
          U = n[bt], n.hasOwnProperty(bt) && U != null && !i.hasOwnProperty(bt) && (bt === "selected" ? t.selected = !1 : Me(
            t,
            e,
            bt,
            null,
            i,
            U
          ));
        for (w in i)
          U = i[w], Q = n[w], i.hasOwnProperty(w) && U !== Q && (U != null || Q != null) && (w === "selected" ? (U !== Q && (pe = !0), t.selected = U && typeof U != "function" && typeof U != "symbol") : Me(
            t,
            e,
            w,
            U,
            i,
            Q
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
        for (var Bt in n)
          U = n[Bt], n.hasOwnProperty(Bt) && U != null && !i.hasOwnProperty(Bt) && Me(t, e, Bt, null, i, U);
        for (H in i)
          if (U = i[H], Q = n[H], i.hasOwnProperty(H) && U !== Q && (U != null || Q != null))
            switch (H) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (U != null)
                  throw Error(a(137, e));
                break;
              default:
                Me(
                  t,
                  e,
                  H,
                  U,
                  i,
                  Q
                );
            }
        return;
      default:
        if (Yf(e)) {
          for (var It in n)
            U = n[It], n.hasOwnProperty(It) && U !== void 0 && !i.hasOwnProperty(It) && Hd(
              t,
              e,
              It,
              void 0,
              i,
              U
            );
          for (K in i)
            U = i[K], Q = n[K], !i.hasOwnProperty(K) || U === Q || U === void 0 && Q === void 0 || Hd(
              t,
              e,
              K,
              U,
              i,
              Q
            );
          return;
        }
    }
    for (var B in n)
      U = n[B], n.hasOwnProperty(B) && U != null && !i.hasOwnProperty(B) && Me(t, e, B, null, i, U);
    for (nt in i)
      U = i[nt], Q = n[nt], !i.hasOwnProperty(nt) || U === Q || U == null && Q == null || Me(t, e, nt, U, i, Q);
  }
  function Qv(t) {
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
  function y2() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), i = 0; i < n.length; i++) {
        var r = n[i], o = r.transferSize, m = r.initiatorType, y = r.duration;
        if (o && y && Qv(m)) {
          for (m = 0, y = r.responseEnd, i += 1; i < n.length; i++) {
            var w = n[i], H = w.startTime;
            if (H > y) break;
            var K = w.transferSize, nt = w.initiatorType;
            K && Qv(nt) && (w = w.responseEnd, m += K * (w < y ? 1 : (y - H) / (w - H)));
          }
          if (--i, e += 8 * (o + m) / (r.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Ld = null, Yd = null;
  function Ts(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function Zv(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Kv(t, e) {
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
  function Fv(t, e, n, i) {
    return n = Ts(
      n
    ).createElement(t), n[je] = i, n[qe] = e, Yn(n, t, e), cn(n), n;
  }
  function qd(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Xd = null;
  function S2() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Xd ? !1 : (Xd = t, !0) : (Xd = null, !1);
  }
  var Vd = typeof setTimeout == "function" ? setTimeout : void 0, b2 = typeof clearTimeout == "function" ? clearTimeout : void 0, kv = typeof Promise == "function" ? Promise : void 0, Jv = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Vd, T2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof kv < "u" ? function(t) {
    return kv.resolve(null).then(t).catch(E2);
  } : Vd;
  function E2(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ba(t) {
    return t === "head";
  }
  function $v(t, e) {
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
          Jd(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Jd(n);
          for (var o = n.firstChild; o; ) {
            var m = o.nextSibling, y = o.nodeName;
            o[ln] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && o.rel.toLowerCase() === "stylesheet" || n.removeChild(o), o = m;
          }
        } else
          n === "body" && Jd(t.ownerDocument.body);
      n = r;
    } while (n);
    vr(e);
  }
  function Pv(t, e) {
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
  function Wv(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var i = 1;
      else
        for (var r = i = 0; r < e.length; r++) {
          var o = e[r];
          0 < o.width && 0 < o.height && i++;
        }
      i === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Iv(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function x2(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function Gd(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return x2(e, n, t);
  }
  function M2(t) {
    return t.documentElement.clientHeight;
  }
  function w2(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function A2(t, e, n, i, r, o, m, y, w) {
    var H = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var K = H.startViewTransition({
        update: function() {
          var U = H.defaultView, Q = U.navigation && U.navigation.transition, bt = H.fonts.status;
          i();
          var Bt = [];
          if (bt === "loaded" && (M2(H), H.fonts.status === "loading" && Bt.push(H.fonts.ready)), bt = Bt.length, t !== null)
            for (var It = t.suspenseyImages, B = 0, R = 0; R < It.length; R++) {
              var X = It[R];
              if (!X.complete) {
                var et = X.getBoundingClientRect();
                if (0 < et.bottom && 0 < et.right && et.top < U.innerHeight && et.left < U.innerWidth) {
                  if (B += S_(X), B > zc) {
                    Bt.length = bt;
                    break;
                  }
                  X = new Promise(
                    w2.bind(X)
                  ), Bt.push(X);
                }
              }
            }
          if (0 < Bt.length)
            return U = Promise.race([
              Promise.all(Bt),
              new Promise(function(Ct) {
                return setTimeout(Ct, 500);
              })
            ]).then(r, r), (Q ? Promise.allSettled([Q.finished, U]) : U).then(o, o);
          if (r(), Q)
            return Q.finished.then(
              o,
              o
            );
          o();
        },
        types: n
      });
      H.__reactViewTransition = K;
      var nt = [];
      return K.ready.then(
        function() {
          for (var U = H.documentElement.getAnimations({
            subtree: !0
          }), Q = 0; Q < U.length; Q++) {
            var bt = U[Q], Bt = bt.effect, It = Bt.pseudoElement;
            if (It != null && It.startsWith("::view-transition")) {
              nt.push(bt), bt = Bt.getKeyframes();
              for (var B = It = void 0, R = !0, X = 0; X < bt.length; X++) {
                var et = bt[X], Ct = et.width;
                if (It === void 0) It = Ct;
                else if (It !== Ct) {
                  R = !1;
                  break;
                }
                if (Ct = et.height, B === void 0) B = Ct;
                else if (B !== Ct) {
                  R = !1;
                  break;
                }
                delete et.width, delete et.height, et.transform === "none" && delete et.transform;
              }
              R && It !== void 0 && B !== void 0 && (Bt.setKeyframes(bt), R = getComputedStyle(
                Bt.target,
                Bt.pseudoElement
              ), R.width !== It || R.height !== B) && (R = bt[0], R.width = It, R.height = B, R = bt[bt.length - 1], R.width = It, R.height = B, Bt.setKeyframes(bt));
            }
          }
          m();
        },
        function(U) {
          H.__reactViewTransition === K && (H.__reactViewTransition = null);
          try {
            typeof U == "object" && U !== null && U.name === "InvalidStateError" && (U.message === "View transition was skipped because document visibility state is hidden." || U.message === "Skipping view transition because document visibility state has become hidden." || U.message === "Skipping view transition because viewport size changed." || U.message === "Transition was aborted because of invalid state") && (U = null), U !== null && w(U);
          } finally {
            i(), r(), m();
          }
        }
      ), K.finished.finally(function() {
        for (var U = 0; U < nt.length; U++)
          nt[U].cancel();
        H.__reactViewTransition === K && (H.__reactViewTransition = null), y();
      }), K;
    } catch {
      return i(), r(), m(), null;
    }
  }
  function hu(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  hu.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : C({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, hu.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), i = [], r = 0; r < n.length; r++) {
      var o = n[r].effect;
      o !== null && o.target === t && o.pseudoElement === e && i.push(n[r]);
    }
    return i;
  }, hu.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function t_(t) {
    return {
      name: t,
      group: new hu("group", t),
      imagePair: new hu("image-pair", t),
      old: new hu("old", t),
      new: new hu("new", t)
    };
  }
  function zi(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  zi.prototype.addEventListener = function(t, e, n) {
    var i = null, r = null;
    if (!(n != null && typeof n != "boolean" && (i = n.signal || null, i !== null && i.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var o = this._eventListeners;
      if (n_(o, t, e, n) === -1) {
        var m = this, y = e;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(w) {
          m.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, w) : e.handleEvent(w);
        }), i !== null && (r = m.removeEventListener.bind(
          m,
          t,
          e,
          n
        ), i.addEventListener("abort", r, { once: !0 }), r = i.removeEventListener.bind(i, "abort", r)), i = fr(n), o.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: r
        }), _(
          this._fragmentFiber.child,
          !1,
          O2,
          t,
          y,
          i
        );
      }
      this._eventListeners = o;
    }
  };
  function O2(t, e, n, i) {
    return O(t).addEventListener(
      e,
      n,
      i
    ), !1;
  }
  zi.prototype.removeEventListener = function(t, e, n) {
    var i = this._eventListeners;
    if (i !== null && (e = n_(
      i,
      t,
      e,
      n
    ), e !== -1)) {
      var r = i[e];
      n = r.attachedListener;
      var o = r.cleanup;
      r = fr(r.optionsOrUseCapture), _(
        this._fragmentFiber.child,
        !1,
        R2,
        t,
        n,
        r
      ), i.splice(e, 1), o !== null && o();
    }
  };
  function R2(t, e, n, i) {
    return O(t).removeEventListener(
      e,
      n,
      i
    ), !1;
  }
  function fr(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function e_(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function n_(t, e, n, i) {
    if (t.length === 0) return -1;
    i = e_(i);
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      if (o.type === e && o.listener === n && e_(o.optionsOrUseCapture) === i)
        return r;
    }
    return -1;
  }
  zi.prototype.dispatchEvent = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = O(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var i = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          i.addEventListener(
            o.type,
            o.attachedListener,
            fr(o.optionsOrUseCapture)
          );
        }
      if (e.appendChild(i), t = i.dispatchEvent(t), n)
        for (r = 0; r < n.length; r++)
          o = n[r], i.removeEventListener(
            o.type,
            o.attachedListener,
            fr(o.optionsOrUseCapture)
          );
      return e.removeChild(i), t;
    }
    return e.dispatchEvent(t);
  }, zi.prototype.focus = function(t) {
    _(
      this._fragmentFiber.child,
      !0,
      i_,
      t,
      void 0,
      void 0
    );
  };
  function i_(t, e) {
    return t.tag === 6 ? !1 : (t = O(t), V2(t, e));
  }
  zi.prototype.focusLast = function(t) {
    var e = [];
    _(
      this._fragmentFiber.child,
      !0,
      jd,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !i_(e[n], t); n--) ;
  };
  function jd(t, e) {
    return e.push(t), !1;
  }
  zi.prototype.blur = function() {
    var t = S(
      this._fragmentFiber
    );
    t !== null && (t = O(t), t = Ts(t).activeElement, t !== null && _(
      this._fragmentFiber.child,
      !1,
      C2,
      t,
      void 0,
      void 0
    ));
  };
  function C2(t, e) {
    return t.tag === 6 ? !1 : (t = O(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  zi.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), _(
      this._fragmentFiber.child,
      !1,
      z2,
      t,
      void 0,
      void 0
    );
  };
  function z2(t, e) {
    return t.tag === 6 || (t = O(t), e.observe(t)), !1;
  }
  zi.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), _(
        this._fragmentFiber.child,
        !1,
        D2,
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
  function D2(t, e) {
    return t.tag === 6 || (t = O(t), e.unobserve(t)), !1;
  }
  var fl = [], Qd = !1;
  function N2(t, e, n) {
    fl.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Qd || (Qd = !0, G2(function() {
      Qd = !1;
      var i = fl;
      fl = [];
      for (var r = 0; r < i.length; r++) {
        var o = i[r];
        o.observer.unobserve(o.instance);
      }
    }));
  }
  zi.prototype.getClientRects = function() {
    var t = [];
    return _(
      this._fragmentFiber.child,
      !1,
      U2,
      t,
      void 0,
      void 0
    ), t;
  };
  function U2(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = O(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  zi.prototype.getRootNode = function(t) {
    var e = S(
      this._fragmentFiber
    );
    return e === null ? this : O(e).getRootNode(t);
  }, zi.prototype.compareDocumentPosition = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    _(
      this._fragmentFiber.child,
      !1,
      jd,
      n,
      void 0,
      void 0
    );
    var i = O(e);
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
      return n === t ? r = Node.DOCUMENT_POSITION_CONTAINS : i & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = M(e)[1], n === null ? r = Node.DOCUMENT_POSITION_PRECEDING : (t = O(n).compareDocumentPosition(
        t
      ), r = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), r |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = O(n[0]), r = O(n[n.length - 1]);
    var o = b(this._fragmentFiber) ? e.parentElement : i;
    if (o == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    i = o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, o = o.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var m = e.compareDocumentPosition(t), y = r.compareDocumentPosition(t), w = m & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = i && o && m & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, e = i && e === t || o && r === t || w || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !i && e === t || !o && r === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : m, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || B2(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function B2(t, e, n, i, r) {
    var o = Pn(r);
    if (t & Node.DOCUMENT_POSITION_CONTAINED_BY) {
      if (n = !!o)
        t: {
          for (; o !== null; ) {
            if (o.tag === 7 && (o === e || o.alternate === e)) {
              n = !0;
              break t;
            }
            o = o.return;
          }
          n = !1;
        }
      return n;
    }
    if (t & Node.DOCUMENT_POSITION_CONTAINS) {
      if (o === null)
        return o = r.ownerDocument, r === o || r === o.documentElement || r === o.body;
      t: {
        for (o = e, e = S(e); o !== null; ) {
          if (!(o.tag !== 5 && o.tag !== 3 && o.tag !== 27 || o !== e && o.alternate !== e)) {
            o = !0;
            break t;
          }
          o = o.return;
        }
        o = !1;
      }
      return o;
    }
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!o) && !(e = o === n) && (e = J(
      n,
      o,
      D
    ), e === null ? e = !1 : (_(
      e,
      !0,
      k,
      o,
      n
    ), o = G, G = null, e = o !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!o) && !(e = o === i) && (e = J(
      i,
      o,
      D
    ), e === null ? e = !1 : (_(
      e,
      !0,
      L,
      o,
      i
    ), o = G, q = G = null, e = o !== null)), e) : !1;
  }
  function l_(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  zi.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(a(566));
    var e = [];
    _(
      this._fragmentFiber.child,
      !1,
      jd,
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
        t = O(i), l_(t, n);
        return;
      }
      if (i = O(i), i.nodeType !== 9) {
        if (i.nodeType === 11) {
          n = "host" in i ? i.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        i.scrollIntoView(t);
      }
    }
    for (i = n ? e.length - 1 : 0; i !== (n ? -1 : e.length); ) {
      var r = e[i];
      r.tag === 6 ? (r = O(r), l_(r, n)) : O(r).scrollIntoView(t), i += n ? -1 : 1;
    }
  };
  function H2(t, e) {
    return t = O(t), a_(t, e), !1;
  }
  function a_(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function u_(t, e) {
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
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      for (var m = 0, y = 0; y < fl.length; y++) {
        var w = fl[y];
        (w.fragmentInstance !== e || w.observer !== o || w.instance !== t) && (fl[m++] = w);
      }
      fl.length = m, o.observe(t);
    }), a_(t, e));
  }
  function L2(t, e) {
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
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      typeof o.rootMargin == "string" ? N2(
        e,
        o,
        t
      ) : o.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Zd(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Zd(n), $n(n);
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
  function Y2(t, e, n, i) {
    for (; t.nodeType === 1; ) {
      var r = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!i && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (i) {
        if (!t[ln])
          switch (e) {
            case "meta":
              if (!t.hasAttribute("itemprop")) break;
              return t;
            case "link":
              if (o = t.getAttribute("rel"), o === "stylesheet" && t.hasAttribute("data-precedence"))
                break;
              if (o !== r.rel || t.getAttribute("href") !== (r.href == null || r.href === "" ? null : r.href) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin) || t.getAttribute("title") !== (r.title == null ? null : r.title))
                break;
              return t;
            case "style":
              if (t.hasAttribute("data-precedence")) break;
              return t;
            case "script":
              if (o = t.getAttribute("src"), (o !== (r.src == null ? null : r.src) || t.getAttribute("type") !== (r.type == null ? null : r.type) || t.getAttribute("crossorigin") !== (r.crossOrigin == null ? null : r.crossOrigin)) && o && t.hasAttribute("async") && !t.hasAttribute("itemprop"))
                break;
              return t;
            default:
              return t;
          }
      } else if (e === "input" && t.type === "hidden") {
        var o = r.name == null ? null : "" + r.name;
        if (r.type === "hidden" && t.getAttribute("name") === o)
          return t;
      } else return t;
      if (t = Pi(t.nextSibling), t === null) break;
    }
    return null;
  }
  function q2(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Pi(t.nextSibling), t === null)) return null;
    return t;
  }
  function r_(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Pi(t.nextSibling), t === null)) return null;
    return t;
  }
  function Kd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Fd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function X2(t, e) {
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
  function Pi(t) {
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
  var kd = null;
  function s_(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Pi(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function o_(t) {
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
  function V2(t, e) {
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
  function G2(t) {
    Jv(function() {
      Jv(function(e) {
        return t(e);
      });
    });
  }
  function c_(t, e, n) {
    switch (e = Ts(n), t) {
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
  function f_(t, e, n) {
    for (var i in n) {
      var r = n[i];
      n.hasOwnProperty(i) && r != null && Me(t, e, i, null, v2, r);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === pl && (t.onclick = null), $n(t);
  }
  function Jd(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    $n(t);
  }
  var Wi = /* @__PURE__ */ new Map(), h_ = /* @__PURE__ */ new Set();
  function Es(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Fl = ct.d;
  ct.d = {
    f: j2,
    r: Q2,
    D: Z2,
    C: K2,
    L: F2,
    m: k2,
    X: $2,
    S: J2,
    M: P2
  };
  function j2() {
    var t = Fl.f(), e = Tc();
    return t || e;
  }
  function Q2(t) {
    var e = ji(t);
    e !== null && e.tag === 5 && e.type === "form" ? mp(e) : Fl.r(t);
  }
  var hr = typeof document > "u" ? null : document;
  function d_(t, e, n) {
    var i = hr;
    if (i && typeof e == "string" && e) {
      var r = Qi(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), h_.has(r) || (h_.add(r), t = { rel: t, crossOrigin: n, href: e }, i.querySelector(r) === null && (e = i.createElement("link"), Yn(e, "link", t), cn(e), i.head.appendChild(e)));
    }
  }
  function Z2(t) {
    Fl.D(t), d_("dns-prefetch", t, null);
  }
  function K2(t, e) {
    Fl.C(t, e), d_("preconnect", t, e);
  }
  function F2(t, e, n) {
    Fl.L(t, e, n);
    var i = hr;
    if (i && t && e) {
      var r = 'link[rel="preload"][as="' + Qi(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + Qi(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + Qi(
        n.imageSizes
      ) + '"]')) : r += '[href="' + Qi(t) + '"]';
      var o = r;
      switch (e) {
        case "style":
          o = dr(t);
          break;
        case "script":
          o = mr(t);
      }
      if (!(Wi.has(o) || (t = C(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Wi.set(o, t), i.querySelector(r) !== null || e === "style" && i.querySelector(xs(o)) || e === "script" && i.querySelector(Ms(o))))) {
        var m = i.createElement("link");
        Yn(m, "link", t), e === "style" && (m[an] = !0, m.onload = m.onerror = function() {
          wm(m);
        }), cn(m), i.head.appendChild(m);
      }
    }
  }
  function k2(t, e) {
    Fl.m(t, e);
    var n = hr;
    if (n && t) {
      var i = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + Qi(i) + '"][href="' + Qi(t) + '"]', o = r;
      switch (i) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = mr(t);
      }
      if (!Wi.has(o) && (t = C({ rel: "modulepreload", href: t }, e), Wi.set(o, t), n.querySelector(r) === null)) {
        switch (i) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Ms(o)))
              return;
        }
        i = n.createElement("link"), Yn(i, "link", t), cn(i), n.head.appendChild(i);
      }
    }
  }
  function J2(t, e, n) {
    Fl.S(t, e, n);
    var i = hr;
    if (i && t) {
      var r = gl(i).hoistableStyles, o = dr(t);
      e = e || "default";
      var m = r.get(o);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = i.querySelector(
          xs(o)
        ))
          y.loading = 5;
        else {
          t = C(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Wi.get(o)) && $d(t, n);
          var w = m = i.createElement("link");
          cn(w), Yn(w, "link", t), w._p = new Promise(function(H, K) {
            w.onload = H, w.onerror = K;
          }), w.addEventListener("load", function() {
            y.loading |= 1;
          }), w.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Rc(m, e, i);
        }
        m = {
          type: "stylesheet",
          instance: m,
          count: 1,
          state: y
        }, r.set(o, m);
      }
    }
  }
  function $2(t, e) {
    Fl.X(t, e);
    var n = hr;
    if (n && t) {
      var i = gl(n).hoistableScripts, r = mr(t), o = i.get(r);
      o || (o = n.querySelector(Ms(r)), o || (t = C({ src: t, async: !0 }, e), (e = Wi.get(r)) && Pd(t, e), o = n.createElement("script"), cn(o), Yn(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, i.set(r, o));
    }
  }
  function P2(t, e) {
    Fl.M(t, e);
    var n = hr;
    if (n && t) {
      var i = gl(n).hoistableScripts, r = mr(t), o = i.get(r);
      o || (o = n.querySelector(Ms(r)), o || (t = C({ src: t, async: !0, type: "module" }, e), (e = Wi.get(r)) && Pd(t, e), o = n.createElement("script"), cn(o), Yn(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, i.set(r, o));
    }
  }
  function m_(t, e, n, i) {
    var r = (r = Mt.current) ? Es(r) : null;
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
          var o = gl(
            r
          ).hoistableStyles, m = o.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(t, m), (o = r.querySelector(
            xs(t)
          )) ? o._p || (m.instance = o, m.state.loading = 5) : (o = Wi.get(t), o || (o = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Wi.set(t, o)), W2(
            r,
            t,
            o,
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
  function xs(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function g_(t) {
    return C({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function W2(t, e, n, i) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[an] !== !0) {
        i.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[an] = !0, e.onload = e.onerror = wm.bind(null, e), Yn(e, "link", n), cn(e), t.head.appendChild(e);
    i.preload = e, e.addEventListener("load", function() {
      return i.loading |= 1;
    }), e.addEventListener("error", function() {
      return i.loading |= 2;
    });
  }
  function mr(t) {
    return '[src="' + Qi(t) + '"]';
  }
  function Ms(t) {
    return "script[async]" + t;
  }
  function p_(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var i = t.querySelector(
            'style[data-href~="' + Qi(n.href) + '"]'
          );
          if (i)
            return e.instance = i, cn(i), i;
          var r = C({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return i = (t.ownerDocument || t).createElement(
            "style"
          ), cn(i), Yn(i, "style", r), Rc(i, n.precedence, t), e.instance = i;
        case "stylesheet":
          r = dr(n.href);
          var o = t.querySelector(
            xs(r)
          );
          if (o)
            return e.state.loading |= 4, e.instance = o, cn(o), o;
          i = g_(n), (r = Wi.get(r)) && $d(i, r), o = (t.ownerDocument || t).createElement("link"), cn(o);
          var m = o;
          return m._p = new Promise(function(y, w) {
            m.onload = y, m.onerror = w;
          }), Yn(o, "link", i), e.state.loading |= 4, Rc(o, n.precedence, t), e.instance = o;
        case "script":
          return o = mr(n.src), (r = t.querySelector(
            Ms(o)
          )) ? (e.instance = r, cn(r), r) : (i = n, (r = Wi.get(o)) && (i = C({}, n), Pd(i, r)), t = t.ownerDocument || t, r = t.createElement("script"), cn(r), Yn(r, "link", i), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(a(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (i = e.instance, e.state.loading |= 4, Rc(i, n.precedence, t));
    return e.instance;
  }
  function Rc(t, e, n) {
    for (var i = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = i.length ? i[i.length - 1] : null, o = r, m = 0; m < i.length; m++) {
      var y = i[m];
      if (y.dataset.precedence === e) o = y;
      else if (o !== r) break;
    }
    o ? o.parentNode.insertBefore(t, o.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function $d(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Pd(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Cc = null;
  function v_(t, e, n) {
    if (Cc === null) {
      var i = /* @__PURE__ */ new Map(), r = Cc = /* @__PURE__ */ new Map();
      r.set(n, i);
    } else
      r = Cc, i = r.get(n), i || (i = /* @__PURE__ */ new Map(), r.set(n, i));
    if (i.has(t)) return i;
    for (i.set(t, null), n = n.getElementsByTagName(t), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!(o[ln] || o[je] || t === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = o.getAttribute(e) || "";
        m = t + m;
        var y = i.get(m);
        y ? y.push(o) : i.set(m, [o]);
      }
    }
    return i;
  }
  function Wd(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function I2(t, e, n) {
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
  function __(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function y_(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function S_(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function b_(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += S_(e), t.suspenseyImages.push(e)), t = nT.bind(t), e.decode().then(t, t));
  }
  function tT(t, e, n, i) {
    if (n.type === "stylesheet" && (typeof i.media != "string" || matchMedia(i.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = dr(i.href), o = e.querySelector(
          xs(r)
        );
        if (o) {
          e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = ws.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = o, cn(o);
          return;
        }
        o = e.ownerDocument || e, i = g_(i), (r = Wi.get(r)) && $d(i, r), o = o.createElement("link"), cn(o);
        var m = o;
        m._p = new Promise(function(y, w) {
          m.onload = y, m.onerror = w;
        }), Yn(o, "link", i), n.instance = o;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = ws.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var zc = 0;
  function eT(t, e) {
    return t.stylesheets && t.count === 0 && Nc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var i = setTimeout(function() {
        if (t.stylesheets && Nc(t, t.stylesheets), t.unsuspend) {
          var o = t.unsuspend;
          t.unsuspend = null, o();
        }
      }, 6e4 + e);
      0 < t.imgBytes && zc === 0 && (zc = 62500 * y2());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Nc(t, t.stylesheets), t.unsuspend)) {
            var o = t.unsuspend;
            t.unsuspend = null, o();
          }
        },
        (t.imgBytes > zc ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(i), clearTimeout(r);
      };
    } : null;
  }
  function T_(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Nc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function ws() {
    this.count--, T_(this);
  }
  function nT() {
    this.imgCount--, T_(this);
  }
  var Dc = null;
  function Nc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Dc = /* @__PURE__ */ new Map(), e.forEach(iT, t), Dc = null, ws.call(t));
  }
  function iT(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Dc.get(t);
      if (n) var i = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Dc.set(t, n);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < r.length; o++) {
          var m = r[o];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), i = m);
        }
        i && n.set(null, i);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), o = n.get(m) || i, o === i && n.set(null, r), n.set(m, r), this.count++, i = ws.bind(this), r.addEventListener("load", i), r.addEventListener("error", i), o ? o.parentNode.insertBefore(r, o.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
    }
  }
  var gr = {
    $$typeof: tt,
    Provider: null,
    Consumer: null,
    _currentValue: wt,
    _currentValue2: wt,
    _threadCount: 0
  };
  function lT(t, e, n, i, r, o, m, y, w) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ge(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ge(0), this.hiddenUpdates = Ge(null), this.identifierPrefix = i, this.onUncaughtError = r, this.onCaughtError = o, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = w, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function E_(t, e, n, i, r, o, m, y, w, H, K, nt) {
    return t = new lT(
      t,
      e,
      n,
      m,
      w,
      H,
      K,
      nt,
      y
    ), e = 1, o === !0 && (e |= 24), o = oi(3, null, null, e), t.current = o, o.stateNode = t, e = dh(), e.refCount++, t.pooledCache = e, e.refCount++, o.memoizedState = {
      element: i,
      isDehydrated: n,
      cache: e
    }, vh(o), t;
  }
  function x_(t) {
    return t ? (t = Vu, t) : Vu;
  }
  function M_(t, e, n, i, r, o) {
    r = x_(r), i.context === null ? i.context = r : i.pendingContext = r, i = oa(e), i.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (i.callback = o), n = ca(t, i, e), n !== null && (di(n, t, e), is(n, t, e));
  }
  function w_(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Id(t, e) {
    w_(t, e), (t = t.alternate) && w_(t, e);
  }
  function A_(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ja(t, 67108864);
      e !== null && di(e, t, 67108864), Id(t, 67108864);
    }
  }
  function O_(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ci();
      e = ml(e);
      var n = Ja(t, e);
      n !== null && di(n, t, e), Id(t, e);
    }
  }
  var pr = !0;
  function aT(t, e, n, i) {
    var r = ot.T;
    ot.T = null;
    var o = ct.p;
    try {
      ct.p = 2, t0(t, e, n, i);
    } finally {
      ct.p = o, ot.T = r;
    }
  }
  function uT(t, e, n, i) {
    var r = ot.T;
    ot.T = null;
    var o = ct.p;
    try {
      ct.p = 8, t0(t, e, n, i);
    } finally {
      ct.p = o, ot.T = r;
    }
  }
  function t0(t, e, n, i) {
    if (pr) {
      var r = e0(i);
      if (r === null)
        Bd(
          t,
          e,
          i,
          Uc,
          n
        ), C_(t, i);
      else if (sT(
        r,
        t,
        e,
        n,
        i
      ))
        i.stopPropagation();
      else if (C_(t, i), e & 4 && -1 < rT.indexOf(t)) {
        for (; r !== null; ) {
          var o = ji(r);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var m = re(o.pendingLanes);
                  if (m !== 0) {
                    var y = o;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var w = 1 << 31 - it(m);
                      y.entanglements[1] |= w, m &= ~w;
                    }
                    wl(o), (_e & 6) === 0 && (yc = Yt() + 500, ys(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = Ja(o, 2), y !== null && di(y, o, 2), Tc(), Id(o, 2);
            }
          if (o = e0(i), o === null && Bd(
            t,
            e,
            i,
            Uc,
            n
          ), o === r) break;
          r = o;
        }
        r !== null && i.stopPropagation();
      } else
        Bd(
          t,
          e,
          i,
          null,
          n
        );
    }
  }
  function e0(t) {
    return t = Xf(t), n0(t);
  }
  var Uc = null;
  function n0(t) {
    if (Uc = null, t = Pn(t), t !== null) {
      var e = f(t);
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
    return Uc = t, null;
  }
  function R_(t) {
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
        switch (Jt()) {
          case ee:
            return 2;
          case Ce:
            return 8;
          case de:
          case Nn:
            return 32;
          case Ke:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var i0 = !1, Ta = null, Ea = null, xa = null, As = /* @__PURE__ */ new Map(), Os = /* @__PURE__ */ new Map(), Ma = [], rT = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function C_(t, e) {
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
        As.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Os.delete(e.pointerId);
    }
  }
  function Rs(t, e, n, i, r, o) {
    return t === null || t.nativeEvent !== o ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: i,
      nativeEvent: o,
      targetContainers: [r]
    }, e !== null && (e = ji(e), e !== null && A_(e)), t) : (t.eventSystemFlags |= i, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function sT(t, e, n, i, r) {
    switch (e) {
      case "focusin":
        return Ta = Rs(
          Ta,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "dragenter":
        return Ea = Rs(
          Ea,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "mouseover":
        return xa = Rs(
          xa,
          t,
          e,
          n,
          i,
          r
        ), !0;
      case "pointerover":
        var o = r.pointerId;
        return As.set(
          o,
          Rs(
            As.get(o) || null,
            t,
            e,
            n,
            i,
            r
          )
        ), !0;
      case "gotpointercapture":
        return o = r.pointerId, Os.set(
          o,
          Rs(
            Os.get(o) || null,
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
  function z_(t) {
    var e = Pn(t.target);
    if (e !== null) {
      var n = f(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, Mn(t.priority, function() {
              O_(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = d(n), e !== null) {
            t.blockedOn = e, Mn(t.priority, function() {
              O_(n);
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
  function Bc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = e0(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var i = new n.constructor(
          n.type,
          n
        );
        qf = i, n.target.dispatchEvent(i), qf = null;
      } else
        return e = ji(n), e !== null && A_(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function D_(t, e, n) {
    Bc(t) && n.delete(e);
  }
  function oT() {
    i0 = !1, Ta !== null && Bc(Ta) && (Ta = null), Ea !== null && Bc(Ea) && (Ea = null), xa !== null && Bc(xa) && (xa = null), As.forEach(D_), Os.forEach(D_);
  }
  function Hc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, i0 || (i0 = !0, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      oT
    )));
  }
  var Lc = null;
  function N_(t) {
    Lc !== t && (Lc = t, c.unstable_scheduleCallback(
      c.unstable_NormalPriority,
      function() {
        Lc === t && (Lc = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], i = t[e + 1], r = t[e + 2];
          if (typeof i != "function") {
            if (n0(i || n) === null)
              continue;
            break;
          }
          var o = ji(n);
          o !== null && (t.splice(e, 3), e -= 3, Yh(
            o,
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
    function e(w) {
      return Hc(w, t);
    }
    Ta !== null && Hc(Ta, t), Ea !== null && Hc(Ea, t), xa !== null && Hc(xa, t), As.forEach(e), Os.forEach(e);
    for (var n = 0; n < Ma.length; n++) {
      var i = Ma[n];
      i.blockedOn === t && (i.blockedOn = null);
    }
    for (; 0 < Ma.length && (n = Ma[0], n.blockedOn === null); )
      z_(n), n.blockedOn === null && Ma.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (i = 0; i < n.length; i += 3) {
        var r = n[i], o = n[i + 1], m = r[qe] || null;
        if (typeof o == "function")
          m || N_(n);
        else if (m) {
          var y = null;
          if (o && o.hasAttribute("formAction")) {
            if (r = o, m = o[qe] || null)
              y = m.formAction;
            else if (n0(r) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? n[i + 1] = y : (n.splice(i, 3), i -= 3), N_(n);
        }
      }
  }
  function U_() {
    function t(o) {
      o.canIntercept && o.info === "react-transition" && o.intercept({
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
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
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
  function l0(t) {
    this._internalRoot = t;
  }
  Yc.prototype.render = l0.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(a(409));
    var n = e.current, i = Ci();
    M_(n, i, t, e, null, null);
  }, Yc.prototype.unmount = l0.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      M_(t.current, 2, null, t, null, null), Tc(), e[nn] = null;
    }
  };
  function Yc(t) {
    this._internalRoot = t;
  }
  Yc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Ye();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Ma.length && e !== 0 && e < Ma[n].priority; n++) ;
      Ma.splice(n, 0, t), n === 0 && z_(t);
    }
  };
  var B_ = l.version;
  if (B_ !== "19.3.1")
    throw Error(
      a(
        527,
        B_,
        "19.3.1"
      )
    );
  ct.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(a(188)) : (t = Object.keys(t).join(","), Error(a(268, t)));
    return t = v(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var cT = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: ot,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var qc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!qc.isDisabled && qc.supportsFiber)
      try {
        lt = qc.inject(
          cT
        ), at = qc;
      } catch {
      }
  }
  return zs.createRoot = function(t, e) {
    if (!s(t)) throw Error(a(299));
    var n = !1, i = "", r = xp, o = Mp, m = wp;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (i = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (o = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = E_(
      t,
      1,
      !1,
      null,
      null,
      n,
      i,
      null,
      r,
      o,
      m,
      U_
    ), t[nn] = e.current, Ud(t), new l0(e);
  }, zs.hydrateRoot = function(t, e, n) {
    if (!s(t)) throw Error(a(299));
    var i = !1, r = "", o = xp, m = Mp, y = wp, w = null;
    return n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (w = n.formState)), e = E_(
      t,
      1,
      !0,
      e,
      n ?? null,
      i,
      r,
      w,
      o,
      m,
      y,
      U_
    ), e.context = x_(null), n = e.current, i = Ci(), i = ml(i), r = oa(i), r.callback = null, ca(n, r, i), n = i, e.current.lanes = n, ke(e, n), wl(e), t[nn] = e.current, Ud(t), new Yc(e);
  }, zs.version = "19.3.1", zs;
}
var Z_;
function ST() {
  if (Z_) return r0.exports;
  Z_ = 1;
  function c() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(c);
      } catch (l) {
        console.error(l);
      }
  }
  return c(), r0.exports = yT(), r0.exports;
}
var bT = ST(), K_ = "1.3.27";
function P1(c, l, u) {
  return Math.max(c, Math.min(l, u));
}
function TT(c, l, u) {
  return (1 - u) * c + u * l;
}
function ET(c, l, u, a) {
  return TT(c, l, 1 - Math.exp(-u * a));
}
function xT(c, l) {
  return (c % l + l) % l;
}
var MT = class {
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
  advance(c) {
    if (!this.isRunning) return;
    let l = !1;
    if (this.duration && this.easing) {
      this.currentTime += c;
      const u = P1(0, this.currentTime / this.duration, 1);
      l = u >= 1;
      const a = l ? 1 : this.easing(u);
      this.value = this.from + (this.to - this.from) * a;
    } else this.lerp ? (this.value = ET(this.value, this.to, this.lerp * 60, c), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, l = !0)) : (this.value = this.to, l = !0);
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
  fromTo(c, l, { lerp: u, duration: a, easing: s, onStart: f, onUpdate: h }) {
    this.from = this.value = c, this.to = l, this.lerp = u, this.duration = a, this.easing = s, this.currentTime = 0, this.isRunning = !0, f?.(), this.onUpdate = h;
  }
};
function wT(c, l) {
  let u;
  return function(...a) {
    clearTimeout(u), u = setTimeout(() => {
      u = void 0, c.apply(this, a);
    }, l);
  };
}
var AT = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(c, l, { autoResize: u = !0, debounce: a = 250 } = {}) {
    this.wrapper = c, this.content = l, u && (this.debouncedResize = wT(this.resize, a), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
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
}, W1 = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(c, ...l) {
    const u = this.events[c] || [];
    for (let a = 0, s = u.length; a < s; a++) u[a]?.(...l);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(c, l) {
    return this.events[c] ? this.events[c].push(l) : this.events[c] = [l], () => {
      this.events[c] = this.events[c]?.filter((u) => l !== u);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(c, l) {
    this.events[c] = this.events[c]?.filter((u) => l !== u);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const OT = 100 / 6, Aa = { passive: !1 };
function F_(c, l) {
  return c === 1 ? OT : c === 2 ? l : 1;
}
var RT = class {
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
  emitter = new W1();
  constructor(c, l = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = c, this.options = l, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, Aa), this.element.addEventListener("touchstart", this.onTouchStart, Aa), this.element.addEventListener("touchmove", this.onTouchMove, Aa), this.element.addEventListener("touchend", this.onTouchEnd, Aa);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(c, l) {
    return this.emitter.on(c, l);
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
  onTouchStart = (c) => {
    const { clientX: l, clientY: u } = c.targetTouches ? c.targetTouches[0] : c;
    this.touchStart.x = l, this.touchStart.y = u, this.lastDelta = {
      x: 0,
      y: 0
    }, this.emitter.emit("scroll", {
      deltaX: 0,
      deltaY: 0,
      event: c
    });
  };
  /** Event handler for 'touchmove' event */
  onTouchMove = (c) => {
    const { clientX: l, clientY: u } = c.targetTouches ? c.targetTouches[0] : c, a = -(l - this.touchStart.x) * this.options.touchMultiplier, s = -(u - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = l, this.touchStart.y = u, this.lastDelta = {
      x: a,
      y: s
    }, this.emitter.emit("scroll", {
      deltaX: a,
      deltaY: s,
      event: c
    });
  };
  onTouchEnd = (c) => {
    this.emitter.emit("scroll", {
      deltaX: this.lastDelta.x,
      deltaY: this.lastDelta.y,
      event: c
    });
  };
  /** Event handler for 'wheel' event */
  onWheel = (c) => {
    let { deltaX: l, deltaY: u, deltaMode: a } = c;
    const s = F_(a, this.window.width), f = F_(a, this.window.height);
    l *= s, u *= f, l *= this.options.wheelMultiplier, u *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: l,
      deltaY: u,
      event: c
    });
  };
  onWindowResize = () => {
    this.window = {
      width: window.innerWidth,
      height: window.innerHeight
    };
  };
};
const k_ = (c) => Math.min(1, 1.001 - 2 ** (-10 * c));
var CT = class {
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
  animate = new MT();
  emitter = new W1();
  dimensions;
  virtualScroll;
  constructor({ wrapper: c = window, content: l = document.documentElement, eventsTarget: u = c, smoothWheel: a = !0, syncTouch: s = !1, syncTouchLerp: f = 0.075, touchInertiaExponent: h = 1.7, duration: d, easing: g, lerp: v = 0.1, infinite: p = !1, orientation: _ = "vertical", gestureOrientation: S = _ === "horizontal" ? "both" : "vertical", touchMultiplier: b = 1, wheelMultiplier: M = 1, autoResize: T = !0, prevent: O, virtualScroll: G, overscroll: q = !0, autoRaf: k = !1, anchors: L = !1, autoToggle: D = !1, allowNestedScroll: J = !1, __experimental__naiveDimensions: C = !1, naiveDimensions: F = C, stopInertiaOnNavigate: Z = !1, respectReducedMotion: Y = !0 } = {}) {
    window.lenisVersion = K_, window.lenis || (window.lenis = {}), window.lenis.version = K_, _ === "horizontal" && (window.lenis.horizontal = !0), s === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!c || c === document.documentElement) && (c = window), typeof d == "number" && typeof g != "function" ? g = k_ : typeof g == "function" && typeof d != "number" && (d = 1), this.options = {
      wrapper: c,
      content: l,
      eventsTarget: u,
      smoothWheel: a,
      syncTouch: s,
      syncTouchLerp: f,
      touchInertiaExponent: h,
      duration: d,
      easing: g,
      lerp: v,
      infinite: p,
      gestureOrientation: S,
      orientation: _,
      touchMultiplier: b,
      wheelMultiplier: M,
      autoResize: T,
      prevent: O,
      virtualScroll: G,
      overscroll: q,
      autoRaf: k,
      anchors: L,
      autoToggle: D,
      allowNestedScroll: J,
      naiveDimensions: F,
      stopInertiaOnNavigate: Z,
      respectReducedMotion: Y
    }, this.dimensions = new AT(c, l, { autoResize: T }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new RT(u, {
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
  on(c, l) {
    return this.emitter.on(c, l);
  }
  off(c, l) {
    return this.emitter.off(c, l);
  }
  onScrollEnd = (c) => {
    c instanceof CustomEvent || (this.isScrolling === "smooth" || this.isScrolling === !1) && c.stopPropagation();
  };
  dispatchScrollendEvent = () => {
    this.options.wrapper.dispatchEvent(new CustomEvent("scrollend", {
      bubbles: this.options.wrapper === window,
      detail: { lenisScrollEnd: !0 }
    }));
  };
  get overflow() {
    const c = this.isHorizontal ? "overflow-x" : "overflow-y";
    return getComputedStyle(this.rootElement)[c];
  }
  checkOverflow() {
    ["hidden", "clip"].includes(this.overflow) ? this.internalStop() : this.internalStart();
  }
  onTransitionEnd = (c) => {
    c.propertyName?.includes("overflow") && c.target === this.rootElement && this.checkOverflow();
  };
  setScroll(c) {
    this.isHorizontal ? this.options.wrapper.scrollTo({
      left: c,
      behavior: "instant"
    }) : this.options.wrapper.scrollTo({
      top: c,
      behavior: "instant"
    });
  }
  onClick = (c) => {
    const l = c.composedPath().filter((a) => a instanceof HTMLAnchorElement && a.href).map((a) => new URL(a.href)), u = new URL(window.location.href);
    if (this.options.anchors) {
      const a = l.find((s) => u.host === s.host && u.pathname === s.pathname && s.hash);
      if (a) {
        const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, f = decodeURIComponent(a.hash);
        this.scrollTo(f, s);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && l.some((a) => u.host === a.host && u.pathname !== a.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (c) => {
    c.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(c) {
    const l = window.getSelection();
    if (!l || l.isCollapsed || l.rangeCount === 0) return !1;
    const u = c.targetTouches[0] ?? c.changedTouches[0];
    if (!u) return !1;
    const a = l.getRangeAt(0).getClientRects();
    if (a.length === 0) return !1;
    const s = a[0], f = a[a.length - 1], h = 40, d = Math.hypot(u.clientX - s.left, u.clientY - s.top) <= h, g = Math.hypot(u.clientX - f.right, u.clientY - f.bottom) <= h;
    return d || g;
  }
  onVirtualScroll = (c) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(c) === !1) return;
    const { deltaX: l, deltaY: u, event: a } = c;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: l,
      deltaY: u,
      event: a
    }), a.ctrlKey || a.lenisStopPropagation) return;
    const s = a.type.includes("touch"), f = a.type.includes("wheel");
    if (s && this.isIos && (a.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(a)), this._isDraggingSelection)) {
      a.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = a.type === "touchstart" || a.type === "touchmove";
    const h = l === 0 && u === 0;
    if (this.options.syncTouch && s && a.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const d = this.options.gestureOrientation === "vertical" && u === 0 || this.options.gestureOrientation === "horizontal" && l === 0;
    if (h || d) return;
    let g = a.composedPath();
    g = g.slice(0, g.indexOf(this.rootElement));
    const v = this.options.prevent, p = Math.abs(l) >= Math.abs(u) ? "horizontal" : "vertical";
    if (g.find((M) => M instanceof HTMLElement && (typeof v == "function" && v?.(M) || M.hasAttribute?.("data-lenis-prevent") || p === "vertical" && M.hasAttribute?.("data-lenis-prevent-vertical") || p === "horizontal" && M.hasAttribute?.("data-lenis-prevent-horizontal") || s && M.hasAttribute?.("data-lenis-prevent-touch") || f && M.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(M, {
      deltaX: l,
      deltaY: u
    })))) return;
    if (this.isStopped || this.isLocked) {
      a.cancelable && a.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && s || this.options.smoothWheel && f)) {
      this.isScrolling = "native", this.animate.stop(), a.lenisStopPropagation = !0;
      return;
    }
    let _ = u;
    this.options.gestureOrientation === "both" ? _ = Math.abs(u) > Math.abs(l) ? u : l : this.options.gestureOrientation === "horizontal" && (_ = l), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && u > 0 || this.animatedScroll === this.limit && u < 0)) && (a.lenisStopPropagation = !0), a.cancelable && a.preventDefault();
    const S = s && this.options.syncTouch, b = s && a.type === "touchend";
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
      const c = this.animatedScroll;
      this.animatedScroll = this.targetScroll = this.actualScroll, this.lastVelocity = this.velocity, this.velocity = this.animatedScroll - c, this.direction = Math.sign(this.animatedScroll - c), this.isStopped || (this.isScrolling = "native"), this.emit(), this.velocity !== 0 && (this._resetVelocityTimeout = setTimeout(() => {
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
  raf = (c) => {
    const l = c - (this.time || c);
    this.time = c, this.animate.advance(l * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
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
  scrollTo(c, { offset: l = 0, immediate: u = !1, lock: a = !1, programmatic: s = !0, lerp: f = s ? this.options.lerp : void 0, duration: h = s ? this.options.duration : void 0, easing: d = s ? this.options.easing : void 0, onStart: g, onComplete: v, force: p = !1, userData: _ } = {}) {
    if (this.prefersReducedMotion && (s ? u = !0 : (f = 1, h = void 0, d = void 0)), (this.isStopped || this.isLocked) && !p) return;
    let S = c, b = l;
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
          const L = this.rootElement.getBoundingClientRect();
          b -= this.isHorizontal ? L.left : L.top;
        }
        const T = M.getBoundingClientRect(), O = getComputedStyle(M), G = this.isHorizontal ? Number.parseFloat(O.scrollMarginLeft) : Number.parseFloat(O.scrollMarginTop), q = getComputedStyle(this.rootElement), k = this.isHorizontal ? Number.parseFloat(q.scrollPaddingLeft) : Number.parseFloat(q.scrollPaddingTop);
        S = (this.isHorizontal ? T.left : T.top) + this.animatedScroll - (Number.isNaN(G) ? 0 : G) - (Number.isNaN(k) ? 0 : k);
      }
    }
    if (typeof S == "number") {
      if (S += b, this.options.infinite) {
        if (s) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const M = S - this.animatedScroll;
          M > this.limit / 2 ? S -= this.limit : M < -this.limit / 2 && (S += this.limit);
        }
      } else S = P1(0, S, this.limit);
      if (S === this.targetScroll) {
        g?.(this), v?.(this);
        return;
      }
      if (this.userData = _ ?? {}, u) {
        this.animatedScroll = this.targetScroll = S, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), v?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      s || (this.targetScroll = S), typeof h == "number" && typeof d != "function" ? d = k_ : typeof d == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, S, {
        duration: h,
        easing: d,
        lerp: f,
        onStart: () => {
          a && (this.isLocked = !0), this.isScrolling = "smooth", g?.(this);
        },
        onUpdate: (M, T) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = M - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = M, this.setScroll(this.scroll), s && (this.targetScroll = M), T || this.emit(), T && (this.reset(), this.emit(), v?.(this), this.userData = {}, requestAnimationFrame(() => {
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
  hasNestedScroll(c, { deltaX: l, deltaY: u }) {
    const a = Date.now();
    c._lenis || (c._lenis = {});
    const s = c._lenis;
    let f, h, d, g, v, p, _, S, b, M;
    if (a - (s.time ?? 0) > 2e3) {
      s.time = Date.now();
      const J = window.getComputedStyle(c);
      if (s.computedStyle = J, f = [
        "auto",
        "overlay",
        "scroll"
      ].includes(J.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(J.overflowY), v = ["auto"].includes(J.overscrollBehaviorX), p = ["auto"].includes(J.overscrollBehaviorY), s.hasOverflowX = f, s.hasOverflowY = h, !(f || h)) return !1;
      _ = c.scrollWidth, S = c.scrollHeight, b = c.clientWidth, M = c.clientHeight, d = _ > b, g = S > M, s.isScrollableX = d, s.isScrollableY = g, s.scrollWidth = _, s.scrollHeight = S, s.clientWidth = b, s.clientHeight = M, s.hasOverscrollBehaviorX = v, s.hasOverscrollBehaviorY = p;
    } else
      d = s.isScrollableX, g = s.isScrollableY, f = s.hasOverflowX, h = s.hasOverflowY, _ = s.scrollWidth, S = s.scrollHeight, b = s.clientWidth, M = s.clientHeight, v = s.hasOverscrollBehaviorX, p = s.hasOverscrollBehaviorY;
    if (!(f && d || h && g)) return !1;
    const T = Math.abs(l) >= Math.abs(u) ? "horizontal" : "vertical";
    let O, G, q, k, L, D;
    if (T === "horizontal")
      O = Math.round(c.scrollLeft), G = _ - b, q = l, k = f, L = d, D = v;
    else if (T === "vertical")
      O = Math.round(c.scrollTop), G = S - M, q = u, k = h, L = g, D = p;
    else return !1;
    return !D && (O >= G || O <= 0) ? !0 : (q > 0 ? O < G : O > 0) && k && L;
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
    const c = this.options.wrapper;
    return this.isHorizontal ? c.scrollX ?? c.scrollLeft : c.scrollY ?? c.scrollTop;
  }
  /**
  * The current scroll value
  */
  get scroll() {
    return this.options.infinite ? xT(this.animatedScroll, this.limit) : this.animatedScroll;
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
  set isScrolling(c) {
    this._isScrolling !== c && (this._isScrolling = c, this.updateClassName());
  }
  /**
  * Check if lenis is stopped
  */
  get isStopped() {
    return this._isStopped;
  }
  set isStopped(c) {
    this._isStopped !== c && (this._isStopped = c, this.updateClassName());
  }
  /**
  * Check if lenis is locked
  */
  get isLocked() {
    return this._isLocked;
  }
  set isLocked(c) {
    this._isLocked !== c && (this._isLocked = c, this.updateClassName());
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
    let c = "lenis";
    return this.options.autoToggle && (c += " lenis-autoToggle"), this.isStopped && (c += " lenis-stopped"), this.isLocked && (c += " lenis-locked"), this.isScrolling && (c += " lenis-scrolling"), this.isScrolling === "smooth" && (c += " lenis-smooth"), c;
  }
  updateClassName() {
    this.cleanUpClassName(), this.className.split(" ").forEach((c) => {
      this.rootElement.classList.add(c);
    });
  }
  cleanUpClassName() {
    for (const c of Array.from(this.rootElement.classList)) (c === "lenis" || c.startsWith("lenis-")) && this.rootElement.classList.remove(c);
  }
};
function kl(c) {
  if (c === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return c;
}
function I1(c, l) {
  c.prototype = Object.create(l.prototype), c.prototype.constructor = c, c.__proto__ = l;
}
var Xi = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, uo = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, I0, Vn, Ze, nl = 1e8, Oe = 1 / nl, O0 = Math.PI * 2, zT = O0 / 4, DT = 0, ty = Math.sqrt, NT = Math.cos, UT = Math.sin, zn = function(l) {
  return typeof l == "string";
}, sn = function(l) {
  return typeof l == "function";
}, Il = function(l) {
  return typeof l == "number";
}, tm = function(l) {
  return typeof l > "u";
}, Nl = function(l) {
  return typeof l == "object";
}, vi = function(l) {
  return l !== !1;
}, em = function() {
  return typeof window < "u";
}, Xc = function(l) {
  return sn(l) || zn(l);
}, ey = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, kn = Array.isArray, BT = /random\([^)]+\)/g, HT = /,\s*/g, J_ = /(?:-?\.?\d|\.)+/gi, ny = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, Mr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, f0 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, iy = /[+-]=-?[.\d]+/, LT = /[^,'"\[\]\s]+/gi, YT = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, We, Al, R0, nm, Vi = {}, mf = {}, ly, ay = function(l) {
  return (mf = Br(l, Vi)) && bi;
}, im = function(l, u) {
  return console.warn("Invalid property", l, "set to", u, "Missing plugin? gsap.registerPlugin()");
}, ro = function(l, u) {
  return !u && console.warn(l);
}, uy = function(l, u) {
  return l && (Vi[l] = u) && mf && (mf[l] = u) || Vi;
}, so = function() {
  return 0;
}, qT = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, ef = {
  suppressEvents: !0,
  kill: !1
}, XT = {
  suppressEvents: !0
}, lm = {}, Ha = [], C0 = {}, ry, Bi = {}, h0 = {}, $_ = 30, nf = [], am = "", um = function(l) {
  var u = l[0], a, s;
  if (Nl(u) || sn(u) || (l = [l]), !(a = (u._gsap || {}).harness)) {
    for (s = nf.length; s-- && !nf[s].targetTest(u); )
      ;
    a = nf[s];
  }
  for (s = l.length; s--; )
    l[s] && (l[s]._gsap || (l[s]._gsap = new Ry(l[s], a))) || l.splice(s, 1);
  return l;
}, bu = function(l) {
  return l._gsap || um(il(l))[0]._gsap;
}, sy = function(l, u, a) {
  return (a = l[u]) && sn(a) ? l[u]() : tm(a) && l.getAttribute && l.getAttribute(u) || a;
}, _i = function(l, u) {
  return (l = l.split(",")).forEach(u) || l;
}, hn = function(l) {
  return Math.round(l * 1e5) / 1e5 || 0;
}, Pe = function(l) {
  return Math.round(l * 1e7) / 1e7 || 0;
}, Or = function(l, u) {
  var a = u.charAt(0), s = parseFloat(u.substr(2));
  return l = parseFloat(l), a === "+" ? l + s : a === "-" ? l - s : a === "*" ? l * s : l / s;
}, VT = function(l, u) {
  for (var a = u.length, s = 0; l.indexOf(u[s]) < 0 && ++s < a; )
    ;
  return s < a;
}, gf = function() {
  var l = Ha.length, u = Ha.slice(0), a, s;
  for (C0 = {}, Ha.length = 0, a = 0; a < l; a++)
    s = u[a], s && s._lazy && (s.render(s._lazy[0], s._lazy[1], !0)._lazy = 0);
}, rm = function(l) {
  return !!(l._initted || l._startAt || l.add);
}, oy = function(l, u, a, s) {
  Ha.length && !Vn && gf(), l.render(u, a, !!(Vn && u < 0 && rm(l))), Ha.length && !Vn && gf();
}, cy = function(l) {
  var u = parseFloat(l);
  return (u || u === 0) && (l + "").match(LT).length < 2 ? u : zn(l) ? l.trim() : l;
}, fy = function(l) {
  return l;
}, Gi = function(l, u) {
  for (var a in u)
    a in l || (l[a] = u[a]);
  return l;
}, GT = function(l) {
  return function(u, a) {
    for (var s in a)
      s in u || s === "duration" && l || s === "ease" || (u[s] = a[s]);
  };
}, Br = function(l, u) {
  for (var a in u)
    l[a] = u[a];
  return l;
}, P_ = function c(l, u) {
  for (var a in u)
    a !== "__proto__" && a !== "constructor" && a !== "prototype" && (l[a] = Nl(u[a]) ? c(l[a] || (l[a] = {}), u[a]) : u[a]);
  return l;
}, pf = function(l, u) {
  var a = {}, s;
  for (s in l)
    s in u || (a[s] = l[s]);
  return a;
}, ks = function(l) {
  var u = l.parent || We, a = l.keyframes ? GT(kn(l.keyframes)) : Gi;
  if (vi(l.inherit))
    for (; u; )
      a(l, u.vars.defaults), u = u.parent || u._dp;
  return l;
}, jT = function(l, u) {
  for (var a = l.length, s = a === u.length; s && a-- && l[a] === u[a]; )
    ;
  return a < 0;
}, hy = function(l, u, a, s, f) {
  var h = l[s], d;
  if (f)
    for (d = u[f]; h && h[f] > d; )
      h = h._prev;
  return h ? (u._next = h._next, h._next = u) : (u._next = l[a], l[a] = u), u._next ? u._next._prev = u : l[s] = u, u._prev = h, u.parent = u._dp = l, u;
}, Cf = function(l, u, a, s) {
  a === void 0 && (a = "_first"), s === void 0 && (s = "_last");
  var f = u._prev, h = u._next;
  f ? f._next = h : l[a] === u && (l[a] = h), h ? h._prev = f : l[s] === u && (l[s] = f), u._next = u._prev = u.parent = null;
}, Xa = function(l, u) {
  l.parent && (!u || l.parent.autoRemoveChildren) && l.parent.remove && l.parent.remove(l), l._act = 0;
}, Tu = function(l, u) {
  if (l && (!u || u._end > l._dur || u._start < 0))
    for (var a = l; a; )
      a._dirty = 1, a = a.parent;
  return l;
}, QT = function(l) {
  for (var u = l.parent; u && u.parent; )
    u._dirty = 1, u.totalDuration(), u = u.parent;
  return l;
}, z0 = function(l, u, a, s) {
  return l._startAt && (Vn ? l._startAt.revert(ef) : l.vars.immediateRender && !l.vars.autoRevert || l._startAt.render(u, !0, s));
}, ZT = function c(l) {
  return !l || l._ts && c(l.parent);
}, W_ = function(l) {
  return l._repeat ? Hr(l._tTime, l = l.duration() + l._rDelay) * l : 0;
}, Hr = function(l, u) {
  var a = Math.floor(l = Pe(l / u));
  return l && a === l ? a - 1 : a;
}, vf = function(l, u) {
  return (l - u._start) * u._ts + (u._ts >= 0 ? 0 : u._dirty ? u.totalDuration() : u._tDur);
}, zf = function(l) {
  return l._end = Pe(l._start + (l._tDur / Math.abs(l._ts || l._rts || Oe) || 0));
}, Df = function(l, u) {
  var a = l._dp;
  return a && a.smoothChildTiming && l._ts && (l._start = Pe(a._time - (l._ts > 0 ? u / l._ts : ((l._dirty ? l.totalDuration() : l._tDur) - u) / -l._ts)), zf(l), a._dirty || Tu(a, l)), l;
}, dy = function(l, u) {
  var a;
  if ((u._time || !u._dur && u._initted || u._start < l._time && (u._dur || !u.add)) && (a = vf(l.rawTime(), u), (!u._dur || yo(0, u.totalDuration(), a) - u._tTime > Oe) && u.render(a, !0)), Tu(l, u)._dp && l._initted && l._time >= l._dur && l._ts) {
    if (l._dur < l.duration())
      for (a = l; a._dp; )
        a.rawTime() >= 0 && a.totalTime(a._tTime), a = a._dp;
    l._zTime = -Oe;
  }
}, Rl = function(l, u, a, s) {
  return u.parent && Xa(u), u._start = Pe((Il(a) ? a : !a && _f(u) && (!l._last || l._last._start >= l._time) ? l._last ? l._last._start : l._time : a || l !== We ? Ii(l, a, u) : l._time) + u._delay), u._end = Pe(u._start + (u.totalDuration() / Math.abs(u.timeScale()) || 0)), hy(l, u, "_first", "_last", l._sort ? "_start" : 0), _f(u) || (l._recent = u), s || dy(l, u), l._ts < 0 && Df(l, l._tTime), l;
}, my = function(l, u) {
  return (Vi.ScrollTrigger || im("scrollTrigger", u)) && Vi.ScrollTrigger.create(u, l);
}, gy = function(l, u, a, s, f) {
  if (om(l, u, f), !l._initted)
    return 1;
  if (!a && l._pt && !Vn && (l._dur && l.vars.lazy !== !1 || !l._dur && l.vars.lazy) && ry !== Li.frame)
    return Ha.push(l), l._lazy = [f, s], 1;
}, KT = function c(l) {
  var u = l.parent;
  return u && u._ts && u._initted && !u._lock && (u.rawTime() < 0 || c(u));
}, _f = function(l) {
  var u = l.data;
  return u === "isFromStart" || u === "isStart";
}, FT = function(l, u, a, s) {
  var f = l.ratio, h = u < 0 || !u && (!l._start && KT(l) && !(!l._initted && _f(l)) || (l._ts < 0 || l._dp._ts < 0) && !_f(l)) ? 0 : 1, d = l._rDelay, g = 0, v, p, _;
  if (d && l._repeat && (g = yo(0, l._tDur, u), p = Hr(g, d), l._yoyo && p & 1 && (h = 1 - h), p !== Hr(l._tTime, d) && (f = 1 - h, l.vars.repeatRefresh && l._initted && l.invalidate())), h !== f || Vn || s || l._zTime === Oe || !u && l._zTime) {
    if (!l._initted && gy(l, u, s, a, g))
      return;
    for (_ = l._zTime, l._zTime = u || (a ? Oe : 0), a || (a = u && !_), l.ratio = h, l._from && (h = 1 - h), l._time = 0, l._tTime = g, v = l._pt; v; )
      v.r(h, v.d), v = v._next;
    u < 0 && z0(l, u, a, !0), l._onUpdate && !a && Yi(l, "onUpdate"), g && l._repeat && !a && l.parent && Yi(l, "onRepeat"), (u >= l._tDur || u < 0) && l.ratio === h && (h && Xa(l, 1), !a && !Vn && (Yi(l, h ? "onComplete" : "onReverseComplete", !0), l._prom && l._prom()));
  } else l._zTime || (l._zTime = u);
}, kT = function(l, u, a) {
  var s;
  if (a > u)
    for (s = l._first; s && s._start <= a; ) {
      if (s.data === "isPause" && s._start > u)
        return s;
      s = s._next;
    }
  else
    for (s = l._last; s && s._start >= a; ) {
      if (s.data === "isPause" && s._start < u)
        return s;
      s = s._prev;
    }
}, Lr = function(l, u, a, s) {
  var f = l._repeat, h = Pe(u) || 0, d = l._tTime / l._tDur;
  return d && !s && (l._time *= h / l._dur), l._dur = h, l._tDur = f ? f < 0 ? 1e10 : Pe(h * (f + 1) + l._rDelay * f) : h, d > 0 && !s && Df(l, l._tTime = l._tDur * d), l.parent && zf(l), a || Tu(l.parent, l), l;
}, I_ = function(l) {
  return l instanceof gi ? Tu(l) : Lr(l, l._dur);
}, JT = {
  _start: 0,
  endTime: so,
  totalDuration: so
}, Ii = function c(l, u, a) {
  var s = l.labels, f = l._recent || JT, h = l.duration() >= nl ? f.endTime(!1) : l._dur, d, g, v;
  return zn(u) && (isNaN(u) || u in s) ? (g = u.charAt(0), v = u.substr(-1) === "%", d = u.indexOf("="), g === "<" || g === ">" ? (d >= 0 && (u = u.replace(/=/, "")), (g === "<" ? f._start : f.endTime(f._repeat >= 0)) + (parseFloat(u.substr(1)) || 0) * (v ? (d < 0 ? f : a).totalDuration() / 100 : 1)) : d < 0 ? (u in s || (s[u] = h), s[u]) : (g = parseFloat(u.charAt(d - 1) + u.substr(d + 1)), v && a && (g = g / 100 * (kn(a) ? a[0] : a).totalDuration()), d > 1 ? c(l, u.substr(0, d - 1), a) + g : h + g)) : u == null ? h : +u;
}, Js = function(l, u, a) {
  var s = Il(u[1]), f = (s ? 2 : 1) + (l < 2 ? 0 : 1), h = u[f], d, g;
  if (s && (h.duration = u[1]), h.parent = a, l) {
    for (d = h, g = a; g && !("immediateRender" in d); )
      d = g.vars.defaults || {}, g = vi(g.vars.inherit) && g.parent;
    h.immediateRender = vi(d.immediateRender), l < 2 ? h.runBackwards = 1 : h.startAt = u[f - 1];
  }
  return new yn(u[0], h, u[f + 1]);
}, Qa = function(l, u) {
  return l || l === 0 ? u(l) : u;
}, yo = function(l, u, a) {
  return a < l ? l : a > u ? u : a;
}, Kn = function(l, u) {
  return !zn(l) || !(u = YT.exec(l)) ? "" : u[1];
}, $T = function(l, u, a) {
  return Qa(a, function(s) {
    return yo(l, u, s);
  });
}, D0 = [].slice, py = function(l, u) {
  return l && Nl(l) && "length" in l && (!u && !l.length || l.length - 1 in l && Nl(l[0])) && !l.nodeType && l !== Al;
}, PT = function(l, u, a) {
  return a === void 0 && (a = []), l.forEach(function(s) {
    var f;
    return zn(s) && !u || py(s, 1) ? (f = a).push.apply(f, il(s)) : a.push(s);
  }) || a;
}, il = function(l, u, a) {
  return Ze && !u && Ze.selector ? Ze.selector(l) : zn(l) && !a && (R0 || !Yr()) ? D0.call((u || nm).querySelectorAll(l), 0) : kn(l) ? PT(l, a) : py(l) ? D0.call(l, 0) : l ? [l] : [];
}, N0 = function(l) {
  return l = il(l)[0] || ro("Invalid scope") || {}, function(u) {
    var a = l.current || l.nativeElement || l;
    return il(u, a.querySelectorAll ? a : a === l ? ro("Invalid scope") || nm.createElement("div") : l);
  };
}, vy = function(l) {
  return l.sort(function() {
    return 0.5 - Math.random();
  });
}, _y = function(l) {
  if (sn(l))
    return l;
  var u = Nl(l) ? l : {
    each: l
  }, a = Eu(u.ease), s = u.from || 0, f = parseFloat(u.base) || 0, h = {}, d = s > 0 && s < 1, g = isNaN(s) || d, v = u.axis, p = s, _ = s;
  return zn(s) ? p = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[s] || 0 : !d && g && (p = s[0], _ = s[1]), function(S, b, M) {
    var T = (M || u).length, O = h[T], G, q, k, L, D, J, C, F, Z;
    if (!O) {
      if (Z = u.grid === "auto" ? 0 : (u.grid || [1, nl])[1], !Z) {
        for (C = -nl; C < (C = M[Z++].getBoundingClientRect().left) && Z < T; )
          ;
        Z < T && Z--;
      }
      for (O = h[T] = [], G = g ? Math.min(Z, T) * p - 0.5 : s % Z, q = Z === nl ? 0 : g ? T * _ / Z - 0.5 : s / Z | 0, C = 0, F = nl, J = 0; J < T; J++)
        k = J % Z - G, L = q - (J / Z | 0), O[J] = D = v ? Math.abs(v === "y" ? L : k) : ty(k * k + L * L), D > C && (C = D), D < F && (F = D);
      s === "random" && vy(O), O.max = C - F, O.min = F, O.v = T = (parseFloat(u.amount) || parseFloat(u.each) * (Z > T ? T - 1 : v ? v === "y" ? T / Z : Z : Math.max(Z, T / Z)) || 0) * (s === "edges" ? -1 : 1), O.b = T < 0 ? f - T : f, O.u = Kn(u.amount || u.each) || 0, a = a && T < 0 ? cE(a) : a;
    }
    return T = (O[S] - O.min) / O.max || 0, Pe(O.b + (a ? a(T) : T) * O.v) + O.u;
  };
}, U0 = function(l) {
  var u = Math.pow(10, ((l + "").split(".")[1] || "").length);
  return function(a) {
    var s = Pe(Math.round(parseFloat(a) / l) * l * u);
    return (s - s % 1) / u + (Il(a) ? 0 : Kn(a));
  };
}, yy = function(l, u) {
  var a = kn(l), s, f;
  return !a && Nl(l) && (s = a = l.radius || nl, l.values ? (l = il(l.values), (f = !Il(l[0])) && (s *= s)) : l = U0(l.increment)), Qa(u, a ? sn(l) ? function(h) {
    return f = l(h), Math.abs(f - h) <= s ? f : h;
  } : function(h) {
    for (var d = parseFloat(f ? h.x : h), g = parseFloat(f ? h.y : 0), v = nl, p = 0, _ = l.length, S, b; _--; )
      f ? (S = l[_].x - d, b = l[_].y - g, S = S * S + b * b) : S = Math.abs(l[_] - d), S < v && (v = S, p = _);
    return p = !s || v <= s ? l[p] : h, f || p === h || Il(h) ? p : p + Kn(h);
  } : U0(l));
}, Sy = function(l, u, a, s) {
  return Qa(kn(l) ? !u : a === !0 ? !!(a = 0) : !s, function() {
    return kn(l) ? l[~~(Math.random() * l.length)] : (a = a || 1e-5) && (s = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) && Math.floor(Math.round((l - a / 2 + Math.random() * (u - l + a * 0.99)) / a) * a * s) / s;
  });
}, WT = function() {
  for (var l = arguments.length, u = new Array(l), a = 0; a < l; a++)
    u[a] = arguments[a];
  return function(s) {
    return u.reduce(function(f, h) {
      return h(f);
    }, s);
  };
}, IT = function(l, u) {
  return function(a) {
    return l(parseFloat(a)) + (u || Kn(a));
  };
}, tE = function(l, u, a) {
  return Ty(l, u, 0, 1, a);
}, by = function(l, u, a) {
  return Qa(a, function(s) {
    return l[~~u(s)];
  });
}, eE = function c(l, u, a) {
  var s = u - l;
  return kn(l) ? by(l, c(0, l.length), u) : Qa(a, function(f) {
    return (s + (f - l) % s) % s + l;
  });
}, nE = function c(l, u, a) {
  var s = u - l, f = s * 2;
  return kn(l) ? by(l, c(0, l.length - 1), u) : Qa(a, function(h) {
    return h = (f + (h - l) % f) % f || 0, l + (h > s ? f - h : h);
  });
}, oo = function(l) {
  return l.replace(BT, function(u) {
    var a = u.indexOf("[") + 1, s = u.substring(a || 7, a ? u.indexOf("]") : u.length - 1).split(HT);
    return Sy(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5);
  });
}, Ty = function(l, u, a, s, f) {
  var h = u - l, d = s - a;
  return Qa(f, function(g) {
    return a + ((g - l) / h * d || 0);
  });
}, iE = function c(l, u, a, s) {
  var f = isNaN(l + u) ? 0 : function(b) {
    return (1 - b) * l + b * u;
  };
  if (!f) {
    var h = zn(l), d = {}, g, v, p, _, S;
    if (a === !0 && (s = 1) && (a = null), h)
      l = {
        p: l
      }, u = {
        p: u
      };
    else if (kn(l) && !kn(u)) {
      for (p = [], _ = l.length, S = _ - 2, v = 1; v < _; v++)
        p.push(c(l[v - 1], l[v]));
      _--, f = function(M) {
        M *= _;
        var T = Math.min(S, ~~M);
        return p[T](M - T);
      }, a = u;
    } else s || (l = Br(kn(l) ? [] : {}, l));
    if (!p) {
      for (g in u)
        sm.call(d, l, g, "get", u[g]);
      f = function(M) {
        return hm(M, d) || (h ? l.p : l);
      };
    }
  }
  return Qa(a, f);
}, t1 = function(l, u, a) {
  var s = l.labels, f = nl, h, d, g;
  for (h in s)
    d = s[h] - u, d < 0 == !!a && d && f > (d = Math.abs(d)) && (g = h, f = d);
  return g;
}, Yi = function(l, u, a) {
  var s = l.vars, f = s[u], h = Ze, d = l._ctx, g, v, p;
  if (f)
    return g = s[u + "Params"], v = s.callbackScope || l, a && Ha.length && gf(), d && (Ze = d), p = g ? f.apply(v, g) : f.call(v), Ze = h, p;
}, qs = function(l) {
  return Xa(l), l.scrollTrigger && l.scrollTrigger.kill(!!Vn), l.progress() < 1 && Yi(l, "onInterrupt"), l;
}, wr, Ey = [], xy = function(l) {
  if (l)
    if (l = !l.name && l.default || l, em() || l.headless) {
      var u = l.name, a = sn(l), s = u && !a && l.init ? function() {
        this._props = [];
      } : l, f = {
        init: so,
        render: hm,
        add: sm,
        kill: SE,
        modifier: yE,
        rawVars: 0
      }, h = {
        targetTest: 0,
        get: 0,
        getSetter: fm,
        aliases: {},
        register: 0
      };
      if (Yr(), l !== s) {
        if (Bi[u])
          return;
        Gi(s, Gi(pf(l, f), h)), Br(s.prototype, Br(f, pf(l, h))), Bi[s.prop = u] = s, l.targetTest && (nf.push(s), lm[u] = 1), u = (u === "css" ? "CSS" : u.charAt(0).toUpperCase() + u.substr(1)) + "Plugin";
      }
      uy(u, s), l.register && l.register(bi, s, yi);
    } else
      Ey.push(l);
}, Ue = 255, Xs = {
  aqua: [0, Ue, Ue],
  lime: [0, Ue, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, Ue],
  navy: [0, 0, 128],
  white: [Ue, Ue, Ue],
  olive: [128, 128, 0],
  yellow: [Ue, Ue, 0],
  orange: [Ue, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [Ue, 0, 0],
  pink: [Ue, 192, 203],
  cyan: [0, Ue, Ue],
  transparent: [Ue, Ue, Ue, 0]
}, d0 = function(l, u, a) {
  return l += l < 0 ? 1 : l > 1 ? -1 : 0, (l * 6 < 1 ? u + (a - u) * l * 6 : l < 0.5 ? a : l * 3 < 2 ? u + (a - u) * (2 / 3 - l) * 6 : u) * Ue + 0.5 | 0;
}, My = function(l, u, a) {
  var s = l ? Il(l) ? [l >> 16, l >> 8 & Ue, l & Ue] : 0 : Xs.black, f, h, d, g, v, p, _, S, b, M;
  if (!s) {
    if (l.substr(-1) === "," && (l = l.substr(0, l.length - 1)), Xs[l])
      s = Xs[l];
    else if (l.charAt(0) === "#") {
      if (l.length < 6 && (f = l.charAt(1), h = l.charAt(2), d = l.charAt(3), l = "#" + f + f + h + h + d + d + (l.length === 5 ? l.charAt(4) + l.charAt(4) : "")), l.length === 9)
        return s = parseInt(l.substr(1, 6), 16), [s >> 16, s >> 8 & Ue, s & Ue, parseInt(l.substr(7), 16) / 255];
      l = parseInt(l.substr(1), 16), s = [l >> 16, l >> 8 & Ue, l & Ue];
    } else if (l.substr(0, 3) === "hsl") {
      if (s = M = l.match(J_), !u)
        g = +s[0] % 360 / 360, v = +s[1] / 100, p = +s[2] / 100, h = p <= 0.5 ? p * (v + 1) : p + v - p * v, f = p * 2 - h, s.length > 3 && (s[3] *= 1), s[0] = d0(g + 1 / 3, f, h), s[1] = d0(g, f, h), s[2] = d0(g - 1 / 3, f, h);
      else if (~l.indexOf("="))
        return s = l.match(ny), a && s.length < 4 && (s[3] = 1), s;
    } else
      s = l.match(J_) || Xs.transparent;
    s = s.map(Number);
  }
  return u && !M && (f = s[0] / Ue, h = s[1] / Ue, d = s[2] / Ue, _ = Math.max(f, h, d), S = Math.min(f, h, d), p = (_ + S) / 2, _ === S ? g = v = 0 : (b = _ - S, v = p > 0.5 ? b / (2 - _ - S) : b / (_ + S), g = _ === f ? (h - d) / b + (h < d ? 6 : 0) : _ === h ? (d - f) / b + 2 : (f - h) / b + 4, g *= 60), s[0] = ~~(g + 0.5), s[1] = ~~(v * 100 + 0.5), s[2] = ~~(p * 100 + 0.5)), a && s.length < 4 && (s[3] = 1), s;
}, wy = function(l) {
  var u = [], a = [], s = -1;
  return l.split(La).forEach(function(f) {
    var h = f.match(Mr) || [];
    u.push.apply(u, h), a.push(s += h.length + 1);
  }), u.c = a, u;
}, e1 = function(l, u, a) {
  var s = "", f = (l + s).match(La), h = u ? "hsla(" : "rgba(", d = 0, g, v, p, _;
  if (!f)
    return l;
  if (f = f.map(function(S) {
    return (S = My(S, u, 1)) && h + (u ? S[0] + "," + S[1] + "%," + S[2] + "%," + S[3] : S.join(",")) + ")";
  }), a && (p = wy(l), g = a.c, g.join(s) !== p.c.join(s)))
    for (v = l.replace(La, "1").split(Mr), _ = v.length - 1; d < _; d++)
      s += v[d] + (~g.indexOf(d) ? f.shift() || h + "0,0,0,0)" : (p.length ? p : f.length ? f : a).shift());
  if (!v)
    for (v = l.split(La), _ = v.length - 1; d < _; d++)
      s += v[d] + f[d];
  return s + v[_];
}, La = (function() {
  var c = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", l;
  for (l in Xs)
    c += "|" + l + "\\b";
  return new RegExp(c + ")", "gi");
})(), lE = /hsl[a]?\(/, Ay = function(l) {
  var u = l.join(" "), a;
  if (La.lastIndex = 0, La.test(u))
    return a = lE.test(u), l[1] = e1(l[1], a), l[0] = e1(l[0], a, wy(l[1])), !0;
}, co, Li = (function() {
  var c = Date.now, l = 500, u = 33, a = c(), s = a, f = 1e3 / 240, h = f, d = [], g, v, p, _, S, b, M = function T(O) {
    var G = c() - s, q = O === !0, k, L, D, J;
    if ((G > l || G < 0) && (a += G - u), s += G, D = s - a, k = D - h, (k > 0 || q) && (J = ++_.frame, S = D - _.time * 1e3, _.time = D = D / 1e3, h += k + (k >= f ? 0 : f - k), L = 1), q || (g = v(T)), L)
      for (b = 0; b < d.length; b++)
        d[b](D, S, J, O);
  };
  return _ = {
    time: 0,
    frame: 0,
    tick: function() {
      M(!0);
    },
    deltaRatio: function(O) {
      return S / (1e3 / (O || 60));
    },
    wake: function() {
      ly && (!R0 && em() && (Al = R0 = window, nm = Al.document || {}, Vi.gsap = bi, (Al.gsapVersions || (Al.gsapVersions = [])).push(bi.version), ay(mf || Al.GreenSockGlobals || !Al.gsap && Al || {}), Ey.forEach(xy)), p = typeof requestAnimationFrame < "u" && requestAnimationFrame, g && _.sleep(), v = p || function(O) {
        return setTimeout(O, h - _.time * 1e3 + 1 | 0);
      }, co = 1, M(2));
    },
    sleep: function() {
      (p ? cancelAnimationFrame : clearTimeout)(g), co = 0, v = so;
    },
    lagSmoothing: function(O, G) {
      l = O || 1 / 0, u = Math.min(G || 33, l);
    },
    fps: function(O) {
      f = 1e3 / (O || 240), h = _.time * 1e3 + f;
    },
    add: function(O, G, q) {
      var k = G ? function(L, D, J, C) {
        O(L, D, J, C), _.remove(k);
      } : O;
      return _.remove(O), d[q ? "unshift" : "push"](k), Yr(), k;
    },
    remove: function(O, G) {
      ~(G = d.indexOf(O)) && d.splice(G, 1) && b >= G && b--;
    },
    _listeners: d
  }, _;
})(), Yr = function() {
  return !co && Li.wake();
}, he = {}, aE = /^[\d.\-M][\d.\-,\s]/, uE = /["']/g, rE = function(l) {
  for (var u = {}, a = l.substr(1, l.length - 3).split(":"), s = a[0], f = 1, h = a.length, d, g, v; f < h; f++)
    g = a[f], d = f !== h - 1 ? g.lastIndexOf(",") : g.length, v = g.substr(0, d), u[s] = isNaN(v) ? v.replace(uE, "").trim() : +v, s = g.substr(d + 1).trim();
  return u;
}, sE = function(l) {
  var u = l.indexOf("(") + 1, a = l.indexOf(")"), s = l.indexOf("(", u);
  return l.substring(u, ~s && s < a ? l.indexOf(")", a + 1) : a);
}, oE = function(l) {
  var u = (l + "").split("("), a = he[u[0]];
  return a && u.length > 1 && a.config ? a.config.apply(null, ~l.indexOf("{") ? [rE(u[1])] : sE(l).split(",").map(cy)) : he._CE && aE.test(l) ? he._CE("", l) : a;
}, cE = function(l) {
  return function(u) {
    return 1 - l(1 - u);
  };
}, Eu = function(l, u) {
  return l && (sn(l) ? l : he[l] || oE(l)) || u;
}, zu = function(l, u, a, s) {
  a === void 0 && (a = function(g) {
    return 1 - u(1 - g);
  }), s === void 0 && (s = function(g) {
    return g < 0.5 ? u(g * 2) / 2 : 1 - u((1 - g) * 2) / 2;
  });
  var f = {
    easeIn: u,
    easeOut: a,
    easeInOut: s
  }, h;
  return _i(l, function(d) {
    he[d] = Vi[d] = f, he[h = d.toLowerCase()] = a;
    for (var g in f)
      he[h + (g === "easeIn" ? ".in" : g === "easeOut" ? ".out" : ".inOut")] = he[d + "." + g] = f[g];
  }), f;
}, Oy = function(l) {
  return function(u) {
    return u < 0.5 ? (1 - l(1 - u * 2)) / 2 : 0.5 + l((u - 0.5) * 2) / 2;
  };
}, m0 = function c(l, u, a) {
  var s = u >= 1 ? u : 1, f = (a || (l ? 0.3 : 0.45)) / (u < 1 ? u : 1), h = f / O0 * (Math.asin(1 / s) || 0), d = function(p) {
    return p === 1 ? 1 : s * Math.pow(2, -10 * p) * UT((p - h) * f) + 1;
  }, g = l === "out" ? d : l === "in" ? function(v) {
    return 1 - d(1 - v);
  } : Oy(d);
  return f = O0 / f, g.config = function(v, p) {
    return c(l, v, p);
  }, g;
}, g0 = function c(l, u) {
  u === void 0 && (u = 1.70158);
  var a = function(h) {
    return h ? --h * h * ((u + 1) * h + u) + 1 : 0;
  }, s = l === "out" ? a : l === "in" ? function(f) {
    return 1 - a(1 - f);
  } : Oy(a);
  return s.config = function(f) {
    return c(l, f);
  }, s;
};
_i("Linear,Quad,Cubic,Quart,Quint,Strong", function(c, l) {
  var u = l < 5 ? l + 1 : l;
  zu(c + ",Power" + (u - 1), l ? function(a) {
    return Math.pow(a, u);
  } : function(a) {
    return a;
  }, function(a) {
    return 1 - Math.pow(1 - a, u);
  }, function(a) {
    return a < 0.5 ? Math.pow(a * 2, u) / 2 : 1 - Math.pow((1 - a) * 2, u) / 2;
  });
});
he.Linear.easeNone = he.none = he.Linear.easeIn;
zu("Elastic", m0("in"), m0("out"), m0());
(function(c, l) {
  var u = 1 / l, a = 2 * u, s = 2.5 * u, f = function(d) {
    return d < u ? c * d * d : d < a ? c * Math.pow(d - 1.5 / l, 2) + 0.75 : d < s ? c * (d -= 2.25 / l) * d + 0.9375 : c * Math.pow(d - 2.625 / l, 2) + 0.984375;
  };
  zu("Bounce", function(h) {
    return 1 - f(1 - h);
  }, f);
})(7.5625, 2.75);
zu("Expo", function(c) {
  return Math.pow(2, 10 * (c - 1)) * c + c * c * c * c * c * c * (1 - c);
});
zu("Circ", function(c) {
  return -(ty(1 - c * c) - 1);
});
zu("Sine", function(c) {
  return c === 1 ? 1 : -NT(c * zT) + 1;
});
zu("Back", g0("in"), g0("out"), g0());
he.SteppedEase = he.steps = Vi.SteppedEase = {
  config: function(l, u) {
    l === void 0 && (l = 1);
    var a = 1 / l, s = l + (u ? 0 : 1), f = u ? 1 : 0, h = 1 - Oe;
    return function(d) {
      return ((s * yo(0, h, d) | 0) + f) * a;
    };
  }
};
uo.ease = he["quad.out"];
_i("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(c) {
  return am += c + "," + c + "Params,";
});
var Ry = function(l, u) {
  this.id = DT++, l._gsap = this, this.target = l, this.harness = u, this.get = u ? u.get : sy, this.set = u ? u.getSetter : fm;
}, fo = /* @__PURE__ */ (function() {
  function c(u) {
    this.vars = u, this._delay = +u.delay || 0, (this._repeat = u.repeat === 1 / 0 ? -2 : u.repeat || 0) && (this._rDelay = u.repeatDelay || 0, this._yoyo = !!u.yoyo || !!u.yoyoEase), this._ts = 1, Lr(this, +u.duration, 1, 1), this.data = u.data, Ze && (this._ctx = Ze, Ze.data.push(this)), co || Li.wake();
  }
  var l = c.prototype;
  return l.delay = function(a) {
    return a || a === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + a - this._delay), this._delay = a, this) : this._delay;
  }, l.duration = function(a) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a) : this.totalDuration() && this._dur;
  }, l.totalDuration = function(a) {
    return arguments.length ? (this._dirty = 0, Lr(this, this._repeat < 0 ? a : (a - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, l.totalTime = function(a, s) {
    if (Yr(), !arguments.length)
      return this._tTime;
    var f = this._dp;
    if (f && f.smoothChildTiming && this._ts) {
      for (Df(this, a), !f._dp || f.parent || dy(f, this); f && f.parent; )
        f.parent._time !== f._start + (f._ts >= 0 ? f._tTime / f._ts : (f.totalDuration() - f._tTime) / -f._ts) && f.totalTime(f._tTime, !0), f = f.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && a < this._tDur || this._ts < 0 && a > 0 || !this._tDur && !a) && Rl(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== a || !this._dur && !s || this._initted && Math.abs(this._zTime) === Oe || !this._initted && this._dur && a || !a && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = a), oy(this, a, s)), this;
  }, l.time = function(a, s) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), a + W_(this)) % (this._dur + this._rDelay) || (a ? this._dur : 0), s) : this._time;
  }, l.totalProgress = function(a, s) {
    return arguments.length ? this.totalTime(this.totalDuration() * a, s) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, l.progress = function(a, s) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) + W_(this), s) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, l.iteration = function(a, s) {
    var f = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (a - 1) * f, s) : this._repeat ? Hr(this._tTime, f) + 1 : 1;
  }, l.timeScale = function(a, s) {
    if (!arguments.length)
      return this._rts === -Oe ? 0 : this._rts;
    if (this._rts === a)
      return this;
    var f = this.parent && this._ts ? vf(this.parent._time, this) : this._tTime, h = this._rts < 0;
    this._rts = +a || 0, this._ts = this._ps || a === -Oe ? 0 : this._rts;
    var d = this.totalDuration();
    return (h !== this._rts < 0 || f > 0 && f < d) && this.totalTime(yo(-Math.abs(this._delay), d, f), s !== !1), zf(this), QT(this);
  }, l.paused = function(a) {
    if (!arguments.length)
      return this._ps;
    if (this._ps !== a)
      if (this._ps = a, a)
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0;
      else {
        Yr(), this._ts = this._rts;
        var s = this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, f = this.progress() === 1 && Math.abs(this._zTime) !== Oe, h;
        if (f)
          for (this._tTime -= Oe, h = this._first; h; ) {
            if (!h._dur && h._zTime < 0 && h._ts && h._start <= s + Oe) {
              f = !1;
              break;
            }
            h = h._next;
          }
        this.totalTime(s, f);
      }
    return this;
  }, l.startTime = function(a) {
    if (arguments.length) {
      this._start = Pe(a);
      var s = this.parent || this._dp;
      return s && (s._sort || !this.parent) && Rl(s, this, this._start - this._delay), this;
    }
    return this._start;
  }, l.endTime = function(a) {
    return this._start + (vi(a) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, l.rawTime = function(a) {
    var s = this.parent || this._dp;
    return s ? a && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? vf(s.rawTime(a), this) : this._tTime : this._tTime;
  }, l.revert = function(a) {
    a === void 0 && (a = XT);
    var s = Vn;
    return Vn = a, rm(this) && (this.timeline && this.timeline.revert(a), this.totalTime(-0.01, a.suppressEvents)), this.data !== "nested" && a.kill !== !1 && this.kill(), Vn = s, this;
  }, l.globalTime = function(a) {
    for (var s = this, f = arguments.length ? a : s.rawTime(); s; )
      f = s._start + f / (Math.abs(s._ts) || 1), s = s._dp;
    return !this.parent && this._sat ? this._sat.globalTime(a) : f;
  }, l.repeat = function(a) {
    return arguments.length ? (this._repeat = a === 1 / 0 ? -2 : a, I_(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, l.repeatDelay = function(a) {
    if (arguments.length) {
      var s = this._time;
      return this._rDelay = a, I_(this), s ? this.time(s) : this;
    }
    return this._rDelay;
  }, l.yoyo = function(a) {
    return arguments.length ? (this._yoyo = a, this) : this._yoyo;
  }, l.seek = function(a, s) {
    return this.totalTime(Ii(this, a), vi(s));
  }, l.restart = function(a, s) {
    return this.play().totalTime(a ? -this._delay : 0, vi(s)), this._dur || (this._zTime = -Oe), this;
  }, l.play = function(a, s) {
    return a != null && this.seek(a, s), this.reversed(!1).paused(!1);
  }, l.reverse = function(a, s) {
    return a != null && this.seek(a || this.totalDuration(), s), this.reversed(!0).paused(!1);
  }, l.pause = function(a, s) {
    return a != null && this.seek(a, s), this.paused(!0);
  }, l.resume = function() {
    return this.paused(!1);
  }, l.reversed = function(a) {
    return arguments.length ? (!!a !== this.reversed() && this.timeScale(-this._rts || (a ? -Oe : 0)), this) : this._rts < 0;
  }, l.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -Oe, this;
  }, l.isActive = function() {
    var a = this.parent || this._dp, s = this._start, f;
    return !!(!a || this._ts && this._initted && a.isActive() && (f = a.rawTime(!0)) >= s && f < this.endTime(!0) - Oe);
  }, l.eventCallback = function(a, s, f) {
    var h = this.vars;
    return arguments.length > 1 ? (s ? (h[a] = s, f && (h[a + "Params"] = f), a === "onUpdate" && (this._onUpdate = s)) : delete h[a], this) : h[a];
  }, l.then = function(a) {
    var s = this, f = s._prom;
    return new Promise(function(h) {
      var d = sn(a) ? a : fy, g = function() {
        var p = s.then;
        s.then = null, f && f(), sn(d) && (d = d(s)) && (d.then || d === s) && (s.then = p), h(d), s.then = p;
      };
      s._initted && s.totalProgress() === 1 && s._ts >= 0 || !s._tTime && s._ts < 0 ? g() : s._prom = g;
    });
  }, l.kill = function() {
    qs(this);
  }, c;
})();
Gi(fo.prototype, {
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
  _zTime: -Oe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var gi = /* @__PURE__ */ (function(c) {
  I1(l, c);
  function l(a, s) {
    var f;
    return a === void 0 && (a = {}), f = c.call(this, a) || this, f.labels = {}, f.smoothChildTiming = !!a.smoothChildTiming, f.autoRemoveChildren = !!a.autoRemoveChildren, f._sort = vi(a.sortChildren), We && Rl(a.parent || We, kl(f), s), a.reversed && f.reverse(), a.paused && f.paused(!0), a.scrollTrigger && my(kl(f), a.scrollTrigger), f;
  }
  var u = l.prototype;
  return u.to = function(s, f, h) {
    return Js(0, arguments, this), this;
  }, u.from = function(s, f, h) {
    return Js(1, arguments, this), this;
  }, u.fromTo = function(s, f, h, d) {
    return Js(2, arguments, this), this;
  }, u.set = function(s, f, h) {
    return f.duration = 0, f.parent = this, ks(f).repeatDelay || (f.repeat = 0), f.immediateRender = !!f.immediateRender, new yn(s, f, Ii(this, h), 1), this;
  }, u.call = function(s, f, h) {
    return Rl(this, yn.delayedCall(0, s, f), h);
  }, u.staggerTo = function(s, f, h, d, g, v, p) {
    return h.duration = f, h.stagger = h.stagger || d, h.onComplete = v, h.onCompleteParams = p, h.parent = this, new yn(s, h, Ii(this, g)), this;
  }, u.staggerFrom = function(s, f, h, d, g, v, p) {
    return h.runBackwards = 1, ks(h).immediateRender = vi(h.immediateRender), this.staggerTo(s, f, h, d, g, v, p);
  }, u.staggerFromTo = function(s, f, h, d, g, v, p, _) {
    return d.startAt = h, ks(d).immediateRender = vi(d.immediateRender), this.staggerTo(s, f, d, g, v, p, _);
  }, u.render = function(s, f, h) {
    var d = this._time, g = this._dirty ? this.totalDuration() : this._tDur, v = this._dur, p = s <= 0 ? 0 : Pe(s), _ = this._zTime < 0 != s < 0 && (this._initted || !v), S, b, M, T, O, G, q, k, L, D, J, C;
    if (this !== We && p > g && s >= 0 && (p = g), p !== this._tTime || h || _) {
      if (d !== this._time && v && (p += this._time - d, s += this._time - d), S = p, L = this._start, k = this._ts, G = !k, _ && (v || (d = this._zTime), (s || !f) && (this._zTime = s)), this._repeat) {
        if (J = this._yoyo, O = v + this._rDelay, this._repeat < -1 && s < 0)
          return this.totalTime(O * 100 + s, f, h);
        if (S = Pe(p % O), p === g ? (T = this._repeat, S = v) : (D = Pe(p / O), T = ~~D, T && T === D && (S = v, T--), S > v && (S = v)), D = Hr(this._tTime, O), !d && this._tTime && D !== T && this._tTime - D * O - this._dur <= 0 && (D = T), J && T & 1 && (S = v - S, C = 1), T !== D && !this._lock) {
          var F = J && D & 1, Z = F === (J && T & 1);
          if (T < D && (F = !F), d = F ? 0 : p % v ? v : p, this._lock = 1, this.render(d || (C ? 0 : Pe(T * O)), f, !v)._lock = 0, this._tTime = p, !f && this.parent && Yi(this, "onRepeat"), this.vars.repeatRefresh && !C && (this.invalidate()._lock = 1, D = T), d && d !== this._time || G !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (v = this._dur, g = this._tDur, Z && (this._lock = 2, d = F ? v : -1e-4, this.render(d, !0), this.vars.repeatRefresh && !C && this.invalidate()), this._lock = 0, !this._ts && !G)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (q = kT(this, Pe(d), Pe(S)), q && (p -= S - (S = q._start))), this._tTime = p, this._time = S, this._act = !!k, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = s, d = 0), !d && p && v && !f && !D && (Yi(this, "onStart"), this._tTime !== p))
        return this;
      if (S >= d && s >= 0)
        for (b = this._first; b; ) {
          if (M = b._next, (b._act || S >= b._start) && b._ts && q !== b) {
            if (b.parent !== this)
              return this.render(s, f, h);
            if (b.render(b._ts > 0 ? (S - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (S - b._start) * b._ts, f, h), S !== this._time || !this._ts && !G) {
              q = 0, M && (p += this._zTime = -Oe);
              break;
            }
          }
          b = M;
        }
      else {
        b = this._last;
        for (var Y = s < 0 ? s : S; b; ) {
          if (M = b._prev, (b._act || Y <= b._end) && b._ts && q !== b) {
            if (b.parent !== this)
              return this.render(s, f, h);
            if (b.render(b._ts > 0 ? (Y - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (Y - b._start) * b._ts, f, h || Vn && rm(b)), S !== this._time || !this._ts && !G) {
              q = 0, M && (p += this._zTime = Y ? -Oe : Oe);
              break;
            }
          }
          b = M;
        }
      }
      if (q && !f && (this.pause(), q.render(S >= d ? 0 : -Oe)._zTime = S >= d ? 1 : -1, this._ts))
        return this._start = L, zf(this), this.render(s, f, h);
      this._onUpdate && !f && Yi(this, "onUpdate", !0), (p === g && this._tTime >= this.totalDuration() || !p && d) && (L === this._start || Math.abs(k) !== Math.abs(this._ts)) && (this._lock || ((s || !v) && (p === g && this._ts > 0 || !p && this._ts < 0) && Xa(this, 1), !f && !(s < 0 && !d) && (p || d || !g) && (Yi(this, p === g && s >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(p < g && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, u.add = function(s, f) {
    var h = this;
    if (Il(f) || (f = Ii(this, f, s)), !(s instanceof fo)) {
      if (kn(s))
        return s.forEach(function(d) {
          return h.add(d, f);
        }), this;
      if (zn(s))
        return this.addLabel(s, f);
      if (sn(s))
        s = yn.delayedCall(0, s);
      else
        return this;
    }
    return this !== s ? Rl(this, s, f) : this;
  }, u.getChildren = function(s, f, h, d) {
    s === void 0 && (s = !0), f === void 0 && (f = !0), h === void 0 && (h = !0), d === void 0 && (d = -nl);
    for (var g = [], v = this._first; v; )
      v._start >= d && (v instanceof yn ? f && g.push(v) : (h && g.push(v), s && g.push.apply(g, v.getChildren(!0, f, h)))), v = v._next;
    return g;
  }, u.getById = function(s) {
    for (var f = this.getChildren(1, 1, 1), h = f.length; h--; )
      if (f[h].vars.id === s)
        return f[h];
  }, u.remove = function(s) {
    return zn(s) ? this.removeLabel(s) : sn(s) ? this.killTweensOf(s) : (s.parent === this && Cf(this, s), s === this._recent && (this._recent = this._last), Tu(this));
  }, u.totalTime = function(s, f) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = Pe(Li.time - (this._ts > 0 ? s / this._ts : (this.totalDuration() - s) / -this._ts))), c.prototype.totalTime.call(this, s, f), this._forcing = 0, this) : this._tTime;
  }, u.addLabel = function(s, f) {
    return this.labels[s] = Ii(this, f), this;
  }, u.removeLabel = function(s) {
    return delete this.labels[s], this;
  }, u.addPause = function(s, f, h) {
    var d = yn.delayedCall(0, f || so, h);
    return d.data = "isPause", this._hasPause = 1, Rl(this, d, Ii(this, s));
  }, u.removePause = function(s) {
    var f = this._first;
    for (s = Ii(this, s); f; )
      f._start === s && f.data === "isPause" && Xa(f), f = f._next;
  }, u.killTweensOf = function(s, f, h) {
    for (var d = this.getTweensOf(s, h), g = d.length; g--; )
      za !== d[g] && d[g].kill(s, f);
    return this;
  }, u.getTweensOf = function(s, f) {
    for (var h = [], d = il(s), g = this._first, v = Il(f), p; g; )
      g instanceof yn ? VT(g._targets, d) && (v ? (!za || g._initted && g._ts) && g.globalTime(0) <= f && g.globalTime(g.totalDuration()) > f : !f || g.isActive()) && h.push(g) : (p = g.getTweensOf(d, f)).length && h.push.apply(h, p), g = g._next;
    return h;
  }, u.tweenTo = function(s, f) {
    f = f || {};
    var h = this, d = Ii(h, s), g = f, v = g.startAt, p = g.onStart, _ = g.onStartParams, S = g.immediateRender, b, M = yn.to(h, Gi({
      ease: f.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: d,
      overwrite: "auto",
      duration: f.duration || Math.abs((d - (v && "time" in v ? v.time : h._time)) / h.timeScale()) || Oe,
      onStart: function() {
        if (h.pause(), !b) {
          var O = f.duration || Math.abs((d - (v && "time" in v ? v.time : h._time)) / h.timeScale());
          M._dur !== O && Lr(M, O, 0, 1).render(M._time, !0, !0), b = 1;
        }
        p && p.apply(M, _ || []);
      }
    }, f));
    return S ? M.render(0) : M;
  }, u.tweenFromTo = function(s, f, h) {
    return this.tweenTo(f, Gi({
      startAt: {
        time: Ii(this, s)
      }
    }, h));
  }, u.recent = function() {
    return this._recent;
  }, u.nextLabel = function(s) {
    return s === void 0 && (s = this._time), t1(this, Ii(this, s));
  }, u.previousLabel = function(s) {
    return s === void 0 && (s = this._time), t1(this, Ii(this, s), 1);
  }, u.currentLabel = function(s) {
    return arguments.length ? this.seek(s, !0) : this.previousLabel(this._time + Oe);
  }, u.shiftChildren = function(s, f, h) {
    h === void 0 && (h = 0);
    var d = this._first, g = this.labels, v;
    for (s = Pe(s); d; )
      d._start >= h && (d._start += s, d._end += s), d = d._next;
    if (f)
      for (v in g)
        g[v] >= h && (g[v] += s);
    return Tu(this);
  }, u.invalidate = function(s) {
    var f = this._first;
    for (this._lock = 0; f; )
      f.invalidate(s), f = f._next;
    return c.prototype.invalidate.call(this, s);
  }, u.clear = function(s) {
    s === void 0 && (s = !0);
    for (var f = this._first, h; f; )
      h = f._next, this.remove(f), f = h;
    return this._dp && (this._time = this._tTime = this._pTime = 0), s && (this.labels = {}), Tu(this);
  }, u.totalDuration = function(s) {
    var f = 0, h = this, d = h._last, g = nl, v, p, _;
    if (arguments.length)
      return h.timeScale((h._repeat < 0 ? h.duration() : h.totalDuration()) / (h.reversed() ? -s : s));
    if (h._dirty) {
      for (_ = h.parent; d; )
        v = d._prev, d._dirty && d.totalDuration(), p = d._start, p > g && h._sort && d._ts && !h._lock ? (h._lock = 1, Rl(h, d, p - d._delay, 1)._lock = 0) : g = p, p < 0 && d._ts && (f -= p, (!_ && !h._dp || _ && _.smoothChildTiming) && (h._start += Pe(p / h._ts), h._time -= p, h._tTime -= p), h.shiftChildren(-p, !1, -1 / 0), g = 0), d._end > f && d._ts && (f = d._end), d = v;
      Lr(h, h === We && h._time > f ? h._time : f, 1, 1), h._dirty = 0;
    }
    return h._tDur;
  }, l.updateRoot = function(s) {
    if (We._ts && (oy(We, vf(s, We)), ry = Li.frame), Li.frame >= $_) {
      $_ += Xi.autoSleep || 120;
      var f = We._first;
      if ((!f || !f._ts) && Xi.autoSleep && Li._listeners.length < 2) {
        for (; f && !f._ts; )
          f = f._next;
        f || Li.sleep();
      }
    }
  }, l;
})(fo);
Gi(gi.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var fE = function(l, u, a, s, f, h, d) {
  var g = new yi(this._pt, l, u, 0, 1, Uy, null, f), v = 0, p = 0, _, S, b, M, T, O, G, q;
  for (g.b = a, g.e = s, a += "", s += "", (G = ~s.indexOf("random(")) && (s = oo(s)), h && (q = [a, s], h(q, l, u), a = q[0], s = q[1]), S = a.match(f0) || []; _ = f0.exec(s); )
    M = _[0], T = s.substring(v, _.index), b ? b = (b + 1) % 5 : T.substr(-5) === "rgba(" && (b = 1), M !== S[p++] && (O = parseFloat(S[p - 1]) || 0, g._pt = {
      _next: g._pt,
      p: T || p === 1 ? T : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: O,
      c: M.charAt(1) === "=" ? Or(O, M) - O : parseFloat(M) - O,
      m: b && b < 4 ? Math.round : 0
    }, v = f0.lastIndex);
  return g.c = v < s.length ? s.substring(v, s.length) : "", g.fp = d, (iy.test(s) || G) && (g.e = 0), this._pt = g, g;
}, sm = function(l, u, a, s, f, h, d, g, v, p) {
  sn(s) && (s = s(f || 0, l, h));
  var _ = l[u], S = a !== "get" ? a : sn(_) ? v ? l[u.indexOf("set") || !sn(l["get" + u.substr(3)]) ? u : "get" + u.substr(3)](v) : l[u]() : _, b = sn(_) ? v ? pE : Dy : cm, M;
  if (zn(s) && (~s.indexOf("random(") && (s = oo(s)), s.charAt(1) === "=" && (M = Or(S, s) + (Kn(S) || 0), (M || M === 0) && (s = M))), !p || S !== s || B0)
    return !isNaN(S * s) && s !== "" ? (M = new yi(this._pt, l, u, +S || 0, s - (S || 0), typeof _ == "boolean" ? _E : Ny, 0, b), v && (M.fp = v), d && M.modifier(d, this, l), this._pt = M) : (!_ && !(u in l) && im(u, s), fE.call(this, l, u, S, s, b, g || Xi.stringFilter, v));
}, hE = function(l, u, a, s, f) {
  if (sn(l) && (l = $s(l, f, u, a, s)), !Nl(l) || l.style && l.nodeType || kn(l) || ey(l))
    return zn(l) ? $s(l, f, u, a, s) : l;
  var h = {}, d;
  for (d in l)
    h[d] = $s(l[d], f, u, a, s);
  return h;
}, Cy = function(l, u, a, s, f, h) {
  var d, g, v, p;
  if (Bi[l] && (d = new Bi[l]()).init(f, d.rawVars ? u[l] : hE(u[l], s, f, h, a), a, s, h) !== !1 && (a._pt = g = new yi(a._pt, f, l, 0, 1, d.render, d, 0, d.priority), a !== wr))
    for (v = a._ptLookup[a._targets.indexOf(f)], p = d._props.length; p--; )
      v[d._props[p]] = g;
  return d;
}, za, B0, om = function c(l, u, a) {
  var s = l.vars, f = s.ease, h = s.startAt, d = s.immediateRender, g = s.lazy, v = s.onUpdate, p = s.runBackwards, _ = s.yoyoEase, S = s.keyframes, b = s.autoRevert, M = l._dur, T = l._startAt, O = l._targets, G = l.parent, q = G && G.data === "nested" ? G.vars.targets : O, k = l._overwrite === "auto" && !I0, L = l.timeline, D = s.easeReverse || _, J, C, F, Z, Y, vt, $, yt, gt, tt, V, P, I;
  if (L && (!S || !f) && (f = "none"), l._ease = Eu(f, uo.ease), l._rEase = D && (Eu(D) || l._ease), l._from = !L && !!s.runBackwards, l._from && (l.ratio = 1), !L || S && !s.stagger) {
    if (yt = O[0] ? bu(O[0]).harness : 0, P = yt && s[yt.prop], J = pf(s, lm), T && (T._zTime < 0 && T.progress(1), u < 0 && p && d && !b ? T.render(-1, !0) : T.revert(p && M ? ef : qT), T._lazy = 0), h) {
      if (Xa(l._startAt = yn.set(O, Gi({
        data: "isStart",
        overwrite: !1,
        parent: G,
        immediateRender: !0,
        lazy: !T && vi(g),
        startAt: null,
        delay: 0,
        onUpdate: v && function() {
          return Yi(l, "onUpdate");
        },
        stagger: 0
      }, h))), l._startAt._dp = 0, l._startAt._sat = l, u < 0 && (Vn || !d && !b) && l._startAt.revert(ef), d && M && u <= 0 && a <= 0) {
        u && (l._zTime = u);
        return;
      }
    } else if (p && M && !T) {
      if (u && (d = !1), F = Gi({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: d && !T && vi(g),
        immediateRender: d,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: G
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, J), P && (F[yt.prop] = P), Xa(l._startAt = yn.set(O, F)), l._startAt._dp = 0, l._startAt._sat = l, u < 0 && (Vn ? l._startAt.revert(ef) : l._startAt.render(-1, !0)), l._zTime = u, !d)
        c(l._startAt, Oe, Oe);
      else if (!u)
        return;
    }
    for (l._pt = l._ptCache = 0, g = M && vi(g) || g && !M, C = 0; C < O.length; C++) {
      if (Y = O[C], $ = Y._gsap || um(O)[C]._gsap, l._ptLookup[C] = tt = {}, C0[$.id] && Ha.length && gf(), V = q === O ? C : q.indexOf(Y), yt && (gt = new yt()).init(Y, P || J, l, V, q) !== !1 && (l._pt = Z = new yi(l._pt, Y, gt.name, 0, 1, gt.render, gt, 0, gt.priority), gt._props.forEach(function(rt) {
        tt[rt] = Z;
      }), gt.priority && (vt = 1)), !yt || P)
        for (F in J)
          Bi[F] && (gt = Cy(F, J, l, V, Y, q)) ? gt.priority && (vt = 1) : tt[F] = Z = sm.call(l, Y, F, "get", J[F], V, q, 0, s.stringFilter);
      l._op && l._op[C] && l.kill(Y, l._op[C]), k && l._pt && (za = l, We.killTweensOf(Y, tt, l.globalTime(u)), I = !l.parent, za = 0), l._pt && g && (C0[$.id] = 1);
    }
    vt && By(l), l._onInit && l._onInit(l);
  }
  l._onUpdate = v, l._initted = (!l._op || l._pt) && !I, S && u <= 0 && L.render(nl, !0, !0);
}, dE = function(l, u, a, s, f, h, d, g) {
  var v = (l._pt && l._ptCache || (l._ptCache = {}))[u], p, _, S, b;
  if (!v)
    for (v = l._ptCache[u] = [], S = l._ptLookup, b = l._targets.length; b--; ) {
      if (p = S[b][u], p && p.d && p.d._pt)
        for (p = p.d._pt; p && p.p !== u && p.fp !== u; )
          p = p._next;
      if (!p)
        return B0 = 1, l.vars[u] = "+=0", om(l, d), B0 = 0, g ? ro(u + " not eligible for reset. Try splitting into individual properties") : 1;
      v.push(p);
    }
  for (b = v.length; b--; )
    _ = v[b], p = _._pt || _, p.s = (s || s === 0) && !f ? s : p.s + (s || 0) + h * p.c, p.c = a - p.s, _.e && (_.e = hn(a) + Kn(_.e)), _.b && (_.b = p.s + Kn(_.b));
}, mE = function(l, u) {
  var a = l[0] ? bu(l[0]).harness : 0, s = a && a.aliases, f, h, d, g;
  if (!s)
    return u;
  f = Br({}, u);
  for (h in s)
    if (h in f)
      for (g = s[h].split(","), d = g.length; d--; )
        f[g[d]] = f[h];
  return f;
}, gE = function(l, u, a, s) {
  var f = u.ease || s || "power1.inOut", h, d;
  if (kn(u))
    d = a[l] || (a[l] = []), u.forEach(function(g, v) {
      return d.push({
        t: v / (u.length - 1) * 100,
        v: g,
        e: f
      });
    });
  else
    for (h in u)
      d = a[h] || (a[h] = []), h === "ease" || d.push({
        t: parseFloat(l),
        v: u[h],
        e: f
      });
}, $s = function(l, u, a, s, f) {
  return sn(l) ? l.call(u, a, s, f) : zn(l) && ~l.indexOf("random(") ? oo(l) : l;
}, yf = am + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", zy = {};
_i(yf + ",id,stagger,delay,duration,paused,scrollTrigger", function(c) {
  return zy[c] = 1;
});
yf = yf.split(",");
var yn = /* @__PURE__ */ (function(c) {
  I1(l, c);
  function l(a, s, f, h) {
    var d;
    typeof s == "number" && (f.duration = s, s = f, f = null), d = c.call(this, h ? s : ks(s)) || this;
    var g = d.vars, v = g.duration, p = g.delay, _ = g.immediateRender, S = g.stagger, b = g.overwrite, M = g.keyframes, T = g.defaults, O = g.scrollTrigger, G = s.parent || We, q = (kn(a) || ey(a) ? Il(a[0]) : "length" in s) ? [a] : il(a), k, L, D, J, C, F, Z, Y;
    if (d._targets = q.length ? um(q) : ro("GSAP target " + a + " not found. https://gsap.com", !Xi.nullTargetWarn) || [], d._ptLookup = [], d._overwrite = b, M || S || Xc(v) || Xc(p)) {
      s = d.vars;
      var vt = s.easeReverse || s.yoyoEase;
      if (k = d.timeline = new gi({
        data: "nested",
        defaults: T || {},
        targets: G && G.data === "nested" ? G.vars.targets : q
      }), k.kill(), k.parent = k._dp = kl(d), k._start = 0, S || Xc(v) || Xc(p)) {
        if (J = q.length, Z = S && _y(S), Nl(S))
          for (C in S)
            ~yf.indexOf(C) && (Y || (Y = {}), Y[C] = S[C]);
        for (L = 0; L < J; L++)
          D = pf(s, zy), D.stagger = 0, vt && (D.easeReverse = vt), Y && Br(D, Y), F = q[L], D.duration = +$s(v, kl(d), L, F, q), D.delay = (+$s(p, kl(d), L, F, q) || 0) - d._delay, !S && J === 1 && D.delay && (d._delay = p = D.delay, d._start += p, D.delay = 0), k.to(F, D, Z ? Z(L, F, q) : 0), k._ease = he.none;
        k.duration() ? v = p = 0 : d.timeline = 0;
      } else if (M) {
        ks(Gi(k.vars.defaults, {
          ease: "none"
        })), k._ease = Eu(M.ease || s.ease || "none");
        var $ = 0, yt, gt, tt;
        if (kn(M))
          M.forEach(function(V) {
            return k.to(q, V, ">");
          }), k.duration();
        else {
          D = {};
          for (C in M)
            C === "ease" || C === "easeEach" || gE(C, M[C], D, M.easeEach);
          for (C in D)
            for (yt = D[C].sort(function(V, P) {
              return V.t - P.t;
            }), $ = 0, L = 0; L < yt.length; L++)
              gt = yt[L], tt = {
                ease: gt.e,
                duration: (gt.t - (L ? yt[L - 1].t : 0)) / 100 * v
              }, tt[C] = gt.v, k.to(q, tt, $), $ += tt.duration;
          k.duration() < v && k.to({}, {
            duration: v - k.duration()
          });
        }
      }
      v || d.duration(v = k.duration());
    } else
      d.timeline = 0;
    return b === !0 && !I0 && (za = kl(d), We.killTweensOf(q), za = 0), Rl(G, kl(d), f), s.reversed && d.reverse(), s.paused && d.paused(!0), (_ || !v && !M && d._start === Pe(G._time) && vi(_) && ZT(kl(d)) && G.data !== "nested") && (d._tTime = -Oe, d.render(Math.max(0, -p) || 0)), O && my(kl(d), O), d;
  }
  var u = l.prototype;
  return u.render = function(s, f, h) {
    var d = this._time, g = this._tDur, v = this._dur, p = s < 0, _ = s > g - Oe && !p ? g : s < Oe ? 0 : s, S, b, M, T, O, G, q, k;
    if (!v)
      FT(this, s, f, h);
    else if (_ !== this._tTime || !s || h || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== p || this._lazy) {
      if (S = _, k = this.timeline, this._repeat) {
        if (T = v + this._rDelay, this._repeat < -1 && p)
          return this.totalTime(T * 100 + s, f, h);
        if (S = Pe(_ % T), _ === g ? (M = this._repeat, S = v) : (O = Pe(_ / T), M = ~~O, M && M === O ? (S = v, M--) : S > v && (S = v)), G = this._yoyo && M & 1, G && (S = v - S), O = Hr(this._tTime, T), S === d && !h && this._initted && M === O)
          return this._tTime = _, this;
        M !== O && this.vars.repeatRefresh && !G && !this._lock && S !== T && this._initted && (this._lock = h = 1, this.render(Pe(T * M), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (gy(this, p ? s : S, h, f, _))
          return this._tTime = 0, this;
        if (d !== this._time && !(h && this.vars.repeatRefresh && M !== O))
          return this;
        if (v !== this._dur)
          return this.render(s, f, h);
      }
      if (this._rEase) {
        var L = S < d;
        if (L !== this._inv) {
          var D = L ? d : v - d;
          this._inv = L, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = d, this._invRecip = D ? (L ? -1 : 1) / D : 0, this._invScale = L ? -this.ratio : 1 - this.ratio, this._invEase = L ? this._rEase : this._ease;
        }
        this.ratio = q = this._invRatio + this._invScale * this._invEase((S - this._invTime) * this._invRecip);
      } else
        this.ratio = q = this._ease(S / v);
      if (this._from && (this.ratio = q = 1 - q), this._tTime = _, this._time = S, !this._act && this._ts && (this._act = 1, this._lazy = 0), !d && _ && !f && !O && (Yi(this, "onStart"), this._tTime !== _))
        return this;
      for (b = this._pt; b; )
        b.r(q, b.d), b = b._next;
      k && k.render(s < 0 ? s : k._dur * k._ease(S / this._dur), f, h) || this._startAt && (this._zTime = s), this._onUpdate && !f && (p && z0(this, s, f, h), Yi(this, "onUpdate")), this._repeat && M !== O && this.vars.onRepeat && !f && this.parent && Yi(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (p && !this._onUpdate && z0(this, s, !0, !0), (s || !v) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && Xa(this, 1), !f && !(p && !d) && (_ || d || G) && (Yi(this, _ === g ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < g && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, u.targets = function() {
    return this._targets;
  }, u.invalidate = function(s) {
    return (!s || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(s), c.prototype.invalidate.call(this, s);
  }, u.resetTo = function(s, f, h, d, g) {
    co || Li.wake(), this._ts || this.play();
    var v = Math.min(this._dur, (this._dp._time - this._start) * this._ts), p;
    return this._initted || om(this, v), p = this._ease(v / this._dur), dE(this, s, f, h, d, p, v, g) ? this.resetTo(s, f, h, d, 1) : (Df(this, 0), this.parent || hy(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, u.kill = function(s, f) {
    if (f === void 0 && (f = "all"), !s && (!f || f === "all"))
      return this._lazy = this._pt = 0, this.parent ? qs(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Vn), this;
    if (this.timeline) {
      var h = this.timeline.totalDuration();
      return this.timeline.killTweensOf(s, f, za && za.vars.overwrite !== !0)._first || qs(this), this.parent && h !== this.timeline.totalDuration() && Lr(this, this._dur * this.timeline._tDur / h, 0, 1), this;
    }
    var d = this._targets, g = s ? il(s) : d, v = this._ptLookup, p = this._pt, _, S, b, M, T, O, G;
    if ((!f || f === "all") && jT(d, g))
      return f === "all" && (this._pt = 0), qs(this);
    for (_ = this._op = this._op || [], f !== "all" && (zn(f) && (T = {}, _i(f, function(q) {
      return T[q] = 1;
    }), f = T), f = mE(d, f)), G = d.length; G--; )
      if (~g.indexOf(d[G])) {
        S = v[G], f === "all" ? (_[G] = f, M = S, b = {}) : (b = _[G] = _[G] || {}, M = f);
        for (T in M)
          O = S && S[T], O && ((!("kill" in O.d) || O.d.kill(T) === !0) && Cf(this, O, "_pt"), delete S[T]), b !== "all" && (b[T] = 1);
      }
    return this._initted && !this._pt && p && qs(this), this;
  }, l.to = function(s, f) {
    return new l(s, f, arguments[2]);
  }, l.from = function(s, f) {
    return Js(1, arguments);
  }, l.delayedCall = function(s, f, h, d) {
    return new l(f, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: s,
      onComplete: f,
      onReverseComplete: f,
      onCompleteParams: h,
      onReverseCompleteParams: h,
      callbackScope: d
    });
  }, l.fromTo = function(s, f, h) {
    return Js(2, arguments);
  }, l.set = function(s, f) {
    return f.duration = 0, f.repeatDelay || (f.repeat = 0), new l(s, f);
  }, l.killTweensOf = function(s, f, h) {
    return We.killTweensOf(s, f, h);
  }, l;
})(fo);
Gi(yn.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
_i("staggerTo,staggerFrom,staggerFromTo", function(c) {
  yn[c] = function() {
    var l = new gi(), u = D0.call(arguments, 0);
    return u.splice(c === "staggerFromTo" ? 5 : 4, 0, 0), l[c].apply(l, u);
  };
});
var cm = function(l, u, a) {
  return l[u] = a;
}, Dy = function(l, u, a) {
  return l[u](a);
}, pE = function(l, u, a, s) {
  return l[u](s.fp, a);
}, vE = function(l, u, a) {
  return l.setAttribute(u, a);
}, fm = function(l, u) {
  return sn(l[u]) ? Dy : tm(l[u]) && l.setAttribute ? vE : cm;
}, Ny = function(l, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * l) * 1e6) / 1e6, u);
}, _E = function(l, u) {
  return u.set(u.t, u.p, !!(u.s + u.c * l), u);
}, Uy = function(l, u) {
  var a = u._pt, s = "";
  if (!l && u.b)
    s = u.b;
  else if (l === 1 && u.e)
    s = u.e;
  else {
    for (; a; )
      s = a.p + (a.m ? a.m(a.s + a.c * l) : Math.round((a.s + a.c * l) * 1e4) / 1e4) + s, a = a._next;
    s += u.c;
  }
  u.set(u.t, u.p, s, u);
}, hm = function(l, u) {
  for (var a = u._pt; a; )
    a.r(l, a.d), a = a._next;
}, yE = function(l, u, a, s) {
  for (var f = this._pt, h; f; )
    h = f._next, f.p === s && f.modifier(l, u, a), f = h;
}, SE = function(l) {
  for (var u = this._pt, a, s; u; )
    s = u._next, u.p === l && !u.op || u.op === l ? Cf(this, u, "_pt") : u.dep || (a = 1), u = s;
  return !a;
}, bE = function(l, u, a, s) {
  s.mSet(l, u, s.m.call(s.tween, a, s.mt), s);
}, By = function(l) {
  for (var u = l._pt, a, s, f, h; u; ) {
    for (a = u._next, s = f; s && s.pr > u.pr; )
      s = s._next;
    (u._prev = s ? s._prev : h) ? u._prev._next = u : f = u, (u._next = s) ? s._prev = u : h = u, u = a;
  }
  l._pt = f;
}, yi = /* @__PURE__ */ (function() {
  function c(u, a, s, f, h, d, g, v, p) {
    this.t = a, this.s = f, this.c = h, this.p = s, this.r = d || Ny, this.d = g || this, this.set = v || cm, this.pr = p || 0, this._next = u, u && (u._prev = this);
  }
  var l = c.prototype;
  return l.modifier = function(a, s, f) {
    this.mSet = this.mSet || this.set, this.set = bE, this.m = a, this.mt = f, this.tween = s;
  }, c;
})();
_i(am + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(c) {
  return lm[c] = 1;
});
Vi.TweenMax = Vi.TweenLite = yn;
Vi.TimelineLite = Vi.TimelineMax = gi;
We = new gi({
  sortChildren: !1,
  defaults: uo,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Xi.stringFilter = Ay;
var xu = [], lf = {}, TE = [], n1 = 0, EE = 0, p0 = function(l) {
  return (lf[l] || TE).map(function(u) {
    return u();
  });
}, ho = function() {
  var l = Date.now(), u = [];
  l - n1 > 2 && (p0("matchMediaInit"), xu.forEach(function(a) {
    var s = a.queries, f = a.conditions, h, d, g, v;
    for (d in s)
      h = Al.matchMedia(s[d]).matches, h && (g = 1), h !== f[d] && (f[d] = h, v = 1);
    v && (a.revert(), g && u.push(a));
  }), p0("matchMediaRevert"), u.forEach(function(a) {
    return a.onMatch(a, function(s) {
      return a.add(null, s);
    });
  }), n1 = l, p0("matchMedia"));
}, Hy = /* @__PURE__ */ (function() {
  function c(u, a) {
    this.selector = a && N0(a), this.data = [], this._r = [], this.isReverted = !1, this.id = EE++, u && this.add(u);
  }
  var l = c.prototype;
  return l.add = function(a, s, f) {
    sn(a) && (f = s, s = a, a = sn);
    var h = this, d = function() {
      var v = Ze, p = h.selector, _;
      return v && v !== h && v.data.push(h), f && (h.selector = N0(f)), Ze = h, _ = s.apply(h, arguments), sn(_) && h._r.push(_), Ze = v, h.selector = p, h.isReverted = !1, _;
    };
    return h.last = d, a === sn ? d(h, function(g) {
      return h.add(null, g);
    }) : a ? h[a] = d : d;
  }, l.ignore = function(a) {
    var s = Ze;
    Ze = null, a(this), Ze = s;
  }, l.getTweens = function() {
    var a = [];
    return this.data.forEach(function(s) {
      return s instanceof c ? a.push.apply(a, s.getTweens()) : s instanceof yn && !(s.parent && s.parent.data === "nested") && a.push(s);
    }), a;
  }, l.clear = function() {
    this._r.length = this.data.length = 0;
  }, l.kill = function(a, s) {
    var f = this;
    if (a ? (function() {
      for (var d = f.getTweens(), g = f.data.length, v; g--; )
        v = f.data[g], v.data === "isFlip" && (v.revert(), v.getChildren(!0, !0, !1).forEach(function(p) {
          return d.splice(d.indexOf(p), 1);
        }));
      for (d.map(function(p) {
        return {
          g: p._dur || p._delay || p._sat && !p._sat.vars.immediateRender ? p.globalTime(0) : -1 / 0,
          t: p
        };
      }).sort(function(p, _) {
        return _.g - p.g || -1 / 0;
      }).forEach(function(p) {
        return p.t.revert(a);
      }), g = f.data.length; g--; )
        v = f.data[g], v instanceof gi ? v.data !== "nested" && (v.scrollTrigger && v.scrollTrigger.revert(), v.kill()) : !(v instanceof yn) && v.revert && v.revert(a);
      f._r.forEach(function(p) {
        return p(a, f);
      }), f.isReverted = !0;
    })() : this.data.forEach(function(d) {
      return d.kill && d.kill();
    }), this.clear(), s) {
      for (var h = xu.length; h--; )
        xu[h].id === this.id && xu.splice(h, 1);
      this._mqs && this._mqs.forEach(function(d) {
        return d.removeListener ? d.removeListener(ho) : d.removeEventListener("change", ho);
      }), this._mqs = null;
    }
  }, l.revert = function(a) {
    this.kill(a || {});
  }, c;
})(), xE = /* @__PURE__ */ (function() {
  function c(u) {
    this.contexts = [], this.scope = u, Ze && Ze.data.push(this);
  }
  var l = c.prototype;
  return l.add = function(a, s, f) {
    Nl(a) || (a = {
      matches: a
    });
    var h = new Hy(0, f || this.scope), d = h.conditions = {}, g, v, p;
    Ze && !h.selector && (h.selector = Ze.selector), this.contexts.push(h), s = h.add("onMatch", s), h.queries = a;
    for (v in a)
      v === "all" ? p = 1 : (g = Al.matchMedia(a[v]), g && (xu.indexOf(h) < 0 && xu.push(h), (d[v] = g.matches) && (p = 1), g.addListener ? g.addListener(ho) : g.addEventListener("change", ho), (h._mqs || (h._mqs = [])).push(g)));
    return p && s(h, function(_) {
      return h.add(null, _);
    }), this;
  }, l.revert = function(a) {
    this.kill(a || {});
  }, l.kill = function(a) {
    this.contexts.forEach(function(s) {
      return s.kill(a, !0);
    });
  }, c;
})(), Sf = {
  registerPlugin: function() {
    for (var l = arguments.length, u = new Array(l), a = 0; a < l; a++)
      u[a] = arguments[a];
    u.forEach(function(s) {
      return xy(s);
    });
  },
  timeline: function(l) {
    return new gi(l);
  },
  getTweensOf: function(l, u) {
    return We.getTweensOf(l, u);
  },
  getProperty: function(l, u, a, s) {
    zn(l) && (l = il(l)[0]);
    var f = bu(l || {}).get, h = a ? fy : cy;
    return a === "native" && (a = ""), l && (u ? h((Bi[u] && Bi[u].get || f)(l, u, a, s)) : function(d, g, v) {
      return h((Bi[d] && Bi[d].get || f)(l, d, g, v));
    });
  },
  quickSetter: function(l, u, a) {
    if (l = il(l), l.length > 1) {
      var s = l.map(function(p) {
        return bi.quickSetter(p, u, a);
      }), f = s.length;
      return function(p) {
        for (var _ = f; _--; )
          s[_](p);
      };
    }
    l = l[0] || {};
    var h = Bi[u], d = bu(l), g = d.harness && (d.harness.aliases || {})[u] || u, v = h ? function(p) {
      var _ = new h();
      wr._pt = 0, _.init(l, a ? p + a : p, wr, 0, [l]), _.render(1, _), wr._pt && hm(1, wr);
    } : d.set(l, g);
    return h ? v : function(p) {
      return v(l, g, a ? p + a : p, d, 1);
    };
  },
  quickTo: function(l, u, a) {
    var s, f = bi.to(l, Gi((s = {}, s[u] = "+=0.1", s.paused = !0, s.stagger = 0, s), a || {})), h = function(g, v, p) {
      return f.resetTo(u, g, v, p);
    };
    return h.tween = f, h;
  },
  isTweening: function(l) {
    return We.getTweensOf(l, !0).length > 0;
  },
  defaults: function(l) {
    return l && l.ease && (l.ease = Eu(l.ease, uo.ease)), P_(uo, l || {});
  },
  config: function(l) {
    return P_(Xi, l || {});
  },
  registerEffect: function(l) {
    var u = l.name, a = l.effect, s = l.plugins, f = l.defaults, h = l.extendTimeline;
    (s || "").split(",").forEach(function(d) {
      return d && !Bi[d] && !Vi[d] && ro(u + " effect requires " + d + " plugin.");
    }), h0[u] = function(d, g, v) {
      return a(il(d), Gi(g || {}, f), v);
    }, h && (gi.prototype[u] = function(d, g, v) {
      return this.add(h0[u](d, Nl(g) ? g : (v = g) && {}, this), v);
    });
  },
  registerEase: function(l, u) {
    he[l] = Eu(u);
  },
  parseEase: function(l, u) {
    return arguments.length ? Eu(l, u) : he;
  },
  getById: function(l) {
    return We.getById(l);
  },
  exportRoot: function(l, u) {
    l === void 0 && (l = {});
    var a = new gi(l), s, f;
    for (a.smoothChildTiming = vi(l.smoothChildTiming), We.remove(a), a._dp = 0, a._time = a._tTime = We._time, s = We._first; s; )
      f = s._next, (u || !(!s._dur && s instanceof yn && s.vars.onComplete === s._targets[0])) && Rl(a, s, s._start - s._delay), s = f;
    return Rl(We, a, 0), a;
  },
  context: function(l, u) {
    return l ? new Hy(l, u) : Ze;
  },
  matchMedia: function(l) {
    return new xE(l);
  },
  matchMediaRefresh: function() {
    return xu.forEach(function(l) {
      var u = l.conditions, a, s;
      for (s in u)
        u[s] && (u[s] = !1, a = 1);
      a && l.revert();
    }) || ho();
  },
  addEventListener: function(l, u) {
    var a = lf[l] || (lf[l] = []);
    ~a.indexOf(u) || a.push(u);
  },
  removeEventListener: function(l, u) {
    var a = lf[l], s = a && a.indexOf(u);
    s >= 0 && a.splice(s, 1);
  },
  utils: {
    wrap: eE,
    wrapYoyo: nE,
    distribute: _y,
    random: Sy,
    snap: yy,
    normalize: tE,
    getUnit: Kn,
    clamp: $T,
    splitColor: My,
    toArray: il,
    selector: N0,
    mapRange: Ty,
    pipe: WT,
    unitize: IT,
    interpolate: iE,
    shuffle: vy
  },
  install: ay,
  effects: h0,
  ticker: Li,
  updateRoot: gi.updateRoot,
  plugins: Bi,
  globalTimeline: We,
  core: {
    PropTween: yi,
    globals: uy,
    Tween: yn,
    Timeline: gi,
    Animation: fo,
    getCache: bu,
    _removeLinkedListItem: Cf,
    reverting: function() {
      return Vn;
    },
    context: function(l) {
      return l && Ze && (Ze.data.push(l), l._ctx = Ze), Ze;
    },
    suppressOverwrites: function(l) {
      return I0 = l;
    }
  }
};
_i("to,from,fromTo,delayedCall,set,killTweensOf", function(c) {
  return Sf[c] = yn[c];
});
Li.add(gi.updateRoot);
wr = Sf.to({}, {
  duration: 0
});
var ME = function(l, u) {
  for (var a = l._pt; a && a.p !== u && a.op !== u && a.fp !== u; )
    a = a._next;
  return a;
}, wE = function(l, u) {
  var a = l._targets, s, f, h;
  for (s in u)
    for (f = a.length; f--; )
      h = l._ptLookup[f][s], h && (h = h.d) && (h._pt && (h = ME(h, s)), h && h.modifier && h.modifier(u[s], l, a[f], s));
}, v0 = function(l, u) {
  return {
    name: l,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(s, f, h) {
      h._onInit = function(d) {
        var g, v;
        if (zn(f) && (g = {}, _i(f, function(p) {
          return g[p] = 1;
        }), f = g), u) {
          g = {};
          for (v in f)
            g[v] = u(f[v]);
          f = g;
        }
        wE(d, f);
      };
    }
  };
}, bi = Sf.registerPlugin({
  name: "attr",
  init: function(l, u, a, s, f) {
    var h, d, g;
    this.tween = a;
    for (h in u)
      g = l.getAttribute(h) || "", d = this.add(l, "setAttribute", (g || 0) + "", u[h], s, f, 0, 0, h), d.op = h, d.b = g, this._props.push(h);
  },
  render: function(l, u) {
    for (var a = u._pt; a; )
      Vn ? a.set(a.t, a.p, a.b, a) : a.r(l, a.d), a = a._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(l, u) {
    for (var a = u.length; a--; )
      this.add(l, a, l[a] || 0, u[a], 0, 0, 0, 0, 0, 1);
  }
}, v0("roundProps", U0), v0("modifiers"), v0("snap", yy)) || Sf;
yn.version = gi.version = bi.version = "3.15.1";
ly = 1;
em() && Yr();
he.Power0;
he.Power1;
he.Power2;
he.Power3;
he.Power4;
he.Linear;
he.Quad;
he.Cubic;
he.Quart;
he.Quint;
he.Strong;
he.Elastic;
he.Back;
he.SteppedEase;
he.Bounce;
he.Sine;
he.Expo;
he.Circ;
var i1, Da, Rr, dm, _u, l1, mm, AE = function() {
  return typeof window < "u";
}, ta = {}, gu = 180 / Math.PI, Cr = Math.PI / 180, _r = Math.atan2, a1 = 1e8, gm = /([A-Z])/g, OE = /(left|right|width|margin|padding|x)/i, RE = /[\s,\(]\S/, Cl = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, H0 = function(l, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u, u);
}, CE = function(l, u) {
  return u.set(u.t, u.p, l === 1 ? u.e : Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u, u);
}, zE = function(l, u) {
  return u.set(u.t, u.p, l ? Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u : u.b, u);
}, DE = function(l, u) {
  return u.set(u.t, u.p, l === 1 ? u.e : l ? Math.round((u.s + u.c * l) * 1e4) / 1e4 + u.u : u.b, u);
}, NE = function(l, u) {
  var a = u.s + u.c * l;
  u.set(u.t, u.p, ~~(a + (a < 0 ? -0.5 : 0.5)) + u.u, u);
}, Ly = function(l, u) {
  return u.set(u.t, u.p, l ? u.e : u.b, u);
}, Yy = function(l, u) {
  return u.set(u.t, u.p, l !== 1 ? u.b : u.e, u);
}, UE = function(l, u, a) {
  return l.style[u] = a;
}, BE = function(l, u, a) {
  return l.style.setProperty(u, a);
}, HE = function(l, u, a) {
  return l._gsap[u] = a;
}, LE = function(l, u, a) {
  return l._gsap.scaleX = l._gsap.scaleY = a;
}, YE = function(l, u, a, s, f) {
  var h = l._gsap;
  h.scaleX = h.scaleY = a, h.renderTransform(f, h);
}, qE = function(l, u, a, s, f) {
  var h = l._gsap;
  h[u] = a, h.renderTransform(f, h);
}, tn = "transform", Si = tn + "Origin", XE = function c(l, u) {
  var a = this, s = this.target, f = s.style, h = s._gsap;
  if (l in ta && f) {
    if (this.tfm = this.tfm || {}, l !== "transform")
      l = Cl[l] || l, ~l.indexOf(",") ? l.split(",").forEach(function(d) {
        return a.tfm[d] = Jl(s, d);
      }) : this.tfm[l] = h.x ? h[l] : Jl(s, l), l === Si && (this.tfm.zOrigin = h.zOrigin);
    else
      return Cl.transform.split(",").forEach(function(d) {
        return c.call(a, d, u);
      });
    if (this.props.indexOf(tn) >= 0)
      return;
    h.svg && (this.svgo = s.getAttribute("data-svg-origin"), this.props.push(Si, u, "")), l = tn;
  }
  (f || u) && this.props.push(l, u, f[l]);
}, qy = function(l) {
  l.translate && (l.removeProperty("translate"), l.removeProperty("scale"), l.removeProperty("rotate"));
}, VE = function() {
  var l = this.props, u = this.target, a = u.style, s = u._gsap, f, h;
  for (f = 0; f < l.length; f += 3)
    l[f + 1] ? l[f + 1] === 2 ? u[l[f]](l[f + 2]) : u[l[f]] = l[f + 2] : l[f + 2] ? a[l[f]] = l[f + 2] : a.removeProperty(l[f].substr(0, 2) === "--" ? l[f] : l[f].replace(gm, "-$1").toLowerCase());
  if (this.tfm) {
    for (h in this.tfm)
      s[h] = this.tfm[h];
    s.svg && (s.renderTransform(), u.setAttribute("data-svg-origin", this.svgo || "")), f = mm(), (!f || !f.isStart) && !a[tn] && (qy(a), s.zOrigin && a[Si] && (a[Si] += " " + s.zOrigin + "px", s.zOrigin = 0, s.renderTransform()), s.uncache = 1);
  }
}, Xy = function(l, u) {
  var a = {
    target: l,
    props: [],
    revert: VE,
    save: XE
  };
  return l._gsap || bi.core.getCache(l), u && l.style && l.nodeType && u.split(",").forEach(function(s) {
    return a.save(s);
  }), a;
}, Vy, L0 = function(l, u) {
  var a = Da.createElementNS ? Da.createElementNS((u || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), l) : Da.createElement(l);
  return a && a.style ? a : Da.createElement(l);
}, qi = function c(l, u, a) {
  var s = getComputedStyle(l);
  return s[u] || s.getPropertyValue(u.replace(gm, "-$1").toLowerCase()) || s.getPropertyValue(u) || !a && c(l, qr(u) || u, 1) || "";
}, u1 = "O,Moz,ms,Ms,Webkit".split(","), qr = function(l, u, a) {
  var s = u || _u, f = s.style, h = 5;
  if (l in f && !a)
    return l;
  for (l = l.charAt(0).toUpperCase() + l.substr(1); h-- && !(u1[h] + l in f); )
    ;
  return h < 0 ? null : (h === 3 ? "ms" : h >= 0 ? u1[h] : "") + l;
}, Y0 = function() {
  AE() && window.document && (i1 = window, Da = i1.document, Rr = Da.documentElement, _u = L0("div") || {
    style: {}
  }, L0("div"), tn = qr(tn), Si = tn + "Origin", _u.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", Vy = !!qr("perspective"), mm = bi.core.reverting, dm = 1);
}, r1 = function(l) {
  var u = l.ownerSVGElement, a = L0("svg", u && u.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), s = l.cloneNode(!0), f;
  s.style.display = "block", a.appendChild(s), Rr.appendChild(a);
  try {
    f = s.getBBox();
  } catch {
  }
  return a.removeChild(s), Rr.removeChild(a), f;
}, s1 = function(l, u) {
  for (var a = u.length; a--; )
    if (l.hasAttribute(u[a]))
      return l.getAttribute(u[a]);
}, Gy = function(l) {
  var u, a;
  try {
    u = l.getBBox();
  } catch {
    u = r1(l), a = 1;
  }
  return u && (u.width || u.height) || a || (u = r1(l)), u && !u.width && !u.x && !u.y ? {
    x: +s1(l, ["x", "cx", "x1"]) || 0,
    y: +s1(l, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : u;
}, jy = function(l) {
  return !!(l.getCTM && (!l.parentNode || l.ownerSVGElement) && Gy(l));
}, Va = function(l, u) {
  if (u) {
    var a = l.style, s;
    u in ta && u !== Si && (u = tn), a.removeProperty ? (s = u.substr(0, 2), (s === "ms" || u.substr(0, 6) === "webkit") && (u = "-" + u), a.removeProperty(s === "--" ? u : u.replace(gm, "-$1").toLowerCase())) : a.removeAttribute(u);
  }
}, Na = function(l, u, a, s, f, h) {
  var d = new yi(l._pt, u, a, 0, 1, h ? Yy : Ly);
  return l._pt = d, d.b = s, d.e = f, l._props.push(a), d;
}, o1 = {
  deg: 1,
  rad: 1,
  turn: 1
}, GE = {
  grid: 1,
  flex: 1
}, Ga = function c(l, u, a, s) {
  var f = parseFloat(a) || 0, h = (a + "").trim().substr((f + "").length) || "px", d = _u.style, g = OE.test(u), v = l.tagName.toLowerCase() === "svg", p = (v ? "client" : "offset") + (g ? "Width" : "Height"), _ = 100, S = s === "px", b = s === "%", M, T, O, G;
  if (s === h || !f || o1[s] || o1[h])
    return f;
  if (h !== "px" && !S && (f = c(l, u, a, "px")), G = l.getCTM && jy(l), (b || h === "%") && (ta[u] || ~u.indexOf("adius")))
    return M = G ? l.getBBox()[g ? "width" : "height"] : l[p], hn(b ? f / M * _ : f / 100 * M);
  if (d[g ? "width" : "height"] = _ + (S ? h : s), T = s !== "rem" && ~u.indexOf("adius") || s === "em" && l.appendChild && !v ? l : l.parentNode, G && (T = (l.ownerSVGElement || {}).parentNode), (!T || T === Da || !T.appendChild) && (T = Da.body), O = T._gsap, O && b && O.width && g && O.time === Li.time && !O.uncache)
    return hn(f / O.width * _);
  if (b && (u === "height" || u === "width")) {
    var q = l.style[u];
    l.style[u] = _ + s, M = l[p], q ? l.style[u] = q : Va(l, u);
  } else
    (b || h === "%") && !GE[qi(T, "display")] && (d.position = qi(l, "position")), T === l && (d.position = "static"), T.appendChild(_u), M = _u[p], T.removeChild(_u), d.position = "absolute";
  return g && b && (O = bu(T), O.time = Li.time, O.width = T[p]), hn(S ? M * f / _ : M && f ? _ / M * f : 0);
}, Jl = function(l, u, a, s) {
  var f;
  return dm || Y0(), u in Cl && u !== "transform" && (u = Cl[u], ~u.indexOf(",") && (u = u.split(",")[0])), ta[u] && u !== "transform" ? (f = go(l, s), f = u !== "transformOrigin" ? f[u] : f.svg ? f.origin : Tf(qi(l, Si)) + " " + f.zOrigin + "px") : (f = l.style[u], (!f || f === "auto" || s || ~(f + "").indexOf("calc(")) && (f = bf[u] && bf[u](l, u, a) || qi(l, u) || sy(l, u) || (u === "opacity" ? 1 : 0))), a && !~(f + "").trim().indexOf(" ") ? Ga(l, u, f, a) + a : f;
}, jE = function(l, u, a, s) {
  if (!a || a === "none") {
    var f = qr(u, l, 1), h = f && qi(l, f, 1);
    h && h !== a ? (u = f, a = h) : u === "borderColor" && (a = qi(l, "borderTopColor"));
  }
  var d = new yi(this._pt, l.style, u, 0, 1, Uy), g = 0, v = 0, p, _, S, b, M, T, O, G, q, k, L, D;
  if (d.b = a, d.e = s, a += "", s += "", s.substring(0, 6) === "var(--" && (s = qi(l, s.substring(4, s.indexOf(")")))), s === "auto" && (T = l.style[u], l.style[u] = s, s = qi(l, u) || s, T ? l.style[u] = T : Va(l, u)), p = [a, s], Ay(p), a = p[0], s = p[1], S = a.match(Mr) || [], D = s.match(Mr) || [], D.length) {
    for (; _ = Mr.exec(s); )
      O = _[0], q = s.substring(g, _.index), M ? M = (M + 1) % 5 : (q.substr(-5) === "rgba(" || q.substr(-5) === "hsla(") && (M = 1), O !== (T = S[v++] || "") && (b = parseFloat(T) || 0, L = T.substr((b + "").length), O.charAt(1) === "=" && (O = Or(b, O) + L), G = parseFloat(O), k = O.substr((G + "").length), g = Mr.lastIndex - k.length, k || (k = k || Xi.units[u] || L, g === s.length && (s += k, d.e += k)), L !== k && (b = Ga(l, u, T, k) || 0), d._pt = {
        _next: d._pt,
        p: q || v === 1 ? q : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: b,
        c: G - b,
        m: M && M < 4 || u === "zIndex" ? Math.round : 0
      });
    d.c = g < s.length ? s.substring(g, s.length) : "";
  } else
    d.r = u === "display" && s === "none" ? Yy : Ly;
  return iy.test(s) && (d.e = 0), this._pt = d, d;
}, c1 = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, QE = function(l) {
  var u = l.split(" "), a = u[0], s = u[1] || "50%";
  return (a === "top" || a === "bottom" || s === "left" || s === "right") && (l = a, a = s, s = l), u[0] = c1[a] || a, u[1] = c1[s] || s, u.join(" ");
}, ZE = function(l, u) {
  if (u.tween && u.tween._time === u.tween._dur) {
    var a = u.t, s = a.style, f = u.u, h = a._gsap, d, g, v;
    if (f === "all" || f === !0)
      s.cssText = "", g = 1;
    else
      for (f = f.split(","), v = f.length; --v > -1; )
        d = f[v], ta[d] && (g = 1, d = d === "transformOrigin" ? Si : tn), Va(a, d);
    g && (Va(a, tn), h && (h.svg && a.removeAttribute("transform"), s.scale = s.rotate = s.translate = "none", go(a, 1), h.uncache = 1, qy(s)));
  }
}, bf = {
  clearProps: function(l, u, a, s, f) {
    if (f.data !== "isFromStart") {
      var h = l._pt = new yi(l._pt, u, a, 0, 0, ZE);
      return h.u = s, h.pr = -10, h.tween = f, l._props.push(a), 1;
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
}, mo = [1, 0, 0, 1, 0, 0], Qy = {}, Zy = function(l) {
  return l === "matrix(1, 0, 0, 1, 0, 0)" || l === "none" || !l;
}, f1 = function(l) {
  var u = qi(l, tn);
  return Zy(u) ? mo : u.substr(7).match(ny).map(hn);
}, pm = function(l, u) {
  var a = l._gsap || bu(l), s = l.style, f = f1(l), h, d, g, v;
  return a.svg && l.getAttribute("transform") ? (g = l.transform.baseVal.consolidate().matrix, f = [g.a, g.b, g.c, g.d, g.e, g.f], f.join(",") === "1,0,0,1,0,0" ? mo : f) : (f === mo && !l.offsetParent && l !== Rr && !a.svg && (g = s.display, s.display = "block", h = l.parentNode, (!h || !l.offsetParent && !l.getBoundingClientRect().width) && (v = 1, d = l.nextElementSibling, Rr.appendChild(l)), f = f1(l), g ? s.display = g : Va(l, "display"), v && (d ? h.insertBefore(l, d) : h ? h.appendChild(l) : Rr.removeChild(l))), u && f.length > 6 ? [f[0], f[1], f[4], f[5], f[12], f[13]] : f);
}, q0 = function(l, u, a, s, f, h) {
  var d = l._gsap, g = f || pm(l, !0), v = d.xOrigin || 0, p = d.yOrigin || 0, _ = d.xOffset || 0, S = d.yOffset || 0, b = g[0], M = g[1], T = g[2], O = g[3], G = g[4], q = g[5], k = u.split(" "), L = parseFloat(k[0]) || 0, D = parseFloat(k[1]) || 0, J, C, F, Z;
  a ? g !== mo && (C = b * O - M * T) && (F = L * (O / C) + D * (-T / C) + (T * q - O * G) / C, Z = L * (-M / C) + D * (b / C) - (b * q - M * G) / C, L = F, D = Z) : (J = Gy(l), L = J.x + (~k[0].indexOf("%") ? L / 100 * J.width : L), D = J.y + (~(k[1] || k[0]).indexOf("%") ? D / 100 * J.height : D)), s || s !== !1 && d.smooth ? (G = L - v, q = D - p, d.xOffset = _ + (G * b + q * T) - G, d.yOffset = S + (G * M + q * O) - q) : d.xOffset = d.yOffset = 0, d.xOrigin = L, d.yOrigin = D, d.smooth = !!s, d.origin = u, d.originIsAbsolute = !!a, l.style[Si] = "0px 0px", h && (Na(h, d, "xOrigin", v, L), Na(h, d, "yOrigin", p, D), Na(h, d, "xOffset", _, d.xOffset), Na(h, d, "yOffset", S, d.yOffset)), l.setAttribute("data-svg-origin", L + " " + D);
}, go = function(l, u) {
  var a = l._gsap || new Ry(l);
  if ("x" in a && !u && !a.uncache)
    return a;
  var s = l.style, f = a.scaleX < 0, h = "px", d = "deg", g = getComputedStyle(l), v = qi(l, Si) || "0", p, _, S, b, M, T, O, G, q, k, L, D, J, C, F, Z, Y, vt, $, yt, gt, tt, V, P, I, rt, x, ft, z, Ht, E, A;
  return p = _ = S = T = O = G = q = k = L = 0, b = M = 1, a.svg = !!(l.getCTM && jy(l)), g.translate && ((g.translate !== "none" || g.scale !== "none" || g.rotate !== "none") && (s[tn] = (g.translate !== "none" ? "translate3d(" + (g.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (g.rotate !== "none" ? "rotate(" + g.rotate + ") " : "") + (g.scale !== "none" ? "scale(" + g.scale.split(" ").join(",") + ") " : "") + (g[tn] !== "none" ? g[tn] : "")), s.scale = s.rotate = s.translate = "none"), C = pm(l, a.svg), a.svg && (a.uncache ? (I = l.getBBox(), v = a.xOrigin - I.x + "px " + (a.yOrigin - I.y) + "px", P = "") : P = !u && l.getAttribute("data-svg-origin"), q0(l, P || v, !!P || a.originIsAbsolute, a.smooth !== !1, C)), D = a.xOrigin || 0, J = a.yOrigin || 0, C !== mo && (vt = C[0], $ = C[1], yt = C[2], gt = C[3], p = tt = C[4], _ = V = C[5], C.length === 6 ? (b = Math.sqrt(vt * vt + $ * $), M = Math.sqrt(gt * gt + yt * yt), T = vt || $ ? _r($, vt) * gu : 0, q = yt || gt ? _r(yt, gt) * gu + T : 0, q && (M *= Math.abs(Math.cos(q * Cr))), a.svg && (p -= D - (D * vt + J * yt), _ -= J - (D * $ + J * gt))) : (A = C[6], Ht = C[7], x = C[8], ft = C[9], z = C[10], E = C[11], p = C[12], _ = C[13], S = C[14], F = _r(A, z), O = F * gu, F && (Z = Math.cos(-F), Y = Math.sin(-F), P = tt * Z + x * Y, I = V * Z + ft * Y, rt = A * Z + z * Y, x = tt * -Y + x * Z, ft = V * -Y + ft * Z, z = A * -Y + z * Z, E = Ht * -Y + E * Z, tt = P, V = I, A = rt), F = _r(-yt, z), G = F * gu, F && (Z = Math.cos(-F), Y = Math.sin(-F), P = vt * Z - x * Y, I = $ * Z - ft * Y, rt = yt * Z - z * Y, E = gt * Y + E * Z, vt = P, $ = I, yt = rt), F = _r($, vt), T = F * gu, F && (Z = Math.cos(F), Y = Math.sin(F), P = vt * Z + $ * Y, I = tt * Z + V * Y, $ = $ * Z - vt * Y, V = V * Z - tt * Y, vt = P, tt = I), O && Math.abs(O) + Math.abs(T) > 359.9 && (O = T = 0, G = 180 - G), b = hn(Math.sqrt(vt * vt + $ * $ + yt * yt)), M = hn(Math.sqrt(V * V + A * A)), F = _r(tt, V), q = Math.abs(F) > 2e-4 ? F * gu : 0, L = E ? 1 / (E < 0 ? -E : E) : 0), a.svg && (P = l.getAttribute("transform"), a.forceCSS = l.setAttribute("transform", "") || !Zy(qi(l, tn)), P && l.setAttribute("transform", P))), Math.abs(q) > 90 && Math.abs(q) < 270 && (f ? (b *= -1, q += T <= 0 ? 180 : -180, T += T <= 0 ? 180 : -180) : (M *= -1, q += q <= 0 ? 180 : -180)), u = u || a.uncache, a.x = p - ((a.xPercent = p && (!u && a.xPercent || (Math.round(l.offsetWidth / 2) === Math.round(-p) ? -50 : 0))) ? l.offsetWidth * a.xPercent / 100 : 0) + h, a.y = _ - ((a.yPercent = _ && (!u && a.yPercent || (Math.round(l.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? l.offsetHeight * a.yPercent / 100 : 0) + h, a.z = S + h, a.scaleX = hn(b), a.scaleY = hn(M), a.rotation = hn(T) + d, a.rotationX = hn(O) + d, a.rotationY = hn(G) + d, a.skewX = q + d, a.skewY = k + d, a.transformPerspective = L + h, (a.zOrigin = parseFloat(v.split(" ")[2]) || !u && a.zOrigin || 0) && (s[Si] = Tf(v)), a.xOffset = a.yOffset = 0, a.force3D = Xi.force3D, a.renderTransform = a.svg ? FE : Vy ? Ky : KE, a.uncache = 0, a;
}, Tf = function(l) {
  return (l = l.split(" "))[0] + " " + l[1];
}, _0 = function(l, u, a) {
  var s = Kn(u);
  return hn(parseFloat(u) + parseFloat(Ga(l, "x", a + "px", s))) + s;
}, KE = function(l, u) {
  u.z = "0px", u.rotationY = u.rotationX = "0deg", u.force3D = 0, Ky(l, u);
}, du = "0deg", Ds = "0px", mu = ") ", Ky = function(l, u) {
  var a = u || this, s = a.xPercent, f = a.yPercent, h = a.x, d = a.y, g = a.z, v = a.rotation, p = a.rotationY, _ = a.rotationX, S = a.skewX, b = a.skewY, M = a.scaleX, T = a.scaleY, O = a.transformPerspective, G = a.force3D, q = a.target, k = a.zOrigin, L = "", D = G === "auto" && l && l !== 1 || G === !0;
  if (k && (_ !== du || p !== du)) {
    var J = parseFloat(p) * Cr, C = Math.sin(J), F = Math.cos(J), Z;
    J = parseFloat(_) * Cr, Z = Math.cos(J), h = _0(q, h, C * Z * -k), d = _0(q, d, -Math.sin(J) * -k), g = _0(q, g, F * Z * -k + k);
  }
  O !== Ds && (L += "perspective(" + O + mu), (s || f) && (L += "translate(" + s + "%, " + f + "%) "), (D || h !== Ds || d !== Ds || g !== Ds) && (L += g !== Ds || D ? "translate3d(" + h + ", " + d + ", " + g + ") " : "translate(" + h + ", " + d + mu), v !== du && (L += "rotate(" + v + mu), p !== du && (L += "rotateY(" + p + mu), _ !== du && (L += "rotateX(" + _ + mu), (S !== du || b !== du) && (L += "skew(" + S + ", " + b + mu), (M !== 1 || T !== 1) && (L += "scale(" + M + ", " + T + mu), q.style[tn] = L || "translate(0, 0)";
}, FE = function(l, u) {
  var a = u || this, s = a.xPercent, f = a.yPercent, h = a.x, d = a.y, g = a.rotation, v = a.skewX, p = a.skewY, _ = a.scaleX, S = a.scaleY, b = a.target, M = a.xOrigin, T = a.yOrigin, O = a.xOffset, G = a.yOffset, q = a.forceCSS, k = parseFloat(h), L = parseFloat(d), D, J, C, F, Z;
  g = parseFloat(g), v = parseFloat(v), p = parseFloat(p), p && (p = parseFloat(p), v += p, g += p), g || v ? (g *= Cr, v *= Cr, D = Math.cos(g) * _, J = Math.sin(g) * _, C = Math.sin(g - v) * -S, F = Math.cos(g - v) * S, v && (p *= Cr, Z = Math.tan(v - p), Z = Math.sqrt(1 + Z * Z), C *= Z, F *= Z, p && (Z = Math.tan(p), Z = Math.sqrt(1 + Z * Z), D *= Z, J *= Z)), D = hn(D), J = hn(J), C = hn(C), F = hn(F)) : (D = _, F = S, J = C = 0), (k && !~(h + "").indexOf("px") || L && !~(d + "").indexOf("px")) && (k = Ga(b, "x", h, "px"), L = Ga(b, "y", d, "px")), (M || T || O || G) && (k = hn(k + M - (M * D + T * C) + O), L = hn(L + T - (M * J + T * F) + G)), (s || f) && (Z = b.getBBox(), k = hn(k + s / 100 * Z.width), L = hn(L + f / 100 * Z.height)), Z = "matrix(" + D + "," + J + "," + C + "," + F + "," + k + "," + L + ")", b.setAttribute("transform", Z), q && (b.style[tn] = Z);
}, kE = function(l, u, a, s, f) {
  var h = 360, d = zn(f), g = parseFloat(f) * (d && ~f.indexOf("rad") ? gu : 1), v = g - s, p = s + v + "deg", _, S;
  return d && (_ = f.split("_")[1], _ === "short" && (v %= h, v !== v % (h / 2) && (v += v < 0 ? h : -h)), _ === "cw" && v < 0 ? v = (v + h * a1) % h - ~~(v / h) * h : _ === "ccw" && v > 0 && (v = (v - h * a1) % h - ~~(v / h) * h)), l._pt = S = new yi(l._pt, u, a, s, v, CE), S.e = p, S.u = "deg", l._props.push(a), S;
}, h1 = function(l, u) {
  for (var a in u)
    l[a] = u[a];
  return l;
}, JE = function(l, u, a) {
  var s = h1({}, a._gsap), f = "perspective,force3D,transformOrigin,svgOrigin", h = a.style, d, g, v, p, _, S, b, M;
  s.svg ? (v = a.getAttribute("transform"), a.setAttribute("transform", ""), h[tn] = u, d = go(a, 1), Va(a, tn), a.setAttribute("transform", v)) : (v = getComputedStyle(a)[tn], h[tn] = u, d = go(a, 1), h[tn] = v);
  for (g in ta)
    v = s[g], p = d[g], v !== p && f.indexOf(g) < 0 && (b = Kn(v), M = Kn(p), _ = b !== M ? Ga(a, g, v, M) : parseFloat(v), S = parseFloat(p), l._pt = new yi(l._pt, d, g, _, S - _, H0), l._pt.u = M || 0, l._props.push(g));
  h1(d, s);
};
_i("padding,margin,Width,Radius", function(c, l) {
  var u = "Top", a = "Right", s = "Bottom", f = "Left", h = (l < 3 ? [u, a, s, f] : [u + f, u + a, s + a, s + f]).map(function(d) {
    return l < 2 ? c + d : "border" + d + c;
  });
  bf[l > 1 ? "border" + c : c] = function(d, g, v, p, _) {
    var S, b;
    if (arguments.length < 4)
      return S = h.map(function(M) {
        return Jl(d, M, v);
      }), b = S.join(" "), b.split(S[0]).length === 5 ? S[0] : b;
    S = (p + "").split(" "), b = {}, h.forEach(function(M, T) {
      return b[M] = S[T] = S[T] || S[(T - 1) / 2 | 0];
    }), d.init(g, b, _);
  };
});
var Fy = {
  name: "css",
  register: Y0,
  targetTest: function(l) {
    return l.style && l.nodeType;
  },
  init: function(l, u, a, s, f) {
    var h = this._props, d = l.style, g = a.vars.startAt, v, p, _, S, b, M, T, O, G, q, k, L, D, J, C, F, Z;
    dm || Y0(), this.styles = this.styles || Xy(l), F = this.styles.props, this.tween = a;
    for (T in u)
      if (T !== "autoRound" && (p = u[T], !(Bi[T] && Cy(T, u, a, s, l, f)))) {
        if (b = typeof p, M = bf[T], b === "function" && (p = p.call(a, s, l, f), b = typeof p), b === "string" && ~p.indexOf("random(") && (p = oo(p)), M)
          M(this, l, T, p, a) && (C = 1);
        else if (T.substr(0, 2) === "--")
          v = (getComputedStyle(l).getPropertyValue(T) + "").trim(), p += "", La.lastIndex = 0, La.test(v) || (O = Kn(v), G = Kn(p), G ? O !== G && (v = Ga(l, T, v, G) + G) : O && (p += O)), this.add(d, "setProperty", v, p, s, f, 0, 0, T), h.push(T), F.push(T, 0, d[T]);
        else if (b !== "undefined") {
          if (g && T in g ? (v = typeof g[T] == "function" ? g[T].call(a, s, l, f) : g[T], zn(v) && ~v.indexOf("random(") && (v = oo(v)), Kn(v + "") || v === "auto" || (v += Xi.units[T] || Kn(Jl(l, T)) || ""), (v + "").charAt(1) === "=" && (v = Jl(l, T))) : v = Jl(l, T), S = parseFloat(v), q = b === "string" && p.charAt(1) === "=" && p.substr(0, 2), q && (p = p.substr(2)), _ = parseFloat(p), T in Cl && (T === "autoAlpha" && (S === 1 && Jl(l, "visibility") === "hidden" && _ && (S = 0), F.push("visibility", 0, d.visibility), Na(this, d, "visibility", S ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), T !== "scale" && T !== "transform" && (T = Cl[T], ~T.indexOf(",") && (T = T.split(",")[0]))), k = T in ta, k) {
            if (this.styles.save(T), Z = p, b === "string" && p.substring(0, 6) === "var(--") {
              if (p = qi(l, p.substring(4, p.indexOf(")"))), p.substring(0, 5) === "calc(") {
                var Y = l.style.perspective;
                l.style.perspective = p, p = qi(l, "perspective"), Y ? l.style.perspective = Y : Va(l, "perspective");
              }
              _ = parseFloat(p);
            }
            if (L || (D = l._gsap, D.renderTransform && !u.parseTransform || go(l, u.parseTransform), J = u.smoothOrigin !== !1 && D.smooth, L = this._pt = new yi(this._pt, d, tn, 0, 1, D.renderTransform, D, 0, -1), L.dep = 1), T === "scale")
              this._pt = new yi(this._pt, D, "scaleY", D.scaleY, (q ? Or(D.scaleY, q + _) : _) - D.scaleY || 0, H0), this._pt.u = 0, h.push("scaleY", T), T += "X";
            else if (T === "transformOrigin") {
              F.push(Si, 0, d[Si]), p = QE(p), D.svg ? q0(l, p, 0, J, 0, this) : (G = parseFloat(p.split(" ")[2]) || 0, G !== D.zOrigin && Na(this, D, "zOrigin", D.zOrigin, G), Na(this, d, T, Tf(v), Tf(p)));
              continue;
            } else if (T === "svgOrigin") {
              q0(l, p, 1, J, 0, this);
              continue;
            } else if (T in Qy) {
              kE(this, D, T, S, q ? Or(S, q + p) : p);
              continue;
            } else if (T === "smoothOrigin") {
              Na(this, D, "smooth", D.smooth, p);
              continue;
            } else if (T === "force3D") {
              D[T] = p;
              continue;
            } else if (T === "transform") {
              JE(this, p, l);
              continue;
            }
          } else T in d || (T = qr(T) || T);
          if (k || (_ || _ === 0) && (S || S === 0) && !RE.test(p) && T in d)
            O = (v + "").substr((S + "").length), _ || (_ = 0), G = Kn(p) || (T in Xi.units ? Xi.units[T] : O), O !== G && (S = Ga(l, T, v, G)), this._pt = new yi(this._pt, k ? D : d, T, S, (q ? Or(S, q + _) : _) - S, !k && (G === "px" || T === "zIndex") && u.autoRound !== !1 ? NE : H0), this._pt.u = G || 0, k && Z !== p ? (this._pt.b = v, this._pt.e = Z, this._pt.r = DE) : O !== G && G !== "%" && (this._pt.b = v, this._pt.r = zE);
          else if (T in d)
            jE.call(this, l, T, v, q ? q + p : p);
          else if (T in l)
            this.add(l, T, v || l[T], q ? q + p : p, s, f);
          else if (T !== "parseTransform") {
            im(T, p);
            continue;
          }
          k || (T in d ? F.push(T, 0, d[T]) : typeof l[T] == "function" ? F.push(T, 2, l[T]()) : F.push(T, 1, v || l[T])), h.push(T);
        }
      }
    C && By(this);
  },
  render: function(l, u) {
    if (u.tween._time || !mm())
      for (var a = u._pt; a; )
        a.r(l, a.d), a = a._next;
    else
      u.styles.revert();
  },
  get: Jl,
  aliases: Cl,
  getSetter: function(l, u, a) {
    var s = Cl[u];
    return s && s.indexOf(",") < 0 && (u = s), u in ta && u !== Si && (l._gsap.x || Jl(l, "x")) ? a && l1 === a ? u === "scale" ? LE : HE : (l1 = a || {}) && (u === "scale" ? YE : qE) : l.style && !tm(l.style[u]) ? UE : ~u.indexOf("-") ? BE : fm(l, u);
  },
  core: {
    _removeProperty: Va,
    _getMatrix: pm
  }
};
bi.utils.checkPrefix = qr;
bi.core.getStyleSaver = Xy;
(function(c, l, u, a) {
  var s = _i(c + "," + l + "," + u, function(f) {
    ta[f] = 1;
  });
  _i(l, function(f) {
    Xi.units[f] = "deg", Qy[f] = 1;
  }), Cl[s[13]] = c + "," + l, _i(a, function(f) {
    var h = f.split(":");
    Cl[h[1]] = s[h[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
_i("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(c) {
  Xi.units[c] = "px";
});
bi.registerPlugin(Fy);
var Ie = bi.registerPlugin(Fy) || bi;
Ie.core.Tween;
function $E(c, l) {
  for (var u = 0; u < l.length; u++) {
    var a = l[u];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(c, a.key, a);
  }
}
function PE(c, l, u) {
  return l && $E(c.prototype, l), c;
}
var Xn, af, pi, Ua, Ba, zr, ky, pu, Dr, Jy, Pl, hl, $y, Py = function() {
  return Xn || typeof window < "u" && (Xn = window.gsap) && Xn.registerPlugin && Xn;
}, Wy = 1, Ar = [], ue = [], Dl = [], Ps = Date.now, X0 = function(l, u) {
  return u;
}, WE = function() {
  var l = Dr.core, u = l.bridge || {}, a = l._scrollers, s = l._proxies;
  a.push.apply(a, ue), s.push.apply(s, Dl), ue = a, Dl = s, X0 = function(h, d) {
    return u[h](d);
  };
}, Ya = function(l, u) {
  return ~Dl.indexOf(l) && Dl[Dl.indexOf(l) + 1][u];
}, Ws = function(l) {
  return !!~Jy.indexOf(l);
}, ii = function(l, u, a, s, f) {
  return l.addEventListener(u, a, {
    passive: s !== !1,
    capture: !!f
  });
}, ni = function(l, u, a, s) {
  return l.removeEventListener(u, a, !!s);
}, Vc = "scrollLeft", Gc = "scrollTop", V0 = function() {
  return Pl && Pl.isPressed || ue.cache++;
}, Ef = function(l, u) {
  var a = function s(f) {
    if (f || f === 0) {
      Wy && pi.history.scrollRestoration !== "manual" && (pi.history.scrollRestoration = "manual");
      var h = Pl && Pl.isPressed;
      f = s.v = Math.round(f) || (Pl && Pl.iOS ? 1 : 0), l(f), s.cacheID = ue.cache, h && X0("ss", f);
    } else (u || ue.cache !== s.cacheID || X0("ref")) && (s.cacheID = ue.cache, s.v = l());
    return s.v + s.offset;
  };
  return a.offset = 0, l && a;
}, ri = {
  s: Vc,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: Ef(function(c) {
    return arguments.length ? pi.scrollTo(c, Tn.sc()) : pi.pageXOffset || Ua[Vc] || Ba[Vc] || zr[Vc] || 0;
  })
}, Tn = {
  s: Gc,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ri,
  sc: Ef(function(c) {
    return arguments.length ? pi.scrollTo(ri.sc(), c) : pi.pageYOffset || Ua[Gc] || Ba[Gc] || zr[Gc] || 0;
  })
}, mi = function(l, u) {
  return (u && u._ctx && u._ctx.selector || Xn.utils.toArray)(l)[0] || (typeof l == "string" && Xn.config().nullTargetWarn !== !1 ? console.warn("Element not found:", l) : null);
}, IE = function(l, u) {
  for (var a = u.length; a--; )
    if (u[a] === l || u[a].contains(l))
      return !0;
  return !1;
}, ja = function(l, u) {
  var a = u.s, s = u.sc;
  Ws(l) && (l = Ua.scrollingElement || Ba);
  var f = ue.indexOf(l), h = s === Tn.sc ? 1 : 2;
  !~f && (f = ue.push(l) - 1), ue[f + h] || ii(l, "scroll", V0);
  var d = ue[f + h], g = d || (ue[f + h] = Ef(Ya(l, a), !0) || (Ws(l) ? s : Ef(function(v) {
    return arguments.length ? l[a] = v : l[a];
  })));
  return g.target = l, d || (g.smooth = Xn.getProperty(l, "scrollBehavior") === "smooth"), g;
}, G0 = function(l, u, a) {
  var s = l, f = l, h = Ps(), d = h, g = u || 50, v = Math.max(500, g * 3), p = function(M, T) {
    var O = Ps();
    T || O - h > g ? (f = s, s = M, d = h, h = O) : a ? s += M : s = f + (M - f) / (O - d) * (h - d);
  }, _ = function() {
    f = s = a ? 0 : s, d = h = 0;
  }, S = function(M) {
    var T = d, O = f, G = Ps();
    return (M || M === 0) && M !== s && p(M), h === d || G - d > v ? 0 : (s + (a ? O : -O)) / ((a ? G : h) - T) * 1e3;
  };
  return {
    update: p,
    reset: _,
    getVelocity: S
  };
}, Ns = function(l, u) {
  return u && !l._gsapAllow && l.cancelable !== !1 && l.preventDefault(), l.changedTouches ? l.changedTouches[0] : l;
}, d1 = function(l) {
  var u = Math.max.apply(Math, l), a = Math.min.apply(Math, l);
  return Math.abs(u) >= Math.abs(a) ? u : a;
}, Iy = function() {
  Dr = Xn.core.globals().ScrollTrigger, Dr && Dr.core && WE();
}, tS = function(l) {
  return Xn = l || Py(), !af && Xn && typeof document < "u" && document.body && (pi = window, Ua = document, Ba = Ua.documentElement, zr = Ua.body, Jy = [pi, Ua, Ba, zr], Xn.utils.clamp, $y = Xn.core.context || function() {
  }, pu = "onpointerenter" in zr ? "pointer" : "mouse", ky = dn.isTouch = pi.matchMedia && pi.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in pi || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, hl = dn.eventTypes = ("ontouchstart" in Ba ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ba ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Wy = 0;
  }, 500), af = 1), Dr || Iy(), af;
};
ri.op = Tn;
ue.cache = 0;
var dn = /* @__PURE__ */ (function() {
  function c(u) {
    this.init(u);
  }
  var l = c.prototype;
  return l.init = function(a) {
    af || tS(Xn) || console.warn("Please gsap.registerPlugin(Observer)"), Dr || Iy();
    var s = a.tolerance, f = a.dragMinimum, h = a.type, d = a.target, g = a.lineHeight, v = a.debounce, p = a.preventDefault, _ = a.onStop, S = a.onStopDelay, b = a.ignore, M = a.wheelSpeed, T = a.event, O = a.onDragStart, G = a.onDragEnd, q = a.onDrag, k = a.onPress, L = a.onRelease, D = a.onRight, J = a.onLeft, C = a.onUp, F = a.onDown, Z = a.onChangeX, Y = a.onChangeY, vt = a.onChange, $ = a.onToggleX, yt = a.onToggleY, gt = a.onHover, tt = a.onHoverEnd, V = a.onMove, P = a.ignoreCheck, I = a.isNormalizer, rt = a.onGestureStart, x = a.onGestureEnd, ft = a.onWheel, z = a.onEnable, Ht = a.onDisable, E = a.onClick, A = a.scrollSpeed, W = a.capture, j = a.allowClicks, pt = a.lockAxis, dt = a.onLockAxis;
    this.target = d = mi(d) || Ba, this.vars = a, b && (b = Xn.utils.toArray(b)), s = s || 1e-9, f = f || 0, M = M || 1, A = A || 1, h = h || "wheel,touch,pointer", v = v !== !1, g || (g = parseFloat(pi.getComputedStyle(zr).lineHeight) || 22);
    var zt, ot, ct, wt, ut, St, xt, N = this, mt = 0, Rt = 0, _t = a.passive || !p && a.passive !== !1, Mt = ja(d, ri), Gt = ja(d, Tn), Ft = Mt(), Ut = Gt(), At = ~h.indexOf("touch") && !~h.indexOf("pointer") && hl[0] === "pointerdown", Qt = Ws(d), te = d.ownerDocument || Ua, Xe = [0, 0, 0], ye = [0, 0, 0], en = 0, En = function() {
      return en = Ps();
    }, Se = function(at, Tt) {
      return (N.event = at) && b && IE(at.target, b) || Tt && At && at.pointerType !== "touch" || P && P(at, Tt);
    }, Gn = function() {
      N._vx.reset(), N._vy.reset(), ot.pause(), _ && _(N);
    }, Re = function() {
      var at = N.deltaX = d1(Xe), Tt = N.deltaY = d1(ye), it = Math.abs(at) >= s, ht = Math.abs(Tt) >= s;
      vt && (it || ht) && vt(N, at, Tt, Xe, ye), it && (D && N.deltaX > 0 && D(N), J && N.deltaX < 0 && J(N), Z && Z(N), $ && N.deltaX < 0 != mt < 0 && $(N), mt = N.deltaX, Xe[0] = Xe[1] = Xe[2] = 0), ht && (F && N.deltaY > 0 && F(N), C && N.deltaY < 0 && C(N), Y && Y(N), yt && N.deltaY < 0 != Rt < 0 && yt(N), Rt = N.deltaY, ye[0] = ye[1] = ye[2] = 0), (wt || ct) && (V && V(N), ct && (O && ct === 1 && O(N), q && q(N), ct = 0), wt = !1), St && !(St = !1) && dt && dt(N), ut && (ft(N), ut = !1), zt = 0;
    }, xn = function(at, Tt, it) {
      Xe[it] += at, ye[it] += Tt, N._vx.update(at), N._vy.update(Tt), v ? zt || (zt = requestAnimationFrame(Re)) : Re();
    }, Ve = function(at, Tt) {
      pt && !xt && (N.axis = xt = Math.abs(at) > Math.abs(Tt) ? "x" : "y", St = !0), xt !== "y" && (Xe[2] += at, N._vx.update(at, !0)), xt !== "x" && (ye[2] += Tt, N._vy.update(Tt, !0)), v ? zt || (zt = requestAnimationFrame(Re)) : Re();
    }, Dn = function(at) {
      if (!Se(at, 1)) {
        at = Ns(at, p);
        var Tt = at.clientX, it = at.clientY, ht = Tt - N.x, Et = it - N.y, Ot = N.isDragging;
        N.x = Tt, N.y = it, (Ot || (ht || Et) && (Math.abs(N.startX - Tt) >= f || Math.abs(N.startY - it) >= f)) && (ct || (ct = Ot ? 2 : 1), Ot || (N.isDragging = !0), Ve(ht, Et));
      }
    }, Jn = N.onPress = function(lt) {
      Se(lt, 1) || lt && lt.button || (N.axis = xt = null, ot.pause(), N.isPressed = !0, lt = Ns(lt), mt = Rt = 0, N.startX = N.x = lt.clientX, N.startY = N.y = lt.clientY, N._vx.reset(), N._vy.reset(), ii(I ? d : te, hl[1], Dn, _t, !0), N.deltaX = N.deltaY = 0, k && k(N));
    }, Yt = N.onRelease = function(lt) {
      if (!Se(lt, 1)) {
        ni(I ? d : te, hl[1], Dn, !0);
        var at = !isNaN(N.y - N.startY), Tt = N.isDragging, it = Tt && (Math.abs(N.x - N.startX) > 3 || Math.abs(N.y - N.startY) > 3), ht = Ns(lt);
        !it && at && (N._vx.reset(), N._vy.reset(), p && j && Xn.delayedCall(0.08, function() {
          if (Ps() - en > 300 && !lt.defaultPrevented) {
            if (lt.target.click)
              lt.target.click();
            else if (te.createEvent) {
              var Et = te.createEvent("MouseEvents");
              Et.initMouseEvent("click", !0, !0, pi, 1, ht.screenX, ht.screenY, ht.clientX, ht.clientY, !1, !1, !1, !1, 0, null), lt.target.dispatchEvent(Et);
            }
          }
        })), N.isDragging = N.isGesturing = N.isPressed = !1, _ && Tt && !I && ot.restart(!0), ct && Re(), G && Tt && G(N), L && L(N, it);
      }
    }, Jt = function(at) {
      return at.touches && at.touches.length > 1 && (N.isGesturing = !0) && rt(at, N.isDragging);
    }, ee = function() {
      return (N.isGesturing = !1) || x(N);
    }, Ce = function(at) {
      if (!Se(at)) {
        var Tt = Mt(), it = Gt();
        xn((Tt - Ft) * A, (it - Ut) * A, 1), Ft = Tt, Ut = it, _ && ot.restart(!0);
      }
    }, de = function(at) {
      if (!Se(at)) {
        at = Ns(at, p), ft && (ut = !0);
        var Tt = (at.deltaMode === 1 ? g : at.deltaMode === 2 ? pi.innerHeight : 1) * M;
        xn(at.deltaX * Tt, at.deltaY * Tt, 0), _ && !I && ot.restart(!0);
      }
    }, Nn = function(at) {
      if (!Se(at)) {
        var Tt = at.clientX, it = at.clientY, ht = Tt - N.x, Et = it - N.y;
        N.x = Tt, N.y = it, wt = !0, _ && ot.restart(!0), (ht || Et) && Ve(ht, Et);
      }
    }, Ke = function(at) {
      N.event = at, gt(N);
    }, Fe = function(at) {
      N.event = at, tt(N);
    }, st = function(at) {
      return Se(at) || Ns(at, p) && E(N);
    };
    ot = N._dc = Xn.delayedCall(S || 0.25, Gn).pause(), N.deltaX = N.deltaY = 0, N._vx = G0(0, 50, !0), N._vy = G0(0, 50, !0), N.scrollX = Mt, N.scrollY = Gt, N.isDragging = N.isGesturing = N.isPressed = !1, $y(this), N.enable = function(lt) {
      return N.isEnabled || (ii(Qt ? te : d, "scroll", V0), h.indexOf("scroll") >= 0 && ii(Qt ? te : d, "scroll", Ce, _t, W), h.indexOf("wheel") >= 0 && ii(d, "wheel", de, _t, W), (h.indexOf("touch") >= 0 && ky || h.indexOf("pointer") >= 0) && (ii(d, hl[0], Jn, _t, W), ii(te, hl[2], Yt), ii(te, hl[3], Yt), j && ii(d, "click", En, !0, !0), E && ii(d, "click", st), rt && ii(te, "gesturestart", Jt), x && ii(te, "gestureend", ee), gt && ii(d, pu + "enter", Ke), tt && ii(d, pu + "leave", Fe), V && ii(d, pu + "move", Nn)), N.isEnabled = !0, N.isDragging = N.isGesturing = N.isPressed = wt = ct = !1, N._vx.reset(), N._vy.reset(), Ft = Mt(), Ut = Gt(), lt && lt.type && Jn(lt), z && z(N)), N;
    }, N.disable = function() {
      N.isEnabled && (Ar.filter(function(lt) {
        return lt !== N && Ws(lt.target);
      }).length || ni(Qt ? te : d, "scroll", V0), N.isPressed && (N._vx.reset(), N._vy.reset(), ni(I ? d : te, hl[1], Dn, !0)), ni(Qt ? te : d, "scroll", Ce, W), ni(d, "wheel", de, W), ni(d, hl[0], Jn, W), ni(te, hl[2], Yt), ni(te, hl[3], Yt), ni(d, "click", En, !0), ni(d, "click", st), ni(te, "gesturestart", Jt), ni(te, "gestureend", ee), ni(d, pu + "enter", Ke), ni(d, pu + "leave", Fe), ni(d, pu + "move", Nn), N.isEnabled = N.isPressed = N.isDragging = !1, Ht && Ht(N));
    }, N.kill = N.revert = function() {
      N.disable();
      var lt = Ar.indexOf(N);
      lt >= 0 && Ar.splice(lt, 1), Pl === N && (Pl = 0);
    }, Ar.push(N), I && Ws(d) && (Pl = N), N.enable(T);
  }, PE(c, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), c;
})();
dn.version = "3.15.1";
dn.create = function(c) {
  return new dn(c);
};
dn.register = tS;
dn.getAll = function() {
  return Ar.slice();
};
dn.getById = function(c) {
  return Ar.filter(function(l) {
    return l.vars.id === c;
  })[0];
};
Py() && Xn.registerPlugin(dn);
var Nt, Er, ae, we, Hi, Te, vm, xf, po, Is, Vs, jc, Qn, Nf, j0, ai, m1, g1, xr, eS, y0, nS, li, Q0, iS, lS, Ra, Z0, _m, Nr, ym, qa, K0, S0, Qc = 1, Zn = Date.now, b0 = Zn(), ll = 0, Gs = 0, p1 = function(l, u, a) {
  var s = Ui(l) && (l.substr(0, 6) === "clamp(" || l.indexOf("max") > -1);
  return a["_" + u + "Clamp"] = s, s ? l.substr(6, l.length - 7) : l;
}, v1 = function(l, u) {
  return u && (!Ui(l) || l.substr(0, 6) !== "clamp(") ? "clamp(" + l + ")" : l;
}, t3 = function c() {
  return Gs && requestAnimationFrame(c);
}, _1 = function() {
  return Nf = 1;
}, y1 = function() {
  return Nf = 0;
}, Ol = function(l) {
  return l;
}, js = function(l) {
  return Math.round(l * 1e5) / 1e5 || 0;
}, aS = function() {
  return typeof window < "u";
}, uS = function() {
  return Nt || aS() && (Nt = window.gsap) && Nt.registerPlugin && Nt;
}, Ou = function(l) {
  return !!~vm.indexOf(l);
}, rS = function(l) {
  return (l === "Height" ? ym : ae["inner" + l]) || Hi["client" + l] || Te["client" + l];
}, sS = function(l) {
  return Ya(l, "getBoundingClientRect") || (Ou(l) ? function() {
    return cf.width = ae.innerWidth, cf.height = ym, cf;
  } : function() {
    return $l(l);
  });
}, e3 = function(l, u, a) {
  var s = a.d, f = a.d2, h = a.a;
  return (h = Ya(l, "getBoundingClientRect")) ? function() {
    return h()[s];
  } : function() {
    return (u ? rS(f) : l["client" + f]) || 0;
  };
}, n3 = function(l, u) {
  return !u || ~Dl.indexOf(l) ? sS(l) : function() {
    return cf;
  };
}, zl = function(l, u) {
  var a = u.s, s = u.d2, f = u.d, h = u.a;
  return Math.max(0, (a = "scroll" + s) && (h = Ya(l, a)) ? h() - sS(l)()[f] : Ou(l) ? (Hi[a] || Te[a]) - rS(s) : l[a] - l["offset" + s]);
}, Zc = function(l, u) {
  for (var a = 0; a < xr.length; a += 3)
    (!u || ~u.indexOf(xr[a + 1])) && l(xr[a], xr[a + 1], xr[a + 2]);
}, Ui = function(l) {
  return typeof l == "string";
}, Fn = function(l) {
  return typeof l == "function";
}, Qs = function(l) {
  return typeof l == "number";
}, vu = function(l) {
  return typeof l == "object";
}, Us = function(l, u, a) {
  return l && l.progress(u ? 0 : 1) && a && l.pause();
}, yr = function(l, u, a) {
  if (l.enabled) {
    var s = l._ctx ? l._ctx.add(function() {
      return u(l, a);
    }) : u(l, a);
    s && s.totalTime && (l.callbackAnimation = s);
  }
}, Sr = Math.abs, oS = "left", cS = "top", Sm = "right", bm = "bottom", Mu = "width", wu = "height", to = "Right", eo = "Left", no = "Top", io = "Bottom", _n = "padding", tl = "margin", Xr = "Width", Tm = "Height", bn = "px", el = function(l) {
  return ae.getComputedStyle(l.nodeType === Node.DOCUMENT_NODE ? l.scrollingElement : l);
}, i3 = function(l) {
  var u = el(l).position;
  l.style.position = u === "absolute" || u === "fixed" ? u : "relative";
}, S1 = function(l, u) {
  for (var a in u)
    a in l || (l[a] = u[a]);
  return l;
}, $l = function(l, u) {
  var a = u && el(l)[j0] !== "matrix(1, 0, 0, 1, 0, 0)" && Nt.to(l, {
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
  }).progress(1), s = l.getBoundingClientRect ? l.getBoundingClientRect() : l.scrollingElement.getBoundingClientRect();
  return a && a.progress(0).kill(), s;
}, Mf = function(l, u) {
  var a = u.d2;
  return l["offset" + a] || l["client" + a] || 0;
}, fS = function(l) {
  var u = [], a = l.labels, s = l.duration(), f;
  for (f in a)
    u.push(a[f] / s);
  return u;
}, l3 = function(l) {
  return function(u) {
    return Nt.utils.snap(fS(l), u);
  };
}, Em = function(l) {
  var u = Nt.utils.snap(l), a = Array.isArray(l) && l.slice(0).sort(function(s, f) {
    return s - f;
  });
  return a ? function(s, f, h) {
    h === void 0 && (h = 1e-3);
    var d;
    if (!f)
      return u(s);
    if (f > 0) {
      for (s -= h, d = 0; d < a.length; d++)
        if (a[d] >= s)
          return a[d];
      return a[d - 1];
    } else
      for (d = a.length, s += h; d--; )
        if (a[d] <= s)
          return a[d];
    return a[0];
  } : function(s, f, h) {
    h === void 0 && (h = 1e-3);
    var d = u(s);
    return !f || Math.abs(d - s) < h || d - s < 0 == f < 0 ? d : u(f < 0 ? s - l : s + l);
  };
}, a3 = function(l) {
  return function(u, a) {
    return Em(fS(l))(u, a.direction);
  };
}, Kc = function(l, u, a, s) {
  return a.split(",").forEach(function(f) {
    return l(u, f, s);
  });
}, Cn = function(l, u, a, s, f) {
  return l.addEventListener(u, a, {
    passive: !s,
    capture: !!f
  });
}, Rn = function(l, u, a, s) {
  return l.removeEventListener(u, a, !!s);
}, Fc = function(l, u, a) {
  a = a && a.wheelHandler, a && (l(u, "wheel", a), l(u, "touchmove", a));
}, b1 = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, kc = {
  toggleActions: "play",
  anticipatePin: 0
}, wf = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, uf = function(l, u) {
  if (Ui(l)) {
    var a = l.indexOf("="), s = ~a ? +(l.charAt(a - 1) + 1) * parseFloat(l.substr(a + 1)) : 0;
    ~a && (l.indexOf("%") > a && (s *= u / 100), l = l.substr(0, a - 1)), l = s + (l in wf ? wf[l] * u : ~l.indexOf("%") ? parseFloat(l) * u / 100 : parseFloat(l) || 0);
  }
  return l;
}, Jc = function(l, u, a, s, f, h, d, g) {
  var v = f.startColor, p = f.endColor, _ = f.fontSize, S = f.indent, b = f.fontWeight, M = we.createElement("div"), T = Ou(a) || Ya(a, "pinType") === "fixed", O = l.indexOf("scroller") !== -1, G = T ? Te : a.tagName === "IFRAME" ? a.contentDocument.body : a, q = l.indexOf("start") !== -1, k = q ? v : p, L = "border-color:" + k + ";font-size:" + _ + ";color:" + k + ";font-weight:" + b + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return L += "position:" + ((O || g) && T ? "fixed;" : "absolute;"), (O || g || !T) && (L += (s === Tn ? Sm : bm) + ":" + (h + parseFloat(S)) + "px;"), d && (L += "box-sizing:border-box;text-align:left;width:" + d.offsetWidth + "px;"), M._isStart = q, M.setAttribute("class", "gsap-marker-" + l + (u ? " marker-" + u : "")), M.style.cssText = L, M.innerText = u || u === 0 ? l + "-" + u : l, G.children[0] ? G.insertBefore(M, G.children[0]) : G.appendChild(M), M._offset = M["offset" + s.op.d2], rf(M, 0, s, q), M;
}, rf = function(l, u, a, s) {
  var f = {
    display: "block"
  }, h = a[s ? "os2" : "p2"], d = a[s ? "p2" : "os2"];
  l._isFlipped = s, f[a.a + "Percent"] = s ? -100 : 0, f[a.a] = s ? "1px" : 0, f["border" + h + Xr] = 1, f["border" + d + Xr] = 0, f[a.p] = u + "px", Nt.set(l, f);
}, le = [], F0 = {}, vo, T1 = function() {
  return Zn() - ll > 34 && (vo || (vo = requestAnimationFrame(Wl)));
}, br = function() {
  (!li || !li.isPressed || li.startX > Te.clientWidth) && (ue.cache++, li ? vo || (vo = requestAnimationFrame(Wl)) : Wl(), ll || Cu("scrollStart"), ll = Zn());
}, T0 = function() {
  lS = ae.innerWidth, iS = ae.innerHeight;
}, Zs = function(l) {
  ue.cache++, (l === !0 || !Qn && !nS && !we.fullscreenElement && !we.webkitFullscreenElement && (!Q0 || lS !== ae.innerWidth || Math.abs(ae.innerHeight - iS) > ae.innerHeight * 0.25)) && xf.restart(!0);
}, Ru = {}, u3 = [], hS = function c() {
  return Rn($t, "scrollEnd", c) || yu(!0);
}, Cu = function(l) {
  return Ru[l] && Ru[l].map(function(u) {
    return u();
  }) || u3;
}, Ni = [], dS = function(l) {
  for (var u = 0; u < Ni.length; u += 5)
    (!l || Ni[u + 4] && Ni[u + 4].query === l) && (Ni[u].style.cssText = Ni[u + 1], Ni[u].getBBox && Ni[u].setAttribute("transform", Ni[u + 2] || ""), Ni[u + 3].uncache = 1);
}, mS = function() {
  ue.cache++, ue.forEach(function(l) {
    return Fn(l) && (l.rec = l());
  });
}, xm = function(l, u) {
  var a;
  for (ai = 0; ai < le.length; ai++)
    a = le[ai], a && (!u || a._ctx === u) && (l ? a.kill(1) : a.revert(!0, !0));
  qa = !0, u && dS(u), u || Cu("revert");
}, gS = function(l, u) {
  ue.cache++, (u || !ui) && ue.forEach(function(a) {
    return Fn(a) && a.cacheID++ && (a.rec = 0);
  }), Ui(l) && (_m = l, ae.history.scrollRestoration !== l && (ae.history.scrollRestoration = l));
}, ui, Au = 0, E1, r3 = function() {
  if (E1 !== Au) {
    var l = E1 = Au;
    requestAnimationFrame(function() {
      return l === Au && yu(!0);
    });
  }
}, pS = function() {
  Te.appendChild(Nr), ym = !li && Nr.offsetHeight || ae.innerHeight, Te.removeChild(Nr);
}, x1 = function(l) {
  return po(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(u) {
    return u.style.display = l ? "none" : "block";
  });
}, yu = function(l, u) {
  if (Hi = we.documentElement, Te = we.body, vm = [ae, we, Hi, Te], ll && !l && !qa) {
    Cn($t, "scrollEnd", hS);
    return;
  }
  pS(), ui = $t.isRefreshing = !0, qa || mS();
  var a = Cu("refreshInit");
  eS && $t.sort(), u || xm(), ue.forEach(function(s) {
    Fn(s) && (s.smooth && (s.target.style.scrollBehavior = "auto"), s(0));
  }), le.slice(0).forEach(function(s) {
    return s.refresh();
  }), qa = !1, le.forEach(function(s) {
    if (s._subPinOffset && s.pin) {
      var f = s.vars.horizontal ? "offsetWidth" : "offsetHeight", h = s.pin[f];
      s.revert(!0, 1), s.adjustPinSpacing(s.pin[f] - h), s.refresh();
    }
  }), K0 = 1, x1(!0), le.forEach(function(s) {
    var f = zl(s.scroller, s._dir), h = s.vars.end === "max" || s._endClamp && s.end > f, d = s._startClamp && s.start >= f;
    (h || d) && s.setPositions(d ? f - 1 : s.start, h ? Math.max(d ? f : s.start + 1, f) : s.end, !0);
  }), x1(!1), K0 = 0, a.forEach(function(s) {
    return s && s.render && s.render(-1);
  }), ue.forEach(function(s) {
    Fn(s) && (s.smooth && requestAnimationFrame(function() {
      return s.target.style.scrollBehavior = "smooth";
    }), s.rec && s(s.rec));
  }), gS(_m, 1), xf.pause(), Au++, ui = 2, Wl(2), le.forEach(function(s) {
    return Fn(s.vars.onRefresh) && s.vars.onRefresh(s);
  }), ui = $t.isRefreshing = !1, Cu("refresh");
}, k0 = 0, sf = 1, lo, Wl = function(l) {
  if (l === 2 || !ui && !qa) {
    $t.isUpdating = !0, lo && lo.update(0);
    var u = le.length, a = Zn(), s = a - b0 >= 50, f = u && le[0].scroll();
    if (sf = k0 > f ? -1 : 1, ui || (k0 = f), s && (ll && !Nf && a - ll > 200 && (ll = 0, Cu("scrollEnd")), Vs = b0, b0 = a), sf < 0) {
      for (ai = u; ai-- > 0; )
        le[ai] && le[ai].update(0, s);
      sf = 1;
    } else
      for (ai = 0; ai < u; ai++)
        le[ai] && le[ai].update(0, s);
    $t.isUpdating = !1;
  }
  vo = 0;
}, J0 = [oS, cS, bm, Sm, tl + io, tl + to, tl + no, tl + eo, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], of = J0.concat([Mu, wu, "boxSizing", "max" + Xr, "max" + Tm, "position", tl, _n, _n + no, _n + to, _n + io, _n + eo]), s3 = function(l, u, a) {
  Ur(a);
  var s = l._gsap;
  if (s.spacerIsNative)
    Ur(s.spacerState);
  else if (l._gsap.swappedIn) {
    var f = u.parentNode;
    f && (f.insertBefore(l, u), f.removeChild(u));
  }
  l._gsap.swappedIn = !1;
}, E0 = function(l, u, a, s) {
  if (!l._gsap.swappedIn) {
    for (var f = J0.length, h = u.style, d = l.style, g; f--; )
      g = J0[f], h[g] = a[g];
    h.position = a.position === "absolute" ? "absolute" : "relative", a.display === "inline" && (h.display = "inline-block"), d[bm] = d[Sm] = "auto", h.flexBasis = a.flexBasis || "auto", h.overflow = "visible", h.boxSizing = "border-box", h[Mu] = Mf(l, ri) + bn, h[wu] = Mf(l, Tn) + bn, h[_n] = d[tl] = d[cS] = d[oS] = "0", Ur(s), d[Mu] = d["max" + Xr] = a[Mu], d[wu] = d["max" + Tm] = a[wu], d[_n] = a[_n], l.parentNode !== u && (l.parentNode.insertBefore(u, l), u.appendChild(l)), l._gsap.swappedIn = !0;
  }
}, o3 = /([A-Z])/g, Ur = function(l) {
  if (l) {
    var u = l.t.style, a = l.length, s = 0, f, h;
    for ((l.t._gsap || Nt.core.getCache(l.t)).uncache = 1; s < a; s += 2)
      h = l[s + 1], f = l[s], h ? u[f] = h : u[f] && u.removeProperty(f.replace(o3, "-$1").toLowerCase());
  }
}, $c = function(l) {
  for (var u = of.length, a = l.style, s = [], f = 0; f < u; f++)
    s.push(of[f], a[of[f]]);
  return s.t = l, s;
}, c3 = function(l, u, a) {
  for (var s = [], f = l.length, h = a ? 8 : 0, d; h < f; h += 2)
    d = l[h], s.push(d, d in u ? u[d] : l[h + 1]);
  return s.t = l.t, s;
}, cf = {
  left: 0,
  top: 0
}, M1 = function(l, u, a, s, f, h, d, g, v, p, _, S, b, M) {
  Fn(l) && (l = l(g)), Ui(l) && l.substr(0, 3) === "max" && (l = S + (l.charAt(4) === "=" ? uf("0" + l.substr(3), a) : 0));
  var T = b ? b.time() : 0, O, G, q;
  if (b && b.seek(0), isNaN(l) || (l = +l), Qs(l))
    b && (l = Nt.utils.mapRange(b.scrollTrigger.start, b.scrollTrigger.end, 0, S, l)), d && rf(d, a, s, !0);
  else {
    Fn(u) && (u = u(g));
    var k = (l || "0").split(" "), L, D, J, C;
    q = mi(u, g) || Te, L = $l(q) || {}, (!L || !L.left && !L.top) && el(q).display === "none" && (C = q.style.display, q.style.display = "block", L = $l(q), C ? q.style.display = C : q.style.removeProperty("display")), D = uf(k[0], L[s.d]), J = uf(k[1] || "0", a), l = L[s.p] - v[s.p] - p + D + f - J, d && rf(d, J, s, a - J < 20 || d._isStart && J > 20), a -= a - J;
  }
  if (M && (g[M] = l || -1e-3, l < 0 && (l = 0)), h) {
    var F = l + a, Z = h._isStart;
    O = "scroll" + s.d2, rf(h, F, s, Z && F > 20 || !Z && (_ ? Math.max(Te[O], Hi[O]) : h.parentNode[O]) <= F + 1), _ && (v = $l(d), _ && (h.style[s.op.p] = v[s.op.p] - s.op.m - h._offset + bn));
  }
  return b && q && (O = $l(q), b.seek(S), G = $l(q), b._caScrollDist = O[s.p] - G[s.p], l = l / b._caScrollDist * S), b && b.seek(T), b ? l : Math.round(l);
}, f3 = /(webkit|moz|length|cssText|inset)/i, w1 = function(l, u, a, s) {
  if (l.parentNode !== u) {
    var f = l.style, h, d;
    if (u === Te) {
      l._stOrig = f.cssText, d = el(l);
      for (h in d)
        !+h && !f3.test(h) && d[h] && typeof f[h] == "string" && h !== "0" && (f[h] = d[h]);
      f.top = a, f.left = s;
    } else
      f.cssText = l._stOrig;
    Nt.core.getCache(l).uncache = 1, u.appendChild(l);
  }
}, vS = function(l, u, a) {
  var s = u, f = s;
  return function(h) {
    var d = Math.round(l());
    return d !== s && d !== f && Math.abs(d - s) > 3 && Math.abs(d - f) > 3 && (h = d, a && a()), f = s, s = Math.round(h), s;
  };
}, Pc = function(l, u, a) {
  var s = {};
  s[u.p] = "+=" + a, Nt.set(l, s);
}, A1 = function(l, u) {
  var a = ja(l, u), s = "_scroll" + u.p2, f = function h(d, g, v, p, _) {
    var S = h.tween, b = g.onComplete, M = {};
    v = v || a();
    var T = vS(a, v, function() {
      S.kill(), h.tween = 0;
    });
    return _ = p && _ || 0, p = p || d - v, S && S.kill(), g[s] = d, g.inherit = !1, g.modifiers = M, M[s] = function() {
      return T(v + p * S.ratio + _ * S.ratio * S.ratio);
    }, g.onUpdate = function() {
      ue.cache++, h.tween && Wl();
    }, g.onComplete = function() {
      h.tween = 0, b && b.call(S);
    }, S = h.tween = Nt.to(l, g), S;
  };
  return l[s] = a, a.wheelHandler = function() {
    return f.tween && f.tween.kill() && (f.tween = 0);
  }, Cn(l, "wheel", a.wheelHandler), $t.isTouch && Cn(l, "touchmove", a.wheelHandler), f;
}, $t = /* @__PURE__ */ (function() {
  function c(u, a) {
    Er || c.register(Nt) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), Z0(this), this.init(u, a);
  }
  var l = c.prototype;
  return l.init = function(a, s) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Gs) {
      this.update = this.refresh = this.kill = Ol;
      return;
    }
    a = S1(Ui(a) || Qs(a) || a.nodeType ? {
      trigger: a
    } : a, kc);
    var f = a, h = f.onUpdate, d = f.toggleClass, g = f.id, v = f.onToggle, p = f.onRefresh, _ = f.scrub, S = f.trigger, b = f.pin, M = f.pinSpacing, T = f.invalidateOnRefresh, O = f.anticipatePin, G = f.onScrubComplete, q = f.onSnapComplete, k = f.once, L = f.snap, D = f.pinReparent, J = f.pinSpacer, C = f.containerAnimation, F = f.fastScrollEnd, Z = f.preventOverlaps, Y = a.horizontal || a.containerAnimation && a.horizontal !== !1 ? ri : Tn, vt = !_ && _ !== 0, $ = mi(a.scroller || ae), yt = Nt.core.getCache($), gt = Ou($), tt = ("pinType" in a ? a.pinType : Ya($, "pinType") || gt && "fixed") === "fixed", V = [a.onEnter, a.onLeave, a.onEnterBack, a.onLeaveBack], P = vt && a.toggleActions.split(" "), I = "markers" in a ? a.markers : kc.markers, rt = gt ? 0 : parseFloat(el($)["border" + Y.p2 + Xr]) || 0, x = this, ft = a.onRefreshInit && function() {
      return a.onRefreshInit(x);
    }, z = e3($, gt, Y), Ht = n3($, gt), E = 0, A = 0, W = 0, j = ja($, Y), pt, dt, zt, ot, ct, wt, ut, St, xt, N, mt, Rt, _t, Mt, Gt, Ft, Ut, At, Qt, te, Xe, ye, en, En, Se, Gn, Re, xn, Ve, Dn, Jn, Yt, Jt, ee, Ce, de, Nn, Ke, Fe;
    if (x._startClamp = x._endClamp = !1, x._dir = Y, O *= 45, x.scroller = $, x.scroll = C ? C.time.bind(C) : j, ot = j(), qa && j.rec == null && (j.rec = ot), x.vars = a, s = s || a.animation, "refreshPriority" in a && (eS = 1, a.refreshPriority === -9999 && (lo = x)), yt.tweenScroll = yt.tweenScroll || {
      top: A1($, Tn),
      left: A1($, ri)
    }, x.tweenTo = pt = yt.tweenScroll[Y.p], x.scrubDuration = function(it) {
      Jt = Qs(it) && it, Jt ? Yt ? Yt.duration(it) : Yt = Nt.to(s, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Jt,
        paused: !0,
        onComplete: function() {
          return G && G(x);
        }
      }) : (Yt && Yt.progress(1).kill(), Yt = 0);
    }, s && (s.vars.lazy = !1, s._initted && !x.isReverted || s.vars.immediateRender !== !1 && a.immediateRender !== !1 && s.duration() && s.render(0, !0, !0), x.animation = s.pause(), s.scrollTrigger = x, x.scrubDuration(_), Dn = 0, g || (g = s.vars.id)), L && ((!vu(L) || L.push) && (L = {
      snapTo: L
    }), "scrollBehavior" in Te.style && Nt.set(gt ? [Te, Hi] : $, {
      scrollBehavior: "auto"
    }), ue.forEach(function(it) {
      return Fn(it) && it.target === (gt ? we.scrollingElement || Hi : $) && (it.smooth = !1);
    }), zt = Fn(L.snapTo) ? L.snapTo : L.snapTo === "labels" ? l3(s) : L.snapTo === "labelsDirectional" ? a3(s) : L.directional !== !1 ? function(it, ht) {
      return Em(L.snapTo)(it, Zn() - A < 500 ? 0 : ht.direction);
    } : Nt.utils.snap(L.snapTo), ee = L.duration || {
      min: 0.1,
      max: 2
    }, ee = vu(ee) ? Is(ee.min, ee.max) : Is(ee, ee), Ce = Nt.delayedCall(L.delay || Jt / 2 || 0.1, function() {
      var it = j(), ht = Zn() - A < 500, Et = pt.tween;
      if ((ht || Math.abs(x.getVelocity()) < 10) && !Et && !Nf && E !== it) {
        var Ot = (it - wt) / Mt, qt = s && !vt ? s.totalProgress() : Ot, Dt = ht ? 0 : (qt - Jn) / (Zn() - Vs) * 1e3 || 0, Vt = Nt.utils.clamp(-Ot, 1 - Ot, Sr(Dt / 2) * Dt / 0.185), re = Ot + (L.inertia === !1 ? 0 : Vt), Xt, Zt, Pt = L, ze = Pt.onStart, ge = Pt.onInterrupt, Ge = Pt.onComplete;
        if (Xt = zt(re, x), Qs(Xt) || (Xt = re), Zt = Math.max(0, Math.round(wt + Xt * Mt)), it <= ut && it >= wt && Zt !== it) {
          if (Et && !Et._initted && Et.data <= Sr(Zt - it))
            return;
          L.inertia === !1 && (Vt = Xt - Ot), pt(Zt, {
            duration: ee(Sr(Math.max(Sr(re - qt), Sr(Xt - qt)) * 0.185 / Dt / 0.05 || 0)),
            ease: L.ease || "power3",
            data: Sr(Zt - it),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Ce.restart(!0) && ge && yr(x, ge);
            },
            onComplete: function() {
              x.update(), E = j(), s && !vt && (Yt ? Yt.resetTo("totalProgress", Xt, s._tTime / s._tDur) : s.progress(Xt)), Dn = Jn = s && !vt ? s.totalProgress() : x.progress, q && q(x), Ge && yr(x, Ge);
            }
          }, it, Vt * Mt, Zt - it - Vt * Mt), ze && yr(x, ze, pt.tween);
        }
      } else x.isActive && E !== it && Ce.restart(!0);
    }).pause()), g && (F0[g] = x), S = x.trigger = mi(S || b !== !0 && b), Fe = S && S._gsap && S._gsap.stRevert, Fe && (Fe = Fe(x)), b = b === !0 ? S : mi(b), Ui(d) && (d = {
      targets: S,
      className: d
    }), b && (M === !1 || M === tl || (M = !M && b.parentNode && b.parentNode.style && el(b.parentNode).display === "flex" ? !1 : _n), x.pin = b, dt = Nt.core.getCache(b), dt.spacer ? Gt = dt.pinState : (J && (J = mi(J), J && !J.nodeType && (J = J.current || J.nativeElement), dt.spacerIsNative = !!J, J && (dt.spacerState = $c(J))), dt.spacer = At = J || we.createElement("div"), At.classList.add("pin-spacer"), g && At.classList.add("pin-spacer-" + g), dt.pinState = Gt = $c(b)), a.force3D !== !1 && Nt.set(b, {
      force3D: !0
    }), x.spacer = At = dt.spacer, Ve = el(b), En = Ve[M + Y.os2], te = Nt.getProperty(b), Xe = Nt.quickSetter(b, Y.a, bn), E0(b, At, Ve), Ut = $c(b)), I) {
      Rt = vu(I) ? S1(I, b1) : b1, N = Jc("scroller-start", g, $, Y, Rt, 0), mt = Jc("scroller-end", g, $, Y, Rt, 0, N), Qt = N["offset" + Y.op.d2];
      var st = mi(Ya($, "content") || $);
      St = this.markerStart = Jc("start", g, st, Y, Rt, Qt, 0, C), xt = this.markerEnd = Jc("end", g, st, Y, Rt, Qt, 0, C), C && (Ke = Nt.quickSetter([St, xt], Y.a, bn)), !tt && !(Dl.length && Ya($, "fixedMarkers") === !0) && (i3(gt ? Te : $), Nt.set([N, mt], {
        force3D: !0
      }), Gn = Nt.quickSetter(N, Y.a, bn), xn = Nt.quickSetter(mt, Y.a, bn));
    }
    if (C) {
      var lt = C.vars.onUpdate, at = C.vars.onUpdateParams;
      C.eventCallback("onUpdate", function() {
        x.update(0, 0, 1), lt && lt.apply(C, at || []);
      });
    }
    if (x.previous = function() {
      return le[le.indexOf(x) - 1];
    }, x.next = function() {
      return le[le.indexOf(x) + 1];
    }, x.revert = function(it, ht) {
      if (!ht)
        return x.kill(!0);
      var Et = it !== !1 || !x.enabled, Ot = Qn;
      Et !== x.isReverted && (Et && (de = Math.max(j(), x.scroll.rec || 0), W = x.progress, Nn = s && s.progress()), St && [St, xt, N, mt].forEach(function(qt) {
        return qt.style.display = Et ? "none" : "block";
      }), Et && (Qn = x, x.update(Et)), b && (!D || !x.isActive) && (Et ? s3(b, At, Gt) : E0(b, At, el(b), Se)), Et || x.update(Et), Qn = Ot, x.isReverted = Et);
    }, x.refresh = function(it, ht, Et, Ot) {
      if (!((Qn || !x.enabled) && !ht)) {
        if (b && it && ll) {
          Cn(c, "scrollEnd", hS);
          return;
        }
        !ui && ft && ft(x), Qn = x, pt.tween && !Et && (pt.tween.kill(), pt.tween = 0), Yt && Yt.pause(), T && s && (s.revert({
          kill: !1
        }).invalidate(), s.getChildren ? s.getChildren(!0, !0, !1).forEach(function(si) {
          return si.vars.immediateRender && si.render(0, !0, !0);
        }) : s.vars.immediateRender && s.render(0, !0, !0)), x.isReverted || x.revert(!0, !0), x._subPinOffset = !1;
        var qt = z(), Dt = Ht(), Vt = C ? C.duration() : zl($, Y), re = Mt <= 0.01 || !Mt, Xt = 0, Zt = Ot || 0, Pt = vu(Et) ? Et.end : a.end, ze = a.endTrigger || S, ge = vu(Et) ? Et.start : a.start || (a.start === 0 || !S ? 0 : b ? "0 0" : "0 100%"), Ge = x.pinnedContainer = a.pinnedContainer && mi(a.pinnedContainer, x), ke = S && Math.max(0, le.indexOf(x)) || 0, De = ke, Le, ve, Ti, ml, Je, Ye, Mn, on, je, qe, nn, Ei, al;
        for (I && vu(Et) && (Ei = Nt.getProperty(N, Y.p), al = Nt.getProperty(mt, Y.p)); De-- > 0; )
          Ye = le[De], Ye.end || Ye.refresh(0, 1) || (Qn = x), Mn = Ye.pin, Mn && (Mn === S || Mn === b || Mn === Ge) && !Ye.isReverted && (qe || (qe = []), qe.unshift(Ye), Ye.revert(!0, !0)), Ye !== le[De] && (ke--, De--);
        for (Fn(ge) && (ge = ge(x)), ge = p1(ge, "start", x), wt = M1(ge, S, qt, Y, j(), St, N, x, Dt, rt, tt, Vt, C, x._startClamp && "_startClamp") || (b ? -1e-3 : 0), Fn(Pt) && (Pt = Pt(x)), Ui(Pt) && !Pt.indexOf("+=") && (~Pt.indexOf(" ") ? Pt = (Ui(ge) ? ge.split(" ")[0] : "") + Pt : (Xt = uf(Pt.substr(2), qt), Pt = Ui(ge) ? ge : (C ? Nt.utils.mapRange(0, C.duration(), C.scrollTrigger.start, C.scrollTrigger.end, wt) : wt) + Xt, ze = S)), Pt = p1(Pt, "end", x), ut = Math.max(wt, M1(Pt || (ze ? "100% 0" : Vt), ze, qt, Y, j() + Xt, xt, mt, x, Dt, rt, tt, Vt, C, x._endClamp && "_endClamp")) || -1e-3, Xt = 0, De = ke; De--; )
          Ye = le[De] || {}, Mn = Ye.pin, Mn && Ye.start - Ye._pinPush <= wt && !C && Ye.end > 0 && (Le = Ye.end - (x._startClamp ? Math.max(0, Ye.start) : Ye.start), (Mn === S && Ye.start - Ye._pinPush < wt || Mn === Ge) && isNaN(ge) && (Xt += Le * (1 - Ye.progress)), Mn === b && (Zt += Le));
        if (wt += Xt, ut += Xt, x._startClamp && (x._startClamp += Xt), x._endClamp && !ui && (x._endClamp = ut || -1e-3, ut = Math.min(ut, zl($, Y))), Mt = ut - wt || (wt -= 0.01) && 1e-3, re && (W = Nt.utils.clamp(0, 1, Nt.utils.normalize(wt, ut, de))), x._pinPush = Zt, St && Xt && (Le = {}, Le[Y.a] = "+=" + Xt, Ge && (Le[Y.p] = "-=" + j()), Nt.set([St, xt], Le)), b && !(K0 && x.end >= zl($, Y)))
          Le = el(b), ml = Y === Tn, Ti = j(), ye = parseFloat(te(Y.a)) + Zt, !Vt && ut > 1 && (nn = (gt ? we.scrollingElement || Hi : $).style, nn = {
            style: nn,
            value: nn["overflow" + Y.a.toUpperCase()]
          }, gt && el(Te)["overflow" + Y.a.toUpperCase()] !== "scroll" && (nn.style["overflow" + Y.a.toUpperCase()] = "scroll")), E0(b, At, Le), Ut = $c(b), ve = $l(b, !0), on = tt && ja($, ml ? ri : Tn)(), M ? (Se = [M + Y.os2, Mt + Zt + bn], Se.t = At, De = M === _n ? Mf(b, Y) + Mt + Zt : 0, De && (Se.push(Y.d, De + bn), At.style.flexBasis !== "auto" && (At.style.flexBasis = De + bn)), Ur(Se), Ge && le.forEach(function(si) {
            si.pin === Ge && si.vars.pinSpacing !== !1 && (si._subPinOffset = !0);
          }), tt && j(de)) : (De = Mf(b, Y), De && At.style.flexBasis !== "auto" && (At.style.flexBasis = De + bn)), tt && (Je = {
            top: ve.top + (ml ? Ti - wt : on) + bn,
            left: ve.left + (ml ? on : Ti - wt) + bn,
            boxSizing: "border-box",
            position: "fixed"
          }, Je[Mu] = Je["max" + Xr] = Math.ceil(ve.width) + bn, Je[wu] = Je["max" + Tm] = Math.ceil(ve.height) + bn, Je[tl] = Je[tl + no] = Je[tl + to] = Je[tl + io] = Je[tl + eo] = "0", Je[_n] = Le[_n], Je[_n + no] = Le[_n + no], Je[_n + to] = Le[_n + to], Je[_n + io] = Le[_n + io], Je[_n + eo] = Le[_n + eo], Ft = c3(Gt, Je, D), ui && j(0)), s ? (je = s._initted, y0(1), s.render(s.duration(), !0, !0), en = te(Y.a) - ye + Mt + Zt, Re = Math.abs(Mt - en) > 1, tt && Re && Ft.splice(Ft.length - 2, 2), s.render(0, !0, !0), je || s.invalidate(!0), s.parent || s.totalTime(s.totalTime()), y0(0)) : en = Mt, nn && (nn.value ? nn.style["overflow" + Y.a.toUpperCase()] = nn.value : nn.style.removeProperty("overflow-" + Y.a));
        else if (S && j() && !C)
          for (ve = S.parentNode; ve && ve !== Te; )
            ve._pinOffset && (wt -= ve._pinOffset, ut -= ve._pinOffset), ve = ve.parentNode;
        qe && qe.forEach(function(si) {
          return si.revert(!1, !0);
        }), x.start = wt, x.end = ut, ot = ct = ui ? de : j(), !C && !ui && !qa && (ot < de && j(de), x.scroll.rec = 0), x.revert(!1, !0), A = Zn(), Ce && (E = -1, Ce.restart(!0)), Qn = 0, s && vt && (s._initted || Nn) && s.progress() !== Nn && s.progress(Nn || 0, !0).render(s.time(), !0, !0), (re || W !== x.progress || C || T || s && !s._initted) && (s && !vt && (s._initted || W || s.vars.immediateRender !== !1) && s.totalProgress(C && wt < -1e-3 && !W ? Nt.utils.normalize(wt, ut, 0) : W, !0), x.progress = re || (ot - wt) / Mt === W ? 0 : W), b && M && (At._pinOffset = Math.round(x.progress * en)), Yt && Yt.invalidate(), isNaN(Ei) || (Ei -= Nt.getProperty(N, Y.p), al -= Nt.getProperty(mt, Y.p), Pc(N, Y, Ei), Pc(St, Y, Ei - (Ot || 0)), Pc(mt, Y, al), Pc(xt, Y, al - (Ot || 0))), re && !ui && x.update(), p && !ui && !_t && (_t = !0, p(x), _t = !1);
      }
    }, x.getVelocity = function() {
      return (j() - ct) / (Zn() - Vs) * 1e3 || 0;
    }, x.endAnimation = function() {
      Us(x.callbackAnimation), s && (Yt ? Yt.progress(1) : s.paused() ? vt || Us(s, x.direction < 0, 1) : Us(s, s.reversed()));
    }, x.labelToScroll = function(it) {
      return s && s.labels && (wt || x.refresh() || wt) + s.labels[it] / s.duration() * Mt || 0;
    }, x.getTrailing = function(it) {
      var ht = le.indexOf(x), Et = x.direction > 0 ? le.slice(0, ht).reverse() : le.slice(ht + 1);
      return (Ui(it) ? Et.filter(function(Ot) {
        return Ot.vars.preventOverlaps === it;
      }) : Et).filter(function(Ot) {
        return x.direction > 0 ? Ot.end <= wt : Ot.start >= ut;
      });
    }, x.update = function(it, ht, Et) {
      if (!(C && !Et && !it)) {
        var Ot = ui === !0 ? de : x.scroll(), qt = it ? 0 : (Ot - wt) / Mt, Dt = qt < 0 ? 0 : qt > 1 ? 1 : qt || 0, Vt = x.progress, re, Xt, Zt, Pt, ze, ge, Ge, ke;
        if (ht && (ct = ot, ot = C ? j() : Ot, L && (Jn = Dn, Dn = s && !vt ? s.totalProgress() : Dt)), O && b && !Qn && !Qc && ll && (!Dt && wt < Ot + (Ot - ct) / (Zn() - Vs) * O ? Dt = 1e-4 : Dt === 1 && ut > Ot + (Ot - ct) / (Zn() - Vs) * O && (Dt = 0.9999)), Dt !== Vt && x.enabled) {
          if (re = x.isActive = !!Dt && Dt < 1, Xt = !!Vt && Vt < 1, ge = re !== Xt, ze = ge || !!Dt != !!Vt, x.direction = Dt > Vt ? 1 : -1, x.progress = Dt, ze && !Qn && (Zt = Dt && !Vt ? 0 : Dt === 1 ? 1 : Vt === 1 ? 2 : 3, vt && (Pt = !ge && P[Zt + 1] !== "none" && P[Zt + 1] || P[Zt], ke = s && (Pt === "complete" || Pt === "reset" || Pt in s))), Z && (ge || ke) && (ke || _ || !s) && (Fn(Z) ? Z(x) : x.getTrailing(Z).forEach(function(Ti) {
            return Ti.endAnimation();
          })), vt || (Yt && !Qn && !Qc ? (Yt._dp._time - Yt._start !== Yt._time && Yt.render(Yt._dp._time - Yt._start), Yt.resetTo ? Yt.resetTo("totalProgress", Dt, s._tTime / s._tDur) : (Yt.vars.totalProgress = Dt, Yt.invalidate().restart())) : s && s.totalProgress(Dt, !!(Qn && (A || it)))), b) {
            if (it && M && (At.style[M + Y.os2] = En), !tt)
              Xe(js(ye + en * Dt));
            else if (ze) {
              if (Ge = !it && Dt > Vt && ut + 1 > Ot && Ot + 1 >= zl($, Y), D)
                if (!it && (re || Ge)) {
                  var De = $l(b, !0), Le = Ot - wt;
                  w1(b, Te, De.top + (Y === Tn ? Le : 0) + bn, De.left + (Y === Tn ? 0 : Le) + bn);
                } else
                  w1(b, At);
              Ur(re || Ge ? Ft : Ut), Re && Dt < 1 && re || Xe(ye + (Dt === 1 && !Ge ? en : 0));
            }
          }
          L && !pt.tween && !Qn && !Qc && Ce.restart(!0), d && (ge || k && Dt && (Dt < 1 || !S0)) && po(d.targets).forEach(function(Ti) {
            return Ti.classList[re || k ? "add" : "remove"](d.className);
          }), h && !vt && !it && h(x), ze && !Qn ? (vt && (ke && (Pt === "complete" ? s.pause().totalProgress(1) : Pt === "reset" ? s.restart(!0).pause() : Pt === "restart" ? s.restart(!0) : s[Pt]()), h && h(x)), (ge || !S0) && (v && ge && yr(x, v), V[Zt] && yr(x, V[Zt]), k && (Dt === 1 ? x.kill(!1, 1) : V[Zt] = 0), ge || (Zt = Dt === 1 ? 1 : 3, V[Zt] && yr(x, V[Zt]))), F && !re && Math.abs(x.getVelocity()) > (Qs(F) ? F : 2500) && (Us(x.callbackAnimation), Yt ? Yt.progress(1) : Us(s, Pt === "reverse" ? 1 : !Dt, 1))) : vt && h && !Qn && h(x);
        }
        if (xn) {
          var ve = C ? Ot / C.duration() * (C._caScrollDist || 0) : Ot;
          Gn(ve + (N._isFlipped ? 1 : 0)), xn(ve);
        }
        Ke && Ke(-Ot / C.duration() * (C._caScrollDist || 0));
      }
    }, x.enable = function(it, ht) {
      x.enabled || (x.enabled = !0, Cn($, "resize", Zs), gt || Cn($, "scroll", br), ft && Cn(c, "refreshInit", ft), it !== !1 && (x.progress = W = 0, ot = ct = E = j()), ht !== !1 && x.refresh());
    }, x.getTween = function(it) {
      return it && pt ? pt.tween : Yt;
    }, x.setPositions = function(it, ht, Et, Ot) {
      if (C) {
        var qt = C.scrollTrigger, Dt = C.duration(), Vt = qt.end - qt.start;
        it = qt.start + Vt * it / Dt, ht = qt.start + Vt * ht / Dt;
      }
      x.refresh(!1, !1, {
        start: v1(it, Et && !!x._startClamp),
        end: v1(ht, Et && !!x._endClamp)
      }, Ot), x.update();
    }, x.adjustPinSpacing = function(it) {
      if (Se && it) {
        var ht = Se.indexOf(Y.d) + 1;
        Se[ht] = parseFloat(Se[ht]) + it + bn, Se[1] = parseFloat(Se[1]) + it + bn, Ur(Se);
      }
    }, x.disable = function(it, ht) {
      if (it !== !1 && x.revert(!0, !0), x.enabled && (x.enabled = x.isActive = !1, ht || Yt && Yt.pause(), de = 0, dt && (dt.uncache = 1), ft && Rn(c, "refreshInit", ft), Ce && (Ce.pause(), pt.tween && pt.tween.kill() && (pt.tween = 0)), !gt)) {
        for (var Et = le.length; Et--; )
          if (le[Et].scroller === $ && le[Et] !== x)
            return;
        Rn($, "resize", Zs), gt || Rn($, "scroll", br);
      }
    }, x.kill = function(it, ht) {
      x.disable(it, ht), Yt && !ht && Yt.kill(), g && delete F0[g];
      var Et = le.indexOf(x);
      Et >= 0 && le.splice(Et, 1), Et === ai && sf > 0 && ai--, Et = 0, le.forEach(function(Ot) {
        return Ot.scroller === x.scroller && (Et = 1);
      }), Et || ui || qa || (x.scroll.rec = 0), s && (s.scrollTrigger = null, it && s.revert({
        kill: !1
      }), ht || s.kill()), St && [St, xt, N, mt].forEach(function(Ot) {
        return Ot.parentNode && Ot.parentNode.removeChild(Ot);
      }), lo === x && (lo = 0), b && (dt && (dt.uncache = 1), Et = 0, le.forEach(function(Ot) {
        return Ot.pin === b && Et++;
      }), Et || (dt.spacer = 0)), a.onKill && a.onKill(x);
    }, le.push(x), x.enable(!1, !1), Fe && Fe(x), s && s.add && !Mt) {
      var Tt = x.update;
      x.update = function() {
        x.update = Tt, ue.cache++, wt || ut || x.refresh();
      }, Nt.delayedCall(0.01, x.update), Mt = 0.01, wt = ut = 0;
    } else
      x.refresh();
    b && r3();
  }, c.register = function(a) {
    return Er || (Nt = a || uS(), aS() && window.document && c.enable(), Er = Gs), Er;
  }, c.defaults = function(a) {
    if (a)
      for (var s in a)
        kc[s] = a[s];
    return kc;
  }, c.disable = function(a, s) {
    Gs = 0, le.forEach(function(h) {
      return h[s ? "kill" : "disable"](a);
    }), Rn(ae, "wheel", br), Rn(we, "scroll", br), clearInterval(jc), Rn(we, "touchcancel", Ol), Rn(Te, "touchstart", Ol), Kc(Rn, we, "pointerdown,touchstart,mousedown", _1), Kc(Rn, we, "pointerup,touchend,mouseup", y1), xf.kill(), Zc(Rn);
    for (var f = 0; f < ue.length; f += 3)
      Fc(Rn, ue[f], ue[f + 1]), Fc(Rn, ue[f], ue[f + 2]);
  }, c.enable = function() {
    if (ae = window, we = document, Hi = we.documentElement, Te = we.body, Nt) {
      if (po = Nt.utils.toArray, Is = Nt.utils.clamp, Z0 = Nt.core.context || Ol, y0 = Nt.core.suppressOverwrites || Ol, _m = ae.history.scrollRestoration || "auto", k0 = ae.pageYOffset || 0, Nt.core.globals("ScrollTrigger", c), Te) {
        Gs = 1, Nr = document.createElement("div"), Nr.style.height = "100vh", Nr.style.position = "absolute", pS(), t3(), dn.register(Nt), c.isTouch = dn.isTouch, Ra = dn.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Q0 = dn.isTouch === 1, Cn(ae, "wheel", br), vm = [ae, we, Hi, Te], Nt.matchMedia ? (c.matchMedia = function(p) {
          var _ = Nt.matchMedia(), S;
          for (S in p)
            _.add(S, p[S]);
          return _;
        }, Nt.addEventListener("matchMediaInit", function() {
          mS(), xm();
        }), Nt.addEventListener("matchMediaRevert", function() {
          return dS();
        }), Nt.addEventListener("matchMedia", function() {
          yu(0, 1), Cu("matchMedia");
        }), Nt.matchMedia().add("(orientation: portrait)", function() {
          return T0(), T0;
        })) : console.warn("Requires GSAP 3.11.0 or later"), T0(), Cn(we, "scroll", br);
        var a = Te.hasAttribute("style"), s = Te.style, f = s.borderTopStyle, h = Nt.core.Animation.prototype, d, g;
        for (h.revert || Object.defineProperty(h, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), s.borderTopStyle = "solid", d = $l(Te), Tn.m = Math.round(d.top + Tn.sc()) || 0, ri.m = Math.round(d.left + ri.sc()) || 0, f ? s.borderTopStyle = f : s.removeProperty("border-top-style"), a || (Te.setAttribute("style", ""), Te.removeAttribute("style")), jc = setInterval(T1, 250), Nt.delayedCall(0.5, function() {
          return Qc = 0;
        }), Cn(we, "touchcancel", Ol), Cn(Te, "touchstart", Ol), Kc(Cn, we, "pointerdown,touchstart,mousedown", _1), Kc(Cn, we, "pointerup,touchend,mouseup", y1), j0 = Nt.utils.checkPrefix("transform"), of.push(j0), Er = Zn(), xf = Nt.delayedCall(0.2, yu).pause(), xr = [we, "visibilitychange", function() {
          var p = ae.innerWidth, _ = ae.innerHeight;
          we.hidden ? (m1 = p, g1 = _) : (m1 !== p || g1 !== _) && Zs();
        }, we, "DOMContentLoaded", yu, ae, "load", yu, ae, "resize", Zs], Zc(Cn), le.forEach(function(p) {
          return p.enable(0, 1);
        }), g = 0; g < ue.length; g += 3)
          Fc(Rn, ue[g], ue[g + 1]), Fc(Rn, ue[g], ue[g + 2]);
      } else if (we) {
        var v = function p() {
          c.enable(), we.removeEventListener("DOMContentLoaded", p);
        };
        we.addEventListener("DOMContentLoaded", v);
      }
    }
  }, c.config = function(a) {
    "limitCallbacks" in a && (S0 = !!a.limitCallbacks);
    var s = a.syncInterval;
    s && clearInterval(jc) || (jc = s) && setInterval(T1, s), "ignoreMobileResize" in a && (Q0 = c.isTouch === 1 && a.ignoreMobileResize), "autoRefreshEvents" in a && (Zc(Rn) || Zc(Cn, a.autoRefreshEvents || "none"), nS = (a.autoRefreshEvents + "").indexOf("resize") === -1);
  }, c.scrollerProxy = function(a, s) {
    var f = mi(a), h = ue.indexOf(f), d = Ou(f);
    ~h && ue.splice(h, d ? 6 : 2), s && (d ? Dl.unshift(ae, s, Te, s, Hi, s) : Dl.unshift(f, s));
  }, c.clearMatchMedia = function(a) {
    le.forEach(function(s) {
      return s._ctx && s._ctx.query === a && s._ctx.kill(!0, !0);
    });
  }, c.isInViewport = function(a, s, f) {
    var h = (Ui(a) ? mi(a) : a).getBoundingClientRect(), d = h[f ? Mu : wu] * s || 0;
    return f ? h.right - d > 0 && h.left + d < ae.innerWidth : h.bottom - d > 0 && h.top + d < ae.innerHeight;
  }, c.positionInViewport = function(a, s, f) {
    Ui(a) && (a = mi(a));
    var h = a.getBoundingClientRect(), d = h[f ? Mu : wu], g = s == null ? d / 2 : s in wf ? wf[s] * d : ~s.indexOf("%") ? parseFloat(s) * d / 100 : parseFloat(s) || 0;
    return f ? (h.left + g) / ae.innerWidth : (h.top + g) / ae.innerHeight;
  }, c.killAll = function(a) {
    if (le.slice(0).forEach(function(f) {
      return f.vars.id !== "ScrollSmoother" && f.kill();
    }), a !== !0) {
      var s = Ru.killAll || [];
      Ru = {}, s.forEach(function(f) {
        return f();
      });
    }
  }, c;
})();
$t.version = "3.15.1";
$t.saveStyles = function(c) {
  return c ? po(c).forEach(function(l) {
    if (l && l.style) {
      var u = Ni.indexOf(l);
      u >= 0 && Ni.splice(u, 5), Ni.push(l, l.style.cssText, l.getBBox && l.getAttribute("transform"), Nt.core.getCache(l), Z0());
    }
  }) : Ni;
};
$t.revert = function(c, l) {
  return xm(!c, l);
};
$t.create = function(c, l) {
  return new $t(c, l);
};
$t.refresh = function(c) {
  return c ? Zs(!0) : (Er || $t.register()) && yu(!0);
};
$t.update = function(c) {
  return ++ue.cache && Wl(c === !0 ? 2 : 0);
};
$t.clearScrollMemory = gS;
$t.maxScroll = function(c, l) {
  return zl(c, l ? ri : Tn);
};
$t.getScrollFunc = function(c, l) {
  return ja(mi(c), l ? ri : Tn);
};
$t.getById = function(c) {
  return F0[c];
};
$t.getAll = function() {
  return le.filter(function(c) {
    return c.vars.id !== "ScrollSmoother";
  });
};
$t.isScrolling = function() {
  return !!ll;
};
$t.snapDirectional = Em;
$t.addEventListener = function(c, l) {
  var u = Ru[c] || (Ru[c] = []);
  ~u.indexOf(l) || u.push(l);
};
$t.removeEventListener = function(c, l) {
  var u = Ru[c], a = u && u.indexOf(l);
  a >= 0 && u.splice(a, 1);
};
$t.batch = function(c, l) {
  var u = [], a = {}, s = l.interval || 0.016, f = l.batchMax || 1e9, h = function(v, p) {
    var _ = [], S = [], b = Nt.delayedCall(s, function() {
      p(_, S), _ = [], S = [];
    }).pause();
    return function(M) {
      _.length || b.restart(!0), _.push(M.trigger), S.push(M), f <= _.length && b.progress(1);
    };
  }, d;
  for (d in l)
    a[d] = d.substr(0, 2) === "on" && Fn(l[d]) && d !== "onRefreshInit" ? h(d, l[d]) : l[d];
  return Fn(f) && (f = f(), Cn($t, "refresh", function() {
    return f = l.batchMax();
  })), po(c).forEach(function(g) {
    var v = {};
    for (d in a)
      v[d] = a[d];
    v.trigger = g, u.push($t.create(v));
  }), u;
};
var O1 = function(l, u, a, s) {
  return u > s ? l(s) : u < 0 && l(0), a > s ? (s - u) / (a - u) : a < 0 ? u / (u - a) : 1;
}, x0 = function c(l, u) {
  u === !0 ? l.style.removeProperty("touch-action") : l.style.touchAction = u === !0 ? "auto" : u ? "pan-" + u + (dn.isTouch ? " pinch-zoom" : "") : "none", l === Hi && c(Te, u);
}, Wc = {
  auto: 1,
  scroll: 1
}, h3 = function(l) {
  var u = l.event, a = l.target, s = l.axis, f = (u.changedTouches ? u.changedTouches[0] : u).target, h = f._gsap || Nt.core.getCache(f), d = Zn(), g;
  if (!h._isScrollT || d - h._isScrollT > 2e3) {
    for (; f && f !== Te && (f.scrollHeight <= f.clientHeight && f.scrollWidth <= f.clientWidth || !(Wc[(g = el(f)).overflowY] || Wc[g.overflowX])); )
      f = f.parentNode;
    h._isScroll = f && f !== a && !Ou(f) && (Wc[(g = el(f)).overflowY] || Wc[g.overflowX]), h._isScrollT = d;
  }
  (h._isScroll || s === "x") && (u.stopPropagation(), u._gsapAllow = !0);
}, _S = function(l, u, a, s) {
  return dn.create({
    target: l,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: u,
    onWheel: s = s && h3,
    onPress: s,
    onDrag: s,
    onScroll: s,
    onEnable: function() {
      return a && Cn(we, dn.eventTypes[0], C1, !1, !0);
    },
    onDisable: function() {
      return Rn(we, dn.eventTypes[0], C1, !0);
    }
  });
}, d3 = /(input|label|select|textarea)/i, R1, C1 = function(l) {
  var u = d3.test(l.target.tagName);
  (u || R1) && (l._gsapAllow = !0, R1 = u);
}, m3 = function(l) {
  vu(l) || (l = {}), l.preventDefault = l.isNormalizer = l.allowClicks = !0, l.type || (l.type = "wheel,touch"), l.debounce = !!l.debounce, l.id = l.id || "normalizer";
  var u = l, a = u.normalizeScrollX, s = u.momentum, f = u.allowNestedScroll, h = u.onRelease, d, g, v = mi(l.target) || Hi, p = Nt.core.globals().ScrollSmoother, _ = p && p.get(), S = Ra && (l.content && mi(l.content) || _ && l.content !== !1 && !_.smooth() && _.content()), b = ja(v, Tn), M = ja(v, ri), T = 1, O = (dn.isTouch && ae.visualViewport ? ae.visualViewport.scale * ae.visualViewport.width : ae.outerWidth) / ae.innerWidth, G = 0, q = Fn(s) ? function() {
    return s(d);
  } : function() {
    return s || 2.8;
  }, k, L, D = _S(v, l.type, !0, f), J = function() {
    return L = !1;
  }, C = Ol, F = Ol, Z = function() {
    g = zl(v, Tn), F = Is(Ra ? 1 : 0, g), a && (C = Is(0, zl(v, ri))), k = Au;
  }, Y = function() {
    S._gsap.y = js(parseFloat(S._gsap.y) + b.offset) + "px", S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(S._gsap.y) + ", 0, 1)", b.offset = b.cacheID = 0;
  }, vt = function() {
    if (L) {
      requestAnimationFrame(J);
      var I = js(d.deltaY / 2), rt = F(b.v - I);
      if (S && rt !== b.v + b.offset) {
        b.offset = rt - b.v;
        var x = js((parseFloat(S && S._gsap.y) || 0) - b.offset);
        S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + x + ", 0, 1)", S._gsap.y = x + "px", b.cacheID = ue.cache, Wl();
      }
      return !0;
    }
    b.offset && Y(), L = !0;
  }, $, yt, gt, tt, V = function() {
    Z(), $.isActive() && $.vars.scrollY > g && (b() > g ? $.progress(1) && b(g) : $.resetTo("scrollY", g));
  };
  return S && Nt.set(S, {
    y: "+=0"
  }), l.ignoreCheck = function(P) {
    return Ra && P.type === "touchmove" && vt() || T > 1.05 && P.type !== "touchstart" || d.isGesturing || P.touches && P.touches.length > 1;
  }, l.onPress = function() {
    L = !1;
    var P = T;
    T = js((ae.visualViewport && ae.visualViewport.scale || 1) / O), $.pause(), P !== T && x0(v, T > 1.01 ? !0 : a ? !1 : "x"), yt = M(), gt = b(), Z(), k = Au;
  }, l.onRelease = l.onGestureStart = function(P, I) {
    if (b.offset && Y(), !I)
      tt.restart(!0);
    else {
      ue.cache++;
      var rt = q(), x, ft;
      a && (x = M(), ft = x + rt * 0.05 * -P.velocityX / 0.227, rt *= O1(M, x, ft, zl(v, ri)), $.vars.scrollX = C(ft)), x = b(), ft = x + rt * 0.05 * -P.velocityY / 0.227, rt *= O1(b, x, ft, zl(v, Tn)), $.vars.scrollY = F(ft), $.invalidate().duration(rt).play(0.01), (Ra && $.vars.scrollY >= g || x >= g - 1) && Nt.to({}, {
        onUpdate: V,
        duration: rt
      });
    }
    h && h(P);
  }, l.onWheel = function() {
    $._ts && $.pause(), Zn() - G > 1e3 && (k = 0, G = Zn());
  }, l.onChange = function(P, I, rt, x, ft) {
    if (Au !== k && Z(), I && a && M(C(x[2] === I ? yt + (P.startX - P.x) : M() + I - x[1])), rt) {
      b.offset && Y();
      var z = ft[2] === rt, Ht = z ? gt + P.startY - P.y : b() + rt - ft[1], E = F(Ht);
      z && Ht !== E && (gt += E - Ht), b(E);
    }
    (rt || I) && Wl();
  }, l.onEnable = function() {
    x0(v, a ? !1 : "x"), $t.addEventListener("refresh", V), Cn(ae, "resize", V), b.smooth && (b.target.style.scrollBehavior = "auto", b.smooth = M.smooth = !1), D.enable();
  }, l.onDisable = function() {
    x0(v, !0), Rn(ae, "resize", V), $t.removeEventListener("refresh", V), D.kill();
  }, l.lockAxis = l.lockAxis !== !1, d = new dn(l), d.iOS = Ra, Ra && !b() && b(1), Ra && Nt.ticker.add(Ol), tt = d._dc, $ = Nt.to(d, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: a ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: vS(b, b(), function() {
        return $.pause();
      })
    },
    onUpdate: Wl,
    onComplete: tt.vars.onComplete
  }), d;
};
$t.sort = function(c) {
  if (Fn(c))
    return le.sort(c);
  var l = ae.pageYOffset || 0;
  return $t.getAll().forEach(function(u) {
    return u._sortY = u.trigger ? l + u.trigger.getBoundingClientRect().top : u.start + ae.innerHeight;
  }), le.sort(c || function(u, a) {
    return (u.vars.refreshPriority || 0) * -1e6 + (u.vars.containerAnimation ? 1e6 : u._sortY) - ((a.vars.containerAnimation ? 1e6 : a._sortY) + (a.vars.refreshPriority || 0) * -1e6);
  });
};
$t.observe = function(c) {
  return new dn(c);
};
$t.normalizeScroll = function(c) {
  if (typeof c > "u")
    return li;
  if (c === !0 && li)
    return li.enable();
  if (c === !1) {
    li && li.kill(), li = c;
    return;
  }
  var l = c instanceof dn ? c : m3(c);
  return li && li.target === l.target && li.kill(), Ou(l.target) && (li = l), l;
};
$t.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: G0,
  _inputObserver: _S,
  _scrollers: ue,
  _proxies: Dl,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ll || Cu("scrollStart"), ll = Zn();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Qn;
    }
  }
};
uS() && Nt.registerPlugin($t);
let Bs, Hs, z1 = typeof Symbol == "function" ? /* @__PURE__ */ Symbol() : "_split", $0, g3 = () => $0 || Mm.register(window.gsap), D1 = typeof Intl < "u" && "Segmenter" in Intl ? new Intl.Segmenter() : 0, _o = (c) => c ? typeof c == "string" ? _o(document.querySelectorAll(c)) : "length" in c ? Array.from(c).reduce((l, u) => (typeof u == "string" ? l.push(..._o(u)) : l.push(u), l), []) : [c] : [], N1 = (c) => _o(c).filter((l) => l && l.nodeType === 1), ff = [], M0 = function() {
}, p3 = { add: (c) => c() }, v3 = /\s+/g, U1 = new RegExp("\\p{RI}\\p{RI}|\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?(\\u{200D}\\p{Emoji}(\\p{EMod}|\\u{FE0F}\\u{20E3}?|[\\u{E0020}-\\u{E007E}]+\\u{E007F})?)*|.", "gu"), Af = { left: 0, top: 0, width: 0, height: 0 }, _3 = (c, l) => {
  for (; ++l < c.length && c[l] === Af; )
    ;
  return c[l] || Af;
}, B1 = ({ element: c, html: l, ariaL: u, ariaH: a }) => {
  c.innerHTML = l, u ? c.setAttribute("aria-label", u) : c.removeAttribute("aria-label"), a ? c.setAttribute("aria-hidden", a) : c.removeAttribute("aria-hidden");
}, H1 = (c, l) => {
  if (l) {
    let u = new Set(c.join("").match(l) || ff), a = c.length, s, f, h, d;
    if (u.size)
      for (; --a > -1; ) {
        f = c[a];
        for (h of u)
          if (h.startsWith(f) && h.length > f.length) {
            for (s = 0, d = f; h.startsWith(d += c[a + ++s]) && d.length < h.length; )
              ;
            if (s && d.length === h.length) {
              c[a] = h, c.splice(a + 1, s);
              break;
            }
          }
      }
  }
  return c;
}, L1 = (c) => window.getComputedStyle(c).display === "inline" && (c.style.display = "inline-block"), Tr = (c, l, u) => l.insertBefore(typeof c == "string" ? document.createTextNode(c) : c, u), P0 = (c, l, u) => {
  let a = l[c + "sClass"] || "", { tag: s = "div", aria: f = "auto", propIndex: h = !1 } = l, d = c === "line" ? "block" : "inline-block", g = a.indexOf("++") > -1, v = (p) => {
    let _ = document.createElement(s), S = u.length + 1;
    return a && (_.className = a + (g ? " " + a + S : "")), h && _.style.setProperty("--" + c, S + ""), f !== "none" && _.setAttribute("aria-hidden", "true"), s !== "span" && (_.style.position = "relative", _.style.display = d), _.textContent = p, u.push(_), _;
  };
  return g && (a = a.replace("++", "")), v.collection = u, v;
}, y3 = (c, l, u, a) => {
  let s = P0("line", u, a), f = window.getComputedStyle(c).textAlign || "left";
  return (h, d) => {
    let g = s("");
    for (g.style.textAlign = f, c.insertBefore(g, l[h]); h < d; h++)
      g.appendChild(l[h]);
    g.normalize();
  };
}, yS = (c, l, u, a, s, f, h, d, g, v) => {
  var p;
  let _ = Array.from(c.childNodes), S = 0, { wordDelimiter: b, reduceWhiteSpace: M = !0, prepareText: T } = l, O = c.getBoundingClientRect(), G = O, q = !M && window.getComputedStyle(c).whiteSpace.substring(0, 3) === "pre", k = f && v && window.getComputedStyle(c).direction === "rtl", L = 0, D = u.collection, J, C, F, Z, Y, vt, $, yt, gt, tt, V, P, I, rt, x, ft, z, Ht;
  for (typeof b == "object" ? (F = b.delimiter || b, C = b.replaceWith || "") : C = b === "" ? "" : b || " ", J = C !== " "; S < _.length; S++)
    if (Z = _[S], Z.nodeType === 3) {
      for (x = Z.textContent || "", M ? x = x.replace(v3, " ") : q && (x = x.replace(/\n/g, C + `
`)), T && (x = T(x, c)), Z.textContent = x, Y = C || F ? x.split(F || C) : x.match(d) || ff, z = Y[Y.length - 1], yt = J ? z.slice(-1) === " " : !z, z || Y.pop(), G = O, $ = J ? Y[0].charAt(0) === " " : !Y[0], $ && Tr(" ", c, Z), Y[0] || Y.shift(), H1(Y, g), f && v || (Z.textContent = ""), gt = 1; gt <= Y.length; gt++)
        if (ft = Y[gt - 1], !M && q && ft.charAt(0) === `
` && ((p = Z.previousSibling) == null || p.remove(), Tr(document.createElement("br"), c, Z), ft = ft.slice(1)), !M && ft === "")
          Tr(C, c, Z);
        else if (ft === " ")
          c.insertBefore(document.createTextNode(" "), Z);
        else {
          if (J && ft.charAt(0) === " " && Tr(" ", c, Z), L && gt === 1 && !$ && D.indexOf(L.parentNode) > -1 ? (vt = D[D.length - 1], vt.appendChild(document.createTextNode(a ? "" : ft))) : (vt = u(a ? "" : ft), Tr(vt, c, Z), L && gt === 1 && !$ && vt.insertBefore(L, vt.firstChild)), a) {
            if (V = D1 ? H1([...D1.segment(ft)].map((E) => E.segment), g) : ft.match(d) || ff, g) {
              let E = ft.match(g);
              E && E.some((A) => V.indexOf(A) < 0) && (V = ft.match(d) || ff);
            }
            for (Ht = 0; Ht < V.length; Ht++)
              vt.appendChild(V[Ht] === " " ? document.createTextNode(" ") : a(V[Ht]));
          }
          if (f && v) {
            if (x = Z.textContent = x.substring(ft.length + 1, x.length), tt = vt.getBoundingClientRect(), tt.top > G.top && (k ? tt.left >= G.left : tt.left <= G.left)) {
              for (P = c.cloneNode(), I = c.childNodes[0]; I && I !== vt; )
                rt = I, I = I.nextSibling, P.appendChild(rt);
              c.parentNode.insertBefore(P, c), s && L1(P);
            }
            G = tt;
          }
          (gt < Y.length || yt) && Tr(gt >= Y.length ? " " : J && ft.slice(-1) === " " ? " " + C : C, c, Z);
        }
      c.removeChild(Z), L = 0;
    } else Z.nodeType === 1 && (h && h.indexOf(Z) > -1 ? (D.indexOf(Z.previousSibling) > -1 && D[D.length - 1].appendChild(Z), L = Z) : (yS(Z, l, u, a, s, f, h, d, g, !0), L = 0), s && L1(Z));
};
const SS = class bS {
  constructor(l, u) {
    this.isSplit = !1, g3(), this.elements = N1(l), this.chars = [], this.words = [], this.lines = [], this.masks = [], this.vars = u, this.elements.forEach((f) => {
      var h;
      u.overwrite !== !1 && ((h = f[z1]) == null || h._data.orig.filter(({ element: d }) => d === f).forEach(B1)), f[z1] = this;
    }), this._split = () => this.isSplit && this.split(this.vars);
    let a = [], s = () => {
      let f = a.length, h;
      for (; f--; ) {
        h = a[f];
        let d = h.element.offsetWidth;
        if (d !== h.width) {
          h.width = d, this._split();
          return;
        }
      }
    };
    this._data = { orig: a, obs: typeof ResizeObserver < "u" && new ResizeObserver(() => {
      clearTimeout(this._data.t), this._data.t = setTimeout(s, 200);
    }) }, M0(this), this.split(u);
  }
  split(l) {
    return (this._ctx || p3).add(() => {
      this.isSplit && this.revert(), this.vars = l = l || this.vars || {};
      let { type: u = "chars,words,lines", aria: a = "auto", deepSlice: s = !0, smartWrap: f, onSplit: h, autoSplit: d = !1, specialChars: g, mask: v } = this.vars, p = u.indexOf("lines") > -1, _ = u.indexOf("chars") > -1, S = u.indexOf("words") > -1, b = _ && !S && !p, M = g && ("push" in g ? new RegExp("(?:" + g.join("|") + ")", "gu") : g), T = M ? new RegExp(M.source + "|" + U1.source, "gu") : U1, O = !!l.ignore && N1(l.ignore), { orig: G, animTime: q, obs: k } = this._data, L;
      (_ || S || p) && (this.elements.forEach((D, J) => {
        G[J] = {
          element: D,
          html: D.innerHTML,
          ariaL: D.getAttribute("aria-label"),
          ariaH: D.getAttribute("aria-hidden")
        }, a === "auto" ? D.setAttribute("aria-label", (D.textContent || "").trim()) : a === "hidden" && D.setAttribute("aria-hidden", "true");
        let C = [], F = [], Z = [], Y = _ ? P0("char", l, C) : null, vt = P0("word", l, F), $, yt, gt, tt;
        if (yS(D, l, vt, Y, b, s && (p || b), O, T, M, !1), p) {
          let V = _o(D.childNodes), P = y3(D, V, l, Z), I, rt = [], x = 0, ft = window.getComputedStyle(D).direction === "rtl", z = V.map((A) => A.nodeType === 1 ? A.getBoundingClientRect() : Af), Ht = Af, E;
          for ($ = 0; $ < V.length; $++)
            I = V[$], I.nodeType === 1 && (I.nodeName === "BR" ? ((!$ || V[$ - 1].nodeName !== "BR") && (rt.push(I), P(x, $ + 1)), x = $ + 1, Ht = _3(z, $)) : (E = z[$], $ && E.top > Ht.top && (ft ? E.left + E.width > Ht.left + 1 : E.left < Ht.left + Ht.width - 1) && (P(x, $), x = $), Ht = E));
          x < $ && P(x, $), rt.forEach((A) => {
            var W;
            return (W = A.parentNode) == null ? void 0 : W.removeChild(A);
          });
        }
        if (!S) {
          for ($ = 0; $ < F.length; $++)
            if (yt = F[$], _ || !yt.nextSibling || yt.nextSibling.nodeType !== 3)
              if (f && !p) {
                for (gt = document.createElement("span"), gt.style.whiteSpace = "nowrap"; yt.firstChild; )
                  gt.appendChild(yt.firstChild);
                yt.replaceWith(gt);
              } else
                yt.replaceWith(...yt.childNodes);
            else
              tt = yt.nextSibling, tt && tt.nodeType === 3 && (tt.textContent = (yt.textContent || "") + (tt.textContent || ""), yt.remove());
          F.length = 0, D.normalize();
        }
        this.lines.push(...Z), this.words.push(...F), this.chars.push(...C);
      }), v && this[v] && this.masks.push(...this[v].map((D) => {
        let J = D.cloneNode();
        return D.replaceWith(J), J.appendChild(D), D.className && (J.className = D.className.trim().split(" ").map((C) => C + "-mask").join(" ")), J.style.overflow = "clip", J.style.verticalAlign = "top", J;
      }))), this.isSplit = !0, Hs && p && d && Hs.addEventListener("loadingdone", this._split), (L = h && h(this)) && L.totalTime && (this._data.anim = q ? L.totalTime(q) : L), p && d && this.elements.forEach((D, J) => {
        G[J].width = D.offsetWidth, k && k.observe(D);
      });
    }), this;
  }
  kill() {
    let { obs: l, t: u } = this._data;
    l && l.disconnect(), clearTimeout(u), Hs?.removeEventListener("loadingdone", this._split);
  }
  revert() {
    var l, u;
    if (this.isSplit) {
      let { orig: a, anim: s } = this._data;
      this.kill(), a.forEach(B1), this.chars.length = this.words.length = this.lines.length = a.length = this.masks.length = 0, this.isSplit = !1, s && (this._data.animTime = s.totalTime(), s.revert()), (u = (l = this.vars).onRevert) == null || u.call(l, this);
    }
    return this;
  }
  static create(l, u) {
    return new bS(l, u);
  }
  static register(l) {
    Bs = Bs || l || window.gsap, Bs && (_o = Bs.utils.toArray, M0 = Bs.core.context || M0), !$0 && window.innerWidth > 0 && (Hs = document.fonts, $0 = !0);
  }
};
SS.version = "3.15.1";
let Mm = SS;
let Y1 = typeof document < "u" ? Kt.useLayoutEffect : Kt.useEffect, q1 = (c) => c && !Array.isArray(c) && typeof c == "object", Ic = [], S3 = {}, TS = Ie;
const Uf = (c, l = Ic) => {
  let u = S3;
  q1(c) ? (u = c, c = null, l = "dependencies" in u ? u.dependencies : Ic) : q1(l) && (u = l, l = "dependencies" in u ? u.dependencies : Ic), c && typeof c != "function" && console.warn("First parameter must be a function or config object");
  const { scope: a, revertOnUpdate: s } = u, f = Kt.useRef(!1), h = Kt.useRef(TS.context(() => {
  }, a)), d = Kt.useRef((v) => h.current.add(null, v)), g = l && l.length && !s;
  return g && Y1(() => (f.current = !0, () => h.current.revert()), Ic), Y1(() => {
    if (c && h.current.add(c, a), !g || !f.current)
      return () => h.current.revert();
  }, l), { context: h.current, contextSafe: d.current };
};
Uf.register = (c) => {
  TS = c;
};
Uf.headless = !0;
Ie.registerPlugin($t, Mm, Uf);
const ES = { opacity: 0, y: 40 }, xS = { opacity: 1, y: 0 }, b3 = 180, T3 = 19, E3 = 0.024, x3 = typeof window < "u" ? Kt.useLayoutEffect : Kt.useEffect, X1 = () => typeof document < "u" && (!document.fonts || document.fonts.status === "loaded"), M3 = (c) => 1 - Math.cos(c * Math.PI * 1.5) * Math.pow(1 - c, 1.2), w3 = (c, l) => {
  switch (c) {
    case "fade":
      return { from: { opacity: 0 }, to: { opacity: 1 }, ease: "power2.inOut" };
    case "blur":
      return {
        from: { opacity: 0, filter: `blur(${Math.round(l * 1.4) / 10}px)` },
        to: { opacity: 1, filter: "blur(0px)" },
        ease: "power2.out"
      };
    case "flip": {
      const u = { transformPerspective: l * 6, transformOrigin: "50% 100%" };
      return {
        from: { ...u, opacity: 0, rotationX: -90 },
        to: { ...u, opacity: 1, rotationX: 0 },
        ease: "power3.out"
      };
    }
    case "pop":
      return { from: { opacity: 0, scale: 0 }, to: { opacity: 1, scale: 1 }, ease: "back.out(1.6)" };
    case "skew":
      return {
        from: { transformOrigin: "50% 100%", opacity: 0, x: -l * 0.4, skewX: -24 },
        to: { transformOrigin: "50% 100%", opacity: 1, x: 0, skewX: 0 },
        ease: "expo.out"
      };
    case "wave":
      return { from: { opacity: 0, y: l * 0.45 }, to: { opacity: 1, y: 0 }, ease: M3 };
    default:
      return { from: { ...ES }, to: { ...xS }, ease: "power3.out" };
  }
}, V1 = ({
  text: c,
  className: l = "",
  delay: u = 50,
  duration: a = 1.25,
  ease: s,
  splitType: f = "chars",
  from: h,
  to: d,
  threshold: g = 0.1,
  rootMargin: v = "-100px",
  textAlign: p = "center",
  tag: _ = "p",
  staggerFrom: S = "start",
  mask: b = !1,
  effect: M = "rise",
  trigger: T = "view",
  loop: O = !1,
  loopDelay: G = 1.5,
  hoverEffect: q = "none",
  color: k,
  accentColor: L,
  onLetterAnimationComplete: D
}) => {
  const J = Kt.useRef(null), C = Kt.useRef(null), F = Kt.useRef(D), Z = Kt.useRef({ trigger: T, hoverEffect: q, accentColor: L }), [Y, vt] = Kt.useState(X1), [$, yt] = Kt.useState(!1);
  x3(() => {
    F.current = D, Z.current = { trigger: T, hoverEffect: q, accentColor: L };
  }), Kt.useEffect(() => {
    if (Y) return;
    let V = !0;
    return document.fonts.ready.then(() => {
      V && vt(!0);
    }), () => {
      V = !1;
    };
  }, [Y]), Uf(
    () => {
      const V = J.current;
      if (!V || !c || !Y) return;
      if (V.getBoundingClientRect(), !X1()) {
        vt(!1);
        return;
      }
      const P = () => {
        C.current !== c && (C.current = c, F.current?.());
      };
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
        yt(!0), P();
        return;
      }
      const I = (1 - g) * 100, rt = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(v), x = rt ? parseFloat(rt[1]) : 0, ft = rt && rt[2] || "px", z = x === 0 ? "" : x < 0 ? `-=${Math.abs(x)}${ft}` : `+=${x}${ft}`, Ht = `top ${I}%${z}`, E = f.includes("chars") ? "chars" : f.includes("words") ? "words" : "lines", A = parseFloat(getComputedStyle(V).fontSize) || 16, W = h !== void 0 || d !== void 0, j = w3(M, A), pt = W ? { ...h || ES } : j.from, dt = W ? { ...d || xS } : j.to, zt = s || (W ? "power3.out" : j.ease), ot = W ? "willChange" : "transform,filter,willChange", ct = Math.max(0.35, a * 0.55);
      let wt = [], ut = [], St = Ie.utils.distribute({ each: u / 1e3, from: S }), xt = C.current === c, N = null, mt = null, Rt = null, _t = 0, Mt = 0, Gt = null;
      const Ft = A * 0.2, Ut = [], At = [], Qt = { x: 0, y: 0, inside: !1 }, te = (Jt, ee) => {
        const Ce = Z.current.accentColor, de = Ie.timeline(ee);
        return de.fromTo(
          wt,
          { ...pt, willChange: "transform, opacity" },
          { ...dt, duration: a, ease: zt, stagger: St, immediateRender: Jt },
          0
        ), Ce && de.fromTo(
          wt,
          { color: Ce },
          {
            color: getComputedStyle(V).color,
            duration: a * 0.7,
            ease: "power1.inOut",
            stagger: St,
            immediateRender: Jt
          },
          a * 0.3
        ), de.set(wt, { clearProps: Ce ? `${ot},color` : ot }), de;
      }, Xe = () => {
        const Jt = Z.current.accentColor, ee = Ie.timeline();
        return ee.fromTo(
          wt,
          { ...dt, willChange: "transform, opacity" },
          { ...pt, duration: ct, ease: "power2.in", stagger: St, immediateRender: !1 },
          0
        ), Jt && ee.to(wt, { color: Jt, duration: ct, ease: "power1.in", stagger: St }, 0), ee;
      }, ye = () => {
        mt || !xt || !wt.length || (Rt?.kill(), Rt = null, mt = Ie.timeline({
          onComplete: () => {
            mt = null, en();
          }
        }).add(Xe(), 0).add(te(!1), ct));
      }, en = () => {
        Rt?.kill(), Rt = O ? Ie.delayedCall(G, ye) : null;
      }, En = () => {
        const Jt = V.getBoundingClientRect();
        Gt = ut.map((ee, Ce) => {
          const de = ee.getBoundingClientRect();
          return {
            x: de.left + de.width / 2 - Jt.left,
            y: de.top + de.height / 2 - Jt.top - (Ut[Ce]?.y || 0)
          };
        });
      }, Se = (Jt) => {
        _t = 0;
        const ee = Math.min(0.032, Math.max(1e-3, (Jt - Mt) / 1e3));
        Mt = Jt;
        const Ce = Z.current.hoverEffect === "lift" && Qt.inside && xt ? Gt : null, de = A * 1.15;
        let Nn = !1;
        for (let Ke = At.length - 1; Ke >= 0; Ke--) {
          if (Jt < At[Ke].at) continue;
          const Fe = Ut[At[Ke].index];
          Fe && (Fe.v -= At[Ke].velocity), At.splice(Ke, 1);
        }
        ut.forEach((Ke, Fe) => {
          const st = Ut[Fe] || (Ut[Fe] = { y: 0, v: 0 }), lt = Ce?.[Fe];
          let at = 0;
          if (lt) {
            const Tt = (lt.x - Qt.x) / de, it = (lt.y - Qt.y) / (de * 1.4);
            at = -Ft * Math.exp(-(Tt * Tt + it * it) * 0.5);
          }
          st.v += (b3 * (at - st.y) - T3 * st.v) * ee, st.y += st.v * ee, Math.abs(at - st.y) < 0.02 && Math.abs(st.v) < 0.05 ? (st.y = at, st.v = 0) : Nn = !0, Ke.style.translate = Math.abs(st.y) > 0.01 ? `0 ${st.y.toFixed(2)}px` : "";
        }), (Nn || At.length) && (_t = requestAnimationFrame(Se));
      }, Gn = () => {
        _t || (Mt = performance.now(), _t = requestAnimationFrame(Se));
      }, Re = (Jt) => {
        const ee = V.getBoundingClientRect();
        Qt.x = Jt.clientX - ee.left, Qt.y = Jt.clientY - ee.top;
      }, xn = (Jt) => {
        if (Re(Jt), Qt.inside = !0, !xt) return;
        const ee = Z.current;
        if (ee.trigger === "hover" && ye(), ee.hoverEffect !== "none") {
          if (En(), ee.hoverEffect === "wave") {
            const Ce = performance.now(), de = A * 9, Nn = A * 0.16 / E3;
            Gt.forEach((Ke, Fe) => {
              At.push({ index: Fe, velocity: Nn, at: Ce + Math.abs(Ke.x - Qt.x) / de * 1e3 });
            });
          }
          Gn();
        }
      }, Ve = (Jt) => {
        Re(Jt), Qt.inside = !0, !(!xt || Z.current.hoverEffect !== "lift") && (Gt || En(), Gn());
      }, Dn = () => {
        Qt.inside = !1, Gn();
      }, Jn = () => {
        Z.current.trigger === "click" && ye();
      }, Yt = new Mm(V, {
        type: f,
        smartWrap: !0,
        autoSplit: f === "lines",
        mask: b ? E : void 0,
        linesClass: "split-line",
        wordsClass: "split-word",
        charsClass: "split-char",
        reduceWhiteSpace: !1,
        onSplit: (Jt) => {
          if (wt = [Jt[E], Jt.chars, Jt.words, Jt.lines].find((ee) => ee.length) || [], ut = b && Jt.masks?.length === wt.length ? Jt.masks : wt, St = Ie.utils.distribute({ each: u / 1e3, from: S }), Gt = null, Ut.length = 0, At.length = 0, mt && mt !== N && (mt.kill(), mt = null), !xt)
            return N = te(!0, {
              scrollTrigger: T === "load" ? void 0 : { trigger: V, start: Ht, once: !0, fastScrollEnd: !0, anticipatePin: 0.4 },
              onComplete: () => {
                xt = !0, N = null, mt = null, P(), en();
              }
            }), mt = N, N;
        }
      });
      return yt(!0), xt && en(), V.addEventListener("pointerenter", xn), V.addEventListener("pointermove", Ve), V.addEventListener("pointerleave", Dn), V.addEventListener("click", Jn), () => {
        cancelAnimationFrame(_t), Rt?.kill(), mt?.kill(), V.removeEventListener("pointerenter", xn), V.removeEventListener("pointermove", Ve), V.removeEventListener("pointerleave", Dn), V.removeEventListener("click", Jn), ut.forEach((Jt) => {
          Jt.style.translate = "";
        }), $t.getAll().forEach((Jt) => {
          Jt.trigger === V && Jt.kill();
        }), Yt.revert();
      };
    },
    {
      dependencies: [
        c,
        u,
        a,
        s,
        f,
        JSON.stringify(h),
        JSON.stringify(d),
        g,
        v,
        S,
        b,
        M,
        T,
        O,
        G,
        Y
      ],
      scope: J,
      revertOnUpdate: !0
    }
  );
  const gt = _ || "p", tt = q === "none" && (h !== void 0 || d !== void 0 || M === "rise" || M === "fade");
  return /* @__PURE__ */ ie.jsx(
    gt,
    {
      ref: J,
      className: `split-parent ${l}`,
      style: {
        textAlign: p,
        overflow: tt ? "hidden" : "visible",
        display: "inline-block",
        whiteSpace: "normal",
        wordWrap: "break-word",
        color: k,
        cursor: T === "click" ? "pointer" : void 0,
        visibility: $ ? void 0 : "hidden"
      },
      children: c
    },
    c
  );
}, G1 = {
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
}, A3 = ["circle", "beam"], O3 = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, Ks = (c, l, u) => Math.min(u, Math.max(l, c)), j1 = (c, l) => {
  const u = Ks(l, 0, 1), a = (1 - u) ** 1.5 * 0.85, s = (h, d) => `color-mix(in srgb, ${c} ${(h * 100).toFixed(2)}%, transparent) ${(d * 100).toFixed(2)}%`, f = [s(1, 0)];
  for (let h = 0; h <= 14; h++) {
    const d = a + (1 - a) * h / 14, g = (d - a) / (1 - a), v = 1 - g * g * (3 - 2 * g), p = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    f.push(s(v + (p - v) * u, d));
  }
  return f.join(", ");
}, R3 = ({
  children: c,
  className: l = "",
  style: u,
  spotlightColor: a,
  intensity: s = 0.15,
  spotlightSize: f = 240,
  softness: h = 0.7,
  shape: d = "circle",
  borderGlow: g = 0.6,
  proximity: v = 80,
  smoothing: p = 0.3,
  ambient: _ = !1,
  flare: S = !0,
  grain: b = 0,
  theme: M = "dark",
  ...T
}) => {
  const O = Kt.useRef(null), G = Kt.useRef(null), q = Kt.useRef(null), k = Kt.useRef(null), L = Kt.useRef(null), D = G1[M] ?? G1.dark, J = a ?? D.light, F = {
    shape: A3.includes(d) ? d : "circle",
    fill: j1(J, h),
    edge: j1(J, 1),
    size: Math.max(20, f),
    intensity: Ks(s, 0, 1) * D.fill,
    borderGlow: Ks(g, 0, 1) * D.edge,
    proximity: Math.max(0, v),
    smoothing: Ks(p, 0, 1),
    ambient: _,
    flare: S,
    grain: Ks(b, 0, 1)
  }, Z = Kt.useRef(F);
  return Z.current = F, Kt.useEffect(() => {
    L.current?.();
  }), Kt.useEffect(() => {
    const Y = O.current, vt = G.current, $ = q.current, yt = k.current;
    if (!Y || !vt || !$ || !yt) return;
    const gt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, tt = { x: 0, y: 0, presence: 0, flare: 0, time: Math.random() * 60, pressed: !1, visible: !0 }, V = { x: 0, y: 0, active: !1 }, P = { light: "", edge: "", noise: "" };
    let I = null, rt = 0, x = 0, ft = !0;
    const z = (ut, St, xt, N, mt) => {
      if (ut.shape === "beam") {
        const Rt = Math.max(St * 0.6, N + St * 0.55);
        return `radial-gradient(${(St * 0.55).toFixed(1)}px ${Rt.toFixed(1)}px at ${xt.toFixed(1)}px 0px, ${mt})`;
      }
      return `radial-gradient(circle ${St.toFixed(1)}px at ${xt.toFixed(1)}px ${N.toFixed(1)}px, ${mt})`;
    }, Ht = (ut) => {
      const St = ut.size * (1 + 0.2 * tt.flare), xt = 1 + 0.7 * tt.flare, N = z(ut, St, tt.x, tt.y, ut.fill), mt = z(ut, St * 0.6, tt.x, ut.shape === "beam" ? 0 : tt.y, ut.edge);
      N !== P.light && (P.light = N, vt.style.background = N), mt !== P.edge && (P.edge = mt, yt.style.background = mt), vt.style.opacity = String(Math.min(1, tt.presence * ut.intensity * xt)), yt.style.opacity = String(Math.min(1, tt.presence * ut.borderGlow * xt));
      const Rt = ut.grain > 0 ? z(ut, St, tt.x, tt.y, "#000 0%, transparent 100%") : "none";
      Rt !== P.noise && (P.noise = Rt, $.style.webkitMaskImage = Rt, $.style.maskImage = Rt), $.style.opacity = String(tt.presence * ut.grain);
    }, E = (ut) => {
      if (rt = 0, !ft) return;
      const St = Z.current, xt = Math.min(0.05, Math.max(1e-3, (ut - x) / 1e3));
      x = ut;
      const N = Y.getBoundingClientRect();
      let mt = tt.x, Rt = tt.y, _t = 0;
      if (I && Y.contains(I)) {
        const Qt = I.getBoundingClientRect();
        mt = Qt.left + Qt.width / 2 - N.left, Rt = Qt.top + Qt.height / 2 - N.top, _t = 1;
      } else if (V.active) {
        mt = V.x - N.left, Rt = V.y - N.top;
        const Qt = Math.hypot(Math.max(0, -mt, mt - N.width), Math.max(0, -Rt, Rt - N.height));
        Qt === 0 ? _t = 1 : St.proximity > 0 && (_t = Math.max(0, 1 - Qt / St.proximity) ** 2);
      }
      if (_t < 0.6 && St.ambient && tt.visible) {
        gt || (tt.time += xt);
        const Qt = 0.6 - _t;
        mt += (N.width * (0.5 + 0.34 * Math.sin(tt.time * 0.43)) - mt) * (Qt / 0.6), Rt += (N.height * (0.5 + 0.3 * Math.sin(tt.time * 0.61 + 1.3)) - Rt) * (Qt / 0.6), _t = 0.6;
      }
      tt.presence < 0.02 && _t > 0 && !St.ambient && (tt.x = mt, tt.y = Rt);
      const Mt = gt || St.smoothing === 0 ? 1 : 1 - Math.exp(-xt / (0.015 + St.smoothing * 0.22));
      tt.x += (mt - tt.x) * Mt, tt.y += (Rt - tt.y) * Mt;
      const Gt = gt ? 1 : 1 - Math.exp(-xt / (_t > tt.presence ? 0.1 : 0.32));
      tt.presence += (_t - tt.presence) * Gt, Math.abs(_t - tt.presence) < 2e-3 && (tt.presence = _t);
      const Ft = tt.pressed && St.flare && !gt ? 1 : 0;
      tt.flare += (Ft - tt.flare) * (1 - Math.exp(-xt / (Ft ? 0.05 : 0.28))), Math.abs(Ft - tt.flare) < 2e-3 && (tt.flare = Ft), Ht(St), (!(!(Math.abs(mt - tt.x) > 0.1 || Math.abs(Rt - tt.y) > 0.1) && tt.presence === _t && tt.flare === Ft) || St.ambient && tt.visible && !gt) && (rt = requestAnimationFrame(E));
    }, A = () => {
      rt || !ft || (x = performance.now(), rt = requestAnimationFrame(E));
    };
    L.current = A;
    const W = (ut) => {
      V.x = ut.clientX, V.y = ut.clientY, V.active = !0, (tt.presence > 0 || Z.current.proximity > 0 || Y.contains(ut.target)) && A();
    }, j = (ut) => {
      ut.relatedTarget || (V.active = !1, A());
    }, pt = (ut) => {
      V.x = ut.clientX, V.y = ut.clientY, V.active = !0, tt.pressed = !0, A();
    }, dt = (ut) => {
      ut.pointerType !== "mouse" && (V.active = !1), !(!tt.pressed && ut.pointerType === "mouse") && (tt.pressed = !1, A());
    }, zt = (ut) => {
      !(ut.target instanceof Element) || !ut.target.matches(":focus-visible") || (I = ut.target, A());
    }, ot = (ut) => {
      Y.contains(ut.relatedTarget) || (I = null, A());
    }, ct = () => {
      (V.active || tt.presence > 0) && A();
    }, wt = new IntersectionObserver((ut) => {
      tt.visible = ut.some((St) => St.isIntersecting), tt.visible && A();
    });
    return wt.observe(Y), window.addEventListener("pointermove", W), window.addEventListener("pointerup", dt), window.addEventListener("pointercancel", dt), window.addEventListener("scroll", ct, { capture: !0, passive: !0 }), document.addEventListener("pointerout", j), Y.addEventListener("pointerdown", pt), Y.addEventListener("focusin", zt), Y.addEventListener("focusout", ot), A(), () => {
      ft = !1, cancelAnimationFrame(rt), wt.disconnect(), window.removeEventListener("pointermove", W), window.removeEventListener("pointerup", dt), window.removeEventListener("pointercancel", dt), window.removeEventListener("scroll", ct, { capture: !0 }), document.removeEventListener("pointerout", j), Y.removeEventListener("pointerdown", pt), Y.removeEventListener("focusin", zt), Y.removeEventListener("focusout", ot), L.current = null;
    };
  }, []), /* @__PURE__ */ ie.jsxs(
    "div",
    {
      ref: O,
      className: `spotlight-card${l ? ` ${l}` : ""}`,
      style: {
        "--spotlight-card-surface": D.surface,
        "--spotlight-card-border": D.border,
        "--spotlight-card-shadow": D.shadow,
        ...u
      },
      ...T,
      children: [
        /* @__PURE__ */ ie.jsx("span", { ref: G, className: "spotlight-card__light", "aria-hidden": "true" }),
        /* @__PURE__ */ ie.jsx("span", { ref: q, className: "spotlight-card__grain", style: { backgroundImage: O3 }, "aria-hidden": "true" }),
        c,
        /* @__PURE__ */ ie.jsx("span", { className: "spotlight-card__border", "aria-hidden": "true" }),
        /* @__PURE__ */ ie.jsx("span", { ref: k, className: "spotlight-card__edge", "aria-hidden": "true" })
      ]
    }
  );
};
Ie.registerPlugin($t);
const C3 = typeof window < "u" ? Kt.useLayoutEffect : Kt.useEffect, z3 = "http://www.w3.org/2000/svg", D3 = ["dissolve", "mist", "pixel"], N3 = Array.from({ length: 33 }, (c, l) => 1 / (1 + Math.exp(-10.8 * (l / 32 - 0.5))));
let U3 = 0;
const Ls = (c) => typeof c == "number" && c > 10 ? c / 1e3 : c, hf = (c) => Math.min(Math.max(c, 0), 1), B3 = (c, l, u) => {
  const a = hf((u - c) / (l - c));
  return a * a * (3 - 2 * a);
}, H3 = (c, l) => {
  if (c === "mist")
    return { frequency: Math.min(Math.max(4 / l, 4e-3), 0.02), octaves: 3, edge: 0.35, blur: 10, block: 0 };
  if (c === "pixel") {
    const u = 2 * Math.round(Math.min(Math.max(l / 32, 6), 24) / 2);
    return { frequency: 0.5 / u, octaves: 1, edge: 0.06, blur: 0, block: u };
  }
  return { frequency: 0.6, octaves: 1, edge: 0.15, blur: 0, block: 0 };
}, L3 = (c, l, u, a) => {
  const s = c.getBoundingClientRect(), { frequency: f, octaves: h, edge: d, blur: g, block: v } = H3(l, Math.sqrt(Math.max(s.width * s.height, 1))), p = (D, J, C) => {
    const F = document.createElementNS(z3, D);
    return Object.entries(J).forEach(([Z, Y]) => F.setAttribute(Z, String(Y))), C.appendChild(F), F;
  }, _ = p("svg", { width: 0, height: 0, "aria-hidden": "true" }, document.body);
  _.style.cssText = "position:absolute;width:0;height:0;overflow:hidden;pointer-events:none";
  const S = `fade-content-mask-${U3 += 1}`, b = p(
    "filter",
    { id: S, x: "-10%", y: "-10%", width: "120%", height: "120%", "color-interpolation-filters": "sRGB" },
    _
  );
  p(
    "feTurbulence",
    {
      type: "fractalNoise",
      baseFrequency: f,
      numOctaves: h,
      seed: Math.floor(Math.random() * 1e3),
      result: "noise"
    },
    b
  );
  let M = "noise";
  if (v > 0) {
    const D = v / 2 - 1;
    p(
      "feColorMatrix",
      { in: "noise", type: "matrix", values: "1 0 0 0 0 1 0 0 0 0 1 0 0 0 0 0 0 0 0 1", result: "gray" },
      b
    ), p("feFlood", { x: D, y: D, width: 2, height: 2, "flood-color": "#000", result: "dot" }, b), p("feComposite", { in: "dot", in2: "dot", width: v, height: v, result: "cell" }, b), p("feTile", { in: "cell", result: "grid" }, b), p("feComposite", { in: "gray", in2: "grid", operator: "in", result: "samples" }, b), p("feMorphology", { in: "samples", operator: "dilate", radius: D, result: "blocks" }, b), M = "blocks";
  }
  p(
    "feColorMatrix",
    { in: M, type: "matrix", values: "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.43 0 0 0 -0.21" },
    b
  );
  const T = p("feFuncA", { type: "table" }, p("feComponentTransfer", { result: "mask" }, b));
  p("feComposite", { in: "SourceGraphic", in2: "mask", operator: "in" }, b);
  const O = `url(#${S})`, G = g + a, q = { progress: 0 };
  let k = -1;
  const L = () => {
    const D = q.progress;
    if (D === k) return;
    if (k = D, D >= 1) {
      c.style.filter = "", c.style.visibility = "inherit";
      return;
    }
    const J = D * (1 + 2 * d) - d;
    T.setAttribute(
      "tableValues",
      N3.map((C) => (u + (1 - u) * (1 - B3(J - d, J + d, C))).toFixed(3)).join(
        " "
      )
    ), c.style.filter = G > 0 ? `${O} blur(${(G * (1 - D)).toFixed(2)}px)` : O, c.style.visibility = D <= 0 && u <= 0 ? "hidden" : "inherit";
  };
  return L(), {
    state: q,
    render: L,
    remove: () => {
      _.remove(), c.style.filter = "";
    }
  };
}, Y3 = (c, l, u) => {
  const a = (s) => `blur(${s}px)`;
  return c === "focus" ? [
    { from: { autoAlpha: u }, to: { autoAlpha: 1 }, share: 0.6 },
    { from: { filter: a(12 + l), scale: 0.97 }, to: { filter: a(0), scale: 1 }, share: 1 }
  ] : c === "develop" ? [
    { from: { autoAlpha: u }, to: { autoAlpha: 1 }, share: 0.5 },
    {
      from: { filter: `grayscale(1) contrast(0.55) brightness(1.3) ${a(l)}` },
      to: { filter: `grayscale(0) contrast(1) brightness(1) ${a(0)}` },
      share: 1
    }
  ] : l > 0 ? [
    { from: { autoAlpha: u, filter: a(l) }, to: { autoAlpha: 1, filter: a(0) }, share: 1 }
  ] : [{ from: { autoAlpha: u }, to: { autoAlpha: 1 }, share: 1 }];
}, q3 = ({
  children: c,
  container: l,
  effect: u = "fade",
  blur: a = !1,
  duration: s = 1,
  ease: f = "power2.out",
  delay: h = 0,
  threshold: d = 0.1,
  initialOpacity: g = 0,
  stagger: v = 0,
  staggerFrom: p = "start",
  trigger: _ = "scroll",
  once: S = !0,
  exit: b = !1,
  scrub: M = !1,
  disappearAfter: T = 0,
  disappearDuration: O = 0.5,
  disappearEase: G = "power2.in",
  onStart: q,
  onComplete: k,
  onDisappearanceComplete: L,
  className: D = "",
  style: J,
  ...C
}) => {
  const F = Kt.useRef(null), Z = Kt.useRef({ onStart: q, onComplete: k, onDisappearanceComplete: L });
  return Z.current = { onStart: q, onComplete: k, onDisappearanceComplete: L }, C3(() => {
    const Y = F.current;
    if (!Y) return;
    const vt = l || document.getElementById("snap-main-container") || null, $ = typeof vt == "string" ? document.querySelector(vt) : vt, yt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1;
    let gt = [], tt = null;
    const V = Ie.context(() => {
      const P = v > 0 && Y.children.length ? Array.from(Y.children) : [Y];
      if (Ie.set(Y, { visibility: "visible" }), yt) {
        Z.current.onComplete?.();
        return;
      }
      const I = Math.max(Ls(s) || 0, 0.01), rt = a === !0 ? 10 : Math.max(Number(a) || 0, 0), x = hf(Number(g) || 0), ft = v > 0 ? { stagger: { each: Ls(v), from: p } } : {}, z = D3.includes(u), Ht = z ? [] : Y3(u, rt, x);
      z && (gt = P.map((ut) => L3(ut, u, x, rt)));
      const E = gt.map((ut) => ut.state), A = () => gt.forEach((ut) => ut.render()), W = (ut, St) => {
        if (z) {
          ut.fromTo(
            E,
            { progress: 0 },
            { progress: 1, duration: I, ease: f, ...ft, onUpdate: A },
            St
          );
          return;
        }
        Ht.forEach(
          (xt) => ut.fromTo(
            P,
            xt.from,
            { ...xt.to, duration: I * xt.share, ease: f, ...ft },
            St
          )
        );
      }, j = (ut, St) => {
        if (z) {
          ut.to(E, { progress: 0, ...St, onUpdate: A }, 0);
          return;
        }
        Ht.forEach((xt) => ut.to(P, { ...xt.from, ...St }, 0));
      }, pt = () => {
        if (z) {
          gt.forEach((ut) => ut.remove()), gt = [];
          return;
        }
        Ie.set(P, { clearProps: "filter,transform" });
      }, dt = M && _ !== "mount", zt = !S || b, ot = T > 0 && !zt && !dt, ct = Ie.timeline({
        paused: !0,
        onStart: () => Z.current.onStart?.(),
        onComplete: () => {
          if (Z.current.onComplete?.(), !dt) {
            if (ot) {
              const ut = Ie.timeline({
                delay: Ls(T),
                onComplete: () => Z.current.onDisappearanceComplete?.()
              });
              j(ut, {
                duration: Math.max(Ls(O) || 0, 0.01),
                ease: G,
                ...ft
              });
              return;
            }
            (!zt || !z) && pt();
          }
        }
      });
      if (W(ct, dt ? 0 : Math.max(Ls(h) || 0, 0)), _ === "mount") {
        ct.play();
        return;
      }
      const wt = () => {
        const ut = $ ? $.getBoundingClientRect() : { top: 0, height: window.innerHeight }, St = $ ? $.scrollTop : window.scrollY, xt = Y.getBoundingClientRect();
        return {
          height: ut.height,
          scrolled: St,
          limit: $ ? $.scrollHeight - $.clientHeight : document.documentElement.scrollHeight - window.innerHeight,
          top: xt.top - ut.top + St,
          bottom: xt.bottom - ut.top + St
        };
      };
      if (dt) {
        const ut = M === !0 ? 0 : Math.max(Number(M) || 0, 0), St = () => {
          const { height: xt, scrolled: N, limit: mt, top: Rt, bottom: _t } = wt(), Mt = xt * Math.min(Math.max((1 - 2 * d) * 0.4, 0.05), 0.4), Gt = Math.min(Rt - xt * (1 - d) + Mt, mt);
          let Ft = hf((N - Gt) / Mt + 1);
          if (b) {
            const Ut = Math.max(_t - xt * d - Mt, 0), At = Math.max(_t - xt * d, Ut + Mt / 2);
            Ft = Math.min(Ft, 1 - hf((N - Ut) / (At - Ut)));
          }
          Ft = Math.round(Ft * 1e3) / 1e3, ut > 0 ? tt = Ie.to(ct, { progress: Ft, duration: ut, ease: "power3.out", overwrite: !0 }) : ct.progress(Ft);
        };
        $t.create({
          trigger: Y,
          scroller: $,
          start: "top bottom",
          end: "bottom top",
          onUpdate: St,
          onRefresh: St
        }), St();
        return;
      }
      $t.create({
        trigger: Y,
        scroller: $,
        start: () => {
          const { height: ut, limit: St, top: xt } = wt(), N = xt - ut * (1 - d);
          return N > St ? St - 1 : N;
        },
        end: b ? `bottom ${d * 100}%` : void 0,
        once: !zt,
        onEnter: () => ct.play(),
        onLeave: b ? () => ct.reverse() : void 0,
        onEnterBack: b ? () => ct.play() : void 0,
        onLeaveBack: S ? void 0 : () => ct.reverse()
      });
    }, Y);
    return () => {
      tt?.kill(), V.revert(), gt.forEach((P) => P.remove());
    };
  }, [
    l,
    u,
    a,
    s,
    f,
    h,
    d,
    g,
    v,
    p,
    _,
    S,
    b,
    M,
    T,
    O,
    G
  ]), /* @__PURE__ */ ie.jsx("div", { ref: F, className: D, style: { visibility: "hidden", ...J }, ...C, children: c });
}, tf = {
  linear: (c) => c,
  "ease-in": (c) => c * c,
  "ease-out": (c) => 1 - Math.pow(1 - c, 3),
  "ease-in-out": (c) => c < 0.5 ? 4 * c * c * c : 1 - Math.pow(-2 * c + 2, 3) / 2,
  spring: (c) => 1 + 2.4 * Math.pow(c - 1, 3) + 1.4 * Math.pow(c - 1, 2)
}, X3 = ["line", "streak", "dot", "star"], V3 = 32, G3 = 500, Q1 = 320, Ca = (c, l, u) => Math.min(u, Math.max(l, c)), j3 = (c, l, u) => {
  const a = Ca((u - c) / (l - c), 0, 1);
  return a * a * (3 - 2 * a);
}, Q3 = (c) => {
  const l = (Array.isArray(c) ? c : [c]).filter(Boolean);
  return l.length ? l : ["#ffffff"];
}, Z3 = (c, l, u, a, s) => {
  const f = a * 0.16;
  c.beginPath(), c.moveTo(l + Math.cos(s) * a, u + Math.sin(s) * a);
  for (let h = 1; h <= 4; h++) {
    const d = s + h * Math.PI / 2, g = d - Math.PI / 4;
    c.quadraticCurveTo(
      l + Math.cos(g) * f,
      u + Math.sin(g) * f,
      l + Math.cos(d) * a,
      u + Math.sin(d) * a
    );
  }
  c.closePath();
}, K3 = (c, l) => {
  c.fillStyle = l;
  const u = String(c.fillStyle), a = /^#([0-9a-f]{6})$/i.exec(u);
  if (a) {
    const f = parseInt(a[1], 16);
    return [f >> 16 & 255, f >> 8 & 255, f & 255];
  }
  const s = /^rgba?\(([^)]+)\)$/i.exec(u);
  return s ? s[1].split(",").slice(0, 3).map((f) => parseFloat(f)) : [0, 0, 0];
}, MS = Kt.forwardRef(
  ({
    sparkColor: c = "#fff",
    sparkSize: l = 14,
    sparkRadius: u = 30,
    sparkCount: a = 8,
    sparkWidth: s = 2,
    duration: f = 500,
    easing: h = "ease-out",
    extraScale: d = 1,
    shape: g = "line",
    randomness: v = 0.2,
    gravity: p = 0,
    spread: _ = 360,
    direction: S = 0,
    glow: b = 0,
    ring: M = !1,
    layer: T = "front",
    disabled: O = !1,
    className: G = "",
    style: q,
    children: k
  }, L) => {
    const D = Kt.useRef(null), J = Kt.useRef(null), C = Kt.useRef(null), F = {
      colors: Q3(c),
      size: Math.max(0, l),
      radius: Math.max(0, u) * Math.max(0, d),
      count: Ca(Math.round(a), 1, 64),
      width: Math.max(0.5, s),
      duration: Math.max(60, f),
      ease: tf[h] ?? tf["ease-out"],
      shape: X3.includes(g) ? g : "line",
      randomness: Ca(v, 0, 1),
      gravity: Math.max(0, p),
      spread: Ca(_, 0, 360),
      direction: S,
      glow: Ca(b, 0, 1),
      ring: M,
      disabled: O
    }, Z = Kt.useRef(F);
    return Z.current = F, Kt.useEffect(() => {
      const Y = D.current, vt = J.current;
      if (!Y || !vt) return;
      const $ = window.matchMedia("(prefers-reduced-motion: reduce)").matches, yt = [];
      let gt = 0, tt = { time: -1e9, x: 0, y: 0 };
      const V = (A, W) => 0.5 * A.gravity * G3 * W * W, P = (A, W, j, pt) => [
        A.x + Math.cos(W.angle) * j,
        A.y + Math.sin(W.angle) * j + V(A.settings, pt)
      ], I = (A, W, j, pt) => {
        const dt = W.settings, zt = $ ? Q1 : dt.duration * j.life, ot = pt / zt;
        if (ot >= 1) return !1;
        const ct = $ ? 0.55 : dt.ease(Ca(ot, 0, 1)), wt = $ ? 0 : pt / 1e3, ut = dt.radius * j.reach * ct, St = dt.width * j.scale, xt = $ ? 1 - ot : 1 - j3(dt.shape === "line" ? 0.55 : 0.7, 1, ot);
        if (xt <= 0) return !0;
        if (A.strokeStyle = j.color, A.fillStyle = j.color, dt.shape === "line") {
          const Gt = dt.size * j.scale * ($ ? 0.5 : Math.pow(1 - ot, 1.6)), [Ft, Ut] = P(W, j, ut, wt), [At, Qt] = P(W, j, ut + Math.max(0.01, Gt), wt);
          return A.lineCap = "round", j.glow > 0 && (A.globalAlpha = xt * 0.14 * j.glow, A.lineWidth = St * 4.5, A.beginPath(), A.moveTo(Ft, Ut), A.lineTo(At, Qt), A.stroke()), A.globalAlpha = xt, A.lineWidth = St, A.beginPath(), A.moveTo(Ft, Ut), A.lineTo(At, Qt), A.stroke(), !0;
        }
        if (dt.shape === "streak") {
          const Gt = $ ? 0 : Math.min(pt, 70 + dt.size * 4 * j.scale), Ft = $ ? 0.4 : dt.ease(Ca((pt - Gt) / zt, 0, 1)), [Ut, At] = P(W, j, ut, wt), [Qt, te] = P(W, j, dt.radius * j.reach * Ft, Math.max(0, wt - Gt / 1e3)), Xe = Ut - Qt, ye = At - te, en = Math.hypot(Xe, ye) || 1, En = -ye / en * St * 0.5, Se = Xe / en * St * 0.5, Gn = (Re, xn) => {
            const Ve = A.createLinearGradient(Qt, te, Ut, At);
            Ve.addColorStop(0, j.clear), Ve.addColorStop(1, j.color), A.globalAlpha = xn, A.fillStyle = Ve, A.beginPath(), A.moveTo(Qt, te), A.lineTo(Ut + En * Re, At + Se * Re), A.lineTo(Ut - En * Re, At - Se * Re), A.closePath(), A.fill(), A.fillStyle = j.color, A.beginPath(), A.arc(Ut, At, St * 0.5 * Re, 0, Math.PI * 2), A.fill();
          };
          return j.glow > 0 && Gn(3.2, xt * 0.16 * j.glow), Gn(1, xt), !0;
        }
        if (dt.shape === "dot") {
          const [Gt, Ft] = P(W, j, ut, wt), Ut = St * 1.25 * (1 - 0.5 * ct);
          return j.glow > 0 && (A.globalAlpha = xt * 0.18 * j.glow, A.beginPath(), A.arc(Gt, Ft, Ut * 2.6, 0, Math.PI * 2), A.fill()), A.globalAlpha = xt, A.beginPath(), A.arc(Gt, Ft, Ut, 0, Math.PI * 2), A.fill(), !0;
        }
        const [N, mt] = P(W, j, ut, wt), Rt = $ ? 1 - ot : Math.pow(Math.sin(Math.PI * Ca(ot * 1.1, 0, 1)), 0.7), _t = dt.size * 0.6 * j.scale * Rt, Mt = j.angle + j.spin * ot * Math.PI * 0.5;
        return _t <= 0.05 || (j.glow > 0 && (A.globalAlpha = xt * 0.2 * j.glow, A.beginPath(), A.arc(N, mt, _t * 1.1, 0, Math.PI * 2), A.fill()), A.globalAlpha = xt, Z3(A, N, mt, _t, Mt), A.fill()), !0;
      }, rt = (A, W, j) => {
        const pt = W.settings, dt = $ ? Q1 : pt.duration * 0.8, zt = j / dt;
        if (zt >= 1) return !1;
        const ot = 2 + pt.radius * 0.6 * ($ ? 0.6 : tf["ease-out"](zt));
        return A.globalAlpha = Math.pow(1 - zt, 2) * 0.7, A.strokeStyle = W.sparks[0]?.color ?? pt.colors[0], A.lineWidth = Math.max(0.5, pt.width * (1 - zt) * 0.9), A.beginPath(), A.arc(W.x, W.y, ot, 0, Math.PI * 2), A.stroke(), !0;
      }, x = (A) => {
        A.canvas.remove();
        const W = yt.indexOf(A);
        W >= 0 && yt.splice(W, 1);
      }, ft = (A) => {
        gt = 0;
        for (const W of [...yt]) {
          const j = A - W.start, pt = W.ctx;
          pt.setTransform(1, 0, 0, 1, 0, 0), pt.clearRect(0, 0, W.canvas.width, W.canvas.height), pt.setTransform(W.ratio, 0, 0, W.ratio, -W.left * W.ratio, -W.top * W.ratio);
          let dt = !1;
          W.settings.ring && rt(pt, W, j) && (dt = !0);
          for (const zt of W.sparks)
            I(pt, W, zt, j) && (dt = !0);
          pt.globalAlpha = 1, dt || x(W);
        }
        yt.length && (gt = requestAnimationFrame(ft));
      }, z = (A, W) => {
        const j = Z.current;
        if (j.disabled) return;
        const pt = Y.getBoundingClientRect(), dt = Math.floor(Math.random() * j.colors.length), zt = j.spread >= 359.5, ot = j.spread * Math.PI / 180, ct = (j.direction - 90) * Math.PI / 180, wt = zt ? Math.PI * 2 / j.count : j.count > 1 ? ot / (j.count - 1) : 0, ut = Array.from({ length: j.count }, (Gt, Ft) => {
          const Ut = zt ? ct + wt * Ft : j.count > 1 ? ct - ot / 2 + wt * Ft : ct, At = (Math.random() - 0.5) * j.randomness;
          return {
            angle: Ut + At * (wt || ot || 1) * 0.9,
            reach: 1 + (Math.random() - 0.5) * 0.7 * j.randomness,
            scale: 1 + (Math.random() - 0.5) * 0.8 * j.randomness,
            life: 1 + (Math.random() - 0.5) * 0.5 * j.randomness,
            spin: Math.random() - 0.5,
            color: j.colors[(Ft + dt) % j.colors.length],
            clear: "",
            glow: 0
          };
        }), St = j.duration * (1 + 0.25 * j.randomness), xt = V(j, St / 1e3), N = j.radius * (1 + 0.35 * j.randomness) * (j.ease === tf.spring ? 1.15 : 1) + j.size * (1 + 0.4 * j.randomness) + j.width * (j.glow > 0 ? 6 : 2) + 6, mt = {
          left: Math.max(A - N, 0),
          top: Math.max(W - N, 0),
          right: Math.min(A + N, window.innerWidth),
          bottom: Math.min(W + N + xt, window.innerHeight)
        };
        if (mt.right - mt.left < 1 || mt.bottom - mt.top < 1) return;
        const Rt = Math.min(window.devicePixelRatio || 1, 2), _t = document.createElement("canvas");
        _t.width = Math.ceil((mt.right - mt.left) * Rt), _t.height = Math.ceil((mt.bottom - mt.top) * Rt), Object.assign(_t.style, {
          position: "absolute",
          left: `${mt.left - pt.left}px`,
          top: `${mt.top - pt.top}px`,
          width: `${mt.right - mt.left}px`,
          height: `${mt.bottom - mt.top}px`,
          display: "block",
          pointerEvents: "none"
        }), _t.setAttribute("aria-hidden", "true"), vt.appendChild(_t);
        const Mt = _t.getContext("2d");
        if (!Mt) {
          _t.remove();
          return;
        }
        for (const Gt of ut) {
          const [Ft, Ut, At] = K3(Mt, Gt.color);
          Gt.clear = `rgba(${Ft}, ${Ut}, ${At}, 0)`, Gt.glow = j.glow * (0.35 + 0.65 * ((0.2126 * Ft + 0.7152 * Ut + 0.0722 * At) / 255));
        }
        for (yt.push({
          x: A,
          y: W,
          start: performance.now(),
          sparks: ut,
          settings: { ...j },
          canvas: _t,
          ctx: Mt,
          ratio: Rt,
          left: mt.left,
          top: mt.top
        }); yt.length > V3; ) x(yt[0]);
        gt || (gt = requestAnimationFrame(ft));
      }, Ht = (A) => {
        A.pointerType !== "mouse" || A.button !== 0 || (tt = { time: performance.now(), x: A.clientX, y: A.clientY }, z(A.clientX, A.clientY));
      }, E = (A) => {
        if ("pointerType" in A && A.pointerType === "mouse") return;
        if (A.detail === 0) {
          const pt = (A.target instanceof Element ? A.target : Y).getBoundingClientRect();
          z(pt.left + pt.width / 2, pt.top + pt.height / 2);
          return;
        }
        performance.now() - tt.time < 700 && Math.hypot(A.clientX - tt.x, A.clientY - tt.y) < 12 || z(A.clientX, A.clientY);
      };
      return Y.addEventListener("pointerdown", Ht), Y.addEventListener("click", E), C.current = {
        spark: (A, W) => {
          const j = Y.getBoundingClientRect();
          z(j.left + (A ?? j.width / 2), j.top + (W ?? j.height / 2));
        }
      }, () => {
        cancelAnimationFrame(gt), Y.removeEventListener("pointerdown", Ht), Y.removeEventListener("click", E);
        for (const A of [...yt]) x(A);
        C.current = null;
      };
    }, []), Kt.useImperativeHandle(
      L,
      () => ({
        spark: (Y, vt) => C.current?.spark(Y, vt)
      }),
      []
    ), /* @__PURE__ */ ie.jsxs(
      "div",
      {
        ref: D,
        className: G,
        style: { position: "relative", width: "100%", height: "100%", isolation: "isolate", ...q },
        children: [
          k,
          /* @__PURE__ */ ie.jsx(
            "span",
            {
              ref: J,
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
MS.displayName = "ClickSpark";
const w0 = { stiffness: 170, damping: 16, mass: 1 }, F3 = (c, l, u) => {
  const a = Math.min(1, Math.max(0, (u - c) / (l - c)));
  return a * a * (3 - 2 * a);
}, df = /* @__PURE__ */ new Set(), dl = { pointer: null, owner: null };
let Ys = null;
const wS = (c, l) => {
  const u = l.x - (c.left + c.width / 2), a = l.y - (c.top + c.height / 2), s = Math.hypot(Math.max(0, Math.abs(u) - c.width / 2), Math.max(0, Math.abs(a) - c.height / 2));
  return { dx: u, dy: a, outside: s };
}, Fs = () => {
  let c = null, l = 1 / 0, u = 1 / 0;
  for (const s of df) {
    const f = s.settings.current;
    let h = null;
    if (dl.pointer && !f.disabled && !s.reduce && (h = wS(s.wrapper.getBoundingClientRect(), dl.pointer), h.outside > f.padding && (h = null)), !f.exclusive) {
      (h || s.active) && s.wake();
      continue;
    }
    if (!h) continue;
    const d = Math.hypot(h.dx, h.dy);
    (h.outside < l || h.outside === l && d < u) && (c = s, l = h.outside, u = d);
  }
  const a = dl.owner;
  dl.owner = c, a && a !== c && a.wake(), c && c.wake();
}, k3 = () => {
  const c = (u) => {
    u.pointerType !== "touch" && (dl.pointer = { x: u.clientX, y: u.clientY }, Fs());
  }, l = () => {
    dl.pointer = null, Fs();
  };
  return window.addEventListener("pointermove", c, { passive: !0 }), window.addEventListener("scroll", Fs, { passive: !0, capture: !0 }), document.documentElement.addEventListener("pointerleave", l), window.addEventListener("blur", l), () => {
    window.removeEventListener("pointermove", c), window.removeEventListener("scroll", Fs, { capture: !0 }), document.documentElement.removeEventListener("pointerleave", l), window.removeEventListener("blur", l);
  };
}, Z1 = ({
  children: c,
  padding: l = 100,
  disabled: u = !1,
  magnetStrength: a = 2,
  maxOffset: s,
  exclusive: f = !0,
  axis: h = "both",
  tilt: d = 0,
  scale: g = 1,
  spring: v,
  onActiveChange: p,
  wrapperClassName: _ = "",
  innerClassName: S = "",
  style: b,
  ...M
}) => {
  const T = Kt.useRef(null), O = Kt.useRef(null), G = Kt.useRef(null), q = {
    padding: Math.max(0, l),
    disabled: u,
    strength: Math.max(0.1, a),
    maxOffset: s,
    exclusive: f,
    axis: h,
    tilt: d,
    scale: g,
    stiffness: Math.max(1, v?.stiffness ?? w0.stiffness),
    damping: Math.max(0, v?.damping ?? w0.damping),
    mass: Math.max(0.01, v?.mass ?? w0.mass),
    onActiveChange: p
  }, k = Kt.useRef(q);
  return k.current = q, Kt.useEffect(() => {
    const L = T.current, D = O.current;
    if (!L || !D) return;
    const J = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, C = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 }, F = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 0 };
    let Z = !1, Y = 0, vt = 0;
    const $ = (I, rt) => {
      const x = k.current;
      let ft = !0;
      return Object.keys(C).forEach((z) => {
        const Ht = x.stiffness * (I[z] - C[z]) - x.damping * F[z];
        F[z] += Ht / x.mass * rt, C[z] += F[z] * rt;
        const E = z === "scale" ? 1e-3 : 0.05;
        (Math.abs(I[z] - C[z]) > E || Math.abs(F[z]) > E) && (ft = !1);
      }), ft;
    }, yt = () => {
      const I = k.current, rt = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
      if (I.disabled || J || !dl.pointer) return { target: rt, engaged: !1 };
      if (I.exclusive && dl.owner !== P) return { target: rt, engaged: !1 };
      const x = L.getBoundingClientRect(), { dx: ft, dy: z, outside: Ht } = wS(x, dl.pointer);
      if (Ht > I.padding) return { target: rt, engaged: !1 };
      const E = I.padding > 0 ? 1 - F3(I.padding * 0.5, I.padding, Ht) : 1;
      let A = I.axis === "y" ? 0 : ft / I.strength * E, W = I.axis === "x" ? 0 : z / I.strength * E;
      if (I.maxOffset !== void 0 && I.maxOffset !== null) {
        const dt = Math.hypot(A, W);
        dt > I.maxOffset && (A *= I.maxOffset / dt, W *= I.maxOffset / dt);
      }
      const j = Math.max(-1, Math.min(1, ft / Math.max(x.width / 2, 1))), pt = Math.max(-1, Math.min(1, z / Math.max(x.height / 2, 1)));
      return rt.x = A, rt.y = W, rt.tiltX = -pt * I.tilt * E, rt.tiltY = j * I.tilt * E, rt.scale = 1 + (I.scale - 1) * E, { target: rt, engaged: !0 };
    }, gt = () => {
      const { x: I, y: rt, tiltX: x, tiltY: ft, scale: z } = C, Ht = Math.abs(x) > 0.01 || Math.abs(ft) > 0.01;
      D.style.transform = `translate3d(${I.toFixed(2)}px, ${rt.toFixed(2)}px, 0)${Ht ? ` perspective(800px) rotateX(${x.toFixed(2)}deg) rotateY(${ft.toFixed(2)}deg)` : ""}${Math.abs(z - 1) > 5e-4 ? ` scale(${z.toFixed(4)})` : ""}`;
    }, tt = (I) => {
      Y = 0;
      const rt = vt ? Math.min((I - vt) / 1e3, 1 / 30) : 1 / 60;
      vt = I;
      const { target: x, engaged: ft } = yt();
      ft !== Z && (Z = ft, P.active = ft, ft ? L.setAttribute("data-magnet-active", "") : L.removeAttribute("data-magnet-active"), k.current.onActiveChange?.(ft));
      const z = Math.ceil(rt / (1 / 120));
      let Ht = !0;
      for (let E = 0; E < z; E++) Ht = $(x, rt / z);
      Ht && Object.keys(C).forEach((E) => {
        C[E] = x[E], F[E] = 0;
      }), gt(), Ht ? vt = 0 : Y = requestAnimationFrame(tt);
    };
    function V() {
      Y || (Y = requestAnimationFrame(tt));
    }
    const P = { wrapper: L, settings: k, reduce: J, wake: V, active: !1 };
    return df.add(P), Ys || (Ys = k3()), G.current = () => {
      Fs(), V();
    }, () => {
      cancelAnimationFrame(Y), G.current = null, df.delete(P), dl.owner === P && (dl.owner = null), !df.size && Ys && (Ys(), Ys = null);
    };
  }, []), Kt.useEffect(() => {
    G.current?.();
  }), /* @__PURE__ */ ie.jsx(
    "div",
    {
      ref: T,
      className: _,
      style: { position: "relative", display: "inline-block", ...b },
      ...M,
      children: /* @__PURE__ */ ie.jsx("div", { ref: O, className: S, style: { willChange: "transform" }, children: c })
    }
  );
}, J3 = { circle: 0, square: 1, ring: 2, sparkle: 3 }, $3 = { parallax: 0, repel: 1, attract: 2 }, P3 = { none: 0, up: 1, down: 2, forward: 3 }, W3 = 2e4, K1 = 900, F1 = 9e3, ao = 4, Of = 10, Rf = 1 / Math.tan(7.5 * Math.PI / 180), AS = 0.1, Su = 100, I3 = 1.8, A0 = 1.5, OS = 520, RS = 46, tx = `#version 300 es
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
uniform vec4 uBursts[${ao}];
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
  pos.z *= ${Of.toFixed(1)};
  vec3 wobble = bob(aRandom, uTime);
  vec3 world = uRotation * pos + uOffset + wobble;
  float edge = 1.0;
  if (uDrift == 1 || uDrift == 2) {
    float span = uSpread * 2.0 + 3.0;
    float k = mod(aRandom.w * span + uOffset.y + wobble.y + (uDrift == 1 ? uTravel : -uTravel), span);
    world.y = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.12, k) * smoothstep(span, span * 0.88, k);
  } else if (uDrift == 3) {
    float span = uSpread * ${Of.toFixed(1)} * 2.0 + 3.0;
    float k = mod(aRandom.y * span + uOffset.z + wobble.z + uTravel, span);
    world.z = k - span * 0.5;
    edge = smoothstep(0.0, span * 0.1, k);
  }
  vec3 view = world - vec3(0.0, 0.0, uCamera);
  float dist = length(view);
  float ahead = -view.z;
  if (ahead < ${AS.toFixed(2)} || ahead > ${Su.toFixed(1)}) {
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }
  edge *= smoothstep(1.0, 4.0, ahead);
  vec2 ndc = vec2(view.x * ${Rf.toFixed(6)} / uAspect, view.y * ${Rf.toFixed(6)}) / ahead;
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
  for (int i = 0; i < ${ao}; i++) {
    if (i >= uBurstCount) break;
    vec4 burst = uBursts[i];
    vec2 delta = screen - burst.xy;
    float reach = length(delta);
    float wave = exp(-pow((reach - burst.z * ${OS.toFixed(1)}) / ${RS.toFixed(1)}, 2.0));
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
  float far = smoothstep(${Su.toFixed(1)}, ${(Su * 0.9).toFixed(1)}, ahead);
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
}`, ex = `#version 300 es
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
}`, nx = `#version 300 es
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
}`, ix = `#version 300 es
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
}`, Di = (c, l, u) => Math.min(u, Math.max(l, c)), k1 = (c, l, u) => {
  const a = c.createShader(l);
  return a ? (c.shaderSource(a, u), c.compileShader(a), c.getShaderParameter(a, c.COMPILE_STATUS) ? a : (c.deleteShader(a), null)) : null;
}, J1 = (c, l, u) => {
  const a = k1(c, c.VERTEX_SHADER, l), s = k1(c, c.FRAGMENT_SHADER, u), f = c.createProgram();
  if (!a || !s || !f) return null;
  if (c.attachShader(f, a), c.attachShader(f, s), c.linkProgram(f), c.deleteShader(a), c.deleteShader(s), !c.getProgramParameter(f, c.LINK_STATUS))
    return c.deleteProgram(f), null;
  const h = {}, d = c.getProgramParameter(f, c.ACTIVE_UNIFORMS);
  for (let g = 0; g < d; g++) {
    const v = c.getActiveUniform(f, g);
    v && (h[v.name.replace("[0]", "")] = c.getUniformLocation(f, v.name));
  }
  return { program: f, uniforms: h };
}, lx = (c) => {
  let l = c >>> 0;
  return () => {
    l = l + 1831565813 >>> 0;
    let u = l;
    return u = Math.imul(u ^ u >>> 15, u | 1), u ^= u + Math.imul(u ^ u >>> 7, u | 61), ((u ^ u >>> 14) >>> 0) / 4294967296;
  };
}, ax = (c) => 1 - Math.pow(1 - Di(c, 0, 1), 3), $1 = (c, l) => (c % l + l) % l, ux = ({
  particleCount: c = 200,
  particleSpread: l = 10,
  speed: u = 0.1,
  particleColors: a = ["#ffffff"],
  moveParticlesOnHover: s = !0,
  particleHoverFactor: f = 1,
  alphaParticles: h = !1,
  particleBaseSize: d = 100,
  sizeRandomness: g = 1,
  cameraDistance: v = 20,
  disableRotation: p = !1,
  pixelRatio: _,
  shape: S = "circle",
  glow: b = 0.5,
  twinkle: M = 0.3,
  depthOfField: T = 0,
  connections: O = !1,
  connectionDistance: G = 110,
  hoverEffect: q = "parallax",
  hoverRadius: k = 140,
  clickBurst: L = !0,
  drift: D = "none",
  driftSpeed: J = 1,
  variation: C = 0,
  intro: F = !0,
  opacity: Z = 1,
  lightMode: Y = !1,
  paused: vt = !1,
  className: $ = "",
  style: yt
}) => {
  const gt = Kt.useRef(null), tt = Kt.useRef(null), V = Kt.useRef(null), P = (Array.isArray(a) ? a : [a]).filter(Boolean).map(String), I = {
    count: Di(Math.round(c), 1, W3),
    spread: Math.max(0.1, l),
    speed: u,
    colors: P.length ? P : ["#ffffff"],
    mouse: s,
    hoverFactor: Math.max(0, f),
    soft: h,
    size: Math.max(0, d),
    randomness: Math.max(0, g),
    camera: Math.max(1, v),
    rotate: !p,
    dpr: _,
    shape: J3[S] ?? 0,
    glow: Math.max(0, b),
    twinkle: Di(M, 0, 1),
    depthOfField: Math.max(0, T),
    connections: O,
    connectionDistance: Math.max(10, G),
    hoverEffect: $3[q] ?? 0,
    hoverRadius: Math.max(20, k),
    clickBurst: L,
    drift: P3[D] ?? 0,
    driftSpeed: J,
    variation: Math.max(0, Math.round(C)),
    intro: F,
    opacity: Di(Z, 0, 1),
    lightMode: Y,
    paused: vt
  }, rt = Kt.useRef(I);
  return rt.current = I, Kt.useEffect(() => {
    const x = gt.current, ft = tt.current, z = ft?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!x || !ft || !z) return;
    const Ht = J1(z, tx, ex), E = J1(z, nx, ix);
    if (!Ht || !E) return;
    const A = z.createBuffer();
    z.bindBuffer(z.ARRAY_BUFFER, A), z.bufferData(z.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), z.STATIC_DRAW);
    const W = z.createBuffer(), j = z.createBuffer(), pt = z.createBuffer(), dt = z.createVertexArray();
    z.bindVertexArray(dt), z.bindBuffer(z.ARRAY_BUFFER, A), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0);
    const zt = (st, lt, at) => {
      z.bindBuffer(z.ARRAY_BUFFER, st), z.enableVertexAttribArray(lt), z.vertexAttribPointer(lt, at, z.FLOAT, !1, 0, 0), z.vertexAttribDivisor(lt, 1);
    };
    zt(W, 1, 3), zt(j, 2, 4), zt(pt, 3, 3);
    const ot = z.createBuffer(), ct = new Float32Array(F1 * 8), wt = z.createVertexArray();
    z.bindVertexArray(wt), z.bindBuffer(z.ARRAY_BUFFER, A), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferData(z.ARRAY_BUFFER, ct.byteLength, z.DYNAMIC_DRAW), z.enableVertexAttribArray(1), z.vertexAttribPointer(1, 4, z.FLOAT, !1, 32, 0), z.vertexAttribDivisor(1, 1), z.enableVertexAttribArray(2), z.vertexAttribPointer(2, 4, z.FLOAT, !1, 32, 16), z.vertexAttribDivisor(2, 1), z.bindVertexArray(null);
    const ut = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), St = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, xt = /* @__PURE__ */ new Map(), N = (st) => {
      if (xt.has(st)) return xt.get(st);
      let lt = [1, 1, 1];
      if (ut) {
        ut.clearRect(0, 0, 1, 1), ut.fillStyle = "#ffffff", ut.fillStyle = st, ut.fillRect(0, 0, 1, 1);
        const [at, Tt, it] = ut.getImageData(0, 0, 1, 1).data;
        lt = [at / 255, Tt / 255, it / 255];
      }
      return xt.set(st, lt), lt;
    }, mt = (st) => {
      const lt = st.map((it) => Math.pow(it, 2.2)), at = 0.2126 * lt[0] + 0.7152 * lt[1] + 0.0722 * lt[2], Tt = Math.min(1, 0.06 / Math.max(at, 1e-4));
      return lt.map((it) => Math.pow(it * Tt, 1 / 2.2));
    }, Rt = { width: 1, height: 1, ratio: 1 }, _t = { x: 0, y: 0, sx: 0, sy: 0, nx: 0, ny: 0, inside: !1, active: 0 }, Mt = {
      clock: 0,
      spin: 0,
      travel: 0,
      offsetX: 0,
      offsetY: 0,
      reveal: rt.current.intro && !St ? 0 : 1
    }, Gt = [], Ft = new Float32Array(ao * 4), Ut = {
      key: "",
      count: 0,
      positions: new Float32Array(0),
      randoms: new Float32Array(0),
      colors: new Float32Array(0)
    }, At = {
      x: new Float32Array(0),
      y: new Float32Array(0),
      ahead: new Float32Array(0),
      alpha: new Float32Array(0)
    };
    let Qt = 0, te = 0, Xe = !0;
    const ye = (st) => {
      const lt = `${st.count}|${st.variation}|${st.colors.join(",")}|${st.lightMode ? 1 : 0}`;
      if (lt === Ut.key) return;
      Ut.key = lt;
      const at = lx(st.variation * 7919 + 1), Tt = st.count, it = new Float32Array(Tt * 3), ht = new Float32Array(Tt * 4), Et = new Float32Array(Tt * 3), Ot = st.colors.map((Dt) => st.lightMode ? mt(N(Dt)) : N(Dt));
      for (let Dt = 0; Dt < Tt; Dt++) {
        let Vt, re, Xt, Zt;
        do
          Vt = at() * 2 - 1, re = at() * 2 - 1, Xt = at() * 2 - 1, Zt = Vt * Vt + re * re + Xt * Xt;
        while (Zt > 1 || Zt === 0);
        const Pt = Math.cbrt(at());
        it.set([Vt * Pt, re * Pt, Xt * Pt], Dt * 3), ht.set([at(), at(), at(), at()], Dt * 4), Et.set(Ot[Math.floor(at() * Ot.length)], Dt * 3);
      }
      Ut.count = Tt, Ut.positions = it, Ut.randoms = ht, Ut.colors = Et;
      const qt = Math.min(Tt, K1);
      At.x = new Float32Array(qt), At.y = new Float32Array(qt), At.ahead = new Float32Array(qt), At.alpha = new Float32Array(qt), z.bindBuffer(z.ARRAY_BUFFER, W), z.bufferData(z.ARRAY_BUFFER, it, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, j), z.bufferData(z.ARRAY_BUFFER, ht, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, pt), z.bufferData(z.ARRAY_BUFFER, Et, z.STATIC_DRAW);
    }, en = (st) => {
      const lt = Mt.clock * 1e3, at = st.rotate ? Math.sin(lt * 2e-4) * 0.1 : 0, Tt = st.rotate ? Math.cos(lt * 5e-4) * 0.15 : 0, it = st.rotate ? Mt.spin : 0, [ht, Et, Ot, qt, Dt, Vt] = [Math.sin(at), Math.cos(at), Math.sin(Tt), Math.cos(Tt), Math.sin(it), Math.cos(it)];
      return [
        qt * Vt + Ot * ht * Dt,
        Et * Dt,
        -Ot * Vt + qt * ht * Dt,
        -qt * Dt + Ot * ht * Vt,
        Et * Vt,
        Ot * Dt + qt * ht * Vt,
        Ot * Et,
        -ht,
        qt * Et
      ];
    }, En = () => [Mt.offsetX, Mt.offsetY, -(1 - ax(Mt.reveal)) * 70], Se = (st, lt) => {
      const at = Math.min(Ut.count, K1), [Tt, it, ht] = En(), Et = Rt.width / Rt.height, Ot = Mt.clock, qt = st.hoverRadius, Dt = st.hoverEffect !== 0 ? _t.active : 0, Vt = st.spread * 2 + 3, re = st.spread * Of * 2 + 3;
      for (let Xt = 0; Xt < at; Xt++) {
        const Zt = Ut.positions[Xt * 3] * st.spread, Pt = Ut.positions[Xt * 3 + 1] * st.spread, ze = Ut.positions[Xt * 3 + 2] * st.spread * Of, ge = Ut.randoms[Xt * 4], Ge = Ut.randoms[Xt * 4 + 1], ke = Ut.randoms[Xt * 4 + 2], De = Ut.randoms[Xt * 4 + 3], Le = Math.sin(Ot * ke + 6.28 * De) * (0.1 + 1.4 * ge), ve = Math.sin(Ot * Ge + 6.28 * ge) * (0.1 + 1.4 * De), Ti = Math.sin(Ot * De + 6.28 * Ge) * (0.1 + 1.4 * ke), ml = lt[0] * Zt + lt[3] * Pt + lt[6] * ze + Tt + Le;
        let Je = lt[1] * Zt + lt[4] * Pt + lt[7] * ze + it + ve, Ye = lt[2] * Zt + lt[5] * Pt + lt[8] * ze + ht + Ti, Mn = 1;
        if (st.drift === 1 || st.drift === 2) {
          const ln = $1(De * Vt + it + ve + (st.drift === 1 ? Mt.travel : -Mt.travel), Vt);
          Je = ln - Vt / 2;
          const an = Di(ln / (Vt * 0.12), 0, 1), $n = Di((Vt - ln) / (Vt * 0.12), 0, 1);
          Mn = an * an * (3 - 2 * an) * $n * $n * (3 - 2 * $n);
        } else if (st.drift === 3) {
          const ln = $1(Ge * re + ht + Ti + Mt.travel, re);
          Ye = ln - re / 2;
          const an = Di(ln / (re * 0.1), 0, 1);
          Mn = an * an * (3 - 2 * an);
        }
        const on = st.camera - Ye;
        if (on < AS || on > Su) {
          At.alpha[Xt] = 0;
          continue;
        }
        const je = Di((on - 1) / 3, 0, 1);
        Mn *= je * je * (3 - 2 * je);
        let qe = ml * Rf / Et / on * 0.5 * Rt.width + Rt.width / 2, nn = Je * Rf / on * 0.5 * Rt.height + Rt.height / 2, Ei = 0, al = 0;
        if (Dt > 1e-3) {
          const ln = qe - _t.sx, an = nn - _t.sy, $n = Math.hypot(ln, an), Pn = Math.exp(-(ln * ln + an * an) / (qt * qt)) * st.hoverFactor * Dt;
          st.hoverEffect === 1 && $n > 1e-3 ? (Ei += ln / $n * qt * 0.5 * Pn, al += an / $n * qt * 0.5 * Pn) : st.hoverEffect === 2 && (Ei -= ln * 0.6 * Pn, al -= an * 0.6 * Pn);
        }
        for (const ln of Gt) {
          const an = ln.age / A0, $n = qe - ln.x, Pn = nn - ln.y, ji = Math.hypot($n, Pn);
          if (ji < 1e-3) continue;
          const Za = Math.exp(-Math.pow((ji - an * OS) / RS, 2)), gl = Di(ji / 30, 0, 1), cn = Za * (1 - an) * (1 - an) * 56 * gl * gl * (3 - 2 * gl);
          Ei += $n / ji * cn, al += Pn / ji * cn;
        }
        qe += Ei, nn += al;
        const si = Di((Su - on) / (Su - Su * 0.9), 0, 1), Vr = Di(Mt.reveal * 1.6 - ke * 0.6, 0, 1);
        At.x[Xt] = qe, At.y[Xt] = nn, At.ahead[Xt] = on, At.alpha[Xt] = si * si * (3 - 2 * si) * Mn * Vr * Vr;
      }
      return at;
    }, Gn = (st, lt) => {
      const at = Se(st, lt), Tt = st.connectionDistance, it = Math.max(1, Math.ceil(Rt.width / Tt) + 2), ht = /* @__PURE__ */ new Map();
      for (let qt = 0; qt < at; qt++) {
        if (At.alpha[qt] < 0.02) continue;
        const Dt = (Math.floor(At.y[qt] / Tt) + 1) * it + Math.floor(At.x[qt] / Tt) + 1, Vt = ht.get(Dt);
        Vt ? Vt.push(qt) : ht.set(Dt, [qt]);
      }
      let Et = 0;
      const Ot = Tt * Tt;
      for (const [qt, Dt] of ht)
        for (const Vt of [0, 1, it - 1, it, it + 1]) {
          const re = Vt === 0 ? Dt : ht.get(qt + Vt);
          if (re)
            for (let Xt = 0; Xt < Dt.length; Xt++) {
              const Zt = Dt[Xt];
              for (let Pt = Vt === 0 ? Xt + 1 : 0; Pt < re.length; Pt++) {
                const ze = re[Pt], ge = At.x[Zt] - At.x[ze], Ge = At.y[Zt] - At.y[ze], ke = ge * ge + Ge * Ge;
                if (ke > Ot) continue;
                const De = Di(1 - Math.abs(At.ahead[Zt] - At.ahead[ze]) / 18, 0, 1);
                if (De <= 0) continue;
                if (Et >= F1) return Et;
                const Le = 1 - Math.sqrt(ke) / Tt, ve = Et * 8;
                ct[ve] = At.x[Zt], ct[ve + 1] = At.y[Zt], ct[ve + 2] = At.x[ze], ct[ve + 3] = At.y[ze], ct[ve + 4] = (Ut.colors[Zt * 3] + Ut.colors[ze * 3]) / 2, ct[ve + 5] = (Ut.colors[Zt * 3 + 1] + Ut.colors[ze * 3 + 1]) / 2, ct[ve + 6] = (Ut.colors[Zt * 3 + 2] + Ut.colors[ze * 3 + 2]) / 2, ct[ve + 7] = Le * Le * De * 0.7 * Math.min(At.alpha[Zt], At.alpha[ze]), Et++;
              }
            }
        }
      return Et;
    }, Re = () => {
      const st = rt.current;
      ye(st);
      const lt = en(st), [at, Tt, it] = En();
      if (z.viewport(0, 0, ft.width, ft.height), z.clearColor(0, 0, 0, 0), z.clear(z.COLOR_BUFFER_BIT), z.enable(z.BLEND), z.blendFunc(z.ONE, z.ONE_MINUS_SRC_ALPHA), st.connections) {
        const Ot = Gn(st, lt);
        Ot && (z.useProgram(E.program), z.bindVertexArray(wt), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferSubData(z.ARRAY_BUFFER, 0, ct.subarray(0, Ot * 8)), z.uniform2f(E.uniforms.uView, Rt.width, Rt.height), z.uniform1f(E.uniforms.uRatio, Rt.ratio), z.uniform1f(E.uniforms.uWidth, 1), z.uniform1f(E.uniforms.uOpacity, st.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, Ot));
      }
      const ht = Ht.uniforms;
      let Et = 0;
      for (let Ot = Gt.length - 1; Ot >= 0 && Et < ao; Ot--)
        Ft.set([Gt[Ot].x, Gt[Ot].y, Gt[Ot].age / A0, 1], Et * 4), Et++;
      z.useProgram(Ht.program), z.bindVertexArray(dt), z.uniformMatrix3fv(ht.uRotation, !1, lt), z.uniform3f(ht.uOffset, at, Tt, it), z.uniform1f(ht.uSpread, st.spread), z.uniform1f(ht.uTime, Mt.clock), z.uniform1f(ht.uCamera, st.camera), z.uniform1f(ht.uAspect, Rt.width / Rt.height), z.uniform2f(ht.uView, Rt.width, Rt.height), z.uniform1f(ht.uRatio, Rt.ratio), z.uniform1f(ht.uSize, st.size), z.uniform1f(ht.uRandomness, st.randomness), z.uniform1f(ht.uBlur, st.depthOfField * 14), z.uniform1f(ht.uFocus, st.camera + 14), z.uniform1f(ht.uGlow, st.lightMode ? st.glow * 0.3 : st.glow), z.uniform1f(ht.uTwinkle, st.twinkle), z.uniform1i(ht.uShape, st.shape), z.uniform1i(ht.uDrift, st.drift), z.uniform1f(ht.uTravel, Mt.travel), z.uniform4f(ht.uPointer, _t.sx, _t.sy, _t.active, st.hoverRadius), z.uniform1i(ht.uEffect, st.hoverEffect), z.uniform1f(ht.uStrength, st.hoverFactor), z.uniform4fv(ht.uBursts, Ft), z.uniform1i(ht.uBurstCount, Et), z.uniform1f(ht.uReveal, Mt.reveal), z.uniform1f(ht.uSoft, st.soft ? 0.2 : 0), z.uniform1f(ht.uShimmer, st.lightMode ? 0 : 1), z.uniform1f(ht.uOpacity, st.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, Ut.count), z.bindVertexArray(null);
    }, xn = (st) => {
      if (Qt = 0, !Xe || document.hidden) return;
      const lt = rt.current, at = te ? Di((st - te) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (te = st, lt.paused) {
        Mt.reveal = 1, Re(), te = 0;
        return;
      }
      const Tt = St ? 0 : 1, it = at * lt.speed * Tt;
      Mt.clock += it, lt.rotate && (Mt.spin += it * 0.6), Mt.travel += at * lt.driftSpeed * Tt * (lt.drift === 3 ? 6 : 0.9);
      const ht = lt.mouse && _t.inside && !St, Et = 1 - Math.exp(-at / 0.35), Ot = ht && lt.hoverEffect === 0 ? lt.hoverFactor : 0;
      Mt.offsetX += (-_t.nx * Ot - Mt.offsetX) * Et, Mt.offsetY += (-_t.ny * Ot - Mt.offsetY) * Et, _t.sx += (_t.x - _t.sx) * (1 - Math.exp(-at / 0.06)), _t.sy += (_t.y - _t.sy) * (1 - Math.exp(-at / 0.06)), _t.active += ((ht ? 1 : 0) - _t.active) * (1 - Math.exp(-at / 0.2));
      for (let qt = Gt.length - 1; qt >= 0; qt--)
        Gt[qt].age += at, Gt[qt].age >= A0 && Gt.splice(qt, 1);
      !lt.intro || St ? Mt.reveal = 1 : Mt.reveal < 1 && (Mt.reveal = Math.min(1, Mt.reveal + at / I3)), Re(), Qt = requestAnimationFrame(xn);
    }, Ve = () => {
      !Qt && Xe && !document.hidden && (Qt = requestAnimationFrame(xn));
    }, Dn = () => {
      const st = rt.current, lt = Math.max(1, x.clientWidth), at = Math.max(1, x.clientHeight), Tt = Math.min(st.dpr || window.devicePixelRatio || 1, 2);
      Rt.width = lt, Rt.height = at, ft.width = Math.max(1, Math.round(lt * Tt)), ft.height = Math.max(1, Math.round(at * Tt)), Rt.ratio = ft.width / lt, Re(), Ve();
    }, Jn = (st) => {
      const lt = x.getBoundingClientRect(), at = st.clientX - lt.left, Tt = st.clientY - lt.top, it = _t.inside;
      _t.inside = at >= 0 && Tt >= 0 && at <= lt.width && Tt <= lt.height, _t.x = at, _t.y = lt.height - Tt, _t.nx = at / Math.max(1, lt.width) * 2 - 1, _t.ny = -(Tt / Math.max(1, lt.height) * 2 - 1), _t.inside && !it && (_t.sx = _t.x, _t.sy = _t.y);
    }, Yt = (st) => {
      Jn(st), rt.current.paused || Ve();
    }, Jt = (st) => {
      const lt = rt.current;
      Jn(st), !(!_t.inside || !lt.clickBurst || lt.paused || St) && (Gt.push({ x: _t.x, y: _t.y, age: 0 }), Gt.length > ao && Gt.shift(), Ve());
    }, ee = (st) => {
      st.pointerType !== "mouse" && (_t.inside = !1);
    }, Ce = () => {
      _t.inside = !1;
    }, de = () => {
      te = 0, Ve();
    }, Nn = new ResizeObserver(Dn);
    Nn.observe(x);
    const Ke = new IntersectionObserver((st) => {
      Xe = st.some((lt) => lt.isIntersecting), Xe && (te = 0, Ve());
    });
    Ke.observe(x), window.addEventListener("pointermove", Yt, { passive: !0 }), window.addEventListener("pointerdown", Jt, { passive: !0 }), window.addEventListener("pointerup", ee, { passive: !0 }), window.addEventListener("pointercancel", ee, { passive: !0 }), document.documentElement.addEventListener("pointerleave", Ce), document.addEventListener("visibilitychange", de), Dn();
    let Fe = rt.current.dpr;
    return V.current = () => {
      const st = rt.current;
      if (st.dpr !== Fe) {
        Fe = st.dpr, Dn();
        return;
      }
      Qt || Re(), Ve();
    }, () => {
      cancelAnimationFrame(Qt), V.current = null, Nn.disconnect(), Ke.disconnect(), window.removeEventListener("pointermove", Yt), window.removeEventListener("pointerdown", Jt), window.removeEventListener("pointerup", ee), window.removeEventListener("pointercancel", ee), document.documentElement.removeEventListener("pointerleave", Ce), document.removeEventListener("visibilitychange", de), z.deleteProgram(Ht.program), z.deleteProgram(E.program), [A, W, j, pt, ot].forEach((st) => z.deleteBuffer(st)), z.deleteVertexArray(dt), z.deleteVertexArray(wt), ft.isConnected || z.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), Kt.useEffect(() => {
    V.current?.();
  }), /* @__PURE__ */ ie.jsx("div", { ref: gt, className: `particles-container${$ ? ` ${$}` : ""}`, style: yt, children: /* @__PURE__ */ ie.jsx("canvas", { ref: tt, className: "particles-canvas", "aria-hidden": "true" }) });
};
Ie.registerPlugin($t);
const rx = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Oa(c, l) {
  const u = document.getElementById(c);
  if (!u) return null;
  const a = bT.createRoot(u);
  return a.render(l), a;
}
if (!rx) {
  let c = function() {
    const h = Kt.useRef(null);
    return Kt.useEffect(() => {
      const d = (g) => h.current?.spark(g.clientX, g.clientY);
      return document.addEventListener("pointerdown", d), () => document.removeEventListener("pointerdown", d);
    }, []), /* @__PURE__ */ ie.jsx(
      MS,
      {
        ref: h,
        className: "rb-spark",
        sparkColor: "#5F8D6E",
        sparkSize: 7,
        sparkRadius: 16,
        sparkCount: 5,
        duration: 380,
        easing: "ease-out",
        extraScale: 1
      }
    );
  };
  const l = new CT({ duration: 1.05, smoothWheel: !0, touchMultiplier: 1.4 });
  l.on("scroll", $t.update), Ie.ticker.add((h) => l.raf(h * 1e3)), Ie.ticker.lagSmoothing(0), document.querySelectorAll('a[href^="#"]').forEach((h) => {
    h.addEventListener("click", (d) => {
      const g = document.querySelector(h.getAttribute("href"));
      g && (d.preventDefault(), l.scrollTo(g, { offset: -76 }));
    });
  }), Ie.utils.toArray("[data-reveal]").forEach((h) => {
    Ie.fromTo(
      h,
      { opacity: 0, y: 22 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        ease: "power2.out",
        scrollTrigger: { trigger: h, start: "top 90%", once: !0 }
      }
    );
  });
  const u = document.querySelector(".receipt");
  if (u && Ie.to(u, {
    y: -10,
    rotate: -0.35,
    ease: "none",
    scrollTrigger: {
      trigger: ".landing-hero",
      start: "top top",
      end: "bottom top",
      scrub: 0.8
    }
  }), u) {
    const h = u.querySelectorAll(".receipt-head, .receipt-title, .receipt-sub, .receipt-rows > div, .receipt-share, .receipt-foot");
    Ie.fromTo(h, { opacity: 0, y: 10 }, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: { trigger: ".landing-hero", start: "top 70%", once: !0 }
    });
  }
  Oa(
    "rb-particles",
    /* @__PURE__ */ ie.jsx(
      ux,
      {
        particleCount: 45,
        particleSpread: 8,
        speed: 0.12,
        particleColors: ["#5F8D6E", "#85B395"],
        particleBaseSize: 40,
        sizeRandomness: 0.6,
        cameraDistance: 22,
        moveParticlesOnHover: !1,
        clickBurst: !1,
        glow: 0.15,
        twinkle: 0.2,
        opacity: 0.5,
        lightMode: !1
      }
    )
  ), Oa("rb-magnet-1", /* @__PURE__ */ ie.jsx(Z1, { magnetStrength: 1.4, padding: 40, children: /* @__PURE__ */ ie.jsxs("a", { className: "btn", href: "/register", children: [
    /* @__PURE__ */ ie.jsx("svg", { width: "18", height: "18", children: /* @__PURE__ */ ie.jsx("use", { href: "#i-bolt" }) }),
    " Inizia gratis"
  ] }) })), Oa("rb-magnet-2", /* @__PURE__ */ ie.jsx(Z1, { magnetStrength: 1.4, padding: 40, children: /* @__PURE__ */ ie.jsx("a", { className: "btn ghost", href: "/demo", children: "Prova la demo" }) })), Oa(
    "rb-title",
    /* @__PURE__ */ ie.jsx(
      V1,
      {
        text: "Dividi le spese.",
        tag: "span",
        className: "rb-title",
        splitType: "chars",
        trigger: "load",
        duration: 0.75,
        delay: 28,
        ease: "power3.out",
        from: { opacity: 0, yPercent: 70 },
        to: { opacity: 1, yPercent: 0 },
        color: "currentColor",
        hoverEffect: "none"
      }
    )
  ), Oa(
    "rb-accent",
    /* @__PURE__ */ ie.jsx(
      V1,
      {
        text: "Tutto torna.",
        tag: "span",
        className: "rb-accent",
        splitType: "words",
        trigger: "load",
        duration: 0.85,
        delay: 60,
        ease: "power3.out",
        from: { opacity: 0, yPercent: 55, rotate: 2 },
        to: { opacity: 1, yPercent: 0, rotate: 0 },
        color: "#5F8D6E",
        accentColor: "#85B395",
        hoverEffect: "none"
      }
    )
  );
  const a = [
    { icon: "i-globe", title: "125 valute", text: "Ogni spesa resta nella sua valuta. I saldi del gruppo usano la valuta che scegli tu." },
    { icon: "i-wallet", title: "Pagamenti parziali", text: "“Ha saldato 20 su 47,50”. Registra le rate senza aspettare di chiudere tutto." },
    { icon: "i-swap", title: "Pochi bonifici", text: "Ti diciamo chi paga chi con il numero più basso di trasferimenti possibile." },
    { icon: "i-calendar", title: "Spese ricorrenti", text: "Affitto, bollette, abbonamenti: la spesa torna pronta ogni mese." },
    { icon: "i-users", title: "Ruoli chiari", text: "Chi amministra, chi inserisce, chi legge soltanto. Tutto dal gruppo." },
    { icon: "i-check", title: "Storico trasparente", text: "Le spese annullate restano visibili in grigio: nessuno riscrive la storia." }
  ];
  Oa(
    "rb-features",
    /* @__PURE__ */ ie.jsx("div", { className: "feature-grid", children: a.map((h, d) => /* @__PURE__ */ ie.jsxs(
      R3,
      {
        className: "card feature rb-feature",
        spotlightColor: "rgba(95, 141, 110, 0.28)",
        intensity: 0.22,
        spotlightSize: 260,
        theme: "light",
        flare: !1,
        grain: 0.03,
        children: [
          /* @__PURE__ */ ie.jsx("span", { className: "ficon", children: /* @__PURE__ */ ie.jsx("svg", { width: "22", height: "22", children: /* @__PURE__ */ ie.jsx("use", { href: `#${h.icon}` }) }) }),
          /* @__PURE__ */ ie.jsxs("div", { children: [
            /* @__PURE__ */ ie.jsx("span", { className: "rb-feature-num", children: String(d + 1).padStart(2, "0") }),
            /* @__PURE__ */ ie.jsx("h3", { children: h.title }),
            /* @__PURE__ */ ie.jsx("p", { className: "muted", children: h.text })
          ] })
        ]
      },
      h.title
    )) })
  ), Oa(
    "rb-steps",
    /* @__PURE__ */ ie.jsx(q3, { effect: "fade", blur: !1, duration: 0.8, stagger: 90, threshold: 0.12, children: /* @__PURE__ */ ie.jsx("div", { className: "step-grid", children: [
      ["01", "Crea il gruppo", "Dai un nome e scegli la valuta dei saldi."],
      ["02", "Invita gli altri", "Link, QR o username. Nessuna rubrica caricata."],
      ["03", "Chiudi i conti", "Bonifici minimi e storico sempre visibile."]
    ].map(([h, d, g]) => /* @__PURE__ */ ie.jsxs("div", { className: "step-card", children: [
      /* @__PURE__ */ ie.jsx("span", { className: "step-num", children: h }),
      /* @__PURE__ */ ie.jsx("h3", { children: d }),
      /* @__PURE__ */ ie.jsx("p", { className: "muted", children: g })
    ] }, h)) }) })
  ), Oa("rb-spark", /* @__PURE__ */ ie.jsx(c, {}));
  let s = 0;
  const f = () => {
    ["rb-title", "rb-accent"].forEach((h) => {
      const d = document.getElementById(h);
      d && d.hasAttribute("aria-label") && d.setAttribute("role", "img");
    }), ++s < 12 && window.setTimeout(f, 250);
  };
  window.setTimeout(f, 300);
}
