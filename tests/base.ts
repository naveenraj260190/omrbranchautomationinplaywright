import { chromium ,firefox,test, webkit} from "@playwright/test"

test("base",async()=>
{
    let browser=await chromium.launch();
    let context = await browser.newContext();
    let page =await  context.newPage();

    await page.goto("url");
   await  page.goForward();
   await page.goBack();

let title = page.url();

let element =page.locator("");
await element.clear();
await element.isVisible();
await element.isHidden();
await element.isEnabled();
await element.isChecked();
await element.isDisabled();
await element.isEditable();
await element.check();
await element.uncheck();
await element.count();
await element.getAttribute("");
await element.inputValue();
await element.pressSequentially("");
await element.innerText();

await element.hover();

await element.focus()
await element.scrollIntoViewIfNeeded();

await element.waitFor({state:"visible"});

await page.waitForLoadState("load");

await page.waitForLoadState("domcontentloaded");

await page.keyboard.up("");

 page.on("dialog", async (dialog) => {
	
		   console.log(dialog.type());
	        console.log(dialog.message());
	        await dialog.accept();
	
	            }
    );


    await page.close()

    await context.close();
   await  browser.close();

})