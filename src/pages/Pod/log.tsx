import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useSettingsContext } from 'src/components/settings';
import { useGetPodContainers, useGetPodLogs } from 'src/api/deployment';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import Select from '@mui/material/Select';
import { Checkbox, FormControl, InputLabel, MenuItem, OutlinedInput } from '@mui/material';
import { useGetStreamPodLogs } from 'src/api/streamPodLogs';

// ----------------------------------------------------------------------

export default function PodLog() {
  const settings = useSettingsContext();
  const { namespace, pname } = useParams();
  const [container, setContainer] = useState<string>('');

  const { trigger: getStreamPodLogs, logs: streamLogs } = useGetStreamPodLogs();

  const { containers, containersLoading } = useGetPodContainers({
    ns: namespace || '',
    pname: pname || '',
  });

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      {/* <Typography variant="h4"> Page One </Typography> */}

      <Box
        sx={{
          mt: 5,
          width: 1,
          height: 'calc(100vh - 146px)',
          overflow: 'auto',
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      >
        {/* <Typography variant="h4">Logs</Typography> */}

        <FormControl
          variant="outlined"
          sx={{
            margin: 2,
          }}
        >
          <InputLabel id="container-label">Container</InputLabel>
          <Select
            labelId="container-label"
            id="container-select"
            value={container}
            onChange={(event) => {
              const val = event.target.value;
              if (val) {
                setContainer(event.target.value as string);
                getStreamPodLogs({
                  ns: namespace || '',
                  pname: pname || '',
                  cname: val as string,
                });
              }
            }}
            input={<OutlinedInput label="Container" />}
            onClose={(f) => f}
            sx={{
              flexShrink: 0,
              width: { xs: '100%', md: 200 },
            }}
          >
            {Array.isArray(containers)
              ? containers.map((option) => (
                  <MenuItem key={option.name} value={option.name}>
                    {option.name}
                  </MenuItem>
                ))
              : null}
          </Select>
        </FormControl>

        <Box sx={{ mt: 2 }}>
          <Typography
            variant="body2"
            sx={{
              margin: 2,
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              color: (theme) => (theme.palette.mode === 'light' ? 'grey.800' : 'grey.400'),
            }}
          >
            {streamLogs}
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
