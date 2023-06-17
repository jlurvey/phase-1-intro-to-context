// Your code here
function createEmployeeRecord(array) {
    return  {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
};
function createEmployeeRecords(array) {
    const employeeRecordsObjectArray = []
    for (let i = 0; i < array.length; i++) {
        employeeRecordsObjectArray.push(createEmployeeRecord(array[i]));
    };
    return employeeRecordsObjectArray;
};

function createTimeInEvent(object, dateStamp) {
    const timeInEventObject = {
        type: "TimeIn",
        hour: dateStamp.substr(-4) * 1,
        date: dateStamp.substr(0, 10),
    };
    object.timeInEvents.push(timeInEventObject);
    return object;
};

function createTimeOutEvent(object, dateStamp) {
    const timeOutEventObject = {
        type: "TimeOut",
        hour: dateStamp.substr(-4) * 1,
        date: dateStamp.substr(0, 10),
    };
    object.timeOutEvents.push(timeOutEventObject);
    return object;
};

function hoursWorkedOnDate(object, date) {
    let timeInHour = 0;
    let timeOutHour = 0;
    for (let i = 0; i < object.timeInEvents.length; i++) {
        if (object.timeInEvents[i].date === date) {
            timeInHour = object.timeInEvents[i].hour;
        };
    };
    for (let i = 0; i < object.timeOutEvents.length; i++) {
        if (object.timeOutEvents[i].date === date) {
            timeOutHour = object.timeOutEvents[i].hour;
        };
    };
    return (timeOutHour - timeInHour) * .01;
};

function wagesEarnedOnDate(object, date) {
    return object.payPerHour * hoursWorkedOnDate(object, date);
};

function allWagesFor(object) {
    let totalWages = 0;
    const timeInDates = object.timeInEvents.map((event) => event.date);

    for (let i = 0; i < timeInDates.length; i++) {
        totalWages += wagesEarnedOnDate(object, timeInDates[i])
    };
    return totalWages;
};

function calculatePayroll(array) {
    let payroll = 0;
    for (let i = 0; i < array.length; i++) {
        payroll += allWagesFor(array[i]);
    };
    return payroll
};
