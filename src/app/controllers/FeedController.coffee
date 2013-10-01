app.controller 'FeedController',
	class FeedController
		constructor: (@$scope, @$http, @auth) ->
			@$scope.feed = []
			
			# Load area feed
			$http
				.get('/api/area/522495d887789a8a0350e81a/actions', @auth.getConfigHeaders())
				.success (data) =>
					actions = data.actions
					for action in actions
						$http
							.get("/api/user/#{action.subject}/profile", @auth.getConfigHeaders())
							.success (userData) =>
								console.log userData
								action.user = userData.user.username
						
						$http
							.get("/api/user/#{action.subject}/avatar/60", @auth.getConfigHeaders())
							.success (userAvatar) =>
								action.avatar = userAvatar.url
					
					@$scope.feed = actions