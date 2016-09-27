var app = angular.module('contactListApp', []);

app.service('contactListSerice', ['$http', function($http) {

  var service = {
    getContactListData : getContactListData
  };

  return service;

  function getContactListData() {
    $http.get('../json/contactList.json')
      .success(function(respData) {
        debugger;
      })
      .error(function(errData) {
        console.log("Inside error ", errData);
      })
  }

}]);