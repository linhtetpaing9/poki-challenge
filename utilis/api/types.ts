import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export interface PokemonCard extends PokemonTCG.Card {
  cardmarket?: any;
}

export interface Marketplace {
  types?: any;
  params?: any;
  setParams?: any;
  cards: PokemonCard[];
  rarities?: any;
  sets?: any;
}

export interface Cart {
  products?: PokemonCard[];
}
