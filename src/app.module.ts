import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import Joi from 'joi';
import { QuizzesModule } from './modules/quizzes/quizzes.module';
import { HealthController } from './health.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        DATABASE_URL: Joi.string().optional(),
        DB_HOST: Joi.string().optional(),
        DB_PORT: Joi.number().default(5432),
        DB_USER: Joi.string().optional(),
        DB_PASS: Joi.string().optional(),
        DB_NAME: Joi.string().optional(),
      }).or('DATABASE_URL', 'DB_HOST'),
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        const connectionString = config.get<string>('DATABASE_URL');

        if (connectionString) {
          return {
            type: 'postgres',
            url: connectionString,
            autoLoadEntities: true,
            synchronize: false,
            ssl: {
              rejectUnauthorized: false,
            },
            logging: false,
          };
        }

        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USER'),
          password: config.get<string>('DB_PASS'),
          database: config.get<string>('DB_NAME'),
          autoLoadEntities: true,
          synchronize: false,
          ssl: {
            rejectUnauthorized: false,
          },
          logging: false,
        };
      },
      inject: [ConfigService],
    }),
    QuizzesModule,
  ],
  providers: [],
  controllers: [HealthController],
})
export class AppModule {}
