var Or = Object.defineProperty;
var $r = (e, t, s) => (t in e ? Or(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : (e[t] = s));
var T = (e, t, s) => ($r(e, typeof t != "symbol" ? t + "" : t, s), s);
(function () {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const o of document.querySelectorAll('link[rel="modulepreload"]')) n(o);
    new MutationObserver((o) => {
        for (const i of o) if (i.type === "childList") for (const r of i.addedNodes) r.tagName === "LINK" && r.rel === "modulepreload" && n(r);
    }).observe(document, { childList: !0, subtree: !0 });
    function s(o) {
        const i = {};
        return (
            o.integrity && (i.integrity = o.integrity),
            o.referrerpolicy && (i.referrerPolicy = o.referrerpolicy),
            o.crossorigin === "use-credentials" ? (i.credentials = "include") : o.crossorigin === "anonymous" ? (i.credentials = "omit") : (i.credentials = "same-origin"),
            i
        );
    }
    function n(o) {
        if (o.ep) return;
        o.ep = !0;
        const i = s(o);
        fetch(o.href, i);
    }
})();
class fi {
    constructor(t) {
        T(this, "_handlers");
        T(this, "_name");
        (this._handlers = {}), (this._name = t);
    }
    on(t, s, n) {
        let o = this._handlers[s];
        o === void 0 && ((o = []), (this._handlers[s] = o)), o.push({ fn: n, target: t });
    }
    offAll(t) {
        var s, n;
        for (const o of Object.keys(this._handlers)) {
            const i = o;
            this._handlers[i] = (n = (s = this._handlers[i]) == null ? void 0 : s.filter((r) => r.target !== t)) != null ? n : [];
        }
    }
    dispatch(t, ...s) {
        const n = this._handlers[t];
        n !== void 0 &&
            n.forEach((o) => {
                var i;
                return (i = o.fn) == null ? void 0 : i.call(o, s);
            });
    }
}
function Dn(e, t) {
    const s = Object.create(null),
        n = e.split(",");
    for (let o = 0; o < n.length; o++) s[n[o]] = !0;
    return t ? (o) => !!s[o.toLowerCase()] : (o) => !!s[o];
}
const ue = {},
    Xt = [],
    Qe = () => {},
    Ur = () => !1,
    Pr = /^on[^a-z]/,
    Ws = (e) => Pr.test(e),
    Ln = (e) => e.startsWith("onUpdate:"),
    xe = Object.assign,
    Fn = (e, t) => {
        const s = e.indexOf(t);
        s > -1 && e.splice(s, 1);
    },
    Cr = Object.prototype.hasOwnProperty,
    G = (e, t) => Cr.call(e, t),
    j = Array.isArray,
    Wt = (e) => vs(e) === "[object Map]",
    qs = (e) => vs(e) === "[object Set]",
    go = (e) => vs(e) === "[object Date]",
    K = (e) => typeof e == "function",
    _e = (e) => typeof e == "string",
    ls = (e) => typeof e == "symbol",
    le = (e) => e !== null && typeof e == "object",
    di = (e) => le(e) && K(e.then) && K(e.catch),
    pi = Object.prototype.toString,
    vs = (e) => pi.call(e),
    Ar = (e) => vs(e).slice(8, -1),
    hi = (e) => vs(e) === "[object Object]",
    Bn = (e) => _e(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e,
    $s = Dn(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),
    zs = (e) => {
        const t = Object.create(null);
        return (s) => t[s] || (t[s] = e(s));
    },
    Rr = /-(\w)/g,
    ct = zs((e) => e.replace(Rr, (t, s) => (s ? s.toUpperCase() : ""))),
    Dr = /\B([A-Z])/g,
    Jt = zs((e) => e.replace(Dr, "-$1").toLowerCase()),
    Ks = zs((e) => e.charAt(0).toUpperCase() + e.slice(1)),
    ln = zs((e) => (e ? `on${Ks(e)}` : "")),
    fs = (e, t) => !Object.is(e, t),
    Us = (e, t) => {
        for (let s = 0; s < e.length; s++) e[s](t);
    },
    Rs = (e, t, s) => {
        Object.defineProperty(e, t, { configurable: !0, enumerable: !1, value: s });
    },
    vn = (e) => {
        const t = parseFloat(e);
        return isNaN(t) ? e : t;
    };
let _o;
const bn = () => _o || (_o = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Me(e) {
    if (j(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++) {
            const n = e[s],
                o = _e(n) ? Nr(n) : Me(n);
            if (o) for (const i in o) t[i] = o[i];
        }
        return t;
    } else {
        if (_e(e)) return e;
        if (le(e)) return e;
    }
}
const Lr = /;(?![^(]*\))/g,
    Fr = /:([^]+)/,
    Br = /\/\*[^]*?\*\//g;
function Nr(e) {
    const t = {};
    return (
        e
            .replace(Br, "")
            .split(Lr)
            .forEach((s) => {
                if (s) {
                    const n = s.split(Fr);
                    n.length > 1 && (t[n[0].trim()] = n[1].trim());
                }
            }),
        t
    );
}
function ge(e) {
    let t = "";
    if (_e(e)) t = e;
    else if (j(e))
        for (let s = 0; s < e.length; s++) {
            const n = ge(e[s]);
            n && (t += n + " ");
        }
    else if (le(e)) for (const s in e) e[s] && (t += s + " ");
    return t.trim();
}
function Hr(e) {
    if (!e) return null;
    let { class: t, style: s } = e;
    return t && !_e(t) && (e.class = ge(t)), s && (e.style = Me(s)), e;
}
const jr = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",
    Yr = Dn(jr);
function mi(e) {
    return !!e || e === "";
}
function Xr(e, t) {
    if (e.length !== t.length) return !1;
    let s = !0;
    for (let n = 0; s && n < e.length; n++) s = Vs(e[n], t[n]);
    return s;
}
function Vs(e, t) {
    if (e === t) return !0;
    let s = go(e),
        n = go(t);
    if (s || n) return s && n ? e.getTime() === t.getTime() : !1;
    if (((s = ls(e)), (n = ls(t)), s || n)) return e === t;
    if (((s = j(e)), (n = j(t)), s || n)) return s && n ? Xr(e, t) : !1;
    if (((s = le(e)), (n = le(t)), s || n)) {
        if (!s || !n) return !1;
        const o = Object.keys(e).length,
            i = Object.keys(t).length;
        if (o !== i) return !1;
        for (const r in e) {
            const a = e.hasOwnProperty(r),
                c = t.hasOwnProperty(r);
            if ((a && !c) || (!a && c) || !Vs(e[r], t[r])) return !1;
        }
    }
    return String(e) === String(t);
}
function gi(e, t) {
    return e.findIndex((s) => Vs(s, t));
}
const P = (e) => (_e(e) ? e : e == null ? "" : j(e) || (le(e) && (e.toString === pi || !K(e.toString))) ? JSON.stringify(e, _i, 2) : String(e)),
    _i = (e, t) =>
        t && t.__v_isRef ? _i(e, t.value) : Wt(t) ? { [`Map(${t.size})`]: [...t.entries()].reduce((s, [n, o]) => ((s[`${n} =>`] = o), s), {}) } : qs(t) ? { [`Set(${t.size})`]: [...t.values()] } : le(t) && !j(t) && !hi(t) ? String(t) : t;
let Ve;
class Wr {
    constructor(t = !1) {
        (this.detached = t), (this._active = !0), (this.effects = []), (this.cleanups = []), (this.parent = Ve), !t && Ve && (this.index = (Ve.scopes || (Ve.scopes = [])).push(this) - 1);
    }
    get active() {
        return this._active;
    }
    run(t) {
        if (this._active) {
            const s = Ve;
            try {
                return (Ve = this), t();
            } finally {
                Ve = s;
            }
        }
    }
    on() {
        Ve = this;
    }
    off() {
        Ve = this.parent;
    }
    stop(t) {
        if (this._active) {
            let s, n;
            for (s = 0, n = this.effects.length; s < n; s++) this.effects[s].stop();
            for (s = 0, n = this.cleanups.length; s < n; s++) this.cleanups[s]();
            if (this.scopes) for (s = 0, n = this.scopes.length; s < n; s++) this.scopes[s].stop(!0);
            if (!this.detached && this.parent && !t) {
                const o = this.parent.scopes.pop();
                o && o !== this && ((this.parent.scopes[this.index] = o), (o.index = this.index));
            }
            (this.parent = void 0), (this._active = !1);
        }
    }
}
function qr(e, t = Ve) {
    t && t.active && t.effects.push(e);
}
function zr() {
    return Ve;
}
const Nn = (e) => {
        const t = new Set(e);
        return (t.w = 0), (t.n = 0), t;
    },
    yi = (e) => (e.w & bt) > 0,
    vi = (e) => (e.n & bt) > 0,
    Kr = ({ deps: e }) => {
        if (e.length) for (let t = 0; t < e.length; t++) e[t].w |= bt;
    },
    Vr = (e) => {
        const { deps: t } = e;
        if (t.length) {
            let s = 0;
            for (let n = 0; n < t.length; n++) {
                const o = t[n];
                yi(o) && !vi(o) ? o.delete(e) : (t[s++] = o), (o.w &= ~bt), (o.n &= ~bt);
            }
            t.length = s;
        }
    },
    wn = new WeakMap();
let is = 0,
    bt = 1;
const Mn = 30;
let Ze;
const Ft = Symbol(""),
    xn = Symbol("");
class Hn {
    constructor(t, s = null, n) {
        (this.fn = t), (this.scheduler = s), (this.active = !0), (this.deps = []), (this.parent = void 0), qr(this, n);
    }
    run() {
        if (!this.active) return this.fn();
        let t = Ze,
            s = yt;
        for (; t; ) {
            if (t === this) return;
            t = t.parent;
        }
        try {
            return (this.parent = Ze), (Ze = this), (yt = !0), (bt = 1 << ++is), is <= Mn ? Kr(this) : yo(this), this.fn();
        } finally {
            is <= Mn && Vr(this), (bt = 1 << --is), (Ze = this.parent), (yt = s), (this.parent = void 0), this.deferStop && this.stop();
        }
    }
    stop() {
        Ze === this ? (this.deferStop = !0) : this.active && (yo(this), this.onStop && this.onStop(), (this.active = !1));
    }
}
function yo(e) {
    const { deps: t } = e;
    if (t.length) {
        for (let s = 0; s < t.length; s++) t[s].delete(e);
        t.length = 0;
    }
}
let yt = !0;
const bi = [];
function Qt() {
    bi.push(yt), (yt = !1);
}
function es() {
    const e = bi.pop();
    yt = e === void 0 ? !0 : e;
}
function He(e, t, s) {
    if (yt && Ze) {
        let n = wn.get(e);
        n || wn.set(e, (n = new Map()));
        let o = n.get(s);
        o || n.set(s, (o = Nn())), wi(o);
    }
}
function wi(e, t) {
    let s = !1;
    is <= Mn ? vi(e) || ((e.n |= bt), (s = !yi(e))) : (s = !e.has(Ze)), s && (e.add(Ze), Ze.deps.push(e));
}
function pt(e, t, s, n, o, i) {
    const r = wn.get(e);
    if (!r) return;
    let a = [];
    if (t === "clear") a = [...r.values()];
    else if (s === "length" && j(e)) {
        const c = Number(n);
        r.forEach((u, p) => {
            (p === "length" || p >= c) && a.push(u);
        });
    } else
        switch ((s !== void 0 && a.push(r.get(s)), t)) {
            case "add":
                j(e) ? Bn(s) && a.push(r.get("length")) : (a.push(r.get(Ft)), Wt(e) && a.push(r.get(xn)));
                break;
            case "delete":
                j(e) || (a.push(r.get(Ft)), Wt(e) && a.push(r.get(xn)));
                break;
            case "set":
                Wt(e) && a.push(r.get(Ft));
                break;
        }
    if (a.length === 1) a[0] && kn(a[0]);
    else {
        const c = [];
        for (const u of a) u && c.push(...u);
        kn(Nn(c));
    }
}
function kn(e, t) {
    const s = j(e) ? e : [...e];
    for (const n of s) n.computed && vo(n);
    for (const n of s) n.computed || vo(n);
}
function vo(e, t) {
    (e !== Ze || e.allowRecurse) && (e.scheduler ? e.scheduler() : e.run());
}
const Zr = Dn("__proto__,__v_isRef,__isVue"),
    Mi = new Set(
        Object.getOwnPropertyNames(Symbol)
            .filter((e) => e !== "arguments" && e !== "caller")
            .map((e) => Symbol[e])
            .filter(ls)
    ),
    Gr = jn(),
    Jr = jn(!1, !0),
    Qr = jn(!0),
    bo = ea();
function ea() {
    const e = {};
    return (
        ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
            e[t] = function (...s) {
                const n = Q(this);
                for (let i = 0, r = this.length; i < r; i++) He(n, "get", i + "");
                const o = n[t](...s);
                return o === -1 || o === !1 ? n[t](...s.map(Q)) : o;
            };
        }),
        ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
            e[t] = function (...s) {
                Qt();
                const n = Q(this)[t].apply(this, s);
                return es(), n;
            };
        }),
        e
    );
}
function ta(e) {
    const t = Q(this);
    return He(t, "has", e), t.hasOwnProperty(e);
}
function jn(e = !1, t = !1) {
    return function (n, o, i) {
        if (o === "__v_isReactive") return !e;
        if (o === "__v_isReadonly") return e;
        if (o === "__v_isShallow") return t;
        if (o === "__v_raw" && i === (e ? (t ? _a : Si) : t ? Ii : Ei).get(n)) return n;
        const r = j(n);
        if (!e) {
            if (r && G(bo, o)) return Reflect.get(bo, o, i);
            if (o === "hasOwnProperty") return ta;
        }
        const a = Reflect.get(n, o, i);
        return (ls(o) ? Mi.has(o) : Zr(o)) || (e || He(n, "get", o), t) ? a : Te(a) ? (r && Bn(o) ? a : a.value) : le(a) ? (e ? Ti(a) : bs(a)) : a;
    };
}
const sa = xi(),
    na = xi(!0);
function xi(e = !1) {
    return function (s, n, o, i) {
        let r = s[n];
        if (Vt(r) && Te(r) && !Te(o)) return !1;
        if (!e && (!Ds(o) && !Vt(o) && ((r = Q(r)), (o = Q(o))), !j(s) && Te(r) && !Te(o))) return (r.value = o), !0;
        const a = j(s) && Bn(n) ? Number(n) < s.length : G(s, n),
            c = Reflect.set(s, n, o, i);
        return s === Q(i) && (a ? fs(o, r) && pt(s, "set", n, o) : pt(s, "add", n, o)), c;
    };
}
function oa(e, t) {
    const s = G(e, t);
    e[t];
    const n = Reflect.deleteProperty(e, t);
    return n && s && pt(e, "delete", t, void 0), n;
}
function ia(e, t) {
    const s = Reflect.has(e, t);
    return (!ls(t) || !Mi.has(t)) && He(e, "has", t), s;
}
function ra(e) {
    return He(e, "iterate", j(e) ? "length" : Ft), Reflect.ownKeys(e);
}
const ki = { get: Gr, set: sa, deleteProperty: oa, has: ia, ownKeys: ra },
    aa = {
        get: Qr,
        set(e, t) {
            return !0;
        },
        deleteProperty(e, t) {
            return !0;
        },
    },
    ca = xe({}, ki, { get: Jr, set: na }),
    Yn = (e) => e,
    Zs = (e) => Reflect.getPrototypeOf(e);
function ks(e, t, s = !1, n = !1) {
    e = e.__v_raw;
    const o = Q(e),
        i = Q(t);
    s || (t !== i && He(o, "get", t), He(o, "get", i));
    const { has: r } = Zs(o),
        a = n ? Yn : s ? zn : ds;
    if (r.call(o, t)) return a(e.get(t));
    if (r.call(o, i)) return a(e.get(i));
    e !== o && e.get(t);
}
function Es(e, t = !1) {
    const s = this.__v_raw,
        n = Q(s),
        o = Q(e);
    return t || (e !== o && He(n, "has", e), He(n, "has", o)), e === o ? s.has(e) : s.has(e) || s.has(o);
}
function Is(e, t = !1) {
    return (e = e.__v_raw), !t && He(Q(e), "iterate", Ft), Reflect.get(e, "size", e);
}
function wo(e) {
    e = Q(e);
    const t = Q(this);
    return Zs(t).has.call(t, e) || (t.add(e), pt(t, "add", e, e)), this;
}
function Mo(e, t) {
    t = Q(t);
    const s = Q(this),
        { has: n, get: o } = Zs(s);
    let i = n.call(s, e);
    i || ((e = Q(e)), (i = n.call(s, e)));
    const r = o.call(s, e);
    return s.set(e, t), i ? fs(t, r) && pt(s, "set", e, t) : pt(s, "add", e, t), this;
}
function xo(e) {
    const t = Q(this),
        { has: s, get: n } = Zs(t);
    let o = s.call(t, e);
    o || ((e = Q(e)), (o = s.call(t, e))), n && n.call(t, e);
    const i = t.delete(e);
    return o && pt(t, "delete", e, void 0), i;
}
function ko() {
    const e = Q(this),
        t = e.size !== 0,
        s = e.clear();
    return t && pt(e, "clear", void 0, void 0), s;
}
function Ss(e, t) {
    return function (n, o) {
        const i = this,
            r = i.__v_raw,
            a = Q(r),
            c = t ? Yn : e ? zn : ds;
        return !e && He(a, "iterate", Ft), r.forEach((u, p) => n.call(o, c(u), c(p), i));
    };
}
function Ts(e, t, s) {
    return function (...n) {
        const o = this.__v_raw,
            i = Q(o),
            r = Wt(i),
            a = e === "entries" || (e === Symbol.iterator && r),
            c = e === "keys" && r,
            u = o[e](...n),
            p = s ? Yn : t ? zn : ds;
        return (
            !t && He(i, "iterate", c ? xn : Ft),
            {
                next() {
                    const { value: g, done: S } = u.next();
                    return S ? { value: g, done: S } : { value: a ? [p(g[0]), p(g[1])] : p(g), done: S };
                },
                [Symbol.iterator]() {
                    return this;
                },
            }
        );
    };
}
function mt(e) {
    return function (...t) {
        return e === "delete" ? !1 : this;
    };
}
function ua() {
    const e = {
            get(i) {
                return ks(this, i);
            },
            get size() {
                return Is(this);
            },
            has: Es,
            add: wo,
            set: Mo,
            delete: xo,
            clear: ko,
            forEach: Ss(!1, !1),
        },
        t = {
            get(i) {
                return ks(this, i, !1, !0);
            },
            get size() {
                return Is(this);
            },
            has: Es,
            add: wo,
            set: Mo,
            delete: xo,
            clear: ko,
            forEach: Ss(!1, !0),
        },
        s = {
            get(i) {
                return ks(this, i, !0);
            },
            get size() {
                return Is(this, !0);
            },
            has(i) {
                return Es.call(this, i, !0);
            },
            add: mt("add"),
            set: mt("set"),
            delete: mt("delete"),
            clear: mt("clear"),
            forEach: Ss(!0, !1),
        },
        n = {
            get(i) {
                return ks(this, i, !0, !0);
            },
            get size() {
                return Is(this, !0);
            },
            has(i) {
                return Es.call(this, i, !0);
            },
            add: mt("add"),
            set: mt("set"),
            delete: mt("delete"),
            clear: mt("clear"),
            forEach: Ss(!0, !0),
        };
    return (
        ["keys", "values", "entries", Symbol.iterator].forEach((i) => {
            (e[i] = Ts(i, !1, !1)), (s[i] = Ts(i, !0, !1)), (t[i] = Ts(i, !1, !0)), (n[i] = Ts(i, !0, !0));
        }),
        [e, s, t, n]
    );
}
const [la, fa, da, pa] = ua();
function Xn(e, t) {
    const s = t ? (e ? pa : da) : e ? fa : la;
    return (n, o, i) => (o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? n : Reflect.get(G(s, o) && o in n ? s : n, o, i));
}
const ha = { get: Xn(!1, !1) },
    ma = { get: Xn(!1, !0) },
    ga = { get: Xn(!0, !1) },
    Ei = new WeakMap(),
    Ii = new WeakMap(),
    Si = new WeakMap(),
    _a = new WeakMap();
function ya(e) {
    switch (e) {
        case "Object":
        case "Array":
            return 1;
        case "Map":
        case "Set":
        case "WeakMap":
        case "WeakSet":
            return 2;
        default:
            return 0;
    }
}
function va(e) {
    return e.__v_skip || !Object.isExtensible(e) ? 0 : ya(Ar(e));
}
function bs(e) {
    return Vt(e) ? e : Wn(e, !1, ki, ha, Ei);
}
function En(e) {
    return Wn(e, !1, ca, ma, Ii);
}
function Ti(e) {
    return Wn(e, !0, aa, ga, Si);
}
function Wn(e, t, s, n, o) {
    if (!le(e) || (e.__v_raw && !(t && e.__v_isReactive))) return e;
    const i = o.get(e);
    if (i) return i;
    const r = va(e);
    if (r === 0) return e;
    const a = new Proxy(e, r === 2 ? n : s);
    return o.set(e, a), a;
}
function qt(e) {
    return Vt(e) ? qt(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Vt(e) {
    return !!(e && e.__v_isReadonly);
}
function Ds(e) {
    return !!(e && e.__v_isShallow);
}
function Oi(e) {
    return qt(e) || Vt(e);
}
function Q(e) {
    const t = e && e.__v_raw;
    return t ? Q(t) : e;
}
function qn(e) {
    return Rs(e, "__v_skip", !0), e;
}
const ds = (e) => (le(e) ? bs(e) : e),
    zn = (e) => (le(e) ? Ti(e) : e);
function $i(e) {
    yt && Ze && ((e = Q(e)), wi(e.dep || (e.dep = Nn())));
}
function Ui(e, t) {
    e = Q(e);
    const s = e.dep;
    s && kn(s);
}
function Te(e) {
    return !!(e && e.__v_isRef === !0);
}
function D(e) {
    return Pi(e, !1);
}
function Ct(e) {
    return Pi(e, !0);
}
function Pi(e, t) {
    return Te(e) ? e : new ba(e, t);
}
class ba {
    constructor(t, s) {
        (this.__v_isShallow = s), (this.dep = void 0), (this.__v_isRef = !0), (this._rawValue = s ? t : Q(t)), (this._value = s ? t : ds(t));
    }
    get value() {
        return $i(this), this._value;
    }
    set value(t) {
        const s = this.__v_isShallow || Ds(t) || Vt(t);
        (t = s ? t : Q(t)), fs(t, this._rawValue) && ((this._rawValue = t), (this._value = s ? t : ds(t)), Ui(this));
    }
}
function x(e) {
    return Te(e) ? e.value : e;
}
const wa = {
    get: (e, t, s) => x(Reflect.get(e, t, s)),
    set: (e, t, s, n) => {
        const o = e[t];
        return Te(o) && !Te(s) ? ((o.value = s), !0) : Reflect.set(e, t, s, n);
    },
};
function Ci(e) {
    return qt(e) ? e : new Proxy(e, wa);
}
class Ma {
    constructor(t, s, n, o) {
        (this._setter = s),
            (this.dep = void 0),
            (this.__v_isRef = !0),
            (this.__v_isReadonly = !1),
            (this._dirty = !0),
            (this.effect = new Hn(t, () => {
                this._dirty || ((this._dirty = !0), Ui(this));
            })),
            (this.effect.computed = this),
            (this.effect.active = this._cacheable = !o),
            (this.__v_isReadonly = n);
    }
    get value() {
        const t = Q(this);
        return $i(t), (t._dirty || !t._cacheable) && ((t._dirty = !1), (t._value = t.effect.run())), t._value;
    }
    set value(t) {
        this._setter(t);
    }
}
function xa(e, t, s = !1) {
    let n, o;
    const i = K(e);
    return i ? ((n = e), (o = Qe)) : ((n = e.get), (o = e.set)), new Ma(n, o, i || !o, s);
}
function vt(e, t, s, n) {
    let o;
    try {
        o = n ? e(...n) : e();
    } catch (i) {
        Gs(i, t, s);
    }
    return o;
}
function et(e, t, s, n) {
    if (K(e)) {
        const i = vt(e, t, s, n);
        return (
            i &&
                di(i) &&
                i.catch((r) => {
                    Gs(r, t, s);
                }),
            i
        );
    }
    const o = [];
    for (let i = 0; i < e.length; i++) o.push(et(e[i], t, s, n));
    return o;
}
function Gs(e, t, s, n = !0) {
    const o = t ? t.vnode : null;
    if (t) {
        let i = t.parent;
        const r = t.proxy,
            a = s;
        for (; i; ) {
            const u = i.ec;
            if (u) {
                for (let p = 0; p < u.length; p++) if (u[p](e, r, a) === !1) return;
            }
            i = i.parent;
        }
        const c = t.appContext.config.errorHandler;
        if (c) {
            vt(c, null, 10, [e, r, a]);
            return;
        }
    }
    ka(e, s, o, n);
}
function ka(e, t, s, n = !0) {
    console.error(e);
}
let ps = !1,
    In = !1;
const Se = [];
let rt = 0;
const zt = [];
let ft = null,
    $t = 0;
const Ai = Promise.resolve();
let Kn = null;
function Ea(e) {
    const t = Kn || Ai;
    return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ia(e) {
    let t = rt + 1,
        s = Se.length;
    for (; t < s; ) {
        const n = (t + s) >>> 1;
        hs(Se[n]) < e ? (t = n + 1) : (s = n);
    }
    return t;
}
function Vn(e) {
    (!Se.length || !Se.includes(e, ps && e.allowRecurse ? rt + 1 : rt)) && (e.id == null ? Se.push(e) : Se.splice(Ia(e.id), 0, e), Ri());
}
function Ri() {
    !ps && !In && ((In = !0), (Kn = Ai.then(Li)));
}
function Sa(e) {
    const t = Se.indexOf(e);
    t > rt && Se.splice(t, 1);
}
function Ta(e) {
    j(e) ? zt.push(...e) : (!ft || !ft.includes(e, e.allowRecurse ? $t + 1 : $t)) && zt.push(e), Ri();
}
function Eo(e, t = ps ? rt + 1 : 0) {
    for (; t < Se.length; t++) {
        const s = Se[t];
        s && s.pre && (Se.splice(t, 1), t--, s());
    }
}
function Di(e) {
    if (zt.length) {
        const t = [...new Set(zt)];
        if (((zt.length = 0), ft)) {
            ft.push(...t);
            return;
        }
        for (ft = t, ft.sort((s, n) => hs(s) - hs(n)), $t = 0; $t < ft.length; $t++) ft[$t]();
        (ft = null), ($t = 0);
    }
}
const hs = (e) => (e.id == null ? 1 / 0 : e.id),
    Oa = (e, t) => {
        const s = hs(e) - hs(t);
        if (s === 0) {
            if (e.pre && !t.pre) return -1;
            if (t.pre && !e.pre) return 1;
        }
        return s;
    };
function Li(e) {
    (In = !1), (ps = !0), Se.sort(Oa);
    const t = Qe;
    try {
        for (rt = 0; rt < Se.length; rt++) {
            const s = Se[rt];
            s && s.active !== !1 && vt(s, null, 14);
        }
    } finally {
        (rt = 0), (Se.length = 0), Di(), (ps = !1), (Kn = null), (Se.length || zt.length) && Li();
    }
}
function $a(e, t, ...s) {
    if (e.isUnmounted) return;
    const n = e.vnode.props || ue;
    let o = s;
    const i = t.startsWith("update:"),
        r = i && t.slice(7);
    if (r && r in n) {
        const p = `${r === "modelValue" ? "model" : r}Modifiers`,
            { number: g, trim: S } = n[p] || ue;
        S && (o = s.map((L) => (_e(L) ? L.trim() : L))), g && (o = s.map(vn));
    }
    let a,
        c = n[(a = ln(t))] || n[(a = ln(ct(t)))];
    !c && i && (c = n[(a = ln(Jt(t)))]), c && et(c, e, 6, o);
    const u = n[a + "Once"];
    if (u) {
        if (!e.emitted) e.emitted = {};
        else if (e.emitted[a]) return;
        (e.emitted[a] = !0), et(u, e, 6, o);
    }
}
function Fi(e, t, s = !1) {
    const n = t.emitsCache,
        o = n.get(e);
    if (o !== void 0) return o;
    const i = e.emits;
    let r = {},
        a = !1;
    if (!K(e)) {
        const c = (u) => {
            const p = Fi(u, t, !0);
            p && ((a = !0), xe(r, p));
        };
        !s && t.mixins.length && t.mixins.forEach(c), e.extends && c(e.extends), e.mixins && e.mixins.forEach(c);
    }
    return !i && !a ? (le(e) && n.set(e, null), null) : (j(i) ? i.forEach((c) => (r[c] = null)) : xe(r, i), le(e) && n.set(e, r), r);
}
function Js(e, t) {
    return !e || !Ws(t) ? !1 : ((t = t.slice(2).replace(/Once$/, "")), G(e, t[0].toLowerCase() + t.slice(1)) || G(e, Jt(t)) || G(e, t));
}
let Oe = null,
    Qs = null;
function Ls(e) {
    const t = Oe;
    return (Oe = e), (Qs = (e && e.type.__scopeId) || null), t;
}
function Pe(e) {
    Qs = e;
}
function Ce() {
    Qs = null;
}
function de(e, t = Oe, s) {
    if (!t || e._n) return e;
    const n = (...o) => {
        n._d && Do(-1);
        const i = Ls(t);
        let r;
        try {
            r = e(...o);
        } finally {
            Ls(i), n._d && Do(1);
        }
        return r;
    };
    return (n._n = !0), (n._c = !0), (n._d = !0), n;
}
function fn(e) {
    const {
        type: t,
        vnode: s,
        proxy: n,
        withProxy: o,
        props: i,
        propsOptions: [r],
        slots: a,
        attrs: c,
        emit: u,
        render: p,
        renderCache: g,
        data: S,
        setupState: L,
        ctx: A,
        inheritAttrs: U,
    } = e;
    let W, se;
    const te = Ls(e);
    try {
        if (s.shapeFlag & 4) {
            const H = o || n;
            (W = it(p.call(H, H, g, i, L, S, A))), (se = c);
        } else {
            const H = t;
            (W = it(H.length > 1 ? H(i, { attrs: c, slots: a, emit: u }) : H(i, null))), (se = t.props ? c : Ua(c));
        }
    } catch (H) {
        (us.length = 0), Gs(H, e, 1), (W = pe(wt));
    }
    let re = W;
    if (se && U !== !1) {
        const H = Object.keys(se),
            { shapeFlag: Ye } = re;
        H.length && Ye & 7 && (r && H.some(Ln) && (se = Pa(se, r)), (re = Zt(re, se)));
    }
    return s.dirs && ((re = Zt(re)), (re.dirs = re.dirs ? re.dirs.concat(s.dirs) : s.dirs)), s.transition && (re.transition = s.transition), (W = re), Ls(te), W;
}
const Ua = (e) => {
        let t;
        for (const s in e) (s === "class" || s === "style" || Ws(s)) && ((t || (t = {}))[s] = e[s]);
        return t;
    },
    Pa = (e, t) => {
        const s = {};
        for (const n in e) (!Ln(n) || !(n.slice(9) in t)) && (s[n] = e[n]);
        return s;
    };
function Ca(e, t, s) {
    const { props: n, children: o, component: i } = e,
        { props: r, children: a, patchFlag: c } = t,
        u = i.emitsOptions;
    if (t.dirs || t.transition) return !0;
    if (s && c >= 0) {
        if (c & 1024) return !0;
        if (c & 16) return n ? Io(n, r, u) : !!r;
        if (c & 8) {
            const p = t.dynamicProps;
            for (let g = 0; g < p.length; g++) {
                const S = p[g];
                if (r[S] !== n[S] && !Js(u, S)) return !0;
            }
        }
    } else return (o || a) && (!a || !a.$stable) ? !0 : n === r ? !1 : n ? (r ? Io(n, r, u) : !0) : !!r;
    return !1;
}
function Io(e, t, s) {
    const n = Object.keys(t);
    if (n.length !== Object.keys(e).length) return !0;
    for (let o = 0; o < n.length; o++) {
        const i = n[o];
        if (t[i] !== e[i] && !Js(s, i)) return !0;
    }
    return !1;
}
function Aa({ vnode: e, parent: t }, s) {
    for (; t && t.subTree === e; ) ((e = t.vnode).el = s), (t = t.parent);
}
const Ra = (e) => e.__isSuspense;
function Da(e, t) {
    t && t.pendingBranch ? (j(e) ? t.effects.push(...e) : t.effects.push(e)) : Ta(e);
}
const Os = {};
function Ps(e, t, s) {
    return Bi(e, t, s);
}
function Bi(e, t, { immediate: s, deep: n, flush: o, onTrack: i, onTrigger: r } = ue) {
    var a;
    const c = zr() === ((a = Ee) == null ? void 0 : a.scope) ? Ee : null;
    let u,
        p = !1,
        g = !1;
    if (
        (Te(e)
            ? ((u = () => e.value), (p = Ds(e)))
            : qt(e)
            ? ((u = () => e), (n = !0))
            : j(e)
            ? ((g = !0),
              (p = e.some((H) => qt(H) || Ds(H))),
              (u = () =>
                  e.map((H) => {
                      if (Te(H)) return H.value;
                      if (qt(H)) return At(H);
                      if (K(H)) return vt(H, c, 2);
                  })))
            : K(e)
            ? t
                ? (u = () => vt(e, c, 2))
                : (u = () => {
                      if (!(c && c.isUnmounted)) return S && S(), et(e, c, 3, [L]);
                  })
            : (u = Qe),
        t && n)
    ) {
        const H = u;
        u = () => At(H());
    }
    let S,
        L = (H) => {
            S = te.onStop = () => {
                vt(H, c, 4);
            };
        },
        A;
    if (gs)
        if (((L = Qe), t ? s && et(t, c, 3, [u(), g ? [] : void 0, L]) : u(), o === "sync")) {
            const H = Sc();
            A = H.__watcherHandles || (H.__watcherHandles = []);
        } else return Qe;
    let U = g ? new Array(e.length).fill(Os) : Os;
    const W = () => {
        if (!!te.active)
            if (t) {
                const H = te.run();
                (n || p || (g ? H.some((Ye, Fe) => fs(Ye, U[Fe])) : fs(H, U))) && (S && S(), et(t, c, 3, [H, U === Os ? void 0 : g && U[0] === Os ? [] : U, L]), (U = H));
            } else te.run();
    };
    W.allowRecurse = !!t;
    let se;
    o === "sync" ? (se = W) : o === "post" ? (se = () => Be(W, c && c.suspense)) : ((W.pre = !0), c && (W.id = c.uid), (se = () => Vn(W)));
    const te = new Hn(u, se);
    t ? (s ? W() : (U = te.run())) : o === "post" ? Be(te.run.bind(te), c && c.suspense) : te.run();
    const re = () => {
        te.stop(), c && c.scope && Fn(c.scope.effects, te);
    };
    return A && A.push(re), re;
}
function La(e, t, s) {
    const n = this.proxy,
        o = _e(e) ? (e.includes(".") ? Ni(n, e) : () => n[e]) : e.bind(n, n);
    let i;
    K(t) ? (i = t) : ((i = t.handler), (s = t));
    const r = Ee;
    Gt(this);
    const a = Bi(o, i.bind(n), s);
    return r ? Gt(r) : Bt(), a;
}
function Ni(e, t) {
    const s = t.split(".");
    return () => {
        let n = e;
        for (let o = 0; o < s.length && n; o++) n = n[s[o]];
        return n;
    };
}
function At(e, t) {
    if (!le(e) || e.__v_skip || ((t = t || new Set()), t.has(e))) return e;
    if ((t.add(e), Te(e))) At(e.value, t);
    else if (j(e)) for (let s = 0; s < e.length; s++) At(e[s], t);
    else if (qs(e) || Wt(e))
        e.forEach((s) => {
            At(s, t);
        });
    else if (hi(e)) for (const s in e) At(e[s], t);
    return e;
}
function Hi(e, t) {
    const s = Oe;
    if (s === null) return e;
    const n = nn(s) || s.proxy,
        o = e.dirs || (e.dirs = []);
    for (let i = 0; i < t.length; i++) {
        let [r, a, c, u = ue] = t[i];
        r && (K(r) && (r = { mounted: r, updated: r }), r.deep && At(a), o.push({ dir: r, instance: n, value: a, oldValue: void 0, arg: c, modifiers: u }));
    }
    return e;
}
function St(e, t, s, n) {
    const o = e.dirs,
        i = t && t.dirs;
    for (let r = 0; r < o.length; r++) {
        const a = o[r];
        i && (a.oldValue = i[r].value);
        let c = a.dir[n];
        c && (Qt(), et(c, s, 8, [e.el, a, e, t]), es());
    }
}
function ee(e, t) {
    return K(e) ? (() => xe({ name: e.name }, t, { setup: e }))() : e;
}
const as = (e) => !!e.type.__asyncLoader,
    ji = (e) => e.type.__isKeepAlive;
function Fa(e, t) {
    Yi(e, "a", t);
}
function Ba(e, t) {
    Yi(e, "da", t);
}
function Yi(e, t, s = Ee) {
    const n =
        e.__wdc ||
        (e.__wdc = () => {
            let o = s;
            for (; o; ) {
                if (o.isDeactivated) return;
                o = o.parent;
            }
            return e();
        });
    if ((en(t, n, s), s)) {
        let o = s.parent;
        for (; o && o.parent; ) ji(o.parent.vnode) && Na(n, t, s, o), (o = o.parent);
    }
}
function Na(e, t, s, n) {
    const o = en(t, e, n, !0);
    qi(() => {
        Fn(n[t], o);
    }, s);
}
function en(e, t, s = Ee, n = !1) {
    if (s) {
        const o = s[e] || (s[e] = []),
            i =
                t.__weh ||
                (t.__weh = (...r) => {
                    if (s.isUnmounted) return;
                    Qt(), Gt(s);
                    const a = et(t, s, e, r);
                    return Bt(), es(), a;
                });
        return n ? o.unshift(i) : o.push(i), i;
    }
}
const ht = (e) => (t, s = Ee) => (!gs || e === "sp") && en(e, (...n) => t(...n), s),
    Ha = ht("bm"),
    Xi = ht("m"),
    ja = ht("bu"),
    Ya = ht("u"),
    Wi = ht("bum"),
    qi = ht("um"),
    Xa = ht("sp"),
    Wa = ht("rtg"),
    qa = ht("rtc");
function za(e, t = Ee) {
    en("ec", e, t);
}
const zi = "components",
    Ki = Symbol.for("v-ndc");
function Ka(e) {
    return _e(e) ? Va(zi, e, !1) || e : e || Ki;
}
function Va(e, t, s = !0, n = !1) {
    const o = Oe || Ee;
    if (o) {
        const i = o.type;
        if (e === zi) {
            const a = kc(i, !1);
            if (a && (a === t || a === ct(t) || a === Ks(ct(t)))) return i;
        }
        const r = So(o[e] || i[e], t) || So(o.appContext[e], t);
        return !r && n ? i : r;
    }
}
function So(e, t) {
    return e && (e[t] || e[ct(t)] || e[Ks(ct(t))]);
}
function ve(e, t, s, n) {
    let o;
    const i = s && s[n];
    if (j(e) || _e(e)) {
        o = new Array(e.length);
        for (let r = 0, a = e.length; r < a; r++) o[r] = t(e[r], r, void 0, i && i[r]);
    } else if (typeof e == "number") {
        o = new Array(e);
        for (let r = 0; r < e; r++) o[r] = t(r + 1, r, void 0, i && i[r]);
    } else if (le(e))
        if (e[Symbol.iterator]) o = Array.from(e, (r, a) => t(r, a, void 0, i && i[a]));
        else {
            const r = Object.keys(e);
            o = new Array(r.length);
            for (let a = 0, c = r.length; a < c; a++) {
                const u = r[a];
                o[a] = t(e[u], u, a, i && i[a]);
            }
        }
    else o = [];
    return s && (s[n] = o), o;
}
function _t(e, t, s = {}, n, o) {
    if (Oe.isCE || (Oe.parent && as(Oe.parent) && Oe.parent.isCE)) return t !== "default" && (s.name = t), pe("slot", s, n && n());
    let i = e[t];
    i && i._c && (i._d = !1), m();
    const r = i && Vi(i(s)),
        a = fe(Y, { key: s.key || (r && r.key) || `_${t}` }, r || (n ? n() : []), r && e._ === 1 ? 64 : -2);
    return !o && a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a;
}
function Vi(e) {
    return e.some((t) => (ir(t) ? !(t.type === wt || (t.type === Y && !Vi(t.children))) : !0)) ? e : null;
}
const Sn = (e) => (e ? (cr(e) ? nn(e) || e.proxy : Sn(e.parent)) : null),
    cs = xe(Object.create(null), {
        $: (e) => e,
        $el: (e) => e.vnode.el,
        $data: (e) => e.data,
        $props: (e) => e.props,
        $attrs: (e) => e.attrs,
        $slots: (e) => e.slots,
        $refs: (e) => e.refs,
        $parent: (e) => Sn(e.parent),
        $root: (e) => Sn(e.root),
        $emit: (e) => e.emit,
        $options: (e) => Zn(e),
        $forceUpdate: (e) => e.f || (e.f = () => Vn(e.update)),
        $nextTick: (e) => e.n || (e.n = Ea.bind(e.proxy)),
        $watch: (e) => La.bind(e),
    }),
    dn = (e, t) => e !== ue && !e.__isScriptSetup && G(e, t),
    Za = {
        get({ _: e }, t) {
            const { ctx: s, setupState: n, data: o, props: i, accessCache: r, type: a, appContext: c } = e;
            let u;
            if (t[0] !== "$") {
                const L = r[t];
                if (L !== void 0)
                    switch (L) {
                        case 1:
                            return n[t];
                        case 2:
                            return o[t];
                        case 4:
                            return s[t];
                        case 3:
                            return i[t];
                    }
                else {
                    if (dn(n, t)) return (r[t] = 1), n[t];
                    if (o !== ue && G(o, t)) return (r[t] = 2), o[t];
                    if ((u = e.propsOptions[0]) && G(u, t)) return (r[t] = 3), i[t];
                    if (s !== ue && G(s, t)) return (r[t] = 4), s[t];
                    Tn && (r[t] = 0);
                }
            }
            const p = cs[t];
            let g, S;
            if (p) return t === "$attrs" && He(e, "get", t), p(e);
            if ((g = a.__cssModules) && (g = g[t])) return g;
            if (s !== ue && G(s, t)) return (r[t] = 4), s[t];
            if (((S = c.config.globalProperties), G(S, t))) return S[t];
        },
        set({ _: e }, t, s) {
            const { data: n, setupState: o, ctx: i } = e;
            return dn(o, t) ? ((o[t] = s), !0) : n !== ue && G(n, t) ? ((n[t] = s), !0) : G(e.props, t) || (t[0] === "$" && t.slice(1) in e) ? !1 : ((i[t] = s), !0);
        },
        has({ _: { data: e, setupState: t, accessCache: s, ctx: n, appContext: o, propsOptions: i } }, r) {
            let a;
            return !!s[r] || (e !== ue && G(e, r)) || dn(t, r) || ((a = i[0]) && G(a, r)) || G(n, r) || G(cs, r) || G(o.config.globalProperties, r);
        },
        defineProperty(e, t, s) {
            return s.get != null ? (e._.accessCache[t] = 0) : G(s, "value") && this.set(e, t, s.value, null), Reflect.defineProperty(e, t, s);
        },
    };
function To(e) {
    return j(e) ? e.reduce((t, s) => ((t[s] = null), t), {}) : e;
}
let Tn = !0;
function Ga(e) {
    const t = Zn(e),
        s = e.proxy,
        n = e.ctx;
    (Tn = !1), t.beforeCreate && Oo(t.beforeCreate, e, "bc");
    const {
        data: o,
        computed: i,
        methods: r,
        watch: a,
        provide: c,
        inject: u,
        created: p,
        beforeMount: g,
        mounted: S,
        beforeUpdate: L,
        updated: A,
        activated: U,
        deactivated: W,
        beforeDestroy: se,
        beforeUnmount: te,
        destroyed: re,
        unmounted: H,
        render: Ye,
        renderTracked: Fe,
        renderTriggered: tt,
        errorCaptured: M,
        serverPrefetch: z,
        expose: O,
        inheritAttrs: q,
        components: Ie,
        directives: ws,
        filters: an,
    } = t;
    if ((u && Ja(u, n, null), r))
        for (const he in r) {
            const ae = r[he];
            K(ae) && (n[he] = ae.bind(s));
        }
    if (o) {
        const he = o.call(s, s);
        le(he) && (e.data = bs(he));
    }
    if (((Tn = !0), i))
        for (const he in i) {
            const ae = i[he],
                Et = K(ae) ? ae.bind(s, s) : K(ae.get) ? ae.get.bind(s, s) : Qe,
                Ms = !K(ae) && K(ae.set) ? ae.set.bind(s) : Qe,
                It = we({ get: Et, set: Ms });
            Object.defineProperty(n, he, { enumerable: !0, configurable: !0, get: () => It.value, set: (st) => (It.value = st) });
        }
    if (a) for (const he in a) Zi(a[he], n, s, he);
    if (c) {
        const he = K(c) ? c.call(s) : c;
        Reflect.ownKeys(he).forEach((ae) => {
            oc(ae, he[ae]);
        });
    }
    p && Oo(p, e, "c");
    function Re(he, ae) {
        j(ae) ? ae.forEach((Et) => he(Et.bind(s))) : ae && he(ae.bind(s));
    }
    if ((Re(Ha, g), Re(Xi, S), Re(ja, L), Re(Ya, A), Re(Fa, U), Re(Ba, W), Re(za, M), Re(qa, Fe), Re(Wa, tt), Re(Wi, te), Re(qi, H), Re(Xa, z), j(O)))
        if (O.length) {
            const he = e.exposed || (e.exposed = {});
            O.forEach((ae) => {
                Object.defineProperty(he, ae, { get: () => s[ae], set: (Et) => (s[ae] = Et) });
            });
        } else e.exposed || (e.exposed = {});
    Ye && e.render === Qe && (e.render = Ye), q != null && (e.inheritAttrs = q), Ie && (e.components = Ie), ws && (e.directives = ws);
}
function Ja(e, t, s = Qe) {
    j(e) && (e = On(e));
    for (const n in e) {
        const o = e[n];
        let i;
        le(o) ? ("default" in o ? (i = Cs(o.from || n, o.default, !0)) : (i = Cs(o.from || n))) : (i = Cs(o)),
            Te(i) ? Object.defineProperty(t, n, { enumerable: !0, configurable: !0, get: () => i.value, set: (r) => (i.value = r) }) : (t[n] = i);
    }
}
function Oo(e, t, s) {
    et(j(e) ? e.map((n) => n.bind(t.proxy)) : e.bind(t.proxy), t, s);
}
function Zi(e, t, s, n) {
    const o = n.includes(".") ? Ni(s, n) : () => s[n];
    if (_e(e)) {
        const i = t[e];
        K(i) && Ps(o, i);
    } else if (K(e)) Ps(o, e.bind(s));
    else if (le(e))
        if (j(e)) e.forEach((i) => Zi(i, t, s, n));
        else {
            const i = K(e.handler) ? e.handler.bind(s) : t[e.handler];
            K(i) && Ps(o, i, e);
        }
}
function Zn(e) {
    const t = e.type,
        { mixins: s, extends: n } = t,
        {
            mixins: o,
            optionsCache: i,
            config: { optionMergeStrategies: r },
        } = e.appContext,
        a = i.get(t);
    let c;
    return a ? (c = a) : !o.length && !s && !n ? (c = t) : ((c = {}), o.length && o.forEach((u) => Fs(c, u, r, !0)), Fs(c, t, r)), le(t) && i.set(t, c), c;
}
function Fs(e, t, s, n = !1) {
    const { mixins: o, extends: i } = t;
    i && Fs(e, i, s, !0), o && o.forEach((r) => Fs(e, r, s, !0));
    for (const r in t)
        if (!(n && r === "expose")) {
            const a = Qa[r] || (s && s[r]);
            e[r] = a ? a(e[r], t[r]) : t[r];
        }
    return e;
}
const Qa = {
    data: $o,
    props: Uo,
    emits: Uo,
    methods: rs,
    computed: rs,
    beforeCreate: De,
    created: De,
    beforeMount: De,
    mounted: De,
    beforeUpdate: De,
    updated: De,
    beforeDestroy: De,
    beforeUnmount: De,
    destroyed: De,
    unmounted: De,
    activated: De,
    deactivated: De,
    errorCaptured: De,
    serverPrefetch: De,
    components: rs,
    directives: rs,
    watch: tc,
    provide: $o,
    inject: ec,
};
function $o(e, t) {
    return t
        ? e
            ? function () {
                  return xe(K(e) ? e.call(this, this) : e, K(t) ? t.call(this, this) : t);
              }
            : t
        : e;
}
function ec(e, t) {
    return rs(On(e), On(t));
}
function On(e) {
    if (j(e)) {
        const t = {};
        for (let s = 0; s < e.length; s++) t[e[s]] = e[s];
        return t;
    }
    return e;
}
function De(e, t) {
    return e ? [...new Set([].concat(e, t))] : t;
}
function rs(e, t) {
    return e ? xe(Object.create(null), e, t) : t;
}
function Uo(e, t) {
    return e ? (j(e) && j(t) ? [...new Set([...e, ...t])] : xe(Object.create(null), To(e), To(t != null ? t : {}))) : t;
}
function tc(e, t) {
    if (!e) return t;
    if (!t) return e;
    const s = xe(Object.create(null), e);
    for (const n in t) s[n] = De(e[n], t[n]);
    return s;
}
function Gi() {
    return {
        app: null,
        config: { isNativeTag: Ur, performance: !1, globalProperties: {}, optionMergeStrategies: {}, errorHandler: void 0, warnHandler: void 0, compilerOptions: {} },
        mixins: [],
        components: {},
        directives: {},
        provides: Object.create(null),
        optionsCache: new WeakMap(),
        propsCache: new WeakMap(),
        emitsCache: new WeakMap(),
    };
}
let sc = 0;
function nc(e, t) {
    return function (n, o = null) {
        K(n) || (n = xe({}, n)), o != null && !le(o) && (o = null);
        const i = Gi(),
            r = new Set();
        let a = !1;
        const c = (i.app = {
            _uid: sc++,
            _component: n,
            _props: o,
            _container: null,
            _context: i,
            _instance: null,
            version: Tc,
            get config() {
                return i.config;
            },
            set config(u) {},
            use(u, ...p) {
                return r.has(u) || (u && K(u.install) ? (r.add(u), u.install(c, ...p)) : K(u) && (r.add(u), u(c, ...p))), c;
            },
            mixin(u) {
                return i.mixins.includes(u) || i.mixins.push(u), c;
            },
            component(u, p) {
                return p ? ((i.components[u] = p), c) : i.components[u];
            },
            directive(u, p) {
                return p ? ((i.directives[u] = p), c) : i.directives[u];
            },
            mount(u, p, g) {
                if (!a) {
                    const S = pe(n, o);
                    return (S.appContext = i), p && t ? t(S, u) : e(S, u, g), (a = !0), (c._container = u), (u.__vue_app__ = c), nn(S.component) || S.component.proxy;
                }
            },
            unmount() {
                a && (e(null, c._container), delete c._container.__vue_app__);
            },
            provide(u, p) {
                return (i.provides[u] = p), c;
            },
            runWithContext(u) {
                Bs = c;
                try {
                    return u();
                } finally {
                    Bs = null;
                }
            },
        });
        return c;
    };
}
let Bs = null;
function oc(e, t) {
    if (Ee) {
        let s = Ee.provides;
        const n = Ee.parent && Ee.parent.provides;
        n === s && (s = Ee.provides = Object.create(n)), (s[e] = t);
    }
}
function Cs(e, t, s = !1) {
    const n = Ee || Oe;
    if (n || Bs) {
        const o = n ? (n.parent == null ? n.vnode.appContext && n.vnode.appContext.provides : n.parent.provides) : Bs._context.provides;
        if (o && e in o) return o[e];
        if (arguments.length > 1) return s && K(t) ? t.call(n && n.proxy) : t;
    }
}
function ic(e, t, s, n = !1) {
    const o = {},
        i = {};
    Rs(i, sn, 1), (e.propsDefaults = Object.create(null)), Ji(e, t, o, i);
    for (const r in e.propsOptions[0]) r in o || (o[r] = void 0);
    s ? (e.props = n ? o : En(o)) : e.type.props ? (e.props = o) : (e.props = i), (e.attrs = i);
}
function rc(e, t, s, n) {
    const {
            props: o,
            attrs: i,
            vnode: { patchFlag: r },
        } = e,
        a = Q(o),
        [c] = e.propsOptions;
    let u = !1;
    if ((n || r > 0) && !(r & 16)) {
        if (r & 8) {
            const p = e.vnode.dynamicProps;
            for (let g = 0; g < p.length; g++) {
                let S = p[g];
                if (Js(e.emitsOptions, S)) continue;
                const L = t[S];
                if (c)
                    if (G(i, S)) L !== i[S] && ((i[S] = L), (u = !0));
                    else {
                        const A = ct(S);
                        o[A] = $n(c, a, A, L, e, !1);
                    }
                else L !== i[S] && ((i[S] = L), (u = !0));
            }
        }
    } else {
        Ji(e, t, o, i) && (u = !0);
        let p;
        for (const g in a) (!t || (!G(t, g) && ((p = Jt(g)) === g || !G(t, p)))) && (c ? s && (s[g] !== void 0 || s[p] !== void 0) && (o[g] = $n(c, a, g, void 0, e, !0)) : delete o[g]);
        if (i !== a) for (const g in i) (!t || (!G(t, g) && !0)) && (delete i[g], (u = !0));
    }
    u && pt(e, "set", "$attrs");
}
function Ji(e, t, s, n) {
    const [o, i] = e.propsOptions;
    let r = !1,
        a;
    if (t)
        for (let c in t) {
            if ($s(c)) continue;
            const u = t[c];
            let p;
            o && G(o, (p = ct(c))) ? (!i || !i.includes(p) ? (s[p] = u) : ((a || (a = {}))[p] = u)) : Js(e.emitsOptions, c) || ((!(c in n) || u !== n[c]) && ((n[c] = u), (r = !0)));
        }
    if (i) {
        const c = Q(s),
            u = a || ue;
        for (let p = 0; p < i.length; p++) {
            const g = i[p];
            s[g] = $n(o, c, g, u[g], e, !G(u, g));
        }
    }
    return r;
}
function $n(e, t, s, n, o, i) {
    const r = e[s];
    if (r != null) {
        const a = G(r, "default");
        if (a && n === void 0) {
            const c = r.default;
            if (r.type !== Function && !r.skipFactory && K(c)) {
                const { propsDefaults: u } = o;
                s in u ? (n = u[s]) : (Gt(o), (n = u[s] = c.call(null, t)), Bt());
            } else n = c;
        }
        r[0] && (i && !a ? (n = !1) : r[1] && (n === "" || n === Jt(s)) && (n = !0));
    }
    return n;
}
function Qi(e, t, s = !1) {
    const n = t.propsCache,
        o = n.get(e);
    if (o) return o;
    const i = e.props,
        r = {},
        a = [];
    let c = !1;
    if (!K(e)) {
        const p = (g) => {
            c = !0;
            const [S, L] = Qi(g, t, !0);
            xe(r, S), L && a.push(...L);
        };
        !s && t.mixins.length && t.mixins.forEach(p), e.extends && p(e.extends), e.mixins && e.mixins.forEach(p);
    }
    if (!i && !c) return le(e) && n.set(e, Xt), Xt;
    if (j(i))
        for (let p = 0; p < i.length; p++) {
            const g = ct(i[p]);
            Po(g) && (r[g] = ue);
        }
    else if (i)
        for (const p in i) {
            const g = ct(p);
            if (Po(g)) {
                const S = i[p],
                    L = (r[g] = j(S) || K(S) ? { type: S } : xe({}, S));
                if (L) {
                    const A = Ro(Boolean, L.type),
                        U = Ro(String, L.type);
                    (L[0] = A > -1), (L[1] = U < 0 || A < U), (A > -1 || G(L, "default")) && a.push(g);
                }
            }
        }
    const u = [r, a];
    return le(e) && n.set(e, u), u;
}
function Po(e) {
    return e[0] !== "$";
}
function Co(e) {
    const t = e && e.toString().match(/^\s*(function|class) (\w+)/);
    return t ? t[2] : e === null ? "null" : "";
}
function Ao(e, t) {
    return Co(e) === Co(t);
}
function Ro(e, t) {
    return j(t) ? t.findIndex((s) => Ao(s, e)) : K(t) && Ao(t, e) ? 0 : -1;
}
const er = (e) => e[0] === "_" || e === "$stable",
    Gn = (e) => (j(e) ? e.map(it) : [it(e)]),
    ac = (e, t, s) => {
        if (t._n) return t;
        const n = de((...o) => Gn(t(...o)), s);
        return (n._c = !1), n;
    },
    tr = (e, t, s) => {
        const n = e._ctx;
        for (const o in e) {
            if (er(o)) continue;
            const i = e[o];
            if (K(i)) t[o] = ac(o, i, n);
            else if (i != null) {
                const r = Gn(i);
                t[o] = () => r;
            }
        }
    },
    sr = (e, t) => {
        const s = Gn(t);
        e.slots.default = () => s;
    },
    cc = (e, t) => {
        if (e.vnode.shapeFlag & 32) {
            const s = t._;
            s ? ((e.slots = Q(t)), Rs(t, "_", s)) : tr(t, (e.slots = {}));
        } else (e.slots = {}), t && sr(e, t);
        Rs(e.slots, sn, 1);
    },
    uc = (e, t, s) => {
        const { vnode: n, slots: o } = e;
        let i = !0,
            r = ue;
        if (n.shapeFlag & 32) {
            const a = t._;
            a ? (s && a === 1 ? (i = !1) : (xe(o, t), !s && a === 1 && delete o._)) : ((i = !t.$stable), tr(t, o)), (r = t);
        } else t && (sr(e, t), (r = { default: 1 }));
        if (i) for (const a in o) !er(a) && !(a in r) && delete o[a];
    };
function Un(e, t, s, n, o = !1) {
    if (j(e)) {
        e.forEach((S, L) => Un(S, t && (j(t) ? t[L] : t), s, n, o));
        return;
    }
    if (as(n) && !o) return;
    const i = n.shapeFlag & 4 ? nn(n.component) || n.component.proxy : n.el,
        r = o ? null : i,
        { i: a, r: c } = e,
        u = t && t.r,
        p = a.refs === ue ? (a.refs = {}) : a.refs,
        g = a.setupState;
    if ((u != null && u !== c && (_e(u) ? ((p[u] = null), G(g, u) && (g[u] = null)) : Te(u) && (u.value = null)), K(c))) vt(c, a, 12, [r, p]);
    else {
        const S = _e(c),
            L = Te(c);
        if (S || L) {
            const A = () => {
                if (e.f) {
                    const U = S ? (G(g, c) ? g[c] : p[c]) : c.value;
                    o ? j(U) && Fn(U, i) : j(U) ? U.includes(i) || U.push(i) : S ? ((p[c] = [i]), G(g, c) && (g[c] = p[c])) : ((c.value = [i]), e.k && (p[e.k] = c.value));
                } else S ? ((p[c] = r), G(g, c) && (g[c] = r)) : L && ((c.value = r), e.k && (p[e.k] = r));
            };
            r ? ((A.id = -1), Be(A, s)) : A();
        }
    }
}
const Be = Da;
function lc(e) {
    return fc(e);
}
function fc(e, t) {
    const s = bn();
    s.__VUE__ = !0;
    const { insert: n, remove: o, patchProp: i, createElement: r, createText: a, createComment: c, setText: u, setElementText: p, parentNode: g, nextSibling: S, setScopeId: L = Qe, insertStaticContent: A } = e,
        U = (l, f, _, b = null, v = null, E = null, $ = !1, k = null, I = !!f.dynamicChildren) => {
            if (l === f) return;
            l && !os(l, f) && ((b = xs(l)), st(l, v, E, !0), (l = null)), f.patchFlag === -2 && ((I = !1), (f.dynamicChildren = null));
            const { type: w, ref: F, shapeFlag: C } = f;
            switch (w) {
                case tn:
                    W(l, f, _, b);
                    break;
                case wt:
                    se(l, f, _, b);
                    break;
                case pn:
                    l == null && te(f, _, b, $);
                    break;
                case Y:
                    Ie(l, f, _, b, v, E, $, k, I);
                    break;
                default:
                    C & 1 ? Ye(l, f, _, b, v, E, $, k, I) : C & 6 ? ws(l, f, _, b, v, E, $, k, I) : (C & 64 || C & 128) && w.process(l, f, _, b, v, E, $, k, I, Ht);
            }
            F != null && v && Un(F, l && l.ref, E, f || l, !f);
        },
        W = (l, f, _, b) => {
            if (l == null) n((f.el = a(f.children)), _, b);
            else {
                const v = (f.el = l.el);
                f.children !== l.children && u(v, f.children);
            }
        },
        se = (l, f, _, b) => {
            l == null ? n((f.el = c(f.children || "")), _, b) : (f.el = l.el);
        },
        te = (l, f, _, b) => {
            [l.el, l.anchor] = A(l.children, f, _, b, l.el, l.anchor);
        },
        re = ({ el: l, anchor: f }, _, b) => {
            let v;
            for (; l && l !== f; ) (v = S(l)), n(l, _, b), (l = v);
            n(f, _, b);
        },
        H = ({ el: l, anchor: f }) => {
            let _;
            for (; l && l !== f; ) (_ = S(l)), o(l), (l = _);
            o(f);
        },
        Ye = (l, f, _, b, v, E, $, k, I) => {
            ($ = $ || f.type === "svg"), l == null ? Fe(f, _, b, v, E, $, k, I) : z(l, f, v, E, $, k, I);
        },
        Fe = (l, f, _, b, v, E, $, k) => {
            let I, w;
            const { type: F, props: C, shapeFlag: B, transition: X, dirs: V } = l;
            if (((I = l.el = r(l.type, E, C && C.is, C)), B & 8 ? p(I, l.children) : B & 16 && M(l.children, I, null, b, v, E && F !== "foreignObject", $, k), V && St(l, null, b, "created"), tt(I, l, l.scopeId, $, b), C)) {
                for (const ne in C) ne !== "value" && !$s(ne) && i(I, ne, null, C[ne], E, l.children, b, v, ut);
                "value" in C && i(I, "value", null, C.value), (w = C.onVnodeBeforeMount) && ot(w, b, l);
            }
            V && St(l, null, b, "beforeMount");
            const ce = (!v || (v && !v.pendingBranch)) && X && !X.persisted;
            ce && X.beforeEnter(I),
                n(I, f, _),
                ((w = C && C.onVnodeMounted) || ce || V) &&
                    Be(() => {
                        w && ot(w, b, l), ce && X.enter(I), V && St(l, null, b, "mounted");
                    }, v);
        },
        tt = (l, f, _, b, v) => {
            if ((_ && L(l, _), b)) for (let E = 0; E < b.length; E++) L(l, b[E]);
            if (v) {
                let E = v.subTree;
                if (f === E) {
                    const $ = v.vnode;
                    tt(l, $, $.scopeId, $.slotScopeIds, v.parent);
                }
            }
        },
        M = (l, f, _, b, v, E, $, k, I = 0) => {
            for (let w = I; w < l.length; w++) {
                const F = (l[w] = k ? gt(l[w]) : it(l[w]));
                U(null, F, f, _, b, v, E, $, k);
            }
        },
        z = (l, f, _, b, v, E, $) => {
            const k = (f.el = l.el);
            let { patchFlag: I, dynamicChildren: w, dirs: F } = f;
            I |= l.patchFlag & 16;
            const C = l.props || ue,
                B = f.props || ue;
            let X;
            _ && Tt(_, !1), (X = B.onVnodeBeforeUpdate) && ot(X, _, f, l), F && St(f, l, _, "beforeUpdate"), _ && Tt(_, !0);
            const V = v && f.type !== "foreignObject";
            if ((w ? O(l.dynamicChildren, w, k, _, b, V, E) : $ || ae(l, f, k, null, _, b, V, E, !1), I > 0)) {
                if (I & 16) q(k, f, C, B, _, b, v);
                else if ((I & 2 && C.class !== B.class && i(k, "class", null, B.class, v), I & 4 && i(k, "style", C.style, B.style, v), I & 8)) {
                    const ce = f.dynamicProps;
                    for (let ne = 0; ne < ce.length; ne++) {
                        const ye = ce[ne],
                            Ke = C[ye],
                            jt = B[ye];
                        (jt !== Ke || ye === "value") && i(k, ye, Ke, jt, v, l.children, _, b, ut);
                    }
                }
                I & 1 && l.children !== f.children && p(k, f.children);
            } else !$ && w == null && q(k, f, C, B, _, b, v);
            ((X = B.onVnodeUpdated) || F) &&
                Be(() => {
                    X && ot(X, _, f, l), F && St(f, l, _, "updated");
                }, b);
        },
        O = (l, f, _, b, v, E, $) => {
            for (let k = 0; k < f.length; k++) {
                const I = l[k],
                    w = f[k],
                    F = I.el && (I.type === Y || !os(I, w) || I.shapeFlag & 70) ? g(I.el) : _;
                U(I, w, F, null, b, v, E, $, !0);
            }
        },
        q = (l, f, _, b, v, E, $) => {
            if (_ !== b) {
                if (_ !== ue) for (const k in _) !$s(k) && !(k in b) && i(l, k, _[k], null, $, f.children, v, E, ut);
                for (const k in b) {
                    if ($s(k)) continue;
                    const I = b[k],
                        w = _[k];
                    I !== w && k !== "value" && i(l, k, w, I, $, f.children, v, E, ut);
                }
                "value" in b && i(l, "value", _.value, b.value);
            }
        },
        Ie = (l, f, _, b, v, E, $, k, I) => {
            const w = (f.el = l ? l.el : a("")),
                F = (f.anchor = l ? l.anchor : a(""));
            let { patchFlag: C, dynamicChildren: B, slotScopeIds: X } = f;
            X && (k = k ? k.concat(X) : X),
                l == null
                    ? (n(w, _, b), n(F, _, b), M(f.children, _, F, v, E, $, k, I))
                    : C > 0 && C & 64 && B && l.dynamicChildren
                    ? (O(l.dynamicChildren, B, _, v, E, $, k), (f.key != null || (v && f === v.subTree)) && nr(l, f, !0))
                    : ae(l, f, _, F, v, E, $, k, I);
        },
        ws = (l, f, _, b, v, E, $, k, I) => {
            (f.slotScopeIds = k), l == null ? (f.shapeFlag & 512 ? v.ctx.activate(f, _, b, $, I) : an(f, _, b, v, E, $, I)) : uo(l, f, I);
        },
        an = (l, f, _, b, v, E, $) => {
            const k = (l.component = vc(l, b, v));
            if ((ji(l) && (k.ctx.renderer = Ht), bc(k), k.asyncDep)) {
                if ((v && v.registerDep(k, Re), !l.el)) {
                    const I = (k.subTree = pe(wt));
                    se(null, I, f, _);
                }
                return;
            }
            Re(k, l, f, _, v, E, $);
        },
        uo = (l, f, _) => {
            const b = (f.component = l.component);
            if (Ca(l, f, _))
                if (b.asyncDep && !b.asyncResolved) {
                    he(b, f, _);
                    return;
                } else (b.next = f), Sa(b.update), b.update();
            else (f.el = l.el), (b.vnode = f);
        },
        Re = (l, f, _, b, v, E, $) => {
            const k = () => {
                    if (l.isMounted) {
                        let { next: F, bu: C, u: B, parent: X, vnode: V } = l,
                            ce = F,
                            ne;
                        Tt(l, !1), F ? ((F.el = V.el), he(l, F, $)) : (F = V), C && Us(C), (ne = F.props && F.props.onVnodeBeforeUpdate) && ot(ne, X, F, V), Tt(l, !0);
                        const ye = fn(l),
                            Ke = l.subTree;
                        (l.subTree = ye), U(Ke, ye, g(Ke.el), xs(Ke), l, v, E), (F.el = ye.el), ce === null && Aa(l, ye.el), B && Be(B, v), (ne = F.props && F.props.onVnodeUpdated) && Be(() => ot(ne, X, F, V), v);
                    } else {
                        let F;
                        const { el: C, props: B } = f,
                            { bm: X, m: V, parent: ce } = l,
                            ne = as(f);
                        if ((Tt(l, !1), X && Us(X), !ne && (F = B && B.onVnodeBeforeMount) && ot(F, ce, f), Tt(l, !0), C && un)) {
                            const ye = () => {
                                (l.subTree = fn(l)), un(C, l.subTree, l, v, null);
                            };
                            ne ? f.type.__asyncLoader().then(() => !l.isUnmounted && ye()) : ye();
                        } else {
                            const ye = (l.subTree = fn(l));
                            U(null, ye, _, b, l, v, E), (f.el = ye.el);
                        }
                        if ((V && Be(V, v), !ne && (F = B && B.onVnodeMounted))) {
                            const ye = f;
                            Be(() => ot(F, ce, ye), v);
                        }
                        (f.shapeFlag & 256 || (ce && as(ce.vnode) && ce.vnode.shapeFlag & 256)) && l.a && Be(l.a, v), (l.isMounted = !0), (f = _ = b = null);
                    }
                },
                I = (l.effect = new Hn(k, () => Vn(w), l.scope)),
                w = (l.update = () => I.run());
            (w.id = l.uid), Tt(l, !0), w();
        },
        he = (l, f, _) => {
            f.component = l;
            const b = l.vnode.props;
            (l.vnode = f), (l.next = null), rc(l, f.props, b, _), uc(l, f.children, _), Qt(), Eo(), es();
        },
        ae = (l, f, _, b, v, E, $, k, I = !1) => {
            const w = l && l.children,
                F = l ? l.shapeFlag : 0,
                C = f.children,
                { patchFlag: B, shapeFlag: X } = f;
            if (B > 0) {
                if (B & 128) {
                    Ms(w, C, _, b, v, E, $, k, I);
                    return;
                } else if (B & 256) {
                    Et(w, C, _, b, v, E, $, k, I);
                    return;
                }
            }
            X & 8 ? (F & 16 && ut(w, v, E), C !== w && p(_, C)) : F & 16 ? (X & 16 ? Ms(w, C, _, b, v, E, $, k, I) : ut(w, v, E, !0)) : (F & 8 && p(_, ""), X & 16 && M(C, _, b, v, E, $, k, I));
        },
        Et = (l, f, _, b, v, E, $, k, I) => {
            (l = l || Xt), (f = f || Xt);
            const w = l.length,
                F = f.length,
                C = Math.min(w, F);
            let B;
            for (B = 0; B < C; B++) {
                const X = (f[B] = I ? gt(f[B]) : it(f[B]));
                U(l[B], X, _, null, v, E, $, k, I);
            }
            w > F ? ut(l, v, E, !0, !1, C) : M(f, _, b, v, E, $, k, I, C);
        },
        Ms = (l, f, _, b, v, E, $, k, I) => {
            let w = 0;
            const F = f.length;
            let C = l.length - 1,
                B = F - 1;
            for (; w <= C && w <= B; ) {
                const X = l[w],
                    V = (f[w] = I ? gt(f[w]) : it(f[w]));
                if (os(X, V)) U(X, V, _, null, v, E, $, k, I);
                else break;
                w++;
            }
            for (; w <= C && w <= B; ) {
                const X = l[C],
                    V = (f[B] = I ? gt(f[B]) : it(f[B]));
                if (os(X, V)) U(X, V, _, null, v, E, $, k, I);
                else break;
                C--, B--;
            }
            if (w > C) {
                if (w <= B) {
                    const X = B + 1,
                        V = X < F ? f[X].el : b;
                    for (; w <= B; ) U(null, (f[w] = I ? gt(f[w]) : it(f[w])), _, V, v, E, $, k, I), w++;
                }
            } else if (w > B) for (; w <= C; ) st(l[w], v, E, !0), w++;
            else {
                const X = w,
                    V = w,
                    ce = new Map();
                for (w = V; w <= B; w++) {
                    const Xe = (f[w] = I ? gt(f[w]) : it(f[w]));
                    Xe.key != null && ce.set(Xe.key, w);
                }
                let ne,
                    ye = 0;
                const Ke = B - V + 1;
                let jt = !1,
                    po = 0;
                const ns = new Array(Ke);
                for (w = 0; w < Ke; w++) ns[w] = 0;
                for (w = X; w <= C; w++) {
                    const Xe = l[w];
                    if (ye >= Ke) {
                        st(Xe, v, E, !0);
                        continue;
                    }
                    let nt;
                    if (Xe.key != null) nt = ce.get(Xe.key);
                    else
                        for (ne = V; ne <= B; ne++)
                            if (ns[ne - V] === 0 && os(Xe, f[ne])) {
                                nt = ne;
                                break;
                            }
                    nt === void 0 ? st(Xe, v, E, !0) : ((ns[nt - V] = w + 1), nt >= po ? (po = nt) : (jt = !0), U(Xe, f[nt], _, null, v, E, $, k, I), ye++);
                }
                const ho = jt ? dc(ns) : Xt;
                for (ne = ho.length - 1, w = Ke - 1; w >= 0; w--) {
                    const Xe = V + w,
                        nt = f[Xe],
                        mo = Xe + 1 < F ? f[Xe + 1].el : b;
                    ns[w] === 0 ? U(null, nt, _, mo, v, E, $, k, I) : jt && (ne < 0 || w !== ho[ne] ? It(nt, _, mo, 2) : ne--);
                }
            }
        },
        It = (l, f, _, b, v = null) => {
            const { el: E, type: $, transition: k, children: I, shapeFlag: w } = l;
            if (w & 6) {
                It(l.component.subTree, f, _, b);
                return;
            }
            if (w & 128) {
                l.suspense.move(f, _, b);
                return;
            }
            if (w & 64) {
                $.move(l, f, _, Ht);
                return;
            }
            if ($ === Y) {
                n(E, f, _);
                for (let C = 0; C < I.length; C++) It(I[C], f, _, b);
                n(l.anchor, f, _);
                return;
            }
            if ($ === pn) {
                re(l, f, _);
                return;
            }
            if (b !== 2 && w & 1 && k)
                if (b === 0) k.beforeEnter(E), n(E, f, _), Be(() => k.enter(E), v);
                else {
                    const { leave: C, delayLeave: B, afterLeave: X } = k,
                        V = () => n(E, f, _),
                        ce = () => {
                            C(E, () => {
                                V(), X && X();
                            });
                        };
                    B ? B(E, V, ce) : ce();
                }
            else n(E, f, _);
        },
        st = (l, f, _, b = !1, v = !1) => {
            const { type: E, props: $, ref: k, children: I, dynamicChildren: w, shapeFlag: F, patchFlag: C, dirs: B } = l;
            if ((k != null && Un(k, null, _, l, !0), F & 256)) {
                f.ctx.deactivate(l);
                return;
            }
            const X = F & 1 && B,
                V = !as(l);
            let ce;
            if ((V && (ce = $ && $.onVnodeBeforeUnmount) && ot(ce, f, l), F & 6)) Tr(l.component, _, b);
            else {
                if (F & 128) {
                    l.suspense.unmount(_, b);
                    return;
                }
                X && St(l, null, f, "beforeUnmount"), F & 64 ? l.type.remove(l, f, _, v, Ht, b) : w && (E !== Y || (C > 0 && C & 64)) ? ut(w, f, _, !1, !0) : ((E === Y && C & 384) || (!v && F & 16)) && ut(I, f, _), b && lo(l);
            }
            ((V && (ce = $ && $.onVnodeUnmounted)) || X) &&
                Be(() => {
                    ce && ot(ce, f, l), X && St(l, null, f, "unmounted");
                }, _);
        },
        lo = (l) => {
            const { type: f, el: _, anchor: b, transition: v } = l;
            if (f === Y) {
                Sr(_, b);
                return;
            }
            if (f === pn) {
                H(l);
                return;
            }
            const E = () => {
                o(_), v && !v.persisted && v.afterLeave && v.afterLeave();
            };
            if (l.shapeFlag & 1 && v && !v.persisted) {
                const { leave: $, delayLeave: k } = v,
                    I = () => $(_, E);
                k ? k(l.el, E, I) : I();
            } else E();
        },
        Sr = (l, f) => {
            let _;
            for (; l !== f; ) (_ = S(l)), o(l), (l = _);
            o(f);
        },
        Tr = (l, f, _) => {
            const { bum: b, scope: v, update: E, subTree: $, um: k } = l;
            b && Us(b),
                v.stop(),
                E && ((E.active = !1), st($, l, f, _)),
                k && Be(k, f),
                Be(() => {
                    l.isUnmounted = !0;
                }, f),
                f && f.pendingBranch && !f.isUnmounted && l.asyncDep && !l.asyncResolved && l.suspenseId === f.pendingId && (f.deps--, f.deps === 0 && f.resolve());
        },
        ut = (l, f, _, b = !1, v = !1, E = 0) => {
            for (let $ = E; $ < l.length; $++) st(l[$], f, _, b, v);
        },
        xs = (l) => (l.shapeFlag & 6 ? xs(l.component.subTree) : l.shapeFlag & 128 ? l.suspense.next() : S(l.anchor || l.el)),
        fo = (l, f, _) => {
            l == null ? f._vnode && st(f._vnode, null, null, !0) : U(f._vnode || null, l, f, null, null, null, _), Eo(), Di(), (f._vnode = l);
        },
        Ht = { p: U, um: st, m: It, r: lo, mt: an, mc: M, pc: ae, pbc: O, n: xs, o: e };
    let cn, un;
    return t && ([cn, un] = t(Ht)), { render: fo, hydrate: cn, createApp: nc(fo, cn) };
}
function Tt({ effect: e, update: t }, s) {
    e.allowRecurse = t.allowRecurse = s;
}
function nr(e, t, s = !1) {
    const n = e.children,
        o = t.children;
    if (j(n) && j(o))
        for (let i = 0; i < n.length; i++) {
            const r = n[i];
            let a = o[i];
            a.shapeFlag & 1 && !a.dynamicChildren && ((a.patchFlag <= 0 || a.patchFlag === 32) && ((a = o[i] = gt(o[i])), (a.el = r.el)), s || nr(r, a)), a.type === tn && (a.el = r.el);
        }
}
function dc(e) {
    const t = e.slice(),
        s = [0];
    let n, o, i, r, a;
    const c = e.length;
    for (n = 0; n < c; n++) {
        const u = e[n];
        if (u !== 0) {
            if (((o = s[s.length - 1]), e[o] < u)) {
                (t[n] = o), s.push(n);
                continue;
            }
            for (i = 0, r = s.length - 1; i < r; ) (a = (i + r) >> 1), e[s[a]] < u ? (i = a + 1) : (r = a);
            u < e[s[i]] && (i > 0 && (t[n] = s[i - 1]), (s[i] = n));
        }
    }
    for (i = s.length, r = s[i - 1]; i-- > 0; ) (s[i] = r), (r = t[r]);
    return s;
}
const pc = (e) => e.__isTeleport,
    Y = Symbol.for("v-fgt"),
    tn = Symbol.for("v-txt"),
    wt = Symbol.for("v-cmt"),
    pn = Symbol.for("v-stc"),
    us = [];
let Je = null;
function m(e = !1) {
    us.push((Je = e ? null : []));
}
function hc() {
    us.pop(), (Je = us[us.length - 1] || null);
}
let ms = 1;
function Do(e) {
    ms += e;
}
function or(e) {
    return (e.dynamicChildren = ms > 0 ? Je || Xt : null), hc(), ms > 0 && Je && Je.push(e), e;
}
function y(e, t, s, n, o, i) {
    return or(h(e, t, s, n, o, i, !0));
}
function fe(e, t, s, n, o) {
    return or(pe(e, t, s, n, o, !0));
}
function ir(e) {
    return e ? e.__v_isVNode === !0 : !1;
}
function os(e, t) {
    return e.type === t.type && e.key === t.key;
}
const sn = "__vInternal",
    rr = ({ key: e }) => (e != null ? e : null),
    As = ({ ref: e, ref_key: t, ref_for: s }) => (typeof e == "number" && (e = "" + e), e != null ? (_e(e) || Te(e) || K(e) ? { i: Oe, r: e, k: t, f: !!s } : e) : null);
function h(e, t = null, s = null, n = 0, o = null, i = e === Y ? 0 : 1, r = !1, a = !1) {
    const c = {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e,
        props: t,
        key: t && rr(t),
        ref: t && As(t),
        scopeId: Qs,
        slotScopeIds: null,
        children: s,
        component: null,
        suspense: null,
        ssContent: null,
        ssFallback: null,
        dirs: null,
        transition: null,
        el: null,
        anchor: null,
        target: null,
        targetAnchor: null,
        staticCount: 0,
        shapeFlag: i,
        patchFlag: n,
        dynamicProps: o,
        dynamicChildren: null,
        appContext: null,
        ctx: Oe,
    };
    return a ? (Jn(c, s), i & 128 && e.normalize(c)) : s && (c.shapeFlag |= _e(s) ? 8 : 16), ms > 0 && !r && Je && (c.patchFlag > 0 || i & 6) && c.patchFlag !== 32 && Je.push(c), c;
}
const pe = mc;
function mc(e, t = null, s = null, n = 0, o = null, i = !1) {
    if (((!e || e === Ki) && (e = wt), ir(e))) {
        const a = Zt(e, t, !0);
        return s && Jn(a, s), ms > 0 && !i && Je && (a.shapeFlag & 6 ? (Je[Je.indexOf(e)] = a) : Je.push(a)), (a.patchFlag |= -2), a;
    }
    if ((Ec(e) && (e = e.__vccOpts), t)) {
        t = ar(t);
        let { class: a, style: c } = t;
        a && !_e(a) && (t.class = ge(a)), le(c) && (Oi(c) && !j(c) && (c = xe({}, c)), (t.style = Me(c)));
    }
    const r = _e(e) ? 1 : Ra(e) ? 128 : pc(e) ? 64 : le(e) ? 4 : K(e) ? 2 : 0;
    return h(e, t, s, n, o, r, i, !0);
}
function ar(e) {
    return e ? (Oi(e) || sn in e ? xe({}, e) : e) : null;
}
function Zt(e, t, s = !1) {
    const { props: n, ref: o, patchFlag: i, children: r } = e,
        a = t ? gc(n || {}, t) : n;
    return {
        __v_isVNode: !0,
        __v_skip: !0,
        type: e.type,
        props: a,
        key: a && rr(a),
        ref: t && t.ref ? (s && o ? (j(o) ? o.concat(As(t)) : [o, As(t)]) : As(t)) : o,
        scopeId: e.scopeId,
        slotScopeIds: e.slotScopeIds,
        children: r,
        target: e.target,
        targetAnchor: e.targetAnchor,
        staticCount: e.staticCount,
        shapeFlag: e.shapeFlag,
        patchFlag: t && e.type !== Y ? (i === -1 ? 16 : i | 16) : i,
        dynamicProps: e.dynamicProps,
        dynamicChildren: e.dynamicChildren,
        appContext: e.appContext,
        dirs: e.dirs,
        transition: e.transition,
        component: e.component,
        suspense: e.suspense,
        ssContent: e.ssContent && Zt(e.ssContent),
        ssFallback: e.ssFallback && Zt(e.ssFallback),
        el: e.el,
        anchor: e.anchor,
        ctx: e.ctx,
        ce: e.ce,
    };
}
function N(e = " ", t = 0) {
    return pe(tn, null, e, t);
}
function J(e = "", t = !1) {
    return t ? (m(), fe(wt, null, e)) : pe(wt, null, e);
}
function it(e) {
    return e == null || typeof e == "boolean" ? pe(wt) : j(e) ? pe(Y, null, e.slice()) : typeof e == "object" ? gt(e) : pe(tn, null, String(e));
}
function gt(e) {
    return (e.el === null && e.patchFlag !== -1) || e.memo ? e : Zt(e);
}
function Jn(e, t) {
    let s = 0;
    const { shapeFlag: n } = e;
    if (t == null) t = null;
    else if (j(t)) s = 16;
    else if (typeof t == "object")
        if (n & 65) {
            const o = t.default;
            o && (o._c && (o._d = !1), Jn(e, o()), o._c && (o._d = !0));
            return;
        } else {
            s = 32;
            const o = t._;
            !o && !(sn in t) ? (t._ctx = Oe) : o === 3 && Oe && (Oe.slots._ === 1 ? (t._ = 1) : ((t._ = 2), (e.patchFlag |= 1024)));
        }
    else K(t) ? ((t = { default: t, _ctx: Oe }), (s = 32)) : ((t = String(t)), n & 64 ? ((s = 16), (t = [N(t)])) : (s = 8));
    (e.children = t), (e.shapeFlag |= s);
}
function gc(...e) {
    const t = {};
    for (let s = 0; s < e.length; s++) {
        const n = e[s];
        for (const o in n)
            if (o === "class") t.class !== n.class && (t.class = ge([t.class, n.class]));
            else if (o === "style") t.style = Me([t.style, n.style]);
            else if (Ws(o)) {
                const i = t[o],
                    r = n[o];
                r && i !== r && !(j(i) && i.includes(r)) && (t[o] = i ? [].concat(i, r) : r);
            } else o !== "" && (t[o] = n[o]);
    }
    return t;
}
function ot(e, t, s, n = null) {
    et(e, t, 7, [s, n]);
}
const _c = Gi();
let yc = 0;
function vc(e, t, s) {
    const n = e.type,
        o = (t ? t.appContext : e.appContext) || _c,
        i = {
            uid: yc++,
            vnode: e,
            type: n,
            parent: t,
            appContext: o,
            root: null,
            next: null,
            subTree: null,
            effect: null,
            update: null,
            scope: new Wr(!0),
            render: null,
            proxy: null,
            exposed: null,
            exposeProxy: null,
            withProxy: null,
            provides: t ? t.provides : Object.create(o.provides),
            accessCache: null,
            renderCache: [],
            components: null,
            directives: null,
            propsOptions: Qi(n, o),
            emitsOptions: Fi(n, o),
            emit: null,
            emitted: null,
            propsDefaults: ue,
            inheritAttrs: n.inheritAttrs,
            ctx: ue,
            data: ue,
            props: ue,
            attrs: ue,
            slots: ue,
            refs: ue,
            setupState: ue,
            setupContext: null,
            attrsProxy: null,
            slotsProxy: null,
            suspense: s,
            suspenseId: s ? s.pendingId : 0,
            asyncDep: null,
            asyncResolved: !1,
            isMounted: !1,
            isUnmounted: !1,
            isDeactivated: !1,
            bc: null,
            c: null,
            bm: null,
            m: null,
            bu: null,
            u: null,
            um: null,
            bum: null,
            da: null,
            a: null,
            rtg: null,
            rtc: null,
            ec: null,
            sp: null,
        };
    return (i.ctx = { _: i }), (i.root = t ? t.root : i), (i.emit = $a.bind(null, i)), e.ce && e.ce(i), i;
}
let Ee = null,
    Qn,
    Yt,
    Lo = "__VUE_INSTANCE_SETTERS__";
(Yt = bn()[Lo]) || (Yt = bn()[Lo] = []),
    Yt.push((e) => (Ee = e)),
    (Qn = (e) => {
        Yt.length > 1 ? Yt.forEach((t) => t(e)) : Yt[0](e);
    });
const Gt = (e) => {
        Qn(e), e.scope.on();
    },
    Bt = () => {
        Ee && Ee.scope.off(), Qn(null);
    };
function cr(e) {
    return e.vnode.shapeFlag & 4;
}
let gs = !1;
function bc(e, t = !1) {
    gs = t;
    const { props: s, children: n } = e.vnode,
        o = cr(e);
    ic(e, s, o, t), cc(e, n);
    const i = o ? wc(e, t) : void 0;
    return (gs = !1), i;
}
function wc(e, t) {
    const s = e.type;
    (e.accessCache = Object.create(null)), (e.proxy = qn(new Proxy(e.ctx, Za)));
    const { setup: n } = s;
    if (n) {
        const o = (e.setupContext = n.length > 1 ? xc(e) : null);
        Gt(e), Qt();
        const i = vt(n, e, 0, [e.props, o]);
        if ((es(), Bt(), di(i))) {
            if ((i.then(Bt, Bt), t))
                return i
                    .then((r) => {
                        Fo(e, r, t);
                    })
                    .catch((r) => {
                        Gs(r, e, 0);
                    });
            e.asyncDep = i;
        } else Fo(e, i, t);
    } else ur(e, t);
}
function Fo(e, t, s) {
    K(t) ? (e.type.__ssrInlineRender ? (e.ssrRender = t) : (e.render = t)) : le(t) && (e.setupState = Ci(t)), ur(e, s);
}
let Bo;
function ur(e, t, s) {
    const n = e.type;
    if (!e.render) {
        if (!t && Bo && !n.render) {
            const o = n.template || Zn(e).template;
            if (o) {
                const { isCustomElement: i, compilerOptions: r } = e.appContext.config,
                    { delimiters: a, compilerOptions: c } = n,
                    u = xe(xe({ isCustomElement: i, delimiters: a }, r), c);
                n.render = Bo(o, u);
            }
        }
        e.render = n.render || Qe;
    }
    Gt(e), Qt(), Ga(e), es(), Bt();
}
function Mc(e) {
    return (
        e.attrsProxy ||
        (e.attrsProxy = new Proxy(e.attrs, {
            get(t, s) {
                return He(e, "get", "$attrs"), t[s];
            },
        }))
    );
}
function xc(e) {
    const t = (s) => {
        e.exposed = s || {};
    };
    return {
        get attrs() {
            return Mc(e);
        },
        slots: e.slots,
        emit: e.emit,
        expose: t,
    };
}
function nn(e) {
    if (e.exposed)
        return (
            e.exposeProxy ||
            (e.exposeProxy = new Proxy(Ci(qn(e.exposed)), {
                get(t, s) {
                    if (s in t) return t[s];
                    if (s in cs) return cs[s](e);
                },
                has(t, s) {
                    return s in t || s in cs;
                },
            }))
        );
}
function kc(e, t = !0) {
    return K(e) ? e.displayName || e.name : e.name || (t && e.__name);
}
function Ec(e) {
    return K(e) && "__vccOpts" in e;
}
const we = (e, t) => xa(e, t, gs),
    Ic = Symbol.for("v-scx"),
    Sc = () => Cs(Ic),
    Tc = "3.3.4",
    Oc = "http://www.w3.org/2000/svg",
    Ut = typeof document < "u" ? document : null,
    No = Ut && Ut.createElement("template"),
    $c = {
        insert: (e, t, s) => {
            t.insertBefore(e, s || null);
        },
        remove: (e) => {
            const t = e.parentNode;
            t && t.removeChild(e);
        },
        createElement: (e, t, s, n) => {
            const o = t ? Ut.createElementNS(Oc, e) : Ut.createElement(e, s ? { is: s } : void 0);
            return e === "select" && n && n.multiple != null && o.setAttribute("multiple", n.multiple), o;
        },
        createText: (e) => Ut.createTextNode(e),
        createComment: (e) => Ut.createComment(e),
        setText: (e, t) => {
            e.nodeValue = t;
        },
        setElementText: (e, t) => {
            e.textContent = t;
        },
        parentNode: (e) => e.parentNode,
        nextSibling: (e) => e.nextSibling,
        querySelector: (e) => Ut.querySelector(e),
        setScopeId(e, t) {
            e.setAttribute(t, "");
        },
        insertStaticContent(e, t, s, n, o, i) {
            const r = s ? s.previousSibling : t.lastChild;
            if (o && (o === i || o.nextSibling)) for (; t.insertBefore(o.cloneNode(!0), s), !(o === i || !(o = o.nextSibling)); );
            else {
                No.innerHTML = n ? `<svg>${e}</svg>` : e;
                const a = No.content;
                if (n) {
                    const c = a.firstChild;
                    for (; c.firstChild; ) a.appendChild(c.firstChild);
                    a.removeChild(c);
                }
                t.insertBefore(a, s);
            }
            return [r ? r.nextSibling : t.firstChild, s ? s.previousSibling : t.lastChild];
        },
    };
function Uc(e, t, s) {
    const n = e._vtc;
    n && (t = (t ? [t, ...n] : [...n]).join(" ")), t == null ? e.removeAttribute("class") : s ? e.setAttribute("class", t) : (e.className = t);
}
function Pc(e, t, s) {
    const n = e.style,
        o = _e(s);
    if (s && !o) {
        if (t && !_e(t)) for (const i in t) s[i] == null && Pn(n, i, "");
        for (const i in s) Pn(n, i, s[i]);
    } else {
        const i = n.display;
        o ? t !== s && (n.cssText = s) : t && e.removeAttribute("style"), "_vod" in e && (n.display = i);
    }
}
const Ho = /\s*!important$/;
function Pn(e, t, s) {
    if (j(s)) s.forEach((n) => Pn(e, t, n));
    else if ((s == null && (s = ""), t.startsWith("--"))) e.setProperty(t, s);
    else {
        const n = Cc(e, t);
        Ho.test(s) ? e.setProperty(Jt(n), s.replace(Ho, ""), "important") : (e[n] = s);
    }
}
const jo = ["Webkit", "Moz", "ms"],
    hn = {};
function Cc(e, t) {
    const s = hn[t];
    if (s) return s;
    let n = ct(t);
    if (n !== "filter" && n in e) return (hn[t] = n);
    n = Ks(n);
    for (let o = 0; o < jo.length; o++) {
        const i = jo[o] + n;
        if (i in e) return (hn[t] = i);
    }
    return t;
}
const Yo = "http://www.w3.org/1999/xlink";
function Ac(e, t, s, n, o) {
    if (n && t.startsWith("xlink:")) s == null ? e.removeAttributeNS(Yo, t.slice(6, t.length)) : e.setAttributeNS(Yo, t, s);
    else {
        const i = Yr(t);
        s == null || (i && !mi(s)) ? e.removeAttribute(t) : e.setAttribute(t, i ? "" : s);
    }
}
function Rc(e, t, s, n, o, i, r) {
    if (t === "innerHTML" || t === "textContent") {
        n && r(n, o, i), (e[t] = s == null ? "" : s);
        return;
    }
    const a = e.tagName;
    if (t === "value" && a !== "PROGRESS" && !a.includes("-")) {
        e._value = s;
        const u = a === "OPTION" ? e.getAttribute("value") : e.value,
            p = s == null ? "" : s;
        u !== p && (e.value = p), s == null && e.removeAttribute(t);
        return;
    }
    let c = !1;
    if (s === "" || s == null) {
        const u = typeof e[t];
        u === "boolean" ? (s = mi(s)) : s == null && u === "string" ? ((s = ""), (c = !0)) : u === "number" && ((s = 0), (c = !0));
    }
    try {
        e[t] = s;
    } catch {}
    c && e.removeAttribute(t);
}
function Pt(e, t, s, n) {
    e.addEventListener(t, s, n);
}
function Dc(e, t, s, n) {
    e.removeEventListener(t, s, n);
}
function Lc(e, t, s, n, o = null) {
    const i = e._vei || (e._vei = {}),
        r = i[t];
    if (n && r) r.value = n;
    else {
        const [a, c] = Fc(t);
        if (n) {
            const u = (i[t] = Hc(n, o));
            Pt(e, a, u, c);
        } else r && (Dc(e, a, r, c), (i[t] = void 0));
    }
}
const Xo = /(?:Once|Passive|Capture)$/;
function Fc(e) {
    let t;
    if (Xo.test(e)) {
        t = {};
        let n;
        for (; (n = e.match(Xo)); ) (e = e.slice(0, e.length - n[0].length)), (t[n[0].toLowerCase()] = !0);
    }
    return [e[2] === ":" ? e.slice(3) : Jt(e.slice(2)), t];
}
let mn = 0;
const Bc = Promise.resolve(),
    Nc = () => mn || (Bc.then(() => (mn = 0)), (mn = Date.now()));
function Hc(e, t) {
    const s = (n) => {
        if (!n._vts) n._vts = Date.now();
        else if (n._vts <= s.attached) return;
        et(jc(n, s.value), t, 5, [n]);
    };
    return (s.value = e), (s.attached = Nc()), s;
}
function jc(e, t) {
    if (j(t)) {
        const s = e.stopImmediatePropagation;
        return (
            (e.stopImmediatePropagation = () => {
                s.call(e), (e._stopped = !0);
            }),
            t.map((n) => (o) => !o._stopped && n && n(o))
        );
    } else return t;
}
const Wo = /^on[a-z]/,
    Yc = (e, t, s, n, o = !1, i, r, a, c) => {
        t === "class"
            ? Uc(e, n, o)
            : t === "style"
            ? Pc(e, s, n)
            : Ws(t)
            ? Ln(t) || Lc(e, t, s, n, r)
            : (t[0] === "." ? ((t = t.slice(1)), !0) : t[0] === "^" ? ((t = t.slice(1)), !1) : Xc(e, t, n, o))
            ? Rc(e, t, n, i, r, a, c)
            : (t === "true-value" ? (e._trueValue = n) : t === "false-value" && (e._falseValue = n), Ac(e, t, n, o));
    };
function Xc(e, t, s, n) {
    return n
        ? !!(t === "innerHTML" || t === "textContent" || (t in e && Wo.test(t) && K(s)))
        : t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || (t === "list" && e.tagName === "INPUT") || (t === "type" && e.tagName === "TEXTAREA") || (Wo.test(t) && _e(s))
        ? !1
        : t in e;
}
const Ns = (e) => {
    const t = e.props["onUpdate:modelValue"] || !1;
    return j(t) ? (s) => Us(t, s) : t;
};
function Wc(e) {
    e.target.composing = !0;
}
function qo(e) {
    const t = e.target;
    t.composing && ((t.composing = !1), t.dispatchEvent(new Event("input")));
}
const qc = {
        created(e, { modifiers: { lazy: t, trim: s, number: n } }, o) {
            e._assign = Ns(o);
            const i = n || (o.props && o.props.type === "number");
            Pt(e, t ? "change" : "input", (r) => {
                if (r.target.composing) return;
                let a = e.value;
                s && (a = a.trim()), i && (a = vn(a)), e._assign(a);
            }),
                s &&
                    Pt(e, "change", () => {
                        e.value = e.value.trim();
                    }),
                t || (Pt(e, "compositionstart", Wc), Pt(e, "compositionend", qo), Pt(e, "change", qo));
        },
        mounted(e, { value: t }) {
            e.value = t == null ? "" : t;
        },
        beforeUpdate(e, { value: t, modifiers: { lazy: s, trim: n, number: o } }, i) {
            if (((e._assign = Ns(i)), e.composing || (document.activeElement === e && e.type !== "range" && (s || (n && e.value.trim() === t) || ((o || e.type === "number") && vn(e.value) === t))))) return;
            const r = t == null ? "" : t;
            e.value !== r && (e.value = r);
        },
    },
    zc = {
        deep: !0,
        created(e, t, s) {
            (e._assign = Ns(s)),
                Pt(e, "change", () => {
                    const n = e._modelValue,
                        o = Kc(e),
                        i = e.checked,
                        r = e._assign;
                    if (j(n)) {
                        const a = gi(n, o),
                            c = a !== -1;
                        if (i && !c) r(n.concat(o));
                        else if (!i && c) {
                            const u = [...n];
                            u.splice(a, 1), r(u);
                        }
                    } else if (qs(n)) {
                        const a = new Set(n);
                        i ? a.add(o) : a.delete(o), r(a);
                    } else r(lr(e, i));
                });
        },
        mounted: zo,
        beforeUpdate(e, t, s) {
            (e._assign = Ns(s)), zo(e, t, s);
        },
    };
function zo(e, { value: t, oldValue: s }, n) {
    (e._modelValue = t), j(t) ? (e.checked = gi(t, n.props.value) > -1) : qs(t) ? (e.checked = t.has(n.props.value)) : t !== s && (e.checked = Vs(t, lr(e, !0)));
}
function Kc(e) {
    return "_value" in e ? e._value : e.value;
}
function lr(e, t) {
    const s = t ? "_trueValue" : "_falseValue";
    return s in e ? e[s] : t;
}
const Vc = xe({ patchProp: Yc }, $c);
let Ko;
function Zc() {
    return Ko || (Ko = lc(Vc));
}
const Gc = (...e) => {
    const t = Zc().createApp(...e),
        { mount: s } = t;
    return (
        (t.mount = (n) => {
            const o = Jc(n);
            if (!o) return;
            const i = t._component;
            !K(i) && !i.render && !i.template && (i.template = o.innerHTML), (o.innerHTML = "");
            const r = s(o, !1, o instanceof SVGElement);
            return o instanceof Element && (o.removeAttribute("v-cloak"), o.setAttribute("data-v-app", "")), r;
        }),
        t
    );
};
function Jc(e) {
    return _e(e) ? document.querySelector(e) : e;
}
function Qc(e) {
    var s, n;
    if (!Mt[e.type]) throw `machineData.type '${e.type}' is not a valid MachineType`;
    const t = Mt[e.type].config;
    if (Object.keys(t.upgrades).length) {
        (e.upgrades = e.upgrades || []), (e.upgradesPrepay = e.upgradesPrepay || []);
        for (let o = 0; o < Object.keys(t.upgrades).length; o++) (e.upgrades[o] = e.upgrades[o] || 0), (e.upgradesPrepay[o] = e.upgradesPrepay[o] || 0);
    }
    if ((s = t.inputs) != null && s.length) {
        e.inputs = e.inputs || [];
        for (let o = 0; o < t.inputs.length; o++) e.inputs[o] = e.inputs[o] || [];
    }
    if ((n = t.outputs) != null && n.length) {
        (e.outputs = e.outputs || []), (e.pipes = e.pipes || []);
        for (let o = 0; o < t.outputs.length; o++) (e.outputs[o] = e.outputs[o] || []), (e.pipes[o] = e.pipes[o] || []);
    }
}
const Rt = 5040,
    Dt = 4050,
    fr = 90,
    ke = Object.freeze(Object.defineProperty({ __proto__: null, MAX_OFFSET_X: Rt, MAX_OFFSET_Y: Dt, GRID_SIZE: fr }, Symbol.toStringTag, { value: "Module" }));
function dr(e) {
    return e.reduce((t, s) => t + s.amount, 0);
}
function eu(e, t, s = 1 / 0, n = {}) {
    var r;
    if (t.amount <= 0) return 0;
    const o = (r = n.spaceLeft) != null ? r : s - dr(e);
    if (o <= 0) return 0;
    const i = Math.min(o, t.amount);
    return e[0] && e[0].resource === t.resource ? (e[0].amount += i) : e.unshift({ resource: t.resource, amount: i }), i;
}
function tu(e, t) {
    if (!e.length || t <= 0) return 0;
    const s = e[e.length - 1];
    return s.amount <= t ? (e.pop(), s.amount) : ((s.amount -= t), s.amount < Number.EPSILON && e.pop(), t);
}
const Cn = (e) => Array.isArray(e),
    An = (e) => typeof e == "object" && e !== null && !Array.isArray(e);
function Vo(e, t) {
    return ((e % t) + t) % t;
}
function on(e, t) {
    return Object.fromEntries(Object.entries(e).map(([s, n], o) => [s, t(n, o)]));
}
function oe(e, ...t) {
    let s;
    return typeof e == "function" ? (s = e(...t)) : (s = e), s;
}
function pr(e, t) {
    Object.keys(t).forEach((s) => {
        const n = s;
        An(t[n]) || Cn(t[n]) ? (An(e[n]) || Cn(e[n]) ? pr(e[n], t[n]) : (e[n] = Rn(t[n]))) : (e[n] = t[n]);
    });
}
function Rn(e) {
    return Cn(e) ? e.map((t) => Rn(t)) : An(e) ? Object.fromEntries(Object.entries(e).map(([t, s]) => [t, Rn(s)])) : e;
}
function su(e, t) {
    const s = {};
    for (const n of e) {
        const o = n.toString() + typeof n;
        s[o] = 1;
    }
    for (const n of t) {
        const o = n.toString() + typeof n;
        if (!s[o]) return !1;
        s[o] = 2;
    }
    for (const n in s) if (s[n] === 1) return !1;
    return !0;
}
function nu(e, t) {
    const s = document.createElement("a");
    if ((s.setAttribute("href", `data:text/plain;charset=utf-8,${encodeURIComponent(t)}`), s.setAttribute("download", e), document.createEvent)) {
        const n = document.createEvent("MouseEvents");
        n.initEvent("click", !0, !0), s.dispatchEvent(n);
    } else s.click();
}
class ou {
    constructor(t) {
        T(this, "string");
        this.string = t;
    }
    get capitalize() {
        return this.string ? this.string[0].toUpperCase() + this.string.slice(1) : "";
    }
}
class iu {
    constructor(t) {
        T(this, "array");
        this.array = t;
    }
    get last() {
        return this.array.at(-1);
    }
    findLast(t) {
        for (let s = this.array.length; s > 0; s--) if (t(this.array[s - 1], s - 1)) return this.array[s - 1];
    }
    expendableFind(t) {
        for (let s = 0; s < this.array.length; s++) if (t(this.array[s], s)) return this.array.splice(s, 1)[0];
    }
    clear() {
        this.array.splice(0, this.array.length);
    }
    mapToObject(t, s) {
        const n = {};
        return (
            this.array.forEach((o, i) => {
                const r = i.toString(),
                    a = t(o, r);
                n[a] = s(o, r);
            }),
            n
        );
    }
}
function ze(e) {
    return new ou(e);
}
function We(e) {
    return new iu(e);
}
function $e(e, t = 2, s = 2, n = !1) {
    if (e === 0) return (0).toFixed(s);
    if (Math.log10(e) < -1 && n) {
        const i = Math.floor(Math.log10(e) + Number.EPSILON);
        return `${Math.min(e / Math.pow(10, i), 10 - Math.pow(0.1, t)).toFixed(t)}e${i}`;
    }
    if (e < 1e3 && Number(e.toFixed(s)) < 1e3) return e.toFixed(s);
    const o = Math.floor(Math.log10(e) + Number.EPSILON);
    return `${Math.min(e / Math.pow(10, o), 10 - Math.pow(0.1, t)).toFixed(t)}e${o}`;
}
function rn(e, t = 2, s = 2) {
    return `\xD7${$e(e, t, s)}`;
}
function ru(e) {
    return $e(e, 2, 0, !1);
}
class au {
    constructor(t, s, n) {
        T(this, "config");
        T(this, "townId");
        T(this, "id");
        (this.config = t), (this.townId = s), (this.id = n);
    }
    get cost() {
        return oe(this.config.cost) - this.prepay;
    }
    get currencyType() {
        return oe(this.config.currencyType);
    }
    get associatedMachine() {
        return Mt[this.config.type];
    }
    get isUnlocked() {
        return this.config.isUnlocked === void 0 ? !0 : oe(this.config.isUnlocked);
    }
    get canAfford() {
        return this.currencyType ? d.holding.resource === this.currencyType && d.holding.amount > 0 : d.money >= this.cost;
    }
    get canAffordWhole() {
        return this.currencyType ? d.holding.resource === this.currencyType && d.holding.amount >= this.cost : d.money >= this.cost;
    }
    get prepay() {
        return d.towns[this.townId].machinesPrepay[this.id];
    }
    set prepay(t) {
        d.towns[this.townId].machinesPrepay[this.id] = t;
    }
    buy() {
        if (!this.canAfford) return;
        const t = this.cost,
            s = this.currencyType;
        if (!this.canAffordWhole) {
            (this.prepay += d.holding.amount), (d.holding.amount = 0);
            return;
        }
        !be.add(d.currentlyIn, this.config.type, d.towns[d.currentlyIn].display.offset.x, d.towns[d.currentlyIn].display.offset.y) || (s ? ((d.holding.amount -= t), (this.prepay = 0)) : (d.money -= t));
    }
}
class cu {
    constructor(t, s) {
        T(this, "config");
        T(this, "townId");
        T(this, "_");
        (this.config = t), (this.townId = s), (this._ = qn({ bits: we(() => d.towns[this.townId].upgrades) }));
    }
    get id() {
        return this.config.id;
    }
    get bits() {
        return this._.bits.value;
    }
    set bits(t) {
        d.towns[this.townId].upgrades = t;
    }
    get cost() {
        return oe(this.config.cost) - d.towns[this.townId].upgradesPrepay[this.id];
    }
    get currencyType() {
        return oe(this.config.currencyType);
    }
    get isBought() {
        return Boolean(this.bits & (1 << this.id));
    }
    get effect() {
        return oe(this.config.effect);
    }
    get formattedEffect() {
        return this.config.formatEffect ? this.config.formatEffect(this.effect) : rn(this.effect, 2, 1);
    }
    get title() {
        return oe(this.config.title);
    }
    get description() {
        return oe(this.config.description);
    }
    get isUnlocked() {
        return this.config.isUnlocked === void 0 ? !0 : oe(this.config.isUnlocked);
    }
    get canAfford() {
        return this.isBought ? !1 : this.currencyType ? d.holding.resource === this.currencyType && d.holding.amount > 0 : d.money >= this.cost;
    }
    get canAffordWhole() {
        return this.isBought ? !1 : this.currencyType ? d.holding.resource === this.currencyType && d.holding.amount >= this.cost : d.money >= this.cost;
    }
    get prepay() {
        return d.towns[this.townId].upgradesPrepay[this.id];
    }
    set prepay(t) {
        d.towns[this.townId].upgradesPrepay[this.id] = t;
    }
    effectOrDefault(t) {
        return this.isBought ? this.effect : t;
    }
    buy() {
        if (!this.canAfford || this.isBought) return;
        const t = this.cost,
            s = this.currencyType;
        if (!this.canAffordWhole) {
            (this.prepay += d.holding.amount), (d.holding.amount = 0);
            return;
        }
        s ? ((d.holding.amount -= t), (this.prepay = 0)) : (d.money -= t), (this.bits |= 1 << this.id);
    }
}
class uu {
    constructor(t, s) {
        T(this, "config");
        T(this, "townId");
        T(this, "sidebarShop");
        T(this, "upgrades");
        if (t === void 0) throw "Unrecognised Town Type";
        (this.config = t), (this.townId = s), (this.sidebarShop = t.sidebarShop.map((n, o) => new au(n, s, o))), (this.upgrades = on(t.upgrades, (n) => new cu(n, s)));
    }
    get playerData() {
        return d.towns[this.townId];
    }
    get defaultMachines() {
        const t = We(this.config.defaultMachines.map((s) => Mt[s.type].newMachine(s.x, s.y))).mapToObject(
            (s, n) => n,
            (s) => s
        );
        for (const s of Object.values(t)) s.isDefault = !0;
        return t;
    }
    get defaultMachinesPrepay() {
        return Array(this.sidebarShop.length).fill(0);
    }
    get defaultUpgradesPrepay() {
        return Array(Object.keys(this.upgrades).length).fill(0);
    }
    get isUnlocked() {
        return this.config.isUnlocked === void 0 ? !0 : oe(this.config.isUnlocked);
    }
    get isFullyUpgraded() {
        return Object.values(this.upgrades).every((t) => !t.isUnlocked || t.isBought);
    }
    get hasPartialBuyableUpgrades() {
        return !this.hasWholeBuyableUpgrades && Object.values(this.upgrades).find((t) => t.canAfford) !== void 0;
    }
    get hasWholeBuyableUpgrades() {
        return Object.values(this.upgrades).find((t) => t.canAffordWhole) !== void 0;
    }
    returnHome() {
        (this.playerData.display.offset.x = 0), (this.playerData.display.offset.y = 0), (this.playerData.display.zoom = 1);
    }
    setOffset(t, s) {
        (this.playerData.display.offset.x = Math.max(Math.min(t, Rt), -Rt)), (this.playerData.display.offset.y = Math.max(Math.min(s, Dt), -Dt));
    }
    changeOffsetX(t) {
        this.playerData.display.offset.x = Math.max(Math.min(t + this.playerData.display.offset.x, Rt), -Rt);
    }
    changeOffsetY(t) {
        this.playerData.display.offset.y = Math.max(Math.min(t + this.playerData.display.offset.y, Dt), -Dt);
    }
    changeOffset(t, s) {
        this.changeOffsetX(t), this.changeOffsetY(s);
    }
}
class lu {
    constructor() {
        T(this, "towns");
        this.towns = new Map();
    }
    createAccessor() {
        return (t) => {
            if (t === "current") return this.towns.get(d.currentlyIn);
            if (this.towns.get(t) === void 0) {
                if (Hs.get(t) === void 0) throw `Unrecognised Town "${t}"`;
                this.towns.set(t, new uu(Hs.get(t), t));
            }
            return this.towns.get(t);
        };
    }
}
const Z = new lu().createAccessor(),
    Zo = {
        get currentMachines() {
            return Z("current").sidebarShop;
        },
        get currentUpgrades() {
            return Z("current").upgrades;
        },
    },
    Hs = new Map(),
    Kt = ["earth", "water", "clay", "wood", "bricks", "stone", "coal", "steam", "energy", "fire", "essence", "sand", "glass", "lava", "stoneDust", "vitriol", "iron", "lead", "copper", "silver", "gold", "quicksilver", "purity", "elixir"];
class fu {
    constructor(t, s) {
        T(this, "config");
        T(this, "type");
        (this.config = t), (this.type = s);
    }
    get colour() {
        return this.config.colour;
    }
    get value() {
        return this.config.value;
    }
    get description() {
        return this.config.description;
    }
    get hint() {
        return this.config.hint || "";
    }
    get isUnlocked() {
        return d.unlockedCurrencies[this.type];
    }
    set isUnlocked(t) {
        d.unlockedCurrencies[this.type] = t;
    }
    sell(t) {
        d.money += t * this.value;
    }
}
const du = {
        earth: { colour: "#008800", value: 0.1, description: "One of the basic elements. Produced by simple digging." },
        water: { colour: "#4296c7", value: 0.3, description: "One of the basic elements. Produced by collection by the river." },
        steam: { colour: "#8090a0", value: 0.4, description: "Useful for turning turbines." },
        clay: { colour: "#6e7379", value: 1.2, description: "Somewhat damp earth. Maybe we can take away the dampness.", hint: "The Tony Process invented in 1436 allows you to waterlog Earth." },
        bricks: { colour: "#aa5544", value: 2.2, description: "Sturdy kiln-fired material. Not very useful for alchemy, but useful for building." },
        wood: { colour: "#aa6644", value: 0.5, description: "One of the basic elements. Produced by basic extraction from trees." },
        coal: { colour: "#060302", value: 2.5, description: "Some Chinese scientist dug a hole in the ground and found this black tarry substance." },
        stone: { colour: "#888c8d", value: 1.5, description: "Not particularly useful on its own, but good for building." },
        energy: { colour: "#10c9d0", value: 3, description: "The ultimate enabler of all things alchemy." },
        sand: { colour: "#93a070", value: 1.1, description: "This powdery substance can be used to make a significantly less powdery one.", hint: "Maybe if you pound earth enough, it becomes something else" },
        glass: { colour: "#41919b", value: 3, description: "Missing the boro part of borosilicate. I'm sure it'll be fine.", hint: "A highly sought-after quartz-like material. What else has quartz, but isn't highly sought after?" },
        fire: { colour: "#ff8000", value: 12, description: "One of the basic elements. Produced by complicated extraction from coal.", hint: "The essence of heat." },
        essence: { colour: "#966fcf", value: 20, description: "The most essence-est of essences.", hint: "The essence. Just that." },
        lava: { colour: "#c83400", value: 15, description: "Now you have stone but hot. Please ask Vulcan for tips on safe handling.", hint: "It requires a bit more technique to heat stone, but it's doable." },
        vitriol: { colour: "#b3ab57", value: 20, description: "The element of Luna. The enabler of transmutation", hint: "The essence of Vulcan. Can dissolve most things." },
        stoneDust: {
            colour: "#8f806b",
            value: 1.5,
            description: `Not particularly useful on its own at all. But its high surface area make it a good reactant.
		If it even reacts with anything at all.`,
            hint: "Stones are hard to break, but not impossible.",
        },
        iron: { colour: "#696B5e", value: 10, description: "The basis of transmutation.", hint: "One of the goals of alchemy has always been to create precious elements from mundane ones." },
        lead: { colour: "#525a63", value: 20, description: "Very toxic, and very cheap too. Wonder if you could poison 1 or 2 people with it." },
        copper: { colour: "#cb6d41", value: 35, description: "Shiny red metal. Sadly circuitry hasn't been invented yet." },
        silver: { colour: "#a0a8ac", value: 60, description: "Shinier greyish metal. You're going into the noble metals now." },
        gold: { colour: "#debc35", value: 100, description: "If you were a Western Alchemist you'd be done here. But are you a Western Alchemist?" },
        quicksilver: { colour: "#876874", value: 200, description: "The element of Sol. The endpoint of transmutation." },
        purity: { colour: "#ffffff88", value: 0, description: "Was the glass sample pure? I sure hope so.", hint: "When there's no impurity present, there's nothing present. This is completely see-through." },
        elixir: { colour: "#6f2eb0", value: 0, description: "consumeCONSUMEconsumeCONSUMEconsume", hint: "consumeCONSUMEconsumeCONSUMEconsume" },
    },
    hr = [],
    me = (function () {
        const e = {};
        for (const t of Kt) {
            const s = new fu(du[t], t);
            (e[t] = s), hr.push(s);
        }
        return e;
    })();
Hs.set("home", {
    defaultMachines: [
        { type: "shoveller", x: -360, y: -270 },
        { type: "cistern", x: -90, y: -270 },
        { type: "quarry", x: 180, y: -270 },
        { type: "essencePurifier", x: -360, y: 90 },
    ],
    sidebarShop: [
        { type: "waterMixer", cost: 6 },
        { type: "furnaceBasic", cost: 12, currencyType: "wood" },
        { type: "steamEngine", cost: 800, isUnlocked: () => me.coal.isUnlocked },
        { type: "pulverizer", cost: 15, currencyType: "energy", isUnlocked: () => me.energy.isUnlocked },
        { type: "arcFurnace", cost: 15, currencyType: "fire", isUnlocked: () => me.energy.isUnlocked },
        { type: "transmuter", cost: 20, currencyType: "essence", isUnlocked: () => me.vitriol.isUnlocked },
        { type: "essencePurifier", cost: 8, currencyType: "copper", isUnlocked: () => me.iron.isUnlocked },
        { type: "elixirMaker", cost: 20, currencyType: "gold", isUnlocked: () => me.gold.isUnlocked },
        { type: "inputMerger", cost: 10, currencyType: "stone", isUnlocked: () => Z("home").upgrades.pipesBasic.isBought },
        { type: "autoSeller", cost: 0.2, currencyType: "energy", isUnlocked: () => Z("home").upgrades.pipesBasic.isBought },
    ],
    upgrades: {
        pipesBasic: {
            id: 0,
            cost: 30,
            currencyType: "bricks",
            title: "Pipes",
            description: `Unlock basic pipes.
				They transport resources based on the capacity of the attached input containers.`,
            effect: 0.02,
        },
        pipesSpeed1: { id: 1, cost: 13, currencyType: "energy", title: "Pipes II", description: "Increase efficiency of pipes by x4.", effect: 4, isUnlocked: () => Z("home").upgrades.pipesBasic.isBought },
        pipesSpeed2: { id: 2, cost: 80, currencyType: "fire", title: "Pipes III", description: "Increase efficiency of pipes by x2.", effect: 2, isUnlocked: () => Z("home").upgrades.pipesBasic.isBought },
        win: { id: 3, cost: 0.5, currencyType: "elixir", title: "########", description: "Consume the elixir.", effect: 1 },
    },
});
const gn = [
        (e) => {
            for (const t in e.towns.home.machines) {
                const s = e.towns.home.machines[t];
                s.type === "essencePurifier" && (s.upgrades[0] = 0);
            }
        },
        (e) => {
            e.holding.resource === "stonePowder" && (e.holding.resource = "stoneDust");
            for (const t in e.towns.home.machines) {
                const s = e.towns.home.machines[t];
                if (s.inputs) for (const n of s.inputs.flat()) n.resource === "stonePowder" && (n.resource = "stoneDust");
                if (s.outputs) for (const n of s.outputs.flat()) n.resource === "stonePowder" && (n.resource = "stoneDust");
            }
        },
        (e) => {
            for (const t in e.towns.home.machines) {
                const s = e.towns.home.machines[t];
                s.type === "elixirMaker" && s.outputs[0] && (e.producedElixir += s.outputs[0].amount);
            }
        },
        (e) => {
            (e.towns.home.display.offset = e.display.offset), delete e.display;
        },
    ],
    pu = { class: "c-modal__wrapper" },
    hu = { class: "c-modal__header" },
    mu = { key: 0, class: "c-modal__title" },
    gu = ee({
        __name: "ModalWrapper",
        setup(e) {
            function t() {
                var s;
                !R.isOpen || ((s = R.current.value) != null && s.hide ? R.current.value.hide() : R.hide());
            }
            return (s, n) => (
                m(),
                y("div", pu, [
                    h("div", hu, [h("span", { class: "fas fa-xmark c-modal__close-button", onClick: t }), s.$slots.header ? (m(), y("span", mu, [_t(s.$slots, "header", {}, void 0, !0)])) : J("", !0)]),
                    _t(s.$slots, "default", {}, void 0, !0),
                ])
            );
        },
    });
const ie = (e, t) => {
        const s = e.__vccOpts || e;
        for (const [n, o] of t) s[n] = o;
        return s;
    },
    xt = ie(gu, [["__scopeId", "data-v-e1978669"]]),
    ts = (e) => (Pe("data-v-cea6abf0"), (e = e()), Ce(), e),
    _u = ts(() => h("br", null, null, -1)),
    yu = { class: "c-modal__currency-hint-prompt" },
    vu = { class: "c-modal__currencies" },
    bu = { class: "c-emphasise-text" },
    wu = ts(() => h("br", null, null, -1)),
    Mu = ts(() => h("br", null, null, -1)),
    xu = ts(() => h("i", { class: "c-emphasise-text" }, "???", -1)),
    ku = ts(() => h("br", null, null, -1)),
    Eu = { key: 0 },
    Iu = ts(() => h("b", null, "Hint: ", -1)),
    Su = { key: 1 },
    Tu = ee({
        __name: "GlossaryModal",
        setup(e) {
            const t = D(!1);
            return (s, n) => (
                m(),
                fe(xt, null, {
                    header: de(() => [N(" The Elements, by Euler ")]),
                    default: de(() => [
                        _u,
                        h("div", yu, [N(" Enable hints: "), Hi(h("input", { "onUpdate:modelValue": n[0] || (n[0] = (o) => (t.value = o)), type: "checkbox" }, null, 512), [[zc, t.value]])]),
                        h("div", vu, [
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(
                                    x(hr),
                                    (o) => (
                                        m(),
                                        y(
                                            "div",
                                            { key: o.type, class: "c-modal__currency-entry c-tint", style: Me({ "--tint-background": o.colour, opacity: o.isUnlocked ? 1 : 0.6 }) },
                                            [
                                                o.isUnlocked
                                                    ? (m(), y(Y, { key: 0 }, [h("i", bu, P(x(ze)(o.type).capitalize), 1), wu, N(" Selling Price: $" + P(x($e)(o.value, 2, 1)) + " ", 1), Mu, h("i", null, P(o.description), 1)], 64))
                                                    : (m(), y(Y, { key: 1 }, [xu, ku, t.value ? (m(), y("i", Eu, [Iu, N(" " + P(o.hint || "This should be easy enough to figure out on your own."), 1)])) : (m(), y("i", Su, "????"))], 64)),
                                            ],
                                            4
                                        )
                                    )
                                ),
                                128
                            )),
                        ]),
                    ]),
                    _: 1,
                })
            );
        },
    });
const Ou = ie(Tu, [["__scopeId", "data-v-cea6abf0"]]),
    $u = (e) => (Pe("data-v-f9dc6708"), (e = e()), Ce(), e),
    Uu = $u(() =>
        h(
            "span",
            { class: "c-h2p__body" },
            [
                N(" NOTE: This game is not optimised for play on mobile devices, or anything that doesn't have mouse controls. "),
                h("br"),
                h("br"),
                h("table", null, [
                    h("tr", null, [h("td", null, "Left Click"), h("td", null, "Extract/Insert resources slowly")]),
                    h("tr", null, [h("td", null, "Right Click"), h("td", null, "Extract/Insert resources instantly")]),
                    h("tr", null, [h("td", null, "Arrow Keys/Dragging"), h("td", null, "Pan the viewing grid")]),
                    h("tr", null, [h("td", null, "Scrollwheel"), h("td", null, "Zoom in/out")]),
                    h("tr", null, [h("br")]),
                    h("tr", null, [h("td", null, "Glowing Green"), h("td", null, "Upgrade partially available")]),
                    h("tr", null, [h("td", null, "Glowing Yellow"), h("td", null, "Upgrade fully available")]),
                ]),
            ],
            -1
        )
    ),
    Pu = ee({
        __name: "H2PModal",
        setup(e) {
            return (t, s) => (m(), fe(xt, { class: "c-h2p" }, { header: de(() => [N(" How To Play ")]), default: de(() => [Uu]), _: 1 }));
        },
    });
const Cu = ie(Pu, [["__scopeId", "data-v-f9dc6708"]]),
    Au = { class: "c-modal__wrapper" },
    Ru = { class: "c-modal__header" },
    Du = { key: 0, class: "c-modal__title" },
    Lu = { class: "c-modal__bottom-row-buttons" },
    Fu = ee({
        __name: "ModalWrapperConfirm",
        emits: ["confirm", "cancel"],
        setup(e, { emit: t }) {
            function s() {
                o(), t("confirm");
            }
            function n() {
                o(), t("cancel");
            }
            function o() {
                var i;
                !R.isOpen || ((i = R.current.value) != null && i.hide ? R.current.value.hide() : R.hide());
            }
            return (i, r) => (
                m(),
                y("div", Au, [
                    h("div", Ru, [h("span", { class: "fas fa-xmark c-modal__close-button", onClick: o }), i.$slots.header ? (m(), y("span", Du, [_t(i.$slots, "header", {}, void 0, !0)])) : J("", !0)]),
                    _t(i.$slots, "default", {}, void 0, !0),
                    h("div", Lu, [
                        h("button", { class: "c-modal__option-button c-tint c-tint--green", onClick: s }, [_t(i.$slots, "confirmText", {}, () => [N(" Confirm ")], !0)]),
                        h("button", { class: "c-modal__option-button c-tint c-tint--red", onClick: n }, [_t(i.$slots, "cancelText", {}, () => [N(" Cancel ")], !0)]),
                    ]),
                ])
            );
        },
    });
const Bu = ie(Fu, [["__scopeId", "data-v-4220b535"]]),
    Nu = h("br", null, null, -1),
    Hu = h("br", null, null, -1),
    ju = ee({
        __name: "HardResetModal",
        setup(e) {
            return (t, s) => (
                m(),
                fe(
                    Bu,
                    {
                        onConfirm:
                            s[0] ||
                            (s[0] = (n) => {
                                x(Le).reset(), x(R).hide();
                            }),
                    },
                    {
                        header: de(() => [N(" Hard reset ")]),
                        default: de(() => [
                            N(" Are you sure you want to perform a hard reset? "),
                            Nu,
                            N(" Doing so will not give you any benefits, and your save data will be irretrievable. "),
                            Hu,
                            N(" Make a backup export first if you aren't sure. "),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    }),
    Nt = (e) => (Pe("data-v-c3646d8b"), (e = e()), Ce(), e),
    Yu = Nt(() => h("br", null, null, -1)),
    Xu = Nt(() =>
        h(
            "span",
            { class: "c-info__body" },
            [
                N(" This game was heavily inspired by "),
                h("a", { href: "https://nagshell.github.io/elemental-inception-incremental/", target: "_blank" }, " The First Alkahistorian "),
                N(" and I owe it for giving me this idea. If you're enjoying this game you will definitely enjoy that too. "),
                h("br"),
                h("br"),
                N(" If you want to contribute to this game, you may visit its github page below. Joining the discord for more in depth discussion of development work is also recommended. "),
                h("br"),
                h("br"),
                N(" Credits:"),
                h("br"),
                N(" Scarlet / Dystopia181: Main dev"),
                h("br"),
                N(" Brian bugh: Co-dev"),
                h("br"),
                h("br"),
                N(" BaineGames: Contributor "),
            ],
            -1
        )
    ),
    Wu = Nt(() => h("br", null, null, -1)),
    qu = Nt(() => h("br", null, null, -1)),
    zu = Nt(() => h("a", { href: "https://discord.gg/DVy4XjB", target: "_blank", class: "fa-brands fa-discord", title: "Discord" }, null, -1)),
    Ku = Nt(() => h("a", { href: "https://github.com/Dystopia-user181/The-Second-Alterhistorian", target: "_blank", class: "fa-brands fa-github", title: "Contribute" }, null, -1)),
    Vu = Nt(() => h("a", { href: "https://buymeacoffee.com/s.composer", target: "_blank", class: "fas fa-dollar-sign", title: "Donate" }, null, -1)),
    Zu = ee({
        __name: "InfoModal",
        setup(e) {
            return (t, s) => (m(), fe(xt, { class: "c-info" }, { header: de(() => [N(" Info ")]), default: de(() => [Yu, Xu, Wu, qu, zu, Ku, Vu]), _: 1 }));
        },
    });
const Gu = ie(Zu, [["__scopeId", "data-v-c3646d8b"]]),
    mr = (e) => (Pe("data-v-b930195f"), (e = e()), Ce(), e),
    Ju = mr(() => h("br", null, null, -1)),
    Qu = { class: "c-info__table" },
    el = mr(() => h("br", null, null, -1)),
    tl = ee({
        __name: "MachineInfoModal",
        props: { machine: {} },
        setup(e) {
            function t(s) {
                return su(s.slice(), Object.keys(me));
            }
            return (s, n) => (
                m(),
                y(
                    Y,
                    null,
                    [
                        N(P(s.machine.config.description) + " ", 1),
                        Ju,
                        h("div", Qu, [
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(
                                    s.machine.inputs.filter((o) => o.isUnlocked),
                                    (o) => (m(), y("span", { key: o.id }, [N(" Input " + P(o.id + 1) + " accepts: " + P(t(o.accepts) ? "all" : o.accepts.map((i) => x(ze)(i).capitalize).join(", ")) + " ", 1), el]))
                                ),
                                128
                            )),
                        ]),
                    ],
                    64
                )
            );
        },
    });
const sl = ie(tl, [["__scopeId", "data-v-b930195f"]]),
    nl = ["MACHINE_ADDED", "MACHINE_DELETED", "GAME_TICK_BEFORE", "GAME_TICK_AFTER", "ARROW_KEYUP", "ARROW_KEYDOWN", "ENTER_PRESSED", "ESCAPE_PRESSED"],
    js = new fi("GameEvents"),
    Go = [...nl, "UPDATE", "RENDER", "ERROR"],
    at = new fi("UIEvents");
let Jo = 0;
function je(e = {}) {
    const t = Jo;
    Xi(() => {
        if ((e.onMount && e.onMount(), e.update && (at.on(t, "UPDATE", e.update), e.update()), e.render && (at.on(t, "RENDER", e.render), e.render()), e.on)) {
            let s;
            for (s in e.on) at.on(t, s, e.on[s]);
        }
    }),
        Wi(() => {
            e.beforeUnmount && e.beforeUnmount(), at.offAll(t);
        }),
        Jo++;
}
const Ys = { width: D(innerWidth), height: D(innerHeight) };
addEventListener("resize", () => {
    (Ys.width.value = innerWidth), (Ys.height.value = innerHeight);
});
const Ae = (e) => (Pe("data-v-2d13b79b"), (e = e()), Ce(), e),
    ol = { key: 0, class: "c-production--average" },
    il = Ae(() => h("span", { class: "c-emphasise-text" }, "Inputs", -1)),
    rl = Ae(() => h("br", null, null, -1)),
    al = { key: 0 },
    cl = { key: 1 },
    ul = Ae(() => h("br", null, null, -1)),
    ll = Ae(() => h("br", null, null, -1)),
    fl = Ae(() => h("span", { class: "c-emphasise-text" }, "Outputs", -1)),
    dl = Ae(() => h("br", null, null, -1)),
    pl = { key: 0 },
    hl = { key: 1 },
    ml = Ae(() => h("br", null, null, -1)),
    gl = Ae(() => h("br", null, null, -1)),
    _l = Ae(() => h("span", { class: "c-emphasise-text" }, "Inputs", -1)),
    yl = Ae(() => h("br", null, null, -1)),
    vl = { key: 0 },
    bl = { key: 1 },
    wl = Ae(() => h("br", null, null, -1)),
    Ml = Ae(() => h("br", null, null, -1)),
    xl = Ae(() => h("span", { class: "c-emphasise-text" }, "Outputs", -1)),
    kl = Ae(() => h("br", null, null, -1)),
    El = { key: 0 },
    Il = { key: 1 },
    Sl = Ae(() => h("br", null, null, -1)),
    Tl = Ae(() => h("br", null, null, -1)),
    Ol = ee({
        __name: "MachineProductionModal",
        props: { machine: {} },
        setup(e) {
            let t = D([]),
                s = D([]);
            const n = D({ inputs: [], outputs: [] });
            let o = D(!1);
            function i() {
                (n.value.inputs = e.machine.inputs.map((a, c) => ({ lastResource: "none", time: 0, value: 0, isUnlocked: a.isUnlocked, id: c }))),
                    (n.value.outputs = e.machine.outputs.map((a, c) => ({ lastResource: "none", time: 0, value: 0, isUnlocked: a.isUnlocked, id: c }))),
                    (o.value = !0);
            }
            function r() {
                (n.value.inputs = []), (n.value.outputs = []), (o.value = !1);
            }
            return (
                je({
                    update() {
                        if (
                            ((t.value = e.machine.inputs.filter((a) => a.isUnlocked).map((a, c) => ({ resource: a.statistics.displayResource[0], amount: a.statistics.avgResourcePerSec, id: c }))),
                            (s.value = e.machine.outputs.filter((a) => a.isUnlocked).map((a, c) => ({ resource: a.config.produces.resource, amount: a.statistics.avgResourcePerSec, id: c }))),
                            o.value)
                        ) {
                            for (const a of e.machine.inputs) {
                                const c = n.value.inputs[a.id];
                                c.isUnlocked = a.isUnlocked;
                                const u = a.statistics.displayResource[0] === "none" ? c.lastResource : a.statistics.displayResource[0];
                                c.lastResource !== u && ((c.lastResource = u), (c.time = 0)), (c.value = (c.value * c.time + a.statistics.resourcePerSec) / (c.time + 1)), c.time++;
                            }
                            for (const a of e.machine.outputs) {
                                const c = n.value.outputs[a.id];
                                c.isUnlocked = a.isUnlocked;
                                const u = a.config,
                                    p = u.produces.amount <= 0 ? c.lastResource : u.produces.resource;
                                c.lastResource !== p && ((c.lastResource = p), (c.time = 0)), (c.value = (c.value * c.time + a.statistics.resourcePerSec) / (c.time + 1)), c.time++;
                            }
                        }
                    },
                }),
                (a, c) => (
                    m(),
                    y(
                        Y,
                        null,
                        [
                            o.value
                                ? (m(),
                                  y("span", ol, [
                                      t.value.length
                                          ? (m(),
                                            y(
                                                Y,
                                                { key: 0 },
                                                [
                                                    il,
                                                    rl,
                                                    (m(!0),
                                                    y(
                                                        Y,
                                                        null,
                                                        ve(
                                                            n.value.inputs.filter((u) => u.isUnlocked),
                                                            (u) => (
                                                                m(),
                                                                y("span", { key: u.id }, [
                                                                    N(" Input " + P(u.id + 1) + ": ", 1),
                                                                    u.value && n.value.inputs[u.id].lastResource !== "none"
                                                                        ? (m(), y("span", al, " Consumes " + P(x($e)(u.value, 2, 2, !0)) + " " + P(x(ze)(n.value.inputs[u.id].lastResource).capitalize) + "/s ", 1))
                                                                        : (m(), y("span", cl, " IDLE ")),
                                                                    ul,
                                                                ])
                                                            )
                                                        ),
                                                        128
                                                    )),
                                                    ll,
                                                ],
                                                64
                                            ))
                                          : J("", !0),
                                      s.value.length
                                          ? (m(),
                                            y(
                                                Y,
                                                { key: 1 },
                                                [
                                                    fl,
                                                    dl,
                                                    (m(!0),
                                                    y(
                                                        Y,
                                                        null,
                                                        ve(
                                                            n.value.outputs.filter((u) => u.isUnlocked),
                                                            (u) => (
                                                                m(),
                                                                y("span", { key: u.id }, [
                                                                    N(" Output " + P(u.id + 1) + ": ", 1),
                                                                    u.value
                                                                        ? (m(), y("span", pl, " Produces " + P(x($e)(u.value, 2, 2, !0)) + " " + P(x(ze)(n.value.outputs[u.id].lastResource).capitalize) + "/s ", 1))
                                                                        : (m(), y("span", hl, " IDLE ")),
                                                                    ml,
                                                                ])
                                                            )
                                                        ),
                                                        128
                                                    )),
                                                    gl,
                                                ],
                                                64
                                            ))
                                          : J("", !0),
                                  ]))
                                : (m(),
                                  y(
                                      Y,
                                      { key: 1 },
                                      [
                                          t.value.length
                                              ? (m(),
                                                y(
                                                    Y,
                                                    { key: 0 },
                                                    [
                                                        _l,
                                                        yl,
                                                        (m(!0),
                                                        y(
                                                            Y,
                                                            null,
                                                            ve(
                                                                t.value,
                                                                (u) => (
                                                                    m(),
                                                                    y("span", { key: u.id }, [
                                                                        N(" Input " + P(u.id + 1) + ": ", 1),
                                                                        u.amount && u.resource !== "none"
                                                                            ? (m(), y("span", vl, " Consumes " + P(x($e)(u.amount, 2, 2, !0)) + " " + P(x(ze)(u.resource).capitalize) + "/s ", 1))
                                                                            : (m(), y("span", bl, " IDLE ")),
                                                                        wl,
                                                                    ])
                                                                )
                                                            ),
                                                            128
                                                        )),
                                                        Ml,
                                                    ],
                                                    64
                                                ))
                                              : J("", !0),
                                          s.value.length
                                              ? (m(),
                                                y(
                                                    Y,
                                                    { key: 1 },
                                                    [
                                                        xl,
                                                        kl,
                                                        (m(!0),
                                                        y(
                                                            Y,
                                                            null,
                                                            ve(
                                                                s.value,
                                                                (u) => (
                                                                    m(),
                                                                    y("span", { key: u.id }, [
                                                                        N(" Output " + P(u.id + 1) + ": ", 1),
                                                                        u.amount ? (m(), y("span", El, " Produces " + P(x($e)(u.amount, 2, 2, !0)) + " " + P(x(ze)(u.resource).capitalize) + "/s ", 1)) : (m(), y("span", Il, " IDLE ")),
                                                                        Sl,
                                                                    ])
                                                                )
                                                            ),
                                                            128
                                                        )),
                                                        Tl,
                                                    ],
                                                    64
                                                ))
                                              : J("", !0),
                                      ],
                                      64
                                  )),
                            h("button", { onClick: c[0] || (c[0] = (u) => (o.value ? r() : i())) }, P(o.value ? "Taking Average..." : "Take Average"), 1),
                        ],
                        64
                    )
                )
            );
        },
    });
const $l = ie(Ol, [["__scopeId", "data-v-2d13b79b"]]),
    Ul = { class: "c-subtab-display__tab-button-container" },
    Pl = ["onClick"],
    Cl = ee({
        __name: "SubtabComponent",
        props: { subtabs: {} },
        emits: ["change-tab"],
        setup(e, { emit: t }) {
            const s = D(0);
            return (n, o) => (
                m(),
                y(
                    Y,
                    null,
                    [
                        h("div", Ul, [
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(
                                    n.subtabs,
                                    (i, r) => (
                                        m(),
                                        y(
                                            "button",
                                            {
                                                key: r,
                                                class: ge(["c-tab-button", [{ "c-tab-button--current": s.value === r }, i.buttonClass]]),
                                                onClick: () => {
                                                    (s.value = r), t("change-tab", r, i);
                                                },
                                            },
                                            P(i.name),
                                            11,
                                            Pl
                                        )
                                    )
                                ),
                                128
                            )),
                        ]),
                        _t(n.$slots, n.subtabs[s.value].name + "Tab", {}, void 0, !0),
                    ],
                    64
                )
            );
        },
    });
const gr = ie(Cl, [["__scopeId", "data-v-2c90232d"]]),
    Al = (e) => (Pe("data-v-9d0777d7"), (e = e()), Ce(), e),
    Rl = { class: "c-emphasise-text" },
    Dl = ["placeholder"],
    Ll = Al(() => h("br", null, null, -1)),
    Fl = ee({
        __name: "MachineStatisticsModal",
        props: { machine: {} },
        setup(e) {
            const t = we({
                get() {
                    return e.machine.data.name;
                },
                set(i) {
                    e.machine.data.name = i;
                },
            });
            let s = D(!1),
                n = D("INFO");
            const o = (i, r) => (n.value = r.name);
            return (
                je({
                    on: {
                        ENTER_PRESSED() {
                            s.value = !1;
                        },
                    },
                }),
                (i, r) => (
                    m(),
                    fe(
                        xt,
                        { class: "c-machine-statistics-modal" },
                        {
                            default: de(() => [
                                h("span", Rl, [
                                    N(P(n.value) + " (", 1),
                                    s.value
                                        ? Hi((m(), y("input", { key: 0, "onUpdate:modelValue": r[0] || (r[0] = (a) => (t.value = a)), maxlength: "20", size: "14", placeholder: x(ze)(i.machine.name).capitalize }, null, 8, Dl)), [
                                              [qc, t.value],
                                          ])
                                        : (m(), y(Y, { key: 1 }, [N(P(i.machine.displayName), 1)], 64)),
                                    h("button", { class: ge(["fas fa-pen-to-square c-info__edit-name", { "c-info__edit-name--editing": s.value }]), onClick: r[1] || (r[1] = (a) => (s.value = !s.value)) }, null, 2),
                                    N(" ) "),
                                ]),
                                Ll,
                                pe(
                                    gr,
                                    { subtabs: [{ name: "INFO" }, { name: "PRODUCTION" }], onChangeTab: o },
                                    { INFOTab: de(() => [pe(sl, { machine: i.machine }, null, 8, ["machine"])]), PRODUCTIONTab: de(() => [pe($l, { machine: i.machine }, null, 8, ["machine"])]), _: 1 }
                                ),
                            ]),
                            _: 1,
                        }
                    )
                )
            );
        },
    });
const Bl = ie(Fl, [["__scopeId", "data-v-9d0777d7"]]),
    Nl = ee({
        __name: "ResourceSquare",
        props: { type: {}, size: { default: "1em" } },
        setup(e) {
            return (t, s) => (x(me)[t.type] ? (m(), y("div", { key: 0, class: "c-resource-square", style: Me({ "background-color": x(me)[t.type].colour, width: t.size, height: t.size }) }, null, 4)) : J("", !0));
        },
    });
const Hl = ie(Nl, [["__scopeId", "data-v-7e02044d"]]),
    eo = ee({
        __name: "CostDisplay",
        props: { cost: {}, type: {} },
        setup(e) {
            return (t, s) => (
                m(),
                y("span", null, [
                    N(" Cost: " + P(t.type === void 0 ? "$" : "") + " " + P(x($e)(t.cost, 2, t.cost < 1 ? 2 : 1)) + " " + P(t.type === null ? "???" : t.type) + " ", 1),
                    t.type ? (m(), fe(Hl, { key: 0, type: t.type }, null, 8, ["type"])) : J("", !0),
                ])
            );
        },
    }),
    to = (e) => (Pe("data-v-789f2ef5"), (e = e()), Ce(), e),
    jl = { class: "c-emphasise-text" },
    Yl = to(() => h("br", null, null, -1)),
    Xl = { key: 0 },
    Wl = to(() => h("br", null, null, -1)),
    ql = { key: 1 },
    zl = to(() => h("br", null, null, -1)),
    Kl = ee({
        __name: "MachineUpgrade",
        props: { upgrade: {} },
        setup(e) {
            return (t, s) => (
                m(),
                y(
                    "button",
                    { class: ge(["c-machine-upgrade", { "c-machine-upgrade--bought": t.upgrade.maxed, disabled: !t.upgrade.maxed && !t.upgrade.canAfford }]), onClick: s[0] || (s[0] = (n) => t.upgrade.buy()) },
                    [
                        h("span", jl, P(t.upgrade.title), 1),
                        Yl,
                        N(" " + P(t.upgrade.description) + " ", 1),
                        t.upgrade.formattedEffect ? (m(), y("span", Xl, [Wl, N(" Currently: " + P(t.upgrade.formattedEffect), 1)])) : J("", !0),
                        t.upgrade.maxed ? J("", !0) : (m(), y("span", ql, [zl, pe(eo, { cost: t.upgrade.cost, type: t.upgrade.currencyType }, null, 8, ["cost", "type"])])),
                    ],
                    2
                )
            );
        },
    });
const Vl = ie(Kl, [["__scopeId", "data-v-789f2ef5"]]),
    Zl = { key: 0 },
    Gl = ee({
        __name: "MachineUpgradeModal",
        props: { machine: {} },
        setup(e) {
            const t = we(() => Object.values(e.machine.upgrades || {}).filter((s) => s.isUnlocked));
            return (s, n) => (
                m(),
                fe(
                    xt,
                    { class: "c-machine-upgrade-modal" },
                    {
                        header: de(() => [N(" Upgrades (" + P(s.machine.displayName) + ") ", 1)]),
                        default: de(() => [
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(t.value, (o) => (m(), fe(Vl, { key: o.id, upgrade: o }, null, 8, ["upgrade"]))),
                                128
                            )),
                            t.value.length ? J("", !0) : (m(), y("span", Zl, " No upgrades, sorry :( ")),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    });
const Jl = ie(Gl, [["__scopeId", "data-v-50937dca"]]),
    so = (e) => (Pe("data-v-58e65d59"), (e = e()), Ce(), e),
    Ql = so(() => h("br", null, null, -1)),
    ef = ["innerHTML"],
    tf = so(() => h("br", null, null, -1)),
    sf = so(() => h("br", null, null, -1)),
    nf = ee({
        __name: "MessageModal",
        setup(e) {
            function t() {
                var s;
                !R.isOpen || ((s = R.current.value) != null && s.hide ? R.current.value.hide() : R.hide());
            }
            return (s, n) => (
                m(),
                fe(xt, null, { header: de(() => [N(" Info ")]), default: de(() => [Ql, h("span", { class: "c-message-modal__text", innerHTML: x(R).message.text.value }, null, 8, ef), tf, sf, h("button", { onClick: t }, " Okay ")]), _: 1 })
            );
        },
    });
const of = ie(nf, [["__scopeId", "data-v-58e65d59"]]),
    no = (e) => (Pe("data-v-bad790a4"), (e = e()), Ce(), e),
    rf = no(() => h("br", null, null, -1)),
    af = no(() => h("br", null, null, -1)),
    cf = no(() => h("br", null, null, -1)),
    uf = ee({
        __name: "RemoveMachineModal",
        props: { machine: {} },
        setup(e) {
            function t() {
                be.remove(e.machine), R.hide();
            }
            function s() {
                R.hide();
            }
            return (n, o) => (
                m(),
                fe(
                    xt,
                    { class: "c-machine-production-modal" },
                    {
                        header: de(() => [N(" Remove Machine (" + P(n.machine.displayName) + ") ", 1)]),
                        default: de(() => [
                            rf,
                            N(" Are you sure you want to remove this machine? Alchemy resources inside the machine will be lost! "),
                            af,
                            cf,
                            h("button", { onClick: s }, " Cancel "),
                            h("button", { onClick: t }, " Confirm "),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    });
const lf = ie(uf, [["__scopeId", "data-v-bad790a4"]]),
    _r = (e) => (Pe("data-v-d35b405d"), (e = e()), Ce(), e),
    ff = _r(() => h("br", null, null, -1)),
    df = _r(() => h("br", null, null, -1)),
    pf = ee({
        __name: "SettingsModal",
        setup(e) {
            function t() {
                const o = document.createElement("input");
                (o.type = "file"),
                    (o.onchange = (i) => {
                        Le.importSave(i);
                    }),
                    o.click();
            }
            function s(o) {
                return d.options[o] ? "ON" : "OFF";
            }
            function n(o) {
                d.options[o] = Number(!d.options[o]);
            }
            return (o, i) => (
                m(),
                fe(
                    xt,
                    { class: "c-modal__settings" },
                    {
                        header: de(() => [N(" Settings ")]),
                        default: de(() => [
                            h("button", { class: "c-settings-button", onClick: i[0] || (i[0] = (r) => x(Le).savePlayer()) }, " Save "),
                            h("button", { class: "c-settings-button", onClick: i[1] || (i[1] = (r) => n("autosave")) }, " Autosave: " + P(s("autosave")), 1),
                            ff,
                            h("button", { class: "c-settings-button", onClick: i[2] || (i[2] = (r) => x(Le).exportSave()) }, " Export Save "),
                            h("button", { class: "c-settings-button", onClick: t }, " Import Save "),
                            h("button", { class: "c-settings-button", onClick: i[3] || (i[3] = (r) => x(R).hardReset.show()) }, " HARD RESET "),
                            df,
                            h("button", { class: "c-settings-button", onClick: i[4] || (i[4] = (r) => n("showGridlines")) }, " Show Gridlines: " + P(s("showGridlines")), 1),
                            h(
                                "button",
                                {
                                    class: ge(["c-settings-button", { disabled: !x(d).options.showGridlines }]),
                                    onClick:
                                        i[5] ||
                                        (i[5] = (r) => {
                                            x(d).options.showGridlines && n("snapToGrid");
                                        }),
                                },
                                " Snap To Grid: " + P(s("snapToGrid")),
                                3
                            ),
                            h(
                                "button",
                                {
                                    class: "c-settings-button",
                                    onClick:
                                        i[6] ||
                                        (i[6] = (r) => {
                                            n("minimap");
                                        }),
                                },
                                " Show Minimap: " + P(s("minimap")),
                                1
                            ),
                        ]),
                        _: 1,
                    }
                )
            );
        },
    });
const hf = ie(pf, [["__scopeId", "data-v-d35b405d"]]);
class lt {
    constructor(t, s = 0) {
        T(this, "_component");
        T(this, "_props");
        T(this, "_priority");
        T(this, "afterHide");
        (this._component = t), (this._props = {}), (this._priority = s);
    }
    show(t) {
        return (
            (this._props = Object.assign({}, t)),
            R.queue.unshift(this),
            R.sortModalQueue(),
            {
                then: (n) => {
                    this.afterHide = n;
                },
            }
        );
    }
    get isOpen() {
        return R.current.value === this;
    }
    get component() {
        return this._component;
    }
    get props() {
        return this._props;
    }
    get priority() {
        return this._priority;
    }
}
const R = {
        current: Ct(void 0),
        queue: [],
        hide() {
            const e = R.queue.shift();
            e && (e.afterHide && e.afterHide(), delete e.afterHide), R.queue.length === 0 ? (R.current.value = void 0) : (R.current.value = R.queue[0]);
        },
        hideAll() {
            for (; R.queue.length; ) R.queue[0].hide ? R.queue[0].hide() : R.hide();
            R.current.value = void 0;
        },
        sortModalQueue() {
            const e = R.queue;
            e.sort((s, n) => n.priority - s.priority);
            const t = [...new Set(e)];
            (R.queue = t), (R.current.value = t[0]);
        },
        get isOpen() {
            return R.current.value !== void 0;
        },
        glossary: new lt(Ou),
        h2p: new lt(Cu),
        hardReset: new lt(ju),
        info: new lt(Gu),
        machineUpgrades: new lt(Jl),
        machineStatistics: new lt(Bl),
        removeMachine: new lt(lf),
        settings: new lt(hf),
        message: new (class extends lt {
            constructor(t, s = 0) {
                super(t, s);
                T(this, "queue");
                T(this, "text", D(""));
                this.queue = [];
            }
            showText(t) {
                return this.queue.length || (this.text.value = t), this.queue.push(t), super.show();
            }
            hide() {
                this.queue.length <= 1 && R.hide(), this.queue.shift(), this.queue && this.queue.length === 0 ? (this.text.value = "") : (this.text.value = this.queue[0]);
            }
        })(of, 2),
    },
    Le = {
        defaultStart() {
            return {
                money: 0,
                towns: { home: { machines: Z("home").defaultMachines, upgrades: 0, machinesPrepay: Z("home").defaultMachinesPrepay, upgradesPrepay: Z("home").defaultUpgradesPrepay, display: { offset: { x: 0, y: 0 }, zoom: 1 } } },
                currentlyIn: "home",
                holding: { resource: "earth", amount: 0 },
                unlockedCurrencies: on(me, () => !1),
                fastTime: 0,
                lastUpdateTime: Date.now(),
                migrations: gn.length,
                producedElixir: 0,
                finishedEndCutscene: !1,
                vitalMarker: Le.storageKey,
                options: { autosave: 1, exportCount: 0, showGridlines: 1, snapToGrid: 1, minimap: 1 },
            };
        },
        storageKey: "igj2022-scarlet-summer-alterhistorian2",
        load(e) {
            Object.assign(d, Le.defaultStart()), e && this.loadAndMigrateSave(e), this.fixMachines(), Hf(), (d.fastTime += (Date.now() - d.lastUpdateTime) / 1e3), (d.lastUpdateTime = Date.now());
        },
        loadAndMigrateSave(e) {
            pr(d, e);
            for (const t in d.towns) {
                const s = t;
                d.towns[s].machines = e.towns[s].machines;
            }
            for (; d.migrations < gn.length; d.migrations++) gn[d.migrations](d);
        },
        loadSave() {
            try {
                const e = localStorage.getItem(this.storageKey);
                this.load(e ? JSON.parse(e) : void 0);
            } catch {
                this.load(),
                    R.message.showText(`
			The game is unable to save, possibly because you are in incognito. Please export your save
			manually before closing the game.
			`);
            }
        },
        savePlayer() {
            d.vitalMarker === Le.storageKey && localStorage.setItem(this.storageKey, JSON.stringify(Q(d)));
        },
        fixMachines() {
            for (const e in d.towns) {
                const t = e;
                for (const n in d.towns[t].machines) {
                    const o = d.towns[t].machines[n];
                    Qc(o);
                }
                const s = Z(t).defaultMachines;
                for (const n of Object.values(s)) {
                    if (Object.values(d.towns[t].machines).find((i) => i.type === n.type && i.isDefault)) continue;
                    let o = 0;
                    if (!d.towns[t].machines[o]) {
                        d.towns[t].machines[o] = n;
                        continue;
                    }
                    for (; d.towns[t].machines[o]; )
                        if ((o++, !d.towns[t].machines[o])) {
                            d.towns[t].machines[o] = n;
                            break;
                        }
                }
            }
        },
        reset() {
            Le.load(), Le.savePlayer();
        },
        exportSave() {
            const e = `${new Date(Date.now() - new Date().getTimezoneOffset() * 60 * 1e3).toISOString().split("T")[0]} ${new Date().toLocaleTimeString(void 0, { hour12: !1 })}`;
            d.options.exportCount++, nu(`Alterhistorian Save #${d.options.exportCount} (${e})`, window.btoa(JSON.stringify(Q(d))));
        },
        importSave(e) {
            if (e.target.files.length === 0) return;
            const t = new FileReader();
            (t.onload = function () {
                let s = t.result;
                if (typeof s != "string") {
                    R.message.showText("Invalid savefile format.");
                    return;
                }
                try {
                    s = window.atob(s);
                } catch {
                    R.message.showText("Invalid savefile format.");
                    return;
                }
                const n = JSON.parse(s);
                if (typeof n != "object" || n.vitalMarker !== Le.storageKey) {
                    R.message.showText("Invalid savefile format.");
                    return;
                }
                Le.load(n), Le.savePlayer();
            }),
                t.readAsText(e.target.files[0]);
        },
    },
    d = bs({});
(/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/u.test(location.href) || location.href.includes("localhost")) && (window.player = d);
setTimeout(() => Le.loadSave(), 0);
window.saveInterval = setInterval(() => {
    d.options.autosave && Le.savePlayer();
}, 1e4);
const _s = {},
    Ge = { home: [] };
class yr {
    constructor(t) {
        T(this, "_volume");
        T(this, "data");
        T(this, "statistics");
        T(this, "maxDiff", 0);
        (this.data = t), (this._volume = D(dr(this.data))), (this.statistics = { displayResource: bs(["none", 1 / 0]), lastItem: We(this.data).last, resourcePerSec: 0, avgResourcePerSec: 0 });
    }
    get capacity() {
        return 1 / 0;
    }
    get volume() {
        return Math.max(this._volume.value, 0);
    }
    set volume(t) {
        this._volume.value = t;
    }
    get spaceLeft() {
        return this.capacity - this.volume;
    }
    get isCapped() {
        return this.spaceLeft <= Number.EPSILON;
    }
    addToStack(t) {
        const s = eu(this.data, t, 0, { spaceLeft: this.spaceLeft });
        return (this.volume += s), (this.statistics.lastItem = We(this.data).last || void 0), s;
    }
    removeFromStack(t) {
        const s = tu(this.data, t);
        return this.data.length ? (this.volume -= s) : (this.volume = 0), (this.statistics.lastItem = We(this.data).last), s;
    }
    unclog() {
        for (let t = 0; t < this.data.length; t++) for (; this.data[t] && this.data[t].amount < 0.003; ) (this.volume -= this.data[t].amount), this.data.splice(t, 1);
        this.statistics.lastItem = We(this.data).last;
    }
}
class mf {
    constructor(t, s) {
        T(this, "_config");
        T(this, "_machine");
        (this._config = t), (this._machine = s);
    }
    get parentMachine() {
        return this._machine;
    }
    get capacity() {
        return oe(this._config.capacity, this._machine);
    }
    get consumes() {
        return oe(this._config.consumes, this._machine);
    }
    get accepts() {
        return oe(this._config.accepts, this._machine);
    }
    get label() {
        return oe(this._config.label, this._machine);
    }
    get isUnlocked() {
        return this._config.isUnlocked === void 0 ? !0 : oe(this._config.isUnlocked, this._machine);
    }
}
class gf extends yr {
    constructor(s, n) {
        super(s.data.inputs[n]);
        T(this, "_config");
        T(this, "_id");
        (this._config = new mf(s.config.inputs[n], s)), (this._id = n);
    }
    get id() {
        return this._id;
    }
    get config() {
        return this._config;
    }
    get capacity() {
        return this._config.capacity;
    }
    get consumes() {
        return this._config.consumes;
    }
    get accepts() {
        return this._config.accepts;
    }
    get label() {
        return this._config.label;
    }
    get isUnlocked() {
        return this._config.isUnlocked;
    }
    getConsumesStatistic(s) {
        return typeof this.config.consumes == "object" ? Math.min(this.config.consumes.amount, (this.config.consumes.maximum / s) * 1.1) : this.config.consumes;
    }
    updateStatistics(s) {
        var i;
        const n = this.statistics,
            o = this.data;
        o.length
            ? ((n.displayResource[0] = ((i = We(o).last) == null ? void 0 : i.resource) || "none"), (n.displayResource[1] = this.config.parentMachine.updates))
            : this.config.parentMachine.updates - 5 > this.statistics.displayResource[1] && ((n.displayResource[0] = "none"), (n.displayResource[1] = 1 / 0)),
            (n.resourcePerSec = this.getConsumesStatistic(s)),
            (n.avgResourcePerSec *= 0.9),
            (n.avgResourcePerSec += 0.1 * n.resourcePerSec),
            n.avgResourcePerSec < 1e-6 && (n.avgResourcePerSec = 0);
    }
}
class _f {
    constructor(t, s) {
        T(this, "_config");
        T(this, "_machine");
        (this._config = t), (this._machine = s);
    }
    get parentMachine() {
        return this._machine;
    }
    get capacity() {
        return oe(this._config.capacity, this._machine);
    }
    get produces() {
        return oe(this._config.produces, this._machine);
    }
    get requires() {
        return oe(this._config.requires, this._machine);
    }
    get requiresList() {
        return oe(this._config.requiresList, this._machine);
    }
    get id() {
        return this._config.id;
    }
    get isUnlocked() {
        return this._config.isUnlocked === void 0 ? !0 : oe(this._config.isUnlocked, this._machine);
    }
}
class yf extends yr {
    constructor(s, n) {
        super(s.data.outputs[n]);
        T(this, "_config");
        T(this, "_id");
        T(this, "outputDiff", 0);
        (this._config = new _f(s.config.outputs[n], s)), (this._id = n);
    }
    get id() {
        return this._id;
    }
    get config() {
        return this._config;
    }
    get capacity() {
        return this._config.capacity;
    }
    get produces() {
        return this._config.produces;
    }
    get requires() {
        return this._config.requires;
    }
    get requiresList() {
        return this._config.requiresList;
    }
    get isUnlocked() {
        return this._config.isUnlocked;
    }
    getProducesStatistic(s) {
        return (this.outputDiff * this.config.produces.amount) / s;
    }
    updateStatistics(s) {
        var i;
        const n = this.statistics,
            o = this.data;
        o.length
            ? ((n.displayResource[0] = ((i = We(o).last) == null ? void 0 : i.resource) || "none"), (n.displayResource[1] = this.config.parentMachine.updates))
            : this.config.parentMachine.updates - 5 > this.statistics.displayResource[1] && ((n.displayResource[0] = "none"), (n.displayResource[1] = 1 / 0)),
            (n.resourcePerSec = this.getProducesStatistic(s)),
            (n.avgResourcePerSec *= 0.9),
            (n.avgResourcePerSec += 0.1 * n.resourcePerSec),
            n.avgResourcePerSec < 1e-6 && (n.avgResourcePerSec = 0);
    }
}
class vf {
    constructor(t, s, n) {
        T(this, "_parentMachine");
        T(this, "_config");
        T(this, "_index");
        (this._parentMachine = t), (this._config = s), (this._index = n);
    }
    get effect() {
        return oe(this._config.effect, this.count);
    }
    get formattedEffect() {
        return this._config.formatEffect ? this._config.formatEffect(this.effect) : rn(this.effect, 2, 1);
    }
    get cost() {
        return oe(this._config.cost, this.count) - this.prepay;
    }
    get count() {
        return this._parentMachine.data.upgrades[this.id];
    }
    set count(t) {
        this._parentMachine.data.upgrades[this.id] = t;
    }
    get currencyType() {
        return oe(this._config.currencyType, this.count);
    }
    get description() {
        return oe(this._config.description, this);
    }
    get id() {
        return this._index;
    }
    get maxed() {
        return this.count >= this._config.max;
    }
    get title() {
        return oe(this._config.title, this);
    }
    get prepay() {
        var t;
        return (t = this._parentMachine.data.upgradesPrepay[this.id]) != null ? t : 0;
    }
    get canAfford() {
        return this.maxed || this.currencyType === null ? !1 : this.currencyType ? d.holding.resource === this.currencyType && d.holding.amount : d.money >= this.cost;
    }
    get canAffordWhole() {
        var t;
        return this.maxed || this.currencyType === null ? !1 : this.currencyType ? d.holding.resource === this.currencyType && ((t = d.holding.amount) != null ? t : 0) >= this.cost : d.money >= this.cost;
    }
    get isUnlocked() {
        var t, s, n;
        return (n = (s = (t = this._config).isUnlocked) == null ? void 0 : s.call(t, this._parentMachine)) != null ? n : !0;
    }
    buy() {
        var t;
        if (!(!this.canAfford || this.maxed)) {
            if (!this.canAffordWhole) {
                (this._parentMachine.data.upgradesPrepay[this.id] += (t = d.holding.amount) != null ? t : 0), (d.holding.amount = 0);
                return;
            }
            if ((isNaN(this.count) && (this.count = 0), this.currencyType)) {
                d.holding.amount && (d.holding.amount -= this.cost), this.count++, (this._parentMachine.data.upgradesPrepay[this.id] = 0);
                return;
            }
            (d.money -= this.cost), this.count++;
        }
    }
}
class bf {
    constructor(t, s) {
        T(this, "_data");
        T(this, "_id");
        T(this, "_townType");
        (this._townType = t), (this._id = s), (this._data = d.towns[this.townType].machines[this.id]);
    }
    get data() {
        return this._data;
    }
    get height() {
        return 270;
    }
    get id() {
        return this._id;
    }
    get townType() {
        return this._townType;
    }
    get town() {
        return console.warn("Machine.town is deprecated, use Machine.townType instead"), this._townType;
    }
    moveTo(t, s) {
        const n = Rt,
            o = Dt;
        let i, r;
        if (((i = t != null ? t : this.data.x), (r = s != null ? s : this.data.y), d.options.snapToGrid && d.options.showGridlines)) {
            const a = fr;
            Math.abs(Vo(i, a) - a / 2) > a * 0.4 && Math.abs(Vo(r, a) - a / 2) > a * 0.4 && ((i = Math.round(i / a) * a), (r = Math.round(r / a) * a));
        }
        (this.data.x = Math.max(Math.min(i, n), -n)), (this.data.y = Math.max(Math.min(r, o), -o));
    }
    changePositionBy(t, s) {
        this.moveTo(this.data.x + t, this.data.y + s);
    }
}
function qe(e) {
    return class extends bf {
        constructor(s, n) {
            var o;
            super(s, n);
            T(this, "_inputs");
            T(this, "_isUpgradeable", !0);
            T(this, "_meta");
            T(this, "_outputs");
            T(this, "_pipes", []);
            T(this, "_upgrades");
            T(this, "isNew", !1);
            T(this, "updates", 0);
            T(this, "outputDiffs", {});
            (this._upgrades = on(e.upgrades, (i, r) => new vf(this, i, r))),
                (this._isUpgradeable = Object.keys(this._upgrades).length > 0),
                (this._inputs = e.inputs.map((i, r) => new gf(this, r))),
                (this._outputs = e.outputs.map((i, r) => new yf(this, r))),
                (this._meta = (o = e.meta) == null ? void 0 : o.call(e)),
                (this.outputDiffs = Object.fromEntries(
                    e.outputs.map((i, r) => {
                        var a;
                        return [(a = i.id) != null ? a : r.toString(), 0];
                    })
                )),
                Promise.resolve().then(() => this.updatePipes());
        }
        get meta() {
            return this._meta;
        }
        get config() {
            return e;
        }
        get name() {
            return e.name;
        }
        get displayName() {
            return this.data.name || ze(this.name).capitalize;
        }
        get inputs() {
            return this._inputs;
        }
        get isUpgradeable() {
            return this._isUpgradeable;
        }
        get outputs() {
            return this._outputs;
        }
        get pipes() {
            return this._pipes;
        }
        get upgrades() {
            return this._upgrades;
        }
        get isFullyUpgraded() {
            return this.isUpgradeable && Object.values(this._upgrades).every((s) => !s.isUnlocked || s.maxed);
        }
        get hasPartialBuyableUpgrades() {
            return this.isUpgradeable && !this.hasWholeBuyableUpgrades && Object.values(this._upgrades).some((s) => s.canAfford);
        }
        get hasWholeBuyableUpgrades() {
            return this.isUpgradeable && Object.values(this._upgrades).some((s) => s.canAffordWhole);
        }
        addPipe(s, n, o) {
            this.data.pipes[o].push([s.id, n]), Ge[this.townType].push({ out: [this, this._outputs[o]], in: [s, s.inputs[n]] }), this.updatePipes();
        }
        removePipe(s, n) {
            for (let o = 0; o < this.data.pipes.length; o++)
                for (let i = 0; i < this.data.pipes[o].length; i++)
                    if (this.data.pipes[o][i][0].toString() === s.id.toString() && this.data.pipes[o][i][1] === n) {
                        const r = Ge[this.townType].findIndex(
                            (a) => a.out[0].id.toString() === this.id.toString() && a.out[1].id.toString() === this.outputs[o].id.toString() && a.in[0].id.toString() === s.id.toString() && a.in[1].id.toString() === s.inputs[n].id.toString()
                        );
                        return r === -1 ? at.dispatch("ERROR", "Something probably went wrong when deleting this pipe.") : Ge[this.townType].splice(r, 1), this.data.pipes[o].splice(i, 1), this.updatePipes(), !0;
                    }
            return !1;
        }
        removeAllPipes(s) {
            for (let n = 0; n < this.data.pipes.length; n++)
                for (let o = 0; o < this.data.pipes[n].length; o++)
                    for (; this.data.pipes[n][o] && this.data.pipes[n][o][0].toString() === s.id.toString(); ) {
                        const i = Ge[this.townType].findIndex(
                            (r) =>
                                r.out[0].id.toString() === this.id.toString() &&
                                r.out[1].id.toString() === this.outputs[n].id.toString() &&
                                r.in[0].id.toString() === s.id.toString() &&
                                r.in[1].id.toString() === this.data.pipes[n][o][1].toString()
                        );
                        Ge[this.townType].splice(i, 1), this.data.pipes[n].splice(o, 1);
                    }
            this.updatePipes();
        }
        updatePipes() {
            this._pipes = this.data.pipes.map((s) =>
                s.map((n) => {
                    const o = _s[this.townType];
                    if (!o) throw `MachinesById is returning an invalid list for ${this.townType}`;
                    const i = o[n[0]];
                    return [i, i.inputs[n[1]]];
                })
            );
        }
        inputItem(s) {
            return this._inputs[s].statistics.lastItem;
        }
        outputItem(s) {
            return this._outputs[s].statistics.lastItem;
        }
        static get config() {
            return e;
        }
        static newMachine(s, n) {
            return {
                x: s,
                y: n,
                type: e.name,
                pipes: Array.from(Array(e.outputs ? e.outputs.length : 0), () => []),
                isDefault: !1,
                inputs: Array.from(Array(e.inputs.length), () => []),
                outputs: Array.from(Array(e.outputs.length), () => []),
                upgrades: Array(Object.values(e.upgrades).length).fill(0),
                upgradesPrepay: Array(Object.values(e.upgrades).length).fill(0),
            };
        }
    };
}
function ss(e) {
    return Object.fromEntries(e.map((t) => [t.input.resource, t]));
}
const wf = ["iron", "lead", "copper", "silver", "gold", "quicksilver"],
    vr = [
        { input: { resource: "clay", amount: 1 }, output: { resource: "bricks", amount: 1 }, energyUsage: 0.08 },
        { input: { resource: "water", amount: 1.5 }, output: { resource: "steam", amount: 1.5 }, energyUsage: 0.08 },
        { input: { resource: "sand", amount: 1 }, output: { resource: "glass", amount: 0.7 }, energyUsage: 0.15 },
        { input: { resource: "stone", amount: 0.5 }, output: { resource: "lava", amount: 0.1 }, energyUsage: 0.5 },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, energyUsage: 0 },
    ],
    oo = ss(vr);
function Qo(e) {
    return oo[e.meta.inputResource || "none"].input.amount * (e.meta.catalystActive ? 1.6 : 1) * e.upgrades.velocity.effect;
}
function ei(e) {
    var t, s;
    return ((s = (t = oo[e.meta.inputResource || "none"]) == null ? void 0 : t.energyUsage) != null ? s : 0) * Math.sqrt(e.upgrades.velocity.effect);
}
function Mf(e) {
    const t = oo[e.meta.inputResource || "none"].output;
    return { resource: t.resource, amount: t.amount * (e.meta.catalystActive ? 1.6 : 1) * e.upgrades.velocity.effect };
}
const xf = qe({
        name: "arcFurnace",
        meta: () => ({ inputResource: "none", catalystActive: !1 }),
        inputs: [
            {
                accepts: (e) =>
                    vr
                        .filter((t) => (t.isUnlocked ? oe(t.isUnlocked, e) : !0))
                        .map((t) => t.input.resource)
                        .filter((t) => t !== "none"),
                capacity: () => 40,
                consumes: (e) => {
                    const t = Qo(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
            {
                accepts: ["energy"],
                capacity: () => 40,
                consumes: (e) => {
                    const t = ei(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
            {
                accepts: ["fire"],
                capacity: () => 20,
                consumes: () => 0.02,
                label: `Catalyst
(5 Fire)`,
                isUnlocked: (e) => Boolean(e.upgrades.cat.effect),
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: () => 40,
                produces: (e) => Mf(e),
                requiresList: (e) => [
                    { resource: e.meta.inputResource || "none", amount: Qo(e), inputId: 0 },
                    { resource: "energy", amount: ei(e), inputId: 1 },
                ],
            },
        ],
        upgrades: {
            cat: { name: "cat", cost: 12, currencyType: "lava", max: 1, title: "Catalysis", description: "Allows insertion of Fire for increased efficiency.", effect: (e) => Boolean(e), formatEffect: () => "" },
            velocity: { name: "velocity", cost: 4, currencyType: (e) => wf[e], max: 5, title: "Plater", description: "Increase operation speed but only increases Energy usage at sqrt the rate", effect: (e) => Math.pow(1.3, e) },
        },
        customLoop(e) {
            var t, s, n, o;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"),
                (this.meta.catalystActive = ((o = (n = this.inputItem(2)) == null ? void 0 : n.amount) != null ? o : 0) >= 5),
                be.tickThisMachine(this, e);
        },
        description: "Arc furnace. Takes in Energy and the item to be heated.",
    }),
    kf = qe({
        name: "autoSeller",
        inputs: [
            { accepts: Kt, capacity: () => 60, consumes: () => 20 },
            { accepts: Kt, capacity: () => 60, consumes: () => 20 },
        ],
        outputs: [],
        customLoop(e) {
            var t, s;
            be.updateInputStatistics(this, e), be.updateOutputStatistics(this, e);
            for (let n = 0; n < 2; n++) {
                if (!this.inputItem(n)) continue;
                const o = (s = (t = this.inputItem(n)) == null ? void 0 : t.resource) != null ? s : "none";
                if (o === "none") continue;
                const i = this.inputs[n].removeFromStack(20 * e);
                d.money += me[o].value * i;
            }
            dt.tickPipes(this, e);
        },
        upgrades: {},
        description: "Automagically sells things.",
    }),
    Ef = qe({
        name: "cistern",
        inputs: [],
        outputs: [
            { capacity: (e) => 8 * e.upgrades.capacity.effect, produces: (e) => ({ resource: "water", amount: 0.2 * e.upgrades.velocity.effect }), isUnlocked: (e) => e.upgrades.unlock.maxed },
            { capacity: (e) => 8 * e.upgrades.capacity.effect, produces: (e) => ({ resource: "water", amount: 0.1 * e.upgrades.velocity.effect }), isUnlocked: (e) => e.upgrades.quantity.effect >= 1 },
        ],
        upgrades: {
            unlock: { name: "unlock", cost: 1, max: 1, title: "Unlock", description: "Unlock the cistern", effect: (e) => Boolean(e), formatEffect: () => "", isUnlocked: (e) => !e.upgrades.unlock.effect },
            capacity: {
                name: "capacity",
                cost: (e) => Math.pow(5, e) * 25,
                max: 5,
                title: "Capacity",
                description: "Incrcease Water capacity",
                effect: (e) => Math.pow(2, e - 1) + e + 0.5,
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
            velocity: {
                name: "velocity",
                cost: (e) => Math.pow(4, e) * 30,
                max: 6,
                title: "Velocity",
                description: "Increase Water production",
                effect: (e) => Math.pow(1.5, e) + 1.5 * e,
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
            quantity: {
                name: "quantity",
                cost: 40,
                max: 1,
                title: "Quantity",
                description: "Gain a secondary input, producing Water at half the rate",
                currencyType: "energy",
                effect: (e) => e,
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
        },
        description: "Produces Water.",
    }),
    If = qe({
        name: "elixirMaker",
        inputs: [
            { accepts: ["quicksilver"], capacity: 10, consumes: (e) => ({ amount: 1, maximum: e.outputDiffs.main }) },
            { accepts: ["wood"], capacity: 10, consumes: (e) => ({ amount: 1, maximum: e.outputDiffs.main }) },
            { accepts: ["water"], capacity: 10, consumes: (e) => ({ amount: 1, maximum: e.outputDiffs.main }) },
            { accepts: ["fire"], capacity: 10, consumes: (e) => ({ amount: 1, maximum: e.outputDiffs.main }) },
            { accepts: ["earth"], capacity: 10, consumes: (e) => ({ amount: 1, maximum: e.outputDiffs.main }) },
            { accepts: ["purity"], capacity: 1, consumes: (e) => ({ amount: 0.1, maximum: e.outputDiffs.main * 0.1 }) },
        ],
        outputs: [
            {
                id: "main",
                capacity: 10,
                produces: () => ({ resource: "elixir", amount: d.finishedEndCutscene ? 0.01 : 0.1 }),
                requiresList: () => [
                    { resource: "quicksilver", amount: 1, inputId: 0 },
                    { resource: "wood", amount: 1, inputId: 1 },
                    { resource: "water", amount: 1, inputId: 2 },
                    { resource: "fire", amount: 1, inputId: 3 },
                    { resource: "earth", amount: 1, inputId: 4 },
                    { resource: "purity", amount: 0.1, inputId: 5 },
                ],
            },
        ],
        upgrades: {},
        customLoop(e) {
            var s, n, o, i;
            const t = (n = (s = this.outputItem(0)) == null ? void 0 : s.amount) != null ? n : 0;
            be.tickThisMachine(this, e), (d.producedElixir += ((i = (o = this.outputItem(0)) == null ? void 0 : o.amount) != null ? i : 0) - t);
        },
        description: "consumeCONSUMEconsumeCONSUMEconsumeCONSUMEconsume",
    }),
    br = [
        { input: { resource: "coal", amount: 0.3 }, output: { resource: "fire", amount: 0.2 }, energyUsage: 0.3 },
        { input: { resource: "energy", amount: 0.25 }, output: { resource: "essence", amount: 0.02 }, energyUsage: 0.15 },
        { input: { resource: "lava", amount: 0.2 }, output: { resource: "vitriol", amount: 0.08 }, energyUsage: 0.5, isUnlocked: (e) => e.upgrades.power.count > 0 },
        { input: { resource: "glass", amount: 1 }, output: { resource: "purity", amount: 0.01 }, energyUsage: 0.5, isUnlocked: (e) => e.upgrades.power.count > 1 },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, energyUsage: 0 },
    ],
    io = ss(br);
function ti(e) {
    var t, s, n;
    return ((n = (s = (t = io[e.meta.inputResource || "none"]) == null ? void 0 : t.input) == null ? void 0 : s.amount) != null ? n : 0) * e.upgrades.velocity.effect;
}
function si(e) {
    var t, s;
    return (s = (t = io[e.meta.inputResource || "none"]) == null ? void 0 : t.energyUsage) != null ? s : 0;
}
function Sf(e) {
    var s, n;
    const t = (n = (s = io[e.meta.inputResource || "none"]) == null ? void 0 : s.output) != null ? n : 0;
    return { resource: t.resource, amount: t.amount * e.upgrades.velocity.effect };
}
const Tf = qe({
        name: "essencePurifier",
        meta: () => ({ inputResource: "none" }),
        inputs: [
            {
                accepts: (e) =>
                    br
                        .filter((t) => (t.isUnlocked ? oe(t.isUnlocked, e) : !0))
                        .map((t) => t.input.resource)
                        .filter((t) => t !== "none"),
                capacity: (e) => 5 * e.upgrades.capacity.effect,
                consumes: (e) => {
                    const t = ti(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
            {
                accepts: ["energy"],
                capacity: (e) => 5 * e.upgrades.capacity.effect,
                consumes: (e) => {
                    const t = si(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: (e) => 5 * e.upgrades.capacity.effect,
                produces: (e) => Sf(e),
                requiresList: (e) => [
                    { resource: e.meta.inputResource || "none", amount: ti(e), inputId: 0 },
                    { resource: "energy", amount: si(e), inputId: 1 },
                ],
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
        ],
        upgrades: {
            unlock: {
                name: "unlock",
                cost: 150,
                currencyType: "energy",
                max: 1,
                title: "Power",
                description: "Supply Power to the EssencePurifier.",
                effect: (e) => Boolean(e),
                formatEffect: () => "",
                isUnlocked: (e) => !e.upgrades.unlock.effect,
            },
            velocity: {
                name: "velocity",
                cost: (e) => Math.pow(2.5, e) * 30,
                currencyType: "lava",
                max: 4,
                title: "Efficiency",
                description: "Increase operation speed without increasing energy usage in Input 2",
                effect: (e) => Math.pow(1.5, e) + e * 0.2,
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
            power: {
                name: "power",
                cost: (e) => Math.pow(2, e) * 40,
                currencyType: "essence",
                max: 2,
                title: "Very Fine",
                description: "Gain the ability extract essence from 1 more type of raw material",
                effect: (e) => e,
                formatEffect: () => "",
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect),
            },
            capacity: {
                name: "capacity",
                cost: (e) => Math.pow(4, e) * 20,
                max: 2,
                currencyType: "vitriol",
                title: "Capacity",
                description: "Increase capacity",
                effect: (e) => Math.pow(2, e - 1) + e + 0.5,
                isUnlocked: (e) => Boolean(e.upgrades.unlock.effect && (e.upgrades.power.count || me.vitriol.isUnlocked)),
            },
        },
        customLoop(e) {
            var t, s;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"), be.tickThisMachine(this, e);
        },
        description: "Extracts Basic Essences from raw materials.",
    }),
    wr = [
        { input: { resource: "clay", amount: 0.2 }, output: { resource: "bricks", amount: 0.2 }, fuelUsage: 0.2 },
        { input: { resource: "water", amount: 0.3 }, output: { resource: "steam", amount: 0.3 }, fuelUsage: 0.15 },
        { input: { resource: "sand", amount: 0.5 }, output: { resource: "glass", amount: 0.32 }, fuelUsage: 0.4, isUnlocked: () => me.energy.isUnlocked },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, fuelUsage: 0 },
    ],
    Of = { none: 1e-300, wood: 1, coal: 7 },
    ro = ss(wr);
function ni(e) {
    return ro[e.meta.inputResource || "none"].input.amount * e.upgrades.improve.effect[0];
}
function oi(e) {
    var t, s;
    return !e.meta.inputResource || e.meta.inputResource === "none"
        ? 0
        : ((t = ro[e.meta.inputResource || "none"].fuelUsage) != null ? t : 0 * e.upgrades.improve.effect[0]) / e.upgrades.improve.effect[1] / ((s = Of[e.meta.inputFuel || "none"]) != null ? s : 0);
}
function $f(e) {
    const t = ro[e.meta.inputResource || "none"].output;
    return { resource: t.resource, amount: t.amount * e.upgrades.improve.effect[0] };
}
const Uf = qe({
        name: "furnaceBasic",
        meta: () => ({ inputFuel: "none", inputResource: "none" }),
        inputs: [
            {
                accepts: (e) =>
                    wr
                        .filter((t) => (t.isUnlocked ? oe(t.isUnlocked, e) : !0))
                        .map((t) => t.input.resource)
                        .filter((t) => t !== "none"),
                capacity: (e) => 10 * e.upgrades.capacity.effect,
                consumes: (e) => {
                    const t = ni(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
            {
                accepts: (e) => {
                    const t = ["wood"];
                    return e.upgrades.improve.count && t.push("coal"), t;
                },
                capacity: (e) => 10 * e.upgrades.capacity.effect,
                consumes: (e) => {
                    const t = oi(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: (e) => 10 * e.upgrades.capacity.effect,
                produces: (e) => $f(e),
                requiresList: (e) => [
                    { resource: e.meta.inputResource || "none", amount: ni(e), inputId: 0 },
                    { resource: e.meta.inputFuel || "none", amount: oi(e), inputId: 1 },
                ],
            },
        ],
        upgrades: {
            improve: {
                name: "improve",
                cost: 15,
                currencyType: (e) => (e >= 1 ? "glass" : "stone"),
                max: 2,
                title: "Improve",
                description: (e) => `Increase speed and fuel efficiency.
				${e.count > 0 ? "" : "Unlocks ability to use coal as fuel."}`,
                effect: (e) => [Math.pow(1.5, e) + e * 0.5, Math.pow(1.1, e) + e * 0.2],
                formatEffect: () => "",
            },
            capacity: { name: "capacity", cost: (e) => (e >= 1 ? 1 : 3), currencyType: (e) => (e >= 1 ? "essence" : "energy"), max: 2, title: "Capacity", description: "Increase capacity.", effect: (e) => Math.pow(2, e) + e * 0.4 },
        },
        customLoop(e) {
            var t, s, n, o;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"),
                (this.meta.inputFuel = (o = (n = this.inputItem(1)) == null ? void 0 : n.resource) != null ? o : "none"),
                be.tickThisMachine(this, e);
        },
        description: "Basic furnace. Takes in a fuel and the item to be heated.",
    }),
    Pf = qe({
        name: "inputMerger",
        meta: () => ({ produces0: 0, consumes0: 0, consumes1: 0, consumes2: 0, lastDiff: 0, updates: 0, inputResource: "earth" }),
        inputs: [
            { accepts: Kt, capacity: () => 20, consumes: (e) => e.meta.consumes0 / e.meta.lastDiff },
            { accepts: Kt, capacity: () => 20, consumes: (e) => e.meta.consumes1 / e.meta.lastDiff },
            { accepts: Kt, capacity: () => 20, consumes: (e) => e.meta.consumes2 / e.meta.lastDiff },
        ],
        outputs: [{ capacity: () => 60, produces: (e) => ({ resource: e.meta.inputResource, amount: e.meta.produces0 }) }],
        upgrades: {},
        customLoop(e) {
            var r, a, c, u, p, g, S, L, A;
            this.meta.updates++;
            const t = [Math.floor(this.meta.updates / 30) % 3, Math.floor(this.meta.updates / 30 + 1) % 3, Math.floor(this.meta.updates / 30 + 2) % 3],
                s =
                    (g = (p = (c = (r = this.inputItem(t[0])) == null ? void 0 : r.resource) != null ? c : (a = this.inputItem(t[1])) == null ? void 0 : a.resource) != null ? p : (u = this.inputItem(t[2])) == null ? void 0 : u.resource) !=
                    null
                        ? g
                        : "earth";
            this.meta.inputResource = s;
            const n = 4 * e,
                o = this.outputs[0].spaceLeft;
            let i = 0;
            (this.meta.lastDiff = e),
                be.updateInputStatistics(this, e),
                ((S = this.inputItem(0)) == null ? void 0 : S.resource) === s ? (this.meta.consumes0 = this.inputs[0].removeFromStack(Math.min(n, o))) : (this.meta.consumes0 = 0),
                (i += this.meta.consumes0),
                ((L = this.inputItem(1)) == null ? void 0 : L.resource) === s ? (this.meta.consumes1 = this.inputs[1].removeFromStack(Math.min(n, o - i))) : (this.meta.consumes1 = 0),
                (i += this.meta.consumes1),
                ((A = this.inputItem(2)) == null ? void 0 : A.resource) === s ? (this.meta.consumes2 = this.inputs[2].removeFromStack(Math.min(n, o - i))) : (this.meta.consumes2 = 0),
                (i += this.meta.consumes2),
                (this.meta.produces0 = this.outputs[0].addToStack({ resource: s, amount: i }) / e),
                (this.outputs[0].outputDiff = e),
                (this.outputDiffs[0] = e),
                this.meta.updates % 20 === 0 && (this.inputs[0].unclog(), this.inputs[1].unclog(), this.inputs[2].unclog(), this.outputs[0].unclog()),
                be.updateOutputStatistics(this, e),
                dt.tickPipes(this, e);
        },
        description: "Merges three inputs into one single stream.",
    }),
    Mr = [
        { input: { resource: "earth", amount: 1.5 }, output: { resource: "sand", amount: 1.1 }, energyUsage: 0.1 },
        { input: { resource: "stone", amount: 0.6 }, output: { resource: "stoneDust", amount: 0.6 }, energyUsage: 0.1 },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, energyUsage: 0 },
    ],
    ao = ss(Mr);
function Lt() {
    return Math.tan((Date.now() / 1e3) % 1.293);
}
function ii(e) {
    return ao[e.meta.inputResource || "none"].input.amount * Lt();
}
function ri(e) {
    var t, s;
    return ((s = (t = ao[e.meta.inputResource || "none"]) == null ? void 0 : t.energyUsage) != null ? s : 0) * Lt();
}
function Cf(e) {
    const t = ao[e.meta.inputResource || "none"].output;
    return { resource: t.resource, amount: t.amount * Lt() };
}
const Af = qe({
        name: "pulverizer",
        meta: () => ({ inputResource: "none" }),
        inputs: [
            {
                accepts: Mr.map((e) => e.input.resource).filter((e) => e !== "none"),
                capacity: () => 25,
                consumes: (e) => {
                    const t = ii(e) * Lt();
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
            {
                accepts: ["energy"],
                capacity: () => 10,
                consumes: (e) => {
                    const t = ri(e) * Lt();
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: () => 25,
                produces: (e) => Cf(e),
                requiresList: (e) => [
                    { resource: e.meta.inputResource || "none", amount: ii(e) * Lt(), inputId: 0 },
                    { resource: "energy", amount: ri(e) * Lt(), inputId: 1 },
                ],
            },
        ],
        upgrades: {},
        customLoop(e) {
            var t, s;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"), be.tickThisMachine(this, e);
        },
        description: "Uses Energy to pound materials to dust.",
    }),
    Rf = qe({
        name: "quarry",
        description: "Produces Stone and Coal.",
        inputs: [],
        outputs: [
            { capacity: (e) => 10 * e.upgrades.capacity.effect, produces: (e) => ({ resource: "stone", amount: 0.15 * e.upgrades.velocity.effect }), isUnlocked: (e) => e.upgrades.unlock.maxed },
            { capacity: (e) => 5 * e.upgrades.capacity.effect, produces: (e) => ({ resource: "coal", amount: 0.04 * e.upgrades.velocity.effect }), isUnlocked: (e) => e.upgrades.unlock.maxed },
        ],
        upgrades: {
            unlock: { name: "unlock", cost: 55, currencyType: "bricks", max: 1, title: "Build", description: "Build the quarry.", effect: (e) => Boolean(e), formatEffect: () => "", isUnlocked: (e) => !e.upgrades.unlock.effect },
            capacity: {
                name: "capacity",
                cost: (e) => Math.pow(4, e) * 10,
                currencyType: "energy",
                max: 4,
                title: "Capacity",
                description: "Increase Stone and Coal capacity",
                effect: (e) => Math.pow(2, e),
                isUnlocked: (e) => e.upgrades.unlock.effect,
            },
            velocity: {
                name: "velocity",
                cost: (e) => (e > 4 ? Math.pow(4, e - 5) * 10 : Math.pow(3, e) * 10),
                currencyType: (e) => (e > 4 ? "vitriol" : "energy"),
                max: 8,
                title: "Velocity",
                description: "Increase Stone and Coal production",
                effect: (e) => Math.pow(1.55, e) + e * 0.1,
                isUnlocked: (e) => e.upgrades.unlock.effect,
            },
        },
    }),
    Df = qe({
        name: "shoveller",
        inputs: [],
        outputs: [
            { capacity: (e) => 16 * e.upgrades.capacity.effect, produces: (e) => ({ resource: "earth", amount: 0.3 * e.upgrades.velocity.effect }) },
            { capacity: 10, produces: (e) => ({ resource: "wood", amount: 0.2 * e.upgrades.wood.effect }), isUnlocked: (e) => e.upgrades.wood.effect },
        ],
        upgrades: {
            capacity: { name: "capacity", cost: (e) => Math.pow(6, e) * 5, max: 6, title: "Capacity", description: "Increase Earth capacity", effect: (e) => Math.pow(2, e - 1) + e + 0.5 },
            velocity: { name: "velocity", cost: (e) => Math.pow(4, e) * 5, max: 7, title: "Velocity", description: "Increase Earth production", effect: (e) => Math.pow(1.5, e) + e },
            wood: {
                name: "wood",
                cost: (e) => 40 * Math.pow(5, e),
                max: 3,
                title: (e) => (e.count ? "Persistence" : "Wood"),
                description: (e) => (e.count ? "Increase Wood production" : "Attach a primitive axe to cut down trees"),
                effect: (e) => (Math.pow(1.4, e) - 1) * 2.5,
                formatEffect: (e) => (e ? rn(e, 2, 1) : "Not unlocked"),
            },
        },
        description: "Produces Earth.",
    }),
    Lf = qe({
        name: "steamEngine",
        inputs: [{ accepts: ["steam"], capacity: () => 20, consumes: (e) => ({ amount: 0.6 * e.upgrades.harness.effect, maximum: (e.outputDiffs.main * 0.6 * e.upgrades.harness.effect) / e.upgrades.yield.effect }) }],
        outputs: [
            {
                id: "main",
                capacity: () => 10,
                produces: (e) => ({ resource: "energy", amount: 0.1 * e.upgrades.harness.effect }),
                requires: (e) => ({ resource: "steam", amount: (0.6 * e.upgrades.harness.effect) / e.upgrades.yield.effect, inputId: 0 }),
            },
            {
                capacity: () => 10,
                produces: (e) => ({ resource: "water", amount: e.outputs[0].volume >= e.outputs[0].config.capacity ? 0 : (0.3 * e.upgrades.harness.effect) / e.upgrades.yield.effect }),
                requires: (e) => ({ resource: "steam", amount: (0.6 * e.upgrades.harness.effect) / e.upgrades.yield.effect, inputId: 0 }),
            },
        ],
        upgrades: {
            harness: { name: "harness", cost: (e) => Math.pow(5, e) * 6, currencyType: "lava", max: 3, title: "Harness", description: "Increase operation speed", effect: (e) => Math.pow(1.6, e) + e * 0.3 },
            yield: { name: "yield", cost: (e) => Math.pow(4, e), currencyType: "essence", max: 3, title: "Yielding", description: "Decrease steam usage and water byproduct", effect: (e) => Math.pow(1.2, e) + e * 0.3 },
        },
        description: "Converts Steam into Energy. James Watt would be proud.",
    }),
    xr = [
        { input: { resource: "stone", amount: 0.5 }, output: { resource: "iron", amount: 0.08 }, vitriolUsage: 0.4 },
        { input: { resource: "stoneDust", amount: 0.5 }, output: { resource: "iron", amount: 0.25 }, vitriolUsage: 0.2 },
        { input: { resource: "iron", amount: 0.5 }, output: { resource: "lead", amount: 0.4 }, vitriolUsage: 0.3 },
        { input: { resource: "lead", amount: 0.5 }, output: { resource: "copper", amount: 0.3 }, vitriolUsage: 0.4 },
        { input: { resource: "copper", amount: 0.5 }, output: { resource: "silver", amount: 0.25 }, vitriolUsage: 0.5 },
        { input: { resource: "silver", amount: 0.5 }, output: { resource: "gold", amount: 0.2 }, vitriolUsage: 0.6 },
        { input: { resource: "gold", amount: 0.5 }, output: { resource: "quicksilver", amount: 0.25 }, vitriolUsage: 1.2 },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, vitriolUsage: 0 },
    ],
    co = ss(xr);
function ai(e) {
    return co[e.meta.inputResource].input.amount;
}
function Ff(e) {
    const t = co[e.meta.inputResource || "none"].output;
    return { resource: t.resource, amount: t.amount };
}
function ci(e) {
    var t;
    return (t = co[e.meta.inputResource || "none"].vitriolUsage) != null ? t : 0;
}
const Bf = qe({
        name: "transmuter",
        meta: () => ({ inputResource: "none" }),
        inputs: [
            {
                accepts: xr.map((e) => e.input.resource).filter((e) => e !== "none"),
                capacity: () => 20,
                consumes: (e) => {
                    const t = ai(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
            {
                accepts: ["vitriol"],
                capacity: () => 5,
                consumes: (e) => {
                    const t = ci(e);
                    return { amount: t, maximum: e.outputDiffs.main * t };
                },
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: () => 20,
                produces: (e) => Ff(e),
                requiresList: (e) => [
                    { resource: e.meta.inputResource || "none", amount: ai(e), inputId: 0 },
                    { resource: "vitriol", amount: ci(e), inputId: 1 },
                ],
            },
        ],
        upgrades: {},
        customLoop(e) {
            var t, s;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"), be.tickThisMachine(this, e);
        },
        description: "You know what this is.",
    }),
    kr = [
        { input: { resource: "earth", amount: 0.2 }, output: { resource: "clay", amount: 0.2 }, waterUsage: 0.3 },
        { input: { resource: "none", amount: 0 }, output: { resource: "earth", amount: 0 }, waterUsage: 0.1 },
    ],
    Ot = ss(kr),
    Nf = qe({
        name: "waterMixer",
        meta: () => ({ inputResource: "none" }),
        inputs: [
            {
                accepts: kr.map((e) => e.input.resource).filter((e) => e !== "none"),
                capacity: (e) => 15 * e.upgrades.capacity.effect,
                consumes: (e) => ({ amount: Ot[e.meta.inputResource || "none"].input.amount, maximum: e.outputDiffs.main * Ot[e.meta.inputResource || "none"].input.amount }),
            },
            {
                accepts: ["water"],
                capacity: (e) => 15 * e.upgrades.capacity.effect,
                consumes: (e) => {
                    var t;
                    return e.outputDiffs.main === 0 ? 0.1 : (t = Ot[e.meta.inputResource || "none"].waterUsage) != null ? t : 0;
                },
            },
        ],
        outputs: [
            {
                id: "main",
                capacity: (e) => 15 * e.upgrades.capacity.effect,
                produces: (e) => ({ resource: Ot[e.meta.inputResource || "none"].output.resource, amount: Ot[e.meta.inputResource || "none"].output.amount }),
                requiresList: (e) => {
                    var t;
                    return [
                        { resource: e.meta.inputResource || "none", amount: Ot[e.meta.inputResource || "none"].input.amount, inputId: 0 },
                        { resource: "water", amount: (t = Ot[e.meta.inputResource || "none"].waterUsage) != null ? t : 0, inputId: 1 },
                    ];
                },
            },
        ],
        upgrades: { capacity: { name: "capacity", cost: 6, currencyType: "stone", max: 1, title: "Volume", description: "Increase capacity.", effect: (e) => e * 0.5 + Math.pow(1.5, e) } },
        customLoop(e) {
            var t, s;
            (this.meta.inputResource = (s = (t = this.inputItem(0)) == null ? void 0 : t.resource) != null ? s : "none"), be.tickThisMachine(this, e);
        },
        description: "Mixes water and another element. It's leaky.",
    }),
    Mt = { arcFurnace: xf, autoSeller: kf, cistern: Ef, elixirMaker: If, essencePurifier: Tf, furnaceBasic: Uf, inputMerger: Pf, pulverizer: Af, quarry: Rf, shoveller: Df, steamEngine: Lf, transmuter: Bf, waterMixer: Nf },
    Ue = {},
    ys = {};
function Hf() {
    for (const e of Hs.keys()) {
        Ue[e] ? We(Ue[e]).clear() : (Ue[e] = En([])), Ge[e] ? We(Ge[e]).clear() : (Ge[e] = En([])), (_s[e] = {}), (ys[e] = on(Mt, () => 0));
        for (const t in d.towns[e].machines) {
            const s = d.towns[e].machines[t],
                n = new Mt[s.type](e, Number(t));
            Ue[e].push(n);
            const o = _s[e];
            o && (o[t] = n),
                (ys[e][s.type] += 1),
                Promise.resolve().then(() => {
                    for (let i = 0; i < n.pipes.length; i++) for (const r of n.pipes[i]) Ge[e].push({ out: [n, n.outputs[i]], in: [r[0], r[1]] });
                });
        }
    }
}
const jf = ee({
    __name: "EndCutscene",
    setup(e) {
        function t(A) {
            let U = Math.pow(A % 97, 4.3) * 232344573;
            const W = 15485863,
                se = 521791;
            U = (U * W) % se;
            for (let te = 0; te < ((A * A) % 90) + 90; te++) U = (U * W) % se;
            return U / se;
        }
        function s() {
            return String.fromCharCode(Math.floor(Math.random() * 50) + 192);
        }
        const n = {
            wordCycle(A, U = !1) {
                const W = A.length,
                    se = Math.floor(Date.now() / 250) % (W * 5),
                    te = ((Date.now() / 250) % (W * 5)) % 5,
                    re = Math.floor(se / 5);
                let H = A[re];
                if (
                    (te < 0.6 ? (H = n.blendWords(A[(re + A.length - 1) % A.length], A[re], (te + 0.6) / 1.2)) : te > 4.4 && (H = n.blendWords(A[re], A[(re + 1) % A.length], (te - 4.4) / 1.2)),
                    (H = n.randomCrossWords(H, 0.1 * Math.pow(te - 2.5, 4) - 0.6)),
                    U)
                )
                    return H;
                const Fe = (Math.max(...A.map((tt) => tt.length)) - H.length) / 2;
                return "\xA0".repeat(Math.ceil(Fe)) + H + "\xA0".repeat(Math.floor(Fe));
            },
            randomCrossWords(A, U = 0.7) {
                if (U <= 0) return A;
                const W = A.split("");
                for (let se = 0; se < W.length * U; se++) {
                    const te = Math.floor(t((Math.floor(Date.now() / 500) % 964372) + 1.618 * se) * W.length);
                    W[te] = s();
                }
                return W.join("");
            },
            blendWords(A, U, W) {
                return W <= 0 ? A : W >= 1 ? U : A.substring(0, A.length * (1 - W)) + U.substring(U.length * (1 - W), U.length);
            },
        };
        function o() {
            return n.wordCycle(["elixir", "poison", "venom"]);
        }
        function i() {
            return n.wordCycle(["Transmutation", "Metamorphosis", "Mutilation"]);
        }
        function r() {
            return n.wordCycle(["immortality", "perpetuity", "eternity"]);
        }
        const a = [
            { cel: "sol", line: () => "Ah. The fabled alchemist I keep hearing about." },
            { cel: "sol", line: () => "You've finally found your way here." },
            { cel: "sol", line: () => `By cheating your way through everything using ${o()}, no less.` },
            { cel: "sol", line: () => `And you're still holding onto your dearest ${o()}, I see.` },
            {
                cel: "sol",
                line: () => `Is this all Alchemy is to you?                 
${i()} of elements into the gold that you so worth, using the ${o()} that is so precious to you, to attain ${r()} in a futile attempt?`,
            },
            {
                cel: "sol",
                line: () => `I'm afraid it doesn't work like that.                 
Nothing works like that.`,
            },
            { cel: "sol", line: () => "My dearest disciple.                 What shall we do with this person?" },
            { cel: "luna", line: () => `They attempted to cheat their way through the system of Afterlife to attain ${r()}.` },
            { cel: "luna", line: () => "But perhaps, they were only coaxed into this mission by someone else." },
            { cel: "luna", line: () => "Give them another chance to correct their wrongdoings." },
        ];
        let c = D(0),
            u = D(-0.5),
            p = D(""),
            g = D("???"),
            S = D(!1);
        function L() {
            p.value.length === a[c.value].line().length && (c.value++, (p.value = ""));
        }
        return (
            je({
                render() {
                    if (
                        (c.value >= a.length ? ((u.value -= 0.003), u.value <= -0.2 && ((d.finishedEndCutscene = !0), (d.holding.amount = 0), Le.savePlayer())) : (u.value = Math.min(u.value + 0.005, 1)),
                        u.value < 1 || ((S.value = !S.value), S.value))
                    )
                        return;
                    const A = a[c.value];
                    g.value = A.cel;
                    const U = p.value.length;
                    p.value = A.line().slice(0, U + 1);
                },
            }),
            (A, U) => (
                m(),
                y(
                    "div",
                    { class: "c-end-cutscene", style: Me({ filter: `brightness(${Math.max(u.value, 0)})` }), onClick: U[0] || (U[0] = (W) => L()) },
                    [
                        h("div", { class: ge(`c-end-cutscene__text c-end-cutscene__text--${g.value}`) }, P(p.value), 3),
                        h("div", { class: ge(`c-end-cutscene__cel-label c-end-cutscene__cel-label--${g.value}`) }, P(x(ze)(g.value).capitalize), 3),
                        h("div", { class: ge(`c-end-cutscene__cel-image c-end-cutscene__cel-image--${g.value}`) }, null, 2),
                    ],
                    4
                )
            )
        );
    },
});
const Yf = ie(jf, [["__scopeId", "data-v-3d2b84e4"]]),
    Xf = ["x1", "y1", "x2", "y2"],
    Wf = ["x1", "y1", "x2", "y2"],
    qf = ee({
        __name: "GridDisplay",
        props: { x: {}, y: {}, width: {}, height: {}, step: { default: 200 } },
        setup(e) {
            return (t, s) => (
                m(),
                y(
                    Y,
                    null,
                    [
                        (m(!0),
                        y(
                            Y,
                            null,
                            ve(
                                t.width / t.step + 1,
                                (n) => (
                                    m(),
                                    y(
                                        "line",
                                        { key: `vertical_gridline_${n}`, x1: t.x + (n - 1) * t.step, y1: t.y, x2: t.x + (n - 1) * t.step, y2: t.y + t.height, "stroke-width": "2", stroke: "#333", "stroke-linecap": "square" },
                                        null,
                                        8,
                                        Xf
                                    )
                                )
                            ),
                            128
                        )),
                        (m(!0),
                        y(
                            Y,
                            null,
                            ve(
                                t.height / t.step + 1,
                                (n) => (
                                    m(),
                                    y(
                                        "line",
                                        { key: `horizontal_gridline_${n}`, x1: t.x, y1: t.y + (n - 1) * t.step, x2: t.x + t.width, y2: t.y + (n - 1) * t.step, "stroke-width": "2", stroke: "#333", "stroke-linecap": "square" },
                                        null,
                                        8,
                                        Wf
                                    )
                                )
                            ),
                            128
                        )),
                    ],
                    64
                )
            );
        },
    }),
    zf = { tooltip: "Move", "tooltip-left": "" },
    Kf = { key: 0, tooltip: "Upgrades", "tooltip-left": "" },
    Vf = { tooltip: "Info and Production", "tooltip-left": "" },
    Zf = { key: 1, tooltip: "Delete", "tooltip-left": "" },
    Gf = ee({
        __name: "MachineSidebar",
        props: { machine: {} },
        emits: ["move-machine-start"],
        setup(e, { emit: t }) {
            let s = D(!1),
                n = D(!1),
                o = D(!1),
                i = D(!1);
            je({
                onMount() {
                    e.machine.isNew && ((s.value = !0), setTimeout(() => (s.value = !1), 3e3));
                },
                update() {
                    (n.value = e.machine.isFullyUpgraded), (o.value = e.machine.hasPartialBuyableUpgrades), (i.value = e.machine.hasWholeBuyableUpgrades);
                },
            });
            function r() {
                R.machineUpgrades.show({ machine: e.machine });
            }
            function a() {
                R.machineStatistics.show({ machine: e.machine });
            }
            function c() {
                shiftDown ? be.remove(e.machine) : R.removeMachine.show({ machine: e.machine });
            }
            return (u, p) => (
                m(),
                y(
                    "div",
                    { class: ge(["c-machine-sidebar", { "c-machine-sidebar--new": s.value }]) },
                    [
                        h("span", zf, [h("div", { class: "fas fa-arrows", onMousedown: p[0] || (p[0] = (g) => t("move-machine-start", g)) }, null, 32)]),
                        u.machine.isUpgradeable
                            ? (m(), y("span", Kf, [h("div", { class: ge(["fas fa-arrow-up", { "c-darker": n.value, "c-glow-green": o.value, "c-glow-yellow": i.value }]), onMousedown: p[1] || (p[1] = (g) => r()) }, null, 34)]))
                            : J("", !0),
                        h("span", Vf, [h("div", { class: "fas fa-info-circle", onMousedown: p[2] || (p[2] = (g) => a()) }, null, 32)]),
                        u.machine.data.isDefault ? J("", !0) : (m(), y("span", Zf, [h("div", { class: "fas fa-trash", onMousedown: p[3] || (p[3] = (g) => c()) }, null, 32)])),
                    ],
                    2
                )
            );
        },
    });
const Jf = ie(Gf, [["__scopeId", "data-v-6ddf8eb1"]]),
    Qf = { class: "c-resources-container" },
    ed = { class: "c-resources-container--text" },
    td = { key: 0, class: "c-resources-stack" },
    sd = ee({
        __name: "ResourceStack",
        props: { stack: {}, capacity: {} },
        setup(e) {
            const t = e;
            let s = D([]);
            const n = D(null);
            let o;
            function i() {
                const r = t.capacity;
                if (t.stack.length <= 40) {
                    s.value = t.stack.map((u) => ({ height: `${(u.amount / r) * 100}%`, "background-color": me[u.resource].colour }));
                    return;
                }
                if (!o) return;
                const a = t.stack.map((u) => ({ height: (u.amount / r) * 400, colour: me[u.resource].colour }));
                o.clearRect(0, 0, 1, 400);
                let c = 0;
                for (let u = a.length - 1; u >= 0; u--) {
                    const p = a[u];
                    (c += p.height), (o.fillStyle = p.colour), o.fillRect(0, 400 - c, 1, p.height);
                }
            }
            return (
                Ps(t, i, { deep: !0 }),
                je({
                    onMount() {
                        !n.value || ((o = n.value.getContext("2d")), i());
                    },
                }),
                (r, a) => (
                    m(),
                    y("div", Qf, [
                        h("span", ed, [_t(r.$slots, "default", {}, void 0, !0)]),
                        t.stack.length <= 40
                            ? (m(),
                              y("div", td, [
                                  (m(!0),
                                  y(
                                      Y,
                                      null,
                                      ve(s.value, (c, u) => (m(), y("div", { key: u, style: Me(c) }, null, 4))),
                                      128
                                  )),
                              ]))
                            : J("", !0),
                        h("canvas", { ref_key: "canvas", ref: n, style: Me({ visibility: t.stack.length > 40 ? "visible" : "hidden" }), class: "c-resources-stack__canvas", height: "400", width: "1" }, null, 4),
                    ])
                )
            );
        },
    });
const ui = ie(sd, [["__scopeId", "data-v-45e28ed4"]]),
    kt = (e) => (Pe("data-v-499f7d86"), (e = e()), Ce(), e),
    nd = { key: 0, class: "c-pipe-container" },
    od = ["onMouseenter", "onMouseleave", "onMousedown"],
    id = { class: "l-machine__inner" },
    rd = ["onMousedown"],
    ad = kt(() => h("hr", null, null, -1)),
    cd = kt(() => h("br", null, null, -1)),
    ud = kt(() => h("br", null, null, -1)),
    ld = { key: 0 },
    fd = kt(() => h("br", null, null, -1)),
    dd = { key: 1, class: "fas fa-lock" },
    pd = { key: 0, class: "l-machine-input-output-separator" },
    hd = ["onMousedown"],
    md = kt(() => h("hr", null, null, -1)),
    gd = kt(() => h("br", null, null, -1)),
    _d = kt(() => h("br", null, null, -1)),
    yd = { key: 0 },
    vd = kt(() => h("br", null, null, -1)),
    bd = { key: 1, class: "fas fa-lock" },
    wd = { key: 2, class: "c-pipe-container" },
    Md = ["onMouseenter", "onMouseleave", "onMousedown"],
    xd = ee({
        __name: "Machine",
        props: { machine: {} },
        emits: ["input-pipe-drag-start", "output-pipe-drag-start", "input-pipe-hover", "output-pipe-hover", "pipe-stop-hover", "move-machine-start"],
        setup(e, { emit: t }) {
            let s = Ct([]),
                n = Ct([]),
                o = Ct([]),
                i = Ct([]),
                r = D(!1),
                a = D(!1);
            const c = D(!1);
            let u = D(!1),
                p = null,
                g = null;
            je({
                onMount() {
                    e.machine.isNew && ((r.value = !0), requestAnimationFrame(() => (e.machine.isNew = !1)), setTimeout(() => (r.value = !1), 3e3));
                },
                beforeUnmount() {
                    g && g();
                },
                update() {
                    (u.value = dt.isUnlocked),
                        (a.value = e.machine.hasWholeBuyableUpgrades),
                        (s.value = e.machine.inputs),
                        (o.value = e.machine.outputs),
                        (n.value = s.value.map((M) => ({ stack: M.data, resource: ze(M.statistics.displayResource[0]).capitalize, capacity: M.config.capacity, label: M.config.label }))),
                        (i.value = o.value.map((M) => ({ stack: M.data, resource: ze(M.statistics.displayResource[0]).capitalize, capacity: M.config.capacity })));
                },
                render() {
                    p && p();
                },
            });
            function S(M) {
                const z = We(M.data).last;
                if (!(!z || !M.isUnlocked)) {
                    if (d.holding.amount <= 0) d.holding.resource = z.resource;
                    else if (d.holding.resource !== z.resource) return;
                    (d.holding.amount += M.removeFromStack(M.config.capacity * 0.007)), d.holding.amount < 0.001 && (d.holding.amount = 0);
                }
            }
            function L(M, z) {
                if (!!M.isUnlocked) {
                    if (z.button === 2) {
                        A(M);
                        return;
                    }
                    if (!p) {
                        p = S.bind(null, M);
                        const O = function () {
                            (p = null), document.removeEventListener("mouseup", O), document.removeEventListener("mouseleave", O), (g = null);
                        };
                        document.addEventListener("mouseup", O), document.addEventListener("mouseleave", O), (g = O);
                    }
                }
            }
            function A(M) {
                const z = We(M.data).last;
                if (!(!z || !M.isUnlocked)) {
                    if (d.holding.amount <= 0) d.holding.resource = z.resource;
                    else if (d.holding.resource !== z.resource) return;
                    (d.holding.amount += M.removeFromStack(1 / 0)), d.holding.amount < 0.001 && (d.holding.amount = 0);
                }
            }
            function U(M) {
                !M.isUnlocked || d.holding.amount <= 0 || !M.config.accepts.includes(d.holding.resource) || (d.holding.amount -= M.addToStack({ resource: d.holding.resource, amount: Math.min(M.config.capacity * 0.007, d.holding.amount) }));
            }
            function W(M, z) {
                if (!!M.isUnlocked) {
                    if (z.button === 2) {
                        se(M);
                        return;
                    }
                    if (!p) {
                        p = U.bind(null, M);
                        const O = function () {
                            (p = null), document.removeEventListener("mouseup", O), document.removeEventListener("mouseleave", O), (g = null);
                        };
                        document.addEventListener("mouseup", O), document.addEventListener("mouseleave", O), (g = O);
                    }
                }
            }
            function se(M) {
                !M.isUnlocked || d.holding.amount <= 0 || !M.config.accepts.includes(d.holding.resource) || (d.holding.amount -= M.addToStack({ resource: d.holding.resource, amount: d.holding.amount }));
            }
            function te(M) {
                return !M.isUnlocked || d.holding.amount === 0 ? "c-cursor-default" : M.config.accepts.includes(d.holding.resource) ? "" : "c-cursor-notallowed";
            }
            function re(M) {
                return M.isUnlocked ? (d.holding.resource !== M.statistics.displayResource[0] && d.holding.amount ? "c-cursor-default" : "") : "c-cursor-default";
            }
            function H(M) {
                dt.removeAllInputPipesTo(e.machine, M), t("input-pipe-drag-start", e.machine, M);
            }
            function Ye(M) {
                t("input-pipe-hover", e.machine, M);
            }
            function Fe(M) {
                t("output-pipe-drag-start", e.machine, M);
            }
            function tt(M) {
                t("output-pipe-hover", e.machine, M);
            }
            return (M, z) => (
                m(),
                y(
                    "div",
                    { class: ge(["c-machine-container", { "c-machine-container--new": r.value, "c-glow-green": c.value, "c-glow-yellow": a.value }]) },
                    [
                        u.value && s.value.length
                            ? (m(),
                              y("div", nd, [
                                  (m(!0),
                                  y(
                                      Y,
                                      null,
                                      ve(
                                          s.value,
                                          (O) => (
                                              m(),
                                              y(
                                                  "div",
                                                  {
                                                      key: O.id,
                                                      class: ge(["c-machine__input-pipe", { disabled: !O.isUnlocked }]),
                                                      style: Me({ left: `${O.id * 90 + 45}px` }),
                                                      onMouseenter: (q) => {
                                                          O.isUnlocked && Ye(O.id);
                                                      },
                                                      onMouseleave: (q) => {
                                                          O.isUnlocked && t("pipe-stop-hover");
                                                      },
                                                      onMousedown: (q) => {
                                                          O.isUnlocked && H(O.id);
                                                      },
                                                  },
                                                  P(O.isUnlocked ? O.id + 1 : "x"),
                                                  47,
                                                  od
                                              )
                                          )
                                      ),
                                      128
                                  )),
                              ]))
                            : J("", !0),
                        u.value
                            ? (m(),
                              y(
                                  "div",
                                  { key: 1, class: "c-emphasise-text c-machine__title", style: Me({ width: `${90 * (s.value.length + o.value.length)}px` }), onMousedown: z[0] || (z[0] = (O) => t("move-machine-start", O)) },
                                  P(M.machine.displayName),
                                  37
                              ))
                            : J("", !0),
                        h("div", id, [
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(
                                    s.value,
                                    (O, q) => (
                                        m(),
                                        y(
                                            "div",
                                            { key: q, class: ge(["c-machine__input", te(O)]), onMousedown: (Ie) => W(O, Ie) },
                                            [
                                                O.isUnlocked
                                                    ? (m(),
                                                      fe(
                                                          ui,
                                                          { key: 0, stack: O.data, capacity: n.value[q].capacity },
                                                          {
                                                              default: de(() => [
                                                                  N(P(x($e)(O.volume, 2, 1)), 1),
                                                                  ad,
                                                                  N(P(x($e)(n.value[q].capacity, 2, 1)) + " ", 1),
                                                                  cd,
                                                                  N(" Input " + P(q + 1) + " ", 1),
                                                                  ud,
                                                                  N(" " + P(n.value[q].resource) + " ", 1),
                                                                  n.value[q].label ? (m(), y("span", ld, [fd, N(" " + P(n.value[q].label), 1)])) : J("", !0),
                                                              ]),
                                                              _: 2,
                                                          },
                                                          1032,
                                                          ["stack", "capacity"]
                                                      ))
                                                    : (m(), y("span", dd)),
                                            ],
                                            42,
                                            rd
                                        )
                                    )
                                ),
                                128
                            )),
                            s.value.length && o.value.length ? (m(), y("div", pd)) : J("", !0),
                            (m(!0),
                            y(
                                Y,
                                null,
                                ve(
                                    o.value,
                                    (O, q) => (
                                        m(),
                                        y(
                                            "div",
                                            { key: q, class: ge(["c-machine__output", re(O)]), onMousedown: (Ie) => L(O, Ie) },
                                            [
                                                O.isUnlocked
                                                    ? (m(),
                                                      fe(
                                                          ui,
                                                          { key: 0, stack: O.data, capacity: i.value[q].capacity },
                                                          {
                                                              default: de(() => [
                                                                  N(P(x($e)(O.volume, 2, 1)), 1),
                                                                  md,
                                                                  N(P(x($e)(i.value[q].capacity, 2, 1)) + " ", 1),
                                                                  gd,
                                                                  N(" Output " + P(q + 1) + " ", 1),
                                                                  _d,
                                                                  N(" " + P(i.value[q].resource) + " ", 1),
                                                                  i.value[q].label ? (m(), y("span", yd, [vd, N(" " + P(i.value[q].label), 1)])) : J("", !0),
                                                              ]),
                                                              _: 2,
                                                          },
                                                          1032,
                                                          ["stack", "capacity"]
                                                      ))
                                                    : (m(), y("span", bd)),
                                            ],
                                            42,
                                            hd
                                        )
                                    )
                                ),
                                128
                            )),
                        ]),
                        u.value && o.value.length
                            ? (m(),
                              y("div", wd, [
                                  (m(!0),
                                  y(
                                      Y,
                                      null,
                                      ve(
                                          o.value,
                                          (O) => (
                                              m(),
                                              y(
                                                  "div",
                                                  {
                                                      key: O.id,
                                                      class: ge(["c-machine__output-pipe", { disabled: !O.isUnlocked }]),
                                                      style: Me({ left: `${(O.id + s.value.length) * 90 + 45}px` }),
                                                      onMouseenter: (q) => {
                                                          O.isUnlocked && tt(O.id);
                                                      },
                                                      onMouseleave: (q) => {
                                                          O.isUnlocked && t("pipe-stop-hover");
                                                      },
                                                      onMousedown: (q) => {
                                                          O.isUnlocked && Fe(O.id);
                                                      },
                                                  },
                                                  P(O.isUnlocked ? O.id + 1 : "x"),
                                                  47,
                                                  Md
                                              )
                                          )
                                      ),
                                      128
                                  )),
                              ]))
                            : J("", !0),
                    ],
                    2
                )
            );
        },
    });
const kd = ie(xd, [["__scopeId", "data-v-499f7d86"]]),
    Ed = ee({
        __name: "MachineContainer",
        props: { machine: {} },
        emits: ["input-pipe-drag-start", "output-pipe-drag-start", "input-pipe-hover", "output-pipe-hover", "pipe-stop-hover", "move-machine-start"],
        setup(e, { emit: t }) {
            const s = we(() => ({ left: `${e.machine.data.x}px`, top: `${e.machine.data.y}px` })),
                n = we(() => {
                    const i = Z("current").playerData.display.offset.x,
                        r = Z("current").playerData.display.offset.y,
                        a = Z("current").playerData.display.zoom,
                        c = e.machine.data.x,
                        u = e.machine.data.y,
                        p = (Ys.width.value * 0.5) / a,
                        g = (Ys.height.value * 0.5) / a;
                    return c > i - p - 600 && c < i + p && u > r - g - 330 && u < r + g + 30;
                });
            function o() {
                const i = Ue[e.machine.townType].findIndex((r) => r.id.toString() === e.machine.id.toString());
                i !== -1 && (Ue[e.machine.townType].push(e.machine), Ue[e.machine.townType].splice(i, 1));
            }
            return (i, r) =>
                n.value
                    ? (m(),
                      y(
                          "span",
                          { key: 0, onMousedown: o },
                          [
                              pe(
                                  kd,
                                  {
                                      machine: i.machine,
                                      style: Me(s.value),
                                      onInputPipeDragStart: r[0] || (r[0] = (...a) => t("input-pipe-drag-start", ...a)),
                                      onOutputPipeDragStart: r[1] || (r[1] = (...a) => t("output-pipe-drag-start", ...a)),
                                      onInputPipeHover: r[2] || (r[2] = (...a) => t("input-pipe-hover", ...a)),
                                      onOutputPipeHover: r[3] || (r[3] = (...a) => t("output-pipe-hover", ...a)),
                                      onPipeStopHover: r[4] || (r[4] = (a) => t("pipe-stop-hover")),
                                      onMoveMachineStart: r[5] || (r[5] = (a) => t("move-machine-start", i.machine, a)),
                                  },
                                  null,
                                  8,
                                  ["machine", "style"]
                              ),
                              pe(Jf, { machine: i.machine, style: Me(s.value), onMoveMachineStart: r[6] || (r[6] = (a) => t("move-machine-start", i.machine, a)) }, null, 8, ["machine", "style"]),
                          ],
                          32
                      ))
                    : J("", !0);
        },
    }),
    Id = (e) => (Pe("data-v-7fe55d96"), (e = e()), Ce(), e),
    Sd = { class: "c-minimap" },
    Td = Id(() => h("div", { class: "c-minimap__header" }, " Minimap ", -1)),
    _n = 180,
    yn = 160,
    Od = ee({
        __name: "Minimap",
        setup(e) {
            const t = D(null);
            let s;
            function n() {
                if (!!s) {
                    s.resetTransform(), s.clearRect(0, 0, _n, yn), s.translate(_n / 2, yn / 2), s.scale(0.04, 0.04), s.translate(-Z("current").playerData.display.offset.x, -Z("current").playerData.display.offset.y), (s.lineWidth = 25);
                    for (const o of Ue[d.currentlyIn])
                        o.hasWholeBuyableUpgrades
                            ? ((s.strokeStyle = "#ffd700"), (s.fillStyle = "#ffd70088"))
                            : o.hasPartialBuyableUpgrades
                            ? ((s.strokeStyle = "#00dd00"), (s.fillStyle = "#00cc0088"))
                            : ((s.strokeStyle = "#ffffff"), (s.fillStyle = "#ffffff88")),
                            s.beginPath(),
                            s.roundRect(o.data.x, o.data.y, 90 * (o.inputs.length + o.outputs.length), 270, [25]),
                            s.fill(),
                            s.stroke();
                }
            }
            return (
                je({
                    onMount() {
                        !t.value || (s = t.value.getContext("2d"));
                    },
                    render() {
                        n();
                    },
                }),
                (o, i) => (m(), y("div", Sd, [Td, h("canvas", { ref_key: "canvas", ref: t, class: "c-minimap__canvas", width: _n, height: yn }, null, 512)]))
            );
        },
    });
const $d = ie(Od, [["__scopeId", "data-v-7fe55d96"]]),
    Ud = ["x1", "y1", "x2", "y2"],
    Pd = ["x1", "y1", "x2", "y2", "stroke"],
    Cd = ee({
        __name: "PipeConnection",
        props: { pipe: {} },
        setup(e) {
            const t = we(() => {
                    const L = e.pipe.out[1].statistics.displayResource[0];
                    return L === "none" ? "#0000" : me[L].colour;
                }),
                s = we(() => e.pipe.out[0].data.x + (e.pipe.out[1].id + e.pipe.out[0].inputs.length) * 90 + 45),
                n = we(() => e.pipe.out[0].data.y + e.pipe.out[0].height + 10),
                o = we(() => e.pipe.in[0].data.x + e.pipe.in[1].id * 90 + 45),
                i = we(() => e.pipe.in[0].data.y - 10),
                r = we(() => Math.min(s.value, o.value)),
                a = we(() => Math.max(s.value, o.value)),
                c = we(() => Math.min(n.value, i.value)),
                u = we(() => Math.max(n.value, i.value));
            let p = D(0),
                g = D(0);
            const S = we(() => {
                const L = d.towns[d.currentlyIn].display.offset.x,
                    A = d.towns[d.currentlyIn].display.offset.y,
                    U = d.towns[d.currentlyIn].display.zoom;
                return !(a.value < L - p.value / U - 7 || u.value < A - g.value / U + 7 || r.value > L + p.value / U - 7 || c.value > A + g.value / U + 7);
            });
            return (
                je({
                    update() {
                        (p.value = innerWidth / 2), (g.value = innerHeight / 2);
                    },
                }),
                (L, A) =>
                    S.value
                        ? (m(),
                          y(
                              Y,
                              { key: 0 },
                              [
                                  h("line", { x1: s.value, y1: n.value, x2: o.value, y2: i.value, "stroke-width": "9", stroke: "#fff", "stroke-linecap": "round" }, null, 8, Ud),
                                  h("line", { x1: s.value, y1: n.value, x2: o.value, y2: i.value, "stroke-width": "5", stroke: t.value, "stroke-linecap": "round" }, null, 8, Pd),
                              ],
                              64
                          ))
                        : J("", !0)
            );
        },
    }),
    Ad = ["changeoffset", "changezoom", "resetperspective", "unmount"];
class Rd {
    constructor(t) {
        T(this, "config");
        T(this, "el", document.createElement("span"));
        T(this, "_offsetXStart", 0);
        T(this, "_offsetYStart", 0);
        T(this, "_mouseXOnDragStart", 0);
        T(this, "_mouseYOnDragStart", 0);
        T(this, "_mouseX", 0);
        T(this, "_mouseY", 0);
        T(this, "_onUnmount1");
        T(this, "_onUnmount2");
        T(this, "_eventListeners", Object.fromEntries(Ad.map((t) => [t, []])));
        var s, n, o, i, r, a;
        (t.maxOffsetX = (s = t.maxOffsetX) != null ? s : 1 / 0),
            (t.maxOffsetY = (n = t.maxOffsetY) != null ? n : 1 / 0),
            (t.minOffsetX = (o = t.minOffsetX) != null ? o : -t.maxOffsetX),
            (t.minOffsetY = (i = t.minOffsetY) != null ? i : -t.maxOffsetY),
            (t.maxZoom = (r = t.maxZoom) != null ? r : 1 / 0),
            (t.minZoom = (a = t.minZoom) != null ? a : 1 / t.maxZoom),
            (this.config = t);
    }
    get offsetX() {
        return this.config.offsetX;
    }
    set offsetX(t) {
        this.config.offsetX = t;
    }
    get offsetY() {
        return this.config.offsetY;
    }
    set offsetY(t) {
        this.config.offsetY = t;
    }
    get zoom() {
        return this.config.zoom;
    }
    set zoom(t) {
        this.config.zoom = t;
    }
    _changeOffset(t) {
        if (this.config.isBlockingMove) return;
        (this.config.isBlockingMove = !0), (this._offsetXStart = this.offsetX), (this._offsetYStart = this.offsetY), (this._mouseXOnDragStart = t.clientX), (this._mouseYOnDragStart = t.clientY);
        const s = (o) => {
            const i = this.offsetX,
                r = this.offsetY;
            (this.offsetX = Math.max(Math.min(this._offsetXStart + (this._mouseXOnDragStart - o.clientX) / this.zoom, this.config.maxOffsetX), -this.config.maxOffsetX)),
                (this._offsetXStart = this.offsetX + (o.clientX - this._mouseXOnDragStart) / this.zoom),
                (this.offsetY = Math.max(Math.min(this._offsetYStart + (this._mouseYOnDragStart - o.clientY) / this.zoom, this.config.maxOffsetY), -this.config.maxOffsetY)),
                (this._offsetYStart = this.offsetY + (o.clientY - this._mouseYOnDragStart) / this.zoom);
            for (const a of this._eventListeners.changeoffset) a(this.offsetX, this.offsetY, i, r);
        };
        document.addEventListener("mousemove", s);
        const n = () => {
            (this.config.isBlockingMove = !1), document.removeEventListener("mousemove", s), document.removeEventListener("mouseup", n), document.removeEventListener("mouseleave", n), delete this._onUnmount2;
        };
        document.addEventListener("mouseup", n), document.addEventListener("mouseleave", n), (this._onUnmount2 = () => n);
    }
    _resetMovingPerspective() {
        (this._mouseXOnDragStart = this._mouseX + this.el.offsetLeft), (this._mouseYOnDragStart = this._mouseY + this.el.offsetTop), (this._offsetXStart = this.offsetX), (this._offsetYStart = this.offsetY);
        for (const t of this._eventListeners.resetperspective) t();
    }
    _changeZoom(t) {
        if (this.config.isBlockingZoom) return;
        t.preventDefault();
        const s = Math.pow(0.995, Math.sign(t.deltaY) * Math.min(Math.abs(t.deltaY), 40)),
            n = this.zoom;
        (this.zoom *= s), (this.zoom = Math.max(Math.min(this.zoom, this.config.maxZoom), this.config.minZoom));
        const o = this.zoom,
            i = this._mouseX - this.el.offsetWidth / 2,
            r = this._mouseY - this.el.offsetHeight / 2;
        (this.offsetX += i * (1 / n - 1 / o)),
            (this.offsetY += r * (1 / n - 1 / o)),
            (this.offsetX = Math.max(Math.min(this.offsetX, this.config.maxOffsetX), -this.config.maxOffsetX)),
            (this.offsetY = Math.max(Math.min(this.offsetY, this.config.maxOffsetY), -this.config.maxOffsetY));
        for (const a of this._eventListeners.changezoom) a(o, n);
        this._resetMovingPerspective();
    }
    mount(t) {
        this.el = t;
        const s = (i) => setTimeout(() => this._changeOffset(i), 0),
            n = (i) => {
                (this._mouseX = i.clientX - this.el.offsetLeft), (this._mouseY = i.clientY - this.el.offsetTop);
            },
            o = (i) => this._changeZoom(i);
        t.addEventListener("mousedown", s),
            t.addEventListener("mousemove", n),
            t.addEventListener("wheel", o),
            (this._onUnmount1 = () => {
                t.removeEventListener("mousedown", s), t.removeEventListener("mousemove", n), t.removeEventListener("wheel", o);
            });
    }
    unmount() {
        var t, s;
        (t = this._onUnmount1) == null || t.call(this), (s = this._onUnmount2) == null || s.call(this);
        for (const n of this._eventListeners.unmount) n();
    }
    addEventListener(t, s) {
        this._eventListeners[t].push(s);
    }
    removeEventListener(t, s) {
        for (let n = 0; n < this._eventListeners[t].length; n++) for (; this._eventListeners[t][n] === s; ) this._eventListeners[t].splice(n, 1);
    }
}
const Dd = ["stopholding"];
class Ld {
    constructor(t, s) {
        T(this, "config");
        T(this, "parentView");
        T(this, "isActive", !1);
        T(this, "_mouseXOnDragStart", 0);
        T(this, "_mouseYOnDragStart", 0);
        T(this, "_originalX", 0);
        T(this, "_originalY", 0);
        T(this, "_eventListeners", Object.fromEntries(Dd.map((t) => [t, []])));
        T(this, "resetPerspective", () => {
            !this.isActive ||
                ((this._mouseXOnDragStart = this.parentView._mouseX + this.parentView.el.offsetLeft),
                (this._mouseYOnDragStart = this.parentView._mouseY + this.parentView.el.offsetTop),
                (this._originalX = this.config.x),
                (this._originalY = this.config.y));
        });
        (this.config = t), (this.parentView = s);
    }
    trigger() {
        const t = this.parentView;
        if (t.config.isBlockingMove) return;
        (this.isActive = !0),
            (t.config.isBlockingMove = !0),
            (this._mouseXOnDragStart = t._mouseX),
            (this._mouseYOnDragStart = t._mouseY),
            (this._originalX = this.config.x),
            (this._originalY = this.config.y),
            t.addEventListener("resetperspective", () => this.resetPerspective());
        const s = (o) => {
            (this.config.x = Math.min(Math.max(this._originalX + (o.clientX - this._mouseXOnDragStart) / t.zoom, t.config.minOffsetX), t.config.maxOffsetX)),
                (this.config.y = Math.min(Math.max(this._originalY + (o.clientY - this._mouseYOnDragStart) / t.zoom, t.config.minOffsetX), t.config.maxOffsetY));
        };
        document.addEventListener("mousemove", s);
        const n = () => {
            (this.isActive = !1),
                (t.config.isBlockingMove = !1),
                t.removeEventListener("resetperspective", () => this.resetPerspective()),
                document.removeEventListener("mousemove", s),
                document.removeEventListener("mouseup", n),
                document.removeEventListener("mouseleave", n);
            for (const o of this._eventListeners.stopholding) o();
        };
        document.addEventListener("mouseup", n), document.addEventListener("mouseleave", n), t.addEventListener("unmount", n);
    }
    addEventListener(t, s) {
        this._eventListeners[t].push(s);
    }
    removeEventListener(t, s) {
        for (let n = 0; n < this._eventListeners[t].length; n++) for (; this._eventListeners[t][n] === s; ) this._eventListeners[t].splice(n, 1);
    }
}
const Fd = (e) => (Pe("data-v-68a20f18"), (e = e()), Ce(), e),
    Bd = { class: "c-machine-tab__fast-time-display" },
    Nd = Fd(() => h("br", null, null, -1)),
    Hd = ["viewBox", "width", "height"],
    jd = ["x1", "y1", "x2", "y2"],
    Yd = ee({
        __name: "MachineTab",
        setup(e) {
            const t = new Rd({
                get offsetX() {
                    return Z("current").playerData.display.offset.x;
                },
                set offsetX(M) {
                    Z("current").playerData.display.offset.x = M;
                },
                get offsetY() {
                    return Z("current").playerData.display.offset.y;
                },
                set offsetY(M) {
                    Z("current").playerData.display.offset.y = M;
                },
                get zoom() {
                    return Z("current").playerData.display.zoom;
                },
                set zoom(M) {
                    Z("current").playerData.display.zoom = M;
                },
                maxOffsetX: Rt,
                maxOffsetY: Dt,
                maxZoom: 2,
                isBlockingMove: !1,
            });
            let s = null,
                n = null,
                o = D(0),
                i = D(0),
                r = D(0),
                a = D(0),
                c = null,
                u = null;
            const p = D({ type: "", machine: null, id: 0 }),
                g = D({ type: "", machine: null, id: 0 }),
                S = D(null),
                L = we(() => Ue[d.currentlyIn]),
                A = we(() => Ge[d.currentlyIn]),
                U = { up: !1, down: !1, left: !1, right: !1 };
            je({
                on: {
                    ARROW_KEYDOWN(M) {
                        (U[M] = !0), se();
                    },
                    ARROW_KEYUP(M) {
                        (U[M] = !1), se();
                    },
                },
                onMount() {
                    t.mount(S.value);
                },
                beforeUnmount() {
                    n && n(), t.unmount();
                },
                render() {
                    (o.value = t._mouseX), (i.value = t._mouseY), c && c(), u && u(), S.value && ((r.value = S.value.offsetWidth), (a.value = S.value.offsetHeight));
                },
            });
            function W(M) {
                if (!t.config.isBlockingMove) {
                    (t.config.isBlockingMove = !0),
                        (c = function () {
                            Z("current").changeOffset((M[0] * 15) / t.zoom, (M[1] * 15) / t.zoom);
                        });
                    const z = function () {
                        (t.config.isBlockingMove = !1), (c = null), document.removeEventListener("mouseup", z), document.removeEventListener("mouseleave", z), (n = null);
                    };
                    document.addEventListener("mouseup", z), document.addEventListener("mouseleave", z), (n = z);
                }
            }
            function se() {
                const M = [0, 0];
                if ((U.left ? (M[0] = -1) : U.right && (M[0] = 1), U.up ? (M[1] = -1) : U.down && (M[1] = 1), M[0] === 0 && M[1] === 0)) {
                    u = null;
                    return;
                }
                u = function () {
                    if (R.isOpen) return;
                    const { x: z, y: O } = Z("current").playerData.display.offset;
                    Z("current").changeOffset((M[0] * 15) / t.zoom, (M[1] * 15) / t.zoom), s && (s.changePositionBy(Z("current").playerData.display.offset.x - z, Z("current").playerData.display.offset.y - O), Fe.resetPerspective());
                };
            }
            function te(M, z, O) {
                (t.config.isBlockingMove = !0), (p.value.type = M), (p.value.machine = z), (p.value.id = O);
                const q = function () {
                    document.removeEventListener("mouseup", q), document.removeEventListener("mouseleave", q), re();
                };
                document.addEventListener("mouseup", q), document.addEventListener("mouseleave", q);
            }
            function re() {
                (t.config.isBlockingMove = !1),
                    !(!p.value.machine || !g.value.machine) &&
                        (p.value.type === "output"
                            ? g.value.type === "input" && (dt.removeAllInputPipesTo(g.value.machine, g.value.id), p.value.machine.addPipe(g.value.machine, g.value.id, p.value.id))
                            : p.value.type === "input" && g.value.type === "output" && (dt.removeAllInputPipesTo(p.value.machine, p.value.id), g.value.machine.addPipe(p.value.machine, p.value.id, g.value.id)),
                        (p.value.type = ""),
                        (p.value.machine = null));
            }
            function H(M, z, O) {
                (g.value.type = M), (g.value.machine = z), (g.value.id = O);
            }
            function Ye() {
                (g.value.type = ""), (g.value.machine = null);
            }
            const Fe = new Ld(
                {
                    get x() {
                        return s ? s.data.x : 0;
                    },
                    set x(M) {
                        s && s.moveTo(M, void 0);
                    },
                    get y() {
                        return s ? s.data.y : 0;
                    },
                    set y(M) {
                        s && s.moveTo(void 0, M);
                    },
                },
                t
            );
            Fe.addEventListener("stopholding", () => (s = null));
            function tt(M) {
                (s = M), Fe.trigger();
            }
            return (M, z) => (
                m(),
                y(
                    "div",
                    { ref_key: "machineTab", ref: S, class: "c-machine-tab" },
                    [
                        x(d).options.minimap ? (m(), fe($d, { key: 0 })) : J("", !0),
                        h("span", Bd, [N(" Fast Time: " + P(x($e)(x(d).fastTime, 2, 2)) + "s ", 1), x(d).fastTime > 0 ? (m(), y(Y, { key: 0 }, [Nd, N(" Time speedup: " + P(x(rn)(x(be).timeSpeedFactor + 1, 2, 1)), 1)], 64)) : J("", !0)]),
                        (m(),
                        y(
                            "svg",
                            {
                                ref: "canvas",
                                class: "c-machine-tab__canvas",
                                viewBox: `
				-${x(ke).MAX_OFFSET_X} -${x(ke).MAX_OFFSET_Y}
				${2 * x(ke).MAX_OFFSET_X} ${2 * x(ke).MAX_OFFSET_Y}
			`,
                                style: Me({
                                    transform: `
				translate(${r.value / 2 - x(ke).MAX_OFFSET_X}px, ${a.value / 2 - x(ke).MAX_OFFSET_Y}px)
				scale(${x(t).zoom})
				translate(${-x(t).offsetX}px, ${-x(t).offsetY}px)`,
                                }),
                                width: 2 * x(ke).MAX_OFFSET_X,
                                height: 2 * x(ke).MAX_OFFSET_Y,
                            },
                            [
                                x(d).options.showGridlines
                                    ? (m(),
                                      fe(qf, { key: 0, x: -x(ke).MAX_OFFSET_X, y: -x(ke).MAX_OFFSET_Y, width: x(ke).MAX_OFFSET_X * 2, height: x(ke).MAX_OFFSET_Y * 2, step: x(ke).GRID_SIZE }, null, 8, ["x", "y", "width", "height", "step"]))
                                    : J("", !0),
                                (m(!0),
                                y(
                                    Y,
                                    null,
                                    ve(A.value, (O, q) => (m(), fe(Cd, { key: q, pipe: O }, null, 8, ["pipe"]))),
                                    128
                                )),
                                p.value.machine
                                    ? (m(),
                                      y(
                                          "line",
                                          {
                                              key: 1,
                                              class: "c-machine-tab__dragging-pipe",
                                              x1: p.value.machine.data.x + (p.value.id + (p.value.type === "input" ? 0 : p.value.machine.inputs.length)) * 90 + 45,
                                              y1: p.value.machine.data.y + (p.value.type === "input" ? -10 : p.value.machine.height + 10),
                                              x2:
                                                  g.value.type && g.value.machine && g.value.type !== p.value.type
                                                      ? g.value.machine.data.x + (g.value.id + (g.value.type === "input" ? 0 : g.value.machine.inputs.length)) * 90 + 45
                                                      : o.value / x(t).zoom + x(t).offsetX - r.value / 2 / x(t).zoom,
                                              y2:
                                                  g.value.type && g.value.machine && g.value.type !== p.value.type
                                                      ? g.value.machine.data.y + (g.value.type === "input" ? -10 : g.value.machine.height + 10)
                                                      : i.value / x(t).zoom + x(t).offsetY - a.value / 2 / x(t).zoom,
                                              stroke: "gold",
                                              "stroke-width": "10",
                                              "stroke-linecap": "round",
                                          },
                                          null,
                                          8,
                                          jd
                                      ))
                                    : J("", !0),
                            ],
                            12,
                            Hd
                        )),
                        h(
                            "div",
                            {
                                style: Me({
                                    transform: `
				translate(${r.value / 2}px, ${a.value / 2}px)
				scale(${x(t).zoom})
				translate(${-x(t).offsetX}px, ${-x(t).offsetY}px)`,
                                }),
                                class: "l-machines-container",
                            },
                            [
                                (m(!0),
                                y(
                                    Y,
                                    null,
                                    ve(
                                        L.value,
                                        (O) => (
                                            m(),
                                            fe(
                                                Ed,
                                                {
                                                    key: O.id,
                                                    machine: O,
                                                    onInputPipeDragStart: (q, Ie) => te("input", q, Ie),
                                                    onOutputPipeDragStart: (q, Ie) => te("output", q, Ie),
                                                    onInputPipeHover: (q, Ie) => H("input", q, Ie),
                                                    onOutputPipeHover: (q, Ie) => H("output", q, Ie),
                                                    onPipeStopHover: Ye,
                                                    onMoveMachineStart: tt,
                                                },
                                                null,
                                                8,
                                                ["machine", "onInputPipeDragStart", "onOutputPipeDragStart", "onInputPipeHover", "onOutputPipeHover"]
                                            )
                                        )
                                    ),
                                    128
                                )),
                            ],
                            4
                        ),
                        x(t).offsetX > -x(ke).MAX_OFFSET_X ? (m(), y("div", { key: 1, class: "fas fa-chevron-left c-machine-tab__offset c-machine-tab__offset-left", onMousedown: z[0] || (z[0] = (O) => W([-1, 0])) }, null, 32)) : J("", !0),
                        x(t).offsetY > -x(ke).MAX_OFFSET_Y ? (m(), y("div", { key: 2, class: "fas fa-chevron-up c-machine-tab__offset c-machine-tab__offset-up", onMousedown: z[1] || (z[1] = (O) => W([0, -1])) }, null, 32)) : J("", !0),
                        x(t).offsetX < x(ke).MAX_OFFSET_X ? (m(), y("div", { key: 3, class: "fas fa-chevron-right c-machine-tab__offset c-machine-tab__offset-right", onMousedown: z[2] || (z[2] = (O) => W([1, 0])) }, null, 32)) : J("", !0),
                        x(t).offsetY < x(ke).MAX_OFFSET_Y ? (m(), y("div", { key: 4, class: "fas fa-chevron-down c-machine-tab__offset c-machine-tab__offset-down", onMousedown: z[3] || (z[3] = (O) => W([0, 1])) }, null, 32)) : J("", !0),
                        h("div", { class: "fas fa-house c-machine-tab__goto-home", onMousedown: z[4] || (z[4] = (O) => x(Z)("current").returnHome()) }, null, 32),
                    ],
                    512
                )
            );
        },
    });
const Xd = ie(Yd, [["__scopeId", "data-v-68a20f18"]]),
    Wd = { key: 0, class: "c-modal-background-overlay" },
    qd = { class: "c-modal" },
    zd = ee({
        __name: "PopupModal",
        props: { modal: { type: Object, required: !0 } },
        setup(e) {
            return (
                je({
                    on: {
                        ESCAPE_PRESSED() {
                            !R.isOpen || (R.current.value && R.current.value.hide ? R.current.value.hide() : R.hide());
                        },
                    },
                    beforeUnmount() {
                        document.activeElement instanceof HTMLElement && document.activeElement.blur();
                    },
                }),
                (t, s) => (e.modal ? (m(), y("div", Wd, [h("div", qd, [(m(), fe(Ka(e.modal.component), Hr(ar(e.modal.props)), null, 16))])])) : J("", !0))
            );
        },
    });
const Kd = ie(zd, [["__scopeId", "data-v-20b0207a"]]),
    Vd = (e) => (Pe("data-v-a696110d"), (e = e()), Ce(), e),
    Zd = { class: "c-sidebar__shop" },
    Gd = { class: "c-money-display" },
    Jd = Vd(() => h("br", null, null, -1)),
    Qd = { key: 0 },
    ep = { key: 1 },
    tp = ee({
        __name: "SidebarSellPanel",
        setup(e) {
            const t = D(""),
                s = we(() => {
                    switch (t.value) {
                        case "sell1":
                            return me[d.holding.resource].value * Number(d.holding.amount >= 1);
                        case "sellall":
                            return me[d.holding.resource].value * d.holding.amount;
                        default:
                            return 0;
                    }
                });
            function n(i) {
                d.holding.amount >= i && ((d.holding.amount -= i), (d.money += i * me[d.holding.resource].value));
            }
            function o(i) {
                const r = d.holding.amount * i;
                (d.holding.amount -= r), (d.money += r * me[d.holding.resource].value);
            }
            return (i, r) => (
                m(),
                y("div", Zd, [
                    h("h2", Gd, [N(" $" + P(x($e)(x(d).money, 2, 2)) + " ", 1), Jd, s.value ? (m(), y("span", Qd, " +$" + P(x($e)(s.value, 2, 2)), 1)) : (m(), y("br", ep))]),
                    h(
                        "button",
                        {
                            class: ge(["c-sidebar-shop__sell-button", { disabled: x(d).holding.amount < 1 }]),
                            onMouseenter: r[0] || (r[0] = (a) => (t.value = "sell1")),
                            onMouseleave: r[1] || (r[1] = (a) => (t.value = "")),
                            onClick: r[2] || (r[2] = (a) => n(1)),
                        },
                        " Sell 1 ",
                        34
                    ),
                    h(
                        "button",
                        {
                            class: ge(["c-sidebar-shop__sell-button", { disabled: x(d).holding.amount <= 0 }]),
                            onMouseenter: r[3] || (r[3] = (a) => (t.value = "sellall")),
                            onMouseleave: r[4] || (r[4] = (a) => (t.value = "")),
                            onClick: r[5] || (r[5] = (a) => o(1)),
                        },
                        " Sell All ",
                        34
                    ),
                ])
            );
        },
    });
const sp = ie(tp, [["__scopeId", "data-v-a696110d"]]),
    Er = (e) => (Pe("data-v-8480f960"), (e = e()), Ce(), e),
    np = { class: "c-emphasise-text" },
    op = Er(() => h("hr", null, null, -1)),
    ip = Er(() => h("br", null, null, -1)),
    rp = ee({
        __name: "SidebarShopMachineItem",
        props: { shopItem: {} },
        setup(e) {
            let t = D(0),
                s = D("earth"),
                n = D(!1),
                o = D(""),
                i = D(""),
                r = D(0);
            return (
                je({
                    update() {
                        (t.value = e.shopItem.cost),
                            (s.value = e.shopItem.currencyType),
                            (n.value = e.shopItem.canAfford),
                            (o.value = ze(e.shopItem.associatedMachine.config.name).capitalize),
                            (i.value = e.shopItem.associatedMachine.config.description),
                            (r.value = ys[d.currentlyIn][e.shopItem.associatedMachine.config.name]);
                    },
                }),
                (a, c) => (
                    m(),
                    y(
                        "button",
                        { class: ge(["c-sidebar__shop-item", { disabled: !n.value }]), onClick: c[0] || (c[0] = (u) => a.shopItem.buy()) },
                        [h("span", np, P(o.value) + " (" + P(x(ru)(r.value)) + ") ", 1), op, N(" " + P(i.value) + " ", 1), ip, pe(eo, { cost: t.value, type: s.value }, null, 8, ["cost", "type"])],
                        2
                    )
                )
            );
        },
    });
const ap = ie(rp, [["__scopeId", "data-v-8480f960"]]),
    Ir = (e) => (Pe("data-v-d458d03a"), (e = e()), Ce(), e),
    cp = { class: "c-emphasise-text" },
    up = Ir(() => h("hr", null, null, -1)),
    lp = Ir(() => h("br", null, null, -1)),
    fp = ee({
        __name: "SidebarShopUpgradeItem",
        props: { shopItem: {} },
        setup(e) {
            let t = D(0),
                s = D("earth"),
                n = D(!1),
                o = D(""),
                i = D(""),
                r = D(!1);
            return (
                je({
                    update() {
                        (t.value = e.shopItem.cost), (s.value = e.shopItem.currencyType), (n.value = e.shopItem.canAfford), (r.value = e.shopItem.isBought), (o.value = e.shopItem.title), (i.value = e.shopItem.description);
                    },
                }),
                (a, c) => (
                    m(),
                    y(
                        "button",
                        { class: ge(["c-sidebar__shop-item", { "c-sidebar__shop-item--bought": r.value, disabled: !r.value && !n.value }]), onClick: c[0] || (c[0] = (u) => a.shopItem.buy()) },
                        [h("span", cp, P(o.value), 1), up, N(" " + P(i.value) + " ", 1), lp, pe(eo, { cost: t.value, type: s.value }, null, 8, ["cost", "type"])],
                        2
                    )
                )
            );
        },
    });
const dp = ie(fp, [["__scopeId", "data-v-d458d03a"]]),
    pp = { class: "c-sidebar__shop-subtab-container" },
    hp = { class: "c-sidebar__shop" },
    mp = { class: "c-emphasise-text" },
    gp = { class: "c-sidebar__shop" },
    _p = ee({
        __name: "SidebarShop",
        setup(e) {
            let t = Ct([]),
                s = Ct([]),
                n = D(!1),
                o = D(!1),
                i = D(!1);
            return (
                je({
                    update() {
                        (t.value = Zo.currentMachines.filter((r) => r.isUnlocked)),
                            (s.value = Object.values(Zo.currentUpgrades).filter((r) => r.isUnlocked)),
                            (n.value = Z("current").isFullyUpgraded),
                            (o.value = Z("current").hasPartialBuyableUpgrades),
                            (i.value = Z("current").hasWholeBuyableUpgrades);
                    },
                }),
                (r, a) => (
                    m(),
                    y("div", pp, [
                        pe(
                            gr,
                            {
                                subtabs: [
                                    { name: "Machines", buttonClass: "c-sidebar__shop-label" },
                                    { name: "Upgrades", buttonClass: { "c-sidebar__shop-label": !0, "c-darker": n.value, "c-glow-green": o.value, "c-glow-yellow": i.value } },
                                ],
                            },
                            {
                                MachinesTab: de(() => [
                                    h("div", hp, [
                                        h("h3", mp, " \xA0\xA0 Machines: " + P(Object.values(x(d).towns[x(d).currentlyIn].machines).length) + " / 50 ", 1),
                                        (m(!0),
                                        y(
                                            Y,
                                            null,
                                            ve(t.value, (c, u) => (m(), fe(ap, { key: u, "shop-item": c }, null, 8, ["shop-item"]))),
                                            128
                                        )),
                                    ]),
                                ]),
                                UpgradesTab: de(() => [
                                    h("div", gp, [
                                        (m(!0),
                                        y(
                                            Y,
                                            null,
                                            ve(s.value, (c, u) => (m(), fe(dp, { key: u, "shop-item": c }, null, 8, ["shop-item"]))),
                                            128
                                        )),
                                    ]),
                                ]),
                                _: 1,
                            },
                            8,
                            ["subtabs"]
                        ),
                    ])
                )
            );
        },
    });
const yp = ie(_p, [["__scopeId", "data-v-92e678d5"]]),
    vp = { class: "c-sidebar" },
    bp = { class: "c-sidebar__header" },
    wp = ee({
        __name: "Sidebar",
        setup(e) {
            return (t, s) => (
                m(),
                y("div", vp, [
                    h("h2", bp, [
                        h("i", { class: "fas fa-gear", onClick: s[0] || (s[0] = (n) => x(R).settings.show()) }),
                        h("i", { class: "fas fa-map", onClick: s[1] || (s[1] = (n) => x(R).glossary.show()) }),
                        h("i", { class: "fas fa-circle-info", onClick: s[2] || (s[2] = (n) => x(R).info.show()) }),
                        h("i", { class: "fas fa-question-circle", onClick: s[3] || (s[3] = (n) => x(R).h2p.show()) }),
                    ]),
                    pe(sp),
                    pe(yp),
                ])
            );
        },
    });
const Mp = ie(wp, [["__scopeId", "data-v-e9d7568a"]]),
    xp = { class: "c-main-tabs" },
    kp = ee({
        __name: "App",
        setup(e) {
            const t = D(0),
                s = D(0);
            function n(a) {
                return me[a].colour;
            }
            function o(a) {
                (t.value = a.clientX), (s.value = a.clientY);
            }
            const i = D([]),
                r = D(0);
            return (
                je({
                    update() {
                        if (
                            (d.holding.resource === "elixir" && !d.finishedEndCutscene ? (r.value = Math.min(Math.pow(d.holding.amount, 0.7), 0.8)) : (r.value = 0),
                            d.finishedEndCutscene && (i.value = []),
                            (i.value = i.value.filter((a) => a.time + 3e3 > Date.now())),
                            !(Z("home").upgrades.win.effectOrDefault(0) && !d.finishedEndCutscene))
                        ) {
                            if (d.holding.amount && d.holding.resource === "elixir") {
                                const a = ["CONSUME more Elixir", "Elixir is your magnum opus", "An eternal suffering to those who dare touch your Elixir"];
                                Math.random() < (d.holding.amount * 5 + 1) / 100 && i.value.push({ time: Date.now(), text: a[Math.floor(Math.random() * a.length)], pos: [Math.random() * 100, Math.random() * 100] });
                                return;
                            }
                            if (d.producedElixir > 0) {
                                const a = ["CONSUME the Elixir", "Elixir is your making", "Let no one profit off Elixir"];
                                Math.random() < 0.01 && i.value.push({ time: Date.now(), text: a[Math.floor(Math.random() * a.length)], pos: [Math.random() * 100, Math.random() * 100] });
                            }
                        }
                    },
                }),
                (a, c) => (
                    m(),
                    y(
                        "div",
                        { class: "c-game-ui", onMousemove: o },
                        [
                            !x(Z)("home").upgrades.win.effectOrDefault(0) || x(d).finishedEndCutscene
                                ? (m(),
                                  y(
                                      Y,
                                      { key: 0 },
                                      [
                                          h("div", xp, [pe(Xd), pe(Mp)]),
                                          x(R).current.value ? (m(), fe(Kd, { key: 0, modal: x(R).current.value }, null, 8, ["modal"])) : J("", !0),
                                          h("div", { class: "c-elixir-bg", style: Me({ opacity: r.value }) }, null, 4),
                                          (m(!0),
                                          y(
                                              Y,
                                              null,
                                              ve(i.value, (u) => (m(), y("div", { key: u.time, class: "c-elixir-splashtext", style: Me({ top: `${u.pos[0]}%`, left: `${u.pos[1]}%` }) }, P(u.text), 5))),
                                              128
                                          )),
                                      ],
                                      64
                                  ))
                                : (m(), fe(Yf, { key: 1 })),
                            x(d).holding.amount > 0
                                ? (m(), y("div", { key: 2, class: "c-held-item", style: Me({ top: `${s.value}px`, left: `${t.value}px`, "background-color": n(x(d).holding.resource) }) }, P(x($e)(x(d).holding.amount, 2, 1)), 5))
                                : J("", !0),
                        ],
                        32
                    )
                )
            );
        },
    });
const Ep = ie(kp, [["__scopeId", "data-v-fbe52e79"]]),
    Ip = Gc(Ep);
window.addEventListener("load", () => Ip.mount("#app"));
const Ne = {
        events: (function () {
            const e = {};
            for (const t of Go) e[t] = !1;
            return e;
        })(),
        flushPromise: void 0,
        dispatch(e, ...t) {
            (this.events[e] = t || !0), !this.flushPromise && (this.flushPromise = Promise.resolve().then(this.flushEvents.bind(this)));
        },
        flushEvents() {
            this.flushPromise = void 0;
            for (const e in this.events) {
                const t = e,
                    s = this.events[t];
                !s || (s === !0 ? at.dispatch(t) : at.dispatch(t, this.events[t]));
            }
            at.dispatch("UPDATE"),
                (this.events = (function () {
                    const e = {};
                    for (const t of Go) e[t] = !1;
                    return e;
                })());
        },
        update() {
            this.dispatch("UPDATE");
        },
        render() {
            at.dispatch("RENDER");
        },
    },
    be = {
        get timeSpeedFactor() {
            return d.fastTime < 180 ? 2 : Math.min(d.fastTime / 90, 9);
        },
        offlineEfficiency: 0.4,
        gameLoop(e, t = []) {
            let s = Math.min(e, 1);
            if ((s === 1 && (d.fastTime += e - 1), d.fastTime)) {
                const n = this.timeSpeedFactor,
                    o = this.offlineEfficiency,
                    i = Math.min(d.fastTime * o, s * n);
                (s += i), (d.fastTime -= i / o);
            }
            for (const n of t.flat()) n.config.customLoop ? n.config.customLoop.bind(n)(s) : be.tickThisMachine(n, s), n.updates++;
        },
        updateInputStatistics(e, t) {
            for (const s of e.inputs) s.updateStatistics(t);
        },
        updateOutputStatistics(e, t) {
            for (const s of e.outputs) s.updateStatistics(t);
        },
        tickThisMachine(e, t) {
            be.tickMachineProcesses(e, t), dt.tickPipes(e, t);
        },
        tickMachineProcesses(e, t) {
            e.outputDiffs = {};
            const s = e.outputs.filter((o) => o.isUnlocked),
                n = e.inputs.filter((o) => o.isUnlocked);
            s.forEach((o) => {
                const i = o.config;
                if (((o.maxDiff = o.spaceLeft / i.produces.amount), isNaN(o.maxDiff))) {
                    o.maxDiff = 0;
                    return;
                }
                if ((!i.requires && !i.requiresList) || !n.length) return;
                const r = i.requiresList ? i.requiresList : [i.requires];
                for (const a of r) {
                    if (!a) continue;
                    const c = n[a.inputId].statistics.lastItem;
                    if (!c) {
                        o.maxDiff = 0;
                        return;
                    }
                    if (a.resource) {
                        if (c.resource !== a.resource) {
                            o.maxDiff = 0;
                            return;
                        }
                        o.maxDiff = Math.min(o.maxDiff, c.amount / a.amount);
                    } else if (a.resourceList) {
                        const u = a.resourceList.find((p) => p.resource === c.resource);
                        if (!u) {
                            o.maxDiff = 0;
                            return;
                        }
                        o.maxDiff = Math.min(o.maxDiff, c.amount / u.amount);
                    }
                }
            }),
                s.forEach((o, i) => {
                    const r = o.config,
                        a = { resource: r.produces.resource, amount: r.produces.amount * Math.min(o.maxDiff, t) };
                    a.amount && (me[a.resource].isUnlocked = !0), o.addToStack(a), (o.outputDiff = Math.min(o.maxDiff, t)), (e.outputDiffs[r.id === void 0 ? i : r.id] = o.outputDiff);
                }),
                be.updateInputStatistics(e, t),
                be.updateOutputStatistics(e, t),
                n.forEach((o) => {
                    const i = o.config,
                        r = typeof i.consumes == "object" ? Math.min(i.consumes.amount * t, i.consumes.maximum) : i.consumes * t;
                    o.data.length && o.removeFromStack(r);
                });
        },
        add(e, t, s, n) {
            const o = d.towns[e].machines;
            if (Object.values(o).length >= 50) return R.message.showText("Reached machine cap in this town!"), !1;
            const i = Mt[t].newMachine(s, n);
            let r = 0;
            for (; r < 1e3; ) {
                if (!o[r]) {
                    o[r] = i;
                    const a = new Mt[t](e, r);
                    Ue[e].push(a);
                    const c = _s[e];
                    return c && (c[r] = a), ys[e][t]++, (We(Ue[e]).last.isNew = !0), js.dispatch("MACHINE_ADDED"), Ne.dispatch("MACHINE_ADDED"), !0;
                }
                r++;
            }
            return R.message.showText("Could not find suitable id for machine. This message should NEVER appear."), !1;
        },
        remove(e) {
            dt.removeAllInputPipesTo(e), requestAnimationFrame(() => dt.removeAllInputPipesTo(e));
            const t = Ge[e.townType];
            for (let n = 0; n < t.length; n++) for (; t[n] && t[n].out[0].id === e.id; ) t.splice(n, 1);
            Ue[e.townType].splice(
                Ue[e.townType].findIndex((n) => n.id.toString() === e.id.toString()),
                1
            );
            const s = _s[e.townType];
            s && delete s[e.id], ys[e.townType][e.config.name]--, delete d.towns[e.townType].machines[e.id], js.dispatch("MACHINE_DELETED", e.id), Ne.dispatch("MACHINE_DELETED", e.id);
        },
    },
    dt = {
        get isUnlocked() {
            return Z("home").upgrades.pipesBasic.isBought;
        },
        get capacityPerSecond() {
            return this.isUnlocked ? Z("home").upgrades.pipesSpeed1.effectOrDefault(1) * Z("home").upgrades.pipesSpeed2.effectOrDefault(1) * 0.02 : 0;
        },
        tickPipes(e, t) {
            if (!!this.isUnlocked)
                for (let s = 0; s < e.outputs.length; s++) {
                    const n = e.outputs[s];
                    if (!n || !n.data.length) continue;
                    const o = [];
                    let i = 0;
                    const r = We(n.data).last;
                    if (!r) continue;
                    for (const c of e.pipes[s]) {
                        const u = c[1];
                        !u.config.accepts.includes(r.resource) || (o.push(u.isCapped ? 0 : u.config.capacity * this.capacityPerSecond * t), (i += u.config.capacity * this.capacityPerSecond * t));
                    }
                    const a = Math.min(r.amount / i, 1);
                    for (const c of e.pipes[s]) {
                        const u = c[1];
                        if (!u.config.accepts.includes(r.resource)) continue;
                        const p = a * o.shift();
                        n.removeFromStack(u.addToStack({ resource: r.resource, amount: p }));
                    }
                }
        },
        removeAllInputPipesTo(e, t) {
            const s = e.townType;
            if (t === void 0) for (const n of Ue[s]) n.removeAllPipes(e);
            else for (const n of Ue[s]) if (n.removePipe(e, t)) return;
        },
    },
    Xs = {};
window.shiftDown = !1;
window.addEventListener("keydown", (e) => {
    shiftDown = e.shiftKey;
    const t = e.key.toLowerCase();
    if (!Xs[t])
        switch (((Xs[t] = !0), t)) {
            case "w":
            case "arrowup":
                Ne.dispatch("ARROW_KEYDOWN", "up");
                break;
            case "a":
            case "arrowleft":
                Ne.dispatch("ARROW_KEYDOWN", "left");
                break;
            case "s":
            case "arrowdown":
                Ne.dispatch("ARROW_KEYDOWN", "down");
                break;
            case "d":
            case "arrowright":
                Ne.dispatch("ARROW_KEYDOWN", "right");
                break;
            case "escape":
                Ne.dispatch("ESCAPE_PRESSED");
                break;
            case "enter":
                Ne.dispatch("ENTER_PRESSED");
        }
});
window.addEventListener("keyup", (e) => {
    shiftDown = e.shiftKey;
    const t = e.key.toLowerCase();
    if (!!Xs[t])
        switch (((Xs[t] = !1), t)) {
            case "w":
            case "arrowup":
                Ne.dispatch("ARROW_KEYUP", "up");
                break;
            case "a":
            case "arrowleft":
                Ne.dispatch("ARROW_KEYUP", "left");
                break;
            case "s":
            case "arrowdown":
                Ne.dispatch("ARROW_KEYUP", "down");
                break;
            case "d":
            case "arrowright":
                Ne.dispatch("ARROW_KEYUP", "right");
                break;
        }
});
window.addEventListener("contextmenu", (e) => e.preventDefault());
let li = Date.now();
function Sp(e) {
    const t = e != null ? e : (Date.now() - li) / 1e3;
    e || (li = Date.now()),
        js.dispatch("GAME_TICK_BEFORE"),
        (!Z("home").upgrades.win.effectOrDefault(0) || d.finishedEndCutscene) && be.gameLoop(t, Object.values(Ue)),
        (d.lastUpdateTime = Date.now()),
        Ne.update(),
        js.dispatch("GAME_TICK_AFTER");
}
window.gameLoopInterval = setInterval(() => Sp(), 30);
function Tp() {
    Ne.render();
}
window.renderInterval = setInterval(() => Tp(), 16);
at.on(0, "ERROR", (e) => {
    R.message.showText(e), clearInterval(gameLoopInterval), clearInterval(saveInterval);
});
