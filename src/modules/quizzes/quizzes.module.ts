import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { QuizzesController } from './controllers/quizzes.controller';
import { QuizzesSeeder } from './seeds/quizzes.seeder';
import { QuizzesService } from './services/quizzes.service';

import { Block } from './entities/block.entity';
import { Quiz } from './entities/quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Block])],
  controllers: [QuizzesController],
  providers: [QuizzesService, QuizzesSeeder],
})
export class QuizzesModule {}
