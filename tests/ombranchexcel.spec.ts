import { test } from "@playwright/test";
import path from "path";
import XLSX from "xlsx";

test("dataread", async ({ page }) => {
  //defining excel path
  let pathforexcel = path.join(
    process.cwd(),
    "TestData",
    "omrBranchLogin.xlsx",
  );
  console.log("path : ", pathforexcel);

  //Assigning excel keys and datatype
  type ExcelColumn = {
    testScenario: String;
    loginUserName: String;
    loginPwd: String;
    state: String;
    city: String;
    roomType: String;
    checkInDate: String;
    checkOutDate: String;
    noOfRooms: String;
    noOfAdults: String;
    noOfChild: number;
  };
  // assigning sheet name
  let sheetname = "omrBranchTest";
  //Mention the workbook -> instructing to read excel file
  let workbook: XLSX.WorkBook = XLSX.readFile(pathforexcel);
  //	- Get the required sheet using the sheet name
  let sheet: XLSX.WorkSheet = workbook.Sheets[sheetname];
  //	- Convert the excel sheet data into JSON
  let jsonData: ExcelColumn[] = XLSX.utils.sheet_to_json<ExcelColumn>(sheet);
  console.log("JSON data ", jsonData);

  // To print all data using for of
  for (let i of jsonData) {
    if (i.testScenario === "Verify search hotels with all field") {
      console.log("Username :", i.loginUserName);
      console.log("Pwd:", i.loginPwd);
      console.log("State :", i.state);
      console.log("City", i.city);
      console.log("Check In Date", i.checkInDate);
      console.log("Check out Date", i.checkOutDate);
      console.log("No Of Rooms :", i.noOfRooms);
      console.log("Room Type :", i.roomType);
      console.log("No Of Adults :", i.noOfAdults);
      console.log("No Of Child", i.noOfChild);
    } else if (
      i.testScenario === "Verify search hotels with mandatory fields"
    ) {
      console.log("Username :", i.loginUserName);
      console.log("Pwd:", i.loginPwd);
      console.log("State :", i.state);
      console.log("City", i.city);
      console.log("Check In Date", i.checkInDate);
      console.log("Check out Date", i.checkOutDate);
      console.log("No Of Rooms :", i.noOfRooms);
      console.log("Room Type :", i.roomType);
      console.log("No Of Adults :", i.noOfAdults);
      console.log("No Of Child", i.noOfChild);
    }
  }

  let testScenario1: ExcelColumn | undefined = jsonData.find(
    (value) =>
      value.testScenario === "Verify search hotels with mandatory fields",
  );
  let testScenario2: ExcelColumn | undefined = jsonData.find(
    (value) =>
      value.testScenario === "Verify search hotels with mandatory fields",
  );
  if (testScenario1) {
    console.log("testScenario1 using find");
    console.log("Username :", testScenario1.loginUserName);
    console.log("Pwd:", testScenario1.loginPwd);
    console.log("State :", testScenario1.state);
    console.log("City", testScenario1.city);
    console.log("Check In Date", testScenario1.checkInDate);
    console.log("Check out Date", testScenario1.checkOutDate);
    console.log("No Of Rooms :", testScenario1.noOfRooms);
    console.log("Room Type :", testScenario1.roomType);
    console.log("No Of Adults :", testScenario1.noOfAdults);
    console.log("No Of Child", testScenario1.noOfChild);
  } else if (testScenario2) {
    console.log("testScenario2 using find");
    console.log("Username :", testScenario2.loginUserName);
    console.log("Pwd:", testScenario2.loginPwd);
    console.log("State :", testScenario2.state);
    console.log("City", testScenario2.city);
    console.log("Check In Date", testScenario2.checkInDate);
    console.log("Check out Date", testScenario2.checkOutDate);
    console.log("No Of Rooms :", testScenario2.noOfRooms);
    console.log("Room Type :", testScenario2.roomType);
    console.log("No Of Adults :", testScenario2.noOfAdults);
    console.log("No Of Child", testScenario2.noOfChild);
  }

 if (testScenario2) 
    {
 testScenario2.noOfChild = 4;
  }

  let updatedValue = XLSX.utils.json_to_sheet(jsonData);
  workbook.Sheets[sheetname] = updatedValue;
  XLSX.writeFile(workbook,pathforexcel);

  console.log("Done")


});


/// Update Value



