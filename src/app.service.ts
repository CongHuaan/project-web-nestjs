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

    async getBill(userId: number){
        const billData = await this.adminService.getAllBillById(userId);
        const courseData = await this.adminService.getAllCourses();
        const coursesInBills = [];
        for (const bill of billData) {
            const course = courseData.find(course => course.id === bill.course_id);
            
            if (course) {
              coursesInBills.push(course);
            }
          }
        return coursesInBills;
    }
}