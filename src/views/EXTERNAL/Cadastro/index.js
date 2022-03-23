import React, { useState, createRef, useEffect, useRef } from 'react';
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
import { Picker } from '@react-native-picker/picker';
import { TextInput } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
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
import { CATEGORIES_ALL, REGISTER_PRODUCT, REGISTER_PHOTO_PRODUCT, PHOTO_PRODUCT, REGISTER_LOJA } from '../../../config/api';
import { color } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

export default function CadastroEmpresa() {
	const navigation = useNavigation();

	//Informações da empresa 
	const [razaoSocial, setrazaoSocial] = useState('');
	const [cnpj, setcnpj] = useState('');
	const [insEstadual, setinsEstadual] = useState('');
	const [endereco, setendereco] = useState('');
	const [cep, setcep] = useState('');
	const [whatsapp, setwhatsapp] = useState('');
	const [email, setEmail] = useState('');

	//Informações do Dono
	const [nome, setnome] = useState('');
	const [cpf, setcpf] = useState('');
	const [rg, setrg] = useState('');
	const [whatsappDono, setwhatsappDono] = useState('');
	const [senha, setsenha] = useState('');

	

	const [listaCategorias, setListaCategorias] = useState([]);
	const [dadosImagem, setDadosImagem] = useState();

	const razaoSocialInput = createRef();
	const cnpjInput = createRef();
	const insEstadualInput = createRef();
	const enderecoInput = createRef();
	const cepInput = createRef();
	const whatsappInput = createRef();
	const emailInput = createRef();

	const nomeInput = createRef();
	const cpfInput = createRef();
	const rgInput = createRef();
	const whatsappDonoInput = createRef();
	const senhaInput = createRef();


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
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
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
			uri: dadosImagem.uri,
			name: dadosImagem.fileName,
			type: dadosImagem.type,
		});
		const resposta = await axios.post(REGISTER_PHOTO_PRODUCT, dados);

		if (resposta.data.error === null) {
			console.log(resposta.data.caminhoFoto);
			const { caminhoFoto } = resposta.data;
			return caminhoFoto;
		} else
			return false;

	}

	async function cadastrar() {
	

		if (razaoSocial.length <= 0) {
			Alert.alert("Atenção", "Campo razão social não pode ser vazio");
			razaoSocialInput.current.focus();
			return;
		}

		if (cnpj.length <= 0) {
			Alert.alert("Atenção", "Campo cnpj não pode ser vazio");
			cnpjInput.current.focus();
			return;
		}

		if (endereco.length <= 0) {
			enderecoInput.current.focus();
			Alert.alert("Atenção", "Campo endereço não pode ser vazio");
			return;
		}

		if (cep.length <= 0) {
			cepInput.current.focus();
			Alert.alert("Atenção", "Campo cep não pode ser vazio");
			return;
		}

		if (whatsapp.length <= 0) {
			whatsappInput.current.focus();
			Alert.alert("Atenção", "Campo whatsApp Empresa não pode ser vazio");
			return;
		}


		if (email.length <= 0) {
			emailInput.current.focus();
			Alert.alert("Atenção", "Campo email não pode ser vazio");
			return;
		}


		if (nome.length <= 0) {
			nomeInput.current.focus();
			Alert.alert("Atenção", "Campo nome não pode ser vazio");
			return;
		}
		if (cpf.length <= 0) {
			cpfInput.current.focus();
			Alert.alert("Atenção", "Campo cpf não pode ser vazio");
			return;
		}
		if (whatsappDono.length <= 0) {
			whatsappDonoInput.current.focus();
			Alert.alert("Atenção", "Campo whatsapp Dono não pode ser vazio");
			return;
		}

		if (rg.length <= 0) {
			rgInput.current.focus();
			Alert.alert("Atenção", "Campo rg não pode ser vazio");
			return;
		}

		if (senha.length <= 0) {
			senhaInput.current.focus();
			Alert.alert("Atenção", "Campo senha não pode ser vazio");
			return;
		}
		

		let caminhoFoto = '';

		if (dadosImagem) {
			caminhoFoto = await enviarFoto();
			if (caminhoFoto === false) {
				Alert.alert("Erro", "Não foi possíve salvar imagem");
				caminhoFoto = 'default.png';
			}
		} else {
			caminhoFoto = 'default.png';
		}

		const respostaCadastro = await axios.post(REGISTER_LOJA, {
			
			razao_social:razaoSocial,
			cnpj,
			ins_estadual:insEstadual,
			endereco,
			cep,
			whatsapp,
			email,
			nome_responsavel: nome,
			cpf,
			rg,
			telefone: whatsappDono,
			foto: PHOTO_PRODUCT + caminhoFoto,
			senha
			
		});

		if (respostaCadastro.data.error === null) {
			Alert.alert("Sucesso", "Empresa cadastrado");
			navigation.goBack();
		} else {
			Alert.alert("Erro", "Empresa não pôde ser cadastrado");
		}
	}

	return (
		<SafeAreaView style={style.container}>
			<ScrollView>
				<Header title="Cadastro de Empresa" />

				<View style={style.backPhoto} >
					<Image
						source={
							(typeof (dadosImagem) === "object") ?
								dadosImagem
								:
								(typeof (dadosImagem) === "string") ?
									{ uri: dadosImagem }
									:
									image
						}
						resizeMode='cover'
						style={dadosImagem ? style.photo : ""} />
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
					<Text style={style.productNameL}>Infomações sobre empresa</Text>
					<TextInput
						label="Razão social"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setrazaoSocial(text)}
						ref={razaoSocialInput}
					/>

					<TextInput
						label="CNPJ"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setcnpj(text)}
						ref={cnpjInput}
					/>

					<TextInput
						label="Inscrição Estadual"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setinsEstadual(text)}
						ref={insEstadualInput}
					/>

					<TextInput
						label="Rua, Bairro e Nº"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setendereco(text)}
						ref={enderecoInput}
					/>



					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '85%'
					}}>
						<View style={style.inputSide}>
							<TextInput
								label="CEP"
								style={[style.input, {
									width: '100%',
									flexShrink: 1
								}]}
								mode="flat"
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setcep(text)}
								ref={cepInput}
								
							/>
						</View>

						<View style={style.inputSide}>
							<TextInput
								label="WhatsApp"
								style={[style.input, {
									width: '100%',
									flexShrink: 1
								}]}
								mode="flat"
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setwhatsapp(text)}
								ref={whatsappInput}
							/>
						</View>
					</View>

					<TextInput
						label="E-mail"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setEmail(text)}
						ref={emailInput}
					/>
					<Text style={style.productNameL}>Infomações sobre responsável da empresa</Text>
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
						onChangeText={(text) => setnome(text)}
						ref={nomeInput}
					/>


					<TextInput
						label="CPF"
						style={style.input}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setcpf(text)}
						ref={cpfInput}
					/>

					<View style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						width: '85%'
					}}>
						<View style={style.inputSide}>
							<TextInput
								label="RG"
								style={[style.input, {
									width: '100%',
									flexShrink: 1
								}]}
								mode="flat"
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setrg(text)}
								ref={rgInput}
							/>
						</View>

						<View style={style.inputSide}>
							<TextInput
								label="WhatsApp"
								style={[style.input, {
									width: '100%',
									flexShrink: 1
								}]}
								mode="flat"
								theme={{
									colors: {
										primary: '#899DAC',
										background: 'transparent',
									},
								}}
								keyboardType={Platform.OS === 'ios' ? 'number-pad' : 'numeric'}
								onChangeText={(text) => setwhatsappDono(text)}
								ref={whatsappDonoInput}
							/>
						</View>
					</View>

					<TextInput
						label="Senha para login"
						style={style.input}
						secureTextEntry={true}
						mode="flat"
						theme={{
							colors: {
								primary: '#899DAC',
								background: 'transparent',
							},
						}}
						onChangeText={(text) => setsenha(text)}
						ref={senhaInput}
					/>




					<TouchableOpacity
						style={[style.defaultButton, {
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