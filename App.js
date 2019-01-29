

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { createStackNavigator, createAppContainer } from "react-navigation";
import Splash from './app/components/Splash';
import Login from './app/components/Login';
import Profile from './app/components/Profile'; 
import QRScan from './app/components/QRScan';

export default class App extends Component{
  render(){
    return(
      <Router>

      <Scene key='root'>
      
      <Scene
      
        key='Splash'
        title='Splash'
        component={Splash}
        />

      <Scene
        initial
        key='Login'
        title='Login'
        component={Login}
        hideNavBar
        />

      <Scene
        key='Profile'
        title='Profile'
        component={Profile}
        />
      
      
      <Scene
        key='QRScan'
        title='QRScan'
        component={QRScan}
        />
      
       </Scene>
      </Router>
    )
  }
}




