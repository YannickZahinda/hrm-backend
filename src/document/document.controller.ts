import { Controller, Post, Body, UseInterceptors, UploadedFile, Param } from '@nestjs/common';
import { DocumentService } from './document.service';
import { CustomUploadInterceptor } from 'src/interceptors/upload.interceptor';

@Controller('documents')
export class DocumentController {
    constructor(
        private readonly documentService: DocumentService,
    ){}

    @Post('upload/:employeeId')
    @UseInterceptors(CustomUploadInterceptor())
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Param('employeeId') employeeId: number) {
        return this.documentService.create(file.path, file.filename, employeeId)
    }

}
