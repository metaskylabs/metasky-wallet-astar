import { CardExclusiveBenefits } from '@components/Shared';
import { BenefitType } from '@constants/wallet';
import AssetsImg from '@public/images';
import { WalletBenefitsResponse } from '@typings/api/wallet';
import { dateTimeFormat } from '@utils/helper';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { FC, useCallback, useState } from 'react';
import * as styles from './styles';
import { useAnalytics } from '@utils/useAnalytics';

const determineClasses = (indexes: PointerProps, cardIndex: number) => {
  if (indexes.currentIndex === cardIndex) {
    return styles.active;
  } else if (indexes.nextIndex === cardIndex) {
    return styles.next;
  } else if (indexes.previousIndex === cardIndex) {
    return styles.prev;
  }
  return `inactive`;
};

interface PointerProps {
  previousIndex: number;
  currentIndex: number;
  nextIndex: number;
}

interface ExclusiveBenefitsInterface {
  cardItems: any;
  nftId: string;
  benefitType: BenefitType;
}

const ExclusiveBenefits: FC<ExclusiveBenefitsInterface> = ({
  cardItems,
  nftId,
  benefitType,
}) => {
  const router = useRouter();
  const [indexes, setIndexes] = useState<PointerProps>({
    previousIndex: 0,
    currentIndex: 0,
    nextIndex: 1,
  });
  const { trackClick } = useAnalytics();

  const handleNextCardTransition = useCallback(() => {
    if (indexes.currentIndex >= cardItems?.length - 1) {
      setIndexes({
        previousIndex: cardItems?.length - 1,
        currentIndex: 0,
        nextIndex: 1,
      });
    } else {
      setIndexes((prevState) => ({
        previousIndex: prevState.currentIndex,
        currentIndex: prevState.currentIndex + 1,
        nextIndex:
          prevState.currentIndex + 2 === cardItems?.length
            ? 0
            : prevState.currentIndex + 2,
      }));
    }
  }, [indexes.currentIndex]);

  const handleBenefitsDetailsRoute = () => {
    router.push({
      pathname: `${Pages.BENEFITS}/${benefitType}/${nftId}`,
    });
  };

  return (
    <div css={styles.container}>
      <ul
        css={[
          styles.cardCarousel,
          cardItems?.length === 2 && styles.cardMarginIndex,
          cardItems?.length > 2 && styles.cardMarginLastIndex,
        ]}
      >
        {cardItems?.map((card: WalletBenefitsResponse, index: number) => (
          <li
            onClick={() => {
              trackClick(`exclusive benefit card`, {
                benefit_type: benefitType,
                id: card.id,
              });
              handleBenefitsDetailsRoute();
            }}
            key={index}
            css={[styles.card, determineClasses(indexes, index)]}
          >
            <CardExclusiveBenefits
              image={card.image ? card.image : AssetsImg.i_coupon}
              name={card.name ? card.name : ``}
              description={card.description ? card.description : ``}
              received={
                card.receivedDate
                  ? dateTimeFormat(card.receivedDate)
                  : undefined
              }
              cardKey={card.id}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExclusiveBenefits;
