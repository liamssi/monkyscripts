var fbtool = (function (exports) {
    'use strict';

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

    var css_248z = "#fb-scrapper{position:fixed;display:flex;justify-content:space-around;align-items:center;flex-direction:column;bottom:100px;right:5px;z-index:1000;width:200px;height:150px;background-color:#fff;border-radius:10%;box-shadow:0 4px 8px 0 rgba(0,0,0,.2);transform:scale(.9)}#fb-scrapper:hover{box-shadow:0 8px 16px 0 rgba(0,0,0,.2)}#fb-scrapper h1{font-size:medium}#fb-scrapper-start-btn{display:block;width:0;height:0;border-top:15px solid transparent;border-bottom:15px solid transparent;border-left:22px solid #02475e;position:relative;z-index:1;transition:all .3s;left:(25px*0.2)}#fb-scrapper-start-btn:before{content:\"\";position:absolute;top:-25px;left:-40px;bottom:-25px;right:-12px;border-radius:50%;border:4px solid #02475e;z-index:2;transition:all .3s}#fb-scrapper-start-btn:after{content:\"\";opacity:0;transition:opacity .6s}#fb-scrapper-start-btn:focus:before,#fb-scrapper-start-btn:hover:before{transform:scale(1.1);-webkit-transform:scale(1.1);-moz-transform:scale(1.1)}#fb-scrapper-start-btn.active{border-color:transparent}#fb-scrapper-start-btn.active:after{content:\"\";opacity:1;width:16px;height:26px;background:#02475e;position:absolute;right:1px;top:-13px;border-left:7px solid #02475e;box-shadow:inset 8px 0 0 0 #fff}";
    styleInject(css_248z);

    class graphqlClient {
        constructor() {
            this.getPagePosts = () => {
            };
            //   private client: AxiosInstance
            /*  constructor() {
          
              }*/
        }
        get(data) {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", "/graphql");
            xhr.send(data);
            return xhr;
        }
        post(data) {
            let xhr = new XMLHttpRequest();
            xhr.open("POST", "/graphql");
            xhr.send(data);
            return xhr;
        }
    }

    let intercept = () => __awaiter(void 0, void 0, void 0, function* () {
        // let interceptor = new XMLHttpInterceptor({ urlMatch: "/graphql", })
        // console.log("intercepting ....");
        // let unpatch: any = interceptor.patch((request) => {
        //     console.log("patched ++****++>", request?.headers);
        // })
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            //      interceptor.unpatch()
            let cl = new graphqlClient();
            let r = yield cl.get('********* data ********');
            console.log("axios ---------->", r);
        }), 5000);
    });

    exports.intercept = intercept;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
