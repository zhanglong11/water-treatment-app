import React from 'react';
import Chart from './Chart';

const LineChat = props => {
    return (
        <Chart option={props.option} height={'100%'}/>
    );
};

export {LineChat};
