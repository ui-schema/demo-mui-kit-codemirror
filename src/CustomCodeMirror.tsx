import React from 'react'
import {
    lineNumbers, highlightActiveLineGutter, highlightSpecialChars,
    drawSelection, dropCursor,
    rectangularSelection, highlightActiveLine, keymap,
    EditorView,
} from '@codemirror/view'
import { foldGutter, indentOnInput, syntaxHighlighting, defaultHighlightStyle, bracketMatching, foldKeymap } from '@codemirror/language'
import { history, defaultKeymap, historyKeymap, indentWithTab } from '@codemirror/commands'
import { highlightSelectionMatches, searchKeymap } from '@codemirror/search'
import { closeBrackets, autocompletion, closeBracketsKeymap, completionKeymap } from '@codemirror/autocomplete'
import { lintKeymap } from '@codemirror/lint'
import { Compartment, EditorState, Extension } from '@codemirror/state'
import { useEditorTheme } from './useEditorTheme'
import { useHighlightStyle } from './useHighlightStyle'
import { CodeMirror, CodeMirrorComponentProps, CodeMirrorProps } from '@ui-schema/kit-codemirror/CodeMirror'
import { useExtension } from '@ui-schema/kit-codemirror/useExtension'
import { TextFieldProps } from '@mui/material'

export interface MuiCodeMirrorStyleProps {
    dense?: boolean
    variant?: TextFieldProps['variant'] | 'embed'
}

export const CustomCodeMirror: React.FC<CodeMirrorComponentProps & MuiCodeMirrorStyleProps> = (
    {
        // values we want to override in this component
        value, extensions, effects,
        dense, variant,
        // everything else is just passed down
        ...props
    },
) => {
    const {onChange} = props
    const theme = useEditorTheme(typeof onChange === 'undefined', dense, variant)
    const highlightStyle = useHighlightStyle()
    const {init: initHighlightExt, effects: effectsHighlightExt} = useExtension(
        () => syntaxHighlighting(highlightStyle || defaultHighlightStyle, {fallback: true}),
        [highlightStyle],
    )
    const {init: initThemeExt, effects: effectsThemeExt} = useExtension(
        () => theme,
        [theme],
    )
    const effectsRef = React.useRef<((editor: EditorView) => void)[]>(effects || [])

    const extensionsAll: Extension[] = React.useMemo(() => [
        lineNumbers(),
        EditorView.lineWrapping,
        highlightActiveLineGutter(),
        highlightSpecialChars(),
        history(),
        foldGutter(),
        drawSelection(),
        dropCursor(),
        EditorState.allowMultipleSelections.of(true),
        new Compartment().of(EditorState.tabSize.of(4)),
        indentOnInput(),
        bracketMatching(),
        closeBrackets(),
        autocompletion(),
        rectangularSelection(),
        highlightActiveLine(),
        highlightSelectionMatches(),
        keymap.of([
            ...closeBracketsKeymap,
            ...defaultKeymap,
            ...searchKeymap,
            ...historyKeymap,
            ...foldKeymap,
            ...completionKeymap,
            ...lintKeymap,
            indentWithTab,
        ]),
        initHighlightExt(),
        initThemeExt(),
        ...(extensions || []),
    ], [extensions, initHighlightExt, initThemeExt])

    // attach parent plugin effects first
    React.useMemo(() => {
        if(!effects) return effectsRef.current
        effectsRef.current.push(...effects)
    }, [effects])

    // attach each plugin effect separately (thus only the one which changes get reconfigured)
    React.useMemo(() => {
        if(!effectsHighlightExt) return
        effectsRef.current.push(...effectsHighlightExt)
    }, [effectsHighlightExt])
    React.useMemo(() => {
        if(!effectsThemeExt) return
        effectsRef.current.push(...effectsThemeExt)
    }, [effectsThemeExt])

    const onViewLifecycle: CodeMirrorProps['onViewLifecycle'] = React.useCallback((view, destroyed) => {
        console.log('on-view-lifecycle', view, destroyed)
    }, [])

    return <CodeMirror
        value={value || ''}
        extensions={extensionsAll}
        onViewLifecycle={onViewLifecycle}
        effects={effectsRef.current.splice(0, effectsRef.current.length)}
        {...props}
        // className={className}
    />
}
