var Qd = { exports: {} }, xs = {};
var Sv;
function Ab() {
  if (Sv) return xs;
  Sv = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
  function u(a, s, c) {
    var h = null;
    if (c !== void 0 && (h = "" + c), s.key !== void 0 && (h = "" + s.key), "key" in s) {
      c = {};
      for (var d in s)
        d !== "key" && (c[d] = s[d]);
    } else c = s;
    return s = c.ref, {
      $$typeof: f,
      type: a,
      key: h,
      ref: s !== void 0 ? s : null,
      props: c
    };
  }
  return xs.Fragment = i, xs.jsx = u, xs.jsxs = u, xs;
}
var bv;
function wb() {
  return bv || (bv = 1, Qd.exports = Ab()), Qd.exports;
}
var ee = wb(), Zd = { exports: {} }, Nt = {};
var Tv;
function Cb() {
  if (Tv) return Nt;
  Tv = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), s = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), _ = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), v = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), b = Symbol.iterator;
  function M(x) {
    return x === null || typeof x != "object" ? null : (x = b && x[b] || x["@@iterator"], typeof x == "function" ? x : null);
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
  }, w = Object.assign, G = {};
  function q(x, O, J) {
    this.props = x, this.context = O, this.refs = G, this.updater = J || T;
  }
  q.prototype.isReactComponent = {}, q.prototype.setState = function(x, O) {
    if (typeof x != "object" && typeof x != "function" && x != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, x, O, "setState");
  }, q.prototype.forceUpdate = function(x) {
    this.updater.enqueueForceUpdate(this, x, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = q.prototype;
  function B(x, O, J) {
    this.props = x, this.context = O, this.refs = G, this.updater = J || T;
  }
  var j = B.prototype = new Z();
  j.constructor = B, w(j, q.prototype), j.isPureReactComponent = !0;
  var k = Array.isArray;
  function R() {
  }
  var Q = { H: null, A: null, T: null, S: null }, $ = Object.prototype.hasOwnProperty;
  function V(x, O, J) {
    var L = J.ref;
    return {
      $$typeof: f,
      type: x,
      key: O,
      ref: L !== void 0 ? L : null,
      props: J
    };
  }
  function nt(x, O) {
    return V(x.type, O, x.props);
  }
  function lt(x) {
    return typeof x == "object" && x !== null && x.$$typeof === f;
  }
  function ft(x) {
    var O = { "=": "=0", ":": "=2" };
    return "$" + x.replace(/[=:]/g, function(J) {
      return O[J];
    });
  }
  var pt = /\/+/g;
  function et(x, O) {
    return typeof x == "object" && x !== null && x.key != null ? ft("" + x.key) : O.toString(36);
  }
  function K(x) {
    switch (x.status) {
      case "fulfilled":
        return x.value;
      case "rejected":
        throw x.reason;
      default:
        switch (typeof x.status == "string" ? x.then(R, R) : (x.status = "pending", x.then(
          function(O) {
            x.status === "pending" && (x.status = "fulfilled", x.value = O);
          },
          function(O) {
            x.status === "pending" && (x.status = "rejected", x.reason = O);
          }
        )), x.status) {
          case "fulfilled":
            return x.value;
          case "rejected":
            throw x.reason;
        }
    }
    throw x;
  }
  function P(x, O, J, L, rt) {
    var ut = typeof x;
    (ut === "undefined" || ut === "boolean") && (x = null);
    var bt = !1;
    if (x === null) bt = !0;
    else
      switch (ut) {
        case "bigint":
        case "string":
        case "number":
          bt = !0;
          break;
        case "object":
          switch (x.$$typeof) {
            case f:
            case i:
              bt = !0;
              break;
            case p:
              return bt = x._init, P(
                bt(x._payload),
                O,
                J,
                L,
                rt
              );
          }
      }
    if (bt)
      return rt = rt(x), bt = L === "" ? "." + et(x, 0) : L, k(rt) ? (J = "", bt != null && (J = bt.replace(pt, "$&/") + "/"), P(rt, O, J, "", function(Tt) {
        return Tt;
      })) : rt != null && (lt(rt) && (rt = nt(
        rt,
        J + (rt.key == null || x && x.key === rt.key ? "" : ("" + rt.key).replace(
          pt,
          "$&/"
        ) + "/") + bt
      )), O.push(rt)), 1;
    bt = 0;
    var it = L === "" ? "." : L + ":";
    if (k(x))
      for (var ct = 0; ct < x.length; ct++)
        L = x[ct], ut = it + et(L, ct), bt += P(
          L,
          O,
          J,
          ut,
          rt
        );
    else if (ct = M(x), typeof ct == "function")
      for (x = ct.call(x), ct = 0; !(L = x.next()).done; )
        L = L.value, ut = it + et(L, ct++), bt += P(
          L,
          O,
          J,
          ut,
          rt
        );
    else if (ut === "object") {
      if (typeof x.then == "function")
        return P(
          K(x),
          O,
          J,
          L,
          rt
        );
      throw O = String(x), Error(
        "Objects are not valid as a React child (found: " + (O === "[object Object]" ? "object with keys {" + Object.keys(x).join(", ") + "}" : O) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return bt;
  }
  function I(x, O, J) {
    if (x == null) return x;
    var L = [], rt = 0;
    return P(x, L, "", "", function(ut) {
      return O.call(J, ut, rt++);
    }), L;
  }
  function st(x) {
    if (x._status === -1) {
      var O = x._result, J = O();
      J.then(
        function(L) {
          (x._status === 0 || x._status === -1) && (x._status = 1, x._result = L, J.status === void 0 && (J.status = "fulfilled", J.value = L));
        },
        function(L) {
          (x._status === 0 || x._status === -1) && (x._status = 2, x._result = L, J.status === void 0 && (J.status = "rejected", J.reason = L));
        }
      ), x._status === -1 && (x._status = 0, x._result = J);
    }
    if (x._status === 1) return x._result.default;
    throw x._result;
  }
  var z = typeof reportError == "function" ? reportError : function(x) {
    if (typeof window == "object" && typeof window.ErrorEvent == "function") {
      var O = new window.ErrorEvent("error", {
        bubbles: !0,
        cancelable: !0,
        message: typeof x == "object" && x !== null && typeof x.message == "string" ? String(x.message) : String(x),
        error: x
      });
      if (!window.dispatchEvent(O)) return;
    } else if (typeof process == "object" && typeof process.emit == "function") {
      process.emit("uncaughtException", x);
      return;
    }
    console.error(x);
  };
  function _t(x) {
    var O = Q.T, J = {};
    J.types = O !== null ? O.types : null, Q.T = J;
    try {
      var L = x(), rt = Q.S;
      rt !== null && rt(J, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(R, z);
    } catch (ut) {
      z(ut);
    } finally {
      O !== null && J.types !== null && (O.types = J.types), Q.T = O;
    }
  }
  function dt(x) {
    var O = Q.T;
    if (O !== null) {
      var J = O.types;
      J === null ? O.types = [x] : J.indexOf(x) === -1 && J.push(x);
    } else _t(dt.bind(null, x));
  }
  var Mt = {
    map: I,
    forEach: function(x, O, J) {
      I(
        x,
        function() {
          O.apply(this, arguments);
        },
        J
      );
    },
    count: function(x) {
      var O = 0;
      return I(x, function() {
        O++;
      }), O;
    },
    toArray: function(x) {
      return I(x, function(O) {
        return O;
      }) || [];
    },
    only: function(x) {
      if (!lt(x))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return x;
    }
  };
  return Nt.Activity = v, Nt.Children = Mt, Nt.Component = q, Nt.Fragment = u, Nt.Profiler = s, Nt.PureComponent = B, Nt.StrictMode = a, Nt.Suspense = g, Nt.ViewTransition = S, Nt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = Q, Nt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(x) {
      return Q.H.useMemoCache(x);
    }
  }, Nt.addTransitionType = dt, Nt.cache = function(x) {
    return function() {
      return x.apply(null, arguments);
    };
  }, Nt.cacheSignal = function() {
    return null;
  }, Nt.cloneElement = function(x, O, J) {
    if (x == null)
      throw Error(
        "The argument must be a React element, but you passed " + x + "."
      );
    var L = w({}, x.props), rt = x.key;
    if (O != null)
      for (ut in O.key !== void 0 && (rt = "" + O.key), O)
        !$.call(O, ut) || ut === "key" || ut === "__self" || ut === "__source" || ut === "ref" && O.ref === void 0 || (L[ut] = O[ut]);
    var ut = arguments.length - 2;
    if (ut === 1) L.children = J;
    else if (1 < ut) {
      for (var bt = Array(ut), it = 0; it < ut; it++)
        bt[it] = arguments[it + 2];
      L.children = bt;
    }
    return V(x.type, rt, L);
  }, Nt.createContext = function(x) {
    return x = {
      $$typeof: h,
      _currentValue: x,
      _currentValue2: x,
      _threadCount: 0,
      Provider: null,
      Consumer: null
    }, x.Provider = x, x.Consumer = {
      $$typeof: c,
      _context: x
    }, x;
  }, Nt.createElement = function(x, O, J) {
    var L, rt = {}, ut = null;
    if (O != null)
      for (L in O.key !== void 0 && (ut = "" + O.key), O)
        $.call(O, L) && L !== "key" && L !== "__self" && L !== "__source" && (rt[L] = O[L]);
    var bt = arguments.length - 2;
    if (bt === 1) rt.children = J;
    else if (1 < bt) {
      for (var it = Array(bt), ct = 0; ct < bt; ct++)
        it[ct] = arguments[ct + 2];
      rt.children = it;
    }
    if (x && x.defaultProps)
      for (L in bt = x.defaultProps, bt)
        rt[L] === void 0 && (rt[L] = bt[L]);
    return V(x, ut, rt);
  }, Nt.createRef = function() {
    return { current: null };
  }, Nt.forwardRef = function(x) {
    return { $$typeof: d, render: x };
  }, Nt.isValidElement = lt, Nt.lazy = function(x) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: x },
      _init: st
    };
  }, Nt.memo = function(x, O) {
    return {
      $$typeof: _,
      type: x,
      compare: O === void 0 ? null : O
    };
  }, Nt.startTransition = _t, Nt.unstable_useCacheRefresh = function() {
    return Q.H.useCacheRefresh();
  }, Nt.use = function(x) {
    return Q.H.use(x);
  }, Nt.useActionState = function(x, O, J) {
    return Q.H.useActionState(x, O, J);
  }, Nt.useCallback = function(x, O) {
    return Q.H.useCallback(x, O);
  }, Nt.useContext = function(x) {
    return Q.H.useContext(x);
  }, Nt.useDebugValue = function() {
  }, Nt.useDeferredValue = function(x, O) {
    return Q.H.useDeferredValue(x, O);
  }, Nt.useEffect = function(x, O) {
    return Q.H.useEffect(x, O);
  }, Nt.useEffectEvent = function(x) {
    return Q.H.useEffectEvent(x);
  }, Nt.useId = function() {
    return Q.H.useId();
  }, Nt.useImperativeHandle = function(x, O, J) {
    return Q.H.useImperativeHandle(x, O, J);
  }, Nt.useInsertionEffect = function(x, O) {
    return Q.H.useInsertionEffect(x, O);
  }, Nt.useLayoutEffect = function(x, O) {
    return Q.H.useLayoutEffect(x, O);
  }, Nt.useMemo = function(x, O) {
    return Q.H.useMemo(x, O);
  }, Nt.useOptimistic = function(x, O) {
    return Q.H.useOptimistic(x, O);
  }, Nt.useReducer = function(x, O, J) {
    return Q.H.useReducer(x, O, J);
  }, Nt.useRef = function(x) {
    return Q.H.useRef(x);
  }, Nt.useState = function(x) {
    return Q.H.useState(x);
  }, Nt.useSyncExternalStore = function(x, O, J) {
    return Q.H.useSyncExternalStore(
      x,
      O,
      J
    );
  }, Nt.useTransition = function() {
    return Q.H.useTransition();
  }, Nt.version = "19.3.1", Nt;
}
var Ev;
function H0() {
  return Ev || (Ev = 1, Zd.exports = Cb()), Zd.exports;
}
var me = H0(), Kd = { exports: {} }, Ms = {}, Jd = { exports: {} }, kd = {};
var xv;
function Rb() {
  return xv || (xv = 1, (function(f) {
    function i(K, P) {
      var I = K.length;
      K.push(P);
      t: for (; 0 < I; ) {
        var st = I - 1 >>> 1, z = K[st];
        if (0 < s(z, P))
          K[st] = P, K[I] = z, I = st;
        else break t;
      }
    }
    function u(K) {
      return K.length === 0 ? null : K[0];
    }
    function a(K) {
      if (K.length === 0) return null;
      var P = K[0], I = K.pop();
      if (I !== P) {
        K[0] = I;
        t: for (var st = 0, z = K.length, _t = z >>> 1; st < _t; ) {
          var dt = 2 * (st + 1) - 1, Mt = K[dt], x = dt + 1, O = K[x];
          if (0 > s(Mt, I))
            x < z && 0 > s(O, Mt) ? (K[st] = O, K[x] = I, st = x) : (K[st] = Mt, K[dt] = I, st = dt);
          else if (x < z && 0 > s(O, I))
            K[st] = O, K[x] = I, st = x;
          else break t;
        }
      }
      return P;
    }
    function s(K, P) {
      var I = K.sortIndex - P.sortIndex;
      return I !== 0 ? I : K.id - P.id;
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
    var g = [], _ = [], p = 1, v = null, S = 3, b = !1, M = !1, T = !1, w = !1, G = typeof setTimeout == "function" ? setTimeout : null, q = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
    function B(K) {
      for (var P = u(_); P !== null; ) {
        if (P.callback === null) a(_);
        else if (P.startTime <= K)
          a(_), P.sortIndex = P.expirationTime, i(g, P);
        else break;
        P = u(_);
      }
    }
    function j(K) {
      if (T = !1, B(K), !M)
        if (u(g) !== null)
          M = !0, k || (k = !0, lt());
        else {
          var P = u(_);
          P !== null && et(j, P.startTime - K);
        }
    }
    var k = !1, R = -1, Q = 5, $ = -1;
    function V() {
      return w ? !0 : !(f.unstable_now() - $ < Q);
    }
    function nt() {
      if (w = !1, k) {
        var K = f.unstable_now();
        $ = K;
        var P = !0;
        try {
          t: {
            M = !1, T && (T = !1, q(R), R = -1), b = !0;
            var I = S;
            try {
              e: {
                for (B(K), v = u(g); v !== null && !(v.expirationTime > K && V()); ) {
                  var st = v.callback;
                  if (typeof st == "function") {
                    v.callback = null, S = v.priorityLevel;
                    var z = st(
                      v.expirationTime <= K
                    );
                    if (K = f.unstable_now(), typeof z == "function") {
                      v.callback = z, B(K), P = !0;
                      break e;
                    }
                    v === u(g) && a(g), B(K);
                  } else a(g);
                  v = u(g);
                }
                if (v !== null) P = !0;
                else {
                  var _t = u(_);
                  _t !== null && et(
                    j,
                    _t.startTime - K
                  ), P = !1;
                }
              }
              break t;
            } finally {
              v = null, S = I, b = !1;
            }
            P = void 0;
          }
        } finally {
          P ? lt() : k = !1;
        }
      }
    }
    var lt;
    if (typeof Z == "function")
      lt = function() {
        Z(nt);
      };
    else if (typeof MessageChannel < "u") {
      var ft = new MessageChannel(), pt = ft.port2;
      ft.port1.onmessage = nt, lt = function() {
        pt.postMessage(null);
      };
    } else
      lt = function() {
        G(nt, 0);
      };
    function et(K, P) {
      R = G(function() {
        K(f.unstable_now());
      }, P);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(K) {
      K.callback = null;
    }, f.unstable_forceFrameRate = function(K) {
      0 > K || 125 < K ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : Q = 0 < K ? Math.floor(1e3 / K) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, f.unstable_next = function(K) {
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
        return K();
      } finally {
        S = I;
      }
    }, f.unstable_requestPaint = function() {
      w = !0;
    }, f.unstable_runWithPriority = function(K, P) {
      switch (K) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          K = 3;
      }
      var I = S;
      S = K;
      try {
        return P();
      } finally {
        S = I;
      }
    }, f.unstable_scheduleCallback = function(K, P, I) {
      var st = f.unstable_now();
      switch (typeof I == "object" && I !== null ? (I = I.delay, I = typeof I == "number" && 0 < I ? st + I : st) : I = st, K) {
        case 1:
          var z = -1;
          break;
        case 2:
          z = 250;
          break;
        case 5:
          z = 1073741823;
          break;
        case 4:
          z = 1e4;
          break;
        default:
          z = 5e3;
      }
      return z = I + z, K = {
        id: p++,
        callback: P,
        priorityLevel: K,
        startTime: I,
        expirationTime: z,
        sortIndex: -1
      }, I > st ? (K.sortIndex = I, i(_, K), u(g) === null && K === u(_) && (T ? (q(R), R = -1) : T = !0, et(j, I - st))) : (K.sortIndex = z, i(g, K), M || b || (M = !0, k || (k = !0, lt()))), K;
    }, f.unstable_shouldYield = V, f.unstable_wrapCallback = function(K) {
      var P = S;
      return function() {
        var I = S;
        S = P;
        try {
          return K.apply(this, arguments);
        } finally {
          S = I;
        }
      };
    };
  })(kd)), kd;
}
var Mv;
function Db() {
  return Mv || (Mv = 1, Jd.exports = Rb()), Jd.exports;
}
var Fd = { exports: {} }, Sn = {};
var Ov;
function Nb() {
  if (Ov) return Sn;
  Ov = 1;
  var f = H0();
  function i(p) {
    var v = "https://react.dev/errors/" + p;
    if (1 < arguments.length) {
      v += "?args[]=" + encodeURIComponent(arguments[1]);
      for (var S = 2; S < arguments.length; S++)
        v += "&args[]=" + encodeURIComponent(arguments[S]);
    }
    return "Minified React error #" + p + "; visit " + v + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  function u() {
  }
  var a = {
    d: {
      f: u,
      r: function() {
        throw Error(i(522));
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
  }, s = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function d(p, v, S) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: s,
      key: b == null ? null : b === h ? h : "" + b,
      children: p,
      containerInfo: v,
      implementation: S
    };
  }
  var g = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function _(p, v) {
    if (p === "font") return "";
    if (typeof v == "string")
      return v === "use-credentials" ? v : "";
  }
  return Sn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Sn.browser = function(p) {
    return { $$typeof: c, _reason: p };
  }, Sn.createPortal = function(p, v) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!v || v.nodeType !== 1 && v.nodeType !== 9 && v.nodeType !== 11)
      throw Error(i(299));
    return d(p, v, null, S);
  }, Sn.flushSync = function(p) {
    var v = g.T, S = a.p;
    try {
      if (g.T = null, a.p = 2, p) return p();
    } finally {
      g.T = v, a.p = S, a.d.f();
    }
  }, Sn.preconnect = function(p, v) {
    typeof p == "string" && (v ? (v = v.crossOrigin, v = typeof v == "string" ? v === "use-credentials" ? v : "" : void 0) : v = null, a.d.C(p, v));
  }, Sn.prefetchDNS = function(p) {
    typeof p == "string" && a.d.D(p);
  }, Sn.preinit = function(p, v) {
    if (typeof p == "string" && v && typeof v.as == "string") {
      var S = v.as, b = _(S, v.crossOrigin), M = typeof v.integrity == "string" ? v.integrity : void 0, T = typeof v.fetchPriority == "string" ? v.fetchPriority : void 0;
      S === "style" ? a.d.S(
        p,
        typeof v.precedence == "string" ? v.precedence : void 0,
        {
          crossOrigin: b,
          integrity: M,
          fetchPriority: T
        }
      ) : S === "script" && a.d.X(p, {
        crossOrigin: b,
        integrity: M,
        fetchPriority: T,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0
      });
    }
  }, Sn.preinitModule = function(p, v) {
    if (typeof p == "string")
      if (typeof v == "object" && v !== null) {
        if (v.as == null || v.as === "script") {
          var S = _(
            v.as,
            v.crossOrigin
          );
          a.d.M(p, {
            crossOrigin: S,
            integrity: typeof v.integrity == "string" ? v.integrity : void 0,
            nonce: typeof v.nonce == "string" ? v.nonce : void 0,
            fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
          });
        }
      } else v == null && a.d.M(p);
  }, Sn.preload = function(p, v) {
    if (typeof p == "string" && typeof v == "object" && v !== null && typeof v.as == "string") {
      var S = v.as, b = _(S, v.crossOrigin);
      a.d.L(p, S, {
        crossOrigin: b,
        integrity: typeof v.integrity == "string" ? v.integrity : void 0,
        nonce: typeof v.nonce == "string" ? v.nonce : void 0,
        type: typeof v.type == "string" ? v.type : void 0,
        fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0,
        referrerPolicy: typeof v.referrerPolicy == "string" ? v.referrerPolicy : void 0,
        imageSrcSet: typeof v.imageSrcSet == "string" ? v.imageSrcSet : void 0,
        imageSizes: typeof v.imageSizes == "string" ? v.imageSizes : void 0,
        media: typeof v.media == "string" ? v.media : void 0
      });
    }
  }, Sn.preloadModule = function(p, v) {
    if (typeof p == "string")
      if (v) {
        var S = _(v.as, v.crossOrigin);
        a.d.m(p, {
          as: typeof v.as == "string" && v.as !== "script" ? v.as : void 0,
          crossOrigin: S,
          integrity: typeof v.integrity == "string" ? v.integrity : void 0,
          nonce: typeof v.nonce == "string" ? v.nonce : void 0,
          fetchPriority: typeof v.fetchPriority == "string" ? v.fetchPriority : void 0
        });
      } else a.d.m(p);
  }, Sn.requestFormReset = function(p) {
    a.d.r(p);
  }, Sn.unstable_batchedUpdates = function(p, v) {
    return p(v);
  }, Sn.useFormState = function(p, v, S) {
    return g.H.useFormState(p, v, S);
  }, Sn.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, Sn.version = "19.3.1", Sn;
}
var zv;
function y1() {
  if (zv) return Fd.exports;
  zv = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (i) {
        console.error(i);
      }
  }
  return f(), Fd.exports = Nb(), Fd.exports;
}
var Av;
function Ub() {
  if (Av) return Ms;
  Av = 1;
  var f = Db(), i = H0(), u = y1();
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
  function _(t) {
    var e = t.alternate;
    if (!e) {
      if (e = c(t), e === null) throw Error(a(188));
      return e !== t ? null : t;
    }
    for (var n = t, l = e; ; ) {
      var r = n.return;
      if (r === null) break;
      var o = r.alternate;
      if (o === null) {
        if (l = r.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (r.child === o.child) {
        for (o = r.child; o; ) {
          if (o === n) return g(r), t;
          if (o === l) return g(r), e;
          o = o.sibling;
        }
        throw Error(a(188));
      }
      if (n.return !== l.return) n = r, l = o;
      else {
        for (var m = !1, y = r.child; y; ) {
          if (y === n) {
            m = !0, n = r, l = o;
            break;
          }
          if (y === l) {
            m = !0, l = r, n = o;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = o.child; y; ) {
            if (y === n) {
              m = !0, n = o, l = r;
              break;
            }
            if (y === l) {
              m = !0, l = o, n = r;
              break;
            }
            y = y.sibling;
          }
          if (!m) throw Error(a(189));
        }
      }
      if (n.alternate !== l) throw Error(a(190));
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
  function v(t, e, n, l, r, o) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, l, r, o) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && v(
        t.child,
        e,
        n,
        l,
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
  function T(t, e, n, l) {
    for (; n !== null; ) {
      if (n === e) l.foundSelf = !0;
      else if (n.tag === 5 || n.tag === 27 || n.tag === 6) {
        if (l.foundSelf) return t[1] = n, !0;
        t[0] = n;
      } else if ((n.tag !== 22 || n.memoizedState === null) && T(
        t,
        e,
        n.child,
        l
      ))
        return !0;
      n = n.sibling;
    }
    return !1;
  }
  function w(t) {
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
  function Z(t, e, n) {
    return t === n ? !0 : t === e ? (G = t, !0) : !1;
  }
  function B(t, e, n) {
    return t === n ? (q = t, !1) : t === e ? (q !== null && (G = t), !0) : !1;
  }
  function j(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function k(t, e, n) {
    for (var l = 0, r = t; r; r = n(r)) l++;
    r = 0;
    for (var o = e; o; o = n(o)) r++;
    for (; 0 < l - r; ) t = n(t), l--;
    for (; 0 < r - l; ) e = n(e), r--;
    for (; l--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var R = Object.assign, Q = /* @__PURE__ */ Symbol.for("react.element"), $ = /* @__PURE__ */ Symbol.for("react.transitional.element"), V = /* @__PURE__ */ Symbol.for("react.portal"), nt = /* @__PURE__ */ Symbol.for("react.fragment"), lt = /* @__PURE__ */ Symbol.for("react.strict_mode"), ft = /* @__PURE__ */ Symbol.for("react.profiler"), pt = /* @__PURE__ */ Symbol.for("react.consumer"), et = /* @__PURE__ */ Symbol.for("react.context"), K = /* @__PURE__ */ Symbol.for("react.forward_ref"), P = /* @__PURE__ */ Symbol.for("react.suspense"), I = /* @__PURE__ */ Symbol.for("react.suspense_list"), st = /* @__PURE__ */ Symbol.for("react.memo"), z = /* @__PURE__ */ Symbol.for("react.lazy"), _t = /* @__PURE__ */ Symbol.for("react.activity"), dt = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Mt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), x = /* @__PURE__ */ Symbol.for("react.view_transition"), O = /* @__PURE__ */ Symbol.for("react.recoverable"), J = Symbol.iterator;
  function L(t) {
    return t === null || typeof t != "object" ? null : (t = J && t[J] || t["@@iterator"], typeof t == "function" ? t : null);
  }
  var rt = /* @__PURE__ */ Symbol.for("react.client.reference");
  function ut(t) {
    if (t == null) return null;
    if (typeof t == "function")
      return t.$$typeof === rt ? null : t.displayName || t.name || null;
    if (typeof t == "string") return t;
    switch (t) {
      case nt:
        return "Fragment";
      case ft:
        return "Profiler";
      case lt:
        return "StrictMode";
      case P:
        return "Suspense";
      case I:
        return "SuspenseList";
      case _t:
        return "Activity";
      case x:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case V:
          return "Portal";
        case et:
          return t.displayName || "Context";
        case pt:
          return (t._context.displayName || "Context") + ".Consumer";
        case K:
          var e = t.render;
          return t = t.displayName, t || (t = e.displayName || e.name || "", t = t !== "" ? "ForwardRef(" + t + ")" : "ForwardRef"), t;
        case st:
          return e = t.displayName || null, e !== null ? e : ut(t.type) || "Memo";
        case z:
          e = t._payload, t = t._init;
          try {
            return ut(t(e));
          } catch {
          }
      }
    return null;
  }
  var bt = Array.isArray, it = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ct = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, Tt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, ht = [], Ot = -1;
  function Ct(t) {
    return { current: t };
  }
  function U(t) {
    0 > Ot || (t.current = ht[Ot], ht[Ot] = null, Ot--);
  }
  function tt(t, e) {
    Ot++, ht[Ot] = t.current, t.current = e;
  }
  var mt = Ct(null), xt = Ct(null), At = Ct(null), Wt = Ct(null);
  function Kt(t, e) {
    switch (tt(At, e), tt(xt, t), tt(mt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? w_(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = w_(e), t = C_(e, t);
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
    U(mt), tt(mt, t);
  }
  function It() {
    U(mt), U(xt), U(At);
  }
  function Gt(t) {
    var e = t.memoizedState;
    e !== null && (sr._currentValue = e.memoizedState, tt(Wt, t)), e = mt.current;
    var n = C_(e, t.type);
    e !== n && (tt(xt, t), tt(mt, n));
  }
  function le(t) {
    xt.current === t && (U(mt), U(xt)), Wt.current === t && (U(Wt), sr._currentValue = Tt);
  }
  var oe, hn;
  function Oe(t) {
    if (oe === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        oe = e && e[1] || "", hn = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + oe + t + hn;
  }
  var En = !1;
  function Ml(t, e) {
    if (!t || En) return "";
    En = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var W = function() {
                throw Error();
              };
              if (Object.defineProperty(W.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(W, []);
                } catch (ot) {
                  var C = ot;
                }
                Reflect.construct(t, [], W);
              } else {
                try {
                  W.call();
                } catch (ot) {
                  C = ot;
                }
                W = !1;
                try {
                  var Y = Object.getOwnPropertyDescriptor(
                    t.prototype,
                    "props"
                  );
                  Object.defineProperty(t.prototype, "props", {
                    configurable: !0,
                    set: function() {
                      throw Error();
                    }
                  }), W = !0, new t();
                } finally {
                  W && (Y !== void 0 ? Object.defineProperty(t.prototype, "props", Y) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (ot) {
                C = ot;
              }
              (W = t()) && typeof W.catch == "function" && W.catch(function() {
              });
            }
          } catch (ot) {
            if (ot && C && typeof ot.stack == "string")
              return [ot.stack, C.stack];
          }
          return [null, null];
        }
      };
      l.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
      var r = Object.getOwnPropertyDescriptor(
        l.DetermineComponentFrameRoot,
        "name"
      );
      r && r.configurable && Object.defineProperty(
        l.DetermineComponentFrameRoot,
        "name",
        { value: "DetermineComponentFrameRoot" }
      );
      var o = l.DetermineComponentFrameRoot(), m = o[0], y = o[1];
      if (m && y) {
        var E = m.split(`
`), N = y.split(`
`);
        for (r = l = 0; l < E.length && !E[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; r < N.length && !N[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (l === E.length || r === N.length)
          for (l = E.length - 1, r = N.length - 1; 1 <= l && 0 <= r && E[l] !== N[r]; )
            r--;
        for (; 1 <= l && 0 <= r; l--, r--)
          if (E[l] !== N[r]) {
            if (l !== 1 || r !== 1)
              do
                if (l--, r--, 0 > r || E[l] !== N[r]) {
                  var X = `
` + E[l].replace(" at new ", " at ");
                  return t.displayName && X.includes("<anonymous>") && (X = X.replace("<anonymous>", t.displayName)), X;
                }
              while (1 <= l && 0 <= r);
            break;
          }
      }
    } finally {
      En = !1, Error.prepareStackTrace = n;
    }
    return (n = t ? t.displayName || t.name : "") ? Oe(n) : "";
  }
  function Me(t, e) {
    switch (t.tag) {
      case 26:
      case 27:
      case 5:
        return Oe(t.type);
      case 16:
        return Oe("Lazy");
      case 13:
        return t.child !== e && e !== null ? Oe("Suspense Fallback") : Oe("Suspense");
      case 19:
        return Oe("SuspenseList");
      case 0:
      case 15:
        return Ml(t.type, !1);
      case 11:
        return Ml(t.type.render, !1);
      case 1:
        return Ml(t.type, !0);
      case 31:
        return Oe("Activity");
      case 30:
        return Oe("ViewTransition");
      default:
        return "";
    }
  }
  function Wl(t) {
    try {
      var e = "", n = null;
      do
        e += Me(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var $e = Object.prototype.hasOwnProperty, Ol = f.unstable_scheduleCallback, Vn = f.unstable_cancelCallback, $l = f.unstable_shouldYield, yi = f.unstable_requestPaint, wt = f.unstable_now, Si = f.unstable_getCurrentPriorityLevel, jn = f.unstable_ImmediatePriority, Qn = f.unstable_UserBlockingPriority, xn = f.unstable_NormalPriority, bi = f.unstable_LowPriority, Ti = f.unstable_IdlePriority, Vl = f.log, Ha = f.unstable_setDisableYieldValue, Dt = null, St = null;
  function Lt(t) {
    if (typeof Vl == "function" && Ha(t), St && typeof St.setStrictMode == "function")
      try {
        St.setStrictMode(Dt, t);
      } catch {
      }
  }
  var at = Math.clz32 ? Math.clz32 : Ht, Ut = Math.log, zt = Math.LN2;
  function Ht(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (Ut(t) / zt | 0) | 0;
  }
  var Ce = 256, qt = 262144, Se = 4194304;
  function ze(t) {
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
  function _e(t, e, n) {
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var r = 0, o = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var y = l & 134217727;
    return y !== 0 ? (l = y & ~o, l !== 0 ? r = ze(l) : (m &= y, m !== 0 ? r = ze(m) : n || (n = y & ~t, n !== 0 && (r = ze(n))))) : (y = l & ~o, y !== 0 ? r = ze(y) : m !== 0 ? r = ze(m) : n || (n = l & ~t, n !== 0 && (r = ze(n)))), r === 0 ? 0 : e !== 0 && e !== r && (e & o) === 0 && (o = r & -r, n = e & -e, o >= n || o === 32 && (n & 4194048) !== 0) ? e : r;
  }
  function ae(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function ue(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var l = 31 - at(n), r = 1 << l;
        e |= t[l], n &= ~r;
      }
    return e;
  }
  function il(t, e) {
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
  function be() {
    var t = Se;
    return Se <<= 1, (Se & 62914560) === 0 && (Se = 4194304), t;
  }
  function dn(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Mn(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ie(t, e, n, l, r, o) {
    var m = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var y = t.entanglements, E = t.expirationTimes, N = t.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var X = 31 - at(n), W = 1 << X;
      y[X] = 0, E[X] = -1;
      var C = N[X];
      if (C !== null)
        for (N[X] = null, X = 0; X < C.length; X++) {
          var Y = C[X];
          Y !== null && (Y.lane &= -536870913);
        }
      n &= ~W;
    }
    l !== 0 && Ve(t, l, 0), o !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= o & ~(m & ~e));
  }
  function Ve(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - at(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
  }
  function tn(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - at(n), r = 1 << l;
      r & e | t[l] & e && (t[l] |= e), n &= ~r;
    }
  }
  function Il(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : Qi(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function Qi(t) {
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
  function je(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function He() {
    var t = ct.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : dv(t.type));
  }
  function al(t, e) {
    var n = ct.p;
    try {
      return ct.p = t, e();
    } finally {
      ct.p = n;
    }
  }
  var ul = Math.random().toString(36).slice(2), Qe = "__reactFiber$" + ul, Ze = "__reactProps$" + ul, mn = "__reactContainer$" + ul, Zi = "__reactEvents$" + ul, Tu = "__reactListeners$" + ul, ti = "__reactHandles$" + ul, om = "__reactResources$" + ul, Ur = "__reactMarker$" + ul, oo = "__reactLoad$" + ul;
  function co(t) {
    delete t[Qe], delete t[Ze], delete t[Tu], delete t[ti];
  }
  function Ya(t) {
    var e;
    if (e = t[Qe]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[mn] || n[Qe]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = J_(t); t !== null; ) {
            if (n = t[Qe]) return n;
            t = J_(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function Eu(t) {
    if (t = t[Qe] || t[mn]) {
      var e = t.tag;
      if (e === 5 || e === 6 || e === 13 || e === 31 || e === 26 || e === 27 || e === 3)
        return t;
    }
    return null;
  }
  function Hr(t) {
    var e = t.tag;
    if (e === 5 || e === 26 || e === 27 || e === 6) return t.stateNode;
    throw Error(a(33));
  }
  function xu(t) {
    var e = t[om];
    return e || (e = t[om] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function an(t) {
    t[Ur] = !0;
  }
  function cm(t) {
    t[oo] = void 0;
  }
  var fm = /* @__PURE__ */ new Set(), hm = {};
  function Ba(t, e) {
    Mu(t, e), Mu(t + "Capture", e);
  }
  function Mu(t, e) {
    for (hm[t] = e, t = 0; t < e.length; t++)
      fm.add(e[t]);
  }
  var Ky = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), dm = {}, mm = {};
  function Jy(t) {
    return $e.call(mm, t) ? !0 : $e.call(dm, t) ? !1 : Ky.test(t) ? mm[t] = !0 : (dm[t] = !0, !1);
  }
  var ne = !1;
  function gm() {
    var t = ne;
    return ne = !1, t;
  }
  function fo(t, e, n) {
    if (Jy(e))
      if (n === null) t.removeAttribute(e);
      else {
        switch (typeof n) {
          case "undefined":
          case "function":
          case "symbol":
            t.removeAttribute(e);
            return;
          case "boolean":
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function ho(t, e, n) {
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
  function Ei(t, e, n, l) {
    if (l === null) t.removeAttribute(n);
    else {
      switch (typeof l) {
        case "undefined":
        case "function":
        case "symbol":
        case "boolean":
          t.removeAttribute(n);
          return;
      }
      t.setAttributeNS(e, n, l);
    }
  }
  function rl(t) {
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
  function pm(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function ky(t, e, n) {
    var l = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var r = l.get, o = l.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          n = "" + m, o.call(this, m);
        }
      }), Object.defineProperty(t, e, {
        enumerable: l.enumerable
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
  function Sf(t) {
    if (!t._valueTracker) {
      var e = pm(t) ? "checked" : "value";
      t._valueTracker = ky(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function _m(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = pm(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  var Fy = /[\n"\\]/g;
  function zl(t) {
    return t.replace(
      Fy,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function bf(t, e, n, l, r, o, m, y) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + rl(e)) : t.value !== "" + rl(e) && (t.value = "" + rl(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? m === "number" && t.value == e ? Tf(t, rl(t.value)) : Tf(t, rl(e)) : n != null ? Tf(t, rl(n)) : l != null && t.removeAttribute("value"), r == null && o != null && (t.defaultChecked = !!o), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + rl(y) : t.removeAttribute("name");
  }
  function vm(t, e, n, l, r, o, m, y) {
    if (o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (t.type = o), e != null || n != null) {
      if (!(o !== "submit" && o !== "reset" || e != null)) {
        Sf(t);
        return;
      }
      n = n != null ? "" + rl(n) : "", e = e != null ? "" + rl(e) : n, y || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? r, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = y ? t.checked : !!l, t.defaultChecked = !!l, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), Sf(t);
  }
  function Tf(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Ou(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var r = 0; r < n.length; r++)
        e["$" + n[r]] = !0;
      for (n = 0; n < t.length; n++)
        r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + rl(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          t[r].selected = !0, l && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function ym(t, e, n) {
    if (e != null && (e = "" + rl(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + rl(n) : "";
  }
  function Sm(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(a(92));
        if (bt(l)) {
          if (1 < l.length) throw Error(a(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = rl(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), Sf(t);
  }
  function zu(t, e) {
    if (e) {
      var n = t.firstChild;
      if (n && n === t.lastChild && n.nodeType === 3) {
        n.nodeValue = e;
        return;
      }
    }
    t.textContent = e;
  }
  var Py = new Set(
    "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
      " "
    )
  );
  function bm(t, e, n) {
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || Py.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function Tm(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(a(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "", ne = !0);
      for (var r in e)
        l = e[r], e.hasOwnProperty(r) && n[r] !== l && (bm(t, r, l), ne = !0);
    } else
      for (var o in e)
        e.hasOwnProperty(o) && bm(t, o, e[o]);
  }
  function Ef(t) {
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
  var Wy = /* @__PURE__ */ new Map([
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
  ]), $y = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
  function mo(t) {
    return $y.test("" + t) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : t;
  }
  function ei() {
  }
  var xf = null;
  function Mf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Au = null, wu = null;
  function Em(t) {
    var e = Eu(t);
    if (e && (t = e.stateNode)) {
      var n = t[Ze] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (bf(
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
              'input[name="' + zl(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var r = l[Ze] || null;
                if (!r) throw Error(a(90));
                bf(
                  l,
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
              l = n[e], l.form === t.form && _m(l);
          }
          break t;
        case "textarea":
          ym(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Ou(t, !!n.multiple, e, !1);
      }
    }
  }
  var Of = !1;
  function xm(t, e, n) {
    if (Of) return t(e, n);
    Of = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (Of = !1, (Au !== null || wu !== null) && (mc(), Au && (e = Au, t = wu, wu = Au = null, Em(e), t)))
        for (e = 0; e < t.length; e++) Em(t[e]);
    }
  }
  function Yr(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var l = n[Ze] || null;
    if (l === null) return null;
    n = l[e];
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
        (l = !l.disabled) || (t = t.type, l = !(t === "button" || t === "input" || t === "select" || t === "textarea")), t = !l;
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
  var xi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), zf = !1;
  if (xi)
    try {
      var Br = {};
      Object.defineProperty(Br, "passive", {
        get: function() {
          zf = !0;
        }
      }), window.addEventListener("test", Br, Br), window.removeEventListener("test", Br, Br);
    } catch {
      zf = !1;
    }
  var Ki = null, Af = null, go = null;
  function Mm() {
    if (go) return go;
    var t, e = Af, n = e.length, l, r = "value" in Ki ? Ki.value : Ki.textContent, o = r.length;
    for (t = 0; t < n && e[t] === r[t]; t++) ;
    var m = n - t;
    for (l = 1; l <= m && e[n - l] === r[o - l]; l++) ;
    return go = r.slice(t, 1 < l ? 1 - l : void 0);
  }
  function po(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function _o() {
    return !0;
  }
  function Om() {
    return !1;
  }
  function Dn(t) {
    function e(n, l, r, o, m) {
      this._reactName = n, this._targetInst = r, this.type = l, this.nativeEvent = o, this.target = m, this.currentTarget = null;
      for (var y in t)
        t.hasOwnProperty(y) && (n = t[y], this[y] = n ? n(o) : o[y]);
      return this.isDefaultPrevented = (o.defaultPrevented != null ? o.defaultPrevented : o.returnValue === !1) ? _o : Om, this.isPropagationStopped = Om, this;
    }
    return R(e.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = _o);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = _o);
      },
      persist: function() {
      },
      isPersistent: _o
    }), e;
  }
  var Ji = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(t) {
      return t.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, vo = Dn(Ji), Lr = R({}, Ji, { view: 0, detail: 0 }), Iy = Dn(Lr), wf, Cf, qr, yo = R({}, Lr, {
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
    getModifierState: Df,
    button: 0,
    buttons: 0,
    relatedTarget: function(t) {
      return t.relatedTarget === void 0 ? t.fromElement === t.srcElement ? t.toElement : t.fromElement : t.relatedTarget;
    },
    movementX: function(t) {
      return "movementX" in t ? t.movementX : (t !== qr && (qr && t.type === "mousemove" ? (wf = t.screenX - qr.screenX, Cf = t.screenY - qr.screenY) : Cf = wf = 0, qr = t), wf);
    },
    movementY: function(t) {
      return "movementY" in t ? t.movementY : Cf;
    }
  }), zm = Dn(yo), tS = R({}, yo, { dataTransfer: 0 }), eS = Dn(tS), nS = R({}, Lr, { relatedTarget: 0 }), Rf = Dn(nS), lS = R({}, Ji, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), iS = Dn(lS), aS = R({}, Ji, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), uS = Dn(aS), rS = R({}, Ji, { data: 0 }), Am = Dn(rS), sS = {
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
  }, oS = {
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
  }, cS = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function fS(t) {
    var e = this.nativeEvent;
    return e.getModifierState ? e.getModifierState(t) : (t = cS[t]) ? !!e[t] : !1;
  }
  function Df() {
    return fS;
  }
  var hS = R({}, Lr, {
    key: function(t) {
      if (t.key) {
        var e = sS[t.key] || t.key;
        if (e !== "Unidentified") return e;
      }
      return t.type === "keypress" ? (t = po(t), t === 13 ? "Enter" : String.fromCharCode(t)) : t.type === "keydown" || t.type === "keyup" ? oS[t.keyCode] || "Unidentified" : "";
    },
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Df,
    charCode: function(t) {
      return t.type === "keypress" ? po(t) : 0;
    },
    keyCode: function(t) {
      return t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    },
    which: function(t) {
      return t.type === "keypress" ? po(t) : t.type === "keydown" || t.type === "keyup" ? t.keyCode : 0;
    }
  }), dS = Dn(hS), mS = R({}, yo, {
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
  }), wm = Dn(mS), gS = R({}, Ji, { submitter: 0 }), pS = Dn(gS), _S = R({}, Lr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Df
  }), vS = Dn(_S), yS = R({}, Ji, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), SS = Dn(yS), bS = R({}, yo, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), TS = Dn(bS), ES = R({}, Ji, {
    newState: 0,
    oldState: 0,
    source: 0
  }), xS = Dn(ES), MS = [9, 13, 27, 32], Nf = xi && "CompositionEvent" in window, Xr = null;
  xi && "documentMode" in document && (Xr = document.documentMode);
  var OS = xi && "TextEvent" in window && !Xr, Cm = xi && (!Nf || Xr && 8 < Xr && 11 >= Xr), Rm = " ", Dm = !1;
  function Nm(t, e) {
    switch (t) {
      case "keyup":
        return MS.indexOf(e.keyCode) !== -1;
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
  function Um(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Cu = !1;
  function zS(t, e) {
    switch (t) {
      case "compositionend":
        return Um(e);
      case "keypress":
        return e.which !== 32 ? null : (Dm = !0, Rm);
      case "textInput":
        return t = e.data, t === Rm && Dm ? null : t;
      default:
        return null;
    }
  }
  function AS(t, e) {
    if (Cu)
      return t === "compositionend" || !Nf && Nm(t, e) ? (t = Mm(), go = Af = Ki = null, Cu = !1, t) : null;
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
        return Cm && e.locale !== "ko" ? null : e.data;
      default:
        return null;
    }
  }
  var wS = {
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
  function Hm(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!wS[t.type] : e === "textarea";
  }
  function Ym(t, e, n, l) {
    Au ? wu ? wu.push(l) : wu = [l] : Au = l, e = Sc(e, "onChange"), 0 < e.length && (n = new vo(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var Gr = null, Vr = null;
  function CS(t) {
    E_(t, 0);
  }
  function So(t) {
    var e = Hr(t);
    if (_m(e)) return t;
  }
  function Bm(t, e) {
    if (t === "change") return e;
  }
  var Lm = !1;
  if (xi) {
    var Uf;
    if (xi) {
      var Hf = "oninput" in document;
      if (!Hf) {
        var qm = document.createElement("div");
        qm.setAttribute("oninput", "return;"), Hf = typeof qm.oninput == "function";
      }
      Uf = Hf;
    } else Uf = !1;
    Lm = Uf && (!document.documentMode || 9 < document.documentMode);
  }
  function Xm() {
    Gr && (Gr.detachEvent("onpropertychange", Gm), Vr = Gr = null);
  }
  function Gm(t) {
    if (t.propertyName === "value" && So(Vr)) {
      var e = [];
      Ym(
        e,
        Vr,
        t,
        Mf(t)
      ), xm(CS, e);
    }
  }
  function RS(t, e, n) {
    t === "focusin" ? (Xm(), Gr = e, Vr = n, Gr.attachEvent("onpropertychange", Gm)) : t === "focusout" && Xm();
  }
  function DS(t) {
    if (t === "selectionchange" || t === "keyup" || t === "keydown")
      return So(Vr);
  }
  function NS(t, e) {
    if (t === "click") return So(e);
  }
  function US(t, e) {
    if (t === "input" || t === "change")
      return So(e);
  }
  function HS(t, e) {
    return t === e && (t !== 0 || 1 / t === 1 / e) || t !== t && e !== e;
  }
  var sl = typeof Object.is == "function" ? Object.is : HS;
  function jr(t, e) {
    if (sl(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var r = n[l];
      if (!$e.call(e, r) || !sl(t[r], e[r]))
        return !1;
    }
    return !0;
  }
  function Yf(t) {
    if (t = t || (typeof document < "u" ? document : void 0), typeof t > "u") return null;
    try {
      return t.activeElement || t.body;
    } catch {
      return t.body;
    }
  }
  function Vm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function jm(t, e) {
    var n = Vm(t);
    t = 0;
    for (var l; n; ) {
      if (n.nodeType === 3) {
        if (l = t + n.textContent.length, t <= e && l >= e)
          return { node: n, offset: e - t };
        t = l;
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
      n = Vm(n);
    }
  }
  function Qm(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? Qm(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Zm(t) {
    t = t != null && t.ownerDocument != null && t.ownerDocument.defaultView != null ? t.ownerDocument.defaultView : window;
    for (var e = Yf(t.document); e instanceof t.HTMLIFrameElement; ) {
      try {
        var n = typeof e.contentWindow.location.href == "string";
      } catch {
        n = !1;
      }
      if (n) t = e.contentWindow;
      else break;
      e = Yf(t.document);
    }
    return e;
  }
  function Bf(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e && (e === "input" && (t.type === "text" || t.type === "search" || t.type === "tel" || t.type === "url" || t.type === "password") || e === "textarea" || t.contentEditable === "true");
  }
  var YS = xi && "documentMode" in document && 11 >= document.documentMode, Ru = null, Lf = null, Qr = null, qf = !1;
  function Km(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    qf || Ru == null || Ru !== Yf(l) || (l = Ru, "selectionStart" in l && Bf(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), Qr && jr(Qr, l) || (Qr = l, l = Sc(Lf, "onSelect"), 0 < l.length && (e = new vo(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = Ru)));
  }
  function La(t, e) {
    var n = {};
    return n[t.toLowerCase()] = e.toLowerCase(), n["Webkit" + t] = "webkit" + e, n["Moz" + t] = "moz" + e, n;
  }
  var Du = {
    animationend: La("Animation", "AnimationEnd"),
    animationiteration: La("Animation", "AnimationIteration"),
    animationstart: La("Animation", "AnimationStart"),
    transitionrun: La("Transition", "TransitionRun"),
    transitionstart: La("Transition", "TransitionStart"),
    transitioncancel: La("Transition", "TransitionCancel"),
    transitionend: La("Transition", "TransitionEnd")
  }, Xf = {}, Jm = {};
  xi && (Jm = document.createElement("div").style, "AnimationEvent" in window || (delete Du.animationend.animation, delete Du.animationiteration.animation, delete Du.animationstart.animation), "TransitionEvent" in window || delete Du.transitionend.transition);
  function qa(t) {
    if (Xf[t]) return Xf[t];
    if (!Du[t]) return t;
    var e = Du[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Jm)
        return Xf[t] = e[n];
    return t;
  }
  var km = qa("animationend"), Fm = qa("animationiteration"), Pm = qa("animationstart"), BS = qa("transitionrun"), LS = qa("transitionstart"), qS = qa("transitioncancel"), Wm = qa("transitionend"), $m = /* @__PURE__ */ new Map(), Gf = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Gf.push("scrollEnd");
  function jl(t, e) {
    $m.set(t, e), Ba(e, [t]);
  }
  var XS = 0;
  function Mi(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = Jl.identifierPrefix;
    var n = XS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function Im(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = $u;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = t[n[l]];
        if (r != null) {
          if (r === "none") return "none";
          e = e == null ? r : e + (" " + r);
        }
      }
    return e ?? t.default;
  }
  function Oi(t, e) {
    return t = Im(t), e = Im(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
  }
  var bo = typeof reportError == "function" ? reportError : function(t) {
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
  }, Al = [], Nu = 0, Vf = 0;
  function To() {
    for (var t = Nu, e = Vf = Nu = 0; e < t; ) {
      var n = Al[e];
      Al[e++] = null;
      var l = Al[e];
      Al[e++] = null;
      var r = Al[e];
      Al[e++] = null;
      var o = Al[e];
      if (Al[e++] = null, l !== null && r !== null) {
        var m = l.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), l.pending = r;
      }
      o !== 0 && tg(n, r, o);
    }
  }
  function Eo(t, e, n, l) {
    Al[Nu++] = t, Al[Nu++] = e, Al[Nu++] = n, Al[Nu++] = l, Vf |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function jf(t, e, n, l) {
    return Eo(t, e, n, l), xo(t);
  }
  function Xa(t, e) {
    return Eo(t, null, null, e), xo(t);
  }
  function tg(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var r = !1, o = t.return; o !== null; )
      o.childLanes |= n, l = o.alternate, l !== null && (l.childLanes |= n), o.tag === 22 && (t = o.stateNode, t === null || t._visibility & 1 || (r = !0)), t = o, o = o.return;
    return t.tag === 3 ? (o = t.stateNode, r && e !== null && (r = 31 - at(n), t = o.hiddenUpdates, l = t[r], l === null ? t[r] = [e] : l.push(e), e.lane = n | 536870912), o) : null;
  }
  function xo(t) {
    if (50 < hs)
      throw hs = 0, dc = null, Error(a(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Uu = {};
  function GS(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Zn(t, e, n, l) {
    return new GS(t, e, n, l);
  }
  function Qf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function zi(t, e) {
    var n = t.alternate;
    return n === null ? (n = Zn(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function eg(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Mo(t, e, n, l, r, o) {
    var m = 0;
    if (l = t, typeof l == "function") Qf(l) && (m = 1);
    else if (typeof l == "string")
      m = gb(
        t,
        n,
        mt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (l) {
        case _t:
          return t = Zn(31, n, e, r), t.elementType = _t, t.lanes = o, t;
        case nt:
          return Ga(n.children, r, o, e);
        case lt:
          m = 8, r |= 24;
          break;
        case ft:
          return t = Zn(12, n, e, r | 2), t.elementType = ft, t.lanes = o, t;
        case P:
          return t = Zn(13, n, e, r), t.elementType = P, t.lanes = o, t;
        case I:
          return t = Zn(19, n, e, r), t.elementType = I, t.lanes = o, t;
        case dt:
        case x:
          return t = r | 32, t = Zn(30, n, e, t), t.elementType = x, t.lanes = o, t.stateNode = {
            autoName: null,
            paired: null,
            clones: null,
            ref: null
          }, t;
        default:
          if (typeof l == "object" && l !== null)
            switch (l.$$typeof) {
              case et:
                m = 10;
                break t;
              case pt:
                m = 9;
                break t;
              case K:
                m = 11;
                break t;
              case st:
                m = 14;
                break t;
              case z:
                m = 16, l = null;
                break t;
            }
          m = 29, n = Error(
            a(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = Zn(m, n, e, r), e.elementType = t, e.type = l, e.lanes = o, e;
  }
  function Ga(t, e, n, l) {
    return t = Zn(7, t, l, e), t.lanes = n, t;
  }
  function Zf(t, e, n) {
    return t = Zn(6, t, null, e), t.lanes = n, t;
  }
  function ng(t) {
    var e = Zn(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Kf(t, e, n) {
    return e = Zn(
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
  var lg = /* @__PURE__ */ new WeakMap();
  function wl(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = lg.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Wl(e)
      }, lg.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Wl(e)
    };
  }
  var Hu = [], Yu = 0, Oo = null, Zr = 0, Cl = [], Rl = 0, ki = null, ni = 1, li = "";
  function Ai(t, e) {
    Hu[Yu++] = Zr, Hu[Yu++] = Oo, Oo = t, Zr = e;
  }
  function ig(t, e, n) {
    Cl[Rl++] = ni, Cl[Rl++] = li, Cl[Rl++] = ki, ki = t;
    var l = ni;
    t = li;
    var r = 32 - at(l) - 1;
    l &= ~(1 << r), n += 1;
    var o = 32 - at(e) + r;
    if (30 < o) {
      var m = r - r % 5;
      o = (l & (1 << m) - 1).toString(32), l >>= m, r -= m, ni = 1 << 32 - at(e) + r | n << r | l, li = o + t;
    } else
      ni = 1 << o | n << r | l, li = t;
  }
  function zo(t) {
    t.return !== null && (Ai(t, 1), ig(t, 1, 0));
  }
  function Jf(t) {
    for (; t === Oo; )
      Oo = Hu[--Yu], Hu[Yu] = null, Zr = Hu[--Yu], Hu[Yu] = null;
    for (; t === ki; )
      ki = Cl[--Rl], Cl[Rl] = null, li = Cl[--Rl], Cl[Rl] = null, ni = Cl[--Rl], Cl[Rl] = null;
  }
  function ag(t, e) {
    Cl[Rl++] = ni, Cl[Rl++] = li, Cl[Rl++] = ki, ni = e.id, li = e.overflow, ki = t;
  }
  var un = null, Te = null, Vt = !1, Fi = null, Dl = !1, kf = Error(a(519));
  function Pi(t) {
    var e = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw Kr(wl(e, t)), kf;
  }
  function ug(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[Qe] = t, e[Ze] = l, n) {
      case "dialog":
        kt("cancel", e), kt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        kt("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < ms.length; n++)
          kt(ms[n], e);
        break;
      case "source":
        kt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        kt("error", e), kt("load", e);
        break;
      case "details":
        kt("toggle", e);
        break;
      case "input":
        kt("invalid", e), vm(
          e,
          l.value,
          l.defaultValue,
          l.checked,
          l.defaultChecked,
          l.type,
          l.name,
          !0
        );
        break;
      case "select":
        kt("invalid", e);
        break;
      case "textarea":
        kt("invalid", e), Sm(e, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || z_(e.textContent, n) ? (l.popover != null && (kt("beforetoggle", e), kt("toggle", e)), l.onScroll != null && kt("scroll", e), l.onScrollEnd != null && kt("scrollend", e), l.onClick != null && (e.onclick = ei), e = !0) : e = !1, e || Pi(t, !0);
  }
  function Ao(t) {
    for (un = t.return; un; )
      switch (un.tag) {
        case 5:
        case 31:
        case 13:
          Dl = !1;
          return;
        case 27:
        case 3:
          Dl = !0;
          return;
        default:
          un = un.return;
      }
  }
  function Bu(t) {
    if (t !== un) return !1;
    if (!Vt) return Ao(t), Vt = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || xd(t.type, t.memoizedProps)), n = !n), n && Te && Pi(t), Ao(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      Te = K_(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      Te = K_(t);
    } else
      e === 27 ? (e = Te, ha(t.type) ? (t = Nd, Nd = null, Te = t) : Te = e) : Te = un ? Ul(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Va() {
    Te = un = null, Vt = !1;
  }
  function Ff() {
    var t = Fi;
    return t !== null && (kn === null ? kn = t : kn.push.apply(
      kn,
      t
    ), Fi = null), t;
  }
  function Kr(t) {
    Fi === null ? Fi = [t] : Fi.push(t);
  }
  var Pf = Ct(null), ja = null, wi = null;
  function Wi(t, e, n) {
    tt(Pf, e._currentValue), e._currentValue = n;
  }
  function Ci(t) {
    t._currentValue = Pf.current, U(Pf);
  }
  function wo(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function Wf(t, e, n, l) {
    var r = t.child;
    for (r !== null && (r.return = t); r !== null; ) {
      var o = r.dependencies;
      if (o !== null) {
        var m = r.child;
        o = o.firstContext;
        t: for (; o !== null; ) {
          var y = o;
          o = r;
          for (var E = 0; E < e.length; E++)
            if (y.context === e[E]) {
              o.lanes |= n, y = o.alternate, y !== null && (y.lanes |= n), wo(
                o.return,
                n,
                t
              ), l || (m = null);
              break t;
            }
          o = y.next;
        }
      } else if (r.tag === 18) {
        if (m = r.return, m === null) throw Error(a(341));
        m.lanes |= n, o = m.alternate, o !== null && (o.lanes |= n), wo(m, n, t), m = null;
      } else
        r.tag === 13 && r.memoizedState !== null && r.memoizedState.dehydrated === null ? (r.lanes |= n, m = r.alternate, m !== null && (m.lanes |= n), wo(
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
  function Qa(t, e, n, l) {
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
          sl(r.pendingProps.value, m.value) || (t !== null ? t.push(y) : t = [y]);
        }
      } else if (r === Wt.current) {
        if (m = r.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(sr) : t = [sr]);
      }
      r = r.return;
    }
    return t !== null && Wf(
      e,
      t,
      n,
      l
    ), e.flags |= 262144, t !== null;
  }
  function Co(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!sl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Za(t) {
    ja = t, wi = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function gn(t) {
    return rg(ja, t);
  }
  function Ro(t, e) {
    return ja === null && Za(t), rg(t, e);
  }
  function rg(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, wi === null) {
      if (t === null) throw Error(a(308));
      wi = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else wi = wi.next = e;
    return n;
  }
  var VS = typeof AbortController < "u" ? AbortController : function() {
    var t = [], e = this.signal = {
      aborted: !1,
      addEventListener: function(n, l) {
        t.push(l);
      }
    };
    this.abort = function() {
      e.aborted = !0, t.forEach(function(n) {
        return n();
      });
    };
  }, jS = f.unstable_scheduleCallback, QS = f.unstable_NormalPriority, Ke = {
    $$typeof: et,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function $f() {
    return {
      controller: new VS(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Jr(t) {
    t.refCount--, t.refCount === 0 && jS(QS, function() {
      t.controller.abort();
    });
  }
  function sg(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var l = e[t];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var kr = null;
  function ZS(t) {
    var e = t.transitionTypes;
    return t.transitionTypes = null, e;
  }
  var Fr = null, If = 0, Ka = 0, Lu = null;
  function KS(t, e) {
    if (Fr === null) {
      var n = Fr = [];
      If = 0, Ka = gd(), Lu = {
        status: "pending",
        value: void 0,
        then: function(l) {
          n.push(l);
        }
      };
    }
    return If++, e.then(og, og), e;
  }
  function og() {
    if (--If === 0 && (kr = null, Fr !== null)) {
      Lu !== null && (Lu.status = "fulfilled");
      var t = Fr;
      Fr = null, Ka = 0, Lu = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function JS(t, e) {
    var n = [], l = {
      status: "pending",
      value: null,
      reason: null,
      then: function(r) {
        n.push(r);
      }
    };
    return t.then(
      function() {
        l.status = "fulfilled", l.value = e;
        for (var r = 0; r < n.length; r++) (0, n[r])(e);
      },
      function(r) {
        for (l.status = "rejected", l.reason = r, r = 0; r < n.length; r++)
          (0, n[r])(void 0);
      }
    ), l;
  }
  var cg = it.S;
  it.S = function(t, e) {
    if (n_ = wt(), typeof e == "object" && e !== null && typeof e.then == "function" && KS(t, e), kr !== null)
      for (var n = nr; n !== null; )
        sg(n, kr), n = n.next;
    if (n = t.types, n !== null) {
      for (var l = nr; l !== null; )
        sg(l, n), l = l.next;
      if (Ka !== 0) {
        l = kr, l === null && (l = kr = []);
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          l.indexOf(o) === -1 && l.push(o);
        }
      }
    }
    cg !== null && cg(t, e);
  };
  var Ja = Ct(null);
  function th() {
    var t = Ja.current;
    return t !== null ? t : ve.pooledCache;
  }
  function Do(t, e) {
    e === null ? tt(Ja, Ja.current) : tt(Ja, e.pool);
  }
  function fg() {
    var t = th();
    return t === null ? null : { parent: Ke._currentValue, pool: t };
  }
  var qu = Error(a(460)), eh = Error(a(474)), No = Error(a(542)), Uo = { then: function() {
  } };
  function hg(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function dg(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(ei, ei), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, gg(t), t === void 0 && !("reason" in e) ? Error(a(600)) : t;
      default:
        if (typeof e.status == "string") e.then(ei, ei);
        else {
          if (t = ve, t !== null && 100 < t.shellSuspendCounter)
            throw Error(a(482));
          t = e, t.status = "pending", t.then(
            function(l) {
              if (e.status === "pending") {
                var r = e;
                r.status = "fulfilled", r.value = l;
              }
            },
            function(l) {
              if (e.status === "pending") {
                var r = e;
                r.status = "rejected", r.reason = l;
              }
            }
          );
        }
        switch (e.status) {
          case "fulfilled":
            return e.value;
          case "rejected":
            throw t = e.reason, gg(t), t;
        }
        throw Fa = e, qu;
    }
  }
  function ka(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (Fa = n, qu) : n;
    }
  }
  var Fa = null;
  function mg() {
    if (Fa === null) throw Error(a(459));
    var t = Fa;
    return Fa = null, t;
  }
  function gg(t) {
    if (t === qu || t === No)
      throw Error(a(483));
  }
  var Xu = null, Pr = 0;
  function Ho(t) {
    var e = Pr;
    return Pr += 1, Xu === null && (Xu = []), dg(Xu, t, e);
  }
  function $i(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Yo(t, e) {
    throw e.$$typeof === Q ? Error(a(525)) : (t = Object.prototype.toString.call(e), Error(
      a(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function pg(t) {
    function e(D, A) {
      if (t) {
        var H = D.deletions;
        H === null ? (D.deletions = [A], D.flags |= 16) : H.push(A);
      }
    }
    function n(D, A) {
      if (!t) return null;
      for (; A !== null; )
        e(D, A), A = A.sibling;
      return null;
    }
    function l(D) {
      for (var A = /* @__PURE__ */ new Map(); D !== null; )
        D.key === null ? A.set(D.index, D) : A.set(D.key, D), D = D.sibling;
      return A;
    }
    function r(D, A) {
      return D = zi(D, A), D.index = 0, D.sibling = null, D;
    }
    function o(D, A, H) {
      return D.index = H, t ? (H = D.alternate, H !== null ? (H = H.index, H < A ? (D.flags |= 2, A) : H) : (D.flags |= 134217730, A)) : (D.flags |= 1048576, A);
    }
    function m(D) {
      return t && D.alternate === null && (D.flags |= 134217730), D;
    }
    function y(D, A, H, F) {
      return A === null || A.tag !== 6 ? (A = Zf(H, D.mode, F), A.return = D, A) : (A = r(A, H), A.return = D, A);
    }
    function E(D, A, H, F) {
      var gt = H.type;
      return gt === nt ? (D = X(
        D,
        A,
        H.props.children,
        F,
        H.key
      ), $i(D, H), D) : A !== null && (A.elementType === gt || typeof gt == "object" && gt !== null && gt.$$typeof === z && ka(gt) === A.type) ? (A = r(A, H.props), $i(A, H), A.return = D, A) : (A = Mo(
        H.type,
        H.key,
        H.props,
        null,
        D.mode,
        F
      ), $i(A, H), A.return = D, A);
    }
    function N(D, A, H, F) {
      return A === null || A.tag !== 4 || A.stateNode.containerInfo !== H.containerInfo || A.stateNode.implementation !== H.implementation ? (A = Kf(H, D.mode, F), A.return = D, A) : (A = r(A, H.children || []), A.return = D, A);
    }
    function X(D, A, H, F, gt) {
      return A === null || A.tag !== 7 ? (A = Ga(
        H,
        D.mode,
        F,
        gt
      ), A.return = D, A) : (A = r(A, H), A.return = D, A);
    }
    function W(D, A, H) {
      if (typeof A == "string" && A !== "" || typeof A == "number" || typeof A == "bigint")
        return A = Zf(
          "" + A,
          D.mode,
          H
        ), A.return = D, A;
      if (typeof A == "object" && A !== null) {
        switch (A.$$typeof) {
          case $:
            return H = Mo(
              A.type,
              A.key,
              A.props,
              null,
              D.mode,
              H
            ), $i(H, A), H.return = D, H;
          case V:
            return A = Kf(
              A,
              D.mode,
              H
            ), A.return = D, A;
          case z:
            return A = ka(A), W(D, A, H);
        }
        if (bt(A) || L(A))
          return A = Ga(
            A,
            D.mode,
            H,
            null
          ), A.return = D, A;
        if (typeof A.then == "function")
          return W(D, Ho(A), H);
        if (A.$$typeof === et)
          return W(
            D,
            Ro(D, A),
            H
          );
        Yo(D, A);
      }
      return null;
    }
    function C(D, A, H, F) {
      var gt = A !== null ? A.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return gt !== null ? null : y(D, A, "" + H, F);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case $:
            return H.key === gt ? E(D, A, H, F) : null;
          case V:
            return H.key === gt ? N(D, A, H, F) : null;
          case z:
            return H = ka(H), C(D, A, H, F);
        }
        if (bt(H) || L(H))
          return gt !== null ? null : X(D, A, H, F, null);
        if (typeof H.then == "function")
          return C(
            D,
            A,
            Ho(H),
            F
          );
        if (H.$$typeof === et)
          return C(
            D,
            A,
            Ro(D, H),
            F
          );
        Yo(D, H);
      }
      return null;
    }
    function Y(D, A, H, F, gt) {
      if (typeof F == "string" && F !== "" || typeof F == "number" || typeof F == "bigint")
        return D = D.get(H) || null, y(A, D, "" + F, gt);
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case $:
            return D = D.get(
              F.key === null ? H : F.key
            ) || null, E(A, D, F, gt);
          case V:
            return D = D.get(
              F.key === null ? H : F.key
            ) || null, N(A, D, F, gt);
          case z:
            return F = ka(F), Y(
              D,
              A,
              H,
              F,
              gt
            );
        }
        if (bt(F) || L(F))
          return D = D.get(H) || null, X(A, D, F, gt, null);
        if (typeof F.then == "function")
          return Y(
            D,
            A,
            H,
            Ho(F),
            gt
          );
        if (F.$$typeof === et)
          return Y(
            D,
            A,
            H,
            Ro(A, F),
            gt
          );
        Yo(A, F);
      }
      return null;
    }
    function ot(D, A, H, F) {
      for (var gt = null, Pt = null, Et = A, Rt = A = 0, Fe = null; Et !== null && Rt < H.length; Rt++) {
        Et.index > Rt ? (Fe = Et, Et = null) : Fe = Et.sibling;
        var te = C(
          D,
          Et,
          H[Rt],
          F
        );
        if (te === null) {
          Et === null && (Et = Fe);
          break;
        }
        t && Et && te.alternate === null && e(D, Et), A = o(te, A, Rt), Pt === null ? gt = te : Pt.sibling = te, Pt = te, Et = Fe;
      }
      if (Rt === H.length)
        return n(D, Et), Vt && Ai(D, Rt), gt;
      if (Et === null) {
        for (; Rt < H.length; Rt++)
          Et = W(D, H[Rt], F), Et !== null && (A = o(
            Et,
            A,
            Rt
          ), Pt === null ? gt = Et : Pt.sibling = Et, Pt = Et);
        return Vt && Ai(D, Rt), gt;
      }
      for (Et = l(Et); Rt < H.length; Rt++)
        Fe = Y(
          Et,
          D,
          Rt,
          H[Rt],
          F
        ), Fe !== null && (t && (te = Fe.alternate, te !== null && Et.delete(te.key === null ? Rt : te.key)), A = o(
          Fe,
          A,
          Rt
        ), Pt === null ? gt = Fe : Pt.sibling = Fe, Pt = Fe);
      return t && Et.forEach(function(_a) {
        return e(D, _a);
      }), Vt && Ai(D, Rt), gt;
    }
    function yt(D, A, H, F) {
      if (H == null) throw Error(a(151));
      for (var gt = null, Pt = null, Et = A, Rt = A = 0, Fe = null, te = H.next(); Et !== null && !te.done; Rt++, te = H.next()) {
        Et.index > Rt ? (Fe = Et, Et = null) : Fe = Et.sibling;
        var _a = C(D, Et, te.value, F);
        if (_a === null) {
          Et === null && (Et = Fe);
          break;
        }
        t && Et && _a.alternate === null && e(D, Et), A = o(_a, A, Rt), Pt === null ? gt = _a : Pt.sibling = _a, Pt = _a, Et = Fe;
      }
      if (te.done)
        return n(D, Et), Vt && Ai(D, Rt), gt;
      if (Et === null) {
        for (; !te.done; Rt++, te = H.next())
          te = W(D, te.value, F), te !== null && (A = o(te, A, Rt), Pt === null ? gt = te : Pt.sibling = te, Pt = te);
        return Vt && Ai(D, Rt), gt;
      }
      for (Et = l(Et); !te.done; Rt++, te = H.next())
        te = Y(Et, D, Rt, te.value, F), te !== null && (t && (Fe = te.alternate, Fe !== null && Et.delete(
          Fe.key === null ? Rt : Fe.key
        )), A = o(te, A, Rt), Pt === null ? gt = te : Pt.sibling = te, Pt = te);
      return t && Et.forEach(function(zb) {
        return e(D, zb);
      }), Vt && Ai(D, Rt), gt;
    }
    function Bt(D, A, H, F) {
      if (typeof H == "object" && H !== null && H.type === nt && H.key === null && H.props.ref === void 0 && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case $:
            t: {
              for (var gt = H.key; A !== null; ) {
                if (A.key === gt) {
                  if (gt = H.type, gt === nt) {
                    if (A.tag === 7) {
                      n(
                        D,
                        A.sibling
                      ), F = r(
                        A,
                        H.props.children
                      ), $i(F, H), F.return = D, D = F;
                      break t;
                    }
                  } else if (A.elementType === gt || typeof gt == "object" && gt !== null && gt.$$typeof === z && ka(gt) === A.type) {
                    n(
                      D,
                      A.sibling
                    ), F = r(A, H.props), $i(F, H), F.return = D, D = F;
                    break t;
                  }
                  n(D, A);
                  break;
                } else e(D, A);
                A = A.sibling;
              }
              H.type === nt ? (F = Ga(
                H.props.children,
                D.mode,
                F,
                H.key
              ), $i(F, H), F.return = D, D = F) : (F = Mo(
                H.type,
                H.key,
                H.props,
                null,
                D.mode,
                F
              ), $i(F, H), F.return = D, D = F);
            }
            return m(D);
          case V:
            t: {
              for (gt = H.key; A !== null; ) {
                if (A.key === gt)
                  if (A.tag === 4 && A.stateNode.containerInfo === H.containerInfo && A.stateNode.implementation === H.implementation) {
                    n(
                      D,
                      A.sibling
                    ), F = r(A, H.children || []), F.return = D, D = F;
                    break t;
                  } else {
                    n(D, A);
                    break;
                  }
                else e(D, A);
                A = A.sibling;
              }
              F = Kf(H, D.mode, F), F.return = D, D = F;
            }
            return m(D);
          case z:
            return H = ka(H), Bt(
              D,
              A,
              H,
              F
            );
        }
        if (bt(H))
          return ot(
            D,
            A,
            H,
            F
          );
        if (L(H)) {
          if (gt = L(H), typeof gt != "function") throw Error(a(150));
          return H = gt.call(H), yt(
            D,
            A,
            H,
            F
          );
        }
        if (typeof H.then == "function")
          return Bt(
            D,
            A,
            Ho(H),
            F
          );
        if (H.$$typeof === et)
          return Bt(
            D,
            A,
            Ro(D, H),
            F
          );
        Yo(D, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, A !== null && A.tag === 6 ? (n(D, A.sibling), F = r(A, H), F.return = D, D = F) : (n(D, A), F = Zf(H, D.mode, F), F.return = D, D = F), m(D)) : n(D, A);
    }
    return function(D, A, H, F) {
      try {
        Pr = 0;
        var gt = Bt(
          D,
          A,
          H,
          F
        );
        return Xu = null, gt;
      } catch (Et) {
        if (Et === qu || Et === No) throw Et;
        var Pt = Zn(29, Et, null, D.mode);
        return Pt.lanes = F, Pt.return = D, Pt;
      }
    };
  }
  var Pa = pg(!0), _g = pg(!1), Ii = !1;
  function nh(t) {
    t.updateQueue = {
      baseState: t.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, lanes: 0, hiddenCallbacks: null },
      callbacks: null
    };
  }
  function lh(t, e) {
    t = t.updateQueue, e.updateQueue === t && (e.updateQueue = {
      baseState: t.baseState,
      firstBaseUpdate: t.firstBaseUpdate,
      lastBaseUpdate: t.lastBaseUpdate,
      shared: t.shared,
      callbacks: null
    });
  }
  function ta(t) {
    return { lane: t, tag: 0, payload: null, callback: null, next: null };
  }
  function ea(t, e, n) {
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ie & 2) !== 0) {
      var r = l.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), l.pending = e, e = xo(t), tg(t, null, n), e;
    }
    return Eo(t, l, e, n), xo(t);
  }
  function Wr(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, tn(t, n);
    }
  }
  function ih(t, e) {
    var n = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
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
        baseState: l.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: o,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var ah = !1;
  function $r() {
    if (ah) {
      var t = Lu;
      if (t !== null) throw t;
    }
  }
  function Ir(t, e, n, l) {
    ah = !1;
    var r = t.updateQueue;
    Ii = !1;
    var o = r.firstBaseUpdate, m = r.lastBaseUpdate, y = r.shared.pending;
    if (y !== null) {
      r.shared.pending = null;
      var E = y, N = E.next;
      E.next = null, m === null ? o = N : m.next = N, m = E;
      var X = t.alternate;
      X !== null && (X = X.updateQueue, y = X.lastBaseUpdate, y !== m && (y === null ? X.firstBaseUpdate = N : y.next = N, X.lastBaseUpdate = E));
    }
    if (o !== null) {
      var W = r.baseState;
      m = 0, X = N = E = null, y = o;
      do {
        var C = y.lane & -536870913, Y = C !== y.lane;
        if (Y ? (Ft & C) === C : (l & C) === C) {
          C !== 0 && C === Ka && (ah = !0), X !== null && (X = X.next = {
            lane: 0,
            tag: y.tag,
            payload: y.payload,
            callback: null,
            next: null
          });
          t: {
            var ot = t, yt = y;
            C = e;
            var Bt = n;
            switch (yt.tag) {
              case 1:
                if (ot = yt.payload, typeof ot == "function") {
                  W = ot.call(Bt, W, C);
                  break t;
                }
                W = ot;
                break t;
              case 3:
                ot.flags = ot.flags & -65537 | 128;
              case 0:
                if (ot = yt.payload, C = typeof ot == "function" ? ot.call(Bt, W, C) : ot, C == null) break t;
                W = R({}, W, C);
                break t;
              case 2:
                Ii = !0;
            }
          }
          C = y.callback, C !== null && (t.flags |= 64, Y && (t.flags |= 8192), Y = r.callbacks, Y === null ? r.callbacks = [C] : Y.push(C));
        } else
          Y = {
            lane: C,
            tag: y.tag,
            payload: y.payload,
            callback: y.callback,
            next: null
          }, X === null ? (N = X = Y, E = W) : X = X.next = Y, m |= C;
        if (y = y.next, y === null) {
          if (y = r.shared.pending, y === null)
            break;
          Y = y, y = Y.next, Y.next = null, r.lastBaseUpdate = Y, r.shared.pending = null;
        }
      } while (!0);
      X === null && (E = W), r.baseState = E, r.firstBaseUpdate = N, r.lastBaseUpdate = X, o === null && (r.shared.lanes = 0), sa |= m, t.lanes = m, t.memoizedState = W;
    }
  }
  function vg(t, e) {
    if (typeof t != "function")
      throw Error(a(191, t));
    t.call(e);
  }
  function yg(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        vg(n[t], e);
  }
  var na = Ct(null), Bo = Ct(0);
  function Sg(t, e) {
    t = Hi, tt(Bo, t), tt(na, e), Hi = t | e.baseLanes;
  }
  function uh() {
    tt(Bo, Hi), tt(na, na.current);
  }
  function rh() {
    Hi = Bo.current, U(na), U(Bo);
  }
  var pn = Ct(null), On = null;
  function la(t) {
    var e = t.alternate;
    tt(_n, _n.current & 1), tt(pn, t), On === null && (e === null || na.current !== null || e.memoizedState !== null) && (On = t);
  }
  function sh(t) {
    tt(_n, _n.current), tt(pn, t), On === null && (On = t);
  }
  function bg(t) {
    t.tag === 22 ? (tt(_n, _n.current), tt(pn, t), On === null && (On = t)) : ia();
  }
  function ia() {
    tt(_n, _n.current), tt(pn, pn.current);
  }
  function ol(t) {
    U(pn), On === t && (On = null), U(_n);
  }
  var _n = Ct(0);
  function ts(t, e) {
    tt(pn, pn.current), tt(_n, e);
  }
  function oh(t) {
    U(_n), U(pn), On === t && (On = null);
  }
  function Lo(t) {
    for (var e = t; e !== null; ) {
      if (e.tag === 13) {
        var n = e.memoizedState;
        if (n !== null && (n = n.dehydrated, n === null || Rd(n) || Dd(n)))
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
  var Ri = 0, Yt = null, ge = null, Je = null, qo = !1, Gu = !1, Wa = !1, Xo = 0, es = 0, Vu = null, kS = 0;
  function Ye() {
    throw Error(a(321));
  }
  function ch(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!sl(t[n], e[n])) return !1;
    return !0;
  }
  function fh(t, e, n, l, r, o) {
    return Ri = o, Yt = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, it.H = t === null || t.memoizedState === null ? ip : ap, Wa = !1, o = n(l, r), Wa = !1, Gu && (o = Eg(
      e,
      n,
      l,
      r
    )), Tg(t), o;
  }
  function Tg(t) {
    it.H = Jo;
    var e = ge !== null && ge.next !== null;
    if (Ri = 0, Je = ge = Yt = null, qo = !1, es = 0, Vu = null, e) throw Error(a(300));
    t === null || ke || (t = t.dependencies, t !== null && Co(t) && (ke = !0));
  }
  function Eg(t, e, n, l) {
    Yt = t;
    var r = 0;
    do {
      if (Gu && (Vu = null), es = 0, Gu = !1, 25 <= r) throw Error(a(301));
      if (r += 1, Je = ge = null, t.updateQueue != null) {
        var o = t.updateQueue;
        o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
      }
      it.H = n2, o = e(n, l);
    } while (Gu);
    return o;
  }
  function FS() {
    var t = it.H, e = t.useState()[0];
    return e = typeof e.then == "function" ? ns(e) : e, t = t.useState()[0], (ge !== null ? ge.memoizedState : null) !== t && (Yt.flags |= 1024), e;
  }
  function hh() {
    var t = Xo !== 0;
    return Xo = 0, t;
  }
  function dh(t, e, n) {
    e.updateQueue = t.updateQueue, e.flags &= -2053, t.lanes &= ~n;
  }
  function mh(t) {
    if (qo) {
      for (t = t.memoizedState; t !== null; ) {
        var e = t.queue;
        e !== null && (e.pending = null), t = t.next;
      }
      qo = !1;
    }
    Ri = 0, Je = ge = Yt = null, Gu = !1, es = Xo = 0, Vu = null;
  }
  function Nn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return Je === null ? Yt.memoizedState = Je = t : Je = Je.next = t, Je;
  }
  function qe() {
    if (ge === null) {
      var t = Yt.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = ge.next;
    var e = Je === null ? Yt.memoizedState : Je.next;
    if (e !== null)
      Je = e, ge = t;
    else {
      if (t === null)
        throw Yt.alternate === null ? Error(a(467)) : Error(a(310));
      ge = t, t = {
        memoizedState: ge.memoizedState,
        baseState: ge.baseState,
        baseQueue: ge.baseQueue,
        queue: ge.queue,
        next: null
      }, Je === null ? Yt.memoizedState = Je = t : Je = Je.next = t;
    }
    return Je;
  }
  function Go() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ns(t) {
    var e = es;
    return es += 1, Vu === null && (Vu = []), t = dg(Vu, t, e), e = Yt, (Je === null ? e.memoizedState : Je.next) === null && (e = e.alternate, it.H = e === null || e.memoizedState === null ? ip : ap), t;
  }
  function Vo(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ns(t);
      if (t.$$typeof === O) return;
      if (t.$$typeof === et) return gn(t);
    }
    throw Error(a(438, String(t)));
  }
  function gh(t) {
    var e = null, n = Yt.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var l = Yt.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Go(), Yt.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = Mt;
    return e.index++, n;
  }
  function Di(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function jo(t) {
    var e = qe();
    return ph(e, ge, t);
  }
  function ph(t, e, n) {
    var l = t.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = n;
    var r = t.baseQueue, o = l.pending;
    if (o !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = o.next, o.next = m;
      }
      e.baseQueue = r = o, l.pending = null;
    }
    if (o = t.baseState, r === null) t.memoizedState = o;
    else {
      e = r.next;
      var y = m = null, E = null, N = e, X = !1;
      do {
        var W = N.lane & -536870913;
        if (W !== N.lane ? (Ft & W) === W : (Ri & W) === W) {
          var C = N.revertLane;
          if (C === 0)
            E !== null && (E = E.next = {
              lane: 0,
              revertLane: 0,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }), W === Ka && (X = !0);
          else if ((Ri & C) === C) {
            N = N.next, C === Ka && (X = !0);
            continue;
          } else
            W = {
              lane: 0,
              revertLane: N.revertLane,
              gesture: null,
              action: N.action,
              hasEagerState: N.hasEagerState,
              eagerState: N.eagerState,
              next: null
            }, E === null ? (y = E = W, m = o) : E = E.next = W, Yt.lanes |= C, sa |= C;
          W = N.action, Wa && n(o, W), o = N.hasEagerState ? N.eagerState : n(o, W);
        } else
          C = {
            lane: W,
            revertLane: N.revertLane,
            gesture: N.gesture,
            action: N.action,
            hasEagerState: N.hasEagerState,
            eagerState: N.eagerState,
            next: null
          }, E === null ? (y = E = C, m = o) : E = E.next = C, Yt.lanes |= W, sa |= W;
        N = N.next;
      } while (N !== null && N !== e);
      if (E === null ? m = o : E.next = y, !sl(o, t.memoizedState) && (ke = !0, X && (n = Lu, n !== null)))
        throw n;
      t.memoizedState = o, t.baseState = m, t.baseQueue = E, l.lastRenderedState = o;
    }
    return r === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function _h(t) {
    var e = qe(), n = e.queue;
    if (n === null) throw Error(a(311));
    n.lastRenderedReducer = t;
    var l = n.dispatch, r = n.pending, o = e.memoizedState;
    if (r !== null) {
      n.pending = null;
      var m = r = r.next;
      do
        o = t(o, m.action), m = m.next;
      while (m !== r);
      sl(o, e.memoizedState) || (ke = !0), e.memoizedState = o, e.baseQueue === null && (e.baseState = o), n.lastRenderedState = o;
    }
    return [o, l];
  }
  function xg(t, e, n) {
    var l = Yt, r = qe(), o = Vt;
    if (o) {
      if (n === void 0) throw Error(a(407));
      n = n();
    } else n = e();
    var m = !sl(
      (ge || r).memoizedState,
      n
    );
    if (m && (r.memoizedState = n, ke = !0), r = r.queue, Sh(zg.bind(null, l, r, t), [
      t
    ]), t = r.getSnapshot !== e || m || Je !== null && (Je.memoizedState.tag & 1) !== 0, ju(
      t ? 9 : 8,
      { destroy: void 0 },
      Og.bind(null, l, r, n, e),
      null
    ), t) {
      if (l.flags |= 2048, ve === null) throw Error(a(349));
      o || (Ri & 127) !== 0 || Mg(l, e, n);
    }
    return n;
  }
  function Mg(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Yt.updateQueue, e === null ? (e = Go(), Yt.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Og(t, e, n, l) {
    e.value = n, e.getSnapshot = l, Ag(e) && wg(t);
  }
  function zg(t, e, n) {
    return n(function() {
      Ag(e) && wg(t);
    });
  }
  function Ag(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !sl(t, n);
    } catch {
      return !0;
    }
  }
  function wg(t) {
    var e = Xa(t, 2);
    e !== null && Fn(e, t, 2);
  }
  function vh(t) {
    var e = Nn();
    if (typeof t == "function") {
      var n = t;
      if (t = n(), Wa) {
        Lt(!0);
        try {
          n();
        } finally {
          Lt(!1);
        }
      }
    }
    return e.memoizedState = e.baseState = t, e.queue = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Di,
      lastRenderedState: t
    }, e;
  }
  function Cg(t, e, n, l) {
    return t.baseState = n, ph(
      t,
      ge,
      typeof l == "function" ? l : Di
    );
  }
  function PS(t, e, n, l, r) {
    if (Ko(t)) throw Error(a(485));
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
      it.T !== null ? n(!0) : o.isTransition = !1, l(o), n = e.pending, n === null ? (o.next = e.pending = o, Rg(e, o)) : (o.next = n.next, e.pending = n.next = o);
    }
  }
  function Rg(t, e) {
    var n = e.action, l = e.payload, r = t.state;
    if (e.isTransition) {
      var o = it.T, m = {};
      m.types = o !== null ? o.types : null, it.T = m;
      try {
        var y = n(r, l), E = it.S;
        E !== null && E(m, y), Dg(t, e, y);
      } catch (N) {
        yh(t, e, N);
      } finally {
        o !== null && m.types !== null && (o.types = m.types), it.T = o;
      }
    } else
      try {
        o = n(r, l), Dg(t, e, o);
      } catch (N) {
        yh(t, e, N);
      }
  }
  function Dg(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Ng(t, e, l);
      },
      function(l) {
        return yh(t, e, l);
      }
    ) : Ng(t, e, n);
  }
  function Ng(t, e, n) {
    e.status = "fulfilled", e.value = n, Ug(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Rg(t, n)));
  }
  function yh(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, Ug(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function Ug(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Hg(t, e) {
    return e;
  }
  function Yg(t, e) {
    if (Vt) {
      var n = ve.formState;
      if (n !== null) {
        t: {
          var l = Yt;
          if (Vt) {
            if (Te) {
              e: {
                for (var r = Te, o = Dl; r.nodeType !== 8; ) {
                  if (!o) {
                    r = null;
                    break e;
                  }
                  if (r = Ul(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                o = r.data, r = o === "F!" || o === "F" ? r : null;
              }
              if (r) {
                Te = Ul(
                  r.nextSibling
                ), l = r.data === "F!";
                break t;
              }
            }
            Pi(l);
          }
          l = !1;
        }
        l && (e = n[0]);
      }
    }
    return n = Nn(), n.memoizedState = n.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Hg,
      lastRenderedState: e
    }, n.queue = l, n = ep.bind(
      null,
      Yt,
      l
    ), l.dispatch = n, l = vh(!1), o = Mh.bind(
      null,
      Yt,
      !1,
      l.queue
    ), l = Nn(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = r, n = PS.bind(
      null,
      Yt,
      r,
      o,
      n
    ), r.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function Bg(t) {
    var e = qe();
    return Lg(e, ge, t);
  }
  function Lg(t, e, n) {
    if (e = ph(
      t,
      e,
      Hg
    )[0], t = jo(Di)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = ns(e);
      } catch (m) {
        throw m === qu ? No : m;
      }
    else l = e;
    e = qe();
    var r = e.queue, o = r.dispatch;
    return n !== e.memoizedState && (Yt.flags |= 2048, ju(
      9,
      { destroy: void 0 },
      WS.bind(null, r, n),
      null
    )), [l, o, t];
  }
  function WS(t, e) {
    t.action = e;
  }
  function qg(t) {
    var e = qe(), n = ge;
    if (n !== null)
      return Lg(e, n, t);
    qe(), e = e.memoizedState, n = qe();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function ju(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = Yt.updateQueue, e === null && (e = Go(), Yt.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Xg() {
    return qe().memoizedState;
  }
  function Qo(t, e, n, l) {
    var r = Nn();
    Yt.flags |= t, r.memoizedState = ju(
      1 | e,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function Zo(t, e, n, l) {
    var r = qe();
    l = l === void 0 ? null : l;
    var o = r.memoizedState.inst;
    ge !== null && l !== null && ch(l, ge.memoizedState.deps) ? r.memoizedState = ju(e, o, n, l) : (Yt.flags |= t, r.memoizedState = ju(
      1 | e,
      o,
      n,
      l
    ));
  }
  function Gg(t, e) {
    Qo(8390656, 8, t, e);
  }
  function Sh(t, e) {
    Zo(2048, 8, t, e);
  }
  function $S(t) {
    Yt.flags |= 4;
    var e = Yt.updateQueue;
    if (e === null)
      e = Go(), Yt.updateQueue = e, e.events = [t];
    else {
      var n = e.events;
      n === null ? e.events = [t] : n.push(t);
    }
  }
  function Vg(t) {
    var e = qe().memoizedState;
    return $S({ ref: e, nextImpl: t }), function() {
      if ((ie & 2) !== 0) throw Error(a(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function jg(t, e) {
    return Zo(4, 2, t, e);
  }
  function Qg(t, e) {
    return Zo(4, 4, t, e);
  }
  function Zg(t, e) {
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
  function Kg(t, e, n) {
    n = n != null ? n.concat([t]) : null, Zo(4, 4, Zg.bind(null, e, t), n);
  }
  function bh() {
  }
  function Jg(t, e) {
    var n = qe();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && ch(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function kg(t, e) {
    var n = qe();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && ch(e, l[1]))
      return l[0];
    if (l = t(), Wa) {
      Lt(!0);
      try {
        t();
      } finally {
        Lt(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function Th(t, e, n) {
    return n === void 0 || (Ri & 1073741824) !== 0 && (Ft & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = i_(), Yt.lanes |= t, sa |= t, n);
  }
  function Fg(t, e, n, l) {
    return sl(n, e) ? n : na.current !== null ? (t = Th(t, n, l), sl(t, e) || (ke = !0), t) : (Ri & 106) === 0 || (Ri & 1073741824) !== 0 && (Ft & 261930) === 0 ? (ke = !0, t.memoizedState = n) : (t = i_(), Yt.lanes |= t, sa |= t, e);
  }
  function Pg(t, e, n, l, r) {
    var o = ct.p;
    ct.p = o !== 0 && 8 > o ? o : 8;
    var m = it.T, y = {};
    y.types = m !== null ? m.types : null, it.T = y, Mh(t, !1, e, n);
    try {
      var E = r(), N = it.S;
      if (N !== null && N(y, E), E !== null && typeof E == "object" && typeof E.then == "function") {
        var X = JS(
          E,
          l
        );
        ls(
          t,
          e,
          X,
          dl(t)
        );
      } else
        ls(
          t,
          e,
          l,
          dl(t)
        );
    } catch (W) {
      ls(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: W },
        dl()
      );
    } finally {
      ct.p = o, m !== null && y.types !== null && (m.types = y.types), it.T = m;
    }
  }
  function IS() {
  }
  function Eh(t, e, n, l) {
    if (t.tag !== 5) throw Error(a(476));
    var r = Wg(t).queue;
    Pg(
      t,
      r,
      e,
      Tt,
      n === null ? IS : function() {
        return $g(t), n(l);
      }
    );
  }
  function Wg(t) {
    var e = t.memoizedState;
    if (e !== null) return e;
    e = {
      memoizedState: Tt,
      baseState: Tt,
      baseQueue: null,
      queue: {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Di,
        lastRenderedState: Tt
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
        lastRenderedReducer: Di,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function $g(t) {
    var e = Wg(t);
    e.next === null && (e = t.alternate.memoizedState), ls(
      t,
      e.next.queue,
      {},
      dl()
    );
  }
  function xh() {
    return gn(sr);
  }
  function Ig() {
    return qe().memoizedState;
  }
  function tp() {
    return qe().memoizedState;
  }
  function t2(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = dl();
          t = ta(n);
          var l = ea(e, t, n);
          l !== null && (Fn(l, e, n), Wr(l, e, n)), e = { cache: $f() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function e2(t, e, n) {
    var l = dl();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ko(t) ? np(e, n) : (n = jf(t, e, n, l), n !== null && (Fn(n, t, l), lp(n, e, l)));
  }
  function ep(t, e, n) {
    var l = dl();
    ls(t, e, n, l);
  }
  function ls(t, e, n, l) {
    var r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ko(t)) np(e, r);
    else {
      var o = t.alternate;
      if (t.lanes === 0 && (o === null || o.lanes === 0) && (o = e.lastRenderedReducer, o !== null))
        try {
          var m = e.lastRenderedState, y = o(m, n);
          if (r.hasEagerState = !0, r.eagerState = y, sl(y, m))
            return Eo(t, e, r, 0), ve === null && To(), !1;
        } catch {
        }
      if (n = jf(t, e, r, l), n !== null)
        return Fn(n, t, l), lp(n, e, l), !0;
    }
    return !1;
  }
  function Mh(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: gd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ko(t)) {
      if (e) throw Error(a(479));
    } else
      e = jf(
        t,
        n,
        l,
        2
      ), e !== null && Fn(e, t, 2);
  }
  function Ko(t) {
    var e = t.alternate;
    return t === Yt || e !== null && e === Yt;
  }
  function np(t, e) {
    Gu = qo = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function lp(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, tn(t, n);
    }
  }
  var Jo = {
    readContext: gn,
    use: Vo,
    useCallback: Ye,
    useContext: Ye,
    useEffect: Ye,
    useImperativeHandle: Ye,
    useLayoutEffect: Ye,
    useInsertionEffect: Ye,
    useMemo: Ye,
    useReducer: Ye,
    useRef: Ye,
    useState: Ye,
    useDebugValue: Ye,
    useDeferredValue: Ye,
    useTransition: Ye,
    useSyncExternalStore: Ye,
    useId: Ye,
    useHostTransitionStatus: Ye,
    useFormState: Ye,
    useActionState: Ye,
    useOptimistic: Ye,
    useMemoCache: Ye,
    useCacheRefresh: Ye,
    useEffectEvent: Ye
  }, ip = {
    readContext: gn,
    use: Vo,
    useCallback: function(t, e) {
      return Nn().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: gn,
    useEffect: Gg,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Qo(
        4194308,
        4,
        Zg.bind(null, e, t),
        n
      );
    },
    useLayoutEffect: function(t, e) {
      return Qo(4194308, 4, t, e);
    },
    useInsertionEffect: function(t, e) {
      Qo(4, 2, t, e);
    },
    useMemo: function(t, e) {
      var n = Nn();
      e = e === void 0 ? null : e;
      var l = t();
      if (Wa) {
        Lt(!0);
        try {
          t();
        } finally {
          Lt(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = Nn();
      if (n !== void 0) {
        var r = n(e);
        if (Wa) {
          Lt(!0);
          try {
            n(e);
          } finally {
            Lt(!1);
          }
        }
      } else r = e;
      return l.memoizedState = l.baseState = r, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: r
      }, l.queue = t, t = t.dispatch = e2.bind(
        null,
        Yt,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = Nn();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = vh(t);
      var e = t.queue, n = ep.bind(null, Yt, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: bh,
    useDeferredValue: function(t, e) {
      var n = Nn();
      return Th(n, t, e);
    },
    useTransition: function() {
      var t = vh(!1);
      return t = Pg.bind(
        null,
        Yt,
        t.queue,
        !0,
        !1
      ), Nn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var l = Yt, r = Nn();
      if (Vt) {
        if (n === void 0)
          throw Error(a(407));
        n = n();
      } else {
        if (n = e(), ve === null)
          throw Error(a(349));
        (Ft & 127) !== 0 || Mg(l, e, n);
      }
      r.memoizedState = n;
      var o = { value: n, getSnapshot: e };
      return r.queue = o, Gg(zg.bind(null, l, o, t), [
        t
      ]), l.flags |= 2048, ju(
        9,
        { destroy: void 0 },
        Og.bind(
          null,
          l,
          o,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Nn(), e = ve.identifierPrefix;
      if (Vt) {
        var n = li, l = ni;
        n = (l & ~(1 << 32 - at(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Xo++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = kS++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: xh,
    useFormState: Yg,
    useActionState: Yg,
    useOptimistic: function(t) {
      var e = Nn();
      e.memoizedState = e.baseState = t;
      var n = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: null,
        lastRenderedState: null
      };
      return e.queue = n, e = Mh.bind(
        null,
        Yt,
        !0,
        n
      ), n.dispatch = e, [t, e];
    },
    useMemoCache: gh,
    useCacheRefresh: function() {
      return Nn().memoizedState = t2.bind(
        null,
        Yt
      );
    },
    useEffectEvent: function(t) {
      var e = Nn(), n = { impl: t };
      return e.memoizedState = n, function() {
        if ((ie & 2) !== 0)
          throw Error(a(440));
        return n.impl.apply(void 0, arguments);
      };
    }
  }, ap = {
    readContext: gn,
    use: Vo,
    useCallback: Jg,
    useContext: gn,
    useEffect: Sh,
    useImperativeHandle: Kg,
    useInsertionEffect: jg,
    useLayoutEffect: Qg,
    useMemo: kg,
    useReducer: jo,
    useRef: Xg,
    useState: function() {
      return jo(Di);
    },
    useDebugValue: bh,
    useDeferredValue: function(t, e) {
      var n = qe();
      return Fg(
        n,
        ge.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = jo(Di)[0], e = qe().memoizedState;
      return [
        typeof t == "boolean" ? t : ns(t),
        e
      ];
    },
    useSyncExternalStore: xg,
    useId: Ig,
    useHostTransitionStatus: xh,
    useFormState: Bg,
    useActionState: Bg,
    useOptimistic: function(t, e) {
      var n = qe();
      return Cg(n, ge, t, e);
    },
    useMemoCache: gh,
    useCacheRefresh: tp,
    useEffectEvent: Vg
  }, n2 = {
    readContext: gn,
    use: Vo,
    useCallback: Jg,
    useContext: gn,
    useEffect: Sh,
    useImperativeHandle: Kg,
    useInsertionEffect: jg,
    useLayoutEffect: Qg,
    useMemo: kg,
    useReducer: _h,
    useRef: Xg,
    useState: function() {
      return _h(Di);
    },
    useDebugValue: bh,
    useDeferredValue: function(t, e) {
      var n = qe();
      return ge === null ? Th(n, t, e) : Fg(
        n,
        ge.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = _h(Di)[0], e = qe().memoizedState;
      return [
        typeof t == "boolean" ? t : ns(t),
        e
      ];
    },
    useSyncExternalStore: xg,
    useId: Ig,
    useHostTransitionStatus: xh,
    useFormState: qg,
    useActionState: qg,
    useOptimistic: function(t, e) {
      var n = qe();
      return ge !== null ? Cg(n, ge, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: gh,
    useCacheRefresh: tp,
    useEffectEvent: Vg
  };
  function Oh(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : R({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var zh = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = dl(), r = ta(l);
      r.payload = e, n != null && (r.callback = n), e = ea(t, r, l), e !== null && (Fn(e, t, l), Wr(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = dl(), r = ta(l);
      r.tag = 1, r.payload = e, n != null && (r.callback = n), e = ea(t, r, l), e !== null && (Fn(e, t, l), Wr(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = dl(), l = ta(n);
      l.tag = 2, e != null && (l.callback = e), e = ea(t, l, n), e !== null && (Fn(e, t, n), Wr(e, t, n));
    }
  };
  function up(t, e, n, l, r, o, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, o, m) : e.prototype && e.prototype.isPureReactComponent ? !jr(n, l) || !jr(r, o) : !0;
  }
  function rp(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && zh.enqueueReplaceState(e, e.state, null);
  }
  function $a(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = R({}, n));
      for (var r in t)
        n[r] === void 0 && (n[r] = t[r]);
    }
    return n;
  }
  function sp(t) {
    bo(t);
  }
  function op(t) {
    console.error(t);
  }
  function cp(t) {
    bo(t);
  }
  function ko(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function fp(t, e, n) {
    try {
      var l = t.onCaughtError;
      l(n.value, {
        componentStack: n.stack,
        errorBoundary: e.tag === 1 ? e.stateNode : null
      });
    } catch (r) {
      setTimeout(function() {
        throw r;
      });
    }
  }
  function Ah(t, e, n) {
    return n = ta(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      ko(t, e);
    }, n;
  }
  function hp(t) {
    return t = ta(t), t.tag = 3, t;
  }
  function dp(t, e, n, l) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var o = l.value;
      t.payload = function() {
        return r(o);
      }, t.callback = function() {
        fp(e, n, l);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      fp(e, n, l), typeof r != "function" && (oa === null ? oa = /* @__PURE__ */ new Set([this]) : oa.add(this));
      var y = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function l2(t, e, n, l, r) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
      if (e = n.alternate, e !== null && Qa(
        e,
        n,
        r,
        !0
      ), n = pn.current, n !== null) {
        switch (n.tag) {
          case 31:
          case 13:
          case 19:
            return On === null ? gc() : n.alternate === null && Be === 0 && (Be = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, l === Uo ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), hd(t, l, r)), !1;
          case 22:
            return n.flags |= 65536, l === Uo ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), hd(t, l, r)), !1;
        }
        throw Error(a(435, n.tag));
      }
      return hd(t, l, r), gc(), !1;
    }
    if (Vt)
      return e = pn.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, l !== kf && (t = Error(a(422), { cause: l }), Kr(wl(t, n)))) : (l !== kf && (e = Error(a(423), {
        cause: l
      }), Kr(
        wl(e, n)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, l = wl(l, n), r = Ah(
        t.stateNode,
        l,
        r
      ), ih(t, r), Be !== 4 && (Be = 2)), !1;
    var o = Error(a(520), { cause: l });
    if (o = wl(o, n), fs === null ? fs = [o] : fs.push(o), Be !== 4 && (Be = 2), e === null) return !0;
    l = wl(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = r & -r, n.lanes |= t, t = Ah(n.stateNode, l, t), ih(n, t), !1;
        case 1:
          if (e = n.type, o = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (oa === null || !oa.has(o))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = hp(r), dp(
              r,
              t,
              n,
              l
            ), ih(n, r), !1;
          break;
        case 22:
          if (n.memoizedState !== null)
            return n.flags |= 65536, !1;
      }
      n = n.return;
    } while (n !== null);
    return !1;
  }
  var wh = Error(a(461)), ke = !1;
  function en(t, e, n, l) {
    e.child = t === null ? _g(e, null, n, l) : Pa(
      e,
      t.child,
      n,
      l
    );
  }
  function mp(t, e, n, l, r) {
    n = n.render;
    var o = e.ref;
    if ("ref" in l) {
      var m = {};
      for (var y in l)
        y !== "ref" && (m[y] = l[y]);
    } else m = l;
    return Za(e), l = fh(
      t,
      e,
      n,
      m,
      o,
      r
    ), y = hh(), t !== null && !ke ? (dh(t, e, r), Ni(t, e, r)) : (Vt && y && zo(e), e.flags |= 1, en(t, e, l, r), e.child);
  }
  function gp(t, e, n, l, r) {
    if (t === null) {
      var o = n.type;
      return typeof o == "function" && !Qf(o) && o.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = o, pp(
        t,
        e,
        o,
        l,
        r
      )) : (t = Mo(
        n.type,
        null,
        l,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (o = t.child, !Bh(t, r)) {
      var m = o.memoizedProps;
      if (n = n.compare, n = n !== null ? n : jr, n(m, l) && t.ref === e.ref)
        return Ni(t, e, r);
    }
    return e.flags |= 1, t = zi(o, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function pp(t, e, n, l, r) {
    if (t !== null) {
      var o = t.memoizedProps;
      if (jr(o, l) && t.ref === e.ref)
        if (ke = !1, e.pendingProps = l = o, Bh(t, r))
          (t.flags & 131072) !== 0 && (ke = !0);
        else
          return e.lanes = t.lanes, Ni(t, e, r);
    }
    return Ch(
      t,
      e,
      n,
      l,
      r
    );
  }
  function _p(t, e, n, l) {
    var r = l.children, o = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (o = o !== null ? o.baseLanes | n : n, t !== null) {
          for (l = e.child = t.child, r = 0; l !== null; )
            r = r | l.lanes | l.childLanes, l = l.sibling;
          l = r & ~o;
        } else l = 0, e.child = null;
        return vp(
          t,
          e,
          o,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Do(
          e,
          o !== null ? o.cachePool : null
        ), o !== null ? Sg(e, o) : uh(), bg(e);
      else
        return l = e.lanes = 536870912, vp(
          t,
          e,
          o !== null ? o.baseLanes | n : n,
          n,
          l
        );
    } else
      o !== null ? (Do(e, o.cachePool), Sg(e, o), ia(), e.memoizedState = null) : (t !== null && Do(e, null), uh(), ia());
    return en(t, e, r, n), e.child;
  }
  function is(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function vp(t, e, n, l, r) {
    var o = th();
    return o = o === null ? null : { parent: Ke._currentValue, pool: o }, e.memoizedState = {
      baseLanes: n,
      cachePool: o
    }, t !== null && Do(e, null), uh(), bg(e), t !== null && Qa(t, e, l, !0), e.childLanes = r, null;
  }
  function Fo(t, e) {
    return e = Po(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function yp(t, e, n) {
    return Pa(e, t.child, null, n), t = Fo(e, e.pendingProps), t.flags |= 2, ol(e), e.memoizedState = null, t;
  }
  function i2(t, e, n) {
    var l = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if (Vt) {
        if (l.mode === "hidden")
          return t = Fo(e, l), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, is(null, t);
        if (sh(e), (t = Te) ? (t = Z_(
          t,
          Dl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ki !== null ? { id: ni, overflow: li } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ng(t), n.return = e, e.child = n, un = e, Te = null)) : t = null, t === null) throw Pi(e);
        return e.lanes = 536870912, null;
      }
      return Fo(e, l);
    }
    var o = t.memoizedState;
    if (o !== null) {
      var m = o.dehydrated;
      if (sh(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = yp(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(a(558));
      else if (ke || Qa(t, e, n, !1), r = (n & t.childLanes) !== 0, ke || r) {
        if (na.current === null) {
          if (l = ve, l !== null && (m = Il(l, n), m !== 0 && m !== o.retryLane))
            throw o.retryLane = m, Xa(t, m), Fn(l, t, m), wh;
          gc();
        }
        e = yp(
          t,
          e,
          n
        );
      } else
        t = o.treeContext, Te = Ul(m.nextSibling), un = e, Vt = !0, Fi = null, Dl = !1, t !== null && ag(e, t), e = Fo(e, l), e.flags |= 134221824;
      return e;
    }
    return t = zi(t.child, {
      mode: l.mode,
      children: l.children
    }), t.ref = e.ref, e.child = t, t.return = e, t;
  }
  function Qu(t, e) {
    var n = e.ref;
    if (n === null)
      t !== null && t.ref !== null && (e.flags |= 4194816);
    else {
      if (typeof n != "function" && typeof n != "object")
        throw Error(a(284));
      (t === null || t.ref !== n) && (e.flags |= 4194816);
    }
  }
  function Ch(t, e, n, l, r) {
    return Za(e), n = fh(
      t,
      e,
      n,
      l,
      void 0,
      r
    ), l = hh(), t !== null && !ke ? (dh(t, e, r), Ni(t, e, r)) : (Vt && l && zo(e), e.flags |= 1, en(t, e, n, r), e.child);
  }
  function Sp(t, e, n, l, r, o) {
    return Za(e), e.updateQueue = null, n = Eg(
      e,
      l,
      n,
      r
    ), Tg(t), l = hh(), t !== null && !ke ? (dh(t, e, o), Ni(t, e, o)) : (Vt && l && zo(e), e.flags |= 1, en(t, e, n, o), e.child);
  }
  function bp(t, e, n, l, r) {
    if (Za(e), e.stateNode === null) {
      var o = Uu, m = n.contextType;
      typeof m == "object" && m !== null && (o = gn(m)), o = new n(l, o), e.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, o.updater = zh, e.stateNode = o, o._reactInternals = e, o = e.stateNode, o.props = l, o.state = e.memoizedState, o.refs = {}, nh(e), m = n.contextType, o.context = typeof m == "object" && m !== null ? gn(m) : Uu, o.state = e.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (Oh(
        e,
        n,
        m,
        l
      ), o.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof o.getSnapshotBeforeUpdate == "function" || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (m = o.state, typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount(), m !== o.state && zh.enqueueReplaceState(o, o.state, null), Ir(e, l, o, r), $r(), o.state = e.memoizedState), typeof o.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      o = e.stateNode;
      var y = e.memoizedProps, E = $a(n, y);
      o.props = E;
      var N = o.context, X = n.contextType;
      m = Uu, typeof X == "object" && X !== null && (m = gn(X));
      var W = n.getDerivedStateFromProps;
      X = typeof W == "function" || typeof o.getSnapshotBeforeUpdate == "function", y = e.pendingProps !== y, X || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (y || N !== m) && rp(
        e,
        o,
        l,
        m
      ), Ii = !1;
      var C = e.memoizedState;
      o.state = C, Ir(e, l, o, r), $r(), N = e.memoizedState, y || C !== N || Ii ? (typeof W == "function" && (Oh(
        e,
        n,
        W,
        l
      ), N = e.memoizedState), (E = Ii || up(
        e,
        n,
        E,
        l,
        C,
        N,
        m
      )) ? (X || typeof o.UNSAFE_componentWillMount != "function" && typeof o.componentWillMount != "function" || (typeof o.componentWillMount == "function" && o.componentWillMount(), typeof o.UNSAFE_componentWillMount == "function" && o.UNSAFE_componentWillMount()), typeof o.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = N), o.props = l, o.state = N, o.context = m, l = E) : (typeof o.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      o = e.stateNode, lh(t, e), m = e.memoizedProps, X = $a(n, m), o.props = X, W = e.pendingProps, C = o.context, N = n.contextType, E = Uu, typeof N == "object" && N !== null && (E = gn(N)), y = n.getDerivedStateFromProps, (N = typeof y == "function" || typeof o.getSnapshotBeforeUpdate == "function") || typeof o.UNSAFE_componentWillReceiveProps != "function" && typeof o.componentWillReceiveProps != "function" || (m !== W || C !== E) && rp(
        e,
        o,
        l,
        E
      ), Ii = !1, C = e.memoizedState, o.state = C, Ir(e, l, o, r), $r();
      var Y = e.memoizedState;
      m !== W || C !== Y || Ii || t !== null && t.dependencies !== null && Co(t.dependencies) ? (typeof y == "function" && (Oh(
        e,
        n,
        y,
        l
      ), Y = e.memoizedState), (X = Ii || up(
        e,
        n,
        X,
        l,
        C,
        Y,
        E
      ) || t !== null && t.dependencies !== null && Co(t.dependencies)) ? (N || typeof o.UNSAFE_componentWillUpdate != "function" && typeof o.componentWillUpdate != "function" || (typeof o.componentWillUpdate == "function" && o.componentWillUpdate(l, Y, E), typeof o.UNSAFE_componentWillUpdate == "function" && o.UNSAFE_componentWillUpdate(
        l,
        Y,
        E
      )), typeof o.componentDidUpdate == "function" && (e.flags |= 4), typeof o.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof o.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = Y), o.props = l, o.state = Y, o.context = E, l = X) : (typeof o.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof o.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return o = l, Qu(t, e), l = (e.flags & 128) !== 0, o || l ? (o = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : o.render(), e.flags |= 1, t !== null && l ? (e.child = Pa(
      e,
      t.child,
      null,
      r
    ), e.child = Pa(
      e,
      null,
      n,
      r
    )) : en(t, e, n, r), e.memoizedState = o.state, t = e.child) : t = Ni(
      t,
      e,
      r
    ), t;
  }
  function Tp(t, e, n, l) {
    return Va(), e.flags |= 256, en(t, e, n, l), e.child;
  }
  var Rh = {
    dehydrated: null,
    treeContext: null,
    retryLane: 0,
    hydrationErrors: null
  };
  function Dh(t) {
    return { baseLanes: t, cachePool: fg() };
  }
  function Nh(t, e, n) {
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= hl), t;
  }
  function Ep(t, e, n) {
    var l = e.pendingProps, r = !1, o = (e.flags & 128) !== 0, m;
    if ((m = o) || (m = t !== null && t.memoizedState === null ? !1 : (_n.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if (Vt) {
        if (r ? la(e) : ia(), (t = Te) ? (t = Z_(
          t,
          Dl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: ki !== null ? { id: ni, overflow: li } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = ng(t), n.return = e, e.child = n, un = e, Te = null)) : t = null, t === null) throw Pi(e);
        return Dd(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return o = l.children, l = l.fallback, r ? (ia(), r = e.mode, o = Po(
        { mode: "hidden", children: o },
        r
      ), l = Ga(
        l,
        r,
        n,
        null
      ), o.return = e, l.return = e, o.sibling = l, e.child = o, l = e.child, l.memoizedState = Dh(n), l.childLanes = Nh(
        t,
        m,
        n
      ), e.memoizedState = Rh, is(null, l)) : (la(e), Uh(e, o));
    }
    var y = t.memoizedState;
    if (y !== null) {
      var E = y.dehydrated;
      if (E !== null)
        return a2(
          t,
          e,
          o,
          m,
          l,
          E,
          y,
          n
        );
    }
    return r ? (ia(), r = l.fallback, o = e.mode, y = t.child, E = y.sibling, l = zi(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 1206910976, E !== null ? r = zi(E, r) : (r = Ga(
      r,
      o,
      n,
      null
    ), r.flags |= 2), r.return = e, l.return = e, l.sibling = r, e.child = l, is(null, l), l = e.child, r = t.child.memoizedState, r === null ? r = Dh(n) : (o = r.cachePool, o !== null ? (y = Ke._currentValue, o = o.parent !== y ? { parent: y, pool: y } : o) : o = fg(), r = {
      baseLanes: r.baseLanes | n,
      cachePool: o
    }), l.memoizedState = r, l.childLanes = Nh(
      t,
      m,
      n
    ), e.memoizedState = Rh, is(t.child, l)) : (la(e), n = t.child, t = n.sibling, n = zi(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Uh(t, e) {
    return e = Po(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function Po(t, e) {
    return t = Zn(22, t, null, e), t.lanes = 0, t;
  }
  function Wo(t, e, n) {
    return Pa(e, t.child, null, n), t = Uh(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function a2(t, e, n, l, r, o, m, y) {
    if (n)
      return e.flags & 256 ? (la(e), e.flags &= -257, Wo(
        t,
        e,
        y
      )) : e.memoizedState !== null ? (ia(), e.child = t.child, e.flags |= 128, null) : (ia(), o = r.fallback, m = e.mode, r = Po(
        { mode: "visible", children: r.children },
        m
      ), o = Ga(
        o,
        m,
        y,
        null
      ), o.flags |= 2, r.return = e, o.return = e, r.sibling = o, e.child = r, Pa(e, t.child, null, y), r = e.child, r.memoizedState = Dh(y), r.childLanes = Nh(
        t,
        l,
        y
      ), e.memoizedState = Rh, is(null, r));
    if (la(e), Dd(o)) {
      if (l = o.nextSibling && o.nextSibling.dataset, l) var E = l.dgst;
      return l = E, l !== "" && (r = Error(a(419)), r.stack = "", r.digest = l, Kr({ value: r, source: null, stack: null })), Wo(
        t,
        e,
        y
      );
    }
    if (ke || Qa(t, e, y, !1), l = (y & t.childLanes) !== 0, ke || l) {
      if (na.current !== null)
        return Wo(
          t,
          e,
          y
        );
      if (l = ve, l !== null && (r = Il(
        l,
        y
      ), r !== 0 && r !== m.retryLane))
        throw m.retryLane = r, Xa(t, r), Fn(l, t, r), wh;
      return Rd(o) || gc(), Wo(
        t,
        e,
        y
      );
    }
    return Rd(o) ? (e.flags |= 192, e.child = t.child, null) : (t = m.treeContext, Te = Ul(o.nextSibling), un = e, Vt = !0, Fi = null, Dl = !1, t !== null && ag(e, t), e = Uh(
      e,
      r.children
    ), e.flags |= 134221824, e);
  }
  function xp(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), wo(t.return, e, n);
  }
  function Mp(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Lo(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function $o(t, e, n, l, r, o) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: r,
      treeForkCount: o
    } : (m.isBackwards = e, m.rendering = null, m.renderingStartTime = 0, m.last = l, m.tail = n, m.tailMode = r, m.treeForkCount = o);
  }
  function Hh(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Yh(t, e, n) {
    var l = e.pendingProps, r = l.revealOrder, o = l.tail;
    l = l.children;
    var m = _n.current;
    if (e.flags & 128)
      return ts(e, m), null;
    var y = (m & 2) !== 0;
    if (y ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, ts(e, m), r === "backwards" && t !== null ? (Hh(t), en(t, e, l, n), Hh(t)) : en(t, e, l, n), l = Vt ? Zr : 0, !y && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && xp(t, n, e);
        else if (t.tag === 19)
          xp(t, n, e);
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
        n = Mp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null, Hh(e)), $o(
          e,
          !0,
          r,
          null,
          o,
          l
        );
        break;
      case "unstable_legacy-backwards":
        for (n = null, r = e.child, e.child = null; r !== null; ) {
          if (t = r.alternate, t !== null && Lo(t) === null) {
            e.child = r;
            break;
          }
          t = r.sibling, r.sibling = n, n = r, r = t;
        }
        $o(
          e,
          !0,
          n,
          null,
          o,
          l
        );
        break;
      case "together":
        $o(
          e,
          !1,
          null,
          null,
          void 0,
          l
        );
        break;
      case "independent":
        e.memoizedState = null;
        break;
      default:
        n = Mp(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), $o(
          e,
          !1,
          r,
          n,
          o,
          l
        );
    }
    return e.child;
  }
  function Op(t, e, n) {
    var l = e.pendingProps;
    return Wi(e, e.type, l.value), en(t, e, l.children, n), e.child;
  }
  function Ni(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), sa |= e.lanes, (n & e.childLanes) === 0)
      if (t !== null) {
        if (Qa(
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
      for (t = e.child, n = zi(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = zi(t, t.pendingProps), n.return = e;
      n.sibling = null;
    }
    return e.child;
  }
  function Bh(t, e) {
    return (t.lanes & e) !== 0 ? !0 : (t = t.dependencies, !!(t !== null && Co(t)));
  }
  function u2(t, e, n) {
    switch (e.tag) {
      case 3:
        Kt(e, e.stateNode.containerInfo), Wi(e, Ke, t.memoizedState.cache), Va();
        break;
      case 27:
      case 5:
        Gt(e);
        break;
      case 4:
        Kt(e, e.stateNode.containerInfo);
        break;
      case 10:
        Wi(
          e,
          e.type,
          e.memoizedProps.value
        );
        break;
      case 31:
        if (e.memoizedState !== null)
          return e.flags |= 128, sh(e), null;
        break;
      case 13:
        var l = e.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return la(e), e.flags |= 128, null;
          l = Qa(
            t,
            e,
            n,
            !1
          );
          var r = e.child.childLanes;
          return l || (n & r) !== 0 ? Ep(t, e, n) : (la(e), t = Ni(
            t,
            e,
            n
          ), t !== null ? t.sibling : null);
        }
        la(e);
        break;
      case 19:
        if (e.flags & 128)
          return Yh(
            t,
            e,
            n
          );
        if (r = (t.flags & 128) !== 0, l = (n & e.childLanes) !== 0, l || (Qa(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), r) {
          if (l)
            return Yh(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), ts(e, _n.current), l) break;
        return null;
      case 22:
        return e.lanes = 0, _p(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        Wi(e, Ke, t.memoizedState.cache);
    }
    return Ni(t, e, n);
  }
  function zp(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        ke = !0;
      else {
        if (!Bh(t, n) && (e.flags & 128) === 0)
          return ke = !1, u2(
            t,
            e,
            n
          );
        ke = (t.flags & 131072) !== 0;
      }
    else
      ke = !1, Vt && (e.flags & 1048576) !== 0 && ig(e, Zr, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (t = ka(e.elementType), e.type = t, typeof t == "function")
            Qf(t) ? (l = $a(t, l), e.tag = 1, e = bp(
              null,
              e,
              t,
              l,
              n
            )) : (e.tag = 0, e = Ch(
              null,
              e,
              t,
              l,
              n
            ));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === K) {
                e.tag = 11, e = mp(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (r === st) {
                e.tag = 14, e = gp(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (r === et) {
                e.tag = 10, e.type = t, e = Op(
                  null,
                  e,
                  n
                );
                break t;
              }
            }
            throw e = ut(t) || t, Error(a(306, e, ""));
          }
        }
        return e;
      case 0:
        return Ch(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 1:
        return l = e.type, r = $a(
          l,
          e.pendingProps
        ), bp(
          t,
          e,
          l,
          r,
          n
        );
      case 3:
        t: {
          if (Kt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(a(387));
          l = e.pendingProps;
          var o = e.memoizedState;
          r = o.element, lh(t, e), Ir(e, l, null, n);
          var m = e.memoizedState;
          if (l = m.cache, Wi(e, Ke, l), l !== o.cache && Wf(
            e,
            [Ke],
            n,
            !0
          ), $r(), l = m.element, o.isDehydrated)
            if (o = {
              element: l,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = o, e.memoizedState = o, e.flags & 256) {
              e = Tp(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== r) {
              r = wl(
                Error(a(424)),
                e
              ), Kr(r), e = Tp(
                t,
                e,
                l,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, Te = Ul(t.firstChild), un = e, Vt = !0, Fi = null, Dl = !0, n = _g(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Va(), l === r) {
              e = Ni(
                t,
                e,
                n
              );
              break t;
            }
            en(t, e, l, n);
          }
          e = e.child;
        }
        return e;
      case 26:
        return Qu(t, e), t === null ? (n = $_(
          e.type,
          null,
          e.pendingProps,
          null
        )) ? e.memoizedState = n : Vt || (e.stateNode = R_(
          e.type,
          e.pendingProps,
          At.current,
          e
        )) : e.memoizedState = $_(
          e.type,
          t.memoizedProps,
          e.pendingProps,
          t.memoizedState
        ), null;
      case 27:
        return Gt(e), t === null && Vt && (l = e.stateNode = k_(
          e.type,
          e.pendingProps,
          At.current
        ), un = e, Dl = !0, r = Te, ha(e.type) ? (Nd = r, Te = Ul(l.firstChild)) : Te = r), en(
          t,
          e,
          e.pendingProps.children,
          n
        ), Qu(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && Vt && ((r = l = Te) && (l = tb(
          l,
          e.type,
          e.pendingProps,
          Dl
        ), l !== null ? (e.stateNode = l, un = e, Te = Ul(l.firstChild), Dl = !1, r = !0) : r = !1), r || Pi(e)), Gt(e), r = e.type, o = e.pendingProps, m = t !== null ? t.memoizedProps : null, l = o.children, xd(r, o) ? l = null : m !== null && xd(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = fh(
          t,
          e,
          FS,
          null,
          null,
          n
        ), sr._currentValue = r), Qu(t, e), en(t, e, l, n), e.child;
      case 6:
        return t === null && Vt && ((t = n = Te) && (n = eb(
          n,
          e.pendingProps,
          Dl
        ), n !== null ? (e.stateNode = n, un = e, Te = null, t = !0) : t = !1), t || Pi(e)), null;
      case 13:
        return Ep(t, e, n);
      case 4:
        return Kt(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = Pa(
          e,
          null,
          l,
          n
        ) : en(t, e, l, n), e.child;
      case 11:
        return mp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return l = e.pendingProps, Qu(t, e), en(t, e, l, n), e.child;
      case 8:
        return en(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return en(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return Op(t, e, n);
      case 9:
        return r = e.type._context, l = e.pendingProps.children, Za(e), r = gn(r), l = l(r), e.flags |= 1, en(t, e, l, n), e.child;
      case 14:
        return gp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return pp(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Yh(t, e, n);
      case 31:
        return i2(t, e, n);
      case 22:
        return _p(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Za(e), l = gn(Ke), t === null ? (r = th(), r === null && (r = ve, o = $f(), r.pooledCache = o, o.refCount++, o !== null && (r.pooledCacheLanes |= n), r = o), e.memoizedState = { parent: l, cache: r }, nh(e), Wi(e, Ke, r)) : ((t.lanes & n) !== 0 && (lh(t, e), Ir(e, null, null, n), $r()), r = t.memoizedState, o = e.memoizedState, r.parent !== l ? (r = { parent: l, cache: l }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), Wi(e, Ke, l)) : (l = o.cache, Wi(e, Ke, l), l !== r.cache && Wf(
          e,
          [Ke],
          n,
          !0
        ))), en(
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
        }), l = e.pendingProps, l.name != null && l.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : Vt && zo(e), t !== null && t.memoizedProps.name !== l.name ? e.flags |= 4194816 : Qu(t, e), en(t, e, l.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(a(156, e.tag));
  }
  function Ui(t) {
    t.flags |= 4;
  }
  function Lh(t, e, n, l, r) {
    var o;
    if ((o = (t.mode & 32) !== 0) && (o = n === null ? nv(e, l) : nv(e, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), o) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (s_()) t.flags |= 8192;
        else
          throw Fa = Uo, eh;
    } else t.flags &= -16777217;
  }
  function Ap(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !lv(e))
      if (s_()) t.flags |= 8192;
      else
        throw Fa = Uo, eh;
  }
  function Io(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? be() : 536870912, t.lanes |= e, Fu |= e);
  }
  function as(t, e) {
    if (!Vt)
      switch (t.tailMode) {
        case "visible":
          break;
        case "collapsed":
          for (var n = t.tail, l = null; n !== null; )
            n.alternate !== null && (l = n), n = n.sibling;
          l === null ? e || t.tail === null ? t.tail = null : t.tail.sibling = null : l.sibling = null;
          break;
        default:
          for (e = t.tail, n = null; e !== null; )
            e.alternate !== null && (n = e), e = e.sibling;
          n === null ? t.tail = null : n.sibling = null;
      }
  }
  function Ee(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
    if (e)
      for (var r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, l |= r.subtreeFlags & 1206910976, l |= r.flags & 1206910976, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, l |= r.subtreeFlags, l |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= l, t.childLanes = n, e;
  }
  function r2(t, e, n) {
    var l = e.pendingProps;
    switch (Jf(e), e.tag) {
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return Ee(e), null;
      case 1:
        return Ee(e), null;
      case 3:
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Ci(Ke), It(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Bu(e) ? Ui(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, Ff())), Ee(e), null;
      case 26:
        var r = e.type, o = e.memoizedState;
        return t === null ? (Ui(e), o !== null ? (Ee(e), Ap(e, o)) : (Ee(e), Lh(
          e,
          r,
          null,
          l,
          n
        ))) : o ? o !== t.memoizedState ? (Ui(e), Ee(e), Ap(e, o)) : (Ee(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && Ui(e), Ee(e), Lh(
          e,
          r,
          t,
          l,
          n
        )), null;
      case 27:
        if (le(e), n = At.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Ui(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ee(e), e.subtreeFlags &= -33554433, null;
          }
          t = mt.current, Bu(e) ? ug(e) : (t = k_(r, l, n), e.stateNode = t, Ui(e));
        }
        return Ee(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (le(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Ui(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ee(e), e.subtreeFlags &= -33554433, null;
          }
          if (o = mt.current, Bu(e))
            ug(e);
          else {
            var m = ps(
              At.current
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
                    o = typeof l.is == "string" ? m.createElement("select", {
                      is: l.is
                    }) : m.createElement("select"), l.multiple ? o.multiple = !0 : l.size && (o.size = l.size);
                    break;
                  default:
                    o = typeof l.is == "string" ? m.createElement(r, { is: l.is }) : m.createElement(r);
                }
            }
            o[Qe] = e, o[Ze] = l;
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
            t: switch (yn(o, r, l), r) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                l = !!l.autoFocus;
                break t;
              case "img":
                l = !0;
                break t;
              default:
                l = !1;
            }
            l && Ui(e);
          }
        }
        return Ee(e), e.subtreeFlags &= -33554433, Lh(
          e,
          e.type,
          t === null ? null : t.memoizedProps,
          e.pendingProps,
          n
        ), null;
      case 6:
        if (t && e.stateNode != null)
          t.memoizedProps !== l && Ui(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(a(166));
          if (t = At.current, Bu(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, r = un, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  l = r.memoizedProps;
              }
            t[Qe] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || z_(t.nodeValue, n)), t || Pi(e, !0);
          } else
            t = ps(t).createTextNode(
              l
            ), t[Qe] = e, e.stateNode = t;
        }
        return Ee(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (l = Bu(e), n !== null) {
            if (t === null) {
              if (!l) throw Error(a(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(557));
              t[Qe] = e;
            } else
              Va(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ee(e), t = !1;
          } else
            n = Ff(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (ol(e), e) : (ol(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Ee(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Bu(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(a(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(a(317));
              r[Qe] = e;
            } else
              Va(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ee(e), r = !1;
          } else
            r = Ff(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (ol(e), e) : (ol(e), null);
        }
        return ol(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, r = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (r = l.alternate.memoizedState.cachePool.pool), o = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (o = l.memoizedState.cachePool.pool), o !== r && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), Io(e, e.updateQueue), Ee(e), null);
      case 4:
        return It(), t === null && yd(e.stateNode.containerInfo), e.flags |= 67108864, Ee(e), null;
      case 10:
        return Ci(e.type), Ee(e), null;
      case 19:
        if (oh(e), l = e.memoizedState, l === null) return Ee(e), null;
        if (r = (e.flags & 128) !== 0, o = l.rendering, o === null)
          if (r) as(l, !1);
          else {
            if (Be !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (o = Lo(t), o !== null) {
                  for (e.flags |= 128, as(l, !1), t = o.updateQueue, e.updateQueue = t, Io(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    eg(n, t), n = n.sibling;
                  return ts(
                    e,
                    _n.current & 1 | 2
                  ), Vt && Ai(e, l.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            l.tail !== null && wt() > fc && (e.flags |= 128, r = !0, as(l, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = Lo(o), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, Io(e, t), as(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !o.alternate && !Vt)
                return Ee(e), null;
            } else
              2 * wt() - l.renderingStartTime > fc && n !== 536870912 && (e.flags |= 128, r = !0, as(l, !1), e.lanes = 4194304);
          l.isBackwards ? (o.sibling = e.child, e.child = o) : (t = l.last, t !== null ? t.sibling = o : e.child = o, l.last = o);
        }
        if (l.tail !== null) {
          t = l.tail;
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
          return l.rendering = t, l.tail = t.sibling, l.renderingStartTime = wt(), t.sibling = null, o = _n.current, o = r ? o & 1 | 2 : o & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || Vt ? ts(e, o) : (n = o, tt(pn, e), tt(_n, n), On === null && (On = e)), Vt && Ai(e, l.treeForkCount), t;
        }
        return Ee(e), null;
      case 22:
      case 23:
        return ol(e), rh(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Ee(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ee(e), n = e.updateQueue, n !== null && Io(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && U(Ja), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Ci(Ke), Ee(e), null;
      case 25:
        return null;
      case 30:
        return e.flags |= 33554432, Ee(e), null;
    }
    throw Error(a(156, e.tag));
  }
  function s2(t, e) {
    switch (Jf(e), e.tag) {
      case 1:
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 3:
        return Ci(Ke), It(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return le(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (ol(e), e.alternate === null)
            throw Error(a(340));
          Va();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (ol(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
          if (e.alternate === null)
            throw Error(a(340));
          Va();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 19:
        return oh(e), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, t = e.memoizedState, t !== null && (t.rendering = null, t.tail = null), e.flags |= 4, e) : null;
      case 4:
        return It(), null;
      case 10:
        return Ci(e.type), null;
      case 22:
      case 23:
        return ol(e), rh(), t !== null && U(Ja), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Ci(Ke), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function wp(t, e) {
    switch (Jf(e), e.tag) {
      case 3:
        Ci(Ke), It();
        break;
      case 26:
      case 27:
      case 5:
        le(e);
        break;
      case 4:
        It();
        break;
      case 31:
        e.memoizedState !== null && ol(e);
        break;
      case 13:
        ol(e);
        break;
      case 19:
        oh(e);
        break;
      case 10:
        Ci(e.type);
        break;
      case 22:
      case 23:
        ol(e), rh(), t !== null && U(Ja);
        break;
      case 24:
        Ci(Ke);
    }
  }
  function us(t, e) {
    try {
      var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var r = l.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            l = void 0;
            var o = n.create, m = n.inst;
            l = o(), m.destroy = l;
          }
          n = n.next;
        } while (n !== r);
      }
    } catch (y) {
      fe(e, e.return, y);
    }
  }
  function aa(t, e, n) {
    try {
      var l = e.updateQueue, r = l !== null ? l.lastEffect : null;
      if (r !== null) {
        var o = r.next;
        l = o;
        do {
          if ((l.tag & t) === t) {
            var m = l.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, r = e;
              var E = n, N = y;
              try {
                N();
              } catch (X) {
                fe(
                  r,
                  E,
                  X
                );
              }
            }
          }
          l = l.next;
        } while (l !== o);
      }
    } catch (X) {
      fe(e, e.return, X);
    }
  }
  function Cp(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        yg(e, n);
      } catch (l) {
        fe(t, t.return, l);
      }
    }
  }
  function Rp(t, e, n) {
    n.props = $a(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      fe(t, e, l);
    }
  }
  function ii(t, e) {
    try {
      var n = t.ref;
      if (n !== null) {
        switch (t.tag) {
          case 26:
          case 27:
          case 5:
            var l = t.stateNode;
            break;
          case 30:
            var r = t.stateNode, o = Mi(t.memoizedProps, r);
            (r.ref === null || r.ref.name !== o) && (r.ref = L_(o)), l = r.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var m = new ml(t);
              v(
                t.child,
                !1,
                $2,
                m,
                void 0,
                void 0
              ), t.stateNode = m;
            }
            l = t.stateNode;
            break;
          default:
            l = t.stateNode;
        }
        typeof n == "function" ? t.refCleanup = n(l) : n.current = l;
      }
    } catch (y) {
      fe(t, e, y);
    }
  }
  function vn(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
        } catch (r) {
          fe(t, e, r);
        } finally {
          t.refCleanup = null, t = t.alternate, t != null && (t.refCleanup = null);
        }
      else if (typeof n == "function")
        try {
          n(null);
        } catch (r) {
          fe(t, e, r);
        }
      else n.current = null;
  }
  function tc(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        Q_(
          t.stateNode,
          e[n]
        );
  }
  function Dp(t) {
    for (var e = t.return; e !== null && (Xh(e) && Q_(t.stateNode, e.stateNode), !qh(e)); )
      e = e.return;
  }
  function rs(t) {
    for (var e = t.return; e !== null && (Xh(e) && I2(t.stateNode, e.stateNode), !qh(e)); )
      e = e.return;
  }
  function qh(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 27;
  }
  function Xh(t) {
    return t && t.tag === 7 && t.stateNode !== null;
  }
  function Gh(t) {
    var e = t.type, n = t.memoizedProps, l = t.stateNode;
    try {
      t: switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          n.autoFocus && l.focus();
          break t;
        case "img":
          n.src ? l.src = n.src : n.srcSet && (l.srcset = n.srcSet);
      }
    } catch (r) {
      fe(t, t.return, r);
    }
  }
  function Vh(t, e, n) {
    try {
      var l = t.stateNode;
      U2(l, t.type, n, e), l[Ze] = e;
    } catch (r) {
      fe(t, t.return, r);
    }
  }
  function Np(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ha(t.type) || t.tag === 4;
  }
  function jh(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Np(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ha(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Qh(t, e, n, l) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(r, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(r), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = ei)), tc(t, l), ne = !0;
    else if (r !== 4 && (r === 27 && (tc(t, l), l = null, ha(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Qh(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        Qh(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function ec(t, e, n, l) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? n.insertBefore(r, e) : n.appendChild(r), tc(t, l), ne = !0;
    else if (r !== 4 && (r === 27 && (tc(t, l), l = null, ha(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (ec(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        ec(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function Up(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      yn(e, l, n), e[Qe] = t, e[Ze] = n;
    } catch (o) {
      fe(t, t.return, o);
    }
  }
  var nc = !1, cl = null;
  function Hp(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (nc = !0);
  }
  var ai = null;
  function Yp() {
    var t = ai;
    return ai = null, t;
  }
  var Kn = 0;
  function Zu(t, e, n, l, r) {
    return Kn = 0, Bp(
      t.child,
      e,
      n,
      l,
      r
    );
  }
  function Bp(t, e, n, l, r) {
    for (var o = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (l !== null) {
          var y = zd(m);
          l.push(y), y.view && (o = !0);
        } else
          o || zd(m).view && (o = !0);
        nc = !0, Y_(
          m,
          Kn === 0 ? e : e + "_" + Kn,
          n
        ), Kn++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && r || Bp(
        t.child,
        e,
        n,
        l,
        r
      ) && (o = !0));
      t = t.sibling;
    }
    return o;
  }
  function ui(t, e) {
    for (; t !== null; )
      t.tag === 5 ? B_(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || ui(
        t.child,
        e
      )), t = t.sibling;
  }
  function lc(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if ((t.tag !== 22 || t.memoizedState === null) && (lc(t), t.tag === 30 && (t.flags & 18874368) !== 0 && t.stateNode.paired)) {
          var e = t.memoizedProps;
          if (e.name == null || e.name === "auto")
            throw Error(a(544));
          var n = e.name;
          e = Oi(e.default, e.share), e !== "none" && (Zu(
            t,
            n,
            e,
            null,
            !1
          ) || ui(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function Zh(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, l = t.memoizedProps, r = Mi(l, n), o = Oi(
        l.default,
        n.paired ? l.share : l.enter
      );
      o !== "none" ? Zu(t, r, o, null, !1) ? (lc(t), n.paired || e || Iu(t, l.onEnter)) : ui(t.child, !1) : lc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Zh(t, e), t = t.sibling;
    else lc(t);
  }
  function Kh(t) {
    if (cl !== null && cl.size !== 0) {
      var e = cl;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var r = e.get(l);
                if (r !== void 0) {
                  var o = Oi(
                    n.default,
                    n.share
                  );
                  if (o !== "none" && (Zu(
                    t,
                    l,
                    o,
                    null,
                    !1
                  ) ? (o = t.stateNode, r.paired = o, o.paired = r, Iu(t, n.onShare)) : ui(t.child, !1)), e.delete(l), e.size === 0) break;
                }
              }
            }
            Kh(t);
          }
          t = t.sibling;
        }
    }
  }
  function Jh(t) {
    if (t.tag === 30) {
      var e = t.memoizedProps, n = Mi(e, t.stateNode), l = cl !== null ? cl.get(n) : void 0, r = Oi(
        e.default,
        l !== void 0 ? e.share : e.exit
      );
      r !== "none" && (Zu(t, n, r, null, !1) ? l !== void 0 ? (r = t.stateNode, l.paired = r, r.paired = l, cl.delete(n), Iu(t, e.onShare)) : Iu(t, e.onExit) : ui(t.child, !1)), cl !== null && Kh(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Jh(t), t = t.sibling;
    else
      cl !== null && Kh(t);
  }
  function Lp(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Mi(e, t.stateNode);
        e = Oi(e.default, e.update), t.flags &= -5, e !== "none" && Zu(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && Lp(t);
      t = t.sibling;
    }
  }
  function kh(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, ui(t.child, !1));
          }
          kh(t);
        }
        t = t.sibling;
      }
  }
  function ic(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, ui(t.child, !1), kh(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        ic(t), t = t.sibling;
    else kh(t);
  }
  function qp(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? ui(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && qp(t), t = t.sibling;
  }
  function Fh(t, e, n, l, r, o, m) {
    for (var y = !1; e !== null; ) {
      if (e.tag === 5) {
        var E = e.stateNode;
        if (o !== null && Kn < o.length) {
          var N = o[Kn], X = zd(E);
          (N.view || X.view) && (y = !0);
          var W;
          if (W = (t.flags & 4) === 0)
            if (X.clip) W = !0;
            else {
              W = N.rect;
              var C = X.rect;
              W = W.y !== C.y || W.x !== C.x || W.height !== C.height || W.width !== C.width;
            }
          W && (t.flags |= 4), X.abs ? X = !N.abs : (N = N.rect, X = X.rect, X = N.height !== X.height || N.width !== X.width), X && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Y_(
          E,
          Kn === 0 ? n : n + "_" + Kn,
          r
        ), y && (t.flags & 4) !== 0 || (ai === null && (ai = []), ai.push(
          E,
          Kn === 0 ? l : l + "_" + Kn,
          e.memoizedProps
        )), Kn++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && m ? t.flags |= e.flags & 32 : Fh(
        t,
        e.child,
        n,
        l,
        r,
        o,
        m
      ) && (y = !0));
      e = e.sibling;
    }
    return y;
  }
  function Xp(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, l = t.stateNode, r = Mi(n, l), o = Oi(n.default, n.update), m;
        m = t.memoizedState, t.memoizedState = null, l = t;
        var y = t.child;
        Kn = 0, r = Fh(
          l,
          y,
          r,
          r,
          o,
          m,
          !1
        ), (t.flags & 4) !== 0 && r && Iu(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Xp(t);
      t = t.sibling;
    }
  }
  var rn = !1, re = !1, ri = !1, Ph = !1, Gp = typeof WeakSet == "function" ? WeakSet : Set, sn = null, si = !1, ss = !1, ac = !1, Wh = !1;
  function o2(t, e, n) {
    if (t = t.containerInfo, Td = or, t = Zm(t), Bf(t)) {
      if ("selectionStart" in t)
        var l = {
          start: t.selectionStart,
          end: t.selectionEnd
        };
      else
        t: {
          l = (l = t.ownerDocument) && l.defaultView || window;
          var r = l.getSelection && l.getSelection();
          if (r && r.rangeCount !== 0) {
            l = r.anchorNode;
            var o = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              l.nodeType, m.nodeType;
            } catch {
              l = null;
              break t;
            }
            var y = 0, E = -1, N = -1, X = 0, W = 0, C = t, Y = null;
            e: for (; ; ) {
              for (var ot; C !== l || o !== 0 && C.nodeType !== 3 || (E = y + o), C !== m || r !== 0 && C.nodeType !== 3 || (N = y + r), C.nodeType === 3 && (y += C.nodeValue.length), (ot = C.firstChild) !== null; )
                Y = C, C = ot;
              for (; ; ) {
                if (C === t) break e;
                if (Y === l && ++X === o && (E = y), Y === m && ++W === r && (N = y), (ot = C.nextSibling) !== null) break;
                C = Y, Y = C.parentNode;
              }
              C = ot;
            }
            l = E === -1 || N === -1 ? null : { start: E, end: N };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Ed = { focusedElem: t, selectionRange: l }, or = !1, n = (n & 335544064) === n, sn = e, e = n ? 9270 : 1024; sn !== null; ) {
      if (t = sn, n && (l = t.deletions, l !== null))
        for (o = 0; o < l.length; o++)
          n && Jh(l[o]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && Hp(t), uc(n);
      else {
        if (t.tag === 22) {
          if (l = t.alternate, t.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && Jh(l), uc(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && Hp(t), uc(n);
            continue;
          }
        }
        l = t.child, (t.subtreeFlags & e) !== 0 && l !== null ? (l.return = t, sn = l) : (n && Lp(t), uc(n));
      }
    }
    cl = null;
  }
  function uc(t) {
    for (; sn !== null; ) {
      var e = sn, n = t, l = e.alternate, r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((r & 1024) !== 0 && l !== null) {
            n = void 0, r = l.memoizedProps, l = l.memoizedState;
            var o = e.stateNode;
            try {
              var m = $a(
                e.type,
                r
              );
              n = o.getSnapshotBeforeUpdate(
                m,
                l
              ), o.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              fe(e, e.return, y);
            }
          }
          break;
        case 3:
          if ((r & 1024) !== 0) {
            if (l = e.stateNode.containerInfo, n = l.nodeType, n === 9)
              Cd(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Cd(l);
                  break;
                default:
                  l.textContent = "";
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
          n && l !== null && (n = Mi(
            l.memoizedProps,
            l.stateNode
          ), r = e.memoizedProps, r = Oi(r.default, r.update), r !== "none" && Zu(
            l,
            n,
            r,
            l.memoizedState = [],
            !0
          ));
          break;
        default:
          if ((r & 1024) !== 0) throw Error(a(163));
      }
      if (l = e.sibling, l !== null) {
        l.return = e.return, sn = l;
        break;
      }
      sn = e.return;
    }
  }
  function Vp(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        oi(t, n), l & 4 && us(5, n);
        break;
      case 1:
        if (oi(t, n), l & 4)
          if (t = n.stateNode, e === null)
            try {
              t.componentDidMount();
            } catch (m) {
              fe(n, n.return, m);
            }
          else {
            var r = $a(
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
              fe(
                n,
                n.return,
                m
              );
            }
          }
        l & 64 && Cp(n), l & 512 && ii(n, n.return);
        break;
      case 3:
        if (oi(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
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
            yg(t, e);
          } catch (m) {
            fe(n, n.return, m);
          }
        }
        break;
      case 27:
        e === null && l & 4 && Up(n);
      case 26:
      case 5:
        oi(t, n), e === null && l & 4 && Gh(n), l & 512 && ii(n, n.return);
        break;
      case 12:
        oi(t, n);
        break;
      case 31:
        oi(t, n), l & 4 && Kp(t, n);
        break;
      case 13:
        oi(t, n), l & 4 && Jp(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = b2.bind(
          null,
          n
        ), nb(t, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || rn, !l) {
          var o = e !== null && e.memoizedState !== null || re;
          e = rn, r = re, rn = l, (re = o) && !r ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), Kl(
            t,
            n,
            l
          )) : oi(t, n), rn = e, re = r;
        }
        break;
      case 30:
        oi(t, n), l & 512 && ii(n, n.return);
        break;
      case 7:
        l & 512 && ii(n, n.return);
      default:
        oi(t, n);
    }
  }
  function $h(t, e) {
    for (t = t.child; t !== null; )
      jp(t, e), t = t.sibling;
  }
  function jp(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
          } else {
            var r = t.stateNode, o = t.memoizedProps.style, m = o != null && o.hasOwnProperty("display") ? o.display : null;
            r.style.display = m == null || typeof m == "boolean" ? "" : ("" + m).trim();
          }
        } catch (E) {
          fe(t, t.return, E);
        }
        Ih(t, e);
        break;
      case 6:
        try {
          t.stateNode.nodeValue = e ? "" : t.memoizedProps, ne = !0;
        } catch (E) {
          fe(t, t.return, E);
        }
        break;
      case 18:
        try {
          var y = t.stateNode;
          e ? H_(y, !0) : H_(t.stateNode, !1);
        } catch (E) {
          fe(t, t.return, E);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && $h(t, e);
        break;
      default:
        $h(t, e);
    }
  }
  function Ih(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, l = e;
          switch (n.tag) {
            case 4:
              jp(n, l);
              break t;
            case 22:
              n.memoizedState === null && Ih(n, l);
              break t;
            default:
              Ih(n, l);
          }
        }
        t = t.sibling;
      }
  }
  function Qp(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, Qp(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && co(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ae = null, Jn = !1;
  function Ql(t, e, n) {
    for (n = n.child; n !== null; )
      Zp(t, e, n), n = n.sibling;
  }
  function Zp(t, e, n) {
    if (St && typeof St.onCommitFiberUnmount == "function")
      try {
        St.onCommitFiberUnmount(Dt, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        re || vn(n, e), Ql(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !re && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        re || vn(n, e), rs(n);
        var l = Ae, r = Jn;
        ha(n.type) && (Ae = n.stateNode, Jn = !1), Ql(
          t,
          e,
          n
        ), F_(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Ae = l, Jn = r;
        break;
      case 5:
        re || vn(n, e), rs(n);
      case 6:
        if (n.tag === 6 && rs(n), l = Ae, r = Jn, Ae = null, Ql(
          t,
          e,
          n
        ), Ae = l, Jn = r, Ae !== null)
          if (Jn)
            try {
              (Ae.nodeType === 9 ? Ae.body : Ae.nodeName === "HTML" ? Ae.ownerDocument.body : Ae).removeChild(n.stateNode), ne = !0;
            } catch (o) {
              fe(
                n,
                e,
                o
              );
            }
          else
            try {
              Ae.removeChild(n.stateNode), ne = !0;
            } catch (o) {
              fe(
                n,
                e,
                o
              );
            }
        break;
      case 18:
        Ae !== null && (Jn ? (t = Ae, U_(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), cr(t)) : U_(Ae, n.stateNode));
        break;
      case 4:
        l = Ae, r = Jn, Ae = n.stateNode.containerInfo, Jn = !0, Ql(
          t,
          e,
          n
        ), Ae = l, Jn = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        aa(2, n, e), re || aa(4, n, e), Ql(
          t,
          e,
          n
        );
        break;
      case 1:
        re || (vn(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Rp(
          n,
          e,
          l
        )), Ql(
          t,
          e,
          n
        );
        break;
      case 21:
        Ql(
          t,
          e,
          n
        );
        break;
      case 22:
        re = (l = re) || n.memoizedState !== null, Ql(
          t,
          e,
          n
        ), re = l;
        break;
      case 30:
        vn(n, e), Ql(
          t,
          e,
          n
        );
        break;
      case 7:
        re || vn(n, e), Ql(
          t,
          e,
          n
        );
        break;
      default:
        Ql(
          t,
          e,
          n
        );
    }
  }
  function Kp(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        cr(t);
      } catch (n) {
        fe(e, e.return, n);
      }
    }
  }
  function Jp(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        cr(t);
      } catch (n) {
        fe(e, e.return, n);
      }
  }
  function c2(t) {
    switch (t.tag) {
      case 31:
      case 13:
      case 19:
        var e = t.stateNode;
        return e === null && (e = t.stateNode = new Gp()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Gp()), e;
      default:
        throw Error(a(435, t.tag));
    }
  }
  function rc(t, e) {
    var n = c2(t);
    e.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var r = T2.bind(null, t, l);
        l.then(r, r);
      }
    });
  }
  function Un(t, e, n) {
    var l = e.deletions;
    if (l !== null)
      for (var r = 0; r < l.length; r++) {
        var o = l[r], m = t, y = e, E = y;
        t: for (; E !== null; ) {
          switch (E.tag) {
            case 27:
              if (ha(E.type)) {
                Ae = E.stateNode, Jn = !1;
                break t;
              }
              break;
            case 5:
              Ae = E.stateNode, Jn = !1;
              break t;
            case 3:
            case 4:
              Ae = E.stateNode.containerInfo, Jn = !0;
              break t;
          }
          E = E.return;
        }
        if (Ae === null) throw Error(a(160));
        Zp(m, y, o), Ae = null, Jn = !1, m = o.alternate, m !== null && (m.return = null), o.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        kp(e, t, n), e = e.sibling;
  }
  var Zl = null;
  function kp(t, e, n) {
    var l = t.alternate, r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (r & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var o = 0; o < l.length; o++) {
            var m = l[o];
            m.ref.impl = m.nextImpl;
          }
        Un(e, t, n), Hn(t), r & 4 && (aa(3, t, t.return), us(3, t), aa(5, t, t.return));
        break;
      case 1:
        Un(e, t, n), Hn(t), r & 512 && (re || l === null || vn(l, l.return)), r & 64 && rn && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (o = Zl, Un(e, t, n), Hn(t), r & 512 && (re || l === null || vn(l, l.return)), r & 4)
          if (r = l !== null ? l.memoizedState : null, n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null)
                if (rn)
                  t.stateNode = R_(
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
                        l = r.getElementsByTagName("title")[0], (!l || l[Ur] || l[Qe] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = r.createElement(e), r.head.insertBefore(
                          l,
                          r.querySelector("head > title")
                        )), yn(l, e, n), l[Qe] = t, an(l), e = l;
                        break t;
                      case "link":
                        if (o = ev(
                          "link",
                          "href",
                          r
                        ).get(e + (n.href || ""))) {
                          for (m = 0; m < o.length; m++)
                            if (l = o[m], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              o.splice(m, 1);
                              break e;
                            }
                        }
                        l = r.createElement(e), yn(l, e, n), r.head.appendChild(l);
                        break;
                      case "meta":
                        if (o = ev(
                          "meta",
                          "content",
                          r
                        ).get(e + (n.content || ""))) {
                          for (m = 0; m < o.length; m++)
                            if (l = o[m], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              o.splice(m, 1);
                              break e;
                            }
                        }
                        l = r.createElement(e), yn(l, e, n), r.head.appendChild(l);
                        break;
                      default:
                        throw Error(a(468, e));
                    }
                    l[Qe] = t, an(l), e = l;
                  }
                  t.stateNode = e;
                }
              else
                rn || Bd(o, t.type, t.stateNode);
            else
              t.stateNode = tv(
                o,
                n,
                t.memoizedProps
              );
          else
            r !== n ? (r === null ? (e = l.stateNode, e === null || re || e.parentNode.removeChild(e)) : r.count--, n === null ? rn || Bd(o, t.type, t.stateNode) : tv(o, n, t.memoizedProps)) : n === null && t.stateNode !== null && Vh(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Un(e, t, n), Hn(t), r & 512 && (re || l === null || vn(l, l.return)), l !== null && r & 4 && Vh(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (o = ri, ri = !1, Un(e, t, n), ri = o, Hn(t), r & 512 && (re || l === null || vn(l, l.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            zu(e, ""), ne = !0;
          } catch (X) {
            fe(t, t.return, X);
          }
        }
        r & 4 && t.stateNode != null && (e = t.memoizedProps, Vh(
          t,
          e,
          l !== null ? l.memoizedProps : e
        )), r & 1024 && (Ph = !0);
        break;
      case 6:
        if (Un(e, t, n), Hn(t), r & 4) {
          if (t.stateNode === null)
            throw Error(a(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, ne = !0;
          } catch (X) {
            fe(t, t.return, X);
          }
        }
        break;
      case 3:
        if (ne = !1, Tc = null, o = Zl, Zl = _s(e.containerInfo), Un(e, t, n), Zl = o, Hn(t), r & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            cr(e.containerInfo);
          } catch (X) {
            fe(t, t.return, X);
          }
        Ph && (Ph = !1, Fp(t)), ne = !1;
        break;
      case 4:
        r = ri, ri = rn, l = gm(), o = Zl, Zl = _s(
          t.stateNode.containerInfo
        ), Un(e, t, n), Hn(t), Zl = o, ne && ss && (ac = !0), ne = l, ri = r;
        break;
      case 12:
        Un(e, t, n), Hn(t);
        break;
      case 31:
        Un(e, t, n), Hn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, rc(t, e)));
        break;
      case 13:
        Un(e, t, n), Hn(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (cc = wt()), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, rc(t, e)));
        break;
      case 22:
        o = t.memoizedState !== null, m = l !== null && l.memoizedState !== null;
        var y = rn, E = re, N = ri;
        rn = y || o, ri = N || o, re = E || m, Un(e, t, n), re = E, ri = N, rn = y, Hn(t), r & 8192 && (e = t.stateNode, e._visibility = o ? e._visibility & -2 : e._visibility | 1, !o || l === null || m || rn || re || (e = m || re, n = rn, l = re, rn = o || rn, re = e, ua(t, 2), rn = n, re = l), !o && ri || $h(t, o)), r & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, rc(t, n))));
        break;
      case 19:
        Un(e, t, n), Hn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, rc(t, e)));
        break;
      case 30:
        r & 512 && (re || l === null || vn(l, l.return)), r = gm(), o = ss, m = (n & 335544064) === n, y = t.memoizedProps, ss = m && Oi(
          y.default,
          y.update
        ) !== "none", Un(e, t, n), Hn(t), m && l !== null && ne && (t.flags |= 4), ss = o, ne = r;
        break;
      case 21:
        break;
      case 7:
        r & 512 && (re || l === null || vn(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = t);
      default:
        Un(e, t, n), Hn(t);
    }
  }
  function Hn(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (Np(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var r = t.return; r !== null; ) {
          if (Xh(r)) {
            var o = r.stateNode;
            l === null ? l = [o] : l.push(o);
          }
          if (qh(r)) break;
          r = r.return;
        }
        var m = l;
        if (n == null) throw Error(a(160));
        switch (n.tag) {
          case 27:
            var y = n.stateNode, E = jh(t);
            ec(
              t,
              E,
              y,
              m
            );
            break;
          case 5:
            var N = n.stateNode;
            n.flags & 32 && (zu(N, ""), n.flags &= -33);
            var X = jh(t);
            ec(
              t,
              X,
              N,
              m
            );
            break;
          case 3:
          case 4:
            var W = n.stateNode.containerInfo, C = jh(t);
            Qh(
              t,
              C,
              W,
              m
            );
            break;
          default:
            throw Error(a(161));
        }
      } catch (Y) {
        fe(t, t.return, Y);
      }
      t.flags &= -3;
    }
    e & 4096 && (t.flags &= -4097);
  }
  function Fp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        Fp(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, or = !0, e.reset(), or = !1), t = t.sibling;
      }
  }
  function Ku(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        Pp(e, t), e = e.sibling;
    else Xp(e);
  }
  function Pp(t, e) {
    var n = t.alternate;
    if (n === null) Zh(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (Wh = si = !1, Yp(), Ku(e, t), !si && !ac) {
            if (t = ai, t !== null)
              for (var l = 0; l < t.length; l += 3) {
                n = t[l];
                var r = t[l + 1];
                B_(n, t[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
            )), Wh = !0;
          }
          ai = null;
          break;
        case 5:
          Ku(e, t);
          break;
        case 4:
          l = si, si = !1, Ku(e, t), si && (ac = !0), si = l;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? Zh(t, !1) : Ku(e, t));
          break;
        case 30:
          l = si, r = Yp(), si = !1, Ku(e, t), si && (t.flags |= 4);
          var o = t.memoizedProps, m = t.stateNode;
          e = Mi(o, m), m = Mi(n.memoizedProps, m);
          var y = Oi(o.default, o.update);
          y === "none" ? e = !1 : (o = n.memoizedState, n.memoizedState = null, n = t.child, Kn = 0, e = Fh(
            t,
            n,
            e,
            m,
            y,
            o,
            !0
          ), Kn !== (o === null ? 0 : o.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (Iu(
            t,
            t.memoizedProps.onUpdate
          ), ai = r) : r !== null && (r.push.apply(r, ai), ai = r), si = (t.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Ku(e, t);
      }
  }
  function oi(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Vp(t, e.alternate, e), e = e.sibling;
  }
  function ua(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, l = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          aa(4, n, n.return), ua(
            n,
            l
          );
          break;
        case 1:
          vn(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Rp(
            n,
            n.return,
            r
          ), ua(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && F_(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          vn(n, n.return), n.tag !== 5 && n.tag !== 27 || rs(n), ua(
            n,
            l
          );
          break;
        case 6:
          rs(n);
          break;
        case 26:
          vn(n, n.return), r = n.stateNode, n.memoizedState !== null || r === null || re || r.parentNode.removeChild(r), ua(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && ua(
            n,
            l
          );
          break;
        case 30:
          vn(n, n.return), ua(
            n,
            l
          );
          break;
        case 7:
          vn(n, n.return);
        default:
          ua(
            n,
            l
          );
      }
      t = t.sibling;
    }
  }
  function Kl(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var l = e.alternate, r = t, o = e, m = o.flags, y = (n & 1) !== 0;
      switch (o.tag) {
        case 0:
        case 11:
        case 15:
          Kl(
            r,
            o,
            n
          ), us(4, o);
          break;
        case 1:
          if (Kl(
            r,
            o,
            n
          ), l = o, r = l.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (X) {
              fe(l, l.return, X);
            }
          if (l = o, r = l.updateQueue, r !== null) {
            var E = l.stateNode;
            try {
              var N = r.shared.hiddenCallbacks;
              if (N !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < N.length; r++)
                  vg(N[r], E);
            } catch (X) {
              fe(l, l.return, X);
            }
          }
          y && m & 64 && Cp(o), ii(o, o.return);
          break;
        case 27:
          (n & 2) !== 0 && Up(o);
        case 5:
          o.tag !== 5 && o.tag !== 27 || Dp(o), Kl(
            r,
            o,
            n
          ), y && l === null && m & 4 && Gh(o), ii(o, o.return);
          break;
        case 6:
          Dp(o);
          break;
        case 26:
          E = o.stateNode, o.memoizedState !== null || E === null || rn || Bd(
            _s(E.ownerDocument),
            o.type,
            E
          ), Kl(
            r,
            o,
            n
          ), y && l === null && m & 4 && Gh(o), ii(o, o.return);
          break;
        case 12:
          Kl(
            r,
            o,
            n
          );
          break;
        case 31:
          Kl(
            r,
            o,
            n
          ), y && m & 4 && Kp(r, o);
          break;
        case 13:
          Kl(
            r,
            o,
            n
          ), y && m & 4 && Jp(r, o);
          break;
        case 22:
          o.memoizedState === null && Kl(
            r,
            o,
            n
          ), ii(o, o.return);
          break;
        case 30:
          Kl(
            r,
            o,
            n
          ), ii(o, o.return);
          break;
        case 7:
          ii(o, o.return);
        default:
          Kl(
            r,
            o,
            n
          );
      }
      e = e.sibling;
    }
  }
  function td(t, e) {
    var n = null;
    t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), t = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (t = e.memoizedState.cachePool.pool), t !== n && (t != null && t.refCount++, n != null && Jr(n));
  }
  function ed(t, e) {
    t = null, e.alternate !== null && (t = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== t && (e.refCount++, t != null && Jr(t));
  }
  function Nl(t, e, n, l) {
    var r = (n & 335544064) === n;
    if (e.subtreeFlags & (r ? 10262 : 10256))
      for (e = e.child; e !== null; )
        Wp(
          t,
          e,
          n,
          l
        ), e = e.sibling;
    else r && qp(e);
  }
  function Wp(t, e, n, l) {
    var r = (n & 335544064) === n;
    r && e.alternate === null && e.return !== null && e.return.alternate !== null && ic(e);
    var o = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Nl(
          t,
          e,
          n,
          l
        ), o & 2048 && us(9, e);
        break;
      case 1:
        Nl(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        Nl(
          t,
          e,
          n,
          l
        ), r && Wh && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), o & 2048 && (o = null, e.alternate !== null && (o = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== o && (e.refCount++, o != null && Jr(o)));
        break;
      case 12:
        if (o & 2048) {
          Nl(
            t,
            e,
            n,
            l
          ), o = e.stateNode;
          try {
            var m = e.memoizedProps, y = m.id, E = m.onPostCommit;
            typeof E == "function" && E(
              y,
              e.alternate === null ? "mount" : "update",
              o.passiveEffectDuration,
              -0
            );
          } catch (N) {
            fe(e, e.return, N);
          }
        } else
          Nl(
            t,
            e,
            n,
            l
          );
        break;
      case 31:
        Nl(
          t,
          e,
          n,
          l
        );
        break;
      case 13:
        Nl(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        m = e.stateNode, y = e.alternate, e.memoizedState !== null ? (r && y !== null && y.memoizedState === null && ic(y), m._visibility & 2 ? Nl(
          t,
          e,
          n,
          l
        ) : os(
          t,
          e
        )) : (r && y !== null && y.memoizedState !== null && ic(e), m._visibility & 2 ? Nl(
          t,
          e,
          n,
          l
        ) : (m._visibility |= 2, Ju(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), o & 2048 && td(y, e);
        break;
      case 24:
        Nl(
          t,
          e,
          n,
          l
        ), o & 2048 && ed(e.alternate, e);
        break;
      case 30:
        r && (o = e.alternate, o !== null && (ui(o.child, !0), ui(e.child, !0))), Nl(
          t,
          e,
          n,
          l
        );
        break;
      default:
        Nl(
          t,
          e,
          n,
          l
        );
    }
  }
  function Ju(t, e, n, l, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var o = t, m = e, y = n, E = l, N = m.flags;
      switch (m.tag) {
        case 0:
        case 11:
        case 15:
          Ju(
            o,
            m,
            y,
            E,
            r
          ), us(8, m);
          break;
        case 23:
          break;
        case 22:
          var X = m.stateNode;
          m.memoizedState !== null ? X._visibility & 2 ? Ju(
            o,
            m,
            y,
            E,
            r
          ) : os(
            o,
            m
          ) : (X._visibility |= 2, Ju(
            o,
            m,
            y,
            E,
            r
          )), r && N & 2048 && td(
            m.alternate,
            m
          );
          break;
        case 24:
          Ju(
            o,
            m,
            y,
            E,
            r
          ), r && N & 2048 && ed(m.alternate, m);
          break;
        default:
          Ju(
            o,
            m,
            y,
            E,
            r
          );
      }
      e = e.sibling;
    }
  }
  function os(t, e) {
    if (e.subtreeFlags & 10256)
      for (e = e.child; e !== null; ) {
        var n = t, l = e, r = l.flags;
        switch (l.tag) {
          case 22:
            os(n, l), r & 2048 && td(
              l.alternate,
              l
            );
            break;
          case 24:
            os(n, l), r & 2048 && ed(l.alternate, l);
            break;
          default:
            os(n, l);
        }
        e = e.sibling;
      }
  }
  var Ia = 8192;
  function tu(t, e, n) {
    if (t.subtreeFlags & Ia)
      for (t = t.child; t !== null; )
        $p(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function $p(t, e, n) {
    switch (t.tag) {
      case 26:
        tu(
          t,
          e,
          n
        ), t.flags & Ia && (t.memoizedState !== null ? pb(
          n,
          Zl,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && av(n, t)));
        break;
      case 5:
        tu(
          t,
          e,
          n
        ), t.flags & Ia && (t = t.stateNode, (e & 335544128) === e && av(n, t));
        break;
      case 3:
      case 4:
        var l = Zl;
        Zl = _s(t.stateNode.containerInfo), tu(
          t,
          e,
          n
        ), Zl = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = Ia, Ia = 16777216, tu(
          t,
          e,
          n
        ), Ia = l) : tu(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & Ia) !== 0 && (l = t.memoizedProps.name, l != null && l !== "auto")) {
          var r = t.stateNode;
          r.paired = null, cl === null && (cl = /* @__PURE__ */ new Map()), cl.set(l, r);
        }
        tu(
          t,
          e,
          n
        );
        break;
      default:
        tu(
          t,
          e,
          n
        );
    }
  }
  function Ip(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function cs(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          sn = l, e_(
            l,
            t
          );
        }
      Ip(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        t_(t), t = t.sibling;
  }
  function t_(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        cs(t), t.flags & 2048 && aa(9, t, t.return);
        break;
      case 3:
        cs(t);
        break;
      case 12:
        cs(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, sc(t)) : cs(t);
        break;
      default:
        cs(t);
    }
  }
  function sc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          sn = l, e_(
            l,
            t
          );
        }
      Ip(t);
    }
    for (t = t.child; t !== null; ) {
      switch (e = t, e.tag) {
        case 0:
        case 11:
        case 15:
          aa(8, e, e.return), sc(e);
          break;
        case 22:
          n = e.stateNode, n._visibility & 2 && (n._visibility &= -3, sc(e));
          break;
        default:
          sc(e);
      }
      t = t.sibling;
    }
  }
  function e_(t, e) {
    for (; sn !== null; ) {
      var n = sn;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          aa(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Jr(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, sn = l;
      else
        t: for (n = t; sn !== null; ) {
          l = sn;
          var r = l.sibling, o = l.return;
          if (Qp(l), l === n) {
            sn = null;
            break t;
          }
          if (r !== null) {
            r.return = o, sn = r;
            break t;
          }
          sn = o;
        }
    }
  }
  var f2 = {
    getCacheForType: function(t) {
      var e = gn(Ke), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return gn(Ke).controller.signal;
    }
  }, h2 = typeof WeakMap == "function" ? WeakMap : Map, ie = 0, ve = null, Jt = null, Ft = 0, ce = 0, fl = null, ra = !1, ku = !1, nd = !1, Hi = 0, Be = 0, sa = 0, eu = 0, oc = 0, hl = 0, Fu = 0, fs = null, kn = null, ld = !1, cc = 0, n_ = 0, fc = 1 / 0, hc = null, oa = null, Re = 0, Jl = null, nu = null, ci = 0, id = 0, ad = null, l_ = null, Pu = null, Wu = null, $u = null, hs = 0, dc = null;
  function dl() {
    return (ie & 2) !== 0 && Ft !== 0 ? Ft & -Ft : it.T !== null ? gd() : He();
  }
  function i_() {
    if (hl === 0)
      if ((Ft & 536870912) === 0 || Vt) {
        var t = qt;
        qt <<= 1, (qt & 3932160) === 0 && (qt = 262144), hl = t;
      } else hl = 536870912;
    return t = pn.current, t !== null && (t.flags |= 32), hl;
  }
  function Iu(t, e) {
    if (e != null) {
      var n = t.stateNode, l = n.ref;
      l === null && (l = n.ref = L_(
        Mi(t.memoizedProps, n)
      )), Wu === null && (Wu = []), Wu.push(e.bind(null, l));
    }
  }
  function Fn(t, e, n) {
    (t === ve && (ce === 2 || ce === 9) || t.cancelPendingCommit !== null) && (tr(t, 0), ca(
      t,
      Ft,
      hl,
      !1
    )), Mn(t, n), ((ie & 2) === 0 || t !== ve) && (t === ve && ((ie & 2) === 0 && (eu |= n), Be === 4 && ca(
      t,
      Ft,
      hl,
      !1
    )), fi(t));
  }
  function a_(t, e, n) {
    if ((ie & 6) !== 0) throw Error(a(327));
    var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || ae(t, e), r = l ? g2(t, e) : rd(t, e, !0), o = l;
    do {
      if (r === 0) {
        ku && !l && ca(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, o && !d2(n)) {
          r = rd(t, e, !1), o = !1;
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
              r = fs;
              var E = y.current.memoizedState.isDehydrated;
              if (E && (tr(y, m).flags |= 256), m = rd(
                y,
                m,
                !1
              ), m !== 2 && m !== 6) {
                if (nd && !E) {
                  y.errorRecoveryDisabledLanes |= o, eu |= o, r = 4;
                  break t;
                }
                o = kn, kn = r, o !== null && (kn === null ? kn = o : kn.push.apply(
                  kn,
                  o
                ));
              }
              r = m;
            }
            if (o = !1, r !== 2) continue;
          }
        }
        if (r === 1) {
          tr(t, 0), ca(t, e, 0, !0);
          break;
        }
        t: {
          switch (l = t, o = r, o) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ca(
                l,
                e,
                hl,
                !ra
              );
              break t;
            case 2:
              kn = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((e & 62914560) === e && (r = cc + 300 - wt(), 10 < r)) {
            if (ca(
              l,
              e,
              hl,
              !ra
            ), _e(l, 0, !0) !== 0) break t;
            ci = e, l.timeoutHandle = Od(
              u_.bind(
                null,
                l,
                n,
                kn,
                hc,
                ld,
                e,
                hl,
                eu,
                Fu,
                ra,
                o,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          u_(
            l,
            n,
            kn,
            hc,
            ld,
            e,
            hl,
            eu,
            Fu,
            ra,
            o,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    fi(t);
  }
  function u_(t, e, n, l, r, o, m, y, E, N, X, W, C, Y) {
    t.timeoutHandle = -1;
    var ot = e.subtreeFlags, yt = (o & 335544064) === o;
    if (W = null, (yt || ot & 8192 || (ot & 16785408) === 16785408) && (W = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: ei
    }, cl = null, $p(
      e,
      o,
      W
    ), yt && (ot = W, yt = t.containerInfo, yt = (yt.nodeType === 9 ? yt : yt.ownerDocument).__reactViewTransition, yt != null && (ot.count++, ot.waitingForViewTransition = !0, ot = Ss.bind(ot), yt.finished.then(ot, ot))), ot = (o & 62914560) === o ? cc - wt() : (o & 4194048) === o ? n_ - wt() : 0, ot = _b(
      W,
      ot
    ), ot !== null)) {
      ci = o, t.cancelPendingCommit = ot(
        m_.bind(
          null,
          t,
          e,
          o,
          n,
          l,
          r,
          m,
          y,
          E,
          N,
          X,
          W,
          null,
          C,
          Y
        )
      ), ca(t, o, m, !N);
      return;
    }
    m_(
      t,
      e,
      o,
      n,
      l,
      r,
      m,
      y,
      E,
      N,
      X,
      W
    );
  }
  function d2(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var r = n[l], o = r.getSnapshot;
          r = r.value;
          try {
            if (!sl(o(), r)) return !1;
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
  function ca(t, e, n, l) {
    e = ue(t, e), e &= ~oc, e &= ~eu, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var o = 31 - at(r), m = 1 << o;
      l[o] = -1, r &= ~m;
    }
    n !== 0 && Ve(t, n, e);
  }
  function mc() {
    return (ie & 6) === 0 ? (ds(0), !1) : !0;
  }
  function ud() {
    if (Jt !== null) {
      if (ce === 0)
        var t = Jt.return;
      else
        t = Jt, wi = ja = null, mh(t), Xu = null, Pr = 0, t = Jt;
      for (; t !== null; )
        wp(t.alternate, t), t = t.return;
      Jt = null;
    }
  }
  function tr(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, B2(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), ci = 0, ud(), ve = t, Jt = n = zi(t.current, null), Ft = e, ce = 0, fl = null, ra = !1, ku = ae(t, e), nd = !1, Fu = hl = oc = eu = sa = Be = 0, kn = fs = null, ld = !1, Hi = ue(t, e), To(), n;
  }
  function r_(t, e) {
    Yt = null, it.H = Jo, e === qu || e === No ? (e = mg(), ce = 3) : e === eh ? (e = mg(), ce = 4) : ce = e === wh ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, fl = e, Jt === null && (Be = 1, ko(
      t,
      wl(e, t.current)
    ));
  }
  function s_() {
    var t = pn.current;
    return t === null ? !0 : (Ft & 4194048) === Ft ? On === null : (Ft & 62914560) === Ft || (Ft & 536870912) !== 0 ? t === On : !1;
  }
  function o_() {
    var t = it.H;
    return it.H = Jo, t === null ? Jo : t;
  }
  function c_() {
    var t = it.A;
    return it.A = f2, t;
  }
  function gc() {
    Be = 4, ra || (Ft & 4194048) !== Ft && pn.current !== null || (ku = !0), (sa & 134217727) === 0 && (eu & 134217727) === 0 || ve === null || ca(
      ve,
      Ft,
      hl,
      !1
    );
  }
  function rd(t, e, n) {
    var l = ie;
    ie |= 2;
    var r = o_(), o = c_();
    (ve !== t || Ft !== e) && (hc = null, tr(t, e)), e = !1;
    var m = Be;
    t: do
      try {
        if (ce !== 0 && Jt !== null) {
          var y = Jt, E = fl;
          switch (ce) {
            case 8:
              ud(), m = 6;
              break t;
            case 3:
            case 2:
            case 9:
            case 6:
              pn.current === null && (e = !0);
              var N = ce;
              if (ce = 0, fl = null, er(t, y, E, N), n && ku) {
                m = 0;
                break t;
              }
              break;
            default:
              N = ce, ce = 0, fl = null, er(t, y, E, N);
          }
        }
        m2(), m = Be;
        break;
      } catch (X) {
        r_(t, X);
      }
    while (!0);
    return e && t.shellSuspendCounter++, wi = ja = null, ie = l, it.H = r, it.A = o, Jt === null && (ve = null, Ft = 0, To()), m;
  }
  function m2() {
    for (; Jt !== null; ) f_(Jt);
  }
  function g2(t, e) {
    var n = ie;
    ie |= 2;
    var l = o_(), r = c_();
    ve !== t || Ft !== e ? (hc = null, fc = wt() + 500, tr(t, e)) : ku = ae(
      t,
      e
    );
    t: do
      try {
        if (ce !== 0 && Jt !== null) {
          e = Jt;
          var o = fl;
          e: switch (ce) {
            case 1:
              ce = 0, fl = null, er(t, e, o, 1);
              break;
            case 2:
            case 9:
              if (hg(o)) {
                ce = 0, fl = null, h_(e);
                break;
              }
              e = function() {
                ce !== 2 && ce !== 9 || ve !== t || (ce = 7), fi(t);
              }, o.then(e, e);
              break t;
            case 3:
              ce = 7;
              break t;
            case 4:
              ce = 5;
              break t;
            case 7:
              hg(o) ? (ce = 0, fl = null, h_(e)) : (ce = 0, fl = null, er(t, e, o, 7));
              break;
            case 5:
              var m = null;
              switch (Jt.tag) {
                case 26:
                  m = Jt.memoizedState;
                case 5:
                case 27:
                  var y = Jt;
                  if (m ? lv(m) : y.stateNode.complete) {
                    ce = 0, fl = null;
                    var E = y.sibling;
                    if (E !== null) Jt = E;
                    else {
                      var N = y.return;
                      N !== null ? (Jt = N, pc(N)) : Jt = null;
                    }
                    break e;
                  }
              }
              ce = 0, fl = null, er(t, e, o, 5);
              break;
            case 6:
              ce = 0, fl = null, er(t, e, o, 6);
              break;
            case 8:
              ud(), Be = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        p2();
        break;
      } catch (X) {
        r_(t, X);
      }
    while (!0);
    return wi = ja = null, it.H = l, it.A = r, ie = n, Jt !== null ? 0 : (ve = null, Ft = 0, To(), Be);
  }
  function p2() {
    for (; Jt !== null && !$l(); )
      f_(Jt);
  }
  function f_(t) {
    var e = zp(t.alternate, t, Hi);
    t.memoizedProps = t.pendingProps, e === null ? pc(t) : Jt = e;
  }
  function h_(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Sp(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          Ft
        );
        break;
      case 11:
        e = Sp(
          n,
          e,
          e.pendingProps,
          e.type.render,
          e.ref,
          Ft
        );
        break;
      case 5:
        mh(e);
        var l = e;
        l === un && (Vt ? (Ao(l), l.tag === 5 && l.stateNode != null && (Te = l.stateNode)) : (Ao(l), Vt = !0));
      default:
        wp(n, e), e = Jt = eg(e, Hi), e = zp(n, e, Hi);
    }
    t.memoizedProps = t.pendingProps, e === null ? pc(t) : Jt = e;
  }
  function er(t, e, n, l) {
    wi = ja = null, mh(e), Xu = null, Pr = 0;
    var r = e.return;
    try {
      if (l2(
        t,
        r,
        e,
        n,
        Ft
      )) {
        Be = 1, ko(
          t,
          wl(n, t.current)
        ), Jt = null;
        return;
      }
    } catch (o) {
      if (r !== null) throw Jt = r, o;
      Be = 1, ko(
        t,
        wl(n, t.current)
      ), Jt = null;
      return;
    }
    e.flags & 32768 ? (Vt || l === 1 ? t = !0 : ku || (Ft & 536870912) !== 0 ? t = !1 : (ra = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = pn.current, l !== null && l.tag === 13 && (l.flags |= 16384))), d_(e, t)) : pc(e);
  }
  function pc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        d_(
          e,
          ra
        );
        return;
      }
      t = e.return;
      var n = r2(
        e.alternate,
        e,
        Hi
      );
      if (n !== null) {
        Jt = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        Jt = e;
        return;
      }
      Jt = e = t;
    } while (e !== null);
    Be === 0 && (Be = 5);
  }
  function d_(t, e) {
    do {
      var n = s2(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, Jt = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        Jt = t;
        return;
      }
      Jt = t = n;
    } while (t !== null);
    Be = 6, Jt = null;
  }
  function m_(t, e, n, l, r, o, m, y, E, N, X, W) {
    t.cancelPendingCommit = null;
    do
      _c();
    while (Re !== 0);
    if ((ie & 6) !== 0) throw Error(a(327));
    if (e !== null) {
      if (e === t.current) throw Error(a(177));
      t === ve && (Jt = ve = null, Ft = 0), nu = e, Jl = t, ci = n, ad = r, l_ = l, _2(
        t,
        e,
        n,
        m,
        y,
        E,
        W
      );
    }
  }
  function _2(t, e, n, l, r, o, m) {
    var y = e.lanes | e.childLanes;
    if (id = y, y |= Vf, Ie(
      t,
      n,
      y,
      l,
      r,
      o
    ), Wu = null, (n & 335544064) === n ? ($u = ZS(t), l = 10262) : ($u = null, l = 10256), (e.subtreeFlags & l) !== 0 || (e.flags & l) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, E2(xn, function() {
      return fd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), nc = !1, l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
      l = it.T, it.T = null, r = ct.p, ct.p = 2, o = ie, ie |= 4;
      try {
        o2(t, e, n);
      } finally {
        ie = o, ct.p = r, it.T = l;
      }
    }
    Re = 1, nc ? Pu = j2(
      m,
      t.containerInfo,
      $u,
      sd,
      od,
      y2,
      cd,
      fd,
      v2
    ) : (sd(), od(), cd());
  }
  function v2(t) {
    if (Re !== 0) {
      var e = Jl.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function y2() {
    Re === 3 && (Re = 0, Pp(nu, Jl), Re = 4);
  }
  function sd() {
    if (Re === 1) {
      Re = 0;
      var t = Jl, e = nu, n = ci, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = it.T, it.T = null;
        var r = ct.p;
        ct.p = 2;
        var o = ie;
        ie |= 4;
        try {
          ss = ac = !1, kp(e, t, n), n = Ed;
          var m = Zm(t.containerInfo), y = n.focusedElem, E = n.selectionRange;
          if (m !== y && y && y.ownerDocument && Qm(
            y.ownerDocument.documentElement,
            y
          )) {
            if (E !== null && Bf(y)) {
              var N = E.start, X = E.end;
              if (X === void 0 && (X = N), "selectionStart" in y)
                y.selectionStart = N, y.selectionEnd = Math.min(
                  X,
                  y.value.length
                );
              else {
                var W = y.ownerDocument || document, C = W && W.defaultView || window;
                if (C.getSelection) {
                  var Y = C.getSelection(), ot = y.textContent.length, yt = Math.min(E.start, ot), Bt = E.end === void 0 ? yt : Math.min(E.end, ot);
                  !Y.extend && yt > Bt && (m = Bt, Bt = yt, yt = m);
                  var D = jm(
                    y,
                    yt
                  ), A = jm(
                    y,
                    Bt
                  );
                  if (D && A && (Y.rangeCount !== 1 || Y.anchorNode !== D.node || Y.anchorOffset !== D.offset || Y.focusNode !== A.node || Y.focusOffset !== A.offset)) {
                    var H = W.createRange();
                    H.setStart(D.node, D.offset), Y.removeAllRanges(), yt > Bt ? (Y.addRange(H), Y.extend(A.node, A.offset)) : (H.setEnd(A.node, A.offset), Y.addRange(H));
                  }
                }
              }
            }
            for (W = [], Y = y; Y = Y.parentNode; )
              Y.nodeType === 1 && W.push({
                element: Y,
                left: Y.scrollLeft,
                top: Y.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < W.length; y++) {
              var F = W[y];
              F.element.scrollLeft = F.left, F.element.scrollTop = F.top;
            }
          }
          or = !!Td, Ed = Td = null;
        } finally {
          ie = o, ct.p = r, it.T = l;
        }
      }
      t.current = e, Re = 2;
    }
  }
  function od() {
    if (Re === 2) {
      Re = 0;
      var t = Jl, e = nu, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = it.T, it.T = null;
        var l = ct.p;
        ct.p = 2;
        var r = ie;
        ie |= 4;
        try {
          Vp(t, e.alternate, e);
        } finally {
          ie = r, ct.p = l, it.T = n;
        }
      }
      Re = 3;
    }
  }
  function cd() {
    if (Re === 4 || Re === 3) {
      Re = 0;
      var t = Pu;
      Pu = null, yi();
      var e = Jl, n = nu, l = ci, r = l_, o = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & o) !== 0 || (n.flags & o) !== 0 ? Re = 5 : (Re = 0, nu = Jl = null, g_(e, e.pendingLanes)), o = e.pendingLanes, o === 0 && (oa = null), je(l), n = n.stateNode, St && typeof St.onCommitFiberRoot == "function")
        try {
          St.onCommitFiberRoot(
            Dt,
            n,
            void 0,
            (n.current.flags & 128) === 128
          );
        } catch {
        }
      if (r !== null) {
        n = it.T, o = ct.p, ct.p = 2, it.T = null;
        try {
          for (var m = e.onRecoverableError, y = 0; y < r.length; y++) {
            var E = r[y];
            m(E.value, {
              componentStack: E.stack
            });
          }
        } finally {
          it.T = n, ct.p = o;
        }
      }
      if (r = Wu, m = $u, $u = null, r !== null && (Wu = null, m === null && (m = []), t !== null))
        for (E = 0; E < r.length; E++)
          n = (0, r[E])(
            m
          ), n !== void 0 && t.finished.finally(n);
      (ci & 3) !== 0 && _c(), fi(e), o = e.pendingLanes, (l & 261930) !== 0 && (o & 42) !== 0 ? e === dc ? hs++ : (hs = 0, dc = e) : (hs = 0, dc = null), ds(0);
    }
  }
  function g_(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Jr(e)));
  }
  function _c() {
    return Pu !== null && (Pu.skipTransition(), Pu = null), sd(), od(), cd(), fd();
  }
  function fd() {
    if (Re !== 5) return !1;
    var t = Jl, e = id;
    id = 0;
    var n = je(ci), l = it.T, r = ct.p;
    try {
      ct.p = 32 > n ? 32 : n, it.T = null, n = ad, ad = null;
      var o = Jl, m = ci;
      if (Re = 0, nu = Jl = null, ci = 0, (ie & 6) !== 0) throw Error(a(331));
      var y = ie;
      if (ie |= 4, t_(o.current), Wp(
        o,
        o.current,
        m,
        n
      ), ie = y, ds(0, !1), St && typeof St.onPostCommitFiberRoot == "function")
        try {
          St.onPostCommitFiberRoot(Dt, o);
        } catch {
        }
      return !0;
    } finally {
      ct.p = r, it.T = l, g_(t, e);
    }
  }
  function p_(t, e, n) {
    e = wl(n, e), e = Ah(t.stateNode, e, 2), t = ea(t, e, 2), t !== null && (Mn(t, 2), fi(t));
  }
  function fe(t, e, n) {
    if (t.tag === 3)
      p_(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          p_(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (oa === null || !oa.has(l))) {
            t = wl(n, t), n = hp(2), l = ea(e, n, 2), l !== null && (dp(
              n,
              l,
              e,
              t
            ), Mn(l, 2), fi(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function hd(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new h2();
      var r = /* @__PURE__ */ new Set();
      l.set(e, r);
    } else
      r = l.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), l.set(e, r));
    r.has(n) || (nd = !0, r.add(n), t = S2.bind(null, t, e, n), e.then(t, t));
  }
  function S2(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, ve === t && (Ft & n) === n && ((Be === 4 || Be === 3 && (Ft & 62914560) === Ft && 300 > wt() - cc) && (ie & 2) === 0 ? tr(t, 0) : oc |= n, Fu === Ft && (Fu = 0)), fi(t);
  }
  function __(t, e) {
    e === 0 && (e = be()), t = Xa(t, e), t !== null && (Mn(t, e), fi(t));
  }
  function b2(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), __(t, n);
  }
  function T2(t, e) {
    var n = 0;
    switch (t.tag) {
      case 31:
      case 13:
        var l = t.stateNode, r = t.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case 19:
        l = t.stateNode;
        break;
      case 22:
        l = t.stateNode._retryCache;
        break;
      default:
        throw Error(a(314));
    }
    l !== null && l.delete(e), __(t, n);
  }
  function E2(t, e) {
    return Ol(t, e);
  }
  var nr = null, lr = null, dd = !1, vc = !1, md = !1, fa = 0;
  function fi(t) {
    t !== lr && t.next === null && (lr === null ? nr = lr = t : lr = lr.next = t), vc = !0, dd || (dd = !0, M2());
  }
  function ds(t, e) {
    if (!md && vc) {
      md = !0;
      do
        for (var n = !1, l = nr; l !== null; ) {
          if (t !== 0) {
            var r = l.pendingLanes;
            if (r === 0) var o = 0;
            else {
              var m = l.suspendedLanes, y = l.pingedLanes;
              o = (1 << 31 - at(42 | t) + 1) - 1, o &= r & ~(m & ~y), o = o & 201326741 ? o & 201326741 | 1 : o ? o | 2 : 0;
            }
            o !== 0 && (n = !0, b_(l, o));
          } else
            o = Ft, o = _e(
              l,
              l === ve ? o : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (o & 3) === 0 || ae(l, o) || (n = !0, b_(l, o));
          l = l.next;
        }
      while (n);
      md = !1;
    }
  }
  function x2() {
    v_();
  }
  function v_() {
    vc = dd = !1;
    var t = 0;
    fa !== 0 && Y2() && (t = fa);
    for (var e = wt(), n = null, l = nr; l !== null; ) {
      var r = l.next, o = y_(l, e);
      o === 0 ? (l.next = null, n === null ? nr = r : n.next = r, r === null && (lr = n)) : (n = l, (t !== 0 || (o & 3) !== 0) && (vc = !0)), l = r;
    }
    Re !== 0 && Re !== 5 || ds(t), fa !== 0 && (fa = 0);
  }
  function y_(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, r = t.expirationTimes, o = t.pendingLanes & -62914561; 0 < o; ) {
      var m = 31 - at(o), y = 1 << m, E = r[m];
      E === -1 ? ((y & n) === 0 || (y & l) !== 0) && (r[m] = il(y, e)) : E <= e && (t.expiredLanes |= y), o &= ~y;
    }
    if (e = ve, n = Ft, n = _e(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (ce === 2 || ce === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && Vn(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || ae(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && Vn(l), je(n)) {
        case 2:
        case 8:
          n = Qn;
          break;
        case 32:
          n = xn;
          break;
        case 268435456:
          n = Ti;
          break;
        default:
          n = xn;
      }
      return l = S_.bind(null, t), n = Ol(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && Vn(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function S_(t, e) {
    if (Re !== 0 && Re !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (_c() && t.callbackNode !== n)
      return null;
    var l = Ft;
    return l = _e(
      t,
      t === ve ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (a_(t, l, e), y_(t, wt()), t.callbackNode != null && t.callbackNode === n ? S_.bind(null, t) : null);
  }
  function b_(t, e) {
    if (_c()) return null;
    a_(t, e, !0);
  }
  function M2() {
    L2(function() {
      (ie & 6) !== 0 ? Ol(
        jn,
        x2
      ) : v_();
    });
  }
  function gd() {
    if (fa === 0) {
      var t = Ka;
      t === 0 && (t = Ce, Ce <<= 1, (Ce & 261888) === 0 && (Ce = 256)), fa = t;
    }
    return fa;
  }
  function T_(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : mo(t);
  }
  function O2(t, e, n, l, r) {
    if (e === "submit" && n && n.stateNode === r) {
      var o = T_(
        (r[Ze] || null).action
      ), m = l.submitter;
      m && (e = (e = m[Ze] || null) ? T_(e.formAction) : m.getAttribute("formAction"), e !== null && (o = e, m = null));
      var y = new vo(
        "action",
        "action",
        null,
        l,
        r
      );
      t.push({
        event: y,
        listeners: [
          {
            instance: null,
            listener: function() {
              if (l.defaultPrevented) {
                if (fa !== 0) {
                  var E = new FormData(r, m);
                  Eh(
                    n,
                    {
                      pending: !0,
                      data: E,
                      method: r.method,
                      action: o
                    },
                    null,
                    E
                  );
                }
              } else
                typeof o == "function" && (y.preventDefault(), E = new FormData(r, m), Eh(
                  n,
                  {
                    pending: !0,
                    data: E,
                    method: r.method,
                    action: o
                  },
                  o,
                  E
                ));
            },
            currentTarget: r
          }
        ]
      });
    }
  }
  for (var pd = 0; pd < Gf.length; pd++) {
    var _d = Gf[pd], z2 = _d.toLowerCase(), A2 = _d[0].toUpperCase() + _d.slice(1);
    jl(
      z2,
      "on" + A2
    );
  }
  jl(km, "onAnimationEnd"), jl(Fm, "onAnimationIteration"), jl(Pm, "onAnimationStart"), jl("dblclick", "onDoubleClick"), jl("focusin", "onFocus"), jl("focusout", "onBlur"), jl(BS, "onTransitionRun"), jl(LS, "onTransitionStart"), jl(qS, "onTransitionCancel"), jl(Wm, "onTransitionEnd"), Mu("onMouseEnter", ["mouseout", "mouseover"]), Mu("onMouseLeave", ["mouseout", "mouseover"]), Mu("onPointerEnter", ["pointerout", "pointerover"]), Mu("onPointerLeave", ["pointerout", "pointerover"]), Ba(
    "onChange",
    "change click focusin focusout input keydown keyup selectionchange".split(" ")
  ), Ba(
    "onSelect",
    "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
      " "
    )
  ), Ba("onBeforeInput", [
    "compositionend",
    "keypress",
    "textInput",
    "paste"
  ]), Ba(
    "onCompositionEnd",
    "compositionend focusout keydown keypress keyup mousedown".split(" ")
  ), Ba(
    "onCompositionStart",
    "compositionstart focusout keydown keypress keyup mousedown".split(" ")
  ), Ba(
    "onCompositionUpdate",
    "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
  );
  var ms = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
    " "
  ), w2 = new Set(
    "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(ms)
  );
  function E_(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], r = l.event;
      l = l.listeners;
      t: {
        var o = void 0;
        if (e)
          for (var m = l.length - 1; 0 <= m; m--) {
            var y = l[m], E = y.instance, N = y.currentTarget;
            if (y = y.listener, E !== o && r.isPropagationStopped())
              break t;
            o = y, r.currentTarget = N;
            try {
              o(r);
            } catch (X) {
              bo(X);
            }
            r.currentTarget = null, o = E;
          }
        else
          for (m = 0; m < l.length; m++) {
            if (y = l[m], E = y.instance, N = y.currentTarget, y = y.listener, E !== o && r.isPropagationStopped())
              break t;
            o = y, r.currentTarget = N;
            try {
              o(r);
            } catch (X) {
              bo(X);
            }
            r.currentTarget = null, o = E;
          }
      }
    }
  }
  function kt(t, e) {
    var n = e[Zi];
    n === void 0 && (n = e[Zi] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (x_(e, t, 2, !1), n.add(l));
  }
  function vd(t, e, n) {
    var l = 0;
    e && (l |= 4), x_(
      n,
      t,
      l,
      e
    );
  }
  var yc = "_reactListening" + Math.random().toString(36).slice(2);
  function yd(t) {
    if (!t[yc]) {
      t[yc] = !0, fm.forEach(function(n) {
        n !== "selectionchange" && (w2.has(n) || vd(n, !1, t), vd(n, !0, t));
      });
      var e = t.nodeType === 9 ? t : t.ownerDocument;
      e === null || e[yc] || (e[yc] = !0, vd("selectionchange", !1, e));
    }
  }
  function x_(t, e, n, l) {
    switch (dv(e)) {
      case 2:
        var r = bb;
        break;
      case 8:
        r = Tb;
        break;
      default:
        r = qd;
    }
    n = r.bind(
      null,
      e,
      n,
      t
    ), r = void 0, !zf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), l ? r !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, {
      passive: r
    }) : t.addEventListener(e, n, !1);
  }
  function Sd(t, e, n, l, r) {
    var o = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var m = l.tag;
        if (m === 3 || m === 4) {
          var y = l.stateNode.containerInfo;
          if (y === r) break;
          if (m === 4)
            for (m = l.return; m !== null; ) {
              var E = m.tag;
              if ((E === 3 || E === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = Ya(y), m === null) return;
            if (E = m.tag, E === 5 || E === 6 || E === 26 || E === 27) {
              l = o = m;
              continue t;
            }
            y = y.parentNode;
          }
        }
        l = l.return;
      }
    xm(function() {
      var N = o, X = Mf(n), W = [];
      t: {
        var C = $m.get(t);
        if (C !== void 0) {
          var Y = vo, ot = t;
          switch (t) {
            case "keypress":
              if (po(n) === 0) break t;
            case "keydown":
            case "keyup":
              Y = dS;
              break;
            case "focusin":
              ot = "focus", Y = Rf;
              break;
            case "focusout":
              ot = "blur", Y = Rf;
              break;
            case "beforeblur":
            case "afterblur":
              Y = Rf;
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
              Y = zm;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              Y = eS;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              Y = vS;
              break;
            case km:
            case Fm:
            case Pm:
              Y = iS;
              break;
            case Wm:
              Y = SS;
              break;
            case "scroll":
            case "scrollend":
              Y = Iy;
              break;
            case "wheel":
              Y = TS;
              break;
            case "copy":
            case "cut":
            case "paste":
              Y = uS;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              Y = wm;
              break;
            case "submit":
              Y = pS;
              break;
            case "toggle":
            case "beforetoggle":
              Y = xS;
          }
          var yt = (e & 4) !== 0, Bt = !yt && (t === "scroll" || t === "scrollend"), D = yt ? C !== null ? C + "Capture" : null : C;
          yt = [];
          for (var A = N, H; A !== null; ) {
            var F = A;
            if (H = F.stateNode, F = F.tag, F !== 5 && F !== 26 && F !== 27 || H === null || D === null || (F = Yr(A, D), F != null && yt.push(
              gs(A, F, H)
            )), Bt) break;
            A = A.return;
          }
          0 < yt.length && (C = new Y(
            C,
            ot,
            null,
            n,
            X
          ), W.push({ event: C, listeners: yt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (Y = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout", Y && n !== xf && (ot = n.relatedTarget || n.fromElement) && (Ya(ot) || ot[mn]))
            break t;
          (C || Y) && (ot = X.window === X ? X : (Y = X.ownerDocument) ? Y.defaultView || Y.parentWindow : window, C ? (Y = n.relatedTarget || n.toElement, C = N, Y = Y ? Ya(Y) : null, Y !== null && (Bt = c(Y), yt = Y.tag, Y !== Bt || yt !== 5 && yt !== 27 && yt !== 6) && (Y = null)) : (C = null, Y = N), C !== Y && (yt = zm, F = "onMouseLeave", D = "onMouseEnter", A = "mouse", (t === "pointerout" || t === "pointerover") && (yt = wm, F = "onPointerLeave", D = "onPointerEnter", A = "pointer"), Bt = C == null ? ot : Hr(C), H = Y == null ? ot : Hr(Y), ot = new yt(
            F,
            A + "leave",
            C,
            n,
            X
          ), ot.target = Bt, ot.relatedTarget = H, F = null, Ya(X) === N && (yt = new yt(
            D,
            A + "enter",
            Y,
            n,
            X
          ), yt.target = H, yt.relatedTarget = Bt, F = yt), Bt = F, yt = C && Y ? k(
            C,
            Y,
            C2
          ) : null, C !== null && M_(
            W,
            ot,
            C,
            yt,
            !1
          ), Y !== null && Bt !== null && M_(
            W,
            Bt,
            Y,
            yt,
            !0
          )));
        }
        t: {
          if (C = N ? Hr(N) : window, Y = C.nodeName && C.nodeName.toLowerCase(), Y === "select" || Y === "input" && C.type === "file")
            var gt = Bm;
          else if (Hm(C))
            if (Lm)
              gt = US;
            else {
              gt = DS;
              var Pt = RS;
            }
          else
            Y = C.nodeName, !Y || Y.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? N && Ef(N.elementType) && (gt = Bm) : gt = NS;
          if (gt && (gt = gt(t, N))) {
            Ym(
              W,
              gt,
              n,
              X
            );
            break t;
          }
          Pt && Pt(t, C, N);
        }
        switch (Pt = N ? Hr(N) : window, t) {
          case "focusin":
            (Hm(Pt) || Pt.contentEditable === "true") && (Ru = Pt, Lf = N, Qr = null);
            break;
          case "focusout":
            Qr = Lf = Ru = null;
            break;
          case "mousedown":
            qf = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            qf = !1, Km(W, n, X);
            break;
          case "selectionchange":
            if (YS) break;
          case "keydown":
          case "keyup":
            Km(W, n, X);
        }
        var Et;
        if (Nf)
          t: {
            switch (t) {
              case "compositionstart":
                var Rt = "onCompositionStart";
                break t;
              case "compositionend":
                Rt = "onCompositionEnd";
                break t;
              case "compositionupdate":
                Rt = "onCompositionUpdate";
                break t;
            }
            Rt = void 0;
          }
        else
          Cu ? Nm(t, n) && (Rt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (Rt = "onCompositionStart");
        Rt && (Cm && n.locale !== "ko" && (Cu || Rt !== "onCompositionStart" ? Rt === "onCompositionEnd" && Cu && (Et = Mm()) : (Ki = X, Af = "value" in Ki ? Ki.value : Ki.textContent, Cu = !0)), Pt = Sc(N, Rt), 0 < Pt.length && (Rt = new Am(
          Rt,
          t,
          null,
          n,
          X
        ), W.push({ event: Rt, listeners: Pt }), Et ? Rt.data = Et : (Et = Um(n), Et !== null && (Rt.data = Et)))), (Et = OS ? zS(t, n) : AS(t, n)) && (Rt = Sc(N, "onBeforeInput"), 0 < Rt.length && (Pt = new Am(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          X
        ), W.push({
          event: Pt,
          listeners: Rt
        }), Pt.data = Et)), O2(
          W,
          t,
          N,
          n,
          X
        );
      }
      E_(W, e);
    });
  }
  function gs(t, e, n) {
    return {
      instance: t,
      listener: e,
      currentTarget: n
    };
  }
  function Sc(t, e) {
    for (var n = e + "Capture", l = []; t !== null; ) {
      var r = t, o = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || o === null || (r = Yr(t, n), r != null && l.unshift(
        gs(t, r, o)
      ), r = Yr(t, e), r != null && l.push(
        gs(t, r, o)
      )), t.tag === 3) return l;
      t = t.return;
    }
    return [];
  }
  function C2(t) {
    if (t === null) return null;
    do
      t = t.return;
    while (t && t.tag !== 5 && t.tag !== 27);
    return t || null;
  }
  function M_(t, e, n, l, r) {
    for (var o = e._reactName, m = []; n !== null && n !== l; ) {
      var y = n, E = y.alternate, N = y.stateNode;
      if (y = y.tag, E !== null && E === l) break;
      y !== 5 && y !== 26 && y !== 27 || N === null || (E = N, r ? (N = Yr(n, o), N != null && m.unshift(
        gs(n, N, E)
      )) : r || (N = Yr(n, o), N != null && m.push(
        gs(n, N, E)
      ))), n = n.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var R2 = /\r\n?/g, D2 = /\u0000|\uFFFD/g;
  function O_(t) {
    return (typeof t == "string" ? t : "" + t).replace(R2, `
`).replace(D2, "");
  }
  function z_(t, e) {
    return e = O_(e), O_(t) === e;
  }
  function he(t, e, n, l, r, o) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          e === "body" || e === "textarea" && l === "" || zu(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          e !== "body" && zu(t, "" + l);
        else return;
        break;
      case "className":
        ho(t, "class", l);
        break;
      case "tabIndex":
        ho(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ho(t, n, l);
        break;
      case "style":
        Tm(t, l, o);
        return;
      case "data":
        if (e !== "object") {
          ho(t, "data", l);
          break;
        }
      case "src":
      case "href":
        if (l === "" && (e !== "a" || n !== "href")) {
          t.removeAttribute(n);
          break;
        }
        if (l == null || typeof l == "function" || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = mo(l), t.setAttribute(n, l);
        break;
      case "action":
      case "formAction":
        if (typeof l == "function") {
          t.setAttribute(
            n,
            "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
          );
          break;
        } else
          typeof o == "function" && (n === "formAction" ? (e !== "input" && he(t, e, "name", r.name, r, null), he(
            t,
            e,
            "formEncType",
            r.formEncType,
            r,
            null
          ), he(
            t,
            e,
            "formMethod",
            r.formMethod,
            r,
            null
          ), he(
            t,
            e,
            "formTarget",
            r.formTarget,
            r,
            null
          )) : (he(t, e, "encType", r.encType, r, null), he(t, e, "method", r.method, r, null), he(t, e, "target", r.target, r, null)));
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = mo(l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = ei);
        return;
      case "onScroll":
        l != null && kt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && kt("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(a(61));
          if (n = l.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            o?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "multiple":
        t.multiple = l && typeof l != "function" && typeof l != "symbol";
        break;
      case "muted":
        t.muted = l && typeof l != "function" && typeof l != "symbol";
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
        if (l == null || typeof l == "function" || typeof l == "boolean" || typeof l == "symbol") {
          t.removeAttribute("xlink:href");
          break;
        }
        n = mo(l), t.setAttributeNS(
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
        l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
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
        l && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, "") : t.removeAttribute(n);
        break;
      case "capture":
      case "download":
        l === !0 ? t.setAttribute(n, "") : l !== !1 && l != null && typeof l != "function" && typeof l != "symbol" ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "cols":
      case "rows":
      case "size":
      case "span":
        l != null && typeof l != "function" && typeof l != "symbol" && !isNaN(l) && 1 <= l ? t.setAttribute(n, l) : t.removeAttribute(n);
        break;
      case "rowSpan":
      case "start":
        l == null || typeof l == "function" || typeof l == "symbol" || isNaN(l) ? t.removeAttribute(n) : t.setAttribute(n, l);
        break;
      case "popover":
        kt("beforetoggle", t), kt("toggle", t), fo(t, "popover", l);
        break;
      case "xlinkActuate":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Ei(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Ei(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Ei(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Ei(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        fo(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = Wy.get(n) || n, fo(t, n, l);
        else return;
    }
    ne = !0;
  }
  function bd(t, e, n, l, r, o) {
    switch (n) {
      case "style":
        Tm(t, l, o);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(a(61));
          if (n = l.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            o?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") zu(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          zu(t, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && kt("scroll", t);
        return;
      case "onScrollEnd":
        l != null && kt("scrollend", t);
        return;
      case "onClick":
        l != null && (t.onclick = ei);
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
        if (!hm.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), o = n.slice(2, r ? n.length - 7 : void 0), e = t[Ze] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(o, e, r), typeof l == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(o, l, r);
              break t;
            }
            ne = !0, n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : fo(t, n, l);
          }
        return;
    }
    ne = !0;
  }
  function yn(t, e, n) {
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
        kt("error", t), kt("load", t);
        var l = !1, r = !1, o;
        for (o in n)
          if (n.hasOwnProperty(o)) {
            var m = n[o];
            if (m != null)
              switch (o) {
                case "src":
                  l = !0;
                  break;
                case "srcSet":
                  r = !0;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(a(137, e));
                default:
                  he(t, e, o, m, n, null);
              }
          }
        r && he(t, e, "srcSet", n.srcSet, n, null), l && he(t, e, "src", n.src, n, null);
        return;
      case "input":
        kt("invalid", t);
        var y = o = m = r = null, E = null, N = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var X = n[l];
            if (X != null)
              switch (l) {
                case "name":
                  r = X;
                  break;
                case "type":
                  m = X;
                  break;
                case "checked":
                  E = X;
                  break;
                case "defaultChecked":
                  N = X;
                  break;
                case "value":
                  o = X;
                  break;
                case "defaultValue":
                  y = X;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (X != null)
                    throw Error(a(137, e));
                  break;
                default:
                  he(t, e, l, X, n, null);
              }
          }
        vm(
          t,
          o,
          y,
          E,
          N,
          m,
          r,
          !1
        );
        return;
      case "select":
        kt("invalid", t), l = m = o = null;
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
                l = y;
              default:
                he(t, e, r, y, n, null);
            }
        e = o, n = m, t.multiple = !!l, e != null ? Ou(t, !!l, e, !1) : n != null && Ou(t, !!l, n, !0);
        return;
      case "textarea":
        kt("invalid", t), o = r = l = null;
        for (m in n)
          if (n.hasOwnProperty(m) && (y = n[m], y != null))
            switch (m) {
              case "value":
                l = y;
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
                he(t, e, m, y, n, null);
            }
        Sm(t, l, r, o);
        return;
      case "option":
        for (E in n)
          n.hasOwnProperty(E) && (l = n[E], l != null) && (E === "selected" ? t.selected = l && typeof l != "function" && typeof l != "symbol" : he(t, e, E, l, n, null));
        return;
      case "dialog":
        kt("beforetoggle", t), kt("toggle", t), kt("cancel", t), kt("close", t);
        break;
      case "iframe":
      case "object":
        kt("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < ms.length; l++)
          kt(ms[l], t);
        break;
      case "image":
        kt("error", t), kt("load", t);
        break;
      case "details":
        kt("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        kt("error", t), kt("load", t);
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
        for (N in n)
          if (n.hasOwnProperty(N) && (l = n[N], l != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, e));
              default:
                he(t, e, N, l, n, null);
            }
        return;
      default:
        if (Ef(e)) {
          for (X in n)
            n.hasOwnProperty(X) && (l = n[X], l !== void 0 && bd(
              t,
              e,
              X,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (l = n[y], l != null && he(t, e, y, l, n, null));
  }
  var N2 = {};
  function U2(t, e, n, l) {
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
        var r = null, o = null, m = null, y = null, E = null, N = null, X = null;
        for (Y in n) {
          var W = n[Y];
          if (n.hasOwnProperty(Y) && W != null)
            switch (Y) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                E = W;
              default:
                l.hasOwnProperty(Y) || he(t, e, Y, null, l, W);
            }
        }
        for (var C in l) {
          var Y = l[C];
          if (W = n[C], l.hasOwnProperty(C) && (Y != null || W != null))
            switch (C) {
              case "type":
                Y !== W && (ne = !0), o = Y;
                break;
              case "name":
                Y !== W && (ne = !0), r = Y;
                break;
              case "checked":
                Y !== W && (ne = !0), N = Y;
                break;
              case "defaultChecked":
                Y !== W && (ne = !0), X = Y;
                break;
              case "value":
                Y !== W && (ne = !0), m = Y;
                break;
              case "defaultValue":
                Y !== W && (ne = !0), y = Y;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (Y != null)
                  throw Error(a(137, e));
                break;
              default:
                Y !== W && he(
                  t,
                  e,
                  C,
                  Y,
                  l,
                  W
                );
            }
        }
        bf(
          t,
          m,
          y,
          E,
          N,
          X,
          o,
          r
        );
        return;
      case "select":
        Y = m = y = C = null;
        for (o in n)
          if (E = n[o], n.hasOwnProperty(o) && E != null)
            switch (o) {
              case "value":
                break;
              case "multiple":
                Y = E;
              default:
                l.hasOwnProperty(o) || he(
                  t,
                  e,
                  o,
                  null,
                  l,
                  E
                );
            }
        for (r in l)
          if (o = l[r], E = n[r], l.hasOwnProperty(r) && (o != null || E != null))
            switch (r) {
              case "value":
                o !== E && (ne = !0), C = o;
                break;
              case "defaultValue":
                o !== E && (ne = !0), y = o;
                break;
              case "multiple":
                o !== E && (ne = !0), m = o;
              default:
                o !== E && he(
                  t,
                  e,
                  r,
                  o,
                  l,
                  E
                );
            }
        e = y, n = m, l = Y, C != null ? Ou(t, !!n, C, !1) : !!l != !!n && (e != null ? Ou(t, !!n, e, !0) : Ou(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        Y = C = null;
        for (y in n)
          if (r = n[y], n.hasOwnProperty(y) && r != null && !l.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                he(t, e, y, null, l, r);
            }
        for (m in l)
          if (r = l[m], o = n[m], l.hasOwnProperty(m) && (r != null || o != null))
            switch (m) {
              case "value":
                r !== o && (ne = !0), C = r;
                break;
              case "defaultValue":
                r !== o && (ne = !0), Y = r;
                break;
              case "children":
                break;
              case "dangerouslySetInnerHTML":
                if (r != null) throw Error(a(91));
                break;
              default:
                r !== o && he(t, e, m, r, l, o);
            }
        ym(t, C, Y);
        return;
      case "option":
        for (var ot in n)
          C = n[ot], n.hasOwnProperty(ot) && C != null && !l.hasOwnProperty(ot) && (ot === "selected" ? t.selected = !1 : he(
            t,
            e,
            ot,
            null,
            l,
            C
          ));
        for (E in l)
          C = l[E], Y = n[E], l.hasOwnProperty(E) && C !== Y && (C != null || Y != null) && (E === "selected" ? (C !== Y && (ne = !0), t.selected = C && typeof C != "function" && typeof C != "symbol") : he(
            t,
            e,
            E,
            C,
            l,
            Y
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
        for (var yt in n)
          C = n[yt], n.hasOwnProperty(yt) && C != null && !l.hasOwnProperty(yt) && he(t, e, yt, null, l, C);
        for (N in l)
          if (C = l[N], Y = n[N], l.hasOwnProperty(N) && C !== Y && (C != null || Y != null))
            switch (N) {
              case "children":
              case "dangerouslySetInnerHTML":
                if (C != null)
                  throw Error(a(137, e));
                break;
              default:
                he(
                  t,
                  e,
                  N,
                  C,
                  l,
                  Y
                );
            }
        return;
      default:
        if (Ef(e)) {
          for (var Bt in n)
            C = n[Bt], n.hasOwnProperty(Bt) && C !== void 0 && !l.hasOwnProperty(Bt) && bd(
              t,
              e,
              Bt,
              void 0,
              l,
              C
            );
          for (X in l)
            C = l[X], Y = n[X], !l.hasOwnProperty(X) || C === Y || C === void 0 && Y === void 0 || bd(
              t,
              e,
              X,
              C,
              l,
              Y
            );
          return;
        }
    }
    for (var D in n)
      C = n[D], n.hasOwnProperty(D) && C != null && !l.hasOwnProperty(D) && he(t, e, D, null, l, C);
    for (W in l)
      C = l[W], Y = n[W], !l.hasOwnProperty(W) || C === Y || C == null && Y == null || he(t, e, W, C, l, Y);
  }
  function A_(t) {
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
  function H2() {
    if (typeof performance.getEntriesByType == "function") {
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var r = n[l], o = r.transferSize, m = r.initiatorType, y = r.duration;
        if (o && y && A_(m)) {
          for (m = 0, y = r.responseEnd, l += 1; l < n.length; l++) {
            var E = n[l], N = E.startTime;
            if (N > y) break;
            var X = E.transferSize, W = E.initiatorType;
            X && A_(W) && (E = E.responseEnd, m += X * (E < y ? 1 : (y - N) / (E - N)));
          }
          if (--l, e += 8 * (o + m) / (r.duration / 1e3), t++, 10 < t) break;
        }
      }
      if (0 < t) return e / t / 1e6;
    }
    return navigator.connection && (t = navigator.connection.downlink, typeof t == "number") ? t : 5;
  }
  var Td = null, Ed = null;
  function ps(t) {
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  function w_(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function C_(t, e) {
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
  function R_(t, e, n, l) {
    return n = ps(
      n
    ).createElement(t), n[Qe] = l, n[Ze] = e, yn(n, t, e), an(n), n;
  }
  function xd(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Md = null;
  function Y2() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Md ? !1 : (Md = t, !0) : (Md = null, !1);
  }
  var Od = typeof setTimeout == "function" ? setTimeout : void 0, B2 = typeof clearTimeout == "function" ? clearTimeout : void 0, D_ = typeof Promise == "function" ? Promise : void 0, N_ = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Od, L2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof D_ < "u" ? function(t) {
    return D_.resolve(null).then(t).catch(q2);
  } : Od;
  function q2(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ha(t) {
    return t === "head";
  }
  function U_(t, e) {
    var n = e, l = 0;
    do {
      var r = n.nextSibling;
      if (t.removeChild(n), r && r.nodeType === 8)
        if (n = r.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(r), cr(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Ud(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Ud(n);
          for (var o = n.firstChild; o; ) {
            var m = o.nextSibling, y = o.nodeName;
            o[Ur] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && o.rel.toLowerCase() === "stylesheet" || n.removeChild(o), o = m;
          }
        } else
          n === "body" && Ud(t.ownerDocument.body);
      n = r;
    } while (n);
    cr(e);
  }
  function H_(t, e) {
    var n = t;
    t = 0;
    do {
      var l = n.nextSibling;
      if (n.nodeType === 1 ? e ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (e ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), l && l.nodeType === 8)
        if (n = l.data, n === "/$") {
          if (t === 0) break;
          t--;
        } else
          n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || t++;
      n = l;
    } while (n);
  }
  function Y_(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var l = 1;
      else
        for (var r = l = 0; r < e.length; r++) {
          var o = e[r];
          0 < o.width && 0 < o.height && l++;
        }
      l === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function B_(t, e) {
    t = t.style, e = e.style;
    var n = e != null ? e.hasOwnProperty("viewTransitionName") ? e.viewTransitionName : e.hasOwnProperty("view-transition-name") ? e["view-transition-name"] : null : null;
    t.viewTransitionName = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), n = e != null ? e.hasOwnProperty("viewTransitionClass") ? e.viewTransitionClass : e.hasOwnProperty("view-transition-class") ? e["view-transition-class"] : null : null, t.viewTransitionClass = n == null || typeof n == "boolean" ? "" : ("" + n).trim(), t.display === "inline-block" && (e == null ? t.display = t.margin = "" : (n = e.display, t.display = n == null || typeof n == "boolean" ? "" : n, n = e.margin, n != null ? t.margin = n : (n = e.hasOwnProperty("marginTop") ? e.marginTop : e["margin-top"], t.marginTop = n == null || typeof n == "boolean" ? "" : n, e = e.hasOwnProperty("marginBottom") ? e.marginBottom : e["margin-bottom"], t.marginBottom = e == null || typeof e == "boolean" ? "" : e)));
  }
  function X2(t, e, n) {
    return n = n.ownerDocument.defaultView, {
      rect: t,
      abs: e.position === "absolute" || e.position === "fixed",
      clip: e.clipPath !== "none" || e.overflow !== "visible" || e.filter !== "none" || e.mask !== "none" || e.mask !== "none" || e.borderRadius !== "0px",
      view: 0 <= t.bottom && 0 <= t.right && t.top <= n.innerHeight && t.left <= n.innerWidth
    };
  }
  function zd(t) {
    var e = t.getBoundingClientRect(), n = getComputedStyle(t);
    return X2(e, n, t);
  }
  function G2(t) {
    return t.documentElement.clientHeight;
  }
  function V2(t) {
    this.addEventListener("load", t), this.addEventListener("error", t);
  }
  function j2(t, e, n, l, r, o, m, y, E) {
    var N = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var X = N.startViewTransition({
        update: function() {
          var C = N.defaultView, Y = C.navigation && C.navigation.transition, ot = N.fonts.status;
          l();
          var yt = [];
          if (ot === "loaded" && (G2(N), N.fonts.status === "loading" && yt.push(N.fonts.ready)), ot = yt.length, t !== null)
            for (var Bt = t.suspenseyImages, D = 0, A = 0; A < Bt.length; A++) {
              var H = Bt[A];
              if (!H.complete) {
                var F = H.getBoundingClientRect();
                if (0 < F.bottom && 0 < F.right && F.top < C.innerHeight && F.left < C.innerWidth) {
                  if (D += iv(H), D > Ec) {
                    yt.length = ot;
                    break;
                  }
                  H = new Promise(
                    V2.bind(H)
                  ), yt.push(H);
                }
              }
            }
          if (0 < yt.length)
            return C = Promise.race([
              Promise.all(yt),
              new Promise(function(gt) {
                return setTimeout(gt, 500);
              })
            ]).then(r, r), (Y ? Promise.allSettled([Y.finished, C]) : C).then(o, o);
          if (r(), Y)
            return Y.finished.then(
              o,
              o
            );
          o();
        },
        types: n
      });
      N.__reactViewTransition = X;
      var W = [];
      return X.ready.then(
        function() {
          for (var C = N.documentElement.getAnimations({
            subtree: !0
          }), Y = 0; Y < C.length; Y++) {
            var ot = C[Y], yt = ot.effect, Bt = yt.pseudoElement;
            if (Bt != null && Bt.startsWith("::view-transition")) {
              W.push(ot), ot = yt.getKeyframes();
              for (var D = Bt = void 0, A = !0, H = 0; H < ot.length; H++) {
                var F = ot[H], gt = F.width;
                if (Bt === void 0) Bt = gt;
                else if (Bt !== gt) {
                  A = !1;
                  break;
                }
                if (gt = F.height, D === void 0) D = gt;
                else if (D !== gt) {
                  A = !1;
                  break;
                }
                delete F.width, delete F.height, F.transform === "none" && delete F.transform;
              }
              A && Bt !== void 0 && D !== void 0 && (yt.setKeyframes(ot), A = getComputedStyle(
                yt.target,
                yt.pseudoElement
              ), A.width !== Bt || A.height !== D) && (A = ot[0], A.width = Bt, A.height = D, A = ot[ot.length - 1], A.width = Bt, A.height = D, yt.setKeyframes(ot));
            }
          }
          m();
        },
        function(C) {
          N.__reactViewTransition === X && (N.__reactViewTransition = null);
          try {
            typeof C == "object" && C !== null && C.name === "InvalidStateError" && (C.message === "View transition was skipped because document visibility state is hidden." || C.message === "Skipping view transition because document visibility state has become hidden." || C.message === "Skipping view transition because viewport size changed." || C.message === "Transition was aborted because of invalid state") && (C = null), C !== null && E(C);
          } finally {
            l(), r(), m();
          }
        }
      ), X.finished.finally(function() {
        for (var C = 0; C < W.length; C++)
          W[C].cancel();
        N.__reactViewTransition === X && (N.__reactViewTransition = null), y();
      }), X;
    } catch {
      return l(), r(), m(), null;
    }
  }
  function lu(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  lu.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : R({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, lu.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), l = [], r = 0; r < n.length; r++) {
      var o = n[r].effect;
      o !== null && o.target === t && o.pseudoElement === e && l.push(n[r]);
    }
    return l;
  }, lu.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function L_(t) {
    return {
      name: t,
      group: new lu("group", t),
      imagePair: new lu("image-pair", t),
      old: new lu("old", t),
      new: new lu("new", t)
    };
  }
  function ml(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  ml.prototype.addEventListener = function(t, e, n) {
    var l = null, r = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var o = this._eventListeners;
      if (X_(o, t, e, n) === -1) {
        var m = this, y = e;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(E) {
          m.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, E) : e.handleEvent(E);
        }), l !== null && (r = m.removeEventListener.bind(
          m,
          t,
          e,
          n
        ), l.addEventListener("abort", r, { once: !0 }), r = l.removeEventListener.bind(l, "abort", r)), l = ir(n), o.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: r
        }), v(
          this._fragmentFiber.child,
          !1,
          Q2,
          t,
          y,
          l
        );
      }
      this._eventListeners = o;
    }
  };
  function Q2(t, e, n, l) {
    return w(t).addEventListener(
      e,
      n,
      l
    ), !1;
  }
  ml.prototype.removeEventListener = function(t, e, n) {
    var l = this._eventListeners;
    if (l !== null && (e = X_(
      l,
      t,
      e,
      n
    ), e !== -1)) {
      var r = l[e];
      n = r.attachedListener;
      var o = r.cleanup;
      r = ir(r.optionsOrUseCapture), v(
        this._fragmentFiber.child,
        !1,
        Z2,
        t,
        n,
        r
      ), l.splice(e, 1), o !== null && o();
    }
  };
  function Z2(t, e, n, l) {
    return w(t).removeEventListener(
      e,
      n,
      l
    ), !1;
  }
  function ir(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function q_(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function X_(t, e, n, l) {
    if (t.length === 0) return -1;
    l = q_(l);
    for (var r = 0; r < t.length; r++) {
      var o = t[r];
      if (o.type === e && o.listener === n && q_(o.optionsOrUseCapture) === l)
        return r;
    }
    return -1;
  }
  ml.prototype.dispatchEvent = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = w(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var l = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var r = 0; r < n.length; r++) {
          var o = n[r];
          l.addEventListener(
            o.type,
            o.attachedListener,
            ir(o.optionsOrUseCapture)
          );
        }
      if (e.appendChild(l), t = l.dispatchEvent(t), n)
        for (r = 0; r < n.length; r++)
          o = n[r], l.removeEventListener(
            o.type,
            o.attachedListener,
            ir(o.optionsOrUseCapture)
          );
      return e.removeChild(l), t;
    }
    return e.dispatchEvent(t);
  }, ml.prototype.focus = function(t) {
    v(
      this._fragmentFiber.child,
      !0,
      G_,
      t,
      void 0,
      void 0
    );
  };
  function G_(t, e) {
    return t.tag === 6 ? !1 : (t = w(t), lb(t, e));
  }
  ml.prototype.focusLast = function(t) {
    var e = [];
    v(
      this._fragmentFiber.child,
      !0,
      Ad,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !G_(e[n], t); n--) ;
  };
  function Ad(t, e) {
    return e.push(t), !1;
  }
  ml.prototype.blur = function() {
    var t = S(
      this._fragmentFiber
    );
    t !== null && (t = w(t), t = ps(t).activeElement, t !== null && v(
      this._fragmentFiber.child,
      !1,
      K2,
      t,
      void 0,
      void 0
    ));
  };
  function K2(t, e) {
    return t.tag === 6 ? !1 : (t = w(t), t === e || t.contains(e) ? (e.blur(), !0) : !1);
  }
  ml.prototype.observeUsing = function(t) {
    this._observers === null && (this._observers = /* @__PURE__ */ new Set()), this._observers.add(t), v(
      this._fragmentFiber.child,
      !1,
      J2,
      t,
      void 0,
      void 0
    );
  };
  function J2(t, e) {
    return t.tag === 6 || (t = w(t), e.observe(t)), !1;
  }
  ml.prototype.unobserveUsing = function(t) {
    var e = this._observers;
    if (e !== null && e.has(t)) {
      e.delete(t), v(
        this._fragmentFiber.child,
        !1,
        k2,
        t,
        void 0,
        void 0
      );
      for (var n = e = 0; n < kl.length; n++) {
        var l = kl[n];
        l.fragmentInstance === this && l.observer === t ? t.unobserve(l.instance) : kl[e++] = l;
      }
      kl.length = e;
    }
  };
  function k2(t, e) {
    return t.tag === 6 || (t = w(t), e.unobserve(t)), !1;
  }
  var kl = [], wd = !1;
  function F2(t, e, n) {
    kl.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), wd || (wd = !0, ib(function() {
      wd = !1;
      var l = kl;
      kl = [];
      for (var r = 0; r < l.length; r++) {
        var o = l[r];
        o.observer.unobserve(o.instance);
      }
    }));
  }
  ml.prototype.getClientRects = function() {
    var t = [];
    return v(
      this._fragmentFiber.child,
      !1,
      P2,
      t,
      void 0,
      void 0
    ), t;
  };
  function P2(t, e) {
    if (t.tag === 6) {
      t = t.stateNode;
      var n = t.ownerDocument.createRange();
      n.selectNodeContents(t), e.push.apply(e, n.getClientRects());
    } else
      t = w(t), e.push.apply(e, t.getClientRects());
    return !1;
  }
  ml.prototype.getRootNode = function(t) {
    var e = S(
      this._fragmentFiber
    );
    return e === null ? this : w(e).getRootNode(t);
  }, ml.prototype.compareDocumentPosition = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return Node.DOCUMENT_POSITION_DISCONNECTED;
    var n = [];
    v(
      this._fragmentFiber.child,
      !1,
      Ad,
      n,
      void 0,
      void 0
    );
    var l = w(e);
    if (n.length === 0) {
      if (n = l, b(this._fragmentFiber)) {
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
      var r = l = n.compareDocumentPosition(t);
      return n === t ? r = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = M(e)[1], n === null ? r = Node.DOCUMENT_POSITION_PRECEDING : (t = w(n).compareDocumentPosition(
        t
      ), r = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), r |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = w(n[0]), r = w(n[n.length - 1]);
    var o = b(this._fragmentFiber) ? e.parentElement : l;
    if (o == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = o.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, o = o.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var m = e.compareDocumentPosition(t), y = r.compareDocumentPosition(t), E = m & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = l && o && m & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, e = l && e === t || o && r === t || E || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && e === t || !o && r === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : m, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || W2(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function W2(t, e, n, l, r) {
    var o = Ya(r);
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!o) && !(e = o === n) && (e = k(
      n,
      o,
      j
    ), e === null ? e = !1 : (v(
      e,
      !0,
      Z,
      o,
      n
    ), o = G, G = null, e = o !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!o) && !(e = o === l) && (e = k(
      l,
      o,
      j
    ), e === null ? e = !1 : (v(
      e,
      !0,
      B,
      o,
      l
    ), o = G, q = G = null, e = o !== null)), e) : !1;
  }
  function V_(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  ml.prototype.scrollIntoView = function(t) {
    if (typeof t == "object") throw Error(a(566));
    var e = [];
    v(
      this._fragmentFiber.child,
      !1,
      Ad,
      e,
      void 0,
      void 0
    );
    var n = t !== !1;
    if (e.length === 0) {
      var l = M(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || S(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        t = w(l), V_(t, n);
        return;
      }
      if (l = w(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          n = "host" in l ? l.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        l.scrollIntoView(t);
      }
    }
    for (l = n ? e.length - 1 : 0; l !== (n ? -1 : e.length); ) {
      var r = e[l];
      r.tag === 6 ? (r = w(r), V_(r, n)) : w(r).scrollIntoView(t), l += n ? -1 : 1;
    }
  };
  function $2(t, e) {
    return t = w(t), j_(t, e), !1;
  }
  function j_(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function Q_(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = n[l];
        t.addEventListener(
          r.type,
          r.attachedListener,
          ir(r.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      for (var m = 0, y = 0; y < kl.length; y++) {
        var E = kl[y];
        (E.fragmentInstance !== e || E.observer !== o || E.instance !== t) && (kl[m++] = E);
      }
      kl.length = m, o.observe(t);
    }), j_(t, e));
  }
  function I2(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = n[l];
        t.removeEventListener(
          r.type,
          r.attachedListener,
          ir(r.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(o) {
      typeof o.rootMargin == "string" ? F2(
        e,
        o,
        t
      ) : o.unobserve(t);
    }), t.reactFragments != null && t.reactFragments.delete(e));
  }
  function Cd(t) {
    var e = t.firstChild;
    for (e && e.nodeType === 10 && (e = e.nextSibling); e; ) {
      var n = e;
      switch (e = e.nextSibling, n.nodeName) {
        case "HTML":
        case "HEAD":
        case "BODY":
          Cd(n), co(n);
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
  function tb(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var r = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[Ur])
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
      if (t = Ul(t.nextSibling), t === null) break;
    }
    return null;
  }
  function eb(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = Ul(t.nextSibling), t === null)) return null;
    return t;
  }
  function Z_(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = Ul(t.nextSibling), t === null)) return null;
    return t;
  }
  function Rd(t) {
    return t.data === "$?" || t.data === "$~";
  }
  function Dd(t) {
    return t.data === "$!" || t.data === "$?" && t.ownerDocument.readyState !== "loading";
  }
  function nb(t, e) {
    var n = t.ownerDocument;
    if (t.data === "$~") t._reactRetry = e;
    else if (t.data !== "$?" || n.readyState !== "loading")
      e();
    else {
      var l = function() {
        e(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function Ul(t) {
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
  var Nd = null;
  function K_(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return Ul(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function J_(t) {
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
  function lb(t, e) {
    function n() {
      l = !0;
    }
    if (t.ownerDocument.activeElement === t) return !0;
    var l = !1;
    try {
      t.ownerDocument.addEventListener("focus", n, !0), (t.focus || HTMLElement.prototype.focus).call(t, e);
    } finally {
      t.ownerDocument.removeEventListener("focus", n, !0);
    }
    return l;
  }
  function ib(t) {
    N_(function() {
      N_(function(e) {
        return t(e);
      });
    });
  }
  function k_(t, e, n) {
    switch (e = ps(n), t) {
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
  function F_(t, e, n) {
    for (var l in n) {
      var r = n[l];
      n.hasOwnProperty(l) && r != null && he(t, e, l, null, N2, r);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === ei && (t.onclick = null), co(t);
  }
  function Ud(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    co(t);
  }
  var Hl = /* @__PURE__ */ new Map(), P_ = /* @__PURE__ */ new Set();
  function _s(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Yi = ct.d;
  ct.d = {
    f: ab,
    r: ub,
    D: rb,
    C: sb,
    L: ob,
    m: cb,
    X: hb,
    S: fb,
    M: db
  };
  function ab() {
    var t = Yi.f(), e = mc();
    return t || e;
  }
  function ub(t) {
    var e = Eu(t);
    e !== null && e.tag === 5 && e.type === "form" ? $g(e) : Yi.r(t);
  }
  var ar = typeof document > "u" ? null : document;
  function W_(t, e, n) {
    var l = ar;
    if (l && typeof e == "string" && e) {
      var r = zl(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), P_.has(r) || (P_.add(r), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(r) === null && (e = l.createElement("link"), yn(e, "link", t), an(e), l.head.appendChild(e)));
    }
  }
  function rb(t) {
    Yi.D(t), W_("dns-prefetch", t, null);
  }
  function sb(t, e) {
    Yi.C(t, e), W_("preconnect", t, e);
  }
  function ob(t, e, n) {
    Yi.L(t, e, n);
    var l = ar;
    if (l && t && e) {
      var r = 'link[rel="preload"][as="' + zl(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + zl(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + zl(
        n.imageSizes
      ) + '"]')) : r += '[href="' + zl(t) + '"]';
      var o = r;
      switch (e) {
        case "style":
          o = ur(t);
          break;
        case "script":
          o = rr(t);
      }
      if (!(Hl.has(o) || (t = R(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Hl.set(o, t), l.querySelector(r) !== null || e === "style" && l.querySelector(vs(o)) || e === "script" && l.querySelector(ys(o))))) {
        var m = l.createElement("link");
        yn(m, "link", t), e === "style" && (m[oo] = !0, m.onload = m.onerror = function() {
          cm(m);
        }), an(m), l.head.appendChild(m);
      }
    }
  }
  function cb(t, e) {
    Yi.m(t, e);
    var n = ar;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + zl(l) + '"][href="' + zl(t) + '"]', o = r;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          o = rr(t);
      }
      if (!Hl.has(o) && (t = R({ rel: "modulepreload", href: t }, e), Hl.set(o, t), n.querySelector(r) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(ys(o)))
              return;
        }
        l = n.createElement("link"), yn(l, "link", t), an(l), n.head.appendChild(l);
      }
    }
  }
  function fb(t, e, n) {
    Yi.S(t, e, n);
    var l = ar;
    if (l && t) {
      var r = xu(l).hoistableStyles, o = ur(t);
      e = e || "default";
      var m = r.get(o);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = l.querySelector(
          vs(o)
        ))
          y.loading = 5;
        else {
          t = R(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Hl.get(o)) && Hd(t, n);
          var E = m = l.createElement("link");
          an(E), yn(E, "link", t), E._p = new Promise(function(N, X) {
            E.onload = N, E.onerror = X;
          }), E.addEventListener("load", function() {
            y.loading |= 1;
          }), E.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, bc(m, e, l);
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
  function hb(t, e) {
    Yi.X(t, e);
    var n = ar;
    if (n && t) {
      var l = xu(n).hoistableScripts, r = rr(t), o = l.get(r);
      o || (o = n.querySelector(ys(r)), o || (t = R({ src: t, async: !0 }, e), (e = Hl.get(r)) && Yd(t, e), o = n.createElement("script"), an(o), yn(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(r, o));
    }
  }
  function db(t, e) {
    Yi.M(t, e);
    var n = ar;
    if (n && t) {
      var l = xu(n).hoistableScripts, r = rr(t), o = l.get(r);
      o || (o = n.querySelector(ys(r)), o || (t = R({ src: t, async: !0, type: "module" }, e), (e = Hl.get(r)) && Yd(t, e), o = n.createElement("script"), an(o), yn(o, "link", t), n.head.appendChild(o)), o = {
        type: "script",
        instance: o,
        count: 1,
        state: null
      }, l.set(r, o));
    }
  }
  function $_(t, e, n, l) {
    var r = (r = At.current) ? _s(r) : null;
    if (!r) throw Error(a(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = ur(n.href), e = xu(
          r
        ).hoistableStyles, l = e.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = ur(n.href);
          var o = xu(
            r
          ).hoistableStyles, m = o.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, o.set(t, m), (o = r.querySelector(
            vs(t)
          )) ? o._p || (m.instance = o, m.state.loading = 5) : (o = Hl.get(t), o || (o = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Hl.set(t, o)), mb(
            r,
            t,
            o,
            m.state
          ))), e && l === null)
            throw Error(a(528, ""));
          return m;
        }
        if (e && l !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = rr(n), e = xu(
          r
        ).hoistableScripts, l = e.get(n), l || (l = {
          type: "script",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      default:
        throw Error(a(444, t));
    }
  }
  function ur(t) {
    return 'href="' + zl(t) + '"';
  }
  function vs(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function I_(t) {
    return R({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function mb(t, e, n, l) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[oo] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[oo] = !0, e.onload = e.onerror = cm.bind(null, e), yn(e, "link", n), an(e), t.head.appendChild(e);
    l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function rr(t) {
    return '[src="' + zl(t) + '"]';
  }
  function ys(t) {
    return "script[async]" + t;
  }
  function tv(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + zl(n.href) + '"]'
          );
          if (l)
            return e.instance = l, an(l), l;
          var r = R({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), an(l), yn(l, "style", r), bc(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          r = ur(n.href);
          var o = t.querySelector(
            vs(r)
          );
          if (o)
            return e.state.loading |= 4, e.instance = o, an(o), o;
          l = I_(n), (r = Hl.get(r)) && Hd(l, r), o = (t.ownerDocument || t).createElement("link"), an(o);
          var m = o;
          return m._p = new Promise(function(y, E) {
            m.onload = y, m.onerror = E;
          }), yn(o, "link", l), e.state.loading |= 4, bc(o, n.precedence, t), e.instance = o;
        case "script":
          return o = rr(n.src), (r = t.querySelector(
            ys(o)
          )) ? (e.instance = r, an(r), r) : (l = n, (r = Hl.get(o)) && (l = R({}, n), Yd(l, r)), t = t.ownerDocument || t, r = t.createElement("script"), an(r), yn(r, "link", l), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(a(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, bc(l, n.precedence, t));
    return e.instance;
  }
  function bc(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = l.length ? l[l.length - 1] : null, o = r, m = 0; m < l.length; m++) {
      var y = l[m];
      if (y.dataset.precedence === e) o = y;
      else if (o !== r) break;
    }
    o ? o.parentNode.insertBefore(t, o.nextSibling) : (e = n.nodeType === 9 ? n.head : n, e.insertBefore(t, e.firstChild));
  }
  function Hd(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.title == null && (t.title = e.title);
  }
  function Yd(t, e) {
    t.crossOrigin == null && (t.crossOrigin = e.crossOrigin), t.referrerPolicy == null && (t.referrerPolicy = e.referrerPolicy), t.integrity == null && (t.integrity = e.integrity);
  }
  var Tc = null;
  function ev(t, e, n) {
    if (Tc === null) {
      var l = /* @__PURE__ */ new Map(), r = Tc = /* @__PURE__ */ new Map();
      r.set(n, l);
    } else
      r = Tc, l = r.get(n), l || (l = /* @__PURE__ */ new Map(), r.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), r = 0; r < n.length; r++) {
      var o = n[r];
      if (!(o[Ur] || o[Qe] || t === "link" && o.getAttribute("rel") === "stylesheet") && o.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = o.getAttribute(e) || "";
        m = t + m;
        var y = l.get(m);
        y ? y.push(o) : l.set(m, [o]);
      }
    }
    return l;
  }
  function Bd(t, e, n) {
    t = t.ownerDocument || t, t.head.insertBefore(
      n,
      e === "title" ? t.querySelector("head > title") : null
    );
  }
  function gb(t, e, n) {
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
  function nv(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function lv(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function iv(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function av(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += iv(e), t.suspenseyImages.push(e)), t = vb.bind(t), e.decode().then(t, t));
  }
  function pb(t, e, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = ur(l.href), o = e.querySelector(
          vs(r)
        );
        if (o) {
          e = o._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Ss.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = o, an(o);
          return;
        }
        o = e.ownerDocument || e, l = I_(l), (r = Hl.get(r)) && Hd(l, r), o = o.createElement("link"), an(o);
        var m = o;
        m._p = new Promise(function(y, E) {
          m.onload = y, m.onerror = E;
        }), yn(o, "link", l), n.instance = o;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = Ss.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var Ec = 0;
  function _b(t, e) {
    return t.stylesheets && t.count === 0 && Mc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (t.stylesheets && Mc(t, t.stylesheets), t.unsuspend) {
          var o = t.unsuspend;
          t.unsuspend = null, o();
        }
      }, 6e4 + e);
      0 < t.imgBytes && Ec === 0 && (Ec = 62500 * H2());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Mc(t, t.stylesheets), t.unsuspend)) {
            var o = t.unsuspend;
            t.unsuspend = null, o();
          }
        },
        (t.imgBytes > Ec ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(r);
      };
    } : null;
  }
  function uv(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Mc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Ss() {
    this.count--, uv(this);
  }
  function vb() {
    this.imgCount--, uv(this);
  }
  var xc = null;
  function Mc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, xc = /* @__PURE__ */ new Map(), e.forEach(yb, t), xc = null, Ss.call(t));
  }
  function yb(t, e) {
    if (!(e.state.loading & 4)) {
      var n = xc.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), xc.set(t, n);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), o = 0; o < r.length; o++) {
          var m = r[o];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), l = m);
        }
        l && n.set(null, l);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), o = n.get(m) || l, o === l && n.set(null, r), n.set(m, r), this.count++, l = Ss.bind(this), r.addEventListener("load", l), r.addEventListener("error", l), o ? o.parentNode.insertBefore(r, o.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
    }
  }
  var sr = {
    $$typeof: et,
    Provider: null,
    Consumer: null,
    _currentValue: Tt,
    _currentValue2: Tt,
    _threadCount: 0
  };
  function Sb(t, e, n, l, r, o, m, y, E) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = dn(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = dn(0), this.hiddenUpdates = dn(null), this.identifierPrefix = l, this.onUncaughtError = r, this.onCaughtError = o, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = E, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function rv(t, e, n, l, r, o, m, y, E, N, X, W) {
    return t = new Sb(
      t,
      e,
      n,
      m,
      E,
      N,
      X,
      W,
      y
    ), e = 1, o === !0 && (e |= 24), o = Zn(3, null, null, e), t.current = o, o.stateNode = t, e = $f(), e.refCount++, t.pooledCache = e, e.refCount++, o.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, nh(o), t;
  }
  function sv(t) {
    return t ? (t = Uu, t) : Uu;
  }
  function ov(t, e, n, l, r, o) {
    r = sv(r), l.context === null ? l.context = r : l.pendingContext = r, l = ta(e), l.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (l.callback = o), n = ea(t, l, e), n !== null && (Fn(n, t, e), Wr(n, t, e));
  }
  function cv(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Ld(t, e) {
    cv(t, e), (t = t.alternate) && cv(t, e);
  }
  function fv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Xa(t, 67108864);
      e !== null && Fn(e, t, 67108864), Ld(t, 67108864);
    }
  }
  function hv(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = dl();
      e = Qi(e);
      var n = Xa(t, e);
      n !== null && Fn(n, t, e), Ld(t, e);
    }
  }
  var or = !0;
  function bb(t, e, n, l) {
    var r = it.T;
    it.T = null;
    var o = ct.p;
    try {
      ct.p = 2, qd(t, e, n, l);
    } finally {
      ct.p = o, it.T = r;
    }
  }
  function Tb(t, e, n, l) {
    var r = it.T;
    it.T = null;
    var o = ct.p;
    try {
      ct.p = 8, qd(t, e, n, l);
    } finally {
      ct.p = o, it.T = r;
    }
  }
  function qd(t, e, n, l) {
    if (or) {
      var r = Xd(l);
      if (r === null)
        Sd(
          t,
          e,
          l,
          Oc,
          n
        ), mv(t, l);
      else if (xb(
        r,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (mv(t, l), e & 4 && -1 < Eb.indexOf(t)) {
        for (; r !== null; ) {
          var o = Eu(r);
          if (o !== null)
            switch (o.tag) {
              case 3:
                if (o = o.stateNode, o.current.memoizedState.isDehydrated) {
                  var m = ze(o.pendingLanes);
                  if (m !== 0) {
                    var y = o;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var E = 1 << 31 - at(m);
                      y.entanglements[1] |= E, m &= ~E;
                    }
                    fi(o), (ie & 6) === 0 && (fc = wt() + 500, ds(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = Xa(o, 2), y !== null && Fn(y, o, 2), mc(), Ld(o, 2);
            }
          if (o = Xd(l), o === null && Sd(
            t,
            e,
            l,
            Oc,
            n
          ), o === r) break;
          r = o;
        }
        r !== null && l.stopPropagation();
      } else
        Sd(
          t,
          e,
          l,
          null,
          n
        );
    }
  }
  function Xd(t) {
    return t = Mf(t), Gd(t);
  }
  var Oc = null;
  function Gd(t) {
    if (Oc = null, t = Ya(t), t !== null) {
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
    return Oc = t, null;
  }
  function dv(t) {
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
        switch (Si()) {
          case jn:
            return 2;
          case Qn:
            return 8;
          case xn:
          case bi:
            return 32;
          case Ti:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Vd = !1, da = null, ma = null, ga = null, bs = /* @__PURE__ */ new Map(), Ts = /* @__PURE__ */ new Map(), pa = [], Eb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function mv(t, e) {
    switch (t) {
      case "focusin":
      case "focusout":
        da = null;
        break;
      case "dragenter":
      case "dragleave":
        ma = null;
        break;
      case "mouseover":
      case "mouseout":
        ga = null;
        break;
      case "pointerover":
      case "pointerout":
        bs.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ts.delete(e.pointerId);
    }
  }
  function Es(t, e, n, l, r, o) {
    return t === null || t.nativeEvent !== o ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: o,
      targetContainers: [r]
    }, e !== null && (e = Eu(e), e !== null && fv(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function xb(t, e, n, l, r) {
    switch (e) {
      case "focusin":
        return da = Es(
          da,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "dragenter":
        return ma = Es(
          ma,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "mouseover":
        return ga = Es(
          ga,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "pointerover":
        var o = r.pointerId;
        return bs.set(
          o,
          Es(
            bs.get(o) || null,
            t,
            e,
            n,
            l,
            r
          )
        ), !0;
      case "gotpointercapture":
        return o = r.pointerId, Ts.set(
          o,
          Es(
            Ts.get(o) || null,
            t,
            e,
            n,
            l,
            r
          )
        ), !0;
    }
    return !1;
  }
  function gv(t) {
    var e = Ya(t.target);
    if (e !== null) {
      var n = c(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, al(t.priority, function() {
              hv(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = d(n), e !== null) {
            t.blockedOn = e, al(t.priority, function() {
              hv(n);
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
  function zc(t) {
    if (t.blockedOn !== null) return !1;
    for (var e = t.targetContainers; 0 < e.length; ) {
      var n = Xd(t.nativeEvent);
      if (n === null) {
        n = t.nativeEvent;
        var l = new n.constructor(
          n.type,
          n
        );
        xf = l, n.target.dispatchEvent(l), xf = null;
      } else
        return e = Eu(n), e !== null && fv(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function pv(t, e, n) {
    zc(t) && n.delete(e);
  }
  function Mb() {
    Vd = !1, da !== null && zc(da) && (da = null), ma !== null && zc(ma) && (ma = null), ga !== null && zc(ga) && (ga = null), bs.forEach(pv), Ts.forEach(pv);
  }
  function Ac(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Vd || (Vd = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Mb
    )));
  }
  var wc = null;
  function _v(t) {
    wc !== t && (wc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        wc === t && (wc = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], r = t[e + 2];
          if (typeof l != "function") {
            if (Gd(l || n) === null)
              continue;
            break;
          }
          var o = Eu(n);
          o !== null && (t.splice(e, 3), e -= 3, Eh(
            o,
            {
              pending: !0,
              data: r,
              method: n.method,
              action: l
            },
            l,
            r
          ));
        }
      }
    ));
  }
  function cr(t) {
    function e(E) {
      return Ac(E, t);
    }
    da !== null && Ac(da, t), ma !== null && Ac(ma, t), ga !== null && Ac(ga, t), bs.forEach(e), Ts.forEach(e);
    for (var n = 0; n < pa.length; n++) {
      var l = pa[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < pa.length && (n = pa[0], n.blockedOn === null); )
      gv(n), n.blockedOn === null && pa.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var r = n[l], o = n[l + 1], m = r[Ze] || null;
        if (typeof o == "function")
          m || _v(n);
        else if (m) {
          var y = null;
          if (o && o.hasAttribute("formAction")) {
            if (r = o, m = o[Ze] || null)
              y = m.formAction;
            else if (Gd(r) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? n[l + 1] = y : (n.splice(l, 3), l -= 3), _v(n);
        }
      }
  }
  function vv() {
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
      r !== null && (r(), r = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var o = navigation.currentEntry;
        o && o.url != null && navigation.navigate(o.url, {
          state: o.getState(),
          info: "react-transition",
          history: "replace"
        });
      }
    }
    if (typeof navigation == "object") {
      var l = !1, r = null;
      return navigation.addEventListener("navigate", t), navigation.addEventListener("navigatesuccess", e), navigation.addEventListener("navigateerror", e), setTimeout(n, 100), function() {
        l = !0, navigation.removeEventListener("navigate", t), navigation.removeEventListener("navigatesuccess", e), navigation.removeEventListener("navigateerror", e), r !== null && (r(), r = null);
      };
    }
  }
  function jd(t) {
    this._internalRoot = t;
  }
  Cc.prototype.render = jd.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(a(409));
    var n = e.current, l = dl();
    ov(n, l, t, e, null, null);
  }, Cc.prototype.unmount = jd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      ov(t.current, 2, null, t, null, null), mc(), e[mn] = null;
    }
  };
  function Cc(t) {
    this._internalRoot = t;
  }
  Cc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = He();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < pa.length && e !== 0 && e < pa[n].priority; n++) ;
      pa.splice(n, 0, t), n === 0 && gv(t);
    }
  };
  var yv = i.version;
  if (yv !== "19.3.1")
    throw Error(
      a(
        527,
        yv,
        "19.3.1"
      )
    );
  ct.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(a(188)) : (t = Object.keys(t).join(","), Error(a(268, t)));
    return t = _(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
  };
  var Ob = {
    bundleType: 0,
    version: "19.3.1",
    rendererPackageName: "react-dom",
    currentDispatcherRef: it,
    reconcilerVersion: "19.3.1"
  };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Rc = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Rc.isDisabled && Rc.supportsFiber)
      try {
        Dt = Rc.inject(
          Ob
        ), St = Rc;
      } catch {
      }
  }
  return Ms.createRoot = function(t, e) {
    if (!s(t)) throw Error(a(299));
    var n = !1, l = "", r = sp, o = op, m = cp;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (o = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = rv(
      t,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      r,
      o,
      m,
      vv
    ), t[mn] = e.current, yd(t), new jd(e);
  }, Ms.hydrateRoot = function(t, e, n) {
    if (!s(t)) throw Error(a(299));
    var l = !1, r = "", o = sp, m = op, y = cp, E = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (o = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (E = n.formState)), e = rv(
      t,
      1,
      !0,
      e,
      n ?? null,
      l,
      r,
      E,
      o,
      m,
      y,
      vv
    ), e.context = sv(null), n = e.current, l = dl(), l = Qi(l), r = ta(l), r.callback = null, ea(n, r, l), n = l, e.current.lanes = n, Mn(e, n), fi(e), t[mn] = e.current, yd(t), new Cc(e);
  }, Ms.version = "19.3.1", Ms;
}
var wv;
function Hb() {
  if (wv) return Kd.exports;
  wv = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (i) {
        console.error(i);
      }
  }
  return f(), Kd.exports = Ub(), Kd.exports;
}
var Yb = Hb(), Bb = y1(), Cv = "1.3.27";
function S1(f, i, u) {
  return Math.max(f, Math.min(i, u));
}
function Lb(f, i, u) {
  return (1 - u) * f + u * i;
}
function qb(f, i, u, a) {
  return Lb(f, i, 1 - Math.exp(-u * a));
}
function Xb(f, i) {
  return (f % i + i) % i;
}
var Gb = class {
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
    let i = !1;
    if (this.duration && this.easing) {
      this.currentTime += f;
      const u = S1(0, this.currentTime / this.duration, 1);
      i = u >= 1;
      const a = i ? 1 : this.easing(u);
      this.value = this.from + (this.to - this.from) * a;
    } else this.lerp ? (this.value = qb(this.value, this.to, this.lerp * 60, f), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
    i && this.stop(), this.onUpdate?.(this.value, i);
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
  fromTo(f, i, { lerp: u, duration: a, easing: s, onStart: c, onUpdate: h }) {
    this.from = this.value = f, this.to = i, this.lerp = u, this.duration = a, this.easing = s, this.currentTime = 0, this.isRunning = !0, c?.(), this.onUpdate = h;
  }
};
function Vb(f, i) {
  let u;
  return function(...a) {
    clearTimeout(u), u = setTimeout(() => {
      u = void 0, f.apply(this, a);
    }, i);
  };
}
var jb = class {
  width = 0;
  height = 0;
  scrollHeight = 0;
  scrollWidth = 0;
  debouncedResize;
  wrapperResizeObserver;
  contentResizeObserver;
  constructor(f, i, { autoResize: u = !0, debounce: a = 250 } = {}) {
    this.wrapper = f, this.content = i, u && (this.debouncedResize = Vb(this.resize, a), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
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
}, b1 = class {
  events = {};
  /**
  * Emit an event with the given data
  * @param event Event name
  * @param args Data to pass to the event handlers
  */
  emit(f, ...i) {
    const u = this.events[f] || [];
    for (let a = 0, s = u.length; a < s; a++) u[a]?.(...i);
  }
  /**
  * Add a callback to the event
  * @param event Event name
  * @param cb Callback function
  * @returns Unsubscribe function
  */
  on(f, i) {
    return this.events[f] ? this.events[f].push(i) : this.events[f] = [i], () => {
      this.events[f] = this.events[f]?.filter((u) => i !== u);
    };
  }
  /**
  * Remove a callback from the event
  * @param event Event name
  * @param callback Callback function
  */
  off(f, i) {
    this.events[f] = this.events[f]?.filter((u) => i !== u);
  }
  /**
  * Remove all event listeners and clean up
  */
  destroy() {
    this.events = {};
  }
};
const Qb = 100 / 6, va = { passive: !1 };
function Rv(f, i) {
  return f === 1 ? Qb : f === 2 ? i : 1;
}
var Zb = class {
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
  emitter = new b1();
  constructor(f, i = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = f, this.options = i, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, va), this.element.addEventListener("touchstart", this.onTouchStart, va), this.element.addEventListener("touchmove", this.onTouchMove, va), this.element.addEventListener("touchend", this.onTouchEnd, va);
  }
  /**
  * Add an event listener for the given event and callback
  *
  * @param event Event name
  * @param callback Callback function
  */
  on(f, i) {
    return this.emitter.on(f, i);
  }
  /** Remove all event listeners and clean up */
  destroy() {
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, va), this.element.removeEventListener("touchstart", this.onTouchStart, va), this.element.removeEventListener("touchmove", this.onTouchMove, va), this.element.removeEventListener("touchend", this.onTouchEnd, va);
  }
  /**
  * Event handler for 'touchstart' event
  *
  * @param event Touch event
  */
  onTouchStart = (f) => {
    const { clientX: i, clientY: u } = f.targetTouches ? f.targetTouches[0] : f;
    this.touchStart.x = i, this.touchStart.y = u, this.lastDelta = {
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
    const { clientX: i, clientY: u } = f.targetTouches ? f.targetTouches[0] : f, a = -(i - this.touchStart.x) * this.options.touchMultiplier, s = -(u - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = i, this.touchStart.y = u, this.lastDelta = {
      x: a,
      y: s
    }, this.emitter.emit("scroll", {
      deltaX: a,
      deltaY: s,
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
    let { deltaX: i, deltaY: u, deltaMode: a } = f;
    const s = Rv(a, this.window.width), c = Rv(a, this.window.height);
    i *= s, u *= c, i *= this.options.wheelMultiplier, u *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
      deltaX: i,
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
const Dv = (f) => Math.min(1, 1.001 - 2 ** (-10 * f));
var Kb = class {
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
  animate = new Gb();
  emitter = new b1();
  dimensions;
  virtualScroll;
  constructor({ wrapper: f = window, content: i = document.documentElement, eventsTarget: u = f, smoothWheel: a = !0, syncTouch: s = !1, syncTouchLerp: c = 0.075, touchInertiaExponent: h = 1.7, duration: d, easing: g, lerp: _ = 0.1, infinite: p = !1, orientation: v = "vertical", gestureOrientation: S = v === "horizontal" ? "both" : "vertical", touchMultiplier: b = 1, wheelMultiplier: M = 1, autoResize: T = !0, prevent: w, virtualScroll: G, overscroll: q = !0, autoRaf: Z = !1, anchors: B = !1, autoToggle: j = !1, allowNestedScroll: k = !1, __experimental__naiveDimensions: R = !1, naiveDimensions: Q = R, stopInertiaOnNavigate: $ = !1, respectReducedMotion: V = !0 } = {}) {
    window.lenisVersion = Cv, window.lenis || (window.lenis = {}), window.lenis.version = Cv, v === "horizontal" && (window.lenis.horizontal = !0), s === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!f || f === document.documentElement) && (f = window), typeof d == "number" && typeof g != "function" ? g = Dv : typeof g == "function" && typeof d != "number" && (d = 1), this.options = {
      wrapper: f,
      content: i,
      eventsTarget: u,
      smoothWheel: a,
      syncTouch: s,
      syncTouchLerp: c,
      touchInertiaExponent: h,
      duration: d,
      easing: g,
      lerp: _,
      infinite: p,
      gestureOrientation: S,
      orientation: v,
      touchMultiplier: b,
      wheelMultiplier: M,
      autoResize: T,
      prevent: w,
      virtualScroll: G,
      overscroll: q,
      autoRaf: Z,
      anchors: B,
      autoToggle: j,
      allowNestedScroll: k,
      naiveDimensions: Q,
      stopInertiaOnNavigate: $,
      respectReducedMotion: V
    }, this.dimensions = new jb(f, i, { autoResize: T }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new Zb(u, {
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
  on(f, i) {
    return this.emitter.on(f, i);
  }
  off(f, i) {
    return this.emitter.off(f, i);
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
    const i = f.composedPath().filter((a) => a instanceof HTMLAnchorElement && a.href).map((a) => new URL(a.href)), u = new URL(window.location.href);
    if (this.options.anchors) {
      const a = i.find((s) => u.host === s.host && u.pathname === s.pathname && s.hash);
      if (a) {
        const s = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, c = decodeURIComponent(a.hash);
        this.scrollTo(c, s);
        return;
      }
    }
    if (this.options.stopInertiaOnNavigate && i.some((a) => u.host === a.host && u.pathname !== a.pathname)) {
      this.reset();
      return;
    }
  };
  onPointerDown = (f) => {
    f.button === 1 && this.reset();
  };
  isTouchOnSelectionHandle(f) {
    const i = window.getSelection();
    if (!i || i.isCollapsed || i.rangeCount === 0) return !1;
    const u = f.targetTouches[0] ?? f.changedTouches[0];
    if (!u) return !1;
    const a = i.getRangeAt(0).getClientRects();
    if (a.length === 0) return !1;
    const s = a[0], c = a[a.length - 1], h = 40, d = Math.hypot(u.clientX - s.left, u.clientY - s.top) <= h, g = Math.hypot(u.clientX - c.right, u.clientY - c.bottom) <= h;
    return d || g;
  }
  onVirtualScroll = (f) => {
    if (typeof this.options.virtualScroll == "function" && this.options.virtualScroll(f) === !1) return;
    const { deltaX: i, deltaY: u, event: a } = f;
    if (this.emitter.emit("virtual-scroll", {
      deltaX: i,
      deltaY: u,
      event: a
    }), a.ctrlKey || a.lenisStopPropagation) return;
    const s = a.type.includes("touch"), c = a.type.includes("wheel");
    if (s && this.isIos && (a.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(a)), this._isDraggingSelection)) {
      a.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = a.type === "touchstart" || a.type === "touchmove";
    const h = i === 0 && u === 0;
    if (this.options.syncTouch && s && a.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const d = this.options.gestureOrientation === "vertical" && u === 0 || this.options.gestureOrientation === "horizontal" && i === 0;
    if (h || d) return;
    let g = a.composedPath();
    g = g.slice(0, g.indexOf(this.rootElement));
    const _ = this.options.prevent, p = Math.abs(i) >= Math.abs(u) ? "horizontal" : "vertical";
    if (g.find((M) => M instanceof HTMLElement && (typeof _ == "function" && _?.(M) || M.hasAttribute?.("data-lenis-prevent") || p === "vertical" && M.hasAttribute?.("data-lenis-prevent-vertical") || p === "horizontal" && M.hasAttribute?.("data-lenis-prevent-horizontal") || s && M.hasAttribute?.("data-lenis-prevent-touch") || c && M.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(M, {
      deltaX: i,
      deltaY: u
    })))) return;
    if (this.isStopped || this.isLocked) {
      a.cancelable && a.preventDefault();
      return;
    }
    if (!(this.options.syncTouch && s || this.options.smoothWheel && c)) {
      this.isScrolling = "native", this.animate.stop(), a.lenisStopPropagation = !0;
      return;
    }
    let v = u;
    this.options.gestureOrientation === "both" ? v = Math.abs(u) > Math.abs(i) ? u : i : this.options.gestureOrientation === "horizontal" && (v = i), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && u > 0 || this.animatedScroll === this.limit && u < 0)) && (a.lenisStopPropagation = !0), a.cancelable && a.preventDefault();
    const S = s && this.options.syncTouch, b = s && a.type === "touchend";
    b && (v = Math.sign(v) * Math.abs(this.velocity) ** this.options.touchInertiaExponent), this.scrollTo(this.targetScroll + v, {
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
    const i = f - (this.time || f);
    this.time = f, this.animate.advance(i * 1e-3), this.options.autoRaf && (this._rafId = requestAnimationFrame(this.raf));
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
  scrollTo(f, { offset: i = 0, immediate: u = !1, lock: a = !1, programmatic: s = !0, lerp: c = s ? this.options.lerp : void 0, duration: h = s ? this.options.duration : void 0, easing: d = s ? this.options.easing : void 0, onStart: g, onComplete: _, force: p = !1, userData: v } = {}) {
    if (this.prefersReducedMotion && (s ? u = !0 : (c = 1, h = void 0, d = void 0)), (this.isStopped || this.isLocked) && !p) return;
    let S = f, b = i;
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
          const B = this.rootElement.getBoundingClientRect();
          b -= this.isHorizontal ? B.left : B.top;
        }
        const T = M.getBoundingClientRect(), w = getComputedStyle(M), G = this.isHorizontal ? Number.parseFloat(w.scrollMarginLeft) : Number.parseFloat(w.scrollMarginTop), q = getComputedStyle(this.rootElement), Z = this.isHorizontal ? Number.parseFloat(q.scrollPaddingLeft) : Number.parseFloat(q.scrollPaddingTop);
        S = (this.isHorizontal ? T.left : T.top) + this.animatedScroll - (Number.isNaN(G) ? 0 : G) - (Number.isNaN(Z) ? 0 : Z);
      }
    }
    if (typeof S == "number") {
      if (S += b, this.options.infinite) {
        if (s) {
          this.targetScroll = this.animatedScroll = this.scroll;
          const M = S - this.animatedScroll;
          M > this.limit / 2 ? S -= this.limit : M < -this.limit / 2 && (S += this.limit);
        }
      } else S = S1(0, S, this.limit);
      if (S === this.targetScroll) {
        g?.(this), _?.(this);
        return;
      }
      if (this.userData = v ?? {}, u) {
        this.animatedScroll = this.targetScroll = S, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), _?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      s || (this.targetScroll = S), typeof h == "number" && typeof d != "function" ? d = Dv : typeof d == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, S, {
        duration: h,
        easing: d,
        lerp: c,
        onStart: () => {
          a && (this.isLocked = !0), this.isScrolling = "smooth", g?.(this);
        },
        onUpdate: (M, T) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = M - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = M, this.setScroll(this.scroll), s && (this.targetScroll = M), T || this.emit(), T && (this.reset(), this.emit(), _?.(this), this.userData = {}, requestAnimationFrame(() => {
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
  hasNestedScroll(f, { deltaX: i, deltaY: u }) {
    const a = Date.now();
    f._lenis || (f._lenis = {});
    const s = f._lenis;
    let c, h, d, g, _, p, v, S, b, M;
    if (a - (s.time ?? 0) > 2e3) {
      s.time = Date.now();
      const k = window.getComputedStyle(f);
      if (s.computedStyle = k, c = [
        "auto",
        "overlay",
        "scroll"
      ].includes(k.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(k.overflowY), _ = ["auto"].includes(k.overscrollBehaviorX), p = ["auto"].includes(k.overscrollBehaviorY), s.hasOverflowX = c, s.hasOverflowY = h, !(c || h)) return !1;
      v = f.scrollWidth, S = f.scrollHeight, b = f.clientWidth, M = f.clientHeight, d = v > b, g = S > M, s.isScrollableX = d, s.isScrollableY = g, s.scrollWidth = v, s.scrollHeight = S, s.clientWidth = b, s.clientHeight = M, s.hasOverscrollBehaviorX = _, s.hasOverscrollBehaviorY = p;
    } else
      d = s.isScrollableX, g = s.isScrollableY, c = s.hasOverflowX, h = s.hasOverflowY, v = s.scrollWidth, S = s.scrollHeight, b = s.clientWidth, M = s.clientHeight, _ = s.hasOverscrollBehaviorX, p = s.hasOverscrollBehaviorY;
    if (!(c && d || h && g)) return !1;
    const T = Math.abs(i) >= Math.abs(u) ? "horizontal" : "vertical";
    let w, G, q, Z, B, j;
    if (T === "horizontal")
      w = Math.round(f.scrollLeft), G = v - b, q = i, Z = c, B = d, j = _;
    else if (T === "vertical")
      w = Math.round(f.scrollTop), G = S - M, q = u, Z = h, B = g, j = p;
    else return !1;
    return !j && (w >= G || w <= 0) ? !0 : (q > 0 ? w < G : w > 0) && Z && B;
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
    return this.options.infinite ? Xb(this.animatedScroll, this.limit) : this.animatedScroll;
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
function Bi(f) {
  if (f === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return f;
}
function T1(f, i) {
  f.prototype = Object.create(i.prototype), f.prototype.constructor = f, f.__proto__ = i;
}
var Tl = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, Ws = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, Y0, Tn, we, ql = 1e8, pe = 1 / ql, h0 = Math.PI * 2, Jb = h0 / 4, kb = 0, E1 = Math.sqrt, Fb = Math.cos, Pb = Math.sin, fn = function(i) {
  return typeof i == "string";
}, Le = function(i) {
  return typeof i == "function";
}, Vi = function(i) {
  return typeof i == "number";
}, B0 = function(i) {
  return typeof i > "u";
}, vi = function(i) {
  return typeof i == "object";
}, In = function(i) {
  return i !== !1;
}, L0 = function() {
  return typeof window < "u";
}, Dc = function(i) {
  return Le(i) || fn(i);
}, x1 = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Rn = Array.isArray, Wb = /random\([^)]+\)/g, $b = /,\s*/g, Nv = /(?:-?\.?\d|\.)+/gi, M1 = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, _r = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, Pd = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, O1 = /[+-]=-?[.\d]+/, Ib = /[^,'"\[\]\s]+/gi, tT = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Ne, hi, d0, q0, El = {}, nf = {}, z1, A1 = function(i) {
  return (nf = zr(i, El)) && ll;
}, X0 = function(i, u) {
  return console.warn("Invalid property", i, "set to", u, "Missing plugin? gsap.registerPlugin()");
}, $s = function(i, u) {
  return !u && console.warn(i);
}, w1 = function(i, u) {
  return i && (El[i] = u) && nf && (nf[i] = u) || El;
}, Is = function() {
  return 0;
}, eT = {
  suppressEvents: !0,
  isStart: !0,
  kill: !1
}, Kc = {
  suppressEvents: !0,
  kill: !1
}, nT = {
  suppressEvents: !0
}, G0 = {}, Oa = [], m0 = {}, C1, _l = {}, Wd = {}, Uv = 30, Jc = [], V0 = "", j0 = function(i) {
  var u = i[0], a, s;
  if (vi(u) || Le(u) || (i = [i]), !(a = (u._gsap || {}).harness)) {
    for (s = Jc.length; s-- && !Jc[s].targetTest(u); )
      ;
    a = Jc[s];
  }
  for (s = i.length; s--; )
    i[s] && (i[s]._gsap || (i[s]._gsap = new $1(i[s], a))) || i.splice(s, 1);
  return i;
}, fu = function(i) {
  return i._gsap || j0(Xl(i))[0]._gsap;
}, R1 = function(i, u, a) {
  return (a = i[u]) && Le(a) ? i[u]() : B0(a) && i.getAttribute && i.getAttribute(u) || a;
}, tl = function(i, u) {
  return (i = i.split(",")).forEach(u) || i;
}, Xe = function(i) {
  return Math.round(i * 1e5) / 1e5 || 0;
}, De = function(i) {
  return Math.round(i * 1e7) / 1e7 || 0;
}, Sr = function(i, u) {
  var a = u.charAt(0), s = parseFloat(u.substr(2));
  return i = parseFloat(i), a === "+" ? i + s : a === "-" ? i - s : a === "*" ? i * s : i / s;
}, lT = function(i, u) {
  for (var a = u.length, s = 0; i.indexOf(u[s]) < 0 && ++s < a; )
    ;
  return s < a;
}, lf = function() {
  var i = Oa.length, u = Oa.slice(0), a, s;
  for (m0 = {}, Oa.length = 0, a = 0; a < i; a++)
    s = u[a], s && s._lazy && (s.render(s._lazy[0], s._lazy[1], !0)._lazy = 0);
}, Q0 = function(i) {
  return !!(i._initted || i._startAt || i.add);
}, D1 = function(i, u, a, s) {
  Oa.length && !Tn && lf(), i.render(u, a, !!(Tn && u < 0 && Q0(i))), Oa.length && !Tn && lf();
}, N1 = function(i) {
  var u = parseFloat(i);
  return (u || u === 0) && (i + "").match(Ib).length < 2 ? u : fn(i) ? i.trim() : i;
}, U1 = function(i) {
  return i;
}, xl = function(i, u) {
  for (var a in u)
    a in i || (i[a] = u[a]);
  return i;
}, iT = function(i) {
  return function(u, a) {
    for (var s in a)
      s in u || s === "duration" && i || s === "ease" || (u[s] = a[s]);
  };
}, zr = function(i, u) {
  for (var a in u)
    i[a] = u[a];
  return i;
}, Hv = function f(i, u) {
  for (var a in u)
    a !== "__proto__" && a !== "constructor" && a !== "prototype" && (i[a] = vi(u[a]) ? f(i[a] || (i[a] = {}), u[a]) : u[a]);
  return i;
}, af = function(i, u) {
  var a = {}, s;
  for (s in i)
    s in u || (a[s] = i[s]);
  return a;
}, Xs = function(i) {
  var u = i.parent || Ne, a = i.keyframes ? iT(Rn(i.keyframes)) : xl;
  if (In(i.inherit))
    for (; u; )
      a(i, u.vars.defaults), u = u.parent || u._dp;
  return i;
}, aT = function(i, u) {
  for (var a = i.length, s = a === u.length; s && a-- && i[a] === u[a]; )
    ;
  return a < 0;
}, H1 = function(i, u, a, s, c) {
  var h = i[s], d;
  if (c)
    for (d = u[c]; h && h[c] > d; )
      h = h._prev;
  return h ? (u._next = h._next, h._next = u) : (u._next = i[a], i[a] = u), u._next ? u._next._prev = u : i[s] = u, u._prev = h, u.parent = u._dp = i, u;
}, pf = function(i, u, a, s) {
  a === void 0 && (a = "_first"), s === void 0 && (s = "_last");
  var c = u._prev, h = u._next;
  c ? c._next = h : i[a] === u && (i[a] = h), h ? h._prev = c : i[s] === u && (i[s] = c), u._next = u._prev = u.parent = null;
}, Ca = function(i, u) {
  i.parent && (!u || i.parent.autoRemoveChildren) && i.parent.remove && i.parent.remove(i), i._act = 0;
}, hu = function(i, u) {
  if (i && (!u || u._end > i._dur || u._start < 0))
    for (var a = i; a; )
      a._dirty = 1, a = a.parent;
  return i;
}, uT = function(i) {
  for (var u = i.parent; u && u.parent; )
    u._dirty = 1, u.totalDuration(), u = u.parent;
  return i;
}, g0 = function(i, u, a, s) {
  return i._startAt && (Tn ? i._startAt.revert(Kc) : i.vars.immediateRender && !i.vars.autoRevert || i._startAt.render(u, !0, s));
}, rT = function f(i) {
  return !i || i._ts && f(i.parent);
}, Yv = function(i) {
  return i._repeat ? Ar(i._tTime, i = i.duration() + i._rDelay) * i : 0;
}, Ar = function(i, u) {
  var a = Math.floor(i = De(i / u));
  return i && a === i ? a - 1 : a;
}, uf = function(i, u) {
  return (i - u._start) * u._ts + (u._ts >= 0 ? 0 : u._dirty ? u.totalDuration() : u._tDur);
}, _f = function(i) {
  return i._end = De(i._start + (i._tDur / Math.abs(i._ts || i._rts || pe) || 0));
}, vf = function(i, u) {
  var a = i._dp;
  return a && a.smoothChildTiming && i._ts && (i._start = De(a._time - (i._ts > 0 ? u / i._ts : ((i._dirty ? i.totalDuration() : i._tDur) - u) / -i._ts)), _f(i), a._dirty || hu(a, i)), i;
}, Y1 = function(i, u) {
  var a;
  if ((u._time || !u._dur && u._initted || u._start < i._time && (u._dur || !u.add)) && (a = uf(i.rawTime(), u), (!u._dur || so(0, u.totalDuration(), a) - u._tTime > pe) && u.render(a, !0)), hu(i, u)._dp && i._initted && i._time >= i._dur && i._ts) {
    if (i._dur < i.duration())
      for (a = i; a._dp; )
        a.rawTime() >= 0 && a.totalTime(a._tTime), a = a._dp;
    i._zTime = -pe;
  }
}, mi = function(i, u, a, s) {
  return u.parent && Ca(u), u._start = De((Vi(a) ? a : !a && rf(u) && (!i._last || i._last._start >= i._time) ? i._last ? i._last._start : i._time : a || i !== Ne ? Yl(i, a, u) : i._time) + u._delay), u._end = De(u._start + (u.totalDuration() / Math.abs(u.timeScale()) || 0)), H1(i, u, "_first", "_last", i._sort ? "_start" : 0), rf(u) || (i._recent = u), s || Y1(i, u), i._ts < 0 && vf(i, i._tTime), i;
}, B1 = function(i, u) {
  return (El.ScrollTrigger || X0("scrollTrigger", u)) && El.ScrollTrigger.create(u, i);
}, L1 = function(i, u, a, s, c) {
  if (K0(i, u, c), !i._initted)
    return 1;
  if (!a && i._pt && !Tn && (i._dur && i.vars.lazy !== !1 || !i._dur && i.vars.lazy) && C1 !== yl.frame)
    return Oa.push(i), i._lazy = [c, s], 1;
}, sT = function f(i) {
  var u = i.parent;
  return u && u._ts && u._initted && !u._lock && (u.rawTime() < 0 || f(u));
}, rf = function(i) {
  var u = i.data;
  return u === "isFromStart" || u === "isStart";
}, oT = function(i, u, a, s) {
  var c = i.ratio, h = u < 0 || !u && (!i._start && sT(i) && !(!i._initted && rf(i)) || (i._ts < 0 || i._dp._ts < 0) && !rf(i)) ? 0 : 1, d = i._rDelay, g = 0, _, p, v;
  if (d && i._repeat && (g = so(0, i._tDur, u), p = Ar(g, d), i._yoyo && p & 1 && (h = 1 - h), p !== Ar(i._tTime, d) && (c = 1 - h, i.vars.repeatRefresh && i._initted && i.invalidate())), h !== c || Tn || s || i._zTime === pe || !u && i._zTime) {
    if (!i._initted && L1(i, u, s, a, g))
      return;
    for (v = i._zTime, i._zTime = u || (a ? pe : 0), a || (a = u && !v), i.ratio = h, i._from && (h = 1 - h), i._time = 0, i._tTime = g, _ = i._pt; _; )
      _.r(h, _.d), _ = _._next;
    u < 0 && g0(i, u, a, !0), i._onUpdate && !a && Sl(i, "onUpdate"), g && i._repeat && !a && i.parent && Sl(i, "onRepeat"), (u >= i._tDur || u < 0) && i.ratio === h && (h && Ca(i, 1), !a && !Tn && (Sl(i, h ? "onComplete" : "onReverseComplete", !0), i._prom && i._prom()));
  } else i._zTime || (i._zTime = u);
}, cT = function(i, u, a) {
  var s;
  if (a > u)
    for (s = i._first; s && s._start <= a; ) {
      if (s.data === "isPause" && s._start > u)
        return s;
      s = s._next;
    }
  else
    for (s = i._last; s && s._start >= a; ) {
      if (s.data === "isPause" && s._start < u)
        return s;
      s = s._prev;
    }
}, wr = function(i, u, a, s) {
  var c = i._repeat, h = De(u) || 0, d = i._tTime / i._tDur;
  return d && !s && (i._time *= h / i._dur), i._dur = h, i._tDur = c ? c < 0 ? 1e10 : De(h * (c + 1) + i._rDelay * c) : h, d > 0 && !s && vf(i, i._tTime = i._tDur * d), i.parent && _f(i), a || hu(i.parent, i), i;
}, Bv = function(i) {
  return i instanceof Wn ? hu(i) : wr(i, i._dur);
}, fT = {
  _start: 0,
  endTime: Is,
  totalDuration: Is
}, Yl = function f(i, u, a) {
  var s = i.labels, c = i._recent || fT, h = i.duration() >= ql ? c.endTime(!1) : i._dur, d, g, _;
  return fn(u) && (isNaN(u) || u in s) ? (g = u.charAt(0), _ = u.substr(-1) === "%", d = u.indexOf("="), g === "<" || g === ">" ? (d >= 0 && (u = u.replace(/=/, "")), (g === "<" ? c._start : c.endTime(c._repeat >= 0)) + (parseFloat(u.substr(1)) || 0) * (_ ? (d < 0 ? c : a).totalDuration() / 100 : 1)) : d < 0 ? (u in s || (s[u] = h), s[u]) : (g = parseFloat(u.charAt(d - 1) + u.substr(d + 1)), _ && a && (g = g / 100 * (Rn(a) ? a[0] : a).totalDuration()), d > 1 ? f(i, u.substr(0, d - 1), a) + g : h + g)) : u == null ? h : +u;
}, Gs = function(i, u, a) {
  var s = Vi(u[1]), c = (s ? 2 : 1) + (i < 2 ? 0 : 1), h = u[c], d, g;
  if (s && (h.duration = u[1]), h.parent = a, i) {
    for (d = h, g = a; g && !("immediateRender" in d); )
      d = g.vars.defaults || {}, g = In(g.vars.inherit) && g.parent;
    h.immediateRender = In(d.immediateRender), i < 2 ? h.runBackwards = 1 : h.startAt = u[c - 1];
  }
  return new We(u[0], h, u[c + 1]);
}, Ua = function(i, u) {
  return i || i === 0 ? u(i) : u;
}, so = function(i, u, a) {
  return a < i ? i : a > u ? u : a;
}, wn = function(i, u) {
  return !fn(i) || !(u = tT.exec(i)) ? "" : u[1];
}, hT = function(i, u, a) {
  return Ua(a, function(s) {
    return so(i, u, s);
  });
}, p0 = [].slice, q1 = function(i, u) {
  return i && vi(i) && "length" in i && (!u && !i.length || i.length - 1 in i && vi(i[0])) && !i.nodeType && i !== hi;
}, dT = function(i, u, a) {
  return a === void 0 && (a = []), i.forEach(function(s) {
    var c;
    return fn(s) && !u || q1(s, 1) ? (c = a).push.apply(c, Xl(s)) : a.push(s);
  }) || a;
}, Xl = function(i, u, a) {
  return we && !u && we.selector ? we.selector(i) : fn(i) && !a && (d0 || !Cr()) ? p0.call((u || q0).querySelectorAll(i), 0) : Rn(i) ? dT(i, a) : q1(i) ? p0.call(i, 0) : i ? [i] : [];
}, _0 = function(i) {
  return i = Xl(i)[0] || $s("Invalid scope") || {}, function(u) {
    var a = i.current || i.nativeElement || i;
    return Xl(u, a.querySelectorAll ? a : a === i ? $s("Invalid scope") || q0.createElement("div") : i);
  };
}, X1 = function(i) {
  return i.sort(function() {
    return 0.5 - Math.random();
  });
}, G1 = function(i) {
  if (Le(i))
    return i;
  var u = vi(i) ? i : {
    each: i
  }, a = du(u.ease), s = u.from || 0, c = parseFloat(u.base) || 0, h = {}, d = s > 0 && s < 1, g = isNaN(s) || d, _ = u.axis, p = s, v = s;
  return fn(s) ? p = v = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[s] || 0 : !d && g && (p = s[0], v = s[1]), function(S, b, M) {
    var T = (M || u).length, w = h[T], G, q, Z, B, j, k, R, Q, $;
    if (!w) {
      if ($ = u.grid === "auto" ? 0 : (u.grid || [1, ql])[1], !$) {
        for (R = -ql; R < (R = M[$++].getBoundingClientRect().left) && $ < T; )
          ;
        $ < T && $--;
      }
      for (w = h[T] = [], G = g ? Math.min($, T) * p - 0.5 : s % $, q = $ === ql ? 0 : g ? T * v / $ - 0.5 : s / $ | 0, R = 0, Q = ql, k = 0; k < T; k++)
        Z = k % $ - G, B = q - (k / $ | 0), w[k] = j = _ ? Math.abs(_ === "y" ? B : Z) : E1(Z * Z + B * B), j > R && (R = j), j < Q && (Q = j);
      s === "random" && X1(w), w.max = R - Q, w.min = Q, w.v = T = (parseFloat(u.amount) || parseFloat(u.each) * ($ > T ? T - 1 : _ ? _ === "y" ? T / $ : $ : Math.max($, T / $)) || 0) * (s === "edges" ? -1 : 1), w.b = T < 0 ? c - T : c, w.u = wn(u.amount || u.each) || 0, a = a && T < 0 ? OT(a) : a;
    }
    return T = (w[S] - w.min) / w.max || 0, De(w.b + (a ? a(T) : T) * w.v) + w.u;
  };
}, v0 = function(i) {
  var u = Math.pow(10, ((i + "").split(".")[1] || "").length);
  return function(a) {
    var s = De(Math.round(parseFloat(a) / i) * i * u);
    return (s - s % 1) / u + (Vi(a) ? 0 : wn(a));
  };
}, V1 = function(i, u) {
  var a = Rn(i), s, c;
  return !a && vi(i) && (s = a = i.radius || ql, i.values ? (i = Xl(i.values), (c = !Vi(i[0])) && (s *= s)) : i = v0(i.increment)), Ua(u, a ? Le(i) ? function(h) {
    return c = i(h), Math.abs(c - h) <= s ? c : h;
  } : function(h) {
    for (var d = parseFloat(c ? h.x : h), g = parseFloat(c ? h.y : 0), _ = ql, p = 0, v = i.length, S, b; v--; )
      c ? (S = i[v].x - d, b = i[v].y - g, S = S * S + b * b) : S = Math.abs(i[v] - d), S < _ && (_ = S, p = v);
    return p = !s || _ <= s ? i[p] : h, c || p === h || Vi(h) ? p : p + wn(h);
  } : v0(i));
}, j1 = function(i, u, a, s) {
  return Ua(Rn(i) ? !u : a === !0 ? !!(a = 0) : !s, function() {
    return Rn(i) ? i[~~(Math.random() * i.length)] : (a = a || 1e-5) && (s = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) && Math.floor(Math.round((i - a / 2 + Math.random() * (u - i + a * 0.99)) / a) * a * s) / s;
  });
}, mT = function() {
  for (var i = arguments.length, u = new Array(i), a = 0; a < i; a++)
    u[a] = arguments[a];
  return function(s) {
    return u.reduce(function(c, h) {
      return h(c);
    }, s);
  };
}, gT = function(i, u) {
  return function(a) {
    return i(parseFloat(a)) + (u || wn(a));
  };
}, pT = function(i, u, a) {
  return Z1(i, u, 0, 1, a);
}, Q1 = function(i, u, a) {
  return Ua(a, function(s) {
    return i[~~u(s)];
  });
}, _T = function f(i, u, a) {
  var s = u - i;
  return Rn(i) ? Q1(i, f(0, i.length), u) : Ua(a, function(c) {
    return (s + (c - i) % s) % s + i;
  });
}, vT = function f(i, u, a) {
  var s = u - i, c = s * 2;
  return Rn(i) ? Q1(i, f(0, i.length - 1), u) : Ua(a, function(h) {
    return h = (c + (h - i) % c) % c || 0, i + (h > s ? c - h : h);
  });
}, to = function(i) {
  return i.replace(Wb, function(u) {
    var a = u.indexOf("[") + 1, s = u.substring(a || 7, a ? u.indexOf("]") : u.length - 1).split($b);
    return j1(a ? s : +s[0], a ? 0 : +s[1], +s[2] || 1e-5);
  });
}, Z1 = function(i, u, a, s, c) {
  var h = u - i, d = s - a;
  return Ua(c, function(g) {
    return a + ((g - i) / h * d || 0);
  });
}, yT = function f(i, u, a, s) {
  var c = isNaN(i + u) ? 0 : function(b) {
    return (1 - b) * i + b * u;
  };
  if (!c) {
    var h = fn(i), d = {}, g, _, p, v, S;
    if (a === !0 && (s = 1) && (a = null), h)
      i = {
        p: i
      }, u = {
        p: u
      };
    else if (Rn(i) && !Rn(u)) {
      for (p = [], v = i.length, S = v - 2, _ = 1; _ < v; _++)
        p.push(f(i[_ - 1], i[_]));
      v--, c = function(M) {
        M *= v;
        var T = Math.min(S, ~~M);
        return p[T](M - T);
      }, a = u;
    } else s || (i = zr(Rn(i) ? [] : {}, i));
    if (!p) {
      for (g in u)
        Z0.call(d, i, g, "get", u[g]);
      c = function(M) {
        return F0(M, d) || (h ? i.p : i);
      };
    }
  }
  return Ua(a, c);
}, Lv = function(i, u, a) {
  var s = i.labels, c = ql, h, d, g;
  for (h in s)
    d = s[h] - u, d < 0 == !!a && d && c > (d = Math.abs(d)) && (g = h, c = d);
  return g;
}, Sl = function(i, u, a) {
  var s = i.vars, c = s[u], h = we, d = i._ctx, g, _, p;
  if (c)
    return g = s[u + "Params"], _ = s.callbackScope || i, a && Oa.length && lf(), d && (we = d), p = g ? c.apply(_, g) : c.call(_), we = h, p;
}, Rs = function(i) {
  return Ca(i), i.scrollTrigger && i.scrollTrigger.kill(!!Tn), i.progress() < 1 && Sl(i, "onInterrupt"), i;
}, vr, K1 = [], J1 = function(i) {
  if (i)
    if (i = !i.name && i.default || i, L0() || i.headless) {
      var u = i.name, a = Le(i), s = u && !a && i.init ? function() {
        this._props = [];
      } : i, c = {
        init: Is,
        render: F0,
        add: Z0,
        kill: YT,
        modifier: HT,
        rawVars: 0
      }, h = {
        targetTest: 0,
        get: 0,
        getSetter: k0,
        aliases: {},
        register: 0
      };
      if (Cr(), i !== s) {
        if (_l[u])
          return;
        xl(s, xl(af(i, c), h)), zr(s.prototype, zr(c, af(i, h))), _l[s.prop = u] = s, i.targetTest && (Jc.push(s), G0[u] = 1), u = (u === "css" ? "CSS" : u.charAt(0).toUpperCase() + u.substr(1)) + "Plugin";
      }
      w1(u, s), i.register && i.register(ll, s, el);
    } else
      K1.push(i);
}, ye = 255, Ds = {
  aqua: [0, ye, ye],
  lime: [0, ye, 0],
  silver: [192, 192, 192],
  black: [0, 0, 0],
  maroon: [128, 0, 0],
  teal: [0, 128, 128],
  blue: [0, 0, ye],
  navy: [0, 0, 128],
  white: [ye, ye, ye],
  olive: [128, 128, 0],
  yellow: [ye, ye, 0],
  orange: [ye, 165, 0],
  gray: [128, 128, 128],
  purple: [128, 0, 128],
  green: [0, 128, 0],
  red: [ye, 0, 0],
  pink: [ye, 192, 203],
  cyan: [0, ye, ye],
  transparent: [ye, ye, ye, 0]
}, $d = function(i, u, a) {
  return i += i < 0 ? 1 : i > 1 ? -1 : 0, (i * 6 < 1 ? u + (a - u) * i * 6 : i < 0.5 ? a : i * 3 < 2 ? u + (a - u) * (2 / 3 - i) * 6 : u) * ye + 0.5 | 0;
}, k1 = function(i, u, a) {
  var s = i ? Vi(i) ? [i >> 16, i >> 8 & ye, i & ye] : 0 : Ds.black, c, h, d, g, _, p, v, S, b, M;
  if (!s) {
    if (i.substr(-1) === "," && (i = i.substr(0, i.length - 1)), Ds[i])
      s = Ds[i];
    else if (i.charAt(0) === "#") {
      if (i.length < 6 && (c = i.charAt(1), h = i.charAt(2), d = i.charAt(3), i = "#" + c + c + h + h + d + d + (i.length === 5 ? i.charAt(4) + i.charAt(4) : "")), i.length === 9)
        return s = parseInt(i.substr(1, 6), 16), [s >> 16, s >> 8 & ye, s & ye, parseInt(i.substr(7), 16) / 255];
      i = parseInt(i.substr(1), 16), s = [i >> 16, i >> 8 & ye, i & ye];
    } else if (i.substr(0, 3) === "hsl") {
      if (s = M = i.match(Nv), !u)
        g = +s[0] % 360 / 360, _ = +s[1] / 100, p = +s[2] / 100, h = p <= 0.5 ? p * (_ + 1) : p + _ - p * _, c = p * 2 - h, s.length > 3 && (s[3] *= 1), s[0] = $d(g + 1 / 3, c, h), s[1] = $d(g, c, h), s[2] = $d(g - 1 / 3, c, h);
      else if (~i.indexOf("="))
        return s = i.match(M1), a && s.length < 4 && (s[3] = 1), s;
    } else
      s = i.match(Nv) || Ds.transparent;
    s = s.map(Number);
  }
  return u && !M && (c = s[0] / ye, h = s[1] / ye, d = s[2] / ye, v = Math.max(c, h, d), S = Math.min(c, h, d), p = (v + S) / 2, v === S ? g = _ = 0 : (b = v - S, _ = p > 0.5 ? b / (2 - v - S) : b / (v + S), g = v === c ? (h - d) / b + (h < d ? 6 : 0) : v === h ? (d - c) / b + 2 : (c - h) / b + 4, g *= 60), s[0] = ~~(g + 0.5), s[1] = ~~(_ * 100 + 0.5), s[2] = ~~(p * 100 + 0.5)), a && s.length < 4 && (s[3] = 1), s;
}, F1 = function(i) {
  var u = [], a = [], s = -1;
  return i.split(za).forEach(function(c) {
    var h = c.match(_r) || [];
    u.push.apply(u, h), a.push(s += h.length + 1);
  }), u.c = a, u;
}, qv = function(i, u, a) {
  var s = "", c = (i + s).match(za), h = u ? "hsla(" : "rgba(", d = 0, g, _, p, v;
  if (!c)
    return i;
  if (c = c.map(function(S) {
    return (S = k1(S, u, 1)) && h + (u ? S[0] + "," + S[1] + "%," + S[2] + "%," + S[3] : S.join(",")) + ")";
  }), a && (p = F1(i), g = a.c, g.join(s) !== p.c.join(s)))
    for (_ = i.replace(za, "1").split(_r), v = _.length - 1; d < v; d++)
      s += _[d] + (~g.indexOf(d) ? c.shift() || h + "0,0,0,0)" : (p.length ? p : c.length ? c : a).shift());
  if (!_)
    for (_ = i.split(za), v = _.length - 1; d < v; d++)
      s += _[d] + c[d];
  return s + _[v];
}, za = (function() {
  var f = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", i;
  for (i in Ds)
    f += "|" + i + "\\b";
  return new RegExp(f + ")", "gi");
})(), ST = /hsl[a]?\(/, P1 = function(i) {
  var u = i.join(" "), a;
  if (za.lastIndex = 0, za.test(u))
    return a = ST.test(u), i[1] = qv(i[1], a), i[0] = qv(i[0], a, F1(i[1])), !0;
}, eo, yl = (function() {
  var f = Date.now, i = 500, u = 33, a = f(), s = a, c = 1e3 / 240, h = c, d = [], g, _, p, v, S, b, M = function T(w) {
    var G = f() - s, q = w === !0, Z, B, j, k;
    if ((G > i || G < 0) && (a += G - u), s += G, j = s - a, Z = j - h, (Z > 0 || q) && (k = ++v.frame, S = j - v.time * 1e3, v.time = j = j / 1e3, h += Z + (Z >= c ? 0 : c - Z), B = 1), q || (g = _(T)), B)
      for (b = 0; b < d.length; b++)
        d[b](j, S, k, w);
  };
  return v = {
    time: 0,
    frame: 0,
    tick: function() {
      M(!0);
    },
    deltaRatio: function(w) {
      return S / (1e3 / (w || 60));
    },
    wake: function() {
      z1 && (!d0 && L0() && (hi = d0 = window, q0 = hi.document || {}, El.gsap = ll, (hi.gsapVersions || (hi.gsapVersions = [])).push(ll.version), A1(nf || hi.GreenSockGlobals || !hi.gsap && hi || {}), K1.forEach(J1)), p = typeof requestAnimationFrame < "u" && requestAnimationFrame, g && v.sleep(), _ = p || function(w) {
        return setTimeout(w, h - v.time * 1e3 + 1 | 0);
      }, eo = 1, M(2));
    },
    sleep: function() {
      (p ? cancelAnimationFrame : clearTimeout)(g), eo = 0, _ = Is;
    },
    lagSmoothing: function(w, G) {
      i = w || 1 / 0, u = Math.min(G || 33, i);
    },
    fps: function(w) {
      c = 1e3 / (w || 240), h = v.time * 1e3 + c;
    },
    add: function(w, G, q) {
      var Z = G ? function(B, j, k, R) {
        w(B, j, k, R), v.remove(Z);
      } : w;
      return v.remove(w), d[q ? "unshift" : "push"](Z), Cr(), Z;
    },
    remove: function(w, G) {
      ~(G = d.indexOf(w)) && d.splice(G, 1) && b >= G && b--;
    },
    _listeners: d
  }, v;
})(), Cr = function() {
  return !eo && yl.wake();
}, $t = {}, bT = /^[\d.\-M][\d.\-,\s]/, TT = /["']/g, ET = function(i) {
  for (var u = {}, a = i.substr(1, i.length - 3).split(":"), s = a[0], c = 1, h = a.length, d, g, _; c < h; c++)
    g = a[c], d = c !== h - 1 ? g.lastIndexOf(",") : g.length, _ = g.substr(0, d), u[s] = isNaN(_) ? _.replace(TT, "").trim() : +_, s = g.substr(d + 1).trim();
  return u;
}, xT = function(i) {
  var u = i.indexOf("(") + 1, a = i.indexOf(")"), s = i.indexOf("(", u);
  return i.substring(u, ~s && s < a ? i.indexOf(")", a + 1) : a);
}, MT = function(i) {
  var u = (i + "").split("("), a = $t[u[0]];
  return a && u.length > 1 && a.config ? a.config.apply(null, ~i.indexOf("{") ? [ET(u[1])] : xT(i).split(",").map(N1)) : $t._CE && bT.test(i) ? $t._CE("", i) : a;
}, OT = function(i) {
  return function(u) {
    return 1 - i(1 - u);
  };
}, du = function(i, u) {
  return i && (Le(i) ? i : $t[i] || MT(i)) || u;
}, bu = function(i, u, a, s) {
  a === void 0 && (a = function(g) {
    return 1 - u(1 - g);
  }), s === void 0 && (s = function(g) {
    return g < 0.5 ? u(g * 2) / 2 : 1 - u((1 - g) * 2) / 2;
  });
  var c = {
    easeIn: u,
    easeOut: a,
    easeInOut: s
  }, h;
  return tl(i, function(d) {
    $t[d] = El[d] = c, $t[h = d.toLowerCase()] = a;
    for (var g in c)
      $t[h + (g === "easeIn" ? ".in" : g === "easeOut" ? ".out" : ".inOut")] = $t[d + "." + g] = c[g];
  }), c;
}, W1 = function(i) {
  return function(u) {
    return u < 0.5 ? (1 - i(1 - u * 2)) / 2 : 0.5 + i((u - 0.5) * 2) / 2;
  };
}, Id = function f(i, u, a) {
  var s = u >= 1 ? u : 1, c = (a || (i ? 0.3 : 0.45)) / (u < 1 ? u : 1), h = c / h0 * (Math.asin(1 / s) || 0), d = function(p) {
    return p === 1 ? 1 : s * Math.pow(2, -10 * p) * Pb((p - h) * c) + 1;
  }, g = i === "out" ? d : i === "in" ? function(_) {
    return 1 - d(1 - _);
  } : W1(d);
  return c = h0 / c, g.config = function(_, p) {
    return f(i, _, p);
  }, g;
}, t0 = function f(i, u) {
  u === void 0 && (u = 1.70158);
  var a = function(h) {
    return h ? --h * h * ((u + 1) * h + u) + 1 : 0;
  }, s = i === "out" ? a : i === "in" ? function(c) {
    return 1 - a(1 - c);
  } : W1(a);
  return s.config = function(c) {
    return f(i, c);
  }, s;
};
tl("Linear,Quad,Cubic,Quart,Quint,Strong", function(f, i) {
  var u = i < 5 ? i + 1 : i;
  bu(f + ",Power" + (u - 1), i ? function(a) {
    return Math.pow(a, u);
  } : function(a) {
    return a;
  }, function(a) {
    return 1 - Math.pow(1 - a, u);
  }, function(a) {
    return a < 0.5 ? Math.pow(a * 2, u) / 2 : 1 - Math.pow((1 - a) * 2, u) / 2;
  });
});
$t.Linear.easeNone = $t.none = $t.Linear.easeIn;
bu("Elastic", Id("in"), Id("out"), Id());
(function(f, i) {
  var u = 1 / i, a = 2 * u, s = 2.5 * u, c = function(d) {
    return d < u ? f * d * d : d < a ? f * Math.pow(d - 1.5 / i, 2) + 0.75 : d < s ? f * (d -= 2.25 / i) * d + 0.9375 : f * Math.pow(d - 2.625 / i, 2) + 0.984375;
  };
  bu("Bounce", function(h) {
    return 1 - c(1 - h);
  }, c);
})(7.5625, 2.75);
bu("Expo", function(f) {
  return Math.pow(2, 10 * (f - 1)) * f + f * f * f * f * f * f * (1 - f);
});
bu("Circ", function(f) {
  return -(E1(1 - f * f) - 1);
});
bu("Sine", function(f) {
  return f === 1 ? 1 : -Fb(f * Jb) + 1;
});
bu("Back", t0("in"), t0("out"), t0());
$t.SteppedEase = $t.steps = El.SteppedEase = {
  config: function(i, u) {
    i === void 0 && (i = 1);
    var a = 1 / i, s = i + (u ? 0 : 1), c = u ? 1 : 0, h = 1 - pe;
    return function(d) {
      return ((s * so(0, h, d) | 0) + c) * a;
    };
  }
};
Ws.ease = $t["quad.out"];
tl("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(f) {
  return V0 += f + "," + f + "Params,";
});
var $1 = function(i, u) {
  this.id = kb++, i._gsap = this, this.target = i, this.harness = u, this.get = u ? u.get : R1, this.set = u ? u.getSetter : k0;
}, no = /* @__PURE__ */ (function() {
  function f(u) {
    this.vars = u, this._delay = +u.delay || 0, (this._repeat = u.repeat === 1 / 0 ? -2 : u.repeat || 0) && (this._rDelay = u.repeatDelay || 0, this._yoyo = !!u.yoyo || !!u.yoyoEase), this._ts = 1, wr(this, +u.duration, 1, 1), this.data = u.data, we && (this._ctx = we, we.data.push(this)), eo || yl.wake();
  }
  var i = f.prototype;
  return i.delay = function(a) {
    return a || a === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + a - this._delay), this._delay = a, this) : this._delay;
  }, i.duration = function(a) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a) : this.totalDuration() && this._dur;
  }, i.totalDuration = function(a) {
    return arguments.length ? (this._dirty = 0, wr(this, this._repeat < 0 ? a : (a - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, i.totalTime = function(a, s) {
    if (Cr(), !arguments.length)
      return this._tTime;
    var c = this._dp;
    if (c && c.smoothChildTiming && this._ts) {
      for (vf(this, a), !c._dp || c.parent || Y1(c, this); c && c.parent; )
        c.parent._time !== c._start + (c._ts >= 0 ? c._tTime / c._ts : (c.totalDuration() - c._tTime) / -c._ts) && c.totalTime(c._tTime, !0), c = c.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && a < this._tDur || this._ts < 0 && a > 0 || !this._tDur && !a) && mi(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== a || !this._dur && !s || this._initted && Math.abs(this._zTime) === pe || !this._initted && this._dur && a || !a && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = a), D1(this, a, s)), this;
  }, i.time = function(a, s) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), a + Yv(this)) % (this._dur + this._rDelay) || (a ? this._dur : 0), s) : this._time;
  }, i.totalProgress = function(a, s) {
    return arguments.length ? this.totalTime(this.totalDuration() * a, s) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, i.progress = function(a, s) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) + Yv(this), s) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, i.iteration = function(a, s) {
    var c = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (a - 1) * c, s) : this._repeat ? Ar(this._tTime, c) + 1 : 1;
  }, i.timeScale = function(a, s) {
    if (!arguments.length)
      return this._rts === -pe ? 0 : this._rts;
    if (this._rts === a)
      return this;
    var c = this.parent && this._ts ? uf(this.parent._time, this) : this._tTime, h = this._rts < 0;
    this._rts = +a || 0, this._ts = this._ps || a === -pe ? 0 : this._rts;
    var d = this.totalDuration();
    return (h !== this._rts < 0 || c > 0 && c < d) && this.totalTime(so(-Math.abs(this._delay), d, c), s !== !1), _f(this), uT(this);
  }, i.paused = function(a) {
    if (!arguments.length)
      return this._ps;
    if (this._ps !== a)
      if (this._ps = a, a)
        this._pTime = this._tTime || Math.max(-this._delay, this.rawTime()), this._ts = this._act = 0;
      else {
        Cr(), this._ts = this._rts;
        var s = this.parent && !this.parent.smoothChildTiming ? this.rawTime() : this._tTime || this._pTime, c = this.progress() === 1 && Math.abs(this._zTime) !== pe, h;
        if (c)
          for (this._tTime -= pe, h = this._first; h; ) {
            if (!h._dur && h._zTime < 0 && h._ts && h._start <= s + pe) {
              c = !1;
              break;
            }
            h = h._next;
          }
        this.totalTime(s, c);
      }
    return this;
  }, i.startTime = function(a) {
    if (arguments.length) {
      this._start = De(a);
      var s = this.parent || this._dp;
      return s && (s._sort || !this.parent) && mi(s, this, this._start - this._delay), this;
    }
    return this._start;
  }, i.endTime = function(a) {
    return this._start + (In(a) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, i.rawTime = function(a) {
    var s = this.parent || this._dp;
    return s ? a && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? uf(s.rawTime(a), this) : this._tTime : this._tTime;
  }, i.revert = function(a) {
    a === void 0 && (a = nT);
    var s = Tn;
    return Tn = a, Q0(this) && (this.timeline && this.timeline.revert(a), this.totalTime(-0.01, a.suppressEvents)), this.data !== "nested" && a.kill !== !1 && this.kill(), Tn = s, this;
  }, i.globalTime = function(a) {
    for (var s = this, c = arguments.length ? a : s.rawTime(); s; )
      c = s._start + c / (Math.abs(s._ts) || 1), s = s._dp;
    return !this.parent && this._sat ? this._sat.globalTime(a) : c;
  }, i.repeat = function(a) {
    return arguments.length ? (this._repeat = a === 1 / 0 ? -2 : a, Bv(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, i.repeatDelay = function(a) {
    if (arguments.length) {
      var s = this._time;
      return this._rDelay = a, Bv(this), s ? this.time(s) : this;
    }
    return this._rDelay;
  }, i.yoyo = function(a) {
    return arguments.length ? (this._yoyo = a, this) : this._yoyo;
  }, i.seek = function(a, s) {
    return this.totalTime(Yl(this, a), In(s));
  }, i.restart = function(a, s) {
    return this.play().totalTime(a ? -this._delay : 0, In(s)), this._dur || (this._zTime = -pe), this;
  }, i.play = function(a, s) {
    return a != null && this.seek(a, s), this.reversed(!1).paused(!1);
  }, i.reverse = function(a, s) {
    return a != null && this.seek(a || this.totalDuration(), s), this.reversed(!0).paused(!1);
  }, i.pause = function(a, s) {
    return a != null && this.seek(a, s), this.paused(!0);
  }, i.resume = function() {
    return this.paused(!1);
  }, i.reversed = function(a) {
    return arguments.length ? (!!a !== this.reversed() && this.timeScale(-this._rts || (a ? -pe : 0)), this) : this._rts < 0;
  }, i.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -pe, this;
  }, i.isActive = function() {
    var a = this.parent || this._dp, s = this._start, c;
    return !!(!a || this._ts && this._initted && a.isActive() && (c = a.rawTime(!0)) >= s && c < this.endTime(!0) - pe);
  }, i.eventCallback = function(a, s, c) {
    var h = this.vars;
    return arguments.length > 1 ? (s ? (h[a] = s, c && (h[a + "Params"] = c), a === "onUpdate" && (this._onUpdate = s)) : delete h[a], this) : h[a];
  }, i.then = function(a) {
    var s = this, c = s._prom;
    return new Promise(function(h) {
      var d = Le(a) ? a : U1, g = function() {
        var p = s.then;
        s.then = null, c && c(), Le(d) && (d = d(s)) && (d.then || d === s) && (s.then = p), h(d), s.then = p;
      };
      s._initted && s.totalProgress() === 1 && s._ts >= 0 || !s._tTime && s._ts < 0 ? g() : s._prom = g;
    });
  }, i.kill = function() {
    Rs(this);
  }, f;
})();
xl(no.prototype, {
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
  _zTime: -pe,
  _prom: 0,
  _ps: !1,
  _rts: 1
});
var Wn = /* @__PURE__ */ (function(f) {
  T1(i, f);
  function i(a, s) {
    var c;
    return a === void 0 && (a = {}), c = f.call(this, a) || this, c.labels = {}, c.smoothChildTiming = !!a.smoothChildTiming, c.autoRemoveChildren = !!a.autoRemoveChildren, c._sort = In(a.sortChildren), Ne && mi(a.parent || Ne, Bi(c), s), a.reversed && c.reverse(), a.paused && c.paused(!0), a.scrollTrigger && B1(Bi(c), a.scrollTrigger), c;
  }
  var u = i.prototype;
  return u.to = function(s, c, h) {
    return Gs(0, arguments, this), this;
  }, u.from = function(s, c, h) {
    return Gs(1, arguments, this), this;
  }, u.fromTo = function(s, c, h, d) {
    return Gs(2, arguments, this), this;
  }, u.set = function(s, c, h) {
    return c.duration = 0, c.parent = this, Xs(c).repeatDelay || (c.repeat = 0), c.immediateRender = !!c.immediateRender, new We(s, c, Yl(this, h), 1), this;
  }, u.call = function(s, c, h) {
    return mi(this, We.delayedCall(0, s, c), h);
  }, u.staggerTo = function(s, c, h, d, g, _, p) {
    return h.duration = c, h.stagger = h.stagger || d, h.onComplete = _, h.onCompleteParams = p, h.parent = this, new We(s, h, Yl(this, g)), this;
  }, u.staggerFrom = function(s, c, h, d, g, _, p) {
    return h.runBackwards = 1, Xs(h).immediateRender = In(h.immediateRender), this.staggerTo(s, c, h, d, g, _, p);
  }, u.staggerFromTo = function(s, c, h, d, g, _, p, v) {
    return d.startAt = h, Xs(d).immediateRender = In(d.immediateRender), this.staggerTo(s, c, d, g, _, p, v);
  }, u.render = function(s, c, h) {
    var d = this._time, g = this._dirty ? this.totalDuration() : this._tDur, _ = this._dur, p = s <= 0 ? 0 : De(s), v = this._zTime < 0 != s < 0 && (this._initted || !_), S, b, M, T, w, G, q, Z, B, j, k, R;
    if (this !== Ne && p > g && s >= 0 && (p = g), p !== this._tTime || h || v) {
      if (d !== this._time && _ && (p += this._time - d, s += this._time - d), S = p, B = this._start, Z = this._ts, G = !Z, v && (_ || (d = this._zTime), (s || !c) && (this._zTime = s)), this._repeat) {
        if (k = this._yoyo, w = _ + this._rDelay, this._repeat < -1 && s < 0)
          return this.totalTime(w * 100 + s, c, h);
        if (S = De(p % w), p === g ? (T = this._repeat, S = _) : (j = De(p / w), T = ~~j, T && T === j && (S = _, T--), S > _ && (S = _)), j = Ar(this._tTime, w), !d && this._tTime && j !== T && this._tTime - j * w - this._dur <= 0 && (j = T), k && T & 1 && (S = _ - S, R = 1), T !== j && !this._lock) {
          var Q = k && j & 1, $ = Q === (k && T & 1);
          if (T < j && (Q = !Q), d = Q ? 0 : p % _ ? _ : p, this._lock = 1, this.render(d || (R ? 0 : De(T * w)), c, !_)._lock = 0, this._tTime = p, !c && this.parent && Sl(this, "onRepeat"), this.vars.repeatRefresh && !R && (this.invalidate()._lock = 1, j = T), d && d !== this._time || G !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (_ = this._dur, g = this._tDur, $ && (this._lock = 2, d = Q ? _ : -1e-4, this.render(d, !0), this.vars.repeatRefresh && !R && this.invalidate()), this._lock = 0, !this._ts && !G)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (q = cT(this, De(d), De(S)), q && (p -= S - (S = q._start))), this._tTime = p, this._time = S, this._act = !!Z, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = s, d = 0), !d && p && _ && !c && !j && (Sl(this, "onStart"), this._tTime !== p))
        return this;
      if (S >= d && s >= 0)
        for (b = this._first; b; ) {
          if (M = b._next, (b._act || S >= b._start) && b._ts && q !== b) {
            if (b.parent !== this)
              return this.render(s, c, h);
            if (b.render(b._ts > 0 ? (S - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (S - b._start) * b._ts, c, h), S !== this._time || !this._ts && !G) {
              q = 0, M && (p += this._zTime = -pe);
              break;
            }
          }
          b = M;
        }
      else {
        b = this._last;
        for (var V = s < 0 ? s : S; b; ) {
          if (M = b._prev, (b._act || V <= b._end) && b._ts && q !== b) {
            if (b.parent !== this)
              return this.render(s, c, h);
            if (b.render(b._ts > 0 ? (V - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (V - b._start) * b._ts, c, h || Tn && Q0(b)), S !== this._time || !this._ts && !G) {
              q = 0, M && (p += this._zTime = V ? -pe : pe);
              break;
            }
          }
          b = M;
        }
      }
      if (q && !c && (this.pause(), q.render(S >= d ? 0 : -pe)._zTime = S >= d ? 1 : -1, this._ts))
        return this._start = B, _f(this), this.render(s, c, h);
      this._onUpdate && !c && Sl(this, "onUpdate", !0), (p === g && this._tTime >= this.totalDuration() || !p && d) && (B === this._start || Math.abs(Z) !== Math.abs(this._ts)) && (this._lock || ((s || !_) && (p === g && this._ts > 0 || !p && this._ts < 0) && Ca(this, 1), !c && !(s < 0 && !d) && (p || d || !g) && (Sl(this, p === g && s >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(p < g && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, u.add = function(s, c) {
    var h = this;
    if (Vi(c) || (c = Yl(this, c, s)), !(s instanceof no)) {
      if (Rn(s))
        return s.forEach(function(d) {
          return h.add(d, c);
        }), this;
      if (fn(s))
        return this.addLabel(s, c);
      if (Le(s))
        s = We.delayedCall(0, s);
      else
        return this;
    }
    return this !== s ? mi(this, s, c) : this;
  }, u.getChildren = function(s, c, h, d) {
    s === void 0 && (s = !0), c === void 0 && (c = !0), h === void 0 && (h = !0), d === void 0 && (d = -ql);
    for (var g = [], _ = this._first; _; )
      _._start >= d && (_ instanceof We ? c && g.push(_) : (h && g.push(_), s && g.push.apply(g, _.getChildren(!0, c, h)))), _ = _._next;
    return g;
  }, u.getById = function(s) {
    for (var c = this.getChildren(1, 1, 1), h = c.length; h--; )
      if (c[h].vars.id === s)
        return c[h];
  }, u.remove = function(s) {
    return fn(s) ? this.removeLabel(s) : Le(s) ? this.killTweensOf(s) : (s.parent === this && pf(this, s), s === this._recent && (this._recent = this._last), hu(this));
  }, u.totalTime = function(s, c) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = De(yl.time - (this._ts > 0 ? s / this._ts : (this.totalDuration() - s) / -this._ts))), f.prototype.totalTime.call(this, s, c), this._forcing = 0, this) : this._tTime;
  }, u.addLabel = function(s, c) {
    return this.labels[s] = Yl(this, c), this;
  }, u.removeLabel = function(s) {
    return delete this.labels[s], this;
  }, u.addPause = function(s, c, h) {
    var d = We.delayedCall(0, c || Is, h);
    return d.data = "isPause", this._hasPause = 1, mi(this, d, Yl(this, s));
  }, u.removePause = function(s) {
    var c = this._first;
    for (s = Yl(this, s); c; )
      c._start === s && c.data === "isPause" && Ca(c), c = c._next;
  }, u.killTweensOf = function(s, c, h) {
    for (var d = this.getTweensOf(s, h), g = d.length; g--; )
      ba !== d[g] && d[g].kill(s, c);
    return this;
  }, u.getTweensOf = function(s, c) {
    for (var h = [], d = Xl(s), g = this._first, _ = Vi(c), p; g; )
      g instanceof We ? lT(g._targets, d) && (_ ? (!ba || g._initted && g._ts) && g.globalTime(0) <= c && g.globalTime(g.totalDuration()) > c : !c || g.isActive()) && h.push(g) : (p = g.getTweensOf(d, c)).length && h.push.apply(h, p), g = g._next;
    return h;
  }, u.tweenTo = function(s, c) {
    c = c || {};
    var h = this, d = Yl(h, s), g = c, _ = g.startAt, p = g.onStart, v = g.onStartParams, S = g.immediateRender, b, M = We.to(h, xl({
      ease: c.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: d,
      overwrite: "auto",
      duration: c.duration || Math.abs((d - (_ && "time" in _ ? _.time : h._time)) / h.timeScale()) || pe,
      onStart: function() {
        if (h.pause(), !b) {
          var w = c.duration || Math.abs((d - (_ && "time" in _ ? _.time : h._time)) / h.timeScale());
          M._dur !== w && wr(M, w, 0, 1).render(M._time, !0, !0), b = 1;
        }
        p && p.apply(M, v || []);
      }
    }, c));
    return S ? M.render(0) : M;
  }, u.tweenFromTo = function(s, c, h) {
    return this.tweenTo(c, xl({
      startAt: {
        time: Yl(this, s)
      }
    }, h));
  }, u.recent = function() {
    return this._recent;
  }, u.nextLabel = function(s) {
    return s === void 0 && (s = this._time), Lv(this, Yl(this, s));
  }, u.previousLabel = function(s) {
    return s === void 0 && (s = this._time), Lv(this, Yl(this, s), 1);
  }, u.currentLabel = function(s) {
    return arguments.length ? this.seek(s, !0) : this.previousLabel(this._time + pe);
  }, u.shiftChildren = function(s, c, h) {
    h === void 0 && (h = 0);
    var d = this._first, g = this.labels, _;
    for (s = De(s); d; )
      d._start >= h && (d._start += s, d._end += s), d = d._next;
    if (c)
      for (_ in g)
        g[_] >= h && (g[_] += s);
    return hu(this);
  }, u.invalidate = function(s) {
    var c = this._first;
    for (this._lock = 0; c; )
      c.invalidate(s), c = c._next;
    return f.prototype.invalidate.call(this, s);
  }, u.clear = function(s) {
    s === void 0 && (s = !0);
    for (var c = this._first, h; c; )
      h = c._next, this.remove(c), c = h;
    return this._dp && (this._time = this._tTime = this._pTime = 0), s && (this.labels = {}), hu(this);
  }, u.totalDuration = function(s) {
    var c = 0, h = this, d = h._last, g = ql, _, p, v;
    if (arguments.length)
      return h.timeScale((h._repeat < 0 ? h.duration() : h.totalDuration()) / (h.reversed() ? -s : s));
    if (h._dirty) {
      for (v = h.parent; d; )
        _ = d._prev, d._dirty && d.totalDuration(), p = d._start, p > g && h._sort && d._ts && !h._lock ? (h._lock = 1, mi(h, d, p - d._delay, 1)._lock = 0) : g = p, p < 0 && d._ts && (c -= p, (!v && !h._dp || v && v.smoothChildTiming) && (h._start += De(p / h._ts), h._time -= p, h._tTime -= p), h.shiftChildren(-p, !1, -1 / 0), g = 0), d._end > c && d._ts && (c = d._end), d = _;
      wr(h, h === Ne && h._time > c ? h._time : c, 1, 1), h._dirty = 0;
    }
    return h._tDur;
  }, i.updateRoot = function(s) {
    if (Ne._ts && (D1(Ne, uf(s, Ne)), C1 = yl.frame), yl.frame >= Uv) {
      Uv += Tl.autoSleep || 120;
      var c = Ne._first;
      if ((!c || !c._ts) && Tl.autoSleep && yl._listeners.length < 2) {
        for (; c && !c._ts; )
          c = c._next;
        c || yl.sleep();
      }
    }
  }, i;
})(no);
xl(Wn.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var zT = function(i, u, a, s, c, h, d) {
  var g = new el(this._pt, i, u, 0, 1, ly, null, c), _ = 0, p = 0, v, S, b, M, T, w, G, q;
  for (g.b = a, g.e = s, a += "", s += "", (G = ~s.indexOf("random(")) && (s = to(s)), h && (q = [a, s], h(q, i, u), a = q[0], s = q[1]), S = a.match(Pd) || []; v = Pd.exec(s); )
    M = v[0], T = s.substring(_, v.index), b ? b = (b + 1) % 5 : T.substr(-5) === "rgba(" && (b = 1), M !== S[p++] && (w = parseFloat(S[p - 1]) || 0, g._pt = {
      _next: g._pt,
      p: T || p === 1 ? T : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: w,
      c: M.charAt(1) === "=" ? Sr(w, M) - w : parseFloat(M) - w,
      m: b && b < 4 ? Math.round : 0
    }, _ = Pd.lastIndex);
  return g.c = _ < s.length ? s.substring(_, s.length) : "", g.fp = d, (O1.test(s) || G) && (g.e = 0), this._pt = g, g;
}, Z0 = function(i, u, a, s, c, h, d, g, _, p) {
  Le(s) && (s = s(c || 0, i, h));
  var v = i[u], S = a !== "get" ? a : Le(v) ? _ ? i[u.indexOf("set") || !Le(i["get" + u.substr(3)]) ? u : "get" + u.substr(3)](_) : i[u]() : v, b = Le(v) ? _ ? DT : ey : J0, M;
  if (fn(s) && (~s.indexOf("random(") && (s = to(s)), s.charAt(1) === "=" && (M = Sr(S, s) + (wn(S) || 0), (M || M === 0) && (s = M))), !p || S !== s || y0)
    return !isNaN(S * s) && s !== "" ? (M = new el(this._pt, i, u, +S || 0, s - (S || 0), typeof v == "boolean" ? UT : ny, 0, b), _ && (M.fp = _), d && M.modifier(d, this, i), this._pt = M) : (!v && !(u in i) && X0(u, s), zT.call(this, i, u, S, s, b, g || Tl.stringFilter, _));
}, AT = function(i, u, a, s, c) {
  if (Le(i) && (i = Vs(i, c, u, a, s)), !vi(i) || i.style && i.nodeType || Rn(i) || x1(i))
    return fn(i) ? Vs(i, c, u, a, s) : i;
  var h = {}, d;
  for (d in i)
    h[d] = Vs(i[d], c, u, a, s);
  return h;
}, I1 = function(i, u, a, s, c, h) {
  var d, g, _, p;
  if (_l[i] && (d = new _l[i]()).init(c, d.rawVars ? u[i] : AT(u[i], s, c, h, a), a, s, h) !== !1 && (a._pt = g = new el(a._pt, c, i, 0, 1, d.render, d, 0, d.priority), a !== vr))
    for (_ = a._ptLookup[a._targets.indexOf(c)], p = d._props.length; p--; )
      _[d._props[p]] = g;
  return d;
}, ba, y0, K0 = function f(i, u, a) {
  var s = i.vars, c = s.ease, h = s.startAt, d = s.immediateRender, g = s.lazy, _ = s.onUpdate, p = s.runBackwards, v = s.yoyoEase, S = s.keyframes, b = s.autoRevert, M = i._dur, T = i._startAt, w = i._targets, G = i.parent, q = G && G.data === "nested" ? G.vars.targets : w, Z = i._overwrite === "auto" && !Y0, B = i.timeline, j = s.easeReverse || v, k, R, Q, $, V, nt, lt, ft, pt, et, K, P, I;
  if (B && (!S || !c) && (c = "none"), i._ease = du(c, Ws.ease), i._rEase = j && (du(j) || i._ease), i._from = !B && !!s.runBackwards, i._from && (i.ratio = 1), !B || S && !s.stagger) {
    if (ft = w[0] ? fu(w[0]).harness : 0, P = ft && s[ft.prop], k = af(s, G0), T && (T._zTime < 0 && T.progress(1), u < 0 && p && d && !b ? T.render(-1, !0) : T.revert(p && M ? Kc : eT), T._lazy = 0), h) {
      if (Ca(i._startAt = We.set(w, xl({
        data: "isStart",
        overwrite: !1,
        parent: G,
        immediateRender: !0,
        lazy: !T && In(g),
        startAt: null,
        delay: 0,
        onUpdate: _ && function() {
          return Sl(i, "onUpdate");
        },
        stagger: 0
      }, h))), i._startAt._dp = 0, i._startAt._sat = i, u < 0 && (Tn || !d && !b) && i._startAt.revert(Kc), d && M && u <= 0 && a <= 0) {
        u && (i._zTime = u);
        return;
      }
    } else if (p && M && !T) {
      if (u && (d = !1), Q = xl({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: d && !T && In(g),
        immediateRender: d,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: G
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, k), P && (Q[ft.prop] = P), Ca(i._startAt = We.set(w, Q)), i._startAt._dp = 0, i._startAt._sat = i, u < 0 && (Tn ? i._startAt.revert(Kc) : i._startAt.render(-1, !0)), i._zTime = u, !d)
        f(i._startAt, pe, pe);
      else if (!u)
        return;
    }
    for (i._pt = i._ptCache = 0, g = M && In(g) || g && !M, R = 0; R < w.length; R++) {
      if (V = w[R], lt = V._gsap || j0(w)[R]._gsap, i._ptLookup[R] = et = {}, m0[lt.id] && Oa.length && lf(), K = q === w ? R : q.indexOf(V), ft && (pt = new ft()).init(V, P || k, i, K, q) !== !1 && (i._pt = $ = new el(i._pt, V, pt.name, 0, 1, pt.render, pt, 0, pt.priority), pt._props.forEach(function(st) {
        et[st] = $;
      }), pt.priority && (nt = 1)), !ft || P)
        for (Q in k)
          _l[Q] && (pt = I1(Q, k, i, K, V, q)) ? pt.priority && (nt = 1) : et[Q] = $ = Z0.call(i, V, Q, "get", k[Q], K, q, 0, s.stringFilter);
      i._op && i._op[R] && i.kill(V, i._op[R]), Z && i._pt && (ba = i, Ne.killTweensOf(V, et, i.globalTime(u)), I = !i.parent, ba = 0), i._pt && g && (m0[lt.id] = 1);
    }
    nt && iy(i), i._onInit && i._onInit(i);
  }
  i._onUpdate = _, i._initted = (!i._op || i._pt) && !I, S && u <= 0 && B.render(ql, !0, !0);
}, wT = function(i, u, a, s, c, h, d, g) {
  var _ = (i._pt && i._ptCache || (i._ptCache = {}))[u], p, v, S, b;
  if (!_)
    for (_ = i._ptCache[u] = [], S = i._ptLookup, b = i._targets.length; b--; ) {
      if (p = S[b][u], p && p.d && p.d._pt)
        for (p = p.d._pt; p && p.p !== u && p.fp !== u; )
          p = p._next;
      if (!p)
        return y0 = 1, i.vars[u] = "+=0", K0(i, d), y0 = 0, g ? $s(u + " not eligible for reset. Try splitting into individual properties") : 1;
      _.push(p);
    }
  for (b = _.length; b--; )
    v = _[b], p = v._pt || v, p.s = (s || s === 0) && !c ? s : p.s + (s || 0) + h * p.c, p.c = a - p.s, v.e && (v.e = Xe(a) + wn(v.e)), v.b && (v.b = p.s + wn(v.b));
}, CT = function(i, u) {
  var a = i[0] ? fu(i[0]).harness : 0, s = a && a.aliases, c, h, d, g;
  if (!s)
    return u;
  c = zr({}, u);
  for (h in s)
    if (h in c)
      for (g = s[h].split(","), d = g.length; d--; )
        c[g[d]] = c[h];
  return c;
}, RT = function(i, u, a, s) {
  var c = u.ease || s || "power1.inOut", h, d;
  if (Rn(u))
    d = a[i] || (a[i] = []), u.forEach(function(g, _) {
      return d.push({
        t: _ / (u.length - 1) * 100,
        v: g,
        e: c
      });
    });
  else
    for (h in u)
      d = a[h] || (a[h] = []), h === "ease" || d.push({
        t: parseFloat(i),
        v: u[h],
        e: c
      });
}, Vs = function(i, u, a, s, c) {
  return Le(i) ? i.call(u, a, s, c) : fn(i) && ~i.indexOf("random(") ? to(i) : i;
}, sf = V0 + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", ty = {};
tl(sf + ",id,stagger,delay,duration,paused,scrollTrigger", function(f) {
  return ty[f] = 1;
});
sf = sf.split(",");
var We = /* @__PURE__ */ (function(f) {
  T1(i, f);
  function i(a, s, c, h) {
    var d;
    typeof s == "number" && (c.duration = s, s = c, c = null), d = f.call(this, h ? s : Xs(s)) || this;
    var g = d.vars, _ = g.duration, p = g.delay, v = g.immediateRender, S = g.stagger, b = g.overwrite, M = g.keyframes, T = g.defaults, w = g.scrollTrigger, G = s.parent || Ne, q = (Rn(a) || x1(a) ? Vi(a[0]) : "length" in s) ? [a] : Xl(a), Z, B, j, k, R, Q, $, V;
    if (d._targets = q.length ? j0(q) : $s("GSAP target " + a + " not found. https://gsap.com", !Tl.nullTargetWarn) || [], d._ptLookup = [], d._overwrite = b, M || S || Dc(_) || Dc(p)) {
      s = d.vars;
      var nt = s.easeReverse || s.yoyoEase;
      if (Z = d.timeline = new Wn({
        data: "nested",
        defaults: T || {},
        targets: G && G.data === "nested" ? G.vars.targets : q
      }), Z.kill(), Z.parent = Z._dp = Bi(d), Z._start = 0, S || Dc(_) || Dc(p)) {
        if (k = q.length, $ = S && G1(S), vi(S))
          for (R in S)
            ~sf.indexOf(R) && (V || (V = {}), V[R] = S[R]);
        for (B = 0; B < k; B++)
          j = af(s, ty), j.stagger = 0, nt && (j.easeReverse = nt), V && zr(j, V), Q = q[B], j.duration = +Vs(_, Bi(d), B, Q, q), j.delay = (+Vs(p, Bi(d), B, Q, q) || 0) - d._delay, !S && k === 1 && j.delay && (d._delay = p = j.delay, d._start += p, j.delay = 0), Z.to(Q, j, $ ? $(B, Q, q) : 0), Z._ease = $t.none;
        Z.duration() ? _ = p = 0 : d.timeline = 0;
      } else if (M) {
        Xs(xl(Z.vars.defaults, {
          ease: "none"
        })), Z._ease = du(M.ease || s.ease || "none");
        var lt = 0, ft, pt, et;
        if (Rn(M))
          M.forEach(function(K) {
            return Z.to(q, K, ">");
          }), Z.duration();
        else {
          j = {};
          for (R in M)
            R === "ease" || R === "easeEach" || RT(R, M[R], j, M.easeEach);
          for (R in j)
            for (ft = j[R].sort(function(K, P) {
              return K.t - P.t;
            }), lt = 0, B = 0; B < ft.length; B++)
              pt = ft[B], et = {
                ease: pt.e,
                duration: (pt.t - (B ? ft[B - 1].t : 0)) / 100 * _
              }, et[R] = pt.v, Z.to(q, et, lt), lt += et.duration;
          Z.duration() < _ && Z.to({}, {
            duration: _ - Z.duration()
          });
        }
      }
      _ || d.duration(_ = Z.duration());
    } else
      d.timeline = 0;
    return b === !0 && !Y0 && (ba = Bi(d), Ne.killTweensOf(q), ba = 0), mi(G, Bi(d), c), s.reversed && d.reverse(), s.paused && d.paused(!0), (v || !_ && !M && d._start === De(G._time) && In(v) && rT(Bi(d)) && G.data !== "nested") && (d._tTime = -pe, d.render(Math.max(0, -p) || 0)), w && B1(Bi(d), w), d;
  }
  var u = i.prototype;
  return u.render = function(s, c, h) {
    var d = this._time, g = this._tDur, _ = this._dur, p = s < 0, v = s > g - pe && !p ? g : s < pe ? 0 : s, S, b, M, T, w, G, q, Z;
    if (!_)
      oT(this, s, c, h);
    else if (v !== this._tTime || !s || h || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== p || this._lazy) {
      if (S = v, Z = this.timeline, this._repeat) {
        if (T = _ + this._rDelay, this._repeat < -1 && p)
          return this.totalTime(T * 100 + s, c, h);
        if (S = De(v % T), v === g ? (M = this._repeat, S = _) : (w = De(v / T), M = ~~w, M && M === w ? (S = _, M--) : S > _ && (S = _)), G = this._yoyo && M & 1, G && (S = _ - S), w = Ar(this._tTime, T), S === d && !h && this._initted && M === w)
          return this._tTime = v, this;
        M !== w && this.vars.repeatRefresh && !G && !this._lock && S !== T && this._initted && (this._lock = h = 1, this.render(De(T * M), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (L1(this, p ? s : S, h, c, v))
          return this._tTime = 0, this;
        if (d !== this._time && !(h && this.vars.repeatRefresh && M !== w))
          return this;
        if (_ !== this._dur)
          return this.render(s, c, h);
      }
      if (this._rEase) {
        var B = S < d;
        if (B !== this._inv) {
          var j = B ? d : _ - d;
          this._inv = B, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = d, this._invRecip = j ? (B ? -1 : 1) / j : 0, this._invScale = B ? -this.ratio : 1 - this.ratio, this._invEase = B ? this._rEase : this._ease;
        }
        this.ratio = q = this._invRatio + this._invScale * this._invEase((S - this._invTime) * this._invRecip);
      } else
        this.ratio = q = this._ease(S / _);
      if (this._from && (this.ratio = q = 1 - q), this._tTime = v, this._time = S, !this._act && this._ts && (this._act = 1, this._lazy = 0), !d && v && !c && !w && (Sl(this, "onStart"), this._tTime !== v))
        return this;
      for (b = this._pt; b; )
        b.r(q, b.d), b = b._next;
      Z && Z.render(s < 0 ? s : Z._dur * Z._ease(S / this._dur), c, h) || this._startAt && (this._zTime = s), this._onUpdate && !c && (p && g0(this, s, c, h), Sl(this, "onUpdate")), this._repeat && M !== w && this.vars.onRepeat && !c && this.parent && Sl(this, "onRepeat"), (v === this._tDur || !v) && this._tTime === v && (p && !this._onUpdate && g0(this, s, !0, !0), (s || !_) && (v === this._tDur && this._ts > 0 || !v && this._ts < 0) && Ca(this, 1), !c && !(p && !d) && (v || d || G) && (Sl(this, v === g ? "onComplete" : "onReverseComplete", !0), this._prom && !(v < g && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, u.targets = function() {
    return this._targets;
  }, u.invalidate = function(s) {
    return (!s || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(s), f.prototype.invalidate.call(this, s);
  }, u.resetTo = function(s, c, h, d, g) {
    eo || yl.wake(), this._ts || this.play();
    var _ = Math.min(this._dur, (this._dp._time - this._start) * this._ts), p;
    return this._initted || K0(this, _), p = this._ease(_ / this._dur), wT(this, s, c, h, d, p, _, g) ? this.resetTo(s, c, h, d, 1) : (vf(this, 0), this.parent || H1(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, u.kill = function(s, c) {
    if (c === void 0 && (c = "all"), !s && (!c || c === "all"))
      return this._lazy = this._pt = 0, this.parent ? Rs(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Tn), this;
    if (this.timeline) {
      var h = this.timeline.totalDuration();
      return this.timeline.killTweensOf(s, c, ba && ba.vars.overwrite !== !0)._first || Rs(this), this.parent && h !== this.timeline.totalDuration() && wr(this, this._dur * this.timeline._tDur / h, 0, 1), this;
    }
    var d = this._targets, g = s ? Xl(s) : d, _ = this._ptLookup, p = this._pt, v, S, b, M, T, w, G;
    if ((!c || c === "all") && aT(d, g))
      return c === "all" && (this._pt = 0), Rs(this);
    for (v = this._op = this._op || [], c !== "all" && (fn(c) && (T = {}, tl(c, function(q) {
      return T[q] = 1;
    }), c = T), c = CT(d, c)), G = d.length; G--; )
      if (~g.indexOf(d[G])) {
        S = _[G], c === "all" ? (v[G] = c, M = S, b = {}) : (b = v[G] = v[G] || {}, M = c);
        for (T in M)
          w = S && S[T], w && ((!("kill" in w.d) || w.d.kill(T) === !0) && pf(this, w, "_pt"), delete S[T]), b !== "all" && (b[T] = 1);
      }
    return this._initted && !this._pt && p && Rs(this), this;
  }, i.to = function(s, c) {
    return new i(s, c, arguments[2]);
  }, i.from = function(s, c) {
    return Gs(1, arguments);
  }, i.delayedCall = function(s, c, h, d) {
    return new i(c, 0, {
      immediateRender: !1,
      lazy: !1,
      overwrite: !1,
      delay: s,
      onComplete: c,
      onReverseComplete: c,
      onCompleteParams: h,
      onReverseCompleteParams: h,
      callbackScope: d
    });
  }, i.fromTo = function(s, c, h) {
    return Gs(2, arguments);
  }, i.set = function(s, c) {
    return c.duration = 0, c.repeatDelay || (c.repeat = 0), new i(s, c);
  }, i.killTweensOf = function(s, c, h) {
    return Ne.killTweensOf(s, c, h);
  }, i;
})(no);
xl(We.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
tl("staggerTo,staggerFrom,staggerFromTo", function(f) {
  We[f] = function() {
    var i = new Wn(), u = p0.call(arguments, 0);
    return u.splice(f === "staggerFromTo" ? 5 : 4, 0, 0), i[f].apply(i, u);
  };
});
var J0 = function(i, u, a) {
  return i[u] = a;
}, ey = function(i, u, a) {
  return i[u](a);
}, DT = function(i, u, a, s) {
  return i[u](s.fp, a);
}, NT = function(i, u, a) {
  return i.setAttribute(u, a);
}, k0 = function(i, u) {
  return Le(i[u]) ? ey : B0(i[u]) && i.setAttribute ? NT : J0;
}, ny = function(i, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * i) * 1e6) / 1e6, u);
}, UT = function(i, u) {
  return u.set(u.t, u.p, !!(u.s + u.c * i), u);
}, ly = function(i, u) {
  var a = u._pt, s = "";
  if (!i && u.b)
    s = u.b;
  else if (i === 1 && u.e)
    s = u.e;
  else {
    for (; a; )
      s = a.p + (a.m ? a.m(a.s + a.c * i) : Math.round((a.s + a.c * i) * 1e4) / 1e4) + s, a = a._next;
    s += u.c;
  }
  u.set(u.t, u.p, s, u);
}, F0 = function(i, u) {
  for (var a = u._pt; a; )
    a.r(i, a.d), a = a._next;
}, HT = function(i, u, a, s) {
  for (var c = this._pt, h; c; )
    h = c._next, c.p === s && c.modifier(i, u, a), c = h;
}, YT = function(i) {
  for (var u = this._pt, a, s; u; )
    s = u._next, u.p === i && !u.op || u.op === i ? pf(this, u, "_pt") : u.dep || (a = 1), u = s;
  return !a;
}, BT = function(i, u, a, s) {
  s.mSet(i, u, s.m.call(s.tween, a, s.mt), s);
}, iy = function(i) {
  for (var u = i._pt, a, s, c, h; u; ) {
    for (a = u._next, s = c; s && s.pr > u.pr; )
      s = s._next;
    (u._prev = s ? s._prev : h) ? u._prev._next = u : c = u, (u._next = s) ? s._prev = u : h = u, u = a;
  }
  i._pt = c;
}, el = /* @__PURE__ */ (function() {
  function f(u, a, s, c, h, d, g, _, p) {
    this.t = a, this.s = c, this.c = h, this.p = s, this.r = d || ny, this.d = g || this, this.set = _ || J0, this.pr = p || 0, this._next = u, u && (u._prev = this);
  }
  var i = f.prototype;
  return i.modifier = function(a, s, c) {
    this.mSet = this.mSet || this.set, this.set = BT, this.m = a, this.mt = c, this.tween = s;
  }, f;
})();
tl(V0 + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(f) {
  return G0[f] = 1;
});
El.TweenMax = El.TweenLite = We;
El.TimelineLite = El.TimelineMax = Wn;
Ne = new Wn({
  sortChildren: !1,
  defaults: Ws,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Tl.stringFilter = P1;
var mu = [], kc = {}, LT = [], Xv = 0, qT = 0, e0 = function(i) {
  return (kc[i] || LT).map(function(u) {
    return u();
  });
}, lo = function() {
  var i = Date.now(), u = [];
  i - Xv > 2 && (e0("matchMediaInit"), mu.forEach(function(a) {
    var s = a.queries, c = a.conditions, h, d, g, _;
    for (d in s)
      h = hi.matchMedia(s[d]).matches, h && (g = 1), h !== c[d] && (c[d] = h, _ = 1);
    _ && (a.revert(), g && u.push(a));
  }), e0("matchMediaRevert"), u.forEach(function(a) {
    return a.onMatch(a, function(s) {
      return a.add(null, s);
    });
  }), Xv = i, e0("matchMedia"));
}, ay = /* @__PURE__ */ (function() {
  function f(u, a) {
    this.selector = a && _0(a), this.data = [], this._r = [], this.isReverted = !1, this.id = qT++, u && this.add(u);
  }
  var i = f.prototype;
  return i.add = function(a, s, c) {
    Le(a) && (c = s, s = a, a = Le);
    var h = this, d = function() {
      var _ = we, p = h.selector, v;
      return _ && _ !== h && _.data.push(h), c && (h.selector = _0(c)), we = h, v = s.apply(h, arguments), Le(v) && h._r.push(v), we = _, h.selector = p, h.isReverted = !1, v;
    };
    return h.last = d, a === Le ? d(h, function(g) {
      return h.add(null, g);
    }) : a ? h[a] = d : d;
  }, i.ignore = function(a) {
    var s = we;
    we = null, a(this), we = s;
  }, i.getTweens = function() {
    var a = [];
    return this.data.forEach(function(s) {
      return s instanceof f ? a.push.apply(a, s.getTweens()) : s instanceof We && !(s.parent && s.parent.data === "nested") && a.push(s);
    }), a;
  }, i.clear = function() {
    this._r.length = this.data.length = 0;
  }, i.kill = function(a, s) {
    var c = this;
    if (a ? (function() {
      for (var d = c.getTweens(), g = c.data.length, _; g--; )
        _ = c.data[g], _.data === "isFlip" && (_.revert(), _.getChildren(!0, !0, !1).forEach(function(p) {
          return d.splice(d.indexOf(p), 1);
        }));
      for (d.map(function(p) {
        return {
          g: p._dur || p._delay || p._sat && !p._sat.vars.immediateRender ? p.globalTime(0) : -1 / 0,
          t: p
        };
      }).sort(function(p, v) {
        return v.g - p.g || -1 / 0;
      }).forEach(function(p) {
        return p.t.revert(a);
      }), g = c.data.length; g--; )
        _ = c.data[g], _ instanceof Wn ? _.data !== "nested" && (_.scrollTrigger && _.scrollTrigger.revert(), _.kill()) : !(_ instanceof We) && _.revert && _.revert(a);
      c._r.forEach(function(p) {
        return p(a, c);
      }), c.isReverted = !0;
    })() : this.data.forEach(function(d) {
      return d.kill && d.kill();
    }), this.clear(), s) {
      for (var h = mu.length; h--; )
        mu[h].id === this.id && mu.splice(h, 1);
      this._mqs && this._mqs.forEach(function(d) {
        return d.removeListener ? d.removeListener(lo) : d.removeEventListener("change", lo);
      }), this._mqs = null;
    }
  }, i.revert = function(a) {
    this.kill(a || {});
  }, f;
})(), XT = /* @__PURE__ */ (function() {
  function f(u) {
    this.contexts = [], this.scope = u, we && we.data.push(this);
  }
  var i = f.prototype;
  return i.add = function(a, s, c) {
    vi(a) || (a = {
      matches: a
    });
    var h = new ay(0, c || this.scope), d = h.conditions = {}, g, _, p;
    we && !h.selector && (h.selector = we.selector), this.contexts.push(h), s = h.add("onMatch", s), h.queries = a;
    for (_ in a)
      _ === "all" ? p = 1 : (g = hi.matchMedia(a[_]), g && (mu.indexOf(h) < 0 && mu.push(h), (d[_] = g.matches) && (p = 1), g.addListener ? g.addListener(lo) : g.addEventListener("change", lo), (h._mqs || (h._mqs = [])).push(g)));
    return p && s(h, function(v) {
      return h.add(null, v);
    }), this;
  }, i.revert = function(a) {
    this.kill(a || {});
  }, i.kill = function(a) {
    this.contexts.forEach(function(s) {
      return s.kill(a, !0);
    });
  }, f;
})(), of = {
  registerPlugin: function() {
    for (var i = arguments.length, u = new Array(i), a = 0; a < i; a++)
      u[a] = arguments[a];
    u.forEach(function(s) {
      return J1(s);
    });
  },
  timeline: function(i) {
    return new Wn(i);
  },
  getTweensOf: function(i, u) {
    return Ne.getTweensOf(i, u);
  },
  getProperty: function(i, u, a, s) {
    fn(i) && (i = Xl(i)[0]);
    var c = fu(i || {}).get, h = a ? U1 : N1;
    return a === "native" && (a = ""), i && (u ? h((_l[u] && _l[u].get || c)(i, u, a, s)) : function(d, g, _) {
      return h((_l[d] && _l[d].get || c)(i, d, g, _));
    });
  },
  quickSetter: function(i, u, a) {
    if (i = Xl(i), i.length > 1) {
      var s = i.map(function(p) {
        return ll.quickSetter(p, u, a);
      }), c = s.length;
      return function(p) {
        for (var v = c; v--; )
          s[v](p);
      };
    }
    i = i[0] || {};
    var h = _l[u], d = fu(i), g = d.harness && (d.harness.aliases || {})[u] || u, _ = h ? function(p) {
      var v = new h();
      vr._pt = 0, v.init(i, a ? p + a : p, vr, 0, [i]), v.render(1, v), vr._pt && F0(1, vr);
    } : d.set(i, g);
    return h ? _ : function(p) {
      return _(i, g, a ? p + a : p, d, 1);
    };
  },
  quickTo: function(i, u, a) {
    var s, c = ll.to(i, xl((s = {}, s[u] = "+=0.1", s.paused = !0, s.stagger = 0, s), a || {})), h = function(g, _, p) {
      return c.resetTo(u, g, _, p);
    };
    return h.tween = c, h;
  },
  isTweening: function(i) {
    return Ne.getTweensOf(i, !0).length > 0;
  },
  defaults: function(i) {
    return i && i.ease && (i.ease = du(i.ease, Ws.ease)), Hv(Ws, i || {});
  },
  config: function(i) {
    return Hv(Tl, i || {});
  },
  registerEffect: function(i) {
    var u = i.name, a = i.effect, s = i.plugins, c = i.defaults, h = i.extendTimeline;
    (s || "").split(",").forEach(function(d) {
      return d && !_l[d] && !El[d] && $s(u + " effect requires " + d + " plugin.");
    }), Wd[u] = function(d, g, _) {
      return a(Xl(d), xl(g || {}, c), _);
    }, h && (Wn.prototype[u] = function(d, g, _) {
      return this.add(Wd[u](d, vi(g) ? g : (_ = g) && {}, this), _);
    });
  },
  registerEase: function(i, u) {
    $t[i] = du(u);
  },
  parseEase: function(i, u) {
    return arguments.length ? du(i, u) : $t;
  },
  getById: function(i) {
    return Ne.getById(i);
  },
  exportRoot: function(i, u) {
    i === void 0 && (i = {});
    var a = new Wn(i), s, c;
    for (a.smoothChildTiming = In(i.smoothChildTiming), Ne.remove(a), a._dp = 0, a._time = a._tTime = Ne._time, s = Ne._first; s; )
      c = s._next, (u || !(!s._dur && s instanceof We && s.vars.onComplete === s._targets[0])) && mi(a, s, s._start - s._delay), s = c;
    return mi(Ne, a, 0), a;
  },
  context: function(i, u) {
    return i ? new ay(i, u) : we;
  },
  matchMedia: function(i) {
    return new XT(i);
  },
  matchMediaRefresh: function() {
    return mu.forEach(function(i) {
      var u = i.conditions, a, s;
      for (s in u)
        u[s] && (u[s] = !1, a = 1);
      a && i.revert();
    }) || lo();
  },
  addEventListener: function(i, u) {
    var a = kc[i] || (kc[i] = []);
    ~a.indexOf(u) || a.push(u);
  },
  removeEventListener: function(i, u) {
    var a = kc[i], s = a && a.indexOf(u);
    s >= 0 && a.splice(s, 1);
  },
  utils: {
    wrap: _T,
    wrapYoyo: vT,
    distribute: G1,
    random: j1,
    snap: V1,
    normalize: pT,
    getUnit: wn,
    clamp: hT,
    splitColor: k1,
    toArray: Xl,
    selector: _0,
    mapRange: Z1,
    pipe: mT,
    unitize: gT,
    interpolate: yT,
    shuffle: X1
  },
  install: A1,
  effects: Wd,
  ticker: yl,
  updateRoot: Wn.updateRoot,
  plugins: _l,
  globalTimeline: Ne,
  core: {
    PropTween: el,
    globals: w1,
    Tween: We,
    Timeline: Wn,
    Animation: no,
    getCache: fu,
    _removeLinkedListItem: pf,
    reverting: function() {
      return Tn;
    },
    context: function(i) {
      return i && we && (we.data.push(i), i._ctx = we), we;
    },
    suppressOverwrites: function(i) {
      return Y0 = i;
    }
  }
};
tl("to,from,fromTo,delayedCall,set,killTweensOf", function(f) {
  return of[f] = We[f];
});
yl.add(Wn.updateRoot);
vr = of.to({}, {
  duration: 0
});
var GT = function(i, u) {
  for (var a = i._pt; a && a.p !== u && a.op !== u && a.fp !== u; )
    a = a._next;
  return a;
}, VT = function(i, u) {
  var a = i._targets, s, c, h;
  for (s in u)
    for (c = a.length; c--; )
      h = i._ptLookup[c][s], h && (h = h.d) && (h._pt && (h = GT(h, s)), h && h.modifier && h.modifier(u[s], i, a[c], s));
}, n0 = function(i, u) {
  return {
    name: i,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(s, c, h) {
      h._onInit = function(d) {
        var g, _;
        if (fn(c) && (g = {}, tl(c, function(p) {
          return g[p] = 1;
        }), c = g), u) {
          g = {};
          for (_ in c)
            g[_] = u(c[_]);
          c = g;
        }
        VT(d, c);
      };
    }
  };
}, ll = of.registerPlugin({
  name: "attr",
  init: function(i, u, a, s, c) {
    var h, d, g;
    this.tween = a;
    for (h in u)
      g = i.getAttribute(h) || "", d = this.add(i, "setAttribute", (g || 0) + "", u[h], s, c, 0, 0, h), d.op = h, d.b = g, this._props.push(h);
  },
  render: function(i, u) {
    for (var a = u._pt; a; )
      Tn ? a.set(a.t, a.p, a.b, a) : a.r(i, a.d), a = a._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(i, u) {
    for (var a = u.length; a--; )
      this.add(i, a, i[a] || 0, u[a], 0, 0, 0, 0, 0, 1);
  }
}, n0("roundProps", v0), n0("modifiers"), n0("snap", V1)) || of;
We.version = Wn.version = ll.version = "3.15.1";
z1 = 1;
L0() && Cr();
$t.Power0;
$t.Power1;
$t.Power2;
$t.Power3;
$t.Power4;
$t.Linear;
$t.Quad;
$t.Cubic;
$t.Quart;
$t.Quint;
$t.Strong;
$t.Elastic;
$t.Back;
$t.SteppedEase;
$t.Bounce;
$t.Sine;
$t.Expo;
$t.Circ;
var Gv, Ta, br, P0, ou, Vv, W0, jT = function() {
  return typeof window < "u";
}, ji = {}, uu = 180 / Math.PI, Tr = Math.PI / 180, fr = Math.atan2, jv = 1e8, $0 = /([A-Z])/g, QT = /(left|right|width|margin|padding|x)/i, ZT = /[\s,\(]\S/, gi = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, S0 = function(i, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u, u);
}, KT = function(i, u) {
  return u.set(u.t, u.p, i === 1 ? u.e : Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u, u);
}, JT = function(i, u) {
  return u.set(u.t, u.p, i ? Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u : u.b, u);
}, kT = function(i, u) {
  return u.set(u.t, u.p, i === 1 ? u.e : i ? Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u : u.b, u);
}, FT = function(i, u) {
  var a = u.s + u.c * i;
  u.set(u.t, u.p, ~~(a + (a < 0 ? -0.5 : 0.5)) + u.u, u);
}, uy = function(i, u) {
  return u.set(u.t, u.p, i ? u.e : u.b, u);
}, ry = function(i, u) {
  return u.set(u.t, u.p, i !== 1 ? u.b : u.e, u);
}, PT = function(i, u, a) {
  return i.style[u] = a;
}, WT = function(i, u, a) {
  return i.style.setProperty(u, a);
}, $T = function(i, u, a) {
  return i._gsap[u] = a;
}, IT = function(i, u, a) {
  return i._gsap.scaleX = i._gsap.scaleY = a;
}, tE = function(i, u, a, s, c) {
  var h = i._gsap;
  h.scaleX = h.scaleY = a, h.renderTransform(c, h);
}, eE = function(i, u, a, s, c) {
  var h = i._gsap;
  h[u] = a, h.renderTransform(c, h);
}, Ue = "transform", nl = Ue + "Origin", nE = function f(i, u) {
  var a = this, s = this.target, c = s.style, h = s._gsap;
  if (i in ji && c) {
    if (this.tfm = this.tfm || {}, i !== "transform")
      i = gi[i] || i, ~i.indexOf(",") ? i.split(",").forEach(function(d) {
        return a.tfm[d] = Li(s, d);
      }) : this.tfm[i] = h.x ? h[i] : Li(s, i), i === nl && (this.tfm.zOrigin = h.zOrigin);
    else
      return gi.transform.split(",").forEach(function(d) {
        return f.call(a, d, u);
      });
    if (this.props.indexOf(Ue) >= 0)
      return;
    h.svg && (this.svgo = s.getAttribute("data-svg-origin"), this.props.push(nl, u, "")), i = Ue;
  }
  (c || u) && this.props.push(i, u, c[i]);
}, sy = function(i) {
  i.translate && (i.removeProperty("translate"), i.removeProperty("scale"), i.removeProperty("rotate"));
}, lE = function() {
  var i = this.props, u = this.target, a = u.style, s = u._gsap, c, h;
  for (c = 0; c < i.length; c += 3)
    i[c + 1] ? i[c + 1] === 2 ? u[i[c]](i[c + 2]) : u[i[c]] = i[c + 2] : i[c + 2] ? a[i[c]] = i[c + 2] : a.removeProperty(i[c].substr(0, 2) === "--" ? i[c] : i[c].replace($0, "-$1").toLowerCase());
  if (this.tfm) {
    for (h in this.tfm)
      s[h] = this.tfm[h];
    s.svg && (s.renderTransform(), u.setAttribute("data-svg-origin", this.svgo || "")), c = W0(), (!c || !c.isStart) && !a[Ue] && (sy(a), s.zOrigin && a[nl] && (a[nl] += " " + s.zOrigin + "px", s.zOrigin = 0, s.renderTransform()), s.uncache = 1);
  }
}, oy = function(i, u) {
  var a = {
    target: i,
    props: [],
    revert: lE,
    save: nE
  };
  return i._gsap || ll.core.getCache(i), u && i.style && i.nodeType && u.split(",").forEach(function(s) {
    return a.save(s);
  }), a;
}, cy, b0 = function(i, u) {
  var a = Ta.createElementNS ? Ta.createElementNS((u || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), i) : Ta.createElement(i);
  return a && a.style ? a : Ta.createElement(i);
}, bl = function f(i, u, a) {
  var s = getComputedStyle(i);
  return s[u] || s.getPropertyValue(u.replace($0, "-$1").toLowerCase()) || s.getPropertyValue(u) || !a && f(i, Rr(u) || u, 1) || "";
}, Qv = "O,Moz,ms,Ms,Webkit".split(","), Rr = function(i, u, a) {
  var s = u || ou, c = s.style, h = 5;
  if (i in c && !a)
    return i;
  for (i = i.charAt(0).toUpperCase() + i.substr(1); h-- && !(Qv[h] + i in c); )
    ;
  return h < 0 ? null : (h === 3 ? "ms" : h >= 0 ? Qv[h] : "") + i;
}, T0 = function() {
  jT() && window.document && (Gv = window, Ta = Gv.document, br = Ta.documentElement, ou = b0("div") || {
    style: {}
  }, b0("div"), Ue = Rr(Ue), nl = Ue + "Origin", ou.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", cy = !!Rr("perspective"), W0 = ll.core.reverting, P0 = 1);
}, Zv = function(i) {
  var u = i.ownerSVGElement, a = b0("svg", u && u.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), s = i.cloneNode(!0), c;
  s.style.display = "block", a.appendChild(s), br.appendChild(a);
  try {
    c = s.getBBox();
  } catch {
  }
  return a.removeChild(s), br.removeChild(a), c;
}, Kv = function(i, u) {
  for (var a = u.length; a--; )
    if (i.hasAttribute(u[a]))
      return i.getAttribute(u[a]);
}, fy = function(i) {
  var u, a;
  try {
    u = i.getBBox();
  } catch {
    u = Zv(i), a = 1;
  }
  return u && (u.width || u.height) || a || (u = Zv(i)), u && !u.width && !u.x && !u.y ? {
    x: +Kv(i, ["x", "cx", "x1"]) || 0,
    y: +Kv(i, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : u;
}, hy = function(i) {
  return !!(i.getCTM && (!i.parentNode || i.ownerSVGElement) && fy(i));
}, Ra = function(i, u) {
  if (u) {
    var a = i.style, s;
    u in ji && u !== nl && (u = Ue), a.removeProperty ? (s = u.substr(0, 2), (s === "ms" || u.substr(0, 6) === "webkit") && (u = "-" + u), a.removeProperty(s === "--" ? u : u.replace($0, "-$1").toLowerCase())) : a.removeAttribute(u);
  }
}, Ea = function(i, u, a, s, c, h) {
  var d = new el(i._pt, u, a, 0, 1, h ? ry : uy);
  return i._pt = d, d.b = s, d.e = c, i._props.push(a), d;
}, Jv = {
  deg: 1,
  rad: 1,
  turn: 1
}, iE = {
  grid: 1,
  flex: 1
}, Da = function f(i, u, a, s) {
  var c = parseFloat(a) || 0, h = (a + "").trim().substr((c + "").length) || "px", d = ou.style, g = QT.test(u), _ = i.tagName.toLowerCase() === "svg", p = (_ ? "client" : "offset") + (g ? "Width" : "Height"), v = 100, S = s === "px", b = s === "%", M, T, w, G;
  if (s === h || !c || Jv[s] || Jv[h])
    return c;
  if (h !== "px" && !S && (c = f(i, u, a, "px")), G = i.getCTM && hy(i), (b || h === "%") && (ji[u] || ~u.indexOf("adius")))
    return M = G ? i.getBBox()[g ? "width" : "height"] : i[p], Xe(b ? c / M * v : c / 100 * M);
  if (d[g ? "width" : "height"] = v + (S ? h : s), T = s !== "rem" && ~u.indexOf("adius") || s === "em" && i.appendChild && !_ ? i : i.parentNode, G && (T = (i.ownerSVGElement || {}).parentNode), (!T || T === Ta || !T.appendChild) && (T = Ta.body), w = T._gsap, w && b && w.width && g && w.time === yl.time && !w.uncache)
    return Xe(c / w.width * v);
  if (b && (u === "height" || u === "width")) {
    var q = i.style[u];
    i.style[u] = v + s, M = i[p], q ? i.style[u] = q : Ra(i, u);
  } else
    (b || h === "%") && !iE[bl(T, "display")] && (d.position = bl(i, "position")), T === i && (d.position = "static"), T.appendChild(ou), M = ou[p], T.removeChild(ou), d.position = "absolute";
  return g && b && (w = fu(T), w.time = yl.time, w.width = T[p]), Xe(S ? M * c / v : M && c ? v / M * c : 0);
}, Li = function(i, u, a, s) {
  var c;
  return P0 || T0(), u in gi && u !== "transform" && (u = gi[u], ~u.indexOf(",") && (u = u.split(",")[0])), ji[u] && u !== "transform" ? (c = ao(i, s), c = u !== "transformOrigin" ? c[u] : c.svg ? c.origin : ff(bl(i, nl)) + " " + c.zOrigin + "px") : (c = i.style[u], (!c || c === "auto" || s || ~(c + "").indexOf("calc(")) && (c = cf[u] && cf[u](i, u, a) || bl(i, u) || R1(i, u) || (u === "opacity" ? 1 : 0))), a && !~(c + "").trim().indexOf(" ") ? Da(i, u, c, a) + a : c;
}, aE = function(i, u, a, s) {
  if (!a || a === "none") {
    var c = Rr(u, i, 1), h = c && bl(i, c, 1);
    h && h !== a ? (u = c, a = h) : u === "borderColor" && (a = bl(i, "borderTopColor"));
  }
  var d = new el(this._pt, i.style, u, 0, 1, ly), g = 0, _ = 0, p, v, S, b, M, T, w, G, q, Z, B, j;
  if (d.b = a, d.e = s, a += "", s += "", s.substring(0, 6) === "var(--" && (s = bl(i, s.substring(4, s.indexOf(")")))), s === "auto" && (T = i.style[u], i.style[u] = s, s = bl(i, u) || s, T ? i.style[u] = T : Ra(i, u)), p = [a, s], P1(p), a = p[0], s = p[1], S = a.match(_r) || [], j = s.match(_r) || [], j.length) {
    for (; v = _r.exec(s); )
      w = v[0], q = s.substring(g, v.index), M ? M = (M + 1) % 5 : (q.substr(-5) === "rgba(" || q.substr(-5) === "hsla(") && (M = 1), w !== (T = S[_++] || "") && (b = parseFloat(T) || 0, B = T.substr((b + "").length), w.charAt(1) === "=" && (w = Sr(b, w) + B), G = parseFloat(w), Z = w.substr((G + "").length), g = _r.lastIndex - Z.length, Z || (Z = Z || Tl.units[u] || B, g === s.length && (s += Z, d.e += Z)), B !== Z && (b = Da(i, u, T, Z) || 0), d._pt = {
        _next: d._pt,
        p: q || _ === 1 ? q : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: b,
        c: G - b,
        m: M && M < 4 || u === "zIndex" ? Math.round : 0
      });
    d.c = g < s.length ? s.substring(g, s.length) : "";
  } else
    d.r = u === "display" && s === "none" ? ry : uy;
  return O1.test(s) && (d.e = 0), this._pt = d, d;
}, kv = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, uE = function(i) {
  var u = i.split(" "), a = u[0], s = u[1] || "50%";
  return (a === "top" || a === "bottom" || s === "left" || s === "right") && (i = a, a = s, s = i), u[0] = kv[a] || a, u[1] = kv[s] || s, u.join(" ");
}, rE = function(i, u) {
  if (u.tween && u.tween._time === u.tween._dur) {
    var a = u.t, s = a.style, c = u.u, h = a._gsap, d, g, _;
    if (c === "all" || c === !0)
      s.cssText = "", g = 1;
    else
      for (c = c.split(","), _ = c.length; --_ > -1; )
        d = c[_], ji[d] && (g = 1, d = d === "transformOrigin" ? nl : Ue), Ra(a, d);
    g && (Ra(a, Ue), h && (h.svg && a.removeAttribute("transform"), s.scale = s.rotate = s.translate = "none", ao(a, 1), h.uncache = 1, sy(s)));
  }
}, cf = {
  clearProps: function(i, u, a, s, c) {
    if (c.data !== "isFromStart") {
      var h = i._pt = new el(i._pt, u, a, 0, 0, rE);
      return h.u = s, h.pr = -10, h.tween = c, i._props.push(a), 1;
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
}, io = [1, 0, 0, 1, 0, 0], dy = {}, my = function(i) {
  return i === "matrix(1, 0, 0, 1, 0, 0)" || i === "none" || !i;
}, Fv = function(i) {
  var u = bl(i, Ue);
  return my(u) ? io : u.substr(7).match(M1).map(Xe);
}, I0 = function(i, u) {
  var a = i._gsap || fu(i), s = i.style, c = Fv(i), h, d, g, _;
  return a.svg && i.getAttribute("transform") ? (g = i.transform.baseVal.consolidate().matrix, c = [g.a, g.b, g.c, g.d, g.e, g.f], c.join(",") === "1,0,0,1,0,0" ? io : c) : (c === io && !i.offsetParent && i !== br && !a.svg && (g = s.display, s.display = "block", h = i.parentNode, (!h || !i.offsetParent && !i.getBoundingClientRect().width) && (_ = 1, d = i.nextElementSibling, br.appendChild(i)), c = Fv(i), g ? s.display = g : Ra(i, "display"), _ && (d ? h.insertBefore(i, d) : h ? h.appendChild(i) : br.removeChild(i))), u && c.length > 6 ? [c[0], c[1], c[4], c[5], c[12], c[13]] : c);
}, E0 = function(i, u, a, s, c, h) {
  var d = i._gsap, g = c || I0(i, !0), _ = d.xOrigin || 0, p = d.yOrigin || 0, v = d.xOffset || 0, S = d.yOffset || 0, b = g[0], M = g[1], T = g[2], w = g[3], G = g[4], q = g[5], Z = u.split(" "), B = parseFloat(Z[0]) || 0, j = parseFloat(Z[1]) || 0, k, R, Q, $;
  a ? g !== io && (R = b * w - M * T) && (Q = B * (w / R) + j * (-T / R) + (T * q - w * G) / R, $ = B * (-M / R) + j * (b / R) - (b * q - M * G) / R, B = Q, j = $) : (k = fy(i), B = k.x + (~Z[0].indexOf("%") ? B / 100 * k.width : B), j = k.y + (~(Z[1] || Z[0]).indexOf("%") ? j / 100 * k.height : j)), s || s !== !1 && d.smooth ? (G = B - _, q = j - p, d.xOffset = v + (G * b + q * T) - G, d.yOffset = S + (G * M + q * w) - q) : d.xOffset = d.yOffset = 0, d.xOrigin = B, d.yOrigin = j, d.smooth = !!s, d.origin = u, d.originIsAbsolute = !!a, i.style[nl] = "0px 0px", h && (Ea(h, d, "xOrigin", _, B), Ea(h, d, "yOrigin", p, j), Ea(h, d, "xOffset", v, d.xOffset), Ea(h, d, "yOffset", S, d.yOffset)), i.setAttribute("data-svg-origin", B + " " + j);
}, ao = function(i, u) {
  var a = i._gsap || new $1(i);
  if ("x" in a && !u && !a.uncache)
    return a;
  var s = i.style, c = a.scaleX < 0, h = "px", d = "deg", g = getComputedStyle(i), _ = bl(i, nl) || "0", p, v, S, b, M, T, w, G, q, Z, B, j, k, R, Q, $, V, nt, lt, ft, pt, et, K, P, I, st, z, _t, dt, Mt, x, O;
  return p = v = S = T = w = G = q = Z = B = 0, b = M = 1, a.svg = !!(i.getCTM && hy(i)), g.translate && ((g.translate !== "none" || g.scale !== "none" || g.rotate !== "none") && (s[Ue] = (g.translate !== "none" ? "translate3d(" + (g.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (g.rotate !== "none" ? "rotate(" + g.rotate + ") " : "") + (g.scale !== "none" ? "scale(" + g.scale.split(" ").join(",") + ") " : "") + (g[Ue] !== "none" ? g[Ue] : "")), s.scale = s.rotate = s.translate = "none"), R = I0(i, a.svg), a.svg && (a.uncache ? (I = i.getBBox(), _ = a.xOrigin - I.x + "px " + (a.yOrigin - I.y) + "px", P = "") : P = !u && i.getAttribute("data-svg-origin"), E0(i, P || _, !!P || a.originIsAbsolute, a.smooth !== !1, R)), j = a.xOrigin || 0, k = a.yOrigin || 0, R !== io && (nt = R[0], lt = R[1], ft = R[2], pt = R[3], p = et = R[4], v = K = R[5], R.length === 6 ? (b = Math.sqrt(nt * nt + lt * lt), M = Math.sqrt(pt * pt + ft * ft), T = nt || lt ? fr(lt, nt) * uu : 0, q = ft || pt ? fr(ft, pt) * uu + T : 0, q && (M *= Math.abs(Math.cos(q * Tr))), a.svg && (p -= j - (j * nt + k * ft), v -= k - (j * lt + k * pt))) : (O = R[6], Mt = R[7], z = R[8], _t = R[9], dt = R[10], x = R[11], p = R[12], v = R[13], S = R[14], Q = fr(O, dt), w = Q * uu, Q && ($ = Math.cos(-Q), V = Math.sin(-Q), P = et * $ + z * V, I = K * $ + _t * V, st = O * $ + dt * V, z = et * -V + z * $, _t = K * -V + _t * $, dt = O * -V + dt * $, x = Mt * -V + x * $, et = P, K = I, O = st), Q = fr(-ft, dt), G = Q * uu, Q && ($ = Math.cos(-Q), V = Math.sin(-Q), P = nt * $ - z * V, I = lt * $ - _t * V, st = ft * $ - dt * V, x = pt * V + x * $, nt = P, lt = I, ft = st), Q = fr(lt, nt), T = Q * uu, Q && ($ = Math.cos(Q), V = Math.sin(Q), P = nt * $ + lt * V, I = et * $ + K * V, lt = lt * $ - nt * V, K = K * $ - et * V, nt = P, et = I), w && Math.abs(w) + Math.abs(T) > 359.9 && (w = T = 0, G = 180 - G), b = Xe(Math.sqrt(nt * nt + lt * lt + ft * ft)), M = Xe(Math.sqrt(K * K + O * O)), Q = fr(et, K), q = Math.abs(Q) > 2e-4 ? Q * uu : 0, B = x ? 1 / (x < 0 ? -x : x) : 0), a.svg && (P = i.getAttribute("transform"), a.forceCSS = i.setAttribute("transform", "") || !my(bl(i, Ue)), P && i.setAttribute("transform", P))), Math.abs(q) > 90 && Math.abs(q) < 270 && (c ? (b *= -1, q += T <= 0 ? 180 : -180, T += T <= 0 ? 180 : -180) : (M *= -1, q += q <= 0 ? 180 : -180)), u = u || a.uncache, a.x = p - ((a.xPercent = p && (!u && a.xPercent || (Math.round(i.offsetWidth / 2) === Math.round(-p) ? -50 : 0))) ? i.offsetWidth * a.xPercent / 100 : 0) + h, a.y = v - ((a.yPercent = v && (!u && a.yPercent || (Math.round(i.offsetHeight / 2) === Math.round(-v) ? -50 : 0))) ? i.offsetHeight * a.yPercent / 100 : 0) + h, a.z = S + h, a.scaleX = Xe(b), a.scaleY = Xe(M), a.rotation = Xe(T) + d, a.rotationX = Xe(w) + d, a.rotationY = Xe(G) + d, a.skewX = q + d, a.skewY = Z + d, a.transformPerspective = B + h, (a.zOrigin = parseFloat(_.split(" ")[2]) || !u && a.zOrigin || 0) && (s[nl] = ff(_)), a.xOffset = a.yOffset = 0, a.force3D = Tl.force3D, a.renderTransform = a.svg ? oE : cy ? gy : sE, a.uncache = 0, a;
}, ff = function(i) {
  return (i = i.split(" "))[0] + " " + i[1];
}, l0 = function(i, u, a) {
  var s = wn(u);
  return Xe(parseFloat(u) + parseFloat(Da(i, "x", a + "px", s))) + s;
}, sE = function(i, u) {
  u.z = "0px", u.rotationY = u.rotationX = "0deg", u.force3D = 0, gy(i, u);
}, iu = "0deg", Os = "0px", au = ") ", gy = function(i, u) {
  var a = u || this, s = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.z, _ = a.rotation, p = a.rotationY, v = a.rotationX, S = a.skewX, b = a.skewY, M = a.scaleX, T = a.scaleY, w = a.transformPerspective, G = a.force3D, q = a.target, Z = a.zOrigin, B = "", j = G === "auto" && i && i !== 1 || G === !0;
  if (Z && (v !== iu || p !== iu)) {
    var k = parseFloat(p) * Tr, R = Math.sin(k), Q = Math.cos(k), $;
    k = parseFloat(v) * Tr, $ = Math.cos(k), h = l0(q, h, R * $ * -Z), d = l0(q, d, -Math.sin(k) * -Z), g = l0(q, g, Q * $ * -Z + Z);
  }
  w !== Os && (B += "perspective(" + w + au), (s || c) && (B += "translate(" + s + "%, " + c + "%) "), (j || h !== Os || d !== Os || g !== Os) && (B += g !== Os || j ? "translate3d(" + h + ", " + d + ", " + g + ") " : "translate(" + h + ", " + d + au), _ !== iu && (B += "rotate(" + _ + au), p !== iu && (B += "rotateY(" + p + au), v !== iu && (B += "rotateX(" + v + au), (S !== iu || b !== iu) && (B += "skew(" + S + ", " + b + au), (M !== 1 || T !== 1) && (B += "scale(" + M + ", " + T + au), q.style[Ue] = B || "translate(0, 0)";
}, oE = function(i, u) {
  var a = u || this, s = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.rotation, _ = a.skewX, p = a.skewY, v = a.scaleX, S = a.scaleY, b = a.target, M = a.xOrigin, T = a.yOrigin, w = a.xOffset, G = a.yOffset, q = a.forceCSS, Z = parseFloat(h), B = parseFloat(d), j, k, R, Q, $;
  g = parseFloat(g), _ = parseFloat(_), p = parseFloat(p), p && (p = parseFloat(p), _ += p, g += p), g || _ ? (g *= Tr, _ *= Tr, j = Math.cos(g) * v, k = Math.sin(g) * v, R = Math.sin(g - _) * -S, Q = Math.cos(g - _) * S, _ && (p *= Tr, $ = Math.tan(_ - p), $ = Math.sqrt(1 + $ * $), R *= $, Q *= $, p && ($ = Math.tan(p), $ = Math.sqrt(1 + $ * $), j *= $, k *= $)), j = Xe(j), k = Xe(k), R = Xe(R), Q = Xe(Q)) : (j = v, Q = S, k = R = 0), (Z && !~(h + "").indexOf("px") || B && !~(d + "").indexOf("px")) && (Z = Da(b, "x", h, "px"), B = Da(b, "y", d, "px")), (M || T || w || G) && (Z = Xe(Z + M - (M * j + T * R) + w), B = Xe(B + T - (M * k + T * Q) + G)), (s || c) && ($ = b.getBBox(), Z = Xe(Z + s / 100 * $.width), B = Xe(B + c / 100 * $.height)), $ = "matrix(" + j + "," + k + "," + R + "," + Q + "," + Z + "," + B + ")", b.setAttribute("transform", $), q && (b.style[Ue] = $);
}, cE = function(i, u, a, s, c) {
  var h = 360, d = fn(c), g = parseFloat(c) * (d && ~c.indexOf("rad") ? uu : 1), _ = g - s, p = s + _ + "deg", v, S;
  return d && (v = c.split("_")[1], v === "short" && (_ %= h, _ !== _ % (h / 2) && (_ += _ < 0 ? h : -h)), v === "cw" && _ < 0 ? _ = (_ + h * jv) % h - ~~(_ / h) * h : v === "ccw" && _ > 0 && (_ = (_ - h * jv) % h - ~~(_ / h) * h)), i._pt = S = new el(i._pt, u, a, s, _, KT), S.e = p, S.u = "deg", i._props.push(a), S;
}, Pv = function(i, u) {
  for (var a in u)
    i[a] = u[a];
  return i;
}, fE = function(i, u, a) {
  var s = Pv({}, a._gsap), c = "perspective,force3D,transformOrigin,svgOrigin", h = a.style, d, g, _, p, v, S, b, M;
  s.svg ? (_ = a.getAttribute("transform"), a.setAttribute("transform", ""), h[Ue] = u, d = ao(a, 1), Ra(a, Ue), a.setAttribute("transform", _)) : (_ = getComputedStyle(a)[Ue], h[Ue] = u, d = ao(a, 1), h[Ue] = _);
  for (g in ji)
    _ = s[g], p = d[g], _ !== p && c.indexOf(g) < 0 && (b = wn(_), M = wn(p), v = b !== M ? Da(a, g, _, M) : parseFloat(_), S = parseFloat(p), i._pt = new el(i._pt, d, g, v, S - v, S0), i._pt.u = M || 0, i._props.push(g));
  Pv(d, s);
};
tl("padding,margin,Width,Radius", function(f, i) {
  var u = "Top", a = "Right", s = "Bottom", c = "Left", h = (i < 3 ? [u, a, s, c] : [u + c, u + a, s + a, s + c]).map(function(d) {
    return i < 2 ? f + d : "border" + d + f;
  });
  cf[i > 1 ? "border" + f : f] = function(d, g, _, p, v) {
    var S, b;
    if (arguments.length < 4)
      return S = h.map(function(M) {
        return Li(d, M, _);
      }), b = S.join(" "), b.split(S[0]).length === 5 ? S[0] : b;
    S = (p + "").split(" "), b = {}, h.forEach(function(M, T) {
      return b[M] = S[T] = S[T] || S[(T - 1) / 2 | 0];
    }), d.init(g, b, v);
  };
});
var py = {
  name: "css",
  register: T0,
  targetTest: function(i) {
    return i.style && i.nodeType;
  },
  init: function(i, u, a, s, c) {
    var h = this._props, d = i.style, g = a.vars.startAt, _, p, v, S, b, M, T, w, G, q, Z, B, j, k, R, Q, $;
    P0 || T0(), this.styles = this.styles || oy(i), Q = this.styles.props, this.tween = a;
    for (T in u)
      if (T !== "autoRound" && (p = u[T], !(_l[T] && I1(T, u, a, s, i, c)))) {
        if (b = typeof p, M = cf[T], b === "function" && (p = p.call(a, s, i, c), b = typeof p), b === "string" && ~p.indexOf("random(") && (p = to(p)), M)
          M(this, i, T, p, a) && (R = 1);
        else if (T.substr(0, 2) === "--")
          _ = (getComputedStyle(i).getPropertyValue(T) + "").trim(), p += "", za.lastIndex = 0, za.test(_) || (w = wn(_), G = wn(p), G ? w !== G && (_ = Da(i, T, _, G) + G) : w && (p += w)), this.add(d, "setProperty", _, p, s, c, 0, 0, T), h.push(T), Q.push(T, 0, d[T]);
        else if (b !== "undefined") {
          if (g && T in g ? (_ = typeof g[T] == "function" ? g[T].call(a, s, i, c) : g[T], fn(_) && ~_.indexOf("random(") && (_ = to(_)), wn(_ + "") || _ === "auto" || (_ += Tl.units[T] || wn(Li(i, T)) || ""), (_ + "").charAt(1) === "=" && (_ = Li(i, T))) : _ = Li(i, T), S = parseFloat(_), q = b === "string" && p.charAt(1) === "=" && p.substr(0, 2), q && (p = p.substr(2)), v = parseFloat(p), T in gi && (T === "autoAlpha" && (S === 1 && Li(i, "visibility") === "hidden" && v && (S = 0), Q.push("visibility", 0, d.visibility), Ea(this, d, "visibility", S ? "inherit" : "hidden", v ? "inherit" : "hidden", !v)), T !== "scale" && T !== "transform" && (T = gi[T], ~T.indexOf(",") && (T = T.split(",")[0]))), Z = T in ji, Z) {
            if (this.styles.save(T), $ = p, b === "string" && p.substring(0, 6) === "var(--") {
              if (p = bl(i, p.substring(4, p.indexOf(")"))), p.substring(0, 5) === "calc(") {
                var V = i.style.perspective;
                i.style.perspective = p, p = bl(i, "perspective"), V ? i.style.perspective = V : Ra(i, "perspective");
              }
              v = parseFloat(p);
            }
            if (B || (j = i._gsap, j.renderTransform && !u.parseTransform || ao(i, u.parseTransform), k = u.smoothOrigin !== !1 && j.smooth, B = this._pt = new el(this._pt, d, Ue, 0, 1, j.renderTransform, j, 0, -1), B.dep = 1), T === "scale")
              this._pt = new el(this._pt, j, "scaleY", j.scaleY, (q ? Sr(j.scaleY, q + v) : v) - j.scaleY || 0, S0), this._pt.u = 0, h.push("scaleY", T), T += "X";
            else if (T === "transformOrigin") {
              Q.push(nl, 0, d[nl]), p = uE(p), j.svg ? E0(i, p, 0, k, 0, this) : (G = parseFloat(p.split(" ")[2]) || 0, G !== j.zOrigin && Ea(this, j, "zOrigin", j.zOrigin, G), Ea(this, d, T, ff(_), ff(p)));
              continue;
            } else if (T === "svgOrigin") {
              E0(i, p, 1, k, 0, this);
              continue;
            } else if (T in dy) {
              cE(this, j, T, S, q ? Sr(S, q + p) : p);
              continue;
            } else if (T === "smoothOrigin") {
              Ea(this, j, "smooth", j.smooth, p);
              continue;
            } else if (T === "force3D") {
              j[T] = p;
              continue;
            } else if (T === "transform") {
              fE(this, p, i);
              continue;
            }
          } else T in d || (T = Rr(T) || T);
          if (Z || (v || v === 0) && (S || S === 0) && !ZT.test(p) && T in d)
            w = (_ + "").substr((S + "").length), v || (v = 0), G = wn(p) || (T in Tl.units ? Tl.units[T] : w), w !== G && (S = Da(i, T, _, G)), this._pt = new el(this._pt, Z ? j : d, T, S, (q ? Sr(S, q + v) : v) - S, !Z && (G === "px" || T === "zIndex") && u.autoRound !== !1 ? FT : S0), this._pt.u = G || 0, Z && $ !== p ? (this._pt.b = _, this._pt.e = $, this._pt.r = kT) : w !== G && G !== "%" && (this._pt.b = _, this._pt.r = JT);
          else if (T in d)
            aE.call(this, i, T, _, q ? q + p : p);
          else if (T in i)
            this.add(i, T, _ || i[T], q ? q + p : p, s, c);
          else if (T !== "parseTransform") {
            X0(T, p);
            continue;
          }
          Z || (T in d ? Q.push(T, 0, d[T]) : typeof i[T] == "function" ? Q.push(T, 2, i[T]()) : Q.push(T, 1, _ || i[T])), h.push(T);
        }
      }
    R && iy(this);
  },
  render: function(i, u) {
    if (u.tween._time || !W0())
      for (var a = u._pt; a; )
        a.r(i, a.d), a = a._next;
    else
      u.styles.revert();
  },
  get: Li,
  aliases: gi,
  getSetter: function(i, u, a) {
    var s = gi[u];
    return s && s.indexOf(",") < 0 && (u = s), u in ji && u !== nl && (i._gsap.x || Li(i, "x")) ? a && Vv === a ? u === "scale" ? IT : $T : (Vv = a || {}) && (u === "scale" ? tE : eE) : i.style && !B0(i.style[u]) ? PT : ~u.indexOf("-") ? WT : k0(i, u);
  },
  core: {
    _removeProperty: Ra,
    _getMatrix: I0
  }
};
ll.utils.checkPrefix = Rr;
ll.core.getStyleSaver = oy;
(function(f, i, u, a) {
  var s = tl(f + "," + i + "," + u, function(c) {
    ji[c] = 1;
  });
  tl(i, function(c) {
    Tl.units[c] = "deg", dy[c] = 1;
  }), gi[s[13]] = f + "," + i, tl(a, function(c) {
    var h = c.split(":");
    gi[h[1]] = s[h[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
tl("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(f) {
  Tl.units[f] = "px";
});
ll.registerPlugin(py);
var xe = ll.registerPlugin(py) || ll;
xe.core.Tween;
function hE(f, i) {
  for (var u = 0; u < i.length; u++) {
    var a = i[u];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(f, a.key, a);
  }
}
function dE(f, i, u) {
  return i && hE(f.prototype, i), f;
}
var bn, Fc, $n, xa, Ma, Er, _y, ru, xr, vy, Xi, Fl, yy, Sy = function() {
  return bn || typeof window < "u" && (bn = window.gsap) && bn.registerPlugin && bn;
}, by = 1, yr = [], Zt = [], _i = [], js = Date.now, x0 = function(i, u) {
  return u;
}, mE = function() {
  var i = xr.core, u = i.bridge || {}, a = i._scrollers, s = i._proxies;
  a.push.apply(a, Zt), s.push.apply(s, _i), Zt = a, _i = s, x0 = function(h, d) {
    return u[h](d);
  };
}, Aa = function(i, u) {
  return ~_i.indexOf(i) && _i[_i.indexOf(i) + 1][u];
}, Qs = function(i) {
  return !!~vy.indexOf(i);
}, Bn = function(i, u, a, s, c) {
  return i.addEventListener(u, a, {
    passive: s !== !1,
    capture: !!c
  });
}, Yn = function(i, u, a, s) {
  return i.removeEventListener(u, a, !!s);
}, Nc = "scrollLeft", Uc = "scrollTop", M0 = function() {
  return Xi && Xi.isPressed || Zt.cache++;
}, hf = function(i, u) {
  var a = function s(c) {
    if (c || c === 0) {
      by && $n.history.scrollRestoration !== "manual" && ($n.history.scrollRestoration = "manual");
      var h = Xi && Xi.isPressed;
      c = s.v = Math.round(c) || (Xi && Xi.iOS ? 1 : 0), i(c), s.cacheID = Zt.cache, h && x0("ss", c);
    } else (u || Zt.cache !== s.cacheID || x0("ref")) && (s.cacheID = Zt.cache, s.v = i());
    return s.v + s.offset;
  };
  return a.offset = 0, i && a;
}, Gn = {
  s: Nc,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: hf(function(f) {
    return arguments.length ? $n.scrollTo(f, ln.sc()) : $n.pageXOffset || xa[Nc] || Ma[Nc] || Er[Nc] || 0;
  })
}, ln = {
  s: Uc,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Gn,
  sc: hf(function(f) {
    return arguments.length ? $n.scrollTo(Gn.sc(), f) : $n.pageYOffset || xa[Uc] || Ma[Uc] || Er[Uc] || 0;
  })
}, Pn = function(i, u) {
  return (u && u._ctx && u._ctx.selector || bn.utils.toArray)(i)[0] || (typeof i == "string" && bn.config().nullTargetWarn !== !1 ? console.warn("Element not found:", i) : null);
}, gE = function(i, u) {
  for (var a = u.length; a--; )
    if (u[a] === i || u[a].contains(i))
      return !0;
  return !1;
}, Na = function(i, u) {
  var a = u.s, s = u.sc;
  Qs(i) && (i = xa.scrollingElement || Ma);
  var c = Zt.indexOf(i), h = s === ln.sc ? 1 : 2;
  !~c && (c = Zt.push(i) - 1), Zt[c + h] || Bn(i, "scroll", M0);
  var d = Zt[c + h], g = d || (Zt[c + h] = hf(Aa(i, a), !0) || (Qs(i) ? s : hf(function(_) {
    return arguments.length ? i[a] = _ : i[a];
  })));
  return g.target = i, d || (g.smooth = bn.getProperty(i, "scrollBehavior") === "smooth"), g;
}, O0 = function(i, u, a) {
  var s = i, c = i, h = js(), d = h, g = u || 50, _ = Math.max(500, g * 3), p = function(M, T) {
    var w = js();
    T || w - h > g ? (c = s, s = M, d = h, h = w) : a ? s += M : s = c + (M - c) / (w - d) * (h - d);
  }, v = function() {
    c = s = a ? 0 : s, d = h = 0;
  }, S = function(M) {
    var T = d, w = c, G = js();
    return (M || M === 0) && M !== s && p(M), h === d || G - d > _ ? 0 : (s + (a ? w : -w)) / ((a ? G : h) - T) * 1e3;
  };
  return {
    update: p,
    reset: v,
    getVelocity: S
  };
}, zs = function(i, u) {
  return u && !i._gsapAllow && i.cancelable !== !1 && i.preventDefault(), i.changedTouches ? i.changedTouches[0] : i;
}, Wv = function(i) {
  var u = Math.max.apply(Math, i), a = Math.min.apply(Math, i);
  return Math.abs(u) >= Math.abs(a) ? u : a;
}, Ty = function() {
  xr = bn.core.globals().ScrollTrigger, xr && xr.core && mE();
}, Ey = function(i) {
  return bn = i || Sy(), !Fc && bn && typeof document < "u" && document.body && ($n = window, xa = document, Ma = xa.documentElement, Er = xa.body, vy = [$n, xa, Ma, Er], bn.utils.clamp, yy = bn.core.context || function() {
  }, ru = "onpointerenter" in Er ? "pointer" : "mouse", _y = Ge.isTouch = $n.matchMedia && $n.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in $n || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Fl = Ge.eventTypes = ("ontouchstart" in Ma ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ma ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return by = 0;
  }, 500), Fc = 1), xr || Ty(), Fc;
};
Gn.op = ln;
Zt.cache = 0;
var Ge = /* @__PURE__ */ (function() {
  function f(u) {
    this.init(u);
  }
  var i = f.prototype;
  return i.init = function(a) {
    Fc || Ey(bn) || console.warn("Please gsap.registerPlugin(Observer)"), xr || Ty();
    var s = a.tolerance, c = a.dragMinimum, h = a.type, d = a.target, g = a.lineHeight, _ = a.debounce, p = a.preventDefault, v = a.onStop, S = a.onStopDelay, b = a.ignore, M = a.wheelSpeed, T = a.event, w = a.onDragStart, G = a.onDragEnd, q = a.onDrag, Z = a.onPress, B = a.onRelease, j = a.onRight, k = a.onLeft, R = a.onUp, Q = a.onDown, $ = a.onChangeX, V = a.onChangeY, nt = a.onChange, lt = a.onToggleX, ft = a.onToggleY, pt = a.onHover, et = a.onHoverEnd, K = a.onMove, P = a.ignoreCheck, I = a.isNormalizer, st = a.onGestureStart, z = a.onGestureEnd, _t = a.onWheel, dt = a.onEnable, Mt = a.onDisable, x = a.onClick, O = a.scrollSpeed, J = a.capture, L = a.allowClicks, rt = a.lockAxis, ut = a.onLockAxis;
    this.target = d = Pn(d) || Ma, this.vars = a, b && (b = bn.utils.toArray(b)), s = s || 1e-9, c = c || 0, M = M || 1, O = O || 1, h = h || "wheel,touch,pointer", _ = _ !== !1, g || (g = parseFloat($n.getComputedStyle(Er).lineHeight) || 22);
    var bt, it, ct, Tt, ht, Ot, Ct, U = this, tt = 0, mt = 0, xt = a.passive || !p && a.passive !== !1, At = Na(d, Gn), Wt = Na(d, ln), Kt = At(), It = Wt(), Gt = ~h.indexOf("touch") && !~h.indexOf("pointer") && Fl[0] === "pointerdown", le = Qs(d), oe = d.ownerDocument || xa, hn = [0, 0, 0], Oe = [0, 0, 0], En = 0, Ml = function() {
      return En = js();
    }, Me = function(St, Lt) {
      return (U.event = St) && b && gE(St.target, b) || Lt && Gt && St.pointerType !== "touch" || P && P(St, Lt);
    }, Wl = function() {
      U._vx.reset(), U._vy.reset(), it.pause(), v && v(U);
    }, $e = function() {
      var St = U.deltaX = Wv(hn), Lt = U.deltaY = Wv(Oe), at = Math.abs(St) >= s, Ut = Math.abs(Lt) >= s;
      nt && (at || Ut) && nt(U, St, Lt, hn, Oe), at && (j && U.deltaX > 0 && j(U), k && U.deltaX < 0 && k(U), $ && $(U), lt && U.deltaX < 0 != tt < 0 && lt(U), tt = U.deltaX, hn[0] = hn[1] = hn[2] = 0), Ut && (Q && U.deltaY > 0 && Q(U), R && U.deltaY < 0 && R(U), V && V(U), ft && U.deltaY < 0 != mt < 0 && ft(U), mt = U.deltaY, Oe[0] = Oe[1] = Oe[2] = 0), (Tt || ct) && (K && K(U), ct && (w && ct === 1 && w(U), q && q(U), ct = 0), Tt = !1), Ot && !(Ot = !1) && ut && ut(U), ht && (_t(U), ht = !1), bt = 0;
    }, Ol = function(St, Lt, at) {
      hn[at] += St, Oe[at] += Lt, U._vx.update(St), U._vy.update(Lt), _ ? bt || (bt = requestAnimationFrame($e)) : $e();
    }, Vn = function(St, Lt) {
      rt && !Ct && (U.axis = Ct = Math.abs(St) > Math.abs(Lt) ? "x" : "y", Ot = !0), Ct !== "y" && (hn[2] += St, U._vx.update(St, !0)), Ct !== "x" && (Oe[2] += Lt, U._vy.update(Lt, !0)), _ ? bt || (bt = requestAnimationFrame($e)) : $e();
    }, $l = function(St) {
      if (!Me(St, 1)) {
        St = zs(St, p);
        var Lt = St.clientX, at = St.clientY, Ut = Lt - U.x, zt = at - U.y, Ht = U.isDragging;
        U.x = Lt, U.y = at, (Ht || (Ut || zt) && (Math.abs(U.startX - Lt) >= c || Math.abs(U.startY - at) >= c)) && (ct || (ct = Ht ? 2 : 1), Ht || (U.isDragging = !0), Vn(Ut, zt));
      }
    }, yi = U.onPress = function(Dt) {
      Me(Dt, 1) || Dt && Dt.button || (U.axis = Ct = null, it.pause(), U.isPressed = !0, Dt = zs(Dt), tt = mt = 0, U.startX = U.x = Dt.clientX, U.startY = U.y = Dt.clientY, U._vx.reset(), U._vy.reset(), Bn(I ? d : oe, Fl[1], $l, xt, !0), U.deltaX = U.deltaY = 0, Z && Z(U));
    }, wt = U.onRelease = function(Dt) {
      if (!Me(Dt, 1)) {
        Yn(I ? d : oe, Fl[1], $l, !0);
        var St = !isNaN(U.y - U.startY), Lt = U.isDragging, at = Lt && (Math.abs(U.x - U.startX) > 3 || Math.abs(U.y - U.startY) > 3), Ut = zs(Dt);
        !at && St && (U._vx.reset(), U._vy.reset(), p && L && bn.delayedCall(0.08, function() {
          if (js() - En > 300 && !Dt.defaultPrevented) {
            if (Dt.target.click)
              Dt.target.click();
            else if (oe.createEvent) {
              var zt = oe.createEvent("MouseEvents");
              zt.initMouseEvent("click", !0, !0, $n, 1, Ut.screenX, Ut.screenY, Ut.clientX, Ut.clientY, !1, !1, !1, !1, 0, null), Dt.target.dispatchEvent(zt);
            }
          }
        })), U.isDragging = U.isGesturing = U.isPressed = !1, v && Lt && !I && it.restart(!0), ct && $e(), G && Lt && G(U), B && B(U, at);
      }
    }, Si = function(St) {
      return St.touches && St.touches.length > 1 && (U.isGesturing = !0) && st(St, U.isDragging);
    }, jn = function() {
      return (U.isGesturing = !1) || z(U);
    }, Qn = function(St) {
      if (!Me(St)) {
        var Lt = At(), at = Wt();
        Ol((Lt - Kt) * O, (at - It) * O, 1), Kt = Lt, It = at, v && it.restart(!0);
      }
    }, xn = function(St) {
      if (!Me(St)) {
        St = zs(St, p), _t && (ht = !0);
        var Lt = (St.deltaMode === 1 ? g : St.deltaMode === 2 ? $n.innerHeight : 1) * M;
        Ol(St.deltaX * Lt, St.deltaY * Lt, 0), v && !I && it.restart(!0);
      }
    }, bi = function(St) {
      if (!Me(St)) {
        var Lt = St.clientX, at = St.clientY, Ut = Lt - U.x, zt = at - U.y;
        U.x = Lt, U.y = at, Tt = !0, v && it.restart(!0), (Ut || zt) && Vn(Ut, zt);
      }
    }, Ti = function(St) {
      U.event = St, pt(U);
    }, Vl = function(St) {
      U.event = St, et(U);
    }, Ha = function(St) {
      return Me(St) || zs(St, p) && x(U);
    };
    it = U._dc = bn.delayedCall(S || 0.25, Wl).pause(), U.deltaX = U.deltaY = 0, U._vx = O0(0, 50, !0), U._vy = O0(0, 50, !0), U.scrollX = At, U.scrollY = Wt, U.isDragging = U.isGesturing = U.isPressed = !1, yy(this), U.enable = function(Dt) {
      return U.isEnabled || (Bn(le ? oe : d, "scroll", M0), h.indexOf("scroll") >= 0 && Bn(le ? oe : d, "scroll", Qn, xt, J), h.indexOf("wheel") >= 0 && Bn(d, "wheel", xn, xt, J), (h.indexOf("touch") >= 0 && _y || h.indexOf("pointer") >= 0) && (Bn(d, Fl[0], yi, xt, J), Bn(oe, Fl[2], wt), Bn(oe, Fl[3], wt), L && Bn(d, "click", Ml, !0, !0), x && Bn(d, "click", Ha), st && Bn(oe, "gesturestart", Si), z && Bn(oe, "gestureend", jn), pt && Bn(d, ru + "enter", Ti), et && Bn(d, ru + "leave", Vl), K && Bn(d, ru + "move", bi)), U.isEnabled = !0, U.isDragging = U.isGesturing = U.isPressed = Tt = ct = !1, U._vx.reset(), U._vy.reset(), Kt = At(), It = Wt(), Dt && Dt.type && yi(Dt), dt && dt(U)), U;
    }, U.disable = function() {
      U.isEnabled && (yr.filter(function(Dt) {
        return Dt !== U && Qs(Dt.target);
      }).length || Yn(le ? oe : d, "scroll", M0), U.isPressed && (U._vx.reset(), U._vy.reset(), Yn(I ? d : oe, Fl[1], $l, !0)), Yn(le ? oe : d, "scroll", Qn, J), Yn(d, "wheel", xn, J), Yn(d, Fl[0], yi, J), Yn(oe, Fl[2], wt), Yn(oe, Fl[3], wt), Yn(d, "click", Ml, !0), Yn(d, "click", Ha), Yn(oe, "gesturestart", Si), Yn(oe, "gestureend", jn), Yn(d, ru + "enter", Ti), Yn(d, ru + "leave", Vl), Yn(d, ru + "move", bi), U.isEnabled = U.isPressed = U.isDragging = !1, Mt && Mt(U));
    }, U.kill = U.revert = function() {
      U.disable();
      var Dt = yr.indexOf(U);
      Dt >= 0 && yr.splice(Dt, 1), Xi === U && (Xi = 0);
    }, yr.push(U), I && Qs(d) && (Xi = U), U.enable(T);
  }, dE(f, [{
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
Ge.version = "3.15.1";
Ge.create = function(f) {
  return new Ge(f);
};
Ge.register = Ey;
Ge.getAll = function() {
  return yr.slice();
};
Ge.getById = function(f) {
  return yr.filter(function(i) {
    return i.vars.id === f;
  })[0];
};
Sy() && bn.registerPlugin(Ge);
var vt, gr, Qt, de, vl, se, tm, df, uo, Zs, Ns, Hc, zn, yf, z0, qn, $v, Iv, pr, xy, i0, My, Ln, A0, Oy, zy, ya, w0, em, Mr, nm, wa, C0, a0, Yc = 1, An = Date.now, u0 = An(), Gl = 0, Us = 0, t1 = function(i, u, a) {
  var s = pl(i) && (i.substr(0, 6) === "clamp(" || i.indexOf("max") > -1);
  return a["_" + u + "Clamp"] = s, s ? i.substr(6, i.length - 7) : i;
}, e1 = function(i, u) {
  return u && (!pl(i) || i.substr(0, 6) !== "clamp(") ? "clamp(" + i + ")" : i;
}, pE = function f() {
  return Us && requestAnimationFrame(f);
}, n1 = function() {
  return yf = 1;
}, l1 = function() {
  return yf = 0;
}, di = function(i) {
  return i;
}, Hs = function(i) {
  return Math.round(i * 1e5) / 1e5 || 0;
}, Ay = function() {
  return typeof window < "u";
}, wy = function() {
  return vt || Ay() && (vt = window.gsap) && vt.registerPlugin && vt;
}, vu = function(i) {
  return !!~tm.indexOf(i);
}, Cy = function(i) {
  return (i === "Height" ? nm : Qt["inner" + i]) || vl["client" + i] || se["client" + i];
}, Ry = function(i) {
  return Aa(i, "getBoundingClientRect") || (vu(i) ? function() {
    return tf.width = Qt.innerWidth, tf.height = nm, tf;
  } : function() {
    return qi(i);
  });
}, _E = function(i, u, a) {
  var s = a.d, c = a.d2, h = a.a;
  return (h = Aa(i, "getBoundingClientRect")) ? function() {
    return h()[s];
  } : function() {
    return (u ? Cy(c) : i["client" + c]) || 0;
  };
}, vE = function(i, u) {
  return !u || ~_i.indexOf(i) ? Ry(i) : function() {
    return tf;
  };
}, pi = function(i, u) {
  var a = u.s, s = u.d2, c = u.d, h = u.a;
  return Math.max(0, (a = "scroll" + s) && (h = Aa(i, a)) ? h() - Ry(i)()[c] : vu(i) ? (vl[a] || se[a]) - Cy(s) : i[a] - i["offset" + s]);
}, Bc = function(i, u) {
  for (var a = 0; a < pr.length; a += 3)
    (!u || ~u.indexOf(pr[a + 1])) && i(pr[a], pr[a + 1], pr[a + 2]);
}, pl = function(i) {
  return typeof i == "string";
}, Cn = function(i) {
  return typeof i == "function";
}, Ys = function(i) {
  return typeof i == "number";
}, su = function(i) {
  return typeof i == "object";
}, As = function(i, u, a) {
  return i && i.progress(u ? 0 : 1) && a && i.pause();
}, hr = function(i, u, a) {
  if (i.enabled) {
    var s = i._ctx ? i._ctx.add(function() {
      return u(i, a);
    }) : u(i, a);
    s && s.totalTime && (i.callbackAnimation = s);
  }
}, dr = Math.abs, Dy = "left", Ny = "top", lm = "right", im = "bottom", gu = "width", pu = "height", Ks = "Right", Js = "Left", ks = "Top", Fs = "Bottom", Pe = "padding", Bl = "margin", Dr = "Width", am = "Height", nn = "px", Ll = function(i) {
  return Qt.getComputedStyle(i.nodeType === Node.DOCUMENT_NODE ? i.scrollingElement : i);
}, yE = function(i) {
  var u = Ll(i).position;
  i.style.position = u === "absolute" || u === "fixed" ? u : "relative";
}, i1 = function(i, u) {
  for (var a in u)
    a in i || (i[a] = u[a]);
  return i;
}, qi = function(i, u) {
  var a = u && Ll(i)[z0] !== "matrix(1, 0, 0, 1, 0, 0)" && vt.to(i, {
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
  }).progress(1), s = i.getBoundingClientRect ? i.getBoundingClientRect() : i.scrollingElement.getBoundingClientRect();
  return a && a.progress(0).kill(), s;
}, mf = function(i, u) {
  var a = u.d2;
  return i["offset" + a] || i["client" + a] || 0;
}, Uy = function(i) {
  var u = [], a = i.labels, s = i.duration(), c;
  for (c in a)
    u.push(a[c] / s);
  return u;
}, SE = function(i) {
  return function(u) {
    return vt.utils.snap(Uy(i), u);
  };
}, um = function(i) {
  var u = vt.utils.snap(i), a = Array.isArray(i) && i.slice(0).sort(function(s, c) {
    return s - c;
  });
  return a ? function(s, c, h) {
    h === void 0 && (h = 1e-3);
    var d;
    if (!c)
      return u(s);
    if (c > 0) {
      for (s -= h, d = 0; d < a.length; d++)
        if (a[d] >= s)
          return a[d];
      return a[d - 1];
    } else
      for (d = a.length, s += h; d--; )
        if (a[d] <= s)
          return a[d];
    return a[0];
  } : function(s, c, h) {
    h === void 0 && (h = 1e-3);
    var d = u(s);
    return !c || Math.abs(d - s) < h || d - s < 0 == c < 0 ? d : u(c < 0 ? s - i : s + i);
  };
}, bE = function(i) {
  return function(u, a) {
    return um(Uy(i))(u, a.direction);
  };
}, Lc = function(i, u, a, s) {
  return a.split(",").forEach(function(c) {
    return i(u, c, s);
  });
}, cn = function(i, u, a, s, c) {
  return i.addEventListener(u, a, {
    passive: !s,
    capture: !!c
  });
}, on = function(i, u, a, s) {
  return i.removeEventListener(u, a, !!s);
}, qc = function(i, u, a) {
  a = a && a.wheelHandler, a && (i(u, "wheel", a), i(u, "touchmove", a));
}, a1 = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Xc = {
  toggleActions: "play",
  anticipatePin: 0
}, gf = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Pc = function(i, u) {
  if (pl(i)) {
    var a = i.indexOf("="), s = ~a ? +(i.charAt(a - 1) + 1) * parseFloat(i.substr(a + 1)) : 0;
    ~a && (i.indexOf("%") > a && (s *= u / 100), i = i.substr(0, a - 1)), i = s + (i in gf ? gf[i] * u : ~i.indexOf("%") ? parseFloat(i) * u / 100 : parseFloat(i) || 0);
  }
  return i;
}, Gc = function(i, u, a, s, c, h, d, g) {
  var _ = c.startColor, p = c.endColor, v = c.fontSize, S = c.indent, b = c.fontWeight, M = de.createElement("div"), T = vu(a) || Aa(a, "pinType") === "fixed", w = i.indexOf("scroller") !== -1, G = T ? se : a.tagName === "IFRAME" ? a.contentDocument.body : a, q = i.indexOf("start") !== -1, Z = q ? _ : p, B = "border-color:" + Z + ";font-size:" + v + ";color:" + Z + ";font-weight:" + b + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return B += "position:" + ((w || g) && T ? "fixed;" : "absolute;"), (w || g || !T) && (B += (s === ln ? lm : im) + ":" + (h + parseFloat(S)) + "px;"), d && (B += "box-sizing:border-box;text-align:left;width:" + d.offsetWidth + "px;"), M._isStart = q, M.setAttribute("class", "gsap-marker-" + i + (u ? " marker-" + u : "")), M.style.cssText = B, M.innerText = u || u === 0 ? i + "-" + u : i, G.children[0] ? G.insertBefore(M, G.children[0]) : G.appendChild(M), M._offset = M["offset" + s.op.d2], Wc(M, 0, s, q), M;
}, Wc = function(i, u, a, s) {
  var c = {
    display: "block"
  }, h = a[s ? "os2" : "p2"], d = a[s ? "p2" : "os2"];
  i._isFlipped = s, c[a.a + "Percent"] = s ? -100 : 0, c[a.a] = s ? "1px" : 0, c["border" + h + Dr] = 1, c["border" + d + Dr] = 0, c[a.p] = u + "px", vt.set(i, c);
}, jt = [], R0 = {}, ro, u1 = function() {
  return An() - Gl > 34 && (ro || (ro = requestAnimationFrame(Gi)));
}, mr = function() {
  (!Ln || !Ln.isPressed || Ln.startX > se.clientWidth) && (Zt.cache++, Ln ? ro || (ro = requestAnimationFrame(Gi)) : Gi(), Gl || Su("scrollStart"), Gl = An());
}, r0 = function() {
  zy = Qt.innerWidth, Oy = Qt.innerHeight;
}, Bs = function(i) {
  Zt.cache++, (i === !0 || !zn && !My && !de.fullscreenElement && !de.webkitFullscreenElement && (!A0 || zy !== Qt.innerWidth || Math.abs(Qt.innerHeight - Oy) > Qt.innerHeight * 0.25)) && df.restart(!0);
}, yu = {}, TE = [], Hy = function f() {
  return on(Xt, "scrollEnd", f) || cu(!0);
}, Su = function(i) {
  return yu[i] && yu[i].map(function(u) {
    return u();
  }) || TE;
}, gl = [], Yy = function(i) {
  for (var u = 0; u < gl.length; u += 5)
    (!i || gl[u + 4] && gl[u + 4].query === i) && (gl[u].style.cssText = gl[u + 1], gl[u].getBBox && gl[u].setAttribute("transform", gl[u + 2] || ""), gl[u + 3].uncache = 1);
}, By = function() {
  Zt.cache++, Zt.forEach(function(i) {
    return Cn(i) && (i.rec = i());
  });
}, rm = function(i, u) {
  var a;
  for (qn = 0; qn < jt.length; qn++)
    a = jt[qn], a && (!u || a._ctx === u) && (i ? a.kill(1) : a.revert(!0, !0));
  wa = !0, u && Yy(u), u || Su("revert");
}, Ly = function(i, u) {
  Zt.cache++, (u || !Xn) && Zt.forEach(function(a) {
    return Cn(a) && a.cacheID++ && (a.rec = 0);
  }), pl(i) && (em = i, Qt.history.scrollRestoration !== i && (Qt.history.scrollRestoration = i));
}, Xn, _u = 0, r1, EE = function() {
  if (r1 !== _u) {
    var i = r1 = _u;
    requestAnimationFrame(function() {
      return i === _u && cu(!0);
    });
  }
}, qy = function() {
  se.appendChild(Mr), nm = !Ln && Mr.offsetHeight || Qt.innerHeight, se.removeChild(Mr);
}, s1 = function(i) {
  return uo(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(u) {
    return u.style.display = i ? "none" : "block";
  });
}, cu = function(i, u) {
  if (vl = de.documentElement, se = de.body, tm = [Qt, de, vl, se], Gl && !i && !wa) {
    cn(Xt, "scrollEnd", Hy);
    return;
  }
  qy(), Xn = Xt.isRefreshing = !0, wa || By();
  var a = Su("refreshInit");
  xy && Xt.sort(), u || rm(), Zt.forEach(function(s) {
    Cn(s) && (s.smooth && (s.target.style.scrollBehavior = "auto"), s(0));
  }), jt.slice(0).forEach(function(s) {
    return s.refresh();
  }), wa = !1, jt.forEach(function(s) {
    if (s._subPinOffset && s.pin) {
      var c = s.vars.horizontal ? "offsetWidth" : "offsetHeight", h = s.pin[c];
      s.revert(!0, 1), s.adjustPinSpacing(s.pin[c] - h), s.refresh();
    }
  }), C0 = 1, s1(!0), jt.forEach(function(s) {
    var c = pi(s.scroller, s._dir), h = s.vars.end === "max" || s._endClamp && s.end > c, d = s._startClamp && s.start >= c;
    (h || d) && s.setPositions(d ? c - 1 : s.start, h ? Math.max(d ? c : s.start + 1, c) : s.end, !0);
  }), s1(!1), C0 = 0, a.forEach(function(s) {
    return s && s.render && s.render(-1);
  }), Zt.forEach(function(s) {
    Cn(s) && (s.smooth && requestAnimationFrame(function() {
      return s.target.style.scrollBehavior = "smooth";
    }), s.rec && s(s.rec));
  }), Ly(em, 1), df.pause(), _u++, Xn = 2, Gi(2), jt.forEach(function(s) {
    return Cn(s.vars.onRefresh) && s.vars.onRefresh(s);
  }), Xn = Xt.isRefreshing = !1, Su("refresh");
}, D0 = 0, $c = 1, Ps, Gi = function(i) {
  if (i === 2 || !Xn && !wa) {
    Xt.isUpdating = !0, Ps && Ps.update(0);
    var u = jt.length, a = An(), s = a - u0 >= 50, c = u && jt[0].scroll();
    if ($c = D0 > c ? -1 : 1, Xn || (D0 = c), s && (Gl && !yf && a - Gl > 200 && (Gl = 0, Su("scrollEnd")), Ns = u0, u0 = a), $c < 0) {
      for (qn = u; qn-- > 0; )
        jt[qn] && jt[qn].update(0, s);
      $c = 1;
    } else
      for (qn = 0; qn < u; qn++)
        jt[qn] && jt[qn].update(0, s);
    Xt.isUpdating = !1;
  }
  ro = 0;
}, N0 = [Dy, Ny, im, lm, Bl + Fs, Bl + Ks, Bl + ks, Bl + Js, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], Ic = N0.concat([gu, pu, "boxSizing", "max" + Dr, "max" + am, "position", Bl, Pe, Pe + ks, Pe + Ks, Pe + Fs, Pe + Js]), xE = function(i, u, a) {
  Or(a);
  var s = i._gsap;
  if (s.spacerIsNative)
    Or(s.spacerState);
  else if (i._gsap.swappedIn) {
    var c = u.parentNode;
    c && (c.insertBefore(i, u), c.removeChild(u));
  }
  i._gsap.swappedIn = !1;
}, s0 = function(i, u, a, s) {
  if (!i._gsap.swappedIn) {
    for (var c = N0.length, h = u.style, d = i.style, g; c--; )
      g = N0[c], h[g] = a[g];
    h.position = a.position === "absolute" ? "absolute" : "relative", a.display === "inline" && (h.display = "inline-block"), d[im] = d[lm] = "auto", h.flexBasis = a.flexBasis || "auto", h.overflow = "visible", h.boxSizing = "border-box", h[gu] = mf(i, Gn) + nn, h[pu] = mf(i, ln) + nn, h[Pe] = d[Bl] = d[Ny] = d[Dy] = "0", Or(s), d[gu] = d["max" + Dr] = a[gu], d[pu] = d["max" + am] = a[pu], d[Pe] = a[Pe], i.parentNode !== u && (i.parentNode.insertBefore(u, i), u.appendChild(i)), i._gsap.swappedIn = !0;
  }
}, ME = /([A-Z])/g, Or = function(i) {
  if (i) {
    var u = i.t.style, a = i.length, s = 0, c, h;
    for ((i.t._gsap || vt.core.getCache(i.t)).uncache = 1; s < a; s += 2)
      h = i[s + 1], c = i[s], h ? u[c] = h : u[c] && u.removeProperty(c.replace(ME, "-$1").toLowerCase());
  }
}, Vc = function(i) {
  for (var u = Ic.length, a = i.style, s = [], c = 0; c < u; c++)
    s.push(Ic[c], a[Ic[c]]);
  return s.t = i, s;
}, OE = function(i, u, a) {
  for (var s = [], c = i.length, h = a ? 8 : 0, d; h < c; h += 2)
    d = i[h], s.push(d, d in u ? u[d] : i[h + 1]);
  return s.t = i.t, s;
}, tf = {
  left: 0,
  top: 0
}, o1 = function(i, u, a, s, c, h, d, g, _, p, v, S, b, M) {
  Cn(i) && (i = i(g)), pl(i) && i.substr(0, 3) === "max" && (i = S + (i.charAt(4) === "=" ? Pc("0" + i.substr(3), a) : 0));
  var T = b ? b.time() : 0, w, G, q;
  if (b && b.seek(0), isNaN(i) || (i = +i), Ys(i))
    b && (i = vt.utils.mapRange(b.scrollTrigger.start, b.scrollTrigger.end, 0, S, i)), d && Wc(d, a, s, !0);
  else {
    Cn(u) && (u = u(g));
    var Z = (i || "0").split(" "), B, j, k, R;
    q = Pn(u, g) || se, B = qi(q) || {}, (!B || !B.left && !B.top) && Ll(q).display === "none" && (R = q.style.display, q.style.display = "block", B = qi(q), R ? q.style.display = R : q.style.removeProperty("display")), j = Pc(Z[0], B[s.d]), k = Pc(Z[1] || "0", a), i = B[s.p] - _[s.p] - p + j + c - k, d && Wc(d, k, s, a - k < 20 || d._isStart && k > 20), a -= a - k;
  }
  if (M && (g[M] = i || -1e-3, i < 0 && (i = 0)), h) {
    var Q = i + a, $ = h._isStart;
    w = "scroll" + s.d2, Wc(h, Q, s, $ && Q > 20 || !$ && (v ? Math.max(se[w], vl[w]) : h.parentNode[w]) <= Q + 1), v && (_ = qi(d), v && (h.style[s.op.p] = _[s.op.p] - s.op.m - h._offset + nn));
  }
  return b && q && (w = qi(q), b.seek(S), G = qi(q), b._caScrollDist = w[s.p] - G[s.p], i = i / b._caScrollDist * S), b && b.seek(T), b ? i : Math.round(i);
}, zE = /(webkit|moz|length|cssText|inset)/i, c1 = function(i, u, a, s) {
  if (i.parentNode !== u) {
    var c = i.style, h, d;
    if (u === se) {
      i._stOrig = c.cssText, d = Ll(i);
      for (h in d)
        !+h && !zE.test(h) && d[h] && typeof c[h] == "string" && h !== "0" && (c[h] = d[h]);
      c.top = a, c.left = s;
    } else
      c.cssText = i._stOrig;
    vt.core.getCache(i).uncache = 1, u.appendChild(i);
  }
}, Xy = function(i, u, a) {
  var s = u, c = s;
  return function(h) {
    var d = Math.round(i());
    return d !== s && d !== c && Math.abs(d - s) > 3 && Math.abs(d - c) > 3 && (h = d, a && a()), c = s, s = Math.round(h), s;
  };
}, jc = function(i, u, a) {
  var s = {};
  s[u.p] = "+=" + a, vt.set(i, s);
}, f1 = function(i, u) {
  var a = Na(i, u), s = "_scroll" + u.p2, c = function h(d, g, _, p, v) {
    var S = h.tween, b = g.onComplete, M = {};
    _ = _ || a();
    var T = Xy(a, _, function() {
      S.kill(), h.tween = 0;
    });
    return v = p && v || 0, p = p || d - _, S && S.kill(), g[s] = d, g.inherit = !1, g.modifiers = M, M[s] = function() {
      return T(_ + p * S.ratio + v * S.ratio * S.ratio);
    }, g.onUpdate = function() {
      Zt.cache++, h.tween && Gi();
    }, g.onComplete = function() {
      h.tween = 0, b && b.call(S);
    }, S = h.tween = vt.to(i, g), S;
  };
  return i[s] = a, a.wheelHandler = function() {
    return c.tween && c.tween.kill() && (c.tween = 0);
  }, cn(i, "wheel", a.wheelHandler), Xt.isTouch && cn(i, "touchmove", a.wheelHandler), c;
}, Xt = /* @__PURE__ */ (function() {
  function f(u, a) {
    gr || f.register(vt) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), w0(this), this.init(u, a);
  }
  var i = f.prototype;
  return i.init = function(a, s) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Us) {
      this.update = this.refresh = this.kill = di;
      return;
    }
    a = i1(pl(a) || Ys(a) || a.nodeType ? {
      trigger: a
    } : a, Xc);
    var c = a, h = c.onUpdate, d = c.toggleClass, g = c.id, _ = c.onToggle, p = c.onRefresh, v = c.scrub, S = c.trigger, b = c.pin, M = c.pinSpacing, T = c.invalidateOnRefresh, w = c.anticipatePin, G = c.onScrubComplete, q = c.onSnapComplete, Z = c.once, B = c.snap, j = c.pinReparent, k = c.pinSpacer, R = c.containerAnimation, Q = c.fastScrollEnd, $ = c.preventOverlaps, V = a.horizontal || a.containerAnimation && a.horizontal !== !1 ? Gn : ln, nt = !v && v !== 0, lt = Pn(a.scroller || Qt), ft = vt.core.getCache(lt), pt = vu(lt), et = ("pinType" in a ? a.pinType : Aa(lt, "pinType") || pt && "fixed") === "fixed", K = [a.onEnter, a.onLeave, a.onEnterBack, a.onLeaveBack], P = nt && a.toggleActions.split(" "), I = "markers" in a ? a.markers : Xc.markers, st = pt ? 0 : parseFloat(Ll(lt)["border" + V.p2 + Dr]) || 0, z = this, _t = a.onRefreshInit && function() {
      return a.onRefreshInit(z);
    }, dt = _E(lt, pt, V), Mt = vE(lt, pt), x = 0, O = 0, J = 0, L = Na(lt, V), rt, ut, bt, it, ct, Tt, ht, Ot, Ct, U, tt, mt, xt, At, Wt, Kt, It, Gt, le, oe, hn, Oe, En, Ml, Me, Wl, $e, Ol, Vn, $l, yi, wt, Si, jn, Qn, xn, bi, Ti, Vl;
    if (z._startClamp = z._endClamp = !1, z._dir = V, w *= 45, z.scroller = lt, z.scroll = R ? R.time.bind(R) : L, it = L(), wa && L.rec == null && (L.rec = it), z.vars = a, s = s || a.animation, "refreshPriority" in a && (xy = 1, a.refreshPriority === -9999 && (Ps = z)), ft.tweenScroll = ft.tweenScroll || {
      top: f1(lt, ln),
      left: f1(lt, Gn)
    }, z.tweenTo = rt = ft.tweenScroll[V.p], z.scrubDuration = function(at) {
      Si = Ys(at) && at, Si ? wt ? wt.duration(at) : wt = vt.to(s, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Si,
        paused: !0,
        onComplete: function() {
          return G && G(z);
        }
      }) : (wt && wt.progress(1).kill(), wt = 0);
    }, s && (s.vars.lazy = !1, s._initted && !z.isReverted || s.vars.immediateRender !== !1 && a.immediateRender !== !1 && s.duration() && s.render(0, !0, !0), z.animation = s.pause(), s.scrollTrigger = z, z.scrubDuration(v), $l = 0, g || (g = s.vars.id)), B && ((!su(B) || B.push) && (B = {
      snapTo: B
    }), "scrollBehavior" in se.style && vt.set(pt ? [se, vl] : lt, {
      scrollBehavior: "auto"
    }), Zt.forEach(function(at) {
      return Cn(at) && at.target === (pt ? de.scrollingElement || vl : lt) && (at.smooth = !1);
    }), bt = Cn(B.snapTo) ? B.snapTo : B.snapTo === "labels" ? SE(s) : B.snapTo === "labelsDirectional" ? bE(s) : B.directional !== !1 ? function(at, Ut) {
      return um(B.snapTo)(at, An() - O < 500 ? 0 : Ut.direction);
    } : vt.utils.snap(B.snapTo), jn = B.duration || {
      min: 0.1,
      max: 2
    }, jn = su(jn) ? Zs(jn.min, jn.max) : Zs(jn, jn), Qn = vt.delayedCall(B.delay || Si / 2 || 0.1, function() {
      var at = L(), Ut = An() - O < 500, zt = rt.tween;
      if ((Ut || Math.abs(z.getVelocity()) < 10) && !zt && !yf && x !== at) {
        var Ht = (at - Tt) / At, Ce = s && !nt ? s.totalProgress() : Ht, qt = Ut ? 0 : (Ce - yi) / (An() - Ns) * 1e3 || 0, Se = vt.utils.clamp(-Ht, 1 - Ht, dr(qt / 2) * qt / 0.185), ze = Ht + (B.inertia === !1 ? 0 : Se), _e, ae, ue = B, il = ue.onStart, be = ue.onInterrupt, dn = ue.onComplete;
        if (_e = bt(ze, z), Ys(_e) || (_e = ze), ae = Math.max(0, Math.round(Tt + _e * At)), at <= ht && at >= Tt && ae !== at) {
          if (zt && !zt._initted && zt.data <= dr(ae - at))
            return;
          B.inertia === !1 && (Se = _e - Ht), rt(ae, {
            duration: jn(dr(Math.max(dr(ze - Ce), dr(_e - Ce)) * 0.185 / qt / 0.05 || 0)),
            ease: B.ease || "power3",
            data: dr(ae - at),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Qn.restart(!0) && be && hr(z, be);
            },
            onComplete: function() {
              z.update(), x = L(), s && !nt && (wt ? wt.resetTo("totalProgress", _e, s._tTime / s._tDur) : s.progress(_e)), $l = yi = s && !nt ? s.totalProgress() : z.progress, q && q(z), dn && hr(z, dn);
            }
          }, at, Se * At, ae - at - Se * At), il && hr(z, il, rt.tween);
        }
      } else z.isActive && x !== at && Qn.restart(!0);
    }).pause()), g && (R0[g] = z), S = z.trigger = Pn(S || b !== !0 && b), Vl = S && S._gsap && S._gsap.stRevert, Vl && (Vl = Vl(z)), b = b === !0 ? S : Pn(b), pl(d) && (d = {
      targets: S,
      className: d
    }), b && (M === !1 || M === Bl || (M = !M && b.parentNode && b.parentNode.style && Ll(b.parentNode).display === "flex" ? !1 : Pe), z.pin = b, ut = vt.core.getCache(b), ut.spacer ? Wt = ut.pinState : (k && (k = Pn(k), k && !k.nodeType && (k = k.current || k.nativeElement), ut.spacerIsNative = !!k, k && (ut.spacerState = Vc(k))), ut.spacer = Gt = k || de.createElement("div"), Gt.classList.add("pin-spacer"), g && Gt.classList.add("pin-spacer-" + g), ut.pinState = Wt = Vc(b)), a.force3D !== !1 && vt.set(b, {
      force3D: !0
    }), z.spacer = Gt = ut.spacer, Vn = Ll(b), Ml = Vn[M + V.os2], oe = vt.getProperty(b), hn = vt.quickSetter(b, V.a, nn), s0(b, Gt, Vn), It = Vc(b)), I) {
      mt = su(I) ? i1(I, a1) : a1, U = Gc("scroller-start", g, lt, V, mt, 0), tt = Gc("scroller-end", g, lt, V, mt, 0, U), le = U["offset" + V.op.d2];
      var Ha = Pn(Aa(lt, "content") || lt);
      Ot = this.markerStart = Gc("start", g, Ha, V, mt, le, 0, R), Ct = this.markerEnd = Gc("end", g, Ha, V, mt, le, 0, R), R && (Ti = vt.quickSetter([Ot, Ct], V.a, nn)), !et && !(_i.length && Aa(lt, "fixedMarkers") === !0) && (yE(pt ? se : lt), vt.set([U, tt], {
        force3D: !0
      }), Wl = vt.quickSetter(U, V.a, nn), Ol = vt.quickSetter(tt, V.a, nn));
    }
    if (R) {
      var Dt = R.vars.onUpdate, St = R.vars.onUpdateParams;
      R.eventCallback("onUpdate", function() {
        z.update(0, 0, 1), Dt && Dt.apply(R, St || []);
      });
    }
    if (z.previous = function() {
      return jt[jt.indexOf(z) - 1];
    }, z.next = function() {
      return jt[jt.indexOf(z) + 1];
    }, z.revert = function(at, Ut) {
      if (!Ut)
        return z.kill(!0);
      var zt = at !== !1 || !z.enabled, Ht = zn;
      zt !== z.isReverted && (zt && (xn = Math.max(L(), z.scroll.rec || 0), J = z.progress, bi = s && s.progress()), Ot && [Ot, Ct, U, tt].forEach(function(Ce) {
        return Ce.style.display = zt ? "none" : "block";
      }), zt && (zn = z, z.update(zt)), b && (!j || !z.isActive) && (zt ? xE(b, Gt, Wt) : s0(b, Gt, Ll(b), Me)), zt || z.update(zt), zn = Ht, z.isReverted = zt);
    }, z.refresh = function(at, Ut, zt, Ht) {
      if (!((zn || !z.enabled) && !Ut)) {
        if (b && at && Gl) {
          cn(f, "scrollEnd", Hy);
          return;
        }
        !Xn && _t && _t(z), zn = z, rt.tween && !zt && (rt.tween.kill(), rt.tween = 0), wt && wt.pause(), T && s && (s.revert({
          kill: !1
        }).invalidate(), s.getChildren ? s.getChildren(!0, !0, !1).forEach(function(ti) {
          return ti.vars.immediateRender && ti.render(0, !0, !0);
        }) : s.vars.immediateRender && s.render(0, !0, !0)), z.isReverted || z.revert(!0, !0), z._subPinOffset = !1;
        var Ce = dt(), qt = Mt(), Se = R ? R.duration() : pi(lt, V), ze = At <= 0.01 || !At, _e = 0, ae = Ht || 0, ue = su(zt) ? zt.end : a.end, il = a.endTrigger || S, be = su(zt) ? zt.start : a.start || (a.start === 0 || !S ? 0 : b ? "0 0" : "0 100%"), dn = z.pinnedContainer = a.pinnedContainer && Pn(a.pinnedContainer, z), Mn = S && Math.max(0, jt.indexOf(z)) || 0, Ie = Mn, Ve, tn, Il, Qi, je, He, al, ul, Qe, Ze, mn, Zi, Tu;
        for (I && su(zt) && (Zi = vt.getProperty(U, V.p), Tu = vt.getProperty(tt, V.p)); Ie-- > 0; )
          He = jt[Ie], He.end || He.refresh(0, 1) || (zn = z), al = He.pin, al && (al === S || al === b || al === dn) && !He.isReverted && (Ze || (Ze = []), Ze.unshift(He), He.revert(!0, !0)), He !== jt[Ie] && (Mn--, Ie--);
        for (Cn(be) && (be = be(z)), be = t1(be, "start", z), Tt = o1(be, S, Ce, V, L(), Ot, U, z, qt, st, et, Se, R, z._startClamp && "_startClamp") || (b ? -1e-3 : 0), Cn(ue) && (ue = ue(z)), pl(ue) && !ue.indexOf("+=") && (~ue.indexOf(" ") ? ue = (pl(be) ? be.split(" ")[0] : "") + ue : (_e = Pc(ue.substr(2), Ce), ue = pl(be) ? be : (R ? vt.utils.mapRange(0, R.duration(), R.scrollTrigger.start, R.scrollTrigger.end, Tt) : Tt) + _e, il = S)), ue = t1(ue, "end", z), ht = Math.max(Tt, o1(ue || (il ? "100% 0" : Se), il, Ce, V, L() + _e, Ct, tt, z, qt, st, et, Se, R, z._endClamp && "_endClamp")) || -1e-3, _e = 0, Ie = Mn; Ie--; )
          He = jt[Ie] || {}, al = He.pin, al && He.start - He._pinPush <= Tt && !R && He.end > 0 && (Ve = He.end - (z._startClamp ? Math.max(0, He.start) : He.start), (al === S && He.start - He._pinPush < Tt || al === dn) && isNaN(be) && (_e += Ve * (1 - He.progress)), al === b && (ae += Ve));
        if (Tt += _e, ht += _e, z._startClamp && (z._startClamp += _e), z._endClamp && !Xn && (z._endClamp = ht || -1e-3, ht = Math.min(ht, pi(lt, V))), At = ht - Tt || (Tt -= 0.01) && 1e-3, ze && (J = vt.utils.clamp(0, 1, vt.utils.normalize(Tt, ht, xn))), z._pinPush = ae, Ot && _e && (Ve = {}, Ve[V.a] = "+=" + _e, dn && (Ve[V.p] = "-=" + L()), vt.set([Ot, Ct], Ve)), b && !(C0 && z.end >= pi(lt, V)))
          Ve = Ll(b), Qi = V === ln, Il = L(), Oe = parseFloat(oe(V.a)) + ae, !Se && ht > 1 && (mn = (pt ? de.scrollingElement || vl : lt).style, mn = {
            style: mn,
            value: mn["overflow" + V.a.toUpperCase()]
          }, pt && Ll(se)["overflow" + V.a.toUpperCase()] !== "scroll" && (mn.style["overflow" + V.a.toUpperCase()] = "scroll")), s0(b, Gt, Ve), It = Vc(b), tn = qi(b, !0), ul = et && Na(lt, Qi ? Gn : ln)(), M ? (Me = [M + V.os2, At + ae + nn], Me.t = Gt, Ie = M === Pe ? mf(b, V) + At + ae : 0, Ie && (Me.push(V.d, Ie + nn), Gt.style.flexBasis !== "auto" && (Gt.style.flexBasis = Ie + nn)), Or(Me), dn && jt.forEach(function(ti) {
            ti.pin === dn && ti.vars.pinSpacing !== !1 && (ti._subPinOffset = !0);
          }), et && L(xn)) : (Ie = mf(b, V), Ie && Gt.style.flexBasis !== "auto" && (Gt.style.flexBasis = Ie + nn)), et && (je = {
            top: tn.top + (Qi ? Il - Tt : ul) + nn,
            left: tn.left + (Qi ? ul : Il - Tt) + nn,
            boxSizing: "border-box",
            position: "fixed"
          }, je[gu] = je["max" + Dr] = Math.ceil(tn.width) + nn, je[pu] = je["max" + am] = Math.ceil(tn.height) + nn, je[Bl] = je[Bl + ks] = je[Bl + Ks] = je[Bl + Fs] = je[Bl + Js] = "0", je[Pe] = Ve[Pe], je[Pe + ks] = Ve[Pe + ks], je[Pe + Ks] = Ve[Pe + Ks], je[Pe + Fs] = Ve[Pe + Fs], je[Pe + Js] = Ve[Pe + Js], Kt = OE(Wt, je, j), Xn && L(0)), s ? (Qe = s._initted, i0(1), s.render(s.duration(), !0, !0), En = oe(V.a) - Oe + At + ae, $e = Math.abs(At - En) > 1, et && $e && Kt.splice(Kt.length - 2, 2), s.render(0, !0, !0), Qe || s.invalidate(!0), s.parent || s.totalTime(s.totalTime()), i0(0)) : En = At, mn && (mn.value ? mn.style["overflow" + V.a.toUpperCase()] = mn.value : mn.style.removeProperty("overflow-" + V.a));
        else if (S && L() && !R)
          for (tn = S.parentNode; tn && tn !== se; )
            tn._pinOffset && (Tt -= tn._pinOffset, ht -= tn._pinOffset), tn = tn.parentNode;
        Ze && Ze.forEach(function(ti) {
          return ti.revert(!1, !0);
        }), z.start = Tt, z.end = ht, it = ct = Xn ? xn : L(), !R && !Xn && !wa && (it < xn && L(xn), z.scroll.rec = 0), z.revert(!1, !0), O = An(), Qn && (x = -1, Qn.restart(!0)), zn = 0, s && nt && (s._initted || bi) && s.progress() !== bi && s.progress(bi || 0, !0).render(s.time(), !0, !0), (ze || J !== z.progress || R || T || s && !s._initted) && (s && !nt && (s._initted || J || s.vars.immediateRender !== !1) && s.totalProgress(R && Tt < -1e-3 && !J ? vt.utils.normalize(Tt, ht, 0) : J, !0), z.progress = ze || (it - Tt) / At === J ? 0 : J), b && M && (Gt._pinOffset = Math.round(z.progress * En)), wt && wt.invalidate(), isNaN(Zi) || (Zi -= vt.getProperty(U, V.p), Tu -= vt.getProperty(tt, V.p), jc(U, V, Zi), jc(Ot, V, Zi - (Ht || 0)), jc(tt, V, Tu), jc(Ct, V, Tu - (Ht || 0))), ze && !Xn && z.update(), p && !Xn && !xt && (xt = !0, p(z), xt = !1);
      }
    }, z.getVelocity = function() {
      return (L() - ct) / (An() - Ns) * 1e3 || 0;
    }, z.endAnimation = function() {
      As(z.callbackAnimation), s && (wt ? wt.progress(1) : s.paused() ? nt || As(s, z.direction < 0, 1) : As(s, s.reversed()));
    }, z.labelToScroll = function(at) {
      return s && s.labels && (Tt || z.refresh() || Tt) + s.labels[at] / s.duration() * At || 0;
    }, z.getTrailing = function(at) {
      var Ut = jt.indexOf(z), zt = z.direction > 0 ? jt.slice(0, Ut).reverse() : jt.slice(Ut + 1);
      return (pl(at) ? zt.filter(function(Ht) {
        return Ht.vars.preventOverlaps === at;
      }) : zt).filter(function(Ht) {
        return z.direction > 0 ? Ht.end <= Tt : Ht.start >= ht;
      });
    }, z.update = function(at, Ut, zt) {
      if (!(R && !zt && !at)) {
        var Ht = Xn === !0 ? xn : z.scroll(), Ce = at ? 0 : (Ht - Tt) / At, qt = Ce < 0 ? 0 : Ce > 1 ? 1 : Ce || 0, Se = z.progress, ze, _e, ae, ue, il, be, dn, Mn;
        if (Ut && (ct = it, it = R ? L() : Ht, B && (yi = $l, $l = s && !nt ? s.totalProgress() : qt)), w && b && !zn && !Yc && Gl && (!qt && Tt < Ht + (Ht - ct) / (An() - Ns) * w ? qt = 1e-4 : qt === 1 && ht > Ht + (Ht - ct) / (An() - Ns) * w && (qt = 0.9999)), qt !== Se && z.enabled) {
          if (ze = z.isActive = !!qt && qt < 1, _e = !!Se && Se < 1, be = ze !== _e, il = be || !!qt != !!Se, z.direction = qt > Se ? 1 : -1, z.progress = qt, il && !zn && (ae = qt && !Se ? 0 : qt === 1 ? 1 : Se === 1 ? 2 : 3, nt && (ue = !be && P[ae + 1] !== "none" && P[ae + 1] || P[ae], Mn = s && (ue === "complete" || ue === "reset" || ue in s))), $ && (be || Mn) && (Mn || v || !s) && (Cn($) ? $(z) : z.getTrailing($).forEach(function(Il) {
            return Il.endAnimation();
          })), nt || (wt && !zn && !Yc ? (wt._dp._time - wt._start !== wt._time && wt.render(wt._dp._time - wt._start), wt.resetTo ? wt.resetTo("totalProgress", qt, s._tTime / s._tDur) : (wt.vars.totalProgress = qt, wt.invalidate().restart())) : s && s.totalProgress(qt, !!(zn && (O || at)))), b) {
            if (at && M && (Gt.style[M + V.os2] = Ml), !et)
              hn(Hs(Oe + En * qt));
            else if (il) {
              if (dn = !at && qt > Se && ht + 1 > Ht && Ht + 1 >= pi(lt, V), j)
                if (!at && (ze || dn)) {
                  var Ie = qi(b, !0), Ve = Ht - Tt;
                  c1(b, se, Ie.top + (V === ln ? Ve : 0) + nn, Ie.left + (V === ln ? 0 : Ve) + nn);
                } else
                  c1(b, Gt);
              Or(ze || dn ? Kt : It), $e && qt < 1 && ze || hn(Oe + (qt === 1 && !dn ? En : 0));
            }
          }
          B && !rt.tween && !zn && !Yc && Qn.restart(!0), d && (be || Z && qt && (qt < 1 || !a0)) && uo(d.targets).forEach(function(Il) {
            return Il.classList[ze || Z ? "add" : "remove"](d.className);
          }), h && !nt && !at && h(z), il && !zn ? (nt && (Mn && (ue === "complete" ? s.pause().totalProgress(1) : ue === "reset" ? s.restart(!0).pause() : ue === "restart" ? s.restart(!0) : s[ue]()), h && h(z)), (be || !a0) && (_ && be && hr(z, _), K[ae] && hr(z, K[ae]), Z && (qt === 1 ? z.kill(!1, 1) : K[ae] = 0), be || (ae = qt === 1 ? 1 : 3, K[ae] && hr(z, K[ae]))), Q && !ze && Math.abs(z.getVelocity()) > (Ys(Q) ? Q : 2500) && (As(z.callbackAnimation), wt ? wt.progress(1) : As(s, ue === "reverse" ? 1 : !qt, 1))) : nt && h && !zn && h(z);
        }
        if (Ol) {
          var tn = R ? Ht / R.duration() * (R._caScrollDist || 0) : Ht;
          Wl(tn + (U._isFlipped ? 1 : 0)), Ol(tn);
        }
        Ti && Ti(-Ht / R.duration() * (R._caScrollDist || 0));
      }
    }, z.enable = function(at, Ut) {
      z.enabled || (z.enabled = !0, cn(lt, "resize", Bs), pt || cn(lt, "scroll", mr), _t && cn(f, "refreshInit", _t), at !== !1 && (z.progress = J = 0, it = ct = x = L()), Ut !== !1 && z.refresh());
    }, z.getTween = function(at) {
      return at && rt ? rt.tween : wt;
    }, z.setPositions = function(at, Ut, zt, Ht) {
      if (R) {
        var Ce = R.scrollTrigger, qt = R.duration(), Se = Ce.end - Ce.start;
        at = Ce.start + Se * at / qt, Ut = Ce.start + Se * Ut / qt;
      }
      z.refresh(!1, !1, {
        start: e1(at, zt && !!z._startClamp),
        end: e1(Ut, zt && !!z._endClamp)
      }, Ht), z.update();
    }, z.adjustPinSpacing = function(at) {
      if (Me && at) {
        var Ut = Me.indexOf(V.d) + 1;
        Me[Ut] = parseFloat(Me[Ut]) + at + nn, Me[1] = parseFloat(Me[1]) + at + nn, Or(Me);
      }
    }, z.disable = function(at, Ut) {
      if (at !== !1 && z.revert(!0, !0), z.enabled && (z.enabled = z.isActive = !1, Ut || wt && wt.pause(), xn = 0, ut && (ut.uncache = 1), _t && on(f, "refreshInit", _t), Qn && (Qn.pause(), rt.tween && rt.tween.kill() && (rt.tween = 0)), !pt)) {
        for (var zt = jt.length; zt--; )
          if (jt[zt].scroller === lt && jt[zt] !== z)
            return;
        on(lt, "resize", Bs), pt || on(lt, "scroll", mr);
      }
    }, z.kill = function(at, Ut) {
      z.disable(at, Ut), wt && !Ut && wt.kill(), g && delete R0[g];
      var zt = jt.indexOf(z);
      zt >= 0 && jt.splice(zt, 1), zt === qn && $c > 0 && qn--, zt = 0, jt.forEach(function(Ht) {
        return Ht.scroller === z.scroller && (zt = 1);
      }), zt || Xn || wa || (z.scroll.rec = 0), s && (s.scrollTrigger = null, at && s.revert({
        kill: !1
      }), Ut || s.kill()), Ot && [Ot, Ct, U, tt].forEach(function(Ht) {
        return Ht.parentNode && Ht.parentNode.removeChild(Ht);
      }), Ps === z && (Ps = 0), b && (ut && (ut.uncache = 1), zt = 0, jt.forEach(function(Ht) {
        return Ht.pin === b && zt++;
      }), zt || (ut.spacer = 0)), a.onKill && a.onKill(z);
    }, jt.push(z), z.enable(!1, !1), Vl && Vl(z), s && s.add && !At) {
      var Lt = z.update;
      z.update = function() {
        z.update = Lt, Zt.cache++, Tt || ht || z.refresh();
      }, vt.delayedCall(0.01, z.update), At = 0.01, Tt = ht = 0;
    } else
      z.refresh();
    b && EE();
  }, f.register = function(a) {
    return gr || (vt = a || wy(), Ay() && window.document && f.enable(), gr = Us), gr;
  }, f.defaults = function(a) {
    if (a)
      for (var s in a)
        Xc[s] = a[s];
    return Xc;
  }, f.disable = function(a, s) {
    Us = 0, jt.forEach(function(h) {
      return h[s ? "kill" : "disable"](a);
    }), on(Qt, "wheel", mr), on(de, "scroll", mr), clearInterval(Hc), on(de, "touchcancel", di), on(se, "touchstart", di), Lc(on, de, "pointerdown,touchstart,mousedown", n1), Lc(on, de, "pointerup,touchend,mouseup", l1), df.kill(), Bc(on);
    for (var c = 0; c < Zt.length; c += 3)
      qc(on, Zt[c], Zt[c + 1]), qc(on, Zt[c], Zt[c + 2]);
  }, f.enable = function() {
    if (Qt = window, de = document, vl = de.documentElement, se = de.body, vt) {
      if (uo = vt.utils.toArray, Zs = vt.utils.clamp, w0 = vt.core.context || di, i0 = vt.core.suppressOverwrites || di, em = Qt.history.scrollRestoration || "auto", D0 = Qt.pageYOffset || 0, vt.core.globals("ScrollTrigger", f), se) {
        Us = 1, Mr = document.createElement("div"), Mr.style.height = "100vh", Mr.style.position = "absolute", qy(), pE(), Ge.register(vt), f.isTouch = Ge.isTouch, ya = Ge.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), A0 = Ge.isTouch === 1, cn(Qt, "wheel", mr), tm = [Qt, de, vl, se], vt.matchMedia ? (f.matchMedia = function(p) {
          var v = vt.matchMedia(), S;
          for (S in p)
            v.add(S, p[S]);
          return v;
        }, vt.addEventListener("matchMediaInit", function() {
          By(), rm();
        }), vt.addEventListener("matchMediaRevert", function() {
          return Yy();
        }), vt.addEventListener("matchMedia", function() {
          cu(0, 1), Su("matchMedia");
        }), vt.matchMedia().add("(orientation: portrait)", function() {
          return r0(), r0;
        })) : console.warn("Requires GSAP 3.11.0 or later"), r0(), cn(de, "scroll", mr);
        var a = se.hasAttribute("style"), s = se.style, c = s.borderTopStyle, h = vt.core.Animation.prototype, d, g;
        for (h.revert || Object.defineProperty(h, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), s.borderTopStyle = "solid", d = qi(se), ln.m = Math.round(d.top + ln.sc()) || 0, Gn.m = Math.round(d.left + Gn.sc()) || 0, c ? s.borderTopStyle = c : s.removeProperty("border-top-style"), a || (se.setAttribute("style", ""), se.removeAttribute("style")), Hc = setInterval(u1, 250), vt.delayedCall(0.5, function() {
          return Yc = 0;
        }), cn(de, "touchcancel", di), cn(se, "touchstart", di), Lc(cn, de, "pointerdown,touchstart,mousedown", n1), Lc(cn, de, "pointerup,touchend,mouseup", l1), z0 = vt.utils.checkPrefix("transform"), Ic.push(z0), gr = An(), df = vt.delayedCall(0.2, cu).pause(), pr = [de, "visibilitychange", function() {
          var p = Qt.innerWidth, v = Qt.innerHeight;
          de.hidden ? ($v = p, Iv = v) : ($v !== p || Iv !== v) && Bs();
        }, de, "DOMContentLoaded", cu, Qt, "load", cu, Qt, "resize", Bs], Bc(cn), jt.forEach(function(p) {
          return p.enable(0, 1);
        }), g = 0; g < Zt.length; g += 3)
          qc(on, Zt[g], Zt[g + 1]), qc(on, Zt[g], Zt[g + 2]);
      } else if (de) {
        var _ = function p() {
          f.enable(), de.removeEventListener("DOMContentLoaded", p);
        };
        de.addEventListener("DOMContentLoaded", _);
      }
    }
  }, f.config = function(a) {
    "limitCallbacks" in a && (a0 = !!a.limitCallbacks);
    var s = a.syncInterval;
    s && clearInterval(Hc) || (Hc = s) && setInterval(u1, s), "ignoreMobileResize" in a && (A0 = f.isTouch === 1 && a.ignoreMobileResize), "autoRefreshEvents" in a && (Bc(on) || Bc(cn, a.autoRefreshEvents || "none"), My = (a.autoRefreshEvents + "").indexOf("resize") === -1);
  }, f.scrollerProxy = function(a, s) {
    var c = Pn(a), h = Zt.indexOf(c), d = vu(c);
    ~h && Zt.splice(h, d ? 6 : 2), s && (d ? _i.unshift(Qt, s, se, s, vl, s) : _i.unshift(c, s));
  }, f.clearMatchMedia = function(a) {
    jt.forEach(function(s) {
      return s._ctx && s._ctx.query === a && s._ctx.kill(!0, !0);
    });
  }, f.isInViewport = function(a, s, c) {
    var h = (pl(a) ? Pn(a) : a).getBoundingClientRect(), d = h[c ? gu : pu] * s || 0;
    return c ? h.right - d > 0 && h.left + d < Qt.innerWidth : h.bottom - d > 0 && h.top + d < Qt.innerHeight;
  }, f.positionInViewport = function(a, s, c) {
    pl(a) && (a = Pn(a));
    var h = a.getBoundingClientRect(), d = h[c ? gu : pu], g = s == null ? d / 2 : s in gf ? gf[s] * d : ~s.indexOf("%") ? parseFloat(s) * d / 100 : parseFloat(s) || 0;
    return c ? (h.left + g) / Qt.innerWidth : (h.top + g) / Qt.innerHeight;
  }, f.killAll = function(a) {
    if (jt.slice(0).forEach(function(c) {
      return c.vars.id !== "ScrollSmoother" && c.kill();
    }), a !== !0) {
      var s = yu.killAll || [];
      yu = {}, s.forEach(function(c) {
        return c();
      });
    }
  }, f;
})();
Xt.version = "3.15.1";
Xt.saveStyles = function(f) {
  return f ? uo(f).forEach(function(i) {
    if (i && i.style) {
      var u = gl.indexOf(i);
      u >= 0 && gl.splice(u, 5), gl.push(i, i.style.cssText, i.getBBox && i.getAttribute("transform"), vt.core.getCache(i), w0());
    }
  }) : gl;
};
Xt.revert = function(f, i) {
  return rm(!f, i);
};
Xt.create = function(f, i) {
  return new Xt(f, i);
};
Xt.refresh = function(f) {
  return f ? Bs(!0) : (gr || Xt.register()) && cu(!0);
};
Xt.update = function(f) {
  return ++Zt.cache && Gi(f === !0 ? 2 : 0);
};
Xt.clearScrollMemory = Ly;
Xt.maxScroll = function(f, i) {
  return pi(f, i ? Gn : ln);
};
Xt.getScrollFunc = function(f, i) {
  return Na(Pn(f), i ? Gn : ln);
};
Xt.getById = function(f) {
  return R0[f];
};
Xt.getAll = function() {
  return jt.filter(function(f) {
    return f.vars.id !== "ScrollSmoother";
  });
};
Xt.isScrolling = function() {
  return !!Gl;
};
Xt.snapDirectional = um;
Xt.addEventListener = function(f, i) {
  var u = yu[f] || (yu[f] = []);
  ~u.indexOf(i) || u.push(i);
};
Xt.removeEventListener = function(f, i) {
  var u = yu[f], a = u && u.indexOf(i);
  a >= 0 && u.splice(a, 1);
};
Xt.batch = function(f, i) {
  var u = [], a = {}, s = i.interval || 0.016, c = i.batchMax || 1e9, h = function(_, p) {
    var v = [], S = [], b = vt.delayedCall(s, function() {
      p(v, S), v = [], S = [];
    }).pause();
    return function(M) {
      v.length || b.restart(!0), v.push(M.trigger), S.push(M), c <= v.length && b.progress(1);
    };
  }, d;
  for (d in i)
    a[d] = d.substr(0, 2) === "on" && Cn(i[d]) && d !== "onRefreshInit" ? h(d, i[d]) : i[d];
  return Cn(c) && (c = c(), cn(Xt, "refresh", function() {
    return c = i.batchMax();
  })), uo(f).forEach(function(g) {
    var _ = {};
    for (d in a)
      _[d] = a[d];
    _.trigger = g, u.push(Xt.create(_));
  }), u;
};
var h1 = function(i, u, a, s) {
  return u > s ? i(s) : u < 0 && i(0), a > s ? (s - u) / (a - u) : a < 0 ? u / (u - a) : 1;
}, o0 = function f(i, u) {
  u === !0 ? i.style.removeProperty("touch-action") : i.style.touchAction = u === !0 ? "auto" : u ? "pan-" + u + (Ge.isTouch ? " pinch-zoom" : "") : "none", i === vl && f(se, u);
}, Qc = {
  auto: 1,
  scroll: 1
}, AE = function(i) {
  var u = i.event, a = i.target, s = i.axis, c = (u.changedTouches ? u.changedTouches[0] : u).target, h = c._gsap || vt.core.getCache(c), d = An(), g;
  if (!h._isScrollT || d - h._isScrollT > 2e3) {
    for (; c && c !== se && (c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth || !(Qc[(g = Ll(c)).overflowY] || Qc[g.overflowX])); )
      c = c.parentNode;
    h._isScroll = c && c !== a && !vu(c) && (Qc[(g = Ll(c)).overflowY] || Qc[g.overflowX]), h._isScrollT = d;
  }
  (h._isScroll || s === "x") && (u.stopPropagation(), u._gsapAllow = !0);
}, Gy = function(i, u, a, s) {
  return Ge.create({
    target: i,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: u,
    onWheel: s = s && AE,
    onPress: s,
    onDrag: s,
    onScroll: s,
    onEnable: function() {
      return a && cn(de, Ge.eventTypes[0], m1, !1, !0);
    },
    onDisable: function() {
      return on(de, Ge.eventTypes[0], m1, !0);
    }
  });
}, wE = /(input|label|select|textarea)/i, d1, m1 = function(i) {
  var u = wE.test(i.target.tagName);
  (u || d1) && (i._gsapAllow = !0, d1 = u);
}, CE = function(i) {
  su(i) || (i = {}), i.preventDefault = i.isNormalizer = i.allowClicks = !0, i.type || (i.type = "wheel,touch"), i.debounce = !!i.debounce, i.id = i.id || "normalizer";
  var u = i, a = u.normalizeScrollX, s = u.momentum, c = u.allowNestedScroll, h = u.onRelease, d, g, _ = Pn(i.target) || vl, p = vt.core.globals().ScrollSmoother, v = p && p.get(), S = ya && (i.content && Pn(i.content) || v && i.content !== !1 && !v.smooth() && v.content()), b = Na(_, ln), M = Na(_, Gn), T = 1, w = (Ge.isTouch && Qt.visualViewport ? Qt.visualViewport.scale * Qt.visualViewport.width : Qt.outerWidth) / Qt.innerWidth, G = 0, q = Cn(s) ? function() {
    return s(d);
  } : function() {
    return s || 2.8;
  }, Z, B, j = Gy(_, i.type, !0, c), k = function() {
    return B = !1;
  }, R = di, Q = di, $ = function() {
    g = pi(_, ln), Q = Zs(ya ? 1 : 0, g), a && (R = Zs(0, pi(_, Gn))), Z = _u;
  }, V = function() {
    S._gsap.y = Hs(parseFloat(S._gsap.y) + b.offset) + "px", S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(S._gsap.y) + ", 0, 1)", b.offset = b.cacheID = 0;
  }, nt = function() {
    if (B) {
      requestAnimationFrame(k);
      var I = Hs(d.deltaY / 2), st = Q(b.v - I);
      if (S && st !== b.v + b.offset) {
        b.offset = st - b.v;
        var z = Hs((parseFloat(S && S._gsap.y) || 0) - b.offset);
        S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + z + ", 0, 1)", S._gsap.y = z + "px", b.cacheID = Zt.cache, Gi();
      }
      return !0;
    }
    b.offset && V(), B = !0;
  }, lt, ft, pt, et, K = function() {
    $(), lt.isActive() && lt.vars.scrollY > g && (b() > g ? lt.progress(1) && b(g) : lt.resetTo("scrollY", g));
  };
  return S && vt.set(S, {
    y: "+=0"
  }), i.ignoreCheck = function(P) {
    return ya && P.type === "touchmove" && nt() || T > 1.05 && P.type !== "touchstart" || d.isGesturing || P.touches && P.touches.length > 1;
  }, i.onPress = function() {
    B = !1;
    var P = T;
    T = Hs((Qt.visualViewport && Qt.visualViewport.scale || 1) / w), lt.pause(), P !== T && o0(_, T > 1.01 ? !0 : a ? !1 : "x"), ft = M(), pt = b(), $(), Z = _u;
  }, i.onRelease = i.onGestureStart = function(P, I) {
    if (b.offset && V(), !I)
      et.restart(!0);
    else {
      Zt.cache++;
      var st = q(), z, _t;
      a && (z = M(), _t = z + st * 0.05 * -P.velocityX / 0.227, st *= h1(M, z, _t, pi(_, Gn)), lt.vars.scrollX = R(_t)), z = b(), _t = z + st * 0.05 * -P.velocityY / 0.227, st *= h1(b, z, _t, pi(_, ln)), lt.vars.scrollY = Q(_t), lt.invalidate().duration(st).play(0.01), (ya && lt.vars.scrollY >= g || z >= g - 1) && vt.to({}, {
        onUpdate: K,
        duration: st
      });
    }
    h && h(P);
  }, i.onWheel = function() {
    lt._ts && lt.pause(), An() - G > 1e3 && (Z = 0, G = An());
  }, i.onChange = function(P, I, st, z, _t) {
    if (_u !== Z && $(), I && a && M(R(z[2] === I ? ft + (P.startX - P.x) : M() + I - z[1])), st) {
      b.offset && V();
      var dt = _t[2] === st, Mt = dt ? pt + P.startY - P.y : b() + st - _t[1], x = Q(Mt);
      dt && Mt !== x && (pt += x - Mt), b(x);
    }
    (st || I) && Gi();
  }, i.onEnable = function() {
    o0(_, a ? !1 : "x"), Xt.addEventListener("refresh", K), cn(Qt, "resize", K), b.smooth && (b.target.style.scrollBehavior = "auto", b.smooth = M.smooth = !1), j.enable();
  }, i.onDisable = function() {
    o0(_, !0), on(Qt, "resize", K), Xt.removeEventListener("refresh", K), j.kill();
  }, i.lockAxis = i.lockAxis !== !1, d = new Ge(i), d.iOS = ya, ya && !b() && b(1), ya && vt.ticker.add(di), et = d._dc, lt = vt.to(d, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: a ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Xy(b, b(), function() {
        return lt.pause();
      })
    },
    onUpdate: Gi,
    onComplete: et.vars.onComplete
  }), d;
};
Xt.sort = function(f) {
  if (Cn(f))
    return jt.sort(f);
  var i = Qt.pageYOffset || 0;
  return Xt.getAll().forEach(function(u) {
    return u._sortY = u.trigger ? i + u.trigger.getBoundingClientRect().top : u.start + Qt.innerHeight;
  }), jt.sort(f || function(u, a) {
    return (u.vars.refreshPriority || 0) * -1e6 + (u.vars.containerAnimation ? 1e6 : u._sortY) - ((a.vars.containerAnimation ? 1e6 : a._sortY) + (a.vars.refreshPriority || 0) * -1e6);
  });
};
Xt.observe = function(f) {
  return new Ge(f);
};
Xt.normalizeScroll = function(f) {
  if (typeof f > "u")
    return Ln;
  if (f === !0 && Ln)
    return Ln.enable();
  if (f === !1) {
    Ln && Ln.kill(), Ln = f;
    return;
  }
  var i = f instanceof Ge ? f : CE(f);
  return Ln && Ln.target === i.target && Ln.kill(), vu(i.target) && (Ln = i), i;
};
Xt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: O0,
  _inputObserver: Gy,
  _scrollers: Zt,
  _proxies: _i,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Gl || Su("scrollStart"), Gl = An();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return zn;
    }
  }
};
wy() && vt.registerPlugin(Xt);
const g1 = {
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
}, RE = ["circle", "beam"], DE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, Ls = (f, i, u) => Math.min(u, Math.max(i, f)), p1 = (f, i) => {
  const u = Ls(i, 0, 1), a = (1 - u) ** 1.5 * 0.85, s = (h, d) => `color-mix(in srgb, ${f} ${(h * 100).toFixed(2)}%, transparent) ${(d * 100).toFixed(2)}%`, c = [s(1, 0)];
  for (let h = 0; h <= 14; h++) {
    const d = a + (1 - a) * h / 14, g = (d - a) / (1 - a), _ = 1 - g * g * (3 - 2 * g), p = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    c.push(s(_ + (p - _) * u, d));
  }
  return c.join(", ");
}, NE = ({
  children: f,
  className: i = "",
  style: u,
  spotlightColor: a,
  intensity: s = 0.15,
  spotlightSize: c = 240,
  softness: h = 0.7,
  shape: d = "circle",
  borderGlow: g = 0.6,
  proximity: _ = 80,
  smoothing: p = 0.3,
  ambient: v = !1,
  flare: S = !0,
  grain: b = 0,
  theme: M = "dark",
  ...T
}) => {
  const w = me.useRef(null), G = me.useRef(null), q = me.useRef(null), Z = me.useRef(null), B = me.useRef(null), j = g1[M] ?? g1.dark, k = a ?? j.light, Q = {
    shape: RE.includes(d) ? d : "circle",
    fill: p1(k, h),
    edge: p1(k, 1),
    size: Math.max(20, c),
    intensity: Ls(s, 0, 1) * j.fill,
    borderGlow: Ls(g, 0, 1) * j.edge,
    proximity: Math.max(0, _),
    smoothing: Ls(p, 0, 1),
    ambient: v,
    flare: S,
    grain: Ls(b, 0, 1)
  }, $ = me.useRef(Q);
  return $.current = Q, me.useEffect(() => {
    B.current?.();
  }), me.useEffect(() => {
    const V = w.current, nt = G.current, lt = q.current, ft = Z.current;
    if (!V || !nt || !lt || !ft) return;
    const pt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, et = { x: 0, y: 0, presence: 0, flare: 0, time: Math.random() * 60, pressed: !1, visible: !0 }, K = { x: 0, y: 0, active: !1 }, P = { light: "", edge: "", noise: "" };
    let I = null, st = 0, z = 0, _t = !0;
    const dt = (ht, Ot, Ct, U, tt) => {
      if (ht.shape === "beam") {
        const mt = Math.max(Ot * 0.6, U + Ot * 0.55);
        return `radial-gradient(${(Ot * 0.55).toFixed(1)}px ${mt.toFixed(1)}px at ${Ct.toFixed(1)}px 0px, ${tt})`;
      }
      return `radial-gradient(circle ${Ot.toFixed(1)}px at ${Ct.toFixed(1)}px ${U.toFixed(1)}px, ${tt})`;
    }, Mt = (ht) => {
      const Ot = ht.size * (1 + 0.2 * et.flare), Ct = 1 + 0.7 * et.flare, U = dt(ht, Ot, et.x, et.y, ht.fill), tt = dt(ht, Ot * 0.6, et.x, ht.shape === "beam" ? 0 : et.y, ht.edge);
      U !== P.light && (P.light = U, nt.style.background = U), tt !== P.edge && (P.edge = tt, ft.style.background = tt), nt.style.opacity = String(Math.min(1, et.presence * ht.intensity * Ct)), ft.style.opacity = String(Math.min(1, et.presence * ht.borderGlow * Ct));
      const mt = ht.grain > 0 ? dt(ht, Ot, et.x, et.y, "#000 0%, transparent 100%") : "none";
      mt !== P.noise && (P.noise = mt, lt.style.webkitMaskImage = mt, lt.style.maskImage = mt), lt.style.opacity = String(et.presence * ht.grain);
    }, x = (ht) => {
      if (st = 0, !_t) return;
      const Ot = $.current, Ct = Math.min(0.05, Math.max(1e-3, (ht - z) / 1e3));
      z = ht;
      const U = V.getBoundingClientRect();
      let tt = et.x, mt = et.y, xt = 0;
      if (I && V.contains(I)) {
        const le = I.getBoundingClientRect();
        tt = le.left + le.width / 2 - U.left, mt = le.top + le.height / 2 - U.top, xt = 1;
      } else if (K.active) {
        tt = K.x - U.left, mt = K.y - U.top;
        const le = Math.hypot(Math.max(0, -tt, tt - U.width), Math.max(0, -mt, mt - U.height));
        le === 0 ? xt = 1 : Ot.proximity > 0 && (xt = Math.max(0, 1 - le / Ot.proximity) ** 2);
      }
      if (xt < 0.6 && Ot.ambient && et.visible) {
        pt || (et.time += Ct);
        const le = 0.6 - xt;
        tt += (U.width * (0.5 + 0.34 * Math.sin(et.time * 0.43)) - tt) * (le / 0.6), mt += (U.height * (0.5 + 0.3 * Math.sin(et.time * 0.61 + 1.3)) - mt) * (le / 0.6), xt = 0.6;
      }
      et.presence < 0.02 && xt > 0 && !Ot.ambient && (et.x = tt, et.y = mt);
      const At = pt || Ot.smoothing === 0 ? 1 : 1 - Math.exp(-Ct / (0.015 + Ot.smoothing * 0.22));
      et.x += (tt - et.x) * At, et.y += (mt - et.y) * At;
      const Wt = pt ? 1 : 1 - Math.exp(-Ct / (xt > et.presence ? 0.1 : 0.32));
      et.presence += (xt - et.presence) * Wt, Math.abs(xt - et.presence) < 2e-3 && (et.presence = xt);
      const Kt = et.pressed && Ot.flare && !pt ? 1 : 0;
      et.flare += (Kt - et.flare) * (1 - Math.exp(-Ct / (Kt ? 0.05 : 0.28))), Math.abs(Kt - et.flare) < 2e-3 && (et.flare = Kt), Mt(Ot), (!(!(Math.abs(tt - et.x) > 0.1 || Math.abs(mt - et.y) > 0.1) && et.presence === xt && et.flare === Kt) || Ot.ambient && et.visible && !pt) && (st = requestAnimationFrame(x));
    }, O = () => {
      st || !_t || (z = performance.now(), st = requestAnimationFrame(x));
    };
    B.current = O;
    const J = (ht) => {
      K.x = ht.clientX, K.y = ht.clientY, K.active = !0, (et.presence > 0 || $.current.proximity > 0 || V.contains(ht.target)) && O();
    }, L = (ht) => {
      ht.relatedTarget || (K.active = !1, O());
    }, rt = (ht) => {
      K.x = ht.clientX, K.y = ht.clientY, K.active = !0, et.pressed = !0, O();
    }, ut = (ht) => {
      ht.pointerType !== "mouse" && (K.active = !1), !(!et.pressed && ht.pointerType === "mouse") && (et.pressed = !1, O());
    }, bt = (ht) => {
      !(ht.target instanceof Element) || !ht.target.matches(":focus-visible") || (I = ht.target, O());
    }, it = (ht) => {
      V.contains(ht.relatedTarget) || (I = null, O());
    }, ct = () => {
      (K.active || et.presence > 0) && O();
    }, Tt = new IntersectionObserver((ht) => {
      et.visible = ht.some((Ot) => Ot.isIntersecting), et.visible && O();
    });
    return Tt.observe(V), window.addEventListener("pointermove", J), window.addEventListener("pointerup", ut), window.addEventListener("pointercancel", ut), window.addEventListener("scroll", ct, { capture: !0, passive: !0 }), document.addEventListener("pointerout", L), V.addEventListener("pointerdown", rt), V.addEventListener("focusin", bt), V.addEventListener("focusout", it), O(), () => {
      _t = !1, cancelAnimationFrame(st), Tt.disconnect(), window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", ut), window.removeEventListener("pointercancel", ut), window.removeEventListener("scroll", ct, { capture: !0 }), document.removeEventListener("pointerout", L), V.removeEventListener("pointerdown", rt), V.removeEventListener("focusin", bt), V.removeEventListener("focusout", it), B.current = null;
    };
  }, []), /* @__PURE__ */ ee.jsxs(
    "div",
    {
      ref: w,
      className: `spotlight-card${i ? ` ${i}` : ""}`,
      style: {
        "--spotlight-card-surface": j.surface,
        "--spotlight-card-border": j.border,
        "--spotlight-card-shadow": j.shadow,
        ...u
      },
      ...T,
      children: [
        /* @__PURE__ */ ee.jsx("span", { ref: G, className: "spotlight-card__light", "aria-hidden": "true" }),
        /* @__PURE__ */ ee.jsx("span", { ref: q, className: "spotlight-card__grain", style: { backgroundImage: DE }, "aria-hidden": "true" }),
        f,
        /* @__PURE__ */ ee.jsx("span", { className: "spotlight-card__border", "aria-hidden": "true" }),
        /* @__PURE__ */ ee.jsx("span", { ref: Z, className: "spotlight-card__edge", "aria-hidden": "true" })
      ]
    }
  );
}, c0 = { stiffness: 170, damping: 16, mass: 1 }, UE = (f, i, u) => {
  const a = Math.min(1, Math.max(0, (u - f) / (i - f)));
  return a * a * (3 - 2 * a);
}, ef = /* @__PURE__ */ new Set(), Pl = { pointer: null, owner: null };
let ws = null;
const Vy = (f, i) => {
  const u = i.x - (f.left + f.width / 2), a = i.y - (f.top + f.height / 2), s = Math.hypot(Math.max(0, Math.abs(u) - f.width / 2), Math.max(0, Math.abs(a) - f.height / 2));
  return { dx: u, dy: a, outside: s };
}, qs = () => {
  let f = null, i = 1 / 0, u = 1 / 0;
  for (const s of ef) {
    const c = s.settings.current;
    let h = null;
    if (Pl.pointer && !c.disabled && !s.reduce && (h = Vy(s.wrapper.getBoundingClientRect(), Pl.pointer), h.outside > c.padding && (h = null)), !c.exclusive) {
      (h || s.active) && s.wake();
      continue;
    }
    if (!h) continue;
    const d = Math.hypot(h.dx, h.dy);
    (h.outside < i || h.outside === i && d < u) && (f = s, i = h.outside, u = d);
  }
  const a = Pl.owner;
  Pl.owner = f, a && a !== f && a.wake(), f && f.wake();
}, HE = () => {
  const f = (u) => {
    u.pointerType !== "touch" && (Pl.pointer = { x: u.clientX, y: u.clientY }, qs());
  }, i = () => {
    Pl.pointer = null, qs();
  };
  return window.addEventListener("pointermove", f, { passive: !0 }), window.addEventListener("scroll", qs, { passive: !0, capture: !0 }), document.documentElement.addEventListener("pointerleave", i), window.addEventListener("blur", i), () => {
    window.removeEventListener("pointermove", f), window.removeEventListener("scroll", qs, { capture: !0 }), document.documentElement.removeEventListener("pointerleave", i), window.removeEventListener("blur", i);
  };
}, sm = ({
  children: f,
  padding: i = 100,
  disabled: u = !1,
  magnetStrength: a = 2,
  maxOffset: s,
  exclusive: c = !0,
  axis: h = "both",
  tilt: d = 0,
  scale: g = 1,
  spring: _,
  onActiveChange: p,
  wrapperClassName: v = "",
  innerClassName: S = "",
  style: b,
  ...M
}) => {
  const T = me.useRef(null), w = me.useRef(null), G = me.useRef(null), q = {
    padding: Math.max(0, i),
    disabled: u,
    strength: Math.max(0.1, a),
    maxOffset: s,
    exclusive: c,
    axis: h,
    tilt: d,
    scale: g,
    stiffness: Math.max(1, _?.stiffness ?? c0.stiffness),
    damping: Math.max(0, _?.damping ?? c0.damping),
    mass: Math.max(0.01, _?.mass ?? c0.mass),
    onActiveChange: p
  }, Z = me.useRef(q);
  return Z.current = q, me.useEffect(() => {
    const B = T.current, j = w.current;
    if (!B || !j) return;
    const k = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, R = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 }, Q = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 0 };
    let $ = !1, V = 0, nt = 0;
    const lt = (I, st) => {
      const z = Z.current;
      let _t = !0;
      return Object.keys(R).forEach((dt) => {
        const Mt = z.stiffness * (I[dt] - R[dt]) - z.damping * Q[dt];
        Q[dt] += Mt / z.mass * st, R[dt] += Q[dt] * st;
        const x = dt === "scale" ? 1e-3 : 0.05;
        (Math.abs(I[dt] - R[dt]) > x || Math.abs(Q[dt]) > x) && (_t = !1);
      }), _t;
    }, ft = () => {
      const I = Z.current, st = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
      if (I.disabled || k || !Pl.pointer) return { target: st, engaged: !1 };
      if (I.exclusive && Pl.owner !== P) return { target: st, engaged: !1 };
      const z = B.getBoundingClientRect(), { dx: _t, dy: dt, outside: Mt } = Vy(z, Pl.pointer);
      if (Mt > I.padding) return { target: st, engaged: !1 };
      const x = I.padding > 0 ? 1 - UE(I.padding * 0.5, I.padding, Mt) : 1;
      let O = I.axis === "y" ? 0 : _t / I.strength * x, J = I.axis === "x" ? 0 : dt / I.strength * x;
      if (I.maxOffset !== void 0 && I.maxOffset !== null) {
        const ut = Math.hypot(O, J);
        ut > I.maxOffset && (O *= I.maxOffset / ut, J *= I.maxOffset / ut);
      }
      const L = Math.max(-1, Math.min(1, _t / Math.max(z.width / 2, 1))), rt = Math.max(-1, Math.min(1, dt / Math.max(z.height / 2, 1)));
      return st.x = O, st.y = J, st.tiltX = -rt * I.tilt * x, st.tiltY = L * I.tilt * x, st.scale = 1 + (I.scale - 1) * x, { target: st, engaged: !0 };
    }, pt = () => {
      const { x: I, y: st, tiltX: z, tiltY: _t, scale: dt } = R, Mt = Math.abs(z) > 0.01 || Math.abs(_t) > 0.01;
      j.style.transform = `translate3d(${I.toFixed(2)}px, ${st.toFixed(2)}px, 0)${Mt ? ` perspective(800px) rotateX(${z.toFixed(2)}deg) rotateY(${_t.toFixed(2)}deg)` : ""}${Math.abs(dt - 1) > 5e-4 ? ` scale(${dt.toFixed(4)})` : ""}`;
    }, et = (I) => {
      V = 0;
      const st = nt ? Math.min((I - nt) / 1e3, 1 / 30) : 1 / 60;
      nt = I;
      const { target: z, engaged: _t } = ft();
      _t !== $ && ($ = _t, P.active = _t, _t ? B.setAttribute("data-magnet-active", "") : B.removeAttribute("data-magnet-active"), Z.current.onActiveChange?.(_t));
      const dt = Math.ceil(st / (1 / 120));
      let Mt = !0;
      for (let x = 0; x < dt; x++) Mt = lt(z, st / dt);
      Mt && Object.keys(R).forEach((x) => {
        R[x] = z[x], Q[x] = 0;
      }), pt(), Mt ? nt = 0 : V = requestAnimationFrame(et);
    };
    function K() {
      V || (V = requestAnimationFrame(et));
    }
    const P = { wrapper: B, settings: Z, reduce: k, wake: K, active: !1 };
    return ef.add(P), ws || (ws = HE()), G.current = () => {
      qs(), K();
    }, () => {
      cancelAnimationFrame(V), G.current = null, ef.delete(P), Pl.owner === P && (Pl.owner = null), !ef.size && ws && (ws(), ws = null);
    };
  }, []), me.useEffect(() => {
    G.current?.();
  }), /* @__PURE__ */ ee.jsx(
    "div",
    {
      ref: T,
      className: v,
      style: { position: "relative", display: "inline-block", ...b },
      ...M,
      children: /* @__PURE__ */ ee.jsx("div", { ref: w, className: S, style: { willChange: "transform" }, children: f })
    }
  );
}, U0 = 5, jy = 3, YE = 2.4, BE = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`, LE = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[${U0}];
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
  for (int k = 0; k < ${jy}; k++) {
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
}`, Cs = (f, i, u) => Math.min(u, Math.max(i, f)), qE = (f) => {
  const [i, u, a] = f.map((g) => g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)), s = Math.cbrt(0.4122214708 * i + 0.5363325363 * u + 0.0514459929 * a), c = Math.cbrt(0.2119034982 * i + 0.6806995451 * u + 0.1073969566 * a), h = Math.cbrt(0.0883024619 * i + 0.2817188376 * u + 0.6299787005 * a), d = [
    0.2104542553 * s + 0.793617785 * c - 0.0040720468 * h,
    1.9779984951 * s - 2.428592205 * c + 0.4505937099 * h,
    0.0259040371 * s + 0.7827717662 * c - 0.808675766 * h
  ];
  return [d[0], Math.hypot(d[1], d[2]), Math.atan2(d[2], d[1])];
}, XE = (f) => {
  const i = f.findIndex((s) => s[1] > 0.02);
  let a = i === -1 ? 0 : f[i][2];
  return f.map((s) => {
    let c = s[1] > 0.02 ? s[2] : a;
    for (; c - a > Math.PI; ) c -= Math.PI * 2;
    for (; c - a < -Math.PI; ) c += Math.PI * 2;
    return a = c, [s[0], s[1], c];
  });
}, _1 = (f, i, u) => {
  const a = f.createShader(i);
  return a ? (f.shaderSource(a, u), f.compileShader(a), f.getShaderParameter(a, f.COMPILE_STATUS) ? a : (f.deleteShader(a), null)) : null;
}, GE = (f) => {
  const i = _1(f, f.VERTEX_SHADER, BE), u = _1(f, f.FRAGMENT_SHADER, LE), a = f.createProgram();
  if (!i || !u || !a) return null;
  if (f.attachShader(a, i), f.attachShader(a, u), f.bindAttribLocation(a, 0, "aPosition"), f.linkProgram(a), f.deleteShader(i), f.deleteShader(u), !f.getProgramParameter(a, f.LINK_STATUS))
    return f.deleteProgram(a), null;
  const s = {}, c = f.getProgramParameter(a, f.ACTIVE_UNIFORMS);
  for (let h = 0; h < c; h++) {
    const d = f.getActiveUniform(a, h);
    d && (s[d.name.replace("[0]", "")] = f.getUniformLocation(a, d.name));
  }
  return { program: a, uniforms: s };
}, VE = ({
  colorStops: f = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude: i = 1,
  blend: u = 0.5,
  speed: a = 1,
  time: s,
  height: c = 0.45,
  scale: h = 1,
  glow: d = 0.6,
  brightness: g = 1,
  layers: _ = 1,
  direction: p = "top",
  mouseInteraction: v = !0,
  intro: S = !0,
  opacity: b = 1,
  lightMode: M = !1,
  paused: T = !1,
  dpr: w,
  className: G = "",
  style: q
}) => {
  const Z = me.useRef(null), B = me.useRef(null), j = me.useRef(null), k = (Array.isArray(f) ? f : []).filter(Boolean).map(String).slice(0, U0), R = {
    stops: k.length >= 2 ? k : k.length === 1 ? [k[0], k[0]] : ["#5227FF", "#7cff67"],
    amplitude: Math.max(0, i),
    blend: Cs(u, 0, 1),
    speed: a,
    time: s,
    height: Cs(c, 0, 1),
    scale: Math.max(0.1, h),
    glow: Math.max(0, d),
    brightness: Math.max(0, g),
    layers: Cs(Math.round(_), 1, jy),
    flip: p === "bottom" ? 1 : 0,
    mouseInteraction: v,
    intro: S,
    opacity: Cs(b, 0, 1),
    lightMode: M,
    paused: T,
    dpr: w
  }, Q = me.useRef(R);
  return Q.current = R, me.useEffect(() => {
    const $ = Z.current, V = B.current, nt = V?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!$ || !V || !nt) return;
    const lt = GE(nt);
    if (!lt) return;
    const ft = lt.uniforms, pt = nt.createBuffer(), et = nt.createVertexArray();
    nt.bindVertexArray(et), nt.bindBuffer(nt.ARRAY_BUFFER, pt), nt.bufferData(nt.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), nt.STATIC_DRAW), nt.enableVertexAttribArray(0), nt.vertexAttribPointer(0, 2, nt.FLOAT, !1, 0, 0);
    const K = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), P = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, I = /* @__PURE__ */ new Map(), st = (tt) => {
      if (I.has(tt)) return I.get(tt);
      let mt = [1, 1, 1];
      if (K) {
        K.clearRect(0, 0, 1, 1), K.fillStyle = "#ffffff", K.fillStyle = tt, K.fillRect(0, 0, 1, 1);
        const [xt, At, Wt] = K.getImageData(0, 0, 1, 1).data;
        mt = [xt / 255, At / 255, Wt / 255];
      }
      return I.set(tt, mt), mt;
    }, z = new Float32Array(U0 * 3), _t = { width: 1, height: 1 }, dt = { x: 0, y: 0, inside: !1 }, Mt = {
      clock: 0,
      px: 0,
      py: 0.5,
      reach: 0,
      reveal: Q.current.intro && !P ? 0 : 1
    };
    let x = 0, O = 0, J = !0;
    const L = () => {
      const tt = Q.current;
      XE(tt.stops.map((xt) => qE(st(xt)))).forEach((xt, At) => z.set(xt, At * 3));
      const mt = Mt.reveal;
      nt.viewport(0, 0, V.width, V.height), nt.useProgram(lt.program), nt.bindVertexArray(et), nt.uniform2f(ft.uResolution, V.width, V.height), nt.uniform1f(ft.uTime, tt.time !== void 0 ? tt.time * tt.speed * 0.1 : Mt.clock), nt.uniform3fv(ft.uStops, z), nt.uniform1i(ft.uStopCount, tt.stops.length), nt.uniform1f(ft.uAmplitude, tt.amplitude), nt.uniform1f(ft.uBlend, tt.blend), nt.uniform1f(ft.uHeight, tt.height), nt.uniform1f(ft.uScale, tt.scale), nt.uniform1f(ft.uGlow, tt.glow), nt.uniform1f(ft.uBrightness, tt.brightness), nt.uniform1i(ft.uLayers, tt.layers), nt.uniform1f(ft.uFlip, tt.flip), nt.uniform3f(ft.uPointer, Mt.px, Mt.py, Mt.reach), nt.uniform1f(ft.uReveal, 1 - Math.pow(1 - mt, 3)), nt.uniform1f(ft.uOpacity, tt.opacity), nt.uniform1f(ft.uLightMode, tt.lightMode ? 1 : 0), nt.drawArrays(nt.TRIANGLES, 0, 3);
    }, rt = (tt) => {
      if (x = 0, !J || document.hidden) return;
      const mt = Q.current, xt = O ? Cs((tt - O) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (O = tt, mt.paused) {
        Mt.reveal = 1, L(), O = 0;
        return;
      }
      const At = P ? 0 : 1;
      Mt.clock += xt * mt.speed * At;
      const Wt = mt.mouseInteraction && dt.inside && !P, Kt = 1 - Math.exp(-xt / 0.6);
      if (Wt) {
        const It = (dt.x - _t.width / 2) / _t.height, Gt = mt.flip ? 1 - dt.y / _t.height : dt.y / _t.height;
        Mt.px += (It - Mt.px) * Kt, Mt.py += (Gt - Mt.py) * Kt;
      }
      Mt.reach += ((Wt ? 1 : 0) - Mt.reach) * (1 - Math.exp(-xt / (Wt ? 0.9 : 1.4))), !mt.intro || P ? Mt.reveal = 1 : Mt.reveal < 1 && (Mt.reveal = Math.min(1, Mt.reveal + xt / YE)), L(), x = requestAnimationFrame(rt);
    }, ut = () => {
      !x && J && !document.hidden && (x = requestAnimationFrame(rt));
    }, bt = () => {
      const tt = Q.current, mt = Math.max(1, $.clientWidth), xt = Math.max(1, $.clientHeight), At = Math.min(tt.dpr || window.devicePixelRatio || 1, 2);
      _t.width = mt, _t.height = xt, V.width = Math.max(1, Math.round(mt * At)), V.height = Math.max(1, Math.round(xt * At)), L(), ut();
    }, it = (tt) => {
      const mt = $.getBoundingClientRect();
      dt.x = tt.clientX - mt.left, dt.y = tt.clientY - mt.top;
      const xt = dt.inside;
      if (dt.inside = dt.x >= 0 && dt.y >= 0 && dt.x <= mt.width && dt.y <= mt.height, dt.inside && !xt) {
        const At = Q.current;
        Mt.px = (dt.x - mt.width / 2) / Math.max(1, mt.height), Mt.py = At.flip ? 1 - dt.y / Math.max(1, mt.height) : dt.y / Math.max(1, mt.height);
      }
      Q.current.paused || ut();
    }, ct = (tt) => {
      tt.pointerType !== "mouse" && (dt.inside = !1);
    }, Tt = () => {
      dt.inside = !1;
    }, ht = () => {
      O = 0, ut();
    }, Ot = new ResizeObserver(bt);
    Ot.observe($);
    const Ct = new IntersectionObserver((tt) => {
      J = tt.some((mt) => mt.isIntersecting), J && (O = 0, ut());
    });
    Ct.observe($), window.addEventListener("pointermove", it, { passive: !0 }), window.addEventListener("pointerdown", it, { passive: !0 }), window.addEventListener("pointerup", ct, { passive: !0 }), window.addEventListener("pointercancel", ct, { passive: !0 }), document.documentElement.addEventListener("pointerleave", Tt), document.addEventListener("visibilitychange", ht), bt();
    let U = Q.current.dpr;
    return j.current = () => {
      const tt = Q.current;
      if (tt.dpr !== U) {
        U = tt.dpr, bt();
        return;
      }
      x || L(), ut();
    }, () => {
      cancelAnimationFrame(x), j.current = null, Ot.disconnect(), Ct.disconnect(), window.removeEventListener("pointermove", it), window.removeEventListener("pointerdown", it), window.removeEventListener("pointerup", ct), window.removeEventListener("pointercancel", ct), document.documentElement.removeEventListener("pointerleave", Tt), document.removeEventListener("visibilitychange", ht), nt.deleteProgram(lt.program), nt.deleteBuffer(pt), nt.deleteVertexArray(et), V.isConnected || nt.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), me.useEffect(() => {
    j.current?.();
  }), /* @__PURE__ */ ee.jsx("div", { ref: Z, className: `aurora-container${G ? ` ${G}` : ""}`, style: q, children: /* @__PURE__ */ ee.jsx("canvas", { ref: B, className: "aurora-canvas", "aria-hidden": "true" }) });
}, Zc = {
  linear: (f) => f,
  "ease-in": (f) => f * f,
  "ease-out": (f) => 1 - Math.pow(1 - f, 3),
  "ease-in-out": (f) => f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2,
  spring: (f) => 1 + 2.4 * Math.pow(f - 1, 3) + 1.4 * Math.pow(f - 1, 2)
}, jE = ["line", "streak", "dot", "star"], QE = 32, ZE = 500, v1 = 320, Sa = (f, i, u) => Math.min(u, Math.max(i, f)), KE = (f, i, u) => {
  const a = Sa((u - f) / (i - f), 0, 1);
  return a * a * (3 - 2 * a);
}, JE = (f) => {
  const i = (Array.isArray(f) ? f : [f]).filter(Boolean);
  return i.length ? i : ["#ffffff"];
}, kE = (f, i, u, a, s) => {
  const c = a * 0.16;
  f.beginPath(), f.moveTo(i + Math.cos(s) * a, u + Math.sin(s) * a);
  for (let h = 1; h <= 4; h++) {
    const d = s + h * Math.PI / 2, g = d - Math.PI / 4;
    f.quadraticCurveTo(
      i + Math.cos(g) * c,
      u + Math.sin(g) * c,
      i + Math.cos(d) * a,
      u + Math.sin(d) * a
    );
  }
  f.closePath();
}, FE = (f, i) => {
  f.fillStyle = i;
  const u = String(f.fillStyle), a = /^#([0-9a-f]{6})$/i.exec(u);
  if (a) {
    const c = parseInt(a[1], 16);
    return [c >> 16 & 255, c >> 8 & 255, c & 255];
  }
  const s = /^rgba?\(([^)]+)\)$/i.exec(u);
  return s ? s[1].split(",").slice(0, 3).map((c) => parseFloat(c)) : [0, 0, 0];
}, Qy = me.forwardRef(
  ({
    sparkColor: f = "#fff",
    sparkSize: i = 14,
    sparkRadius: u = 30,
    sparkCount: a = 8,
    sparkWidth: s = 2,
    duration: c = 500,
    easing: h = "ease-out",
    extraScale: d = 1,
    shape: g = "line",
    randomness: _ = 0.2,
    gravity: p = 0,
    spread: v = 360,
    direction: S = 0,
    glow: b = 0,
    ring: M = !1,
    layer: T = "front",
    disabled: w = !1,
    className: G = "",
    style: q,
    children: Z
  }, B) => {
    const j = me.useRef(null), k = me.useRef(null), R = me.useRef(null), Q = {
      colors: JE(f),
      size: Math.max(0, i),
      radius: Math.max(0, u) * Math.max(0, d),
      count: Sa(Math.round(a), 1, 64),
      width: Math.max(0.5, s),
      duration: Math.max(60, c),
      ease: Zc[h] ?? Zc["ease-out"],
      shape: jE.includes(g) ? g : "line",
      randomness: Sa(_, 0, 1),
      gravity: Math.max(0, p),
      spread: Sa(v, 0, 360),
      direction: S,
      glow: Sa(b, 0, 1),
      ring: M,
      disabled: w
    }, $ = me.useRef(Q);
    return $.current = Q, me.useEffect(() => {
      const V = j.current, nt = k.current;
      if (!V || !nt) return;
      const lt = window.matchMedia("(prefers-reduced-motion: reduce)").matches, ft = [];
      let pt = 0, et = { time: -1e9, x: 0, y: 0 };
      const K = (O, J) => 0.5 * O.gravity * ZE * J * J, P = (O, J, L, rt) => [
        O.x + Math.cos(J.angle) * L,
        O.y + Math.sin(J.angle) * L + K(O.settings, rt)
      ], I = (O, J, L, rt) => {
        const ut = J.settings, bt = lt ? v1 : ut.duration * L.life, it = rt / bt;
        if (it >= 1) return !1;
        const ct = lt ? 0.55 : ut.ease(Sa(it, 0, 1)), Tt = lt ? 0 : rt / 1e3, ht = ut.radius * L.reach * ct, Ot = ut.width * L.scale, Ct = lt ? 1 - it : 1 - KE(ut.shape === "line" ? 0.55 : 0.7, 1, it);
        if (Ct <= 0) return !0;
        if (O.strokeStyle = L.color, O.fillStyle = L.color, ut.shape === "line") {
          const Wt = ut.size * L.scale * (lt ? 0.5 : Math.pow(1 - it, 1.6)), [Kt, It] = P(J, L, ht, Tt), [Gt, le] = P(J, L, ht + Math.max(0.01, Wt), Tt);
          return O.lineCap = "round", L.glow > 0 && (O.globalAlpha = Ct * 0.14 * L.glow, O.lineWidth = Ot * 4.5, O.beginPath(), O.moveTo(Kt, It), O.lineTo(Gt, le), O.stroke()), O.globalAlpha = Ct, O.lineWidth = Ot, O.beginPath(), O.moveTo(Kt, It), O.lineTo(Gt, le), O.stroke(), !0;
        }
        if (ut.shape === "streak") {
          const Wt = lt ? 0 : Math.min(rt, 70 + ut.size * 4 * L.scale), Kt = lt ? 0.4 : ut.ease(Sa((rt - Wt) / bt, 0, 1)), [It, Gt] = P(J, L, ht, Tt), [le, oe] = P(J, L, ut.radius * L.reach * Kt, Math.max(0, Tt - Wt / 1e3)), hn = It - le, Oe = Gt - oe, En = Math.hypot(hn, Oe) || 1, Ml = -Oe / En * Ot * 0.5, Me = hn / En * Ot * 0.5, Wl = ($e, Ol) => {
            const Vn = O.createLinearGradient(le, oe, It, Gt);
            Vn.addColorStop(0, L.clear), Vn.addColorStop(1, L.color), O.globalAlpha = Ol, O.fillStyle = Vn, O.beginPath(), O.moveTo(le, oe), O.lineTo(It + Ml * $e, Gt + Me * $e), O.lineTo(It - Ml * $e, Gt - Me * $e), O.closePath(), O.fill(), O.fillStyle = L.color, O.beginPath(), O.arc(It, Gt, Ot * 0.5 * $e, 0, Math.PI * 2), O.fill();
          };
          return L.glow > 0 && Wl(3.2, Ct * 0.16 * L.glow), Wl(1, Ct), !0;
        }
        if (ut.shape === "dot") {
          const [Wt, Kt] = P(J, L, ht, Tt), It = Ot * 1.25 * (1 - 0.5 * ct);
          return L.glow > 0 && (O.globalAlpha = Ct * 0.18 * L.glow, O.beginPath(), O.arc(Wt, Kt, It * 2.6, 0, Math.PI * 2), O.fill()), O.globalAlpha = Ct, O.beginPath(), O.arc(Wt, Kt, It, 0, Math.PI * 2), O.fill(), !0;
        }
        const [U, tt] = P(J, L, ht, Tt), mt = lt ? 1 - it : Math.pow(Math.sin(Math.PI * Sa(it * 1.1, 0, 1)), 0.7), xt = ut.size * 0.6 * L.scale * mt, At = L.angle + L.spin * it * Math.PI * 0.5;
        return xt <= 0.05 || (L.glow > 0 && (O.globalAlpha = Ct * 0.2 * L.glow, O.beginPath(), O.arc(U, tt, xt * 1.1, 0, Math.PI * 2), O.fill()), O.globalAlpha = Ct, kE(O, U, tt, xt, At), O.fill()), !0;
      }, st = (O, J, L) => {
        const rt = J.settings, ut = lt ? v1 : rt.duration * 0.8, bt = L / ut;
        if (bt >= 1) return !1;
        const it = 2 + rt.radius * 0.6 * (lt ? 0.6 : Zc["ease-out"](bt));
        return O.globalAlpha = Math.pow(1 - bt, 2) * 0.7, O.strokeStyle = J.sparks[0]?.color ?? rt.colors[0], O.lineWidth = Math.max(0.5, rt.width * (1 - bt) * 0.9), O.beginPath(), O.arc(J.x, J.y, it, 0, Math.PI * 2), O.stroke(), !0;
      }, z = (O) => {
        O.canvas.remove();
        const J = ft.indexOf(O);
        J >= 0 && ft.splice(J, 1);
      }, _t = (O) => {
        pt = 0;
        for (const J of [...ft]) {
          const L = O - J.start, rt = J.ctx;
          rt.setTransform(1, 0, 0, 1, 0, 0), rt.clearRect(0, 0, J.canvas.width, J.canvas.height), rt.setTransform(J.ratio, 0, 0, J.ratio, -J.left * J.ratio, -J.top * J.ratio);
          let ut = !1;
          J.settings.ring && st(rt, J, L) && (ut = !0);
          for (const bt of J.sparks)
            I(rt, J, bt, L) && (ut = !0);
          rt.globalAlpha = 1, ut || z(J);
        }
        ft.length && (pt = requestAnimationFrame(_t));
      }, dt = (O, J) => {
        const L = $.current;
        if (L.disabled) return;
        const rt = V.getBoundingClientRect(), ut = Math.floor(Math.random() * L.colors.length), bt = L.spread >= 359.5, it = L.spread * Math.PI / 180, ct = (L.direction - 90) * Math.PI / 180, Tt = bt ? Math.PI * 2 / L.count : L.count > 1 ? it / (L.count - 1) : 0, ht = Array.from({ length: L.count }, (Wt, Kt) => {
          const It = bt ? ct + Tt * Kt : L.count > 1 ? ct - it / 2 + Tt * Kt : ct, Gt = (Math.random() - 0.5) * L.randomness;
          return {
            angle: It + Gt * (Tt || it || 1) * 0.9,
            reach: 1 + (Math.random() - 0.5) * 0.7 * L.randomness,
            scale: 1 + (Math.random() - 0.5) * 0.8 * L.randomness,
            life: 1 + (Math.random() - 0.5) * 0.5 * L.randomness,
            spin: Math.random() - 0.5,
            color: L.colors[(Kt + ut) % L.colors.length],
            clear: "",
            glow: 0
          };
        }), Ot = L.duration * (1 + 0.25 * L.randomness), Ct = K(L, Ot / 1e3), U = L.radius * (1 + 0.35 * L.randomness) * (L.ease === Zc.spring ? 1.15 : 1) + L.size * (1 + 0.4 * L.randomness) + L.width * (L.glow > 0 ? 6 : 2) + 6, tt = {
          left: Math.max(O - U, 0),
          top: Math.max(J - U, 0),
          right: Math.min(O + U, window.innerWidth),
          bottom: Math.min(J + U + Ct, window.innerHeight)
        };
        if (tt.right - tt.left < 1 || tt.bottom - tt.top < 1) return;
        const mt = Math.min(window.devicePixelRatio || 1, 2), xt = document.createElement("canvas");
        xt.width = Math.ceil((tt.right - tt.left) * mt), xt.height = Math.ceil((tt.bottom - tt.top) * mt), Object.assign(xt.style, {
          position: "absolute",
          left: `${tt.left - rt.left}px`,
          top: `${tt.top - rt.top}px`,
          width: `${tt.right - tt.left}px`,
          height: `${tt.bottom - tt.top}px`,
          display: "block",
          pointerEvents: "none"
        }), xt.setAttribute("aria-hidden", "true"), nt.appendChild(xt);
        const At = xt.getContext("2d");
        if (!At) {
          xt.remove();
          return;
        }
        for (const Wt of ht) {
          const [Kt, It, Gt] = FE(At, Wt.color);
          Wt.clear = `rgba(${Kt}, ${It}, ${Gt}, 0)`, Wt.glow = L.glow * (0.35 + 0.65 * ((0.2126 * Kt + 0.7152 * It + 0.0722 * Gt) / 255));
        }
        for (ft.push({
          x: O,
          y: J,
          start: performance.now(),
          sparks: ht,
          settings: { ...L },
          canvas: xt,
          ctx: At,
          ratio: mt,
          left: tt.left,
          top: tt.top
        }); ft.length > QE; ) z(ft[0]);
        pt || (pt = requestAnimationFrame(_t));
      }, Mt = (O) => {
        O.pointerType !== "mouse" || O.button !== 0 || (et = { time: performance.now(), x: O.clientX, y: O.clientY }, dt(O.clientX, O.clientY));
      }, x = (O) => {
        if ("pointerType" in O && O.pointerType === "mouse") return;
        if (O.detail === 0) {
          const rt = (O.target instanceof Element ? O.target : V).getBoundingClientRect();
          dt(rt.left + rt.width / 2, rt.top + rt.height / 2);
          return;
        }
        performance.now() - et.time < 700 && Math.hypot(O.clientX - et.x, O.clientY - et.y) < 12 || dt(O.clientX, O.clientY);
      };
      return V.addEventListener("pointerdown", Mt), V.addEventListener("click", x), R.current = {
        spark: (O, J) => {
          const L = V.getBoundingClientRect();
          dt(L.left + (O ?? L.width / 2), L.top + (J ?? L.height / 2));
        }
      }, () => {
        cancelAnimationFrame(pt), V.removeEventListener("pointerdown", Mt), V.removeEventListener("click", x);
        for (const O of [...ft]) z(O);
        R.current = null;
      };
    }, []), me.useImperativeHandle(
      B,
      () => ({
        spark: (V, nt) => R.current?.spark(V, nt)
      }),
      []
    ), /* @__PURE__ */ ee.jsxs(
      "div",
      {
        ref: j,
        className: G,
        style: { position: "relative", width: "100%", height: "100%", isolation: "isolate", ...q },
        children: [
          Z,
          /* @__PURE__ */ ee.jsx(
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
Qy.displayName = "ClickSpark";
xe.registerPlugin(Xt);
const Zy = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Nr(f, i) {
  const u = document.getElementById(f);
  if (!u) return null;
  try {
    const a = Yb.createRoot(u);
    return Bb.flushSync(() => a.render(i)), a;
  } catch (a) {
    return console.warn("b-lance: componente non montato", f, a), null;
  }
}
const PE = [
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
function f0(f, i) {
  if (!f) return [];
  const u = f.textContent.trim(), a = document.createElement("span");
  a.className = "h-visual", a.setAttribute("aria-hidden", "true");
  const s = [];
  u.split(/(\s+)/).forEach((h) => {
    if (h) {
      if (/^\s+$/.test(h)) {
        a.appendChild(document.createTextNode(h));
        return;
      }
      if (i === "chars")
        [...h].forEach((d) => {
          const g = document.createElement("span");
          g.className = "h-char", g.textContent = d, a.appendChild(g), s.push(g);
        });
      else {
        const d = document.createElement("span");
        d.className = "h-word", d.textContent = h, a.appendChild(d), s.push(d);
      }
    }
  });
  const c = document.createElement("span");
  return c.className = "sr-only", c.textContent = u, f.textContent = "", f.append(a, c), s;
}
Nr(
  "rb-aurora",
  /* @__PURE__ */ ee.jsx(
    VE,
    {
      colorStops: ["#0d1512", "#3f6a52", "#9dc3aa"],
      amplitude: 0.8,
      blend: 0.42,
      speed: 0.35,
      height: 0.5,
      scale: 1.05,
      glow: 0.28,
      brightness: 0.7,
      layers: 1,
      direction: "top",
      intro: !1,
      opacity: 0.6,
      lightMode: !1
    }
  )
);
Nr(
  "rb-magnet-1",
  /* @__PURE__ */ ee.jsx(sm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ee.jsxs("a", { href: "/register", className: "s-btn", children: [
    /* @__PURE__ */ ee.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ee.jsx("use", { href: "#i-bolt" }) }),
    " Inizia gratis"
  ] }) })
);
Nr(
  "rb-magnet-2",
  /* @__PURE__ */ ee.jsx(sm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ee.jsx("a", { href: "/demo", className: "s-btn s-btn-ghost", children: "Prova la demo" }) })
);
Nr(
  "rb-magnet-3",
  /* @__PURE__ */ ee.jsx(sm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ee.jsxs("a", { className: "s-btn s-btn-light", href: "https://github.com/mirkosio/b-lance/releases/latest", children: [
    /* @__PURE__ */ ee.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ee.jsx("use", { href: "#i-bolt" }) }),
    " Scarica l'APK"
  ] }) })
);
Nr(
  "rb-features",
  /* @__PURE__ */ ee.jsx(ee.Fragment, { children: PE.map((f, i) => /* @__PURE__ */ ee.jsxs(
    NE,
    {
      className: `s-card${f.wide ? " s-card-wide" : ""}`,
      spotlightColor: "rgba(95, 141, 110, 0.2)",
      intensity: 0,
      spotlightSize: 0,
      theme: "light",
      flare: !1,
      grain: 0,
      children: [
        /* @__PURE__ */ ee.jsx("span", { className: "s-card-icon", children: /* @__PURE__ */ ee.jsx("svg", { width: "24", height: "24", "aria-hidden": "true", children: /* @__PURE__ */ ee.jsx("use", { href: `#${f.icon}` }) }) }),
        /* @__PURE__ */ ee.jsx("span", { className: "s-card-tag", children: f.tag }),
        /* @__PURE__ */ ee.jsx("h3", { children: f.title }),
        /* @__PURE__ */ ee.jsx("p", { children: f.text }),
        /* @__PURE__ */ ee.jsxs("span", { className: "s-card-index", "aria-hidden": "true", children: [
          "02.",
          i + 1
        ] })
      ]
    },
    f.title
  )) })
);
function WE() {
  const f = me.useRef(null);
  return me.useEffect(() => {
    const i = (u) => {
      u.pointerType !== "mouse" || u.button !== 0 || u.target.closest("input, textarea, select, button, form") || f.current?.spark(u.clientX, u.clientY);
    };
    return document.addEventListener("pointerdown", i), () => document.removeEventListener("pointerdown", i);
  }, []), /* @__PURE__ */ ee.jsx(
    Qy,
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
!Zy && document.body.classList.contains("landing") && Nr("rb-spark", /* @__PURE__ */ ee.jsx(WE, {}));
if (!Zy) {
  const f = new Kb({ duration: 1.05, smoothWheel: !0, touchMultiplier: 1.3 });
  window.__blLenis = f, f.on("scroll", Xt.update), xe.ticker.add((_) => f.raf(_ * 1e3)), xe.ticker.lagSmoothing(0);
  const i = f0(document.getElementById("rb-title"), "chars"), u = f0(document.getElementById("rb-accent"), "words");
  i.length && xe.from(i, {
    yPercent: 112,
    opacity: 0,
    duration: 0.85,
    stagger: 0.026,
    ease: "power3.out",
    delay: 0.08
  }), u.length && xe.from(u, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.32
  }), document.querySelectorAll('a[href^="#"]').forEach((_) => {
    _.classList.contains("skip-link") || _.closest(".info-toc") || _.addEventListener("click", (p) => {
      const v = document.querySelector(_.getAttribute("href"));
      v && (p.preventDefault(), f.scrollTo(v, { offset: -20 }));
    });
  });
  const a = document.getElementById("rb-tilt"), s = a?.querySelector(".s-receipt");
  if (a && s) {
    xe.set(s, { transformPerspective: 900 });
    const _ = xe.quickTo(s, "rotationY", { duration: 0.5, ease: "power2.out" }), p = xe.quickTo(s, "rotationX", { duration: 0.5, ease: "power2.out" });
    a.addEventListener("pointermove", (v) => {
      const S = a.getBoundingClientRect(), b = (v.clientX - S.left) / S.width - 0.5, M = (v.clientY - S.top) / S.height - 0.5;
      _(b * 9), p(M * -7);
    }), a.addEventListener("pointerleave", () => {
      _(0), p(0);
    }), xe.to(s, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: ".s-cover", start: "top top", end: "bottom top", scrub: 0.6 }
    });
  }
  const c = (_, p = {}) => {
    const v = _.filter(Boolean);
    v.length && xe.from(v, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      ...p
    });
  };
  c([document.querySelector(".s-kicker"), document.querySelector(".s-lede"), document.querySelector(".s-cta"), document.querySelector(".s-note")], { delay: 0.15 }), c([...document.querySelectorAll(".s-fact")]), c([...document.querySelectorAll(".s-sec-head > *")], { scrollTrigger: { trigger: ".s-features", start: "top 78%", once: !0 } }), c([...document.querySelectorAll(".s-faq-item")], { scrollTrigger: { trigger: ".s-faq", start: "top 75%", once: !0 } }), c([...document.querySelectorAll(".s-final > .s-wrap > *")], { scrollTrigger: { trigger: ".s-final", start: "top 80%", once: !0 } }), Xt.batch(".s-bento .s-card", {
    start: "top 88%",
    once: !0,
    onEnter: (_) => xe.from(_, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06
    })
  });
  const h = document.querySelector(".s-phone");
  h && (xe.from(h, {
    opacity: 0,
    y: 60,
    rotate: 5,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".s-app", start: "top 70%", once: !0 }
  }), xe.to(h, {
    y: -26,
    rotate: -1,
    ease: "none",
    scrollTrigger: { trigger: ".s-app", start: "top bottom", end: "bottom top", scrub: 0.7 }
  })), xe.matchMedia().add("(min-width: 901px)", () => {
    const _ = document.getElementById("rb-track"), p = document.querySelector(".s-steps");
    if (!_ || !p) return;
    const v = () => Math.max(0, _.scrollWidth - document.documentElement.clientWidth + 48), S = xe.to(_, {
      x: () => -v(),
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top top",
        end: () => `+=${v()}`,
        pin: !0,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: !0
      }
    }), b = document.getElementById("rb-progress");
    return b && xe.to(b, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top top",
        end: () => `+=${v()}`,
        scrub: !0
      }
    }), () => {
      S.scrollTrigger?.kill(), S.kill(), xe.set(_, { x: 0 });
    };
  });
  const g = document.querySelector(".s-rail");
  if (g) {
    const _ = [...g.querySelectorAll("a")], p = [".s-cover", ".s-app", ".s-final"].map((M) => document.querySelector(M)).filter(Boolean), v = document.querySelector(".s-steps"), S = document.querySelector("footer"), b = () => {
      const M = window.innerHeight * 0.5, T = p.some((j) => {
        const k = j.getBoundingClientRect();
        return k.top <= M && k.bottom >= M;
      });
      g.classList.toggle("is-inverse", T);
      const w = v && (v.closest(".pin-spacer") || v), G = w && w.getBoundingClientRect(), q = !!G && G.bottom > 0 && G.top < window.innerHeight, Z = S && S.getBoundingClientRect(), B = !!Z && Z.top < window.innerHeight;
      g.classList.toggle("is-hidden", q || B), _.forEach((j) => {
        const k = document.querySelector(j.getAttribute("href"));
        if (!k) return;
        const R = k.getBoundingClientRect();
        j.classList.toggle("is-current", R.top <= M && R.bottom > M);
      });
    };
    window.addEventListener("scroll", b, { passive: !0 }), window.addEventListener("resize", b), b();
  }
  if (document.body.classList.contains("site-v2") && !document.body.classList.contains("landing")) {
    const _ = document.querySelector(
      ".info-hero-inner, .demo-hero-inner, .about-masthead-inner, .auth-aside-inner"
    ), p = document.querySelector(".info-hero h1");
    if (_) {
      const b = [..._.children].filter((M) => M !== p);
      xe.from(b, {
        opacity: 0,
        y: 24,
        duration: 0.7,
        stagger: 0.07,
        ease: "power2.out"
      });
    }
    if (p) {
      const b = f0(p, "words");
      b.length && xe.from(b, {
        yPercent: 105,
        opacity: 0,
        duration: 0.85,
        stagger: 0.055,
        ease: "power3.out",
        delay: 0.12
      });
    }
    const v = document.querySelector(".info-example-card");
    v && xe.from(v, {
      opacity: 0,
      y: 40,
      rotate: 2,
      duration: 0.85,
      ease: "power3.out",
      scrollTrigger: { trigger: ".info-example", start: "top 80%", once: !0 }
    }), xe.utils.toArray(".info-faq .faq-item").forEach((b) => {
      xe.from(b, {
        opacity: 0,
        y: 18,
        duration: 0.55,
        ease: "power2.out",
        scrollTrigger: { trigger: b, start: "top 92%", once: !0 }
      });
    }), xe.utils.toArray(".about-index .info-link-card").forEach((b, M) => {
      xe.from(b, {
        opacity: 0,
        y: 20,
        duration: 0.55,
        delay: M % 4 * 0.05,
        ease: "power2.out",
        scrollTrigger: { trigger: b, start: "top 93%", once: !0 }
      });
    });
    const S = document.querySelector(".demo-summary");
    S && xe.from(S, {
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
window.addEventListener("load", () => Xt.refresh());
