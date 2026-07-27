import  { test, firefox } from "@playwright/test";
import path from "node:path";
import XLSX from "xlsx"


test
("helloExcel",async()=>
{

 const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

const excelPath = path.join(process.cwd(),"TestData","loginFlow.xlsx");
console.log("path",excelPath);

type ExcelColumn =
  {
    testScenario : string,
    userName : string,
    passWord : string,
    expectdResult : string,
   [key: string]: any;

  };

   // assigning sheet name
     let sheetname:string = "login";
    //Mention the workbook -> instructing to read excel file
    let workbook: XLSX.WorkBook = XLSX.readFile(excelPath);
    //	- Get the required sheet using the sheet name
    let sheet: XLSX.WorkSheet = workbook.Sheets[sheetname];
    //	- Convert the excel sheet data into JSON
    let jsonData: ExcelColumn[] = XLSX.utils.sheet_to_json<ExcelColumn>(sheet);
    console.log("JSON data ", jsonData);


      let res: ExcelColumn | undefined = jsonData.find(
    (value) =>
      value.testScenario === "Login with Valid Credentails",
  );

     if (res) 
        {
          //create a new column and set value
     res.status = "updated";
      }
    
      let updatedValue = XLSX.utils.json_to_sheet(jsonData);
      workbook.Sheets[sheetname] = updatedValue;
      XLSX.writeFile(workbook,excelPath);
    
      console.log("Done")
    
}
)