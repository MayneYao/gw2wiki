import React from 'react'
import axios from 'axios'
import { CircularProgress } from 'material-ui/Progress'
import Button from 'material-ui/Button'
import ItemCard from './ItemCard'
import TextField from 'material-ui/TextField'
import SearchIcon from 'material-ui-icons/Search'
import { withRouter } from 'react-router-dom'
import Loading from '../Loading'
import Input, { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';


class ItemList extends React.Component {

	getItems = (page) => {
		const {items,pageSize} = this.state
		axios.get(`https://gw2.huijiwiki.com/api/rest_v1/namespace/data?sort_by=-id&page=${page}&pagesize=${pageSize}`).then(res => {
			this.setState({
				items: items.concat(res.data._embedded),
				cacheItems: items.concat(res.data._embedded),
				loading: false,
				page: page + 1,
				getMoreLoading:false,
			})
		})
	}
	getMore = () => {
		this.setState({
			getMoreLoading:true
		})
		const {page} = this.state
		this.getItems(page)
	}

	handleClickOpen = () => {
		this.setState({open: true})
	}

	handleClose = () => {
		this.setState({open: false, qword: ''})
	}
	handleSearch = () => {
		this.setState({
			loading: true
		})
		const {qword,qrarity,qtype} = this.state

		var english = /^[A-Za-z0-9 ]*$/;

		let filterSet = `{"name":{"$regex":"${qword}"}`

		if (english.test(qword)){
			filterSet = `{"name_en":{"$regex":"${qword}"}`
		}

		if (qrarity){
			filterSet = `${filterSet},"rarity":"${qrarity}"`
		}
		if (qtype){
			filterSet = `${filterSet},"type":"${qtype}"`
		}
		filterSet = `${filterSet}}`

		axios.get(`https://gw2.huijiwiki.com/api/rest_v1/namespace/data?filter=${filterSet}`).then(res => {
			const {_returned, _embedded} = res.data
			this.setState({type: 'search', loading: false,items:_embedded})
		})
	}

	handleClearSearch = ()=>{
		this.setState({
			qword:'',
			qrarity:null,
			qtype:null,
		})
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

	handleTypeChange = (e)=>{
		this.setState({
			qtype: e.target.value
		})
	}

	handleRarityChange = (e)=>{
		this.setState({
			qrarity: e.target.value
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
			pageSize: 8,
			open: false,
			qword: '',
			qtype: null,
			qrarity: null,
			type: 'list',
			getMoreLoading: false
		}
	}

	componentDidMount () {
		const {page, pageSize, items} = this.state
		this.getItems(page)
	}

	render () {
		const {items, loading, qword, type, getMoreLoading} = this.state
		const rarityMap = {
			Junk:"垃圾",
			Basic:"普通",
			Fine:"优质",
			Masterwork:"精制",
			Rare:"稀有",
			Exotic:"特异",
			Ascended:"升华",
			Legendary:"传奇"
		}

		const typeMap = {
			Armor:"护甲",
			Weapon:"武器",
			Back:"背部物品",
			Bag:"包裹",
			Consumable:"消耗品",
			Container:"盒子",
			CraftingMaterial:"制作材料",
			Gathering:"采集器",
			Gizmo:"玩具",
			MiniPet:"迷你宠物",
			Tool:"拆解工具",
			Trait:"特性指南",
			Trinket:"饰品",
			Trophy:"战利品",
			UpgradeComponent:"升级组件",
		}
		return (
			<div>
				<TextField
					id="search"
					type="search"
					value={qword}
					onChange={this.handleQwordChange}
					placeholder="关键字"
				/>
				<InputLabel htmlFor="raritySelect">品质</InputLabel>
				<Select
				  value={this.state.qrarity}
				  onChange={this.handleRarityChange}
				  input={<Input id="raritySelect" />}
				  // MenuProps={MenuProps}
				>
				  {
					  Object.entries(rarityMap).map(item=>{
						  let [key,name] = item
						  return <MenuItem key={key} value={key}>
							  	{name}
							</MenuItem>
					  })
				  }
				</Select>

				<InputLabel htmlFor="typeSelect">类型</InputLabel>
				<Select
				  value={this.state.qtype}
				  onChange={this.handleTypeChange}
				  input={<Input id="typeSelect"/>}
				  // MenuProps={MenuProps}
				>
				  {
					  Object.entries(typeMap).map(item=>{
						  let [key,name] = item
						  return <MenuItem key={key} value={key}>
								{name}
							</MenuItem>
					  })
				  }
				</Select>

				<Button onClick={this.handleSearch} color="primary"> <SearchIcon/> </Button>
				<Button onClick={this.handleClearSearch} color="primary"> 重置搜索 </Button>
				{
					loading ? <Loading/> :items.map(item => {
						return <div key={item.id}>
							<ItemCard data={item}/>

						</div>
					})
				}
				<div style={{textAlign: 'center'}}>
					{
						type === 'list' ? getMoreLoading ? <Loading/> :
							<Button onClick={this.getMore} color="primary">更多</Button> : ''
					}
				</div>
			</div>
		)
	}
}

export default withRouter(ItemList)
