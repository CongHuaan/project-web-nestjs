import {
    IsNotEmpty,
  } from 'class-validator';
  import { ApiProperty } from '@nestjs/swagger';

  
  export class AmountDto {
    @ApiProperty()
    @IsNotEmpty()
    wallet: string;
  }

  