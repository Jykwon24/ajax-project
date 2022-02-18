var $form = document.getElementById('dropdown');
var $cuisineType = document.querySelector('#cuisine-type');
var $mainPage = document.querySelector('.body-container');
// var $ul = document.querySelector('.recipe-display');
var $recipeContainer = document.querySelector('.recipe-container');
var $displayContainer = document.querySelector('.container');
var $topBarMenu = document.querySelector('.top-bar');
var $favoritesButtonDisplay = document.querySelector('.favorites-button');
var $favoritesButton = document.querySelector('.bot-hat-logo');

$form.addEventListener('submit', function (event) {
  var favoritesRecipe = {};
  event.preventDefault();
  if ($cuisineType.value !== '') {
    $mainPage.classList.add('hidden');
    data.value = $cuisineType.value;
    var xhr = new XMLHttpRequest();
    // var xhr2 = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spoonacular.com/recipes/random?number=1&apiKey=fa0446638689465c808d67ef46d6f6f0&tags=' + $cuisineType.value);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var selectedRecipe = xhr.response.recipes[0];
      var $recipeRow1 = document.createElement('div');
      $recipeRow1.setAttribute('class', 'recipe-row-1');
      var $recipeRow2 = document.createElement('div');
      $recipeRow2.setAttribute('class', 'recipe-row-2');
      var $recipeRow3 = document.createElement('div');
      $recipeRow3.setAttribute('class', 'recipe-row-3');

      var $recipeTitleBox = document.createElement('div');
      var $recipeDirectionsBox = document.createElement('div');

      var $recipeImgBox = document.createElement('div');
      $recipeImgBox.setAttribute('id', 'currentRecipe');

      var $recipeIngredientsBox = document.createElement('div');
      var $recipeIngredientList = document.createElement('ul');

      var $recipeTitle = document.createElement('h2');
      $recipeTitle.textContent = selectedRecipe.title;

      var $recipeImg = document.createElement('img');
      $recipeImg.setAttribute('class', 'recipe-img');
      $recipeImg.setAttribute('src', selectedRecipe.image);

      var $recipeDirections = document.createElement('ul');

      for (var i = 0; i < selectedRecipe.extendedIngredients.length; i++) {
        var ingredients = document.createElement('li');
        ingredients.textContent = selectedRecipe.extendedIngredients[i].original;
        $recipeIngredientList.appendChild(ingredients);
      }
      for (i = 0; i < selectedRecipe.analyzedInstructions[0].steps.length; i++) {
        var directions = document.createElement('li');
        directions.textContent = selectedRecipe.analyzedInstructions[0].steps[i].step;
        $recipeDirections.appendChild(directions);
      }

      $recipeTitleBox.appendChild($recipeTitle);
      $recipeIngredientsBox.appendChild($recipeIngredientList);
      $recipeImgBox.appendChild($recipeImg);
      $recipeDirectionsBox.appendChild($recipeDirections);
      $recipeRow1.appendChild($recipeTitleBox);
      $recipeRow2.appendChild($recipeImgBox);
      $recipeRow2.appendChild($recipeIngredientsBox);
      $recipeRow3.appendChild($recipeDirectionsBox);
      $recipeContainer.appendChild($recipeRow1);
      $recipeContainer.appendChild($recipeRow2);
      $recipeContainer.appendChild($recipeRow3);
      $displayContainer.appendChild($recipeContainer);

      $topBarMenu.classList.remove('hidden');
      $favoritesButtonDisplay.classList.remove('hidden');
      $favoritesButton.addEventListener('click', function (event) {
        favoritesRecipe.title = selectedRecipe.title;
        favoritesRecipe.image = selectedRecipe.image;
        favoritesRecipe.Id = selectedRecipe.id;
        data.entries.unshift(favoritesRecipe);
        var $faveWording = document.querySelector('.fave');
        var $addWording = document.querySelector('.add');
        var $check = document.querySelector('.fas');
        $favoritesButton.classList.add('hidden');
        $faveWording.classList.add('hidden');
        $addWording.classList.remove('hidden');
        $check.classList.remove('hidden');
      });
      $form.reset();
    });
    xhr.send();
  }
});

// function renderFavoritesList(entry) {

// }

var $topMenu = document.querySelector('.top-hat-logo');

$topMenu.addEventListener('click', function (event) {
  window.location.reload();
});
