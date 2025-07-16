package com.pinkkstore.storeapi.order;

import org.springframework.data.repository.ListCrudRepository;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends ListCrudRepository<Order, Long> {
    List<Order> findAllByAppUsername(String appUsername);
    Optional<Order> findByAppUsernameAndId(String appUsername, Long id);
}
