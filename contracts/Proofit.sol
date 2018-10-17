pragma solidity^0.4.18;

contract Proofit {
  // wallet address variables
  address employee;
  address employer;

  //word count/price needed to calculate jobCost
  string wordCount;
  uint wordPrice;

  //swarm hash variables for storing docuemnts
  string employerData;
  string employeeData;

  //review variables
  uint employeeRating;
  uint employerRating;
  string employeeReviewComments;
  string employerReviewComments;

  //block number for next timing event
  uint blockTime;

  //dispute condition
  bool disputeStatus;

  //job variables
  string jobType;
  string jobDescription;
  string jobTitle;
  uint jobCost;

  //escrow contract address
  address jobEscrow;


  //set a job
  function postJob(string _title, string _description, uint _jobCost) public {
    employer = msg.sender;
    jobTitle = _jobTitle;
    jobDescription = _jobDescription;
    jobCost = _jobCost;
  }

  //get job information
  function getJob() public view returns (
    address _employer,
    address _employee,
    string _jobTitle,
    string _jobDescription,
    uint _jobCost,
    bool _disputeStatus,
    uint _employeeRating,
    uint _employerRating,
    string _employeeReviewComments,
    string _employerReviewComments,
    string _wordCount,
    uint _wordPrice,
    uint _blockTime,
    bool _disputeStatus,
    address _jobEscrow
    ) {
      return (
        employer,
        jobTitle,
        jobDescription,
        jobCost,
        disputeStatus,
        employeeRating,
        employerRating,
        employeeReviewComments,
        employerReviewComments,
        wordCount,
        wordPrice,
        blockTime,
        disputeStatus,
        jobEscrow
        );
  }

  //get client data
  function getEmployee() public view returns (
    address _employee) {
      return (employee);
  }

  //get editor data
  function getEmployer() public view returns (
    address _employer) {
       return (employer);
    }

  //scheduler using ethereum alarm service
  function countdownTimer(blockTime) public {
    address constant Scheduler = SchedulerAPI(0xe109ecb193841af9da3110c80fdd365d1c23be2a);
    Scheduler.value(2 ether).scheduleCall(
      address(this),
      bytes4(sha3("callback()")),
    block.number + blockTime);
  }

}
