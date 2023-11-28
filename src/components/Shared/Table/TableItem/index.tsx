/** @jsxImportSource @emotion/react */
import * as styles from './styles';
import { FC, ReactNode } from 'react';
import { colors, mixins, typography, utils } from '@styles/shared';
import { AccountStatus } from '@components/Shared';
import { Pages } from '@utils/navigation';
import { useRouter } from 'next/router';
import { dateFormat } from '@utils/helper';

interface TableItemProps {
  from: string | null | undefined;
  customTag?: ReactNode;
  price: string;
  createdAt: string;
  onClick?: () => void;
}

const TableItem: FC<TableItemProps> = ({
  from,
  price,
  customTag,
  createdAt,
  onClick,
}) => {
  return (
    <section css={[styles.container]}>
      <article
        css={[
          mixins.flexAlignCenterJustifiedBetween,
          onClick && mixins.cursorPointer,
        ]}
        {...(onClick && { onClick: onClick })}
      >
        <div>
          <h2 css={[typography.T_14_Bold, styles.itemName, utils.mb(4)]}>
            {from}
          </h2>
          {customTag && customTag}
        </div>
        <div>
          <p
            css={[
              typography.T_16_Bold,
              {
                color: colors.Primary_Blue,
                textAlign: `right`,
              },
              mixins.cursorPointer,
              utils.mb(4),
            ]}
          >
            ₹{price}
          </p>
          <p
            css={[
              typography.T_12_Regular,
              {
                color: colors.Secondary_Black_Text,
                textAlign: `right`,
              },
            ]}
          >
            {createdAt}
          </p>
        </div>
      </article>
    </section>
  );
};

export default TableItem;
