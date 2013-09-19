app.controller 'InfoController', 
	class InfoController
		constructor: (@$scope) ->
			console.log 'InfoController generated'
			@$scope.title= "InfoController"
		