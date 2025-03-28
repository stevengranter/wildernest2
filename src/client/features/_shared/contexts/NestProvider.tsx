import React, {ReactNode} from "react"

import useLocalSyncedImmerState from "../hooks/useLocalSyncedImmerState.js"
import {NestContext} from "../hooks/useNest.js"

const initialNest: string[] = ["48586", "48984", "81545"]

export default function NestProvider({ children }: { children: ReactNode }) {
  const [state, updater] = useLocalSyncedImmerState(initialNest, "nestData")

  return (
    <NestContext.Provider value={[state, updater]}>
      {children}
    </NestContext.Provider>
  )
}
