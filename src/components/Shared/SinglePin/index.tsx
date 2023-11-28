import { SerializedStyles } from '@emotion/react';
import React, {
  KeyboardEventHandler,
  ReactText,
  useEffect,
  useRef,
} from 'react';
import * as styles from './styles';

interface SinglePinProps {
  onSinglePinChange: (value: ReactText) => void;
  focus: number;
  addedStyles?: SerializedStyles;
  inputStyles?: SerializedStyles;
  onFocus: (event: number) => void;
  onBlur: (event: number) => void;
  inputIndex: number;
  readOnly?: boolean;
  onBackSpace?: KeyboardEventHandler<HTMLInputElement>;
  value?: ReactText;
}

const SinglePin: React.FC<SinglePinProps> = ({
  onSinglePinChange,
  focus,
  inputIndex,
  addedStyles,
  onFocus,
  onBlur,
  readOnly,
  onBackSpace,
  value,
  inputStyles,
}) => {
  const inpRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inpRef && inpRef.current && focus === inputIndex) {
      inpRef.current.focus();
    }
  }, [focus, inpRef, inputIndex]);

  return (
    <div css={[styles.container, addedStyles]}>
      <input
        readOnly={readOnly}
        css={[styles.input, inputStyles]}
        value={value}
        onChange={(event) => {
          const { value } = event.target;
          onSinglePinChange(value);
        }}
        ref={inpRef}
        onKeyDown={onBackSpace}
        onFocus={() => onFocus(inputIndex)}
        onBlur={() => onBlur(inputIndex)}
      />
    </div>
  );
};

export default SinglePin;
