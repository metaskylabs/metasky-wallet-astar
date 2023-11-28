import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {
  input: {
    padding: 0,
    margin: '0 2px',
    textAlign: 'center',
    border: '1px solid',
    background: 'transparent',
    width: '100%',
    height: '52px',
    aspectRatio: '1/1',
  },
  inputFocus: {
    outline: 'none',
    boxShadow: 'none',
  },
};

/**
 */
class PinItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.validate(props.initialValue),
      focus: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onPaste = this.onPaste.bind(this);
    this.onInput = this.onInput.bind(this);
  }

  onKeyDown(e) {
    if (e.keyCode === 8 && (!this.state.value || !this.state.value.length)) {
      this.props.onBackspace();
    }
  }

  clear() {
    this.setState({
      value: '',
    });
  }

  update(updatedValue, isPasting = false) {
    const value = this.validate(updatedValue);
    if (this.state.value === value && !isPasting) return;

    if (value.length < 2) {
      this.setState({
        value,
      });

      setTimeout(() => {
        this.props.onChange(value, isPasting);
      }, 0);
    }
  }

  onChange(e) {
    if (this.props.secret && e.target.value.includes('*')) {
      return;
    }
    this.update(e.target.value);
  }

  onInput(e) {
    if (!this.props.onInput) {
      return;
    }
    this.props.onInput(e.target.value);
  }

  focus() {
    this.input.focus();
  }

  onFocus(e) {
    if (this.props.autoSelect) {
      e.target.select();
    }
    this.setState({ focus: true });
  }

  onBlur() {
    this.setState({ focus: false });
  }

  onPaste(e) {
    if (!this.props.onPaste) {
      return;
    }
    const value = e.clipboardData.getData('text');
    this.props.onPaste(value);
  }

  validate(value) {
    if (this.props.validate) {
      return this.props.validate(value);
    }

    if (this.props.type === 'numeric') {
      const numCode = value.charCodeAt(0);
      const isInteger =
        numCode >= '0'.charCodeAt(0) && numCode <= '9'.charCodeAt(0);
      return isInteger ? value : '';
    }
    if (this.props.regexCriteria.test(value)) {
      return value.toUpperCase();
    }

    return '';
  }

  render() {
    const { focus, value } = this.state;
    const {
      type,
      inputMode,
      inputStyle,
      inputFocusStyle,
      masked,
      secretValue,
      secret,
    } = this.props;
    const inputType = type === 'numeric' ? 'tel' : type || 'text';
    return (
      <input
        disabled={this.props.disabled ? 'disabled' : undefined}
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        onKeyPress={this.props.onKeyPress}
        placeholder={value}
        aria-label={value}
        maxLength="6"
        autoComplete="off"
        type={inputType}
        inputMode={inputMode || 'text'}
        pattern={this.props.type === 'numeric' ? '[0-9]*' : '^[a-zA-Z0-9]+$'}
        ref={(n) => (this.input = n)}
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onPaste={this.onPaste}
        onInput={this.onInput}
        style={Object.assign(
          {},
          styles.input,
          inputStyle,
          focus ? Object.assign({}, styles.inputFocus, inputFocusStyle) : {},
        )}
        value={secret ? secretValue : value}
      />
    );
  }
}

PinItem.propTypes = {
  initialValue: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBackspace: PropTypes.func.isRequired,
  onPaste: PropTypes.func,
  onInput: PropTypes.func.isRequired,
  secret: PropTypes.bool,
  disabled: PropTypes.bool,
  type: PropTypes.string,
  inputMode: PropTypes.string,
  validate: PropTypes.func,
  inputStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  autoSelect: PropTypes.bool,
  regexCriteria: PropTypes.any,
};

PinItem.defaultProps = {
  secret: false,
  type: 'numeric',
  inputMode: undefined,
  disabled: false,
  validate: undefined,
  autoSelect: false,
  onPaste: undefined,
  regexCriteria: /^[a-zA-Z0-9]+$/,
};

export default PinItem;
