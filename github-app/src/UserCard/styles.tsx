import styled from "styled-components";

const s = {
	Card: styled.div`
		display: flex;
		flex-direction: row;
		height: 200px;
		box-shadow: 0 0 5px black;
		border-radius: 25px;
		overflow: hidden;
	`,

	InfoSection: styled.div`
		display: flex;
		flex-direction: column;
		margin: 10px 15px;
		align-items: start;
	`,

	Username: styled.span`
		font-weight: bold;
		font-size: large;
	`,

	Tag: styled.a`
		font-size: small;
	`,

	Bio: styled.span`
		margin: 10px 0;
		color: gray;
		
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 4;
		-webkit-box-orient: vertical;
	`,

	Space: styled.span`
		flex-grow: 1;
	`,

	Follows: styled.div`
		display: flex;
		flex-direction: row;

		span {
			margin-right: 10px;
		}
	`,

	StatusHeader: styled.span`
		width: 100%;
		text-align: center;
		color: gray;
		align-self: center;
		font-size: large;
	`,
}

export default s;