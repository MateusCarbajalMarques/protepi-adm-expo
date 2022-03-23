import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

//EXTERNAL
import Login from './views/EXTERNAL/Login';
import CadastroEmpresa from './views/EXTERNAL/Cadastro';
// INTERNAL
import ProductList from './views/INTERNAL/ProductList';
import Dashboard from './views/INTERNAL/Dashboard';
import ProductRegistration from './views/INTERNAL/ProductRegistration';
import ProductEdition from './views/INTERNAL/ProductEdition';
import Pedidos from './views/INTERNAL/Pedidos';
import NewCategory from './views/INTERNAL/NewCategory';
import JustificativaCancelamento from './views/INTERNAL/JustificativaCancelamento';
import Category from './views/INTERNAL/Category';
import OrderData from './views/INTERNAL/OrderData';




const AppStack = createNativeStackNavigator();

export default function Routes() {
    return (
      <NavigationContainer>
        <AppStack.Navigator
          initialRouteName="Login"
          screenOptions={{headerShown: false}}>
          <AppStack.Screen name="Login" component={Login} />
          <AppStack.Screen name="CadastroEmpresa" component={CadastroEmpresa} />
          <AppStack.Screen name="ProductList" component={ProductList} />

          <AppStack.Screen name="Dashboard" component={Dashboard} />

          <AppStack.Screen name="ProductRegistration" component={ProductRegistration} />

          <AppStack.Screen name="Pedidos" component={Pedidos} />

          <AppStack.Screen name="NewCategory" component={NewCategory} />

          <AppStack.Screen name="JustificativaCancelamento" component={JustificativaCancelamento} />

          <AppStack.Screen name="Category" component={Category} />

          <AppStack.Screen name="ProductEdition" component={ProductEdition} />

          <AppStack.Screen name="OrderData" component={OrderData} />

        </AppStack.Navigator>
      </NavigationContainer>
    );
}