import { css } from "docz-plugin-css";
//import { css as scss } from "styled-components";

export default {
    title: "ls-hover-title",
    hashRouter: false,
    themeConfig: {
        styles: {}
    },
    port: 9997,
    codeSandbox: false,
    typescript: false,
    //filterComponents: (files) => {
    //    return files.filter(filepath =>
    //        /[w-]*.(js|jsx|ts|tsx)$/.test(filepath)
    //    );
    //},
    plugins: [
        css({
            preprocessor: "postcss"
        }),
        //css({
        //    preprocessor: "less",
        //    cssmodules: true
        //})
    ],
    /** 左侧菜单排序 */
    menu: []
};
