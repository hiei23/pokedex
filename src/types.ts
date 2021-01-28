export interface PokemonAbility {
  ability: {
    name: string
    url: string
  }
  is_hidden: boolean
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: {
    name: string
    url: string
  }
}

export interface PokemonType {
  type: {
    name: string
    url: string
  }
}

export interface PokemonInfo {
  abilities: PokemonAbility[]
  base_experience: number
  name: string
  id: number
  sprites: {
    front_default: string
  }
  stats: PokemonStat[]
  types: PokemonType[]
  weight: number
}
