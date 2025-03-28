import { PropsWithChildren } from "react"

import { Paper, PaperProps } from "@mantine/core"

export default function DefaultPaper({
  children,
  ...props
}: PropsWithChildren<PaperProps>) {
  return (
    <Paper
      p="xl"
      pt="lg"
      m="md"
      radius="lg"
      withBorder={true}
      shadow="xl"
      {...props}
    >
      {children}
    </Paper>
  )
}
