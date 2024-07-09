// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024.07.08.01
// @description  try to take over the world!
// @author       You
// @match        https://app2-staging.ease-x.com/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        window.onurlchange
// @grant        GM_xmlhttpRequest
// @connect      reqres.in
// @run-at       document-idle
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
                console.log(res.response);
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