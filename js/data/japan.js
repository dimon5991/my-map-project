const japanCompanies = [
    {
        id: "jera",
        name: "JERA",
        color: "#ff3366",
        plants: [
            { name: "ТЕС Хекінан (Hekinan Thermal)", coords: [34.8353, 136.9622], role: "Одна з найбільших вугільних ТЕС у світі", cap: "4.1 ГВт", type: "Вугільна ТЕС" },
            { name: "ТЕС Футцу (Futtsu Power Station)", coords: [35.3411, 139.8133], role: "Потужна СПГ Електростанція", cap: "5.0 ГВт", type: "СПГ ТЕС" },
            { name: "ТЕС Йокосука (Yokosuka Power)", coords: [35.2155, 139.7164], role: "Сучасна газова ТЕС", cap: "1.3 ГВт", type: "Газова ТЕС" }
        ]
    },
    {
        id: "tepco",
        name: "TEPCO",
        color: "#ff0000",
        plants: [
            { name: "АЕС Касівадзакі-Каріва", coords: [37.4283, 138.6017], role: "Найбільша АЕС у світі", cap: "7.96 ГВт", type: "АЕС" },
            { name: "АЕС Хігасідорі (TEPCO)", coords: [41.2344, 141.3593], role: "Атомна станція на півночі Хонсю", cap: "1.38 ГВт", type: "АЕС" }
        ]
    },
    {
        id: "kepco",
        name: "Kansai Electric (KEPCO)",
        color: "#00d2ff",
        plants: [
            { name: "АЕС Такахама (Takahama NPP)", coords: [35.5392, 135.6567], role: "Ключова АЕС регіону Кансай", cap: "3.4 ГВт", type: "АЕС" },
            { name: "АЕС Оі (Ohi Nuclear Plant)", coords: [35.5408, 135.6514], role: "Потужна атомна станція", cap: "2.36 ГВт", type: "АЕС" },
            { name: "ТЕС Сакаї-Ко", coords: [34.6200, 135.4200], role: "Газова ТЕС в Осаці", cap: "2.0 ГВт", type: "Газова ТЕС" }
        ]
    },
    {
        id: "chubu",
        name: "Chubu Electric Power",
        color: "#ffaa00",
        plants: [
            { name: "АЕС Хамаока (Hamaoka NPP)", coords: [34.6189, 138.1408], role: "Основна АЕС компанії Chubu", cap: "4.9 ГВт", type: "АЕС" },
            { name: "ТЕС Тіта (Chita Thermal Power)", coords: [34.9897, 136.8530], role: "СПГ електростанція в префектурі Айті", cap: "3.9 ГВт", type: "СПГ ТЕС" }
        ]
    },
    {
        id: "jpower",
        name: "J-POWER",
        color: "#00ff88",
        plants: [
            { name: "АЕС Ома (Ohma NPP)", coords: [41.5458, 141.3889], role: "Новітня АЕС J-POWER", cap: "1.38 ГВт", type: "АЕС" },
            { name: "ГАЕС Сакума (Sakuma Hydro)", coords: [35.0983, 137.7944], role: "Гідроакумулювальна станція", cap: "0.35 ГВт", type: "ГЕС" },
            { name: "ТЕС Мацуура (Matsuura Power)", coords: [33.3411, 129.7022], role: "Вугільна ТЕС високої ефективності", cap: "2.0 ГВт", type: "Вугільна ТЕС" }
        ]
    },
    {
        id: "tohoku",
        name: "Tohoku Electric Power",
        color: "#9966ff",
        plants: [
            { name: "АЕС Онаґава (Onagawa NPP)", coords: [38.3992, 141.5000], role: "Головна АЕС півночі Хонсю", cap: "2.17 ГВт", type: "АЕС" },
            { name: "АЕС Хігасідорі (Tohoku)", coords: [41.1872, 141.3897], role: "Атомний блок на узбережжі", cap: "1.1 ГВт", type: "АЕС" }
        ]
    },
    {
        id: "kyushu",
        name: "Kyushu Electric Power",
        color: "#ff00ff",
        plants: [
            { name: "АЕС Генкай (Genkai NPP)", coords: [33.5156, 129.8375], role: "Основна АЕС на півночі Кюсю", cap: "3.47 ГВт", type: "АЕС" },
            { name: "АЕС Сендай (Sendai NPP)", coords: [31.8336, 130.1836], role: "АЕС на півдні острова Кюсю", cap: "1.78 ГВт", type: "АЕС" }
        ]
    },
    {
        id: "chugoku",
        name: "Chugoku Electric Power",
        color: "#00ffff",
        plants: [
            { name: "АЕС Сімане (Shimane NPP)", coords: [34.6022, 132.9989], role: "Атомна станція регіону", cap: "1.28 ГВт", type: "АЕС" },
            { name: "ТЕС Місумі (Misumi Power)", coords: [34.7811, 131.9402], role: "Вугільна ТЕС Chugoku Electric", cap: "1.0 ГВт", type: "Вугільна ТЕС" }
        ]
    },
    {
        id: "hepco",
        name: "Hokkaido Electric (HEPCO)",
        color: "#00ffcc",
        plants: [
            { name: "АЕС Томарі (Tomari NPP)", coords: [42.9656, 140.5122], role: "Єдина АЕС на Хоккайдо", cap: "2.07 ГВт", type: "АЕС" },
            { name: "ТЕС Томато-Ацума (Tomato-Atsuma)", coords: [42.6311, 141.8100], role: "Основна ТЕС на Хоккайдо", cap: "1.65 ГВт", type: "Вугільна ТЕС" }
        ]
    },
    {
        id: "yonden",
        name: "Shikoku Electric (Yonden)",
        color: "#ffff00",
        plants: [
            { name: "АЕС Іката (Ikata NPP)", coords: [33.4914, 132.3094], role: "Єдина АЕС на Сікоку", cap: "2.02 ГВт", type: "АЕС" },
            { name: "ТЕС Сакаїде (Sakaide Power)", coords: [34.3311, 133.8500], role: "Головна ТЕС острова Сікоку", cap: "1.38 ГВт", type: "СПГ ТЕС" }
        ]
    },
    {
        id: "hokuriku",
        name: "Hokuriku Electric Power",
        color: "#ff6600",
        plants: [
            { name: "АЕС Сіка (Shika NPP)", coords: [37.0611, 136.7264], role: "Атомна генерація Хокуріку", cap: "1.89 ГВт", type: "АЕС" },
            { name: "ТЕС Нанао-Ота (Nanao-Ota)", coords: [37.0422, 136.9811], role: "Вугільна ТЕС префектури Ісікава", cap: "1.2 ГВт", type: "Вугільна ТЕС" }
        ]
    },
    {
        id: "oepc",
        name: "Okinawa Electric (OEPC)",
        color: "#ff99bb",
        plants: [
            { name: "ТЕС Гіноза (Ginoza Thermal)", coords: [26.3811, 127.8300], role: "Основна ТЕС архіпелагу Окінава", cap: "0.5 ГВт", type: "Мазутно-газова ТЕС" },
            { name: "ТЕС Йосіура (Yoshiura)", coords: [26.1500, 127.6700], role: "Резервна ТЕС префектури", cap: "0.3 ГВт", type: "ТЕС" }
        ]
    },
    {
        id: "japc",
        name: "Japan Atomic Power Company (JAPC)",
        color: "#e60000",
        plants: [
            { name: "АЕС Токай-2 (Tokai No. 2)", coords: [36.4678, 140.6067], role: "Атомна станція JAPC в Ібаракі", cap: "1.1 ГВт", type: "АЕС" },
            { name: "АЕС Цуруга (Tsuruga NPP)", coords: [35.6728, 136.0742], role: "Атомна станція JAPC у Фукуї", cap: "1.5 ГВт", type: "АЕС" }
        ]
    },
    {
        id: "softbank",
        name: "SB Energy (SoftBank)",
        color: "#33cc33",
        plants: [
            { name: "СЕС SoftBank Томакомай", coords: [42.7000, 141.6000], role: "Сонячний парк на Хоккайдо", cap: "0.11 ГВт", type: "СЕС" },
            { name: "СЕС SoftBank Міядзакі", coords: [31.9100, 131.4200], role: "Сонячна станція на Кюсю", cap: "0.08 ГВт", type: "СЕС" }
        ]
    },
    {
        id: "jre",
        name: "Japan Renewable Energy (JRE)",
        color: "#66ff33",
        plants: [
            { name: "ВЕС JRE Акіта Порт", coords: [39.7167, 140.1167], role: "Морський вітропарк", cap: "0.14 ГВт", type: "Офшорна ВЕС" },
            { name: "СЕС JRE Насукарасуяма", coords: [36.6500, 140.1500], role: "Сонячна електростанція в Точігі", cap: "0.05 ГВт", type: "СЕС" }
        ]
    },
    {
        id: "renova",
        name: "Renova Inc.",
        color: "#00ffaa",
        plants: [
            { name: "БіоТЕС Саката (Sakata Biomass)", coords: [39.2000, 139.9000], role: "Станція на біомасі", cap: "0.07 ГВт", type: "БіоТЕС" },
            { name: "СЕС Renova Карацу", coords: [33.4500, 129.9600], role: "Сонячна електростанція", cap: "0.05 ГВт", type: "СЕС" }
        ]
    },
    {
        id: "shizen",
        name: "Shizen Energy",
        color: "#b3ff66",
        plants: [
            { name: "СЕС Кумамото Косі", coords: [32.8000, 130.7000], role: "Сонячний парк у Кумамото", cap: "0.05 ГВт", type: "СЕС" },
            { name: "ВЕС Shizen Карадцу", coords: [33.4000, 129.9800], role: "Вітрова електростанція", cap: "0.03 ГВт", type: "ВЕС" }
        ]
    },
    {
        id: "osakagas",
        name: "Osaka Gas",
        color: "#3399ff",
        plants: [
            { name: "ТЕС Сенбоку (Senboku Natural Gas)", coords: [34.5300, 135.4200], role: "СПГ електростанція", cap: "1.1 ГВт", type: "Газова ТЕС" },
            { name: "ТЕС Торісіма (Torishima Power)", coords: [34.6700, 135.4300], role: "Газотурбінна когенераційна ТЕС", cap: "0.15 ГВт", type: "ТЕС" }
        ]
    },
    {
        id: "tokyogas",
        name: "Tokyo Gas",
        color: "#0066ff",
        plants: [
            { name: "ТЕС Огісіма (Ogishima Power)", coords: [35.5000, 139.7500], role: "Парогазова ТЕС", cap: "1.2 ГВт", type: "Газова ТЕС" },
            { name: "ТЕС Содеґаура (Sodegaura Power)", coords: [35.4300, 139.9500], role: "СПГ ТЕС у префектурі Тіба", cap: "1.0 ГВт", type: "Газова ТЕС" }
        ]
    },
    {
        id: "eneos",
        name: "ENEOS Power",
        color: "#ff6699",
        plants: [
            { name: "ТЕС Негісі (Negishi Power Plant)", coords: [35.4300, 139.6500], role: "Когенераційна ТЕС при НПЗ", cap: "0.4 ГВт", type: "ТЕС" },
            { name: "ТЕС Мідусіма (Mizushima Power)", coords: [34.5000, 133.7200], role: "Промислова ТЕС у префектурі Окаяма", cap: "0.3 ГВт", type: "ТЕС" }
        ]
    }
];
