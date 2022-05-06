import React, {useEffect, useState} from "react";
import {getDisplay, scrollAnimation} from "tools/tools"
import Fire from "comps/Fire";
import "assets/fire.scss"

type Props = {
    elem?: any,
    domType?: string,
    visibleHeight?: number
}

const root = document.getElementById("root")

function IsBackTop({ elem = root, domType = 'element', visibleHeight = 400 }: Props) {
    const [animate, setAnimate] = useState('is-back-top');
    const [show, setShow] = useState(false);
    const getElem = () => domType === 'element' ? elem : elem.el
    const resetAnimation = () => setAnimate('is-back-top')
    useEffect(() => {
        if (elem) {
            const dom = getElem()
            const control = () => {
                const num = dom.scrollTop
                if (num > visibleHeight) {
                    return setShow(true)
                }
                if (num === 0) return setShow(false)
            }
            dom.removeEventListener('scroll', control)
            dom.addEventListener('scroll', control)
        }
    }, [elem, domType, visibleHeight, getElem])
    return (
        <div className={animate + ' fxs-rocket-offset'}
             onAnimationEnd={resetAnimation}
             onClick={() => {
                 scrollAnimation(getElem())
                 setAnimate('is-back-top back-top-animation')
             }}>
            <div style={{display: getDisplay(show)}}>
                <Fire/>
            </div>
        </div>
    )
}

export default IsBackTop
