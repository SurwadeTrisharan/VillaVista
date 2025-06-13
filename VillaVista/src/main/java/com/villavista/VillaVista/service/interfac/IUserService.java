package com.villavista.VillaVista.service.interfac;


import com.villavista.VillaVista.dto.LoginRequest;
import com.villavista.VillaVista.dto.Response;
import com.villavista.VillaVista.entity.User;

public interface IUserService {

    Response register(User user);


    Response login(LoginRequest loginRequest);


    Response getAllUsers();


    Response getUserBookingHistory(String userId);

    Response deleteUser(String userId);

    Response getUserById(String userId);

    Response getMyInfo(String email);

}
