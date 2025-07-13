package com.pinkkstore.storeapi.cart;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.MappedCollection;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;
import java.util.Set;

@Data
@AllArgsConstructor
@Table("cart")
public class Cart {
    @Id
    private Long id;
    private String appUsername;
    private LocalDateTime lastModified;
    @MappedCollection(idColumn = "cart_id")
    private Set<CartRow> cartRows;
}
