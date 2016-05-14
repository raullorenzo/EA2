usuarioregistradoapp.controller('vistainsertarresultadosctrl', ['$mdDialog','$stateParams', '$state', '$scope', '$http',function ($mdDialog,$stateParams, $state, $scope, $http) {
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
    $scope.showTabDialog = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                template:'<div><button class="btn btn-medium font-bold"'+
                         'socialshare=""'+
                         'socialshare-provider="facebook"'+
                         'socialshare-type="sharer"'+
                         'socialshare-text="Hola esto es una prueba"'+
                         'socialshare-description="Esot es una peuer"'+
                         'socialshare-url="http://localhost:3000/usuarioregistradoapp/vistainsertarresultados/prueba.html"'+
                         'socialshare-popup-height="300"'+
                         'socialshare-popup-width="400"'+
                         'socialshare-trigger="click">'+
                         '<i class="fa fa-facebook">' +
                         '</i> Share on Facebook (sharer)'+
                         '</button></div>',
                parent: angular.element(document.body),
                targetEvent: ev,
                clickOutsideToClose:true
            })
            .then(function(answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function() {
                $scope.status = 'You cancelled the dialog.';
            });
    };
    function DialogController($scope, $mdDialog) {
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        $scope.answer = function(answer) {
            $mdDialog.hide(answer);
        };
    }

}]);