import React, {useEffect} from "react"
import 'assets/fire.scss'

function Fire({size = 30}: { size?: number }) {
    useEffect(() => {
        const root = document.querySelector(':root') as HTMLElement
        if (root) {
            root.style.setProperty('--rocket-size', size + 'px')
        }
    }, [])
    return (<div className="wrapper">
        <div className="rocket">
            <div className="body side left"/>
            <div className="body main">
                <div className="wing leftWing"/>
                <div className="wing rightWing"/>
                <div className="booster"/>
                <div className="fire"/>
            </div>
            <div className="body side right"/>
        </div>
    </div>)
}

export default Fire
