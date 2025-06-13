package com.villavista.VillaVista.service.interfac;

import com.villavista.VillaVista.dto.Response;
import com.villavista.VillaVista.entity.Booking;

public interface IBookingService {

    Response saveBooking(Long villaId, Long userId, Booking bookingRequest);

    Response findBookingByConfirmationCode(String confirmationCode);

    Response getAllBookings();

    Response cancelBooking(Long bookingId);

}

