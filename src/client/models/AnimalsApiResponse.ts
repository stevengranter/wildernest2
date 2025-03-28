export type AnimalsApiResponse = AnimalApiRecord[]

export interface AnimalApiRecord {
  name: string

  taxonomy: {
    kingdom: string
    phylum: string
    class: string
    order: string
    family: string
    genus: string
    scientific_name: string
  }

  locations: string[]

  characteristics: {
    prey: string // e.g. "Gazelle, Wildebeest, Hare"
    name_of_young: string // e.g. "Cub"
    group_behavior: string // e.g. "Solitary/Pairs"
    estimated_population_size: string // e.g. "8,500"
    biggest_threat: string // e.g. "Habitat loss"
    most_distinctive_feature: string // e.g. "Yellowish fur covered in small black spots"
    gestation_period: string // e.g. "90 days"
    habitat: string // e.g. "Open grassland"
    diet: string // e.g. "Carnivore"
    average_litter_size: string // e.g. "3"
    lifestyle: string // e.g. "Diurnal"
    common_name: string // e.g. "Cheetah"
    number_of_species: string // e.g. "5"
    location: string // e.g. "Asia and Africa"
    slogan: string // e.g. "The fastest land mammal in the world!"
    group: string // e.g. "Mammal"
    color: string // e.g. "BrownYellowBlackTan"
    skin_type: string // e.g. "Fur"
    top_speed: string // e.g. "70 mph"
    lifespan: string // e.g. "10 - 12 years"
    weight: string // e.g. "40kg - 65kg (88lbs - 140lbs)"
    height: string // e.g. "115cm - 136cm (45in - 53in)"
    age_of_sexual_maturity: string // e.g. "20 - 24 months"
    age_of_weaning: string // e.g. "3 months"
  }
}
