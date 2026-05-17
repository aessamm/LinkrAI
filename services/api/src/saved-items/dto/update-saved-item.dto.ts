import { IsArray, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";

export class UpdateSavedItemDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  title?: string;

  @IsOptional()
  @IsUUID()
  category_id?: string | null;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  @MaxLength(5000)
  user_notes?: string | null;
}
