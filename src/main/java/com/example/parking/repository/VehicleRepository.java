package com.example.parking.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.parking.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    List<Vehicle> findByLicensePlate(String licensePlate);
}
