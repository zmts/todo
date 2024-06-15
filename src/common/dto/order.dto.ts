import { IsEnum, IsOptional, IsString } from 'class-validator'
import { IOrder, OrderDirection } from '../repo/repo.interface'

export class OrderDto<T> implements IOrder<T> {
  @IsString()
  @IsOptional()
  field?: keyof T | string = 'id'

  @IsOptional()
  @IsEnum(OrderDirection)
  direction?: OrderDirection = OrderDirection.ASC
}
