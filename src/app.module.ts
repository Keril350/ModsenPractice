import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts/posts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',       
      password: '',               
      database: 'blogbd',         
      autoLoadEntities: true,     
      synchronize: false,          
    }),
    PostsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
