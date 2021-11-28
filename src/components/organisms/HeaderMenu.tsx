import React, {useState,useEffect} from 'react';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import Home from '@mui/icons-material/Home';

import {parseResponse} from '../../utils/utils';
import {apiDomain} from '../../utils/constants';


const logout = () => {
	localStorage.removeItem("token");
	document.location.href = "/";
}

const getProfile = () => {
	return fetch(`${apiDomain}/profile`, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${localStorage.token}`
	}})
	.then(parseResponse)
	.catch(console.error);
}


const HeaderMenu = () => {
 	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  	const open = Boolean(anchorEl);
  	const [userName, setUserName] = useState("");

	useEffect(() => {
		getProfile()
		.then(data => {
			if (data && data.userName) setUserName(data.userName);
		});
	}, [])


  	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    	setAnchorEl(event.currentTarget);
  	};

  	const handleClose = () => {
    	setAnchorEl(null);
  	};

  	return (
  		<>
  		<Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center'}}>
        <Tooltip title="Account settings">
        	<IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
            <Avatar sx={{ width: 36, height: 36 }}>{userName.charAt(0)}</Avatar>
          	</IconButton>
        </Tooltip>
      	</Box>
      	<Menu
        	anchorEl={anchorEl}
        	open={open}
        	onClose={handleClose}
        	onClick={handleClose}
        	PaperProps={{
          		elevation: 0,
          		sx: {
          			width: '200px',
            		overflow: 'visible',
            		filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          		  	mt: 1.5,
            		'& .MuiAvatar-root': {
             			width: 32,
             			height: 32,
              			ml: -0.5,
              			mr: 1
              		},
            		'&:before': {
              			content: '""',
              			display: 'block',
             			position: 'absolute',
              			top: 0,
              			right: 14,
              			width: 10,
              			height: 10,
              			bgcolor: 'background.paper',
              			transform: 'translateY(-50%) rotate(45deg)',
              			zIndex: 0,
            		},
          		},
        	}}
        	transformOrigin={{ horizontal: 'right', vertical: 'top' }}
       		anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      	>
      	<MenuItem>
        	<ListItemText>{userName}</ListItemText>
        	<Typography variant="body2" color="text.secondary">
        	</Typography>
        </MenuItem>
        <MenuItem onClick={() => document.location.href = "/changeprofile"}>
        	<Avatar /> Change Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => document.location.href = "/"}>
        	<ListItemIcon>
        	<Home fontSize="small" />
        	</ListItemIcon>
        	MyPage
        </MenuItem>
        <MenuItem>
        	<ListItemIcon>
        	<Settings fontSize="small" />
        	</ListItemIcon>
        	Settings
        </MenuItem>
        <MenuItem onClick={logout}>
        	<ListItemIcon>
        	<Logout fontSize="small" />
        	</ListItemIcon>
        	Logout
        </MenuItem>
      	</Menu>
      	</>
    	
  	);
}

export default HeaderMenu;