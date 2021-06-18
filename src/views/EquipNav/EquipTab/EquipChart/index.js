import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity,FlatList,Dimensions,Alert} from 'react-native';
import CommonStyle from '../../../Common/commonCss';
import ValueChart from '../../../components/ChartBasic/ValueChart';
const data1 = [
    {id:'1',name: '1旋流器出水浊度', value: 1.32, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:5},{time:'09:58',value:11},{time:'09:59',value:10},{time:'10:00',value:2},{time:'10:01',value:1.32}]},
    {id:'2',name: '2旋流器出水浊度', value: 5, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:6},{time:'09:58',value:20},{time:'09:59',value:11},{time:'10:00',value:6},{time:'10:01',value:5}]},
    {id:'3',name: '3旋流器出水浊度', value: 12, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:7},{time:'09:58',value:10},{time:'09:59',value:12},{time:'10:00',value:9},{time:'10:01',value:12}]},
    {id:'4',name: '4旋流器出水浊度', value:3, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:8},{time:'09:58',value:2},{time:'09:59',value:13},{time:'10:00',value:6},{time:'10:01',value:3}]},
    {id:'5',name: '5旋流器出水浊度', value: 8, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:4},{time:'09:58',value:9},{time:'09:59',value:9},{time:'10:00',value:3},{time:'10:01',value:8}]},
    {id:'6',name: '6旋流器出水浊度', value: 7, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:2},{time:'09:58',value:3},{time:'09:59',value:7},{time:'10:00',value:8},{time:'10:01',value:7}]},
    {id:'7',name: '7旋流器出水浊度', value: 2, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:4},{time:'09:58',value:14},{time:'09:59',value:9},{time:'10:00',value:2},{time:'10:01',value:2}]},
    {id:'8',name: '8旋流器出水浊度', value: 9, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:7},{time:'09:58',value:6},{time:'09:59',value:6},{time:'10:00',value:6},{time:'10:01',value:9}]},
    {id:'9',name: '9旋流器出水浊度', value: 2, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:8},{time:'09:58',value:2},{time:'09:59',value:4},{time:'10:00',value:9},{time:'10:01',value:2}]},
    {id:'10',name: '10旋流器出水浊度', value: 4, unit: 'NTU',time:'10:01',
        data:[{time:'09:57',value:2},{time:'09:58',value:8},{time:'09:59',value:8},{time:'10:00',value:8},{time:'10:01',value:4}]},


];

const EquipChart = props => {
    const [dataList, setDataList] = useState(data);
    const [nameSort, setNameSort] = useState(null);
    const [totalSort, setTotalSort] = useState(null);
    const [unitSort, setUnitSort] = useState(null);
    const [data,setData]= useState([]);
    const windowsWidth=Dimensions.get('window').width;
    const marginH=windowsWidth/10/4;
    const renderData=(item)=>{
        return (<View style={[styles.itemWrapper,{marginHorizontal:marginH}]}>
            <Text style={[styles.itemTitle]} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>
            <View style={[styles.valueWrapper]}>
                <Text style={[styles.fontStyle,CommonStyle.fontRed]}>{item.value}</Text>
                <Text style={[styles.fontStyle,CommonStyle.fontGrey]}>{item.unit}</Text>
            </View>
            <View style={styles.chart}>
                <ValueChart
                    key={Math.random()*Math.random()}
                    data={item}>
                </ValueChart>
            </View>
        </View>)
    }
    return (<View style={[styles.wrapper]}>
        <View style={[styles.container]}>
            <FlatList
                style={{flex:1}}
                numColumns={2}
                columnWrapperStyle={[styles.columnWrapper]}
                data={data1}
                renderItem={({item}) =>renderData(item)}
                keyExtractor={(item)=>item.id}
            />
        </View>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        backgroundColor: '#F5F6F7',
        flex:1,
        padding: 10,
    },
    container:{
        flex:1,
        flexDirection:'row',
    },
    columnWrapper:{
        marginVertical:5,
    },
    itemWrapper:{
        width:'45%',
        height:160,
        backgroundColor: '#fff',
        borderRadius:10,
        borderWidth:2,
        borderColor:'#EAEAEA',
        padding:15,
        flex:1
    },
    itemTitle:{
        fontSize:16,
        height:20
    },
    valueWrapper:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical: 5,
        borderBottomColor:'#eeeeee',
        borderBottomWidth: 1,
        height:30
    },
    fontStyle:{
        fontSize: 14
    },
    chart:{
        flex:1,
        width:'100%'
    }
});

export default EquipChart;
