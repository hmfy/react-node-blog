import {useEffect, useState} from "react"
import {AxiosRequestHeaders} from "axios";
import {getInstance} from "tools/tools"
import {message, Modal} from "antd";

export type ResData<T = []> = {
    code: number,
    err: null | object
    list: T
    pageQuery?: boolean
    pageSiz?: number
    pageNo?: number
    total?: number
    tokenInfo?: {
        token: string
        expiresTime: number
    }
    userInfo?: {
        name: string
        ID: number
    }
}

export type ParseData<S = []> = {
    data: ResData<S>
}

export type Params = {
    url?: string
    data?: object
    headers?: AxiosRequestHeaders
    method?: 'GET' | 'POST'
    timeout?: number
}

export default useRequest

const defaultAPI = '/execute2'

export function request<S = []>(params: Params): Promise<ParseData<S>>
export async function request({url = defaultAPI, ...resetParams}: Params): Promise<ParseData> {
    return new Promise(async (resolve, reject) => {
        getInstance().request({
            url: url,
            method: 'POST',
            ...resetParams
        })
            .then(result => {
                const { data: { err, code } } = result

                // 正常请求
                if (code === 200) {
                    return resolve(result)
                }

                // 失败请求
                if (code === 1001) {
                    // 服务器返回 1001，token 无效
                    const curPath = window.location.pathname
                    const origin = window.location.origin
                    Modal.warning({
                        keyboard: false,
                        okText: "去登陆",
                        closable: true,
                        centered: true,
                        content: '当前功能需要登陆才能继续使用',
                        onOk () {
                            window.location.href =  origin + '/login?' + curPath
                        },
                        onCancel () {
                            if (['/write'].includes(curPath)) {
                                window.location.href =  origin + '/'
                            }
                        }
                    })
                }
                else {
                    // 服务器返回错误
                    message.error(err)
                    return resolve({
                        data: {
                            code: 200,
                            err: err,
                            list: []
                        }
                    })
                }
            })
            .catch(error => {
                // 异常
                reject(error)
            })
    })
}

function useRequest(arg: Params): {
    resData: ResData,
    empty: boolean,
    loading: boolean,
    setEmpty: (b: boolean) => any,
    setLoading: (b: boolean) => any,
    refresh: () => void
}
function useRequest(arg: Params) {
    const [resData, setResData] = useState<ResData>({list: [], err: null, code: 200})
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    const [refreshControl, setControl] = useState(false)
    const refresh = () => {
        setControl(!refreshControl)
    }
    useEffect(() => {
        request(arg).then(({data}) => {
            setResData(data)
            if (!data.list.length) setEmpty(true)
            setLoading(false)
        }).catch(e => console.log(e))
    }, [arg, refreshControl])
    return {
        resData,
        empty,
        loading,
        setEmpty,
        setLoading,
        refresh
    }
}
