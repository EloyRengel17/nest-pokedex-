import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SeedModule } from './seed/seed.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EnvConfiguration } from './config/app.config';
import { JoinValidationSchema } from './config/joi.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [EnvConfiguration],
      validationSchema:JoinValidationSchema,
    }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..','public'),
    }),
    
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB'),
        dbName: 'pokemonsdb',
      }),
      inject: [ConfigService],
    }),

    PokemonModule,

    SeedModule,
  
 ],
})
export class AppModule {
  constructor(){
    //console.log(process.env)
  }
}
 