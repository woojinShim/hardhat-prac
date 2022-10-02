require('dotenv').config({path: '../.env'});

const Point = artifacts.require('Point');

const { Contract } = require('ethers');
const chai = require('./setupchai')
const BN = web3.utils.BN;
const expect = chai.expect;

Contract("Point", async(accounts) => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    beforeEach(async() => {
        this.myPoint = await Point.new("1000000");
    })

    it("all points should be in my account", async() => {
        let instance = this.myPoint;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    })

    it("it is possible to send Points between accounts", async () => {
        const sendPoints = 1;
        let instance = this.myPoint;
        let totalSupply = await instance.totalSupply();

        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendPoints)).to.eventually.be.fulfilled;

        console.log("rec bal", await instance.balanceOf(recipient));
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN (sendPoints));
        return expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN (sendPoints));
    })

    it("it is not possible to send more Points than available in total", async () => {

        let instance = this.myPoint;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);
        expect(instance.transfer(recipient, new BN(balanceOfDeployer+1))).to.evnetually.be.rejected;

        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    })

})