"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Renders assistant replies as nicely-formatted Markdown — proper bold,
 * spaced paragraphs, indented bullet/number lists, links, and small tables.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <div className="space-y-2.5 text-sm leading-relaxed [overflow-wrap:anywhere]">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p>{children}</p>,
          strong: ({ children }) => (
            <strong className="font-semibold text-ink">{children}</strong>
          ),
          em: ({ children }) => <em className="italic">{children}</em>,
          ul: ({ children }) => (
            <ul className="list-disc space-y-1 pl-5 marker:text-coral">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal space-y-1 pl-5 marker:text-ink-dim">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="pl-0.5">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-coral underline underline-offset-2 hover:text-coral-light"
            >
              {children}
            </a>
          ),
          h1: ({ children }) => (
            <h4 className="mt-1 font-display text-base font-bold">{children}</h4>
          ),
          h2: ({ children }) => (
            <h4 className="mt-1 font-display text-base font-bold">{children}</h4>
          ),
          h3: ({ children }) => (
            <h5 className="mt-1 font-display text-sm font-bold">{children}</h5>
          ),
          code: ({ children }) => (
            <code className="bg-white/[0.06] px-1 py-0.5 font-mono text-[0.8em]">
              {children}
            </code>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-2 border-coral pl-3 text-ink-muted">
              {children}
            </blockquote>
          ),
          hr: () => <hr className="border-line" />,
          table: ({ children }) => (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-xs">{children}</table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-line px-2 py-1 text-left font-semibold">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-line px-2 py-1 align-top">{children}</td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
