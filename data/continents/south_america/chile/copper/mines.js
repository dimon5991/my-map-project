/**
 * Дані мідних шахт Чилі.
 * Координати: [широта, довгота] для точкових об'єктів.
 * Геометрія контуру можна додати пізніше, коли буде інструмент малювання.
 */
window.COPPER_MINES = [
  {
    id: "escondida",
    name: "Escondida",
    country: "Чилі",
    region: "Antofagasta",
    owner: "BHP (57.5%), Rio Tinto Corp. (30%), Japan Escondida (12.5%)",
    status: "Видобуток",
    process: "Концентрати та SX-EW",
    depositType: "Відкрите",
    oreType: "порфірова",
    otherMetals: ["Au", "Ag"],
    coordinates: {
      latitude: -24.270376,
      longitude: -69.074306
    },
    geometry: null,
    productionMetrics: [
      {
        label: "Фактичний видобуток міді",
        value: 1345.1,
        unit: "тис. т Cu",
        year: 2025,
        source: "https://boletin.cochilco.cl/productos/boletin.asp?anio=2026&mes=04&tabla=tabla22",
        sourceTitle: "COCHILCO — виробництво міді за компаніями"
      },
      {
        label: "Номінальна потужність помелу руди",
        value: 422,
        unit: "тис. т руди/добу",
        year: 2025,
        source: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf",
        sourceTitle: "BHP Form 20-F 2025"
      },
      {
        label: "Номінальна потужність катодного цеху",
        value: 350,
        unit: "тис. т катодної міді/рік",
        year: 2025,
        source: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf",
        sourceTitle: "BHP Form 20-F 2025"
      },
      {
        label: "Затверджена потужність трьох збагачувальних фабрик",
        value: 460,
        unit: "тис. т руди/добу",
        year: 2026,
        source: "https://www.bhp.com/news/articles/03/escondida--bhp-submits-environmental-permit-to-build-a-new-concentrator-plant",
        sourceTitle: "BHP — Escondida New Concentrator, 17.03.2026"
      }
    ],
    productionNote: "Не змішуйте показники: 1 345,1 тис. т — фактичний річний видобуток міді; 422 і 460 тис. т/добу — номінальна та затверджена добова переробка руди; 350 тис. т/рік — номінальна потужність виробництва катодної міді.",
    sources: [
      {
        title: "COCHILCO — Anuario de Estadísticas del Cobre y Otros Minerales",
        url: "https://www.cochilco.cl/web/anuario-de-estadisticas-del-cobre-y-otros-minerales/"
      },
      {
        title: "BHP Form 20-F 2025",
        url: "https://www.bhp.com/es/-/media/documents/investors/annual-reports/2025/bhpform20f2025.pdf"
      },
      {
        title: "BHP — Escondida New Concentrator, 17.03.2026",
        url: "https://www.bhp.com/news/articles/03/escondida--bhp-submits-environmental-permit-to-build-a-new-concentrator-plant"
      },
      {
        title: "SERNAGEOMIN coordinates via Veta IQ site inventory",
        url: "https://www.vetaiq.cl/en/catastro/140010"
      }
    ],
    notes: "Координати поточного маркера збережено з наявного запису про Escondida."
  }
];
