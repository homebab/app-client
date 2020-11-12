import React, {useState} from 'react';
import {View, Button, Platform} from 'react-native';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

const DatePicker = () => {
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: Event, selectedDate?: Date) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    return (
        <View>
            <View>
                <Button onPress={showDatepicker} title="Show date picker!" />
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={"date"}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}

        </View>
    );
};

export default DatePicker;