

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
        __EMPTY_6: bakeryV.toFixed(2),
        __EMPTY_7: beerV.toFixed(2),
        __EMPTY_8: deliV.toFixed(2),
        __EMPTY_9: floralV.toFixed(2),
        __EMPTY_10: meatV.toFixed(2),
        __EMPTY_11: produceV.toFixed(2),
        __EMPTY_12: seafoodV.toFixed(2),
    }

    ];
    // console.log(arr);
    runner(arr[0]);
    listOfName(topTen);
}

function addEasyScanNumbers(cashierArr) {
    allV += parseFloat(cashierArr.__EMPTY);
    groceryV += parseFloat(cashierArr.__EMPTY_3);
    gmV += parseFloat(cashierArr.__EMPTY_4);
    hbcV += parseFloat(cashierArr.__EMPTY_5)
    bakeryV += parseFloat(cashierArr.__EMPTY_6);
    deliV += parseFloat(cashierArr.__EMPTY_7);
    floralV += parseFloat(cashierArr.__EMPTY_8);
    meatV += parseFloat(cashierArr.__EMPTY_9);
    produceV += parseFloat(cashierArr.__EMPTY_10);
    seafoodV += parseFloat(cashierArr.__EMPTY_11);
    beerV += parseFloat(cashierArr.__EMPTY_12);
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
        if (a.__EMPTY_1 == "Sum") {
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
            addSquaresForDepartments("All", a.__EMPTY)

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

            var hh = document.createElement("h1");
            hh.classList.add("headerinfo");
            hh.textContent = "Useful Information"
            add.appendChild(hh);




            // store total and top ten based on count

            if (a.__EMPTY_1 == "Sum") {
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
                for (var j = 1; j <= 10; j++) {
                    oo = document.createElement("li");
                    oo.setAttribute("id", "iList");
                    oo.classList.add("lItem");
                    yy.appendChild(oo);

                    var jj = document.getElementById("iList");
                    oo = document.createElement("div");
                    oo.classList.add("tenDivLeft");

                    oo.innerHTML = j + ": " + topTen[j].name + " " + topTen[j].lname;
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
                var kk = document.createElement("ul");
                kk.setAttribute("id", "oList");
                kk.classList.add("ol");
                kk.classList.add("text-left");
                add.appendChild(kk);
                var yy = document.getElementById("oList");

                var oo = document.createElement("li");
                oo.classList.add("text-left");
                oo.textContent = "Never void a product and key enter it into a department to change the price. Please call a supervisor.";
                yy.appendChild(oo);

                oo = document.createElement("li");
                oo.classList.add("text-left");
                oo.textContent = "Typically, when entering a CLU, you type the ten digits in the center of the label; if you get an error, try including the first digit on the tag (7-41735-01528)";
                yy.appendChild(oo);

                oo = document.createElement("li");
                oo.classList.add("text-left");
                oo.textContent = "When entering a label from the Meat, Seafood, Deli, or Food Service department, you must drop the last digit. (741735-204999) <-- Will give an error. The last digit '9' in this example is removed. (741735-20499) <-- Correct.";
                yy.appendChild(oo);

                oo = document.createElement("li");
                oo.classList.add("text-left");
                oo.textContent = "Meat, Seafood, Deli, and Food Service items over $100 will not print a barcode. If it is a Meat department product, it will have a 3-digit PLU at the end of the description. 'CAB roast (684)'. Enter in the PLU and then the price on the label. Please call a supervisor for help entering a Seafood, Deli, or Food Service product over $100.";
                yy.appendChild(oo);

                oo = document.createElement("li");
                oo.classList.add("text-left");
                oo.textContent = "If your item scans and a not on file error is displayed, press the Department key on the right, choose the department it belongs to, and enter the item's price.";
                yy.appendChild(oo);
            }

            yy.setAttribute("id", "nothing");
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
    document.getElementById('fileUploadDiv1').style.backgroundColor = "lightgreen";
    var tt = document.getElementById('dvExcel');

    if (fileUpload.files.length == 0) {
        tt.innerText = "Please upload Cashier Keyed Entry Excel file.";
    } else {


        tt.innerText = "Press Start.";
    }


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

