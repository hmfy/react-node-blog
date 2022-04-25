import React from 'react'
import { Card } from 'antd'

function PageFooter () {
	return (<Card>
		<div style={{
			margin: "0 auto",
			padding: "10px 0",
			width: "350px",
			display: "flex",
			justifyContent: "space-between",
			fontSize: "12px"
		}}>
			<a rel="noreferrer" href={'http://beian.miit.gov.cn/'} target={'_blank'}>
				鄂ICP备19010491号
			</a>
			<a target={'_blank'} rel="noreferrer"
			   href={'http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42112302000086'}>
				<img src={'https://fyang.fun/files/beian.jpg'} alt='' style={{
					display: "inline-block",
					textDecoration: "none",
					height: "20px",
					lineHeight: "20px",
					verticalAlign: "baseline"
				}} />
				<p style={{
					float: "left",
					height: "20px",
					lineHeight: "20px",
					margin: "0 0 0 5px"
				}}>
					鄂公网安备 42112302000086号
				</p>
			</a>
		</div>
	</Card>)
}

export default PageFooter
