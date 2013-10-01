app.controller 'NavigationController',
	class NavigationController
		constructor: (@$scope, @$http, @$location, auth, @$cookies) ->
			@$scope.logout = =>
				if auth.user.logged
					auth.user.logged = false
				if @$cookies.token
					delete @$cookies.token
					
				$location.path '/login'