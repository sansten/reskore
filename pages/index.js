import { useSession, signIn, signOut } from "next-auth/react"
import { useEffect } from "react";  
import { useRouter } from "next/router";  
import Footer from "@/components/Footer";  
import Image from 'next/image'; // Assuming you are using Next.js Image component for optimized images  
import Head from 'next/head'  
export default function Home() {  
    const router = useRouter();  
    const { data: session } = useSession()
    if(session) {

        router.push("/dashboard");  
      }
  
    return (  

        <>
        <div>
            <Head>
                <title>
                      Identify Perfect Candidates Faster: Resume Screening App
                </title>
                <meta property="og:title" content="Identify Perfect Candidates Faster: Resume Screening App" key="title" />

                <meta
                name="description"
                content="Match resumes to job descriptions instantly! Our AI-powered resume screening app helps you find the perfect candidate faster."
                key="desc"
                />
                <meta
                property="og:description"
                content="Match resumes to job descriptions instantly! Our AI-powered resume screening app helps you find the perfect candidate faster."
                />
                <meta property="og:image" content="https://reskore.sansten.com/_next/image?url=%2Fimages%2Flogo2_small.png&w=120&q=47"/>
                
            </Head>
        </div>
        <div className="container">  
            <div className="content">  
                {/* <div className="p2">reskore</div>   */}
                <Image src="/images/logo2.png" priority={true} alt="Sansten Logo" width={200} height={80} />  
                <p> Resume Screening App : Identify Perfect Candidates Faster by matching profile based on the job description</p>  
                <button onClick={() => signIn()}>Sign in</button>
                <p className="p3">Stay assured. We dont store or share the personal information, resume or job description data.</p>
                {/* <button onClick={handleLogin}>Login with Microsoft</button>   */}
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
                    background: rgba(255, 255, 255, 0.87); /* 20% opacity */  
                    z-index: 1;  
                }  
                .content {  
                    top: 15%;  
                    position: absolute;  
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
                    background-color: #13690e;  
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
        </>
    );  
}  
