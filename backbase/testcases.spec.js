//testcases

describe('Homepage', () => {

  beforeAll(() => {
    browser.waitForAngularEnabled(false)
    browser.get(browser.baseUrl);
  });

  it('should display the database table', () => {
	expect(element(by.className('computers zebra-striped')).isDisplayed()).toBe(true);
  });

  //testcase 1, 4 and 5
  it('Add a new computer with all fields filled', () => {
    const addComputer = element(by.id('add'));
    addComputer.click();
    const addComputerName = element(by.id('name'));
    const addIntroducedDate = element(by.id('introduced'));
    const addDiscontinuedDate = element(by.id('discontinued'));
    const dropdownCompany = element(by.id('company'));
    const buttonCreateComputer = element(by.xpath('//*[@id="main"]/form/div/input'));
    addComputerName.sendKeys('aaacomputer');
    addIntroducedDate.sendKeys('01-05-2020');
    buttonCreateComputer.click();
    expect(element(by.className('clearfix error')).isPresent()).toBe(true);
    addIntroducedDate.clear();
    addIntroducedDate.sendKeys('2018-05-01');
    addDiscontinuedDate.sendKeys('01-05-2020');
    buttonCreateComputer.click();
    expect(element(by.className('clearfix error')).isPresent()).toBe(true);
    addDiscontinuedDate.clear();
    addDiscontinuedDate.sendKeys('2020-05-01');
    dropdownCompany.click();
    const option = element(by.xpath('//*[@id="company"]/option[2]'));
    option.click();
    addComputerName.click();
    buttonCreateComputer.click();
    expect(element(by.className('alert-message warning')).getText()).toEqual('Done! Computer aaacomputer has been created');
  });

  //testcase 2 en 3
  it('Add a new computer with only mandatory fields filled', () => {
    const addComputer = element(by.id('add'));
    addComputer.click();
    const addComputerName = element(by.id('name'));
    const buttonCreateComputer = element(by.xpath('//*[@id="main"]/form/div/input'));
    buttonCreateComputer.click();
    expect(element(by.className('clearfix error')).isPresent()).toBe(true);
    addComputerName.sendKeys('zzzcomputer');
    buttonCreateComputer.click();
    expect(element(by.className('alert-message warning')).getText()).toEqual('Done! Computer zzzcomputer has been created');
  });

  //testcase 6 and 8
  it('filter and select the added computer of testcase 1, change the name and delete the computer', () => {
    const filterBox = element(by.id('searchbox'));
    filterBox.sendKeys('aaacomputer');
    const filterButton = element(by.id('searchsubmit'));
    filterButton.click();
    const firstSearchResult = element(by.xpath('//*[@id="main"]/table/tbody/tr[1]/td[1]/a'));
    firstSearchResult.click();
    expect(element(by.css('input[value="aaacomputer"]')).isDisplayed()).toBe(true);
    expect(element(by.css('input[value="2018-05-01"]')).isDisplayed()).toBe(true);
    expect(element(by.css('input[value="2020-05-01"]')).isDisplayed()).toBe(true);
    expect(element(by.id('company')).$('option:checked').getText()).toEqual('Apple Inc.');
    const changeComputerName = element(by.id('name'));
    changeComputerName.sendKeys('1');
    const buttonSaveComputer = element(by.xpath('//*[@id="main"]/form[1]/div/input'));
    buttonSaveComputer.click();
    expect(element(by.className('alert-message warning')).getText()).toEqual('Done! Computer aaacomputer1 has been updated');
    filterBox.sendKeys('aaacomputer1');
    filterButton.click();
    firstSearchResult.click();
    const buttonDeleteComputer = element(by.xpath('//*[@id="main"]/form[2]/input'));
    buttonDeleteComputer.click();
    expect(element(by.className('alert-message warning')).getText()).toEqual('Done! Computer has been deleted');
  });

  //testcase 7 and 8
  it('filter and select the added computer of testcase 2, change the name and delete the computer', () => {
    const filterBox = element(by.id('searchbox'));
    filterBox.sendKeys('zzzcomputer');
    const filterButton = element(by.id('searchsubmit'));
    filterButton.click();
    const firstSearchResult = element(by.xpath('//*[@id="main"]/table/tbody/tr[1]/td[1]/a'));
    firstSearchResult.click();
    expect(element(by.css('input[value="zzzcomputer"]')).isDisplayed()).toBe(true);
    const changeComputerName = element(by.id('name'));
    changeComputerName.sendKeys('1');
    const buttonSaveComputer = element(by.xpath('//*[@id="main"]/form[1]/div/a'));
    buttonSaveComputer.click();
    expect(element(by.className('alert-message warning')).isPresent()).toBe(false);
    filterBox.sendKeys('zzzcomputer');
    filterButton.click();
    firstSearchResult.click();
    const buttonDeleteComputer = element(by.xpath('//*[@id="main"]/form[2]/input'));
    buttonDeleteComputer.click();
    expect(element(by.className('alert-message warning')).getText()).toEqual('Done! Computer has been deleted');
  });

  //testcase 9
  it('filter on a not excisting name', () => {
    const filterBox = element(by.id('searchbox'));
    filterBox.sendKeys('zzzcomputer');
    const filterButton = element(by.id('searchsubmit'));
    filterButton.click();
    expect(element(by.xpath('//*[@id="main"]/div[2]/em')).getText()).toEqual('Nothing to display');
  });

});
