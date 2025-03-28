import {Title} from "@mantine/core"
import DefaultPaper from "../../_shared/components/DefaultPaper.jsx"
import NestView from "../../collections/pages/NestView.jsx"

export default function CollectionsPage() {
  return (
    <DefaultPaper>
      <Title order={1}>Collections</Title>
      <NestView />
    </DefaultPaper>
  )
}
