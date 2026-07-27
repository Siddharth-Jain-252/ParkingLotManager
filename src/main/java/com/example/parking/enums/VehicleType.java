package com.example.parking.enums;

import java.math.BigDecimal;

public enum VehicleType {
    
    MOTORCYCLE(10.0),
    CAR(20.0),
    BUS(50.0),
    TRUCK(100.0);

    private final BigDecimal rate;

    VehicleType(double rate) {
        this.rate = BigDecimal.valueOf(rate);
    }

    public BigDecimal getRate() {
        return rate;
    }
}
