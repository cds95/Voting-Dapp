const Election = artifacts.require("./Election");
const BigNumber = require("bignumber.js");

// test as hexdecimal
const TEST = "0x7465737400000000000000000000000000000000000000000000000000000000";
module.exports = deployer => {
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 1);
    const endDateBN = new BigNumber(Math.floor(endDate.getTime() / 1000))
    deployer.deploy(Election, TEST, endDateBN);
}