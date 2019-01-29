import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Alert,
  View,
  Button,
  RefreshControl,
  Touchable,
} from 'react-native';
//import { NavigationActions, StackActions } from 'react-navigation';

import { Vibration } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';

export  class QRScan extends Component {

    constructor(props){
    super(props)
    this.state = {
         dataqr:'',
         attendanceId: this.props.attendanceId,
         status:'Ready',
         attendanceTuple:''
         
    };
    }

   



    onSuccess(e) {
      this.setState({
        dataqr:this.state.dataqr = e.data,
        status:this.setState({status:'Ready'})


    })
    //
  
        // Alert.alert(
        //   'QR Code', 
        //   'code : '+e.data,
        //   [
        //      {text: 'OK' , onPress: () => console.log('OK Pressed')}, 
        //   ],
        //   { cancelable : false}

        // )

        console.log(this.state.attendanceId);
        console.log(this.state.dataqr);

        fetch('https://clzmate.herokuapp.com/attendance/addAttendance/'+this.state.attendanceId,{
        method: 'PATCH',
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify({
            student : this.state.dataqr ,
            // password : this.state.password,
          // email: "hashan@gmail.com",
          // password: "password"
        })
    })

       .then((responce) => responce.json())
       .then((res) =>{
           console.log(res)
          if(res.state === false) {
            alert('Try Again');
          } else{
               alert("Student added");
            // alert("code is"+this.state.dataqr);
          }
      }) 
      .done();
    }
    handleTalkStart() {
      Vibration.vibrate(); // I reach this call and it works
    }
  

    render() {
    return (
        <View style = {styles.conMain}>
            <View style = {styles.conHeader}>
                <Text style = {styles.textHeader}>Clz mate QR Code scanner</Text>
            </View>

            <View style = {styles.conQR}>
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                    ref = {(node) => {this.scanner = node}}
        
                    topContent={

                   <View>

                        <Text style={styles.centerText}>
                            <Text style={styles.textBold}></Text> 
                        </Text>
         
        
                    </View>  
                    }

                    
                />

            </View>

            <View style = {styles.button}>
                <Button
                    onPress = {()=> {
                        this.scanner.reactivate()
                        this.setState({status:'Ready'})
                        
                    }
                    }
                        title = "Scan" >
                </Button>
        
            
            </View>
          
              
           

            
        </View>
      
    );
  }

  submit = () => {
    fetch('https://clzmate.herokuapp.com/attendance/newWeekAttendance',{
        method: 'POST',
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify({
            student : this.state.dataqr ,
            // password : this.state.password,
          // email: "hashan@gmail.com",
          // password: "password"
        })
    })

       .then((responce) => responce.json())
       .then((res) =>{
           console.log(res)
          if(res.state === false) {
            alert('Try Again');
          }
      }) 
      .done();
  }
}

const styles = StyleSheet.create({
conMain: {
    flex: 1,
   
  },
conHeader: {
    flex: 1,
    backgroundColor:'rgb(0,0,0)',
    alignItems: 'center',
    justifyContent: 'center'
  },
textHeader: {
    fontSize: 18,
    color: 'rgb(255,255,255)',
    
  },
conQR: {
    flex: 8,
    padding: 5,
  },
centerText:{
    fontSize: 12,
    color: '#777',
  },
button:{
    padding:20,


  },
button1:{
    padding:10,
  },
});

//AppRegistry.registerComponent('default', () => ScanScreen);
export default QRScan;