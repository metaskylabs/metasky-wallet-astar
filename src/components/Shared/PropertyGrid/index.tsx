import { FC, ReactNode } from 'react';
import * as styles from './styles';
import { CardProperties } from '@components/Shared';

interface PropertyGridProps {
  properties: Property;
  rarityPercentage?: RarityPercentage;
}
interface Property {
  [key: string]: string;
}
interface RarityPercentage {
  [key: string]: number;
}
const PropertyGrid: FC<PropertyGridProps> = ({
  properties,
  rarityPercentage,
}) => {
  const renderProperties = (properties: any) => {
    const options: ReactNode[] = [];

    Object.keys(properties).map((key, index) => {
      options.push(
        <CardProperties
          title={key.toUpperCase()}
          subtitle={properties[key]}
          key={index}
          propertyId={index}
          rarityPercentage={rarityPercentage && rarityPercentage[key]}
        />,
      );
    });
    return options;
  };
  return <div css={styles.propertiesBody}>{renderProperties(properties)}</div>;
};

export default PropertyGrid;
