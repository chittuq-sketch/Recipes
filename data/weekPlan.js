/**
 * Rolling week plan: dinners Mon–Sat for ~4–5 people. No beef or pork.
 * Recipe ids must match data/recipes.js. Bump planVersion if you change rows or shopping ids.
 */
window.WEEK_PLAN = {
  planVersion: 1,
  servings: "4–5",
  note: "Simple mix of meat/fish/lamb and vegetarian or vegan options. Beef and pork are not included.",
  days: [
    {
      day: "Monday",
      meat: {
        recipeId: "vietnamese-grilled-chicken-noodle-bowl",
        short: "Grilled chicken noodle bowl",
      },
      veg: {
        recipeId: "tofu-vermicelli-bowl",
        short: "Tofu vermicelli bowl",
      },
      tip: "Same noodles and salad style; split marinades if prepping ahead.",
    },
    {
      day: "Tuesday",
      meat: {
        recipeId: "grilled-salmon-quinoa",
        short: "Salmon with lemon quinoa",
      },
      veg: {
        recipeId: "chickpea-spinach-curry",
        short: "Chickpea & spinach curry",
      },
      tip: "Fish cooks quickly; start veg curry first if sharing sides.",
    },
    {
      day: "Wednesday",
      meat: {
        recipeId: "quick-lamb-kofta-pita-wraps",
        short: "Lamb kofta pita wraps",
      },
      veg: {
        recipeId: "fast-lentil-herb-pita-wraps",
        short: "Lentil & herb pita wraps",
      },
      tip: "Same pitas, yogurt, and salad for both lines.",
    },
    {
      day: "Thursday",
      meat: {
        recipeId: "15-minute-spicy-lamb-basil-stir-fry",
        short: "Spicy lamb basil stir-fry",
      },
      veg: {
        recipeId: "margherita-skillet-pizza",
        short: "Margherita skillet pizza",
      },
      tip: "Lamb is fast in the wok; pizza can bake alongside with staggered timing.",
    },
    {
      day: "Friday",
      meat: {
        recipeId: "vietnamese-grilled-chicken-noodle-bowl",
        short: "Grilled chicken noodle bowl (or reuse Friday prep)",
      },
      veg: {
        recipeId: "miso-udon",
        short: "Miso udon with greens",
      },
      tip: "Friday repeats chicken from Monday’s plan to keep the shop simpler; swap for another chicken dish from the box if you prefer variety.",
    },
    {
      day: "Saturday",
      meat: {
        recipeId: "lamb-shawarma-sheet-pan-bowls",
        short: "Lamb shawarma sheet-pan bowls",
      },
      veg: {
        recipeId: "black-bean-tacos",
        short: "Black bean tacos",
      },
      tip: "Sheet-pan lamb while you warm beans and tortillas.",
    },
  ],
  shopping: [
    { id: "p-1", category: "Produce", text: "Brown or red onions (several), garlic (2 heads), ginger knob" },
    { id: "p-2", category: "Produce", text: "Lemons and limes (mixed), fresh chili (optional)" },
    { id: "p-3", category: "Produce", text: "Cucumbers (2–3), tomatoes (600 g+), lettuce or mixed leaves" },
    { id: "p-4", category: "Produce", text: "Carrots, spring onions, fresh herbs: mint, cilantro/coriander, basil, parsley" },
    { id: "p-5", category: "Produce", text: "Spinach (bags), bok choy or greens for udon, cabbage for tacos (optional)" },
    { id: "p-6", category: "Produce", text: "Bell peppers (2), zucchini (1–2), avocado (tacos)" },
    { id: "p-7", category: "Produce", text: "Potatoes or extra salad veg if you stretch sides" },

    { id: "m-1", category: "Meat & fish", text: "Chicken thighs or breast (~1.2–1.5 kg total for two chicken nights, 4–5 people)" },
    { id: "m-2", category: "Meat & fish", text: "Salmon fillets (4–5 portions)" },
    { id: "m-3", category: "Meat & fish", text: "Minced lamb (~900 g–1 kg for kofta + stir-fry + sheet-pan)" },
    { id: "m-4", category: "Meat & fish", text: "Lamb shoulder pieces or strips for sheet-pan (recipe uses ~400 g; scale if needed)" },

    { id: "d-1", category: "Dairy & eggs", text: "Plain yogurt (500 g+), mozzarella for pizza, halloumi optional (salmon night)" },
    { id: "d-2", category: "Dairy & eggs", text: "Eggs optional (udon night)" },

    { id: "pan-1", category: "Pantry", text: "Rice vermicelli, udon noodles, rice for stir-fry, couscous or extra rice" },
    { id: "pan-2", category: "Pantry", text: "Quinoa, tinned chickpeas (2), tinned black beans (2), tinned lentils (2)" },
    { id: "pan-3", category: "Pantry", text: "Pitas/wraps, small tortillas, pizza dough ball, coconut milk (1 tin)" },
    { id: "pan-4", category: "Pantry", text: "Olive oil, neutral oil, sesame oil (small), stock cubes or vegetable stock" },
    { id: "pan-5", category: "Pantry", text: "Soy sauce, fish sauce, miso paste, curry powder / garam masala" },
    { id: "pan-6", category: "Pantry", text: "Spices: cumin, coriander, paprika, turmeric; brown sugar" },
    { id: "pan-7", category: "Pantry", text: "Tomato passata or crushed tomatoes (pizza), salsa (tacos)" },

    { id: "f-1", category: "Fridge & tofu", text: "Firm tofu (500 g+), optional tempeh" },
    { id: "f-2", category: "Fridge & tofu", text: "Butter or extra cheese for pizza if you like" },
  ],
};
