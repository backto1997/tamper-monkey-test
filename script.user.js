// ==UserScript==
// @name         Test Script
// @description  test for auto updating
// @namespace    http://tampermonkey.net/
// @author       Amy
// @version      2024.07.08.03
// @updateURL    https://github.com/backto1997/tamper-monkey-test/raw/main/script.user.js
// @downloadURL  https://github.com/backto1997/tamper-monkey-test/raw/main/script.user.js
// @match        https://app2-staging.ease-x.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @run-at       document-idle
// @grant        window.onurlchange
// @grant        GM_xmlhttpRequest
// @connect      reqres.in
// ==/UserScript==

(async function() {
    'use strict';

    if (window.onurlchange === null) {
        window.addEventListener('urlchange', (info) => {
            if (Object.values(info)[0].includes("/dashboard/my-project")) {
                whenVisible('.v-card', (el)=>{console.log(el)})

            }
        });
    }

    try {
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://reqres.in/api/users?page=2",
            headers: {
                "Content-Type": "application/json"
            },
            responseType: 'json',
            onload: function(res) {
                console.log('res.response2:', res.response);
            }
        });
    }
    catch (err) {
        console.log(err);
    }
})();

function whenVisible(sel, func, idx = 0) {
  // sel = css selector, such as "button[type=username]"
  // func = function to call, passes the element found
  // idx = index of the element to find (if not the first element)
  var intv = setInterval(function() {
    var elems = document.querySelectorAll(sel);
    // if (elems.length < 1) { return false; }
    if (elems.length > idx) {
      if (!(window.getComputedStyle(elems[idx]).display === 'none')) {
        // when element is found, and visibile, clear the interval.
        clearInterval(intv);

         // call function
         func(elems[idx]);
        }
      }
      else return false;
    }, 200);
}