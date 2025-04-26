import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  async create(postId: number, createCommentDto: CreateCommentDto, userId: number): Promise<Comment> {
    const comment = this.commentRepository.create({
      content: createCommentDto.content,
      post: { id: postId },
      author: { id: userId },
    });
    return this.commentRepository.save(comment);
  }

  async findAllByPostId(postId: number): Promise<Comment[]> {
    return this.commentRepository.find({
      where: { post: { id: postId } },
      relations: ['author'], // если хочешь сразу тянуть данные автора
    });
  }

  async findOne(postId: number, id: number): Promise<Comment> {
    const comment = await this.commentRepository.findOne({
      where: { id, post: { id: postId } },
      relations: ['author'],
    });
    if (!comment) {
      throw new NotFoundException('Комментарий не найден');
    }
    return comment;
  }

  async update(postId: number, id: number, updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const comment = await this.findOne(postId, id);
    Object.assign(comment, updateCommentDto);
    return this.commentRepository.save(comment);
  }

  async remove(postId: number, id: number): Promise<void> {
    const comment = await this.findOne(postId, id);
    await this.commentRepository.remove(comment);
  }
}
