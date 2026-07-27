package com.example.parking.dto;

import java.time.LocalDateTime;

import com.example.parking.enums.VehicleType;

public record TicketResponseDTO(
    String ticketNumber,
    String ownerName,
    VehicleType vehicleType,
    String licensePlate,
    LocalDateTime entryTime,
    String parkingLotName,
    String slotNumber,
    Double amount
) {}
