import React from 'react';

import { TrendingDown, TrendingUp, TrendingFlat } from '@material-ui/icons';

interface Props {
    progression: string
}

const ProgressionIcon = ({ progression }: Props) => {
    switch (progression[0]) {
        case '-': return <TrendingDown fontSize="large" color="secondary"/>
        case '0': return progression[1] === '%' 
            ? <TrendingFlat fontSize="large" color="disabled"/>
            : <TrendingUp fontSize="large" style={{ color: 'green' }}/>;
        default: return <TrendingUp fontSize="large" style={{ color: 'green' }}/>;
    }
};

export default ProgressionIcon;