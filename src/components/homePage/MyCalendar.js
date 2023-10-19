import * as React from 'react';
import * as RN from 'react-native';
import data from './agenda.json';

class MyCalendar extends React.Component {
  months = [
    'Janvier',
    'Fevrier',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'AoÃ»t',
    'Septembre',
    'Octobre',
    'Novembre',
    'Decembre'
  ];
  weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven  ', 'Sam', 'Dim'];
  nDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  event = [19, 3, 22, 23, 24];

  today = new Date();

  ////////////////////////////////////////////////////////
  generateMatrix() {
    var matrix = [];
    // The following code creates the header
    matrix[0] = this.weekDays;

    var year = this.state.activeDate.getFullYear();
    var month = this.state.activeDate.getMonth();
    var firstDay = new Date(year, month, 0).getDay();

    var maxDays = this.nDays[month];
    if (month == 1) {
      // February
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        maxDays += 1;
      }
    }
    var counter = 1;
    for (var row = 1; row < 7; row++) {
      matrix[row] = [];
      for (var col = 0; col < 7; col++) {
        matrix[row][col] = -1;
        if (row == 1 && col >= firstDay) {
          // Fill in rows only after the first day of the month
          matrix[row][col] = counter++;
        } else if (row > 1 && counter <= maxDays) {
          // Fill in rows only if the counter's not greater than
          // the number of days in the month
          matrix[row][col] = counter++;
        }
      }
    }
    return matrix;
  }

  ////////////////////////////////////////////////////////
  state = {
    activeDate: this.props.date.date
  };

  _onPress = (item) => {
    this.setState(() => {
      if (!item.match && item != -1) {
        this.state.activeDate.setDate(item);
        this.props.open(false);
        this.props.onChange(this.state.activeDate.toISOString());
        return this.state;
      }
    });
  };
  changeMonth = (n) => {
    if (n == 0) {
      this.setState(() => {
        this.state.activeDate.setMonth(this.today.getMonth());
        return this.state;
      });
    }
    this.setState(() => {
      this.state.activeDate.setMonth(this.state.activeDate.getMonth() + n);
      return this.state;
    });
  };

  render() {
    var matrix = this.generateMatrix();
    var rows = [];
    rows = matrix.map((row, rowIndex) => {
      var rowItems = row.map((item, colIndex) => {
        console.log(this.event.includes(item));
        return (
          <RN.View
            style={{
              flex: 1,
              height: 50,
              textAlign: 'center',
              paddingTop: 15,
              backgroundColor:
                item == this.state.activeDate.getDate() &&
                this.state.activeDate.getMonth() == this.today.getMonth()
                  ? '#7FCB2B'
                  : 'black',
              borderRadius: item == this.state.activeDate.getDate() ? 10 : 0
              // (this.event.includes(item) ? 'red' : 'blue')
              // #7FCB2B
            }}
          >
            <RN.Text
              style={{
                textAlign: 'center',
                color: item == this.state.activeDate.getDate() ? 'white' : 'white',
                fontWeight: item == this.state.activeDate.getDate() ? 'bold' : '500'
              }}
              onPress={() => this._onPress(item)}
            >
              {item != -1 ? item : ''}
            </RN.Text>
            <RN.View
              style={{
                display: 'flex',
                marginTop: 5,
                justifyContent: 'center',
                alignContent: 'center',
                textAlign: 'center',
                alignItems: 'center'
              }}
            >
              <RN.View
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: 10,
                  backgroundColor:
                    this.state.activeDate.getMonth() == this.today.getMonth() &&
                    this.event.includes(item)
                      ? 'white'
                      : 'black',
                  display:
                    item == this.state.activeDate.getDate() && !this.event.includes(item)
                      ? 'none'
                      : 'flex'
                }}
              ></RN.View>
            </RN.View>
          </RN.View>
        );
      });
      return (
        <RN.View
          style={{
            flex: 1,
            flexDirection: 'row',
            padding: 25,
            justifyContent: 'space-around',
            alignItems: 'center'
          }}
        >
          {rowItems}
        </RN.View>
      );
    });
    return (
      <RN.View>
        <RN.Text
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            marginBottom: 20
          }}
        >
          {this.months[this.state.activeDate.getMonth()]} &nbsp;
          {this.state.activeDate.getFullYear()}
        </RN.Text>
        {rows}
        <RN.View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            justifyContent: 'space-between',
            width: 60 + '%',
            alignSelf: 'center'
          }}
        >
          <RN.Button color="#7FCB2B" title="<" onPress={() => this.changeMonth(-1)} />
          <RN.Button color="#7FCB2B" title="Today" onPress={() => this.changeMonth(0)} />
          <RN.Button color="#7FCB2B" title=">" onPress={() => this.changeMonth(+1)} />
        </RN.View>
      </RN.View>
    );
  }
}

export default MyCalendar;
