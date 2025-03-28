import { useLogger as mantineLogger } from "@mantine/hooks"

export const useLogger =
  process.env.NODE_ENV !== "production" ? mantineLogger : () => {}

if (process.env.NODE_ENV === "production") {
  console.log = function () {}
}
