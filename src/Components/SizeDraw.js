import React, {Component} from 'react';
import {
  View,
  Text,
  UIManager,
  Alert,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';

import {Dimensions} from 'react-native';
import axios from 'axios';
// import RNFS from "react-native-fs"

export default class SizeDraw extends Component {
  state = {
    imageFile: '',
    time: 10,
    visible: 0,
  };

  time = () => {
    const counter = setInterval(() => {
      const {time} = this.state;
      if (time === 0) {
        this.canvas.save();

        this.canvas.clear();
        this.setState({
          time: 10,
          visible: 0,
        });
        clearInterval(counter);
      } else {
        this.setState(prevState => {
          return {
            time: prevState.time - 1,
          };
        });
      }
    }, 1000);
  };

  uploadImage = path => {
    // upload işlemleri burada yapılacak
  };
  render() {
    const {height, width} = Dimensions.get('window');

    return (
      <View style={{flex: 1, backgroundColor: '#18A558'}}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <View
            style={{
              margin: 12,
            }}>
            <Text style={{fontSize: 25}}>{this.state.time} </Text>
          </View>
        </View>
        {this.state.visible === 1 ? (
          <View style={{height: width, width: width}}>
            <RNSketchCanvas
              containerStyle={{backgroundColor: 'transparent', flex: 1}}
              canvasStyle={{backgroundColor: '#ffffff', flex: 1}}
              defaultStrokeWidth={12}
              ref={ref => {
                this.canvas = ref;
              }}
              onSketchSaved={(success, path) => {
                if (success) {
                  this.uploadImage(path);
                }
              }}
              savePreference={() => {
                const filename = String(Math.ceil(Math.random() * 100000000));
                this.setState({
                  imageFile: filename,
                });
                return {
                  folder: 'RNSketchCanvas',
                  filename: filename,
                  transparent: true,
                  imageType: 'png',
                };
              }}
            />
          </View>
        ) : (
          <View
            style={{
              height: width,
              width: width,
              backgroundColor: 'white',
            }}></View>
        )}
        <View
          style={{
            height: height - (width + 24 + 50),

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1DB700',
          }}>
          <View style={{marginBottom: 6}}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.time === 10) {
                  this.setState({
                    time: 10,
                    visible: 1,
                  });

                  this.time();
                }
              }}>
              <Text style={{fontSize: 20}}>Başlat</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
