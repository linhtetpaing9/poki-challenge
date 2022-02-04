import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface PokemonCard extends PokemonTCG.Card {
  cardmarket?: any;
}
export interface OrderProduct extends PokemonCard {
  quantity?: number;
}

// any for now
export interface Marketplace {
  types?: any;
  params?: any;
  setParams?: any;
  cards: PokemonCard[];
  rarities?: any;
  sets?: any;
  order?: any;
  setOrder?: any;
}

export interface Order {
  products?: OrderProduct[];
}
