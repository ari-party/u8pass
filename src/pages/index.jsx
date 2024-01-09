import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Input from '@mui/joy/Input';
import Slider from '@mui/joy/Slider';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';
import Refresh from '@mui/icons-material/Refresh';
import Head from 'next/head';
import React, { useMemo, useState } from 'react';
import { rgbToHex } from '@mui/material';
import BigNumber from 'bignumber.js';

import Page from '@/components/layout/page';
import Copy from '@/components/buttons/copy';
import { ofLength } from '@/utils/string';
import { codePoints, randomBMP } from '@/utils/utf-8';
import { toWords } from '@/utils/time';
import { theme } from '@/components/theme';
import { numberToText } from '@/utils/number';

function Label({ children, title, ...props }) {
  return (
    <FormLabel {...props}>
      {title ? <abbr title={title}>{children}</abbr> : children}
    </FormLabel>
  );
}

function SettingsLabel({ children, ...props }) {
  return (
    <Label sx={{ mb: -1 }} {...props}>
      {children}
    </Label>
  );
}

export default function Index() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(18);
  const [ttc, setTtc] = useState('');
  const [possibleCombinations, setPossibleCombinations] = useState('');

  async function generatePassword() {
    const newPassword = await ofLength(length, randomBMP);
    setPassword(newPassword);

    const possibleCombinationsCalculation = new BigNumber(codePoints).pow(
      length,
    );

    setPossibleCombinations(possibleCombinationsCalculation.toNumber());
    setTtc(possibleCombinationsCalculation.div(1e10));
  }

  useMemo(generatePassword, [length]);

  return (
    <>
      <Head>
        <title>u8pass</title>
        <meta
          property="description"
          content="Generate random UTF-8 passwords"
        />
        <meta property="og:type" content="website" />
        <meta
          name="theme-color"
          content={rgbToHex(
            `rgb(${theme.colorSchemes.dark.palette.danger.mainChannel.replace(
              / /g,
              ',',
            )})`,
          )}
        />
      </Head>
      <Page>
        <Stack gap={4}>
          <Box>
            <Typography level="title-lg">u8pass</Typography>
            <Typography level="body-sm">
              Generate random UTF-8 passwords
            </Typography>
          </Box>

          <Input
            variant="plain"
            color="danger"
            sx={{
              color: theme.colorSchemes.dark.palette.neutral.plainColor,
            }}
            onKeyDown={(event) => event.preventDefault()}
            endDecorator={
              <Stack direction="row" gap={1}>
                <Copy value={password} />
                <IconButton onClick={() => generatePassword()}>
                  <Refresh />
                </IconButton>
              </Stack>
            }
            value={password}
          />

          <Box
            sx={{
              display: 'flex',
              gap: 1.25,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              '& > div': {
                flex: `1 0 calc(50% - ${theme.spacing(1.25 / 2)})`,
              },
            }}
          >
            <Stack>
              <Label title="Time to crack if offline and fast">
                Time to crack
              </Label>
              <Typography>{toWords(ttc)}</Typography>
            </Stack>
            <Stack>
              <Label>Possible combinations</Label>
              <Typography
                component="abbr"
                title={possibleCombinations.toLocaleString()}
              >
                {numberToText(possibleCombinations)}
              </Typography>
            </Stack>
          </Box>

          <Stack>
            <Divider>Settings</Divider>
            <Stack gap={2}>
              <Stack>
                <SettingsLabel>Length</SettingsLabel>
                <Slider
                  color="danger"
                  marks={false}
                  orientation="horizontal"
                  size="sm"
                  valueLabelDisplay="auto"
                  variant="solid"
                  min={12}
                  max={40}
                  value={length}
                  onChange={(event) => setLength(event.target.value)}
                />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Page>
    </>
  );
}
