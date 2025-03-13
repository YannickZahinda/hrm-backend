import { IsString  } from "class-validator";

export class CreateDocumentDto {
    @IsString()
    filename: string;

    @IsString()
    filepath: string;
}