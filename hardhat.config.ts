require('@nomiclabs/hardhat-ethers')

module.exports = {
    solidity: {
        compilers: [
          // {
          //   version: '0.8.2',
          //   settings: {},
          // },
          // {
          //   version: '0.7.2',
          //   settings: {},
          // },
          // {
          //   version: '0.6.12',
          //   settings: {},
          // },
          {
            version: '0.8.13',
            settings: {},
          },
        ],
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
}