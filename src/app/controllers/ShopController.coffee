app.controller 'ShopController',
	class ShopController
		constructor: (@$scope, @$http, @auth) ->
			
			@$scope.added = false
			
			@$scope.refreshShowcase = =>
				@$http
					.get("/api/shop/523b2b7194e535b36cbe68dd/showcase", @auth.getConfigHeaders())
					.success (data) =>
						@$scope.showcase = data.showcase
						item.disabled = false for item in @$scope.showcase
			
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
							disabled : false
							image : @$scope.file
							shop : "523b2b7194e535b36cbe68dd"
							editing : true
						}
						@$scope.added = false
					#if newVal? and newVal isnt ''
					#	@$scope.addShopItemBackground = "\"url('#{newVal}') no-repeat center;\""
					#else
					#	@$scope.addShopItemBackground = ''
			)
			
			# Editing one item
			@$scope.startEditing = (item) =>
				if !item.editing
					shopItem.editing = false for shopItem in @$scope.showcase # reset editing
					item.editing = true
			
			# Save one item
			@$scope.save = (item) =>
				if item.image?
					item.disabled = true
					@$http
						.post("/api/shopItem", item, @auth.getConfigHeaders())
						.success (data) =>
							item._id = data.id
							@$scope.uploadImage(item)
						.error (data) =>
							item.disabled = false
				else
					false # todo add support for editing with `PUT /shopItem/:id`
			
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
							success: (data) =>
								# Upped, so no more needed
								delete item.image 
								# Must show save&delete buttons
								item.disabled = false
								# Refresh!
								@$scope.$apply();
						}
						
						#$.post("https://api.cloudinary.com/v1_1/hysf85emt/image/upload", formData)
						#	.success (data) =>
						#		console.log data
								
					.error (data) =>
						item.disabled = false
						console.log data
			
			# Delete one item
			@$scope.delete = (item) =>
				item.disabled = true
				if item.image?
					@$scope.showcase = @$scope.showcase.filter (si) -> si isnt item
					item.disabled = false
				else
					@$http
						.delete("/api/shopItem/#{item._id}", @auth.getConfigHeaders())
						.success (data) =>
							item.disabled = false
							@$scope.showcase = @$scope.showcase.filter (si) -> si._id isnt data._id
							console.log data
						.error (data) =>
							item.disabled = false
							console.log data
							
						