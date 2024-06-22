import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Bill } from "@modules/bill/entities/bill.entity";
import { Repository } from "typeorm";

@Injectable({})

export class BillService {
  constructor(
    @InjectRepository(Bill)
    private billRepository: Repository<Bill>,
  ) {}

}