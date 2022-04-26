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
import {StepOne} from './steps/StepOne';
import {StepTwo} from './steps/StepTwo';
import {StepFour} from './steps/StepFour';
import {ControlledOnboardingFlow} from './ControlledOnboardingFlow';
import {printProps} from './hoc/printProps';
import {withUser} from './hoc/withUser';
import {UserInfoForm} from './hoc/UserInfoForm';
import {CurrentUserInfo} from './people/CurrentUserInfo';
import {UserInfoById} from './people/UserInfoById';
import {ProductInfoById} from './products/ProductInfoById';
import {RecursiveComponent} from './functional/RecursiveComponent';

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

const nestedObject = {
    a: 1,
    b: {
        b1: 4,
        b2: {
            b23: 'Hello',
        },
        b3: {
            b31: {
                message: 'Hi',
            },
            b32: {
                message: 'Hi',
            }
        }
    },
    c: {
        c1: 2,
        c2: 3,
    }
}

const userIds = ['123', '234', '345'];

const getServerData = url => async () => {
    const response = await axios.get(url);
    return response.data;
};

const getLocalStorageData = key => () => {
    return localStorage.getItem(key);
}

const Text = ({message}) => <h1>{message}</h1>;

const StepThree = ({ goToNext }) => (
    <>
        <h1>Step 3</h1>
        <p>Congratulations! You qualify for our senior discount</p>
        <button onClick={() => goToNext({})}>Next</button>
    </>
);

const UserInfoWrapped = printProps(UserInfo);
const UserInfoWithLoader = withUser(UserInfo, '234');

function App() {
    const [shouldShowModal, setShouldShowModal] = useState(false);
    const [onboardingData, setOnboardingData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    const onNext = stepData => {
        setOnboardingData({...onboardingData, ...stepData});
        setCurrentIndex(currentIndex + 1);
    }

    return (
        <div>
            <SplitScreen leftWeight={1} rightWeight={3}>
                <LeftHandComponent name="Marcin"/>
                <RightHandComponent message="Welcome"/>
            </SplitScreen>

            <RecursiveComponent data={nestedObject}/>

            <UncontrolledModal>
                <ProductInfo product={products[0]}/>
            </UncontrolledModal>

            <ControlledModal shouldShow={shouldShowModal} onRequestClose={() => setShouldShowModal(false)}>
                <h1>Hello from the Controlled modal!</h1>
            </ControlledModal>
            <button onClick={() => setShouldShowModal(!shouldShowModal)} style={{marginLeft: '1em'}}>
                {shouldShowModal ? 'Hide modal' : 'Show modal'}
            </button>

            <ControlledOnboardingFlow onNext={onNext} currentIndex={currentIndex}>
                <StepOne/>
                <StepTwo/>
                {onboardingData.age >= 62 && <StepThree/>}
                <StepFour/>
            </ControlledOnboardingFlow>
            <hr/>

            <CurrentUserInfo/>
            <hr/>
            <ProductInfoById productId="1234"/>
            <hr/>
            <h2>get UserInfoById</h2>
            <UserInfoById userId="234"/>
            <hr/>
            <UserInfoForm/>
            <UserInfoWrapped a={1} b="Hello" c={{name: 'Marcin'}}/>
            <UserInfoWithLoader/>
            <hr/>

            <UncontrolledOnboardingFlow onFinish={data => {
                console.log(data);
                alert('Onboarding complete!');
            }}>
                <StepOne/>
                <StepTwo/>
                <StepFour/>
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
