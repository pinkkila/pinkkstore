package com.pinkkstore.storeapi.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("cart_row")
public class CartRow {
    @Id
    private Long id;
    private int productQty;
    private Long productId;
}
