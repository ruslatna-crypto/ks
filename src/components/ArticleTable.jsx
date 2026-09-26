import React from 'react';

const ArticleTable = ({ tableData, title, caption }) => {
  if (!tableData || tableData.length === 0) return null;

  const headerRow = tableData[0];
  const bodyRows = tableData.slice(1);

  return (
    <div style={{ margin: '36px 0' }}>
      {title && (
        <h3 style={{ 
          fontSize: '1.25rem', 
          fontWeight: 700, 
          marginBottom: 12, 
          color: 'var(--color-primary)',
          letterSpacing: '-0.01em'
        }}>
          {title}
        </h3>
      )}
      <div className="table-responsive-wrapper">
        <table className="content-table">
          <thead>
            <tr>
              {headerRow.map((cell, idx) => (
                <th key={idx}>{cell}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bodyRows.map((row, rIdx) => (
              <tr key={rIdx}>
                {row.map((cell, cIdx) => (
                  <td key={cIdx}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <p style={{ fontSize: '0.84rem', color: 'var(--color-text-secondary)', marginTop: 8, fontStyle: 'italic' }}>
          {caption}
        </p>
      )}
    </div>
  );
};

export default ArticleTable;
