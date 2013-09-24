app.controller 'ShopController',
	class ShopController
		constructor: (@$scope, @$http) ->
			
			@$scope.added = false
			
			@$scope.refreshShowcase = =>
				@$http
					.get("/api/shop/523b2b7194e535b36cbe68dd/showcase")
					.success (data) =>
						@$scope.showcase = data.showcase
			
			# Load data from database
			@$scope.refreshShowcase()
			
			# Return right class to be shown
			@$scope.getBorderClass = (item) ->
				if item.editing
					'half'
				else
					'complete'
			
			@$scope.$watch(
				=> @$scope.added
				(newVal, oldVal) =>
					if newVal is true
						@$scope.showcase.push {
							image : @$scope.file,
							editing : true
						}
						@$scope.added = false
					#if newVal? and newVal isnt ''
					#	@$scope.addShopItemBackground = "\"url('#{newVal}') no-repeat center;\""
					#else
					#	@$scope.addShopItemBackground = ''
			)
			# RNDDNL60P58H501U