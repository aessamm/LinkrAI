import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { AuthenticatedRequest } from "../auth/authenticated-request";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { CreateSavedItemDto } from "./dto/create-saved-item.dto";
import { ListSavedItemsDto } from "./dto/list-saved-items.dto";
import { UpdateSavedItemDto } from "./dto/update-saved-item.dto";
import { SavedItemsService } from "./saved-items.service";

@Controller("saved-items")
@UseGuards(SupabaseAuthGuard)
export class SavedItemsController {
  constructor(private readonly savedItemsService: SavedItemsService) {}

  @Post()
  create(@Req() request: AuthenticatedRequest, @Body() dto: CreateSavedItemDto) {
    return this.savedItemsService.create(request.user.id, dto);
  }

  @Get()
  findAll(@Req() request: AuthenticatedRequest, @Query() query: ListSavedItemsDto) {
    return this.savedItemsService.findAll(request.user.id, query);
  }

  @Get(":id")
  findOne(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.savedItemsService.findOne(request.user.id, id);
  }

  @Patch(":id")
  update(
    @Req() request: AuthenticatedRequest,
    @Param("id") id: string,
    @Body() dto: UpdateSavedItemDto
  ) {
    return this.savedItemsService.update(request.user.id, id, dto);
  }

  @Delete(":id")
  remove(@Req() request: AuthenticatedRequest, @Param("id") id: string) {
    return this.savedItemsService.remove(request.user.id, id);
  }
}
