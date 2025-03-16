import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';

@Injectable()
export class DocumentService {
  constructor(
    @InjectRepository(Document)
    private readonly documentRepo: Repository<Document>,
  ) {}

  findAll() {
    return this.documentRepo.find({ relations: ['employee'] });
  }

  async create(filePath: string, filename: string, employeeId: number) {
    const document = this.documentRepo.create({
      filePath,
      filename,
      employee: { id: employeeId },
    });

    return await this.documentRepo.save(document);
  }

  async remove(id: number) {
    return await this.documentRepo.delete(id);
  }
}
