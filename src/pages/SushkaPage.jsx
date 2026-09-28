import React, { useState } from 'react';
import Breadcrumbs from '../components/Breadcrumbs';
import Lightbox from '../components/Lightbox';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { getLocalizedImage } from '../utils/imageLocalization';

const DRYING_TIMES_DATA = [
  {
    id: 'greens',
    img: '/images/sushka/i-2_640.png',
    nameRu: 'Укроп, петрушка и другая зелень',
    nameEn: 'Dill, parsley, and other greens',
    timeRu: 'от 15–20 мин.',
    timeEn: 'from 15–20 min.',
    imgIndex: 1
  },
  {
    id: 'garlic',
    img: '/images/sushka/l_39600_640.jpg',
    nameRu: 'Чеснок',
    nameEn: 'Garlic',
    timeRu: '45 мин.',
    timeEn: '45 min.',
    imgIndex: 2
  },
  {
    id: 'vegetables',
    img: '/images/sushka/n4737_640.jpg',
    nameRu: 'Капуста, картофель, баклажаны, лук, морковь',
    nameEn: 'Cabbage, potatoes, eggplants, onions, carrots',
    timeRu: 'от 1–1,5 часа',
    timeEn: 'from 1–1.5 hours',
    imgIndex: 3
  },
  {
    id: 'fruits',
    img: '/images/sushka/Fruit_Grapes_Apples_.jpg',
    nameRu: 'Яблоки, абрикосы, персики, виноград',
    nameEn: 'Apples, apricots, peaches, grapes',
    timeRu: '4 часа',
    timeEn: '4 hours',
    imgIndex: 4
  }
];

const ADVANTAGES_DATA = [
  {
    ru: 'Совместимость с существующими биотехнологическими методами и подходами',
    en: 'Compatibility with existing biotechnological methods and approaches'
  },
  {
    ru: 'Сохранение всех биологически активных веществ',
    en: 'Preservation of all biologically active substances'
  },
  {
    ru: 'Совмещение процесса сушки и стерилизации',
    en: 'Combination of the drying and sterilization process'
  },
  {
    ru: 'Высокая эффективность и простота процесса сушки',
    en: 'High efficiency and simplicity of the drying process'
  },
  {
    ru: 'Низкое потребление энергии',
    en: 'Low energy consumption'
  }
];

const SAMPLES_DATA = [
  {
    id: 'sauerkraut',
    img: '/images/sushka/samples/Капуста.png',
    nameRu: 'Сушёная квашеная капуста',
    nameEn: 'Dried sauerkraut',
    lightboxIndex: 5
  },
  {
    id: 'dill',
    img: '/images/sushka/samples/Укроп.png',
    nameRu: 'Сушёный укроп',
    nameEn: 'Dried dill',
    lightboxIndex: 6
  },
  {
    id: 'garlic',
    img: '/images/sushka/samples/Чеснок.png',
    nameRu: 'Сушёный чеснок',
    nameEn: 'Dried garlic',
    lightboxIndex: 7
  },
  {
    id: 'ground-garlic',
    img: '/images/sushka/samples/Чеснок молотый.png',
    nameRu: 'Сушёный чеснок молотый',
    nameEn: 'Dried ground garlic',
    lightboxIndex: 8
  }
];

const ACTS_DATA = [
  {
    id: 'carrots',
    titleRu: 'Результаты исследования проб моркови',
    titleEn: 'Results of carrot sample testing',
    pages: [
      {
        url: '/images/sushka/acts/morkov1.png',
        altRu: 'Результаты исследования проб моркови — страница 1',
        altEn: 'Results of carrot sample testing — Page 1',
        lightboxIndex: 9
      },
      {
        url: '/images/sushka/acts/morkov2.png',
        altRu: 'Результаты исследования проб моркови — страница 2',
        altEn: 'Results of carrot sample testing — Page 2',
        lightboxIndex: 10
      }
    ]
  },
  {
    id: 'niivino',
    titleRu: 'Оценка сухофруктов высушенных на ИК сушилке',
    titleEn: 'Evaluation of dried fruits dried in an IR dryer',
    pages: [
      {
        url: '/images/sushka/acts/niivino1.png?v=2',
        altRu: 'Оценка сухофруктов высушенных на ИК сушилке — страница 1',
        altEn: 'Evaluation of dried fruits dried in an IR dryer — Page 1',
        lightboxIndex: 11
      },
      {
        url: '/images/sushka/acts/niivino2.jpg',
        altRu: 'Оценка сухофруктов высушенных на ИК сушилке — страница 2',
        altEn: 'Evaluation of dried fruits dried in an IR dryer — Page 2',
        lightboxIndex: 12
      }
    ]
  },
  {
    id: 'pa6',
    titleRu: 'Акт испытания сушилки ПА-6',
    titleEn: 'Test report of dryer PA-6',
    pages: [
      {
        url: '/images/sushka/acts/Pa6_1.png',
        altRu: 'Акт испытания сушилки ПА-6 — страница 1',
        altEn: 'Test report of dryer PA-6 — Page 1',
        lightboxIndex: 13
      },
      {
        url: '/images/sushka/acts/Pa6_2.png',
        altRu: 'Акт испытания сушилки ПА-6 — страница 2',
        altEn: 'Test report of dryer PA-6 — Page 2',
        lightboxIndex: 14
      }
    ]
  },
  {
    id: 'silk',
    titleRu: 'НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК',
    titleEn: 'NPO SHELK. Testing of IR drying and sterilization method',
    pages: [
      {
        url: '/images/sushka/acts/Отчет. НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК 1.png',
        altRu: 'НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК — страница 1',
        altEn: 'NPO SHELK. Testing of IR drying and sterilization method — Page 1',
        lightboxIndex: 15
      },
      {
        url: '/images/sushka/acts/Отчет. НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК 2.png',
        altRu: 'НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК — страница 2',
        altEn: 'NPO SHELK. Testing of IR drying and sterilization method — Page 2',
        lightboxIndex: 16
      }
    ]
  },
  {
    id: 'blood',
    titleRu: 'Институт Биохимии. Сушка крови',
    titleEn: 'Institute of Biochemistry. Blood drying',
    pages: [
      {
        url: '/images/sushka/acts/Протокол Биохимии. Сушка крови.png',
        altRu: 'Институт Биохимии. Сушка крови',
        altEn: 'Institute of Biochemistry. Blood drying',
        lightboxIndex: 17
      }
    ]
  },
  {
    id: 'colostrum',
    titleRu: 'НИИ Биохимии. Сушка коровьего молозив',
    titleEn: 'Research Institute of Biochemistry. Drying of cow colostrum',
    pages: [
      {
        url: '/images/sushka/acts/Протокол. НИИ Биохимии. Сушка коровьего молозив.jpg',
        altRu: 'НИИ Биохимии. Сушка коровьего молозив',
        altEn: 'Research Institute of Biochemistry. Drying of cow colostrum',
        lightboxIndex: 18
      }
    ]
  },
  {
    id: 'vegetables-cert',
    titleRu: 'Сушка овощей',
    titleEn: 'Vegetable drying',
    pages: [
      {
        url: '/images/sushka/acts/Удостоверение. Советской торговли. Сушка овощей.png',
        altRu: 'Сушка овощей',
        altEn: 'Vegetable drying',
        lightboxIndex: 19
      }
    ]
  }
];

const INFOGRAPHICS_DATA = [
  {
    id: 'arahis',
    img: '/images/sushka/infographics/arahis.png',
    altRu: 'Инфографика — арахис',
    altEn: 'Infographics — Peanuts'
  },
  {
    id: 'banan',
    img: '/images/sushka/infographics/banan.png',
    altRu: 'Инфографика — банан',
    altEn: 'Infographics — Banana'
  },
  {
    id: 'frukt',
    img: '/images/sushka/infographics/frukt.png',
    altRu: 'Инфографика — фрукты',
    altEn: 'Infographics — Fruits'
  },
  {
    id: 'graph_morkov',
    img: '/images/sushka/infographics/graph_morkov.png',
    altRu: 'Инфографика — морковь',
    altEn: 'Infographics — Carrots'
  },
  {
    id: 'kukuruza',
    img: '/images/sushka/infographics/kukuruza.png',
    altRu: 'Инфографика — кукуруза',
    altEn: 'Infographics — Corn'
  },
  {
    id: 'makaron',
    img: '/images/sushka/infographics/makaron.png',
    altRu: 'Инфографика — макаронные изделия',
    altEn: 'Infographics — Pasta'
  },
  {
    id: 'mango',
    img: '/images/sushka/infographics/mango.png',
    altRu: 'Инфографика — манго',
    altEn: 'Infographics — Mango'
  }
];

const SushkaPage = () => {
  const { lang } = useLanguage();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeGroup, setActiveGroup] = useState('main');

  const introTextRef = React.useRef(null);
  const [introTextHeight, setIntroTextHeight] = useState(null);

  React.useEffect(() => {
    const updateHeight = () => {
      if (introTextRef.current && window.innerWidth > 768) {
        setIntroTextHeight(introTextRef.current.offsetHeight);
      } else {
        setIntroTextHeight(null);
      }
    };

    updateHeight();
    let observer;
    if (window.ResizeObserver && introTextRef.current) {
      observer = new ResizeObserver(updateHeight);
      observer.observe(introTextRef.current);
    }
    window.addEventListener('resize', updateHeight);

    return () => {
      if (observer) observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, [lang]);

  const infographicsGallery = INFOGRAPHICS_DATA.map((item) => ({
    url: getLocalizedImage(item.img, lang),
    alt: lang === 'en' ? item.altEn : item.altRu
  }));

  const openLightboxAt = (idx, group = 'main') => {
    setActiveGroup(group);
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  const galleryImages = [
    {
      url: '/images/sushka/uzbekistan-3.jpg',
      alt: lang === 'en' ? 'Drying installation "Uzbekistan-3"' : 'Сушильная установка «Узбекистан-3»'
    },
    {
      url: '/images/sushka/doc1.jpg?v=2',
      alt: lang === 'en'
        ? 'Conclusion on the trade and technological evaluation of dried fruits (Page 1)'
        : 'Заключение на товарно-технологическую оценку сухофруктов (Страница 1)'
    },
    {
      url: '/images/sushka/doc2.jpg',
      alt: lang === 'en'
        ? 'Conclusion on the trade and technological evaluation of dried fruits (Page 2)'
        : 'Заключение на товарно-технологическую оценку сухофруктов (Страница 2)'
    },
    {
      url: '/images/sushka/vremya-sushki.jpg',
      alt: lang === 'en'
        ? 'Agricultural products for drying'
        : 'Сельскохозяйственные продукты для сушки'
    },
    {
      url: '/images/sushka/preimushestva.jpg',
      alt: lang === 'en' ? 'Advantages of functional ceramics drying' : 'Преимущества перед традиционными технологиями'
    },
    {
      url: '/images/sushka/samples/Капуста.png',
      alt: lang === 'en' ? 'Dried sauerkraut' : 'Сушёная квашеная капуста'
    },
    {
      url: '/images/sushka/samples/Укроп.png',
      alt: lang === 'en' ? 'Dried dill' : 'Сушёный укроп'
    },
    {
      url: '/images/sushka/samples/Чеснок.png',
      alt: lang === 'en' ? 'Dried garlic' : 'Сушёный чеснок'
    },
    {
      url: '/images/sushka/samples/Чеснок молотый.png',
      alt: lang === 'en' ? 'Dried ground garlic' : 'Сушёный чеснок молотый'
    },
    {
      url: '/images/sushka/acts/morkov1.png',
      alt: lang === 'en' ? 'Results of carrot sample testing — Page 1' : 'Результаты исследования проб моркови — страница 1'
    },
    {
      url: '/images/sushka/acts/morkov2.png',
      alt: lang === 'en' ? 'Results of carrot sample testing — Page 2' : 'Результаты исследования проб моркови — страница 2'
    },
    {
      url: '/images/sushka/acts/niivino1.png?v=2',
      alt: lang === 'en' ? 'Evaluation of dried fruits dried in an IR dryer — Page 1' : 'Оценка сухофруктов высушенных на ИК сушилке — страница 1'
    },
    {
      url: '/images/sushka/acts/niivino2.jpg',
      alt: lang === 'en' ? 'Evaluation of dried fruits dried in an IR dryer — Page 2' : 'Оценка сухофруктов высушенных на ИК сушилке — страница 2'
    },
    {
      url: '/images/sushka/acts/Pa6_1.png',
      alt: lang === 'en' ? 'Test report of dryer PA-6 — Page 1' : 'Акт испытания сушилки ПА-6 — страница 1'
    },
    {
      url: '/images/sushka/acts/Pa6_2.png',
      alt: lang === 'en' ? 'Test report of dryer PA-6 — Page 2' : 'Акт испытания сушилки ПА-6 — страница 2'
    },
    {
      url: '/images/sushka/acts/Отчет. НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК 1.png',
      alt: lang === 'en' ? 'NPO SHELK. Testing of IR drying and sterilization method — Page 1' : 'НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК — страница 1'
    },
    {
      url: '/images/sushka/acts/Отчет. НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК 2.png',
      alt: lang === 'en' ? 'NPO SHELK. Testing of IR drying and sterilization method — Page 2' : 'НПО ШЕЛК. Испытаний метода сушки и стерилизации ИК — страница 2'
    },
    {
      url: '/images/sushka/acts/Протокол Биохимии. Сушка крови.png',
      alt: lang === 'en' ? 'Institute of Biochemistry. Blood drying' : 'Институт Биохимии. Сушка крови'
    },
    {
      url: '/images/sushka/acts/Протокол. НИИ Биохимии. Сушка коровьего молозив.jpg',
      alt: lang === 'en' ? 'Research Institute of Biochemistry. Drying of cow colostrum' : 'НИИ Биохимии. Сушка коровьего молозив'
    },
    {
      url: '/images/sushka/acts/Удостоверение. Советской торговли. Сушка овощей.png',
      alt: lang === 'en' ? 'Vegetable drying' : 'Сушка овощей'
    },
    {
      url: '/images/sushka/dried-fruit.jpg',
      alt: lang === 'en' ? 'Drying of vegetables and fruits' : 'Сушка овощей и фруктов'
    }
  ].map((img) => ({
    ...img,
    url: getLocalizedImage(img.url, lang)
  }));

  const breadcrumbs = [
    { title: lang === 'en' ? 'Developments' : 'Разработки' },
    { title: lang === 'en' ? 'Drying of vegetables and fruits' : 'Сушилка овощей и фруктов' }
  ];

  return (
    <div className="page-wrap sushka-page-wrap">
      <SEO
        title={lang === 'en' ? 'Drying of vegetables and fruits — KERAMIKA SINTEZ' : 'Сушилка овощей и фруктов — KERAMIKA SINTEZ'}
        description={lang === 'en'
          ? 'Installation for efficient drying of fruits and vegetables using functional ceramic emitters. Natural taste preservation, drying temperature from 40 °C.'
          : 'Установка для эффективной сушки фруктов и овощей с использованием излучателей покрытых функциональной керамикой. Сохранение витаминов и питательных свойств, температура сушки от 40 °C.'}
        canonicalPath={lang === 'en' ? '/en/sushka' : '/sushka'}
        ruPath="/sushka"
        enPath="/en/sushka"
        image={getLocalizedImage('/images/sushka/dried-fruit.jpg', lang)}
        lang={lang}
      />

      <div className="container">
        <Breadcrumbs items={breadcrumbs} />

        {/* 3. ЗАГОЛОВОК СТРАНИЦЫ (Standard H1 without decorative badges) */}
        <div style={{ marginBottom: '24px' }}>
          <h1 className="page-title-heading">
            {lang === 'en' ? 'Drying of vegetables and fruits' : 'Сушилка овощей и фруктов'}
          </h1>
        </div>

        {/* НОВЫЙ ВВОДНЫЙ БЛОК С ОБТЕКАНИЕМ ИЗОБРАЖЕНИЕМ «УЗБЕКИСТАН-3» */}
        <section className="sushka-tech-intro-section">
          <div className="sushka-tech-wrap clearfix">
            <div 
              className="sushka-tech-float-media"
              onClick={() => openLightboxAt(0)}
              title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
            >
              <img
                src={getLocalizedImage('/images/sushka/uzbekistan-3.jpg', lang)}
                alt={lang === 'en' ? 'Drying installation "Uzbekistan-3"' : 'Сушильная установка «Узбекистан-3»'}
                className="sushka-tech-float-img"
                loading="lazy"
              />
            </div>

            <div className="sushka-tech-text">
              <p>
                {lang === 'en'
                  ? 'The drying method based on functional ceramics combines targeted infrared heating of the product with the effective removal of evaporating moisture. The ceramic coating of the emitting elements creates a specialized action that accelerates the release of water from the inner layers of the product. Due to this, the dehydration process proceeds more intensively than with traditional heating.'
                  : 'Метод сушки на основе функциональной керамики сочетает направленный инфракрасный нагрев продукта с эффективным удалением испаряющейся влаги. Керамическое покрытие излучающих элементов формирует специальное воздействие, которое ускоряет выход воды из внутренних слоёв продукта. Благодаря этому процесс обезвоживания проходит интенсивнее, чем при традиционном нагреве.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'During drying, it is important not only to transfer energy to the product, but also to promptly remove the generated steam. For this purpose, the installations use moisture removal systems — ejectors or a labyrinth system. If steam is trapped inside the chamber, it begins to absorb the emitters\' energy and heats the product via hot air and steam, which can lead to browning and uneven drying.'
                  : 'В процессе сушки важно не только передать энергию продукту, но и своевременно удалить образующийся пар. Для этого в установках применяются системы отвода влаги — эжекторы или лабиринтная система. Если пар задерживается внутри камеры, он начинает поглощать энергию излучателей и нагревать продукт уже через горячий воздух и пар, что может приводить к потемнению и неравномерной сушке.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'A distinct feature of functional ceramics is that its radiation accelerates the slowest stage of the process — the transfer of water from the deep layers of the product to the surface. Pulsed infrared action penetrates into the depth of the material, simultaneously promoting dehydration and reducing microbial contamination.'
                  : 'Особенность функциональной керамики заключается в том, что её излучение способствует ускорению наиболее медленной стадии процесса — перемещению воды из глубинных слоёв продукта к поверхности. Импульсное инфракрасное воздействие проникает в толщу материала, одновременно способствуя обезвоживанию и снижению микробной обсеменённости.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'According to the developers\' materials, this processing method preserves proteins, lipids, biologically active and extractive substances, vitamins, and enzymes. After reconstitution of the dried product, its taste, aroma, juiciness, and texture can be close to the characteristics of the fresh product. At the same time, the technology unites the processes of drying and sterilization, which increases the microbiological safety of the finished product.'
                  : 'Такой способ обработки позволяет, согласно материалам разработчиков, сохранять белки, липиды, биологически активные и экстрактивные вещества, витамины и ферменты. После восстановления высушенного продукта его вкус, аромат, сочность и консистенция могут быть близки к характеристикам исходного продукта. При этом технология объединяет процессы сушки и стерилизации, что повышает микробиологическую безопасность готовой продукции.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'The technology is applied to various types of raw materials: vegetables, fruits, berries, mushrooms, greens, root crops, fish, and animal products. The design of the drying installation allows organizing uniform moisture removal, while various tray layouts and steam extraction systems make it possible to increase the loading capacity without significant deterioration of the drying quality.'
                  : 'Технология применяется для различных видов сырья: овощей, фруктов, ягод, грибов, зелени, корнеплодов, рыбы и продуктов животного происхождения. Конструкция сушильной установки позволяет организовать равномерный отвод влаги, а различные варианты расположения поддонов и системы пароудаления дают возможность увеличивать загрузку без существенного ухудшения качества сушки.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'As a result, the application of functional ceramics makes it possible to reduce the duration of the process and energy consumption while simultaneously improving the quality of the finished product. The developers also note the preservation of appearance, nutritional value, and the ability of several products to rehydrate after soaking.'
                  : 'В результате применение функциональной керамики позволяет сократить продолжительность процесса и расход энергии, одновременно повышая качество готового продукта. Разработчики также отмечают сохранение внешнего вида, пищевой ценности и способности ряда продуктов восстанавливаться после замачивания.'}
              </p>
            </div>
          </div>
        </section>

        {/* 4. ПЕРВЫЙ ИНФОРМАЦИОННЫЙ БЛОК (Вводный текст + документы справа) */}
        <section className="sushka-intro-section">
          <div className="sushka-intro-layout">
            <div ref={introTextRef} className="sushka-intro-text">
              <p>
                {lang === 'en'
                  ? 'Installation for efficient drying of fruits and vegetables using emitters coated with functional ceramics.'
                  : 'Установка для эффективной сушки фруктов и овощей с использованием излучателей покрытых функциональной керамикой.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'Fruits and vegetables dried in the specified mode do not require pre-treatment with sulfur or other chemicals to extend their shelf life. At the same time, the products retain their original natural components and taste qualities. The drying temperature can be as low as from 40 °C.'
                  : 'Прошедшие сушку в заданном режиме фрукты и овощи не нуждаются в предварительной обработке серой или другими химикатами для продления срока хранения. Продукция при этом не теряет первоначальных природных компонентов и вкусовых качеств. Температура сушки возможна от 40 °C.'}
              </p>
              <p>
                {lang === 'en'
                  ? 'Independent tests have shown that this method is more effective than conventional traditional methods and can ensure optimal preservation of the original properties of the products, their marketable appearance, and nutritional qualities, while also saving time and energy resources. The drying time significantly depends on the product varieties and the cutting method.'
                  : 'Независимые тесты показали, что этот метод более эффективен, чем обычные традиционные, и может обеспечить оптимальное сохранение первоначальных свойств продуктов, их товарный вид и питательные качества, экономит время и энергетические ресурсы. Время сушки значительно зависит от сортов продукта и метода нарезки.'}
              </p>
            </div>

            <div 
              className="sushka-intro-docs"
              style={introTextHeight ? { height: `${introTextHeight}px` } : undefined}
            >
              <div 
                className="sushka-doc-wrap"
                style={introTextHeight ? { height: `${introTextHeight}px` } : undefined}
                onClick={() => openLightboxAt(1)}
                title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
              >
                <img
                  src={getLocalizedImage('/images/sushka/doc1.jpg?v=2', lang)}
                  alt={lang === 'en' ? 'Conclusion on technological evaluation of dried fruits — Page 1' : 'Заключение на товарно-технологическую оценку сухофруктов — Страница 1'}
                  className="sushka-doc-img"
                  style={introTextHeight ? { maxHeight: `${introTextHeight}px` } : undefined}
                  loading="lazy"
                />
              </div>
              <div 
                className="sushka-doc-wrap"
                style={introTextHeight ? { height: `${introTextHeight}px` } : undefined}
                onClick={() => openLightboxAt(2)}
                title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
              >
                <img
                  src={getLocalizedImage('/images/sushka/doc2.jpg', lang)}
                  alt={lang === 'en' ? 'Conclusion on technological evaluation of dried fruits — Page 2' : 'Заключение на товарно-технологическую оценку сухофруктов — Страница 2'}
                  className="sushka-doc-img"
                  style={introTextHeight ? { maxHeight: `${introTextHeight}px` } : undefined}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 5. ИЛЛЮСТРАЦИЯ СЕЛЬСКОХОЗЯЙСТВЕННЫХ ПРОДУКТОВ */}
        <section className="sushka-table-section">
          <div
            className="sushka-times-illustration-wrap"
            onClick={() => openLightboxAt(3)}
            title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
          >
            <img
              src={getLocalizedImage('/images/sushka/vremya-sushki.jpg', lang)}
              alt={lang === 'en' ? 'Agricultural products for drying' : 'Сельскохозяйственные продукты для сушки'}
              className="sushka-times-illustration-img"
              loading="lazy"
            />
          </div>
        </section>


        {/* 8. РАЗДЕЛ: «Сушка лекарственных препаратов и трав» */}
        <section className="sushka-herbs-section">
          <h2 className="sushka-section-title">
            {lang === 'en' ? 'Drying of medicinal preparations and herbs' : 'Сушка лекарственных препаратов и трав'}
          </h2>

          <div className="sushka-prose-block">
            <p>
              {lang === 'en'
                ? 'The proposed drying technology can be used in the production of dyes, concentrates, various pastes, powders, extracts, ointments, as well as for drying herbs and other components used in pharmaceutical manufacturing. This method ensures the preservation of all chemical and biological substances, including enzymes, vitamins, hormones, easily oxidizable compounds, and essential oils. The products obtained through this drying process have a long shelf life. The applied technology accelerates the production cycle while significantly reducing energy costs.'
                : 'Предлагаемая технология сушки может быть использована при изготовлении красителей, концентратов, различных паст, порошков, экстрактов, мазей, а также для сушки трав и других компонентов, применяемых в производстве лекарственных препаратов. При этом обеспечивается сохранение всех химических и биологических веществ, включая ферменты, витамины, гормоны, легко окисляющиеся составные и эфирные масла. Полученная в результате такой сушки продукция имеет длительные сроки хранения. Используемая технология обеспечивает ускорение производственного цикла и при этом позволяет значительно снизить затраты энергии.'}
            </p>
          </div>
        </section>

        {/* 9 & 10. РАЗДЕЛ: «Преимущества перед традиционными технологиями» + изображение */}
        <section className="sushka-advantages-section">
          <h2 className="sushka-section-title">
            {lang === 'en' ? 'Advantages over traditional technologies' : 'Преимущества перед традиционными технологиями'}
          </h2>

          <div
            className="sushka-advantages-illustration-wrap"
            onClick={() => openLightboxAt(4)}
            title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
          >
            <img
              src={getLocalizedImage('/images/sushka/preimushestva.jpg', lang)}
              alt={lang === 'en' ? 'Advantages over traditional technologies' : 'Преимущества перед традиционными технологиями'}
              className="sushka-advantages-illustration-img"
              loading="lazy"
            />
          </div>
        </section>

        {/* 11. РАЗДЕЛ: «Образцы» */}
        <section className="sushka-samples-section">
          <h2 className="sushka-section-title">
            {lang === 'en' ? 'Samples' : 'Образцы'}
          </h2>

          <div className="sushka-samples-grid">
            {SAMPLES_DATA.map((sample) => (
              <div key={sample.id} className="sushka-sample-card">
                <div
                  className="sushka-sample-media"
                  onClick={() => openLightboxAt(sample.lightboxIndex)}
                  title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                >
                  <img
                    src={getLocalizedImage(sample.img, lang)}
                    alt={lang === 'en' ? sample.nameEn : sample.nameRu}
                    className="sushka-sample-img"
                    loading="lazy"
                  />
                </div>
                <div className="sushka-sample-caption">
                  {lang === 'en' ? sample.nameEn : sample.nameRu}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 12. РАЗДЕЛ: «Акты испытаний и заключения» */}
        <section className="sushka-acts-section">
          <h2 className="sushka-section-title">
            {lang === 'en' ? 'Test Reports and Conclusions' : 'Акты испытаний и заключения'}
          </h2>

          <div className="sushka-acts-grid">
            {ACTS_DATA.map((doc) => {
              const isTwoPages = doc.pages.length === 2;
              return (
                <div key={doc.id} className="sushka-act-card">
                  <div className={`sushka-act-media-wrap ${isTwoPages ? 'two-pages' : 'single-page'}`}>
                    {doc.pages.map((page, pIdx) => (
                      <div
                        key={pIdx}
                        className="sushka-act-page-item"
                        onClick={() => openLightboxAt(page.lightboxIndex)}
                        title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                      >
                        <img
                          src={getLocalizedImage(page.url, lang)}
                          alt={lang === 'en' ? page.altEn : page.altRu}
                          className="sushka-act-img"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="sushka-act-caption">
                    {lang === 'en' ? doc.titleEn : doc.titleRu}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 13. РАЗДЕЛ: «Инфографика» */}
        <section className="sushka-infographics-section">
          <h2 className="sushka-section-title">
            {lang === 'en' ? 'Infographics' : 'Инфографика'}
          </h2>

          <div className="sushka-infographics-grid">
            {INFOGRAPHICS_DATA.map((item, idx) => (
              <div key={item.id} className="sushka-infographics-card">
                <div
                  className="sushka-infographics-media"
                  onClick={() => openLightboxAt(idx, 'infographics')}
                  title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
                >
                  <img
                    src={getLocalizedImage(item.img, lang)}
                    alt={lang === 'en' ? item.altEn : item.altRu}
                    className="sushka-infographics-img"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 1. ПОЛНОШИРИННОЕ ИЗОБРАЖЕНИЕ СУХОФРУКТОВ ПЕРЕД ПОДВАЛОМ */}
      <section className="sushka-bottom-banner">
        <img
          src={getLocalizedImage('/images/sushka/dried-fruit.jpg', lang)}
          alt={lang === 'en' ? 'Drying of vegetables and fruits' : 'Сушка овощей и фруктов'}
          className="sushka-bottom-banner-img"
          loading="lazy"
          onClick={() => openLightboxAt(20)}
          title={lang === 'en' ? 'Click to enlarge' : 'Нажмите для увеличения'}
        />
      </section>

      {/* Lightbox Modal */}
      {(() => {
        const activeGallery = activeGroup === 'infographics' ? infographicsGallery : galleryImages;
        return (
          <Lightbox
            isOpen={lightboxOpen}
            images={activeGallery}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxOpen(false)}
            onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : activeGallery.length - 1))}
            onNext={() => setLightboxIndex((prev) => (prev < activeGallery.length - 1 ? prev + 1 : 0))}
          />
        );
      })()}
    </div>
  );
};

export default SushkaPage;
