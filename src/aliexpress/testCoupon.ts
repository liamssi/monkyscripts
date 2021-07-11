import { XMLHttpInterceptor } from '../shared/XMLHttpInterceptor';
import Queue from "queue"




export const testCoupons = (coupons: string[]) => {


    let q = new Queue()
    let interceptor = new XMLHttpInterceptor({ urlMatch: "/orders/coupons.do", })
    //console.log("patching xhr requests");
    document.addEventListener("coupontest", (ev: any) => {


        console.log(
            "[-]coupon tested (event)", ev.detail
        );

    })
    interceptor.patch((request) => {

        request.addEventListener(
            "readystatechange", (ev) => {
                if (request.readyState == 4) {

                    //console.clear()
                    // interceptor.unpatch()
                    console.log("found a coupon request ::: ", request.response)

                    const couponEvent = new CustomEvent('coupontest', { detail: request.response });
                    document.dispatchEvent(couponEvent);


                }

            },

            false
        );


    })
    // console.log("exported init function ");
    coupons.forEach((coupon) => {

        console.log("testing coupon ::", coupon)

        q.push(function (cb) {
            const result = 'two'
            cb(null, result)
        })

        //find the coupon text input ant type coupon 
    })


    t(coupons[0])
}
let l = (coupon: string) => {
    console.log(" lo-----------ging>", coupon)
    // @ts-ignore: Unreachable code error
    this.next()

}
let t = (coupon: string) => {

    // @ts-ignore: Unreachable code error
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
    const couponInput = <HTMLInputElement>document.getElementById("code");
    const couponSubmit = <HTMLInputElement>document.querySelector("[ae_button_type='coupon_code'][type='button']")

    if (couponInput) {

        // @ts-ignore: Unreachable code error
        nativeInputValueSetter.call(couponInput, coupon);

        const inputEvent = new Event('input', { bubbles: true });
        couponInput.dispatchEvent(inputEvent);
        couponSubmit.click()
        //     //couponInput.focus()
        //     let e1 = new Event('input', {
        //         bubbles: true,
        //         cancelable: true,
        //     });

        //     // let e2 = new Event('keyup', {
        //     //     bubbles: true,
        //     //     cancelable: true,
        //     // });
        //     couponInput.click()
        //     couponInput.focus()
        //     //couponInput.value = coupon
        //     couponInput.dispatchEvent(new Event('keydown'));
        //     couponInput.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }));
        //     couponInput.dispatchEvent(new Event('input'));
        //     couponInput.dispatchEvent(new Event('change'));
        //     couponInput.dispatchEvent(new Event('keyup'));

        //     couponInput.blur()
        //     //couponInput.dispatchEvent(new Event('blur'));
        //     // couponInput.dispatchEvent(new Event('focus'));
        //     // couponInput.dispatchEvent(new KeyboardEvent('keypress', { 'key': 'a' }));
        //     //couponInput.dispatchEvent(e1);
        //     // couponInput.dispatchEvent(e2);
    }
    // couponInput.click()




}



