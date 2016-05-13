usuarioregistradoapp.controller('crearpartidactrl', ['$stateParams', '$state', '$http', '$scope', '$cookies', 'dateFilter', function ($stateParams, $state, $http, $scope, $cookies, dateFilter) {
    var IDuser = $stateParams.IDuser;
    var IDmesa = $stateParams.IDmesa;
    var login = $stateParams.login;
    var Fecha = {};
    var partida = new Object();

    $scope.mostrarhorarios = false;
    $scope.mostrartitulo = true;
    $scope.minDate = new Date();

    $scope.$watch("date", function (newValue, oldValue) {


        $scope.date = newValue;

        if (newValue === oldValue) {
            return;
        }
        $http.get('/partida/ObtenerPartidaPorFechaymesa/' + IDmesa + '/' + newValue).success(function (data) {
            $scope.mostrarhorarios = true;
            $scope.mostrartitulo = false;
            console.log(data);
            partida = data[0];
            $scope.partida = partida;
            Fecha = newValue;
        });

    });
    $scope.crearpartida = function (p) {
        $http.get('/partida/ObtenerPartidaPorFechaymesa/' + IDmesa + '/' + Fecha).success(function (data) {
            console.log(data);
            if (data == '') {
                console.log('entro en crear partida');
                var box = 
                ({
                    IDmesa: IDmesa, 
                    FechaPartida: Fecha, 
                    IDcreador: IDuser, 
                    login: login, 
                    horario: p
                });
                $http.post('/partida/CrearPartida', box).success(function (data) {
                    console.log(data);
                    partida = data;
                    $scope.partida = partida;
                });
            }
            else {
                console.log('entro en asignar hora');
                var box1 = 
                ({
                    IDcreador: IDuser, 
                    login: login, 
                    horario: p
                });
                $http.put('/partida/AsignarHoraPartidaporID/' + partida._id, box1).success(function (data) {
                    console.log(data);
                    partida = data;
                    $scope.partida = partida;

                });
            }
        });
    };
    $scope.unirseapartida = function (p) {
        console.log(p);
        var box2 = ({
            IDinvitado: IDuser, 
            login: login, 
            horario: p
        });
        $http.put('/partida/UnirsePartida/' + partida._id, box2).success(function (data) {
            console.log(data);
            partida = data;
            $scope.partida = partida;
        });
    };
}]);

