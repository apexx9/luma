import { PartialType } from '@nestjs/swagger';
import { CreateBuildingDto } from './building.dto';

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {}
