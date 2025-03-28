import {ReactNode, useEffect, useState} from "react"

import {ActionIcon, createTheme, MantineThemeProvider} from "@mantine/core"
import useCollectionActions from "../../_shared/hooks/useCollectionActions.jsx"
import {useCollections} from "../../_shared/hooks/useCollections"

import classes from "./ToggleCollectionButton.module.css"

const theme = createTheme({
  components: {
    ActionIcon: ActionIcon.extend({
      classNames: classes,
    }),
  },
})

export default function ToggleCollectionButton({
  id,
  taxonName,
  taxonCommonName,
  collection,
  TrueIconComponent,
  FalseIconComponent,
  variant = "default",
}: {
  id: string | number
  taxonName?: string
  taxonCommonName?: string
  collection: string
  TrueIconComponent: ReactNode
  FalseIconComponent: ReactNode
  variant?: string
}) {
  const collectionAction = useCollectionActions()
  const collections = useCollections()

  const [isInCollection, setIsInCollection] = useState<boolean>(false)

  function handleClick(id: string | number) {
    if (collectionAction.isItemInCollection(id, collection)) {
      collectionAction.removeIdFromCollection(
        id,
        collection,
        // taxonName,
        taxonCommonName,
      )
      setIsInCollection(false)
    } else {
      collectionAction.addIdToCollection(
        id,
        collection,
        taxonName,
        taxonCommonName,
      )
      setIsInCollection(true)
    }
    setIsInCollection(collectionAction.isItemInCollection(id, collection))
  }

  useEffect(() => {
    if (!collections) {
      console.log("No collections found")
    } else {
      if (collectionAction.getAllCollectionNames().includes(collection)) {
        setIsInCollection(
          collectionAction.isItemInCollection(id.toString(), collection),
        )
      }
    }
  }, [collectionAction, collections, id])

  return (
    <MantineThemeProvider theme={theme}>
      <ActionIcon
        variant={variant}
        onClick={() => handleClick(id)}
        aria-label={collection}
      >
        {isInCollection ? TrueIconComponent : FalseIconComponent}
      </ActionIcon>
    </MantineThemeProvider>
  )
}
