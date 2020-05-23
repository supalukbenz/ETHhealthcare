// import chai from 'chai'
// import chaiAsPromised from 'chai-as-promised'
const PatientRecord = artifacts.require("PatientRecord");
 
// chai.should()
// chai.use(chaiAsPromised)
require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('PatientRecord', ([deployer, seller, buyer]) => {
  let patientRecord;
  before(async () => {
    patientRecord = await PatientRecord.deployed();    
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await patientRecord.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('has a name', async () => {
      const name = await patientRecord.name();
      assert.equal(name, 'PatientRecord')
    })
  })

  describe('patients', async () => {
    let result, patientCount;

    before(async () => {
      result = await patientRecord.createPatient('iphone', web3.utils.toWei('1', 'Ether'), {from: seller});
      patientCount = await patientRecord.patientCount();
    })
    
    it('creat patient', async () => {
      assert.equal(patientCount, 1)
      const event = result.logs[0].args;

      console.log('event: ', event);

      assert.equal(event.id.toNumber(), patientCount.toNumber(), 'id is correct');
      assert.equal(event.name, 'iphone', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, seller, 'owner is correct')
      assert.equal(event.purchased, false, 'purchased is correct')

      await await patientRecord.createPatient('', web3.utils.toWei('1', 'Ether'), {from: seller}).should.be.rejected;
      await await patientRecord.createPatient('iphone', 0, {from: seller}).should.be.rejected;
    })

    it('lists patient', async () => {
      
      const patient = await patientRecord.patients(patientCount)
      assert.equal(patient.id.toNumber(), patientCount.toNumber(), 'id is correct');
      assert.equal(patient.name, 'iphone', 'name is correct')
      assert.equal(patient.price, '1000000000000000000', 'price is correct')
      assert.equal(patient.owner, seller, 'owner is correct')
      assert.equal(patient.purchased, false, 'purchased is correct')
    })

    it('sells patient', async () => {
      //track seller balance before purchase
      let oldSellerBalance;
      oldSellerBalance = await web3.eth.getBalance(seller);
      oldSellerBalance = new web3.utils.BN(oldSellerBalance); //big number


      result = await patientRecord.purchasePatient(patientCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') });
      const event = result.logs[0].args;
      assert.equal(event.id.toNumber(), patientCount.toNumber(), 'id is correct');
      assert.equal(event.name, 'iphone', 'name is correct')
      assert.equal(event.price, '1000000000000000000', 'price is correct')
      assert.equal(event.owner, buyer, 'owner is correct')
      assert.equal(event.purchased, true, 'purchased is correct')

      let newSellerBalance;
      newSellerBalance = await web3.eth.getBalance(seller);
      newSellerBalance = new web3.utils.BN(newSellerBalance);

      let price;
      price = web3.utils.toWei('1', 'Ether')
      price = new web3.utils.BN(price)

      console.log(oldSellerBalance, newSellerBalance, price);  

      const exepectedBalance = oldSellerBalance.add(price)
      assert.equal(newSellerBalance.toString(), exepectedBalance.toString())

      await patientRecord.purchasePatient(99, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      await patientRecord.purchasePatient(patientCount, { from: buyer, value: web3.utils.toWei('0.5', 'Ether') }).should.be.rejected;
      //patient cannot be purchased twice
      await patientRecord.purchasePatient(patientCount, { from: deployer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
      //buyer tries to buy again 
      await patientRecord.purchasePatient(patientCount, { from: buyer, value: web3.utils.toWei('1', 'Ether') }).should.be.rejected;
    })

  })

})