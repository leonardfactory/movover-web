route
	.config([
		'$routeProvider', ($routeProvider) ->
			$routeProvider.when('/info', 
				templateUrl: 'info.tpl.html'
				controller: 'InfoController'
				navName: 'Informazioni Generali'
				access: 
					isFree: false
			)
			$routeProvider.when('/login',
				templateUrl: 'login.tpl.html'
				controller: 'LoginController'
				access:
					isFree: true
			)
			$routeProvider.when('/feed',
				templateUrl: 'feed.tpl.html'
				controller: 'FeedController'
				navName: 'Attività dell\'Area'
				access:
					isFree: false
			)
			$routeProvider.otherwise redirectTo: '/login'
	])
	# Checks for unavailable paths (auth required)
	.run ($rootScope, $location, auth) ->
		$rootScope.$on '$routeChangeStart', (event, curr, next) ->
			$location.path '/login' if (curr.access? and !curr.access.isFree and !auth.user.logged)
			$rootScope.currentPage = if curr.navName? then curr.navName else 'Informazioni Generali'