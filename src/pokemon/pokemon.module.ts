import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Pokemon,pokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports: [
    ConfigModule,
    MongooseModule.forFeature([{
      name:Pokemon.name,
      schema: pokemonSchema,
    }])
  ],
  exports:[PokemonService]
})
export class PokemonModule {}