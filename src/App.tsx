import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

interface Bet {
	type: string;
	range: [number, number];
}

interface Message {
	msg: string;
	lucky: true | false | "neutral" | "gameover";
}

const generateRandomValue = (start:number, end:number) => Math.floor(Math.random() * (end - start + 1)) + start;

const bets:Array<Bet> = [
	{
		type: "low",
		range: [-25, 100],
	},
	{
		type: "moderate",
		range: [-100, 1000],
	},
	{
		type: "high",
		range: [-500, 2500],
	},
	{
		type: "severe",
		range: [-3000, 5000],
	},
]

const App = () => {

	const [chances, setChances] = useState(10);
	const [money, setMoney] = useState(500);
	const [betResult, setBetResult] = useState(0);
	const [bet, setBet] = useState<Bet | null>(null);
	const [messages, setMessages] = useState<Array<Message>>([
		{msg: 'Welcome to Money Button Game!', lucky: "neutral"}
	]);

	const handleBet = (bet:Bet) => {
		if(chances == 0){
			setMessages((prevState)=>{
				return [...prevState, {msg: `GAME OVER! You have ${0} chances left.`, lucky: "gameover"}];
			})
		}
		else {
			setBet(bet);
			setBetResult(generateRandomValue(bet.range[0], bet.range[1]));
			setChances((prevState)=> prevState - 1);
			setMoney((prevState)=> prevState - betResult);
		}
	}

	useEffect(()=>{
		if(bet && chances) {
			let message: Message = {
				msg: `You clicked "${bet.type[0].toUpperCase() + bet.type.slice(1)} \
				Risk", value is ${betResult}. Current Money is ${money} with ${chances} chance/s left.`,
				lucky: betResult > 0 ? true : false,
			};
			setMessages((prevState)=>{
				return [...prevState, message];
			})
		}
	},[chances, money, betResult])

	return (
		<Container className="p-5">
			<h1>Your Money: {money}</h1>
			<h2>Chance/s left: {chances}</h2>
			<div className="d-flex gap-5">
				{bets.map((bet, index)=>{
					return (
						<div key={index} className="w-25 border p-5 text-center">
							<p className="text-capitalize">{bet.type} Risk</p>
							<Button onClick={()=> handleBet(bet)} variant="success">Bet</Button>
							<p className="mt-3">{bet.range[0]} to {bet.range[1]}</p>
						</div>
					)
				})}
			</div>
			<h3 className="mt-5">Game Host:</h3>
			<div className="p-3 border" style={{minHeight: '200px'}}>
				{messages.map((msg, index)=>{
					if(msg.lucky == 'neutral') {
						return <p key={index}>{msg.msg}</p>
					}
					else if(msg.lucky == 'gameover') {
						return <p className="text-primary" key={index}>{msg.msg}</p>
					}
					return (<p className={msg.lucky ? "text-success" : "text-danger"} key={index}>{msg.msg}</p>)
				})}
			</div>
		</Container>
	);
};

export default App;
