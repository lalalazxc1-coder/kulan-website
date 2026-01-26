import React, { Fragment } from 'react';

interface RichTextNode {
    type: string;
    text?: string;
    format?: number;
    children?: RichTextNode[];
    listType?: string;
    fields?: {
        url?: string;
        newTab?: boolean;
    };
    url?: string;
}

interface RichTextProps {
    content: {
        root?: {
            children?: RichTextNode[];
        };
    };
    className?: string;
}

// Sanitize URL to prevent XSS through javascript: protocol
function sanitizeUrl(url: string | undefined): string {
    if (!url) return '#';

    // Block dangerous protocols
    const dangerous = /^(javascript|data|vbscript):/i;
    if (dangerous.test(url.trim())) {
        return '#';
    }

    return url;
}

export const RichTextParser: React.FC<RichTextProps> = ({ content, className }) => {
    if (!content || !content.root || !content.root.children) {
        return null;
    }

    return (
        <div className={className}>
            {serialize(content.root.children)}
        </div>
    );
};

function serialize(children: RichTextNode[]): React.ReactNode {
    return children.map((node, i) => {
        if (!node) return null;

        if (node.type === 'text') {
            let text = <>{node.text}</>;
            const format = node.format ?? 0;
            if (format & 1) text = <strong>{text}</strong>;
            if (format & 2) text = <em>{text}</em>;
            if (format & 8) text = <u>{text}</u>;
            if (format & 16) text = <code>{text}</code>;
            // Strikethrough
            if (format & 4) text = <span className="line-through">{text}</span>;
            return <Fragment key={i}>{text}</Fragment>;
        }

        switch (node.type) {
            case 'h1': return <h1 key={i} className="text-3xl font-bold mb-4 mt-6">{node.children && serialize(node.children)}</h1>;
            case 'h2': return <h2 key={i} className="text-2xl font-bold mb-3 mt-5">{node.children && serialize(node.children)}</h2>;
            case 'h3': return <h3 key={i} className="text-xl font-bold mb-2 mt-4">{node.children && serialize(node.children)}</h3>;
            case 'h4': return <h4 key={i} className="text-lg font-bold mb-2 mt-3">{node.children && serialize(node.children)}</h4>;
            case 'h5': return <h5 key={i} className="text-base font-bold mb-1 mt-2">{node.children && serialize(node.children)}</h5>;
            case 'h6': return <h6 key={i} className="text-sm font-bold mb-1 mt-2">{node.children && serialize(node.children)}</h6>;
            case 'quote': return <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic my-4">{node.children && serialize(node.children)}</blockquote>;
            case 'ul':
            case 'list':
                if (node.listType === 'number') return <ol key={i} className="list-decimal list-inside my-4 space-y-1">{node.children && serialize(node.children)}</ol>;
                return <ul key={i} className="list-disc list-inside my-4 space-y-1">{node.children && serialize(node.children)}</ul>;
            case 'li':
            case 'listitem': return <li key={i}>{node.children && serialize(node.children)}</li>;
            case 'link':
                const href = sanitizeUrl(node.fields?.url || node.url);
                return (
                    <a
                        href={href}
                        key={i}
                        target={node.fields?.newTab ? "_blank" : "_self"}
                        rel={node.fields?.newTab ? "noopener noreferrer" : undefined}
                        className="text-blue-600 hover:underline"
                    >
                        {node.children && serialize(node.children)}
                    </a>
                );
            case 'paragraph':
            default:
                if (node.children && node.children.length === 0) return <br key={i} />;
                return <p key={i} className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">{node.children && serialize(node.children)}</p>;
        }
    });
}
