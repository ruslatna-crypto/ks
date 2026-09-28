/**
 * Научно-технический контент страницы «Стерилизация инструментов»
 * Источник: https://infraks.ru/steril и https://infraks.ru/en/steril
 * Проект: ООО «KERAMIKA SINTEZ»
 */

export const STERIL_IMAGES = [
  {
    id: 'scalpel-autoclave-1',
    url: '/images/steril/ster4.jpg',
    altRu: 'Поверхность скальпеля после автоклава',
    altEn: 'Scalpel surface after autoclave',
    captionRu: 'Поверхность скальпеля после автоклава',
    captionEn: 'Scalpel surface after autoclave',
    tagRu: 'Автоклав',
    tagEn: 'Autoclave'
  },
  {
    id: 'scalpel-ir-1',
    url: '/images/steril/ster5.jpg',
    altRu: 'Поверхность скальпеля после ИК стерилизатора',
    altEn: 'Scalpel surface after IR sterilizer',
    captionRu: 'Поверхность скальпеля после ИК стерилизатора',
    captionEn: 'Scalpel surface after IR sterilizer',
    tagRu: 'ИК стерилизатор',
    tagEn: 'IR sterilizer'
  },
  {
    id: 'scalpel-new',
    url: '/images/steril/ster1.jpg',
    altRu: 'Поверхность нового скальпеля',
    altEn: 'Surface of a new scalpel',
    captionRu: 'Поверхность нового скальпеля',
    captionEn: 'Surface of a new scalpel',
    tagRu: 'Контрольный образец',
    tagEn: 'Control sample'
  },
  {
    id: 'scalpel-autoclave-2',
    url: '/images/steril/ster2.jpg',
    altRu: 'Поверхность скальпеля после автоклава',
    altEn: 'Scalpel surface after autoclave',
    captionRu: 'Поверхность скальпеля после автоклава',
    captionEn: 'Scalpel surface after autoclave',
    tagRu: 'Автоклав (деталь)',
    tagEn: 'Autoclave (detail)'
  },
  {
    id: 'scalpel-ir-2',
    url: '/images/steril/ster3.jpg',
    altRu: 'Поверхность скальпеля после ИК стерилизатора',
    altEn: 'Scalpel surface after ИК стерилизатора',
    captionRu: 'Поверхность скальпеля после ИК стерилизатора',
    captionEn: 'Scalpel surface after IR sterilizer',
    tagRu: 'ИК стерилизатор (деталь)',
    tagEn: 'IR sterilizer (detail)'
  },
  {
    id: 'sterilizer-ks250',
    url: '/images/steril/steriliz.png',
    altRu: 'Инфракрасный стерилизатор Infrared Sterilizer KS-250 (Keramika Sintez)',
    altEn: 'Infrared Sterilizer KS-250 (Keramika Sintez)',
    captionRu: 'Инфракрасный стерилизатор Infrared Sterilizer KS-250 (Keramika Sintez)',
    captionEn: 'Infrared Sterilizer KS-250 (Keramika Sintez)',
    tagRu: 'Стерилизатор KS-250',
    tagEn: 'Sterilizer KS-250'
  },
  {
    id: 'principle-diagram',
    url: '/images/steril/princ.png',
    altRu: 'Принцип действия импульсной ИК-стерилизации',
    altEn: 'Operating principle of pulsed IR sterilization',
    captionRu: 'Принцип действия импульсной ИК-стерилизации',
    captionEn: 'Operating principle of pulsed IR sterilization',
    tagRu: 'Принцип действия',
    tagEn: 'Operating principle'
  }
];

export const STERIL_CONTENT = {
  ru: {
    seo: {
      title: 'Стерилизация инструментов',
      description: 'Инфракрасные стерилизаторы для медицинских инструментов и оборудования. Быстрая, эффективная и безопасная стерилизация без химикатов. Энергосбережение и надежность. Подходит для клиник, лабораторий и производств. Узнайте больше!'
    },
    breadcrumbs: [
      { title: 'Разработки', path: '/sushka' },
      { title: 'Стерилизация инструментов' }
    ],
    title: 'Стерилизация инструментов',
    functionalCeramics: {
      title: 'Стерилизаторы на основе функциональной керамики',
      paragraphs: [
        'Специальное керамическое покрытие преобразует первичное излучение в импульсное инфракрасное излучение высокой плотности.',
        'Ключевой особенностью метода является не только нагрев стерилизуемого объекта, но и формирование импульсного потока излучения, способного проникать в обрабатываемый материал. Это позволяет работать при меньшей средней мощности по сравнению с непрерывным излучением и поддерживать сравнительно невысокую температуру в рабочей камере.',
        'Конструкции стерилизаторов разрабатывались с учётом назначения устройства, объёма рабочей камеры, площади облучаемой поверхности и особенностей стерилизуемого материала.'
      ]
    },
    medicalInstruments: {
      title: 'Стерилизация медицинских инструментов',
      paragraphs: [
        'Стерилизаторы предназначены для обработки медицинских инструментов, в том числе стеклянных и металлических изделий. Режимы обработки медицинского инструмента при температурах 100–180 °C и времени стерилизации до 5 минут.',
        'Для традиционного автоклава температуры 121–132 °C и продолжительность стерилизации 1–1,5 часа. В качестве одного из недостатков влажной стерилизации авторы рассматривают сочетание высокой температуры и влаги, связывая его с возможностью коррозии и изменения поверхности инструментов.',
        'Импульсное инфракрасное излучение, согласно методу, позволяет обеспечить большую глубину воздействия без необходимости поддерживать высокую среднюю мощность непрерывного излучения.',
        'В результате испытаний, в которых состояние поверхности инструментов после обработки оценивалось как улучшенное. Исследования были проведены в Калифорнийском медицинском университете.'
      ]
    },
    pulsePrinciple: {
      title: 'Принцип действия импульсной ИК-стерилизации',
      paragraphs: [
        'Основой технологии является функциональная керамика, преобразующая тепло первичного источника в инфракрасное излучение с заданными характеристиками.',
        'Физико-техническое описание. Импульсное ИК-излучение, находящееся в резонансе с молекулами воды, должно проникать в микроорганизм и быстро передавать энергию содержащейся в нём влаге. Это приводит к быстрому нагреву влаги, образованию пара и, согласно описываемому механизму, разрушению структуры микроорганизма.',
        'Дополнительно рассматривается воздействие ИК-излучения на органические молекулы, а также на процессы, связанные с жизнедеятельностью и размножением микроорганизмов.'
      ]
    },
    technicalFeatures: {
      title: 'Основные технические особенности технологии',
      items: [
        'использование функциональной керамики в качестве преобразующего элемента инфракрасного излучения;',
        'формирование импульсов высокой плотности;',
        'направленное распределение излучения внутри рабочей камеры;',
        'возможность обработки объекта без использования дополнительной влаги;',
        'контроль температуры стерилизуемого инструмента в конструкциях, где предусмотрен температурный датчик;',
        'программируемые режимы стерилизации в описанных конструкциях;',
        'системы блокировки при неполном цикле, открытой дверце или нарушении работы излучателей;',
        'световая и звуковая индикация окончания цикла и неисправностей.'
      ]
    },
    otherObjects: {
      title: 'Стерилизаторы для других объектов',
      paragraphs: [
        'Помимо медицинских инструментов, импульсные стерилизаторы могут применяться для обработки перевязочных материалов, матрацев, одежды и других объектов. Для этого направления в источнике приведён режим с температурой до 60 °C и временем обработки 20–60 минут.',
        'Функциональная керамика также рассматривается для применения в системах утилизации госпитальных отходов. Описываемый цикл включает сушку с одновременной низкотемпературной стерилизацией, высокотемпературную обработку, импульсное воздействие и последующее сжигание органических остатков.',
        'Описанные разработки демонстрируют направление применения функциональной керамики в системах инфракрасной стерилизации. Основой подхода является преобразование энергии первичного нагревательного источника в направленное инфракрасное излучение, в том числе импульсное. Особое внимание уделяется равномерности облучения рабочей зоны, глубине проникновения излучения, контролю температуры, программированию режимов и безопасности оператора.'
      ]
    },
    surface: {
      title: 'Поверхность инструментов после обработки',
      subtitle: 'Сравнительный анализ состояния режущей кромки и микроструктуры поверхности скальпеля',
      zoomHint: 'Нажмите на изображение для детального просмотра в высоком разрешении'
    }
  },
  en: {
    seo: {
      title: 'Sterilization of instruments',
      description: 'The main advantage of sterilization using infrared emitters (coated with special pulsed functional ceramics) is that, unlike currently used methods, it achieves 100% elimination of all microorganisms.'
    },
    breadcrumbs: [
      { title: 'Developments', path: '/en/sushka' },
      { title: 'Sterilization of instruments' }
    ],
    title: 'Sterilization of instruments',
    functionalCeramics: {
      title: 'Functional ceramics-based sterilizers',
      paragraphs: [
        'A specialized ceramic coating converts primary radiation into pulsed high-density infrared radiation.',
        'A key feature of the method is not only heating the sterilized object, but also forming a pulsed radiation flux capable of penetrating the processed material. This allows operation at lower average power compared to continuous radiation and maintains a relatively low temperature in the operating chamber.',
        'Sterilizer designs were developed taking into account device purpose, operating chamber volume, irradiated surface area, and characteristics of the sterilized material.'
      ]
    },
    medicalInstruments: {
      title: 'Sterilization of medical instruments',
      paragraphs: [
        'The sterilizers are designed for processing medical instruments, including glass and metal items. Operating modes for medical instrument processing operate at temperatures of 100–180 °C with sterilization times up to 5 minutes.',
        'For a conventional autoclave, temperatures are 121–132 °C and sterilization duration is 1–1.5 hours. As one of the disadvantages of wet sterilization, the authors consider the combination of high temperature and moisture, linking it to the potential for corrosion and surface alteration of instruments.',
        'Pulsed infrared radiation, according to the method, enables greater penetration depth without the need to maintain high average continuous radiation power.',
        'As a result of tests, the surface condition of instruments after treatment was evaluated as improved. Studies were conducted at the University of California Medical Center.'
      ]
    },
    pulsePrinciple: {
      title: 'Operating principle of pulsed IR sterilization',
      paragraphs: [
        'The foundation of the technology is functional ceramics that convert primary source heat into infrared radiation with specified characteristics.',
        'Physical and technical description: Pulsed IR radiation, in resonance with water molecules, penetrates the microorganism and rapidly transfers energy to the moisture it contains. This leads to rapid heating of the moisture, steam formation, and, according to the described mechanism, destruction of the microorganism structure.',
        'Additionally, the effect of IR radiation on organic molecules and processes associated with microorganism vital activity and reproduction is addressed.'
      ]
    },
    technicalFeatures: {
      title: 'Main technical features of the technology',
      items: [
        'Use of functional ceramics as a transforming element for infrared radiation;',
        'Formation of high-density pulses;',
        'Directional distribution of radiation inside the working chamber;',
        'Ability to process objects without using additional moisture;',
        'Temperature control of the sterilized instrument in designs equipped with a temperature sensor;',
        'Programmable sterilization modes in the described designs;',
        'Interlock systems in case of an incomplete cycle, open door, or emitter malfunction;',
        'Light and audible indication of cycle completion and faults.'
      ]
    },
    otherObjects: {
      title: 'Sterilizers for other objects',
      paragraphs: [
        'In addition to medical instruments, pulsed sterilizers can be used for processing dressings, mattresses, clothing, and other objects. For this application, the source cites an operating mode with temperatures up to 60 °C and processing times of 20–60 minutes.',
        'Functional ceramics are also being considered for use in hospital waste disposal systems. The described cycle includes drying with simultaneous low-temperature sterilization, high-temperature treatment, pulsed exposure, and subsequent incineration of organic residues.',
        'The described developments demonstrate the direction of functional ceramics application in infrared sterilization systems. The foundation of the approach is the conversion of primary heating source energy into directional infrared radiation, including pulsed radiation. Particular emphasis is placed on uniform irradiation of the working area, radiation penetration depth, temperature control, programmable modes, and operator safety.'
      ]
    },
    surface: {
      title: 'Surface of instruments after treatment',
      subtitle: 'Comparative analysis of the cutting edge and surface microstructure of the scalpel',
      zoomHint: 'Click image for high-resolution view'
    }
  }
};
