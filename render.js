import { options } from './data/options'

var app = document.getElementById('body')

export function render(state, listeners) {
	var template = require('./views/'+options[state.page]+'.hbs')
	  , data = {}

	app.innerHTML = template(data)

	Object.keys(listeners).forEach(function(i) {
		var selector = document.querySelector(listeners[i].selector)

		selector && selector.addEventListener(listeners[i].action, listeners[i].func)
	})
}