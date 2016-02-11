define(
    "GalleryModel",
    ["jquery",
        "../../node_modules/underscore/underscore",
        "../../node_modules/backbone/backbone"],

    function($, _, Backbone) {

        return Backbone.Model.extend({
            defaults:
            {
                thumbs: [
                    {
                        "title": "Музыкальные футболки 2Day",
                        "description": "Лучшие прикольные футболки",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/1.png",
                        "preview": "../styles/img/preview/1.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Мой аккаунт",
                        "description": "Страница пользователя",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/2.png",
                        "preview": "../styles/img/preview/2.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Интернет-магазин Zagerz",
                        "description": "Онлайн-продажа розничных товаров",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/3.png",
                        "preview": "../styles/img/preview/3.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Deal@Day",
                        "description": "Скидки на бытовые услуги",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/4.png",
                        "preview": "../styles/img/preview/4.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Натяжные потолки",
                        "description": "Сайт для рязанской строительной компании",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/5.png",
                        "preview": "../styles/img/preview/5.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Артгалерея Amsterdam",
                        "description": "Онлайн-продажа картин",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/6.png",
                        "preview": "../styles/img/preview/6.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Лендинг Лежачий полицейский",
                        "description": "Производство и продажа дорожных покрытий",
                        "fullDescription": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum luctus leo id tempus laoreet. Mauris felis tellus, porttitor non lectus sed, consectetur tempor risus. Vestibulum eget massa euismod, luctus metus sit amet, placerat nunc. Proin varius mattis ultrices. Nam sed mi erat. Fusce tincidunt ac diam ut efficitur. Sed et scelerisque quam, vel viverra sem. Nunc in interdum augue. Sed tincidunt quis nulla ut porttitor. Quisque vel sapien nec leo feugiat auctor. Nulla facilisi.",
                        "thumb": "../styles/img/thumb/7.png",
                        "preview": "../styles/img/preview/7.png",
                        "website": "http://google.nl"
                    },
                    {
                        "title": "Автосервис Avtomirror",
                        "description": "Услуги по ремонту автомобилей",
                        "thumb": "../styles/img/thumb/8.png",
                        "preview": "../styles/img/preview/8.png"
                    },
                    {
                        "title": "The Green Crowd",
                        "description": "Сайт для общества защиты природы",
                        "thumb": "../styles/img/thumb/9.png",
                        "preview": "../styles/img/preview/9.png"
                    },
                    {
                        "title": "Скидочник Deal-a-Day",
                        "description": "Акции&Скидки",
                        "thumb": "../styles/img/thumb/10.png",
                        "preview": "../styles/img/preview/10.png"
                    },
                    {
                        "title": "Art Gallery",
                        "description": "Интернет-магазин картин художников России",
                        "thumb": "../styles/img/thumb/11.png",
                        "preview": "../styles/img/preview/11.png"
                    },
                    {
                        "title": "YarnBox для вязальщиц",
                        "description": "Подписка на рассылку рекламных образцов пряжи",
                        "thumb": "../styles/img/thumb/12.png",
                        "preview": "../styles/img/preview/12.png"
                    },
                    {
                        "title": "Кинопоиск",
                        "description": "Онлайн-киноафиша",
                        "thumb": "../styles/img/thumb/13.png",
                        "preview": "../styles/img/preview/13.png"
                    },
                    {
                        "title": "Музыкальные футболки 2Day",
                        "description": "Лучшие прикольные футболки",
                        "thumb": "../styles/img/thumb/14.png",
                        "preview": "../styles/img/preview/14.png"
                    },
                    {
                        "title": "LovestonedLA",
                        "description": "Интернет-магазин ювелирных изделий",
                        "thumb": "../styles/img/thumb/15.png",
                        "preview": "../styles/img/preview/15.png"
                    },
                    {
                        "title": "2Day Time to act!",
                        "description": "Качественная продукция для украинских райдеров от отечественного производителя",
                        "thumb": "../styles/img/thumb/16.png",
                        "preview": "../styles/img/preview/16.png"
                    },
                    {
                        "title": "Planet Best Games",
                        "description": "Играй в лучшие 2000 игр!",
                        "thumb": "../styles/img/thumb/17.png",
                        "preview": "../styles/img/preview/17.png"
                    },
                    {
                        "title": "Ресторан Смачного",
                        "description": "Блюда, блюда, блюда - сайт в картинках",
                        "thumb": "../styles/img/thumb/18.png",
                        "preview": "../styles/img/thumb/18.png"
                    },
                    {
                        "title": "Festive: банкетные залы Москвы",
                        "description": "Ресурс для поиска банкетного зала из более 2000 вариантов",
                        "thumb": "../styles/img/thumb/19.png",
                        "preview": "../styles/img/preview/19.png"
                    },
                    {
                        "title": "2Day для райдеров",
                        "description": "Внутренняя страница спортивного сайта",
                        "thumb": "../styles/img/thumb/20.png",
                        "preview": "../styles/img/preview/20.png"
                    },
                    {
                        "title": "Devices Smart House",
                        "description": "Устройства дистанционного управления домом",
                        "thumb": "../styles/img/thumb/21.png",
                        "preview": "../styles/img/preview/21.png"
                    },
                    {
                        "title": "Горстрой",
                        "description": "Сайт для строительной компании",
                        "thumb": "../styles/img/thumb/22.png",
                        "preview": "../styles/img/preview/22.png"
                    },
                    {
                        "title": "Holag",
                        "description": "Онлайн-продажа эко-продуктов от производителя",
                        "thumb": "../styles/img/thumb/23.png",
                        "preview": "../styles/img/preview/23.png"
                    },
                    {
                        "title": "Farm Bussines",
                        "description": "Продукты и услуги от фермеров",
                        "thumb": "../styles/img/thumb/24.png",
                        "preview": "../styles/img/preview/24.png"
                    },
                    {
                        "title": "Туризм",
                        "description": "Внутренняя страница о Бразилии",
                        "thumb": "../styles/img/thumb/25.png",
                        "preview": "../styles/img/preview/25.png"
                    },
                    {
                        "title": "Wedding Service",
                        "description": "Лендинг для свадебного агентства",
                        "thumb": "../styles/img/thumb/26.png",
                        "preview": "../styles/img/preview/26.png"
                    },
                    {
                        "title": "Интернет-магазин Style",
                        "description": "Стильные подарки для взрослых и детей",
                        "thumb": "../styles/img/thumb/27.png",
                        "preview": "../styles/img/preview/27.png"
                    },
                    {
                        "title": "Парфюмерия и косметика",
                        "description": "Интернет-магазин",
                        "thumb": "../styles/img/thumb/28.png",
                        "preview": "../styles/img/preview/28.png"
                    },
                    {
                        "title": "Caravan Project",
                        "description": "Внутренняя страница для сайта по проведению банкетов",
                        "thumb": "../styles/img/thumb/29.png",
                        "preview": "../styles/img/preview/29.png"
                    },
                    {
                        "title": "Zalora Stile",
                        "description": "Интернет-магазин одежды и аксессуаров",
                        "thumb": "../styles/img/thumb/30.png",
                        "preview": "../styles/img/preview/30.png"
                    }
                ]
            }
        });
    }
);

