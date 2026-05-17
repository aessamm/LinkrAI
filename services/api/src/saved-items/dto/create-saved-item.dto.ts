import { IsUrl } from "class-validator";

export class CreateSavedItemDto {
  @IsUrl({ require_protocol: true })
  url!: string;
}
