!(function (e) {
  var t = {};
  function n(o) {
    if (t[o]) return t[o].exports;
    var r = (t[o] = { i: o, l: !1, exports: {} });
    return e[o].call(r.exports, r, r.exports, n), (r.l = !0), r.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function (e, t, o) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: o });
    }),
    (n.r = function (e) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(e, "__esModule", { value: !0 });
    }),
    (n.t = function (e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && "object" == typeof e && e && e.__esModule) return e;
      var o = Object.create(null);
      if (
        (n.r(o),
          Object.defineProperty(o, "default", { enumerable: !0, value: e }),
          2 & t && "string" != typeof e)
      )
        for (var r in e)
          n.d(
            o,
            r,
            function (t) {
              return e[t];
            }.bind(null, r)
          );
      return o;
    }),
    (n.n = function (e) {
      var t =
        e && e.__esModule
          ? function () {
            return e.default;
          }
          : function () {
            return e;
          };
      return n.d(t, "a", t), t;
    }),
    (n.o = function (e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ""),
    n((n.s = 1342));
})({
  1342: function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 });
    var o,
      r = n(1343),
      a = (o = r) && o.__esModule ? o : { default: o };
    var i = [
      "1",
      "2",
      "143839615565492452",
      "7360555217192209452",
      "7352899832704027180",
    ];
    function u() {
      var e = window.location.href,
        t = !(
          !document.querySelector('[name="shopify-checkout-api-token"]') &&
          !document.querySelector(
            '[name="shopify-checkout-authorization-token"]'
          )
        ),
        n = "shop.app" === window.location.hostname;
      n &&
        (e = JSON.parse(
          document.querySelector('meta[name="shop"]').content
        ).url),
        a.default.detectStore(e, t, n).then(function (e) {
          var t,
            n = e && e.id,
            o = !!n,
            r = i.includes(n),
            a = e && e.adblockState && e.adblockState.mayNeedWhitelist,
            u = e && e.metadata && e.metadata.tagInSameTab;
          o &&
            !r &&
            !u &&
            a &&
            (((t = document.createElement("a")).className =
              "hss-abp-subscribe"),
              (t.href =
                "abp:subscribe?location=https://www.joinhoney.com/whitelist/honey-smart-shopping.txt&title=Honey-Smart-Shopping"),
              (t.style.position = "fixed"),
              (t.style.display = "block"),
              t.style.left,
              (t.style.opacity = 0),
              (t.style.zIndex = 2147483647),
              document.body.appendChild(t));
        });
    }
    u(), (t.default = { detectStore: u });
  },
  1343: function (e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", { value: !0 }),
      (t.default = {
        detectStore: function (e, t, n) {
          var o = {
            service: "messages:cs",
            type: "page:detect_store",
            content: JSON.stringify({ url: e, isShopify: t, isShopifyPay: n }),
            dest: { allTabs: !1, background: !0, ignoreResponse: !1 },
          };
          return new Promise(function (e) {
            chrome.runtime.sendMessage(o, null, function (t) {
              chrome.runtime.lastError ? e() : t.success ? e(t.data) : e();
            });
          });
        },
      });
  },
});
