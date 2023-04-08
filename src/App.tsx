import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container } from 'react-bootstrap';
import { useState } from 'react';
import Reactions from './components/Reactions';
import DailyJoke from './components/DailyJoke';
interface ReactCount {
	[key:string]: number;
}

const App = () => {

	const [reactCount, setReactCount] = useState<ReactCount>({
		'like': 0,
		'heart': 0,
		'haha': 0,
		'angry': 0,
		'sad': 0,
		'wow': 0,
	})

	const [reacted, setReacted] = useState<string[]>([]);

    return (
		<Container>
			<main className='w-75 mt-5 mx-auto p-5 border'>
				<h1 className='text-center'>Daily Jokes</h1>
				<div className='my-5'>
					<DailyJoke />
				</div>
				<Reactions reactCount={reactCount} setReactCount={setReactCount} reacted={reacted} setReacted={setReacted} />
			</main>
		</Container>
    )
}

export default App;
