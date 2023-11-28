import * as styles from '@styles/Modules/faqs';
import { Header } from '@components/Shared';
import Option from '@components/Profile/Option';
import NumberedList from '@components/Profile/NumberedList';
import { Fragment, useState } from 'react';
import { FAQS } from '@constants/profile';
import { useTranslate } from '@utils/useTranslate';

const Faqs = () => {
  const [selectedFaq, setSelectedFaq] = useState(FAQS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { translate } = useTranslate();
  const handleLinkClick = (option: number) => {
    setSelectedFaq(FAQS[option]);
    setIsModalOpen(true);
  };
  const handleBackClick = () => setIsModalOpen(false);
  return (
    <Fragment>
      <Header
        isBackEnabled={true}
        title="FAQs"
        rightActionTitle=" "
        actionClickHandler={() => ``}
        customBack={isModalOpen ? handleBackClick : undefined}
      />
      <div css={isModalOpen ? { display: `none` } : styles.optionContainer}>
        {FAQS.map((option, index) => (
          <Option
            key={index}
            index={index}
            text={option.title}
            font="light"
            onClick={() => handleLinkClick(FAQS.indexOf(option))}
          />
        ))}
      </div>
      <div css={isModalOpen ? styles.container : { display: `none` }}>
        <h1 css={styles.title}>{selectedFaq.id + `. ` + selectedFaq.title}</h1>
        <div css={styles.infoContainer}>
          {selectedFaq.details.description.map((description, index) =>
            description[0] === `1` ? (
              <a key={index} css={styles.blueText} href="www.metasky.com">
                <p>{description.slice(1, description.length)}</p>
              </a>
            ) : (
              <p key={index} css={styles.greyText}>
                {description}
              </p>
            ),
          )}
        </div>
        {selectedFaq.details.steps.map((instruction) => (
          <NumberedList
            key={selectedFaq.details.steps.indexOf(instruction)}
            id={selectedFaq.details.steps.indexOf(instruction) + 1}
            instruction={instruction}
          />
        ))}
      </div>
      <div css={isModalOpen ? { display: `none` } : styles.helperContainer}>
        <p css={styles.footerGreyText}>
          {translate(`DIDNT_FIND_WHAT_YOU_WERE_LOOKING_FOR`)}
        </p>
        <p css={styles.contactText}>{translate(`CONTACT_SUPPORT`)}</p>
      </div>
    </Fragment>
  );
};

export default Faqs;
