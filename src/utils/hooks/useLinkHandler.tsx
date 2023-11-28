import { downloadBenefit } from '@actions/wallet';
import generateToast from '@components/Shared/GenerateToast';
import { ToastType } from '@components/Shared/Toast';
import { colors, utils } from '@styles/shared';
import { useRouter } from 'next/router';
import { openInNewWindow } from '../helper';

const openWindow = (link: string, target?: string) => {
  if (!window.open(link, target)) {
    window.alert(`Please allow pop-ups from your browser settings.`);
  }
};

const useLinkHandler = () => {
  const router = useRouter();
  const linkHandler = async (
    type: string,
    ctaLink: string,
    ctaTarget?: string,
    ctaLinkAs?: string,
  ) => {
    if (type === `BENEFIT_STREAM`) {
      if (ctaLink) {
        if (!openInNewWindow(ctaLink, 400, 600)) {
          generateToast({
            type: ToastType.INFO,
            content: (
              <>
                Pop up was blocked by your browser.
                <a
                  href={ctaLink}
                  target="_blank"
                  rel="noreferrer"
                  css={{
                    border: 0,
                    background: `none`,
                    color: colors.Secondary_White,
                    textDecoration: `underline`,
                    padding: `0 ${utils.remConverter(5)}`,
                  }}
                >
                  Click this link to continue
                </a>
              </>
            ),
            customDuration: 45000,
          });
        }
      } else {
        generateToast({
          content: `Sorry! Not able to genrate the link`,
          type: ToastType.ERROR,
        });
      }
    } else if (type === `SECURED_DOWNLOAD`) {
      try {
        const payload = {
          assetLink: ctaLink,
          assetName: `benefit`,
        };
        await downloadBenefit(payload);
        generateToast({
          type: ToastType.SUCCESS,
          content: `${`benefit`} is being downloaded to your device`,
        });
      } catch (e) {}
    } else if (type === `INTERNAL_REDIRECT`) {
      if (!ctaTarget || ctaTarget === `_self`)
        router.push(
          ctaLink,
          ctaLinkAs || ctaLink.startsWith(`/animation`)
            ? `${window.location.pathname || ``}#${
                window.location.search || ``
              }`
            : ctaLink,
        );
      else openWindow(ctaLink, ctaTarget || `_blank`);
    } else if (type === `UNSECURED_REDIRECT`) {
      openWindow(ctaLink, ctaTarget || `_blank`);
    } else {
      openWindow(ctaLink, `_blank`);
    }
  };
  return { linkHandler };
};

export default useLinkHandler;
