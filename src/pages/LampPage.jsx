import React, { useState, useRef, useEffect } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const EMITTER_TYPES_DATA = [
  {
    id: 'gi',
    titleRu: 'Излучатель GI',
    titleEn: 'Emitter GI',
    itemsRu: [
      'Наличие бактериальной инфекции в организме, воспалительных процессов различной локализации.',
      'Заболевания, вызванные простейшими (амебиаз, лямблиоз, трихомониаз и т.д.)',
      'Наличие уреаплазменной инфекции, хламидиаза.',
      'Послеоперационные состояния для предотвращения развития вторичной инфекции, снятие перифокального воспаления.',
      'Ушибы, травмы, раны.',
      'Гиперхолестеринемия.',
      'Удаление патологической жировой ткани.',
      'Маститы, перитониты, трофические язвы, гангрена, рожа, сепсис, ожоги, особенно больших поверхностей, стерилизация и ускорение заживления ран.',
      'Нормализация кишечной микрофлоры.',
      'Стимуляции работы надпочечников.',
      'Псориаз и другие кожные заболевания.',
      'Все гнойные процессы.',
      'Дисбаланс гормонов.',
      'Ревмокардит и др. подобные заболевания.',
      'Снятие болевого синдрома.'
    ],
    itemsEn: [
      'Presence of bacterial infections in the body, inflammatory processes of various localizations.',
      'Diseases caused by protozoa (amebiasis, giardiasis, trichomoniasis, etc.).',
      'Presence of ureaplasma infection, chlamydia.',
      'Postoperative conditions to prevent secondary infections and reduce perifocal inflammation.',
      'Bruises, injuries, wounds.',
      'Hypercholesterolemia.',
      'Removal of pathological fatty tissue.',
      'Mastitis, peritonitis, trophic ulcers, gangrene, erysipelas, sepsis, burns (especially extensive ones), sterilization, and acceleration of wound healing.',
      'Normalization of intestinal microflora.',
      'Stimulation of adrenal gland function.',
      'Psoriasis and other skin diseases.',
      'All purulent processes.',
      'Hormonal imbalance.',
      'Rheumocarditis and similar diseases.',
      'Pain relief.'
    ]
  },
  {
    id: 'af',
    titleRu: 'Излучатель AF',
    titleEn: 'Emitter AF',
    itemsRu: [
      'Микозы различной этиологии и локализации.',
      'Удаление жидкости из патологических очагов (киста, пораженный сустав и др.)'
    ],
    itemsEn: [
      'Mycoses of various etiologies and localizations.',
      'Removal of fluid from pathological foci (cysts, affected joints, etc.).'
    ]
  },
  {
    id: 'rv',
    titleRu: 'Излучатель RV',
    titleEn: 'Emitter RV',
    itemsRu: [
      'Заболевания вирусной этиологии.',
      'Доброкачественные и злокачественные опухоли.',
      'Профилактика вирусных и опухолевых заболеваний.',
      'Элиминация свободных радикалов (дезинтоксикация).',
      'Профилактика, лечение инфаркта миокарда и ишемических поражений органов.',
      'Снятие болевого синдрома при злокачественных и доброкачественных процессах.'
    ],
    itemsEn: [
      'Diseases of viral etiology.',
      'Benign and malignant tumors.',
      'Prevention of viral and tumor diseases.',
      'Elimination of free radicals (detoxification).',
      'Prevention and treatment of myocardial infarction and ischemic organ damage.',
      'Pain relief in malignant and benign conditions.'
    ]
  },
  {
    id: 'rc',
    titleRu: 'Излучатель RC',
    titleEn: 'Emitter RC',
    itemsRu: [
      'Онкологические заболевания (доброкачественной и злокачественной природы).',
      'Предотвращение процесса метастазирования.',
      'Заболевания вирусной этиологии.',
      'Эффективно при поражении печени и легких эхинококками.',
      'Быстрое снятие явлений, связанных с сотрясением мозга.',
      'Профилактика вирусных и опухолевых заболеваний.',
      'Элиминация свободных радикалов (дезинтоксикация).',
      'Профилактика и лечение ишемических поражений органов.',
      'Профилактика и лечение реперфузионных повреждений органов.',
      'Снятие болевого синдрома при злокачественных и доброкачественных процессах.'
    ],
    itemsEn: [
      'Oncological diseases (benign and malignant).',
      'Prevention of metastasis.',
      'Diseases of viral etiology.',
      'Effective for liver and lung echinococcosis.',
      'Rapid relief of symptoms associated with concussion.',
      'Prevention of viral and tumor diseases.',
      'Elimination of free radicals (detoxification).',
      'Prevention and treatment of ischemic organ damage.',
      'Prevention and treatment of reperfusion injuries of organs.',
      'Pain relief in malignant and benign conditions.'
    ]
  },
  {
    id: 'zb',
    titleRu: 'Излучатель ZB',
    titleEn: 'Emitter ZB',
    itemsRu: [
      'Нарушения микроциркуляции различной этиологии (при сахарном диабете, атеросклерозе, ДЦП, ангиопатии и др.).',
      'Профилактически для поддержания сосудов в состоянии физиологической нормы.',
      'Нормализация работы желчного пузыря и холестеринового обмена (совместно с GI).',
      'Снятие болевого синдрома (при заболеваниях позвоночника).',
      'Рассасывание патологической соединительной ткани.',
      'Ангиопатия.',
      'Лечение заболеваний кишечника и желчного пузыря (в комплексе с другими излучателями).',
      'Атеросклероз.',
      'Стенокардия.',
      'Болезни позвоночника.',
      'Повышение пропускной способности по-чек.',
      'Рассасывание опухолей и аденом.',
      'Ускорение дезинтоксикации организма.'
    ],
    itemsEn: [
      'Microcirculation disorders of various etiologies (in diabetes mellitus, atherosclerosis, cerebral palsy, angiopathy, etc.).',
      'Preventive use to maintain blood vessels in a physiologically normal state.',
      'Normalization of gallbladder function and cholesterol metabolism (in combination with GI).',
      'Pain relief (in spinal diseases).',
      'Resorption of pathological connective tissue.',
      'Angiopathy.',
      'Treatment of intestinal and gallbladder diseases (in combination with other emitters).',
      'Atherosclerosis.',
      'Angina pectoris.',
      'Spinal diseases.',
      'Increased renal filtration capacity.',
      'Resorption of tumors and adenomas.',
      'Acceleration of body detoxification.'
    ]
  },
  {
    id: 'ak',
    titleRu: 'Излучатель АК',
    titleEn: 'Emitter AK',
    itemsRu: [
      'Системные поражения соединительной ткани (склеродермия, дерматомиозит, системная красная волчанка, ревматоидный полиартрит, системные васкулиты).',
      'Наличие келлоидных рубцов и спаек.',
      'Эндометриоз.',
      'Цирроз.'
    ],
    itemsEn: [
      'Systemic connective tissue disorders (scleroderma, dermatomyositis, systemic lupus erythematosus, rheumatoid polyarthritis, systemic vasculitis).',
      'Presence of keloid scars and adhesions.',
      'Endometriosis.',
      'Cirrhosis.'
    ]
  },
  {
    id: 'av',
    titleRu: 'Излучатель AV',
    titleEn: 'Emitter AV',
    itemsRu: [
      'При заболеваниях вен.',
      'Фарингиты.'
    ],
    itemsEn: [
      'For venous diseases.',
      'Pharyngitis.'
    ]
  },
  {
    id: 'kl',
    titleRu: 'Излучатели К L',
    titleEn: 'Emitters K L',
    itemsRu: [
      'Восстановление иммунитета',
      'Стимуляция поджелудочной железы',
      'Стимуляция тимуса',
      'Нормализующее воздействие на гипоталамус',
      'Ускорение восстановления организма после больших физических и эмоциональных нагрузок',
      'Аллергические состояния',
      'Снятие болевого синдрома'
    ],
    itemsEn: [
      'Immune system restoration',
      'Stimulation of the pancreas',
      'Stimulation of the thymus',
      'Normalizing effect on the hypothalamus',
      'Accelerated recovery after significant physical and emotional stress',
      'Allergic conditions',
      'Pain relief'
    ]
  },
  {
    id: 'kb',
    titleRu: 'Излучатели К B',
    titleEn: 'Emitters K B',
    itemsRu: [
      'Воздействует на цикл Кребса и ускоряет заживление костной ткани.'
    ],
    itemsEn: [
      'It affects the Krebs cycle and accelerates bone tissue healing.'
    ]
  }
];

const ST_INDICATIONS_DATA = [
  {
    id: 'urology',
    titleRu: 'Урология и андрология',
    titleEn: 'Urology and andrology',
    itemsRu: [
      'Простатит (острая и хроническая формы)',
      'Уретрит',
      'Эректильная дисфункция (импотенция)',
      'Энурез'
    ],
    itemsEn: [
      'Prostatitis (acute and chronic forms)',
      'Urethritis',
      'Erectile dysfunction (impotence)',
      'Enuresis'
    ]
  },
  {
    id: 'gynecology',
    titleRu: 'Гинекология и репродуктивное здоровье',
    titleEn: 'Gynecology and reproductive health',
    itemsRu: [
      'Эндометрит (острый, хронический, послеродовой)',
      'Миома матки и кисты яичников (в составе консервативной терапии)',
      'Бартолинит',
      'Бесплодие различного генеза, привычное невынашивание беременности'
    ],
    itemsEn: [
      'Endometritis (acute, chronic, postpartum)',
      'Uterine fibroids and ovarian cysts (as part of conservative therapy)',
      'Bartholinitis',
      'Infertility of various origins, recurrent pregnancy loss'
    ]
  },
  {
    id: 'proctology',
    titleRu: 'Проктология и гастроэнтерология',
    titleEn: 'Proctology and gastroenterology',
    itemsRu: [
      'Геморрой',
      'Колит, кишечные колики',
      'Холецистит'
    ],
    itemsEn: [
      'Hemorrhoids',
      'Colitis, intestinal colic',
      'Cholecystitis'
    ]
  },
  {
    id: 'vascular',
    titleRu: 'Сосудистая система и ангиология',
    titleEn: 'Vascular system and angiology',
    itemsRu: [
      'Варикозное расширение вен',
      'Облитерирующий эндартериит',
      'Диабетическая ангиопатия'
    ],
    itemsEn: [
      'Varicose veins',
      'Endarteritis obliterans',
      'Diabetic angiopathy'
    ]
  },
  {
    id: 'neurology',
    titleRu: 'Неврология и опорно-двигательный аппарат',
    titleEn: 'Neurology and musculoskeletal system',
    itemsRu: [
      'Остеохондроз пояснично-крестцового отдела позвоночника',
      'Полиневриты, неврастения'
    ],
    itemsEn: [
      'Osteochondrosis of the lumbosacral spine',
      'Polyneuritis, neurasthenia'
    ]
  },
  {
    id: 'recovery',
    titleRu: 'Общее восстановление и эндокринология',
    titleEn: 'General recovery and endocrinology',
    itemsRu: [
      'Сахарный диабет (компенсация нарушений углеводного обмена)',
      'Синдром хронической усталости, общее истощение, упадок сил',
      'Реабилитация в послеоперационном периоде'
    ],
    itemsEn: [
      'Diabetes mellitus (compensation of carbohydrate metabolism disorders)',
      'Chronic fatigue syndrome, general exhaustion, loss of strength',
      'Rehabilitation in the postoperative period'
    ]
  }
];

const LampPage = () => {
  const { lang } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const textRef = useRef(null);
  const [photoMaxHeight, setPhotoMaxHeight] = useState(null);

  const installationTextRef = useRef(null);
  const [chairMaxHeight, setChairMaxHeight] = useState(null);

  useEffect(() => {
    const updateDimensions = () => {
      const isDesktop = window.innerWidth > 860;

      // Размер лампы наверху: на 20% выше текста слева, но не более
      if (textRef.current && isDesktop) {
        const h = textRef.current.offsetHeight;
        if (h > 0) {
          setPhotoMaxHeight(Math.round(h * 1.2));
        }
      } else {
        setPhotoMaxHeight(null);
      }

      // Размер стула (Установка «СТ»): на 10% выше текста справа, но не более
      if (installationTextRef.current && isDesktop) {
        const h = installationTextRef.current.offsetHeight;
        if (h > 0) {
          setChairMaxHeight(Math.round(h * 1.1));
        }
      } else {
        setChairMaxHeight(null);
      }
    };

    updateDimensions();

    const ro = typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => updateDimensions())
      : null;

    if (ro) {
      if (textRef.current) ro.observe(textRef.current);
      if (installationTextRef.current) ro.observe(installationTextRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    return () => {
      if (ro) ro.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, [lang]);

  const [lightboxIndex, setLightboxIndex] = useState(0);

  const breadcrumbs = [
    { title: lang === 'en' ? 'Developments' : 'Разработки' },
    { title: lang === 'en' ? 'Lamps for local use' : 'Лампы локального назначения' }
  ];

  const galleryImages = [
    {
      url: '/images/lamp/rc600.png',
      alt: lang === 'en' ? 'Infrared local emitter lamp' : 'Инфракрасная лампа локального назначения'
    },
    {
      url: '/images/lamp/ustanovka_st.png',
      alt: lang === 'en' ? 'Installation «ST»' : 'Установка «СТ»'
    }
  ];

  return (
    <div className="page-wrap">
      <SEO
        title={lang === 'en' ? 'Lamps for local use — KERAMIKA SINTEZ' : 'Лампы локального назначения — KERAMIKA SINTEZ'}
        description={lang === 'en'
          ? 'Infrared ceramic emitter lamps for local application: GI, AF, RV, RC, ZB, AK, AV, KL, KB.'
          : 'Инфракрасные керамические излучатели локального назначения: типы ламп GI, AF, RV, RC, ZB, АК, AV, KL, KB. Описание медицинского и терапевтического спектра воздействия.'}
        canonicalPath={lang === 'en' ? '/en/lamp' : '/lamp'}
        ruPath="/lamp"
        enPath="/en/lamp"
        image="/images/lamp/rc600.png"
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        {/* Page Title */}
        <div style={{ marginBottom: 24 }}>
          <h1 className="page-title-heading">
            {lang === 'en' ? 'Lamps for local use' : 'Лампы локального назначения'}
          </h1>
        </div>

        {/* Two-Column Intro Section (Requirements 2-7) */}
        <div className="lamp-intro-grid">
          <div className="lamp-intro-text" ref={textRef}>
            <p>
              <strong>{lang === 'en' ? 'IR lamps' : 'ИК-лампы'}</strong>{' '}
              {lang === 'en'
                ? '— are infrared ceramic emitters with a specialized ceramic coating designed to convert electrical energy into far-infrared radiation. They provide directed transmission of infrared energy to an object or a specific area of the body.'
                : '— это инфракрасные керамические излучатели со специальным керамическим покрытием, предназначенные для преобразования электрической энергии в инфракрасное излучение дальнего диапазона. Они обеспечивают направленную передачу инфракрасной энергии на объект или определённый участок тела.'}
            </p>
            <p>
              {lang === 'en'
                ? 'Depending on the design and type of emitter, its spectral characteristics, radiation intensity, and scope of application vary. IR lamps can be used for general or local exposure.'
                : 'В зависимости от конструкции и типа излучателя изменяются его спектральные характеристики, интенсивность излучения и область применения. ИК-лампы могут использоваться для общего или локального воздействия.'}
            </p>
          </div>
          <div className="lamp-intro-photo-wrap">
            <img
              src="/images/lamp/rc600.png"
              alt={lang === 'en' ? 'Infrared local emitter lamp' : 'Инфракрасная лампа локального назначения'}
              className="lamp-intro-photo"
              onClick={() => {
                setLightboxIndex(0);
                setLightboxOpen(true);
              }}
              style={{
                cursor: 'pointer',
                maxHeight: photoMaxHeight ? `${photoMaxHeight}px` : undefined
              }}
              title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
            />
          </div>
        </div>

        {/* Main Section Heading: ТИПЫ ЛАМП */}
        <div>
          <h2 className="lamp-section-heading">
            {lang === 'en' ? 'TYPES OF LAMPS' : 'ТИПЫ ЛАМП'}
          </h2>
        </div>

        {/* All 9 Emitter Types - Strict Scientific List (Requirements 8-12) */}
        <div className="lamp-types-document">
          {EMITTER_TYPES_DATA.map((emitter) => {
            const title = lang === 'en' ? emitter.titleEn : emitter.titleRu;
            const items = lang === 'en' ? emitter.itemsEn : emitter.itemsRu;

            return (
              <div key={emitter.id} className="lamp-type-block">
                <h3 className="lamp-type-title">
                  <span className="lamp-type-title-bullet">•</span>
                  <span>{title}</span>
                </h3>
                <ul className="lamp-type-indications">
                  {items.map((item, iIdx) => (
                    <li key={iIdx} className="lamp-type-indication-item">
                      <span className="lamp-dash">–</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        {/* Installation "ST" Section (Requirements 1-16) */}
        <section className="lamp-installation-section">
          <div className="lamp-installation-grid">
            <div className="lamp-installation-photo-wrap">
              <img
                src="/images/lamp/ustanovka_st.png"
                alt={lang === 'en' ? 'Installation «ST»' : 'Установка «СТ»'}
                className="lamp-installation-photo"
                onClick={() => {
                  setLightboxIndex(1);
                  setLightboxOpen(true);
                }}
                style={{
                  cursor: 'pointer',
                  maxHeight: chairMaxHeight ? `${chairMaxHeight}px` : undefined
                }}
                title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
              />
            </div>
            <div className="lamp-installation-text" ref={installationTextRef}>
              <h2 className="lamp-installation-title">
                {lang === 'en' ? 'Installation «ST»' : 'Установка «СТ»'}
              </h2>
              <p>
                {lang === 'en'
                  ? 'The "ST" installation is a specialized physiotherapeutic system for procedures using infrared emitters. The system is equipped with GI and KL emitters, which enable general and local exposure on various parts of the body, including the pelvic organs and perineum. The unit can be used in the comprehensive treatment of diseases and inflammatory processes of the pelvic organs, including prostatitis, cystitis, urethritis, endometritis, adnexitis, colpitis, vulvovaginitis, as well as certain diseases of the rectum and other adjacent areas. The combination of emitters and exposure modes is selected according to the purpose of the procedure and the individual characteristics of the patient.'
                  : 'Установка «СТ» — специализированная физиотерапевтическая система для проведения процедур с использованием инфракрасных излучателей. Установка оснащается излучателями GI и KL, которые позволяют осуществлять общее и локальное воздействие на различные участки тела, в том числе на область органов малого таза и промежность. Установка может применяться в комплексной терапии заболеваний и воспалительных процессов органов малого таза, включая простатит, цистит, уретрит, эндометрит, аднексит, кольпит, вульвовагинит, а также при некоторых заболеваниях прямой кишки и других прилегающих областей. Сочетание излучателей и режимов воздействия подбирается в соответствии с назначением процедуры и индивидуальными особенностями пациента.'}
              </p>
            </div>
          </div>
        </section>

        {/* Indications for Use Section */}
        <section className="lamp-indications-section">
          <h2 className="lamp-section-heading">
            {lang === 'en'
              ? 'Indications for use'
              : 'Показания к применению'}
          </h2>

          <div className="lamp-indications-document">
            {ST_INDICATIONS_DATA.map((cat) => {
              const title = lang === 'en' ? cat.titleEn : cat.titleRu;
              const items = lang === 'en' ? cat.itemsEn : cat.itemsRu;

              return (
                <div key={cat.id} className="lamp-indication-category">
                  <h3 className="lamp-category-title">
                    <span className="lamp-category-title-bullet">•</span>
                    <span>{title}:</span>
                  </h3>
                  <ul className="lamp-category-items">
                    {items.map((item, iIdx) => (
                      <li key={iIdx} className="lamp-category-item">
                        <span className="lamp-dash">–</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="lamp-note">
            <p>
              {lang === 'en'
                ? 'Note: The installation is used as prescribed by a specialist, taking into account individual indications and contraindications.'
                : 'Примечание: Применение установки осуществляется по назначению специалиста с учётом индивидуальных показаний и противопоказаний.'}
            </p>
          </div>
        </section>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        images={galleryImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
      />
    </div>
  );
};

export default LampPage;
