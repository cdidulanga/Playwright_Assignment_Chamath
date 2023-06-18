import { test, chromium, expect } from '@playwright/test';

test("Navigate to The Beatles Wikipedia page", async () => {

    //Change the default behavior to be headless false
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    //Navigate to the wikipedia page and locate the details requested
    await page.goto('https://en.wikipedia.org/wiki/The_Beatles');
    await page.locator("(//a[@title='Paul McCartney'][normalize-space()='Paul McCartney'])[3]").click()
    await page.waitForLoadState();
    //Extract the date value from Paul McCartney's page
    const paulBirthDate = await page.$eval('.bday', (element) => element.textContent);
    //Printing a console log with the birthday
    console.log("Paul McCartney's Birthday is " + paulBirthDate);
    //Takes a screenshot of the Paul McCartney Wikipage
    await page.screenshot({
        path: 'tests/Screenshots/Paul_screenshot.png'
    });
    //Navigate back from the browser
    await page.goBack();
    //Locating John Lennon wiki page
    await page.locator("//p[contains(text(),'were an English')]//a[@title='John Lennon'][normalize-space()='John Lennon']").click();
    await page.waitForLoadState();
    //Extract the date value from John Lennon;s page
    const JohnBirthDate = await page.$eval('.bday', (element) => element.textContent);
    //Printing a console log with the birthday
    console.log("John Lennon's Birthday is " + JohnBirthDate);
    const johnBirthTimestamp = new Date(JohnBirthDate!).getTime();
    const paulBirthTimestamp = new Date(paulBirthDate!).getTime();
    //Asserting that John Lennon was born before Paul McCartney
    await expect(async () => {
        expect(johnBirthTimestamp).toBeLessThan(paulBirthTimestamp);
    }).toPass();
    //Takes a screenshot of the John Lennon Wikipage
    await page.screenshot({
        path: 'tests/Screenshots/John_screenshot.png'
    });
})