package com.villavista.VillaVista.service.interfac;

import com.villavista.VillaVista.dto.Response;


import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;


public interface IVillaService {
        Response addNewVilla(MultipartFile photo, String villaType, BigDecimal villaPrice, String description);

        List<String> getAllVillaTypes();

        Response getAllVilla();

        Response deleteVilla(Long villaId);

        Response updateVilla(Long villaId, String description, String villaType, BigDecimal villaPrice, MultipartFile photo);

        Response getVillaById(Long villaId);

        Response getAvailableVillaByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String villaType);

        Response getAllAvailableVilla();
}
