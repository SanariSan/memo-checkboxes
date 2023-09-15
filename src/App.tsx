import { Box, Checkbox } from "@mui/material";
import { IGNORED_TEMPLATE, TEMPLATE } from "App.const";
import { memo, useCallback, useState } from "react";
import s from "./app.module.scss";
import { TCardMemoProps, TCheckboxMemoProps } from "App.type";

const CheckboxMemo = memo(({ checked, value, onClick }: TCheckboxMemoProps) => {
  return (
    <Checkbox checked={checked} value={value} onClick={() => onClick(value)} />
  );
});

const CardMemo = memo(
  ({
    baseAsset,
    quotedAssets,
    ignoredAssets = [],
    updateIgnoredCb,
  }: TCardMemoProps) => {
    const onClick = useCallback(
      (quotedAsset: string) => {
        const modifiedIgnoredAssets = ignoredAssets.includes(quotedAsset)
          ? ignoredAssets.filter((_) => _ !== quotedAsset)
          : ignoredAssets.concat(quotedAsset);

        updateIgnoredCb({ baseAsset, ignoredAssets: modifiedIgnoredAssets });
      },
      [baseAsset, ignoredAssets, updateIgnoredCb]
    );

    return (
      <Box className={s.card}>
        <Box className={s.base}>{baseAsset}</Box>
        <Box className={s.checkboxesContainer}>
          {quotedAssets.map((quotedAsset) => (
            <Box>
              {quotedAsset}
              <CheckboxMemo
                checked={ignoredAssets.includes(quotedAsset)}
                value={quotedAsset}
                onClick={onClick}
                // works even with no key
                key={`${baseAsset}-${quotedAsset}`}
              />
            </Box>
          ))}
        </Box>
      </Box>
    );
  }
);

const App = () => {
  const [baseArr] = useState(TEMPLATE);
  const [ignoredArr, setIgnoredArr] = useState(IGNORED_TEMPLATE);

  const updateIgnoredCb = useCallback(
    (newObj: { baseAsset: string; ignoredAssets: string[] }) => {
      setIgnoredArr((prev) =>
        prev.filter((_) => _.baseAsset !== newObj.baseAsset).concat(newObj)
      );
    },
    []
  );

  return (
    <Box className={s.app}>
      {baseArr.map(({ baseAsset, quotedAssets }) => (
        <CardMemo
          baseAsset={baseAsset}
          quotedAssets={quotedAssets}
          ignoredAssets={
            ignoredArr.find((_) => _.baseAsset === baseAsset)?.ignoredAssets
          }
          updateIgnoredCb={updateIgnoredCb}
          // works even with no key
          key={baseAsset}
        />
      ))}
    </Box>
  );
};

export { App };
