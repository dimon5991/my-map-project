// Data extracted from index.html
window.countryData = window.countryData || {};
window.countryData.minerals = window.countryData.minerals || {};
window.countryData.minerals.japan = {
  plantLocations: [
    { coords: [33.951111, 133.232222], title: "Завод Toyo (Японія)", text: "<b>Sumitomo Metal Mining</b><br>Чиста катодна мідь." },
    { coords: [34.452222, 133.920000], title: "Завод Tamano (Японія)", text: "<b>Pan Pacific Copper</b><br>Електролітична мідь." },
    { coords: [33.255278, 131.872222], title: "Завод Saganoseki (Японія)", text: "<b>JX Advanced Metals</b><br>Мідний дріт та сплави." },
    { coords: [36.940278, 140.881944], title: "Завод Onahama (Японія)", text: "<b>Mitsubishi Materials</b><br>Сировина для електроніки." },
    { coords: [36.595000, 140.653889], title: "Завод Hitachi (Японія)", text: "<b>JX Advanced Metals</b><br>Ультра-чиста мідь." },
    { coords: [40.338889, 140.749722], title: "Завод Kosaka (Японія)", text: "<b>DOWA Metals</b><br>Сплави міді." }
  ]
  ,fullSupplyChains: [
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
        ]
};
