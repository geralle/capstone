import React, { Component } from 'react'
import Collapsible from 'react-collapsible';

class Calendar extends Component {
  constructor(){
    super()
    this.state = {
      month: 0,
      monthName: '',
      year: 0,
      monthObj: {},
      approvedAppts: []
    }
  }

  async componentDidMount(){
    var currentDate = new Date()
    var month = currentDate.getMonth() +1
    var year = currentDate.getFullYear()
    await this.getUsersAppts()
    this.daysInMonth(month, year)
  }

  async getUsersAppts(){
    var url = 'https://capstone-be.herokuapp.com/api/appts/all'
    var response = await fetch(url)
    var userAppts = await response.json()
    var approvedAppts = {}
    var counter = 0
    for(var appt in userAppts){
      if(userAppts[appt].approved){
        approvedAppts[counter] = userAppts[appt]
        counter++
      }
    }
    this.setState({approvedAppts: approvedAppts})
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
    this.setState({
      month: month,
      year: year,
      monthObj: selectedMonth,
      monthName: monthName
    })
    this.createMonthCalendar(month,selectedMonth)
  }

  createMonthCalendar(newMonth,selectedMonth){
    var calendarMonth = document.getElementsByClassName('calendar-month')[0]
    var selectedMonthLength = Object.keys(selectedMonth).length
    var rowCounter = 1
    var calendarRow = document.createElement('tr')
    calendarRow.setAttribute('className', 'row-'+rowCounter)
    calendarMonth.append(calendarRow)
    var fillerDayLength = selectedMonth[1].numDay
    for(var filler=0;filler<fillerDayLength;filler++){
      var calendarDay = document.createElement('td')
      calendarDay.setAttribute('className','date-num day-'+filler)
      calendarRow.append(calendarDay)
    }
    var dayCounter = fillerDayLength
    var reset = false
    for(var i=1;i<=selectedMonthLength;i++){
      var month = '' + newMonth
      var day = '' + selectedMonth[i].date
      if(month.length<2){
        month = '0'+month
      }
      if(day.length<2){
        day = '0'+day
      }
      var dayClass = selectedMonth[i].year + '-' + month + '-' + day
      if(dayCounter<=7){
        if(reset===true){
          calendarRow = document.createElement('tr')
          var collapsible = document.createElement('Collapsible')
          collapsible.setAttribute('trigger', 'more')
          var eventContainer = document.createElement('ul')
          var event = document.createElement('li')
          calendarRow.setAttribute('className', 'row-'+rowCounter)
          calendarMonth.append(calendarRow)
          reset=false
        }
        var calendarDay = document.createElement('td')
        calendarDay.setAttribute('className','date-day-container '+dayClass)
        var calendarDate = document.createElement('div')
        calendarDate.setAttribute('className', 'date-num')
        calendarDate.innerText = i
        var appt = this.state.approvedAppts
        calendarRow.append(calendarDay)
        calendarDay.append(calendarDate)
        for(var x in appt){
          var appMonth = '' + appt[x].month
          var appDay = '' + appt[x].day
          var appHour = '' + appt[x].hour
          var appMinute = '' + appt[x].minute
          if(appHour.length<2){
            appHour = '0'+appHour
          }
          if(appMinute.length<2){
            appMinute = '0'+appMinute
          }
          if(appMonth.length<2){
            appMonth = '0'+appMonth
          }
          if(appDay.length<2){
            appDay = '0'+appDay
          }
          var approvedDate = appt[x].year + '-' + appMonth + '-' + appDay
          var apptTime = appHour + ':' + appMinute + appt[x].ampm
          if(dayClass===approvedDate){
            var eventContainer = document.createElement('ul')
            var event = document.createElement('li')
            calendarDay.append(eventContainer)
            event.innerText = apptTime
            event.setAttribute('className', 'approved-date')
            eventContainer.append(event)
          }
        }

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

  nextMonth(){
    var calendarMonth = document.getElementsByClassName('calendar-month')[0]
    var month = this.state.month
    var year = this.state.year

    month++
    if(month===13){
      month=1
      year++
    }
    calendarMonth.innerHTML = ''
    this.daysInMonth(month, year)
  }

  render() {
    return (
      <div className="calendar col">
        <div className="calendar-header">
          <button className="btn previous-month" onClick={()=>this.previousMonth()}>
            <i className="fa fa-angle-left"></i>
          </button>
          <div className="calendar-title">
            <h3>{this.state.monthName} {this.state.year}</h3>
          </div>
          <button className="btn next-month" onClick={()=>this.nextMonth()}>
            <i className="fa fa-angle-right"></i>
          </button>
        </div>

        <div>
          <table className="calendar-container">
            <thead>
              <tr>
                <th className="days">Sunday</th>
                <th className="days">Monday</th>
                <th className="days">Tuesday</th>
                <th className="days">Wednesday</th>
                <th className="days">Thursday</th>
                <th className="days">Friday</th>
                <th className="days">Saturday</th>
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
