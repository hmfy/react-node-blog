import React, {CSSProperties, useState} from "react";
import {scrollAnimation} from "tools/tools"
import Fire from "comps/Fire";
import "assets/fire.scss"

function IsBackTop({elem = document.getElementById("root"), domType = 'element'}: { elem?: any, domType?: string }) {
    const [animate, setAnimate] = useState('is-back-top');
    const resetAnimation = () => setAnimate('is-back-top')
    return (
        <div className={animate}
             onAnimationEnd={resetAnimation}
             onClick={() => {
                 const dom = domType === 'element' ? elem : elem.el
                 if (dom.scrollTop < 50) return
                 scrollAnimation(dom)
                 setAnimate('is-back-top back-top-animation')
             }}>
            <Fire/>
        </div>
    )
}

export default IsBackTop
