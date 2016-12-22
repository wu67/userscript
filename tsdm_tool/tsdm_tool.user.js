// ==UserScript==
// @name        天使动漫小工具
// @namespace   wk
// @description 作用天使动漫论坛，缩回右方的弹出边栏(动漫资讯)，添加完成签到按钮(点开始签到再点完成签到)
// @include     /https?:\/\/www\.tsdm\.net\/.*/
// @updateURL   https://github.com/4thleaf/userscript/raw/master/tsdm_tool/tsdm_tool.meta.js
// @downloadURL https://github.com/4thleaf/userscript/raw/master/tsdm_tool/tsdm_tool.user.js
// @author      与你偶遇的树下
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version     1.0
// @grant       none
// ==/UserScript==

(function sign() {

    var btnSign = document.querySelector("#inner_stat > a:nth-of-type(6)"),
        navBarRight = document.getElementById("inner_stat"),
        btnSignByClient = document.createElement("a");

    btnSignByClient.innerText = "完成签到 ";

    if (btnSign.innerText === "签到领奖!") {
        navBarRight.insertBefore(btnSignByClient, btnSign);
    } else {
        // 签到已完成，不在页面上插入完成签到链接
    }

    btnSignByClient.addEventListener("click", function () {
        document.getElementById("kx").click();
        document.getElementById("todaysay").value = "前来签到";
        document.querySelector("p.o button.pn").click();
    });

    var sidebarSwitch = document.getElementById('ts_slide_close');

    if (sidebarSwitch.style.display.toString() === 'block') {
        sidebarSwitch.click();
        console.log('已收缩边栏');
    } else if (sidebarSwitch.style.display.toString() === 'none') {
        console.log('边栏并未弹出，不作处理');
    } else {
        console.log('边栏的display属性值未知，不作处理');
    }
})();
