import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, ValidateNested } from 'class-validator';
import { CreateBlockDto } from './create-block.dto';

export class CreateQuizDto {
  @ApiProperty({ example: 'React Fundamentals', description: 'Quiz title' })
  @IsString()
  title: string;

  @ApiProperty({
    type: () => [CreateBlockDto],
    description: 'List of blocks in the quiz',
    required: false,
    default: [],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBlockDto)
  @IsOptional()
  blocks?: CreateBlockDto[];
}
