package com.villavista.VillaVista.repo;

import com.villavista.VillaVista.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByVillaId(Long villaId);

    Optional<Booking> findByBookingConfirmationCode(String ConfirmationCode);

    List<Booking> findByUserId(Long userId);

}
