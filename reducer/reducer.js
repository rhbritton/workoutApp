/**
* This is a reducer, a pure function with (state, action) => state signature.
* It describes how an action transforms the state into the next state.
*
* The shape of the state is up to you: it can be a primitive, an array, an object,
* or even an Immutable.js data structure. The only important part is that you should
* not mutate the state object, but return a new object if the state changes.
*
* In this example, we use a `switch` statement and strings, but you can use a helper that
* follows a different convention (such as function maps) if it makes sense for your project.
*/

import { exercises } from '../data/exercises'

export function reducer(state = { page:0 }, action) {
	switch (action.type) {
		case 'BUILD_WORKOUT':
			return buildWorkout(state, action.options)
		case 'NEXT_PAGE':
			return nextPage(state, action)
		case 'PREVIOUS_PAGE':
			return previousPage(state, action)
		default:
			return state
	}
}

function nextPage(state, action) {
	if(state.page >= 4) return { page:state.page }

	return { page:state.page+1 }
}

function previousPage(state, action) {
	if(state.page <= 0) return { page:state.page }

	return { page:state.page-1 }
}

function buildWorkout(state, options) {
	if(!options.workoutTime) options.workoutTime = 30

	var muscleGroups = []
	options.types.forEach(function(type) {
		muscleGroups.push(exercises[type])
	})

	var completeWorkout = addExercises(muscleGroups)

	return {
		workout: completeWorkout
	}


	function addExercises() {
		var timeTaken = 0
		  , workout = []
		  , warmUpTime = 2+Math.floor(Math.random()*2)
		  , coolDownTime = 2+Math.floor(Math.random()*3)

		while(timeTaken < options.workoutTime) {
			var muscleGroup = muscleGroups[randomIndex(muscleGroups)]
			
			if(timeTaken < warmUpTime) {
				workout.push({
					type: 'WARM_UP',
					exercise: muscleGroup.warmUps[randomIndex(muscleGroup.warmUps)]
				})

				timeTaken++
			} else {
				var sets = calcSets()
				  , reps = calcReps()
				  , rest = calcRest()

				var exerciseIndex = randomIndex(muscleGroup.exercises)
				var subExerciseIndex = randomIndex(muscleGroup.exercises[exerciseIndex])
				var exercise = muscleGroup.exercises[exerciseIndex][subExerciseIndex]

				timeTaken += sets*2

				workout.push({
					exercise: exercise,
					reps: reps,
					sets: sets,
					rest: rest
				})
			}
		}

		for(var i=0; i<coolDownTime; i++) {
			workout.push({
				type: 'COOL_DOWN',
				exercise: muscleGroup.coolDown[randomIndex(muscleGroup.coolDown)]
			})
		}

		return workout
	}

	function calcSets() {
		return 2+Math.floor(Math.random()*3)
	}

	function calcReps() {
		return 5+Math.floor(Math.random()*4)
	}

	function calcRest() {
		return 60
	}


}

function randomIndex(arr) {
	return Math.floor(Math.random()*arr.length)
}