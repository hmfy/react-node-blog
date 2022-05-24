import React, {useState} from "react";
import { baseUrl } from 'tools/tools'
import {Slider, Upload, message} from 'antd';
import {InboxOutlined, DownloadOutlined} from '@ant-design/icons';
import {RcFile, UploadChangeParam} from "antd/es/upload";
import {UploadFile} from "antd/es/upload/interface";
const {Dragger} = Upload;

interface FileInfo extends RcFile {
	status?: 'uploading' | 'done' | 'error',
}
function formatter(value?: number | undefined) {
	return `让图片不超过${value}kb`;
}
function ImgZip() {
	const [ compress, setCompress ] = useState(300)

	const uid2ServerFile = new Map()

	const props = {
		name: 'photos',
		multiple: true,
		action: `${baseUrl}/file/zip2`,
		data: {
			compressVal: compress * 1024, // kb
		},
		async onDownload ({uid}:UploadFile) {debugger
			let a = document.createElement("a")
			a.href = `${baseUrl}/file/download2?path=${uid2ServerFile.get(uid)}&type=zip`
			a.target = 'blank'
			a.click()
		},
		showUploadList: {
			showDownloadIcon: true,
			downloadIcon: <DownloadOutlined/>,
			showRemoveIcon: true,
		},
		beforeUpload: ({type, size, name}:FileInfo) => {
			const isPNG = type.includes('image');
			const needZip = size > compress * 1024
			if (!isPNG) {
				message.error(`${name} is not a png file`).then(r => r);
			}
			if (!needZip) {
				message.info(`${name} does not need to be compressed`).then(r => r);
			}
			return (isPNG && needZip) || Upload.LIST_IGNORE
		},
		onChange(info: UploadChangeParam) {
			const {status} = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				uid2ServerFile.set(info.file.uid, info.file.response[0].filename)
				message.success(`${info.file.name} file uploaded successfully.`).then(r => r);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`).then(r => r);
			}
		}
	}

	return (
		<div style={{
			width: '500px',
			margin: '0 auto',
			paddingTop: '50px'
		}}>
			<div>
				<Slider tipFormatter={formatter} max={1000} min={200}
						onChange={ setCompress } step={100}
						value={compress} tooltipVisible />
			</div>
			<Dragger {...props}>
				<p className="ant-upload-drag-icon">
					<InboxOutlined/>
				</p>
				<p className="ant-upload-text">Click or drag file to this area to upload</p>
				<p className="ant-upload-hint">
					Support for a single or bulk upload. Strictly prohibit from uploading company data or other
					band files
				</p>
			</Dragger>
		</div>
	)
}

export default ImgZip
