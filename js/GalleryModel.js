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
                        "thumb": "../styles/img/thumb/1.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/1/1.png",
                                "description": "Версия 1"
                            },
                            {
                                "src": "../styles/img/preview/1/2.png",
                                "description": "Версия 2"
                            }
                        ]
                    },
                    {
                        "title": "Кабинет пользователя",
                        "description": "Страница пользователя",
                        "thumb": "../styles/img/thumb/2.png",
                        "preview": [{"src": "../styles/img/preview/2/1.png"}]
                    },
                    {
                        "title": "Интернет-магазин Zagerz",
                        "description": "Онлайн-продажа розничных товаров",
                        "thumb": "../styles/img/thumb/3.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/3/1.png"
                            },
                            {
                                "src": "../styles/img/preview/3/2.png"
                            },
                            {
                                "src": "../styles/img/preview/3/3.png"
                            }
                        ]
                    },
                    {
                        "title": "Deal@Day",
                        "description": "Скидки на бытовые услуги",
                        "thumb": "../styles/img/thumb/4.png",
                        "preview": [{"src": "../styles/img/preview/4/1.png"}]
                    },
                    {
                        "title": "Натяжные потолки",
                        "description": "Сайт для рязанской строительной компании",
                        "thumb": "../styles/img/thumb/5.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/5/1.png"
                            },
                            {
                                "src": "../styles/img/preview/5/2.png"
                            },
                            {
                                "src": "../styles/img/preview/5/4.png"
                            },
                            {
                                "src": "../styles/img/preview/5/5.png"
                            },
                            {
                                "src": "../styles/img/preview/5/6.png"
                            },
                            {
                                "src": "../styles/img/preview/5/7.png"
                            },
                            {
                                "src": "../styles/img/preview/5/8.png"
                            }
                        ]
                    },
                    {
                        "title": "Артгалерея Amsterdam",
                        "description": "Онлайн-продажа картин",
                        "thumb": "../styles/img/thumb/6.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/6/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Лендинг Лежачий полицейский",
                        "description": "Производство и продажа дорожных покрытий",
                        "thumb": "../styles/img/thumb/7.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/7/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Автосервис Avtomirror",
                        "description": "Услуги по ремонту автомобилей",
                        "thumb": "../styles/img/thumb/8.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/8/1.png"
                            },
                            {
                                "src": "../styles/img/preview/8/2.png"
                            },
                            {
                                "src": "../styles/img/preview/8/3.png"
                            }
                        ]
                    },
                    {
                        "title": "The Green Crowd",
                        "description": "Сайт для общества защиты природы",
                        "thumb": "../styles/img/thumb/9.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/9/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Скидочник Deal-a-Day",
                        "description": "Акции&Скидки",
                        "thumb": "../styles/img/thumb/10.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/10/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Art Gallery",
                        "description": "Интернет-магазин картин художников России",
                        "thumb": "../styles/img/thumb/11.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/11/1.png"
                            },
                            {
                                "src": "../styles/img/preview/11/2.png"
                            },
                            {
                                "src": "../styles/img/preview/11/3.png"
                            }
                        ]
                    },
                    {
                        "title": "YarnBox для вязальщиц",
                        "description": "Подписка на рассылку рекламных образцов пряжи",
                        "thumb": "../styles/img/thumb/12.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/12/1.png",
                                "description": "Версия 1"
                            },
                            {
                                "src": "../styles/img/preview/12/2.png",
                                "description": "Версия 2"
                            }
                        ]
                    },
                    {
                        "title": "Кинопоиск",
                        "description": "Онлайн-киноафиша",
                        "thumb": "../styles/img/thumb/13.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/13/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Банкет 360",
                        "description": "Бесплатный подбор банкетныз залов в Москве",
                        "thumb": "../styles/img/thumb/14.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/14/1.png"
                            },
                            {
                                "src": "../styles/img/preview/14/2.png"
                            },
                            {
                                "src": "../styles/img/preview/14/3.png"
                            }
                        ]
                    },
                    {
                        "title": "LovestonedLA",
                        "description": "Интернет-магазин ювелирных изделий",
                        "thumb": "../styles/img/thumb/15.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/15/1.png"
                            },
                            {
                                "src": "../styles/img/preview/15/2.png"
                            }
                        ]
                    },
                    {
                        "title": "2Day Time to act!",
                        "description": "Качественная продукция для украинских райдеров от отечественного производителя",
                        "thumb": "../styles/img/thumb/16.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/16/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Planet Best Games",
                        "description": "Играй в лучшие 2000 игр!",
                        "thumb": "../styles/img/thumb/17.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/16/1.png"
                            },
                            {
                                "src": "../styles/img/preview/16/2.png"
                            }
                        ]
                    },
                    {
                        "title": "Ресторан Смачного",
                        "description": "Блюда, блюда, блюда - сайт в картинках",
                        "thumb": "../styles/img/thumb/18.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/18/1.png"
                            },
                            {
                                "src": "../styles/img/preview/18/2.png"
                            },
                            {
                                "src": "../styles/img/preview/18/3.png"
                            }
                        ]
                    },
                    {
                        "title": "Festive: банкетные залы Москвы",
                        "description": "Ресурс для поиска банкетного зала из более 2000 вариантов",
                        "thumb": "../styles/img/thumb/19.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/19/1.png"
                            }
                        ]
                    },
                    {
                        "title": "2Day для райдеров",
                        "description": "Внутренняя страница спортивного сайта",
                        "thumb": "../styles/img/thumb/20.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/20/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Devices Smart House",
                        "description": "Устройства дистанционного управления домом",
                        "thumb": "../styles/img/thumb/21.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/21/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Горстрой",
                        "description": "Сайт для строительной компании",
                        "thumb": "../styles/img/thumb/22.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/22/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Туризм",
                        "description": "Внутренняя страница о Бразилии",
                        "thumb": "../styles/img/thumb/25.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/25/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Zalora Stile",
                        "description": "Интернет-магазин одежды и аксессуаров",
                        "thumb": "../styles/img/thumb/30.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/30/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Holag",
                        "description": "Онлайн-продажа эко-продуктов от производителя",
                        "thumb": "../styles/img/thumb/23.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/23/1.png"
                            },
                            {
                                "src": "../styles/img/preview/23/2.png"
                            }
                        ]
                    },
                    {
                        "title": "Farm Bussines",
                        "description": "Продукты и услуги от фермеров",
                        "thumb": "../styles/img/thumb/24.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/24/1.png"
                            }
                        ]
                    },
                    {
                        "title": "ТУРизм",
                        "description": "Сайт для подбора туров",
                        "thumb": "../styles/img/thumb/32.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/32/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Diving Planet",
                        "description": "Все о путешествиях",
                        "thumb": "../styles/img/thumb/29.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/29/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Парфюмерия и косметика",
                        "description": "Интернет-магазин",
                        "thumb": "../styles/img/thumb/28.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/28/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Wedding Service",
                        "description": "Лендинг для свадебного агентства",
                        "thumb": "../styles/img/thumb/26.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/26/1.png"
                            }
                        ]
                    },
                    {
                        "title": "Mamika",
                        "description": "Детский интернет-магазин",
                        "thumb": "../styles/img/thumb/33.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/33/1.png"
                            },
                            {
                                "src": "../styles/img/preview/33/2.png"
                            },
                            {
                                "src": "../styles/img/preview/33/3.png"
                            }
                        ]
                    },
                    {
                        "title": "Интернет-магазин Style",
                        "description": "Стильные подарки для взрослых и детей",
                        "thumb": "../styles/img/thumb/27.png",
                        "preview": [
                            {
                                "src": "../styles/img/preview/27/1.png"
                            }
                        ]
                    }
                ]
            }
        });
    }
);

