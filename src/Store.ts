import {Project, Listener} from './lib/Types'

class Store {
    private static instance: any = null
    private _state: Project[] = []
    private subscriptions: Listener[] = []

    private constructor() {}

    get state(): Project[] {
        return this._state.slice()
    }

    static create() {
        if(!this.instance) {
            this.instance = new Store()
        }
        return this.instance
    }

    subscribe(listener: Listener) {
        this.subscriptions.push(listener)
    }

    setState(newState: Project[]) {
        this._state = newState
        this.subscriptions.forEach(listener => listener(this.state))
    }
}

const store: Store = Store.create()

export default store