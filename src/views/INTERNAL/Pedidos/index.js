import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
}from "react-native";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

import style from './style';
import { SELECT_ALL_BUYS, SELECT_ALL_BUYS_STATUS } from '../../../config/api';

import Header from '../../../Components/Header';
import Loading from '../../../Components/Loading';
import Pedido from '../../../assets/images/Pedido.png';
import masks from '../../../utils/masks';


export default function Pedidos(){
    const route = useRoute();
    const navigation = useNavigation();
    const [statusFiltro, setStatusFiltro] = useState(route.params.status);
    const [pedidos, setPedidos] = useState([]);
    const [carregado, setcarregado] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const listaStatus = [
        { id: 0, nome : 'Todos' },
        { id: 1, nome : 'Realizado' },
        { id: 2, nome : 'Aprovado' },
        { id: 3, nome : 'Saiu para entrega' },
        { id: 4, nome : 'Entregue' },
        { id: 5, nome : 'Cancelado' },
    ];

    let posicao = listaStatus.filter((item) => statusFiltro === item.nome);

    useEffect(() => {
        navigation.addListener('focus', () => listaPedidos());
    }, []);

    const onRefresh = useCallback(() => {
		setRefreshing(true);
		listaPedidos().then(() => setRefreshing(false));
	}, []);

    async function listaPedidos(status = statusFiltro) {
        setcarregado(false);
        const resposta = await axios.post(SELECT_ALL_BUYS_STATUS, {
            status,
        });
        if (resposta.data.error === null) {
            setPedidos(resposta.data.compras);
            setcarregado(true);
        }
    }

    const renderPedidos = ({item}) => (
        <TouchableOpacity onPress={() => navigation.navigate('OrderData', { item })}>
            <View style={style.produt}>
                <Image style={style.productImage}
                    source={Pedido}
                />
                <View style={style.productInfo}>
                    <Text style={style.productName}>N° pedido: 000{item.id}</Text>
                    <Text style={style.productName2}>{item.status_atual}</Text>
                    <Text style={style.productPrice}>R$ {masks.moneyFormat(item.total)} </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={style.container}>
            <Header title="Pedidos" />
            <View>
                <FlatList
                    data={listaStatus}
                    keyExtractor={(item) => String(item.id)}
                    initialScrollIndex={posicao[0].id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({item}) => (
                        <TouchableOpacity
                            style={[style.boxFilter, statusFiltro === item.nome ? style.boxFilterSelected : undefined]}
                            onPress={() => {
                                setStatusFiltro(item.nome);
                                listaPedidos(item.nome);
                            }}
                        >
                            <Text style={ statusFiltro === item.nome ? style.textFilterSelected : style.textFilter}>
                                {item.nome}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            </View>
            {
                carregado ?
                    <FlatList
                        data={pedidos}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={renderPedidos}
                        ListEmptyComponent={() => (
                                <View>
                                    <Text style={style.noDates}>
                                        Nenhum pedido "{statusFiltro}"
                                    </Text>
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
