app.service 'auth',
	class Auth
		constructor: (@$http) ->
			@user = 
				logged: false
				id: null
			
			@checking = false
			
		isUserLogged: =>
			@checking = true
			@$http
				.get("/api/user/check")
				.success (data) =>
					@user.logged = true
					@user.id = data._id 
					@checking = false
				.error (data) =>
					@checking = false
					
					
		