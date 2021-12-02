import { useEffect } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Switch, Route, useHistory } from 'react-router-dom';
import { Chat, Login, SignUp } from 'components';
import { useAuth, useResolved } from 'hooks';
import { ChatProvider } from 'components/context';
import { BackgroundsProvider,ChatsProvider } from 'provider';

export const App = () => {
  const { authUser } = useAuth();

  const authResolved = useResolved(authUser);

  const { push } = useHistory();

  useEffect(() => {
    if (authResolved) {
      push(!!authUser ? '/' : '/Login');
    }
    return;
  }, [authUser, authResolved, push]);

  return authResolved ? (
    <ChatProvider authUser={authUser}>
      <ChatsProvider>
      <BackgroundsProvider>
        <div className="app">
          <Switch>
            <Route exact path="/" component={Chat} />
            <Route path="/Login" component={Login} />
            <Route path="/SignUp" component={SignUp} />
          </Switch>
        </div>
        </BackgroundsProvider>
        </ChatsProvider>
    </ChatProvider>
  ) : (
    <>Loading....</>
  );
};
