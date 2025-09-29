import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Quiz } from './quiz.entity';

export enum BlockType {
  HEADING = 'heading',
  QUESTION = 'question',
  BUTTON = 'button',
  FOOTER = 'footer',
}

export enum QuestionType {
  SINGLE = 'single',
  MULTI = 'multi',
  TEXT = 'text',
}

@Entity('blocks')
export class Block {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Block ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'heading',
    description: 'Block type',
    enum: BlockType,
  })
  @Column({
    type: 'enum',
    enum: BlockType,
  })
  type: BlockType;

  @ApiProperty({ example: 0, description: 'Block order in quiz' })
  @Column()
  order: number;

  @ApiProperty({
    example: { text: 'Welcome', level: 1 },
    description: 'Block properties (varies by type)',
  })
  @Column('jsonb')
  properties: Record<string, any>;

  @ManyToOne(() => Quiz, (quiz) => quiz.blocks, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'quiz_id' })
  quiz: Quiz;

  @Column({ name: 'quiz_id' })
  quizId: string;
}
