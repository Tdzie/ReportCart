

var _arrForCashiers;


// variables fpr the array to count ez scan

var allV = 0;
var groceryV = 0;
var gmV = 0;
var hbcV = 0;
var bakeryV = 0;
var beerV = 0;
var deliV = 0;
var floralV = 0;
var meatV = 0;
var produceV = 0;
var seafoodV = 0;
var kosherV = 0;

//make a array for top 10
var topTen = [];

// ------------------------------ Start the upload to convert the excel file to a JSON--------------------------
function Upload() {


    //Reference the FileUpload element.
    var fileUpload = document.getElementById("fileUpload");


    if (typeof (FileReader) != "undefined") {
        var reader1 = new FileReader();

        //For Browsers other than IE.
        if (reader1.readAsBinaryString) {
            reader1.onloadend = function (e) {
                ProcessExcel(e.target.result);
            };
            reader1.readAsBinaryString(fileUpload.files[0]);
        } else {
            //For IE Browser.
            reader.onload = function (e) {
                var data1 = "";
                var bytes1 = new Uint8Array(e.target.result);
                for (var i = 0; i < bytes1.byteLength; i++) {
                    data1 += String.fromCharCode(bytes1[i]);
                }
                ProcessExcel(data);
            };
            reader1.readAsArrayBuffer(fileUpload.files[0]);
        }
    } else {
        alert("This browser does not support HTML5.");
    }
};

function ProcessExcel(data) {
    //Read the Excel File data.
    var workbook = XLSX.read(data, {
        type: 'binary'
    });

    //Fetch the name of First Sheet.
    var firstSheet = workbook.SheetNames[0];

    //Read all rows from First Sheet into an JSON array.
    var excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
    _arrForCashiers = excelRows;

    //Print the cashers to the console
    console.log(_arrForCashiers);


    // wait till all ezscans are counted and add then to the 2nd from last page
    for (var i = 8; i < excelRows.length; i++) {
        if (i == excelRows.length - 1) {
            ezScanAdd();
        }


        // --------------------start the main function----------------------------------------

        runner(excelRows[i]);
    }
}




// function to add combined numbers and create page for EZ scan
function ezScanAdd() {
    arr = [{
        __EMPTY_1: "EZ",
        __EMPTY_2: "SCAN",
        __EMPTY: allV.toFixed(2),
        __EMPTY_3: groceryV.toFixed(2),
        __EMPTY_4: gmV.toFixed(2),
        __EMPTY_5: hbcV.toFixed(2),
        __EMPTY_6: meatV.toFixed(2),
        __EMPTY_7: seafoodV.toFixed(2),
        __EMPTY_8: deliV.toFixed(2),
        __EMPTY_9: produceV.toFixed(2),
        __EMPTY_10: bakeryV.toFixed(2),
        __EMPTY_11: kosherV.toFixed(2),
        __EMPTY_12: floralV.toFixed(2),
        __EMPTY_13: beerV.toFixed(2)
    }

    ];
    console.log(arr);
    runner(arr[0]);
    listOfName(topTen);
}

function addEasyScanNumbers(cashierArr) {
    allV += parseFloat(cashierArr.__EMPTY);
    groceryV += parseFloat(cashierArr.__EMPTY_3);
    gmV += parseFloat(cashierArr.__EMPTY_4);
    hbcV += parseFloat(cashierArr.__EMPTY_5)
    meatV += parseFloat(cashierArr.__EMPTY_6);
    seafoodV += parseFloat(cashierArr.__EMPTY_7);
    deliV += parseFloat(cashierArr.__EMPTY_8);
    produceV += parseFloat(cashierArr.__EMPTY_9);
    bakeryV += parseFloat(cashierArr.__EMPTY_10);
    kosherV += parseFloat(cashierArr.__EMPTY_11);
    floralV += parseFloat(cashierArr.__EMPTY_12);
    beerV += parseFloat(cashierArr.__EMPTY_13);
};

function addCasherToTopTen(cashierArr) {

    let tempTopTen = { "name": cashierArr.__EMPTY_1, "lname": cashierArr.__EMPTY_2, "value": cashierArr.__EMPTY };

    topTen.push(tempTopTen);
};

function addSquaresForDepartments(departmentName, value) {
    // create wrapper
    di = document.createElement("div");
    di.setAttribute("id", "inwrap");
    di.classList.add("inboxdiv");
    di.innerHTML = departmentName;
    add.appendChild(di);
    var nn = document.getElementById("inwrap");

    // Add Value
    di = document.createElement("div");
    di.innerHTML = "Value: $" + value;
    di.classList.add("inbox");
    nn.appendChild(di);

    // reset id
    nn.setAttribute("id", "nothing");
};

// main function to create cards
function runner(a) {
    var testd = document.getElementById("test");

    // check if the current row is a EZ scan by checking __EMPTY_3 and combine the numbers into a single file
    if (a.__EMPTY_1 == "--") {

        addEasyScanNumbers(a);

    } else {
        // adding information to top ten array
        addCasherToTopTen(a);


        var di = document.createElement("div");
        di.classList.add("border");
        di.setAttribute("id", "add");
        testd.appendChild(di);
        var add = document.getElementById("add");
        // create wrapper
        di = document.createElement("div");

        di.setAttribute("id", "inwrap");
        di.classList.add("inboxhead");
        add.appendChild(di);
        var nn = document.getElementById("inwrap");
        // count
        di = document.createElement("div");
        if (a["Report Name:"] == "Sum") {
            di.innerHTML = "STORE TOTAL";
        }
        else {
            di.innerHTML = a.__EMPTY_1 + " " + a.__EMPTY_2;
        }

        nn.appendChild(di);
        // reset id
        nn.setAttribute("id", "nothing");

        if (a.__EMPTY != null) {


            //Add the ALL value
            addSquaresForDepartments("Total", a.__EMPTY)

            //Add the GROCERY value
            if (a.__EMPTY_3 > 0)
                addSquaresForDepartments("Grocery", a.__EMPTY_3)

            //Add the GM value
            if (a.__EMPTY_4 > 0)
                addSquaresForDepartments("GM", a.__EMPTY_4)

            // Add the HBC value
            if (a.__EMPTY_5 > 0)
                addSquaresForDepartments("HBC", a.__EMPTY_5)

            // Add the Meat Value
            if (a.__EMPTY_6 > 0)
                addSquaresForDepartments("Meat", a.__EMPTY_6)

            // Add the Seafood Service Value
            if (a.__EMPTY_7 > 0)
                addSquaresForDepartments("Seafood", a.__EMPTY_7)

            // Add the Deli/Food service Value
            if (a.__EMPTY_8 > 0)
                addSquaresForDepartments("Deli/FS", a.__EMPTY_8)

            // Add the Produce Value
            if (a.__EMPTY_9 > 0)
                addSquaresForDepartments("Produce", a.__EMPTY_9)

            // Add the Bakery Value
            if (a.__EMPTY_10 > 0)
                addSquaresForDepartments("Bakery", a.__EMPTY_10)

            // Add the Kosher Value
            if (a.__EMPTY_11 > 0)
                addSquaresForDepartments("Kosher", a.__EMPTY_11)

            // Add the Floral Value
            if (a.__EMPTY_12 > 0)
                addSquaresForDepartments("Floral", a.__EMPTY_12)

            // Add the Beer/Wine Value
            if (a.__EMPTY_13 > 0)
                addSquaresForDepartments("Beer/Wine", a.__EMPTY_13)

            //create useful information

           // var hh = document.createElement("h1");
           // hh.classList.add("headerinfo");
           // hh.textContent = "Useful Information"
           // add.appendChild(hh);




            // store total and top ten based on count

            if (a["Report Name:"] == "Sum") {

                var hh = document.createElement("h1");
                hh.classList.add("headerinfo");
                hh.textContent = "Top Ten"
                add.appendChild(hh);
    

                topTen.sort((a, b) => parseFloat(b.count) - parseFloat(a.count));
                var kk = document.createElement("ol");
                kk.setAttribute("id", "oList");
                kk.classList.add("ol");
                add.appendChild(kk);
                var yy = document.getElementById("oList");


                var oo = document.createElement("li");
                if (_arrForCashiers == null) {
                    Upload();
                }
                for (var j = 0; j < 10; j++) {
                    oo = document.createElement("li");
                    oo.setAttribute("id", "iList");
                    oo.classList.add("lItem");
                    yy.appendChild(oo);

                    var jj = document.getElementById("iList");
                    oo = document.createElement("div");
                    oo.classList.add("tenDivLeft");

                    oo.innerHTML = j + 1 + ": " + topTen[j].name + " " + topTen[j].lname;
                    jj.appendChild(oo);


                    oo = document.createElement("div");
                    oo.classList.add("tenDivRight");

                    oo.innerHTML = "Value: $" + topTen[j].value;

                    jj.appendChild(oo);

                    oo = document.getElementById("iList");
                    oo.removeAttribute('id');

                }

            } else {

             
    

                // insert useful information
               var kk = document.createElement("div");
               kk.setAttribute("id", "containerDiv");
               kk.innerHTML += 
`<div class="container text-center">
  <div class="row row-cols-3">
    <div class="col">Column 1</div>
    <div class="col">Column 2</div>
    <div class="col">Column 3</div>
    <div class="col">Column 4</div>
    <div class="col">Column 5</div>
    <div class="col">Column 6</div>
  </div>
</div>`;
               // kk.setAttribute("id", "aImage");
                // kk.innerHTML += '<img src="images/KeyInHelper.jpg">';
               add.appendChild(kk);
               
            }

            //yy.setAttribute("id", "nothing");
            add.setAttribute("id", "nothing");

        }

    }
}
function listOfName(a) {
    let topTen = a;
    topTen.sort((a, b) => parseFloat(b.value) - parseFloat(a.value));
    //  console.log(topTen);
    var testd = document.getElementById("test");
    var tt = document.createElement('ol');
    tt.classList.add("listOfNames");
    tt.setAttribute('id', 'list');
    testd.appendChild(tt);
    var list = document.getElementById("list");

    for (var j = 0; j < topTen.length; j++) {
        let a = j + 1;
        oo = document.createElement("li");
        oo.setAttribute("id", "iList");
        oo.classList.add("lItem");
        list.appendChild(oo);

        var jj = document.getElementById("iList");
        oo = document.createElement("div");
        oo.classList.add("tenDivLeft");

        oo.innerHTML = a + ": " + topTen[j].name + " " + topTen[j].lname;
        jj.appendChild(oo);


        oo = document.createElement("div");
        oo.classList.add("tenDivRight");

        oo.innerHTML = "$" + topTen[j].value;

        jj.appendChild(oo);

        oo = document.getElementById("iList");
        oo.removeAttribute('id');
    }

}



// function to run both uploads with a single button

function runAll() {
    // Upload();
    var tt = document.getElementById('dvExcel');
    tt.innerText = "Please wait while your file loads";
    setTimeout(function () {
        Upload();
        tt.innerText = "Complete";
    }, 1000);

}



function kjvkh() {
    document.querySelector("#fileUploadDiv2").style.backgroundColor = "lightgreen";
    var tt = document.getElementById('dvExcel');
    tt.innerText = "Press Start.";

}



// timeout

function timeout() {
    var tt = document.getElementById('dvExcel');
    tt.innerText = "Please wait while your file loads";

    document.getElementById("upload1").disabled = true;
    setTimeout(function () {
        var element = document.getElementById("upload1");
        element.disabled = false;
        tt.innerText = 'Press Start';
    }, 5000);
}

function timeout1() {
    var tt = document.getElementById('div2');
    tt.innerText = "Please wait while your file loads";

    document.getElementById("fileUpload").disabled = true;
    setTimeout(function () {
        var element = document.getElementById("fileUpload");
        element.disabled = false;
        tt.innerText = '';
    }, 5000);
}

