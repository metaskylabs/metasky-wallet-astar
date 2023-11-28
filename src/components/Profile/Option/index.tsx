import * as styles from './styles';
import { FC } from 'react';
import { DividerLine } from '@components/Shared';
import AssetsImg from '@public/images';
import { SerializedStyles } from '@emotion/react';
import { mixins } from '@styles/shared';
import ic_rightArrowBlueThin from '@public/images/icons/ic_right_arrow_blue_thin.svg';
interface OptionProps {
  text: string;
  index: number;
  onClick: (index: number) => void;
  font: string;
  addStyles?: SerializedStyles;
  offerCount?: number;
  unreadMessagesCount?: number | null;
  isBlueArrow?: boolean;
}

const Option: FC<OptionProps> = ({
  index,
  text,
  onClick,
  font,
  addStyles,
  offerCount = 0,
  unreadMessagesCount,
  isBlueArrow,
}) => {
  return (
    <div css={[addStyles]}>
      <div css={styles.container} onClick={() => onClick(index)}>
        <div
          css={[
            offerCount >= 1 && mixins.flexAlignCenter,
            font === `bold` ? styles.textBold : styles.textLight,
          ]}
        >
          <p>{text}</p>
          {offerCount >= 1 && (
            <p css={[styles.offerText]}>{offerCount} Offer</p>
          )}
        </div>
        {text === `Contact Support` && unreadMessagesCount
          ? unreadMessagesCount > 0 && (
              <div>
                <span>{unreadMessagesCount}</span>
              </div>
            )
          : null}
        <div css={styles.icon}>
          <img
            src={
              isBlueArrow
                ? AssetsImg.ic_rightArrowBlueThin.src
                : AssetsImg.ic_rightArrow.src
            }
            alt="arrow pointing to right"
          />
        </div>
      </div>
      <DividerLine />
    </div>
  );
};

export default Option;
