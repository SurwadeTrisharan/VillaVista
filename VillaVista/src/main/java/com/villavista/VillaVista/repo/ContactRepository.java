package com.villavista.VillaVista.repo;

import com.villavista.VillaVista.entity.ContactUs;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ContactRepository extends JpaRepository<ContactUs, Long> {

}
