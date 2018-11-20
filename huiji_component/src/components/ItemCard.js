import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
	card: {
		maxWidth: 345,
	},
	media: {
		height: 64,
		width: 64,
		float: 'left'
	},
	name: {
		float: 'right',
		width: '70%'
	},
	Junk: {
		color: '#aaa'
	},

	Basic: {
		color: '#000'
	},

	Fine: {
		color: '#62a4da'
	},

	Masterwork: {
		color: '#1a9306'
	},

	Rare: {
		color: '#fcd00b'
	},

	Exotic: {
		color: '#ffa405'
	},

	Ascended: {
		color: '#fb3e8d'
	},

	Legendary: {
		color: '#4c139d'
	}
};

function MediaCard(props) {
	const {
		classes, data: {
			icon, name, name_en, description, rarity
		}
	} = props;
	return (

		<CardContent>
			<img
				className={classes.media}
				src={icon}
				title={name}
			/>
			<div className={classes.name}>
				<Typography gutterBottom variant="h6" component="h6" className={classes[rarity]}>
					{name}
				</Typography>
				<Typography gutterBottom variant="h6" component="h6" className={classes[rarity]}>
					{name_en}
				</Typography>
				<Typography component="p">
					{description}
				</Typography>
			</div>
		</CardContent>

	);
}

MediaCard.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MediaCard);