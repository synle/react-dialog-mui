import { useCallback, useEffect, useRef, useState } from 'react';

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
    this.state = { ...this.state, ...newState };
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  subscribe(listener: Listener<T>) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }
}

export function useStore<T, U>(store: Store<T>, selector: (state: T) => U): U {
  const selectorRef = useRef(selector);
  selectorRef.current = selector;

  const [selectedState, setSelectedState] = useState(() => selector(store.getState()));

  const stableSubscribe = useCallback(
    (newState: T) => {
      const nextValue = selectorRef.current(newState);
      setSelectedState((prev) => (Object.is(prev, nextValue) ? prev : nextValue));
    },
    [store],
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(stableSubscribe);
    return unsubscribe;
  }, [store, stableSubscribe]);

  return selectedState;
}
