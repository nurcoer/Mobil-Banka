import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ScrollView, TextInput, StyleSheet, Alert} from 'react-native';
import MSSQL from 'react-native-mssql';

let config = {
    server: '192.168.1.37', //ip address of the mssql database
    username: 'sa', //username to login to the database
    password: 'kado1315', //password to login to the database
    database: 'Banka', //the name of the database to connect to
    port: 1433 //OPTIONAL, port of the database on the server
   };
let TC = 0;
let miktar = 0;
export default class BakiyeCekIslem extends Component {
    constructor(props) {
        super(props);
        this.BakiyeCek = this.BakiyeCek.bind(this);
        const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    TC = navigation.getParam('TC', '');
        this.state = {
            HesapNo:'',
            EkHesap:'',
            Miktar:'',
            Bakiye:0,
            BakiyeCek: false,
        }
      }
  BakiyeCek() {
    if (
        this.state.HesapNo === '' &&
        this.state.EkHesap === '' &&
        this.state.Bakiye === 0
        ) {
        Alert.alert('HATA', 'Değerlerin hiçbiri boş geçilemez');
        } else {
        if (!this.state.BakiyeCek) {
            this.setState({BakiyeCek: true});
            MSSQL.connect(config)
            .then(() => {
                let query =
                "SELECT Bakiye FROM Hesaplar WHERE MusteriTc='" +
                TC +
            "'And Bakiye>='" +
            this.state.Bakiye +
            "'And HesapDurum='True' And HesapNo='" +
                this.state.HesapNo +
                "' And EkNumara='" +
                this.state.EkHesap +
                "'";
                MSSQL.executeQuery(query)
                .then(rows => {
                    if (rows.length > 0) {
                    for (var i = 0; i < rows.length; i++) {
                        var row2 = rows[i];
                        miktar =
                        Number(row2.Bakiye.toFixed(2)) -
                        Number(this.state.Bakiye);
                    }
                    let query3 =
                        "UPDATE Hesaplar SET Bakiye='" +
                        miktar.toFixed(2) +
                        "' WHERE MusteriTc ='" +
                        TC +
                        "' And EkNumara ='" +
                        this.state.EkHesap +
                        "' And HesapNo='" +
                        this.state.HesapNo +
                        "'";
                    ("'");
                    MSSQL.executeUpdate(query3);
                    Alert.alert('Başarılı','işleminiz Başarıyle Gerçekleşmiştir.');
                    } else {
                    Alert.alert(''+query3+'\r\nHata: '+JSON.stringify(error));
                    MSSQL.close();
                    this.setState({BakiyeCek: false});
                    }
                })
                .catch(error=>{
                    console.log(query)
                    Alert.alert('Böyle bir kullanıcı bulunamadı. Gönderilecek hesap bilgilerini kontrol ediniz.')
                    MSSQL.close();
                    this.setState({BakiyeCek:false})
                });
                })
            .catch(error=>{
                console.log(query)
                Alert.alert('Böyle bir hesabınız bulunmamaktadır. Bilgilerinin kontrol ediniz.')
                this.setState({BakiyeCek:false})
            });   
                
                
        }
        }
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.forminput}
          placeholder={'Hesabınızın Numarası'}
          onChangeText={HesapNo => this.setState({HesapNo})}
          autoCapitalize="none"
          value={this.state.HesapNo}
        />
        <TextInput
          style={styles.forminput}
          placeholder={'Hesabınızın Ek Numarası'}
          onChangeText={(EkHesap) => this.setState({EkHesap})}
          value={this.state.EkHesap}
        />
        <TextInput
          style={styles.forminput}
          placeholder={'Çekilecek Tutar'}
          autoCapitalize="none"
          value={this.state.Bakiye}
          onChangeText={(Bakiye) => this.setState({Bakiye})}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={() => this.BakiyeCek()}>
          <Text style={styles.buttonText}>PARA ÇEK</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    width: 300,
    borderColor: '#9EA2B0',
    height: 50,
    padding: 20,
    borderRadius: 20,
    marginTop: 80,
    backgroundColor: '#26406C',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    //shadowColor: '#129793',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 1,
    shadowOpacity: 0.3,
  },
  buttonText: {
    color: '#FEFEFE',
    fontSize: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#F3F7F9',
    padding: 20,
    paddingTop: 30,
  },
  forminput: {
    height: 40,
    backgroundColor: '#DFEEEF',
    marginTop: 50,
    padding: 10,
    color: '#000505',
    fontSize: 18,
  },
});
