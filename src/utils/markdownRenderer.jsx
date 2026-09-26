import React from 'react';

/**
 * Safely parses inline markdown tokens (links, bold, italic, inline code)
 * into React elements with zero dangerouslySetInnerHTML (100% XSS safe).
 */
export function renderInlineMarkdown(text) {
  if (!text) return null;

  const tokens = [];
  let remaining = text;
  let keyIdx = 0;

  while (remaining.length > 0) {
    // 1. Link: [text](url)
    const linkMatch = remaining.match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      const [full, linkText, url] = linkMatch;
      const isSafe = /^(https?:\/\/|\/|mailto:|tel:)/i.test(url);
      tokens.push(
        <a 
          key={keyIdx++} 
          href={isSafe ? url : '#'} 
          target={url.startsWith('http') ? '_blank' : undefined} 
          rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
          style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
        >
          {linkText}
        </a>
      );
      remaining = remaining.slice(full.length);
      continue;
    }

    // 2. Bold: **text**
    const boldMatch = remaining.match(/^\*\*([^*]+)\*\*/);
    if (boldMatch) {
      tokens.push(
        <strong key={keyIdx++} style={{ fontWeight: 700, color: 'var(--color-dark)' }}>
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // 3. Italic: *text* or _text_
    const italicMatch = remaining.match(/^(\*|_)([^*_]+)\1/);
    if (italicMatch) {
      tokens.push(<em key={keyIdx++}>{italicMatch[2]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // 4. Inline code: `code`
    const codeMatch = remaining.match(/^`([^`]+)`/);
    if (codeMatch) {
      tokens.push(
        <code 
          key={keyIdx++} 
          style={{ 
            background: 'var(--color-background-alt)', 
            padding: '2px 6px', 
            borderRadius: '4px', 
            fontSize: '0.9em', 
            color: 'var(--color-primary)' 
          }}
        >
          {codeMatch[1]}
        </code>
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // 5. Plain text up to next special char
    const nextSpecial = remaining.search(/(\[|\*\*|\*|_|`)/);
    if (nextSpecial === -1) {
      tokens.push(remaining);
      break;
    } else if (nextSpecial === 0) {
      tokens.push(remaining[0]);
      remaining = remaining.slice(1);
    } else {
      tokens.push(remaining.slice(0, nextSpecial));
      remaining = remaining.slice(nextSpecial);
    }
  }

  return tokens;
}

/**
 * Safely parses and renders full Markdown body:
 * Headings (##, ###), lists (*, -, •), blockquotes (>), images (![alt](url)), and paragraphs.
 */
export function renderMarkdownBody(content) {
  if (!content) return null;
  const lines = content.split('\n');
  const elements = [];

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      elements.push(<div key={`blank-${i}`} style={{ height: '14px' }} />);
      continue;
    }

    // Image: ![alt](url)
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const [, alt, src] = imgMatch;
      elements.push(
        <div key={`img-${i}`} style={{ margin: '24px 0', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-background-alt)' }}>
          <img src={src} alt={alt || ''} loading="lazy" style={{ width: '100%', maxHeight: '420px', objectFit: 'contain', display: 'block' }} />
          {alt && <div style={{ padding: '8px 12px', fontSize: '0.85rem', color: 'var(--color-text-secondary)', textAlign: 'center' }}>{alt}</div>}
        </div>
      );
      continue;
    }

    // Heading 2: ## ...
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${i}`} style={{ fontSize: '20px', fontWeight: 700, color: 'var(--color-dark)', marginTop: '32px', marginBottom: '16px', borderBottom: '1px solid var(--color-border)', paddingBottom: '8px' }}>
          {trimmed.replace(/^##\s+/, '')}
        </h2>
      );
      continue;
    }

    // Heading 3: ### ...
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${i}`} style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-primary)', marginTop: '22px', marginBottom: '10px' }}>
          {trimmed.replace(/^###\s+/, '')}
        </h3>
      );
      continue;
    }

    // Blockquote: > ...
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote key={`quote-${i}`} style={{ margin: '20px 0', padding: '12px 20px', borderLeft: '4px solid var(--color-primary)', background: 'var(--color-background-alt)', fontStyle: 'italic', borderRadius: '0 var(--radius-sm) var(--radius-sm) 0', color: 'var(--color-text)' }}>
          {renderInlineMarkdown(trimmed.replace(/^>\s+/, ''))}
        </blockquote>
      );
      continue;
    }

    // Bullet list: *, -, •
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
      elements.push(
        <div key={`li-${i}`} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '8px', lineHeight: 1.65 }}>
          <span style={{ color: 'var(--color-primary)', fontWeight: 'bold' }}>•</span>
          <span style={{ color: 'var(--color-text)', fontSize: '14px' }}>
            {renderInlineMarkdown(trimmed.replace(/^[*•\-]\s*/, ''))}
          </span>
        </div>
      );
      continue;
    }

    // Paragraph
    elements.push(
      <p key={`p-${i}`} style={{ fontSize: '14px', lineHeight: 1.75, color: 'var(--color-text)', marginBottom: '16px' }}>
        {renderInlineMarkdown(trimmed)}
      </p>
    );
  }

  return elements;
}
