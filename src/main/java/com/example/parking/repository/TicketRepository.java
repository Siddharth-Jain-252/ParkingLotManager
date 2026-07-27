package com.example.parking.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.parking.entity.Ticket;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    
}
