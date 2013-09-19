app.service 'adapter',
	class Adapter
		constructor: (@$http) ->
			@path = 'http://localhost:8080/'
			