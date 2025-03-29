import React, {useEffect, useState} from "react"
import {FlipCard} from "../../../../components/ui/FlipCard";

import {
  ActionIcon,
  Anchor,
  AspectRatio,
  BackgroundImage,
  Box,
  Card,
  CardProps,
  Center,
  Flex,
  Group,
  Image,
  Loader,
  Overlay,
  Stack,
  Text,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core"
import {
  IconArrowForwardUp,
  IconHeart,
  IconHeartFilled,
  IconStar,
  IconStarFilled,
} from "@tabler/icons-react"
import {useQuery} from "@tanstack/react-query"
import {useLogger} from "../../../../dev.js"
import {API_SERVER} from "../../../_shared/api/constants"
import FoundItButton from "../../components/FoundItButton.jsx"
import ToggleCollectionButton from "../../components/ToggleCollectionButton.jsx"
import {
  iNatTaxaResponseType,
  iNatTaxonRecord,
} from "../../../../models/iNatTaxaResponseType.js"
import {WilderKindCardType} from "../../../../models/WilderKindCardType.js"
import {Interweave} from "interweave"

import styles from "./WildCard.module.css"

type WildCardProps = {
  taxonId?: number | string
  dataObject?: iNatTaxonRecord | undefined
  restProps?: CardProps | undefined
}

// const cardImagePath = "./assets/images/cards/"

export function WildCard({ taxonId, dataObject, restProps }: WildCardProps) {
  const [cardId, setCardId] = useState(taxonId)
  const [iNatData, setINatData] = useState(dataObject)
  const [isFlipped, setIsFlipped] = useState(false)
  // const [wilderNestData, setWilderNestData] =
  //   useState<WilderKindCardType | null>(null)

  useLogger("WildCard", [taxonId, dataObject])

  const iNatQuery = useQuery({
    queryKey: [API_SERVER.INAT, `/taxa`, `/${cardId}`],
    enabled: !!cardId,
  })

  useEffect(() => {
    if (iNatQuery.data) {
      const { results } = iNatQuery.data as iNatTaxaResponseType
      setINatData(results[0])
    }
  }, [iNatQuery.data])

  function handleFlip(e: React.MouseEvent) {
    e.preventDefault()
    if (iNatData && iNatData.id) setCardId(iNatData.id)
    setIsFlipped((prevState) => !prevState)
  }

  if (!iNatData) return null

  return (
    // <GridCol
    //   span={{
    //     base: 12,
    //     xs: 12,
    //     sm: 6,
    //     md: 6,
    //     lg: 4,
    //     xl: 3,
    //     xxl: 2,
    //   }}
    // >
    <FlipCard>
      <WildCard_Front
        iNatdata={iNatData}
        isLoading={iNatQuery.isLoading}
        handleFlip={handleFlip}
        // wilderNestData={wilderNestData}
        // onFlip={(e: React.MouseEvent) => handleFlip(e)}
        {...restProps}
      />
      <WildCard_Back
        iNatdata={iNatData}
        isLoading={iNatQuery.isLoading}
        handleFlip={handleFlip}
        // onFlip={(e: React.MouseEvent) => handleFlip(e)}
        {...restProps}
      />
    </FlipCard>
    // </GridCol>
  )
}

function WildCard_Front({
  iNatdata,
  isLoading,
  handleFlip,
  // wilderNestData,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  isLoading: boolean
  handleFlip?: (e: React.MouseEvent) => void
  wilderNestData?: WilderKindCardType | null
}) {
  const theme = useMantineTheme()
  if (!iNatdata) return null
  // console.log(iNatdata)

  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"lg"}
      shadow="md"
      className={styles.wildcard}
      pb="md"
      {...restProps}
    >
      <Card.Section>
        {/*{iNatdata.default_photo && (*/}
        <AspectRatio ratio={1}>
          <BackgroundImage
            src={
              iNatdata.default_photo
                ? iNatdata.default_photo?.medium_url
                : "assets/images/ui/no-photo-beaver-01.jpg"
            }
          >
            <Group justify="flex-end">
              <Tooltip label="Flip card">
                <ActionIcon
                  radius="xl"
                  size="lg"
                  onClick={handleFlip}
                  m="xs"
                  aria-label="Flip card"
                  // opacity="75%"
                >
                  <IconArrowForwardUp />
                </ActionIcon>
              </Tooltip>
            </Group>
          </BackgroundImage>
        </AspectRatio>
        {/*)}*/}
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
    </Card>
  )
}

function WildCard_Back({
  iNatdata,
  isLoading,
  handleFlip,
  ...restProps
}: {
  iNatdata: iNatTaxonRecord | null
  isLoading: boolean
  handleFlip?: (e: React.MouseEvent) => void
  _wilderNestData?: WilderKindCardType | null
}) {
  // const theme = useMantineTheme()
  if (!iNatdata) return null

  return (
    <Card
      key={iNatdata.id}
      withBorder
      radius={"lg"}
      className={styles.wildcard}
      {...restProps}
    >
      <Card.Section>
        <AspectRatio ratio={1}>
          <BackgroundImage
            src={
              iNatdata.default_photo
                ? iNatdata.default_photo?.medium_url
                : "assets/images/ui/no-photo-beaver-01.jpg"
            }
          >
            <AspectRatio ratio={1}>
              <Overlay p="md" color="#000" backgroundOpacity={0.4} blur={12}>
                <Card.Section>
                  <Group justify="flex-end">
                    <ActionIcon
                      radius="xl"
                      size="lg"
                      onClick={handleFlip}
                      m="xs"
                      aria-label="Flip card"
                    >
                      <IconArrowForwardUp />
                    </ActionIcon>
                  </Group>
                </Card.Section>
                <Stack justify="space-between">
                  {isLoading ? (
                    <Center>
                      <Loader color="white" type="bars" />
                    </Center>
                  ) : iNatdata.wikipedia_summary ? (
                    <Text
                      size="xs"
                      lineClamp={8}
                      color="white"
                      style={{ textShadow: "0px 0px 3px #000" }}
                    >
                      <Interweave content={iNatdata.wikipedia_summary} />
                    </Text>
                  ) : (
                    <Stack align="center">
                      <Image
                        src="assets/images/ui/sorry-owl.png"
                        alt="Sorry!"
                        h="auto"
                        w={"70%"}
                      />
                      <Text
                        size="md"
                        color="white"
                        style={{ textShadow: "0px 0px 3px #000" }}
                        fw={700}
                      >
                        Sorry, no description available
                      </Text>
                    </Stack>
                  )}

                  {iNatdata.wikipedia_url && (
                    <Box>
                      <Text
                        size="xs"
                        fs="italic"
                        lineClamp={2}
                        mt="xs"
                        color="white"
                      >
                        Source:{" "}
                        <Anchor href={iNatdata.wikipedia_url}>
                          {iNatdata.name} / Wikipedia{" "}
                        </Anchor>
                      </Text>
                    </Box>
                  )}
                </Stack>
              </Overlay>
            </AspectRatio>
          </BackgroundImage>
        </AspectRatio>
      </Card.Section>
      <WildCardFooter iNatdata={iNatdata} />
    </Card>
  )
}

function WildCardFooter({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  return (
    <>
      <Card.Section className={styles.header} inheritPadding>
        <Flex justify="space-between" my="md" wrap="nowrap">
          <div>
            <Title
              order={3}
              size="h4"
              lineClamp={1}
              pb={0}
              mb={0}
              style={{ textTransform: "capitalize" }}
            >
              {iNatdata?.preferred_common_name || iNatdata?.english_common_name}
            </Title>
            <Text size="xs" lineClamp={1} mt={0} pt={0}>
              {iNatdata.name}
            </Text>
          </div>
          {iNatdata.id && (
            <Flex justify="center" align="flex-start" gap="xs" wrap="nowrap">
              <CollectionToggleButtons iNatdata={iNatdata} />
            </Flex>
          )}
        </Flex>
      </Card.Section>

      <Group justify="space-between" align="flex-end">
        {iNatdata.id && iNatdata.name && (
          <FoundItButton
            size="lg"
            mb={0}
            data={{
              taxonId: iNatdata.id,
              taxonName: iNatdata.name,
              taxonCommonName: iNatdata.preferred_common_name,
            }}
          />
        )}
      </Group>
    </>
  )
}

function CollectionToggleButtons({ iNatdata }: { iNatdata: iNatTaxonRecord }) {
  const theme = useMantineTheme()
  return (
    <>
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Wishlist"
        TrueIconComponent={
          <IconStarFilled
            color="yellow"
            style={{ stroke: "orange", strokeWidth: "2" }}
          />
        }
        FalseIconComponent={<IconStar />}
        variant="transparent"
      />
      <ToggleCollectionButton
        id={iNatdata.id || ""}
        taxonName={iNatdata.name}
        taxonCommonName={iNatdata.preferred_common_name}
        collection="Favorites"
        TrueIconComponent={
          <IconHeartFilled
            color="red"
            style={{
              stroke: theme.colors.red[9],
              strokeWidth: "2",
            }}
          />
        }
        FalseIconComponent={<IconHeart />}
        variant="transparent"
      />
    </>
  )
}
