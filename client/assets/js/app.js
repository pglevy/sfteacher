(function() {
  'use strict';

  angular.module('application', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .controller('CourseController',
    ["$scope", "$state", "$http",function($scope, $state, $http){

    $http.get("http://localhost:8081/courses", {cache:true})
        .success(function(data){
          console.log(data);
          $scope['courses'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['courses'] = 'Failed'
        })
  }])
  .controller('SurveyController',
    ["$scope", "$state", "$http",function($scope, $state, $http){

    $http.get("http://localhost:8081/surveys", {cache:true})
        .success(function(data){
          console.log(data);
          $scope['surveys'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['surveys'] = 'Failed'
        })
  }])

    .controller('AttendanceController',
    ["$scope", "$state", "$http",function($scope, $state, $http){

  $scope.id = ($state.params.id || '');
  $scope.attendance = ($state.params.attendance || '');
  $scope.studentId = ($state.params.studentId || '');
  $scope.post = ($state.params.post || false);

  console.log("is studentId? "+$scope.studentId);
  var params = {};

    if($scope.post){

    $http.headers['Access-Control-Allow-Origin'] = '*';
    $http.headers["Access-Control-Allow-Headers"] = "X-Requested-With";
    $http.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS, PUT';

    params = {
    'status' : $scope.attendance,
    'studentId' : $scope.studentId
    };

    $http.post("http://localhost:8081/updateAttendance", {withCredentials: true, params: params, cache:true})
        .success(function(data){
          console.log(data);

        })
        .error(function(data){
          console.log(data);

        })
     }else{

    params = {
     'courseId' : $scope.id
    };

    $http.get("http://localhost:8081/student/course", {params: params, cache:true})
        .success(function(data){
          console.log(data);
          $scope['students'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['students'] = 'Failed'
        })
    }
  }])
    .config(config)
    .run(run)
  ;


  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
