import * as types  from '../../mutation-types'
export default{
	[types.DBVERSION] (state,  message ){
		state.dbversion=message
	}
}