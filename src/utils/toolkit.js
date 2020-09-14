import $ from 'jquery';

! function(s) {
    "use strict";
    s.fn.emulateTransitionEnd = function(t) {
        var e = !1,
            i = this;
        s(this).one("bsTransitionEnd", function() { e = !0 });
        return setTimeout(function() { e || s(i).trigger(s.support.transition.end) }, t), this
    }, s(function() {
        s.support.transition = function() {
            var t = document.createElement("bootstrap"),
                e = { WebkitTransition: "webkitTransitionEnd", MozTransition: "transitionend", OTransition: "oTransitionEnd otransitionend", transition: "transitionend" };
            for (var i in e)
                if (void 0 !== t.style[i]) return { end: e[i] };
            return !1
        }(), s.support.transition && (s.event.special.bsTransitionEnd = { bindType: s.support.transition.end, delegateType: s.support.transition.end, handle: function(t) { if (s(t.target).is(this)) return t.handleObj.handler.apply(this, arguments) } })
    })
}(jQuery),
function(h) {
    "use strict";
    var l = function(t, e) { this.options = h.extend({}, l.DEFAULTS, e), this.$target = h(this.options.target).on("scroll.bs.affix.data-api", h.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", h.proxy(this.checkPositionWithEventLoop, this)), this.$element = h(t), this.affixed = null, this.unpin = null, this.pinnedOffset = null, this.checkPosition() };

    function i(s) {
        return this.each(function() {
            var t = h(this),
                e = t.data("bs.affix"),
                i = "object" == typeof s && s;
            e || t.data("bs.affix", e = new l(this, i)), "string" == typeof s && e[s]()
        })
    }
    l.VERSION = "3.3.6", l.RESET = "affix affix-top affix-bottom", l.DEFAULTS = { offset: 0, target: window }, l.prototype.getState = function(t, e, i, s) {
        var a = this.$target.scrollTop(),
            n = this.$element.offset(),
            o = this.$target.height();
        if (null != i && "top" == this.affixed) return a < i && "top";
        if ("bottom" == this.affixed) return null != i ? !(a + this.unpin <= n.top) && "bottom" : !(a + o <= t - s) && "bottom";
        var r = null == this.affixed,
            h = r ? a : n.top;
        return null != i && a <= i ? "top" : null != s && t - s <= h + (r ? o : e) && "bottom"
    }, l.prototype.getPinnedOffset = function() {
        if (this.pinnedOffset) return this.pinnedOffset;
        this.$element.removeClass(l.RESET).addClass("affix");
        var t = this.$target.scrollTop(),
            e = this.$element.offset();
        return this.pinnedOffset = e.top - t
    }, l.prototype.checkPositionWithEventLoop = function() { setTimeout(h.proxy(this.checkPosition, this), 1) }, l.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var t = this.$element.height(),
                e = this.options.offset,
                i = e.top,
                s = e.bottom,
                a = Math.max(h(document).height(), h(document.body).height());
            "object" != typeof e && (s = i = e), "function" == typeof i && (i = e.top(this.$element)), "function" == typeof s && (s = e.bottom(this.$element));
            var n = this.getState(a, t, i, s);
            if (this.affixed != n) {
                null != this.unpin && this.$element.css("top", "");
                var o = "affix" + (n ? "-" + n : ""),
                    r = h.Event(o + ".bs.affix");
                if (this.$element.trigger(r), r.isDefaultPrevented()) return;
                this.affixed = n, this.unpin = "bottom" == n ? this.getPinnedOffset() : null, this.$element.removeClass(l.RESET).addClass(o).trigger(o.replace("affix", "affixed") + ".bs.affix")
            }
            "bottom" == n && this.$element.offset({ top: a - t - s })
        }
    };
    var t = h.fn.affix;
    h.fn.affix = i, h.fn.affix.Constructor = l, h.fn.affix.noConflict = function() { return h.fn.affix = t, this }, h(window).on("load", function() {
        h('[data-spy="affix"]').each(function() {
            var t = h(this),
                e = t.data();
            e.offset = e.offset || {}, null != e.offsetBottom && (e.offset.bottom = e.offsetBottom), null != e.offsetTop && (e.offset.top = e.offsetTop), i.call(t, e)
        })
    })
}(jQuery),
function(n) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        o = function(t) { n(t).on("click", e, this.close) };
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 150, o.prototype.close = function(t) {
        var e = n(this),
            i = e.attr("data-target");
        i || (i = (i = e.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var s = n(i);

        function a() { s.detach().trigger("closed.bs.alert").remove() }
        t && t.preventDefault(), s.length || (s = e.closest(".alert")), s.trigger(t = n.Event("close.bs.alert")), t.isDefaultPrevented() || (s.removeClass("in"), n.support.transition && s.hasClass("fade") ? s.one("bsTransitionEnd", a).emulateTransitionEnd(o.TRANSITION_DURATION) : a())
    };
    var t = n.fn.alert;
    n.fn.alert = function(i) {
        return this.each(function() {
            var t = n(this),
                e = t.data("bs.alert");
            e || t.data("bs.alert", e = new o(this)), "string" == typeof i && e[i].call(t)
        })
    }, n.fn.alert.Constructor = o, n.fn.alert.noConflict = function() { return n.fn.alert = t, this }, n(document).on("click.bs.alert.data-api", e, o.prototype.close)
}(jQuery),
function(n) {
    "use strict";
    var a = function(t, e) { this.$element = n(t), this.options = n.extend({}, a.DEFAULTS, e), this.isLoading = !1 };

    function i(s) {
        return this.each(function() {
            var t = n(this),
                e = t.data("bs.button"),
                i = "object" == typeof s && s;
            e || t.data("bs.button", e = new a(this, i)), "toggle" == s ? e.toggle() : s && e.setState(s)
        })
    }
    a.VERSION = "3.3.6", a.DEFAULTS = { loadingText: "loading..." }, a.prototype.setState = function(t) {
        var e = "disabled",
            i = this.$element,
            s = i.is("input") ? "val" : "html",
            a = i.data();
        t += "Text", null == a.resetText && i.data("resetText", i[s]()), setTimeout(n.proxy(function() { i[s](null == a[t] ? this.options[t] : a[t]), "loadingText" == t ? (this.isLoading = !0, i.addClass(e).attr(e, e)) : this.isLoading && (this.isLoading = !1, i.removeClass(e).removeAttr(e)) }, this), 0)
    }, a.prototype.toggle = function() {
        var t = !0,
            e = this.$element.closest('[data-toggle="buttons"]');
        if (e.length) { var i = this.$element.find("input"); "radio" == i.prop("type") ? (i.prop("checked") && (t = !1), e.find(".active").removeClass("active"), this.$element.addClass("active")) : "checkbox" == i.prop("type") && (i.prop("checked") !== this.$element.hasClass("active") && (t = !1), this.$element.toggleClass("active")), i.prop("checked", this.$element.hasClass("active")), t && i.trigger("change") } else this.$element.attr("aria-pressed", !this.$element.hasClass("active")), this.$element.toggleClass("active")
    };
    var t = n.fn.button;
    n.fn.button = i, n.fn.button.Constructor = a, n.fn.button.noConflict = function() { return n.fn.button = t, this }, n(document).on("click.bs.button.data-api", '[data-toggle^="button"]', function(t) {
        var e = n(t.target);
        e.hasClass("btn") || (e = e.closest(".btn")), i.call(e, "toggle"), n(t.target).is('input[type="radio"]') || n(t.target).is('input[type="checkbox"]') || t.preventDefault()
    }).on("focus.bs.button.data-api blur.bs.button.data-api", '[data-toggle^="button"]', function(t) { n(t.target).closest(".btn").toggleClass("focus", /^focus(in)?$/.test(t.type)) })
}(jQuery),
function(c) {
    "use strict";
    var p = function(t, e) { this.$element = c(t), this.$indicators = this.$element.find(".carousel-indicators"), this.options = e, this.paused = null, this.sliding = null, this.interval = null, this.$active = null, this.$items = null, this.options.keyboard && this.$element.on("keydown.bs.carousel", c.proxy(this.keydown, this)), "hover" == this.options.pause && !("ontouchstart" in document.documentElement) && this.$element.on("mouseenter.bs.carousel", c.proxy(this.pause, this)).on("mouseleave.bs.carousel", c.proxy(this.cycle, this)) };

    function o(a) {
        return this.each(function() {
            var t = c(this),
                e = t.data("bs.carousel"),
                i = c.extend({}, p.DEFAULTS, t.data(), "object" == typeof a && a),
                s = "string" == typeof a ? a : i.slide;
            e || t.data("bs.carousel", e = new p(this, i)), "number" == typeof a ? e.to(a) : s ? e[s]() : i.interval && e.pause().cycle()
        })
    }
    p.VERSION = "3.3.6", p.TRANSITION_DURATION = 600, p.DEFAULTS = { interval: 5e3, pause: "hover", wrap: !0, keyboard: !0 }, p.prototype.keydown = function(t) {
        if (!/input|textarea/i.test(t.target.tagName)) {
            switch (t.which) {
                case 37:
                    this.prev();
                    break;
                case 39:
                    this.next();
                    break;
                default:
                    return
            }
            t.preventDefault()
        }
    }, p.prototype.cycle = function(t) { return t || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(c.proxy(this.next, this), this.options.interval)), this }, p.prototype.getItemIndex = function(t) { return this.$items = t.parent().children(".item"), this.$items.index(t || this.$active) }, p.prototype.getItemForDirection = function(t, e) { var i = this.getItemIndex(e); if (("prev" == t && 0 === i || "next" == t && i == this.$items.length - 1) && !this.options.wrap) return e; var s = (i + ("prev" == t ? -1 : 1)) % this.$items.length; return this.$items.eq(s) }, p.prototype.to = function(t) {
        var e = this,
            i = this.getItemIndex(this.$active = this.$element.find(".item.active"));
        if (!(t > this.$items.length - 1 || t < 0)) return this.sliding ? this.$element.one("slid.bs.carousel", function() { e.to(t) }) : i == t ? this.pause().cycle() : this.slide(i < t ? "next" : "prev", this.$items.eq(t))
    }, p.prototype.pause = function(t) { return t || (this.paused = !0), this.$element.find(".next, .prev").length && c.support.transition && (this.$element.trigger(c.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this }, p.prototype.next = function() { if (!this.sliding) return this.slide("next") }, p.prototype.prev = function() { if (!this.sliding) return this.slide("prev") }, p.prototype.slide = function(t, e) {
        var i = this.$element.find(".item.active"),
            s = e || this.getItemForDirection(t, i),
            a = this.interval,
            n = "next" == t ? "left" : "right",
            o = this;
        if (s.hasClass("active")) return this.sliding = !1;
        var r = s[0],
            h = c.Event("slide.bs.carousel", { relatedTarget: r, direction: n });
        if (this.$element.trigger(h), !h.isDefaultPrevented()) {
            if (this.sliding = !0, a && this.pause(), this.$indicators.length) {
                this.$indicators.find(".active").removeClass("active");
                var l = c(this.$indicators.children()[this.getItemIndex(s)]);
                l && l.addClass("active")
            }
            var d = c.Event("slid.bs.carousel", { relatedTarget: r, direction: n });
            return c.support.transition && this.$element.hasClass("slide") ? (s.addClass(t), s[0].offsetWidth, i.addClass(n), s.addClass(n), i.one("bsTransitionEnd", function() { s.removeClass([t, n].join(" ")).addClass("active"), i.removeClass(["active", n].join(" ")), o.sliding = !1, setTimeout(function() { o.$element.trigger(d) }, 0) }).emulateTransitionEnd(p.TRANSITION_DURATION)) : (i.removeClass("active"), s.addClass("active"), this.sliding = !1, this.$element.trigger(d)), a && this.cycle(), this
        }
    };
    var t = c.fn.carousel;
    c.fn.carousel = o, c.fn.carousel.Constructor = p, c.fn.carousel.noConflict = function() { return c.fn.carousel = t, this };
    var e = function(t) {
        var e, i = c(this),
            s = c(i.attr("data-target") || (e = i.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""));
        if (s.hasClass("carousel")) {
            var a = c.extend({}, s.data(), i.data()),
                n = i.attr("data-slide-to");
            n && (a.interval = !1), o.call(s, a), n && s.data("bs.carousel").to(n), t.preventDefault()
        }
    };
    c(document).on("click.bs.carousel.data-api", "[data-slide]", e).on("click.bs.carousel.data-api", "[data-slide-to]", e), c(window).on("load", function() {
        c('[data-ride="carousel"]').each(function() {
            var t = c(this);
            o.call(t, t.data())
        })
    })
}(jQuery),
function(o) {
    "use strict";
    var r = function(t, e) { this.$element = o(t), this.options = o.extend({}, r.DEFAULTS, e), this.$trigger = o('[data-toggle="collapse"][href="#' + t.id + '"],[data-toggle="collapse"][data-target="#' + t.id + '"]'), this.transitioning = null, this.options.parent ? this.$parent = this.getParent() : this.addAriaAndCollapsedClass(this.$element, this.$trigger), this.options.toggle && this.toggle() };

    function a(t) { var e, i = t.attr("data-target") || (e = t.attr("href")) && e.replace(/.*(?=#[^\s]+$)/, ""); return o(i) }

    function h(s) {
        return this.each(function() {
            var t = o(this),
                e = t.data("bs.collapse"),
                i = o.extend({}, r.DEFAULTS, t.data(), "object" == typeof s && s);
            !e && i.toggle && /show|hide/.test(s) && (i.toggle = !1), e || t.data("bs.collapse", e = new r(this, i)), "string" == typeof s && e[s]()
        })
    }
    r.VERSION = "3.3.6", r.TRANSITION_DURATION = 350, r.DEFAULTS = { toggle: !0 }, r.prototype.dimension = function() { return this.$element.hasClass("width") ? "width" : "height" }, r.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var t, e = this.$parent && this.$parent.children(".panel").children(".in, .collapsing");
            if (!(e && e.length && (t = e.data("bs.collapse")) && t.transitioning)) {
                var i = o.Event("show.bs.collapse");
                if (this.$element.trigger(i), !i.isDefaultPrevented()) {
                    e && e.length && (h.call(e, "hide"), t || e.data("bs.collapse", null));
                    var s = this.dimension();
                    this.$element.removeClass("collapse").addClass("collapsing")[s](0).attr("aria-expanded", !0), this.$trigger.removeClass("collapsed").attr("aria-expanded", !0), this.transitioning = 1;
                    var a = function() { this.$element.removeClass("collapsing").addClass("collapse in")[s](""), this.transitioning = 0, this.$element.trigger("shown.bs.collapse") };
                    if (!o.support.transition) return a.call(this);
                    var n = o.camelCase(["scroll", s].join("-"));
                    this.$element.one("bsTransitionEnd", o.proxy(a, this)).emulateTransitionEnd(r.TRANSITION_DURATION)[s](this.$element[0][n])
                }
            }
        }
    }, r.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var t = o.Event("hide.bs.collapse");
            if (this.$element.trigger(t), !t.isDefaultPrevented()) {
                var e = this.dimension();
                this.$element[e](this.$element[e]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded", !1), this.$trigger.addClass("collapsed").attr("aria-expanded", !1), this.transitioning = 1;
                var i = function() { this.transitioning = 0, this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse") };
                if (!o.support.transition) return i.call(this);
                this.$element[e](0).one("bsTransitionEnd", o.proxy(i, this)).emulateTransitionEnd(r.TRANSITION_DURATION)
            }
        }
    }, r.prototype.toggle = function() { this[this.$element.hasClass("in") ? "hide" : "show"]() }, r.prototype.getParent = function() {
        return o(this.options.parent).find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]').each(o.proxy(function(t, e) {
            var i = o(e);
            this.addAriaAndCollapsedClass(a(i), i)
        }, this)).end()
    }, r.prototype.addAriaAndCollapsedClass = function(t, e) {
        var i = t.hasClass("in");
        t.attr("aria-expanded", i), e.toggleClass("collapsed", !i).attr("aria-expanded", i)
    };
    var t = o.fn.collapse;
    o.fn.collapse = h, o.fn.collapse.Constructor = r, o.fn.collapse.noConflict = function() { return o.fn.collapse = t, this }, o(document).on("click.bs.collapse.data-api", '[data-toggle="collapse"]', function(t) {
        var e = o(this);
        e.attr("data-target") || t.preventDefault();
        var i = a(e),
            s = i.data("bs.collapse") ? "toggle" : e.data();
        h.call(i, s)
    })
}(jQuery),
function(o) {
    "use strict";
    var r = '[data-toggle="dropdown"]',
        s = function(t) { o(t).on("click.bs.dropdown", this.toggle) };

    function h(t) {
        var e = t.attr("data-target");
        e || (e = (e = t.attr("href")) && /#[A-Za-z]/.test(e) && e.replace(/.*(?=#[^\s]*$)/, ""));
        var i = e && o(e);
        return i && i.length ? i : t.parent()
    }

    function n(s) {
        s && 3 === s.which || (o(".dropdown-backdrop").remove(), o(r).each(function() {
            var t = o(this),
                e = h(t),
                i = { relatedTarget: this };
            e.hasClass("open") && (s && "click" == s.type && /input|textarea/i.test(s.target.tagName) && o.contains(e[0], s.target) || (e.trigger(s = o.Event("hide.bs.dropdown", i)), s.isDefaultPrevented() || (t.attr("aria-expanded", "false"), e.removeClass("open").trigger(o.Event("hidden.bs.dropdown", i)))))
        }))
    }
    s.VERSION = "3.3.6", s.prototype.toggle = function(t) {
        var e = o(this);
        if (!e.is(".disabled, :disabled")) {
            var i = h(e),
                s = i.hasClass("open");
            if (n(), !s) {
                "ontouchstart" in document.documentElement && !i.closest(".navbar-nav").length && o(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(o(this)).on("click", n);
                var a = { relatedTarget: this };
                if (i.trigger(t = o.Event("show.bs.dropdown", a)), t.isDefaultPrevented()) return;
                e.trigger("focus").attr("aria-expanded", "true"), i.toggleClass("open").trigger(o.Event("shown.bs.dropdown", a))
            }
            return !1
        }
    }, s.prototype.keydown = function(t) {
        if (/(38|40|27|32)/.test(t.which) && !/input|textarea/i.test(t.target.tagName)) {
            var e = o(this);
            if (t.preventDefault(), t.stopPropagation(), !e.is(".disabled, :disabled")) {
                var i = h(e),
                    s = i.hasClass("open");
                if (!s && 27 != t.which || s && 27 == t.which) return 27 == t.which && i.find(r).trigger("focus"), e.trigger("click");
                var a = i.find(".dropdown-menu li:not(.disabled):visible a");
                if (a.length) {
                    var n = a.index(t.target);
                    38 == t.which && 0 < n && n--, 40 == t.which && n < a.length - 1 && n++, ~n || (n = 0), a.eq(n).trigger("focus")
                }
            }
        }
    };
    var t = o.fn.dropdown;
    o.fn.dropdown = function(i) {
        return this.each(function() {
            var t = o(this),
                e = t.data("bs.dropdown");
            e || t.data("bs.dropdown", e = new s(this)), "string" == typeof i && e[i].call(t)
        })
    }, o.fn.dropdown.Constructor = s, o.fn.dropdown.noConflict = function() { return o.fn.dropdown = t, this }, o(document).on("click.bs.dropdown.data-api", n).on("click.bs.dropdown.data-api", ".dropdown form", function(t) { t.stopPropagation() }).on("click.bs.dropdown.data-api", r, s.prototype.toggle).on("keydown.bs.dropdown.data-api", r, s.prototype.keydown).on("keydown.bs.dropdown.data-api", ".dropdown-menu", s.prototype.keydown)
}(jQuery),
function(n) {
    "use strict";
    var o = function(t, e) { this.options = e, this.$body = n(document.body), this.$element = n(t), this.$dialog = this.$element.find(".modal-dialog"), this.$backdrop = null, this.isShown = null, this.originalBodyPad = null, this.scrollbarWidth = 0, this.ignoreBackdropClick = !1, this.options.remote && this.$element.find(".modal-content").load(this.options.remote, n.proxy(function() { this.$element.trigger("loaded.bs.modal") }, this)) };

    function r(s, a) {
        return this.each(function() {
            var t = n(this),
                e = t.data("bs.modal"),
                i = n.extend({}, o.DEFAULTS, t.data(), "object" == typeof s && s);
            e || t.data("bs.modal", e = new o(this, i)), "string" == typeof s ? e[s](a) : i.show && e.show(a)
        })
    }
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 300, o.BACKDROP_TRANSITION_DURATION = 150, o.DEFAULTS = { backdrop: !0, keyboard: !0, show: !0 }, o.prototype.toggle = function(t) { return this.isShown ? this.hide() : this.show(t) }, o.prototype.show = function(i) {
        var s = this,
            t = n.Event("show.bs.modal", { relatedTarget: i });
        this.$element.trigger(t), this.isShown || t.isDefaultPrevented() || (this.isShown = !0, this.checkScrollbar(), this.setScrollbar(), this.$body.addClass("modal-open"), this.escape(), this.resize(), this.$element.on("click.dismiss.bs.modal", '[data-dismiss="modal"]', n.proxy(this.hide, this)), this.$dialog.on("mousedown.dismiss.bs.modal", function() { s.$element.one("mouseup.dismiss.bs.modal", function(t) { n(t.target).is(s.$element) && (s.ignoreBackdropClick = !0) }) }), this.backdrop(function() {
            var t = n.support.transition && s.$element.hasClass("fade");
            s.$element.parent().length || s.$element.appendTo(s.$body), s.$element.show().scrollTop(0), s.adjustDialog(), t && s.$element[0].offsetWidth, s.$element.addClass("in"), s.enforceFocus();
            var e = n.Event("shown.bs.modal", { relatedTarget: i });
            t ? s.$dialog.one("bsTransitionEnd", function() { s.$element.trigger("focus").trigger(e) }).emulateTransitionEnd(o.TRANSITION_DURATION) : s.$element.trigger("focus").trigger(e)
        }))
    }, o.prototype.hide = function(t) { t && t.preventDefault(), t = n.Event("hide.bs.modal"), this.$element.trigger(t), this.isShown && !t.isDefaultPrevented() && (this.isShown = !1, this.escape(), this.resize(), n(document).off("focusin.bs.modal"), this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"), this.$dialog.off("mousedown.dismiss.bs.modal"), n.support.transition && this.$element.hasClass("fade") ? this.$element.one("bsTransitionEnd", n.proxy(this.hideModal, this)).emulateTransitionEnd(o.TRANSITION_DURATION) : this.hideModal()) }, o.prototype.enforceFocus = function() { n(document).off("focusin.bs.modal").on("focusin.bs.modal", n.proxy(function(t) { document === t.target || this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.trigger("focus") }, this)) }, o.prototype.escape = function() { this.isShown && this.options.keyboard ? this.$element.on("keydown.dismiss.bs.modal", n.proxy(function(t) { 27 == t.which && this.hide() }, this)) : this.isShown || this.$element.off("keydown.dismiss.bs.modal") }, o.prototype.resize = function() { this.isShown ? n(window).on("resize.bs.modal", n.proxy(this.handleUpdate, this)) : n(window).off("resize.bs.modal") }, o.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() { t.$body.removeClass("modal-open"), t.resetAdjustments(), t.resetScrollbar(), t.$element.trigger("hidden.bs.modal") })
    }, o.prototype.removeBackdrop = function() { this.$backdrop && this.$backdrop.remove(), this.$backdrop = null }, o.prototype.backdrop = function(t) {
        var e = this,
            i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var s = n.support.transition && i;
            if (this.$backdrop = n(document.createElement("div")).addClass("modal-backdrop " + i).appendTo(this.$body), this.$element.on("click.dismiss.bs.modal", n.proxy(function(t) { this.ignoreBackdropClick ? this.ignoreBackdropClick = !1 : t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus() : this.hide()) }, this)), s && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !t) return;
            s ? this.$backdrop.one("bsTransitionEnd", t).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION) : t()
        } else if (!this.isShown && this.$backdrop) {
            this.$backdrop.removeClass("in");
            var a = function() { e.removeBackdrop(), t && t() };
            n.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one("bsTransitionEnd", a).emulateTransitionEnd(o.BACKDROP_TRANSITION_DURATION) : a()
        } else t && t()
    }, o.prototype.handleUpdate = function() { this.adjustDialog() }, o.prototype.adjustDialog = function() {
        var t = this.$element[0].scrollHeight > document.documentElement.clientHeight;
        this.$element.css({ paddingLeft: !this.bodyIsOverflowing && t ? this.scrollbarWidth : "", paddingRight: this.bodyIsOverflowing && !t ? this.scrollbarWidth : "" })
    }, o.prototype.resetAdjustments = function() { this.$element.css({ paddingLeft: "", paddingRight: "" }) }, o.prototype.checkScrollbar = function() {
        var t = window.innerWidth;
        if (!t) {
            var e = document.documentElement.getBoundingClientRect();
            t = e.right - Math.abs(e.left)
        }
        this.bodyIsOverflowing = document.body.clientWidth < t, this.scrollbarWidth = this.measureScrollbar()
    }, o.prototype.setScrollbar = function() {
        var t = parseInt(this.$body.css("padding-right") || 0, 10);
        this.originalBodyPad = document.body.style.paddingRight || "", this.bodyIsOverflowing && this.$body.css("padding-right", t + this.scrollbarWidth)
    }, o.prototype.resetScrollbar = function() { this.$body.css("padding-right", this.originalBodyPad) }, o.prototype.measureScrollbar = function() {
        var t = document.createElement("div");
        t.className = "modal-scrollbar-measure", this.$body.append(t);
        var e = t.offsetWidth - t.clientWidth;
        return this.$body[0].removeChild(t), e
    };
    var t = n.fn.modal;
    n.fn.modal = r, n.fn.modal.Constructor = o, n.fn.modal.noConflict = function() { return n.fn.modal = t, this }, n(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(t) {
        var e = n(this),
            i = e.attr("href"),
            s = n(e.attr("data-target") || i && i.replace(/.*(?=#[^\s]+$)/, "")),
            a = s.data("bs.modal") ? "toggle" : n.extend({ remote: !/#/.test(i) && i }, s.data(), e.data());
        e.is("a") && t.preventDefault(), s.one("show.bs.modal", function(t) { t.isDefaultPrevented() || s.one("hidden.bs.modal", function() { e.is(":visible") && e.trigger("focus") }) }), r.call(s, a, this)
    })
}(jQuery),
function(g) {
    "use strict";
    var v = function(t, e) { this.type = null, this.options = null, this.enabled = null, this.timeout = null, this.hoverState = null, this.$element = null, this.inState = null, this.init("tooltip", t, e) };
    v.VERSION = "3.3.6", v.TRANSITION_DURATION = 150, v.DEFAULTS = { animation: !0, placement: "top", selector: !1, template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>', trigger: "hover focus", title: "", delay: 0, html: !1, container: !1, viewport: { selector: "body", padding: 0 } }, v.prototype.init = function(t, e, i) {
        if (this.enabled = !0, this.type = t, this.$element = g(e), this.options = this.getOptions(i), this.$viewport = this.options.viewport && g(g.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : this.options.viewport.selector || this.options.viewport), this.inState = { click: !1, hover: !1, focus: !1 }, this.$element[0] instanceof document.constructor && !this.options.selector) throw new Error("`selector` option must be specified when initializing " + this.type + " on the window.document object!");
        for (var s = this.options.trigger.split(" "), a = s.length; a--;) {
            var n = s[a];
            if ("click" == n) this.$element.on("click." + this.type, this.options.selector, g.proxy(this.toggle, this));
            else if ("manual" != n) {
                var o = "hover" == n ? "mouseenter" : "focusin",
                    r = "hover" == n ? "mouseleave" : "focusout";
                this.$element.on(o + "." + this.type, this.options.selector, g.proxy(this.enter, this)), this.$element.on(r + "." + this.type, this.options.selector, g.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = g.extend({}, this.options, { trigger: "manual", selector: "" }) : this.fixTitle()
    }, v.prototype.getDefaults = function() { return v.DEFAULTS }, v.prototype.getOptions = function(t) { return (t = g.extend({}, this.getDefaults(), this.$element.data(), t)).delay && "number" == typeof t.delay && (t.delay = { show: t.delay, hide: t.delay }), t }, v.prototype.getDelegateOptions = function() {
        var i = {},
            s = this.getDefaults();
        return this._options && g.each(this._options, function(t, e) { s[t] != e && (i[t] = e) }), i
    }, v.prototype.enter = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        if (e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusin" == t.type ? "focus" : "hover"] = !0), e.tip().hasClass("in") || "in" == e.hoverState) e.hoverState = "in";
        else {
            if (clearTimeout(e.timeout), e.hoverState = "in", !e.options.delay || !e.options.delay.show) return e.show();
            e.timeout = setTimeout(function() { "in" == e.hoverState && e.show() }, e.options.delay.show)
        }
    }, v.prototype.isInStateTrue = function() {
        for (var t in this.inState)
            if (this.inState[t]) return !0;
        return !1
    }, v.prototype.leave = function(t) {
        var e = t instanceof this.constructor ? t : g(t.currentTarget).data("bs." + this.type);
        if (e || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e)), t instanceof g.Event && (e.inState["focusout" == t.type ? "focus" : "hover"] = !1), !e.isInStateTrue()) {
            if (clearTimeout(e.timeout), e.hoverState = "out", !e.options.delay || !e.options.delay.hide) return e.hide();
            e.timeout = setTimeout(function() { "out" == e.hoverState && e.hide() }, e.options.delay.hide)
        }
    }, v.prototype.show = function() {
        var t = g.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            this.$element.trigger(t);
            var e = g.contains(this.$element[0].ownerDocument.documentElement, this.$element[0]);
            if (t.isDefaultPrevented() || !e) return;
            var i = this,
                s = this.tip(),
                a = this.getUID(this.type);
            this.setContent(), s.attr("id", a), this.$element.attr("aria-describedby", a), this.options.animation && s.addClass("fade");
            var n = "function" == typeof this.options.placement ? this.options.placement.call(this, s[0], this.$element[0]) : this.options.placement,
                o = /\s?auto?\s?/i,
                r = o.test(n);
            r && (n = n.replace(o, "") || "top"), s.detach().css({ top: 0, left: 0, display: "block" }).addClass(n).data("bs." + this.type, this), this.options.container ? s.appendTo(this.options.container) : s.insertAfter(this.$element), this.$element.trigger("inserted.bs." + this.type);
            var h = this.getPosition(),
                l = s[0].offsetWidth,
                d = s[0].offsetHeight;
            if (r) {
                var c = n,
                    p = this.getPosition(this.$viewport);
                n = "bottom" == n && h.bottom + d > p.bottom ? "top" : "top" == n && h.top - d < p.top ? "bottom" : "right" == n && h.right + l > p.width ? "left" : "left" == n && h.left - l < p.left ? "right" : n, s.removeClass(c).addClass(n)
            }
            var u = this.getCalculatedOffset(n, h, l, d);
            this.applyPlacement(u, n);
            var f = function() {
                var t = i.hoverState;
                i.$element.trigger("shown.bs." + i.type), i.hoverState = null, "out" == t && i.leave(i)
            };
            g.support.transition && this.$tip.hasClass("fade") ? s.one("bsTransitionEnd", f).emulateTransitionEnd(v.TRANSITION_DURATION) : f()
        }
    }, v.prototype.applyPlacement = function(t, e) {
        var i = this.tip(),
            s = i[0].offsetWidth,
            a = i[0].offsetHeight,
            n = parseInt(i.css("margin-top"), 10),
            o = parseInt(i.css("margin-left"), 10);
        isNaN(n) && (n = 0), isNaN(o) && (o = 0), t.top += n, t.left += o, g.offset.setOffset(i[0], g.extend({ using: function(t) { i.css({ top: Math.round(t.top), left: Math.round(t.left) }) } }, t), 0), i.addClass("in");
        var r = i[0].offsetWidth,
            h = i[0].offsetHeight;
        "top" == e && h != a && (t.top = t.top + a - h);
        var l = this.getViewportAdjustedDelta(e, t, r, h);
        l.left ? t.left += l.left : t.top += l.top;
        var d = /top|bottom/.test(e),
            c = d ? 2 * l.left - s + r : 2 * l.top - a + h,
            p = d ? "offsetWidth" : "offsetHeight";
        i.offset(t), this.replaceArrow(c, i[0][p], d)
    }, v.prototype.replaceArrow = function(t, e, i) { this.arrow().css(i ? "left" : "top", 50 * (1 - t / e) + "%").css(i ? "top" : "left", "") }, v.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, v.prototype.hide = function(t) {
        var e = this,
            i = g(this.$tip),
            s = g.Event("hide.bs." + this.type);

        function a() { "in" != e.hoverState && i.detach(), e.$element.removeAttr("aria-describedby").trigger("hidden.bs." + e.type), t && t() }
        if (this.$element.trigger(s), !s.isDefaultPrevented()) return i.removeClass("in"), g.support.transition && i.hasClass("fade") ? i.one("bsTransitionEnd", a).emulateTransitionEnd(v.TRANSITION_DURATION) : a(), this.hoverState = null, this
    }, v.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, v.prototype.hasContent = function() { return this.getTitle() }, v.prototype.getPosition = function(t) {
        var e = (t = t || this.$element)[0],
            i = "BODY" == e.tagName,
            s = e.getBoundingClientRect();
        null == s.width && (s = g.extend({}, s, { width: s.right - s.left, height: s.bottom - s.top }));
        var a = i ? { top: 0, left: 0 } : t.offset(),
            n = { scroll: i ? document.documentElement.scrollTop || document.body.scrollTop : t.scrollTop() },
            o = i ? { width: g(window).width(), height: g(window).height() } : null;
        return g.extend({}, s, n, o, a)
    }, v.prototype.getCalculatedOffset = function(t, e, i, s) { return "bottom" == t ? { top: e.top + e.height, left: e.left + e.width / 2 - i / 2 } : "top" == t ? { top: e.top - s, left: e.left + e.width / 2 - i / 2 } : "left" == t ? { top: e.top + e.height / 2 - s / 2, left: e.left - i } : { top: e.top + e.height / 2 - s / 2, left: e.left + e.width } }, v.prototype.getViewportAdjustedDelta = function(t, e, i, s) {
        var a = { top: 0, left: 0 };
        if (!this.$viewport) return a;
        var n = this.options.viewport && this.options.viewport.padding || 0,
            o = this.getPosition(this.$viewport);
        if (/right|left/.test(t)) {
            var r = e.top - n - o.scroll,
                h = e.top + n - o.scroll + s;
            r < o.top ? a.top = o.top - r : h > o.top + o.height && (a.top = o.top + o.height - h)
        } else {
            var l = e.left - n,
                d = e.left + n + i;
            l < o.left ? a.left = o.left - l : d > o.right && (a.left = o.left + o.width - d)
        }
        return a
    }, v.prototype.getTitle = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-original-title") || ("function" == typeof e.title ? e.title.call(t[0]) : e.title)
    }, v.prototype.getUID = function(t) { for (; t += ~~(1e6 * Math.random()), document.getElementById(t);); return t }, v.prototype.tip = function() { if (!this.$tip && (this.$tip = g(this.options.template), 1 != this.$tip.length)) throw new Error(this.type + " `template` option must consist of exactly 1 top-level element!"); return this.$tip }, v.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow") }, v.prototype.enable = function() { this.enabled = !0 }, v.prototype.disable = function() { this.enabled = !1 }, v.prototype.toggleEnabled = function() { this.enabled = !this.enabled }, v.prototype.toggle = function(t) {
        var e = this;
        t && ((e = g(t.currentTarget).data("bs." + this.type)) || (e = new this.constructor(t.currentTarget, this.getDelegateOptions()), g(t.currentTarget).data("bs." + this.type, e))), t ? (e.inState.click = !e.inState.click, e.isInStateTrue() ? e.enter(e) : e.leave(e)) : e.tip().hasClass("in") ? e.leave(e) : e.enter(e)
    }, v.prototype.destroy = function() {
        var t = this;
        clearTimeout(this.timeout), this.hide(function() { t.$element.off("." + t.type).removeData("bs." + t.type), t.$tip && t.$tip.detach(), t.$tip = null, t.$arrow = null, t.$viewport = null })
    };
    var t = g.fn.tooltip;
    g.fn.tooltip = function(s) {
        return this.each(function() {
            var t = g(this),
                e = t.data("bs.tooltip"),
                i = "object" == typeof s && s;
            !e && /destroy|hide/.test(s) || (e || t.data("bs.tooltip", e = new v(this, i)), "string" == typeof s && e[s]())
        })
    }, g.fn.tooltip.Constructor = v, g.fn.tooltip.noConflict = function() { return g.fn.tooltip = t, this }
}(jQuery),
function(a) {
    "use strict";
    var n = function(t, e) { this.init("popover", t, e) };
    if (!a.fn.tooltip) throw new Error("Popover requires tooltip.js");
    n.VERSION = "3.3.6", n.DEFAULTS = a.extend({}, a.fn.tooltip.Constructor.DEFAULTS, { placement: "right", trigger: "click", content: "", template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>' }), ((n.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype)).constructor = n).prototype.getDefaults = function() { return n.DEFAULTS }, n.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content").children().detach().end()[this.options.html ? "string" == typeof i ? "html" : "append" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, n.prototype.hasContent = function() { return this.getTitle() || this.getContent() }, n.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, n.prototype.arrow = function() { return this.$arrow = this.$arrow || this.tip().find(".arrow") };
    var t = a.fn.popover;
    a.fn.popover = function(s) {
        return this.each(function() {
            var t = a(this),
                e = t.data("bs.popover"),
                i = "object" == typeof s && s;
            !e && /destroy|hide/.test(s) || (e || t.data("bs.popover", e = new n(this, i)), "string" == typeof s && e[s]())
        })
    }, a.fn.popover.Constructor = n, a.fn.popover.noConflict = function() { return a.fn.popover = t, this }
}(jQuery),
function(n) {
    "use strict";

    function a(t, e) { this.$body = n(document.body), this.$scrollElement = n(t).is(document.body) ? n(window) : n(t), this.options = n.extend({}, a.DEFAULTS, e), this.selector = this.options.selector || (this.options.target || "") + " .nav li > a", this.offsets = [], this.targets = [], this.activeTarget = null, this.scrollHeight = 0, this.$scrollElement.on("scroll.bs.scrollspy", n.proxy(this.process, this)), this.refresh(), this.process() }

    function e(s) {
        return this.each(function() {
            var t = n(this),
                e = t.data("bs.scrollspy"),
                i = "object" == typeof s && s;
            e || t.data("bs.scrollspy", e = new a(this, i)), "string" == typeof s && e[s]()
        })
    }
    a.VERSION = "3.3.6", a.DEFAULTS = { offset: 10 }, a.prototype.getScrollHeight = function() { return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight) }, a.prototype.refresh = function() {
        var t = this,
            s = "offset",
            a = 0;
        this.offsets = [], this.targets = [], this.scrollHeight = this.getScrollHeight(), n.isWindow(this.$scrollElement[0]) || (s = "position", a = this.$scrollElement.scrollTop()), this.$body.find(this.selector).map(function() {
            var t = n(this),
                e = t.data("target") || t.attr("href"),
                i = /^#./.test(e) && n(e);
            return i && i.length && i.is(":visible") && [
                [i[s]().top + a, e]
            ] || null
        }).sort(function(t, e) { return t[0] - e[0] }).each(function() { t.offsets.push(this[0]), t.targets.push(this[1]) })
    }, a.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.getScrollHeight(),
            s = this.options.offset + i - this.$scrollElement.height(),
            a = this.offsets,
            n = this.targets,
            o = this.activeTarget;
        if (this.scrollHeight != i && this.refresh(), s <= e) return o != (t = n[n.length - 1]) && this.activate(t);
        if (o && e < a[0]) return this.activeTarget = null, this.clear();
        for (t = a.length; t--;) o != n[t] && e >= a[t] && (void 0 === a[t + 1] || e < a[t + 1]) && this.activate(n[t])
    }, a.prototype.activate = function(t) {
        this.activeTarget = t, this.clear();
        var e = this.selector + '[data-target="' + t + '"],' + this.selector + '[href="' + t + '"]',
            i = n(e).parents("li").addClass("active");
        i.parent(".dropdown-menu").length && (i = i.closest("li.dropdown").addClass("active")), i.trigger("activate.bs.scrollspy")
    }, a.prototype.clear = function() { n(this.selector).parentsUntil(this.options.target, ".active").removeClass("active") };
    var t = n.fn.scrollspy;
    n.fn.scrollspy = e, n.fn.scrollspy.Constructor = a, n.fn.scrollspy.noConflict = function() { return n.fn.scrollspy = t, this }, n(window).on("load.bs.scrollspy.data-api", function() {
        n('[data-spy="scroll"]').each(function() {
            var t = n(this);
            e.call(t, t.data())
        })
    })
}(jQuery),
function(r) {
    "use strict";
    var o = function(t) { this.element = r(t) };

    function e(i) {
        return this.each(function() {
            var t = r(this),
                e = t.data("bs.tab");
            e || t.data("bs.tab", e = new o(this)), "string" == typeof i && e[i]()
        })
    }
    o.VERSION = "3.3.6", o.TRANSITION_DURATION = 150, o.prototype.show = function() {
        var t = this.element,
            e = t.closest("ul:not(.dropdown-menu)"),
            i = t.data("target");
        if (i || (i = (i = t.attr("href")) && i.replace(/.*(?=#[^\s]*$)/, "")), !t.parent("li").hasClass("active")) {
            var s = e.find(".active:last a"),
                a = r.Event("hide.bs.tab", { relatedTarget: t[0] }),
                n = r.Event("show.bs.tab", { relatedTarget: s[0] });
            if (s.trigger(a), t.trigger(n), !n.isDefaultPrevented() && !a.isDefaultPrevented()) {
                var o = r(i);
                this.activate(t.closest("li"), e), this.activate(o, o.parent(), function() { s.trigger({ type: "hidden.bs.tab", relatedTarget: t[0] }), t.trigger({ type: "shown.bs.tab", relatedTarget: s[0] }) })
            }
        }
    }, o.prototype.activate = function(t, e, i) {
        var s = e.find("> .active"),
            a = i && r.support.transition && (s.length && s.hasClass("fade") || !!e.find("> .fade").length);

        function n() { s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !1), t.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded", !0), a ? (t[0].offsetWidth, t.addClass("in")) : t.removeClass("fade"), t.parent(".dropdown-menu").length && t.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded", !0), i && i() }
        s.length && a ? s.one("bsTransitionEnd", n).emulateTransitionEnd(o.TRANSITION_DURATION) : n(), s.removeClass("in")
    };
    var t = r.fn.tab;
    r.fn.tab = e, r.fn.tab.Constructor = o, r.fn.tab.noConflict = function() { return r.fn.tab = t, this };
    var i = function(t) { t.preventDefault(), e.call(r(this), "show") };
    r(document).on("click.bs.tab.data-api", '[data-toggle="tab"]', i).on("click.bs.tab.data-api", '[data-toggle="pill"]', i)
}(jQuery),
function(x, S) {
    function _() { return new Date(Date.UTC.apply(Date, arguments)) }

    function d() { var t = new Date; return _(t.getFullYear(), t.getMonth(), t.getDate()) }

    function t(t) { return function() { return this[t].apply(this, arguments) } }
    var e, i = (e = {
            get: function(t) { return this.slice(t)[0] },
            contains: function(t) {
                for (var e = t && t.valueOf(), i = 0, s = this.length; i < s; i++)
                    if (this[i].valueOf() === e) return i;
                return -1
            },
            remove: function(t) { this.splice(t, 1) },
            replace: function(t) { t && (x.isArray(t) || (t = [t]), this.clear(), this.push.apply(this, t)) },
            clear: function() { this.length = 0 },
            copy: function() { var t = new i; return t.replace(this), t }
        }, function() { var t = []; return t.push.apply(t, arguments), x.extend(t, e), t }),
        y = function(t, e) { this._process_options(e), this.dates = new i, this.viewDate = this.o.defaultViewDate, this.focusDate = null, this.element = x(t), this.isInline = !1, this.isInput = this.element.is("input"), this.component = !!this.element.hasClass("date") && this.element.find(".add-on, .input-group-addon, .btn"), this.hasInput = this.component && this.element.find("input").length, this.component && 0 === this.component.length && (this.component = !1), this.picker = x(E.template), this._buildEvents(), this._attachEvents(), this.isInline ? this.picker.addClass("datepicker-inline").appendTo(this.element) : this.picker.addClass("datepicker-dropdown dropdown-menu"), this.o.rtl && this.picker.addClass("datepicker-rtl"), this.viewMode = this.o.startView, this.o.calendarWeeks && this.picker.find("tfoot .today, tfoot .clear").attr("colspan", function(t, e) { return parseInt(e) + 1 }), this._allow_update = !1, this.setStartDate(this._o.startDate), this.setEndDate(this._o.endDate), this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled), this.setDatesDisabled(this.o.datesDisabled), this.fillDow(), this.fillMonths(), this._allow_update = !0, this.update(), this.showMode(), this.isInline && this.show() };
    y.prototype = {
        constructor: y,
        _process_options: function(t) {
            this._o = x.extend({}, this._o, t);
            var e = this.o = x.extend({}, this._o),
                i = e.language;
            switch (U[i] || (i = i.split("-")[0], U[i] || (i = p.language)), e.language = i, e.startView) {
                case 2:
                case "decade":
                    e.startView = 2;
                    break;
                case 1:
                case "year":
                    e.startView = 1;
                    break;
                default:
                    e.startView = 0
            }
            switch (e.minViewMode) {
                case 1:
                case "months":
                    e.minViewMode = 1;
                    break;
                case 2:
                case "years":
                    e.minViewMode = 2;
                    break;
                default:
                    e.minViewMode = 0
            }
            e.startView = Math.max(e.startView, e.minViewMode), !0 !== e.multidate && (e.multidate = Number(e.multidate) || !1, !1 !== e.multidate && (e.multidate = Math.max(0, e.multidate))), e.multidateSeparator = String(e.multidateSeparator), e.weekStart %= 7, e.weekEnd = (e.weekStart + 6) % 7;
            var s = E.parseFormat(e.format);
            if (e.startDate !== -1 / 0 && (e.startDate ? e.startDate instanceof Date ? e.startDate = this._local_to_utc(this._zero_time(e.startDate)) : e.startDate = E.parseDate(e.startDate, s, e.language) : e.startDate = -1 / 0), e.endDate !== 1 / 0 && (e.endDate ? e.endDate instanceof Date ? e.endDate = this._local_to_utc(this._zero_time(e.endDate)) : e.endDate = E.parseDate(e.endDate, s, e.language) : e.endDate = 1 / 0), e.daysOfWeekDisabled = e.daysOfWeekDisabled || [], x.isArray(e.daysOfWeekDisabled) || (e.daysOfWeekDisabled = e.daysOfWeekDisabled.split(/[,\s]*/)), e.daysOfWeekDisabled = x.map(e.daysOfWeekDisabled, function(t) { return parseInt(t, 10) }), e.datesDisabled = e.datesDisabled || [], !x.isArray(e.datesDisabled)) {
                var a = [];
                a.push(E.parseDate(e.datesDisabled, s, e.language)), e.datesDisabled = a
            }
            e.datesDisabled = x.map(e.datesDisabled, function(t) { return E.parseDate(t, s, e.language) });
            var n = String(e.orientation).toLowerCase().split(/\s+/g),
                o = e.orientation.toLowerCase();
            if (n = x.grep(n, function(t) { return /^auto|left|right|top|bottom$/.test(t) }), e.orientation = { x: "auto", y: "auto" }, o && "auto" !== o)
                if (1 === n.length) switch (n[0]) {
                    case "top":
                    case "bottom":
                        e.orientation.y = n[0];
                        break;
                    case "left":
                    case "right":
                        e.orientation.x = n[0]
                } else o = x.grep(n, function(t) { return /^left|right$/.test(t) }), e.orientation.x = o[0] || "auto", o = x.grep(n, function(t) { return /^top|bottom$/.test(t) }), e.orientation.y = o[0] || "auto";
                else;
            if (e.defaultViewDate) {
                var r = e.defaultViewDate.year || (new Date).getFullYear(),
                    h = e.defaultViewDate.month || 0,
                    l = e.defaultViewDate.day || 1;
                e.defaultViewDate = _(r, h, l)
            } else e.defaultViewDate = d();
            e.showOnFocus = e.showOnFocus === S || e.showOnFocus
        },
        _events: [],
        _secondaryEvents: [],
        _applyEvents: function(t) { for (var e, i, s, a = 0; a < t.length; a++) e = t[a][0], 2 === t[a].length ? (i = S, s = t[a][1]) : 3 === t[a].length && (i = t[a][1], s = t[a][2]), e.on(s, i) },
        _unapplyEvents: function(t) { for (var e, i, s, a = 0; a < t.length; a++) e = t[a][0], 2 === t[a].length ? (s = S, i = t[a][1]) : 3 === t[a].length && (s = t[a][1], i = t[a][2]), e.off(i, s) },
        _buildEvents: function() {
            var t = { keyup: x.proxy(function(t) {-1 === x.inArray(t.keyCode, [27, 37, 39, 38, 40, 32, 13, 9]) && this.update() }, this), keydown: x.proxy(this.keydown, this) };
            !0 === this.o.showOnFocus && (t.focus = x.proxy(this.show, this)), this.isInput ? this._events = [
                [this.element, t]
            ] : this.component && this.hasInput ? this._events = [
                [this.element.find("input"), t],
                [this.component, { click: x.proxy(this.show, this) }]
            ] : this.element.is("div") ? this.isInline = !0 : this._events = [
                [this.element, { click: x.proxy(this.show, this) }]
            ], this._events.push([this.element, "*", { blur: x.proxy(function(t) { this._focused_from = t.target }, this) }], [this.element, { blur: x.proxy(function(t) { this._focused_from = t.target }, this) }]), this._secondaryEvents = [
                [this.picker, { click: x.proxy(this.click, this) }],
                [x(window), { resize: x.proxy(this.place, this) }],
                [x(document), { "mousedown touchstart": x.proxy(function(t) { this.element.is(t.target) || this.element.find(t.target).length || this.picker.is(t.target) || this.picker.find(t.target).length || this.hide() }, this) }]
            ]
        },
        _attachEvents: function() { this._detachEvents(), this._applyEvents(this._events) },
        _detachEvents: function() { this._unapplyEvents(this._events) },
        _attachSecondaryEvents: function() { this._detachSecondaryEvents(), this._applyEvents(this._secondaryEvents) },
        _detachSecondaryEvents: function() { this._unapplyEvents(this._secondaryEvents) },
        _trigger: function(t, e) {
            var i = e || this.dates.get(-1),
                s = this._utc_to_local(i);
            this.element.trigger({ type: t, date: s, dates: x.map(this.dates, this._utc_to_local), format: x.proxy(function(t, e) { 0 === arguments.length ? (t = this.dates.length - 1, e = this.o.format) : "string" == typeof t && (e = t, t = this.dates.length - 1), e = e || this.o.format; var i = this.dates.get(t); return E.formatDate(i, e, this.o.language) }, this) })
        },
        show: function() { if (!this.element.attr("readonly")) return this.isInline || this.picker.appendTo(this.o.container), this.place(), this.picker.show(), this._attachSecondaryEvents(), this._trigger("show"), (window.navigator.msMaxTouchPoints || "ontouchstart" in document) && this.o.disableTouchKeyboard && x(this.element).blur(), this },
        hide: function() { return this.isInline || this.picker.is(":visible") && (this.focusDate = null, this.picker.hide().detach(), this._detachSecondaryEvents(), this.viewMode = this.o.startView, this.showMode(), this.o.forceParse && (this.isInput && this.element.val() || this.hasInput && this.element.find("input").val()) && this.setValue(), this._trigger("hide")), this },
        remove: function() { return this.hide(), this._detachEvents(), this._detachSecondaryEvents(), this.picker.remove(), delete this.element.data().datepicker, this.isInput || delete this.element.data().date, this },
        _utc_to_local: function(t) { return t && new Date(t.getTime() + 6e4 * t.getTimezoneOffset()) },
        _local_to_utc: function(t) { return t && new Date(t.getTime() - 6e4 * t.getTimezoneOffset()) },
        _zero_time: function(t) { return t && new Date(t.getFullYear(), t.getMonth(), t.getDate()) },
        _zero_utc_time: function(t) { return t && new Date(Date.UTC(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate())) },
        getDates: function() { return x.map(this.dates, this._utc_to_local) },
        getUTCDates: function() { return x.map(this.dates, function(t) { return new Date(t) }) },
        getDate: function() { return this._utc_to_local(this.getUTCDate()) },
        getUTCDate: function() { var t = this.dates.get(-1); return void 0 !== t ? new Date(t) : null },
        clearDates: function() {
            var t;
            this.isInput ? t = this.element : this.component && (t = this.element.find("input")), t && t.val("").change(), this.update(), this._trigger("changeDate"), this.o.autoclose && this.hide()
        },
        setDates: function() { var t = x.isArray(arguments[0]) ? arguments[0] : arguments; return this.update.apply(this, t), this._trigger("changeDate"), this.setValue(), this },
        setUTCDates: function() { var t = x.isArray(arguments[0]) ? arguments[0] : arguments; return this.update.apply(this, x.map(t, this._utc_to_local)), this._trigger("changeDate"), this.setValue(), this },
        setDate: t("setDates"),
        setUTCDate: t("setUTCDates"),
        setValue: function() { var t = this.getFormattedDate(); return this.isInput ? this.element.val(t).change() : this.component && this.element.find("input").val(t).change(), this },
        getFormattedDate: function(e) { e === S && (e = this.o.format); var i = this.o.language; return x.map(this.dates, function(t) { return E.formatDate(t, e, i) }).join(this.o.multidateSeparator) },
        setStartDate: function(t) { return this._process_options({ startDate: t }), this.update(), this.updateNavArrows(), this },
        setEndDate: function(t) { return this._process_options({ endDate: t }), this.update(), this.updateNavArrows(), this },
        setDaysOfWeekDisabled: function(t) { return this._process_options({ daysOfWeekDisabled: t }), this.update(), this.updateNavArrows(), this },
        setDatesDisabled: function(t) { this._process_options({ datesDisabled: t }), this.update(), this.updateNavArrows() },
        place: function() {
            if (this.isInline) return this;
            var t = this.picker.outerWidth(),
                e = this.picker.outerHeight(),
                i = x(this.o.container).width(),
                s = x(this.o.container).height(),
                a = x(this.o.container).scrollTop(),
                n = x(this.o.container).offset(),
                o = [];
            this.element.parents().each(function() { var t = x(this).css("z-index"); "auto" !== t && 0 !== t && o.push(parseInt(t)) });
            var r = Math.max.apply(Math, o) + 10,
                h = this.component ? this.component.parent().offset() : this.element.offset(),
                l = this.component ? this.component.outerHeight(!0) : this.element.outerHeight(!1),
                d = this.component ? this.component.outerWidth(!0) : this.element.outerWidth(!1),
                c = h.left - n.left,
                p = h.top - n.top;
            this.picker.removeClass("datepicker-orient-top datepicker-orient-bottom datepicker-orient-right datepicker-orient-left"), "auto" !== this.o.orientation.x ? (this.picker.addClass("datepicker-orient-" + this.o.orientation.x), "right" === this.o.orientation.x && (c -= t - d)) : h.left < 0 ? (this.picker.addClass("datepicker-orient-left"), c -= h.left - 10) : i < c + t ? (this.picker.addClass("datepicker-orient-right"), c = h.left + d - t) : this.picker.addClass("datepicker-orient-left");
            var u, f, g = this.o.orientation.y;
            if ("auto" === g && (u = -a + p - e, f = a + s - (p + l + e), g = Math.max(u, f) === f ? "top" : "bottom"), this.picker.addClass("datepicker-orient-" + g), "top" === g ? p += l : p -= e + parseInt(this.picker.css("padding-top")), this.o.rtl) {
                var v = i - (c + d);
                this.picker.css({ top: p, right: v, zIndex: r })
            } else this.picker.css({ top: p, left: c, zIndex: r });
            return this
        },
        _allow_update: !0,
        update: function() {
            if (!this._allow_update) return this;
            var t = this.dates.copy(),
                i = [],
                e = !1;
            return arguments.length ? (x.each(arguments, x.proxy(function(t, e) { e instanceof Date && (e = this._local_to_utc(e)), i.push(e) }, this)), e = !0) : (i = (i = this.isInput ? this.element.val() : this.element.data("date") || this.element.find("input").val()) && this.o.multidate ? i.split(this.o.multidateSeparator) : [i], delete this.element.data().date), i = x.map(i, x.proxy(function(t) { return E.parseDate(t, this.o.format, this.o.language) }, this)), i = x.grep(i, x.proxy(function(t) { return t < this.o.startDate || t > this.o.endDate || !t }, this), !0), this.dates.replace(i), this.dates.length ? this.viewDate = new Date(this.dates.get(-1)) : this.viewDate < this.o.startDate ? this.viewDate = new Date(this.o.startDate) : this.viewDate > this.o.endDate && (this.viewDate = new Date(this.o.endDate)), e ? this.setValue() : i.length && String(t) !== String(this.dates) && this._trigger("changeDate"), !this.dates.length && t.length && this._trigger("clearDate"), this.fill(), this
        },
        fillDow: function() {
            var t = this.o.weekStart,
                e = "<tr>";
            if (this.o.calendarWeeks) {
                this.picker.find(".datepicker-days thead tr:first-child .datepicker-switch").attr("colspan", function(t, e) { return parseInt(e) + 1 });
                e += '<th class="cw">&#160;</th>'
            }
            for (; t < this.o.weekStart + 7;) e += '<th class="dow">' + U[this.o.language].daysMin[t++ % 7] + "</th>";
            e += "</tr>", this.picker.find(".datepicker-days thead").append(e)
        },
        fillMonths: function() {
            for (var t = "", e = 0; e < 12;) t += '<span class="month">' + U[this.o.language].monthsShort[e++] + "</span>";
            this.picker.find(".datepicker-months td").html(t)
        },
        setRange: function(t) { t && t.length ? this.range = x.map(t, function(t) { return t.valueOf() }) : delete this.range, this.fill() },
        getClassNames: function(s) {
            var t = [],
                e = this.viewDate.getUTCFullYear(),
                i = this.viewDate.getUTCMonth(),
                a = new Date;
            return s.getUTCFullYear() < e || s.getUTCFullYear() === e && s.getUTCMonth() < i ? t.push("old") : (s.getUTCFullYear() > e || s.getUTCFullYear() === e && s.getUTCMonth() > i) && t.push("new"), this.focusDate && s.valueOf() === this.focusDate.valueOf() && t.push("focused"), this.o.todayHighlight && s.getUTCFullYear() === a.getFullYear() && s.getUTCMonth() === a.getMonth() && s.getUTCDate() === a.getDate() && t.push("today"), -1 !== this.dates.contains(s) && t.push("active"), (s.valueOf() < this.o.startDate || s.valueOf() > this.o.endDate || -1 !== x.inArray(s.getUTCDay(), this.o.daysOfWeekDisabled)) && t.push("disabled"), 0 < this.o.datesDisabled.length && 0 < x.grep(this.o.datesDisabled, function(t) { return i = t, (e = s).getUTCFullYear() === i.getUTCFullYear() && e.getUTCMonth() === i.getUTCMonth() && e.getUTCDate() === i.getUTCDate(); var e, i }).length && t.push("disabled", "disabled-date"), this.range && (s > this.range[0] && s < this.range[this.range.length - 1] && t.push("range"), -1 !== x.inArray(s.valueOf(), this.range) && t.push("selected")), t
        },
        fill: function() {
            var t, e = new Date(this.viewDate),
                s = e.getUTCFullYear(),
                i = e.getUTCMonth(),
                a = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCFullYear() : -1 / 0,
                n = this.o.startDate !== -1 / 0 ? this.o.startDate.getUTCMonth() : -1 / 0,
                o = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCFullYear() : 1 / 0,
                r = this.o.endDate !== 1 / 0 ? this.o.endDate.getUTCMonth() : 1 / 0,
                h = U[this.o.language].today || U.en.today || "",
                l = U[this.o.language].clear || U.en.clear || "";
            if (!isNaN(s) && !isNaN(i)) {
                this.picker.find(".datepicker-days thead .datepicker-switch").text(U[this.o.language].months[i] + " " + s), this.picker.find("tfoot .today").text(h).toggle(!1 !== this.o.todayBtn), this.picker.find("tfoot .clear").text(l).toggle(!1 !== this.o.clearBtn), this.updateNavArrows(), this.fillMonths();
                var d = _(s, i - 1, 28),
                    c = E.getDaysInMonth(d.getUTCFullYear(), d.getUTCMonth());
                d.setUTCDate(c), d.setUTCDate(c - (d.getUTCDay() - this.o.weekStart + 7) % 7);
                var p = new Date(d);
                p.setUTCDate(p.getUTCDate() + 42), p = p.valueOf();
                for (var u, f = []; d.valueOf() < p;) {
                    if (d.getUTCDay() === this.o.weekStart && (f.push("<tr>"), this.o.calendarWeeks)) {
                        var g = new Date(+d + (this.o.weekStart - d.getUTCDay() - 7) % 7 * 864e5),
                            v = new Date(Number(g) + (11 - g.getUTCDay()) % 7 * 864e5),
                            m = new Date(Number(m = _(v.getUTCFullYear(), 0, 1)) + (11 - m.getUTCDay()) % 7 * 864e5),
                            y = (v - m) / 864e5 / 7 + 1;
                        f.push('<td class="cw">' + y + "</td>")
                    }
                    if ((u = this.getClassNames(d)).push("day"), this.o.beforeShowDay !== x.noop) {
                        var b = this.o.beforeShowDay(this._utc_to_local(d));
                        b === S ? b = {} : "boolean" == typeof b ? b = { enabled: b } : "string" == typeof b && (b = { classes: b }), !1 === b.enabled && u.push("disabled"), b.classes && (u = u.concat(b.classes.split(/\s+/))), b.tooltip && (t = b.tooltip)
                    }
                    u = x.unique(u), f.push('<td class="' + u.join(" ") + '"' + (t ? ' title="' + t + '"' : "") + ">" + d.getUTCDate() + "</td>"), t = null, d.getUTCDay() === this.o.weekEnd && f.push("</tr>"), d.setUTCDate(d.getUTCDate() + 1)
                }
                this.picker.find(".datepicker-days tbody").empty().append(f.join(""));
                var w = this.picker.find(".datepicker-months").find("th:eq(1)").text(s).end().find("span").removeClass("active");
                if (x.each(this.dates, function(t, e) { e.getUTCFullYear() === s && w.eq(e.getUTCMonth()).addClass("active") }), (s < a || o < s) && w.addClass("disabled"), s === a && w.slice(0, n).addClass("disabled"), s === o && w.slice(r + 1).addClass("disabled"), this.o.beforeShowMonth !== x.noop) {
                    var D = this;
                    x.each(w, function(t, e) { if (!x(e).hasClass("disabled")) { var i = new Date(s, t, 1);!1 === D.o.beforeShowMonth(i) && x(e).addClass("disabled") } })
                }
                f = "", s = 10 * parseInt(s / 10, 10);
                var C = this.picker.find(".datepicker-years").find("th:eq(1)").text(s + "-" + (s + 9)).end().find("td");
                s -= 1;
                for (var T, k = x.map(this.dates, function(t) { return t.getUTCFullYear() }), $ = -1; $ < 11; $++) T = ["year"], -1 === $ ? T.push("old") : 10 === $ && T.push("new"), -1 !== x.inArray(s, k) && T.push("active"), (s < a || o < s) && T.push("disabled"), f += '<span class="' + T.join(" ") + '">' + s + "</span>", s += 1;
                C.html(f)
            }
        },
        updateNavArrows: function() {
            if (this._allow_update) {
                var t = new Date(this.viewDate),
                    e = t.getUTCFullYear(),
                    i = t.getUTCMonth();
                switch (this.viewMode) {
                    case 0:
                        this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() && i <= this.o.startDate.getUTCMonth() ? this.picker.find(".prev").css({ visibility: "hidden" }) : this.picker.find(".prev").css({ visibility: "visible" }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() && i >= this.o.endDate.getUTCMonth() ? this.picker.find(".next").css({ visibility: "hidden" }) : this.picker.find(".next").css({ visibility: "visible" });
                        break;
                    case 1:
                    case 2:
                        this.o.startDate !== -1 / 0 && e <= this.o.startDate.getUTCFullYear() ? this.picker.find(".prev").css({ visibility: "hidden" }) : this.picker.find(".prev").css({ visibility: "visible" }), this.o.endDate !== 1 / 0 && e >= this.o.endDate.getUTCFullYear() ? this.picker.find(".next").css({ visibility: "hidden" }) : this.picker.find(".next").css({ visibility: "visible" })
                }
            }
        },
        click: function(t) {
            t.preventDefault();
            var e, i, s, a = x(t.target).closest("span, td, th");
            if (1 === a.length) switch (a[0].nodeName.toLowerCase()) {
                case "th":
                    switch (a[0].className) {
                        case "datepicker-switch":
                            this.showMode(1);
                            break;
                        case "prev":
                        case "next":
                            var n = E.modes[this.viewMode].navStep * ("prev" === a[0].className ? -1 : 1);
                            switch (this.viewMode) {
                                case 0:
                                    this.viewDate = this.moveMonth(this.viewDate, n), this._trigger("changeMonth", this.viewDate);
                                    break;
                                case 1:
                                case 2:
                                    this.viewDate = this.moveYear(this.viewDate, n), 1 === this.viewMode && this._trigger("changeYear", this.viewDate)
                            }
                            this.fill();
                            break;
                        case "today":
                            var o = new Date;
                            o = _(o.getFullYear(), o.getMonth(), o.getDate(), 0, 0, 0), this.showMode(-2);
                            var r = "linked" === this.o.todayBtn ? null : "view";
                            this._setDate(o, r);
                            break;
                        case "clear":
                            this.clearDates()
                    }
                    break;
                case "span":
                    a.hasClass("disabled") || (this.viewDate.setUTCDate(1), a.hasClass("month") ? (s = 1, i = a.parent().find("span").index(a), e = this.viewDate.getUTCFullYear(), this.viewDate.setUTCMonth(i), this._trigger("changeMonth", this.viewDate), 1 === this.o.minViewMode && this._setDate(_(e, i, s))) : (s = 1, i = 0, e = parseInt(a.text(), 10) || 0, this.viewDate.setUTCFullYear(e), this._trigger("changeYear", this.viewDate), 2 === this.o.minViewMode && this._setDate(_(e, i, s))), this.showMode(-1), this.fill());
                    break;
                case "td":
                    a.hasClass("day") && !a.hasClass("disabled") && (s = parseInt(a.text(), 10) || 1, e = this.viewDate.getUTCFullYear(), i = this.viewDate.getUTCMonth(), a.hasClass("old") ? 0 === i ? (i = 11, e -= 1) : i -= 1 : a.hasClass("new") && (11 === i ? (i = 0, e += 1) : i += 1), this._setDate(_(e, i, s)))
            }
            this.picker.is(":visible") && this._focused_from && x(this._focused_from).focus(), delete this._focused_from
        },
        _toggle_multidate: function(t) {
            var e = this.dates.contains(t);
            if (t || this.dates.clear(), -1 !== e ? (!0 === this.o.multidate || 1 < this.o.multidate || this.o.toggleActive) && this.dates.remove(e) : (!1 === this.o.multidate && this.dates.clear(), this.dates.push(t)), "number" == typeof this.o.multidate)
                for (; this.dates.length > this.o.multidate;) this.dates.remove(0)
        },
        _setDate: function(t, e) {
            var i;
            e && "date" !== e || this._toggle_multidate(t && new Date(t)), e && "view" !== e || (this.viewDate = t && new Date(t)), this.fill(), this.setValue(), e && "view" === e || this._trigger("changeDate"), this.isInput ? i = this.element : this.component && (i = this.element.find("input")), i && i.change(), !this.o.autoclose || e && "date" !== e || this.hide()
        },
        moveMonth: function(t, e) {
            if (!t) return S;
            if (!e) return t;
            var i, s, a = new Date(t.valueOf()),
                n = a.getUTCDate(),
                o = a.getUTCMonth(),
                r = Math.abs(e);
            if (e = 0 < e ? 1 : -1, 1 === r) s = -1 === e ? function() { return a.getUTCMonth() === o } : function() { return a.getUTCMonth() !== i }, i = o + e, a.setUTCMonth(i), (i < 0 || 11 < i) && (i = (i + 12) % 12);
            else {
                for (var h = 0; h < r; h++) a = this.moveMonth(a, e);
                i = a.getUTCMonth(), a.setUTCDate(n), s = function() { return i !== a.getUTCMonth() }
            }
            for (; s();) a.setUTCDate(--n), a.setUTCMonth(i);
            return a
        },
        moveYear: function(t, e) { return this.moveMonth(t, 12 * e) },
        dateWithinRange: function(t) { return t >= this.o.startDate && t <= this.o.endDate },
        keydown: function(t) {
            if (this.picker.is(":visible")) {
                var e, i, s, a, n = !1,
                    o = this.focusDate || this.viewDate;
                switch (t.keyCode) {
                    case 27:
                        this.focusDate ? (this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill()) : this.hide(), t.preventDefault();
                        break;
                    case 37:
                    case 39:
                        if (!this.o.keyboardNavigation) break;
                        e = 37 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || d(), e), s = this.moveYear(o, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || d(), e), s = this.moveMonth(o, e), this._trigger("changeMonth", this.viewDate)) : ((i = new Date(this.dates.get(-1) || d())).setUTCDate(i.getUTCDate() + e), (s = new Date(o)).setUTCDate(o.getUTCDate() + e)), this.dateWithinRange(s) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                        break;
                    case 38:
                    case 40:
                        if (!this.o.keyboardNavigation) break;
                        e = 38 === t.keyCode ? -1 : 1, t.ctrlKey ? (i = this.moveYear(this.dates.get(-1) || d(), e), s = this.moveYear(o, e), this._trigger("changeYear", this.viewDate)) : t.shiftKey ? (i = this.moveMonth(this.dates.get(-1) || d(), e), s = this.moveMonth(o, e), this._trigger("changeMonth", this.viewDate)) : ((i = new Date(this.dates.get(-1) || d())).setUTCDate(i.getUTCDate() + 7 * e), (s = new Date(o)).setUTCDate(o.getUTCDate() + 7 * e)), this.dateWithinRange(s) && (this.focusDate = this.viewDate = s, this.setValue(), this.fill(), t.preventDefault());
                        break;
                    case 32:
                        break;
                    case 13:
                        o = this.focusDate || this.dates.get(-1) || this.viewDate, this.o.keyboardNavigation && (this._toggle_multidate(o), n = !0), this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.setValue(), this.fill(), this.picker.is(":visible") && (t.preventDefault(), "function" == typeof t.stopPropagation ? t.stopPropagation() : t.cancelBubble = !0, this.o.autoclose && this.hide());
                        break;
                    case 9:
                        this.focusDate = null, this.viewDate = this.dates.get(-1) || this.viewDate, this.fill(), this.hide()
                }
                if (n) this.dates.length ? this._trigger("changeDate") : this._trigger("clearDate"), this.isInput ? a = this.element : this.component && (a = this.element.find("input")), a && a.change()
            } else 27 === t.keyCode && this.show()
        },
        showMode: function(t) { t && (this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + t))), this.picker.children("div").hide().filter(".datepicker-" + E.modes[this.viewMode].clsName).css("display", "block"), this.updateNavArrows() }
    };
    var c = function(t, e) { this.element = x(t), this.inputs = x.map(e.inputs, function(t) { return t.jquery ? t[0] : t }), delete e.inputs, a.call(x(this.inputs), e).bind("changeDate", x.proxy(this.dateUpdated, this)), this.pickers = x.map(this.inputs, function(t) { return x(t).data("datepicker") }), this.updateDates() };
    c.prototype = {
        updateDates: function() { this.dates = x.map(this.pickers, function(t) { return t.getUTCDate() }), this.updateRanges() },
        updateRanges: function() {
            var i = x.map(this.dates, function(t) { return t.valueOf() });
            x.each(this.pickers, function(t, e) { e.setRange(i) })
        },
        dateUpdated: function(t) {
            if (!this.updating) {
                this.updating = !0;
                var i = x(t.target).data("datepicker").getUTCDate(),
                    e = x.inArray(t.target, this.inputs),
                    s = e - 1,
                    a = e + 1,
                    n = this.inputs.length;
                if (-1 !== e) {
                    if (x.each(this.pickers, function(t, e) { e.getUTCDate() || e.setUTCDate(i) }), i < this.dates[s])
                        for (; 0 <= s && i < this.dates[s];) this.pickers[s--].setUTCDate(i);
                    else if (i > this.dates[a])
                        for (; a < n && i > this.dates[a];) this.pickers[a++].setUTCDate(i);
                    this.updateDates(), delete this.updating
                }
            }
        },
        remove: function() { x.map(this.pickers, function(t) { t.remove() }), delete this.element.data().datepicker }
    };
    var s = x.fn.datepicker,
        a = function(r) {
            var h, l = Array.apply(null, arguments);
            return l.shift(), this.each(function() {
                var t = x(this),
                    e = t.data("datepicker"),
                    i = "object" == typeof r && r;
                if (!e) {
                    var s = function(t, e) {
                            var i = x(t).data(),
                                s = {},
                                a = new RegExp("^" + e.toLowerCase() + "([A-Z])");

                            function n(t, e) { return e.toLowerCase() }
                            for (var o in e = new RegExp("^" + e.toLowerCase()), i) e.test(o) && (s[o.replace(a, n)] = i[o]);
                            return s
                        }(this, "date"),
                        a = function(t) { var i = {}; if (U[t] || (t = t.split("-")[0], U[t])) { var s = U[t]; return x.each(u, function(t, e) { e in s && (i[e] = s[e]) }), i } }(x.extend({}, p, s, i).language),
                        n = x.extend({}, p, a, s, i);
                    if (t.hasClass("input-daterange") || n.inputs) {
                        var o = { inputs: n.inputs || t.find("input").toArray() };
                        t.data("datepicker", e = new c(this, x.extend(n, o)))
                    } else t.data("datepicker", e = new y(this, n))
                }
                if ("string" == typeof r && "function" == typeof e[r] && (h = e[r].apply(e, l)) !== S) return !1
            }), h !== S ? h : this
        };
    x.fn.datepicker = a;
    var p = x.fn.datepicker.defaults = { autoclose: !1, beforeShowDay: x.noop, beforeShowMonth: x.noop, calendarWeeks: !1, clearBtn: !1, toggleActive: !1, daysOfWeekDisabled: [], datesDisabled: [], endDate: 1 / 0, forceParse: !0, format: "mm/dd/yyyy", keyboardNavigation: !0, language: "en", minViewMode: 0, multidate: !1, multidateSeparator: ",", orientation: "auto", rtl: !1, startDate: -1 / 0, startView: 0, todayBtn: !1, todayHighlight: !1, weekStart: 0, disableTouchKeyboard: !1, container: "body" },
        u = x.fn.datepicker.locale_opts = ["format", "rtl", "weekStart"];
    x.fn.datepicker.Constructor = y;
    var U = x.fn.datepicker.dates = { en: { days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"], months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], today: "Today", clear: "Clear" } },
        E = {
            modes: [{ clsName: "days", navFnc: "Month", navStep: 1 }, { clsName: "months", navFnc: "FullYear", navStep: 1 }, { clsName: "years", navFnc: "FullYear", navStep: 10 }],
            isLeapYear: function(t) { return t % 4 == 0 && t % 100 != 0 || t % 400 == 0 },
            getDaysInMonth: function(t, e) { return [31, E.isLeapYear(t) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e] },
            validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
            nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
            parseFormat: function(t) {
                var e = t.replace(this.validParts, "\0").split("\0"),
                    i = t.match(this.validParts);
                if (!e || !e.length || !i || 0 === i.length) throw new Error("Invalid date format.");
                return { separators: e, parts: i }
            },
            parseDate: function(t, e, i) {
                if (!t) return S;
                if (t instanceof Date) return t;
                "string" == typeof e && (e = E.parseFormat(e));
                var s, a, n, o = /([\-+]\d+)([dmwy])/,
                    r = t.match(/([\-+]\d+)([dmwy])/g);
                if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(t)) {
                    for (t = new Date, n = 0; n < r.length; n++) switch (s = o.exec(r[n]), a = parseInt(s[1]), s[2]) {
                        case "d":
                            t.setUTCDate(t.getUTCDate() + a);
                            break;
                        case "m":
                            t = y.prototype.moveMonth.call(y.prototype, t, a);
                            break;
                        case "w":
                            t.setUTCDate(t.getUTCDate() + 7 * a);
                            break;
                        case "y":
                            t = y.prototype.moveYear.call(y.prototype, t, a)
                    }
                    return _(t.getUTCFullYear(), t.getUTCMonth(), t.getUTCDate(), 0, 0, 0)
                }
                r = t && t.match(this.nonpunctuation) || [], t = new Date;
                var h, l, d = {},
                    c = ["yyyy", "yy", "M", "MM", "m", "mm", "d", "dd"],
                    p = { yyyy: function(t, e) { return t.setUTCFullYear(e) }, yy: function(t, e) { return t.setUTCFullYear(2e3 + e) }, m: function(t, e) { if (isNaN(t)) return t; for (e -= 1; e < 0;) e += 12; for (e %= 12, t.setUTCMonth(e); t.getUTCMonth() !== e;) t.setUTCDate(t.getUTCDate() - 1); return t }, d: function(t, e) { return t.setUTCDate(e) } };
                p.M = p.MM = p.mm = p.m, p.dd = p.d, t = _(t.getFullYear(), t.getMonth(), t.getDate(), 0, 0, 0);
                var u = e.parts.slice();

                function f() {
                    var t = this.slice(0, r[n].length),
                        e = r[n].slice(0, t.length);
                    return t.toLowerCase() === e.toLowerCase()
                }
                if (r.length !== u.length && (u = x(u).filter(function(t, e) { return -1 !== x.inArray(e, c) }).toArray()), r.length === u.length) {
                    var g, v, m;
                    for (n = 0, g = u.length; n < g; n++) {
                        if (h = parseInt(r[n], 10), s = u[n], isNaN(h)) switch (s) {
                            case "MM":
                                l = x(U[i].months).filter(f), h = x.inArray(l[0], U[i].months) + 1;
                                break;
                            case "M":
                                l = x(U[i].monthsShort).filter(f), h = x.inArray(l[0], U[i].monthsShort) + 1
                        }
                        d[s] = h
                    }
                    for (n = 0; n < c.length; n++)(m = c[n]) in d && !isNaN(d[m]) && (v = new Date(t), p[m](v, d[m]), isNaN(v) || (t = v))
                }
                return t
            },
            formatDate: function(t, e, i) {
                if (!t) return "";
                "string" == typeof e && (e = E.parseFormat(e));
                var s = { d: t.getUTCDate(), D: U[i].daysShort[t.getUTCDay()], DD: U[i].days[t.getUTCDay()], m: t.getUTCMonth() + 1, M: U[i].monthsShort[t.getUTCMonth()], MM: U[i].months[t.getUTCMonth()], yy: t.getUTCFullYear().toString().substring(2), yyyy: t.getUTCFullYear() };
                s.dd = (s.d < 10 ? "0" : "") + s.d, s.mm = (s.m < 10 ? "0" : "") + s.m, t = [];
                for (var a = x.extend([], e.separators), n = 0, o = e.parts.length; n <= o; n++) a.length && t.push(a.shift()), t.push(s[e.parts[n]]);
                return t.join("")
            },
            headTemplate: '<thead><tr><th class="prev">&#171;</th><th colspan="5" class="datepicker-switch"></th><th class="next">&#187;</th></tr></thead>',
            contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
            footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
        };
    E.template = '<div class="datepicker"><div class="datepicker-days"><table class=" table-condensed">' + E.headTemplate + "<tbody></tbody>" + E.footTemplate + '</table></div><div class="datepicker-months"><table class="table-condensed">' + E.headTemplate + E.contTemplate + E.footTemplate + '</table></div><div class="datepicker-years"><table class="table-condensed">' + E.headTemplate + E.contTemplate + E.footTemplate + "</table></div></div>", x.fn.datepicker.DPGlobal = E, x.fn.datepicker.noConflict = function() { return x.fn.datepicker = s, this }, x(document).on("focus.datepicker.data-api click.datepicker.data-api", '[data-provide="datepicker"]', function(t) {
        var e = x(this);
        e.data("datepicker") || (t.preventDefault(), a.call(e, "show"))
    }), x(function() { a.call(x('[data-provide="datepicker-inline"]')) })
}(window.jQuery), $(function() {
    var Charts = {
        _HYPHY_REGEX: /-([a-z])/g,
        _cleanAttr: function(t) { delete t.chart, delete t.value, delete t.labels },
        doughnut: function(element) {
            var attrData = $.extend({}, $(element).data()),
                data = eval(attrData.value);
            Charts._cleanAttr(attrData);
            var options = $.extend({ responsive: !0, animation: !1, segmentStrokeColor: "#fff", segmentStrokeWidth: 2, percentageInnerCutout: 80 }, attrData);
            new Chart(element.getContext("2d")).Doughnut(data, options)
        },
        bar: function(element) {
            var attrData = $.extend({}, $(element).data()),
                data = { labels: eval(attrData.labels), datasets: eval(attrData.value).map(function(t, e) { return $.extend({ fillColor: e % 2 ? "#42a5f5" : "#1bc98e", strokeColor: "transparent" }, t) }) };
            Charts._cleanAttr(attrData);
            var options = $.extend({ responsive: !0, animation: !1, scaleShowVerticalLines: !1, scaleOverride: !0, scaleSteps: 4, scaleStepWidth: 25, scaleStartValue: 0, barValueSpacing: 10, scaleFontColor: "rgba(0,0,0,.4)", scaleFontSize: 14, scaleLineColor: "rgba(0,0,0,.05)", scaleGridLineColor: "rgba(0,0,0,.05)", barDatasetSpacing: 2 }, attrData);
            new Chart(element.getContext("2d")).Bar(data, options)
        },
        line: function(element) {
            var attrData = $.extend({}, $(element).data()),
                data = { labels: eval(attrData.labels), datasets: eval(attrData.value).map(function(t) { return $.extend({ fillColor: "rgba(66, 165, 245, .2)", strokeColor: "#42a5f5", pointStrokeColor: "#fff" }, t) }) };
            Charts._cleanAttr(attrData);
            var options = $.extend({ animation: !1, responsive: !0, bezierCurve: !0, bezierCurveTension: .25, scaleShowVerticalLines: !1, pointDot: !1, tooltipTemplate: "<%= value %>", scaleOverride: !0, scaleSteps: 3, scaleStepWidth: 1e3, scaleStartValue: 2e3, scaleLineColor: "rgba(0,0,0,.05)", scaleGridLineColor: "rgba(0,0,0,.05)", scaleFontColor: "rgba(0,0,0,.4)", scaleFontSize: 14, scaleLabel: function(t) { return t.value.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,") } }, attrData);
            new Chart(element.getContext("2d")).Line(data, options)
        },
        "spark-line": function(element) {
            var attrData = $.extend({}, $(element).data()),
                data = { labels: eval(attrData.labels), datasets: eval(attrData.value).map(function(t) { return $.extend({ fillColor: "rgba(255,255,255,.3)", strokeColor: "#fff", pointStrokeColor: "#fff" }, t) }) };
            Charts._cleanAttr(attrData);
            var options = $.extend({ animation: !1, responsive: !0, bezierCurve: !0, bezierCurveTension: .25, showScale: !1, pointDotRadius: 0, pointDotStrokeWidth: 0, pointDot: !1, showTooltips: !1 }, attrData);
            new Chart(element.getContext("2d")).Line(data, options)
        }
    };
    $(document).on("redraw.bs.charts", function() { $("[data-chart]").each(function() { $(this).is(":visible") && Charts[$(this).attr("data-chart")](this) }) }).trigger("redraw.bs.charts")
});