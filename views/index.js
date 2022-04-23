import { useState } from 'react'

function clickMe () {
    const [count, setCount] = useState(0)

    return (
        <div>
            <p>you click { count } times</p>
            <button onClick={() => setCount(count + 1)}>
                click me
            </button>
        </div>
    )
}

export default clickMe
