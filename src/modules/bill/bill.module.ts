import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bill } from "@modules/bill/entities/bill.entity";
import { User } from "@modules/user/entities/user.entity";
import { Course } from "@modules/course/entities/course.entity";
import { BillController } from "@modules/bill/bill.controller";
import { BillService } from "@modules/bill/bill.service";
import { UserService } from "@modules/user/user.service";
import { AdminService } from "@modules/admin/admin.service";
import { Admin } from "@modules/admin/entities/admin.entity";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [TypeOrmModule.forFeature([Bill, User, Course, Admin])],
    controllers: [BillController],
    providers: [BillService, UserService, AdminService, JwtService]   
})

export class BillModule {
}