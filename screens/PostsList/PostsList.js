import { View, Text, SafeAreaView, Image, TextInput, FlatList, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import color from "../../constants/color";
import SelectDropdown from 'react-native-select-dropdown';

function PostsList(props) {
  const [text, onChangeText] = React.useState(null);
  const [number, onChangeNumber] = React.useState(null);
  const buySell = ["Mua Bán", "Cho Thuê"]
  const province = ["Thừa Thiên Huế", "Đà Nẵng", "Quảng Nam"]
  const district = [
    "Quận Hải Châu", "Quận Cẩm Lệ", "Quận Thanh Khê",
    "Quận Liên Chiểu", "Quận Ngũ Hành Sơn", "Quận Sơn Trà",
    "Huyện Hòa Vang", "Huyện Hoàng Sa"]

  // Api Posts
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(()=> {
    getPosts();
    return () => {

    }
  },[])

  getPosts = () => {
    const url = 'https://langtro.ml/api/post';
    fetch(url)
      .then((res) => res.json())
      .then(async (resJson) => {
        setdata((resJson))
      }).catch((error)=> {
        console.log("loi khi ket noi den api!", error);
    }).finally(() => setisLoading(false))
  }

  renderPosts = ({item, index}) => {
    const objHinhanh = JSON.parse(item.hinh_anh);
    return (
      <View style={{shadowOpacity: 0.25, shadowRadius: 3.84,shadowOffset: {width: 0, height: 2,},shadowColor: color.black, elevation: 5,}}>
        <View
          style={{flex: 90, flexDirection: "row", alignItems: "center"}}>
          <View
            style={{flex: 30}}>
            <Image style={styles.imageItem} source={{uri: "https://langtro.ml/public/assets/front-end/imgs/baiviet/"+objHinhanh["0"]}}/>
          </View>
          <View
          style={{flexDirection: "column", flex: 70, marginRight: 5, marginLeft: 25}}>
            <View
              style={{flex: 70, flexDirection:"column"}}>
              <View
                style={{flex: 50, flexDirection: "column"}}>
                <Text
                  style={{fontWeight: "bold", fontSize: 20, color: color.black, marginBottom: 3}}>{(item.tieu_de).substring(0, 24)}...</Text>
                <Text
                  style={{fontSize: 15, color: color.gray, marginBottom: 3}}>{(item.noi_dung).substring(0, 25)}...</Text>
              </View>
            </View>
            <View
              style={{flex: 25, flexDirection: "row", justifyContent: "space-between"}}>
              <Text
                style={{color:color.blue}}>{item.dien_tich} m2</Text>
              <Text
                style={{color:color.blue}}>{item.gia}/ Tháng</Text>
            </View>
            <View
              style={{flex: 5}}>
              <Text
                style={{color: color.blue}}>1 Tuần trước</Text>
            </View>
          </View>
        </View>
        <View
          style={{flex: 10, flexDirection: "row", alignItems: "center", marginBottom: 10}}>
          <Icon name={'eye'} size={17} color={color.blue} style={{marginLeft: 30}}/>
          <Text
            style={{marginLeft: 5, fontWeight: "bold", fontSize: 17, color: color.blue}}>{item.luot_xem}</Text>
        </View>
      </View>
    )
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#fff", flexDirection: "column", marginHorizontal: 10 }}>
      <View
        style={{flex: 20, backgroundColor: color.white, flexDirection: "column"}}>
        <View
          style={{flex: 10, flexDirection: "row", alignItems: "center", marginHorizontal: 10}}>
          <Icon name={'long-arrow-alt-left'} size={30} color={color.gray05}/>
          <View
            style={{flexDirection: "row", backgroundColor: color.gray05, flex: 1,
            borderStyle: "solid", borderRadius: 50, marginHorizontal: 5,
            alignItems: "center", paddingHorizontal: 10}}>
            <Icon name={'search'} size={20} color={color.black}/>
            <TextInput
              style={styles.textInput} keyboardType="default" onChangeText={onChangeText} value={text} placeholder={"Tìm nhà"}/>
            <Icon name={'microphone'} size={20} color={color.blue}/>
          </View>
          <Icon name={'map-marked-alt'} size={30} color={color.blue}/>
        </View>
        <View
          style={{flex: 10, flexDirection: "row", alignItems:"center", marginHorizontal: 5}}>
          <Icon name={'filter'} size={20} color={color.blue}/>
          <SelectDropdown dropdownIconPosition={'left'} buttonStyle={styles.selectDropdown} defaultButtonText={"Mua bán"}
                          data={buySell} onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }} buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }} rowTextForSelection={(item, index) => {
            return item
          }}/>
          <SelectDropdown dropdownIconPosition={"right"} buttonStyle={styles.selectDropdown} defaultButtonText={"Tỉnh thành"}
                          data={province} onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }} buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }} rowTextForSelection={(item, index) => {
            return item
          }}/>
          <SelectDropdown dropdownIconPosition={"right"} buttonStyle={styles.selectDropdown} defaultButtonText={"Quận huyện"}
                          data={district} onSelect={(selectedItem, index) => {
            console.log(selectedItem, index)
          }} buttonTextAfterSelection={(selectedItem, index) => {
            return selectedItem
          }} rowTextForSelection={(item, index) => {
            return item
          }}/>
        </View>
      </View>
      <View
        style={{flex: 80, flexDirection: "column"}}>
        <Text
          style={{fontWeight: "bold"}}>Đã tìm được 5 kết quả</Text>
        {isLoading ? <ActivityIndicator/> : (
        <FlatList style={styles.container} data={data} renderItem={renderPosts} keyExtractor={item => `key-${item.id}`}/>
          )}
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  textInput: {
    height: 30,
    margin: 10,
    padding: 5,
    flex: 1
  },
  selectDropdown: {
    borderRadius: 50,
    backgroundColor: color.blue,
    flex: 1,
    marginHorizontal: 5,
  },
  container: {
    flex: 1,
  },
  imageItem: {
    flex: 1,
    width: 120,
    height: 120,
    marginVertical: 5,
    borderRadius: 10,
  }

})
export default PostsList
