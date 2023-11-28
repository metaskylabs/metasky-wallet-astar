import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as styles from './styles';
import { DividerLine } from '@components/Shared';
import { motion } from 'framer-motion';
import { useTranslate } from '@utils/useTranslate';

//Zoho Sales Iq Script:
const zohoScript = (url: string, widgetCode: string): null => {
  const script = document.createElement(`script`);
  script.setAttribute(`type`, `text/javascript`);

  const code = `var $zoho=$zoho || {};
    $zoho.salesiq = $zoho.salesiq || {widgetcode: "${widgetCode}", values:{},ready:function(){}};
    var d=document;
    s=d.createElement("script");
    s.type="text/javascript";
    s.id="zsiqscript";
    s.defer=true;
    s.src="${url}";
    t=d.getElementsByTagName("script")[0];
    t.parentNode.insertBefore(s,t);
    d.getElementById("zsiqwidget").innerHTML
    `;
  // d.innerHTML = "<div id='zsiqwidget'></div>";`;
  script.appendChild(document.createTextNode(code));
  document.body.appendChild(script);
  return null;
};

export default function ZohoSalesIQ() {
  const router = useRouter();
  const { translate } = useTranslate();
  useEffect(() => {
    if (router.isReady) {
      zohoScript(
        `https://salesiq.zoho.in/widget`,
        process.env.NEXT_PUBLIC_ZOHO_KEY as string,
      );
    }
  }, [router.isReady]);
  return (
    <motion.div
      key={1}
      initial={{ opacity: 0, y: 70 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0.6,
        default: { duration: 0.3 },
        ease: `easeIn`,
      }}
      id="zohoSupport"
    >
      <div id="zsiqwidget" css={styles.supportContainer}>
        {translate(`CONTACT_SUPPORT`)}
      </div>
      <DividerLine />
    </motion.div>
  );
}
