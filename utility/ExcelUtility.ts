import XlSX from "xlsx";
import path from "path";
export type ExcelColumnName = {
  testScenario: string;
  loginUserName: string;
  loginPwd: string;
  state: string;
  city: string;
  roomType: string;
  noOfRooms: string;
  noOfAdults: string;
  noOfChild: string;
  Salutation: string;
  myFirstName: string;
  myLastName: string;
  mobileNumber: string;
  gstNumber: string;
  myCompanyName: string;
  companyAddress: string;
  specialRequest: string;
  paymentType: string;
  cardNumber: string;
  cvv: string;
  [key: string]: any;
};
export class ExcelUtils {
  getCellData(
    sheetName: string,
    fileName: string,
    expTestCaseName: string,
  ): ExcelColumnName | undefined {
    let excelPath = path.join(process.cwd(), "TestData", fileName);

    let workbook: XlSX.WorkBook = XlSX.readFile(excelPath);
    let sheet: XlSX.WorkSheet = workbook.Sheets[sheetName];
    let jsonData: ExcelColumnName[] =
      XlSX.utils.sheet_to_json<ExcelColumnName>(sheet);
    let res = jsonData.find((value) => value.testScenario === expTestCaseName);
    return res;
  }

  updateAndWriteCellData(
    sheetName: string,
    fileName: string,
    expTestCaseName: string,
    columnName: string,
    newvalue: string,
  ) {
    let excelPath = path.join(process.cwd(), "TestData", fileName);

    let workbook: XlSX.WorkBook = XlSX.readFile(excelPath);
    let sheet: XlSX.WorkSheet = workbook.Sheets[sheetName];
    let jsonData: ExcelColumnName[] =
      XlSX.utils.sheet_to_json<ExcelColumnName>(sheet);
    let res = jsonData.find((value) => value.testScenario === expTestCaseName);
    if (res) {
      res.columnName = newvalue;
    }
    let newSheet: XlSX.WorkSheet = XlSX.utils.json_to_sheet(jsonData);
    workbook.Sheets[sheetName] = newSheet;
    XlSX.writeFile(workbook, excelPath);
  }

  createCellAndSetCellData(
    sheetName: string,
    fileName: string,
    expTestCaseName: string,
    newColumnName: string,
    newvalue: string,
  ) {
    let excelPath = path.join(process.cwd(), "testdata", fileName);

    let workbook: XlSX.WorkBook = XlSX.readFile(excelPath);
    let sheet: XlSX.WorkSheet = workbook.Sheets[sheetName];
    let jsonData: ExcelColumnName[] =
      XlSX.utils.sheet_to_json<ExcelColumnName>(sheet);
    let res = jsonData.find((value) => value.TestCaseName === expTestCaseName);
    if (res) {
      res.newColumnName = newvalue;
    }
    let newSheet: XlSX.WorkSheet = XlSX.utils.json_to_sheet(jsonData);
    workbook.Sheets[sheetName] = newSheet;
    XlSX.writeFile(workbook, excelPath);
  }
}
