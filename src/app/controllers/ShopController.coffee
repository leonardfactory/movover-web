app.controller 'ShopController',
	class ShopController
		constructor: (@$scope, @$http, @auth) ->
			
			@$scope.added = false
			
			@$scope.refreshShowcase = =>
				@$http
					.get("/api/shop/523b2b7194e535b36cbe68dd/showcase", @auth.getConfigHeaders())
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
				
			# Return image path
			@$scope.getImageURL = (item) ->
				if item.image? then item.image else $.cloudinary.url('shop_item_' + item._id, { width: 200, height: 200, format: 'jpg' })
			
			@$scope.$watch(
				=> @$scope.added
				(newVal, oldVal) =>
					if newVal is true
						@$scope.showcase.push {
							image : @$scope.file,
							shop : "523b2b7194e535b36cbe68dd"
							editing : true
						}
						@$scope.added = false
					#if newVal? and newVal isnt ''
					#	@$scope.addShopItemBackground = "\"url('#{newVal}') no-repeat center;\""
					#else
					#	@$scope.addShopItemBackground = ''
			)
			
			# Save one item
			@$scope.save = (item) =>
				@$http
					.post("/api/shopItem", item, @auth.getConfigHeaders())
					.success (data) =>
						item._id = data.id
						@$scope.uploadImage(item)
			
			# Upload image for one item
			@$scope.uploadImage = (item) =>
				@$http
					.get("/api/shopItem/#{item._id}/signature", @auth.getConfigHeaders())
					.success (data) =>
						# Currently supporting only CORS + FormData. Some browsers are out.
						formData = new FormData()
						formData.append(dataName, dataItem) for dataName, dataItem of data
						formData.append('file', item.image)
						
						$.ajax {
							url: "https://api.cloudinary.com/v1_1/hysf85emt/image/upload"
							data: formData
							processData: false
							contentType: false
							type: 'POST'
							success: (data) ->
								# console.log data
						}
						
						#$.post("https://api.cloudinary.com/v1_1/hysf85emt/image/upload", formData)
						#	.success (data) =>
						#		console.log data
								
					.error (data) =>
						console.log data
						