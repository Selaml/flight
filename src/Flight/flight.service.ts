import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { CreatePassangerDto } from "src/Dto/CreatePassangerDto";
import { SearchFlightDto } from "src/Dto/SearchFlights.Dto";

import { BookSeatsDto } from "src/Dto/BookSeats.dto";
import { generatePnrCode } from "src/utils/generatePNR";
import { FetchFlightDetailByPNRDTO } from "src/Dto/fetchFlightDetailByPNRDTo";
import { reservationDto } from "src/Dto/reservTicket.dyo";


@Injectable()

export class FlightService {
    // implements IProductServise
    private getMockData() {
        return {
            flight: [
                {
                    "flightId": "FL001",
                    "flightNumber": "AA123",
                    "origin": "LAX",
                    "destination": "JFK",
                    "departureTime": "2024-06-01T08:00:00Z",
                    "arrivalTime": "2024-06-01T16:00:00Z",
                    "carrierType": "AirlineA",
                    "class": "Economy",
                    "price": 300,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Meal"
                    ]
                },
                {
                    "flightId": "FL002",
                    "flightNumber": "BB234",
                    "origin": "LAX",
                    "destination": "JFK",
                    "departureTime": "2024-06-01T09:00:00Z",
                    "arrivalTime": "2024-06-01T17:00:00Z",
                    "carrierType": "AirlineB",
                    "class": "Business",
                    "price": 700,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal"
                    ]
                },
                {
                    "flightId": "FL003",
                    "flightNumber": "CC345",
                    "origin": "LAX",
                    "destination": "ORD",
                    "departureTime": "2024-06-01T10:00:00Z",
                    "arrivalTime": "2024-06-01T14:00:00Z",
                    "carrierType": "AirlineC",
                    "class": "First Class",
                    "price": 1000,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Premium meal",
                        "Extra legroom"
                    ]
                },
                {
                    "flightId": "FL004",
                    "flightNumber": "DD456",
                    "origin": "SFO",
                    "destination": "MIA",
                    "departureTime": "2024-06-02T06:00:00Z",
                    "arrivalTime": "2024-06-02T14:00:00Z",
                    "carrierType": "AirlineD",
                    "class": "Economy",
                    "price": 400,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Meal"
                    ]
                },
                {
                    "flightId": "FL005",
                    "flightNumber": "EE567",
                    "origin": "SFO",
                    "destination": "MIA",
                    "departureTime": "2024-06-02T07:00:00Z",
                    "arrivalTime": "2024-06-02T15:00:00Z",
                    "carrierType": "AirlineE",
                    "class": "Business",
                    "price": 800,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal"
                    ]
                },
                {
                    "flightId": "FL006",
                    "flightNumber": "FF678",
                    "origin": "SFO",
                    "destination": "SEA",
                    "departureTime": "2024-06-02T08:00:00Z",
                    "arrivalTime": "2024-06-02T10:00:00Z",
                    "carrierType": "AirlineF",
                    "class": "Economy",
                    "price": 150,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment"
                    ]
                },
                {
                    "flightId": "FL007",
                    "flightNumber": "GG789",
                    "origin": "ORD",
                    "destination": "DFW",
                    "departureTime": "2024-06-03T12:00:00Z",
                    "arrivalTime": "2024-06-03T14:00:00Z",
                    "carrierType": "AirlineG",
                    "class": "Economy",
                    "price": 200,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment"
                    ]
                },
                {
                    "flightId": "FL008",
                    "flightNumber": "HH890",
                    "origin": "ORD",
                    "destination": "DFW",
                    "departureTime": "2024-06-03T13:00:00Z",
                    "arrivalTime": "2024-06-03T15:00:00Z",
                    "carrierType": "AirlineH",
                    "class": "Business",
                    "price": 600,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal"
                    ]
                },
                {
                    "flightId": "FL009",
                    "flightNumber": "II901",
                    "origin": "JFK",
                    "destination": "LHR",
                    "departureTime": "2024-06-04T18:00:00Z",
                    "arrivalTime": "2024-06-05T06:00:00Z",
                    "carrierType": "AirlineI",
                    "class": "First Class",
                    "price": 2000,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Premium meal",
                        "Extra legroom",
                        "Flat-bed seat"
                    ]
                },
                {
                    "flightId": "FL010",
                    "flightNumber": "JJ012",
                    "origin": "JFK",
                    "destination": "LHR",
                    "departureTime": "2024-06-04T19:00:00Z",
                    "arrivalTime": "2024-06-05T07:00:00Z",
                    "carrierType": "AirlineJ",
                    "class": "Economy",
                    "price": 500,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Meal"
                    ]
                },
                {
                    "flightId": "FL011",
                    "flightNumber": "KK123",
                    "origin": "ATL",
                    "destination": "CDG",
                    "departureTime": "2024-06-05T20:00:00Z",
                    "arrivalTime": "2024-06-06T10:00:00Z",
                    "carrierType": "AirlineK",
                    "class": "Business",
                    "price": 1500,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal",
                        "Extra legroom",
                        "Flat-bed seat"
                    ]
                },
                {
                    "flightId": "FL012",
                    "flightNumber": "LL234",
                    "origin": "ATL",
                    "destination": "CDG",
                    "departureTime": "2024-06-05T21:00:00Z",
                    "arrivalTime": "2024-06-06T11:00:00Z",
                    "carrierType": "AirlineL",
                    "class": "Economy",
                    "price": 700,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Meal"
                    ]
                },
                {
                    "flightId": "FL013",
                    "flightNumber": "MM345",
                    "origin": "DFW",
                    "destination": "HND",
                    "departureTime": "2024-06-06T23:00:00Z",
                    "arrivalTime": "2024-06-07T15:00:00Z",
                    "carrierType": "AirlineM",
                    "class": "First Class",
                    "price": 2500,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Premium meal",
                        "Extra legroom",
                        "Flat-bed seat"
                    ]
                },
                {
                    "flightId": "FL014",
                    "flightNumber": "NN456",
                    "origin": "DFW",
                    "destination": "HND",
                    "departureTime": "2024-06-07T00:00:00Z",
                    "arrivalTime": "2024-06-07T16:00:00Z",
                    "carrierType": "AirlineN",
                    "class": "Business",
                    "price": 2000,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal",
                        "Extra legroom",
                        "Flat-bed seat"
                    ]
                },
                {
                    "flightId": "FL015",
                    "flightNumber": "OO567",
                    "origin": "DEN",
                    "destination": "LAX",
                    "departureTime": "2024-06-07T06:00:00Z",
                    "arrivalTime": "2024-06-07T08:00:00Z",
                    "carrierType": "AirlineO",
                    "class": "Economy",
                    "price": 250,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment"
                    ]
                },
                {
                    "flightId": "FL016",
                    "flightNumber": "PP678",
                    "origin": "DEN",
                    "destination": "LAX",
                    "departureTime": "2024-06-07T07:00:00Z",
                    "arrivalTime": "2024-06-07T09:00:00Z",
                    "carrierType": "AirlineP",
                    "class": "Business",
                    "price": 600,
                    "amenities": [
                        "WiFi",
                        "In-flight entertainment",
                        "Gourmet meal"
                    ]
                }
            ],

            seats: [{
                "flightId": "FL001",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL002",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL003",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL004",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL005",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL006",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL007",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL008",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            },
            {
                "flightId": "FL009",
                "seatMap": {
                    "firstClass": {
                        "seats": {
                            "1A": "available",
                            "1B": "booked",
                            "1C": "available",
                            "1D": "available",
                            "2A": "booked",
                            "2B": "booked",
                            "2C": "available",
                            "2D": "booked",
                            "3A": "available",
                            "3B": "available",
                            "3C": "available",
                            "3D": "available",
                            "4A": "booked",
                            "4B": "available",
                            "4C": "booked",
                            "4D": "available"
                        }
                    },
                    "businessClass": {
                        "seats": {
                            "5A": "available",
                            "5B": "available",
                            "5C": "booked",
                            "5D": "available",
                            "5E": "booked",
                            "5F": "available",
                            "6A": "booked",
                            "6B": "booked",
                            "6C": "available",
                            "6D": "available",
                            "6E": "available",
                            "6F": "booked",
                            "7A": "available",
                            "7B": "available",
                            "7C": "available",
                            "7D": "booked",
                            "7E": "available",
                            "7F": "available",
                            "8A": "available",
                            "8B": "booked",
                            "8C": "available",
                            "8D": "booked",
                            "8E": "available",
                            "8F": "available",
                            "9A": "booked",
                            "9B": "available",
                            "9C": "booked",
                            "9D": "available",
                            "9E": "available",
                            "9F": "available",
                            "10A": "available",
                            "10B": "available",
                            "10C": "booked",
                            "10D": "booked",
                            "10E": "available",
                            "10F": "available"
                        }
                    },
                    "economyClass": {
                        "seats": {
                            "11A": "booked",
                            "11B": "available",
                            "11C": "available",
                            "11D": "available",
                            "11E": "booked",
                            "11F": "available",
                            "11G": "available",
                            "11H": "available",
                            "11I": "available",
                            "12A": "available",
                            "12B": "available",
                            "12C": "available",
                            "12D": "booked",
                            "12E": "available",
                            "12F": "available",
                            "12G": "available",
                            "12H": "available",
                            "12I": "available",
                            "13A": "available",
                            "13B": "available",
                            "13C": "available",
                            "13D": "available",
                            "13E": "booked",
                            "13F": "available",
                            "13G": "available",
                            "13H": "available",
                            "13I": "available",
                            "14A": "available",
                            "14B": "available",
                            "14C": "available",
                            "14D": "available",
                            "14E": "available",
                            "14F": "available",
                            "14G": "booked",
                            "14H": "available",
                            "14I": "available",
                            "15A": "available",
                            "15B": "booked",
                            "15C": "available",
                            "15D": "available",
                            "15E": "available",
                            "15F": "available",
                            "15G": "available",
                            "15H": "available",
                            "15I": "booked",
                            "16A": "available",
                            "16B": "available",
                            "16C": "available",
                            "16D": "available",
                            "16E": "available",
                            "16F": "available",
                            "16G": "available",
                            "16H": "available",
                            "16I": "available",
                            "17A": "available",
                            "17B": "available",
                            "17C": "available",
                            "17D": "available",
                            "17E": "available",
                            "17F": "booked"
                        }
                    }
                }
            }
            ],


            passangerDetail: {
                "UserName": "",
                "age": 0,
                "passportNumberType": "",
                "birthDate": "",
                "Citizenship": ""

            },

            bookedFlight: [
                {
                    "flightId": "",
                    "pnr": "",
                    "payment": "pendding"
                }
            ],
            resrvedTicket: [{
                "flightId": "",
                "ticketNumber": ""
            }],
            bookedSeats: [{
                "flightId": "",
                "seatNumber": ""
            }]


        };
    }

    async createPassanger(createDto: CreatePassangerDto): Promise<object> {

        try {
            const datas = this.getMockData()
            const birthDate = new Date(createDto.birthDate);
            const ageDiffMs = Date.now() - birthDate.getTime();
            const ageDate = new Date(ageDiffMs); // The epoch will be set at 1970-01-01T00:00:00Z
            const calculateAge = Math.abs(ageDate.getUTCFullYear() - 1970);
            if (createDto.age === calculateAge) {

                datas.passangerDetail.UserName = createDto.UserName,
                    datas.passangerDetail.age = createDto.age,
                    datas.passangerDetail.passportNumberType = createDto.passportNumberType,

                    datas.passangerDetail.birthDate = createDto.birthDate,
                    datas.passangerDetail.Citizenship = createDto.Citizenship
                return {
                    msg: "succsesfuly Created",
                    status: 201,
                    passanger: datas.passangerDetail
                }

            }
            else {
                return new HttpException(
                    "Age dosent match with your bithdate",
                    HttpStatus.BAD_REQUEST)
            }





        }


        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }


    async serachFlights(createDto: SearchFlightDto): Promise<object> {


        try {
            const datas = this.getMockData()

            const filterdData = datas.flight.find(data =>
                data.destination === createDto.destination &&
                data.origin === createDto.origin &&
                data.carrierType === createDto.carrierType &&
                new Date(data.departureTime).getTime() === new Date(createDto.departureTime).getTime() &&
                new Date(data.arrivalTime).getTime() === new Date(createDto.arrivalTime).getTime()
            );
            if (filterdData) {
                return {
                    msg: "succsesful",
                    status: 201,
                    flight: filterdData
                }
            }
            else {
                return new HttpException(
                    "Flight Not Found",
                    HttpStatus.BAD_REQUEST)

            }
        }

        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }


    async getAvailableSeats(id: string): Promise<object> {


        try {

            const datas = this.getMockData()
            const filterdSeats = datas.seats.find(data => data.flightId === id);




            const findFlight = datas.flight.find(item => item.flightId === id)

            const flightClass = findFlight.class.toLocaleLowerCase().toString() + "Class"


            const seatMapForClass = filterdSeats.seatMap[flightClass]?.seats;


            if (seatMapForClass) {
                const availableSeats = Object.keys(seatMapForClass).filter(key => seatMapForClass[key] === "available");

                return {
                    msg: "succsesful",
                    status: 201,
                    flight: availableSeats
                }
            }

            else {
                return new HttpException(
                    "No Available Seats Found",
                    HttpStatus.BAD_REQUEST)

            }
        }

        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }



    async bookAvailableSeats(createDto: BookSeatsDto, id: string): Promise<object> {


        try {
            const datas = this.getMockData()
            const findFlight = datas.flight.find(item => item.flightId === id)
            const filteredSeats = datas.seats.find(data => data.flightId === id)
            const flightClass = findFlight.class.toLocaleLowerCase().toString() + "Class"
            const seatMapForClass = filteredSeats.seatMap[flightClass]?.seats;


            if (seatMapForClass) {
                const bookedSeat = {
                    "flightId": "",
                    "seatNumber": ""
                }

                const availableSeats = Object.keys(seatMapForClass).filter(key => seatMapForClass[key] === "available");
                const findAvailableSeat = availableSeats.includes(createDto.seat);
                bookedSeat.flightId = findFlight.flightId
                bookedSeat.seatNumber = createDto.seat
                datas.bookedSeats.push(bookedSeat)

                return {
                    msg: "successful",
                    status: 201,
                    seats: bookedSeat
                };
            } else {

                return new HttpException(
                    "no seats available for this flight",
                    HttpStatus.BAD_REQUEST)

            }

        }




        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }




    async bookFlight(id: string): Promise<object> {
        const datas = this.getMockData()

        try {

            const findFlight = datas.flight.find(item => item.flightId === id)


            if (findFlight) {
                let flights = {
                    "flightId": "",
                    "pnr": "",
                    "payment": "pending"

                }
                flights.flightId = findFlight.flightId,
                    flights.pnr = generatePnrCode()
                datas.bookedFlight.push(flights)
                return {
                    msg: "succsesfully Booked",
                    status: 201,
                    flight: datas.bookedFlight
                }

            }
        }




        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }



    async fetchFlightDetailByPNR(createDto: FetchFlightDetailByPNRDTO): Promise<object> {


        try {
            let datareturned = {
                "bookedFlight": {
                    "flight": {

                    }
                }
            }
            const datas = this.getMockData()
            const findBookedFlight = datas.bookedFlight.find(item => item.pnr === createDto.PNR)
            const flight = datas.flight.find(data => data.flightId === findBookedFlight.flightId)
            return {
                msg: "succsesfully Booked",
                status: 201,
                flight: datas.flight
            }

            // datareturned.bookedFlight.flight = flight
            // datareturned.bookedFlight = findBookedFlight,
            // const flightClass = findFlight.class.toString()
            // const findAvailableSeats = filterdSeats.seatMap.flightClass.seats.find(item => item === createDto.seat)
            // if (findAvailableSeats) {
            //     if (findAvailableSeats === "available") {
            //         return {
            //             msg: "succsesful",
            //             status: 201,
            //             seats: findAvailableSeats
            //         }
            //     }
            // }


        }




        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }


    async reserveTicket(createDto: FetchFlightDetailByPNRDTO): Promise<object> {


        try {
            let datareturned = {
                "bookedFlight": {
                    "flight": {

                    }
                }
            }
            const datas = this.getMockData()
            const findBookedFlight = datas.bookedFlight.find(item => item.pnr === createDto.PNR)
            const attachData = {
                "ticketNumber": "",
                "flightId": ""
            }
            if (findBookedFlight) {
                findBookedFlight.pnr = "ResrvedTicket"
                attachData.ticketNumber = generatePnrCode()
                attachData.flightId = findBookedFlight.flightId
                datas.resrvedTicket.push(attachData)
                return {
                    msg: "succsesfully reserved",
                    status: 201,
                    tickrtNumber: attachData
                }
            }



        }




        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }


    async getWithTicketNumber(createDto: reservationDto): Promise<object> {
        const datas = this.getMockData()

        try {

            const reservedTicket = datas.resrvedTicket.find(item => item.ticketNumber === createDto.ticketNumber)
            const flight = datas.flight.find(item => item.flightId === reservedTicket.flightId)
            return {
                msg: "succsesfully reserved",
                status: 201,
                flight: flight
            }
        }

        catch (error) {
            return new HttpException(
                error.message,
                HttpStatus.BAD_REQUEST)

        }
    }

}