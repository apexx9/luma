import { IsString, IsNotEmpty, IsOptional, IsNumber, IsEnum, IsDecimal, Min, Max } from 'class-validator';

export class CreateBuildingDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  zipCode: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum(['Residential', 'Commercial', 'Mixed', 'Industrial', 'Retail'])
  type: string;

  @IsNumber()
  @Min(0)
  totalUnits: number;

  @IsOptional()
  @IsNumber()
  @Min(1800)
  @Max(new Date().getFullYear())
  yearBuilt?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  squareFootage?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  numberOfFloors?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  purchasePrice?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  monthlyRent?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  propertyTax?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  insurance?: number;

  @IsOptional()
  @IsString()
  @IsEnum(['active', 'inactive', 'maintenance'])
  status?: string;

  @IsOptional()
  @IsNumber()
  managerId?: number;

  @IsOptional()
  @IsDecimal()
  latitude?: number;

  @IsOptional()
  @IsDecimal()
  longitude?: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  description?: string;
}
