import React, {useState,useRef} from 'react';
import {View, StyleSheet, TouchableOpacity,Button,Text,ImageBackground,Image} from 'react-native';
import Iconfont from '../../components/IconBasic';
import Header from '../../components/Header';
import { Modal,Progress,Toast } from '@ant-design/react-native';
import CodePush from "react-native-code-push";

let codePushOptions = { checkFrequency: CodePush.CheckFrequency.MANUAL};
const CODE_PUSH_KEY = '5njkyd-g9U1dbkqiUSdPFAHeRQSW48d0a767-d9ed-460b-a7f3-a4637ac2677d';
const deploymentKey='6QNvEYloa02uPZj5gQN1k5f5SUq348d0a767-d9ed-460b-a7f3-a4637ac2677d';
const Update = props => {
    const {navigation} = props;
    const name = navigation.getParam('name');
    const goBack = () => {
        navigation.goBack();
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [immediateUpdate, setImmediateUpdate] = useState(false);
    const [isMandatory, setIsMandatory] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({});
    const [currProgress,setCurrProgress]=useState(0.0)
    const progressBar=useRef('')
    const Left =<TouchableOpacity onPress={goBack}><Iconfont name={'jiantou'}  size={20} color={'#fff'}/></TouchableOpacity>;
    const handlePress=()=>{
        CodePush.disallowRestart()
        syncImmediate()
    }
    const codePushStatusDidChange=(syncStatus)=> {
        if (immediateUpdate) {
            switch(syncStatus) {
                case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                    this.syncMessage = 'Checking for update'
                    break;
                case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                    this.syncMessage = 'Downloading package'
                    break;
                case CodePush.SyncStatus.AWAITING_USER_ACTION:
                    this.syncMessage = 'Awaiting user action'
                    break;
                case CodePush.SyncStatus.INSTALLING_UPDATE:
                    this.syncMessage = 'Installing update'
                    break;
                case CodePush.SyncStatus.UP_TO_DATE:
                    this.syncMessage = 'App up to date.'
                    break;
                case CodePush.SyncStatus.UPDATE_IGNORED:
                    this.syncMessage = 'Update cancelled by user'
                    break;
                case CodePush.SyncStatus.UPDATE_INSTALLED:
                    this.syncMessage = 'Update installed and will be applied on restart.'
                    break;
                case CodePush.SyncStatus.UNKNOWN_ERROR:
                    this.syncMessage = 'An unknown error occurred'
                    //Toast.showError('更新出错，请重启应用！')
                    setModalVisible(false)
                    CodePush.allowRestart();
                    break;
            }
        }
    }
    const syncImmediate=()=> {
        CodePush.checkForUpdate(CODE_PUSH_KEY).then((update) => {
            if (!update) {
                CodePush.allowRestart();
                Toast.info('没有更新')
            } else {
                setModalVisible(true)
                setUpdateInfo(update)
                setIsMandatory(update.isMandatory)
            }
        }).catch(function () {
            CodePush.allowRestart();
        })
    }
    const  codePushDownloadDidProgress=(progress)=>{
        console.log(progress)
        if(immediateUpdate){
            console.log(progress)
            setCurrProgress(parseFloat(progress.receivedBytes / progress.totalBytes).toFixed(2));
            if(currProgress >= 1) {
               setModalVisible(false)
            } else if(progressBar.current) {
                /*progressBar.current.progress = currProgress;
                progressBar.current.buffer = currProgress;*/
            }
        }
    }
    const _immediateUpdateNew=()=>{
        setImmediateUpdate(true)
        var timer = setTimeout(function () {
            CodePush.sync(
                {
                    deploymentKey:CODE_PUSH_KEY,
                    updateDialog: {},
                    installMode: CodePush.InstallMode.IMMEDIATE},
                codePushStatusDidChange,
                codePushDownloadDidProgress
            )
            clearTimeout(timer);
            CodePush.allowRestart();
        },10);
    }
    return <View style={styles.wrapper}>
        <Header left={Left} title={name}/>
        <View  style={{ flex: 1 }}>
           <Button
           title={'检查更新'}
           onPress={handlePress}>
           </Button>
                <Modal
                    maskClosable={true}
                    transparent
                    visible={modalVisible}
                    style={{width:'80%',backgroundColor: '#808080'}}
                    bodyStyle={{
                        paddingTop: 0,
                        paddingBottom:0,
                        paddingHorizontal: 0,
                        paddingVertical: 0,
                    }}
                >
                    <View style={{width:'100%'}}>
                            {
                                !immediateUpdate ?
                                    <View style={[styles.container,{backgroundColor: 'transparent'}]}>
                                        <ImageBackground
                                            source={require('../../../assets/images/upbg.png')}
                                            style={{width:'100%',height:180}}
                                            resizeMode='stretch'
                                        >
                                        <View style={{height:60,marginTop:30,paddingHorizontal:15}}>
                                                <Text style={{color:'#fff',fontSize:30,lineHeight:60,fontFamily:'Microsoft YaHei',fontWeight: 'bold'}}>发现新版本</Text>
                                        </View>
                                        <View style={{height:20,paddingHorizontal:15}}>
                                            <Text style={{color:'#fff',fontSize:25}}>V 1.1.1</Text>
                                        </View>
                                        </ImageBackground>
                                        <View style={{minHeight:100,maxHeight:200,paddingHorizontal:15,backgroundColor:'#fff'}}>
                                            <Text style={{color:'#000'}}>{updateInfo.description}</Text>
                                        </View>
                                        {
                                            !isMandatory ?
                                                <View style={{backgroundColor:'#fff',height:50,marginBottom:0,flexDirection:'row',borderTopWidth:1,borderTopColor:'#eee',alignItems:'center'}}>
                                                    <TouchableOpacity
                                                        style={{flex:1,height:'100%',borderRightColor:'#eee',borderRightWidth:1,alignItems:'center',justifyContent:'center'}}
                                                        onPress={() => setModalVisible(false)}>
                                                        <View style={{width:100,alignItems:'center'}}>
                                                            <Text style={{fontSize: 16, color: '#989898'}}>残忍拒绝</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity
                                                        style={{flex:1,height:'100%',alignItems:'center',justifyContent:'center'}}
                                                        onPress={() => _immediateUpdateNew()}
                                                    >
                                                        <View style={{width:100,alignItems:'center'}}>
                                                            <Text style={{fontSize: 16, color: '#3C9FFE'}}>立即升级</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View> :
                                                <View  style={{height:50}}>
                                                    <TouchableOpacity
                                                        onPress={() => _immediateUpdateNew()}
                                                    >
                                                        <View style={{width:100,alignItems:'center'}}>
                                                            <Text style={{fontSize: 16, color: 'red', letterSpacing:1}}>立即升级</Text>
                                                        </View>
                                                    </TouchableOpacity>
                                                </View>
                                        }
                                    </View>
                                   : <View style={{}}>
                                        <View>
                                            <Text>页面升级中</Text>
                                        </View>
                                        <View style={{ paddingVertical: 20, alignItems: 'center'}}>
                                            <Progress
                                                percent={currProgress}
                                                progressColor={'#89C0FF'}
                                                style={{
                                                    marginTop: 20,
                                                    width: 400,
                                                    marginLeft:10,
                                                    marginRight:10
                                                }}
                                            />
                                            <View>
                                                <Text>本升级非APP更新，wifi环境下30s内即可完成</Text>
                                            </View>
                                        </View>
                                    </View>

                            }
                    </View>
                </Modal>
        </View>
    </View>;
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#FFF',
        position: 'relative',
    },
    container:{
        marginTop:30,
    }
});

const MyUpdate = CodePush(codePushOptions)(Update);
export default MyUpdate;
