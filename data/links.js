// wine estate - restaurant links and restaurant - wine estate links
const wineEstate_restaurant_links =
[ 
    { 
        "id1": "silvermist", 
        "id2": "lacolombe"
    },
    {
        "id1": "grootconstantia",
        "id2": "jonkershuis"
    },
    {
        "id1": "grootconstantia",
        "id2": "simonsrestaurant"
    },
    {
        "id1": "steenbergvineyards",
        "id2": "bistro1682"
    },
    {
        "id1": "steenbergvineyards",
        "id2": "trynrestaurant"
    },
    {
        "id1": "durbanvillehills",
        "id2": "thetangramrestaurant"
    },
    {
        "id1": "capepointvineyards",
        "id2": "capepointvineyardsrestaurant"
    }
];

const restaurant_wineEstate_links =
[
    { 
        "id1": "lacolombe", 
        "id2": "silvermist" 
    },
    {
        "id1": "jonkershuis",
        "id2": "grootconstantia"
    },
    {
        "id1": "simonsrestaurant",
        "id2": "grootconstantia"
    },
    {
        "id1": "bistro1682",
        "id2": "steenbergvineyards"
    },
    {
        "id1": "tryrestaurant",
        "id2": "steenbergvineyards"
    },
    {
        "id1": "thetangramrestaurant",
        "id2": "durbanvillehills"
    },
    {
        "id1": "capepointvineyardsrestaurant",
        "id2": "capepointvineyards"
    }
];

// wine estate - musea links and musea - wine estate links
const wineEstate_musea_links =
[
    {
        "id1": "grootconstantia",
        "id2": "izikomuseum"
    }
];

const musea_wineEstate_links =
[
    {
        "id1": "izikomuseum",
        "id2": "grootconstantia"
    }
];

// all links
const links = 
[
    wineEstate_restaurant_links, 
    restaurant_wineEstate_links,
    wineEstate_musea_links,
    musea_wineEstate_links
];