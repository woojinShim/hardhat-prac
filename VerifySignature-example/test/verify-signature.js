const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VerifySignature", function () {
  it("Check signature", async function () {
    const accounts = await ethers.getSigners(2);

    const VerifySignature = await ethers.getContractFactory("VerifySignature");
    const contract = await VerifySignature.deploy();
    await contract.deployed();

    // const PRIV_KEY = "0x..."
    // const signer = new ethers.Wallet(PRIV_KEY)
    const signer = accounts[0];
    const to = accounts[1].address;
    const amount = 999;
    const message = "Hello";
    const nonce = 123;

    const hash = await contract.getMessageHash(to, amount, message, nonce);
    const sig = await signer.signMessage(ethers.utils.arrayify(hash));

    const ethHash = await contract.getEthSignedMessageHash(hash);

    console.log("signer: ", signer.address);
    console.log(
      "recovered signer: ",
      await contract.recoverSigner(ethHash, sig)
    );
    // console.log("splitSignature", await contract.splitSignature(sig));

    expect(
      await contract.verify(signer.address, to, amount, message, nonce, sig)
    ).to.eq(true);
    expect(
      await contract.verify(signer.address, to, amount + 1, message, nonce, sig)
    ).to.eq(false);

    const domain = {
      name: "Ether Mail",
      version: "1",
      chainId: 1,
      verifyingContract: "0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC",
    };

    const types = {
      Person: [
        { name: "name", type: "string" },
        { name: "wallet", type: "address" },
      ],
      Mail: [
        { name: "from", type: "Person" },
        { name: "to", type: "Person" },
        { name: "contents", type: "string" },
      ],
    };

    const value = {
      from: {
        name: "Cow",
        wallet: "0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826",
      },
      to: {
        name: "Bob",
        wallet: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
      },
      contents: "Hello, Bob!",
    };

    signature = await signer._signTypedData(domain, types, value);
    console.log(signature);
    console.log(await ethers.utils.splitSignature(signature));
  });
});
