import React from 'react'
import { withStyles } from 'material-ui/styles'
import Card, { CardHeader } from 'material-ui/Card'
import {withRouter} from "react-router-dom";


class ItemCard extends React.Component {
	handleClick = (id)=>{
		this.props.history.push(`/item/${id}`);
	}
	render () {
		const {
			classes, data: {
				name, icon, chat_link, description, rarity,id,name_en
			}
		} = this.props
		return (
			<div>
				<Card style={ {
					maxWidth: '100%',
				}}>
					<CardHeader
						avatar={
							<img src={icon} alt="" width={64} height={64}/>
						}
						title={<span className={`${rarity} itemCard`} onClick={()=>this.handleClick(id)} >{`${name}(${name_en})`}</span>}
						subheader={description}
					/>
				</Card>

			</div>
		)
	}
}

export default withRouter(ItemCard)
