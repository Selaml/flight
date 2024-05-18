import { IsString } from "class-validator"
import { isDate } from "util/types";

export class FetchFlightDetailByPNRDTO {

    @IsString()
    PNR: string





}