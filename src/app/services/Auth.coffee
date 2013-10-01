app.service 'auth',
	class Auth
		constructor: (@$http, @$cookies) ->
			@user =
				token: ''
				logged: false
				id: null
			
			@checking = false
			
		getConfigHeaders: =>
			headers = {}
			headers['Authorization'] = "Bearer #{@user.token}" if @user.token != ''
			return { headers: headers }
			
		isUserLogged: =>
			@checking = true
			
			if @$cookies.token
				@user.token = @$cookies.token
				
				@$http
					.get("/api/user/check", @getConfigHeaders())
					.success (data) =>
						@user.logged = true
						@user.id = data._id 
						@checking = false
					.error (data) =>
						@checking = false
			else
				@checking = false
					
					
		