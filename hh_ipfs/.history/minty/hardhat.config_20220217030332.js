require('@nomiclabs/hardhat-ethers')
require('@nomiclabs/hardhat-waffle')
require("@nomiclabs/hardhat-truffle5");
require("@nomiclabs/hardhat-etherscan"); // etherscan verification

require('hardhat-deploy')

require('@eth-optimism/hardhat-ovm') // added

require("dotenv").config({path: "./.env"});

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async () => {
  const accounts = await ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const account = web3.utils.toChecksumAddress(taskArgs.account);
    const balance = await web3.eth.getBalance(account);

    console.log(web3.utils.fromWei(balance, "ether"), "ETH");
  });

task("deployer", "Prints deployer's info")
  .setAction(async () => {

    // hre = hardhat runtime environment
    const { deployer } = await hre.getNamedAccounts()

    console.log("Deployer:", deployer)
    const balance = await web3.eth.getBalance(deployer);
    console.log("Balance:", web3.utils.fromWei(balance, "ether"), "ETH");
  });

module.exports = {
  networks: {
    hardhat: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk'
      }
    },

    // L1
    optimism_l1: {
      url: 'http://63.250.52.190:9545',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
        // mnemonic: 'test test test test test test test test test test test junk'
      } //,
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      // gasPrice: 0,
      // ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },

    // L2
    optimism: {
      url: 'http://63.250.52.190:8545',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0, //1000000000,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },

    // L2
    optimism_kovan: {
      url: 'https://kovan.optimism.io',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      // This sets the gas price to 0 for all transactions on L2. We do this
      // because account balances are not automatically initiated with an ETH
      // balance (yet, sorry!).
      gasPrice: 0, //1000000000,
      ovm: true // This sets the network as using the ovm and ensure contract will be compiled against that.
    },

    // Matic testnet
    mumbai: {
      url: 'https://rpc-mumbai.matic.today',
      chainId: 80001,
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      gas: 5000000
    },

    // Matic testnet
    matic: {
      url: 'https://matic-mainnet.chainstacklabs.com',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      gasPrice: 0
    },

    // Arbitrum local L2
    arbitrum_local: {
      url: 'http://127.0.0.1:8547',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },

    // Arbitrum ncloud L2
    arbitrum_ncloud: {
      url: 'http://101.101.208.34:8547',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },

    // Arbitrum ncloud L2
    arbitrum_rinkeby: {
      url: 'https://rinkeby.arbitrum.io/rpc',
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      gasPrice: 0,
    },

    // kovan
    kovan: {
      url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      // gasPrice: 0,
    },

    // rinkeby
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      // gasPrice: 0,
    },

    // ropsten
    ropsten: {
      url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      // gasPrice: 0,
    },

    // goerli
    goerli: {
      url: `https://goerli.infura.io/v3/${process.env.INFURA_API_KEY}`,
      accounts: {
        mnemonic: process.env.MNEMONIC // 0x7D0479eB884C41311F5a6581d42B8b784fA8c1b6
      },
      network_id: '*', // Match any network id
      // gasPrice: 0,
    },

    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
    },
    avalanche: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43114,
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
    },


    // privatebesu
    privatebesu: {
      url: `http://63.250.52.190:8545`,
      accounts: {
        mnemonic: process.env.MNEMONIC
      },
      network_id: '*',
      gasPrice: 0,
    },

  },

  // etherscan verification
  // Usage: hh verify --contract contracts/KBAEToken.sol:KBAEToken --network rinkeby 0x36e6091aD0D7F3a72244525b3F7EfdD7F7242D97 "10000000000000000000000"
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  },

  solidity: {
    version: "0.8.0",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },

  ovm: {
    solcVersion: '0.7.6'
  },
  
  namedAccounts: {
    deployer: 0
  },
}