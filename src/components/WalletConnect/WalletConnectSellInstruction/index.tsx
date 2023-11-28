import ButtonLayout from '@components/HOC/ButtonLayout.tsx';
import InstructionTimeline from '@components/InstructionTimeline';
import { PrimaryButton } from '@components/Shared';
import AssetsImg from '@public/images';
import React from 'react';
import * as styles from './styles';

export default function WalletConnectSellInstruction(props: {
  onContinue: () => void;
}) {
  return (
    <div css={styles.container}>
      <ButtonLayout
        addStyles={styles.cta}
        buttonComponent={
          <div css={styles.ctaContainer}>
            <PrimaryButton onClick={props.onContinue} addStyles={styles.cta}>
              Close
            </PrimaryButton>
          </div>
        }
      >
        <div css={styles.innerWrapper}>
          <img src={AssetsImg.g_wc_sell_instruction.src} css={styles.gif} />
          {/* <InstructionTimeline
            title="How it Works?"
            items={[
              {
                name: `Go to OpenSea`,
                description: (
                  <span>
                    Go to{` `}
                    <a
                      href="https://opensea.io/"
                      target="_blank"
                      rel="noreferrer"
                    >
                      https://opensea.io/
                    </a>
                    , click wallet icon and select WalletConnect
                  </span>
                ),
              },
              {
                name: `Scan the QR Code or Enter URI`,
                description: `Either scan the QR Code shown or click Copy to clipboard`,
              },
              {
                name: `Start Using Your Wallet`,
                description: `Click on Profile in Open Sea to browse SkyWallet on OpenSea`,
              },
            ]}
          /> */}
        </div>
      </ButtonLayout>
    </div>
  );
}
