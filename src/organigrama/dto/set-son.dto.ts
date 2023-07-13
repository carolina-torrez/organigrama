import { ApiProperty } from "@nestjs/swagger";

export class CreateChildrenDto {
  @ApiProperty({ type: 'string' })
  children: string;
}
