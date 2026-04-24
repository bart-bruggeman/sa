const foodAndDrinksData = 
{
    "type": "category",
    "name": "Food and Drinks",
    "sortOnSubcategoryNames": true,
    "sortOnGroupNames": false, // when false: force order of groups as occurence, so the order is from Tavern & Casual Dining to Luxury Dining
    "showAreaOnSubcategoryNames": true, // when true: area names are sorted, filtered and added between brackets after subcategory name"
    "items":
    [
        {
            "type": "subcategory",
            "name": "Cape Town",
            "items":
            [
                {
                    "type": "group",
                    "name": "Tavern & Casual Dining",
                    "items":
                    [
                        {
                            "id": "jonkershuis",
                            "type": "data",
                            "name": "Jonkershuis Restaurant",
                            "area": "Constantia",
                            "coordinates": "-34.030414630792215, 18.418986348595567",
                            "phone": "+27 21 794 6255",
                            "email": "info@jhuis.co.za",
                            "url": "https://jonkershuisconstantia.co.za/",
                            "hours":
                            [
                                "Mon - Sat: 08:00 - 21:00",
                                "Sun: 08:00 - 17:00"
                            ]
                        },
                        {
                            "id": "simonsrestaurant",
                            "type": "data",
                            "name": "Simon's Restaurant",
                            "area": "Constantia",
                            "coordinates": "-34.031161506955975, 18.417731074807826",
                            "phone": "+27 21 794 1143",
                            "email": "info@simons.co.za",
                            "url": "https://simons.co.za/"
                        },
                        {
                            "type": "data",
                            "name": "Den Anker",
                            "area": "Waterfront",
                            "address": "Shop 1, 2 Dock Road, V&A Waterfront, Cape Town, 8001, Western Cape, South Africa",
                            "coordinates": "-33.90590347998938, 18.421133952788676",
                            "phone": "+27 21 419 0249",
                            "email": "madam@denanker.co.za",
                            "url": "https://denanker.co.za/",
                            "hours": "Mon - Sun: 08:00 - 22:30"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Casual Fine Dining",
                    "items":
                    [
                        {
                            "id": "bistro1682",
                            "type": "data",
                            "name": "Bistro 1682 Restaurant",
                            "area": "Constantia",
                            "phone": "+27 21 205 3866",
                            "url": "https://steenbergfarm.com/bistro1682-cape-town-contemporary-restaurant/",
                            "hours":
                            [
                                "Mon - Sun:",
                                "09:00 - 11:00 (breakfast)",
                                "12:00 - 15:00 (lunch)",
                                "17:00 - 22:00 (dinner)"
                            ]
                        },
                        {
                            "id": "trynrestaurant",
                            "type": "data",
                            "name": "Tryn Restaurant",
                            "area": "Constantia",
                            "phone": "+27 21 713 7178",
                            "email": "info@tryn.co.za",
                            "url": "https://steenbergfarm.com/tryn-cape-town-contemporary-restaurant/",
                            "hours":
                            [
                                "Mon - Sun:",
                                "08:00 - 11:00 (breakfast)",
                                "12:00 - 15:00 (lunch)",
                                "18:00 - 22:00 (dinner)"
                            ]
                        },
                        {
                            "id": "capepointvineyardsrestaurant",
                            "type": "data",
                            "name": "Cape Point Vineyards Restaurant",
                            "area": "Noordhoek",
                            "hours":
                            [
                                "Sun - Thu: 12:00 - 16:00",
                                "Sat: 12:00 - 19:00"
                            ]
                        },
                        {
                            "type": "data",
                            "name": "Ouzeri",
                            "area": "City Bowl",
                            "info": "Ouzeri is a vibrant Turkish restaurant known for its authentic flavors and warm atmosphere. It offers a delightful selection of mezze, kebabs, and other traditional Turkish dishes.",
                            "address": "789 Ouzeri Street, Cape Town, 8000, South Africa",
                            "coordinates": "-33.92549199999999, 18.424855999999996",
                            "phone": "+27 21 345 6789",
                            "email": "info@ouzeri.co.za",
                            "url": "https://www.ouzeri.co.za/"
                        },
                        {
                            "type": "data",
                            "name": "Seebamboes",
                            "area": "City Bowl",
                            "mode": "hot",
                            "info": "Seebamboes is a fine dining restaurant offering a unique culinary experience focused on local ingredients and flavors. The menu combines traditional and contemporary dishes, highlighting the diversity of South African cuisine.",
                            "address": "99 Harrington Street, District Six, Cape Town, 7925, Western Cape, South Africa",
                            "coordinates": "-33.928873655180986, 18.423213313198147",
                            "phone": "+27 66 387 0264",
                            "email": "eat@seebamboescpt.co.za",
                            "url": "https://www.seebamboes.co.za/"
                        },
                        {
                            "type": "data",
                            "name": "Galjoen",
                            "area": "City Bowl",
                            "mode": "hot",
                            "info": "Galjoen is a fine dining restaurant offering a sophisticated culinary experience that combines local and international flavors. The menu emphasizes fresh, seasonal ingredients. Its elegant setting and attentive service make it a popular choice for special occasions.",
                            "address": "99 Harrington Street, District Six, Cape Town, 7925, Western Cape, South Africa",
                            "coordinates": "-33.928873655180986, 18.423213313198147",
                            "phone": "+27 79 093 0559",
                            "email": "eat@galjoencpt.co.za",
                            "url": "https://www.galjoenrestaurant.co.za/"
                        },
                        {
                            "type": "data",
                            "name": "Belly of the Beast",
                            "area": "City Bowl",
                            "mode": "hot",
                            "info": "Belly of the Beast is a modern fine dining restaurant known for its innovative, experimental cuisine. It offers a unique dining experience where food and art come together, with creatively presented dishes. The menu often highlights local ingredients in surprising ways.",
                            "address": "110 Harrington St, Cape Town City Centre, Cape Town, 8000, South Africa",
                            "coordinates": "-33.92921732316343, 18.42260606715842",
                            "phone": "+27 76 220 5458",
                            "email": "eat@bellyofthebeast.co.za",
                            "url": "https://www.bellyofthebeast.co.za/"
                        },
                        {
                            "type": "data",
                            "name": "The Test Kitchen Fledgelings",
                            "area": "Woodstock",
                            "info": "The Test Kitchen Fledgelings is a high-end dining establishment known for its exceptional culinary offerings and sophisticated atmosphere. It features a diverse menu that showcases the best of contemporary cuisine, utilizing only the finest ingredients.",
                            "address": "123 Test Street, Cape Town, 8000, South Africa",
                            "coordinates": "-33.92475599999999, 18.424057999999998",
                            "phone": "+27 21 123 4567",
                            "email": "info@thetestkitchencarbon.co.za",
                            "url": "https://ttkfledgelings.co.za/gallery/"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Classic Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Beyond",
                            "area": "Constantia"
                        },
                        {
                            "type": "data", 
                            "name": "Salsify",
                            "area": "Camps Bay"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Modern Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "FYN",
                            "area": "City Bowl"
                        },
                        {
                            "type": "data", 
                            "name": "The Waterside",
                            "area": "Waterfront"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Luxury Fine Dining",
                    "items":
                    [
                        {
                            "id": "lacolombe",
                            "type": "data",
                            "name": "La Colombe",
                            "displayName": "Restaurant La Colombe",
                            "mode": "hot",
                            "info": "La Colombe is an award-winning fine dining restaurant located on Silvermist Wine Estate at the top of Constantia Nek in Cape Town. Known for its innovative cuisine, the restaurant blends French techniques with Asian influences to create a unique and refined tasting experience.",
                            "address": "Silvermist Wine Estate, Main Road, Constantia Nek, Cape Town, 7806, Western Cape, South Africa",
                            "area": "Constantia",
                            "coordinates": "-34.014966041262085, 18.403281947858012",
                            "phone": "+27 21 794 2390",
                            "email": "reservations@lacolombe.co.za",
                            "url": "https://www.lacolombe.restaurant/la-colombe",
                            "hours":
                            [
                                "Mon - Sun:",
                                "12:00 - 14:00 (lunch)",
                                "18:00 - 21:00 (dinner)"
                            ]
                        }
                    ]
                }
            ]
        },
        {
            "type": "subcategory",
            "name": "Helderberg",
            "items":
            [
                {
                    "type": "group",
                    "name": "Tavern & Casual Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Talla's Tavern",
                            "area": "Gordon's Bay",
                            "address": "67 Beach Rd, Gordons Bay Central, Cape Town, 7151, South Africa",
                            "coordinates": "-34.15977126934993, 18.868541977909075",
                            "phone": "+27 21 856 3513",
                            "email": "wessel.tallas@gmail.com",
                            "url": "http://tallastavern.co.za/",
                            "hours":
                            [
                                "Mon: 09:15 - 22:00",
                                "Tue - Sat: 08:15 - 22:00",
                                "Sun: 08:15 - 21:00"
                            ]
                        },
                        {
                            "type": "data", 
                            "name": "The Thirsty Oyster Tavern",
                            "area": "Gordon's Bay",
                            "address": "Old Harbour, 156 Beach Road, Helderberg Rural, Cape Town, 7140, Western Cape, South Africa",
                            "coordinates": "-34.16433657957473, 18.860064938359802",
                            "phone": "+27  21 856 4457",
                            "email": "info@thirstyoyster.co.za",
                            "url": "https://www.thirstyoyster.co.za/",
                            "hours": "Mon - Sun: 11:00 - 02:00"
                        },
                        {
                            "type": "data", 
                            "name": "Café Zest",
                            "area": "Gordon's Bay",
                            "address": "75 Beach Rd, Gordons Bay Central, Cape Town, 7151, South Africa",
                            "coordinates": "-34.16027732262559, 18.868246886507606",
                            "phone": "+27 21 200 2605",
                            "url": "https://zestdining.co.za/",
                            "hours":
                            [
                                "Tue - Sat: 12:00 - 22:00",
                                "Sun: 12:00 - 21:00"
                            ]
                        },
                        {
                            "type": "data",
                            "name": "The Waffle Cafe",
                            "area": "Gordon's Bay",
                            "address": "33 Beach Rd, Gordons Bay Central, Cape Town, 7140, South Africa",
                            "coordinates": "-34.156937725885335, 18.86820917211051",
                            "phone": "+27 79 308 6895",
                            "hours": "Mon - Sun: 09:30 - 17:30"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Casual Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Chorus",
                            "area": "Strand"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Classic Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Cavalli",
                            "area": "Somerset West"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Modern Fine Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Luxury Fine Dining",
                    "items":
                    [
                        {
                            "type": "data",
                            "name": "The Restaurant at Waterkloof",
                            "area": "Somerset West",
                            "info": "The Restaurant at Waterkloof is a prestigious fine dining establishment located in Cape Town, South Africa. It offers a unique culinary experience with a focus on contemporary cuisine, utilizing locally sourced ingredients to create innovative and flavorful dishes.",
                            "address": "Waterkloof Estate, 1 Waterkloof Road, Cape Town, 7945, Western Cape, South Africa",
                            "coordinates": "-33.92712399999999, 18.425456999999995",
                            "phone": "+27 21 456 7890",
                            "email": ""
                        }
                    ]
                }
            ]
        },
        {
            "type": "subcategory",
            "name": "Stellenbosch",
            "items":
            [
                {
                    "type": "group",
                    "name": "Tavern & Casual Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Casual Fine Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Classic Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Rust en Vrede"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Modern Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Dusk"
                        },
                        {
                            "id": "thetangramrestaurant",
                            "type": "data",
                            "name": "The Tangram Restaurant",
                            "hours":
                            [
                                "Mon - Sun:",
                                "08:30 - 11:00 (breakfast)",
                                "12:00 - 15:00 (lunch)",
                                "Mon - Sat: 18:00 - 23:00 (dinner)"
                            ]
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Luxury Fine Dining",
                    "items":
                    [
                        {
                            "type": "data",
                            "name": "Jordan Restaurant",
                            "info": "Jordan Restaurant is a renowned fine dining establishment offering an exquisite culinary experience. Known for its elegant ambiance and exceptional service, it features a carefully curated menu that highlights the best of both local and international flavors.",
                            "address": "456 Jordan Avenue, Cape Town, 8000, South Africa",
                            "coordinates": "-33.92512399999999, 18.424456999999997",
                            "phone": "+27 21 234 5678",
                            "email": "info@jordanrestaurant.co.za",
                            "url": "https://www.jordanrestaurant.co.za/"
                        }
                    ]
                }
            ]
        },
        {
            "type": "subcategory",
            "name": "Franschhoek",
            "items":
            [
                {
                    "type": "group",
                    "name": "Tavern & Casual Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Casual Fine Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Classic Fine Dining",
                    "items":
                    [
                    ]
                },
                {
                    "type": "group",
                    "name": "Modern Fine Dining",
                    "items":
                    [
                        {
                            "type": "data", 
                            "name": "Epice"
                        },
                        {
                            "type": "data", 
                            "name": "La Petite Colombe"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Luxury Fine Dining",
                    "items":
                    [
                    ]
                }
            ]
        },
        {
            "type": "subcategory",
            "name": "Paarl",
            "items":
            [
                {
                    "type": "group",
                    "name": "Tavern & Casual Dining",
                    "items":
                    [
                        {
                            "type": "data",
                            "name": "Kapstadt Brauhaus",
                            "address": "90A Main Road, Hoog-en-Droog, Paarl, 7646, South Africa",
                            "coordinates": "-33.39224351557837, 18.880993484227567",
                            "phone": "+27 60 355 4633",
                            "email": "paarl@kapstadtbrauhaus.co.za",
                            "url": "https://www.kapstadtbrauhaus.co.za/stores-paarl",
                            "hours":
                            [
                                "Fri - Sat: 11:00 - 00:00",
                                "Sun - Thu: 11:00 - 23:00"
                            ]
                        },
                        {
                            "type": "data",
                            "name": "Back's Restaurant",
                            "address": "Erf 778 Val de Vie Boulevard, Paarl, 7646, Western Cape, South Africa",
                            "coordinates": "-33.80425298409359, 18.968291371164057",
                            "phone": "+27 21 300 6993",
                            "email": "hello@backs.co.za",
                            "url": "https://www.backs.co.za/",
                            "hours":
                            [
                                "Mon - Fri: 08:00 - 18:00",
                                "Sat - Sun: 09:00 - 14:00"
                            ]
                        },
                        {
                            "type": "data",
                            "name": "Cattle Baron Paarl",
                            "address": "Pontac Manor Estate, 16 Zion Street, Hoog-en-Droog, Paarl, 7646, Western Cape, South Africa",
                            "coordinates": "-33.74150545476523, 18.96010519999999",
                            "phone": "+27 21 872 5577",
                            "email": 
                            [
                                "paarlbistro@cattlebaron.co.za",
                                "info@cattlebaronpaarl.co.za"
                            ],
                            "url": "https://cattlebaronpaarl.co.za/",
                            "hours":
                            [
                                "Mon - Thu: 12:00 - 22:00",
                                "Fri: 12:00 - 22:30",
                                "Sat: 17:00 - 22:30",
                                "Sun: 12:00 - 21:00"
                            ]
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Casual Fine Dining",
                    "items":
                    [
                        {
                            "type": "data",
                            "name": "Salmon & Brine",
                            "address": "Vendôme Wine Farm, Arboretum Avenue, Paarl, 7620, Western Cape, South Africa",
                            "coordinates": "-33.75732520181869, 18.978623157671873",
                            "phone": "+27 64 681 8464",
                            "url": "https://salmonandbrine.co.za/",
                            "hours":
                            [
                                "Mon - Sat: 11:30 - 21:00",
                                "Sun: 11:30 - 16:00"
                            ]
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Classic Fine Dining",
                    "items":
                    [
                        {
                            "id": "faberrestaurant",
                            "type": "data",
                            "name": "FABER Restaurant",
                            "address": "FABER, Avondale Estate, Lustigan Road, Klein Drakenstein, Paarl, Western Cape, South Africa",
                            "coordinates": "-33.76466615164244, 19.000980996960596",
                            "phone": "+27 21 202 1219",
                            "email": "Faber@avondalewine.co.za",
                            "url": "https://avondalewine.co.za/faber/",
                            "hours":
                            [
                                "Wed - Sun: 12:30 - 16:00 (lunch)",
                                "Thu - Sat: 18:00 - 21:00 (dinner)"
                            ]
                        },
                        {
                            "type": "data",
                            "name": "Grand Roche Restaurant",
                            "address": "1 Plantasie St, Paarl, 7646, South Africa",
                            "coordinates": "-33.75116892691979, 18.95899352883532",
                            "phone": "+27 21 863 5100",
                            "email": 
                            [
                                "info@granderoche.co.za",
                                "restaurant@granderoche.co.za",
                                "events@granderoche.co.za"
                            ],
                            "url": "https://granderoche.com/grande-roche-restaurant/",
                            "hours": "Mon - Sun: 08:00 - 21:00"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Modern Fine Dining",
                    "items":
                    [
                        {
                            "type": "data",
                            "name": "Noop Restaurant",
                            "address": "127 Main Rd, Vrykyk, Paarl, 7624, South Africa",
                            "coordinates": "-33.752132163873696, 18.962197496960204",
                            "phone": "+27 21 863 3925",
                            "email": "info@noop.co.za",
                            "url": "https://www.noop.co.za/",
                            "hours": "Mon - Sat: 12:00 - 23:30"
                        }
                    ]
                },
                {
                    "type": "group",
                    "name": "Luxury Fine Dining",
                    "items":
                    [
                    ]
                }
            ]
            
        }
    ]
}
