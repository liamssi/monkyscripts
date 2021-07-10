export const test = (coupons: string[]) => {

// console.log("testing coupon ::",);

    //find the coupon text input ant type coupon 


    coupons.forEach((coupon)=>{

        console.log("testing coupon ::",coupon)

        //find the coupon text input ant type coupon 
    })


    t(coupons[0])
}

let t=(coupon:string)=>{
   let  ae_button_type="coupon_code"
//ae_button_type="coupon_code"
   let couponInput=<HTMLInputElement>document.getElementById("code");
   (<HTMLInputElement>document.getElementById("code")).value="bbbbbbbb"
   let couponSubmit=<HTMLInputElement>document.querySelector("[ae_button_type='coupon_code'][type='button']")
  console.log("running the final test for ::", couponSubmit);

  if(couponInput){
 
    couponInput.value =coupon
    // couponInput.focus()
    // let e1= new Event('keydown', {
    //     bubbles: true,
    //     cancelable: true,
    //         });
    
    // let e2= new Event('keyup', {
    //     bubbles: true,
    //     cancelable: true,
    // });
    couponInput.click()
    couponInput.dispatchEvent(new Event('focus'));
    couponInput.dispatchEvent(new KeyboardEvent('keypress',{'key':'a'}));}
    $('#code').keydown();

    $('#code').keypress();
    $('#code').keyup();
    console.log("--------------------------key pressed",$)
    //couponInput.dispatchEvent(e1);
    //couponInput.dispatchEvent(e2);}
    //couponInput.click()

   
}