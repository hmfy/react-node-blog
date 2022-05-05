import { EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'
import React from "react";
import "assets/tiptap.scss"
import CodeBlockComponent from "comps/CodeBlockComponent";
import TiptapBtn from "./TiptapBtn"

const content = "<p>hello world</p>"

function Tiptap() {
    const editor = useEditor({
        extensions: [
            Starterkit,
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    },
                })
                .configure({
                    lowlight
                })
        ],
        content: content,
        autofocus: 'end'
    })
    return (<div className="editor">
        <TiptapBtn editor={editor}/>
        <EditorContent editor={editor}/>
    </div>)
}

export default Tiptap
