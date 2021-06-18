import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import Iconfont from '../IconBasic'

const SearchBar = (props) => {
    const [value,setValue]=useState(props.value||'')

    const onChange = (value) => {
        setValue(value)
        if (props.onChange) {
            props.onChange(value);
        }
    };

    const submit=(e,text)=>{
        console.log(text);
        if(props.query){
            props.query(text)
        }
    }

    return (
        <View style={{...props.wrapperStyle}}>
            <TextInput
                style={{...styles.input,...props.style}}
                placeholder={props.placeholder||''}
                placeholderTextColor={props.placeholderTextColor||'#fff'}
                value={value}
                onChange={value => {
                    onChange(value);
                }}
                onSubmitEditing={submit}
            />
            <Iconfont style={styles.icon} name={'search'} size={20} color={props.placeholderTextColor||'#fff'}/>
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height:36,
        paddingLeft:50,
        borderRadius: 20,
        fontSize:14,
        backgroundColor: '#405696',
        paddingTop:0,
        paddingBottom:0,
        color:'#fff'
    },
    icon:{
        position: 'absolute',
        top:8,
        left:20,
    }
});

export default SearchBar;

