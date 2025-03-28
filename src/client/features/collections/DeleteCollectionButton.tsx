import {Button} from "@mantine/core"
import useCollectionActions
  from "../../features/_shared/hooks/useCollectionActions.js"

type Props = {
  collectionId: string
}

export default function DeleteCollectionButton({ collectionId }: Props) {
  const collectionAction = useCollectionActions()

  function handleClick() {
    //TODO: Confirmation that deleting collection does not delete cards, just
    // the collection/group
    // modals.open({
    //   title: "Delete",
    //   children: "Are you sure you want to delete this collection?",
    // })
    collectionAction.deleteCollection(collectionId)
  }

  return <Button onClick={handleClick}>Delete Collection</Button>
}
