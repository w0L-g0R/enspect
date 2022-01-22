// See https://dev.to/angular/simple-yet-powerful-state-management-in-angular-with-rxjs-4f8g

import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

export class StateService<T> {
	//
	private readonly state$: BehaviorSubject<T>

	protected get state(): T {
		return this.state$.getValue()
	}

	constructor(initialState: T) {
		this.state$ = new BehaviorSubject<T>(initialState)
	}

	protected select<K>(mapFn: (state: T) => K): Observable<K> {
		return this.state$.asObservable().pipe(
			map((state: T) => mapFn(state)),
			distinctUntilChanged()
		)
	}

	protected setState(newState: Partial<T>) {
		this.state$.next({
			...this.state,
			...newState
		})
	}
}

interface Todo {
	id: number
	activity: string
	date: number
	status: string
}

interface TodoState {
	todos: Todo[]
	selectedTodoId: number | undefined | Observable<Todo>
}

const initialState: TodoState = {
	todos: [],
	selectedTodoId: undefined
}

@Injectable({
	providedIn: "root"
})
export class TodosStateService extends StateService<TodoState> {
	todos$: Observable<Todo[]> = this.select((state) => state.todos)

	selectedTodo$: Observable<Todo> = this.select((state) => {
		return state.todos.find((item) => {
			item.id === state.selectedTodoId
		})!
	})

	constructor() {
		super(initialState)
	}

	addTodo(todo: Todo) {
		this.setState({ todos: [...this.state.todos, todo] })
	}

	selectTodo(todo: Todo) {
		this.setState({ selectedTodoId: todo.id })
	}
}
