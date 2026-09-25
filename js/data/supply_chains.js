// 🚚 Глобальні ланцюги постачання (Рафінування ➔ Компоненти ➔ Фінальна продукція)

export const plantLocations = [
    { coords: [33.951111, 133.232222], title: "Завод Toyo (Японія)", text: "<b>Sumitomo Metal Mining</b><br>Чиста катодна мідь." },
    { coords: [34.452222, 133.920000], title: "Завод Tamano (Японія)", text: "<b>Pan Pacific Copper</b><br>Електролітична мідь." },
    { coords: [33.255278, 131.872222], title: "Завод Saganoseki (Японія)", text: "<b>JX Advanced Metals</b><br>Мідний дріт та сплави." },
    { coords: [36.940278, 140.881944], title: "Завод Onahama (Японія)", text: "<b>Mitsubishi Materials</b><br>Сировина для електроніки." },
    { coords: [36.595000, 140.653889], title: "Завод Hitachi (Японія)", text: "<b>JX Advanced Metals</b><br>Ультра-чиста мідь." },
    { coords: [40.338889, 140.749722], title: "Завод Kosaka (Японія)", text: "<b>DOWA Metals</b><br>Сплави міді." },
    { coords: [-7.1633, 112.6560], title: "Smelter Manyar PT Freeport (Ґресік, Індонезія)", text: "<b>PT Freeport Indonesia</b><br>Найбільший у світі рафінувальний лінія-медеплавильний комплекс (потужність 1.7 млн тон концентрату на рік)." },
    { coords: [-7.1580, 112.6490], title: "Завод PT Smelting (Ґресік, Індонезія)", text: "<b>Mitsubishi Materials & PTFI</b><br>Перший рафінувальний завод катодної міді високої чистоти в Індонезії." },
    { coords: [53.5511, 9.9937], title: "Завод Aurubis Гамбург (Німеччина)", text: "<b>Aurubis AG</b><br>Найбільший переробник міді в Європі." },
    { coords: [28.2680, 117.0300], title: "Мідеплавильний завод Ґуйсі (Китай)", text: "<b>Jiangxi Copper</b><br>Найбільший рафінувальний завод у світі." },
    { coords: [33.3528, -110.8750], title: "Завод Miami Smelter (США)", text: "<b>Freeport-McMoRan (Аризона)</b><br>Рафінована мідь для США." },
    { coords: [35.4800, 129.3500], title: "Завод Onsan (Південна Корея)", text: "<b>LS MnM</b><br>Головний постачальник катодної міді Кореї." }
];

export const componentSuppliers = [
    { coords: [34.6813, 135.4712], title: "Sumitomo Electric (Японія)", text: "<b>Виробництво:</b> Автомобільні джгути проводів." },
    { coords: [33.8828, 130.8753], title: "Yaskawa Electric (Японія)", text: "<b>Виробництво:</b> Серводвигуни та інвертори." },
    { coords: [35.0125, 137.0427], title: "DENSO Corp (Японія)", text: "<b>Виробництво:</b> Генератори, стартери, блоки EV." },
    { coords: [35.1814, 136.9064], title: "Mitsubishi Electric (Японія)", text: "<b>Виробництво:</b> Тягові мотори для поїздів." },
    { coords: [34.5733, 135.5057], title: "Daikin Compressors (Японія)", text: "<b>Виробництво:</b> Прецизійні компресори." },
    { coords: [-6.3620, 107.2800], title: "PT HLI Green Power (Караванг, Індонезія)", text: "<b>Спільне підприємство Hyundai & LG Energy</b><br>Перший у Південно-Східній Азії завод акумуляторних осередків для EV (використовує мідну фольгу та провідники)." },
    { coords: [-6.1800, 106.8900], title: "PT Supreme Cable / Sucaco (Джакарта, Індонезія)", text: "<b>Виробництво:</b> Силові кабелі, мідний емальований дріт для промислових двигунів та енергомереж." },
    { coords: [48.7758, 9.1829], title: "Bosch & Siemens (Штутгарт, Німеччина)", text: "<b>Виробництво:</b> Інвертори, обмотки для е-двигунів." },
    { coords: [41.2565, -95.9345], title: "Eaton Electrical (США)", text: "<b>Виробництво:</b> Високовольтні модулі та розподільні системи." },
    { coords: [22.6938, 114.0579], title: "BYD Component Hub (Шеньчжень, Китай)", text: "<b>Виробництво:</b> Силові пластини, батарейні шини, статори." },
    { coords: [37.1500, 127.0700], title: "LG Energy Solution (Осан, Пд. Корея)", text: "<b>Виробництво:</b> Батарейні блоки та мідні струмознімальні фольги." }
];

export const finalFactories = [
    { coords: [35.0503, 137.1528], title: "Завод Toyota Motomachi (Японія)", text: "<b>Продукція:</b> Електромобілі Toyota bZ4X, Crown." },
    { coords: [35.4680, 139.6308], title: "Завод Nissan Oppama (Японія)", text: "<b>Продукція:</b> Електромобілі Nissan LEAF." },
    { coords: [35.4741, 138.8378], title: "Завод FANUC (Японія)", text: "<b>Продукція:</b> Промислові роботи-маніпулятори." },
    { coords: [34.7024, 137.4085], title: "Завод Nippon Sharyo (Японія)", text: "<b>Продукція:</b> Швидкісні поїзди «Сінкансен»." },
    { coords: [34.6850, 135.6110], title: "Завод Daikin (Японія)", text: "<b>Продукція:</b> Кондиціонери Daikin." },
    { coords: [-6.3500, 107.1500], title: "Hyundai Motor Manufacturing Indonesia (Чікаранг)", text: "<b>Галузь:</b> Автомобілебудування<br><b>Кінцева продукція:</b> Електромобілі Hyundai IONIQ 5 (перший EV, зібраний в Індонезії) та кросовери Creta." },
    { coords: [-6.2600, 106.8500], title: "Panasonic Manufacturing Indonesia (Джакарта)", text: "<b>Галузь:</b> Побутова техніка<br><b>Кінцева продукція:</b> Кондиціонери, холодильники та насоси для ринку Південно-Східної Азії." },
    { coords: [52.4200, 10.7800], title: "Volkswagen Wolfsburg (Німеччина)", text: "<b>Продукція:</b> Електромобілі VW ID.4, ID.7." },
    { coords: [30.2222, -97.6172], title: "Tesla Giga Texas (Остін, США)", text: "<b>Продукція:</b> Електромобілі Tesla Cybertruck, Model Y." },
    { coords: [22.7500, 113.8800], title: "BYD Auto Assembly (Шеньчжень, Китай)", text: "<b>Продукція:</b> Електромобілі BYD Seal, Han." },
    { coords: [35.5380, 129.3110], title: "Hyundai Motor Ulsan Plant (Пд. Корея)", text: "<b>Продукція:</b> Електромобілі Hyundai IONIQ 5, IONIQ 6." }
];

export const fullSupplyChains = [
    { from: [-7.1633, 112.6560], to: [-6.3620, 107.2800], label: "Мідний катод PTFI → Батарейні осередки HLI Green Power", stage: 1 },
    { from: [-6.3620, 107.2800], to: [-6.3500, 107.1500], label: "Батарейні блоки → Електромобілі Hyundai IONIQ 5 (Cikarang)", stage: 2 },
    { from: [-7.1580, 112.6490], to: [-6.1800, 106.8900], label: "Рафінована мідь PT Smelting → Дріт та кабелі Supreme Cable", stage: 1 },
    { from: [-6.1800, 106.8900], to: [-6.2600, 106.8500], label: "Електрокабелі → Побутова техніка Panasonic Indonesia", stage: 2 },
    { from: [-7.1633, 112.6560], to: [37.1500, 127.0700], label: "Мідь Freeport Indonesia → Експорт на завод LG Solution (Корея)", stage: 1 },
    { from: [33.951111, 133.232222], to: [34.6813, 135.4712], label: "Мідь → Джгути Sumitomo", stage: 1 },
    { from: [34.6813, 135.4712], to: [35.0503, 137.1528], label: "Джгути → Електромобілі Toyota", stage: 2 },
    { from: [36.940278, 140.881944], to: [35.0125, 137.0427], label: "Мідь → Модулі DENSO", stage: 1 },
    { from: [35.0125, 137.0427], to: [35.4680, 139.6308], label: "Модулі DENSO → Nissan LEAF", stage: 2 },
    { from: [33.255278, 131.872222], to: [33.8828, 130.8753], label: "Мідь → Двигуни Yaskawa", stage: 1 },
    { from: [33.8828, 130.8753], to: [35.4741, 138.8378], label: "Двигуни → Роботи FANUC", stage: 2 },
    { from: [34.452222, 133.920000], to: [35.1814, 136.9064], label: "Мідь → Тягові мотори Mitsubishi", stage: 1 },
    { from: [35.1814, 136.9064], to: [34.7024, 137.4085], label: "Мотори → Поїзд Shinkansen", stage: 2 },
    { from: [36.595000, 140.653889], to: [34.5733, 135.5057], label: "Мідь → Компресори Daikin", stage: 1 },
    { from: [34.5733, 135.5057], to: [34.6850, 135.6110], label: "Компресори → Кондиціонери Daikin", stage: 2 },
    { from: [53.5511, 9.9937], to: [48.7758, 9.1829], label: "Мідь Aurubis → Компоненти Bosch", stage: 1 },
    { from: [48.7758, 9.1829], to: [52.4200, 10.7800], label: "Модулі Bosch → Електромобілі VW", stage: 2 },
    { from: [33.3528, -110.8750], to: [41.2565, -95.9345], label: "Мідь Freeport → Модулі Eaton", stage: 1 },
    { from: [41.2565, -95.9345], to: [30.2222, -97.6172], label: "Модулі Eaton → Завод Tesla Giga Texas", stage: 2 },
    { from: [28.2680, 117.0300], to: [22.6938, 114.0579], label: "Мідь Jiangxi → Силові пластини BYD", stage: 1 },
    { from: [22.6938, 114.0579], to: [22.7500, 113.8800], label: "Компоненти → Електромобілі BYD", stage: 2 },
    { from: [35.4800, 129.3500], to: [37.1500, 127.0700], label: "Мідь LS MnM → Акумулятори LG", stage: 1 },
    { from: [37.1500, 127.0700], to: [35.5380, 129.3110], label: "Акумулятори LG → Електромобілі Hyundai", stage: 2 }
];