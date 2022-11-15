const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
  let simpleStorageFactory, simpleStorage
  beforeEach(async function () {
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    simpleStorage = await simpleStorageFactory.deploy()
  })

  // to run only specific test use "it.only"
  // it.only("Should start with favarite number of 0", async function () {})
  // or use command `yarn hardhat test --grep store`

  it("Should start with favarite number of 0", async function () {
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    // assert
    assert.equal(currentValue.toString(), expectedValue)
    // expect
    // expect(currentValue.toString()).to.equal(expectedValue)
  })

  it("Should update when we call store", async function () {
    const expectedValue = "7"
    const transactionResponse = await simpleStorage.store(expectedValue)
    await transactionResponse.wait(1)
    const currentValue = await simpleStorage.retrieve()
    // assert
    // assert.equal(currentValue.toString(), expectedValue)
    // expect
    expect(currentValue.toString()).to.equal(expectedValue)
  })
})
