
var fAuthFlag=false;
var tAuthFlag=false;
var gfSName;
var gfPWD;
var gfDB;
var gtSName;
var gtPWD;
var gtDB;

$(document).ready(function(){
    console.log('document is loaded');
    
  /*
     $("#fSName").change(function(){
        var selectedSchema = $(this).children("option:selected").val();
        alert("You Selected: "+ selectedSchema);
     });
     $("#tSName").change(function(){
        var selectedSchema1 = $(this).children("option:selected").val();
        alert("You Selected: "+ selectedSchema1);
     });
*/
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

        if(validateF(fDBName,fSName,pwd)){
            var fromDat ="\"usr=" + fSName + "&pass=" + pwd + "&dbn=" + fDBName + "\"";
            console.log(fromDat);
            $.ajax({
                type: 'POST',
                url: '/authDB',
                data: fromDat,
                dataType : 'text',
                contentType: 'application/json',
                success : function(data, textStatus, jqXHR){
                   console.log(data);

                   fAuthFlag==true;
                   tAuthFlag==true
                },
                error: function(jqXHR, textStatus, errorThrown){
                    alert("DB Authentication Failed!");}    
               }) ;

/*            if(pwd=='abc12345'){

                fAuthFlag=true;
                gfSName=fSName;
                gfPWD=pwd;
                gfDB=fDBName;
                alert('Successfully Validated!');

            } else{
                alert('Please enter correct credentials!!');
            }
*/
            if(fAuthFlag==true && tAuthFlag==true){

                $('#collapseOne').hide();


            }
            if(fAuthFlag==true && tAuthFlag==true){

                $('#part').hide();
                $('#Qry').hide();
                $('#collapseTwo').show();

            }

            document.getElementById("fPWD").value='';
        }

    });

    $('#tAuth').click(function(){

        var tSName= $('#tSName').val();
        var pwd=$('#tPWD').val();
        var tDBName=$('#tDBName').val();

        if(validateF(tDBName,tSName,pwd)){

            if(pwd=='abc12345'){

                tAuthFlag=true;
                gtSName=tSName;
                gtPWD=pwd;
                gtDB=tDBName;
                alert('Successfully Validated!');
            }
            else{
                alert('Please enter correct credentials!!');
            }
            if(fAuthFlag==true && tAuthFlag==true){

                $('#collapseOne').hide();
                $('#part').hide();
                $('#Qry').hide();
                $('#collapseTwo').show();

            }
            document.getElementById("tPWD").value='';

        }

    });


    $('#sub').click(function(){

            var tableName= $('#tableName').val();
            var copyType= $('#copyType').val();
            var Textarea= $('#Textarea').val();
            var Partition= $('#Partition').val();



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
        $('#fSName').empty();
        $.ajax({
         type: 'GET',
         url: '/getSchName',
         //contentType: 'application/json',
         success : function(data){
             console.log(data);
            // var res = $.parseJSON(data);             
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
            // var res = $.parseJSON(data);             
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
            // var res = $.parseJSON(data);             
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
            // var res = $.parseJSON(data);             
            $('#tDBName').append("<option value='' selected>--Select--</option>");
             $.each(data, function(index, value){
                 console.log(value);
                 $('#tDBName').append("<option value='" + value + "'>"+value+"</option>");
             });
         },
         error: function(){alert("tDBName: Option details not avaialble!");}    
        }) ;

}
