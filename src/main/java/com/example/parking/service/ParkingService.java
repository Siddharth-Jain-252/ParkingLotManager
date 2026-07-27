package com.example.parking.service;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.parking.dto.TicketRequestDTO;
import com.example.parking.dto.TicketResponseDTO;
import com.example.parking.dto.VehicleDTO;
import com.example.parking.entity.ParkingLot;
import com.example.parking.entity.ParkingSlot;
import com.example.parking.entity.Ticket;
import com.example.parking.entity.Vehicle;
import com.example.parking.enums.VehicleType;
import com.example.parking.repository.ParkingLotRepository;
import com.example.parking.repository.ParkingSlotRepository;
import com.example.parking.repository.TicketRepository;
import com.example.parking.repository.VehicleRepository;

@Service
public class ParkingService {

    private final ParkingSlotRepository parkingSlotRepository;
    private final ParkingLotRepository parkingLotRepository;
    private final TicketRepository ticketRepository;
    private final VehicleRepository vehicleRepository;

    public ParkingService(
            ParkingSlotRepository parkingSlotRepository,
            ParkingLotRepository parkingLotRepository,
            TicketRepository ticketRepository,
            VehicleRepository vehicleRepository) {

        this.parkingSlotRepository = parkingSlotRepository;
        this.parkingLotRepository = parkingLotRepository;
        this.ticketRepository = ticketRepository;
        this.vehicleRepository = vehicleRepository;
    }

    public List<ParkingSlot> getEmptySlots(String parkingLotName) {

        Long lotId = parkingLotRepository
                .findByName(parkingLotName)
                .getFirst()
                .getId();
                
        return parkingSlotRepository.findByParkingLotIdAndIsOccupiedFalse(lotId);
    }

    public Double getTotalAmount(Ticket ticket) {

        if (ticket == null) {
            return null;
        }

        VehicleType vehicleType = ticket.getVehicle().getVehicleType();
        BigDecimal vehicleRate = vehicleType.getRate();
        BigDecimal lotRate = ticket.getParkingLot().getAmount();

        return vehicleRate.doubleValue() + lotRate.doubleValue();
    }

    public List<VehicleType> getVehicleTypes() {

    return Arrays.stream(VehicleType.values())
            .toList();
}

    public List<String> getParkingLots() {

        return parkingLotRepository.findAll()
                .stream()
                .map(lot -> lot.getName())
                .toList();
    }

    public VehicleDTO saveVehicleDetails(VehicleDTO vehicleRequestDTO) {

        if (vehicleRequestDTO == null) {
            return null;
        }

        Vehicle vehicle = new Vehicle();
        vehicle.setOwnerName(vehicleRequestDTO.ownerName());
        vehicle.setVehicleType(vehicleRequestDTO.vehicleType());
        vehicle.setLicensePlate(vehicleRequestDTO.licensePlate());

        vehicleRepository.save(vehicle);

        return vehicleRequestDTO;
    }

    public Ticket toTicketEntity(TicketRequestDTO ticketRequestDTO) {

        if (ticketRequestDTO == null) {
            return null;
        }

        Vehicle vehicle = vehicleRepository.findByLicensePlate(ticketRequestDTO.vehicleDTO().licensePlate()).get(0);
        ParkingLot parkingLot = parkingLotRepository.findByName(ticketRequestDTO.parkingLotName()).get(0);

        String ticketNumber = "TICKET-" + parkingLot.getName().charAt(4) + ticketRequestDTO.slotNumber().charAt(0) + System.currentTimeMillis();

        Ticket ticket = new Ticket();
        ticket.setTicketNumber(ticketNumber);
        ticket.setVehicle(vehicle);
        ticket.setParkingLot(parkingLot);

        return ticketRepository.save(ticket);
    }

    public TicketResponseDTO toDTO(Ticket ticket) {

        if (ticket == null) {
            return null;
        }

        Double totalAmount = getTotalAmount(ticket);

        ticket.setAmount(BigDecimal.valueOf(totalAmount));

        return new TicketResponseDTO(
                ticket.getTicketNumber(),
                ticket.getVehicle().getOwnerName(),
                ticket.getVehicle().getVehicleType(),
                ticket.getVehicle().getLicensePlate(),
                ticket.getEntryTime(),
                ticket.getParkingLot().getName(),
                ticket.getSlotNumber(),
                totalAmount
        );
    }

    public TicketResponseDTO getTicket(TicketRequestDTO ticketRequestDTO) {

        Ticket ticket = toTicketEntity(ticketRequestDTO);

        if (ticket == null) {
            return null;
        }

        return toDTO(ticket);
    }

}