app.controller 'NavigationController',
	class NavigationController
		constructor: (@$scope, @$http, @$location, auth) ->
			@$scope.logout = =>
				if auth.user.logged
					$http
						.get("/api/user/logout")
						.success (data) =>
							auth.user.logged = false
							$location.path '/login'
						.error (data) =>
							console.log data