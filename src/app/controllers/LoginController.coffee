app.controller 'LoginController',
	class LoginController
		constructor: (@$scope, @$location, @$http, auth) ->
			@$scope.user =
				username: ''
				password: ''
				
			@$scope.error = false
			
			@$scope.login = =>
				$http
					.post("/api/user/login", @$scope.user)
					.success (data) =>
						auth.user.logged 	= true
						auth.user.id 		= data._id
						@$location.path '/info'
					.error (data) =>
						@$scope.error = true