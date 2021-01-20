const { assert } = require("chai");
const BigNumber = require("bignumber.js")

require('chai')
    .use(require('chai-as-promised'))
    .should()

const ElectionFactory = artifacts.require('./ElectionFactory');
const Election = artifacts.require("./Election");

contract("ElectionFactory", ([_, accountTwo]) => {
    beforeEach(async () => {
        this.electionFactoryInstance = await ElectionFactory.new();
    });

    describe("hosting a new election", async () => {
        it("creates a new election instance and transfers ownership", async () => {
            const testElectionName = "test-election";
            const endDate = new Date();
            endDate.setHours(endDate.getHours() + 1);
            const endDateBN = new BigNumber(Math.floor(endDate.getTime() / 1000))
            await this.electionFactoryInstance.hostNewElection(testElectionName, endDateBN, {
                from: accountTwo
            }).should.be.fulfilled;
            const electionAddress = await this.electionFactoryInstance.elections.call(0);
            const electionInstance = await Election.at(electionAddress);
            const electionOwner = await electionInstance.owner.call();
            assert.equal(electionOwner, accountTwo);
            const electionName = await electionInstance.electionName.call();
            assert.equal(electionName, testElectionName);
        });
    });
});