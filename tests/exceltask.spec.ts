import  { test, firefox } from "@playwright/test";
import path from "node:path";
import XLSX from "xlsx"


test("helloExcel",async()=>
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

  };

  const sheetname:string = "login";



}
)