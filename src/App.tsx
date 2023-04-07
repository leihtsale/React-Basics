import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';
import { Container, Form, Button } from 'react-bootstrap';
import CatImage from './assets/images/cat.gif';
import { useEffect, useState } from 'react';

const App = () => {

	const [name, setName] = useState('');

	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const petName = (e.currentTarget.elements.namedItem('pet-name') as HTMLInputElement).value;
		setName(petName);
		localStorage.setItem('petName', JSON.stringify(petName));
		e.currentTarget.reset();
	}

	const handleClear = () => {
		localStorage.removeItem('petName');
		setName('');
	}

	useEffect(()=>{
		let name = localStorage.getItem('petName');
		if(name) {
			setName(JSON.parse(name));
		}
	}, [name])

	return (
		<Container>
			<main className='w-50 mt-5 mx-auto text-center'>
				<h1 className='mb-3'>My Pet</h1>
				<Form onSubmit={handleSubmit} className='w-75 mx-auto mb-3'>
					<div className='d-flex gap-2'>
						<Form.Control type='text' name='pet-name'/>
						<Button as='input' type='submit' value={'Submit'} />
					</div>
				</Form>
				<img className='w-75 mb-3' src={CatImage} />
				{name ? (
						<>
						<h2 className='text-center'>Hello, I'm {name}</h2>
						<Button variant='outline-danger' onClick={handleClear}>Clear name</Button>
						</>
				) : ''}
			</main>
		</Container>
	)
}

export default App;
