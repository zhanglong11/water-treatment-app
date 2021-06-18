import React from 'react';
import Login from '../views/Login';
import Root from '../views/Root';
import FooterNav from '../views/FooterNav';
import Nav from '../views/Nav';
import Mine from '../views/Mine';
import EquipView from '../views/EquipView'
import Alarm from '../views/Alarm';
import AlarmInfo from '../views/Alarm/Info';

import EquipTab from '../views/EquipNav/EquipTab';
import EquipChooseProject from '../views/EquipNav/EquipTab/EquipChooseProject';
import EquipChooseItem from '../views/EquipNav/EquipTab/EquipChooseItem';
import EquipChooseTab from '../views/EquipNav/EquipTab/EquipChooseTab';

import UserInformation from '../views/Mine/Pages/UserInformation';
import SuggestReport from '../views/Mine/Pages/SuggestReport';
import Share from '../views/Mine/Pages/Share';
import ShareWet from '../views/Mine/Pages/ShareWet';
import About from '../views/Mine/Pages/About';
import Update from '../views/Mine/Pages/Update';
export default {
    //登录
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
        },
    },
    //首页
    Nav: {
        screen: FooterNav,
        navigationOptions: {
            header: null,
        },
    },
    EquipView:{
        screen: EquipView,
        navigationOptions: {
            header: null,
        }
    },
    //我的
    Mine: {
        screen: Mine,
    },
    //设备列表
    EquipTab: {
        screen: EquipTab,
        navigationOptions: {
            header: null,
        }
    },
    EquipChooseProject:{
        screen: EquipChooseProject,
        navigationOptions: {
            header: null,
        }
    },
    EquipChooseItem:{
        screen: EquipChooseItem,
        navigationOptions: {
            header: null,
        }
    },
    EquipChooseTab:{
        screen: EquipChooseTab,
        navigationOptions: {
            header: null,
        }
    },
    //个人信息
    UserInformation:{
        screen:UserInformation,
        navigationOptions: {
            header: null,
        }
    },
    //意见反馈
    SuggestReport:{
        screen:SuggestReport,
        navigationOptions: {
            header: null,
        }
    },
    Share:{
        screen:Share,
        navigationOptions: {
            header: null,
        }
    },
    ShareWet:{
        screen:ShareWet,
        navigationOptions: {
            header: null,
        }
    },
    //关于我们
    About:{
        screen:About,
        navigationOptions: {
            header: null,
        }
    },
    Update:{
        screen:Update,
        navigationOptions: {
            header: null,
        }
    },
    Alarm:{
        screen:Alarm,
        navigationOptions: {
            header: null,
        }
    },
    AlarmInfo:{
        screen:AlarmInfo,
        navigationOptions: {
            header: null,
        }
    }
};
