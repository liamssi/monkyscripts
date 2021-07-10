(function () {
  'use strict';

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

  // import { ui } from './ui/ui';
  // import { XMLHttpInterceptor } from '../shared/XMLHttpInterceptor';
  // import { fbPagePostExtractor } from './utils/fbTools';
  // export let intercept = async () => {
  //   //  let interceptor = new XMLHttpInterceptor({ urlMatch: "/graphql", })
  //   // addEventListener("match", function(e) { 
  //   //     console.log("* match ->",(<any>e).detail)
  //   //     let req=(<any>e).detail
  //   //     console.log(
  //   //         "found a valid event, unpatching ..."
  //   //     );
  //   //     interceptor.unpatch()
  //   //     console.clear()
  //   //     console.log("--------------------- request -----------------");
  //   //     console.log(req.headers);
  //   //     console.log("--------------------- request -----------------");
  //   //     let xhr = new XMLHttpRequest();
  //   //     xhr.open("POST", "/graphql55");
  //   //     xhr.send("just so you know me ")
  //   //     console.log("--------------------- sent test request -----------------"); 
  //   // });
  //   //  console.log("intercepting ....");
  //   // let unpatch: any = interceptor.patch()
  //   let f = new fbPagePostExtractor()
  //   f.start()
  //   // setTimeout(async () => {
  //   //     //      interceptor.unpatch()
  //   //     let cl = new graphqlClient()
  //   //     let r = await cl.get('********* data ********')
  //   //     console.log("axios ---------->", r);
  //   // }, 5000);
  // }
  console.log("lal la");

}());
