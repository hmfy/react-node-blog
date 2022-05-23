import {Editor} from "@tiptap/react"
import React from "react"
import "assets/icon.css"
import "assets/tiptap-btn.scss"
import {chooseFile, file2Base} from "tools/tools";

function TiptapBtn({editor}: { editor: Editor | null }) {
    if (!editor) return null

    return (
        <div className='btn-list fxs-flex-wrap'>
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
            >
                <i className='ri-bold'/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
            >
                <i className='ri-italic' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                className={editor.isActive('strike') ? 'is-active' : ''}
            >
                <i className='ri-strike' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                <i className='ri-h-1' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                <i className='ri-h-2' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
            >
                <i className='ri-h-3' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
            >
                <i className='ri-h-4' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
            >
                <i className='ri-h-5' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'is-active' : ''}
            >
                <i className='ri-list-unordered' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'is-active' : ''}
            >
                <i className='ri-list-ordered' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'is-active' : ''}
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="19" height="19">
                    <path fill="none" d="M0 0h24v24H0z"/>
                    <path d="M3 3h18a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zm1 2v14h16V5H4zm8 10h6v2h-6v-2zm-3.333-3L5.838 9.172l1.415-1.415L11.495 12l-4.242 4.243-1.415-1.415L8.667 12z" fill="#000"/>
                </svg>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleCode().run()}
                className={editor.isActive('code') ? 'is-active' : ''}
            >
                <i className='ri-code' />
            </button>
            <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
            >
                <i className='ri-blockquote' />
            </button>
            <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                <i className='ri-horizontal' />
            </button>
            <button onClick={() => editor.chain().focus().undo().run()}>
                <i className='ri-undo' />
            </button>
            <button onClick={() => editor.chain().focus().redo().run()}>
                <i className='ri-redo' />
            </button>
            <button onClick={() => {
                chooseFile().then(async fileList => {
                    const base64 = await file2Base(fileList[0])
                    editor.chain().focus().setImage({ src: base64 }).run()
                })
            }}>
                <i className='ri-image' />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('left').run()}>
                <i className='ri-align-left' />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('center').run()}>
                <i className='ri-align-center' />
            </button>
            <button onClick={() => editor.chain().focus().setTextAlign('right').run()}>
                <i className='ri-align-right' />
            </button>
            <button onClick={() => {
                const href = window.prompt('url:')
                editor.chain().focus().extendMarkRange('link').setLink({
                    href: href as string
                }).run()
            }}>
                <i className='ri-link' />
            </button>
            <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
                <i className='ri-underline' />
            </button>
            {/*<button>
                <i className='ri-font-size' />
            </button>
            <button>
                <i className='ri-font-color' />
            </button>
            <button>
                <i className='ri-indent' />
            </button>
            <button>
                <i className='ri-upload' />
            </button>
            <button>
                <i className='ri-page-break' />
            </button>
            <button>
                <i className='ri-left-rotate' />
            </button>
            <button>
                <i className='ri-right-rotate' />
            </button>*/}
        </div>
    )
}

export default TiptapBtn
