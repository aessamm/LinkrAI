import { Type } from "class-transformer";
import { IsIn, IsInt, IsOptional, IsString, IsUUID, Max, Min } from "class-validator";

export type SearchMode = "keyword" | "semantic" | "hybrid";

export class SearchSavedItemsDto {
  @IsString()
  q!: string;

  @IsOptional()
  @IsIn(["keyword", "semantic", "hybrid"])
  mode?: SearchMode;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number;

  @IsOptional()
  @IsUUID()
  category_id?: string;

  @IsOptional()
  @IsString()
  tag?: string;

  @IsOptional()
  @IsString()
  source_platform?: string;

  @IsOptional()
  @IsString()
  from?: string;

  @IsOptional()
  @IsString()
  to?: string;
}
