import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserDto } from './user.dto';
import { AmountDto } from './amount.dto';


@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  //   @Get('editUser/:id')
  //   async editUser(@Param('id') id: number, @Res() res: Response) {
  //     const user = await this.userService.getUserById(id);
  //     res.cookie('user', user, { httpOnly: true });
  //     console.log(user);
  //     res.redirect('/editUser');
  //   }

  @Post('updateUser/:id')
  async updateCourse(
    @Param('id') id: number,
    @Body() userData: UserDto,
    @Res() res: Response,
  ) {
    const { firstname, lastname, phone, address } = userData;
    const user = await this.userService.getUserById(id);
    user.firstName = firstname;
    user.lastName = lastname;
    user.phone = phone;
    user.address = address;
    await this.userService.updateUser(user);
    return res.redirect('/updateInfor');
  }

  @Post('Naptien/:id')
  async naptien(
    @Param('id') id: number,
    @Body() body: AmountDto,
    @Res() res: Response,
  ) {
    const tien = parseInt(body.wallet, 10);
    const user = await this.userService.getUserById(id);
    user.wallet = tien;
    await this.userService.updateUser(user);
    return res.redirect('/home');
  }
}
