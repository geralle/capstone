import React, { Component } from 'react';

class Calendar extends Component {
  constructor(){
    super()
    this.state = {
      month: '',
      year: '',
      monthObj: {}
    }
  }

  componentDidMount(){
    var currentDate = new Date()
    var month = currentDate.getMonth() +1
    var year = currentDate.getFullYear()
    var calendarContainer = document.getElementsByClassName('calendar-container')[0]
    var previousMonth = document.getElementsByClassName('previous-month')[0]
    var nextMonth = document.getElementsByClassName('next-month')[0]
    var calendarWeek = document.getElementsByClassName('.calendar-week')[0]
    this.daysInMonth(month, year)
  }

  monthInYear(month){
    var monthName = ''
    switch(month){
      case 1:
        monthName = 'January'
        break;
      case 2:
        monthName = 'February'
        break;
      case 3:
        monthName = 'March'
        break;
      case 4:
        monthName = 'April'
        break;
      case 5:
        monthName = 'May'
        break;
      case 6:
        monthName = 'June'
        break;
      case 7:
        monthName = 'July'
        break;
      case 8:
        monthName = 'August'
        break;
      case 9:
        monthName = 'September'
        break;
      case 10:
        monthName = 'October'
        break;
      case 11:
        monthName = 'November'
        break;
      case 12:
        monthName = 'December'
        break;
      default:
        break;
    }
    return monthName
  }

  dayInMonth(dateNum){
    var dateName = ''
    switch(dateNum){
      case 0:
        dateName = 'Sunday'
        break;
      case 1:
        dateName = 'Monday'
        break;
      case 2:
        dateName = 'Tuesday'
        break;
      case 3:
        dateName = 'Wednesday'
        break;
      case 4:
        dateName = 'Thursday'
        break;
      case 5:
        dateName = 'Friday'
        break;
      case 6:
        dateName = 'Saturday'
        break;
      default:
        break;
    }
    return dateName
  }

  daysInMonth(month, year) {
    var selectedMonth = {}
    var monthLength = new Date(year, month, 0).getDate();
    var monthName = this.monthInYear(month)
    for(var i=0;i<monthLength;i++){
      var dateOfMonth = i+1
      var fullDate = monthName + dateOfMonth + ',' + year
      var dayDate = new Date(fullDate)
      var dayNumOfWeek = dayDate.getDay()
      var dayOfWeek = this.dayInMonth(dayNumOfWeek)
      selectedMonth[dateOfMonth] = {
        date: i+1,
        numDay: dayNumOfWeek,
        day: dayOfWeek,
        month: monthName,
        year: year
      }
    }
    this.createMonthCalendar(selectedMonth)
    this.setState({
      month: monthName,
      year: year,
      monthObj: selectedMonth
    })
  }

  createMonthCalendar(selectedMonth){
    console.log(selectedMonth)
    var calendarMonth = document.getElementsByClassName('calendar-month')[0]
    var selectedMonthLength = Object.keys(selectedMonth).length
    var rowCounter=1
    var calendarRow = document.createElement('tr')
    calendarRow.setAttribute('className', 'row-'+rowCounter)
    calendarMonth.append(calendarRow)
    var fillerDayLength = selectedMonth[1].numDay
    for(var filler=0;filler<fillerDayLength;filler++){
      var calendarDay = document.createElement('td')
      calendarDay.setAttribute('className','day-'+filler)
      calendarRow.append(calendarDay)
    }
    var dayCounter = fillerDayLength
    var reset = false
    for(var i=1;i<=selectedMonthLength;i++){
      if(dayCounter<=7){
        if(reset===true){
          calendarRow = document.createElement('tr')
          calendarRow.setAttribute('className', 'row-'+rowCounter)
          calendarMonth.append(calendarRow)
          reset=false
        }
        var calendarDay = document.createElement('td')
        calendarDay.setAttribute('className','day-'+i)
        calendarDay.innerText=i
        calendarRow.append(calendarDay)
      }
      dayCounter++
      if(dayCounter===7){
        dayCounter=0
        rowCounter++
        reset=true
      }
    }
  }

  previousMonth(){
    var calendarMonth = document.getElementsByClassName('calendar-month')[0]
    var month = this.state.month
    var year = this.state.year
    month--
    if(month===0){
      month=12
      year--
    }
    calendarMonth.innerHTML = ''
    this.daysInMonth(month, year)
  }

  render() {
    return (
      <div className="calendar-container">
        <div className="calendar-title">
          <h3>Calendar</h3>
        </div>
        <div>
          <button className="btn previous-month" onClick={()=>this.previousMonth()}>
            <i className="fa fa-angle-left"></i>
          </button>
          <button className="btn next-month" >
            <i className="fa fa-angle-right"></i>
          </button>
          <button className="display-week" >Week</button>
          <button className="display-month"  >Month</button>
          <table className="calendar-container">
            <thead>
              <tr>
                <th>Sunday</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
                <th>Saturday</th>
              </tr>
            </thead>
            <tbody className="calendar-week"></tbody>
            <tbody className="calendar-month"></tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Calendar;
