import { XMLHttpInterceptor } from "../shared/XMLHttpInterceptor";
export const testCoupons = async (coupons: string[]) => {
    let res: Record<string, any> = {};

    for (let coupon of coupons) {
        // console.log("testing coupon ::", coupon)
        let r = await testCoupon(coupon);
        res.coupn = r;
        //console.log("testing next")
    }
};

let testCoupon = (coupon: string) => {
    return new Promise<void>((resolve, reject) => {
        // @ts-ignore: Unreachable code error
        const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
        ).set;
        const couponInput = <HTMLInputElement>document.getElementById("code");
        const couponSubmit = <HTMLInputElement>(
            document.querySelector("[ae_button_type='coupon_code'][type='button']")
        );

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
                request.addEventListener(
                    "readystatechange",
                    (ev) => {
                        if (request.readyState == 4) {
                            interceptor.unpatch();
                            //console.log("found a coupon request ::: ", request.response)

                            let result = parseCouponTestResult(coupon, request.response);
                            setTimeout((result: any) => resolve(result), 500);
                            // resolve()
                        }
                    },
                    false
                );
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
                request.addEventListener(
                    "readystatechange",
                    (ev) => {
                        if (request.readyState == 4) {
                            interceptor.unpatch();
                            interceptResult();
                            applyCoupon();
                        }
                    },
                    false
                );
            });
        } else {
            if (couponInput) {
                interceptResult();
                applyCoupon();
            }
        }
    });
};

let parseCouponTestResult = (coupon: string, responce: any) => {
    console.log("coupon :::", coupon);
    let couponCode = responce.price.couponCode;
    //console.log(`parsing test result for ${coupon} :: `, responce);
    //if (responce.price) console.log("price object ::", responce.price);

    let res: any;
    try {
        res = {
            coupon: couponCode.platformCouponCode,
            msg: couponCode.couponCodeWarnMsg,
            amount: couponCode.couponCodeAmount.formatted,
        };
        console.log("parse res :::", res)
    } catch {
        res = {
            coupon: coupon,
            msg: couponCode.couponCodeWarnMsg,
            //amount: couponCode.couponCodeAmount.formatted
        };
    }

    // console.log("parse res :::", res);
    return res;
};
