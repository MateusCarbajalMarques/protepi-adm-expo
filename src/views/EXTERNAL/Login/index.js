import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import style from './style';
import {useNavigation} from '@react-navigation/native';

import axios from 'axios';
import {connect} from 'react-redux';

//ASSETS
import LogoWhite from '../../../assets/images/logo.png';

//API
import { LOGIN_LOJA } from '../../../config/api';

//ARMAZENAMENTO NO REDUX
function addUsuario (usuario){
  return{
    type: 'SET_USUARIO',
    usuario,
  };
}

const Login = ({usuario, dispatch}) => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const [logando, setLogando] = useState(false); //VERIFICAR FUNCIONALIDADE MAIS TARDE

  const [validaEmail, setValidaEmail] = useState(false);
  const [validaSenha, setValidaSenha] = useState(false);
  const [mensageLogin, setMensagemLogin] = useState(false);

  async function loginAction() {
    setMensagemLogin(false);
    senha === '' ? setValidaSenha(true) : setValidaSenha(false);
    email === '' ? setValidaEmail(true) : setValidaEmail(false);

    if (email != '' && senha != '') {
      setLogando(true);
      const resposta = await axios.post(
        LOGIN_LOJA,
        {
          email,
          senha,
        },
      );
      console.log(resposta.data)
      if (resposta.data.error === null) {
        const aux = resposta.data.condutor;
        
        dispatch(addUsuario(aux));
        navigation.reset({
          routes: [{name: 'Dashboard'}],
        });
        console.log(aux);
      } else {
        setMensagemLogin(true);
      }

      setLogando(false);
    }
  }

  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <View style={style.compImage}>
          <Image style={style.image} source={LogoWhite} resizeMode="contain" />
          <Text style={style.texTitle}>ADMINISTRADOR</Text>
        </View>

        <Text
            style={
              mensageLogin
                ? [style.msgErrorLogin]
                : [style.msgErrorLogin, style.msgErroInvisible]
            }>
            Usuário ou senha inválidos.
          </Text>

        <View style={style.containerInput}>
          <TextInput
            style={style.input}
            label="E-mail"
            mode="flat"
            autoCapitalize='none'
            textContentType='emailAddress'
            keyboardType='email-address'
            autoCompleteType='email'
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(email) => setEmail(email)}
            returnKeyType="next"
            onSubmitEditing={() => senhaInput.focus()}
            blurOnSubmit={false}
          />

          <Text
            style={
              validaEmail
                ? [style.msgError]
                : [style.msgError, style.msgErroInvisible]
            }>
            Este campo não pode ficar vazio.
          </Text>

          <TextInput
            style={style.input}
            label="Senha"
            secureTextEntry={true}
            mode="flat"
            theme={{
              colors: {
                primary: '#899DAC',
                background: 'transparent',
              },
            }}
            onChangeText={(senha) => setSenha(senha)}
            ref={(input) => (senhaInput = input)}
          />

           <Text
            style={
              validaSenha
                ? [style.msgError]
                : [style.msgError, style.msgErroInvisible]
            }>
            Este campo não pode ficar vazio.
          </Text>

          <TouchableOpacity
            
           
            onPress={() => navigation.navigate('CadastroEmpresa')}
            >
            <Text style={style.textEmpresButton}>Cadastrar empresa</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={style.defaultButton}
             onPress={()=> loginAction()}
            
            >
            <Text style={style.textDefaultButton}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
export default connect((state) => ({usuarioState: state.usuario}))(Login);