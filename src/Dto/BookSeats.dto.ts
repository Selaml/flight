import { IsString } from "class-validator"
import { isDate } from "util/types";

export class BookSeatsDto {

    @IsString()
    seat: string;





}