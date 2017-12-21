/*
 Highcharts JS v6.0.4 (2017-12-15)
 Data module

 (c) 2012-2017 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (y) {
    "object" === typeof module && module.exports ? module.exports = y : y(Highcharts)
})(function (y) {
    (function (n) {
        var y = n.win.document, t = n.each, D = n.objectEach, E = n.pick, A = n.inArray, B = n.isNumber, F = n.splat,
            G = n.fireEvent, C, w;
        C = Array.prototype.some ? function (a, b, d) {
            Array.prototype.some.call(a, b, d)
        } : function (a, b, d) {
            for (var e = 0, f = a.length; e < f && !0 !== b.call(d, a[e], e, a); e++) ;
        };
        var z = function (a, b) {
            this.init(a, b)
        };
        n.extend(z.prototype, {
            init: function (a, b) {
                this.options = a;
                this.chartOptions = b;
                this.columns = a.columns ||
                    this.rowsToColumns(a.rows) || [];
                this.firstRowAsNames = E(a.firstRowAsNames, !0);
                this.decimalRegex = a.decimalPoint && new RegExp("^(-?[0-9]+)" + a.decimalPoint + "([0-9]+)$");
                this.rawColumns = [];
                this.columns.length ? this.dataFound() : (this.parseCSV(), this.parseTable(), this.parseGoogleSpreadsheet())
            }, getColumnDistribution: function () {
                var a = this.chartOptions, b = this.options, d = [], e = function (a) {
                    return (n.seriesTypes[a || "line"].prototype.pointArrayMap || [0]).length
                }, f = a && a.chart && a.chart.type, c = [], k = [], l = 0, g;
                t(a && a.series ||
                    [], function (a) {
                    c.push(e(a.type || f))
                });
                t(b && b.seriesMapping || [], function (a) {
                    d.push(a.x || 0)
                });
                0 === d.length && d.push(0);
                t(b && b.seriesMapping || [], function (b) {
                    var d = new w, v = c[l] || e(f),
                        r = n.seriesTypes[((a && a.series || [])[l] || {}).type || f || "line"].prototype.pointArrayMap || ["y"];
                    d.addColumnReader(b.x, "x");
                    D(b, function (a, b) {
                        "x" !== b && d.addColumnReader(a, b)
                    });
                    for (g = 0; g < v; g++) d.hasReader(r[g]) || d.addColumnReader(void 0, r[g]);
                    k.push(d);
                    l++
                });
                b = n.seriesTypes[f || "line"].prototype.pointArrayMap;
                void 0 === b && (b = ["y"]);
                this.valueCount = {global: e(f), xColumns: d, individual: c, seriesBuilders: k, globalPointArrayMap: b}
            }, dataFound: function () {
                this.options.switchRowsAndColumns && (this.columns = this.rowsToColumns(this.columns));
                this.getColumnDistribution();
                this.parseTypes();
                !1 !== this.parsed() && this.complete()
            }, parseCSV: function (a) {
                function b(a, b, c, d) {
                    function f(b) {
                        h = a[b];
                        m = a[b - 1];
                        n = a[b + 1]
                    }

                    function e(a) {
                        q.length < x + 1 && q.push([a]);
                        q[x][q[x].length - 1] !== a && q[x].push(a)
                    }

                    function g() {
                        H > p || p > I ? (++p, u = "") : (!isNaN(parseFloat(u)) && isFinite(u) ?
                            (u = parseFloat(u), e("number")) : isNaN(Date.parse(u)) ? e("string") : (u = u.replace(/\//g, "-"), e("date")), l.length < x + 1 && l.push([]), c || (l[x][b] = u), u = "", ++x, ++p)
                    }

                    var k = 0, h = "", m = "", n = "", u = "", p = 0, x = 0;
                    if (a.trim().length && "#" !== a.trim()[0]) {
                        for (; k < a.length; k++) {
                            f(k);
                            if ("#" === h) {
                                g();
                                return
                            }
                            if ('"' === h) for (f(++k); k < a.length && ('"' !== h || '"' === m || '"' === n);) {
                                if ('"' !== h || '"' === h && '"' !== m) u += h;
                                f(++k)
                            } else d && d[h] ? d[h](h, u) && g() : h === v ? g() : u += h
                        }
                        g()
                    }
                }

                function d(a) {
                    var b = 0, d = 0, e = !1;
                    C(a, function (a, c) {
                        var f = !1, e, h, g = "";
                        if (13 <
                            c) return !0;
                        for (var k = 0; k < a.length; k++) {
                            c = a[k];
                            e = a[k + 1];
                            h = a[k - 1];
                            if ("#" === c) break; else if ('"' === c) if (f) {
                                if ('"' !== h && '"' !== e) {
                                    for (; " " === e && k < a.length;) e = a[++k];
                                    "undefined" !== typeof p[e] && p[e]++;
                                    f = !1
                                }
                            } else f = !0; else "undefined" !== typeof p[c] ? (g = g.trim(), isNaN(Date.parse(g)) ? !isNaN(g) && isFinite(g) || p[c]++ : p[c]++, g = "") : g += c;
                            "," === c && d++;
                            "." === c && b++
                        }
                    });
                    e = p[";"] > p[","] ? ";" : ",";
                    c.decimalPoint || (c.decimalPoint = b > d ? "." : ",", f.decimalRegex = new RegExp("^(-?[0-9]+)" + c.decimalPoint + "([0-9]+)$"));
                    return e
                }

                function e(a,
                           b) {
                    var d, e, g = 0, k = !1, l = [], m = [], h;
                    if (!b || b > a.length) b = a.length;
                    for (; g < b; g++) if ("undefined" !== typeof a[g] && a[g] && a[g].length) for (d = a[g].trim().replace(/\//g, " ").replace(/\-/g, " ").split(" "), e = ["", "", ""], h = 0; h < d.length; h++) h < e.length && (d[h] = parseInt(d[h], 10), d[h] && (m[h] = !m[h] || m[h] < d[h] ? d[h] : m[h], "undefined" !== typeof l[h] ? l[h] !== d[h] && (l[h] = !1) : l[h] = d[h], 31 < d[h] ? e[h] = 100 > d[h] ? "YY" : "YYYY" : 12 < d[h] && 31 >= d[h] ? (e[h] = "dd", k = !0) : e[h].length || (e[h] = "mm")));
                    if (k) {
                        for (h = 0; h < l.length; h++) !1 !== l[h] ? 12 < m[h] && "YY" !==
                            e[h] && "YYYY" !== e[h] && (e[h] = "YY") : 12 < m[h] && "mm" === e[h] && (e[h] = "dd");
                        3 === e.length && "dd" === e[1] && "dd" === e[2] && (e[2] = "YY");
                        a = e.join("/");
                        return (c.dateFormats || f.dateFormats)[a] ? a : (G("invalidDateFormat"), n.error("Could not deduce date format"), "YYYY/mm/dd")
                    }
                    return "YYYY/mm/dd"
                }

                var f = this, c = a || this.options, k = c.csv, l;
                a = "undefined" !== typeof c.startRow && c.startRow ? c.startRow : 0;
                var g = c.endRow || Number.MAX_VALUE,
                    H = "undefined" !== typeof c.startColumn && c.startColumn ? c.startColumn : 0,
                    I = c.endColumn || Number.MAX_VALUE,
                    v, r = 0, q = [], p = {",": 0, ";": 0, "\t": 0};
                l = this.columns = [];
                if (k) {
                    k = k.replace(/\r\n/g, "\n").replace(/\r/g, "\n").split(c.lineDelimiter || "\n");
                    if (!a || 0 > a) a = 0;
                    if (!g || g >= k.length) g = k.length - 1;
                    c.itemDelimiter ? v = c.itemDelimiter : (v = null, v = d(k));
                    for (var m = 0, r = a; r <= g; r++) "#" === k[r][0] ? m++ : b(k[r], r - a - m);
                    c.columnTypes && 0 !== c.columnTypes.length || !q.length || !q[0].length || "date" !== q[0][1] || c.dateFormat || (c.dateFormat = e(l[0]));
                    this.dataFound()
                }
                return l
            }, parseTable: function () {
                var a = this.options, b = a.table, d = this.columns,
                    e = a.startRow || 0, f = a.endRow || Number.MAX_VALUE, c = a.startColumn || 0,
                    k = a.endColumn || Number.MAX_VALUE;
                b && ("string" === typeof b && (b = y.getElementById(b)), t(b.getElementsByTagName("tr"), function (a, b) {
                    b >= e && b <= f && t(a.children, function (a, f) {
                        ("TD" === a.tagName || "TH" === a.tagName) && f >= c && f <= k && (d[f - c] || (d[f - c] = []), d[f - c][b - e] = a.innerHTML)
                    })
                }), this.dataFound())
            }, parseGoogleSpreadsheet: function () {
                var a = this, b = this.options, d = b.googleSpreadsheetKey, e = this.columns, f = b.startRow || 0,
                    c = b.endRow || Number.MAX_VALUE, k = b.startColumn ||
                    0, l = b.endColumn || Number.MAX_VALUE, g, n;
                d && jQuery.ajax({
                    dataType: "json",
                    url: "https://spreadsheets.google.com/feeds/cells/" + d + "/" + (b.googleSpreadsheetWorksheet || "od6") + "/public/values?alt\x3djson-in-script\x26callback\x3d?",
                    error: b.error,
                    success: function (b) {
                        b = b.feed.entry;
                        var d, r = b.length, q = 0, p = 0, m;
                        for (m = 0; m < r; m++) d = b[m], q = Math.max(q, d.gs$cell.col), p = Math.max(p, d.gs$cell.row);
                        for (m = 0; m < q; m++) m >= k && m <= l && (e[m - k] = [], e[m - k].length = Math.min(p, c - f));
                        for (m = 0; m < r; m++) d = b[m], g = d.gs$cell.row - 1, n = d.gs$cell.col -
                            1, n >= k && n <= l && g >= f && g <= c && (e[n - k][g - f] = d.content.$t);
                        t(e, function (a) {
                            for (m = 0; m < a.length; m++) void 0 === a[m] && (a[m] = null)
                        });
                        a.dataFound()
                    }
                })
            }, trim: function (a, b) {
                "string" === typeof a && (a = a.replace(/^\s+|\s+$/g, ""), b && /^[0-9\s]+$/.test(a) && (a = a.replace(/\s/g, "")), this.decimalRegex && (a = a.replace(this.decimalRegex, "$1.$2")));
                return a
            }, parseTypes: function () {
                for (var a = this.columns, b = a.length; b--;) this.parseColumn(a[b], b)
            }, parseColumn: function (a, b) {
                var d = this.rawColumns, e = this.columns, f = a.length, c, k, l, g, n = this.firstRowAsNames,
                    t = -1 !== A(b, this.valueCount.xColumns), v, r = [], q = this.chartOptions, p,
                    m = (this.options.columnTypes || [])[b],
                    q = t && (q && q.xAxis && "category" === F(q.xAxis)[0].type || "string" === m);
                for (d[b] || (d[b] = []); f--;) c = r[f] || a[f], l = this.trim(c), g = this.trim(c, !0), k = parseFloat(g), void 0 === d[b][f] && (d[b][f] = l), q || 0 === f && n ? a[f] = "" + l : +g === k ? (a[f] = k, 31536E6 < k && "float" !== m ? a.isDatetime = !0 : a.isNumeric = !0, void 0 !== a[f + 1] && (p = k > a[f + 1])) : (l && l.length && (v = this.parseDate(c)), t && B(v) && "float" !== m ? (r[f] = c, a[f] = v, a.isDatetime = !0, void 0 !==
                a[f + 1] && (c = v > a[f + 1], c !== p && void 0 !== p && (this.alternativeFormat ? (this.dateFormat = this.alternativeFormat, f = a.length, this.alternativeFormat = this.dateFormats[this.dateFormat].alternative) : a.unsorted = !0), p = c)) : (a[f] = "" === l ? null : l, 0 !== f && (a.isDatetime || a.isNumeric) && (a.mixed = !0)));
                t && a.mixed && (e[b] = d[b]);
                if (t && p && this.options.sort) for (b = 0; b < e.length; b++) e[b].reverse(), n && e[b].unshift(e[b].pop())
            }, dateFormats: {
                "YYYY/mm/dd": {
                    regex: /^([0-9]{4})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{1,2})$/, parser: function (a) {
                        return Date.UTC(+a[1],
                            a[2] - 1, +a[3])
                    }
                }, "dd/mm/YYYY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (a) {
                        return Date.UTC(+a[3], a[2] - 1, +a[1])
                    }, alternative: "mm/dd/YYYY"
                }, "mm/dd/YYYY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{4})$/, parser: function (a) {
                        return Date.UTC(+a[3], a[1] - 1, +a[2])
                    }
                }, "dd/mm/YY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (a) {
                        var b = +a[3], b = b > (new Date).getFullYear() - 2E3 ? b + 1900 : b + 2E3;
                        return Date.UTC(b, a[2] - 1, +a[1])
                    }, alternative: "mm/dd/YY"
                },
                "mm/dd/YY": {
                    regex: /^([0-9]{1,2})[\-\/\.]([0-9]{1,2})[\-\/\.]([0-9]{2})$/, parser: function (a) {
                        return Date.UTC(+a[3] + 2E3, a[1] - 1, +a[2])
                    }
                }
            }, parseDate: function (a) {
                var b = this.options.parseDate, d, e, f = this.options.dateFormat || this.dateFormat, c;
                if (b) d = b(a); else if ("string" === typeof a) {
                    if (f) (b = this.dateFormats[f]) || (b = this.dateFormats["YYYY/mm/dd"]), (c = a.match(b.regex)) && (d = b.parser(c)); else for (e in this.dateFormats) if (b = this.dateFormats[e], c = a.match(b.regex)) {
                        this.dateFormat = e;
                        this.alternativeFormat = b.alternative;
                        d = b.parser(c);
                        break
                    }
                    c || (c = Date.parse(a), "object" === typeof c && null !== c && c.getTime ? d = c.getTime() - 6E4 * c.getTimezoneOffset() : B(c) && (d = c - 6E4 * (new Date(c)).getTimezoneOffset()))
                }
                return d
            }, rowsToColumns: function (a) {
                var b, d, e, f, c;
                if (a) for (c = [], d = a.length, b = 0; b < d; b++) for (f = a[b].length, e = 0; e < f; e++) c[e] || (c[e] = []), c[e][b] = a[b][e];
                return c
            }, parsed: function () {
                if (this.options.parsed) return this.options.parsed.call(this, this.columns)
            }, getFreeIndexes: function (a, b) {
                var d, e = [], f = [], c;
                for (d = 0; d < a; d += 1) e.push(!0);
                for (a =
                         0; a < b.length; a += 1) for (c = b[a].getReferencedColumnIndexes(), d = 0; d < c.length; d += 1) e[c[d]] = !1;
                for (d = 0; d < e.length; d += 1) e[d] && f.push(d);
                return f
            }, complete: function () {
                var a = this.columns, b, d = this.options, e, f, c, k, l = [], g;
                if (d.complete || d.afterComplete) {
                    for (c = 0; c < a.length; c++) this.firstRowAsNames && (a[c].name = a[c].shift());
                    e = [];
                    f = this.getFreeIndexes(a.length, this.valueCount.seriesBuilders);
                    for (c = 0; c < this.valueCount.seriesBuilders.length; c++) g = this.valueCount.seriesBuilders[c], g.populateColumns(f) && l.push(g);
                    for (; 0 <
                           f.length;) {
                        g = new w;
                        g.addColumnReader(0, "x");
                        c = A(0, f);
                        -1 !== c && f.splice(c, 1);
                        for (c = 0; c < this.valueCount.global; c++) g.addColumnReader(void 0, this.valueCount.globalPointArrayMap[c]);
                        g.populateColumns(f) && l.push(g)
                    }
                    0 < l.length && 0 < l[0].readers.length && (g = a[l[0].readers[0].columnIndex], void 0 !== g && (g.isDatetime ? b = "datetime" : g.isNumeric || (b = "category")));
                    if ("category" === b) for (c = 0; c < l.length; c++) for (g = l[c], f = 0; f < g.readers.length; f++) "x" === g.readers[f].configName && (g.readers[f].configName = "name");
                    for (c = 0; c < l.length; c++) {
                        g =
                            l[c];
                        f = [];
                        for (k = 0; k < a[0].length; k++) f[k] = g.read(a, k);
                        e[c] = {data: f};
                        g.name && (e[c].name = g.name);
                        "category" === b && (e[c].turboThreshold = 0)
                    }
                    a = {series: e};
                    b && (a.xAxis = {type: b}, "category" === b && (a.xAxis.uniqueNames = !1));
                    d.complete && d.complete(a);
                    d.afterComplete && d.afterComplete(a)
                }
            }, update: function (a, b) {
                var d = this.chart;
                a && (a.afterComplete = function (a) {
                    d.update(a, b)
                }, n.data(a))
            }
        });
        n.Data = z;
        n.data = function (a, b) {
            return new z(a, b)
        };
        n.wrap(n.Chart.prototype, "init", function (a, b, d) {
            var e = this;
            b && b.data ? (e.data = new z(n.extend(b.data,
                {
                    afterComplete: function (f) {
                        var c, k;
                        if (b.hasOwnProperty("series")) if ("object" === typeof b.series) for (c = Math.max(b.series.length, f.series.length); c--;) k = b.series[c] || {}, b.series[c] = n.merge(k, f.series[c]); else delete b.series;
                        b = n.merge(f, b);
                        a.call(e, b, d)
                    }
                }), b), e.data.chart = e) : a.call(e, b, d)
        });
        w = function () {
            this.readers = [];
            this.pointIsArray = !0
        };
        w.prototype.populateColumns = function (a) {
            var b = !0;
            t(this.readers, function (b) {
                void 0 === b.columnIndex && (b.columnIndex = a.shift())
            });
            t(this.readers, function (a) {
                void 0 ===
                a.columnIndex && (b = !1)
            });
            return b
        };
        w.prototype.read = function (a, b) {
            var d = this.pointIsArray, e = d ? [] : {}, f;
            t(this.readers, function (c) {
                var f = a[c.columnIndex][b];
                d ? e.push(f) : e[c.configName] = f
            });
            void 0 === this.name && 2 <= this.readers.length && (f = this.getReferencedColumnIndexes(), 2 <= f.length && (f.shift(), f.sort(), this.name = a[f.shift()].name));
            return e
        };
        w.prototype.addColumnReader = function (a, b) {
            this.readers.push({columnIndex: a, configName: b});
            "x" !== b && "y" !== b && void 0 !== b && (this.pointIsArray = !1)
        };
        w.prototype.getReferencedColumnIndexes =
            function () {
                var a, b = [], d;
                for (a = 0; a < this.readers.length; a += 1) d = this.readers[a], void 0 !== d.columnIndex && b.push(d.columnIndex);
                return b
            };
        w.prototype.hasReader = function (a) {
            var b, d;
            for (b = 0; b < this.readers.length; b += 1) if (d = this.readers[b], d.configName === a) return !0
        }
    })(y)
});
