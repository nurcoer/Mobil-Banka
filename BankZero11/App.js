import Home from './views/Menu';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import LoginScreen from './views/Giris';
import SignUpScreen from './views/UyeOl';
import Anasayfa from './views/Anasayfa';
import Hesapekle from './views/HesapEkle';
import HavaleIslem from './views/HavaleIslem';
import BakiyeEkle from './views/BakiyeEkle';
import BakiyeCek from './views/BakiyeCek';
import HGSislem from './views/HGSislem.js';
import Virman from './views/Virman';

const AppNavigator = createStackNavigator(
  {
    menu: {
      screen: Home,
    },
    Login: {
      screen: LoginScreen,
      navigationOptions: {
        header: null,
      },
    },
    SignUp: {
      screen: SignUpScreen,
    },
    AnaMenu: {
      screen: Anasayfa,
      navigationOptions: {
        header: null,
      },
    },
    hesapekle: {
      screen: Hesapekle,
      navigationOptions: {
        headerTitle: 'HESAP İŞLEMLERİ',
      },
    },
    HavaleIslem: {
      screen: HavaleIslem,
      navigationOptions: {
        headerTitle: 'HAVALE İŞLEMLERİ',
      },
    },
    BakiyeEkle: {
      screen: BakiyeEkle,
    },
    BakiyeCek: {
      screen: BakiyeCek,
    },
    HGSislem: {
      screen: HGSislem,
    },
    Virman: {
      screen: Virman,
    },
  },
  {
    initialRouteName: 'AnaMenu',
  },
);
export default createAppContainer(AppNavigator);
