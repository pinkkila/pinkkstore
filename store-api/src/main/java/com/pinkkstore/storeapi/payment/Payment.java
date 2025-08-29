package com.pinkkstore.storeapi.payment;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("payment")
public class Payment {
    @Id
    private Long id;
    private double amount;
}
