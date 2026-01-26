'use client';

import dynamic from 'next/dynamic';
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
    return (
        <div className="h-full flex flex-col relative">
            <ReactQuill
                theme="snow"
                value={value}
                onChange={onChange}
                className="flex-1 h-full rounded-xl overflow-hidden [&_.ql-container]:h-[calc(100%-42px)] [&_.ql-editor]:h-full border-none bg-white"
                modules={{
                    toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                        [{ 'align': [] }],
                        ['clean']
                    ],
                }}
            />
        </div>
    );
}
