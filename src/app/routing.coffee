route
	.config([
		'$routeProvider', ($routeProvider) ->
			$routeProvider.when('/info', 
				templateUrl: 'info.tpl.html'
				controller: 'InfoController'
				access: 
					isFree: false
			)
			$routeProvider.when('/login',
				templateUrl: 'login.tpl.html'
				controller: 'LoginController'
				access:
					isFree: true
			)
			$routeProvider.otherwise redirectTo: '/login'
	])
	# Checks for unavailable paths (auth required)
	.run ($rootScope, $location, auth) ->
		$rootScope.$on '$routeChangeStart', (event, curr, next) ->
			$location.path '/login' if (curr.access? and !curr.access.isFree and !auth.user.logged)