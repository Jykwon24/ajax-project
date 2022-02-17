var $form = document.getElementById('dropdown');
var $cuisineType = document.querySelector('#cuisine-type');
var $mainPage = document.querySelector('.body-container');
// var $ul = document.querySelector('.recipe-display');
var $displayContainer = document.querySelector('.container');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if ($cuisineType.value !== '') {
    $mainPage.classList.add('hidden');
    data.value = $cuisineType.value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spoonacular.com/recipes/random?number=1&apiKey=fa0446638689465c808d67ef46d6f6f0&tags=' + $cuisineType.value);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      // var $recipeTitleBox = document.createElement('div');

      var $recipeImgBox = document.createElement('div');
      $recipeImgBox.setAttribute('id', 'currentRecipe');

      var $recipeInstBox = document.createElement('div');
      var $recipeIngredientList = document.createElement('ul');

      var $imgContainer = document.createElement('img');
      $imgContainer.setAttribute('class', 'recipe-img');
      $imgContainer.setAttribute('src', xhr.response.recipes[0].image);
      $recipeImgBox.appendChild($imgContainer);
      for (var i = 0; i < xhr.response.recipes[0].extendedIngredients.length; i++) {
        var ingredients = document.createElement('li');
        ingredients.textContent = xhr.response.recipes[0].extendedIngredients[i].original;
        $recipeIngredientList.appendChild(ingredients);
      }
      $recipeInstBox.appendChild($recipeIngredientList);
      $displayContainer.appendChild($recipeImgBox);
      $displayContainer.appendChild($recipeInstBox);
    });
    xhr.send();
  }

});
