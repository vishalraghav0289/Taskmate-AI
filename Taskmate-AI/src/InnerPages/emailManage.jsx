import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EmailManage = () => {
  const [email, setEmail] = useState('');
  const [emails, setEmails] = useState([]);
  const [isRegistered, setIsRegistered] = useState(false);
  const [categories, setCategories] = useState({
    Sales: [],
    Jobs: [],
    Updates: [],
    Others: []
  });

  const handleEmailRegister = () => {
    // Simulating email registration
    if (email.trim()) {
      setIsRegistered(true);
      // Here, you could add API integration to access user emails
      console.log(`Registered email: ${email}`);
    } else {
      alert('Please enter a valid email.');
    }
  };

  const categorizeEmails = (emailList) => {
    const categorizedEmails = { Sales: [], Jobs: [], Updates: [], Others: [] };

    emailList.forEach((email) => {
      if (email.subject.includes('Job')) {
        categorizedEmails.Jobs.push(email);
      } else if (email.subject.includes('Sale')) {
        categorizedEmails.Sales.push(email);
      } else if (email.subject.includes('Update')) {
        categorizedEmails.Updates.push(email);
      } else {
        categorizedEmails.Others.push(email);
      }
    });

    setCategories(categorizedEmails);
  };

  const handlePrioritizeEmail = (category, index, priority) => {
    const updatedCategory = categories[category].map((email, i) => {
      if (i === index) {
        return { ...email, priority };
      }
      return email;
    });
    setCategories({ ...categories, [category]: updatedCategory });
  };

  const renderCategory = (category) => (
    <div key={category}>
      <h2 className="text-lg font-bold text-gray-200">{category}</h2>
      {categories[category].map((email, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <p>{email.subject}</p>
          <div>
            <button onClick={() => handlePrioritizeEmail(category, index, 'High')} className="mr-2">High</button>
            <button onClick={() => handlePrioritizeEmail(category, index, 'Medium')} className="mr-2">Medium</button>
            <button onClick={() => handlePrioritizeEmail(category, index, 'Low')}>Low</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Left-hand side menu */}
      <div className="w-64 bg-gray-800 shadow-md flex-shrink-0">
        <div className="p-4">
          <h2 className="text-2xl font-bold text-purple-400">Task Mate AI</h2>
        </div>
        <nav className="mt-6">
          <Link to="/tasklist" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Task List</Link>
          <Link to="/taskmanagement" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Task Management</Link>
          <Link to="/ai" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">AI</Link>
          <Link to="/roadmap" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Roadmap</Link>
          <Link to="/startmyday" className="block py-2 px-4 text-gray-400 hover:bg-gray-700">Start My Day</Link>
          <Link to="/emailmanage" className="block py-2 px-4 text-gray-400 bg-gray-700">Manage Email</Link>
        </nav>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-gray-800 p-4">
          <h1 className="text-2xl font-bold">Manage Your Email</h1>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-900 p-6">
          {!isRegistered ? (
            <div>
              <p>Please enter your email to register and manage your inbox:</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="bg-gray-700 text-gray-200 px-4 py-2 rounded"
              />
              <button onClick={handleEmailRegister} className="bg-purple-600 text-white px-4 py-2 ml-2 rounded">Register</button>
            </div>
          ) : (
            <div>
              <h2 className="text-lg font-bold">Your Emails</h2>
              {/* Simulated email categorization */}
              {Object.keys(categories).map(renderCategory)}
            </div>
          )}
        </main>
      </div>
      <h1
  className="flex justify-center text-3xl font-bold text-purple-400 animate-pulse"
  style={{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }}
>
  We are under work...
</h1>
    </div>
  );
};

export default EmailManage;
