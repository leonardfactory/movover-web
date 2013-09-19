route.config [
	'$routeProvider', ($routeProvider) ->
		$routeProvider.when('/info', 
			templateUrl: 'info.tpl.html',
			controller: 'InfoController'
		)
		$routeProvider.otherwise redirectTo: '/info'
	]