app.controller 'InfoController', 
	class InfoController
		constructor: (@$scope, @$http, @adapter) ->
			# Load data from server
			$http
				.jsonp("#{@adapter.path}shop/523b2b7194e535b36cbe68dd?callback=JSON_CALLBACK")
				.success (data) =>
					@$scope.shop = data
					
			# Some fixtures
			@$scope.title = "InfoController"