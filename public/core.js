var nextMail = angular.module('nextMail', ['ngMaterial']);

nextMail.controller('MainCtrl', ['$scope', '$mdSidenav', 'nextmailfactory', '$log', '$q', '$timeout', function ($scope, $mdSidenav, nextmailfactory, $log, $q, $timeout) {
    $scope.bankSelected = false;
    $scope.simulateQuery = true;
    $scope.bothSelected = false;
    nextmailfactory
        .getBankNames()
        .then(function (response) {
            $scope.bankNames = response.data.banks;
        });

    $scope.getCityList = function (bankName) {
        $scope.bankSelected = false;
        nextmailfactory.getCityList(bankName).then(function (response) {
            $scope.cityList = response.data.cities;
            $scope.bankSelected = true;
        });
        
    }

    $scope.getBranches = function (bankName, cityName) {
        nextmailfactory.getBranches(bankName, cityName).then(function (response) {
            $scope.branches = response.data.branches;
            $scope.bothSelected = true;
        });
    }

}]);


nextMail.factory('nextmailfactory', function ($http) {
    var apiURL = 'https://intense-everglades-72453.herokuapp.com/api'
    var nextmailfactory = {
        getBankNames: function () {
            var promise = $http.get(apiURL + '/banks')
                .then(function (response) {
                    console.log(response);
                    return response;
                });
            return promise;
        },
        getCityList: function (bankName) {
            var promise = $http.get(apiURL + '/city/' + bankName.selected)
                .then(function (response) {
                    console.log(response);
                    return response;
                });
            return promise;
        },
        getBranches: function (bankName, cityName) {
            var promise = $http.post(apiURL + '/branches', {
                bank_name: bankName.selected,
                city: cityName.selected
            }).then(function (response) {
                console.log(response);
                return response;
            });
            return promise;
        }
    }
    return nextmailfactory;
});