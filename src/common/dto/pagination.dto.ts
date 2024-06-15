import { IsNumber, IsOptional } from 'class-validator'
import { Transform } from 'class-transformer'

export class PaginationDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  readonly limit = 10

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  @IsOptional()
  readonly offset = 0
}
