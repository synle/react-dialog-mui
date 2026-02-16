import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { Store, useStore } from "../components/Store";

describe("Store", () => {
  it("should return the initial state", () => {
    const store = new Store({ count: 0 });
    expect(store.getState()).toEqual({ count: 0 });
  });

  it("should update state with setState", () => {
    const store = new Store({ count: 0, name: "test" });
    store.setState({ count: 5 });
    expect(store.getState()).toEqual({ count: 5, name: "test" });
  });

  it("should notify listeners on setState", () => {
    const store = new Store({ count: 0 });
    const listener = vi.fn();
    store.subscribe(listener);

    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener).toHaveBeenCalledWith({ count: 1 });
  });

  it("should unsubscribe listeners", () => {
    const store = new Store({ count: 0 });
    const listener = vi.fn();
    const unsubscribe = store.subscribe(listener);

    store.setState({ count: 1 });
    expect(listener).toHaveBeenCalledTimes(1);

    unsubscribe();
    store.setState({ count: 2 });
    expect(listener).toHaveBeenCalledTimes(1);
  });

  it("should notify multiple listeners", () => {
    const store = new Store({ count: 0 });
    const listener1 = vi.fn();
    const listener2 = vi.fn();
    store.subscribe(listener1);
    store.subscribe(listener2);

    store.setState({ count: 1 });
    expect(listener1).toHaveBeenCalledTimes(1);
    expect(listener2).toHaveBeenCalledTimes(1);
  });
});

describe("useStore", () => {
  it("should return the selected state", () => {
    const store = new Store({ count: 10, name: "test" });
    const { result } = renderHook(() => useStore(store, (s) => s.count));
    expect(result.current).toBe(10);
  });

  it("should update when selected state changes", () => {
    const store = new Store({ count: 0 });
    const { result } = renderHook(() => useStore(store, (s) => s.count));

    act(() => {
      store.setState({ count: 5 });
    });

    expect(result.current).toBe(5);
  });

  it("should not re-render when unrelated state changes", () => {
    const store = new Store({ count: 0, name: "test" });
    const renderCount = vi.fn();

    renderHook(() => {
      const value = useStore(store, (s) => s.count);
      renderCount();
      return value;
    });

    const callCountAfterMount = renderCount.mock.calls.length;

    act(() => {
      store.setState({ name: "changed" });
    });

    // Should not have re-rendered since count didn't change
    expect(renderCount.mock.calls.length).toBe(callCountAfterMount);
  });

  it("should clean up subscription on unmount", () => {
    const store = new Store({ count: 0 });
    const { result, unmount } = renderHook(() =>
      useStore(store, (s) => s.count),
    );

    unmount();

    // After unmount, updating store should not throw
    act(() => {
      store.setState({ count: 99 });
    });

    // result is stale after unmount
    expect(result.current).toBe(0);
  });
});
