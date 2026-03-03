const sectionsData = [
    {
        'category': 'Immo',
        'links': [
            {
                'text': 'ImmoAfrika',
                'url': 'https://www.immoafrika.de/nl-be/gordons-bay/western-cape/zuid-afrika/'
            },
            {
                'text': 'JamesEdition',
                'url': 'https://www.jamesedition.com/real_estate/gordons-bay-central-south-africa'
            },
            {
                'text': 'Pam Golding',
                'url': 'https://www.pamgolding.co.za/property-search/properties-for-sale-gordons-bay/2160/'
            },
            {
                'text': 'PrimeLocation',
                'url': 'https://www.primelocation.com/overseas/property/south-africa/western-cape/gordons-bay/'
            },
            {
                'text': 'Private Property',
                'url': 'https://www.privateproperty.co.za/for-sale/'
            },
            {
                'text': 'Properstar',
                'url': 'https://www.properstar.be/zuid-afrika/koop/'
            },
            {
                'text': 'property24',
                'url': 'https://www.property24.com/for-sale/gordons-bay/western-cape/395/'
            },
            {
                'text': 'Property.CoZa',
                'url': 'https://www.propertycoza.com/'
            },
            {
                'text': 'Rawson',
                'url': 'https://rawson.co.za/property/for-sale/gordons-bay/'
            },
            {
                'text': 'RE/MAX',
                'url': 'https://www.remax.co.za/property-for-sale-south-africa/western-cape/gordons-bay/'
            },
            {
                'text': 'SA Hometraders',
                'url': 'https://www.sahometraders.co.za/property-for-sale-in-gordons-bay-c395/'
            },
            {
                'text': 'Seef property Group',
                'url': 'https://www.seeff.com/results/residential/for-sale/gordons-bay/'
            }
        ]
    },
	{
		'category': 'Wine estates @ Helderberg',
		'links': [] // Alto, Vergelegen, Lourensford, Audacia en Morgenster
		/*
Vergelegen Wine Estate – Historisch en populair estate.
Waterkloof Wine Estate – Wijnen met uitzicht over False Bay.
Lourensford Wine Estate – Wijnproeverij + restaurant.
Morgenster Estate – Bekend om elegante wijnen en kunst.
Capelands Wine Farm & Guesthouse – Wijnen + gastenkamers.
Waterford Estate – Prachtige wijngaarden & proeverij.
Highberry Vineyards & Venue – Kleinschalig boutique estate.
Yonder Hill Wines – Rustieke proeverijlocatie.
Journey's End Winery & Vineyard – Klassieke wijnboerderij.
Taaibosch Wine Estate – Ambachtelijke wijngaard.
		*/
	},
	{
		'category': 'Wine estates @ Stellenbosch',
		'links': []
/*
Delaire Graff Estate – Superster wijnhuis met uitzichten.
Rust en Vrede Wine Estate – Klassieke Stellenbosch-wijnen.
Lanzerac Wine Estate – Historisch estate met restaurant.
Stellenbosch Vineyards Wine Farm – Traditionele wijnboerderij.
Stellenrust Wine Estate – Bekend om Bordeaux-stijl blends.
Jordan Wine Estate – Premium estate in Stellenbosch-kloof.
Kleine Zalze Wine Estate – Mooi gelegen met restaurant.
Stellenzicht Wines – Rustige & vriendelijke proeverij.
Spier Wine Tasting – Grote wijnboerderij met activiteiten.
Stellenbosch Hills – Klein estate met karakter.
*/
	},
    {
        'category': 'Wine estates @ Franschhoek',
        'links': [
            {
                'text': 'Colmant',
                'url': 'https://colmant.co.za/'
            }
        ]
/*
Holden Manz Wine Estate – Elegant estate met proeverij.
Haute Cabrière – Bekend om Chardonnay & Pinot Noir.
La Motte Wine Farm – Iconische Franschhoek‑wijnen.
Maison Estate – Rustiek en stijlvol estate.
Chamonix Wine Farm – Traditioneel Franschhoek‑estate.
Dieu Donné Vineyards Cellar & Tasting Room – Proeverij in vallei.
La Bri Wine Estate – Klein estate met karakter.
Rickety Bridge Estate – Historische wijnboerderij.
Eikehof Wines – Gemoedelijk Franschhoek‑wijnhuis.
Le Lude Estate and Orangerie Restaurant – Estate + restaurant ervaring.
*/
    },
	{
		'category': 'Wine estates @ Paarl',
		'links': []
/*
Nederburg Wines – Eén van de grootste wine producers in ZA.
Fairview Wine and Cheese – Wijn + kaasproeverij.
Spice Route Destination – Diverse proefervaring met wijn.
Laborie Wine Estate – Klassieke Paarl-wijnen.
Vendôme Wine Estate – Boutique estate in Paarl.
Bacco Estate Winery – Charmant familie‑wine estate.
Simonsvlei Wines – Proeverij op oude boerderij.
Under Oaks Estate – Rustieke wijnboerderij.
Avondale Wine – Kleinschalig quality wijnhuis.
Rhebokskloof Estate – Klassiek Paarl-estate
*/
	}
]

/*
Wijnestates – Wijnstijlen, Proeverijen, Foodpairing & Beste Seizoenen
Gemeente	Wijn Estate	Kenmerkende Wijnstijlen	Proeverij & Food / Lunch Opties	Beste Seizoenen om te Bezoeken
Helderberg	Vergelegen	Chenin Blanc, Bordeaux‑stijl	Proeverij + lunch	Lente (sep‑nov), Herfst/Oogst (mrt‑mei)
	Waterkloof	Biodynamisch Sauvignon Blanc, Rosé	Proeverij met uitzichten	Lente / Herfst
	Lourensford	Sauvignon Blanc, Shiraz	Proeverij & estate‑restaurant	Lente / Zomer (dec‑feb)
	Morgenster	Pinotage, Cabernet	Classic tasting	Lente / Herfst
	Capelands	Shiraz, Chenin Blanc	Tasting + lunch	Lente / Herfst
	Waterford	Chenin, MCC, Cabernet	Chocolade‑wijn pairing	Lente / Herfst
	Highberry	Pinotage, Chenin	Boutique tasting	Lente / Herfst
	Yonder Hill	Lokale wijnen	Proeverij	Lente / Herfst
	Journey’s End	Sauvignon blanc, Shiraz	Classic tasting + lunch	Lente / Herfst
	Taaibosch	Chenin, Cabernet	Proeverij	Lente / Herfst
Stellenbosch	Delaire Graff	Bordeaux blends, MCC	Restaurant pairing & proeverij	Lente (sep‑nov), Herfst/Oogst (mrt‑mei)
	Rust en Vrede	Shiraz, Cabernet Sauvignon	Volle rode wijnen + lunch	Lente / Herfst
	Lanzerac	Shiraz, Cab Sauvignon	Proeverij + lunch	Lente / Herfst
	Stellenbosch Vineyards	Pinotage, Chardonnay	Proeverij	Lente / Herfst
	Stellenrust	Chenin Blanc, Shiraz	Tasting	Lente / Herfst
	Jordan	Sauvignon / Merlot blends	Proeverij + food pairing	Lente / Herfst
	Kleine Zalze	Chenin, MCC	Proeverij + lunch	Lente / Herfst
	Stellenzicht	Pinotage, Cabernet	Tasting	Lente / Herfst
	Spier Wine Farm	Chenin Blanc, Pinotage	Wijn & kaas/charcuterie pairing	Lente / Herfst
	Stellenbosch Hills	Sauvignon, Cabernet	Proeverij	Lente / Herfst
Franschhoek	Holden Manz	Pinot Noir, Chardonnay	Proeverij + lunch	Lente (sep‑nov), Herfst (mrt‑mei)
	Haute Cabrière	Chardonnay & Pinot Noir, Cap Classique	Proeverij + pairing	Lente / Herfst
	La Motte	Sauvignon Blanc, Chardonnay	Restaurant + proeverij	Lente / Herfst
	Maison Estate	Chenin, Shiraz	Proeverij & lunch	Lente / Herfst
	Chamonix	Shiraz, Rhône blends	Tasting	Lente / Herfst
	Dieu Donné	Pinotage, Cabernet	Proeverij	Lente / Herfst
	La Bri Estate	Chenin Blanc	Proeverij	Lente / Herfst
	Rickety Bridge	Chenin Blanc, Pinotage	Tasting + dining	Lente / Herfst
	Eikehof Wines	Cabernet, Shiraz	Proeverij	Lente / Herfst
	Le Lude Estate	MCC, Chardonnay	Proeverij + lunch	Lente / Herfst
Paarl	Nederburg	Shiraz, Chenin, Cabernet	Canapés & pairing	Lente (sep‑nov), Herfst (mrt‑mei)
	Fairview	Chenin Blanc, Cabernet	Kaaspairing	Lente / Herfst
	Spice Route	Shiraz, Chenin	Proeverij + eten	Lente / Herfst
	Laborie	Shiraz, Chenin Blanc	Proeverij	Lente / Herfst
	Vendôme	Pinotage, Cabernet	Tasting	Lente / Herfst
	Bacco Estate	Italiaanse stijl wijnen	Proeverij + lunch	Lente / Herfst
	Simonsvlei	Chenin, Shiraz	Tasting	Lente / Herfst
	Under Oaks	Cabernet, Shiraz	Proeverij	Lente / Herfst
	Avondale	Chenin Blanc, Sauvignon	Boutique tasting	Lente / Herfst
	Rhebokskloof	Shiraz, Chenin	Proeverij	Lente / Herfst
*/