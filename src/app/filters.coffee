app.filter 'human', ->
	(date) -> moment(date).lang('it').fromNow()
	
app.filter 'imageUrl', ->
	(id) -> "http://res.cloudinary.com/hysf85emt/image/upload/h_700,w_700/action_#{id}.jpg"