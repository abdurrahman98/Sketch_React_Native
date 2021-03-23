import React, { Component } from 'react'
import { Text, View,TouchableOpacity,AppRegistry,StyleSheet,Alert,Image } from 'react-native'
import RNSketchCanvas, {SketchCanvas} from "@terrylinla/react-native-sketch-canvas"
export default class Drawing extends Component {
    
    constructor(props) {
        super(props)
    
        this.state = {
          sketch_enable:false,
          path:"",
        }
      }
    render() {
        
        return (
          <View style={styles.container}>
            <View style={{flex:1}}>
              <Image
              source={{uri:"file:///sdcard/img.png"}}
              />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
            <RNSketchCanvas
            containerStyle={{ backgroundColor: 'transparent', flex: 1 }}
            canvasStyle={{ backgroundColor: 'transparent', flex: 1 }}
            ref={ref=>{
              this.canvas=ref
              console.log(ref)
            }}
            saveComponent={<View style={styles.functionButton}><Text style={{ color: 'black' }}>Save</Text></View>}
            
            
            savePreference={() => {
              return {
                folder: "RNSketchCanvas",
                filename: String(Math.ceil(Math.random() * 100000000)),
                transparent: false,
                imageType: "png",
                
              }
            }}
            onSketchSaved={(success, path) => {
              this.setState({

                path,
              })


              Alert.alert(success ? 'Image saved!' : 'Failed to save image!', path)
            }}
           
          />
              <TouchableOpacity onPress={() => {
                
                
                
                this.canvas.save()
              }} style={styles.Button}>
                <Text>Çizime Başla</Text>
              </TouchableOpacity>
            </View>
          </View>
        );
    }
}


const styles = StyleSheet.create({
  Button: {
    position: 'absolute',
    top:"50%",
    left:"50%",
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
  AppRegistry.registerComponent('example', () => Drawing);


  // <SketchCanvas
               
  //               // localSourceImage={{ filename: 'bulb.png', directory: RNSketchCanvas.MAIN_BUNDLE }}
                
  //               ref={(ref) => {
  //                 this.canvas = ref
  //                 this.state.canvas=ref
                  
  //               }}
  //               style={{flex: 1}}
  //               savePreference={() => {
  //                   return {
  //                     folder: 'RNSketchCanvas',
  //                     filename: 'image',
  //                     transparent: true,
  //                     imageType: 'jpg',
  //                     includeImage: true,
  //                     includeText: false,
  //                     cropToImageSize: true,
  //                   };
  //                 }}
  //             />