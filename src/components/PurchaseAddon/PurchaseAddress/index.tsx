import { FC, Fragment, useState } from 'react';
import * as styles from './styles';
import { mixins, typography, utils } from '@styles/shared';
import { PrimaryButton, SecondaryButton } from '@components/Shared';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import Dropdown from '@components/Dropdown';
import { TicketUserInput, TicketUserInputType } from '@typings/api/wallet';
import ButtonLayout from '@components/HOC/ButtonLayout.tsx';

interface PurchaseAddOnProps {
  userInputs: TicketUserInput[];
  onUserInputUpdate: (userInputs: TicketUserInput[]) => void;
  onCancel: () => void;
  onSuccess: () => void;
}

const PurchaseAddOn: FC<PurchaseAddOnProps> = ({
  userInputs,
  onUserInputUpdate,
  onCancel,
  onSuccess,
}) => {
  return (
    <ButtonLayout
      buttonComponent={
        <section
          css={[styles.buttonContainer, mixins.flexAlignCenterJustifiedBetween]}
        >
          <SecondaryButton addStyles={styles.cancelbutton} onClick={onCancel}>
            CANCEL
          </SecondaryButton>
          <PrimaryButton
            addStyles={styles.logoutButton}
            onClick={() => {
              for (const userInput of userInputs) {
                let valid = true;
                const regexExp: any = {
                  EMAIL:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  PHONE: /^(?:\d{10}|\+(?:[0-9]?){6,14}[0-9])$/,
                };
                if (regexExp[userInput.id] || userInput.validator) {
                  const regex =
                    regexExp[userInput.id] ||
                    new RegExp(userInput?.validator as string);
                  valid = regex.test(userInput.value);
                } else valid = !!userInput.value;
                if (!valid) {
                  generateToast({
                    type: ToastType.ERROR,
                    content: `${userInput.name} is not valid. Please enter valid detail.`,
                  });
                  return;
                }
              }
              onSuccess();
            }}
          >
            Continue
          </PrimaryButton>
        </section>
      }
    >
      <div css={styles.title}>Details</div>
      <div css={styles.subtitle}>
        Please specify the details required to place order
      </div>
      <div css={styles.addressContainer}>
        {userInputs.map((userInput, index) => {
          if (userInput.type === TicketUserInputType.SELECT) {
            return (
              <div key={index}>
                <span css={styles.label}>{userInput.name}</span>
                <Dropdown
                  placeholder={userInput.placeholder}
                  options={
                    userInput.options?.map((option) => ({
                      id: option,
                      value: option,
                    })) || []
                  }
                  onChange={(id, value) => {
                    const newInputs = [...userInputs];
                    newInputs[index].value = value;
                    onUserInputUpdate(newInputs);
                  }}
                  value={
                    userInput.value
                      ? { id: userInput.value, value: userInput.value }
                      : undefined
                  }
                />
              </div>
            );
          }
          if (userInput.type === TicketUserInputType.MULTILINE_TEXT)
            return (
              <div key={index}>
                <span css={styles.label}>{userInput.name}</span>
                <textarea
                  css={styles.searchInput}
                  placeholder={userInput.placeholder}
                  maxLength={500}
                  value={userInput.value}
                  onChange={(e) => {
                    const newInputs = [...userInputs];
                    newInputs[index].value = e.target.value;
                    onUserInputUpdate(newInputs);
                  }}
                />
              </div>
            );
          return (
            <div key={index}>
              <span css={styles.label}>{userInput.name}</span>
              <input
                css={styles.searchInput}
                placeholder={userInput.placeholder}
                maxLength={100}
                value={userInput.value}
                onChange={(e) => {
                  const newInputs = [...userInputs];
                  newInputs[index].value = e.target.value;
                  onUserInputUpdate(newInputs);
                }}
              />
            </div>
          );
        })}
      </div>
    </ButtonLayout>
  );
};

export default PurchaseAddOn;
