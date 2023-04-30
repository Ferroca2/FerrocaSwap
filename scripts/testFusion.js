
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const fusion = require("@1inch/fusion-sdk");

const { ethers } = require("ethers");
const { Web3 } = require("web3");

const { FusionSDK, NetworkEnum, FusionOrder, AuctionSalt, AuctionSuffix, PrivateKeyProviderConnector } = fusion;


async function test1(){
    const salt = new AuctionSalt({
        duration: 180,
        auctionStartTime: 1673548149,
        initialRateBump: 50000,
        bankFee: '0'
    })
    
    const suffix = new AuctionSuffix({
        points: [
            {
                coefficient: 20000,
                delay: 12
            }
        ],
        whitelist: [
            {
                address: '0x00000000219ab540356cbb839cbe05303d7705fa',
                allowance: 0
            }
        ]
    })
    
    const order = new FusionOrder(
        {
            makerAsset: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
            takerAsset: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
            makingAmount: '1000000000000000000',
            takingAmount: '1420000000',
            maker: '0x00000000219ab540356cbb839cbe05303d7705fa'
        },
        salt,
        suffix
    )
    
    order.build();

    console.log(order)
}

async function test2(){
    const makerPrivateKey = process.env.PRIVATE_KEY;
    console.log(makerPrivateKey)
    const makerAddress = "0xbA1B7FD1dAdD6000514b2Fc3156E8Ef2Ffd136bc"

    const nodeUrl = `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_KEY}`;

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
        toTokenAddress: '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174', // OLAF
        fromTokenAddress: '0xC7cc31Bba3fF09A0b4034754D4bD418B64ac7ecf', // PKT
        amount: '2', // 0.05 ETH
        walletAddress: makerAddress
    }).then(console.log)
    .catch(console.error);

}

async function main() {
    // await test1();
    // await test2();
    await test2();


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

main()