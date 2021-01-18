//import react from 'react-native';
//import Viewport from './app/Viewport.js';

//react.AppRegistry.registerComponent('DragAndDrop', () => Viewport);

import React from 'react';
import {
  StyleSheet,
    View,
    Text,
    PanResponder,
    Animated,
    Dimensions,
    Surface
} from 'react-native';

export default class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        pan     : new Animated.ValueXY()   
    };

    this.panResponder = PanResponder.create({    
        onStartShouldSetPanResponder : () => true,
        onPanResponderMove           : Animated.event([null,{ 
            dx : this.state.pan.x,
            dy : this.state.pan.y
        }]),
        onPanResponderRelease           : (e, gesture) => {
          Animated.spring(            //Step 1
              this.state.pan,         //Step 2
              {toValue:{x:0,y:0}}     //Step 3
          ).start();
      } 
    });
}
    render(){
        return (
            <View style={styles.mainContainer}>
              <Text style={styles.text}>This is a cube, Dragg it around!</Text>
              <Text style ={styles.arrow}>↓</Text>
              {this.renderDraggable()}
            </View>
        );
    }

    renderDraggable(){
      return (
        <View style={styles.draggableContainer}>
            <Animated.View 
                {...this.panResponder.panHandlers}                       
                style={[this.state.pan.getLayout(), styles.square]}>   
            </Animated.View>
        </View>
    );
    }
}
let Length = 60;
let Window = Dimensions.get('window');
let styles = StyleSheet.create({
    mainContainer: {
        flex  : 1
    },

    draggableContainer: {
        position : 'absolute',
        top : (Window.height - Length)/2,
        left : (Window.width - Length)/2,
    },

    arrow :{
      marginTop : 20 ,
      textAlign: 'center',
      color : '#C4C4C4',
      fontSize: 30,
      textShadowRadius: 5,
      textShadowColor : '#C4C4C4'
    },
    text        : {
      marginTop   : Window.height/4 + 20 ,
      marginLeft  : 5,
      marginRight : 5,
      fontFamily : 'sans-serif',
      fontSize: 20,
      textAlign   : 'center',
      color       : '#C4C4C4',
      textShadowRadius: 5,
      textShadowColor : '#C4C4C4'
    },

    square: {

      width: Length,
      height: Length,
      backgroundColor:'#3A9C89',

      paddingTop:10,
      paddingBottom:10,
 
      borderRadius: 20,
      borderWidth: 10,
      borderColor: '#3A9C89',

      shadowColor: '#A2A0A0',
      shadowOffset: {
        width: 10,
        height: 10,
      },
      shadowOpacity: 0.27, 
      shadowRadius: 4.65,
      elevation: 6,

    }
});


