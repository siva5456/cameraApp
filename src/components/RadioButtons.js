import React, { useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Platform,
    StatusBar,
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';


export default function RadioButtons() {
    const [value, setValue] = useState({ label: 'male', value: 'male',  });
    var item = [
        { label: 'male', value: 'male',disabled: false  },
        { label: 'female', value: 'female',disabled: false },
        { label: 'custom', value: 'custom',disabled: true},
        { label: 'others', value: 'others',disabled: false },

    ];
    console.log(value)
   

    return (
        <SafeAreaView style={styles.container} >
            <RadioForm
                radio_props={item}
                initial={value.value}
                buttonColor={'black'}
                labelColor={'black'}
                selectedButtonColor='pink'
                selectedLabelColor='pink'
                animation={true}
                buttonSize={20}
                buttonOuterSize={30}
                onPress={(value) =>setValue(value)}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor: 'aliceblue',
    },
});
