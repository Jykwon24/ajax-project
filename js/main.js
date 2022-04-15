var $form = document.getElementById('dropdown');
var $cuisineType = document.querySelector('#cuisine-type');
var $mainPage = document.querySelector('.body-container');
var $ul = document.querySelector('.recipe-display');
var $recipeContainer = document.querySelector('.recipe-container');
var $displayContainer = document.querySelector('.container');
var $topBarMenu = document.querySelector('.top-bar');
var $favoritesButtonDisplay = document.querySelector('.favorites-button');
var $favoritesLogo = document.querySelector('.bot-hat-logo');
var $recipeDisplay = document.createElement('div');
var $topMenu = document.querySelector('.top-hat-logo');
var $faveListButton = document.querySelector('.favorites-list');
var $emptyList = document.querySelector('.empty-list');
var $listingTitle = document.querySelector('.listing');
var $faveWording = document.querySelector('.fave');
var $backToFavesList = document.querySelector('.back-button');

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
  $faveRecipeTitle.textContent = entry.title;
  $containerList.appendChild($faveRecipeImg);
  $containerList.appendChild($faveRecipeTitle);
  return $containerList;
}

function renderSelectedRecipe(entry) {
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

  $recipeDisplay.appendChild($recipeRow1);
  $recipeDisplay.appendChild($recipeRow2);
  $recipeDisplay.appendChild($recipeRow3);

  $recipeContainer.appendChild($recipeDisplay);
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
      renderSelectedRecipe(favoritesRecipe);
      data.view = 'recipe-view';
      $topBarMenu.classList.remove('hidden');
      $favoritesButtonDisplay.classList.remove('hidden');
      $favoritesButtonDisplay.addEventListener('click', function (event) {
        favoritesRecipe.entryId = data.nextRecipeId++;
        data.entries.unshift(favoritesRecipe);
        // renderFavoritesList(favoritesRecipe);
        var $faveWording = document.querySelector('.fave');
        var $addWording = document.querySelector('.add');
        var $check = document.querySelector('.fas');
        $favoritesLogo.classList.add('hidden');
        $faveWording.classList.add('hidden');
        $addWording.classList.remove('hidden');
        $check.classList.remove('hidden');
      });
    });
    xhr.send();
  }
});

$topMenu.addEventListener('click', function (event) {
  data.view = 'main';
  window.location.reload();
});

$faveListButton.addEventListener('click', function (event) {
  data.view = 'fave-list';
  // $ul.classList.remove('hidden');
  // $topBarMenu.classList.remove('hidden');
  // $mainPage.classList.add('hidden');

  // if (data.entries.length === 0) {
  //   data.view = 'fave-list';
  //   $recipeContainer.classList.add('hidden');
  //   $emptyList.classList.remove('hidden');
  //   $faveWording.classList.add('hidden');
  // } else {
  //   // var $addWording = document.querySelector('.add');
  //   // var $check = document.querySelector('.fas');
  //   // $addWording.classList.add('hidden');
  //   // $check.classList.add('hidden');
  //   // $favoritesButton.classList.add('hidden');
  //   // $faveWording.classList.add('hidden');
  //   $listingTitle.classList.remove('hidden');
  //   $faveListButton.classList.add('hidden');
  //   $recipeContainer.classList.add('hidden');
  //   // for (var i = 0; i < data.entries.length; i++) {
  //   //   var result = renderFavoritesList(data.entries[i]);
  //   //   $ul.appendChild(result);
  //   // }
  // }
  window.location.reload();
});

$backToFavesList.addEventListener('click', function (event) {
  data.view = 'fave-list';
  window.location.reload();
});

var $deleteButton = document.querySelector('.delete');
var $backToFaves = document.querySelector('.back-to-favorites');

$ul.addEventListener('click', function (event) {
  var $entryIdOnClick = parseInt(event.target.getAttribute('data-entry-id'));
  var $deleter = document.querySelector('.edit-button');
  $backToFavesList.textContent = 'Back to favorites';
  $deleteButton.textContent = 'Delete';
  for (var i = 0; i < data.entries.length; i++) {
    var targetRecipe = data.entries[i].entryId;
    if ($entryIdOnClick === targetRecipe && event.target !== $deleter) {
      var favoritesTitle = document.querySelector('.listing');
      $ul.classList.add('hidden');
      $recipeContainer.classList.remove('hidden');
      renderSelectedRecipe(data.entries[i]);
      favoritesTitle.classList.add('hidden');
      $backToFaves.classList.remove('hidden');
      data.view = 'recipe-view';
      data.editing = $entryIdOnClick;
    }
  }
});

var $modalContainer = document.querySelector('.delete-modal-container');
var $confirmDelete = document.querySelector('.confirm');
var $cancelDelete = document.querySelector('.cancel');

$deleteButton.addEventListener('click', function (event) {
  $modalContainer.classList.remove('hidden');
});

$confirmDelete.addEventListener('click', function (event) {
  for (var i = 0; i < data.entries.length; i++) {
    var targetRecipe = data.entries[i].entryId;
    if (data.editing === targetRecipe) {
      data.entries.splice([i], 1);
    }
  }
  $modalContainer.classList.add('hidden');
  $recipeContainer.remove();
  $mainPage.classList.remove('hidden');
  $topBarMenu.classList.add('hidden');
  $backToFaves.classList.add('hidden');
});

$cancelDelete.addEventListener('click', function (event) {
  $modalContainer.classList.add('hidden');
});

document.addEventListener('DOMContentLoaded', function (event) {
  if (data.view === 'fave-list') {
    if (data.entries.length === 0) {
      data.view = 'fave-list';
      $mainPage.classList.add('hidden');
      $topBarMenu.classList.remove('hidden');
      $recipeContainer.classList.add('hidden');
      $emptyList.classList.remove('hidden');
      $faveWording.classList.add('hidden');
    } else {
      for (let i = 0; i < data.entries.length; i++) {
        const result = renderFavoritesList(data.entries[i]);
        $ul.appendChild(result);
      }
      $mainPage.classList.add('hidden');
      $topBarMenu.classList.remove('hidden');
      $listingTitle.classList.remove('hidden');
    }
  }
});
