import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Controls } from '../components/Controls';
import { ALL_COUNTRIES } from '../config';
import { List } from '../components/List';
import { Card } from '../components/Card';

export const HomePage = ({ countries, setCountries }) => {
	const [filteredCountries, setFilteredCountries] = useState(countries);

	const handleSearch = (search, region) => {
		let data = [...countries];
		if (region) {
			data = data.filter((item) => item.region.includes(region));
		}
		if (search) {
			data = data.filter((item) =>
				item.name.toLowerCase().includes(search.toLowerCase())
			);
		}
		setFilteredCountries(data);
	};

	const actualCountries = filteredCountries.length
		? filteredCountries
		: countries;

	const navigate = useNavigate();

	useEffect(() => {
		if (!countries.length)
			axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
	}, []);
	return (
		<>
			<Controls onSearch={handleSearch} />
			<List>
				{actualCountries.map((el) => {
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

					return (
						<Card
							key={el.name}
							onClick={() => navigate(`/country/${el.name}`)}
							{...countryInfo}
						/>
					);
				})}
			</List>
		</>
	);
};
