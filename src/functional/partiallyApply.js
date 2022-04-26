import {Button} from './composition';

export const partiallyApply = (Component, partialProps) => {
    return props => (
        <Component {...props} {...partialProps}/>
    )
}

export const DangerBtn = partiallyApply(Button, { color: 'red' });

export const SuccessBtn = partiallyApply(Button, { color: 'green', size: 'large' });
