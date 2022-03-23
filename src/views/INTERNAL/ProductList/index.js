import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
  RefreshControl,
} from 'react-native';
import style from './style';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

// COMPONENTS
import Loading from '../../../Components/Loading';
import Header from '../../../Components/Header';
import masks from '../../../utils/masks';

//API
import {PRODUCTS_ALL, DELETE_PRODUCT} from '../../../config/api';

export default function ProductList() {
	const navigation = useNavigation();
	const [produtos, setProdutos] = useState([]);
	const [carregado, setCarregado] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	useEffect(() => {
  		navigation.addListener('focus', () => listaProdutos());
  	}, []);

	const listaProdutos = async () => {
		setCarregado(false);
		const resposta = await axios.get(PRODUCTS_ALL);
		if (resposta.data.error == null) {
			setProdutos(resposta.data.produtos);
			setCarregado(true)
		} else {
			Alert.alert('Erro', 'Algo deu errado ao buscar produtos.');
		}
	};

	async function removerProduto(id, foto) {
		const resposta = await axios.post(DELETE_PRODUCT, {
			id,
			foto
		});
		if (resposta.data.error == null) {
			Alert.alert("Sucesso", "Produto excluído");
			onRefresh();
		} else {
			Alert.alert('Erro', 'Algo deu errado ao buscar produtos.');
		}
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		listaProdutos().then(() => setRefreshing(false));
	}, []);

	function renderListProducts({ item }) {
		return (
			<View style={style.produt}>
				<Image
					style={style.productImage}
					source={{ uri: item.foto }}
				/>
				<View style={style.productInfo}>
					<Text style={style.productName}>
						{String(item.nome)}
					</Text>

					<View style={style.subProductInfoP}>
						<Text style={style.productPrice}>
							R$ {masks.moneyFormat(item.valor)}
						</Text>
						<Text style={style.productAmount}>
							{item.quantidade} unidade (s)
						</Text>
					</View>

					<View style={style.subProductInfoP}>
						<TouchableOpacity
							onPress={() => removerProduto(item.id, item.foto)}
						>
							<Text style={[style.action, style.remove]}>
								Excluir
						</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => navigation.navigate('ProductEdition', { item })}
						>
							<Text style={[style.action, style.change]}>
								Editar
						</Text>
						</TouchableOpacity>
					</View>
				</View>
			</View>
		)
	}

	return (
		<SafeAreaView style={style.container}>
			<Header title="Meus produtos" />
		{
			carregado == true ?
				<FlatList
					data={produtos}
					keyExtractor={(item, index) => String(index)}
					renderItem={renderListProducts}
					ListFooterComponent={() => (
						<View>
							<TouchableOpacity
								style={style.button}
								onPress={() => navigation.navigate('ProductRegistration')}
							>
								<Text style={style.textDefaultButton}>CADASTRAR NOVO</Text>
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
