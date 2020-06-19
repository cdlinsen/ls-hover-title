import $ from "jquery";
import React from "react";
import ReactDOM from "react-dom";
import { math, utils } from "./components";
import "./styles.css";

const { cutString, isNullOrEmpty } = utils;

//自定义html的title属性
class HoverTitle extends React.PureComponent {

    // //渲染次数，减少事件绑定执行次数
    // times = 0;

    //title显示状态
    visible = false;

    //鼠标事件绑定
    mouseEventBind = () => {
        const reactThis = this;
        const $divHoverTitleContent = $("#__divHoverTitleContent");
        const $divHoverTitleContentHidden = $("#__divHoverTitleContentHidden");
        let left = 0;
        let top = 0;
        let title = "";
        let targetTitle = "";
        let targetCusTitle = "";

        $("body").bind("mousemove", function (event) {
            //iframe不加title
            const target = event.target;
            if (target.tagName === "IFRAME") {
                return;
            }
            let $target = $(target);
            targetTitle = $target.attr("title");
            targetCusTitle = $target.attr("__title_");
            title = isNullOrEmpty(targetTitle) ? targetCusTitle : targetTitle;
            if (isNullOrEmpty(title)) {
                //当前元素不存在title属性,找其父元素的title属性
                const $parentTarget = $target.parents("[title],[__title_]:eq(0)");
                targetTitle = $parentTarget.attr("title");
                targetCusTitle = $parentTarget.attr("__title_");
                title = isNullOrEmpty(targetTitle) ? targetCusTitle : targetTitle;
                //传入带有title的父元素对象
                $target = $parentTarget;
            }
            reactThis.setTitleContentPosition({ $target, title, targetTitle, targetCusTitle, event, left, top, $divHoverTitleContent, $divHoverTitleContentHidden });
        }).bind("mousedown", function (event) {
            //鼠标离开，将内容置为空，并隐藏title
            $divHoverTitleContent.html("").stop(true, true).hide();
        });
    }

    //获取title的位置
    getTitlePosition = ({ event, left, top, $divHoverTitleContent, $divHoverTitleContentHidden }) => {
        const { clientX, clientY } = event;
        //窗口宽度
        const winWidth = $(window).width();
        //窗口高度
        const winHeight = $(window).height();
        //内容宽度
        const contentWidth = $divHoverTitleContentHidden.width();
        //内容高度
        const contentHeight = $divHoverTitleContentHidden.height();

        if (math.add(math.add(contentWidth, 20), clientX) > winWidth) {
            left = math.sub(clientX, contentWidth);
        } else {
            left = clientX;
        }
        if (math.add(contentHeight, math.add(clientY, 26)) > winHeight) {
            top = math.sub(clientY, math.add(contentHeight, 26));
        } else {
            top = math.add(clientY, 26);
        }
        const contentOuterWidth = $divHoverTitleContentHidden.outerWidth(true);

        $divHoverTitleContent.css({
            width: contentOuterWidth,
            left: left,
            top: top,
            "text-align": contentOuterWidth > 40 ? "left" : "center"
        });
    }

    //设置Title属性内容的位置
    setTitleContentPosition = ({ $target, title, targetTitle, event, left, top, $divHoverTitleContent, $divHoverTitleContentHidden }) => {
        if (!isNullOrEmpty(title)) {
            if (!isNullOrEmpty(targetTitle)) {
                $target.attr({ "__title_": title }).removeAttr("title");
            }

            if (isNullOrEmpty($divHoverTitleContent.html()) || $divHoverTitleContent.html() !== title) {
                const newTitle = cutString(title, 800);
                $divHoverTitleContent.html(newTitle);
                $divHoverTitleContentHidden.html(newTitle);
            }

            this.getTitlePosition({ event, left, top, $divHoverTitleContent, $divHoverTitleContentHidden });

            if (!this.visible) {
                this.visible = true;
                //延迟显示title
                setTimeout(() => {
                    if (!isNullOrEmpty($divHoverTitleContent.html())) {
                        $divHoverTitleContent.stop(true, true).fadeIn(500);
                    }
                }, 300);
            }
        } else {
            this.visible = false;
            $divHoverTitleContent.html("").stop(true, true).hide();
            $divHoverTitleContentHidden.html("");
        }
    }

    render() {
        const jsx = (
            <>
                <div
                    className="__divHoverTitleContent"
                    id="__divHoverTitleContent"
                >
                </div>
                <div
                    className="__divHoverTitleContentHidden"
                    id="__divHoverTitleContentHidden"
                >
                </div>
            </>
        );
        return ReactDOM.createPortal(jsx, document.body);
        //return jsx;
    }

    componentDidMount() {
        this.mouseEventBind();
    }
}

export default HoverTitle;
