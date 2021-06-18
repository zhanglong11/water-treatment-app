import React from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {Tabs} from '@ant-design/react-native';

const TabBasic = props => {
    return (<Tabs
        swipeable={false}
        tabs={props.tabs}
        renderTabBar={tabProps => (
            <View
                style={styles.titleWrapper}
            >
                {tabProps.tabs.map((tab, i) => (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        key={tab.key || i}
                        style={styles.title}
                        onPress={() => {
                            const {goToTab, onTabClick} = tabProps;
                            onTabClick && onTabClick(tabs[i], i);
                            goToTab && goToTab(i);
                        }}
                    >
                        <View>
                            <Text style={{...{color: tabProps.activeTab === i ? '#fff' : '#929FC3'}, ...styles.name}}>
                                {tab.title}
                            </Text>
                            {tabProps.activeTab === i ? <View style={styles.activeUnderLine}/> :
                                <View style={styles.underline}/>}
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        )}
        usePaged={false}
        onChange={props.onChange}
    >
        {props.children}
    </Tabs>);
};

const styles = StyleSheet.create({
    titleWrapper: {
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: '#132E7D',
    },
    title: {
        paddingBottom: 2,
    },
    name: {
        padding: 6,
        fontSize:16
    },
    activeUnderLine: {
        width: '100%',
        height: 3,
        backgroundColor: '#fff',
        borderRadius: 3,
    },
    underLine: {
        width: '100%',
        height: 3,
        backgroundColor: '#132E7D',
        borderRadius: 3,
    },

});

export default TabBasic;
