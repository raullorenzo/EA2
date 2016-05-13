usuarioregistradoapp.controller('vistainsertarresultadosctrl', ['$stateParams', '$state', '$scope', '$http',function ($stateParams, $state, $scope, $http) {
    var partidas= new Array();
    var login = $stateParams.login;
    console.log('entro');
    $http.get('/partida/ObtenerPartidasconestadodos/'+login).success(function (data) {



        partidas=data;
        console.log(partidas);
        $scope.partidas=partidas;
    });
    $scope.insertarresultados= function(p,id,juegoscreador,juegosinvitado){
        console.log(p,id,juegoscreador,juegosinvitado);
        var box = ({juegoscreador: juegoscreador, juegosinvitado: juegosinvitado, horario: p});
        console.log(box);

        $http.put('/partida/insertartarresultados/'+id,box).success(function (data)
        {
            $http.get('/partida/ObtenerPartidasconestadodos/'+login).success(function (data) {
                partidas=data;
                console.log(partidas);
                $scope.partidas=partidas;
            });
        });

    }

}]);