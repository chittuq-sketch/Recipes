(function () {
  "use strict";

  const recipes = window.RECIPES || [];
  const weekPlan = window.WEEK_PLAN || null;
  let activeTab = "recipes";

  const els = {
    search: document.getElementById("search"),
    cuisine: document.getElementById("cuisine"),
    diet: document.getElementById("diet"),
    healthyOnly: document.getElementById("healthy-only"),
    favoritesOnly: document.getElementById("favorites-only"),
    clearBtn: document.getElementById("clear-filters"),
    count: document.getElementById("result-count"),
    grid: document.getElementById("recipe-grid"),
    themeToggle: document.getElementById("theme-toggle"),
    modal: document.getElementById("modal"),
    modalTitle: document.getElementById("modal-title"),
    modalBody: document.getElementById("modal-body"),
    modalClose: document.getElementById("modal-close"),
    modalPrint: document.getElementById("modal-print"),
    servingsInput: document.getElementById("servings-input"),
    servingsLabel: document.getElementById("servings-label"),
    tabBtnRecipes: document.getElementById("tab-btn-recipes"),
    tabBtnWeek: document.getElementById("tab-btn-week"),
    tabBtnShop: document.getElementById("tab-btn-shop"),
    panelRecipes: document.getElementById("panel-recipes"),
    panelWeek: document.getElementById("panel-week"),
    panelShop: document.getElementById("panel-shop"),
    weekPlanIntro: document.getElementById("week-plan-intro"),
    weekRangeLabel: document.getElementById("week-range-label"),
    weekPlanTable: document.getElementById("week-plan-table"),
    shopIntro: document.getElementById("shop-intro"),
    shoppingListRoot: document.getElementById("shopping-list-root"),
    resetShopBtn: document.getElementById("reset-shop"),
  };

  const FAV_KEY = "recipe-box-favorites";
  const THEME_KEY = "recipe-box-theme";
  const PRINT_RECIPE_CLASS = "print-recipe-only";
  const PRINT_WEEK_CLASS = "print-week-only";
  const PRINT_SHOP_CLASS = "print-shop-only";

  function loadFavorites() {
    try {
      const raw = localStorage.getItem(FAV_KEY);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(Array.isArray(arr) ? arr : []);
    } catch {
      return new Set();
    }
  }

  let favorites = loadFavorites();

  function saveFavorites() {
    localStorage.setItem(FAV_KEY, JSON.stringify([...favorites]));
  }

  function getTheme() {
    return localStorage.getItem(THEME_KEY) || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  }

  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);
    if (els.themeToggle) {
      els.themeToggle.textContent = theme === "dark" ? "Light mode" : "Dark mode";
      els.themeToggle.setAttribute("aria-pressed", theme === "dark" ? "true" : "false");
    }
  }

  const dietLabels = {
    vegetarian: "Vegetarian",
    vegan: "Vegan",
  };

  const proteinLabels = {
    chicken: "Chicken",
    fish: "Fish",
    lamb: "Lamb",
    goat: "Goat",
    pork: "Pork",
    duck: "Duck",
    shellfish: "Shellfish",
    mixed: "Mixed meat",
  };

  const PROTEIN_TYPES = Object.keys(proteinLabels);

  function uniqueCuisines() {
    const set = new Set(recipes.map((r) => r.cuisine).filter(Boolean));
    return [...set].sort((a, b) => a.localeCompare(b));
  }

  function populateCuisineFilter() {
    if (!els.cuisine) return;
    const current = els.cuisine.value;
    els.cuisine.innerHTML = '<option value="">All cuisines</option>';
    uniqueCuisines().forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      els.cuisine.appendChild(opt);
    });
    if ([...els.cuisine.options].some((o) => o.value === current)) {
      els.cuisine.value = current;
    }
  }

  function recipeMatchesSearch(recipe, q) {
    if (!q) return true;
    const hay = [
      recipe.title,
      recipe.cuisine,
      recipe.protein,
      ...(recipe.tags || []),
      ...(recipe.ingredients || []).flatMap((s) => s.items || []),
      recipe.householdNote || "",
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  }

  function filterRecipes() {
    const q = (els.search && els.search.value || "").trim().toLowerCase();
    const cuisine = els.cuisine && els.cuisine.value;
    const diet = els.diet && els.diet.value;
    const healthyOnly = els.healthyOnly && els.healthyOnly.checked;
    const favOnly = els.favoritesOnly && els.favoritesOnly.checked;

    return recipes.filter((r) => {
      if (!recipeMatchesSearch(r, q)) return false;
      if (cuisine && r.cuisine !== cuisine) return false;
      if (healthyOnly && !r.healthy) return false;
      if (favOnly && !favorites.has(r.id)) return false;
      if (diet === "veg") {
        if (r.diet !== "vegetarian" && r.diet !== "vegan") return false;
      } else if (diet === "vegan") {
        if (r.diet !== "vegan") return false;
      } else if (PROTEIN_TYPES.includes(diet)) {
        if (r.diet !== "meat") return false;
        const p = r.protein || "mixed";
        if (p !== diet) return false;
      }
      return true;
    });
  }

  function formatTime(r) {
    const p = r.prepMinutes ?? 0;
    const c = r.cookMinutes ?? 0;
    const total = p + c;
    return `${p} min prep · ${c} min cook · ${total} min total`;
  }

  function chipHtml(recipe) {
    const parts = [];
    parts.push(`<span class="chip">${escapeHtml(recipe.cuisine)}</span>`);
    if (recipe.healthy) parts.push('<span class="chip">Healthy</span>');
    if (recipe.diet === "meat") {
      const pl = proteinLabels[recipe.protein] || proteinLabels.mixed;
      parts.push(`<span class="chip chip--meat">${escapeHtml(pl)}</span>`);
    } else {
      parts.push(`<span class="chip">${escapeHtml(dietLabels[recipe.diet] || recipe.diet)}</span>`);
    }
    return parts.join("");
  }

  function escapeHtml(s) {
    const div = document.createElement("div");
    div.textContent = s;
    return div.innerHTML;
  }

  function getWeekStartMonday() {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const day = d.getDay();
    if (day === 0) d.setDate(d.getDate() + 1);
    else if (day !== 1) d.setDate(d.getDate() + (8 - day));
    return d;
  }

  function addDays(date, n) {
    const x = new Date(date);
    x.setDate(x.getDate() + n);
    return x;
  }

  function formatWeekKey(d) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  }

  function fmtShort(d) {
    return d.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  }

  function getShopStorageKey() {
    if (!weekPlan) return null;
    return `recipe-box-shop-${formatWeekKey(getWeekStartMonday())}-v${weekPlan.planVersion}`;
  }

  function loadShopChecked() {
    const key = getShopStorageKey();
    if (!key) return {};
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }

  function saveShopChecked(obj) {
    const key = getShopStorageKey();
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(obj));
  }

  function renderWeekPlan() {
    if (!weekPlan || !els.weekPlanTable) return;
    if (els.weekPlanIntro) {
      els.weekPlanIntro.textContent = `${weekPlan.note} Serves ${weekPlan.servings}.`;
    }
    const start = getWeekStartMonday();
    if (els.weekRangeLabel) {
      const end = addDays(start, 5);
      els.weekRangeLabel.textContent = `Week: ${fmtShort(start)} (Mon) – ${fmtShort(end)} (Sat)`;
    }
    let html =
      '<table class="week-table"><thead><tr><th scope="col">Day</th><th scope="col">Meat / fish / lamb</th><th scope="col">Vegetarian / vegan</th><th scope="col">Open in app</th></tr></thead><tbody>';
    weekPlan.days.forEach((row, i) => {
      const d = addDays(start, i);
      html += `<tr>
        <td><span class="day-name">${escapeHtml(row.day)}</span><span class="day-date">${escapeHtml(fmtShort(d))}</span></td>
        <td>${escapeHtml(row.meat.short)}</td>
        <td>${escapeHtml(row.veg.short)}</td>
        <td class="week-cell-actions">
          <button type="button" class="btn btn--primary open-recipe" data-id="${escapeHtml(row.meat.recipeId)}">Meat line</button>
          <button type="button" class="btn open-recipe" data-id="${escapeHtml(row.veg.recipeId)}">Veg line</button>
        </td>
      </tr>`;
      if (row.tip) {
        html += `<tr class="week-tip-row"><td colspan="4"><p class="week-tip">${escapeHtml(row.tip)}</p></td></tr>`;
      }
    });
    html += "</tbody></table>";
    els.weekPlanTable.innerHTML = html;
    els.weekPlanTable.querySelectorAll(".open-recipe").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-id")));
    });
  }

  function renderShoppingList() {
    if (!els.shoppingListRoot || !weekPlan) return;
    const checked = loadShopChecked();
    if (els.shopIntro) {
      els.shopIntro.textContent = `Tick items as you buy them. Progress is saved for the week of ${formatWeekKey(getWeekStartMonday())} on this device.`;
    }
    const byCat = {};
    weekPlan.shopping.forEach((item) => {
      if (!byCat[item.category]) byCat[item.category] = [];
      byCat[item.category].push(item);
    });
    let html = "";
    Object.keys(byCat).forEach((cat) => {
      html += `<div class="shop-category"><h3>${escapeHtml(cat)}</h3><ul class="shop-list">`;
      byCat[cat].forEach((item) => {
        const isChecked = !!checked[item.id];
        html += `<li><label>
          <input type="checkbox" data-shop-id="${escapeHtml(item.id)}" ${isChecked ? "checked" : ""} />
          <span>${escapeHtml(item.text)}</span>
        </label></li>`;
      });
      html += "</ul></div>";
    });
    els.shoppingListRoot.innerHTML = html;
    els.shoppingListRoot.querySelectorAll("input[data-shop-id]").forEach((input) => {
      input.addEventListener("change", () => {
        const id = input.getAttribute("data-shop-id");
        const cur = loadShopChecked();
        if (input.checked) cur[id] = true;
        else delete cur[id];
        saveShopChecked(cur);
      });
    });
  }

  function setTab(tab) {
    activeTab = tab;
    const isRecipes = tab === "recipes";
    const isWeek = tab === "week";
    const isShop = tab === "shop";
    if (els.panelRecipes) els.panelRecipes.hidden = !isRecipes;
    if (els.panelWeek) els.panelWeek.hidden = !isWeek;
    if (els.panelShop) els.panelShop.hidden = !isShop;
    if (els.tabBtnRecipes) {
      els.tabBtnRecipes.setAttribute("aria-selected", String(isRecipes));
      els.tabBtnRecipes.tabIndex = isRecipes ? 0 : -1;
    }
    if (els.tabBtnWeek) {
      els.tabBtnWeek.setAttribute("aria-selected", String(isWeek));
      els.tabBtnWeek.tabIndex = isWeek ? 0 : -1;
    }
    if (els.tabBtnShop) {
      els.tabBtnShop.setAttribute("aria-selected", String(isShop));
      els.tabBtnShop.tabIndex = isShop ? 0 : -1;
    }
    if (isWeek) renderWeekPlan();
    if (isShop) renderShoppingList();
  }

  function renderGrid(list) {
    if (!els.grid) return;
    els.grid.innerHTML = "";
    if (els.count) {
      els.count.textContent = list.length === recipes.length
        ? `${list.length} recipes`
        : `${list.length} of ${recipes.length} recipes`;
    }

    if (list.length === 0) {
      const empty = document.createElement("div");
      empty.className = "empty-state";
      empty.innerHTML =
        "<p>No recipes match your filters.</p><button type=\"button\" class=\"btn btn--primary\" id=\"empty-clear\">Clear filters</button>";
      els.grid.appendChild(empty);
      document.getElementById("empty-clear").addEventListener("click", clearFilters);
      return;
    }

    list.forEach((recipe) => {
      const card = document.createElement("article");
      card.className = "recipe-card";
      const isFav = favorites.has(recipe.id);
      card.innerHTML = `
        <h2 class="recipe-card__title">${escapeHtml(recipe.title)}</h2>
        <p class="recipe-card__meta">${escapeHtml(formatTime(recipe))} · Serves ${recipe.servings}</p>
        <div class="chips">${chipHtml(recipe)}</div>
        <div class="card-actions">
          <button type="button" class="btn btn--primary open-recipe" data-id="${escapeHtml(recipe.id)}">View recipe</button>
          <button type="button" class="btn toggle-fav" data-id="${escapeHtml(recipe.id)}" aria-pressed="${isFav}">${isFav ? "★ Saved" : "☆ Save"}</button>
        </div>
      `;
      els.grid.appendChild(card);
    });

    els.grid.querySelectorAll(".open-recipe").forEach((btn) => {
      btn.addEventListener("click", () => openModal(btn.getAttribute("data-id")));
    });
    els.grid.querySelectorAll(".toggle-fav").forEach((btn) => {
      btn.addEventListener("click", () => toggleFavorite(btn.getAttribute("data-id"), btn));
    });
  }

  function scaleIngredientLine(line, factor) {
    if (factor === 1) return line;
    return line.replace(/(\d+(?:\.\d+)?)\s*g\b/gi, (_, n) => `${roundNice(parseFloat(n) * factor)} g`);
  }

  function roundNice(n) {
    if (n >= 10) return Math.round(n);
    return Math.round(n * 10) / 10;
  }

  let openRecipeId = null;

  function openModal(id) {
    const recipe = recipes.find((r) => r.id === id);
    if (!recipe || !els.modal) return;
    openRecipeId = id;
    els.modalTitle.textContent = recipe.title;
    if (els.servingsInput) {
      els.servingsInput.value = String(recipe.servings);
      els.servingsInput.min = "1";
      els.servingsInput.max = "24";
    }
    if (els.servingsLabel) {
      els.servingsLabel.textContent = `Portions (base recipe serves ${recipe.servings})`;
    }
    renderModalBody(recipe, recipe.servings);
    els.modal.hidden = false;
    document.body.style.overflow = "hidden";
    els.modalClose.focus();
  }

  function renderModalBody(recipe, portions) {
    const base = recipe.servings || 1;
    const factor = portions / base;
    let html = "";
    if (recipe.householdNote) {
      html += `<p class="modal__note"><strong>Mixed household:</strong> ${escapeHtml(recipe.householdNote)}</p>`;
    }
    html += `<p class="recipe-card__meta">${escapeHtml(formatTime(recipe))}</p>`;
    html += '<h2 class="visually-hidden">Ingredients</h2>';
    (recipe.ingredients || []).forEach((sec) => {
      html += '<div class="ingredient-section">';
      if (sec.section) html += `<h3>${escapeHtml(sec.section)}</h3>`;
      html += "<ul>";
      (sec.items || []).forEach((item) => {
        const scaled = scaleIngredientLine(item, factor);
        html += `<li>${escapeHtml(scaled)}</li>`;
      });
      html += "</ul></div>";
    });
    html += '<h2 class="visually-hidden">Steps</h2><ol class="steps-list">';
    (recipe.steps || []).forEach((step) => {
      html += `<li>${escapeHtml(step)}</li>`;
    });
    html += "</ol>";
    els.modalBody.innerHTML = html;
  }

  function closeModal() {
    if (!els.modal) return;
    els.modal.hidden = true;
    document.body.style.overflow = "";
    openRecipeId = null;
  }

  function toggleFavorite(id, btn) {
    if (favorites.has(id)) {
      favorites.delete(id);
      btn.textContent = "☆ Save";
      btn.setAttribute("aria-pressed", "false");
    } else {
      favorites.add(id);
      btn.textContent = "★ Saved";
      btn.setAttribute("aria-pressed", "true");
    }
    saveFavorites();
    if (els.favoritesOnly && els.favoritesOnly.checked) refresh();
  }

  function clearFilters() {
    if (els.search) els.search.value = "";
    if (els.cuisine) els.cuisine.value = "";
    if (els.diet) els.diet.value = "";
    if (els.healthyOnly) els.healthyOnly.checked = false;
    if (els.favoritesOnly) els.favoritesOnly.checked = false;
    refresh();
  }

  function refresh() {
    renderGrid(filterRecipes());
  }

  function onServingsChange() {
    if (!openRecipeId || !els.servingsInput) return;
    const recipe = recipes.find((r) => r.id === openRecipeId);
    if (!recipe) return;
    let n = parseInt(els.servingsInput.value, 10);
    if (Number.isNaN(n) || n < 1) n = recipe.servings;
    if (n > 24) n = 24;
    els.servingsInput.value = String(n);
    renderModalBody(recipe, n);
  }

  // Events
  ["input", "change"].forEach((ev) => {
    if (els.search) els.search.addEventListener(ev, refresh);
    if (els.cuisine) els.cuisine.addEventListener(ev, refresh);
    if (els.diet) els.diet.addEventListener(ev, refresh);
    if (els.healthyOnly) els.healthyOnly.addEventListener(ev, refresh);
    if (els.favoritesOnly) els.favoritesOnly.addEventListener(ev, refresh);
  });

  if (els.clearBtn) els.clearBtn.addEventListener("click", clearFilters);
  if (els.modalClose) {
    els.modalClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeModal();
    });
  }
  if (els.modalPrint) {
    els.modalPrint.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      window.print();
    });
  }
  if (els.servingsInput) els.servingsInput.addEventListener("input", onServingsChange);

  if (els.modal) {
    els.modal.addEventListener("click", (e) => {
      if (e.target === els.modal) closeModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && els.modal && !els.modal.hidden) closeModal();
    if (
      e.key === "/"
      && activeTab === "recipes"
      && document.activeElement !== els.search
    ) {
      e.preventDefault();
      if (els.search) els.search.focus();
    }
  });

  if (els.themeToggle) {
    els.themeToggle.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
      setTheme(next);
    });
  }

  window.addEventListener("beforeprint", () => {
    document.documentElement.classList.remove(PRINT_RECIPE_CLASS, PRINT_WEEK_CLASS, PRINT_SHOP_CLASS);
    if (els.modal && !els.modal.hidden) {
      document.documentElement.classList.add(PRINT_RECIPE_CLASS);
      return;
    }
    if (activeTab === "week") document.documentElement.classList.add(PRINT_WEEK_CLASS);
    else if (activeTab === "shop") document.documentElement.classList.add(PRINT_SHOP_CLASS);
  });

  window.addEventListener("afterprint", () => {
    document.documentElement.classList.remove(PRINT_RECIPE_CLASS, PRINT_WEEK_CLASS, PRINT_SHOP_CLASS);
  });

  if (els.tabBtnRecipes) els.tabBtnRecipes.addEventListener("click", () => setTab("recipes"));
  if (els.tabBtnWeek) els.tabBtnWeek.addEventListener("click", () => setTab("week"));
  if (els.tabBtnShop) els.tabBtnShop.addEventListener("click", () => setTab("shop"));

  if (els.resetShopBtn) {
    els.resetShopBtn.addEventListener("click", () => {
      const key = getShopStorageKey();
      if (key) localStorage.removeItem(key);
      renderShoppingList();
    });
  }

  populateCuisineFilter();
  setTheme(getTheme());
  refresh();
})();
