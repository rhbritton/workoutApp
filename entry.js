require('./styles/normalize.css')
require('./style.css')
var { reducer } = require('./reducer/reducer.js')

import { createStore } from 'redux'
import { render } from './render'

// Create a Redux store holding the state of your app. 
// Its API is { subscribe, dispatch, getState }. 
var listeners = {}
let store = createStore(reducer)

// You can subscribe to the updates manually, or use bindings to your view layer. 
store.subscribe(() => {
	console.log(store.getState())
	render(store.getState(), listeners)
})

// The only way to mutate the internal state is to dispatch an action. 
// The actions can be serialized, logged or stored and later replayed. 
// store.dispatch({ type: 'BUILD_WORKOUT', options:{ types:['BICEPS', 'SHOULDERS'], workoutTime:60 } })
// console.log(store.getState())

// store.dispatch({ type: 'NEXT_PAGE' })



listeners.nextPage = {
	func: function() {
		store.dispatch({ type: 'NEXT_PAGE' })
	},
	action: 'click',
	selector: '[data-action="nextPage"]'
}

listeners.previousPage = {
	func: function() {
		store.dispatch({ type: 'PREVIOUS_PAGE' })
	},
	action: 'click',
	selector: '[data-action="previousPage"]'
}

listeners.generate = {
	func: function() {
		store.dispatch({ type: 'GENERATE' })
	},
	action: 'click',
	selector: '[data-action="generate"]'
}

render(store.getState(), listeners)