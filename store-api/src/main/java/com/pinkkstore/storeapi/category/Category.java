package com.pinkkstore.storeapi.category;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("category")
public class Category {
    @Id
    private Long id;
    private String categoryName;
}
