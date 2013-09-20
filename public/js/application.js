var Adapter, Auth, FeedController, InfoController, LoginController, NavigationController, app, controller, navigation, route,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

navigation = angular.module('navigation', []);

controller = angular.module('controller', ['templates-main']);

route = angular.module('route', ['templates-main']);

app = angular.module('app', ['navigation', 'controller', 'route', 'ngCookies']);

app.controller('FeedController', FeedController = (function() {
  function FeedController($scope, $http) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.$scope.feed = [];
    $http.get('/api/area/522495d887789a8a0350e81a/actions').success(function(data) {
      var action, actions, _i, _len;
      actions = data.actions;
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        $http.get("/api/user/" + action.subject + "/profile").success(function(userData) {
          console.log(userData);
          return action.user = userData.user.username;
        });
        $http.get("/api/user/" + action.subject + "/avatar/72").success(function(userAvatar) {
          return action.avatar = userAvatar.url;
        });
      }
      return _this.$scope.feed = actions;
    });
  }

  return FeedController;

})());

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

app.controller('LoginController', LoginController = (function() {
  function LoginController($scope, $location, $http, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$location = $location;
    this.$http = $http;
    this.$scope.user = {
      username: '',
      password: ''
    };
    this.$scope.error = false;
    this.$scope.checkUser = true;
    auth.isUserLogged();
    this.$scope.$watch(function() {
      return auth.user.logged;
    }, function(newVal, oldVal) {
      if (newVal === true) {
        return _this.$location.path('/info');
      }
    });
    this.$scope.$watch(function() {
      return auth.checking;
    }, function() {
      return _this.$scope.checkUser = auth.checking;
    });
    this.$scope.login = function() {
      return $http.post("/api/user/login", _this.$scope.user).success(function(data) {
        auth.user.logged = true;
        auth.user.id = data._id;
        return _this.$location.path('/info');
      }).error(function(data) {
        return _this.$scope.error = true;
      });
    };
  }

  return LoginController;

})());

app.controller('NavigationController', NavigationController = (function() {
  function NavigationController($scope, $http, $location, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    this.$scope.logout = function() {
      if (auth.user.logged) {
        return $http.get("/api/user/logout").success(function(data) {
          auth.user.logged = false;
          return $location.path('/login');
        }).error(function(data) {
          return console.log(data);
        });
      }
    };
  }

  return NavigationController;

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

angular.module('navigation').directive('userLogged', function(auth) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs, controller) {
      return scope.$watch(function() {
        return auth.user.logged;
      }, function(newValue, oldValue) {
        return element.css('display', newValue === true ? 'block' : 'none');
      });
    }
  };
});

route.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/info', {
      templateUrl: 'info.tpl.html',
      controller: 'InfoController',
      access: {
        isFree: false
      }
    });
    $routeProvider.when('/login', {
      templateUrl: 'login.tpl.html',
      controller: 'LoginController',
      access: {
        isFree: true
      }
    });
    $routeProvider.when('/feed', {
      templateUrl: 'feed.tpl.html',
      controller: 'FeedController',
      access: {
        isFree: false
      }
    });
    return $routeProvider.otherwise({
      redirectTo: '/login'
    });
  }
]).run(function($rootScope, $location, auth) {
  return $rootScope.$on('$routeChangeStart', function(event, curr, next) {
    if ((curr.access != null) && !curr.access.isFree && !auth.user.logged) {
      return $location.path('/login');
    }
  });
});

app.service('adapter', Adapter = (function() {
  function Adapter($http) {
    this.$http = $http;
    this.path = 'http://localhost:8080/';
  }

  return Adapter;

})());

app.service('auth', Auth = (function() {
  function Auth($http) {
    this.$http = $http;
    this.isUserLogged = __bind(this.isUserLogged, this);
    this.user = {
      logged: false,
      id: null
    };
    this.checking = false;
  }

  Auth.prototype.isUserLogged = function() {
    var _this = this;
    this.checking = true;
    return this.$http.get("/api/user/check").success(function(data) {
      _this.user.logged = true;
      _this.user.id = data._id;
      return _this.checking = false;
    }).error(function(data) {
      return _this.checking = false;
    });
  };

  return Auth;

})());
