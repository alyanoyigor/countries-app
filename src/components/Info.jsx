import axios from 'axios';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { filterByCode } from '../config';

const Wrapper = styled.section`
	margin-top: 3rem;
	width: 100%;
	display: grid;
	grid-template-columns: 100%;
	gap: 2rem;

	@media (min-width: 767px) {
		grid-template-columns: minmax(100px, 400px) 1fr;
		align-items: center;
		gap: 5rem;
	}
	@media (min-width: 1024px) {
		grid-template-columns: minmax(400px, 600px) 1fr;
	}
`;

const InfoImg = styled.img`
	display: block;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const InfoTitle = styled.h1`
	margin: 0;
	font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media (min-width: 1024px) {
		flex-direction: row;
		gap: 4rem;
	}
`;

const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ListItem = styled.li`
	line-height: 1.8;

	& > strong {
		font-weight: var(--fw-bold);
	}
`;

const Meta = styled.div`
	margin-top: 3rem;
	display: flex;
	flex-direction: column;
	gap: 1.5rem;
	align-items: flex-start;

	& > strong {
		font-weight: var(--fw-bold);
	}

	@media (min-width: 767px) {
		flex-direction: row;
		align-items: center;
	}
`;

const TagGroup = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
`;

const Tag = styled.span`
	padding: 0 1rem;
	background-color: var(--colors-ui-base);
	box-shadow: var(--shadow);
	cursor: pointer;
	line-height: 1.5;
	border-radius: var(--radius);
`;

export const Info = (props) => {
	const {
		name,
		nativeName,
		capital,
		population,
		region,
		subregion,
		topLevelDomain,
		flag,
		currencies = [],
		languages = [],
		borders = [],
		navigate,
	} = props;

	const [neighbors, setNeighbors] = useState([]);

	useEffect(() => {
		if (borders.length)
			axios
				.get(filterByCode(borders))
				.then(({ data }) => setNeighbors(data.map((country) => country.name)));
	}, [borders]);

	return (
		<Wrapper>
			<InfoImg src={flag} alt={name} />
			<div>
				<InfoTitle>{name}</InfoTitle>
				<ListGroup>
					<List>
						<ListItem>
							<strong>Native Name:</strong> {nativeName}
						</ListItem>
						<ListItem>
							<strong>Population:</strong> {population}
						</ListItem>
						<ListItem>
							<strong>Region:</strong> {region}
						</ListItem>
						<ListItem>
							<strong>Sub Region:</strong> {subregion}
						</ListItem>
						<ListItem>
							<strong>Capital:</strong> {capital}
						</ListItem>
					</List>
					<List>
						<ListItem>
							<strong>Top Level Domain:</strong>{' '}
							{topLevelDomain.map((domain) => (
								<span key={domain}>{domain}</span>
							))}
						</ListItem>
						<ListItem>
							<strong>Currency:</strong>{' '}
							{currencies.map((cur) => (
								<span key={cur.code}>{cur.name} </span>
							))}
						</ListItem>
						<ListItem>
							<strong>Languages:</strong>{' '}
							{languages.map((lang) => (
								<span key={lang.name}>{lang.name} </span>
							))}
						</ListItem>
					</List>
				</ListGroup>
				<Meta>
					<strong>Border Countries</strong>
					{!borders.length ? (
						<span>There is no border countries!</span>
					) : (
						<TagGroup>
							{neighbors.map((countryName) => (
								<Tag
									key={countryName}
									onClick={() => navigate(`/country/${countryName}`)}
								>
									{countryName}
								</Tag>
							))}
						</TagGroup>
					)}
				</Meta>
			</div>
		</Wrapper>
	);
};
