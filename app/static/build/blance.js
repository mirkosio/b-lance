var Pd = { exports: {} }, zo = {};
var M1;
function Vb() {
  if (M1) return zo;
  M1 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.fragment");
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
  return zo.Fragment = i, zo.jsx = u, zo.jsxs = u, zo;
}
var A1;
function Gb() {
  return A1 || (A1 = 1, Pd.exports = Vb()), Pd.exports;
}
var ae = Gb(), $d = { exports: {} }, Zt = {};
var w1;
function jb() {
  if (w1) return Zt;
  w1 = 1;
  var f = /* @__PURE__ */ Symbol.for("react.transitional.element"), i = /* @__PURE__ */ Symbol.for("react.portal"), u = /* @__PURE__ */ Symbol.for("react.fragment"), a = /* @__PURE__ */ Symbol.for("react.strict_mode"), o = /* @__PURE__ */ Symbol.for("react.profiler"), c = /* @__PURE__ */ Symbol.for("react.consumer"), h = /* @__PURE__ */ Symbol.for("react.context"), d = /* @__PURE__ */ Symbol.for("react.forward_ref"), g = /* @__PURE__ */ Symbol.for("react.suspense"), v = /* @__PURE__ */ Symbol.for("react.memo"), p = /* @__PURE__ */ Symbol.for("react.lazy"), _ = /* @__PURE__ */ Symbol.for("react.activity"), S = /* @__PURE__ */ Symbol.for("react.view_transition"), b = Symbol.iterator;
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
  }, R = Object.assign, j = {};
  function X(E, A, J) {
    this.props = E, this.context = A, this.refs = j, this.updater = J || T;
  }
  X.prototype.isReactComponent = {}, X.prototype.setState = function(E, A) {
    if (typeof E != "object" && typeof E != "function" && E != null)
      throw Error(
        "takes an object of state variables to update or a function which returns an object of state variables."
      );
    this.updater.enqueueSetState(this, E, A, "setState");
  }, X.prototype.forceUpdate = function(E) {
    this.updater.enqueueForceUpdate(this, E, "forceUpdate");
  };
  function Z() {
  }
  Z.prototype = X.prototype;
  function Y(E, A, J) {
    this.props = E, this.context = A, this.refs = j, this.updater = J || T;
  }
  var Q = Y.prototype = new Z();
  Q.constructor = Y, R(Q, X.prototype), Q.isPureReactComponent = !0;
  var tt = Array.isArray;
  function N() {
  }
  var K = { H: null, A: null, T: null, S: null }, P = Object.prototype.hasOwnProperty;
  function V(E, A, J) {
    var L = J.ref;
    return {
      $$typeof: f,
      type: E,
      key: A,
      ref: L !== void 0 ? L : null,
      props: J
    };
  }
  function ut(E, A) {
    return V(E.type, A, E.props);
  }
  function it(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function St(E) {
    var A = { "=": "=0", ":": "=2" };
    return "$" + E.replace(/[=:]/g, function(J) {
      return A[J];
    });
  }
  var Mt = /\/+/g;
  function et(E, A) {
    return typeof E == "object" && E !== null && E.key != null ? St("" + E.key) : A.toString(36);
  }
  function F(E) {
    switch (E.status) {
      case "fulfilled":
        return E.value;
      case "rejected":
        throw E.reason;
      default:
        switch (typeof E.status == "string" ? E.then(N, N) : (E.status = "pending", E.then(
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
  function k(E, A, J, L, mt) {
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
            case i:
              Rt = !0;
              break;
            case p:
              return Rt = E._init, k(
                Rt(E._payload),
                A,
                J,
                L,
                mt
              );
          }
      }
    if (Rt)
      return mt = mt(E), Rt = L === "" ? "." + et(E, 0) : L, tt(mt) ? (J = "", Rt != null && (J = Rt.replace(Mt, "$&/") + "/"), k(mt, A, J, "", function(zt) {
        return zt;
      })) : mt != null && (it(mt) && (mt = ut(
        mt,
        J + (mt.key == null || E && E.key === mt.key ? "" : ("" + mt.key).replace(
          Mt,
          "$&/"
        ) + "/") + Rt
      )), A.push(mt)), 1;
    Rt = 0;
    var ot = L === "" ? "." : L + ":";
    if (tt(E))
      for (var gt = 0; gt < E.length; gt++)
        L = E[gt], ht = ot + et(L, gt), Rt += k(
          L,
          A,
          J,
          ht,
          mt
        );
    else if (gt = M(E), typeof gt == "function")
      for (E = gt.call(E), gt = 0; !(L = E.next()).done; )
        L = L.value, ht = ot + et(L, gt++), Rt += k(
          L,
          A,
          J,
          ht,
          mt
        );
    else if (ht === "object") {
      if (typeof E.then == "function")
        return k(
          F(E),
          A,
          J,
          L,
          mt
        );
      throw A = String(E), Error(
        "Objects are not valid as a React child (found: " + (A === "[object Object]" ? "object with keys {" + Object.keys(E).join(", ") + "}" : A) + "). If you meant to render a collection of children, use an array instead."
      );
    }
    return Rt;
  }
  function W(E, A, J) {
    if (E == null) return E;
    var L = [], mt = 0;
    return k(E, L, "", "", function(ht) {
      return A.call(J, ht, mt++);
    }), L;
  }
  function st(E) {
    if (E._status === -1) {
      var A = E._result, J = A();
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
  var w = typeof reportError == "function" ? reportError : function(E) {
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
  function Et(E) {
    var A = K.T, J = {};
    J.types = A !== null ? A.types : null, K.T = J;
    try {
      var L = E(), mt = K.S;
      mt !== null && mt(J, L), typeof L == "object" && L !== null && typeof L.then == "function" && L.then(N, w);
    } catch (ht) {
      w(ht);
    } finally {
      A !== null && J.types !== null && (A.types = J.types), K.T = A;
    }
  }
  function z(E) {
    var A = K.T;
    if (A !== null) {
      var J = A.types;
      J === null ? A.types = [E] : J.indexOf(E) === -1 && J.push(E);
    } else Et(z.bind(null, E));
  }
  var Nt = {
    map: W,
    forEach: function(E, A, J) {
      W(
        E,
        function() {
          A.apply(this, arguments);
        },
        J
      );
    },
    count: function(E) {
      var A = 0;
      return W(E, function() {
        A++;
      }), A;
    },
    toArray: function(E) {
      return W(E, function(A) {
        return A;
      }) || [];
    },
    only: function(E) {
      if (!it(E))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return E;
    }
  };
  return Zt.Activity = _, Zt.Children = Nt, Zt.Component = X, Zt.Fragment = u, Zt.Profiler = o, Zt.PureComponent = Y, Zt.StrictMode = a, Zt.Suspense = g, Zt.ViewTransition = S, Zt.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = K, Zt.__COMPILER_RUNTIME = {
    __proto__: null,
    c: function(E) {
      return K.H.useMemoCache(E);
    }
  }, Zt.addTransitionType = z, Zt.cache = function(E) {
    return function() {
      return E.apply(null, arguments);
    };
  }, Zt.cacheSignal = function() {
    return null;
  }, Zt.cloneElement = function(E, A, J) {
    if (E == null)
      throw Error(
        "The argument must be a React element, but you passed " + E + "."
      );
    var L = R({}, E.props), mt = E.key;
    if (A != null)
      for (ht in A.key !== void 0 && (mt = "" + A.key), A)
        !P.call(A, ht) || ht === "key" || ht === "__self" || ht === "__source" || ht === "ref" && A.ref === void 0 || (L[ht] = A[ht]);
    var ht = arguments.length - 2;
    if (ht === 1) L.children = J;
    else if (1 < ht) {
      for (var Rt = Array(ht), ot = 0; ot < ht; ot++)
        Rt[ot] = arguments[ot + 2];
      L.children = Rt;
    }
    return V(E.type, mt, L);
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
  }, Zt.createElement = function(E, A, J) {
    var L, mt = {}, ht = null;
    if (A != null)
      for (L in A.key !== void 0 && (ht = "" + A.key), A)
        P.call(A, L) && L !== "key" && L !== "__self" && L !== "__source" && (mt[L] = A[L]);
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
    return V(E, ht, mt);
  }, Zt.createRef = function() {
    return { current: null };
  }, Zt.forwardRef = function(E) {
    return { $$typeof: d, render: E };
  }, Zt.isValidElement = it, Zt.lazy = function(E) {
    return {
      $$typeof: p,
      _payload: { _status: -1, _result: E },
      _init: st
    };
  }, Zt.memo = function(E, A) {
    return {
      $$typeof: v,
      type: E,
      compare: A === void 0 ? null : A
    };
  }, Zt.startTransition = Et, Zt.unstable_useCacheRefresh = function() {
    return K.H.useCacheRefresh();
  }, Zt.use = function(E) {
    return K.H.use(E);
  }, Zt.useActionState = function(E, A, J) {
    return K.H.useActionState(E, A, J);
  }, Zt.useCallback = function(E, A) {
    return K.H.useCallback(E, A);
  }, Zt.useContext = function(E) {
    return K.H.useContext(E);
  }, Zt.useDebugValue = function() {
  }, Zt.useDeferredValue = function(E, A) {
    return K.H.useDeferredValue(E, A);
  }, Zt.useEffect = function(E, A) {
    return K.H.useEffect(E, A);
  }, Zt.useEffectEvent = function(E) {
    return K.H.useEffectEvent(E);
  }, Zt.useId = function() {
    return K.H.useId();
  }, Zt.useImperativeHandle = function(E, A, J) {
    return K.H.useImperativeHandle(E, A, J);
  }, Zt.useInsertionEffect = function(E, A) {
    return K.H.useInsertionEffect(E, A);
  }, Zt.useLayoutEffect = function(E, A) {
    return K.H.useLayoutEffect(E, A);
  }, Zt.useMemo = function(E, A) {
    return K.H.useMemo(E, A);
  }, Zt.useOptimistic = function(E, A) {
    return K.H.useOptimistic(E, A);
  }, Zt.useReducer = function(E, A, J) {
    return K.H.useReducer(E, A, J);
  }, Zt.useRef = function(E) {
    return K.H.useRef(E);
  }, Zt.useState = function(E) {
    return K.H.useState(E);
  }, Zt.useSyncExternalStore = function(E, A, J) {
    return K.H.useSyncExternalStore(
      E,
      A,
      J
    );
  }, Zt.useTransition = function() {
    return K.H.useTransition();
  }, Zt.version = "19.3.1", Zt;
}
var O1;
function V0() {
  return O1 || (O1 = 1, $d.exports = jb()), $d.exports;
}
var se = V0(), Wd = { exports: {} }, Co = {}, Id = { exports: {} }, t0 = {};
var R1;
function Qb() {
  return R1 || (R1 = 1, (function(f) {
    function i(F, k) {
      var W = F.length;
      F.push(k);
      t: for (; 0 < W; ) {
        var st = W - 1 >>> 1, w = F[st];
        if (0 < o(w, k))
          F[st] = k, F[W] = w, W = st;
        else break t;
      }
    }
    function u(F) {
      return F.length === 0 ? null : F[0];
    }
    function a(F) {
      if (F.length === 0) return null;
      var k = F[0], W = F.pop();
      if (W !== k) {
        F[0] = W;
        t: for (var st = 0, w = F.length, Et = w >>> 1; st < Et; ) {
          var z = 2 * (st + 1) - 1, Nt = F[z], E = z + 1, A = F[E];
          if (0 > o(Nt, W))
            E < w && 0 > o(A, Nt) ? (F[st] = A, F[E] = W, st = E) : (F[st] = Nt, F[z] = W, st = z);
          else if (E < w && 0 > o(A, W))
            F[st] = A, F[E] = W, st = E;
          else break t;
        }
      }
      return k;
    }
    function o(F, k) {
      var W = F.sortIndex - k.sortIndex;
      return W !== 0 ? W : F.id - k.id;
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
    var g = [], v = [], p = 1, _ = null, S = 3, b = !1, M = !1, T = !1, R = !1, j = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, Z = typeof setImmediate < "u" ? setImmediate : null;
    function Y(F) {
      for (var k = u(v); k !== null; ) {
        if (k.callback === null) a(v);
        else if (k.startTime <= F)
          a(v), k.sortIndex = k.expirationTime, i(g, k);
        else break;
        k = u(v);
      }
    }
    function Q(F) {
      if (T = !1, Y(F), !M)
        if (u(g) !== null)
          M = !0, tt || (tt = !0, it());
        else {
          var k = u(v);
          k !== null && et(Q, k.startTime - F);
        }
    }
    var tt = !1, N = -1, K = 5, P = -1;
    function V() {
      return R ? !0 : !(f.unstable_now() - P < K);
    }
    function ut() {
      if (R = !1, tt) {
        var F = f.unstable_now();
        P = F;
        var k = !0;
        try {
          t: {
            M = !1, T && (T = !1, X(N), N = -1), b = !0;
            var W = S;
            try {
              e: {
                for (Y(F), _ = u(g); _ !== null && !(_.expirationTime > F && V()); ) {
                  var st = _.callback;
                  if (typeof st == "function") {
                    _.callback = null, S = _.priorityLevel;
                    var w = st(
                      _.expirationTime <= F
                    );
                    if (F = f.unstable_now(), typeof w == "function") {
                      _.callback = w, Y(F), k = !0;
                      break e;
                    }
                    _ === u(g) && a(g), Y(F);
                  } else a(g);
                  _ = u(g);
                }
                if (_ !== null) k = !0;
                else {
                  var Et = u(v);
                  Et !== null && et(
                    Q,
                    Et.startTime - F
                  ), k = !1;
                }
              }
              break t;
            } finally {
              _ = null, S = W, b = !1;
            }
            k = void 0;
          }
        } finally {
          k ? it() : tt = !1;
        }
      }
    }
    var it;
    if (typeof Z == "function")
      it = function() {
        Z(ut);
      };
    else if (typeof MessageChannel < "u") {
      var St = new MessageChannel(), Mt = St.port2;
      St.port1.onmessage = ut, it = function() {
        Mt.postMessage(null);
      };
    } else
      it = function() {
        j(ut, 0);
      };
    function et(F, k) {
      N = j(function() {
        F(f.unstable_now());
      }, k);
    }
    f.unstable_IdlePriority = 5, f.unstable_ImmediatePriority = 1, f.unstable_LowPriority = 4, f.unstable_NormalPriority = 3, f.unstable_Profiling = null, f.unstable_UserBlockingPriority = 2, f.unstable_cancelCallback = function(F) {
      F.callback = null;
    }, f.unstable_forceFrameRate = function(F) {
      0 > F || 125 < F ? console.error(
        "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
      ) : K = 0 < F ? Math.floor(1e3 / F) : 5;
    }, f.unstable_getCurrentPriorityLevel = function() {
      return S;
    }, f.unstable_next = function(F) {
      switch (S) {
        case 1:
        case 2:
        case 3:
          var k = 3;
          break;
        default:
          k = S;
      }
      var W = S;
      S = k;
      try {
        return F();
      } finally {
        S = W;
      }
    }, f.unstable_requestPaint = function() {
      R = !0;
    }, f.unstable_runWithPriority = function(F, k) {
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
      var W = S;
      S = F;
      try {
        return k();
      } finally {
        S = W;
      }
    }, f.unstable_scheduleCallback = function(F, k, W) {
      var st = f.unstable_now();
      switch (typeof W == "object" && W !== null ? (W = W.delay, W = typeof W == "number" && 0 < W ? st + W : st) : W = st, F) {
        case 1:
          var w = -1;
          break;
        case 2:
          w = 250;
          break;
        case 5:
          w = 1073741823;
          break;
        case 4:
          w = 1e4;
          break;
        default:
          w = 5e3;
      }
      return w = W + w, F = {
        id: p++,
        callback: k,
        priorityLevel: F,
        startTime: W,
        expirationTime: w,
        sortIndex: -1
      }, W > st ? (F.sortIndex = W, i(v, F), u(g) === null && F === u(v) && (T ? (X(N), N = -1) : T = !0, et(Q, W - st))) : (F.sortIndex = w, i(g, F), M || b || (M = !0, tt || (tt = !0, it()))), F;
    }, f.unstable_shouldYield = V, f.unstable_wrapCallback = function(F) {
      var k = S;
      return function() {
        var W = S;
        S = k;
        try {
          return F.apply(this, arguments);
        } finally {
          S = W;
        }
      };
    };
  })(t0)), t0;
}
var z1;
function Zb() {
  return z1 || (z1 = 1, Id.exports = Qb()), Id.exports;
}
var e0 = { exports: {} }, Dn = {};
var C1;
function Kb() {
  if (C1) return Dn;
  C1 = 1;
  var f = V0();
  function i(p) {
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
  }, o = /* @__PURE__ */ Symbol.for("react.portal"), c = /* @__PURE__ */ Symbol.for("react.recoverable"), h = /* @__PURE__ */ Symbol.for("react.optimistic_key");
  function d(p, _, S) {
    var b = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: o,
      key: b == null ? null : b === h ? h : "" + b,
      children: p,
      containerInfo: _,
      implementation: S
    };
  }
  var g = f.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
  function v(p, _) {
    if (p === "font") return "";
    if (typeof _ == "string")
      return _ === "use-credentials" ? _ : "";
  }
  return Dn.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = a, Dn.browser = function(p) {
    return { $$typeof: c, _reason: p };
  }, Dn.createPortal = function(p, _) {
    var S = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!_ || _.nodeType !== 1 && _.nodeType !== 9 && _.nodeType !== 11)
      throw Error(i(299));
    return d(p, _, null, S);
  }, Dn.flushSync = function(p) {
    var _ = g.T, S = a.p;
    try {
      if (g.T = null, a.p = 2, p) return p();
    } finally {
      g.T = _, a.p = S, a.d.f();
    }
  }, Dn.preconnect = function(p, _) {
    typeof p == "string" && (_ ? (_ = _.crossOrigin, _ = typeof _ == "string" ? _ === "use-credentials" ? _ : "" : void 0) : _ = null, a.d.C(p, _));
  }, Dn.prefetchDNS = function(p) {
    typeof p == "string" && a.d.D(p);
  }, Dn.preinit = function(p, _) {
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
  }, Dn.preinitModule = function(p, _) {
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
  }, Dn.preload = function(p, _) {
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
  }, Dn.preloadModule = function(p, _) {
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
  }, Dn.requestFormReset = function(p) {
    a.d.r(p);
  }, Dn.unstable_batchedUpdates = function(p, _) {
    return p(_);
  }, Dn.useFormState = function(p, _, S) {
    return g.H.useFormState(p, _, S);
  }, Dn.useFormStatus = function() {
    return g.H.useHostTransitionStatus();
  }, Dn.version = "19.3.1", Dn;
}
var D1;
function z_() {
  if (D1) return e0.exports;
  D1 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (i) {
        console.error(i);
      }
  }
  return f(), e0.exports = Kb(), e0.exports;
}
var N1;
function Fb() {
  if (N1) return Co;
  N1 = 1;
  var f = Zb(), i = V0(), u = z_();
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
  function v(t) {
    var e = t.alternate;
    if (!e) {
      if (e = c(t), e === null) throw Error(a(188));
      return e !== t ? null : t;
    }
    for (var n = t, l = e; ; ) {
      var r = n.return;
      if (r === null) break;
      var s = r.alternate;
      if (s === null) {
        if (l = r.return, l !== null) {
          n = l;
          continue;
        }
        break;
      }
      if (r.child === s.child) {
        for (s = r.child; s; ) {
          if (s === n) return g(r), t;
          if (s === l) return g(r), e;
          s = s.sibling;
        }
        throw Error(a(188));
      }
      if (n.return !== l.return) n = r, l = s;
      else {
        for (var m = !1, y = r.child; y; ) {
          if (y === n) {
            m = !0, n = r, l = s;
            break;
          }
          if (y === l) {
            m = !0, l = r, n = s;
            break;
          }
          y = y.sibling;
        }
        if (!m) {
          for (y = s.child; y; ) {
            if (y === n) {
              m = !0, n = s, l = r;
              break;
            }
            if (y === l) {
              m = !0, l = s, n = r;
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
  function _(t, e, n, l, r, s) {
    for (; t !== null; ) {
      if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && n(t, l, r, s) || (t.tag !== 22 || t.memoizedState === null) && (e || t.tag !== 5 && t.tag !== 27) && _(
        t.child,
        e,
        n,
        l,
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
  var j = null, X = null;
  function Z(t, e, n) {
    return t === n ? !0 : t === e ? (j = t, !0) : !1;
  }
  function Y(t, e, n) {
    return t === n ? (X = t, !1) : t === e ? (X !== null && (j = t), !0) : !1;
  }
  function Q(t) {
    if (t === null) return null;
    do
      t = t === null ? null : t.return;
    while (t && t.tag !== 5 && t.tag !== 27 && t.tag !== 3);
    return t || null;
  }
  function tt(t, e, n) {
    for (var l = 0, r = t; r; r = n(r)) l++;
    r = 0;
    for (var s = e; s; s = n(s)) r++;
    for (; 0 < l - r; ) t = n(t), l--;
    for (; 0 < r - l; ) e = n(e), r--;
    for (; l--; ) {
      if (t === e || e !== null && t === e.alternate)
        return t;
      t = n(t), e = n(e);
    }
    return null;
  }
  var N = Object.assign, K = /* @__PURE__ */ Symbol.for("react.element"), P = /* @__PURE__ */ Symbol.for("react.transitional.element"), V = /* @__PURE__ */ Symbol.for("react.portal"), ut = /* @__PURE__ */ Symbol.for("react.fragment"), it = /* @__PURE__ */ Symbol.for("react.strict_mode"), St = /* @__PURE__ */ Symbol.for("react.profiler"), Mt = /* @__PURE__ */ Symbol.for("react.consumer"), et = /* @__PURE__ */ Symbol.for("react.context"), F = /* @__PURE__ */ Symbol.for("react.forward_ref"), k = /* @__PURE__ */ Symbol.for("react.suspense"), W = /* @__PURE__ */ Symbol.for("react.suspense_list"), st = /* @__PURE__ */ Symbol.for("react.memo"), w = /* @__PURE__ */ Symbol.for("react.lazy"), Et = /* @__PURE__ */ Symbol.for("react.activity"), z = /* @__PURE__ */ Symbol.for("react.legacy_hidden"), Nt = /* @__PURE__ */ Symbol.for("react.memo_cache_sentinel"), E = /* @__PURE__ */ Symbol.for("react.view_transition"), A = /* @__PURE__ */ Symbol.for("react.recoverable"), J = Symbol.iterator;
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
      case it:
        return "StrictMode";
      case k:
        return "Suspense";
      case W:
        return "SuspenseList";
      case Et:
        return "Activity";
      case E:
        return "ViewTransition";
    }
    if (typeof t == "object")
      switch (t.$$typeof) {
        case V:
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
        case w:
          e = t._payload, t = t._init;
          try {
            return ht(t(e));
          } catch {
          }
      }
    return null;
  }
  var Rt = Array.isArray, ot = i.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, gt = u.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, zt = {
    pending: !1,
    data: null,
    method: null,
    action: null
  }, pt = [], Ut = -1;
  function Yt(t) {
    return { current: t };
  }
  function B(t) {
    0 > Ut || (t.current = pt[Ut], pt[Ut] = null, Ut--);
  }
  function nt(t, e) {
    Ut++, pt[Ut] = t.current, t.current = e;
  }
  var vt = Yt(null), dt = Yt(null), bt = Yt(null), jt = Yt(null);
  function kt(t, e) {
    switch (nt(bt, e), nt(dt, t), nt(vt, null), e.nodeType) {
      case 9:
      case 11:
        t = (t = e.documentElement) && (t = t.namespaceURI) ? Up(t) : 0;
        break;
      default:
        if (t = e.tagName, e = e.namespaceURI)
          e = Up(e), t = Bp(e, t);
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
    B(vt), nt(vt, t);
  }
  function Ht() {
    B(vt), B(dt), B(bt);
  }
  function Ct(t) {
    var e = t.memoizedState;
    e !== null && (gr._currentValue = e.memoizedState, nt(jt, t)), e = vt.current;
    var n = Bp(e, t.type);
    e !== n && (nt(dt, t), nt(vt, n));
  }
  function ee(t) {
    dt.current === t && (B(vt), B(dt)), jt.current === t && (B(jt), gr._currentValue = zt);
  }
  var ue, Ke;
  function Re(t) {
    if (ue === void 0)
      try {
        throw Error();
      } catch (n) {
        var e = n.stack.trim().match(/\n( *(at )?)/);
        ue = e && e[1] || "", Ke = -1 < n.stack.indexOf(`
    at`) ? " (<anonymous>)" : -1 < n.stack.indexOf("@") ? "@unknown:0:0" : "";
      }
    return `
` + ue + t + Ke;
  }
  var pn = !1;
  function Vn(t, e) {
    if (!t || pn) return "";
    pn = !0;
    var n = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      var l = {
        DetermineComponentFrameRoot: function() {
          try {
            if (e) {
              var I = function() {
                throw Error();
              };
              if (Object.defineProperty(I.prototype, "props", {
                set: function() {
                  throw Error();
                }
              }), typeof Reflect == "object" && Reflect.construct) {
                try {
                  Reflect.construct(I, []);
                } catch (_t) {
                  var C = _t;
                }
                Reflect.construct(t, [], I);
              } else {
                try {
                  I.call();
                } catch (_t) {
                  C = _t;
                }
                I = !1;
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
                  }), I = !0, new t();
                } finally {
                  I && (q !== void 0 ? Object.defineProperty(t.prototype, "props", q) : delete t.prototype.props);
                }
              }
            } else {
              try {
                throw Error();
              } catch (_t) {
                C = _t;
              }
              (I = t()) && typeof I.catch == "function" && I.catch(function() {
              });
            }
          } catch (_t) {
            if (_t && C && typeof _t.stack == "string")
              return [_t.stack, C.stack];
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
      var s = l.DetermineComponentFrameRoot(), m = s[0], y = s[1];
      if (m && y) {
        var x = m.split(`
`), U = y.split(`
`);
        for (r = l = 0; l < x.length && !x[l].includes("DetermineComponentFrameRoot"); )
          l++;
        for (; r < U.length && !U[r].includes(
          "DetermineComponentFrameRoot"
        ); )
          r++;
        if (l === x.length || r === U.length)
          for (l = x.length - 1, r = U.length - 1; 1 <= l && 0 <= r && x[l] !== U[r]; )
            r--;
        for (; 1 <= l && 0 <= r; l--, r--)
          if (x[l] !== U[r]) {
            if (l !== 1 || r !== 1)
              do
                if (l--, r--, 0 > r || x[l] !== U[r]) {
                  var G = `
` + x[l].replace(" at new ", " at ");
                  return t.displayName && G.includes("<anonymous>") && (G = G.replace("<anonymous>", t.displayName)), G;
                }
              while (1 <= l && 0 <= r);
            break;
          }
      }
    } finally {
      pn = !1, Error.prepareStackTrace = n;
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
  function Yl(t) {
    try {
      var e = "", n = null;
      do
        e += xe(t, n), n = t, t = t.return;
      while (t);
      return e;
    } catch (l) {
      return `
Error generating stack: ` + l.message + `
` + l.stack;
    }
  }
  var Be = Object.prototype.hasOwnProperty, Gn = f.unstable_scheduleCallback, Ie = f.unstable_cancelCallback, el = f.unstable_shouldYield, ql = f.unstable_requestPaint, qt = f.unstable_now, Xl = f.unstable_getCurrentPriorityLevel, hn = f.unstable_ImmediatePriority, An = f.unstable_UserBlockingPriority, dn = f.unstable_NormalPriority, Vl = f.unstable_LowPriority, Gl = f.unstable_IdlePriority, nl = f.log, ct = f.unstable_setDisableYieldValue, at = null, rt = null;
  function Tt(t) {
    if (typeof nl == "function" && ct(t), rt && typeof rt.setStrictMode == "function")
      try {
        rt.setStrictMode(at, t);
      } catch {
      }
  }
  var lt = Math.clz32 ? Math.clz32 : xt, ft = Math.log, yt = Math.LN2;
  function xt(t) {
    return t >>>= 0, t === 0 ? 32 : 31 - (ft(t) / yt | 0) | 0;
  }
  var Lt = 256, wt = 262144, Vt = 4194304;
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
    var l = t.pendingLanes;
    if (l === 0) return 0;
    var r = 0, s = t.suspendedLanes, m = t.pingedLanes;
    t = t.warmLanes;
    var y = l & 134217727;
    return y !== 0 ? (l = y & ~s, l !== 0 ? r = ne(l) : (m &= y, m !== 0 ? r = ne(m) : n || (n = y & ~t, n !== 0 && (r = ne(n))))) : (y = l & ~s, y !== 0 ? r = ne(y) : m !== 0 ? r = ne(m) : n || (n = l & ~t, n !== 0 && (r = ne(n)))), r === 0 ? 0 : e !== 0 && e !== r && (e & s) === 0 && (s = r & -r, n = e & -e, s >= n || s === 32 && (n & 4194048) !== 0) ? e : r;
  }
  function Qt(t, e) {
    return (t.pendingLanes & ~(t.suspendedLanes & ~t.pingedLanes) & e) === 0;
  }
  function Kt(t, e) {
    (e & 8) !== 0 && (e |= e & 32);
    var n = t.entangledLanes;
    if (n !== 0)
      for (t = t.entanglements, n &= e; 0 < n; ) {
        var l = 31 - lt(n), r = 1 << l;
        e |= t[l], n &= ~r;
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
  function He(t) {
    for (var e = [], n = 0; 31 > n; n++) e.push(t);
    return e;
  }
  function Xe(t, e) {
    t.pendingLanes |= e, e !== 268435456 && (t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0);
  }
  function Ae(t, e, n, l, r, s) {
    var m = t.pendingLanes;
    t.pendingLanes = n, t.suspendedLanes = 0, t.pingedLanes = 0, t.warmLanes = 0, t.expiredLanes &= n, t.entangledLanes &= n, t.errorRecoveryDisabledLanes &= n, t.shellSuspendCounter = 0;
    var y = t.entanglements, x = t.expirationTimes, U = t.hiddenUpdates;
    for (n = m & ~n; 0 < n; ) {
      var G = 31 - lt(n), I = 1 << G;
      y[G] = 0, x[G] = -1;
      var C = U[G];
      if (C !== null)
        for (U[G] = null, G = 0; G < C.length; G++) {
          var q = C[G];
          q !== null && (q.lane &= -536870913);
        }
      n &= ~I;
    }
    l !== 0 && De(t, l, 0), s !== 0 && r === 0 && t.tag !== 0 && (t.suspendedLanes |= s & ~(m & ~e));
  }
  function De(t, e, n) {
    t.pendingLanes |= e, t.suspendedLanes &= ~e;
    var l = 31 - lt(e);
    t.entangledLanes |= e, t.entanglements[l] = t.entanglements[l] | 1073741824 | n & 261930;
  }
  function me(t, e) {
    var n = t.entangledLanes |= e;
    for (t = t.entanglements; n; ) {
      var l = 31 - lt(n), r = 1 << l;
      r & e | t[l] & e && (t[l] |= e), n &= ~r;
    }
  }
  function pl(t, e) {
    var n = e & -e;
    return n = (n & 42) !== 0 ? 1 : mi(n), (n & (t.suspendedLanes | e)) !== 0 ? 0 : n;
  }
  function mi(t) {
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
  function Ve(t) {
    return t &= -t, 2 < t ? 8 < t ? (t & 134217727) !== 0 ? 32 : 268435456 : 8 : 2;
  }
  function Ne() {
    var t = gt.p;
    return t !== 0 ? t : (t = window.event, t === void 0 ? 32 : _1(t.type));
  }
  function _n(t, e) {
    var n = gt.p;
    try {
      return gt.p = t, e();
    } finally {
      gt.p = n;
    }
  }
  var tn = Math.random().toString(36).slice(2), Le = "__reactFiber$" + tn, Ue = "__reactProps$" + tn, Fe = "__reactContainer$" + tn, _l = "__reactEvents$" + tn, ai = "__reactListeners$" + tn, ll = "__reactHandles$" + tn, Xr = "__reactResources$" + tn, Je = "__reactMarker$" + tn, ke = "__reactLoad$" + tn;
  function jn(t) {
    delete t[Le], delete t[Ue], delete t[ai], delete t[ll];
  }
  function Qn(t) {
    var e;
    if (e = t[Le]) return e;
    for (var n = t.parentNode; n; ) {
      if (e = n[Fe] || n[Le]) {
        if (n = e.alternate, e.child !== null || n !== null && n.child !== null)
          for (t = Wp(t); t !== null; ) {
            if (n = t[Le]) return n;
            t = Wp(t);
          }
        return e;
      }
      t = n, n = t.parentNode;
    }
    return null;
  }
  function jl(t) {
    if (t = t[Le] || t[Fe]) {
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
  function gi(t) {
    var e = t[Xr];
    return e || (e = t[Xr] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() }), e;
  }
  function en(t) {
    t[Je] = !0;
  }
  function gm(t) {
    t[ke] = void 0;
  }
  var vm = /* @__PURE__ */ new Set(), pm = {};
  function Za(t, e) {
    Du(t, e), Du(t + "Capture", e);
  }
  function Du(t, e) {
    for (pm[t] = e, t = 0; t < e.length; t++)
      vm.add(e[t]);
  }
  var aS = RegExp(
    "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
  ), _m = {}, ym = {};
  function uS(t) {
    return Be.call(ym, t) ? !0 : Be.call(_m, t) ? !1 : aS.test(t) ? ym[t] = !0 : (_m[t] = !0, !1);
  }
  var de = !1;
  function Sm() {
    var t = de;
    return de = !1, t;
  }
  function vs(t, e, n) {
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
            var l = e.toLowerCase().slice(0, 5);
            if (l !== "data-" && l !== "aria-") {
              t.removeAttribute(e);
              return;
            }
        }
        t.setAttribute(e, n);
      }
  }
  function ps(t, e, n) {
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
  function Ui(t, e, n, l) {
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
  function yl(t) {
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
  function bm(t) {
    var e = t.type;
    return (t = t.nodeName) && t.toLowerCase() === "input" && (e === "checkbox" || e === "radio");
  }
  function rS(t, e, n) {
    var l = Object.getOwnPropertyDescriptor(
      t.constructor.prototype,
      e
    );
    if (!t.hasOwnProperty(e) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var r = l.get, s = l.set;
      return Object.defineProperty(t, e, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(m) {
          n = "" + m, s.call(this, m);
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
  function Af(t) {
    if (!t._valueTracker) {
      var e = bm(t) ? "checked" : "value";
      t._valueTracker = rS(
        t,
        e,
        "" + t[e]
      );
    }
  }
  function Tm(t) {
    if (!t) return !1;
    var e = t._valueTracker;
    if (!e) return !0;
    var n = e.getValue(), l = "";
    return t && (l = bm(t) ? t.checked ? "true" : "false" : t.value), t = l, t !== n ? (e.setValue(t), !0) : !1;
  }
  var oS = /[\n"\\]/g;
  function Ql(t) {
    return t.replace(
      oS,
      function(e) {
        return "\\" + e.charCodeAt(0).toString(16) + " ";
      }
    );
  }
  function wf(t, e, n, l, r, s, m, y) {
    t.name = "", m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" ? t.type = m : t.removeAttribute("type"), e != null ? m === "number" ? (e === 0 && t.value === "" || t.value != e) && (t.value = "" + yl(e)) : t.value !== "" + yl(e) && (t.value = "" + yl(e)) : m !== "submit" && m !== "reset" || t.removeAttribute("value"), e != null ? m === "number" && t.value == e ? Of(t, yl(t.value)) : Of(t, yl(e)) : n != null ? Of(t, yl(n)) : l != null && t.removeAttribute("value"), r == null && s != null && (t.defaultChecked = !!s), r != null && (t.checked = r && typeof r != "function" && typeof r != "symbol"), y != null && typeof y != "function" && typeof y != "symbol" && typeof y != "boolean" ? t.name = "" + yl(y) : t.removeAttribute("name");
  }
  function Em(t, e, n, l, r, s, m, y) {
    if (s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" && (t.type = s), e != null || n != null) {
      if (!(s !== "submit" && s !== "reset" || e != null)) {
        Af(t);
        return;
      }
      n = n != null ? "" + yl(n) : "", e = e != null ? "" + yl(e) : n, y || e === t.value || (t.value = e), t.defaultValue = e;
    }
    l = l ?? r, l = typeof l != "function" && typeof l != "symbol" && !!l, t.checked = y ? t.checked : !!l, t.defaultChecked = !!l, m != null && typeof m != "function" && typeof m != "symbol" && typeof m != "boolean" && (t.name = m), Af(t);
  }
  function Of(t, e) {
    t.defaultValue !== "" + e && (t.defaultValue = "" + e);
  }
  function Nu(t, e, n, l) {
    if (t = t.options, e) {
      e = {};
      for (var r = 0; r < n.length; r++)
        e["$" + n[r]] = !0;
      for (n = 0; n < t.length; n++)
        r = e.hasOwnProperty("$" + t[n].value), t[n].selected !== r && (t[n].selected = r), r && l && (t[n].defaultSelected = !0);
    } else {
      for (n = "" + yl(n), e = null, r = 0; r < t.length; r++) {
        if (t[r].value === n) {
          t[r].selected = !0, l && (t[r].defaultSelected = !0);
          return;
        }
        e !== null || t[r].disabled || (e = t[r]);
      }
      e !== null && (e.selected = !0);
    }
  }
  function xm(t, e, n) {
    if (e != null && (e = "" + yl(e), e !== t.value && (t.value = e), n == null)) {
      t.defaultValue !== e && (t.defaultValue = e);
      return;
    }
    t.defaultValue = n != null ? "" + yl(n) : "";
  }
  function Mm(t, e, n, l) {
    if (e == null) {
      if (l != null) {
        if (n != null) throw Error(a(92));
        if (Rt(l)) {
          if (1 < l.length) throw Error(a(93));
          l = l[0];
        }
        n = l;
      }
      n == null && (n = ""), e = n;
    }
    n = yl(e), t.defaultValue = n, l = t.textContent, l === n && l !== "" && l !== null && (t.value = l), Af(t);
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
    var l = e.indexOf("--") === 0;
    n == null || typeof n == "boolean" || n === "" ? l ? t.setProperty(e, "") : e === "float" ? t.cssFloat = "" : t[e] = "" : l ? t.setProperty(e, n) : typeof n != "number" || n === 0 || sS.has(e) ? e === "float" ? t.cssFloat = n : t[e] = ("" + n).trim() : t[e] = n + "px";
  }
  function wm(t, e, n) {
    if (e != null && typeof e != "object")
      throw Error(a(62));
    if (t = t.style, n != null) {
      for (var l in n)
        !n.hasOwnProperty(l) || e != null && e.hasOwnProperty(l) || (l.indexOf("--") === 0 ? t.setProperty(l, "") : l === "float" ? t.cssFloat = "" : t[l] = "", de = !0);
      for (var r in e)
        l = e[r], e.hasOwnProperty(r) && n[r] !== l && (Am(t, r, l), de = !0);
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
  function vi() {
  }
  var zf = null;
  function Cf(t) {
    return t = t.target || t.srcElement || window, t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === 3 ? t.parentNode : t;
  }
  var Bu = null, Hu = null;
  function Om(t) {
    var e = jl(t);
    if (e && (t = e.stateNode)) {
      var n = t[Ue] || null;
      t: switch (t = e.stateNode, e.type) {
        case "input":
          if (wf(
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
              'input[name="' + Ql(
                "" + e
              ) + '"][type="radio"]'
            ), e = 0; e < n.length; e++) {
              var l = n[e];
              if (l !== t && l.form === t.form) {
                var r = l[Ue] || null;
                if (!r) throw Error(a(90));
                wf(
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
              l = n[e], l.form === t.form && Tm(l);
          }
          break t;
        case "textarea":
          xm(t, n.value, n.defaultValue);
          break t;
        case "select":
          e = n.value, e != null && Nu(t, !!n.multiple, e, !1);
      }
    }
  }
  var Df = !1;
  function Rm(t, e, n) {
    if (Df) return t(e, n);
    Df = !0;
    try {
      var l = t(e);
      return l;
    } finally {
      if (Df = !1, (Bu !== null || Hu !== null) && (_c(), Bu && (e = Bu, t = Hu, Hu = Bu = null, Om(e), t)))
        for (e = 0; e < t.length; e++) Om(t[e]);
    }
  }
  function Vr(t, e) {
    var n = t.stateNode;
    if (n === null) return null;
    var l = n[Ue] || null;
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
  var Bi = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Nf = !1;
  if (Bi)
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
  function zm() {
    if (ys) return ys;
    var t, e = Uf, n = e.length, l, r = "value" in ea ? ea.value : ea.textContent, s = r.length;
    for (t = 0; t < n && e[t] === r[t]; t++) ;
    var m = n - t;
    for (l = 1; l <= m && e[n - l] === r[s - l]; l++) ;
    return ys = r.slice(t, 1 < l ? 1 - l : void 0);
  }
  function Ss(t) {
    var e = t.keyCode;
    return "charCode" in t ? (t = t.charCode, t === 0 && e === 13 && (t = 13)) : t = e, t === 10 && (t = 13), 32 <= t || t === 13 ? t : 0;
  }
  function bs() {
    return !0;
  }
  function Cm() {
    return !1;
  }
  function Zn(t) {
    function e(n, l, r, s, m) {
      this._reactName = n, this._targetInst = r, this.type = l, this.nativeEvent = s, this.target = m, this.currentTarget = null;
      for (var y in t)
        t.hasOwnProperty(y) && (n = t[y], this[y] = n ? n(s) : s[y]);
      return this.isDefaultPrevented = (s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1) ? bs : Cm, this.isPropagationStopped = Cm, this;
    }
    return N(e.prototype, {
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
  }, Ts = Zn(na), jr = N({}, na, { view: 0, detail: 0 }), hS = Zn(jr), Bf, Hf, Qr, Es = N({}, jr, {
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
  }), Dm = Zn(Es), dS = N({}, Es, { dataTransfer: 0 }), mS = Zn(dS), gS = N({}, jr, { relatedTarget: 0 }), Lf = Zn(gS), vS = N({}, na, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pS = Zn(vS), _S = N({}, na, {
    clipboardData: function(t) {
      return "clipboardData" in t ? t.clipboardData : window.clipboardData;
    }
  }), yS = Zn(_S), SS = N({}, na, { data: 0 }), Nm = Zn(SS), bS = {
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
  var MS = N({}, jr, {
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
  }), AS = Zn(MS), wS = N({}, Es, {
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
  }), Um = Zn(wS), OS = N({}, na, { submitter: 0 }), RS = Zn(OS), zS = N({}, jr, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Yf
  }), CS = Zn(zS), DS = N({}, na, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), NS = Zn(DS), US = N({}, Es, {
    deltaX: function(t) {
      return "deltaX" in t ? t.deltaX : "wheelDeltaX" in t ? -t.wheelDeltaX : 0;
    },
    deltaY: function(t) {
      return "deltaY" in t ? t.deltaY : "wheelDeltaY" in t ? -t.wheelDeltaY : "wheelDelta" in t ? -t.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), BS = Zn(US), HS = N({}, na, {
    newState: 0,
    oldState: 0,
    source: 0
  }), LS = Zn(HS), YS = [9, 13, 27, 32], qf = Bi && "CompositionEvent" in window, Zr = null;
  Bi && "documentMode" in document && (Zr = document.documentMode);
  var qS = Bi && "TextEvent" in window && !Zr, Bm = Bi && (!qf || Zr && 8 < Zr && 11 >= Zr), Hm = " ", Lm = !1;
  function Ym(t, e) {
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
  function qm(t) {
    return t = t.detail, typeof t == "object" && "data" in t ? t.data : null;
  }
  var Lu = !1;
  function XS(t, e) {
    switch (t) {
      case "compositionend":
        return qm(e);
      case "keypress":
        return e.which !== 32 ? null : (Lm = !0, Hm);
      case "textInput":
        return t = e.data, t === Hm && Lm ? null : t;
      default:
        return null;
    }
  }
  function VS(t, e) {
    if (Lu)
      return t === "compositionend" || !qf && Ym(t, e) ? (t = zm(), ys = Uf = ea = null, Lu = !1, t) : null;
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
        return Bm && e.locale !== "ko" ? null : e.data;
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
  function Xm(t) {
    var e = t && t.nodeName && t.nodeName.toLowerCase();
    return e === "input" ? !!GS[t.type] : e === "textarea";
  }
  function Vm(t, e, n, l) {
    Bu ? Hu ? Hu.push(l) : Hu = [l] : Bu = l, e = xc(e, "onChange"), 0 < e.length && (n = new Ts(
      "onChange",
      "change",
      null,
      n,
      l
    ), t.push({ event: n, listeners: e }));
  }
  var Kr = null, Fr = null;
  function jS(t) {
    Op(t, 0);
  }
  function xs(t) {
    var e = Qa(t);
    if (Tm(e)) return t;
  }
  function Gm(t, e) {
    if (t === "change") return e;
  }
  var jm = !1;
  if (Bi) {
    var Xf;
    if (Bi) {
      var Vf = "oninput" in document;
      if (!Vf) {
        var Qm = document.createElement("div");
        Qm.setAttribute("oninput", "return;"), Vf = typeof Qm.oninput == "function";
      }
      Xf = Vf;
    } else Xf = !1;
    jm = Xf && (!document.documentMode || 9 < document.documentMode);
  }
  function Zm() {
    Kr && (Kr.detachEvent("onpropertychange", Km), Fr = Kr = null);
  }
  function Km(t) {
    if (t.propertyName === "value" && xs(Fr)) {
      var e = [];
      Vm(
        e,
        Fr,
        t,
        Cf(t)
      ), Rm(jS, e);
    }
  }
  function QS(t, e, n) {
    t === "focusin" ? (Zm(), Kr = e, Fr = n, Kr.attachEvent("onpropertychange", Km)) : t === "focusout" && Zm();
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
  var Sl = typeof Object.is == "function" ? Object.is : JS;
  function Jr(t, e) {
    if (Sl(t, e)) return !0;
    if (typeof t != "object" || t === null || typeof e != "object" || e === null)
      return !1;
    var n = Object.keys(t), l = Object.keys(e);
    if (n.length !== l.length) return !1;
    for (l = 0; l < n.length; l++) {
      var r = n[l];
      if (!Be.call(e, r) || !Sl(t[r], e[r]))
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
  function Fm(t) {
    for (; t && t.firstChild; ) t = t.firstChild;
    return t;
  }
  function Jm(t, e) {
    var n = Fm(t);
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
      n = Fm(n);
    }
  }
  function km(t, e) {
    return t && e ? t === e ? !0 : t && t.nodeType === 3 ? !1 : e && e.nodeType === 3 ? km(t, e.parentNode) : "contains" in t ? t.contains(e) : t.compareDocumentPosition ? !!(t.compareDocumentPosition(e) & 16) : !1 : !1;
  }
  function Pm(t) {
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
  var kS = Bi && "documentMode" in document && 11 >= document.documentMode, Yu = null, Qf = null, kr = null, Zf = !1;
  function $m(t, e, n) {
    var l = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
    Zf || Yu == null || Yu !== Gf(l) || (l = Yu, "selectionStart" in l && jf(l) ? l = { start: l.selectionStart, end: l.selectionEnd } : (l = (l.ownerDocument && l.ownerDocument.defaultView || window).getSelection(), l = {
      anchorNode: l.anchorNode,
      anchorOffset: l.anchorOffset,
      focusNode: l.focusNode,
      focusOffset: l.focusOffset
    }), kr && Jr(kr, l) || (kr = l, l = xc(Qf, "onSelect"), 0 < l.length && (e = new Ts(
      "onSelect",
      "select",
      null,
      e,
      n
    ), t.push({ event: e, listeners: l }), e.target = Yu)));
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
  }, Kf = {}, Wm = {};
  Bi && (Wm = document.createElement("div").style, "AnimationEvent" in window || (delete qu.animationend.animation, delete qu.animationiteration.animation, delete qu.animationstart.animation), "TransitionEvent" in window || delete qu.transitionend.transition);
  function Fa(t) {
    if (Kf[t]) return Kf[t];
    if (!qu[t]) return t;
    var e = qu[t], n;
    for (n in e)
      if (e.hasOwnProperty(n) && n in Wm)
        return Kf[t] = e[n];
    return t;
  }
  var Im = Fa("animationend"), tg = Fa("animationiteration"), eg = Fa("animationstart"), PS = Fa("transitionrun"), $S = Fa("transitionstart"), WS = Fa("transitioncancel"), ng = Fa("transitionend"), lg = /* @__PURE__ */ new Map(), Ff = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
    " "
  );
  Ff.push("scrollEnd");
  function ui(t, e) {
    lg.set(t, e), Za(e, [t]);
  }
  var IS = 0;
  function Hi(t, e) {
    if (t.name != null && t.name !== "auto") return t.name;
    if (e.autoName !== null) return e.autoName;
    t = ci.identifierPrefix;
    var n = IS++;
    return t = "_" + t + "t_" + n.toString(32) + "_", e.autoName = t;
  }
  function ig(t) {
    if (t == null || typeof t == "string")
      return t;
    var e = null, n = ar;
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
  function Li(t, e) {
    return t = ig(t), e = ig(e), e == null ? t === "auto" ? null : t : e === "auto" ? null : e;
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
  }, Zl = [], Xu = 0, Jf = 0;
  function As() {
    for (var t = Xu, e = Jf = Xu = 0; e < t; ) {
      var n = Zl[e];
      Zl[e++] = null;
      var l = Zl[e];
      Zl[e++] = null;
      var r = Zl[e];
      Zl[e++] = null;
      var s = Zl[e];
      if (Zl[e++] = null, l !== null && r !== null) {
        var m = l.pending;
        m === null ? r.next = r : (r.next = m.next, m.next = r), l.pending = r;
      }
      s !== 0 && ag(n, r, s);
    }
  }
  function ws(t, e, n, l) {
    Zl[Xu++] = t, Zl[Xu++] = e, Zl[Xu++] = n, Zl[Xu++] = l, Jf |= l, t.lanes |= l, t = t.alternate, t !== null && (t.lanes |= l);
  }
  function kf(t, e, n, l) {
    return ws(t, e, n, l), Os(t);
  }
  function Ja(t, e) {
    return ws(t, null, null, e), Os(t);
  }
  function ag(t, e, n) {
    t.lanes |= n;
    var l = t.alternate;
    l !== null && (l.lanes |= n);
    for (var r = !1, s = t.return; s !== null; )
      s.childLanes |= n, l = s.alternate, l !== null && (l.childLanes |= n), s.tag === 22 && (t = s.stateNode, t === null || t._visibility & 1 || (r = !0)), t = s, s = s.return;
    return t.tag === 3 ? (s = t.stateNode, r && e !== null && (r = 31 - lt(n), t = s.hiddenUpdates, l = t[r], l === null ? t[r] = [e] : l.push(e), e.lane = n | 536870912), s) : null;
  }
  function Os(t) {
    if (50 < _o)
      throw _o = 0, pc = null, Error(a(185));
    for (var e = t.return; e !== null; )
      t = e, e = t.return;
    return t.tag === 3 ? t.stateNode : null;
  }
  var Vu = {};
  function t2(t, e, n, l) {
    this.tag = t, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = e, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = l, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function il(t, e, n, l) {
    return new t2(t, e, n, l);
  }
  function Pf(t) {
    return t = t.prototype, !(!t || !t.isReactComponent);
  }
  function Yi(t, e) {
    var n = t.alternate;
    return n === null ? (n = il(
      t.tag,
      e,
      t.key,
      t.mode
    ), n.elementType = t.elementType, n.type = t.type, n.stateNode = t.stateNode, n.alternate = t, t.alternate = n) : (n.pendingProps = e, n.type = t.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = t.flags & 1206910976, n.childLanes = t.childLanes, n.lanes = t.lanes, n.child = t.child, n.memoizedProps = t.memoizedProps, n.memoizedState = t.memoizedState, n.updateQueue = t.updateQueue, e = t.dependencies, n.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }, n.sibling = t.sibling, n.index = t.index, n.ref = t.ref, n.refCleanup = t.refCleanup, n;
  }
  function ug(t, e) {
    t.flags &= 1206910978;
    var n = t.alternate;
    return n === null ? (t.childLanes = 0, t.lanes = e, t.child = null, t.subtreeFlags = 0, t.memoizedProps = null, t.memoizedState = null, t.updateQueue = null, t.dependencies = null, t.stateNode = null) : (t.childLanes = n.childLanes, t.lanes = n.lanes, t.child = n.child, t.subtreeFlags = 0, t.deletions = null, t.memoizedProps = n.memoizedProps, t.memoizedState = n.memoizedState, t.updateQueue = n.updateQueue, t.type = n.type, e = n.dependencies, t.dependencies = e === null ? null : {
      lanes: e.lanes,
      firstContext: e.firstContext
    }), t;
  }
  function Rs(t, e, n, l, r, s) {
    var m = 0;
    if (l = t, typeof l == "function") Pf(l) && (m = 1);
    else if (typeof l == "string")
      m = Ob(
        t,
        n,
        vt.current
      ) ? 26 : t === "html" || t === "head" || t === "body" ? 27 : 5;
    else
      t: switch (l) {
        case Et:
          return t = il(31, n, e, r), t.elementType = Et, t.lanes = s, t;
        case ut:
          return ka(n.children, r, s, e);
        case it:
          m = 8, r |= 24;
          break;
        case St:
          return t = il(12, n, e, r | 2), t.elementType = St, t.lanes = s, t;
        case k:
          return t = il(13, n, e, r), t.elementType = k, t.lanes = s, t;
        case W:
          return t = il(19, n, e, r), t.elementType = W, t.lanes = s, t;
        case z:
        case E:
          return t = r | 32, t = il(30, n, e, t), t.elementType = E, t.lanes = s, t.stateNode = {
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
              case Mt:
                m = 9;
                break t;
              case F:
                m = 11;
                break t;
              case st:
                m = 14;
                break t;
              case w:
                m = 16, l = null;
                break t;
            }
          m = 29, n = Error(
            a(130, t === null ? "null" : typeof t, "")
          ), l = null;
      }
    return e = il(m, n, e, r), e.elementType = t, e.type = l, e.lanes = s, e;
  }
  function ka(t, e, n, l) {
    return t = il(7, t, l, e), t.lanes = n, t;
  }
  function $f(t, e, n) {
    return t = il(6, t, null, e), t.lanes = n, t;
  }
  function rg(t) {
    var e = il(18, null, null, 0);
    return e.stateNode = t, e;
  }
  function Wf(t, e, n) {
    return e = il(
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
  var og = /* @__PURE__ */ new WeakMap();
  function Kl(t, e) {
    if (typeof t == "object" && t !== null) {
      var n = og.get(t);
      return n !== void 0 ? n : (e = {
        value: t,
        source: e,
        stack: Yl(e)
      }, og.set(t, e), e);
    }
    return {
      value: t,
      source: e,
      stack: Yl(e)
    };
  }
  var Gu = [], ju = 0, zs = null, Pr = 0, Fl = [], Jl = 0, la = null, pi = 1, _i = "";
  function qi(t, e) {
    Gu[ju++] = Pr, Gu[ju++] = zs, zs = t, Pr = e;
  }
  function sg(t, e, n) {
    Fl[Jl++] = pi, Fl[Jl++] = _i, Fl[Jl++] = la, la = t;
    var l = pi;
    t = _i;
    var r = 32 - lt(l) - 1;
    l &= ~(1 << r), n += 1;
    var s = 32 - lt(e) + r;
    if (30 < s) {
      var m = r - r % 5;
      s = (l & (1 << m) - 1).toString(32), l >>= m, r -= m, pi = 1 << 32 - lt(e) + r | n << r | l, _i = s + t;
    } else
      pi = 1 << s | n << r | l, _i = t;
  }
  function Cs(t) {
    t.return !== null && (qi(t, 1), sg(t, 1, 0));
  }
  function If(t) {
    for (; t === zs; )
      zs = Gu[--ju], Gu[ju] = null, Pr = Gu[--ju], Gu[ju] = null;
    for (; t === la; )
      la = Fl[--Jl], Fl[Jl] = null, _i = Fl[--Jl], Fl[Jl] = null, pi = Fl[--Jl], Fl[Jl] = null;
  }
  function cg(t, e) {
    Fl[Jl++] = pi, Fl[Jl++] = _i, Fl[Jl++] = la, pi = e.id, _i = e.overflow, la = t;
  }
  var yn = null, ze = null, $t = !1, ia = null, kl = !1, th = Error(a(519));
  function aa(t) {
    var e = Error(
      a(
        418,
        1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML",
        ""
      )
    );
    throw $r(Kl(e, t)), th;
  }
  function fg(t) {
    var e = t.stateNode, n = t.type, l = t.memoizedProps;
    switch (e[Le] = t, e[Ue] = l, n) {
      case "dialog":
        ie("cancel", e), ie("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        ie("load", e);
        break;
      case "video":
      case "audio":
        for (n = 0; n < So.length; n++)
          ie(So[n], e);
        break;
      case "source":
        ie("error", e);
        break;
      case "img":
      case "image":
      case "link":
        ie("error", e), ie("load", e);
        break;
      case "details":
        ie("toggle", e);
        break;
      case "input":
        ie("invalid", e), Em(
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
        ie("invalid", e);
        break;
      case "textarea":
        ie("invalid", e), Mm(e, l.value, l.defaultValue, l.children);
    }
    n = l.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || e.textContent === "" + n || l.suppressHydrationWarning === !0 || Dp(e.textContent, n) ? (l.popover != null && (ie("beforetoggle", e), ie("toggle", e)), l.onScroll != null && ie("scroll", e), l.onScrollEnd != null && ie("scrollend", e), l.onClick != null && (e.onclick = vi), e = !0) : e = !1, e || aa(t, !0);
  }
  function Ds(t) {
    for (yn = t.return; yn; )
      switch (yn.tag) {
        case 5:
        case 31:
        case 13:
          kl = !1;
          return;
        case 27:
        case 3:
          kl = !0;
          return;
        default:
          yn = yn.return;
      }
  }
  function Qu(t) {
    if (t !== yn) return !1;
    if (!$t) return Ds(t), $t = !0, !1;
    var e = t.tag, n;
    if ((n = e !== 3 && e !== 27) && ((n = e === 5) && (n = t.type, n = !(n !== "form" && n !== "button") || zd(t.type, t.memoizedProps)), n = !n), n && ze && aa(t), Ds(t), e === 13) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      ze = $p(t);
    } else if (e === 31) {
      if (t = t.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(317));
      ze = $p(t);
    } else
      e === 27 ? (e = ze, ba(t.type) ? (t = qd, qd = null, ze = t) : ze = e) : ze = yn ? $l(t.stateNode.nextSibling) : null;
    return !0;
  }
  function Pa() {
    ze = yn = null, $t = !1;
  }
  function eh() {
    var t = ia;
    return t !== null && (rl === null ? rl = t : rl.push.apply(
      rl,
      t
    ), ia = null), t;
  }
  function $r(t) {
    ia === null ? ia = [t] : ia.push(t);
  }
  var nh = Yt(null), $a = null, Xi = null;
  function ua(t, e, n) {
    nt(nh, e._currentValue), e._currentValue = n;
  }
  function Vi(t) {
    t._currentValue = nh.current, B(nh);
  }
  function Ns(t, e, n) {
    for (; t !== null; ) {
      var l = t.alternate;
      if ((t.childLanes & e) !== e ? (t.childLanes |= e, l !== null && (l.childLanes |= e)) : l !== null && (l.childLanes & e) !== e && (l.childLanes |= e), t === n) break;
      t = t.return;
    }
  }
  function lh(t, e, n, l) {
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
              ), l || (m = null);
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
  function Wa(t, e, n, l) {
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
          Sl(r.pendingProps.value, m.value) || (t !== null ? t.push(y) : t = [y]);
        }
      } else if (r === jt.current) {
        if (m = r.alternate, m === null) throw Error(a(387));
        m.memoizedState.memoizedState !== r.memoizedState.memoizedState && (t !== null ? t.push(gr) : t = [gr]);
      }
      r = r.return;
    }
    return t !== null && lh(
      e,
      t,
      n,
      l
    ), e.flags |= 262144, t !== null;
  }
  function Us(t) {
    for (t = t.firstContext; t !== null; ) {
      if (!Sl(
        t.context._currentValue,
        t.memoizedValue
      ))
        return !0;
      t = t.next;
    }
    return !1;
  }
  function Ia(t) {
    $a = t, Xi = null, t = t.dependencies, t !== null && (t.firstContext = null);
  }
  function wn(t) {
    return hg($a, t);
  }
  function Bs(t, e) {
    return $a === null && Ia(t), hg(t, e);
  }
  function hg(t, e) {
    var n = e._currentValue;
    if (e = { context: e, memoizedValue: n, next: null }, Xi === null) {
      if (t === null) throw Error(a(308));
      Xi = e, t.dependencies = { lanes: 0, firstContext: e }, t.flags |= 524288;
    } else Xi = Xi.next = e;
    return n;
  }
  var e2 = typeof AbortController < "u" ? AbortController : function() {
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
  }, n2 = f.unstable_scheduleCallback, l2 = f.unstable_NormalPriority, un = {
    $$typeof: et,
    Consumer: null,
    Provider: null,
    _currentValue: null,
    _currentValue2: null,
    _threadCount: 0
  };
  function ih() {
    return {
      controller: new e2(),
      data: /* @__PURE__ */ new Map(),
      refCount: 0
    };
  }
  function Wr(t) {
    t.refCount--, t.refCount === 0 && n2(l2, function() {
      t.controller.abort();
    });
  }
  function dg(t, e) {
    if ((t.pendingLanes & 4194048) !== 0) {
      var n = t.transitionTypes;
      for (n === null && (n = t.transitionTypes = []), t = 0; t < e.length; t++) {
        var l = e[t];
        n.indexOf(l) === -1 && n.push(l);
      }
    }
  }
  var Ir = null;
  function i2(t) {
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
        then: function(l) {
          n.push(l);
        }
      };
    }
    return ah++, e.then(mg, mg), e;
  }
  function mg() {
    if (--ah === 0 && (Ir = null, to !== null)) {
      Zu !== null && (Zu.status = "fulfilled");
      var t = to;
      to = null, tu = 0, Zu = null;
      for (var e = 0; e < t.length; e++) (0, t[e])();
    }
  }
  function u2(t, e) {
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
  var gg = ot.S;
  ot.S = function(t, e) {
    if (rp = qt(), typeof e == "object" && e !== null && typeof e.then == "function" && a2(t, e), Ir !== null)
      for (var n = sr; n !== null; )
        dg(n, Ir), n = n.next;
    if (n = t.types, n !== null) {
      for (var l = sr; l !== null; )
        dg(l, n), l = l.next;
      if (tu !== 0) {
        l = Ir, l === null && (l = Ir = []);
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          l.indexOf(s) === -1 && l.push(s);
        }
      }
    }
    gg !== null && gg(t, e);
  };
  var eu = Yt(null);
  function uh() {
    var t = eu.current;
    return t !== null ? t : we.pooledCache;
  }
  function Hs(t, e) {
    e === null ? nt(eu, eu.current) : nt(eu, e.pool);
  }
  function vg() {
    var t = uh();
    return t === null ? null : { parent: un._currentValue, pool: t };
  }
  var Ku = Error(a(460)), rh = Error(a(474)), Ls = Error(a(542)), Ys = { then: function() {
  } };
  function pg(t) {
    return t = t.status, t === "fulfilled" || t === "rejected";
  }
  function _g(t, e, n) {
    switch (n = t[n], n === void 0 ? t.push(e) : n !== e && (e.then(vi, vi), e = n), e.status) {
      case "fulfilled":
        return e.value;
      case "rejected":
        throw t = e.reason, Sg(t), t === void 0 && !("reason" in e) ? Error(a(600)) : t;
      default:
        if (typeof e.status == "string") e.then(vi, vi);
        else {
          if (t = we, t !== null && 100 < t.shellSuspendCounter)
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
            throw t = e.reason, Sg(t), t;
        }
        throw lu = e, Ku;
    }
  }
  function nu(t) {
    try {
      var e = t._init;
      return e(t._payload);
    } catch (n) {
      throw n !== null && typeof n == "object" && typeof n.then == "function" ? (lu = n, Ku) : n;
    }
  }
  var lu = null;
  function yg() {
    if (lu === null) throw Error(a(459));
    var t = lu;
    return lu = null, t;
  }
  function Sg(t) {
    if (t === Ku || t === Ls)
      throw Error(a(483));
  }
  var Fu = null, eo = 0;
  function qs(t) {
    var e = eo;
    return eo += 1, Fu === null && (Fu = []), _g(Fu, t, e);
  }
  function ra(t, e) {
    e = e.props.ref, t.ref = e !== void 0 ? e : null;
  }
  function Xs(t, e) {
    throw e.$$typeof === K ? Error(a(525)) : (t = Object.prototype.toString.call(e), Error(
      a(
        31,
        t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t
      )
    ));
  }
  function bg(t) {
    function e(D, O) {
      if (t) {
        var H = D.deletions;
        H === null ? (D.deletions = [O], D.flags |= 16) : H.push(O);
      }
    }
    function n(D, O) {
      if (!t) return null;
      for (; O !== null; )
        e(D, O), O = O.sibling;
      return null;
    }
    function l(D) {
      for (var O = /* @__PURE__ */ new Map(); D !== null; )
        D.key === null ? O.set(D.index, D) : O.set(D.key, D), D = D.sibling;
      return O;
    }
    function r(D, O) {
      return D = Yi(D, O), D.index = 0, D.sibling = null, D;
    }
    function s(D, O, H) {
      return D.index = H, t ? (H = D.alternate, H !== null ? (H = H.index, H < O ? (D.flags |= 2, O) : H) : (D.flags |= 134217730, O)) : (D.flags |= 1048576, O);
    }
    function m(D) {
      return t && D.alternate === null && (D.flags |= 134217730), D;
    }
    function y(D, O, H, $) {
      return O === null || O.tag !== 6 ? (O = $f(H, D.mode, $), O.return = D, O) : (O = r(O, H), O.return = D, O);
    }
    function x(D, O, H, $) {
      var At = H.type;
      return At === ut ? (D = G(
        D,
        O,
        H.props.children,
        $,
        H.key
      ), ra(D, H), D) : O !== null && (O.elementType === At || typeof At == "object" && At !== null && At.$$typeof === w && nu(At) === O.type) ? (O = r(O, H.props), ra(O, H), O.return = D, O) : (O = Rs(
        H.type,
        H.key,
        H.props,
        null,
        D.mode,
        $
      ), ra(O, H), O.return = D, O);
    }
    function U(D, O, H, $) {
      return O === null || O.tag !== 4 || O.stateNode.containerInfo !== H.containerInfo || O.stateNode.implementation !== H.implementation ? (O = Wf(H, D.mode, $), O.return = D, O) : (O = r(O, H.children || []), O.return = D, O);
    }
    function G(D, O, H, $, At) {
      return O === null || O.tag !== 7 ? (O = ka(
        H,
        D.mode,
        $,
        At
      ), O.return = D, O) : (O = r(O, H), O.return = D, O);
    }
    function I(D, O, H) {
      if (typeof O == "string" && O !== "" || typeof O == "number" || typeof O == "bigint")
        return O = $f(
          "" + O,
          D.mode,
          H
        ), O.return = D, O;
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case P:
            return H = Rs(
              O.type,
              O.key,
              O.props,
              null,
              D.mode,
              H
            ), ra(H, O), H.return = D, H;
          case V:
            return O = Wf(
              O,
              D.mode,
              H
            ), O.return = D, O;
          case w:
            return O = nu(O), I(D, O, H);
        }
        if (Rt(O) || L(O))
          return O = ka(
            O,
            D.mode,
            H,
            null
          ), O.return = D, O;
        if (typeof O.then == "function")
          return I(D, qs(O), H);
        if (O.$$typeof === et)
          return I(
            D,
            Bs(D, O),
            H
          );
        Xs(D, O);
      }
      return null;
    }
    function C(D, O, H, $) {
      var At = O !== null ? O.key : null;
      if (typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint")
        return At !== null ? null : y(D, O, "" + H, $);
      if (typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case P:
            return H.key === At ? x(D, O, H, $) : null;
          case V:
            return H.key === At ? U(D, O, H, $) : null;
          case w:
            return H = nu(H), C(D, O, H, $);
        }
        if (Rt(H) || L(H))
          return At !== null ? null : G(D, O, H, $, null);
        if (typeof H.then == "function")
          return C(
            D,
            O,
            qs(H),
            $
          );
        if (H.$$typeof === et)
          return C(
            D,
            O,
            Bs(D, H),
            $
          );
        Xs(D, H);
      }
      return null;
    }
    function q(D, O, H, $, At) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number" || typeof $ == "bigint")
        return D = D.get(H) || null, y(O, D, "" + $, At);
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case P:
            return D = D.get(
              $.key === null ? H : $.key
            ) || null, x(O, D, $, At);
          case V:
            return D = D.get(
              $.key === null ? H : $.key
            ) || null, U(O, D, $, At);
          case w:
            return $ = nu($), q(
              D,
              O,
              H,
              $,
              At
            );
        }
        if (Rt($) || L($))
          return D = D.get(H) || null, G(O, D, $, At, null);
        if (typeof $.then == "function")
          return q(
            D,
            O,
            H,
            qs($),
            At
          );
        if ($.$$typeof === et)
          return q(
            D,
            O,
            H,
            Bs(O, $),
            At
          );
        Xs(O, $);
      }
      return null;
    }
    function _t(D, O, H, $) {
      for (var At = null, oe = null, Bt = O, Gt = O = 0, sn = null; Bt !== null && Gt < H.length; Gt++) {
        Bt.index > Gt ? (sn = Bt, Bt = null) : sn = Bt.sibling;
        var fe = C(
          D,
          Bt,
          H[Gt],
          $
        );
        if (fe === null) {
          Bt === null && (Bt = sn);
          break;
        }
        t && Bt && fe.alternate === null && e(D, Bt), O = s(fe, O, Gt), oe === null ? At = fe : oe.sibling = fe, oe = fe, Bt = sn;
      }
      if (Gt === H.length)
        return n(D, Bt), $t && qi(D, Gt), At;
      if (Bt === null) {
        for (; Gt < H.length; Gt++)
          Bt = I(D, H[Gt], $), Bt !== null && (O = s(
            Bt,
            O,
            Gt
          ), oe === null ? At = Bt : oe.sibling = Bt, oe = Bt);
        return $t && qi(D, Gt), At;
      }
      for (Bt = l(Bt); Gt < H.length; Gt++)
        sn = q(
          Bt,
          D,
          Gt,
          H[Gt],
          $
        ), sn !== null && (t && (fe = sn.alternate, fe !== null && Bt.delete(fe.key === null ? Gt : fe.key)), O = s(
          sn,
          O,
          Gt
        ), oe === null ? At = sn : oe.sibling = sn, oe = sn);
      return t && Bt.forEach(function(Aa) {
        return e(D, Aa);
      }), $t && qi(D, Gt), At;
    }
    function Dt(D, O, H, $) {
      if (H == null) throw Error(a(151));
      for (var At = null, oe = null, Bt = O, Gt = O = 0, sn = null, fe = H.next(); Bt !== null && !fe.done; Gt++, fe = H.next()) {
        Bt.index > Gt ? (sn = Bt, Bt = null) : sn = Bt.sibling;
        var Aa = C(D, Bt, fe.value, $);
        if (Aa === null) {
          Bt === null && (Bt = sn);
          break;
        }
        t && Bt && Aa.alternate === null && e(D, Bt), O = s(Aa, O, Gt), oe === null ? At = Aa : oe.sibling = Aa, oe = Aa, Bt = sn;
      }
      if (fe.done)
        return n(D, Bt), $t && qi(D, Gt), At;
      if (Bt === null) {
        for (; !fe.done; Gt++, fe = H.next())
          fe = I(D, fe.value, $), fe !== null && (O = s(fe, O, Gt), oe === null ? At = fe : oe.sibling = fe, oe = fe);
        return $t && qi(D, Gt), At;
      }
      for (Bt = l(Bt); !fe.done; Gt++, fe = H.next())
        fe = q(Bt, D, Gt, fe.value, $), fe !== null && (t && (sn = fe.alternate, sn !== null && Bt.delete(
          sn.key === null ? Gt : sn.key
        )), O = s(fe, O, Gt), oe === null ? At = fe : oe.sibling = fe, oe = fe);
      return t && Bt.forEach(function(Xb) {
        return e(D, Xb);
      }), $t && qi(D, Gt), At;
    }
    function Jt(D, O, H, $) {
      if (typeof H == "object" && H !== null && H.type === ut && H.key === null && H.props.ref === void 0 && (H = H.props.children), typeof H == "object" && H !== null) {
        switch (H.$$typeof) {
          case P:
            t: {
              for (var At = H.key; O !== null; ) {
                if (O.key === At) {
                  if (At = H.type, At === ut) {
                    if (O.tag === 7) {
                      n(
                        D,
                        O.sibling
                      ), $ = r(
                        O,
                        H.props.children
                      ), ra($, H), $.return = D, D = $;
                      break t;
                    }
                  } else if (O.elementType === At || typeof At == "object" && At !== null && At.$$typeof === w && nu(At) === O.type) {
                    n(
                      D,
                      O.sibling
                    ), $ = r(O, H.props), ra($, H), $.return = D, D = $;
                    break t;
                  }
                  n(D, O);
                  break;
                } else e(D, O);
                O = O.sibling;
              }
              H.type === ut ? ($ = ka(
                H.props.children,
                D.mode,
                $,
                H.key
              ), ra($, H), $.return = D, D = $) : ($ = Rs(
                H.type,
                H.key,
                H.props,
                null,
                D.mode,
                $
              ), ra($, H), $.return = D, D = $);
            }
            return m(D);
          case V:
            t: {
              for (At = H.key; O !== null; ) {
                if (O.key === At)
                  if (O.tag === 4 && O.stateNode.containerInfo === H.containerInfo && O.stateNode.implementation === H.implementation) {
                    n(
                      D,
                      O.sibling
                    ), $ = r(O, H.children || []), $.return = D, D = $;
                    break t;
                  } else {
                    n(D, O);
                    break;
                  }
                else e(D, O);
                O = O.sibling;
              }
              $ = Wf(H, D.mode, $), $.return = D, D = $;
            }
            return m(D);
          case w:
            return H = nu(H), Jt(
              D,
              O,
              H,
              $
            );
        }
        if (Rt(H))
          return _t(
            D,
            O,
            H,
            $
          );
        if (L(H)) {
          if (At = L(H), typeof At != "function") throw Error(a(150));
          return H = At.call(H), Dt(
            D,
            O,
            H,
            $
          );
        }
        if (typeof H.then == "function")
          return Jt(
            D,
            O,
            qs(H),
            $
          );
        if (H.$$typeof === et)
          return Jt(
            D,
            O,
            Bs(D, H),
            $
          );
        Xs(D, H);
      }
      return typeof H == "string" && H !== "" || typeof H == "number" || typeof H == "bigint" ? (H = "" + H, O !== null && O.tag === 6 ? (n(D, O.sibling), $ = r(O, H), $.return = D, D = $) : (n(D, O), $ = $f(H, D.mode, $), $.return = D, D = $), m(D)) : n(D, O);
    }
    return function(D, O, H, $) {
      try {
        eo = 0;
        var At = Jt(
          D,
          O,
          H,
          $
        );
        return Fu = null, At;
      } catch (Bt) {
        if (Bt === Ku || Bt === Ls) throw Bt;
        var oe = il(29, Bt, null, D.mode);
        return oe.lanes = $, oe.return = D, oe;
      }
    };
  }
  var iu = bg(!0), Tg = bg(!1), oa = !1;
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
    var l = t.updateQueue;
    if (l === null) return null;
    if (l = l.shared, (ge & 2) !== 0) {
      var r = l.pending;
      return r === null ? e.next = e : (e.next = r.next, r.next = e), l.pending = e, e = Os(t), ag(t, null, n), e;
    }
    return ws(t, l, e, n), Os(t);
  }
  function no(t, e, n) {
    if (e = e.updateQueue, e !== null && (e = e.shared, (n & 4194048) !== 0)) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, me(t, n);
    }
  }
  function ch(t, e) {
    var n = t.updateQueue, l = t.alternate;
    if (l !== null && (l = l.updateQueue, n === l)) {
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
        baseState: l.baseState,
        firstBaseUpdate: r,
        lastBaseUpdate: s,
        shared: l.shared,
        callbacks: l.callbacks
      }, t.updateQueue = n;
      return;
    }
    t = n.lastBaseUpdate, t === null ? n.firstBaseUpdate = e : t.next = e, n.lastBaseUpdate = e;
  }
  var fh = !1;
  function lo() {
    if (fh) {
      var t = Zu;
      if (t !== null) throw t;
    }
  }
  function io(t, e, n, l) {
    fh = !1;
    var r = t.updateQueue;
    oa = !1;
    var s = r.firstBaseUpdate, m = r.lastBaseUpdate, y = r.shared.pending;
    if (y !== null) {
      r.shared.pending = null;
      var x = y, U = x.next;
      x.next = null, m === null ? s = U : m.next = U, m = x;
      var G = t.alternate;
      G !== null && (G = G.updateQueue, y = G.lastBaseUpdate, y !== m && (y === null ? G.firstBaseUpdate = U : y.next = U, G.lastBaseUpdate = x));
    }
    if (s !== null) {
      var I = r.baseState;
      m = 0, G = U = x = null, y = s;
      do {
        var C = y.lane & -536870913, q = C !== y.lane;
        if (q ? (re & C) === C : (l & C) === C) {
          C !== 0 && C === tu && (fh = !0), G !== null && (G = G.next = {
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
                  I = _t.call(Jt, I, C);
                  break t;
                }
                I = _t;
                break t;
              case 3:
                _t.flags = _t.flags & -65537 | 128;
              case 0:
                if (_t = Dt.payload, C = typeof _t == "function" ? _t.call(Jt, I, C) : _t, C == null) break t;
                I = N({}, I, C);
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
          }, G === null ? (U = G = q, x = I) : G = G.next = q, m |= C;
        if (y = y.next, y === null) {
          if (y = r.shared.pending, y === null)
            break;
          q = y, y = q.next, q.next = null, r.lastBaseUpdate = q, r.shared.pending = null;
        }
      } while (!0);
      G === null && (x = I), r.baseState = x, r.firstBaseUpdate = U, r.lastBaseUpdate = G, s === null && (r.shared.lanes = 0), pa |= m, t.lanes = m, t.memoizedState = I;
    }
  }
  function Eg(t, e) {
    if (typeof t != "function")
      throw Error(a(191, t));
    t.call(e);
  }
  function xg(t, e) {
    var n = t.callbacks;
    if (n !== null)
      for (t.callbacks = null, t = 0; t < n.length; t++)
        Eg(n[t], e);
  }
  var fa = Yt(null), Vs = Yt(0);
  function Mg(t, e) {
    t = Ki, nt(Vs, t), nt(fa, e), Ki = t | e.baseLanes;
  }
  function hh() {
    nt(Vs, Ki), nt(fa, fa.current);
  }
  function dh() {
    Ki = Vs.current, B(fa), B(Vs);
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
  function bl(t) {
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
  var Gi = 0, Ft = null, Te = null, rn = null, js = !1, Ju = !1, au = !1, Qs = 0, uo = 0, ku = null, r2 = 0;
  function Pe() {
    throw Error(a(321));
  }
  function vh(t, e) {
    if (e === null) return !1;
    for (var n = 0; n < e.length && n < t.length; n++)
      if (!Sl(t[n], e[n])) return !1;
    return !0;
  }
  function ph(t, e, n, l, r, s) {
    return Gi = s, Ft = e, e.memoizedState = null, e.updateQueue = null, e.lanes = 0, ot.H = t === null || t.memoizedState === null ? sv : cv, au = !1, s = n(l, r), au = !1, Ju && (s = Og(
      e,
      n,
      l,
      r
    )), wg(t), s;
  }
  function wg(t) {
    ot.H = $s;
    var e = Te !== null && Te.next !== null;
    if (Gi = 0, rn = Te = Ft = null, js = !1, uo = 0, ku = null, e) throw Error(a(300));
    t === null || on || (t = t.dependencies, t !== null && Us(t) && (on = !0));
  }
  function Og(t, e, n, l) {
    Ft = t;
    var r = 0;
    do {
      if (Ju && (ku = null), uo = 0, Ju = !1, 25 <= r) throw Error(a(301));
      if (r += 1, rn = Te = null, t.updateQueue != null) {
        var s = t.updateQueue;
        s.lastEffect = null, s.events = null, s.stores = null, s.memoCache != null && (s.memoCache.index = 0);
      }
      ot.H = g2, s = e(n, l);
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
    Gi = 0, rn = Te = Ft = null, Ju = !1, uo = Qs = 0, ku = null;
  }
  function Kn() {
    var t = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return rn === null ? Ft.memoizedState = rn = t : rn = rn.next = t, rn;
  }
  function nn() {
    if (Te === null) {
      var t = Ft.alternate;
      t = t !== null ? t.memoizedState : null;
    } else t = Te.next;
    var e = rn === null ? Ft.memoizedState : rn.next;
    if (e !== null)
      rn = e, Te = t;
    else {
      if (t === null)
        throw Ft.alternate === null ? Error(a(467)) : Error(a(310));
      Te = t, t = {
        memoizedState: Te.memoizedState,
        baseState: Te.baseState,
        baseQueue: Te.baseQueue,
        queue: Te.queue,
        next: null
      }, rn === null ? Ft.memoizedState = rn = t : rn = rn.next = t;
    }
    return rn;
  }
  function Zs() {
    return { lastEffect: null, events: null, stores: null, memoCache: null };
  }
  function ro(t) {
    var e = uo;
    return uo += 1, ku === null && (ku = []), t = _g(ku, t, e), e = Ft, (rn === null ? e.memoizedState : rn.next) === null && (e = e.alternate, ot.H = e === null || e.memoizedState === null ? sv : cv), t;
  }
  function Ks(t) {
    if (t !== null && typeof t == "object") {
      if (typeof t.then == "function") return ro(t);
      if (t.$$typeof === A) return;
      if (t.$$typeof === et) return wn(t);
    }
    throw Error(a(438, String(t)));
  }
  function bh(t) {
    var e = null, n = Ft.updateQueue;
    if (n !== null && (e = n.memoCache), e == null) {
      var l = Ft.alternate;
      l !== null && (l = l.updateQueue, l !== null && (l = l.memoCache, l != null && (e = {
        data: l.data.map(function(r) {
          return r.slice();
        }),
        index: 0
      })));
    }
    if (e == null && (e = { data: [], index: 0 }), n === null && (n = Zs(), Ft.updateQueue = n), n.memoCache = e, n = e.data[e.index], n === void 0)
      for (n = e.data[e.index] = Array(t), l = 0; l < t; l++)
        n[l] = Nt;
    return e.index++, n;
  }
  function ji(t, e) {
    return typeof e == "function" ? e(t) : e;
  }
  function Fs(t) {
    var e = nn();
    return Th(e, Te, t);
  }
  function Th(t, e, n) {
    var l = t.queue;
    if (l === null) throw Error(a(311));
    l.lastRenderedReducer = n;
    var r = t.baseQueue, s = l.pending;
    if (s !== null) {
      if (r !== null) {
        var m = r.next;
        r.next = s.next, s.next = m;
      }
      e.baseQueue = r = s, l.pending = null;
    }
    if (s = t.baseState, r === null) t.memoizedState = s;
    else {
      e = r.next;
      var y = m = null, x = null, U = e, G = !1;
      do {
        var I = U.lane & -536870913;
        if (I !== U.lane ? (re & I) === I : (Gi & I) === I) {
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
            }), I === tu && (G = !0);
          else if ((Gi & C) === C) {
            U = U.next, C === tu && (G = !0);
            continue;
          } else
            I = {
              lane: 0,
              revertLane: U.revertLane,
              gesture: null,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            }, x === null ? (y = x = I, m = s) : x = x.next = I, Ft.lanes |= C, pa |= C;
          I = U.action, au && n(s, I), s = U.hasEagerState ? U.eagerState : n(s, I);
        } else
          C = {
            lane: I,
            revertLane: U.revertLane,
            gesture: U.gesture,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          }, x === null ? (y = x = C, m = s) : x = x.next = C, Ft.lanes |= I, pa |= I;
        U = U.next;
      } while (U !== null && U !== e);
      if (x === null ? m = s : x.next = y, !Sl(s, t.memoizedState) && (on = !0, G && (n = Zu, n !== null)))
        throw n;
      t.memoizedState = s, t.baseState = m, t.baseQueue = x, l.lastRenderedState = s;
    }
    return r === null && (l.lanes = 0), [t.memoizedState, l.dispatch];
  }
  function Eh(t) {
    var e = nn(), n = e.queue;
    if (n === null) throw Error(a(311));
    n.lastRenderedReducer = t;
    var l = n.dispatch, r = n.pending, s = e.memoizedState;
    if (r !== null) {
      n.pending = null;
      var m = r = r.next;
      do
        s = t(s, m.action), m = m.next;
      while (m !== r);
      Sl(s, e.memoizedState) || (on = !0), e.memoizedState = s, e.baseQueue === null && (e.baseState = s), n.lastRenderedState = s;
    }
    return [s, l];
  }
  function Rg(t, e, n) {
    var l = Ft, r = nn(), s = $t;
    if (s) {
      if (n === void 0) throw Error(a(407));
      n = n();
    } else n = e();
    var m = !Sl(
      (Te || r).memoizedState,
      n
    );
    if (m && (r.memoizedState = n, on = !0), r = r.queue, Ah(Dg.bind(null, l, r, t), [
      t
    ]), t = r.getSnapshot !== e || m || rn !== null && (rn.memoizedState.tag & 1) !== 0, Pu(
      t ? 9 : 8,
      { destroy: void 0 },
      Cg.bind(null, l, r, n, e),
      null
    ), t) {
      if (l.flags |= 2048, we === null) throw Error(a(349));
      s || (Gi & 127) !== 0 || zg(l, e, n);
    }
    return n;
  }
  function zg(t, e, n) {
    t.flags |= 16384, t = { getSnapshot: e, value: n }, e = Ft.updateQueue, e === null ? (e = Zs(), Ft.updateQueue = e, e.stores = [t]) : (n = e.stores, n === null ? e.stores = [t] : n.push(t));
  }
  function Cg(t, e, n, l) {
    e.value = n, e.getSnapshot = l, Ng(e) && Ug(t);
  }
  function Dg(t, e, n) {
    return n(function() {
      Ng(e) && Ug(t);
    });
  }
  function Ng(t) {
    var e = t.getSnapshot;
    t = t.value;
    try {
      var n = e();
      return !Sl(t, n);
    } catch {
      return !0;
    }
  }
  function Ug(t) {
    var e = Ja(t, 2);
    e !== null && ol(e, t, 2);
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
      lastRenderedReducer: ji,
      lastRenderedState: t
    }, e;
  }
  function Bg(t, e, n, l) {
    return t.baseState = n, Th(
      t,
      Te,
      typeof l == "function" ? l : ji
    );
  }
  function s2(t, e, n, l, r) {
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
      ot.T !== null ? n(!0) : s.isTransition = !1, l(s), n = e.pending, n === null ? (s.next = e.pending = s, Hg(e, s)) : (s.next = n.next, e.pending = n.next = s);
    }
  }
  function Hg(t, e) {
    var n = e.action, l = e.payload, r = t.state;
    if (e.isTransition) {
      var s = ot.T, m = {};
      m.types = s !== null ? s.types : null, ot.T = m;
      try {
        var y = n(r, l), x = ot.S;
        x !== null && x(m, y), Lg(t, e, y);
      } catch (U) {
        Mh(t, e, U);
      } finally {
        s !== null && m.types !== null && (s.types = m.types), ot.T = s;
      }
    } else
      try {
        s = n(r, l), Lg(t, e, s);
      } catch (U) {
        Mh(t, e, U);
      }
  }
  function Lg(t, e, n) {
    n !== null && typeof n == "object" && typeof n.then == "function" ? n.then(
      function(l) {
        Yg(t, e, l);
      },
      function(l) {
        return Mh(t, e, l);
      }
    ) : Yg(t, e, n);
  }
  function Yg(t, e, n) {
    e.status = "fulfilled", e.value = n, qg(e), t.state = n, e = t.pending, e !== null && (n = e.next, n === e ? t.pending = null : (n = n.next, e.next = n, Hg(t, n)));
  }
  function Mh(t, e, n) {
    var l = t.pending;
    if (t.pending = null, l !== null) {
      l = l.next;
      do
        e.status = "rejected", e.reason = n, qg(e), e = e.next;
      while (e !== l);
    }
    t.action = null;
  }
  function qg(t) {
    t = t.listeners;
    for (var e = 0; e < t.length; e++) (0, t[e])();
  }
  function Xg(t, e) {
    return e;
  }
  function Vg(t, e) {
    if ($t) {
      var n = we.formState;
      if (n !== null) {
        t: {
          var l = Ft;
          if ($t) {
            if (ze) {
              e: {
                for (var r = ze, s = kl; r.nodeType !== 8; ) {
                  if (!s) {
                    r = null;
                    break e;
                  }
                  if (r = $l(
                    r.nextSibling
                  ), r === null) {
                    r = null;
                    break e;
                  }
                }
                s = r.data, r = s === "F!" || s === "F" ? r : null;
              }
              if (r) {
                ze = $l(
                  r.nextSibling
                ), l = r.data === "F!";
                break t;
              }
            }
            aa(l);
          }
          l = !1;
        }
        l && (e = n[0]);
      }
    }
    return n = Kn(), n.memoizedState = n.baseState = e, l = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: Xg,
      lastRenderedState: e
    }, n.queue = l, n = uv.bind(
      null,
      Ft,
      l
    ), l.dispatch = n, l = xh(!1), s = Ch.bind(
      null,
      Ft,
      !1,
      l.queue
    ), l = Kn(), r = {
      state: e,
      dispatch: null,
      action: t,
      pending: null
    }, l.queue = r, n = s2.bind(
      null,
      Ft,
      r,
      s,
      n
    ), r.dispatch = n, l.memoizedState = t, [e, n, !1];
  }
  function Gg(t) {
    var e = nn();
    return jg(e, Te, t);
  }
  function jg(t, e, n) {
    if (e = Th(
      t,
      e,
      Xg
    )[0], t = Fs(ji)[0], typeof e == "object" && e !== null && typeof e.then == "function")
      try {
        var l = ro(e);
      } catch (m) {
        throw m === Ku ? Ls : m;
      }
    else l = e;
    e = nn();
    var r = e.queue, s = r.dispatch;
    return n !== e.memoizedState && (Ft.flags |= 2048, Pu(
      9,
      { destroy: void 0 },
      c2.bind(null, r, n),
      null
    )), [l, s, t];
  }
  function c2(t, e) {
    t.action = e;
  }
  function Qg(t) {
    var e = nn(), n = Te;
    if (n !== null)
      return jg(e, n, t);
    nn(), e = e.memoizedState, n = nn();
    var l = n.queue.dispatch;
    return n.memoizedState = t, [e, l, !1];
  }
  function Pu(t, e, n, l) {
    return t = { tag: t, create: n, deps: l, inst: e, next: null }, e = Ft.updateQueue, e === null && (e = Zs(), Ft.updateQueue = e), n = e.lastEffect, n === null ? e.lastEffect = t.next = t : (l = n.next, n.next = t, t.next = l, e.lastEffect = t), t;
  }
  function Zg() {
    return nn().memoizedState;
  }
  function Js(t, e, n, l) {
    var r = Kn();
    Ft.flags |= t, r.memoizedState = Pu(
      1 | e,
      { destroy: void 0 },
      n,
      l === void 0 ? null : l
    );
  }
  function ks(t, e, n, l) {
    var r = nn();
    l = l === void 0 ? null : l;
    var s = r.memoizedState.inst;
    Te !== null && l !== null && vh(l, Te.memoizedState.deps) ? r.memoizedState = Pu(e, s, n, l) : (Ft.flags |= t, r.memoizedState = Pu(
      1 | e,
      s,
      n,
      l
    ));
  }
  function Kg(t, e) {
    Js(8390656, 8, t, e);
  }
  function Ah(t, e) {
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
  function Fg(t) {
    var e = nn().memoizedState;
    return f2({ ref: e, nextImpl: t }), function() {
      if ((ge & 2) !== 0) throw Error(a(440));
      return e.impl.apply(void 0, arguments);
    };
  }
  function Jg(t, e) {
    return ks(4, 2, t, e);
  }
  function kg(t, e) {
    return ks(4, 4, t, e);
  }
  function Pg(t, e) {
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
  function $g(t, e, n) {
    n = n != null ? n.concat([t]) : null, ks(4, 4, Pg.bind(null, e, t), n);
  }
  function wh() {
  }
  function Wg(t, e) {
    var n = nn();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    return e !== null && vh(e, l[1]) ? l[0] : (n.memoizedState = [t, e], t);
  }
  function Ig(t, e) {
    var n = nn();
    e = e === void 0 ? null : e;
    var l = n.memoizedState;
    if (e !== null && vh(e, l[1]))
      return l[0];
    if (l = t(), au) {
      Tt(!0);
      try {
        t();
      } finally {
        Tt(!1);
      }
    }
    return n.memoizedState = [l, e], l;
  }
  function Oh(t, e, n) {
    return n === void 0 || (Gi & 1073741824) !== 0 && (re & 261930) === 0 ? t.memoizedState = e : (t.memoizedState = n, t = sp(), Ft.lanes |= t, pa |= t, n);
  }
  function tv(t, e, n, l) {
    return Sl(n, e) ? n : fa.current !== null ? (t = Oh(t, n, l), Sl(t, e) || (on = !0), t) : (Gi & 106) === 0 || (Gi & 1073741824) !== 0 && (re & 261930) === 0 ? (on = !0, t.memoizedState = n) : (t = sp(), Ft.lanes |= t, pa |= t, e);
  }
  function ev(t, e, n, l, r) {
    var s = gt.p;
    gt.p = s !== 0 && 8 > s ? s : 8;
    var m = ot.T, y = {};
    y.types = m !== null ? m.types : null, ot.T = y, Ch(t, !1, e, n);
    try {
      var x = r(), U = ot.S;
      if (U !== null && U(y, x), x !== null && typeof x == "object" && typeof x.then == "function") {
        var G = u2(
          x,
          l
        );
        oo(
          t,
          e,
          G,
          Ml(t)
        );
      } else
        oo(
          t,
          e,
          l,
          Ml(t)
        );
    } catch (I) {
      oo(
        t,
        e,
        { then: function() {
        }, status: "rejected", reason: I },
        Ml()
      );
    } finally {
      gt.p = s, m !== null && y.types !== null && (m.types = y.types), ot.T = m;
    }
  }
  function h2() {
  }
  function Rh(t, e, n, l) {
    if (t.tag !== 5) throw Error(a(476));
    var r = nv(t).queue;
    ev(
      t,
      r,
      e,
      zt,
      n === null ? h2 : function() {
        return lv(t), n(l);
      }
    );
  }
  function nv(t) {
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
        lastRenderedReducer: ji,
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
        lastRenderedReducer: ji,
        lastRenderedState: n
      },
      next: null
    }, t.memoizedState = e, t = t.alternate, t !== null && (t.memoizedState = e), e;
  }
  function lv(t) {
    var e = nv(t);
    e.next === null && (e = t.alternate.memoizedState), oo(
      t,
      e.next.queue,
      {},
      Ml()
    );
  }
  function zh() {
    return wn(gr);
  }
  function iv() {
    return nn().memoizedState;
  }
  function av() {
    return nn().memoizedState;
  }
  function d2(t) {
    for (var e = t.return; e !== null; ) {
      switch (e.tag) {
        case 24:
        case 3:
          var n = Ml();
          t = sa(n);
          var l = ca(e, t, n);
          l !== null && (ol(l, e, n), no(l, e, n)), e = { cache: ih() }, t.payload = e;
          return;
      }
      e = e.return;
    }
  }
  function m2(t, e, n) {
    var l = Ml();
    n = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ps(t) ? rv(e, n) : (n = kf(t, e, n, l), n !== null && (ol(n, t, l), ov(n, e, l)));
  }
  function uv(t, e, n) {
    var l = Ml();
    oo(t, e, n, l);
  }
  function oo(t, e, n, l) {
    var r = {
      lane: l,
      revertLane: 0,
      gesture: null,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Ps(t)) rv(e, r);
    else {
      var s = t.alternate;
      if (t.lanes === 0 && (s === null || s.lanes === 0) && (s = e.lastRenderedReducer, s !== null))
        try {
          var m = e.lastRenderedState, y = s(m, n);
          if (r.hasEagerState = !0, r.eagerState = y, Sl(y, m))
            return ws(t, e, r, 0), we === null && As(), !1;
        } catch {
        }
      if (n = kf(t, e, r, l), n !== null)
        return ol(n, t, l), ov(n, e, l), !0;
    }
    return !1;
  }
  function Ch(t, e, n, l) {
    if (l = {
      lane: 2,
      revertLane: bd(),
      gesture: null,
      action: l,
      hasEagerState: !1,
      eagerState: null,
      next: null
    }, Ps(t)) {
      if (e) throw Error(a(479));
    } else
      e = kf(
        t,
        n,
        l,
        2
      ), e !== null && ol(e, t, 2);
  }
  function Ps(t) {
    var e = t.alternate;
    return t === Ft || e !== null && e === Ft;
  }
  function rv(t, e) {
    Ju = js = !0;
    var n = t.pending;
    n === null ? e.next = e : (e.next = n.next, n.next = e), t.pending = e;
  }
  function ov(t, e, n) {
    if ((n & 4194048) !== 0) {
      var l = e.lanes;
      l &= t.pendingLanes, n |= l, e.lanes = n, me(t, n);
    }
  }
  var $s = {
    readContext: wn,
    use: Ks,
    useCallback: Pe,
    useContext: Pe,
    useEffect: Pe,
    useImperativeHandle: Pe,
    useLayoutEffect: Pe,
    useInsertionEffect: Pe,
    useMemo: Pe,
    useReducer: Pe,
    useRef: Pe,
    useState: Pe,
    useDebugValue: Pe,
    useDeferredValue: Pe,
    useTransition: Pe,
    useSyncExternalStore: Pe,
    useId: Pe,
    useHostTransitionStatus: Pe,
    useFormState: Pe,
    useActionState: Pe,
    useOptimistic: Pe,
    useMemoCache: Pe,
    useCacheRefresh: Pe,
    useEffectEvent: Pe
  }, sv = {
    readContext: wn,
    use: Ks,
    useCallback: function(t, e) {
      return Kn().memoizedState = [
        t,
        e === void 0 ? null : e
      ], t;
    },
    useContext: wn,
    useEffect: Kg,
    useImperativeHandle: function(t, e, n) {
      n = n != null ? n.concat([t]) : null, Js(
        4194308,
        4,
        Pg.bind(null, e, t),
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
      var l = t();
      if (au) {
        Tt(!0);
        try {
          t();
        } finally {
          Tt(!1);
        }
      }
      return n.memoizedState = [l, e], l;
    },
    useReducer: function(t, e, n) {
      var l = Kn();
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
      return l.memoizedState = l.baseState = r, t = {
        pending: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: t,
        lastRenderedState: r
      }, l.queue = t, t = t.dispatch = m2.bind(
        null,
        Ft,
        t
      ), [l.memoizedState, t];
    },
    useRef: function(t) {
      var e = Kn();
      return t = { current: t }, e.memoizedState = t;
    },
    useState: function(t) {
      t = xh(t);
      var e = t.queue, n = uv.bind(null, Ft, e);
      return e.dispatch = n, [t.memoizedState, n];
    },
    useDebugValue: wh,
    useDeferredValue: function(t, e) {
      var n = Kn();
      return Oh(n, t, e);
    },
    useTransition: function() {
      var t = xh(!1);
      return t = ev.bind(
        null,
        Ft,
        t.queue,
        !0,
        !1
      ), Kn().memoizedState = t, [!1, t];
    },
    useSyncExternalStore: function(t, e, n) {
      var l = Ft, r = Kn();
      if ($t) {
        if (n === void 0)
          throw Error(a(407));
        n = n();
      } else {
        if (n = e(), we === null)
          throw Error(a(349));
        (re & 127) !== 0 || zg(l, e, n);
      }
      r.memoizedState = n;
      var s = { value: n, getSnapshot: e };
      return r.queue = s, Kg(Dg.bind(null, l, s, t), [
        t
      ]), l.flags |= 2048, Pu(
        9,
        { destroy: void 0 },
        Cg.bind(
          null,
          l,
          s,
          n,
          e
        ),
        null
      ), n;
    },
    useId: function() {
      var t = Kn(), e = we.identifierPrefix;
      if ($t) {
        var n = _i, l = pi;
        n = (l & ~(1 << 32 - lt(l) - 1)).toString(32) + n, e = "_" + e + "R_" + n, n = Qs++, 0 < n && (e += "H" + n.toString(32)), e += "_";
      } else
        n = r2++, e = "_" + e + "r_" + n.toString(32) + "_";
      return t.memoizedState = e;
    },
    useHostTransitionStatus: zh,
    useFormState: Vg,
    useActionState: Vg,
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
  }, cv = {
    readContext: wn,
    use: Ks,
    useCallback: Wg,
    useContext: wn,
    useEffect: Ah,
    useImperativeHandle: $g,
    useInsertionEffect: Jg,
    useLayoutEffect: kg,
    useMemo: Ig,
    useReducer: Fs,
    useRef: Zg,
    useState: function() {
      return Fs(ji);
    },
    useDebugValue: wh,
    useDeferredValue: function(t, e) {
      var n = nn();
      return tv(
        n,
        Te.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Fs(ji)[0], e = nn().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: Rg,
    useId: iv,
    useHostTransitionStatus: zh,
    useFormState: Gg,
    useActionState: Gg,
    useOptimistic: function(t, e) {
      var n = nn();
      return Bg(n, Te, t, e);
    },
    useMemoCache: bh,
    useCacheRefresh: av,
    useEffectEvent: Fg
  }, g2 = {
    readContext: wn,
    use: Ks,
    useCallback: Wg,
    useContext: wn,
    useEffect: Ah,
    useImperativeHandle: $g,
    useInsertionEffect: Jg,
    useLayoutEffect: kg,
    useMemo: Ig,
    useReducer: Eh,
    useRef: Zg,
    useState: function() {
      return Eh(ji);
    },
    useDebugValue: wh,
    useDeferredValue: function(t, e) {
      var n = nn();
      return Te === null ? Oh(n, t, e) : tv(
        n,
        Te.memoizedState,
        t,
        e
      );
    },
    useTransition: function() {
      var t = Eh(ji)[0], e = nn().memoizedState;
      return [
        typeof t == "boolean" ? t : ro(t),
        e
      ];
    },
    useSyncExternalStore: Rg,
    useId: iv,
    useHostTransitionStatus: zh,
    useFormState: Qg,
    useActionState: Qg,
    useOptimistic: function(t, e) {
      var n = nn();
      return Te !== null ? Bg(n, Te, t, e) : (n.baseState = t, [t, n.queue.dispatch]);
    },
    useMemoCache: bh,
    useCacheRefresh: av,
    useEffectEvent: Fg
  };
  function Dh(t, e, n, l) {
    e = t.memoizedState, n = n(l, e), n = n == null ? e : N({}, e, n), t.memoizedState = n, t.lanes === 0 && (t.updateQueue.baseState = n);
  }
  var Nh = {
    enqueueSetState: function(t, e, n) {
      t = t._reactInternals;
      var l = Ml(), r = sa(l);
      r.payload = e, n != null && (r.callback = n), e = ca(t, r, l), e !== null && (ol(e, t, l), no(e, t, l));
    },
    enqueueReplaceState: function(t, e, n) {
      t = t._reactInternals;
      var l = Ml(), r = sa(l);
      r.tag = 1, r.payload = e, n != null && (r.callback = n), e = ca(t, r, l), e !== null && (ol(e, t, l), no(e, t, l));
    },
    enqueueForceUpdate: function(t, e) {
      t = t._reactInternals;
      var n = Ml(), l = sa(n);
      l.tag = 2, e != null && (l.callback = e), e = ca(t, l, n), e !== null && (ol(e, t, n), no(e, t, n));
    }
  };
  function fv(t, e, n, l, r, s, m) {
    return t = t.stateNode, typeof t.shouldComponentUpdate == "function" ? t.shouldComponentUpdate(l, s, m) : e.prototype && e.prototype.isPureReactComponent ? !Jr(n, l) || !Jr(r, s) : !0;
  }
  function hv(t, e, n, l) {
    t = e.state, typeof e.componentWillReceiveProps == "function" && e.componentWillReceiveProps(n, l), typeof e.UNSAFE_componentWillReceiveProps == "function" && e.UNSAFE_componentWillReceiveProps(n, l), e.state !== t && Nh.enqueueReplaceState(e, e.state, null);
  }
  function uu(t, e) {
    var n = e;
    if ("ref" in e) {
      n = {};
      for (var l in e)
        l !== "ref" && (n[l] = e[l]);
    }
    if (t = t.defaultProps) {
      n === e && (n = N({}, n));
      for (var r in t)
        n[r] === void 0 && (n[r] = t[r]);
    }
    return n;
  }
  function dv(t) {
    Ms(t);
  }
  function mv(t) {
    console.error(t);
  }
  function gv(t) {
    Ms(t);
  }
  function Ws(t, e) {
    try {
      var n = t.onUncaughtError;
      n(e.value, { componentStack: e.stack });
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  function vv(t, e, n) {
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
  function Uh(t, e, n) {
    return n = sa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
      Ws(t, e);
    }, n;
  }
  function pv(t) {
    return t = sa(t), t.tag = 3, t;
  }
  function _v(t, e, n, l) {
    var r = n.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var s = l.value;
      t.payload = function() {
        return r(s);
      }, t.callback = function() {
        vv(e, n, l);
      };
    }
    var m = n.stateNode;
    m !== null && typeof m.componentDidCatch == "function" && (t.callback = function() {
      vv(e, n, l), typeof r != "function" && (_a === null ? _a = /* @__PURE__ */ new Set([this]) : _a.add(this));
      var y = l.stack;
      this.componentDidCatch(l.value, {
        componentStack: y !== null ? y : ""
      });
    });
  }
  function v2(t, e, n, l, r) {
    if (n.flags |= 32768, l !== null && typeof l == "object" && typeof l.then == "function") {
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
            return Bn === null ? yc() : n.alternate === null && $e === 0 && ($e = 3), n.flags &= -257, n.flags |= 65536, n.lanes = r, l === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? n.updateQueue = /* @__PURE__ */ new Set([l]) : e.add(l), _d(t, l, r)), !1;
          case 22:
            return n.flags |= 65536, l === Ys ? n.flags |= 16384 : (e = n.updateQueue, e === null ? (e = {
              transitions: null,
              markerInstances: null,
              retryQueue: /* @__PURE__ */ new Set([l])
            }, n.updateQueue = e) : (n = e.retryQueue, n === null ? e.retryQueue = /* @__PURE__ */ new Set([l]) : n.add(l)), _d(t, l, r)), !1;
        }
        throw Error(a(435, n.tag));
      }
      return _d(t, l, r), yc(), !1;
    }
    if ($t)
      return e = On.current, e !== null ? ((e.flags & 65536) === 0 && (e.flags |= 256), e.flags |= 65536, e.lanes = r, l !== th && (t = Error(a(422), { cause: l }), $r(Kl(t, n)))) : (l !== th && (e = Error(a(423), {
        cause: l
      }), $r(
        Kl(e, n)
      )), t = t.current.alternate, t.flags |= 65536, r &= -r, t.lanes |= r, l = Kl(l, n), r = Uh(
        t.stateNode,
        l,
        r
      ), ch(t, r), $e !== 4 && ($e = 2)), !1;
    var s = Error(a(520), { cause: l });
    if (s = Kl(s, n), po === null ? po = [s] : po.push(s), $e !== 4 && ($e = 2), e === null) return !0;
    l = Kl(l, n), n = e;
    do {
      switch (n.tag) {
        case 3:
          return n.flags |= 65536, t = r & -r, n.lanes |= t, t = Uh(n.stateNode, l, t), ch(n, t), !1;
        case 1:
          if (e = n.type, s = n.stateNode, (n.flags & 128) === 0 && (typeof e.getDerivedStateFromError == "function" || s !== null && typeof s.componentDidCatch == "function" && (_a === null || !_a.has(s))))
            return n.flags |= 65536, r &= -r, n.lanes |= r, r = pv(r), _v(
              r,
              t,
              n,
              l
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
  var Bh = Error(a(461)), on = !1;
  function mn(t, e, n, l) {
    e.child = t === null ? Tg(e, null, n, l) : iu(
      e,
      t.child,
      n,
      l
    );
  }
  function yv(t, e, n, l, r) {
    n = n.render;
    var s = e.ref;
    if ("ref" in l) {
      var m = {};
      for (var y in l)
        y !== "ref" && (m[y] = l[y]);
    } else m = l;
    return Ia(e), l = ph(
      t,
      e,
      n,
      m,
      s,
      r
    ), y = _h(), t !== null && !on ? (yh(t, e, r), Qi(t, e, r)) : ($t && y && Cs(e), e.flags |= 1, mn(t, e, l, r), e.child);
  }
  function Sv(t, e, n, l, r) {
    if (t === null) {
      var s = n.type;
      return typeof s == "function" && !Pf(s) && s.defaultProps === void 0 && n.compare === null ? (e.tag = 15, e.type = s, bv(
        t,
        e,
        s,
        l,
        r
      )) : (t = Rs(
        n.type,
        null,
        l,
        e,
        e.mode,
        r
      ), t.ref = e.ref, t.return = e, e.child = t);
    }
    if (s = t.child, !jh(t, r)) {
      var m = s.memoizedProps;
      if (n = n.compare, n = n !== null ? n : Jr, n(m, l) && t.ref === e.ref)
        return Qi(t, e, r);
    }
    return e.flags |= 1, t = Yi(s, l), t.ref = e.ref, t.return = e, e.child = t;
  }
  function bv(t, e, n, l, r) {
    if (t !== null) {
      var s = t.memoizedProps;
      if (Jr(s, l) && t.ref === e.ref)
        if (on = !1, e.pendingProps = l = s, jh(t, r))
          (t.flags & 131072) !== 0 && (on = !0);
        else
          return e.lanes = t.lanes, Qi(t, e, r);
    }
    return Hh(
      t,
      e,
      n,
      l,
      r
    );
  }
  function Tv(t, e, n, l) {
    var r = l.children, s = t !== null ? t.memoizedState : null;
    if (t === null && e.stateNode === null && (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), l.mode === "hidden") {
      if ((e.flags & 128) !== 0) {
        if (s = s !== null ? s.baseLanes | n : n, t !== null) {
          for (l = e.child = t.child, r = 0; l !== null; )
            r = r | l.lanes | l.childLanes, l = l.sibling;
          l = r & ~s;
        } else l = 0, e.child = null;
        return Ev(
          t,
          e,
          s,
          n,
          l
        );
      }
      if ((n & 536870912) !== 0)
        e.memoizedState = { baseLanes: 0, cachePool: null }, t !== null && Hs(
          e,
          s !== null ? s.cachePool : null
        ), s !== null ? Mg(e, s) : hh(), Ag(e);
      else
        return l = e.lanes = 536870912, Ev(
          t,
          e,
          s !== null ? s.baseLanes | n : n,
          n,
          l
        );
    } else
      s !== null ? (Hs(e, s.cachePool), Mg(e, s), da(), e.memoizedState = null) : (t !== null && Hs(e, null), hh(), da());
    return mn(t, e, r, n), e.child;
  }
  function so(t, e) {
    return t !== null && t.tag === 22 || e.stateNode !== null || (e.stateNode = {
      _visibility: 1,
      _pendingMarkers: null,
      _retryCache: null,
      _transitions: null
    }), e.sibling;
  }
  function Ev(t, e, n, l, r) {
    var s = uh();
    return s = s === null ? null : { parent: un._currentValue, pool: s }, e.memoizedState = {
      baseLanes: n,
      cachePool: s
    }, t !== null && Hs(e, null), hh(), Ag(e), t !== null && Wa(t, e, l, !0), e.childLanes = r, null;
  }
  function Is(t, e) {
    return e = tc(
      { mode: e.mode, children: e.children },
      t.mode
    ), e.ref = t.ref, t.child = e, e.return = t, e;
  }
  function xv(t, e, n) {
    return iu(e, t.child, null, n), t = Is(e, e.pendingProps), t.flags |= 2, bl(e), e.memoizedState = null, t;
  }
  function p2(t, e, n) {
    var l = e.pendingProps, r = (e.flags & 128) !== 0;
    if (e.flags &= -129, t === null) {
      if ($t) {
        if (l.mode === "hidden")
          return t = Is(e, l), e.lanes = 536870912, t.memoizedState = { baseLanes: 0, cachePool: null }, so(null, t);
        if (mh(e), (t = ze) ? (t = Pp(
          t,
          kl
        ), t = t !== null && t.data === "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: la !== null ? { id: pi, overflow: _i } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rg(t), n.return = e, e.child = n, yn = e, ze = null)) : t = null, t === null) throw aa(e);
        return e.lanes = 536870912, null;
      }
      return Is(e, l);
    }
    var s = t.memoizedState;
    if (s !== null) {
      var m = s.dehydrated;
      if (mh(e), r)
        if (e.flags & 256)
          e.flags &= -257, e = xv(
            t,
            e,
            n
          );
        else if (e.memoizedState !== null)
          e.child = t.child, e.flags |= 128, e = null;
        else throw Error(a(558));
      else if (on || Wa(t, e, n, !1), r = (n & t.childLanes) !== 0, on || r) {
        if (fa.current === null) {
          if (l = we, l !== null && (m = pl(l, n), m !== 0 && m !== s.retryLane))
            throw s.retryLane = m, Ja(t, m), ol(l, t, m), Bh;
          yc();
        }
        e = xv(
          t,
          e,
          n
        );
      } else
        t = s.treeContext, ze = $l(m.nextSibling), yn = e, $t = !0, ia = null, kl = !1, t !== null && cg(e, t), e = Is(e, l), e.flags |= 134221824;
      return e;
    }
    return t = Yi(t.child, {
      mode: l.mode,
      children: l.children
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
  function Hh(t, e, n, l, r) {
    return Ia(e), n = ph(
      t,
      e,
      n,
      l,
      void 0,
      r
    ), l = _h(), t !== null && !on ? (yh(t, e, r), Qi(t, e, r)) : ($t && l && Cs(e), e.flags |= 1, mn(t, e, n, r), e.child);
  }
  function Mv(t, e, n, l, r, s) {
    return Ia(e), e.updateQueue = null, n = Og(
      e,
      l,
      n,
      r
    ), wg(t), l = _h(), t !== null && !on ? (yh(t, e, s), Qi(t, e, s)) : ($t && l && Cs(e), e.flags |= 1, mn(t, e, n, s), e.child);
  }
  function Av(t, e, n, l, r) {
    if (Ia(e), e.stateNode === null) {
      var s = Vu, m = n.contextType;
      typeof m == "object" && m !== null && (s = wn(m)), s = new n(l, s), e.memoizedState = s.state !== null && s.state !== void 0 ? s.state : null, s.updater = Nh, e.stateNode = s, s._reactInternals = e, s = e.stateNode, s.props = l, s.state = e.memoizedState, s.refs = {}, oh(e), m = n.contextType, s.context = typeof m == "object" && m !== null ? wn(m) : Vu, s.state = e.memoizedState, m = n.getDerivedStateFromProps, typeof m == "function" && (Dh(
        e,
        n,
        m,
        l
      ), s.state = e.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof s.getSnapshotBeforeUpdate == "function" || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (m = s.state, typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount(), m !== s.state && Nh.enqueueReplaceState(s, s.state, null), io(e, l, s, r), lo(), s.state = e.memoizedState), typeof s.componentDidMount == "function" && (e.flags |= 4194308), l = !0;
    } else if (t === null) {
      s = e.stateNode;
      var y = e.memoizedProps, x = uu(n, y);
      s.props = x;
      var U = s.context, G = n.contextType;
      m = Vu, typeof G == "object" && G !== null && (m = wn(G));
      var I = n.getDerivedStateFromProps;
      G = typeof I == "function" || typeof s.getSnapshotBeforeUpdate == "function", y = e.pendingProps !== y, G || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (y || U !== m) && hv(
        e,
        s,
        l,
        m
      ), oa = !1;
      var C = e.memoizedState;
      s.state = C, io(e, l, s, r), lo(), U = e.memoizedState, y || C !== U || oa ? (typeof I == "function" && (Dh(
        e,
        n,
        I,
        l
      ), U = e.memoizedState), (x = oa || fv(
        e,
        n,
        x,
        l,
        C,
        U,
        m
      )) ? (G || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (e.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), e.memoizedProps = l, e.memoizedState = U), s.props = l, s.state = U, s.context = m, l = x) : (typeof s.componentDidMount == "function" && (e.flags |= 4194308), l = !1);
    } else {
      s = e.stateNode, sh(t, e), m = e.memoizedProps, G = uu(n, m), s.props = G, I = e.pendingProps, C = s.context, U = n.contextType, x = Vu, typeof U == "object" && U !== null && (x = wn(U)), y = n.getDerivedStateFromProps, (U = typeof y == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (m !== I || C !== x) && hv(
        e,
        s,
        l,
        x
      ), oa = !1, C = e.memoizedState, s.state = C, io(e, l, s, r), lo();
      var q = e.memoizedState;
      m !== I || C !== q || oa || t !== null && t.dependencies !== null && Us(t.dependencies) ? (typeof y == "function" && (Dh(
        e,
        n,
        y,
        l
      ), q = e.memoizedState), (G = oa || fv(
        e,
        n,
        G,
        l,
        C,
        q,
        x
      ) || t !== null && t.dependencies !== null && Us(t.dependencies)) ? (U || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(l, q, x), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(
        l,
        q,
        x
      )), typeof s.componentDidUpdate == "function" && (e.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (e.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), e.memoizedProps = l, e.memoizedState = q), s.props = l, s.state = q, s.context = x, l = G) : (typeof s.componentDidUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || m === t.memoizedProps && C === t.memoizedState || (e.flags |= 1024), l = !1);
    }
    return s = l, $u(t, e), l = (e.flags & 128) !== 0, s || l ? (s = e.stateNode, n = l && typeof n.getDerivedStateFromError != "function" ? null : s.render(), e.flags |= 1, t !== null && l ? (e.child = iu(
      e,
      t.child,
      null,
      r
    ), e.child = iu(
      e,
      null,
      n,
      r
    )) : mn(t, e, n, r), e.memoizedState = s.state, t = e.child) : t = Qi(
      t,
      e,
      r
    ), t;
  }
  function wv(t, e, n, l) {
    return Pa(), e.flags |= 256, mn(t, e, n, l), e.child;
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
    return t = t !== null ? t.childLanes & ~n : 0, e && (t |= xl), t;
  }
  function Ov(t, e, n) {
    var l = e.pendingProps, r = !1, s = (e.flags & 128) !== 0, m;
    if ((m = s) || (m = t !== null && t.memoizedState === null ? !1 : (Rn.current & 2) !== 0), m && (r = !0, e.flags &= -129), m = (e.flags & 32) !== 0, e.flags &= -33, t === null) {
      if ($t) {
        if (r ? ha(e) : da(), (t = ze) ? (t = Pp(
          t,
          kl
        ), t = t !== null && t.data !== "&" ? t : null, t !== null && (e.memoizedState = {
          dehydrated: t,
          treeContext: la !== null ? { id: pi, overflow: _i } : null,
          retryLane: 536870912,
          hydrationErrors: null
        }, n = rg(t), n.return = e, e.child = n, yn = e, ze = null)) : t = null, t === null) throw aa(e);
        return Yd(t) ? e.lanes = 32 : e.lanes = 536870912, null;
      }
      return s = l.children, l = l.fallback, r ? (da(), r = e.mode, s = tc(
        { mode: "hidden", children: s },
        r
      ), l = ka(
        l,
        r,
        n,
        null
      ), s.return = e, l.return = e, s.sibling = l, e.child = s, l = e.child, l.memoizedState = Yh(n), l.childLanes = qh(
        t,
        m,
        n
      ), e.memoizedState = Lh, so(null, l)) : (ha(e), Xh(e, s));
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
          l,
          x,
          y,
          n
        );
    }
    return r ? (da(), r = l.fallback, s = e.mode, y = t.child, x = y.sibling, l = Yi(y, {
      mode: "hidden",
      children: l.children
    }), l.subtreeFlags = y.subtreeFlags & 1206910976, x !== null ? r = Yi(x, r) : (r = ka(
      r,
      s,
      n,
      null
    ), r.flags |= 2), r.return = e, l.return = e, l.sibling = r, e.child = l, so(null, l), l = e.child, r = t.child.memoizedState, r === null ? r = Yh(n) : (s = r.cachePool, s !== null ? (y = un._currentValue, s = s.parent !== y ? { parent: y, pool: y } : s) : s = vg(), r = {
      baseLanes: r.baseLanes | n,
      cachePool: s
    }), l.memoizedState = r, l.childLanes = qh(
      t,
      m,
      n
    ), e.memoizedState = Lh, so(t.child, l)) : (ha(e), n = t.child, t = n.sibling, n = Yi(n, {
      mode: "visible",
      children: l.children
    }), n.return = e, n.sibling = null, t !== null && (m = e.deletions, m === null ? (e.deletions = [t], e.flags |= 16) : m.push(t)), e.child = n, e.memoizedState = null, n);
  }
  function Xh(t, e) {
    return e = tc(
      { mode: "visible", children: e },
      t.mode
    ), e.return = t, t.child = e;
  }
  function tc(t, e) {
    return t = il(22, t, null, e), t.lanes = 0, t;
  }
  function ec(t, e, n) {
    return iu(e, t.child, null, n), t = Xh(
      e,
      e.pendingProps.children
    ), t.flags |= 2, e.memoizedState = null, t;
  }
  function _2(t, e, n, l, r, s, m, y) {
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
      ), s.flags |= 2, r.return = e, s.return = e, r.sibling = s, e.child = r, iu(e, t.child, null, y), r = e.child, r.memoizedState = Yh(y), r.childLanes = qh(
        t,
        l,
        y
      ), e.memoizedState = Lh, so(null, r));
    if (ha(e), Yd(s)) {
      if (l = s.nextSibling && s.nextSibling.dataset, l) var x = l.dgst;
      return l = x, l !== "" && (r = Error(a(419)), r.stack = "", r.digest = l, $r({ value: r, source: null, stack: null })), ec(
        t,
        e,
        y
      );
    }
    if (on || Wa(t, e, y, !1), l = (y & t.childLanes) !== 0, on || l) {
      if (fa.current !== null)
        return ec(
          t,
          e,
          y
        );
      if (l = we, l !== null && (r = pl(
        l,
        y
      ), r !== 0 && r !== m.retryLane))
        throw m.retryLane = r, Ja(t, r), ol(l, t, r), Bh;
      return Ld(s) || yc(), ec(
        t,
        e,
        y
      );
    }
    return Ld(s) ? (e.flags |= 192, e.child = t.child, null) : (t = m.treeContext, ze = $l(s.nextSibling), yn = e, $t = !0, ia = null, kl = !1, t !== null && cg(e, t), e = Xh(
      e,
      r.children
    ), e.flags |= 134221824, e);
  }
  function Rv(t, e, n) {
    t.lanes |= e;
    var l = t.alternate;
    l !== null && (l.lanes |= e), Ns(t.return, e, n);
  }
  function zv(t) {
    for (var e = null; t !== null; ) {
      var n = t.alternate;
      n !== null && Gs(n) === null && (e = t), t = t.sibling;
    }
    return e;
  }
  function nc(t, e, n, l, r, s) {
    var m = t.memoizedState;
    m === null ? t.memoizedState = {
      isBackwards: e,
      rendering: null,
      renderingStartTime: 0,
      last: l,
      tail: n,
      tailMode: r,
      treeForkCount: s
    } : (m.isBackwards = e, m.rendering = null, m.renderingStartTime = 0, m.last = l, m.tail = n, m.tailMode = r, m.treeForkCount = s);
  }
  function Vh(t) {
    var e = t.child;
    for (t.child = null; e !== null; ) {
      var n = e.sibling;
      e.sibling = t.child, t.child = e, e = n;
    }
  }
  function Gh(t, e, n) {
    var l = e.pendingProps, r = l.revealOrder, s = l.tail;
    l = l.children;
    var m = Rn.current;
    if (e.flags & 128)
      return ao(e, m), null;
    var y = (m & 2) !== 0;
    if (y ? (m = m & 1 | 2, e.flags |= 128) : m &= 1, ao(e, m), r === "backwards" && t !== null ? (Vh(t), mn(t, e, l, n), Vh(t)) : mn(t, e, l, n), l = $t ? Pr : 0, !y && t !== null && (t.flags & 128) !== 0)
      t: for (t = e.child; t !== null; ) {
        if (t.tag === 13)
          t.memoizedState !== null && Rv(t, n, e);
        else if (t.tag === 19)
          Rv(t, n, e);
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
        n = zv(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null, Vh(e)), nc(
          e,
          !0,
          r,
          null,
          s,
          l
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
          l
        );
        break;
      case "together":
        nc(
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
        n = zv(e.child), n === null ? (r = e.child, e.child = null) : (r = n.sibling, n.sibling = null), nc(
          e,
          !1,
          r,
          n,
          s,
          l
        );
    }
    return e.child;
  }
  function Cv(t, e, n) {
    var l = e.pendingProps;
    return ua(e, e.type, l.value), mn(t, e, l.children, n), e.child;
  }
  function Qi(t, e, n) {
    if (t !== null && (e.dependencies = t.dependencies), pa |= e.lanes, (n & e.childLanes) === 0)
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
      for (t = e.child, n = Yi(t, t.pendingProps), e.child = n, n.return = e; t.sibling !== null; )
        t = t.sibling, n = n.sibling = Yi(t, t.pendingProps), n.return = e;
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
        kt(e, e.stateNode.containerInfo), ua(e, un, t.memoizedState.cache), Pa();
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
        var l = e.memoizedState;
        if (l !== null) {
          if (l.dehydrated !== null)
            return ha(e), e.flags |= 128, null;
          l = Wa(
            t,
            e,
            n,
            !1
          );
          var r = e.child.childLanes;
          return l || (n & r) !== 0 ? Ov(t, e, n) : (ha(e), t = Qi(
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
        if (r = (t.flags & 128) !== 0, l = (n & e.childLanes) !== 0, l || (Wa(
          t,
          e,
          n,
          !1
        ), l = (n & e.childLanes) !== 0), r) {
          if (l)
            return Gh(
              t,
              e,
              n
            );
          e.flags |= 128;
        }
        if (r = e.memoizedState, r !== null && (r.rendering = null, r.tail = null, r.lastEffect = null), ao(e, Rn.current), l) break;
        return null;
      case 22:
        return e.lanes = 0, Tv(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        ua(e, un, t.memoizedState.cache);
    }
    return Qi(t, e, n);
  }
  function Dv(t, e, n) {
    if (t !== null)
      if (t.memoizedProps !== e.pendingProps)
        on = !0;
      else {
        if (!jh(t, n) && (e.flags & 128) === 0)
          return on = !1, y2(
            t,
            e,
            n
          );
        on = (t.flags & 131072) !== 0;
      }
    else
      on = !1, $t && (e.flags & 1048576) !== 0 && sg(e, Pr, e.index);
    switch (e.lanes = 0, e.tag) {
      case 16:
        t: {
          var l = e.pendingProps;
          if (t = nu(e.elementType), e.type = t, typeof t == "function")
            Pf(t) ? (l = uu(t, l), e.tag = 1, e = Av(
              null,
              e,
              t,
              l,
              n
            )) : (e.tag = 0, e = Hh(
              null,
              e,
              t,
              l,
              n
            ));
          else {
            if (t != null) {
              var r = t.$$typeof;
              if (r === F) {
                e.tag = 11, e = yv(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (r === st) {
                e.tag = 14, e = Sv(
                  null,
                  e,
                  t,
                  l,
                  n
                );
                break t;
              } else if (r === et) {
                e.tag = 10, e.type = t, e = Cv(
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
        return l = e.type, r = uu(
          l,
          e.pendingProps
        ), Av(
          t,
          e,
          l,
          r,
          n
        );
      case 3:
        t: {
          if (kt(
            e,
            e.stateNode.containerInfo
          ), t === null) throw Error(a(387));
          l = e.pendingProps;
          var s = e.memoizedState;
          r = s.element, sh(t, e), io(e, l, null, n);
          var m = e.memoizedState;
          if (l = m.cache, ua(e, un, l), l !== s.cache && lh(
            e,
            [un],
            n,
            !0
          ), lo(), l = m.element, s.isDehydrated)
            if (s = {
              element: l,
              isDehydrated: !1,
              cache: m.cache
            }, e.updateQueue.baseState = s, e.memoizedState = s, e.flags & 256) {
              e = wv(
                t,
                e,
                l,
                n
              );
              break t;
            } else if (l !== r) {
              r = Kl(
                Error(a(424)),
                e
              ), $r(r), e = wv(
                t,
                e,
                l,
                n
              );
              break t;
            } else
              for (t = e.stateNode.containerInfo, t.nodeType === 9 ? t = t.body : t = t.nodeName === "HTML" ? t.ownerDocument.body : t, ze = $l(t.firstChild), yn = e, $t = !0, ia = null, kl = !0, n = Tg(
                e,
                null,
                l,
                n
              ), e.child = n; n; )
                n.flags = n.flags & -3 | 134221824, n = n.sibling;
          else {
            if (Pa(), l === r) {
              e = Qi(
                t,
                e,
                n
              );
              break t;
            }
            mn(t, e, l, n);
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
        )) ? e.memoizedState = n : $t || (e.stateNode = Hp(
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
        return Ct(e), t === null && $t && (l = e.stateNode = Ip(
          e.type,
          e.pendingProps,
          bt.current
        ), yn = e, kl = !0, r = ze, ba(e.type) ? (qd = r, ze = $l(l.firstChild)) : ze = r), mn(
          t,
          e,
          e.pendingProps.children,
          n
        ), $u(t, e), t === null && (e.flags |= 4194304), e.child;
      case 5:
        return t === null && $t && ((r = l = ze) && (l = db(
          l,
          e.type,
          e.pendingProps,
          kl
        ), l !== null ? (e.stateNode = l, yn = e, ze = $l(l.firstChild), kl = !1, r = !0) : r = !1), r || aa(e)), Ct(e), r = e.type, s = e.pendingProps, m = t !== null ? t.memoizedProps : null, l = s.children, zd(r, s) ? l = null : m !== null && zd(r, m) && (e.flags |= 32), e.memoizedState !== null && (r = ph(
          t,
          e,
          o2,
          null,
          null,
          n
        ), gr._currentValue = r), $u(t, e), mn(t, e, l, n), e.child;
      case 6:
        return t === null && $t && ((t = n = ze) && (n = mb(
          n,
          e.pendingProps,
          kl
        ), n !== null ? (e.stateNode = n, yn = e, ze = null, t = !0) : t = !1), t || aa(e)), null;
      case 13:
        return Ov(t, e, n);
      case 4:
        return kt(
          e,
          e.stateNode.containerInfo
        ), l = e.pendingProps, t === null ? e.child = iu(
          e,
          null,
          l,
          n
        ) : mn(t, e, l, n), e.child;
      case 11:
        return yv(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 7:
        return l = e.pendingProps, $u(t, e), mn(t, e, l, n), e.child;
      case 8:
        return mn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 12:
        return mn(
          t,
          e,
          e.pendingProps.children,
          n
        ), e.child;
      case 10:
        return Cv(t, e, n);
      case 9:
        return r = e.type._context, l = e.pendingProps.children, Ia(e), r = wn(r), l = l(r), e.flags |= 1, mn(t, e, l, n), e.child;
      case 14:
        return Sv(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 15:
        return bv(
          t,
          e,
          e.type,
          e.pendingProps,
          n
        );
      case 19:
        return Gh(t, e, n);
      case 31:
        return p2(t, e, n);
      case 22:
        return Tv(
          t,
          e,
          n,
          e.pendingProps
        );
      case 24:
        return Ia(e), l = wn(un), t === null ? (r = uh(), r === null && (r = we, s = ih(), r.pooledCache = s, s.refCount++, s !== null && (r.pooledCacheLanes |= n), r = s), e.memoizedState = { parent: l, cache: r }, oh(e), ua(e, un, r)) : ((t.lanes & n) !== 0 && (sh(t, e), io(e, null, null, n), lo()), r = t.memoizedState, s = e.memoizedState, r.parent !== l ? (r = { parent: l, cache: l }, e.memoizedState = r, e.lanes === 0 && (e.memoizedState = e.updateQueue.baseState = r), ua(e, un, l)) : (l = s.cache, ua(e, un, l), l !== r.cache && lh(
          e,
          [un],
          n,
          !0
        ))), mn(
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
        }), l = e.pendingProps, l.name != null && l.name !== "auto" ? e.flags |= t === null ? 18882560 : 18874368 : $t && Cs(e), t !== null && t.memoizedProps.name !== l.name ? e.flags |= 4194816 : $u(t, e), mn(t, e, l.children, n), e.child;
      case 29:
        throw e.pendingProps;
    }
    throw Error(a(156, e.tag));
  }
  function Zi(t) {
    t.flags |= 4;
  }
  function Qh(t, e, n, l, r) {
    var s;
    if ((s = (t.mode & 32) !== 0) && (s = n === null ? r1(e, l) : r1(e, l) && (l.src !== n.src || l.srcSet !== n.srcSet)), s) {
      if (t.flags |= 16777216, (r & 335544128) === r)
        if (t.stateNode.complete) t.flags |= 8192;
        else if (dp()) t.flags |= 8192;
        else
          throw lu = Ys, rh;
    } else t.flags &= -16777217;
  }
  function Nv(t, e) {
    if (e.type !== "stylesheet" || (e.state.loading & 4) !== 0)
      t.flags &= -16777217;
    else if (t.flags |= 16777216, !o1(e))
      if (dp()) t.flags |= 8192;
      else
        throw lu = Ys, rh;
  }
  function lc(t, e) {
    e !== null && (t.flags |= 4), t.flags & 16384 && (e = t.tag !== 22 ? he() : 536870912, t.lanes |= e, nr |= e);
  }
  function co(t, e) {
    if (!$t)
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
  function Ce(t) {
    var e = t.alternate !== null && t.alternate.child === t.child, n = 0, l = 0;
    if (e)
      for (var r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, l |= r.subtreeFlags & 1206910976, l |= r.flags & 1206910976, r.return = t, r = r.sibling;
    else
      for (r = t.child; r !== null; )
        n |= r.lanes | r.childLanes, l |= r.subtreeFlags, l |= r.flags, r.return = t, r = r.sibling;
    return t.subtreeFlags |= l, t.childLanes = n, e;
  }
  function S2(t, e, n) {
    var l = e.pendingProps;
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
        return n = e.stateNode, l = null, t !== null && (l = t.memoizedState.cache), e.memoizedState.cache !== l && (e.flags |= 2048), Vi(un), Ht(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (t === null || t.child === null) && (Qu(e) ? Zi(e) : t === null || t.memoizedState.isDehydrated && (e.flags & 256) === 0 || (e.flags |= 1024, eh())), Ce(e), null;
      case 26:
        var r = e.type, s = e.memoizedState;
        return t === null ? (Zi(e), s !== null ? (Ce(e), Nv(e, s)) : (Ce(e), Qh(
          e,
          r,
          null,
          l,
          n
        ))) : s ? s !== t.memoizedState ? (Zi(e), Ce(e), Nv(e, s)) : (Ce(e), e.flags &= -16777217) : (t = t.memoizedProps, t !== l && Zi(e), Ce(e), Qh(
          e,
          r,
          t,
          l,
          n
        )), null;
      case 27:
        if (ee(e), n = bt.current, r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Zi(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ce(e), e.subtreeFlags &= -33554433, null;
          }
          t = vt.current, Qu(e) ? fg(e) : (t = Ip(r, l, n), e.stateNode = t, Zi(e));
        }
        return Ce(e), e.subtreeFlags &= -33554433, null;
      case 5:
        if (ee(e), r = e.type, t !== null && e.stateNode != null)
          t.memoizedProps !== l && Zi(e);
        else {
          if (!l) {
            if (e.stateNode === null)
              throw Error(a(166));
            return Ce(e), e.subtreeFlags &= -33554433, null;
          }
          if (s = vt.current, Qu(e))
            fg(e);
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
                    s = typeof l.is == "string" ? m.createElement("select", {
                      is: l.is
                    }) : m.createElement("select"), l.multiple ? s.multiple = !0 : l.size && (s.size = l.size);
                    break;
                  default:
                    s = typeof l.is == "string" ? m.createElement(r, { is: l.is }) : m.createElement(r);
                }
            }
            s[Le] = e, s[Ue] = l;
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
            t: switch (Cn(s, r, l), r) {
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
            l && Zi(e);
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
          t.memoizedProps !== l && Zi(e);
        else {
          if (typeof l != "string" && e.stateNode === null)
            throw Error(a(166));
          if (t = bt.current, Qu(e)) {
            if (t = e.stateNode, n = e.memoizedProps, l = null, r = yn, r !== null)
              switch (r.tag) {
                case 27:
                case 5:
                  l = r.memoizedProps;
              }
            t[Le] = e, t = !!(t.nodeValue === n || l !== null && l.suppressHydrationWarning === !0 || Dp(t.nodeValue, n)), t || aa(e, !0);
          } else
            t = To(t).createTextNode(
              l
            ), t[Le] = e, e.stateNode = t;
        }
        return Ce(e), null;
      case 31:
        if (n = e.memoizedState, t === null || t.memoizedState !== null) {
          if (l = Qu(e), n !== null) {
            if (t === null) {
              if (!l) throw Error(a(318));
              if (t = e.memoizedState, t = t !== null ? t.dehydrated : null, !t) throw Error(a(557));
              t[Le] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ce(e), t = !1;
          } else
            n = eh(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = n), t = !0;
          if (!t)
            return e.flags & 256 ? (bl(e), e) : (bl(e), null);
          if ((e.flags & 128) !== 0)
            throw Error(a(558));
        }
        return Ce(e), null;
      case 13:
        if (l = e.memoizedState, t === null || t.memoizedState !== null && t.memoizedState.dehydrated !== null) {
          if (r = Qu(e), l !== null && l.dehydrated !== null) {
            if (t === null) {
              if (!r) throw Error(a(318));
              if (r = e.memoizedState, r = r !== null ? r.dehydrated : null, !r) throw Error(a(317));
              r[Le] = e;
            } else
              Pa(), (e.flags & 128) === 0 && (e.memoizedState = null), e.flags |= 4;
            Ce(e), r = !1;
          } else
            r = eh(), t !== null && t.memoizedState !== null && (t.memoizedState.hydrationErrors = r), r = !0;
          if (!r)
            return e.flags & 256 ? (bl(e), e) : (bl(e), null);
        }
        return bl(e), (e.flags & 128) !== 0 ? (e.lanes = n, e) : (n = l !== null, t = t !== null && t.memoizedState !== null, n && (l = e.child, r = null, l.alternate !== null && l.alternate.memoizedState !== null && l.alternate.memoizedState.cachePool !== null && (r = l.alternate.memoizedState.cachePool.pool), s = null, l.memoizedState !== null && l.memoizedState.cachePool !== null && (s = l.memoizedState.cachePool.pool), s !== r && (l.flags |= 2048)), n !== t && n && (e.child.flags |= 8192), lc(e, e.updateQueue), Ce(e), null);
      case 4:
        return Ht(), t === null && Md(e.stateNode.containerInfo), e.flags |= 67108864, Ce(e), null;
      case 10:
        return Vi(e.type), Ce(e), null;
      case 19:
        if (gh(e), l = e.memoizedState, l === null) return Ce(e), null;
        if (r = (e.flags & 128) !== 0, s = l.rendering, s === null)
          if (r) co(l, !1);
          else {
            if ($e !== 0 || t !== null && (t.flags & 128) !== 0)
              for (t = e.child; t !== null; ) {
                if (s = Gs(t), s !== null) {
                  for (e.flags |= 128, co(l, !1), t = s.updateQueue, e.updateQueue = t, lc(e, t), e.subtreeFlags = 0, t = n, n = e.child; n !== null; )
                    ug(n, t), n = n.sibling;
                  return ao(
                    e,
                    Rn.current & 1 | 2
                  ), $t && qi(e, l.treeForkCount), e.child;
                }
                t = t.sibling;
              }
            l.tail !== null && qt() > gc && (e.flags |= 128, r = !0, co(l, !1), e.lanes = 4194304);
          }
        else {
          if (!r)
            if (t = Gs(s), t !== null) {
              if (e.flags |= 128, r = !0, t = t.updateQueue, e.updateQueue = t, lc(e, t), co(l, !0), l.tail === null && l.tailMode !== "collapsed" && l.tailMode !== "visible" && !s.alternate && !$t)
                return Ce(e), null;
            } else
              2 * qt() - l.renderingStartTime > gc && n !== 536870912 && (e.flags |= 128, r = !0, co(l, !1), e.lanes = 4194304);
          l.isBackwards ? (s.sibling = e.child, e.child = s) : (t = l.last, t !== null ? t.sibling = s : e.child = s, l.last = s);
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
          return l.rendering = t, l.tail = t.sibling, l.renderingStartTime = qt(), t.sibling = null, s = Rn.current, s = r ? s & 1 | 2 : s & 1, l.tailMode === "visible" || l.tailMode === "collapsed" || !n || $t ? ao(e, s) : (n = s, nt(On, e), nt(Rn, n), Bn === null && (Bn = e)), $t && qi(e, l.treeForkCount), t;
        }
        return Ce(e), null;
      case 22:
      case 23:
        return bl(e), dh(), l = e.memoizedState !== null, t !== null ? t.memoizedState !== null !== l && (e.flags |= 8192) : l && (e.flags |= 8192), l ? (n & 536870912) !== 0 && (e.flags & 128) === 0 && (Ce(e), e.subtreeFlags & 6 && (e.flags |= 8192)) : Ce(e), n = e.updateQueue, n !== null && lc(e, n.retryQueue), n = null, t !== null && t.memoizedState !== null && t.memoizedState.cachePool !== null && (n = t.memoizedState.cachePool.pool), l = null, e.memoizedState !== null && e.memoizedState.cachePool !== null && (l = e.memoizedState.cachePool.pool), l !== n && (e.flags |= 2048), t !== null && B(eu), null;
      case 24:
        return n = null, t !== null && (n = t.memoizedState.cache), e.memoizedState.cache !== n && (e.flags |= 2048), Vi(un), Ce(e), null;
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
        return Vi(un), Ht(), t = e.flags, (t & 65536) !== 0 && (t & 128) === 0 ? (e.flags = t & -65537 | 128, e) : null;
      case 26:
      case 27:
      case 5:
        return ee(e), null;
      case 31:
        if (e.memoizedState !== null) {
          if (bl(e), e.alternate === null)
            throw Error(a(340));
          Pa();
        }
        return t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 13:
        if (bl(e), t = e.memoizedState, t !== null && t.dehydrated !== null) {
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
        return Vi(e.type), null;
      case 22:
      case 23:
        return bl(e), dh(), t !== null && B(eu), t = e.flags, t & 65536 ? (e.flags = t & -65537 | 128, e) : null;
      case 24:
        return Vi(un), null;
      case 25:
        return null;
      default:
        return null;
    }
  }
  function Uv(t, e) {
    switch (If(e), e.tag) {
      case 3:
        Vi(un), Ht();
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
        e.memoizedState !== null && bl(e);
        break;
      case 13:
        bl(e);
        break;
      case 19:
        gh(e);
        break;
      case 10:
        Vi(e.type);
        break;
      case 22:
      case 23:
        bl(e), dh(), t !== null && B(eu);
        break;
      case 24:
        Vi(un);
    }
  }
  function fo(t, e) {
    try {
      var n = e.updateQueue, l = n !== null ? n.lastEffect : null;
      if (l !== null) {
        var r = l.next;
        n = r;
        do {
          if ((n.tag & t) === t) {
            l = void 0;
            var s = n.create, m = n.inst;
            l = s(), m.destroy = l;
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
      var l = e.updateQueue, r = l !== null ? l.lastEffect : null;
      if (r !== null) {
        var s = r.next;
        l = s;
        do {
          if ((l.tag & t) === t) {
            var m = l.inst, y = m.destroy;
            if (y !== void 0) {
              m.destroy = void 0, r = e;
              var x = n, U = y;
              try {
                U();
              } catch (G) {
                ye(
                  r,
                  x,
                  G
                );
              }
            }
          }
          l = l.next;
        } while (l !== s);
      }
    } catch (G) {
      ye(e, e.return, G);
    }
  }
  function Bv(t) {
    var e = t.updateQueue;
    if (e !== null) {
      var n = t.stateNode;
      try {
        xg(e, n);
      } catch (l) {
        ye(t, t.return, l);
      }
    }
  }
  function Hv(t, e, n) {
    n.props = uu(
      t.type,
      t.memoizedProps
    ), n.state = t.memoizedState;
    try {
      n.componentWillUnmount();
    } catch (l) {
      ye(t, e, l);
    }
  }
  function yi(t, e) {
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
            var r = t.stateNode, s = Hi(t.memoizedProps, r);
            (r.ref === null || r.ref.name !== s) && (r.ref = jp(s)), l = r.ref;
            break;
          case 7:
            if (t.stateNode === null) {
              var m = new Al(t);
              _(
                t.child,
                !1,
                fb,
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
      ye(t, e, y);
    }
  }
  function zn(t, e) {
    var n = t.ref, l = t.refCleanup;
    if (n !== null)
      if (typeof l == "function")
        try {
          l();
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
  function ic(t, e) {
    if ((t.tag === 5 || t.tag === 27 || t.tag === 6) && t.alternate === null && e !== null)
      for (var n = 0; n < e.length; n++)
        kp(
          t.stateNode,
          e[n]
        );
  }
  function Lv(t) {
    for (var e = t.return; e !== null && (Kh(e) && kp(t.stateNode, e.stateNode), !Zh(e)); )
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
      ye(t, t.return, r);
    }
  }
  function Jh(t, e, n) {
    try {
      var l = t.stateNode;
      F2(l, t.type, n, e), l[Ue] = e;
    } catch (r) {
      ye(t, t.return, r);
    }
  }
  function Yv(t) {
    return t.tag === 5 || t.tag === 3 || t.tag === 26 || t.tag === 27 && ba(t.type) || t.tag === 4;
  }
  function kh(t) {
    t: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Yv(t.return)) return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== 5 && t.tag !== 6 && t.tag !== 18; ) {
        if (t.tag === 27 && ba(t.type) || t.flags & 2 || t.child === null || t.tag === 4) continue t;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & 2)) return t.stateNode;
    }
  }
  function Ph(t, e, n, l) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(r, e) : (e = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, e.appendChild(r), n = n._reactRootContainer, n != null || e.onclick !== null || (e.onclick = vi)), ic(t, l), de = !0;
    else if (r !== 4 && (r === 27 && (ic(t, l), l = null, ba(t.type) && (n = t.stateNode, e = null)), t = t.child, t !== null))
      for (Ph(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        Ph(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function ac(t, e, n, l) {
    var r = t.tag;
    if (r === 5 || r === 6)
      r = t.stateNode, e ? n.insertBefore(r, e) : n.appendChild(r), ic(t, l), de = !0;
    else if (r !== 4 && (r === 27 && (ic(t, l), l = null, ba(t.type) && (n = t.stateNode)), t = t.child, t !== null))
      for (ac(
        t,
        e,
        n,
        l
      ), t = t.sibling; t !== null; )
        ac(
          t,
          e,
          n,
          l
        ), t = t.sibling;
  }
  function qv(t) {
    var e = t.stateNode, n = t.memoizedProps;
    try {
      for (var l = t.type, r = e.attributes; r.length; )
        e.removeAttributeNode(r[0]);
      Cn(e, l, n), e[Le] = t, e[Ue] = n;
    } catch (s) {
      ye(t, t.return, s);
    }
  }
  var uc = !1, Tl = null;
  function Xv(t) {
    (t.tag === 30 || (t.subtreeFlags & 33554432) !== 0) && (uc = !0);
  }
  var Si = null;
  function Vv() {
    var t = Si;
    return Si = null, t;
  }
  var al = 0;
  function Wu(t, e, n, l, r) {
    return al = 0, Gv(
      t.child,
      e,
      n,
      l,
      r
    );
  }
  function Gv(t, e, n, l, r) {
    for (var s = !1; t !== null; ) {
      if (t.tag === 5) {
        var m = t.stateNode;
        if (l !== null) {
          var y = Nd(m);
          l.push(y), y.view && (s = !0);
        } else
          s || Nd(m).view && (s = !0);
        uc = !0, Vp(
          m,
          al === 0 ? e : e + "_" + al,
          n
        ), al++;
      } else (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && r || Gv(
        t.child,
        e,
        n,
        l,
        r
      ) && (s = !0));
      t = t.sibling;
    }
    return s;
  }
  function bi(t, e) {
    for (; t !== null; )
      t.tag === 5 ? Gp(t.stateNode, t.memoizedProps) : (t.tag !== 22 || t.memoizedState === null) && (t.tag === 30 && e || bi(
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
          e = Li(e.default, e.share), e !== "none" && (Wu(
            t,
            n,
            e,
            null,
            !1
          ) || bi(t.child, !1));
        }
        t = t.sibling;
      }
  }
  function $h(t, e) {
    if (t.tag === 30) {
      var n = t.stateNode, l = t.memoizedProps, r = Hi(l, n), s = Li(
        l.default,
        n.paired ? l.share : l.enter
      );
      s !== "none" ? Wu(t, r, s, null, !1) ? (rc(t), n.paired || e || ur(t, l.onEnter)) : bi(t.child, !1) : rc(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        $h(t, e), t = t.sibling;
    else rc(t);
  }
  function Wh(t) {
    if (Tl !== null && Tl.size !== 0) {
      var e = Tl;
      if ((t.subtreeFlags & 18874368) !== 0)
        for (t = t.child; t !== null; ) {
          if (t.tag !== 22 || t.memoizedState === null) {
            if (t.tag === 30 && (t.flags & 18874368) !== 0) {
              var n = t.memoizedProps, l = n.name;
              if (l != null && l !== "auto") {
                var r = e.get(l);
                if (r !== void 0) {
                  var s = Li(
                    n.default,
                    n.share
                  );
                  if (s !== "none" && (Wu(
                    t,
                    l,
                    s,
                    null,
                    !1
                  ) ? (s = t.stateNode, r.paired = s, s.paired = r, ur(t, n.onShare)) : bi(t.child, !1)), e.delete(l), e.size === 0) break;
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
      var e = t.memoizedProps, n = Hi(e, t.stateNode), l = Tl !== null ? Tl.get(n) : void 0, r = Li(
        e.default,
        l !== void 0 ? e.share : e.exit
      );
      r !== "none" && (Wu(t, n, r, null, !1) ? l !== void 0 ? (r = t.stateNode, l.paired = r, r.paired = l, Tl.delete(n), ur(t, e.onShare)) : ur(t, e.onExit) : bi(t.child, !1)), Tl !== null && Wh(t);
    } else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        Ih(t), t = t.sibling;
    else
      Tl !== null && Wh(t);
  }
  function jv(t) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var e = t.memoizedProps, n = Hi(e, t.stateNode);
        e = Li(e.default, e.update), t.flags &= -5, e !== "none" && Wu(
          t,
          n,
          e,
          t.memoizedState = [],
          !1
        );
      } else
        (t.subtreeFlags & 33554432) !== 0 && jv(t);
      t = t.sibling;
    }
  }
  function td(t) {
    if ((t.subtreeFlags & 18874368) !== 0)
      for (t = t.child; t !== null; ) {
        if (t.tag !== 22 || t.memoizedState === null) {
          if (t.tag === 30 && (t.flags & 18874368) !== 0) {
            var e = t.stateNode;
            e.paired !== null && (e.paired = null, bi(t.child, !1));
          }
          td(t);
        }
        t = t.sibling;
      }
  }
  function oc(t) {
    if (t.tag === 30)
      t.stateNode.paired = null, bi(t.child, !1), td(t);
    else if ((t.subtreeFlags & 33554432) !== 0)
      for (t = t.child; t !== null; )
        oc(t), t = t.sibling;
    else td(t);
  }
  function Qv(t) {
    for (t = t.child; t !== null; )
      t.tag === 30 ? bi(t.child, !1) : (t.subtreeFlags & 33554432) !== 0 && Qv(t), t = t.sibling;
  }
  function ed(t, e, n, l, r, s, m) {
    for (var y = !1; e !== null; ) {
      if (e.tag === 5) {
        var x = e.stateNode;
        if (s !== null && al < s.length) {
          var U = s[al], G = Nd(x);
          (U.view || G.view) && (y = !0);
          var I;
          if (I = (t.flags & 4) === 0)
            if (G.clip) I = !0;
            else {
              I = U.rect;
              var C = G.rect;
              I = I.y !== C.y || I.x !== C.x || I.height !== C.height || I.width !== C.width;
            }
          I && (t.flags |= 4), G.abs ? G = !U.abs : (U = U.rect, G = G.rect, G = U.height !== G.height || U.width !== G.width), G && (t.flags |= 32);
        } else t.flags |= 32;
        (t.flags & 4) !== 0 && Vp(
          x,
          al === 0 ? n : n + "_" + al,
          r
        ), y && (t.flags & 4) !== 0 || (Si === null && (Si = []), Si.push(
          x,
          al === 0 ? l : l + "_" + al,
          e.memoizedProps
        )), al++;
      } else (e.tag !== 22 || e.memoizedState === null) && (e.tag === 30 && m ? t.flags |= e.flags & 32 : ed(
        t,
        e.child,
        n,
        l,
        r,
        s,
        m
      ) && (y = !0));
      e = e.sibling;
    }
    return y;
  }
  function Zv(t, e) {
    for (t = t.child; t !== null; ) {
      if (t.tag === 30) {
        var n = t.memoizedProps, l = t.stateNode, r = Hi(n, l), s = Li(n.default, n.update), m;
        m = t.memoizedState, t.memoizedState = null, l = t;
        var y = t.child;
        al = 0, r = ed(
          l,
          y,
          r,
          r,
          s,
          m,
          !1
        ), (t.flags & 4) !== 0 && r && ur(t, n.onUpdate);
      } else
        (t.subtreeFlags & 33554432) !== 0 && Zv(t);
      t = t.sibling;
    }
  }
  var Sn = !1, ve = !1, Ti = !1, nd = !1, Kv = typeof WeakSet == "function" ? WeakSet : Set, bn = null, Ei = !1, mo = !1, sc = !1, ld = !1;
  function T2(t, e, n) {
    if (t = t.containerInfo, Od = vr, t = Pm(t), jf(t)) {
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
            var s = r.anchorOffset, m = r.focusNode;
            r = r.focusOffset;
            try {
              l.nodeType, m.nodeType;
            } catch {
              l = null;
              break t;
            }
            var y = 0, x = -1, U = -1, G = 0, I = 0, C = t, q = null;
            e: for (; ; ) {
              for (var _t; C !== l || s !== 0 && C.nodeType !== 3 || (x = y + s), C !== m || r !== 0 && C.nodeType !== 3 || (U = y + r), C.nodeType === 3 && (y += C.nodeValue.length), (_t = C.firstChild) !== null; )
                q = C, C = _t;
              for (; ; ) {
                if (C === t) break e;
                if (q === l && ++G === s && (x = y), q === m && ++I === r && (U = y), (_t = C.nextSibling) !== null) break;
                C = q, q = C.parentNode;
              }
              C = _t;
            }
            l = x === -1 || U === -1 ? null : { start: x, end: U };
          } else l = null;
        }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (Rd = { focusedElem: t, selectionRange: l }, vr = !1, n = (n & 335544064) === n, bn = e, e = n ? 9270 : 1024; bn !== null; ) {
      if (t = bn, n && (l = t.deletions, l !== null))
        for (s = 0; s < l.length; s++)
          n && Ih(l[s]);
      if (t.alternate === null && (t.flags & 2) !== 0)
        n && Xv(t), cc(n);
      else {
        if (t.tag === 22) {
          if (l = t.alternate, t.memoizedState !== null) {
            l !== null && l.memoizedState === null && n && Ih(l), cc(n);
            continue;
          } else if (l !== null && l.memoizedState !== null) {
            n && Xv(t), cc(n);
            continue;
          }
        }
        l = t.child, (t.subtreeFlags & e) !== 0 && l !== null ? (l.return = t, bn = l) : (n && jv(t), cc(n));
      }
    }
    Tl = null;
  }
  function cc(t) {
    for (; bn !== null; ) {
      var e = bn, n = t, l = e.alternate, r = e.flags;
      switch (e.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if ((r & 1024) !== 0 && l !== null) {
            n = void 0, r = l.memoizedProps, l = l.memoizedState;
            var s = e.stateNode;
            try {
              var m = uu(
                e.type,
                r
              );
              n = s.getSnapshotBeforeUpdate(
                m,
                l
              ), s.__reactInternalSnapshotBeforeUpdate = n;
            } catch (y) {
              ye(e, e.return, y);
            }
          }
          break;
        case 3:
          if ((r & 1024) !== 0) {
            if (l = e.stateNode.containerInfo, n = l.nodeType, n === 9)
              Hd(l);
            else if (n === 1)
              switch (l.nodeName) {
                case "HEAD":
                case "HTML":
                case "BODY":
                  Hd(l);
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
          n && l !== null && (n = Hi(
            l.memoizedProps,
            l.stateNode
          ), r = e.memoizedProps, r = Li(r.default, r.update), r !== "none" && Wu(
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
        l.return = e.return, bn = l;
        break;
      }
      bn = e.return;
    }
  }
  function Fv(t, e, n) {
    var l = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 15:
        xi(t, n), l & 4 && fo(5, n);
        break;
      case 1:
        if (xi(t, n), l & 4)
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
        l & 64 && Bv(n), l & 512 && yi(n, n.return);
        break;
      case 3:
        if (xi(t, n), l & 64 && (t = n.updateQueue, t !== null)) {
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
            xg(t, e);
          } catch (m) {
            ye(n, n.return, m);
          }
        }
        break;
      case 27:
        e === null && l & 4 && qv(n);
      case 26:
      case 5:
        xi(t, n), e === null && l & 4 && Fh(n), l & 512 && yi(n, n.return);
        break;
      case 12:
        xi(t, n);
        break;
      case 31:
        xi(t, n), l & 4 && $v(t, n);
        break;
      case 13:
        xi(t, n), l & 4 && Wv(t, n), l & 64 && (t = n.memoizedState, t !== null && (t = t.dehydrated, t !== null && (n = U2.bind(
          null,
          n
        ), gb(t, n))));
        break;
      case 22:
        if (l = n.memoizedState !== null || Sn, !l) {
          var s = e !== null && e.memoizedState !== null || ve;
          e = Sn, r = ve, Sn = l, (ve = s) && !r ? (l = 2, (n.subtreeFlags & 8772) !== 0 && (l |= 1), si(
            t,
            n,
            l
          )) : xi(t, n), Sn = e, ve = r;
        }
        break;
      case 30:
        xi(t, n), l & 512 && yi(n, n.return);
        break;
      case 7:
        l & 512 && yi(n, n.return);
      default:
        xi(t, n);
    }
  }
  function id(t, e) {
    for (t = t.child; t !== null; )
      Jv(t, e), t = t.sibling;
  }
  function Jv(t, e) {
    switch (t.tag) {
      case 5:
      case 26:
        try {
          var n = t.stateNode;
          if (e) {
            var l = n.style;
            typeof l.setProperty == "function" ? l.setProperty("display", "none", "important") : l.display = "none";
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
          e ? Xp(y, !0) : Xp(t.stateNode, !1);
        } catch (x) {
          ye(t, t.return, x);
        }
        break;
      case 22:
      case 23:
        t.memoizedState === null && id(t, e);
        break;
      default:
        id(t, e);
    }
  }
  function ad(t, e) {
    if (t.subtreeFlags & 67108864)
      for (t = t.child; t !== null; ) {
        t: {
          var n = t, l = e;
          switch (n.tag) {
            case 4:
              Jv(n, l);
              break t;
            case 22:
              n.memoizedState === null && ad(n, l);
              break t;
            default:
              ad(n, l);
          }
        }
        t = t.sibling;
      }
  }
  function kv(t) {
    var e = t.alternate;
    e !== null && (t.alternate = null, kv(e)), t.child = null, t.deletions = null, t.sibling = null, t.tag === 5 && (e = t.stateNode, e !== null && jn(e)), t.stateNode = null, t.return = null, t.dependencies = null, t.memoizedProps = null, t.memoizedState = null, t.pendingProps = null, t.stateNode = null, t.updateQueue = null;
  }
  var Ye = null, ul = !1;
  function ri(t, e, n) {
    for (n = n.child; n !== null; )
      Pv(t, e, n), n = n.sibling;
  }
  function Pv(t, e, n) {
    if (rt && typeof rt.onCommitFiberUnmount == "function")
      try {
        rt.onCommitFiberUnmount(at, n);
      } catch {
      }
    switch (n.tag) {
      case 26:
        ve || zn(n, e), ri(
          t,
          e,
          n
        ), n.memoizedState ? n.memoizedState.count-- : n.stateNode && !ve && (n = n.stateNode, n.parentNode.removeChild(n));
        break;
      case 27:
        ve || zn(n, e), ho(n);
        var l = Ye, r = ul;
        ba(n.type) && (Ye = n.stateNode, ul = !1), ri(
          t,
          e,
          n
        ), t1(
          n.stateNode,
          n.type,
          n.memoizedProps
        ), Ye = l, ul = r;
        break;
      case 5:
        ve || zn(n, e), ho(n);
      case 6:
        if (n.tag === 6 && ho(n), l = Ye, r = ul, Ye = null, ri(
          t,
          e,
          n
        ), Ye = l, ul = r, Ye !== null)
          if (ul)
            try {
              (Ye.nodeType === 9 ? Ye.body : Ye.nodeName === "HTML" ? Ye.ownerDocument.body : Ye).removeChild(n.stateNode), de = !0;
            } catch (s) {
              ye(
                n,
                e,
                s
              );
            }
          else
            try {
              Ye.removeChild(n.stateNode), de = !0;
            } catch (s) {
              ye(
                n,
                e,
                s
              );
            }
        break;
      case 18:
        Ye !== null && (ul ? (t = Ye, qp(
          t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t,
          n.stateNode
        ), pr(t)) : qp(Ye, n.stateNode));
        break;
      case 4:
        l = Ye, r = ul, Ye = n.stateNode.containerInfo, ul = !0, ri(
          t,
          e,
          n
        ), Ye = l, ul = r;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        ma(2, n, e), ve || ma(4, n, e), ri(
          t,
          e,
          n
        );
        break;
      case 1:
        ve || (zn(n, e), l = n.stateNode, typeof l.componentWillUnmount == "function" && Hv(
          n,
          e,
          l
        )), ri(
          t,
          e,
          n
        );
        break;
      case 21:
        ri(
          t,
          e,
          n
        );
        break;
      case 22:
        ve = (l = ve) || n.memoizedState !== null, ri(
          t,
          e,
          n
        ), ve = l;
        break;
      case 30:
        zn(n, e), ri(
          t,
          e,
          n
        );
        break;
      case 7:
        ve || zn(n, e), ri(
          t,
          e,
          n
        );
        break;
      default:
        ri(
          t,
          e,
          n
        );
    }
  }
  function $v(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null))) {
      t = t.dehydrated;
      try {
        pr(t);
      } catch (n) {
        ye(e, e.return, n);
      }
    }
  }
  function Wv(t, e) {
    if (e.memoizedState === null && (t = e.alternate, t !== null && (t = t.memoizedState, t !== null && (t = t.dehydrated, t !== null))))
      try {
        pr(t);
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
        return e === null && (e = t.stateNode = new Kv()), e;
      case 22:
        return t = t.stateNode, e = t._retryCache, e === null && (e = t._retryCache = new Kv()), e;
      default:
        throw Error(a(435, t.tag));
    }
  }
  function fc(t, e) {
    var n = E2(t);
    e.forEach(function(l) {
      if (!n.has(l)) {
        n.add(l);
        var r = B2.bind(null, t, l);
        l.then(r, r);
      }
    });
  }
  function Fn(t, e, n) {
    var l = e.deletions;
    if (l !== null)
      for (var r = 0; r < l.length; r++) {
        var s = l[r], m = t, y = e, x = y;
        t: for (; x !== null; ) {
          switch (x.tag) {
            case 27:
              if (ba(x.type)) {
                Ye = x.stateNode, ul = !1;
                break t;
              }
              break;
            case 5:
              Ye = x.stateNode, ul = !1;
              break t;
            case 3:
            case 4:
              Ye = x.stateNode.containerInfo, ul = !0;
              break t;
          }
          x = x.return;
        }
        if (Ye === null) throw Error(a(160));
        Pv(m, y, s), Ye = null, ul = !1, m = s.alternate, m !== null && (m.return = null), s.return = null;
      }
    if (e.subtreeFlags & 13886)
      for (e = e.child; e !== null; )
        Iv(e, t, n), e = e.sibling;
  }
  var oi = null;
  function Iv(t, e, n) {
    var l = t.alternate, r = t.flags;
    switch (t.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (r & 4 && (l = t.updateQueue, l = l !== null ? l.events : null, l !== null))
          for (var s = 0; s < l.length; s++) {
            var m = l[s];
            m.ref.impl = m.nextImpl;
          }
        Fn(e, t, n), Jn(t), r & 4 && (ma(3, t, t.return), fo(3, t), ma(5, t, t.return));
        break;
      case 1:
        Fn(e, t, n), Jn(t), r & 512 && (ve || l === null || zn(l, l.return)), r & 64 && Sn && (t = t.updateQueue, t !== null && (e = t.callbacks, e !== null && (n = t.shared.hiddenCallbacks, t.shared.hiddenCallbacks = n === null ? e : n.concat(e))));
        break;
      case 26:
        if (s = oi, Fn(e, t, n), Jn(t), r & 512 && (ve || l === null || zn(l, l.return)), r & 4)
          if (r = l !== null ? l.memoizedState : null, n = t.memoizedState, l === null)
            if (n === null)
              if (t.stateNode === null)
                if (Sn)
                  t.stateNode = Hp(
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
                        l = r.getElementsByTagName("title")[0], (!l || l[Je] || l[Le] || l.namespaceURI === "http://www.w3.org/2000/svg" || l.hasAttribute("itemprop")) && (l = r.createElement(e), r.head.insertBefore(
                          l,
                          r.querySelector("head > title")
                        )), Cn(l, e, n), l[Le] = t, en(l), e = l;
                        break t;
                      case "link":
                        if (s = u1(
                          "link",
                          "href",
                          r
                        ).get(e + (n.href || ""))) {
                          for (m = 0; m < s.length; m++)
                            if (l = s[m], l.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && l.getAttribute("rel") === (n.rel == null ? null : n.rel) && l.getAttribute("title") === (n.title == null ? null : n.title) && l.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
                              s.splice(m, 1);
                              break e;
                            }
                        }
                        l = r.createElement(e), Cn(l, e, n), r.head.appendChild(l);
                        break;
                      case "meta":
                        if (s = u1(
                          "meta",
                          "content",
                          r
                        ).get(e + (n.content || ""))) {
                          for (m = 0; m < s.length; m++)
                            if (l = s[m], l.getAttribute("content") === (n.content == null ? null : "" + n.content) && l.getAttribute("name") === (n.name == null ? null : n.name) && l.getAttribute("property") === (n.property == null ? null : n.property) && l.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && l.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
                              s.splice(m, 1);
                              break e;
                            }
                        }
                        l = r.createElement(e), Cn(l, e, n), r.head.appendChild(l);
                        break;
                      default:
                        throw Error(a(468, e));
                    }
                    l[Le] = t, en(l), e = l;
                  }
                  t.stateNode = e;
                }
              else
                Sn || jd(s, t.type, t.stateNode);
            else
              t.stateNode = a1(
                s,
                n,
                t.memoizedProps
              );
          else
            r !== n ? (r === null ? (e = l.stateNode, e === null || ve || e.parentNode.removeChild(e)) : r.count--, n === null ? Sn || jd(s, t.type, t.stateNode) : a1(s, n, t.memoizedProps)) : n === null && t.stateNode !== null && Jh(
              t,
              t.memoizedProps,
              l.memoizedProps
            );
        break;
      case 27:
        Fn(e, t, n), Jn(t), r & 512 && (ve || l === null || zn(l, l.return)), l !== null && r & 4 && Jh(
          t,
          t.memoizedProps,
          l.memoizedProps
        );
        break;
      case 5:
        if (s = Ti, Ti = !1, Fn(e, t, n), Ti = s, Jn(t), r & 512 && (ve || l === null || zn(l, l.return)), t.flags & 32) {
          e = t.stateNode;
          try {
            Uu(e, ""), de = !0;
          } catch (G) {
            ye(t, t.return, G);
          }
        }
        r & 4 && t.stateNode != null && (e = t.memoizedProps, Jh(
          t,
          e,
          l !== null ? l.memoizedProps : e
        )), r & 1024 && (nd = !0);
        break;
      case 6:
        if (Fn(e, t, n), Jn(t), r & 4) {
          if (t.stateNode === null)
            throw Error(a(162));
          e = t.memoizedProps, n = t.stateNode;
          try {
            n.nodeValue = e, de = !0;
          } catch (G) {
            ye(t, t.return, G);
          }
        }
        break;
      case 3:
        if (de = !1, Ac = null, s = oi, oi = Eo(e.containerInfo), Fn(e, t, n), oi = s, Jn(t), r & 4 && l !== null && l.memoizedState.isDehydrated)
          try {
            pr(e.containerInfo);
          } catch (G) {
            ye(t, t.return, G);
          }
        nd && (nd = !1, tp(t)), de = !1;
        break;
      case 4:
        r = Ti, Ti = Sn, l = Sm(), s = oi, oi = Eo(
          t.stateNode.containerInfo
        ), Fn(e, t, n), Jn(t), oi = s, de && mo && (sc = !0), de = l, Ti = r;
        break;
      case 12:
        Fn(e, t, n), Jn(t);
        break;
      case 31:
        Fn(e, t, n), Jn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 13:
        Fn(e, t, n), Jn(t), t.child.flags & 8192 && t.memoizedState !== null != (l !== null && l.memoizedState !== null) && (mc = qt()), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 22:
        s = t.memoizedState !== null, m = l !== null && l.memoizedState !== null;
        var y = Sn, x = ve, U = Ti;
        Sn = y || s, Ti = U || s, ve = x || m, Fn(e, t, n), ve = x, Ti = U, Sn = y, Jn(t), r & 8192 && (e = t.stateNode, e._visibility = s ? e._visibility & -2 : e._visibility | 1, !s || l === null || m || Sn || ve || (e = m || ve, n = Sn, l = ve, Sn = s || Sn, ve = e, ga(t, 2), Sn = n, ve = l), !s && Ti || id(t, s)), r & 4 && (e = t.updateQueue, e !== null && (n = e.retryQueue, n !== null && (e.retryQueue = null, fc(t, n))));
        break;
      case 19:
        Fn(e, t, n), Jn(t), r & 4 && (e = t.updateQueue, e !== null && (t.updateQueue = null, fc(t, e)));
        break;
      case 30:
        r & 512 && (ve || l === null || zn(l, l.return)), r = Sm(), s = mo, m = (n & 335544064) === n, y = t.memoizedProps, mo = m && Li(
          y.default,
          y.update
        ) !== "none", Fn(e, t, n), Jn(t), m && l !== null && de && (t.flags |= 4), mo = s, de = r;
        break;
      case 21:
        break;
      case 7:
        r & 512 && (ve || l === null || zn(l, l.return)), l && l.stateNode !== null && (l.stateNode._fragmentFiber = t);
      default:
        Fn(e, t, n), Jn(t);
    }
  }
  function Jn(t) {
    var e = t.flags;
    if (e & 2) {
      try {
        for (var n, l = t.return; l !== null; ) {
          if (Yv(l)) {
            n = l;
            break;
          }
          l = l.return;
        }
        l = null;
        for (var r = t.return; r !== null; ) {
          if (Kh(r)) {
            var s = r.stateNode;
            l === null ? l = [s] : l.push(s);
          }
          if (Zh(r)) break;
          r = r.return;
        }
        var m = l;
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
            var G = kh(t);
            ac(
              t,
              G,
              U,
              m
            );
            break;
          case 3:
          case 4:
            var I = n.stateNode.containerInfo, C = kh(t);
            Ph(
              t,
              C,
              I,
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
  function tp(t) {
    if (t.subtreeFlags & 1024)
      for (t = t.child; t !== null; ) {
        var e = t;
        tp(e), e.tag === 5 && e.flags & 1024 && (e = e.stateNode, vr = !0, e.reset(), vr = !1), t = t.sibling;
      }
  }
  function Iu(t, e) {
    if (e.subtreeFlags & 9270)
      for (e = e.child; e !== null; )
        ep(e, t), e = e.sibling;
    else Zv(e);
  }
  function ep(t, e) {
    var n = t.alternate;
    if (n === null) $h(t, !1);
    else
      switch (t.tag) {
        case 3:
          if (ld = Ei = !1, Vv(), Iu(e, t), !Ei && !sc) {
            if (t = Si, t !== null)
              for (var l = 0; l < t.length; l += 3) {
                n = t[l];
                var r = t[l + 1];
                Gp(n, t[l + 2]), n = n.ownerDocument.documentElement, n !== null && n.animate(
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
            )), ld = !0;
          }
          Si = null;
          break;
        case 5:
          Iu(e, t);
          break;
        case 4:
          l = Ei, Ei = !1, Iu(e, t), Ei && (sc = !0), Ei = l;
          break;
        case 22:
          t.memoizedState === null && (n.memoizedState !== null ? $h(t, !1) : Iu(e, t));
          break;
        case 30:
          l = Ei, r = Vv(), Ei = !1, Iu(e, t), Ei && (t.flags |= 4);
          var s = t.memoizedProps, m = t.stateNode;
          e = Hi(s, m), m = Hi(n.memoizedProps, m);
          var y = Li(s.default, s.update);
          y === "none" ? e = !1 : (s = n.memoizedState, n.memoizedState = null, n = t.child, al = 0, e = ed(
            t,
            n,
            e,
            m,
            y,
            s,
            !0
          ), al !== (s === null ? 0 : s.length) && (t.flags |= 32)), (t.flags & 4) !== 0 && e ? (ur(
            t,
            t.memoizedProps.onUpdate
          ), Si = r) : r !== null && (r.push.apply(r, Si), Si = r), Ei = (t.flags & 32) !== 0 ? !0 : l;
          break;
        default:
          Iu(e, t);
      }
  }
  function xi(t, e) {
    if (e.subtreeFlags & 8772)
      for (e = e.child; e !== null; )
        Fv(t, e.alternate, e), e = e.sibling;
  }
  function ga(t, e) {
    for (t = t.child; t !== null; ) {
      var n = t, l = e;
      switch (n.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          ma(4, n, n.return), ga(
            n,
            l
          );
          break;
        case 1:
          zn(n, n.return);
          var r = n.stateNode;
          typeof r.componentWillUnmount == "function" && Hv(
            n,
            n.return,
            r
          ), ga(
            n,
            l
          );
          break;
        case 27:
          (l & 2) !== 0 && t1(
            n.stateNode,
            n.type,
            n.memoizedProps
          );
        case 5:
          zn(n, n.return), n.tag !== 5 && n.tag !== 27 || ho(n), ga(
            n,
            l
          );
          break;
        case 6:
          ho(n);
          break;
        case 26:
          zn(n, n.return), r = n.stateNode, n.memoizedState !== null || r === null || ve || r.parentNode.removeChild(r), ga(
            n,
            l
          );
          break;
        case 22:
          n.memoizedState === null && ga(
            n,
            l
          );
          break;
        case 30:
          zn(n, n.return), ga(
            n,
            l
          );
          break;
        case 7:
          zn(n, n.return);
        default:
          ga(
            n,
            l
          );
      }
      t = t.sibling;
    }
  }
  function si(t, e, n) {
    for (n = (e.subtreeFlags & 8772) !== 0 ? n : n & -2, e = e.child; e !== null; ) {
      var l = e.alternate, r = t, s = e, m = s.flags, y = (n & 1) !== 0;
      switch (s.tag) {
        case 0:
        case 11:
        case 15:
          si(
            r,
            s,
            n
          ), fo(4, s);
          break;
        case 1:
          if (si(
            r,
            s,
            n
          ), l = s, r = l.stateNode, typeof r.componentDidMount == "function")
            try {
              r.componentDidMount();
            } catch (G) {
              ye(l, l.return, G);
            }
          if (l = s, r = l.updateQueue, r !== null) {
            var x = l.stateNode;
            try {
              var U = r.shared.hiddenCallbacks;
              if (U !== null)
                for (r.shared.hiddenCallbacks = null, r = 0; r < U.length; r++)
                  Eg(U[r], x);
            } catch (G) {
              ye(l, l.return, G);
            }
          }
          y && m & 64 && Bv(s), yi(s, s.return);
          break;
        case 27:
          (n & 2) !== 0 && qv(s);
        case 5:
          s.tag !== 5 && s.tag !== 27 || Lv(s), si(
            r,
            s,
            n
          ), y && l === null && m & 4 && Fh(s), yi(s, s.return);
          break;
        case 6:
          Lv(s);
          break;
        case 26:
          x = s.stateNode, s.memoizedState !== null || x === null || Sn || jd(
            Eo(x.ownerDocument),
            s.type,
            x
          ), si(
            r,
            s,
            n
          ), y && l === null && m & 4 && Fh(s), yi(s, s.return);
          break;
        case 12:
          si(
            r,
            s,
            n
          );
          break;
        case 31:
          si(
            r,
            s,
            n
          ), y && m & 4 && $v(r, s);
          break;
        case 13:
          si(
            r,
            s,
            n
          ), y && m & 4 && Wv(r, s);
          break;
        case 22:
          s.memoizedState === null && si(
            r,
            s,
            n
          ), yi(s, s.return);
          break;
        case 30:
          si(
            r,
            s,
            n
          ), yi(s, s.return);
          break;
        case 7:
          yi(s, s.return);
        default:
          si(
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
  function Pl(t, e, n, l) {
    var r = (n & 335544064) === n;
    if (e.subtreeFlags & (r ? 10262 : 10256))
      for (e = e.child; e !== null; )
        np(
          t,
          e,
          n,
          l
        ), e = e.sibling;
    else r && Qv(e);
  }
  function np(t, e, n, l) {
    var r = (n & 335544064) === n;
    r && e.alternate === null && e.return !== null && e.return.alternate !== null && oc(e);
    var s = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 15:
        Pl(
          t,
          e,
          n,
          l
        ), s & 2048 && fo(9, e);
        break;
      case 1:
        Pl(
          t,
          e,
          n,
          l
        );
        break;
      case 3:
        Pl(
          t,
          e,
          n,
          l
        ), r && ld && (t = t.containerInfo, t = t.nodeType === 9 ? t.body : t.nodeName === "HTML" ? t.ownerDocument.body : t, t.style.viewTransitionName === "root" && (t.style.viewTransitionName = ""), t = t.ownerDocument.documentElement, t !== null && t.style.viewTransitionName === "none" && (t.style.viewTransitionName = "")), s & 2048 && (s = null, e.alternate !== null && (s = e.alternate.memoizedState.cache), e = e.memoizedState.cache, e !== s && (e.refCount++, s != null && Wr(s)));
        break;
      case 12:
        if (s & 2048) {
          Pl(
            t,
            e,
            n,
            l
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
          Pl(
            t,
            e,
            n,
            l
          );
        break;
      case 31:
        Pl(
          t,
          e,
          n,
          l
        );
        break;
      case 13:
        Pl(
          t,
          e,
          n,
          l
        );
        break;
      case 23:
        break;
      case 22:
        m = e.stateNode, y = e.alternate, e.memoizedState !== null ? (r && y !== null && y.memoizedState === null && oc(y), m._visibility & 2 ? Pl(
          t,
          e,
          n,
          l
        ) : go(
          t,
          e
        )) : (r && y !== null && y.memoizedState !== null && oc(e), m._visibility & 2 ? Pl(
          t,
          e,
          n,
          l
        ) : (m._visibility |= 2, tr(
          t,
          e,
          n,
          l,
          (e.subtreeFlags & 10256) !== 0 || !1
        ))), s & 2048 && ud(y, e);
        break;
      case 24:
        Pl(
          t,
          e,
          n,
          l
        ), s & 2048 && rd(e.alternate, e);
        break;
      case 30:
        r && (s = e.alternate, s !== null && (bi(s.child, !0), bi(e.child, !0))), Pl(
          t,
          e,
          n,
          l
        );
        break;
      default:
        Pl(
          t,
          e,
          n,
          l
        );
    }
  }
  function tr(t, e, n, l, r) {
    for (r = r && ((e.subtreeFlags & 10256) !== 0 || !1), e = e.child; e !== null; ) {
      var s = t, m = e, y = n, x = l, U = m.flags;
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
          var G = m.stateNode;
          m.memoizedState !== null ? G._visibility & 2 ? tr(
            s,
            m,
            y,
            x,
            r
          ) : go(
            s,
            m
          ) : (G._visibility |= 2, tr(
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
        var n = t, l = e, r = l.flags;
        switch (l.tag) {
          case 22:
            go(n, l), r & 2048 && ud(
              l.alternate,
              l
            );
            break;
          case 24:
            go(n, l), r & 2048 && rd(l.alternate, l);
            break;
          default:
            go(n, l);
        }
        e = e.sibling;
      }
  }
  var ru = 8192;
  function ou(t, e, n) {
    if (t.subtreeFlags & ru)
      for (t = t.child; t !== null; )
        lp(
          t,
          e,
          n
        ), t = t.sibling;
  }
  function lp(t, e, n) {
    switch (t.tag) {
      case 26:
        ou(
          t,
          e,
          n
        ), t.flags & ru && (t.memoizedState !== null ? Rb(
          n,
          oi,
          t.memoizedState,
          t.memoizedProps
        ) : (t = t.stateNode, (e & 335544128) === e && c1(n, t)));
        break;
      case 5:
        ou(
          t,
          e,
          n
        ), t.flags & ru && (t = t.stateNode, (e & 335544128) === e && c1(n, t));
        break;
      case 3:
      case 4:
        var l = oi;
        oi = Eo(t.stateNode.containerInfo), ou(
          t,
          e,
          n
        ), oi = l;
        break;
      case 22:
        t.memoizedState === null && (l = t.alternate, l !== null && l.memoizedState !== null ? (l = ru, ru = 16777216, ou(
          t,
          e,
          n
        ), ru = l) : ou(
          t,
          e,
          n
        ));
        break;
      case 30:
        if ((t.flags & ru) !== 0 && (l = t.memoizedProps.name, l != null && l !== "auto")) {
          var r = t.stateNode;
          r.paired = null, Tl === null && (Tl = /* @__PURE__ */ new Map()), Tl.set(l, r);
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
  function ip(t) {
    var e = t.alternate;
    if (e !== null && (t = e.child, t !== null)) {
      e.child = null;
      do
        e = t.sibling, t.sibling = null, t = e;
      while (t !== null);
    }
  }
  function vo(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          bn = l, up(
            l,
            t
          );
        }
      ip(t);
    }
    if (t.subtreeFlags & 10256)
      for (t = t.child; t !== null; )
        ap(t), t = t.sibling;
  }
  function ap(t) {
    switch (t.tag) {
      case 0:
      case 11:
      case 15:
        vo(t), t.flags & 2048 && ma(9, t, t.return);
        break;
      case 3:
        vo(t);
        break;
      case 12:
        vo(t);
        break;
      case 22:
        var e = t.stateNode;
        t.memoizedState !== null && e._visibility & 2 && (t.return === null || t.return.tag !== 13) ? (e._visibility &= -3, hc(t)) : vo(t);
        break;
      default:
        vo(t);
    }
  }
  function hc(t) {
    var e = t.deletions;
    if ((t.flags & 16) !== 0) {
      if (e !== null)
        for (var n = 0; n < e.length; n++) {
          var l = e[n];
          bn = l, up(
            l,
            t
          );
        }
      ip(t);
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
  function up(t, e) {
    for (; bn !== null; ) {
      var n = bn;
      switch (n.tag) {
        case 0:
        case 11:
        case 15:
          ma(8, n, e);
          break;
        case 23:
        case 22:
          if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
            var l = n.memoizedState.cachePool.pool;
            l != null && l.refCount++;
          }
          break;
        case 24:
          Wr(n.memoizedState.cache);
      }
      if (l = n.child, l !== null) l.return = n, bn = l;
      else
        t: for (n = t; bn !== null; ) {
          l = bn;
          var r = l.sibling, s = l.return;
          if (kv(l), l === n) {
            bn = null;
            break t;
          }
          if (r !== null) {
            r.return = s, bn = r;
            break t;
          }
          bn = s;
        }
    }
  }
  var x2 = {
    getCacheForType: function(t) {
      var e = wn(un), n = e.data.get(t);
      return n === void 0 && (n = t(), e.data.set(t, n)), n;
    },
    cacheSignal: function() {
      return wn(un).controller.signal;
    }
  }, M2 = typeof WeakMap == "function" ? WeakMap : Map, ge = 0, we = null, le = null, re = 0, _e = 0, El = null, va = !1, er = !1, od = !1, Ki = 0, $e = 0, pa = 0, su = 0, dc = 0, xl = 0, nr = 0, po = null, rl = null, sd = !1, mc = 0, rp = 0, gc = 1 / 0, vc = null, _a = null, Ge = 0, ci = null, cu = null, Mi = 0, cd = 0, fd = null, op = null, lr = null, ir = null, ar = null, _o = 0, pc = null;
  function Ml() {
    return (ge & 2) !== 0 && re !== 0 ? re & -re : ot.T !== null ? bd() : Ne();
  }
  function sp() {
    if (xl === 0)
      if ((re & 536870912) === 0 || $t) {
        var t = wt;
        wt <<= 1, (wt & 3932160) === 0 && (wt = 262144), xl = t;
      } else xl = 536870912;
    return t = On.current, t !== null && (t.flags |= 32), xl;
  }
  function ur(t, e) {
    if (e != null) {
      var n = t.stateNode, l = n.ref;
      l === null && (l = n.ref = jp(
        Hi(t.memoizedProps, n)
      )), ir === null && (ir = []), ir.push(e.bind(null, l));
    }
  }
  function ol(t, e, n) {
    (t === we && (_e === 2 || _e === 9) || t.cancelPendingCommit !== null) && (rr(t, 0), ya(
      t,
      re,
      xl,
      !1
    )), Xe(t, n), ((ge & 2) === 0 || t !== we) && (t === we && ((ge & 2) === 0 && (su |= n), $e === 4 && ya(
      t,
      re,
      xl,
      !1
    )), Ai(t));
  }
  function cp(t, e, n) {
    if ((ge & 6) !== 0) throw Error(a(327));
    var l = !n && (e & 127) === 0 && (e & t.expiredLanes) === 0 || Qt(t, e), r = l ? O2(t, e) : dd(t, e, !0), s = l;
    do {
      if (r === 0) {
        er && !l && ya(t, e, 0, !1);
        break;
      } else {
        if (n = t.current.alternate, s && !A2(n)) {
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
              r = po;
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
                s = rl, rl = r, s !== null && (rl === null ? rl = s : rl.push.apply(
                  rl,
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
          switch (l = t, s = r, s) {
            case 0:
            case 1:
              throw Error(a(345));
            case 4:
              if ((e & 4194048) !== e && (e & 62914560) !== e)
                break;
            case 6:
              ya(
                l,
                e,
                xl,
                !va
              );
              break t;
            case 2:
              rl = null;
              break;
            case 3:
            case 5:
              break;
            default:
              throw Error(a(329));
          }
          if ((e & 62914560) === e && (r = mc + 300 - qt(), 10 < r)) {
            if (ya(
              l,
              e,
              xl,
              !va
            ), Xt(l, 0, !0) !== 0) break t;
            Mi = e, l.timeoutHandle = Dd(
              fp.bind(
                null,
                l,
                n,
                rl,
                vc,
                sd,
                e,
                xl,
                su,
                nr,
                va,
                s,
                "Throttled",
                -0,
                0
              ),
              r
            );
            break t;
          }
          fp(
            l,
            n,
            rl,
            vc,
            sd,
            e,
            xl,
            su,
            nr,
            va,
            s,
            null,
            -0,
            0
          );
        }
      }
      break;
    } while (!0);
    Ai(t);
  }
  function fp(t, e, n, l, r, s, m, y, x, U, G, I, C, q) {
    t.timeoutHandle = -1;
    var _t = e.subtreeFlags, Dt = (s & 335544064) === s;
    if (I = null, (Dt || _t & 8192 || (_t & 16785408) === 16785408) && (I = {
      stylesheets: null,
      count: 0,
      imgCount: 0,
      imgBytes: 0,
      suspenseyImages: [],
      waitingForImages: !0,
      waitingForViewTransition: !1,
      unsuspend: vi
    }, Tl = null, lp(
      e,
      s,
      I
    ), Dt && (_t = I, Dt = t.containerInfo, Dt = (Dt.nodeType === 9 ? Dt : Dt.ownerDocument).__reactViewTransition, Dt != null && (_t.count++, _t.waitingForViewTransition = !0, _t = Ao.bind(_t), Dt.finished.then(_t, _t))), _t = (s & 62914560) === s ? mc - qt() : (s & 4194048) === s ? rp - qt() : 0, _t = zb(
      I,
      _t
    ), _t !== null)) {
      Mi = s, t.cancelPendingCommit = _t(
        yp.bind(
          null,
          t,
          e,
          s,
          n,
          l,
          r,
          m,
          y,
          x,
          U,
          G,
          I,
          null,
          C,
          q
        )
      ), ya(t, s, m, !U);
      return;
    }
    yp(
      t,
      e,
      s,
      n,
      l,
      r,
      m,
      y,
      x,
      U,
      G,
      I
    );
  }
  function A2(t) {
    for (var e = t; ; ) {
      var n = e.tag;
      if ((n === 0 || n === 11 || n === 15) && e.flags & 16384 && (n = e.updateQueue, n !== null && (n = n.stores, n !== null)))
        for (var l = 0; l < n.length; l++) {
          var r = n[l], s = r.getSnapshot;
          r = r.value;
          try {
            if (!Sl(s(), r)) return !1;
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
  function ya(t, e, n, l) {
    e = Kt(t, e), e &= ~dc, e &= ~su, t.suspendedLanes |= e, t.pingedLanes &= ~e, l && (t.warmLanes |= e), l = t.expirationTimes;
    for (var r = e; 0 < r; ) {
      var s = 31 - lt(r), m = 1 << s;
      l[s] = -1, r &= ~m;
    }
    n !== 0 && De(t, n, e);
  }
  function _c() {
    return (ge & 6) === 0 ? (yo(0), !1) : !0;
  }
  function hd() {
    if (le !== null) {
      if (_e === 0)
        var t = le.return;
      else
        t = le, Xi = $a = null, Sh(t), Fu = null, eo = 0, t = le;
      for (; t !== null; )
        Uv(t.alternate, t), t = t.return;
      le = null;
    }
  }
  function rr(t, e) {
    var n = t.timeoutHandle;
    return n !== -1 && (t.timeoutHandle = -1, P2(n)), n = t.cancelPendingCommit, n !== null && (t.cancelPendingCommit = null, n()), Mi = 0, hd(), we = t, le = n = Yi(t.current, null), re = e, _e = 0, El = null, va = !1, er = Qt(t, e), od = !1, nr = xl = dc = su = pa = $e = 0, rl = po = null, sd = !1, Ki = Kt(t, e), As(), n;
  }
  function hp(t, e) {
    Ft = null, ot.H = $s, e === Ku || e === Ls ? (e = yg(), _e = 3) : e === rh ? (e = yg(), _e = 4) : _e = e === Bh ? 8 : e !== null && typeof e == "object" && typeof e.then == "function" ? 6 : 1, El = e, le === null && ($e = 1, Ws(
      t,
      Kl(e, t.current)
    ));
  }
  function dp() {
    var t = On.current;
    return t === null ? !0 : (re & 4194048) === re ? Bn === null : (re & 62914560) === re || (re & 536870912) !== 0 ? t === Bn : !1;
  }
  function mp() {
    var t = ot.H;
    return ot.H = $s, t === null ? $s : t;
  }
  function gp() {
    var t = ot.A;
    return ot.A = x2, t;
  }
  function yc() {
    $e = 4, va || (re & 4194048) !== re && On.current !== null || (er = !0), (pa & 134217727) === 0 && (su & 134217727) === 0 || we === null || ya(
      we,
      re,
      xl,
      !1
    );
  }
  function dd(t, e, n) {
    var l = ge;
    ge |= 2;
    var r = mp(), s = gp();
    (we !== t || re !== e) && (vc = null, rr(t, e)), e = !1;
    var m = $e;
    t: do
      try {
        if (_e !== 0 && le !== null) {
          var y = le, x = El;
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
              if (_e = 0, El = null, or(t, y, x, U), n && er) {
                m = 0;
                break t;
              }
              break;
            default:
              U = _e, _e = 0, El = null, or(t, y, x, U);
          }
        }
        w2(), m = $e;
        break;
      } catch (G) {
        hp(t, G);
      }
    while (!0);
    return e && t.shellSuspendCounter++, Xi = $a = null, ge = l, ot.H = r, ot.A = s, le === null && (we = null, re = 0, As()), m;
  }
  function w2() {
    for (; le !== null; ) vp(le);
  }
  function O2(t, e) {
    var n = ge;
    ge |= 2;
    var l = mp(), r = gp();
    we !== t || re !== e ? (vc = null, gc = qt() + 500, rr(t, e)) : er = Qt(
      t,
      e
    );
    t: do
      try {
        if (_e !== 0 && le !== null) {
          e = le;
          var s = El;
          e: switch (_e) {
            case 1:
              _e = 0, El = null, or(t, e, s, 1);
              break;
            case 2:
            case 9:
              if (pg(s)) {
                _e = 0, El = null, pp(e);
                break;
              }
              e = function() {
                _e !== 2 && _e !== 9 || we !== t || (_e = 7), Ai(t);
              }, s.then(e, e);
              break t;
            case 3:
              _e = 7;
              break t;
            case 4:
              _e = 5;
              break t;
            case 7:
              pg(s) ? (_e = 0, El = null, pp(e)) : (_e = 0, El = null, or(t, e, s, 7));
              break;
            case 5:
              var m = null;
              switch (le.tag) {
                case 26:
                  m = le.memoizedState;
                case 5:
                case 27:
                  var y = le;
                  if (m ? o1(m) : y.stateNode.complete) {
                    _e = 0, El = null;
                    var x = y.sibling;
                    if (x !== null) le = x;
                    else {
                      var U = y.return;
                      U !== null ? (le = U, Sc(U)) : le = null;
                    }
                    break e;
                  }
              }
              _e = 0, El = null, or(t, e, s, 5);
              break;
            case 6:
              _e = 0, El = null, or(t, e, s, 6);
              break;
            case 8:
              hd(), $e = 6;
              break t;
            default:
              throw Error(a(462));
          }
        }
        R2();
        break;
      } catch (G) {
        hp(t, G);
      }
    while (!0);
    return Xi = $a = null, ot.H = l, ot.A = r, ge = n, le !== null ? 0 : (we = null, re = 0, As(), $e);
  }
  function R2() {
    for (; le !== null && !el(); )
      vp(le);
  }
  function vp(t) {
    var e = Dv(t.alternate, t, Ki);
    t.memoizedProps = t.pendingProps, e === null ? Sc(t) : le = e;
  }
  function pp(t) {
    var e = t, n = e.alternate;
    switch (e.tag) {
      case 15:
      case 0:
        e = Mv(
          n,
          e,
          e.pendingProps,
          e.type,
          void 0,
          re
        );
        break;
      case 11:
        e = Mv(
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
        var l = e;
        l === yn && ($t ? (Ds(l), l.tag === 5 && l.stateNode != null && (ze = l.stateNode)) : (Ds(l), $t = !0));
      default:
        Uv(n, e), e = le = ug(e, Ki), e = Dv(n, e, Ki);
    }
    t.memoizedProps = t.pendingProps, e === null ? Sc(t) : le = e;
  }
  function or(t, e, n, l) {
    Xi = $a = null, Sh(e), Fu = null, eo = 0;
    var r = e.return;
    try {
      if (v2(
        t,
        r,
        e,
        n,
        re
      )) {
        $e = 1, Ws(
          t,
          Kl(n, t.current)
        ), le = null;
        return;
      }
    } catch (s) {
      if (r !== null) throw le = r, s;
      $e = 1, Ws(
        t,
        Kl(n, t.current)
      ), le = null;
      return;
    }
    e.flags & 32768 ? ($t || l === 1 ? t = !0 : er || (re & 536870912) !== 0 ? t = !1 : (va = t = !0, (l === 2 || l === 9 || l === 3 || l === 6) && (l = On.current, l !== null && l.tag === 13 && (l.flags |= 16384))), _p(e, t)) : Sc(e);
  }
  function Sc(t) {
    var e = t;
    do {
      if ((e.flags & 32768) !== 0) {
        _p(
          e,
          va
        );
        return;
      }
      t = e.return;
      var n = S2(
        e.alternate,
        e,
        Ki
      );
      if (n !== null) {
        le = n;
        return;
      }
      if (e = e.sibling, e !== null) {
        le = e;
        return;
      }
      le = e = t;
    } while (e !== null);
    $e === 0 && ($e = 5);
  }
  function _p(t, e) {
    do {
      var n = b2(t.alternate, t);
      if (n !== null) {
        n.flags &= 32767, le = n;
        return;
      }
      if (n = t.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !e && (t = t.sibling, t !== null)) {
        le = t;
        return;
      }
      le = t = n;
    } while (t !== null);
    $e = 6, le = null;
  }
  function yp(t, e, n, l, r, s, m, y, x, U, G, I) {
    t.cancelPendingCommit = null;
    do
      bc();
    while (Ge !== 0);
    if ((ge & 6) !== 0) throw Error(a(327));
    if (e !== null) {
      if (e === t.current) throw Error(a(177));
      t === we && (le = we = null, re = 0), cu = e, ci = t, Mi = n, fd = r, op = l, z2(
        t,
        e,
        n,
        m,
        y,
        x,
        I
      );
    }
  }
  function z2(t, e, n, l, r, s, m) {
    var y = e.lanes | e.childLanes;
    if (cd = y, y |= Jf, Ae(
      t,
      n,
      y,
      l,
      r,
      s
    ), ir = null, (n & 335544064) === n ? (ar = i2(t), l = 10262) : (ar = null, l = 10256), (e.subtreeFlags & l) !== 0 || (e.flags & l) !== 0 ? (t.callbackNode = null, t.callbackPriority = 0, H2(dn, function() {
      return pd(), null;
    })) : (t.callbackNode = null, t.callbackPriority = 0), uc = !1, l = (e.flags & 13878) !== 0, (e.subtreeFlags & 13878) !== 0 || l) {
      l = ot.T, ot.T = null, r = gt.p, gt.p = 2, s = ge, ge |= 4;
      try {
        T2(t, e, n);
      } finally {
        ge = s, gt.p = r, ot.T = l;
      }
    }
    Ge = 1, uc ? lr = nb(
      m,
      t.containerInfo,
      ar,
      md,
      gd,
      D2,
      vd,
      pd,
      C2
    ) : (md(), gd(), vd());
  }
  function C2(t) {
    if (Ge !== 0) {
      var e = ci.onRecoverableError;
      e(t, { componentStack: null });
    }
  }
  function D2() {
    Ge === 3 && (Ge = 0, ep(cu, ci), Ge = 4);
  }
  function md() {
    if (Ge === 1) {
      Ge = 0;
      var t = ci, e = cu, n = Mi, l = (e.flags & 13878) !== 0;
      if ((e.subtreeFlags & 13878) !== 0 || l) {
        l = ot.T, ot.T = null;
        var r = gt.p;
        gt.p = 2;
        var s = ge;
        ge |= 4;
        try {
          mo = sc = !1, Iv(e, t, n), n = Rd;
          var m = Pm(t.containerInfo), y = n.focusedElem, x = n.selectionRange;
          if (m !== y && y && y.ownerDocument && km(
            y.ownerDocument.documentElement,
            y
          )) {
            if (x !== null && jf(y)) {
              var U = x.start, G = x.end;
              if (G === void 0 && (G = U), "selectionStart" in y)
                y.selectionStart = U, y.selectionEnd = Math.min(
                  G,
                  y.value.length
                );
              else {
                var I = y.ownerDocument || document, C = I && I.defaultView || window;
                if (C.getSelection) {
                  var q = C.getSelection(), _t = y.textContent.length, Dt = Math.min(x.start, _t), Jt = x.end === void 0 ? Dt : Math.min(x.end, _t);
                  !q.extend && Dt > Jt && (m = Jt, Jt = Dt, Dt = m);
                  var D = Jm(
                    y,
                    Dt
                  ), O = Jm(
                    y,
                    Jt
                  );
                  if (D && O && (q.rangeCount !== 1 || q.anchorNode !== D.node || q.anchorOffset !== D.offset || q.focusNode !== O.node || q.focusOffset !== O.offset)) {
                    var H = I.createRange();
                    H.setStart(D.node, D.offset), q.removeAllRanges(), Dt > Jt ? (q.addRange(H), q.extend(O.node, O.offset)) : (H.setEnd(O.node, O.offset), q.addRange(H));
                  }
                }
              }
            }
            for (I = [], q = y; q = q.parentNode; )
              q.nodeType === 1 && I.push({
                element: q,
                left: q.scrollLeft,
                top: q.scrollTop
              });
            for (typeof y.focus == "function" && y.focus(), y = 0; y < I.length; y++) {
              var $ = I[y];
              $.element.scrollLeft = $.left, $.element.scrollTop = $.top;
            }
          }
          vr = !!Od, Rd = Od = null;
        } finally {
          ge = s, gt.p = r, ot.T = l;
        }
      }
      t.current = e, Ge = 2;
    }
  }
  function gd() {
    if (Ge === 2) {
      Ge = 0;
      var t = ci, e = cu, n = (e.flags & 8772) !== 0;
      if ((e.subtreeFlags & 8772) !== 0 || n) {
        n = ot.T, ot.T = null;
        var l = gt.p;
        gt.p = 2;
        var r = ge;
        ge |= 4;
        try {
          Fv(t, e.alternate, e);
        } finally {
          ge = r, gt.p = l, ot.T = n;
        }
      }
      Ge = 3;
    }
  }
  function vd() {
    if (Ge === 4 || Ge === 3) {
      Ge = 0;
      var t = lr;
      lr = null, ql();
      var e = ci, n = cu, l = Mi, r = op, s = (l & 335544064) === l ? 10262 : 10256;
      if ((n.subtreeFlags & s) !== 0 || (n.flags & s) !== 0 ? Ge = 5 : (Ge = 0, cu = ci = null, Sp(e, e.pendingLanes)), s = e.pendingLanes, s === 0 && (_a = null), Ve(l), n = n.stateNode, rt && typeof rt.onCommitFiberRoot == "function")
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
      if (r = ir, m = ar, ar = null, r !== null && (ir = null, m === null && (m = []), t !== null))
        for (x = 0; x < r.length; x++)
          n = (0, r[x])(
            m
          ), n !== void 0 && t.finished.finally(n);
      (Mi & 3) !== 0 && bc(), Ai(e), s = e.pendingLanes, (l & 261930) !== 0 && (s & 42) !== 0 ? e === pc ? _o++ : (_o = 0, pc = e) : (_o = 0, pc = null), yo(0);
    }
  }
  function Sp(t, e) {
    (t.pooledCacheLanes &= e) === 0 && (e = t.pooledCache, e != null && (t.pooledCache = null, Wr(e)));
  }
  function bc() {
    return lr !== null && (lr.skipTransition(), lr = null), md(), gd(), vd(), pd();
  }
  function pd() {
    if (Ge !== 5) return !1;
    var t = ci, e = cd;
    cd = 0;
    var n = Ve(Mi), l = ot.T, r = gt.p;
    try {
      gt.p = 32 > n ? 32 : n, ot.T = null, n = fd, fd = null;
      var s = ci, m = Mi;
      if (Ge = 0, cu = ci = null, Mi = 0, (ge & 6) !== 0) throw Error(a(331));
      var y = ge;
      if (ge |= 4, ap(s.current), np(
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
      gt.p = r, ot.T = l, Sp(t, e);
    }
  }
  function bp(t, e, n) {
    e = Kl(n, e), e = Uh(t.stateNode, e, 2), t = ca(t, e, 2), t !== null && (Xe(t, 2), Ai(t));
  }
  function ye(t, e, n) {
    if (t.tag === 3)
      bp(t, t, n);
    else
      for (; e !== null; ) {
        if (e.tag === 3) {
          bp(
            e,
            t,
            n
          );
          break;
        } else if (e.tag === 1) {
          var l = e.stateNode;
          if (typeof e.type.getDerivedStateFromError == "function" || typeof l.componentDidCatch == "function" && (_a === null || !_a.has(l))) {
            t = Kl(n, t), n = pv(2), l = ca(e, n, 2), l !== null && (_v(
              n,
              l,
              e,
              t
            ), Xe(l, 2), Ai(l));
            break;
          }
        }
        e = e.return;
      }
  }
  function _d(t, e, n) {
    var l = t.pingCache;
    if (l === null) {
      l = t.pingCache = new M2();
      var r = /* @__PURE__ */ new Set();
      l.set(e, r);
    } else
      r = l.get(e), r === void 0 && (r = /* @__PURE__ */ new Set(), l.set(e, r));
    r.has(n) || (od = !0, r.add(n), t = N2.bind(null, t, e, n), e.then(t, t));
  }
  function N2(t, e, n) {
    var l = t.pingCache;
    l !== null && l.delete(e), t.pingedLanes |= t.suspendedLanes & n, t.warmLanes &= ~n, we === t && (re & n) === n && (($e === 4 || $e === 3 && (re & 62914560) === re && 300 > qt() - mc) && (ge & 2) === 0 ? rr(t, 0) : dc |= n, nr === re && (nr = 0)), Ai(t);
  }
  function Tp(t, e) {
    e === 0 && (e = he()), t = Ja(t, e), t !== null && (Xe(t, e), Ai(t));
  }
  function U2(t) {
    var e = t.memoizedState, n = 0;
    e !== null && (n = e.retryLane), Tp(t, n);
  }
  function B2(t, e) {
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
    l !== null && l.delete(e), Tp(t, n);
  }
  function H2(t, e) {
    return Gn(t, e);
  }
  var sr = null, cr = null, yd = !1, Tc = !1, Sd = !1, Sa = 0;
  function Ai(t) {
    t !== cr && t.next === null && (cr === null ? sr = cr = t : cr = cr.next = t), Tc = !0, yd || (yd = !0, Y2());
  }
  function yo(t, e) {
    if (!Sd && Tc) {
      Sd = !0;
      do
        for (var n = !1, l = sr; l !== null; ) {
          if (t !== 0) {
            var r = l.pendingLanes;
            if (r === 0) var s = 0;
            else {
              var m = l.suspendedLanes, y = l.pingedLanes;
              s = (1 << 31 - lt(42 | t) + 1) - 1, s &= r & ~(m & ~y), s = s & 201326741 ? s & 201326741 | 1 : s ? s | 2 : 0;
            }
            s !== 0 && (n = !0, Ap(l, s));
          } else
            s = re, s = Xt(
              l,
              l === we ? s : 0,
              l.cancelPendingCommit !== null || l.timeoutHandle !== -1
            ), (s & 3) === 0 || Qt(l, s) || (n = !0, Ap(l, s));
          l = l.next;
        }
      while (n);
      Sd = !1;
    }
  }
  function L2() {
    Ep();
  }
  function Ep() {
    Tc = yd = !1;
    var t = 0;
    Sa !== 0 && k2() && (t = Sa);
    for (var e = qt(), n = null, l = sr; l !== null; ) {
      var r = l.next, s = xp(l, e);
      s === 0 ? (l.next = null, n === null ? sr = r : n.next = r, r === null && (cr = n)) : (n = l, (t !== 0 || (s & 3) !== 0) && (Tc = !0)), l = r;
    }
    Ge !== 0 && Ge !== 5 || yo(t), Sa !== 0 && (Sa = 0);
  }
  function xp(t, e) {
    for (var n = t.suspendedLanes, l = t.pingedLanes, r = t.expirationTimes, s = t.pendingLanes & -62914561; 0 < s; ) {
      var m = 31 - lt(s), y = 1 << m, x = r[m];
      x === -1 ? ((y & n) === 0 || (y & l) !== 0) && (r[m] = Me(y, e)) : x <= e && (t.expiredLanes |= y), s &= ~y;
    }
    if (e = we, n = re, n = Xt(
      t,
      t === e ? n : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l = t.callbackNode, n === 0 || t === e && (_e === 2 || _e === 9) || t.cancelPendingCommit !== null)
      return l !== null && l !== null && Ie(l), t.callbackNode = null, t.callbackPriority = 0;
    if ((n & 3) === 0 || Qt(t, n)) {
      if (e = n & -n, e === t.callbackPriority) return e;
      switch (l !== null && Ie(l), Ve(n)) {
        case 2:
        case 8:
          n = An;
          break;
        case 32:
          n = dn;
          break;
        case 268435456:
          n = Gl;
          break;
        default:
          n = dn;
      }
      return l = Mp.bind(null, t), n = Gn(n, l), t.callbackPriority = e, t.callbackNode = n, e;
    }
    return l !== null && l !== null && Ie(l), t.callbackPriority = 2, t.callbackNode = null, 2;
  }
  function Mp(t, e) {
    if (Ge !== 0 && Ge !== 5)
      return t.callbackNode = null, t.callbackPriority = 0, null;
    var n = t.callbackNode;
    if (bc() && t.callbackNode !== n)
      return null;
    var l = re;
    return l = Xt(
      t,
      t === we ? l : 0,
      t.cancelPendingCommit !== null || t.timeoutHandle !== -1
    ), l === 0 ? null : (cp(t, l, e), xp(t, qt()), t.callbackNode != null && t.callbackNode === n ? Mp.bind(null, t) : null);
  }
  function Ap(t, e) {
    if (bc()) return null;
    cp(t, e, !0);
  }
  function Y2() {
    $2(function() {
      (ge & 6) !== 0 ? Gn(
        hn,
        L2
      ) : Ep();
    });
  }
  function bd() {
    if (Sa === 0) {
      var t = tu;
      t === 0 && (t = Lt, Lt <<= 1, (Lt & 261888) === 0 && (Lt = 256)), Sa = t;
    }
    return Sa;
  }
  function wp(t) {
    return t == null || typeof t == "symbol" || typeof t == "boolean" ? null : typeof t == "function" ? t : _s(t);
  }
  function q2(t, e, n, l, r) {
    if (e === "submit" && n && n.stateNode === r) {
      var s = wp(
        (r[Ue] || null).action
      ), m = l.submitter;
      m && (e = (e = m[Ue] || null) ? wp(e.formAction) : m.getAttribute("formAction"), e !== null && (s = e, m = null));
      var y = new Ts(
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
    ui(
      X2,
      "on" + V2
    );
  }
  ui(Im, "onAnimationEnd"), ui(tg, "onAnimationIteration"), ui(eg, "onAnimationStart"), ui("dblclick", "onDoubleClick"), ui("focusin", "onFocus"), ui("focusout", "onBlur"), ui(PS, "onTransitionRun"), ui($S, "onTransitionStart"), ui(WS, "onTransitionCancel"), ui(ng, "onTransitionEnd"), Du("onMouseEnter", ["mouseout", "mouseover"]), Du("onMouseLeave", ["mouseout", "mouseover"]), Du("onPointerEnter", ["pointerout", "pointerover"]), Du("onPointerLeave", ["pointerout", "pointerover"]), Za(
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
  function Op(t, e) {
    e = (e & 4) !== 0;
    for (var n = 0; n < t.length; n++) {
      var l = t[n], r = l.event;
      l = l.listeners;
      t: {
        var s = void 0;
        if (e)
          for (var m = l.length - 1; 0 <= m; m--) {
            var y = l[m], x = y.instance, U = y.currentTarget;
            if (y = y.listener, x !== s && r.isPropagationStopped())
              break t;
            s = y, r.currentTarget = U;
            try {
              s(r);
            } catch (G) {
              Ms(G);
            }
            r.currentTarget = null, s = x;
          }
        else
          for (m = 0; m < l.length; m++) {
            if (y = l[m], x = y.instance, U = y.currentTarget, y = y.listener, x !== s && r.isPropagationStopped())
              break t;
            s = y, r.currentTarget = U;
            try {
              s(r);
            } catch (G) {
              Ms(G);
            }
            r.currentTarget = null, s = x;
          }
      }
    }
  }
  function ie(t, e) {
    var n = e[_l];
    n === void 0 && (n = e[_l] = /* @__PURE__ */ new Set());
    var l = t + "__bubble";
    n.has(l) || (Rp(e, t, 2, !1), n.add(l));
  }
  function xd(t, e, n) {
    var l = 0;
    e && (l |= 4), Rp(
      n,
      t,
      l,
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
  function Rp(t, e, n, l) {
    switch (_1(e)) {
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
    ), r = void 0, !Nf || e !== "touchstart" && e !== "touchmove" && e !== "wheel" || (r = !0), l ? r !== void 0 ? t.addEventListener(e, n, {
      capture: !0,
      passive: r
    }) : t.addEventListener(e, n, !0) : r !== void 0 ? t.addEventListener(e, n, {
      passive: r
    }) : t.addEventListener(e, n, !1);
  }
  function Ad(t, e, n, l, r) {
    var s = l;
    if ((e & 1) === 0 && (e & 2) === 0 && l !== null)
      t: for (; ; ) {
        if (l === null) return;
        var m = l.tag;
        if (m === 3 || m === 4) {
          var y = l.stateNode.containerInfo;
          if (y === r) break;
          if (m === 4)
            for (m = l.return; m !== null; ) {
              var x = m.tag;
              if ((x === 3 || x === 4) && m.stateNode.containerInfo === r)
                return;
              m = m.return;
            }
          for (; y !== null; ) {
            if (m = Qn(y), m === null) return;
            if (x = m.tag, x === 5 || x === 6 || x === 26 || x === 27) {
              l = s = m;
              continue t;
            }
            y = y.parentNode;
          }
        }
        l = l.return;
      }
    Rm(function() {
      var U = s, G = Cf(n), I = [];
      t: {
        var C = lg.get(t);
        if (C !== void 0) {
          var q = Ts, _t = t;
          switch (t) {
            case "keypress":
              if (Ss(n) === 0) break t;
            case "keydown":
            case "keyup":
              q = AS;
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
              q = Dm;
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
            case Im:
            case tg:
            case eg:
              q = pS;
              break;
            case ng:
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
              q = Um;
              break;
            case "submit":
              q = RS;
              break;
            case "toggle":
            case "beforetoggle":
              q = LS;
          }
          var Dt = (e & 4) !== 0, Jt = !Dt && (t === "scroll" || t === "scrollend"), D = Dt ? C !== null ? C + "Capture" : null : C;
          Dt = [];
          for (var O = U, H; O !== null; ) {
            var $ = O;
            if (H = $.stateNode, $ = $.tag, $ !== 5 && $ !== 26 && $ !== 27 || H === null || D === null || ($ = Vr(O, D), $ != null && Dt.push(
              bo(O, $, H)
            )), Jt) break;
            O = O.return;
          }
          0 < Dt.length && (C = new q(
            C,
            _t,
            null,
            n,
            G
          ), I.push({ event: C, listeners: Dt }));
        }
      }
      if ((e & 7) === 0) {
        t: {
          if (q = t === "mouseover" || t === "pointerover", C = t === "mouseout" || t === "pointerout", q && n !== zf && (_t = n.relatedTarget || n.fromElement) && (Qn(_t) || _t[Fe]))
            break t;
          (C || q) && (_t = G.window === G ? G : (q = G.ownerDocument) ? q.defaultView || q.parentWindow : window, C ? (q = n.relatedTarget || n.toElement, C = U, q = q ? Qn(q) : null, q !== null && (Jt = c(q), Dt = q.tag, q !== Jt || Dt !== 5 && Dt !== 27 && Dt !== 6) && (q = null)) : (C = null, q = U), C !== q && (Dt = Dm, $ = "onMouseLeave", D = "onMouseEnter", O = "mouse", (t === "pointerout" || t === "pointerover") && (Dt = Um, $ = "onPointerLeave", D = "onPointerEnter", O = "pointer"), Jt = C == null ? _t : Qa(C), H = q == null ? _t : Qa(q), _t = new Dt(
            $,
            O + "leave",
            C,
            n,
            G
          ), _t.target = Jt, _t.relatedTarget = H, $ = null, Qn(G) === U && (Dt = new Dt(
            D,
            O + "enter",
            q,
            n,
            G
          ), Dt.target = H, Dt.relatedTarget = Jt, $ = Dt), Jt = $, Dt = C && q ? tt(
            C,
            q,
            j2
          ) : null, C !== null && zp(
            I,
            _t,
            C,
            Dt,
            !1
          ), q !== null && Jt !== null && zp(
            I,
            Jt,
            q,
            Dt,
            !0
          )));
        }
        t: {
          if (C = U ? Qa(U) : window, q = C.nodeName && C.nodeName.toLowerCase(), q === "select" || q === "input" && C.type === "file")
            var At = Gm;
          else if (Xm(C))
            if (jm)
              At = FS;
            else {
              At = ZS;
              var oe = QS;
            }
          else
            q = C.nodeName, !q || q.toLowerCase() !== "input" || C.type !== "checkbox" && C.type !== "radio" ? U && Rf(U.elementType) && (At = Gm) : At = KS;
          if (At && (At = At(t, U))) {
            Vm(
              I,
              At,
              n,
              G
            );
            break t;
          }
          oe && oe(t, C, U);
        }
        switch (oe = U ? Qa(U) : window, t) {
          case "focusin":
            (Xm(oe) || oe.contentEditable === "true") && (Yu = oe, Qf = U, kr = null);
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
            Zf = !1, $m(I, n, G);
            break;
          case "selectionchange":
            if (kS) break;
          case "keydown":
          case "keyup":
            $m(I, n, G);
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
          Lu ? Ym(t, n) && (Gt = "onCompositionEnd") : t === "keydown" && n.keyCode === 229 && (Gt = "onCompositionStart");
        Gt && (Bm && n.locale !== "ko" && (Lu || Gt !== "onCompositionStart" ? Gt === "onCompositionEnd" && Lu && (Bt = zm()) : (ea = G, Uf = "value" in ea ? ea.value : ea.textContent, Lu = !0)), oe = xc(U, Gt), 0 < oe.length && (Gt = new Nm(
          Gt,
          t,
          null,
          n,
          G
        ), I.push({ event: Gt, listeners: oe }), Bt ? Gt.data = Bt : (Bt = qm(n), Bt !== null && (Gt.data = Bt)))), (Bt = qS ? XS(t, n) : VS(t, n)) && (Gt = xc(U, "onBeforeInput"), 0 < Gt.length && (oe = new Nm(
          "onBeforeInput",
          "beforeinput",
          null,
          n,
          G
        ), I.push({
          event: oe,
          listeners: Gt
        }), oe.data = Bt)), q2(
          I,
          t,
          U,
          n,
          G
        );
      }
      Op(I, e);
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
    for (var n = e + "Capture", l = []; t !== null; ) {
      var r = t, s = r.stateNode;
      if (r = r.tag, r !== 5 && r !== 26 && r !== 27 || s === null || (r = Vr(t, n), r != null && l.unshift(
        bo(t, r, s)
      ), r = Vr(t, e), r != null && l.push(
        bo(t, r, s)
      )), t.tag === 3) return l;
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
  function zp(t, e, n, l, r) {
    for (var s = e._reactName, m = []; n !== null && n !== l; ) {
      var y = n, x = y.alternate, U = y.stateNode;
      if (y = y.tag, x !== null && x === l) break;
      y !== 5 && y !== 26 && y !== 27 || U === null || (x = U, r ? (U = Vr(n, s), U != null && m.unshift(
        bo(n, U, x)
      )) : r || (U = Vr(n, s), U != null && m.push(
        bo(n, U, x)
      ))), n = n.return;
    }
    m.length !== 0 && t.push({ event: e, listeners: m });
  }
  var Q2 = /\r\n?/g, Z2 = /\u0000|\uFFFD/g;
  function Cp(t) {
    return (typeof t == "string" ? t : "" + t).replace(Q2, `
`).replace(Z2, "");
  }
  function Dp(t, e) {
    return e = Cp(e), Cp(t) === e;
  }
  function Se(t, e, n, l, r, s) {
    switch (n) {
      case "children":
        if (typeof l == "string")
          e === "body" || e === "textarea" && l === "" || Uu(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          e !== "body" && Uu(t, "" + l);
        else return;
        break;
      case "className":
        ps(t, "class", l);
        break;
      case "tabIndex":
        ps(t, "tabindex", l);
        break;
      case "dir":
      case "role":
      case "viewBox":
      case "width":
      case "height":
        ps(t, n, l);
        break;
      case "style":
        wm(t, l, s);
        return;
      case "data":
        if (e !== "object") {
          ps(t, "data", l);
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
        l = _s(l), t.setAttribute(n, l);
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
        if (l == null || typeof l == "symbol" || typeof l == "boolean") {
          t.removeAttribute(n);
          break;
        }
        l = _s(l), t.setAttribute(n, l);
        break;
      case "onClick":
        l != null && (t.onclick = vi);
        return;
      case "onScroll":
        l != null && ie("scroll", t);
        return;
      case "onScrollEnd":
        l != null && ie("scrollend", t);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(a(61));
          if (n = l.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            s?.__html !== n && (t.innerHTML = n);
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
        n = _s(l), t.setAttributeNS(
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
        ie("beforetoggle", t), ie("toggle", t), vs(t, "popover", l);
        break;
      case "xlinkActuate":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:actuate",
          l
        );
        break;
      case "xlinkArcrole":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:arcrole",
          l
        );
        break;
      case "xlinkRole":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:role",
          l
        );
        break;
      case "xlinkShow":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:show",
          l
        );
        break;
      case "xlinkTitle":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:title",
          l
        );
        break;
      case "xlinkType":
        Ui(
          t,
          "http://www.w3.org/1999/xlink",
          "xlink:type",
          l
        );
        break;
      case "xmlBase":
        Ui(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:base",
          l
        );
        break;
      case "xmlLang":
        Ui(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:lang",
          l
        );
        break;
      case "xmlSpace":
        Ui(
          t,
          "http://www.w3.org/XML/1998/namespace",
          "xml:space",
          l
        );
        break;
      case "is":
        vs(t, "is", l);
        break;
      case "innerText":
      case "textContent":
        return;
      default:
        if (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N")
          n = cS.get(n) || n, vs(t, n, l);
        else return;
    }
    de = !0;
  }
  function wd(t, e, n, l, r, s) {
    switch (n) {
      case "style":
        wm(t, l, s);
        return;
      case "dangerouslySetInnerHTML":
        if (l != null) {
          if (typeof l != "object" || !("__html" in l))
            throw Error(a(61));
          if (n = l.__html, n != null) {
            if (r.children != null) throw Error(a(60));
            s?.__html !== n && (t.innerHTML = n);
          }
        }
        break;
      case "children":
        if (typeof l == "string") Uu(t, l);
        else if (typeof l == "number" || typeof l == "bigint")
          Uu(t, "" + l);
        else return;
        break;
      case "onScroll":
        l != null && ie("scroll", t);
        return;
      case "onScrollEnd":
        l != null && ie("scrollend", t);
        return;
      case "onClick":
        l != null && (t.onclick = vi);
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
        if (!pm.hasOwnProperty(n))
          t: {
            if (n[0] === "o" && n[1] === "n" && (r = n.endsWith("Capture"), s = n.slice(2, r ? n.length - 7 : void 0), e = t[Ue] || null, e = e != null ? e[n] : null, typeof e == "function" && t.removeEventListener(s, e, r), typeof l == "function")) {
              typeof e != "function" && e !== null && (n in t ? t[n] = null : t.hasAttribute(n) && t.removeAttribute(n)), t.addEventListener(s, l, r);
              break t;
            }
            de = !0, n in t ? t[n] = l : l === !0 ? t.setAttribute(n, "") : vs(t, n, l);
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
        ie("error", t), ie("load", t);
        var l = !1, r = !1, s;
        for (s in n)
          if (n.hasOwnProperty(s)) {
            var m = n[s];
            if (m != null)
              switch (s) {
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
                  Se(t, e, s, m, n, null);
              }
          }
        r && Se(t, e, "srcSet", n.srcSet, n, null), l && Se(t, e, "src", n.src, n, null);
        return;
      case "input":
        ie("invalid", t);
        var y = s = m = r = null, x = null, U = null;
        for (l in n)
          if (n.hasOwnProperty(l)) {
            var G = n[l];
            if (G != null)
              switch (l) {
                case "name":
                  r = G;
                  break;
                case "type":
                  m = G;
                  break;
                case "checked":
                  x = G;
                  break;
                case "defaultChecked":
                  U = G;
                  break;
                case "value":
                  s = G;
                  break;
                case "defaultValue":
                  y = G;
                  break;
                case "children":
                case "dangerouslySetInnerHTML":
                  if (G != null)
                    throw Error(a(137, e));
                  break;
                default:
                  Se(t, e, l, G, n, null);
              }
          }
        Em(
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
        ie("invalid", t), l = m = s = null;
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
                l = y;
              default:
                Se(t, e, r, y, n, null);
            }
        e = s, n = m, t.multiple = !!l, e != null ? Nu(t, !!l, e, !1) : n != null && Nu(t, !!l, n, !0);
        return;
      case "textarea":
        ie("invalid", t), s = r = l = null;
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
                s = y;
                break;
              case "dangerouslySetInnerHTML":
                if (y != null) throw Error(a(91));
                break;
              default:
                Se(t, e, m, y, n, null);
            }
        Mm(t, l, r, s);
        return;
      case "option":
        for (x in n)
          n.hasOwnProperty(x) && (l = n[x], l != null) && (x === "selected" ? t.selected = l && typeof l != "function" && typeof l != "symbol" : Se(t, e, x, l, n, null));
        return;
      case "dialog":
        ie("beforetoggle", t), ie("toggle", t), ie("cancel", t), ie("close", t);
        break;
      case "iframe":
      case "object":
        ie("load", t);
        break;
      case "video":
      case "audio":
        for (l = 0; l < So.length; l++)
          ie(So[l], t);
        break;
      case "image":
        ie("error", t), ie("load", t);
        break;
      case "details":
        ie("toggle", t);
        break;
      case "embed":
      case "source":
      case "link":
        ie("error", t), ie("load", t);
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
          if (n.hasOwnProperty(U) && (l = n[U], l != null))
            switch (U) {
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(a(137, e));
              default:
                Se(t, e, U, l, n, null);
            }
        return;
      default:
        if (Rf(e)) {
          for (G in n)
            n.hasOwnProperty(G) && (l = n[G], l !== void 0 && wd(
              t,
              e,
              G,
              l,
              n,
              void 0
            ));
          return;
        }
    }
    for (y in n)
      n.hasOwnProperty(y) && (l = n[y], l != null && Se(t, e, y, l, n, null));
  }
  var K2 = {};
  function F2(t, e, n, l) {
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
        var r = null, s = null, m = null, y = null, x = null, U = null, G = null;
        for (q in n) {
          var I = n[q];
          if (n.hasOwnProperty(q) && I != null)
            switch (q) {
              case "checked":
                break;
              case "value":
                break;
              case "defaultValue":
                x = I;
              default:
                l.hasOwnProperty(q) || Se(t, e, q, null, l, I);
            }
        }
        for (var C in l) {
          var q = l[C];
          if (I = n[C], l.hasOwnProperty(C) && (q != null || I != null))
            switch (C) {
              case "type":
                q !== I && (de = !0), s = q;
                break;
              case "name":
                q !== I && (de = !0), r = q;
                break;
              case "checked":
                q !== I && (de = !0), U = q;
                break;
              case "defaultChecked":
                q !== I && (de = !0), G = q;
                break;
              case "value":
                q !== I && (de = !0), m = q;
                break;
              case "defaultValue":
                q !== I && (de = !0), y = q;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (q != null)
                  throw Error(a(137, e));
                break;
              default:
                q !== I && Se(
                  t,
                  e,
                  C,
                  q,
                  l,
                  I
                );
            }
        }
        wf(
          t,
          m,
          y,
          x,
          U,
          G,
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
                l.hasOwnProperty(s) || Se(
                  t,
                  e,
                  s,
                  null,
                  l,
                  x
                );
            }
        for (r in l)
          if (s = l[r], x = n[r], l.hasOwnProperty(r) && (s != null || x != null))
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
                  l,
                  x
                );
            }
        e = y, n = m, l = q, C != null ? Nu(t, !!n, C, !1) : !!l != !!n && (e != null ? Nu(t, !!n, e, !0) : Nu(t, !!n, n ? [] : "", !1));
        return;
      case "textarea":
        q = C = null;
        for (y in n)
          if (r = n[y], n.hasOwnProperty(y) && r != null && !l.hasOwnProperty(y))
            switch (y) {
              case "value":
                break;
              case "children":
                break;
              default:
                Se(t, e, y, null, l, r);
            }
        for (m in l)
          if (r = l[m], s = n[m], l.hasOwnProperty(m) && (r != null || s != null))
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
                r !== s && Se(t, e, m, r, l, s);
            }
        xm(t, C, q);
        return;
      case "option":
        for (var _t in n)
          C = n[_t], n.hasOwnProperty(_t) && C != null && !l.hasOwnProperty(_t) && (_t === "selected" ? t.selected = !1 : Se(
            t,
            e,
            _t,
            null,
            l,
            C
          ));
        for (x in l)
          C = l[x], q = n[x], l.hasOwnProperty(x) && C !== q && (C != null || q != null) && (x === "selected" ? (C !== q && (de = !0), t.selected = C && typeof C != "function" && typeof C != "symbol") : Se(
            t,
            e,
            x,
            C,
            l,
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
          C = n[Dt], n.hasOwnProperty(Dt) && C != null && !l.hasOwnProperty(Dt) && Se(t, e, Dt, null, l, C);
        for (U in l)
          if (C = l[U], q = n[U], l.hasOwnProperty(U) && C !== q && (C != null || q != null))
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
                  l,
                  q
                );
            }
        return;
      default:
        if (Rf(e)) {
          for (var Jt in n)
            C = n[Jt], n.hasOwnProperty(Jt) && C !== void 0 && !l.hasOwnProperty(Jt) && wd(
              t,
              e,
              Jt,
              void 0,
              l,
              C
            );
          for (G in l)
            C = l[G], q = n[G], !l.hasOwnProperty(G) || C === q || C === void 0 && q === void 0 || wd(
              t,
              e,
              G,
              C,
              l,
              q
            );
          return;
        }
    }
    for (var D in n)
      C = n[D], n.hasOwnProperty(D) && C != null && !l.hasOwnProperty(D) && Se(t, e, D, null, l, C);
    for (I in l)
      C = l[I], q = n[I], !l.hasOwnProperty(I) || C === q || C == null && q == null || Se(t, e, I, C, l, q);
  }
  function Np(t) {
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
      for (var t = 0, e = 0, n = performance.getEntriesByType("resource"), l = 0; l < n.length; l++) {
        var r = n[l], s = r.transferSize, m = r.initiatorType, y = r.duration;
        if (s && y && Np(m)) {
          for (m = 0, y = r.responseEnd, l += 1; l < n.length; l++) {
            var x = n[l], U = x.startTime;
            if (U > y) break;
            var G = x.transferSize, I = x.initiatorType;
            G && Np(I) && (x = x.responseEnd, m += G * (x < y ? 1 : (y - U) / (x - U)));
          }
          if (--l, e += 8 * (s + m) / (r.duration / 1e3), t++, 10 < t) break;
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
  function Up(t) {
    switch (t) {
      case "http://www.w3.org/2000/svg":
        return 1;
      case "http://www.w3.org/1998/Math/MathML":
        return 2;
      default:
        return 0;
    }
  }
  function Bp(t, e) {
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
  function Hp(t, e, n, l) {
    return n = To(
      n
    ).createElement(t), n[Le] = l, n[Ue] = e, Cn(n, t, e), en(n), n;
  }
  function zd(t, e) {
    return t === "textarea" || t === "noscript" || typeof e.children == "string" || typeof e.children == "number" || typeof e.children == "bigint" || typeof e.dangerouslySetInnerHTML == "object" && e.dangerouslySetInnerHTML !== null && e.dangerouslySetInnerHTML.__html != null;
  }
  var Cd = null;
  function k2() {
    var t = window.event;
    return t && t.type === "popstate" ? t === Cd ? !1 : (Cd = t, !0) : (Cd = null, !1);
  }
  var Dd = typeof setTimeout == "function" ? setTimeout : void 0, P2 = typeof clearTimeout == "function" ? clearTimeout : void 0, Lp = typeof Promise == "function" ? Promise : void 0, Yp = typeof requestAnimationFrame == "function" ? requestAnimationFrame : Dd, $2 = typeof queueMicrotask == "function" ? queueMicrotask : typeof Lp < "u" ? function(t) {
    return Lp.resolve(null).then(t).catch(W2);
  } : Dd;
  function W2(t) {
    setTimeout(function() {
      throw t;
    });
  }
  function ba(t) {
    return t === "head";
  }
  function qp(t, e) {
    var n = e, l = 0;
    do {
      var r = n.nextSibling;
      if (t.removeChild(n), r && r.nodeType === 8)
        if (n = r.data, n === "/$" || n === "/&") {
          if (l === 0) {
            t.removeChild(r), pr(e);
            return;
          }
          l--;
        } else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&")
          l++;
        else if (n === "html")
          Xd(
            t.ownerDocument.documentElement
          );
        else if (n === "head") {
          n = t.ownerDocument.head, Xd(n);
          for (var s = n.firstChild; s; ) {
            var m = s.nextSibling, y = s.nodeName;
            s[Je] || y === "SCRIPT" || y === "STYLE" || y === "LINK" && s.rel.toLowerCase() === "stylesheet" || n.removeChild(s), s = m;
          }
        } else
          n === "body" && Xd(t.ownerDocument.body);
      n = r;
    } while (n);
    pr(e);
  }
  function Xp(t, e) {
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
  function Vp(t, e, n) {
    if (e = CSS.escape(e) !== e ? "r-" + btoa(e).replace(/=/g, "") : e, t.style.viewTransitionName = e, n != null && (t.style.viewTransitionClass = n), n = getComputedStyle(t), n.display === "inline") {
      if (e = t.getClientRects(), e.length === 1) var l = 1;
      else
        for (var r = l = 0; r < e.length; r++) {
          var s = e[r];
          0 < s.width && 0 < s.height && l++;
        }
      l === 1 && (t = t.style, t.display = e.length === 1 ? "inline-block" : "block", t.marginTop = "-" + n.paddingTop, t.marginBottom = "-" + n.paddingBottom);
    }
  }
  function Gp(t, e) {
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
  function nb(t, e, n, l, r, s, m, y, x) {
    var U = e.nodeType === 9 ? e : e.ownerDocument;
    try {
      var G = U.startViewTransition({
        update: function() {
          var C = U.defaultView, q = C.navigation && C.navigation.transition, _t = U.fonts.status;
          l();
          var Dt = [];
          if (_t === "loaded" && (tb(U), U.fonts.status === "loading" && Dt.push(U.fonts.ready)), _t = Dt.length, t !== null)
            for (var Jt = t.suspenseyImages, D = 0, O = 0; O < Jt.length; O++) {
              var H = Jt[O];
              if (!H.complete) {
                var $ = H.getBoundingClientRect();
                if (0 < $.bottom && 0 < $.right && $.top < C.innerHeight && $.left < C.innerWidth) {
                  if (D += s1(H), D > wc) {
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
              new Promise(function(At) {
                return setTimeout(At, 500);
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
      U.__reactViewTransition = G;
      var I = [];
      return G.ready.then(
        function() {
          for (var C = U.documentElement.getAnimations({
            subtree: !0
          }), q = 0; q < C.length; q++) {
            var _t = C[q], Dt = _t.effect, Jt = Dt.pseudoElement;
            if (Jt != null && Jt.startsWith("::view-transition")) {
              I.push(_t), _t = Dt.getKeyframes();
              for (var D = Jt = void 0, O = !0, H = 0; H < _t.length; H++) {
                var $ = _t[H], At = $.width;
                if (Jt === void 0) Jt = At;
                else if (Jt !== At) {
                  O = !1;
                  break;
                }
                if (At = $.height, D === void 0) D = At;
                else if (D !== At) {
                  O = !1;
                  break;
                }
                delete $.width, delete $.height, $.transform === "none" && delete $.transform;
              }
              O && Jt !== void 0 && D !== void 0 && (Dt.setKeyframes(_t), O = getComputedStyle(
                Dt.target,
                Dt.pseudoElement
              ), O.width !== Jt || O.height !== D) && (O = _t[0], O.width = Jt, O.height = D, O = _t[_t.length - 1], O.width = Jt, O.height = D, Dt.setKeyframes(_t));
            }
          }
          m();
        },
        function(C) {
          U.__reactViewTransition === G && (U.__reactViewTransition = null);
          try {
            typeof C == "object" && C !== null && C.name === "InvalidStateError" && (C.message === "View transition was skipped because document visibility state is hidden." || C.message === "Skipping view transition because document visibility state has become hidden." || C.message === "Skipping view transition because viewport size changed." || C.message === "Transition was aborted because of invalid state") && (C = null), C !== null && x(C);
          } finally {
            l(), r(), m();
          }
        }
      ), G.finished.finally(function() {
        for (var C = 0; C < I.length; C++)
          I[C].cancel();
        U.__reactViewTransition === G && (U.__reactViewTransition = null), y();
      }), G;
    } catch {
      return l(), r(), m(), null;
    }
  }
  function fu(t, e) {
    this._scope = document.documentElement, this._selector = "::view-transition-" + t + "(" + e + ")";
  }
  fu.prototype.animate = function(t, e) {
    return e = typeof e == "number" ? { duration: e } : N({}, e), e.pseudoElement = this._selector, this._scope.animate(t, e);
  }, fu.prototype.getAnimations = function() {
    for (var t = this._scope, e = this._selector, n = t.getAnimations({ subtree: !0 }), l = [], r = 0; r < n.length; r++) {
      var s = n[r].effect;
      s !== null && s.target === t && s.pseudoElement === e && l.push(n[r]);
    }
    return l;
  }, fu.prototype.getComputedStyle = function() {
    return getComputedStyle(this._scope, this._selector);
  };
  function jp(t) {
    return {
      name: t,
      group: new fu("group", t),
      imagePair: new fu("image-pair", t),
      old: new fu("old", t),
      new: new fu("new", t)
    };
  }
  function Al(t) {
    this._fragmentFiber = t, this._observers = this._eventListeners = null;
  }
  Al.prototype.addEventListener = function(t, e, n) {
    var l = null, r = null;
    if (!(n != null && typeof n != "boolean" && (l = n.signal || null, l !== null && l.aborted))) {
      this._eventListeners === null && (this._eventListeners = []);
      var s = this._eventListeners;
      if (Zp(s, t, e, n) === -1) {
        var m = this, y = e;
        n != null && typeof n != "boolean" && n.once === !0 && (y = function(x) {
          m.removeEventListener(
            t,
            e,
            n
          ), typeof e == "function" ? e.call(this, x) : e.handleEvent(x);
        }), l !== null && (r = m.removeEventListener.bind(
          m,
          t,
          e,
          n
        ), l.addEventListener("abort", r, { once: !0 }), r = l.removeEventListener.bind(l, "abort", r)), l = fr(n), s.push({
          type: t,
          listener: e,
          optionsOrUseCapture: n,
          attachedListener: y,
          cleanup: r
        }), _(
          this._fragmentFiber.child,
          !1,
          lb,
          t,
          y,
          l
        );
      }
      this._eventListeners = s;
    }
  };
  function lb(t, e, n, l) {
    return R(t).addEventListener(
      e,
      n,
      l
    ), !1;
  }
  Al.prototype.removeEventListener = function(t, e, n) {
    var l = this._eventListeners;
    if (l !== null && (e = Zp(
      l,
      t,
      e,
      n
    ), e !== -1)) {
      var r = l[e];
      n = r.attachedListener;
      var s = r.cleanup;
      r = fr(r.optionsOrUseCapture), _(
        this._fragmentFiber.child,
        !1,
        ib,
        t,
        n,
        r
      ), l.splice(e, 1), s !== null && s();
    }
  };
  function ib(t, e, n, l) {
    return R(t).removeEventListener(
      e,
      n,
      l
    ), !1;
  }
  function fr(t) {
    return t != null && typeof t != "boolean" && (t.once === !0 || t.signal instanceof AbortSignal) ? { capture: t.capture, passive: t.passive } : t;
  }
  function Qp(t) {
    return t == null ? "c=0" : typeof t == "boolean" ? "c=" + (t ? "1" : "0") : "c=" + (t.capture ? "1" : "0");
  }
  function Zp(t, e, n, l) {
    if (t.length === 0) return -1;
    l = Qp(l);
    for (var r = 0; r < t.length; r++) {
      var s = t[r];
      if (s.type === e && s.listener === n && Qp(s.optionsOrUseCapture) === l)
        return r;
    }
    return -1;
  }
  Al.prototype.dispatchEvent = function(t) {
    var e = S(
      this._fragmentFiber
    );
    if (e === null) return !0;
    e = R(e);
    var n = this._eventListeners;
    if (n !== null && 0 < n.length || !t.bubbles) {
      var l = e.nodeType === 9 ? e.createComment("") : document.createTextNode("");
      if (n)
        for (var r = 0; r < n.length; r++) {
          var s = n[r];
          l.addEventListener(
            s.type,
            s.attachedListener,
            fr(s.optionsOrUseCapture)
          );
        }
      if (e.appendChild(l), t = l.dispatchEvent(t), n)
        for (r = 0; r < n.length; r++)
          s = n[r], l.removeEventListener(
            s.type,
            s.attachedListener,
            fr(s.optionsOrUseCapture)
          );
      return e.removeChild(l), t;
    }
    return e.dispatchEvent(t);
  }, Al.prototype.focus = function(t) {
    _(
      this._fragmentFiber.child,
      !0,
      Kp,
      t,
      void 0,
      void 0
    );
  };
  function Kp(t, e) {
    return t.tag === 6 ? !1 : (t = R(t), vb(t, e));
  }
  Al.prototype.focusLast = function(t) {
    var e = [];
    _(
      this._fragmentFiber.child,
      !0,
      Ud,
      e,
      void 0,
      void 0
    );
    for (var n = e.length - 1; 0 <= n && !Kp(e[n], t); n--) ;
  };
  function Ud(t, e) {
    return e.push(t), !1;
  }
  Al.prototype.blur = function() {
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
  Al.prototype.observeUsing = function(t) {
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
  Al.prototype.unobserveUsing = function(t) {
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
      for (var n = e = 0; n < fi.length; n++) {
        var l = fi[n];
        l.fragmentInstance === this && l.observer === t ? t.unobserve(l.instance) : fi[e++] = l;
      }
      fi.length = e;
    }
  };
  function rb(t, e) {
    return t.tag === 6 || (t = R(t), e.unobserve(t)), !1;
  }
  var fi = [], Bd = !1;
  function ob(t, e, n) {
    fi.push({
      fragmentInstance: t,
      observer: e,
      instance: n
    }), Bd || (Bd = !0, pb(function() {
      Bd = !1;
      var l = fi;
      fi = [];
      for (var r = 0; r < l.length; r++) {
        var s = l[r];
        s.observer.unobserve(s.instance);
      }
    }));
  }
  Al.prototype.getClientRects = function() {
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
  Al.prototype.getRootNode = function(t) {
    var e = S(
      this._fragmentFiber
    );
    return e === null ? this : R(e).getRootNode(t);
  }, Al.prototype.compareDocumentPosition = function(t) {
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
    var l = R(e);
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
      return n === t ? r = Node.DOCUMENT_POSITION_CONTAINS : l & Node.DOCUMENT_POSITION_CONTAINED_BY && (n = M(e)[1], n === null ? r = Node.DOCUMENT_POSITION_PRECEDING : (t = R(n).compareDocumentPosition(
        t
      ), r = t === 0 || t & Node.DOCUMENT_POSITION_FOLLOWING ? Node.DOCUMENT_POSITION_FOLLOWING : Node.DOCUMENT_POSITION_PRECEDING)), r |= Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
    }
    e = R(n[0]), r = R(n[n.length - 1]);
    var s = b(this._fragmentFiber) ? e.parentElement : l;
    if (s == null)
      return Node.DOCUMENT_POSITION_DISCONNECTED;
    l = s.compareDocumentPosition(e) & Node.DOCUMENT_POSITION_CONTAINED_BY, s = s.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    var m = e.compareDocumentPosition(t), y = r.compareDocumentPosition(t), x = m & Node.DOCUMENT_POSITION_CONTAINED_BY || y & Node.DOCUMENT_POSITION_CONTAINED_BY;
    return y = l && s && m & Node.DOCUMENT_POSITION_FOLLOWING && y & Node.DOCUMENT_POSITION_PRECEDING, e = l && e === t || s && r === t || x || y ? Node.DOCUMENT_POSITION_CONTAINED_BY : !l && e === t || !s && r === t ? Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC : m, e & Node.DOCUMENT_POSITION_DISCONNECTED || e & Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC || cb(
      e,
      this._fragmentFiber,
      n[0],
      n[n.length - 1],
      t
    ) ? e : Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC;
  };
  function cb(t, e, n, l, r) {
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
    return t & Node.DOCUMENT_POSITION_PRECEDING ? ((e = !!s) && !(e = s === n) && (e = tt(
      n,
      s,
      Q
    ), e === null ? e = !1 : (_(
      e,
      !0,
      Z,
      s,
      n
    ), s = j, j = null, e = s !== null)), e) : t & Node.DOCUMENT_POSITION_FOLLOWING ? ((e = !!s) && !(e = s === l) && (e = tt(
      l,
      s,
      Q
    ), e === null ? e = !1 : (_(
      e,
      !0,
      Y,
      s,
      l
    ), s = j, X = j = null, e = s !== null)), e) : !1;
  }
  function Fp(t, e) {
    var n = t.ownerDocument.createRange();
    n.selectNodeContents(t), t = n.getBoundingClientRect(), window.scrollTo(
      window.scrollX + t.left,
      e ? window.scrollY + t.top : window.scrollY + t.bottom - window.innerHeight
    );
  }
  Al.prototype.scrollIntoView = function(t) {
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
      var l = M(
        this._fragmentFiber
      );
      if (l = n ? l[1] || l[0] || S(this._fragmentFiber) : l[0] || l[1], l === null) return;
      if (l.tag === 6) {
        t = R(l), Fp(t, n);
        return;
      }
      if (l = R(l), l.nodeType !== 9) {
        if (l.nodeType === 11) {
          n = "host" in l ? l.host : null, n !== null && n.scrollIntoView(t);
          return;
        }
        l.scrollIntoView(t);
      }
    }
    for (l = n ? e.length - 1 : 0; l !== (n ? -1 : e.length); ) {
      var r = e[l];
      r.tag === 6 ? (r = R(r), Fp(r, n)) : R(r).scrollIntoView(t), l += n ? -1 : 1;
    }
  };
  function fb(t, e) {
    return t = R(t), Jp(t, e), !1;
  }
  function Jp(t, e) {
    t.reactFragments == null && (t.reactFragments = /* @__PURE__ */ new Set()), t.reactFragments.add(e);
  }
  function kp(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = n[l];
        t.addEventListener(
          r.type,
          r.attachedListener,
          fr(r.optionsOrUseCapture)
        );
      }
    t.nodeType !== 3 && (n = e._observers, n !== null && n.forEach(function(s) {
      for (var m = 0, y = 0; y < fi.length; y++) {
        var x = fi[y];
        (x.fragmentInstance !== e || x.observer !== s || x.instance !== t) && (fi[m++] = x);
      }
      fi.length = m, s.observe(t);
    }), Jp(t, e));
  }
  function hb(t, e) {
    var n = e._eventListeners;
    if (n !== null)
      for (var l = 0; l < n.length; l++) {
        var r = n[l];
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
  function db(t, e, n, l) {
    for (; t.nodeType === 1; ) {
      var r = n;
      if (t.nodeName.toLowerCase() !== e.toLowerCase()) {
        if (!l && (t.nodeName !== "INPUT" || t.type !== "hidden"))
          break;
      } else if (l) {
        if (!t[Je])
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
      if (t = $l(t.nextSibling), t === null) break;
    }
    return null;
  }
  function mb(t, e, n) {
    if (e === "") return null;
    for (; t.nodeType !== 3; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !n || (t = $l(t.nextSibling), t === null)) return null;
    return t;
  }
  function Pp(t, e) {
    for (; t.nodeType !== 8; )
      if ((t.nodeType !== 1 || t.nodeName !== "INPUT" || t.type !== "hidden") && !e || (t = $l(t.nextSibling), t === null)) return null;
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
      var l = function() {
        e(), n.removeEventListener("DOMContentLoaded", l);
      };
      n.addEventListener("DOMContentLoaded", l), t._reactRetry = l;
    }
  }
  function $l(t) {
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
  function $p(t) {
    t = t.nextSibling;
    for (var e = 0; t; ) {
      if (t.nodeType === 8) {
        var n = t.data;
        if (n === "/$" || n === "/&") {
          if (e === 0)
            return $l(t.nextSibling);
          e--;
        } else
          n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || e++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Wp(t) {
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
  function vb(t, e) {
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
  function pb(t) {
    Yp(function() {
      Yp(function(e) {
        return t(e);
      });
    });
  }
  function Ip(t, e, n) {
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
  function t1(t, e, n) {
    for (var l in n) {
      var r = n[l];
      n.hasOwnProperty(l) && r != null && Se(t, e, l, null, K2, r);
    }
    n.dangerouslySetInnerHTML != null && (t.textContent = ""), t.onclick === vi && (t.onclick = null), jn(t);
  }
  function Xd(t) {
    for (var e = t.attributes; e.length; )
      t.removeAttributeNode(e[0]);
    jn(t);
  }
  var Wl = /* @__PURE__ */ new Map(), e1 = /* @__PURE__ */ new Set();
  function Eo(t) {
    if (typeof t.getRootNode == "function") {
      var e = t.getRootNode();
      if (e.nodeType === 9 || e.nodeType === 11) return e;
    }
    return t.nodeType === 9 ? t : t.ownerDocument;
  }
  var Fi = gt.d;
  gt.d = {
    f: _b,
    r: yb,
    D: Sb,
    C: bb,
    L: Tb,
    m: Eb,
    X: Mb,
    S: xb,
    M: Ab
  };
  function _b() {
    var t = Fi.f(), e = _c();
    return t || e;
  }
  function yb(t) {
    var e = jl(t);
    e !== null && e.tag === 5 && e.type === "form" ? lv(e) : Fi.r(t);
  }
  var hr = typeof document > "u" ? null : document;
  function n1(t, e, n) {
    var l = hr;
    if (l && typeof e == "string" && e) {
      var r = Ql(e);
      r = 'link[rel="' + t + '"][href="' + r + '"]', typeof n == "string" && (r += '[crossorigin="' + n + '"]'), e1.has(r) || (e1.add(r), t = { rel: t, crossOrigin: n, href: e }, l.querySelector(r) === null && (e = l.createElement("link"), Cn(e, "link", t), en(e), l.head.appendChild(e)));
    }
  }
  function Sb(t) {
    Fi.D(t), n1("dns-prefetch", t, null);
  }
  function bb(t, e) {
    Fi.C(t, e), n1("preconnect", t, e);
  }
  function Tb(t, e, n) {
    Fi.L(t, e, n);
    var l = hr;
    if (l && t && e) {
      var r = 'link[rel="preload"][as="' + Ql(e) + '"]';
      e === "image" && n && n.imageSrcSet ? (r += '[imagesrcset="' + Ql(
        n.imageSrcSet
      ) + '"]', typeof n.imageSizes == "string" && (r += '[imagesizes="' + Ql(
        n.imageSizes
      ) + '"]')) : r += '[href="' + Ql(t) + '"]';
      var s = r;
      switch (e) {
        case "style":
          s = dr(t);
          break;
        case "script":
          s = mr(t);
      }
      if (!(Wl.has(s) || (t = N(
        {
          rel: "preload",
          href: e === "image" && n && n.imageSrcSet ? void 0 : t,
          as: e
        },
        n
      ), Wl.set(s, t), l.querySelector(r) !== null || e === "style" && l.querySelector(xo(s)) || e === "script" && l.querySelector(Mo(s))))) {
        var m = l.createElement("link");
        Cn(m, "link", t), e === "style" && (m[ke] = !0, m.onload = m.onerror = function() {
          gm(m);
        }), en(m), l.head.appendChild(m);
      }
    }
  }
  function Eb(t, e) {
    Fi.m(t, e);
    var n = hr;
    if (n && t) {
      var l = e && typeof e.as == "string" ? e.as : "script", r = 'link[rel="modulepreload"][as="' + Ql(l) + '"][href="' + Ql(t) + '"]', s = r;
      switch (l) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          s = mr(t);
      }
      if (!Wl.has(s) && (t = N({ rel: "modulepreload", href: t }, e), Wl.set(s, t), n.querySelector(r) === null)) {
        switch (l) {
          case "audioworklet":
          case "paintworklet":
          case "serviceworker":
          case "sharedworker":
          case "worker":
          case "script":
            if (n.querySelector(Mo(s)))
              return;
        }
        l = n.createElement("link"), Cn(l, "link", t), en(l), n.head.appendChild(l);
      }
    }
  }
  function xb(t, e, n) {
    Fi.S(t, e, n);
    var l = hr;
    if (l && t) {
      var r = gi(l).hoistableStyles, s = dr(t);
      e = e || "default";
      var m = r.get(s);
      if (!m) {
        var y = { loading: 0, preload: null };
        if (m = l.querySelector(
          xo(s)
        ))
          y.loading = 5;
        else {
          t = N(
            { rel: "stylesheet", href: t, "data-precedence": e },
            n
          ), (n = Wl.get(s)) && Vd(t, n);
          var x = m = l.createElement("link");
          en(x), Cn(x, "link", t), x._p = new Promise(function(U, G) {
            x.onload = U, x.onerror = G;
          }), x.addEventListener("load", function() {
            y.loading |= 1;
          }), x.addEventListener("error", function() {
            y.loading |= 2;
          }), y.loading |= 4, Mc(m, e, l);
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
    Fi.X(t, e);
    var n = hr;
    if (n && t) {
      var l = gi(n).hoistableScripts, r = mr(t), s = l.get(r);
      s || (s = n.querySelector(Mo(r)), s || (t = N({ src: t, async: !0 }, e), (e = Wl.get(r)) && Gd(t, e), s = n.createElement("script"), en(s), Cn(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, l.set(r, s));
    }
  }
  function Ab(t, e) {
    Fi.M(t, e);
    var n = hr;
    if (n && t) {
      var l = gi(n).hoistableScripts, r = mr(t), s = l.get(r);
      s || (s = n.querySelector(Mo(r)), s || (t = N({ src: t, async: !0, type: "module" }, e), (e = Wl.get(r)) && Gd(t, e), s = n.createElement("script"), en(s), Cn(s, "link", t), n.head.appendChild(s)), s = {
        type: "script",
        instance: s,
        count: 1,
        state: null
      }, l.set(r, s));
    }
  }
  function l1(t, e, n, l) {
    var r = (r = bt.current) ? Eo(r) : null;
    if (!r) throw Error(a(446));
    switch (t) {
      case "meta":
      case "title":
        return null;
      case "style":
        return typeof n.precedence == "string" && typeof n.href == "string" ? (n = dr(n.href), e = gi(
          r
        ).hoistableStyles, l = e.get(n), l || (l = {
          type: "style",
          instance: null,
          count: 0,
          state: null
        }, e.set(n, l)), l) : { type: "void", instance: null, count: 0, state: null };
      case "link":
        if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
          t = dr(n.href);
          var s = gi(
            r
          ).hoistableStyles, m = s.get(t);
          if (m || (r = r.ownerDocument || r, m = {
            type: "stylesheet",
            instance: null,
            count: 0,
            state: { loading: 0, preload: null }
          }, s.set(t, m), (s = r.querySelector(
            xo(t)
          )) ? s._p || (m.instance = s, m.state.loading = 5) : (s = Wl.get(t), s || (s = {
            rel: "preload",
            as: "style",
            href: n.href,
            crossOrigin: n.crossOrigin,
            integrity: n.integrity,
            media: n.media,
            hrefLang: n.hrefLang,
            referrerPolicy: n.referrerPolicy
          }, Wl.set(t, s)), wb(
            r,
            t,
            s,
            m.state
          ))), e && l === null)
            throw Error(a(528, ""));
          return m;
        }
        if (e && l !== null)
          throw Error(a(529, ""));
        return null;
      case "script":
        return e = n.async, n = n.src, typeof n == "string" && e && typeof e != "function" && typeof e != "symbol" ? (n = mr(n), e = gi(
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
  function dr(t) {
    return 'href="' + Ql(t) + '"';
  }
  function xo(t) {
    return 'link[rel="stylesheet"][' + t + "]";
  }
  function i1(t) {
    return N({}, t, {
      "data-precedence": t.precedence,
      precedence: null
    });
  }
  function wb(t, e, n, l) {
    if (e = t.querySelector(
      'link[rel="preload"][as="style"][' + e + "]"
    )) {
      if (e[ke] !== !0) {
        l.loading = 1;
        return;
      }
    } else
      e = t.createElement("link"), e[ke] = !0, e.onload = e.onerror = gm.bind(null, e), Cn(e, "link", n), en(e), t.head.appendChild(e);
    l.preload = e, e.addEventListener("load", function() {
      return l.loading |= 1;
    }), e.addEventListener("error", function() {
      return l.loading |= 2;
    });
  }
  function mr(t) {
    return '[src="' + Ql(t) + '"]';
  }
  function Mo(t) {
    return "script[async]" + t;
  }
  function a1(t, e, n) {
    if (e.count++, e.instance === null)
      switch (e.type) {
        case "style":
          var l = t.querySelector(
            'style[data-href~="' + Ql(n.href) + '"]'
          );
          if (l)
            return e.instance = l, en(l), l;
          var r = N({}, n, {
            "data-href": n.href,
            "data-precedence": n.precedence,
            href: null,
            precedence: null
          });
          return l = (t.ownerDocument || t).createElement(
            "style"
          ), en(l), Cn(l, "style", r), Mc(l, n.precedence, t), e.instance = l;
        case "stylesheet":
          r = dr(n.href);
          var s = t.querySelector(
            xo(r)
          );
          if (s)
            return e.state.loading |= 4, e.instance = s, en(s), s;
          l = i1(n), (r = Wl.get(r)) && Vd(l, r), s = (t.ownerDocument || t).createElement("link"), en(s);
          var m = s;
          return m._p = new Promise(function(y, x) {
            m.onload = y, m.onerror = x;
          }), Cn(s, "link", l), e.state.loading |= 4, Mc(s, n.precedence, t), e.instance = s;
        case "script":
          return s = mr(n.src), (r = t.querySelector(
            Mo(s)
          )) ? (e.instance = r, en(r), r) : (l = n, (r = Wl.get(s)) && (l = N({}, n), Gd(l, r)), t = t.ownerDocument || t, r = t.createElement("script"), en(r), Cn(r, "link", l), t.head.appendChild(r), e.instance = r);
        case "void":
          return null;
        default:
          throw Error(a(443, e.type));
      }
    else
      e.type === "stylesheet" && (e.state.loading & 4) === 0 && (l = e.instance, e.state.loading |= 4, Mc(l, n.precedence, t));
    return e.instance;
  }
  function Mc(t, e, n) {
    for (var l = n.querySelectorAll(
      'link[rel="stylesheet"][data-precedence],style[data-precedence]'
    ), r = l.length ? l[l.length - 1] : null, s = r, m = 0; m < l.length; m++) {
      var y = l[m];
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
  var Ac = null;
  function u1(t, e, n) {
    if (Ac === null) {
      var l = /* @__PURE__ */ new Map(), r = Ac = /* @__PURE__ */ new Map();
      r.set(n, l);
    } else
      r = Ac, l = r.get(n), l || (l = /* @__PURE__ */ new Map(), r.set(n, l));
    if (l.has(t)) return l;
    for (l.set(t, null), n = n.getElementsByTagName(t), r = 0; r < n.length; r++) {
      var s = n[r];
      if (!(s[Je] || s[Le] || t === "link" && s.getAttribute("rel") === "stylesheet") && s.namespaceURI !== "http://www.w3.org/2000/svg") {
        var m = s.getAttribute(e) || "";
        m = t + m;
        var y = l.get(m);
        y ? y.push(s) : l.set(m, [s]);
      }
    }
    return l;
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
  function r1(t, e) {
    return t === "img" && e.src != null && e.src !== "" && e.onLoad == null && e.loading !== "lazy";
  }
  function o1(t) {
    return !(t.type === "stylesheet" && (t.state.loading & 3) === 0);
  }
  function s1(t) {
    return (t.width || 100) * (t.height || 100) * (typeof devicePixelRatio == "number" ? devicePixelRatio : 1) * 0.25;
  }
  function c1(t, e) {
    typeof e.decode == "function" && (t.imgCount++, e.complete || (t.imgBytes += s1(e), t.suspenseyImages.push(e)), t = Cb.bind(t), e.decode().then(t, t));
  }
  function Rb(t, e, n, l) {
    if (n.type === "stylesheet" && (typeof l.media != "string" || matchMedia(l.media).matches !== !1) && (n.state.loading & 4) === 0) {
      if (n.instance === null) {
        var r = dr(l.href), s = e.querySelector(
          xo(r)
        );
        if (s) {
          e = s._p, e !== null && typeof e == "object" && typeof e.then == "function" && (t.count++, t = Ao.bind(t), e.then(t, t)), n.state.loading |= 4, n.instance = s, en(s);
          return;
        }
        s = e.ownerDocument || e, l = i1(l), (r = Wl.get(r)) && Vd(l, r), s = s.createElement("link"), en(s);
        var m = s;
        m._p = new Promise(function(y, x) {
          m.onload = y, m.onerror = x;
        }), Cn(s, "link", l), n.instance = s;
      }
      t.stylesheets === null && (t.stylesheets = /* @__PURE__ */ new Map()), t.stylesheets.set(n, e), (e = n.state.preload) && (n.state.loading & 3) === 0 && (t.count++, n = Ao.bind(t), e.addEventListener("load", n), e.addEventListener("error", n));
    }
  }
  var wc = 0;
  function zb(t, e) {
    return t.stylesheets && t.count === 0 && Rc(t, t.stylesheets), 0 < t.count || 0 < t.imgCount ? function(n) {
      var l = setTimeout(function() {
        if (t.stylesheets && Rc(t, t.stylesheets), t.unsuspend) {
          var s = t.unsuspend;
          t.unsuspend = null, s();
        }
      }, 6e4 + e);
      0 < t.imgBytes && wc === 0 && (wc = 62500 * J2());
      var r = setTimeout(
        function() {
          if (t.waitingForImages = !1, t.count === 0 && (t.stylesheets && Rc(t, t.stylesheets), t.unsuspend)) {
            var s = t.unsuspend;
            t.unsuspend = null, s();
          }
        },
        (t.imgBytes > wc ? 50 : 800) + e
      );
      return t.unsuspend = n, function() {
        t.unsuspend = null, clearTimeout(l), clearTimeout(r);
      };
    } : null;
  }
  function f1(t) {
    if (t.count === 0 && (t.imgCount === 0 || !t.waitingForImages)) {
      if (t.stylesheets) Rc(t, t.stylesheets);
      else if (t.unsuspend) {
        var e = t.unsuspend;
        t.unsuspend = null, e();
      }
    }
  }
  function Ao() {
    this.count--, f1(this);
  }
  function Cb() {
    this.imgCount--, f1(this);
  }
  var Oc = null;
  function Rc(t, e) {
    t.stylesheets = null, t.unsuspend !== null && (t.count++, Oc = /* @__PURE__ */ new Map(), e.forEach(Db, t), Oc = null, Ao.call(t));
  }
  function Db(t, e) {
    if (!(e.state.loading & 4)) {
      var n = Oc.get(t);
      if (n) var l = n.get(null);
      else {
        n = /* @__PURE__ */ new Map(), Oc.set(t, n);
        for (var r = t.querySelectorAll(
          "link[data-precedence],style[data-precedence]"
        ), s = 0; s < r.length; s++) {
          var m = r[s];
          (m.nodeName === "LINK" || m.getAttribute("media") !== "not all") && (n.set(m.dataset.precedence, m), l = m);
        }
        l && n.set(null, l);
      }
      r = e.instance, m = r.getAttribute("data-precedence"), s = n.get(m) || l, s === l && n.set(null, r), n.set(m, r), this.count++, l = Ao.bind(this), r.addEventListener("load", l), r.addEventListener("error", l), s ? s.parentNode.insertBefore(r, s.nextSibling) : (t = t.nodeType === 9 ? t.head : t, t.insertBefore(r, t.firstChild)), e.state.loading |= 4;
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
  function Nb(t, e, n, l, r, s, m, y, x) {
    this.tag = 1, this.containerInfo = t, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = He(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = He(0), this.hiddenUpdates = He(null), this.identifierPrefix = l, this.onUncaughtError = r, this.onCaughtError = s, this.onRecoverableError = m, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = x, this.transitionTypes = null, this.incompleteTransitions = /* @__PURE__ */ new Map();
  }
  function h1(t, e, n, l, r, s, m, y, x, U, G, I) {
    return t = new Nb(
      t,
      e,
      n,
      m,
      x,
      U,
      G,
      I,
      y
    ), e = 1, s === !0 && (e |= 24), s = il(3, null, null, e), t.current = s, s.stateNode = t, e = ih(), e.refCount++, t.pooledCache = e, e.refCount++, s.memoizedState = {
      element: l,
      isDehydrated: n,
      cache: e
    }, oh(s), t;
  }
  function d1(t) {
    return t ? (t = Vu, t) : Vu;
  }
  function m1(t, e, n, l, r, s) {
    r = d1(r), l.context === null ? l.context = r : l.pendingContext = r, l = sa(e), l.payload = { element: n }, s = s === void 0 ? null : s, s !== null && (l.callback = s), n = ca(t, l, e), n !== null && (ol(n, t, e), no(n, t, e));
  }
  function g1(t, e) {
    if (t = t.memoizedState, t !== null && t.dehydrated !== null) {
      var n = t.retryLane;
      t.retryLane = n !== 0 && n < e ? n : e;
    }
  }
  function Qd(t, e) {
    g1(t, e), (t = t.alternate) && g1(t, e);
  }
  function v1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ja(t, 67108864);
      e !== null && ol(e, t, 67108864), Qd(t, 67108864);
    }
  }
  function p1(t) {
    if (t.tag === 13 || t.tag === 31) {
      var e = Ml();
      e = mi(e);
      var n = Ja(t, e);
      n !== null && ol(n, t, e), Qd(t, e);
    }
  }
  var vr = !0;
  function Ub(t, e, n, l) {
    var r = ot.T;
    ot.T = null;
    var s = gt.p;
    try {
      gt.p = 2, Zd(t, e, n, l);
    } finally {
      gt.p = s, ot.T = r;
    }
  }
  function Bb(t, e, n, l) {
    var r = ot.T;
    ot.T = null;
    var s = gt.p;
    try {
      gt.p = 8, Zd(t, e, n, l);
    } finally {
      gt.p = s, ot.T = r;
    }
  }
  function Zd(t, e, n, l) {
    if (vr) {
      var r = Kd(l);
      if (r === null)
        Ad(
          t,
          e,
          l,
          zc,
          n
        ), y1(t, l);
      else if (Lb(
        r,
        t,
        e,
        n,
        l
      ))
        l.stopPropagation();
      else if (y1(t, l), e & 4 && -1 < Hb.indexOf(t)) {
        for (; r !== null; ) {
          var s = jl(r);
          if (s !== null)
            switch (s.tag) {
              case 3:
                if (s = s.stateNode, s.current.memoizedState.isDehydrated) {
                  var m = ne(s.pendingLanes);
                  if (m !== 0) {
                    var y = s;
                    for (y.pendingLanes |= 2, y.entangledLanes |= 2; m; ) {
                      var x = 1 << 31 - lt(m);
                      y.entanglements[1] |= x, m &= ~x;
                    }
                    Ai(s), (ge & 6) === 0 && (gc = qt() + 500, yo(0));
                  }
                }
                break;
              case 31:
              case 13:
                y = Ja(s, 2), y !== null && ol(y, s, 2), _c(), Qd(s, 2);
            }
          if (s = Kd(l), s === null && Ad(
            t,
            e,
            l,
            zc,
            n
          ), s === r) break;
          r = s;
        }
        r !== null && l.stopPropagation();
      } else
        Ad(
          t,
          e,
          l,
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
  function _1(t) {
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
        switch (Xl()) {
          case hn:
            return 2;
          case An:
            return 8;
          case dn:
          case Vl:
            return 32;
          case Gl:
            return 268435456;
          default:
            return 32;
        }
      default:
        return 32;
    }
  }
  var Jd = !1, Ta = null, Ea = null, xa = null, wo = /* @__PURE__ */ new Map(), Oo = /* @__PURE__ */ new Map(), Ma = [], Hb = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
    " "
  );
  function y1(t, e) {
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
        wo.delete(e.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Oo.delete(e.pointerId);
    }
  }
  function Ro(t, e, n, l, r, s) {
    return t === null || t.nativeEvent !== s ? (t = {
      blockedOn: e,
      domEventName: n,
      eventSystemFlags: l,
      nativeEvent: s,
      targetContainers: [r]
    }, e !== null && (e = jl(e), e !== null && v1(e)), t) : (t.eventSystemFlags |= l, e = t.targetContainers, r !== null && e.indexOf(r) === -1 && e.push(r), t);
  }
  function Lb(t, e, n, l, r) {
    switch (e) {
      case "focusin":
        return Ta = Ro(
          Ta,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "dragenter":
        return Ea = Ro(
          Ea,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "mouseover":
        return xa = Ro(
          xa,
          t,
          e,
          n,
          l,
          r
        ), !0;
      case "pointerover":
        var s = r.pointerId;
        return wo.set(
          s,
          Ro(
            wo.get(s) || null,
            t,
            e,
            n,
            l,
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
            l,
            r
          )
        ), !0;
    }
    return !1;
  }
  function S1(t) {
    var e = Qn(t.target);
    if (e !== null) {
      var n = c(e);
      if (n !== null) {
        if (e = n.tag, e === 13) {
          if (e = h(n), e !== null) {
            t.blockedOn = e, _n(t.priority, function() {
              p1(n);
            });
            return;
          }
        } else if (e === 31) {
          if (e = d(n), e !== null) {
            t.blockedOn = e, _n(t.priority, function() {
              p1(n);
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
        var l = new n.constructor(
          n.type,
          n
        );
        zf = l, n.target.dispatchEvent(l), zf = null;
      } else
        return e = jl(n), e !== null && v1(e), t.blockedOn = n, !1;
      e.shift();
    }
    return !0;
  }
  function b1(t, e, n) {
    Cc(t) && n.delete(e);
  }
  function Yb() {
    Jd = !1, Ta !== null && Cc(Ta) && (Ta = null), Ea !== null && Cc(Ea) && (Ea = null), xa !== null && Cc(xa) && (xa = null), wo.forEach(b1), Oo.forEach(b1);
  }
  function Dc(t, e) {
    t.blockedOn === e && (t.blockedOn = null, Jd || (Jd = !0, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      Yb
    )));
  }
  var Nc = null;
  function T1(t) {
    Nc !== t && (Nc = t, f.unstable_scheduleCallback(
      f.unstable_NormalPriority,
      function() {
        Nc === t && (Nc = null);
        for (var e = 0; e < t.length; e += 3) {
          var n = t[e], l = t[e + 1], r = t[e + 2];
          if (typeof l != "function") {
            if (Fd(l || n) === null)
              continue;
            break;
          }
          var s = jl(n);
          s !== null && (t.splice(e, 3), e -= 3, Rh(
            s,
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
  function pr(t) {
    function e(x) {
      return Dc(x, t);
    }
    Ta !== null && Dc(Ta, t), Ea !== null && Dc(Ea, t), xa !== null && Dc(xa, t), wo.forEach(e), Oo.forEach(e);
    for (var n = 0; n < Ma.length; n++) {
      var l = Ma[n];
      l.blockedOn === t && (l.blockedOn = null);
    }
    for (; 0 < Ma.length && (n = Ma[0], n.blockedOn === null); )
      S1(n), n.blockedOn === null && Ma.shift();
    if (n = (t.ownerDocument || t).$$reactFormReplay, n != null)
      for (l = 0; l < n.length; l += 3) {
        var r = n[l], s = n[l + 1], m = r[Ue] || null;
        if (typeof s == "function")
          m || T1(n);
        else if (m) {
          var y = null;
          if (s && s.hasAttribute("formAction")) {
            if (r = s, m = s[Ue] || null)
              y = m.formAction;
            else if (Fd(r) !== null) continue;
          } else y = m.action;
          typeof y == "function" ? n[l + 1] = y : (n.splice(l, 3), l -= 3), T1(n);
        }
      }
  }
  function E1() {
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
      r !== null && (r(), r = null), l || setTimeout(n, 20);
    }
    function n() {
      if (!l && !navigation.transition) {
        var s = navigation.currentEntry;
        s && s.url != null && navigation.navigate(s.url, {
          state: s.getState(),
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
  function kd(t) {
    this._internalRoot = t;
  }
  Uc.prototype.render = kd.prototype.render = function(t) {
    var e = this._internalRoot;
    if (e === null) throw Error(a(409));
    var n = e.current, l = Ml();
    m1(n, l, t, e, null, null);
  }, Uc.prototype.unmount = kd.prototype.unmount = function() {
    var t = this._internalRoot;
    if (t !== null) {
      this._internalRoot = null;
      var e = t.containerInfo;
      m1(t.current, 2, null, t, null, null), _c(), e[Fe] = null;
    }
  };
  function Uc(t) {
    this._internalRoot = t;
  }
  Uc.prototype.unstable_scheduleHydration = function(t) {
    if (t) {
      var e = Ne();
      t = { blockedOn: null, target: t, priority: e };
      for (var n = 0; n < Ma.length && e !== 0 && e < Ma[n].priority; n++) ;
      Ma.splice(n, 0, t), n === 0 && S1(t);
    }
  };
  var x1 = i.version;
  if (x1 !== "19.3.1")
    throw Error(
      a(
        527,
        x1,
        "19.3.1"
      )
    );
  gt.findDOMNode = function(t) {
    var e = t._reactInternals;
    if (e === void 0)
      throw typeof t.render == "function" ? Error(a(188)) : (t = Object.keys(t).join(","), Error(a(268, t)));
    return t = v(e), t = t !== null ? p(t) : null, t = t === null ? null : t.stateNode, t;
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
    var n = !1, l = "", r = dv, s = mv, m = gv;
    return e != null && (e.unstable_strictMode === !0 && (n = !0), e.identifierPrefix !== void 0 && (l = e.identifierPrefix), e.onUncaughtError !== void 0 && (r = e.onUncaughtError), e.onCaughtError !== void 0 && (s = e.onCaughtError), e.onRecoverableError !== void 0 && (m = e.onRecoverableError)), e = h1(
      t,
      1,
      !1,
      null,
      null,
      n,
      l,
      null,
      r,
      s,
      m,
      E1
    ), t[Fe] = e.current, Md(t), new kd(e);
  }, Co.hydrateRoot = function(t, e, n) {
    if (!o(t)) throw Error(a(299));
    var l = !1, r = "", s = dv, m = mv, y = gv, x = null;
    return n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (r = n.identifierPrefix), n.onUncaughtError !== void 0 && (s = n.onUncaughtError), n.onCaughtError !== void 0 && (m = n.onCaughtError), n.onRecoverableError !== void 0 && (y = n.onRecoverableError), n.formState !== void 0 && (x = n.formState)), e = h1(
      t,
      1,
      !0,
      e,
      n ?? null,
      l,
      r,
      x,
      s,
      m,
      y,
      E1
    ), e.context = d1(null), n = e.current, l = Ml(), l = mi(l), r = sa(l), r.callback = null, ca(n, r, l), n = l, e.current.lanes = n, Xe(e, n), Ai(e), t[Fe] = e.current, Md(t), new Uc(e);
  }, Co.version = "19.3.1", Co;
}
var U1;
function Jb() {
  if (U1) return Wd.exports;
  U1 = 1;
  function f() {
    if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(f);
      } catch (i) {
        console.error(i);
      }
  }
  return f(), Wd.exports = Fb(), Wd.exports;
}
var kb = Jb(), Pb = z_(), B1 = "1.3.27";
function C_(f, i, u) {
  return Math.max(f, Math.min(i, u));
}
function $b(f, i, u) {
  return (1 - u) * f + u * i;
}
function Wb(f, i, u, a) {
  return $b(f, i, 1 - Math.exp(-u * a));
}
function Ib(f, i) {
  return (f % i + i) % i;
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
    let i = !1;
    if (this.duration && this.easing) {
      this.currentTime += f;
      const u = C_(0, this.currentTime / this.duration, 1);
      i = u >= 1;
      const a = i ? 1 : this.easing(u);
      this.value = this.from + (this.to - this.from) * a;
    } else this.lerp ? (this.value = Wb(this.value, this.to, this.lerp * 60, f), Math.round(this.value) === Math.round(this.to) && (this.value = this.to, i = !0)) : (this.value = this.to, i = !0);
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
  fromTo(f, i, { lerp: u, duration: a, easing: o, onStart: c, onUpdate: h }) {
    this.from = this.value = f, this.to = i, this.lerp = u, this.duration = a, this.easing = o, this.currentTime = 0, this.isRunning = !0, c?.(), this.onUpdate = h;
  }
};
function eT(f, i) {
  let u;
  return function(...a) {
    clearTimeout(u), u = setTimeout(() => {
      u = void 0, f.apply(this, a);
    }, i);
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
  constructor(f, i, { autoResize: u = !0, debounce: a = 250 } = {}) {
    this.wrapper = f, this.content = i, u && (this.debouncedResize = eT(this.resize, a), this.wrapper instanceof Window ? window.addEventListener("resize", this.debouncedResize) : (this.wrapperResizeObserver = new ResizeObserver(this.debouncedResize), this.wrapperResizeObserver.observe(this.wrapper)), this.contentResizeObserver = new ResizeObserver(this.debouncedResize), this.contentResizeObserver.observe(this.content)), this.resize();
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
  emit(f, ...i) {
    const u = this.events[f] || [];
    for (let a = 0, o = u.length; a < o; a++) u[a]?.(...i);
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
const lT = 100 / 6, wa = { passive: !1 };
function H1(f, i) {
  return f === 1 ? lT : f === 2 ? i : 1;
}
var iT = class {
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
  constructor(f, i = {
    wheelMultiplier: 1,
    touchMultiplier: 1
  }) {
    this.element = f, this.options = i, window.addEventListener("resize", this.onWindowResize), this.onWindowResize(), this.element.addEventListener("wheel", this.onWheel, wa), this.element.addEventListener("touchstart", this.onTouchStart, wa), this.element.addEventListener("touchmove", this.onTouchMove, wa), this.element.addEventListener("touchend", this.onTouchEnd, wa);
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
    this.emitter.destroy(), window.removeEventListener("resize", this.onWindowResize), this.element.removeEventListener("wheel", this.onWheel, wa), this.element.removeEventListener("touchstart", this.onTouchStart, wa), this.element.removeEventListener("touchmove", this.onTouchMove, wa), this.element.removeEventListener("touchend", this.onTouchEnd, wa);
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
    const { clientX: i, clientY: u } = f.targetTouches ? f.targetTouches[0] : f, a = -(i - this.touchStart.x) * this.options.touchMultiplier, o = -(u - this.touchStart.y) * this.options.touchMultiplier;
    this.touchStart.x = i, this.touchStart.y = u, this.lastDelta = {
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
    let { deltaX: i, deltaY: u, deltaMode: a } = f;
    const o = H1(a, this.window.width), c = H1(a, this.window.height);
    i *= o, u *= c, i *= this.options.wheelMultiplier, u *= this.options.wheelMultiplier, this.emitter.emit("scroll", {
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
const L1 = (f) => Math.min(1, 1.001 - 2 ** (-10 * f));
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
  constructor({ wrapper: f = window, content: i = document.documentElement, eventsTarget: u = f, smoothWheel: a = !0, syncTouch: o = !1, syncTouchLerp: c = 0.075, touchInertiaExponent: h = 1.7, duration: d, easing: g, lerp: v = 0.1, infinite: p = !1, orientation: _ = "vertical", gestureOrientation: S = _ === "horizontal" ? "both" : "vertical", touchMultiplier: b = 1, wheelMultiplier: M = 1, autoResize: T = !0, prevent: R, virtualScroll: j, overscroll: X = !0, autoRaf: Z = !1, anchors: Y = !1, autoToggle: Q = !1, allowNestedScroll: tt = !1, __experimental__naiveDimensions: N = !1, naiveDimensions: K = N, stopInertiaOnNavigate: P = !1, respectReducedMotion: V = !0 } = {}) {
    window.lenisVersion = B1, window.lenis || (window.lenis = {}), window.lenis.version = B1, _ === "horizontal" && (window.lenis.horizontal = !0), o === !0 && (window.lenis.touch = !0), this.isIos = /(iPad|iPhone|iPod)/g.test(navigator.userAgent), (!f || f === document.documentElement) && (f = window), typeof d == "number" && typeof g != "function" ? g = L1 : typeof g == "function" && typeof d != "number" && (d = 1), this.options = {
      wrapper: f,
      content: i,
      eventsTarget: u,
      smoothWheel: a,
      syncTouch: o,
      syncTouchLerp: c,
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
      prevent: R,
      virtualScroll: j,
      overscroll: X,
      autoRaf: Z,
      anchors: Y,
      autoToggle: Q,
      allowNestedScroll: tt,
      naiveDimensions: K,
      stopInertiaOnNavigate: P,
      respectReducedMotion: V
    }, this.dimensions = new nT(f, i, { autoResize: T }), this.updateClassName(), this.targetScroll = this.animatedScroll = this.actualScroll, this.options.wrapper.addEventListener("scroll", this.onNativeScroll), this.options.wrapper.addEventListener("scrollend", this.onScrollEnd, { capture: !0 }), (this.options.anchors || this.options.stopInertiaOnNavigate) && this.options.wrapper.addEventListener("click", this.onClick), this.options.wrapper.addEventListener("pointerdown", this.onPointerDown), this.virtualScroll = new iT(u, {
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
      const a = i.find((o) => u.host === o.host && u.pathname === o.pathname && o.hash);
      if (a) {
        const o = typeof this.options.anchors == "object" && this.options.anchors ? this.options.anchors : void 0, c = decodeURIComponent(a.hash);
        this.scrollTo(c, o);
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
    const o = a[0], c = a[a.length - 1], h = 40, d = Math.hypot(u.clientX - o.left, u.clientY - o.top) <= h, g = Math.hypot(u.clientX - c.right, u.clientY - c.bottom) <= h;
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
    const o = a.type.includes("touch"), c = a.type.includes("wheel");
    if (o && this.isIos && (a.type === "touchstart" && (this._isDraggingSelection = this.isTouchOnSelectionHandle(a)), this._isDraggingSelection)) {
      a.type === "touchend" && (this._isDraggingSelection = !1);
      return;
    }
    this.isTouching = a.type === "touchstart" || a.type === "touchmove";
    const h = i === 0 && u === 0;
    if (this.options.syncTouch && o && a.type === "touchstart" && h && !this.isStopped && !this.isLocked) {
      this.reset();
      return;
    }
    const d = this.options.gestureOrientation === "vertical" && u === 0 || this.options.gestureOrientation === "horizontal" && i === 0;
    if (h || d) return;
    let g = a.composedPath();
    g = g.slice(0, g.indexOf(this.rootElement));
    const v = this.options.prevent, p = Math.abs(i) >= Math.abs(u) ? "horizontal" : "vertical";
    if (g.find((M) => M instanceof HTMLElement && (typeof v == "function" && v?.(M) || M.hasAttribute?.("data-lenis-prevent") || p === "vertical" && M.hasAttribute?.("data-lenis-prevent-vertical") || p === "horizontal" && M.hasAttribute?.("data-lenis-prevent-horizontal") || o && M.hasAttribute?.("data-lenis-prevent-touch") || c && M.hasAttribute?.("data-lenis-prevent-wheel") || this.options.allowNestedScroll && this.hasNestedScroll(M, {
      deltaX: i,
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
    this.options.gestureOrientation === "both" ? _ = Math.abs(u) > Math.abs(i) ? u : i : this.options.gestureOrientation === "horizontal" && (_ = i), (!this.options.overscroll || this.options.infinite || this.options.wrapper !== window && this.limit > 0 && (this.animatedScroll > 0 && this.animatedScroll < this.limit || this.animatedScroll === 0 && u > 0 || this.animatedScroll === this.limit && u < 0)) && (a.lenisStopPropagation = !0), a.cancelable && a.preventDefault();
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
  scrollTo(f, { offset: i = 0, immediate: u = !1, lock: a = !1, programmatic: o = !0, lerp: c = o ? this.options.lerp : void 0, duration: h = o ? this.options.duration : void 0, easing: d = o ? this.options.easing : void 0, onStart: g, onComplete: v, force: p = !1, userData: _ } = {}) {
    if (this.prefersReducedMotion && (o ? u = !0 : (c = 1, h = void 0, d = void 0)), (this.isStopped || this.isLocked) && !p) return;
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
          const Y = this.rootElement.getBoundingClientRect();
          b -= this.isHorizontal ? Y.left : Y.top;
        }
        const T = M.getBoundingClientRect(), R = getComputedStyle(M), j = this.isHorizontal ? Number.parseFloat(R.scrollMarginLeft) : Number.parseFloat(R.scrollMarginTop), X = getComputedStyle(this.rootElement), Z = this.isHorizontal ? Number.parseFloat(X.scrollPaddingLeft) : Number.parseFloat(X.scrollPaddingTop);
        S = (this.isHorizontal ? T.left : T.top) + this.animatedScroll - (Number.isNaN(j) ? 0 : j) - (Number.isNaN(Z) ? 0 : Z);
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
        g?.(this), v?.(this);
        return;
      }
      if (this.userData = _ ?? {}, u) {
        this.animatedScroll = this.targetScroll = S, this.setScroll(this.scroll), this.reset(), this.preventNextNativeScrollEvent(), this.emit(), v?.(this), this.userData = {}, requestAnimationFrame(() => {
          this.dispatchScrollendEvent();
        });
        return;
      }
      o || (this.targetScroll = S), typeof h == "number" && typeof d != "function" ? d = L1 : typeof d == "function" && typeof h != "number" && (h = 1), this.animate.fromTo(this.animatedScroll, S, {
        duration: h,
        easing: d,
        lerp: c,
        onStart: () => {
          a && (this.isLocked = !0), this.isScrolling = "smooth", g?.(this);
        },
        onUpdate: (M, T) => {
          this.isScrolling = "smooth", this.lastVelocity = this.velocity, this.velocity = M - this.animatedScroll, this.direction = Math.sign(this.velocity), this.animatedScroll = M, this.setScroll(this.scroll), o && (this.targetScroll = M), T || this.emit(), T && (this.reset(), this.emit(), v?.(this), this.userData = {}, requestAnimationFrame(() => {
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
    const o = f._lenis;
    let c, h, d, g, v, p, _, S, b, M;
    if (a - (o.time ?? 0) > 2e3) {
      o.time = Date.now();
      const tt = window.getComputedStyle(f);
      if (o.computedStyle = tt, c = [
        "auto",
        "overlay",
        "scroll"
      ].includes(tt.overflowX), h = [
        "auto",
        "overlay",
        "scroll"
      ].includes(tt.overflowY), v = ["auto"].includes(tt.overscrollBehaviorX), p = ["auto"].includes(tt.overscrollBehaviorY), o.hasOverflowX = c, o.hasOverflowY = h, !(c || h)) return !1;
      _ = f.scrollWidth, S = f.scrollHeight, b = f.clientWidth, M = f.clientHeight, d = _ > b, g = S > M, o.isScrollableX = d, o.isScrollableY = g, o.scrollWidth = _, o.scrollHeight = S, o.clientWidth = b, o.clientHeight = M, o.hasOverscrollBehaviorX = v, o.hasOverscrollBehaviorY = p;
    } else
      d = o.isScrollableX, g = o.isScrollableY, c = o.hasOverflowX, h = o.hasOverflowY, _ = o.scrollWidth, S = o.scrollHeight, b = o.clientWidth, M = o.clientHeight, v = o.hasOverscrollBehaviorX, p = o.hasOverscrollBehaviorY;
    if (!(c && d || h && g)) return !1;
    const T = Math.abs(i) >= Math.abs(u) ? "horizontal" : "vertical";
    let R, j, X, Z, Y, Q;
    if (T === "horizontal")
      R = Math.round(f.scrollLeft), j = _ - b, X = i, Z = c, Y = d, Q = v;
    else if (T === "vertical")
      R = Math.round(f.scrollTop), j = S - M, X = u, Z = h, Y = g, Q = p;
    else return !1;
    return !Q && (R >= j || R <= 0) ? !0 : (X > 0 ? R < j : R > 0) && Z && Y;
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
function Ji(f) {
  if (f === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return f;
}
function N_(f, i) {
  f.prototype = Object.create(i.prototype), f.prototype.constructor = f, f.__proto__ = i;
}
var Bl = {
  autoSleep: 120,
  force3D: "auto",
  nullTargetWarn: 1,
  units: {
    lineHeight: ""
  }
}, is = {
  duration: 0.5,
  overwrite: !1,
  delay: 0
}, G0, Un, qe, ni = 1e8, Ee = 1 / ni, _0 = Math.PI * 2, uT = _0 / 4, rT = 0, U_ = Math.sqrt, oT = Math.cos, sT = Math.sin, Mn = function(i) {
  return typeof i == "string";
}, We = function(i) {
  return typeof i == "function";
}, Ii = function(i) {
  return typeof i == "number";
}, j0 = function(i) {
  return typeof i > "u";
}, Ni = function(i) {
  return typeof i == "object";
}, hl = function(i) {
  return i !== !1;
}, Q0 = function() {
  return typeof window < "u";
}, Hc = function(i) {
  return We(i) || Mn(i);
}, B_ = typeof ArrayBuffer == "function" && ArrayBuffer.isView || function() {
}, Xn = Array.isArray, cT = /random\([^)]+\)/g, fT = /,\s*/g, Y1 = /(?:-?\.?\d|\.)+/gi, H_ = /[-+=.]*\d+[.e\-+]*\d*[e\-+]*\d*/g, xr = /[-+=.]*\d+[.e-]*\d*[a-z%]*/g, n0 = /[-+=.]*\d+\.?\d*(?:e-|e\+)?\d*/gi, L_ = /[+-]=-?[.\d]+/, hT = /[^,'"\[\]\s]+/gi, dT = /^[+\-=e\s\d]*\d+[.\d]*([a-z]*|%)\s*$/i, Qe, wi, y0, Z0, Hl = {}, rf = {}, Y_, q_ = function(i) {
  return (rf = Ur(i, Hl)) && vl;
}, K0 = function(i, u) {
  return console.warn("Invalid property", i, "set to", u, "Missing plugin? gsap.registerPlugin()");
}, as = function(i, u) {
  return !u && console.warn(i);
}, X_ = function(i, u) {
  return i && (Hl[i] = u) && rf && (rf[i] = u) || Hl;
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
}, F0 = {}, Ba = [], S0 = {}, V_, zl = {}, l0 = {}, q1 = 30, $c = [], J0 = "", k0 = function(i) {
  var u = i[0], a, o;
  if (Ni(u) || We(u) || (i = [i]), !(a = (u._gsap || {}).harness)) {
    for (o = $c.length; o-- && !$c[o].targetTest(u); )
      ;
    a = $c[o];
  }
  for (o = i.length; o--; )
    i[o] && (i[o]._gsap || (i[o]._gsap = new sy(i[o], a))) || i.splice(o, 1);
  return i;
}, Su = function(i) {
  return i._gsap || k0(li(i))[0]._gsap;
}, G_ = function(i, u, a) {
  return (a = i[u]) && We(a) ? i[u]() : j0(a) && i.getAttribute && i.getAttribute(u) || a;
}, dl = function(i, u) {
  return (i = i.split(",")).forEach(u) || i;
}, ln = function(i) {
  return Math.round(i * 1e5) / 1e5 || 0;
}, je = function(i) {
  return Math.round(i * 1e7) / 1e7 || 0;
}, wr = function(i, u) {
  var a = u.charAt(0), o = parseFloat(u.substr(2));
  return i = parseFloat(i), a === "+" ? i + o : a === "-" ? i - o : a === "*" ? i * o : i / o;
}, vT = function(i, u) {
  for (var a = u.length, o = 0; i.indexOf(u[o]) < 0 && ++o < a; )
    ;
  return o < a;
}, of = function() {
  var i = Ba.length, u = Ba.slice(0), a, o;
  for (S0 = {}, Ba.length = 0, a = 0; a < i; a++)
    o = u[a], o && o._lazy && (o.render(o._lazy[0], o._lazy[1], !0)._lazy = 0);
}, P0 = function(i) {
  return !!(i._initted || i._startAt || i.add);
}, j_ = function(i, u, a, o) {
  Ba.length && !Un && of(), i.render(u, a, !!(Un && u < 0 && P0(i))), Ba.length && !Un && of();
}, Q_ = function(i) {
  var u = parseFloat(i);
  return (u || u === 0) && (i + "").match(hT).length < 2 ? u : Mn(i) ? i.trim() : i;
}, Z_ = function(i) {
  return i;
}, Ll = function(i, u) {
  for (var a in u)
    a in i || (i[a] = u[a]);
  return i;
}, pT = function(i) {
  return function(u, a) {
    for (var o in a)
      o in u || o === "duration" && i || o === "ease" || (u[o] = a[o]);
  };
}, Ur = function(i, u) {
  for (var a in u)
    i[a] = u[a];
  return i;
}, X1 = function f(i, u) {
  for (var a in u)
    a !== "__proto__" && a !== "constructor" && a !== "prototype" && (i[a] = Ni(u[a]) ? f(i[a] || (i[a] = {}), u[a]) : u[a]);
  return i;
}, sf = function(i, u) {
  var a = {}, o;
  for (o in i)
    o in u || (a[o] = i[o]);
  return a;
}, Ko = function(i) {
  var u = i.parent || Qe, a = i.keyframes ? pT(Xn(i.keyframes)) : Ll;
  if (hl(i.inherit))
    for (; u; )
      a(i, u.vars.defaults), u = u.parent || u._dp;
  return i;
}, _T = function(i, u) {
  for (var a = i.length, o = a === u.length; o && a-- && i[a] === u[a]; )
    ;
  return a < 0;
}, K_ = function(i, u, a, o, c) {
  var h = i[o], d;
  if (c)
    for (d = u[c]; h && h[c] > d; )
      h = h._prev;
  return h ? (u._next = h._next, h._next = u) : (u._next = i[a], i[a] = u), u._next ? u._next._prev = u : i[o] = u, u._prev = h, u.parent = u._dp = i, u;
}, Tf = function(i, u, a, o) {
  a === void 0 && (a = "_first"), o === void 0 && (o = "_last");
  var c = u._prev, h = u._next;
  c ? c._next = h : i[a] === u && (i[a] = h), h ? h._prev = c : i[o] === u && (i[o] = c), u._next = u._prev = u.parent = null;
}, qa = function(i, u) {
  i.parent && (!u || i.parent.autoRemoveChildren) && i.parent.remove && i.parent.remove(i), i._act = 0;
}, bu = function(i, u) {
  if (i && (!u || u._end > i._dur || u._start < 0))
    for (var a = i; a; )
      a._dirty = 1, a = a.parent;
  return i;
}, yT = function(i) {
  for (var u = i.parent; u && u.parent; )
    u._dirty = 1, u.totalDuration(), u = u.parent;
  return i;
}, b0 = function(i, u, a, o) {
  return i._startAt && (Un ? i._startAt.revert(Pc) : i.vars.immediateRender && !i.vars.autoRevert || i._startAt.render(u, !0, o));
}, ST = function f(i) {
  return !i || i._ts && f(i.parent);
}, V1 = function(i) {
  return i._repeat ? Br(i._tTime, i = i.duration() + i._rDelay) * i : 0;
}, Br = function(i, u) {
  var a = Math.floor(i = je(i / u));
  return i && a === i ? a - 1 : a;
}, cf = function(i, u) {
  return (i - u._start) * u._ts + (u._ts >= 0 ? 0 : u._dirty ? u.totalDuration() : u._tDur);
}, Ef = function(i) {
  return i._end = je(i._start + (i._tDur / Math.abs(i._ts || i._rts || Ee) || 0));
}, xf = function(i, u) {
  var a = i._dp;
  return a && a.smoothChildTiming && i._ts && (i._start = je(a._time - (i._ts > 0 ? u / i._ts : ((i._dirty ? i.totalDuration() : i._tDur) - u) / -i._ts)), Ef(i), a._dirty || bu(a, i)), i;
}, F_ = function(i, u) {
  var a;
  if ((u._time || !u._dur && u._initted || u._start < i._time && (u._dur || !u.add)) && (a = cf(i.rawTime(), u), (!u._dur || gs(0, u.totalDuration(), a) - u._tTime > Ee) && u.render(a, !0)), bu(i, u)._dp && i._initted && i._time >= i._dur && i._ts) {
    if (i._dur < i.duration())
      for (a = i; a._dp; )
        a.rawTime() >= 0 && a.totalTime(a._tTime), a = a._dp;
    i._zTime = -Ee;
  }
}, Ri = function(i, u, a, o) {
  return u.parent && qa(u), u._start = je((Ii(a) ? a : !a && ff(u) && (!i._last || i._last._start >= i._time) ? i._last ? i._last._start : i._time : a || i !== Qe ? Il(i, a, u) : i._time) + u._delay), u._end = je(u._start + (u.totalDuration() / Math.abs(u.timeScale()) || 0)), K_(i, u, "_first", "_last", i._sort ? "_start" : 0), ff(u) || (i._recent = u), o || F_(i, u), i._ts < 0 && xf(i, i._tTime), i;
}, J_ = function(i, u) {
  return (Hl.ScrollTrigger || K0("scrollTrigger", u)) && Hl.ScrollTrigger.create(u, i);
}, k_ = function(i, u, a, o, c) {
  if (W0(i, u, c), !i._initted)
    return 1;
  if (!a && i._pt && !Un && (i._dur && i.vars.lazy !== !1 || !i._dur && i.vars.lazy) && V_ !== Dl.frame)
    return Ba.push(i), i._lazy = [c, o], 1;
}, bT = function f(i) {
  var u = i.parent;
  return u && u._ts && u._initted && !u._lock && (u.rawTime() < 0 || f(u));
}, ff = function(i) {
  var u = i.data;
  return u === "isFromStart" || u === "isStart";
}, TT = function(i, u, a, o) {
  var c = i.ratio, h = u < 0 || !u && (!i._start && bT(i) && !(!i._initted && ff(i)) || (i._ts < 0 || i._dp._ts < 0) && !ff(i)) ? 0 : 1, d = i._rDelay, g = 0, v, p, _;
  if (d && i._repeat && (g = gs(0, i._tDur, u), p = Br(g, d), i._yoyo && p & 1 && (h = 1 - h), p !== Br(i._tTime, d) && (c = 1 - h, i.vars.repeatRefresh && i._initted && i.invalidate())), h !== c || Un || o || i._zTime === Ee || !u && i._zTime) {
    if (!i._initted && k_(i, u, o, a, g))
      return;
    for (_ = i._zTime, i._zTime = u || (a ? Ee : 0), a || (a = u && !_), i.ratio = h, i._from && (h = 1 - h), i._time = 0, i._tTime = g, v = i._pt; v; )
      v.r(h, v.d), v = v._next;
    u < 0 && b0(i, u, a, !0), i._onUpdate && !a && Nl(i, "onUpdate"), g && i._repeat && !a && i.parent && Nl(i, "onRepeat"), (u >= i._tDur || u < 0) && i.ratio === h && (h && qa(i, 1), !a && !Un && (Nl(i, h ? "onComplete" : "onReverseComplete", !0), i._prom && i._prom()));
  } else i._zTime || (i._zTime = u);
}, ET = function(i, u, a) {
  var o;
  if (a > u)
    for (o = i._first; o && o._start <= a; ) {
      if (o.data === "isPause" && o._start > u)
        return o;
      o = o._next;
    }
  else
    for (o = i._last; o && o._start >= a; ) {
      if (o.data === "isPause" && o._start < u)
        return o;
      o = o._prev;
    }
}, Hr = function(i, u, a, o) {
  var c = i._repeat, h = je(u) || 0, d = i._tTime / i._tDur;
  return d && !o && (i._time *= h / i._dur), i._dur = h, i._tDur = c ? c < 0 ? 1e10 : je(h * (c + 1) + i._rDelay * c) : h, d > 0 && !o && xf(i, i._tTime = i._tDur * d), i.parent && Ef(i), a || bu(i.parent, i), i;
}, G1 = function(i) {
  return i instanceof cl ? bu(i) : Hr(i, i._dur);
}, xT = {
  _start: 0,
  endTime: us,
  totalDuration: us
}, Il = function f(i, u, a) {
  var o = i.labels, c = i._recent || xT, h = i.duration() >= ni ? c.endTime(!1) : i._dur, d, g, v;
  return Mn(u) && (isNaN(u) || u in o) ? (g = u.charAt(0), v = u.substr(-1) === "%", d = u.indexOf("="), g === "<" || g === ">" ? (d >= 0 && (u = u.replace(/=/, "")), (g === "<" ? c._start : c.endTime(c._repeat >= 0)) + (parseFloat(u.substr(1)) || 0) * (v ? (d < 0 ? c : a).totalDuration() / 100 : 1)) : d < 0 ? (u in o || (o[u] = h), o[u]) : (g = parseFloat(u.charAt(d - 1) + u.substr(d + 1)), v && a && (g = g / 100 * (Xn(a) ? a[0] : a).totalDuration()), d > 1 ? f(i, u.substr(0, d - 1), a) + g : h + g)) : u == null ? h : +u;
}, Fo = function(i, u, a) {
  var o = Ii(u[1]), c = (o ? 2 : 1) + (i < 2 ? 0 : 1), h = u[c], d, g;
  if (o && (h.duration = u[1]), h.parent = a, i) {
    for (d = h, g = a; g && !("immediateRender" in d); )
      d = g.vars.defaults || {}, g = hl(g.vars.inherit) && g.parent;
    h.immediateRender = hl(d.immediateRender), i < 2 ? h.runBackwards = 1 : h.startAt = u[c - 1];
  }
  return new fn(u[0], h, u[c + 1]);
}, ja = function(i, u) {
  return i || i === 0 ? u(i) : u;
}, gs = function(i, u, a) {
  return a < i ? i : a > u ? u : a;
}, Yn = function(i, u) {
  return !Mn(i) || !(u = dT.exec(i)) ? "" : u[1];
}, MT = function(i, u, a) {
  return ja(a, function(o) {
    return gs(i, u, o);
  });
}, T0 = [].slice, P_ = function(i, u) {
  return i && Ni(i) && "length" in i && (!u && !i.length || i.length - 1 in i && Ni(i[0])) && !i.nodeType && i !== wi;
}, AT = function(i, u, a) {
  return a === void 0 && (a = []), i.forEach(function(o) {
    var c;
    return Mn(o) && !u || P_(o, 1) ? (c = a).push.apply(c, li(o)) : a.push(o);
  }) || a;
}, li = function(i, u, a) {
  return qe && !u && qe.selector ? qe.selector(i) : Mn(i) && !a && (y0 || !Lr()) ? T0.call((u || Z0).querySelectorAll(i), 0) : Xn(i) ? AT(i, a) : P_(i) ? T0.call(i, 0) : i ? [i] : [];
}, E0 = function(i) {
  return i = li(i)[0] || as("Invalid scope") || {}, function(u) {
    var a = i.current || i.nativeElement || i;
    return li(u, a.querySelectorAll ? a : a === i ? as("Invalid scope") || Z0.createElement("div") : i);
  };
}, $_ = function(i) {
  return i.sort(function() {
    return 0.5 - Math.random();
  });
}, W_ = function(i) {
  if (We(i))
    return i;
  var u = Ni(i) ? i : {
    each: i
  }, a = Tu(u.ease), o = u.from || 0, c = parseFloat(u.base) || 0, h = {}, d = o > 0 && o < 1, g = isNaN(o) || d, v = u.axis, p = o, _ = o;
  return Mn(o) ? p = _ = {
    center: 0.5,
    edges: 0.5,
    end: 1
  }[o] || 0 : !d && g && (p = o[0], _ = o[1]), function(S, b, M) {
    var T = (M || u).length, R = h[T], j, X, Z, Y, Q, tt, N, K, P;
    if (!R) {
      if (P = u.grid === "auto" ? 0 : (u.grid || [1, ni])[1], !P) {
        for (N = -ni; N < (N = M[P++].getBoundingClientRect().left) && P < T; )
          ;
        P < T && P--;
      }
      for (R = h[T] = [], j = g ? Math.min(P, T) * p - 0.5 : o % P, X = P === ni ? 0 : g ? T * _ / P - 0.5 : o / P | 0, N = 0, K = ni, tt = 0; tt < T; tt++)
        Z = tt % P - j, Y = X - (tt / P | 0), R[tt] = Q = v ? Math.abs(v === "y" ? Y : Z) : U_(Z * Z + Y * Y), Q > N && (N = Q), Q < K && (K = Q);
      o === "random" && $_(R), R.max = N - K, R.min = K, R.v = T = (parseFloat(u.amount) || parseFloat(u.each) * (P > T ? T - 1 : v ? v === "y" ? T / P : P : Math.max(P, T / P)) || 0) * (o === "edges" ? -1 : 1), R.b = T < 0 ? c - T : c, R.u = Yn(u.amount || u.each) || 0, a = a && T < 0 ? qT(a) : a;
    }
    return T = (R[S] - R.min) / R.max || 0, je(R.b + (a ? a(T) : T) * R.v) + R.u;
  };
}, x0 = function(i) {
  var u = Math.pow(10, ((i + "").split(".")[1] || "").length);
  return function(a) {
    var o = je(Math.round(parseFloat(a) / i) * i * u);
    return (o - o % 1) / u + (Ii(a) ? 0 : Yn(a));
  };
}, I_ = function(i, u) {
  var a = Xn(i), o, c;
  return !a && Ni(i) && (o = a = i.radius || ni, i.values ? (i = li(i.values), (c = !Ii(i[0])) && (o *= o)) : i = x0(i.increment)), ja(u, a ? We(i) ? function(h) {
    return c = i(h), Math.abs(c - h) <= o ? c : h;
  } : function(h) {
    for (var d = parseFloat(c ? h.x : h), g = parseFloat(c ? h.y : 0), v = ni, p = 0, _ = i.length, S, b; _--; )
      c ? (S = i[_].x - d, b = i[_].y - g, S = S * S + b * b) : S = Math.abs(i[_] - d), S < v && (v = S, p = _);
    return p = !o || v <= o ? i[p] : h, c || p === h || Ii(h) ? p : p + Yn(h);
  } : x0(i));
}, ty = function(i, u, a, o) {
  return ja(Xn(i) ? !u : a === !0 ? !!(a = 0) : !o, function() {
    return Xn(i) ? i[~~(Math.random() * i.length)] : (a = a || 1e-5) && (o = a < 1 ? Math.pow(10, (a + "").length - 2) : 1) && Math.floor(Math.round((i - a / 2 + Math.random() * (u - i + a * 0.99)) / a) * a * o) / o;
  });
}, wT = function() {
  for (var i = arguments.length, u = new Array(i), a = 0; a < i; a++)
    u[a] = arguments[a];
  return function(o) {
    return u.reduce(function(c, h) {
      return h(c);
    }, o);
  };
}, OT = function(i, u) {
  return function(a) {
    return i(parseFloat(a)) + (u || Yn(a));
  };
}, RT = function(i, u, a) {
  return ny(i, u, 0, 1, a);
}, ey = function(i, u, a) {
  return ja(a, function(o) {
    return i[~~u(o)];
  });
}, zT = function f(i, u, a) {
  var o = u - i;
  return Xn(i) ? ey(i, f(0, i.length), u) : ja(a, function(c) {
    return (o + (c - i) % o) % o + i;
  });
}, CT = function f(i, u, a) {
  var o = u - i, c = o * 2;
  return Xn(i) ? ey(i, f(0, i.length - 1), u) : ja(a, function(h) {
    return h = (c + (h - i) % c) % c || 0, i + (h > o ? c - h : h);
  });
}, rs = function(i) {
  return i.replace(cT, function(u) {
    var a = u.indexOf("[") + 1, o = u.substring(a || 7, a ? u.indexOf("]") : u.length - 1).split(fT);
    return ty(a ? o : +o[0], a ? 0 : +o[1], +o[2] || 1e-5);
  });
}, ny = function(i, u, a, o, c) {
  var h = u - i, d = o - a;
  return ja(c, function(g) {
    return a + ((g - i) / h * d || 0);
  });
}, DT = function f(i, u, a, o) {
  var c = isNaN(i + u) ? 0 : function(b) {
    return (1 - b) * i + b * u;
  };
  if (!c) {
    var h = Mn(i), d = {}, g, v, p, _, S;
    if (a === !0 && (o = 1) && (a = null), h)
      i = {
        p: i
      }, u = {
        p: u
      };
    else if (Xn(i) && !Xn(u)) {
      for (p = [], _ = i.length, S = _ - 2, v = 1; v < _; v++)
        p.push(f(i[v - 1], i[v]));
      _--, c = function(M) {
        M *= _;
        var T = Math.min(S, ~~M);
        return p[T](M - T);
      }, a = u;
    } else o || (i = Ur(Xn(i) ? [] : {}, i));
    if (!p) {
      for (g in u)
        $0.call(d, i, g, "get", u[g]);
      c = function(M) {
        return em(M, d) || (h ? i.p : i);
      };
    }
  }
  return ja(a, c);
}, j1 = function(i, u, a) {
  var o = i.labels, c = ni, h, d, g;
  for (h in o)
    d = o[h] - u, d < 0 == !!a && d && c > (d = Math.abs(d)) && (g = h, c = d);
  return g;
}, Nl = function(i, u, a) {
  var o = i.vars, c = o[u], h = qe, d = i._ctx, g, v, p;
  if (c)
    return g = o[u + "Params"], v = o.callbackScope || i, a && Ba.length && of(), d && (qe = d), p = g ? c.apply(v, g) : c.call(v), qe = h, p;
}, Lo = function(i) {
  return qa(i), i.scrollTrigger && i.scrollTrigger.kill(!!Un), i.progress() < 1 && Nl(i, "onInterrupt"), i;
}, Mr, ly = [], iy = function(i) {
  if (i)
    if (i = !i.name && i.default || i, Q0() || i.headless) {
      var u = i.name, a = We(i), o = u && !a && i.init ? function() {
        this._props = [];
      } : i, c = {
        init: us,
        render: em,
        add: $0,
        kill: kT,
        modifier: JT,
        rawVars: 0
      }, h = {
        targetTest: 0,
        get: 0,
        getSetter: tm,
        aliases: {},
        register: 0
      };
      if (Lr(), i !== o) {
        if (zl[u])
          return;
        Ll(o, Ll(sf(i, c), h)), Ur(o.prototype, Ur(c, sf(i, h))), zl[o.prop = u] = o, i.targetTest && ($c.push(o), F0[u] = 1), u = (u === "css" ? "CSS" : u.charAt(0).toUpperCase() + u.substr(1)) + "Plugin";
      }
      X_(u, o), i.register && i.register(vl, o, ml);
    } else
      ly.push(i);
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
}, i0 = function(i, u, a) {
  return i += i < 0 ? 1 : i > 1 ? -1 : 0, (i * 6 < 1 ? u + (a - u) * i * 6 : i < 0.5 ? a : i * 3 < 2 ? u + (a - u) * (2 / 3 - i) * 6 : u) * Oe + 0.5 | 0;
}, ay = function(i, u, a) {
  var o = i ? Ii(i) ? [i >> 16, i >> 8 & Oe, i & Oe] : 0 : Yo.black, c, h, d, g, v, p, _, S, b, M;
  if (!o) {
    if (i.substr(-1) === "," && (i = i.substr(0, i.length - 1)), Yo[i])
      o = Yo[i];
    else if (i.charAt(0) === "#") {
      if (i.length < 6 && (c = i.charAt(1), h = i.charAt(2), d = i.charAt(3), i = "#" + c + c + h + h + d + d + (i.length === 5 ? i.charAt(4) + i.charAt(4) : "")), i.length === 9)
        return o = parseInt(i.substr(1, 6), 16), [o >> 16, o >> 8 & Oe, o & Oe, parseInt(i.substr(7), 16) / 255];
      i = parseInt(i.substr(1), 16), o = [i >> 16, i >> 8 & Oe, i & Oe];
    } else if (i.substr(0, 3) === "hsl") {
      if (o = M = i.match(Y1), !u)
        g = +o[0] % 360 / 360, v = +o[1] / 100, p = +o[2] / 100, h = p <= 0.5 ? p * (v + 1) : p + v - p * v, c = p * 2 - h, o.length > 3 && (o[3] *= 1), o[0] = i0(g + 1 / 3, c, h), o[1] = i0(g, c, h), o[2] = i0(g - 1 / 3, c, h);
      else if (~i.indexOf("="))
        return o = i.match(H_), a && o.length < 4 && (o[3] = 1), o;
    } else
      o = i.match(Y1) || Yo.transparent;
    o = o.map(Number);
  }
  return u && !M && (c = o[0] / Oe, h = o[1] / Oe, d = o[2] / Oe, _ = Math.max(c, h, d), S = Math.min(c, h, d), p = (_ + S) / 2, _ === S ? g = v = 0 : (b = _ - S, v = p > 0.5 ? b / (2 - _ - S) : b / (_ + S), g = _ === c ? (h - d) / b + (h < d ? 6 : 0) : _ === h ? (d - c) / b + 2 : (c - h) / b + 4, g *= 60), o[0] = ~~(g + 0.5), o[1] = ~~(v * 100 + 0.5), o[2] = ~~(p * 100 + 0.5)), a && o.length < 4 && (o[3] = 1), o;
}, uy = function(i) {
  var u = [], a = [], o = -1;
  return i.split(Ha).forEach(function(c) {
    var h = c.match(xr) || [];
    u.push.apply(u, h), a.push(o += h.length + 1);
  }), u.c = a, u;
}, Q1 = function(i, u, a) {
  var o = "", c = (i + o).match(Ha), h = u ? "hsla(" : "rgba(", d = 0, g, v, p, _;
  if (!c)
    return i;
  if (c = c.map(function(S) {
    return (S = ay(S, u, 1)) && h + (u ? S[0] + "," + S[1] + "%," + S[2] + "%," + S[3] : S.join(",")) + ")";
  }), a && (p = uy(i), g = a.c, g.join(o) !== p.c.join(o)))
    for (v = i.replace(Ha, "1").split(xr), _ = v.length - 1; d < _; d++)
      o += v[d] + (~g.indexOf(d) ? c.shift() || h + "0,0,0,0)" : (p.length ? p : c.length ? c : a).shift());
  if (!v)
    for (v = i.split(Ha), _ = v.length - 1; d < _; d++)
      o += v[d] + c[d];
  return o + v[_];
}, Ha = (function() {
  var f = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3,4}){1,2}\\b", i;
  for (i in Yo)
    f += "|" + i + "\\b";
  return new RegExp(f + ")", "gi");
})(), NT = /hsl[a]?\(/, ry = function(i) {
  var u = i.join(" "), a;
  if (Ha.lastIndex = 0, Ha.test(u))
    return a = NT.test(u), i[1] = Q1(i[1], a), i[0] = Q1(i[0], a, uy(i[1])), !0;
}, os, Dl = (function() {
  var f = Date.now, i = 500, u = 33, a = f(), o = a, c = 1e3 / 240, h = c, d = [], g, v, p, _, S, b, M = function T(R) {
    var j = f() - o, X = R === !0, Z, Y, Q, tt;
    if ((j > i || j < 0) && (a += j - u), o += j, Q = o - a, Z = Q - h, (Z > 0 || X) && (tt = ++_.frame, S = Q - _.time * 1e3, _.time = Q = Q / 1e3, h += Z + (Z >= c ? 0 : c - Z), Y = 1), X || (g = v(T)), Y)
      for (b = 0; b < d.length; b++)
        d[b](Q, S, tt, R);
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
      Y_ && (!y0 && Q0() && (wi = y0 = window, Z0 = wi.document || {}, Hl.gsap = vl, (wi.gsapVersions || (wi.gsapVersions = [])).push(vl.version), q_(rf || wi.GreenSockGlobals || !wi.gsap && wi || {}), ly.forEach(iy)), p = typeof requestAnimationFrame < "u" && requestAnimationFrame, g && _.sleep(), v = p || function(R) {
        return setTimeout(R, h - _.time * 1e3 + 1 | 0);
      }, os = 1, M(2));
    },
    sleep: function() {
      (p ? cancelAnimationFrame : clearTimeout)(g), os = 0, v = us;
    },
    lagSmoothing: function(R, j) {
      i = R || 1 / 0, u = Math.min(j || 33, i);
    },
    fps: function(R) {
      c = 1e3 / (R || 240), h = _.time * 1e3 + c;
    },
    add: function(R, j, X) {
      var Z = j ? function(Y, Q, tt, N) {
        R(Y, Q, tt, N), _.remove(Z);
      } : R;
      return _.remove(R), d[X ? "unshift" : "push"](Z), Lr(), Z;
    },
    remove: function(R, j) {
      ~(j = d.indexOf(R)) && d.splice(j, 1) && b >= j && b--;
    },
    _listeners: d
  }, _;
})(), Lr = function() {
  return !os && Dl.wake();
}, ce = {}, UT = /^[\d.\-M][\d.\-,\s]/, BT = /["']/g, HT = function(i) {
  for (var u = {}, a = i.substr(1, i.length - 3).split(":"), o = a[0], c = 1, h = a.length, d, g, v; c < h; c++)
    g = a[c], d = c !== h - 1 ? g.lastIndexOf(",") : g.length, v = g.substr(0, d), u[o] = isNaN(v) ? v.replace(BT, "").trim() : +v, o = g.substr(d + 1).trim();
  return u;
}, LT = function(i) {
  var u = i.indexOf("(") + 1, a = i.indexOf(")"), o = i.indexOf("(", u);
  return i.substring(u, ~o && o < a ? i.indexOf(")", a + 1) : a);
}, YT = function(i) {
  var u = (i + "").split("("), a = ce[u[0]];
  return a && u.length > 1 && a.config ? a.config.apply(null, ~i.indexOf("{") ? [HT(u[1])] : LT(i).split(",").map(Q_)) : ce._CE && UT.test(i) ? ce._CE("", i) : a;
}, qT = function(i) {
  return function(u) {
    return 1 - i(1 - u);
  };
}, Tu = function(i, u) {
  return i && (We(i) ? i : ce[i] || YT(i)) || u;
}, zu = function(i, u, a, o) {
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
  return dl(i, function(d) {
    ce[d] = Hl[d] = c, ce[h = d.toLowerCase()] = a;
    for (var g in c)
      ce[h + (g === "easeIn" ? ".in" : g === "easeOut" ? ".out" : ".inOut")] = ce[d + "." + g] = c[g];
  }), c;
}, oy = function(i) {
  return function(u) {
    return u < 0.5 ? (1 - i(1 - u * 2)) / 2 : 0.5 + i((u - 0.5) * 2) / 2;
  };
}, a0 = function f(i, u, a) {
  var o = u >= 1 ? u : 1, c = (a || (i ? 0.3 : 0.45)) / (u < 1 ? u : 1), h = c / _0 * (Math.asin(1 / o) || 0), d = function(p) {
    return p === 1 ? 1 : o * Math.pow(2, -10 * p) * sT((p - h) * c) + 1;
  }, g = i === "out" ? d : i === "in" ? function(v) {
    return 1 - d(1 - v);
  } : oy(d);
  return c = _0 / c, g.config = function(v, p) {
    return f(i, v, p);
  }, g;
}, u0 = function f(i, u) {
  u === void 0 && (u = 1.70158);
  var a = function(h) {
    return h ? --h * h * ((u + 1) * h + u) + 1 : 0;
  }, o = i === "out" ? a : i === "in" ? function(c) {
    return 1 - a(1 - c);
  } : oy(a);
  return o.config = function(c) {
    return f(i, c);
  }, o;
};
dl("Linear,Quad,Cubic,Quart,Quint,Strong", function(f, i) {
  var u = i < 5 ? i + 1 : i;
  zu(f + ",Power" + (u - 1), i ? function(a) {
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
(function(f, i) {
  var u = 1 / i, a = 2 * u, o = 2.5 * u, c = function(d) {
    return d < u ? f * d * d : d < a ? f * Math.pow(d - 1.5 / i, 2) + 0.75 : d < o ? f * (d -= 2.25 / i) * d + 0.9375 : f * Math.pow(d - 2.625 / i, 2) + 0.984375;
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
ce.SteppedEase = ce.steps = Hl.SteppedEase = {
  config: function(i, u) {
    i === void 0 && (i = 1);
    var a = 1 / i, o = i + (u ? 0 : 1), c = u ? 1 : 0, h = 1 - Ee;
    return function(d) {
      return ((o * gs(0, h, d) | 0) + c) * a;
    };
  }
};
is.ease = ce["quad.out"];
dl("onComplete,onUpdate,onStart,onRepeat,onReverseComplete,onInterrupt", function(f) {
  return J0 += f + "," + f + "Params,";
});
var sy = function(i, u) {
  this.id = rT++, i._gsap = this, this.target = i, this.harness = u, this.get = u ? u.get : G_, this.set = u ? u.getSetter : tm;
}, ss = /* @__PURE__ */ (function() {
  function f(u) {
    this.vars = u, this._delay = +u.delay || 0, (this._repeat = u.repeat === 1 / 0 ? -2 : u.repeat || 0) && (this._rDelay = u.repeatDelay || 0, this._yoyo = !!u.yoyo || !!u.yoyoEase), this._ts = 1, Hr(this, +u.duration, 1, 1), this.data = u.data, qe && (this._ctx = qe, qe.data.push(this)), os || Dl.wake();
  }
  var i = f.prototype;
  return i.delay = function(a) {
    return a || a === 0 ? (this.parent && this.parent.smoothChildTiming && this.startTime(this._start + a - this._delay), this._delay = a, this) : this._delay;
  }, i.duration = function(a) {
    return arguments.length ? this.totalDuration(this._repeat > 0 ? a + (a + this._rDelay) * this._repeat : a) : this.totalDuration() && this._dur;
  }, i.totalDuration = function(a) {
    return arguments.length ? (this._dirty = 0, Hr(this, this._repeat < 0 ? a : (a - this._repeat * this._rDelay) / (this._repeat + 1))) : this._tDur;
  }, i.totalTime = function(a, o) {
    if (Lr(), !arguments.length)
      return this._tTime;
    var c = this._dp;
    if (c && c.smoothChildTiming && this._ts) {
      for (xf(this, a), !c._dp || c.parent || F_(c, this); c && c.parent; )
        c.parent._time !== c._start + (c._ts >= 0 ? c._tTime / c._ts : (c.totalDuration() - c._tTime) / -c._ts) && c.totalTime(c._tTime, !0), c = c.parent;
      !this.parent && this._dp.autoRemoveChildren && (this._ts > 0 && a < this._tDur || this._ts < 0 && a > 0 || !this._tDur && !a) && Ri(this._dp, this, this._start - this._delay);
    }
    return (this._tTime !== a || !this._dur && !o || this._initted && Math.abs(this._zTime) === Ee || !this._initted && this._dur && a || !a && !this._initted && (this.add || this._ptLookup)) && (this._ts || (this._pTime = a), j_(this, a, o)), this;
  }, i.time = function(a, o) {
    return arguments.length ? this.totalTime(Math.min(this.totalDuration(), a + V1(this)) % (this._dur + this._rDelay) || (a ? this._dur : 0), o) : this._time;
  }, i.totalProgress = function(a, o) {
    return arguments.length ? this.totalTime(this.totalDuration() * a, o) : this.totalDuration() ? Math.min(1, this._tTime / this._tDur) : this.rawTime() >= 0 && this._initted ? 1 : 0;
  }, i.progress = function(a, o) {
    return arguments.length ? this.totalTime(this.duration() * (this._yoyo && !(this.iteration() & 1) ? 1 - a : a) + V1(this), o) : this.duration() ? Math.min(1, this._time / this._dur) : this.rawTime() > 0 ? 1 : 0;
  }, i.iteration = function(a, o) {
    var c = this.duration() + this._rDelay;
    return arguments.length ? this.totalTime(this._time + (a - 1) * c, o) : this._repeat ? Br(this._tTime, c) + 1 : 1;
  }, i.timeScale = function(a, o) {
    if (!arguments.length)
      return this._rts === -Ee ? 0 : this._rts;
    if (this._rts === a)
      return this;
    var c = this.parent && this._ts ? cf(this.parent._time, this) : this._tTime, h = this._rts < 0;
    this._rts = +a || 0, this._ts = this._ps || a === -Ee ? 0 : this._rts;
    var d = this.totalDuration();
    return (h !== this._rts < 0 || c > 0 && c < d) && this.totalTime(gs(-Math.abs(this._delay), d, c), o !== !1), Ef(this), yT(this);
  }, i.paused = function(a) {
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
  }, i.startTime = function(a) {
    if (arguments.length) {
      this._start = je(a);
      var o = this.parent || this._dp;
      return o && (o._sort || !this.parent) && Ri(o, this, this._start - this._delay), this;
    }
    return this._start;
  }, i.endTime = function(a) {
    return this._start + (hl(a) ? this.totalDuration() : this.duration()) / Math.abs(this._ts || 1);
  }, i.rawTime = function(a) {
    var o = this.parent || this._dp;
    return o ? a && (!this._ts || this._repeat && this._time && this.totalProgress() < 1) ? this._tTime % (this._dur + this._rDelay) : this._ts ? cf(o.rawTime(a), this) : this._tTime : this._tTime;
  }, i.revert = function(a) {
    a === void 0 && (a = gT);
    var o = Un;
    return Un = a, P0(this) && (this.timeline && this.timeline.revert(a), this.totalTime(-0.01, a.suppressEvents)), this.data !== "nested" && a.kill !== !1 && this.kill(), Un = o, this;
  }, i.globalTime = function(a) {
    for (var o = this, c = arguments.length ? a : o.rawTime(); o; )
      c = o._start + c / (Math.abs(o._ts) || 1), o = o._dp;
    return !this.parent && this._sat ? this._sat.globalTime(a) : c;
  }, i.repeat = function(a) {
    return arguments.length ? (this._repeat = a === 1 / 0 ? -2 : a, G1(this)) : this._repeat === -2 ? 1 / 0 : this._repeat;
  }, i.repeatDelay = function(a) {
    if (arguments.length) {
      var o = this._time;
      return this._rDelay = a, G1(this), o ? this.time(o) : this;
    }
    return this._rDelay;
  }, i.yoyo = function(a) {
    return arguments.length ? (this._yoyo = a, this) : this._yoyo;
  }, i.seek = function(a, o) {
    return this.totalTime(Il(this, a), hl(o));
  }, i.restart = function(a, o) {
    return this.play().totalTime(a ? -this._delay : 0, hl(o)), this._dur || (this._zTime = -Ee), this;
  }, i.play = function(a, o) {
    return a != null && this.seek(a, o), this.reversed(!1).paused(!1);
  }, i.reverse = function(a, o) {
    return a != null && this.seek(a || this.totalDuration(), o), this.reversed(!0).paused(!1);
  }, i.pause = function(a, o) {
    return a != null && this.seek(a, o), this.paused(!0);
  }, i.resume = function() {
    return this.paused(!1);
  }, i.reversed = function(a) {
    return arguments.length ? (!!a !== this.reversed() && this.timeScale(-this._rts || (a ? -Ee : 0)), this) : this._rts < 0;
  }, i.invalidate = function() {
    return this._initted = this._act = 0, this._zTime = -Ee, this;
  }, i.isActive = function() {
    var a = this.parent || this._dp, o = this._start, c;
    return !!(!a || this._ts && this._initted && a.isActive() && (c = a.rawTime(!0)) >= o && c < this.endTime(!0) - Ee);
  }, i.eventCallback = function(a, o, c) {
    var h = this.vars;
    return arguments.length > 1 ? (o ? (h[a] = o, c && (h[a + "Params"] = c), a === "onUpdate" && (this._onUpdate = o)) : delete h[a], this) : h[a];
  }, i.then = function(a) {
    var o = this, c = o._prom;
    return new Promise(function(h) {
      var d = We(a) ? a : Z_, g = function() {
        var p = o.then;
        o.then = null, c && c(), We(d) && (d = d(o)) && (d.then || d === o) && (o.then = p), h(d), o.then = p;
      };
      o._initted && o.totalProgress() === 1 && o._ts >= 0 || !o._tTime && o._ts < 0 ? g() : o._prom = g;
    });
  }, i.kill = function() {
    Lo(this);
  }, f;
})();
Ll(ss.prototype, {
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
var cl = /* @__PURE__ */ (function(f) {
  N_(i, f);
  function i(a, o) {
    var c;
    return a === void 0 && (a = {}), c = f.call(this, a) || this, c.labels = {}, c.smoothChildTiming = !!a.smoothChildTiming, c.autoRemoveChildren = !!a.autoRemoveChildren, c._sort = hl(a.sortChildren), Qe && Ri(a.parent || Qe, Ji(c), o), a.reversed && c.reverse(), a.paused && c.paused(!0), a.scrollTrigger && J_(Ji(c), a.scrollTrigger), c;
  }
  var u = i.prototype;
  return u.to = function(o, c, h) {
    return Fo(0, arguments, this), this;
  }, u.from = function(o, c, h) {
    return Fo(1, arguments, this), this;
  }, u.fromTo = function(o, c, h, d) {
    return Fo(2, arguments, this), this;
  }, u.set = function(o, c, h) {
    return c.duration = 0, c.parent = this, Ko(c).repeatDelay || (c.repeat = 0), c.immediateRender = !!c.immediateRender, new fn(o, c, Il(this, h), 1), this;
  }, u.call = function(o, c, h) {
    return Ri(this, fn.delayedCall(0, o, c), h);
  }, u.staggerTo = function(o, c, h, d, g, v, p) {
    return h.duration = c, h.stagger = h.stagger || d, h.onComplete = v, h.onCompleteParams = p, h.parent = this, new fn(o, h, Il(this, g)), this;
  }, u.staggerFrom = function(o, c, h, d, g, v, p) {
    return h.runBackwards = 1, Ko(h).immediateRender = hl(h.immediateRender), this.staggerTo(o, c, h, d, g, v, p);
  }, u.staggerFromTo = function(o, c, h, d, g, v, p, _) {
    return d.startAt = h, Ko(d).immediateRender = hl(d.immediateRender), this.staggerTo(o, c, d, g, v, p, _);
  }, u.render = function(o, c, h) {
    var d = this._time, g = this._dirty ? this.totalDuration() : this._tDur, v = this._dur, p = o <= 0 ? 0 : je(o), _ = this._zTime < 0 != o < 0 && (this._initted || !v), S, b, M, T, R, j, X, Z, Y, Q, tt, N;
    if (this !== Qe && p > g && o >= 0 && (p = g), p !== this._tTime || h || _) {
      if (d !== this._time && v && (p += this._time - d, o += this._time - d), S = p, Y = this._start, Z = this._ts, j = !Z, _ && (v || (d = this._zTime), (o || !c) && (this._zTime = o)), this._repeat) {
        if (tt = this._yoyo, R = v + this._rDelay, this._repeat < -1 && o < 0)
          return this.totalTime(R * 100 + o, c, h);
        if (S = je(p % R), p === g ? (T = this._repeat, S = v) : (Q = je(p / R), T = ~~Q, T && T === Q && (S = v, T--), S > v && (S = v)), Q = Br(this._tTime, R), !d && this._tTime && Q !== T && this._tTime - Q * R - this._dur <= 0 && (Q = T), tt && T & 1 && (S = v - S, N = 1), T !== Q && !this._lock) {
          var K = tt && Q & 1, P = K === (tt && T & 1);
          if (T < Q && (K = !K), d = K ? 0 : p % v ? v : p, this._lock = 1, this.render(d || (N ? 0 : je(T * R)), c, !v)._lock = 0, this._tTime = p, !c && this.parent && Nl(this, "onRepeat"), this.vars.repeatRefresh && !N && (this.invalidate()._lock = 1, Q = T), d && d !== this._time || j !== !this._ts || this.vars.onRepeat && !this.parent && !this._act)
            return this;
          if (v = this._dur, g = this._tDur, P && (this._lock = 2, d = K ? v : -1e-4, this.render(d, !0), this.vars.repeatRefresh && !N && this.invalidate()), this._lock = 0, !this._ts && !j)
            return this;
        }
      }
      if (this._hasPause && !this._forcing && this._lock < 2 && (X = ET(this, je(d), je(S)), X && (p -= S - (S = X._start))), this._tTime = p, this._time = S, this._act = !!Z, this._initted || (this._onUpdate = this.vars.onUpdate, this._initted = 1, this._zTime = o, d = 0), !d && p && v && !c && !Q && (Nl(this, "onStart"), this._tTime !== p))
        return this;
      if (S >= d && o >= 0)
        for (b = this._first; b; ) {
          if (M = b._next, (b._act || S >= b._start) && b._ts && X !== b) {
            if (b.parent !== this)
              return this.render(o, c, h);
            if (b.render(b._ts > 0 ? (S - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (S - b._start) * b._ts, c, h), S !== this._time || !this._ts && !j) {
              X = 0, M && (p += this._zTime = -Ee);
              break;
            }
          }
          b = M;
        }
      else {
        b = this._last;
        for (var V = o < 0 ? o : S; b; ) {
          if (M = b._prev, (b._act || V <= b._end) && b._ts && X !== b) {
            if (b.parent !== this)
              return this.render(o, c, h);
            if (b.render(b._ts > 0 ? (V - b._start) * b._ts : (b._dirty ? b.totalDuration() : b._tDur) + (V - b._start) * b._ts, c, h || Un && P0(b)), S !== this._time || !this._ts && !j) {
              X = 0, M && (p += this._zTime = V ? -Ee : Ee);
              break;
            }
          }
          b = M;
        }
      }
      if (X && !c && (this.pause(), X.render(S >= d ? 0 : -Ee)._zTime = S >= d ? 1 : -1, this._ts))
        return this._start = Y, Ef(this), this.render(o, c, h);
      this._onUpdate && !c && Nl(this, "onUpdate", !0), (p === g && this._tTime >= this.totalDuration() || !p && d) && (Y === this._start || Math.abs(Z) !== Math.abs(this._ts)) && (this._lock || ((o || !v) && (p === g && this._ts > 0 || !p && this._ts < 0) && qa(this, 1), !c && !(o < 0 && !d) && (p || d || !g) && (Nl(this, p === g && o >= 0 ? "onComplete" : "onReverseComplete", !0), this._prom && !(p < g && this.timeScale() > 0) && this._prom())));
    }
    return this;
  }, u.add = function(o, c) {
    var h = this;
    if (Ii(c) || (c = Il(this, c, o)), !(o instanceof ss)) {
      if (Xn(o))
        return o.forEach(function(d) {
          return h.add(d, c);
        }), this;
      if (Mn(o))
        return this.addLabel(o, c);
      if (We(o))
        o = fn.delayedCall(0, o);
      else
        return this;
    }
    return this !== o ? Ri(this, o, c) : this;
  }, u.getChildren = function(o, c, h, d) {
    o === void 0 && (o = !0), c === void 0 && (c = !0), h === void 0 && (h = !0), d === void 0 && (d = -ni);
    for (var g = [], v = this._first; v; )
      v._start >= d && (v instanceof fn ? c && g.push(v) : (h && g.push(v), o && g.push.apply(g, v.getChildren(!0, c, h)))), v = v._next;
    return g;
  }, u.getById = function(o) {
    for (var c = this.getChildren(1, 1, 1), h = c.length; h--; )
      if (c[h].vars.id === o)
        return c[h];
  }, u.remove = function(o) {
    return Mn(o) ? this.removeLabel(o) : We(o) ? this.killTweensOf(o) : (o.parent === this && Tf(this, o), o === this._recent && (this._recent = this._last), bu(this));
  }, u.totalTime = function(o, c) {
    return arguments.length ? (this._forcing = 1, !this._dp && this._ts && (this._start = je(Dl.time - (this._ts > 0 ? o / this._ts : (this.totalDuration() - o) / -this._ts))), f.prototype.totalTime.call(this, o, c), this._forcing = 0, this) : this._tTime;
  }, u.addLabel = function(o, c) {
    return this.labels[o] = Il(this, c), this;
  }, u.removeLabel = function(o) {
    return delete this.labels[o], this;
  }, u.addPause = function(o, c, h) {
    var d = fn.delayedCall(0, c || us, h);
    return d.data = "isPause", this._hasPause = 1, Ri(this, d, Il(this, o));
  }, u.removePause = function(o) {
    var c = this._first;
    for (o = Il(this, o); c; )
      c._start === o && c.data === "isPause" && qa(c), c = c._next;
  }, u.killTweensOf = function(o, c, h) {
    for (var d = this.getTweensOf(o, h), g = d.length; g--; )
      za !== d[g] && d[g].kill(o, c);
    return this;
  }, u.getTweensOf = function(o, c) {
    for (var h = [], d = li(o), g = this._first, v = Ii(c), p; g; )
      g instanceof fn ? vT(g._targets, d) && (v ? (!za || g._initted && g._ts) && g.globalTime(0) <= c && g.globalTime(g.totalDuration()) > c : !c || g.isActive()) && h.push(g) : (p = g.getTweensOf(d, c)).length && h.push.apply(h, p), g = g._next;
    return h;
  }, u.tweenTo = function(o, c) {
    c = c || {};
    var h = this, d = Il(h, o), g = c, v = g.startAt, p = g.onStart, _ = g.onStartParams, S = g.immediateRender, b, M = fn.to(h, Ll({
      ease: c.ease || "none",
      lazy: !1,
      immediateRender: !1,
      time: d,
      overwrite: "auto",
      duration: c.duration || Math.abs((d - (v && "time" in v ? v.time : h._time)) / h.timeScale()) || Ee,
      onStart: function() {
        if (h.pause(), !b) {
          var R = c.duration || Math.abs((d - (v && "time" in v ? v.time : h._time)) / h.timeScale());
          M._dur !== R && Hr(M, R, 0, 1).render(M._time, !0, !0), b = 1;
        }
        p && p.apply(M, _ || []);
      }
    }, c));
    return S ? M.render(0) : M;
  }, u.tweenFromTo = function(o, c, h) {
    return this.tweenTo(c, Ll({
      startAt: {
        time: Il(this, o)
      }
    }, h));
  }, u.recent = function() {
    return this._recent;
  }, u.nextLabel = function(o) {
    return o === void 0 && (o = this._time), j1(this, Il(this, o));
  }, u.previousLabel = function(o) {
    return o === void 0 && (o = this._time), j1(this, Il(this, o), 1);
  }, u.currentLabel = function(o) {
    return arguments.length ? this.seek(o, !0) : this.previousLabel(this._time + Ee);
  }, u.shiftChildren = function(o, c, h) {
    h === void 0 && (h = 0);
    var d = this._first, g = this.labels, v;
    for (o = je(o); d; )
      d._start >= h && (d._start += o, d._end += o), d = d._next;
    if (c)
      for (v in g)
        g[v] >= h && (g[v] += o);
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
    var c = 0, h = this, d = h._last, g = ni, v, p, _;
    if (arguments.length)
      return h.timeScale((h._repeat < 0 ? h.duration() : h.totalDuration()) / (h.reversed() ? -o : o));
    if (h._dirty) {
      for (_ = h.parent; d; )
        v = d._prev, d._dirty && d.totalDuration(), p = d._start, p > g && h._sort && d._ts && !h._lock ? (h._lock = 1, Ri(h, d, p - d._delay, 1)._lock = 0) : g = p, p < 0 && d._ts && (c -= p, (!_ && !h._dp || _ && _.smoothChildTiming) && (h._start += je(p / h._ts), h._time -= p, h._tTime -= p), h.shiftChildren(-p, !1, -1 / 0), g = 0), d._end > c && d._ts && (c = d._end), d = v;
      Hr(h, h === Qe && h._time > c ? h._time : c, 1, 1), h._dirty = 0;
    }
    return h._tDur;
  }, i.updateRoot = function(o) {
    if (Qe._ts && (j_(Qe, cf(o, Qe)), V_ = Dl.frame), Dl.frame >= q1) {
      q1 += Bl.autoSleep || 120;
      var c = Qe._first;
      if ((!c || !c._ts) && Bl.autoSleep && Dl._listeners.length < 2) {
        for (; c && !c._ts; )
          c = c._next;
        c || Dl.sleep();
      }
    }
  }, i;
})(ss);
Ll(cl.prototype, {
  _lock: 0,
  _hasPause: 0,
  _forcing: 0
});
var XT = function(i, u, a, o, c, h, d) {
  var g = new ml(this._pt, i, u, 0, 1, my, null, c), v = 0, p = 0, _, S, b, M, T, R, j, X;
  for (g.b = a, g.e = o, a += "", o += "", (j = ~o.indexOf("random(")) && (o = rs(o)), h && (X = [a, o], h(X, i, u), a = X[0], o = X[1]), S = a.match(n0) || []; _ = n0.exec(o); )
    M = _[0], T = o.substring(v, _.index), b ? b = (b + 1) % 5 : T.substr(-5) === "rgba(" && (b = 1), M !== S[p++] && (R = parseFloat(S[p - 1]) || 0, g._pt = {
      _next: g._pt,
      p: T || p === 1 ? T : ",",
      //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
      s: R,
      c: M.charAt(1) === "=" ? wr(R, M) - R : parseFloat(M) - R,
      m: b && b < 4 ? Math.round : 0
    }, v = n0.lastIndex);
  return g.c = v < o.length ? o.substring(v, o.length) : "", g.fp = d, (L_.test(o) || j) && (g.e = 0), this._pt = g, g;
}, $0 = function(i, u, a, o, c, h, d, g, v, p) {
  We(o) && (o = o(c || 0, i, h));
  var _ = i[u], S = a !== "get" ? a : We(_) ? v ? i[u.indexOf("set") || !We(i["get" + u.substr(3)]) ? u : "get" + u.substr(3)](v) : i[u]() : _, b = We(_) ? v ? ZT : hy : I0, M;
  if (Mn(o) && (~o.indexOf("random(") && (o = rs(o)), o.charAt(1) === "=" && (M = wr(S, o) + (Yn(S) || 0), (M || M === 0) && (o = M))), !p || S !== o || M0)
    return !isNaN(S * o) && o !== "" ? (M = new ml(this._pt, i, u, +S || 0, o - (S || 0), typeof _ == "boolean" ? FT : dy, 0, b), v && (M.fp = v), d && M.modifier(d, this, i), this._pt = M) : (!_ && !(u in i) && K0(u, o), XT.call(this, i, u, S, o, b, g || Bl.stringFilter, v));
}, VT = function(i, u, a, o, c) {
  if (We(i) && (i = Jo(i, c, u, a, o)), !Ni(i) || i.style && i.nodeType || Xn(i) || B_(i))
    return Mn(i) ? Jo(i, c, u, a, o) : i;
  var h = {}, d;
  for (d in i)
    h[d] = Jo(i[d], c, u, a, o);
  return h;
}, cy = function(i, u, a, o, c, h) {
  var d, g, v, p;
  if (zl[i] && (d = new zl[i]()).init(c, d.rawVars ? u[i] : VT(u[i], o, c, h, a), a, o, h) !== !1 && (a._pt = g = new ml(a._pt, c, i, 0, 1, d.render, d, 0, d.priority), a !== Mr))
    for (v = a._ptLookup[a._targets.indexOf(c)], p = d._props.length; p--; )
      v[d._props[p]] = g;
  return d;
}, za, M0, W0 = function f(i, u, a) {
  var o = i.vars, c = o.ease, h = o.startAt, d = o.immediateRender, g = o.lazy, v = o.onUpdate, p = o.runBackwards, _ = o.yoyoEase, S = o.keyframes, b = o.autoRevert, M = i._dur, T = i._startAt, R = i._targets, j = i.parent, X = j && j.data === "nested" ? j.vars.targets : R, Z = i._overwrite === "auto" && !G0, Y = i.timeline, Q = o.easeReverse || _, tt, N, K, P, V, ut, it, St, Mt, et, F, k, W;
  if (Y && (!S || !c) && (c = "none"), i._ease = Tu(c, is.ease), i._rEase = Q && (Tu(Q) || i._ease), i._from = !Y && !!o.runBackwards, i._from && (i.ratio = 1), !Y || S && !o.stagger) {
    if (St = R[0] ? Su(R[0]).harness : 0, k = St && o[St.prop], tt = sf(o, F0), T && (T._zTime < 0 && T.progress(1), u < 0 && p && d && !b ? T.render(-1, !0) : T.revert(p && M ? Pc : mT), T._lazy = 0), h) {
      if (qa(i._startAt = fn.set(R, Ll({
        data: "isStart",
        overwrite: !1,
        parent: j,
        immediateRender: !0,
        lazy: !T && hl(g),
        startAt: null,
        delay: 0,
        onUpdate: v && function() {
          return Nl(i, "onUpdate");
        },
        stagger: 0
      }, h))), i._startAt._dp = 0, i._startAt._sat = i, u < 0 && (Un || !d && !b) && i._startAt.revert(Pc), d && M && u <= 0 && a <= 0) {
        u && (i._zTime = u);
        return;
      }
    } else if (p && M && !T) {
      if (u && (d = !1), K = Ll({
        overwrite: !1,
        data: "isFromStart",
        //we tag the tween with as "isFromStart" so that if [inside a plugin] we need to only do something at the very END of a tween, we have a way of identifying this tween as merely the one that's setting the beginning values for a "from()" tween. For example, clearProps in CSSPlugin should only get applied at the very END of a tween and without this tag, from(...{height:100, clearProps:"height", delay:1}) would wipe the height at the beginning of the tween and after 1 second, it'd kick back in.
        lazy: d && !T && hl(g),
        immediateRender: d,
        //zero-duration tweens render immediately by default, but if we're not specifically instructed to render this tween immediately, we should skip this and merely _init() to record the starting values (rendering them immediately would push them to completion which is wasteful in that case - we'd have to render(-1) immediately after)
        stagger: 0,
        parent: j
        //ensures that nested tweens that had a stagger are handled properly, like gsap.from(".class", {y: gsap.utils.wrap([-100,100]), stagger: 0.5})
      }, tt), k && (K[St.prop] = k), qa(i._startAt = fn.set(R, K)), i._startAt._dp = 0, i._startAt._sat = i, u < 0 && (Un ? i._startAt.revert(Pc) : i._startAt.render(-1, !0)), i._zTime = u, !d)
        f(i._startAt, Ee, Ee);
      else if (!u)
        return;
    }
    for (i._pt = i._ptCache = 0, g = M && hl(g) || g && !M, N = 0; N < R.length; N++) {
      if (V = R[N], it = V._gsap || k0(R)[N]._gsap, i._ptLookup[N] = et = {}, S0[it.id] && Ba.length && of(), F = X === R ? N : X.indexOf(V), St && (Mt = new St()).init(V, k || tt, i, F, X) !== !1 && (i._pt = P = new ml(i._pt, V, Mt.name, 0, 1, Mt.render, Mt, 0, Mt.priority), Mt._props.forEach(function(st) {
        et[st] = P;
      }), Mt.priority && (ut = 1)), !St || k)
        for (K in tt)
          zl[K] && (Mt = cy(K, tt, i, F, V, X)) ? Mt.priority && (ut = 1) : et[K] = P = $0.call(i, V, K, "get", tt[K], F, X, 0, o.stringFilter);
      i._op && i._op[N] && i.kill(V, i._op[N]), Z && i._pt && (za = i, Qe.killTweensOf(V, et, i.globalTime(u)), W = !i.parent, za = 0), i._pt && g && (S0[it.id] = 1);
    }
    ut && gy(i), i._onInit && i._onInit(i);
  }
  i._onUpdate = v, i._initted = (!i._op || i._pt) && !W, S && u <= 0 && Y.render(ni, !0, !0);
}, GT = function(i, u, a, o, c, h, d, g) {
  var v = (i._pt && i._ptCache || (i._ptCache = {}))[u], p, _, S, b;
  if (!v)
    for (v = i._ptCache[u] = [], S = i._ptLookup, b = i._targets.length; b--; ) {
      if (p = S[b][u], p && p.d && p.d._pt)
        for (p = p.d._pt; p && p.p !== u && p.fp !== u; )
          p = p._next;
      if (!p)
        return M0 = 1, i.vars[u] = "+=0", W0(i, d), M0 = 0, g ? as(u + " not eligible for reset. Try splitting into individual properties") : 1;
      v.push(p);
    }
  for (b = v.length; b--; )
    _ = v[b], p = _._pt || _, p.s = (o || o === 0) && !c ? o : p.s + (o || 0) + h * p.c, p.c = a - p.s, _.e && (_.e = ln(a) + Yn(_.e)), _.b && (_.b = p.s + Yn(_.b));
}, jT = function(i, u) {
  var a = i[0] ? Su(i[0]).harness : 0, o = a && a.aliases, c, h, d, g;
  if (!o)
    return u;
  c = Ur({}, u);
  for (h in o)
    if (h in c)
      for (g = o[h].split(","), d = g.length; d--; )
        c[g[d]] = c[h];
  return c;
}, QT = function(i, u, a, o) {
  var c = u.ease || o || "power1.inOut", h, d;
  if (Xn(u))
    d = a[i] || (a[i] = []), u.forEach(function(g, v) {
      return d.push({
        t: v / (u.length - 1) * 100,
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
}, Jo = function(i, u, a, o, c) {
  return We(i) ? i.call(u, a, o, c) : Mn(i) && ~i.indexOf("random(") ? rs(i) : i;
}, hf = J0 + "repeat,repeatDelay,yoyo,repeatRefresh,yoyoEase,easeReverse,autoRevert", fy = {};
dl(hf + ",id,stagger,delay,duration,paused,scrollTrigger", function(f) {
  return fy[f] = 1;
});
hf = hf.split(",");
var fn = /* @__PURE__ */ (function(f) {
  N_(i, f);
  function i(a, o, c, h) {
    var d;
    typeof o == "number" && (c.duration = o, o = c, c = null), d = f.call(this, h ? o : Ko(o)) || this;
    var g = d.vars, v = g.duration, p = g.delay, _ = g.immediateRender, S = g.stagger, b = g.overwrite, M = g.keyframes, T = g.defaults, R = g.scrollTrigger, j = o.parent || Qe, X = (Xn(a) || B_(a) ? Ii(a[0]) : "length" in o) ? [a] : li(a), Z, Y, Q, tt, N, K, P, V;
    if (d._targets = X.length ? k0(X) : as("GSAP target " + a + " not found. https://gsap.com", !Bl.nullTargetWarn) || [], d._ptLookup = [], d._overwrite = b, M || S || Hc(v) || Hc(p)) {
      o = d.vars;
      var ut = o.easeReverse || o.yoyoEase;
      if (Z = d.timeline = new cl({
        data: "nested",
        defaults: T || {},
        targets: j && j.data === "nested" ? j.vars.targets : X
      }), Z.kill(), Z.parent = Z._dp = Ji(d), Z._start = 0, S || Hc(v) || Hc(p)) {
        if (tt = X.length, P = S && W_(S), Ni(S))
          for (N in S)
            ~hf.indexOf(N) && (V || (V = {}), V[N] = S[N]);
        for (Y = 0; Y < tt; Y++)
          Q = sf(o, fy), Q.stagger = 0, ut && (Q.easeReverse = ut), V && Ur(Q, V), K = X[Y], Q.duration = +Jo(v, Ji(d), Y, K, X), Q.delay = (+Jo(p, Ji(d), Y, K, X) || 0) - d._delay, !S && tt === 1 && Q.delay && (d._delay = p = Q.delay, d._start += p, Q.delay = 0), Z.to(K, Q, P ? P(Y, K, X) : 0), Z._ease = ce.none;
        Z.duration() ? v = p = 0 : d.timeline = 0;
      } else if (M) {
        Ko(Ll(Z.vars.defaults, {
          ease: "none"
        })), Z._ease = Tu(M.ease || o.ease || "none");
        var it = 0, St, Mt, et;
        if (Xn(M))
          M.forEach(function(F) {
            return Z.to(X, F, ">");
          }), Z.duration();
        else {
          Q = {};
          for (N in M)
            N === "ease" || N === "easeEach" || QT(N, M[N], Q, M.easeEach);
          for (N in Q)
            for (St = Q[N].sort(function(F, k) {
              return F.t - k.t;
            }), it = 0, Y = 0; Y < St.length; Y++)
              Mt = St[Y], et = {
                ease: Mt.e,
                duration: (Mt.t - (Y ? St[Y - 1].t : 0)) / 100 * v
              }, et[N] = Mt.v, Z.to(X, et, it), it += et.duration;
          Z.duration() < v && Z.to({}, {
            duration: v - Z.duration()
          });
        }
      }
      v || d.duration(v = Z.duration());
    } else
      d.timeline = 0;
    return b === !0 && !G0 && (za = Ji(d), Qe.killTweensOf(X), za = 0), Ri(j, Ji(d), c), o.reversed && d.reverse(), o.paused && d.paused(!0), (_ || !v && !M && d._start === je(j._time) && hl(_) && ST(Ji(d)) && j.data !== "nested") && (d._tTime = -Ee, d.render(Math.max(0, -p) || 0)), R && J_(Ji(d), R), d;
  }
  var u = i.prototype;
  return u.render = function(o, c, h) {
    var d = this._time, g = this._tDur, v = this._dur, p = o < 0, _ = o > g - Ee && !p ? g : o < Ee ? 0 : o, S, b, M, T, R, j, X, Z;
    if (!v)
      TT(this, o, c, h);
    else if (_ !== this._tTime || !o || h || !this._initted && this._tTime || this._startAt && this._zTime < 0 !== p || this._lazy) {
      if (S = _, Z = this.timeline, this._repeat) {
        if (T = v + this._rDelay, this._repeat < -1 && p)
          return this.totalTime(T * 100 + o, c, h);
        if (S = je(_ % T), _ === g ? (M = this._repeat, S = v) : (R = je(_ / T), M = ~~R, M && M === R ? (S = v, M--) : S > v && (S = v)), j = this._yoyo && M & 1, j && (S = v - S), R = Br(this._tTime, T), S === d && !h && this._initted && M === R)
          return this._tTime = _, this;
        M !== R && this.vars.repeatRefresh && !j && !this._lock && S !== T && this._initted && (this._lock = h = 1, this.render(je(T * M), !0).invalidate()._lock = 0);
      }
      if (!this._initted) {
        if (k_(this, p ? o : S, h, c, _))
          return this._tTime = 0, this;
        if (d !== this._time && !(h && this.vars.repeatRefresh && M !== R))
          return this;
        if (v !== this._dur)
          return this.render(o, c, h);
      }
      if (this._rEase) {
        var Y = S < d;
        if (Y !== this._inv) {
          var Q = Y ? d : v - d;
          this._inv = Y, this._from && (this.ratio = 1 - this.ratio), this._invRatio = this.ratio, this._invTime = d, this._invRecip = Q ? (Y ? -1 : 1) / Q : 0, this._invScale = Y ? -this.ratio : 1 - this.ratio, this._invEase = Y ? this._rEase : this._ease;
        }
        this.ratio = X = this._invRatio + this._invScale * this._invEase((S - this._invTime) * this._invRecip);
      } else
        this.ratio = X = this._ease(S / v);
      if (this._from && (this.ratio = X = 1 - X), this._tTime = _, this._time = S, !this._act && this._ts && (this._act = 1, this._lazy = 0), !d && _ && !c && !R && (Nl(this, "onStart"), this._tTime !== _))
        return this;
      for (b = this._pt; b; )
        b.r(X, b.d), b = b._next;
      Z && Z.render(o < 0 ? o : Z._dur * Z._ease(S / this._dur), c, h) || this._startAt && (this._zTime = o), this._onUpdate && !c && (p && b0(this, o, c, h), Nl(this, "onUpdate")), this._repeat && M !== R && this.vars.onRepeat && !c && this.parent && Nl(this, "onRepeat"), (_ === this._tDur || !_) && this._tTime === _ && (p && !this._onUpdate && b0(this, o, !0, !0), (o || !v) && (_ === this._tDur && this._ts > 0 || !_ && this._ts < 0) && qa(this, 1), !c && !(p && !d) && (_ || d || j) && (Nl(this, _ === g ? "onComplete" : "onReverseComplete", !0), this._prom && !(_ < g && this.timeScale() > 0) && this._prom()));
    }
    return this;
  }, u.targets = function() {
    return this._targets;
  }, u.invalidate = function(o) {
    return (!o || !this.vars.runBackwards) && (this._startAt = 0), this._pt = this._op = this._onUpdate = this._lazy = this.ratio = 0, this._ptLookup = [], this.timeline && this.timeline.invalidate(o), f.prototype.invalidate.call(this, o);
  }, u.resetTo = function(o, c, h, d, g) {
    os || Dl.wake(), this._ts || this.play();
    var v = Math.min(this._dur, (this._dp._time - this._start) * this._ts), p;
    return this._initted || W0(this, v), p = this._ease(v / this._dur), GT(this, o, c, h, d, p, v, g) ? this.resetTo(o, c, h, d, 1) : (xf(this, 0), this.parent || K_(this._dp, this, "_first", "_last", this._dp._sort ? "_start" : 0), this.render(0));
  }, u.kill = function(o, c) {
    if (c === void 0 && (c = "all"), !o && (!c || c === "all"))
      return this._lazy = this._pt = 0, this.parent ? Lo(this) : this.scrollTrigger && this.scrollTrigger.kill(!!Un), this;
    if (this.timeline) {
      var h = this.timeline.totalDuration();
      return this.timeline.killTweensOf(o, c, za && za.vars.overwrite !== !0)._first || Lo(this), this.parent && h !== this.timeline.totalDuration() && Hr(this, this._dur * this.timeline._tDur / h, 0, 1), this;
    }
    var d = this._targets, g = o ? li(o) : d, v = this._ptLookup, p = this._pt, _, S, b, M, T, R, j;
    if ((!c || c === "all") && _T(d, g))
      return c === "all" && (this._pt = 0), Lo(this);
    for (_ = this._op = this._op || [], c !== "all" && (Mn(c) && (T = {}, dl(c, function(X) {
      return T[X] = 1;
    }), c = T), c = jT(d, c)), j = d.length; j--; )
      if (~g.indexOf(d[j])) {
        S = v[j], c === "all" ? (_[j] = c, M = S, b = {}) : (b = _[j] = _[j] || {}, M = c);
        for (T in M)
          R = S && S[T], R && ((!("kill" in R.d) || R.d.kill(T) === !0) && Tf(this, R, "_pt"), delete S[T]), b !== "all" && (b[T] = 1);
      }
    return this._initted && !this._pt && p && Lo(this), this;
  }, i.to = function(o, c) {
    return new i(o, c, arguments[2]);
  }, i.from = function(o, c) {
    return Fo(1, arguments);
  }, i.delayedCall = function(o, c, h, d) {
    return new i(c, 0, {
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
  }, i.fromTo = function(o, c, h) {
    return Fo(2, arguments);
  }, i.set = function(o, c) {
    return c.duration = 0, c.repeatDelay || (c.repeat = 0), new i(o, c);
  }, i.killTweensOf = function(o, c, h) {
    return Qe.killTweensOf(o, c, h);
  }, i;
})(ss);
Ll(fn.prototype, {
  _targets: [],
  _lazy: 0,
  _startAt: 0,
  _op: 0,
  _onInit: 0
});
dl("staggerTo,staggerFrom,staggerFromTo", function(f) {
  fn[f] = function() {
    var i = new cl(), u = T0.call(arguments, 0);
    return u.splice(f === "staggerFromTo" ? 5 : 4, 0, 0), i[f].apply(i, u);
  };
});
var I0 = function(i, u, a) {
  return i[u] = a;
}, hy = function(i, u, a) {
  return i[u](a);
}, ZT = function(i, u, a, o) {
  return i[u](o.fp, a);
}, KT = function(i, u, a) {
  return i.setAttribute(u, a);
}, tm = function(i, u) {
  return We(i[u]) ? hy : j0(i[u]) && i.setAttribute ? KT : I0;
}, dy = function(i, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * i) * 1e6) / 1e6, u);
}, FT = function(i, u) {
  return u.set(u.t, u.p, !!(u.s + u.c * i), u);
}, my = function(i, u) {
  var a = u._pt, o = "";
  if (!i && u.b)
    o = u.b;
  else if (i === 1 && u.e)
    o = u.e;
  else {
    for (; a; )
      o = a.p + (a.m ? a.m(a.s + a.c * i) : Math.round((a.s + a.c * i) * 1e4) / 1e4) + o, a = a._next;
    o += u.c;
  }
  u.set(u.t, u.p, o, u);
}, em = function(i, u) {
  for (var a = u._pt; a; )
    a.r(i, a.d), a = a._next;
}, JT = function(i, u, a, o) {
  for (var c = this._pt, h; c; )
    h = c._next, c.p === o && c.modifier(i, u, a), c = h;
}, kT = function(i) {
  for (var u = this._pt, a, o; u; )
    o = u._next, u.p === i && !u.op || u.op === i ? Tf(this, u, "_pt") : u.dep || (a = 1), u = o;
  return !a;
}, PT = function(i, u, a, o) {
  o.mSet(i, u, o.m.call(o.tween, a, o.mt), o);
}, gy = function(i) {
  for (var u = i._pt, a, o, c, h; u; ) {
    for (a = u._next, o = c; o && o.pr > u.pr; )
      o = o._next;
    (u._prev = o ? o._prev : h) ? u._prev._next = u : c = u, (u._next = o) ? o._prev = u : h = u, u = a;
  }
  i._pt = c;
}, ml = /* @__PURE__ */ (function() {
  function f(u, a, o, c, h, d, g, v, p) {
    this.t = a, this.s = c, this.c = h, this.p = o, this.r = d || dy, this.d = g || this, this.set = v || I0, this.pr = p || 0, this._next = u, u && (u._prev = this);
  }
  var i = f.prototype;
  return i.modifier = function(a, o, c) {
    this.mSet = this.mSet || this.set, this.set = PT, this.m = a, this.mt = c, this.tween = o;
  }, f;
})();
dl(J0 + "parent,duration,ease,delay,overwrite,runBackwards,startAt,yoyo,immediateRender,repeat,repeatDelay,data,paused,reversed,lazy,callbackScope,stringFilter,id,yoyoEase,stagger,inherit,repeatRefresh,keyframes,autoRevert,scrollTrigger,easeReverse", function(f) {
  return F0[f] = 1;
});
Hl.TweenMax = Hl.TweenLite = fn;
Hl.TimelineLite = Hl.TimelineMax = cl;
Qe = new cl({
  sortChildren: !1,
  defaults: is,
  autoRemoveChildren: !0,
  id: "root",
  smoothChildTiming: !0
});
Bl.stringFilter = ry;
var Eu = [], Wc = {}, $T = [], Z1 = 0, WT = 0, r0 = function(i) {
  return (Wc[i] || $T).map(function(u) {
    return u();
  });
}, cs = function() {
  var i = Date.now(), u = [];
  i - Z1 > 2 && (r0("matchMediaInit"), Eu.forEach(function(a) {
    var o = a.queries, c = a.conditions, h, d, g, v;
    for (d in o)
      h = wi.matchMedia(o[d]).matches, h && (g = 1), h !== c[d] && (c[d] = h, v = 1);
    v && (a.revert(), g && u.push(a));
  }), r0("matchMediaRevert"), u.forEach(function(a) {
    return a.onMatch(a, function(o) {
      return a.add(null, o);
    });
  }), Z1 = i, r0("matchMedia"));
}, vy = /* @__PURE__ */ (function() {
  function f(u, a) {
    this.selector = a && E0(a), this.data = [], this._r = [], this.isReverted = !1, this.id = WT++, u && this.add(u);
  }
  var i = f.prototype;
  return i.add = function(a, o, c) {
    We(a) && (c = o, o = a, a = We);
    var h = this, d = function() {
      var v = qe, p = h.selector, _;
      return v && v !== h && v.data.push(h), c && (h.selector = E0(c)), qe = h, _ = o.apply(h, arguments), We(_) && h._r.push(_), qe = v, h.selector = p, h.isReverted = !1, _;
    };
    return h.last = d, a === We ? d(h, function(g) {
      return h.add(null, g);
    }) : a ? h[a] = d : d;
  }, i.ignore = function(a) {
    var o = qe;
    qe = null, a(this), qe = o;
  }, i.getTweens = function() {
    var a = [];
    return this.data.forEach(function(o) {
      return o instanceof f ? a.push.apply(a, o.getTweens()) : o instanceof fn && !(o.parent && o.parent.data === "nested") && a.push(o);
    }), a;
  }, i.clear = function() {
    this._r.length = this.data.length = 0;
  }, i.kill = function(a, o) {
    var c = this;
    if (a ? (function() {
      for (var d = c.getTweens(), g = c.data.length, v; g--; )
        v = c.data[g], v.data === "isFlip" && (v.revert(), v.getChildren(!0, !0, !1).forEach(function(p) {
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
      }), g = c.data.length; g--; )
        v = c.data[g], v instanceof cl ? v.data !== "nested" && (v.scrollTrigger && v.scrollTrigger.revert(), v.kill()) : !(v instanceof fn) && v.revert && v.revert(a);
      c._r.forEach(function(p) {
        return p(a, c);
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
  }, i.revert = function(a) {
    this.kill(a || {});
  }, f;
})(), IT = /* @__PURE__ */ (function() {
  function f(u) {
    this.contexts = [], this.scope = u, qe && qe.data.push(this);
  }
  var i = f.prototype;
  return i.add = function(a, o, c) {
    Ni(a) || (a = {
      matches: a
    });
    var h = new vy(0, c || this.scope), d = h.conditions = {}, g, v, p;
    qe && !h.selector && (h.selector = qe.selector), this.contexts.push(h), o = h.add("onMatch", o), h.queries = a;
    for (v in a)
      v === "all" ? p = 1 : (g = wi.matchMedia(a[v]), g && (Eu.indexOf(h) < 0 && Eu.push(h), (d[v] = g.matches) && (p = 1), g.addListener ? g.addListener(cs) : g.addEventListener("change", cs), (h._mqs || (h._mqs = [])).push(g)));
    return p && o(h, function(_) {
      return h.add(null, _);
    }), this;
  }, i.revert = function(a) {
    this.kill(a || {});
  }, i.kill = function(a) {
    this.contexts.forEach(function(o) {
      return o.kill(a, !0);
    });
  }, f;
})(), df = {
  registerPlugin: function() {
    for (var i = arguments.length, u = new Array(i), a = 0; a < i; a++)
      u[a] = arguments[a];
    u.forEach(function(o) {
      return iy(o);
    });
  },
  timeline: function(i) {
    return new cl(i);
  },
  getTweensOf: function(i, u) {
    return Qe.getTweensOf(i, u);
  },
  getProperty: function(i, u, a, o) {
    Mn(i) && (i = li(i)[0]);
    var c = Su(i || {}).get, h = a ? Z_ : Q_;
    return a === "native" && (a = ""), i && (u ? h((zl[u] && zl[u].get || c)(i, u, a, o)) : function(d, g, v) {
      return h((zl[d] && zl[d].get || c)(i, d, g, v));
    });
  },
  quickSetter: function(i, u, a) {
    if (i = li(i), i.length > 1) {
      var o = i.map(function(p) {
        return vl.quickSetter(p, u, a);
      }), c = o.length;
      return function(p) {
        for (var _ = c; _--; )
          o[_](p);
      };
    }
    i = i[0] || {};
    var h = zl[u], d = Su(i), g = d.harness && (d.harness.aliases || {})[u] || u, v = h ? function(p) {
      var _ = new h();
      Mr._pt = 0, _.init(i, a ? p + a : p, Mr, 0, [i]), _.render(1, _), Mr._pt && em(1, Mr);
    } : d.set(i, g);
    return h ? v : function(p) {
      return v(i, g, a ? p + a : p, d, 1);
    };
  },
  quickTo: function(i, u, a) {
    var o, c = vl.to(i, Ll((o = {}, o[u] = "+=0.1", o.paused = !0, o.stagger = 0, o), a || {})), h = function(g, v, p) {
      return c.resetTo(u, g, v, p);
    };
    return h.tween = c, h;
  },
  isTweening: function(i) {
    return Qe.getTweensOf(i, !0).length > 0;
  },
  defaults: function(i) {
    return i && i.ease && (i.ease = Tu(i.ease, is.ease)), X1(is, i || {});
  },
  config: function(i) {
    return X1(Bl, i || {});
  },
  registerEffect: function(i) {
    var u = i.name, a = i.effect, o = i.plugins, c = i.defaults, h = i.extendTimeline;
    (o || "").split(",").forEach(function(d) {
      return d && !zl[d] && !Hl[d] && as(u + " effect requires " + d + " plugin.");
    }), l0[u] = function(d, g, v) {
      return a(li(d), Ll(g || {}, c), v);
    }, h && (cl.prototype[u] = function(d, g, v) {
      return this.add(l0[u](d, Ni(g) ? g : (v = g) && {}, this), v);
    });
  },
  registerEase: function(i, u) {
    ce[i] = Tu(u);
  },
  parseEase: function(i, u) {
    return arguments.length ? Tu(i, u) : ce;
  },
  getById: function(i) {
    return Qe.getById(i);
  },
  exportRoot: function(i, u) {
    i === void 0 && (i = {});
    var a = new cl(i), o, c;
    for (a.smoothChildTiming = hl(i.smoothChildTiming), Qe.remove(a), a._dp = 0, a._time = a._tTime = Qe._time, o = Qe._first; o; )
      c = o._next, (u || !(!o._dur && o instanceof fn && o.vars.onComplete === o._targets[0])) && Ri(a, o, o._start - o._delay), o = c;
    return Ri(Qe, a, 0), a;
  },
  context: function(i, u) {
    return i ? new vy(i, u) : qe;
  },
  matchMedia: function(i) {
    return new IT(i);
  },
  matchMediaRefresh: function() {
    return Eu.forEach(function(i) {
      var u = i.conditions, a, o;
      for (o in u)
        u[o] && (u[o] = !1, a = 1);
      a && i.revert();
    }) || cs();
  },
  addEventListener: function(i, u) {
    var a = Wc[i] || (Wc[i] = []);
    ~a.indexOf(u) || a.push(u);
  },
  removeEventListener: function(i, u) {
    var a = Wc[i], o = a && a.indexOf(u);
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
    toArray: li,
    selector: E0,
    mapRange: ny,
    pipe: wT,
    unitize: OT,
    interpolate: DT,
    shuffle: $_
  },
  install: q_,
  effects: l0,
  ticker: Dl,
  updateRoot: cl.updateRoot,
  plugins: zl,
  globalTimeline: Qe,
  core: {
    PropTween: ml,
    globals: X_,
    Tween: fn,
    Timeline: cl,
    Animation: ss,
    getCache: Su,
    _removeLinkedListItem: Tf,
    reverting: function() {
      return Un;
    },
    context: function(i) {
      return i && qe && (qe.data.push(i), i._ctx = qe), qe;
    },
    suppressOverwrites: function(i) {
      return G0 = i;
    }
  }
};
dl("to,from,fromTo,delayedCall,set,killTweensOf", function(f) {
  return df[f] = fn[f];
});
Dl.add(cl.updateRoot);
Mr = df.to({}, {
  duration: 0
});
var tE = function(i, u) {
  for (var a = i._pt; a && a.p !== u && a.op !== u && a.fp !== u; )
    a = a._next;
  return a;
}, eE = function(i, u) {
  var a = i._targets, o, c, h;
  for (o in u)
    for (c = a.length; c--; )
      h = i._ptLookup[c][o], h && (h = h.d) && (h._pt && (h = tE(h, o)), h && h.modifier && h.modifier(u[o], i, a[c], o));
}, o0 = function(i, u) {
  return {
    name: i,
    headless: 1,
    rawVars: 1,
    //don't pre-process function-based values or "random()" strings.
    init: function(o, c, h) {
      h._onInit = function(d) {
        var g, v;
        if (Mn(c) && (g = {}, dl(c, function(p) {
          return g[p] = 1;
        }), c = g), u) {
          g = {};
          for (v in c)
            g[v] = u(c[v]);
          c = g;
        }
        eE(d, c);
      };
    }
  };
}, vl = df.registerPlugin({
  name: "attr",
  init: function(i, u, a, o, c) {
    var h, d, g;
    this.tween = a;
    for (h in u)
      g = i.getAttribute(h) || "", d = this.add(i, "setAttribute", (g || 0) + "", u[h], o, c, 0, 0, h), d.op = h, d.b = g, this._props.push(h);
  },
  render: function(i, u) {
    for (var a = u._pt; a; )
      Un ? a.set(a.t, a.p, a.b, a) : a.r(i, a.d), a = a._next;
  }
}, {
  name: "endArray",
  headless: 1,
  init: function(i, u) {
    for (var a = u.length; a--; )
      this.add(i, a, i[a] || 0, u[a], 0, 0, 0, 0, 0, 1);
  }
}, o0("roundProps", x0), o0("modifiers"), o0("snap", I_)) || df;
fn.version = cl.version = vl.version = "3.15.1";
Y_ = 1;
Q0() && Lr();
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
var K1, Ca, Or, nm, pu, F1, lm, nE = function() {
  return typeof window < "u";
}, ta = {}, mu = 180 / Math.PI, Rr = Math.PI / 180, _r = Math.atan2, J1 = 1e8, im = /([A-Z])/g, lE = /(left|right|width|margin|padding|x)/i, iE = /[\s,\(]\S/, zi = {
  autoAlpha: "opacity,visibility",
  scale: "scaleX,scaleY",
  alpha: "opacity"
}, A0 = function(i, u) {
  return u.set(u.t, u.p, Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u, u);
}, aE = function(i, u) {
  return u.set(u.t, u.p, i === 1 ? u.e : Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u, u);
}, uE = function(i, u) {
  return u.set(u.t, u.p, i ? Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u : u.b, u);
}, rE = function(i, u) {
  return u.set(u.t, u.p, i === 1 ? u.e : i ? Math.round((u.s + u.c * i) * 1e4) / 1e4 + u.u : u.b, u);
}, oE = function(i, u) {
  var a = u.s + u.c * i;
  u.set(u.t, u.p, ~~(a + (a < 0 ? -0.5 : 0.5)) + u.u, u);
}, py = function(i, u) {
  return u.set(u.t, u.p, i ? u.e : u.b, u);
}, _y = function(i, u) {
  return u.set(u.t, u.p, i !== 1 ? u.b : u.e, u);
}, sE = function(i, u, a) {
  return i.style[u] = a;
}, cE = function(i, u, a) {
  return i.style.setProperty(u, a);
}, fE = function(i, u, a) {
  return i._gsap[u] = a;
}, hE = function(i, u, a) {
  return i._gsap.scaleX = i._gsap.scaleY = a;
}, dE = function(i, u, a, o, c) {
  var h = i._gsap;
  h.scaleX = h.scaleY = a, h.renderTransform(c, h);
}, mE = function(i, u, a, o, c) {
  var h = i._gsap;
  h[u] = a, h.renderTransform(c, h);
}, Ze = "transform", gl = Ze + "Origin", gE = function f(i, u) {
  var a = this, o = this.target, c = o.style, h = o._gsap;
  if (i in ta && c) {
    if (this.tfm = this.tfm || {}, i !== "transform")
      i = zi[i] || i, ~i.indexOf(",") ? i.split(",").forEach(function(d) {
        return a.tfm[d] = ki(o, d);
      }) : this.tfm[i] = h.x ? h[i] : ki(o, i), i === gl && (this.tfm.zOrigin = h.zOrigin);
    else
      return zi.transform.split(",").forEach(function(d) {
        return f.call(a, d, u);
      });
    if (this.props.indexOf(Ze) >= 0)
      return;
    h.svg && (this.svgo = o.getAttribute("data-svg-origin"), this.props.push(gl, u, "")), i = Ze;
  }
  (c || u) && this.props.push(i, u, c[i]);
}, yy = function(i) {
  i.translate && (i.removeProperty("translate"), i.removeProperty("scale"), i.removeProperty("rotate"));
}, vE = function() {
  var i = this.props, u = this.target, a = u.style, o = u._gsap, c, h;
  for (c = 0; c < i.length; c += 3)
    i[c + 1] ? i[c + 1] === 2 ? u[i[c]](i[c + 2]) : u[i[c]] = i[c + 2] : i[c + 2] ? a[i[c]] = i[c + 2] : a.removeProperty(i[c].substr(0, 2) === "--" ? i[c] : i[c].replace(im, "-$1").toLowerCase());
  if (this.tfm) {
    for (h in this.tfm)
      o[h] = this.tfm[h];
    o.svg && (o.renderTransform(), u.setAttribute("data-svg-origin", this.svgo || "")), c = lm(), (!c || !c.isStart) && !a[Ze] && (yy(a), o.zOrigin && a[gl] && (a[gl] += " " + o.zOrigin + "px", o.zOrigin = 0, o.renderTransform()), o.uncache = 1);
  }
}, Sy = function(i, u) {
  var a = {
    target: i,
    props: [],
    revert: vE,
    save: gE
  };
  return i._gsap || vl.core.getCache(i), u && i.style && i.nodeType && u.split(",").forEach(function(o) {
    return a.save(o);
  }), a;
}, by, w0 = function(i, u) {
  var a = Ca.createElementNS ? Ca.createElementNS((u || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), i) : Ca.createElement(i);
  return a && a.style ? a : Ca.createElement(i);
}, Ul = function f(i, u, a) {
  var o = getComputedStyle(i);
  return o[u] || o.getPropertyValue(u.replace(im, "-$1").toLowerCase()) || o.getPropertyValue(u) || !a && f(i, Yr(u) || u, 1) || "";
}, k1 = "O,Moz,ms,Ms,Webkit".split(","), Yr = function(i, u, a) {
  var o = u || pu, c = o.style, h = 5;
  if (i in c && !a)
    return i;
  for (i = i.charAt(0).toUpperCase() + i.substr(1); h-- && !(k1[h] + i in c); )
    ;
  return h < 0 ? null : (h === 3 ? "ms" : h >= 0 ? k1[h] : "") + i;
}, O0 = function() {
  nE() && window.document && (K1 = window, Ca = K1.document, Or = Ca.documentElement, pu = w0("div") || {
    style: {}
  }, w0("div"), Ze = Yr(Ze), gl = Ze + "Origin", pu.style.cssText = "border-width:0;line-height:0;position:absolute;padding:0", by = !!Yr("perspective"), lm = vl.core.reverting, nm = 1);
}, P1 = function(i) {
  var u = i.ownerSVGElement, a = w0("svg", u && u.getAttribute("xmlns") || "http://www.w3.org/2000/svg"), o = i.cloneNode(!0), c;
  o.style.display = "block", a.appendChild(o), Or.appendChild(a);
  try {
    c = o.getBBox();
  } catch {
  }
  return a.removeChild(o), Or.removeChild(a), c;
}, $1 = function(i, u) {
  for (var a = u.length; a--; )
    if (i.hasAttribute(u[a]))
      return i.getAttribute(u[a]);
}, Ty = function(i) {
  var u, a;
  try {
    u = i.getBBox();
  } catch {
    u = P1(i), a = 1;
  }
  return u && (u.width || u.height) || a || (u = P1(i)), u && !u.width && !u.x && !u.y ? {
    x: +$1(i, ["x", "cx", "x1"]) || 0,
    y: +$1(i, ["y", "cy", "y1"]) || 0,
    width: 0,
    height: 0
  } : u;
}, Ey = function(i) {
  return !!(i.getCTM && (!i.parentNode || i.ownerSVGElement) && Ty(i));
}, Xa = function(i, u) {
  if (u) {
    var a = i.style, o;
    u in ta && u !== gl && (u = Ze), a.removeProperty ? (o = u.substr(0, 2), (o === "ms" || u.substr(0, 6) === "webkit") && (u = "-" + u), a.removeProperty(o === "--" ? u : u.replace(im, "-$1").toLowerCase())) : a.removeAttribute(u);
  }
}, Da = function(i, u, a, o, c, h) {
  var d = new ml(i._pt, u, a, 0, 1, h ? _y : py);
  return i._pt = d, d.b = o, d.e = c, i._props.push(a), d;
}, W1 = {
  deg: 1,
  rad: 1,
  turn: 1
}, pE = {
  grid: 1,
  flex: 1
}, Va = function f(i, u, a, o) {
  var c = parseFloat(a) || 0, h = (a + "").trim().substr((c + "").length) || "px", d = pu.style, g = lE.test(u), v = i.tagName.toLowerCase() === "svg", p = (v ? "client" : "offset") + (g ? "Width" : "Height"), _ = 100, S = o === "px", b = o === "%", M, T, R, j;
  if (o === h || !c || W1[o] || W1[h])
    return c;
  if (h !== "px" && !S && (c = f(i, u, a, "px")), j = i.getCTM && Ey(i), (b || h === "%") && (ta[u] || ~u.indexOf("adius")))
    return M = j ? i.getBBox()[g ? "width" : "height"] : i[p], ln(b ? c / M * _ : c / 100 * M);
  if (d[g ? "width" : "height"] = _ + (S ? h : o), T = o !== "rem" && ~u.indexOf("adius") || o === "em" && i.appendChild && !v ? i : i.parentNode, j && (T = (i.ownerSVGElement || {}).parentNode), (!T || T === Ca || !T.appendChild) && (T = Ca.body), R = T._gsap, R && b && R.width && g && R.time === Dl.time && !R.uncache)
    return ln(c / R.width * _);
  if (b && (u === "height" || u === "width")) {
    var X = i.style[u];
    i.style[u] = _ + o, M = i[p], X ? i.style[u] = X : Xa(i, u);
  } else
    (b || h === "%") && !pE[Ul(T, "display")] && (d.position = Ul(i, "position")), T === i && (d.position = "static"), T.appendChild(pu), M = pu[p], T.removeChild(pu), d.position = "absolute";
  return g && b && (R = Su(T), R.time = Dl.time, R.width = T[p]), ln(S ? M * c / _ : M && c ? _ / M * c : 0);
}, ki = function(i, u, a, o) {
  var c;
  return nm || O0(), u in zi && u !== "transform" && (u = zi[u], ~u.indexOf(",") && (u = u.split(",")[0])), ta[u] && u !== "transform" ? (c = hs(i, o), c = u !== "transformOrigin" ? c[u] : c.svg ? c.origin : gf(Ul(i, gl)) + " " + c.zOrigin + "px") : (c = i.style[u], (!c || c === "auto" || o || ~(c + "").indexOf("calc(")) && (c = mf[u] && mf[u](i, u, a) || Ul(i, u) || G_(i, u) || (u === "opacity" ? 1 : 0))), a && !~(c + "").trim().indexOf(" ") ? Va(i, u, c, a) + a : c;
}, _E = function(i, u, a, o) {
  if (!a || a === "none") {
    var c = Yr(u, i, 1), h = c && Ul(i, c, 1);
    h && h !== a ? (u = c, a = h) : u === "borderColor" && (a = Ul(i, "borderTopColor"));
  }
  var d = new ml(this._pt, i.style, u, 0, 1, my), g = 0, v = 0, p, _, S, b, M, T, R, j, X, Z, Y, Q;
  if (d.b = a, d.e = o, a += "", o += "", o.substring(0, 6) === "var(--" && (o = Ul(i, o.substring(4, o.indexOf(")")))), o === "auto" && (T = i.style[u], i.style[u] = o, o = Ul(i, u) || o, T ? i.style[u] = T : Xa(i, u)), p = [a, o], ry(p), a = p[0], o = p[1], S = a.match(xr) || [], Q = o.match(xr) || [], Q.length) {
    for (; _ = xr.exec(o); )
      R = _[0], X = o.substring(g, _.index), M ? M = (M + 1) % 5 : (X.substr(-5) === "rgba(" || X.substr(-5) === "hsla(") && (M = 1), R !== (T = S[v++] || "") && (b = parseFloat(T) || 0, Y = T.substr((b + "").length), R.charAt(1) === "=" && (R = wr(b, R) + Y), j = parseFloat(R), Z = R.substr((j + "").length), g = xr.lastIndex - Z.length, Z || (Z = Z || Bl.units[u] || Y, g === o.length && (o += Z, d.e += Z)), Y !== Z && (b = Va(i, u, T, Z) || 0), d._pt = {
        _next: d._pt,
        p: X || v === 1 ? X : ",",
        //note: SVG spec allows omission of comma/space when a negative sign is wedged between two numbers, like 2.5-5.3 instead of 2.5,-5.3 but when tweening, the negative value may switch to positive, so we insert the comma just in case.
        s: b,
        c: j - b,
        m: M && M < 4 || u === "zIndex" ? Math.round : 0
      });
    d.c = g < o.length ? o.substring(g, o.length) : "";
  } else
    d.r = u === "display" && o === "none" ? _y : py;
  return L_.test(o) && (d.e = 0), this._pt = d, d;
}, I1 = {
  top: "0%",
  bottom: "100%",
  left: "0%",
  right: "100%",
  center: "50%"
}, yE = function(i) {
  var u = i.split(" "), a = u[0], o = u[1] || "50%";
  return (a === "top" || a === "bottom" || o === "left" || o === "right") && (i = a, a = o, o = i), u[0] = I1[a] || a, u[1] = I1[o] || o, u.join(" ");
}, SE = function(i, u) {
  if (u.tween && u.tween._time === u.tween._dur) {
    var a = u.t, o = a.style, c = u.u, h = a._gsap, d, g, v;
    if (c === "all" || c === !0)
      o.cssText = "", g = 1;
    else
      for (c = c.split(","), v = c.length; --v > -1; )
        d = c[v], ta[d] && (g = 1, d = d === "transformOrigin" ? gl : Ze), Xa(a, d);
    g && (Xa(a, Ze), h && (h.svg && a.removeAttribute("transform"), o.scale = o.rotate = o.translate = "none", hs(a, 1), h.uncache = 1, yy(o)));
  }
}, mf = {
  clearProps: function(i, u, a, o, c) {
    if (c.data !== "isFromStart") {
      var h = i._pt = new ml(i._pt, u, a, 0, 0, SE);
      return h.u = o, h.pr = -10, h.tween = c, i._props.push(a), 1;
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
}, fs = [1, 0, 0, 1, 0, 0], xy = {}, My = function(i) {
  return i === "matrix(1, 0, 0, 1, 0, 0)" || i === "none" || !i;
}, t_ = function(i) {
  var u = Ul(i, Ze);
  return My(u) ? fs : u.substr(7).match(H_).map(ln);
}, am = function(i, u) {
  var a = i._gsap || Su(i), o = i.style, c = t_(i), h, d, g, v;
  return a.svg && i.getAttribute("transform") ? (g = i.transform.baseVal.consolidate().matrix, c = [g.a, g.b, g.c, g.d, g.e, g.f], c.join(",") === "1,0,0,1,0,0" ? fs : c) : (c === fs && !i.offsetParent && i !== Or && !a.svg && (g = o.display, o.display = "block", h = i.parentNode, (!h || !i.offsetParent && !i.getBoundingClientRect().width) && (v = 1, d = i.nextElementSibling, Or.appendChild(i)), c = t_(i), g ? o.display = g : Xa(i, "display"), v && (d ? h.insertBefore(i, d) : h ? h.appendChild(i) : Or.removeChild(i))), u && c.length > 6 ? [c[0], c[1], c[4], c[5], c[12], c[13]] : c);
}, R0 = function(i, u, a, o, c, h) {
  var d = i._gsap, g = c || am(i, !0), v = d.xOrigin || 0, p = d.yOrigin || 0, _ = d.xOffset || 0, S = d.yOffset || 0, b = g[0], M = g[1], T = g[2], R = g[3], j = g[4], X = g[5], Z = u.split(" "), Y = parseFloat(Z[0]) || 0, Q = parseFloat(Z[1]) || 0, tt, N, K, P;
  a ? g !== fs && (N = b * R - M * T) && (K = Y * (R / N) + Q * (-T / N) + (T * X - R * j) / N, P = Y * (-M / N) + Q * (b / N) - (b * X - M * j) / N, Y = K, Q = P) : (tt = Ty(i), Y = tt.x + (~Z[0].indexOf("%") ? Y / 100 * tt.width : Y), Q = tt.y + (~(Z[1] || Z[0]).indexOf("%") ? Q / 100 * tt.height : Q)), o || o !== !1 && d.smooth ? (j = Y - v, X = Q - p, d.xOffset = _ + (j * b + X * T) - j, d.yOffset = S + (j * M + X * R) - X) : d.xOffset = d.yOffset = 0, d.xOrigin = Y, d.yOrigin = Q, d.smooth = !!o, d.origin = u, d.originIsAbsolute = !!a, i.style[gl] = "0px 0px", h && (Da(h, d, "xOrigin", v, Y), Da(h, d, "yOrigin", p, Q), Da(h, d, "xOffset", _, d.xOffset), Da(h, d, "yOffset", S, d.yOffset)), i.setAttribute("data-svg-origin", Y + " " + Q);
}, hs = function(i, u) {
  var a = i._gsap || new sy(i);
  if ("x" in a && !u && !a.uncache)
    return a;
  var o = i.style, c = a.scaleX < 0, h = "px", d = "deg", g = getComputedStyle(i), v = Ul(i, gl) || "0", p, _, S, b, M, T, R, j, X, Z, Y, Q, tt, N, K, P, V, ut, it, St, Mt, et, F, k, W, st, w, Et, z, Nt, E, A;
  return p = _ = S = T = R = j = X = Z = Y = 0, b = M = 1, a.svg = !!(i.getCTM && Ey(i)), g.translate && ((g.translate !== "none" || g.scale !== "none" || g.rotate !== "none") && (o[Ze] = (g.translate !== "none" ? "translate3d(" + (g.translate + " 0 0").split(" ").slice(0, 3).join(", ") + ") " : "") + (g.rotate !== "none" ? "rotate(" + g.rotate + ") " : "") + (g.scale !== "none" ? "scale(" + g.scale.split(" ").join(",") + ") " : "") + (g[Ze] !== "none" ? g[Ze] : "")), o.scale = o.rotate = o.translate = "none"), N = am(i, a.svg), a.svg && (a.uncache ? (W = i.getBBox(), v = a.xOrigin - W.x + "px " + (a.yOrigin - W.y) + "px", k = "") : k = !u && i.getAttribute("data-svg-origin"), R0(i, k || v, !!k || a.originIsAbsolute, a.smooth !== !1, N)), Q = a.xOrigin || 0, tt = a.yOrigin || 0, N !== fs && (ut = N[0], it = N[1], St = N[2], Mt = N[3], p = et = N[4], _ = F = N[5], N.length === 6 ? (b = Math.sqrt(ut * ut + it * it), M = Math.sqrt(Mt * Mt + St * St), T = ut || it ? _r(it, ut) * mu : 0, X = St || Mt ? _r(St, Mt) * mu + T : 0, X && (M *= Math.abs(Math.cos(X * Rr))), a.svg && (p -= Q - (Q * ut + tt * St), _ -= tt - (Q * it + tt * Mt))) : (A = N[6], Nt = N[7], w = N[8], Et = N[9], z = N[10], E = N[11], p = N[12], _ = N[13], S = N[14], K = _r(A, z), R = K * mu, K && (P = Math.cos(-K), V = Math.sin(-K), k = et * P + w * V, W = F * P + Et * V, st = A * P + z * V, w = et * -V + w * P, Et = F * -V + Et * P, z = A * -V + z * P, E = Nt * -V + E * P, et = k, F = W, A = st), K = _r(-St, z), j = K * mu, K && (P = Math.cos(-K), V = Math.sin(-K), k = ut * P - w * V, W = it * P - Et * V, st = St * P - z * V, E = Mt * V + E * P, ut = k, it = W, St = st), K = _r(it, ut), T = K * mu, K && (P = Math.cos(K), V = Math.sin(K), k = ut * P + it * V, W = et * P + F * V, it = it * P - ut * V, F = F * P - et * V, ut = k, et = W), R && Math.abs(R) + Math.abs(T) > 359.9 && (R = T = 0, j = 180 - j), b = ln(Math.sqrt(ut * ut + it * it + St * St)), M = ln(Math.sqrt(F * F + A * A)), K = _r(et, F), X = Math.abs(K) > 2e-4 ? K * mu : 0, Y = E ? 1 / (E < 0 ? -E : E) : 0), a.svg && (k = i.getAttribute("transform"), a.forceCSS = i.setAttribute("transform", "") || !My(Ul(i, Ze)), k && i.setAttribute("transform", k))), Math.abs(X) > 90 && Math.abs(X) < 270 && (c ? (b *= -1, X += T <= 0 ? 180 : -180, T += T <= 0 ? 180 : -180) : (M *= -1, X += X <= 0 ? 180 : -180)), u = u || a.uncache, a.x = p - ((a.xPercent = p && (!u && a.xPercent || (Math.round(i.offsetWidth / 2) === Math.round(-p) ? -50 : 0))) ? i.offsetWidth * a.xPercent / 100 : 0) + h, a.y = _ - ((a.yPercent = _ && (!u && a.yPercent || (Math.round(i.offsetHeight / 2) === Math.round(-_) ? -50 : 0))) ? i.offsetHeight * a.yPercent / 100 : 0) + h, a.z = S + h, a.scaleX = ln(b), a.scaleY = ln(M), a.rotation = ln(T) + d, a.rotationX = ln(R) + d, a.rotationY = ln(j) + d, a.skewX = X + d, a.skewY = Z + d, a.transformPerspective = Y + h, (a.zOrigin = parseFloat(v.split(" ")[2]) || !u && a.zOrigin || 0) && (o[gl] = gf(v)), a.xOffset = a.yOffset = 0, a.force3D = Bl.force3D, a.renderTransform = a.svg ? TE : by ? Ay : bE, a.uncache = 0, a;
}, gf = function(i) {
  return (i = i.split(" "))[0] + " " + i[1];
}, s0 = function(i, u, a) {
  var o = Yn(u);
  return ln(parseFloat(u) + parseFloat(Va(i, "x", a + "px", o))) + o;
}, bE = function(i, u) {
  u.z = "0px", u.rotationY = u.rotationX = "0deg", u.force3D = 0, Ay(i, u);
}, hu = "0deg", Do = "0px", du = ") ", Ay = function(i, u) {
  var a = u || this, o = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.z, v = a.rotation, p = a.rotationY, _ = a.rotationX, S = a.skewX, b = a.skewY, M = a.scaleX, T = a.scaleY, R = a.transformPerspective, j = a.force3D, X = a.target, Z = a.zOrigin, Y = "", Q = j === "auto" && i && i !== 1 || j === !0;
  if (Z && (_ !== hu || p !== hu)) {
    var tt = parseFloat(p) * Rr, N = Math.sin(tt), K = Math.cos(tt), P;
    tt = parseFloat(_) * Rr, P = Math.cos(tt), h = s0(X, h, N * P * -Z), d = s0(X, d, -Math.sin(tt) * -Z), g = s0(X, g, K * P * -Z + Z);
  }
  R !== Do && (Y += "perspective(" + R + du), (o || c) && (Y += "translate(" + o + "%, " + c + "%) "), (Q || h !== Do || d !== Do || g !== Do) && (Y += g !== Do || Q ? "translate3d(" + h + ", " + d + ", " + g + ") " : "translate(" + h + ", " + d + du), v !== hu && (Y += "rotate(" + v + du), p !== hu && (Y += "rotateY(" + p + du), _ !== hu && (Y += "rotateX(" + _ + du), (S !== hu || b !== hu) && (Y += "skew(" + S + ", " + b + du), (M !== 1 || T !== 1) && (Y += "scale(" + M + ", " + T + du), X.style[Ze] = Y || "translate(0, 0)";
}, TE = function(i, u) {
  var a = u || this, o = a.xPercent, c = a.yPercent, h = a.x, d = a.y, g = a.rotation, v = a.skewX, p = a.skewY, _ = a.scaleX, S = a.scaleY, b = a.target, M = a.xOrigin, T = a.yOrigin, R = a.xOffset, j = a.yOffset, X = a.forceCSS, Z = parseFloat(h), Y = parseFloat(d), Q, tt, N, K, P;
  g = parseFloat(g), v = parseFloat(v), p = parseFloat(p), p && (p = parseFloat(p), v += p, g += p), g || v ? (g *= Rr, v *= Rr, Q = Math.cos(g) * _, tt = Math.sin(g) * _, N = Math.sin(g - v) * -S, K = Math.cos(g - v) * S, v && (p *= Rr, P = Math.tan(v - p), P = Math.sqrt(1 + P * P), N *= P, K *= P, p && (P = Math.tan(p), P = Math.sqrt(1 + P * P), Q *= P, tt *= P)), Q = ln(Q), tt = ln(tt), N = ln(N), K = ln(K)) : (Q = _, K = S, tt = N = 0), (Z && !~(h + "").indexOf("px") || Y && !~(d + "").indexOf("px")) && (Z = Va(b, "x", h, "px"), Y = Va(b, "y", d, "px")), (M || T || R || j) && (Z = ln(Z + M - (M * Q + T * N) + R), Y = ln(Y + T - (M * tt + T * K) + j)), (o || c) && (P = b.getBBox(), Z = ln(Z + o / 100 * P.width), Y = ln(Y + c / 100 * P.height)), P = "matrix(" + Q + "," + tt + "," + N + "," + K + "," + Z + "," + Y + ")", b.setAttribute("transform", P), X && (b.style[Ze] = P);
}, EE = function(i, u, a, o, c) {
  var h = 360, d = Mn(c), g = parseFloat(c) * (d && ~c.indexOf("rad") ? mu : 1), v = g - o, p = o + v + "deg", _, S;
  return d && (_ = c.split("_")[1], _ === "short" && (v %= h, v !== v % (h / 2) && (v += v < 0 ? h : -h)), _ === "cw" && v < 0 ? v = (v + h * J1) % h - ~~(v / h) * h : _ === "ccw" && v > 0 && (v = (v - h * J1) % h - ~~(v / h) * h)), i._pt = S = new ml(i._pt, u, a, o, v, aE), S.e = p, S.u = "deg", i._props.push(a), S;
}, e_ = function(i, u) {
  for (var a in u)
    i[a] = u[a];
  return i;
}, xE = function(i, u, a) {
  var o = e_({}, a._gsap), c = "perspective,force3D,transformOrigin,svgOrigin", h = a.style, d, g, v, p, _, S, b, M;
  o.svg ? (v = a.getAttribute("transform"), a.setAttribute("transform", ""), h[Ze] = u, d = hs(a, 1), Xa(a, Ze), a.setAttribute("transform", v)) : (v = getComputedStyle(a)[Ze], h[Ze] = u, d = hs(a, 1), h[Ze] = v);
  for (g in ta)
    v = o[g], p = d[g], v !== p && c.indexOf(g) < 0 && (b = Yn(v), M = Yn(p), _ = b !== M ? Va(a, g, v, M) : parseFloat(v), S = parseFloat(p), i._pt = new ml(i._pt, d, g, _, S - _, A0), i._pt.u = M || 0, i._props.push(g));
  e_(d, o);
};
dl("padding,margin,Width,Radius", function(f, i) {
  var u = "Top", a = "Right", o = "Bottom", c = "Left", h = (i < 3 ? [u, a, o, c] : [u + c, u + a, o + a, o + c]).map(function(d) {
    return i < 2 ? f + d : "border" + d + f;
  });
  mf[i > 1 ? "border" + f : f] = function(d, g, v, p, _) {
    var S, b;
    if (arguments.length < 4)
      return S = h.map(function(M) {
        return ki(d, M, v);
      }), b = S.join(" "), b.split(S[0]).length === 5 ? S[0] : b;
    S = (p + "").split(" "), b = {}, h.forEach(function(M, T) {
      return b[M] = S[T] = S[T] || S[(T - 1) / 2 | 0];
    }), d.init(g, b, _);
  };
});
var wy = {
  name: "css",
  register: O0,
  targetTest: function(i) {
    return i.style && i.nodeType;
  },
  init: function(i, u, a, o, c) {
    var h = this._props, d = i.style, g = a.vars.startAt, v, p, _, S, b, M, T, R, j, X, Z, Y, Q, tt, N, K, P;
    nm || O0(), this.styles = this.styles || Sy(i), K = this.styles.props, this.tween = a;
    for (T in u)
      if (T !== "autoRound" && (p = u[T], !(zl[T] && cy(T, u, a, o, i, c)))) {
        if (b = typeof p, M = mf[T], b === "function" && (p = p.call(a, o, i, c), b = typeof p), b === "string" && ~p.indexOf("random(") && (p = rs(p)), M)
          M(this, i, T, p, a) && (N = 1);
        else if (T.substr(0, 2) === "--")
          v = (getComputedStyle(i).getPropertyValue(T) + "").trim(), p += "", Ha.lastIndex = 0, Ha.test(v) || (R = Yn(v), j = Yn(p), j ? R !== j && (v = Va(i, T, v, j) + j) : R && (p += R)), this.add(d, "setProperty", v, p, o, c, 0, 0, T), h.push(T), K.push(T, 0, d[T]);
        else if (b !== "undefined") {
          if (g && T in g ? (v = typeof g[T] == "function" ? g[T].call(a, o, i, c) : g[T], Mn(v) && ~v.indexOf("random(") && (v = rs(v)), Yn(v + "") || v === "auto" || (v += Bl.units[T] || Yn(ki(i, T)) || ""), (v + "").charAt(1) === "=" && (v = ki(i, T))) : v = ki(i, T), S = parseFloat(v), X = b === "string" && p.charAt(1) === "=" && p.substr(0, 2), X && (p = p.substr(2)), _ = parseFloat(p), T in zi && (T === "autoAlpha" && (S === 1 && ki(i, "visibility") === "hidden" && _ && (S = 0), K.push("visibility", 0, d.visibility), Da(this, d, "visibility", S ? "inherit" : "hidden", _ ? "inherit" : "hidden", !_)), T !== "scale" && T !== "transform" && (T = zi[T], ~T.indexOf(",") && (T = T.split(",")[0]))), Z = T in ta, Z) {
            if (this.styles.save(T), P = p, b === "string" && p.substring(0, 6) === "var(--") {
              if (p = Ul(i, p.substring(4, p.indexOf(")"))), p.substring(0, 5) === "calc(") {
                var V = i.style.perspective;
                i.style.perspective = p, p = Ul(i, "perspective"), V ? i.style.perspective = V : Xa(i, "perspective");
              }
              _ = parseFloat(p);
            }
            if (Y || (Q = i._gsap, Q.renderTransform && !u.parseTransform || hs(i, u.parseTransform), tt = u.smoothOrigin !== !1 && Q.smooth, Y = this._pt = new ml(this._pt, d, Ze, 0, 1, Q.renderTransform, Q, 0, -1), Y.dep = 1), T === "scale")
              this._pt = new ml(this._pt, Q, "scaleY", Q.scaleY, (X ? wr(Q.scaleY, X + _) : _) - Q.scaleY || 0, A0), this._pt.u = 0, h.push("scaleY", T), T += "X";
            else if (T === "transformOrigin") {
              K.push(gl, 0, d[gl]), p = yE(p), Q.svg ? R0(i, p, 0, tt, 0, this) : (j = parseFloat(p.split(" ")[2]) || 0, j !== Q.zOrigin && Da(this, Q, "zOrigin", Q.zOrigin, j), Da(this, d, T, gf(v), gf(p)));
              continue;
            } else if (T === "svgOrigin") {
              R0(i, p, 1, tt, 0, this);
              continue;
            } else if (T in xy) {
              EE(this, Q, T, S, X ? wr(S, X + p) : p);
              continue;
            } else if (T === "smoothOrigin") {
              Da(this, Q, "smooth", Q.smooth, p);
              continue;
            } else if (T === "force3D") {
              Q[T] = p;
              continue;
            } else if (T === "transform") {
              xE(this, p, i);
              continue;
            }
          } else T in d || (T = Yr(T) || T);
          if (Z || (_ || _ === 0) && (S || S === 0) && !iE.test(p) && T in d)
            R = (v + "").substr((S + "").length), _ || (_ = 0), j = Yn(p) || (T in Bl.units ? Bl.units[T] : R), R !== j && (S = Va(i, T, v, j)), this._pt = new ml(this._pt, Z ? Q : d, T, S, (X ? wr(S, X + _) : _) - S, !Z && (j === "px" || T === "zIndex") && u.autoRound !== !1 ? oE : A0), this._pt.u = j || 0, Z && P !== p ? (this._pt.b = v, this._pt.e = P, this._pt.r = rE) : R !== j && j !== "%" && (this._pt.b = v, this._pt.r = uE);
          else if (T in d)
            _E.call(this, i, T, v, X ? X + p : p);
          else if (T in i)
            this.add(i, T, v || i[T], X ? X + p : p, o, c);
          else if (T !== "parseTransform") {
            K0(T, p);
            continue;
          }
          Z || (T in d ? K.push(T, 0, d[T]) : typeof i[T] == "function" ? K.push(T, 2, i[T]()) : K.push(T, 1, v || i[T])), h.push(T);
        }
      }
    N && gy(this);
  },
  render: function(i, u) {
    if (u.tween._time || !lm())
      for (var a = u._pt; a; )
        a.r(i, a.d), a = a._next;
    else
      u.styles.revert();
  },
  get: ki,
  aliases: zi,
  getSetter: function(i, u, a) {
    var o = zi[u];
    return o && o.indexOf(",") < 0 && (u = o), u in ta && u !== gl && (i._gsap.x || ki(i, "x")) ? a && F1 === a ? u === "scale" ? hE : fE : (F1 = a || {}) && (u === "scale" ? dE : mE) : i.style && !j0(i.style[u]) ? sE : ~u.indexOf("-") ? cE : tm(i, u);
  },
  core: {
    _removeProperty: Xa,
    _getMatrix: am
  }
};
vl.utils.checkPrefix = Yr;
vl.core.getStyleSaver = Sy;
(function(f, i, u, a) {
  var o = dl(f + "," + i + "," + u, function(c) {
    ta[c] = 1;
  });
  dl(i, function(c) {
    Bl.units[c] = "deg", xy[c] = 1;
  }), zi[o[13]] = f + "," + i, dl(a, function(c) {
    var h = c.split(":");
    zi[h[1]] = o[h[0]];
  });
})("x,y,z,scale,scaleX,scaleY,xPercent,yPercent", "rotation,rotationX,rotationY,skewX,skewY", "transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective", "0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY");
dl("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective", function(f) {
  Bl.units[f] = "px";
});
vl.registerPlugin(wy);
var Tn = vl.registerPlugin(wy) || vl;
Tn.core.Tween;
function ME(f, i) {
  for (var u = 0; u < i.length; u++) {
    var a = i[u];
    a.enumerable = a.enumerable || !1, a.configurable = !0, "value" in a && (a.writable = !0), Object.defineProperty(f, a.key, a);
  }
}
function AE(f, i, u) {
  return i && ME(f.prototype, i), f;
}
var Nn, Ic, fl, Na, Ua, zr, Oy, gu, Cr, Ry, $i, hi, zy, Cy = function() {
  return Nn || typeof window < "u" && (Nn = window.gsap) && Nn.registerPlugin && Nn;
}, Dy = 1, Ar = [], te = [], Di = [], ko = Date.now, z0 = function(i, u) {
  return u;
}, wE = function() {
  var i = Cr.core, u = i.bridge || {}, a = i._scrollers, o = i._proxies;
  a.push.apply(a, te), o.push.apply(o, Di), te = a, Di = o, z0 = function(h, d) {
    return u[h](d);
  };
}, La = function(i, u) {
  return ~Di.indexOf(i) && Di[Di.indexOf(i) + 1][u];
}, Po = function(i) {
  return !!~Ry.indexOf(i);
}, Pn = function(i, u, a, o, c) {
  return i.addEventListener(u, a, {
    passive: o !== !1,
    capture: !!c
  });
}, kn = function(i, u, a, o) {
  return i.removeEventListener(u, a, !!o);
}, Lc = "scrollLeft", Yc = "scrollTop", C0 = function() {
  return $i && $i.isPressed || te.cache++;
}, vf = function(i, u) {
  var a = function o(c) {
    if (c || c === 0) {
      Dy && fl.history.scrollRestoration !== "manual" && (fl.history.scrollRestoration = "manual");
      var h = $i && $i.isPressed;
      c = o.v = Math.round(c) || ($i && $i.iOS ? 1 : 0), i(c), o.cacheID = te.cache, h && z0("ss", c);
    } else (u || te.cache !== o.cacheID || z0("ref")) && (o.cacheID = te.cache, o.v = i());
    return o.v + o.offset;
  };
  return a.offset = 0, i && a;
}, tl = {
  s: Lc,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: vf(function(f) {
    return arguments.length ? fl.scrollTo(f, vn.sc()) : fl.pageXOffset || Na[Lc] || Ua[Lc] || zr[Lc] || 0;
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
  op: tl,
  sc: vf(function(f) {
    return arguments.length ? fl.scrollTo(tl.sc(), f) : fl.pageYOffset || Na[Yc] || Ua[Yc] || zr[Yc] || 0;
  })
}, sl = function(i, u) {
  return (u && u._ctx && u._ctx.selector || Nn.utils.toArray)(i)[0] || (typeof i == "string" && Nn.config().nullTargetWarn !== !1 ? console.warn("Element not found:", i) : null);
}, OE = function(i, u) {
  for (var a = u.length; a--; )
    if (u[a] === i || u[a].contains(i))
      return !0;
  return !1;
}, Ga = function(i, u) {
  var a = u.s, o = u.sc;
  Po(i) && (i = Na.scrollingElement || Ua);
  var c = te.indexOf(i), h = o === vn.sc ? 1 : 2;
  !~c && (c = te.push(i) - 1), te[c + h] || Pn(i, "scroll", C0);
  var d = te[c + h], g = d || (te[c + h] = vf(La(i, a), !0) || (Po(i) ? o : vf(function(v) {
    return arguments.length ? i[a] = v : i[a];
  })));
  return g.target = i, d || (g.smooth = Nn.getProperty(i, "scrollBehavior") === "smooth"), g;
}, D0 = function(i, u, a) {
  var o = i, c = i, h = ko(), d = h, g = u || 50, v = Math.max(500, g * 3), p = function(M, T) {
    var R = ko();
    T || R - h > g ? (c = o, o = M, d = h, h = R) : a ? o += M : o = c + (M - c) / (R - d) * (h - d);
  }, _ = function() {
    c = o = a ? 0 : o, d = h = 0;
  }, S = function(M) {
    var T = d, R = c, j = ko();
    return (M || M === 0) && M !== o && p(M), h === d || j - d > v ? 0 : (o + (a ? R : -R)) / ((a ? j : h) - T) * 1e3;
  };
  return {
    update: p,
    reset: _,
    getVelocity: S
  };
}, No = function(i, u) {
  return u && !i._gsapAllow && i.cancelable !== !1 && i.preventDefault(), i.changedTouches ? i.changedTouches[0] : i;
}, n_ = function(i) {
  var u = Math.max.apply(Math, i), a = Math.min.apply(Math, i);
  return Math.abs(u) >= Math.abs(a) ? u : a;
}, Ny = function() {
  Cr = Nn.core.globals().ScrollTrigger, Cr && Cr.core && wE();
}, Uy = function(i) {
  return Nn = i || Cy(), !Ic && Nn && typeof document < "u" && document.body && (fl = window, Na = document, Ua = Na.documentElement, zr = Na.body, Ry = [fl, Na, Ua, zr], Nn.utils.clamp, zy = Nn.core.context || function() {
  }, gu = "onpointerenter" in zr ? "pointer" : "mouse", Oy = an.isTouch = fl.matchMedia && fl.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in fl || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, hi = an.eventTypes = ("ontouchstart" in Ua ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Ua ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Dy = 0;
  }, 500), Ic = 1), Cr || Ny(), Ic;
};
tl.op = vn;
te.cache = 0;
var an = /* @__PURE__ */ (function() {
  function f(u) {
    this.init(u);
  }
  var i = f.prototype;
  return i.init = function(a) {
    Ic || Uy(Nn) || console.warn("Please gsap.registerPlugin(Observer)"), Cr || Ny();
    var o = a.tolerance, c = a.dragMinimum, h = a.type, d = a.target, g = a.lineHeight, v = a.debounce, p = a.preventDefault, _ = a.onStop, S = a.onStopDelay, b = a.ignore, M = a.wheelSpeed, T = a.event, R = a.onDragStart, j = a.onDragEnd, X = a.onDrag, Z = a.onPress, Y = a.onRelease, Q = a.onRight, tt = a.onLeft, N = a.onUp, K = a.onDown, P = a.onChangeX, V = a.onChangeY, ut = a.onChange, it = a.onToggleX, St = a.onToggleY, Mt = a.onHover, et = a.onHoverEnd, F = a.onMove, k = a.ignoreCheck, W = a.isNormalizer, st = a.onGestureStart, w = a.onGestureEnd, Et = a.onWheel, z = a.onEnable, Nt = a.onDisable, E = a.onClick, A = a.scrollSpeed, J = a.capture, L = a.allowClicks, mt = a.lockAxis, ht = a.onLockAxis;
    this.target = d = sl(d) || Ua, this.vars = a, b && (b = Nn.utils.toArray(b)), o = o || 1e-9, c = c || 0, M = M || 1, A = A || 1, h = h || "wheel,touch,pointer", v = v !== !1, g || (g = parseFloat(fl.getComputedStyle(zr).lineHeight) || 22);
    var Rt, ot, gt, zt, pt, Ut, Yt, B = this, nt = 0, vt = 0, dt = a.passive || !p && a.passive !== !1, bt = Ga(d, tl), jt = Ga(d, vn), kt = bt(), Ht = jt(), Ct = ~h.indexOf("touch") && !~h.indexOf("pointer") && hi[0] === "pointerdown", ee = Po(d), ue = d.ownerDocument || Na, Ke = [0, 0, 0], Re = [0, 0, 0], pn = 0, Vn = function() {
      return pn = ko();
    }, xe = function(rt, Tt) {
      return (B.event = rt) && b && OE(rt.target, b) || Tt && Ct && rt.pointerType !== "touch" || k && k(rt, Tt);
    }, Yl = function() {
      B._vx.reset(), B._vy.reset(), ot.pause(), _ && _(B);
    }, Be = function() {
      var rt = B.deltaX = n_(Ke), Tt = B.deltaY = n_(Re), lt = Math.abs(rt) >= o, ft = Math.abs(Tt) >= o;
      ut && (lt || ft) && ut(B, rt, Tt, Ke, Re), lt && (Q && B.deltaX > 0 && Q(B), tt && B.deltaX < 0 && tt(B), P && P(B), it && B.deltaX < 0 != nt < 0 && it(B), nt = B.deltaX, Ke[0] = Ke[1] = Ke[2] = 0), ft && (K && B.deltaY > 0 && K(B), N && B.deltaY < 0 && N(B), V && V(B), St && B.deltaY < 0 != vt < 0 && St(B), vt = B.deltaY, Re[0] = Re[1] = Re[2] = 0), (zt || gt) && (F && F(B), gt && (R && gt === 1 && R(B), X && X(B), gt = 0), zt = !1), Ut && !(Ut = !1) && ht && ht(B), pt && (Et(B), pt = !1), Rt = 0;
    }, Gn = function(rt, Tt, lt) {
      Ke[lt] += rt, Re[lt] += Tt, B._vx.update(rt), B._vy.update(Tt), v ? Rt || (Rt = requestAnimationFrame(Be)) : Be();
    }, Ie = function(rt, Tt) {
      mt && !Yt && (B.axis = Yt = Math.abs(rt) > Math.abs(Tt) ? "x" : "y", Ut = !0), Yt !== "y" && (Ke[2] += rt, B._vx.update(rt, !0)), Yt !== "x" && (Re[2] += Tt, B._vy.update(Tt, !0)), v ? Rt || (Rt = requestAnimationFrame(Be)) : Be();
    }, el = function(rt) {
      if (!xe(rt, 1)) {
        rt = No(rt, p);
        var Tt = rt.clientX, lt = rt.clientY, ft = Tt - B.x, yt = lt - B.y, xt = B.isDragging;
        B.x = Tt, B.y = lt, (xt || (ft || yt) && (Math.abs(B.startX - Tt) >= c || Math.abs(B.startY - lt) >= c)) && (gt || (gt = xt ? 2 : 1), xt || (B.isDragging = !0), Ie(ft, yt));
      }
    }, ql = B.onPress = function(at) {
      xe(at, 1) || at && at.button || (B.axis = Yt = null, ot.pause(), B.isPressed = !0, at = No(at), nt = vt = 0, B.startX = B.x = at.clientX, B.startY = B.y = at.clientY, B._vx.reset(), B._vy.reset(), Pn(W ? d : ue, hi[1], el, dt, !0), B.deltaX = B.deltaY = 0, Z && Z(B));
    }, qt = B.onRelease = function(at) {
      if (!xe(at, 1)) {
        kn(W ? d : ue, hi[1], el, !0);
        var rt = !isNaN(B.y - B.startY), Tt = B.isDragging, lt = Tt && (Math.abs(B.x - B.startX) > 3 || Math.abs(B.y - B.startY) > 3), ft = No(at);
        !lt && rt && (B._vx.reset(), B._vy.reset(), p && L && Nn.delayedCall(0.08, function() {
          if (ko() - pn > 300 && !at.defaultPrevented) {
            if (at.target.click)
              at.target.click();
            else if (ue.createEvent) {
              var yt = ue.createEvent("MouseEvents");
              yt.initMouseEvent("click", !0, !0, fl, 1, ft.screenX, ft.screenY, ft.clientX, ft.clientY, !1, !1, !1, !1, 0, null), at.target.dispatchEvent(yt);
            }
          }
        })), B.isDragging = B.isGesturing = B.isPressed = !1, _ && Tt && !W && ot.restart(!0), gt && Be(), j && Tt && j(B), Y && Y(B, lt);
      }
    }, Xl = function(rt) {
      return rt.touches && rt.touches.length > 1 && (B.isGesturing = !0) && st(rt, B.isDragging);
    }, hn = function() {
      return (B.isGesturing = !1) || w(B);
    }, An = function(rt) {
      if (!xe(rt)) {
        var Tt = bt(), lt = jt();
        Gn((Tt - kt) * A, (lt - Ht) * A, 1), kt = Tt, Ht = lt, _ && ot.restart(!0);
      }
    }, dn = function(rt) {
      if (!xe(rt)) {
        rt = No(rt, p), Et && (pt = !0);
        var Tt = (rt.deltaMode === 1 ? g : rt.deltaMode === 2 ? fl.innerHeight : 1) * M;
        Gn(rt.deltaX * Tt, rt.deltaY * Tt, 0), _ && !W && ot.restart(!0);
      }
    }, Vl = function(rt) {
      if (!xe(rt)) {
        var Tt = rt.clientX, lt = rt.clientY, ft = Tt - B.x, yt = lt - B.y;
        B.x = Tt, B.y = lt, zt = !0, _ && ot.restart(!0), (ft || yt) && Ie(ft, yt);
      }
    }, Gl = function(rt) {
      B.event = rt, Mt(B);
    }, nl = function(rt) {
      B.event = rt, et(B);
    }, ct = function(rt) {
      return xe(rt) || No(rt, p) && E(B);
    };
    ot = B._dc = Nn.delayedCall(S || 0.25, Yl).pause(), B.deltaX = B.deltaY = 0, B._vx = D0(0, 50, !0), B._vy = D0(0, 50, !0), B.scrollX = bt, B.scrollY = jt, B.isDragging = B.isGesturing = B.isPressed = !1, zy(this), B.enable = function(at) {
      return B.isEnabled || (Pn(ee ? ue : d, "scroll", C0), h.indexOf("scroll") >= 0 && Pn(ee ? ue : d, "scroll", An, dt, J), h.indexOf("wheel") >= 0 && Pn(d, "wheel", dn, dt, J), (h.indexOf("touch") >= 0 && Oy || h.indexOf("pointer") >= 0) && (Pn(d, hi[0], ql, dt, J), Pn(ue, hi[2], qt), Pn(ue, hi[3], qt), L && Pn(d, "click", Vn, !0, !0), E && Pn(d, "click", ct), st && Pn(ue, "gesturestart", Xl), w && Pn(ue, "gestureend", hn), Mt && Pn(d, gu + "enter", Gl), et && Pn(d, gu + "leave", nl), F && Pn(d, gu + "move", Vl)), B.isEnabled = !0, B.isDragging = B.isGesturing = B.isPressed = zt = gt = !1, B._vx.reset(), B._vy.reset(), kt = bt(), Ht = jt(), at && at.type && ql(at), z && z(B)), B;
    }, B.disable = function() {
      B.isEnabled && (Ar.filter(function(at) {
        return at !== B && Po(at.target);
      }).length || kn(ee ? ue : d, "scroll", C0), B.isPressed && (B._vx.reset(), B._vy.reset(), kn(W ? d : ue, hi[1], el, !0)), kn(ee ? ue : d, "scroll", An, J), kn(d, "wheel", dn, J), kn(d, hi[0], ql, J), kn(ue, hi[2], qt), kn(ue, hi[3], qt), kn(d, "click", Vn, !0), kn(d, "click", ct), kn(ue, "gesturestart", Xl), kn(ue, "gestureend", hn), kn(d, gu + "enter", Gl), kn(d, gu + "leave", nl), kn(d, gu + "move", Vl), B.isEnabled = B.isPressed = B.isDragging = !1, Nt && Nt(B));
    }, B.kill = B.revert = function() {
      B.disable();
      var at = Ar.indexOf(B);
      at >= 0 && Ar.splice(at, 1), $i === B && ($i = 0);
    }, Ar.push(B), W && Po(d) && ($i = B), B.enable(T);
  }, AE(f, [{
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
an.version = "3.15.1";
an.create = function(f) {
  return new an(f);
};
an.register = Uy;
an.getAll = function() {
  return Ar.slice();
};
an.getById = function(f) {
  return Ar.filter(function(i) {
    return i.vars.id === f;
  })[0];
};
Cy() && Nn.registerPlugin(an);
var Ot, Tr, It, be, Cl, pe, um, pf, ds, $o, qo, qc, Hn, Mf, N0, Wn, l_, i_, Er, By, c0, Hy, $n, U0, Ly, Yy, Oa, B0, rm, Dr, om, Ya, H0, f0, Xc = 1, Ln = Date.now, h0 = Ln(), ii = 0, Xo = 0, a_ = function(i, u, a) {
  var o = Rl(i) && (i.substr(0, 6) === "clamp(" || i.indexOf("max") > -1);
  return a["_" + u + "Clamp"] = o, o ? i.substr(6, i.length - 7) : i;
}, u_ = function(i, u) {
  return u && (!Rl(i) || i.substr(0, 6) !== "clamp(") ? "clamp(" + i + ")" : i;
}, RE = function f() {
  return Xo && requestAnimationFrame(f);
}, r_ = function() {
  return Mf = 1;
}, o_ = function() {
  return Mf = 0;
}, Oi = function(i) {
  return i;
}, Vo = function(i) {
  return Math.round(i * 1e5) / 1e5 || 0;
}, qy = function() {
  return typeof window < "u";
}, Xy = function() {
  return Ot || qy() && (Ot = window.gsap) && Ot.registerPlugin && Ot;
}, wu = function(i) {
  return !!~um.indexOf(i);
}, Vy = function(i) {
  return (i === "Height" ? om : It["inner" + i]) || Cl["client" + i] || pe["client" + i];
}, Gy = function(i) {
  return La(i, "getBoundingClientRect") || (wu(i) ? function() {
    return af.width = It.innerWidth, af.height = om, af;
  } : function() {
    return Pi(i);
  });
}, zE = function(i, u, a) {
  var o = a.d, c = a.d2, h = a.a;
  return (h = La(i, "getBoundingClientRect")) ? function() {
    return h()[o];
  } : function() {
    return (u ? Vy(c) : i["client" + c]) || 0;
  };
}, CE = function(i, u) {
  return !u || ~Di.indexOf(i) ? Gy(i) : function() {
    return af;
  };
}, Ci = function(i, u) {
  var a = u.s, o = u.d2, c = u.d, h = u.a;
  return Math.max(0, (a = "scroll" + o) && (h = La(i, a)) ? h() - Gy(i)()[c] : wu(i) ? (Cl[a] || pe[a]) - Vy(o) : i[a] - i["offset" + o]);
}, Vc = function(i, u) {
  for (var a = 0; a < Er.length; a += 3)
    (!u || ~u.indexOf(Er[a + 1])) && i(Er[a], Er[a + 1], Er[a + 2]);
}, Rl = function(i) {
  return typeof i == "string";
}, qn = function(i) {
  return typeof i == "function";
}, Go = function(i) {
  return typeof i == "number";
}, vu = function(i) {
  return typeof i == "object";
}, Uo = function(i, u, a) {
  return i && i.progress(u ? 0 : 1) && a && i.pause();
}, yr = function(i, u, a) {
  if (i.enabled) {
    var o = i._ctx ? i._ctx.add(function() {
      return u(i, a);
    }) : u(i, a);
    o && o.totalTime && (i.callbackAnimation = o);
  }
}, Sr = Math.abs, jy = "left", Qy = "top", sm = "right", cm = "bottom", xu = "width", Mu = "height", Wo = "Right", Io = "Left", ts = "Top", es = "Bottom", cn = "padding", ti = "margin", qr = "Width", fm = "Height", gn = "px", ei = function(i) {
  return It.getComputedStyle(i.nodeType === Node.DOCUMENT_NODE ? i.scrollingElement : i);
}, DE = function(i) {
  var u = ei(i).position;
  i.style.position = u === "absolute" || u === "fixed" ? u : "relative";
}, s_ = function(i, u) {
  for (var a in u)
    a in i || (i[a] = u[a]);
  return i;
}, Pi = function(i, u) {
  var a = u && ei(i)[N0] !== "matrix(1, 0, 0, 1, 0, 0)" && Ot.to(i, {
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
  }).progress(1), o = i.getBoundingClientRect ? i.getBoundingClientRect() : i.scrollingElement.getBoundingClientRect();
  return a && a.progress(0).kill(), o;
}, _f = function(i, u) {
  var a = u.d2;
  return i["offset" + a] || i["client" + a] || 0;
}, Zy = function(i) {
  var u = [], a = i.labels, o = i.duration(), c;
  for (c in a)
    u.push(a[c] / o);
  return u;
}, NE = function(i) {
  return function(u) {
    return Ot.utils.snap(Zy(i), u);
  };
}, hm = function(i) {
  var u = Ot.utils.snap(i), a = Array.isArray(i) && i.slice(0).sort(function(o, c) {
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
    return !c || Math.abs(d - o) < h || d - o < 0 == c < 0 ? d : u(c < 0 ? o - i : o + i);
  };
}, UE = function(i) {
  return function(u, a) {
    return hm(Zy(i))(u, a.direction);
  };
}, Gc = function(i, u, a, o) {
  return a.split(",").forEach(function(c) {
    return i(u, c, o);
  });
}, xn = function(i, u, a, o, c) {
  return i.addEventListener(u, a, {
    passive: !o,
    capture: !!c
  });
}, En = function(i, u, a, o) {
  return i.removeEventListener(u, a, !!o);
}, jc = function(i, u, a) {
  a = a && a.wheelHandler, a && (i(u, "wheel", a), i(u, "touchmove", a));
}, c_ = {
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
}, tf = function(i, u) {
  if (Rl(i)) {
    var a = i.indexOf("="), o = ~a ? +(i.charAt(a - 1) + 1) * parseFloat(i.substr(a + 1)) : 0;
    ~a && (i.indexOf("%") > a && (o *= u / 100), i = i.substr(0, a - 1)), i = o + (i in yf ? yf[i] * u : ~i.indexOf("%") ? parseFloat(i) * u / 100 : parseFloat(i) || 0);
  }
  return i;
}, Zc = function(i, u, a, o, c, h, d, g) {
  var v = c.startColor, p = c.endColor, _ = c.fontSize, S = c.indent, b = c.fontWeight, M = be.createElement("div"), T = wu(a) || La(a, "pinType") === "fixed", R = i.indexOf("scroller") !== -1, j = T ? pe : a.tagName === "IFRAME" ? a.contentDocument.body : a, X = i.indexOf("start") !== -1, Z = X ? v : p, Y = "border-color:" + Z + ";font-size:" + _ + ";color:" + Z + ";font-weight:" + b + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return Y += "position:" + ((R || g) && T ? "fixed;" : "absolute;"), (R || g || !T) && (Y += (o === vn ? sm : cm) + ":" + (h + parseFloat(S)) + "px;"), d && (Y += "box-sizing:border-box;text-align:left;width:" + d.offsetWidth + "px;"), M._isStart = X, M.setAttribute("class", "gsap-marker-" + i + (u ? " marker-" + u : "")), M.style.cssText = Y, M.innerText = u || u === 0 ? i + "-" + u : i, j.children[0] ? j.insertBefore(M, j.children[0]) : j.appendChild(M), M._offset = M["offset" + o.op.d2], ef(M, 0, o, X), M;
}, ef = function(i, u, a, o) {
  var c = {
    display: "block"
  }, h = a[o ? "os2" : "p2"], d = a[o ? "p2" : "os2"];
  i._isFlipped = o, c[a.a + "Percent"] = o ? -100 : 0, c[a.a] = o ? "1px" : 0, c["border" + h + qr] = 1, c["border" + d + qr] = 0, c[a.p] = u + "px", Ot.set(i, c);
}, Wt = [], L0 = {}, ms, f_ = function() {
  return Ln() - ii > 34 && (ms || (ms = requestAnimationFrame(Wi)));
}, br = function() {
  (!$n || !$n.isPressed || $n.startX > pe.clientWidth) && (te.cache++, $n ? ms || (ms = requestAnimationFrame(Wi)) : Wi(), ii || Ru("scrollStart"), ii = Ln());
}, d0 = function() {
  Yy = It.innerWidth, Ly = It.innerHeight;
}, jo = function(i) {
  te.cache++, (i === !0 || !Hn && !Hy && !be.fullscreenElement && !be.webkitFullscreenElement && (!U0 || Yy !== It.innerWidth || Math.abs(It.innerHeight - Ly) > It.innerHeight * 0.25)) && pf.restart(!0);
}, Ou = {}, BE = [], Ky = function f() {
  return En(Pt, "scrollEnd", f) || _u(!0);
}, Ru = function(i) {
  return Ou[i] && Ou[i].map(function(u) {
    return u();
  }) || BE;
}, Ol = [], Fy = function(i) {
  for (var u = 0; u < Ol.length; u += 5)
    (!i || Ol[u + 4] && Ol[u + 4].query === i) && (Ol[u].style.cssText = Ol[u + 1], Ol[u].getBBox && Ol[u].setAttribute("transform", Ol[u + 2] || ""), Ol[u + 3].uncache = 1);
}, Jy = function() {
  te.cache++, te.forEach(function(i) {
    return qn(i) && (i.rec = i());
  });
}, dm = function(i, u) {
  var a;
  for (Wn = 0; Wn < Wt.length; Wn++)
    a = Wt[Wn], a && (!u || a._ctx === u) && (i ? a.kill(1) : a.revert(!0, !0));
  Ya = !0, u && Fy(u), u || Ru("revert");
}, ky = function(i, u) {
  te.cache++, (u || !In) && te.forEach(function(a) {
    return qn(a) && a.cacheID++ && (a.rec = 0);
  }), Rl(i) && (rm = i, It.history.scrollRestoration !== i && (It.history.scrollRestoration = i));
}, In, Au = 0, h_, HE = function() {
  if (h_ !== Au) {
    var i = h_ = Au;
    requestAnimationFrame(function() {
      return i === Au && _u(!0);
    });
  }
}, Py = function() {
  pe.appendChild(Dr), om = !$n && Dr.offsetHeight || It.innerHeight, pe.removeChild(Dr);
}, d_ = function(i) {
  return ds(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(u) {
    return u.style.display = i ? "none" : "block";
  });
}, _u = function(i, u) {
  if (Cl = be.documentElement, pe = be.body, um = [It, be, Cl, pe], ii && !i && !Ya) {
    xn(Pt, "scrollEnd", Ky);
    return;
  }
  Py(), In = Pt.isRefreshing = !0, Ya || Jy();
  var a = Ru("refreshInit");
  By && Pt.sort(), u || dm(), te.forEach(function(o) {
    qn(o) && (o.smooth && (o.target.style.scrollBehavior = "auto"), o(0));
  }), Wt.slice(0).forEach(function(o) {
    return o.refresh();
  }), Ya = !1, Wt.forEach(function(o) {
    if (o._subPinOffset && o.pin) {
      var c = o.vars.horizontal ? "offsetWidth" : "offsetHeight", h = o.pin[c];
      o.revert(!0, 1), o.adjustPinSpacing(o.pin[c] - h), o.refresh();
    }
  }), H0 = 1, d_(!0), Wt.forEach(function(o) {
    var c = Ci(o.scroller, o._dir), h = o.vars.end === "max" || o._endClamp && o.end > c, d = o._startClamp && o.start >= c;
    (h || d) && o.setPositions(d ? c - 1 : o.start, h ? Math.max(d ? c : o.start + 1, c) : o.end, !0);
  }), d_(!1), H0 = 0, a.forEach(function(o) {
    return o && o.render && o.render(-1);
  }), te.forEach(function(o) {
    qn(o) && (o.smooth && requestAnimationFrame(function() {
      return o.target.style.scrollBehavior = "smooth";
    }), o.rec && o(o.rec));
  }), ky(rm, 1), pf.pause(), Au++, In = 2, Wi(2), Wt.forEach(function(o) {
    return qn(o.vars.onRefresh) && o.vars.onRefresh(o);
  }), In = Pt.isRefreshing = !1, Ru("refresh");
}, Y0 = 0, nf = 1, ns, Wi = function(i) {
  if (i === 2 || !In && !Ya) {
    Pt.isUpdating = !0, ns && ns.update(0);
    var u = Wt.length, a = Ln(), o = a - h0 >= 50, c = u && Wt[0].scroll();
    if (nf = Y0 > c ? -1 : 1, In || (Y0 = c), o && (ii && !Mf && a - ii > 200 && (ii = 0, Ru("scrollEnd")), qo = h0, h0 = a), nf < 0) {
      for (Wn = u; Wn-- > 0; )
        Wt[Wn] && Wt[Wn].update(0, o);
      nf = 1;
    } else
      for (Wn = 0; Wn < u; Wn++)
        Wt[Wn] && Wt[Wn].update(0, o);
    Pt.isUpdating = !1;
  }
  ms = 0;
}, q0 = [jy, Qy, cm, sm, ti + es, ti + Wo, ti + ts, ti + Io, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], lf = q0.concat([xu, Mu, "boxSizing", "max" + qr, "max" + fm, "position", ti, cn, cn + ts, cn + Wo, cn + es, cn + Io]), LE = function(i, u, a) {
  Nr(a);
  var o = i._gsap;
  if (o.spacerIsNative)
    Nr(o.spacerState);
  else if (i._gsap.swappedIn) {
    var c = u.parentNode;
    c && (c.insertBefore(i, u), c.removeChild(u));
  }
  i._gsap.swappedIn = !1;
}, m0 = function(i, u, a, o) {
  if (!i._gsap.swappedIn) {
    for (var c = q0.length, h = u.style, d = i.style, g; c--; )
      g = q0[c], h[g] = a[g];
    h.position = a.position === "absolute" ? "absolute" : "relative", a.display === "inline" && (h.display = "inline-block"), d[cm] = d[sm] = "auto", h.flexBasis = a.flexBasis || "auto", h.overflow = "visible", h.boxSizing = "border-box", h[xu] = _f(i, tl) + gn, h[Mu] = _f(i, vn) + gn, h[cn] = d[ti] = d[Qy] = d[jy] = "0", Nr(o), d[xu] = d["max" + qr] = a[xu], d[Mu] = d["max" + fm] = a[Mu], d[cn] = a[cn], i.parentNode !== u && (i.parentNode.insertBefore(u, i), u.appendChild(i)), i._gsap.swappedIn = !0;
  }
}, YE = /([A-Z])/g, Nr = function(i) {
  if (i) {
    var u = i.t.style, a = i.length, o = 0, c, h;
    for ((i.t._gsap || Ot.core.getCache(i.t)).uncache = 1; o < a; o += 2)
      h = i[o + 1], c = i[o], h ? u[c] = h : u[c] && u.removeProperty(c.replace(YE, "-$1").toLowerCase());
  }
}, Kc = function(i) {
  for (var u = lf.length, a = i.style, o = [], c = 0; c < u; c++)
    o.push(lf[c], a[lf[c]]);
  return o.t = i, o;
}, qE = function(i, u, a) {
  for (var o = [], c = i.length, h = a ? 8 : 0, d; h < c; h += 2)
    d = i[h], o.push(d, d in u ? u[d] : i[h + 1]);
  return o.t = i.t, o;
}, af = {
  left: 0,
  top: 0
}, m_ = function(i, u, a, o, c, h, d, g, v, p, _, S, b, M) {
  qn(i) && (i = i(g)), Rl(i) && i.substr(0, 3) === "max" && (i = S + (i.charAt(4) === "=" ? tf("0" + i.substr(3), a) : 0));
  var T = b ? b.time() : 0, R, j, X;
  if (b && b.seek(0), isNaN(i) || (i = +i), Go(i))
    b && (i = Ot.utils.mapRange(b.scrollTrigger.start, b.scrollTrigger.end, 0, S, i)), d && ef(d, a, o, !0);
  else {
    qn(u) && (u = u(g));
    var Z = (i || "0").split(" "), Y, Q, tt, N;
    X = sl(u, g) || pe, Y = Pi(X) || {}, (!Y || !Y.left && !Y.top) && ei(X).display === "none" && (N = X.style.display, X.style.display = "block", Y = Pi(X), N ? X.style.display = N : X.style.removeProperty("display")), Q = tf(Z[0], Y[o.d]), tt = tf(Z[1] || "0", a), i = Y[o.p] - v[o.p] - p + Q + c - tt, d && ef(d, tt, o, a - tt < 20 || d._isStart && tt > 20), a -= a - tt;
  }
  if (M && (g[M] = i || -1e-3, i < 0 && (i = 0)), h) {
    var K = i + a, P = h._isStart;
    R = "scroll" + o.d2, ef(h, K, o, P && K > 20 || !P && (_ ? Math.max(pe[R], Cl[R]) : h.parentNode[R]) <= K + 1), _ && (v = Pi(d), _ && (h.style[o.op.p] = v[o.op.p] - o.op.m - h._offset + gn));
  }
  return b && X && (R = Pi(X), b.seek(S), j = Pi(X), b._caScrollDist = R[o.p] - j[o.p], i = i / b._caScrollDist * S), b && b.seek(T), b ? i : Math.round(i);
}, XE = /(webkit|moz|length|cssText|inset)/i, g_ = function(i, u, a, o) {
  if (i.parentNode !== u) {
    var c = i.style, h, d;
    if (u === pe) {
      i._stOrig = c.cssText, d = ei(i);
      for (h in d)
        !+h && !XE.test(h) && d[h] && typeof c[h] == "string" && h !== "0" && (c[h] = d[h]);
      c.top = a, c.left = o;
    } else
      c.cssText = i._stOrig;
    Ot.core.getCache(i).uncache = 1, u.appendChild(i);
  }
}, $y = function(i, u, a) {
  var o = u, c = o;
  return function(h) {
    var d = Math.round(i());
    return d !== o && d !== c && Math.abs(d - o) > 3 && Math.abs(d - c) > 3 && (h = d, a && a()), c = o, o = Math.round(h), o;
  };
}, Fc = function(i, u, a) {
  var o = {};
  o[u.p] = "+=" + a, Ot.set(i, o);
}, v_ = function(i, u) {
  var a = Ga(i, u), o = "_scroll" + u.p2, c = function h(d, g, v, p, _) {
    var S = h.tween, b = g.onComplete, M = {};
    v = v || a();
    var T = $y(a, v, function() {
      S.kill(), h.tween = 0;
    });
    return _ = p && _ || 0, p = p || d - v, S && S.kill(), g[o] = d, g.inherit = !1, g.modifiers = M, M[o] = function() {
      return T(v + p * S.ratio + _ * S.ratio * S.ratio);
    }, g.onUpdate = function() {
      te.cache++, h.tween && Wi();
    }, g.onComplete = function() {
      h.tween = 0, b && b.call(S);
    }, S = h.tween = Ot.to(i, g), S;
  };
  return i[o] = a, a.wheelHandler = function() {
    return c.tween && c.tween.kill() && (c.tween = 0);
  }, xn(i, "wheel", a.wheelHandler), Pt.isTouch && xn(i, "touchmove", a.wheelHandler), c;
}, Pt = /* @__PURE__ */ (function() {
  function f(u, a) {
    Tr || f.register(Ot) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), B0(this), this.init(u, a);
  }
  var i = f.prototype;
  return i.init = function(a, o) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Xo) {
      this.update = this.refresh = this.kill = Oi;
      return;
    }
    a = s_(Rl(a) || Go(a) || a.nodeType ? {
      trigger: a
    } : a, Qc);
    var c = a, h = c.onUpdate, d = c.toggleClass, g = c.id, v = c.onToggle, p = c.onRefresh, _ = c.scrub, S = c.trigger, b = c.pin, M = c.pinSpacing, T = c.invalidateOnRefresh, R = c.anticipatePin, j = c.onScrubComplete, X = c.onSnapComplete, Z = c.once, Y = c.snap, Q = c.pinReparent, tt = c.pinSpacer, N = c.containerAnimation, K = c.fastScrollEnd, P = c.preventOverlaps, V = a.horizontal || a.containerAnimation && a.horizontal !== !1 ? tl : vn, ut = !_ && _ !== 0, it = sl(a.scroller || It), St = Ot.core.getCache(it), Mt = wu(it), et = ("pinType" in a ? a.pinType : La(it, "pinType") || Mt && "fixed") === "fixed", F = [a.onEnter, a.onLeave, a.onEnterBack, a.onLeaveBack], k = ut && a.toggleActions.split(" "), W = "markers" in a ? a.markers : Qc.markers, st = Mt ? 0 : parseFloat(ei(it)["border" + V.p2 + qr]) || 0, w = this, Et = a.onRefreshInit && function() {
      return a.onRefreshInit(w);
    }, z = zE(it, Mt, V), Nt = CE(it, Mt), E = 0, A = 0, J = 0, L = Ga(it, V), mt, ht, Rt, ot, gt, zt, pt, Ut, Yt, B, nt, vt, dt, bt, jt, kt, Ht, Ct, ee, ue, Ke, Re, pn, Vn, xe, Yl, Be, Gn, Ie, el, ql, qt, Xl, hn, An, dn, Vl, Gl, nl;
    if (w._startClamp = w._endClamp = !1, w._dir = V, R *= 45, w.scroller = it, w.scroll = N ? N.time.bind(N) : L, ot = L(), Ya && L.rec == null && (L.rec = ot), w.vars = a, o = o || a.animation, "refreshPriority" in a && (By = 1, a.refreshPriority === -9999 && (ns = w)), St.tweenScroll = St.tweenScroll || {
      top: v_(it, vn),
      left: v_(it, tl)
    }, w.tweenTo = mt = St.tweenScroll[V.p], w.scrubDuration = function(lt) {
      Xl = Go(lt) && lt, Xl ? qt ? qt.duration(lt) : qt = Ot.to(o, {
        ease: "expo",
        totalProgress: "+=0",
        inherit: !1,
        duration: Xl,
        paused: !0,
        onComplete: function() {
          return j && j(w);
        }
      }) : (qt && qt.progress(1).kill(), qt = 0);
    }, o && (o.vars.lazy = !1, o._initted && !w.isReverted || o.vars.immediateRender !== !1 && a.immediateRender !== !1 && o.duration() && o.render(0, !0, !0), w.animation = o.pause(), o.scrollTrigger = w, w.scrubDuration(_), el = 0, g || (g = o.vars.id)), Y && ((!vu(Y) || Y.push) && (Y = {
      snapTo: Y
    }), "scrollBehavior" in pe.style && Ot.set(Mt ? [pe, Cl] : it, {
      scrollBehavior: "auto"
    }), te.forEach(function(lt) {
      return qn(lt) && lt.target === (Mt ? be.scrollingElement || Cl : it) && (lt.smooth = !1);
    }), Rt = qn(Y.snapTo) ? Y.snapTo : Y.snapTo === "labels" ? NE(o) : Y.snapTo === "labelsDirectional" ? UE(o) : Y.directional !== !1 ? function(lt, ft) {
      return hm(Y.snapTo)(lt, Ln() - A < 500 ? 0 : ft.direction);
    } : Ot.utils.snap(Y.snapTo), hn = Y.duration || {
      min: 0.1,
      max: 2
    }, hn = vu(hn) ? $o(hn.min, hn.max) : $o(hn, hn), An = Ot.delayedCall(Y.delay || Xl / 2 || 0.1, function() {
      var lt = L(), ft = Ln() - A < 500, yt = mt.tween;
      if ((ft || Math.abs(w.getVelocity()) < 10) && !yt && !Mf && E !== lt) {
        var xt = (lt - zt) / bt, Lt = o && !ut ? o.totalProgress() : xt, wt = ft ? 0 : (Lt - ql) / (Ln() - qo) * 1e3 || 0, Vt = Ot.utils.clamp(-xt, 1 - xt, Sr(wt / 2) * wt / 0.185), ne = xt + (Y.inertia === !1 ? 0 : Vt), Xt, Qt, Kt = Y, Me = Kt.onStart, he = Kt.onInterrupt, He = Kt.onComplete;
        if (Xt = Rt(ne, w), Go(Xt) || (Xt = ne), Qt = Math.max(0, Math.round(zt + Xt * bt)), lt <= pt && lt >= zt && Qt !== lt) {
          if (yt && !yt._initted && yt.data <= Sr(Qt - lt))
            return;
          Y.inertia === !1 && (Vt = Xt - xt), mt(Qt, {
            duration: hn(Sr(Math.max(Sr(ne - Lt), Sr(Xt - Lt)) * 0.185 / wt / 0.05 || 0)),
            ease: Y.ease || "power3",
            data: Sr(Qt - lt),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return An.restart(!0) && he && yr(w, he);
            },
            onComplete: function() {
              w.update(), E = L(), o && !ut && (qt ? qt.resetTo("totalProgress", Xt, o._tTime / o._tDur) : o.progress(Xt)), el = ql = o && !ut ? o.totalProgress() : w.progress, X && X(w), He && yr(w, He);
            }
          }, lt, Vt * bt, Qt - lt - Vt * bt), Me && yr(w, Me, mt.tween);
        }
      } else w.isActive && E !== lt && An.restart(!0);
    }).pause()), g && (L0[g] = w), S = w.trigger = sl(S || b !== !0 && b), nl = S && S._gsap && S._gsap.stRevert, nl && (nl = nl(w)), b = b === !0 ? S : sl(b), Rl(d) && (d = {
      targets: S,
      className: d
    }), b && (M === !1 || M === ti || (M = !M && b.parentNode && b.parentNode.style && ei(b.parentNode).display === "flex" ? !1 : cn), w.pin = b, ht = Ot.core.getCache(b), ht.spacer ? jt = ht.pinState : (tt && (tt = sl(tt), tt && !tt.nodeType && (tt = tt.current || tt.nativeElement), ht.spacerIsNative = !!tt, tt && (ht.spacerState = Kc(tt))), ht.spacer = Ct = tt || be.createElement("div"), Ct.classList.add("pin-spacer"), g && Ct.classList.add("pin-spacer-" + g), ht.pinState = jt = Kc(b)), a.force3D !== !1 && Ot.set(b, {
      force3D: !0
    }), w.spacer = Ct = ht.spacer, Ie = ei(b), Vn = Ie[M + V.os2], ue = Ot.getProperty(b), Ke = Ot.quickSetter(b, V.a, gn), m0(b, Ct, Ie), Ht = Kc(b)), W) {
      vt = vu(W) ? s_(W, c_) : c_, B = Zc("scroller-start", g, it, V, vt, 0), nt = Zc("scroller-end", g, it, V, vt, 0, B), ee = B["offset" + V.op.d2];
      var ct = sl(La(it, "content") || it);
      Ut = this.markerStart = Zc("start", g, ct, V, vt, ee, 0, N), Yt = this.markerEnd = Zc("end", g, ct, V, vt, ee, 0, N), N && (Gl = Ot.quickSetter([Ut, Yt], V.a, gn)), !et && !(Di.length && La(it, "fixedMarkers") === !0) && (DE(Mt ? pe : it), Ot.set([B, nt], {
        force3D: !0
      }), Yl = Ot.quickSetter(B, V.a, gn), Gn = Ot.quickSetter(nt, V.a, gn));
    }
    if (N) {
      var at = N.vars.onUpdate, rt = N.vars.onUpdateParams;
      N.eventCallback("onUpdate", function() {
        w.update(0, 0, 1), at && at.apply(N, rt || []);
      });
    }
    if (w.previous = function() {
      return Wt[Wt.indexOf(w) - 1];
    }, w.next = function() {
      return Wt[Wt.indexOf(w) + 1];
    }, w.revert = function(lt, ft) {
      if (!ft)
        return w.kill(!0);
      var yt = lt !== !1 || !w.enabled, xt = Hn;
      yt !== w.isReverted && (yt && (dn = Math.max(L(), w.scroll.rec || 0), J = w.progress, Vl = o && o.progress()), Ut && [Ut, Yt, B, nt].forEach(function(Lt) {
        return Lt.style.display = yt ? "none" : "block";
      }), yt && (Hn = w, w.update(yt)), b && (!Q || !w.isActive) && (yt ? LE(b, Ct, jt) : m0(b, Ct, ei(b), xe)), yt || w.update(yt), Hn = xt, w.isReverted = yt);
    }, w.refresh = function(lt, ft, yt, xt) {
      if (!((Hn || !w.enabled) && !ft)) {
        if (b && lt && ii) {
          xn(f, "scrollEnd", Ky);
          return;
        }
        !In && Et && Et(w), Hn = w, mt.tween && !yt && (mt.tween.kill(), mt.tween = 0), qt && qt.pause(), T && o && (o.revert({
          kill: !1
        }).invalidate(), o.getChildren ? o.getChildren(!0, !0, !1).forEach(function(ll) {
          return ll.vars.immediateRender && ll.render(0, !0, !0);
        }) : o.vars.immediateRender && o.render(0, !0, !0)), w.isReverted || w.revert(!0, !0), w._subPinOffset = !1;
        var Lt = z(), wt = Nt(), Vt = N ? N.duration() : Ci(it, V), ne = bt <= 0.01 || !bt, Xt = 0, Qt = xt || 0, Kt = vu(yt) ? yt.end : a.end, Me = a.endTrigger || S, he = vu(yt) ? yt.start : a.start || (a.start === 0 || !S ? 0 : b ? "0 0" : "0 100%"), He = w.pinnedContainer = a.pinnedContainer && sl(a.pinnedContainer, w), Xe = S && Math.max(0, Wt.indexOf(w)) || 0, Ae = Xe, De, me, pl, mi, Ve, Ne, _n, tn, Le, Ue, Fe, _l, ai;
        for (W && vu(yt) && (_l = Ot.getProperty(B, V.p), ai = Ot.getProperty(nt, V.p)); Ae-- > 0; )
          Ne = Wt[Ae], Ne.end || Ne.refresh(0, 1) || (Hn = w), _n = Ne.pin, _n && (_n === S || _n === b || _n === He) && !Ne.isReverted && (Ue || (Ue = []), Ue.unshift(Ne), Ne.revert(!0, !0)), Ne !== Wt[Ae] && (Xe--, Ae--);
        for (qn(he) && (he = he(w)), he = a_(he, "start", w), zt = m_(he, S, Lt, V, L(), Ut, B, w, wt, st, et, Vt, N, w._startClamp && "_startClamp") || (b ? -1e-3 : 0), qn(Kt) && (Kt = Kt(w)), Rl(Kt) && !Kt.indexOf("+=") && (~Kt.indexOf(" ") ? Kt = (Rl(he) ? he.split(" ")[0] : "") + Kt : (Xt = tf(Kt.substr(2), Lt), Kt = Rl(he) ? he : (N ? Ot.utils.mapRange(0, N.duration(), N.scrollTrigger.start, N.scrollTrigger.end, zt) : zt) + Xt, Me = S)), Kt = a_(Kt, "end", w), pt = Math.max(zt, m_(Kt || (Me ? "100% 0" : Vt), Me, Lt, V, L() + Xt, Yt, nt, w, wt, st, et, Vt, N, w._endClamp && "_endClamp")) || -1e-3, Xt = 0, Ae = Xe; Ae--; )
          Ne = Wt[Ae] || {}, _n = Ne.pin, _n && Ne.start - Ne._pinPush <= zt && !N && Ne.end > 0 && (De = Ne.end - (w._startClamp ? Math.max(0, Ne.start) : Ne.start), (_n === S && Ne.start - Ne._pinPush < zt || _n === He) && isNaN(he) && (Xt += De * (1 - Ne.progress)), _n === b && (Qt += De));
        if (zt += Xt, pt += Xt, w._startClamp && (w._startClamp += Xt), w._endClamp && !In && (w._endClamp = pt || -1e-3, pt = Math.min(pt, Ci(it, V))), bt = pt - zt || (zt -= 0.01) && 1e-3, ne && (J = Ot.utils.clamp(0, 1, Ot.utils.normalize(zt, pt, dn))), w._pinPush = Qt, Ut && Xt && (De = {}, De[V.a] = "+=" + Xt, He && (De[V.p] = "-=" + L()), Ot.set([Ut, Yt], De)), b && !(H0 && w.end >= Ci(it, V)))
          De = ei(b), mi = V === vn, pl = L(), Re = parseFloat(ue(V.a)) + Qt, !Vt && pt > 1 && (Fe = (Mt ? be.scrollingElement || Cl : it).style, Fe = {
            style: Fe,
            value: Fe["overflow" + V.a.toUpperCase()]
          }, Mt && ei(pe)["overflow" + V.a.toUpperCase()] !== "scroll" && (Fe.style["overflow" + V.a.toUpperCase()] = "scroll")), m0(b, Ct, De), Ht = Kc(b), me = Pi(b, !0), tn = et && Ga(it, mi ? tl : vn)(), M ? (xe = [M + V.os2, bt + Qt + gn], xe.t = Ct, Ae = M === cn ? _f(b, V) + bt + Qt : 0, Ae && (xe.push(V.d, Ae + gn), Ct.style.flexBasis !== "auto" && (Ct.style.flexBasis = Ae + gn)), Nr(xe), He && Wt.forEach(function(ll) {
            ll.pin === He && ll.vars.pinSpacing !== !1 && (ll._subPinOffset = !0);
          }), et && L(dn)) : (Ae = _f(b, V), Ae && Ct.style.flexBasis !== "auto" && (Ct.style.flexBasis = Ae + gn)), et && (Ve = {
            top: me.top + (mi ? pl - zt : tn) + gn,
            left: me.left + (mi ? tn : pl - zt) + gn,
            boxSizing: "border-box",
            position: "fixed"
          }, Ve[xu] = Ve["max" + qr] = Math.ceil(me.width) + gn, Ve[Mu] = Ve["max" + fm] = Math.ceil(me.height) + gn, Ve[ti] = Ve[ti + ts] = Ve[ti + Wo] = Ve[ti + es] = Ve[ti + Io] = "0", Ve[cn] = De[cn], Ve[cn + ts] = De[cn + ts], Ve[cn + Wo] = De[cn + Wo], Ve[cn + es] = De[cn + es], Ve[cn + Io] = De[cn + Io], kt = qE(jt, Ve, Q), In && L(0)), o ? (Le = o._initted, c0(1), o.render(o.duration(), !0, !0), pn = ue(V.a) - Re + bt + Qt, Be = Math.abs(bt - pn) > 1, et && Be && kt.splice(kt.length - 2, 2), o.render(0, !0, !0), Le || o.invalidate(!0), o.parent || o.totalTime(o.totalTime()), c0(0)) : pn = bt, Fe && (Fe.value ? Fe.style["overflow" + V.a.toUpperCase()] = Fe.value : Fe.style.removeProperty("overflow-" + V.a));
        else if (S && L() && !N)
          for (me = S.parentNode; me && me !== pe; )
            me._pinOffset && (zt -= me._pinOffset, pt -= me._pinOffset), me = me.parentNode;
        Ue && Ue.forEach(function(ll) {
          return ll.revert(!1, !0);
        }), w.start = zt, w.end = pt, ot = gt = In ? dn : L(), !N && !In && !Ya && (ot < dn && L(dn), w.scroll.rec = 0), w.revert(!1, !0), A = Ln(), An && (E = -1, An.restart(!0)), Hn = 0, o && ut && (o._initted || Vl) && o.progress() !== Vl && o.progress(Vl || 0, !0).render(o.time(), !0, !0), (ne || J !== w.progress || N || T || o && !o._initted) && (o && !ut && (o._initted || J || o.vars.immediateRender !== !1) && o.totalProgress(N && zt < -1e-3 && !J ? Ot.utils.normalize(zt, pt, 0) : J, !0), w.progress = ne || (ot - zt) / bt === J ? 0 : J), b && M && (Ct._pinOffset = Math.round(w.progress * pn)), qt && qt.invalidate(), isNaN(_l) || (_l -= Ot.getProperty(B, V.p), ai -= Ot.getProperty(nt, V.p), Fc(B, V, _l), Fc(Ut, V, _l - (xt || 0)), Fc(nt, V, ai), Fc(Yt, V, ai - (xt || 0))), ne && !In && w.update(), p && !In && !dt && (dt = !0, p(w), dt = !1);
      }
    }, w.getVelocity = function() {
      return (L() - gt) / (Ln() - qo) * 1e3 || 0;
    }, w.endAnimation = function() {
      Uo(w.callbackAnimation), o && (qt ? qt.progress(1) : o.paused() ? ut || Uo(o, w.direction < 0, 1) : Uo(o, o.reversed()));
    }, w.labelToScroll = function(lt) {
      return o && o.labels && (zt || w.refresh() || zt) + o.labels[lt] / o.duration() * bt || 0;
    }, w.getTrailing = function(lt) {
      var ft = Wt.indexOf(w), yt = w.direction > 0 ? Wt.slice(0, ft).reverse() : Wt.slice(ft + 1);
      return (Rl(lt) ? yt.filter(function(xt) {
        return xt.vars.preventOverlaps === lt;
      }) : yt).filter(function(xt) {
        return w.direction > 0 ? xt.end <= zt : xt.start >= pt;
      });
    }, w.update = function(lt, ft, yt) {
      if (!(N && !yt && !lt)) {
        var xt = In === !0 ? dn : w.scroll(), Lt = lt ? 0 : (xt - zt) / bt, wt = Lt < 0 ? 0 : Lt > 1 ? 1 : Lt || 0, Vt = w.progress, ne, Xt, Qt, Kt, Me, he, He, Xe;
        if (ft && (gt = ot, ot = N ? L() : xt, Y && (ql = el, el = o && !ut ? o.totalProgress() : wt)), R && b && !Hn && !Xc && ii && (!wt && zt < xt + (xt - gt) / (Ln() - qo) * R ? wt = 1e-4 : wt === 1 && pt > xt + (xt - gt) / (Ln() - qo) * R && (wt = 0.9999)), wt !== Vt && w.enabled) {
          if (ne = w.isActive = !!wt && wt < 1, Xt = !!Vt && Vt < 1, he = ne !== Xt, Me = he || !!wt != !!Vt, w.direction = wt > Vt ? 1 : -1, w.progress = wt, Me && !Hn && (Qt = wt && !Vt ? 0 : wt === 1 ? 1 : Vt === 1 ? 2 : 3, ut && (Kt = !he && k[Qt + 1] !== "none" && k[Qt + 1] || k[Qt], Xe = o && (Kt === "complete" || Kt === "reset" || Kt in o))), P && (he || Xe) && (Xe || _ || !o) && (qn(P) ? P(w) : w.getTrailing(P).forEach(function(pl) {
            return pl.endAnimation();
          })), ut || (qt && !Hn && !Xc ? (qt._dp._time - qt._start !== qt._time && qt.render(qt._dp._time - qt._start), qt.resetTo ? qt.resetTo("totalProgress", wt, o._tTime / o._tDur) : (qt.vars.totalProgress = wt, qt.invalidate().restart())) : o && o.totalProgress(wt, !!(Hn && (A || lt)))), b) {
            if (lt && M && (Ct.style[M + V.os2] = Vn), !et)
              Ke(Vo(Re + pn * wt));
            else if (Me) {
              if (He = !lt && wt > Vt && pt + 1 > xt && xt + 1 >= Ci(it, V), Q)
                if (!lt && (ne || He)) {
                  var Ae = Pi(b, !0), De = xt - zt;
                  g_(b, pe, Ae.top + (V === vn ? De : 0) + gn, Ae.left + (V === vn ? 0 : De) + gn);
                } else
                  g_(b, Ct);
              Nr(ne || He ? kt : Ht), Be && wt < 1 && ne || Ke(Re + (wt === 1 && !He ? pn : 0));
            }
          }
          Y && !mt.tween && !Hn && !Xc && An.restart(!0), d && (he || Z && wt && (wt < 1 || !f0)) && ds(d.targets).forEach(function(pl) {
            return pl.classList[ne || Z ? "add" : "remove"](d.className);
          }), h && !ut && !lt && h(w), Me && !Hn ? (ut && (Xe && (Kt === "complete" ? o.pause().totalProgress(1) : Kt === "reset" ? o.restart(!0).pause() : Kt === "restart" ? o.restart(!0) : o[Kt]()), h && h(w)), (he || !f0) && (v && he && yr(w, v), F[Qt] && yr(w, F[Qt]), Z && (wt === 1 ? w.kill(!1, 1) : F[Qt] = 0), he || (Qt = wt === 1 ? 1 : 3, F[Qt] && yr(w, F[Qt]))), K && !ne && Math.abs(w.getVelocity()) > (Go(K) ? K : 2500) && (Uo(w.callbackAnimation), qt ? qt.progress(1) : Uo(o, Kt === "reverse" ? 1 : !wt, 1))) : ut && h && !Hn && h(w);
        }
        if (Gn) {
          var me = N ? xt / N.duration() * (N._caScrollDist || 0) : xt;
          Yl(me + (B._isFlipped ? 1 : 0)), Gn(me);
        }
        Gl && Gl(-xt / N.duration() * (N._caScrollDist || 0));
      }
    }, w.enable = function(lt, ft) {
      w.enabled || (w.enabled = !0, xn(it, "resize", jo), Mt || xn(it, "scroll", br), Et && xn(f, "refreshInit", Et), lt !== !1 && (w.progress = J = 0, ot = gt = E = L()), ft !== !1 && w.refresh());
    }, w.getTween = function(lt) {
      return lt && mt ? mt.tween : qt;
    }, w.setPositions = function(lt, ft, yt, xt) {
      if (N) {
        var Lt = N.scrollTrigger, wt = N.duration(), Vt = Lt.end - Lt.start;
        lt = Lt.start + Vt * lt / wt, ft = Lt.start + Vt * ft / wt;
      }
      w.refresh(!1, !1, {
        start: u_(lt, yt && !!w._startClamp),
        end: u_(ft, yt && !!w._endClamp)
      }, xt), w.update();
    }, w.adjustPinSpacing = function(lt) {
      if (xe && lt) {
        var ft = xe.indexOf(V.d) + 1;
        xe[ft] = parseFloat(xe[ft]) + lt + gn, xe[1] = parseFloat(xe[1]) + lt + gn, Nr(xe);
      }
    }, w.disable = function(lt, ft) {
      if (lt !== !1 && w.revert(!0, !0), w.enabled && (w.enabled = w.isActive = !1, ft || qt && qt.pause(), dn = 0, ht && (ht.uncache = 1), Et && En(f, "refreshInit", Et), An && (An.pause(), mt.tween && mt.tween.kill() && (mt.tween = 0)), !Mt)) {
        for (var yt = Wt.length; yt--; )
          if (Wt[yt].scroller === it && Wt[yt] !== w)
            return;
        En(it, "resize", jo), Mt || En(it, "scroll", br);
      }
    }, w.kill = function(lt, ft) {
      w.disable(lt, ft), qt && !ft && qt.kill(), g && delete L0[g];
      var yt = Wt.indexOf(w);
      yt >= 0 && Wt.splice(yt, 1), yt === Wn && nf > 0 && Wn--, yt = 0, Wt.forEach(function(xt) {
        return xt.scroller === w.scroller && (yt = 1);
      }), yt || In || Ya || (w.scroll.rec = 0), o && (o.scrollTrigger = null, lt && o.revert({
        kill: !1
      }), ft || o.kill()), Ut && [Ut, Yt, B, nt].forEach(function(xt) {
        return xt.parentNode && xt.parentNode.removeChild(xt);
      }), ns === w && (ns = 0), b && (ht && (ht.uncache = 1), yt = 0, Wt.forEach(function(xt) {
        return xt.pin === b && yt++;
      }), yt || (ht.spacer = 0)), a.onKill && a.onKill(w);
    }, Wt.push(w), w.enable(!1, !1), nl && nl(w), o && o.add && !bt) {
      var Tt = w.update;
      w.update = function() {
        w.update = Tt, te.cache++, zt || pt || w.refresh();
      }, Ot.delayedCall(0.01, w.update), bt = 0.01, zt = pt = 0;
    } else
      w.refresh();
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
    }), En(It, "wheel", br), En(be, "scroll", br), clearInterval(qc), En(be, "touchcancel", Oi), En(pe, "touchstart", Oi), Gc(En, be, "pointerdown,touchstart,mousedown", r_), Gc(En, be, "pointerup,touchend,mouseup", o_), pf.kill(), Vc(En);
    for (var c = 0; c < te.length; c += 3)
      jc(En, te[c], te[c + 1]), jc(En, te[c], te[c + 2]);
  }, f.enable = function() {
    if (It = window, be = document, Cl = be.documentElement, pe = be.body, Ot) {
      if (ds = Ot.utils.toArray, $o = Ot.utils.clamp, B0 = Ot.core.context || Oi, c0 = Ot.core.suppressOverwrites || Oi, rm = It.history.scrollRestoration || "auto", Y0 = It.pageYOffset || 0, Ot.core.globals("ScrollTrigger", f), pe) {
        Xo = 1, Dr = document.createElement("div"), Dr.style.height = "100vh", Dr.style.position = "absolute", Py(), RE(), an.register(Ot), f.isTouch = an.isTouch, Oa = an.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), U0 = an.isTouch === 1, xn(It, "wheel", br), um = [It, be, Cl, pe], Ot.matchMedia ? (f.matchMedia = function(p) {
          var _ = Ot.matchMedia(), S;
          for (S in p)
            _.add(S, p[S]);
          return _;
        }, Ot.addEventListener("matchMediaInit", function() {
          Jy(), dm();
        }), Ot.addEventListener("matchMediaRevert", function() {
          return Fy();
        }), Ot.addEventListener("matchMedia", function() {
          _u(0, 1), Ru("matchMedia");
        }), Ot.matchMedia().add("(orientation: portrait)", function() {
          return d0(), d0;
        })) : console.warn("Requires GSAP 3.11.0 or later"), d0(), xn(be, "scroll", br);
        var a = pe.hasAttribute("style"), o = pe.style, c = o.borderTopStyle, h = Ot.core.Animation.prototype, d, g;
        for (h.revert || Object.defineProperty(h, "revert", {
          value: function() {
            return this.time(-0.01, !0);
          }
        }), o.borderTopStyle = "solid", d = Pi(pe), vn.m = Math.round(d.top + vn.sc()) || 0, tl.m = Math.round(d.left + tl.sc()) || 0, c ? o.borderTopStyle = c : o.removeProperty("border-top-style"), a || (pe.setAttribute("style", ""), pe.removeAttribute("style")), qc = setInterval(f_, 250), Ot.delayedCall(0.5, function() {
          return Xc = 0;
        }), xn(be, "touchcancel", Oi), xn(pe, "touchstart", Oi), Gc(xn, be, "pointerdown,touchstart,mousedown", r_), Gc(xn, be, "pointerup,touchend,mouseup", o_), N0 = Ot.utils.checkPrefix("transform"), lf.push(N0), Tr = Ln(), pf = Ot.delayedCall(0.2, _u).pause(), Er = [be, "visibilitychange", function() {
          var p = It.innerWidth, _ = It.innerHeight;
          be.hidden ? (l_ = p, i_ = _) : (l_ !== p || i_ !== _) && jo();
        }, be, "DOMContentLoaded", _u, It, "load", _u, It, "resize", jo], Vc(xn), Wt.forEach(function(p) {
          return p.enable(0, 1);
        }), g = 0; g < te.length; g += 3)
          jc(En, te[g], te[g + 1]), jc(En, te[g], te[g + 2]);
      } else if (be) {
        var v = function p() {
          f.enable(), be.removeEventListener("DOMContentLoaded", p);
        };
        be.addEventListener("DOMContentLoaded", v);
      }
    }
  }, f.config = function(a) {
    "limitCallbacks" in a && (f0 = !!a.limitCallbacks);
    var o = a.syncInterval;
    o && clearInterval(qc) || (qc = o) && setInterval(f_, o), "ignoreMobileResize" in a && (U0 = f.isTouch === 1 && a.ignoreMobileResize), "autoRefreshEvents" in a && (Vc(En) || Vc(xn, a.autoRefreshEvents || "none"), Hy = (a.autoRefreshEvents + "").indexOf("resize") === -1);
  }, f.scrollerProxy = function(a, o) {
    var c = sl(a), h = te.indexOf(c), d = wu(c);
    ~h && te.splice(h, d ? 6 : 2), o && (d ? Di.unshift(It, o, pe, o, Cl, o) : Di.unshift(c, o));
  }, f.clearMatchMedia = function(a) {
    Wt.forEach(function(o) {
      return o._ctx && o._ctx.query === a && o._ctx.kill(!0, !0);
    });
  }, f.isInViewport = function(a, o, c) {
    var h = (Rl(a) ? sl(a) : a).getBoundingClientRect(), d = h[c ? xu : Mu] * o || 0;
    return c ? h.right - d > 0 && h.left + d < It.innerWidth : h.bottom - d > 0 && h.top + d < It.innerHeight;
  }, f.positionInViewport = function(a, o, c) {
    Rl(a) && (a = sl(a));
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
  return f ? ds(f).forEach(function(i) {
    if (i && i.style) {
      var u = Ol.indexOf(i);
      u >= 0 && Ol.splice(u, 5), Ol.push(i, i.style.cssText, i.getBBox && i.getAttribute("transform"), Ot.core.getCache(i), B0());
    }
  }) : Ol;
};
Pt.revert = function(f, i) {
  return dm(!f, i);
};
Pt.create = function(f, i) {
  return new Pt(f, i);
};
Pt.refresh = function(f) {
  return f ? jo(!0) : (Tr || Pt.register()) && _u(!0);
};
Pt.update = function(f) {
  return ++te.cache && Wi(f === !0 ? 2 : 0);
};
Pt.clearScrollMemory = ky;
Pt.maxScroll = function(f, i) {
  return Ci(f, i ? tl : vn);
};
Pt.getScrollFunc = function(f, i) {
  return Ga(sl(f), i ? tl : vn);
};
Pt.getById = function(f) {
  return L0[f];
};
Pt.getAll = function() {
  return Wt.filter(function(f) {
    return f.vars.id !== "ScrollSmoother";
  });
};
Pt.isScrolling = function() {
  return !!ii;
};
Pt.snapDirectional = hm;
Pt.addEventListener = function(f, i) {
  var u = Ou[f] || (Ou[f] = []);
  ~u.indexOf(i) || u.push(i);
};
Pt.removeEventListener = function(f, i) {
  var u = Ou[f], a = u && u.indexOf(i);
  a >= 0 && u.splice(a, 1);
};
Pt.batch = function(f, i) {
  var u = [], a = {}, o = i.interval || 0.016, c = i.batchMax || 1e9, h = function(v, p) {
    var _ = [], S = [], b = Ot.delayedCall(o, function() {
      p(_, S), _ = [], S = [];
    }).pause();
    return function(M) {
      _.length || b.restart(!0), _.push(M.trigger), S.push(M), c <= _.length && b.progress(1);
    };
  }, d;
  for (d in i)
    a[d] = d.substr(0, 2) === "on" && qn(i[d]) && d !== "onRefreshInit" ? h(d, i[d]) : i[d];
  return qn(c) && (c = c(), xn(Pt, "refresh", function() {
    return c = i.batchMax();
  })), ds(f).forEach(function(g) {
    var v = {};
    for (d in a)
      v[d] = a[d];
    v.trigger = g, u.push(Pt.create(v));
  }), u;
};
var p_ = function(i, u, a, o) {
  return u > o ? i(o) : u < 0 && i(0), a > o ? (o - u) / (a - u) : a < 0 ? u / (u - a) : 1;
}, g0 = function f(i, u) {
  u === !0 ? i.style.removeProperty("touch-action") : i.style.touchAction = u === !0 ? "auto" : u ? "pan-" + u + (an.isTouch ? " pinch-zoom" : "") : "none", i === Cl && f(pe, u);
}, Jc = {
  auto: 1,
  scroll: 1
}, VE = function(i) {
  var u = i.event, a = i.target, o = i.axis, c = (u.changedTouches ? u.changedTouches[0] : u).target, h = c._gsap || Ot.core.getCache(c), d = Ln(), g;
  if (!h._isScrollT || d - h._isScrollT > 2e3) {
    for (; c && c !== pe && (c.scrollHeight <= c.clientHeight && c.scrollWidth <= c.clientWidth || !(Jc[(g = ei(c)).overflowY] || Jc[g.overflowX])); )
      c = c.parentNode;
    h._isScroll = c && c !== a && !wu(c) && (Jc[(g = ei(c)).overflowY] || Jc[g.overflowX]), h._isScrollT = d;
  }
  (h._isScroll || o === "x") && (u.stopPropagation(), u._gsapAllow = !0);
}, Wy = function(i, u, a, o) {
  return an.create({
    target: i,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: u,
    onWheel: o = o && VE,
    onPress: o,
    onDrag: o,
    onScroll: o,
    onEnable: function() {
      return a && xn(be, an.eventTypes[0], y_, !1, !0);
    },
    onDisable: function() {
      return En(be, an.eventTypes[0], y_, !0);
    }
  });
}, GE = /(input|label|select|textarea)/i, __, y_ = function(i) {
  var u = GE.test(i.target.tagName);
  (u || __) && (i._gsapAllow = !0, __ = u);
}, jE = function(i) {
  vu(i) || (i = {}), i.preventDefault = i.isNormalizer = i.allowClicks = !0, i.type || (i.type = "wheel,touch"), i.debounce = !!i.debounce, i.id = i.id || "normalizer";
  var u = i, a = u.normalizeScrollX, o = u.momentum, c = u.allowNestedScroll, h = u.onRelease, d, g, v = sl(i.target) || Cl, p = Ot.core.globals().ScrollSmoother, _ = p && p.get(), S = Oa && (i.content && sl(i.content) || _ && i.content !== !1 && !_.smooth() && _.content()), b = Ga(v, vn), M = Ga(v, tl), T = 1, R = (an.isTouch && It.visualViewport ? It.visualViewport.scale * It.visualViewport.width : It.outerWidth) / It.innerWidth, j = 0, X = qn(o) ? function() {
    return o(d);
  } : function() {
    return o || 2.8;
  }, Z, Y, Q = Wy(v, i.type, !0, c), tt = function() {
    return Y = !1;
  }, N = Oi, K = Oi, P = function() {
    g = Ci(v, vn), K = $o(Oa ? 1 : 0, g), a && (N = $o(0, Ci(v, tl))), Z = Au;
  }, V = function() {
    S._gsap.y = Vo(parseFloat(S._gsap.y) + b.offset) + "px", S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(S._gsap.y) + ", 0, 1)", b.offset = b.cacheID = 0;
  }, ut = function() {
    if (Y) {
      requestAnimationFrame(tt);
      var W = Vo(d.deltaY / 2), st = K(b.v - W);
      if (S && st !== b.v + b.offset) {
        b.offset = st - b.v;
        var w = Vo((parseFloat(S && S._gsap.y) || 0) - b.offset);
        S.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + w + ", 0, 1)", S._gsap.y = w + "px", b.cacheID = te.cache, Wi();
      }
      return !0;
    }
    b.offset && V(), Y = !0;
  }, it, St, Mt, et, F = function() {
    P(), it.isActive() && it.vars.scrollY > g && (b() > g ? it.progress(1) && b(g) : it.resetTo("scrollY", g));
  };
  return S && Ot.set(S, {
    y: "+=0"
  }), i.ignoreCheck = function(k) {
    return Oa && k.type === "touchmove" && ut() || T > 1.05 && k.type !== "touchstart" || d.isGesturing || k.touches && k.touches.length > 1;
  }, i.onPress = function() {
    Y = !1;
    var k = T;
    T = Vo((It.visualViewport && It.visualViewport.scale || 1) / R), it.pause(), k !== T && g0(v, T > 1.01 ? !0 : a ? !1 : "x"), St = M(), Mt = b(), P(), Z = Au;
  }, i.onRelease = i.onGestureStart = function(k, W) {
    if (b.offset && V(), !W)
      et.restart(!0);
    else {
      te.cache++;
      var st = X(), w, Et;
      a && (w = M(), Et = w + st * 0.05 * -k.velocityX / 0.227, st *= p_(M, w, Et, Ci(v, tl)), it.vars.scrollX = N(Et)), w = b(), Et = w + st * 0.05 * -k.velocityY / 0.227, st *= p_(b, w, Et, Ci(v, vn)), it.vars.scrollY = K(Et), it.invalidate().duration(st).play(0.01), (Oa && it.vars.scrollY >= g || w >= g - 1) && Ot.to({}, {
        onUpdate: F,
        duration: st
      });
    }
    h && h(k);
  }, i.onWheel = function() {
    it._ts && it.pause(), Ln() - j > 1e3 && (Z = 0, j = Ln());
  }, i.onChange = function(k, W, st, w, Et) {
    if (Au !== Z && P(), W && a && M(N(w[2] === W ? St + (k.startX - k.x) : M() + W - w[1])), st) {
      b.offset && V();
      var z = Et[2] === st, Nt = z ? Mt + k.startY - k.y : b() + st - Et[1], E = K(Nt);
      z && Nt !== E && (Mt += E - Nt), b(E);
    }
    (st || W) && Wi();
  }, i.onEnable = function() {
    g0(v, a ? !1 : "x"), Pt.addEventListener("refresh", F), xn(It, "resize", F), b.smooth && (b.target.style.scrollBehavior = "auto", b.smooth = M.smooth = !1), Q.enable();
  }, i.onDisable = function() {
    g0(v, !0), En(It, "resize", F), Pt.removeEventListener("refresh", F), Q.kill();
  }, i.lockAxis = i.lockAxis !== !1, d = new an(i), d.iOS = Oa, Oa && !b() && b(1), Oa && Ot.ticker.add(Oi), et = d._dc, it = Ot.to(d, {
    ease: "power4",
    paused: !0,
    inherit: !1,
    scrollX: a ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: $y(b, b(), function() {
        return it.pause();
      })
    },
    onUpdate: Wi,
    onComplete: et.vars.onComplete
  }), d;
};
Pt.sort = function(f) {
  if (qn(f))
    return Wt.sort(f);
  var i = It.pageYOffset || 0;
  return Pt.getAll().forEach(function(u) {
    return u._sortY = u.trigger ? i + u.trigger.getBoundingClientRect().top : u.start + It.innerHeight;
  }), Wt.sort(f || function(u, a) {
    return (u.vars.refreshPriority || 0) * -1e6 + (u.vars.containerAnimation ? 1e6 : u._sortY) - ((a.vars.containerAnimation ? 1e6 : a._sortY) + (a.vars.refreshPriority || 0) * -1e6);
  });
};
Pt.observe = function(f) {
  return new an(f);
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
  var i = f instanceof an ? f : jE(f);
  return $n && $n.target === i.target && $n.kill(), wu(i.target) && ($n = i), i;
};
Pt.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: D0,
  _inputObserver: Wy,
  _scrollers: te,
  _proxies: Di,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      ii || Ru("scrollStart"), ii = Ln();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Hn;
    }
  }
};
Xy() && Ot.registerPlugin(Pt);
const S_ = {
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
}, QE = ["circle", "beam"], ZE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, Qo = (f, i, u) => Math.min(u, Math.max(i, f)), b_ = (f, i) => {
  const u = Qo(i, 0, 1), a = (1 - u) ** 1.5 * 0.85, o = (h, d) => `color-mix(in srgb, ${f} ${(h * 100).toFixed(2)}%, transparent) ${(d * 100).toFixed(2)}%`, c = [o(1, 0)];
  for (let h = 0; h <= 14; h++) {
    const d = a + (1 - a) * h / 14, g = (d - a) / (1 - a), v = 1 - g * g * (3 - 2 * g), p = Math.exp(-4.6 * g * g) * (1 - g ** 6);
    c.push(o(v + (p - v) * u, d));
  }
  return c.join(", ");
}, KE = ({
  children: f,
  className: i = "",
  style: u,
  spotlightColor: a,
  intensity: o = 0.15,
  spotlightSize: c = 240,
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
  const R = se.useRef(null), j = se.useRef(null), X = se.useRef(null), Z = se.useRef(null), Y = se.useRef(null), Q = S_[M] ?? S_.dark, tt = a ?? Q.light, K = {
    shape: QE.includes(d) ? d : "circle",
    fill: b_(tt, h),
    edge: b_(tt, 1),
    size: Math.max(20, c),
    intensity: Qo(o, 0, 1) * Q.fill,
    borderGlow: Qo(g, 0, 1) * Q.edge,
    proximity: Math.max(0, v),
    smoothing: Qo(p, 0, 1),
    ambient: _,
    flare: S,
    grain: Qo(b, 0, 1)
  }, P = se.useRef(K);
  return P.current = K, se.useEffect(() => {
    Y.current?.();
  }), se.useEffect(() => {
    const V = R.current, ut = j.current, it = X.current, St = Z.current;
    if (!V || !ut || !it || !St) return;
    const Mt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, et = { x: 0, y: 0, presence: 0, flare: 0, time: Math.random() * 60, pressed: !1, visible: !0 }, F = { x: 0, y: 0, active: !1 }, k = { light: "", edge: "", noise: "" };
    let W = null, st = 0, w = 0, Et = !0;
    const z = (pt, Ut, Yt, B, nt) => {
      if (pt.shape === "beam") {
        const vt = Math.max(Ut * 0.6, B + Ut * 0.55);
        return `radial-gradient(${(Ut * 0.55).toFixed(1)}px ${vt.toFixed(1)}px at ${Yt.toFixed(1)}px 0px, ${nt})`;
      }
      return `radial-gradient(circle ${Ut.toFixed(1)}px at ${Yt.toFixed(1)}px ${B.toFixed(1)}px, ${nt})`;
    }, Nt = (pt) => {
      const Ut = pt.size * (1 + 0.2 * et.flare), Yt = 1 + 0.7 * et.flare, B = z(pt, Ut, et.x, et.y, pt.fill), nt = z(pt, Ut * 0.6, et.x, pt.shape === "beam" ? 0 : et.y, pt.edge);
      B !== k.light && (k.light = B, ut.style.background = B), nt !== k.edge && (k.edge = nt, St.style.background = nt), ut.style.opacity = String(Math.min(1, et.presence * pt.intensity * Yt)), St.style.opacity = String(Math.min(1, et.presence * pt.borderGlow * Yt));
      const vt = pt.grain > 0 ? z(pt, Ut, et.x, et.y, "#000 0%, transparent 100%") : "none";
      vt !== k.noise && (k.noise = vt, it.style.webkitMaskImage = vt, it.style.maskImage = vt), it.style.opacity = String(et.presence * pt.grain);
    }, E = (pt) => {
      if (st = 0, !Et) return;
      const Ut = P.current, Yt = Math.min(0.05, Math.max(1e-3, (pt - w) / 1e3));
      w = pt;
      const B = V.getBoundingClientRect();
      let nt = et.x, vt = et.y, dt = 0;
      if (W && V.contains(W)) {
        const ee = W.getBoundingClientRect();
        nt = ee.left + ee.width / 2 - B.left, vt = ee.top + ee.height / 2 - B.top, dt = 1;
      } else if (F.active) {
        nt = F.x - B.left, vt = F.y - B.top;
        const ee = Math.hypot(Math.max(0, -nt, nt - B.width), Math.max(0, -vt, vt - B.height));
        ee === 0 ? dt = 1 : Ut.proximity > 0 && (dt = Math.max(0, 1 - ee / Ut.proximity) ** 2);
      }
      if (dt < 0.6 && Ut.ambient && et.visible) {
        Mt || (et.time += Yt);
        const ee = 0.6 - dt;
        nt += (B.width * (0.5 + 0.34 * Math.sin(et.time * 0.43)) - nt) * (ee / 0.6), vt += (B.height * (0.5 + 0.3 * Math.sin(et.time * 0.61 + 1.3)) - vt) * (ee / 0.6), dt = 0.6;
      }
      et.presence < 0.02 && dt > 0 && !Ut.ambient && (et.x = nt, et.y = vt);
      const bt = Mt || Ut.smoothing === 0 ? 1 : 1 - Math.exp(-Yt / (0.015 + Ut.smoothing * 0.22));
      et.x += (nt - et.x) * bt, et.y += (vt - et.y) * bt;
      const jt = Mt ? 1 : 1 - Math.exp(-Yt / (dt > et.presence ? 0.1 : 0.32));
      et.presence += (dt - et.presence) * jt, Math.abs(dt - et.presence) < 2e-3 && (et.presence = dt);
      const kt = et.pressed && Ut.flare && !Mt ? 1 : 0;
      et.flare += (kt - et.flare) * (1 - Math.exp(-Yt / (kt ? 0.05 : 0.28))), Math.abs(kt - et.flare) < 2e-3 && (et.flare = kt), Nt(Ut), (!(!(Math.abs(nt - et.x) > 0.1 || Math.abs(vt - et.y) > 0.1) && et.presence === dt && et.flare === kt) || Ut.ambient && et.visible && !Mt) && (st = requestAnimationFrame(E));
    }, A = () => {
      st || !Et || (w = performance.now(), st = requestAnimationFrame(E));
    };
    Y.current = A;
    const J = (pt) => {
      F.x = pt.clientX, F.y = pt.clientY, F.active = !0, (et.presence > 0 || P.current.proximity > 0 || V.contains(pt.target)) && A();
    }, L = (pt) => {
      pt.relatedTarget || (F.active = !1, A());
    }, mt = (pt) => {
      F.x = pt.clientX, F.y = pt.clientY, F.active = !0, et.pressed = !0, A();
    }, ht = (pt) => {
      pt.pointerType !== "mouse" && (F.active = !1), !(!et.pressed && pt.pointerType === "mouse") && (et.pressed = !1, A());
    }, Rt = (pt) => {
      !(pt.target instanceof Element) || !pt.target.matches(":focus-visible") || (W = pt.target, A());
    }, ot = (pt) => {
      V.contains(pt.relatedTarget) || (W = null, A());
    }, gt = () => {
      (F.active || et.presence > 0) && A();
    }, zt = new IntersectionObserver((pt) => {
      et.visible = pt.some((Ut) => Ut.isIntersecting), et.visible && A();
    });
    return zt.observe(V), window.addEventListener("pointermove", J), window.addEventListener("pointerup", ht), window.addEventListener("pointercancel", ht), window.addEventListener("scroll", gt, { capture: !0, passive: !0 }), document.addEventListener("pointerout", L), V.addEventListener("pointerdown", mt), V.addEventListener("focusin", Rt), V.addEventListener("focusout", ot), A(), () => {
      Et = !1, cancelAnimationFrame(st), zt.disconnect(), window.removeEventListener("pointermove", J), window.removeEventListener("pointerup", ht), window.removeEventListener("pointercancel", ht), window.removeEventListener("scroll", gt, { capture: !0 }), document.removeEventListener("pointerout", L), V.removeEventListener("pointerdown", mt), V.removeEventListener("focusin", Rt), V.removeEventListener("focusout", ot), Y.current = null;
    };
  }, []), /* @__PURE__ */ ae.jsxs(
    "div",
    {
      ref: R,
      className: `spotlight-card${i ? ` ${i}` : ""}`,
      style: {
        "--spotlight-card-surface": Q.surface,
        "--spotlight-card-border": Q.border,
        "--spotlight-card-shadow": Q.shadow,
        ...u
      },
      ...T,
      children: [
        /* @__PURE__ */ ae.jsx("span", { ref: j, className: "spotlight-card__light", "aria-hidden": "true" }),
        /* @__PURE__ */ ae.jsx("span", { ref: X, className: "spotlight-card__grain", style: { backgroundImage: ZE }, "aria-hidden": "true" }),
        f,
        /* @__PURE__ */ ae.jsx("span", { className: "spotlight-card__border", "aria-hidden": "true" }),
        /* @__PURE__ */ ae.jsx("span", { ref: Z, className: "spotlight-card__edge", "aria-hidden": "true" })
      ]
    }
  );
}, v0 = { stiffness: 170, damping: 16, mass: 1 }, FE = (f, i, u) => {
  const a = Math.min(1, Math.max(0, (u - f) / (i - f)));
  return a * a * (3 - 2 * a);
}, uf = /* @__PURE__ */ new Set(), di = { pointer: null, owner: null };
let Bo = null;
const Iy = (f, i) => {
  const u = i.x - (f.left + f.width / 2), a = i.y - (f.top + f.height / 2), o = Math.hypot(Math.max(0, Math.abs(u) - f.width / 2), Math.max(0, Math.abs(a) - f.height / 2));
  return { dx: u, dy: a, outside: o };
}, Zo = () => {
  let f = null, i = 1 / 0, u = 1 / 0;
  for (const o of uf) {
    const c = o.settings.current;
    let h = null;
    if (di.pointer && !c.disabled && !o.reduce && (h = Iy(o.wrapper.getBoundingClientRect(), di.pointer), h.outside > c.padding && (h = null)), !c.exclusive) {
      (h || o.active) && o.wake();
      continue;
    }
    if (!h) continue;
    const d = Math.hypot(h.dx, h.dy);
    (h.outside < i || h.outside === i && d < u) && (f = o, i = h.outside, u = d);
  }
  const a = di.owner;
  di.owner = f, a && a !== f && a.wake(), f && f.wake();
}, JE = () => {
  const f = (u) => {
    u.pointerType !== "touch" && (di.pointer = { x: u.clientX, y: u.clientY }, Zo());
  }, i = () => {
    di.pointer = null, Zo();
  };
  return window.addEventListener("pointermove", f, { passive: !0 }), window.addEventListener("scroll", Zo, { passive: !0, capture: !0 }), document.documentElement.addEventListener("pointerleave", i), window.addEventListener("blur", i), () => {
    window.removeEventListener("pointermove", f), window.removeEventListener("scroll", Zo, { capture: !0 }), document.documentElement.removeEventListener("pointerleave", i), window.removeEventListener("blur", i);
  };
}, mm = ({
  children: f,
  padding: i = 100,
  disabled: u = !1,
  magnetStrength: a = 2,
  maxOffset: o,
  exclusive: c = !0,
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
  const T = se.useRef(null), R = se.useRef(null), j = se.useRef(null), X = {
    padding: Math.max(0, i),
    disabled: u,
    strength: Math.max(0.1, a),
    maxOffset: o,
    exclusive: c,
    axis: h,
    tilt: d,
    scale: g,
    stiffness: Math.max(1, v?.stiffness ?? v0.stiffness),
    damping: Math.max(0, v?.damping ?? v0.damping),
    mass: Math.max(0.01, v?.mass ?? v0.mass),
    onActiveChange: p
  }, Z = se.useRef(X);
  return Z.current = X, se.useEffect(() => {
    const Y = T.current, Q = R.current;
    if (!Y || !Q) return;
    const tt = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, N = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 }, K = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 0 };
    let P = !1, V = 0, ut = 0;
    const it = (W, st) => {
      const w = Z.current;
      let Et = !0;
      return Object.keys(N).forEach((z) => {
        const Nt = w.stiffness * (W[z] - N[z]) - w.damping * K[z];
        K[z] += Nt / w.mass * st, N[z] += K[z] * st;
        const E = z === "scale" ? 1e-3 : 0.05;
        (Math.abs(W[z] - N[z]) > E || Math.abs(K[z]) > E) && (Et = !1);
      }), Et;
    }, St = () => {
      const W = Z.current, st = { x: 0, y: 0, tiltX: 0, tiltY: 0, scale: 1 };
      if (W.disabled || tt || !di.pointer) return { target: st, engaged: !1 };
      if (W.exclusive && di.owner !== k) return { target: st, engaged: !1 };
      const w = Y.getBoundingClientRect(), { dx: Et, dy: z, outside: Nt } = Iy(w, di.pointer);
      if (Nt > W.padding) return { target: st, engaged: !1 };
      const E = W.padding > 0 ? 1 - FE(W.padding * 0.5, W.padding, Nt) : 1;
      let A = W.axis === "y" ? 0 : Et / W.strength * E, J = W.axis === "x" ? 0 : z / W.strength * E;
      if (W.maxOffset !== void 0 && W.maxOffset !== null) {
        const ht = Math.hypot(A, J);
        ht > W.maxOffset && (A *= W.maxOffset / ht, J *= W.maxOffset / ht);
      }
      const L = Math.max(-1, Math.min(1, Et / Math.max(w.width / 2, 1))), mt = Math.max(-1, Math.min(1, z / Math.max(w.height / 2, 1)));
      return st.x = A, st.y = J, st.tiltX = -mt * W.tilt * E, st.tiltY = L * W.tilt * E, st.scale = 1 + (W.scale - 1) * E, { target: st, engaged: !0 };
    }, Mt = () => {
      const { x: W, y: st, tiltX: w, tiltY: Et, scale: z } = N, Nt = Math.abs(w) > 0.01 || Math.abs(Et) > 0.01;
      Q.style.transform = `translate3d(${W.toFixed(2)}px, ${st.toFixed(2)}px, 0)${Nt ? ` perspective(800px) rotateX(${w.toFixed(2)}deg) rotateY(${Et.toFixed(2)}deg)` : ""}${Math.abs(z - 1) > 5e-4 ? ` scale(${z.toFixed(4)})` : ""}`;
    }, et = (W) => {
      V = 0;
      const st = ut ? Math.min((W - ut) / 1e3, 1 / 30) : 1 / 60;
      ut = W;
      const { target: w, engaged: Et } = St();
      Et !== P && (P = Et, k.active = Et, Et ? Y.setAttribute("data-magnet-active", "") : Y.removeAttribute("data-magnet-active"), Z.current.onActiveChange?.(Et));
      const z = Math.ceil(st / (1 / 120));
      let Nt = !0;
      for (let E = 0; E < z; E++) Nt = it(w, st / z);
      Nt && Object.keys(N).forEach((E) => {
        N[E] = w[E], K[E] = 0;
      }), Mt(), Nt ? ut = 0 : V = requestAnimationFrame(et);
    };
    function F() {
      V || (V = requestAnimationFrame(et));
    }
    const k = { wrapper: Y, settings: Z, reduce: tt, wake: F, active: !1 };
    return uf.add(k), Bo || (Bo = JE()), j.current = () => {
      Zo(), F();
    }, () => {
      cancelAnimationFrame(V), j.current = null, uf.delete(k), di.owner === k && (di.owner = null), !uf.size && Bo && (Bo(), Bo = null);
    };
  }, []), se.useEffect(() => {
    j.current?.();
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
}, kE = { circle: 0, square: 1, ring: 2, sparkle: 3 }, PE = { parallax: 0, repel: 1, attract: 2 }, $E = { none: 0, up: 1, down: 2, forward: 3 }, WE = 2e4, T_ = 900, E_ = 9e3, ls = 4, Sf = 10, bf = 1 / Math.tan(7.5 * Math.PI / 180), tS = 0.1, yu = 100, IE = 1.8, p0 = 1.5, eS = 520, nS = 46, t3 = `#version 300 es
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
uniform vec4 uBursts[${ls}];
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
  for (int i = 0; i < ${ls}; i++) {
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
}`, l3 = `#version 300 es
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
}`, wl = (f, i, u) => Math.min(u, Math.max(i, f)), x_ = (f, i, u) => {
  const a = f.createShader(i);
  return a ? (f.shaderSource(a, u), f.compileShader(a), f.getShaderParameter(a, f.COMPILE_STATUS) ? a : (f.deleteShader(a), null)) : null;
}, M_ = (f, i, u) => {
  const a = x_(f, f.VERTEX_SHADER, i), o = x_(f, f.FRAGMENT_SHADER, u), c = f.createProgram();
  if (!a || !o || !c) return null;
  if (f.attachShader(c, a), f.attachShader(c, o), f.linkProgram(c), f.deleteShader(a), f.deleteShader(o), !f.getProgramParameter(c, f.LINK_STATUS))
    return f.deleteProgram(c), null;
  const h = {}, d = f.getProgramParameter(c, f.ACTIVE_UNIFORMS);
  for (let g = 0; g < d; g++) {
    const v = f.getActiveUniform(c, g);
    v && (h[v.name.replace("[0]", "")] = f.getUniformLocation(c, v.name));
  }
  return { program: c, uniforms: h };
}, i3 = (f) => {
  let i = f >>> 0;
  return () => {
    i = i + 1831565813 >>> 0;
    let u = i;
    return u = Math.imul(u ^ u >>> 15, u | 1), u ^= u + Math.imul(u ^ u >>> 7, u | 61), ((u ^ u >>> 14) >>> 0) / 4294967296;
  };
}, a3 = (f) => 1 - Math.pow(1 - wl(f, 0, 1), 3), A_ = (f, i) => (f % i + i) % i, u3 = ({
  particleCount: f = 200,
  particleSpread: i = 10,
  speed: u = 0.1,
  particleColors: a = ["#ffffff"],
  moveParticlesOnHover: o = !0,
  particleHoverFactor: c = 1,
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
  connections: R = !1,
  connectionDistance: j = 110,
  hoverEffect: X = "parallax",
  hoverRadius: Z = 140,
  clickBurst: Y = !0,
  drift: Q = "none",
  driftSpeed: tt = 1,
  variation: N = 0,
  intro: K = !0,
  opacity: P = 1,
  lightMode: V = !1,
  paused: ut = !1,
  className: it = "",
  style: St
}) => {
  const Mt = se.useRef(null), et = se.useRef(null), F = se.useRef(null), k = (Array.isArray(a) ? a : [a]).filter(Boolean).map(String), W = {
    count: wl(Math.round(f), 1, WE),
    spread: Math.max(0.1, i),
    speed: u,
    colors: k.length ? k : ["#ffffff"],
    mouse: o,
    hoverFactor: Math.max(0, c),
    soft: h,
    size: Math.max(0, d),
    randomness: Math.max(0, g),
    camera: Math.max(1, v),
    rotate: !p,
    dpr: _,
    shape: kE[S] ?? 0,
    glow: Math.max(0, b),
    twinkle: wl(M, 0, 1),
    depthOfField: Math.max(0, T),
    connections: R,
    connectionDistance: Math.max(10, j),
    hoverEffect: PE[X] ?? 0,
    hoverRadius: Math.max(20, Z),
    clickBurst: Y,
    drift: $E[Q] ?? 0,
    driftSpeed: tt,
    variation: Math.max(0, Math.round(N)),
    intro: K,
    opacity: wl(P, 0, 1),
    lightMode: V,
    paused: ut
  }, st = se.useRef(W);
  return st.current = W, se.useEffect(() => {
    const w = Mt.current, Et = et.current, z = Et?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!w || !Et || !z) return;
    const Nt = M_(z, t3, e3), E = M_(z, n3, l3);
    if (!Nt || !E) return;
    const A = z.createBuffer();
    z.bindBuffer(z.ARRAY_BUFFER, A), z.bufferData(z.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), z.STATIC_DRAW);
    const J = z.createBuffer(), L = z.createBuffer(), mt = z.createBuffer(), ht = z.createVertexArray();
    z.bindVertexArray(ht), z.bindBuffer(z.ARRAY_BUFFER, A), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0);
    const Rt = (ct, at, rt) => {
      z.bindBuffer(z.ARRAY_BUFFER, ct), z.enableVertexAttribArray(at), z.vertexAttribPointer(at, rt, z.FLOAT, !1, 0, 0), z.vertexAttribDivisor(at, 1);
    };
    Rt(J, 1, 3), Rt(L, 2, 4), Rt(mt, 3, 3);
    const ot = z.createBuffer(), gt = new Float32Array(E_ * 8), zt = z.createVertexArray();
    z.bindVertexArray(zt), z.bindBuffer(z.ARRAY_BUFFER, A), z.enableVertexAttribArray(0), z.vertexAttribPointer(0, 2, z.FLOAT, !1, 0, 0), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferData(z.ARRAY_BUFFER, gt.byteLength, z.DYNAMIC_DRAW), z.enableVertexAttribArray(1), z.vertexAttribPointer(1, 4, z.FLOAT, !1, 32, 0), z.vertexAttribDivisor(1, 1), z.enableVertexAttribArray(2), z.vertexAttribPointer(2, 4, z.FLOAT, !1, 32, 16), z.vertexAttribDivisor(2, 1), z.bindVertexArray(null);
    const pt = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), Ut = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, Yt = /* @__PURE__ */ new Map(), B = (ct) => {
      if (Yt.has(ct)) return Yt.get(ct);
      let at = [1, 1, 1];
      if (pt) {
        pt.clearRect(0, 0, 1, 1), pt.fillStyle = "#ffffff", pt.fillStyle = ct, pt.fillRect(0, 0, 1, 1);
        const [rt, Tt, lt] = pt.getImageData(0, 0, 1, 1).data;
        at = [rt / 255, Tt / 255, lt / 255];
      }
      return Yt.set(ct, at), at;
    }, nt = (ct) => {
      const at = ct.map((lt) => Math.pow(lt, 2.2)), rt = 0.2126 * at[0] + 0.7152 * at[1] + 0.0722 * at[2], Tt = Math.min(1, 0.06 / Math.max(rt, 1e-4));
      return at.map((lt) => Math.pow(lt * Tt, 1 / 2.2));
    }, vt = { width: 1, height: 1, ratio: 1 }, dt = { x: 0, y: 0, sx: 0, sy: 0, nx: 0, ny: 0, inside: !1, active: 0 }, bt = {
      clock: 0,
      spin: 0,
      travel: 0,
      offsetX: 0,
      offsetY: 0,
      reveal: st.current.intro && !Ut ? 0 : 1
    }, jt = [], kt = new Float32Array(ls * 4), Ht = {
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
    let ee = 0, ue = 0, Ke = !0;
    const Re = (ct) => {
      const at = `${ct.count}|${ct.variation}|${ct.colors.join(",")}|${ct.lightMode ? 1 : 0}`;
      if (at === Ht.key) return;
      Ht.key = at;
      const rt = i3(ct.variation * 7919 + 1), Tt = ct.count, lt = new Float32Array(Tt * 3), ft = new Float32Array(Tt * 4), yt = new Float32Array(Tt * 3), xt = ct.colors.map((wt) => ct.lightMode ? nt(B(wt)) : B(wt));
      for (let wt = 0; wt < Tt; wt++) {
        let Vt, ne, Xt, Qt;
        do
          Vt = rt() * 2 - 1, ne = rt() * 2 - 1, Xt = rt() * 2 - 1, Qt = Vt * Vt + ne * ne + Xt * Xt;
        while (Qt > 1 || Qt === 0);
        const Kt = Math.cbrt(rt());
        lt.set([Vt * Kt, ne * Kt, Xt * Kt], wt * 3), ft.set([rt(), rt(), rt(), rt()], wt * 4), yt.set(xt[Math.floor(rt() * xt.length)], wt * 3);
      }
      Ht.count = Tt, Ht.positions = lt, Ht.randoms = ft, Ht.colors = yt;
      const Lt = Math.min(Tt, T_);
      Ct.x = new Float32Array(Lt), Ct.y = new Float32Array(Lt), Ct.ahead = new Float32Array(Lt), Ct.alpha = new Float32Array(Lt), z.bindBuffer(z.ARRAY_BUFFER, J), z.bufferData(z.ARRAY_BUFFER, lt, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, L), z.bufferData(z.ARRAY_BUFFER, ft, z.STATIC_DRAW), z.bindBuffer(z.ARRAY_BUFFER, mt), z.bufferData(z.ARRAY_BUFFER, yt, z.STATIC_DRAW);
    }, pn = (ct) => {
      const at = bt.clock * 1e3, rt = ct.rotate ? Math.sin(at * 2e-4) * 0.1 : 0, Tt = ct.rotate ? Math.cos(at * 5e-4) * 0.15 : 0, lt = ct.rotate ? bt.spin : 0, [ft, yt, xt, Lt, wt, Vt] = [Math.sin(rt), Math.cos(rt), Math.sin(Tt), Math.cos(Tt), Math.sin(lt), Math.cos(lt)];
      return [
        Lt * Vt + xt * ft * wt,
        yt * wt,
        -xt * Vt + Lt * ft * wt,
        -Lt * wt + xt * ft * Vt,
        yt * Vt,
        xt * wt + Lt * ft * Vt,
        xt * yt,
        -ft,
        Lt * yt
      ];
    }, Vn = () => [bt.offsetX, bt.offsetY, -(1 - a3(bt.reveal)) * 70], xe = (ct, at) => {
      const rt = Math.min(Ht.count, T_), [Tt, lt, ft] = Vn(), yt = vt.width / vt.height, xt = bt.clock, Lt = ct.hoverRadius, wt = ct.hoverEffect !== 0 ? dt.active : 0, Vt = ct.spread * 2 + 3, ne = ct.spread * Sf * 2 + 3;
      for (let Xt = 0; Xt < rt; Xt++) {
        const Qt = Ht.positions[Xt * 3] * ct.spread, Kt = Ht.positions[Xt * 3 + 1] * ct.spread, Me = Ht.positions[Xt * 3 + 2] * ct.spread * Sf, he = Ht.randoms[Xt * 4], He = Ht.randoms[Xt * 4 + 1], Xe = Ht.randoms[Xt * 4 + 2], Ae = Ht.randoms[Xt * 4 + 3], De = Math.sin(xt * Xe + 6.28 * Ae) * (0.1 + 1.4 * he), me = Math.sin(xt * He + 6.28 * he) * (0.1 + 1.4 * Ae), pl = Math.sin(xt * Ae + 6.28 * He) * (0.1 + 1.4 * Xe), mi = at[0] * Qt + at[3] * Kt + at[6] * Me + Tt + De;
        let Ve = at[1] * Qt + at[4] * Kt + at[7] * Me + lt + me, Ne = at[2] * Qt + at[5] * Kt + at[8] * Me + ft + pl, _n = 1;
        if (ct.drift === 1 || ct.drift === 2) {
          const Je = A_(Ae * Vt + lt + me + (ct.drift === 1 ? bt.travel : -bt.travel), Vt);
          Ve = Je - Vt / 2;
          const ke = wl(Je / (Vt * 0.12), 0, 1), jn = wl((Vt - Je) / (Vt * 0.12), 0, 1);
          _n = ke * ke * (3 - 2 * ke) * jn * jn * (3 - 2 * jn);
        } else if (ct.drift === 3) {
          const Je = A_(He * ne + ft + pl + bt.travel, ne);
          Ne = Je - ne / 2;
          const ke = wl(Je / (ne * 0.1), 0, 1);
          _n = ke * ke * (3 - 2 * ke);
        }
        const tn = ct.camera - Ne;
        if (tn < tS || tn > yu) {
          Ct.alpha[Xt] = 0;
          continue;
        }
        const Le = wl((tn - 1) / 3, 0, 1);
        _n *= Le * Le * (3 - 2 * Le);
        let Ue = mi * bf / yt / tn * 0.5 * vt.width + vt.width / 2, Fe = Ve * bf / tn * 0.5 * vt.height + vt.height / 2, _l = 0, ai = 0;
        if (wt > 1e-3) {
          const Je = Ue - dt.sx, ke = Fe - dt.sy, jn = Math.hypot(Je, ke), Qn = Math.exp(-(Je * Je + ke * ke) / (Lt * Lt)) * ct.hoverFactor * wt;
          ct.hoverEffect === 1 && jn > 1e-3 ? (_l += Je / jn * Lt * 0.5 * Qn, ai += ke / jn * Lt * 0.5 * Qn) : ct.hoverEffect === 2 && (_l -= Je * 0.6 * Qn, ai -= ke * 0.6 * Qn);
        }
        for (const Je of jt) {
          const ke = Je.age / p0, jn = Ue - Je.x, Qn = Fe - Je.y, jl = Math.hypot(jn, Qn);
          if (jl < 1e-3) continue;
          const Qa = Math.exp(-Math.pow((jl - ke * eS) / nS, 2)), gi = wl(jl / 30, 0, 1), en = Qa * (1 - ke) * (1 - ke) * 56 * gi * gi * (3 - 2 * gi);
          _l += jn / jl * en, ai += Qn / jl * en;
        }
        Ue += _l, Fe += ai;
        const ll = wl((yu - tn) / (yu - yu * 0.9), 0, 1), Xr = wl(bt.reveal * 1.6 - Xe * 0.6, 0, 1);
        Ct.x[Xt] = Ue, Ct.y[Xt] = Fe, Ct.ahead[Xt] = tn, Ct.alpha[Xt] = ll * ll * (3 - 2 * ll) * _n * Xr * Xr;
      }
      return rt;
    }, Yl = (ct, at) => {
      const rt = xe(ct, at), Tt = ct.connectionDistance, lt = Math.max(1, Math.ceil(vt.width / Tt) + 2), ft = /* @__PURE__ */ new Map();
      for (let Lt = 0; Lt < rt; Lt++) {
        if (Ct.alpha[Lt] < 0.02) continue;
        const wt = (Math.floor(Ct.y[Lt] / Tt) + 1) * lt + Math.floor(Ct.x[Lt] / Tt) + 1, Vt = ft.get(wt);
        Vt ? Vt.push(Lt) : ft.set(wt, [Lt]);
      }
      let yt = 0;
      const xt = Tt * Tt;
      for (const [Lt, wt] of ft)
        for (const Vt of [0, 1, lt - 1, lt, lt + 1]) {
          const ne = Vt === 0 ? wt : ft.get(Lt + Vt);
          if (ne)
            for (let Xt = 0; Xt < wt.length; Xt++) {
              const Qt = wt[Xt];
              for (let Kt = Vt === 0 ? Xt + 1 : 0; Kt < ne.length; Kt++) {
                const Me = ne[Kt], he = Ct.x[Qt] - Ct.x[Me], He = Ct.y[Qt] - Ct.y[Me], Xe = he * he + He * He;
                if (Xe > xt) continue;
                const Ae = wl(1 - Math.abs(Ct.ahead[Qt] - Ct.ahead[Me]) / 18, 0, 1);
                if (Ae <= 0) continue;
                if (yt >= E_) return yt;
                const De = 1 - Math.sqrt(Xe) / Tt, me = yt * 8;
                gt[me] = Ct.x[Qt], gt[me + 1] = Ct.y[Qt], gt[me + 2] = Ct.x[Me], gt[me + 3] = Ct.y[Me], gt[me + 4] = (Ht.colors[Qt * 3] + Ht.colors[Me * 3]) / 2, gt[me + 5] = (Ht.colors[Qt * 3 + 1] + Ht.colors[Me * 3 + 1]) / 2, gt[me + 6] = (Ht.colors[Qt * 3 + 2] + Ht.colors[Me * 3 + 2]) / 2, gt[me + 7] = De * De * Ae * 0.7 * Math.min(Ct.alpha[Qt], Ct.alpha[Me]), yt++;
              }
            }
        }
      return yt;
    }, Be = () => {
      const ct = st.current;
      Re(ct);
      const at = pn(ct), [rt, Tt, lt] = Vn();
      if (z.viewport(0, 0, Et.width, Et.height), z.clearColor(0, 0, 0, 0), z.clear(z.COLOR_BUFFER_BIT), z.enable(z.BLEND), z.blendFunc(z.ONE, z.ONE_MINUS_SRC_ALPHA), ct.connections) {
        const xt = Yl(ct, at);
        xt && (z.useProgram(E.program), z.bindVertexArray(zt), z.bindBuffer(z.ARRAY_BUFFER, ot), z.bufferSubData(z.ARRAY_BUFFER, 0, gt.subarray(0, xt * 8)), z.uniform2f(E.uniforms.uView, vt.width, vt.height), z.uniform1f(E.uniforms.uRatio, vt.ratio), z.uniform1f(E.uniforms.uWidth, 1), z.uniform1f(E.uniforms.uOpacity, ct.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, xt));
      }
      const ft = Nt.uniforms;
      let yt = 0;
      for (let xt = jt.length - 1; xt >= 0 && yt < ls; xt--)
        kt.set([jt[xt].x, jt[xt].y, jt[xt].age / p0, 1], yt * 4), yt++;
      z.useProgram(Nt.program), z.bindVertexArray(ht), z.uniformMatrix3fv(ft.uRotation, !1, at), z.uniform3f(ft.uOffset, rt, Tt, lt), z.uniform1f(ft.uSpread, ct.spread), z.uniform1f(ft.uTime, bt.clock), z.uniform1f(ft.uCamera, ct.camera), z.uniform1f(ft.uAspect, vt.width / vt.height), z.uniform2f(ft.uView, vt.width, vt.height), z.uniform1f(ft.uRatio, vt.ratio), z.uniform1f(ft.uSize, ct.size), z.uniform1f(ft.uRandomness, ct.randomness), z.uniform1f(ft.uBlur, ct.depthOfField * 14), z.uniform1f(ft.uFocus, ct.camera + 14), z.uniform1f(ft.uGlow, ct.lightMode ? ct.glow * 0.3 : ct.glow), z.uniform1f(ft.uTwinkle, ct.twinkle), z.uniform1i(ft.uShape, ct.shape), z.uniform1i(ft.uDrift, ct.drift), z.uniform1f(ft.uTravel, bt.travel), z.uniform4f(ft.uPointer, dt.sx, dt.sy, dt.active, ct.hoverRadius), z.uniform1i(ft.uEffect, ct.hoverEffect), z.uniform1f(ft.uStrength, ct.hoverFactor), z.uniform4fv(ft.uBursts, kt), z.uniform1i(ft.uBurstCount, yt), z.uniform1f(ft.uReveal, bt.reveal), z.uniform1f(ft.uSoft, ct.soft ? 0.2 : 0), z.uniform1f(ft.uShimmer, ct.lightMode ? 0 : 1), z.uniform1f(ft.uOpacity, ct.opacity), z.drawArraysInstanced(z.TRIANGLE_STRIP, 0, 4, Ht.count), z.bindVertexArray(null);
    }, Gn = (ct) => {
      if (ee = 0, !Ke || document.hidden) return;
      const at = st.current, rt = ue ? wl((ct - ue) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (ue = ct, at.paused) {
        bt.reveal = 1, Be(), ue = 0;
        return;
      }
      const Tt = Ut ? 0 : 1, lt = rt * at.speed * Tt;
      bt.clock += lt, at.rotate && (bt.spin += lt * 0.6), bt.travel += rt * at.driftSpeed * Tt * (at.drift === 3 ? 6 : 0.9);
      const ft = at.mouse && dt.inside && !Ut, yt = 1 - Math.exp(-rt / 0.35), xt = ft && at.hoverEffect === 0 ? at.hoverFactor : 0;
      bt.offsetX += (-dt.nx * xt - bt.offsetX) * yt, bt.offsetY += (-dt.ny * xt - bt.offsetY) * yt, dt.sx += (dt.x - dt.sx) * (1 - Math.exp(-rt / 0.06)), dt.sy += (dt.y - dt.sy) * (1 - Math.exp(-rt / 0.06)), dt.active += ((ft ? 1 : 0) - dt.active) * (1 - Math.exp(-rt / 0.2));
      for (let Lt = jt.length - 1; Lt >= 0; Lt--)
        jt[Lt].age += rt, jt[Lt].age >= p0 && jt.splice(Lt, 1);
      !at.intro || Ut ? bt.reveal = 1 : bt.reveal < 1 && (bt.reveal = Math.min(1, bt.reveal + rt / IE)), Be(), ee = requestAnimationFrame(Gn);
    }, Ie = () => {
      !ee && Ke && !document.hidden && (ee = requestAnimationFrame(Gn));
    }, el = () => {
      const ct = st.current, at = Math.max(1, w.clientWidth), rt = Math.max(1, w.clientHeight), Tt = Math.min(ct.dpr || window.devicePixelRatio || 1, 2);
      vt.width = at, vt.height = rt, Et.width = Math.max(1, Math.round(at * Tt)), Et.height = Math.max(1, Math.round(rt * Tt)), vt.ratio = Et.width / at, Be(), Ie();
    }, ql = (ct) => {
      const at = w.getBoundingClientRect(), rt = ct.clientX - at.left, Tt = ct.clientY - at.top, lt = dt.inside;
      dt.inside = rt >= 0 && Tt >= 0 && rt <= at.width && Tt <= at.height, dt.x = rt, dt.y = at.height - Tt, dt.nx = rt / Math.max(1, at.width) * 2 - 1, dt.ny = -(Tt / Math.max(1, at.height) * 2 - 1), dt.inside && !lt && (dt.sx = dt.x, dt.sy = dt.y);
    }, qt = (ct) => {
      ql(ct), st.current.paused || Ie();
    }, Xl = (ct) => {
      const at = st.current;
      ql(ct), !(!dt.inside || !at.clickBurst || at.paused || Ut) && (jt.push({ x: dt.x, y: dt.y, age: 0 }), jt.length > ls && jt.shift(), Ie());
    }, hn = (ct) => {
      ct.pointerType !== "mouse" && (dt.inside = !1);
    }, An = () => {
      dt.inside = !1;
    }, dn = () => {
      ue = 0, Ie();
    }, Vl = new ResizeObserver(el);
    Vl.observe(w);
    const Gl = new IntersectionObserver((ct) => {
      Ke = ct.some((at) => at.isIntersecting), Ke && (ue = 0, Ie());
    });
    Gl.observe(w), window.addEventListener("pointermove", qt, { passive: !0 }), window.addEventListener("pointerdown", Xl, { passive: !0 }), window.addEventListener("pointerup", hn, { passive: !0 }), window.addEventListener("pointercancel", hn, { passive: !0 }), document.documentElement.addEventListener("pointerleave", An), document.addEventListener("visibilitychange", dn), el();
    let nl = st.current.dpr;
    return F.current = () => {
      const ct = st.current;
      if (ct.dpr !== nl) {
        nl = ct.dpr, el();
        return;
      }
      ee || Be(), Ie();
    }, () => {
      cancelAnimationFrame(ee), F.current = null, Vl.disconnect(), Gl.disconnect(), window.removeEventListener("pointermove", qt), window.removeEventListener("pointerdown", Xl), window.removeEventListener("pointerup", hn), window.removeEventListener("pointercancel", hn), document.documentElement.removeEventListener("pointerleave", An), document.removeEventListener("visibilitychange", dn), z.deleteProgram(Nt.program), z.deleteProgram(E.program), [A, J, L, mt, ot].forEach((ct) => z.deleteBuffer(ct)), z.deleteVertexArray(ht), z.deleteVertexArray(zt), Et.isConnected || z.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), se.useEffect(() => {
    F.current?.();
  }), /* @__PURE__ */ ae.jsx("div", { ref: Mt, className: `particles-container${it ? ` ${it}` : ""}`, style: St, children: /* @__PURE__ */ ae.jsx("canvas", { ref: et, className: "particles-canvas", "aria-hidden": "true" }) });
}, X0 = 5, lS = 3, r3 = 2.4, o3 = `#version 300 es
in vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`, s3 = `#version 300 es
precision highp float;
precision highp int;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uStops[${X0}];
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
  for (int k = 0; k < ${lS}; k++) {
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
}`, Ho = (f, i, u) => Math.min(u, Math.max(i, f)), c3 = (f) => {
  const [i, u, a] = f.map((g) => g <= 0.04045 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4)), o = Math.cbrt(0.4122214708 * i + 0.5363325363 * u + 0.0514459929 * a), c = Math.cbrt(0.2119034982 * i + 0.6806995451 * u + 0.1073969566 * a), h = Math.cbrt(0.0883024619 * i + 0.2817188376 * u + 0.6299787005 * a), d = [
    0.2104542553 * o + 0.793617785 * c - 0.0040720468 * h,
    1.9779984951 * o - 2.428592205 * c + 0.4505937099 * h,
    0.0259040371 * o + 0.7827717662 * c - 0.808675766 * h
  ];
  return [d[0], Math.hypot(d[1], d[2]), Math.atan2(d[2], d[1])];
}, f3 = (f) => {
  const i = f.findIndex((o) => o[1] > 0.02);
  let a = i === -1 ? 0 : f[i][2];
  return f.map((o) => {
    let c = o[1] > 0.02 ? o[2] : a;
    for (; c - a > Math.PI; ) c -= Math.PI * 2;
    for (; c - a < -Math.PI; ) c += Math.PI * 2;
    return a = c, [o[0], o[1], c];
  });
}, w_ = (f, i, u) => {
  const a = f.createShader(i);
  return a ? (f.shaderSource(a, u), f.compileShader(a), f.getShaderParameter(a, f.COMPILE_STATUS) ? a : (f.deleteShader(a), null)) : null;
}, h3 = (f) => {
  const i = w_(f, f.VERTEX_SHADER, o3), u = w_(f, f.FRAGMENT_SHADER, s3), a = f.createProgram();
  if (!i || !u || !a) return null;
  if (f.attachShader(a, i), f.attachShader(a, u), f.bindAttribLocation(a, 0, "aPosition"), f.linkProgram(a), f.deleteShader(i), f.deleteShader(u), !f.getProgramParameter(a, f.LINK_STATUS))
    return f.deleteProgram(a), null;
  const o = {}, c = f.getProgramParameter(a, f.ACTIVE_UNIFORMS);
  for (let h = 0; h < c; h++) {
    const d = f.getActiveUniform(a, h);
    d && (o[d.name.replace("[0]", "")] = f.getUniformLocation(a, d.name));
  }
  return { program: a, uniforms: o };
}, d3 = ({
  colorStops: f = ["#5227FF", "#7cff67", "#5227FF"],
  amplitude: i = 1,
  blend: u = 0.5,
  speed: a = 1,
  time: o,
  height: c = 0.45,
  scale: h = 1,
  glow: d = 0.6,
  brightness: g = 1,
  layers: v = 1,
  direction: p = "top",
  mouseInteraction: _ = !0,
  intro: S = !0,
  opacity: b = 1,
  lightMode: M = !1,
  paused: T = !1,
  dpr: R,
  className: j = "",
  style: X
}) => {
  const Z = se.useRef(null), Y = se.useRef(null), Q = se.useRef(null), tt = (Array.isArray(f) ? f : []).filter(Boolean).map(String).slice(0, X0), N = {
    stops: tt.length >= 2 ? tt : tt.length === 1 ? [tt[0], tt[0]] : ["#5227FF", "#7cff67"],
    amplitude: Math.max(0, i),
    blend: Ho(u, 0, 1),
    speed: a,
    time: o,
    height: Ho(c, 0, 1),
    scale: Math.max(0.1, h),
    glow: Math.max(0, d),
    brightness: Math.max(0, g),
    layers: Ho(Math.round(v), 1, lS),
    flip: p === "bottom" ? 1 : 0,
    mouseInteraction: _,
    intro: S,
    opacity: Ho(b, 0, 1),
    lightMode: M,
    paused: T,
    dpr: R
  }, K = se.useRef(N);
  return K.current = N, se.useEffect(() => {
    const P = Z.current, V = Y.current, ut = V?.getContext("webgl2", {
      alpha: !0,
      premultipliedAlpha: !0,
      antialias: !1,
      depth: !1,
      stencil: !1
    });
    if (!P || !V || !ut) return;
    const it = h3(ut);
    if (!it) return;
    const St = it.uniforms, Mt = ut.createBuffer(), et = ut.createVertexArray();
    ut.bindVertexArray(et), ut.bindBuffer(ut.ARRAY_BUFFER, Mt), ut.bufferData(ut.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), ut.STATIC_DRAW), ut.enableVertexAttribArray(0), ut.vertexAttribPointer(0, 2, ut.FLOAT, !1, 0, 0);
    const F = document.createElement("canvas").getContext("2d", { willReadFrequently: !0 }), k = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? !1, W = /* @__PURE__ */ new Map(), st = (nt) => {
      if (W.has(nt)) return W.get(nt);
      let vt = [1, 1, 1];
      if (F) {
        F.clearRect(0, 0, 1, 1), F.fillStyle = "#ffffff", F.fillStyle = nt, F.fillRect(0, 0, 1, 1);
        const [dt, bt, jt] = F.getImageData(0, 0, 1, 1).data;
        vt = [dt / 255, bt / 255, jt / 255];
      }
      return W.set(nt, vt), vt;
    }, w = new Float32Array(X0 * 3), Et = { width: 1, height: 1 }, z = { x: 0, y: 0, inside: !1 }, Nt = {
      clock: 0,
      px: 0,
      py: 0.5,
      reach: 0,
      reveal: K.current.intro && !k ? 0 : 1
    };
    let E = 0, A = 0, J = !0;
    const L = () => {
      const nt = K.current;
      f3(nt.stops.map((dt) => c3(st(dt)))).forEach((dt, bt) => w.set(dt, bt * 3));
      const vt = Nt.reveal;
      ut.viewport(0, 0, V.width, V.height), ut.useProgram(it.program), ut.bindVertexArray(et), ut.uniform2f(St.uResolution, V.width, V.height), ut.uniform1f(St.uTime, nt.time !== void 0 ? nt.time * nt.speed * 0.1 : Nt.clock), ut.uniform3fv(St.uStops, w), ut.uniform1i(St.uStopCount, nt.stops.length), ut.uniform1f(St.uAmplitude, nt.amplitude), ut.uniform1f(St.uBlend, nt.blend), ut.uniform1f(St.uHeight, nt.height), ut.uniform1f(St.uScale, nt.scale), ut.uniform1f(St.uGlow, nt.glow), ut.uniform1f(St.uBrightness, nt.brightness), ut.uniform1i(St.uLayers, nt.layers), ut.uniform1f(St.uFlip, nt.flip), ut.uniform3f(St.uPointer, Nt.px, Nt.py, Nt.reach), ut.uniform1f(St.uReveal, 1 - Math.pow(1 - vt, 3)), ut.uniform1f(St.uOpacity, nt.opacity), ut.uniform1f(St.uLightMode, nt.lightMode ? 1 : 0), ut.drawArrays(ut.TRIANGLES, 0, 3);
    }, mt = (nt) => {
      if (E = 0, !J || document.hidden) return;
      const vt = K.current, dt = A ? Ho((nt - A) / 1e3, 5e-4, 0.05) : 1 / 60;
      if (A = nt, vt.paused) {
        Nt.reveal = 1, L(), A = 0;
        return;
      }
      const bt = k ? 0 : 1;
      Nt.clock += dt * vt.speed * bt;
      const jt = vt.mouseInteraction && z.inside && !k, kt = 1 - Math.exp(-dt / 0.6);
      if (jt) {
        const Ht = (z.x - Et.width / 2) / Et.height, Ct = vt.flip ? 1 - z.y / Et.height : z.y / Et.height;
        Nt.px += (Ht - Nt.px) * kt, Nt.py += (Ct - Nt.py) * kt;
      }
      Nt.reach += ((jt ? 1 : 0) - Nt.reach) * (1 - Math.exp(-dt / (jt ? 0.9 : 1.4))), !vt.intro || k ? Nt.reveal = 1 : Nt.reveal < 1 && (Nt.reveal = Math.min(1, Nt.reveal + dt / r3)), L(), E = requestAnimationFrame(mt);
    }, ht = () => {
      !E && J && !document.hidden && (E = requestAnimationFrame(mt));
    }, Rt = () => {
      const nt = K.current, vt = Math.max(1, P.clientWidth), dt = Math.max(1, P.clientHeight), bt = Math.min(nt.dpr || window.devicePixelRatio || 1, 2);
      Et.width = vt, Et.height = dt, V.width = Math.max(1, Math.round(vt * bt)), V.height = Math.max(1, Math.round(dt * bt)), L(), ht();
    }, ot = (nt) => {
      const vt = P.getBoundingClientRect();
      z.x = nt.clientX - vt.left, z.y = nt.clientY - vt.top;
      const dt = z.inside;
      if (z.inside = z.x >= 0 && z.y >= 0 && z.x <= vt.width && z.y <= vt.height, z.inside && !dt) {
        const bt = K.current;
        Nt.px = (z.x - vt.width / 2) / Math.max(1, vt.height), Nt.py = bt.flip ? 1 - z.y / Math.max(1, vt.height) : z.y / Math.max(1, vt.height);
      }
      K.current.paused || ht();
    }, gt = (nt) => {
      nt.pointerType !== "mouse" && (z.inside = !1);
    }, zt = () => {
      z.inside = !1;
    }, pt = () => {
      A = 0, ht();
    }, Ut = new ResizeObserver(Rt);
    Ut.observe(P);
    const Yt = new IntersectionObserver((nt) => {
      J = nt.some((vt) => vt.isIntersecting), J && (A = 0, ht());
    });
    Yt.observe(P), window.addEventListener("pointermove", ot, { passive: !0 }), window.addEventListener("pointerdown", ot, { passive: !0 }), window.addEventListener("pointerup", gt, { passive: !0 }), window.addEventListener("pointercancel", gt, { passive: !0 }), document.documentElement.addEventListener("pointerleave", zt), document.addEventListener("visibilitychange", pt), Rt();
    let B = K.current.dpr;
    return Q.current = () => {
      const nt = K.current;
      if (nt.dpr !== B) {
        B = nt.dpr, Rt();
        return;
      }
      E || L(), ht();
    }, () => {
      cancelAnimationFrame(E), Q.current = null, Ut.disconnect(), Yt.disconnect(), window.removeEventListener("pointermove", ot), window.removeEventListener("pointerdown", ot), window.removeEventListener("pointerup", gt), window.removeEventListener("pointercancel", gt), document.documentElement.removeEventListener("pointerleave", zt), document.removeEventListener("visibilitychange", pt), ut.deleteProgram(it.program), ut.deleteBuffer(Mt), ut.deleteVertexArray(et), V.isConnected || ut.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []), se.useEffect(() => {
    Q.current?.();
  }), /* @__PURE__ */ ae.jsx("div", { ref: Z, className: `aurora-container${j ? ` ${j}` : ""}`, style: X, children: /* @__PURE__ */ ae.jsx("canvas", { ref: Y, className: "aurora-canvas", "aria-hidden": "true" }) });
}, kc = {
  linear: (f) => f,
  "ease-in": (f) => f * f,
  "ease-out": (f) => 1 - Math.pow(1 - f, 3),
  "ease-in-out": (f) => f < 0.5 ? 4 * f * f * f : 1 - Math.pow(-2 * f + 2, 3) / 2,
  spring: (f) => 1 + 2.4 * Math.pow(f - 1, 3) + 1.4 * Math.pow(f - 1, 2)
}, m3 = ["line", "streak", "dot", "star"], g3 = 32, v3 = 500, O_ = 320, Ra = (f, i, u) => Math.min(u, Math.max(i, f)), p3 = (f, i, u) => {
  const a = Ra((u - f) / (i - f), 0, 1);
  return a * a * (3 - 2 * a);
}, _3 = (f) => {
  const i = (Array.isArray(f) ? f : [f]).filter(Boolean);
  return i.length ? i : ["#ffffff"];
}, y3 = (f, i, u, a, o) => {
  const c = a * 0.16;
  f.beginPath(), f.moveTo(i + Math.cos(o) * a, u + Math.sin(o) * a);
  for (let h = 1; h <= 4; h++) {
    const d = o + h * Math.PI / 2, g = d - Math.PI / 4;
    f.quadraticCurveTo(
      i + Math.cos(g) * c,
      u + Math.sin(g) * c,
      i + Math.cos(d) * a,
      u + Math.sin(d) * a
    );
  }
  f.closePath();
}, S3 = (f, i) => {
  f.fillStyle = i;
  const u = String(f.fillStyle), a = /^#([0-9a-f]{6})$/i.exec(u);
  if (a) {
    const c = parseInt(a[1], 16);
    return [c >> 16 & 255, c >> 8 & 255, c & 255];
  }
  const o = /^rgba?\(([^)]+)\)$/i.exec(u);
  return o ? o[1].split(",").slice(0, 3).map((c) => parseFloat(c)) : [0, 0, 0];
}, iS = se.forwardRef(
  ({
    sparkColor: f = "#fff",
    sparkSize: i = 14,
    sparkRadius: u = 30,
    sparkCount: a = 8,
    sparkWidth: o = 2,
    duration: c = 500,
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
    disabled: R = !1,
    className: j = "",
    style: X,
    children: Z
  }, Y) => {
    const Q = se.useRef(null), tt = se.useRef(null), N = se.useRef(null), K = {
      colors: _3(f),
      size: Math.max(0, i),
      radius: Math.max(0, u) * Math.max(0, d),
      count: Ra(Math.round(a), 1, 64),
      width: Math.max(0.5, o),
      duration: Math.max(60, c),
      ease: kc[h] ?? kc["ease-out"],
      shape: m3.includes(g) ? g : "line",
      randomness: Ra(v, 0, 1),
      gravity: Math.max(0, p),
      spread: Ra(_, 0, 360),
      direction: S,
      glow: Ra(b, 0, 1),
      ring: M,
      disabled: R
    }, P = se.useRef(K);
    return P.current = K, se.useEffect(() => {
      const V = Q.current, ut = tt.current;
      if (!V || !ut) return;
      const it = window.matchMedia("(prefers-reduced-motion: reduce)").matches, St = [];
      let Mt = 0, et = { time: -1e9, x: 0, y: 0 };
      const F = (A, J) => 0.5 * A.gravity * v3 * J * J, k = (A, J, L, mt) => [
        A.x + Math.cos(J.angle) * L,
        A.y + Math.sin(J.angle) * L + F(A.settings, mt)
      ], W = (A, J, L, mt) => {
        const ht = J.settings, Rt = it ? O_ : ht.duration * L.life, ot = mt / Rt;
        if (ot >= 1) return !1;
        const gt = it ? 0.55 : ht.ease(Ra(ot, 0, 1)), zt = it ? 0 : mt / 1e3, pt = ht.radius * L.reach * gt, Ut = ht.width * L.scale, Yt = it ? 1 - ot : 1 - p3(ht.shape === "line" ? 0.55 : 0.7, 1, ot);
        if (Yt <= 0) return !0;
        if (A.strokeStyle = L.color, A.fillStyle = L.color, ht.shape === "line") {
          const jt = ht.size * L.scale * (it ? 0.5 : Math.pow(1 - ot, 1.6)), [kt, Ht] = k(J, L, pt, zt), [Ct, ee] = k(J, L, pt + Math.max(0.01, jt), zt);
          return A.lineCap = "round", L.glow > 0 && (A.globalAlpha = Yt * 0.14 * L.glow, A.lineWidth = Ut * 4.5, A.beginPath(), A.moveTo(kt, Ht), A.lineTo(Ct, ee), A.stroke()), A.globalAlpha = Yt, A.lineWidth = Ut, A.beginPath(), A.moveTo(kt, Ht), A.lineTo(Ct, ee), A.stroke(), !0;
        }
        if (ht.shape === "streak") {
          const jt = it ? 0 : Math.min(mt, 70 + ht.size * 4 * L.scale), kt = it ? 0.4 : ht.ease(Ra((mt - jt) / Rt, 0, 1)), [Ht, Ct] = k(J, L, pt, zt), [ee, ue] = k(J, L, ht.radius * L.reach * kt, Math.max(0, zt - jt / 1e3)), Ke = Ht - ee, Re = Ct - ue, pn = Math.hypot(Ke, Re) || 1, Vn = -Re / pn * Ut * 0.5, xe = Ke / pn * Ut * 0.5, Yl = (Be, Gn) => {
            const Ie = A.createLinearGradient(ee, ue, Ht, Ct);
            Ie.addColorStop(0, L.clear), Ie.addColorStop(1, L.color), A.globalAlpha = Gn, A.fillStyle = Ie, A.beginPath(), A.moveTo(ee, ue), A.lineTo(Ht + Vn * Be, Ct + xe * Be), A.lineTo(Ht - Vn * Be, Ct - xe * Be), A.closePath(), A.fill(), A.fillStyle = L.color, A.beginPath(), A.arc(Ht, Ct, Ut * 0.5 * Be, 0, Math.PI * 2), A.fill();
          };
          return L.glow > 0 && Yl(3.2, Yt * 0.16 * L.glow), Yl(1, Yt), !0;
        }
        if (ht.shape === "dot") {
          const [jt, kt] = k(J, L, pt, zt), Ht = Ut * 1.25 * (1 - 0.5 * gt);
          return L.glow > 0 && (A.globalAlpha = Yt * 0.18 * L.glow, A.beginPath(), A.arc(jt, kt, Ht * 2.6, 0, Math.PI * 2), A.fill()), A.globalAlpha = Yt, A.beginPath(), A.arc(jt, kt, Ht, 0, Math.PI * 2), A.fill(), !0;
        }
        const [B, nt] = k(J, L, pt, zt), vt = it ? 1 - ot : Math.pow(Math.sin(Math.PI * Ra(ot * 1.1, 0, 1)), 0.7), dt = ht.size * 0.6 * L.scale * vt, bt = L.angle + L.spin * ot * Math.PI * 0.5;
        return dt <= 0.05 || (L.glow > 0 && (A.globalAlpha = Yt * 0.2 * L.glow, A.beginPath(), A.arc(B, nt, dt * 1.1, 0, Math.PI * 2), A.fill()), A.globalAlpha = Yt, y3(A, B, nt, dt, bt), A.fill()), !0;
      }, st = (A, J, L) => {
        const mt = J.settings, ht = it ? O_ : mt.duration * 0.8, Rt = L / ht;
        if (Rt >= 1) return !1;
        const ot = 2 + mt.radius * 0.6 * (it ? 0.6 : kc["ease-out"](Rt));
        return A.globalAlpha = Math.pow(1 - Rt, 2) * 0.7, A.strokeStyle = J.sparks[0]?.color ?? mt.colors[0], A.lineWidth = Math.max(0.5, mt.width * (1 - Rt) * 0.9), A.beginPath(), A.arc(J.x, J.y, ot, 0, Math.PI * 2), A.stroke(), !0;
      }, w = (A) => {
        A.canvas.remove();
        const J = St.indexOf(A);
        J >= 0 && St.splice(J, 1);
      }, Et = (A) => {
        Mt = 0;
        for (const J of [...St]) {
          const L = A - J.start, mt = J.ctx;
          mt.setTransform(1, 0, 0, 1, 0, 0), mt.clearRect(0, 0, J.canvas.width, J.canvas.height), mt.setTransform(J.ratio, 0, 0, J.ratio, -J.left * J.ratio, -J.top * J.ratio);
          let ht = !1;
          J.settings.ring && st(mt, J, L) && (ht = !0);
          for (const Rt of J.sparks)
            W(mt, J, Rt, L) && (ht = !0);
          mt.globalAlpha = 1, ht || w(J);
        }
        St.length && (Mt = requestAnimationFrame(Et));
      }, z = (A, J) => {
        const L = P.current;
        if (L.disabled) return;
        const mt = V.getBoundingClientRect(), ht = Math.floor(Math.random() * L.colors.length), Rt = L.spread >= 359.5, ot = L.spread * Math.PI / 180, gt = (L.direction - 90) * Math.PI / 180, zt = Rt ? Math.PI * 2 / L.count : L.count > 1 ? ot / (L.count - 1) : 0, pt = Array.from({ length: L.count }, (jt, kt) => {
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
          left: Math.max(A - B, 0),
          top: Math.max(J - B, 0),
          right: Math.min(A + B, window.innerWidth),
          bottom: Math.min(J + B + Yt, window.innerHeight)
        };
        if (nt.right - nt.left < 1 || nt.bottom - nt.top < 1) return;
        const vt = Math.min(window.devicePixelRatio || 1, 2), dt = document.createElement("canvas");
        dt.width = Math.ceil((nt.right - nt.left) * vt), dt.height = Math.ceil((nt.bottom - nt.top) * vt), Object.assign(dt.style, {
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
        for (const jt of pt) {
          const [kt, Ht, Ct] = S3(bt, jt.color);
          jt.clear = `rgba(${kt}, ${Ht}, ${Ct}, 0)`, jt.glow = L.glow * (0.35 + 0.65 * ((0.2126 * kt + 0.7152 * Ht + 0.0722 * Ct) / 255));
        }
        for (St.push({
          x: A,
          y: J,
          start: performance.now(),
          sparks: pt,
          settings: { ...L },
          canvas: dt,
          ctx: bt,
          ratio: vt,
          left: nt.left,
          top: nt.top
        }); St.length > g3; ) w(St[0]);
        Mt || (Mt = requestAnimationFrame(Et));
      }, Nt = (A) => {
        A.pointerType !== "mouse" || A.button !== 0 || (et = { time: performance.now(), x: A.clientX, y: A.clientY }, z(A.clientX, A.clientY));
      }, E = (A) => {
        if ("pointerType" in A && A.pointerType === "mouse") return;
        if (A.detail === 0) {
          const mt = (A.target instanceof Element ? A.target : V).getBoundingClientRect();
          z(mt.left + mt.width / 2, mt.top + mt.height / 2);
          return;
        }
        performance.now() - et.time < 700 && Math.hypot(A.clientX - et.x, A.clientY - et.y) < 12 || z(A.clientX, A.clientY);
      };
      return V.addEventListener("pointerdown", Nt), V.addEventListener("click", E), N.current = {
        spark: (A, J) => {
          const L = V.getBoundingClientRect();
          z(L.left + (A ?? L.width / 2), L.top + (J ?? L.height / 2));
        }
      }, () => {
        cancelAnimationFrame(Mt), V.removeEventListener("pointerdown", Nt), V.removeEventListener("click", E);
        for (const A of [...St]) w(A);
        N.current = null;
      };
    }, []), se.useImperativeHandle(
      Y,
      () => ({
        spark: (V, ut) => N.current?.spark(V, ut)
      }),
      []
    ), /* @__PURE__ */ ae.jsxs(
      "div",
      {
        ref: Q,
        className: j,
        style: { position: "relative", width: "100%", height: "100%", isolation: "isolate", ...X },
        children: [
          Z,
          /* @__PURE__ */ ae.jsx(
            "span",
            {
              ref: tt,
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
iS.displayName = "ClickSpark";
Tn.registerPlugin(Pt);
const b3 = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function Cu(f, i) {
  const u = document.getElementById(f);
  if (!u) return null;
  try {
    const a = kb.createRoot(u);
    return Pb.flushSync(() => a.render(i)), a;
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
function R_(f, i) {
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
      if (i === "chars")
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
  /* @__PURE__ */ ae.jsx(mm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsxs("a", { href: "/register", className: "s-btn", children: [
    /* @__PURE__ */ ae.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ae.jsx("use", { href: "#i-bolt" }) }),
    " Inizia gratis"
  ] }) })
);
Cu(
  "rb-magnet-2",
  /* @__PURE__ */ ae.jsx(mm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsx("a", { href: "/demo", className: "s-btn s-btn-ghost", children: "Prova la demo" }) })
);
Cu(
  "rb-magnet-3",
  /* @__PURE__ */ ae.jsx(mm, { magnetStrength: 1.6, padding: 44, maxOffset: 9, children: /* @__PURE__ */ ae.jsxs("a", { className: "s-btn s-btn-light", href: "https://github.com/mirkosio/b-lance/releases/latest", children: [
    /* @__PURE__ */ ae.jsx("svg", { width: "17", height: "17", "aria-hidden": "true", children: /* @__PURE__ */ ae.jsx("use", { href: "#i-bolt" }) }),
    " Scarica l'APK"
  ] }) })
);
Cu(
  "rb-features",
  /* @__PURE__ */ ae.jsx(ae.Fragment, { children: T3.map((f, i) => /* @__PURE__ */ ae.jsxs(
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
          i + 1
        ] })
      ]
    },
    f.title
  )) })
);
function E3() {
  const f = se.useRef(null);
  return se.useEffect(() => {
    const i = (u) => f.current?.spark(u.clientX, u.clientY);
    return document.addEventListener("pointerdown", i), () => document.removeEventListener("pointerdown", i);
  }, []), /* @__PURE__ */ ae.jsx(
    iS,
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
  window.__blLenis = f, f.on("scroll", Pt.update), Tn.ticker.add((v) => f.raf(v * 1e3)), Tn.ticker.lagSmoothing(0);
  const i = R_(document.getElementById("rb-title"), "chars"), u = R_(document.getElementById("rb-accent"), "words");
  Tn.from(i, {
    yPercent: 112,
    opacity: 0,
    duration: 0.85,
    stagger: 0.026,
    ease: "power3.out",
    delay: 0.08
  }), Tn.from(u, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.32
  }), document.querySelectorAll('a[href^="#"]').forEach((v) => {
    v.addEventListener("click", (p) => {
      const _ = document.querySelector(v.getAttribute("href"));
      _ && (p.preventDefault(), f.scrollTo(_, { offset: -20 }));
    });
  });
  const a = document.getElementById("rb-tilt"), o = a?.querySelector(".s-receipt");
  if (a && o) {
    Tn.set(o, { transformPerspective: 900 });
    const v = Tn.quickTo(o, "rotationY", { duration: 0.5, ease: "power2.out" }), p = Tn.quickTo(o, "rotationX", { duration: 0.5, ease: "power2.out" });
    a.addEventListener("pointermove", (_) => {
      const S = a.getBoundingClientRect(), b = (_.clientX - S.left) / S.width - 0.5, M = (_.clientY - S.top) / S.height - 0.5;
      v(b * 9), p(M * -7);
    }), a.addEventListener("pointerleave", () => {
      v(0), p(0);
    }), Tn.to(o, {
      yPercent: -7,
      ease: "none",
      scrollTrigger: { trigger: ".s-cover", start: "top top", end: "bottom top", scrub: 0.6 }
    });
  }
  const c = (v, p = {}) => {
    v.length && Tn.from(v, {
      opacity: 0,
      y: 26,
      duration: 0.7,
      ease: "power2.out",
      stagger: 0.08,
      ...p
    });
  };
  c([document.querySelector(".s-kicker"), document.querySelector(".s-lede"), document.querySelector(".s-cta"), document.querySelector(".s-note")], { delay: 0.15 }), c([...document.querySelectorAll(".s-fact")]), c([...document.querySelectorAll(".s-sec-head > *")], { scrollTrigger: { trigger: ".s-features", start: "top 78%", once: !0 } }), c([...document.querySelectorAll(".s-faq-item")], { scrollTrigger: { trigger: ".s-faq", start: "top 75%", once: !0 } }), c([...document.querySelectorAll(".s-final > .s-wrap > *")], { scrollTrigger: { trigger: ".s-final", start: "top 80%", once: !0 } }), Pt.batch(".s-bento .s-card", {
    start: "top 88%",
    once: !0,
    onEnter: (v) => Tn.from(v, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: "power2.out",
      stagger: 0.06
    })
  });
  const h = document.querySelector(".s-phone");
  h && (Tn.from(h, {
    opacity: 0,
    y: 60,
    rotate: 5,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: { trigger: ".s-app", start: "top 70%", once: !0 }
  }), Tn.to(h, {
    y: -26,
    rotate: -1,
    ease: "none",
    scrollTrigger: { trigger: ".s-app", start: "top bottom", end: "bottom top", scrub: 0.7 }
  })), Tn.matchMedia().add("(min-width: 901px)", () => {
    const v = document.getElementById("rb-track"), p = document.querySelector(".s-steps");
    if (!v || !p) return;
    const _ = () => Math.max(0, v.scrollWidth - document.documentElement.clientWidth + 48), S = Tn.to(v, {
      x: () => -_(),
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top top",
        end: () => `+=${_()}`,
        pin: !0,
        scrub: 0.8,
        anticipatePin: 1,
        invalidateOnRefresh: !0
      }
    }), b = document.getElementById("rb-progress");
    return b && Tn.to(b, {
      scaleX: 1,
      ease: "none",
      scrollTrigger: {
        trigger: p,
        start: "top top",
        end: () => `+=${_()}`,
        scrub: !0
      }
    }), () => {
      S.scrollTrigger?.kill(), S.kill(), Tn.set(v, { x: 0 });
    };
  });
  const g = document.querySelector(".s-rail");
  if (g) {
    const v = [...g.querySelectorAll("a")], p = [".s-cover", ".s-app", ".s-final"].map((b) => document.querySelector(b)).filter(Boolean), _ = document.querySelector(".s-steps"), S = () => {
      const b = window.innerHeight * 0.5, M = p.some((X) => {
        const Z = X.getBoundingClientRect();
        return Z.top <= b && Z.bottom >= b;
      });
      g.classList.toggle("is-inverse", M);
      const T = _ && (_.closest(".pin-spacer") || _), R = T && T.getBoundingClientRect(), j = !!R && R.bottom > 0 && R.top < window.innerHeight;
      g.classList.toggle("is-hidden", j), v.forEach((X) => {
        const Z = document.querySelector(X.getAttribute("href"));
        if (!Z) return;
        const Y = Z.getBoundingClientRect();
        X.classList.toggle("is-current", Y.top <= b && Y.bottom > b);
      });
    };
    window.addEventListener("scroll", S, { passive: !0 }), window.addEventListener("resize", S), S();
  }
}
window.addEventListener("load", () => Pt.refresh());
