//Bitcoin exchange rate tracker
//declares app module and includes ionic module
angular.module('App', ['ionic','highcharts','highcharts-ng'])
  //declare config() method and injects services
  .config(function ($stateProvider,$urlRouterProvider) {
    //declare a single state of the app
    $stateProvider
      .state('tabs', {
        url:'/tabs',
        // updates tab state to be abstract since we always want to use a child
        abstract:true,
        templateUrl: 'views/tabs/tabs.html'
      })
      // declares tabs.rates state using dot notation
    .state('tabs.rates', {
      // declares URL for route; it's child route, so it appends this to URL of parent
      url: '/rates',
      views: {
        'rates-tab': {
          templateUrl: 'views/rates/rates.html',
          controller: 'RatesController'
        }
      }

    })

      //history view declaration
      .state('tabs.history',{
        url: '/history?currency',
        views: {
          'history-tab': {
            templateUrl: 'views/history/history.html'
            controller: 'HistoryController'
          }
        }
      })
// currency view declaration
      .state('tabs.currencies',{
        url: '/currencies',
        views: {
          'currencies-tab': {
            templateUrl: 'views/currencies/currencies.html'
          }
        }
      })

      //detail state declaration

  .state('tabs.detail', {
      url: '/detail/:currency',
      views: {
        'rates-tab': {
          templateUrl: 'views/detail/detail.html',
          controller: 'DetailController'
        }
      }
    });

    //set default route
    $urlRouterProvider.otherwise('/tabs/rates');
  })

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .factory('Currencies', function () {
    return [
      { code: 'AUD', text: 'Australian Dollar', selected: true },
      { code: 'BRL', text: 'Brazilian Real', selected: false },
      { code: 'CAD', text: 'Canadian Dollar', selected: true },
      // { code: 'CHF', text: 'Swiss Franc', selected: false }, Disabled CHF because the API no longer returns it
      { code: 'CNY', text: 'Chinese Yuan', selected: true},
      { code: 'EUR', text: 'Euro', selected: true },
      { code: 'GBP', text: 'British Pound Sterling', selected: true },
      { code: 'IDR', text: 'Indonesian Rupiah', selected: false },
      { code: 'ILS', text: 'Israeli New Sheqel', selected: false },
      { code: 'MXN', text: 'Mexican Peso', selected: true },
      // { code: 'NOK', text: 'Norwegian Krone', selected: false },
      { code: 'NZD', text: 'New Zealand Dollar', selected: false },
      { code: 'PLN', text: 'Polish Zloty', selected: false },
      // { code: 'RON', text: 'Romanian Leu', selected: false },
      { code: 'RUB', text: 'Russian Ruble', selected: true },
      { code: 'SEK', text: 'Swedish Krona', selected: false },
      { code: 'SGD', text: 'Singapore Dollar', selected: false },
      { code: 'USD', text: 'United States Dollar', selected: true },
      { code: 'ZAR', text: 'South African Rand', selected: false }
    ];
  });
