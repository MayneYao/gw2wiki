const Link = (props) => {
	const {name} = props
	return <a href={`https://gw2.huijiwiki.com/wiki${name}`}>{name}</a>

}

export default Link