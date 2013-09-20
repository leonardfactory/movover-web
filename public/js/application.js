var Adapter, InfoController, app, controller, navigation, route,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

navigation = angular.module('navigation', []);

controller = angular.module('controller', ['templates-main']);

route = angular.module('route', ['templates-main']);

app = angular.module('app', ['navigation', 'controller', 'route']);

app.controller('InfoController', InfoController = (function() {
  function InfoController($scope, $http, adapter) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.adapter = adapter;
    this.$scope.master = {};
    this.$scope.errors = [];
    this.$scope.status = '';
    $http.get("/api/shop/523b2b7194e535b36cbe68dd").success(function(data) {
      _this.$scope.shop = data;
      _this.$scope.master = data;
      return console.log(data);
    });
    this.$scope.title = "InfoController";
    this.$scope.reset = function() {
      return _this.$scope.shop = angular.copy(_this.$scope.master);
    };
    this.$scope.update = function() {
      return $http.post("/api/shop/523b2b7194e535b36cbe68dd", _this.$scope.shop).success(function(data) {
        _this.$scope.errors = [];
        _this.$scope.master = angular.copy(_this.$scope.shop);
        return _this.$scope.status = 'success';
      }).error(function(data) {
        var error, _i, _len, _ref, _results;
        _this.$scope.status = 'error';
        _this.$scope.errors = [];
        _ref = data.error;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          error = _ref[_i];
          _results.push(_this.$scope.errors.push(error.param));
        }
        return _results;
      });
    };
    this.$scope.isInvalid = function(param) {
      return __indexOf.call(_this.$scope.errors, param) >= 0;
    };
  }

  return InfoController;

})());

angular.module('navigation').directive('navigationBar', function($location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      return scope.$watch(function() {
        return $location.path();
      }, function(newValue, oldValue) {
        var _this = this;
        return $('li[data-match-route]', element).each(function(k, li) {
          var pattern, regexp, _li;
          _li = angular.element(li);
          pattern = _li.attr('data-match-route');
          regexp = new RegExp('^' + pattern + '$', ['i']);
          if (regexp.test(newValue)) {
            return _li.addClass('active');
          } else {
            return _li.removeClass('active');
          }
        });
      });
    }
  };
});

route.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/info', {
      templateUrl: 'info.tpl.html',
      controller: 'InfoController'
    });
    return $routeProvider.otherwise({
      redirectTo: '/info'
    });
  }
]);

app.service('adapter', Adapter = (function() {
  function Adapter($http) {
    this.$http = $http;
    this.path = 'http://localhost:8080/';
  }

  return Adapter;

})());
