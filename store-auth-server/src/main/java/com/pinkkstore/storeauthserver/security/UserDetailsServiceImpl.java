package com.pinkkstore.storeauthserver.security;

import com.pinkkstore.storeauthserver.appuser.AppUser;
import com.pinkkstore.storeauthserver.appuser.AppUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {
    private final AppUserRepository appUserRepository;
    
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return this.appUserRepository.findByUsername(username)
                .map(CustomUserDetails::new)
                .orElseThrow(() -> new UsernameNotFoundException("username " + username + " is not found"));
    }
    
    static final class CustomUserDetails extends AppUser implements UserDetails {
        
        private static final List<GrantedAuthority> ROLE_USER = Collections
                .unmodifiableList(AuthorityUtils.createAuthorityList("ROLE_USER"));
        
        CustomUserDetails(AppUser appUser) {
            super(appUser.getId(), appUser.getUsername(), appUser.getPassword());
        }
        
        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return ROLE_USER;
        }
        
    }
    
}
