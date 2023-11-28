import { FC } from 'react';
import * as styles from './styles';
import { mixins, utils } from '@styles/shared';
import * as Constants from '@utils/constants';
import SecondaryButton from '@components/Shared/Button/SecondaryButton';

interface ButtonLabelledRowInputProps {
  label?: string;
  labelIcon?: string;
  type?: Constants.InputType;
  labelIconName?: string;
  placeholder?: string;
  name?: string;
  handleChange?: any;
  value?: string;
  errors?: any;
  buttonText?: string;
  buttonClickHandler?: any;
  description?: string;
}

const ButtonLabelledRowInput: FC<ButtonLabelledRowInputProps> = ({
  label,
  labelIcon,
  type,
  labelIconName,
  placeholder,
  handleChange,
  value,
  name,
  errors,
  buttonText,
  buttonClickHandler,
  description,
}) => {
  const blockInvalidChar = (e: any) =>
    [`e`, `E`, `+`, `-`].includes(e.key) && e.preventDefault();
  return (
    <div css={[mixins.flexColumn]}>
      <div css={[styles.inputFormControl, mixins.flex]}>
        <div css={[styles.inputFormLabel, mixins.flexAlignCenter]}>
          {labelIcon && (
            <div css={[styles.inputFormImage, mixins.flex]}>
              <img src={labelIcon} alt={labelIconName} />
            </div>
          )}
          <label css={[styles.iconLabel, utils.mr(10)]}>{label}</label>
        </div>
        <div css={[styles.inputFormInputWrapper]}>
          <input
            type={type}
            css={[styles.inputFormInput, mixins.placeholderTextstyle]}
            placeholder={placeholder}
            onChange={handleChange}
            value={value}
            name={name}
            min="1"
          />
          <div
            onClick={() => buttonClickHandler()}
            css={[styles.inputFormInputIcon, mixins.flexAlignCenter]}
          >
            <SecondaryButton addStyles={styles.inputFormButton}>
              {buttonText}
            </SecondaryButton>
          </div>
        </div>
      </div>
      <div css={styles.descriptionWrapper}>
        {errors && <p css={styles.errorMessage}>{errors}</p>}
        {description && <p css={styles.description}>{description}</p>}
      </div>
    </div>
  );
};

export default ButtonLabelledRowInput;
