import {
  IsOptional,
  IsNotEmpty,
  IsString,
} from 'class-validator'
import { Post } from '../post.entity'

export class PostUpdateDto implements Post {
  @IsOptional()
  @IsString()
  content: string

  @IsString()
  @IsNotEmpty()
  title: string
}
