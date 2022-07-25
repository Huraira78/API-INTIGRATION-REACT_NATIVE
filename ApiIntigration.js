import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";

const ApiIntigration = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await fetch(
        "https://api.autodeals.pk/makes?category=cars&makeSize=&adsStatus=1"
      );
      const resData = await res.json();
      setData(resData);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {loading ? (
        <View style={styles.loader}>
          <ActivityIndicator />
        </View>
      ) : (
        <View>
          <Text style={styles.firstText}>ALL VEHICLE MAKER</Text>
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(key) => key.id}
            data={data}
            renderItem={({ item }) => {
              return (
                <View style={styles.flatStyle}>
                  <View style={styles.ImageContainer}>
                    {/* <Text>{item.id}</Text> */}
                    <Image
                      style={styles.ImageStyle}
                      resizeMode="cover"
                      source={{ uri: item.logoUrl }}
                    />
                  </View>
                  <View style={styles.InfoStyle}>
                    <Text style={styles.insideFlat1}>Maker: {item.name}</Text>
                    <Text style={styles.insideFlat2}>
                      {item.id < 10 ? `#0${item.id}` : `#${item.id}`}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

export default ApiIntigration;

const styles = StyleSheet.create({
  loader: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  mainContainer: {
    
    backgroundColor: "#dbaa09",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  firstText: {
    marginTop:40,
    fontSize:30,
    fontWeight: "bold",
    // alignSelf:'center',
    // borderTopColor:'#db5a09',
    // borderTopWidth:5,
    // borderRightColor:'#db5a09',
    // borderRightWidth:5,
    // borderLeftColor:'#db5a09',
    // borderLeftWidth:5,
    // borderRadius:10
  },
 
  ImageContainer: {
    //  borderColor:'black',
    //  borderWidth:3,
    //  borderRadius:10,
    //  marginTop:5
  },
  flatStyle: {
    borderColor: "black",
    borderWidth: 3,
    borderRadius: 10,
    marginTop: 5,
  },
  ImageStyle: {
    height: 150,
    width: 250,
    alignSelf: "center",
  },
  InfoStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#db5a09",
    borderRadius: 9,
    height: 70,
  },
  insideFlat1: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft:7
  },
  insideFlat2: {
    fontSize: 20,
    fontWeight: "500",
    marginRight:7
  },
});
