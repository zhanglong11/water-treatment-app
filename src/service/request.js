const filterData = json => {
    try {
        if (json.code === 200) {
            return {
                flag: true,
                data: json.data,
                msg: json.message,
            };
        } else if (json.message) {
            return {
                flag: false,
                msg: json.message,
            };
        }
        return {flag: false, msg: '数据获取失败'};
    } catch (e) {
        return {flag: false, msg: '数据获取失败'};
    }
};

export const post = (uri, data = {}, uriParam = {}) => {
    Object.entries(uriParam).map(u=>{
        let name=u[0];
        let val=u[1]
        let reg=new RegExp(`{${name}}`,'g')
        uri=uri.replace(reg,val)
    })
    console.log(data);
    const fetchOption = {
        method: 'post',
        headers: {'Content-Type': 'application/json', 'x-access-token': global.token},
        body: JSON.stringify(data),
    };
    return fetch(uri, fetchOption).then(d => d.json()).then(data => filterData(data)).catch(e => ({
        data: {}, message: '请求失败，请稍后重试', code: 1000, e,
    }));
};

export const postWithNoToken = (uri, data = {}) => {
    const fetchOption = {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    };
    return fetch(uri, fetchOption).then(d => d.json()).then(data => filterData(data)).catch(e => ({
        data: {}, message: '请求失败，请稍后重试', code: 1000, e,
    }));
};


