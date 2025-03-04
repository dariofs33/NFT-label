const fs = require('fs');
const path = require("path");
const HDWalletProvider = require('@truffle/hdwallet-provider');

const mnemonic = fs.readFileSync(".secret").toString().trim();
 if (!mnemonic || mnemonic.split(' ').length !== 12) {
  console.log('unable to retrieve mnemonic from .secret');
}

//Update gas price Testnet
/* Run this first, to use the result in truffle-config:
  curl https://public-node.testnet.rsk.co/ -X POST -H "Content-Type: application/json" \
    --data '{"jsonrpc":"2.0","method":"eth_getBlockByNumber","params":["latest",false],"id":1}' \
    > .minimum-gas-price-testnet.json
*/
const gasPriceTestnetRaw = fs.readFileSync(".minimum-gas-price-testnet.json").toString().trim();
const minimumGasPriceTestnet = parseInt(JSON.parse(gasPriceTestnetRaw).result.minimumGasPrice, 16);
if (typeof minimumGasPriceTestnet !== 'number' || isNaN(minimumGasPriceTestnet)) {
  throw new Error('unable to retrieve network gas price from .gas-price-testnet.json');
}
console.log("Minimum gas price Testnet: " + minimumGasPriceTestnet);

module.exports = {
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),

  networks: {
    develop: {
      port: 8545
    }, 
    testnet: { //Testnet RSK with dPathEthereum = metamask addresses
      //https://www.npmjs.com/package/@truffle/hdwallet-provider
      //provider: () => new HDWalletProvider(mnemonic, 'https://public-node.testnet.rsk.co', 0, 10),
      provider: () => new HDWalletProvider({
        mnemonic: { phrase: mnemonic },
        providerOrUrl: 'https://public-node.testnet.rsk.co',
        numberOfAddresses: 10,
        pollingInterval: 15e3 
      }),
      network_id: 31,
      gasPrice: Math.floor(minimumGasPriceTestnet * 1.3),
      networkCheckTimeout: 1e6, //1h = 36e5
      //Source: https://dappsdev.org/blog/2021-02-24-how-to-configure-truffle-to-connect-to-rsk/
      // Higher polling interval to check for blocks less frequently
      // during deployment
      deploymentPollingInterval: 15e3,  //15s = 15e3, default is 4e3
      timeoutBlocks: 100,
    } 
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {  },
  
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.5.7",
    }
  }
}

// /**
//  * Use this file to configure your truffle project. It's seeded with some
//  * common settings for different networks and features like migrations,
//  * compilation and testing. Uncomment the ones you need or modify
//  * them to suit your project as necessary.
//  *
//  * More information about configuration can be found at:
//  *
//  * trufflesuite.com/docs/advanced/configuration
//  *
//  * To deploy via Infura you'll need a wallet provider (like @truffle/hdwallet-provider)
//  * to sign your transactions before they're sent to a remote public node. Infura accounts
//  * are available for free at: infura.io/register.
//  *
//  * You'll also need a mnemonic - the twelve word phrase the wallet uses to generate
//  * public/private key pairs. If you're publishing your code to GitHub make sure you load this
//  * phrase from a file you've .gitignored so it doesn't accidentally become public.
//  *
//  */

// // const HDWalletProvider = require('@truffle/hdwallet-provider');
// // const infuraKey = "fj4jll3k.....";
// //
// // const fs = require('fs');
// // const mnemonic = fs.readFileSync(".secret").toString().trim();

// module.exports = {
//   /**
//    * Networks define how you connect to your ethereum client and let you set the
//    * defaults web3 uses to send transactions. If you don't specify one truffle
//    * will spin up a development blockchain for you on port 9545 when you
//    * run `develop` or `test`. You can ask a truffle command to use a specific
//    * network from the command line, e.g
//    *
//    * $ truffle test --network <network-name>
//    */

//   networks: {
//     // Useful for testing. The `development` name is special - truffle uses it by default
//     // if it's defined here and no other network is specified at the command line.
//     // You should run a client (like ganache-cli, geth or parity) in a separate terminal
//     // tab if you use this network and you must also set the `host`, `port` and `network_id`
//     // options below to some value.
//     //
//     // development: {
//     //  host: "127.0.0.1",     // Localhost (default: none)
//     //  port: 8545,            // Standard Ethereum port (default: none)
//     //  network_id: "*",       // Any network (default: none)
//     // },
//     // Another network with more advanced options...
//     // advanced: {
//     // port: 8777,             // Custom port
//     // network_id: 1342,       // Custom network
//     // gas: 8500000,           // Gas sent with each transaction (default: ~6700000)
//     // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
//     // from: <address>,        // Account to send txs from (default: accounts[0])
//     // websocket: true        // Enable EventEmitter interface for web3 (default: false)
//     // },
//     // Useful for deploying to a public network.
//     // NB: It's important to wrap the provider as a function.
//     // ropsten: {
//     // provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/YOUR-PROJECT-ID`),
//     // network_id: 3,       // Ropsten's id
//     // gas: 5500000,        // Ropsten has a lower block limit than mainnet
//     // confirmations: 2,    // # of confs to wait between deployments. (default: 0)
//     // timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
//     // skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
//     // },
//     // Useful for private networks
//     // private: {
//     // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
//     // network_id: 2111,   // This network is yours, in the cloud.
//     // production: true    // Treats this network as if it was a public net. (default: false)
//     // }
//   },

//   // Set default mocha options here, use special reporters etc.
//   mocha: {
//     // timeout: 100000
//   },

//   // Configure your compilers
//   compilers: {
//     solc: {
//       // version: "0.5.1",    // Fetch exact version from solc-bin (default: truffle's version)
//       // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
//       // settings: {          // See the solidity docs for advice about optimization and evmVersion
//       //  optimizer: {
//       //    enabled: false,
//       //    runs: 200
//       //  },
//       //  evmVersion: "byzantium"
//       // }
//     }
//   },

//   // Truffle DB is currently disabled by default; to enable it, change enabled: false to enabled: true
//   //
//   // Note: if you migrated your contracts prior to enabling this field in your Truffle project and want
//   // those previously migrated contracts available in the .db directory, you will need to run the following:
//   // $ truffle migrate --reset --compile-all

//   db: {
//     enabled: false
//   }
// };
