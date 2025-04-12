// store.ts
import { useEffect, useState } from 'react';

type Listener<T> = (state: T) => void;

export class Store<T> {
  private state: T;
  private listeners: Set<Listener<T>> = new Set();

  constructor(initialState: T) {
    this.state = initialState;
  }

  getState(): T {
    return this.state;
  }

  setState(newState: Partial<T>) {
    try {
      this.state = { ...this.state, ...newState };
      for (const listener of this.listeners) {
        listener(this.state);
      }
    } catch (err) {
      console.log('errr', err);
    }
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export function useStore<T, U>(store: Store<T>, selector: (state: T) => U): U {
  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));

  useEffect(() => {
    const update = (newState: T) => {
      setSelectedState(selector(newState));
    };
    const unsubscribe = store.subscribe(update);
    return unsubscribe;
  }, [store, selector]);

  return selectedState;
}
