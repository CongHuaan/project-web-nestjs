import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bill } from "@modules/bill/entities/bill.entity";
import { Repository } from "typeorm";
import { User } from "@modules/user/entities/user.entity";

@Injectable({})

export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createBill(bill: Bill) {
    const newBill = this.billRepository.create(bill);
    return await this.billRepository.save(newBill);
  }
}