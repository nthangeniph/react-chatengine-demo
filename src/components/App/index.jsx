import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Chat, Login, SignUp } from 'components';
import { useAuth, useResolved } from 'hooks';
import { ChatProvider } from 'components/context';



export const App = () => {

    // const { firestore } = useFirebase();
    
    const { authUser } = useAuth();
    
    const authResolved = useResolved(authUser);

 

    const { push } = useHistory();

    useEffect(() => {
        if (authResolved) {
            push(!!authUser?'/':'/Login')
        }
    
},[authUser,authResolved,push])
    // useEffect(() => {
    //     firestore.collection('chatUsers').where('userName', '==', 'nthangeniph').get().then(res => {
    //         const user = res?.docs[0]?.data();

    //         console.log(user);
    //     })

    // }, [])

    // useEffect(() => {
    //     console.log('user :>> ', authUser);
    // },[authUser])


    return authResolved?(
    <ChatProvider authUser={authUser}>
     <div className='app'>
        <Switch>
            <Route exact path='/' component={Chat} />
            <Route path='/Login' component={Login} />
            <Route path='/SignUp' component={SignUp}/>
        </Switch>
        </div>
        </ChatProvider>) :
        <>Loading....</>

}