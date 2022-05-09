import {useEffect, useState} from "react"
import useRequest, {Params} from "hooks/useRequest";

interface Props extends Params {
    data: {
        path: string
    }
}

type ReturnResult = {
    bodyHeight: number
    hasMore: boolean
    fetchData: () => {}
    empty: boolean
    loading: boolean
}

function useScrollLoad<S = []>(a: Props): { list: S } & ReturnResult
function useScrollLoad(requestParams: Props) {
    const [list, setList] = useState([])
    const [params, setParams] = useState<{ data: {pageNo:number,pageSize:number} }>({
        url: '/pageQuery2',
        ...requestParams,
        data: {
            pageNo: 1,
            pageSize: 10,
            ...requestParams.data
        },
    })
    const {loading, setLoading, empty, resData} = useRequest(params)
    const [hasMore, setHasMore] = useState(false)
    const bodyHeight = document.body.clientHeight
    const fetchData = () => {
        setLoading(true)
        const {data} = params
        setParams({
            ...params,
            data: {
                ...data, pageNo: data.pageNo + 1
            }
        })
    }
    useEffect(() => {
        setList(list.concat(resData.list))
    }, [resData.pageNo])
    useEffect(() => {
        setHasMore(list.length < (resData as {total:number}).total)
    }, [ list ])

    return {
        bodyHeight,
        hasMore,
        fetchData,
        empty,
        loading,
        list
    }
}

export default useScrollLoad
