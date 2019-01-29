
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
    Picker,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import DatePicker from 'react-native-date-picker';
//import Picker from 'react-native-picker';
//import ModalDropdown from 'react-native-modal-dropdown';
//import DropdownMenu from 'react-native-dropdown-menu';

//import {Menu, MenuContext, MenuProvider, MenuOptions, MenuOption, MenuTrigger} from "react-native-popup-menu";

export default class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            clz: [],
            cardMarker: '',
            class : '',



            //Dropdown:"Select Class",


        };

    }



    componentDidMount() {
        this.getUserId()
        this.getClasses()
    }

    render() {
        return (
            <ImageBackground source={require('../../img/j.jpg')}
                style={styles.backgroundImage}>
                <KeyboardAvoidingView behavior='padding' style={styles.wrapper}>


                    <View style={styles.container}>

                        <Text style={styles.header}>Select Class</Text>

                        <DatePicker
                            date={this.state.date}
                            mode={'date'}
                            onDateChange={date => this.setState({ date })}
                        />

                        {/* <TextInput
            style = {styles.textInput} 
            keyboardType = 'default'
              placeholder = 'Enter Class ID'
              placeholderTextColor = 'black'
              underlineColorAndroid = 'transparent' 
            onChangeText={ (clz) => this.setState({clz})
            }
            
            /> */}

                        {/* <ModalDropdown 
             
            
            style={{height: 40}}
            //style={{borderColor: 'rgba(128,128,0,0.7)',}}
            //style={{backgroundColor :'rgba(128,128,0,0.7)'}}
            textStyle={{fontSize: 20, paddingTop: 8, paddingBottom: 8}}
            dropdownStyle={styles.dropdown}
            dropdownTextStyle={{fontSize: 30}}
            dropdownTextStyle={{ fontWeight: 30}}
            containerStyle={{width:140,zIndex:60,
                top:20,}}
            options={this.state.status_option}
            defaultIndex={-1}
            defaultValue={'Select Class'}
            //fontWeight: "bold",
            //backgroundColor = {'rgba(128,128,0,0.7)'}
            //margin : 15,
            //borderColor: 'rgba(128,128,0,0.7)',
            //borderWidth :10,
            
            /> */}
                        {/* <MenuContext style={styles.container}>
            <View>
              
             <MenuProvider style = {{flexDirection: "column", padding: 30}}>
             </MenuProvider>

             <Menu> onSelect = {value => {this.state.Dropdown} } </Menu>

             <MenuTrigger>
                 <Text style={styles.topic}>
                 {this.state.Dropdown}</Text>
             </MenuTrigger>
            
             <MenuOptions>
                 <MenuOption value= {"Class101"}>
                 <Text style={styles.menuContent}>Class101</Text>
                 </MenuOption>

                 <MenuOption value= {"Class102"}>
                 <Text style={styles.menuContent}>Class102</Text>
                 </MenuOption>

                 <MenuOption value= {"Class103"}>
                 <Text style={styles.menuContent}>Class103</Text>
                 </MenuOption>
                 
             </MenuOptions>
             
             </View>
             </MenuContext>    */}


                        <Picker
                            selectedValue={this.state.class}
                            style={{ height: 50, width: 150 }}
                            onValueChange={(itemValue, itemIndex) => this.setState({ class: itemValue })}>
                            <Picker.Item label="Select Class" value="" />
                            {this.state.clz.map((val, key) => {
                                return <Picker.Item label={val.subjectName} value={val.clzNo} key={key} />
                            })}
                        </Picker>



                        <TouchableOpacity
                            style={styles.btn}
                            onPress={this.Submit}
                            disabled={!this.state.date && !this.state.clz}>
                            <Text style={styles.subText}> Submit </Text>
                        </TouchableOpacity>


                    </View>

                </KeyboardAvoidingView>
            </ImageBackground>

        );
    }

    async getUserId() {
        try {
            this.state.cardMarker = await AsyncStorage.getItem('userId');
            console.log(this.state.cardMarker);
        } catch (error) {
            alert("token get error");
        }
    }

    formatDate2(date) {
        const newDate = date.toISOString().split('T')[0]
        console.log(newDate);
        return newDate;
    }

    formatDate1(date) {
        var formatedDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
        console.log(formatedDate)
        return formatedDate;
    }

    Submit = () => {
        console.log(this.state.date)
        console.log(this.state.class)
        fetch('https://clzmate.herokuapp.com/attendance/newWeekAttendance', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({
                date: this.formatDate1(this.state.date),
                clz: this.state.class,
                cardMarker: this.state.cardMarker
            })
        }).then((responce) => responce.json())
            .then((res) => {
                console.log(res)
                if (res.state === true) {
                    alert('Submit succeed');
                    Actions.QRScan({ attendanceId: res.Id });
                }
                else {
                    console.log("else part")
                    alert('No class');
                }

            })
            .done();
    }

    getClasses = () => {


        // console.log("login")
        // console.log(this.state.email)
        // console.log(this.state.password)
        fetch('https://clzmate.herokuapp.com/clz/', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json',
            }
        })

            .then((responce) => responce.json())
            .then((res) => {
                console.log(res)
                if (res) {
                    this.setState({clz:res.Clz})
                    /*var length = res.Clz.length;
                    for (i = 0; i < length; i++) {
                        this.state.clz[i] = res.Clz[i];
                    }
                    console.log(this.state.clz);
                    console.log(this.state.clz[0].clzNo);*/
                }
                else {
                    //alert('Wrong class');
                }
            })
            .done();
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: null,
        height: null,

    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 40,
        paddingRight: 40,
    },



    textInput: {
        alignSelf: 'stretch',
        borderRadius: 4,
        padding: 20,
        marginBottom: 30,
        backgroundColor: 'rgba(128,128,0,0.7)',
        alignItems: 'center',
        justifyContent: 'center',


    },

    btn: {
        //     alignSelf: 'stretch',
        backgroundColor: 'rgba(128,128,0,1)',
        //   padding: 20,
        alignItems: 'center',
        //  marginBottom: 30,
        //   //justifyContent: 'space-between',
        //  // alignSelf: 'flex-end',
        //     position: 'absolute',
        //     //bottom:0,
        //     //left:0,
        //flex: 1,
        justifyContent: 'center',
        marginBottom: 10,
        width: '100%',
        height: 50,
    },
    subText: {
        fontSize: 16,
        fontWeight: "bold",
        alignItems: 'center',


    },
    header: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 60,
        color: 'rgb(255,255,255)',

    },

    // dropdown :{
    //     //flex : '100%',
    //    // fontSize : 26,
    //     fontWeight: "bold",
    //     backgroundColor : 'rgba(128,128,0,0.7)',
    //     margin : 15,
    //     borderColor: 'rgba(128,128,0,0.7)',
    //     borderWidth :10,
    //     //width : 50,
    //     //height : 20,

    // },
});
