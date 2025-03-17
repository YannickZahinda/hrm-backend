import { IsIn } from "class-validator";

export class UpdateCategoryDto {
    @IsIn(['CC2' , 'CC1' , 'M4' , 'MS' , 'SQ' , 'M1' , 'HQ', {message: 'Invalid category type'}])
    category: 'CC2' | 'CC1' | 'M4' | 'MS' | 'SQ' | 'M1' | 'HQ';
}