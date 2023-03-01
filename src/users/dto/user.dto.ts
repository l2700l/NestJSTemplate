import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';

export class UserDto {
  @ApiModelProperty({description: 'идентификатор пользователя', example: 123456})
  id: number
}
