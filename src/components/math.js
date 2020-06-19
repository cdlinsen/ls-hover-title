import numeral from "numeral";

//通用四则运算方法(为了结算js运算bug)————按方法名称排序
const math = {
    //Numeral.js
    numeral,
    //加法
    add: (x, y) => {
        x = isNaN(x) ? 0 : x || 0;
        y = isNaN(y) ? 0 : y || 0;
        return numeral(x).add(y).value();
    },
    //除法
    div: (x, y) => {
        x = isNaN(x) ? 0 : x || 0;
        y = isNaN(y) ? 0 : y || 0;
        if (y === 0) {
            return 0;
        }
        return numeral(x).divide(y).value();
    },
    //乘法
    mul: (x, y) => {
        x = isNaN(x) ? 0 : x || 0;
        y = isNaN(y) ? 0 : y || 0;
        return numeral(x).multiply(y).value();
    },
    //减法
    sub: (x, y) => {
        x = isNaN(x) ? 0 : x || 0;
        y = isNaN(y) ? 0 : y || 0;
        return numeral(x).subtract(y).value();
    }
}
export default math;
