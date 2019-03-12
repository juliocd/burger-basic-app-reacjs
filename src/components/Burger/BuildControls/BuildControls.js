import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad'},
    { label: 'Bacon', type: 'bacon'},
    { label: 'Cheese', type: 'cheese'},
    { label: 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        {controls.map(ctrl => {
            return <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                added={() => props.ingridientAdd(ctrl.type)}
                removed={() => props.ingridientRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]} />
        })}
        <button 
        onClick={props.ordered}
        className={classes.OrderButton}
        disabled={!props.purchasable}>ORDER NOW</button>
    </div>
);

export default buildControls;