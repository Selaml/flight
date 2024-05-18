import { IsString } from "class-validator"


export class FetchFlightDetailByPNRDTO {

    @IsString()
    PNR: string





}