import { IsString } from "class-validator"
import { isDate } from "util/types";

export class SearchFlightDto {

    @IsString()
    origin: string
    @IsString()
    destination: string
    @IsString()
    departureTime: string
    @IsString()
    arrivalTime: string
    @IsString()
    carrierType: string




}