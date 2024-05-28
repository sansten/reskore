import { useMsal } from "@azure/msal-react";  
import { useEffect } from "react";  
import { useRouter } from "next/router";  
  
export default function Home() {  
    const { instance, accounts } = useMsal();  
    const router = useRouter();  
  
    useEffect(() => {  
        if (accounts.length > 0) {  
            router.push("/dashboard");  
        }  
    }, [accounts]);  
  
    const handleLogin = () => {  
        instance.loginPopup().catch(e => {  
            console.error(e);  
        });  
    };  
  
    return (  
        <div>  
            <h1>Login</h1>  
            <button onClick={handleLogin}>Login with Microsoft</button>  
        </div>  
    );  
}  