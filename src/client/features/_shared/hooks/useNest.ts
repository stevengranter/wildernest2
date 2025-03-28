import { createContext, useContext } from "react"

import { Updater } from "use-immer"

type NestContextData = [string[], Updater<string[]>]

export const NestContext = createContext<NestContextData | undefined>(undefined)

export default function useNest() {
  const ctx = useContext(NestContext)

  if (ctx === undefined) {
    throw new Error(
      "NestContext can only be used inside a NestProvider" + " tree",
    )
  }

  return ctx
}
