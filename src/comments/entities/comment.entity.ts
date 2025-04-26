import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @ManyToOne(() => Post, post => post.comments, { onDelete: 'CASCADE' })
  post: Post;

  @ManyToOne(() => User, user => user.comments, { eager: true, onDelete: 'CASCADE' })
  author: User;
}
