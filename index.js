/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

function createEmployeeRecord(firstName, familyName, title, payPerHour) {
    return {

        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(arr => createEmployeeRecord(...arr))
}

function createTimeInEvent(employeeRecord, dateTime) {
    if (!dateTime ) return;
    const [date, hour] = dateTime.split(' ')
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateTime) {
    if (!dateTime ) return;
    const [date, hour] = dateTime.split(' ')
    if (!dateTime) return
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvents = employeeRecord.timeInEvents.find(e => e.date === date);
    const timeOutEvents = employeeRecord.timeOutEvents.find(e => e.date === date);
    if (!timeInEvents || !timeOutEvents ) return 0;
    const hoursWorked = (timeOutEvents[0].hour - timeInEvents[0].hour) / 100;
    return hoursWorked;
}


function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    const wagesEarned = hoursWorked * employeeRecord.payPerHour
    return wagesEarned
}



const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(e => e.firstName === firstName)
}

function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((acc, employee) => acc + allWagesFor.call(employee), 12480)

}



