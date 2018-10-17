var Proofit = artifacts.require("./Proofit.sol")

//test suite
contract('Proofit', function(accounts) {
  var proofitInstance;
  var employer = accounts[1];
  var employee = accounts[2];
  var jobTitle = "Novel Proofread";
  var jobDescription = "My novel Dracula about vampire wizards needs a proofread.";
  var jobCost = round(wordCount/wordPrice);
  var jobType = "Proofread";
  var wordCount = 4323;
  var wordPrice = .03;
  var employerData = "6892bb8b3f3d8d03c452391b945a85a0b85bc59f54ace2010";
  var employeeData = "6892bb8b3f3d8d03c452391b945a85a0b85bc59f54ace2332";
  var employeeRating = 9;
  var employerRating = 10;
  var employeeReviewComments = "Fast turnaround, clear on requirements, pleasure doing business!";
  var employerReviewComments = "Really awesome work but found a few spots missed.";
  var blockTime = 5493024;
  var disputeStatus = false;

  it ("should be initilized with empty values", function() {
    return Proofit.deployed().then(function(instance) {
      return instance.getJob();
    }).then(function(data){
      assert.equal(data[0], 0x0, "Employer must be empty.");
      assert.equal(data[1], 0x0, "Employee must be empty.");
      assert.equal(data[2], "", "Title must be empty.");
      assert.equal(data[3], "", "Description must be empty.");
      assert.equal(data[4].toNumber(),0, "Job cost must equal 0.");
      assert.equal(data[5], "", "Job type should be empty.");
      assert.equal(data[6].toNumber(),0, "Word count should be 0.");
      assert.equal(data[7].toNumber(),0, "Word price should be 0.");
      assert.equal(data[8], "", "Employer Swarm hash should be empty.");
      assert.equal(data[9], "", "Employee Swarm hash should be empty.");
      assert.equal(data[10].toNumber(),0, "Employee Rating should be 0.");
      assert.equal(data[11].toNumber(),0, "Employer Rating should be 0.");
      assert.equal(data[12], "", "Employee Review Comments should be empty.");
      assert.equal(data[13], "", "Employer Review Comments should be empty.");
      assert.equal(data[14].toNumber(),0, "Block time should equal 0.");
      assert.equal(data[15], false, "Dispute status should be false.");
      }
    })
  });

  it("should post a job", function() {
    return Proofit.deployed().then(function(instance) {
      proofitInstance = instance;
      return proofitInstance.setJob(workTitle, workDescription, web3.toWei(bountyPrice, "ether"), {from: client})
    }).then(function() {
      return proofitInstance.getJob();
    }).then(function(data) {
      assert.equal(data[0], employer, "Employer must be " + employer);
      assert.equal(data[1], employee, "Employee must be " + employee);
      assert.equal(data[2], jobTitle, "Job title must be" + jobTitle);
      assert.equal(data[3], jobDescription, "Description must be " + jobDescription);
      assert.equal(data[4].toNumber(), jobCost, "Job cost must equal " + jobCost);
      assert.equal(data[5], jobType, "Job type should be " + jobType);
      assert.equal(data[6].toNumber(),wordCount, "Word count should be " + wordCount);
      assert.equal(data[7].toNumber(),wordPrice, "Word price should be " + wordPrice);
      assert.equal(data[8], employerData, "Employer Swarm hash should be " + employerData);
      assert.equal(data[9], employeeData, "Employee Swarm hash should be " + employeeData);
      assert.equal(data[10].toNumber(),employeeRating, "Employee Rating should be " + employeeRating);
      assert.equal(data[11].toNumber(),employerRating, "Employer Rating should be " + employerRating);
      assert.equal(data[12], employeeReviewComments, "Employee Review Comments should be " + employeeReviewComments);
      assert.equal(data[13], employerReviewComments, "Employer Review Comments should be " + employerReviewComments);
      assert.equal(data[14].toNumber(),blockTime, "Block time should equal " + blockTime);
      assert.equal(data[15], disputeStatus, "Dispute status should be " + disputeStatus);
    });
  });
});
