// useNestActions.ts
import { useCallback } from "react"

import { notifications } from "@mantine/notifications"
import useNest from "./useNest.js"

export default function useNestActions() {
  const [state, update] = useNest()

  // useLogger("useNestActions", [state])

  // 🧰---- Utility Functions ----
  const isValidId = useCallback((itemId: string | number): boolean => {
    if (!itemId) {
      notifications.update({ message: `Id ${itemId} is not a valid id.` })
      return false
    }
    return true
  }, [])

  const isItemInNest = useCallback(
    (itemId: number | string): boolean => {
      if (isValidId(itemId)) {
        return state.includes(itemId.toString())
      }
      return false
    },
    [isValidId, state],
  )

  // 🪺---- Nest Management ----
  const addItemToNest = useCallback(
    (itemId: number | string): void => {
      if (isItemInNest(itemId)) {
        notifications.update({
          message: `Duplicate, Id: ${itemId} is already in nest`,
          color: "orange",
        })
        return
      }

      update((draft) => {
        draft.push(itemId.toString())
        notifications.update({ message: `Id: ${itemId} added to nest` })
      })
    },
    [isItemInNest, update],
  )

  const removeItemFromNest = useCallback(
    (itemId: number | string): void => {
      if (!state.includes(itemId.toString())) {
        notifications.update({
          message: `Cannot remove, id: ${itemId} is not in nest`,
          color: "orange",
        })
        return
      }

      update((draft) => {
        draft.splice(draft.indexOf(itemId.toString()), 1)
        notifications.update({ message: `Id: ${itemId} removed from nest` })
      })
    },
    [state, update],
  )

  return {
    isValidId,
    isItemInNest,
    addItemToNest,
    removeItemFromNest,
  }
}
