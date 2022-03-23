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
import {Picker} from '@react-native-picker/picker';
import {TextInput} from 'react-native-paper';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
	launchCamera,
	launchImageLibrary
} from 'react-native-image-picker';
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
import { CATEGORIES_ALL, REGISTER_PRODUCT, REGISTER_PHOTO_PRODUCT, PHOTO_PRODUCT } from '../../../config/api';

export default function ProductRegistration() {
	const navigation = useNavigation();
	const [nome, setNome] = useState('');
	const [preco, setPreco] = useState('');
	const [quantidade, setQuantidade] = useState('');
	const [detalhes, setDetalhes] = useState('');
	const [categoria, setCategoria] = useState('');
	const [listaCategorias, setListaCategorias] = useState([]);
	const [dadosImagem, setDadosImagem] = useState();

	const nomeInput = createRef();
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
			launchCamera(options, (response) => {
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
		launchImageLibrary(options, (response) => {
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

	async function cadastrar() {

		if(nome.length <= 0) {
			Alert.alert("Atenção", "Nome do produto não pode ser vazio");
			nomeInput.current.focus();
			return;
		}

		if(categoria.length <= 0) {
			Alert.alert("Atenção", "Selecione uma categoria");
			return;
		}

		if(preco.length <= 0) {
			Alert.alert("Atenção", "Preço do produto não pode ser vazio");
			precoInput.current.focus();
			return;
		}

		if(quantidade.length <= 0) {
			quantidadeInput.current.focus();
			Alert.alert("Atenção", "Quantidade do produto não pode ser vazia");
			return;
		}

		if(detalhes.length <= 0) {
			detalhesInput.current.focus();
			Alert.alert("Atenção", "Detalhes do produto não pode ser vazio");
			return;
		}

		let caminhoFoto = '';

		if(dadosImagem) {
			caminhoFoto = await enviarFoto();
			if(caminhoFoto === false) {
				Alert.alert("Erro", "Não foi possíve salvar imagem");
				caminhoFoto = 'default.png';
			}
		} else {
			caminhoFoto = 'default.png';
		}

		const valor = masks.moneyRevert(preco);

		const respostaCadastro = await axios.post(REGISTER_PRODUCT, {
			nome,
			id_categoria : parseInt(categoria),
			detalhes,
			valor,
			foto : PHOTO_PRODUCT + caminhoFoto,
			quantidade,
		});

		if(respostaCadastro.data.error === null) {
			Alert.alert("Sucesso", "Produto cadastrado");
			navigation.goBack();
		} else {
			Alert.alert("Erro", "Produto não pôde ser cadastrado");
		}
	}

	return (
		<SafeAreaView style={style.container}>
			<ScrollView>
				<Header title="Cadastro de produto" />

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
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setNome(text)}
						ref={nomeInput}
					/>

					<View style={[style.input, {
						borderBottomWidth: 1,
						borderBottomColor: "#c5c5c5",
					}]}>
						<Picker
							selectedValue={categoria}
							onValueChange={itemValue => {
								precoInput.current.focus() // foca no input de preco
								itemValue === "N" ? navigation.navigate('NewCategory') : setCategoria(itemValue)
							}}
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
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setPreco(masks.moneyInput(text))}
								returnKeyType="next"
								onSubmitEditing={() => quantidadeInput.current.focus()}
								blurOnSubmit={false}
								ref={precoInput}
								value={preco}
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
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setQuantidade(text.replace(/[^0-9]/g, ''))}
								returnKeyType="next"
								onSubmitEditing={() => detalhesInput.current.focus()}
								blurOnSubmit={false}
								ref={quantidadeInput}
								value={quantidade}
							/>
						</View>
					</View>

					<TextInput
						label="Detalhes"
						multiline={true}
			            numberOfLines={6}
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setDetalhes(text)}
						ref={detalhesInput}
					/>

					<TouchableOpacity
						style={[style.defaultButton,{
								marginBottom: 20,
							},
						]}
						onPress={cadastrar}
					>
						<Text style={style.textDefaultButton}>SALVAR</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};