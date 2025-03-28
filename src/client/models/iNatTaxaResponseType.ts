/* eslint-disable */

export interface iNatTaxaResponseType {
  total_results: number
  page: number
  per_page: number
  results: iNatTaxonRecord[]
}

export interface iNatTaxonRecord {
  id?: number
  rank: string
  rank_level: number
  iconic_taxon_id: number
  ancestor_ids: number[]
  is_active: boolean
  name?: string
  parent_id: number
  ancestry: string
  extinct: boolean
  default_photo?: DefaultPhoto
  taxon_changes_count: number
  taxon_schemes_count: number
  observations_count: number
  photos_locked: boolean
  flag_counts: FlagCounts
  current_synonymous_taxon_ids: number[] | undefined
  taxon_photos?: TaxonPhoto[]
  atlas_id?: number
  complete_species_count: number | undefined
  wikipedia_url?: string
  iconic_taxon_name: string
  preferred_common_name?: string
  english_common_name?: string
  ancestors: Ancestor[]
  conservation_statuses: Status[]
  conservation_status: string | undefined
  listed_taxa_count: number
  listed_taxa: ListedTaxa[]
  wikipedia_summary?: string
  vision: boolean
  children?: Children[]
}

export interface DefaultPhoto {
  id: number
  license_code: string
  attribution: string
  url: string
  original_dimensions: OriginalDimensions
  flags: any[]
  square_url: string
  medium_url: string
}

export interface OriginalDimensions {
  height: number
  width: number
}

export interface FlagCounts {
  resolved: number
  unresolved: number
}

export interface TaxonPhoto {
  taxon_id: number
  photo: Photo
  taxon: Taxon
}

export interface Photo {
  id: number
  license_code?: string
  attribution: string
  url: string
  original_dimensions: OriginalDimensions
  flags: any[]
  native_page_url?: string
  native_photo_id?: string
  type: string
  square_url: string
  small_url: string
  medium_url: string
  large_url: string
  original_url: string
}

export interface Taxon {
  id: number
  rank: string
  rank_level: number
  iconic_taxon_id: number
  ancestor_ids: number[]
  is_active: boolean
  name: string
  parent_id: number
  ancestry: string
  extinct: boolean
  default_photo: DefaultPhoto
  taxon_changes_count: number
  taxon_schemes_count: number
  observations_count: number
  photos_locked: boolean
  flag_counts: FlagCounts
  current_synonymous_taxon_ids: number[] | undefined
  atlas_id?: number
  complete_species_count: any
  wikipedia_url: string
  iconic_taxon_name: string
  preferred_common_name: string
}

export interface Ancestor {
  id: number
  rank: string
  rank_level: number
  iconic_taxon_id: number
  ancestor_ids: number[]
  is_active: boolean
  name: string
  parent_id: number
  ancestry: string
  extinct: boolean
  default_photo: DefaultPhoto
  taxon_changes_count: number
  taxon_schemes_count: number
  observations_count: number
  flag_counts: FlagCounts
  current_synonymous_taxon_ids: any
  atlas_id: any
  complete_species_count: any
  wikipedia_url?: string
  complete_rank?: string
  iconic_taxon_name: string
  preferred_common_name?: string
}

export interface Status {
  id: number
  taxon_id: number
  taxon_name: string
  taxon_rank: string
  status: string
  authority: string
  iucn: number
  url: string
  description: any
  source_id: number
  geoprivacy: any
  updater_id: any
  created_at: string
  updated_at: string
  place: any
}

export interface ListedTaxa {
  id: number
  taxon_id: number
  establishment_means: string
  place: Place
  list: List
}

export interface Place {
  id: number
  name: string
  display_name: string
  admin_level: number
  ancestor_place_ids: number[]
}

export interface List {
  id: number
  title: string
}

export interface Children {
  id: number
  rank: string
  rank_level: number
  iconic_taxon_id: number
  ancestor_ids: number[]
  is_active: boolean
  name: string
  parent_id: number
  ancestry: string
  extinct: boolean
  default_photo?: DefaultPhoto
  taxon_changes_count: number
  taxon_schemes_count: number
  observations_count: number
  flag_counts: FlagCounts
  current_synonymous_taxon_ids: any
  atlas_id: any
  complete_species_count: any
  wikipedia_url?: string
  iconic_taxon_name: string
  preferred_common_name?: string
}

// export interface OriginalDimensions5 {
//   height: number;
//   width: number;
// }

// export interface FlagCounts4 {
//   resolved: number;
//   unresolved: number;
// }
