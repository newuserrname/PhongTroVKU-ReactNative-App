import React, { useState, useEffect } from "react";
import type {Node} from 'react';
import {
  ActivityIndicator,
  FlatList, Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const RestApi = () => {
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    getPosts();
    return () => {

    }
  }, [])

  getPosts = () => {
    const apiUrl = 'https://langtro.ml/api/post';
    fetch(apiUrl)
      .then((res) => res.json())
      .then(async (resJson) => {
        setdata((resJson))
    }).catch((error) => {
      console.log("loi k get duoc api nhe!", error);
    }).finally(() => setisLoading(false))
  }
  renderItem = ({item, index}) => {
    const objHinhanh = JSON.parse(item.hinh_anh);
    return (
      <View>
        <View style={styles.container}>
          <Image style={styles.imageItem} source={{uri: "https://langtro.ml/public/assets/front-end/imgs/baiviet/"+objHinhanh["0"]}}/>
        </View>
        <Text style={styles.textItem}>{item.tieu_de}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList style={styles.container} data={data} renderItem={renderItem} keyExtractor={item => `key-${item.id}`}/>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  center: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  textItem: {
    color: "#000",
    fontSize: 20,
    marginLeft: 20,
    marginTop: 10,
    flex: 1,
  },
  imageItem: {
    marginTop: 10,
    marginLeft: 20,
    width: 50,
    height: 50,
  },
  container: {
    flex: 1,
  }
})
export default RestApi;
