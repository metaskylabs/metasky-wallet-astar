import Image from 'next/image';
import { FC } from 'react';
import * as styles from './styles';
import nftCard from '@public/Card/nftCard.png';
import { motion } from 'framer-motion';

type AppProps = {
  cardId: any;
};

const CardDetails: FC<AppProps> = ({ cardId }) => {
  const bodyVariant = {
    initial: {
      opacity: 0,
      y: `10%`,
      transition: {
        duration: 0.3,
      },
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  const imageVariant = {
    initial: {
      rotateY: 0,
      transition: {
        type: `tween`,
        easeIn: [0.25, 0.1, 0.25, 1],
      },
    },
    animate: {
      rotateY: 180,
      transition: {
        type: `tween`,
        easeOut: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <section css={styles.card}>
      <motion.div css={styles.imageExpand} layoutId={`imageExpand-${cardId}`}>
        <motion.div
          initial="initial"
          animate="animate"
          exit="initial"
          variants={imageVariant}
        >
          <Image src={nftCard} alt="image" />
        </motion.div>
      </motion.div>
      <motion.div
        css={styles.cardBody}
        initial="initial"
        animate="animate"
        exit="initial"
        variants={bodyVariant}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ipsam
        neque placeat maxime a? Dicta quo aperiam voluptatibus doloribus aliquam
        minus recusandae maiores impedit? Nostrum sapiente quae totam harum
        nisi!
      </motion.div>
    </section>
  );
};

export default CardDetails;
