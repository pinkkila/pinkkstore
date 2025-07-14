package com.pinkkstore.storeapi.exception;

public record ApiException(int status, String error, String message) {
}
