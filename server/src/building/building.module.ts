import { Module } from '@nestjs/common';
import { BuildingsService } from './building.service';
import { BuildingController } from './building.controller';
import { DbModule } from 'src/db/db.module';

@Module({
  imports: [DbModule],
  controllers: [BuildingController],
  providers: [BuildingsService],
  exports: [BuildingsService],
})
export class BuildingModule {}
