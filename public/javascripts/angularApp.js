var app = angular.module('flapperNews', ['ui.router']);


app.factory('posts', [function(){
	//factory is essentially a servive in Angular
  	var o = {
    	posts: []
  	};

  	//by returning an object that contains the posts array we can add new objects and methods to our services in the future
  	return o;
}])

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl'
	});

  $urlRouterProvider.otherwise('home');
}]);


//Controller for Main Features -- ie., Adding Post Title and Link and Submit
app.controller('MainCtrl', [
	'$scope',
	'posts',

  function($scope, posts){

	$scope.test = 'Flapper News!';

   	$scope.posts = [
	   {title: 'post 1', upvotes: 5},
	   {title: 'post 2', upvotes: 2},
	   {title: 'post 3', upvotes: 15},
	   {title: 'post 4', upvotes: 9},
	   {title: 'post 5', upvotes: 4}
 ];

$scope.posts = posts.posts;

  $scope.addPost = function(){
  	if(!$scope.title || $scope.title === '') { return; }
    $scope.posts.push({
    title: $scope.title,
    link: $scope.link,
    upvotes: 0
	  });
    $scope.title = '';
    $scope.link = '';

    $scope.posts.push({
	  title: $scope.title,
	  link: $scope.link,
	  upvotes: 0,
	  comments: [
	    {author: 'Joe', body: 'Cool post!', upvotes: 0},
	    {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
	  ]
	});
};

  $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
};

}]);


//Controller for Posts
app.controller('PostsCtrl', [
'$scope',
'$stateParams',
'posts',
function($scope, $stateParams, posts){

	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  $scope.post.comments.push({
	    body: $scope.body,
	    author: 'user',
	    upvotes: 0
	  });
	  $scope.body = '';
	};

}]);

