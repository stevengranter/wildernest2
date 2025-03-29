import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {Button, Select, SimpleGrid, Text} from "@mantine/core"
import {randomId} from "@mantine/hooks"
import {useLogger} from "../../dev.js"
import useCollectionActions from "../_shared/hooks/useCollectionActions.jsx"
import {useCollections} from "../_shared/hooks/useCollections.js"
import useLocalSyncedImmerState
  from "../_shared/hooks/useLocalSyncedImmerState.js"
import {WildCard} from "./components/WildCard/WildCard.jsx"
import {Interweave} from "interweave"
import {useTransitionState} from "react-transition-state"

import "./CollectionView.css"

export default function CollectionView() {
  const [collections] = useCollections()
  const collectionAction = useCollectionActions()

  const [selectedCollectionId, setSelectedCollectionId] = useLocalSyncedImmerState(
      collectionAction.getCollectionIdByName("Starter" + " Pack"),
      "selectedCollectionId",
  )

  let itemIdsArray = [] as string[]

  function transform(node: HTMLElement, children: React.ReactNode): React.ReactNode {
    if (node.tagName === "A") {
      return <Link to={node.getAttribute("href") || ""}>{children}</Link>
    }
  }

  const selectedCollection = collections.find(
      (collection) => collection.id === selectedCollectionId
  )

  if (selectedCollection) itemIdsArray = selectedCollection.items

  // set a unique groupKey so TransitionGroup will rerender on selectedCollectionId change
  const [groupKey, setGroupKey] = useState<string | null>(null)

  useEffect(() => {
    setGroupKey(randomId())
  }, [selectedCollectionId])

  useLogger("CollectionView", [collections, selectedCollectionId, itemIdsArray])

  function handleDelete() {
    if (!selectedCollectionId) return
    collectionAction.deleteCollection(selectedCollectionId)
    setSelectedCollectionId(null)
  }

  return (
      <>
        <Select
            data={collections.map((collection) => {
              return { value: collection.id, label: collection.name }
            })}
            defaultValue={collectionAction.getCollectionIdByName("Starter Pack")}
            value={selectedCollectionId}
            onChange={setSelectedCollectionId}
            mb="xs"
            radius="lg"
            size="md"
        />

        {selectedCollection && (
            <>
              <Text m="xs">
                <Interweave
                    transform={transform}
                    content={selectedCollection.description}
                />
              </Text>
              {itemIdsArray.length === 0 && (
                  <Text m="xs">
                    Oops! No items in this collection. Add items through{" "}
                    <Link to="/search">Search</Link> or you can{" "}
                    <Button onClick={handleDelete}>Delete</Button> this collection
                  </Text>
              )}
              <SimpleGrid
                  cols={{ base: 1, xs: 1, sm: 2, md: 2, lg: 3, xl: 4, xxl: 4 }}
                  spacing={{ base: "lg" }}
                  verticalSpacing={{ base: "lg" }}
                  mt={"md"}
                  className="transition-grid"
              >
                {itemIdsArray.length > 0 &&
                    itemIdsArray.map((taxon_id) => <WildCardWithTransition taxon_id={taxon_id} key={taxon_id} />)
                    }
              </SimpleGrid>
            </>
        )}
      </>
  )
}

const WildCardWithTransition = ({taxon_id}:{taxon_id:string}) => {
  const [ state,toggle ] = useTransitionState({
    timeout: 500,
    // preEnter: true,
    preExit:true,
    mountOnEnter: true,
    unmountOnExit: true,
    onStateChange: (newState) => {console.log(newState)}
  })

  useEffect(() => {
    toggle(true);
  }, [toggle]);

  return (
      <div
          key={taxon_id}
          className={`card ${state.status}`}
      >
        <WildCard taxonId={taxon_id} />
      </div>
  )
}
