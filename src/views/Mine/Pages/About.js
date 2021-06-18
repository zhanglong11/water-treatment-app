import React, {useState} from 'react';
import {View, Text, StyleSheet, Image,TouchableOpacity} from 'react-native';
import Iconfont from '../../components/IconBasic';
import Header from '../../components/Header';

const Share = props => {
    const {navigation} = props;
    const name = navigation.getParam('name');
    const goBack = () => {
        navigation.goBack();
    };
    const Left =<TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'}  size={20} color={'#fff'}/></TouchableOpacity>;
    return <View style={styles.wrapper}>
        <Header left={Left}  title={name}/>
        <View style={styles.imgContainer}>
            <Image
                style={styles.logo}
                source={require('../../../assets/images/logo.png')}
                resizeMode="contain"
            />
            <Text style={[styles.itemGrey]}>版本号V1.0.0</Text>
        </View>
        <View style={[styles.listContainer]}>
            <View style={[styles.item, styles.borderBottom]}>
                <View style={[styles.content]}>
                   <Text style={[styles.iconStyle]}><Iconfont name={'gongsi-'} size={20} color={'#000'}/> </Text>
                    <Text style={styles.itemTitle}>
                        公司名称
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Text style={[styles.itemRightTitle, styles.itemGrey, styles.alignRight]}>
                        华夏天信智能物联股份有限公司
                    </Text>
                </View>
            </View>
            <View style={[styles.item, styles.borderBottom]}>
                <View style={[styles.content]}>
                    <Text style={[styles.iconStyle]}><Iconfont name={'dianhua'} size={20} color={'#000'}/> </Text>
                    <Text style={styles.itemTitle}>
                        电话
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Text style={[styles.itemRightTitle, styles.itemGrey, styles.alignRight]}>
                        010-64398236
                    </Text>
                </View>
            </View>
            <View style={[styles.item, styles.borderBottom]}>
                <View style={[styles.content]}>
                    <Text style={[styles.iconStyle]}><Iconfont name={'youjian'} size={20} color={'#000'}/> </Text>
                    <Text style={styles.itemTitle}>
                        地址
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Text style={[styles.itemRightTitle, styles.itemGrey, styles.alignRight]}>
                        北京市朝阳区望京利泽中二路洛娃大厦 C 座 7 层
                    </Text>
                </View>
            </View>
            <View style={[styles.item]}>
                <View style={[styles.content]}>
                    <Text style={[styles.iconStyle]}><Iconfont name={'xingzhuang7'} size={20} color={'#000'}/> </Text>
                    <Text style={styles.itemTitle}>
                        Website
                    </Text>
                </View>
                <View style={styles.extra}>
                    <Text style={[styles.itemRightTitle, styles.itemGrey, styles.alignRight]}>
                        https://www.hxtxgroup.cn/
                    </Text>
                </View>
            </View>
        </View>
        <View style={[styles.qrcodeContainer]}>
            <View style={[styles.qrcode,styles.imgRightMargin]}>
                <Image
                style={[styles.qrcodeImg]}
                source={require('../../../assets/images/qrcode.png')}
                resizeMode="contain"
            />
            <Text style={styles.qrcodeText}>华夏壹泰</Text>
            </View>
            <View style={[styles.qrcode]}>
                <Image
                style={[styles.qrcodeImg]}
                source={require('../../../assets/images/qrcode.png')}
                resizeMode="contain"
            />
                <Text style={styles.qrcodeText}>华夏天信</Text></View>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    imgContainer: {
        height: 100,
        backgroundColor: '#F9F9F9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 60,
    },
    itemGrey: {
        color: '#9D9D9D',
    },
    listContainer: {
    },
    item: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal:10,
        paddingVertical:14,
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#C7CDDF',
    },
    content: {
        flexDirection: 'row',
        //flex: 1,
        width:150,
        alignItems: 'center',
    },
    extra: {
        flex: 1,
    },
    itemTitle: {
        fontSize: 16,
        flex: 1,
    },
    itemRightTitle: {
        fontSize: 16,
    },
    alignRight: {
        textAlign: 'right',
    },
    iconStyle: {
        marginRight:5,
    },
    qrcodeContainer:{
        //flex:1,
        alignItems: 'center',
        justifyContent:'center',
        flexDirection:'row',
        marginTop:20
    },
    qrcode:{
        width:100,
        height:100,
    },
    qrcodeImg:{
        width:'100%',
        height:'100%'
    },
    imgRightMargin:{
        marginRight:30
    },
    qrcodeText:{
        textAlign: 'center',
        marginTop:10
    }
});

export default Share;
