// app配置信息
export const appInfo = {
    appApi: 'http://172.16.10.26:22222',
};

export const appType = {
    system: '/bim6d-system',
    waterTreatment: 'water-treatment-huang',
};

export const accessInfo = {};

export const dataApi = {
    login: `${appInfo.appApi}${appType.system}/login/login`,//登录

    alarmList: `${appInfo.appApi}/${appType.waterTreatment}/app/alert/noHandle/list`,//报警信息列表

    alarmHisList: `${appInfo.appApi}/${appType.waterTreatment}/app/alert/history/list`,//报警历史信息列表

    alarmInfo: `${appInfo.appApi}/${appType.waterTreatment}/app/alert/{id}/detail`,//报警信息详情

    alarmDel: `${appInfo.appApi}/${appType.waterTreatment}/app/alert/delete/{id}`,//删除报警

    alarmConfirm:`${appInfo.appApi}/${appType.waterTreatment}/app/alert/handle/{id}`,//确认报警

    equipList:`${appInfo.appApi}/${appType.waterTreatment}/app/deviceNavigation/projectNavigation/list`,//设备导航

    mine: {
        indexData: `http://172.16.10.26:22222/water-treatment/app/index/deviceStatus/graph`,
        suggestSubmit: `${appInfo.appApi}/${appType.waterTreatment}/app/myCenter/feedback/submit`,
        userInformation:`${appInfo.appApi}/${appType.waterTreatment}/sss`
    },
    home: {
        runningStatus: `${appInfo.appApi}/${appType.waterTreatment}/app/index/deviceStatus/graph`,
        alarmCount: `${appInfo.appApi}/${appType.waterTreatment}/app/index/todayAlarm/graph`,
    },
};

