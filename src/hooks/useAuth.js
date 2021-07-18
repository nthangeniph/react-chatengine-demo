import { useFirebase } from 'service/firebase';
import { useEffect ,useState} from 'react';


export const useAuth = () => {
    const {auth } = useFirebase();
    const [authUser, setAuthUser] = useState();
    

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        })
        return unsubscribe;
    })

    return {
        authUser,
    }

}