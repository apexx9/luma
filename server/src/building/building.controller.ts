import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Req,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { BuildingsService } from './building.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateBuildingDto } from './dto/building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';

@Controller('buildings')
@UseGuards(JwtAuthGuard)
export class BuildingController {
  constructor(private buildingsService: BuildingsService) {}

  @Get()
  async getAllBuildings(
    @Query('city') city?: string,
    @Query('type') type?: string,
    @Query('status') status?: string,
    @Query('managerId') managerId?: string,
  ) {
    return this.buildingsService.getAllBuildings();
  }

  @Get('search')
  async searchBuildings(@Query('q') query: string) {
    if (!query) {
      throw new HttpException(
        'Search query is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    return this.buildingsService.searchBuildings(query);
  }

  @Get('city/:city')
  async getBuildingsByCity(@Param('city') city: string) {
    return this.buildingsService.getBuildingsByCity(city);
  }

  @Get('type/:type')
  async getBuildingsByType(@Param('type') type: string) {
    return this.buildingsService.getBuildingsByType(type);
  }

  @Get('manager/:managerId')
  async getBuildingsByManager(@Param('managerId') managerId: string) {
    return this.buildingsService.getBuildingsByManager(parseInt(managerId));
  }

  @Get(':id')
  async getBuildingById(@Param('id') id: string) {
    const building = await this.buildingsService.getBuildingById(parseInt(id));
    if (!building) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }
    return building;
  }

  @Get(':id/stats')
  async getBuildingStats(@Param('id') id: string) {
    return this.buildingsService.getBuildingStats(parseInt(id));
  }
  @Post()
  async createBuilding(
    @Body() createBuildingDto: CreateBuildingDto,
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    return this.buildingsService.createBuilding(createBuildingDto, userId);
  }

  @Put(':id')
  async updateBuilding(
    @Param('id') id: string,
    @Body() updateBuildingDto: UpdateBuildingDto,
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    const building = await this.buildingsService.updateBuilding(
      parseInt(id),
      updateBuildingDto,
      userId,
    );
    if (!building) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }
    return building;
  }

  @Put(':id/status')
  async updateBuildingStatus(
    @Param('id') id: string,
    @Body('status') status: string,
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    return this.buildingsService.updateBuildingStatus(
      parseInt(id),
      status,
      userId,
    );
  }

  @Post(':id/images')
  async uploadBuildingImage(
    @Param('id') id: string,
    @Body('imageUrl') imageUrl: string,
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    return this.buildingsService.uploadBuildingImage(
      parseInt(id),
      imageUrl,
      userId,
    );
  }

  @Post('bulk-update')
  async bulkUpdateBuildings(
    @Body('buildings') buildingsData: any[],
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    return this.buildingsService.bulkUpdateBuildings(buildingsData, userId);
  }

  @Post('bulk-delete')
  async bulkDeleteBuildings(
    @Body('buildingIds') buildingIds: number[],
    @Req() req: any,
  ) {
    const userId = req.user?.userId || 1;
    return this.buildingsService.bulkDeleteBuildings(buildingIds, userId);
  }

  @Delete(':id')
  async deleteBuilding(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.userId || 1;
    const result = await this.buildingsService.deleteBuilding(
      parseInt(id),
      userId,
    );
    if (!result) {
      throw new HttpException('Building not found', HttpStatus.NOT_FOUND);
    }
    return result;
  }

  }
