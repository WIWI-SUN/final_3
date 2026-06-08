const DATA = normalizeStore(window.FOOD_STORE);

const state = {
  energy: 60,
  weather: "",
  walk: "",
  budget: "",
  recommendations: [],
  currentIndex: 0
};

const labels = {
  weather: { cold: "冷", mild: "適中", hot: "熱" },
  walk: { lt5: "5 分鐘內", "5to10": "5 到 10 分鐘", gt10: "10 分鐘以上" },
  budget: { lt100: "100 元內", "100to200": "100 到 200 元", "200to300": "200 到 300 元", gt300: "300 元以上" }
};

const budgetCeiling = { lt100: 100, "100to200": 200, "200to300": 300, gt300: 600 };
const resultImages = [
  "5_food.png?v=phone-clean-label-4",
  "6_food.png?v=phone-clean-label-4",
  "7_food.png?v=phone-clean-label-4",
  "8_food.png?v=phone-clean-label-4",
  "9_food.png?v=phone-clean-label-4"
];
const foodImageFolder = "drive-download-20260603T115616Z-3-001/";
const foodImageCatalog = [
  { name: "ramen-tanmen", src: `${foodImageFolder}food_ra-men_tanmen.png`, keywords: ["拉麵", "湯麵", "豚骨", "日式拉麵", "麵"] },
  { name: "ramen-iekei", src: `${foodImageFolder}food_ramen_iekei_uzura.png`, keywords: ["拉麵", "豚骨", "家系", "日式"] },
  { name: "tantanmen", src: `${foodImageFolder}ramen_top_tantanmen.png`, keywords: ["擔擔麵", "麻辣", "川味", "辣", "麵"] },
  { name: "dry-tantanmen", src: `${foodImageFolder}food_shirunashi_tantanmen.png`, keywords: ["乾拌麵", "拌麵", "擔擔", "麻辣", "麵"] },
  { name: "tom-yum-ramen", src: `${foodImageFolder}food_ramen_tomyamkung.png`, keywords: ["泰式", "酸辣", "東南亞", "湯麵", "麵"] },
  { name: "plain-ramen", src: `${foodImageFolder}food_ra-men_none.png`, keywords: ["牛肉麵", "湯", "麵線", "米粉湯", "台式小吃"] },
  { name: "soba", src: `${foodImageFolder}food_soba_togakushi.png`, keywords: ["蕎麥", "蕎麥麵", "冷麵", "涼麵", "日式"] },
  { name: "kakiage-soba", src: `${foodImageFolder}food_kakiage_soba.png`, keywords: ["蕎麥", "炸物", "天婦羅", "日式", "麵"] },
  { name: "bi-fun", src: `${foodImageFolder}food_bi-fun.png`, keywords: ["米粉", "米粉湯", "炒米粉", "台式", "小吃"] },
  { name: "byanbyanmen", src: `${foodImageFolder}food_byanbyanmen.png`, keywords: ["麵食", "烙餅", "中式", "中餐", "麵"] },
  { name: "jajamen", src: `${foodImageFolder}food_ja-ja-men.png`, keywords: ["炸醬", "拌麵", "麵食", "中式"] },
  { name: "fried-rice-kani", src: `${foodImageFolder}cha-han2_kani.png`, keywords: ["炒飯", "蟹", "海鮮", "中餐"] },
  { name: "fried-rice-ebi", src: `${foodImageFolder}cha-han3_ebi.png`, keywords: ["炒飯", "蝦", "海鮮", "中餐"] },
  { name: "ankake-rice", src: `${foodImageFolder}cha-han5_ankake.png`, keywords: ["炒飯", "燴飯", "中華", "中餐"] },
  { name: "chuukadon", src: `${foodImageFolder}food_chuukadon.png`, keywords: ["燴飯", "中華丼", "中餐", "便當"] },
  { name: "rurohan", src: `${foodImageFolder}food_rurohan.png`, keywords: ["滷肉飯", "魯肉飯", "台式", "便當", "小吃"] },
  { name: "gapao", src: `${foodImageFolder}food_gapao_rice.png`, keywords: ["打拋", "泰式", "東南亞", "飯"] },
  { name: "biriyani", src: `${foodImageFolder}food_biryani_biriani.png`, keywords: ["印度", "香料", "飯", "咖哩"] },
  { name: "kosyari", src: `${foodImageFolder}food_kosyari.png`, keywords: ["中東", "地中海", "素食", "飯"] },
  { name: "sansai-gohan", src: `${foodImageFolder}food_sansai_gohan.png`, keywords: ["健康", "餐盒", "蔬食", "素食", "便當"] },
  { name: "taichaduke", src: `${foodImageFolder}food_taichaduke.png`, keywords: ["茶泡飯", "魚", "日式", "定食"] },
  { name: "atsumeshi", src: `${foodImageFolder}food_atsumeshi_ryukyu.png`, keywords: ["生魚", "海鮮", "日式", "飯"] },
  { name: "tarekatsudon", src: `${foodImageFolder}food_tarekatsudon.png`, keywords: ["豬排", "丼", "炸物", "日式", "定食"] },
  { name: "torukorice", src: `${foodImageFolder}food_torukorice.png`, keywords: ["洋食", "日式洋食", "西餐", "飯"] },
  { name: "keema-curry", src: `${foodImageFolder}food_keema_curry_top_egg.png`, keywords: ["咖哩", "香料咖哩", "日式咖哩", "咖哩飯"] },
  { name: "thai-curry", src: `${foodImageFolder}food_poo_pad_pong_curry.png`, keywords: ["咖哩", "泰式", "東南亞", "香料"] },
  { name: "spaghetti-bolognese", src: `${foodImageFolder}food_spaghetti_bolognese_meatsauce.png`, keywords: ["義大利麵", "肉醬", "義式", "西餐"] },
  { name: "spaghetti-genovese", src: `${foodImageFolder}food_spaghetti_genovese.png`, keywords: ["義大利麵", "青醬", "義式", "西餐"] },
  { name: "spaghetti-neapolitan", src: `${foodImageFolder}food_spaghetti_neapolitan.png`, keywords: ["義大利麵", "番茄", "義式", "西餐"] },
  { name: "doria", src: `${foodImageFolder}food_doria.png`, keywords: ["燉飯", "焗烤", "洋食", "西餐"] },
  { name: "calzone", src: `${foodImageFolder}food_calzone.png`, keywords: ["披薩", "pizza", "義式", "西餐"] },
  { name: "ratatouille", src: `${foodImageFolder}food_ratatouille.png`, keywords: ["健康", "蔬菜", "西餐", "義式", "餐盒"] },
  { name: "fish-and-chips", src: `${foodImageFolder}food_fish_and_chips.png`, keywords: ["炸魚", "薯條", "西餐", "炸物"] },
  { name: "meat-pie", src: `${foodImageFolder}food_meatpie.png`, keywords: ["派", "西餐", "烘焙", "甜點"] },
  { name: "pot-pie", src: `${foodImageFolder}food_soup_pie_dutumi_potpie.png`, keywords: ["濃湯", "派", "西餐", "焗烤"] },
  { name: "rice-burger", src: `${foodImageFolder}food_rice_burger.png`, keywords: ["漢堡", "米漢堡", "早午餐", "輕食"] },
  { name: "banh-mi", src: `${foodImageFolder}food_bainmi_sandwich.png`, keywords: ["三明治", "越南", "東南亞", "輕食", "早餐"] },
  { name: "quesadilla", src: `${foodImageFolder}food_quesadilla.png`, keywords: ["墨西哥", "起司", "輕食", "西餐"] },
  { name: "nabe-baniku", src: `${foodImageFolder}food_nabe_baniku.png`, keywords: ["火鍋", "鍋物", "個人鍋", "小火鍋", "肉"] },
  { name: "negima-nabe", src: `${foodImageFolder}food_negima_nabe.png`, keywords: ["火鍋", "鍋", "日式鍋", "小火鍋"] },
  { name: "dagojiru", src: `${foodImageFolder}food_dagojiru.png`, keywords: ["湯", "湯品", "鍋", "定食"] },
  { name: "oden", src: `${foodImageFolder}food_shizuoka_oden.png`, keywords: ["關東煮", "滷味", "加熱滷味", "日式", "鍋"] },
  { name: "mabo-doufu", src: `${foodImageFolder}food_mabo_doufu.png`, keywords: ["麻婆", "豆腐", "川味", "麻辣", "中餐"] },
  { name: "rebanira", src: `${foodImageFolder}food_rebanira.png`, keywords: ["快炒", "熱炒", "中餐", "炒"] },
  { name: "moyashi-niku", src: `${foodImageFolder}food_moyashi_niku_itame.png`, keywords: ["炒肉", "快炒", "中餐", "便當"] },
  { name: "karaage", src: `${foodImageFolder}food_karaage.png`, keywords: ["炸雞", "雞排", "鹽酥雞", "炸物", "日式"] },
  { name: "tandoori-chicken", src: `${foodImageFolder}food_tandoori_chicken.png`, keywords: ["雞", "烤雞", "印度", "香料", "燒烤"] },
  { name: "korokke", src: `${foodImageFolder}food_korokke_corn.png`, keywords: ["可樂餅", "炸物", "點心", "日式"] },
  { name: "fried-potato", src: `${foodImageFolder}food_fried_potato_dish.png`, keywords: ["薯條", "炸物", "小吃", "輕食"] },
  { name: "miso-potato", src: `${foodImageFolder}food_miso_potato.png`, keywords: ["馬鈴薯", "炸物", "點心", "日式"] },
  { name: "okonomiyaki", src: `${foodImageFolder}food_okonomiyaki_kyabetsuyaki_decoration.png`, keywords: ["大阪燒", "廣島燒", "日式", "小吃"] },
  { name: "matsuri-okonomiyaki", src: `${foodImageFolder}food_omatsuri_okonomiyaki.png`, keywords: ["大阪燒", "祭典", "日式小吃", "小吃"] },
  { name: "bbq", src: `${foodImageFolder}cooking_camp_bbq.png`, keywords: ["燒肉", "烤肉", "串燒", "炭烤"] },
  { name: "peking-duck", src: `${foodImageFolder}food_peking_duck.png`, keywords: ["烤鴨", "中餐", "燒臘", "肉"] },
  { name: "sushi", src: `${foodImageFolder}food_sushi_pack.png`, keywords: ["壽司", "生魚片", "日式", "海鮮"] },
  { name: "pad-thai", src: `${foodImageFolder}food_thai_pattai.png`, keywords: ["泰式", "河粉", "東南亞", "炒麵"] },
  { name: "tamagofuwafuwa", src: `${foodImageFolder}food_tamagofuwafuwa.png`, keywords: ["蛋", "蛋餅", "早餐", "早午餐", "甜點"] },
  { name: "oranda-yaki", src: `${foodImageFolder}sweets_oranda_yaki.png`, keywords: ["甜點", "蛋糕", "鬆餅", "點心", "咖啡"] },
  { name: "yakiimo", src: `${foodImageFolder}food_yakiimo_shinbunshi.png`, keywords: ["地瓜", "甜點", "小吃", "健康"] },
  { name: "kosyoumochi", src: `${foodImageFolder}food_kosyoumochi.png`, keywords: ["胡椒餅", "烙餅", "餅", "中式", "小吃"] }
];

const foodKeywords = {
  涼麵: ["涼麵"],
  早餐店: ["早餐", "早午餐", "蛋餅", "吐司", "三明治", "鬆餅"],
  壽司: ["壽司", "日式"],
  健康餐盒: ["健康", "餐盒", "沙拉", "便當"],
  台式小吃: ["台式", "小吃", "雞肉飯", "滷肉飯", "麵線", "鍋貼", "水餃"],
  義大利麵: ["義大利", "義式", "義大利麵", "西餐"],
  日式料理: ["日式", "丼", "定食", "壽司", "拉麵"],
  韓式料理: ["韓式", "韓國", "泡菜", "部隊鍋"],
  甜點店: ["甜點", "蛋糕", "鬆餅", "豆花", "冰", "咖啡"],
  漢堡: ["漢堡", "burger"],
  披薩: ["披薩", "pizza"],
  炒飯: ["炒飯"],
  火鍋: ["火鍋", "鍋", "麻辣鍋"],
  小火鍋: ["小火鍋", "火鍋", "鍋"],
  拉麵: ["拉麵"],
  牛肉麵: ["牛肉麵"],
  咖哩飯: ["咖哩"],
  湯麵: ["湯麵", "麵", "雞湯", "魚湯", "湯"],
  燉飯: ["燉飯"],
  定食: ["定食"],
  燒肉: ["燒肉", "串燒"],
  滷肉飯: ["滷肉飯"],
  鐵板麵: ["鐵板麵", "鐵板燒"]
};

const drinkKeywords = {
  可不可熟成紅茶: ["可不可", "紅茶"],
  五十嵐冰淇淋紅茶: ["五十嵐", "冰淇淋紅茶"],
  清心福全烏龍綠: ["清心", "烏龍綠", "綠茶"],
  無糖綠茶: ["無糖", "綠茶"],
  麻古茶坊果粒茶: ["麻古", "果粒茶", "果茶"],
  一沐日黃金蕎麥奶茶加粉粿: ["一沐日", "蕎麥", "奶茶", "粉粿"],
  五十嵐波霸烏龍奶: ["五十嵐", "波霸", "烏龍奶"],
  迷客夏珍珠牧場鮮奶茶: ["迷客夏", "珍珠", "鮮奶茶"],
  鮮奶茶: ["鮮奶茶"],
  奶茶: ["奶茶"],
  焙奶茶: ["焙奶茶"],
  烏龍奶: ["烏龍奶"],
  泰式奶茶: ["泰式奶茶"],
  熱奶茶: ["熱奶茶"],
  珍煮丹黑糖珍珠鮮奶: ["珍煮丹", "黑糖", "珍珠鮮奶"]
};

document.addEventListener("DOMContentLoaded", () => {
  bindNavigation();
  bindEnergy();
  bindChoices();
  bindResults();
  updateClock();
  setInterval(updateClock, 1000);
});

function normalizeStore(store) {
  if (!store) {
    return { logicRules: [], restaurants: [] };
  }

  return {
    logicRules: (store.l || []).map((row) => ({
      temperature: row[0],
      budget: row[1],
      walk: row[2],
      foodChoice: row[3],
      drinkChoice: row[4],
      recoveryRate: Number(row[5]) || 0,
      baseRecovery: Number(row[6]) || 0
    })),
    restaurants: (store.r || []).map((row) => {
      const restaurant = {
        name: row[0],
        priceLabel: row[1],
        priceRange: row[2],
        minPrice: Number(row[3]) || 0,
        maxPrice: Number(row[4]) || 999,
        avgPrice: Number(row[5]) || 999,
        address: row[6],
        district: row[7],
        cuisine: row[8],
        subCuisine: row[9],
        url: row[10],
        hours: row[11]
      };
      restaurant.searchText = [restaurant.name, restaurant.cuisine, restaurant.subCuisine, restaurant.address, restaurant.district]
        .join(" ")
        .toLowerCase();
      return restaurant;
    })
  };
}

function bindNavigation() {
  document.querySelectorAll("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => nextPage(Number(button.dataset.goto)));
  });
  document.getElementById("complete-button").addEventListener("click", startLoading);
}

function bindEnergy() {
  const select = document.getElementById("energy-select");
  select.addEventListener("change", () => {
    state.energy = Number(select.value);
  });
  state.energy = Number(select.value);
}

function bindChoices() {
  document.querySelectorAll("[data-group]").forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.dataset.group;
      state[group] = button.dataset.value;
      document.querySelectorAll(`[data-group="${group}"]`).forEach((item) => item.classList.remove("selected"));
      button.classList.add("selected");
      document.getElementById("form-warning").textContent = "";
    });
  });
}

function bindResults() {
  document.getElementById("prev-rec").addEventListener("click", () => changeRecommendation(-1));
  document.getElementById("next-rec").addEventListener("click", () => changeRecommendation(1));
}

function nextPage(num) {
  document.querySelectorAll(".page").forEach((page) => page.classList.remove("active"));
  document.getElementById(`page${num}`).classList.add("active");
  if (num === 2) {
    updateClock();
  }
}

function updateClock() {
  const now = new Date();
  document.getElementById("time-text").textContent = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
}

function startLoading() {
  state.energy = Number(document.getElementById("energy-select").value);
  const missing = ["weather", "walk", "budget"].filter((key) => !state[key]);
  if (missing.length) {
    document.getElementById("form-warning").textContent = "請先完成天氣、步行時間與預算。";
    return;
  }

  nextPage(4);
  let progress = 0;
  document.getElementById("loading-percent").textContent = "0%";
  const timer = setInterval(() => {
    progress += 12 + Math.floor(Math.random() * 9);
    if (progress >= 100) {
      clearInterval(timer);
      document.getElementById("loading-percent").textContent = "100%";
      state.recommendations = buildRecommendations();
      state.currentIndex = 0;
      setTimeout(() => {
        renderRecommendation(0);
        nextPage(5);
      }, 280);
      return;
    }
    document.getElementById("loading-percent").textContent = `${progress}%`;
  }, 120);
}

function buildRecommendations() {
  const rules = applicableRules();
  const scored = DATA.restaurants
    .map((restaurant) => scoreRestaurant(restaurant, rules))
    .filter((item) => item.score > 0)
    .sort((left, right) => right.score - left.score || right.recoveryAfter - left.recoveryAfter);

  const picked = [];
  const seen = new Set();
  for (const item of scored) {
    if (seen.has(item.restaurant.name)) continue;
    seen.add(item.restaurant.name);
    picked.push(item);
    if (picked.length === 5) break;
  }

  if (picked.length >= 5) {
    return picked;
  }

  return picked.concat(
    DATA.restaurants
      .filter((restaurant) => !seen.has(restaurant.name))
      .map((restaurant) => scoreRestaurant(restaurant, DATA.logicRules, true))
      .sort((left, right) => right.score - left.score)
      .slice(0, 5 - picked.length)
  );
}

function applicableRules() {
  const temperatures = state.weather === "cold" ? ["cold", "cool"] : state.weather === "mild" ? ["mild", "cool"] : ["hot"];
  let rules = DATA.logicRules.filter((rule) =>
    temperatures.includes(rule.temperature) &&
    rule.walk === state.walk &&
    rule.budget === state.budget
  );
  if (!rules.length) {
    rules = DATA.logicRules.filter((rule) =>
      temperatures.includes(rule.temperature) &&
      (rule.walk === state.walk || rule.budget === state.budget)
    );
  }
  return rules.length ? rules : DATA.logicRules;
}

function scoreRestaurant(restaurant, rules, relaxed = false) {
  let bestRule = rules[0] || DATA.logicRules[0];
  let logicScore = 0;

  for (const rule of rules) {
    const foodMatch = matchesChoice(restaurant.searchText, rule.foodChoice, foodKeywords);
    const drinkMatch = matchesChoice(restaurant.searchText, rule.drinkChoice, drinkKeywords);
    const cuisineMatch = matchesCuisine(restaurant, rule.foodChoice);
    let points = rule.baseRecovery * 0.32;
    if (foodMatch) points += 76;
    if (cuisineMatch) points += 34;
    if (drinkMatch) points += restaurant.cuisine === "飲料" ? 42 : 12;
    if (points > logicScore) {
      logicScore = points;
      bestRule = rule;
    }
  }

  const priceScore = priceScoreFor(restaurant);
  const weatherScore = weatherScoreFor(restaurant);
  const walkScore = walkScoreFor(restaurant);
  const recoveryAfter = energyAfter(bestRule);
  const reasons = [];

  if (logicScore > 30) reasons.push(`符合「${bestRule.foodChoice}」情境`);
  if (priceScore > 26) reasons.push(`預算接近 ${labels.budget[state.budget]}`);
  if (weatherScore > 14) reasons.push(`${labels.weather[state.weather]}天適合`);

  return {
    restaurant,
    rule: bestRule,
    recoveryAfter,
    recoveryDelta: Math.max(0, recoveryAfter - state.energy),
    score: logicScore + priceScore + weatherScore + walkScore + recoveryAfter * 0.34 + (relaxed ? 10 : 0),
    reasons: reasons.length ? reasons.slice(0, 2) : ["依整體條件排序出的備選"]
  };
}

function priceScoreFor(restaurant) {
  const ceiling = budgetCeiling[state.budget] || 300;
  if (state.budget === "gt300") {
    if (restaurant.minPrice >= 250) return 42;
    if (restaurant.maxPrice >= 300) return 32;
    return 18;
  }
  if (restaurant.maxPrice <= ceiling) {
    return 48 - Math.min(18, Math.abs(ceiling - restaurant.avgPrice) / 12);
  }
  if (restaurant.minPrice <= ceiling) {
    return 28 - Math.min(16, (restaurant.maxPrice - ceiling) / 18);
  }
  return -Math.min(24, (restaurant.minPrice - ceiling) / 10);
}

function weatherScoreFor(restaurant) {
  const text = restaurant.searchText;
  if (state.weather === "hot") {
    return containsAny(text, ["飲", "茶", "咖啡", "冰", "甜點", "涼麵", "輕食", "沙拉"]) ? 24 : 6;
  }
  if (state.weather === "cold") {
    return containsAny(text, ["鍋", "湯", "拉麵", "牛肉麵", "咖哩", "韓式", "麻辣"]) ? 24 : 7;
  }
  return containsAny(text, ["定食", "義大利", "日式", "台式", "飯", "麵", "咖哩"]) ? 18 : 9;
}

function walkScoreFor(restaurant) {
  const address = restaurant.address || "";
  if (state.walk === "lt5") {
    return containsAny(address, ["師大路", "龍泉街", "浦城街"]) ? 18 : 5;
  }
  if (state.walk === "5to10") {
    return containsAny(address, ["大安區", "中正區", "泰順街", "溫州街", "和平東路"]) ? 14 : 8;
  }
  return 10;
}

function energyAfter(rule) {
  if (!rule) return state.energy;
  const gap = Math.max(0, 100 - state.energy);
  return round1(Math.min(100, state.energy + gap * rule.recoveryRate));
}

function matchesChoice(text, choice, map) {
  return containsAny(text, map[choice] || [choice]);
}

function matchesCuisine(restaurant, foodChoice) {
  const cuisine = restaurant.cuisine || "";
  if (["義大利麵", "披薩", "漢堡", "燉飯"].includes(foodChoice)) return cuisine === "西餐";
  if (["日式料理", "壽司", "拉麵", "定食", "咖哩飯"].includes(foodChoice)) return cuisine.includes("日式");
  if (foodChoice === "韓式料理") return cuisine.includes("韓式");
  if (["台式小吃", "炒飯", "湯麵", "牛肉麵", "滷肉飯", "鐵板麵"].includes(foodChoice)) return cuisine === "中餐";
  if (["甜點店", "早餐店", "涼麵"].includes(foodChoice)) return cuisine === "甜點/輕食";
  if (["火鍋", "小火鍋", "燒肉"].includes(foodChoice)) return cuisine === "中餐" || cuisine.includes("韓式") || cuisine.includes("日式");
  return false;
}

function containsAny(text, keywords) {
  const target = String(text || "").toLowerCase();
  return keywords.some((keyword) => target.includes(String(keyword).toLowerCase()));
}

function renderRecommendation(index) {
  const item = state.recommendations[index];
  if (!item) return;
  state.currentIndex = index;
  const restaurant = item.restaurant;

  document.getElementById("result-bg").src = resultImages[index % resultImages.length];
  const restaurantNameEl = document.getElementById("restaurant-name");
  restaurantNameEl.textContent = restaurant.name;
  hideElementVisually(restaurantNameEl);
  const foodImage = selectFoodImage(restaurant);
  const foodImageEl = ensureFoodImageElement();
  foodImageEl.src = foodImage.src;
  foodImageEl.alt = `${restaurant.name} 餐點示意圖`;
  document.getElementById("restaurant-price").textContent = `${restaurant.priceRange} 元｜${restaurant.address}`;
  document.getElementById("restaurant-type").textContent = formatCuisine(restaurant);
  document.getElementById("restaurant-hours").textContent = "Google Maps 即時資訊";
  document.getElementById("restaurant-energy").textContent = item.recoveryAfter.toFixed(1);
  document.getElementById("restaurant-reason").textContent =
    `${item.reasons.join("、")}。目前體力 ${state.energy}% ，預估恢復 ${item.recoveryDelta.toFixed(1)}%。`;
  document.getElementById("map-link").href = restaurant.url;
  document.getElementById("rec-index").textContent = `推薦 ${index + 1}`;
}

function changeRecommendation(step) {
  if (!state.recommendations.length) return;
  const total = state.recommendations.length;
  renderRecommendation((state.currentIndex + step + total) % total);
}

function ensureFoodImageElement() {
  let image = document.getElementById("restaurant-food-image");
  if (image) return image;

  const content = document.querySelector(".result-content");
  const name = document.getElementById("restaurant-name");
  const card = document.createElement("div");
  card.className = "food-image-card";
  image = document.createElement("img");
  image.id = "restaurant-food-image";
  image.alt = "";
  card.appendChild(image);
  if (content) {
    content.insertBefore(card, name || content.firstChild);
  }
  return image;
}

function hideElementVisually(element) {
  if (!element) return;
  element.classList.add("sr-only");
  Object.assign(element.style, {
    position: "absolute",
    width: "1px",
    height: "1px",
    padding: "0",
    margin: "-1px",
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: "0"
  });
}

function selectFoodImage(restaurant) {
  const source = [restaurant.name, restaurant.cuisine, restaurant.subCuisine, restaurant.searchText]
    .join(" ")
    .toLowerCase();
  let best = foodImageCatalog[stableIndex(source, foodImageCatalog.length)] || foodImageCatalog[0];
  let bestScore = 0;
  foodImageCatalog.forEach((item) => {
    const score = item.keywords.reduce((total, keyword) => {
      const normalized = keyword.toLowerCase();
      return source.includes(normalized) ? total + normalized.length : total;
    }, 0);
    if (score > bestScore || (score === bestScore && score > 0 && item.name.length < best.name.length)) {
      best = item;
      bestScore = score;
    }
  });
  return best;
}

function stableIndex(text, length) {
  if (!length) return 0;
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) >>> 0;
  }
  return hash % length;
}

function formatCuisine(restaurant) {
  const subtype = String(restaurant.subCuisine || "")
    .split(/[\\/、,，]/)
    .map((item) => item.trim())
    .find(Boolean);
  if (!subtype || subtype === restaurant.cuisine) return restaurant.cuisine;
  return `${restaurant.cuisine} / ${subtype}`;
}

function round1(value) {
  return Math.round(value * 10) / 10;
}
