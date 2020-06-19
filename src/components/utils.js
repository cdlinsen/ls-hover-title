//通用方法————方法按名称排序
const utils = {
    //字符串截取
    cutString: (str, length, markNum = 3, mark = ".") => {
        if (!utils.isNullOrEmpty(str) && !utils.isNullOrEmpty(length)) {
            //中文算两个字符串的长度
            let strLength = 0;
            //字符串长度
            let strLengthCount = 0;
            //中文个数
            let chineseNo = 0;
            //获取字符串总长度
            for (let i = 0; i < str.length; i++) {
                strLengthCount++;
                //判断字符是否为中文
                if (str.charCodeAt(i) > 255) {
                    //如果是中文字符串长度加1
                    strLengthCount++;
                }
            }
            if (strLengthCount > length) {
                for (let i = 0; i < str.length; i++) {
                    strLength++;
                    //判断字符是否为中文
                    if (str.charCodeAt(i) > 255) {
                        //字符串长度加1
                        strLength++;
                        //中文个数加1
                        chineseNo++;
                    }
                    if (strLength >= (length - 2)) {
                        //计算截取字符串长度
                        str = str.substring(0, strLength - chineseNo - (strLength - (length - 2)));
                        if (markNum > 0) {
                            for (let j = 0; j < markNum; j++) {
                                //尾部加标记
                                str += mark;
                            }
                        }
                        break;
                    }
                }
            }
        }
        return str;
    },
    //判断js对象是否为空、NULL、undefined等    common.base.isNullOrEmpty
    isNullOrEmpty: (obj) => {
        var result = false;
        var type = typeof (obj);
        switch (type) {
            case "string":
                if (obj === "" || obj === undefined || obj === null) {
                    result = true;
                }
                break;
            case "number":
                if (obj === undefined || obj === null) {
                    result = true;
                }
                break;
            case "object":
                if (Array.isArray(obj)) {
                    //数组
                    if (obj === undefined || obj === null || obj.length === 0) {
                        result = true;
                    }
                } else if (obj && obj.constructor.name === "Promise") {
                    result = false;
                } else {
                    //对象
                    if (obj === undefined || obj === null || Object.keys(obj).length === 0) {
                        result = true;
                    }
                }
                break;
            default:
                if (obj === undefined || obj === null) {
                    result = true;
                }
                break;
        }
        return result;
    }
};

export default utils;
