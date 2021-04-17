import React, {Component} from 'react';
import {Button, Text, View, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

class HomeScreen extends Component {
  data = [
    {
      name: 'Uçak',
      iconName: 'plane',
    },
    {
      name: 'Elma',
      iconName: 'apple-alt',
    },
    {
      name: 'Kuş',
      iconName: 'dove',
    },
    {
      name: 'Traktör',
      iconName: 'tractor',
    },
    {
      name: 'Araba',
      iconName: 'car',
    },
    {
      name: 'Kedi',
      iconName: 'cat',
    },
    {
      name: 'Köpek',
      iconName: 'dog',
    },

    {
      name: 'At',
      iconName: 'horse',
    },
    {
      name: 'Çiçek',
      iconName: 'leaf',
    },
  ];
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 20}}>
          Aşağıda verilen nesnelerden birini çiziniz.
        </Text>
        {this.data.map((value, index) => {
          return (
            <View key={index} style={{marginTop: 7}}>
              <View style={{flexDirection: 'row'}}>
                <Icon
                  name={value.iconName}
                  size={20}
                  type="FontAwesome5"
                  style={{
                    marginRight: 12,
                    color: 'black',
                    fontWeight: 'bold',
                  }}
                />
                <Text style={{fontWeight: 'bold'}}>{value.name}</Text>
              </View>
            </View>
          );
        })}
        <View>
          <View style={{flexDirection: 'row', marginTop: 7}}>
            <Image
              style={{marginRight: 12}}
              source={require('../../assets/Icon/donut.png')}
            />
            <Text style={{marginTop: 3, fontWeight: 'bold'}}>Donut</Text>
          </View>
        </View>
        <View style={{marginTop: 50}}>
          <Button
            style={{marginTop: 20}}
            onPress={() => {
              console.log(this.props);
              this.props.navigation.navigate('DrawingScreen');
            }}
            title="Devam et"></Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
