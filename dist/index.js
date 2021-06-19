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
                    this.addEventListener("readystatechange", () => {
                        if (this.readyState == 4) {
                            matchCallback(this);
                            triggerNext(this);
                        }
                    }, false);
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

    class fbPagePostExtractor {
        constructor() {
            this.interceptor = new XMLHttpInterceptor({
                urlMatch: "/graphql",
                bodyMatch: "CometModernPageFeedPaginationQuery"
            });
        }
        start() {
            if (!this.httpRequestConfig) {
                this.interceptor.patch((req) => {
                    console.log("found page feed request ...", req);
                    this.interceptor.unpatch();
                    //this.repeater(req,3)
                    //this.fetchPosts(req)
                    this.httpRequestConfig = {
                        url: req.url || '',
                        headers: req.headers,
                        body: req.body
                    };
                    this.fetchPosts();
                    // this.parsePosts(req.responseText||"")
                });
            }
        }
        parsePosts(res) {
            let jres = JSON.parse(res);
            //  let r= getReference(jres,"text")
            let posts = jres.data.node.timeline_feed_units.edges;
            //    console.log("parsing posts ::",posts[0]);
            //  console.log('r ---->',r);
            //! page info 
            //* data.page_info  .has_next_page
            //* data.page_info  .end_cursor
            for (let p in posts) {
                let post = posts[p].node;
                if (post.__typename == "Story") {
                    //console.log("it's a story");
                    let content = post.comet_sections.content.story.comet_sections.message.story.message.text;
                    let metadata = post.comet_sections.context_layout.story.comet_sections.metadata[0].story;
                    let creationTime = metadata.creation_time;
                    let postUrl = metadata.url;
                    console.log("-------------new post ----------");
                    console.log("post content ::: ", content);
                    console.log("post date    ::: ", new Date(creationTime *
                        1000));
                    console.log("post link    ::: ", postUrl);
                }
            }
            // console.log("parsing posts ::",posts[0]);
            //*data = JRES.data.node.timeline_feed_units.
            //*next
        }
        fetchPosts(cursor = this.cursor, count) {
            var _a, _b, _c, _d;
            let headers = (_a = this.httpRequestConfig) === null || _a === void 0 ? void 0 : _a.headers;
            let url = ((_b = this.httpRequestConfig) === null || _b === void 0 ? void 0 : _b.url) || "/graphql";
            let body = "";
            let xhr = new XMLHttpRequest();
            if ((_c = this.httpRequestConfig) === null || _c === void 0 ? void 0 : _c.body) {
                body = changeCursor((_d = this.httpRequestConfig) === null || _d === void 0 ? void 0 : _d.body.toString(), this.cursor || '');
            }
            for (let header in headers) {
                xhr.setRequestHeader(header, headers[header]);
                //console.log(`header :: ${header} __ value ::${headers[header]}`);
            }
            //set load event
            xhr.onload = function () {
                if (xhr.status === 200) {
                    //nextCursor = parse(this.responseText);
                    this.responseText;
                    //!parse and save 
                    //! set next cursor
                    //! fetch next?
                    //console.log("db", db);
                    // if (nextCursor && running) {
                    // body = changeCursor(body, nextCursor);
                    // spider(url, headers, body);
                    // }
                    //ready for next
                }
                else {
                    console.log("reply errored");
                }
            };
            xhr.open("POST", url);
            xhr.send(body);
            //!replace/set cursor 
        }
        repeater(req, count = 3) {
            console.log('repeating ....');
            let i = 0;
            while (i < count) {
                req.open("Post", req.url || '');
                let res = req.send();
                console.log('repeaated ::: ', res);
                i++;
            }
        }
    }
    let changeCursor = (body, cursor) => {
        console.log("changing cursor to  ::", cursor);
        let params = new URLSearchParams(body);
        let variables = params.get("variables");
        if (variables) {
            let jvariables = JSON.parse(variables);
            jvariables.cursor = cursor;
            variables = JSON.stringify(jvariables);
            params.set("variables", variables);
            body = params.toString();
            // console.log("body after ::", body);
            // console.log("cursor being chjanged", variables.cursor);
        }
        return body;
    };

    let intercept = () => __awaiter(void 0, void 0, void 0, function* () {
        //  let interceptor = new XMLHttpInterceptor({ urlMatch: "/graphql", })
        // addEventListener("match", function(e) { 
        //     console.log("* match ->",(<any>e).detail)
        //     let req=(<any>e).detail
        //     console.log(
        //         "found a valid event, unpatching ..."
        //     );
        //     interceptor.unpatch()
        //     console.clear()
        //     console.log("--------------------- request -----------------");
        //     console.log(req.headers);
        //     console.log("--------------------- request -----------------");
        //     let xhr = new XMLHttpRequest();
        //     xhr.open("POST", "/graphql55");
        //     xhr.send("just so you know me ")
        //     console.log("--------------------- sent test request -----------------"); 
        // });
        //  console.log("intercepting ....");
        // let unpatch: any = interceptor.patch()
        let f = new fbPagePostExtractor();
        f.start();
        // setTimeout(async () => {
        //     //      interceptor.unpatch()
        //     let cl = new graphqlClient()
        //     let r = await cl.get('********* data ********')
        //     console.log("axios ---------->", r);
        // }, 5000);
    });

    exports.intercept = intercept;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
