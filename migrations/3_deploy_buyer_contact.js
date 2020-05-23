const BuyerDetails = artifacts.require("BuyerDetails");

module.exports = function(deployer) {
  deployer.deploy(BuyerDetails);
};