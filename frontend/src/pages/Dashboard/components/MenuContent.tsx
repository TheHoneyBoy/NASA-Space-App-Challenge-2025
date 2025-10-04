import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Collapse from '@mui/material/Collapse';

import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AnalyticsRoundedIcon from '@mui/icons-material/AnalyticsRounded';
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded';
import AssignmentRoundedIcon from '@mui/icons-material/AssignmentRounded';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import BarChartRoundedIcon from '@mui/icons-material/BarChartRounded';
import Filter1RoundedIcon from '@mui/icons-material/Filter1Rounded';

export default function MenuContent({ currentView, setCurrentView }: { currentView: string; setCurrentView: (view: string) => void }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => setOpen(!open);

  return (
    <Stack sx={{ flexGrow: 1, p: 1, justifyContent: 'space-between' }}>
      <List dense>
        {/* Home */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            selected={currentView === 'Home'}
            onClick={() => setCurrentView('Home')}
          >
            <ListItemIcon><HomeRoundedIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        {/* Exoplanet Prediction */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={handleClick}>
            <ListItemIcon><AnalyticsRoundedIcon /></ListItemIcon>
            <ListItemText primary="Exoplanet Prediction" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 4 }}>
              <ListItem disablePadding>
                <ListItemButton
                  selected={currentView === 'Batch Prediction'}
                  onClick={() => setCurrentView('Batch Prediction')}
                >
                  <ListItemIcon><BarChartRoundedIcon /></ListItemIcon>
                  <ListItemText primary="Batch Prediction" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton
                  selected={currentView === 'Single Prediction'}
                  onClick={() => setCurrentView('Single Prediction')}
                >
                  <ListItemIcon><Filter1RoundedIcon /></ListItemIcon>
                  <ListItemText primary="Single Prediction" />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>

        {/* Model Training */}
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton
            selected={currentView === 'Model Training'}
            onClick={() => setCurrentView('Model Training')}
          >
            <ListItemIcon><PeopleRoundedIcon /></ListItemIcon>
            <ListItemText primary="Model Training" />
          </ListItemButton>
        </ListItem>
      </List>
    </Stack>
  );
}