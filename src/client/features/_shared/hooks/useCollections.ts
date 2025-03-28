import { createContext, useContext } from "react"

import { Updater } from "use-immer"

export type Collection = {
  name: string
  id: string
  items: string[]
  description?: string
}

type CollectionsContextState = [Collection[], Updater<Collection[]>]

export const CollectionsContext = createContext<CollectionsContextState | null>(
  null,
)

export function useCollections(): CollectionsContextState {
  const context = useContext(CollectionsContext)
  if (!context) {
    throw new Error("useCollections must be used within a CollectionsProvider")
  }
  return context
}
