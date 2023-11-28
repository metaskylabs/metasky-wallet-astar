import { PrimaryButton } from '@components/Shared';
import { button, buttonContainer } from './style';

function CTAButton({
  onClick,
  ctaText,
}: {
  onClick: () => void;
  ctaText: string;
}) {
  return (
    <div css={[buttonContainer]} className="popup-button">
      <PrimaryButton addStyles={button} onClick={onClick}>
        {ctaText}
      </PrimaryButton>
    </div>
  );
}

export default CTAButton;
