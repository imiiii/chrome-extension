(()=>{"use strict";var e,t,n,r={230:(e,t,n)=>{n.d(t,{Lx:()=>u,eF:()=>i,gf:()=>c});var r=function(e,t,n,r){return new(n||(n=Promise))((function(o,c){function a(e){try{i(r.next(e))}catch(e){c(e)}}function u(e){try{i(r.throw(e))}catch(e){c(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}i((r=r.apply(e,t||[])).next())}))},o=function(e,t){var n,r,o,c,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function u(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;c&&(c=0,u[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},c=function(){return r(void 0,void 0,void 0,(function(){return o(this,(function(e){return[2,new Promise((function(e){chrome.storage.local.get(["access_token"],(function(t){t.access_token?e(t.access_token):e(null)}))}))]}))}))},a=function(e){return new Promise((function(t,n){null===e?chrome.storage.local.remove("access_token",(function(){chrome.runtime.lastError?n(chrome.runtime.lastError):t()})):chrome.storage.local.set({access_token:e},(function(){chrome.runtime.lastError?n(chrome.runtime.lastError):t()}))}))};function u(e,t){return r(this,void 0,void 0,(function(){var n,r,c,u;return o(this,(function(o){switch(o.label){case 0:return o.trys.push([0,7,,8]),[4,fetch("http://127.0.0.1:8000/token",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:new URLSearchParams({grant_type:"password",username:e,password:t,client_id:"your-client-id",client_secret:"your-client-secret"})})];case 1:return(n=o.sent()).ok?[4,n.json()]:[3,4];case 2:return r=o.sent(),c=r.access_token,[4,a(c)];case 3:return o.sent(),window.location.href="success.html",[3,6];case 4:return[4,n.json()];case 5:throw u=o.sent(),new Error("Login failed: ".concat(u.error_description));case 6:return[3,8];case 7:throw o.sent();case 8:return[2]}}))}))}var i=function(){return new Promise((function(e,t){chrome.storage.local.remove("access_token",(function(){chrome.runtime.lastError?t(chrome.runtime.lastError):e()}))}))}}},o={};function c(e){var t=o[e];if(void 0!==t)return t.exports;var n=o[e]={exports:{}};return r[e](n,n.exports,c),n.exports}c.d=(e,t)=>{for(var n in t)c.o(t,n)&&!c.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},c.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),e=c(230),t=function(e,t,n,r){return new(n||(n=Promise))((function(o,c){function a(e){try{i(r.next(e))}catch(e){c(e)}}function u(e){try{i(r.throw(e))}catch(e){c(e)}}function i(e){var t;e.done?o(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(a,u)}i((r=r.apply(e,t||[])).next())}))},n=function(e,t){var n,r,o,c,a={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return c={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(c[Symbol.iterator]=function(){return this}),c;function u(u){return function(i){return function(u){if(n)throw new TypeError("Generator is already executing.");for(;c&&(c=0,u[0]&&(a=0)),a;)try{if(n=1,r&&(o=2&u[0]?r.return:u[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,u[1])).done)return o;switch(r=0,o&&(u=[2&u[0],o.value]),u[0]){case 0:case 1:o=u;break;case 4:return a.label++,{value:u[1],done:!1};case 5:a.label++,r=u[1],u=[0];continue;case 7:u=a.ops.pop(),a.trys.pop();continue;default:if(!((o=(o=a.trys).length>0&&o[o.length-1])||6!==u[0]&&2!==u[0])){a=0;continue}if(3===u[0]&&(!o||u[1]>o[0]&&u[1]<o[3])){a.label=u[1];break}if(6===u[0]&&a.label<o[1]){a.label=o[1],o=u;break}if(o&&a.label<o[2]){a.label=o[2],a.ops.push(u);break}o[2]&&a.ops.pop(),a.trys.pop();continue}u=t.call(e,a)}catch(e){u=[6,e],r=0}finally{n=o=0}if(5&u[0])throw u[1];return{value:u[0]?u[1]:void 0,done:!0}}([u,i])}}},document.addEventListener("DOMContentLoaded",(function(){var r,o;return t(this,void 0,void 0,(function(){var c=this;return n(this,(function(a){switch(a.label){case 0:return[4,(0,e.gf)()];case 1:return a.sent()?(window.location.href="success.html",[2]):(null===(r=document.getElementById("loginBtn"))||void 0===r||r.addEventListener("click",(function(r){return t(c,void 0,void 0,(function(){var t,o,c,a;return n(this,(function(n){switch(n.label){case 0:if(r.preventDefault(),t=document.getElementById("username"),o=document.getElementById("password"),c=document.getElementById("status"),!(t&&o&&c))return[3,5];n.label=1;case 1:return n.trys.push([1,3,,4]),[4,(0,e.Lx)(t.value,o.value)];case 2:return n.sent(),window.location.href="success.html",[3,4];case 3:return a=n.sent(),console.error("Login error:",a),c.innerText="Login failed. Please try again.",[3,4];case 4:return[3,6];case 5:console.error("One or more required elements are missing."),n.label=6;case 6:return[2]}}))}))})),null===(o=document.getElementById("logoutBtn"))||void 0===o||o.addEventListener("click",(function(){return t(c,void 0,void 0,(function(){var t;return n(this,(function(n){switch(n.label){case 0:return[4,(0,e.gf)()];case 1:if(!n.sent())return alert("No access token found in the Chrome local storage."),[2];n.label=2;case 2:return n.trys.push([2,4,,5]),[4,(0,e.eF)()];case 3:return n.sent(),alert("Logged out successfully."),window.location.reload(),[3,5];case 4:return t=n.sent(),console.error("Logout error:",t),alert("Failed to log out."),[3,5];case 5:return[2]}}))}))})),[2])}}))}))}))})();