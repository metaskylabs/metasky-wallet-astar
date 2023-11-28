import { Dropdown, Form } from 'react-bootstrap';
import {
  sortAndFilterContainer,
  styledFilterButton,
  styledFocusedFilterButton,
  styledMenuItem,
} from '@styles/Modules/nftsList';
import { useState } from 'react';
import { cloneDeep } from 'lodash';

interface INFTFilter {
  fetchNfts: (
    sort_by?: string,
    collection_names?: string[],
    on_sale?: boolean,
  ) => Promise<void>;
  uniqueCollections: {
    id: string;
    name: string;
  }[];
}

type SortType =
  | 'rarity.asc'
  | 'rarity.desc'
  | 'transaction.asc'
  | 'transaction.desc';

const SortConfig: { key: SortType; name: string }[] = [
  {
    key: `transaction.desc`,
    name: `Most Recently Purchased`,
  },
  {
    key: `transaction.asc`,
    name: `Least Recently Purchased`,
  },
  {
    key: `rarity.desc`,
    name: `Most Rare First`,
  },
  {
    key: `rarity.asc`,
    name: `Least Rare First`,
  },
];

export const NFTFilter = (props: INFTFilter) => {
  const [filterByOnSale, setFilterByOnSale] = useState(false);
  const [filterByCollection, setFilterByCollection] = useState<Set<string>>(
    new Set(),
  );
  const [selectedSort, setSelectedSort] =
    useState<SortType>(`transaction.desc`);
  const { fetchNfts, uniqueCollections } = props;

  const handleOnSaleButtonClick = () => {
    const onSale = !filterByOnSale;
    setFilterByOnSale(onSale);
    fetchNfts(selectedSort, Array.from(filterByCollection), onSale);
  };
  const handleSortChanged = (sort_key: SortType) => {
    setSelectedSort(sort_key);
    fetchNfts(sort_key, Array.from(filterByCollection), filterByOnSale);
  };
  const handleCollectionUpdated = (collection_name: string) => {
    const newSet = cloneDeep(filterByCollection);
    if (newSet.has(collection_name)) {
      newSet.delete(collection_name);
    } else {
      newSet.add(collection_name);
    }
    setFilterByCollection(newSet);
    fetchNfts(selectedSort, Array.from(newSet), filterByOnSale);
  };

  return (
    <div css={sortAndFilterContainer}>
      {/* Sort options */}
      <Dropdown>
        <Dropdown.Toggle css={styledFocusedFilterButton} variant="outlined">
          Sort
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {SortConfig.map((config) => (
            <Dropdown.Item
              key={config.key}
              onClick={() => handleSortChanged(config.key)}
            >
              <Form.Check
                type={`radio`}
                checked={selectedSort === config.key}
                readOnly
                id={`collection-${config.key}`}
                label={config.name}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* Collection filter */}
      <Dropdown>
        <Dropdown.Toggle
          css={
            filterByCollection.size > 0
              ? styledFocusedFilterButton
              : styledFilterButton
          }
          variant="outlined"
        >
          Collection
        </Dropdown.Toggle>
        <Dropdown.Menu css={styledMenuItem}>
          {uniqueCollections.map((NFT) => (
            <Dropdown.Item
              key={NFT.id}
              onClick={() => handleCollectionUpdated(NFT.id)}
            >
              <Form.Check
                type={`checkbox`}
                checked={filterByCollection.has(NFT.id)}
                readOnly
                id={NFT.id}
                label={NFT.name}
              />
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
      {/* on sale button */}
      <button
        onClick={handleOnSaleButtonClick}
        css={filterByOnSale ? styledFocusedFilterButton : styledFilterButton}
      >
        On Sale
      </button>
    </div>
  );
};
