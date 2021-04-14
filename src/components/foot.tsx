import styled from "styled-components";
import { FaHome, FaInbox, FaBell, FaPlus } from "react-icons/fa";

const Footer = styled.footer`
	position: fixed;
	background-color: rgb(255, 255, 255);
	align-items: center;
	display: flex;
	width: 100%;
	box-sizing: border-box;
	border-radius: 30px 30px 0 0;
	padding: 15px 40px;
	bottom: 0;
	max-width: 400px;
	box-shadow: 0 -2px 10px -1px rgba(0, 0, 0, 0.205);
	justify-content: space-between;
	left: 50%;
	transform: translate(-50%, 0);
`;
// eslint-disable-next-line import/no-default-export
export default function Main(): JSX.Element {
	return (
		<Footer>
			<FaHome size={20} />
			<FaInbox size={20} />
			<FaPlus size={20} />
			<FaBell size={20} />
		</Footer>
	);
}
