import React, { useEffect, useState } from 'react'
import './Userpage.css';
import Grid from './Card/Item_Card/Grid'
import Order_card from './Card/Order_card/Order_card'
import { useNavigate } from 'react-router-dom';
const ORDERS_API = "https://test-api.achilyon.in/v1/orders/all-orders";
const Userpage = ({name}) => {

	const naviagate = useNavigate();
	const userData = JSON.parse(localStorage.getItem("Achilyon"));
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const retrive = async () => {
			const key = JSON.parse(localStorage.getItem('Achilyon')).token;
			console.log("Key is " + key);
			try {
				const response = await fetch(ORDERS_API, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': key
					}
				})
				if (response.ok) {
					const res = await response.json();
					setOrders(res.data);
				}
			}catch(e){
				
			}
		}
		retrive();
	}, [])
	const signout = () => {
		localStorage.removeItem("Achilyon");
		naviagate("/");
	}
	return (
		<div className='itemPage'>
			<nav className='nav'>
				<img className='logo' src="logo.png" />
				<div style={{ display: 'flex', justifyContent: 'center',flexDirection:'column', alignItems:'center'}}>
					<img className='icon' src="profile_icon.webp" />
					<h4 style={{ margin: 0 }}>{userData.name}</h4>
					<button className='btn' onClick={signout}>SIGN OUT</button>
				</div>
			</nav>
			<div className='order-container'>
				{
					orders.map((order_data, index) => {
						return <Order_card key={index} order_data={order_data}></Order_card>
					})
				}
			</div>
			
		</div>
	)
}

export default Userpage
