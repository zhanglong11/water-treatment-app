import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, Button as RNButton, Alert,TextInput,TouchableHighlight} from 'react-native';
import Iconfont from '../../components/IconBasic';
import Header from '../../components/Header';
import {choosePicker} from '../../components/CameraBasic';
import {WhiteSpace, WingBlank,Modal,Button,Radio,Picker} from '@ant-design/react-native';
import area from './area.json';
import AsyncStorage from '@react-native-community/async-storage';
import * as sysService from '../../../service/sysService';
const RadioItem = Radio.RadioItem;
const CustomChildren = (props) => (
    <TouchableOpacity onPress={props.onPress}>
        <View
            style={{
                height: 36,
                paddingLeft: 15,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            <Text style={{ flex: 1 }}>{props.children}</Text>
            <Text style={{ textAlign: 'right', color: '#888', marginRight: 15 }}>
                {props.extra}
            </Text>
        </View>
    </TouchableOpacity>
);
const UserInformation = props => {
    const [userName, setUserName] = useState('aaa');
    const [sexVisible, setSexVisible] = useState(false);
    const [selectArea, setSelectArea] = useState(['11','1101','110101']);
    const [selectAreaLabel, setSelectAreaLabel] = useState(null);
    const [sex, setSex] = useState('male');

    useEffect( ()=>{
        sysService.getUserInformation().then((res)=>{
            console.log(res)
        })
    },[])

    const {navigation} = props;
    const name = navigation.getParam('name');
    const handleSubmit=()=>{
        Alert.alert(`${userName}  ${sex}   ${selectArea}  ${selectAreaLabel}`)
    }
    const footerButtons = [
        { text: '取消', onPress: () => setSexVisible(false)},
        { text: '确认', onPress: () => setSexVisible(false)},
    ];
    const goBack = () => {
        navigation.goBack();
    };

  const onAddrOk=(val)=>{
      setSelectArea(val);
  }
const areaFormatter=(label)=>{
    setSelectAreaLabel(label.join(','))
    return label.join(' ')
}
    const Left = <TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'}  size={20} color={'#fff'}/></TouchableOpacity>;
    return <View style={styles.wrapper}>
        <Header left={Left} title={name}/>
        <View style={styles.list}>
            <View style={[styles.item,styles.borderBottom]}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        头像
                    </Text>
                </View>
                <View style={styles.extra}>
                    <TouchableOpacity onPress={choosePicker}>
                        <Image
                            style={styles.avatar}
                            source={require('../../../assets/images/backTh.png')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.item,styles.borderBottom]}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        昵称
                    </Text>
                </View>
                <View style={styles.extra}>
                        <TextInput  style={[styles.itemTitle, styles.itemGrey,{paddingVertical:0,marginVertical:0}]} onChangeText={(val)=>setUserName(val)} value={userName}></TextInput>
                </View>
            </View>
            <View style={[styles.item,styles.borderBottom]}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        性别
                    </Text>
                </View>
                <View style={styles.extra}>
                    <TouchableOpacity onPress={()=>setSexVisible(true)} style={{width:100}}>
                    <Text style={[styles.itemTitle, styles.itemGrey,{textAlign:'right'}]} >
                        {sex==='male'?'男':'女'}
                    </Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.item}>
                <View style={styles.content}>
                    <Text style={styles.itemTitle}>
                        地址
                    </Text>
                </View>
                <View style={styles.extra}>
                        <Picker
                            data={area}
                            cols={3}
                            value={selectArea}
                            onOk={onAddrOk}
                           format={areaFormatter}
                        >
                            <CustomChildren></CustomChildren>
                        </Picker>
                </View>
            </View>
        </View>
        <WhiteSpace  size='xl'  style={{marginTop:20}}></WhiteSpace>
        <View>
            <WingBlank style={{paddingHorizontal:10}}>
                <Button style={styles.btn} activeStyle={styles.activeBtn} type="warning" onPress={handleSubmit}>
                    提交
                </Button>
            </WingBlank>
        </View>
        <Modal
            title="Title"
            transparent
            onClose={()=>setSexVisible(false)}
            maskClosable={true}
            visible={sexVisible}
            closable
            footer={footerButtons}
        >
            <View style={{ paddingVertical: 20 }}>
                <RadioItem
                    checked={sex === 'male'}
                    onChange={event => {
                        if (event.target.checked) {
                            setSex('male');
                        }
                    }}
                >
                    男
                </RadioItem>
                <RadioItem
                    checked={sex === 'female'}
                    onChange={event => {
                        if (event.target.checked) {
                           setSex('female');
                        }
                    }}
                >
                    女
                </RadioItem>
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
    title: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#132E7D',
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 60,
    },
    name: {
        marginLeft: 16,
        color: '#fff',
    },
    list: {
        marginTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 2,
        paddingVertical: 14,
    },
    borderBottom:{
        borderBottomWidth: 1,
        borderBottomColor: '#C7CDDF',
    },
    content: {
        paddingLeft: 4,
    },
    itemTitle: {
        fontSize: 16,
    },
    itemGrey: {
        color: '#9D9D9D',
    },
    brief: {
        marginTop: 4,
        fontSize: 14,
        color: '#bbb',
    },
    extra: {},
    btnWrapper: {
        position: 'absolute',
        width: '100%',
        bottom: 10,
    },
    btn: {
        backgroundColor: '#132E7D',
        borderWidth: 0,
        borderRadius: 6,
    },
    activeBtn: {
        backgroundColor: '#132E7D',
    },
    btnText: {
        color: '#fff',
    },
});

export default UserInformation;
