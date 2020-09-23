import { SelectListItem } from '@core/lib/components/form/vm-form-select/vm-form-select.component';

export const PRegisterUser = 'P_REGISTER_USER';
export const PUniqueUserLocalEstablishment = 'P_UNIQUE_USER_LOCAL_ESTABLISHMENT';
export const PUniqueUserLocal = 'P_UNIQUE_USER_LOCAL';
export const PUniqueUserGlobal = 'P_UNIQUE_USER_GLOBAL';
export const PCampaignLocalEstablishment = 'P_CAMPAIGN_LOCAL_ESTABLISHMENT';
export const PCampaignLocal = 'P_CAMPAIGN_LOCAL';
export const PCampaignGlobal = 'P_CAMPAIGN_GLOBAL';

export const TypesOfPromotions: Array<SelectListItem> = [
  /* {
    text: 'P. de Registro de Usuario',
    value: 'P_REGISTER_USER'
  }, */
  {
    text: 'P. de una Sede para un Usuario Específico',
    value: 'P_UNIQUE_USER_LOCAL_ESTABLISHMENT'
  },
  /* {
    text: 'P. de Local para un Usuario Específico',
    value: 'P_UNIQUE_USER_LOCAL'
  },
  {
    text: 'P. Global para un Usuario Específico',
    value: 'P_UNIQUE_USER_GLOBAL'
  }, */
  {
    text: 'P. de una Sede para varios usuarios',
    value: 'P_CAMPAIGN_LOCAL_ESTABLISHMENT'
  }/* ,
  {
    text: 'P. de Local para varios usuarios',
    value: 'P_CAMPAIGN_LOCAL'
  },
  {
    text: 'P. Global para varios usuarios',
    value: 'P_CAMPAIGN_GLOBAL'
  } */
];
