import { FC, useState } from 'react';
import * as styles from './styles';
import AssetsImg from '@public/images';
import { DiscordBenefitType } from '@typings/api/wallet';

const DiscordAsset: FC<{ data: DiscordBenefitType }> = ({ data }) => {
  const [showHelperText, setShowHelperText] = useState(false);

  return (
    <div css={styles.wrapper}>
      <div css={styles.iconContainer}>
        <span css={styles.iconBg}>
          <img
            css={styles.iconSuccess}
            alt="success"
            src={AssetsImg.ic_discord.src}
          />
        </span>
      </div>
      <div css={styles.titleContainer}>{data.text}</div>
      <div css={styles.descContainer}>
        {data.discordRoleName ? (
          <div
            style={{
              display: `flex`,
              alignItems: `center`,
              flexDirection: `column`,
            }}
          >
            <p className="mainText">
              You have successfully claimed the <u>{data.discordRoleName}</u>
              {` `}
              role, visit the server now to access exclusive content.
            </p>
            {data.linkToDiscordServer !== null && (
              <a className="helperLink" href={data.linkToDiscordServer}>
                Link to discord server
              </a>
            )}
          </div>
        ) : !showHelperText ? (
          <p onClick={() => setShowHelperText(true)} className="helperLink">
            How to connect discord with Skyclub?
          </p>
        ) : (
          <div>
            <p className="secondaryTextHeader">Steps to connect discord:</p>
            <ol className="secondaryTextList">
              <li>
                Open your&nbsp;
                <a href={data.skyclubLink} target="_blank" rel="noreferrer">
                  Skyclub account.
                </a>
              </li>
              <li>
                Connect discord by selecting the discord option in the
                connections tab in SkyClub.
              </li>
              <li>
                Once discord is connected to your SkyClub account, you&apos;ll
                be granted the role in some time.
              </li>
            </ol>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscordAsset;
