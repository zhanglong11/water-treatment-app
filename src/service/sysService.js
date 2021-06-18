import * as requestService from './request';
import {dataApi} from '../config/webapi';

export const login=params=>requestService.postWithNoToken(dataApi.login, params);//登录

export const alarmList=params=>requestService.post(dataApi.alarmList, params);//报警信息

export const alarmHisList=params=>requestService.post(dataApi.alarmHisList, params);//报警信息

export const alarmInfo=(uriParam,params)=>requestService.post(dataApi.alarmInfo,params,uriParam);//报警详情

export const alarmDel=(uriParam,params)=>requestService.post(dataApi.alarmDel, params,uriParam);//删除报警

export const alarmConfirm=(uriParam,params)=>requestService.post(dataApi.alarmConfirm, params,uriParam);//确认报警

export const equipList=params=>requestService.post(dataApi.equipList, params);//确认报警


export const getHomeRunningStatus = async (params) => {
    const fetchApi = dataApi.home.runningStatus;
    return requestService.post(fetchApi, params);
};
export const getAlarmCount = async (params) => {
    const fetchApi = dataApi.home.alarmCount;
    return requestService.post(fetchApi, params);
};
export const mineIndexData = async (params) => {
    const fetchApi = dataApi.mine.indexData;
    const result = await requestService.post(fetchApi, params);
    return result;
};
//提交建议
export const handleSuggestSubmit = async (params) => {
    const fetchApi = dataApi.mine.suggestSubmit;
    return requestService.post(fetchApi, params);
};
export const getUserInformation = async (params) => {
    const fetchApi = dataApi.mine.userInformation;
    return requestService.post(fetchApi, params);
};
