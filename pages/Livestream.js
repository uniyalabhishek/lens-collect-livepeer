import { useState, useEffect } from "react";
import Router from "next/router";

const Livestream = () => {
  const [accessGranted, setAccessGranted] = useState(false);
  const walletAddress = localStorage.getItem("address");

  useEffect(() => {
    if (!walletAddress) {
      Router.push("/");
      return;
    }
    getRulesStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const LENSCOLLECT = "STREAM_ROLE";
  const rules = [
    {
      type: "ERC721",
      chainId: 137,
      minToken: "1",
      contractAddress: "0xf6c08468FB0fb4E7e25d2b841a5f3A24b7a9cCB5",
      roleId: LENSCOLLECT,
    },
  ];

  const getRulesStatus = async () => {
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
      for (const role of result.roles) {
        if (role.id === LENSCOLLECT && role.granted) {
          setAccessGranted(true);
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!accessGranted) {
    return <div>You do not have access to the Livestream.</div>;
  }

  return (
    <div>
      <h1>Livestream</h1>
      <iframe src="https://lvpr.tv?v=0e1aqrfhunkxd9h4" frameborder="0" allowfullscreen allow="autoplay; encrypted-media; picture-in-picture" sandbox="allow-scripts"></iframe>
    </div>
  );
};

export default Livestream;
