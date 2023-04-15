import Router from "next/router";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Ticket from "../components/Ticket";
import Link from 'next/link';


export default function Dashboard() {
  const LENSCOLLECT1 = "TICKET_ROLE";
  const LENSCOLLECT2 = "TICKET_ROLE_2"
  const [loading, setLoading] = useState(false);
  const [isLensCollect1, setIsLensCollect1] = useState(false);
  const [isLensCollect2, setIsLensCollect2] = useState(false);

  const walletAddress = localStorage.getItem("address");
  const truncateAddress = (address) => {
    return `${address.substring(0, 2)}...${address.substring(address.length - 4, address.length)}`;
  };
  const SignOut = () => {
    localStorage.removeItem("address");
    Router.push("/");
  };

  const rules = [
    {
      type: "ERC721",
      chainId: 137,
      minToken: "1",
      contractAddress: "0xf6c08468FB0fb4E7e25d2b841a5f3A24b7a9cCB5",
      roleId: LENSCOLLECT1,
    },
    {
        type: "ERC721",
        chainId: 137,
        minToken: "1",
        contractAddress: "0xB6E187352a888C02d2D8A8007502c1650C1d0722",
        roleId: LENSCOLLECT2,
      }
  ];

  const getRulesStatus = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://api-qa.collab.land/access-control/check-roles", {
        method: "POST",
        headers: new Headers({
          "X-API-KEY": process.env.NEXT_PUBLIC_COLLAB_API_KEY,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          account: walletAddress,
          rules,
        }),
      });
      const result = await response.json();
        console.log(result);
        setLoading(false)

        for(const role of result.roles){
            if (role.granted){
                switch (role.id) {
                    case LENSCOLLECT1:
                        setIsLensCollect1(true)
                        break;
                    case LENSCOLLECT2:
                        setIsLensCollect2(true)
                        break;
                }
            }
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <button onClick={SignOut} className={styles.btn}>
          Sign Out
        </button>
        <Link href="/Livestream">
        Livestream/VOD
      </Link>
      </nav>
      <h1>Welcome {truncateAddress(walletAddress)}</h1>
      <button className={styles.btn} onClick={getRulesStatus}>View Gated Content</button>
        {loading && (<p>Loading...</p>)}
        <div className={styles.wrapper}>
        {/* ... */}
        {isLensCollect1 && (
        <Ticket eventTitle="Event 1" eventColor='#6699ff' />
        )}
        {isLensCollect2 && (
        <Ticket eventTitle="Event 2" eventColor='#6699ff' />
        )}
  </div>
    </div>
  );
}
