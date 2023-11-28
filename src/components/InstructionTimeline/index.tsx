import { colors, utils } from '@styles/shared';
import * as styles from './styles';

function InstructionTimeline(props: {
  title: string;
  items: { name: string; description: string | React.ReactNode }[];
}) {
  return (
    <div css={styles.instructionContainer}>
      <div css={styles.instructionSectionTitle}>{props.title}</div>
      {props.items.map((item, index, items) => {
        return (
          <div css={styles.instructionStepContainer} key={index}>
            <div
              css={[
                styles.instructionStep,
                index < items.length - 1 ? `` : styles.hideStepLine,
              ]}
            >
              <div css={{ backgroundColor: colors.Secondary_White }}>
                <div css={styles.instructionNumber}>{index + 1}</div>
              </div>
            </div>
            <div
              css={{
                marginLeft: utils.remConverter(36),
                paddingBottom:
                  index < items.length - 1 ? utils.remConverter(40) : ``,
              }}
            >
              <div css={styles.instructionName}>{item.name}</div>
              <div css={styles.instructionDescription}>{item.description}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default InstructionTimeline;
