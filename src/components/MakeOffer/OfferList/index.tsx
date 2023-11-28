import {
  AccountStatus,
  DividerLine,
  MLottie,
  TableHeader,
  TableItem,
} from '@components/Shared';
import AssetsImg from '@public/images';
import { colors, mixins, typography, utils } from '@styles/shared';
import { NFTOfferList } from '@typings/api/makeOffer';
import { dateTimeFormat, useOutsideClick } from '@utils/helper';
import React, { FC, useState } from 'react';
import * as styles from './styles';
import * as sortStyles from '@styles/Modules/nftsList';
import { State as MakeOfferState } from '@reducers/makeOffer';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { getNFTOfferList } from '@actions/makeOffer';
import { css } from '@emotion/react';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { useTranslate } from '@utils/useTranslate';

interface OfferListProps {
  list: NFTOfferList[];
  nftUUID: string;
  setViewOfferHandler: (offerData: {
    isOpen: boolean;
    offerId: string;
  }) => void;
}

const OfferLists: FC<OfferListProps> = ({
  list,
  nftUUID,
  setViewOfferHandler,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const ref = useOutsideClick(() => setShowMenu(false));
  const [loading, setLoading] = useState(false);
  const { nftOffer } = useSelector<StoreState, MakeOfferState>(
    (state) => state.makeOffer,
  );
  const { translate } = useTranslate();

  const SortConfig: { key: string; direction: 'DESC' | 'ASC'; name: string }[] =
    [
      {
        key: `created_at`,
        direction: `DESC`,
        name: translate(`DATE_RECEIVED`),
      },
      {
        key: `price`,
        direction: `ASC`,
        name: translate(`PRICE`),
      },
    ];

  const getSortList = async (sort: {
    key: string;
    direction: 'DESC' | 'ASC';
    name: string;
  }) => {
    try {
      setLoading(true);
      setShowMenu(false);
      const payload = {
        nftId: nftUUID,
        sort: [{ key: sort.key, direction: sort.direction }],
      };
      await getNFTOfferList(payload);
      setLoading(false);
    } catch (error) {
      handleErrorMessage(error);
      setShowMenu(false);
      setLoading(false);
    }
  };

  return (
    <section css={styles.container}>
      <article css={[mixins.flexAlignCenterJustifiedBetween, utils.mb(24)]}>
        <p css={[typography.T_20_Bold, { color: colors.Secondary_Black_Text }]}>
          {translate(`OFFERS`)}
        </p>
        {list.length > 1 && (
          <div
            css={[mixins.flex, mixins.cursorPointer, mixins.positionRelative]}
            ref={ref}
          >
            <div onClick={() => setShowMenu(!showMenu)}>
              <span
                css={[
                  typography.T_12_Semibold,
                  { color: colors.Primary_Blue },
                  utils.mr(4),
                ]}
              >
                {translate(`SORT`)}
              </span>
              <img
                src={AssetsImg.ic_sortBlue.src}
                alt=""
                width="18"
                height="18"
              />
            </div>
            {showMenu && (
              <section css={[sortStyles.filterContainer, styles.sortContainer]}>
                {SortConfig.map((sort, index) => (
                  <React.Fragment key={index.toString()}>
                    <div
                      css={[
                        sortStyles.sortItem,
                        nftOffer.sort.find(
                          (s) =>
                            s.key === sort.key &&
                            s.direction === sort.direction,
                        )
                          ? sortStyles.sortItemSelected
                          : ``,
                      ]}
                      onClick={() => getSortList(sort)}
                    >
                      {sort.name}
                    </div>
                    {index < SortConfig.length - 1 ? (
                      <div css={sortStyles.divider} />
                    ) : null}
                  </React.Fragment>
                ))}
              </section>
            )}
          </div>
        )}
      </article>
      <TableHeader
        column1Name={translate(`FROM`)}
        column2Name={translate(`OFFERED_PRICE`)}
      />
      <section css={styles.tableContainer}>
        {loading ? (
          <div css={[utils.height(269), mixins.flexAlignJustifiedCenter]}>
            <MLottie
              addStyles={css({
                width: utils.remConverter(25),
                marginLeft: utils.remConverter(10),
              })}
            />
          </div>
        ) : (
          <div css={styles.optionItem}>
            {list.map((item, index) => (
              <div key={index}>
                <TableItem
                  from={item.buyer.name || item.buyer.email || item.buyer.ph_no}
                  customTag={<AccountStatus statusType={item.status} />}
                  price={item.amount}
                  createdAt={dateTimeFormat(item.created_at)}
                  onClick={() =>
                    setViewOfferHandler({
                      isOpen: true,
                      offerId: item.auction_uuid,
                    })
                  }
                />
                <DividerLine addStyles={styles.divider} />
              </div>
            ))}
          </div>
        )}
      </section>
    </section>
  );
};

export default OfferLists;
