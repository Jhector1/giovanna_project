// import { useEffect, useState } from 'react';
// import useDataStorage from '../../hooks/useDataStorage';

// export const FormWithSessionRestore = () => {
//   const [name, setName] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const { storedValue, setStoredValue } = useDataStorage('');

//   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setEmail(e.target.value);
//   };
//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//   };

//   useEffect(() => {
//     const saveName = localStorage.getItem('name');
//     const saveEmail = localStorage.getItem('email');

//     if (saveEmail) setEmail(saveEmail);
//     if (saveName) setName(saveName);
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('name', name);
//     localStorage.setItem('email', email);
//   }, [name, email]);

//   return (
//     <>
//       <h1> Local Storage Restore Form</h1>
//       <form>
//         <div>
//           <label>Name:</label>
//           <input type='text' value={name} onChange={handleNameChange} />
//         </div>
//         <div>
//           <label>Email:</label>
//           <input type='text' value={email} onChange={handleEmailChange} />
//         </div>
//       </form>
//     </>
//   );
// };
