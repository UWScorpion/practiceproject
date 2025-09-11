import React from "react";
import { PropertyData } from "./page";

interface Props {
  house: PropertyData;
}

interface Address {
    city: string;
    country: string;
    crossStreet: string;
    full: string;
    postalCode: string;
    state: string;
    streetName: string;
    streetNumberText: string;
    unit: string;
  }

function House({ house }: Props) {
  const getAddress = (address: Address) => {
    return `${address.full}, ${address.city}, ${address.state}, ${address.country}, ${address.postalCode}`;
  };
  return (
    <div>
      <img src={(house.photos as string[])[0]} />
      <div>{getAddress(house.address as Address)}</div>
    </div>
  );
}

export default House;
