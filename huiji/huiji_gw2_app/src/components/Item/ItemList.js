import React from 'react'
import axios from 'axios'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import ItemCard from './ItemCard'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui-icons/Search'
import { withRouter } from 'react-router-dom'

class ItemList extends React.Component {

	getItems = (ids) => {
		const qids = ids.join()
		axios.get(`https://api.guildwars2.com/v2/items?ids=${qids}&lang=zh`).then(res => {
			const {items, page} = this.state
			this.setState({
				items: items.concat(res.data),
				cacheItems: items.concat(res.data),
				loading: false,
				page: page + 1
			})
		})
	}
	getMore = () => {
		const {page, ids, pageSize} = this.state
		const nextPage = page + 1
		const nextIds = ids.slice(page * pageSize, nextPage * pageSize)
		this.getItems(nextIds)
	}

	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false, qword: ''})
	}
	handleSearch = () => {
		const {qword} = this.state
		if (qword.length > 0) {
			this.setState({
				loading: true
			})
			axios.get(`https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter={"name":"${qword}"}`).then(res => {
				const {_returned, _embedded} = res.data
				if (_returned) {
					const search_item_ids = _embedded.map(item => {
						return item.id
					})
					if (search_item_ids.length === 1) {
						const id = search_item_ids[0]
						this.props.history.push(`/item/${id}`)
					} else if (search_item_ids.length > 1) {
						axios.get(`https://api.guildwars2.com/v2/items?ids=${search_item_ids.join()}&lang=zh`).then(res => {
							this.setState({
								items: res.data,
								loading: false,
								page: 1
							})
						})
					}
				}
				this.setState({type: 'search', loading: false})
			})
		}

	}
	handleQwordChange = (e) => {
		console.log(e.target.value)
		if (e.target.value.length == 0) {
			const {cacheItems} = this.state
			this.setState({
				type: 'list',
				items: cacheItems
			})
		}
		this.setState({
			qword: e.target.value
		})
	}

	constructor (props) {
		super(props)
		this.state = {
			items: [],
			cacheItems: [],
			ids: [],
			loading: true,
			page: 1,
			pageSize: 10,
			open: false,
			qword: '',
			type: 'list'
		}
	}

	componentDidMount () {
		const {page, pageSize, items} = this.state
		axios.get(`https://api.guildwars2.com/v2/items`).then(res => {
			this.setState({
				ids: res.data.reverse(),
			})
			const new_item_ids = res.data.slice(0, 10)
			return new_item_ids
		}).then(new_item_ids => {
			this.getItems(new_item_ids)
		})
	}

	render () {
		const {items, loading, qword, type} = this.state
		return (
			loading ? <CircularProgress/> : <div>
				<TextField
					id="search"
					label="搜索"
					type="search"
					margin="normal"
					value={qword}
					onChange={this.handleQwordChange}
				/>
				<Button onClick={this.handleSearch} color="primary"> <SearchIcon/> </Button>
				{
					items.map(item => {
						return <div key={item.id}>
							<ItemCard data={item}/>

						</div>
					})

				}
				<div style={{textAlign: 'center'}}>
					{
						type === 'list' ? <Button onClick={this.getMore} color="primary">更多</Button> : ''
					}
				</div>

				{/*<div>*/}
				{/*<Dialog*/}
				{/*open={this.state.open}*/}
				{/*onClose={this.handleClose}*/}
				{/*aria-labelledby="form-dialog-title"*/}
				{/*>*/}
				{/*<DialogTitle id="form-dialog-title">搜索</DialogTitle>*/}
				{/*<DialogContent>*/}
				{/*<TextField*/}
				{/*autoFocus*/}
				{/*margin="dense"*/}
				{/*id="qword"*/}
				{/*// label="搜索"*/}
				{/*type="text"*/}
				{/*fullWidth*/}
				{/*value={qword}*/}
				{/*onChange={this.handleQwordChange}*/}
				{/*/>*/}
				{/*</DialogContent>*/}
				{/*<DialogActions>*/}
				{/*<Button onClick={this.handleClose} color="primary">*/}
				{/*取消*/}
				{/*</Button>*/}
				{/*<Button onClick={this.handleSearch} color="primary">*/}
				{/*确认*/}
				{/*</Button>*/}
				{/*</DialogActions>*/}
				{/*</Dialog>*/}
				{/*</div>*/}

			</div>
		)
	}
}

export default withRouter(ItemList)