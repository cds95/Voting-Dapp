const { assert } = require("chai");

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
            await this.electionFactoryInstance.hostNewElection(testElectionName, {
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