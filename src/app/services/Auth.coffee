app.service 'auth',
	class Auth
		constructor: ->
			@user = 
				logged: false
				id: null
		