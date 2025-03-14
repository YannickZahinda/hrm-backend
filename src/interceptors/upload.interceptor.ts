import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import * as path from 'path';

export const CustomUploadInterceptor = () => {
    return FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads', 
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                callback(null, uniqueSuffix + path.extname(file.originalname));
            }
        })
    })
  
}