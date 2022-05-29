# 个人博客（React，TS）
#### 需要搭配后台使用
https://gitee.com/hmfy/API

#### 新增文件 /src/config.js
```javascript
// 此处 key 与后台搭配使用，简单加解密
const key = `your key from node-rsa`
export default key
```

#### 依赖
    npm i

#### 运行
    npm run dev
    
#### 打包
    npm run build