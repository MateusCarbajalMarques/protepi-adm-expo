import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import {general} from '../../../deafultstyles';
import Header from '../../../Components/Header';


export default function JustificativaCancelamento (){
    const navigation = useNavigation();

    return(
        <SafeAreaView style={style.container}>
            <Header title="Justificativa do cancelamento" />

            <View style={style.containerInput}>
                <TextInput
                    style={style.input}
                    label="Justificativa"
                    mode="flat"
                    multiline={true}
			        numberOfLines={6}
                    theme={{
                    colors: {
                        primary: '#899DAC',
                        background: 'transparent',
                    },
                    }}
                    onChangeText={(Justificativa) => setJustificativa(Justificativa)}
                />
            </View>

            <TouchableOpacity
            style={style.defaultButton}
            // onPress={()=> loginAction()}
            >
            <Text style={style.textDefaultButton}>SALVAR</Text>
          </TouchableOpacity>

        </SafeAreaView>

    );
}

const style = StyleSheet.create({
    ...general,
});