

import { Controller, Body, Post, Get, Param } from "@nestjs/common"
import { CreatePassangerDto } from "src/Dto/CreatePassangerDto"
import { FlightService } from "./flight.service"
import { SearchFlightDto } from "src/Dto/SearchFlights.Dto"
import { BookSeatsDto } from "src/Dto/BookSeats.dto"
import { FetchFlightDetailByPNRDTO } from "src/Dto/fetchFlightDetailByPNRDTo"
import { reservationDto } from "src/Dto/reservTicket.dyo"


@Controller('flight')

export class FlightController {
    constructor(private readonly flightServices: FlightService) { }

    @Post()

    async createPassanger(@Body() createDto: CreatePassangerDto): Promise<any> {
        return await this.flightServices.createPassanger(createDto)

    }

    @Post('/getFlight')

    async serachFlights(@Body() createDto: SearchFlightDto): Promise<any> {
        return await this.flightServices.serachFlights(createDto)

    }

    @Get(':id')

    async getselectedFlight(@Param('id') id: string): Promise<any> {
        return await this.flightServices.getAvailableSeats(id)

    }


    @Post('/flight/:id')

    async bookAvailableSeats(@Param('id') id: string, @Body() bookSeats: BookSeatsDto): Promise<any> {
        return await this.flightServices.bookAvailableSeats(bookSeats, id)

    }


    @Post(':id')

    async bookFlight(@Param('id') id: string): Promise<any> {
        return await this.flightServices.bookFlight(id)

    }



    @Get()

    async fetchFlightDetailByPNR(@Body() createDto: FetchFlightDetailByPNRDTO): Promise<any> {
        return await this.flightServices.fetchFlightDetailByPNR(createDto)

    }



    @Post()

    async reserveTicket(@Body() createDto: FetchFlightDetailByPNRDTO): Promise<any> {
        return await this.flightServices.reserveTicket(createDto)

    }




    @Get()

    async getWithTicketNumber(@Body() createDto: reservationDto): Promise<any> {
        return await this.flightServices.getWithTicketNumber(createDto)

    }










}