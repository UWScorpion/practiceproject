"use client";
import { useEffect, useState } from "react";
import base64 from "base-64";
import House from "./house";

export interface PropertyData {
  [key: string]:string | string[] | object
}

function RealEstate() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const url = "https://api.simplyrets.com/properties?limit=12";
    let headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + base64.encode("simplyrets:simplyrets")
    );
    const fetchData = async () => {
      const req = new Request(url);
      await fetch(req, { method: "GET", headers })
        .then((response) => response.json())
        .then((res) => {
          console.log(res);
          setData(res);
        });
    };
    fetchData();
  }, []);

  return (
    <>
      {data.map((h: PropertyData) => (
        <House house={h} key={h.listingId as string}></House>
      ))}
    </>
  );
}

export default RealEstate;
