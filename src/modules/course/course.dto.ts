import {
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  
  export class CourseDto {
    @ApiProperty()
    @IsNotEmpty()
    name: string;
  
    @ApiProperty()
    @IsNotEmpty()
    description: string;

    @ApiProperty()
    @IsNotEmpty()
    price: number;
  }

  