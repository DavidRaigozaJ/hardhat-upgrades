const { network } = require("hardhat")
const {developmentChains} = require("../helper-hardhar-config")
const { verify } = require("../utils/verify")


module.exports = async ({getNamedAccounts, deployments}) => {
    const { deploy, log } = deployments
    const {deployer} = await getNamedAccounts()

    const boxv2 = await deploy ("BoxV2", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: network.config.blockConfirmations,

    })
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        log("verifying...")
        await verify(boxv2.addess, [])
    }
}