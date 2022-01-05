import styled from 'styled-components';

const Wrapper = styled.div`
	border-radius: var(--radius);
	background-color: var(--colors-ui-base);
	box-shadow: var(--shadow);
	overflow: hidden;
	cursor: pointer;
`;

const CardBody = styled.div`
	padding: 1rem 1.5rem 2rem;
`;

const CardList = styled.ul`
	margin: 0;
	list-style: none;
	padding: 1rem 0 0;
`;

const CardListItem = styled.li`
	font-size: var(--fs-sm);
	line-height: 1.5;
	font-weight: var(--fw-light);

	& > strong {
		font-weight: var(--fw-bold);
	}
`;

const CardImg = styled.img`
	display: block;
	width: 100%;
	height: 150px;
	object-fit: cover;
	object-position: center;
	box-shadow: var(--shadow);
`;

const CardTitle = styled.h3`
	margin: 0;
	font-size: var(--fs-md);
	font-weight: var(--fw-bold);
`;

export const Card = ({ img, name, info = [], onClick }) => {
	return (
		<Wrapper onClick={onClick}>
			<CardImg src={img} alt={name} />
			<CardBody>
				<CardTitle>{name}</CardTitle>
				<CardList>
					{info.map((el) => (
						<CardListItem key={el.title}>
							<strong>{el.title}:</strong> {el.description}
						</CardListItem>
					))}
				</CardList>
			</CardBody>
		</Wrapper>
	);
};
