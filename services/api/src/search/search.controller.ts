import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { AuthenticatedRequest } from "../auth/authenticated-request";
import { SupabaseAuthGuard } from "../auth/supabase-auth.guard";
import { SearchSavedItemsDto } from "./dto/search-saved-items.dto";
import { SearchService } from "./search.service";

@Controller("saved-items")
@UseGuards(SupabaseAuthGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get("search")
  search(@Req() request: AuthenticatedRequest, @Query() query: SearchSavedItemsDto) {
    return this.searchService.search(request.user.id, query);
  }
}
