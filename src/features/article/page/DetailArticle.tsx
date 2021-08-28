import { Avatar, Box, Grid, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import SidebarDetail from '../components/SidebarDetail';

const useStyle = makeStyles(() => ({
  title: {
    fontWeight: 'bold',
    fontSize: '40px',
    marginBottom: '30px',
  },
  description: {
    fontSize: '25px',
    marginBottom: '20px',
    color: 'rgba(117, 117, 117, 1);',
  },
  avatar: {
    lineHeight: '40px',
    marginLeft: '10px',
    color: 'green',
  },
  avatarDate: {
    lineHeight: '40px',
    marginLeft: '10px',
  },
}));

function DetailArticle() {
  const classes = useStyle();
  return (
    <div style={{ marginTop: '50px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <SidebarDetail />
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" className={classes.title}>
            Highway to Inferno: On the Road with the Oregon Proud Boys
          </Typography>
          <Typography variant="h5" className={classes.description}>
            Law-and-order rebels. Freedom-loving fascists. What makes the far right tick?
          </Typography>
          <Typography style={{ display: 'flex', marginBottom: '30px' }}>
            <Avatar alt="Dat" src="/static/images/avatar/1.jpg" />
            <span className={classes.avatar}>Lê Thành Đạt</span>
            <span className={classes.avatarDate}>May 8, 2021</span>
          </Typography>
          <Typography variant="body1">
            Toby Keith’s daddy isn’t the only one. I’m idling on a sun-baked Oregon interstate just
            south of Portland, surrounded by lifted trucks carrying on the Keith tradition. The
            light summer breeze makes the countless flags dance in the shimmering heat. Trump 2020.
            Blue Lives Matter. American. Punisher. Gadsden. Confederate.
          </Typography>
          <br />
          <Typography variant="body1">
            Toby Keith’s daddy isn’t the only one. I’m idling on a sun-baked Oregon interstate just
            south of Portland, surrounded by lifted trucks carrying on the Keith tradition. The
            light summer breeze makes the countless flags dance in the shimmering heat. Trump 2020.
            Blue Lives Matter. American. Punisher. Gadsden. Confederate.
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}

export default DetailArticle;
