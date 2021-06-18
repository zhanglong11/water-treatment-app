import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, Alert, Switch , TouchableOpacity} from 'react-native';
import {WingBlank,TextareaItem,WhiteSpace,Toast,Button} from '@ant-design/react-native';
import Iconfont from '../../components/IconBasic';
import Header from '../../components/Header';
import * as sysService from '../../../service/sysService';

const SuggestReport = props => {
    const [suggest, setSuggest] = useState('');
    const [contactInformation, setContactInformation] = useState('');
    const { navigation } =props;
    const name = navigation.getParam('name');
    const goBack=()=>{
        navigation.goBack()
    }
    const handleSubmit=()=>{
        if(!(suggest&&contactInformation)){
            Toast.fail('非空');
            return
        }
        sysService.handleSuggestSubmit({content:suggest,contact:contactInformation}).then((res)=>{
            console.log(res)
            if(res.flag){
                Toast.success(`${res.msg}`);
                setSuggest('');
                setContactInformation('');
            }else{
                Toast.fail(`${res.msg}`);
            }
        })
    }
    const Left =<TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'}  size={20} color={'#fff'}/></TouchableOpacity>;
    return <View style={styles.wrapper}>
        <Header left={Left} title={name}/>
        <View style={styles.container}>
            <WhiteSpace size='lg'></WhiteSpace>
            <View>
                <TextareaItem rows={4} placeholder="请输入宝贵意见" value={suggest}  onChange={(value)=>setSuggest(value)} style={styles.textareaWrapper}></TextareaItem>
            </View>
            <WhiteSpace size='lg'></WhiteSpace>
            <View>
                <TextareaItem rows={1} placeholder="联系方式" value={contactInformation}  onChange={(value)=>setContactInformation(value)} style={styles.textareaWrapper} ></TextareaItem>
            </View>
            <WhiteSpace  size='xl'></WhiteSpace>
            <View>
                <WingBlank>
                    <Button style={styles.btn} activeStyle={styles.activeBtn} type="warning" onPress={handleSubmit}>
                        提交
                    </Button>
                </WingBlank>
            </View>
        </View>
    </View>
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        position: 'relative',
    },
   container:{
        flex:1,
       paddingLeft:10,
       paddingRight:10,
       backgroundColor: '#fff',
   },
    textareaWrapper:{
        backgroundColor:'#EFEFEF',
        borderRadius:5,
    },
    inputWrapper:{
        backgroundColor:'#EFEFEF',
        borderRadius:5,
        flex:1,
        padding:0
    },
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

export default SuggestReport;
