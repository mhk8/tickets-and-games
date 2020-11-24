import React, { useState, useEffect } from 'react';
import {
  Paper, Card, Typography, CardContent, CardActions, Button, CardMedia,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type Item = {
  id: number,
  limit: number,
  name: string,
  group: number,
  price: number,
};

type ItemList = {
  items: Array<Item>,
};

const useStyles = makeStyles((theme: Theme) => createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    backgroundColor: '#f7cea2',
    borderStyle: 'solid',
    borderWidth: '3px',
    width: '70%',
    textAlign: 'center',
    margin: 'auto',
  },
  card: {
    minWidth: 275,
    margin: theme.spacing(1),
  },
  media: {
    height: 140,
  },
}));

function Store() {
  const [itemList, setItemList] = useState<ItemList>({ items: [] });
  const classes = useStyles();

  useEffect(() => {
    fetch('/api/store/list').then((response) => {
      response.json().then((data: ItemList) => {
        setItemList(data);
      });
    });
  }, []);

  return (
    <div className="Coinflip">
      <Paper className={classes.root} style={{ position: 'relative', top: '7vh' }} elevation={3}>
        {itemList.items.map((item) => (
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image="https://placekitten.com/640/360" // TODO: Put an actual item image here
              title="Placeholder Item Image"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {item.name}
              </Typography>
              <Typography variant="body2" component="p">
                {`ID: ${item.id}`}
                <br />
                {`Price: ${item.price} tickets`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary">Buy</Button>
            </CardActions>
          </Card>
        ))}
      </Paper>
    </div>
  );
}

export default Store;