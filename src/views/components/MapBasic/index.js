import React, {useState, useEffect} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
} from 'react-native';
import {MapView, Marker} from 'react-native-amap3d';

const markerIcon = require('../../../assets/images/mapMarker.png');


const MapBasic = props => {
    const {markerData} = props;

    const renderMaker = () => {
        return markerData.length ? markerData.map(m => {
            return <Marker
                active
                icon={() => (
                    <Image
                        source={markerIcon}
                        style={{width: 20, height: 20}}
                        resizeMode='cover'
                    />
                )}
                coordinate={{
                    latitude: m.latitude,
                    longitude: m.longitude,
                }}
            >
                <View style={styles.makerWrapper}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.name}>{m.name}</Text>
                        <Text style={styles.brief}>{m.desp}</Text>
                        <Text style={styles.desp}>{m.status === 1 ? '设备发生故障' : '正常运行中'}</Text>
                    </View>
                    {/*<TouchableOpacity style={styles.arrow} onPress={()=>{Alert.alert('点个鸡毛')}}>*/}
                    {/*<Iconfont name={'jiantou1'} size={14} color={'#fff'}/>*/}
                    {/*</TouchableOpacity>*/}
                    <View style={styles.footer}/>
                </View>
            </Marker>;
        }) : null;
    };

    return (<View style={{flex: 1}}>
        <MapView
            style={StyleSheet.absoluteFill}
        >
            {renderMaker()}
        </MapView>
    </View>);
};

const styles = StyleSheet.create({
    makerWrapper: {
        width: 90,
        height: 60,
        position: 'relative',
        marginBottom: 10,
        borderRadius: 6,
        backgroundColor: '#fff',
        flexDirection: 'row',
    },
    titleWrapper: {
        flex: 1,
        padding: 4,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        flex: 1,
    },
    brief: {
        flex: 1,
        color: '#eee',
    },
    desp: {
        flex: 1,
        color: '#007BFF',
    },
    arrow: {
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007BFF',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
    },
    footer: {
        position: 'absolute',
        top: 60,
        left: 35,
        borderWidth: 10,
        borderBottomColor: 'transparent',
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderTopColor: '#fff',
    },
});


export default MapBasic;
