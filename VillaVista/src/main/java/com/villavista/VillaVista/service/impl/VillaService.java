package com.villavista.VillaVista.service.impl;

import com.villavista.VillaVista.dto.Response;
import com.villavista.VillaVista.dto.VillaDTO;
import com.villavista.VillaVista.entity.Villa;
import com.villavista.VillaVista.exception.OurException;
import com.villavista.VillaVista.repo.BookingRepository;
import com.villavista.VillaVista.repo.VillaRepository;
import com.villavista.VillaVista.service.AwsS3Service;
import com.villavista.VillaVista.service.interfac.IVillaService;
import com.villavista.VillaVista.utils.Utils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.math.BigDecimal;

import java.time.LocalDate;
import java.util.List;

@Service
public class VillaService implements IVillaService {

    @Autowired
    private VillaRepository villaRepository;
    @Autowired
    private BookingRepository bookingRepository;
    @Autowired
    private AwsS3Service awsS3Service;

    @Override
    public Response addNewVilla(MultipartFile photo, String villaType, BigDecimal villaPrice, String description) {
        Response response = new Response();

        try {
            String imageUrl = awsS3Service.saveImageToS3(photo);
            Villa villa = new Villa();
            villa.setVillaPhotoUrl(imageUrl);
            villa.setVillaTypes(villaType);
            villa.setVillaPrice(villaPrice);
            villa.setVillaDescription(description);
            Villa savedVilla = villaRepository.save(villa);
            VillaDTO villaDTO = Utils.mapVillaEntityToVillaDTO(savedVilla);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVilla(villaDTO);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }

    @Override
    public List<String> getAllVillaTypes() {

        return villaRepository.findDistinctVillaType();
    }

    @Override
    public Response getAllVilla() {
        Response response = new Response();

        try {
            List<Villa> villaList = villaRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
            List<VillaDTO> villaDTOList = Utils.mapVillaListEntityToVillaListDTO(villaList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVillaList(villaDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response deleteVilla(Long villaId) {
        Response response = new Response();

        try {
            villaRepository.findById(villaId).orElseThrow(() -> new OurException("Villa Not Found"));
            villaRepository.deleteById(villaId);
            response.setStatusCode(200);
            response.setMessage("successful");

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response updateVilla(Long villaId, String description, String villaType, BigDecimal villaPrice, MultipartFile photo) {
        Response response = new Response();

        try {
            String imageUrl = null;
            if (photo != null && !photo.isEmpty()) {
                imageUrl = awsS3Service.saveImageToS3(photo);
            }
            Villa villa = villaRepository.findById(villaId).orElseThrow(() -> new OurException("Villa Not Found"));
            if (villaType != null) villa.setVillaTypes(villaType);
            if (villaPrice != null) villa.setVillaPrice(villaPrice);
            if (description != null) villa.setVillaDescription(description);
            if (imageUrl != null) villa.setVillaPhotoUrl(imageUrl);

            Villa updatedVilla = villaRepository.save(villa);
            VillaDTO villaDTO = Utils.mapVillaEntityToVillaDTO(updatedVilla);

            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVilla(villaDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }


    @Override
    public Response getVillaById(Long villaId) {
        Response response = new Response();

        try {
            Villa villa = villaRepository.findById(villaId).orElseThrow(() -> new OurException("Villa Not Found"));
            VillaDTO villaDTO = Utils.mapVillaEntityToVillaDTOPlusBookings(villa);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVilla(villaDTO);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAvailableVillaByDateAndType(LocalDate checkInDate, LocalDate checkOutDate, String villaType) {
        Response response = new Response();

        try {
            List<Villa> availableVilla = villaRepository.findAvailableVillaByDatesAndTypes(checkInDate, checkOutDate, villaType);
            List<VillaDTO> villaDTOList = Utils.mapVillaListEntityToVillaListDTO(availableVilla);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVillaList(villaDTOList);

        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }

    @Override
    public Response getAllAvailableVilla() {
        Response response = new Response();

        try {
            List<Villa> villaList = villaRepository.getAllAvailableVilla();
            List<VillaDTO> villaDTOList = Utils.mapVillaListEntityToVillaListDTO(villaList);
            response.setStatusCode(200);
            response.setMessage("successful");
            response.setVillaList(villaDTOList);

        } catch (OurException e) {
            response.setStatusCode(404);
            response.setMessage(e.getMessage());
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error saving a villa " + e.getMessage());
        }
        return response;
    }
}
