import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

import {general} from '../../deafultstyles';

//ASSETS
import Back from '../../assets/icons/back.png';

export default function Loading({title = 'Oi'}) {
  const navigation = useNavigation();

  return (
    <View style={style.headerModel}>
      <View style={style.identifyScreen}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={style.iconModelTitle}
            source={Back}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={style.texTitle}>{title}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  ...general,
});
