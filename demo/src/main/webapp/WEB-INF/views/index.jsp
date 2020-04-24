<!doctype html>
<html lang="en">

<head>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
    integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
  <link rel="stylesheet" href="/resources/css/style.css">
  <link rel="icon" type="image/png" href="/resources/img/favicon-32x32.png">

  <title>Data Copy Tool!</title>

</head>

<body onload="loadOptions()">

  <!--  
              <div class="header">

              </div>


              -->
  <div id="tabdiv">
    <ul class="nav nav-tabs" id="myTab" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
          aria-selected="true">Home</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="dashboard-tab" data-toggle="tab" href="#dashboard" role="tab" aria-controls="profile"
          aria-selected="false">Dashboard</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="manual-tab" data-toggle="tab" href="#manual" role="tab" aria-controls="contact"
          aria-selected="false">User-Manual</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" id="synthetic-tab" data-toggle="tab" href="#synthetic" role="tab" aria-controls="synthetic"
          aria-selected="false">Synthetic Data Creation</a>
      </li>
    </ul>
  </div>



  <div style="margin-top: 5px;"></div>

  <div class="tab-content" id="myTabContent">
    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">

      <form id="mainForm">
        <div id="accordion">
          <div class="card">
            <div class="card-header" id="headingOne">
              <h5 class="mb-0">
                <button class="btn btn-link " data-toggle="collapse" data-target="#collapseOne" aria-expanded="true"
                  aria-controls="collapseOne">
                  <div class="well"><h1><span class="badge badge-info">Login Details</span></h1></div>
                </button>
              </h5>
            </div>

            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#headingOne">
              <div class="card-body ">
                <table id="DBTbl1" class="table table-sm ">
                  <thead>
                    <tr>

                      <th class="text-right" scope="col" ><h2><span class="badge badge-info">Source DB</span></h2></th>
                     
                      <th class="text-right" scope="col" ><h2><span class="badge badge-info">Target DB</span></h2></h2></th>
                     


                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">DB Name</label>
                          </div>
                          <select class="custom-select" id="fDBName">
                            <option selected>Choose...</option>                            
                          </select>
                        </div>
                      </td>
                      <td>
                        <div class="input-group mb-3">
                          <select class="custom-select" id="tDBName">
                            <option selected>Choose...</option>                            
                          </select>
                          <div class="input-group-append">
                            <label class="input-group-text" for="inputGroupSelect02">DB Name</label>
                          </div>
                        </div>
                      </td>
                      <!--
                      <td scope="row">DB Name</td>
                      <td>
                        <select id="fDBName" class="DBdropdown">
                          <option value="">---Select---</option>                          
                        </select>
                      </td>
                      <td></td>
                      <td></td>
                      <td scope="row">DB Name</td>
                      <td>
                        <select id="tDBName" class="DBdropdown">
                          <option value="">---Select---</option>                          
                        </select>
                      </td>
                      -->
                    </tr>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Schema Name</label>
                          </div>
                          <select class="custom-select" id="fSName">
                            <option selected>Choose...</option>                            
                          </select>
                        </div>

                      </td>
                      <td>
                        <div class="input-group mb-3">
                          <select class="custom-select" id="tSName">
                            <option selected>Choose...</option>                            
                          </select>
                          <div class="input-group-append">
                            <label class="input-group-text" for="inputGroupSelect02">Schema Name</label>
                          </div>
                        </div>
                      </td>
                      <!--
                      <td scope="row">Schema Name</td>
                      <td>
                        <select id="fSName" class="DBdropdown1">
                          <option value="">---Select---</option>
                        </select>
                      </td>
                      <td></td>
                      <td></td>
                      <td scope="row">Schema Name</td>
                      <td>
                        <select id="tSName" class="DBdropdown">
                          <option value="">---Select---</option>
                          
                        </select>
                      </td>
                      -->
                    </tr>

                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <span class="input-group-text" id="basic-addon1">Password</span>
                          </div>
                          <input id="fPWD" type="password" class="form-control" placeholder="Source DB Password" aria-label="Username" aria-describedby="basic-addon1">
                        </div>
                      </td>
                      <td>
                        <div class="input-group mb-3">
                          <input id="tPWD" type="password" class="form-control" placeholder="Target DB Password" aria-label="Recipient's username" aria-describedby="basic-addon2">
                          <div class="input-group-append">
                            <span class="input-group-text" id="basic-addon2">Password</span>
                          </div>
                        </div>
                      </td>
                      <!--
                      <td scope="row">Password</td>
                      <td><input type="password" id="fPWD"> </td>

                      <td></td>
                      <td></td>
                      <td scope="row">Password</td>
                      <td><input type="password" id="tPWD"></td>
                      -->
                    </tr>

                    <tr>                      
                      <td><button id="fAuth" type="button" class="btn btn-primary btn-lg">Authenticate Source Connection</button></td>                      
                      <td><button id="tAuth" type="button" class="btn btn-primary btn-lg">Authenticate Target Connection</button> </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="card-header" id="headingTwo">
              <h5 class="mb-0">
                <button class="btn btn-link collapsed" id='headingTwo' data-toggle="collapse" data-target="#collapseTwo"
                  aria-expanded="false" aria-controls="collapseTwo">
                  <div class="well"><h1><span class="badge badge-info">DB Table Details</span></h1></div>
                </button>
              </h5>
            </div>
            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
              <div class="card-body">

                <table class="table" id="DBTb2">
                  <tbody>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Table Name</label>
                          </div>
                          <select class="custom-select" id="tableName">
                            <option selected>Choose...</option>
                          </select>
                        </div>
                      </td>
                      
                    </tr>
                    <tr>
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-append">
                            <label class="input-group-text" for="inputGroupSelect02">Copy Type</label>
                          </div>
                          <select class="custom-select" id="copyType">
                            <option selected>Choose...</option>
                            <option value="TC">Table Copy</option>
                            <option value="PC">Partition Copy</option>
                            <option value="CC">Customized Copy</option>
                          </select>
                        </div>
                      </td>
                      
                    </tr>
                    <tr id="part">
                      <td>
                        <div class="input-group mb-3">
                          <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Partition</label>
                          </div>
                          <select class="custom-select" id="Partition">
                            <option selected>Choose...</option>
                          </select>
                        </div>
                      </td>
                     
                    </tr>
                    <tr id="Qry">                   
                      <td>
                        <div class="input-group">
                          <div class="input-group-prepend">
                            <span class="input-group-text">Filter Criteria</span>
                          </div>
                          <textarea id="Textarea" class="form-control" aria-label="With textarea"></textarea>
                        </div>
                      </td>
                     
                    </tr>
                    <tr>
                      <td><button id="sub" type="button" class="btn btn-primary btn-lg btn-block">Submit for Execution</button></td>
                       
                    </tr>
                  </tbody>
                </table>

              </div>
            </div>
          </div>

        </div>
      </form>
    </div>

    <div class="tab-pane fade" id="dashboard" role="tabpanel" aria-labelledby="dashboard-tab">
      <!--   <div class="table-responsive" > -->
      <table class="table table-sm table-striped" id="dashtable">
        <thead id="dashhead">
          <tr>
            <td scope="col">JOB ID</td>
            <td scope="col">FROM DB</td>
            <td scope="col">FROM SCH</td>
            <td scope="col">TO DB</td>
            <td scope="col">TO SCH</td>
            <td scope="col">TABLE NAME</td>
            <td scope="col">COPY TYPE</td>
            <td scope="col">CREATE TIME</td>
            <td scope="col">UPDATED TIME</td>
            <td scope="col">STATUS</td>

          </tr>
        </thead>
        <tbody id='dashbody'>

        </tbody>

      </table>


      <!-- </div> -->


    </div>
    <!--dashboard  -->
    <div class="tab-pane fade" id="manual" role="tabpanel" aria-labelledby="manual-tab">
      <table class="table" id="manualTable">
        <thead class="thead-light">
          <tr>
            <td scope="col" style="font-size: 15px;">Click on the link to download <a href="download.jsp"
                style="color: rgb(57, 132, 182);">User-Manual</a></td>


          </tr>
        </thead>

      </table>

    </div>
    <!--manual  -->

    <div class="tab-pane fade" id="synthetic" role="tabpanel" aria-labelledby="synthetic-tab">
      <div class="jumbotron jumbotron-fluid">
        <div class="container">
          <h1 class="display-4">Synthetic Data Creation</h1>
          <p class="lead">
            <font color=black size=+2><b>Hello</b></font>,<br>
            Our Engineers are <b>working hard</b> and </b>brainstorming harder</b> to bring up this feature.
            <br>As we all know "<I><U>Rome was not built in a day</U></I>", thus our brilliant team of <font
              color=purple><b>developers and testers</b></font>
            require some time to create the<font color=blue size=+1> <b>Magic Tool</b></font>.
            Till then <strong>keep patience, Stay @Home and cheer the team</strong>.
          </p>
        </div>
      </div>
    </div>
    <!--Synthetic Data Creation  -->



  </div>



  <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <script src="https://code.jquery.com/jquery-3.4.1.min.js"
    integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q"
    crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
    crossorigin="anonymous"></script>
  <script type="text/javascript" src="/resources/js/copyDB.js"></script>

</body>



</html>