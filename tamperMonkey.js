// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.facebook.com/*
// @icon         https://www.google.com/s2/favicons?domain=facebook.com
// @require      file:///C:\Users\HP\Desktop\monkyscripts\t2.js
// @resource     CSS file:///C:\Users\HP\Desktop\monkyscripts\style.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

(function () {
  "use strict";
  //inject the css
  const my_css = GM_getResourceText("CSS");
  GM_addStyle(my_css);
  // Your code here...
  console.log("working...");
  init();
})();
