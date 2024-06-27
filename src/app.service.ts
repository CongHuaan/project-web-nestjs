import { AdminService } from "@modules/admin/admin.service";
import { Injectable } from "@nestjs/common";

@Injectable({})

export class AppService {
    constructor(
        private adminService: AdminService,

    ) {}

    async getCourse(){
        const courseData = await this.adminService.getAllCourses();
        return courseData;
    }

    async getUser(){
        const userData = await this.adminService.getAllUsers();
        return userData;
    }

}