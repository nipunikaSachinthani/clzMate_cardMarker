
import React, { Component } from 'react';
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
  ScrollView,
} from 'react-native';
import JwtDecode from 'jwt-decode';
import {Actions} from 'react-native-router-flux';

export default class Login extends Component {
    
    constructor(props){
        super(props);
    

    this.state = {
        email :'',
        password :'',
        //validEmail:false,
        //emailAddress:''
        
    }
}
      

    // handleEmailChange(email){
    //     const emailCheckRegex=/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    //     this.setState({ emailAddress:email});

    //     if(!this.state.validEmail){
    //         if(emailCheckRegex.test(email)){
    //             this.setState({ validEmail: true});
    //         }
    //     }else{
    //         if(!emailCheckRegex.test(email)){
    //             this.setState({ validEmail: false});
    //         }
    //     }
    // }

    render() {
    return (
        <ImageBackground source={require('../../img/e.jpg')}
       style={styles.backgroundImage}>
        <KeyboardAvoidingView behavior = 'padding' style = {styles.wrapper}>
       
       
        <View style = {styles.container}>
        
           <Text style = {styles.header}>LOGIN</Text>

            <TextInput
            style = {styles.textInput} 
            keyboardType = 'email-address'
            placeholder = 'Enter your Username'
            placeholderTextColor = 'black'
            underlineColorAndroid = 'transparent'
            onChangeText={ (email ) => this.setState({email})
             }
                                
            />

           <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
              placeholder = 'Enter Your password'
              secureTextEntry = {true}
              placeholderTextColor = 'black'
              underlineColorAndroid = 'transparent' 
            onChangeText={ (password) => this.setState({password})
             }
                               
            />

            <TouchableOpacity  
                style = {styles.btn}
                onPress = {this.login}
                // disabled={!this.state.email && !this.state.password}
                > 
                <Text style={styles.logText}> Log in </Text>
            </TouchableOpacity>
     
               
        </View>
        
        </KeyboardAvoidingView> 
        </ImageBackground>
     
    );
  }

  async setToken(token){
    try{
      await AsyncStorage.setItem("token",token);
    }catch(error){
      alert("token store error");
    }
  }

  async setId(userId){
    try{
      await AsyncStorage.setItem("userId",userId);
    }catch(error){
      alert("User id store error");
    }
  }

  login = () => {
      console.log("login")
      console.log(this.state.email)
      console.log(this.state.password)
      fetch('https://clzmate.herokuapp.com/user/login',{
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify({
              email : this.state.email ,
              password : this.state.password,
            // email: "nipunika@gmail.com",
            // password: "password"
          })
      })

         .then((responce) => responce.json())
         .then((res) =>{
             console.log(res)
            if(res.state === true) {
                this.setToken(res.JWT_Token);
                var decoded = JwtDecode(res.JWT_Token);
                var userId = decoded.user._id;
                this.setId(userId);
                if(decoded.user.role == 'Card Marker'){
                    Actions.Profile();
                    alert('Succesfully Loged in');
                } else {
                    alert('Not Permission');
                }
            }
            else{
                alert('No Responce');
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
       backgroundColor: 'rgba(139,69,19,0.5)',
       alignItems: 'center',
       justifyContent: 'center',
       

    },

    btn:{
        alignSelf: 'stretch',
        backgroundColor: 'rgba(139,69,19,0.9)',
        padding: 20,
        alignItems: 'center',
        marginBottom: 60,
        },
    logText:{
        fontSize:16,
        fontWeight: "bold"
    

    },
    header :{
        fontSize:26,
        fontWeight: "bold",
        marginBottom:60,
        color:'black',

    

    },
});
