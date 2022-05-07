import {useEffect, useState} from "react"
import {AxiosRequestHeaders} from "axios";
import {instance} from "tools/tools"
import {message} from "antd";

export type ResData = {
    err?: null | string
    list: []
    pageQuery?: boolean,
    pageSiz?: number,
    pageNo?: number,
    total?: number
}

export type Response = {
    data: ResData
}

export type Params = {
    needReq?: boolean
    url?: string
    data?: object
    headers?: AxiosRequestHeaders
    method?: 'GET' | 'POST'
    timeout?: number
}

export default useRequest

// const mockUrl = 'https://www.fastmock.site/mock/5a9f84630f3ede0293cf99c7f56c0644/blog'
const defaultAPI = '/execute'

export function request({ url = defaultAPI, ...resetParams }:Params): Promise<Response> {
    return instance.request({
        url: url,
        method: 'POST',
        ...resetParams
    })
}

function useRequest(arg:Params): {
    resData: ResData,
    empty: boolean,
    loading: boolean,
    setEmpty: (b:boolean) => any,
    setLoading: (b:boolean) => any
}
function useRequest(arg: Params) {
    const [resData, setResData] = useState<ResData>({list: []})
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const { needReq = true } = arg
        if (!needReq) return
        async function fetchData() {
            const { data } = await request(arg)
            if (data.err) {
                message.error(data.err)
                return setLoading(false)
            }
            setResData(data)
            if (!data.list.length) setEmpty(true)
            setLoading(false)
        }

        fetchData().then(r => r)
    }, [arg])
    return {
        resData,
        empty,
        loading,
        setEmpty,
        setLoading
    }
}
