var usuarioregistradoapp = angular.module('usuarioregistradoapp', ['ngMap', 'ui.router', 'ngTable', 'ngResource', 'ngCookies', 'pickadate'])

usuarioregistradoapp.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('inicio', {
            url: '/',
            templateUrl: 'usuarioregistrado.html',
            controller: 'usuarioregistradoctrl'
        })
        .state('mesas', {
            url: '/mesas/:IDuser/:login',
            templateUrl: 'vistamesas/vistamesas.html',
            controller: 'vistamesasctrl'
        })
        .state('crearpartida', {
            url: '/crearpartida/:IDmesa/:IDuser/:login',
            templateUrl: 'vistacrearpartida/vistacrearpartida.html',
            controller: 'crearpartidactrl'
        })
        .state('insertarresultados', {
            url: '/insertarresultados/:login',
            templateUrl: 'vistainsertarresultados/vistainsertarresultados.html',
            controller: 'vistainsertarresultadosctrl'
        })
        .state('historial', {
            url: '/vistahistorial/:login',
            templateUrl: 'vistahistorial/vistahistorial.html',
            controller: 'vistahistorialctrl'
        })
        .state('editar', {
            url: '/editar/:id',
            templateUrl: 'vistaeditar/vistaeditar.html',
            controller: 'editarCtrl'
        });
    $urlRouterProvider.otherwise('/');
});

