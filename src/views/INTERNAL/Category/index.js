import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  RefreshControl,
  Alert
}from "react-native";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import style from './style';

import Header from '../../../Components/Header';
import Loading from '../../../Components/Loading';
import { CATEGORIES_ALL, DELETE_CATEGORY } from '../../../config/api';


export default function Category(){
    const navigation = useNavigation();
    const [listaCategorias, setListaCategorias] = useState([]);
    const [carregado, setCarregado] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        navigation.addListener('focus', () => buscarCategorias());
    }, []);

    const onRefresh = useCallback(() => {
		setRefreshing(true);
		buscarCategorias().then(() => setRefreshing(false));
	}, []);

    const buscarCategorias = async () => {
        setCarregado(false);
        const resposta = await axios.get(CATEGORIES_ALL);
        if (resposta.data.error == null) {
            const { categorias } = resposta.data;
            setListaCategorias(categorias);
            setCarregado(true);
        }
        else {
            Alert.alert("Erro", "Não foi possível carregar as categorias");
        }
    }

    async function apagarCategoria(id) {
		const resposta = await axios.post(DELETE_CATEGORY, {
			id,
		});
		if (resposta.data.error == null) {
			Alert.alert("Sucesso", "Categoria excluída");
			onRefresh();
		} else {
			Alert.alert('Erro', 'Algo deu errado ao excluir categoria');
		}
	}

    const renderListCategories = ({ item }) => (
        <View style={style.produt}>
            <Text style={style.productName}>{item.nome}</Text>
            <View style={style.actions}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('NewCategory', {categoria: item})}
                >
                    <Text style={[style.action, style.change]}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => apagarCategoria(item.id)}>
                    <Text style={[style.action, style.remove]}>Excluir</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return(
        <SafeAreaView style={style.container}>
        <Header title="Categorias" />
        {
            carregado == true ?
                <FlatList
                    data={listaCategorias}
                    keyExtractor={(item, index) => String(index)}
                    renderItem={renderListCategories}
                    ListFooterComponent={() => (
                        <View>
                            <TouchableOpacity
                                style={style.button}
                                onPress={() => navigation.navigate('NewCategory')}
                            >
                                <Text style={style.textDefaultButton}>CADASTRAR NOVA</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                            colors={['#1389DF', '#1389DF', '#1389DF']}
                        />
                    }
                />
            :
                <Loading />
        }
        </SafeAreaView>
    );

}