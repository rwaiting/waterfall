/**
 * waterfall  1.0.0
 * Author:  rwaiting
 * License: MIT
 * Date:    2017-11-08
 */
;(function (undefined) {
    'use strict';
    var waterfall = function (params) {
        var defaults = {
            container: 'waterfallContainer',
            item: 'waterfallItem',
            gutter: 8,
            animate: '',
            callback: ''
        };
        this.params = this.extend(defaults, params, true);
        this._init();
    };

    waterfall.prototype = {
        _init: function () {
            var _this = this;
            document.onreadystatechange = function () {
                if (document.readyState == "complete") {
                    _this._flow();
                    _this._listen();
                }
            }
        },
        _flow: function () {
            var _this = this;
            var s = _this.params;
            var c = _this.getClass(s.container)[0];
            c.style.opacity = 0;
            c.style.width = '';
            c.style.height = '';
            var i = _this.getClass(s.item);
            var g = s.gutter;
            var cw = c.getBoundingClientRect().width;
            var iw = i[0].getBoundingClientRect().width + g;
            var l = i.length;
            var n = Math.max(Math.floor((cw - g) / iw), 1);
            var u = 0;
            cw = Math.ceil(iw * n + g) + 'px';
            c.style.width = cw;
            for (var isg = [], isx = [], a = 0; a < n; a++) {
                isx.push(a * iw + g);
                isg.push(g);
            }
            for (var b = 0; b < l; b++) {
                var isge = isg.slice(0).sort(function (a, b) {
                    return a - b;
                }).shift();
                var m = isg.indexOf(isge);
                var x = isx[m];
                var y = isg[m];
                if (!s.animate) {
                    i[b].style.left = x + 'px';
                    i[b].style.top = y + 'px';
                }
                isg[m] += i[b].getBoundingClientRect().height + g;
                u = u + 1;
                if (s.animate) {
                    return s.animate(i[b], x, y, u);
                }
            }
            var ch = Math.ceil(isg.slice(0).sort(function (a, b) {
                return a - b;
            }).pop());
            c.style.height = ch + 'px';
            c.style.opacity = 1;
            if (typeof s.callback === 'function') {
                s.callback();
            }
        },
        _listen: function () {
            var _this = this;
            if (window.addEventListener) {
                // 所有主流浏览器，除了 IE 8 及更早版本
                window.addEventListener('resize', function () {
                    _this._flow();
                });
            } else if (window.attachEvent) {
                // IE 8 及更早版本
                window.attachEvent('resize', function () {
                    _this._flow();
                });
            }
        },
        extend: function (f, o, r) {
            for (var key in o) {
                if (o.hasOwnProperty(key) && (!f.hasOwnProperty(key) || r)) {
                    f[key] = o[key];
                }
            }
            return f;
        },
        getClass: function (g) {
            var e = document.getElementsByClassName(g);
            return e;
        }
    };

    if (typeof module !== 'undefined' && typeof exports === 'object') {
        module.exports = waterfall;
    } else if (typeof define === 'function' && (define.amd || define.cmd)) {
        define([], function () {
            'use strict';
            return window.waterfall;
        });
    } else {
        window.waterfall = waterfall;
    }
}());