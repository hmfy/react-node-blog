import axios from 'axios'
import {Property} from "csstype"
import { JSEncrypt } from "jsencrypt"
// @ts-ignore
import publicKey from "src/config"

// 根据运行环境返回合适的接口
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://fyang.fun:3000' : 'https://192.168.31.68:3000'

// 根据运行环境返回合适的axios实例
export const getInstance = () => {
    const token = localStorage.getItem('token') || ''
    return axios.create({
        baseURL: baseUrl,
        method: 'POST',
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

// 移动设备
export function getDeviceIsPhone () {
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
}

// 设置用户城市
export function setAddress (articleID: number|null = null) {
    const instance = getInstance()
    instance.request({
        url: '/noParse2',
        data: {
            articleID,
            path: 'log.ip2address'
        }
    }).then(async (res:any) => {
        const { expires, info } = res.data
        if (!expires) {
            return localStorage.setItem('user_address', info.address)
        }
        // 过很长一段时间, 则再记录一次
        await instance.request({
            url: '/noParse2',
            data: {
                articleID,
                path: 'log.setAddress'
            }
        })
    })
}

// 获取用户城市
export function getAddress () {
    return localStorage.getItem('user_address')
}

// 获取当前用户登录状态
export function getLogin () {
    const expiresTime = Number(localStorage.getItem('expiresTime') || 0)
    if (!localStorage.getItem('token')) return false
    return Date.now() < expiresTime
}

export function uploadFile (fileList:Array<File>):Promise<{data: {list:[]}}> {
    // 上传文件
    return new Promise((resolve, reject) => {
        const formData = new FormData()
        Array.from(fileList).forEach(file => formData.append(`files`, file))
        getInstance().request({
            url: "/file/upload",
            headers: {
                "Content-Type": "multipart/form-data;"
            },
            data: formData
        }).then(resolve).catch(err => reject(err))
    })
}

export function dataURLtoFile(dataurl:string, name:string):File {//base64转file
    let arr:any = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        buffer = atob(arr[1]),
        n = buffer.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = buffer.charCodeAt(n)
    }
    return new File([u8arr], name, {
        type: mime,
    })
}

export function chooseFile():Promise<FileList> {
    return new Promise(resolve => {
        const inputObj = document.createElement('input')
        inputObj.setAttribute('type','file')
        inputObj.onchange = (e:any) => resolve(e.target.files as FileList)
        inputObj.click()
    })
}

export function file2Base (file:File):Promise<string> {
    const fr = new FileReader()
    fr.readAsDataURL(file)
    return new Promise(resolve => {
        fr.onload = () => {
            resolve(fr.result as string)
        }
    })
}

