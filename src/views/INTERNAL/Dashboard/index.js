import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

// COMPONENTS
import Loading from '../../../Components/Loading';

//import Header from '../../../Components/Header';
import UserIcon from '../../../assets/icons/user.png';
import Requests from '../../../assets/icons/requests.png';
import Products from '../../../assets/icons/products.png';
import Categories from '../../../assets/icons/categories.png';
import Information from '../../../assets/icons/information.png';

import ListRequests from '../../../assets/icons/listrequests.png';



//API
import {COUNT_STATUS} from '../../../config/api';

export default function Dashboard() {
  const navigation = useNavigation();
  const [carregado, setCarregado] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [statusRecebidos, setStatusRecebidos] = useState(0);
  const [statusAceitos, setStatusAceitos] = useState(0);
  const [statusTransporte, setStatusTransporte] = useState(0);

  useEffect(() => {
    navigation.addListener('focus', () => carregaStatus());
  }, []);

  async function carregaStatus() {
    setCarregado(false);
    const recebidos = await countStatus('Realizado');
    const aceitos = await countStatus('Aceito');
    const saiuEntrega = await countStatus('Saiu para entrega');
    setStatusRecebidos(recebidos);
    setStatusAceitos(aceitos);
    setStatusTransporte(saiuEntrega);
    setCarregado(true);
  }

  const onRefresh = useCallback(() => {
		setRefreshing(true);
		carregaStatus().then(() => setRefreshing(false));
	}, []);

  const countStatus = async (status) => {
    const resposta = await axios.post(COUNT_STATUS, {
      status
    });
    if (resposta.data.error == null) {
      return resposta.data.compras.count;
    } else {
      Alert.alert('Erro', 'Algo deu errado ao contar pedido "'+status+'".');
      return 0;
    }
  };

  return (
    <SafeAreaView style={style.container}>
      {
        carregado ?
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={['#1389DF', '#1389DF', '#1389DF']}
              />
            }
          >
            <StatusBar backgroundColor="#026AB6" barStyle="light-content" />
            <View style={style.headerBlue}>
              <Image source={UserIcon} style={style.iconUser}></Image>
              <Text style={style.textUser}>Eu sou uma view vazia</Text>
            </View>

            <View style={style.bodyMenu}>
              <TouchableOpacity style={[style.requests, style.backBlue]}
                onPress={() => navigation.navigate('Pedidos', { status : 'Realizado' })}>
                <Image source={Requests} style={style.iconRequests}></Image>
                <View style={style.infoRequests}>
                  <Text style={style.infoRequestsNumber}>{statusRecebidos}</Text>
                  <Text style={style.infoRequestsText}>Pedidos recebidos</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[style.requests, style.backOrange]}
                onPress={() => navigation.navigate('Pedidos', { status : 'Aprovado' })}>
                <Image source={Requests} style={style.iconRequests}></Image>
                <View style={style.infoRequests}>
                  <Text style={style.infoRequestsNumber}>{statusAceitos}</Text>
                  <Text style={style.infoRequestsText}>Pedidos aprovados</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={[style.requests, style.backBlueThree]}
                onPress={() => navigation.navigate('Pedidos', { status : 'Saiu para entrega' })}>
                <Image source={Requests} style={style.iconRequests}></Image>
                <View style={style.infoRequests}>
                  <Text style={style.infoRequestsNumber}>{statusTransporte}</Text>
                  <Text style={style.infoRequestsText}>Pedidos em transporte</Text>
                </View>
              </TouchableOpacity>

              <View style={style.optionsMenu}>
                <TouchableOpacity
                  style={style.optionMenu}
                  onPress={() => navigation.navigate('Pedidos', { status : 'Todos' })}>
                  <Image
                    source={ListRequests}
                    style={style.iconMenu}
                    resizeMode="contain" />
                  <Text style={style.textMenu}>Todos pedidos</Text>
                </TouchableOpacity>


                <TouchableOpacity
                  style={style.optionMenu}
                  onPress={() => navigation.navigate('ProductList')}>
                  <Image
                    source={Products}
                    style={style.iconMenu}
                    resizeMode="contain" />
                  <Text style={style.textMenu}>Produtos</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={style.optionMenu}
                  onPress={() => navigation.navigate('Category')}>
                  <Image
                    source={Categories}
                    style={style.iconMenu}
                    resizeMode="contain" />
                  <Text style={style.textMenu}>Categorias</Text>
                </TouchableOpacity>

                <TouchableOpacity style={style.optionMenu}>
                  <Image
                    source={Information}
                    style={style.iconMenu}
                    resizeMode="contain" />
                  <Text style={style.textMenu}>Meus dados</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
      :
        <Loading />
      }

    </SafeAreaView>
  );
}
