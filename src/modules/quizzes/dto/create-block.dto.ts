import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsObject, IsOptional } from 'class-validator';
import { BlockType } from '../entities/block.entity';

export class CreateBlockDto {
  @ApiProperty({
    example: 'heading',
    description: 'Block type',
    enum: BlockType,
  })
  @IsEnum(BlockType)
  type: BlockType;

  @ApiProperty({ example: 0, description: 'Block order in quiz' })
  @IsNumber()
  order: number;

  @ApiProperty({
    example: { text: 'Welcome to my quiz!', level: 1 },
    description: 'Block properties (varies by type)',
    required: false,
  })
  @IsObject()
  @IsOptional()
  properties?: Record<string, any>;
}
