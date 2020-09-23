import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const SidebarAnimations: {
  readonly sidebarAnimation: AnimationTriggerMetadata;
  readonly sidebarItemAnimation: AnimationTriggerMetadata;
} = {

  sidebarAnimation: trigger('sidebarAnimation', [
    state('in', style({ transform: 'translate(0px,0)', opacity: 1, width: '220px' })),
    transition(':enter', [
      style({ opacity: 0, width: '0px', transform: 'translate(-220px,0)' }),
      animate('300ms ease-in')
    ]),
    transition(':leave', [
      animate('300ms ease-out', style({ transform: 'translate(0px,0)', opacity: 0, width: '0px' }))
    ])
  ]),

  sidebarItemAnimation: trigger('sidebarItemAnimation', [
    state('closed', style({ height: '0px', display: 'none', opacity: 0 })),
    state('open', style({ height: '*', display: 'block', opacity: 1 })),
    transition('closed => open', [
      style({ height: '0px', opacity: 0 }),
      animate('300ms ease-out', style({ height: '*', opacity: 1 }))
    ]),
    transition(
      'open => closed',
      animate('300ms ease-in', style({ height: '0px', opacity: 0 }))
    )
  ])
};

export type SidebarAnimationsState = 'closed' | 'open';
