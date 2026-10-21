import React from 'react';
import { Database, FolderTree, Image, Table, Zap } from 'lucide-react';

export default function ClinicalStats({ cases = [], categories = [], lang = 'ru' }) {
  // Automatically computed stats
  const totalCases = cases.length;
  const totalCategories = categories.filter(c => c.id !== 'all').length;
  const casesWithImages = cases.filter(c => c.images && c.images.length > 0).length;
  const casesWithTables = cases.filter(c => c.hasTable).length;

  const allEmitters = new Set();
  cases.forEach(c => {
    if (c.emitters) c.emitters.forEach(em => allEmitters.add(em));
  });
  const totalEmitters = allEmitters.size;

  const stats = [
    {
      icon: Database,
      num: totalCases,
      labelRu: 'Клинических случаев',
      labelEn: 'Clinical Cases'
    },
    {
      icon: FolderTree,
      num: totalCategories,
      labelRu: 'Медицинских категорий',
      labelEn: 'Medical Categories'
    },
    {
      icon: Image,
      num: casesWithImages,
      labelRu: 'Случаев с иллюстрациями',
      labelEn: 'Cases with Imagery'
    },
    {
      icon: Table,
      num: casesWithTables,
      labelRu: 'Случаев с таблицами',
      labelEn: 'Cases with Tables'
    },
    {
      icon: Zap,
      num: totalEmitters,
      labelRu: 'Типов ИК-излучателей',
      labelEn: 'Emitter Types'
    }
  ];

  return (
    <div className="clinical-stats-grid">
      {stats.map((s, idx) => {
        const Icon = s.icon;
        return (
          <div key={idx} className="clinical-stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="clinical-stat-num">{s.num}</span>
              <Icon size={20} color="var(--color-primary-light, #5b5fc7)" opacity={0.7} />
            </div>
            <div className="clinical-stat-label">
              {lang === 'en' ? s.labelEn : s.labelRu}
            </div>
          </div>
        );
      })}
    </div>
  );
}
