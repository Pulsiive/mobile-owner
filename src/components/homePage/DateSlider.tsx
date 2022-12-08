import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { addDays, getDate, startOfWeek, format, isSameDay } from 'date-fns';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { fr } from 'date-fns/locale';

type Props = {
  date: Date;
  onChange: (value: Date) => void;
};

const DateSlider: React.FC<Props> = ({ date, onChange }) => {
  const [week, setWeek] = useState<WeekDay[]>([]);
  useEffect(() => {
    const weekDays = getWeekDays(date);
    setWeek(weekDays);
  }, [date]);
  return (
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
            <TouchableOpacity onPress={() => onChange(weekDay.date)} style={touchable}>
              <Text style={styles.label}>{weekDay.day}</Text>
            </TouchableOpacity>
            <Text style={styles.weekDayText}>{weekDay.formatted.slice(0, -1)}</Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
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
