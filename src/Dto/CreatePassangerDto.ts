import { IsDate, IsString, isNumber } from "class-validator"
import { isDate } from "util/types";

export class CreatePassangerDto {

    @IsString()
    UserName: string;



    age: number;

    @IsString()
    passportNumberType: string;


    @IsString()
    birthDate: string;

    @IsString()
    Citizenship: string;



}