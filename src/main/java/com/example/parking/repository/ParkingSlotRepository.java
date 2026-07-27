package com.example.parking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.parking.entity.ParkingSlot;

public interface ParkingSlotRepository extends JpaRepository<ParkingSlot, Long> {
    
    List<ParkingSlot> findByParkingLotIdAndIsOccupiedFalse(Long parkingLotId);

    List<ParkingSlot> findByParkingLotIdAndSlotNumber(Long parkingLotId, String slotNumber);
}
