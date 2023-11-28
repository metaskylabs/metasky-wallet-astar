import * as styles from '@styles/Modules/faqs';
import { Header } from '@components/Shared';
import Option from '@components/Profile/Option';
import { Fragment, useState } from 'react';
import { TERMS_AND_CONDITIONS } from '@constants/profile';

const TermsAndCondition = () => {
  const [selectedFaq, setSelectedFaq] = useState(TERMS_AND_CONDITIONS[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleLinkClick = (option: number) => {
    setSelectedFaq(TERMS_AND_CONDITIONS[option]);
    setIsModalOpen(true);
  };
  return (
    <Fragment>
      <Header
        isBackEnabled={true}
        title="Terms & Conditions"
        rightActionTitle=" "
        actionClickHandler={() => ``}
        // setIsModalOpen={isModalOpen ? setIsModalOpen : undefined}
      />
      <div css={isModalOpen ? { display: `none` } : styles.optionContainer}>
        {TERMS_AND_CONDITIONS.map((option, index) => (
          <Option
            key={index}
            index={index}
            text={option.title}
            font="light"
            onClick={() =>
              handleLinkClick(TERMS_AND_CONDITIONS.indexOf(option))
            }
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
      </div>
      <div css={isModalOpen ? { display: `none` } : styles.helperContainer}>
        <p css={styles.footerGreyText}>
          Didn&apos;t find what you were looking for?
        </p>
        <p css={styles.contactText}>Contact Support</p>
      </div>
    </Fragment>
  );
};

export default TermsAndCondition;
