package com.example.study.utils;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class Logger {
    public static String getTimeForLogger(String msg) {
        String formattedTime = LocalTime.now().format(DateTimeFormatter.ofPattern("HH:mm:ss:SSS"));
        System.out.println(formattedTime + " ::::::: >>>>>>>>> " + msg);
        return formattedTime + " ::::::: >>>>>>>>> " + msg;
    }
}
