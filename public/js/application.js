var Adapter, Auth, FeedController, InfoController, LoginController, NavigationController, ShopController, app, controller, navigation, route,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

navigation = angular.module('navigation', []);

controller = angular.module('controller', ['templates-main']);

route = angular.module('route', ['templates-main']);

app = angular.module('app', ['navigation', 'controller', 'route', 'ngCookies']);

app.config(function($httpProvider) {
  return $httpProvider.defaults.useXDomain = true;
});

app.controller('FeedController', FeedController = (function() {
  function FeedController($scope, $http, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.auth = auth;
    this.$scope.feed = [];
    $http.get('/api/area/522495d887789a8a0350e81a/actions', this.auth.getConfigHeaders()).success(function(data) {
      var action, actions, _i, _len;
      actions = data.actions;
      for (_i = 0, _len = actions.length; _i < _len; _i++) {
        action = actions[_i];
        $http.get("/api/user/" + action.subject + "/profile", _this.auth.getConfigHeaders()).success(function(userData) {
          console.log(userData);
          return action.user = userData.user.username;
        });
        $http.get("/api/user/" + action.subject + "/avatar/60", _this.auth.getConfigHeaders()).success(function(userAvatar) {
          return action.avatar = userAvatar.url;
        });
      }
      return _this.$scope.feed = actions;
    });
  }

  return FeedController;

})());

app.controller('InfoController', InfoController = (function() {
  function InfoController($scope, $http, adapter, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.adapter = adapter;
    this.auth = auth;
    this.$scope.master = {};
    this.$scope.errors = [];
    this.$scope.status = '';
    $http.get("/api/shop/523b2b7194e535b36cbe68dd", this.auth.getConfigHeaders()).success(function(data) {
      _this.$scope.shop = data;
      return _this.$scope.master = data;
    });
    this.$scope.title = "InfoController";
    this.$scope.reset = function() {
      return _this.$scope.shop = angular.copy(_this.$scope.master);
    };
    this.$scope.update = function() {
      return $http.post("/api/shop/523b2b7194e535b36cbe68dd", _this.$scope.shop, _this.auth.getConfigHeaders()).success(function(data) {
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
  function LoginController($scope, $location, $http, $cookies, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$location = $location;
    this.$http = $http;
    this.$cookies = $cookies;
    this.$scope.user = {
      username: '',
      password: '',
      grant_type: 'password'
    };
    this.$scope.remember = false;
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
      return $http.post("/api/user/token", _this.$scope.user).success(function(data) {
        auth.user.logged = true;
        auth.user.token = data.access_token;
        return $http.get("/api/user/check", auth.getConfigHeaders()).success(function(data) {
          auth.user.id = data._id;
          if (_this.$scope.remember) {
            _this.$cookies.token = auth.user.token;
          }
          return _this.$location.path('/info');
        }).error(function(data) {
          return _this.$scope.error = true;
        });
      }).error(function(data) {
        return _this.$scope.error = true;
      });
    };
  }

  return LoginController;

})());

app.controller('NavigationController', NavigationController = (function() {
  function NavigationController($scope, $http, $location, auth, $cookies) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.$location = $location;
    this.$cookies = $cookies;
    this.$scope.logout = function() {
      if (auth.user.logged) {
        auth.user.logged = false;
      }
      if (_this.$cookies.token) {
        delete _this.$cookies.token;
      }
      return $location.path('/login');
    };
  }

  return NavigationController;

})());

app.controller('ShopController', ShopController = (function() {
  function ShopController($scope, $http, auth) {
    var _this = this;
    this.$scope = $scope;
    this.$http = $http;
    this.auth = auth;
    this.$scope.added = false;
    this.$scope.refreshShowcase = function() {
      return _this.$http.get("/api/shop/523b2b7194e535b36cbe68dd/showcase", _this.auth.getConfigHeaders()).success(function(data) {
        var item, _i, _len, _ref, _results;
        _this.$scope.showcase = data.showcase;
        _ref = _this.$scope.showcase;
        _results = [];
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          _results.push(item.disabled = false);
        }
        return _results;
      });
    };
    this.$scope.refreshShowcase();
    this.$scope.getBorderClass = function(item) {
      if (item.editing) {
        return 'half';
      } else {
        return 'complete';
      }
    };
    this.$scope.getImageURL = function(item) {
      if (item.image != null) {
        return item.image;
      } else {
        return $.cloudinary.url('shop_item_' + item._id, {
          width: 200,
          height: 200,
          format: 'jpg'
        });
      }
    };
    this.$scope.$watch(function() {
      return _this.$scope.added;
    }, function(newVal, oldVal) {
      if (newVal === true) {
        _this.$scope.showcase.push({
          disabled: false,
          image: _this.$scope.file,
          shop: "523b2b7194e535b36cbe68dd",
          editing: true
        });
        return _this.$scope.added = false;
      }
    });
    this.$scope.startEditing = function(item) {
      var shopItem, _i, _len, _ref;
      if (!item.editing) {
        _ref = _this.$scope.showcase;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          shopItem = _ref[_i];
          shopItem.editing = false;
        }
        return item.editing = true;
      }
    };
    this.$scope.save = function(item) {
      if (item.image != null) {
        item.disabled = true;
        return _this.$http.post("/api/shopItem", item, _this.auth.getConfigHeaders()).success(function(data) {
          item._id = data.id;
          return _this.$scope.uploadImage(item);
        }).error(function(data) {
          return item.disabled = false;
        });
      } else {
        return false;
      }
    };
    this.$scope.uploadImage = function(item) {
      return _this.$http.get("/api/shopItem/" + item._id + "/signature", _this.auth.getConfigHeaders()).success(function(data) {
        var dataItem, dataName, formData;
        formData = new FormData();
        for (dataName in data) {
          dataItem = data[dataName];
          formData.append(dataName, dataItem);
        }
        formData.append('file', item.image);
        return $.ajax({
          url: "https://api.cloudinary.com/v1_1/hysf85emt/image/upload",
          data: formData,
          processData: false,
          contentType: false,
          type: 'POST',
          success: function(data) {
            delete item.image;
            item.disabled = false;
            return _this.$scope.$apply();
          }
        });
      }).error(function(data) {
        item.disabled = false;
        return console.log(data);
      });
    };
    this.$scope["delete"] = function(item) {
      item.disabled = true;
      if (item.image != null) {
        _this.$scope.showcase = _this.$scope.showcase.filter(function(si) {
          return si !== item;
        });
        return item.disabled = false;
      } else {
        return _this.$http["delete"]("/api/shopItem/" + item._id, _this.auth.getConfigHeaders()).success(function(data) {
          item.disabled = false;
          _this.$scope.showcase = _this.$scope.showcase.filter(function(si) {
            return si._id !== data._id;
          });
          return console.log(data);
        }).error(function(data) {
          item.disabled = false;
          return console.log(data);
        });
      }
    };
  }

  return ShopController;

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

angular.module('app').directive('droppable', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('drop', function(event) {
        var file, reader;
        if (event != null) {
          event.preventDefault();
        }
        if (event != null) {
          event.stopPropagation();
        }
        element.removeClass('hover');
        file = event.originalEvent.dataTransfer.files[0];
        reader = new FileReader();
        reader.onload = function(evt) {
          return scope.$apply(function() {
            scope.added = true;
            scope.file = evt.target.result;
            return scope.fileName = file.name;
          });
        };
        reader.readAsDataURL(file);
        return false;
      });
      element.bind('dragover', function(event) {
        if (event != null) {
          event.stopPropagation();
        }
        if (event != null) {
          event.preventDefault();
        }
        event.originalEvent.dataTransfer.dropEffect = 'copy';
        return false;
      });
      element.bind('dragenter', function(event) {
        return element.addClass('hover');
      });
      return element.bind('dragleave', function(event) {
        return element.removeClass('hover');
      });
    }
  };
});

app.filter('human', function() {
  return function(date) {
    return moment(date).lang('it').fromNow();
  };
});

app.filter('imageUrl', function() {
  return function(id) {
    return "http://res.cloudinary.com/hysf85emt/image/upload/h_700,w_700/action_" + id + ".jpg";
  };
});

route.config([
  '$routeProvider', function($routeProvider) {
    $routeProvider.when('/info', {
      templateUrl: 'info.tpl.html',
      controller: 'InfoController',
      navName: 'Informazioni Generali',
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
      navName: 'Attività dell\'Area',
      access: {
        isFree: false
      }
    });
    $routeProvider.when('/shop', {
      templateUrl: 'shop.tpl.html',
      controller: 'ShopController',
      navName: 'Vetrina e Prodotti',
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
      $location.path('/login');
    }
    return $rootScope.currentPage = curr.navName != null ? curr.navName : 'Informazioni Generali';
  });
});

app.service('adapter', Adapter = (function() {
  function Adapter($http) {
    this.$http = $http;
  }

  return Adapter;

})());

app.service('auth', Auth = (function() {
  function Auth($http, $cookies) {
    this.$http = $http;
    this.$cookies = $cookies;
    this.isUserLogged = __bind(this.isUserLogged, this);
    this.getConfigHeaders = __bind(this.getConfigHeaders, this);
    this.user = {
      token: '',
      logged: false,
      id: null
    };
    this.checking = false;
  }

  Auth.prototype.getConfigHeaders = function() {
    var headers;
    headers = {};
    if (this.user.token !== '') {
      headers['Authorization'] = "Bearer " + this.user.token;
    }
    return {
      headers: headers
    };
  };

  Auth.prototype.isUserLogged = function() {
    var _this = this;
    this.checking = true;
    if (this.$cookies.token) {
      this.user.token = this.$cookies.token;
      return this.$http.get("/api/user/check", this.getConfigHeaders()).success(function(data) {
        _this.user.logged = true;
        _this.user.id = data._id;
        return _this.checking = false;
      }).error(function(data) {
        return _this.checking = false;
      });
    } else {
      return this.checking = false;
    }
  };

  return Auth;

})());
