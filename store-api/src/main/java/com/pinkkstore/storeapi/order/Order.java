package com.pinkkstore.storeapi.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@Table("customer_order")
public class Order {
    @Id
    private Long id;
    private String appUsername;
    private LocalDateTime orderDate;
    private double totalPrice;
    @MappedCollection(idColumn = "customer_order_id")
    private Set<OrderItem> orderItems;
}
