package com.pinkkstore.storeapi.payment;

import org.springframework.data.repository.ListCrudRepository;

public interface PaymentRepository extends ListCrudRepository<Payment, Long> {
}
