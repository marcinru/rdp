import {useState} from 'react';
import {SplitScreen} from './SplitScreen';
import {LeftHandComponent} from './LeftHandComponent';
import {RightHandComponent} from './RightHandComponent';
import {RegularList} from './RegularList';
import {SmallPersonListItem} from './people/SmallPersonListItem';
import {UserInfo} from './people/UserInfo';
import {SmallProductListItem} from './products/SmallProductListItem';
import {NumberedList} from './NumberedList';
import {ProductInfo} from './products/ProductInfo';
import {UncontrolledModal} from './UncontrolledModal';
import {UserLoader} from './UserLoader';
import {ResourceLoader} from './ResourceLoader';
import {DataSource} from './DataSource';
import axios from 'axios';
import {UncontrolledForm} from './UncontrolledForm';
import {ControlledForm} from './ControlledForm';
import {ControlledModal} from './ControlledModal';
import {UncontrolledOnboardingFlow} from './UncontrolledOnboardingFlow';

const people = [{
    name: 'John Doe',
    age: 54,
    hairColor: 'brown',
    hobbies: ['swimming', 'bicycling', 'video games']
}, {
    name: 'Brenda Smith',
    age: 33,
    hairColor: 'black',
    hobbies: ['golf', 'mathematics']
}, {
    name: 'Jane Garcia',
    age: 27,
    hairColor: 'blonde',
    hobbies: ['biology', 'medicine', 'gymnastics']
}];

const products = [{
    name: 'Flat-Screen TV',
    price: '$300',
    description: 'Huge LCD screen, a great deal',
    rating: 4.5
}, {
    name: 'Basketball',
    price: '$10',
    description: 'Just like the pros use',
    rating: 3.8
}, {
    name: 'Running Shoes',
    price: '$120',
    description: 'State-of-the-art technology for optimum running',
    rating: 4.2
}];

const userIds = ['123', '234', '345'];

const getServerData = url => async () => {
    const response = await axios.get(url);
    return response.data;
};

const getLocalStorageData = key => () => {
    return localStorage.getItem(key);
}

const Text = ({message}) => <h1>{message}</h1>;

const StepOne = ({ goToNext }) => (
    <>
        <h1>Step 1</h1>
        <button onClick={goToNext}>Next</button>
    </>
);

const StepTwo = ({ goToNext }) => (
    <>
        <h1>Step 2</h1>
        <button onClick={goToNext}>Next</button>
    </>
);

const StepThree = ({ goToNext }) => (
    <>
        <h1>Step 3</h1>
        <button onClick={goToNext}>Next</button>
    </>
);

function App() {
    const [shouldShowModal, setShouldShowModal] = useState(false);

    return (
        <div>
            <SplitScreen leftWeight={1} rightWeight={3}>
                <LeftHandComponent name="Marcin"/>
                <RightHandComponent message="Welcome"/>
            </SplitScreen>

            <UncontrolledModal>
                <ProductInfo product={products[0]}/>
            </UncontrolledModal>

            <ControlledModal shouldShow={shouldShowModal} onRequestClose={() => setShouldShowModal(false)}>
                <h1>Hello from the Controlled modal!</h1>
            </ControlledModal>
            <button onClick={() => setShouldShowModal(!shouldShowModal)} style={{marginLeft: '1em'}}>
                {shouldShowModal ? 'Hide modal' : 'Show modal'}
            </button>

            <UncontrolledOnboardingFlow>
                <StepOne/>
                <StepTwo/>
                <StepThree/>
            </UncontrolledOnboardingFlow>
            <hr/>

            <DataSource getDataFunc={getServerData('/users/234')} resourceName="user">
                <UserInfo/>
            </DataSource>
            <DataSource getDataFunc={getLocalStorageData('message')} resourceName="message">
                <Text/>
            </DataSource>

            <ControlledForm/>
            <hr/>
            <UncontrolledForm/>

            <ResourceLoader resourceUrl="/users/345" resourceName="user">
                <UserInfo/>
            </ResourceLoader>
            <hr/>
            <ResourceLoader resourceUrl="/products/1234" resourceName="product">
                <ProductInfo/>
            </ResourceLoader>
            <hr/>
            {userIds.map(id => (
                <UserLoader userId={id} key={id}>
                    <UserInfo/>
                </UserLoader>
            ))}
            <hr/>

            <RegularList items={people} resourceName="person" itemComponent={SmallPersonListItem}/>
            <hr/>
            <RegularList items={products} resourceName="product" itemComponent={SmallProductListItem}/>
            <hr/>
            <NumberedList items={products} resourceName="product" itemComponent={ProductInfo}/>
        </div>
    );
}

export default App;
