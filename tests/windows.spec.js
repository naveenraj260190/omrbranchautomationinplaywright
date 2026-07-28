import { chromium ,firefox,test, webkit} from "@playwright/test"

test("base",async()=>
{
    
const browser = await firefox.launch();
  const context = await browser.newContext();
  const page = await context.newPage();




})