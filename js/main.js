var $form = document.getElementById('dropdown');
var $cuisineType = document.querySelector('#cuisine-type');
var $mainPage = document.querySelector('.body-container');
var $ul = document.querySelector('.recipe-display');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  if ($cuisineType.value !== '') {
    $mainPage.classList.add('hidden');
    data.value = $cuisineType.value;
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.spoonacular.com/recipes/random?number=1&apiKey=fa0446638689465c808d67ef46d6f6f0&tags=' + $cuisineType.value);
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      var $recipeBox = document.createElement('li');
      $recipeBox.setAttribute('id', 'currentRecipe');
      var $imgContainer = document.createElement('img');
      $imgContainer.setAttribute('src', xhr.response.recipes[0].image);
      $recipeBox.appendChild($imgContainer);
      $ul.append($recipeBox);
    });
    xhr.send();
  }

});
