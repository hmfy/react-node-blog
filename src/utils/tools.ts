import axios from 'axios'
import {Property} from "csstype"
import { JSEncrypt } from "jsencrypt"
// @ts-ignore
import publicKey from "src/config"

// 根据运行环境返回合适的接口
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://fyang.fun:3000' : 'https://127.0.0.1:3000'

// 根据运行环境返回合适的axios实例
export const getInstance = () => {
    const token = localStorage.getItem('token') || ''
    return axios.create({
        baseURL: baseUrl,
        headers: {'Authorization': 'Bearer ' + token},
    })
}

// 转化 boolean 为 Display 类型
export const getDisplay = (show: boolean): (Property.Display | undefined) => ((!show && "none") || undefined)

// 格式化 HTML
export const parseHTML = (html:string) => {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = html
    return wrapper.innerText
}

/* body回到顶部 */
export function scrollAnimation(dom:any, callback?: () => any) {
    function step() {
        dom.scrollTo(0, dom.scrollTop - 50)
        if (dom.scrollTop > 0) {
            requestAnimationFrame(step);
        } else {
            callback?.()
        }
    }

    requestAnimationFrame(step);
}

/* 公钥加密 */
export function setEncrypt (str:string) {
    const key = publicKey
    const instance = new JSEncrypt()
    instance.setPublicKey(key)
    return instance.encrypt(str)
}
