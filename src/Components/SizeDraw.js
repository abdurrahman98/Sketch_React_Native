import React, {Component} from 'react';
import {
  View,
  Text,
  UIManager,
  Alert,
  Image,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import RNSketchCanvas from '@terrylinla/react-native-sketch-canvas';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BarChart} from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';

// import RNFS from "react-native-fs"

export default class SizeDraw extends Component {
  state = {
    imageFile: '',
    time: 10,
    visible: 0,
    imageType: '',
    buttonVisible: 1,
    loading: false,

    data: {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    },
  };

  componentDidMount() {
    console.log(this.props);
  }

  time = () => {
    const counter = setInterval(() => {
      const {time} = this.state;

      if (time === 0) {
        this.canvas.save();

        this.canvas.clear();

        this.setState({
          time: 10,
        });
        setTimeout(() => {
          this.setState({
            visible: 0,
            buttonVisible: 2,
          });
        }, 1000);

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
    this.setState({
      loading: true,
    });
    let filePath = String('');
    let fileName = String('');

    String(path)
      .split('/')
      .map((value, index, array) => {
        if (array.length - 1 == index) {
          fileName = value;
        } else if (value === '') {
        } else {
          filePath = filePath + '/' + value;
        }
      });
    filePath = 'file://' + filePath + '/resize_' + fileName;
    console.log(filePath);
    var formdata = new FormData();
    formdata.append('file_img', {
      uri: filePath,
      type: 'image/png',
      name: 'resize_' + fileName,
    });
    const httpClient = axios.create();
    httpClient.defaults.timeout = 1000;

    httpClient
      .post('http://192.168.0.26:8080/upload/', formdata)
      .then(response => {
        this.setState({
          imageType: response.data,
          loading: false,
        });
      })
      .catch(err => {
        this.setState({
          imageType: 'bilinmeyen bir hata oluştu',
          loading: false,
        });
      });
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
              containerStyle={{backgroundColor: '#ffffff', flex: 1}}
              canvasStyle={{backgroundColor: '#ffffff', flex: 1}}
              defaultStrokeWidth={12}
              ref={ref => {
                this.canvas = ref;
              }}
              onSketchSaved={(success, path) => {
                console.log(success);
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
                  transparent: false,
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
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{marginBottom: 8}}>{this.state.imageType}</Text>
            {this.state.imageType != '' ? (
              <Text>Tahminimiz Doğru mu?</Text>
            ) : null}
          </View>
        )}

        <View
          style={{
            height: height - (width + 24 + 50),

            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#1DB700',
          }}>
          <View>
            {this.state.buttonVisible === 1 ? (
              <TouchableOpacity
                onPress={() => {
                  if (this.state.time === 10 && this.state.visible === 0) {
                    this.setState({
                      visible: 1,
                      imageType: '',
                    });

                    this.time();
                  }
                }}>
                <Text style={{fontSize: 20}}>Başlat</Text>
              </TouchableOpacity>
            ) : null}

            {this.state.buttonVisible === 2 ? (
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    if (this.state.time === 10 && this.state.visible === 0) {
                      this.setState({
                        visible: 1,
                        imageType: '',
                        buttonVisible: null,
                      });

                      this.time();
                    }
                  }}>
                  <Icon
                    name={'close-outline'}
                    size={50}
                    type="Ionicons"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    console.log(this.props);
                    this.props.navigation.goBack();
                  }}
                  style={{marginLeft: 80}}>
                  <Icon
                    name={'checkmark-outline'}
                    size={50}
                    type="Ionicons"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                    }}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  }
}
