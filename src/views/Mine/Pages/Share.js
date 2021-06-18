import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,Alert} from 'react-native';
import Iconfont from '../../components/IconBasic';
import Header from '../../components/Header';
import {Modal} from '@ant-design/react-native';

const Share = props => {
    const [visible, setVisible] = useState(false);
    const {navigation} = props;
    const name = navigation.getParam('name');
    const goBack = () => {
        navigation.goBack();
    };
    const handleShare = () => {
        setVisible(true);
        //navigation.push('ShareWet');
    };
    const footerButtons = [
        { text: '取消', onPress: () => console.log('cancel') },
    ];
    const Right = <TouchableOpacity onPress={handleShare}>
        <Iconfont name={'share'} size={20} color={'#fff'}/>
    </TouchableOpacity>;

    const Left = <TouchableOpacity onPress={goBack}>
        <Iconfont name={'jiantou'} size={20} color={'#fff'}/>
    </TouchableOpacity>;

    return <View style={styles.wrapper}>
        <Header left={Left} title={name} right={Right}/>

        <View style={styles.imgContainer}>
            <Image
                style={styles.share}
                source={require('../../../assets/images/share.png')}
                resizeMode="stretch"
            />
        </View>
        <Modal
            transparent
            title='分享'
            onClose={() => setVisible(false)}
            maskClosable={true}
            popup
            animationType="slide-up"
            visible={visible}
            style={[styles.shareModal]}
            footer={footerButtons}
            bodyStyle={{
                height:110,
                paddingTop: 0,
                paddingBottom:0,
                paddingHorizontal: 0,
            }}
        >
            <View style={[styles.itemContainer]}>
                <View style={[styles.shareItem]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{Alert.alert("吔?")}}>
                    <Image
                        style={[styles.itemImg]}
                        source={require('../../../assets/images/wechat.png')}
                        resizeMode="contain"
                    />
                    <Text
                        style={[styles.itemContent]}
                    >微信好友</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.shareItem]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{Alert.alert("吔?")}}>
                    <Image
                        style={[styles.itemImg]}
                        source={require('../../../assets/images/wechat-friend.png')}
                        resizeMode="contain"
                    />
                    <Text
                        style={[styles.itemContent]}
                    >微信朋友圈</Text>
                    </TouchableOpacity>
                </View>

                <View style={[styles.shareItem]}>
                    <TouchableOpacity style={{alignItems:'center'}} onPress={()=>{Alert.alert("吔?")}}>
                    <Image
                        style={[styles.itemImg]}
                        source={require('../../../assets/images/qq.png')}
                        resizeMode="contain"
                    />
                    <Text
                        style={[styles.itemContent]}
                    >QQ好友</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        position: 'relative',
    },
    imgContainer: {
        flex: 1,
    },
    share: {
        height: '100%',
        width: '100%',
    },
    shareModal: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 200,
        padding:0,
    },
    itemContainer:{
        width: '100%',
        //height:100,
        backgroundColor:'#fff',
        flexDirection:'row',
        margin:0,
        alignItems:'center',
        flex:1
    },
    shareItem:{
        flex:1,
        alignItems:'center',
        borderColor:'white'
    },
    itemImg:{
        width: 50,
        height: 50
    },
   itemContent:{
        marginTop:3
   }
});

export default Share;
