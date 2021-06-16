// ==UserScript==
// @require      file://C:\Users\is94\Desktop\monkyscripts\dist\index.js
// @require      file://C:\Users\is94\Desktop\monkyscripts\dist\userscript.user.js
// ==/UserScript==


(function () {
  "use strict";
  //inject the css
 // const my_css = GM_getResourceText("CSS");
  // GM_addStyle(my_css);
  ///Your code here...
  // console.log("working... 555");
  //console.log("working. jjjj.", fbtool);
  // t();
 // console.log("init from studio");


 console.log("----------------------studio--------------");
})();


let initUI = () => {
  let uiId = "fb-scrapper";
  let scrapBtnId = "fb-scrapper-start-btn";
  let ui = document.getElementById(uiId);

  if (!ui) {
    //main ui
    ui = document.createElement("div");
    ui.id = uiId;
    document.body.appendChild(ui);

    //title
    title = document.createElement("h1");
    title.classList.add("title");
    title.innerHTML = "FBG  SCRAPER v0.2";
    ui.appendChild(title);

    //play button
    let scrapBtn = document.createElement("a");
    scrapBtn.id = scrapBtnId;
    scrapBtn.addEventListener("click", () => {
      scrapBtn.classList.toggle("active");
    });
    ui.appendChild(scrapBtn);
    //stats
    stats = document.createElement("h1");
    stats.classList.add("title");
    stats.innerHTML = "SCRAPED:" +" db.length";
    ui.appendChild(stats);

    //save btn
    saveBtn = document.createElement("a");
    saveBtn.classList.add("title");
    saveBtn.innerHTML = "SAVE";
    ui.appendChild(saveBtn);

    return { scrapBtn, saveBtn };
  }
};