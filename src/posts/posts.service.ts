import { Injectable } from '@nestjs/common'
import { PostsRepo } from './posts.repo'
import { IFindOptions, IPage } from '../common/repo/repo.interface'
import { Post } from './post.entity'
import { ICurrentUserContext } from '../common/interfaces/current-user.interface'
import { PostCreateDto } from './dto/post-create.dto'
import { ownerPolicy } from '../common/policy/owner.policy'
import { PostUpdateDto } from './dto/post-update.dto'

@Injectable()
export class PostService {
  constructor (
    private postsRepo: PostsRepo
  ) {}

  createPost (currentUser: ICurrentUserContext, postDto: PostCreateDto): Promise<Post> {
    return this.postsRepo.createPost({ userId: currentUser.id, ...postDto })
  }

  listPosts (currentUser: ICurrentUserContext, options: IFindOptions<Post>): Promise<IPage<Post>> {
    return this.postsRepo.getPostsByUserId(currentUser.id, options)
  }

  async getOnePost (currentUser: ICurrentUserContext, uuid: Post['uuid']) {
    const post = await this.postsRepo.getPostByUuid(uuid)
    ownerPolicy(currentUser, post)
    return post
  }

  async updatePost (currentUser: ICurrentUserContext, uuid: Post['uuid'], data: PostUpdateDto): Promise<Post> {
    const post = await this.postsRepo.getPostByUuid(uuid)
    ownerPolicy(currentUser, post)

    return this.postsRepo.updatePost({ id: post.id, ...data })
  }

  async deletePost (currentUser: ICurrentUserContext, uuid: Post['uuid']): Promise<{ uuid: Post['uuid'] }> {
    const post = await this.postsRepo.getPostByUuid(uuid)
    ownerPolicy(currentUser, post)

    await this.postsRepo.orm.delete(post.id)
    return { uuid }
  }
}
