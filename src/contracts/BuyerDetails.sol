pragma solidity ^0.5.0;

contract BuyerDetails {
  string public name;
  uint public buyerCount = 0;
  mapping(uint => Buyer) public buyers;

  struct Buyer {
    uint id;
    string name;
    string tel;
    string email;
    uint idCourse;
    address payable owner;
  }

  event BuyerCreated(
    uint id,
    string name,
    string tel,
    string email,
    uint idCourse,
    address payable owner
  );

  event BuyerPurchased(
    uint id,
    string name,
    string tel,
    string email,
    uint idCourse,
    address payable owner
  );

  constructor() public {
    name = "BuyerRecord";
  }

  function createBuyer(
    string memory _name,
    string memory _tel,
    string memory _email,
    uint _idCourse) public {

    require(bytes(_name).length > 0);
    require(bytes(_tel).length > 0);
    require(bytes(_email).length > 0);
    require(_idCourse > 0);

    buyerCount++;
    buyers[buyerCount] = Buyer(
      buyerCount,
      _name,
      _tel,
      _email,
      _idCourse,
      msg.sender);
    emit BuyerCreated(
      buyerCount,
      _name,
      _tel,
      _email,
      _idCourse,
      msg.sender);
  }

  function findBuyer(uint _idCourse) public view returns (string memory, string memory, string memory, address) {    
    Buyer memory _buyers;
    for(uint256 i =0; i< buyerCount; i++){
      if(buyers[i].idCourse == _idCourse) {
        _buyers = buyers[i];
      }
    }
    return (_buyers.name, _buyers.tel, _buyers.email, _buyers.owner);
  }

}