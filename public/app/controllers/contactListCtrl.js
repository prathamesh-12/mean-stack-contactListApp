var app = angular.module('contactListApp', []);

app.controller('contactListCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.contactData = null;

	var appendDataIntoTable = function() {
		$http.get('/contactlist')
		.success(function(respData) {
			$scope.contactData = respData && respData || [];
		})
		.error(function(errData) {
			console.log("ERROR-----", errData);
		})
	}
	
	appendDataIntoTable();

	$scope.addContact = function() {
		$http.post('/contactlist', $scope.contact)
			.success(function(respData) {
				appendDataIntoTable();
				$scope.clearContact();
			})
			.error(function(errData) {
				console.log("POST ERROR-----", errData);
			})
	}

	$scope.deleteContact = function(id) {
		$http.delete('/contactlist'+id)
			.success(function(respData) {
				respData && appendDataIntoTable();
			}) 
			.error(function(errData) {
				console.log("DELETE ERROR ", errData);
			})
	}

	$scope.editContact = function(id) {
		$http.get('/contactlist'+id)
			.success(function(respData) {
				$scope.contact = respData;
			})
			.error(function(errData) {
				console.log(errData);
			})
	}

	/*$scope.updateContact = function() {
		$scope.put('/contactlist')
	}*/

	$scope.clearContact = function() {
		$scope.contact = "";
	}
}]);