package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages={"com.example.demo","com.example.model"})
public class DemoApplication /*extends SpringBootServletInitializer */ {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }
}