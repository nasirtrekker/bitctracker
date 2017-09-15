
angular.module('App')
  //registers controller and injects services
  .controller('DetailController', function ($scope, $stateParams, $state, Currencies) {

    //loops over each currency to find requested currency and stores it on scope
    angular.forEach(Currencies, function (currency) {
      if (currency.code === $stateParams.currency) {
        $scope.currency = currency;
      }
    });

    // if currency and ticker data isn't set, return to rates view
    if (angular.isUndefined($scope.currency.ticker)) {
      $state.go('tabs.rates');
    }

  });
