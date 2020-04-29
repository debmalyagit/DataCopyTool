package com.example.demo;

import com.example.model.JobDetails;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import java.io.File;
import java.sql.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
//import java.util.logging.ConsoleHandler;

@RestController
@Component
public class CopyController {
    String key = "Mary has one cat";
    File inputFile;
    File encryptedFile;
    File decryptedFile;

    Connection conFromDb, conToDb, connThrough;
    String fromUser, connThroughUser;

    @Autowired
    CopyService copyService;

    @RequestMapping("/login")
    public ModelAndView firstPage(){
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        return mv;
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
    @PostMapping(path = "/copyData", consumes = "application/json"/*, produces = "application/json"*/)
    public ResponseEntity<String> copy(@RequestBody JobDetails jobDetails){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now;
        now=LocalDateTime.now();
        System.out.println("Start time - "+dtf.format(now));
        int jobId;
        try {
            jobId = copyService.writeToFile(jobDetails.getFromDB(), jobDetails.getFromSchName(), jobDetails.getToDB(), jobDetails.getToSchName(), jobDetails.getTableName(), jobDetails.getCopyType());
            inputFile = new File("D:\\Vishakha\\Files\\"+jobId+".dmp");
            encryptedFile = new File("D:\\Vishakha\\Files\\"+jobId+".encrypted");
            decryptedFile = new File("D:\\Vishakha\\Files\\"+jobId+".decrypted");
            copyService.export(jobDetails.getFromSchName(), jobDetails.getFromPWD(), jobDetails.getFromDB(), jobDetails.getTableName(), jobId, jobDetails.getCopyType(), jobDetails.getPartition(), jobDetails.getTextArea());
            /*CryptoUtils.encrypt(key, inputFile, encryptedFile);
            CryptoUtils.decrypt(key, encryptedFile, decryptedFile);*/
            copyService.importData(jobDetails.getToSchName(), jobDetails.getToPWD(), jobDetails.getToDB(), jobId);
          //  CryptoUtils.encrypt(key, inputFile, encryptedFile);
          //  copyService.deleteFile(jobId);
            now=LocalDateTime.now();
            System.out.println("End time - "+dtf.format(now));
            return ResponseEntity.status(HttpStatus.OK).body("true");
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ExceptionUtils.getStackTrace(e));
        }
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

    @GetMapping(value="/getTabName", produces = "application/json")
    public ResponseEntity<List<String>> getAllTables(){
        List<String> tabList = new ArrayList<String>();
        /*
        try{
            Statement st = conFromDb.createStatement();
            ResultSet rs = st.executeQuery("select table_name from all_tables where owner='"+user.toUpperCase()+"'");
            while(rs.next()){
                tabList.add(rs.getString(1));
            }
            return ResponseEntity.status(HttpStatus.OK).body(tabList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
        */
        try{
            tabList.add("Customers");
            tabList.add("Trades");
            tabList.add("Job_Details");
            tabList.add("Transactions");
            tabList.add("Trades_10m");
            return ResponseEntity.status(HttpStatus.OK).body(tabList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value="/getTabName/{usr}", produces = "application/json")
    public ResponseEntity<List<String>> getAllTables(@PathVariable("usr") String usr){
        List<String> tabList = new ArrayList<String>();
       /* try{
            Statement st = conFromDb.createStatement();
            ResultSet rs = st.executeQuery("select table_name from all_tables where owner='"+usr.toUpperCase()+"'");
            while(rs.next()){
                tabList.add(rs.getString(1));
            }
            return ResponseEntity.status(HttpStatus.OK).body(tabList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        } */
        try{
            tabList.add("Customers");
            tabList.add("Trades");
            tabList.add("Job_Details");
            tabList.add("Transactions");
            tabList.add("Trades_10m");
            return ResponseEntity.status(HttpStatus.OK).body(tabList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @RequestMapping(value="/getPartName/{table}", method = RequestMethod.GET)
	public ResponseEntity<List<String>> getAllParts(@PathVariable("table") String table) {
		List<String> partList = new ArrayList<String>();
        try{
            partList.add(table.toString() + "P1");
            partList.add(table.toString() + "P2");
            partList.add(table.toString() + "P3");
            partList.add(table.toString() + "P4");
            partList.add(table.toString() + "P5");
            return ResponseEntity.status(HttpStatus.OK).body(partList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        /*
        try{
            Statement st = conFromDb.createStatement();
            ResultSet rs = st.executeQuery("select distinct partition_name from all_tab_partitions where table_name='"+table.toUpperCase()+"' and table_owner='"+user.toUpperCase()+"'");
            while(rs.next()){
                partList.add(rs.getString(1));
            }
            return ResponseEntity.status(HttpStatus.OK).body(partList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
         */
	}

    @RequestMapping(value = "/authDB", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<String> authDB(@RequestParam("usr") String user, @RequestParam("pass") String pass,
                                        @RequestParam("dbn") String dbn, @RequestParam("DbType") String dbType){
        try{
            //The check DB  Authentication here.
            
            if(user.isEmpty() || pass.isEmpty() || dbn.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body("false");                
            }
            if (pass.equals((user.toString() + "123"))){
                return ResponseEntity.status(HttpStatus.OK).body("true");
            }
            
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.OK).body(ExceptionUtils.getStackTrace(e));
        }
        System.out.println("DB Authentication!" + user + " " + pass + " " + dbn + " " +  (user + "123"));

        /*
        try {
            String url = "jdbc:oracle:thin:@localhost:1521:"+dbn;
            List<String> tableNamesList = null;
            Class.forName("oracle.jdbc.driver.OracleDriver");
            DriverManager.registerDriver(new oracle.jdbc.driver.OracleDriver());
            if(dbType.equalsIgnoreCase("source")){
                conFromDb = DriverManager.getConnection(url,user,pass);
            }else if(dbType.equalsIgnoreCase("target")){
                conToDb = DriverManager.getConnection(url,user,pass);
            }
            System.out.println("DB Authentication!" + user + " " + pass + " " + dbn);
            return ResponseEntity.status(HttpStatus.OK).body("true");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ExceptionUtils.getStackTrace(e));
        }
        */
        return ResponseEntity.status(HttpStatus.OK).body("false");
    }    
    @RequestMapping(value="/getAllGrantSchemaList", method = RequestMethod.GET)
    public ResponseEntity<List<String>> getAllGrantSchemaList() {
        List<String> grantedSchemaList = new ArrayList<String>();
       /* try{
            Statement st = conFromDb.createStatement();
            ResultSet rs = st.executeQuery("select distinct grantor from all_tab_privs where grantee='"+fromUser.toUpperCase()+"'");
            while(rs.next()){
                grantedSchemaList.add(rs.getString(1));
            }
            return ResponseEntity.status(HttpStatus.OK).body(grantedSchemaList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
*/
        try{
            grantedSchemaList.add("TRD1");
            grantedSchemaList.add("COVID1");
            grantedSchemaList.add("HACK1");
            return ResponseEntity.status(HttpStatus.OK).body(grantedSchemaList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping(value="/getColumnName/{usr}/{table}", produces = "application/json")
    public ResponseEntity<List<String>> getAllColumns(@PathVariable("usr") String usr, @PathVariable("table") String table) {
        List<String> columnList = new ArrayList<String>();
        /*try{
            Statement st = conFromDb.createStatement();
            ResultSet rs = st.executeQuery("SELECT column_name FROM all_tab_cols WHERE owner ='"+usr.toUpperCase()+"' and table_name = '"+table.toUpperCase()+"'");
            while(rs.next()){
                columnList.add(rs.getString(1));
            }
            return ResponseEntity.status(HttpStatus.OK).body(columnList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }*/
        try{
            columnList.add("COL1");
            columnList.add("COL2");
            columnList.add("COL3");
            return ResponseEntity.status(HttpStatus.OK).body(columnList);
        }catch(Exception e){
            return (ResponseEntity<List<String>>) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @PostMapping(path = "/createSyntheticData", consumes = "application/json"/*, produces = "application/json"*/)
    public ResponseEntity<String> createSyntheticData(@RequestBody String objString){
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy/MM/dd HH:mm:ss");
        LocalDateTime now;
        now=LocalDateTime.now();
        System.out.println("Start time - "+dtf.format(now));
        try {
            System.out.println(objString);
            return ResponseEntity.status(HttpStatus.OK).body("true");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(ExceptionUtils.getStackTrace(e));
        }
    }

    //schemas for connect through user
}