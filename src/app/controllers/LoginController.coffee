app.controller 'LoginController',
	class LoginController
		constructor: (@$scope, @$location, @$http, auth) ->
			@$scope.user =
				username: ''
				password: ''
				
			@$scope.error = false
			
			@$scope.checkUser = true
			
			# Try to login user (check cookies)
			auth.isUserLogged()
			
			@$scope.$watch(
				-> auth.user.logged
				(newVal, oldVal) =>
					if newVal is true
						@$location.path '/info'
			)
			
			@$scope.$watch(
				-> auth.checking
				=> @$scope.checkUser = auth.checking
			)
			
			@$scope.login = =>
				$http
					.post("/api/user/login", @$scope.user)
					.success (data) =>
						auth.user.logged 	= true
						auth.user.id 		= data._id
						@$location.path '/info'
					.error (data) =>
						@$scope.error = true