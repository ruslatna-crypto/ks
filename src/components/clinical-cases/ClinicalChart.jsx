import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export default function ClinicalChart({ chartData, lang = 'ru' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  if (!chartData || chartData.length === 0) return null;

  // ViewBox parameters
  const width = 640;
  const height = 240;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 30;
  const padBottom = 50;

  const chartW = width - padLeft - padRight;
  const chartH = height - padTop - padBottom;

  const maxVal = 1200;
  const minVal = 0;

  const points = chartData.map((d, i) => {
    const x = padLeft + (i / (chartData.length - 1)) * chartW;
    const y = padTop + chartH - ((d.volume - minVal) / (maxVal - minVal)) * chartH;
    return { ...d, x, y, index: i };
  });

  const lineD = points.reduce((acc, p, i) => {
    return i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`;
  }, '');

  const areaD = `${lineD} L ${points[points.length - 1].x} ${padTop + chartH} L ${points[0].x} ${padTop + chartH} Z`;

  const yTicks = [0, 300, 600, 900, 1200];

  return (
    <div className="clinical-chart-container">
      <div className="clinical-chart-header">
        <h4 className="clinical-chart-title">
          <Activity size={18} color="var(--color-primary, #3e4095)" />
          {lang === 'en'
            ? 'Dynamics of Residual Urine Volume Reduction'
            : 'Динамика снижения остаточного объема мочи'}
        </h4>
        <p className="clinical-chart-subtitle">
          {lang === 'en'
            ? 'Chronological measurements during infrared resonance therapy (ml)'
            : 'Хронологические измерения в ходе курса инфракрасной резонансной терапии (мл)'}
        </p>
      </div>

      <div className="clinical-chart-svg-wrap">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ width: '100%', height: 'auto', display: 'block' }}
          role="img"
          aria-label={lang === 'en' ? 'Residual urine volume chart' : 'График остаточного объема мочи'}
        >
          <defs>
            <linearGradient id="urineGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3e4095" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3e4095" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal grid lines and labels */}
          {yTicks.map(val => {
            const y = padTop + chartH - ((val - minVal) / (maxVal - minVal)) * chartH;
            return (
              <g key={val}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  stroke="#e2e8f0"
                  strokeDasharray="3 3"
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  fontSize="11"
                  fill="#64748b"
                  fontFamily="system-ui, sans-serif"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Area fill */}
          <path d={areaD} fill="url(#urineGrad)" />

          {/* Line */}
          <path
            d={lineD}
            fill="none"
            stroke="#3e4095"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}
          {points.map((p, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <g
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{ cursor: 'pointer' }}
              >
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4}
                  fill={isHovered ? '#ea580c' : '#3e4095'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  transition="r 0.15s ease"
                />
                {/* X labels for key points */}
                {(idx === 0 || idx === 4 || idx === 7 || idx === points.length - 1 || isHovered) && (
                  <text
                    x={p.x}
                    y={padTop + chartH + 20}
                    textAnchor="middle"
                    fontSize="10"
                    fill={isHovered ? '#3e4095' : '#64748b'}
                    fontWeight={isHovered ? 'bold' : 'normal'}
                    fontFamily="system-ui, sans-serif"
                  >
                    {lang === 'en' ? p.dayEn : p.dayRu}
                  </text>
                )}
                {/* Tooltip badge on hover */}
                {isHovered && (
                  <g pointerEvents="none">
                    <rect
                      x={p.x - 45}
                      y={p.y - 36}
                      width="90"
                      height="26"
                      rx="4"
                      fill="#0f172a"
                      opacity="0.9"
                    />
                    <text
                      x={p.x}
                      y={p.y - 19}
                      textAnchor="middle"
                      fontSize="11"
                      fill="#ffffff"
                      fontWeight="bold"
                      fontFamily="system-ui, sans-serif"
                    >
                      {p.volume} {lang === 'en' ? 'ml' : 'мл'}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="clinical-chart-disclaimer">
        <span>*</span>
        {lang === 'en'
          ? 'Data presented according to original clinical observation materials.'
          : 'Данные приведены по материалам исходного клинического наблюдения.'}
      </div>
    </div>
  );
}
