import React, {useState, useEffect, useCallback} from 'react';
import {
  Image,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import axios from 'axios';

//API
import {SELECT_ONE_BUY, SELECT_BUY_ITEMS, UPDATE_STATUS_BUY} from '../../../config/api';

//STYLE
import style from './style';
import Photo from '../../../assets/images/package.png'

//COMPONENTS
import Header from '../../../Components/Header';
import Loading from '../../../Components/Loading';

import masks from '../../../utils/masks';

function OrderData() {
  const route = useRoute();
  const navigation = useNavigation();
  const [compra, setCompra] = useState(route.params.item);
  const [dadoscompra, setDadosCompra] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [status, setStatus] = useState(route.params.item.status_atual);
  const [carregado, setCarregado] = useState(false);

  const listaStatus = [
    { id: 0, nome : 'Realizado' },
    { id: 1, nome : 'Aprovado' },
    { id: 2, nome : 'Saiu para entrega' },
    { id: 3, nome : 'Entregue' },
    { id: 4, nome : 'Cancelado' },
  ];

  useEffect(() => {
    carrega();
  }, []);

  async function carrega() {
    setCarregado(false);
    await dadosCompra();
    await dadosProduto();
    setCarregado(true);
  }

  const adicionaZero = (numero) => numero <= 9 ? "0" + numero : numero;

  async function dadosCompra() {
    const resposta = await axios.post(SELECT_ONE_BUY, {
      id: compra.id,
      id_usuario: compra.id_usuario,
    });
    if (resposta.data.error === null) {
      setDadosCompra(resposta.data.compras);
    } else {
      Alert.alert('Ops!!', 'ALgo deu errado, tente novamente mais tarde.');
    }
  }

  async function dadosProduto() {
    const resposta = await axios.post(SELECT_BUY_ITEMS, {
      id_compra: compra.id,
    });
    if (resposta.data.error === null) {
      setProdutos(resposta.data.itemcompra);
    } else {
      Alert.alert('Ops!!', 'ALgo deu errado, tente novamente mais tarde.');
    }
  }

  async function mudaStatus(status) {
    Alert.alert(
      "Confimação",
      'Tem certeza que deseja mudar o status do pedido para "'+status+'"?',
      [
        {
          text: "Sim",
          onPress: async () => {
            if(status === 'Cancelado') {
              navigation.navigate('JustificativaCancelamento');
            } else {
              let dataAtual = new Date();
              let diaAtual = (adicionaZero(dataAtual.getDate().toString()) + "/" + (adicionaZero(dataAtual.getMonth()+1).toString()) + "/" + dataAtual.getFullYear());
              let horaAtual = (adicionaZero(dataAtual.getHours()) + ":" + adicionaZero(dataAtual.getMinutes()) + ":" + adicionaZero(dataAtual.getSeconds()));

              const resposta = await axios.post(UPDATE_STATUS_BUY, {
                id : compra.id,
                id_usuario : compra.usuario.id,
                status_atual: status,
                hora : horaAtual,
                data : diaAtual,
              });

              if (resposta.data.error === null) {
                // console.log(resposta.data.compras);
                Alert.alert("Sucesso", "Status do pedido atualizado");
                setStatus(status);
              } else {
                Alert.alert('Erro', 'Algo deu errado, tente novamente mais tarde.');
              }
            }
          }
        },
        {
          text: "Não",
          onPress: () => {
            return;
          },
          style: "cancel"
        },
      ],
      { cancelable: false }
    );
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    carrega().then(() => setRefreshing(false));
  }, []);

  const renderProducts = ({item}) => {
    return (
      <View style={[style.produt, {width: '100%'}]}>
        <Image
          style={{
            alignSelf: 'center',
          }}
          source={Photo}
        />
        <View style={style.productInfo}>
          <Text style={style.productName}>{item.nome}</Text>
          <Text style={style.productName}>
            QTD {item.quantidade}, UND R$ {masks.moneyFormat(item.valor)}
          </Text>
          <View style={style.subProductInfo}>
            <Text style={style.productPrice}>
              R$ {masks.moneyFormat(item.valor * item.quantidade)}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const Status = listaStatus.map((value, index)=>
    <Picker.Item label={value.nome} value={value.nome} key={index}/>
  );

  return (
    <SafeAreaView style={style.container}>
      {
        carregado ?
        <>
        <Header title={"Nº Pedido 000"+dadoscompra.id} />
        <View style={style.body}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={produtos}
            keyExtractor={(item) => String(item.id)}
            ListHeaderComponent={() => (
              <View style={style.part}>
                  <Text style={style.textModality}>Status</Text>

                  <View style={{
                    borderWidth: 1,
                    borderColor: "#899DAC",
                    borderRadius: 10,
                    paddingLeft: 15
                  }}>
                    <Picker
                      selectedValue={status}
                      onValueChange={itemValue => {
                        mudaStatus(itemValue);
                      }}
                      dropdownIconColor="#1389DF"
                    >
                      {Status}
                    </Picker>
                  </View>
                </View>
            )}
            renderItem={renderProducts}
            ListFooterComponent={() => (
              <View>
                <View style={style.part}>
                  <Text style={style.textModality}>Cliente</Text>
                  <Text style={style.productName}>
                    Nome: {compra.usuario.nome}
                  </Text>
                  <Text style={style.productName}>
                    E-mail: {compra.usuario.email}
                  </Text>
                  <Text style={style.productName}>
                    Celular: {compra.usuario.celular}
                  </Text>
                </View>

                <View style={style.part}>
                  <Text style={style.textModality}>Entrega</Text>
                  <Text style={style.titleAdress}>Destino do(s) produto(s)</Text>
                  <Text style={style.itemAdress}>
                    {dadoscompra.rua}, {dadoscompra.numero},{' '}
                    {dadoscompra.bairro}, { dadoscompra.complemento ? dadoscompra.complemento+', ' : ''}
                    {dadoscompra.cidade}, {dadoscompra.estado}
                  </Text>
                </View>

                <View style={style.part}>
                  <Text style={style.textModality}>Frete</Text>
                  <Text style={style.productName}>
                    Modalidade : {dadoscompra.modalidade_frete}
                  </Text>
                  <Text style={style.productName}>
                    Valor: R$ {masks.moneyFormat(dadoscompra.valor_frete)}
                  </Text>
                </View>

                <View style={style.part}>
                  <Text style={style.textModality}>Pagamento</Text>
                  {
                    (dadoscompra.troco && dadoscompra.troco > 0.0)?
                      <View>
                        <Text style={style.productName}>
                            Dinheiro
                          </Text>
                        <Text style={style.productName}>
                          Valor: R$ {masks.moneyFormat(dadoscompra.pagamento_dinheiro)}
                        </Text>
                      </View>
                    :
                      (dadoscompra.taxa_pagamento === 1.0) ?
                        <View>
                          <Text style={style.productName}>
                            Cartão de Débito
                          </Text>
                        </View>
                      :
                        <View>
                          <Text style={style.productName}>
                            Cartão de Crédito
                          </Text>
                        </View>
                  }
                </View>

                <View style={style.part}>
                  <Text style={style.textModality}>Total compra</Text>
                  <Text style={style.titleAdress}>
                    R$ {masks.moneyFormat(dadoscompra.total)}
                  </Text>
                </View>

                {
                  (dadoscompra.troco && dadoscompra.troco > 0.0)?
                    <View style={style.part}>
                      <Text style={style.textModality}>Troco</Text>
                      <Text style={style.productName}>
                        R$ {masks.moneyFormat(dadoscompra.troco)}
                      </Text>
                    </View>
                  :
                    <></>
                }
              </View>
            )}
            ListEmptyComponent={() => (
              <View>
                <Text>Produtos indisponíveis no momento :(</Text>
              </View>
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={["#1389DF", "#1389DF", "#1389DF"]} />
            }
          />
        </View>
      </>
      :
          <Loading />
      }
    </SafeAreaView>
  );
}

export default OrderData;
