import React from 'react'
import { Card } from 'antd'

function PageFooter () {
	return (<Card>
		<div className={'bei'}>
			<a rel="noreferrer" href={'http://beian.miit.gov.cn/'} target={'_blank'}>
				鄂ICP备19010491号
			</a>
			<a target={'_blank'} rel="noreferrer"
			   href={'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42112302000086'}>
				<img src={'https://fyang.fun/files/beian.jpg'} alt=''/>
				<p>
					鄂公网安备 42112302000086号
				</p>
			</a>
		</div>
	</Card>)
}

export default PageFooter
