import { StatementResultingChanges } from "node:sqlite";

const BASE_URL = 'https://pokeapi.co/api/v2';

type FetchOptions = {
  signal?: AbortSignal;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export async function fetchPokemonList(
  limit = 20,
  offset = 0,
  options?: FetchOptions,
): Promise<PokemonListResponse> {
  const url = `${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`;
  const response = await fetch(url, { signal: options?.signal });

  if (!response.ok) {
    throw new Error('Falha ao buscar lista de Pokémon');
  }

  return response.json();
}

export type PokemonDetailResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    back_default: string | null;
    front_shiny: string | null;
    back_shiny: string | null;
  };
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
};

export async function fetchPokemonDetail(
  nameOrId: string | number,
  options?: FetchOptions,
): Promise<PokemonDetailResponse> {
  const url = `${BASE_URL}/pokemon/${nameOrId}`;
  const response = await fetch(url, { signal: options?.signal });

  if (!response.ok) {
    throw new Error('Falha ao buscar detalhes do Pokémon');
  }

  return response.json();
}

export type PokemonSpeciesResponse = {
  flavor_text_entries:{
    flavor_text: String;
    language: {
      name: String;
      url: string;
    };
    version:{
      name: String;
      url: string;
    }
  }[];
}

export async function fetchPokemonSpecies(
    nameOrId: string | number,
  options?: FetchOptions,
): Promise<PokemonSpeciesResponse>{
  const url = `${BASE_URL}/pokemon-speceis/${nameOrId}`;
  const response = await fetch(url, {signal: options?.signal});

  if(!response.ok){
    throw new Error ('Falha ao buscar informações da espécie de pokemon');
  }
  return response.json();

}


  

