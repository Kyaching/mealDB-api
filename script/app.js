const loadMeals = (search) => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const mealContainer = document.getElementById("meal-container");
  mealContainer.innerHTML = "";
  for (const meal of meals) {
    // console.log(meal);
    const mealDiv = document.createElement("div");
    mealDiv.innerHTML = `
    <div class="col">
    <div onClick="showMeal('${meal.idMeal}')" class="card">
      <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
      </div>
    </div>
  </div>
    `;
    mealContainer.appendChild(mealDiv);
  }
};

const showMeal = (meal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displaySelectedMeal(data.meals[0]));
};

const displaySelectedMeal = (meal) => {
  const mealContainer = document.getElementById("meals-container");
  mealContainer.innerHTML = "";
  const mealDiv = document.createElement("div");
  mealDiv.innerHTML = `
  <div class="card">
    <img src="${meal.strMealThumb}" class="card-img-top" alt="..." />
    <div class="card-body">
      <h5 class="card-title">${meal.strMeal}</h5>
      <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
    </div>
    `;
  mealContainer.appendChild(mealDiv);
};
const searchMeal = () => {
  const searchField = document.getElementById("search-field");
  const searchMeal = searchField.value;
  searchField.value = "";
  loadMeals(searchMeal);
};
