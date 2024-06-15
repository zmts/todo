import {
  Body,
  Controller,
  Delete,
  Get,
  Param, ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { PostService } from './posts.service'
import { Post as PostEntity } from './post.entity'
import { AuthGuard } from '../common/guards/auth.guard'
import { CurrentUserContext } from '../common/decorators/current-user-context.decorator'
import { ICurrentUserContext } from '../common/interfaces/current-user.interface'
import { PaginationDto } from '../common/dto/pagination.dto'
import { PostFilterDto } from './dto/post-filter.dto'
import { PostCreateDto } from './dto/post-create.dto'
import { OrderDto } from '../common/dto/order.dto'

@Controller('posts')
export class PostController {
  constructor (private postService: PostService) {}

  @Get()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  getListHandler (
    @Query('order') order: OrderDto<PostEntity>,
    @Query('pagination') pagination: PaginationDto,
    @Query('filter') filter: PostFilterDto,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.postService.listPosts(currentUser, { pagination, filter, order })
  }

  @Get(':uuid')
  @UseGuards(AuthGuard)
  getOneHandler (
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.postService.getOnePost(currentUser, uuid)
  }

  @Post()
  @UseGuards(AuthGuard)
  createPostHandler (
    @Body() dto: PostCreateDto,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.postService.createPost(currentUser, dto)
  }

  @Patch(':uuid')
  @UseGuards(AuthGuard)
  updatePostHandler (
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() dto: PostCreateDto,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.postService.updatePost(currentUser, uuid, dto)
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  deletePostHandler (
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @CurrentUserContext() currentUser: ICurrentUserContext
  ) {
    return this.postService.deletePost(currentUser, uuid)
  }
}
