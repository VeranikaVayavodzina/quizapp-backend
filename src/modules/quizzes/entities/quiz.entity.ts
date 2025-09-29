import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Block } from './block.entity';

@Entity('quizzes')
export class Quiz {
  @ApiProperty({
    example: '550e8400-e29b-41d4-a716-446655440001',
    description: 'Quiz ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'React Fundamentals', description: 'Quiz title' })
  @Column()
  title: string;

  @ApiProperty({ example: false, description: 'Is quiz published?' })
  @Column({ default: false })
  published: boolean;

  @ApiProperty({
    type: () => [Block],
    description: 'List of blocks in the quiz',
  })
  @OneToMany(() => Block, (block) => block.quiz, { cascade: true, eager: true })
  blocks: Block[];

  @ApiProperty({ example: '2025-09-27T10:00:00Z', description: 'Date created' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ example: '2025-09-27T12:00:00Z', description: 'Date updated' })
  @UpdateDateColumn()
  updatedAt: Date;
}
