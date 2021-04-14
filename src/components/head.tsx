import { FaGithub } from "react-icons/fa";
import styled from "styled-components";

const Header = styled.header`
	position: fixed;
	background-color: rgb(255, 255, 255);
	align-items: center;
	display: flex;
	width: 100%;
	box-sizing: border-box;
	padding: 5px 50px;
	justify-content: space-between;
	top: 0;
	height: 45px;
	padding: 0 5%;
	border-bottom: var(--accent) solid 1px;
	justify-content: space-evenly;
	font-size: 22px;
	font-family: cursive;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.089);
`;
const StyledLink = styled.a`
	margin: 0 20px;
`;
// eslint-disable-next-line import/no-default-export
export default function Main(): JSX.Element {
	return (
		<Header>
			<StyledLink href="/#">InstaDog</StyledLink>
			<StyledLink href="https://github.com/NikSchaefer/InstaDog">
				<FaGithub size={30} />
			</StyledLink>
		</Header>
	);
}


