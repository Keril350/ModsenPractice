import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'; // импортируем TypeOrmModule
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { Post } from './entities/post.entity'; // импортируем сущность

@Module({
  imports: [TypeOrmModule.forFeature([Post])], // добавляем это
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
