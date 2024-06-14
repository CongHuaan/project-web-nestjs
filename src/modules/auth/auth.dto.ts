import {
  IsEmail,
  IsNotEmpty,
  Validate,
  ValidateBy,
  ValidatorConstraint,
} from 'class-validator';
import { SignInValidator } from '@modules/auth/validator/signin.validator';
import { SignUpValidator } from '@modules/auth/validator/signup.validator';

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
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
