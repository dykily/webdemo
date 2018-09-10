const {Builder, By, Key, until} = require('selenium-webdriver');
const reqUrlTest = require("../config").reqUrlTest;
(async function example() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    await driver.get(reqUrlTest + '/index/index/');
    let btn = driver.findElement(By.className('btnThumb'));


    var count;
    await btn.getAttribute("value").then(function(ret){
      count = ret;
    });
    await btn.click();//点击按钮 请求 点赞+1
    //在规定时间内 是否满足 条件
    await driver.wait(until.elementTextIs(btn, "大拇指" + (++count)), 1000);
    
    
    
  } finally {
    await driver.quit()
  }
})();