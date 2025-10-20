package com.pinkkstore.storeapi.order;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("order_item")
public class OrderItem {
    @Id
    private Long id;
    private int productQty;
    private double productOrderPrice;
    private Long productId;
}
