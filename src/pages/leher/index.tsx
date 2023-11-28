import React, { useState } from 'react';
import * as styles from '@styles/Modules/leher';
import { utils } from '@styles/shared';
import { motion } from 'framer-motion';

interface IframeDetails {
  url: null | string;
  open: boolean;
}

const Leher = () => {
  const [iframeDetails, setIframeDetails] = useState<IframeDetails>({
    url: null,
    open: false,
  });

  return (
    <>
      <div css={styles.mainContainer}>
        <div css={styles.headerContainer}>
          <div>
            <img
              src="https://lifafa.leher.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fapp-logo.e2816a72.png&w=256&q=75"
              alt="Leher"
            />
          </div>
          <div>
            <button
              css={[styles.btn, utils.mr(10)]}
              onClick={() => {
                setIframeDetails({
                  url: `https://wallet.metasky.me/`,
                  open: true,
                });
              }}
            >
              OPEN WALLET
            </button>
            <button css={styles.btn}>GET APP</button>
          </div>
        </div>
        <div css={styles.innerContainer}>
          <button
            css={styles.btn}
            className="big"
            onClick={() => {
              setIframeDetails({
                url: `https://wallet.metasky.me/purchase-nft/ad1bhdfve-efd0-4fc2-96fd-508afd56d8de?client_id=ronit&showBottomNav=false&autoClaim=true`,
                open: true,
              });
            }}
          >
            CLAIM NOW
          </button>
        </div>
      </div>

      {iframeDetails.open && (
        <>
          <motion.div
            css={styles.overlay}
            onClick={() => {
              setIframeDetails({
                url: null,
                open: false,
              });
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              default: { duration: 0.5 },
              ease: `easeIn`,
            }}
          ></motion.div>
          <motion.div
            css={styles.iframeContainer}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2,
              default: { duration: 0.5 },
              ease: `easeIn`,
            }}
          >
            <div css={styles.iframeClose}>
              <button
                onClick={() => {
                  setIframeDetails({
                    url: null,
                    open: false,
                  });
                }}
              >
                <span>CLOSE</span> <span className="x">&times;</span>
              </button>
            </div>
            <iframe
              src={iframeDetails.url || ``}
              allow="clipboard-read; clipboard-write"
              allowFullScreen={true}
            />
          </motion.div>
        </>
      )}
    </>
  );
};

export default Leher;
