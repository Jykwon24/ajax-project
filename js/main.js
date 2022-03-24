var $form = document.getElementById('dropdown');
var $cuisineType = document.querySelector('#cuisine-type');
var $mainPage = document.querySelector('.body-container');
var $ul = document.querySelector('.recipe-display');
var $recipeContainer = document.querySelector('.recipe-container');
var $displayContainer = document.querySelector('.container');
var $topBarMenu = document.querySelector('.top-bar');
var $favoritesButtonDisplay = document.querySelector('.favorites-button');
var $favoritesButton = document.querySelector('.bot-hat-logo');

function renderFavoritesList(entry) {
  var $containerList = document.createElement('li');
  $containerList.setAttribute('class', 'recipe-row-1');
  $containerList.setAttribute('id', entry.entryId);
  $containerList.setAttribute('data-entry-id', entry.entryId);
  var $faveRecipeImg = document.createElement('img');
  $faveRecipeImg.setAttribute('class', 'recipe-img');
  $faveRecipeImg.setAttribute('data-entry-id', entry.entryId);
  var $faveRecipeTitle = document.createElement('h2');
  $faveRecipeTitle.setAttribute('class', 'favorites-list-title');
  $faveRecipeTitle.setAttribute('data-entry-id', entry.entryId);
  $faveRecipeImg.setAttribute('src', entry.image);
  var $editIcon = document.createElement('a');
  $editIcon.setAttribute('class', 'fas fa-pen edit-button');
  $editIcon.setAttribute('data-entry-id', entry.entryId);
  $faveRecipeTitle.textContent = entry.title;
  $containerList.appendChild($faveRecipeImg);
  $containerList.appendChild($faveRecipeTitle);
  $containerList.appendChild($editIcon);
  return $containerList;
}

function renderFavoritedRecipe(entry) {
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
  $recipeTitle.textContent = entry.title;

  var $recipeImg = document.createElement('img');
  $recipeImg.setAttribute('class', 'recipe-img');
  $recipeImg.setAttribute('src', entry.image);

  var $recipeDirections = document.createElement('ul');

  for (var i = 0; i < entry.ingredients.length; i++) {
    var ingredients = document.createElement('li');
    ingredients.textContent = entry.ingredients[i].original;
    $recipeIngredientList.appendChild(ingredients);
  }
  for (i = 0; i < entry.steps.length; i++) {
    var directions = document.createElement('li');
    directions.textContent = entry.steps[i].step;
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
  return $displayContainer;
}

$form.addEventListener('submit', function (event) {
  var favoritesRecipe = {};
  event.preventDefault();
  if ($cuisineType.value !== '') {
    $mainPage.classList.add('hidden');
    data.value = $cuisineType.value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spoonacular.com/recipes/random?number=1&apiKey=fa0446638689465c808d67ef46d6f6f0&tags=' + $cuisineType.value);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var selectedRecipe = xhr.response.recipes[0];
      for (var i = 0; i < selectedRecipe.extendedIngredients.length; i++) {
        favoritesRecipe.ingredients = selectedRecipe.extendedIngredients[i].original;
      }
      for (i = 0; i < selectedRecipe.analyzedInstructions[0].steps.length; i++) {
        favoritesRecipe.steps = selectedRecipe.analyzedInstructions[0].steps[i].step;
      }
      favoritesRecipe.ingredients = selectedRecipe.extendedIngredients;
      favoritesRecipe.steps = selectedRecipe.analyzedInstructions[0].steps;
      favoritesRecipe.title = selectedRecipe.title;
      favoritesRecipe.image = selectedRecipe.image;
      favoritesRecipe.Id = selectedRecipe.id;
      renderFavoritedRecipe(favoritesRecipe);

      // var $recipeRow1 = document.createElement('div');
      // $recipeRow1.setAttribute('class', 'recipe-row-1');
      // var $recipeRow2 = document.createElement('div');
      // $recipeRow2.setAttribute('class', 'recipe-row-2');
      // var $recipeRow3 = document.createElement('div');
      // $recipeRow3.setAttribute('class', 'recipe-row-3');

      // var $recipeTitleBox = document.createElement('div');
      // var $recipeDirectionsBox = document.createElement('div');

      // var $recipeImgBox = document.createElement('div');
      // $recipeImgBox.setAttribute('id', 'currentRecipe');

      // var $recipeIngredientsBox = document.createElement('div');
      // var $recipeIngredientList = document.createElement('ul');

      // var $recipeTitle = document.createElement('h2');
      // $recipeTitle.textContent = selectedRecipe.title;

      // var $recipeImg = document.createElement('img');
      // $recipeImg.setAttribute('class', 'recipe-img');
      // $recipeImg.setAttribute('src', selectedRecipe.image);

      // var $recipeDirections = document.createElement('ul');

      // $recipeTitleBox.appendChild($recipeTitle);
      // $recipeIngredientsBox.appendChild($recipeIngredientList);
      // $recipeImgBox.appendChild($recipeImg);
      // $recipeDirectionsBox.appendChild($recipeDirections);
      // $recipeRow1.appendChild($recipeTitleBox);
      // $recipeRow2.appendChild($recipeImgBox);
      // $recipeRow2.appendChild($recipeIngredientsBox);
      // $recipeRow3.appendChild($recipeDirectionsBox);
      // $recipeContainer.appendChild($recipeRow1);
      // $recipeContainer.appendChild($recipeRow2);
      // $recipeContainer.appendChild($recipeRow3);
      // $displayContainer.appendChild($recipeContainer);

      $topBarMenu.classList.remove('hidden');
      $favoritesButtonDisplay.classList.remove('hidden');
      $favoritesButton.addEventListener('click', function (event) {
        // favoritesRecipe.title = selectedRecipe.title;
        // favoritesRecipe.image = selectedRecipe.image;
        // favoritesRecipe.Id = selectedRecipe.id;
        favoritesRecipe.entryId = data.nextRecipeId++;
        data.entries.unshift(favoritesRecipe);
        // renderFavoritesList(favoritesRecipe);
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

var $topMenu = document.querySelector('.top-hat-logo');
var $faveListButton = document.querySelector('.favorites-list');
var $emptyList = document.querySelector('.empty-list');

$topMenu.addEventListener('click', function (event) {
  window.location.reload();
});

$faveListButton.addEventListener('click', function (event) {
  $ul.classList.remove('hidden');
  $topBarMenu.classList.remove('hidden');
  $mainPage.classList.add('hidden');
  $recipeContainer.remove();
  var $faveWording = document.querySelector('.fave');
  if (data.entries.length === 0) {
    $recipeContainer.classList.add('hidden');
    $emptyList.classList.remove('hidden');
    $favoritesButton.classList.add('hidden');
    $faveWording.classList.add('hidden');
  } else {
    var $showFaveList = document.querySelector('.listing');
    var $addWording = document.querySelector('.add');
    var $check = document.querySelector('.fas');
    $addWording.classList.add('hidden');
    $check.classList.add('hidden');
    $favoritesButton.classList.add('hidden');
    $faveWording.classList.add('hidden');
    $showFaveList.classList.remove('hidden');
    $faveListButton.classList.add('hidden');
    $recipeContainer.classList.add('hidden');
    for (var i = 0; i < data.entries.length; i++) {
      var result = renderFavoritesList(data.entries[i]);
      $ul.appendChild(result);
    }
  }
});

$ul.addEventListener('click', function (event) {
  var $entryIdOnClick = parseInt(event.target.getAttribute('data-entry-id'));
  var $deleter = document.querySelector('.edit-button');
  var $backToFaves = document.querySelector('.back-to-favorites');
  for (var i = 0; i < data.entries.length; i++) {
    var targetRecipe = data.entries[i].entryId;
    if ($entryIdOnClick === targetRecipe && event.target !== $deleter) {
      var favoritesTitle = document.querySelector('.listing');
      $ul.classList.add('hidden');
      $recipeContainer.classList.remove('hidden');
      favoritesTitle.classList.add('hidden');
      renderFavoritedRecipe(data.entries[i]);
      $backToFaves.classList.remove('hidden');
    }
  }
});
