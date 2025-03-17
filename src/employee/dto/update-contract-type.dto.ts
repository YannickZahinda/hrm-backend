import { IsIn } from "class-validator";

export class UpdateContractTypeDto {
    @IsIn(['CDI', 'CDD', {message: 'Invalid contract type'}])
    contractType: 'CDI' | 'CDD'
}