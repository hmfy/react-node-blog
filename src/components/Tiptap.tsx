import {Editor, EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'
import React, {Dispatch, SetStateAction, useEffect} from "react";
import "assets/tiptap.scss"
import CodeBlockComponent from "comps/CodeBlockComponent";
import TiptapBtn from "./TiptapBtn"

type Props = { initialValue?: string, setEditor?: Dispatch<SetStateAction<Editor | null>> }

function Tiptap({ initialValue = '', setEditor = () => {} }: Props) {
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
        content: initialValue,
        autofocus: 'end'
    })
    useEffect(() => {
        setEditor(editor)
    }, [editor])
    return (<div className="editor">
        <TiptapBtn editor={editor}/>
        <EditorContent editor={editor} />
    </div>)
}

export default Tiptap
