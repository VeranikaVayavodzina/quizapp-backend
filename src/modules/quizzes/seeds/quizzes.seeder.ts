import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Block } from '../entities/block.entity';
import { Quiz } from '../entities/quiz.entity';
import { quizSeeds } from './quizzes.seed';

@Injectable()
export class QuizzesSeeder implements OnModuleInit {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  async onModuleInit() {
    const count = await this.quizRepository.count();
    if (count === 0) {
      for (const seedData of quizSeeds) {
        const quiz = this.quizRepository.create({
          title: seedData.title,
          published: seedData.published,
        });
        const savedQuiz = await this.quizRepository.save(quiz);

        if (seedData.blocks) {
          for (const blockData of seedData.blocks) {
            const block = this.blockRepository.create({
              type: blockData.type as any,
              order: blockData.order,
              properties: blockData.properties,
              quiz: savedQuiz,
            });
            await this.blockRepository.save(block);
          }
        }
      }

      console.log('Database seeding completed!');
    } else {
      console.log('Database already has data, skipping seeding');
    }
  }
}
