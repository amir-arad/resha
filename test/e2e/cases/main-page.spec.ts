'use strict'

const test = require('tape')
const fs = require('fs')
const HeadlessChrome = require('simple-headless-chrome')

const browser = new HeadlessChrome({
  headless: true,
  launchChrome: false,
  chrome: {
    host: 'localhost',
    port: 9222,
    remote: true
  },
  browserlog: true
})

test('main screen renders cube in center with black background', async function (t: any) {
  t.plan(1)
  try {
    await browser.init()
    const mainTab = await browser.newTab({ privateTab: false })
    const truth = fs.readFileSync(`${__dirname}/../screenshots/main.png`)
    await new Promise(resolve => setTimeout(resolve, 1000)) // TODO: fix this
    await mainTab.goTo('http://resha')
    await new Promise(resolve => setTimeout(resolve, 1000)) // page should fully load in 1s
    const captured = await mainTab.getScreenshot({}, true)
    const matchesScreenshot = Buffer.compare(captured, truth) === 0
    t.ok(matchesScreenshot, 'captured screenshot matches saved screenshot')
    await mainTab.close()
    await browser.close()
  } catch (e) {
    t.fail(e.message)
  }
});
