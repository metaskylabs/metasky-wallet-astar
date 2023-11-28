import EmptyBenefits from '@components/Benefits/EmptyBenefits';
import { BenefitsListCard } from '@components/Shared';
import { dateTimeFormat } from '@utils/helper';
import { Pages } from '@utils/navigation';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { FC, Fragment } from 'react';
import BenefitCardEnhanced from '../BenefitCardEnhanced';
import * as styles from './styles';

interface BenefitsListProps {
  list: any;
  nftId?: string;
}

const BenefitsList: FC<BenefitsListProps> = ({ list, nftId }) => {
  const router = useRouter();

  const handleBenefitsDetailsRoute = (data: any) => {
    router.push({
      pathname: `${Pages.BENEFITS_DETAILS}/${data.id}`,
      query: {
        nftId: nftId || ``,
      },
    });
  };

  return (
    <Fragment>
      {list.length > 0 ? (
        list.map((data: any, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.17,
              default: { duration: 0.3 },
              ease: `easeOut`,
            }}
            style={{ marginBottom: 20 }}
          >
            <BenefitCardEnhanced
              benefits={data}
              onClick={() => handleBenefitsDetailsRoute(data)}
              nftId={nftId}
              hideActions
            />
          </motion.div>
        ))
      ) : (
        <div css={[styles.emptyBenefitsContainer]}>
          <EmptyBenefits />
        </div>
      )}
    </Fragment>
  );
};

export default BenefitsList;
