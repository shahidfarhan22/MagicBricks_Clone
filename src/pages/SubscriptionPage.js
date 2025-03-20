// import React from 'react';
// import axios from 'axios';

// const SubscriptionPage = () => {
//     const token = localStorage.getItem('token');

//     const upgradeSubscription = async (plan) => {
//         try {
//             await axios.post(
//                 'https://localhost:7164/api/property/subscription/upgrade',
//                 { plan },  
//                 {
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                         'Content-Type': 'application/json',
//                     }
//                 }
//             );
//             alert(`${plan} plan activated successfully!`);
//         } catch (error) {
//             console.error('Error upgrading subscription', error);
//             alert('Error upgrading subscription.');
//         }
//     };

//     return (
//         <div>
//             <h2>Choose a Subscription Plan</h2>
//             <button onClick={() => upgradeSubscription('Gold')}>Gold Plan (5 extra contacts)</button>
//             <button onClick={() => upgradeSubscription('Diamond')}>Diamond Plan (10 extra contacts)</button>
//         </div>
//     );
// };

// export default SubscriptionPage;

import React from 'react';
import axios from 'axios';
import '../subscription-page.css';  // Import the external stylesheet

const SubscriptionPage = () => {
    const token = localStorage.getItem('token');

    const upgradeSubscription = async (plan) => {
        try {
            await axios.post(
                'https://localhost:7164/api/property/subscription/upgrade',
                { plan },  
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            alert(`${plan} plan activated successfully!`);
        } catch (error) {
            console.error('Error upgrading subscription', error);
            alert('Error upgrading subscription.');
        }
    };

    return (
        <div className="subscription-container">
            <h2>Choose a Subscription Plan</h2>
            <button onClick={() => upgradeSubscription('Gold')}>Gold Plan (5 extra contacts)</button>
            <button onClick={() => upgradeSubscription('Diamond')}>Diamond Plan (10 extra contacts)</button>
        </div>
    );
};

export default SubscriptionPage;

