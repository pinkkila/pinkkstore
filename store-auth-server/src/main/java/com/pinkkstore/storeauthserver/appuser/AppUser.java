package com.pinkkstore.storeauthserver.appuser;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Data
@AllArgsConstructor
@Table("app_user")
public class AppUser {
    @Id
    private Long id;
    private String username;
    private String password;
}
