angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })
    .state('app.addstudent', {
      url: "/addstudent",
      views: {
        'menuContent' :{
          templateUrl: "templates/addstudent.html",
          controller: 'AddstudentController'
        }
      }
    })
    .state('app.detallesubject', {
      url: "/detallesubject/:name",
      views: {
        'menuContent' :{
          templateUrl: "templates/detallesubject.html",
          controller: 'DetallesubjectController'
        }
      }
    })
    .state('app.subject', {
      url: '/subject',
      views: {
      'menuContent': {
        templateUrl: 'templates/subject.html',
        controller: 'SubjetcController'
        }
      }
    });
    $urlRouterProvider.otherwise('/app/subject');
});