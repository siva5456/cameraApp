import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";

function TimeCounter({ Mycolor, val }) {
    const [time, setTime] = useState({ min: 0, sec: 0 });
    const { min, sec } = time;

    let secRef = useRef(val);
    let minRef = useRef(0);

    useEffect(() => {
        let Interval;
        Interval = setInterval(() => {
            if (secRef.current === 59) {
                minRef.current++;
                secRef.current = 0;
            } else {
                secRef.current++;
            }
            setTime({ min: minRef.current, sec: secRef.current });
        }, 1000);

        return () => {
            clearInterval(Interval);
        };
    }, [secRef]);

    return (
        <View
            style={{
                height: 30,
                alignItems: "center",
                // justifyContent: "center",
                backgroundColor: "transparent",
                marginBottom: 2,
                flexDirection: "row",
            }}
        >
            <View
                style={{
                    height: 5,
                    width: 5,
                    backgroundColor: "red",
                    borderRadius: 50,
                    marginRight: 6,
                }}
            ></View>
            <Text style={{ color: Mycolor }}>
                {min < 10 ? `0${min}` : `${min}`}:{sec < 10 ? `0${sec}` : `${sec}`}
            </Text>
        </View>
    );
}

export default TimeCounter;
