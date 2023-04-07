import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import { useEffect, useState } from 'react';

interface Contact {
	name: string;
	contactNumber: string;
}

const App = () => {

	const [contactList, setContactList] = useState<Contact[]>([]);
	const [IsInitialUpdate, setInitialUpdate] = useState(true);

	const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const fields = e.currentTarget.elements;
		const nameValue = (fields.namedItem('name') as HTMLInputElement).value;
		const contactValue = (fields.namedItem('contact') as HTMLInputElement).value;
		setContactList( prevState => {
			return [
				...prevState,
				{name: nameValue, contactNumber: contactValue},
			]
		})
	}

	useEffect(()=>{
		let list = localStorage.getItem('contact-list');
		if(list) {
			setContactList(JSON.parse(list));
		}
		setInitialUpdate(false);
	}, [])

	useEffect(()=> {
		if(!IsInitialUpdate && contactList.length) {
			localStorage.setItem('contact-list', JSON.stringify(contactList));
		}
	}, [IsInitialUpdate, contactList])

  return (
    <Container>
		<main className='w-50 mx-auto'>
			<h1>Contact Form</h1>
			<Form onSubmit={handleSubmit}>
				<Form.Group className='mb-3'>
					<Form.Label htmlFor='name'>Name</Form.Label>
					<Form.Control id='name' name='name' type='text' autoFocus/>
				</Form.Group>
				<Form.Group className='mb-3'>
					<Form.Label htmlFor='contact'>Contact Number</Form.Label>
					<Form.Control id='contact' name='contact' type='text' autoFocus/>
				</Form.Group>
				<Button className='d-block w-100' as='input' type='submit' value='Submit' />
			</Form>
			<section className='mt-5'>
				<h2>Contact List</h2>
				{contactList.map((contacts, index)=> {
					return (
						<div key={index} className='w-50 p-2 mb-3 border rounded-3'>
							<h3>{contacts.name}</h3>
							<p className='m-0'>{contacts.contactNumber}</p>
						</div>
					)
				})}
			</section>
		</main>
	</Container>
  )
}

export default App;
