import { ApiProperty } from "@nestjs/swagger";

export class CreateNewEntityDto {
  @ApiProperty({ required: true })
  name: string;
}
