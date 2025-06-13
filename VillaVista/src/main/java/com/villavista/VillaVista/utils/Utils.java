package com.villavista.VillaVista.utils;

import com.villavista.VillaVista.dto.BookingDTO;
import com.villavista.VillaVista.dto.UserDTO;
import com.villavista.VillaVista.dto.VillaDTO;
import com.villavista.VillaVista.entity.Booking;
import com.villavista.VillaVista.entity.User;
import com.villavista.VillaVista.entity.Villa;

import java.security.SecureRandom;
import java.util.List;
import java.util.stream.Collectors;

public class Utils {
    private static final String ALPHANUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private static final SecureRandom secureRandom = new SecureRandom();


    public static String generateRandomConfirmationCode(int length) {
        StringBuilder stringBuilder = new StringBuilder();
        for (int i = 0; i < length; i++) {
            int randomIndex = secureRandom.nextInt(ALPHANUMERIC_STRING.length());
            char randomChar = ALPHANUMERIC_STRING.charAt(randomIndex);
            stringBuilder.append(randomChar);
        }
        return stringBuilder.toString();
    }


    public static UserDTO mapUserEntityToUserDTO(User user) {
    UserDTO userDTO = new UserDTO();
    userDTO.setId(user.getId());
    userDTO.setName(user.getName());
    userDTO.setEmail(user.getEmail());
    userDTO.setPhoneNumber(user.getPhoneNumber());
    userDTO.setRole(user.getRole());


    return userDTO;
    }

    public static VillaDTO mapVillaEntityToVillaDTO(Villa villa) {
        VillaDTO villaDTO = new VillaDTO();

        villaDTO.setId(villa.getId());
        villaDTO.setVillaTypes(villa.getVillaTypes());
        villaDTO.setVillaPrice(villa.getVillaPrice());
        villaDTO.setVillaPhotoUrl(villa.getVillaPhotoUrl());
        return villaDTO;
    }



    public static BookingDTO mapBookingEntityToBookingDTO(Booking booking) {
        BookingDTO bookingDTO = new BookingDTO();
        // Map simple fields
        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());
        return bookingDTO;
    }




    public static VillaDTO mapVillaEntityToVillaDTOPlusBookings(Villa villa) {
        VillaDTO villaDTO = new VillaDTO();

        villaDTO.setId(villa.getId());
        villaDTO.setVillaTypes(villa.getVillaTypes());
        villaDTO.setVillaPrice(villa.getVillaPrice());
        villaDTO.setVillaPhotoUrl(villa.getVillaPhotoUrl());
//        villaDTO.setVillaDescription(villa.getVillaDescription());

        if(villa.getBookings() != null) {
            villaDTO.setBookings(villa.getBookings().stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList()));
        }
        return villaDTO;
    }


    public static UserDTO mapUserEntityToUserDTOPlusUserBookingsAndVilla(User user) {
        UserDTO userDTO = new UserDTO();

        userDTO.setId(user.getId());
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setPhoneNumber(user.getPhoneNumber());
        userDTO.setRole(user.getRole());

        if (!user.getBookings().isEmpty()) {
            userDTO.setBookings(user.getBookings().stream().map(booking -> mapBookingEntityToBookingDTOPlusBookedVilla(booking, false)).collect(Collectors.toList()));
        }
        return userDTO;
    }

    public static BookingDTO mapBookingEntityToBookingDTOPlusBookedVilla(Booking booking, boolean mapUser) {
        BookingDTO bookingDTO = new BookingDTO();

        bookingDTO.setId(booking.getId());
        bookingDTO.setCheckInDate(booking.getCheckInDate());
        bookingDTO.setCheckOutDate(booking.getCheckOutDate());
        bookingDTO.setNumOfAdults(booking.getNumOfAdults());
        bookingDTO.setNumOfChildren(booking.getNumOfChildren());
        bookingDTO.setTotalNumOfGuest(booking.getTotalNumOfGuest());
        bookingDTO.setBookingConfirmationCode(booking.getBookingConfirmationCode());

        if(mapUser){
            bookingDTO.setUser(Utils.mapUserEntityToUserDTO(booking.getUser()));
        }
        if(booking.getVilla() !=null){
            VillaDTO villaDTO = new VillaDTO();

            villaDTO.setId(booking.getVilla().getId());
            villaDTO.setVillaTypes(booking.getVilla().getVillaTypes());
            villaDTO.setVillaPrice(booking.getVilla().getVillaPrice());
            villaDTO.setVillaPhotoUrl(booking.getVilla().getVillaPhotoUrl());
            villaDTO.setVillaDescription(booking.getVilla().getVillaDescription());
            bookingDTO.setVilla(villaDTO);
        }
        return bookingDTO;


    }

    public static List<UserDTO> mapUserListEntityToUserListDTO(List<User> userList) {
        return userList.stream().map(Utils::mapUserEntityToUserDTO).collect(Collectors.toList());
    }

    public static List<VillaDTO> mapVillaListEntityToVillaListDTO(List<Villa> villaList) {
        return villaList.stream().map(Utils::mapVillaEntityToVillaDTO).collect(Collectors.toList());
    }

    public static List<BookingDTO> mapBookingListEntityToBookingListDTO(List<Booking> bookingList) {
        return bookingList.stream().map(Utils::mapBookingEntityToBookingDTO).collect(Collectors.toList());
    }



}