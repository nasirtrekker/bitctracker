angular.module('App')
  //declares RatesController and injects services used
  .controller('RatesController', function ($scope, $http, $ionicPopover, Currencies) {

    // immediately set data from Currencies service on scope

    $scope.currencies = Currencies;

    //Declares a popover from template URL and assigns parent scope as scope

    $ionicPopover.fromTemplateUrl('views/rates/help-popover.html', {
      scope: $scope,
      //when template has loaded assign popover to scope
    }).then(function (popover) {
      $scope.popover = popover;
    });
    //Scope method to open popover;
    $scope.openHelp = function($event) {
      //requires $event to be passed
      $scope.popover.show($event);
    };

    $scope.$on('$destroy', function() {
      $scope.popover.remove();
    });

    // scope method to load data that can be called on demand
    $scope.load = function () {
      // Makes HTTP request to BitcoinAverage for current rates
      $http.get('https://apiv2.bitcoinaverage.com/ticker/all').success(function (tickers) {
        // loops over list of currencies and stores ticker data on Currencies services
        angular.forEach($scope.currencies, function (currency) {
          currency.ticker = tickers[currency.code];
          //converts timestamp from response to valid JavaScript data object
          currency.ticker.timestamp = new Date(currency.ticker.timestamp);
        });
        //chains a finally() method that fires after HTTP request has completed, regardless success or failure
      }).finally(function () {
        //broadcasts the scroll.refreshComplete event so ionRefresher knows to close
        $scope.$broadcast('scroll.refreshComplete');
      });
    };

    //triggers a load when controller is first loaded
    $scope.load();
  });
