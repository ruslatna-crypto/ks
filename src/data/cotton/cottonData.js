/**
 * Data file for Cotton Technology page: «ИК-технология в хлопководстве»
 * Source document: «Рекламный текст ИК технология хлопок.docx»
 * Strictly preserves all numbers, tables, years, and test results.
 */

export const COTTON_DATA = {
  ru: {
    seo: {
      title: "Сушка хлопка и стимуляция семян — ИК-технология | KERAMIKA SINTEZ",
      description: "Импульсная ИК-технология и функциональная керамика для предпосевной обработки семян, снижения влажности хлопка-сырца и подготовки сырья к джинированию или хранению.",
      h1: "Сушка хлопка и стимуляция семян",
      fullH1: "Сушка хлопка и стимуляция семян: обработка семян и сушка хлопка-сырца"
    },
    breadcrumbs: [
      { label: "Главная", path: "/" },
      { label: "Разработки", path: "/sushka" },
      { label: "Сушка хлопка и стимуляция семян", path: "/hlopok" }
    ],
    hero: {
      tag: "Технологическая платформа",
      title: "Сушка хлопка и стимуляция семян",
      fullTitle: "Сушка хлопка и стимуляция семян: обработка семян и сушка хлопка-сырца",
      subtitle: "Предлагаемая технология объединяет импульсное инфракрасное воздействие и функциональную керамику в единую технологическую платформу для хлопководства — от предпосевной обработки семян до сушки и подготовки хлопка-сырца к джинированию или хранению.",
      directions: [
        {
          id: "seeds",
          num: "01",
          title: "Обработка семян",
          desc: "Контролируемая предпосевная импульсная стимуляция для ускорения всходов и усиления развития растений."
        },
        {
          id: "drying",
          num: "02",
          title: "Сушка хлопка-сырца",
          desc: "Направленное воздействие на влагу с быстрым снижением влажности в первые минуты без повреждения волокна."
        },
        {
          id: "prep",
          num: "03",
          title: "Подготовка сырья",
          desc: "Эффективный отвод пара и доведение массы хлопка до технологических норм перед джинированием или закладкой на хранение."
        }
      ]
    },
    platformChain: {
      title: "Единая технологическая цепочка хлопководства",
      lead: "Технология объединяет ключевые агротехнические и перерабатывающие фазы в замкнутый технологический цикл.",
      steps: [
        {
          step: 1,
          title: "Предпосевная обработка семян",
          desc: "Импульсная ИК-обработка семян перед севом для стимуляции всхожести и раннего развития."
        },
        {
          step: 2,
          title: "Рост и развитие растений",
          desc: "Опережающее прохождение основных вегетативных фаз развития растений в полевых условиях."
        },
        {
          step: 3,
          title: "Уборка хлопка",
          desc: "Сбор хлопка-сырца с повышенным выходом волокна и высокой общей урожайностью с гектара."
        },
        {
          step: 4,
          title: "Снижение влажности хлопка-сырца",
          desc: "Спектральное импульсное ИК-излучение с непосредственным поглощением энергии свободной и связанной влагой."
        },
        {
          step: 5,
          title: "Отвод влаги и пара",
          desc: "Принудительный отвод водяного пара форсунками и вытяжной вентиляцией для предотвращения экранирования."
        },
        {
          step: 6,
          title: "Подготовка к джинированию или хранению",
          desc: "Стабилизация кондиционной влажности для сохранности волокна и эффективной первичной переработки."
        }
      ]
    },
    moisturePrinciple: {
      title: "Технология, которая работает с влагой, а не просто нагревает сырьё",
      paragraphs: [
        "В традиционной конвективной сушке основная задача решается через нагрев воздуха и передачу теплоты поверхности материала. ИК-подход использует другой принцип: излучение подбирается так, чтобы значительная часть энергии поглощалась влагой. Это позволяет направленнее воздействовать на воду внутри продукта и одновременно управлять интенсивностью процесса.",
        "Ключевое отличие предлагаемой системы — функциональная керамика. Она рассматривается не как обычный нагревательный элемент, а как спектрально-временной преобразователь, формирующий импульсное ИК-излучение. Керамический слой наносится на кварцевые трубки с нихромовой спиралью, а хлопок-сырец или семена размещаются на сетчатом поддоне для обработки с двух сторон."
      ]
    },
    energyEfficiency: {
      title: "Главное преимущество — энергоэффективность",
      lead: "Расчётные данные испытаний дают наглядное сравнение с традиционным способом сушки.",
      description: "Расчётные данные испытаний дают наглядное сравнение с традиционным способом сушки. При снижении влажности на 1–3% суммарные затраты в приведённом историческом расчёте составили 1068,8 сум для ИК-способа против 10051,5 сум для традиционной сушки. Это соответствует примерно 9,4-кратному различию в расчётных затратах. Потребление электроэнергии снизилось с 39,7 до 16,7 кВт·ч — примерно в 2,38 раза.",
      disclaimer: "Важно: эти суммы относятся к условиям и ценам исходного расчёта (2007 год) и не являются современной коммерческой сметой. При внедрении оборудование должно рассчитываться по актуальным тарифам, мощности и производительности конкретного предприятия.",
      metrics: [
        {
          label: "Расчётные затраты",
          tradValue: "10 051,5 сум",
          irValue: "1 068,8 сум",
          ratio: "≈9,4× ниже",
          comment: "Снижение затрат при сушке на 1–3% влажности"
        },
        {
          label: "Потребление электроэнергии",
          tradValue: "39,7 кВт·ч",
          irValue: "16,7 кВт·ч",
          ratio: "≈2,38× ниже",
          comment: "Энергопотребление процесса удаления влаги"
        },
        {
          label: "Снижение влажности",
          tradValue: "1–3 %",
          irValue: "1–3 %",
          ratio: "Целевой диапазон",
          comment: "Регламентное технологическое снижение влажности"
        }
      ],
      tableHead: {
        metric: "Показатель",
        traditional: "Традиционная сушка",
        infrared: "ИК-технология"
      },
      tableRows: [
        {
          name: "Расчётные затраты на снижение влажности 1–3%",
          traditional: "10051,5 сум",
          infrared: "1068,8 сум",
          diff: "≈9,4× ниже"
        },
        {
          name: "Электроэнергия",
          traditional: "39,7 кВт·ч",
          infrared: "16,7 кВт·ч",
          diff: "≈2,38× ниже"
        },
        {
          name: "Соотношение расчётных затрат",
          traditional: "1×",
          infrared: "≈9,4× ниже",
          diff: "9,4-кратная экономия"
        },
        {
          name: "Принцип передачи энергии",
          traditional: "Нагрев воздуха",
          infrared: "Целенаправленное ИК-воздействие",
          diff: "Селективное поглощение влагой"
        }
      ]
    },
    rapidDrying: {
      title: "Быстрое снижение влажности",
      paragraphs: [
        "Лабораторные испытания показали высокую скорость удаления влаги. Для образца хлопка-сырца с исходной влажностью 12% через 2 минуты была зафиксирована влажность 8,7%, а через 10 минут — 5,9%. Основная потеря влаги происходила в первые 1–2 минуты, после чего скорость снижения влажности уменьшалась по мере выхода влаги из более глубоких слоёв.",
        "Это делает ИК-сушку особенно интересной для процессов, где критичны скорость прохождения сырья через сушильную зону и точное управление конечной влажностью."
      ]
    },
    unifiedPlatform: {
      title: "Не только сушка: единая технология для хлопководства",
      paragraphs: [
        "Преимущество предлагаемого решения заключается в комплексности. Одна технологическая концепция охватывает несколько этапов: контролируемая предпосевная обработка семян, снижение влажности хлопка-сырца, управление удалением пара и подготовка сырья к джинированию или хранению."
      ]
    },
    seedResults: {
      title: "Результаты обработки семян",
      paragraphs: [
        "В полевом опыте 2011 года на сорте «Наманган-77» обработанные импульсным ИК-излучением семена дали 100% всходов 10 мая — на 2 дня раньше варианта с Далброном и на 1 день раньше непротравленного варианта. Основные фазы развития растений в дальнейшем также наступали на 2–5 дней раньше контрольных вариантов.",
        "Урожайность на участке с ИК-обработанными семенами составила 31,54 ц/га против 30,0 ц/га в обоих вариантах сравнения. Выход волокна достиг 37,4% против 36,36% для варианта с Далброном и 36,8% для непротравленных семян."
      ]
    },
    comparisonAlternatives: {
      title: "Сравнение с альтернативными подходами",
      paragraphs: [
        "Для позиционирования технологии важно учитывать не только традиционную сушку горячим воздухом, но и современные электромагнитные методы. Более широкой используется сушка сельскохозяйственного сырья микроволновая технология часто демонстрирует высокую скорость и хорошее проникновение энергии в объём материала. Однако для микроволн характерны и технологические ограничения, включая риск неравномерного нагрева и локального повреждения материала. Поэтому прямое утверждение о превосходстве одного метода над другим требует испытаний именно на хлопке и в одинаковых промышленных условиях.",
        "Именно сочетание направленного ИК-воздействия, импульсного режима и функциональной керамики формирует отличительную технологическую концепцию. В отличие от простого электрического нагрева, задача заключается не в максимальном нагреве всего материала, а в согласовании спектра излучения с поглощением воды и управлении переносом влаги."
      ]
    },
    keyFeature: {
      title: "Ключевая особенность",
      quote: "Именно сочетание направленного ИК-воздействия, импульсного режима и функциональной керамики формирует отличительную технологическую концепцию.",
      explanation: "В отличие от простого электрического нагрева, задача заключается не в максимальном нагреве всего материала, а в согласовании спектра излучения с поглощением воды и управлении переносом влаги.",
      triad: [
        {
          id: "ceramics",
          title: "Функциональная керамика",
          role: "Спектральный преобразователь диапазона излучения"
        },
        {
          id: "pulse",
          title: "Импульсный режим",
          role: "Управление термодинамическими циклами и паузами"
        },
        {
          id: "directional",
          title: "Направленное ИК-воздействие",
          role: "Селективная доставка энергии к молекулам влаги"
        }
      ],
      resultTitle: "Управление переносом влаги",
      resultDesc: "Адресное воздействие на связанную и свободную воду без деструкции целлюлозного волокна и перегрева семян."
    },
    industrialAdvantages: {
      title: "Почему это интересно промышленности",
      lead: "Шесть технологических и экономических преимуществ непрерывного ИК-комплекса:",
      cards: [
        {
          num: "01",
          title: "Снижение зависимости от нагретого воздуха",
          desc: "Снижение зависимости процесса от большого объёма нагретого воздуха и исключение избыточных теплопотерь в окружающую среду."
        },
        {
          num: "02",
          title: "Регулирование интенсивности по влажности",
          desc: "Возможность регулировать интенсивность воздействия в зависимости от исходной влажности поступающего сырья."
        },
        {
          num: "03",
          title: "Контроль скорости через сушильную зону",
          desc: "Точный контроль скорости движения сырья через сушильную зону для достижения регламентных показателей влажности."
        },
        {
          num: "04",
          title: "Эффективный отвод водяного пара",
          desc: "Организация эффективного отвода водяного пара, чтобы он не экранировал ИК-излучение и не конденсировался обратно."
        },
        {
          num: "05",
          title: "Построение непрерывной линии",
          desc: "Возможность построения непрерывной линии с ИК-модулями, транспортёрами и системой удаления влаги."
        },
        {
          num: "06",
          title: "Единая технологическая концепция",
          desc: "Единая технологическая концепция для обработки семян и сушки хлопка-сырца в рамках единого агропромышленного комплекса."
        }
      ]
    },
    equipmentConstruction: {
      title: "Конструкция установки",
      lead: "Конструкция установки предусматривает ИК-излучатели с функциональной керамикой, ленточные транспортёры и воздушные форсунки для отвода испаряющейся влаги.",
      note: "Производительность и режим обработки могут регулироваться изменением интенсивности ИК-излучения и скорости транспортёра.",
      elements: [
        {
          num: "1",
          name: "ИК-излучатели с функциональной керамикой",
          desc: "Специальные кварцевые излучатели с функциональным керамическим слоем для спектральной генерации ИК-волн."
        },
        {
          num: "2",
          name: "Ленточный транспортёр",
          desc: "Сетчатое полотно конвейера, обеспечивающее двустороннее облучение и непрерывное перемещение сырья."
        },
        {
          num: "3",
          name: "Хлопок-сырец",
          desc: "Равномерный слой волокна и семян, проходящий через зону регулируемого импульсного излучения."
        },
        {
          num: "4",
          name: "Воздушные форсунки",
          desc: "Локальный обдув для своевременного сдува паровой подушки с поверхности хлопкового слоя."
        },
        {
          num: "5",
          name: "Отвод испаряющейся влаги",
          desc: "Система вытяжных каналов и циклонов для окончательной эвакуации влажного пара из рабочей зоны."
        }
      ]
    },
    finalPlatform: {
      title: "Технологическая платформа, готовая к масштабированию",
      lead: "Единое инженерное решение объединяет все ключевые этапы хлопкового цикла:",
      items: [
        "Предпосевная обработка семян",
        "Сушка хлопка-сырца",
        "Управление влажностью",
        "Удаление пара",
        "Транспортировка сырья",
        "Подготовка к джинированию",
        "Подготовка к длительному хранению"
      ],
      ctaText: "Обсудить технологию",
      btnText: "Связаться с нами",
      btnLink: "/contact"
    }
  },

  en: {
    seo: {
      title: "Cotton Drying and Seed Stimulation — IR Technology | KERAMIKA SINTEZ",
      description: "Pulsed infrared technology and functional ceramics for seed treatment, raw cotton drying and moisture control.",
      h1: "Cotton Drying and Seed Stimulation",
      fullH1: "Cotton Drying and Seed Stimulation: Seed Treatment and Raw Cotton Drying"
    },
    breadcrumbs: [
      { label: "Home", path: "/en" },
      { label: "Developments", path: "/en/sushka" },
      { label: "Cotton Drying and Seed Stimulation", path: "/en/cotton" }
    ],
    hero: {
      tag: "Technological Platform",
      title: "Cotton Drying and Seed Stimulation",
      fullTitle: "Cotton Drying and Seed Stimulation: Seed Treatment and Raw Cotton Drying",
      subtitle: "The proposed technology integrates pulsed infrared radiation and functional ceramics into a unified technological platform for cotton production — from pre-sowing seed treatment to drying and preparing raw cotton for ginning or storage.",
      directions: [
        {
          id: "seeds",
          num: "01",
          title: "Seed Treatment",
          desc: "Controlled pre-sowing pulsed IR stimulation for accelerated emergence and plant vigor."
        },
        {
          id: "drying",
          num: "02",
          title: "Raw Cotton Drying",
          desc: "Targeted moisture removal with rapid dehydration in initial minutes without fiber degradation."
        },
        {
          id: "prep",
          num: "03",
          title: "Raw Material Preparation",
          desc: "Efficient steam evacuation and bringing cotton mass to standard moisture conditions for ginning or storage."
        }
      ]
    },
    platformChain: {
      title: "Unified Cotton Production Process Chain",
      lead: "The technology integrates key agronomic and processing stages into a closed industrial cycle.",
      steps: [
        {
          step: 1,
          title: "Pre-sowing Seed Treatment",
          desc: "Pulsed IR irradiation of seeds prior to sowing to stimulate germination and early plant development."
        },
        {
          step: 2,
          title: "Plant Growth and Development",
          desc: "Accelerated passage of key vegetative growth stages under field conditions."
        },
        {
          step: 3,
          title: "Cotton Harvesting",
          desc: "Harvesting raw cotton with higher fiber turnout and greater total yield per hectare."
        },
        {
          step: 4,
          title: "Raw Cotton Moisture Reduction",
          desc: "Spectral pulsed IR radiation with direct energy absorption by free and bound water."
        },
        {
          step: 5,
          title: "Steam and Moisture Removal",
          desc: "Forced extraction of water vapor by air nozzles and exhaust ventilation to avoid radiation shielding."
        },
        {
          step: 6,
          title: "Preparation for Ginning or Storage",
          desc: "Stabilizing standard moisture levels for fiber preservation and high-efficiency primary processing."
        }
      ]
    },
    moisturePrinciple: {
      title: "Technology That Works with Moisture Rather Than Merely Heating Raw Material",
      paragraphs: [
        "In traditional convective drying, the primary task is accomplished by heating air and transferring heat to the material surface. The IR approach utilizes a different physical mechanism: the radiation spectrum is tailored so that a substantial portion of the energy is directly absorbed by water molecules. This allows targeted action upon internal moisture while dynamically controlling process intensity.",
        "The core distinction of the proposed system is functional ceramics. It is viewed not as a standard heating element, but as a spectral-temporal converter generating pulsed infrared radiation. The ceramic layer is deposited onto quartz tubes containing nichrome heating coils, while raw cotton or seeds are conveyed on a mesh tray for double-sided treatment."
      ]
    },
    energyEfficiency: {
      title: "Main Advantage — Energy Efficiency",
      lead: "Experimental test calculations demonstrate a clear comparison against the traditional drying method.",
      description: "Experimental test calculations demonstrate a clear comparison against the traditional drying method. When reducing moisture content by 1–3%, the total estimated cost in the baseline historical calculation was 1,068.8 UZS for the IR method versus 10,051.5 UZS for traditional drying. This corresponds to an approximate 9.4-fold cost advantage. Electrical energy consumption was reduced from 39.7 kWh to 16.7 kWh — a factor of approximately 2.38.",
      disclaimer: "Important: calculated values correspond to the baseline parameters and tariffs of the original 2007 calculation and do not represent a contemporary commercial cost estimate. Industrial installations must be calculated based on current tariffs, facility capacity, and required throughput.",
      metrics: [
        {
          label: "Estimated Cost",
          tradValue: "10,051.5 UZS",
          irValue: "1,068.8 UZS",
          ratio: "≈9.4× lower",
          comment: "Cost reduction for 1–3% moisture removal"
        },
        {
          label: "Electricity Consumption",
          tradValue: "39.7 kWh",
          irValue: "16.7 kWh",
          ratio: "≈2.38× lower",
          comment: "Specific energy consumption for drying"
        },
        {
          label: "Moisture Reduction",
          tradValue: "1–3 %",
          irValue: "1–3 %",
          ratio: "Target range",
          comment: "Standard technological dehydration span"
        }
      ],
      tableHead: {
        metric: "Metric",
        traditional: "Traditional Drying",
        infrared: "IR Technology"
      },
      tableRows: [
        {
          name: "Calculated cost for 1–3% moisture reduction",
          traditional: "10,051.5 UZS",
          infrared: "1,068.8 UZS",
          diff: "≈9.4× lower"
        },
        {
          name: "Electricity consumption",
          traditional: "39.7 kWh",
          infrared: "16.7 kWh",
          diff: "≈2.38× lower"
        },
        {
          name: "Estimated cost ratio",
          traditional: "1×",
          infrared: "≈9.4× lower",
          diff: "9.4-fold saving"
        },
        {
          name: "Energy transfer principle",
          traditional: "Convective air heating",
          infrared: "Targeted IR irradiation",
          diff: "Selective water absorption"
        }
      ]
    },
    rapidDrying: {
      title: "Rapid Moisture Reduction",
      paragraphs: [
        "Laboratory trials demonstrated a high rate of moisture removal. For a raw cotton sample with an initial moisture content of 12%, a moisture level of 8.7% was recorded after 2 minutes, and 5.9% after 10 minutes. The primary moisture loss occurred in the first 1–2 minutes, after which the rate of moisture reduction tapered as moisture was extracted from deeper layers.",
        "This makes IR drying particularly advantageous for continuous industrial processes where conveyor throughput speed and precise control of target end moisture are critical."
      ]
    },
    unifiedPlatform: {
      title: "Not Just Drying: A Unified Technology for Cotton Production",
      paragraphs: [
        "The advantage of the proposed solution lies in its end-to-end integration. A single technological concept encompasses multiple production stages: controlled pre-sowing seed treatment, raw cotton moisture reduction, vapor extraction control, and raw material preparation for ginning or long-term storage."
      ]
    },
    seedResults: {
      title: "Seed Treatment Results",
      paragraphs: [
        "In a 2011 field agronomic trial with the 'Namangan-77' variety, seeds treated with pulsed infrared radiation achieved 100% seedling emergence on May 10 — 2 days earlier than the Dalbron chemical treatment variant and 1 day earlier than the untreated control. Subsequent primary plant development phases also occurred 2–5 days earlier than in the control variants.",
        "Yield on the test plot with IR-treated seeds reached 31.54 c/ha compared to 30.0 c/ha in both comparative control variants. Fiber turnout reached 37.4% versus 36.36% for the Dalbron variant and 36.8% for untreated seeds."
      ]
    },
    comparisonAlternatives: {
      title: "Comparison with Alternative Approaches",
      paragraphs: [
        "To position the technology accurately, it is essential to evaluate conventional hot-air drying alongside modern electromagnetic methods. In agricultural drying applications, microwave technology frequently demonstrates rapid heating and deep volumetric penetration. However, microwave processing carries known technological challenges, including risks of localized uneven heating and product degradation. Therefore, a direct claim of superiority of one method over another requires comprehensive testing specifically on raw cotton under identical industrial conditions.",
        "It is specifically the combination of targeted IR radiation, pulsed regime, and functional ceramics that defines this distinctive technological concept. Unlike simple resistive electric heating, the engineering objective is not bulk overheating of the entire mass, but aligning the emission spectrum with water absorption bands and managing moisture transport dynamics."
      ]
    },
    keyFeature: {
      title: "Key Technological Feature",
      quote: "It is specifically the combination of targeted IR radiation, pulsed regime, and functional ceramics that defines this distinctive technological concept.",
      explanation: "Unlike simple resistive electric heating, the engineering objective is not bulk overheating of the entire mass, but aligning the emission spectrum with water absorption bands and managing moisture transport dynamics.",
      triad: [
        {
          id: "ceramics",
          title: "Functional Ceramics",
          role: "Spectral converter matching water molecule absorption bands"
        },
        {
          id: "pulse",
          title: "Pulsed Regime",
          role: "Dynamic thermodynamic cycles preventing fiber overheat"
        },
        {
          id: "directional",
          title: "Directional IR Radiation",
          role: "Targeted photon delivery directly into moisture sites"
        }
      ],
      resultTitle: "Managed Moisture Transport",
      resultDesc: "Selective mobilization of free and bound moisture without cellulose fiber damage or seed overheating."
    },
    industrialAdvantages: {
      title: "Why Industry Is Interested",
      lead: "Six key engineering and economic advantages for continuous industrial operation:",
      cards: [
        {
          num: "01",
          title: "Reduced Dependence on Heated Air",
          desc: "Lower reliance on vast volumes of preheated air, eliminating major thermal losses to ambient factory spaces."
        },
        {
          num: "02",
          title: "Moisture-Adaptive Power Control",
          desc: "Ability to modulate irradiation intensity dynamically based on initial raw cotton moisture content."
        },
        {
          num: "03",
          title: "Controlled Conveyor Transit Speed",
          desc: "Precise regulation of raw material transit velocity through the drying tunnel to hit target moisture specs."
        },
        {
          num: "04",
          title: "Active Steam Evacuation",
          desc: "Organized removal of evaporated water vapor to prevent radiant shielding and secondary condensation."
        },
        {
          num: "05",
          title: "Continuous Production Line Integration",
          desc: "Modular architecture allowing integration with automated conveyors, IR zones, and exhaust systems."
        },
        {
          num: "06",
          title: "Unified Platform Concept",
          desc: "A single scientific and technological platform spanning seed stimulation through raw cotton processing."
        }
      ]
    },
    equipmentConstruction: {
      title: "Installation Design and Components",
      lead: "The equipment layout comprises functional ceramic IR emitters, mesh belt conveyors, and air nozzles for evacuating evaporated moisture.",
      note: "Throughput capacity and operational regime can be regulated by varying IR radiation intensity and conveyor belt speed.",
      elements: [
        {
          num: "1",
          name: "Functional Ceramic IR Emitters",
          desc: "Quartz tubes with nichrome coils and functional ceramic coating tuned for selective spectral emission."
        },
        {
          num: "2",
          name: "Belt Conveyor",
          desc: "Wire mesh conveyor belt allowing dual-sided infrared penetration and continuous material transport."
        },
        {
          num: "3",
          name: "Raw Cotton",
          desc: "Even layer of raw cotton moving through the pulsed infrared radiation zone."
        },
        {
          num: "4",
          name: "Air Nozzles",
          desc: "Strategic air jets breaking boundary vapor layers and carrying moisture away from fiber surfaces."
        },
        {
          num: "5",
          name: "Steam & Moisture Exhaust",
          desc: "Ducted ventilation hood and exhaust blowers evacuating humid air from the process chamber."
        }
      ]
    },
    finalPlatform: {
      title: "A Technological Platform Ready for Industrial Scaling",
      lead: "An integrated engineering platform uniting all critical phases of the cotton production cycle:",
      items: [
        "Pre-sowing seed treatment",
        "Raw cotton drying",
        "Moisture regulation",
        "Steam extraction",
        "Raw material transport",
        "Preparation for ginning",
        "Preparation for long-term storage"
      ],
      ctaText: "Discuss Technology",
      btnText: "Contact Us",
      btnLink: "/contact"
    }
  }
};

export const COTTON_IMAGES = [
  {
    id: "cotton-dryer-start",
    url: "/images/hlopok/cotton_hero_start.png",
    altRu: "Промышленная многоярусная ИК-сушилка для хлопка KS-250-3",
    altEn: "Industrial multi-tier IR cotton dryer KS-250-3",
    captionRu: "Многоярусная промышленная ИК-сушилка для хлопка KS-250-3: конвейерная линия, вытяжная система и пульт управления",
    captionEn: "Industrial multi-tier IR cotton dryer KS-250-3: conveyor line, ventilation exhaust and automated control unit",
    tagRu: "Сушильная установка",
    tagEn: "Drying Unit"
  },
  {
    id: "cotton-comparison-chart",
    url: "/images/hlopok/sravnenie1.png",
    urlRu: "/images/hlopok/sravnenie1.png",
    urlEn: "/images/hlopok/sravnenie1_eng.png",
    altRu: "Сравнение традиционной конвективной сушки и ИК-технологии с керамикой",
    altEn: "Comparison of conventional convective drying and IR technology with ceramics",
    captionRu: "Сравнение физического принципа и экономических преимуществ: конвективный нагрев горячим воздухом против импульсного ИК-излучения с керамикой",
    captionEn: "Comparison of physical principle and economic advantages: convective hot-air heating vs pulsed IR radiation with functional ceramics",
    tagRu: "Сравнение технологий",
    tagEn: "Technology Comparison"
  },
  {
    id: "cotton-drying-tech-comparison",
    url: "/images/hlopok/sravsush.png",
    urlRu: "/images/hlopok/sravsush.png",
    urlEn: "/images/hlopok/sravsush_eng.png",
    altRu: "Сравнение технологий сушки: расчётные затраты и потребление электроэнергии",
    altEn: "Comparison of drying technologies: calculated operational costs and electricity consumption",
    captionRu: "Сравнение технологий сушки: расчётные затраты (≈9,4× ниже) и потребление электроэнергии (≈2,38× ниже)",
    captionEn: "Comparison of drying technologies: calculated operational costs (≈9.4× lower) and power consumption (≈2.38× lower)",
    tagRu: "Энергоэффективность",
    tagEn: "Energy Efficiency"
  },
  {
    id: "cotton-seeds-comparison",
    url: "/images/hlopok/semena.png",
    urlRu: "/images/hlopok/semena.png",
    urlEn: "/images/hlopok/semena_eng.png",
    altRu: "Сравнение технологий обработки семян хлопка: ИК-обработка, Далброн и контроль",
    altEn: "Comparison of cotton seed treatment technologies: IR treatment, Dalbron, and control",
    captionRu: "Сравнение технологий обработки семян хлопка: полевой опыт (сорт «Наманган-77»), сроки всходов, фазы развития, урожайность (31,54 ц/га) и выход волокна (37,4%)",
    captionEn: "Comparison of cotton seed treatment technologies: field trial (variety «Namangan-77»), germination timing, growth phases, yield (31.54 c/ha), and fiber output (37.4%)",
    tagRu: "Обработка семян",
    tagEn: "Seed Treatment"
  },
  {
    id: "cotton-criteria-comparison",
    url: "/images/hlopok/criteriya.png",
    urlRu: "/images/hlopok/criteriya.png",
    urlEn: "/images/hlopok/criteriya_eng.png",
    altRu: "Сравнение технологий сушки по критериям: передача энергии, управление, энергоэффективность",
    altEn: "Comparison of drying technologies by criteria: energy transfer, control, and efficiency",
    captionRu: "Критерии сравнения: предлагаемая ИК-технология с функциональной керамикой, конвективный горячий воздух и микроволновая сушка",
    captionEn: "Comparison criteria: proposed IR technology with functional ceramics, convective hot air, and microwave drying",
    tagRu: "Критерии сравнения",
    tagEn: "Comparison Criteria"
  },
  {
    id: "cotton-industrial-interest",
    url: "/images/hlopok/interes.png",
    urlRu: "/images/hlopok/interes.png",
    urlEn: "/images/hlopok/interes_eng.png",
    altRu: "Шесть преимуществ непрерывного ИК-комплекса для хлопковой промышленности",
    altEn: "Six advantages of continuous IR drying system for cotton industry",
    captionRu: "Шесть технологических и экономических преимуществ непрерывного промышленного ИК-комплекса",
    captionEn: "Six technological and economic advantages of the continuous industrial IR drying system",
    tagRu: "Промышленные преимущества",
    tagEn: "Industrial Advantages"
  },
  {
    id: "cotton-dryer-industrial",
    url: "/images/hlopok/ustanovka.png",
    urlRu: "/images/hlopok/ustanovka.png",
    urlEn: "/images/hlopok/ustanovka.png",
    altRu: "Многоярусная ИК-сушилка для хлопка KS-250-3 с функциональной керамикой: общий вид и узлы",
    altEn: "Multi-tier IR cotton dryer KS-250-3 with functional ceramics: overview and functional units",
    captionRu: "Многоярусная промышленная ИК-сушилка для хлопка KS-250-3: конвейерная линия, вытяжная система и пульт управления",
    captionEn: "Industrial multi-tier IR cotton dryer KS-250-3: conveyor line, ventilation exhaust and automated control unit",
    tagRu: "Промышленная установка",
    tagEn: "Industrial Unit"
  },
  {
    id: "cotton-conveyor-real",
    url: "/images/hlopok/cotton_ust.png",
    altRu: "Хлопок-сырец на сетчатом ленточном транспортёре сушильной установки",
    altEn: "Raw cotton on mesh belt conveyor in industrial IR drying installation",
    captionRu: "Хлопок-сырец в рабочей зоне установки: подача сырья и равномерная обработка ИК-излучением",
    captionEn: "Raw cotton in active drying zone: conveyor feed and uniform infrared radiation treatment",
    tagRu: "Производственный опыт",
    tagEn: "Field Experience"
  },
  {
    id: "cotton-bales-storage",
    url: "/images/hlopok/cotton_hero_2.png",
    altRu: "Кондиционный хлопок в тюках на складе готовой продукции",
    altEn: "Standard moisture cotton bales stored in industrial warehouse",
    captionRu: "Подготовка сырья к джинированию и хранению: стабилизация влажности предотвращает порчу волокна",
    captionEn: "Preparation for ginning and storage: moisture stabilization preserves fiber quality",
    tagRu: "Складирование и джинирование",
    tagEn: "Storage & Ginning"
  },
  {
    id: "cotton-field-harvest",
    url: "/images/hlopok/cotton_hero_3.png",
    altRu: "Уборка хлопка-сырца в поле и подача на транспортёр",
    altEn: "Raw cotton harvesting in field and conveyor loading",
    captionRu: "Уборка хлопка: сырьё поступает с естественной влажностью и требует бережного регулируемого снижения влаги",
    captionEn: "Cotton harvesting: raw crop arrives with field moisture requiring gentle, regulated moisture reduction",
    tagRu: "Сбор урожая",
    tagEn: "Field Harvest"
  },
  {
    id: "cotton-protocol-isp",
    url: "/images/hlopok/protokol_isp.jpg",
    urlRu: "/images/hlopok/protokol_isp.jpg",
    urlEn: "/images/hlopok/protokol_isp.jpg",
    altRu: "Протокол испытаний установки сушки хлопка",
    altEn: "Cotton drying installation test protocol",
    captionRu: "Протокол испытаний опытно-промышленной установки сушки хлопка-сырца",
    captionEn: "Test report of pilot-industrial raw cotton drying installation",
    tagRu: "Протокол испытаний",
    tagEn: "Test Report"
  },
  {
    id: "cotton-svedenie",
    url: "/images/hlopok/Svedenie.jpg",
    urlRu: "/images/hlopok/Svedenie.jpg",
    urlEn: "/images/hlopok/Svedenie.jpg",
    altRu: "Сведения по сушке хлопка",
    altEn: "Cotton drying test report",
    captionRu: "Сведения о результатах сушки хлопка-сырца на ИК-установке",
    captionEn: "Data and results of raw cotton drying on IR installation",
    tagRu: "Сведения по сушке",
    tagEn: "Drying Report"
  },
  {
    id: "cotton-svedenie-1",
    url: "/images/hlopok/Svedenie1.jpg",
    urlRu: "/images/hlopok/Svedenie1.jpg",
    urlEn: "/images/hlopok/Svedenie1.jpg",
    altRu: "Сведения по сушке хлопка",
    altEn: "Cotton drying test report",
    captionRu: "Сведения о результатах сушки хлопка-сырца на ИК-установке",
    captionEn: "Data and results of raw cotton drying on IR installation",
    tagRu: "Сведения по сушке",
    tagEn: "Drying Report"
  }
];

