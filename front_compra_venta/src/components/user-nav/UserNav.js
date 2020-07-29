import React, { useState } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Home, StoreMallDirectory, Payment, ShoppingCart, Group, ShowChart, ExitToApp } from '@material-ui/icons';
import AuthService from '../../services/AuthService';
import { useStyles } from './UserNavStyles';
import { Link, Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';
import HomeComponent from '../Home';
import Styles from './UserNav.module.css';

const UserNav = (props) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const theme = useTheme();
  const authService = new AuthService();
  const userType = authService.getUserRol();

  const sections = (userType === 'administrador') ? ['Inicio', 'Almacen', 'Compras', 'Ventas', 'Accesos', 'Consultas'] :
    (userType === 'vendedor') ? ['Inicio', 'Ventas'] : ['Inicio', 'Almacen', 'Compras'];

  const menuItems = [
    { icon: <Home />, link: '/' },
    { icon: <StoreMallDirectory />, link: '/stock' },
    { icon: <Payment />, link: '/sales' },
    { icon: <ShoppingCart />, link: '/purchases' },
    { icon: <Group />, link: '/users' },
    { icon: <ShowChart />, link: '/reports' }
  ];

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    authService.logOut();
    props.onAuthChange()
  };

  return (
    <Router>
      <div className={classes.root}>

        <CssBaseline />

        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className={Styles.header}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>

            <div style={{ flexGrow: 1 }}>
              <Typography variant="h6" noWrap>
                Sistema de compras y ventas
              </Typography>
            </div>

            <IconButton onClick={logOut} style={{ color: 'white' }}>
              <ExitToApp />
              <Typography variant="h6" noWrap>
                Salir
              </Typography>
            </IconButton>

          </Toolbar>
        </AppBar>

        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>

          <Divider />

          <List>

            {sections.map((text, i) =>
              (
                <Link to={menuItems[i].link} style={{ textDecoration: 'none' }} key={i} >
                  <ListItem button key={i}>
                    <ListItemIcon>{menuItems[i].icon}</ListItemIcon>
                    <ListItemText primary={text} style={{ color: '#000046' }} />
                  </ListItem>
                </Link>
              )
            )}

          </List>

        </Drawer>

        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          <Switch>
            <Route path='/' exact render={routerProps => <HomeComponent {...routerProps} ejemploProp='prueba' />} />
            <Redirect from='*' to='/' />
          </Switch>
        </main>

      </div>
    </Router>
  );
}

export default UserNav;
