import { XMLHttpInterceptor } from '../shared/XMLHttpInterceptor';
import { initUI } from './ui'
import { testCoupons } from './testCoupon';

import "./style.css"
//M40SEJULY
export let init = () => {



    initUI((text) => {

        let lines = text.split('\n');
        for (let i = 0; i < lines.length; i++) {
            lines[i] = lines[i].replace(/\s/g, '')
            // console.log(lines[i])
            //code here using lines[i] which will give you each line
        }

        testCoupons(lines)

    })
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

}


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