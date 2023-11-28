import { mixins } from '@styles/shared';
import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';
import * as styles from './styles';
import * as Constants from '@utils/constants';

interface ChipProps {
  keyIndex?: number;
  icon?: string;
  onClick?: () => void;
  addStyles?: SerializedStyles;
  textStyle?: SerializedStyles;
  propertiesIconStyle?: SerializedStyles;
  content?: string;
  propertiesIcon: string;
  properties?: string;
}

const Chip: FC<ChipProps> = ({
  keyIndex,
  icon,
  propertiesIcon,
  onClick,
  properties,
  content,
  addStyles,
  textStyle,
  propertiesIconStyle,
}) => {
  return (
    <div
      key={keyIndex}
      onClick={onClick}
      css={[
        styles.chipWrapper,
        mixins.flexAlignJustifiedCenter,
        { ...addStyles },
      ]}
    >
      {icon && content ? (
        <>
          <div css={[styles.chipIcon, mixins.flexAlignCenter]}>
            <img src={icon} alt={content} />
          </div>
          <span css={[styles.chipText, { ...textStyle }]}>
            {Constants.filter.ranking}: {content}
          </span>
        </>
      ) : (
        <>
          <span css={[styles.chipText, { ...textStyle }]}>{properties}</span>
          <div css={[propertiesIconStyle, mixins.flexAlignCenter]}>
            <img src={propertiesIcon} alt={content} />
          </div>
        </>
      )}
    </div>
  );
};

export default Chip;
