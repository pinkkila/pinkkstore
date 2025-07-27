package com.pinkkstore.storeapi.account;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("account")
public class Account {
    @Id
    private Long id;
    private String appUsername;
    private double coins;
}
