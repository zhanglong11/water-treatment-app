import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Iconfont from '../../../components/IconBasic';

const EquipList = props => {
    const [dataList, setDataList] = useState(props.data);
    const [nameSort, setNameSort] = useState(null);
    const [totalSort, setTotalSort] = useState(null);
    const [unitSort, setUnitSort] = useState(null);

    useEffect(()=>{
        if(nameSort!==null){
            if(nameSort){
                dataList.sort((a,b)=>{
                    return a.name.localeCompare(b.name);
                })
            }else{
                dataList.sort((a,b)=>{
                    return b.name.localeCompare(a.name);
                })
            }
        }

        if(totalSort!==null){
            if(totalSort){
                dataList.sort((a,b)=>{
                    return a.total-b.total
                })
            }else{
                dataList.sort((a,b)=>{
                    return b.total-a.total
                })
            }
        }

        if(unitSort!==null){
            if(unitSort){
                dataList.sort((a,b)=>{
                    return a.unit.localeCompare(b.unit);
                })
            }else{
                dataList.sort((a,b)=>{
                    return b.unit.localeCompare(a.unit);
                })
            }
        }
    },[nameSort,totalSort,unitSort])

    const renderList = () => {
        return dataList.length ?dataList.map(d => {
            return <View style={styles.tr} key={d.id}>
                <View style={styles.nameWrapper}>
                    {d.status===1?<Image
                        style={styles.img}
                        source={require(`../../../../assets/images/equipR.png`)}
                        resizeMode='contain'
                    />:<Image
                        style={styles.img}
                        source={require(`../../../../assets/images/equipB.png`)}
                        resizeMode='contain'
                    />}
                    <Text numberOfLines={1} style={styles.tdName}>{d.name}</Text>
                </View>
                <Text style={styles.tdTotal}>{d.total}</Text>
                <Text style={styles.tdUnit}>{d.unit}</Text>
            </View>;
        }):null
    };

    const sortName = () => {
        setNameSort(!nameSort);
        setTotalSort(null);
        setUnitSort(null);
    };
    const sortTotal = () => {
        setNameSort(null);
        setTotalSort(!totalSort);
        setUnitSort(null);
    };
    const sortUnit = () => {
        setNameSort(null);
        setTotalSort(null);
        setUnitSort(!unitSort);
    };

    return (<View style={styles.wrapper}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.headerName} onPress={sortName}>
                <Text style={styles.headerText}>名称</Text>
                <Iconfont style={styles.icon} name={nameSort ? 'arrowup' : 'arrowdown-copy'} size={16}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerTotal} onPress={sortTotal}>
                <Text style={styles.headerText}>数值</Text>
                <Iconfont style={styles.icon} name={totalSort ? 'arrowup' : 'arrowdown-copy'} size={16}/>
            </TouchableOpacity>
            <TouchableOpacity style={styles.headerUnit} onPress={sortUnit}>
                <Text style={styles.headerText}>单位</Text>
                <Iconfont style={styles.icon} name={unitSort ? 'arrowup' : 'arrowdown-copy'} size={16}/>
            </TouchableOpacity>
        </View>
        <ScrollView style={{flex:1}}>
            {renderList()}
        </ScrollView>
    </View>);
};

const styles = StyleSheet.create({
    wrapper: {
        flex:1,
        backgroundColor: '#F5F6F7',
    },
    header: {
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#F3F3F3',
    },
    headerText:{
        color:'#909090',
    },
    headerName: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTotal: {
        width: 80,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center'
    },
    headerUnit: {
        width: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent:'center',
    },
    icon: {
        color:'#909090',
        marginLeft: 6,
    },
    tr:{
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#eee'
    },
    nameWrapper:{
        flex:1,
        display: 'flex',
        flexDirection: 'row',
        alignItems:'center',
    },
    img: {
        width: 30,
        height: 30,
    },
    tdName:{
        flex:1,
        marginLeft: 6,
        color: '#5F5F5F',
    },
    tdTotal:{
        width:80,
        textAlign: 'center',
        color: '#5F5F5F',
    },
    tdUnit:{
        width:60,
        textAlign: 'center',
        color: '#5F5F5F',
    }
});

export default EquipList;
