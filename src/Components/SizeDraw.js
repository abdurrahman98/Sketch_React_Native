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
import RNFS from 'react-native-fs';
import {Dimensions} from 'react-native';
import axios from 'axios';
import {BarChart, LineChart} from 'react-native-chart-kit';

// import RNFS from "react-native-fs"

export default class SizeDraw extends Component {
  state = {
    imageFile: '',
    time: 10,
    visible: 0,

    data: {
      labels: [],
      datasets: [
        {
          data: [],
        },
      ],
    },
  };

  time = () => {
    const counter = setInterval(() => {
      const {time} = this.state;

      if (time === 0) {
        console.log('deneme');
        this.canvas.save();

        this.canvas.clear();

        this.setState({
          time: 10,
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

  uploadImage = async path => {
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
    const img = await RNFS.readFile(filePath, 'base64').then(response => {
      console.log(response);
      axios
        .post('http://192.168.0.26:3005/upload/', {
          file_img: response,
        })
        .then(response => {
          console.log(response);
          let labels = [];
          let datasets = [
            {
              data: [],
            },
          ];
          if (response.data != null) {
            response.data.map(value => {
              labels.push(value.name);
              datasets[0].data.push(value.percent);
            });
            this.setState({
              data: {
                labels,
                datasets,
              },
            });
          }
        })
        .catch(err => {
          console.log(err);
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
              containerStyle={{backgroundColor: 'transparent', flex: 1}}
              canvasStyle={{backgroundColor: '#ffffff', flex: 1}}
              defaultStrokeWidth={12}
              ref={ref => {
                this.canvas = ref;
              }}
              onSketchSaved={(success, path) => {
                console.log(success);
                if (success) {
                  this.uploadImage(path);
                  this.setState({
                    visible: 0,
                  });
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
            }}>
            {this.state.data.labels.length != 0 ? (
              <BarChart
                data={this.state.data}
                fromZero={true}
                width={width}
                // showBarTops={true}
                // showValuesOnTopOfBars={true}
                withInnerLines={false}
                showBarTops={true}
                showValuesOnTopOfBars={true}
                height={Dimensions.get('window').width}
                yAxisLabel="% "
                chartConfig={{
                  backgroundGradientFrom: '#fff',

                  backgroundGradientTo: '#fff',

                  color: (opacity = 1) => `rgba(0, 0, 0,1)`,
                  labelColor: () => `rgb(34, 139, 34)`,
                  strokeWidth: 20, // optional, default 3
                  barPercentage: 1,
                  useShadowColorFromDataset: false, // optional
                }}
              />
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
          <View style={{marginBottom: 6}}>
            <TouchableOpacity
              onPress={() => {
                if (this.state.time === 10 && this.state.visible === 0) {
                  this.setState({
                    time: 2,
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
