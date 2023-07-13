import { ApiProperty } from "@nestjs/swagger";

export class CreateFatherDto {
  @ApiProperty({ type: 'string' })
  father: string;
}