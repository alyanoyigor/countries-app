import { Search } from './Search';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export const Controls = ({ search, setSearch }) => {
	const [] = useState();

	return (
		<div>
			<Search search={search} setSearch={setSearch} />
		</div>
	);
};
