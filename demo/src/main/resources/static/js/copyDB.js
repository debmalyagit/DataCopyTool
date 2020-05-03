
var fAuthFlag=false;
var tAuthFlag=false;
var gfSName;
var gfPWD;
var gfDB;
var gtSName;
var gtPWD;
var gtDB;
var gOpenJoin=false;
var gOpenFilter=false;
var gJoinFreezed=false;
var gSCFreezed=false;
var finalJoins;
var finalSynthetic;

$(document).ready(function(){
    console.log('document is loaded');
   
    
    $('#headingTwo').click(function(){
        $('#collapseTwo').toggle();
    });
    $('#headingOne').click(function(){
        $('#collapseOne').toggle();
    });
    $('#part').hide();
    $('#Qry').hide();

    $('#copyType').click(function(){
        var ctype=$('#copyType').val();
        if(ctype=='TC'){
            $('#part').hide();
            $('#Qry').hide();
        }
        if(ctype=='PC'){
            $('#part').show();
            $('#Qry').hide();
        }
        if(ctype=='CC'){
            $('#part').hide();
            $('#Qry').show();
        }
    });


    $('#fAuth').click(function(){

        var fSName= $('#fSName').val();
        var pwd=$('#fPWD').val();
        var fDBName=$('#fDBName').val();
        gfSName = fSName;
        gfPWD = pwd;
        gfDB = fDBName;

        if(validateF(fDBName,fSName,pwd)){
            
            console.log({usr:fSName,pass:pwd,dbn:fDBName});
            $.post('/authDB',{usr:fSName,pass:pwd,dbn:fDBName,DbType:"source"})
            .done(function(response){
                console.log(response);

                if (response == "false"){
                    //alert("Better luck next time!");
                    alert("Source DB: Better luck next time!");
                }
                else {
                    fAuthFlag= true;
                    if (fAuthFlag) {
                        console.log("line: 60 fAuthFlag is True");
                    }
                    alert("Welcome! You are authenticated to Source DB.");
                    $('#fPWD').val = '';
                }
                console.log("Checking at line 64");
            if(fAuthFlag && tAuthFlag){
                console.log("Checking at line 66");
                $('#collapseOne').hide();
                $('#part').hide();
                $('#Qry').hide();
                loadTableList();
                $('#collapseTwo').show();
            }

            })
            .fail( function(xhr, textStatus, errorThrown) {
                alert("Sorce DB Connect Failed! "+xhr.responseText);
            });

            document.getElementById("fPWD").value='';
        }

    });

    $('#tAuth').click(function(){

        var tSName= $('#tSName').val();
        var pwd=$('#tPWD').val();
        var tDBName=$('#tDBName').val();
        gtSName = tSName;
        gtPWD = pwd;
        gtDB = tDBName;
        if(validateF(tDBName,tSName,pwd)){
            console.log({usr:tSName,pass:pwd,dbn:tDBName});
            $.post('/authDB',{usr:tSName,pass:pwd,dbn:tDBName,DbType:"target"})
            .done(function(response){
                console.log(response);

                if (response == "false"){
                    //alert("Better luck next time!");
                     alert("Better luck next time!");
                }
                else {
                    tAuthFlag= true;
                    if (fAuthFlag) {
                        console.log("line: 108 fAuthFlag is True");
                    }
                    if (tAuthFlag) {
                        console.log("line: 111 tAuthFlag is True");
                    }
                    alert("Welcome! You are authenticated to Target DB.");
                    $('#tPWD').val = '';
                }
                console.log("Checking at line 109");
                if(fAuthFlag && tAuthFlag){
                    console.log("Checking at line 111");
                    $('#collapseOne').hide();
                    $('#part').hide();
                    $('#Qry').hide();
                    $('#collapseTwo').show();
                    loadTableList();
            }
            })
            .fail( function(xhr, textStatus, errorThrown) {
                alert("Target DB Connect Failed! "+xhr.responseText);
            });


            document.getElementById("tPWD").value='';

        }

    });


    $('#collapseTwo').show(function(){
        loadTableList();
    });

    $('#copyType').click(function(){
        loadPartition();
    });

    $('#tableName').click(function(){
        loadPartition();
    });

    $('#sub').click(function(){

            var tableName= $('#tableName').val();
            var copyType= $('#copyType').val();
            var Textarea= $('#Textarea').val();            
            var Partition= $('#Partition').val();
            console.log(tableName + ' ' + Partition + ' ' + Textarea);



            if(gfDB=='' || gfDB==undefined || gfSName=='' || gfSName==undefined|| gfPWD=='' || gfPWD==undefined){
                alert('Please Authenticate Source DB!');
                return false;
            }

            if(gtDB=='' || gtDB==undefined || gtSName=='' || gtSName==undefined || gtPWD=='' || gtPWD==undefined){
                alert('Please Authenticate Target DB!');
                return false;
            }

            if(tableName==''){
                alert('Please select table Name!');
                return false;
            }
            else if( copyType==''){
                alert('Please select Copy Type!');
                return false;
            }else if(copyType=='CC' && Textarea==''){
                alert('Please provide Query!');
                return false;

            }else if(copyType=='PC' && Partition==''){
                alert('Please select partition!');
                return false;

            }
            if(!confirm("Are you sure want to submit!")){
                return false;
            }
           var jobDetails=JSON.stringify({
                    'fromSchName': gfSName,
                    'fromPWD': gfPWD,
                    'fromDB': gfDB,
                    'toSchName': gtSName,
                    'toPWD': gtPWD,
                    'toDB': gtDB,
                    'tableName': tableName,
                     'copyType': copyType,
                     'textArea': Textarea,
                     'partition': Partition,
           });

             $.ajax({
              type: 'POST',
              url: '/copyData',
              contentType: 'application/json',
              dataType: 'json',
              data: jobDetails,

      });

      alert("Your Request has been Successfully Submitted. For details please check Dashboard!");
                 document.getElementById("mainForm").reset();
                 fAuthFlag=false;
                 tAuthFlag=false;
              $('#collapseTwo').toggle();
                 $('#collapseOne').toggle();
                           
    });

    $('#dashboard-tab').click(function(){
       var obj=$('#dashtable');

           var dashbody=$('#dashbody');
            dashbody.empty();
            $.ajax({
                type: 'GET',
                url: '/getAllData',
                success: function(result) {
                    console.log('success:',result);
                    $.each(result,function(i,item){
                    dashbody.append('<tr>');
                     dashbody.append('<td>'+item.jobId+'</td><td>'+item.fromDB+'</td>');
                     dashbody.append ('<td>'+item.fromSchName +'</td><td>'+item.toDB +'</td><td>'+item.toSchName +'</td>')
                     dashbody.append ('<td>'+item.tableName +'</td><td>'+item.copyType +'</td><td>'+item.createTime +'</td>');
                     dashbody.append ('<td>'+item.endTime +'</td><td>'+item.status +'</td>');
                     dashbody.append('</tr>');
                    });
                },
                error: function(result){
                    console.log('failure',result);
                    alert("System Error. Please contact admin");

                }
             });

        });

        loadSyntheticDataPage();

        
        
        $('#SynPassCon').on('input change', function () {
            if ($(this).val() != '') {
                $('#SynAuthSubCon').prop('disabled', false);
            }
            else {
                $('#SynAuthSubCon').prop('disabled', true);
            }
        });

        

        $('#SynAuthSubCon').click(function(){
            console.log("Entered SynAuthSubCon Login button");
            fSName = $('#SynUsrCon').val();
            pwd = $('#SynPassCon').val();
            fDBName = $('#SynDBNameCon option:selected').text();
            var i;

            $.post('/authDB',{usr:fSName,pass:pwd,dbn:fDBName,DbType:"user"})
            .done(function(response){
                console.log(response);

                if (response == "false"){
                    //alert("Better luck next time!");
                    alert("Source DB: Better luck next time!");
                    $('#SynPassCon').val = '';
                    $('#SynAuthSubCon').prop('disabled', true);
                    return false;
                }
                else {
                    fAuthFlag= true;
                    if (fAuthFlag) {
                        console.log("fAuthFlag is True");
                    }
                    alert("Welcome! You are authenticated to : " + fSName);
                    $('#SynPassCon').val = '';
                    
                    
                    for(i=4;i<=7;i++){
                        $('#SynRow' + i).show();
                    }

                    $.get("/getAllGrantSchemaList").done(function(response){
                        console.log(response);
                        $('#SynSchName1').empty();
                        $('#SynSchName1').append("<option value='' selected>--Select--</option>");
                        $('#SynSchName2').empty();
                        $('#SynSchName2').append("<option value='' selected>--Select--</option>");
                        $.each(response,function(index, value){
                            console.log(value);
                            $('#SynSchName1').append("<option value='" + value + "'>"+value+"</option>");
                            $('#SynSchName2').append("<option value='" + value + "'>"+value+"</option>");
                        });

                    })
                    .fail( function(xhr, textStatus, errorThrown) {
                        console.log("List retrieve Failed! "+xhr.responseText);
                    });
                  
              
                }
                console.log("Checking ");
               

            })
            .fail( function(xhr, textStatus, errorThrown) {
                alert("Sorce DB Connect Failed! "+xhr.responseText);
                $('#SynPassCon').val = '';
                $('#SynAuthSubCon').prop('disabled', true);
                return false;
                
            });           

            $('#SynPassCon').val = '';
        });

        $('#SynSchName1').change(function(){
            var selOpt = $('#SynSchName1 option:selected').text();
            $.get("/getTabName/" + selOpt).done(function(response){
                console.log(response);
                $('#SynTabName1').empty();
                $('#SynTabName1').append("<option value='' selected>--Select--</option>");
                $.each(response,function(index, value){
                    console.log(value);
                    $('#SynTabName1').append("<option value='" + value + "'>"+value+"</option>");
                });

            })
            .fail( function(xhr, textStatus, errorThrown) {
                console.log("List retrieve Failed! "+xhr.responseText);
            });


        });

        $('#SynTabName1').change(function(){
            var selOpt = $('#SynSchName1 option:selected').text();
            var selOpt2 = $('#SynTabName1 option:selected').text();
            $.get("/getColumnName/" + selOpt + "/" + selOpt2).done(function(response){
                console.log(response);
                $('#SynColName1').empty();
                $('#SynColName1').append("<option value='' selected>--Select--</option>");
                $.each(response,function(index, value){
                    console.log(value);
                    $('#SynColName1').append("<option value='" + value + "'>"+value+"</option>");
                });

            })
            .fail( function(xhr, textStatus, errorThrown) {
                console.log("List retrieve Failed! "+xhr.responseText);
            });

        });

//Related Join Table
        $('#SynSchName2').change(function(){
            var selOpt = $('#SynSchName2 option:selected').text();
            $.get("/getTabName/" + selOpt).done(function(response){
                console.log(response);
                $('#SynTabName2').empty();
                $('#SynTabName2').append("<option value='' selected>--Select--</option>");
                $.each(response,function(index, value){
                    console.log(value);
                    $('#SynTabName2').append("<option value='" + value + "'>"+value+"</option>");
                });

            })
            .fail( function(xhr, textStatus, errorThrown) {
                console.log("List retrieve Failed! "+xhr.responseText);
            });


        });

        $('#SynTabName2').change(function(){
            var selOpt = $('#SynSchName2 option:selected').text();
            var selOpt2 = $('#SynTabName2 option:selected').text();
            $.get("/getColumnName/" + selOpt + "/" + selOpt2).done(function(response){
                console.log(response);
                $('#SynColName2').empty();
                $('#SynColName2').append("<option value='' selected>--Select--</option>");
                $.each(response,function(index, value){
                    console.log(value);
                    $('#SynColName2').append("<option value='" + value + "'>"+value+"</option>");
                });

            })
            .fail( function(xhr, textStatus, errorThrown) {
                console.log("List retrieve Failed! "+xhr.responseText);
            });

        });


        $('#SynJoinSubmit').click(function(){
            var k;
            //var table = document.getElementById("SynJoinTab-body");

            if( $('#SynSchName1 option:selected').text() == "--Select--"){
                alert("Please choose a Schema option! ");
                return false;
            } 
            else if($('#SynTabName1 option:selected').text() == "--Select--"){
                alert("Please choose a Table option! ");
                return false;
            }
            else if($('#SynColName1 option:selected').text() == "--Select--"){
                alert("Please choose a Column option! ");
                return false;
            }
            else if( $('#SynSchName2 option:selected').text() == "--Select--"){
                alert("Please choose a Schema option! ");
                return false;
            } 
            else if($('#SynTabName2 option:selected').text() == "--Select--"){
                alert("Please choose a Table option! ");
                return false;
            }
            else if($('#SynColName2 option:selected').text() == "--Select--"){
                alert("Please choose a Column option! ");
                return false;
            }
            else {
                console.log("Good to proceed!");
            }
            if(!validateJoins()){
                return false;
            }

            if(!gOpenJoin){
                console.log("Entered gOpenJoin");
                for(k=8;k<=10;k++){
                    $('#SynRow' + k).show();
                }
    
                for(k=1;k<=3;k++){
                    $('#SynRow' + k).hide();
                }
                
            }            

            if(!gOpenJoin ){
                gOpenJoin = true;
            }
           
            var vBtId = tableJoinTabOps();
            vBtId = "\'#" + vBtId + "\'";
            console.log("Checking : " + vBtId);
            $(document).ready(function(){
                console.log("Checking : " + vBtId);
                $('.btn-remove').click(function(){
                    console.log("Checking : " + vBtId);
                    if(!gJoinFreezed){
                        $(this).closest('tr').remove();
                        checkTableRows();
                    }
                    
                });

            });

        });
        
    

    $('#SynFreezJSubmit').click(function(){
        var l;
        if(!confirm("This will freeze the joins and it cannot be modified any further. Are you sure?")){
            return false;
        }
        for (l=4;l<=7;l++){
            $('#SynRow'+l).hide();
        }
        for (l=11;l<=15;l++){
            $('#SynRow'+l).show();
        }
           
        var valT = [];

        $('#SynSchFltName').empty();
        $('#SynSchFltName').append("<option value='' selected>--Select--</option>");        
        $('#SynJoinTab-body tr').each(function(index, value){
            console.log(index + '-> ' + value.cells[1].innerHTML );            
            console.log(index + '-> ' + value.cells[6].innerHTML );
            valT.push(value.cells[1].innerText);
            valT.push(value.cells[6].innerText);
        });

        var valTab = valT.filter(function(elem, index, self) {

            return index === self.indexOf(elem);
      
            });

        console.log("valTab: " + valTab.length);

        $.each(valTab, function(index, value1){
            $('#SynSchFltName').append("<option value='" + index + "'>"+ value1 +"</option>");
            console.log(value1 + " " + value1.length );
        });
        gJoinFreezed = true;

        $('#SynFreezJSubmit').hide();
    });

    $('#SynSchFltName').change(function(){
        var valT = [];
        var SynScNm = $('#SynSchFltName option:selected').text();
        $('#SynTabFltName').empty();
        $('#SynTabFltName').append("<option value='' selected>--Select--</option>");       
        
        $('#SynJoinTab-body tr').each(function(index, value){
            if (value.cells[1].innerText == SynScNm ){
                valT.push(value.cells[2].innerText);

            }
            if (value.cells[6].innerText == SynScNm ){
                valT.push(value.cells[7].innerText);                
            }

        });
        
        var valTab = valT.filter(function(elem, index, self) {
            return index === self.indexOf(elem);      
        });

        console.log("valTab: " + valTab.length);

        $.each(valTab, function(index, value1){
            $('#SynTabFltName').append("<option value='" + index + "'>"+ value1 +"</option>");
            console.log(value1 + " " + value1.length );
        });
        
    });

    $('#SynTabFltName').change(function(){
        var SynSchNm = $('#SynSchFltName option:selected').text();
        var SynTbNm = $('#SynTabFltName option:selected').text();

        $.get("/getColumnName/" + SynSchNm + "/" + SynTbNm ).done(function(response){
            console.log(response);
            
            $('#SynColFltName').empty();
            $('#SynColFltName').append("<option value='' selected>--Select--</option>");
            $.each(response,function(index, value){
                console.log(value);
                $('#SynColFltName').append("<option value='" + value + "'>"+value+"</option>");               
            });

        })
        .fail( function(xhr, textStatus, errorThrown) {
            console.log("List retrieve Failed! "+xhr.responseText);
        });

    });

    $('#SynSaveFCSubmit').click(function(){
        var k;
        //var table = document.getElementById("SynJoinTab-body");
        if( $('#SynSchFltName option:selected').text() == "--Select--"){
            alert("Please choose a Schema option! ");
            return false;
        } 
        else if($('#SynTabFltName option:selected').text() == "--Select--"){
            alert("Please choose a Table option! ");
            return false;
        }
        else if($('#SynColFltName option:selected').text() == "--Select--"){
            alert("Please choose a Column option! ");
            return false;
        }
        else {
            console.log("Good to go!");
        }
        

        if(!gOpenFilter){
            console.log("Entered gOpenFilter");
            for(k=16;k<=18;k++){
                $('#SynRow' + k).show();
            }           
            
        }            

        if(!gOpenFilter ){
            gOpenFilter = true;
        }

        
        console.log("Entered SynSaveFCSubmit action");
        tableFilterTabOps();
        $(document).ready(function(){
            console.log("Checking : " );
            $('.btn-remove').click(function(){
                console.log("Checking : " );
                if(!gSCFreezed){
                    $(this).closest('tr').remove();
                    checkTableRows();
                }                
            });
        });


    });

    
    $('#SynFreezeFCSubmit').click(function(){
        var l;
        if(!confirm("This will freeze the Filters and it cannot be modified any further. Are you sure?")){
            return false;
        }
        

        for (l=11;l<=15;l++){
            $('#SynRow'+l).hide();
        }
        for (l=19;l<=20;l++){
            $('#SynRow'+l).show();
        }
        gSCFreezed = true;
        $('#SynFreezeFCSubmit').hide();


    });

    $('#SynFinalSubmit').click(function(){
        if(!confirm("This will finally send the request for synthetic data generation. Are you sure?")){
            return false;            
        }
        var finalJoinsArr = [];
        
        var finalSynArr = [];
        var finalObj ;
        //load the table details of joins and synthetic here into finalJoin and finalSynthetic
        $('#SynJoinTab-body tr').each(function(index, value){
            console.log(index + '-> ' + value.cells[1].innerHTML + " " + value.cells[2].innerHTML + " " + value.cells[3].innerHTML + " " + value.cells[5].innerHTML  );            
            console.log(index + '-> ' + value.cells[7].innerHTML + " " + value.cells[8].innerHTML  + " " + value.cells[10].innerHTML  );            

            finalJoins = {
                'schema1':value.cells[1].innerText,
                'table1':value.cells[2].innerText,
                'column1':value.cells[3].innerText,
                'static1':value.cells[4].innerText,
                'maxCount1':value.cells[5].innerText,
                'schema2':value.cells[6].innerText,
                'table2':value.cells[7].innerText,
                'column2':value.cells[8].innerText,
                'static2':value.cells[9].innerText,
                'maxCount2':value.cells[10].innerText,    

            }; 
            finalJoinsArr.push(finalJoins);
            console.log(finalJoins);
            
        });
        //finalJoinsArr += ']}';
        
        console.log(finalJoinsArr);
        var syntheticJoins = JSON.stringify(finalJoinsArr);
        console.log(syntheticJoins);

        $('#SynFilterTab-body tr').each(function(index, value){
          
            console.log(index + '-> ' + value.cells[1].innerHTML + " " + value.cells[2].innerHTML + " " + value.cells[3].innerHTML + " " + value.cells[5].innerHTML );            
            finalSynthetic = {
                'schema':value.cells[1].innerText,
                'table':value.cells[2].innerText,
                'column':value.cells[3].innerText,
                'condition':value.cells[4].innerText,
                'value':value.cells[5].innerHTML
            };
            finalSynArr.push(finalSynthetic);
        });
        console.log(finalSynArr);
        var syntheticCriteria = JSON.stringify(finalSynArr);
        console.log(syntheticCriteria);
        var finalData = '{"SyntheticDataWrapper":{"SyntheticJoins":' + syntheticJoins + ',"SyntheticCriteria": ' + syntheticCriteria + '}}';
        console.log(finalData);
        $.ajax({
            type: 'POST',
            url: '/createSyntheticData',
            contentType: 'application/json',            
            data:finalData,
        });
      
        alert("Request sent for processing.");
        
        location.reload();  
        console.log("Reached");
            
    });

    $('#SynFV').focus(function(){
        $(this).val = "";
        $(this).value = "";
    });

    /*$('#SynFC').change(function(){
        console.log($('#SynFC option:selected').value + ' : ' + $('#SynFC option:selected').text());
        if ($('#SynFC option:selected').text() == 'random'){
           console.log("Inside #SynFC option:selected");   
           $('#SynFV').focus();         
           $('#SynFV').text = "";
           $('#SynFV').value = "";
           
            
        } else{
            console.log("Inside #SynFV show");
            $('#SynFV').text = '';
            $('#SynFV').value = '';
            $('#SynFV').show();
            $('#SynFV').focus();
        }

    });*/
    
    $('#SynFinalReset').click(function(){
        if(!confirm("This activity will cllear the whole form data. Are you sure to reset the form?")){
            return false;            
        }
        
        location.reload();  
        console.log("Reached");
             
        alert("Form reset done!");
    });

    $('#SynFreezJReset').click(function(){
        if(!confirm("This activity will cllear the whole form data. Are you sure to reset the form?")){
            return false;            
        }
        
        location.reload();  
        console.log("Reached");
             
    })

    $('#SynJoinReset').click(function(){
        if(!confirm("This activity will cllear the whole form data. Are you sure to reset the form?")){
            return false;            
        }
        
        location.reload();            
    });

    $('#SynSaveFCReset').click(function(){
        if(!confirm("This activity will cllear the whole form data. Are you sure to reset the form?")){
            return false;            
        }
        
        location.reload();              
    });

    $('#SynFreezeFCReset').click(function(){
        if(!confirm("This activity will cllear the whole form data. Are you sure to reset the form?")){
            return false;            
        }
        
        location.reload();  
        console.log("Reached");
             

    });   

});


function validateF(fDBName,fSName,pwd){

    if(fDBName=='' ){
        alert('DB Name cannot be blank!');
        return false;
    }
    if(fSName==''){
        alert('Schema Name cannot be blank!');
        return false;
    }
    if(pwd==''){
        alert('Password cannot be blank!');
        return false;
    }
    return true;

}

function loadOptions(){
        console.log('fsname drop down');
        $('#collapseTwo').hide();
        $('#fSName').empty();
        $.ajax({
         type: 'GET',
         url: '/getSchName',
         //contentType: 'application/json',
         success : function(data){
             console.log(data);
            
            $('#fSName').append("<option value='' selected>--Select--</option>");
             $.each(data, function(index, value){
                 console.log(value);
                 $('#fSName').append("<option value='" + value + "'>"+value+"</option>");
             });
         },
         error: function(){alert("fSName: Option details not avaialble!");}
        }) ;

        console.log('tSName drop down');
        $('#tSName').empty();
        $.ajax({
         type: 'GET',
         url: '/getSchName',
         //contentType: 'application/json',
         success : function(data){
             console.log(data);
            
            $('#tSName').append("<option value='' selected>--Select--</option>");
             $.each(data, function(index, value){
                 console.log(value);
                 $('#tSName').append("<option value='" + value + "'>"+value+"</option>");
             });
         },
         error: function(){alert("tSName: Option details not avaialble!");}
        }) ;

        console.log('fDBName drop down');
        $('#fDBName').empty();
        $.ajax({
         type: 'GET',
         url: '/getSrcDBName',
         //contentType: 'application/json',
         success : function(data){
             console.log(data);
            
            $('#fDBName').append("<option value='' selected>--Select--</option>");
             $.each(data, function(index, value){
                 console.log(value);
                 $('#fDBName').append("<option value='" + value + "'>"+value+"</option>");
             });
         },
         error: function(){alert("fDBName: Option details not avaialble!");}
        }) ;

        console.log('tDBName drop down');
        $('#tDBName').empty();
        $.ajax({
         type: 'GET',
         url: '/getSrcDBName',
         //contentType: 'application/json',
         success : function(data){
             console.log(data);
            
            $('#tDBName').append("<option value='' selected>--Select--</option>");
             $.each(data, function(index, value){
                 console.log(value);
                 $('#tDBName').append("<option value='" + value + "'>"+value+"</option>");
             });
         },
         error: function(){alert("tDBName: Option details not avaialble!");}
        }) ;
return true;
}

function loadPartition(){
    if ($('#copyType').val() == 'PC'){
        console.log('Partition drop down');
        $('#Partition').empty();
        l_url = "/getPartName/" + $('#tableName').val();
        console.log("The partion for url : " + l_url);

        $.ajax({
        type: 'GET',
        url: l_url,
        //contentType: 'application/json',
        success : function(data){
            console.log(data);
            
            $('#Partition').append("<option value='' selected>--Select--</option>");
            $.each(data, function(index, value){
                console.log(value);
                $('#Partition').append("<option value='" + value + "'>"+value+"</option>");
            });
        },
        error: function(){alert("Partition: Option details not avaialble!");}
        }) ;
    
    }
    return true;
}

function loadTableList(){
        console.log('tableName drop down');
        $('#tableName').empty();
        if (gfSName != '' && gfSName != undefined){
            console.log('tableName inside if block');
                $.ajax({
                type: 'GET',
                url: '/getTabName',
                success : function(data){
                    console.log(data);

                    $('#tableName').append("<option value='' selected>--Select--</option>");
                    $.each(data, function(index, value){
                        console.log(value);
                        $('#tableName').append("<option value='" + value + "'>"+value+"</option>");
                    });
                },
                error: function(){alert("tableName: Option details not avaialble!");}
                }) ;
            }
            return true;
    }

//Synthetic Data Creation Load    
function loadSyntheticDataPage(){
    console.log('Entered loadSyntheticDataPage!');
    
    var i;
    for(i=4;i<21;i++){
        $('#SynRow' + i).hide();
    }

    $.get("/getSrcDBName").done(function(response){
        console.log(response);
        $('#SynDBNameCon').empty();
        $('#SynDBNameCon').append("<option value='' selected>--Select--</option>");
        
        $.each(response,function(index, value){
            console.log(value);
            $('#SynDBNameCon').append("<option value='" + value + "'>"+value+"</option>");            
        });

    })
    .fail( function(xhr, textStatus, errorThrown) {
        console.log("List retrieve Failed! "+xhr.responseText);
    });

    $('#SynAuthSubCon').prop('disabled', true);
    return true;
}

function tableJoinTabOps(){
    var table = document.getElementById("SynJoinTab-body");
    var rowCnt = table.rows.length; //Get Number of Existing Rows
    var BtId;
    console.log(rowCnt + " Row Count");
    row = table.insertRow(rowCnt);
    rremove = row.insertCell(0);
    BtId = "SynRemoveRel"+ rowCnt;
    rremove.innerHTML = "<button type=\"button\" id=\" "+ BtId + "\"  class=\"btn btn-primary btn-sm btn-remove\">Remove</button>";


    var rschema = row.insertCell(1);
    rschema.innerHTML = $('#SynSchName1 option:selected').text();
    var rtable = row.insertCell(2);
    rtable.innerHTML = $('#SynTabName1 option:selected').text();
    var rcolumn = row.insertCell(3);
    rcolumn.innerHTML = $('#SynColName1 option:selected').text();
    var rfStatic = row.insertCell(4);
    if($('#SynStaticf').is(':checked')){
        rfStatic.innerHTML = "true";
    } else {
        rfStatic.innerHTML = "false";
    }
    var rfMCount = row.insertCell(5);
    rfMCount.innerHTML = $('#SynMRf').val();

    var rJschema = row.insertCell(6);
    rJschema.innerHTML = $('#SynSchName2 option:selected').text();
    var rJtable = row.insertCell(7);
    rJtable.innerHTML = $('#SynTabName2 option:selected').text();
    var rJcolumn = row.insertCell(8);
    rJcolumn.innerHTML = $('#SynColName2 option:selected').text();
    var rStatic = row.insertCell(9);
    if($('#SynStatic').is(':checked')){
        rStatic.innerHTML = "true";
    } else {
        rStatic.innerHTML = "false";
    }

    var rMCount = row.insertCell(10);
    rMCount.innerHTML = $('#SynMR').val();

    return BtId;

}



function tableFilterTabOps(){
    if (!validateDuplicateSynCriteria()) {
        console.log("Duplicate Synthetic Criteria found.");
        return false;
    }
    var table = document.getElementById("SynFilterTab-body");
    var rowCnt = table.rows.length; //Get Number of Existing Rows
    console.log(rowCnt + " Row Count");
   

    row = table.insertRow(rowCnt);
    rremove = row.insertCell(0);
    rremove.innerHTML = "<button type=\"button\" id=\"SynRemoveFilter"+ rowCnt +"\"  class=\"btn btn-primary btn-sm btn-remove\">Remove</button>";
    var rschema = row.insertCell(1);
    rschema.innerHTML = $('#SynSchFltName option:selected').text();
    var rtable = row.insertCell(2);
    rtable.innerHTML = $('#SynTabFltName option:selected').text();
    var rcolumn = row.insertCell(3);
    rcolumn.innerHTML = $('#SynColFltName option:selected').text();
    var rJschema = row.insertCell(4);
    rJschema.innerHTML = $('#SynFC option:selected').text();
    var rJtable = row.insertCell(5);
    if ($('#SynFC option:selected').text() != 'random'){        
        rJtable.innerHTML = $('#SynFV').val();
    }
    else {
        rJtable.innerHTML = '';
        $('#SynFV').text = "";
    }
    return true;
}
    
function validateDuplicateSynCriteria(){
    var lopt = true;
    $('#SynFilterTab-body tr').each(function(index, value){
        if ( $('#SynSchFltName option:selected').text() == value.cells[1].innerText  
        &&   $('#SynTabFltName option:selected').text() == value.cells[2].innerText   
        && $('#SynColFltName option:selected').text() == value.cells[3].innerText) {
            alert("You have already selected criteria for this exact column. You may remove the previous entry and re-enter!");
            lopt = false;
        }               
    });

    return lopt;
}   

function checkTableRows(){
    
    if($('#SynFilterTab >tbody >tr').length <= 0){
        for(k=16;k<=18;k++){
            $('#SynRow' + k).hide();
        }  
        gOpenFilter=false;
    }
    
    if($('#SynJoinTab >tbody >tr').length <= 0){
        for(k=8;k<=10;k++){
            $('#SynRow' + k).hide();
        }
        gOpenJoin = false;
    }
    return true;    
}

function validateJoins(){
    if($('#SynSchName1 option:selected').text() == $('#SynSchName2 option:selected').text()
    && $('#SynTabName1 option:selected').text() == $('#SynTabName2 option:selected').text()
    && $('#SynColName1 option:selected').text() == $('#SynColName2 option:selected').text()){
        alert("Joins with same attributes on both sides not permissible! Please modify join condition.");
        return false;
    }

    return true;
}