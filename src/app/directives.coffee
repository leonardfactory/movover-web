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

angular
	.module('navigation')
	.directive 'userLogged', (auth) ->
		restrict: 'A'
		link: (scope, element, attrs, controller) ->
			scope.$watch(
				# When user is or not logged
				-> auth.user.logged
				
				# Show or hide nav bar content
				(newValue, oldValue) ->
					element.css 'display', if newValue is true then 'block' else 'none'
			)
			
angular
	.module('app')
	.directive('droppable', () ->
		restrict: 'A'
		link: (scope, element, attrs) ->
			
			element.bind 'drop', (event) ->
				event?.preventDefault()
				event?.stopPropagation()
				
				# If we drop something, icon must reset
				element.removeClass 'hover'
				
				# Read data on file dropped
				file = event.originalEvent.dataTransfer.files[0]
				reader = new FileReader()
				
				reader.onload = (evt) ->
					scope.$apply ->
						scope.added = true
						scope.file = evt.target.result
						scope.fileName = file.name
						
				reader.readAsDataURL(file)
				false
		
			element.bind 'dragover', (event) ->
				event?.stopPropagation()
				event?.preventDefault()
				event.originalEvent.dataTransfer.dropEffect = 'copy'
				false
			
			# Styling
			element.bind 'dragenter', (event) -> element.addClass 'hover'
			element.bind 'dragleave', (event) -> element.removeClass 'hover'
	)