/**
 * Научно-технический контент страницы «Грили и выпечка»
 * Источник: https://infraks.ru/gril и https://infraks.ru/en/gril
 * Проект: ООО «KERAMIKA SINTEZ»
 */

export const GRIL_IMAGES = [
  {
    id: 'gril-hero-bbq',
    url: '/images/grili/gr1.jpg',
    altRu: 'Приготовление мясных продуктов и птицы в ИК-гриле',
    altEn: 'Preparation of meat and poultry products in an IR grill',
    captionRu: 'Приготовление птицы и мяса с применением функциональной керамики: сохранение сочности, натурального вкуса и снижение потери массы до 2,5–3%',
    captionEn: 'Preparation of poultry and meat using functional ceramics: preservation of natural juices, flavor, and reduction of mass loss to 2.5–3%',
    tagRu: 'Гриль и жарочные шкафы',
    tagEn: 'Grills and Roasting Ovens'
  },
  {
    id: 'bakery-assorted',
    url: '/images/grili/hl1.jpg',
    altRu: 'Свежая выпечка и хлебобулочные изделия',
    altEn: 'Fresh bakery products and bread',
    captionRu: 'Выпечка хлебобулочных изделий и печенья: равномерный прогрев по «световодам» влаги, сокращение времени выпечки с 45–100 до 5–15 минут',
    captionEn: 'Baking of bread and cookies: uniform heating through moisture "light guides", baking time reduced from 45–100 to 5–15 minutes',
    tagRu: 'Хлебобулочные изделия',
    tagEn: 'Bakery Products'
  },
  {
    id: 'bakery-bun-sesame',
    url: '/images/grili/hl2.jpg',
    altRu: 'Круглая булочка с кунжутом',
    altEn: 'Round sesame bun',
    captionRu: 'Круглая булочка с кунжутом после выпечки: равномерный колер и пышная внутренняя структура без пересушивания',
    captionEn: 'Round sesame bun after baking: uniform crust color and airy crumb structure without drying out',
    tagRu: 'Булочные изделия',
    tagEn: 'Buns and Rolls'
  },
  {
    id: 'bakery-braided',
    url: '/images/grili/hl3.jpg',
    altRu: 'Плетеное сдобное изделие',
    altEn: 'Braided pastry',
    captionRu: 'Плетеное сдобное изделие: глубокое импульсное проникновение ИК-лучей обеспечивает равномерное пропекание слоев',
    captionEn: 'Braided pastry: deep pulsed IR penetration ensures uniform baking throughout all dough layers',
    tagRu: 'Сдобная выпечка',
    tagEn: 'Braided Pastry'
  },
  {
    id: 'bakery-loaf',
    url: '/images/grili/hl4.jpg',
    altRu: 'Порционный формовой хлеб',
    altEn: 'Portion bread loaf',
    captionRu: 'Порционный формовой хлебец с кунжутом: минимальная усушка (потеря массы всего 2,5–3% против 26–30% в традиционных печах)',
    captionEn: 'Portion bread loaf with sesame: minimal shrinkage (mass loss only 2.5–3% vs 26–30% in conventional ovens)',
    tagRu: 'Формовой хлеб',
    tagEn: 'Portion Loaf'
  },
  {
    id: 'bakery-baguette',
    url: '/images/grili/hl5.jpg',
    altRu: 'Багет / батон удлиненной формы',
    altEn: 'Elongated baguette / baton',
    captionRu: 'Багет удлиненной формы: импульсное излучение уничтожает дрожжевые бактерии, продлевая свежесть хлеба на несколько суток',
    captionEn: 'Elongated baguette: pulsed radiation eliminates yeast bacteria, extending bread freshness for several days',
    tagRu: 'Багеты и батоны',
    tagEn: 'Baguette / Baton'
  }
];

export const GRIL_CONTENT = {
  ru: {
    seo: {
      title: 'Грили и выпечка на основе функциональной керамики',
      description: 'Инфракрасные грили, жарочные шкафы, шашлычницы и оборудование для выпечки с применением функциональной керамики.'
    },
    breadcrumbs: [
      { title: 'Разработки', path: '/sushka' },
      { title: 'Грили и выпечка' }
    ],
    title: 'Грили и выпечка на основе функциональной керамики',
    lead: 'Разработаны и испытаны различные виды жарочных шкафов, грилей, шашлычниц, выпечных конвейеров — с использованием керамических излучателей, покрытых функциональной керамикой. Технология обеспечивает многократное ускорение термической обработки, существенное снижение энергопотребления и сохранение биологической ценности продуктов.',
    
    // 1. Принцип действия технологии
    principle: {
      title: 'Принцип действия технологии',
      paragraphs: [
        'В основе метода лежит использование керамических излучателей со специально разработанным составом функциональной керамики. Покрытие преобразует первичное тепловое излучение в направленный спектр инфракрасных волн строго определенного диапазона.',
        'Спектр излучения подобран таким образом, чтобы молекулы органических соединений продукта поглощали основную часть лучистой энергии относительно жидкости. Под действием селективного ИК-потока ускоряются целевые фотохимические реакции: происходит расщепление белков до аминокислот, крахмала — до мальтозы, сложных жиров — до жирных кислот.',
        'При этом большая часть энзимов, протеинов, природных соков, витаминов и минералов остается неповрежденной. В отличие от традиционного конвекционного нагрева, импульсное ИК-излучение использует молекулы воды, содержащиеся в продукте, в качестве естественных «световодов», передающих энергию в толщу продукта с минимальным собственным поглощением.',
        'Это обеспечивает глубокое, равномерное воздействие по всему объему изделия без пересушивания поверхности, а также одновременную глубокую стерилизацию и подавление дрожжевых бактерий при минимальных энергозатратах.'
      ],
      points: [
        {
          title: 'Функциональная керамика',
          descr: 'Керамическое микроструктурированное покрытие преобразует энергию нагревателя в резонансный ИК-спектр с высокой излучательной способностью.'
        },
        {
          title: 'Селективное поглощение',
          descr: 'Молекулы органики поглощают максимум энергии, ускоряя расщепление белков, крахмалов и жиров при сохранении энзимов и витаминов.'
        },
        {
          title: 'Молекулы воды как световоды',
          descr: 'Импульсное ИК-излучение проникает в толщу продукта по молекулам влаги, обеспечивая идеальную равномерность термообработки.'
        },
        {
          title: 'Одновременная стерилизация',
          descr: 'Глубокое подавление дрожжевой микрофлоры и микроорганизмов в процессе приготовления продлевает свежесть хлеба на несколько дней.'
        }
      ]
    },

    // 2. Блок «Грили и жарочные шкафы»
    grillSection: {
      title: 'Грили и жарочные шкафы',
      subtitle: 'Приготовление птицы, мяса, рыбы и других продуктов',
      paragraphs: [
        'Разработанные жарочные шкафы, грили и шашлычницы на основе керамических излучателей с функциональной керамикой предназначены для быстрой и бережной термической обработки мясной, рыбной и птицеводческой продукции.',
        'Качество получаемой продукции значительно выше, чем в традиционном тепловом оборудовании. За счет резонансного взаимодействия ИК-лучей с органическими структурами готовая пища по органолептическим показателям оказывается гораздо вкуснее, сочнее и питательнее.',
        'Конструкция оборудования проста в изготовлении и эксплуатации, не содержит вредных источников излучения и обеспечивает глубокую стерилизацию продукта непосредственно в процессе жарки.'
      ],
      advantagesList: [
        'полное отсутствие вредного излучения;',
        'полная стерилизация продуктов в процессе приготовления пищи;',
        'потеря массы составляет 2,5–3 % (в обычной печи до 26–30 %);',
        'значительное снижение энергозатрат на производство конечного продукта (до 30 раз);',
        'значительное, в 4 – 7 раз, сокращение времени приготовления.'
      ],
      metrics: [
        {
          label: 'Время приготовления',
          oldVal: '30–60 мин',
          newVal: '5–15 мин',
          note: 'Сокращение в 4–7 раз'
        },
        {
          label: 'Потребляемая мощность',
          oldVal: '2,2 кВт',
          newVal: '1 кВт',
          note: 'Экономия электроэнергии'
        },
        {
          label: 'Потеря массы продукта',
          oldVal: '26–30 %',
          newVal: '2,5–3 %',
          note: 'Максимальная сочность'
        },
        {
          label: 'Повышение эффективности',
          oldVal: '1×',
          newVal: 'в 6–10 раз',
          note: 'Мясо, птица, рыба'
        },
        {
          label: 'Снижение энергозатрат',
          oldVal: 'Базовые',
          newVal: 'до 30 раз',
          note: 'На единицу готовой продукции'
        }
      ]
    },

    // 3. Блок «Выпечка печенья и хлебобулочных изделий»
    bakingSection: {
      title: 'Выпечка печенья и хлебобулочных изделий',
      subtitle: 'Выпечные конвейеры и печи с импульсными керамическими излучателями',
      paragraphs: [
        'Метод выпечки основан на выборе оптимального импульсного спектра излучения. Молекулы органических компонентов теста максимально поглощают подводимую энергию, в то время как вода является проводником, минимально поглощая ее.',
        'Благодаря тому, что импульсное ИК-излучение проникает вглубь по молекулам воды, как по «световоду», тепловое воздействие на тестовые заготовки происходит идеально равномерно по всему сечению.',
        'Хлеб из такой печи сохраняет свежесть и высокие вкусовые качества в течение нескольких дней. Это достигается за счет одновременной глубокой стерилизации и уничтожения дрожжевых бактерий в процессе термообработки.',
        'Оборудование обеспечивает существенное увеличение производительности при кардинальном снижении удельных производственных затрат.'
      ],
      advantagesList: [
        'полное отсутствие вредного излучения;',
        'полная стерилизация продуктов в процессе приготовления;',
        'потеря массы составляет 2,5 – 3% (в обычных печах 26–30%);',
        'снижение энергии в 4 – 10 раз;',
        'снижение времени приготовления в 4 – 8 раз;',
        'эффективность выпечки повышается в 30 – 40 раз;',
        'значительно выше качество получаемых изделий;',
        'простота технологии и одновременная глубокая стерилизация.'
      ],
      metrics: [
        {
          label: 'Время выпечки',
          oldVal: '45–100 мин',
          newVal: '5–15 мин',
          note: 'Снижение времени в 4–8 раз'
        },
        {
          label: 'Расход энергии',
          oldVal: '36 кВт',
          newVal: '9 кВт',
          note: 'Снижение энергии в 4–10 раз'
        },
        {
          label: 'Потеря массы (усушка)',
          oldVal: '26–30 %',
          newVal: '2,5–3 %',
          note: 'Сохранение выхода готовой продукции'
        },
        {
          label: 'Эффективность выпечки',
          oldVal: '1×',
          newVal: 'в 30–40 раз',
          note: 'Рост общей эффективности'
        }
      ]
    },

    // 4. Результаты испытаний
    testResults: {
      title: 'Результаты испытаний',
      subtitle: 'Данные натурных испытаний оборудования в международных лабораториях и производствах',
      geography: 'Испытания проводились в: Узбекистане, России, Германии, США.',
      grillOvensTitle: 'Испытания жарочных мини-шкафов (Узбекистан, Россия, Германия, США):',
      grillItems: [
        {
          icon: '/images/grili/midnight.svg',
          title: 'Время сокращается',
          value: 'с 30 – 60 мин до 5 – 15 мин',
          descr: 'Сокращение времени приготовления в 4–7 раз'
        },
        {
          icon: '/images/grili/lightning_effective.svg',
          title: 'Снижение потребляемой энергии',
          value: 'с 2,2 кВт до 1 кВт',
          descr: 'Прямая экономия мощности при высокой производительности'
        },
        {
          icon: '/images/grili/progress_improvemnt_increase.svg',
          title: 'Повышение эффективности',
          value: 'в 6 – 10 раз',
          descr: 'При приготовлении птицы, мяса, рыбы и других продуктов'
        }
      ],
      bakingTitle: 'Испытания выпечного оборудования (Узбекистан, Германия, Россия):',
      bakingItems: [
        {
          icon: '/images/grili/midnight.svg',
          title: 'Время выпечки',
          value: 'с 45 – 100 мин до 5 – 15 мин',
          descr: 'Снижение времени приготовления в 4–8 раз'
        },
        {
          icon: '/images/grili/lightning_effective.svg',
          title: 'Расход энергии',
          value: 'с 36 кВт до 9 кВт',
          descr: 'Снижение энергопотребления в 4–10 раз'
        },
        {
          icon: '/images/grili/progress_improvemnt_increase.svg',
          title: 'Эффективность выпечки',
          value: 'повышается в 30 – 40 раз',
          descr: 'Существенный рост производительности линий'
        }
      ]
    },

    // 5. Преимущества
    advantagesSection: {
      title: 'Практические преимущества технологии',
      subtitle: 'Комплексные технологические и экономические выгоды применения функциональной керамики'
    },

    // 6. Сферы применения оборудования
    applications: {
      title: 'Сферы применения оборудования',
      subtitle: 'Широкий спектр конструктивных исполнений от персональной кухни до крупных промышленных комбинатов',
      items: [
        {
          title: 'Бытовая сфера',
          descr: 'Компактные бытовые жарочные шкафы, настольные грили и шашлычницы для домашнего использования с низким энергопотреблением от обычной сети 220 В.'
        },
        {
          title: 'Общественное питание (HoReCa)',
          descr: 'Высокопроизводительное оборудование для ресторанов, кафе, стейк-хаусов, пиццерий и пекарен: быстрое выполнение заказов (5–15 мин) и сохранение натуральной сочности блюд.'
        },
        {
          title: 'Пищевая промышленность',
          descr: 'Выпечные конвейеры, промышленные туннельные печи и жарочные комплексы непрерывного цикла с многократным снижением расхода электроэнергии и стабильным качеством.'
        }
      ]
    },

    // 7. Фотогалерея
    gallery: {
      title: 'Иллюстрации готовой продукции и оборудования',
      subtitle: 'Образцы хлебобулочных изделий и готовых блюд, прошедших термообработку по инфракрасной технологии',
      zoomHint: 'Нажмите на изображение для увеличения'
    }
  },

  en: {
    seo: {
      title: 'Grills and Baking Equipment Based on Functional Ceramics',
      description: 'Infrared grills, roasting ovens, barbecue makers, and baking conveyors powered by functional ceramics.'
    },
    breadcrumbs: [
      { title: 'Developments', path: '/en/sushka' },
      { title: 'Grills and Baking' }
    ],
    title: 'Grills and Baking Equipment Based on Functional Ceramics',
    lead: 'Various types of roasting ovens, grills, barbecue makers, and baking conveyors have been developed and tested using ceramic emitters coated with functional ceramics. The technology ensures significant acceleration of thermal processing, major energy savings, and preservation of the biological value of food products.',
    
    // 1. Operating principle
    principle: {
      title: 'Operating Principle of the Technology',
      paragraphs: [
        'The method is based on the use of ceramic emitters with a specially developed functional ceramic coating. This coating converts primary thermal energy into a directional spectrum of infrared waves within a precisely defined wavelength band.',
        'The radiation spectrum is selected so that organic molecules in the product absorb the majority of the radiant energy compared to liquids. Under the action of selective IR radiation, targeted photochemical reactions occur: proteins break down into amino acids, starch into maltose, and complex fats into fatty acids.',
        'At the same time, most enzymes, proteins, natural juices, vitamins, and minerals remain intact. Unlike conventional convective heating, pulsed infrared radiation uses water molecules inside the food product as natural "light guides," conveying energy deep into the product with minimal absorption by the water itself.',
        'This ensures uniform, thorough in-depth thermal processing throughout the entire volume without drying out the surface, accompanied by simultaneous deep sterilization and elimination of yeast bacteria with minimal energy consumption.'
      ],
      points: [
        {
          title: 'Functional Ceramics',
          descr: 'Microstructured ceramic coating transforms heating element energy into a resonant IR spectrum with high emissivity.'
        },
        {
          title: 'Selective Absorption',
          descr: 'Organic molecules absorb maximum energy, accelerating the breakdown of proteins, starches, and fats while preserving enzymes and vitamins.'
        },
        {
          title: 'Water Molecules as Light Guides',
          descr: 'Pulsed IR radiation penetrates deep into the product along moisture pathways, ensuring uniform thermal processing.'
        },
        {
          title: 'Simultaneous Sterilization',
          descr: 'Deep elimination of yeast bacteria and microorganisms during cooking extends bread freshness for several days.'
        }
      ]
    },

    // 2. Grills and Roasting Ovens
    grillSection: {
      title: 'Grills and Roasting Ovens',
      subtitle: 'Preparation of poultry, meat, fish, and other food products',
      paragraphs: [
        'The developed roasting ovens, grills, and barbecue makers based on ceramic emitters with functional ceramics are designed for rapid and gentle thermal processing of meat, fish, and poultry products.',
        'The quality of the resulting food is significantly higher than in conventional thermal appliances. Due to resonant interaction between IR waves and organic molecular structures, food prepared in these grills is far tastier, juicier, and more nutritious according to organoleptic indicators.',
        'The equipment manufacturing technology is straightforward and reliable, completely eliminates harmful radiation, and achieves deep product sterilization directly during the cooking process.'
      ],
      advantagesList: [
        'Complete absence of harmful radiation;',
        'Full sterilization of food during cooking;',
        'Mass loss of only 2.5–3% (compared to 26–30% in a conventional oven);',
        'Significant reduction in energy consumption for final product preparation (up to 30 times);',
        'A considerable reduction in cooking time (4 to 7 times).'
      ],
      metrics: [
        {
          label: 'Cooking Time',
          oldVal: '30–60 min',
          newVal: '5–15 min',
          note: 'Reduced by 4 to 7 times'
        },
        {
          label: 'Power Consumption',
          oldVal: '2.2 kW',
          newVal: '1 kW',
          note: 'Direct power reduction'
        },
        {
          label: 'Product Mass Loss',
          oldVal: '26–30 %',
          newVal: '2.5–3 %',
          note: 'Maximum moisture & juiciness'
        },
        {
          label: 'Efficiency Increase',
          oldVal: '1×',
          newVal: '6 to 10 times',
          note: 'Poultry, meat, fish, etc.'
        },
        {
          label: 'Energy Savings',
          oldVal: 'Baseline',
          newVal: 'up to 30 times',
          note: 'Per unit of finished product'
        }
      ]
    },

    // 3. Baking of Cookies and Bakery Products
    bakingSection: {
      title: 'Baking of Cookies and Bakery Products',
      subtitle: 'Baking conveyors and ovens with pulsed ceramic infrared emitters',
      paragraphs: [
        'Our baking method is based on selecting the appropriate pulsed radiation spectrum, where organic molecules absorb maximum energy, while water molecules present in the product act as "conductors" of energy, absorbing it minimally.',
        'The impact on the product occurs evenly, as pulsed infrared radiation penetrates deeply through water molecules, functioning like a "light guide." Consequently, dough pieces are baked uniformly throughout their entire volume.',
        'Bread baked in such an oven retains its freshness and taste for several days. This is due to simultaneous sterilization and the elimination of yeast bacteria during baking.',
        'Baking conveyors and ovens deliver a substantial increase in line productivity while drastically reducing unit energy and operational costs.'
      ],
      advantagesList: [
        'Complete absence of harmful radiation;',
        'Full sterilization of food during cooking;',
        'Mass loss is only 2.5–3% (compared to 26–30% in conventional ovens);',
        'Energy consumption reduction by 4–10 times;',
        'Cooking time reduction by 4–8 times;',
        'Baking efficiency increases by 30–40 times;',
        'Significantly higher quality of final products;',
        'Simplicity of equipment technology and simultaneous deep sterilization.'
      ],
      metrics: [
        {
          label: 'Baking Time',
          oldVal: '45–100 min',
          newVal: '5–15 min',
          note: 'Reduced by 4 to 8 times'
        },
        {
          label: 'Energy Consumption',
          oldVal: '36 kW',
          newVal: '9 kW',
          note: 'Reduced by 4 to 10 times'
        },
        {
          label: 'Mass Loss (Shrinkage)',
          oldVal: '26–30 %',
          newVal: '2.5–3 %',
          note: 'Maximum final product yield'
        },
        {
          label: 'Baking Efficiency',
          oldVal: '1×',
          newVal: '30 to 40 times',
          note: 'Overall baking efficiency gain'
        }
      ]
    },

    // 4. Test Results
    testResults: {
      title: 'Test Results',
      subtitle: 'Empirical data from physical tests conducted in international research and production facilities',
      geography: 'Tests were conducted in: Uzbekistan, Russia, Germany, and the USA.',
      grillOvensTitle: 'Tests conducted on mini roasting ovens (Uzbekistan, Russia, Germany, USA):',
      grillItems: [
        {
          icon: '/images/grili/midnight.svg',
          title: 'Cooking Time is Reduced',
          value: 'from 30–60 min to 5–15 min',
          descr: '4 to 7 times reduction in cooking time'
        },
        {
          icon: '/images/grili/lightning_effective.svg',
          title: 'Reduction in Energy Consumption',
          value: 'from 2.2 kW to 1 kW',
          descr: 'Direct energy savings with enhanced throughput'
        },
        {
          icon: '/images/grili/progress_improvemnt_increase.svg',
          title: 'Efficiency Improvement',
          value: '6 to 10 times increase',
          descr: 'When cooking poultry, meat, fish, and other foods'
        }
      ],
      bakingTitle: 'Tests conducted on baking equipment (Uzbekistan, Germany, Russia):',
      bakingItems: [
        {
          icon: '/images/grili/midnight.svg',
          title: 'Baking Time',
          value: 'from 45–100 min to 5–15 min',
          descr: 'Cooking time reduction by 4 to 8 times'
        },
        {
          icon: '/images/grili/lightning_effective.svg',
          title: 'Energy Consumption',
          value: 'from 36 kW to 9 kW',
          descr: 'Energy consumption reduction by 4 to 10 times'
        },
        {
          icon: '/images/grili/progress_improvemnt_increase.svg',
          title: 'Baking Efficiency',
          value: 'increases by 30–40 times',
          descr: 'Substantial increase in line productivity'
        }
      ]
    },

    // 5. Practical Advantages
    advantagesSection: {
      title: 'Practical Advantages of the Technology',
      subtitle: 'Comprehensive technological and economic benefits of functional ceramic IR processing'
    },

    // 6. Applications
    applications: {
      title: 'Areas of Equipment Application',
      subtitle: 'Versatile equipment configurations from compact kitchens to high-capacity industrial plants',
      items: [
        {
          title: 'Household Sector',
          descr: 'Compact household roasting ovens, tabletop grills, and barbecue units for domestic use with low power consumption on standard electrical connections.'
        },
        {
          title: 'Public Catering & HoReCa',
          descr: 'High-performance equipment for restaurants, cafes, steakhouses, pizzerias, and bakeries: rapid order turnaround (5–15 min) with maximum natural juiciness.'
        },
        {
          title: 'Food Industry',
          descr: 'Industrial baking conveyors, tunnel ovens, and automated continuous roasting systems with multi-fold electricity savings and standardized quality.'
        }
      ]
    },

    // 7. Gallery
    gallery: {
      title: 'Product and Equipment Gallery',
      subtitle: 'Samples of bakery products and prepared dishes processed with infrared ceramic technology',
      zoomHint: 'Click image to view in high resolution'
    }
  }
};
