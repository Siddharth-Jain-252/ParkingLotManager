package com.example.parking.dto;

public record TicketRequestDTO(
    VehicleDTO vehicleDTO,
    String parkingLotName,
    String slotNumber
) {}
