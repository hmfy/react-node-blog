import axios from 'axios'
import {Property} from "csstype"

// 根据运行环境返回合适的接口
export const baseUrl = process.env.NODE_ENV === 'production' ? 'https://fyang.fun:3000' : 'https://127.0.0.1:3000'

// 根据运行环境返回合适的axios实例
export const instance = axios.create({baseURL: baseUrl})

// 转化 boolean 为 Display 类型
export const getDisplay = (show: boolean): (Property.Display | undefined) => ((!show && "none") || undefined)
