/**
 * Data store for Paint Drying Page («Сушка лакокрасочных материалов»)
 * ООО «KERAMIKA SINTEZ»
 * 
 * Strict 1:1 technical data from primary source https://infraks.ru/paint
 */

export const PAINT_DATA = {
  ru: {
    seo: {
      title: 'Сушка краски и лаков',
      description: '«Инфракрасные установки для сушки краски и лакокрасочных покрытий. Быстрое и равномерное высыхание без дефектов. Энергосбережение и высокая эффективность. Подходит для автосервисов и производства. Узнайте больше!»',
      keywords: 'сушка красок, сушка лаков, полимеризация, инфракрасное излучение, функциональная керамика, ISO 9001, энергосбережение, минимальный расход энергии, простота процесса, автомобильная промышленность, машиностроение, судостроение, ветровые турбины, адгезия',
      canonicalPath: '/paint',
      ruPath: '/paint',
      enPath: '/en/paint',
      image: '/images/paint/kraska.svg'
    },
    hero: {
      title: 'Сушка краски и лаков',
      paragraph1: 'Для сушки, нагрева и полимеризации красок, лаков и пластиковых покрытий основными требованиями являются высокое качество в соответствии с ISO 9001, экономичность, минимальные затраты энергии и времени, простота и надёжность технологического процесса.',
      paragraph2: 'При облучении окрашенных поверхностей излучателями, покрытыми функциональной керамикой, время сушки красок, лаков и эмалей сокращается с двух часов до нескольких минут. Согласно исходному описанию, применяемый метод не только улучшает качество краски, но также предотвращает изменение цвета и выделение вредных загрязняющих веществ в окружающую среду.',
      image: '/images/paint/ust.png',
      imageAlt: 'Установка сушки краски и лакокрасочных покрытий',
      diagram: '/images/paint/kraska.svg',
      diagramAlt: 'Принцип работы установки сушки краски и лакокрасочных покрытий',
      badges: [
        { label: 'Стандарт качества', value: 'ISO 9001' },
        { label: 'Время сушки', value: 'с 2 часов до минут' },
        { label: 'Мировое признание', value: '25 ведущих компаний' },
        { label: 'Готовность к внедрению', value: '>30 предприятий' }
      ]
    },
    techComparison: {
      title: 'Сравнение с традиционной технологией',
      subtitle: 'Традиционный нагрев против импульсного ИК-излучения с функциональной керамикой',
      image: '/images/paint/tradic.png',
      imageAlt: 'Сравнение традиционной технологии и технологии с функциональной керамикой',
      traditional: {
        title: 'Традиционная технология',
        badge: 'Традиционный метод',
        points: [
          {
            title: 'Длительный цикл сушки',
            desc: 'Время сушки типовых лакокрасочных материалов составляет около 2 часов (для автоэмали МЛ-1111 — 30 минут при температуре ≥130 °C).'
          },
          {
            title: 'Обязательное тщательное обезжиривание',
            desc: 'Объекты, предназначенные для покраски или нанесения полимеров по существующим технологиям, должны быть тщательно обезжирены. Иначе невозможно обеспечить хорошую адгезию краски к объекту и прочность покрытия.'
          },
          {
            title: 'Неоднородность и обрыв макромолекул',
            desc: 'В отличие от классического инфракрасного и ультрафиолетового инициирования процесса, при обычном воздействии на молекулярном уровне рвутся уже образовавшиеся цепи полимера.'
          },
          {
            title: 'Экологическая нагрузка и дефекты цвета',
            desc: 'Высокотемпературный нагрев не позволяет избежать изменения цветов, а также сопровождается выбросом в атмосферу опасных для окружающей среды примесей.'
          }
        ]
      },
      innovative: {
        title: 'Технология с функциональной керамикой',
        badge: 'ООО «KERAMIKA SINTEZ»',
        points: [
          {
            title: 'Сушка до нескольких минут и секунд',
            desc: 'Время сушки красок, лаков и эмалей снижается с двух часов до нескольких минут. На конкретных материалах процесс занимает от 3 секунд до 3 минут.'
          },
          {
            title: 'Исключение трудоемкого обезжиривания',
            desc: 'Для новой технологии не требуется проводить эти сложные и трудоемкие операции. Ни ржавчина, ни масло не мешают процессу.'
          },
          {
            title: 'Одинаковая длина цепей полимера',
            desc: 'Энергии импульсного инфракрасного излучения достаточно для инициирования, но не достаточно для обрыва образовавшихся полимерных цепей. Практически, все они имеют одинаковую длину, чего невозможно добиться никаким другим способом.'
          },
          {
            title: 'Сверхвысокая адгезия и сохранение цвета',
            desc: 'Применяемый метод одновременно улучшает качество краски, позволяет избежать изменения цветов и выброса в атмосферу опасных примесей, формируя прочный слой с высокой адгезией.'
          }
        ]
      }
    },
    physicsChain: {
      title: 'Основной физический принцип',
      subtitle: 'Последовательность передачи энергии и инициирования полимеризации на молекулярном уровне',
      image: '/images/paint/princip.png',
      imageAlt: 'Основной физический принцип: последовательность передачи энергии и инициирования полимеризации на молекулярном уровне',
      steps: [
        {
          num: '01',
          name: 'ИЗЛУЧАТЕЛЬ',
          desc: 'Первичный источник тепла и лучистой энергии контролируемой плотности.'
        },
        {
          num: '02',
          name: 'ФУНКЦИОНАЛЬНАЯ КЕРАМИКА',
          desc: 'Специальный керамический преобразователь, селективно трансформирующий тепловой поток в импульсный спектр.'
        },
        {
          num: '03',
          name: 'ИМПУЛЬСНОЕ ИК-ИЗЛУЧЕНИЕ',
          desc: 'Импульсный поток квантов с энергией, строго достаточной для инициирования процесса без разрушения полимерных цепочек.'
        },
        {
          num: '04',
          name: 'ЛАКОКРАСОЧНОЕ ПОКРЫТИЕ',
          desc: 'Глубокое резонансное поглощение слоем краски или эмали независимо от наличия масла или следов ржавчины.'
        },
        {
          num: '05',
          name: 'СУШКА / ПОЛИМЕРИЗАЦИЯ',
          desc: 'Формирование монолитной сетки макромолекул одинаковой длины. Высокая адгезия и стойкость к механическим деформациям.'
        }
      ]
    },
    coatingProperties: {
      title: 'Свойства получаемого покрытия',
      subtitle: 'Физико-механические преимущества сформированного полимерного слоя',
      properties: [
        {
          title: 'Высокая адгезия к объекту',
          desc: 'Образуется очень прочное покрытие с высокой адгезией к поверхности объекта, гарантирующее долговечность защитного слоя.'
        },
        {
          title: 'Устойчивость к маслу и ржавчине',
          desc: 'Ни ржавчина, ни масло не мешают процессу формирования полимерного слоя и не снижают его сцепления с основой.'
        },
        {
          title: 'Отсутствие трещин и отслаивания',
          desc: 'Даже при многократных изгибаниях объектов с полученным покрытием не наблюдается отслаивания его от объекта и не образуется трещин на самом покрытии.'
        },
        {
          title: 'Возможность последующей формовки',
          desc: 'Технология позволяет предварительно покрасить, например, лист металла, а потом изготавливать из него элементы сложной формы.'
        },
        {
          title: 'Регулирование характеристик покрытия',
          desc: 'Изменяя параметры импульсного инфракрасного излучения, можно регулировать длину цепей полимерных молекул и, таким образом, регулировать свойства покрытия.'
        }
      ]
    },
    companiesSection: {
      title: 'Области применения',
      subtitle: 'Компания RPE (Германия) проводила в последние два года интенсивный маркетинг в следующих компаниях',
      image: '/images/paint/oblast.png',
      imageAlt: 'Области применения: автомобильная промышленность, машиностроение, авиастроение, судостроение, пластмассы и другие',
      summary: 'Все вышеперечисленные 25 компаний признали преимущества технологии на основе излучателей, покрытых функциональной керамикой. Более 30 компаний в настоящее время готовы провести замену старых технологий на нашу.',
      docs: [
        { url: '/images/paint/1.jpg', alt: 'Свидетельство и протокол испытаний 1', caption: 'Документ испытаний 1' },
        { url: '/images/paint/2.jpg', alt: 'Свидетельство и протокол испытаний 2', caption: 'Документ испытаний 2' },
        { url: '/images/paint/3.jpg', alt: 'Свидетельство и протокол испытаний 3', caption: 'Документ испытаний 3' },
        { url: '/images/paint/4.jpg', alt: 'Свидетельство и протокол испытаний 4', caption: 'Документ испытаний 4' }
      ],
      industries: [
        {
          id: 'auto',
          icon: '/images/paint/67335.svg',
          title: 'Автомобильная промышленность',
          companies: 'AUDI, BMW, DAIMLER, FORD, SKODA, OPEL, VOLKSWAGEN'
        },
        {
          id: 'trucks',
          icon: '/images/paint/6228750.svg',
          title: 'Грузовые автомобили и автобусы',
          companies: 'MAN, DAIMLER'
        },
        {
          id: 'engineering',
          icon: '/images/paint/20473.svg',
          title: 'Машиностроение',
          companies: 'RIPPERT, VENJAKOB, OBRICHT, BURKLE'
        },
        {
          id: 'rail',
          icon: '/images/paint/1006.svg',
          title: 'Строительство железнодорожных вагонов',
          companies: 'SIEMENS, Waggonbau Niesky'
        },
        {
          id: 'aviation',
          icon: '/images/paint/31202.svg',
          title: 'Авиастроение',
          companies: 'AIRBUS'
        },
        {
          id: 'shipbuilding',
          icon: '/images/paint/25229.svg',
          title: 'Судостроение',
          companies: 'Meyer Werft'
        },
        {
          id: 'wind',
          icon: '/images/paint/4136939.svg',
          title: 'Ветровые турбины',
          companies: 'ENERCON'
        },
        {
          id: 'rubber',
          icon: '/images/paint/2105i201065Fm004c9ti.svg',
          title: 'Резиновая промышленность',
          companies: 'CONTINENTAL'
        },
        {
          id: 'plastics',
          icon: '/images/paint/6431452.svg',
          title: 'Пластмассы',
          companies: 'KRONES, AIRBUS, KIEFEL, BRUCKNER, FRIMO, TAIYO EUROPE, RENOLIT SE'
        }
      ]
    },
    testResults: {
      title: 'Результаты испытаний',
      subtitle: 'Сравнительные параметры полимеризации лакокрасочных материалов',
      intro: 'Автомобильная эмаль марки МЛ-1111, обычными методами сушится при разогреве поверхности до температуры не менее 130 °C в течение 30 минут. С применением специальных керамических преобразователей, время сушки, в зависимости от структуры окрашиваемого материала и плотности лучевого потока, составляет от 7 секунд до 5 минут, причем, температура в данном случае не имеет значения.',
      sravImage: '/images/paint/srav.png',
      sravImageAlt: 'Сравнительные параметры полимеризации лакокрасочных материалов (эмаль МЛ-1111)',
      primerImage: '/images/paint/primer.png',
      primerImageAlt: 'Таблица испытаний по типам материалов: полиэтилен, алюминий, металл, бумага',
      keyImpacts: [
        'Повышение адгезии окрашенной поверхности к объекту',
        'Увеличение твердости полимерного слоя',
        'Стойкость к растяжению на изгиб при сложной деформации',
        'Повышенная стойкость к прямому механическому удару'
      ],
      comparisonTable: {
        headers: ['Параметр', 'Обычный метод', 'С керамическими преобразователями'],
        rows: [
          {
            param: 'Исследуемый материал',
            traditional: 'Автомобильная эмаль марки МЛ-1111',
            innovative: 'Автомобильная эмаль марки МЛ-1111'
          },
          {
            param: 'Температура разогрева поверхности',
            traditional: 'не менее 130 °C',
            innovative: 'Температура не имеет значения'
          },
          {
            param: 'Время сушки / полимеризации',
            traditional: '30 минут',
            innovative: 'от 7 секунд до 5 минут (зависит от структуры материала и плотности лучевого потока)'
          },
          {
            param: 'Подготовка поверхности (обезжиривание)',
            traditional: 'Тщательное обезжиривание строго обязательно',
            innovative: 'Не требуется (ни ржавчина, ни масло не мешают процессу)'
          },
          {
            param: 'Механические свойства покрытия',
            traditional: 'Риск появления микротрещин при изгибах',
            innovative: 'Повышаются твердость, растяжение на изгиб, стойкость к прямому удару'
          }
        ]
      },
      materialsTable: {
        title: 'Таблица испытаний по типам материалов',
        headers: ['Материал подложки', 'Параметры / Время полимеризации', 'Результат и свойства покрытия'],
        rows: [
          {
            material: 'Полиэтилен',
            time: 'Высокоскоростная полимеризация',
            result: 'Пример полимеризации красок на поверхности полиэтилена без термической деструкции основы'
          },
          {
            material: 'Алюминий',
            time: '1 минута',
            result: 'Полимеризация на поверхности алюминия с высокой адгезией и плотностью слоя'
          },
          {
            material: 'Металл (толщина 0,8 мм)',
            time: '3 минуты',
            result: 'Полимеризация краски на поверхности металла. Стойкость к многократным изгибам без отслаивания'
          },
          {
            material: 'Бумага',
            time: '3 секунды',
            result: 'Полимеризация краски на поверхности бумаги с полным сохранением структуры полотна'
          }
        ]
      }
    },
    gallerySection: {
      title: 'Галерея образцов',
      subtitle: 'Экспериментальные образцы полимеризации лакокрасочных покрытий на различных материалах',
      items: [
        {
          id: 'polyethylene',
          title: 'Полиэтилен',
          caption: 'Полиэтилен',
          description: 'Пример полимеризации красок на поверхности полиэтилена.',
          time: 'Высокоскоростная полимеризация',
          image: '/images/paint/color_plenka.png',
          alt: 'Полиэтилен'
        },
        {
          id: 'aluminum',
          title: 'Алюминий — 1 минута',
          caption: 'Алюминий — 1 минута',
          description: 'Полимеризация на поверхности алюминия. Время 1 минута.',
          time: 'Время: 1 минута',
          image: '/images/paint/color_alumin.png',
          alt: 'Алюминий — 1 минута'
        },
        {
          id: 'metal',
          title: 'Металл 0,8 мм — 3 минуты',
          caption: 'Металл 0,8 мм — 3 минуты',
          description: 'Полимеризация краски на поверхности металла (толщина металла 0,8мм). Время 3 минуты.',
          time: 'Время: 3 минуты (толщина 0,8 мм)',
          image: '/images/paint/color_metall-269x300.png',
          alt: 'Металл 0,8 мм — 3 минуты'
        },
        {
          id: 'paper',
          title: 'Бумага — 3 секунды',
          caption: 'Бумага — 3 секунды',
          description: 'Полимеризация краски на поверхности бумаги. Время 3 секунды.',
          time: 'Время: 3 секунды',
          image: '/images/paint/color_paper-271x300.png',
          alt: 'Бумага — 3 секунды'
        }
      ]
    },
    cta: {
      title: 'Получить дополнительную информацию',
      text: 'Свяжитесь со специалистами ООО «KERAMIKA SINTEZ» для подбора оборудования, проведения технологических расчетов и испытаний на ваших образцах лакокрасочных материалов.',
      buttonText: 'Связаться с нами',
      buttonLink: '/contact'
    }
  },

  en: {
    seo: {
      title: 'Drying of paint and varnishes',
      description: 'Infrared installations for drying paint and varnishes with functional ceramics. Fast and uniform curing without defects. Energy saving and ISO 9001 compliance.',
      keywords: 'paint drying, varnish drying, polymerization, infrared radiation, functional ceramics, ISO 9001, energy saving, minimal energy consumption, automotive industry, mechanical engineering, shipbuilding, adhesion',
      canonicalPath: '/en/paint',
      ruPath: '/paint',
      enPath: '/en/paint',
      image: '/images/paint/kraska.svg'
    },
    hero: {
      title: 'Drying of paint and varnishes',
      paragraph1: 'For drying, heating, and polymerizing paints, lacquers, and plastic coatings, the main requirements are high quality in accordance with ISO 9001, cost-effectiveness, minimal energy and time consumption, simplicity, and reliability of the technological process.',
      paragraph2: 'When painted surfaces are irradiated with emitters coated with functional ceramics, the drying time for paints, varnishes, and enamels is reduced from two hours to just a few minutes. According to the original description, the applied method not only improves the paint quality, but also prevents color change and the emission of harmful pollutants into the environment.',
      image: '/images/paint/ust.png',
      imageAlt: 'Paint and varnish drying installation',
      diagram: '/images/paint/kraska.svg',
      diagramAlt: 'Working principle of paint and varnish drying installation',
      badges: [
        { label: 'Quality Standard', value: 'ISO 9001' },
        { label: 'Drying Time', value: 'from 2 hrs to minutes' },
        { label: 'Global Recognition', value: '25 leading companies' },
        { label: 'Ready for Upgrade', value: '>30 enterprises' }
      ]
    },
    techComparison: {
      title: 'Comparison with Conventional Technology',
      subtitle: 'Conventional thermal heating vs. pulsed IR radiation with functional ceramics',
      image: '/images/paint/tradic_eng.png',
      imageAlt: 'Comparison between conventional technology and functional ceramics technology',
      traditional: {
        title: 'Conventional Technology',
        badge: 'Traditional method',
        points: [
          {
            title: 'Lengthy drying cycle',
            desc: 'Drying time for typical coatings is around 2 hours (for automotive enamel ML-1111: 30 minutes at ≥130 °C).'
          },
          {
            title: 'Mandatory thorough degreasing',
            desc: 'Objects intended for painting or polymer coating must be thoroughly degreased to ensure good paint adhesion and coating strength.'
          },
          {
            title: 'Macromolecular chain degradation',
            desc: 'Unlike classic infrared and ultraviolet initiation, already formed polymer chains are broken at the molecular level under standard processes.'
          },
          {
            title: 'Environmental pollutants and color shifts',
            desc: 'Conventional high-temperature drying cannot prevent color changes and entails the emission of harmful environmental pollutants.'
          }
        ]
      },
      innovative: {
        title: 'Technology with Functional Ceramics',
        badge: 'KERAMIKA SINTEZ',
        points: [
          {
            title: 'Drying reduced to minutes and seconds',
            desc: 'Drying time is reduced from two hours to just a few minutes, taking between 3 seconds and 3 minutes on specific substrates.'
          },
          {
            title: 'Elimination of labor-intensive degreasing',
            desc: 'This complex and labor-intensive procedure is not required for the new technology. Neither rust nor oil interfere with the process.'
          },
          {
            title: 'Uniform polymer chain length',
            desc: 'The energy of pulsed infrared radiation is sufficient to initiate polymerization but not enough to break formed polymer chains. All chains have identical length.'
          },
          {
            title: 'Superior adhesion and color retention',
            desc: 'The applied method improves paint quality, prevents color changes, avoids toxic atmospheric emissions, and forms a highly durable coating.'
          }
        ]
      }
    },
    physicsChain: {
      title: 'Basic Physical Principle',
      subtitle: 'Sequence of energy transfer and molecular polymerization initiation',
      image: '/images/paint/princip_eng.png',
      imageAlt: 'Basic physical principle: sequence of energy transfer and molecular polymerization initiation',
      steps: [
        {
          num: '01',
          name: 'EMITTER',
          desc: 'Primary thermal and radiant energy source of regulated power density.'
        },
        {
          num: '02',
          name: 'FUNCTIONAL CERAMICS',
          desc: 'Special ceramic converter coating selectively transforming heat into pulsed spectral bands.'
        },
        {
          num: '03',
          name: 'PULSED IR RADIATION',
          desc: 'Pulsed photon flux with energy strictly sufficient to initiate curing without breaking formed macro chains.'
        },
        {
          num: '04',
          name: 'PAINT & VARNISH COATING',
          desc: 'Volumetric resonant absorption by the coating regardless of surface oil films or oxide traces.'
        },
        {
          num: '05',
          name: 'DRYING / POLYMERIZATION',
          desc: 'Formation of uniform polymer chains of equal length. Enhanced hardness, adhesion, and flexible stretch resistance.'
        }
      ]
    },
    coatingProperties: {
      title: 'Properties of the Resulting Coating',
      subtitle: 'Physical and mechanical advantages of the cured polymer layer',
      properties: [
        {
          title: 'High Adhesion to Substrate',
          desc: 'A very durable coating with high adhesion to the object surface is formed, guaranteeing lasting protection.'
        },
        {
          title: 'Immunity to Rust and Oil Films',
          desc: 'Neither rust nor oil interfere with the process, forming an intact and resilient layer without prior complex degreasing.'
        },
        {
          title: 'No Peeling or Cracking upon Bending',
          desc: 'Even after repeated bending of objects with such coatings, no peeling occurs and no cracks form on the coating itself.'
        },
        {
          title: 'Post-Coating Forming Capability',
          desc: 'Allows pre-painting of metal sheets which can then be formed into complex mechanical shapes without coating damage.'
        },
        {
          title: 'Tunable Coating Characteristics',
          desc: 'By adjusting the parameters of the pulsed infrared radiation, polymer chain lengths can be controlled, regulating coating properties.'
        }
      ]
    },
    companiesSection: {
      title: 'Applications & Industries',
      subtitle: 'The company RPE (Germany) has been conducting intensive marketing in the following companies over the past two years',
      image: '/images/paint/oblast_eng.png',
      imageAlt: 'Applications & industries: automotive, mechanical engineering, aviation, shipbuilding, plastics and other sectors',
      summary: 'All of the above-mentioned 25 companies have recognized the advantages of the technology based on emitters covered with functional ceramics. Over 30 companies are currently ready to replace their old technologies with ours.',
      docs: [
        { url: '/images/paint/1.jpg', alt: 'Certificate and test report 1', caption: 'Test document 1' },
        { url: '/images/paint/2.jpg', alt: 'Certificate and test report 2', caption: 'Test document 2' },
        { url: '/images/paint/3.jpg', alt: 'Certificate and test report 3', caption: 'Test document 3' },
        { url: '/images/paint/4.jpg', alt: 'Certificate and test report 4', caption: 'Test document 4' }
      ],
      industries: [
        {
          id: 'auto',
          icon: '/images/paint/67335.svg',
          title: 'Automotive industry',
          companies: 'AUDI, BMW, DAIMLER, FORD, SKODA, OPEL, VOLKSWAGEN'
        },
        {
          id: 'trucks',
          icon: '/images/paint/6228750.svg',
          title: 'Trucks and buses',
          companies: 'MAN, DAIMLER'
        },
        {
          id: 'engineering',
          icon: '/images/paint/20473.svg',
          title: 'Mechanical engineering',
          companies: 'RIPPERT, VENJAKOB, OBRICHT, BURKLE'
        },
        {
          id: 'rail',
          icon: '/images/paint/1006.svg',
          title: 'Construction of railway cars',
          companies: 'SIEMENS, Waggonbau Niesky'
        },
        {
          id: 'aviation',
          icon: '/images/paint/31202.svg',
          title: 'Aircraft construction',
          companies: 'AIRBUS'
        },
        {
          id: 'shipbuilding',
          icon: '/images/paint/25229.svg',
          title: 'Shipbuilding',
          companies: 'Meyer Werft'
        },
        {
          id: 'wind',
          icon: '/images/paint/4136939.svg',
          title: 'Wind turbines',
          companies: 'ENERCON'
        },
        {
          id: 'rubber',
          icon: '/images/paint/2105i201065Fm004c9ti.svg',
          title: 'Rubber industry',
          companies: 'CONTINENTAL'
        },
        {
          id: 'plastics',
          icon: '/images/paint/6431452.svg',
          title: 'Plastics industry',
          companies: 'KRONES, AIRBUS, KIEFEL, BRUCKNER, FRIMO, TAIYO EUROPE, RENOLIT SE'
        }
      ]
    },
    testResults: {
      title: 'Test Results',
      subtitle: 'Comparative curing parameters for industrial coatings',
      intro: 'The automotive enamel brand ML-1111, when dried using conventional methods, requires heating the surface to a temperature of at least 130 °C for 30 minutes. With the use of special ceramic converters, the drying time ranges from 7 seconds to 5 minutes, with temperature being irrelevant in this case.',
      sravImage: '/images/paint/srav_eng.png',
      sravImageAlt: 'Comparative curing parameters: ML-1111 automotive enamel',
      primerImage: '/images/paint/primer_eng.png',
      primerImageAlt: 'Substrate test matrix: polyethylene, aluminum, metal, paper',
      keyImpacts: [
        'Enhanced coating adhesion to substrate',
        'Increased surface hardness',
        'Superior resistance to stretch on bending',
        'Direct impact resistance'
      ],
      comparisonTable: {
        headers: ['Parameter', 'Conventional Method', 'With Ceramic Converters'],
        rows: [
          {
            param: 'Test Material',
            traditional: 'Automotive enamel ML-1111',
            innovative: 'Automotive enamel ML-1111'
          },
          {
            param: 'Surface Heating Temperature',
            traditional: 'at least 130 °C',
            innovative: 'Temperature is irrelevant'
          },
          {
            param: 'Drying / Polymerization Time',
            traditional: '30 minutes',
            innovative: 'from 7 seconds to 5 minutes (depending on material structure and flux density)'
          },
          {
            param: 'Degreasing Requirement',
            traditional: 'Thorough, deep degreasing mandatory',
            innovative: 'Not required (neither rust nor oil interfere with process)'
          },
          {
            param: 'Mechanical Resistance',
            traditional: 'Risk of cracking under severe deformation',
            innovative: 'Enhanced hardness, direct impact resistance, no peeling upon bending'
          }
        ]
      },
      materialsTable: {
        title: 'Test Table Across Materials',
        headers: ['Substrate Material', 'Process / Polymerization Time', 'Coating Results & Characteristics'],
        rows: [
          {
            material: 'Polyethylene',
            time: 'High-speed polymerization',
            result: 'Example of polymerization of paints on polyethylene without substrate thermal degradation'
          },
          {
            material: 'Aluminum',
            time: '1 minute',
            result: 'Polymerization on aluminum surface with high adhesion and coating density'
          },
          {
            material: 'Metal (thickness 0.8 mm)',
            time: '3 minutes',
            result: 'Polymerization of paint on metal surface. Resilient to multiple bends without peeling'
          },
          {
            material: 'Paper',
            time: '3 seconds',
            result: 'Polymerization of paint on paper surface while fully preserving sheet texture'
          }
        ]
      }
    },
    gallerySection: {
      title: 'Gallery of Specimens',
      subtitle: 'Experimental coating samples on various industrial substrates',
      items: [
        {
          id: 'polyethylene',
          title: 'Polyethylene',
          caption: 'Polyethylene',
          description: 'An example of polymerization of paints on the surface of polyethylene.',
          time: 'High-speed polymerization',
          image: '/images/paint/color_plenka.png',
          alt: 'Polyethylene'
        },
        {
          id: 'aluminum',
          title: 'Aluminum — 1 minute',
          caption: 'Aluminum — 1 minute',
          description: 'Polymerization on the surface of aluminum. Time: 1 minute.',
          time: 'Time: 1 minute',
          image: '/images/paint/color_alumin.png',
          alt: 'Aluminum — 1 minute'
        },
        {
          id: 'metal',
          title: 'Metal 0.8 mm — 3 minutes',
          caption: 'Metal 0.8 mm — 3 minutes',
          description: 'Polymerization of paint on the surface of metal (metal thickness 0.8 mm). Time: 3 minutes.',
          time: 'Time: 3 minutes (metal thickness 0.8 mm)',
          image: '/images/paint/color_metall-269x300.png',
          alt: 'Metal 0.8 mm — 3 minutes'
        },
        {
          id: 'paper',
          title: 'Paper — 3 seconds',
          caption: 'Paper — 3 seconds',
          description: 'Polymerization of paint on the surface of paper. Time: 3 seconds.',
          time: 'Time: 3 seconds',
          image: '/images/paint/color_paper-271x300.png',
          alt: 'Paper — 3 seconds'
        }
      ]
    },
    cta: {
      title: 'Get Additional Information',
      text: 'Contact KERAMIKA SINTEZ specialists for equipment selection, technological calculations, and test trials on your coating samples.',
      buttonText: 'Contact us',
      buttonLink: '/en/contact'
    }
  }
};
