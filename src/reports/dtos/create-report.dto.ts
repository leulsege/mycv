import {
  IsNotEmpty,
  IsLatitude,
  IsLongitude,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { IsNull } from 'typeorm';

export class CreateReportDto {
  @IsNumber()
  @Max(1000000)
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  make: string;

  @IsNotEmpty()
  @IsString()
  model: string;

  @IsNumber()
  @Max(2050)
  @Min(1930)
  year: number;

  @IsNumber()
  @Max(1000000)
  @Min(0)
  mileage: number;

  @IsLongitude()
  lng: number;

  @IsLatitude()
  lat: number;
}
