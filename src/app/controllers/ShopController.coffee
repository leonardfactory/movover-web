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
					.post("/api/shopItem", item)
					.success (data) =>
						item._id = data.id
						@$scope.uploadImage(item)
			
			# Upload image for one item
			@$scope.uploadImage = (item) =>
				@$http
					.get("/api/shopItem/#{item._id}/signature")
					.success (data) =>
						# Create a new form to handle only this upload
						form = $('<form id="upload_image" style="visibility: hidden;"></form>')
									.append($('<input name="file" type="file" 
		       		 			  						class="cloudinary-fileupload" data-cloudinary-field="image_upload" 
		       					  						data-form-data=\'' + JSON.stringify(data) + '\'></input>'))
								 	.appendTo 'body'
						
						#$('#upload_image').
						#form.submit()