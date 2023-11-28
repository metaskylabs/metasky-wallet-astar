import { ChangeEvent, FC } from 'react';
import * as Constants from '@utils/constants';
import { SerializedStyles } from '@emotion/react';
import NOOB from '@constants/noob';
import { mixins, utils } from '@styles/shared';
import { charaterOnlyRegex, numberRegex, onlyNumber } from '@utils/regexes';

interface InputGroupSuffexProps {
  type: Constants.InputType;
  placeholder?: string;
  addStyles?: SerializedStyles;
  customStyles?: SerializedStyles;
  value?: string | null;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  noSpecialCharacterCheck?: boolean;
  conversion_rate?: number | undefined;
}

const InputGroupSuffex: FC<InputGroupSuffexProps> = ({
  type,
  placeholder,
  addStyles,
  customStyles,
  name,
  onChange,
  value,
  disabled,
  autoFocus,
  noSpecialCharacterCheck,
  conversion_rate,
}) => {
  const onWheel = (e: any) => {
    e.target.blur();
  };
  const blockInvalidChar = (e: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const isDotPresent = value?.indexOf(`.`) > -1;
    const isDotInput = e.key === `.`;

    // I have to avoid the dot:
    if (isDotPresent && isDotInput) {
      // avoid the effect of the event (so the injection of dot into the text)
      e.preventDefault();
    }
    if ([`e`, `E`, `+`, `-`, ` `].includes(e.key)) {
      e.preventDefault();
    }
  };
  return (
    <div
      css={[
        mixins.positionRelative,
        mixins.flexAlignCenter,
        utils.widthPercent(100),
      ]}
    >
      <input
        name={name}
        type={type}
        css={[customStyles, addStyles]}
        placeholder={placeholder}
        onChange={onChange}
        value={value || ``}
        disabled={disabled}
        autoComplete="off"
        min="1"
        onWheel={onWheel}
        autoFocus={autoFocus || false}
        onKeyDown={noSpecialCharacterCheck ? (e) => blockInvalidChar(e) : NOOB}
        inputMode={type === Constants.InputType.number ? `numeric` : `text`}
      />
    </div>
  );
};

export default InputGroupSuffex;
