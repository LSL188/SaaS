// 设置cookie
let setCookie = (name, value, iDay, domain = '/') => { // 给浏览器设置cookie
    if (iDay === 0) {
        document.cookie = name + '=' + value
    } else {
        var Days = 1;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        document.cookie = name + '=' + value + '; expires=' + exp.toGMTString() + 'domain = path= ' + domain;
    }
}

// 获取cookie
let getCookie = (name) => {
    var cookie = document.cookie;
    var arrCookie = cookie.split(';');
    for (var i = 0; i < arrCookie.length; i++) {
        var arrCookieItem = arrCookie[i].split('=');
        arrCookieItem[0] = arrCookieItem[0].replace(' ', '');
        if (arrCookieItem[0] === name) {
            return arrCookieItem[1];
        }
    }
}

// 删除cookie
let removeCookie = (name) => {
    setCookie(name, '', -1);
}

// Unicode解码
let decodeUnicode = (str) => {
    str = str.replace(/\\/g, '%');
    return unescape(str);
}
// Post拼接参数
let spliceParamsPost = (jsonData) => {
    let str = '';
    if (jsonData) {
        for (const keyItem in jsonData) {
            str += `${keyItem}=${jsonData[keyItem]}&`;
        }
        // 将最后一个 '&'干掉
        return str.split('').slice(0, -1).join('');
    }
    return '';
}

// get拼接参数
let spliceParamsGet = (jsonData) => {
    let str = '';
    if (jsonData) {
        for (const keyItem in jsonData) {
            if (jsonData[keyItem] !== '') {
                str += `${jsonData[keyItem]}/`;
            }
        }
        // 将最后一个 '/'干掉
        str = '/' + str;
        return str.split('').slice(0, -1).join('');
    }
    return '';
}

let publicMethod = {
    setCookie: setCookie,
    getCookie: getCookie,
    removeCookie: removeCookie,
    spliceParamsPost: spliceParamsPost,
    spliceParamsGet: spliceParamsGet,
    decodeUnicode: decodeUnicode
}
module.exports = publicMethod;
