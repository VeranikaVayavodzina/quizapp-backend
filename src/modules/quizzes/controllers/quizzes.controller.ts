import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateQuizDto } from '../dto/create-quiz.dto';
import { UpdateQuizDto } from '../dto/update-quiz.dto';
import { QuizzesService } from '../services/quizzes.service';

@ApiTags('quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all quizzes (list view)' })
  @ApiResponse({
    status: 200,
    description: 'List of quizzes (id, title, published, updatedAt)',
  })
  getAll() {
    return this.quizzesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get full quiz by id' })
  @ApiResponse({
    status: 200,
    description: 'Full quiz with questions and options',
  })
  getOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, description: 'Quiz successfully created' })
  create(@Body() dto: CreateQuizDto) {
    return this.quizzesService.create(dto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz successfully updated' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() dto: UpdateQuizDto) {
    return this.quizzesService.update(id, dto);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz marked as published' })
  publish(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.publish(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete quiz by id' })
  @ApiResponse({ status: 200, description: 'Quiz successfully deleted' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.remove(id);
  }
}
