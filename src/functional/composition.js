export const Button = ({ size, color, text, ...props }) => {
    return (
        <button style={{
            backgroundColor: color,
            fontSize: size === 'large' ? '32px' : '16px',
            padding: size === 'large' ? '32px' : '8px'
        }} {...props}>
            {text}
        </button>
    )
}

export const DangerButton = props => {
    return (
        <Button {...props} color="red"/>
    )
}

export const BigSuccessButton = props => {
    return (
        <Button {...props} color="green" size="large"/>
    )
}
