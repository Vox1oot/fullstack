import { useEffect, useState } from 'react';
import { IPhoneNote } from './phoneList.interface';
import { BASE_URL } from '../constants/api';
import styles from './PhoneList.module.css';

export const PhoneList = () => {
  const [phones, setPhones] = useState<IPhoneNote[]>([]);

  useEffect(() => {
    fetch(`${BASE_URL}/persons`)
      .then((response) => response.json())
      .then((data: IPhoneNote[]) => setPhones(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <ul className={styles.phoneList}>
      {phones.map((phone) => (
        <li key={phone.id}>
          {phone.name} - {phone.number}
        </li>
      ))}
    </ul>
  );
};
