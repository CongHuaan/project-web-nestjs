import { Controller, Get, Param, Post, Res } from "@nestjs/common";
import { BillService } from "@modules/bill/bill.service";
import { Response } from "express";
import { GetUser } from "@modules/user/decorator/get-user.decorator";
import { User } from "@modules/user/entities/user.entity";
import { Bill } from "@modules/bill/entities/bill.entity";
import { UserService } from "@modules/user/user.service";
import { AdminService } from "@modules/admin/admin.service";

@Controller('bill')

export class BillController {
    constructor(
        private billService: BillService,
        private userSerivce: UserService,
        private adminService: AdminService,
    ) {}

    @Post('dangky/:id')
    async dangky(@Param('id') courseId: number, @Res() res: Response, @GetUser() user: User) {
        const course = await this.adminService.getCourseById(courseId);
        course.slb += 1;
        const bill = new Bill();
        bill.courseId = courseId;
        bill.user = user;
        user.wallet = user.wallet - course.price;
        const updateUser = await this.userSerivce.updateUser(user); 
        const create = await this.billService.createBill(bill);
        const updateCourse = await this.adminService.updateCourse(course);
        res.redirect('/mykhoahoc');
    }
}