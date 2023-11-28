import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { ApiV1 } from './Axios';
import { purchaseBeerBenefitPayload } from '@typings/api/beerbenefit';

export const purchaseBeerBenefit = async (
  payload: purchaseBeerBenefitPayload,
): Promise<MetaskyAPIWrap<any>> => {
  return await ApiV1.post(`/wallet/consumables/tanuki/beer`, payload);
};
