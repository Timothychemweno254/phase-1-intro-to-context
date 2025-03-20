// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }

  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }

  function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  
    return employee;
  }

  function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
  
    return employee;
  }

  function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find(event => event.date === date).hour;
    let timeOut = employee.timeOutEvents.find(event => event.date === date).hour;
  
    return (timeOut - timeIn) / 100;
  }

  function wagesEarnedOnDate(employee, date) {
    let hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }

  function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(event => event.date);
    return datesWorked.reduce((totalWages, date) => {
      return totalWages + wagesEarnedOnDate(employee, date);
    }, 0);
  }

  function calculatePayroll(employees) {
    return employees.reduce((totalPayroll, employee) => {
      return totalPayroll + allWagesFor(employee);
    }, 0);
  }