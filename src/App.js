import { Controls } from './components/Controls';
import { Header } from './components/Header';
import { Main } from './components/Main';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { ALL_COUNTRIES } from './config';
import { List } from './components/List';
import { Card } from './components/Card';

function App() {
	const [countries, setCountries] = useState([]);

	console.log(countries);
	useEffect(() => {
		axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
	}, []);

	return (
		<>
			<Header />
			<Main>
				<Controls />
				<List>
					{countries.map((el) => {
						const countryInfo = {
							img: el.flags.png,
							name: el.name,
							info: [
								{
									title: 'Population',
									description: el.population.toLocaleString(),
								},
								{
									title: 'Region',
									description: el.region,
								},
								{
									title: 'Capital',
									description: el.capital,
								},
							],
						};

						return <Card key={el.name} {...countryInfo} />;
					})}
				</List>
			</Main>
		</>
	);
}

export default App;
