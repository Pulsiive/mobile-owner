import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Pressable,
  ImageBackground
} from 'react-native';
import { addDays, getDate, startOfWeek, format, isSameDay } from 'date-fns';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale';
import MyCalendar from './MyCalendar';
import FetchInfo from './FetchInfo';
import arrow from './Asset/arrow.png';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};

const DateSlider: React.FC<Props> = ({ date, onChange }) => {
  const [date1, setDate] = useState(new Date());
  const [week, setWeek] = useState<WeekDay[]>([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    var weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);
  useEffect(() => {
    console.log(date1);
    const iso = new Date(date1);
    var weekDays = getWeekDays(iso);
    setWeek(weekDays);
  }, [date1]);

  return (
    <>
      <View style={styles.container}>
        {week.map((weekDay) => {
          const textStyles = [styles.label];
          const touchable = [styles.touchable];
          const sameDay = isSameDay(weekDay.date, date);
          if (sameDay) {
            touchable.push(styles.selectedTouchable);
            textStyles.push(styles.selectedLabel);
          }
          return (
            <View style={styles.weekDayItem} key={weekDay.formatted}>
              <Pressable onPress={() => onChange(weekDay.date)} style={touchable}>
                <Text style={styles.label}>{weekDay.day}</Text>
              </Pressable>
              <Text style={styles.weekDayText}>{weekDay.formatted.slice(0, -1)}</Text>
            </View>
          );
        })}
      </View>
      <TouchableHighlight
        style={{
          position: 'absolute',
          top: 35 + '%',
          left: 2 + '%',
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
      </TouchableHighlight>
      {/* <Pressable onPress={() => setOpen(!open)}>
        <View
          style={{
            position: 'absolute',
            width: 25,
            height: 25,
            backgroundColor: 'white',
            top: 32 + '%',
            left: 5 + '%'
          }}
        />
      </Pressable> */}
      {open && (
        <View style={{ marginTop: 10 + '%' }}>
          <MyCalendar
            date={{ date }}
            onChange={(date) => setDate(date)}
            open={(open) => setOpen(open)}
          />
        </View>
      )}
      <View style={{ top: 7 + '%' }}>
        <View>
          <Text style={{ color: 'white', fontWeight: '700', left: 4 + '%', marginTop: 0 + '%' }}>
            Vos dernières locations
          </Text>
        </View>
        <View>
          <Text style={{ color: 'white', fontWeight: '700', left: 4 + '%', marginTop: 0 + '%' }}>
            {date.toISOString()}
          </Text>
        </View>

        <View style={styles.safe}>
          <FetchInfo date={date.toISOString().split('T')[0]} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  safe: {
    left: 3 + '%',
    marginTop: 10 + '%'
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

type WeekDay = {
  formatted: string;
  date: Date;
  day: number;
};

export const getWeekDays = (date: Date): WeekDay[] => {
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
