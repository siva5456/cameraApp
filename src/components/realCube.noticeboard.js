// import React, { useState, useEffect } from "react";
// import { View, StyleSheet, Text, FlatList, Dimensions } from "react-native";
// import { FONT_SIZES, FONT_FAMILY } from "../theme/Font-Colors";
// import { useSelector } from "react-redux";
// import Announcement_Notice_Board from "../../SvgComponents/Announcement_Notice_Board";

// let screenHeight = Math.round(Dimensions.get("window").height);
// let screenWidth = Math.trunc(Dimensions.get("window").width);

// function NotceBoard(props) {
//   const theme = useSelector((state) => state.app.theme);
//   const [colors, setColors] = useState(null);
//   const [fontSizes, setFontSizes] = useState(null);
//   const [fontFamily, setFontFamily] = useState(null);

//   const [data, setdata] = useState([1, 1, 1, 1]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     setColors(theme.colors);
//     setFontFamily(theme.fontFamily);
//     setFontSizes(theme.fontSizes);
//   }, [theme]);

//   console.log(FONT_SIZES);

//   //   console.log(colors);
//   //   console.log(fontFamily);
//   //   console.log(fontSizes);

//   const styles = StyleSheet.create({
//     notice_board: {
//       height: 115,
//       width: screenWidth - 20,
//       backgroundColor: props.backgroundColor,
//       borderRadius: 8,
//       paddingHorizontal: 15,
//       justifyContent: "center",
//     },
//     header: {
//       alignItems: "center",
//       justifyContent: "space-between",
//       flexDirection: "row",
//       borderBottomColor: "rgba(0, 0, 0, 0.13)",
//       borderBottomWidth: 0.5,
//       paddingBottom: 8,
//       marginBottom: 10,
//     },

//     heading_text: {
//       color: "#1A1A1A",
//       fontWeight: 500,
//       fontSize: FONT_SIZES.title,
//     },
//     content: {
//       alignItems: "center",
//       justifyContent: "space-between",
//       flexDirection: "row",
//       paddingBottom: 8,
//     },
//     content_wrapper: {
//       minHeight: 50,
//       flex: 0.9,
//       justifyContent: "center",
//       marginLeft: 20,
//     },
//     log_wrapper: {
//       minHeight: 50,
//       flex: 0.1,
//       justifyContent: "center",
//       alignItems: "center",
//     },
//   });

//   return (
//     <View style={{ flex: 1 }}>
//       <View
//         style={{
//           height: 139,
//           alignItems: "center",
//         }}
//       >
//         <FlatList
//           horizontal
//           data={data}
//           showsHorizontalScrollIndicator={false}
//           pagingEnabled
//           onScroll={(e) => {
//             const x = e.nativeEvent.contentOffset.x;
//             setCurrentIndex((x / screenWidth).toFixed(0));
//           }}
//           renderItem={({ item, index }) => {
//             return (
//               <View style={styles.notice_board}>
//                 <View style={styles.header}>
//                   <Text style={styles.heading_text}>Noice Board</Text>
//                   <Text
//                     style={{ color: "#4B4B4B", fontSize: FONT_SIZES.subTitle }}
//                   >
//                     View
//                   </Text>
//                 </View>
//                 <View style={styles.content}>
//                   <View style={styles.log_wrapper}>
//                     <Announcement_Notice_Board />
//                   </View>
//                   <View style={styles.content_wrapper}>
//                     <Text
//                       style={{ color: "#4B4B4B", fontSize: FONT_SIZES.body3 }}
//                     >
//                       A letter announcing a new property manager is usually sent
//                       by the landlord or new property management company to the
//                       tenants
//                     </Text>
//                   </View>
//                 </View>
//               </View>
//             );
//           }}
//           keyExtractor={(item, index) => index}
//         />

//         <View
//           style={{
//             width: screenWidth,
//             backgroundColor: "transparent",
//             flexDirection: "row",
//             alignItems: "center",
//             justifyContent: "center",
//             // marginVertical:10,
//           }}
//         >
//           {data.map((item, index) => {
//             return (
//               <View
//                 key={index}
//                 style={{
//                   height: 6,
//                   width: 6,
//                   backgroundColor:
//                     currentIndex == index ? "#2D2E2E" : "#CBCBCB",
//                   borderRadius: 4,
//                   margin: 2,
//                 }}
//               ></View>
//             );
//           })}
//         </View>
//       </View>
//     </View>
//   );
// }
// NotceBoard.defaultProps = {
//   backgroundColor: "#FEEED4",
// };
// export default NotceBoard;
