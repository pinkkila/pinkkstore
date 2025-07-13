package com.pinkkstore.storeapi.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Set;

@Data
@AllArgsConstructor
@Table("cart")
public class Cart {
    @Id
    private Long id;
    private double cartPrice;
    private String sessionId;
    @MappedCollection(idColumn = "cart_id")
    private Set<CartRow> cartRows;
}
