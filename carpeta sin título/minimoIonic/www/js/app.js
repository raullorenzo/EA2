
var _base = "http://localhost:3000";
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, $ionicLoading, $location, $timeout) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  })
  $rootScope.authktd = false;
  $rootScope.showLoading = function (msg) {
    $ionicLoading.show({
      template: msg || 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  }
  $rootScope.hideLoading = function () {
    $ionicLoading.hide();
  };
  $rootScope.toast = function (msg) {
    $rootScope.showLoading(msg);
    $timeout(function () {
      $rootScope.hideLoading();
    }, 2000);
  };
  $rootScope.toast2 = function (msg) {
    $rootScope.showLoading(msg);
    $timeout(function () {
      $rootScope.hideLoading();
    }, 1000);
  };
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state) {

})

.controller('AddstudentController', ['$rootScope', '$state', '$stateParams', '$scope', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $stateParams, $scope, $http, $ionicModal, $ionicHistory) {
  $http.get(_base +'/allsubject').success(function (data) {
      $scope.subjects = data;
    }).error(function(data){
  })
  $http.get(_base + '/allstudent').success(function (data) {
      $scope.students = data;
  });
  $scope.selectSubject = function (sub) {
    subject = sub;
    console.log(subject);
  };
  $scope.selectStudent = function (stu) {
    student = stu;
    console.log(student);
  };
  $scope.addStudentToSubject = function () {
    console.log('/addstudenttosubject/'+ subject+'/'+student);
    $http.put(_base+'/addstudenttosubject/'+ subject+'/'+student,null).success(function (data){
      $rootScope.toast2('Student añadido!!');
    })
  };
}])

.controller('DetallesubjectController', ['$rootScope', '$state', '$stateParams', '$scope', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $stateParams, $scope, $http, $ionicModal, $ionicHistory) {
  var name = $stateParams.name;
  console.log("nombre: "+name);
  $http.get(_base + '/subject/'+ name).success(function (data) {
      var subject1= $stateParams.name;
      $scope.subject = subject1;
      var students = data[0].students;
      for (var i=0, l=students.length, bar=[]; i<l; i++ ){
          bar[i] = students[i];
          console.log(bar[i].name);
          $scope.students=students;
      }    
  });
}])

.controller('SubjetcController', ['$rootScope', '$state', '$scope', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $http, $ionicModal, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function(){   
    $http.get(_base +'/allsubject').success(function (data) {
        $rootScope.toast2('Importando Subjects del servidor...');
        $scope.subjects = data;
      }).error(function(data){
    })
    $scope.detalleSubject = function(name){
      console.log(name);
      $state.go('app.detallesubject', {
          name:name
      });
    };
  });
}])

.controller('StudentController', ['$rootScope', '$state', '$scope', '$http', '$ionicModal', '$ionicHistory', function ($rootScope, $state, $scope, $http, $ionicModal, $ionicHistory) {
    
}]);
