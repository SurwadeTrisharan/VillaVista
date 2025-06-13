package com.villavista.VillaVista.service.impl;


import com.villavista.VillaVista.dto.ContactDTO;
import com.villavista.VillaVista.entity.ContactUs;
import com.villavista.VillaVista.repo.ContactRepository;
import com.villavista.VillaVista.service.interfac.IContactUsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContactUsService implements IContactUsService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public void submitContactForm(ContactDTO dto) {
        ContactUs contact = new ContactUs();
        contact.setName(dto.getName());
        contact.setEmail(dto.getEmail());
        contact.setSubject(dto.getSubject());
        contact.setMessage(dto.getMessage());

        contactRepository.save(contact);
    }
}



