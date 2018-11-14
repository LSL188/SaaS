import axios from 'axios'
import publicMethod from '@/tools/publicMethod'

// import { API_LINK } from './api'
// console.log(API_LINK);
const API_LINK = process.env.BASE_API;
console.log(API_LINK);

axios.defaults.withCredentials = true
axios.interceptors.request.use((config) => {
    return config;
}, (error) => {
    // window.$showToast('请求失败!')
    return Promise.reject(error)
})
axios.interceptors.response.use(response => {
    return response;
}, error => {
    console.log(error);
    // window.$showToast('网络错误!')
    setTimeout(() => {
        // window.location.href = window.location.origin + '/error';
    }, 1000);
    return Promise.resolve(error.response)
})

const checkCodeStatus = (response) => {
    console.log('service', response);
    // 结束进度条或者加载动画
    if (response.status >= 200 && response.status <= 304) {
        if (response.data.code >= 1001 && response.data.code <= 1005) {
            location.href = '/login';
        }
        return response;
    }
}

const checkCodeMsg = (res) => {
    if (res.code < 200 || res.code > 304) {
        // $toast && $toast.showMsg('网络错误')
        // window.location.href = window.location.origin + '/errorpage';
    }
    return res;
}

export default {
    post(url, data) {
        console.log(url);
        let nowTime = String(new Date().getTime());
        const token = publicMethod.getCookie('sign');
        // console.log(token)
        const user = publicMethod.getCookie('user_name');
        return axios({
            method: 'post',
            baseURL: API_LINK,
            url: url,
            data: publicMethod.spliceParamsPost(data),
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                v: '1.0',
                t: nowTime.substr(1, nowTime.length - 3),
                sign: url.indexOf('/login') !== -1 || url === '/' ? '' : token,
                u: url.indexOf('/login') !== -1 || url === '/' ? '' : user
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    },
    get(url, params) {
        let nowTime = String(new Date().getTime());
        const token = publicMethod.getCookie('sign');
        console.log(token)
        const user = publicMethod.getCookie('user_name');
        return axios({
            method: 'get',
            url: url,
            baseURL: API_LINK,
            params: params,
            timeout: 30000,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                v: '1.0',
                t: nowTime.substr(1, nowTime.length - 3),
                sign: url.indexOf('/login') !== -1 ? '' : token,
                u: url.indexOf('/login') !== -1 ? '' : user
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    },
    postImg(url, data) {
        let nowTime = String(new Date().getTime());
        const token = publicMethod.getCookie('sign');
        const user = publicMethod.getCookie('user_name');
        return axios({
            method: 'post',
            url: API_LINK + url,
            data: data,
            timeout: 30000,
            headers: {
                'Content-Type': 'multipart/form-data',
                v: '1.0',
                t: nowTime.substr(1, nowTime.length - 3),
                sign: token,
                u: user
            }
        }).then(checkCodeStatus).catch(checkCodeMsg)
    }
}
