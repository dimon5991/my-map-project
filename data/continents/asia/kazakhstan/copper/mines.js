/**
 * Діючі мідні рудники та виробничі комплекси Казахстану.
 * Статус звірено з USGS, The Mineral Industry of Kazakhstan in 2024.
 * Координати, позначені як орієнтовні в notes, показують район об'єкта,
 * а не точну межу ліцензійної ділянки чи окремої виробки.
 * Zhaisan включено: USGS повідомляє про відновлення робіт у листопаді 2024 року.
 * 50 Let Oktyabrya вилучено зі шару діючих об’єктів: у пізнішому переліку 2025 року воно позначене як idle.
 */
window.COPPER_MINES = (Array.isArray(window.COPPER_MINES) ? window.COPPER_MINES : []).concat([
  {
    "id": "kz-aktogay",
    "name": "Aktogay",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "область Абай",
    "owner": "KAZ Minerals",
    "process": "Відкритий видобуток, збагачення та SX-EW",
    "depositType": "Відкрите",
    "oreType": "Мідна порфірова руда",
    "otherMetals": [
      "Mo"
    ],
    "coordinates": {
      "latitude": 46.96876,
      "longitude": 79.97425
    },
    "notes": "Діючий комплекс. Координати позначають район кар’єру; картка відображає виробничий об’єкт, а не межі ліцензійної ділянки.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "KAZ Minerals — діючі операції",
        "url": "https://www.kazminerals.com/"
      }
    ]
  },
  {
    "id": "kz-bozshakol",
    "name": "Bozshakol",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Павлодарська область",
    "owner": "KAZ Minerals",
    "process": "Відкритий видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідна порфірова руда",
    "otherMetals": [
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 51.8469,
      "longitude": 74.29111
    },
    "notes": "Діючий гірничо-збагачувальний комплекс; координата орієнтовно позначає кар’єр.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "KAZ Minerals — діючі операції",
        "url": "https://www.kazminerals.com/"
      }
    ]
  },
  {
    "id": "kz-artemyevsky",
    "name": "Artemyevsky",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Східноказахстанська область",
    "owner": "KAZ Minerals",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Мідно-цинкова сульфідна руда",
    "otherMetals": [
      "Zn",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 50,
      "longitude": 82.5
    },
    "notes": "Орієнтовна координата району Східного гірничого комплексу; точка не є геодезичною прив’язкою ствола шахти.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "KAZ Minerals — діючі операції",
        "url": "https://www.kazminerals.com/"
      }
    ]
  },
  {
    "id": "kz-irtyshsky",
    "name": "Irtyshsky",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Східноказахстанська область",
    "owner": "KAZ Minerals",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Мідно-цинкова сульфідна руда",
    "otherMetals": [
      "Zn",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 50.13,
      "longitude": 82.51
    },
    "notes": "Орієнтовна координата району Східного гірничого комплексу.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "KAZ Minerals — діючі операції",
        "url": "https://www.kazminerals.com/"
      }
    ]
  },
  {
    "id": "kz-orlovsky",
    "name": "Orlovsky",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Східноказахстанська область",
    "owner": "KAZ Minerals",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Мідно-цинкова сульфідна руда",
    "otherMetals": [
      "Zn",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 50.69,
      "longitude": 81.87
    },
    "notes": "Орієнтовна координата рудника у Східному регіоні.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "KAZ Minerals — діючі операції",
        "url": "https://www.kazminerals.com/"
      }
    ]
  },
  {
    "id": "kz-ridder-district",
    "name": "Ridder mining district",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Східноказахстанська область",
    "owner": "Kazzinc / Glencore",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Поліметалічна сульфідна руда",
    "otherMetals": [
      "Zn",
      "Pb",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 50.36,
      "longitude": 83.54
    },
    "notes": "Узагальнена точка гірничого району. USGS за 2024 рік окремо наводить Ridder GOK, Ridder-Sokolny, Shubinsky та Tishinsky; їхні підземні виробничі майданчики розташовані близько один до одного, тому на масштабі країни позначені однією міткою.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-maleevsky",
    "name": "Maleevsky",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Східноказахстанська область",
    "owner": "Kazzinc / Glencore",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Поліметалічна сульфідна руда",
    "otherMetals": [
      "Zn",
      "Pb",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 49.78,
      "longitude": 84.32
    },
    "notes": "Орієнтовна координата гірничого майданчика.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-nurkazgan",
    "name": "Nurkazgan",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Карагандинська область",
    "owner": "Kazakhmys",
    "process": "Відкритий і підземний видобуток; збагачення",
    "depositType": "Відкрите / підземне",
    "oreType": "Мідна порфірова руда",
    "otherMetals": [
      "Au",
      "Mo"
    ],
    "coordinates": {
      "latitude": 50.15833,
      "longitude": 72.99722
    },
    "notes": "Координата прив’язана до району родовища.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-abyz",
    "name": "Abyz",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Карагандинська область",
    "owner": "Kazakhmys",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Підземне",
    "oreType": "Мідно-поліметалічна руда",
    "otherMetals": [
      "Au",
      "Ag",
      "Zn",
      "Pb"
    ],
    "coordinates": {
      "latitude": 49.4186,
      "longitude": 76.4944
    },
    "notes": "Координата орієнтовно позначає район шахти.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-khadzhikongan",
    "name": "Khadzhikongan",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Карагандинська область",
    "owner": "Kazakhmys",
    "process": "Видобуток і збагачення",
    "depositType": "Не уточнено",
    "oreType": "Мідна руда",
    "otherMetals": [
      "Zn",
      "Pb"
    ],
    "coordinates": {
      "latitude": 49.85,
      "longitude": 73.95
    },
    "notes": "Орієнтовна точка району родовища; публічні джерела не дають точності до окремого кар’єру/ствола.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-kusmuryn-aktabasu",
    "name": "Kusmuryn–Aktabasu",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "область Абай",
    "owner": "Kazakhmys",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідно-поліметалічна руда",
    "otherMetals": [
      "Zn",
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 48.57566,
      "longitude": 77.77054
    },
    "notes": "Координата — орієнтовний центр виробничої ділянки біля села Корик.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "Акімат області Абай — матеріали щодо рудника Кусмурин–Акбастау",
        "url": "https://www.gov.kz/memleket/entities/abay-tabigat/press/article/details/194408"
      }
    ]
  },
  {
    "id": "kz-zhezkazgan",
    "name": "Zhezkazgan–Zhilandinsky copper complex",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "область Ұлытау",
    "owner": "Kazakhmys",
    "process": "Підземний видобуток і збагачення",
    "depositType": "Переважно підземне",
    "oreType": "Мідисті пісковики",
    "otherMetals": [
      "Ag"
    ],
    "coordinates": {
      "latitude": 48.122,
      "longitude": 67.392
    },
    "notes": "Узагальнена точка мідного гірничого комплексу: Північний, Південний і Східний Жезказган та пов’язані ділянки. Координата приблизна; не показує межі кожної шахти. Жиландинська група має окрему мітку.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "MineralLink — Zhezkazgan copper mines, approximate location",
        "url": "https://minerallink.org/explore?country=KAZ&mine=zhezkazgan-mines"
      }
    ]
  },
  {
    "id": "kz-zhomart",
    "name": "Zhomart (Cu)",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "область Ұлытау",
    "owner": "Kazakhmys",
    "process": "Підземний видобуток",
    "depositType": "Підземне",
    "oreType": "Мідна руда",
    "otherMetals": [
      "Ag"
    ],
    "coordinates": {
      "latitude": 48.137,
      "longitude": 70.083
    },
    "notes": "Точку розраховано як центр опублікованого контуру гірничого відводу; не плутати з однойменним марганцевим об’єктом.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "Екологічний портал Казахстану — координати гірничого відводу Жомарт",
        "url": "https://ecoportal.kz/Rubric/RubService/LoadFile/29463"
      }
    ]
  },
  {
    "id": "kz-kounrad",
    "name": "Kounrad",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Карагандинська область",
    "owner": "Central Asia Metals",
    "process": "Вилучення міді методом SX-EW з відвалів і техногенних матеріалів",
    "depositType": "Техногенний об’єкт",
    "oreType": "Мідьвмісні відвали та відходи збагачення",
    "otherMetals": [],
    "coordinates": {
      "latitude": 46.99,
      "longitude": 74.987
    },
    "notes": "Це діючий об’єкт вилучення міді з історичних відвалів, а не звичайний кар’єр з новою виїмкою руди.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-sayak",
    "name": "Sayak",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "область Абай",
    "owner": "Kazakhmys",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите / підземне",
    "oreType": "Мідна руда",
    "otherMetals": [
      "Au",
      "Ag"
    ],
    "coordinates": {
      "latitude": 47.00793,
      "longitude": 77.53056
    },
    "notes": "Координата орієнтовно позначає район гірничого комплексу.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-shatyrkul",
    "name": "Shatyrkul (Shartykul)",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Жамбильська область",
    "owner": "Kazakhmys",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідна руда",
    "otherMetals": [],
    "coordinates": {
      "latitude": 43.65,
      "longitude": 73.87
    },
    "notes": "USGS вказує Shartykul Mine та запуск виробництва концентрату у 2024 році; координата орієнтовна.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-borly",
    "name": "Borly",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Карагандинська область",
    "owner": "Kazakhmys / Borly",
    "process": "Видобуток і виробництво мідних катодів",
    "depositType": "Відкрите",
    "oreType": "Мідна руда",
    "otherMetals": [],
    "coordinates": {
      "latitude": 47.18444,
      "longitude": 74.71139
    },
    "notes": "USGS повідомляє про роботу комплексу з 2022 року та виробництво мідних катодів.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-varvara",
    "name": "Varvara",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Костанайська область",
    "owner": "Solidcore Resources",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Золото-мідна руда",
    "otherMetals": [
      "Au"
    ],
    "coordinates": {
      "latitude": 52.9572,
      "longitude": 62.1231
    },
    "notes": "Координата приблизна; мітка показує виробничий майданчик Varvara.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-komar",
    "name": "Kamar (Komar)",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Костанайська область",
    "owner": "Solidcore Resources",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідно-золота руда",
    "otherMetals": [
      "Au"
    ],
    "coordinates": {
      "latitude": 52.14832,
      "longitude": 61.22277
    },
    "notes": "USGS наводить мідне виробництво для Kamar; координата орієнтовно позначає район родовища.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-priorskoye",
    "name": "Priorskoye",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Актюбінська область",
    "owner": "Copper Technology",
    "process": "Відкритий видобуток",
    "depositType": "Відкрите",
    "oreType": "Мідно-цинкова колчеданна руда",
    "otherMetals": [
      "Zn"
    ],
    "coordinates": {
      "latitude": 50.54639,
      "longitude": 59.01389
    },
    "notes": "Координати взято з повідомлення акімату Актюбінської області.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "Акімат Актюбінської області — координати Приорського родовища",
        "url": "https://www.gov.kz/org/aktobe-zher-paidalanuy/press/article/details/222200"
      }
    ]
  },
  {
    "id": "kz-avangard",
    "name": "Avangard",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Актюбінська область",
    "owner": "Aktobe Copper Company",
    "process": "Відкритий видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідно-колчеданна руда",
    "otherMetals": [
      "Zn"
    ],
    "coordinates": {
      "latitude": 50.6096,
      "longitude": 59.1025
    },
    "notes": "Розробка відкритим способом розпочалась у 2023 році; координата обчислена за опублікованим контуром кар’єру.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "Матеріали громадських слухань — родовище Авангард",
        "url": "https://hearings.ndbecology.gov.kz/Public/PubHearings/PublicHearingDetail?hearingId=22999"
      }
    ]
  },
  {
    "id": "kz-vesenne-aralchinskoye",
    "name": "Vesenne-Aralchinskoye",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Актюбінська область",
    "owner": "Aktobe Copper Company",
    "process": "Видобуток і збагачення",
    "depositType": "Відкрите",
    "oreType": "Мідно-цинкова колчеданна руда",
    "otherMetals": [
      "Zn"
    ],
    "coordinates": {
      "latitude": 50.625,
      "longitude": 59.4667
    },
    "notes": "Точка — приблизний центр контуру родовища за координатами, наведеними в державному переліку надр.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  },
  {
    "id": "kz-kundyzdy",
    "name": "Kundyzdy",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Актюбінська область",
    "owner": "KazGeorud",
    "process": "Відкритий видобуток",
    "depositType": "Відкрите",
    "oreType": "Мідна руда",
    "otherMetals": [],
    "coordinates": {
      "latitude": 49.058120,
      "longitude": 58.555756
    },
    "notes": "Координата промислового майданчика з екологічного звіту KazGeorud за 2023 рік.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      },
      {
        "title": "Екологічний звіт KazGeorud за 2023 рік — координати Кундызди",
        "url": "https://ecogosfond.kz/wp-content/uploads/2025/01/RVPZ2023.74Kazgeorud.pdf"
      }
    ]
  },
  {
    "id": "kz-benkala",
    "name": "Benkala",
    "country": "Казахстан",
    "status": "Діючий об’єкт (перелік USGS 2024)",
    "region": "Актюбінська область",
    "owner": "SN Mining",
    "process": "Вилуговування та SX-EW",
    "depositType": "Відкрите",
    "oreType": "Мідна порфірова руда",
    "otherMetals": [],
    "coordinates": {
      "latitude": 51.206,
      "longitude": 61.771
    },
    "notes": "Виробничий об’єкт з отримання мідних катодів; координата позначає район родовища.",
    "sources": [
      {
        "title": "USGS — The Mineral Industry of Kazakhstan in 2024",
        "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf"
      }
    ]
  }
,
  {
    "id": "kz-zhaisan",
    "name": "Zhaisan",
    "country": "Казахстан",
    "status": "Роботу відновлено у листопаді 2024 року (USGS)",
    "region": "Жамбильська область",
    "owner": "Zhanashyr Project LLP (Kazakhmys)",
    "process": "Підземний видобуток мідної руди; переробка на Шатиркульській фабриці",
    "depositType": "Підземне",
    "oreType": "Мідно-сульфідна руда",
    "otherMetals": ["Ag", "Au"],
    "coordinates": { "latitude": 43.5250, "longitude": 74.4230 },
    "notes": "Координата є приблизним центром гірничого відводу за опублікованим екологічним описом, а не точкою шахтного порталу. USGS повідомляє, що роботу на шахті відновили у листопаді 2024 року.",
    "sources": [
      { "title": "USGS — Kazakhstan, 2024: Zhaisan Mine resumed work in November 2024", "url": "https://www.usgs.gov/centers/national-minerals-information-center/kazakhstan" },
      { "title": "Екологічний портал Казахстану — координати та опис родовища Жайсан", "url": "https://ecoportal.kz/Disscusion/DisHearings/LoadFile/120608" }
    ]
  }
,
  {
    "id": "kz-zhilandinsky",
    "name": "Zhilandinsky",
    "country": "Казахстан",
    "status": "Діючий об’єкт (USGS 2024; робочі майданчики підтверджені 2025)",
    "region": "область Ұлытау",
    "owner": "Kazakhmys",
    "process": "Відкритий і підземний видобуток мідної руди",
    "depositType": "Відкрите / підземне",
    "oreType": "Мідно-сульфідна руда",
    "otherMetals": [],
    "coordinates": { "latitude": 48.1605, "longitude": 67.5572 },
    "notes": "Координата є приблизним центром опублікованого полігону виробничої ділянки Жиландинської групи за матеріалами громадських слухань Kazakhmys від 12 серпня 2025 року; не є точкою окремого кар’єру.",
    "sources": [
      { "title": "USGS — The Mineral Industry of Kazakhstan in 2024", "url": "https://pubs.usgs.gov/myb/vol3/2024/myb3-2024-kazakhstan.pdf" },
      { "title": "Kazakhmys — громадські слухання щодо Жиландинської групи, координати ділянки (2025)", "url": "https://hearings.ndbecology.gov.kz/Public/PubHearings/LoadFile/228662" }
    ]
  }
]);
