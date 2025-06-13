package com.villavista.VillaVista.repo;

import com.villavista.VillaVista.entity.Villa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface VillaRepository extends JpaRepository<Villa, Long> {

    @Query("SELECT DISTINCT r.villaTypes FROM Villa r")
    List<String> findDistinctVillaType();


    @Query("SELECT r from Villa r where r.villaTypes LIKE %:villaType% and r.id NOT IN (SELECT bk.villa.id FROM Booking bk WHERE " +
            "(bk.checkInDate <= :checkOutDate) AND (bk.checkOutDate >= :checkInDate))")
    List<Villa> findAvailableVillaByDatesAndTypes(LocalDate checkInDate, LocalDate checkOutDate, String villaType);

    @Query("SELECT r FROM Villa r WHERE r.id NOT IN (SELECT b.villa.id FROM Booking b)")
    List<Villa> getAllAvailableVilla();
}
