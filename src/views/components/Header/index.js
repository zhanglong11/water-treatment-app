import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Header = props => {

    return (<View style={styles.titleWrapper}>
        <View style={styles.left}>{props.left ? props.left : <Text/>}</View>
        <Text numberOfLines={1} style={styles.titleName}>{props.title || '标题'}</Text>
        <View style={styles.right}>{props.right ? props.right : <Text/>}</View>
    </View>);
};

const styles = StyleSheet.create({
    titleWrapper: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#132E7D',
        paddingLeft: 10,
        paddingRight: 10,
    },
    titleName: {
        color: '#fff',
        fontSize: 24,
        flex: 1,
        textAlign: 'center',
    },
    left: {
        width: 80,

    },
    right: {
        alignItems: 'flex-end',
        width: 80,
    },
});

export default Header;


