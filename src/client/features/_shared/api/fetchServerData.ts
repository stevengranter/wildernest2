import { QueryKey } from "@tanstack/react-query"

export async function fetchServerData(queryKey: QueryKey): Promise<unknown> {
  const queryUrl = queryKey.join("")
  console.log({ queryUrl })
  const response = await fetch(queryUrl)
  if (!response.ok) {
    throw new Error("Network response was not ok")
  }
  return await response.json()
}
