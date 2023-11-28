import { FC } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { OverlayTrigger, Popover } from 'react-bootstrap';

interface TooltipProps {
  content?: string;
  id?: string;
  icon?: string;
}

const Tooltip: FC<TooltipProps> = ({ content, id, icon }) => {
  const popoverHoverFocus = (
    <Popover id="popover-trigger-hover-focus" title="Popover right">
      {content}
    </Popover>
  );

  return (
    <div css={styles.tooltip}>
      <OverlayTrigger
        trigger={[`hover`, `focus`]}
        placement="right"
        overlay={popoverHoverFocus}
      >
        <img
          data-tip
          data-for={`registerTip${id}`}
          src={icon ? icon : AssetsImg.ic_info_blue.src}
          alt="icon"
        />
      </OverlayTrigger>
    </div>
  );
};

export default Tooltip;
