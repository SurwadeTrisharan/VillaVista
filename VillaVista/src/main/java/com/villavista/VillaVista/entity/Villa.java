package com.villavista.VillaVista.entity;


import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "villa")
public class Villa {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String villaTypes;
    private BigDecimal villaPrice;
    private String villaPhotoUrl;
    private String villaDescription;

    @OneToMany(mappedBy = "villa", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Booking> bookings = new ArrayList<>();




    @Override
    public String toString() {
        return "Villa{" +
                "id=" + id +
                ", villaTypes='" + villaTypes + '\'' +
                ", villaPrice=" + villaPrice +
                ", villaPhotoUrl='" + villaPhotoUrl + '\'' +
                ", villaDescription='" + villaDescription + '\'' +
                '}';
    }
}
