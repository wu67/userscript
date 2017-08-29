// ==UserScript==
// @name        自动勾选"京东配送"
// @namespace   wu67
// @description 在京东自动勾选"京东配送"，并尽可能将网页定位到 过滤选项上方的"面包屑导航"
// @include     /^https?:\/\/list\.jd\.com.+/
// @include     /^https?:\/\/search\.jd\.com.+/
// @updateURL   https://github.com/wu67/userscript/raw/master/auto_jd_deliver/auto_jd_deliver.meta.js
// @downloadURL https://github.com/wu67/userscript/raw/master/auto_jd_deliver/auto_jd_deliver.user.js
// @author      与你偶遇的树下
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version     1.0.1
// @grant       none
// ==/UserScript==

function addQuery(str, obj, position, bool) {

    var a;

    if (bool) {
        // 直接给URL追加参数
        if (!("delivery" in obj)) {
            str += "&delivery=1";
        }

        if (!("wtype" in obj)) {
            str += "&wtype=1";
        }

        str += "#J_crumbsBar";

    } else {

        // 传入的bool值为假时，原URL中有指定定位到某个HTML标签，此时应插入参数
        a = str.slice(0, position);

        if (!("delivery" in obj)) {
            a += "&delivery=1";
        }

        if (!("wtype" in obj)) {
            a += "&wtype=1";
        }

        a += str.slice(position, str.length);
        str = a;
    }

    return str;

}

(function () {
    var queryStr,
        lastestURL,
        keyWord = {},
        jumpPosition;

    queryStr = location.href.toString().split("?")[1].split("&");
    lastestURL = location.href.toString();

    for (var i = 0; i < queryStr.length; i++) {

        var q = queryStr[i].split("=");
        keyWord[q[0]] = q[1];
    }
    // console.log(keyWord);

    jumpPosition = lastestURL.search(/#.*/);

    if (jumpPosition === -1) {

        // 若URL无定位到特定位置
        // 直接追加参数
        lastestURL = addQuery(lastestURL, keyWord, jumpPosition, true);
    } else {

        lastestURL = addQuery(lastestURL, keyWord, jumpPosition, false);
    }

    // console.log(location.href);
    // console.log(lastestURL);
    // console.log(jumpPosition);

    if (location.href !== lastestURL) {
        location.href = lastestURL;
    }

})();
