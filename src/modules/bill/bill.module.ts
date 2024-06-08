import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Bill } from "@modules/bill/entities/bill.entity";
import { User } from "@modules/user/entities/user.entity";
import { Course } from "@modules/course/entities/course.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Bill, User, Course])],
    controllers: [],
    providers: []   
})

export class BillModule {
}