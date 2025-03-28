export interface WilderKindCardType {
  stages?:
    | {
        larva: undefined | number | string
        adult: undefined | number | string
        pupa: undefined | number | string
        egg: undefined | number | string
      }
    | undefined
  current_stage?: string
  nickname?: string
  taxon_id: string
  imgSrc?: string
  id: string
  created: string
}
