angular
	.module('navigation')
	.directive 'navigationBar', ($location) ->
		restrict: 'A'
		link: (scope, element, attrs, controller) ->
			scope.$watch(
				# When $location changes
				-> $location.path()
			
				# Match new routes
				(newValue, oldValue) ->
					$('li[data-match-route]', element).each (k, li) =>
						_li 	= angular.element li 
						pattern = _li.attr 'data-match-route'
						regexp	= new RegExp '^' + pattern + '$', ['i']
					
						if regexp.test newValue
							_li.addClass 'active'
						else
							_li.removeClass 'active'
			)