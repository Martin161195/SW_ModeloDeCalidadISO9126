import { Plan } from '@shared/models/plan/plan.class';

export const isEnabledByArrayPlanCode = (plans: Array<string>, plan: Plan): boolean => {
  return Array.isArray(plans) && !!plan && plans.includes(plan.code);
};

export const isEnabledByArrayPlanCodeValue = (plans: Array<string>, plan: string): boolean => {
  return Array.isArray(plans) && plans.includes(plan);
};
