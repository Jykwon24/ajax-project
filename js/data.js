/* exported data */
var data = {
  value: null,
  entries: [],
  editing: null,
  nextRecipeId: 1,
  view: 'main'
};

var dataModel = localStorage.getItem('data');

if (dataModel != null) {
  data = JSON.parse(dataModel);
}

window.addEventListener('beforeunload', function (event) {
  var localDataModel = JSON.stringify(data);
  localStorage.setItem('data', localDataModel);
});
