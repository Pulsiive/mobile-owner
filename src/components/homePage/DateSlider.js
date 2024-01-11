import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Pressable,
  ImageBackground,
  Platform,
  TouchableOpacity
} from 'react-native';
import { addDays, getDate, startOfWeek, format, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import MyCalendar from './MyCalendar';
import FetchInfo from './FetchInfo';
import arrow from './Asset/arrow.png';

const DateSlider = ({ date, onChange, data, openDate, setSlot, slot }) => {
  const [week, setWeek] = useState([]);
  const [open, setOpen] = useState(false);

  const changeParentProps = (newPropValue) => {
    onChange(newPropValue);
  };

  useEffect(() => {
    let weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);

  useEffect(() => {
    try {
      if (data[date]) {
        console.log('still there');
      }
    } catch (e) {
      alert(e);
    }
  }, [data[date]]);

  return (
    <>
      <View style={styles.container}>
        {week.map((weekDay) => {
          const touchable = [styles.touchable];
          const weekDayText = [styles.weekDayText];
          const indication = [{ backgroundColor: 'black' }];
          const label = [styles.label];
          const sameDay = isSameDay(weekDay.date, date);
          const selectedDay = new Date(weekDay.date).toLocaleDateString().split(' ')[0];
          const eventDay = openDate.includes(selectedDay);
          if (sameDay) {
            touchable.push({ backgroundColor: '#7FCB2B' });
            weekDayText.push({ color: 'white' });
            label.push({ color: 'white' });
            indication.push({ backgroundColor: '#7FCB2B' });
          }
          if (eventDay) {
            indication.push({ backgroundColor: 'white' });
          }
          return (
            <View style={styles.weekDayItem} key={weekDay.formatted}>
              <TouchableOpacity
                activeOpacity={sameDay ? 1 : 0.7}
                onPress={() => {
                  !sameDay && onChange(weekDay.date);
                }}
                style={touchable}
              >
                <Text style={[{ color: 'white' }, ...label]}>{weekDay.day}</Text>
              </TouchableOpacity>
              <Text style={[{ color: 'white' }, ...weekDayText]}>
                {weekDay.formatted.slice(0, -1)}
              </Text>
              <View
                style={[
                  {
                    position: 'absolute',
                    bottom: 5,
                    height: 5,
                    width: 5,
                    borderRadius: 100
                  },
                  ...indication
                ]}
              ></View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          position: 'absolute',
          top: Platform.OS === 'android' ? 35 + '%' : 30 + '%',
          left: 2 + '%'
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50
          }}
          onPress={() => setOpen(!open)}
        >
          <ImageBackground
            source={arrow}
            style={{
              transform: open ? [{ rotate: '-90deg' }] : [{ rotate: '90deg' }],
              width: 12,
              height: 21
            }}
          ></ImageBackground>
        </TouchableOpacity>
      </View>

      {open && (
        <View style={{ marginTop: 20, top: 50, height: 350 }}>
          <View
            style={{
              backgroundColor: 'grey',
              height: 1,
              width: '90%',
              left: '5%',
              marginBottom: 15
            }}
          ></View>
          <MyCalendar
            onUpdate={changeParentProps}
            event={openDate}
            date={{ date }}
            open={() => setOpen(open)}
            data={data}
          />
          <View
            style={{
              backgroundColor: 'grey',
              height: 1,
              width: '90%',
              left: '5%',
              marginBottom: 15
            }}
          ></View>
        </View>
      )}

      <View style={{ top: 10 + '%' }}>
        <View>
          <Text style={{ color: 'white', fontWeight: '700', left: 4 + '%' }}>
            Créneaux disponible:
          </Text>
        </View>
      </View>
      {openDate.includes(date.toLocaleDateString().split(' ')[0]) ? (
        <View style={styles.safe}>
          <FetchInfo
            date={date.toLocaleDateString().split(' ')[0]}
            data={data}
            setSlot={setSlot}
            openDate={openDate}
          />
        </View>
      ) : (
        <View
          style={{
            top: 100,
            height: '40%',
            width: '93%',
            left: '5%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text style={{ color: 'white', fontWeight: '600' }}>
            Pas de créneaux disponibles aujourd'hui !
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    left: '3%',
    marginTop: '10%'
  },
  container: {
    transform: [{ scale: 0.95 }],
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 200
  },
  weekDayText: {
    position: 'absolute',
    color: 'white',
    marginTop: 40,
    fontWeight: '600',
    textTransform: 'capitalize'
  },
  touchable: {
    borderRadius: 10,
    paddingTop: 9,
    height: 70,
    width: 50
  },
  selectedTouchable: {
    backgroundColor: '#7FCB2B'
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
    color: 'white'
  },
  selectedLabel: {
    fontWeight: '600'
  },
  weekDayItem: {
    alignItems: 'center'
  }
});

const getWeekDays = (date) => {
  const start = startOfWeek(date, { weekStartsOn: 1 });
  const final = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    final.push({
      formatted: format(date, 'EEE', { locale: fr }),
      date,
      day: getDate(date)
    });
  }
  return final;
};

export default DateSlider;
