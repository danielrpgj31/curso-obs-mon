package com.example.study.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Logger {
        public static void LogForLogger(String msg) {
                String formattedTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss:SSS"));
                String threadId = " [" + Thread.currentThread().getId() + "] ";
                System.out.println(formattedTime + threadId + msg);
        }
}
