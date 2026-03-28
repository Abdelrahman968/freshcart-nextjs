'use client';
import { createContext, useContext, useState } from 'react';

type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

type AddressContextType = {
  addresses: Address[];
  setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
};

const AddressContext = createContext<AddressContextType | null>(null);

export const useAddress = () => {
  const ctx = useContext(AddressContext);
  if (!ctx) throw new Error('useAddress must be used inside provider');
  return ctx;
};

export const AddressProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);

  return (
    <AddressContext.Provider value={{ addresses, setAddresses }}>
      {children}
    </AddressContext.Provider>
  );
};
