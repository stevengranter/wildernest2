import {useEffect, useState} from "react"
import {useSearchParams} from "react-router-dom"

import {
  Button,
  Center,
  Flex,
  Grid,
  GridCol,
  Pagination,
  TextInput,
  Title,
} from "@mantine/core"
import {useForm} from "@mantine/form"
import {useQuery} from "@tanstack/react-query"
import {useLogger} from "../../../dev.js"
import {API_SERVER} from "../../_shared/api/constants.js"
import DefaultPaper from "../../_shared/components/DefaultPaper.jsx"
import {WildCard} from "../../card/components/WildCard/WildCard.jsx"
import {iNatTaxaResponseType} from "../../../models/iNatTaxaResponseType.js"

const defaultQueryParams = {
  per_page: "6",
  rank: "species, subspecies",
}

type FormValues = {
  q?: string
  per_page: string
}

export default function SearchPage() {
  const form = useForm({ mode: "uncontrolled" })

  const [searchParams, setSearchParams] = useSearchParams()
  // const [pageNumber, setPageNumber] = useState(1)
  const [totalPages, setTotalPages] = useState(0)

  // const [hasLocalData, setHasLocalData] = useState(false)

  useLogger("SearchPage", [{ searchParams }])

  const { data, error, isLoading } = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa?`, `${searchParams}`],
    // Only run query if we have searchParams
    enabled: !!searchParams.get("q"),
  })

  const iNatData = data as iNatTaxaResponseType

  useLogger("SearchPage", [{ iNatData }])

  // useEffect(() => {
  //   const currentParams = Object.fromEntries([...searchParams]);
  //   // console.log({currentParams});
  // }, [searchParams]);

  useEffect(() => {
    // console.log(`Data updated`);
    // console.log(data);
    if (iNatData) {
      const totalPageNumber = Math.ceil(
        iNatData.total_results / iNatData.per_page,
      )
      setTotalPages(totalPageNumber)
    }
  }, [iNatData])

  function handleSubmit(formValues: FormValues) {
    // setPageNumber(1)
    setTotalPages(0)
    console.log(formValues)
    const params = { ...formValues, ...defaultQueryParams }
    setSearchParams((prev) => {
      prev.set("per_page", params.per_page)
      if (params.q) prev.set("q", params.q)
      if (params.rank) prev.set("rank", params.rank)
      return prev
    })
  }

  function changePage(pageNumber: number) {
    console.log(`Page #: ${pageNumber} requested`)
    const currentParams = Object.fromEntries([...searchParams])
    setSearchParams({ ...currentParams, page: pageNumber.toString() })
    console.log(searchParams.get("page"))
    // setPageNumber(pageNumber)
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <DefaultPaper>
      <Title order={1}>Search</Title>
      <p>
        Type in your findings here: animal, plant, or fungi. Results are sorted
        by number of observations recorded in the iNaturalist.org iNatDatabase.
      </p>
      <p>
        Once you've found the plant/animal you're looking for, click ❤️ to add
        it to your favorites, ⭐️ to add to your wishlist or the Add+ button to
        add it to another collection.
      </p>
      <form
        onSubmit={form.onSubmit((values) => handleSubmit(values as FormValues))}
      >
        <Flex align="flex-end">
          <TextInput
            placeholder="Grey Jay"
            key={form.key("q")}
            {...form.getInputProps("q")}
            label="Common name (for plant, animal, or fungi)"
            aria-label="Enter name for an animal, insect or plant"
          />
          <Button type="submit">Search</Button>
        </Flex>

        <div>
          {iNatData?.total_results &&
            `Total results: ${iNatData.total_results}`}
        </div>
      </form>

      {isLoading && "Loading..."}
      {iNatData && (
        <Grid gutter="lg">
          {iNatData.results &&
            iNatData?.results.map((result) => {
              return (
                <GridCol
                  span={{
                    base: 12,
                    xs: 12,
                    sm: 6,
                    md: 6,
                    lg: 4,
                    xl: 3,
                    xxl: 2,
                  }}
                  key={result.id}
                >
                  <WildCard dataObject={result} />
                </GridCol>
              )
            })}
        </Grid>
      )}

      {totalPages > 1 && (
        <Center>
          <Pagination
            total={totalPages}
            defaultValue={1}
            onChange={(page) => changePage(page)}
            key={form.key("page")}
            mt={"xl"}
          />
        </Center>
      )}
    </DefaultPaper>
  )
}
