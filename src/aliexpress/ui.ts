export const initUI = (btnCallback:(inputAreaValue:string)=>void) => {
    console.log("buiolding the ui ...");
    let uiId = "ali-coupont-tester";
    let runBtnId = "ali-coupont-tester-submit-btn";
    let couponsInput = "ali-coupont-tester-submit-inpute"

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
        let  couponsIpute = document.createElement("textarea");
        ui.appendChild(couponsIpute);
        //run button
        let runBtn = document.createElement("button");
       // runBtn.id = runBtnId;
       runBtn.textContent="run"
        runBtn.addEventListener("click", () => {
            runBtn.classList.toggle("active");

            btnCallback(couponsIpute.value)
        });
        runBtn.type="submit"
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



}