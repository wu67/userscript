// ==UserScript==
// @name        清理机器人粉丝
// @namespace   wk
// @description 自动拉黑关注你的贴吧机器人
// @include     /^http:\/\/tieba\.baidu\.com\/i\/\d+\/fans.*/
// @author      与你偶遇的树下
// @icon        http://himg.baidu.com/sys/portraitl/item/da35115e?t=1460692207
// @license     MIT
// @version     1.0.1
// @grant       none
// ==/UserScript==

function cleanRobotFans() {

    var userList = document.querySelectorAll("#search_list>div.user"),
        btnNextPage,
        userFansNum,
        userFollowNum;

    /**
     * 因为每页只显示20个粉丝，即userList.length不会大于20
     * 实际上当前页最多循环20次，且每删除一个机器人都会刷新整个页面
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
        }
    }

    // 执行到此处说明当前页被for遍历到页尾了都没发现机器人号

    // 获取下一页按钮
    btnNextPage = document.querySelector(".pager a.next");

    // 若还有下一页，翻页
    if (!!btnNextPage) {
        btnNextPage.click();
    } else {
        // 无下一页，则说明清理完成了
    }

}

addEventListener("load", cleanRobotFans, false);
