// ==UserScript==
// @name        自动开始磁力链下载
// @namespace   wk
// @description 鼠标选中哈希值（散列），会自动进行相应的磁力链接下载
// @include     /^https?:*/
// @updateURL   https://github.com/4thleaf/userscript/raw/master/auto_download_MagnetURI/auto_download_MagnetURI.meta.js
// @downloadURL https://github.com/4thleaf/userscript/raw/master/auto_download_MagnetURI/auto_download_MagnetURI.user.js
// @author      与你偶遇的树下
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version     1.0
// @grant       none
// ==/UserScript==

function generateLink() {
    var textContent = window.getSelection().toString().trim();

    if (textContent.length === 40 || textContent.length === 32) {

        if (textContent.match(/^\w{40} | \w{32}/)) {
            magnetLink = "magnet:?xt=urn:btih:" + textContent;
            // console.log(magnetLink);

            // 开始下载
            autoDownload(magnetLink);

        } else {
            // 所选字符串并非HASH串
        }

    }

    // console.log(window.getSelection().toString());
    // console.log(textContent);
}

/**
 * 接受一个链接，自动开始下载
 * 建立一个a标签并设置其href属性，建立一个鼠标点击事件，让a模拟触发
 * @param link
 */
function autoDownload(link) {

    var btnDownload = document.createElement('a'),
        clickEvent = document.createEvent("MouseEvent");

    clickEvent.initEvent("click", true, false);
    btnDownload.setAttribute("href", link);

    btnDownload.dispatchEvent(clickEvent);

}

window.addEventListener("mouseup", generateLink);
