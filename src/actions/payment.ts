import { ApiV1 } from '@actions/Axios';

import { MetaskyAPIWrap } from '@typings/api/wrapper';
import { VerifyPanRequest, VerifyPanResponse } from '@typings/api/payment';

export const verifyPan = async (
  payload: VerifyPanRequest,
): Promise<MetaskyAPIWrap<VerifyPanResponse>> => {
  const response = await ApiV1.post(`/kyc/verifyPan`, payload);

  return response.data;
};
