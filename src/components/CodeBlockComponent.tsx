import React, {useEffect} from 'react'
import {NodeViewWrapper, NodeViewContent} from '@tiptap/react'
import 'assets/atom-one-dark.scss'

type Props = {
    node: {
        attrs: {
            language: string
        }
    }
    updateAttributes: (obj: object) => void
    extension: {
        options: {
            lowlight: {
                listLanguages: () => []
            }
        }
    }
}

function LanguageSelect(props: Props) {
    const {
        node: {
            attrs: {
                language: defaultLanguage
            }
        }, updateAttributes, extension
    } = props
    const languageList = extension.options.lowlight.listLanguages()
    useEffect(() => {
        updateAttributes({
            language: 'javascript'
        })
    }, [updateAttributes])
    return (<div className='select-language' style={{ textAlign: 'right', marginBottom: 10 }}>
        <select style={{
            outline: "1px solid #767676cc",
            borderRadius: 4,
            background: "transparent",
            border: "none"
        }}
                contentEditable={false}
                defaultValue={defaultLanguage}
                onChange={
                    event => updateAttributes({
                        language: event.target.value
                    })
                }>
            <option value="javascript">
                javascript
            </option>
            <option disabled>
                —
            </option>
            {languageList.map((lang, index) =>
                <option key={index} value={lang}> {lang} </option>
            )}
        </select>
    </div>)
}

function CodeBlockComponent (props: Props) {
    return (
        <NodeViewWrapper>
        <pre>
            <LanguageSelect {...props} />
            <NodeViewContent as="code"/>
        </pre>
        </NodeViewWrapper>
    )
}

export default CodeBlockComponent
