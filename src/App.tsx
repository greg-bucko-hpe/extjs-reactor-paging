import * as React from 'react';
import {reactify} from "@extjs/reactor"

const Grid = reactify('gridpanel') as any
const Paging = reactify('pagingtoolbar') as any

declare var Ext:any;

Ext.require('Ext.grid.Panel')
Ext.require('Ext.toolbar.Paging')
Ext.require('Ext.button.Button')

export default class App extends React.Component<void, any> {
	constructor(props) {
		super(props)
		
		this.state = {
			total: 0,
			data: []
		}
	}
	
	componentWillMount() {
		this.getData(1, 3)
	}
	
	getData(from, to) {
		const rawData = [
			{"id":1,"name":"name-1"},
			{"id":2,"name":"name-2"},
			{"id":3,"name":"name-3"},
			{"id":4,"name":"name-4"},
			{"id":5,"name":"name-5"},
			{"id":6,"name":"name-6"},
			{"id":7,"name":"name-7"},
			{"id":8,"name":"name-8"}
		]

		this.setState({
			total: rawData.length,
			data: rawData.slice(from - 1, to)
		})
	}

    render() {
        return (
			<Grid
				columns={[
					{text: 'Name', dataIndex: 'name', flex: 1}
				]}
				store={{
					pageSize: 3,
					fields: ['id', 'name'],
					data: this.state,
					proxy: {
						type: 'memory',
						reader: {
							type: 'json',
							rootProperty: 'data',
							totalProperty: 'total'
						}
					}
				}}
			>
				<Paging
					dock="top"
					onChange={(element, pageData, eOpts) => {
						console.log(pageData)
						this.getData(pageData.fromRecord, pageData.toRecord)
					}}
				/>
			</Grid>
        )
    }
}