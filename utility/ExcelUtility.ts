import XlSX from "xlsx";
import path from "path";
export type ExcelColumnName = {
  TestCaseName: string;
  UserName: string;
  Password: string;
  ExpectedResult: string;
  [key: string]: any;
};
export class ExcelUtils {
  getCellData(
    sheetName: string,
    fileName: string,
    expTestCaseName: string,
  ): ExcelColumnName | undefined {
    let excelPath = path.join(process.cwd(), "testdata", fileName);

    let workbook: XlSX.WorkBook = XlSX.readFile(excelPath);
    let sheet: XlSX.WorkSheet = workbook.Sheets[sheetName];
    let jsonData: ExcelColumnName[] =
      XlSX.utils.sheet_to_json<ExcelColumnName>(sheet);
    let res = jsonData.find((value) => value.TestCaseName === expTestCaseName);
    return res;
  }

  updateCellData(
    sheetName: string,
    fileName: string,
    expTestCaseName: string,
    columnName: string,
    newvalue: string,
  ) {
    let excelPath = path.join(process.cwd(), "testdata", fileName);

    let workbook: XlSX.WorkBook = XlSX.readFile(excelPath);
    let sheet: XlSX.WorkSheet = workbook.Sheets[sheetName];
    let jsonData: ExcelColumnName[] =
      XlSX.utils.sheet_to_json<ExcelColumnName>(sheet);
    let res = jsonData.find((value) => value.TestCaseName === expTestCaseName);
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
