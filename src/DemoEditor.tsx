import React from 'react';
import { CustomCodeMirror } from './CustomCodeMirror';
import { json } from '@codemirror/lang-json';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { CodeMirrorOnChange } from '@ui-schema/kit-codemirror';

const dataValue = {
  name: 'Jane Doe',
  city: 'New York',
  lastContacts: ['2022-01-01', '2022-03-21', '2022-04-11', '2022-05-15'],
};

export const DemoEditor: React.FC<{}> = () => {
  const [value, setValue] = React.useState(
    JSON.stringify(dataValue, undefined, 4)
  );
  const extensions = React.useMemo(() => [json()], []);
  const onChange: CodeMirrorOnChange = React.useCallback(
    (_editor, nextValue, prevValue) => {
      if (nextValue !== prevValue) {
        setValue(nextValue);
      }
    },
    [setValue]
  );

  return (
    <Box mt={1} mb={2} mx={2}>
      <Typography
        variant={'caption'}
        component={'p'}
        color={'secondary'}
        gutterBottom
      >
        Demo Editor
      </Typography>
      <CustomCodeMirror
        value={value}
        extensions={extensions}
        onChange={onChange}
      />
    </Box>
  );
};
