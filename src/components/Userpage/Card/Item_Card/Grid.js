import React, { useEffect, useState } from 'react'
import Card from './Card'
import './Grid.css';
const Grid = ({items}) => {
	return (
		<div className='grid-container2'>
			{
				items.map((item, index) => {
					return <Card key={index} item={item} />
				})
			}

		</div>
	)
}

export default Grid
