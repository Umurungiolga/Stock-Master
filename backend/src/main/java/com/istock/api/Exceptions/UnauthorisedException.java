package com.istock.api.Exceptions;


public class UnauthorisedException extends RuntimeException {
    public UnauthorisedException(String msg){
        super(msg);    }
}

