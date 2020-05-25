pragma solidity ^0.5.0;

contract CourseDetails {
  string public name;
  uint public courseCount = 0;
  mapping(uint => Course) public courses;

  struct Course {
    uint id;
    string courseName;
    address payable owner;
    string emailCustomer;
    string detail;
    string doctorName;
    string hospitalName;
    uint datetimeAppoint;
    uint price;
    bool purchased;
  }

  event CourseCreated(
    uint id,
    string courseName,
    address payable owner,
    string emailCustomer,
    string detail,
    string doctorName,
    string hospitalName,
    uint datetimeAppoint,
    uint price,
    bool purchased
  );

  event CoursePurchased(
    uint id,
    string courseName,
    address payable owner,
    string emailCustomer,
    string detail,
    string doctorName,
    string hospitalName,
    uint datetimeAppoint,
    uint price,
    bool purchased
  );

  constructor() public {
    name = "CourseDetils";
  }

  function createCourse(
    string memory _courseName,
    
    string memory _detail,
    string memory _doctorName,
    string memory _hospitalName,
    uint _datetimeAppoint,
    uint _price) public {

    require(bytes(_courseName).length > 0);
    
    require(bytes(_detail).length > 0);
    require(bytes(_doctorName).length > 0);
    require(bytes(_hospitalName).length > 0);

    require(_price > 0);

    courseCount++;
    courses[courseCount] = Course(
      courseCount,
      _courseName,
      msg.sender,
      "",
      _detail,
      _doctorName,
      _hospitalName,
      _datetimeAppoint,
      _price,
      false
      );
    emit CourseCreated(
      courseCount,
      _courseName,
      msg.sender,
      "",
      _detail,
      _doctorName,
      _hospitalName,
      _datetimeAppoint,
      _price,
      false
    );
  }

  function purchaseCourse(uint _id, string memory _emailCustomer) public payable {

    Course memory _course = courses[_id];
    address payable _seller  = _course.owner;

    require(_course.id > 0 && _course.id <= courseCount);
    require(msg.value >= _course.price);
    require(!_course.purchased);
    require(_seller != msg.sender);

    _course.emailCustomer =_emailCustomer;
    _course.owner = msg.sender; //transfer ownership to buyer
    _course.purchased = true; 
    courses[_id] = _course; //update product
    //pay seller by sending them from Ether
    address(_seller).transfer(msg.value);

    emit CoursePurchased(
      courseCount,
      _course.courseName,
      msg.sender,
      _course.emailCustomer,
      _course.detail,
      _course.doctorName,
      _course.hospitalName,
      _course.datetimeAppoint,
      _course.price,
      true);
  }
}