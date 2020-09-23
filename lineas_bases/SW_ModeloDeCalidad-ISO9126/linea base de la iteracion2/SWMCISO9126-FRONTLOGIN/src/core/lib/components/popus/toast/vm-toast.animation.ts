import {
  animate,
  AnimationTriggerMetadata,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export const VMToastAnimations: {
  readonly animateToast: AnimationTriggerMetadata;
} = {
  animateToast: trigger('toastAnimation', [
    state('default', style({ transform: 'translateX(0px)', opacity: 1 })),
    transition('void => *', [
      style({ transform: 'translateX(200px)', opacity: 0 }),
      animate('{{ fadeIn }}ms')
    ]),
    transition(
      'default => closing',
      animate('{{ fadeOut }}ms', style({ transform: 'translateX(200px)', opacity: 0 }))
    )
  ])
};

export type VMToastAnimationState = 'default' | 'closing';
