const Election = artifacts.require("./Election");
const BigNumber = require("bignumber.js");

module.exports = deployer => {
    const endDate = new Date();
    endDate.setHours(endDate.getHours() + 1);
    const endDateBN = new BigNumber(Math.floor(endDate.getTime() / 1000))
    deployer.deploy(Election, "test-election", endDateBN);
}