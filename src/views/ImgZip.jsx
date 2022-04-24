import React, { useState } from "react";
import {Slider, Upload, message} from 'antd';
import {InboxOutlined, DownloadOutlined} from '@ant-design/icons';
const {Dragger} = Upload;

function formatter(value) {
	return `让图片不超过${value}kb`;
}

function ImgZip() {
	const [ compress, setCompress ] = useState(300)

	const props = {
		name: 'photos',
		multiple: true,
		action: 'https://127.0.0.1:3000/file/zip',
		data: {
			compressVal: compress * 1024, // kb
		},
		async onDownload ({ name }) {
			let a = document.createElement("a")
			a.href = `https://127.0.0.1:3000/file/download?path=${name}&type=zip`
			a.target = 'blank'
			a.click()
		},
		showUploadList: {
			showDownloadIcon: true,
			downloadIcon: <DownloadOutlined/>,
			showRemoveIcon: true,
		},
		beforeUpload: ({ type, size, name }) => {
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
		onChange(info) {
			const {status} = info.file;
			if (status !== 'uploading') {
				console.log(info.file, info.fileList);
			}
			if (status === 'done') {
				message.success(`${info.file.name} file uploaded successfully.`).then(r => r);
			} else if (status === 'error') {
				message.error(`${info.file.name} file upload failed.`).then(r => r);
			}
		},
		onDrop(e) {
			debugger;
			console.log('Dropped files', e.dataTransfer.files);
		},
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
