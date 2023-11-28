import * as styles from './styles';
import AssetImg from '@public/images';
import {
  BottomFadeInAnimation,
  Input,
  PrimaryButton,
} from '@components/Shared';
import { FC, useEffect, useState } from 'react';
import { editProfile } from '@actions/profile';
import { handleErrorMessage } from '@utils/handleResponseToast';
import { InputType } from '@utils/constants';
import { useTranslate } from '@utils/useTranslate';
import { useSelector } from 'react-redux';
import { StoreState } from '@reducers';
import { State as profileState } from '@reducers/user';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { getUserProfile } from '@actions/user';
import { useAnalytics } from '@utils/useAnalytics';
import { CLICK, EVENT_PAGE } from '@constants/analytics';

interface EditProfileProps {
  onSuccess: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ onSuccess }) => {
  const { translate } = useTranslate();

  const { profile } = useSelector<StoreState, profileState>(
    (state) => state.user,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [name, setName] = useState(``);
  const [email, setEmail] = useState(``);
  const [contactNumber, setContactNumber] = useState(``);
  const { trackClick, trackPage } = useAnalytics();

  useEffect(() => {
    const payload = profile;
    if (payload) {
      setName(payload?.name !== null ? payload?.name : ``);
      setEmail(payload?.email !== null ? payload?.email : ``);
      setContactNumber(
        payload?.contactNumber !== null ? payload?.contactNumber : ``,
      );
    }
    trackPage(EVENT_PAGE.EDIT_PROFILE);
  }, []);

  const onSaveClick = async () => {
    if (name) {
      try {
        setIsLoading(true);
        const response = await editProfile(name, email);
        if (response) {
          if (onSuccess) {
            onSuccess();
            await getUserProfile();
          }
          generateToast({
            content: `Profile Successfully Updated`,
            type: ToastType.SUCCESS,
          });
          setIsLoading(false);
        }
      } catch (error) {
        handleErrorMessage(error);
        setIsLoading(false);
      }
    } else {
      generateToast({
        content: translate(`EMPTY_NAME_ERROR`),
        type: ToastType.ERROR,
      });
    }
  };

  return (
    <div css={styles.editProfileContainer}>
      <div>
        <BottomFadeInAnimation addedStyle={styles.whiteCard} delay={0.2}>
          <div css={styles.avatarOuterContainer}>
            <div css={styles.avatarContainer}>
              <div css={styles.avatarInnerContainer}>
                <img
                  src={AssetImg.i_profile.src}
                  alt="profile avatar"
                  width="70.4"
                  height="70.4"
                />
              </div>
            </div>
          </div>
        </BottomFadeInAnimation>
        <BottomFadeInAnimation>
          <div css={styles.contactInfo}>
            {translate(`CONTACT_INFORMATION_TITLE`)}
          </div>
          <div css={styles.contactInfoDescription}>
            {translate(`CONTACT_INFORMATION_DESCRIPTION`)}
          </div>
        </BottomFadeInAnimation>
        <BottomFadeInAnimation delay={0.4}>
          <Input
            label={translate(`NAME`)}
            type={InputType.text}
            id="name"
            placeholder={translate(`NAME_PLACEHOLDER`)}
            isEnable={true}
            getInputText={(text: string) => setName(text)}
            value={name}
            maxLength={100}
          />
          {email?.length > 0 && (
            <Input
              label={translate(`EMAIL`)}
              type={InputType.email}
              id="email"
              placeholder={email as string}
              isEnable={false}
              getInputText={(text: string) => setEmail(text)}
              value={email}
              maxLength={62}
            />
          )}
          {contactNumber && (
            <Input
              label={translate(`CONTACT_NUMBER`)}
              type={InputType.number}
              id="contact"
              placeholder={contactNumber as string}
              isEnable={false}
              getInputText={(text: string) => setContactNumber(text)}
            />
          )}
        </BottomFadeInAnimation>
      </div>
      <div css={styles.ctaButtonContainer}>
        <PrimaryButton
          isLoading={isLoading}
          onClick={() => {
            trackClick(CLICK.SAVE_EDIT_PROFILE);
            onSaveClick();
          }}
        >
          SAVE
        </PrimaryButton>
      </div>
    </div>
  );
};

export default EditProfile;
