import {Editor, EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"
import { Extension } from "@tiptap/core"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import lowlight from 'lowlight'
import React, {Dispatch, SetStateAction, useEffect} from "react";
import "assets/tiptap.scss"
import CodeBlockComponent from "comps/CodeBlockComponent";

type Props = { initialValue?: string, setEditor?: Dispatch<SetStateAction<Editor | null>>, editable?: boolean }

const Ident = Extension.create({
    addKeyboardShortcuts() {
        return {
            'Tab': () => this.editor.commands.insertContent('\t')
        }
    }
})

function Tiptap({ initialValue = '', setEditor = () => {}, editable = true }: Props) {
    const editor = useEditor({
        extensions: [
            /*
            *  blockquote: Partial<BlockquoteOptions> | false,
              bold: Partial<BoldOptions> | false,
              bulletList: Partial<BulletListOptions> | false,
              code: Partial<CodeOptions> | false,
              codeBlock: Partial<CodeBlockOptions> | false,
              document: false,
              dropcursor: Partial<DropcursorOptions> | false,
              gapcursor: false,
              hardBreak: Partial<HardBreakOptions> | false,
              heading: Partial<HeadingOptions> | false,
              history: Partial<HistoryOptions> | false,
              horizontalRule: Partial<HorizontalRuleOptions> | false,
              italic: Partial<ItalicOptions> | false,
              listItem: Partial<ListItemOptions> | false,
              orderedList: Partial<OrderedListOptions> | false,
              paragraph: Partial<ParagraphOptions> | false,
              strike: Partial<StrikeOptions> | false,
              text: false,
            * */
            Ident,
            Starterkit.configure({
                codeBlock: false
            }),
            CodeBlockLowlight
                .extend({
                    addNodeView() {
                        return ReactNodeViewRenderer(CodeBlockComponent)
                    }
                })
                .configure({
                    lowlight
                })
        ],
        content: initialValue,
        autofocus: 'end',
        editable: editable
    })
    useEffect(() => {
        editor?.commands.setContent(initialValue)
        // eslint-disable-next-line
    }, [ initialValue ])
    useEffect(() => {
        setEditor(editor)
    }, [editor, setEditor])
    return <EditorContent editor={editor} />
}

export default Tiptap
