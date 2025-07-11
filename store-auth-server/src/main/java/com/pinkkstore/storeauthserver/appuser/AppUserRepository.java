package com.pinkkstore.storeauthserver.appuser;

import org.springframework.data.repository.ListCrudRepository;

import java.util.Optional;

public interface AppUserRepository extends ListCrudRepository<AppUser, Long> {
    Optional<AppUser> findByUsername(String username);
}
