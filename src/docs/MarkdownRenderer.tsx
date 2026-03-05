import React from "react";

interface Props {
  content: string;
}

/**
 * A lightweight markdown-to-JSX renderer.
 * Handles: headings, paragraphs, bold, blockquotes, tables, lists, code, and links.
 */
const ReactMarkdownRenderer: React.FC<Props> = ({ content }) => {
  const lines = content.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  const parseInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    // Bold + italic patterns
    const regex = /\*\*\*(.*?)\*\*\*|\*\*(.*?)\*\*|\*(.*?)\*|`(.*?)`|\[(.*?)\]\((.*?)\)/g;
    let lastIndex = 0;
    let match;
    let key = 0;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      if (match[1]) {
        parts.push(
          <strong key={key++} className="italic text-foreground font-bold">
            {match[1]}
          </strong>
        );
      } else if (match[2]) {
        parts.push(
          <strong key={key++} className="text-foreground font-semibold">
            {match[2]}
          </strong>
        );
      } else if (match[3]) {
        parts.push(
          <em key={key++} className="italic">
            {match[3]}
          </em>
        );
      } else if (match[4]) {
        parts.push(
          <code
            key={key++}
            className="px-1.5 py-0.5 rounded bg-muted text-primary text-sm font-mono"
          >
            {match[4]}
          </code>
        );
      } else if (match[5] && match[6]) {
        parts.push(
          <a
            key={key++}
            href={match[6]}
            className="text-primary underline hover:text-primary/80"
            target="_blank"
            rel="noreferrer"
          >
            {match[5]}
          </a>
        );
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : [text];
  };

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Headings
    const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
    if (headingMatch) {
      const level = headingMatch[1].length;
      const text = headingMatch[2];
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const className = {
        1: "text-3xl md:text-4xl font-bold text-foreground mb-6 mt-2 gradient-text",
        2: "text-2xl md:text-3xl font-bold text-foreground mb-4 mt-10",
        3: "text-xl md:text-2xl font-semibold text-foreground mb-3 mt-8",
        4: "text-lg font-semibold text-foreground mb-2 mt-6",
        5: "text-base font-semibold text-foreground mb-2 mt-4",
        6: "text-sm font-semibold text-muted-foreground mb-2 mt-4",
      }[level] || "text-xl font-bold text-foreground mb-4";

      const Tag = `h${level}` as keyof JSX.IntrinsicElements;
      elements.push(
        <Tag key={`h-${i}`} id={id} className={className}>
          {parseInline(text)}
        </Tag>
      );
      i++;
      continue;
    }

    // Blockquote
    if (line.trim().startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s*/, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={`bq-${i}`}
          className="border-l-4 border-primary/50 bg-primary/5 rounded-r-lg px-5 py-4 my-4 text-foreground/90"
        >
          {quoteLines.map((ql, qi) => (
            <p key={qi} className={qi > 0 ? "mt-2" : ""}>
              {parseInline(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Table
    if (line.includes("|") && i + 1 < lines.length && lines[i + 1]?.match(/^\|[\s-:|]+\|$/)) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      const headerCells = tableLines[0]
        .split("|")
        .filter((c) => c.trim() !== "")
        .map((c) => c.trim());
      const bodyRows = tableLines.slice(2).map((row) =>
        row
          .split("|")
          .filter((c) => c.trim() !== "")
          .map((c) => c.trim())
      );

      elements.push(
        <div key={`table-${i}`} className="overflow-x-auto my-6 rounded-lg border border-border/50">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/30">
                {headerCells.map((cell, ci) => (
                  <th
                    key={ci}
                    className="text-left px-4 py-3 font-semibold text-foreground border-b border-border/50"
                  >
                    {parseInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, ri) => (
                <tr
                  key={ri}
                  className="border-b border-border/30 last:border-0 hover:bg-muted/10 transition-colors"
                >
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className="px-4 py-3 text-muted-foreground"
                    >
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(lines[i].replace(/^\d+\.\s+/, ""));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`} className="list-decimal list-inside space-y-2 my-4 text-muted-foreground pl-2">
          {items.map((item, ii) => (
            <li key={ii} className="leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Unordered list
    if (line.match(/^-\s/)) {
      const items: string[] = [];
      while (i < lines.length && lines[i].match(/^-\s/)) {
        items.push(lines[i].replace(/^-\s+/, ""));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`} className="list-disc list-inside space-y-2 my-4 text-muted-foreground pl-2">
          {items.map((item, ii) => (
            <li key={ii} className="leading-relaxed">
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Horizontal rule
    if (line.match(/^---+$/)) {
      elements.push(<hr key={`hr-${i}`} className="border-border/50 my-8" />);
      i++;
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} className="text-muted-foreground leading-relaxed mb-4">
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return <div className="docs-article">{elements}</div>;
};

export default ReactMarkdownRenderer;
