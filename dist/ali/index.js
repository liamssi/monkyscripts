var alitools = (function (exports) {
    'use strict';

    const initUI = (btnCallback) => {
        console.log("buiolding the ui ...");
        let uiId = "ali-coupont-tester";
        let ui = document.getElementById(uiId);
        if (!ui) {
            //main ui
            ui = document.createElement("div");
            ui.id = uiId;
            document.body.appendChild(ui);
            //title
            let title = document.createElement("h1");
            title.classList.add("title");
            title.innerHTML = "AliCoupons tester v1.0";
            ui.appendChild(title);
            //coupons inpute 
            let couponsIpute = document.createElement("textarea");
            ui.appendChild(couponsIpute);
            //run button
            let runBtn = document.createElement("button");
            // runBtn.id = runBtnId;
            runBtn.textContent = "run";
            runBtn.addEventListener("click", () => {
                runBtn.classList.toggle("active");
                btnCallback(couponsIpute.value);
            });
            runBtn.type = "submit";
            ui.appendChild(runBtn);
            //stats
            //  let stats = document.createElement("h1");
            // stats.classList.add("title");
            // stats.innerHTML = "SCRAPED:" + db.length;
            // ui.appendChild(stats);
            //save btn
            let saveBtn = document.createElement("a");
            saveBtn.classList.add("title");
            saveBtn.innerHTML = "SAVE";
            ui.appendChild(saveBtn);
        }
    };

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    class XMLHttpInterceptor {
        constructor(rule) {
            this.patched = false;
            //* 
            this.XMLHttpRequestOpen = XMLHttpRequest.prototype.open;
            this.XMLHttpRequestSend = XMLHttpRequest.prototype.send;
            this.XMLHttpRequestsetRequestHeader = XMLHttpRequest.prototype.setRequestHeader;
            this.rule = rule;
        }
        //triggers event when a match found
        triggerNextMatch(req) {
            //        addEventListener("match", function(e) { console.log("********************event event ************") });
            let matchEvent = new CustomEvent("match", {
                detail: req
            });
            dispatchEvent(matchEvent);
        }
        get getPatched() {
            return this.patched;
        }
        get getsRule() {
            return this.rule;
        }
        set setRule(rule) {
            this.rule = rule;
        }
        // return a promise that resolves when the first match request found 
        patch(matchCallback = () => { }) {
            if (this.patched) {
                return;
            }
            let targetUrlMatch = this.rule.urlMatch;
            let bodyMatch = this.rule.bodyMatch || '';
            let XMLHttpRequestOpen = this.XMLHttpRequestOpen;
            let XMLHttpRequestSend = this.XMLHttpRequestSend;
            let XMLHttpRequestsetRequestHeader = this.XMLHttpRequestsetRequestHeader;
            //trigers the nextmatch event
            let triggerNext = this.triggerNextMatch;
            //* patch the open method to Capture 
            XMLHttpRequest.prototype.open = function (method, url, async) {
                this.url = url;
                XMLHttpRequestOpen.call(this, method, url, async ? async : true);
            };
            //*patch setHeaders to capture Headers
            XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
                var _a;
                XMLHttpRequestsetRequestHeader.call(this, header, value);
                // Create a list for the header that if it does not exist
                if ((_a = this.url) === null || _a === void 0 ? void 0 : _a.match(targetUrlMatch)) {
                    if (!this.headers) {
                        this.headers = {};
                    }
                    //!tst 
                    // if (!this.headers[header]) {
                    //     this.headers[header] = [];
                    // }
                    // Add the value to the header
                    //! this.headers[header].push(value);
                    this.headers[header] = value;
                }
            };
            //* patch send to 
            XMLHttpRequest.prototype.send = function (body) {
                var _a;
                if (((_a = this.url) === null || _a === void 0 ? void 0 : _a.match(targetUrlMatch)) && (body === null || body === void 0 ? void 0 : body.toString().match(bodyMatch))) {
                    //save the body
                    this.body = body;
                    matchCallback(this);
                    triggerNext(this);
                    // this.addEventListener(
                    //     "readystatechange", () => {
                    //         if (this.readyState == 4) {
                    //             matchCallback(this)
                    //             triggerNext(this)
                    //         }
                    //     },
                    //     false
                    // );
                }
                XMLHttpRequestSend.call(this, body);
            };
            this.patched = true;
        }
        //* unpatch function 
        unpatch() {
            if (!this.patched)
                return;
            XMLHttpRequest.prototype.open = this.XMLHttpRequestOpen;
            XMLHttpRequest.prototype.send = this.XMLHttpRequestSend;
            XMLHttpRequest.prototype.setRequestHeader = this.XMLHttpRequestsetRequestHeader;
            this.patched = false;
        }
    }

    const testCoupons = (coupons) => __awaiter(void 0, void 0, void 0, function* () {
        for (let coupon of coupons) {
            // console.log("testing coupon ::", coupon)
            yield testCoupon(coupon);
            //console.log("testing next")
        }
    });
    let testCoupon = (coupon) => {
        return new Promise((resolve, reject) => {
            // @ts-ignore: Unreachable code error
            const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            const couponInput = document.getElementById("code");
            const couponSubmit = (document.querySelector("[ae_button_type='coupon_code'][type='button']"));
            let applyCoupon = () => {
                // @ts-ignore: Unreachable code error
                nativeInputValueSetter.call(couponInput, coupon);
                const inputEvent = new Event("input", { bubbles: true });
                couponInput.dispatchEvent(inputEvent);
                couponSubmit.click();
            };
            let interceptResult = () => {
                let interceptor = new XMLHttpInterceptor({
                    urlMatch: "/orders/coupons.do",
                });
                interceptor.patch((request) => {
                    request.addEventListener("readystatechange", (ev) => {
                        if (request.readyState == 4) {
                            interceptor.unpatch();
                            //console.log("found a coupon request ::: ", request.response)
                            parseCouponTestResult(coupon, request.response);
                            setTimeout((result) => resolve(result), 500);
                            // resolve()
                        }
                    }, false);
                });
            };
            //REMOVE COUPON IF EXIST
            if (couponSubmit.textContent != "Apply") {
                // alert("removing")
                couponSubmit.click();
                let interceptor = new XMLHttpInterceptor({
                    urlMatch: "/orders/coupons.do",
                });
                interceptor.patch((request) => {
                    request.addEventListener("readystatechange", (ev) => {
                        if (request.readyState == 4) {
                            interceptor.unpatch();
                            interceptResult();
                            applyCoupon();
                        }
                    }, false);
                });
            }
            else {
                if (couponInput) {
                    interceptResult();
                    applyCoupon();
                }
            }
        });
    };
    let parseCouponTestResult = (coupon, responce) => {
        console.log("coupon :::", coupon);
        let couponCode = responce.price.couponCode;
        //console.log(`parsing test result for ${coupon} :: `, responce);
        //if (responce.price) console.log("price object ::", responce.price);
        let res;
        try {
            res = {
                coupon: couponCode.platformCouponCode,
                msg: couponCode.couponCodeWarnMsg,
                amount: couponCode.couponCodeAmount.formatted,
            };
            console.log("parse res :::", res);
        }
        catch (_a) {
            res = {
                coupon: coupon,
                msg: couponCode.couponCodeWarnMsg,
                //amount: couponCode.couponCodeAmount.formatted
            };
        }
        // console.log("parse res :::", res);
        return res;
    };

    function styleInject(css, ref) {
      if ( ref === void 0 ) ref = {};
      var insertAt = ref.insertAt;

      if (!css || typeof document === 'undefined') { return; }

      var head = document.head || document.getElementsByTagName('head')[0];
      var style = document.createElement('style');
      style.type = 'text/css';

      if (insertAt === 'top') {
        if (head.firstChild) {
          head.insertBefore(style, head.firstChild);
        } else {
          head.appendChild(style);
        }
      } else {
        head.appendChild(style);
      }

      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document.createTextNode(css));
      }
    }

    var css_248z = "#ali-coupont-tester{position:fixed;display:flex;justify-content:space-around;align-items:center;flex-direction:column;bottom:100px;right:5px;z-index:1000;width:300px;height:300px;background-color:#fff;border-radius:10%;box-shadow:0 4px 8px 0 rgba(0,0,0,.2);transform:scale(.9)}#ali-coupont-tester:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}#ali-coupont-tester button,#ali-coupont-tester h1{font-size:medium}#ali-coupont-tester button{padding:3px}#ali-coupont-tester #ali-coupont-tester-submit-btn{display:block;width:0;height:0;border-top:15px solid transparent;border-bottom:15px solid transparent;border-left:22px solid #02475e;position:relative;z-index:1;transition:all .3s;left:(25px * .2)}#ali-coupont-tester #ali-coupont-tester-submit-btn:before{content:\"\";position:absolute;top:-25px;left:-40px;bottom:-25px;right:-12px;border-radius:50%;border:4px solid #02475e;z-index:2;transition:all .3s}#ali-coupont-tester #ali-coupont-tester-submit-btn:after{content:\"\";opacity:0;transition:opacity .6s}#ali-coupont-tester #ali-coupont-tester-submit-btn:focus:before,#ali-coupont-tester #ali-coupont-tester-submit-btn:hover:before{transform:scale(1.1);-webkit-transform:scale(1.1);-moz-transform:scale(1.1)}#ali-coupont-tester #ali-coupont-tester-submit-btn.active{border-color:transparent}#ali-coupont-tester #ali-coupont-tester-submit-btn.active:after{content:\"\";opacity:1;width:16px;height:26px;background:#02475e;position:absolute;right:1px;top:-13px;border-left:7px solid #02475e;box-shadow:inset 8px 0 0 0 #fff}";
    styleInject(css_248z);

    //M40SEJULY
    let init = () => {
        initUI((text) => {
            let lines = text.split('\n');
            for (let i = 0; i < lines.length; i++) {
                lines[i] = lines[i].replace(/\s/g, '');
                // console.log(lines[i])
                //code here using lines[i] which will give you each line
            }
            testCoupons(lines);
        });
        // let interceptor = new XMLHttpInterceptor({ urlMatch: "/orders/coupons.do", })
        // //console.log("patching xhr requests");
        // interceptor.patch((request) => {
        //     request.addEventListener(
        //         "readystatechange", (ev) => {
        //             if (request.readyState == 4) {
        //                 console.clear()
        //                 interceptor.unpatch()
        //                 console.log("found a coupon request ::: ", request.response)
        //                 //  repeat(request)
        //                 // for (let i = 0; i < 10; i++) {
        //                 //     try {
        //                 //         request.open("post", request.url || "")
        //                 //         request.send(request.body)
        //                 //         console.log("request sent")
        //                 //     } catch (error) {
        //                 //         console.log("repinting request failled", error);
        //                 //     }
        //                 // }
        //             }
        //         },
        //         false
        //     );
        // })
        console.log("exported init function ");
    };
    // let repeat = (request: XMLHttpRequest) => {
    //     console.log("repeating request (body)::", request.body)
    //     let headers = request?.headers
    //     let url = request.url || ""
    //     let body = request.body
    //     let xhr = new XMLHttpRequest();
    //     // if (request.body) {
    //     //   body = changeCursor(this.httpRequestConfig?.body.toString(), this.cursor || '')
    //     // }
    //     xhr.open("POST", url);
    //     for (let header in headers) {
    //         xhr.setRequestHeader(header, headers[header]);
    //         //   //console.log(`header :: ${header} __ value ::${headers[header]}`);
    //     }
    //     // //set load event
    //     xhr.onload = function () {
    //         if (xhr.status === 200) {
    //             //     //nextCursor = parse(this.responseText);
    //             let response = xhr.response
    //             // console.log("request repeate responce ::", response)
    //             //     //!parse and save 
    //             //     //! set next cursor
    //             //     //! fetch next?
    //             //     //console.log("db", db);
    //             //     // if (nextCursor && running) {
    //             //     // body = changeCursor(body, nextCursor);
    //             //     // spider(url, headers, body);
    //             //     // }
    //             //     //ready for next
    //         } else {
    //             console.log("reply errored");
    //         }
    //     };
    //     xhr.send(body)
    // }

    exports.init = init;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
