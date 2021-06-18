import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Toast} from '@ant-design/react-native';
/*import * as WeChat from 'react-native-wechat';
import * as QQAPI from 'react-native-qq';*/

const ShareWet = () => {
    const [showCard, setShowCard] = useState(null);
/*

    useEffect(() => {
        WeChat.registerApp('wx064468389e7534da');
    }, []);
*/

    return (<View>
        <Text>吔屎了你</Text>
       {/* <TouchableOpacity activeOpacity={0.5}
                          onPress={() => {
                              setShowCard(true);
                          }}>
            <Text>
                立即邀请好友加入
            </Text>
        </TouchableOpacity>
        {showCard ? <View><TouchableOpacity onPress={() => {
            WeChat.isWXAppInstalled()
                .then((isInstalled) => {
                    if (isInstalled) {
                        WeChat.shareToTimeline({
                            title: '微信朋友圈测试链接',
                            description: '分享自:江清清的技术专栏(www.lcode.org)',
                            thumbImage: 'http://mta.zttit.com:8080/images/ZTT_1404756641470_image.jpg',
                            type: 'news',
                            webpageUrl: 'http://www.baidu.com',
                        })
                            .catch((error) => {
                                console.log(error);
                            });
                    } else {
                        Toast.fail('没有微信');
                    }
                });
        }}>
            <View>
                <Text>
                    分享朋友圈
                </Text>
            </View>
        </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                WeChat.isWXAppInstalled()
                    .then((isInstalled) => {
                        if (isInstalled) {
                            WeChat.shareToSession({
                                title: '微信好友测试的链接',
                                description: '分享的标题内容',
                                thumbImage: '分享的标题图片',
                                type: 'news',
                                webpageUrl: 'http://www.baidu.com',
                            })
                                .catch((error) => {
                                    console.log(error);
                                });
                        } else {
                            Toast.fail('没有微信');
                        }
                    });
            }}>
                <View>
                    <Text>
                        分享好友
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                let qqshareInfo={
                    type: 'news',
                    imageUrl: 'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
                    title:'111',
                    description:'111',
                    webpageUrl: 'http://www.baidu.com'
            }
                QQAPI.shareToQzone(qqshareInfo).then((res)=>{
                    console.log(22)
                }).catch((err)=>{
                    console.log('分享失败')
                })
            }}>
                <View>
                    <Text>
                        分享好友
                    </Text>
                </View>
            </TouchableOpacity>
        </View> : null}*/}
    </View>);
};

export default ShareWet;
