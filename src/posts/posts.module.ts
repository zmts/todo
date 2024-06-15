import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PostService } from './posts.service'
import { PostsRepo } from './posts.repo'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [TypeOrmModule.forFeature([PostsRepo])],
  controllers: [PostController],
  providers: [PostService, PostsRepo],
})
export class PostsModule {}
