"use strict";
var Ve = Object.create;
var Y = Object.defineProperty;
var Ye = Object.getOwnPropertyDescriptor;
var Be = Object.getOwnPropertyNames;
var Ue = Object.getPrototypeOf,
    Ke = Object.prototype.hasOwnProperty;
var je = (a, e) => () => (e || a((e = { exports: {} }).exports, e), e.exports),
    ze = (a, e) => {
        for (var t in e) Y(a, t, { get: e[t], enumerable: !0 });
    },
    he = (a, e, t, n) => {
        if ((e && typeof e == "object") || typeof e == "function")
            for (let i of Be(e))
                !Ke.call(a, i) &&
                    i !== t &&
                    Y(a, i, {
                        get: () => e[i],
                        enumerable: !(n = Ye(e, i)) || n.enumerable,
                    });
        return a;
    };
var qe = (a, e, t) => (
        (t = a != null ? Ve(Ue(a)) : {}),
        he(
            e || !a || !a.__esModule
                ? Y(t, "default", { value: a, enumerable: !0 })
                : t,
            a,
        )
    ),
    Ge = (a) => he(Y({}, "__esModule", { value: !0 }), a);
var Ce = je((l) => {
    "use strict";
    Object.defineProperty(l, "__esModule", { value: !0 });
    var g = require("obsidian"),
        ne = "YYYY-MM-DD",
        ae = "gggg-[W]ww",
        Ne = "YYYY-MM",
        ke = "YYYY-[Q]Q",
        Pe = "YYYY";
    function F(a) {
        let e = window.app.plugins.getPlugin("periodic-notes");
        return e && e.settings?.[a]?.enabled;
    }
    function O() {
        try {
            let { internalPlugins: a, plugins: e } = window.app;
            if (F("daily")) {
                let {
                    format: o,
                    folder: s,
                    template: c,
                } = e.getPlugin("periodic-notes")?.settings?.daily || {};
                return {
                    format: o || ne,
                    folder: s?.trim() || "",
                    template: c?.trim() || "",
                };
            }
            let {
                folder: t,
                format: n,
                template: i,
            } = a.getPluginById("daily-notes")?.instance?.options || {};
            return {
                format: n || ne,
                folder: t?.trim() || "",
                template: i?.trim() || "",
            };
        } catch (a) {
            console.info("No custom daily note settings found!", a);
        }
    }
    function L() {
        try {
            let a = window.app.plugins,
                e = a.getPlugin("calendar")?.options,
                t = a.getPlugin("periodic-notes")?.settings?.weekly;
            if (F("weekly"))
                return {
                    format: t.format || ae,
                    folder: t.folder?.trim() || "",
                    template: t.template?.trim() || "",
                };
            let n = e || {};
            return {
                format: n.weeklyNoteFormat || ae,
                folder: n.weeklyNoteFolder?.trim() || "",
                template: n.weeklyNoteTemplate?.trim() || "",
            };
        } catch (a) {
            console.info("No custom weekly note settings found!", a);
        }
    }
    function x() {
        let a = window.app.plugins;
        try {
            let e =
                (F("monthly") &&
                    a.getPlugin("periodic-notes")?.settings?.monthly) ||
                {};
            return {
                format: e.format || Ne,
                folder: e.folder?.trim() || "",
                template: e.template?.trim() || "",
            };
        } catch (e) {
            console.info("No custom monthly note settings found!", e);
        }
    }
    function C() {
        let a = window.app.plugins;
        try {
            let e =
                (F("quarterly") &&
                    a.getPlugin("periodic-notes")?.settings?.quarterly) ||
                {};
            return {
                format: e.format || ke,
                folder: e.folder?.trim() || "",
                template: e.template?.trim() || "",
            };
        } catch (e) {
            console.info("No custom quarterly note settings found!", e);
        }
    }
    function H() {
        let a = window.app.plugins;
        try {
            let e =
                (F("yearly") &&
                    a.getPlugin("periodic-notes")?.settings?.yearly) ||
                {};
            return {
                format: e.format || Pe,
                folder: e.folder?.trim() || "",
                template: e.template?.trim() || "",
            };
        } catch (e) {
            console.info("No custom yearly note settings found!", e);
        }
    }
    function De(...a) {
        let e = [];
        for (let n = 0, i = a.length; n < i; n++) e = e.concat(a[n].split("/"));
        let t = [];
        for (let n = 0, i = e.length; n < i; n++) {
            let o = e[n];
            !o || o === "." || t.push(o);
        }
        return e[0] === "" && t.unshift(""), t.join("/");
    }
    function Qe(a) {
        let e = a.substring(a.lastIndexOf("/") + 1);
        return (
            e.lastIndexOf(".") != -1 &&
                (e = e.substring(0, e.lastIndexOf("."))),
            e
        );
    }
    async function Je(a) {
        let e = a.replace(/\\/g, "/").split("/");
        if ((e.pop(), e.length)) {
            let t = De(...e);
            window.app.vault.getAbstractFileByPath(t) ||
                (await window.app.vault.createFolder(t));
        }
    }
    async function I(a, e) {
        e.endsWith(".md") || (e += ".md");
        let t = g.normalizePath(De(a, e));
        return await Je(t), t;
    }
    async function A(a) {
        let { metadataCache: e, vault: t } = window.app,
            n = g.normalizePath(a);
        if (n === "/") return Promise.resolve(["", null]);
        try {
            let i = e.getFirstLinkpathDest(n, ""),
                o = await t.cachedRead(i),
                s = window.app.foldManager.load(i);
            return [o, s];
        } catch (i) {
            return (
                console.error(
                    `Failed to read the daily note template '${n}'`,
                    i,
                ),
                new g.Notice("Failed to read the daily note template"),
                ["", null]
            );
        }
    }
    function k(a, e = "day") {
        let t = a.clone().startOf(e).format();
        return `${e}-${t}`;
    }
    function Te(a) {
        return a.replace(/\[[^\]]*\]/g, "");
    }
    function Ze(a, e) {
        if (e === "week") {
            let t = Te(a);
            return /w{1,2}/i.test(t) && (/M{1,4}/.test(t) || /D{1,4}/.test(t));
        }
        return !1;
    }
    function M(a, e) {
        return Ee(a.basename, e);
    }
    function Xe(a, e) {
        return Ee(Qe(a), e);
    }
    function Ee(a, e) {
        let n = { day: O, week: L, month: x, quarter: C, year: H }
                [e]()
                .format.split("/")
                .pop(),
            i = window.moment(a, n, !0);
        if (!i.isValid()) return null;
        if (Ze(n, e) && e === "week") {
            let o = Te(n);
            if (/w{1,2}/i.test(o))
                return window.moment(
                    a,
                    n.replace(/M{1,4}/g, "").replace(/D{1,4}/g, ""),
                    !1,
                );
        }
        return i;
    }
    var ie = class extends Error {};
    async function Ae(a) {
        let e = window.app,
            { vault: t } = e,
            n = window.moment,
            { template: i, format: o, folder: s } = O(),
            [c, m] = await A(i),
            r = a.format(o),
            d = await I(s, r);
        try {
            let p = await t.create(
                d,
                c
                    .replace(/{{\s*date\s*}}/gi, r)
                    .replace(/{{\s*time\s*}}/gi, n().format("HH:mm"))
                    .replace(/{{\s*title\s*}}/gi, r)
                    .replace(
                        /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
                        (P, D, E, v, w, f) => {
                            let X = n(),
                                ee = a
                                    .clone()
                                    .set({
                                        hour: X.get("hour"),
                                        minute: X.get("minute"),
                                        second: X.get("second"),
                                    });
                            return (
                                E && ee.add(parseInt(v, 10), w),
                                f
                                    ? ee.format(f.substring(1).trim())
                                    : ee.format(o)
                            );
                        },
                    )
                    .replace(
                        /{{\s*yesterday\s*}}/gi,
                        a.clone().subtract(1, "day").format(o),
                    )
                    .replace(
                        /{{\s*tomorrow\s*}}/gi,
                        a.clone().add(1, "d").format(o),
                    ),
            );
            return e.foldManager.save(p, m), p;
        } catch (p) {
            console.error(`Failed to create file: '${d}'`, p),
                new g.Notice("Unable to create new file.");
        }
    }
    function et(a, e) {
        return e[k(a, "day")] ?? null;
    }
    function tt() {
        let { vault: a } = window.app,
            { folder: e } = O(),
            t = a.getAbstractFileByPath(g.normalizePath(e));
        if (!t) throw new ie("Failed to find daily notes folder");
        let n = {};
        return (
            g.Vault.recurseChildren(t, (i) => {
                if (i instanceof g.TFile) {
                    let o = M(i, "day");
                    if (o) {
                        let s = k(o, "day");
                        n[s] = i;
                    }
                }
            }),
            n
        );
    }
    var oe = class extends Error {};
    function nt() {
        let { moment: a } = window,
            e = a.localeData()._week.dow,
            t = [
                "sunday",
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
            ];
        for (; e; ) t.push(t.shift()), e--;
        return t;
    }
    function at(a) {
        return nt().indexOf(a.toLowerCase());
    }
    async function Me(a) {
        let { vault: e } = window.app,
            { template: t, format: n, folder: i } = L(),
            [o, s] = await A(t),
            c = a.format(n),
            m = await I(i, c);
        try {
            let r = await e.create(
                m,
                o
                    .replace(
                        /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
                        (d, p, P, D, E, v) => {
                            let w = window.moment(),
                                f = a
                                    .clone()
                                    .set({
                                        hour: w.get("hour"),
                                        minute: w.get("minute"),
                                        second: w.get("second"),
                                    });
                            return (
                                P && f.add(parseInt(D, 10), E),
                                v
                                    ? f.format(v.substring(1).trim())
                                    : f.format(n)
                            );
                        },
                    )
                    .replace(/{{\s*title\s*}}/gi, c)
                    .replace(
                        /{{\s*time\s*}}/gi,
                        window.moment().format("HH:mm"),
                    )
                    .replace(
                        /{{\s*(sunday|monday|tuesday|wednesday|thursday|friday|saturday)\s*:(.*?)}}/gi,
                        (d, p, P) => {
                            let D = at(p);
                            return a.weekday(D).format(P.trim());
                        },
                    ),
            );
            return window.app.foldManager.save(r, s), r;
        } catch (r) {
            console.error(`Failed to create file: '${m}'`, r),
                new g.Notice("Unable to create new file.");
        }
    }
    function it(a, e) {
        return e[k(a, "week")] ?? null;
    }
    function ot() {
        let a = {};
        if (!Fe()) return a;
        let { vault: e } = window.app,
            { folder: t } = L(),
            n = e.getAbstractFileByPath(g.normalizePath(t));
        if (!n) throw new oe("Failed to find weekly notes folder");
        return (
            g.Vault.recurseChildren(n, (i) => {
                if (i instanceof g.TFile) {
                    let o = M(i, "week");
                    if (o) {
                        let s = k(o, "week");
                        a[s] = i;
                    }
                }
            }),
            a
        );
    }
    var se = class extends Error {};
    async function Se(a) {
        let { vault: e } = window.app,
            { template: t, format: n, folder: i } = x(),
            [o, s] = await A(t),
            c = a.format(n),
            m = await I(i, c);
        try {
            let r = await e.create(
                m,
                o
                    .replace(
                        /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
                        (d, p, P, D, E, v) => {
                            let w = window.moment(),
                                f = a
                                    .clone()
                                    .set({
                                        hour: w.get("hour"),
                                        minute: w.get("minute"),
                                        second: w.get("second"),
                                    });
                            return (
                                P && f.add(parseInt(D, 10), E),
                                v
                                    ? f.format(v.substring(1).trim())
                                    : f.format(n)
                            );
                        },
                    )
                    .replace(/{{\s*date\s*}}/gi, c)
                    .replace(
                        /{{\s*time\s*}}/gi,
                        window.moment().format("HH:mm"),
                    )
                    .replace(/{{\s*title\s*}}/gi, c),
            );
            return window.app.foldManager.save(r, s), r;
        } catch (r) {
            console.error(`Failed to create file: '${m}'`, r),
                new g.Notice("Unable to create new file.");
        }
    }
    function st(a, e) {
        return e[k(a, "month")] ?? null;
    }
    function rt() {
        let a = {};
        if (!Oe()) return a;
        let { vault: e } = window.app,
            { folder: t } = x(),
            n = e.getAbstractFileByPath(g.normalizePath(t));
        if (!n) throw new se("Failed to find monthly notes folder");
        return (
            g.Vault.recurseChildren(n, (i) => {
                if (i instanceof g.TFile) {
                    let o = M(i, "month");
                    if (o) {
                        let s = k(o, "month");
                        a[s] = i;
                    }
                }
            }),
            a
        );
    }
    var re = class extends Error {};
    async function lt(a) {
        let { vault: e } = window.app,
            { template: t, format: n, folder: i } = C(),
            [o, s] = await A(t),
            c = a.format(n),
            m = await I(i, c);
        try {
            let r = await e.create(
                m,
                o
                    .replace(
                        /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
                        (d, p, P, D, E, v) => {
                            let w = window.moment(),
                                f = a
                                    .clone()
                                    .set({
                                        hour: w.get("hour"),
                                        minute: w.get("minute"),
                                        second: w.get("second"),
                                    });
                            return (
                                P && f.add(parseInt(D, 10), E),
                                v
                                    ? f.format(v.substring(1).trim())
                                    : f.format(n)
                            );
                        },
                    )
                    .replace(/{{\s*date\s*}}/gi, c)
                    .replace(
                        /{{\s*time\s*}}/gi,
                        window.moment().format("HH:mm"),
                    )
                    .replace(/{{\s*title\s*}}/gi, c),
            );
            return window.app.foldManager.save(r, s), r;
        } catch (r) {
            console.error(`Failed to create file: '${m}'`, r),
                new g.Notice("Unable to create new file.");
        }
    }
    function ct(a, e) {
        return e[k(a, "quarter")] ?? null;
    }
    function dt() {
        let a = {};
        if (!Le()) return a;
        let { vault: e } = window.app,
            { folder: t } = C(),
            n = e.getAbstractFileByPath(g.normalizePath(t));
        if (!n) throw new re("Failed to find quarterly notes folder");
        return (
            g.Vault.recurseChildren(n, (i) => {
                if (i instanceof g.TFile) {
                    let o = M(i, "quarter");
                    if (o) {
                        let s = k(o, "quarter");
                        a[s] = i;
                    }
                }
            }),
            a
        );
    }
    var le = class extends Error {};
    async function pt(a) {
        let { vault: e } = window.app,
            { template: t, format: n, folder: i } = H(),
            [o, s] = await A(t),
            c = a.format(n),
            m = await I(i, c);
        try {
            let r = await e.create(
                m,
                o
                    .replace(
                        /{{\s*(date|time)\s*(([+-]\d+)([yqmwdhs]))?\s*(:.+?)?}}/gi,
                        (d, p, P, D, E, v) => {
                            let w = window.moment(),
                                f = a
                                    .clone()
                                    .set({
                                        hour: w.get("hour"),
                                        minute: w.get("minute"),
                                        second: w.get("second"),
                                    });
                            return (
                                P && f.add(parseInt(D, 10), E),
                                v
                                    ? f.format(v.substring(1).trim())
                                    : f.format(n)
                            );
                        },
                    )
                    .replace(/{{\s*date\s*}}/gi, c)
                    .replace(
                        /{{\s*time\s*}}/gi,
                        window.moment().format("HH:mm"),
                    )
                    .replace(/{{\s*title\s*}}/gi, c),
            );
            return window.app.foldManager.save(r, s), r;
        } catch (r) {
            console.error(`Failed to create file: '${m}'`, r),
                new g.Notice("Unable to create new file.");
        }
    }
    function ut(a, e) {
        return e[k(a, "year")] ?? null;
    }
    function gt() {
        let a = {};
        if (!xe()) return a;
        let { vault: e } = window.app,
            { folder: t } = H(),
            n = e.getAbstractFileByPath(g.normalizePath(t));
        if (!n) throw new le("Failed to find yearly notes folder");
        return (
            g.Vault.recurseChildren(n, (i) => {
                if (i instanceof g.TFile) {
                    let o = M(i, "year");
                    if (o) {
                        let s = k(o, "year");
                        a[s] = i;
                    }
                }
            }),
            a
        );
    }
    function mt() {
        let { app: a } = window,
            e = a.internalPlugins.plugins["daily-notes"];
        if (e && e.enabled) return !0;
        let t = a.plugins.getPlugin("periodic-notes");
        return t && t.settings?.daily?.enabled;
    }
    function Fe() {
        let { app: a } = window;
        if (a.plugins.getPlugin("calendar")) return !0;
        let e = a.plugins.getPlugin("periodic-notes");
        return e && e.settings?.weekly?.enabled;
    }
    function Oe() {
        let { app: a } = window,
            e = a.plugins.getPlugin("periodic-notes");
        return e && e.settings?.monthly?.enabled;
    }
    function Le() {
        let { app: a } = window,
            e = a.plugins.getPlugin("periodic-notes");
        return e && e.settings?.quarterly?.enabled;
    }
    function xe() {
        let { app: a } = window,
            e = a.plugins.getPlugin("periodic-notes");
        return e && e.settings?.yearly?.enabled;
    }
    function ht(a) {
        let e = { day: O, week: L, month: x, quarter: C, year: H }[a];
        return e();
    }
    function ft(a, e) {
        return { day: Ae, month: Se, week: Me }[a](e);
    }
    l.DEFAULT_DAILY_NOTE_FORMAT = ne;
    l.DEFAULT_MONTHLY_NOTE_FORMAT = Ne;
    l.DEFAULT_QUARTERLY_NOTE_FORMAT = ke;
    l.DEFAULT_WEEKLY_NOTE_FORMAT = ae;
    l.DEFAULT_YEARLY_NOTE_FORMAT = Pe;
    l.appHasDailyNotesPluginLoaded = mt;
    l.appHasMonthlyNotesPluginLoaded = Oe;
    l.appHasQuarterlyNotesPluginLoaded = Le;
    l.appHasWeeklyNotesPluginLoaded = Fe;
    l.appHasYearlyNotesPluginLoaded = xe;
    l.createDailyNote = Ae;
    l.createMonthlyNote = Se;
    l.createPeriodicNote = ft;
    l.createQuarterlyNote = lt;
    l.createWeeklyNote = Me;
    l.createYearlyNote = pt;
    l.getAllDailyNotes = tt;
    l.getAllMonthlyNotes = rt;
    l.getAllQuarterlyNotes = dt;
    l.getAllWeeklyNotes = ot;
    l.getAllYearlyNotes = gt;
    l.getDailyNote = et;
    l.getDailyNoteSettings = O;
    l.getDateFromFile = M;
    l.getDateFromPath = Xe;
    l.getDateUID = k;
    l.getMonthlyNote = st;
    l.getMonthlyNoteSettings = x;
    l.getPeriodicNoteSettings = ht;
    l.getQuarterlyNote = ct;
    l.getQuarterlyNoteSettings = C;
    l.getTemplateInfo = A;
    l.getWeeklyNote = it;
    l.getWeeklyNoteSettings = L;
    l.getYearlyNote = ut;
    l.getYearlyNoteSettings = H;
});
var bt = {};
ze(bt, { default: () => Z });
module.exports = Ge(bt);
var N = require("obsidian");
var b = require("obsidian");
var He = require("obsidian");
var B = require("obsidian");
function T(a) {
    return a ? (a.extension == "md" ? a.path.slice(0, -3) : a.path) : "";
}
function fe(a) {
    return a.split("/").slice(-1)[0].contains(".") ? a : `${a}.md`;
}
function we(a) {
    let e = a.vault
        .getFiles()
        .filter((t) => ["md", "canvas"].contains(t.extension));
    if (e.length) {
        let t = Math.floor(Math.random() * e.length);
        return T(e[t]);
    }
}
function ye(a) {
    return a.workspace.getActiveViewOfType(B.View)?.getViewType() == "empty";
}
function te(a, e) {
    return a.localeCompare(e, void 0, { sensitivity: "accent" }) === 0;
}
function U(a) {
    return new Promise((e) => setTimeout(e, a));
}
async function ve(a) {
    let e = a.workspace.getLayout();
    (e.main = {
        id: "5324373015726ba8",
        type: "split",
        children: [
            {
                id: "4509724f8bf84da7",
                type: "tabs",
                children: [
                    {
                        id: "e7a7b303c61786dc",
                        type: "leaf",
                        state: {
                            type: "empty",
                            state: {},
                            icon: "lucide-file",
                            title: "New tab",
                        },
                    },
                ],
            },
        ],
        direction: "vertical",
    }),
        (e.active = "e7a7b303c61786dc"),
        await a.workspace.changeLayout(e),
        B.Platform.isMobile && (a.workspace.rightSplit?.updateInfo(), $e(a));
}
function $e(a) {
    let e = a.internalPlugins.plugins.sync?.instance;
    e &&
        a.workspace.onLayoutReady(() => {
            (e.statusIconEl = a.workspace.rightSplit.addHeaderButton(
                "sync-small",
                e.openStatusIconMenu.bind(e),
            )),
                e.statusIconEl.addEventListener(
                    "contextmenu",
                    e.openStatusIconMenu.bind(e),
                ),
                e.statusIconEl.addClass("sync-status-icon");
        });
}
function be(a) {
    let e = new Promise((t) => {
        let n = async () => {
            t(), a.workspace.off("layout-change", n);
        };
        a.workspace.on("layout-change", n);
    });
    return Promise.race([e, new Promise((t) => setTimeout(t, 1500))]);
}
var u = qe(Ce()),
    ce = {
        ["Daily Note"]: {
            noun: "day",
            adjective: "daily",
            create: u.createDailyNote,
            get: u.getDailyNote,
            getAll: u.getAllDailyNotes,
        },
        ["Weekly Note"]: {
            noun: "week",
            adjective: "weekly",
            create: u.createWeeklyNote,
            get: u.getWeeklyNote,
            getAll: u.getAllWeeklyNotes,
        },
        ["Monthly Note"]: {
            noun: "month",
            adjective: "monthly",
            create: u.createMonthlyNote,
            get: u.getMonthlyNote,
            getAll: u.getAllMonthlyNotes,
        },
        ["Yearly Note"]: {
            noun: "year",
            adjective: "yearly",
            create: u.createYearlyNote,
            get: u.getYearlyNote,
            getAll: u.getAllYearlyNotes,
        },
    },
    K = ["Daily Note", "Weekly Note", "Monthly Note", "Yearly Note"],
    Ie = "Date-dependent file",
    de =
        "Date-dependent notes in Homepage have been removed. Set your Homepage as a Periodic or Daily Note instead.";
async function Re(a, e) {
    let t = e.communityPlugins["periodic-notes"],
        n = ce[a],
        i = (0, He.moment)().startOf(n.noun),
        o;
    if (We(t)) {
        let s = n.getAll();
        Object.keys(s).length
            ? (o = n.get(i, s) || (await n.create(i)))
            : (o = await n.create(i));
    } else
        t.cache.initialize(),
            (o =
                t.getPeriodicNote(n.noun, i) ||
                (await t.createPeriodicNote(n.noun, i)));
    return T(o);
}
function _e(a, e) {
    if (a == "Daily Note" && e.internalPlugins["daily-notes"]?.enabled)
        return !0;
    let t = e.communityPlugins["periodic-notes"];
    if (!t) return !1;
    if (We(t)) {
        let n = ce[a].adjective;
        return t.settings[n]?.enabled;
    } else {
        let n = ce[a].noun;
        return t?.calendarSetManager?.getActiveSet()[n]?.enabled;
    }
}
function j(a) {
    let e = a.internalPlugins["daily-notes"];
    return e?.enabled && e?.instance.options.autorun;
}
function We(a) {
    return (a?.manifest.version || "0").startsWith("0");
}
var y = require("obsidian");
var h = require("obsidian");
var z = class extends h.AbstractInputSuggest {
        getSuggestions(t) {
            let n = this.app.vault.getAllLoadedFiles(),
                i = [],
                o = t.toLowerCase();
            return (
                n.forEach((s) => {
                    s instanceof h.TFile &&
                        ["md", "canvas"].contains(s.extension) &&
                        s.path.toLowerCase().contains(o) &&
                        i.push(s);
                }),
                i
            );
        }
        renderSuggestion(t, n) {
            t.extension == "md"
                ? n.setText(T(t))
                : (n.setText(t.path.slice(0, -7)),
                  n.insertAdjacentHTML(
                      "beforeend",
                      '<div class="nav-file-tag" style="display:inline-block;vertical-align:middle">canvas</div>',
                  ));
        }
        selectSuggestion(t) {
            (this.textInputEl.value = T(t)),
                this.textInputEl.trigger("input"),
                this.close();
        }
    },
    q = class extends h.AbstractInputSuggest {
        getSuggestions(t) {
            let n = Object.keys(
                    this.app.internalPlugins.plugins.workspaces?.instance
                        .workspaces,
                ),
                i = t.toLowerCase();
            return n.filter((o) => o.toLowerCase().contains(i));
        }
        renderSuggestion(t, n) {
            n.setText(t);
        }
        selectSuggestion(t) {
            (this.textInputEl.value = t),
                this.textInputEl.trigger("input"),
                this.close();
        }
    },
    G = class {
        constructor(e) {
            (this.app = e.plugin.app),
                (this.homepage = e.plugin.homepage),
                (this.tab = e),
                (this.container = e.containerEl.createDiv({
                    cls: "nv-command-box",
                })),
                (this.dropzone = document.createElement("div")),
                (this.dropzone.className = "nv-command-pill nv-dropzone"),
                this.dropzone.addEventListener("dragenter", (t) =>
                    t.preventDefault(),
                ),
                this.dropzone.addEventListener("dragover", (t) =>
                    t.preventDefault(),
                ),
                this.dropzone.addEventListener("drop", () =>
                    this.terminateDrag(),
                ),
                this.update();
        }
        update() {
            (this.container.innerHTML = ""),
                (this.activeDrag = null),
                (this.activeCommand = null);
            for (let e of this.homepage.data.commands) {
                let t = this.app.commands.findCommand(e.id),
                    n = this.container.createDiv({
                        cls: "nv-command-pill",
                        attr: { draggable: !0 },
                    });
                n.addEventListener("dragstart", (o) => {
                    (o.dataTransfer.effectAllowed = "move"),
                        (this.activeCommand =
                            this.homepage.data.commands.splice(
                                this.indexOf(n),
                                1,
                            )[0]),
                        (this.activeDrag = n),
                        (this.dropzone.style.width = `${n.clientWidth}px`),
                        (this.dropzone.style.height = `${n.clientHeight}px`);
                }),
                    n.addEventListener("dragover", (o) =>
                        this.moveDropzone(n, o),
                    ),
                    n.addEventListener("drop", (o) => o.preventDefault()),
                    n.addEventListener("dragend", () => this.terminateDrag()),
                    n.createSpan({
                        cls: "nv-command-text",
                        text: t?.name ?? e.id,
                    });
                let i = new h.ButtonComponent(n)
                    .setIcon("route")
                    .setClass("clickable-icon")
                    .setClass("nv-command-period")
                    .onClick((o) => this.showMenu(e, o, i));
                e.period != "Both" &&
                    (i.setClass("nv-command-selected"),
                    i.setIcon(""),
                    i.buttonEl.createSpan({ text: e.period })),
                    new h.ButtonComponent(n)
                        .setIcon("trash-2")
                        .setClass("clickable-icon")
                        .setClass("nv-command-delete")
                        .onClick(() => this.delete(e)),
                    t ||
                        (n.classList.add("nv-command-invalid"),
                        n.prepend((0, h.getIcon)("ban")),
                        (0, h.setTooltip)(
                            n,
                            "This command can't be found, so it won't be executed. It may belong to a disabled plugin.",
                            { delay: 0.001 },
                        ));
            }
            new h.ButtonComponent(this.container)
                .setClass("nv-command-add-button")
                .setButtonText("Add...")
                .onClick(() => {
                    new pe(this.tab).open();
                });
        }
        delete(e) {
            this.homepage.data.commands.remove(e),
                this.homepage.save(),
                this.update();
        }
        showMenu(e, t, n) {
            let i = new h.Menu();
            for (let s of Object.values($))
                i.addItem((c) => {
                    c.setTitle(s),
                        c.setChecked(e.period == s),
                        c.onClick(() => {
                            (e.period = s), this.homepage.save(), this.update();
                        });
                });
            let o = n.buttonEl.getBoundingClientRect();
            i.showAtPosition({ x: o.x - 22, y: o.y + o.height + 8 });
        }
        indexOf(e) {
            return Array.from(this.container.children).indexOf(e);
        }
        moveDropzone(e, t) {
            if (!this.activeDrag) return;
            this.activeDrag.hidden = !0;
            let n = e.getBoundingClientRect();
            t.x < n.left + n.width / 2
                ? this.container.insertBefore(this.dropzone, e)
                : this.container.insertAfter(this.dropzone, e),
                t.preventDefault();
        }
        terminateDrag() {
            this.activeCommand &&
                (this.homepage.data.commands.splice(
                    this.indexOf(this.dropzone),
                    0,
                    this.activeCommand,
                ),
                this.homepage.save(),
                this.update());
        }
    },
    pe = class extends h.FuzzySuggestModal {
        constructor(t) {
            super(t.plugin.app);
            (this.homepage = t.plugin.homepage), (this.tab = t);
        }
        getItems() {
            return Object.values(this.app.commands.commands);
        }
        getItemText(t) {
            return t.name;
        }
        onChooseItem(t) {
            if (t.id === "homepage:open-homepage") {
                new h.Notice("Really?");
                return;
            } else
                this.homepage.data.commands ||
                    (this.homepage.data.commands = []);
            this.homepage.data.commands.push({ id: t.id, period: "Both" }),
                this.homepage.save(),
                this.tab.commandBox.update();
        }
    };
var ue = { version: 4, homepages: {}, separateMobile: !1 },
    S = {
        value: "Home",
        kind: "File",
        openOnStartup: !0,
        openMode: "Replace all open notes",
        manualOpenMode: "Keep open notes",
        view: "Default view",
        revertView: !0,
        openWhenEmpty: !1,
        refreshDataview: !1,
        autoCreate: !1,
        autoScroll: !1,
        pin: !1,
        commands: [],
        alwaysApply: !1,
        hideReleaseNotes: !1,
    },
    wt = {
        ["File"]: "Enter a note or canvas to use.",
        ["Workspace"]: "Enter an Obsidian workspace to use.",
        ["Graph view"]: "Your graph view will be used.",
        ["Nothing"]:
            "Nothing will occur by default. Any commands added will still take effect.",
        ["Random file"]:
            "A random note or canvas from your Obsidian folder will be selected.",
        ["Daily Note"]: "Your Daily Note or Periodic Daily Note will be used.",
        ["Weekly Note"]: "Your Periodic Weekly Note will be used.",
        ["Monthly Note"]: "Your Periodic Monthly Note will be used.",
        ["Yearly Note"]: "Your Periodic Yearly Note will be used.",
    },
    Q = class extends y.PluginSettingTab {
        constructor(t, n) {
            super(t, n);
            (this.plugin = n),
                (this.settings = n.settings),
                this.plugin.addCommand({
                    id: "copy-debug-info",
                    name: "Copy debug info",
                    callback: async () => await this.copyDebugInfo(),
                });
        }
        sanitiseNote(t) {
            return t === null || t.match(/^\s*$/) !== null
                ? null
                : (0, y.normalizePath)(t);
        }
        display() {
            let t = this.plugin.homepage.data.kind == "Workspace",
                n = this.plugin.homepage.data.kind,
                i = j(this.plugin),
                o = !1,
                s = t ? q : z;
            this.containerEl.empty(), (this.elements = {});
            let c = new y.Setting(this.containerEl)
                .setName("Homepage")
                .addDropdown(async (d) => {
                    for (let p of Object.values(R)) {
                        if (!this.plugin.hasRequiredPlugin(p))
                            if (p == this.plugin.homepage.data.kind) o = !0;
                            else {
                                d.selectEl.createEl("option", {
                                    text: p,
                                    attr: { disabled: !0 },
                                });
                                continue;
                            }
                        d.addOption(p, p);
                    }
                    d.setValue(this.plugin.homepage.data.kind),
                        d.onChange(async (p) => {
                            (this.plugin.homepage.data.kind = p),
                                await this.plugin.homepage.save(),
                                this.display();
                        });
                });
            c.settingEl.id = "nv-main-setting";
            let m = c.settingEl.createEl("article", {
                text: wt[n],
                attr: { id: "nv-desc" },
            });
            o &&
                m.createDiv({
                    text: "The plugin required for this homepage type isn't available.",
                    cls: "mod-warning",
                }),
                me.includes(n)
                    ? c.addText((d) => {
                          d.setDisabled(!0);
                      })
                    : c.addText((d) => {
                          new s(this.app, d.inputEl),
                              d.setPlaceholder(S.value),
                              d.setValue(
                                  S.value == this.plugin.homepage.data.value
                                      ? ""
                                      : this.plugin.homepage.data.value,
                              ),
                              d.onChange(async (p) => {
                                  (this.plugin.homepage.data.value =
                                      this.sanitiseNote(p) || S.value),
                                      await this.plugin.homepage.save();
                              });
                      }),
                this.addToggle(
                    "Open on startup",
                    "When launching Obsidian, open the homepage.",
                    "openOnStartup",
                    (d) => this.display(),
                ),
                i &&
                    (this.elements.openOnStartup.descEl.createDiv({
                        text: `This setting has been disabled, as it isn't compatible with Daily Notes' "Open daily note on startup" functionality. To use it, disable the Daily Notes setting.`,
                        attr: { class: "mod-warning" },
                    }),
                    this.disableSetting("openOnStartup")),
                this.addToggle(
                    "Open when empty",
                    "When there are no tabs open, open the homepage.",
                    "openWhenEmpty",
                ),
                this.addToggle(
                    "Use when opening normally",
                    "Use homepage settings when opening it normally, such as from a link or the file browser.",
                    "alwaysApply",
                );
            let r = new y.Setting(this.containerEl)
                .setName("Separate mobile homepage")
                .setDesc(
                    "For mobile devices, store the homepage and its settings separately.",
                )
                .addToggle((d) =>
                    d
                        .setValue(this.plugin.settings.separateMobile)
                        .onChange(async (p) => {
                            (this.plugin.settings.separateMobile = p),
                                (this.plugin.homepage =
                                    this.plugin.getHomepage()),
                                await this.plugin.saveSettings(),
                                this.display();
                        }),
                );
            if (this.plugin.settings.separateMobile) {
                let d = y.Platform.isMobile ? "desktop" : "mobile",
                    p = document.createElement("div");
                r.setClass("nv-mobile-setting"),
                    (p.className = "mod-warning nv-mobile-info"),
                    (p.innerHTML = `<b>Mobile settings are stored separately.</b> Therefore, changes to other settings will not affect
			${d} devices. To edit ${d} settings, use a ${d} device.`),
                    r.settingEl.append(p);
            }
            this.addHeading("Commands", "commandsHeading"),
                this.containerEl.createDiv({
                    cls: "nv-command-desc setting-item-description",
                    text: "Select commands that will be executed when opening the homepage.",
                }),
                (this.commandBox = new G(this)),
                this.addHeading("Vault environment", "vaultHeading"),
                this.addDropdown(
                    "Opening method",
                    "Determine how extant tabs and views are affected on startup.",
                    "openMode",
                    J,
                ),
                this.addDropdown(
                    "Manual opening method",
                    "Determine how extant tabs and views are affected when opening with commands or the ribbon button.",
                    "manualOpenMode",
                    J,
                ),
                this.addToggle("Pin", "Pin the homepage when opening.", "pin"),
                this.addToggle(
                    "Hide release notes",
                    "Never display release notes when Obsidian updates.",
                    "hideReleaseNotes",
                ),
                this.addToggle(
                    "Auto-create",
                    "When the homepage doesn't exist, create a note with its name.",
                    "autoCreate",
                ),
                this.elements.autoCreate.descEl.createDiv({
                    text: "If this vault is synced using unofficial services, this may lead to content being overwritten.",
                    cls: "mod-warning",
                }),
                this.addHeading("Opened view", "paneHeading"),
                this.addDropdown(
                    "Homepage view",
                    "Choose what view to open the homepage in.",
                    "view",
                    ge,
                ),
                this.addToggle(
                    "Revert view on close",
                    "When navigating away from the homepage, restore the default view.",
                    "revertView",
                ),
                this.addToggle(
                    "Auto-scroll",
                    "When opening the homepage, scroll to the bottom and focus on the last line.",
                    "autoScroll",
                ),
                "dataview" in this.plugin.communityPlugins &&
                    (this.addToggle(
                        "Refresh Dataview",
                        "Always attempt to reload Dataview views when opening the homepage.",
                        "refreshDataview",
                    ),
                    this.elements.refreshDataview.descEl.createDiv({
                        text: "Requires Dataview auto-refresh to be enabled.",
                        attr: { class: "mod-warning" },
                    })),
                y.Platform.isMobile ||
                    new y.ButtonComponent(this.containerEl)
                        .setButtonText("Copy debug info")
                        .setClass("nv-debug-button")
                        .onClick(async () => await this.copyDebugInfo()),
                (t || n === "Nothing") &&
                    this.disableSettings(
                        "openWhenEmpty",
                        "alwaysApply",
                        "vaultHeading",
                        "openMode",
                        "manualOpenMode",
                        "autoCreate",
                        "pin",
                    ),
                (t || ["Nothing", "Graph view"].includes(n)) &&
                    this.disableSettings(
                        "paneHeading",
                        "view",
                        "revertView",
                        "autoScroll",
                        "refreshDataview",
                    ),
                (!this.plugin.homepage.data.openOnStartup || i) &&
                    this.disableSetting("openMode"),
                K.includes(this.plugin.homepage.data.kind) &&
                    this.disableSetting("autoCreate");
        }
        disableSetting(t) {
            this.elements[t]?.settingEl.setAttribute("nv-greyed", "");
        }
        disableSettings(...t) {
            t.forEach((n) => this.disableSetting(n));
        }
        addHeading(t, n) {
            let i = new y.Setting(this.containerEl).setHeading().setName(t);
            this.elements[n] = i;
        }
        addDropdown(t, n, i, o, s) {
            let c = new y.Setting(this.containerEl)
                .setName(t)
                .setDesc(n)
                .addDropdown(async (m) => {
                    for (let r of Object.values(o)) m.addOption(r, r);
                    m.setValue(this.plugin.homepage.data[i]),
                        m.onChange(async (r) => {
                            (this.plugin.homepage.data[i] = r),
                                await this.plugin.homepage.save(),
                                s && s(r);
                        });
                });
            return (this.elements[i] = c), c;
        }
        addToggle(t, n, i, o) {
            let s = new y.Setting(this.containerEl)
                .setName(t)
                .setDesc(n)
                .addToggle((c) =>
                    c
                        .setValue(this.plugin.homepage.data[i])
                        .onChange(async (m) => {
                            (this.plugin.homepage.data[i] = m),
                                await this.plugin.homepage.save(),
                                o && o(m);
                        }),
                );
            return (this.elements[i] = s), s;
        }
        async copyDebugInfo() {
            let t = this.app.vault.config,
                n = {
                    ...this.settings,
                    _defaultViewMode: t.defaultViewMode || "default",
                    _livePreview:
                        t.livePreview !== void 0 ? t.livePreview : "default",
                    _focusNewTab:
                        t.focusNewTab !== void 0 ? t.focusNewTab : "default",
                    _plugins: Object.keys(this.plugin.communityPlugins),
                    _internalPlugins: Object.values(
                        this.plugin.internalPlugins,
                    ).flatMap((i) => (i.enabled ? [i.instance.id] : [])),
                    _obsidianVersion:
                        window.electron?.ipcRenderer.sendSync("version") ||
                        "unknown",
                };
            await navigator.clipboard.writeText(JSON.stringify(n)),
                new y.Notice("Copied homepage debug information to clipboard");
        }
    };
var yt = ["markdown", "canvas", "kanban"],
    W = "Main Homepage",
    V = "Mobile Homepage",
    J = ((n) => (
        (n.ReplaceAll = "Replace all open notes"),
        (n.ReplaceLast = "Replace last note"),
        (n.Retain = "Keep open notes"),
        n
    ))(J || {}),
    ge = ((i) => (
        (i.Default = "Default view"),
        (i.Reading = "Reading view"),
        (i.Source = "Editing view (Source)"),
        (i.LivePreview = "Editing view (Live Preview)"),
        i
    ))(ge || {}),
    R = ((r) => (
        (r.File = "File"),
        (r.Workspace = "Workspace"),
        (r.Random = "Random file"),
        (r.Graph = "Graph view"),
        (r.None = "Nothing"),
        (r.DailyNote = "Daily Note"),
        (r.WeeklyNote = "Weekly Note"),
        (r.MonthlyNote = "Monthly Note"),
        (r.YearlyNote = "Yearly Note"),
        r
    ))(R || {}),
    $ = ((n) => (
        (n.Both = "Both"),
        (n.Startup = "Startup only"),
        (n.Manual = "Manual only"),
        n
    ))($ || {}),
    me = ["Random file", "Graph view", "Nothing", ...K],
    _ = class {
        constructor(e, t) {
            this.lastView = void 0;
            this.openedViews = new WeakMap();
            (this.name = e), (this.plugin = t), (this.app = t.app);
            let n = this.plugin.settings.homepages[e];
            n
                ? (this.data = Object.assign({}, S, n))
                : ((this.plugin.settings.homepages[e] = { ...S }),
                  (this.data = this.plugin.settings.homepages[e]));
        }
        async open(e = !1) {
            if (!this.plugin.hasRequiredPlugin(this.data.kind)) {
                new b.Notice(
                    "Homepage cannot be opened due to plugin unavailablity.",
                );
                return;
            }
            if (this.data.kind === "Workspace") await this.launchWorkspace();
            else if (this.data.kind !== "Nothing") {
                let n = this.plugin.loaded
                    ? this.data.manualOpenMode
                    : this.data.openMode;
                e && (n = "Keep open notes"), await this.launchLeaf(n);
            }
            if (this.data.commands.length < 1) return;
            let t = this.plugin.loaded ? "Startup only" : "Manual only";
            await be(this.app);
            for (let { id: n, period: i } of this.data.commands)
                i !== t && this.app.commands.executeCommandById(n);
        }
        async launchWorkspace() {
            let e = this.plugin.internalPlugins.workspaces?.instance;
            if (!(this.data.value in e.workspaces)) {
                new b.Notice(
                    `Cannot find the workspace "${this.data.value}" to use as the homepage.`,
                );
                return;
            }
            e.loadWorkspace(this.data.value), await U(100);
        }
        async launchLeaf(e) {
            let t;
            if (
                ((this.computedValue = await this.computeValue()),
                (this.plugin.executing = !0),
                !(j(this.plugin) && !this.plugin.loaded))
            ) {
                if (e !== "Replace all open notes") {
                    let n = this.getOpened();
                    if (n.length > 0) {
                        this.app.workspace.setActiveLeaf(n[0]),
                            await this.configure(n[0]);
                        return;
                    } else
                        e == "Keep open notes" &&
                            ye(this.app) &&
                            (e = "Replace last note");
                }
                e !== "Keep open notes" &&
                    this.app.workspace
                        .getActiveViewOfType(b.View)
                        ?.leaf.setPinned(!1),
                    e === "Replace all open notes" &&
                        (this.app.workspace?.floatingSplit?.children &&
                            (await U(0),
                            this.app.workspace.floatingSplit.children.forEach(
                                (n) => n.win.close(),
                            )),
                        await ve(this.app),
                        await U(0)),
                    this.data.kind === "Graph view"
                        ? (t = await this.launchGraph(e))
                        : (t = await this.launchNote(e)),
                    t && (await this.configure(t));
            }
        }
        async launchGraph(e) {
            if (e === "Keep open notes") {
                let t = this.app.workspace.getLeaf("tab");
                this.app.workspace.setActiveLeaf(t);
            }
            return (
                this.app.commands.executeCommandById("graph:open"),
                this.app.workspace.getActiveViewOfType(b.View)?.leaf
            );
        }
        async launchNote(e) {
            let t = this.app.metadataCache.getFirstLinkpathDest(
                this.computedValue,
                "/",
            );
            if (!t) {
                if (!this.data.autoCreate) {
                    new b.Notice(
                        `Homepage "${this.computedValue}" does not exist.`,
                    );
                    return;
                }
                t = await this.app.vault.create(fe(this.computedValue), "");
            }
            let n = await this.app.vault.cachedRead(t),
                i = this.app.workspace.getLeaf(e == "Keep open notes");
            return (
                await i.openFile(t),
                this.app.workspace.setActiveLeaf(i),
                n !== (await this.app.vault.read(t)) &&
                    (await this.app.vault.modify(t, n)),
                i
            );
        }
        async configure(e) {
            this.plugin.executing = !1;
            let t = e.view;
            if (!(t instanceof b.MarkdownView)) {
                this.data.pin && t.leaf.setPinned(!0), this.configurePlugins();
                return;
            }
            let n = t.getState();
            if (
                (this.data.revertView && (this.lastView = new WeakRef(t)),
                this.data.autoScroll)
            ) {
                let i = t.editor.lineCount();
                n.mode == "preview"
                    ? t.previewMode.applyScroll(i - 4)
                    : (t.editor.setCursor(i), t.editor.focus());
            }
            if (
                (this.data.pin && t.leaf.setPinned(!0),
                this.data.view !== "Default view")
            ) {
                switch (this.data.view) {
                    case "Editing view (Live Preview)":
                    case "Editing view (Source)":
                        (n.mode = "source"),
                            (n.source =
                                this.data.view !=
                                "Editing view (Live Preview)");
                        break;
                    case "Reading view":
                        n.mode = "preview";
                        break;
                }
                await t.leaf.setViewState({ type: "markdown", state: n });
            }
            this.configurePlugins();
        }
        configurePlugins() {
            this.plugin.loaded &&
                this.data.refreshDataview &&
                this.plugin.communityPlugins.dataview?.index.touch(),
                this.plugin.communityPlugins[
                    "obsidian-file-color"
                ]?.generateColorStyles();
        }
        getOpened() {
            return this.data.kind == "Graph view"
                ? this.app.workspace.getLeavesOfType("graph")
                : yt
                      .flatMap((t) => this.app.workspace.getLeavesOfType(t))
                      .filter((t) => {
                          let n = t.view.getState().file;
                          return te(
                              n.endsWith("md") ? n.slice(0, -3) : n,
                              this.computedValue,
                          );
                      });
        }
        async computeValue() {
            let e = this.data.value;
            switch (this.data.kind) {
                case "Random file":
                    let t = we(this.app);
                    t && (e = t);
                    break;
                case "Daily Note":
                case "Weekly Note":
                case "Monthly Note":
                case "Yearly Note":
                    e = await Re(this.data.kind, this.plugin);
                    break;
            }
            return e;
        }
        async save() {
            (this.plugin.settings.homepages[this.name] = this.data),
                await this.plugin.saveSettings();
        }
        async setToActiveFile() {
            (this.data.value = T(this.app.workspace.getActiveFile())),
                await this.save(),
                new b.Notice(
                    `The homepage has been changed to "${this.data.value}".`,
                );
        }
        canSetToFile() {
            return (
                this.app.workspace.getActiveFile() !== null &&
                !me.includes(this.data.kind)
            );
        }
        async revertView() {
            if (this.lastView == null || this.data.view == "Default view")
                return;
            let e = this.lastView.deref();
            if (!e || te(T(e.file), this.computedValue)) return;
            let t = e.getState(),
                n = this.app.vault.config,
                i = n.defaultViewMode || "source",
                o = n.livePreview !== void 0 ? !n.livePreview : !1;
            e.leaf.getViewState().type == "markdown" &&
                (i != t.mode || o != t.source) &&
                ((t.mode = i),
                (t.source = o),
                await e.leaf.setViewState({
                    type: "markdown",
                    state: t,
                    active: !0,
                })),
                (this.lastView = void 0);
        }
        async openWhenEmpty() {
            if (!this.plugin.loaded || this.plugin.executing) return;
            let e = this.app.workspace.getActiveViewOfType(b.View)?.leaf;
            e?.getViewState().type !== "empty" ||
                e.parentSplit.children.length != 1 ||
                (await this.open(!0));
        }
        async apply() {
            let e = this.app.workspace.getActiveViewOfType(b.FileView);
            if (!e) return;
            let t = T(e.file);
            this.openedViews.get(e) !== t &&
                (this.openedViews.set(e, t),
                t === (await this.computeValue()) &&
                    this.plugin.loaded &&
                    !this.plugin.executing &&
                    (await this.configure(e.leaf)));
        }
    };
var vt =
        '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5"><path d="M10.025 21H6v-7H3v-1.5L12 3l9 9.5V14h-3v7h-4v-7h-3.975v7Z" style="fill:none;stroke:currentColor;stroke-width:2px"/></svg>',
    Z = class extends N.Plugin {
        constructor() {
            super(...arguments);
            this.newRelease = !1;
            this.loaded = !1;
            this.executing = !1;
            this.onLayoutChange = async () => {
                this.homepage.data.revertView &&
                    (await this.homepage.revertView()),
                    this.homepage.data.openWhenEmpty &&
                        (await this.homepage.openWhenEmpty()),
                    this.homepage.data.alwaysApply &&
                        (await this.homepage.apply());
            };
            this.hideInterstitial = () => {
                this.interstitial?.detach(),
                    window.removeEventListener("error", this.hideInterstitial);
            };
        }
        async onload() {
            let t = this.app.workspace.layoutReady;
            t || this.showInterstitial(),
                this.patchReleaseNotes(),
                (this.settings = await this.loadSettings()),
                (this.internalPlugins = this.app.internalPlugins.plugins),
                (this.communityPlugins = this.app.plugins.plugins),
                (this.homepage = this.getHomepage()),
                this.app.workspace.onLayoutReady(async () => {
                    let n =
                        this.homepage.data.openOnStartup &&
                        !t &&
                        !(await this.hasUrlParams());
                    this.patchNewTabPage(),
                        n && (await this.homepage.open()),
                        (this.loaded = !0),
                        this.unpatchReleaseNotes(),
                        this.hideInterstitial();
                }),
                (0, N.addIcon)("homepage", vt),
                this.addRibbonIcon("homepage", "Open homepage", (n) =>
                    this.homepage.open(
                        n.button == 1 ||
                            n.button == 2 ||
                            N.Keymap.isModifier(n, "Mod"),
                    ),
                ).setAttribute("id", "nv-homepage-icon"),
                this.registerEvent(
                    this.app.workspace.on("layout-change", this.onLayoutChange),
                ),
                this.addSettingTab(new Q(this.app, this)),
                this.addCommand({
                    id: "open-homepage",
                    name: "Open homepage",
                    callback: () => this.homepage.open(),
                }),
                this.addCommand({
                    id: "set-to-active-file",
                    name: "Set to active file",
                    checkCallback: (n) => {
                        if (n) return this.homepage.canSetToFile();
                        this.homepage.setToActiveFile();
                    },
                });
        }
        async onunload() {
            this.app.workspace.off("layout-change", this.onLayoutChange),
                this.unpatchNewTabPage();
        }
        getHomepage() {
            return this.settings.separateMobile && N.Platform.isMobile
                ? (V in this.settings.homepages ||
                      ((this.settings.homepages[V] = {
                          ...this.settings.homepages?.[W],
                      }),
                      (this.settings.homepages[V].commands = [
                          ...this.settings.homepages?.[W]?.commands,
                      ])),
                  new _(V, this))
                : new _(W, this);
        }
        async loadSettings() {
            let t = await this.loadData();
            return t?.version !== 4
                ? t
                    ? this.upgradeSettings(t)
                    : Object.assign({}, ue)
                : t;
        }
        async saveSettings() {
            await this.saveData(this.settings);
        }
        showInterstitial() {
            (this.interstitial = createDiv({
                cls: "nv-homepage-interstitial",
            })),
                document.body.append(this.interstitial),
                window.addEventListener("error", this.hideInterstitial);
        }
        async hasUrlParams() {
            let t, n;
            if (N.Platform.isMobile) {
                let i = await window.Capacitor.Plugins.App.getLaunchUrl();
                if (!i) return !1;
                let o = new URL(i.url);
                (n = Array.from(o.searchParams.keys())), (t = o.hostname);
            } else if (window.OBS_ACT)
                (n = Object.keys(window.OBS_ACT)), (t = window.OBS_ACT.action);
            else return !1;
            return (
                ["open", "advanced-uri"].includes(t) &&
                ["file", "filepath", "workspace"].some((i) => n.includes(i))
            );
        }
        hasRequiredPlugin(t) {
            switch (t) {
                case "Workspace":
                    return this.internalPlugins.workspaces?.enabled;
                case "Graph view":
                    return this.internalPlugins.graph?.enabled;
                case "Daily Note":
                case "Weekly Note":
                case "Monthly Note":
                case "Yearly Note":
                    return _e(t, this);
                default:
                    return !0;
            }
        }
        patchNewTabPage() {
            let t = this.communityPlugins["new-tab-default-page"];
            t &&
                ((t.nvOrig_checkForNewTab = t.checkForNewTab),
                (t.checkForNewTab = async (n) => {
                    if (!(this && this.executing))
                        return await t.nvOrig_checkForNewTab(n);
                }));
        }
        unpatchNewTabPage() {
            let t = this.communityPlugins["new-tab-default-page"];
            t && (t.checkForNewTab = t._checkForNewTab);
        }
        patchReleaseNotes() {
            (this.app.nvOrig_showReleaseNotes = this.app.showReleaseNotes),
                (this.app.showReleaseNotes = () => (this.newRelease = !0));
        }
        unpatchReleaseNotes() {
            this.newRelease &&
                !this.homepage.data.hideReleaseNotes &&
                this.app.nvOrig_showReleaseNotes(),
                (this.app.showReleaseNotes = this.app.nvOrig_showReleaseNotes);
        }
        upgradeSettings(t) {
            if (t.version == 3) {
                let i = t,
                    o = !1;
                for (let s of Object.values(i.homepages))
                    (s.commands = s.commands.map((c) => ({
                        id: c,
                        period: "Both",
                    }))),
                        s.kind == Ie && ((o = !0), (s.kind = "Daily Note"));
                return (
                    o && new N.Notice(de), (i.version = 4), this.saveData(i), i
                );
            }
            let n = Object.assign({}, ue);
            return (
                t.workspaceEnabled
                    ? ((t.value = t.workspace), (t.kind = "Workspace"))
                    : t.momentFormat
                      ? ((t.kind = "Daily Note"), new N.Notice(de))
                      : ((t.value = t.defaultNote), (t.kind = "File")),
                (t.commands = []),
                delete t.workspace,
                delete t.momentFormat,
                delete t.defaultNote,
                delete t.useMoment,
                delete t.workspaceEnabled,
                (n.homepages[W] = t),
                this.saveData(n),
                n
            );
        }
    };

/* nosourcemap */
