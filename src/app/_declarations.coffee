# Helpers to handle navigation bar
navigation		= angular.module 'navigation', []

# Controllers
controller		= angular.module 'controller', ['templates-main']

# Routing for base application
route			= angular.module 'route', ['templates-main']

app 			= angular.module 'app', ['navigation', 'controller', 'route', 'ngCookies']

# CORS
app.config ($httpProvider) ->
	# Enable cross domain calls
	$httpProvider.defaults.useXDomain = true
	 
	# Remove the header used to identify ajax call  that would prevent CORS from working
	# delete $httpProvider.defaults.headers.common['X-Requested-With']