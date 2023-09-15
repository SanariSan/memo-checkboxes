export type TCheckboxMemoProps = {
  checked: boolean;
  value: string;
  onClick: (quotedAsset: string) => void;
};

export type TCardMemoProps = {
  baseAsset: string;
  quotedAssets: string[];
  ignoredAssets?: string[];
  updateIgnoredCb: (newObj: {
    baseAsset: string;
    ignoredAssets: string[];
  }) => void;
};
