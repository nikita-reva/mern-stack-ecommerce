import { useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components'

const LoadingButton = styled.button`
	position: relative;
	outline: none;
	display: block;
	width: 100%;
	border: none;
	border-radius: 0.4rem;
	background: #bd961b;

	font-family: 'Open Sans', sans-serif;
	font-size: 1rem;
	color: #fff;
	user-select: none;

	padding: 0.5rem 1rem;
	margin: 1rem 0;
	transition: opacity 0.2s, filter 0.2s;

	${(props) => props.disabled && 'filter: greyscale(1);'}

	&:hover, &:active {
		background: #33a59c;
		cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
		${(props) => !props.disabled && 'opacity: 1;'}
	}
`

const SpinnerAnimation = keyframes`
    from {
        transform: translate(-50%, -50%) rotate(0turn);
    }

    to {
        transform: translate(-50%, -50%) rotate(1turn);
    }
`
const Spinner = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%) rotate(0turn);

	width: 1rem;
	height: 1rem;
	border: 0.2rem solid transparent;
	border-top-color: #fff;
	border-radius: 50%;

	animation: ${SpinnerAnimation} 1s ease infinite;
`
const SpinnerButton = ({ onClick }) => {
	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading } = orderDeliver

	return (
		<LoadingButton onClick={onClick} disabled={loading}>
			<span style={{ visibility: loading ? 'hidden' : 'visible' }}>
				Mark As Completed
			</span>
			{loading && <Spinner />}
		</LoadingButton>
	)
}

export default SpinnerButton
