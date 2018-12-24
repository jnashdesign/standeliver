let restaurants: Array<any> = [
    {
        id: 1,
        address: "Section A",
        city: "Arlington",
        state: "TX",
        zip: "76001",
        title: "Sausage Supreme",
        long: -97.0945991,
        lat: 32.7478761,
        picture: "assets/img/restaurants/restaurant01.jpg",
        thumbnail: "assets/img/restaurants/restaurant01sq.jpg",
        images: [
        	"assets/img/restaurants/restaurant01.jpg",
        	"assets/img/restaurants/restaurant03.jpg",
        	"assets/img/restaurants/restaurant05.jpg",
        	"assets/img/restaurants/restaurant07.jpg"
        ],
        tags: "Stadium Food",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus explicabo rem incidunt, sequi facilis hic corporis rerum ea in dolorum tempore, a quod quae nostrum voluptatem sint. Saepe, ut, autem!",
        label: "open",
        period: "none",
        price: "$$$",
        rating: 4.4,
        items: {
            id: 1,
            name: "Caroline Seymor",
            title: "Senior Broker",
            picture: "assets/img/items/caroline_seymor.jpg"
        },
	    reviews: [
	      {
	        id: 1,
	        username: "Oliver Bishop",
	        from: "Chesterfield, UK",
	        title: "Nice place, as long as you don't want to leave",
	        content: "The staff were very helpful in all ways, nothing was too much trouble. The bar had a fantastic happy hour being good nibbles and great value. One of my best restaurants.",
	        rating: 4
	      },
	      {
	        id: 2,
	        username: " Alejandro Suarez",
	        from: "Bogotá, CO",
	        title: "Close to old quarter",
	        content: "Nice items Staff very helpful. Easy to get cabs",
	        rating: 4
	      },
	      {
	        id: 3,
	        username: "Matt Doley",
	        from: "Cincinnati, US",
	        title: "Short stay",
	        content: "Restaurant reception staff speak limited English and not so friendly. Their dessert is not good enough.",
	        rating: 3
	      },
	      {
	        id: 4,
	        username: "Jorge Silva",
	        from: "São Paulo, BR",
	        title: "Disappointing and overpriced",
	        content: "Disappointing stay as the condition of the restaurant was the exact opposite of last restaurant, but the staff was helpful.",
	        rating: 2
	      }
	    ]
		},
		{
			id: 2,
			address: "Section D",
			city: "Arlington",
			state: "TX",
			zip: "02420",
			title: "Lorem Restaurant",
			long: -97.0944991,
			lat: 32.7478561,
			picture: "assets/img/restaurants/restaurant02.jpg",
			thumbnail: "assets/img/restaurants/restaurant02sq.jpg",
			images: [
				"assets/img/restaurants/restaurant02.jpg",
				"assets/img/restaurants/restaurant04.jpg",
				"assets/img/restaurants/restaurant06.jpg",
				"assets/img/restaurants/restaurant08.jpg"
			],
			tags: "Variable",
			description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus explicabo rem incidunt, sequi facilis hic corporis rerum ea in dolorum tempore, a quod quae nostrum voluptatem sint. Saepe, ut, autem!",
			label: "open",
			period: "none",
			price: "$$$$",
			rating: 5,
			items: {
					id: 1,
					name: "Caroline Seymor",
					title: "Senior Broker",
					picture: "assets/img/items/caroline_seymor.jpg"
			},
		reviews: [
			{
				id: 1,
				username: "Oliver Bishop",
				from: "Chesterfield, UK",
				title: "Nice place, as long as you don't want to leave",
				content: "The hotel staff were very helpful in all ways, nothing was too much trouble. The bar had a fantastic happy hour being good nibbles and great value. One of my best restaurants.",
				rating: 4
			},
			{
				id: 2,
				username: " Alejandro Suarez",
				from: "Bogotá, CO",
				title: "Close to old quarter",
				content: "Nice items Staff very helpful. Easy to get cabs",
				rating: 4
			},
			{
				id: 3,
				username: "Matt Doley",
				from: "Cincinnati, US",
				title: "Short stay",
				content: "Restaurant reception staff speak limited English and not so friendly. Their dessert is not good enough.",
				rating: 3
			},
			{
				id: 4,
				username: "Jorge Silva",
				from: "São Paulo, BR",
				title: "Disappointing and overpriced",
				content: "Disappointing stay as the condition of the restaurant was the exact opposite of last restaurant, but the staff was helpful.",
				rating: 2
			}
		]
	}
];

export default restaurants;
