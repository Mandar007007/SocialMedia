// Generated by Selenium IDE
const { Builder, By, Key, until } = require('selenium-webdriver')
const assert = require('assert')

describe('Create Post', function() {
  this.timeout(30000)
  let driver
  let vars
  beforeEach(async function() {
    driver = await new Builder().forBrowser('chrome').build()
    vars = {}
  })
  afterEach(async function() {
    await driver.quit();
  })
  it('Create Post', async function() {
    await driver.get("http://localhost:5173/home")
    await driver.manage().window().setRect({ width: 1936, height: 1096 })
    await driver.findElement(By.id("caption")).click()
    await driver.findElement(By.id("caption")).sendKeys("Hello I am raj currently I am developing mern project about the cricket match tournament system and I am helping with DHruvin my roomate")
    await driver.findElement(By.id("caption")).click()
    await driver.findElement(By.id("caption")).sendKeys("Hello I am the guy who created this application how are you all guys!!")
    await driver.findElement(By.css(".w-\\[20\\%\\]")).click()
  })
})
