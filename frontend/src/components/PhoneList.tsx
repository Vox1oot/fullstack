import React, { useEffect, useState } from 'react';
import { IPhoneNote } from './phoneList.interface';

export const PhoneList = () => {
  const [phones, setPhones] = useState<IPhoneNote[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/persons')
      .then((response) => response.json())
      .then((data: IPhoneNote[]) => setPhones(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ul>
      {phones.map((phone) => (
        <li key={phone.id}>
          {phone.name} - {phone.number}
        </li>
      ))}
    </ul>
  );
};
