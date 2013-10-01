app.controller 'LoginController',
	class LoginController
		constructor: (@$scope, @$location, @$http, @$cookies, auth) ->
			@$scope.user =
				username: ''
				password: ''
				grant_type: 'password'
			
			@$scope.remember = false
				
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
					.post("/api/user/token", @$scope.user)
					.success (data) =>
						auth.user.logged 	= true
						auth.user.token		= data.access_token
						
						$http
							.get("/api/user/check", auth.getConfigHeaders())
							.success (data) =>
								auth.user.id = data._id
								
								# Now, if user wants to remember session, store cookie
								@$cookies.token = auth.user.token if @$scope.remember
									
								@$location.path '/info'
							.error (data) =>
								@$scope.error = true
					.error (data) =>
						@$scope.error = true