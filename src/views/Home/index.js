import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert, Image, StyleSheet, Dimensions, Text, TouchableOpacity} from 'react-native';
import {Carousel, Badge} from '@ant-design/react-native';
import {LineChat} from '../components/ChartBasic';
import Header from '../components/Header';
import Iconfont from '../components/IconBasic';
import CommonStyle from '../Common/commonCss';
import * as sysService from '../../service/sysService';

const imageData = [
    {
        icon: require('../../assets/images/backO.png'),
    },
    {
        icon: require('../../assets/images/backT.png'),
    },
    {
        icon: require('../../assets/images/backTh.png'),
    },
    {
        icon: require('../../assets/images/backF.png'),
    },
];


const Home = props => {
    const [chartData1, setChartData1] = useState([]);
    const [chartData2, setChartData2] = useState([]);
    const [total, setTotal] = useState(0);
    useEffect(
        ()=>{
            sysService.getHomeRunningStatus().then((res)=>{
                const {runningNum,faultNum,stopNum}=res.data;
                let data=[];
                data.push({value:runningNum,name:`运行设备_${runningNum}_台`})
                data.push({value:faultNum,name:`故障设备_${faultNum}_台`})
                data.push({value:stopNum,name:`停机设备_${stopNum}_台`})
                setChartData1(data)
            })
        },[]
    )
    useEffect(
        ()=>{
            sysService.getAlarmCount().then((res)=>{
                const {handledNum,noHandleNum,count}=res.data;
                let data=[];
                data.push({value:noHandleNum,name:`未处理设备_${noHandleNum}_台`})
                data.push({value:handledNum,name:`已处理设备_${handledNum}_台`})
                setChartData2(data)
                setTotal(count)
            })
        },[]
    )
    const option1 = {
        color:['#3554E3','#FFB139','#FF5B53'],
        title: {
           /* text:[
                '{titleImg|  }',
                '{titleWord|报警统计}',
            ].join(''),*/
            padding: 10,
            textStyle: {
                rich: {
                    titleImg: {
                        width: 25,
                        height: 25,
                        verticalAlign: 'middle',
                        backgroundColor: {
                            image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAABq0lEQVRIie3WPWsUURTG8V/iGsH3d7QSOxFUCNhoKlFURDBVCIgiiLiNFilSWfkpRIiClWgREkFsFJatIkICWvgJNJIELAIKinLxLAzr7OzOLBKLPM3MnHPv+c/cc869M1C//0sJDWEO33AaP3udWitDwQGciPut+NrrxMGSoMpqBw11CfQ9rmm9fxSMG2iPlQUdxme8KAAu4gauY7XDmM14hU84lAfah524hKcF+XuMJx186QWf4xx2RLy/QKma6rEsV3AtJ9CuKIZh7M7x38TFiHELC3mgpAe4i3k0MvYxNLEUvndYxltcjZwkvQ7fbUxlA3froy2xTKNFgzCL8YK8FZb3hshVN0jSZcxgYxVQPQqjV53BZFnQJtwrAWlpIpa7Z1Aqz/0VQKmcL+Q5arE5jsRzqqRHOFYB0tJJTEdj7wlbM4FeYltmYOrog32AtuM8HmZsK7Xo9FNhWI0mK1MEeZqLbWhv+BoJdKfPoHlaas/Vmh0T66D/D9TpcGvGplpFzSJQ2m6OZ+xf8KyPDzibuX+ffhFaoDc42kfgIn3EkVaOPvwjyB8QfgNJH0YdSgn0iQAAAABJRU5ErkJggg==',
                        },
                    },
                    titleWord: {
                        padding: [0, 0, 5, 10],
                        verticalAlign: 'bottom',
                        color: '#666666',
                        fontWeight: 'bolder',
                        fontSize: 20,
                        height: 30,
                        fontFamily: 'Microsoft YaHei',
                    },
                },
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, cb) {
                return `${params.seriesName}<br/>${params.name.split('_')[0]}:${params.value}(${params.percent}%)`;
            },
        },
        legend: {
            orient: 'vertical',
            right: '20',
            top: 'center',
            icon: 'pin',
            //selectedMode:false,
            inactiveColor: '#eee',
            formatter: function (name) {
                const aa = `{a|${name.split('_')[0]}}{b|${name.split('_')[1]}}${name.split('_')[2]}`;
                //const bb=unescape(aa.replace(/\\u/g, "%u"));
                return aa;
            },
            textStyle: {
                rich: {
                    a: {
                        //color:'red'
                    },
                    b: {
                        //color:'green',
                        width: 30,
                        align: 'center',
                        padding: [0, 5, 0, 5],
                    },
                },
            },
        },
        series: [
            {
                name: '状态统计',
                type: 'pie',
                radius: ['30%', '70%'],
                center: ['30%', '55%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false,
                        position: 'center',

                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold',
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: chartData1,
            },
        ],
    };
    const option2 = {
        color: ['#FF2626', '#3553E2',],
        title: {
            // left:chartWidth*0.3-25,
            //top:(chartHeight-30)*0.55,
            left: chartWidth * 0.3 - 30,
            top: (chartHeight - 30) * 0.55 - 5,
            text: '{a|总计}',
            subtext: `{b|${total}}`,
            itemGap: 0,
            textStyle: {
                rich: {
                    a: {
                        width: 50,
                        height: 20,
                        align: 'center',
                        fontSize: 12,
                        fontWeight: '300',
                        color: '#828282',
                    },
                },
            },
            subtextStyle: {
                rich: {
                    b: {
                        width: 50,
                        height: 20,
                        align: 'center',
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#3E3E3E',
                    },
                },
            },
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params, ticket, cb) {
                return `${params.seriesName}<br/>${params.name.split('_')[0]}:${params.value}(${params.percent}%)`;
            },
        },
        legend: {
            orient: 'vertical',
            right: '20',
            top: 'center',
            icon: 'pin',
            //selectedMode:false,
            inactiveColor: '#eee',
            formatter: function (name) {
                const aa = `{a|${name.split('_')[0]}}{b|${name.split('_')[1]}}${name.split('_')[2]}`;
                //const bb=unescape(aa.replace(/\\u/g, "%u"));
                return aa;
            },
            textStyle: {
                rich: {
                    a: {
                       // color: 'red',
                    },
                    b: {
                       // color: 'green',
                        width: 30,
                        align: 'center',
                        padding: [0, 5, 0, 5],
                    },
                },
            },
        },
        series: [
            {
                name: '告警设备统计',
                type: 'pie',
                radius: ['30%', '60%'],
                center: ['30%', '55%'],
                roseType: 'radius',
                label: {
                    normal: {
                        show: false,
                        position: 'center',
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold',
                        },
                    },
                },
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                data: chartData2,
            },
        ],
    };
    const rightClick = () => {
        props.navigation.push('Alarm');
    };

    const right = <TouchableOpacity>
        <Badge dot text={9}>
            <Iconfont name={'bell'} onPress={rightClick} size={22} color={'#fff'}/>
        </Badge>
    </TouchableOpacity>;

    return <View style={styles.wrapper}>
        <Header title={'首页'} right={right}/>
        <ScrollView>
            <View>
                <Carousel
                    autoplay
                    infinite
                    autoplayInterval={10000}
                    dotActiveStyle={styles.bannerActive}
                >
                    {imageData.map((d, i) => (
                        <View key={i}>
                            <Image
                                style={styles.homeImg}
                                source={d.icon}
                                resizeMode='cover'
                            />
                        </View>),
                    )}
                </Carousel>
            </View>

            <View style={styles.chart}>
                <View style={{flex:1,flexDirection:'row',paddingTop:10,paddingLeft:10,verticalAlign:'middle',height:30,lineHeight:30}}>
                    <Image
                        source={{uri:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAZCAYAAADAHFVeAAACSElEQVRIib2W2U5TURSGvwO2tBYqUNGqoCHRRCNeIGpiUC9MTIw36iv4Xr6AMV5qNBBNvBA1MeKIRKUOtMyWsROtrpUdiu2ZOih/cm7OHr699pq29VvEDqllp0CqXY0smluCyYQsltXxmHx7IdT2n2AzC3D/KeQL0BWFvjicOwVHD8uGrQ3CSiXI5WFp2QBK4t2zA9tjG1nzpebh/Re4cBquDkPAZVfH37ppegUmpuDJS5ieBY2iQ/u3YdXzV9fhgVibzcG1ixAJ1wAryom/JWF0DN59hsKml+12jY1Dt1ztpSGxMFA5ZovGHzNw9xGMT9YPUmXEsudv4eecfawClhOH33kIiaTxSaNKCujjVxNAjjC998cvBDTdOOTvvT4lYG3DBZaWiHv1oXnQlmYXJVjylf/KATIlFi2v1rZRKGgSuX23+5xWybcWywWWkjzK5KuXOKu/F27dlHTwqarVhynD9H43faKvIA7/nvKeoxZp6IdD9rEyzLLM53XaRfHr7XvesGg7XL8spavPA9YRMXXNK7eKRZj/5Q3TwwZdylU5Gg/01Fa5/RQRP+2L+cDU7J6u5mFDJ0y0esL0GocHxW9NgLr3wBmHQm2DqQblVAPHGgO1BU176eyoEabm35BIOt4vA3U8GMLi6yvn5QpPes+znB48C2kYeQZvpPKnPaqKVgjtcdpOtM8FA+5zXWGqTNY0z9cT0jylE6+smfahPtXGqMF05KCB9Mbtpaku2Ja0A+uzYD1rWobuqSkSlYCKdfpbUxfsX+oPema9eTbveMcAAAAASUVORK5CYII='}}
                        style={{width:25,height:25,marginTop: 3}}
                    >
                    </Image>
                    <Text style={{
                        color:'#666666',
                        marginLeft:10,
                        flex:1,
                        fontWeight: 'bold',
                        fontSize: 20,
                        height: 30,
                        fontFamily:'Microsoft YaHei'}}>运行状态</Text>
                </View>
                <LineChat option={option1}/>
            </View>
            <View style={[styles.chart, {marginBottom: 10}]}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingLeft: 10,
                    verticalAlign: 'middle',
                    height: 30,
                    lineHeight: 30,
                }}>
                    <Image
                        source={{uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAACOElEQVRIid2VzU8TYRDGf6UfBK1YpFE0JKhRMTF+IDEmTTQkRi8aLx71b/KPkJNX8MDBGA7EGDyIMSZg/AQEBFux2lIoW53J0NJtd9etyoUnafumOzvPfDwzb+SXgB1GWyvGTgXGJuD+AzvvCEl5ExZW4O2snf+JpOITZUQ/ke1zI7TuFflqbECs0XBtHR6Nw8FuuHJRoqgLIy7W507C/qSdXQTi+P08PJ2Cq4PQdySApCQknxbh+WvLSIliW1aaxdlTcOZEcypzS/BwDLKrEojY9AVl0tUJd67D8Ai8+WgvdKdgJQdLWch9h40ypPZJtgfgUBraE2ZbWIMbGeg/6vYZ8ZOwNtdx4FivOXgyCbOSYbFkz7WMh4XgfL9kO2jEiyKK42Kf3BOSRKFPXs7AyLhk8dXbRrMYOA33brn7Vw9fCSvB52V4/MyfQLG+AZOvYOJFs6r+SKLDNvNBRLDgT1CFylZVpT3xQq3xmzJcyzkzVDWlpdnzX8JPdr5g9ukuWM1b6VQY2p8aSVZUMzwqjRUJR9tMYfmf4QiqQWrjp6ZhWioQjULmAly7XEfSHofeHvgmUcTEINkhLzrhSao+ekRxuS0fWg1FjSQl83H35vYLOg+tIi4kmQEYuuT+v6UF+bfYPSRNu6vGLvSdSdtbYbC3wxrvBdda0V31o2h7SC8lnfiiz4A1QiWrytJrQJGS30TCI5N3c3a9FkrhHAdBr4PbQx4kWqKyEz76IMTquh24hf8Xdo+EfwNMvMNePBNTwgAAAABJRU5ErkJggg=='}}
                        style={{width: 25, height: 25, marginTop: 3}}
                    >
                    </Image>
                    <Text style={{
                        color: '#666666',
                        marginLeft: 10,
                        flex: 1,
                        fontWeight: 'bold',
                        fontSize: 20,
                        height: 30,
                        fontFamily: 'Microsoft YaHei',
                    }}>今日告警设备统计</Text>
                </View>
                <LineChat option={option2}/>
            </View>
        </ScrollView>
    </View>;
};
const windowsHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const chartHeight = (windowsHeight - 50 - 50 - 140 - 60) / 2;
const chartWidth = windowWidth - 40;
//Alert.alert('AAA',chartHeight.toString())
const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#F5F6F7',
    },
    homeImg: {
        width: '100%',
        height: 140,
    },
    chart: {
        // height:200,
        height: chartHeight,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderColor: '#eee',
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20,
        ...CommonStyle.shadow,
    },
    bannerActive: {
        width: 30,
        backgroundColor: '#fff',
    },
});

export default Home;
