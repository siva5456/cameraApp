import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FlatList, View, Text, Dimensions } from "react-native";

const { height, width } = Dimensions.get('window')

function ImageSlider() {
  const [data, setdata] = useState([1, 1, 1, 1, 1]);

  const [currentIndex, setCurrentIndex] = useState(0)

  console.log(currentIndex);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <View
        style={{
          // alignItems: "center",
          height: height / 2,
          justifyContent: "center",
        }}
      >
        <FlatList
          horizontal
          data={data}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          onScroll={e => {
            const x = e.nativeEvent.contentOffset.x;
            // console.log(e.nativeEvent.contentOffset.x+width)
            setCurrentIndex((x / width).toFixed(0))
          }
        }
          renderItem={({ item, index }) => {
            return (
              <View
                style={{
                  height: height / 2,
                  width: width,
                  // backgroundColor: "pink",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  disabled={true}
                  style={{
                    height: '90%',
                    width: '90%',
                    backgroundColor: "green",
                    borderRadius: 10,
                  }}
                ></TouchableOpacity>
              </View>
            );
          }}
        />

        <View
          style={{
            width: width,
            backgroundColor: "transparent",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {data.map((item, index) => {
            return (<View
              key={index}
              style={{
                height: 8,
                width: 8,
                backgroundColor: currentIndex == index ? 'green' : "grey",
                borderRadius: 4,
                margin: 2,
              }}
            >

            </View>)
          })}
        </View>
      </View>
    </View>
  );
}

export default ImageSlider;
