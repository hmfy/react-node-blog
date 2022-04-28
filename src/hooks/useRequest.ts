import {useEffect, useState} from "react"

type ItemProps = {
    content: string
    createTime: string
    id: number
    title?: string
}
type Response = {
    data: {
        list: Array<ItemProps>
    }
}
function useRequest(req: () => Promise<Response>, initialState: Array<ItemProps> = []) {
    const [dataList, setData] = useState(initialState)
    const [empty, setEmpty] = useState(false)
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        async function fetchData() {
            const {
                data:{ list }
            } = await req()
            setData(list)
            if (list.length === 0) {
                setEmpty(true)
            }
            setLoading(false)
        }

        fetchData().then(r => r)
    }, [req])
    return {
        dataList,
        empty,
        loading
    }
}

export default useRequest
