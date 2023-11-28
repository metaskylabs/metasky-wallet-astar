import PropTypes from 'prop-types';
import React, { Component } from 'react';
import PinItem from './MPinItem';

/**
 */
class MPinInput extends Component {
  constructor(props) {
    super(props);

    this.values = Array(props.length)
      .fill('')
      .map((x, i) => props.initialValue.toString()[i] || '');
    this.elements = [];
    this.currentIndex = 0;

    this.onPaste = this.onPaste.bind(this);
  }

  componentDidMount() {
    // Setting focus on the first element
    if (this.props.focus && this.props.length) this.elements[0].focus();
  }

  clear() {
    this.elements.forEach((e) => e.clear());
    this.values = this.values.map(() => undefined);
    this.elements[0].focus();
  }

  focus() {
    if (this.props.length) this.elements[0].focus();
  }

  /**
   */
  onItemChange(value, isPasting, index) {
    const { length, onComplete, onChange } = this.props;
    let currentIndex = index;

    this.values[index] = value;
    // Set focus on next
    if (value.length === 1 && index < length - 1) {
      currentIndex += 1;
      this.elements[currentIndex].focus();
    }

    // Notify the parent
    const pin = this.values.join('');

    onChange(pin, currentIndex);
  }

  onBackspace(index) {
    if (index > 0) {
      this.elements[index - 1].focus();
    }
  }

  onPaste(value) {
    const { length } = this.props;
    if (value.length !== length) {
      return;
    }

    this.elements.forEach((el, index) => el.update(value[index], true));
    // console.log('pasted item',this.elements.forEach((el, index) => el.update(value[index], true)))
  }

  render() {
    return (
      <div style={this.props.style} className="pincode-input-container">
        {this.values.map((e, i) => (
          <PinItem
            initialValue={e}
            ref={(n) => (this.elements[i] = n)}
            key={i}
            disabled={this.props.disabled}
            onBackspace={() => this.onBackspace(i)}
            secret={this.props.secret || false}
            onChange={(v, isPasting) => this.onItemChange(v, isPasting, i)}
            type={this.props.type}
            inputMode={this.props.inputMode}
            validate={this.props.validate}
            inputStyle={this.props.inputStyle}
            inputFocusStyle={this.props.inputFocusStyle}
            autoSelect={this.props.autoSelect}
            onInput={this.onPaste}
            regexCriteria={this.props.regexCriteria}
            secretValue={
              this.props.secret && this.values[i] ? `*` : this.values[i]
            }
            pastedValue={this.pastedValue}
            onKeyPress={this.props.onKeyPress}
          />
        ))}
      </div>
    );
  }
}

MPinInput.propTypes = {
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  length: PropTypes.number.isRequired,
  type: PropTypes.string,
  onComplete: PropTypes.func,
  validate: PropTypes.func,
  secret: PropTypes.bool,
  disabled: PropTypes.bool,
  focus: PropTypes.bool,
  onChange: PropTypes.func,
  inputMode: PropTypes.string,
  style: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  inputFocusStyle: PropTypes.object, // eslint-disable-line react/forbid-prop-types
  autoSelect: PropTypes.bool,
  masked: PropTypes.bool,
  regexCriteria: PropTypes.any,
};

MPinInput.defaultProps = {
  initialValue: '',
  type: 'numeric',
  secret: false,
  validate: null,
  focus: false,
  disabled: false,
  onChange: () => {},
  onComplete: () => {},
  inputMode: undefined,
  style: {},
  inputStyle: {},
  inputFocusStyle: {},
  autoSelect: true,
  masked: false,
  regexCriteria: /^[a-zA-Z0-9]+$/,
};

export default MPinInput;
