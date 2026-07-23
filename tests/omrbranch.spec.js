import { test } from "@playwright/test";

test("hotelproject", async ({ page }) => {

  const myUsername = "ash.naveen.kv@gmail.com";
  const myPassword = "Naveen90!";
  const myFirstName = "Naveenraj";
  const myLastName = "Rajendran";
  const myMobile = "9952040520";
  const gstNumber = "9043592058";
  const mycompanyName = "Greens Tech OMR Branch";
  const companyAddress = "Thoraipakkam";
  const cardNumber = "5555555555552222";
  const cvvNumber = "123"
  const url = "https://omrbranch.com/";


  // Browseer launch and page setup
  // const browser = await firefox.launch();
  //const context = await browser.newContext();
  //const page = await context.newPage();

  //Set viewport size to 1536x730
  // await page.setViewportSize({ width: 1536, height: 730 });

  // Set timeout for the test
  //test.setTimeout(120000);

  //handle alert popup, handled confirmation popup as no option '
  // to handle in this scenario, so accepting the alert popup
  page.on("dialog", async (dialog) => {

    await dialog.accept();

  });

  //url launch and page title verification
  await page.goto(url);
  const pageTitle = await page.title();
  console.log("Page Title:", pageTitle);

  //login page locators and actions
  const username = page.locator("input#email");
  await username.fill(myUsername);
  const usernameValue = await username.inputValue();
  console.log("Username Value:", usernameValue);

  const password = page.locator('input#pass');
  await password.fill(myPassword);
  const passwordvalue = await password.inputValue();
  console.log("pass Value:", passwordvalue);

  const btnLogin = page.locator("//button[text()='Login']");
  await btnLogin.click();

  //login success message verification
  const welcomeMsg = await page.locator("//a[contains(text(),'Welcome')]").textContent();
  console.log("Welcome Message:", welcomeMsg.trim());

  //hotel booking page locators and actions
  const btnHotelBooking = page.getByRole('heading', { name: "Hotel Booking" });
  await btnHotelBooking.click();

  await page.waitForLoadState("networkidle");

  const state = page.locator("#state");
  await state.waitFor();
  await state.selectOption({ index: 5 });

  await page.waitForLoadState("networkidle");

  //const citySelect = page.getByLabel("Select City *").getByText("Select City *");
  const citySelect = page.locator("//span[@title='Select City *']");
  await citySelect.waitFor();
  await citySelect.click();

  const txtCity = page.locator('input[type="search"]');
  await txtCity.waitFor();

  await txtCity.fill('chennai');
  await page.keyboard.press("Enter");

  const roomType = page.locator("#room_type");

  await roomType.selectOption(
    [
      { label: "Suite" },
      { label: "Luxury" },
      { label: "Deluxe" },
      { label: "Standard" },
    ]
  )

  await page.locator("[name='check_in']").click();
  await page.locator("//a[text()='22']").waitFor();
  await page.locator("//a[text()='23']").click();

  await page.locator("[name='check_out']").click();
  await page.locator("//a[text()='31']").waitFor();
  await page.locator("//a[text()='31']").click();

  await page.locator("#no_rooms").selectOption({ index: 1 });
  await page.locator("#no_adults").selectOption({ index: 1 });

  const srchframe = page.frameLocator("#hotelsearch_iframe");
  await srchframe.locator("#searchBtn").click();

  //selecting the hotel and clicking continue button based on nth index
  const btnContinue = page.locator("//a[text()='Continue']");
  const clickcont = btnContinue.nth(1);
  console.log(await clickcont.isVisible());
  await clickcont.click();


  //filling the form details and clicking next button
  const rdoBtnMr = page.locator("#own");
  await rdoBtnMr.scrollIntoViewIfNeeded();
  await rdoBtnMr.waitFor();
  await rdoBtnMr.click();
  await page.locator("#user_title").selectOption({ value: "Mr" });
  await page.locator("#first_name").fill(myFirstName);
  await page.locator("#last_name").fill(myLastName);
  const mobile = page.locator(".form-control.numberInput");
  await mobile.waitFor();
  await mobile.fill(myMobile);
  await page.locator("#user_email").fill(myUsername);
  //filling the GST details and clicking next button
  await page.locator("#gst").click();
  await page.locator("#gst_registration").fill(gstNumber);
  await page.locator("#company_name").fill(mycompanyName);
  await page.locator("#company_address").fill(companyAddress);
  await page.locator("#step1next").click();

  //filling the special request details and clicking next button
  await page.locator("#early").click();
  await page.locator("#other_request").fill("No special request");
  await page.locator("#step2next").click();

  //filling the payment details and clicking submit button
  await page.locator("//h5[text()='Credit/Debit/ATM Card']").click();
  await page.locator("#payment_type").selectOption({ value: "debit_card" });
  await page.locator("#card_type").selectOption({ index: 1 });
  await page.locator("#card_no").fill(cardNumber);
  await page.locator("#card_name").fill(myFirstName + " " + myLastName);
  await page.locator("#card_month").selectOption({ index: 12 });
  await page.locator("#card_year").selectOption({ index: 10 });
  await page.locator("#cvv").fill(cvvNumber);
  await page.locator("#submitBtn").click();

  //order success message and order ID verification
  const bookingCode = await page.locator("[name='booking-code']").textContent();
  const finalbkngcode = bookingCode.replace("#", '').replace("Booking is Confirmed", '').trim();
  console.log("Order ID : " + finalbkngcode);

  //clicking my booking button and searching the order ID and clicking edit button
  await page.locator("//button[contains(text(),'My Booking')]").click();
  const txtbookingsrch = page.locator("//input[@name='search']");
  await txtbookingsrch.waitFor();
  await txtbookingsrch.pressSequentially(finalbkngcode);
  await page.waitForLoadState("networkidle");
  await page.locator("//button[@class='edit btn filter_btn']").click();

  await page.locator("[name='check_in']").click();


  await page.locator("//a[text()='31']").click();
  await page.locator("//button[text()='Confirm']").click();
  const alertMsg = page.locator("//li[@class='alertMsg']");

  await alertMsg.waitFor();

  console.log("Success msg using InnerText :", await alertMsg.innerText());
  console.log("Success msg using TextContent :", await alertMsg.textContent());
  console.log("Success msg using InnerHTML :", await alertMsg.innerHTML());

  //canceling the booking and verifying the cancel message
  await txtbookingsrch.waitFor();
  await txtbookingsrch.pressSequentially(finalbkngcode);
  //await txtbookingsrch.fill(finalbkngcode);
  await page.waitForLoadState("networkidle");
  const btnCancel = page.locator("//a[text()='Cancel']");
  await btnCancel.click();

  await alertMsg.waitFor();

  console.log("Cancel msg using InnerText :", await alertMsg.innerText());
  console.log("Cancel msg using TextContent :", await alertMsg.textContent());
  console.log("Cancel msg using InnerHTML :", await alertMsg.innerHTML());

  await page.waitForTimeout(4000);

});