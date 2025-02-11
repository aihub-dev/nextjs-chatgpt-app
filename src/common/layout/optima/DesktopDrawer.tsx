import * as React from 'react';

import { Sheet, styled } from '@mui/joy';

import type { NavItemApp } from '~/common/app.nav';

import { useOptimaDrawers } from './useOptimaDrawers';
import { useOptimaLayout } from '~/common/layout/optima/useOptimaLayout';
import { PageDrawer } from '~/common/layout/optima/PageDrawer';


// Desktop Drawer

const Drawer = styled(Sheet)(({ theme }) => ({
  // layouting
  minWidth: 'var(--Agi-drawer-width)',
  maxWidth: 'max(var(--Agi-drawer-width), 30%)',

  // flex column
  display: 'flex',
  flexDirection: 'column',

  // style
  // backgroundColor: theme.palette.background.level2,
  // borderRight: '0.125rem solid',
  // borderRightColor: theme.palette.background.level1,
  // boxShadow: theme.shadow.sm,
}));


export function DesktopDrawer(props: { currentApp?: NavItemApp }) {

  // external state
  const {
    isDrawerOpen, closeDrawer, toggleDrawer,
  } = useOptimaDrawers();
  const {
    appPaneContent,
  } = useOptimaLayout();


  // [effect] Desktop-only?: close the drawer if the current app doesn't use it
  const currentAppUsesDrawer = !!props.currentApp?.drawer;
  React.useEffect(() => {
    if (!currentAppUsesDrawer)
      closeDrawer();
  }, [closeDrawer, currentAppUsesDrawer]);


  // TODO: do not unmount like this, or we cannot animate-out
  if (!isDrawerOpen)
    return null;

  return (
    <Drawer
      sx={{
        display: 'flex', flexDirection: 'column',
        height: '100dvh',
      }}
    >

      <PageDrawer currentApp={props.currentApp} onClick={closeDrawer}>
        {appPaneContent}
      </PageDrawer>

    </Drawer>
  );
}