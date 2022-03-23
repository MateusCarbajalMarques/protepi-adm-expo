import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';

import { general } from '../../../deafultstyles';
import Header from '../../../Components/Header';
import { REGISTER_CATEGORY, UPDATE_CATEGORY } from '../../../config/api';


export default function NewCategory (){
    const route = useRoute();
    const navigation = useNavigation();
    const [nome, setNome] = useState(route.params ? route.params.categoria.nome : '');

    const titulo = route.params ? "Editar categoria" : "Cadastrar nova categoria";
    const botao = route.params ? "ATUALIZAR" : "SALVAR";

    async function acao() {
        let dados = {}, rota, mensagem;

        if(route.params) {
            dados = {
                id : route.params.categoria.id,
                nome,
            }
            rota = UPDATE_CATEGORY;
            mensagem = 'atualizada';
        } else {
            dados = {
                nome,
            }
            rota = REGISTER_CATEGORY;
            mensagem = 'cadastrada';
        }
        if(nome.length > 0) {
            const resposta = await axios.post(rota, dados);
            if(resposta.data.error === null) {
                Alert.alert("Sucesso", "Categoria "+mensagem);
                navigation.goBack();
            } else {
                Alert.alert("Erro", "Categoria não pôde ser "+mensagem);
            }
        } else {
            Alert.alert("Atenção", "Campo não pode ficar vazio");
        }
    }

    return(
        <SafeAreaView style={style.container}>
            <Header title={titulo} />

            <View style={style.containerInput}>
                <TextInput
                    style={style.input}
                    label="Nome"
                    mode="flat"
                    theme={{
                    colors: {
                        primary: '#899DAC',
                        background: 'transparent',
                    },
                    }}
                    onChangeText={(nome) => setNome(nome)}
                    value={nome}
                />
            </View>

            <TouchableOpacity
                style={style.defaultButton}
                onPress={acao}
            >
                <Text style={style.textDefaultButton}>{botao}</Text>
            </TouchableOpacity>

        </SafeAreaView>

    );
}

const style = StyleSheet.create({
    ...general,
});