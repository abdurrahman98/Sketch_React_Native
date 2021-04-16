import React, {Component} from 'react';
import {Button, Text, View, StyleSheet} from 'react-native';

class HomeScreen extends Component {
  data = [
    'Uçak',
    'Elma',
    'Kuş',
    'Traktör',
    'Araba',
    'Kedi',
    'Köpek',
    'Donut',
    'Çiçek',
    'At',
  ];
  render() {
    return (
      <View style={styles.container}>
        <Text style={{marginBottom: 20}}>
          Aşağıda verilen nesnelerden birini çiziniz.
        </Text>
        {this.data.map((value, index) => {
          return (
            <Text style={{marginTop: 3, fontWeight: 'bold'}} key={index}>
              {value}
            </Text>
          );
        })}
        <View style={{marginTop: 50}}>
          <Button
            style={{marginTop: 20}}
            onPress={() => {
              console.log(this.props);
              this.props.navigation.navigate('DrawingScreen');
            }}
            title="Başlat"></Button>
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
