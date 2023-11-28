import AssetsImg from '@public/images';
import { colors, mixins, utils } from '@styles/shared';
import { motion } from 'framer-motion';
import { FC } from 'react';
import * as styles from './styles';

interface EmptyListOffer {
  message: string;
  actionMessage?: string;
  actionClickHandler?: () => void;
}

const EmptyOfferList: FC<EmptyListOffer> = ({
  message,
  actionMessage,
  actionClickHandler,
}) => {
  return (
    <motion.section
      css={[
        mixins.flexAlignJustifiedCenter,
        mixins.flexColumn,
        utils.heightPercent(100),
      ]}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.1,
        default: { duration: 0.3 },
        ease: `easeOut`,
      }}
    >
      <img
        src={AssetsImg.ic_nftEmpty.src}
        alt=""
        css={[utils.width(164), utils.height(164)]}
      />
      <p css={[styles.emptyOfferDescription, utils.mt(12)]}>{message}</p>
      <p css={styles.emptyOfferDescription}>
        <span
          css={[
            {
              color: colors.Primary_Blue,
            },
            mixins.cursorPointer,
          ]}
          onClick={actionClickHandler}
        >
          {actionMessage}
        </span>
        {` `}
        on market.
      </p>
    </motion.section>
  );
};

export default EmptyOfferList;
