import React from "react";
import { PropertyData } from "./page";

interface Props {
  house: PropertyData;
}

interface Address {
  city?: string;
  country?: string;
  crossStreet?: string;
  full?: string;
  postalCode?: string;
  state?: string;
  streetName?: string;
  streetNumberText?: string;
  unit?: string;
}

function House({ house }: Props) {
  const address = house.address as Address | undefined;
  const photos = house.photos as string[] | undefined;

  const getFormattedAddress = (addr?: Address): string => {
    if (!addr) return "Address not available";

    const parts = [
      addr.full,
      addr.city,
      addr.state,
      addr.country,
      addr.postalCode,
    ];

    return parts.filter(Boolean).join(", ");
  };

  const imageSrc = photos?.[0] ?? "/placeholder.jpg"; // fallback image

  return (
    <div className="house-card">
      <img
        src={imageSrc}
        alt="Property"
        style={{ width: "30%", height: "auto", objectFit: "cover" }}
      />
      <div className="house-address">{getFormattedAddress(address)}</div>
    </div>
  );
}

export default House;