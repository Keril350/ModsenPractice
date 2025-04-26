import { Controller, Post, Get, Body, Param, Delete, Patch, UseGuards, Req } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';

@Controller('posts/:postId/comments')
@UseGuards(JwtAuthGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(
    @Param('postId') postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @Req() req: any,
  ) {
    return this.commentsService.create(+postId, createCommentDto, req.user.id);
  }

  @Get()
  findAll(@Param('postId') postId: string) {
    return this.commentsService.findAllByPostId(+postId);
  }

  @Get(':id')
  findOne(
    @Param('postId') postId: string,
    @Param('id') id: string,
  ) {
    return this.commentsService.findOne(+postId, +id);
  }

  @Patch(':id')
  update(
    @Param('postId') postId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ) {
    return this.commentsService.update(+postId, +id, updateCommentDto);
  }

  @Delete(':id')
  remove(
    @Param('postId') postId: string,
    @Param('id') id: string,
  ) {
    return this.commentsService.remove(+postId, +id);
  }
}
