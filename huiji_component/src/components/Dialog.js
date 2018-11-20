import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import ItemCard from './ItemCard';

class AlertDialog extends React.Component {
	render() {
		return (
			<div>
				<Dialog
					open={this.props.open}
					onClose={this.props.handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
				>
					<DialogContent>
						<ItemCard data={this.props.data}/>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default AlertDialog;