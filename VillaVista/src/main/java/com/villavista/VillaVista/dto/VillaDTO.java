package com.villavista.VillaVista.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;


@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VillaDTO {


    private Long id;
    private String villaTypes;
    private BigDecimal villaPrice;
    private String villaPhotoUrl;
    private String villaDescription;
    private List<BookingDTO> bookings;
}
