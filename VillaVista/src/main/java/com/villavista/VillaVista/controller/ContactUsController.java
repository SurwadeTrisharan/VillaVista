package com.villavista.VillaVista.controller;

import com.villavista.VillaVista.dto.ContactDTO;
import com.villavista.VillaVista.service.impl.ContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contactus")
@CrossOrigin(origins = "*")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitForm(@RequestBody ContactDTO dto) {
        contactUsService.submitContactForm(dto);
        return ResponseEntity.ok("Contact form submitted successfully.");
    }
}
