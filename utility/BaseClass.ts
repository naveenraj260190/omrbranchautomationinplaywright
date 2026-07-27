import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  Keyboard,
  Locator,
  Page,
  webkit,
} from "@playwright/test";
import { toArrayBuffer } from "node:ffi";
import { SourceTextModule } from "node:vm";

export class BaseClass {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;

  // Launch Chrome Brwser
  async browserLaunchChrome() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

  // Launch FireFox Brwser
  async browserLaunchFireFox() {
    this.browser = await firefox.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

  // Launch Safari Brwser
  async browserLaunchSafari() {
    this.browser = await webkit.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

  //Browser launch multiple area

  async launchBrowser(browserType: "chrome" | "firefox" | "webkit") {
    switch (browserType) {
      case "chrome":
        this.browser = await chromium.launch();
        break;

      case "firefox":
        this.browser = await firefox.launch();
        break;

      case "webkit":
        this.browser = await webkit.launch();
        break;
    }

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

  // enter URL
  async enterApplnUrl(url: string) {
    await this.page.goto(url);
  }
  getApplnUrl(): string {
    let url = this.page.url();
    return url;
  }

  //Get Title
  async getApplnTitle(): Promise<string> {
    let title = await this.page.title();
    return title;
  }

  //fill element (send Keys)
  async fillElement(locator: Locator, data: string) {
    await locator.fill(data);
  }

  //click by mouse
  async clickElement(locator: Locator) {
    await locator.click();
  }

  //dbl click using mouse
  async dblclick(locator: Locator) {
    await locator.dblclick();
  }

  //Right click by Mouse
  async rightClick(locator: Locator) {
    await locator.click({ button: "right" });
  }

  //Select Option BY Value

  async selectOptionByValue(locator: Locator, text: string) {
    await locator.selectOption({ value: text });
  }

  //Select Option BY Label
  async selectOptionByLabel(locator: Locator, text: string) {
    await locator.selectOption({ label: text });
  }

  //Select Option BY Index
  async selectOptionByIndex(locator: Locator, no: number) {
    await locator.selectOption({ index: no });
  }

  //Fill value Sequentially
  async fillSequentially(locator: Locator, data: string) {
    await locator.pressSequentially(data);
  }

  //close browser
  async browserClose() {
    await this.browser.close();
  }

  //close context

  async contextClose() {
    await this.context.close();
  }

  //Page Close
  async pageClose() {
    await this.page.close();
  }

  //Refresh Page
  async pageRefresh() {
    await this.page.reload();
  }

  //Navigate back
  async goBack() {
    await this.page.goBack();
  }

  //Navigate Fwd
  async goForward() {
    await this.page.goForward();
  }

  //clear element
  async clearElement(locator: Locator) {
    await locator.clear();
  }

  //Get Input Value
  async getInputValue(locator: Locator): Promise<string> {
    let input = await locator.inputValue();
    return input;
  }

  //Force Click
  async forceClick(locator: Locator) {
    await locator.click({ force: true });
  }

  //get Inner text Value
  async getInnerTextValue(locator: Locator): Promise<string> {
    let innerText = await locator.innerText();
    return innerText;
  }

  //Get TextContent
  async getTextContent(locator: Locator): Promise<string | null> {
    let textContent = await locator.textContent();
    return textContent;
  }

  //Get Attribute Value
  async getAttribute(locator: Locator): Promise<string | null> {
    let value = await locator.getAttribute("value");
    return value;
  }

  //Get element count
  async getElementCount(locator: Locator): Promise<number> {
    let count = await locator.count();
    return count;
  }

  //Validate iselementVisible
  async isElementVisible(locator: Locator): Promise<boolean> {
    let element = await locator.isVisible();
    return element;
  }

  //Validate isElementHidden
  async isElementHidden(locator: Locator): Promise<boolean> {
    let element = await locator.isHidden();
    return element;
  }

  //Validate iselementenabled
  async isElementEnabled(locator: Locator): Promise<boolean> {
    let element = await locator.isEnabled();
    return element;
  }

  //Validate isElementchecked
  async isElementChecked(locator: Locator): Promise<boolean> {
    let element = await locator.isChecked();
    return element;
  }

  //Validate isElementEditable
  async isElementEditable(locator: Locator): Promise<boolean> {
    let element = await locator.isEditable();
    return element;
  }

  //Validate isElementChecked
  async checkElement(locator: Locator) {
    await locator.check();
  }

  //Validate isElementunchecked
  async uncheckElement(locator: Locator) {
    await locator.uncheck();
  }

  //DragAndDrop
  async dragAndDrop(sourceelement: Locator, destelement: Locator) {
    await sourceelement.dragTo(destelement);
  }

  //Element Focus
  async elementFocus(locator: Locator) {
    await locator.focus();
  }

  //Key Press
  async keyPress(data: string) {
    await this.page.keyboard.press(data);
  }

  //Press Enter
  async keyPressEnter() {
    await this.page.keyboard.press("Enter");
  }

  //Press Key Down
  async pressKeyDown(Data: string) {
    await this.page.keyboard.down(Data);
  }

  //Press Key UP
  async pressKeyUp(Data: string) {
    await this.page.keyboard.up(Data);
  }

  //Press Full Page Screenshot
  async takeFullPageScreenshot(fileURLToPath: string) {
    await this.page.screenshot({
      path: fileURLToPath,
      fullPage: true,
    });
  }

  //Press particular Page Screenshot
  async takeParticularPageScreenshot(fileURLToPath: string) {
    await this.page.screenshot({
      path: fileURLToPath,
      fullPage: false,
    });
  }

  //Take scrnshot for Particular element
  async takeParticularElementScreenshot(
    fileURLToPath: string,
    locator: Locator,
  ) {
    await locator.screenshot({
      path: fileURLToPath,
    });
  }

  //wait For element until its visible
  async waitUntilElementVisible(locator: Locator) {
    await locator.waitFor({ state: "visible" });
  }

  //wait For element until is hidden
  async waitUntilElementHidden(locator: Locator) {
    await locator.waitFor({ state: "hidden" });
  }

  //wait For element until is attached
  async waitUntilElementAttached(locator: Locator) {
    await locator.waitFor({ state: "attached" });
  }

  //wait For element until is detached
  async waitUntilElementDetached(locator: Locator) {
    await locator.waitFor({ state: "detached" });
  }

  //wait For page  load
  async waitUntilPageLoaded() {
    await this.page.waitForLoadState("load");
  }

  //wait For dom content loaded
  async waitUntilPageDomContentLoaded() {
    await this.page.waitForLoadState("domcontentloaded");
  }

  //wait For network loaded
  async waitForNetworkIdle() {
    await this.page.waitForLoadState("networkidle");
  }

  //wait For URL Load
  async waitForURLLoad(url: string) {
    await this.page.waitForURL(url);
  }

  //Static wait
  async staticWait(millisecs: number) {
    await this.page.waitForTimeout(millisecs);
  }

  //Handle Accept Alert Once
  handleAcceptAlertOnce() {
    this.page.once("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  //Handle Dismiss Alert Once
  handleDismissAlertOnce() {
    this.page.once("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  }

  //Handle Accept Alert everywhere
  handleAcceptAlertOn() {
    this.page.on("dialog", async (dialog) => {
      await dialog.accept();
    });
  }

  //Handle dismiss Alert everywhere
  handleDismissAlertOn() {
    this.page.on("dialog", async (dialog) => {
      await dialog.dismiss();
    });
  }

  //Switch window using Event
  async windowChangeUsingEvent(locator: Locator): Promise<Page> {
    const [newPage] = await Promise.all([
      this.context.waitForEvent("page"),
      locator.click(),
    ]);

    await newPage.waitForLoadState();
    return newPage;
  }

  //Switch window using Index
  async windowChangeUsingIndex(locator: Locator, index: number): Promise<Page> {
    await Promise.all([
      this.context.waitForEvent("page"),
      locator.click(),
    ]);

    const pages = this.context.pages();
    const selectedPage = pages[index];

    await selectedPage.waitForLoadState();
    await selectedPage.bringToFront();

    return selectedPage;
  }

  // Switch Window by Title
  async switchWindowByTitle(title: string): Promise<Page | null> {
    const pages = this.context.pages();

    for (const page of pages) {
      await page.waitForLoadState();

      if ((await page.title()) === title) {
        await page.bringToFront();
        return page;
      }
    }

    return null;
  }

  // Switch Window by URL
  async switchWindowByURL(url: string): Promise<Page | null> {
    const pages = this.context.pages();

    for (const page of pages) {
      await page.waitForLoadState();

      if (page.url() === url) {
        await page.bringToFront();
        return page;
      }
    }

    return null;
  }

  // Switch to Existing Window
  async switchToExistingWindow(index: number): Promise<Page> {
    const pages = this.context.pages();

    await pages[index].bringToFront();

    return pages[index];
  }

  // Get All Open Windows
  async getAllOpenWindows(): Promise<Page[]> {
    return this.context.pages();
  }

  //Scroll into view using elemnt
  async scrollIntoView(locator: Locator) {
    await locator.scrollIntoViewIfNeeded();
  }
}
