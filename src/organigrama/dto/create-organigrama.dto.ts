import { ApiProperty } from "@nestjs/swagger";

export class CreateOrganigramaDto {
  name: string;

  @ApiProperty({ type: 'string' })
  father: string;

  @ApiProperty({ type: 'string' })
  children: string;
}
