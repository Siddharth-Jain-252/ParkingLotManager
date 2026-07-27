package com.example.parking.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.parking.dto.TicketRequestDTO;
import com.example.parking.dto.TicketResponseDTO;
import com.example.parking.dto.VehicleDTO;
import com.example.parking.entity.ParkingSlot;
import com.example.parking.enums.VehicleType;
import com.example.parking.service.ParkingService;

@RestController
@RequestMapping("/api/parking")
public class ParkingController {
    
    private final ParkingService parkingService;

    public ParkingController(ParkingService parkingService) {

        this.parkingService = parkingService;
    }

    @GetMapping("/test")
    public String parkVehicle() {

        return "API is working!";
    }

    @GetMapping("/slots")
    public List<ParkingSlot> emptySlots(@RequestParam String parkingLotName) {

        return parkingService.getEmptySlots(parkingLotName);
    }

    @GetMapping("/vehiclesTypes")
    public List<VehicleType> vehicles() {

        return parkingService.getVehicleTypes();
    }

    @GetMapping("/lot")
    public List<String> lots() {

        return parkingService.getParkingLots();
    }

    @PostMapping("/vehicle")
    public VehicleDTO saveVehicleDetails(@RequestBody VehicleDTO vehicleRequestDTO) {

        return parkingService.saveVehicleDetails(vehicleRequestDTO);
    }

    @GetMapping("/ticket")
    public TicketResponseDTO getTicket(@RequestBody TicketRequestDTO ticketRequestDTO) {

        return parkingService.getTicket(ticketRequestDTO);
    }

    @PostMapping("/deleteSlot")
    public void deleteSlot(@RequestParam String parkingLotName, @RequestParam String slotNumber) {

        parkingService.deleteSlot(parkingLotName, slotNumber);
    }

}
