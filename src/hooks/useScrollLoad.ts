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
    const [hasMore] = useState(false)
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
        // eslint-disable-next-line
    }, [resData.pageNo])
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
