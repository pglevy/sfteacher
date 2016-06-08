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

    $http.get("http://localhost:8081/courses", {cache:false})
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
    ["$scope", "$state", "$http", "$location",function($scope, $state, $http, $location){

    var params = {
      courseId : ($state.params.id || 'SCI-BIOL202-600-201602')
    }
    $http.get("http://localhost:8081/surveys", {params: params,cache:false})
        .success(function(data){
          console.log(data);
          $scope['students'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['students'] = 'Failed'
        })
  }])

    .controller('AttendanceController',
    ["$scope", "$state", "$http",function($scope, $state, $http){

  $scope.courseId = ($state.params.id || '');
  $scope.id = ($state.params.id || '');
  $scope.attendance = ($state.params.attendance || '');
  $scope.studentId = ($state.params.studentId || '');
  $scope.post = ($state.params.post || false);

  var params = {};

    if($scope.post == "true"){
    params = {
      status : $scope.attendance,
      studentId : $scope.studentId,
      courseId :$scope.courseId
    };

    $http.get("http://localhost:8081/updateAttendance", {params: params, cache:false})
        .success(function(data){
          console.log(data);
          $scope['students'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['students'] = 'Failed'
        })
     }else{

    params = {
      courseId : ($scope.id || 'SCI-BIOL202-600-201602')
    };

    $http.get("http://localhost:8081/student/course", {params: params, cache:false})
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


  config.$inject = ['$urlRouterProvider', '$locationProvider','$httpProvider'];

  function config($urlProvider, $locationProvider, $httpProvider) {
    $urlProvider.otherwise('/');

    // We need to setup some parameters for http requests
    // These three lines are all you need for CORS support
    $httpProvider.defaults.useXDomain = false;
    $httpProvider.defaults.withCredentials = false;
//     delete $httpProvider.defaults.headers.common['X-Requested-With'];
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';

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
