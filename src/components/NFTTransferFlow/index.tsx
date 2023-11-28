import React, { useState } from 'react';
import Transfer from '@components/Transfer';

export default function NFTTransferFlow(props: {
  nftUid?: string;
  onBack: () => void;
}) {
  const [transferLoading, setTransferLoading] = useState<boolean>(false);

  return (
    <Transfer
      defaultNftUid={props.nftUid}
      transferLoading={transferLoading}
      setTransferOpen={(state) => {
        if (!state) props.onBack();
      }}
      setTransferLoading={setTransferLoading}
    />
  );
}
