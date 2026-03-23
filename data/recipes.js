/**
 * Recipe collection — edit this file to add meals. Open index.html in a browser
 * (or run: python3 -m http.server from this folder for fetch-free optional future use).
 *
 * For recipes with diet: "meat", set protein to one of:
 * chicken | fish | lamb | goat | pork | duck | shellfish | mixed
 */
window.RECIPES = [
  {
    id: "vietnamese-grilled-chicken-noodle-bowl",
    title: "Grilled Chicken Vietnamese Noodle Bowl",
    cuisine: "Vietnamese",
    diet: "meat",
    protein: "chicken",
    healthy: true,
    prepMinutes: 25,
    cookMinutes: 15,
    servings: 4,
    tags: ["grill", "noodles", "herbs"],
    householdNote:
      "Vegetarians: use firm tofu or tempeh in the same marinade (swap fish sauce for soy in marinade + dressing, or use vegan fish sauce).",
    ingredients: [
      { section: "Chicken & marinade", items: [
        "600 g boneless chicken thighs",
        "2 tbsp fish sauce",
        "1 tbsp soy sauce",
        "2 tbsp lime juice",
        "2 cloves garlic, minced",
        "1 tsp brown sugar",
        "1 tbsp neutral oil",
        "Black pepper"
      ]},
      { section: "Bowl", items: [
        "400 g dried rice vermicelli",
        "1 cucumber, julienned",
        "2 carrots, julienned or shredded",
        "Handful lettuce or mixed leaves",
        "Fresh mint, cilantro, and Thai basil (or regular basil)",
        "2 spring onions, sliced",
        "Optional: crushed peanuts or fried shallots"
      ]},
      { section: "Nuoc cham–style dressing", items: [
        "4 tbsp lime juice",
        "3 tbsp fish sauce",
        "2 tbsp brown sugar",
        "6 tbsp warm water",
        "1 small red chili, sliced (optional)",
        "1 clove garlic, finely grated (optional)"
      ]}
    ],
    steps: [
      "Slice chicken into strips or bite-sized pieces. Mix marinade ingredients, coat chicken, and rest 20 minutes (or up to 4 hours chilled).",
      "Soak vermicelli per packet directions until tender; drain and rinse under cold water.",
      "Grill or pan-fry chicken over medium-high heat until cooked through and lightly charred, about 4–5 minutes per side.",
      "Whisk dressing until sugar dissolves; taste and balance sour/salty/sweet.",
      "Divide noodles into bowls. Top with chicken, vegetables, and herbs. Pour dressing at the table."
    ]
  },
  {
    id: "tofu-vermicelli-bowl",
    title: "Tofu & Herb Vermicelli Bowl (Vietnamese-style)",
    cuisine: "Vietnamese",
    diet: "vegan",
    healthy: true,
    prepMinutes: 20,
    cookMinutes: 12,
    servings: 4,
    tags: ["tofu", "noodles"],
    householdNote: "Pairs well on the same night as the grilled chicken bowl — same noodles and dressing, different protein.",
    ingredients: [
      { section: "Tofu", items: [
        "500 g firm tofu, pressed and cubed",
        "2 tbsp soy sauce",
        "1 tbsp maple syrup or sugar",
        "1 tsp sesame oil",
        "Neutral oil for frying"
      ]},
      { section: "Serve with", items: [
        "Rice vermicelli, prepared as on packet",
        "Cucumber, carrot, lettuce, mint, cilantro, basil",
        "Dressing: lime, soy sauce, sugar, warm water, chili — same balance as nuoc cham"
      ]}
    ],
    steps: [
      "Toss tofu with soy, sweetener, and sesame oil. Pan-fry until golden.",
      "Prepare noodles and vegetables as for the chicken bowl.",
      "Make vegan dressing: 4 tbsp lime, 3 tbsp soy, 2 tbsp sugar, 6 tbsp water; adjust to taste.",
      "Assemble bowls and serve."
    ]
  },
  {
    id: "margherita-skillet-pizza",
    title: "Margherita Skillet Pizza",
    cuisine: "Italian",
    diet: "vegetarian",
    healthy: false,
    prepMinutes: 15,
    cookMinutes: 12,
    servings: 2,
    tags: ["pizza", "comfort"],
    householdNote: "Add sliced cooked chicken or pepperoni on half the pizza if some want meat.",
    ingredients: [
      { section: "", items: [
        "1 ball pizza dough (store-bought or homemade)",
        "150 ml tomato passata or crushed tomatoes",
        "150 g mozzarella, torn",
        "Fresh basil",
        "Olive oil, salt"
      ]}
    ],
    steps: [
      "Preheat oven to 240°C (or max). Oil a 26 cm ovenproof skillet.",
      "Stretch dough to fit the skillet; add sauce, salt, and mozzarella.",
      "Bake until crust is golden and cheese bubbles, about 10–12 minutes.",
      "Top with basil and a drizzle of olive oil."
    ]
  },
  {
    id: "chickpea-spinach-curry",
    title: "Chickpea & Spinach Curry",
    cuisine: "Indian",
    diet: "vegan",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 25,
    servings: 4,
    tags: ["curry", "legumes"],
    householdNote: "Serve with grilled chicken on the side for meat eaters.",
    ingredients: [
      { section: "", items: [
        "2 tbsp oil",
        "1 onion, diced",
        "3 cloves garlic, minced",
        "1 tbsp grated ginger",
        "2 tsp curry powder or garam masala",
        "400 g tin chickpeas, drained",
        "400 ml coconut milk",
        "200 g spinach",
        "Salt, lime or lemon juice"
      ]}
    ],
    steps: [
      "Sauté onion until soft. Add garlic, ginger, and spices; cook 1 minute.",
      "Add chickpeas and coconut milk; simmer 15 minutes.",
      "Stir in spinach until wilted. Season with salt and a squeeze of citrus."
    ]
  },
  {
    id: "grilled-salmon-quinoa",
    title: "Grilled Salmon with Lemon Quinoa",
    cuisine: "Mediterranean",
    diet: "meat",
    protein: "fish",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 20,
    servings: 4,
    tags: ["fish", "quinoa"],
    householdNote: "Replace salmon with halloumi or large mushrooms for vegetarians.",
    ingredients: [
      { section: "", items: [
        "4 salmon fillets",
        "Olive oil, salt, pepper, lemon",
        "200 g quinoa, rinsed",
        "400 ml vegetable stock",
        "Steamed greens or salad to serve"
      ]}
    ],
    steps: [
      "Cook quinoa in stock until fluffy; fluff with fork and add lemon zest.",
      "Oil and season salmon. Grill or pan-sear skin-side down first until cooked through.",
      "Serve salmon over quinoa with greens and lemon wedges."
    ]
  },
  {
    id: "black-bean-tacos",
    title: "Black Bean Tacos",
    cuisine: "Mexican",
    diet: "vegan",
    healthy: true,
    prepMinutes: 15,
    cookMinutes: 10,
    servings: 4,
    tags: ["tacos", "quick"],
    householdNote: "Offer shredded chicken or pork in a separate bowl for meat eaters.",
    ingredients: [
      { section: "", items: [
        "2 tbsp oil",
        "1 onion, diced",
        "2 cloves garlic",
        "2 tsp cumin",
        "2 tins black beans, drained",
        "8 small tortillas",
        "Toppings: salsa, avocado, lime, cabbage, cilantro"
      ]}
    ],
    steps: [
      "Sauté onion and garlic; add cumin and beans. Mash roughly; add splash of water if dry. Warm through.",
      "Warm tortillas. Fill with beans and toppings."
    ]
  },
  {
    id: "miso-udon",
    title: "Miso Udon with Greens",
    cuisine: "Japanese",
    diet: "vegetarian",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 2,
    tags: ["soup", "noodles"],
    householdNote: "Add sliced cooked chicken or a soft egg for meat eaters.",
    ingredients: [
      { section: "", items: [
        "2 servings udon noodles",
        "750 ml vegetable stock",
        "2 tbsp miso paste",
        "200 g greens (bok choy or spinach)",
        "Spring onion, sesame oil, nori (optional)"
      ]}
    ],
    steps: [
      "Simmer stock; whisk in miso off the heat (avoid boiling miso).",
      "Cook udon per packet; add greens at the end.",
      "Combine in bowls; garnish with spring onion and a drop of sesame oil."
    ]
  },
  {
    id: "quick-lamb-kofta-pita-wraps",
    title: "Quick Lamb Kofta Pita Wraps",
    cuisine: "Middle Eastern",
    diet: "meat",
    protein: "lamb",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 10,
    servings: 4,
    tags: ["lamb", "kofta", "wraps", "fast"],
    householdNote:
      "Vegetarians: use the same kofta spice mix on roasted cauliflower/chickpeas, or pan-fry firm tofu with the spices until golden. Serve in the same pitas with yogurt + salad.",
    ingredients: [
      { section: "Lamb kofta", items: [
        "500 g minced lamb",
        "1 tsp ground cumin",
        "1 tsp ground coriander",
        "1/2 tsp smoked paprika (optional)",
        "2 cloves garlic, grated",
        "1 tbsp olive oil",
        "Salt and black pepper"
      ]},
      { section: "Quick yogurt + serve", items: [
        "250 g plain yogurt",
        "1/2 lemon (juice) or 1 tbsp lemon juice",
        "1 small cucumber, chopped",
        "2 tomatoes, chopped",
        "Handful lettuce or rocket",
        "4 pitas or wraps",
        "Fresh parsley or mint (optional)"
      ]}
    ],
    steps: [
      "Mix lamb with cumin, coriander, paprika, garlic, salt, pepper, and 1 tbsp olive oil. Form into small oval patties.",
      "Heat a pan on medium-high. Cook kofta 4–5 minutes per side until cooked through.",
      "Stir yogurt with lemon juice; season to taste.",
      "Warm pitas. Fill with kofta, cucumber, tomatoes, greens, and yogurt. Finish with herbs if you have them."
    ]
  },
  {
    id: "lamb-shawarma-sheet-pan-bowls",
    title: "Lamb Shawarma Sheet-Pan Bowls",
    cuisine: "Mediterranean",
    diet: "meat",
    protein: "lamb",
    healthy: true,
    prepMinutes: 15,
    cookMinutes: 20,
    servings: 4,
    tags: ["sheet-pan", "shawarma", "bowl", "easy"],
    householdNote:
      "Vegetarians: roast the same veg with chickpeas (drained) and use the same shawarma spice mix. Serve together with the same yogurt-lemon drizzle.",
    ingredients: [
      { section: "Roast", items: [
        "400 g lamb shoulder pieces (or lamb strips)",
        "2 red onions, wedges",
        "1 bell pepper, sliced",
        "1 zucchini, sliced (or 250 g mushrooms)",
        "2 tbsp olive oil",
        "1 tsp ground cumin",
        "1 tsp ground coriander",
        "1/2 tsp turmeric",
        "1/2 tsp smoked paprika (optional)",
        "Salt and black pepper"
      ]},
      { section: "Yogurt-lemon drizzle + serve", items: [
        "250 g plain yogurt",
        "1 lemon (juice) or 2 tbsp lemon juice",
        "1–2 cloves garlic, grated (optional)",
        "Cooked rice, couscous, or warm pitas to serve",
        "Fresh parsley (optional)"
      ]}
    ],
    steps: [
      "Heat oven to 220°C. Toss lamb and vegetables with olive oil and all spices + salt/pepper.",
      "Spread on a sheet pan and roast 18–22 minutes until browned and cooked.",
      "Stir yogurt with lemon juice (and garlic if using); season to taste.",
      "Serve lamb + veg over rice/couscous or in pitas. Drizzle with yogurt and top with parsley."
    ]
  },
  {
    id: "15-minute-spicy-lamb-basil-stir-fry",
    title: "15-Minute Spicy Lamb Basil Stir-Fry",
    cuisine: "Thai-inspired",
    diet: "meat",
    protein: "lamb",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 4,
    tags: ["lamb", "stir-fry", "basil", "quick"],
    householdNote:
      "Vegetarians: swap lamb for extra-firm tofu or mushrooms. For the sauce, use soy sauce plus a splash of lime; skip fish sauce.",
    ingredients: [
      { section: "Sauce + stir-fry", items: [
        "400 g lamb mince (or thin lamb strips)",
        "2 tbsp neutral oil",
        "4 cloves garlic, minced",
        "1 tbsp fresh ginger, grated",
        "1 small chili, chopped (optional)",
        "2 tbsp soy sauce",
        "1–2 tbsp fish sauce (optional; use only if you want that flavor)",
        "1 tbsp lime juice",
        "1 tsp brown sugar (optional)",
        "2 cups basil leaves (or mix basil + mint)"
      ]},
      { section: "Serve", items: [
        "Cooked rice",
        "Optional: cucumber slices or shredded carrots"
      ]}
    ],
    steps: [
      "Mix soy sauce, fish sauce (if using), lime juice, and sugar (optional).",
      "In a hot pan, brown lamb with oil for 6–8 minutes, breaking it up.",
      "Add garlic, ginger, and chili; cook 1 minute.",
      "Pour in sauce and toss until glossy. Turn off heat and stir in basil until just wilted.",
      "Serve over rice with cucumber or carrots."
    ]
  },
  {
    id: "fast-lentil-herb-pita-wraps",
    title: "Fast Lentil & Herb Pita Wraps",
    cuisine: "Middle Eastern",
    diet: "vegetarian",
    healthy: true,
    prepMinutes: 10,
    cookMinutes: 10,
    servings: 4,
    tags: ["lentils", "wraps", "quick", "vegetarian"],
    householdNote:
      "Meat eaters: pair with the lamb kofta wrap recipe (same pitas and salad).",
    ingredients: [
      { section: "Lentil filling", items: [
        "2 cans lentils (drained and rinsed)",
        "1 tbsp olive oil",
        "1 small onion, finely chopped",
        "2 cloves garlic, minced",
        "1 tsp ground cumin",
        "1 tsp smoked paprika (optional)",
        "Salt and black pepper",
        "1–2 tbsp lemon juice"
      ]},
      { section: "Assemble", items: [
        "4 pitas or wraps",
        "1/2 cucumber, chopped",
        "2 tomatoes, chopped",
        "Handful lettuce or rocket",
        "Fresh parsley or mint, chopped"
      ]}
    ],
    steps: [
      "Sauté onion in olive oil 3–4 minutes. Add garlic and spices; cook 30 seconds.",
      "Add lentils and stir until hot and slightly mashed; season with salt/pepper and lemon juice.",
      "Warm pitas. Fill with lentils, cucumber, tomatoes, greens, and herbs.",
      "Serve immediately (great room temperature too)."
    ]
  }
];
