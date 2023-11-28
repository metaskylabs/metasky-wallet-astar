import React, { useEffect, useState, KeyboardEvent, ReactText } from 'react';
import { css, SerializedStyles } from '@emotion/react';

import * as styles from './styles';
import SinglePin from '../../SinglePin';

export interface PinInputProps {
  label?: string;
  addedStyles?: SerializedStyles;
  invalid?: boolean;
  success?: boolean;
  onChange?: (value: ReactText) => void;
  readOnly?: boolean;
  masked?: boolean;
  pinLength: number;
}
const BACK_SPACE_CODES: string[] = [`Backspace`];
const PinInput: React.FC<PinInputProps> = ({
  label,
  addedStyles,
  invalid,
  success,
  onChange,
  readOnly,
  masked,
  pinLength,
}) => {
  const [pinInputArray, setPinInputArray] = useState<ReactText[]>([
    ...Array(pinLength),
  ]);
  const [focusedInputCounter, setFocusedInputCounter] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  useEffect(() => {
    if (onChange) {
      onChange(pinInputArray.join(``));
    }
  }, [pinInputArray, onChange]);

  const onPinChange = (value: ReactText) => {
    if (focusedInputCounter >= 0 && !pinInputArray[focusedInputCounter]) {
      setPinInputArray((prevState) => {
        const updatedPin = [...prevState];
        updatedPin[focusedInputCounter] = value as string;
        return updatedPin;
      });
    }
    setFocusedInputCounter((prevState) =>
      prevState + 1 < pinInputArray.length ? prevState + 1 : prevState,
    );
  };

  const onFocusHandler = (value: number) => {
    if (!pinInputArray[value]) {
      while (value > 0) {
        if (!pinInputArray[value - 1]) {
          value--;
        } else break;
      }
    } else {
      while (value < pinInputArray.length) {
        if (pinInputArray[value]) {
          value++;
        } else break;
      }
    }

    setFocusedInputCounter(
      value < pinInputArray.length ? value : pinInputArray.length - 1,
    );
    setIsFocused(true);
  };

  const onBackHandler = (keycode: string) => {
    let prevStateIndex = -1;
    if (!readOnly && BACK_SPACE_CODES.includes(keycode)) {
      setFocusedInputCounter((prevInputCounter) => {
        prevStateIndex = prevInputCounter;
        return !pinInputArray[prevInputCounter]
          ? prevInputCounter > 0
            ? prevInputCounter - 1
            : 0
          : prevInputCounter;
      });
      setPinInputArray((prevInputArray) =>
        prevInputArray.map((inputElement, index) => {
          if (!pinInputArray[prevStateIndex]) {
            if (prevStateIndex - 1 >= 0 && index === prevStateIndex - 1)
              return ``;
            return inputElement;
          } else {
            if (index === prevStateIndex) return ``;
            return inputElement;
          }
        }),
      );
    }
  };

  return (
    <div css={styles.pinWidth}>
      <div css={styles.pins}>
        {pinInputArray.map((_, inputIndex) => (
          <SinglePin
            key={inputIndex}
            value={
              masked && pinInputArray[inputIndex]
                ? `*`
                : pinInputArray[inputIndex]
            }
            focus={focusedInputCounter}
            readOnly={readOnly}
            addedStyles={css([
              isFocused && styles.focused,
              invalid && styles.invalidPins,
              success && styles.successPins,
            ])}
            inputIndex={inputIndex}
            onSinglePinChange={onPinChange}
            onFocus={onFocusHandler}
            onBlur={() => {
              setIsFocused(false);
            }}
            onBackSpace={(event: KeyboardEvent<HTMLInputElement>) => {
              const { key } = event;
              onBackHandler(key);
            }}
            inputStyles={addedStyles}
          />
        ))}
      </div>
    </div>
  );
};

export default PinInput;
