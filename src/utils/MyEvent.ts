class MyEvent {

    listeners: CallableFunction[] = [];

    nextId: number = 1

    on(listener: CallableFunction) {
        if(this.listeners.includes(listener)) {
            throw new Error("Tried to add already-present listener.")
        }

        this.listeners.push(listener)
    }

    off(listener: CallableFunction) {
        if(!this.listeners.includes(listener)) {
            throw new Error("Tried to remove non-present listener.")
        }

        return this.listeners.filter(l => l != listener);
    }

    emit(...args: any[]) {
        for(const listener of this.listeners) {
            listener(...args);
        }
    }

}

export default MyEvent;