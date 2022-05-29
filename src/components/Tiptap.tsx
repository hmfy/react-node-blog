import {Editor, EditorContent, ReactNodeViewRenderer, useEditor} from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"
import { gapCursor } from 'prosemirror-gapcursor'
import { Plugin, PluginKey } from 'prosemirror-state'
import {Extension, mergeAttributes} from "@tiptap/core"
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import Image from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'
import lowlight from 'lowlight'
import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import "assets/tiptap.scss"
import CodeBlockComponent from "comps/CodeBlockComponent";
import {file2Base} from "tools/tools";
import Placeholder from "@tiptap/extension-placeholder";
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'

type Props = { initialValue?: string, setEditor?: Dispatch<SetStateAction<Editor | null>>, editable?: boolean }

const TabIndent = Extension.create({
    addKeyboardShortcuts() {
        return {
            'Tab': () => this.editor.commands.insertContent('\t')
        }
    }
})

const customCodeBlock = CodeBlockLowlight.extend({
    addNodeView() {
        return ReactNodeViewRenderer(CodeBlockComponent)
    }
})
    .configure({
        lowlight
    })

// 阻止默认事件Function
function forbidDefaultEvent (e:any) {
    e.preventDefault();
}

const FyImage = Image.extend({
    name: 'fyImage',
    renderHTML({ HTMLAttributes }) {
        return [
            'div',
            mergeAttributes({
                style: "display: block; margin: 0 auto;min-height: 60px;max-width: 100%;",
                class: 'img-control'
            }),
            [
                'img',
                mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
            ],
            [
                'span',
                mergeAttributes({ class: 'resize', 'data-resize': true })
            ],
            [
                'span',
                mergeAttributes({ class: 'rotate', 'data-rotate': true })
            ]
        ]
    },
    onCreate2 () {
        (this.editor.view.dom as any).onmousedown = (e:any) => {
            const resizeBtn = e.target.getAttribute('data-resize')
            const biggerBtn = e.target.getAttribute('data-bigger')
            let timer:any = null
            let control = 2
            if (resizeBtn) {
                control = -2
            }
            if (biggerBtn) {
                control = 2
            }
            if (resizeBtn || biggerBtn) {
                if (control > 0) {
                    e.target.parentElement.style.width = 'auto'
                    e.target.parentElement.style.height = 'auto'
                } else {
                    e.target.parentElement.style.width = e.target.parentElement.clientWidth + 'px'
                    e.target.parentElement.style.height = e.target.parentElement.clientHeight + 'px'
                }

                timer = setInterval(() => {
                    const img = e.target.parentElement.getElementsByTagName('img')[0]
                    img.style.width = `${img.clientWidth + control}px`
                }, 100)

                e.target.addEventListener('mouseup', () => {
                    clearTimeout(timer)
                    e.target.parentElement.style.width = 'auto'
                    e.target.parentElement.style.height = 'auto'
                })
            }
        }
    },
    onCreate () {
        let initWidth = 0
        let initX = 0
        const changeSize = (e:any) => {
            const img = e.target.parentElement.getElementsByTagName('img')[0]
            if (initWidth === 0 && initX === 0) {
                // 初始化
                initWidth = img.clientWidth
                initX = e.pageX
            } else {
                // 缩小或放大
                const compare = e.pageX - initX

                if (compare < 0 && initWidth <= 300)return

                const changeWidth = initWidth + (compare * 2)

                img.parentElement.style.width = changeWidth + 'px'

                // 保存最新尺寸和坐标
                initWidth = changeWidth
                initX = e.pageX
            }
        }
        ;(this.editor.view.dom as any).onmousedown = (e:any) => {
            const curElement = e.target
            const isResize = curElement.getAttribute('data-resize')
            const removeListen = () => {
                curElement.removeEventListener('mousemove', changeSize)
            }

            // 默认会有拖拽的重影，要去除掉
            if (e.target.tagName.toLowerCase() === 'img' || isResize) {
                e.preventDefault()
            }

            if (!isResize) return
            curElement.addEventListener('mousemove', changeSize)
            curElement.addEventListener('mouseleave', removeListen)
            curElement.addEventListener('mouseup', removeListen)
        }
    },
    addProseMirrorPlugins() {
        const editor = this.editor
        return [
            new Plugin({
                key: new PluginKey('eventHandler'),
                props: {
                    handleDrop (view,event:any) {
                        if (!event.dataTransfer) {
                            return false
                        }
                        const file = event.dataTransfer.files[0]
                        if (file) {
                            file2Base(file).then(base64 => {
                                editor.commands.setImage({
                                    src: base64
                                })
                            })
                        }
                        return true
                    }
                },
            }),
            gapCursor()
        ]
    }
})

function replace2Code (content:string) {
    const result = content.replace(/\r\n/g, '<br/>')
    const result2 = result.replace(/\n/g, '<br/>')
    return result2.replace(/\s/g, '&nbsp;')
}

function Tiptap({initialValue = '', setEditor = () => undefined, editable = true}: Props) {
    const editor = useEditor({
        extensions: [
            TabIndent,
            Underline,
            customCodeBlock,
            TextAlign.configure({
                types: ['heading', 'paragraph'],
            }),
            Placeholder.configure({
                placeholder: '写点什么吧......',
                emptyEditorClass: 'is-editor-empty',
                showOnlyWhenEditable: true
            }),
            Link,
            FyImage.configure({
                allowBase64: true,
                // inline: true,
                HTMLAttributes: {
                    class: 'tip-img',
                    draggable: false,
                    style: 'width: 100%;'
                },
            }),
            Starterkit.configure({
                codeBlock: false
            })
        ],
        content: initialValue,
        autofocus: 'end',
        editable: editable
    })
    useEffect(() => {
        // 禁止浏览器打开拖拽的图片
        document.addEventListener('drop', forbidDefaultEvent, false);
        document.addEventListener('dragover', forbidDefaultEvent, false)
        return () => {
            document.removeEventListener('drop', forbidDefaultEvent, false);
            document.removeEventListener('dragover', forbidDefaultEvent, false);
        }
    }, [])
    useEffect(() => {
        editor?.commands.setContent(initialValue)
        // eslint-disable-next-line
    }, [initialValue])
    useEffect(() => {
        setEditor(editor)
    }, [editor, setEditor])
    return <EditorContent editor={editor}/>
}

export default Tiptap
