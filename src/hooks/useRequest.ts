import {useEffect, useState} from "react"
import {AxiosRequestHeaders} from "axios";
import {getInstance} from "tools/tools"
import {message, Modal} from "antd";

export type ResData<T = []> = {
    err: null | object
    list: T
    pageQuery?: boolean
    pageSiz?: number
    pageNo?: number
    total?: number
    token?: string
}

export type Response<S = []> = {
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

export function request<S = []>(a: Params): Promise<Response<S>>
export async function request({url = defaultAPI, ...resetParams}: Params): Promise<Response> {
    return new Promise(async (resolve, reject) => {
        getInstance().request({
            url: url,
            method: 'POST',
            ...resetParams
        })
            .then(result => {
                const { data: { err } } = result

                if (err) {
                    message.error(err)
                    resolve({
                        data: {
                            err: err,
                            list: []
                        }
                    })
                }
                resolve(result)
            })
            .catch(error => {
                if (!error.response) {
                    reject(error)
                }
                if (error.response.statusText === "Unauthorized") {
                    Modal.warning({
                        keyboard: false,
                        okText: "去登陆",
                        closable: true,
                        centered: true,
                        content: '当前页面需要登陆才能继续访问',
                        onOk () {
                            window.location.href =  window.location.origin + '/login?' + window.location.pathname
                        },
                        onCancel () {
                            window.location.href =  window.location.origin + '/'
                        }
                    })
                }
            })
    })
}

function useRequest(arg: Params): {
    resData: ResData,
    empty: boolean,
    loading: boolean,
    setEmpty: (b: boolean) => any,
    setLoading: (b: boolean) => any
}
function useRequest(arg: Params) {
    const [resData, setResData] = useState<ResData>({list: [], err: null})
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        request(arg).then(({data}) => {
            setResData(data)
            if (!data.list.length) setEmpty(true)
            setLoading(false)
        }).catch(e => console.log(e))
    }, [arg])
    return {
        resData,
        empty,
        loading,
        setEmpty,
        setLoading
    }
}
