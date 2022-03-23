import React, {useState, createRef, useEffect} from 'react';
import {
	View,
	Text,
	SafeAreaView,
	ScrollView,
	Image,
	TouchableOpacity,
	Alert,
	Platform,
	PermissionsAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';
import {
	launchCameraAsync,
	launchImageLibraryAsync,
} from 'expo-image-picker';
import axios from 'axios';

//STYLE
import style from './style';

// COMPONENTS
import Header from '../../../Components/Header';

//ASSETS
import image from '../../../assets/images/package.png';
import gallery from '../../../assets/icons/gallery.png';
import camera from '../../../assets/icons/camera.png';
import masks from '../../../utils/masks';

//API
import { CATEGORIES_ALL, UPDATE_PRODUCT, REGISTER_PHOTO_PRODUCT, PHOTO_PRODUCT } from '../../../config/api';

export default function ProductEdition() {
	const navigation = useNavigation();
	const route = useRoute();

	const [nome, setNome] = useState(route.params.item.nome);
	const [preco, setPreco] = useState(masks.moneyFormat(route.params.item.valor));
	const [quantidade, setQuantidade] = useState(String(route.params.item.quantidade));
	const [detalhes, setDetalhes] = useState(route.params.item.detalhes);
	const [dadosImagem, setDadosImagem] = useState(route.params.item.foto);

	const [categoria, setCategoria] = useState(String(route.params.item.id_categoria));
	const [listaCategorias, setListaCategorias] = useState([]);

	console.log(route.params.item);

	const precoInput = createRef();
	const quantidadeInput = createRef();
	const detalhesInput = createRef();


	useEffect(() => {
		navigation.addListener('focus', () => buscarCategorias());
    }, []);

    const buscarCategorias = async () => {
        const resposta = await axios.get(CATEGORIES_ALL);
        if (resposta.data.error == null) {
            const { categorias } = resposta.data;
            setListaCategorias(categorias);
        }
        else {
            Alert.alert("Erro", "Não foi possível carregar as categorias");
        }
    }

	const MinhasCategorias = listaCategorias.map((value, index)=>
        <Picker.Item label={value.nome} value={value.id.toString()} key={index}/>
    );

	const requestCameraPermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.CAMERA, {
						title: 'Permissão da câmera',
						message: 'O aplicativo precisa ter permissão para usar a câmera',
					},
				);
				// If CAMERA Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				return false;
			}
		} else
			return true;
	};

	const requestExternalWritePermission = async () => {
		if (Platform.OS === 'android') {
			try {
				const granted = await PermissionsAndroid.request(
				PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,{
					title: 'Permissão de gravação de armazenamento externo',
					message: 'O aplicativo precisa ter permissão para gravar no armazenamento externo',
				});
				// If WRITE_EXTERNAL_STORAGE Permission is granted
				return granted === PermissionsAndroid.RESULTS.GRANTED;
			} catch (err) {
				console.warn(err);
				alert('Write permission err', err);
			}
			return false;
		} else
			return true;
	};

	const captureImage = async () => {
		let options = {
			mediaType: 'photo',
			maxWidth: 800,
			maxHeight: 1000,
			quality: 1,
			saveToPhotos: true,
		};
		let isCameraPermitted = await requestCameraPermission();
		let isStoragePermitted = await requestExternalWritePermission();
		if (isCameraPermitted && isStoragePermitted) {
			launchCameraAsync(options, (response) => {
				console.log('Response = ', response);

				if (response.didCancel) {
					console.log('User cancelled camera picker');
					return;
				} else if (response.errorCode == 'camera_unavailable') {
					Alert.alert("Atenção", 'Câmera não disponível no dispositivo');
					return;
				} else if (response.errorCode == 'permission') {
					Alert.alert('Permissão não concedida');
					return;
				} else if (response.errorCode == 'others') {
					console.log(response.errorMessage);
					Alert.alert("Erro", "Algo inesperado aconteceu")
					return;
				}
				console.log('base64 -> ', response.base64);
				console.log('uri -> ', response.uri);
				console.log('width -> ', response.width);
				console.log('height -> ', response.height);
				console.log('fileSize -> ', response.fileSize);
				console.log('type -> ', response.type);
				console.log('fileName -> ', response.fileName);
				setDadosImagem(response);
			});
		}
	};

	const chooseFile = () => {
		let options = {
			mediaType: 'photo',
			maxWidth: 800,
			maxHeight: 1000,
			quality: 1,
		};
		launchImageLibraryAsync(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled camera picker');
				return;
			} else if (response.errorCode == 'camera_unavailable') {
				Alert.alert("Atenção", 'Câmera não disponível no dispositivo');
				return;
			} else if (response.errorCode == 'permission') {
				Alert.alert('Permissão não concedida');
				return;
			} else if (response.errorCode == 'others') {
				console.log(response.errorMessage);
				Alert.alert("Erro", "Algo inesperado aconteceu")
				return;
			}
			console.log('base64 -> ', response.base64);
			console.log('uri -> ', response.uri);
			console.log('width -> ', response.width);
			console.log('height -> ', response.height);
			console.log('fileSize -> ', response.fileSize);
			console.log('type -> ', response.type);
			console.log('fileName -> ', response.fileName);
			setDadosImagem(response);
		});
	};

	async function enviarFoto() {
		let dados = new FormData();

		dados.append('foto', {
			uri : dadosImagem.uri,
			name : dadosImagem.fileName,
			type : dadosImagem.type,
		});
		const resposta = await axios.post(REGISTER_PHOTO_PRODUCT, dados);

		if(resposta.data.error === null) {
			console.log(resposta.data.caminhoFoto);
			const { caminhoFoto } = resposta.data;
			return caminhoFoto;
		} else
			return false;

	}

	async function atualizar() {
		if(nome.length <= 0) {
			Alert.alert("Atenção", "Nome do produto não pode ser vazio");
			return;
		}

		if(categoria.length <= 0) {
			Alert.alert("Atenção", "Categoria do produto não pode ser vazia");
			return;
		}

		if(preco.length <= 0) {
			Alert.alert("Atenção", "Preço do produto não pode ser vazio");
			return;
		}

		if(quantidade.length <= 0) {
			Alert.alert("Atenção", "Quantidade do produto não pode ser vazia");
			return;
		}

		if(detalhes.length <= 0) {
			Alert.alert("Atenção", "Detalhes do produto não pode ser vazio");
			return;
		}

		let caminhoFoto = '';

		if(dadosImagem !== route.params.item.foto) {
			caminhoFoto = await enviarFoto();
			if(caminhoFoto === false) {
				Alert.alert("Erro", "Não foi possíve salvar imagem");
			}
		}

		const valor = masks.moneyRevert(preco);

		const resposta = await axios.post(UPDATE_PRODUCT, {
			id : route.params.item.id,
			nome,
			id_categoria : parseInt(categoria),
			detalhes,
			valor,
			foto : (caminhoFoto.length > 0) ? PHOTO_PRODUCT + caminhoFoto :  dadosImagem,
			quantidade,
		});

		if(resposta.data.error === null) {
			Alert.alert("Sucesso", "Dados do produto atualizado");
			navigation.goBack();
		} else {
			Alert.alert("Erro", "Produto não pôde ser atualizado");
		}
	}

	return (
		<SafeAreaView style={style.container}>
			<ScrollView>
				<Header title="Edição de produto" />

				<View style={style.backPhoto} >
					<Image
						source={
							(typeof(dadosImagem) === "object") ?
								dadosImagem
							:
								(typeof(dadosImagem) === "string") ?
									{ uri : dadosImagem }
								:
									image
						}
						resizeMode='cover'
						style={dadosImagem ? style.photo : "" } />
				</View>

				<View style={style.modePhoto}>
					<TouchableOpacity style={style.modeBlock} onPress={captureImage}>
						<Image source={camera} style={style.modeIcon} resizeMode='contain' />
						<Text style={style.modeText}>
							Abrir câmera
						</Text>
					</TouchableOpacity>

					<TouchableOpacity style={style.modeBlock} onPress={chooseFile}>
						<Image source={gallery} style={style.modeIcon} resizeMode='contain' />
						<Text style={style.modeText}>
							Abrir galeria
						</Text>
					</TouchableOpacity>
				</View>

				<View style={style.containerInput}>
					<TextInput
						label="Nome"
						style={style.input}
						mode="flat"
						onChangeText={(text) => setNome(text)}
						value={nome}
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
					/>

					<View style={[style.input, {
						borderBottomWidth: 1,
						borderBottomColor: "#c5c5c5",
					}]}>
						<Picker
							selectedValue={categoria}
							onValueChange={itemValue => {
								precoInput.current.focus() // foca no input de preco
								itemValue === "N" ? navigation.navigate('Login') : setCategoria(itemValue)
							}}
							mode='dropdown'
							dropdownIconColor="#1389DF"
							style={{
								color:"#9d9d9d",
							}}
						>
							<Picker.Item label="Selecione" value="" />
							{MinhasCategorias}
							<Picker.Item label="Adicionar nova" value="N" />
						</Picker>
					</View>

					<View style={{
						flexDirection:'row',
						justifyContent: 'space-between',
						width: '85%'
					}}>
						<View style={style.inputSide}>
							<TextInput
								label="Preço"
								style={[style.input, {
									width:'100%',
									flexShrink:1
								}]}
								mode="flat"
								onChangeText={(text) => setPreco(masks.moneyInput(text))}
								value={preco}
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								returnKeyType="next"
								onSubmitEditing={() => quantidadeInput.current.focus()}
								blurOnSubmit={false}
								ref={precoInput}
							/>
						</View>

						<View style={style.inputSide}>
							<TextInput
								label="Quantidade"
								style={[style.input, {
									width:'100%',
									flexShrink:1
								}]}
								mode="flat"
								onChangeText={(text) => setQuantidade(text)}
								value={quantidade}
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								returnKeyType="next"
								onSubmitEditing={() => detalhesInput.current.focus()}
								blurOnSubmit={false}
								ref={quantidadeInput}
							/>
						</View>


					</View>

					<TextInput
						label="Detalhes"
						multiline={true}
			            numberOfLines={6}
						style={style.input}
						mode="flat"
						onChangeText={(text) => setDetalhes(text)}
						value={detalhes}
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						ref={detalhesInput}
					/>

					<TouchableOpacity
						style={[style.defaultButton,{
								marginBottom: 20,
							},
						]}
						onPress={atualizar}
					>
						<Text style={style.textDefaultButton}>ATUALIZAR</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};