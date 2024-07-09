import {
  IsEmail,
  IsNotEmpty,
  Validate,
  ValidateBy,
  ValidatorConstraint,
} from 'class-validator';
import { SignInValidator } from '@modules/auth/validator/signin.validator';
import { SignUpValidator } from '@modules/auth/validator/signup.validator';
import e from 'express';
import { ApiProperty } from '@nestjs/swagger';

// export class SignUpDto {
//   @IsEmail()
//   @IsNotEmpty()
//   @ValidateBy({
//     validator: SignUpValidator,
//     name: 'emailExistsValidator',
//   })
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

// export class SignInDto {
//   @IsEmail()
//   @IsNotEmpty()
//   @Validate(SignInValidator)
//   email: string;

//   @IsNotEmpty()
//   password: string;
// }

export class AuthDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class SignUpDto extends AuthDto {
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}
