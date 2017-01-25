// ==UserScript==
// @name        清理机器人粉丝
// @namespace   wk
// @description 自动拉黑关注你的贴吧机器人
// @include     /^http:\/\/tieba\.baidu\.com\/i.*\/fans.*/
// @updateURL   https://github.com/4thleaf/userscript/raw/master/clean_robot_fans/clean_robot_fans.meta.js
// @downloadURL https://github.com/4thleaf/userscript/raw/master/clean_robot_fans/clean_robot_fans.user.js
// @author      与你偶遇的树下
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version     1.1.1
// @grant       none
// ==/UserScript==

function cleanRobotFans() {

    var userList = document.querySelectorAll("#search_list>div.user"),
        btnNextPage,
        userFansNum,
        userFollowNum,
        flip = true;

    /**
     * 因为每页只显示20个粉丝，实际上当前页最多循环20次
     * 删除动作会导致页面刷新，执行得足够快的话，就算删了整页的20个才刷新一次
     * 刷新之后，未删除前的下一页列表会刷新到当前页来，此时不应翻页，即有删除操作就不应翻页
     */
    for (var i = 0; i < userList.length; i++) {

        // 该用户的粉丝数和关注数
        userFansNum = userList[i].querySelectorAll("div.mid>span")[1].innerHTML;
        userFollowNum = userList[i].querySelector("div.mid").innerText.split("：")[2];

        // 关注你的用户之中，粉丝数少于10且与关注数相差大于60,或者粉丝数与关注数相差大于150的，会被当做机器人
        if ((userFansNum < 10 && (userFollowNum - userFansNum > 60)) ||
            (userFollowNum - userFansNum > 150)) {

            // 加入黑名单，即删除粉丝
            userList[i].querySelector("#add_blacklist_btn").click();
            window.setTimeout(function () {
                document.querySelector(".dialogJanswers>input.dialogJbtn").click();
            }, 300);

            // 有删除动作，不应翻页
            flip = false;
        }
    }

    // 翻页操作
    if (flip) {

        // 获取下一页按钮
        btnNextPage = document.querySelector(".pager a.next");

        // 若还有下一页，翻页
        if (!!btnNextPage) {
            btnNextPage.click();
        } else {
            // 无下一页，则说明清理完成了
        }
    }

}

addEventListener("load", cleanRobotFans, false);
