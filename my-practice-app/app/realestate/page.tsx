"use client";

import { useEffect, useState } from "react";
import base64 from "base-64";
import House from "./house";

export interface PropertyData {
  listingId: string;
  [key: string]: string | string[] | object;
}

const API_URL = "https://api.simplyrets.com/properties?limit=12";
const AUTH_HEADER = "Basic " + base64.encode("simplyrets:simplyrets");

const RealEstate = () => {
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const headers = new Headers({
          Authorization: AUTH_HEADER,
        });

        const response = await fetch(API_URL, {
          method: "GET",
          headers,
        });

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const result = await response.json();
        setProperties(result);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load property data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {properties.map((property) =>
        property.listingId ? (
          <House house={property} key={property.listingId} />
        ) : null
      )}
    </div>
  );
};

export default RealEstate;