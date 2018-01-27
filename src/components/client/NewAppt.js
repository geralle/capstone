import React, { Component } from 'react';

class NewAppt extends Component {
  render() {
    return (
      <div className="new-appointment col">
        <form class="container" method="post" action="http://localhost:8000/api/appointment/create">
          <h3>Create Appointment</h3>
          <input type="hidden" name="user_id" value="3"></input>
          <input type="hidden" name="f_name" value="adam"></input>
          <div class="appt-select-container">
            <div class="appt-select">
              <div class="form-group">
                <select class="form-control" name="month">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="form-group">
                <input class="form-control" type="number" min="1" max="31" name="day" value="1"></input>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" name="year" value="2018"></input>
              </div>
              <div class="form-group">
                <select class="form-control" name="hour">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div class="form-group">
                <h4>:</h4>
              </div>
              <div class="form-group">
                <select class="form-control" name="minute">
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div class="form-group">
                <select class="form-control" name="ampm">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div class="appt-select">
              <div class="form-group">
                <select class="form-control" name="month">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="form-group">
                <input class="form-control" type="number" min="1" max="31" name="day" value="1"></input>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" name="year" value="2018"></input>
              </div>
              <div class="form-group">
                <select class="form-control" name="hour">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div class="form-group">
                <h4>:</h4>
              </div>
              <div class="form-group">
                <select class="form-control" name="minute">
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div class="form-group">
                <select class="form-control" name="ampm">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
            <div class="appt-select">
              <div class="form-group">
                <select class="form-control" name="month">
                  <option value="1">January</option>
                  <option value="2">February</option>
                  <option value="3">March</option>
                  <option value="4">April</option>
                  <option value="5">May</option>
                  <option value="6">June</option>
                  <option value="7">July</option>
                  <option value="8">August</option>
                  <option value="9">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </select>
              </div>
              <div class="form-group">
                <input class="form-control" type="number" min="1" max="31" name="day" value="1"></input>
              </div>
              <div class="form-group">
                <input class="form-control" type="text" name="year" value="2018"></input>
              </div>
              <div class="form-group">
                <select class="form-control" name="hour">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                </select>
              </div>
              <div class="form-group">
                <h4>:</h4>
              </div>
              <div class="form-group">
                <select class="form-control" name="minute">
                  <option>00</option>
                  <option>30</option>
                </select>
              </div>
              <div class="form-group">
                <select class="form-control" name="ampm">
                  <option>AM</option>
                  <option>PM</option>
                </select>
              </div>
            </div>
          </div>
          <div class="form-group">
            <textarea class="form-control" name="description" placeholder="Description" rows="3"></textarea>
          </div>
          <button type="submit" class="btn btn-info">Login</button>
        </form>
      </div>
    );
  }
}

export default NewAppt;
