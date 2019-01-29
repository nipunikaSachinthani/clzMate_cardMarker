
import React, { Component, PropTypes } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  AsyncStorage, 
  ImageBackground,
  ActivityIndicator, 
  Dimensions,
  Modal,
} from 'react-native';
import {Actions} from 'react-native-router-flux';
import DatePicker from 'react-native-date-picker';
import ModalDropdown from 'react-native-modal-dropdown';

export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            date :new Date(),
            clz : '',
            cardMarker : '',
           
        } ;
       
    }

    

    componentDidMount(){
      this.getUserId()
    }
    
    render() {
    return (
        <ImageBackground source={require('../../img/i.jpg')}
       style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>
       
        
        <View style = {styles.container}>
        
           <Text style = {styles.header}>Select Class</Text>

           <DatePicker
              date={this.state.date}
              mode = {'date'}
              onDateChange={date => this.setState({date})}
            />

           <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
              placeholder = 'Enter Class ID'
              placeholderTextColor = 'black'
              underlineColorAndroid = 'transparent' 
            onChangeText={ (clz) => this.setState({clz})
            }
            
            />
            
             {/* <ModalDropdown style = {styles.dropdown}
              options = {['class101','class102','class103']}
              onChangeText={ (clz) => this.setState({clz})
            } 
            >

             </ModalDropdown> */}
            
                

            <TouchableOpacity  
                style = {styles.btn}
                onPress = {this.Submit}
                disabled={!this.state.date && !this.state.clz}> 
                <Text style={styles.subText}> Submit </Text>
            </TouchableOpacity>
     
           
        </View>
       
        </KeyboardAvoidingView> 
        </ImageBackground>
     
    );
  }

  async getUserId(){
    try{
      this.state.cardMarker = await AsyncStorage.getItem('userId');
      console.log(this.state.cardMarker);
    }catch(error){
      alert("token get error");
    }
  }
  
  formatDate2(date){
    const newDate = date.toISOString().split('T')[0]
    console.log(newDate);
    return newDate;
  }

  formatDate1(date){
    var formatedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    console.log(formatedDate)
    return formatedDate;
  }
  
  Submit = () => {
      console.log(this.state.date)
      console.log(this.state.clz)
    fetch('https://clzmate.herokuapp.com/attendance/newWeekAttendance',{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify({
              date : this.formatDate1(this.state.date),
              clz : this.state.clz,
              cardMarker : this.state.cardMarker
          })
      }) .then((responce) => responce.json())
         .then((res) =>{
           console.log(res)
            if(res.state === true) {
                alert('Submit succeed');
                Actions.QRScan({ attendanceId: res.Id });
            }
            else{
                console.log("else part")
                alert('No class');
            }
            
        }) 
        .done();
    }
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,
        
    },
   

    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },
   
    

    textInput:{
       alignSelf: 'stretch',
       borderRadius: 4,
       padding: 20,
       marginBottom: 30,
       backgroundColor: 'rgba(128,128,128,0.7)',
       alignItems: 'center',
       justifyContent: 'center',
       

    },

    btn:{
        alignSelf: 'stretch',
        backgroundColor: 'rgba(128,128,128,1)',
        padding: 20,
        alignItems: 'center',
        marginBottom: 60,
        },
    subText:{
        fontSize:16,
        fontWeight: "bold"
    

    },
    header :{
        fontSize:26,
        fontWeight: "bold",
        marginBottom:60,
        color:'rgb(255,255,255)',

     },
    
    dropdown :{
        flex : 1, 
        fontSize : 26,
        margin : 8,
        borderColor: 'rgba(128,128,128,0.7)',
        borderWidth :5,
        width : '50%'
        
    },
});
