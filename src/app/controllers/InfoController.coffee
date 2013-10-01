app.controller 'InfoController', 
	class InfoController
		constructor: (@$scope, @$http, @adapter, @auth) ->
			# Master copy
			@$scope.master = {}
			@$scope.errors = []
			@$scope.status = ''
			
			# Load data from server
			$http
				.get("/api/shop/523b2b7194e535b36cbe68dd", @auth.getConfigHeaders())
				.success (data) =>
					@$scope.shop = data
					@$scope.master = data
					
			# Some fixtures
			@$scope.title = "InfoController"
		
			@$scope.reset = =>
				@$scope.shop = angular.copy(@$scope.master)
		
			@$scope.update = =>
				$http
					.post("/api/shop/523b2b7194e535b36cbe68dd", @$scope.shop, @auth.getConfigHeaders())
					.success (data) =>
						@$scope.errors = []
						@$scope.master = angular.copy(@$scope.shop)
						@$scope.status = 'success'
						# @todo show success message
					.error (data) =>
						@$scope.status = 'error'
						@$scope.errors = []
						for error in data.error
							@$scope.errors.push error.param
							
			@$scope.isInvalid = (param) =>
				param in @$scope.errors
			