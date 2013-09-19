var Adapter, InfoController, app, controller, navigation, route;

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
    $http.jsonp("" + this.adapter.path + "shop/523b2b7194e535b36cbe68dd?callback=JSON_CALLBACK").success(function(data) {
      return _this.$scope.shop = data;
    });
    this.$scope.title = "InfoController";
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
