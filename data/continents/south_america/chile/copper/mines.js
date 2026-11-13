/**
 * Мідні родовища Чилі.
 * Основні характеристики 11 об'єктів (окрім Escondida) перенесено
 * з вкладки «Калинюк Денис (Чилі)» файлу «Мідні родовища.xlsx».
 * Усі текстові поля перекладено українською; назви компаній і хімічні
 * символи металів залишено в оригінальному написанні.
 * Координати — орієнтовні точки розташування гірничих комплексів.
 */
window.COPPER_MINES = [
  {
    id: "escondida",
    name: "Escondida",
    country: "Чилі",
    region: "Антофагаста",
    owner: "BHP (57.5%), Rio Tinto Corp. (30%), Japan Escondida (12.5%)",
    status: "Видобуток",
    process: "Отримання концентрату та SX-EW",
    depositType: "Відкрите",
    oreType: "Порфірова; сульфідна / окиснена",
    otherMetals: ["Au", "Ag"],
    coordinates: { latitude: -24.270376, longitude: -69.074306 },
    geometry: null,
    productionMetrics: [
      { label: "Фактичний видобуток міді", value: 1345.1, unit: "тис. т Cu", year: 2025, source: "https://boletin.cochilco.cl/productos/boletin.asp?anio=2026&mes=06&tabla=tabla22", sourceTitle: "COCHILCO — виробництво міді за компаніями" },
      { label: "Номінальна потужність помелу руди", value: 422, unit: "тис. т руди/добу", year: 2025, source: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf", sourceTitle: "BHP Form 20-F 2025" },
      { label: "Номінальна потужність катодного цеху", value: 350, unit: "тис. т катодної міді/рік", year: 2025, source: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf", sourceTitle: "BHP Form 20-F 2025" },
      { label: "Затверджена потужність трьох збагачувальних фабрик", value: 460, unit: "тис. т руди/добу", year: 2026, source: "https://www.bhp.com/news/articles/03/escondida--bhp-submits-environmental-permit-to-build-a-new-concentrator-plant", sourceTitle: "BHP — новий концентратор Escondida" },
      { label: "Проєктна потужність нового концентратора", value: "220–260", unit: "тис. т міді/рік", year: "2031–2032", source: "https://www.bhp.com/news/articles/03/escondida--bhp-submits-environmental-permit-to-build-a-new-concentrator-plant", sourceTitle: "BHP — проєкт нового концентратора" }
    ],
    productionNote: "Не змішуйте показники: 1 345,1 тис. т — фактичний календарний видобуток міді за 2025 рік; 422 тис. т/добу — номінальна потужність помелу руди; 460 тис. т/добу — затверджена загальна потужність трьох фабрик; 350 тис. т/рік — номінальна потужність катодного цеху. Новий концентратор на 220–260 тис. т міді/рік є проєктом, а не чинною потужністю.",
    sources: [
      { title: "COCHILCO — статистика міді та інших мінералів", url: "https://www.cochilco.cl/web/anuario-de-estadisticas-del-cobre-y-otros-minerales/" },
      { title: "BHP Form 20-F 2025", url: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf" },
      { title: "BHP — проєкт нового концентратора Escondida", url: "https://www.bhp.com/news/articles/03/escondida--bhp-submits-environmental-permit-to-build-a-new-concentrator-plant" },
      { title: "SERNAGEOMIN — картка родовища Escondida", url: "https://www.vetaiq.cl/en/catastro/140010" }
    ],
    notes: "Координати маркера збережено з попереднього запису Escondida."
  }
].concat([
  {
    id: "chile-collahuasi", name: "Collahuasi", country: "Чилі", region: "Тарапака",
    owner: "Anglo American / Glencore", status: "Видобуток",
    process: "Отримання концентрату та SX-EW", depositType: "Відкрите",
    oreType: "Сульфідна / окиснена", otherMetals: ["Mo", "Ag"],
    coordinates: { latitude: -20.96428, longitude: -68.66121 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.5", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,5 млн т. Період вимірювання та те, чи йдеться про руду або метал, не уточнено; тому цей показник не слід трактувати як підтверджений річний видобуток міді.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Consejo Minero — Collahuasi: місце розташування та статус", url: "https://consejominero.cl/plataformas-digitales/plataforma-de-relaves/fichas-relaves-cm/collahuasi/" }],
    notes: "Координати орієнтовно позначають район гірничого комплексу Collahuasi."
  },
  {
    id: "chile-el-teniente", name: "El Teniente", country: "Чилі", region: "О'Гіггінс",
    owner: "Codelco", status: "Видобуток", process: "Отримання концентрату",
    depositType: "Підземне", oreType: "Сульфідна", otherMetals: ["Mo"],
    coordinates: { latitude: -34.0916, longitude: -70.3383 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.4", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,4 млн т. Період вимірювання та база показника не уточнені; це значення не можна автоматично вважати річним видобутком міді.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "USGS — геологічні родовища Латинської Америки та Канади", url: "https://app.ingemmet.gob.pe/biblioteca/pdf/Econ-156.pdf" }],
    notes: "Координати відповідають орієнтовному розташуванню родовища El Teniente."
  },
  {
    id: "chile-chuquicamata", name: "Chuquicamata", country: "Чилі", region: "Антофагаста",
    owner: "Codelco", status: "Видобуток",
    process: "Отримання концентрату, SX-EW та плавлення",
    depositType: "Підземне / відкрите", oreType: "Сульфідна / окиснена", otherMetals: ["Mo", "Ag"],
    coordinates: { latitude: -22.3, longitude: -68.9 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.3", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,3 млн т. Період вимірювання та база показника не уточнені; значення збережено без перерахунку.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Codelco — офіційний сайт", url: "https://www.codelco.com/" }],
    notes: "Координати орієнтовно позначають район Chuquicamata поблизу Калами."
  },
  {
    id: "chile-los-pelambres", name: "Los Pelambres", country: "Чилі", region: "Кокімбо",
    owner: "Antofagasta Minerals", status: "Видобуток", process: "Отримання концентрату",
    depositType: "Відкрите", oreType: "Сульфідна", otherMetals: ["Mo", "Au"],
    coordinates: { latitude: -31.7667, longitude: -70.6 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.3", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,3 млн т. Період вимірювання та база показника не уточнені; це не підтверджений показник річного видобутку міді.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Antofagasta Minerals — офіційний сайт", url: "https://www.antofagasta.co.uk/our-business/operations/los-pelambres/" }],
    notes: "Координати орієнтовно позначають гірничий комплекс Los Pelambres."
  },
  {
    id: "chile-radomiro-tomic", name: "Radomiro Tomic", country: "Чилі", region: "Антофагаста",
    owner: "Codelco", status: "Видобуток",
    process: "SX-EW та отримання концентрату", depositType: "Відкрите",
    oreType: "Окиснена / сульфідна", otherMetals: ["Mo"],
    coordinates: { latitude: -22.22833, longitude: -68.88444 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.2", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,2 млн т. Період вимірювання та база показника не уточнені; значення не слід трактувати як підтверджений річний видобуток.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Mindat — координати Radomiro Tomic", url: "https://www.mindat.org/loc-39274.html" }],
    notes: "Координати взято з довідкової картки місцевості Mindat; це точка розташування шахти."
  },
  {
    id: "chile-andina", name: "Andina", country: "Чилі", region: "Вальпараїсо",
    owner: "Codelco", status: "Видобуток", process: "Отримання концентрату",
    depositType: "Підземне / відкрите", oreType: "Сульфідна", otherMetals: ["Mo"],
    coordinates: { latitude: -33.14, longitude: -70.26 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.2", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,2 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Codelco — офіційний сайт", url: "https://www.codelco.com/" }],
    notes: "Координати орієнтовно позначають гірничий район Andina в Андах."
  },
  {
    id: "chile-spence", name: "Spence", country: "Чилі", region: "Антофагаста",
    owner: "BHP", status: "Видобуток", process: "Отримання концентрату та SX-EW",
    depositType: "Відкрите", oreType: "Сульфідна / окиснена", otherMetals: ["Mo"],
    coordinates: { latitude: -22.8, longitude: -69.25 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.2", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,2 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "BHP — офіційний сайт", url: "https://www.bhp.com/" }],
    notes: "Координати орієнтовно позначають район мідного рудника Spence."
  },
  {
    id: "chile-centinela", name: "Centinela", country: "Чилі", region: "Антофагаста",
    owner: "Antofagasta Minerals", status: "Видобуток",
    process: "Отримання концентрату та SX-EW", depositType: "Відкрите",
    oreType: "Сульфідна / окиснена", otherMetals: ["Au", "Mo"],
    coordinates: { latitude: -23.06, longitude: -69.39 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.2", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,2 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Antofagasta Minerals — офіційний сайт", url: "https://www.antofagasta.co.uk/" }],
    notes: "Координати орієнтовно позначають гірничий район Centinela."
  },
  {
    id: "chile-candelaria", name: "Candelaria", country: "Чилі", region: "Атакама",
    owner: "Lundin Mining", status: "Видобуток", process: "Отримання концентрату",
    depositType: "Відкрите / підземне", oreType: "Сульфідна", otherMetals: ["Au", "Ag"],
    coordinates: { latitude: -27.5333, longitude: -70.4 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.1", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,1 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "USGS — координати родовища La Candelaria", url: "https://app.ingemmet.gob.pe/biblioteca/pdf/Econ-156.pdf" }],
    notes: "Координати орієнтовно позначають район Candelaria поблизу Копіапо."
  },
  {
    id: "chile-caserones", name: "Caserones", country: "Чилі", region: "Атакама",
    owner: "Lundin Mining / JX Metals", status: "Видобуток",
    process: "Отримання концентрату та SX-EW", depositType: "Відкрите",
    oreType: "Сульфідна / окиснена", otherMetals: ["Mo"],
    coordinates: { latitude: -28.1667, longitude: -69.5333 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "> 0.1", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність понад 0,1 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — Caserones: власність і місце розташування", url: "https://consejominero.cl/nosotros/socios/caserones/" }, { title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }],
    notes: "Координати району Caserones: приблизно 28°10′ пд. ш. та 69°32′ зх. д."
  },
  {
    id: "chile-lomas-bayas", name: "Lomas Bayas", country: "Чилі", region: "Антофагаста",
    owner: "Glencore", status: "Видобуток", process: "SX-EW",
    depositType: "Відкрите", oreType: "Окиснена", otherMetals: [],
    coordinates: { latitude: -23.45, longitude: -69.65 }, geometry: null,
    productionMetrics: [{ label: "Потужність за вихідною таблицею", value: "< 0.1", unit: "млн т (період і база показника не уточнені)" }],
    productionNote: "У вихідній таблиці наведено потужність менш як 0,1 млн т. Період вимірювання та база показника не уточнені.",
    sources: [{ title: "Consejo Minero — гірничодобувна карта Чилі", url: "https://consejominero.cl/en/about-us/mining-map/" }, { title: "Glencore — офіційний сайт", url: "https://www.glencore.com/" }],
    notes: "Координати орієнтовно позначають район рудника Lomas Bayas."
  }
]);
