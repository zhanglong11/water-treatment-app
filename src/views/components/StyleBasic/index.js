import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    fontGrey: {
        color: '#9D9D9D',
    },
    fontRed:{
        color:'#FF6259'
    },
    shadow:{
        shadowColor: '#eee',//阴影颜色
        shadowOpacity: .5,//阴影的透明度  0~1
        shadowOffset: {
            width: 2,
            height: 2
        },
        shadowRadius: 2,//阴影的扩散程度
        elevation: 4,
    },
    wrapper:{
        flex:1,
        backgroundColor: '#F5F6F7',
    },
    list:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 4,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
});

export default styles;
