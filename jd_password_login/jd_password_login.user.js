// ==UserScript==
// @name         在京东优先使用密码登录
// @namespace    wu67
// @description  在京东登录页优先显示账号密码登录框
// @include     /^https:\/\/passport\.jd\.com\/new\/login\.aspx.*/
// @include     /^https:\/\/passport\.jd\.com\/uc\/login.*/
// @match       /^https:\/\/passport\.jd\.com\/new\/login\.aspx.*/
// @match       /^https:\/\/passport\.jd\.com\/uc\/login.*/
// @updateURL   https://github.com/wu67/userscript/raw/master/jd_password_login/jd_password_login.meta.js
// @downloadURL https://github.com/wu67/userscript/raw/master/jd_password_login/jd_password_login.user.js
// @author      wu67
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version      1.0.2
// @grant        none
// ==/UserScript==

function clickBtn() {
    let loginBox = document.querySelector('div.login-form>div.login-box'),
        btnQr2pw = document.querySelector('div.login-form>div.login-tab-r')

    if (loginBox.style.display.toString() === 'none') {
        btnQr2pw.click()
    }
}

// document.addEventListener("load", clickBtn);
(function() {
    // jd 会使用脚本给密码登录框修改display属性，延时使得函数在jd修改属性后再执行
    setTimeout(clickBtn, 1300)
})()

