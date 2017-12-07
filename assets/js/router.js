angular.module('ngSkol', ['ngRoute'])
 .run(function($rootScope) {
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
		// NProgress
		if (typeof NProgress != 'undefined') {
			NProgress.start();	
		}
	});
	$rootScope.$on('$locationChangeSuccess', function (event, next, current) {
		if (typeof NProgress != 'undefined') {
			NProgress.done();
		}
	});	
 })
 
 .controller('skolMainCtrl', function($scope) {	 
	
 }) 
 .controller('skolController', function($scope, $route, $routeParams, $location) {
     $scope.$route = $route;
     $scope.$location = $location;
     $scope.$routeParams = $routeParams;
	 GENTELELLA.start();
 }) 

.config(['$routeProvider', function($routeProvider){
  $routeProvider
   .when('/Book/:bookId', {
    templateUrl: 'book.html',
    controller: 'skolController',
    resolve: {
      // I will cause a 1 second delay
      delay: function($q, $timeout) {
        var delay = $q.defer();
        $timeout(delay.resolve, 1000);
        return delay.promise;
      }
    }
  })
  .when('/Book/:bookId/ch/:chapterId', {
    templateUrl: 'chapter.html',
    controller: 'skolController'
  })
  .otherwise({
	redirectTo: '/',
	templateUrl: 'content/editor.html',
	controller: 'skolController'
  });

}]);

