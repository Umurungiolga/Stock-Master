package com.istock.api.Utils;



import com.istock.api.Exceptions.JwtExpiredException;
import com.istock.api.Exceptions.UnauthorisedException;
import com.istock.api.Repositories.UserRepository;
import com.istock.api.Response.UserResponse;
import com.istock.api.model.User;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;


import lombok.RequiredArgsConstructor;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class GetLoggedUser {
    private final UserRepository userRepository;

    public UserResponse getLoggedUser() throws Exception {
        try {
            if (SecurityContextHolder.getContext().getAuthentication().getPrincipal() == "anonymousUser") {
                throw new UnauthorisedException(("You are not logged in"));
            }

            String email;
            Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();

            if (principal instanceof UserDetails) {
                email = ((UserDetails) principal).getUsername();
            } else {
                email = principal.toString();
            }

            Optional<User> user = userRepository.findByEmail(email);
            UserResponse u;
            if (!user.isPresent()) {
                throw new ChangeSetPersister.NotFoundException();
            } else {

                u = UserResponse.builder()
                        .name(user.get().getName())
                        .email(user.get().getEmail())
                        .id(user.get().getId())
                        .build();
            }
            return u;
        } catch (JwtExpiredException e) {
            throw new JwtExpiredException("Jwt expired: " + e.getMessage());
        } catch (ChangeSetPersister.NotFoundException e) {
            throw new ChangeSetPersister.NotFoundException();
        } catch (Exception e) {
            e.printStackTrace();
            throw new Exception(e.getMessage());
        }
    }
}

