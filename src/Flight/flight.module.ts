import { Module } from '@nestjs/common';

import { FlightController } from './flight.controller';
import { FlightService } from './flight.service';

@Module({
    imports: [],
    controllers: [FlightController],
    providers: [FlightService],
})
export class FlightModule { }
