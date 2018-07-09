'use strict'

const test = require('tape')
const fs = require('fs')
const util = require('util')
const puppeteer = require('puppeteer')
const looksSame = util.promisify(require('looks-same'))

test('main screen renders cube in center with black background',
  async function (t: any) {
    t.plan(1)
    try {
      const browser = await puppeteer.launch({ args: ['--no-sandbox'] })
      const page = await browser.newPage()
      await new Promise(resolve => setTimeout(resolve, 1000)) // TODO: fix this
      await page.goto('http://localhost:31337')
      await new Promise(resolve => setTimeout(resolve, 1000))
      // page should fully load in 1s
      const captured = await page.screenshot()
      const truth = fs.readFileSync(`${__dirname}/../screenshots/main.png`)
      const matchesScreenshot = await looksSame(truth, captured)
      t.ok(matchesScreenshot, 'captured screenshot matches saved screenshot')
      await browser.close()
    } catch (e) {
      t.fail(e.message)
    }
  }
)
