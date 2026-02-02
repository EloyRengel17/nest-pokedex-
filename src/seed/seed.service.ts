import { Injectable, Delete } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { PokeResponse } from './interfaces/poke-response.interface';
import { PokemonService } from 'src/pokemon/pokemon.service';
@Injectable()
export class SeedService {
  constructor(private readonly pokemonService: PokemonService) { }

  private readonly axios: AxiosInstance = axios;

  async executeSeed() {

    await this.pokemonService.deleteAll()

    const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')

    for (const { name, url } of data.results) {
      const segemts = url.split('/');
      const no: number = +segemts[segemts.length - 2]
      await this.pokemonService.create({ name, no })
    }


    return 'seed ejecutado correctamente';
  }
}
