import { useMsal } from "@azure/msal-react";  
import { useEffect } from "react";  
import { useRouter } from "next/router";  
import Footer from "@/components/Footer";  
  
export default function Home() {  
    const { instance, accounts } = useMsal();  
    const router = useRouter();  
  
    useEffect(() => {  
        if (accounts.length > 0) {  
            router.push("/dashboard");  
        }  
  
        // Remove scrollbar when this component is mounted  
        document.body.style.overflow = 'hidden';  
  
        // Restore scrollbar when this component is unmounted  
        return () => {  
            document.body.style.overflow = 'auto';  
        };  
    }, [accounts]);  
  
    const handleLogin = () => {  
        instance.loginPopup().catch(e => {  
            console.error(e);  
        });  
    };  
  
    return (  
        <div className="container">  
            <div className="content">  
                <div className="p2">reskore</div>  
                <p>Resume screening agent, that helps identify the matching profile based on the job description</p>  
                <button onClick={handleLogin}>Login with Microsoft</button>  
                <Footer />  
            </div>  
            <style jsx>{`  
                .container {  
                    display: flex;  
                    justify-content: center;  
                    align-items: center;  
                    height: 100vh;  
                    background-image: url('/images/bg.jpg');  
                    background-size: cover;  
                    background-position: top;  
                    background-repeat: no-repeat;  
                    position: relative;  
                    overflow: hidden;  
                }  
                .container::before {  
                    content: '';  
                    position: absolute;  
                    top: 0;  
                    left: 0;  
                    width: 100%;  
                    height: 100%;  
                    background: rgba(255, 255, 255, 0.93); /* 20% opacity */  
                    z-index: 1;  
                }  
                .content {  
                    position: relative;  
                    z-index: 2;  
                    text-align: center;  
                    color: #333;  
                }  
                h1 {  
                    font-size: 36px;  
                    margin-bottom: 20px;  
                }  
                button {  
                    padding: 10px 20px;  
                    font-size: 16px;  
                    color: white;  
                    background-color: #007bff;  
                    border: none;  
                    border-radius: 4px;  
                    cursor: pointer;  
                    transition: background-color 0.3s;  
                }  
                button:hover {  
                    background-color: #0056b3;  
                }  
            `}</style>  
        </div>  
    );  
}  
