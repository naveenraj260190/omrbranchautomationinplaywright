import { test } from "@playwright/test";
import { BaseClass } from "../utility/BaseClass.js";


test("excelIntegration", async ({ page, context, browser }) => {
  test.setTimeout(90000);
  let baseClass = new BaseClass(page);
  await page.setViewportSize({
    width: 1536,
    height: 730,
  });

  baseClass.handleAcceptAlertOn();
  await baseClass.enterApplnUrl("https://www.omrbranch.com/");

  const pageTitle = await page.title();
  console.log("Page Title:", pageTitle);

  //LOCATOR MAINTAINANCE
  // LOCATOR - LOGIN PAGE
  const txtUserName = page.locator("#email");
  const txtPassword = page.locator("#pass");
  const btnLogin = page.locator("//button[text()='Login']");
// LOCATOR - EXPLORE HOTEL PAGE
  let txtWelcomeMsg = page.locator("//a[contains(text(),'Welcome')]");
  const btnHotelBooking = page.getByRole("heading", { name: "Hotel Booking" });
  const state = page.locator("#state");
  const citySelect = page.locator("//span[@title='Select City *']");
  const txtCity = page.locator('input[type="search"]');
  const exploreHotelCheckIn = page.locator("[name='check_in']");
  const checkInDate = page.locator("//a[text()='30']");
  const rooms = page.locator("#no_rooms");
  const Adult = page.locator("#no_adults");
  const btnContinue = page.locator("//a[text()='Continue']");
  const srchframe = page.frameLocator("#hotelsearch_iframe");
  //LOCATOR - Confirm Booking Page
  const self = page.locator("#own");
  const userSalutation = page.locator("#user_title");
  const myFirstName = page.locator("#first_name");
  const myLastName = page.locator("#last_name");
  const checkBoxGST = page.locator("#gst");
  const txtGSTRegistration = page.locator("#gst_registration");
  const txtCompanyName = page.locator("#company_name");
  const txtCompanyAddress = page.locator("#company_address");
  const mobile = page.locator(".form-control.numberInput");
  const myusername = page.locator("#user_email");
  const btnStep1next = page.locator("#step1next");
  //Locator - Special Request Page
  const btnEarlyChkIn = page.locator("#early");
  const txtSpecialrequest = page.locator("#other_request");
  const btnstep2next = page.locator("#step2next");
  //Locator - Payment Details Page 
  const btnCardPayment = page.locator("//h5[text()='Credit/Debit/ATM Card']");
  const cardTypeVisa = page.locator("#card_type");
  const cardNumber = page.locator("#card_no");
  const cardName = page.locator("#card_name");
  const txtCardMonth = page.locator("#card_month");
  const txtCardYear = page.locator("#card_year");
  const txtCvvNumber = page.locator("#cvv");
  const btnFinalSubmit = page.locator("#submitBtn");
  //Locator - My Bookings Page (edit & Cancel)
  const orderID = page.locator("[name='booking-code']");
  const mybooking = page.locator("//button[contains(text(),'My Booking')]");
  const txtbookingsrch = page.locator("//input[@name='search']");
  const btnEdit = page.locator("//button[@class='edit btn filter_btn']");
  const btncheckin = page.locator("[name='check_in']");
  const alertMsg = page.locator("//li[@class='alertMsg']");
  const btnCancel = page.locator("//a[text()='Cancel']");

  //Excel Configuration
  const excelMap = baseClass.getCellData(
    "omrBranchTest",
    "omrBranchLogin.xlsx",
    "VerifySearchHotelsWithAllField",
  );

  //Login Page - execution
  if (excelMap) {
    await baseClass.fillElement(txtUserName, excelMap.loginUserName);
    await baseClass.fillElement(txtPassword, excelMap.loginPwd);
  } else {
    throw new Error("Login Details Missing");
  }

  await baseClass.clickElement(btnLogin);

  //Home Page - Execution
  const txtWelcome = await baseClass.getTextContent(txtWelcomeMsg);

  if (txtWelcome !== null) {
    console.log("Welcome Message:", txtWelcome.trim());
  }

  //Hotel Booking Execution
  await baseClass.clickElement(btnHotelBooking);

  await baseClass.waitForNetworkIdle();
  await baseClass.selectOptionByIndex(state, 5);
  await baseClass.waitForNetworkIdle();
  await citySelect.waitFor();
  await baseClass.clickElement(citySelect);
  await txtCity.waitFor();

  if (excelMap) {
      await baseClass.fillElement(txtCity,excelMap.city)
  } else {
    throw new Error("City not Found");
  }
  await baseClass.keyPress("Enter");

  //Enter Check In Date
  await baseClass.clickElement(exploreHotelCheckIn);
  await exploreHotelCheckIn.waitFor();
  await baseClass.clickElement(checkInDate);

  //Enter Check Out Date
  await baseClass.clickElement(page.locator("[name='check_out']"));
  await page.locator("//a[text()='31']").waitFor();
  await baseClass.clickElement(page.locator("//a[text()='31']"));

  if (excelMap) {
    await baseClass.selectOptionByIndex(rooms, 1);
    await baseClass.selectOptionByIndex(Adult, 1);
  } else {
    throw new Error("Adults an room details Missing");
  }

  await srchframe.locator("#searchBtn").click();

  //selecting the hotel and clicking continue button based on nth index

  const clickcont = btnContinue.nth(1);
  console.log(await clickcont.isVisible());
  await clickcont.click();

  await baseClass.scrollIntoView(self);
  await self.waitFor();
  await baseClass.clickElement(self);

  if (excelMap) {
    await baseClass.selectOptionByValue(userSalutation, excelMap.Salutation);
    await baseClass.fillElement(myFirstName, excelMap.myFirstName);
    await baseClass.fillElement(myLastName, excelMap.myLastName);
  } else {
    throw new Error("Unable to fill Salutation,my FName, My Lname");
  }

  await mobile.waitFor();

  if (excelMap) {
    await baseClass.fillElement(mobile, excelMap.mobileNumber);
    await baseClass.fillElement(myusername, excelMap.loginUserName);
  } else {
    throw new Error("Unable to fetch Mobile and EmailID");
  }


  await baseClass.clickElement(checkBoxGST);

  if (excelMap) {
    await baseClass.fillElement(txtGSTRegistration, excelMap.gstNumber);
    await baseClass.fillElement(txtCompanyName, excelMap.myCompanyName);
    await baseClass.fillElement(txtCompanyAddress, excelMap.companyAddress);
  } else {
    throw new Error("Unable to fetch GST,company Name and Company Address");
  }

  await baseClass.clickElement(btnStep1next);



  await baseClass.clickElement(btnEarlyChkIn);

  if (excelMap) {
    await baseClass.fillElement(txtSpecialrequest, excelMap.specialRequest);
  } else {
    throw new Error("Unable to fetch Special Request");
  }

  await baseClass.clickElement(btnstep2next);

  

  await baseClass.clickElement(btnCardPayment);

  const drpdownDebitCard = page.locator("#payment_type");
  if (excelMap) {
    await baseClass.selectOptionByValue(drpdownDebitCard, excelMap.paymentType);
  } else {
    throw new Error("Debit card value is missing");
  }

  await baseClass.selectOptionByIndex(cardTypeVisa, 1);

  if (excelMap) {
    await baseClass.fillElement(cardNumber, excelMap.cardNumber);
  } else {
    throw new Error("Card No is missing");
  }

  if (excelMap) {
    await baseClass.fillElement(cardName, excelMap.myFirstName + excelMap.myLastName);
  } else {
    throw new Error("Card Name is missing");
  }

  await baseClass.selectOptionByIndex(txtCardMonth, 12);

  await baseClass.selectOptionByIndex(txtCardYear, 10);

  await baseClass.fillElement(txtCvvNumber, excelMap.cvv);

  await baseClass.clickElement(btnFinalSubmit);

  //order success message and order ID verification

  const bookingCode = await baseClass.getTextContent(orderID);
  if (bookingCode !== null) {
    const finalBkngCode = bookingCode
      .replace("#", "")
      .replace("Booking is Confirmed", "")
      .trim();

    console.log("Booking Code:", finalBkngCode);

    //clicking my booking button and searching the order ID and clicking edit button

    await baseClass.clickElement(mybooking);

    await txtbookingsrch.waitFor();
    await baseClass.fillSequentially(txtbookingsrch, finalBkngCode);

    await baseClass.waitForNetworkIdle();

    await baseClass.clickElement(btnEdit);

    await baseClass.clickElement(btncheckin);

    await page.locator("//a[text()='31']").click();
    await page.locator("//button[text()='Confirm']").click();

    await alertMsg.waitFor();

    console.log(
      "Success msg using InnerText :",
      await baseClass.getInnerTextValue(alertMsg),
    );
    console.log(
      "Success msg using TextContent :",
      await baseClass.getTextContent(alertMsg),
    );
    console.log("Success msg using InnerHTML :", await alertMsg.innerHTML());

    //canceling the booking and verifying the cancel message
    await txtbookingsrch.waitFor();
    await baseClass.fillSequentially(txtbookingsrch, finalBkngCode);
    // await txtbookingsrch.pexcelMapsSequentially(finalBkngCode);
    //await txtbookingsrch.fill(finalbkngcode);
    await baseClass.waitForNetworkIdle();
    await baseClass.clickElement(btnCancel);

    await alertMsg.waitFor();
    console.log(
      "Cancel msg using InnerText :",
      await baseClass.getInnerTextValue(alertMsg),
    );
    console.log(
      "Cancel msg using TextContent :",
      await baseClass.getTextContent(alertMsg),
    );
    // console.log("Cancel msg using InnerHTML :", await alertMsg.innerHTML());

    await page.waitForTimeout(8000);
  }
});
