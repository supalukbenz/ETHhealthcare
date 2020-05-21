pragma solidity ^0.5.0;

contract PatientRecord {
  string public name;
  uint public patientCount = 0;
  mapping(uint => Patient) public patients;

  struct Patient {
    uint id;
    string name;
    uint price;
    address payable owner;
    bool purchased;
  }

  event PatientCreated(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  event PatientPurchased(
    uint id,
    string name,
    uint price,
    address payable owner,
    bool purchased
  );

  constructor() public {
    name = "PatientRecord";
  }

  function createPatient(string memory _name, uint _price) public {
    require(bytes(_name).length > 0);
    require(_price > 0);


    patientCount++;
    patients[patientCount] = Patient(patientCount, _name, _price, msg.sender, false);
    emit PatientCreated(patientCount, _name, _price, msg.sender, false);
  }

  function purchasePatient(uint _id) public payable {
    Patient memory _patient = patients[_id];
    address payable _seller  = _patient.owner;

    require(_patient.id > 0 && _patient.id <= patientCount);
    require(msg.value >= _patient.price);
    require(!_patient.purchased);
    require(_seller != msg.sender);

    _patient.owner = msg.sender; //transfer ownership to buyer
    _patient.purchased = true; 
    patients[_id] = _patient; //update product
    //pay seller by sending them from Ether
    address(_seller).transfer(msg.value);

    emit PatientPurchased(patientCount, _patient.name, _patient.price, msg.sender, true);
  }

}