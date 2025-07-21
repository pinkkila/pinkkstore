package com.pinkkstore.storeapi.product;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("product")
public class Product {
    @Id
    private Long id;
    private String productName;
    private String productDesc;
    private String imageUrl;
    private int stockQty;
    private int reservedQty;
    private double price;
    private Long categoryId;
}
