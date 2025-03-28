// CollectionsContext.tsx
import React, { ReactElement, ReactNode } from "react"

import { useLogger } from "../../../dev.js"
import {
  Collection,
  CollectionsContext,
} from "../hooks/useCollections.js"
import useStorageSyncedImmerState from "../hooks/useLocalSyncedImmerState.js"
import { Updater } from "use-immer"

const initialCollections: Collection[] = [
  {
    name: "Starter Pack",
    id: crypto.randomUUID(),
    items: ["46260", "117443", "8335"],
    description: `This is your starter pack. Add them to your favorites by clicking the heart ❤️ icon, or your wishlist by clicking the star ⭐️. Add more animals by using <a href='/search'>Search</Link>.`,
  },
  { name: "Favorites", id: crypto.randomUUID(), items: [] },
]

// Provider component
export default function CollectionsProvider({
  children,
}: {
  children: ReactNode
}): ReactElement {
  const [state, updater] = useStorageSyncedImmerState(
    initialCollections,
    "collectionsData",
  )

  useLogger("CollectionsProvider", [state])

  return (state && (
    <CollectionsContext.Provider
      value={[state as Collection[], updater as Updater<Collection[]>]}
    >
      {children}
    </CollectionsContext.Provider>
  )) as ReactElement
}
