import { props } from '@webflow/data-types';
import { Timer } from './Timer';
import { declareComponent } from '@webflow/react';

export default declareComponent(Timer, {
    name: 'Timer',
    description: 'A simple timer that counts up every second',
    group: 'Basic',
    props: {
        backgroundColor: props.Text({
            name: 'Background Color',
            defaultValue: 'cornsilk',
        })
    }
})