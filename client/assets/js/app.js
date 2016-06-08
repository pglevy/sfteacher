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

    $http.get("http://localhost:8081/surveys", {params: params, cache:true})
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

  var params = {
    'courseId' : $scope.id
  }
    $http.get("http://localhost:8081/student/course", {params: params, cache:true})
        .success(function(data){
          console.log(data);
          $scope['students'] = data;
        })
        .error(function(data){
          console.log(data);
          $scope['students'] = 'Failed'
        })
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
