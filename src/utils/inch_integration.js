
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const fusion = require("@1inch/fusion-sdk");

const { ethers } = require("ethers");
const { Web3 } = require("web3");

const { FusionSDK, NetworkEnum, FusionOrder, AuctionSalt, AuctionSuffix, PrivateKeyProviderConnector } = fusion;



async function createOrderAndSend(){
    const makerPrivateKey = process.env.PRIVATE_KEY;
    console.log(makerPrivateKey)
    const makerAddress = "0xbA1B7FD1dAdD6000514b2Fc3156E8Ef2Ffd136bc"

    const nodeUrl = `https://polygon-testnet.infura.io/v3/${process.env.INFURA_KEY}`;

    const provider = new PrivateKeyProviderConnector(
        makerPrivateKey,
        nodeUrl
    );

    console.log(provider)

    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: 1,
        blockchainProvider: provider
    })

    sdk.placeOrder({
        toTokenAddress: '0xa86D345A276eAC3eAc2C98b7f9Ce27b83C20F8A6', // BRL
        fromTokenAddress: '0x81BC2fDA400308c3568B085F083593a385BE0130', // PKT
        amount: '2', // 0.05 ETH
        walletAddress: makerAddress
    }).then(console.log)
    .catch(console.error);

}

async function main() {
    // await test1();
    await createOrderAndSend();


    const sdk = new FusionSDK({
        url: 'https://fusion.1inch.io',
        network: NetworkEnum.POLYGON
    })

    //const orders = await sdk.getActiveOrders({page: 1, limit: 2});

    const orders = await sdk.getOrdersByMaker({
        page: 1,
        limit: 10,
        address: "0xbA1B7FD1dAdD6000514b2Fc3156E8Ef2Ffd136bc"

    })
    console.log(orders);
}