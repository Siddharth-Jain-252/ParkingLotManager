package com.example.parking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.parking.entity.ParkingLot;


public interface ParkingLotRepository extends JpaRepository<ParkingLot, Long> {
    
    List<ParkingLot> findByName(String name);
}
