package com.villavista.VillaVista.controller;


import com.villavista.VillaVista.dto.Response;
import com.villavista.VillaVista.service.interfac.IBookingService;
import com.villavista.VillaVista.service.interfac.IVillaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/villa")
public class VillaController {

    @Autowired
    private IVillaService villaService;
    @Autowired
    private IBookingService iBookingService;


    @PostMapping("/add")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> addNewVilla(
            @RequestParam(value = "photo", required = false) MultipartFile photo,
            @RequestParam(value = "villaType", required = false) String villaType,
            @RequestParam(value = "villaPrice", required = false) BigDecimal villaPrice,
            @RequestParam(value = "villaDescription", required = false) String villaDescription
    ) {

        if (photo == null || photo.isEmpty() || villaType == null || villaType.isBlank() || villaPrice == null || villaDescription.isBlank()) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(photo, villaType,villaPrice)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = villaService.addNewVilla(photo, villaType, villaPrice, villaDescription);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all")
    public ResponseEntity<Response> getAllVillas() {
        Response response = villaService.getAllVilla();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/types")
    public List<String> getVillaTypes() {
        return villaService.getAllVillaTypes();
    }

    @GetMapping("/villa-by-id/{villaId}")
    public ResponseEntity<Response> getVillaById(@PathVariable Long villaId) {
        Response response = villaService.getVillaById(villaId);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/all-available-villa")
    public ResponseEntity<Response> getAllAvailableVillas() {
        Response response = villaService.getAllAvailableVilla();
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @GetMapping("/available-villa-by-date-and-type")
    public ResponseEntity<Response> getAvailableVillaByDateAndType(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkInDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate checkOutDate,
            @RequestParam(required = false) String villaType
    ) {
        if (checkInDate == null || villaType == null || villaType.isBlank() || checkOutDate == null) {
            Response response = new Response();
            response.setStatusCode(400);
            response.setMessage("Please provide values for all fields(checkInDate, villaType,checkOutDate)");
            return ResponseEntity.status(response.getStatusCode()).body(response);
        }
        Response response = villaService.getAvailableVillaByDateAndType(checkInDate, checkOutDate, villaType);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @PutMapping("/update/{villaId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> updateVilla(@PathVariable Long villaId,
                                                @RequestParam(value = "photo", required = false) MultipartFile photo,
                                                @RequestParam(value = "villaType", required = false) String villaType,
                                                @RequestParam(value = "villaPrice", required = false) BigDecimal villaPrice,
                                                @RequestParam(value = "villaDescription", required = false) String villaDescription

    ) {
        Response response = villaService.updateVilla(villaId, villaDescription, villaType, villaPrice, photo);
        return ResponseEntity.status(response.getStatusCode()).body(response);
    }

    @DeleteMapping("/delete/{villaId}")
    @PreAuthorize("hasAuthority('ADMIN')")
    public ResponseEntity<Response> deleteVilla(@PathVariable Long villaId) {
        Response response = villaService.deleteVilla(villaId);
        return ResponseEntity.status(response.getStatusCode()).body(response);

    }
}