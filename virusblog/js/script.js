/* global angular blogPosts*/
var app = angular.module("displayPosts", []);

app.controller("myCtrl", function($scope) {
    $scope.blogPosts = blogPosts;
});
app.controller("myCtrl2", function($scope) {
    $scope.blogPosts = blogPosts;
});
