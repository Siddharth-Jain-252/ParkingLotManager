package com.example.parking.dto;

import com.example.parking.enums.VehicleType;

public record VehicleDTO(
    String ownerName,
    VehicleType vehicleType,
    String licensePlate
) {}
