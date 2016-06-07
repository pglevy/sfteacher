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

var params = {
    "courseId": "SCI-BIOL202-600-201602"
}
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
