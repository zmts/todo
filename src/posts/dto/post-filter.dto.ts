import { IsOptional, IsBooleanString } from 'class-validator'

export class PostFilterDto {
  @IsOptional()
  @IsBooleanString()
  isFeatured: boolean

  @IsOptional()
  @IsBooleanString()
  isDraft: boolean
}
