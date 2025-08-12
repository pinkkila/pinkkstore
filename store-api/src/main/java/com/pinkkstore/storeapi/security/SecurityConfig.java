package com.pinkkstore.storeapi.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration(proxyBeanMethods = false)
public class SecurityConfig {
    
    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/favicon.ico").permitAll()
                        .requestMatchers("/error").permitAll()
                        .requestMatchers("/actuator/health").permitAll()
                        .requestMatchers(HttpMethod.GET, "/products/**").permitAll()
                        .requestMatchers(HttpMethod.GET, "/carts").hasAnyAuthority("SCOPE_cart.read")
                        .requestMatchers(HttpMethod.PUT, "/carts").hasAnyAuthority("SCOPE_cart.write")
                        .requestMatchers(HttpMethod.GET, "/orders/**").hasAnyAuthority("SCOPE_order.read")
                        .requestMatchers(HttpMethod.POST, "/orders").hasAnyAuthority("SCOPE_order.write")
                        .anyRequest().authenticated())
                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                        .jwt(Customizer.withDefaults())
                )
                .csrf(AbstractHttpConfigurer::disable)
                .build();
    }
    
}
