app.controller 'ShopController',
	class ShopController
		constructor: (@$scope, @$http) ->
			
			@$scope.refreshShowcase = =>
				@$http
					.get("/api/shop/523b2b7194e535b36cbe68dd/showcase")
					.success (data) =>
						@$scope.showcase = data.showcase
			
			# Load data from database
			@$scope.refreshShowcase()
			