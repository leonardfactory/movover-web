app.controller 'FeedController',
	class FeedController
		constructor: (@$scope, @$http) ->
			@$scope.feed = []
			
			# Load area feed
			$http
				.get('/api/area/522495d887789a8a0350e81a/actions')
				.success (data) =>
					actions = data.actions
					for action in actions
						$http
							.get("/api/user/#{action.subject}/profile")
							.success (userData) =>
								console.log userData
								action.user = userData.user.username
						
						$http
							.get("/api/user/#{action.subject}/avatar/60")
							.success (userAvatar) =>
								action.avatar = userAvatar.url
					
					@$scope.feed = actions