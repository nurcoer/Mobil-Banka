import React, { Component } from 'react';
import axios from 'axios';
import {Text, View, TouchableOpacity, ScrollView, TextInput,StyleSheet,Alert} from 'react-native';
export default class HgsOdemeAboneBilgi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Hgs: [],
      validateAbone: false,
      HgsHesap: '',
    };
  }

  AboneGetir = () => {
    const {TC} = this.props.navigation.state.params;
    fetch('http://localhost:61707/api/Fatura/GetById/', {
      method: 'GET',
    })
      .then(res => {
        if (res.ok) {
          fetch('http://localhost:61707/api/Fatura/GetById/' + this.state.HgsHesap)
            .then(res => res.json())
            .then(response => {
              this.setState({Hgs: response});
              Alert.alert("Hata!", "Başarılı")
            })
            .catch(err => Alert.alert("Hata!", "Bir hata oluştu lütfen tekrar deneyin!"));
        } else {
          Alert.alert("Borç Bulunamadı!", "Bu Abone Numarasına Ait Borç Bulunmamaktadır!")
        }
      })
      .catch(err => Alert.alert("Hata!", "Bir hata oluştu"));
  };
  validateHgsHesap = text => {
    this.setState({HgsHesap: text.replace(/[^0-9]/g, '')});
    if (text != '') this.setState({validateAbone: true});
    else this.setState({validateAbone: false});
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.header}></View>
          <View style={styles.header}></View>
          <View style={styles.body}>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonStyleHesap}>
                <Text style={styles.buttonColorMenu}>ABONE BİLGİLERİ</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TextInput
                style={styles.buttonStyleAbone}
                placeholder="Abone Numarası Giriniz..."
                underlineColorAndroid='transparent'
                placeholderTextColor="gray"
                value={this.state.HgsHesap}
                keyboardType={'phone-pad'}
                maxLength={5}
                onChangeText={(text) => this.validateHgsHesap(text)}>
              </TextInput>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.buttonStyleMenu}
                onPress={() => { this.AboneGetir() }}>
                <Text style={styles.buttonColorMenu}> DEVAM </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F8",
      },
      header: {
        flex: 0.3,
        backgroundColor: "#F8F8F8",
        padding: 30,
        alignItems: 'center',
      },
      body: {
        flex: 0.4,
        alignItems: 'center',
      },
      buttonContainer: {
        width: '85%',
        justifyContent: "center",
      },
      buttonStyleHesap: {
        backgroundColor: "#c5002F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 6,
        margin: 5,
        flexDirection: "row"
      },
      buttonColorMenu: {
        color: 'white',
        fontWeight: 'bold',
        fontFamily: 'Bahnschrift',
        fontSize: 14
      },
      buttonStyleAbone: {
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: 5,
        padding: 6,
        margin: 5,
        flexDirection: "row",
        borderWidth: 0.8,
        borderColor: "#c5002F",
      },
      buttonStyleMenu: {
        backgroundColor: "#c5002F",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 15,
        margin: 5,
        flexDirection: "row"
      },
      hesapBilgiContainer: {
        flex: 17,
        backgroundColor: "white",
        padding: 5,
        margin: 10,
        borderWidth: 0.4,
        borderRadius: 5,
        borderColor: "#c5002f",
        fontFamily: 'Bahnschrift',
      },
      hesapText: {
        marginTop: 5,
        fontSize: 14,
        fontFamily: 'Bahnschrift',
      },
      buttonStyleKurum: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 12,
        margin: 5,
        flexDirection: "row",
        borderWidth: 0.8,
        borderColor: "black",
      },
      buttonColor: {
        fontFamily: 'Bahnschrift',
      },
      buttonStyle: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        padding: 12,
        margin: 5,
        flexDirection: "row",
        borderWidth: 0.8,
        borderColor: "#c5002F",
      },
      contContainer:{
        justifyContent: "flex-start",
        alignItems: "flex-start",
        borderRadius: 5,
        padding: 5,
        margin: 5,
        flexDirection: "row",
        borderWidth: 0.8,
        borderColor: "#c5002F",
        fontFamily: 'Bahnschrift',
      },
      hesapNo: {
        fontWeight: "bold",
        fontSize: 16,
        fontFamily: 'Bahnschrift',
      },
      infoColor: {
        fontFamily: 'Bahnschrift',
        color: '#c5002F'
      },
      buttonStyleOnayEkrani: {
        justifyContent: "center",
        alignItems: "flex-start",
        borderRadius: 5,
        padding: 12,
        margin: 5,
        flexDirection: "row",
        borderWidth: 0.8,
        borderColor: "#c5002F",
      },
      hesapBilgiContainerFO: {
        flex: 17,
        padding: 5,
        margin: 6,
        borderWidth: 0.8,
        borderRadius: 5,
        borderColor: "#c5002f",
        fontFamily: 'Bahnschrift',
      },
      total: {
        fontSize: 14,
        color: "gray",
      },
      cost: {
        fontSize: 22,
        color: "#c5002F",
        fontWeight: 'bold',
      },
      bodyHome: {
        flex: 0.5,
        backgroundColor: "#F8F8F8",
        alignItems: 'center',
      },
})