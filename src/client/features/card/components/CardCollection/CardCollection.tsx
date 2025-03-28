import {SimpleGrid, Text} from "@mantine/core"
import {useLogger} from "../../../../dev.js"
import {WildCard} from "../WildCard/WildCard.jsx"

export default function CardCollection({
  itemIdArray,
  collectionId,
  description,
}: {
  itemIdArray: string[]
  collectionId?: string | null
  description?: string | null
}) {
  useLogger("CardCollection", [{ collectionId }, { itemIdArray }])
  if (!itemIdArray) return "Collection doesn't exist"
  if (itemIdArray.length === 0) return

  const groupKey = itemIdArray.join()
  console.log({ groupKey })

  return (
    itemIdArray.length > 0 && (
      <>
        {description && description.length > 0 && <Text>{description}</Text>}

        {/*<Grid gutter={{ xs: 16, sm: 20, lg: 24 }} my={"md"}>*/}
        <SimpleGrid
          cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
          spacing={{ base: "lg" }}
          verticalSpacing={{ base: "lg" }}
        >
          <div key={collectionId}>
            {itemIdArray.length > 0 &&
              itemIdArray?.map((taxon_id) => {
                return (
                  <div
                    key={taxon_id}
                    className="card"
                  >
                    <WildCard taxonId={taxon_id} />
                  </div>
                )
              })}
          </div>
        </SimpleGrid>
        {/*</Grid>*/}
      </>
    )
  )
}
