import {
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  
  export class UserDto {
    @ApiProperty()
    @IsNotEmpty()
    firstname: string;
  
    @ApiProperty()
    @IsNotEmpty()
    lastname: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;
  }

  