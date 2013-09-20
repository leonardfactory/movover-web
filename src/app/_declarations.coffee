# Helpers to handle navigation bar
navigation		= angular.module 'navigation', []

# Controllers
controller		= angular.module 'controller', ['templates-main']

# Routing for base application
route			= angular.module 'route', ['templates-main']

app 			= angular.module 'app', ['navigation', 'controller', 'route', 'ngCookies']
