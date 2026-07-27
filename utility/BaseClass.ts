import {
  Browser,
  BrowserContext,
  chromium,
  firefox,
  Locator,
  Page,
  webkit,
} from "@playwright/test";

export class BaseClass {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  async browserLaunchChrome() {
    this.browser = await chromium.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

 async browserLaunchFireFox() {
    this.browser = await firefox.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

   async browserLaunchSafari() {
    this.browser = await webkit.launch();
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    await this.page.setViewportSize({ width: 1200, height: 1000 });
  }

  async enterApplnUrl(url: string) {
    await this.page.goto(url);
  }
  getApplnUrl(): string {
    let url = this.page.url();
    return url;
  }
  async getApplnTitle(): Promise<string> {
    let title = await this.page.title();
    return title;
  }
  async fillElement(locator: Locator, data: string) {
    await locator.fill(data);
  }

  async clickElement(locator: Locator) {
    await locator.click();
  }

    async dblclick(locator: Locator) {
    await locator.dblclick();
  }

   async rightClick(locator: Locator) {
    await locator.click({button:"right"});
  }

  async selectOptionByLabale(locator: Locator, text: string) {
    await locator.selectOption({ label: text });
  }

 async  fillSequentially(locator: Locator,data:string)
  {
    await locator.pressSequentially(data);
  }

 async BrowserClose()
  {
    await this.browser.close();
  }

 async ContextClose()
  {
    await this.context.close();
  }

  async pageClose()
  {
    await this.page.close();
  }

  async pageRefresh()
  {
    await this.page.reload();
  }

  async goBack()
  {
    await this.page.goBack();
  }

  async goForward()
  {
    this.page.goForward();
  }

 async clearelement(locator:Locator)
  {
   await locator.clear();
  }

 async getInputValue(locator:Locator):  Promise<string>
  {
  let input=  await locator.inputValue()
  return input;
  }

  async forceClick(locator:Locator)
  {
   await locator.click({force : true});
  }

async getInnerTextValue(locator:Locator) : Promise<string>
{
let innerText = await locator.innerText();
return innerText;
}

async getTextContent(locator:Locator): Promise<string |null >
{
let textContent= await locator.textContent();
return textContent;
}

async getAttribute(locator:Locator) :Promise<String | null>
{
let value = await locator.getAttribute("value");
return value;
}

async getElementCount(locator:Locator)
{
await locator.count();
}

async iselementVisible(locator:Locator): Promise<boolean>
{
let element =await locator.isVisible();
return element;
}

async iselementHidden(locator:Locator): Promise<boolean>
{
let element =await locator.isHidden();
return element;
}

async iselementEnabled(locator:Locator): Promise<boolean>
{
let element =await locator.isEnabled();
return element;
}

async iselementChecked(locator:Locator): Promise<boolean>
{
let element =await locator.isChecked();
return element;
}

async iselementEditable(locator:Locator): Promise<boolean>
{
let element =await locator.isEditable();
return element;
}

async checkElement(locator:Locator)
{
await locator.check();
}

async uncheckElement(locator:Locator)
{
await locator.uncheck();
}


}
