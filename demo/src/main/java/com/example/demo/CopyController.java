package com.example.demo;

import com.example.model.JobDetails;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import org.json.*;

import java.io.Console;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.ConsoleHandler;

@RestController
@Component
public class CopyController {

    @Autowired
    CopyService copyService;

    @RequestMapping("/login")
    public ModelAndView firstPage() {
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
    }

    @GetMapping(value = "/getSrcDBName", produces = "application/json")
    public ResponseEntity<List<String>> getSrcDBName() {
        List<String> js1 = new ArrayList<String>();
        try {
            js1.add("UAT");
            js1.add("INT");
            js1.add("BAT");        
            return ResponseEntity.status(HttpStatus.OK).body(js1);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping(value="/getSchName", produces = "application/json")
    public ResponseEntity<List<String>> getAllDBSchemas(){
        List<String> schemaList = new ArrayList<String>();
        try{
            schemaList.add("TRD");
            schemaList.add("COVID");
            schemaList.add("HACK");
            return ResponseEntity.status(HttpStatus.OK).body(schemaList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/getAllData", produces = "application/json")
    public ResponseEntity<List<JobDetails>> getAllJobDetails(){
        List<JobDetails> jobDetailsList = new ArrayList<JobDetails>();
        try{
            jobDetailsList=copyService.readFromFile();
            return ResponseEntity.status(HttpStatus.OK).body(jobDetailsList);
        }catch(Exception e){
            return (ResponseEntity<List<JobDetails>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping(path = "/authDB", consumes = "application/text")
    public ResponseEntity<String> authDB(@RequestParam("usr") String user, @RequestParam("pass") String pass,
    @RequestParam("dbname") String dbn){
        try{
            //The check DB  Authentication here.
            System.out.println("DB Authentication!" + user + " " + pass + " " + dbn);
            return ResponseEntity.status(HttpStatus.OK).body("true");
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(ExceptionUtils.getStackTrace(e));
        }

    }    
    @PostMapping(path = "/copyData", consumes = "application/json"/*, produces = "application/json"*/)
    public ResponseEntity<String> copy(@RequestBody JobDetails jobDetails){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now;
        now=LocalDateTime.now();
        System.out.println("Start time - "+dtf.format(now));
        int jobId;
        try {
            jobId = copyService.writeToFile(jobDetails.getFromDB(), jobDetails.getFromSchName(), jobDetails.getToDB(), jobDetails.getToSchName(), jobDetails.getTableName(), jobDetails.getCopyType());
            copyService.export(jobDetails.getFromSchName(), jobDetails.getFromPWD(), jobDetails.getFromDB(), jobDetails.getTableName(), jobId, jobDetails.getCopyType(), jobDetails.getPartition(), jobDetails.getTextArea());
            copyService.importData(jobDetails.getToSchName(), jobDetails.getToPWD(), jobDetails.getToDB(), jobId);
            now=LocalDateTime.now();
            System.out.println("End time - "+dtf.format(now));
            return ResponseEntity.status(HttpStatus.OK).body("true");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(ExceptionUtils.getStackTrace(e));
        }
    }
}