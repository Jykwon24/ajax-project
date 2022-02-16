/* exported data */
var data = {
  value: null,
  entries: [],
  editing: null,
  nextRecipeId: 1
};

var dataModel = localStorage.getItem('data-model');

if (dataModel != null) {
  data = JSON.parse(dataModel);
}

window.addEventListener('beforeunload', function (event) {
  var localDataModel = JSON.stringify(data);
  localStorage.setItem('data-model', localDataModel);
});
