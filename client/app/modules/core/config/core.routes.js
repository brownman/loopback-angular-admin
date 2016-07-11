(function () {
  'use strict';
  angular
    .module('com.module.core')
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
        .state('router', {
          url: '/router',
          template: '<div class="lockscreen" style="height: 100%"></div>',
          controller: 'RouteCtrl'
        })
        .state('error', {
          url: '/error',
          template: '<div class="text-center alert alert-danger" style="margin: 100px">An error occurred.</div>'
        })

        .state('app', {
          abstract: true,
          url: '',
          templateUrl: 'modules/core/views/app.html',
          controller: 'AppCtrl'
        })
        .state('app.public', {
          abstract: true,
          url: '/',
          templateUrl: 'modules/core/views/public/home.html',
          controller: 'PublicBaseCtrl'

        })
        .state('app.admin', {
          abstract: true,
          url: '/admin',
          templateUrl: 'modules/core/views/admin.html',
          controller: 'AdminBaseCtrl',
          resolve : {
            user: [
              'AppAuth',
              function (AppAuth) {
                return AppAuth.requireUserRole('admin');
              }
            ],
          }


        })
        .state('app.admin.home', {
          url: '',
          templateUrl: 'modules/core/views/admin/home.html',
        });
      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/router');
    });

})();
