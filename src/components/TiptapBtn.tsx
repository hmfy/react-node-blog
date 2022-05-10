import {Editor} from "@tiptap/react"
import React from "react"
import "assets/icon.css"
import "assets/tiptap-btn.scss"

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
            <button>
                <i className='ri-image' />
            </button>
            <button>
                <i className='ri-link' />
            </button>
            <button>
                <i className='ri-align-left' />
            </button>
            <button>
                <i className='ri-align-left' />
            </button>
            <button>
                <i className='ri-align-right' />
            </button>
            <button>
                <i className='ri-underline' />
            </button>
            <button>
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
                <i className='ri-paste' />
            </button>
            <button>
                <i className='ri-copy' />
            </button>
            <button>
                <i className='ri-left-rotate' />
            </button>
            <button>
                <i className='ri-right-rotate' />
            </button>
        </div>
    )
}

export default TiptapBtn
