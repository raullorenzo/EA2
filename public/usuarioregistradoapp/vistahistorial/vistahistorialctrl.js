'use strict';

usuarioregistradoapp.factory("Historiales", function ($resource, $stateParams) {
    return $resource('/historial/ObtenerHisorialesPaginados'); //la url donde queremos consumir
});
usuarioregistradoapp.controller('vistahistorialctrl', ['$state', '$http', '$scope', '$location', 'Historiales', '$stateParams', 'ngTableParams', function ($state, $http, $scope, $location, Usuarios, $stateParams, ngTableParams) {

    var params;
    var settings;
    params =
    {
        page: 1,
        count: 5
    };
    settings =
    {
        total: 0,
        counts: [5, 10, 25, 50, 100],
        filterDelay: 100,
        getData: function ($defer, params) {
            Usuarios.get(params.url(), function (response) {
                params.total(response.total);
                $defer.resolve(response.results);

            });
        }
    };

    $scope.tableParams = new ngTableParams(params, settings);
    $scope.demotableParams = new ngTableParams(params, settings);
    console.log($scope.tableParams);



}]);