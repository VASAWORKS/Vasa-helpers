import { props } from '@webflow/data-types';
import { declareComponent } from '@webflow/react';
import { Rive } from './Rive';

export default declareComponent(Rive, {
  name: 'Rive',
  description: 'Advanced Rive component',
  group: 'Animations',
  props: {
    src: props.Text({
      name: 'Rive Source',
      defaultValue: 'https://cdn.rive.app/animations/vehicles.riv',
      tooltip: 'The source of the animation',
    }),
    loadingBackground: props.Text({
      name: 'Loading Background',
      tooltip: 'The background color of the loading screen',
      defaultValue: '#303030',
    }),
    loadingSpinnerColor: props.Text({
      name: 'Loading Spinner Color',
      tooltip: 'The color of the loading spinner',
      defaultValue: '#ffffff',
    }),
    autoPlay: props.Boolean({
      name: 'Autoplay',
      defaultValue: true,
      tooltip: 'Whether the animation should autoplay',
    }),
    startOnView: props.Boolean({
      name: 'Start on View',
      defaultValue: false,
      tooltip: 'Whether the animation should when the component is in view',
    }),
    fontSource: props.Text({
      name: 'Font Source',
      tooltip: 'The source of the font. If not provided, the animation will not be loaded with a custom font.',
    }),
    fit: props.Text({
      name: 'Fit',
      defaultValue: 'Cover',
      tooltip:
        'The fit of the animation. Options: Cover, Contain, Fill, None, Scale-down, Fit-Width, Fit-Height, Layout',
    }),
    stateMachine: props.Text({
      name: 'State Machine',
      defaultValue: 'State Machine 1',
      tooltip: 'The state machine of the animation',
    }),
    showLoadingSpinner: props.Boolean({
      name: 'Show Loading Spinner',
      defaultValue: true,
      tooltip: 'Whether to show the loading spinner',
    }),
  },
});
