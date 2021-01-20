const ElectionFactory = artifacts.require("./ElectionFactory.sol");

module.exports = deployer => {
    deployer.deploy(ElectionFactory);
}