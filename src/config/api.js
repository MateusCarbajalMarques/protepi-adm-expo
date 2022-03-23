//-----------------BASE URL API
//LOCAL
// export const BASE_API = 'http://192.168.0.8:3000/';

//PRODUCTION
// export const BASE_API = 'http://rosivancardoso.com.br/';

//PRODUCTION
export const BASE_API = 'http://192.168.1.103:3000/';

//------------------ROUTES USERS

export const LOGIN_ROUTE = BASE_API + 'usuarios/autenticacao';
export const CHECK_EMAIL = BASE_API + 'usuarios/verificaemail';
export const REGISTER_USER = BASE_API + 'usuarios/cadastro';
export const NEW_PASSWORD = BASE_API + 'usuarios/mudaSenha';
export const CHECK_CURRENT_PASSWORD = BASE_API + 'usuarios/senhaatual';
export const UPDATE_USER = BASE_API + 'usuarios/update';

//CART ITEMS
export const REGISTER_CART_ITEMS = BASE_API + 'itemcarrinhos/cadastro';
export const REGISTER_VERY_CART_ITEMS = BASE_API + 'itemcarrinhos/cadastromuitos';
export const DELETE_CART_ITEMS = BASE_API + 'itemcarrinhos/remove';
export const UPDATE_CART_ITEMS = BASE_API + 'itemcarrinhos/atualizacao';
export const SELECT_CART_ITEMS = BASE_API + 'itemcarrinhos/seleciona';

//------------------ROUTERS PRODUCTS
//VIEW ALL
export const PRODUCTS_ALL = BASE_API + 'produtos';

//BUY_ALL
export const SELECT_ALL_BUYS = BASE_API + 'compras';
export const BUY_ALL = BASE_API + 'compras/seleciona';
export const SELECT_ONE_BUY = BASE_API + 'compras/seleciona/unica';
export const UPDATE_STATUS_BUY = BASE_API + 'compras/update/status';
export const SELECT_ALL_BUYS_STATUS = BASE_API + 'compras/seleciona/status';


//DASHBOARD
export const COUNT_STATUS = BASE_API + 'compras/conta';

// BUY ITENS
export const REGISTER_VERY_BUY_ITEMS = BASE_API + 'itemcompras/cadastromuitos';
export const SELECT_BUY_ITEMS = BASE_API + 'itemcompras/seleciona';

//CATEGORIES
export const CATEGORIES_ALL = BASE_API + 'categorias';
export const CATEGORIES_ONE = BASE_API + 'categorias/select';
export const REGISTER_CATEGORY = BASE_API + 'categorias/cadastro';
export const UPDATE_CATEGORY = BASE_API + 'categorias/update';
export const DELETE_CATEGORY = BASE_API + 'categorias/delete';


//PRODUCTS
export const REGISTER_PRODUCT = BASE_API + 'produtos/cadastro';
export const REGISTER_PHOTO_PRODUCT = BASE_API + 'produtos/cadastro/foto';
export const PHOTO_PRODUCT = BASE_API + 'uploads/';
export const DELETE_PRODUCT = BASE_API + 'produtos/remocao';
export const UPDATE_PRODUCT = BASE_API + 'produtos/update';

export const REGISTER_LOJA = BASE_API + 'cadastro/lojas';
export const LOGIN_LOJA = BASE_API + 'loja/autenticacao';