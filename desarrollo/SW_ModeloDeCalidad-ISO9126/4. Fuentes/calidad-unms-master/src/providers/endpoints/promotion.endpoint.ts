export class PromotionEndpoint {
  static create = 'promotion';
  static checkCode = 'promotion/code-unique';
  static delete = 'promotion/{promotionId}';
  static update = 'promotion/{promotionId}';
}
