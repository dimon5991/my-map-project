/**
 * Мідні та мідьвмісні родовища Канади з вкладки «Канада»
 * у файлі «Мідні родовища.xlsx».
 *
 * Координати збережено у десятковому форматі [широта, довгота].
 * Показники з позначкою «ресурси» або «план» не є фактичним видобутком.
 * Дані завантажуються разом із загальним масивом COPPER_MINES, який
 * використовує картка об'єкта в js/map.js.
 */
window.COPPER_MINES = (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).concat([
  {
    id: "canada-casino",
    name: "Casino",
    country: "Канада",
    region: "Yukon",
    owner: "Western Copper and Gold Corporation через Casino Mining Corporation (100% дочірня компанія)",
    ownerOffice: {
  company: "Western Copper and Gold Corporation",
  type: "Головний офіс",
  address: "Suite 907, 1030 West Georgia Street, Vancouver, BC V6E 2Y3, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28502,
  longitude: -123.12266,
  url: "https://www.westerncopperandgold.com/contact/"
},
    status: "Розробка / екологічне оцінювання",
    process: "Флотація мідного концентрату; окремий контур купчастого вилуговування золотовмісної руди",
    depositType: "Відкрите (проєкт)",
    oreType: "Порфірове Cu-Au-Mo-Ag",
    otherMetals: ["Au", "Mo", "Ag"],
    coordinates: { latitude: 62.737778, longitude: -138.828056 },
    geometry: null,
    productionMetrics: [
      {
        label: "Середній плановий випуск міді за ТЕО",
        value: 164,
        unit: "млн фунтів Cu/рік",
        year: "FS 2022",
        source: "https://www.westerncopperandgold.com/casino-project/",
        sourceTitle: "Western Copper and Gold — Casino Project"
      },
      {
        label: "Доведені та ймовірні запаси міді у mill reserve",
        value: 5079,
        unit: "млн фунтів Cu",
        year: "FS 2022",
        source: "https://www.westerncopperandgold.com/casino-project/",
        sourceTitle: "Western Copper and Gold — Reserves & Resources"
      }
    ],
    productionNote: "Casino ще не є діючою шахтою. 164 млн фунтів на рік — прогноз середнього річного виробництва за техніко-економічним обґрунтуванням 2022 року, а не фактичний випуск.",
    sources: [
      { title: "Western Copper and Gold — Casino Project, ресурси, запаси та FS 2022", url: "https://www.westerncopperandgold.com/casino-project/" },
      { title: "Yukon Government — Casino Technical Report, координати родовища", url: "https://emrlibrary.gov.yk.ca/minerals/MajorMines/casino/form-43-101f1-technical-report-mineral-resource-statement-2020.pdf" }
    ],
    notes: "Координати 62°44′16″ N, 138°49′41″ W наведено в технічному звіті Yukon Government."
  },
  {
    id: "canada-minto",
    name: "Minto",
    country: "Канада",
    region: "Yukon",
    owner: "Selkirk Copper Mines Inc. (100% власник проєкту); Selkirk First Nation — значний акціонер компанії",
    ownerOffice: {
  company: "Selkirk Copper Mines Inc.",
  type: "Головний офіс",
  address: "Suite 2833, 595 Burrard Street, Vancouver, BC V7X 1J1, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28579,
  longitude: -123.11936,
  url: "https://selkirkcopper.com/contact/"
},
    status: "Консервація / підготовка до можливого перезапуску",
    process: "Флотація мідного концентрату",
    depositType: "Відкрите та підземне",
    oreType: "Порфірове Cu-Au-Ag, сульфідне",
    otherMetals: ["Au", "Ag"],
    coordinates: { latitude: 62.618056, longitude: -137.248889 },
    geometry: null,
    productionMetrics: [
      {
        label: "Ресурси міді категорій Measured & Indicated",
        value: 940,
        unit: "млн фунтів Cu",
        year: 2026,
        source: "https://selkirkcopper.com/minto-mine/",
        sourceTitle: "Selkirk Copper — Minto Mine, оцінка ресурсів 2026"
      },
      {
        label: "Проєктна продуктивність збагачувальної фабрики",
        value: 4100,
        unit: "т руди/добу",
        year: "проєктна потужність",
        source: "https://selkirkcopper.com/",
        sourceTitle: "Selkirk Copper — Corporate Overview"
      }
    ],
    productionNote: "Шахта не виробляє мідь. Selkirk Copper повідомляє про цільове рішення щодо перезапуску у 2027 році та можливий початок виробництва в середині 2028 року; це план, а не затверджена дата відновлення.",
    sources: [
      { title: "Selkirk Copper — Minto Mine: ресурсна база та стратегія перезапуску", url: "https://selkirkcopper.com/minto-mine/" },
      { title: "Yukon Government — Minto mine licensing documents", url: "https://yukon.ca/en/minto-mine-licensing-documents" },
      { title: "Selkirk Copper — повідомлення про придбання Minto, 29.10.2025", url: "https://selkirkcopper.com/selkirk-copper-announces-completion-of-acquisition-of-minto-copper-gold-silver-mine-resumption-of-trading/" }
    ],
    notes: "Координати 62°37′05″ N, 137°14′56″ W. Назву власника з таблиці (Pembridge Resources) оновлено за угодою про придбання активу 2025 року."
  },
  {
    id: "canada-mount-polley",
    name: "Mount Polley",
    country: "Канада",
    region: "British Columbia",
    owner: "Imperial Metals Corporation (100%)",
    ownerOffice: {
  company: "Imperial Metals Corporation",
  type: "Головний офіс",
  address: "Suite 900, 580 Hornby Street, Vancouver, BC V6C 3B6, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28579,
  longitude: -123.11818,
  url: "https://imperialmetals.com/contact/"
},
    status: "Видобуток",
    process: "Флотація мідно-золотого концентрату",
    depositType: "Відкрите",
    oreType: "Лужне порфірове Cu-Au",
    otherMetals: ["Au", "Ag"],
    coordinates: { latitude: 52.554444, longitude: -121.641667 },
    geometry: null,
    productionMetrics: [
      {
        label: "Фактичний видобуток міді",
        value: 30.715,
        unit: "млн фунтів Cu",
        year: 2025,
        source: "https://imperialmetals.com/imperial-reports-2025-financial-results/",
        sourceTitle: "Imperial Metals — 2025 Financial Results"
      },
      {
        label: "Перероблено руди",
        value: 6.714,
        unit: "млн т руди",
        year: 2025,
        source: "https://imperialmetals.com/imperial-reports-2025-financial-results/",
        sourceTitle: "Imperial Metals — 2025 Financial Results"
      }
    ],
    productionNote: "У 2025 році Mount Polley виробила 30,715 млн фунтів міді та переробила 6,714 млн тонн руди. У 2026 році компанія повідомляла про продовження видобутку й розширення місткості хвостосховища.",
    sources: [
      { title: "Imperial Metals — Mount Polley Mine: огляд та власність", url: "https://imperialmetals.com/operations/mount-polley-mine/overview/" },
      { title: "Imperial Metals — 2025 Financial Results: видобуток та переробка", url: "https://imperialmetals.com/imperial-reports-2025-financial-results/" },
      { title: "BC Geological Survey — MINFILE: Mount Polley, координати та тип родовища", url: "https://minfile.gov.bc.ca/Summary.aspx?minfilno=093A++008" }
    ],
    notes: "Координати взято з BC Geological Survey MINFILE: 52°33′16″ N, 121°38′30″ W."
  },
  {
    id: "canada-mount-milligan",
    name: "Mount Milligan",
    country: "Канада",
    region: "British Columbia",
    owner: "Centerra Gold Inc. (100%)",
    ownerOffice: {
  company: "Centerra Gold Inc.",
  type: "Корпоративна штаб-квартира",
  address: "Suite 1800, 1 University Avenue, Toronto, ON M5J 2P1, Canada",
  city: "Toronto, Canada",
  latitude: 43.64581,
  longitude: -79.38319,
  url: "https://www.centerragold.com/contact/default.aspx"
},
    status: "Видобуток",
    process: "Флотація мідно-золотого концентрату",
    depositType: "Відкрите",
    oreType: "Лужне порфірове Cu-Au",
    otherMetals: ["Au", "Ag", "Mo"],
    coordinates: { latitude: 55.123889, longitude: -124.027500 },
    geometry: null,
    productionMetrics: [
      {
        label: "Фактичний видобуток міді",
        value: 50,
        unit: "млн фунтів Cu",
        year: 2025,
        source: "https://www.centerragold.com/operations/mount-milligan/default.aspx",
        sourceTitle: "Centerra Gold — Mount Milligan Operations"
      },
      {
        label: "Потужність мідної флотаційної фабрики",
        value: 60,
        unit: "тис. т руди/добу",
        year: "поточна проєктна потужність",
        source: "https://www.centerragold.com/operations/mount-milligan/default.aspx",
        sourceTitle: "Centerra Gold — Site Details"
      }
    ],
    productionNote: "У 2025 році Centerra повідомила про виробництво 50 млн фунтів міді та 148 тис. унцій золота.",
    sources: [
      { title: "Centerra Gold — Mount Milligan: потужність, власність і результати 2025 року", url: "https://www.centerragold.com/operations/mount-milligan/default.aspx" },
      { title: "BC Geological Survey — MINFILE: Mount Milligan, координати та мінералізація", url: "https://minfile.gov.bc.ca/Summary.aspx?minfilno=093N++194" }
    ],
    notes: "Координати 55°07′26″ N, 124°01′39″ W наведено у базі BC Geological Survey MINFILE."
  },
  {
    id: "canada-huckleberry",
    name: "Huckleberry",
    country: "Канада",
    region: "British Columbia",
    owner: "Huckleberry Mines Ltd. — 100% дочірня компанія Imperial Metals Corporation",
    ownerOffice: {
  company: "Imperial Metals Corporation (материнська компанія Huckleberry Mines Ltd.)",
  type: "Головний офіс материнської компанії",
  address: "Suite 900, 580 Hornby Street, Vancouver, BC V6C 3B6, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28579,
  longitude: -123.11818,
  url: "https://imperialmetals.com/contact/"
},
    status: "Консервація / догляд і технічне обслуговування",
    process: "Флотація мідно-молібденового концентрату (історична схема)",
    depositType: "Відкрите",
    oreType: "Порфірове Cu-Mo-Au",
    otherMetals: ["Mo", "Au", "Ag"],
    coordinates: { latitude: 53.680556, longitude: -127.178056 },
    geometry: null,
    productionMetrics: [],
    productionNote: "Виробництво зупинено у серпні 2016 року; шахта залишається на консервації. У 2025 році Imperial Metals провела дев'ять розвідувальних свердловин загальною довжиною 1 743 м. Ці роботи є геологорозвідкою, а не відновленням промислового видобутку.",
    sources: [
      { title: "Imperial Metals — Huckleberry Exploration Update, 27.11.2025", url: "https://imperialmetals.com/imperial-provides-huckleberry-exploration-update/" },
      { title: "Imperial Metals — Huckleberry: фінансовий звіт і статус консервації", url: "https://imperialmetals.com/imperial-reports-2025-financial-results/" },
      { title: "BC Geological Survey — MINFILE: Huckleberry, координати та ресурси", url: "https://minfile.gov.bc.ca/Summary.aspx?minfilno=093E++037" }
    ],
    notes: "Координати 53°40′52″ N, 127°10′41″ W наведено у BC Geological Survey MINFILE."
  },
  {
    id: "canada-kemess",
    name: "Kemess",
    country: "Канада",
    region: "British Columbia",
    owner: "Centerra Gold Inc. (100%)",
    ownerOffice: {
  company: "Centerra Gold Inc.",
  type: "Корпоративна штаб-квартира",
  address: "Suite 1800, 1 University Avenue, Toronto, ON M5J 2P1, Canada",
  city: "Toronto, Canada",
  latitude: 43.64581,
  longitude: -79.38319,
  url: "https://www.centerragold.com/contact/default.aspx"
},
    status: "Історичний видобуток / оцінювання повторного освоєння",
    process: "Флотація мідно-золотого концентрату; наявна фабрика потребує модернізації",
    depositType: "Відкрите (історично) та підземне (проєктні ділянки)",
    oreType: "Порфірове Cu-Au",
    otherMetals: ["Au", "Ag"],
    coordinates: { latitude: 57.021667, longitude: -126.669722 },
    geometry: null,
    productionMetrics: [
      {
        label: "Ресурси міді категорії Indicated",
        value: 1146,
        unit: "млн фунтів Cu",
        year: "31.12.2025",
        source: "https://www.centerragold.com/investor-news/news-details/2026/Centerra-Golds-Kemess-Preliminary-Economic-Assessment-Highlights-Strong-Economics-that-Support-the-Companys-Long-Term-Growth-Pipeline/default.aspx",
        sourceTitle: "Centerra Gold — Kemess PEA та ресурси"
      },
      {
        label: "Ресурси міді категорії Inferred",
        value: 1223,
        unit: "млн фунтів Cu",
        year: "31.12.2025",
        source: "https://www.centerragold.com/investor-news/news-details/2026/Centerra-Golds-Kemess-Preliminary-Economic-Assessment-Highlights-Strong-Economics-that-Support-the-Companys-Long-Term-Growth-Pipeline/default.aspx",
        sourceTitle: "Centerra Gold — Kemess PEA та ресурси"
      },
      {
        label: "Номінальна потужність наявної фабрики",
        value: 50,
        unit: "тис. т руди/добу",
        year: "наявна інфраструктура",
        source: "https://bcmining.centerragold.com/bc-operations/kemess/default.aspx",
        sourceTitle: "Centerra Gold — Kemess Project"
      }
    ],
    productionNote: "Kemess зараз не виробляє мідь. Значення ресурсів Indicated та Inferred — геологічні ресурси, а не запаси чи гарантований майбутній видобуток. Centerra веде оцінювання повторного освоєння; попередня оцінка (PEA) має попередній характер.",
    sources: [
      { title: "Centerra Gold — Kemess Project: історична шахта та план розвитку", url: "https://bcmining.centerragold.com/bc-operations/kemess/default.aspx" },
      { title: "Centerra Gold — Kemess PEA: оновлені ресурси міді на 31.12.2025", url: "https://www.centerragold.com/investor-news/news-details/2026/Centerra-Golds-Kemess-Preliminary-Economic-Assessment-Highlights-Strong-Economics-that-Support-the-Companys-Long-Term-Growth-Pipeline/default.aspx" },
      { title: "Centerra Gold — ESG Report: координати Kemess South", url: "https://sustainability.centerragold.com/_doc/2022/Centerra-Gold-2021-ESG-Report.pdf" }
    ],
    notes: "Координатна точка взята для району Kemess South TSF із матеріалів Centerra; вона позначає гірничий комплекс, а не окрему підземну виробку."
  },
  {
    id: "canada-carmacks",
    name: "Carmacks",
    country: "Канада",
    region: "Yukon",
    owner: "Cascadia Minerals Ltd. (після об'єднання з Granite Creek Copper)",
    ownerOffice: {
  company: "Cascadia Minerals Ltd.",
  type: "Головний офіс",
  address: "Suite 910, 510 West Hastings Street, Vancouver, BC, Canada",
  city: "Vancouver, Canada",
  latitude: 49.2842,
  longitude: -123.1117,
  url: "https://cascadiaminerals.com/contact/"
},
    status: "Розробка / геологорозвідка",
    process: "Проєктна переробка окислених і сульфідних мідних руд; технологічна схема уточнюється",
    depositType: "Відкрите (проєкт)",
    oreType: "Порфірове Cu-Au-Ag",
    otherMetals: ["Au", "Ag", "Mo"],
    coordinates: { latitude: 62.350000, longitude: -136.683333 },
    geometry: null,
    productionMetrics: [
      {
        label: "Ресурси міді категорій Measured & Indicated",
        value: 651,
        unit: "млн фунтів Cu",
        year: 2023,
        source: "https://cascadiaminerals.com/cascadia-minerals-and-granite-creek-copper-announce-merger-to-create-a-leading-yukon-copper-gold-exploration-and-development-company/",
        sourceTitle: "Cascadia Minerals — Carmacks resource"
      }
    ],
    productionNote: "Carmacks не є діючою шахтою. Показник 651 млн фунтів — оцінка мінеральних ресурсів, наведена під час об'єднання Cascadia Minerals та Granite Creek Copper; це не фактичний видобуток і не доведені запаси.",
    sources: [
      { title: "Cascadia Minerals — Carmacks Project: буріння 2025 року", url: "https://cascadiaminerals.com/projects/carmacks-yt/" },
      { title: "Cascadia Minerals — об'єднання з Granite Creek Copper та ресурсна база", url: "https://cascadiaminerals.com/cascadia-minerals-and-granite-creek-copper-announce-merger-to-create-a-leading-yukon-copper-gold-exploration-and-development-company/" },
      { title: "Yukon Government / NI 43-101 — Carmacks Copper Deposit, координати", url: "https://www.sec.gov/Archives/edgar/data/1364125/000106299311003572/exhibit99-1.htm" }
    ],
    notes: "Координати родовища округлено з технічного звіту: близько 62°21′ N, 136°41′ W."
  },
  {
    id: "canada-gibraltar",
    name: "Gibraltar",
    country: "Канада",
    region: "British Columbia",
    owner: "Taseko Mines Limited (100%)",
    ownerOffice: {
  company: "Taseko Mines Limited",
  type: "Головний офіс",
  address: "Suite 1200, 1040 West Georgia Street, Vancouver, BC V6E 4H1, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28502,
  longitude: -123.12266,
  url: "https://www.tasekomines.com/contact/"
},
    status: "Видобуток",
    process: "Флотація мідного та молібденового концентратів",
    depositType: "Відкрите",
    oreType: "Кальк-лужне порфірове Cu-Mo",
    otherMetals: ["Mo", "Ag"],
    coordinates: { latitude: 52.500000, longitude: -122.266667 },
    geometry: null,
    productionMetrics: [
      {
        label: "Фактичний видобуток міді",
        value: 98,
        unit: "млн фунтів Cu",
        year: 2025,
        source: "https://www.publicnow.com/view/A3925E6BD5F3976D19814051B60D1ED552411113",
        sourceTitle: "Taseko Mines — Annual Report 2025"
      },
      {
        label: "Фактичний видобуток молібдену",
        value: 1.9,
        unit: "млн фунтів Mo",
        year: 2025,
        source: "https://www.publicnow.com/view/A3925E6BD5F3976D19814051B60D1ED552411113",
        sourceTitle: "Taseko Mines — Annual Report 2025"
      }
    ],
    productionNote: "У 2025 році Gibraltar виробила 98 млн фунтів міді та 1,9 млн фунтів молібдену. Taseko збільшила ефективну частку у спільному підприємстві до 100% у 2024 році.",
    sources: [
      { title: "Taseko Mines — Annual Report 2025: виробництво, власність та геологія Gibraltar", url: "https://www.publicnow.com/view/A3925E6BD5F3976D19814051B60D1ED552411113" }
    ],
    notes: "Координати округлено за описом розташування комплексу Gibraltar: близько 52°30′ N, 122°16′ W."
  },
  {
    id: "canada-mcilvenna-bay",
    name: "McIlvenna Bay",
    country: "Канада",
    region: "Saskatchewan",
    owner: "Eldorado Gold Corporation (100%) через Foran Mining / McIlvenna Bay Operating Ltd.",
    ownerOffice: {
  company: "Eldorado Gold Corporation (власник Foran Mining)",
  type: "Головний офіс",
  address: "550 Burrard Street, 11th Floor, Vancouver, BC V6C 2B5, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28579,
  longitude: -123.11818,
  url: "https://www.eldoradogold.com/contact-us"
},
    status: "Пусконалагодження / нарощування виробництва",
    process: "Подрібнення та флотація окремих мідного й цинкового концентратів",
    depositType: "Підземне",
    oreType: "Вулканогенне масивне сульфідне (VMS), Cu-Zn",
    otherMetals: ["Zn", "Au", "Ag"],
    coordinates: { latitude: 54.633333, longitude: -102.833333 },
    geometry: null,
    productionMetrics: [
      {
        label: "Орієнтир виробництва міді за планом на 2026 рік",
        value: "5–10",
        unit: "млн фунтів Cu",
        year: 2026,
        source: "https://www.eldoradogold.com/assets/operations/mcilvenna-bay-canada",
        sourceTitle: "Eldorado Gold — McIlvenna Bay"
      },
      {
        label: "Проєктна потужність фабрики (nameplate)",
        value: 4900,
        unit: "т руди/добу",
        year: 2026,
        source: "https://www.eldoradogold.com/investors/news-releases/eldorado-gold-announces-first-concentrate-produced-mcilvenna-bay",
        sourceTitle: "Eldorado Gold — first concentrate produced"
      }
    ],
    productionNote: "Перший мідний концентрат отримано 7 червня 2026 року, перший цинковий — у липні 2026 року. Станом на останні оприлюднені оновлення підприємство нарощувало виробництво; прогноз 5–10 млн фунтів Cu на 2026 рік є guidance, а не остаточним річним результатом.",
    sources: [
      { title: "Eldorado Gold — McIlvenna Bay: статус, продукти та guidance 2026", url: "https://www.eldoradogold.com/assets/operations/mcilvenna-bay-canada" },
      { title: "Eldorado Gold — перший мідний концентрат, 08.06.2026", url: "https://www.eldoradogold.com/investors/news-releases/eldorado-gold-announces-first-concentrate-produced-mcilvenna-bay" },
      { title: "Saskatchewan Mineral Deposit Query — координати та геологічний опис", url: "https://mineraldeposits.saskatchewan.ca/Home/Viewdetails/2169" },
      { title: "Foran Mining — Technical Report 2025: координати родовища", url: "https://foranmining.com/wp-content/uploads/2025/03/Foran_-_Technical_Report_-_RPT-24701-0001_1_final.pdf" }
    ],
    notes: "Координати округлено з технічного звіту: 54°38′ N, 102°50′ W."
  },
  {
    id: "canada-kutcho",
    name: "Kutcho",
    country: "Канада",
    region: "British Columbia",
    owner: "Kutcho Copper Corp.",
    ownerOffice: {
  company: "Kutcho Copper Corp.",
  type: "Головний офіс",
  address: "Suite 918, 1030 West Georgia Street, Vancouver, BC V6E 2Y3, Canada",
  city: "Vancouver, Canada",
  latitude: 49.28502,
  longitude: -123.12266,
  url: "https://kutcho.ca/contact/"
},
    status: "Розробка / feasibility-stage проєкт",
    process: "Флотація мідного та цинкового концентратів",
    depositType: "Підземне (проєкт)",
    oreType: "Вулканогенне масивне сульфідне (тип Kuroko), Cu-Zn",
    otherMetals: ["Zn", "Au", "Ag"],
    coordinates: { latitude: 58.213611, longitude: -128.365833 },
    geometry: null,
    productionMetrics: [
      {
        label: "Ресурси категорій Measured & Indicated",
        value: 22.8,
        unit: "млн т руди; 2,26% CuEq",
        year: "2021 NI 43-101",
        source: "https://kutcho.ca/kutcho-project/",
        sourceTitle: "Kutcho Copper — Kutcho Project"
      }
    ],
    productionNote: "Kutcho — проєкт розробки, а не діюча шахта. Значення 22,8 млн тонн і 2,26% CuEq — ресурсна оцінка; CuEq означає мідний еквівалент і не дорівнює вмісту чистої міді.",
    sources: [
      { title: "Kutcho Copper — Kutcho Project: ресурсна база та технологічна схема", url: "https://kutcho.ca/kutcho-project/" },
      { title: "Kutcho Copper — Corporate Update, 22.01.2026", url: "https://kutcho.ca/news/2026/kutcho-copper-corporate-update-2/" },
      { title: "BC Government ARIS — координати та власник Kutcho property", url: "https://apps.nrs.gov.bc.ca/pub/aris/Detail/31480" }
    ],
    notes: "Координати 58°12′49″ N, 128°21′57″ W за матеріалами BC Government ARIS."
  },
  {
    id: "canada-voiseys-bay",
    name: "Voisey's Bay",
    country: "Канада",
    region: "Newfoundland and Labrador",
    owner: "Vale Base Metals (90% Vale S.A., 10% Manara Minerals Investment Company)",
    ownerOffice: {
  company: "Vale Base Metals",
  type: "Канадський корпоративний офіс",
  address: "200 Bay Street, Suite 1600, Toronto, ON M5J 2K2, Canada",
  city: "Toronto, Canada",
  latitude: 43.64638,
  longitude: -79.38006,
  url: "https://valebasemetals.com/contact-us/"
},
    status: "Видобуток",
    process: "Збагачення сульфідної руди; виробництво нікелевого та мідного концентратів",
    depositType: "Відкрите та підземне",
    oreType: "Магматичне сульфідне Ni-Cu-Co",
    otherMetals: ["Ni", "Co"],
    coordinates: { latitude: 56.417000, longitude: -62.083000 },
    geometry: null,
    productionMetrics: [
      {
        label: "Доведені та ймовірні запаси мідної руди",
        value: 25.6,
        unit: "млн т руди; середній вміст 0,80% Cu",
        year: 2025,
        source: "https://www.sec.gov/Archives/edgar/data/917851/000129281426001844/valeform20f_2025.htm",
        sourceTitle: "Vale Form 20-F 2025"
      }
    ],
    productionNote: "Voisey's Bay — нікелево-мідно-кобальтовий комплекс, який виробляє як нікелеві, так і мідні концентрати. Координати на карті орієнтовні; вони призначені для локалізації комплексу, а не окремого устя шахти.",
    sources: [
      { title: "Vale — Form 20-F 2025: власність, виробництво та запаси міді", url: "https://www.sec.gov/Archives/edgar/data/917851/000129281426001844/valeform20f_2025.htm" },
      { title: "MineralLink — Voisey's Bay Mine: приблизні координати й оператор", url: "https://minerallink.org/explore?country=CAN&mine=voiseys-bay-mine" }
    ],
    notes: "Координати 56.417, −62.083 наведено як приблизну точку комплексу."
  },
  {
    id: "canada-tulsequah-chief",
    name: "Tulsequah Chief",
    country: "Канада",
    region: "British Columbia",
    owner: "Chieftain Metals Inc. — власник, зазначений у матеріалах уряду BC 2025 року; поточний правовий статус активу ускладнений банкрутством компанії",
    ownerOffice: {
  company: "Chieftain Metals Inc. (історична адреса; чинний корпоративний офіс не підтверджено)",
  type: "Остання підтверджена адреса для кореспонденції",
  address: "200 King Street West, 11th Floor, Toronto, ON M5H 3T4, Canada",
  city: "Toronto, Canada",
  latitude: 43.6487,
  longitude: -79.3825,
  url: "https://www2.gov.bc.ca/assets/gov/environment/air-land-water/site-permitting-and-compliance/tulsequah/2024-03-22_letter_to_chieftain_armex_re_tulsequah.pdf",
  note: "Історична адреса з листа уряду Британської Колумбії від 22.03.2024; не слід вважати підтвердженням діючого офісу."
},
    status: "Не працює / екологічна ремедіація",
    process: "Історичний підземний видобуток; флотаційні сульфідні концентрати",
    depositType: "Підземне (історична шахта)",
    oreType: "VMS, масивні сульфіди Cu-Pb-Zn",
    otherMetals: ["Zn", "Pb", "Ag", "Au", "Cd"],
    coordinates: { latitude: 58.735833, longitude: -133.601111 },
    geometry: null,
    productionMetrics: [],
    productionNote: "Шахта працювала у 1951–1957 роках і відтоді не експлуатується. Сучасні роботи стосуються ремедіації забруднення та безпеки історичного майданчика, а не поновлення видобутку.",
    sources: [
      { title: "BC Geological Survey — MINFILE: Tulsequah Chief", url: "https://minfile.gov.bc.ca/Summary.aspx?minfilno=104K++002" },
      { title: "Government of British Columbia — Estimates 2025: історія власності й статус активу", url: "https://docs.openinfo.gov.bc.ca/Mining_and_Critical_Minerals_Estimates_Notes_2025.pdf" },
      { title: "Teck — Tulsequah Chief Mine: поточна ремедіація", url: "https://www.teck.com/sustainability/sustainability-topics/tulsequah-chief-mine/" }
    ],
    notes: "Координати з BC Geological Survey MINFILE: 58°44′09″ N, 133°36′04″ W. Не плутати ремедіаційні роботи Teck із володінням або експлуатацією шахти."
  },
  {
    id: "canada-copper-rand",
    name: "Copper Rand",
    country: "Канада",
    region: "Quebec",
    owner: "CBAY Minerals Inc. (100% дочірня компанія Cygnus Metals Limited)",
    ownerOffice: {
  company: "Cygnus Metals Limited / CBAY Minerals Inc.",
  type: "Корпоративний офіс власника",
  address: "Level 2, 8 Richardson Street, West Perth, WA 6005, Australia",
  city: "West Perth, Australia",
  latitude: -31.9485,
  longitude: 115.8517,
  url: "https://www.cygnusmetals.com/contact-us/",
  note: "Окремий майданчиковий офіс Cygnus для Chibougamau: 311 Chemin des Mines, CP 400, Chibougamau, QC G8P 2X8, Canada."
},
    status: "Історичний видобуток / частина проєкту Chibougamau",
    process: "Флотація мідного концентрату (історична схема); сучасний проєкт оцінюється у складі Chibougamau Hub-and-Spoke",
    depositType: "Підземне",
    oreType: "Жильне та заміщувальне Cu-Au",
    otherMetals: ["Au", "Ag"],
    coordinates: { latitude: 49.890556, longitude: -74.276111 },
    geometry: null,
    productionMetrics: [],
    productionNote: "Copper Rand не є діючою шахтою. Актив і млинову інфраструктуру включено до Chibougamau Project; Cygnus Metals звітує ресурси за окремими родовищами комплексу, тому їх не перенесено на Copper Rand без окремого підтвердження.",
    sources: [
      { title: "Cygnus Metals — Chibougamau PEA / NI 43-101 Technical Report, 2025", url: "https://minedocs.com/29/Chibougamau-PEA-12312024.pdf" },
      { title: "Cygnus Metals — tenements: 100% Copper Rand Property", url: "https://investorpa.com/announcement-pdf/20251027/210240.pdf" },
      { title: "Mindat — Copper Rand Mine: координати WGS84", url: "https://www.mindat.org/loc-10337.html" }
    ],
    notes: "Координати 49°53′26″ N, 74°16′34″ W за довідником Mindat; це точка історичної шахти."
  }
,
  {
    id: "canada-izok-lake",
    name: "Izok Lake",
    country: "Канада",
    region: "Nunavut",
    owner: "MMG Resources Inc. (100%); група MMG Limited",
    ownerOffice: {
  company: "MMG Limited / MMG Resources Inc.",
  type: "Головний офіс групи",
  address: "Level 24, 28 Freshwater Place, Southbank, Victoria 3006, Australia",
  city: "Southbank, Melbourne, Australia",
  latitude: -37.8231,
  longitude: 144.9652,
  url: "https://www.mmg.com/contact-us/"
},
    status: "Проєкт / геологорозвідка та інфраструктурне оцінювання",
    process: "Проєктна флотація мідного, цинкового та свинцевого концентратів",
    depositType: "Підземне (проєкт)",
    oreType: "Вулканогенне масивне сульфідне (VMS), Cu-Zn-Pb",
    otherMetals: ["Zn", "Pb", "Ag", "Au"],
    coordinates: { latitude: 65.641667, longitude: -112.824167 },
    geometry: null,
    productionMetrics: [
      {
        label: "Іndicated mineral resources — мідь",
        value: 13,
        unit: "млн т руди; 2,4% Cu",
        year: "30.06.2025",
        source: "https://www.mmg.com/wp-content/uploads/2025/11/Public-Report-of-Exploration-Results-for-Izok.pdf",
        sourceTitle: "MMG — Izok Corridor Exploration Report 2025"
      },
      {
        label: "Inferred mineral resources — мідь",
        value: 1.2,
        unit: "млн т руди; 1,5% Cu",
        year: "30.06.2025",
        source: "https://minedocs.com/32/MMG-MRMR-06302025.pdf",
        sourceTitle: "MMG — Mineral Resources and Ore Reserves Statement 2025"
      }
    ],
    productionNote: "Izok Lake — поліміталічне VMS-родовище зі значним вмістом як міді, так і цинку. За звітом MMG на 30 червня 2025 року: 13 млн т Indicated із 2,4% Cu та 1,2 млн т Inferred із 1,5% Cu. Це ресурси, а не запаси чи фактичний видобуток. Розвиток проєкту залежить, зокрема, від транспортної інфраструктури Izok Corridor.",
    sources: [
      { title: "MMG — 2025 Mineral Resources and Ore Reserves Statement", url: "https://minedocs.com/32/MMG-MRMR-06302025.pdf" },
      { title: "Government of Canada — Izok Corridor: власник, товари й географія", url: "https://publications.gc.ca/collections/collection_2026/rcaanc-cirnac/R71-39-2025-eng.pdf" },
      { title: "Government of Nunavut — lease location and coordinates, Izok Lake", url: "https://www.gov.nu.ca/sites/default/files/documents/2024-02/Nunavut%20Lands%20and%20Resources%20Devolution%20Agreement%20-%20INUK.pdf" }
    ],
    notes: "Координати 65°38′30″ N, 112°49′27″ W — розташування табору/ділянки Izok Lake у документі уряду Nunavut."
  },
  {
    id: "canada-lalor",
    name: "Lalor",
    country: "Канада",
    region: "Manitoba",
    owner: "Hudbay Minerals Inc. (100%)",
    ownerOffice: {
  company: "Hudbay Minerals Inc.",
  type: "Корпоративний офіс",
  address: "Suite 800, 25 York Street, Toronto, ON M5J 2V5, Canada",
  city: "Toronto, Canada",
  latitude: 43.64349,
  longitude: -79.38096,
  url: "https://hudbayminerals.com/contact-us/default.aspx"
},
    status: "Видобуток",
    process: "Підземне видобування; збагачення на комплексі Snow Lake з отриманням мідьвмісного та цинкового концентратів і золота",
    depositType: "Підземне",
    oreType: "Вулканогенне масивне сульфідне (VMS), Au-Zn-Cu-Ag",
    otherMetals: ["Au", "Zn", "Ag"],
    coordinates: { latitude: 54.873333, longitude: -100.150278 },
    geometry: null,
    productionMetrics: [
      {
        label: "Виробництво міді на операціях Snow Lake (не окремо Lalor)",
        value: 9249,
        unit: "т Cu у концентраті та doré",
        year: 2025,
        source: "https://www.hudbay.com/canada/default.aspx",
        sourceTitle: "Hudbay — Snow Lake 2025 Performance"
      },
      {
        label: "Планове виробництво міді на операціях Snow Lake",
        value: "10 000–13 000",
        unit: "т Cu",
        year: 2026,
        source: "https://www.hudbay.com/canada/default.aspx",
        sourceTitle: "Hudbay — Snow Lake 2026 Guidance"
      }
    ],
    productionNote: "Показники 9 249 т за 2025 рік і guidance 10 000–13 000 т на 2026 рік стосуються операцій Hudbay у Snow Lake загалом, а не окремо шахти Lalor. Lalor є діючою підземною золото-цинково-мідно-срібною шахтою; окремий видобуток міді лише для Lalor у відкритому підсумку компанії не деталізований.",
    sources: [
      { title: "Hudbay — Canada Operations: Lalor, 2025 performance and 2026 guidance", url: "https://www.hudbay.com/canada/default.aspx" },
      { title: "Hudbay — Lalor and Snow Lake Operations, NI 43-101 Technical Report", url: "https://s23.q4cdn.com/405985100/files/doc_downloads/tech_reports/canada/Snow-Lake-and-Lalor-NI-43-101-Technical-Report_FINAL.pdf" }
    ],
    notes: "Координати 54°52′24″ N, 100°09′01″ W за технічним звітом Hudbay."
  },
  {
    id: "canada-777",
    name: "777 (Triple Seven)",
    country: "Канада",
    region: "Manitoba",
    owner: "Hudbay Minerals Inc. (100%)",
    ownerOffice: {
  company: "Hudbay Minerals Inc.",
  type: "Корпоративний офіс",
  address: "Suite 800, 25 York Street, Toronto, ON M5J 2V5, Canada",
  city: "Toronto, Canada",
  latitude: 43.64349,
  longitude: -79.38096,
  url: "https://hudbayminerals.com/contact-us/default.aspx"
},
    status: "Закрито у 2022 році; шахту виведено з експлуатації",
    process: "Історична підземна шахта; мідно-цинкові VMS-концентрати",
    depositType: "Підземне",
    oreType: "Мідно-цинкове вулканогенне масивне сульфідне (VMS)",
    otherMetals: ["Zn", "Au", "Ag"],
    coordinates: { latitude: 54.775000, longitude: -101.880000 },
    geometry: null,
    productionMetrics: [],
    productionNote: "Рудник 777 видобував мідно-цинкову руду з 2004 року. Hudbay завершила гірничі роботи 17 червня 2022 року після відпрацювання запасів; розпочалися роботи із закриття та виведення об'єкта з експлуатації. Показників після 2022 року немає, оскільки рудник не працює.",
    sources: [
      { title: "Hudbay — Completion of Mining Activities at 777, 22.06.2022", url: "https://hudbay.com/investors/press-releases/press-release-details/2022/Hudbay-Announces-Completion-of-Mining-Activities-at-777-after-18-years-of-Steady-Production/default.aspx" },
      { title: "Hudbay NI 43-101 — 777 Mine: ownership and location", url: "https://www.sec.gov/Archives/edgar/data/1322422/000106299322017538/exhibit99-2.htm" },
      { title: "Government of Manitoba — mineral inventory record 777", url: "https://gov.mb.ca/iem/min-ed/mbhistory/mininv/1044.htm" }
    ],
    notes: "Координати 54°46′30″ N, 101°52′48″ W за технічним звітом NI 43-101 Hudbay."
  }

]);
