import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { Block } from '../entities/block.entity';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizzesService {
  constructor(
    @InjectRepository(Quiz)
    private quizRepository: Repository<Quiz>,
    @InjectRepository(Block)
    private blockRepository: Repository<Block>,
  ) {}

  findAll() {
    return this.quizRepository.find({
      select: ['id', 'title', 'published', 'updatedAt'],
    });
  }

  findOne(id: string) {
    return this.quizRepository.findOne({
      where: { id },
      relations: ['blocks'],
    });
  }

  create(dto: CreateQuizDto) {
    const quiz = this.quizRepository.create(dto);
    return this.quizRepository.save(quiz);
  }

  async update(id: string, dto: UpdateQuizDto) {
    const existingQuiz = await this.findOne(id);
    if (!existingQuiz) {
      throw new NotFoundException('Quiz not found');
    }

    await this.quizRepository.update(id, {
      title: dto.title,
    });

    if (dto.blocks) {
      await this.blockRepository.delete({ quiz: { id } });

      for (const blockDto of dto.blocks) {
        const block = this.blockRepository.create({
          ...blockDto,
          quiz: { id } as Quiz,
        });
        await this.blockRepository.save(block);
      }
    }

    return this.findOne(id);
  }

  async publish(id: string) {
    const quiz = await this.findOne(id);
    if (!quiz) throw new NotFoundException('Quiz not found');
    quiz.published = true;
    return this.quizRepository.save(quiz);
  }

  async remove(id: string) {
    const quiz = await this.findOne(id);
    if (!quiz) throw new NotFoundException('Quiz not found');

    await this.quizRepository.remove(quiz);
    return { message: 'Quiz deleted successfully' };
  }
}
