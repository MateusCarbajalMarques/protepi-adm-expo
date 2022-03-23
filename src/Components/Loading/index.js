import React from 'react';
import {
    View,
    ActivityIndicator
} from 'react-native';

export default function Loading() {
    return(
        <View
            style={{
                flex :1,
                backgroundColor: '#fff',
                alignItems: 'center',
                justifyContent :'center',
            }}
        >
            <ActivityIndicator size="large" color="#1389DF" />
        </View>
    )
}