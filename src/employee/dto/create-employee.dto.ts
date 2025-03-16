import { IsString, IsNumber, IsDate  } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    fullName: string;

    @IsString()
    role: string;

    @IsString()
    department: string

    @IsNumber()
    salary: number;

    @IsDate()
    date0fBirth: Date;

    @IsDate()
    dateOfHire: Date;
}