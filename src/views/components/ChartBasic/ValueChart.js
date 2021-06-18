import React from 'react';
import {LineChat} from '../ChartBasic';
const ValueChart = props => {
    let data=[{time:'09:57',value:2},{time:'09:58',value:8},{time:'09:59',value:8},{time:'10:00',value:8},{time:'10:01',value:4}];
    let time='10:01';
    let value=4;
    let timeList;
    let valueList;
    timeList=data.map((a)=>{
        return a.time
    })
    valueList=data.map((a)=>{
        return a.value
    })
    let option = {
        grid:{
            top:20,
            left:10,
            bottom:20,
            right:10
        },
        xAxis: {
            type: 'category',
            data: timeList,
            axisLine:{
                onZero:false
            },
            axisTick:{
                show :false
            },
            axisLabel:{
                interval:1000000000000000,
                showMaxLabel:true,
                showMinLabel:false,
            }
        },
        yAxis: {
            type: 'value',
            show:false,
            min: function(value) {
                let  val=value.min-(value.max-value.min)/3+'';
                let aa=val.substr(0,val.indexOf('.')+3)
                return (aa)
            },
            max: function(value) {
                let  val=value.max+(value.max-value.min)/3+'';
                let aa=val.substr(0,val.indexOf('.')+3)
                return (aa)
            },
        },
        series: [{
            data: valueList,
            type: 'line',
            showSymbol:false,
            lineStyle:{
                color:'#06DAFF'
            },
            markPoint: {
                label :{
                    position: 'top',
                    distance:5,
                    backgroundColor:'#9095A4',
                    borderRadius:8,
                    padding:[5,10],
                    color:'#fff',
                    formatter: '{c}'
                },
                data: [{
                    name:'吔',
                    symbol :'image://data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABK0lEQVQ4T7WT0VGDQBCGvyUTX40dpASsQEtIB9KB+KbkQZwxp29eOsAOUgJWYEpIB+KrDlnnIBiOMDGjIy9w7O13++/+J/zxkZ38VEd8cgucdGJvDLkjlaL93wfc6ISAiJKYR1l5gGsdM8CyJuNBFk1sC3DJQoiRlHrzJRBuNi4pmVfQRFMCcu4ld7EaUJedMZMJiUYIT8CoI6FAucJIxlQXDImcnBqQqCvNVt8DXnuSG1ZByWm1cFKNpDVgqu70qHrDxd7BKHOMxE2OD0g0Rzj7AfCCkfN/AhwiAZ6/5c4k8psYVJ13Mo57ZSjvrDej9ZrYHSPYHYhLhrh/jO64tpESDRFiz0iKxciy30hNvYdYWbCNC7dObAt2cj6IEcZeH5QVR9j9l+kXV/sLMkmSETn7q10AAAAASUVORK5CYII=',
                    symbolSize :[16,16],
                    coord: [time,value],
                    value:value

                }]
            }
        }]
    };
    return (<LineChat option={option}/> );
};

export default ValueChart;
