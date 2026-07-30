package com.example.parking.entity;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "parking_lots")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ParkingLot {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @OneToMany(mappedBy = "parkingLot",
               cascade = CascadeType.ALL,
               orphanRemoval = true)
    @JsonIgnore
    private List<ParkingSlot> parkingSlots = new ArrayList<>();

    @Column(name = "amount", nullable = false)
    private BigDecimal amount;
}
