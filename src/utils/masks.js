const masks ={
    phone: value => {
        return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{4})(\d)/, '$1-$2')
        .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
        .replace(/(-\d{4})\d+?$/, '$1')
    },
    cpf: value => {
        return value
            .replace(/\D/g, '')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d)/, '$1.$2')
            .replace(/(\d{3})(\d{1,2})/, '$1-$2')
            .replace(/(-\d{2})\d+?$/, '$1')
    },
    moneyInput : value => {
        let v = value.replace(/\D/g, '');
        v = ((v/100).toFixed(2) + '')
        .replace(".", ",")
        .replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,")
        .replace(/(\d)(\d{3}),/g, "$1.$2,");
        return v;
    },
    moneyRevert : value => {
        return parseFloat(value.replace('.', '').replace(',', '.'));
    },
    moneyFormat : (value) => {
        return parseFloat(value)
            .toFixed(2)
            .replace('.', ',')
            .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
    }
}

export default masks;