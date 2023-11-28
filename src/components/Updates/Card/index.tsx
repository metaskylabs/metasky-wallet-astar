import AssetsImg from '@public/images';
import { mixins, utils } from '@styles/shared';
import React, { FC } from 'react';
import * as styles from './styles';
import { BottomFadeInAnimation } from '@components/Shared';

interface UpdateCardProps {
  newUpdate: boolean;
  title: string;
  date: string;
  onClick: () => void;
  icon?: string;
  noOfCard: number;
}

const UpdateCard: FC<UpdateCardProps> = ({
  newUpdate,
  title,
  date,
  onClick,
  icon,
  noOfCard,
}) => {
  return (
    <BottomFadeInAnimation delay={noOfCard / 10}>
      <section
        onClick={onClick}
        css={[styles.container, mixins.flexAlignCenterJustifiedStart]}
      >
        {icon && (
          <>
            <article css={[utils.mr(12)]}>
              <img
                src={icon ? icon : AssetsImg.ic_updates.src}
                alt=""
                width="32"
                height="32"
              />
            </article>
            <div css={[styles.verticalDivider]} />
          </>
        )}
        <article>
          <h3 css={[styles.semibold_14, utils.mb(4)]}>{title}</h3>
          <p css={[styles.regular_12]}>{date}</p>
        </article>
        {newUpdate && <div css={[styles.notificationUnRead]} />}
      </section>
    </BottomFadeInAnimation>
  );
};

export default UpdateCard;
