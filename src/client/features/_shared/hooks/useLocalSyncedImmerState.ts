import { useEffect } from "react"

import { useLocalStorage } from "@mantine/hooks"
import { ImmerHook, useImmer } from "use-immer"

function getLocalStorageObject<T>(localStorageKey: string): T | null {
  const localStorageObject = localStorage.getItem(localStorageKey)
  if (!localStorageObject) return null
  try {
    return JSON.parse(localStorageObject) as T
  } catch (error) {
    console.error(`Error parsing localStorage key "${localStorageKey}":`, error)
    return null
  }
}

export default function useLocalSyncedImmerState<T>(
  defaultState: T,
  localStorageKey: string = "localData",
): ImmerHook<T> {
  // Retrieve the initial state from localStorage or use the default state
  const storedState = getLocalStorageObject<T>(localStorageKey)
  const initialState: T = storedState !== null ? storedState : defaultState

  // Initialize local storage state with the type T
  const [localStorageState, setLocalStorageState] = useLocalStorage<T>({
    key: localStorageKey,
    defaultValue: initialState,
  })

  // Initialize Immer state
  const [state, updater] = useImmer<T>(localStorageState)

  // Sync state changes to localStorage
  useEffect(() => {
    setLocalStorageState(state)
  }, [state, setLocalStorageState])

  return [state, updater]
}
