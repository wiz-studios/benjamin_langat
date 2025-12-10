"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Link from "@tiptap/extension-link"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
    Bold,
    Italic,
    List,
    ListOrdered,
    Heading2,
    Link2,
    Undo,
    Redo,
    CornerDownLeft,
} from "lucide-react"

interface RichTextEditorProps {
    value: string
    onChange: (html: string) => void
    placeholder?: string
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
    const editor = useEditor({
        immediatelyRender: false, // Required for Next.js SSR
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [2, 3],
                },
                // Enable hard breaks (Shift+Enter)
                hardBreak: {
                    keepMarks: true,
                },
            }),
            Link.configure({
                openOnClick: false,
                HTMLAttributes: {
                    class: "text-blue-600 underline cursor-pointer",
                },
            }),
        ],
        content: value,
        onUpdate: ({ editor }) => {
            onChange(editor.getHTML())
        },
        editorProps: {
            attributes: {
                class:
                    "prose prose-sm max-w-none focus:outline-none min-h-[200px] p-4 border rounded-md",
            },
        },
    })

    // Update editor content when value changes externally
    useEffect(() => {
        if (editor && value !== editor.getHTML()) {
            editor.commands.setContent(value)
        }
    }, [value, editor])

    if (!editor) {
        return null
    }

    const setLink = () => {
        const url = window.prompt("Enter URL:")
        if (url) {
            editor.chain().focus().setLink({ href: url }).run()
        }
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-1">
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    className={editor.isActive("bold") ? "bg-gray-200" : ""}
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    className={editor.isActive("italic") ? "bg-gray-200" : ""}
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px bg-gray-300 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={editor.isActive("heading", { level: 2 }) ? "bg-gray-200" : ""}
                    title="Heading"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <div className="w-px bg-gray-300 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={editor.isActive("bulletList") ? "bg-gray-200" : ""}
                    title="Bullet List"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={editor.isActive("orderedList") ? "bg-gray-200" : ""}
                    title="Numbered List"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px bg-gray-300 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().setHardBreak().run()}
                    title="Line Break (Shift+Enter)"
                >
                    <CornerDownLeft className="h-4 w-4" />
                </Button>
                <div className="w-px bg-gray-300 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={setLink}
                    title="Insert Link"
                >
                    <Link2 className="h-4 w-4" />
                </Button>
                <div className="w-px bg-gray-300 mx-1" />
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    title="Undo"
                >
                    <Undo className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    title="Redo"
                >
                    <Redo className="h-4 w-4" />
                </Button>
            </div>

            {/* Editor */}
            <EditorContent editor={editor} />
        </div>
    )
}
