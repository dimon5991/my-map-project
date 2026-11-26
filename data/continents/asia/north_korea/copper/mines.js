/**
 * Підтверджені діючі мідні об'єкти Північної Кореї.
 *
 * До активного переліку включено лише Hyesan Youth Copper Mine:
 * його роботу підтверджують повідомлення 2026 року. Інші історично
 * відомі об'єкти не позначено як діючі без свіжих незалежних підтверджень.
 *
 * Координати позначають район мідного рудника Hyesan і є орієнтовними.
 */
window.COPPER_MINES = (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).concat([
  {
    id: "north-korea-hyesan-youth-copper-mine",
    name: "Hyesan Youth Copper Mine",
    country: "Північна Корея",
    region: "Рянган (Ryanggang)",
    owner: "Hye-Joong Mineral Industry (зазначено у таблиці USGS 2024; поточна структура власності публічно не підтверджена)",
    status: "Видобуток (діяльність підтверджується повідомленнями 2026 року)",
    process: "Збагачення мідної руди та отримання концентрату (за історичним описом; поточна схема не уточнена)",
    depositType: "Не уточнено",
    oreType: "Мідна руда; генетичний тип не уточнено",
    otherMetals: [],
    coordinates: { latitude: 41.276774, longitude: 128.261089 },
    geometry: null,
    productionMetrics: [
      {
        label: "Потужність у переліку об'єктів USGS",
        value: 15000,
        unit: "т Cu (таблична місткість; не фактичний видобуток)",
        year: 2024,
        source: "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-north-korea.pdf",
        sourceTitle: "USGS — Facilities table: North Korea (2024)"
      },
      {
        label: "Оцінка видобутку міді в усій країні",
        value: 25000,
        unit: "т Cu (національна оцінка, не показник окремої шахти)",
        year: 2024,
        source: "https://www.usgs.gov/centers/national-minerals-information-center/north-korea",
        sourceTitle: "USGS — North Korea: Production table"
      }
    ],
    productionNote: "USGS наводить для Hyesan Youth Copper Mine табличну місткість 15 000 т Cu, але це не фактичний видобуток шахти. Окремо USGS оцінює видобуток міді в усій Північній Кореї у 25 000 т Cu за 2024 рік; цю національну оцінку не можна приписувати одному руднику.",
    sources: [
      {
        title: "USGS — Mineral Industry of North Korea in 2024: Facilities table",
        url: "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-north-korea.pdf"
      },
      {
        title: "USGS — North Korea: production statistics and 2024 overview",
        url: "https://www.usgs.gov/centers/national-minerals-information-center/north-korea"
      },
      {
        title: "KCNA / OANA — DPRK Mining Industry Sector Promotes Projects to Expand Capacities, 14 October 2026",
        url: "https://oananews.org/node/713999"
      },
      {
        title: "Voice of Korea / KCNA Watch — Successes expanded in field of mining industry, 5 June 2026",
        url: "https://kcnawatch.org/newstream/1780650313-984816940/successes-expanded-in-field-of-mining-industry/"
      },
      {
        title: "Mindat — Hyesan Cu deposit: locality coordinates",
        url: "https://www.mindat.org/feature-2054344.html"
      },
      {
        title: "Nautilus Institute — Recent Activities in the DPRK Minerals Sector (historical mine description, 3 April 2019)",
        url: "https://nautilus.org/napsnet/napsnet-special-reports/recent-activities-in-the-dprk-minerals-sector/"
      }
    ],
    notes: "Координати приблизно позначають район Hyesan Cu deposit (41.366° N, 128.157° E), а не геометричний контур родовища. Hurchon, Yongheong, Kapsan і Shinpa згадуються в історичних матеріалах як мідні об'єкти, однак їхню чинну роботу у 2026 році за доступними джерелами надійно підтвердити не вдалося, тому вони не позначені на карті як діючі."
  }
]);
