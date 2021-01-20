const { assert } = require("chai");

require('chai')
  .use(require('chai-as-promised'))
  .should()

const Election = artifacts.require("./Election.sol");

const electionStates = {
    notStarted: 0,
    inProgress: 1,
    ended: 2
}

const TEST_ELECTION_NAME = "test-election";

contract("Election", ([accountOne, accountTwo, candidateOne, candidateTwo]) => {
    beforeEach(async () => {
        this.electionInstance = await Election.new(TEST_ELECTION_NAME);
    })

    describe("election attributes on creation", () => {
        it("should create an election where the state is not started", async () => {
            const state = await this.electionInstance.electionState.call();
            assert.equal(state, electionStates.notStarted);
        });
    
        it("should set the message sender as the election owner", async () => {
            const owner = await this.electionInstance.owner.call();
            assert.equal(owner, accountOne);
        });
    
        it("should set the correct election name", async () => {
            const name = await this.electionInstance.electionName.call();
            assert.equal(name, TEST_ELECTION_NAME);
        });
    });

    describe("transfering ownership", () => {
        it("should transfer ownership", async () => {
            await this.electionInstance.transferOwnership(accountTwo, {
                from: accountOne
            }).should.be.fulfilled;
            const newOwner = await this.electionInstance.owner.call();
            assert.equal(newOwner, accountTwo);
        });

        it("should not let a non owner transfer ownership", async () => {
            await this.electionInstance.transferOwnership(accountOne, {
                from: accountTwo
            }).should.not.be.fulfilled;
            const owner = await this.electionInstance.owner.call();
            assert.equal(owner, accountOne);
        });
    });

    describe("nominating candidates", () => {
        it("should only allow the owner to nominate candidates", async () => {
            await this.electionInstance.nominateCandidate(candidateOne, {
                from: accountTwo
            }).should.not.be.fulfilled;
        });

        it("should allow the owner to nominate a candidate", async () => {
            await this.electionInstance.nominateCandidate(candidateOne, {
                from: accountOne 
            }).should.be.fulfilled;
            const candidate = await this.electionInstance.candidates.call(0)
            assert.equal(candidate, candidateOne);
            const votes = await this.electionInstance.votes.call(candidateOne);
            assert.equal(votes, 0);
        });
    });

    describe("starting an election", () => {
        describe("less than two candidates", () => {
            it("should not let an election begin if there are less than two candidates", async () => {
                await this.electionInstance.startElection({
                    from: accountOne
                }).should.not.be.fulfilled;
            });
        });

        describe("at least two candidates", () => {
            beforeEach(async () => {
                this.electionInstance.nominateCandidate(candidateOne, {
                    from: accountOne
                });
                this.electionInstance.nominateCandidate(candidateTwo, {
                    from: accountOne
                });
            });

            it("should not let a non owner start an election", async () => {
                await this.electionInstance.startElection({
                    from: accountTwo
                }).should.not.be.fulfilled;
            });
    
            it("should let the owner start the election", async () => {
                await this.electionInstance.startElection({
                    from: accountOne
                }).should.be.fulfilled;
                const electionState = await this.electionInstance.electionState.call();
                assert.equal(electionState, electionStates.inProgress);
            });
        });
    })
});